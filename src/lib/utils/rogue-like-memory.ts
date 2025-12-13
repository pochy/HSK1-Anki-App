/**
 * ローグライクRPG：忘却のダンジョンのゲームロジック
 */

import type {
  Equipment,
  EquipmentType,
  StatusLabel,
  DynamicStats,
  QuizResult,
  QuizRating,
  CombatAction,
  Enemy,
  Player,
  EquipmentUpdate,
  CombatResult,
  Room,
  RoomType,
  Attribute,
  EnemyType,
  Rarity,
} from "../types/rogue-like-memory";

/**
 * 現在の切れ味を計算（時間経過による減衰）
 */
export function calculateCurrentSharpness(
  equipment: Equipment,
  currentTime: number
): number {
  const timeSinceLastUsed =
    (currentTime - equipment.condition.last_used) / 3600; // 時間単位
  const decayAmount = timeSinceLastUsed * equipment.condition.decay_rate;
  const newSharpness = Math.max(0, equipment.condition.sharpness - decayAmount);

  return newSharpness;
}

/**
 * 減衰率を更新（安定性と復習回数に基づく）
 */
export function updateDecayRate(
  stability: number,
  review_count: number
): number {
  // 安定性が高いほど、復習回数が多いほど減衰率が低い
  const baseDecayRate = 2.0; // 基本減衰率（%/時間）
  const stabilityModifier = Math.max(0.1, 1.0 / (stability / 10));
  const reviewModifier = Math.max(0.5, 1.0 / (review_count / 10));

  return baseDecayRate * stabilityModifier * reviewModifier;
}

/**
 * 状態ラベルを更新
 */
export function updateStatusLabel(sharpness: number): StatusLabel {
  if (sharpness >= 0.8) return "Sharp";
  if (sharpness >= 0.5) return "Dull";
  if (sharpness >= 0.2) return "Rusty";
  return "Broken";
}

/**
 * 動的ステータスを計算
 */
export function calculateDynamicStats(equipment: Equipment): DynamicStats {
  const sharpness = equipment.condition.sharpness;

  return {
    current_attack: Math.floor(equipment.base_stats.attack * sharpness),
    current_defense: Math.floor(equipment.base_stats.defense * sharpness),
    current_magic_power: equipment.base_stats.magic_power
      ? Math.floor(equipment.base_stats.magic_power * sharpness)
      : undefined,
  };
}

/**
 * 装備を更新（減衰計算と動的ステータス再計算）
 */
export function updateEquipment(
  equipment: Equipment,
  currentTime: number
): Equipment {
  const newSharpness = calculateCurrentSharpness(equipment, currentTime);
  const newStatusLabel = updateStatusLabel(newSharpness);

  return {
    ...equipment,
    condition: {
      ...equipment.condition,
      sharpness: newSharpness,
      status_label: newStatusLabel,
    },
    dynamic_stats: calculateDynamicStats({
      ...equipment,
      condition: {
        ...equipment.condition,
        sharpness: newSharpness,
        status_label: newStatusLabel,
      },
    }),
  };
}

/**
 * クイズ結果の評価を計算
 */
export function calculateQuizRating(
  isCorrect: boolean,
  timeTaken: number,
  difficulty: number
): QuizRating {
  if (!isCorrect) return "poor";

  const timeLimit = difficulty * 3; // 難易度に応じた時間制限（秒）
  const perfectTime = timeLimit * 0.4;
  const goodTime = timeLimit * 0.7;

  if (timeTaken <= perfectTime) return "perfect";
  if (timeTaken <= goodTime) return "good";
  if (timeTaken <= timeLimit) return "ok";
  return "poor";
}

/**
 * 想起クリティカルをチェック
 */
