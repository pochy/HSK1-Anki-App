<script>
    import {
        currentLevel,
        headerTitle,
        showBottomNav,
        masteredIds,
        searchQuery,
    } from "$lib/stores/app.js";
    import { hsk1 } from "$lib/data/hsk1.js";
    import { hsk2 } from "$lib/data/hsk2.js";
    import { onMount } from "svelte";

    let items = $state([]);
    let filteredItems = $derived(
        items.filter((item) => {
            if (!$searchQuery) return true;
            const q = $searchQuery.toLowerCase();
            return (
                item.char.includes(q) ||
                item.pinyin.toLowerCase().includes(q) ||
                item.meaning.includes(q)
            );
        }),
    );

    // Group by category
    let groupedItems = $derived.by(() => {
        const groups = {};
        for (const item of filteredItems) {
            if (!groups[item.category]) groups[item.category] = [];
            groups[item.category].push(item);
        }
        return groups;
    });

    onMount(() => {
        $headerTitle = `Word List - HSK ${$currentLevel}`;
        $showBottomNav = true;
        items = $currentLevel === 1 ? hsk1 : hsk2;
    });

    function speak(text) {
        const u = new SpeechSynthesisUtterance(text);
        u.lang = "zh-CN";
        speechSynthesis.speak(u);
    }
</script>

<div class="p-4 pb-24">
    <!-- Search -->
    <div class="mb-6 sticky top-0 z-10 bg-slate-50 pt-2 pb-2">
        <div class="relative">
            <input
                type="text"
                bind:value={$searchQuery}
                placeholder="Search..."
                class="w-full px-4 py-3 pl-12 pr-10 bg-white border-2 border-gray-200 rounded-2xl text-gray-700 placeholder-gray-400 focus:outline-none focus:border-primary transition"
            />
            <i
                class="fas fa-search absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
            ></i>
            {#if $searchQuery}
                <button
                    onclick={() => ($searchQuery = "")}
                    class="absolute right-3 top-1/2 transform -translate-y-1/2 w-8 h-8 rounded-full bg-gray-100 text-gray-400 hover:text-gray-600 flex items-center justify-center transition"
                    aria-label="Clear search"
                >
                    <i class="fas fa-times text-sm"></i>
                </button>
            {/if}
        </div>
    </div>

    {#each Object.entries(groupedItems) as [category, group]}
        <div class="mb-6">
            <div class="flex items-center justify-between mb-3 px-2">
                <h3 class="font-bold text-gray-700 text-lg flex items-center">
                    <span
                        class="w-8 h-8 rounded-lg bg-orange-50 text-orange-500 flex items-center justify-center text-sm mr-2"
                    >
                        <i class="fas fa-tag"></i>
                    </span>
                    {category}
                </h3>
                <span class="text-xs text-gray-400"
                    >{group.filter((i) => $masteredIds.includes(i.id))
                        .length}/{group.length}</span
                >
            </div>
            <div
                class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
            >
                {#each group as item, idx}
                    {@const isMastered = $masteredIds.includes(item.id)}
                    <div
                        class="flex items-center justify-between p-4 {idx <
                        group.length - 1
                            ? 'border-b border-gray-100'
                            : ''} {isMastered ? 'bg-green-50/50' : ''}"
                    >
                        <div class="flex-1">
                            <div class="flex items-center mb-1">
                                <span
                                    class="text-2xl font-bold text-gray-800 chinese-text mr-3"
                                    >{item.char}</span
                                >
                                <span
                                    class="text-sm text-primary font-serif flex items-center gap-1"
                                >
                                    {item.pinyin}
                                </span>
                                {#if isMastered}
                                    <i
                                        class="fas fa-check-circle text-green-500 ml-2"
                                    ></i>
                                {/if}
                            </div>
                            <div class="text-sm text-gray-600">
                                {item.meaning}
                            </div>
                        </div>
                        <button
                            onclick={() => speak(item.char)}
                            class="ml-3 w-10 h-10 rounded-full bg-gray-100 text-gray-400 hover:text-primary hover:bg-orange-50 flex items-center justify-center transition"
                            aria-label="Listen to pronunciation"
                        >
                            <i class="fas fa-volume-up"></i>
                        </button>
                    </div>
                {/each}
            </div>
        </div>
    {/each}

    {#if filteredItems.length === 0}
        <div class="text-center py-12">
            <i class="fas fa-search text-gray-300 text-4xl mb-4"></i>
            <p class="text-gray-400">No matching words</p>
        </div>
    {/if}
</div>
