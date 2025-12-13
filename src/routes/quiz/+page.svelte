<script lang="ts">
  import {
    currentLevel,
    headerTitle,
    showBottomNav,
    muted,
  } from "$lib/stores/app";
  import { hsk1 } from "$lib/data/hsk1.js";
  import { hsk2 } from "$lib/data/hsk2.js";
  import { onMount } from "svelte";
  import { fade } from "svelte/transition";
  import { goto } from "$app/navigation";
  import type { WordItem } from "$lib/types/word";

  type QuizQuestion = {
    target: WordItem;
    type: number;
    options: WordItem[];
  };

  let items = $state<WordItem[]>([]);
  let quizQueue = $state<QuizQuestion[]>([]);
  let currentIndex = $state(0);
  let currentQuestion = $state<WordItem | null>(null);
  let questionType = $state<1 | 2 | 3>(1); // 1: 音声→意味, 2: 漢字+ピンイン→意味, 3: 意味→中国語
  let options = $state<WordItem[]>([]);
  let score = $state(0);
  let finished = $state(false);
  let selectedOption = $state<WordItem | null>(null);
  let quizAnswered = $state(false);

  const TOTAL_QUESTIONS = 10;

  onMount(() => {
    $headerTitle = "クイズ";
    $showBottomNav = true;
    const rawData = $currentLevel === 1 ? hsk1 : hsk2;
    items = rawData;
    startQuiz();
  });

  function shuffle<T>(array: T[]): T[] {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  function sample<T>(array: T[], n: number): T[] {
    return shuffle([...array]).slice(0, n);
  }

  function generateQuestion(target: WordItem): QuizQuestion {
    const type = (Math.floor(Math.random() * 3) + 1) as 1 | 2 | 3;
    const distractors = sample(
      items.filter((d) => d.id !== target.id),
      3
    );
    const options = shuffle([target, ...distractors]);
    return { target, type, options };
  }

  function startQuiz() {
    score = 0;
    currentIndex = 0;
    finished = false;
    quizAnswered = false;
    const pool = sample(items, TOTAL_QUESTIONS);
    quizQueue = pool.map((item) => generateQuestion(item));
    showQuestion();
  }

  function showQuestion() {
    if (currentIndex >= quizQueue.length) {
      finished = true;
      return;
    }

    const q = quizQueue[currentIndex];
    currentQuestion = q.target;
    questionType = q.type as 1 | 2 | 3;
    options = q.options;
    selectedOption = null;
    quizAnswered = false;

    // タイプ1の場合は自動で音声再生
    if (q.type === 1) {
      setTimeout(() => speak(q.target.char), 300);
    }
  }

  function handleSelect(option: WordItem) {
    if (quizAnswered || !currentQuestion) return;
    quizAnswered = true;
    selectedOption = option;

    const isCorrect = option.id === currentQuestion.id;
    if (isCorrect) {
      score += 10;
      speak("太棒了");
    }

    setTimeout(() => {
      currentIndex++;
      if (currentIndex >= quizQueue.length) {
        finished = true;
      } else {
        showQuestion();
      }
    }, 1200);
  }

  function isCorrectAnswer(opt: WordItem): boolean {
    return (
      quizAnswered && currentQuestion !== null && opt.id === currentQuestion.id
    );
  }

  function isWrongAnswer(opt: WordItem): boolean {
    return (
      quizAnswered &&
      selectedOption === opt &&
      currentQuestion !== null &&
      opt.id !== currentQuestion.id
    );
  }

  function speak(text: string) {
    if ($muted) return;
    if (!("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = "zh-CN";
    u.rate = 0.8;
    window.speechSynthesis.speak(u);
  }

  function goHome() {
    goto("/");
  }
</script>

<div
  class="flex flex-col items-center justify-center min-h-full p-6 animate-slide-up"
>
  {#if !finished && currentQuestion}
    <div class="flex-1 flex flex-col items-center justify-center w-full mb-6">
      {#if questionType === 1 && currentQuestion}
        <!-- タイプ1: 音声のみ → 意味を選択 -->
        <button
          onclick={() => currentQuestion && speak(currentQuestion.char)}
          class="w-20 h-20 bg-blue-100 text-blue-500 rounded-full flex items-center justify-center text-3xl mb-4 cursor-pointer hover:bg-blue-200 transition"
          aria-label="音声を再生"
        >
          <i class="fas fa-volume-up"></i>
        </button>
        <div class="text-gray-500 font-bold">何と言いましたか？</div>
      {:else if questionType === 2 && currentQuestion}
        <!-- タイプ2: 漢字 + ピンイン → 意味を選択 -->
        <div class="text-5xl font-bold text-gray-800 chinese-text mb-2">
          {currentQuestion.char}
        </div>
        <div
          class="text-gray-400 font-serif flex items-center justify-center gap-2"
        >
          {currentQuestion.pinyin}
          <button
            onclick={() => currentQuestion && speak(currentQuestion.char)}
            class="text-gray-400 hover:text-primary transition w-8 h-8 rounded-full flex items-center justify-center hover:bg-orange-50"
            aria-label="音声を再生"
          >
            <i class="fas fa-volume-up text-sm"></i>
          </button>
        </div>
        <div class="text-gray-500 text-sm mt-4 font-bold">
          意味を選んでください
        </div>
      {:else}
        <!-- タイプ3: 日本語意味 → 中国語を選択 -->
        <div class="text-2xl font-bold text-gray-800 mb-4">
          {currentQuestion.meaning}
        </div>
        <div class="text-gray-500 text-sm font-bold">
          中国語を選んでください
        </div>
      {/if}
    </div>

    <div class="w-full">
      {#each options as opt, idx}
        <button
          data-id={opt.id}
          onclick={() => handleSelect(opt)}
          class="option-btn w-full bg-white p-4 rounded-xl mb-3 text-left font-bold text-gray-600 shadow-sm border-2 transition-all active:scale-95
                    {isCorrectAnswer(opt)
            ? 'border-green-500 bg-green-50 text-green-700'
            : isWrongAnswer(opt)
              ? 'border-red-500 bg-red-50 text-red-700'
              : quizAnswered
                ? 'border-transparent'
                : 'border-transparent hover:border-gray-100'}"
          disabled={quizAnswered}
        >
          <span
            class="inline-block w-6 h-6 bg-gray-100 rounded-full text-xs text-gray-400 text-center leading-6 mr-3"
            >{idx + 1}</span
          >
          {#if questionType === 1 || questionType === 2}
            {opt.meaning}
          {:else}
            <span class="chinese-text font-bold text-lg">{opt.char}</span>
          {/if}
        </button>
      {/each}
    </div>
    <div class="h-10"></div>
  {:else if finished}
    <div
      class="h-full flex flex-col items-center justify-center p-6 text-center animate-pop"
      in:fade
    >
      <div class="text-6xl mb-4">🏆</div>
      <h2 class="text-3xl font-bold text-gray-800 mb-2">クイズ終了！</h2>
      <div class="text-5xl font-bold text-primary mb-6">
        {score}<span class="text-lg text-gray-400 ml-2">/ 100</span>
      </div>
      <button
        onclick={goHome}
        class="w-full bg-white border-2 border-gray-100 text-gray-600 font-bold py-3 rounded-xl mb-3 hover:bg-gray-50 transition"
      >
        ホームに戻る
      </button>
      <button
        onclick={startQuiz}
        class="w-full bg-primary text-white font-bold py-3 rounded-xl btn-3d shadow-lg hover:bg-primary-dark transition transform active:scale-95"
      >
        もう一度挑戦
      </button>
    </div>
  {/if}
</div>

<style>
  .btn-3d {
    transition: all 0.1s;
    box-shadow: 0 4px 0 rgba(0, 0, 0, 0.1);
    position: relative;
    top: 0;
  }

  .btn-3d:active {
    top: 4px;
    box-shadow: 0 0 0 rgba(0, 0, 0, 0);
  }

  @keyframes slideUp {
    from {
      transform: translateY(20px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }

  .animate-slide-up {
    animation: slideUp 0.3s ease-out forwards;
  }

  @keyframes pop {
    0% {
      transform: scale(0.95);
      opacity: 0;
    }
    50% {
      transform: scale(1.05);
    }
    100% {
      transform: scale(1);
      opacity: 1;
    }
  }

  .animate-pop {
    animation: pop 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
  }
</style>