export function checkRecallCritical(
  equipment: Equipment,
  quizResult: QuizResult
): boolean {
  // 切れ味が0.3-0.4（忘れかけ）の状態で正解するとクリティカル
  const sharpness = equipment.condition.sharpness;
  const isForgotten = sharpness >= 0.3 && sharpness <= 0.4;
  const isCorrect = quizResult.is_correct;
  const isQuick = quizResult.time_taken <= 3; // 3秒以内

  return isForgotten && isCorrect && isQuick;
}

/**
 * プレイヤーの攻撃を実行
 */
export function executePlayerAttack(
  player: Player,
  enemy: Enemy,
  equipment: Equipment,
  quizResult: QuizResult
): {
  action: CombatAction;
  equipmentUpdate: EquipmentUpdate;
  playerHpChange: number;
  enemyHpChange: number;
} {
  let damage = 0;
  let critical = false;
  let sharpnessUpdate = equipment.condition.sharpness;
  let playerHpChange = 0;

  if (quizResult.is_correct) {
    // 正解時
    const baseDamage = equipment.dynamic_stats.current_attack;
    const ratingMultiplier = {
      perfect: 1.5,
      good: 1.2,
      ok: 1.0,
      poor: 0.8,
    }[quizResult.rating];

    damage = Math.floor(baseDamage * ratingMultiplier);

    // 想起クリティカル（Recall Critical）
    const isRecallCritical = checkRecallCritical(equipment, quizResult);
    if (isRecallCritical) {
      damage = Math.floor(damage * 2.5);
      critical = true;

      // HP回復
      const hpRecovery = Math.floor(damage * 0.1);
      playerHpChange = hpRecovery;
    }

    // 装備を研ぎ澄ます
    sharpnessUpdate = 1.0;
  } else {
    // 不正解時
    damage = 0;
    critical = false;

    // 装備の耐久度が下がる
    const durabilityLoss = 10;
    sharpnessUpdate = Math.max(0, equipment.condition.sharpness - 0.1);

    // プレイヤーがダメージを受ける
    const enemyDamage = Math.floor(enemy.stats.attack * 0.5);
    playerHpChange = -enemyDamage;
  }

  // 敵のHPを減らす
  const enemyHpChange = -damage;

  const action: CombatAction = {
    actor: "player",
    action_type: "attack",
    equipment_used: equipment,
    quiz_result: quizResult,
    damage_dealt: damage,
    damage_taken: quizResult.is_correct
      ? 0
      : Math.floor(enemy.stats.attack * 0.5),
    critical: critical,
    timestamp: Date.now(),
  };

  const equipmentUpdate: EquipmentUpdate = {
    equipment_id: equipment.item_id,
    sharpness_before: equipment.condition.sharpness,
    sharpness_after: sharpnessUpdate,
    recall_critical: critical,
  };

  return { action, equipmentUpdate, playerHpChange, enemyHpChange };
}

/**
 * SRSデータを更新（戦闘後）
 */
