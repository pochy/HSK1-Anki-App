/**
 * 記憶の庭 (Garden of Memory) のゲームロジック
 * 水分減衰、水やり、進化システムの実装
 */

import type {
  Plant,
  GrowthStage,
  QuizResult,
  WateringSession,
  SRSParameters,
  EvolutionData,
  VisualState,
  PlantStatus,
} from "../types/garden";

/**
 * 現在の水分量を計算
 */
export function calculateCurrentHydration(
  plant: Plant,
  currentTime: number
): number {
  // Date.now()はミリ秒を返すので、時間単位に変換するには3600000で割る必要がある
  // 1時間 = 1000ms * 60秒 * 60分 = 3600000ms
  const timeSinceWatered =
    (currentTime - plant.status.last_watered) / (1000 * 60 * 60); // 時間単位
  const decayAmount = timeSinceWatered * plant.srs_parameters.decay_rate;
  const newHydration = Math.max(0, plant.status.hydration - decayAmount);

  return newHydration;
}

/**
 * 減衰率を更新
 * 最短24時間、最長1ヶ月（30日）で枯渇するように制限
 */
export function updateDecayRate(stability: number, stage: GrowthStage): number {
  // 安定性が高いほど、進化段階が高いほど減衰率が低い
  const baseDecayRate = 10.0; // 初期減衰率（%/時間）
  const stabilityModifier = Math.max(0.1, 1.0 / (stability / 10));
  const stageModifier: Record<GrowthStage, number> = {
    0: 1.0, // Seed: 減衰率100%
    1: 0.8, // Sprout: 80%
    2: 0.6, // Sapling: 60%
    3: 0.4, // Mature: 40%
    4: 0.2, // Ancient: 20%
  };

  const calculatedDecayRate =
    baseDecayRate * stabilityModifier * stageModifier[stage];

  // 最低でも24時間以上かかるように、最大減衰率を制限
  // 100% / 24時間 ≈ 4.17%/時間
  const maxDecayRate = 100 / 24;

  // 最長1ヶ月（30日 = 720時間）で100%減衰する最小減衰率
  // 100% / 720時間 ≈ 0.139%/時間
  const minDecayRate = 100 / (30 * 24);

  // 減衰率を最短24時間〜最長1ヶ月の範囲内に制限
  return Math.max(minDecayRate, Math.min(calculatedDecayRate, maxDecayRate));
}

/**
 * 枯死チェック
 */
export function checkWithered(hydration: number): boolean {
  return hydration <= 0;
}

/**
 * 水やりイベント
 */
export function waterPlant(
  plant: Plant,
  quizResult: QuizResult,
  currentTime: number
): WateringSession {
  const hydrationBefore = calculateCurrentHydration(plant, currentTime);
  const isCrisis = hydrationBefore <= plant.status.warning_threshold;

  let hydrationAfter: number;
  let experienceGained: number;
  let crisisBonus = false;

  if (quizResult.is_correct) {
    // 正解時
    hydrationAfter = 100.0;

    // 経験値計算
    const baseExp = 10;
    const stageBonus = plant.visual_state.stage * 5;
    const ratingBonus: Record<QuizResult["rating"], number> = {
      perfect: 5,
      good: 3,
      ok: 1,
      poor: 0,
    };

    experienceGained = baseExp + stageBonus + ratingBonus[quizResult.rating];

    // 危機回避ボーナス
    if (isCrisis) {
      experienceGained *= 2;
      crisisBonus = true;
    }

    // 過剰な水やりペナルティ
    if (hydrationBefore >= 90) {
      experienceGained *= 0.1; // 90%減
    }

    // SRS更新
    updateSRSAfterReview(plant, quizResult);
  } else {
    // 不正解時
    hydrationAfter = Math.min(100, hydrationBefore + 20); // 部分回復
    experienceGained = 0;

    // SRS更新（間隔を短縮）
    plant.srs_parameters.interval = Math.max(
      1,
      plant.srs_parameters.interval * 0.5
    );
  }

  // 植物状態更新
  plant.status.hydration = hydrationAfter;
  plant.status.last_watered = currentTime;
  plant.status.withered = false;
  plant.evolution_data.experience += experienceGained;

  // 進化チェック
  const evolutionTriggered = checkEvolution(plant);

  return {
    session_id: generateId(),
    plant_id: plant.plant_id,
    start_time: currentTime,
    end_time: currentTime,
    quiz_result: quizResult,
    hydration_before: hydrationBefore,
    hydration_after: hydrationAfter,
    crisis_bonus: crisisBonus,
    experience_gained: experienceGained,
    evolution_triggered: evolutionTriggered,
  };
}

/**
 * 復習後のSRS更新
 */
