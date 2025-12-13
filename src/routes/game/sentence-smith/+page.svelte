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

  // State for current card
  let materials: Token[] = [];
  let anvilSlots: (Token | null)[] = [];

  let timer = 0;
  let timerInterval: any;
  let isChecking = false;
  let showResult = false;
  let currentResult: CardResult | null = null;
  let feedbackMessage = "";
  let feedbackType: "success" | "error" | "info" = "info";

  $: currentCard = $gameSession.cards[$gameSession.current_card_index];
  $: progress =
    (($gameSession.current_card_index + 1) / $gameSession.cards.length) * 100;

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
  $: if (currentCard) {
    setupCard();
  }

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

  function handleTokenClick(token: Token, source: "materials" | "anvil") {
    if (showResult) return;

    if (source === "materials") {
      // Move to first empty slot in anvil
      const emptyIndex = anvilSlots.findIndex((s) => s === null);
      if (emptyIndex !== -1) {
        anvilSlots[emptyIndex] = token;
        materials = materials.filter((t) => t.id !== token.id);
      }
    } else {
      // Return to materials
      anvilSlots = anvilSlots.map((t) => (t && t.id === token.id ? null : t));
      materials = [...materials, token];
    }
  }

  function forge() {
    // Validate
    if (anvilSlots.some((s) => s === null)) {
      feedbackMessage = "全ての素材を配置してください！";
      feedbackType = "error";
      return;
    }

    clearInterval(timerInterval);

    // Construct sentence from slots
    const formedSentence = anvilSlots.map((t) => t?.text).join("");
    // Basic check: reconstruction equals original?
    // Ideally we check token IDs against original positions but text match is robust enough for simple tokenization
    const isCorrect = formedSentence === currentCard.original_sentence;

    if (isCorrect) {
      handleSuccess();
    } else {
      handleFailure();
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
  }

  function onNext() {
    if ($gameSession.current_card_index >= $gameSession.cards.length - 1) {
      endGame();
      goto("/game"); // Return to menu or show summary
    } else {
      nextCard();
    }
  }
</script>

<div
  class="flex flex-col items-center justify-center min-h-full p-4 bg-slate-50"
>
  <!-- Header -->
  <div
    class="w-full px-4 py-3 bg-white flex justify-between items-center shadow-sm mb-2 rounded-t-xl border-b border-gray-100"
  >
    <div class="flex items-center space-x-2">
      <button
        class="text-gray-400 hover:text-gray-600 active:scale-95 transition-all p-2 -ml-2"
        onclick={() => goto("/game")}
        aria-label="Back to Game Menu"
      >
        <i class="fas fa-arrow-left"></i>
      </button>
      <span class="font-bold text-primary">言葉の鍛冶屋</span>
    </div>
    <div class="text-sm font-mono text-gray-500">
      {timer}s
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
      <p class="text-sm font-medium">
        {feedbackMessage || "言葉を正しい順序で並べ、武器を鍛え上げろ"}
      </p>
    </div>

    <!-- Anvil Area -->
    <div class="flex flex-col justify-center items-center mb-4">
      <div
        class="bg-white p-4 sm:p-6 rounded-xl border-2 border-gray-200 w-full min-h-[180px] sm:min-h-[200px] flex flex-wrap gap-2 sm:gap-3 justify-center items-center content-center relative shadow-sm"
      >
        <div
          class="absolute -top-3 left-4 bg-slate-50 px-2 text-gray-500 text-xs uppercase tracking-widest border border-gray-200 rounded"
        >
          Anvil
        </div>
        {#each anvilSlots as token, i}
          {#if token}
            <button
              in:scale={{ duration: 200 }}
              out:scale={{ duration: 150 }}
              class="bg-amber-100 text-gray-800 px-4 py-3 sm:px-5 sm:py-3 rounded-lg shadow-sm border border-amber-200 font-bold text-base sm:text-lg active:scale-95 transition-all touch-manipulation min-h-[44px] hover:bg-amber-50"
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
          class="bg-primary hover:bg-primary-dark text-white font-bold py-4 px-10 rounded-full shadow-lg shadow-orange-200 transform active:scale-95 transition-all flex items-center gap-2 touch-manipulation min-h-[48px] w-full max-w-xs"
          onclick={forge}
        >
          <i class="fas fa-hammer"></i>
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
      <div class="text-gray-500 text-xs uppercase tracking-widest mb-4 font-bold">
        Materials
      </div>
      <div class="flex flex-wrap justify-center gap-2 sm:gap-3 w-full">
        {#each materials as token (token.id)}
          <button
            in:fly={{ y: 20, duration: 300 }}
            out:scale={{ duration: 200 }}
            animate:flip={{ duration: 300 }}
            class="bg-gray-50 hover:bg-gray-100 text-gray-700 px-4 py-3 sm:px-5 sm:py-3 rounded-lg border border-gray-200 shadow-sm font-medium active:scale-95 transition-all touch-manipulation min-h-[44px] text-sm sm:text-base"
            onclick={() => handleTokenClick(token, "materials")}
          >
            {token.text}
          </button>
        {/each}
      </div>
    </div>
  </div>

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
            <div class="text-5xl sm:text-6xl text-gray-400 mb-2">
              <i class="fas fa-heart-crack"></i>
            </div>
            <h3 class="text-xl sm:text-2xl font-bold text-gray-500">Broken...</h3>
          {:else}
            <div class="text-5xl sm:text-6xl text-primary mb-2 animate-bounce">
              <i class="fas fa-shield-halved"></i>
            </div>
            <!-- Placeholder icon -->
            <h3 class="text-xl sm:text-2xl font-bold text-primary uppercase">
              {currentResult.rating}!
            </h3>
          {/if}
        </div>

        <div class="mb-6 space-y-2 text-gray-700">
          <p class="text-base sm:text-lg font-medium px-2 break-words">
            {currentCard.original_sentence}
          </p>
          <div class="flex justify-center gap-4 text-xs sm:text-sm text-gray-500 flex-wrap">
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
