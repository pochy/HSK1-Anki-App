<script lang="ts">
  import { showSettings, masteredIds, muted } from "$lib/stores/app";
  import { city, updateCitySettings } from "$lib/stores/civ-maintenance";
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

      <!-- 文明維持シミュレーション設定 -->
      <div class="p-4 bg-blue-50 rounded-xl border border-blue-100">
        <div class="flex items-center mb-4">
          <div
            class="w-10 h-10 bg-blue-100 text-blue-500 rounded-full flex items-center justify-center mr-3"
          >
            <i class="fas fa-city"></i>
          </div>
          <div>
            <div class="font-bold text-gray-800">文明維持シミュレーション</div>
            <div class="text-xs text-gray-500">
              復習間隔などの設定を変更できます
            </div>
          </div>
        </div>

        <div class="space-y-4">
          <div>
            <label
              for="initial-interval"
              class="block text-sm font-medium text-gray-700 mb-2"
            >
              新規カードの初期復習間隔
            </label>
            <div class="flex items-center gap-3">
              <input
                id="initial-interval"
                type="number"
                min="1"
                max="30"
                value={$city.settings.initial_review_interval || 1}
                onchange={(e) => {
                  const value = parseInt(e.currentTarget.value) || 1;
                  updateCitySettings({ initial_review_interval: value });
                }}
                class="flex-1 px-4 py-2 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none text-center font-bold"
              />
              <span class="text-sm text-gray-600 w-8">日</span>
            </div>
            <p class="text-xs text-gray-500 mt-1">
              新しく追加したカードの最初の復習間隔（1-30日）
            </p>
          </div>

          <div>
            <label
              for="decay-multiplier"
              class="block text-sm font-medium text-gray-700 mb-2"
            >
              減衰率の倍率
            </label>
            <div class="flex items-center gap-3">
              <input
                id="decay-multiplier"
                type="number"
                min="0.1"
                max="5.0"
                step="0.1"
                value={$city.settings.decay_rate_multiplier || 1.0}
                onchange={(e) => {
                  const value = parseFloat(e.currentTarget.value) || 1.0;
                  updateCitySettings({ decay_rate_multiplier: value });
                }}
                class="flex-1 px-4 py-2 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none text-center font-bold"
              />
              <span class="text-sm text-gray-600 w-12">倍</span>
            </div>
            <p class="text-xs text-gray-500 mt-1">
              カードの減衰速度を調整（1.0が標準、大きいほど早く減衰）
            </p>
          </div>
        </div>
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