export function updateSRSAfterCombat(
  equipment: Equipment,
  quizResult: QuizResult
): Equipment {
  const rating = quizResult.rating;
  const newSRS = { ...equipment.srs_data };

  switch (rating) {
    case "perfect":
      newSRS.interval = Math.round(newSRS.interval * 2.5);
      newSRS.stability = Math.round(newSRS.stability * 1.3);
      newSRS.ease_factor = Math.min(newSRS.ease_factor + 0.15, 3.0);
      break;
    case "good":
      newSRS.interval = Math.round(newSRS.interval * 1.8);
      newSRS.stability = Math.round(newSRS.stability * 1.15);
      break;
    case "ok":
      newSRS.interval = Math.round(newSRS.interval * 1.2);
      newSRS.stability = Math.round(newSRS.stability * 1.05);
      break;
    case "poor":
      newSRS.interval = Math.max(1, Math.round(newSRS.interval * 0.8));
      newSRS.stability = Math.round(newSRS.stability * 0.9);
      newSRS.ease_factor = Math.max(newSRS.ease_factor - 0.1, 1.3);
      break;
  }

  // 次回復習日の計算
  const nextReviewDate = new Date();
  nextReviewDate.setDate(nextReviewDate.getDate() + newSRS.interval);
  newSRS.next_review = nextReviewDate.toISOString();
  newSRS.review_count++;
  newSRS.last_review_date = new Date().toISOString();

  // 減衰率の更新
  const newDecayRate = updateDecayRate(newSRS.stability, newSRS.review_count);

  return {
    ...equipment,
    srs_data: newSRS,
    condition: {
      ...equipment.condition,
      sharpness: quizResult.is_correct
        ? 1.0
        : Math.max(0, equipment.condition.sharpness - 0.1),
      status_label: quizResult.is_correct
        ? "Sharp"
        : updateStatusLabel(Math.max(0, equipment.condition.sharpness - 0.1)),
      last_used: Date.now(),
      decay_rate: newDecayRate,
      durability: quizResult.is_correct
        ? Math.min(100, equipment.condition.durability + 5)
        : Math.max(0, equipment.condition.durability - 10),
    },
    dynamic_stats: calculateDynamicStats({
      ...equipment,
      condition: {
        ...equipment.condition,
        sharpness: quizResult.is_correct
          ? 1.0
          : Math.max(0, equipment.condition.sharpness - 0.1),
        status_label: quizResult.is_correct
          ? "Sharp"
          : updateStatusLabel(Math.max(0, equipment.condition.sharpness - 0.1)),
      },
    }),
    metadata: {
      ...equipment.metadata,
      total_uses: equipment.metadata.total_uses + 1,
      perfect_recalls:
        rating === "perfect"
          ? equipment.metadata.perfect_recalls + 1
          : equipment.metadata.perfect_recalls,
      critical_hits: checkRecallCritical(equipment, quizResult)
        ? equipment.metadata.critical_hits + 1
        : equipment.metadata.critical_hits,
    },
  };
}

/**
 * 敵の攻撃を実行
 */
export function executeEnemyAttack(enemy: Enemy, player: Player): CombatAction {
  const baseDamage = enemy.stats.attack;
  const defense = player.equipment.armor?.dynamic_stats.current_defense || 0;
  const actualDamage = Math.max(1, baseDamage - Math.floor(defense * 0.5));

  return {
    actor: "enemy",
    action_type: "attack",
    damage_dealt: actualDamage,
    timestamp: Date.now(),
  };
}

/**
 * 敵を生成
 */
export function generateEnemy(floor: number, type?: EnemyType): Enemy {
  const enemyTypes: EnemyType[] = ["slime", "goblin", "skeleton", "wizard"];
  const enemyType =
    type || enemyTypes[Math.floor(Math.random() * enemyTypes.length)];

  const baseStats = {
    slime: { hp: 30, attack: 5, defense: 2, speed: 3 },
    goblin: { hp: 50, attack: 8, defense: 3, speed: 5 },
    skeleton: { hp: 70, attack: 12, defense: 5, speed: 4 },
    wizard: { hp: 60, attack: 15, defense: 4, speed: 6 },
    boss: { hp: 150, attack: 25, defense: 10, speed: 5 },
  }[enemyType];

  const difficultyMultiplier = 1 + (floor - 1) * 0.2;

  const attributes: Attribute[] = [
    "logic",
    "language",
    "history",
    "science",
    "art",
    "general",
  ];
  const attribute = attributes[Math.floor(Math.random() * attributes.length)];

  const enemyNames = {
    slime: ["スライム", "グリーンスライム", "ブルースライム"],
    goblin: ["ゴブリン", "ゴブリン戦士", "ゴブリン盗賊"],
    skeleton: ["スケルトン", "スケルトン戦士", "スケルトンアーチャー"],
    wizard: ["ウィザード", "魔法使い", "魔導士"],
    boss: ["ダンジョンボス", "忘却の守護者", "記憶の支配者"],
  }[enemyType];

  return {
    enemy_id: `enemy_${Date.now()}_${Math.random()}`,
    name: enemyNames[Math.floor(Math.random() * enemyNames.length)],
    type: enemyType,
    stats: {
      max_hp: Math.floor(baseStats.hp * difficultyMultiplier),
      hp: Math.floor(baseStats.hp * difficultyMultiplier),
      attack: Math.floor(baseStats.attack * difficultyMultiplier),
      defense: Math.floor(baseStats.defense * difficultyMultiplier),
      speed: baseStats.speed,
    },
    attribute,
    floor,
  };
}

