<script>
    import {
        currentLevel,
        headerTitle,
        showBottomNav,
        currentCategory,
        masteredIds,
        totalWords,
        learnedWords,
        muted,
    } from "$lib/stores/app.js";
    import { hsk1 } from "$lib/data/hsk1.js";
    import { hsk2 } from "$lib/data/hsk2.js";
    import { onMount } from "svelte";
    import { fly, fade } from "svelte/transition";

    let items = $state([]);
    let categories = $state([]);
    let currentIndex = $state(0);
    // For transition key
    let uniqueKey = $state(0);
    let direction = $state(1); // 1 for next, -1 for prev
    let showingMeaning = $state(false);

    let currentItem = $derived(items[currentIndex]);
    let isMastered = $derived(
        currentItem ? $masteredIds.includes(currentItem.id) : false,
    );

    onMount(() => {
        $headerTitle = `HSK ${$currentLevel}級`;
        $showBottomNav = true;

        loadData();
    });

    function loadData() {
        const rawData = $currentLevel === 1 ? hsk1 : hsk2;
        categories = ["all", ...new Set(rawData.map((i) => i.category))];

        // Filter
        if ($currentCategory === "all") {
            items = rawData;
        } else {
            items = rawData.filter((i) => i.category === $currentCategory);
        }

        $totalWords = items.length;
        updateLearnedCount();

        // Shuffle or keep order? Default order for now.
        currentIndex = 0;
        uniqueKey = 0;
    }

    function updateLearnedCount() {
        $learnedWords = items.filter((i) => $masteredIds.includes(i.id)).length;
    }

    function setCategory(cat) {
        $currentCategory = cat;
        loadData();
    }

    function nextCard() {
        direction = 1;
        showingMeaning = false;
        if (currentIndex < items.length - 1) {
            currentIndex++;
        } else {
            currentIndex = 0; // Loop
        }
        uniqueKey++;
        autoSpeak();
    }

    function prevCard() {
        direction = -1;
        showingMeaning = false;
        if (currentIndex > 0) {
            currentIndex--;
        } else {
            currentIndex = items.length - 1;
        }
        uniqueKey++;
    }

    function toggleMeaning() {
        showingMeaning = !showingMeaning;
        if (showingMeaning) autoSpeak();
    }

    function toggleMastered() {
        if (!currentItem) return;

        masteredIds.update((ids) => {
            if (ids.includes(currentItem.id)) {
                return ids.filter((id) => id !== currentItem.id);
            } else {
                return [...ids, currentItem.id];
            }
        });
        updateLearnedCount();
    }

    function speak(text) {
        if ($muted) return;
        const u = new SpeechSynthesisUtterance(text);
        u.lang = "zh-CN";
        u.rate = 0.8;
        speechSynthesis.speak(u);
    }

    function autoSpeak() {
        if (currentItem && !$muted) {
            // Speak just the char initially? Or wait for click?
            // User app logic: speak on reveal?
            // "Tap to reveal" usually implies showing meaning.
            // Let's speak char immediately if needed, but maybe better on tap.
            // Existing app: "speak" function called manually or auto?
            // Card says "Tap to reveal", then plays audio.
            if (showingMeaning) {
                speak(currentItem.char);
            }
        }
    }

    // Helper for examples
    function getExamples(item) {
        if (item.examples && Array.isArray(item.examples)) {
            return item.examples.slice(0, 3);
        }
        if (item.example && item.exampleMeaning) {
            return [{ chinese: item.example, japanese: item.exampleMeaning }];
        }
        return [];
    }
</script>

