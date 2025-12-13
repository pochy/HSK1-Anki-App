<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import { headerTitle, showBottomNav, currentLevel } from "$lib/stores/app";
  import {
    garden,
    selectedPlant,
    isWatering,
    addPlantFromWord,
    waterPlantAction,
    updatePlantHydration,
    resetGarden,
  } from "$lib/stores/garden";
  import { muted } from "$lib/stores/app";
  import type { Plant } from "$lib/types/garden";
  import { hsk1 } from "$lib/data/hsk1.js";
  import { hsk2 } from "$lib/data/hsk2.js";
  import { masteredIds } from "$lib/stores/app";
  import { calculateCurrentHydration } from "$lib/utils/garden";

  let showAddPlantModal = false;
  let showPlantDetail = false;
  let userAnswer = "";
  let quizStartTime = 0;
  let quizAttempts = 0;
  let showQuiz = false;
  let showWateringEffect = false;
  let showSuccessEffect = false;
  let showErrorEffect = false;
  let showEvolutionEffect = false;
  let particles: Array<{ id: number; x: number; y: number; vx: number; vy: number; life: number }> = [];
  let particleIdCounter = 0;
  // 音声設定（ミュート状態を反映）
  $: soundEnabled = !$muted;

  onMount(() => {
    $headerTitle = "記憶の庭";
    $showBottomNav = true;
    updatePlantHydration();

    // 定期的に水分を更新（10秒ごと）
    const interval = setInterval(() => {
      updatePlantHydration();
    }, 10000);

    onDestroy(() => {
      clearInterval(interval);
    });
  });

  // 植物を選択
  function selectPlant(plant: Plant) {
    selectedPlant.set(plant);
    showPlantDetail = true;
    showQuiz = false;
    userAnswer = "";
  }

  // 植物に水をやる（クイズ開始）
  function startWatering(plant: Plant) {
    selectedPlant.set(plant);
    showQuiz = true;
    quizStartTime = Date.now();
    quizAttempts = 0;
    userAnswer = "";
    isWatering.set(true);
    playSound("water");
  }

  // クイズを提出
  function submitQuiz() {
    const plant = $selectedPlant;
    if (!plant) return;

    quizAttempts++;
    const timeTaken = (Date.now() - quizStartTime) / 1000; // 秒
    const isCorrect = userAnswer.trim() === plant.content.answer.trim();

    // 進化チェック（水やり前の段階を保存）
    const oldStage = plant.visual_state.stage;

    waterPlantAction(plant.plant_id, {
      user_answer: userAnswer.trim(),
      is_correct: isCorrect,
      time_taken: timeTaken,
      attempts: quizAttempts,
    });

    // エフェクトをトリガー
    if (isCorrect) {
      triggerWateringEffect();
      setTimeout(() => {
        triggerSuccessEffect();
        
        // 進化チェック（少し遅延させてストアの更新を待つ）
        setTimeout(() => {
          const updatedPlant = $garden.plants.find((p) => p.plant_id === plant.plant_id);
          if (updatedPlant && updatedPlant.visual_state.stage > oldStage) {
            setTimeout(() => {
              triggerEvolutionEffect();
            }, 500);
          }
        }, 200);
      }, 300);
    } else {
      triggerErrorEffect();
    }

    // 結果を表示
    setTimeout(() => {
      showQuiz = false;
      userAnswer = "";
      if (isCorrect) {
        // アラートの代わりに視覚的フィードバック
      } else {
        // アラートの代わりに視覚的フィードバック
      }
    }, isCorrect ? 1500 : 500);
  }

  // 単語を選択して植物を追加
  function addWordAsPlant(wordId: number) {
    addPlantFromWord(wordId);
    showAddPlantModal = false;
    playSound("plant");
    const newPlant = $garden.plants.find((p) => p.content.wordId === wordId);
    if (newPlant) {
      selectPlant(newPlant);
    }
  }

  // 現在の水分量を取得
  function getCurrentHydration(plant: Plant): number {
    return calculateCurrentHydration(plant, Date.now());
  }

  // 植物の絵文字を取得
  function getPlantEmoji(stage: number): string {
    const emojis = ["🌱", "🌿", "🌳", "🌲", "🌴"];
    return emojis[Math.min(stage, 4)] || "🌱";
  }

  // 警告レベルの植物を取得
  $: warningPlants = $garden.plants.filter(
    (p) => getCurrentHydration(p) <= 20 && !p.status.withered
  );

  // 効果音生成関数
  function playSound(type: "water" | "success" | "error" | "evolution" | "plant") {
    if (!soundEnabled || typeof window === "undefined" || !window.AudioContext) return;

    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      switch (type) {
        case "water":
          // 水滴の音（高い音から低い音へ）
          oscillator.type = "sine";
          oscillator.frequency.setValueAtTime(1000, audioContext.currentTime);
          oscillator.frequency.exponentialRampToValueAtTime(500, audioContext.currentTime + 0.2);
          gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
          oscillator.start();
          oscillator.stop(audioContext.currentTime + 0.2);
          break;
        case "success":
          // 爽快な正解音
          oscillator.type = "sine";
          oscillator.frequency.setValueAtTime(600, audioContext.currentTime);
          oscillator.frequency.exponentialRampToValueAtTime(1200, audioContext.currentTime + 0.15);
          oscillator.frequency.exponentialRampToValueAtTime(800, audioContext.currentTime + 0.3);
          gainNode.gain.setValueAtTime(0.4, audioContext.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
          oscillator.start();
          oscillator.stop(audioContext.currentTime + 0.3);
          break;
        case "error":
          // 鈍い不正解音
          oscillator.type = "sawtooth";
          oscillator.frequency.setValueAtTime(200, audioContext.currentTime);
          oscillator.frequency.exponentialRampToValueAtTime(100, audioContext.currentTime + 0.2);
          gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
          oscillator.start();
          oscillator.stop(audioContext.currentTime + 0.2);
          break;
        case "evolution":
          // 進化のファンファーレ
          oscillator.type = "sine";
          oscillator.frequency.setValueAtTime(400, audioContext.currentTime);
          oscillator.frequency.exponentialRampToValueAtTime(800, audioContext.currentTime + 0.2);
          oscillator.frequency.exponentialRampToValueAtTime(1200, audioContext.currentTime + 0.4);
          gainNode.gain.setValueAtTime(0.5, audioContext.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
          oscillator.start();
          oscillator.stop(audioContext.currentTime + 0.5);
          break;
        case "plant":
          // 種を植える音
          oscillator.type = "sine";
          oscillator.frequency.setValueAtTime(300, audioContext.currentTime);
          oscillator.frequency.exponentialRampToValueAtTime(600, audioContext.currentTime + 0.15);
          gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.15);
          oscillator.start();
          oscillator.stop(audioContext.currentTime + 0.15);
          break;
      }
    } catch (e) {
      console.error("Sound playback error:", e);
    }
  }

  // パーティクル生成
  function createParticles(count: number = 20, x: number = 50, y: number = 50, color: string = "#22c55e") {
    particles = [];
    for (let i = 0; i < count; i++) {
      particles.push({
        id: particleIdCounter++,
        x: x + (Math.random() - 0.5) * 20,
        y: y + (Math.random() - 0.5) * 20,
        vx: (Math.random() - 0.5) * 4,
        vy: (Math.random() - 0.5) * 4 - 2, // 上方向に少し
        life: 1.0,
      });
    }
    // パーティクルをアニメーション
    let animationId: number;
    const animate = () => {
      particles = particles.map((p) => ({
        ...p,
        x: p.x + p.vx,
        y: p.y + p.vy,
        life: Math.max(0, p.life - 0.03),
      })).filter((p) => p.life > 0);
      if (particles.length > 0) {
        animationId = requestAnimationFrame(animate);
      } else {
        particles = [];
      }
    };
    animationId = requestAnimationFrame(animate);
  }

  // 水やりエフェクト
  function triggerWateringEffect() {
    showWateringEffect = true;
    playSound("water");
    setTimeout(() => {
      showWateringEffect = false;
    }, 1000);
  }

  // 正解エフェクト
  function triggerSuccessEffect() {
    showSuccessEffect = true;
    playSound("success");
    createParticles(30, 50, 50, "#22c55e");
    setTimeout(() => {
      showSuccessEffect = false;
    }, 1500);
  }

  // 不正解エフェクト
  function triggerErrorEffect() {
    showErrorEffect = true;
    playSound("error");
    setTimeout(() => {
      showErrorEffect = false;
    }, 500);
  }

  // 進化エフェクト
  function triggerEvolutionEffect() {
    showEvolutionEffect = true;
    playSound("evolution");
    createParticles(50, 50, 50, "#f59e0b");
    setTimeout(() => {
      showEvolutionEffect = false;
    }, 2000);
  }
