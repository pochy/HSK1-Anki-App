<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import { fade, fly, scale } from "svelte/transition";
  import {
    gameSession,
    isPlaying,
    currentScene,
    startSession,
    nextScene,
    endSession,
    saveSRSData,
  } from "$lib/stores/conversation-simulator";
  import {
    updateSRSAfterScene,
    calculateRating,
    calculateScore,
    speak,
    stopSpeaking,
  } from "$lib/utils/conversation-simulator";
  import type {
    ResponseOption,
    ResponseRating,
    SceneResult,
  } from "$lib/types/conversation-simulator";
  import { headerTitle, showBottomNav, muted } from "$lib/stores/app";
  import { goto } from "$app/navigation";
  import { base } from "$app/paths";

  // ゲーム状態
  let selectedOption = $state<ResponseOption | null>(null);
  let showFeedback = $state(false);
  let showExplanation = $state(false);
  let sceneStartTime = $state(0);
  let timeTaken = $state(0);
  let timerInterval: any;
  let shuffledOptions = $state<ResponseOption[]>([]);
  let correctResponse = $state<ResponseOption | null>(null);
  let currentRating = $state<ResponseRating | null>(null);
  let sessionFinished = $state(false);

  // エフェクト用の状態
  let showParticles = $state(false);
  let showShake = $state(false);
  let particles = $state<
    Array<{
      id: number;
      x: number;
      y: number;
      delay: number;
    }>
  >([]);

  let progress = $derived(
    $gameSession.scene_ids.length > 0
      ? (($gameSession.current_scene_index + 1) /
          $gameSession.scene_ids.length) *
          100
      : 0
  );

  onMount(() => {
    $headerTitle = "実践会話マスター";
    $showBottomNav = true;
    if (!$isPlaying) {
      startSession();
    } else {
      setupScene();
    }
  });

  onDestroy(() => {
    clearInterval(timerInterval);
    stopSpeaking();
    $showBottomNav = true;
  });

  // シーンが変更されたらセットアップ
  $effect(() => {
    // current_scene_indexの変更も監視
    const _ = $gameSession.current_scene_index;
    if ($currentScene && $isPlaying) {
      setupScene();
    }
  });

  function setupScene() {
    if (!$currentScene) return;

    // フィードバック表示中はリセットしない（次のシーンへの遷移時のみリセット）
    if (showFeedback) {
      return;
    }

    // リセット
    selectedOption = null;
    showFeedback = false;
    showExplanation = false;
    sceneStartTime = Date.now();
    timeTaken = 0;
    showParticles = false;
    showShake = false;
    particles = [];

    // 選択肢をシャッフル
    shuffledOptions = [...$currentScene.options].sort(
      () => Math.random() - 0.5
    );

    // 正解を取得
    correctResponse =
      $currentScene.options.find((opt) => opt.is_correct) || null;

    // タイマー開始
    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
      timeTaken = (Date.now() - sceneStartTime) / 1000;
      // タイムアウトチェック
      const timeLimit = $gameSession.settings.time_limit_seconds;
      if (timeLimit > 0 && timeTaken >= timeLimit && !showFeedback) {
        handleTimeUp();
      }
    }, 100);

    // 会話の音声読み上げ（設定が有効な場合）
    if ($gameSession.settings.tts_enabled && !$muted) {
      setTimeout(() => {
        $currentScene?.dialogue.forEach((dialogue, index) => {
          setTimeout(() => {
            speak(dialogue.text, "zh-CN", 0.8);
          }, index * 2000);
        });
      }, 500);
    }
  }

  function handleTimeUp() {
    if (!$currentScene || !correctResponse) return;
    handleSelect(correctResponse, true); // タイムアウトとして処理
  }

  function handleSelect(option: ResponseOption, isTimeout = false) {
    if (showFeedback || !$currentScene || !correctResponse) return;

    clearInterval(timerInterval);
    selectedOption = option;
    timeTaken = (Date.now() - sceneStartTime) / 1000;

    // 評価を計算
    currentRating = calculateRating(
      option,
      correctResponse,
      timeTaken,
      $gameSession.settings.time_limit_seconds
    );

    // スコア加算
    const scoreGain = calculateScore(currentRating);
    gameSession.update((s) => ({
      ...s,
      score: s.score + scoreGain,
    }));

    // エフェクト
    if (currentRating === "perfect" || currentRating === "good") {
      showParticles = true;
      createParticles();
    } else {
      showShake = true;
      setTimeout(() => {
        showShake = false;
      }, 500);
    }

    // フィードバック表示
    showFeedback = true;

    // SRS更新
    const scene = $currentScene;

    // 正解の音声読み上げ
    if ($gameSession.settings.tts_enabled && !$muted && !isTimeout) {
      setTimeout(() => {
        speak(option.text, "zh-CN", 0.8);
      }, 500);
    }
    const result: SceneResult = {
      scene_id: scene.scene_id,
      selected_response_id: option.response_id,
      correct_response_id: correctResponse.response_id,
      rating: currentRating,
      time_taken: timeTaken,
      new_interval: 0, // 後で更新される
      new_stability: 0, // 後で更新される
      grammar_points_learned: scene.grammar_points.map((gp) => gp.point_id),
    };

    updateSRSAfterScene(scene, result);

    // SRSデータを保存
    saveSRSData(scene.scene_id, scene.srs_data);

    // 結果を記録
    result.new_interval = scene.srs_data.interval;
    result.new_stability = scene.srs_data.stability;

    gameSession.update((s) => ({
      ...s,
      results: [...s.results, result],
    }));
  }

  function createParticles() {
    particles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 0.3,
    }));
    setTimeout(() => {
      showParticles = false;
      particles = [];
    }, 1000);
  }

  function handleNext() {
    if (!$currentScene) return;

    const session = $gameSession;
    if (session.current_scene_index < session.scene_ids.length - 1) {
      // フィードバック状態をリセット
      showFeedback = false;
      selectedOption = null;
      currentRating = null;
      showExplanation = false;
      nextScene();
    } else {
      // セッション終了
      endSession();
      sessionFinished = true;
    }
  }

  function handleRestart() {
    sessionFinished = false;
    startSession();
  }

  function getRatingLabel(rating: ResponseRating): string {
    switch (rating) {
      case "perfect":
        return "完璧";
      case "good":
        return "良好";
      case "ok":
        return "可";
      case "poor":
        return "不適切";
    }
  }

  function getRatingColor(rating: ResponseRating): string {
    switch (rating) {
      case "perfect":
        return "text-green-600 bg-green-50 border-green-200";
      case "good":
        return "text-blue-600 bg-blue-50 border-blue-200";
      case "ok":
        return "text-yellow-600 bg-yellow-50 border-yellow-200";
      case "poor":
        return "text-red-600 bg-red-50 border-red-200";
    }
  }

  function getFormalityLabel(level: string): string {
    switch (level) {
      case "casual":
        return "カジュアル";
      case "polite":
        return "丁寧";
      case "formal":
        return "フォーマル";
      default:
        return level;
    }
  }

  function getRelationshipLabel(rel: string): string {
    switch (rel) {
      case "friend":
        return "友達";
      case "stranger":
        return "見知らぬ人";
      case "superior":
        return "目上の人";
      case "colleague":
        return "同僚";
      case "family":
        return "家族";
      default:
        return rel;
    }
  }
