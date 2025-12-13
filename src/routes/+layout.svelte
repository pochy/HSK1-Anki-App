<script lang="ts">
  import "../app.css";
  import favicon from "$lib/assets/favicon.svg";
  import Header from "$lib/components/Header.svelte";
  import BottomNav from "$lib/components/BottomNav.svelte";
  import SettingsModal from "$lib/components/SettingsModal.svelte";
  import { showBottomNav } from "$lib/stores/app";

  let { children } = $props();
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
  <title>HSK学習アプリ</title>
  <!-- Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link
    href="https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@100..900&family=Noto+Serif+SC:wght@200..900&display=swap"
    rel="stylesheet"
  />
  <link
    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"
    rel="stylesheet"
  />
</svelte:head>

<div class="bg-gray-100 flex items-center justify-center min-h-screen">
  <div
    class="h-screen w-full bg-slate-50 flex flex-col font-sans text-gray-800 overflow-hidden sm:h-[800px] sm:w-[500px] sm:rounded-3xl sm:shadow-2xl relative"
  >
    <Header />

    <main
      class="flex-1 overflow-y-auto no-scrollbar relative bg-slate-50 pb-16"
    >
      {@render children()}
    </main>

    {#if $showBottomNav}
      <BottomNav />
    {/if}

    <SettingsModal />
  </div>
</div>
