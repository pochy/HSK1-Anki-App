/**
 * ローグライクRPG：忘却のダンジョンのストア
 * プレイヤー、装備、ダンジョンの状態管理とLocalStorageへの永続化
 */

import { writable, get } from "svelte/store";
import { browser } from "$app/environment";
import type {
  Player,
  Equipment,
  CombatSession,
  Room,
  Enemy,
  QuizResult,
} from "../types/rogue-like-memory";
import {
  updateEquipment,
  createEquipmentFromWord,
  generateFloor,
  executePlayerAttack,
  executeEnemyAttack,
  updateSRSAfterCombat,
} from "../utils/rogue-like-memory";
import { hsk1 } from "../data/hsk1.js";
import { hsk2 } from "../data/hsk2.js";
import { currentLevel } from "./app";
import { masteredIds } from "./app";

// 初期プレイヤーデータ
const createInitialPlayer = (): Player => {
  return {
    player_id: `player_${Date.now()}`,
    name: "冒険者",
    level: 1,
    experience: 0,
    stats: {
      max_hp: 100,
      current_hp: 100,
      max_mp: 50,
      current_mp: 50,
      strength: 10,
      vitality: 10,
      intelligence: 10,
      luck: 5,
    },
    equipment: {
      weapon: null,
      armor: null,
      accessory: null,
      spell: null,
    },
    inventory: [],
    current_dungeon: null,
    gold: 0,
  };
};