<div class="h-full flex flex-col pt-4">
    <!-- Category Filter -->
    <div class="px-4 mb-4 overflow-x-auto no-scrollbar flex gap-2 shrink-0">
        {#each categories as cat}
            <button
                class="px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors {$currentCategory ===
                cat
                    ? 'bg-primary text-white shadow-md'
                    : 'bg-white text-gray-500 border border-gray-100'}"
                onclick={() => setCategory(cat)}
            >
                {cat === "all" ? "すべて" : cat}
            </button>
        {/each}
    </div>

    <!-- Card Area -->
    <div class="flex-1 px-4 pb-24 relative perspective-1000">
        {#if currentItem}
            {#key uniqueKey}
                <div
                    in:fly={{ x: direction * 50, duration: 300, opacity: 0 }}
                    out:fly={{ x: direction * -50, duration: 300, opacity: 0 }}
                    class="absolute inset-x-4 top-0 bottom-24 bg-white rounded-3xl shadow-xl border border-gray-100 flex flex-col items-center justify-center p-6 text-center transition-all cursor-pointer hover:shadow-2xl"
                    onclick={toggleMeaning}
                    role="button"
                    tabindex="0"
                    onkeydown={(e) => {
                        if (e.key === "Enter" || e.key === " ") toggleMeaning();
                    }}
                    aria-label="Tap to reveal meaning"
                >
                    <div
                        class="flex-1 flex flex-col items-center justify-center w-full"
                    >
                        <div
                            class="text-sm text-gray-400 font-bold mb-4 tracking-widest uppercase"
                        >
                            HSK {$currentLevel}
                        </div>

                        <div
                            class="text-6xl font-bold text-gray-800 mb-4 chinese-text"
                        >
                            {currentItem.char}
                        </div>

                        {#if showingMeaning}
                            <div class="animate-fade-in w-full">
                                <div
                                    class="text-2xl text-primary font-serif mb-6 flex items-center justify-center gap-2"
                                >
                                    {currentItem.pinyin}
                                    <button
                                        onclick={(e) => {
                                            e.stopPropagation();
                                            speak(currentItem.char);
                                        }}
                                        class="text-primary hover:text-primary-dark transition w-8 h-8 rounded-full flex items-center justify-center hover:bg-orange-50"
                                        aria-label="Listen to pronunciation"
                                    >
                                        <i class="fas fa-volume-up text-sm"></i>
                                    </button>
                                </div>
                                <div
                                    class="w-12 h-1 bg-gray-100 mx-auto mb-6 rounded-full"
                                ></div>
                                <div
                                    class="text-2xl font-bold text-gray-700 mb-6"
                                >
                                    {currentItem.meaning}
                                </div>

                                <!-- Examples -->
                                {#each getExamples(currentItem) as ex}
                                    <div
                                        class="text-left bg-gray-50 rounded-xl p-3 mb-2 w-full"
                                    >
                                        <div
                                            class="text-gray-800 font-medium mb-1 chinese-text flex justify-between items-start"
                                        >
                                            <span>{ex.chinese}</span>
                                            <button
                                                onclick={(e) => {
                                                    e.stopPropagation();
                                                    speak(ex.chinese);
                                                }}
                                                class="text-gray-400 hover:text-primary p-1"
                                                aria-label="Listen to example"
                                            >
                                                <i
                                                    class="fas fa-volume-up text-xs"
                                                ></i>
                                            </button>
                                        </div>
                                        <div class="text-xs text-gray-500">
                                            {ex.japanese}
                                        </div>
                                    </div>
                                {/each}
                            </div>
                        {:else}
                            <div
                                class="text-gray-400 text-sm mt-8 animate-pulse"
                            >
                                Tap to reveal
                            </div>
                        {/if}
                    </div>

                    <!-- Master Button -->
                    <button
                        class="absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center transition-all {isMastered
                            ? 'bg-green-100 text-green-500'
                            : 'bg-gray-100 text-gray-300 hover:bg-gray-200'}"
                        onclick={(e) => {
                            e.stopPropagation();
                            toggleMastered();
                        }}
                        aria-label={isMastered
                            ? "Unmark as mastered"
                            : "Mark as mastered"}
                    >
                        <i class="fas fa-check"></i>
                    </button>
                </div>
            {/key}
        {/if}
    </div>

    <!-- Controls -->
    <div
        class="absolute bottom-20 left-0 right-0 px-8 flex items-center justify-between z-10 pointer-events-none"
    >
        <button
            onclick={prevCard}
            class="pointer-events-auto w-14 h-14 bg-white rounded-full shadow-lg text-gray-400 hover:text-primary flex items-center justify-center transition-transform active:scale-95 border border-gray-100"
            aria-label="Previous card"
        >
            <i class="fas fa-arrow-left text-xl"></i>
        </button>
        <button
            onclick={nextCard}
            class="pointer-events-auto w-14 h-14 bg-primary rounded-full shadow-lg shadow-orange-200 text-white flex items-center justify-center transition-transform active:scale-95 hover:bg-primary-dark"
            aria-label="Next card"
        >
            <i class="fas fa-arrow-right text-xl"></i>
        </button>
    </div>
</div>

<style>
    .animate-fade-in {
        animation: fadeIn 0.3s ease-out;
    }
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
</style>