function updateSRSAfterReview(plant: Plant, quizResult: QuizResult): void {
  const rating = quizResult.rating;

  switch (rating) {
    case "perfect":
      plant.srs_parameters.interval *= 2.5;
      plant.srs_parameters.stability *= 1.3;
      plant.srs_parameters.ease_factor = Math.min(
        plant.srs_parameters.ease_factor + 0.15,
        3.0
      );
      break;
    case "good":
      plant.srs_parameters.interval *= 1.8;
      plant.srs_parameters.stability *= 1.15;
      break;
    case "ok":
      plant.srs_parameters.interval *= 1.2;
      plant.srs_parameters.stability *= 1.05;
      break;
    case "poor":
      plant.srs_parameters.interval *= 0.8;
      plant.srs_parameters.stability *= 0.9;
      plant.srs_parameters.ease_factor = Math.max(
        plant.srs_parameters.ease_factor - 0.1,
        1.3
      );
      break;
  }

  // 次回復習日の計算
  const nextReviewDate = new Date();
  nextReviewDate.setDate(
    nextReviewDate.getDate() + Math.round(plant.srs_parameters.interval)
  );
  plant.srs_parameters.next_review = nextReviewDate.toISOString();
  plant.srs_parameters.review_count++;

  // 減衰率の更新
  plant.srs_parameters.decay_rate = updateDecayRate(
    plant.srs_parameters.stability,
    plant.visual_state.stage
  );
}

/**
 * 進化チェック
 */
export function checkEvolution(plant: Plant): boolean {
  const currentExp = plant.evolution_data.experience;
  const requiredExp = plant.evolution_data.experience_to_next;

  if (currentExp >= requiredExp && plant.visual_state.stage < 4) {
    evolvePlant(plant);
    return true;
  }

  return false;
}

/**
 * 植物を進化させる
 */
function evolvePlant(plant: Plant): void {
  const oldStage = plant.visual_state.stage;
  const newStage = (oldStage + 1) as GrowthStage;

  // 進化
  plant.visual_state.stage = newStage;
  plant.evolution_data.current_stage = newStage;

  // 経験値リセット
  plant.evolution_data.experience = 0;
  plant.evolution_data.experience_to_next = calculateRequiredExp(newStage);

  // 進化履歴に記録
  plant.evolution_data.evolution_history.push({
    timestamp: Date.now(),
    from_stage: oldStage,
    to_stage: newStage,
    trigger: "experience_threshold",
  });

  // 特殊能力の獲得
  checkSpecialAbilities(plant, newStage);

  // 視覚的変化
  updateVisualState(plant);
}

/**
 * 必要経験値を計算
 */
function calculateRequiredExp(stage: GrowthStage): number {
  const baseExp: Record<GrowthStage, number> = {
    0: 50, // Seed -> Sprout
    1: 100, // Sprout -> Sapling
    2: 200, // Sapling -> Mature
    3: 500, // Mature -> Ancient
    4: 0, // Ancient (最終段階)
  };
  return baseExp[stage] || 0;
}

/**
 * 特殊能力のチェック
 */
function checkSpecialAbilities(plant: Plant, stage: GrowthStage): void {
  // Ancient段階で特殊能力を獲得
  if (stage === 4) {
    plant.evolution_data.special_abilities.push({
      id: "growth_aura",
      name: "成長のオーラ",
      description: "周囲の植物の成長を促進する",
      effect: {
        type: "buff",
        target: "nearby",
        value: 1.2, // 20%成長促進
      },
      unlocked_at_stage: 4,
    });
  }
}

/**
 * 視覚状態を更新
 */
function updateVisualState(plant: Plant): void {
  // 成長段階に応じてサイズを調整
  const sizeMap: Record<GrowthStage, number> = {
    0: 0.5, // Seed: 小さい
    1: 0.7, // Sprout: やや小さい
    2: 0.9, // Sapling: 中程度
    3: 1.2, // Mature: 大きい
    4: 1.5, // Ancient: 非常に大きい
  };

  plant.visual_state.size = sizeMap[plant.visual_state.stage] || 1.0;
  plant.visual_state.color_code = calculateColorCode(
    plant.status.hydration,
    plant.visual_state.stage
  );
}

/**
 * 色コードを計算（水分量と成長段階に基づく）
 */
