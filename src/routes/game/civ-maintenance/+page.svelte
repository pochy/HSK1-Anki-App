<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import {
    headerTitle,
    showBottomNav,
    currentLevel,
    muted,
  } from "$lib/stores/app";
  import {
    city,
    cards,
    selectedBuilding,
    isMaintenance,
    constructBuilding,
    addCardFromWord,
    performMaintenance,
    updateAllBuildingMetrics,
    resetCity,
    addCardToBuilding,
  } from "$lib/stores/civ-maintenance";
  import type {
    Building,
    Card,
    BuildingType,
    QuizResult,
  } from "$lib/types/civ-maintenance";
  import {
    getBuildingEmoji,
    calculateQuizRating,
    calculateDaysUntilZero,
  } from "$lib/utils/civ-maintenance";
  import { hsk1 } from "$lib/data/hsk1.js";
  import { hsk2 } from "$lib/data/hsk2.js";

  let showBuildingDetail = $state(false);
  let showConstructModal = $state(false);
  let showAddCardModal = $state(false);
  let showMaintenanceModal = $state(false);
  let showQuiz = $state(false);
  let showHelpModal = $state(false);
  let currentQuizIndex = $state(0);
  let quizCards = $state<Card[]>([]);
  let quizResults = $state<QuizResult[]>([]);
  let userAnswer = $state("");
  let quizStartTime = $state(0);
  let quizInputRef = $state<HTMLInputElement | null>(null);
  let soundEnabled = $derived(!$muted);

  // クイズ表示時にフォーカスを設定
  $effect(() => {
    if (showQuiz && quizInputRef) {
      setTimeout(() => {
        quizInputRef?.focus();
      }, 100);
    }
  });

  onMount(() => {
    $headerTitle = "文明維持シミュレーション";
    $showBottomNav = true;
    updateAllBuildingMetrics();

    // 定期的にメトリクスを更新（10秒ごと）
    const interval = setInterval(() => {
      updateAllBuildingMetrics();
    }, 10000);

    onDestroy(() => {
      clearInterval(interval);
    });
  });

  // 施設を選択
  function selectBuilding(building: Building) {
    selectedBuilding.set(building);
    showBuildingDetail = true;
  }

  // 施設を建設
  function handleConstructBuilding(
    buildingType: BuildingType,
    category: string
  ) {
    const gridSize = $city.layout.grid_size;
    const existingBuildings = $city.buildings;

    // 空いている位置を探す
    let found = false;
    for (let y = 0; y < gridSize && !found; y++) {
      for (let x = 0; x < gridSize && !found; x++) {
        const occupied = existingBuildings.some(
          (b) => b.position.x === x && b.position.y === y
        );
        if (!occupied) {
          const building = constructBuilding(buildingType, category, {
            x,
            y,
            grid_index: y * gridSize + x,
          });
          selectBuilding(building);
          found = true;
          playSound("construct");
        }
      }
    }
    showConstructModal = false;
  }

  // メンテナンスを開始
  function startMaintenance(building: Building) {
    const buildingCards = $cards.filter(
      (c) => c.building_id === building.building_id
    );

    if (buildingCards.length === 0) {
      alert("この施設にはカードがありません。カードを追加してください。");
      return;
    }

    // 復習が必要なカードを取得
    // 1. 警告フラグが立っているカード
    // 2. 次回復習日が過ぎているカード
    // 3. まだ復習していないカード（初回復習）
    const now = Date.now();
    const today = new Date(now).toISOString().split("T")[0];
    const cardsToReview = buildingCards.filter(
      (c) =>
        c.warning ||
        new Date(c.next_review) <= new Date(today) ||
        c.metadata.total_reviews === 0
    );

    if (cardsToReview.length === 0) {
      alert("復習が必要なカードがありません。");
      return;
    }

    quizCards = cardsToReview;
    quizResults = [];
    currentQuizIndex = 0;
    showQuiz = true;
    showMaintenanceModal = false;
    isMaintenance.set(true);
    startNextQuiz();
  }

  // 次のクイズを開始
  function startNextQuiz() {
    if (currentQuizIndex >= quizCards.length) {
      finishMaintenance();
      return;
    }

    const card = quizCards[currentQuizIndex];
    userAnswer = "";
    quizStartTime = Date.now();
  }

  // クイズを提出
  function submitQuiz() {
    const card = quizCards[currentQuizIndex];
    if (!card) return;

    const timeTaken = (Date.now() - quizStartTime) / 1000;
    const isCorrect = userAnswer.trim() === card.content.answer.trim();
    const rating = calculateQuizRating(isCorrect, timeTaken, 1);

    quizResults.push({
      question: card.content.question,
      user_answer: userAnswer.trim(),
      correct_answer: card.content.answer,
      is_correct: isCorrect,
      time_taken: timeTaken,
      rating,
    });

    if (isCorrect) {
      playSound("success");
    } else {
      playSound("error");
    }

    // 次のクイズへ
    currentQuizIndex++;
    setTimeout(
      () => {
        startNextQuiz();
      },
      isCorrect ? 1000 : 500
    );
  }

  // メンテナンスを完了
  function finishMaintenance() {
    const building = $selectedBuilding;
    if (!building) return;

    const session = performMaintenance(
      building.building_id,
      quizCards,
      quizResults
    );

    showQuiz = false;
    isMaintenance.set(false);
    quizCards = [];
    quizResults = [];
    currentQuizIndex = 0;
    playSound("success");

    // 施設詳細を更新
    selectedBuilding.set(
      $city.buildings.find((b) => b.building_id === building.building_id) ||
        null
    );
  }

  // カードを施設に追加
  function addCardToSelectedBuilding(wordId: number) {
    const building = $selectedBuilding;
    if (!building) return;

    const card = addCardFromWord(wordId, building.building_id);
    if (card) {
      playSound("add");
      showAddCardModal = false;
    }
  }

  // 効果音生成関数
  function playSound(
    type: "construct" | "success" | "error" | "add" | "maintenance"
  ) {
    if (!soundEnabled || typeof window === "undefined" || !window.AudioContext)
      return;

    try {
      const audioContext = new (
        window.AudioContext || (window as any).webkitAudioContext
      )();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      switch (type) {
        case "construct":
          oscillator.type = "sine";
          oscillator.frequency.setValueAtTime(400, audioContext.currentTime);
          oscillator.frequency.exponentialRampToValueAtTime(
            600,
            audioContext.currentTime + 0.2
          );
          gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(
            0.01,
            audioContext.currentTime + 0.2
          );
          oscillator.start();
          oscillator.stop(audioContext.currentTime + 0.2);
          break;
        case "success":
          oscillator.type = "sine";
          oscillator.frequency.setValueAtTime(600, audioContext.currentTime);
          oscillator.frequency.exponentialRampToValueAtTime(
            1200,
            audioContext.currentTime + 0.15
          );
          gainNode.gain.setValueAtTime(0.4, audioContext.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(
            0.01,
            audioContext.currentTime + 0.3
          );
          oscillator.start();
          oscillator.stop(audioContext.currentTime + 0.3);
          break;
        case "error":
          oscillator.type = "sawtooth";
          oscillator.frequency.setValueAtTime(200, audioContext.currentTime);
          oscillator.frequency.exponentialRampToValueAtTime(
            100,
            audioContext.currentTime + 0.2
          );
          gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(
            0.01,
            audioContext.currentTime + 0.2
          );
          oscillator.start();
          oscillator.stop(audioContext.currentTime + 0.2);
          break;
        case "add":
          oscillator.type = "sine";
          oscillator.frequency.setValueAtTime(500, audioContext.currentTime);
          oscillator.frequency.exponentialRampToValueAtTime(
            800,
            audioContext.currentTime + 0.1
          );
          gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(
            0.01,
            audioContext.currentTime + 0.1
          );
          oscillator.start();
          oscillator.stop(audioContext.currentTime + 0.1);
          break;
        case "maintenance":
          oscillator.type = "sine";
          oscillator.frequency.setValueAtTime(300, audioContext.currentTime);
          oscillator.frequency.exponentialRampToValueAtTime(
            500,
            audioContext.currentTime + 0.3
          );
          gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(
            0.01,
            audioContext.currentTime + 0.3
          );
          oscillator.start();
          oscillator.stop(audioContext.currentTime + 0.3);
          break;
      }
    } catch (e) {
      console.error("Sound playback error:", e);
    }
  }

  // 警告レベルの施設を取得
  let warningBuildings = $derived(
    $city.buildings.filter((b) => b.metrics.maintenance_level < 0.3)
  );
</script>

<div
  class="p-4 pb-24 animate-slide-up min-h-screen bg-gradient-to-b from-blue-50 to-purple-50"
>
  <!-- 統計バー -->
  <div class="bg-white rounded-xl p-4 mb-4 shadow-sm">
    <div class="grid grid-cols-4 gap-2 text-center mb-3">
      <div>
        <div class="text-lg font-bold text-blue-600">
          {$city.statistics.total_buildings}
        </div>
        <div class="text-xs text-gray-500">施設</div>
      </div>
      <div>
        <div class="text-lg font-bold text-green-600">
          {Math.round($city.statistics.average_maintenance)}%
        </div>
        <div class="text-xs text-gray-500">維持率</div>
      </div>
      <div>
        <div class="text-lg font-bold text-amber-600">
          {$city.statistics.active_cards}
        </div>
        <div class="text-xs text-gray-500">アクティブ</div>
      </div>
      <div>
        <div class="text-lg font-bold text-purple-600">
          {$city.statistics.city_happiness}
        </div>
        <div class="text-xs text-gray-500">幸福度</div>
      </div>
    </div>
    <div class="grid grid-cols-4 gap-2 text-center text-xs">
      <div>
        <span class="text-gray-600">知識:</span>
        <span class="font-bold">{$city.resources.knowledge}</span>
      </div>
      <div>
        <span class="text-gray-600">エネルギー:</span>
        <span class="font-bold">{$city.resources.energy}</span>
      </div>
      <div>
        <span class="text-gray-600">材料:</span>
        <span class="font-bold">{$city.resources.materials}</span>
      </div>
      <div>
        <span class="text-gray-600">ゴールド:</span>
        <span class="font-bold">{$city.resources.gold}</span>
      </div>
    </div>
  </div>

  <!-- 警告表示 -->
  {#if warningBuildings.length > 0}
    <div
      class="bg-red-50 border border-red-200 rounded-xl p-3 mb-4 flex items-center"
    >
      <i class="fas fa-exclamation-triangle text-red-500 mr-2"></i>
      <span class="text-sm text-red-700">
        {warningBuildings.length}つの施設が危機的状態です！
      </span>
    </div>
  {/if}

  <!-- 都市ビュー -->
  <div class="bg-white rounded-xl p-4 shadow-sm mb-4">
    <div class="flex justify-between items-center mb-4">
      <h3 class="font-bold text-gray-800">都市マップ</h3>
      <div class="flex gap-2">
        <button
          onclick={() => (showHelpModal = true)}
          class="px-3 py-1 bg-gray-300 text-gray-700 rounded-lg text-sm active:scale-95"
          title="遊び方"
        >
          <i class="fas fa-question-circle"></i>
        </button>
        <button
          onclick={() => (showConstructModal = true)}
          class="px-3 py-1 bg-blue-500 text-white rounded-lg text-sm active:scale-95"
        >
          <i class="fas fa-plus mr-1"></i>建設
        </button>
        <button
          onclick={() => resetCity()}
          class="px-3 py-1 bg-gray-200 text-gray-700 rounded-lg text-sm active:scale-95"
        >
          <i class="fas fa-redo mr-1"></i>リセット
        </button>
      </div>
    </div>

    {#if $city.buildings.length === 0}
      <div class="text-center py-12 text-gray-400">
        <i class="fas fa-city text-4xl mb-2"></i>
        <p class="text-sm">まだ施設がありません</p>
        <p class="text-xs mt-1">「建設」ボタンから施設を建設しましょう</p>
      </div>
    {:else}
      <div class="grid grid-cols-2 gap-3">
        {#each $city.buildings as building (building.building_id)}
          {@const isWarning = building.metrics.maintenance_level < 0.3}
          <button
            onclick={() => selectBuilding(building)}
            class="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-3 border-2 transition-all active:scale-95 relative overflow-hidden {isWarning
              ? 'border-red-300 shadow-md warning-pulse'
              : 'border-gray-100'}"
          >
            <div class="flex items-center justify-between mb-2">
              <div class="text-2xl">
                {getBuildingEmoji(building.type)}
              </div>
              {#if isWarning}
                <i class="fas fa-exclamation-circle text-red-500"></i>
              {/if}
            </div>
            <div class="text-xs font-bold text-gray-800 mb-1 truncate">
              {building.name}
            </div>
            <div class="text-xs text-gray-500 mb-2">
              Lv.{building.level} | {building.metrics.population}カード
            </div>
            <div class="w-full bg-gray-200 rounded-full h-1.5 mb-1">
              <div
                class="h-1.5 rounded-full transition-all {building.metrics
                  .maintenance_level >= 0.7
                  ? 'bg-green-500'
                  : building.metrics.maintenance_level >= 0.3
                    ? 'bg-yellow-500'
                    : 'bg-red-500'}"
                style="width: {building.metrics.maintenance_level * 100}%"
              ></div>
            </div>
            <div class="text-xs text-gray-400 text-right">
              {Math.round(building.metrics.maintenance_level * 100)}%
            </div>
          </button>
        {/each}
      </div>
    {/if}
  </div>

  <!-- 施設詳細モーダル -->
  {#if showBuildingDetail && $selectedBuilding}
    {@const building = $selectedBuilding}
    {@const buildingCards = $cards.filter(
      (c) => c.building_id === building.building_id
    )}
    <div
      class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
      role="button"
      tabindex="0"
      onclick={() => {
        showBuildingDetail = false;
        showQuiz = false;
      }}
      onkeydown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          showBuildingDetail = false;
          showQuiz = false;
        }
      }}
    >
      <div
        class="bg-white rounded-2xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto animate-pop"
        role="dialog"
        aria-modal="true"
        tabindex="-1"
        onclick={(e) => e.stopPropagation()}
        onkeydown={(e) => e.stopPropagation()}
      >
        {#if !showQuiz}
          <!-- 施設詳細ビュー -->
          <div class="text-center mb-6">
            <div class="text-6xl mb-4">
              {getBuildingEmoji(building.type)}
            </div>
            <h3 class="text-xl font-bold text-gray-800 mb-2">
              {building.name}
            </h3>
            <p class="text-sm text-gray-600 mb-4">レベル {building.level}</p>

            <div class="space-y-3 mb-6">
              <div>
                <div class="flex justify-between text-sm mb-1">
                  <span class="text-gray-600">維持レベル</span>
                  <span class="font-bold">
                    {Math.round(building.metrics.maintenance_level * 100)}%
                  </span>
                </div>
                <div class="w-full bg-gray-200 rounded-full h-3">
                  <div
                    class="h-3 rounded-full transition-all {building.metrics
                      .maintenance_level >= 0.7
                      ? 'bg-green-500'
                      : building.metrics.maintenance_level >= 0.3
                        ? 'bg-yellow-500'
                        : 'bg-red-500'}"
                    style="width: {building.metrics.maintenance_level * 100}%"
                  ></div>
                </div>
              </div>

              <div class="flex justify-between text-sm">
                <span class="text-gray-600">カード数</span>
                <span class="font-bold">
                  {building.metrics.active_cards} / {building.metrics
                    .population}
                </span>
              </div>

              <div class="flex justify-between text-sm">
                <span class="text-gray-600">効率</span>
                <span class="font-bold">
                  {Math.round(building.metrics.efficiency * 100)}%
                </span>
              </div>

              <div class="flex justify-between text-sm">
                <span class="text-gray-600">幸福度</span>
                <span class="font-bold">{building.metrics.happiness}/100</span>
              </div>
            </div>

            {#each [calculateDaysUntilZero(building, $cards, Date.now())] as daysUntilZero}
              {#if daysUntilZero !== null && daysUntilZero > 0}
                <div
                  class="bg-amber-50 border border-amber-200 rounded-lg p-3 mt-3"
                >
                  <div class="flex items-center text-xs text-amber-700">
                    <i class="fas fa-clock mr-2"></i>
                    <span>
                      復習しない場合、約
                      <span class="font-bold">
                        {daysUntilZero < 1
                          ? Math.round(daysUntilZero * 24) + "時間"
                          : Math.round(daysUntilZero) + "日"}
                      </span>
                      で維持レベルが0%になります
                    </span>
                  </div>
                </div>
              {/if}
            {/each}

            <div class="flex gap-2 mb-4">
              <button
                onclick={() => startMaintenance(building)}
                class="flex-1 bg-blue-500 text-white py-3 rounded-xl font-bold active:scale-95"
              >
                <i class="fas fa-tools mr-2"></i>メンテナンス
              </button>
              <button
                onclick={() => {
                  showAddCardModal = true;
                }}
                class="flex-1 bg-green-500 text-white py-3 rounded-xl font-bold active:scale-95"
              >
                <i class="fas fa-plus mr-2"></i>カード追加
              </button>
            </div>

            <button
              onclick={() => {
                showBuildingDetail = false;
              }}
              class="w-full bg-gray-200 text-gray-700 py-2 rounded-xl active:scale-95"
            >
              閉じる
            </button>
          </div>
        {:else}
          <!-- クイズビュー -->
          <div class="relative">
            <h3 class="text-xl font-bold text-gray-800 mb-4 text-center">
              メンテナンス ({currentQuizIndex + 1} / {quizCards.length})
            </h3>
            {#if currentQuizIndex < quizCards.length}
              {@const card = quizCards[currentQuizIndex]}
              <div class="bg-blue-50 rounded-xl p-4 mb-4">
                <p class="text-sm text-gray-600 mb-2">問題</p>
                <p class="text-2xl font-bold text-gray-800 text-center">
                  {card.content.question}
                </p>
              </div>

              <div class="mb-4">
                <label
                  for="quiz-answer-input"
                  class="block text-sm font-medium text-gray-700 mb-2"
                >
                  答えを入力してください
                </label>
                <input
                  id="quiz-answer-input"
                  type="text"
                  bind:value={userAnswer}
                  bind:this={quizInputRef}
                  onkeydown={(e) => {
                    if (e.key === "Enter") submitQuiz();
                  }}
                  class="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none text-lg"
                  placeholder="中国語を入力"
                />
              </div>

              <button
                onclick={submitQuiz}
                class="w-full bg-blue-500 text-white py-3 rounded-xl font-bold active:scale-95"
              >
                提出
              </button>
            {/if}
          </div>
        {/if}
      </div>
    </div>
  {/if}

  <!-- 建設モーダル -->
  {#if showConstructModal}
    <div
      class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
      role="button"
      tabindex="0"
      onclick={() => (showConstructModal = false)}
      onkeydown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          showConstructModal = false;
        }
      }}
    >
      <div
        class="bg-white rounded-2xl p-6 w-full max-w-md animate-pop"
        role="dialog"
        aria-modal="true"
        tabindex="-1"
        onclick={(e) => e.stopPropagation()}
        onkeydown={(e) => e.stopPropagation()}
      >
        <h3 class="text-xl font-bold text-gray-800 mb-4">施設を建設</h3>
        <div class="grid grid-cols-2 gap-3">
          <button
            onclick={() => handleConstructBuilding("library", "語学")}
            class="p-4 border-2 border-gray-200 rounded-xl hover:bg-blue-50 active:scale-95"
          >
            <div class="text-3xl mb-2">📚</div>
            <div class="text-sm font-bold">図書館</div>
          </button>
          <button
            onclick={() => handleConstructBuilding("hospital", "医学")}
            class="p-4 border-2 border-gray-200 rounded-xl hover:bg-red-50 active:scale-95"
          >
            <div class="text-3xl mb-2">🏥</div>
            <div class="text-sm font-bold">病院</div>
          </button>
          <button
            onclick={() => handleConstructBuilding("power_plant", "物理")}
            class="p-4 border-2 border-gray-200 rounded-xl hover:bg-yellow-50 active:scale-95"
          >
            <div class="text-3xl mb-2">⚡</div>
            <div class="text-sm font-bold">発電所</div>
          </button>
          <button
            onclick={() => handleConstructBuilding("farm", "生物")}
            class="p-4 border-2 border-gray-200 rounded-xl hover:bg-green-50 active:scale-95"
          >
            <div class="text-3xl mb-2">🚜</div>
            <div class="text-sm font-bold">農場</div>
          </button>
          <button
            onclick={() => handleConstructBuilding("factory", "技術")}
            class="p-4 border-2 border-gray-200 rounded-xl hover:bg-gray-50 active:scale-95"
          >
            <div class="text-3xl mb-2">🏭</div>
            <div class="text-sm font-bold">工場</div>
          </button>
          <button
            onclick={() => handleConstructBuilding("school", "教育")}
            class="p-4 border-2 border-gray-200 rounded-xl hover:bg-blue-50 active:scale-95"
          >
            <div class="text-3xl mb-2">🏫</div>
            <div class="text-sm font-bold">学校</div>
          </button>
        </div>
        <button
          onclick={() => (showConstructModal = false)}
          class="mt-4 w-full bg-gray-200 text-gray-700 py-2 rounded-xl active:scale-95"
        >
          閉じる
        </button>
      </div>
    </div>
  {/if}

  <!-- カード追加モーダル -->
  {#if showAddCardModal}
    <div
      class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
      role="button"
      tabindex="0"
      onclick={() => (showAddCardModal = false)}
      onkeydown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          showAddCardModal = false;
        }
      }}
    >
      <div
        class="bg-white rounded-2xl p-6 w-full max-w-md max-h-[80vh] overflow-hidden flex flex-col animate-pop"
        role="dialog"
        aria-modal="true"
        tabindex="-1"
        onclick={(e) => e.stopPropagation()}
        onkeydown={(e) => e.stopPropagation()}
      >
        <h3 class="text-xl font-bold text-gray-800 mb-4">カードを追加</h3>
        <div class="flex-1 overflow-y-auto">
          {#each $currentLevel === 1 ? hsk1 : hsk2 as word}
            {@const isAdded = $cards.some(
              (c) =>
                c.content.wordId === word.id &&
                c.building_id === $selectedBuilding?.building_id
            )}
            <button
              onclick={() => addCardToSelectedBuilding(word.id)}
              disabled={isAdded}
              class="w-full p-3 mb-2 rounded-xl text-left transition-all {isAdded
                ? 'bg-gray-100 text-gray-400'
                : 'bg-white border border-gray-200 hover:bg-blue-50 active:scale-95'}"
            >
              <div class="flex justify-between items-center">
                <div>
                  <div class="font-bold text-gray-800">{word.meaning}</div>
                  <div class="text-sm text-gray-500">
                    {word.char} ({word.pinyin})
                  </div>
                </div>
                {#if isAdded}
                  <i class="fas fa-check-circle text-green-500"></i>
                {:else}
                  <i class="fas fa-plus-circle text-gray-400"></i>
                {/if}
              </div>
            </button>
          {/each}
        </div>
        <button
          onclick={() => (showAddCardModal = false)}
          class="mt-4 w-full bg-gray-200 text-gray-700 py-2 rounded-xl active:scale-95"
        >
          閉じる
        </button>
      </div>
    </div>
  {/if}

  <!-- ヘルプモーダル -->
  {#if showHelpModal}
    <div
      class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
      role="button"
      tabindex="0"
      onclick={() => (showHelpModal = false)}
      onkeydown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          showHelpModal = false;
        }
      }}
    >
      <div
        class="bg-white rounded-2xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto animate-pop"
        role="dialog"
        aria-modal="true"
        tabindex="-1"
        onclick={(e) => e.stopPropagation()}
        onkeydown={(e) => e.stopPropagation()}
      >
        <div class="text-center mb-6">
          <div class="text-5xl mb-4">🏛️</div>
          <h3 class="text-2xl font-bold text-gray-800 mb-2">
            文明維持シミュレーション
          </h3>
          <p class="text-sm text-gray-600">遊び方ガイド</p>
        </div>

        <div class="space-y-4 text-sm text-gray-700">
          <div>
            <h4 class="font-bold text-gray-800 mb-2 flex items-center">
              <i class="fas fa-building text-blue-500 mr-2"></i>
              1. 施設を建設
            </h4>
            <p class="ml-6 mb-2">
              知識のカテゴリーごとに施設を建設します。図書館、病院、発電所など、10種類の施設から選択できます。
            </p>
          </div>

          <div>
            <h4 class="font-bold text-gray-800 mb-2 flex items-center">
              <i class="fas fa-id-card text-green-500 mr-2"></i>
              2. カードを追加
            </h4>
            <p class="ml-6 mb-2">
              施設をタップして「カード追加」ボタンから、HSK単語をカードとして施設に追加します。カードは施設を稼働させる「構成員」です。
            </p>
          </div>

          <div>
            <h4 class="font-bold text-gray-800 mb-2 flex items-center">
              <i class="fas fa-tools text-amber-500 mr-2"></i>
              3. メンテナンス（復習）
            </h4>
            <p class="ml-6 mb-2">
              施設をタップして「メンテナンス」ボタンを押すと、復習が必要なカードをクイズ形式で復習できます。復習を怠ると、カードが機能停止し、施設の維持レベルが下がります。
            </p>
          </div>

          <div>
            <h4 class="font-bold text-gray-800 mb-2 flex items-center">
              <i class="fas fa-chart-line text-purple-500 mr-2"></i>
              4. 維持レベル
            </h4>
            <p class="ml-6 mb-2">
              維持レベルは、施設に所属するカードの貢献度の平均値です。復習を適切に行うことで維持レベルが上がり、施設の生産効率が向上します。
            </p>
            <ul
              class="ml-6 list-disc list-inside space-y-1 text-xs text-gray-600"
            >
              <li>90%以上: 完璧（Pristine）</li>
              <li>70-90%: 良好（Good）</li>
              <li>50-70%: 普通（Fair）</li>
              <li>30-50%: 悪い（Poor）</li>
              <li>30%未満: 廃墟（Ruined）</li>
            </ul>
          </div>

          <div>
            <h4 class="font-bold text-gray-800 mb-2 flex items-center">
              <i class="fas fa-coins text-yellow-500 mr-2"></i>
              5. リソース獲得
            </h4>
            <p class="ml-6 mb-2">
              メンテナンスで復習すると、知識、エネルギー、材料、ゴールドなどのリソースを獲得できます。リソースは施設のアップグレードなどに使用できます（今後の機能）。
            </p>
          </div>

          <div>
            <h4 class="font-bold text-gray-800 mb-2 flex items-center">
              <i class="fas fa-lightbulb text-indigo-500 mr-2"></i>
              コツ
            </h4>
            <ul
              class="ml-6 list-disc list-inside space-y-1 text-xs text-gray-600"
            >
              <li>定期的にメンテナンスを行い、維持レベルを高く保ちましょう</li>
              <li>
                警告マークが表示された施設は優先的にメンテナンスしましょう
              </li>
              <li>
                同じカテゴリーのカードを同じ施設にまとめると管理しやすくなります
              </li>
            </ul>
          </div>
        </div>

        <button
          onclick={() => (showHelpModal = false)}
          class="mt-6 w-full bg-blue-500 text-white py-3 rounded-xl font-bold active:scale-95"
        >
          閉じる
        </button>
      </div>
    </div>
  {/if}
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

  @keyframes pop {
    from {
      opacity: 0;
      transform: scale(0.9);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }

  .animate-slide-up {
    animation: slide-up 0.4s ease-out forwards;
  }

  .animate-pop {
    animation: pop 0.3s ease-out forwards;
  }

  .warning-pulse {
    animation: warning-pulse 2s ease-in-out infinite;
  }

  @keyframes warning-pulse {
    0%,
    100% {
      box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.7);
    }
    50% {
      box-shadow: 0 0 0 10px rgba(239, 68, 68, 0);
    }
  }
</style>