</script>

<div class="p-4 pb-24 animate-slide-up min-h-screen bg-gradient-to-b from-green-50 to-blue-50">
  <!-- 統計バー -->
  <div class="bg-white rounded-xl p-4 mb-4 shadow-sm">
    <div class="grid grid-cols-3 gap-4 text-center">
      <div>
        <div class="text-2xl font-bold text-green-600">{$garden.statistics.total_plants}</div>
        <div class="text-xs text-gray-500">植物</div>
      </div>
      <div>
        <div class="text-2xl font-bold text-blue-600">
          {Math.round($garden.statistics.average_hydration)}%
        </div>
        <div class="text-xs text-gray-500">平均水分</div>
      </div>
      <div>
        <div class="text-2xl font-bold text-amber-600">
          {$garden.statistics.healthy_plants}
        </div>
        <div class="text-xs text-gray-500">健康</div>
      </div>
    </div>
  </div>

  <!-- 警告表示 -->
  {#if warningPlants.length > 0}
    <div class="bg-red-50 border border-red-200 rounded-xl p-3 mb-4 flex items-center">
      <i class="fas fa-exclamation-triangle text-red-500 mr-2"></i>
      <span class="text-sm text-red-700">
        {warningPlants.length}本の植物が水を必要としています！
      </span>
    </div>
  {/if}

  <!-- 庭園ビュー -->
  <div class="bg-white rounded-xl p-4 shadow-sm mb-4">
    <div class="flex justify-between items-center mb-4">
      <h3 class="font-bold text-gray-800">庭園</h3>
      <div class="flex gap-2">
        <button
          onclick={() => (showAddPlantModal = true)}
          class="px-3 py-1 bg-green-500 text-white rounded-lg text-sm active:scale-95"
        >
          <i class="fas fa-plus mr-1"></i>追加
        </button>
        <button
          onclick={() => resetGarden()}
          class="px-3 py-1 bg-gray-200 text-gray-700 rounded-lg text-sm active:scale-95"
        >
          <i class="fas fa-redo mr-1"></i>リセット
        </button>
      </div>
    </div>

    {#if $garden.plants.length === 0}
      <div class="text-center py-12 text-gray-400">
        <i class="fas fa-seedling text-4xl mb-2"></i>
        <p class="text-sm">まだ植物がありません</p>
        <p class="text-xs mt-1">「追加」ボタンから単語を選んで植物を育てましょう</p>
      </div>
    {:else}
      <div class="grid grid-cols-2 gap-3">
        {#each $garden.plants as plant (plant.plant_id)}
          {@const hydration = getCurrentHydration(plant)}
          {@const isWarning = hydration <= 20 && !plant.status.withered}
          <button
            onclick={() => selectPlant(plant)}
            class="bg-gradient-to-br from-green-50 to-blue-50 rounded-xl p-3 border-2 transition-all active:scale-95 relative overflow-hidden {isWarning
              ? 'border-red-300 shadow-md warning-pulse'
              : 'border-gray-100'}"
          >
            <div class="flex items-center justify-between mb-2">
              <div class="text-2xl">{getPlantEmoji(plant.visual_state.stage)}</div>
              {#if isWarning}
                <i class="fas fa-exclamation-circle text-red-500"></i>
              {/if}
            </div>
            <div class="text-xs font-bold text-gray-800 mb-1 truncate">
              {plant.content.question}
            </div>
            <div class="text-xs text-gray-500 mb-2 truncate">
              {plant.content.answer}
            </div>
            <div class="w-full bg-gray-200 rounded-full h-1.5 mb-1">
              <div
                class="h-1.5 rounded-full transition-all {hydration >= 50
                  ? 'bg-green-500'
                  : hydration >= 20
                    ? 'bg-yellow-500'
                    : 'bg-red-500'}"
                style="width: {hydration}%"
              ></div>
            </div>
            <div class="text-xs text-gray-400 text-right">
              {Math.round(hydration)}%
            </div>
          </button>
        {/each}
      </div>
    {/if}
  </div>

  <!-- 植物詳細モーダル -->
  {#if showPlantDetail && $selectedPlant}
    {@const plant = $selectedPlant}
    {@const hydration = getCurrentHydration(plant)}
    <div
      class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
      onclick={() => {
        showPlantDetail = false;
        showQuiz = false;
      }}
    >
      <div
        class="bg-white rounded-2xl p-6 w-full max-w-md animate-pop"
        onclick={(e) => e.stopPropagation()}
      >
        {#if !showQuiz}
          <!-- 植物詳細ビュー -->
          <div class="text-center mb-6 relative">
            <div class="text-6xl mb-4 relative inline-block {showEvolutionEffect ? 'evolution-glow' : ''}">
              {getPlantEmoji(plant.visual_state.stage)}
              {#if showEvolutionEffect}
                <div class="absolute inset-0 evolution-ring"></div>
              {/if}
            </div>
            <h3 class="text-xl font-bold text-gray-800 mb-2">
              {plant.content.question}
            </h3>
            <p class="text-lg text-gray-600 mb-4">{plant.content.answer}</p>
            
            <!-- パーティクルエフェクト -->
            {#if particles.length > 0}
              <div class="absolute inset-0 pointer-events-none overflow-hidden" style="width: 100%; height: 100%;">
                {#each particles as particle (particle.id)}
                  <div
                    class="absolute w-3 h-3 rounded-full particle {showEvolutionEffect ? 'bg-amber-400' : 'bg-green-400'}"
                    style="left: {particle.x}%; top: {particle.y}%; opacity: {particle.life}; transform: scale({particle.life});"
                  ></div>
                {/each}
              </div>
            {/if}
          </div>

          <div class="space-y-3 mb-6">
            <div>
              <div class="flex justify-between text-sm mb-1">
                <span class="text-gray-600">水分量</span>
                <span class="font-bold">{Math.round(hydration)}%</span>
              </div>
              <div class="w-full bg-gray-200 rounded-full h-3">
                <div
                  class="h-3 rounded-full transition-all {hydration >= 50
                    ? 'bg-green-500'
                    : hydration >= 20
                      ? 'bg-yellow-500'
                      : 'bg-red-500'}"
                  style="width: {hydration}%"
                ></div>
              </div>
            </div>

            <div class="flex justify-between text-sm">
              <span class="text-gray-600">成長段階</span>
              <span class="font-bold">
                {["種", "芽", "若木", "成木", "古木"][plant.visual_state.stage]}
              </span>
            </div>

            <div class="flex justify-between text-sm">
              <span class="text-gray-600">経験値</span>
              <span class="font-bold">
                {plant.evolution_data.experience} / {plant.evolution_data.experience_to_next}
              </span>
            </div>

            <div class="flex justify-between text-sm">
              <span class="text-gray-600">復習回数</span>
              <span class="font-bold">{plant.metadata.total_water_count}回</span>
            </div>
          </div>

          <button
            onclick={() => startWatering(plant)}
            class="w-full bg-green-500 text-white py-3 rounded-xl font-bold active:scale-95 mb-2 relative overflow-hidden"
          >
            <i class="fas fa-tint mr-2"></i>水をやる（復習）
            {#if showWateringEffect}
              <div class="absolute inset-0 water-effect"></div>
            {/if}
          </button>
          <button
            onclick={() => {
              showPlantDetail = false;
            }}
            class="w-full bg-gray-200 text-gray-700 py-2 rounded-xl active:scale-95"
          >
            閉じる
          </button>
        {:else}
          <!-- クイズビュー -->
          <div class="relative">
            {#if showSuccessEffect}
              <div class="absolute inset-0 success-glow z-10 pointer-events-none"></div>
            {/if}
            {#if showErrorEffect}
              <div class="absolute inset-0 error-shake z-10 pointer-events-none"></div>
            {/if}
            
            <h3 class="text-xl font-bold text-gray-800 mb-4 text-center">
              水やりクイズ
            </h3>
            <div class="bg-blue-50 rounded-xl p-4 mb-4 relative {showSuccessEffect ? 'success-border' : showErrorEffect ? 'error-border' : ''}">
              <p class="text-sm text-gray-600 mb-2">問題</p>
              <p class="text-2xl font-bold text-gray-800 text-center">
                {plant.content.question}
              </p>
            </div>

            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-700 mb-2">
                答えを入力してください
              </label>
              <input
                type="text"
                bind:value={userAnswer}
                onkeydown={(e) => {
                  if (e.key === "Enter") submitQuiz();
                }}
                class="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-green-500 focus:outline-none text-lg"
                placeholder="中国語を入力"
                autofocus
              />
            </div>

            <div class="flex gap-2">
              <button
                onclick={submitQuiz}
                class="flex-1 bg-green-500 text-white py-3 rounded-xl font-bold active:scale-95 relative overflow-hidden"
              >
                提出
                {#if showSuccessEffect}
                  <div class="absolute inset-0 success-pulse"></div>
                {/if}
              </button>
              <button
                onclick={() => {
                  showQuiz = false;
                  userAnswer = "";
                }}
                class="px-4 bg-gray-200 text-gray-700 rounded-xl active:scale-95"
              >
                キャンセル
              </button>
            </div>
            
            <!-- 結果メッセージ -->
            {#if showSuccessEffect}
              <div class="mt-4 text-center animate-bounce">
                <div class="text-4xl mb-2">✨</div>
                <p class="text-green-600 font-bold">正解！植物に水をやりました🌱</p>
              </div>
            {/if}
            {#if showErrorEffect}
              <div class="mt-4 text-center">
                <div class="text-4xl mb-2">❌</div>
                <p class="text-red-600 font-bold">不正解</p>
                <p class="text-sm text-gray-600 mt-1">正解: {plant.content.answer}</p>
              </div>
            {/if}
          </div>
        {/if}
      </div>
    </div>
  {/if}

  <!-- 植物追加モーダル -->
  {#if showAddPlantModal}
    <div
      class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
      onclick={() => (showAddPlantModal = false)}
    >
      <div
        class="bg-white rounded-2xl p-6 w-full max-w-md max-h-[80vh] overflow-hidden flex flex-col animate-pop"
        onclick={(e) => e.stopPropagation()}
      >
        <h3 class="text-xl font-bold text-gray-800 mb-4">単語を選んで植物を追加</h3>
        <div class="flex-1 overflow-y-auto">
          {#each ($currentLevel === 1 ? hsk1 : hsk2) as word}
            {@const isAdded = $garden.plants.some((p) => p.content.wordId === word.id)}
            <button
              onclick={() => addWordAsPlant(word.id)}
              disabled={isAdded}
              class="w-full p-3 mb-2 rounded-xl text-left transition-all {isAdded
                ? 'bg-gray-100 text-gray-400'
                : 'bg-white border border-gray-200 hover:bg-green-50 active:scale-95'}"
            >
              <div class="flex justify-between items-center">
                <div>
                  <div class="font-bold text-gray-800">{word.meaning}</div>
                  <div class="text-sm text-gray-500">{word.char} ({word.pinyin})</div>
                </div>
                {#if isAdded}
                  <i class="fas fa-check-circle text-green-500"></i>
                {:else}
                  <i class="fas fa-plus-circle text-gray-400"></i>
                {/if}
              </div>
            </button>
          {/each}
        </div>
        <button
          onclick={() => (showAddPlantModal = false)}
          class="mt-4 w-full bg-gray-200 text-gray-700 py-2 rounded-xl active:scale-95"
        >
          閉じる
        </button>
      </div>
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

  @keyframes pop {
    from {
      opacity: 0;
      transform: scale(0.9);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }

  .animate-slide-up {
    animation: slide-up 0.4s ease-out forwards;
  }

  .animate-pop {
    animation: pop 0.3s ease-out forwards;
  }

  /* 水やりエフェクト */
  .water-effect {
    background: linear-gradient(180deg, rgba(59, 130, 246, 0.3) 0%, transparent 100%);
    animation: water-drip 1s ease-out;
  }

  @keyframes water-drip {
    0% {
      transform: translateY(-100%);
      opacity: 0;
    }
    50% {
      opacity: 1;
    }
    100% {
      transform: translateY(100%);
      opacity: 0;
    }
  }

  /* 正解エフェクト */
  .success-glow {
    background: radial-gradient(circle, rgba(34, 197, 94, 0.2) 0%, transparent 70%);
    animation: success-pulse 1.5s ease-out;
  }

  .success-border {
    border: 2px solid #22c55e;
    box-shadow: 0 0 20px rgba(34, 197, 94, 0.5);
    animation: border-glow 1.5s ease-out;
  }

  .success-pulse {
    background: rgba(34, 197, 94, 0.3);
    animation: pulse 1.5s ease-out;
  }

  @keyframes success-pulse {
    0%, 100% {
      opacity: 0;
      transform: scale(1);
    }
    50% {
      opacity: 1;
      transform: scale(1.1);
    }
  }

  @keyframes border-glow {
    0%, 100% {
      box-shadow: 0 0 20px rgba(34, 197, 94, 0.5);
    }
    50% {
      box-shadow: 0 0 40px rgba(34, 197, 94, 0.8);
    }
  }

  @keyframes pulse {
    0%, 100% {
      opacity: 0;
    }
    50% {
      opacity: 1;
    }
  }

  /* 不正解エフェクト */
  .error-shake {
    animation: shake 0.5s ease-out;
  }

  .error-border {
    border: 2px solid #ef4444;
    box-shadow: 0 0 20px rgba(239, 68, 68, 0.5);
  }

  @keyframes shake {
    0%, 100% {
      transform: translateX(0);
    }
    10%, 30%, 50%, 70%, 90% {
      transform: translateX(-5px);
    }
    20%, 40%, 60%, 80% {
      transform: translateX(5px);
    }
  }

  /* 進化エフェクト */
  .evolution-glow {
    animation: evolution-glow 2s ease-out;
  }

  .evolution-ring {
    border: 4px solid #f59e0b;
    border-radius: 50%;
    animation: evolution-ring-expand 2s ease-out;
  }

  @keyframes evolution-glow {
    0% {
      filter: brightness(1);
      transform: scale(1);
    }
    50% {
      filter: brightness(1.5);
      transform: scale(1.2);
    }
    100% {
      filter: brightness(1);
      transform: scale(1);
    }
  }

  @keyframes evolution-ring-expand {
    0% {
      transform: scale(0.8);
      opacity: 1;
    }
    100% {
      transform: scale(2);
      opacity: 0;
    }
  }

  /* 警告パルス */
  .warning-pulse {
    animation: warning-pulse 2s ease-in-out infinite;
  }

  @keyframes warning-pulse {
    0%, 100% {
      box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.7);
    }
    50% {
      box-shadow: 0 0 0 10px rgba(239, 68, 68, 0);
    }
  }

  /* パーティクル */
  .particle {
    pointer-events: none;
    animation: particle-fade 1s ease-out forwards;
  }

  @keyframes particle-fade {
    0% {
      opacity: 1;
      transform: scale(1);
    }
    100% {
      opacity: 0;
      transform: scale(0);
    }
  }

  /* 水分バーアニメーション */
  .transition-all {
    transition: width 0.3s ease-out, background-color 0.3s ease-out;
  }
</style>

