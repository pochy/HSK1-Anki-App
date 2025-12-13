<script lang="ts">
    import { currentLevel, headerTitle, showBottomNav, totalWords, learnedWords, masteredIds } from '$lib/stores/app';
    import { hsk1 } from '$lib/data/hsk1.js';
    import { hsk2 } from '$lib/data/hsk2.js';
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';

    onMount(() => {
        $headerTitle = 'HSK学習アプリ';
        $showBottomNav = false;
        // Reset stats or set total?
        // Maybe total learned across all levels
        const allData = [...hsk1, ...hsk2];
        $totalWords = allData.length;
        $learnedWords = allData.filter(item => $masteredIds.includes(item.id)).length;
    });

    const levels = [
        { level: 1, data: hsk1, color: 'bg-orange-100 text-orange-600', title: 'HSK 1级', desc: '基础词汇 150 词 (全450語)' },
        { level: 2, data: hsk2, color: 'bg-blue-100 text-blue-600', title: 'HSK 2级', desc: '初级词汇 300 词' }
    ];

    function selectLevel(level) {
        $currentLevel = level;
        goto('/cards');
    }

    function getProgress(levelData) {
        if (!levelData) return 0;
        const mastered = levelData.filter(item => $masteredIds.includes(item.id)).length;
        return Math.round((mastered / levelData.length) * 100);
    }
</script>

<div class="p-6 pb-24 flex flex-col items-center animate-slide-up">
    <div class="w-24 h-24 mb-6 rounded-3xl bg-gradient-to-br from-orange-400 to-red-500 shadow-xl flex items-center justify-center transform rotate-3">
        <span class="text-4xl font-bold text-white">词</span>
    </div>
    <h2 class="text-2xl font-bold text-gray-800 mb-2">HSK Vocabulary</h2>
    <p class="text-gray-500 mb-8 text-center">Master Chinese words<br>level by level</p>

    <div class="w-full space-y-4">
        {#each levels as lvl}
            <button 
                class="w-full bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center hover:shadow-md transition-all active:scale-98 text-left"
                onclick={() => selectLevel(lvl.level)}
            >
                <div class="{lvl.color} w-12 h-12 rounded-xl flex items-center justify-center font-bold text-xl mr-4 shrink-0">
                    {lvl.level}
                </div>
                <div class="flex-1">
                    <div class="font-bold text-gray-800">{lvl.title}</div>
                    <div class="text-xs text-gray-400 mb-2">{lvl.desc}</div>
                    <div class="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                        <div class="bg-primary h-full rounded-full transition-all duration-1000" style="width: {getProgress(lvl.data)}%"></div>
                    </div>
                </div>
                <div class="ml-4 font-bold text-gray-300 text-sm">{getProgress(lvl.data)}%</div>
            </button>
        {/each}
    </div>
</div>

<style>
    @keyframes slide-up {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
    }
    .animate-slide-up {
        animation: slide-up 0.4s ease-out forwards;
    }
</style>
