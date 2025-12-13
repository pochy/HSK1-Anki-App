<script lang="ts">
  import {
    headerTitle,
    totalWords,
    learnedWords,
    showSettings,
  } from "$lib/stores/app";
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";

  // Check if we show back button: if not on home
  let showBack = $derived($page.url.pathname !== "/");

  function goBack() {
    goto("/");
  }
</script>

<header
  class="bg-white/80 h-16 flex items-center px-4 justify-between relative shadow-sm z-20 backdrop-blur-md shrink-0"
>
  {#if showBack}
    <button
      onclick={goBack}
      class="w-10 h-10 rounded-full flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors absolute left-2"
      aria-label="Go back"
    >
      <i class="fas fa-chevron-left"></i>
    </button>
  {/if}

  <h1
    class="font-bold text-lg text-gray-800 absolute left-1/2 transform -translate-x-1/2 whitespace-nowrap"
  >
    {$headerTitle}
  </h1>

  <div class="ml-auto flex items-center gap-2">
    {#if $totalWords > 0}
      <div class="text-xs text-right block">
        <div class="text-gray-400">学習済み</div>
        <div class="font-bold text-primary">
          {$learnedWords}/{$totalWords}
        </div>
      </div>
    {/if}
    <!-- Settings Button -->
    <button
      onclick={() => ($showSettings = true)}
      class="w-10 h-10 rounded-full flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
      aria-label="Settings"
    >
      <i class="fas fa-cog"></i>
    </button>
  </div>
</header>