/**
 * 部屋を生成
 */
export function generateRoom(
  floor: number,
  roomIndex: number,
  totalRooms: number
): Room {
  // 最後の部屋は必ずボス
  if (roomIndex === totalRooms - 1) {
    const boss = generateEnemy(floor, "boss");
    boss.stats.hp = boss.stats.max_hp * 2;
    boss.stats.attack = Math.floor(boss.stats.attack * 1.5);
    boss.name = `ボス ${boss.name}`;

    return {
      room_id: `room_${floor}_${roomIndex}`,
      type: "boss",
      enemies: [boss],
      completed: false,
    };
  }

  const rand = Math.random();
  let roomType: RoomType;

  if (rand < 0.5) {
    roomType = "combat";
  } else if (rand < 0.7) {
    roomType = "treasure";
  } else if (rand < 0.85) {
    roomType = "rest";
  } else {
    roomType = "event";
  }

  const room: Room = {
    room_id: `room_${floor}_${roomIndex}`,
    type: roomType,
    completed: false,
  };

  if (roomType === "combat") {
    const enemyCount = Math.floor(Math.random() * 2) + 1; // 1-2体
    room.enemies = Array.from({ length: enemyCount }, () =>
      generateEnemy(floor)
    );
  }

  return room;
}

/**
 * ダンジョンの階層を生成
 */
export function generateFloor(floor: number): Room[] {
  const roomCount = 5 + Math.floor(floor / 2);
  return Array.from({ length: roomCount }, (_, i) =>
    generateRoom(floor, i, roomCount)
  );
}

/**
 * HSK単語から装備を作成
 */
export function createEquipmentFromWord(
  wordId: number,
  char: string,
  pinyin: string,
  meaning: string,
  category: string,
  type: EquipmentType = "weapon"
): Equipment {
  const now = Date.now();
  const rarity: Rarity = "common";

  // 基本ステータスをカテゴリーに基づいて決定
  const baseAttack = 30 + Math.floor(Math.random() * 20);
  const baseDefense =
    type === "armor" ? 20 + Math.floor(Math.random() * 15) : 0;

  const attribute: Attribute =
    category.includes("数学") || category.includes("物理")
      ? "logic"
      : category.includes("歴史")
        ? "history"
        : category.includes("科学")
          ? "science"
          : "language";

  return {
    item_id: `equipment_${wordId}_${now}`,
    name: `${char} (${meaning})`,
    type,
    base_stats: {
      attack: baseAttack,
      defense: baseDefense,
      attribute,
      rarity,
    },
    condition: {
      sharpness: 1.0,
      durability: 100,
      status_label: "Sharp",
      last_used: now,
      decay_rate: 2.0,
    },
    dynamic_stats: {
      current_attack: baseAttack,
      current_defense: baseDefense,
    },
    card_content: {
      question: meaning,
      answer: char,
      category,
      difficulty: 1,
      wordId,
    },
    srs_data: {
      next_review: new Date(Date.now() + 86400000).toISOString(), // 1日後
      interval: 1,
      ease_factor: 2.5,
      review_count: 0,
      stability: 5,
    },
    metadata: {
      obtained_date: new Date().toISOString(),
      total_uses: 0,
      critical_hits: 0,
      perfect_recalls: 0,
    },
  };
}
