<script lang="ts">
  import { showSettings, masteredIds, muted } from "$lib/stores/app";
  import { fade } from "svelte/transition";
  import { browser } from "$app/environment";
  import type { TransitionConfig } from "svelte/transition";

  function slideUp(
    node: Element,
    options: { duration?: number } = {}
  ): TransitionConfig {
    const { duration = 300 } = options;
    return {
      duration,
      css: (t: number) => {
        const eased = t;
        return `transform: translateY(${(1 - eased) * 100}%);`;
      },
    };
  }

  function close() {
    $showSettings = false;
  }

  function toggleMute() {
    $muted = !$muted;
    if (browser) {
      localStorage.setItem("hsk1_muted", $muted.toString());
    }
  }

  function resetProgress() {
    if (confirm("学習データをリセットしますか？\nこの操作は取り消せません。")) {
      if (browser) {
        localStorage.removeItem("hsk1_mastered_ids");
      }
      $masteredIds = [];
      close();
    }
  }
</script>

{#if $showSettings}
  <!-- Overlay -->
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div
    class="absolute inset-0 bg-black/50 z-40"
    onclick={close}
    transition:fade={{ duration: 300 }}
  ></div>

  <!-- Modal -->
  <div
    class="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl p-6 z-50 pb-10"
    transition:slideUp={{ duration: 300 }}
  >
    <div class="mb-6">
      <h2 class="text-2xl font-bold text-gray-800 mb-2">設定</h2>
      <p class="text-sm text-gray-500">アプリの動作をカスタマイズできます</p>
    </div>

    <div class="space-y-6">
      <div class="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
        <div class="flex items-center">
          <div
            class="w-10 h-10 bg-orange-100 text-orange-500 rounded-full flex items-center justify-center mr-3"
          >
            <i class="fas fa-volume-{$muted ? 'mute' : 'up'}"></i>
          </div>
          <div>
            <div class="font-bold text-gray-800">音声読み上げ</div>
            <div class="text-xs text-gray-500">
              {$muted ? "オフ" : "オン"}
            </div>
          </div>
        </div>
        <button
          onclick={toggleMute}
          class="relative w-14 h-8 {$muted
            ? 'bg-gray-400'
            : 'bg-primary'} rounded-full transition-colors duration-200"
          aria-label="Toggle sound"
        >
          <span
            class="absolute top-1 left-1 w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-200 {$muted
              ? 'translate-x-0'
              : 'translate-x-6'}"
          ></span>
        </button>
      </div>

      <div class="p-4 bg-red-50 rounded-xl border border-red-100">
        <div class="flex items-center mb-3">
          <div
            class="w-10 h-10 bg-red-100 text-red-500 rounded-full flex items-center justify-center mr-3"
          >
            <i class="fas fa-trash-alt"></i>
          </div>
          <div>
            <div class="font-bold text-gray-800">学習状況をリセット</div>
            <div class="text-xs text-gray-500">
              習得済み単語の記録を削除します
            </div>
          </div>
        </div>
        <button
          onclick={resetProgress}
          class="w-full bg-red-500 text-white font-bold py-3 rounded-xl hover:bg-red-600 transition btn-3d"
        >
          <i class="fas fa-exclamation-triangle mr-2"></i>リセットする
        </button>
      </div>
    </div>

    <div class="mt-8 pt-6 border-t border-gray-200">
      <button
        onclick={close}
        class="w-full bg-gray-100 text-gray-700 font-bold py-3 rounded-xl hover:bg-gray-200 transition"
      >
        閉じる
      </button>
    </div>
  </div>
{/if}

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
</style>
