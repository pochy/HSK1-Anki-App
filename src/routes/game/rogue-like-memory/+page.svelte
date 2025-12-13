<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import { fade, fly, scale } from "svelte/transition";
  import {
    headerTitle,
    showBottomNav,
    currentLevel,
    masteredIds,
  } from "$lib/stores/app";
  import {
    player,
    combatSession,
    currentFloor,
    currentRoom,
    currentEnemy,
    isInDungeon,
    updateAllEquipment,
    addEquipmentFromWord,
    equipItem,
    unequipItem,
    startDungeon,
    startCombat,
    executeAttack,
    endCombat,
    moveToNextRoom,
    exitDungeon,
    resetPlayer,
  } from "$lib/stores/rogue-like-memory";
  import type { Equipment, QuizResult } from "$lib/types/rogue-like-memory";
  import type { WordItem } from "$lib/types/word";
  import {
    calculateQuizRating,
    createEquipmentFromWord,
  } from "$lib/utils/rogue-like-memory";
  import { hsk1 } from "$lib/data/hsk1.js";
  import { hsk2 } from "$lib/data/hsk2.js";
  import { goto } from "$app/navigation";

  // UI状態
  let currentView = $state<"menu" | "equipment" | "dungeon" | "combat">("menu");
  let selectedEquipment = $state<Equipment | null>(null);
  let showEquipmentDetail = $state(false);
  let showQuiz = $state(false);
  let userAnswer = $state("");
  let quizStartTime = $state(0);
  let showCombatResult = $state(false);
  let combatResultMessage = $state("");
  let showCriticalEffect = $state(false);
  let showDamageEffect = $state(false);
  let damageValue = $state(0);
  let quizInputRef = $state<HTMLInputElement | null>(null);
  
  // クイズ問題（選択したHSKレベルからランダムに出題）
  let currentQuizQuestion = $state<{ question: string; answer: string; difficulty: number } | null>(null);

  // エフェクト用
  let particles: Array<{
    id: number;
    x: number;
    y: number;
    vx: number;
    vy: number;
    life: number;
  }> = [];
  let particleIdCounter = 0;

  onMount(() => {
    $headerTitle = "忘却のダンジョン";
    $showBottomNav = false;
    updateAllEquipment();

    // 初回起動時に装備がない場合、習得済みの単語から自動的に装備を追加
    initializeInitialEquipment();
  });

  // クイズ表示時にフォーカスを設定
  $effect(() => {
    if (showQuiz && quizInputRef) {
      setTimeout(() => {
        quizInputRef?.focus();
      }, 100);
    }
  });

  // HPが0になったらメニュー画面に戻し、HPを100に回復
  $effect(() => {
    if ($player.stats.current_hp <= 0 && currentView !== "menu") {
      // ダンジョンから退出
      exitDungeon();
      // HPを100に回復
      player.update((p) => ({
        ...p,
        stats: {
          ...p.stats,
          current_hp: 100,
        },
      }));
      // メニュー画面に戻る
      currentView = "menu";
      showQuiz = false;
    }
  });

  // 初期装備を自動追加
  function initializeInitialEquipment() {
    const currentPlayer = $player;

    // 既に装備やインベントリがある場合はスキップ
    if (currentPlayer.equipment.weapon || currentPlayer.inventory.length > 0) {
      return;
    }

    const level = $currentLevel;
    const wordData = level === 1 ? hsk1 : hsk2;
    const mastered = $masteredIds;

    // 習得済みの単語から選択
    const availableWords = wordData.filter((w) => mastered.includes(w.id));

    let selectedWords: WordItem[];
    if (availableWords.length === 0) {
      // 習得済みの単語がない場合は、最初の5つの単語から選択
      selectedWords = wordData.slice(0, Math.min(5, wordData.length));
    } else {
      // 習得済みの単語から最大3つをランダムに選択
      selectedWords = availableWords
        .sort(() => Math.random() - 0.5)
        .slice(0, Math.min(3, availableWords.length));
    }

    // 最低2つの単語を確保（武器と防具用）
    if (selectedWords.length < 2) {
      // 不足している場合は追加の単語を取得
      const additionalWords = wordData.filter(
        (w) => !selectedWords.some((sw) => sw.id === w.id)
      );
      const needed = 2 - selectedWords.length;
      selectedWords = [...selectedWords, ...additionalWords.slice(0, needed)];
    }

    // 武器と防具を作成（最低2つは確保されている）
    if (selectedWords.length >= 2) {
      // 最初の単語で武器を作成
      const weaponWord = selectedWords[0];
      const weapon = createEquipmentFromWord(
        weaponWord.id,
        weaponWord.char,
        weaponWord.pinyin,
        weaponWord.meaning,
        weaponWord.category,
        "weapon"
      );

      // 2番目の単語で防具を作成
      const armorWord = selectedWords[1];
      const armor = createEquipmentFromWord(
        armorWord.id,
        armorWord.char,
        armorWord.pinyin,
        armorWord.meaning,
        armorWord.category,
        "armor"
      );

      // インベントリに追加
      player.update((p) => ({
        ...p,
        inventory: [weapon, armor],
      }));

      // 武器と防具を自動装備（インベントリ更新を待つ）
      setTimeout(() => {
        // 現在のプレイヤー状態を取得
        const currentPlayer = $player;
        const weaponInInventory = currentPlayer.inventory.find(
          (eq) => eq.item_id === weapon.item_id
        );
        const armorInInventory = currentPlayer.inventory.find(
          (eq) => eq.item_id === armor.item_id
        );

        if (weaponInInventory) {
          equipItem(weaponInInventory);
        }

        setTimeout(() => {
          const updatedPlayer = $player;
          const armorInInventory2 = updatedPlayer.inventory.find(
            (eq) => eq.item_id === armor.item_id
          );
          if (armorInInventory2) {
            equipItem(armorInInventory2);
          }
        }, 100);
      }, 100);
    } else {
      // フォールバック: 単語が1つしかない場合は武器のみ作成
      const weaponWord = selectedWords[0];
      const weapon = createEquipmentFromWord(
        weaponWord.id,
        weaponWord.char,
        weaponWord.pinyin,
        weaponWord.meaning,
        weaponWord.category,
        "weapon"
      );

      player.update((p) => ({
        ...p,
        inventory: [weapon],
      }));

      setTimeout(() => {
        equipItem(weapon);
      }, 50);
    }
  }

  onDestroy(() => {
    $showBottomNav = true;
  });

  // 現在の装備を取得
  let currentWeapon = $derived($player.equipment.weapon);
  let currentArmor = $derived($player.equipment.armor);
  let currentEnemyData = $derived($currentEnemy);
  let combatSessionData = $derived($combatSession);

  // 装備の状態を表示用に取得
  function getEquipmentStatus(equipment: Equipment | null) {
    if (!equipment) return null;
    return {
      name: equipment.name,
      sharpness: Math.round(equipment.condition.sharpness * 100),
      status: equipment.condition.status_label,
      attack: equipment.dynamic_stats.current_attack,
      defense: equipment.dynamic_stats.current_defense,
    };
  }

  // メニュー画面
  function showMenu() {
    currentView = "menu";
  }

  // 装備画面
  function showEquipmentView() {
    currentView = "equipment";
  }

  // ダンジョン開始
  function startNewDungeon() {
    // 直接ストアから武器をチェック
    const weapon = $player.equipment.weapon;

    if (!weapon) {
      alert(
        "武器を装備してください！\n「装備を追加」ボタンから単語を追加して、装備管理画面で装備してください。"
      );
      return;
    }

    startDungeon(1);
    currentView = "dungeon";

    // ストアの更新を待ってから最初の部屋を確認
    setTimeout(() => {
      const room = $currentRoom;
      const enemy = $currentEnemy;

      if (
        room &&
        enemy &&
        room.enemies &&
        room.enemies.length > 0 &&
        !room.completed
      ) {
        // 自動的に戦闘を開始
        startCombat(enemy);
        currentView = "combat";
        // ランダムな問題を生成
        currentQuizQuestion = generateRandomQuiz();
        showQuiz = true;
        quizStartTime = Date.now();
        userAnswer = "";
      }
    }, 150);
  }

  // ダンジョン再開
  function resumeDungeon() {
    if ($player.current_dungeon) {
      currentView = "dungeon";
      const room = $currentRoom;
      if (room && room.enemies && room.enemies.length > 0 && !room.completed) {
        startCombat(room.enemies[0]);
      }
    }
  }

  // HSKレベルからランダムな問題を生成
  function generateRandomQuiz(): { question: string; answer: string; difficulty: number } {
    const level = $currentLevel;
    const wordData = level === 1 ? hsk1 : hsk2;
    
    // ランダムに単語を選択
    const randomIndex = Math.floor(Math.random() * wordData.length);
    const word = wordData[randomIndex];
    
    return {
      question: word.meaning, // 問題：日本語の意味
      answer: word.char, // 答え：中国語
      difficulty: 1, // 難易度（必要に応じて調整可能）
    };
  }

  // 戦闘開始
  function beginCombat() {
    const enemy = $currentEnemy;
    if (enemy) {
      startCombat(enemy);
      currentView = "combat";
      // ランダムな問題を生成
      currentQuizQuestion = generateRandomQuiz();
      showQuiz = true;
      quizStartTime = Date.now();
      userAnswer = "";
    }
  }

  // クイズ提出
  function submitQuiz() {
    if (!currentWeapon || !currentEnemyData || !currentQuizQuestion) return;

    const timeTaken = (Date.now() - quizStartTime) / 1000;
    // 選択したHSKレベルから出題した問題の答えと比較
    const isCorrect =
      userAnswer.trim() === currentQuizQuestion.answer.trim();
    const rating = calculateQuizRating(
      isCorrect,
      timeTaken,
      currentQuizQuestion.difficulty
    );

    const quizResult: QuizResult = {
      question: currentQuizQuestion.question,
      user_answer: userAnswer.trim(),
      correct_answer: currentQuizQuestion.answer,
      is_correct: isCorrect,
      time_taken: timeTaken,
      rating,
    };

    // 想起クリティカルチェック
    const sharpness = currentWeapon.condition.sharpness;
    const isRecallCritical =
      sharpness >= 0.3 && sharpness <= 0.4 && isCorrect && timeTaken <= 3;

    if (isRecallCritical) {
      showCriticalEffect = true;
      setTimeout(() => {
        showCriticalEffect = false;
      }, 2000);
    }

    // 攻撃を実行
    executeAttack(quizResult);

    // ダメージエフェクト
    if (isCorrect) {
      const baseDamage = currentWeapon.dynamic_stats.current_attack;
      const ratingMultiplier = {
        perfect: 1.5,
        good: 1.2,
        ok: 1.0,
        poor: 0.8,
      }[rating];
      damageValue = Math.floor(
        baseDamage * ratingMultiplier * (isRecallCritical ? 2.5 : 1)
      );
      showDamageEffect = true;
      setTimeout(() => {
        showDamageEffect = false;
      }, 1000);
    }

    // 戦闘結果をチェック
    setTimeout(() => {
      const updatedEnemy = $currentEnemy;
      const updatedPlayer = $player;

      if (!updatedEnemy || updatedEnemy.stats.hp <= 0) {
        // 勝利
        combatResultMessage = "勝利！";
        showCombatResult = true;
        setTimeout(() => {
          showCombatResult = false;
          showQuiz = false;
          moveToNextRoom();
          currentView = "dungeon";
        }, 2000);
      } else if (updatedPlayer.stats.current_hp <= 0) {
        // 敗北 - HPが0になったらメニュー画面に戻し、HPを100に回復
        combatResultMessage = "敗北...";
        showCombatResult = true;
        setTimeout(() => {
          showCombatResult = false;
          showQuiz = false;
          exitDungeon();
          // HPを100に回復
          player.update((p) => ({
            ...p,
            stats: {
              ...p.stats,
              current_hp: 100,
            },
          }));
          currentView = "menu";
        }, 2000);
      } else {
        // 続行
        showQuiz = false;
        setTimeout(() => {
          // 新しい問題を生成
          currentQuizQuestion = generateRandomQuiz();
          showQuiz = true;
          quizStartTime = Date.now();
          userAnswer = "";
        }, 1500);
      }
    }, 1000);
  }

  // 装備を選択
  function selectEquipment(equipment: Equipment) {
    selectedEquipment = equipment;
    showEquipmentDetail = true;
  }

  // 装備を装備
  function equipSelectedItem() {
    if (selectedEquipment) {
      equipItem(selectedEquipment);
      showEquipmentDetail = false;
      selectedEquipment = null;
    }
  }

  // 装備を外す
  function unequipSelectedItem(
    type: "weapon" | "armor" | "accessory" | "spell"
  ) {
    unequipItem(type);
  }

  // HSK単語から装備を追加
  function addWordAsEquipment() {
    const level = $currentLevel;
    const wordData = level === 1 ? hsk1 : hsk2;
    const mastered = $masteredIds;

    // 習得済みの単語からランダムに選択
    const availableWords = wordData.filter((w) => mastered.includes(w.id));
    if (availableWords.length === 0) {
      alert("習得済みの単語がありません。まず学習カードで単語を覚えましょう！");
      return;
    }

    const randomWord =
      availableWords[Math.floor(Math.random() * availableWords.length)];
    addEquipmentFromWord(randomWord.id);
    alert(
      `${randomWord.char} (${randomWord.meaning}) が装備として追加されました！`
    );
  }

  // パーティクルエフェクト
  function createParticles(x: number, y: number, count: number = 10) {
    for (let i = 0; i < count; i++) {
      particles.push({
        id: particleIdCounter++,
        x,
        y,
        vx: (Math.random() - 0.5) * 4,
        vy: (Math.random() - 0.5) * 4,
        life: 1.0,
      });
    }
  }

  // パーティクルアニメーション
  $effect(() => {
    const interval = setInterval(() => {
      particles = particles
        .map((p) => ({
          ...p,
          x: p.x + p.vx,
          y: p.y + p.vy,
          life: p.life - 0.02,
        }))
        .filter((p) => p.life > 0);
    }, 16);

    return () => clearInterval(interval);
  });