// LocalStorageからプレイヤーデータを読み込み
const loadPlayerFromStorage = (): Player | null => {
  if (!browser) return null;

  try {
    const stored = localStorage.getItem("rogue_like_memory_player");
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (e) {
    console.error("Failed to load player from storage:", e);
  }

  return null;
};

// ストアの初期化
const storedPlayer = loadPlayerFromStorage();
const initialPlayer = storedPlayer || createInitialPlayer();

export const player = writable<Player>(initialPlayer);

// LocalStorageへの保存
if (browser) {
  player.subscribe((value) => {
    try {
      localStorage.setItem("rogue_like_memory_player", JSON.stringify(value));
    } catch (e) {
      console.error("Failed to save player to storage:", e);
    }
  });
}

// 現在の戦闘セッション
export const combatSession = writable<CombatSession | null>(null);

// 現在のダンジョンの階層
export const currentFloor = writable<Room[]>([]);

// 現在の部屋
export const currentRoom = writable<Room | null>(null);

// 現在の敵
export const currentEnemy = writable<Enemy | null>(null);

// ゲーム中フラグ
export const isInDungeon = writable<boolean>(false);

// アクション: 装備を更新（減衰計算）
export const updateAllEquipment = () => {
  const currentPlayer = get(player);
  const now = Date.now();

  // 装備スロットの更新
  const updatedEquipment: typeof currentPlayer.equipment = {
    weapon: currentPlayer.equipment.weapon
      ? updateEquipment(currentPlayer.equipment.weapon, now)
      : null,
    armor: currentPlayer.equipment.armor
      ? updateEquipment(currentPlayer.equipment.armor, now)
      : null,
    accessory: currentPlayer.equipment.accessory
      ? updateEquipment(currentPlayer.equipment.accessory, now)
      : null,
    spell: currentPlayer.equipment.spell
      ? updateEquipment(currentPlayer.equipment.spell, now)
      : null,
  };

  // インベントリの更新
  const updatedInventory = currentPlayer.inventory.map((eq) =>
    updateEquipment(eq, now)
  );

  player.update((p) => ({
    ...p,
    equipment: updatedEquipment,
    inventory: updatedInventory,
  }));
};

// アクション: HSK単語から装備を作成してインベントリに追加
export const addEquipmentFromWord = (wordId: number) => {
  const level = get(currentLevel);
  const wordData = level === 1 ? hsk1 : hsk2;
  const word = wordData.find((w) => w.id === wordId);

  if (!word) return;

  const currentPlayer = get(player);

  // 既に同じ単語の装備が存在するかチェック
  const existingEquipment = currentPlayer.inventory.find(
    (eq) => eq.card_content.wordId === wordId
  );

  if (existingEquipment) {
    // 既に存在する場合は何もしない（または装備を選択）
    return;
  }

  // 新しい装備を作成
  const equipmentType = currentPlayer.equipment.weapon ? "armor" : "weapon";
  const newEquipment = createEquipmentFromWord(
    word.id,
    word.char,
    word.pinyin,
    word.meaning,
    word.category,
    equipmentType
  );

  // インベントリに追加
  player.update((p) => ({
    ...p,
    inventory: [...p.inventory, newEquipment],
  }));
};

// アクション: 装備を装備する
export const equipItem = (equipment: Equipment) => {
  player.update((p) => {
    const slot = p.equipment[equipment.type];

    // 既に装備しているアイテムをインベントリに戻す
    if (slot) {
      p.inventory.push(slot);
    }

    // インベントリから削除
    const newInventory = p.inventory.filter(
      (eq) => eq.item_id !== equipment.item_id
    );

    return {
      ...p,
      equipment: {
        ...p.equipment,
        [equipment.type]: equipment,
      },
      inventory: newInventory,
    };
  });
};

// アクション: 装備を外す
export const unequipItem = (
  type: "weapon" | "armor" | "accessory" | "spell"
) => {
  player.update((p) => {
    const equipment = p.equipment[type];
    if (!equipment) return p;

    return {
      ...p,
      equipment: {
        ...p.equipment,
        [type]: null,
      },
      inventory: [...p.inventory, equipment],
    };
  });
};

// アクション: ダンジョンを開始
export const startDungeon = (floorNumber: number = 1) => {
  const floors = generateFloor(floorNumber);
  const firstRoom = floors[0];

  player.update((p) => ({
    ...p,
    current_dungeon: {
      dungeon_id: `dungeon_${Date.now()}`,
      floor: floorNumber,
      room: 0,
      enemies_defeated: 0,
      treasures_found: 0,
      start_time: Date.now(),
    },
  }));

  currentFloor.set(floors);
  currentRoom.set(firstRoom);

  if (firstRoom.enemies && firstRoom.enemies.length > 0) {
    currentEnemy.set(firstRoom.enemies[0]);
  }

  isInDungeon.set(true);
};

// アクション: 戦闘を開始
export const startCombat = (enemy: Enemy) => {
  const currentPlayer = get(player);

  combatSession.set({
    session_id: `combat_${Date.now()}`,
    player: { ...currentPlayer },
    enemy: { ...enemy },
    turn: 0,
    actions: [],
    start_time: Date.now(),
  });

  currentEnemy.set(enemy);
};

// アクション: プレイヤーの攻撃を実行
export const executeAttack = (quizResult: QuizResult) => {
  const session = get(combatSession);
  const currentPlayer = get(player);
  const enemy = get(currentEnemy);

  if (!session || !enemy) return;

  // 装備を選択（武器を優先）
  const equipment = currentPlayer.equipment.weapon;
  if (!equipment) {
    console.error("武器が装備されていません");
    return;
  }

  // プレイヤーの攻撃を実行
  const attackResult = executePlayerAttack(
    currentPlayer,
    enemy,
    equipment,
    quizResult
  );

  // 装備を更新
  const updatedEquipment = updateSRSAfterCombat(equipment, quizResult);
  equipItem(updatedEquipment);

  // プレイヤーのHPを更新
  player.update((p) => ({
    ...p,
    stats: {
      ...p.stats,
      current_hp: Math.max(
        0,
        Math.min(
          p.stats.max_hp,
          p.stats.current_hp + attackResult.playerHpChange
        )
      ),
    },
  }));

  // 敵のHPを更新
  const updatedEnemy = {
    ...enemy,
    stats: {
      ...enemy.stats,
      hp: Math.max(0, enemy.stats.hp + attackResult.enemyHpChange),
    },
  };
  currentEnemy.set(updatedEnemy);

  // セッションに行動を追加
  combatSession.update((s) => {
    if (!s) return s;
    return {
      ...s,
      turn: s.turn + 1,
      actions: [...s.actions, attackResult.action],
      enemy: updatedEnemy,
      player: get(player),
    };
  });

  // 敵が倒されたかチェック
  if (updatedEnemy.stats.hp <= 0) {
    endCombat(true);
  } else {
    // 敵のターン
    setTimeout(() => {
      executeEnemyTurn();
    }, 1000);
  }
};

// アクション: 敵のターンを実行
export const executeEnemyTurn = () => {
  const session = get(combatSession);
  const currentPlayer = get(player);
  const enemy = get(currentEnemy);

  if (!session || !enemy) return;

  const enemyAction = executeEnemyAttack(enemy, currentPlayer);

  // プレイヤーのHPを減らす
  player.update((p) => ({
    ...p,
    stats: {
      ...p.stats,
      current_hp: Math.max(
        0,
        p.stats.current_hp - (enemyAction.damage_dealt || 0)
      ),
    },
  }));

  // セッションに行動を追加
  combatSession.update((s) => {
    if (!s) return s;
    return {
      ...s,
      turn: s.turn + 1,
      actions: [...s.actions, enemyAction],
      player: get(player),
    };
  });

  // プレイヤーが倒されたかチェック
  const updatedPlayer = get(player);
  if (updatedPlayer.stats.current_hp <= 0) {
    endCombat(false);
    // HPを100に回復
    player.update((p) => ({
      ...p,
      stats: {
        ...p.stats,
        current_hp: 100,
      },
    }));
  }
};

// アクション: 戦闘を終了
export const endCombat = (victory: boolean) => {
  const session = get(combatSession);
  const currentPlayer = get(player);
  const enemy = get(currentEnemy);

  if (!session || !enemy) return;

  const duration = (Date.now() - session.start_time) / 1000;

  if (victory) {
    // 勝利時の報酬
    const experienceGained = enemy.stats.max_hp;
    const goldGained = Math.floor(enemy.stats.max_hp * 0.5);

    player.update((p) => ({
      ...p,
      experience: p.experience + experienceGained,
      gold: p.gold + goldGained,
      current_dungeon: p.current_dungeon
        ? {
            ...p.current_dungeon,
            enemies_defeated: p.current_dungeon.enemies_defeated + 1,
          }
        : null,
    }));

    // 部屋をクリア済みにする
    const room = get(currentRoom);
    if (room) {
      currentRoom.update((r) => (r ? { ...r, completed: true } : r));
    }
  }

  combatSession.set(null);
  currentEnemy.set(null);
};

// アクション: 次の部屋に進む
export const moveToNextRoom = () => {
  const currentPlayer = get(player);
  const dungeon = currentPlayer.current_dungeon;
  const floors = get(currentFloor);
  const currentRoomData = get(currentRoom);

  if (!dungeon || !currentRoomData) return;

  const currentRoomIndex = floors.findIndex(
    (r) => r.room_id === currentRoomData.room_id
  );

  if (currentRoomIndex < floors.length - 1) {
    // 次の部屋へ
    const nextRoom = floors[currentRoomIndex + 1];
    currentRoom.set(nextRoom);

    player.update((p) => ({
      ...p,
      current_dungeon: p.current_dungeon
        ? { ...p.current_dungeon, room: currentRoomIndex + 1 }
        : null,
    }));

    if (nextRoom.enemies && nextRoom.enemies.length > 0) {
      startCombat(nextRoom.enemies[0]);
    }
  } else {
    // 階層クリア
    const nextFloor = dungeon.floor + 1;
    const newFloors = generateFloor(nextFloor);
    currentFloor.set(newFloors);
    currentRoom.set(newFloors[0]);

    player.update((p) => ({
      ...p,
      current_dungeon: p.current_dungeon
        ? {
            ...p.current_dungeon,
            floor: nextFloor,
            room: 0,
          }
        : null,
    }));

    if (newFloors[0].enemies && newFloors[0].enemies.length > 0) {
      startCombat(newFloors[0].enemies[0]);
    }
  }
};

// アクション: ダンジョンから退出
export const exitDungeon = () => {
  player.update((p) => ({
    ...p,
    current_dungeon: null,
  }));

  currentFloor.set([]);
  currentRoom.set(null);
  currentEnemy.set(null);
  combatSession.set(null);
  isInDungeon.set(false);
};

// アクション: プレイヤーをリセット
export const resetPlayer = () => {
  if (
    confirm(
      "プレイヤーデータをリセットしますか？すべての装備と進捗が失われます。"
    )
  ) {
    player.set(createInitialPlayer());
    exitDungeon();
  }
};

// 定期的な装備更新（1分ごと）
if (browser) {
  setInterval(() => {
    updateAllEquipment();
  }, 60000); // 60秒
}
