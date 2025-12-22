<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import { fade, fly, scale } from "svelte/transition";
  import { flip } from "svelte/animate";
  import {
    gameSession,
    isPlaying,
    startGame,
    nextCard,
    endGame,
    srsStore,
  } from "$lib/stores/sentence-smith";
  import {
    calculateRating,
    updateSRS,
    calculateQualityScore,
    determineRarity,
  } from "$lib/utils/fsrs";
  import type { Token, Rating, CardResult } from "$lib/types/sentence-smith";
  import { headerTitle, showBottomNav } from "$lib/stores/app";
  import { goto } from "$app/navigation";
  import { base } from "$app/paths";
  import { hsk1 } from "$lib/data/hsk1";
  import { hsk2 } from "$lib/data/hsk2";

  const allWords = [...hsk1, ...hsk2];

  // State for current card
  let materials = $state<Token[]>([]);
  let anvilSlots = $state<(Token | null)[]>([]);

  let timer = $state(0);
  let timerInterval: any;
  let isChecking = false;
  let showResult = $state(false);
  let currentResult = $state<CardResult | null>(null);
  let feedbackMessage = $state("");
  let feedbackType = $state<"success" | "error" | "info">("info");
  let sessionStreak = $state(0);

  // エフェクト用の状態
  let showParticles = $state(false);
  let showSparkles = $state(false);
  let showShake = $state(false);
  let anvilGlow = $state(false);
  let particles = $state<
    Array<{
      id: number;
      x: number;
      y: number;
      delay: number;
      tx: number;
      ty: number;
    }>
  >([]);

  let currentCard = $derived(
    $gameSession.cards[$gameSession.current_card_index]
  );
  let progress = $derived(
    (($gameSession.current_card_index + 1) / $gameSession.cards.length) * 100
  );

  onMount(() => {
    $headerTitle = "言葉の鍛冶屋";
    $showBottomNav = false; // Full screen mode
    if (!$isPlaying) {
      startGame();
    }
  });

  onDestroy(() => {
    clearInterval(timerInterval);
    $showBottomNav = true; // Restore nav
  });

  // Init card when index changes
  $effect(() => {
    if (currentCard) {
      setupCard();
    }
  });

  function setupCard() {
    clearInterval(timerInterval);
    timer = 0;
    timerInterval = setInterval(() => {
      timer++;
    }, 1000);

    // Prepare materials (shuffled)
    materials = [...currentCard.tokens].sort(() => Math.random() - 0.5);
    // Prepare anvil slots (empty)
    anvilSlots = Array(currentCard.tokens.length).fill(null);

    showResult = false;
    currentResult = null;
    feedbackMessage = "";
  }

  // 効果音生成関数
  function playSound(type: "place" | "success" | "error" | "forge") {
    if (typeof window === "undefined" || !window.AudioContext) return;

    const audioContext = new (
      window.AudioContext || (window as any).webkitAudioContext
    )();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    switch (type) {
      case "place":
        // 金属的な「チン」という音
        oscillator.type = "sine";
        oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(
          400,
          audioContext.currentTime + 0.1
        );
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(
          0.01,
          audioContext.currentTime + 0.1
        );
        oscillator.start();
        oscillator.stop(audioContext.currentTime + 0.1);
        break;
      case "success":
        // 爽快な「パリーン」という金属音
        oscillator.type = "sine";
        oscillator.frequency.setValueAtTime(600, audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(
          1200,
          audioContext.currentTime + 0.15
        );
        oscillator.frequency.exponentialRampToValueAtTime(
          800,
          audioContext.currentTime + 0.3
        );
        gainNode.gain.setValueAtTime(0.4, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(
          0.01,
          audioContext.currentTime + 0.3
        );
        oscillator.start();
        oscillator.stop(audioContext.currentTime + 0.3);
        break;
      case "error":
        // 鈍い「ガチャン」という音
        oscillator.type = "sawtooth";
        oscillator.frequency.setValueAtTime(200, audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(
          100,
          audioContext.currentTime + 0.2
        );
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(
          0.01,
          audioContext.currentTime + 0.2
        );
        oscillator.start();
        oscillator.stop(audioContext.currentTime + 0.2);
        break;
      case "forge":
        // 鍛造音（低い音から高い音へ）
        oscillator.type = "sine";
        oscillator.frequency.setValueAtTime(300, audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(
          600,
          audioContext.currentTime + 0.2
        );
        gainNode.gain.setValueAtTime(0.5, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(
          0.01,
          audioContext.currentTime + 0.2
        );
        oscillator.start();
        oscillator.stop(audioContext.currentTime + 0.2);
        break;
    }
  }

  // パーティクル生成
  function createParticles(count: number = 20) {
    particles = [];
    for (let i = 0; i < count; i++) {
      particles.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: Math.random() * 0.5,
        tx: (Math.random() - 0.5) * 100, // ランダムなX方向の移動
        ty: -80 - Math.random() * 40, // 上方向への移動
      });
    }
    showParticles = true;
    setTimeout(() => {
      showParticles = false;
    }, 1000);
  }

  function createSparkles() {
    showSparkles = true;
    setTimeout(() => {
      showSparkles = false;
    }, 800);
  }

  function speakSentence(text: string) {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "zh-CN";
      utterance.rate = 0.8;
      window.speechSynthesis.speak(utterance);
    }
  }

  /* Dialog Logic */
  let selectedToken = $state<Token | null>(null);
  let showTranslation = $state(false);

  let wordData = $derived.by(() => {
    const t = selectedToken;
    return t ? allWords.find((w) => w.char === t.text) : null;
  });

  function handleTokenClick(token: Token, source: "materials" | "anvil") {
    if (showResult) return;

    if (source === "materials") {
      // Punctuation should be placed immediately without dialog
      const isPunctuation = /[。！？，、\.\?!,\s]/.test(token.text);

      if (isPunctuation) {
        // Move to first empty slot in anvil
        const emptyIndex = anvilSlots.findIndex((s) => s === null);
        if (emptyIndex !== -1) {
          anvilSlots[emptyIndex] = token;
          materials = materials.filter((t) => t.id !== token.id);
          playSound("place");
          anvilGlow = true;
          setTimeout(() => {
            anvilGlow = false;
          }, 300);
        }
        return;
      }

      // Open dialog instead of immediate place
      selectedToken = token;
      showTranslation = false; // Reset translation visibility
      playSound("place"); // Optional: audio feedback for selection
    } else {
      // Return to materials (from anvil)
      anvilSlots = anvilSlots.map((t) => (t && t.id === token.id ? null : t));
      materials = [...materials, token];
      playSound("place");
    }
  }

  function confirmPlacement() {
    if (!selectedToken) return;

    // Move to first empty slot
    const emptyIndex = anvilSlots.findIndex((s) => s === null);
    if (emptyIndex !== -1) {
      anvilSlots[emptyIndex] = selectedToken;
      materials = materials.filter((t) => t.id !== selectedToken!.id);
      playSound("place");
      // Visual feedback
      anvilGlow = true;
      setTimeout(() => {
        anvilGlow = false;
      }, 300);
    } else {
      // Anvil full
      feedbackMessage = "金床がいっぱいです！";
      feedbackType = "error";
      playSound("error");
      showShake = true;
      setTimeout(() => {
        showShake = false;
      }, 500);
    }
    selectedToken = null;
  }

  function closeDialog() {
    selectedToken = null;
  }

  function forge() {
    // Validate
    if (anvilSlots.some((s) => s === null)) {
      feedbackMessage = "全ての素材を配置してください！";
      feedbackType = "error";
      playSound("error");
      showShake = true;
      setTimeout(() => {
        showShake = false;
      }, 500);
      return;
    }

    clearInterval(timerInterval);
    playSound("forge");

    // Construct sentence from slots
    const formedSentence = anvilSlots.map((t) => t?.text).join("");
    // Basic check: reconstruction equals original?
    // Ideally we check token IDs against original positions but text match is robust enough for simple tokenization
    const isCorrect = formedSentence === currentCard.original_sentence;

    if (isCorrect) {
      // 成功エフェクト
      createParticles(30);
      createSparkles();
      playSound("success");
      setTimeout(() => {
        handleSuccess();
      }, 500);
    } else {
      // 失敗エフェクト
      playSound("error");
      showShake = true;
      setTimeout(() => {
        showShake = false;
        handleFailure();
      }, 500);
    }
  }

  function handleSuccess() {
    const rating: Rating = calculateRating(
      timer,
      0,
      currentCard.difficulty_level
    ); // Assuming 0 mistakes logic for now
    const quality = calculateQualityScore(
      rating,
      timer,
      currentCard.difficulty_level
    );

    // Update SRS
    const currentSRS = currentCard.srs_data;
    const { interval, ease_factor } = updateSRS(currentSRS, rating);

    // Save SRS result (mapped by sentence string as ID substitute)
    srsStore.update((s) => ({
      ...s,
      [currentCard.original_sentence]: {
        ...currentSRS,
        interval,
        ease_factor,
        last_review_date: new Date().toISOString(),
        review_count: currentSRS.review_count + 1,
        next_review: new Date(
          Date.now() + interval * 24 * 60 * 60 * 1000
        ).toISOString(),
      },
    }));

    currentResult = {
      card_id: currentCard.card_id,
      time_taken: timer,
      mistakes: 0,
      rating,
      new_interval: interval,
      new_ease_factor: ease_factor,
      item_created: {
        type: "sword", // TODO: Determine based on complexity
        rarity: determineRarity(quality, 5), // Mock streak
        quality_score: quality,
        forged_date: new Date().toISOString(),
      },
    };

    showResult = true;
    feedbackMessage = "鍛造成功！";
    feedbackType = "success";
    sessionStreak++;
    speakSentence(currentCard.original_sentence);
  }

  function handleFailure() {
    // Simple logic: just mark as broken/fail
    // In a real game we might allow retries or show hints
    const rating: Rating = "broken";

    currentResult = {
      card_id: currentCard.card_id,
      time_taken: timer,
      mistakes: 1,
      rating,
      new_interval: 1,
      new_ease_factor: Math.max(1.3, currentCard.srs_data.ease_factor - 0.2),
      item_created: {
        type: "dagger", // Broken dagger
        rarity: "common",
        quality_score: 0,
        forged_date: new Date().toISOString(),
      },
    };

    showResult = true;
    feedbackMessage = "鍛造失敗... 素材が崩れ落ちた。";
    feedbackType = "error";
    sessionStreak = 0;
  }

  function onNext() {
    if ($gameSession.current_card_index >= $gameSession.cards.length - 1) {
      endGame();
      goto(`${base}/game`); // Return to menu or show summary
    } else {
      nextCard();
    }
  }
</script>

<div
  class="flex flex-col items-center justify-center min-h-full p-4 bg-slate-50 relative"
>
  <!-- Header -->
  <div
    class="w-full px-4 py-3 bg-white flex justify-between items-center shadow-sm mb-2 rounded-t-xl border-b border-gray-100"
  >
    <div class="flex items-center space-x-2">
      <button
        class="text-gray-400 hover:text-gray-600 active:scale-95 transition-all p-2 -ml-2"
        onclick={() => goto(`${base}/game`)}
        aria-label="Back to Game Menu"
      >
        <i class="fas fa-arrow-left"></i>
      </button>
      <span class="font-bold text-primary">言葉の鍛冶屋</span>
    </div>
    <div class="text-sm font-mono text-gray-500 flex items-center gap-3">
      {#if sessionStreak > 1}
        <span class="font-bold text-orange-500 animate-pulse">
          Combo x{sessionStreak} 🔥
        </span>
      {/if}
      <span>{timer}s</span>
    </div>
  </div>

  <!-- Progress Bar -->
  <div class="h-1 bg-gray-100 w-full mb-4">
    <div
      class="h-full bg-primary transition-all duration-300"
      style="width: {progress}%"
    ></div>
  </div>

  <!-- Game Area -->
  <div class="flex-1 flex flex-col w-full max-w-2xl">
    <!-- Feedback / Instruction -->
    <div
      class="text-center mb-4 min-h-[1.5rem] px-2"
      class:text-red-500={feedbackType === "error"}
      class:text-green-500={feedbackType === "success"}
      class:text-gray-500={feedbackType === "info"}
    >
      <p
        class="text-sm font-medium transition-all duration-300 {feedbackMessage
          ? 'animate-feedback'
          : ''}"
      >
        {feedbackMessage || "言葉を正しい順序で並べ、武器を鍛え上げろ"}
      </p>
    </div>

    <!-- Anvil Area -->
    <div class="flex flex-col justify-center items-center mb-4">
      <div
        class="bg-white p-4 sm:p-6 rounded-xl border-2 w-full min-h-[180px] sm:min-h-[200px] flex flex-wrap gap-2 sm:gap-3 justify-center items-center content-center relative shadow-sm transition-all duration-300 {anvilGlow
          ? 'border-green-400 shadow-lg shadow-green-200'
          : sessionStreak >= 5
            ? 'blue-fire'
            : sessionStreak >= 2
              ? 'orange-fire'
              : showShake
                ? 'border-red-400 shadow-lg shadow-red-200 animate-shake'
                : 'border-gray-200'}"
      >
        <div
          class="absolute -top-3 left-4 bg-slate-50 px-2 text-gray-500 text-xs uppercase tracking-widest border border-gray-200 rounded"
        >
          Anvil
        </div>
        <!-- 火花エフェクト -->
        {#if showSparkles}
          <div
            class="absolute inset-0 pointer-events-none overflow-hidden rounded-xl"
          >
            {#each Array(15) as _, i}
              <div
                class="absolute sparkle"
                style="left: {Math.random() * 100}%; top: {Math.random() *
                  100}%; animation-delay: {Math.random() * 0.3}s;"
              ></div>
            {/each}
          </div>
        {/if}
        <!-- パーティクルエフェクト -->
        {#if showParticles}
          <div
            class="absolute inset-0 pointer-events-none overflow-hidden rounded-xl"
          >
            {#each particles as particle}
              <div
                class="absolute particle"
                style="left: {particle.x}%; top: {particle.y}%; animation-delay: {particle.delay}s; --tx: {particle.tx}px; --ty: {particle.ty}px;"
              ></div>
            {/each}
          </div>
        {/if}
        {#each anvilSlots as token, i}
          {#if token}
            <button
              in:scale={{ duration: 200 }}
              out:scale={{ duration: 150 }}
              class="bg-amber-100 text-gray-800 px-4 py-3 sm:px-5 sm:py-3 rounded-lg shadow-sm border border-amber-200 font-bold text-base sm:text-lg active:scale-95 transition-all touch-manipulation min-h-[44px] hover:bg-amber-50 relative z-10 animate-token-place"
              onclick={() => handleTokenClick(token, "anvil")}
            >
              {token.text}
            </button>
          {:else}
            <div
              class="w-14 h-14 sm:w-16 sm:h-16 rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 touch-manipulation"
            ></div>
          {/if}
        {/each}
      </div>
    </div>

    <!-- Action Button -->
    <div class="py-4 flex justify-center mb-4">
      {#if !showResult}
        <button
          class="bg-primary hover:bg-primary-dark text-white font-bold py-4 px-10 rounded-full shadow-lg shadow-orange-200 transform active:scale-95 transition-all flex items-center gap-2 touch-manipulation min-h-[48px] w-full max-w-xs hover:shadow-xl hover:scale-105 animate-pulse-slow"
          onclick={forge}
        >
          <i class="fas fa-hammer animate-hammer"></i>
          <span class="tracking-widest">FORGE</span>
        </button>
      {:else}
        <!-- Next Button shown in modal usually, but here as fallback if modal fails styling -->
      {/if}
    </div>

    <!-- Material Area -->
    <div
      class="flex flex-col justify-start items-center bg-white p-4 rounded-2xl border border-gray-200 shadow-sm mb-6"
    >
      <div
        class="text-gray-500 text-xs uppercase tracking-widest mb-4 font-bold"
      >
        Materials
      </div>
      <div class="flex flex-wrap justify-center gap-2 sm:gap-3 w-full">
        {#each materials as token (token.id)}
          <button
            in:fly={{ y: 20, duration: 300 }}
            out:scale={{ duration: 200 }}
            animate:flip={{ duration: 300 }}
            class="bg-gray-50 hover:bg-gray-100 text-gray-700 px-4 py-3 sm:px-5 sm:py-3 rounded-lg border border-gray-200 shadow-sm font-medium active:scale-95 transition-all touch-manipulation min-h-[44px] text-sm sm:text-base hover:shadow-md hover:scale-105"
            onclick={() => handleTokenClick(token, "materials")}
          >
            {token.text}
          </button>
        {/each}
      </div>
    </div>
  </div>

  <!-- Word Card Dialog -->
  {#if selectedToken}
    <div
      class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      transition:fade={{ duration: 200 }}
      role="dialog"
      aria-modal="true"
    >
      <!-- Backdrop click to close -->
      <button
        class="absolute inset-0 w-full h-full cursor-default"
        onclick={closeDialog}
        aria-label="Close dialog"
      ></button>

      <div
        class="bg-white rounded-2xl p-6 w-full max-w-sm shadow-2xl relative z-10 flex flex-col items-center"
        in:scale={{ start: 0.95, duration: 200 }}
      >
        <div
          class="text-xs text-gray-400 uppercase tracking-widest mb-2 font-bold"
        >
          Word Card
        </div>

        <div class="text-4xl font-bold text-gray-800 mb-2 text-center py-4">
          {selectedToken.text}
        </div>

        <div class="flex gap-2 mb-4">
          <span
            class="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-mono border border-gray-200"
          >
            {selectedToken.type}
          </span>
          {#if wordData}
            <span
              class="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-mono border border-blue-100"
            >
              {wordData.pinyin}
            </span>
          {/if}
        </div>

        {#if wordData}
          <!-- Word Actions - Only show if data found -->
          <div class="flex gap-4 mb-6">
            <button
              class="w-12 h-12 flex items-center justify-center rounded-full bg-slate-100 text-slate-600 hover:bg-primary hover:text-white transition-all active:scale-95"
              onclick={() => speakSentence(selectedToken!.text)}
              title="Pronounce"
            >
              <i class="fas fa-volume-up text-xl"></i>
            </button>
            <button
              class="w-12 h-12 flex items-center justify-center rounded-full transition-all active:scale-95 {showTranslation
                ? 'bg-primary text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}"
              onclick={() => (showTranslation = !showTranslation)}
              title="Toggle Meaning"
            >
              <i class="fas fa-language text-xl"></i>
            </button>
          </div>

          {#if showTranslation}
            <div
              class="mb-6 p-4 bg-amber-50 rounded-xl border border-amber-100 text-amber-900 w-full animate-fade-in"
              in:fly={{ y: 10, duration: 200 }}
            >
              <div
                class="text-xs uppercase tracking-widest font-bold opacity-60 mb-1"
              >
                Meaning
              </div>
              <div class="text-lg font-medium">{wordData.meaning}</div>
            </div>
          {/if}
        {:else}
          <div class="mb-6 py-2 text-sm text-gray-400 italic">
            No additional details available
          </div>
        {/if}

        <div class="flex gap-3 w-full">
          <button
            class="flex-1 py-3 px-4 bg-gray-100 hover:bg-gray-200 text-gray-600 font-bold rounded-xl transition-colors"
            onclick={closeDialog}
          >
            Cancel
          </button>
          <button
            class="flex-1 py-3 px-4 bg-primary hover:bg-primary-dark text-white font-bold rounded-xl shadow-md shadow-orange-100 transition-all active:scale-95"
            onclick={confirmPlacement}
          >
            Use
          </button>
        </div>
      </div>
    </div>
  {/if}

  <!-- Result Modal -->
  {#if showResult && currentResult}
    <div
      class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      transition:fade
    >
      <div
        class="bg-white border border-gray-200 rounded-2xl p-6 w-full max-w-sm shadow-2xl text-center"
        in:scale
      >
        <div class="mb-4">
          {#if currentResult.rating === "broken"}
            <div
              class="text-5xl sm:text-6xl text-gray-400 mb-2 animate-shake-icon"
            >
              <i class="fas fa-heart-crack"></i>
            </div>
            <h3 class="text-xl sm:text-2xl font-bold text-gray-500">
              Broken...
            </h3>
          {:else}
            <div
              class="text-5xl sm:text-6xl text-primary mb-2 animate-success-icon"
            >
              <i class="fas fa-shield-halved"></i>
            </div>
            <!-- Placeholder icon -->
            <h3
              class="text-xl sm:text-2xl font-bold text-primary uppercase animate-glow"
            >
              {currentResult.rating}!
            </h3>
          {/if}
        </div>

        <div class="mb-6 space-y-2 text-gray-700">
          <p class="text-base sm:text-lg font-medium px-2 break-words">
            {currentCard.original_sentence}
          </p>
          <div
            class="flex justify-center gap-4 text-xs sm:text-sm text-gray-500 flex-wrap"
          >
            <span>Time: {currentResult.time_taken}s</span>
            <span>Score: {currentResult.item_created.quality_score}</span>
          </div>
        </div>

        <button
          class="w-full bg-primary hover:bg-primary-dark text-white font-bold py-4 rounded-xl transition-all active:scale-95 touch-manipulation min-h-[48px] shadow-lg shadow-orange-200"
          onclick={onNext}
        >
          Next
        </button>
      </div>
    </div>
  {/if}
</div>

<style>
  /* タッチ操作の最適化 */
  .touch-manipulation {
    touch-action: manipulation;
    -webkit-tap-highlight-color: transparent;
  }

  /* モバイルでのボタンタップ領域の確保 */
  button {
    -webkit-tap-highlight-color: transparent;
    user-select: none;
  }

  /* アニメーション最適化 */

  /* 振動アニメーション */
  @keyframes shake {
    0%,
    100% {
      transform: translateX(0);
    }
    10%,
    30%,
    50%,
    70%,
    90% {
      transform: translateX(-5px);
    }
    20%,
    40%,
    60%,
    80% {
      transform: translateX(5px);
    }
  }

  .animate-shake {
    animation: shake 0.5s ease-in-out;
  }

  /* トークン配置アニメーション */
  @keyframes tokenPlace {
    0% {
      transform: scale(0.8);
      opacity: 0.5;
    }
    50% {
      transform: scale(1.1);
    }
    100% {
      transform: scale(1);
      opacity: 1;
    }
  }

  .animate-token-place {
    animation: tokenPlace 0.3s ease-out;
  }

  /* ハンマーアニメーション */
  @keyframes hammer {
    0%,
    100% {
      transform: rotate(0deg);
    }
    25% {
      transform: rotate(-15deg);
    }
    75% {
      transform: rotate(15deg);
    }
  }

  .animate-hammer {
    animation: hammer 1s ease-in-out infinite;
  }

  /* パルスアニメーション（遅い） */
  @keyframes pulse-slow {
    0%,
    100% {
      opacity: 1;
    }
    50% {
      opacity: 0.8;
    }
  }

  .animate-pulse-slow {
    animation: pulse-slow 2s ease-in-out infinite;
  }

  /* Blue Fire Effect for High Streak */
  .blue-fire {
    box-shadow:
      0 0 15px #3b82f6,
      0 0 30px #2563eb,
      inset 0 0 10px #60a5fa;
    border-color: #60a5fa !important;
  }

  /* Orange Fire Effect for Medium Streak */
  .orange-fire {
    box-shadow:
      0 0 15px #f97316,
      0 0 30px #ea580c,
      inset 0 0 10px #fdba74;
    border-color: #fdba74 !important;
  }

  /* 火花エフェクト */
  .sparkle {
    width: 4px;
    height: 4px;
    background: radial-gradient(circle, #fbbf24 0%, transparent 70%);
    border-radius: 50%;
    animation: sparkle 0.8s ease-out forwards;
  }

  @keyframes sparkle {
    0% {
      transform: scale(0) rotate(0deg);
      opacity: 1;
    }
    50% {
      transform: scale(1.5) rotate(180deg);
      opacity: 0.8;
    }
    100% {
      transform: scale(0) rotate(360deg);
      opacity: 0;
    }
  }

  /* パーティクルエフェクト */
  .particle {
    width: 6px;
    height: 6px;
    background: radial-gradient(
      circle,
      #f59e0b 0%,
      #fbbf24 50%,
      transparent 100%
    );
    border-radius: 50%;
    animation: particle 1s ease-out forwards;
  }

  @keyframes particle {
    0% {
      transform: translate(0, 0) scale(1);
      opacity: 1;
    }
    100% {
      transform: translate(var(--tx, 0px), var(--ty, -100px)) scale(0);
      opacity: 0;
    }
  }

  /* 成功アイコンアニメーション */
  @keyframes success-icon {
    0% {
      transform: scale(0) rotate(0deg);
      opacity: 0;
    }
    50% {
      transform: scale(1.3) rotate(180deg);
    }
    100% {
      transform: scale(1) rotate(360deg);
      opacity: 1;
    }
  }

  .animate-success-icon {
    animation: success-icon 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)
      forwards;
  }

  /* 失敗アイコンアニメーション */
  @keyframes shake-icon {
    0%,
    100% {
      transform: translateX(0) rotate(0deg);
    }
    25% {
      transform: translateX(-10px) rotate(-5deg);
    }
    75% {
      transform: translateX(10px) rotate(5deg);
    }
  }

  .animate-shake-icon {
    animation: shake-icon 0.6s ease-in-out;
  }

  /* グローエフェクト */
  @keyframes glow {
    0%,
    100% {
      text-shadow: 0 0 10px rgba(245, 158, 11, 0.5);
    }
    50% {
      text-shadow:
        0 0 20px rgba(245, 158, 11, 0.8),
        0 0 30px rgba(245, 158, 11, 0.6);
    }
  }

  .animate-glow {
    animation: glow 2s ease-in-out infinite;
  }

  /* フェードインアニメーション */
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(5px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .animate-fade-in {
    animation: fadeIn 0.3s ease-out forwards;
  }

  /* フィードバックメッセージアニメーション */
  @keyframes feedback {
    0% {
      transform: scale(0.9);
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

  .animate-feedback {
    animation: feedback 0.4s ease-out;
  }
</style>
