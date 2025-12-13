<script lang="ts">
  import { headerTitle, showBottomNav } from "$lib/stores/app";
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";

  onMount(() => {
    $headerTitle = "ゲーム";
    $showBottomNav = true;
  });

  const games = [
    {
      id: "quiz",
      title: "Quiz",
      description: "総合実力テスト",
      icon: "fa-gamepad",
      color: "bg-blue-100 text-blue-600",
      route: "/quiz",
    },
  ];
</script>

<div class="p-6 pb-24 animate-slide-up">
  <div class="mb-8 text-center">
    <h2 class="text-2xl font-bold text-gray-800 mb-2">ゲーム一覧</h2>
    <p class="text-gray-500 text-sm">学習を楽しみながら進めましょう</p>
  </div>

  <div class="space-y-4">
    {#each games as game}
      <button
        onclick={() => goto(game.route)}
        class="w-full bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center hover:shadow-md transition-all active:scale-98 text-left"
      >
        <div
          class="{game.color} w-16 h-16 rounded-xl flex items-center justify-center text-2xl mr-4 shrink-0"
        >
          <i class="fas {game.icon}"></i>
        </div>
        <div class="flex-1">
          <div class="font-bold text-gray-800 text-lg mb-1">{game.title}</div>
          <div class="text-sm text-gray-400">{game.description}</div>
        </div>
        <div class="ml-4 text-gray-300">
          <i class="fas fa-chevron-right"></i>
        </div>
      </button>
    {/each}
  </div>
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
  .animate-slide-up {
    animation: slide-up 0.4s ease-out forwards;
  }
</style>

