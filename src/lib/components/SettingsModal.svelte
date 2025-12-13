<script>
    import { showSettings, masteredIds, muted } from "$lib/stores/app.js";
    import { fade } from "svelte/transition";

    function close() {
        $showSettings = false;
    }

    function clearProgress() {
        if (confirm("Are you sure you want to reset all progress?")) {
            $masteredIds = [];
            close();
        }
    }
</script>

{#if $showSettings}
    <div class="absolute inset-0 z-50 flex items-center justify-center p-4">
        <!-- Backdrop -->
        <!-- svelte-ignore a11y_click_events_have_key_events -->
        <!-- svelte-ignore a11y_no_static_element_interactions -->
        <div
            class="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onclick={close}
            transition:fade
        ></div>

        <!-- Modal -->
        <div
            class="bg-white rounded-3xl w-full max-w-sm p-6 relative z-10 shadow-2xl space-y-4"
            transition:fade={{ duration: 200 }}
        >
            // Removed y param if simple fade preferred or default
            <div class="flex items-center justify-between mb-2">
                <h3 class="text-xl font-bold text-gray-800">Settings</h3>
                <button
                    onclick={close}
                    class="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:text-gray-800"
                    aria-label="Close settings"
                >
                    <i class="fas fa-times"></i>
                </button>
            </div>

            <div class="space-y-4">
                <div
                    class="flex items-center justify-between p-4 bg-gray-50 rounded-2xl"
                >
                    <div class="flex items-center">
                        <div
                            class="w-10 h-10 rounded-full bg-blue-100 text-blue-500 flex items-center justify-center mr-3"
                        >
                            <i class="fas fa-volume-up"></i>
                        </div>
                        <span class="font-bold text-gray-700"
                            >Sound Effects</span
                        >
                    </div>
                    <button
                        class="w-12 h-7 rounded-full transition-colors relative {$muted
                            ? 'bg-gray-300'
                            : 'bg-green-500'}"
                        onclick={() => ($muted = !$muted)}
                        aria-label="Toggle sound"
                    >
                        <div
                            class="absolute top-1 left-1 w-5 h-5 bg-white rounded-full shadow-sm transition-transform {$muted
                                ? 'translate-x-0'
                                : 'translate-x-5'}"
                        ></div>
                    </button>
                </div>

                <button
                    onclick={clearProgress}
                    class="w-full p-4 bg-red-50 text-red-500 rounded-2xl font-bold flex items-center justify-center hover:bg-red-100 transition"
                >
                    <i class="fas fa-trash-alt mr-2"></i>
                    Reset Progress
                </button>
            </div>

            <div class="text-center text-xs text-gray-400 mt-4">
                HSK Anki App v2.0
            </div>
        </div>
    </div>
{/if}