</script>

<div class="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 pb-24">
  {#if sessionFinished}
    <!-- セッション終了画面 -->
    <div class="p-6 animate-slide-up">
      <div
        class="max-w-md mx-auto bg-white rounded-2xl shadow-lg p-8 text-center"
      >
        <div class="text-6xl mb-4">🎉</div>
        <h2 class="text-2xl font-bold text-gray-800 mb-4">セッション完了！</h2>
        <div class="space-y-4 mb-6">
          <div>
            <div class="text-sm text-gray-500">総スコア</div>
            <div class="text-3xl font-bold text-amber-600">
              {$gameSession.score}
            </div>
          </div>
          <div>
            <div class="text-sm text-gray-500">回答数</div>
            <div class="text-xl font-semibold text-gray-700">
              {$gameSession.results.length}問
            </div>
          </div>
        </div>
        <div class="flex gap-4">
          <button
            onclick={handleRestart}
            class="flex-1 bg-amber-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-amber-600 active:scale-98 transition-all"
          >
            もう一度
          </button>
          <button
            onclick={() => goto(`${base}/game/`)}
            class="flex-1 bg-gray-200 text-gray-700 px-6 py-3 rounded-xl font-semibold hover:bg-gray-300 active:scale-98 transition-all"
          >
            ゲーム一覧
          </button>
        </div>
      </div>
    </div>
  {:else if $currentScene}
    <!-- ゲーム画面 -->
    <div class="p-6 animate-slide-up" class:shake={showShake}>
      <!-- プログレスバー -->
      <div class="mb-6">
        <div class="flex justify-between text-sm text-gray-600 mb-2">
          <span
            >問題 {$gameSession.current_scene_index + 1} / {$gameSession
              .scene_ids.length}</span
          >
          <span>スコア: {$gameSession.score}</span>
        </div>
        <div class="w-full bg-gray-200 rounded-full h-2">
          <div
            class="bg-amber-500 h-2 rounded-full transition-all duration-300"
            style="width: {progress}%"
          ></div>
        </div>
      </div>

      <!-- シーン情報 -->
      <div
        class="bg-white rounded-2xl shadow-sm p-6 mb-6 border border-gray-100"
        transition:fade
      >
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-bold text-gray-800">{$currentScene.title}</h3>
          <span
            class="px-3 py-1 rounded-full text-xs font-semibold"
            style="background-color: {$currentScene.metadata
              .category_color}20; color: {$currentScene.metadata
              .category_color};"
          >
            HSK {$currentScene.difficulty_level}級
          </span>
        </div>
        <p class="text-sm text-gray-600 mb-4">{$currentScene.description}</p>
        <div class="flex flex-wrap gap-2 text-xs text-gray-500">
          <span>場所: {$currentScene.context.setting}</span>
          <span>•</span>
          <span
            >関係: {getRelationshipLabel(
              $currentScene.context.relationship
            )}</span
          >
          <span>•</span>
          <span
            >丁寧さ: {getFormalityLabel(
              $currentScene.context.formality_level
            )}</span
          >
        </div>
      </div>

      <!-- 会話の流れ -->
      <div
        class="bg-white rounded-2xl shadow-sm p-6 mb-6 border border-gray-100"
      >
        <h4 class="text-sm font-semibold text-gray-700 mb-4">会話</h4>
        <div class="space-y-4">
          {#each $currentScene.dialogue as dialogue (dialogue.order)}
            <div class="border-l-4 border-amber-400 pl-4">
              <div class="font-semibold text-gray-700 mb-1">
                {dialogue.speaker}:
              </div>
              <div class="text-lg text-gray-800 mb-1">{dialogue.text}</div>
              {#if dialogue.pinyin}
                <div class="text-sm text-gray-500 mb-1">{dialogue.pinyin}</div>
              {/if}
              <div class="text-sm text-gray-600">{dialogue.translation}</div>
            </div>
          {/each}
        </div>
      </div>

      <!-- 選択肢 -->
      {#if !showFeedback}
        <div class="space-y-3 mb-6">
          <h4 class="text-sm font-semibold text-gray-700 mb-3">
            あなたの返答を選択してください
          </h4>
          {#each shuffledOptions as option (option.response_id)}
            <button
              onclick={() => handleSelect(option)}
              class="w-full bg-white rounded-xl p-4 text-left border-2 border-gray-200 hover:border-amber-400 hover:shadow-md transition-all active:scale-98"
            >
              <div class="text-base text-gray-800 mb-1">{option.text}</div>
              {#if option.pinyin}
                <div class="text-sm text-gray-500 mb-1">{option.pinyin}</div>
              {/if}
              <div class="text-sm text-gray-600">{option.translation}</div>
            </button>
          {/each}
        </div>

        <!-- タイマー -->
        {#if $gameSession.settings.time_limit_seconds > 0}
          <div class="text-center text-sm text-gray-500 mb-4">
            残り時間: {Math.max(
              0,
              Math.ceil($gameSession.settings.time_limit_seconds - timeTaken)
            )}秒
          </div>
        {/if}
      {/if}

      <!-- フィードバック -->
      {#if showFeedback && selectedOption && currentRating}
        <div
          class="bg-white rounded-2xl shadow-lg p-6 mb-6 border-2 {getRatingColor(
            currentRating
          )}"
          transition:scale={{ duration: 300 }}
        >
          <div class="flex items-center justify-between mb-4">
            <h4 class="text-lg font-bold">結果</h4>
            <span
              class="px-4 py-2 rounded-full text-sm font-semibold border {getRatingColor(
                currentRating
              )}"
            >
              {getRatingLabel(currentRating)}
            </span>
          </div>

          {#if selectedOption.explanation}
            <div class="mb-4">
              <div class="text-sm font-semibold text-gray-700 mb-2">解説</div>
              <div class="text-sm text-gray-600">
                {selectedOption.explanation}
              </div>
            </div>
          {/if}

          {#if $currentScene.grammar_points.length > 0 && showExplanation}
            <div class="mb-4">
              <div class="text-sm font-semibold text-gray-700 mb-2">
                文法ポイント
              </div>
              {#each $currentScene.grammar_points as gp}
                <div class="mb-3 p-3 bg-gray-50 rounded-lg">
                  <div class="font-semibold text-sm text-gray-800 mb-1">
                    {gp.title}
                  </div>
                  <div class="text-xs text-gray-600 mb-2">{gp.description}</div>
                  {#each gp.examples as ex}
                    <div class="text-xs text-gray-700 mb-1">
                      <div class="font-mono">{ex.chinese}</div>
                      {#if ex.pinyin}
                        <div class="text-gray-500">{ex.pinyin}</div>
                      {/if}
                      <div class="text-gray-600">{ex.japanese}</div>
                    </div>
                  {/each}
                </div>
              {/each}
            </div>
          {/if}

          <div class="flex gap-3">
            {#if $currentScene.grammar_points.length > 0}
              <button
                onclick={() => (showExplanation = !showExplanation)}
                class="flex-1 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-gray-200 active:scale-98 transition-all"
              >
                {showExplanation ? "解説を閉じる" : "解説を見る"}
              </button>
            {/if}
            <button
              onclick={handleNext}
              class="flex-1 bg-amber-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-amber-600 active:scale-98 transition-all"
            >
              次へ
            </button>
          </div>
        </div>
      {/if}

      <!-- パーティクルエフェクト -->
      {#if showParticles}
        <div class="fixed inset-0 pointer-events-none z-50">
          {#each particles as particle (particle.id)}
            <div
              class="absolute w-2 h-2 bg-amber-400 rounded-full"
              style="left: {particle.x}%; top: {particle.y}%; animation: particle-float 1s ease-out {particle.delay}s forwards;"
            ></div>
          {/each}
        </div>
      {/if}
    </div>
  {:else}
    <!-- ローディング -->
    <div class="p-6 text-center">
      <div class="text-4xl mb-4">⏳</div>
      <div class="text-gray-600">シーンを読み込んでいます...</div>
    </div>
  {/if}
</div>

<style>
  @keyframes slide-up {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes shake {
    0%,
    100% {
      transform: translateX(0);
    }
    25% {
      transform: translateX(-10px);
    }
    75% {
      transform: translateX(10px);
    }
  }

  @keyframes particle-float {
    from {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
    to {
      opacity: 0;
      transform: translateY(-100px) scale(0);
    }
  }

  .animate-slide-up {
    animation: slide-up 0.4s ease-out forwards;
  }

  .shake {
    animation: shake 0.5s ease-in-out;
  }
</style>