</script>

<div
  class="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white pb-24"
>
  <!-- メニュー画面 -->
  {#if currentView === "menu"}
    <div class="p-6 animate-slide-up">
      <div class="mb-8 text-center">
        <h1 class="text-3xl font-bold mb-2">忘却のダンジョン</h1>
        <p class="text-gray-400 text-sm">
          装備を研ぎ澄ませ、ダンジョンを攻略せよ
        </p>
      </div>

      <!-- プレイヤー情報 -->
      <div class="bg-gray-800 rounded-xl p-4 mb-4">
        <div class="flex justify-between items-center mb-2">
          <span class="text-sm text-gray-400">レベル {$player.level}</span>
          <span class="text-sm text-gray-400">ゴールド: {$player.gold}</span>
        </div>
        <div class="mb-2">
          <div class="flex justify-between text-xs mb-1">
            <span>HP</span>
            <span>{$player.stats.current_hp} / {$player.stats.max_hp}</span>
          </div>
          <div class="w-full bg-gray-700 rounded-full h-2">
            <div
              class="bg-red-500 h-2 rounded-full transition-all"
              style="width: {($player.stats.current_hp / $player.stats.max_hp) *
                100}%"
            ></div>
          </div>
        </div>
        <div>
          <div class="flex justify-between text-xs mb-1">
            <span>経験値</span>
            <span>{$player.experience}</span>
          </div>
        </div>
      </div>

      <!-- 装備状況 -->
      <div class="bg-gray-800 rounded-xl p-4 mb-4">
        <h3 class="text-sm font-bold mb-2">装備状況</h3>
        <div class="space-y-2 text-sm">
          <div class="flex justify-between">
            <span class="text-gray-400">武器:</span>
            <span>{currentWeapon ? currentWeapon.name : "未装備"}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-gray-400">防具:</span>
            <span>{currentArmor ? currentArmor.name : "未装備"}</span>
          </div>
        </div>
      </div>

      <!-- メニューボタン -->
      <div class="space-y-3">
        {#if $player.current_dungeon}
          <button
            onclick={resumeDungeon}
            class="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold py-4 px-6 rounded-xl transition-all active:scale-98"
          >
            <i class="fas fa-play mr-2"></i>ダンジョン再開
          </button>
        {:else}
          <button
            onclick={startNewDungeon}
            class="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold py-4 px-6 rounded-xl transition-all active:scale-98 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!$player.equipment.weapon}
          >
            <i class="fas fa-sword mr-2"></i>ダンジョン開始
          </button>
        {/if}

        <button
          onclick={showEquipmentView}
          class="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-xl transition-all active:scale-98"
        >
          <i class="fas fa-shield-alt mr-2"></i>装備管理
        </button>

        <button
          onclick={addWordAsEquipment}
          class="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-6 rounded-xl transition-all active:scale-98"
        >
          <i class="fas fa-plus mr-2"></i>装備を追加
        </button>
      </div>
    </div>
  {/if}

  <!-- 装備画面 -->
  {#if currentView === "equipment"}
    <div class="p-6 animate-slide-up">
      <div class="mb-4 flex items-center justify-between">
        <button
          onclick={showMenu}
          aria-label="メニューに戻る"
          class="text-gray-400 hover:text-white transition-colors"
        >
          <i class="fas fa-arrow-left text-xl"></i>
        </button>
        <h2 class="text-xl font-bold">装備管理</h2>
        <div class="w-8"></div>
      </div>

      <!-- 装備スロット -->
      <div class="bg-gray-800 rounded-xl p-4 mb-4">
        <h3 class="text-sm font-bold mb-3">装備中</h3>
        <div class="space-y-3">
          <div
            class="flex items-center justify-between p-3 bg-gray-700 rounded-lg"
          >
            <div class="flex-1">
              <div class="text-sm font-bold">武器</div>
              {#if currentWeapon}
                <div class="text-xs text-gray-400 mt-1">
                  {currentWeapon.name} ({Math.round(
                    currentWeapon.condition.sharpness * 100
                  )}%)
                </div>
              {/if}
            </div>
            {#if currentWeapon}
              <button
                onclick={() => unequipSelectedItem("weapon")}
                class="text-red-400 hover:text-red-300 text-sm"
              >
                外す
              </button>
            {/if}
          </div>

          <div
            class="flex items-center justify-between p-3 bg-gray-700 rounded-lg"
          >
            <div class="flex-1">
              <div class="text-sm font-bold">防具</div>
              {#if currentArmor}
                <div class="text-xs text-gray-400 mt-1">
                  {currentArmor.name} ({Math.round(
                    currentArmor.condition.sharpness * 100
                  )}%)
                </div>
              {/if}
            </div>
            {#if currentArmor}
              <button
                onclick={() => unequipSelectedItem("armor")}
                class="text-red-400 hover:text-red-300 text-sm"
              >
                外す
              </button>
            {/if}
          </div>
        </div>
      </div>

      <!-- インベントリ -->
      <div class="bg-gray-800 rounded-xl p-4">
        <h3 class="text-sm font-bold mb-3">
          インベントリ ({$player.inventory.length})
        </h3>
        {#if $player.inventory.length === 0}
          <div class="text-center text-gray-400 py-8 text-sm">
            インベントリが空です
          </div>
        {:else}
          <div class="space-y-2">
            {#each $player.inventory as equipment}
              <button
                onclick={() => selectEquipment(equipment)}
                class="w-full text-left p-3 bg-gray-700 hover:bg-gray-600 rounded-lg transition-all"
              >
                <div class="flex items-center justify-between">
                  <div class="flex-1">
                    <div class="text-sm font-bold">{equipment.name}</div>
                    <div class="text-xs text-gray-400 mt-1">
                      {equipment.type === "weapon"
                        ? "⚔️"
                        : equipment.type === "armor"
                          ? "🛡️"
                          : "✨"}
                      {equipment.condition.status_label} ({Math.round(
                        equipment.condition.sharpness * 100
                      )}%)
                    </div>
                  </div>
                  <i class="fas fa-chevron-right text-gray-400"></i>
                </div>
              </button>
            {/each}
          </div>
        {/if}
      </div>
    </div>
  {/if}

  <!-- ダンジョン画面 -->
  {#if currentView === "dungeon"}
    <div class="p-6 animate-slide-up">
      <div class="mb-4 flex items-center justify-between">
        <button
          onclick={() => {
            exitDungeon();
            showMenu();
          }}
          aria-label="メニューに戻る"
          class="text-gray-400 hover:text-white transition-colors"
        >
          <i class="fas fa-arrow-left text-xl"></i>
        </button>
        <h2 class="text-xl font-bold">
          {#if $player.current_dungeon}
            {$player.current_dungeon.floor}階
          {/if}
        </h2>
        <div class="w-8"></div>
      </div>

      {#if $currentRoom}
        <div class="bg-gray-800 rounded-xl p-4 mb-4">
          <div class="text-sm mb-2">
            <span class="text-gray-400">部屋タイプ:</span>
            <span class="ml-2">
              {$currentRoom.type === "combat"
                ? "戦闘"
                : $currentRoom.type === "treasure"
                  ? "宝箱"
                  : $currentRoom.type === "rest"
                    ? "休憩"
                    : $currentRoom.type === "boss"
                      ? "ボス"
                      : "イベント"}
            </span>
          </div>
          {#if $currentRoom.enemies && $currentRoom.enemies.length > 0 && !$currentRoom.completed}
            <!-- 戦闘部屋 -->
            <div class="mt-4">
              <div class="text-sm text-gray-400 mb-2">敵が出現しています</div>
              {#each $currentRoom.enemies as enemy}
                <div class="bg-gray-700 rounded-lg p-3 mb-2">
                  <div class="font-bold">{enemy.name}</div>
                  <div class="text-xs text-gray-400 mt-1">
                    HP: {enemy.stats.hp} / {enemy.stats.max_hp}
                  </div>
                </div>
              {/each}
              <button
                onclick={beginCombat}
                class="w-full mt-3 bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-xl transition-all active:scale-98"
              >
                戦闘開始
              </button>
            </div>
          {:else if $currentRoom.type === "rest" && !$currentRoom.completed}
            <!-- 休憩部屋 -->
            <div class="mt-4 text-center">
              <div class="text-4xl mb-4">💤</div>
              <div class="text-lg font-bold mb-2">休憩部屋</div>
              <div class="text-sm text-gray-400 mb-4">HPが全回復します</div>
              <button
                onclick={() => {
                  // HP回復
                  player.update((p) => ({
                    ...p,
                    stats: {
                      ...p.stats,
                      current_hp: p.stats.max_hp,
                    },
                  }));
                  // 部屋をクリア済みにする
                  currentRoom.update((r) =>
                    r ? { ...r, completed: true } : r
                  );
                }}
                class="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-xl transition-all active:scale-98"
              >
                休憩する（HP全回復）
              </button>
            </div>
          {:else if $currentRoom.type === "treasure" && !$currentRoom.completed}
            <!-- 宝箱部屋 -->
            <div class="mt-4 text-center">
              <div class="text-4xl mb-4">💎</div>
              <div class="text-lg font-bold mb-2">宝箱部屋</div>
              <div class="text-sm text-gray-400 mb-4">
                宝箱を開けると装備が手に入るかもしれません
              </div>
              <button
                onclick={() => {
                  // ランダムに装備を追加（50%の確率）
                  if (Math.random() < 0.5) {
                    const level = $currentLevel;
                    const wordData = level === 1 ? hsk1 : hsk2;
                    const mastered = $masteredIds;
                    const availableWords = wordData.filter((w) =>
                      mastered.includes(w.id)
                    );
                    if (availableWords.length > 0) {
                      const randomWord =
                        availableWords[
                          Math.floor(Math.random() * availableWords.length)
                        ];
                      addEquipmentFromWord(randomWord.id);
                      alert(
                        `${randomWord.char} (${randomWord.meaning}) を獲得しました！`
                      );
                    } else {
                      // 習得済みがない場合はゴールドを獲得
                      const goldGained = Math.floor(Math.random() * 50) + 20;
                      player.update((p) => ({
                        ...p,
                        gold: p.gold + goldGained,
                      }));
                      alert(`${goldGained}ゴールドを獲得しました！`);
                    }
                  } else {
                    // ゴールドを獲得
                    const goldGained = Math.floor(Math.random() * 50) + 20;
                    player.update((p) => ({
                      ...p,
                      gold: p.gold + goldGained,
                    }));
                    alert(`${goldGained}ゴールドを獲得しました！`);
                  }
                  // 部屋をクリア済みにする
                  currentRoom.update((r) =>
                    r ? { ...r, completed: true } : r
                  );
                }}
                class="w-full bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-3 px-6 rounded-xl transition-all active:scale-98"
              >
                宝箱を開ける
              </button>
            </div>
          {:else if $currentRoom.type === "event" && !$currentRoom.completed}
            <!-- イベント部屋 -->
            <div class="mt-4 text-center">
              <div class="text-4xl mb-4">✨</div>
              <div class="text-lg font-bold mb-2">イベント部屋</div>
              <div class="text-sm text-gray-400 mb-4">
                何かが起こるかもしれません
              </div>
              <button
                onclick={() => {
                  // ランダムなイベント
                  const eventType = Math.random();
                  if (eventType < 0.3) {
                    // HP回復
                    player.update((p) => ({
                      ...p,
                      stats: {
                        ...p.stats,
                        current_hp: Math.min(
                          p.stats.max_hp,
                          p.stats.current_hp + 20
                        ),
                      },
                    }));
                    alert("HPが20回復しました！");
                  } else if (eventType < 0.6) {
                    // ゴールド獲得
                    const goldGained = Math.floor(Math.random() * 30) + 10;
                    player.update((p) => ({
                      ...p,
                      gold: p.gold + goldGained,
                    }));
                    alert(`${goldGained}ゴールドを獲得しました！`);
                  } else {
                    // 経験値獲得
                    const expGained = Math.floor(Math.random() * 20) + 10;
                    player.update((p) => ({
                      ...p,
                      experience: p.experience + expGained,
                    }));
                    alert(`${expGained}経験値を獲得しました！`);
                  }
                  // 部屋をクリア済みにする
                  currentRoom.update((r) =>
                    r ? { ...r, completed: true } : r
                  );
                }}
                class="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-xl transition-all active:scale-98"
              >
                イベントを実行
              </button>
            </div>
          {:else if $currentRoom.completed}
            <!-- クリア済み -->
            <div class="mt-4 text-center text-green-400">
              <i class="fas fa-check-circle text-2xl mb-2"></i>
              <div class="text-sm mb-4">クリア済み</div>
              <button
                onclick={moveToNextRoom}
                class="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl transition-all active:scale-98"
              >
                次の部屋へ
              </button>
            </div>
          {/if}
        </div>
      {/if}

      <!-- プレイヤー状態 -->
      <div class="bg-gray-800 rounded-xl p-4">
        <div class="mb-2">
          <div class="flex justify-between text-xs mb-1">
            <span>HP</span>
            <span>{$player.stats.current_hp} / {$player.stats.max_hp}</span>
          </div>
          <div class="w-full bg-gray-700 rounded-full h-2">
            <div
              class="bg-red-500 h-2 rounded-full transition-all"
              style="width: {($player.stats.current_hp / $player.stats.max_hp) *
                100}%"
            ></div>
          </div>
        </div>
      </div>
    </div>
  {/if}

  <!-- 戦闘画面 -->
  {#if currentView === "combat"}
    <div class="p-6 animate-slide-up relative">
      <!-- 敵情報 -->
      {#if currentEnemyData}
        <div class="bg-gray-800 rounded-xl p-4 mb-4">
          <div class="text-center mb-3">
            <div class="text-2xl mb-2">
              {currentEnemyData.type === "slime"
                ? "💧"
                : currentEnemyData.type === "goblin"
                  ? "👹"
                  : currentEnemyData.type === "skeleton"
                    ? "💀"
                    : currentEnemyData.type === "wizard"
                      ? "🧙"
                      : "👑"}
            </div>
            <div class="font-bold text-lg">{currentEnemyData.name}</div>
          </div>
          <div class="mb-2">
            <div class="flex justify-between text-xs mb-1">
              <span>HP</span>
              <span
                >{currentEnemyData.stats.hp} / {currentEnemyData.stats
                  .max_hp}</span
              >
            </div>
            <div class="w-full bg-gray-700 rounded-full h-3">
              <div
                class="bg-red-500 h-3 rounded-full transition-all"
                style="width: {(currentEnemyData.stats.hp /
                  currentEnemyData.stats.max_hp) *
                  100}%"
              ></div>
            </div>
          </div>
        </div>
      {/if}

      <!-- プレイヤー情報 -->
      <div class="bg-gray-800 rounded-xl p-4 mb-4">
        <div class="mb-2">
          <div class="flex justify-between text-xs mb-1">
            <span>HP</span>
            <span>{$player.stats.current_hp} / {$player.stats.max_hp}</span>
          </div>
          <div class="w-full bg-gray-700 rounded-full h-2">
            <div
              class="bg-red-500 h-2 rounded-full transition-all"
              style="width: {($player.stats.current_hp / $player.stats.max_hp) *
                100}%"
            ></div>
          </div>
        </div>
        {#if currentWeapon}
          <div class="mt-3 text-sm">
            <div class="text-gray-400">装備中: {currentWeapon.name}</div>
            <div class="text-xs text-gray-500 mt-1">
              切れ味: {Math.round(currentWeapon.condition.sharpness * 100)}% ({currentWeapon
                .condition.status_label})
            </div>
          </div>
        {/if}
      </div>

      <!-- クイズ -->
      {#if showQuiz && currentWeapon && currentQuizQuestion}
        <div class="bg-gray-800 rounded-xl p-4 mb-4">
          <div class="text-sm text-gray-400 mb-2">問題（HSK {$currentLevel}級から出題）</div>
          <div class="text-lg font-bold mb-4">
            {currentQuizQuestion.question}
          </div>

          <input
            type="text"
            bind:value={userAnswer}
            bind:this={quizInputRef}
            onkeydown={(e) => e.key === "Enter" && submitQuiz()}
            placeholder="答えを入力..."
            class="w-full bg-gray-700 text-white px-4 py-3 rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-amber-500"
          />

          <button
            onclick={submitQuiz}
            class="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold py-3 px-6 rounded-xl transition-all active:scale-98"
          >
            攻撃！
          </button>
        </div>
      {/if}

      <!-- ダメージ表示 -->
      {#if showDamageEffect}
        <div
          class="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-6xl font-bold text-yellow-400 z-50 pointer-events-none"
          transition:scale={{ duration: 300 }}
        >
          -{damageValue}
        </div>
      {/if}

      <!-- クリティカルエフェクト -->
      {#if showCriticalEffect}
        <div
          class="fixed inset-0 bg-yellow-400 opacity-30 z-40 pointer-events-none"
          transition:fade={{ duration: 500 }}
        ></div>
        <div
          class="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-4xl font-bold text-yellow-300 z-50 pointer-events-none"
        >
          RECALL CRITICAL!
        </div>
      {/if}

      <!-- 戦闘結果 -->
      {#if showCombatResult}
        <div
          class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          transition:fade
        >
          <div class="bg-gray-800 rounded-xl p-8 text-center" transition:scale>
            <div class="text-3xl font-bold mb-4">{combatResultMessage}</div>
          </div>
        </div>
      {/if}
    </div>
  {/if}

  <!-- 装備詳細モーダル -->
  {#if showEquipmentDetail && selectedEquipment}
    <div
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-6"
      role="button"
      tabindex="0"
      onclick={() => {
        showEquipmentDetail = false;
        selectedEquipment = null;
      }}
      onkeydown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          showEquipmentDetail = false;
          selectedEquipment = null;
        }
      }}
      transition:fade
    >
      <div
        class="bg-gray-800 rounded-xl p-6 max-w-sm w-full"
        role="dialog"
        aria-modal="true"
        tabindex="-1"
        onclick={(e) => e.stopPropagation()}
        onkeydown={(e) => e.stopPropagation()}
        transition:scale
      >
        <h3 class="text-xl font-bold mb-4">{selectedEquipment.name}</h3>
        <div class="space-y-2 text-sm mb-4">
          <div class="flex justify-between">
            <span class="text-gray-400">タイプ:</span>
            <span>{selectedEquipment.type}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-gray-400">切れ味:</span>
            <span
              >{Math.round(selectedEquipment.condition.sharpness * 100)}%</span
            >
          </div>
          <div class="flex justify-between">
            <span class="text-gray-400">状態:</span>
            <span>{selectedEquipment.condition.status_label}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-gray-400">攻撃力:</span>
            <span>{selectedEquipment.dynamic_stats.current_attack}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-gray-400">防御力:</span>
            <span>{selectedEquipment.dynamic_stats.current_defense}</span>
          </div>
        </div>
        <button
          onclick={equipSelectedItem}
          class="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold py-3 px-6 rounded-xl transition-all active:scale-98"
        >
          装備する
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
  .animate-slide-up {
    animation: slide-up 0.4s ease-out forwards;
  }
</style>