export function calculateColorCode(
  hydration: number,
  stage: GrowthStage
): string {
  // 水分量に基づく色の計算
  let hue: number;
  let saturation: number;
  let lightness: number;

  if (hydration >= 80) {
    // 健康: 鮮やかな緑
    hue = 120;
    saturation = 70;
    lightness = 50;
  } else if (hydration >= 50) {
    // やや乾燥: 黄緑
    hue = 90;
    saturation = 60;
    lightness = 55;
  } else if (hydration >= 30) {
    // 乾燥: 黄色
    hue = 60;
    saturation = 70;
    lightness = 60;
  } else if (hydration >= 20) {
    // 警告: オレンジ
    hue = 30;
    saturation = 80;
    lightness = 55;
  } else if (hydration > 0) {
    // 危機: 茶色
    hue = 20;
    saturation = 70;
    lightness = 40;
  } else {
    // 枯死: 灰色
    hue = 0;
    saturation = 0;
    lightness = 30;
  }

  // 成長段階による色の濃淡調整
  const stageModifier: Record<GrowthStage, number> = {
    0: 0.7, // Seed: 薄い
    1: 0.8,
    2: 0.9,
    3: 1.0, // Mature: 標準
    4: 1.1, // Ancient: 濃い
  };

  lightness *= stageModifier[stage];

  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}

/**
 * クイズ評価を計算
 */
export function calculateQuizRating(
  isCorrect: boolean,
  timeTaken: number,
  attempts: number
): QuizResult["rating"] {
  if (!isCorrect) return "poor";

  // 時間と試行回数に基づいて評価
  if (attempts === 1 && timeTaken < 3) return "perfect";
  if (attempts === 1 && timeTaken < 10) return "good";
  if (attempts <= 2 && timeTaken < 20) return "ok";
  return "poor";
}

/**
 * 初期植物を作成
 */
export function createInitialPlant(
  wordId: number,
  question: string,
  answer: string,
  category?: string
): Plant {
  const now = Date.now();
  const plantId = `plant_${wordId}_${now}`;

  return {
    plant_id: plantId,
    content: {
      question,
      answer,
      category,
      wordId,
    },
    visual_state: {
      type: getRandomPlantType(),
      stage: 0, // Seed
      color_code: calculateColorCode(100, 0),
      position: {
        x: Math.random() * 100,
        y: Math.random() * 100,
      },
      size: 0.5,
    },
    status: {
      hydration: 100.0,
      withered: false,
      health: 100,
      last_watered: now,
      warning_threshold: 20,
    },
    srs_parameters: {
      last_watered: now,
      decay_rate: updateDecayRate(10, 0), // 初期安定性10
      stability: 10,
      interval: 1,
      ease_factor: 2.5,
      review_count: 0,
      next_review: new Date(now + 24 * 60 * 60 * 1000).toISOString(), // 1日後
    },
    evolution_data: {
      current_stage: 0,
      experience: 0,
      experience_to_next: 50, // Seed -> Sprout
      evolution_history: [],
      special_abilities: [],
    },
    metadata: {
      created_at: new Date(now).toISOString(),
      first_watered: new Date(now).toISOString(),
      total_water_count: 0,
      perfect_water_count: 0,
      category_color: getCategoryColor(category),
    },
  };
}

/**
 * ランダムな植物タイプを取得
 */
function getRandomPlantType(): Plant["visual_state"]["type"] {
  const types: Plant["visual_state"]["type"][] = [
    "AppleTree",
    "Rose",
    "Sunflower",
    "Bamboo",
    "Oak",
    "Lotus",
    "CherryBlossom",
    "Cactus",
    "Fern",
    "Lavender",
  ];
  return types[Math.floor(Math.random() * types.length)];
}

/**
 * カテゴリー色を取得
 */
function getCategoryColor(category?: string): string {
  const colors: Record<string, string> = {
    代名詞: "#3b82f6",
    動詞: "#ef4444",
    名詞: "#22c55e",
    形容詞: "#f59e0b",
    副詞: "#8b5cf6",
    数詞: "#ec4899",
    量詞: "#06b6d4",
  };

  return colors[category || ""] || "#6b7280";
}

/**
 * ID生成
 */
function generateId(): string {
  return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * 周囲の植物を取得（Ancient植物のオーラ効果用）
 */
export function getNearbyPlants(
  plants: Plant[],
  centerPlant: Plant,
  radius: number
): Plant[] {
  return plants.filter((plant) => {
    if (plant.plant_id === centerPlant.plant_id) return false;

    const dx =
      plant.visual_state.position.x - centerPlant.visual_state.position.x;
    const dy =
      plant.visual_state.position.y - centerPlant.visual_state.position.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    return distance <= radius;
  });
}

/**
 * 成長オーラを適用
 */
export function applyGrowthAura(plants: Plant[]): void {
  const ancientPlants = plants.filter((p) => p.visual_state.stage === 4);

  for (const ancient of ancientPlants) {
    const nearbyPlants = getNearbyPlants(plants, ancient, 2); // 半径2以内

    for (const nearby of nearbyPlants) {
      if (nearby.plant_id !== ancient.plant_id) {
        // 経験値獲得ボーナス
        nearby.evolution_data.experience += 1;
      }
    }
  }
}
