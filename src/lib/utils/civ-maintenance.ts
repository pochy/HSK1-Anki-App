/**
 * 文明維持シミュレーション (Civ-Style Maintenance) のゲームロジック
 * 維持レベル計算、施設生産、メンテナンスセッションの実装
 */

import type {
  Building,
  Card,
  CardStatus,
  CardReference,
  BuildingMetrics,
  BuildingVisualState,
  MaintenanceSession,
  CardReview,
  QuizResult,
  ResourceAmount,
  UpgradeEffect,
  Position,
  BuildingType,
} from "../types/civ-maintenance";

/**
 * 復習日からの経過日数を計算
 */
export function calculateDaysSinceReview(card: Card): number {
  const lastReview = card.last_review
    ? new Date(card.last_review).getTime()
    : new Date(card.srs_data.next_review).getTime() -
      card.srs_data.interval * 24 * 60 * 60 * 1000;

  const now = Date.now();
  return (now - lastReview) / (24 * 60 * 60 * 1000);
}

/**
 * カードの状態を更新
 */
export function updateCardStatus(
  card: Card,
  currentTime: number
): void {
  const daysSinceReview = calculateDaysSinceReview(card);
  const expectedInterval = card.srs_data.interval;

  if (daysSinceReview <= expectedInterval * 0.8) {
    card.status = "active";
    card.warning = false;
  } else if (daysSinceReview <= expectedInterval * 1.2) {
    card.status = "decaying";
    card.warning = daysSinceReview > expectedInterval;
  } else if (daysSinceReview <= expectedInterval * 2.0) {
    card.status = "inactive";
    card.warning = true;
  } else {
    card.status = "broken";
    card.warning = true;
  }
}

/**
 * カードの貢献度を計算
 */
export function calculateCardContribution(
  card: Card,
  currentTime: number
): number {
  // 基本貢献度
  let contribution = 50;

  // SRSデータに基づく貢献度
  const daysSinceReview = calculateDaysSinceReview(card);
  const expectedInterval = card.srs_data.interval;

  if (daysSinceReview <= expectedInterval * 0.5) {
    // 早めの復習: 貢献度高い
    contribution =
      80 + (1 - daysSinceReview / (expectedInterval * 0.5)) * 20;
  } else if (daysSinceReview <= expectedInterval) {
    // 適切なタイミング: 貢献度標準
    contribution =
      60 +
      (1 - (daysSinceReview - expectedInterval * 0.5) / (expectedInterval * 0.5)) *
        20;
  } else if (daysSinceReview <= expectedInterval * 1.5) {
    // やや遅れ: 貢献度低下
    contribution =
      40 +
      (1 - (daysSinceReview - expectedInterval) / (expectedInterval * 0.5)) *
        20;
  } else {
    // 大幅に遅れ: 貢献度大幅低下
    contribution = Math.max(
      0,
      40 - (daysSinceReview - expectedInterval * 1.5) * 5
    );
  }

  // 安定性による補正
  const stabilityBonus = Math.min(20, card.srs_data.stability / 2);
  contribution += stabilityBonus;

  // 復習回数による補正
  const reviewBonus = Math.min(10, card.srs_data.review_count / 10);
  contribution += reviewBonus;

  return Math.max(0, Math.min(100, contribution));
}

/**
 * 維持レベルを計算
 */
export function calculateMaintenanceLevel(
  building: Building,
  cards: Card[],
  currentTime: number
): number {
  // 全てのカード参照を最新の状態に更新
  for (const cardRef of building.cards) {
    const card = cards.find((c) => c.card_id === cardRef.id);
    if (!card) continue;

    // カードの状態を更新
    updateCardStatus(card, currentTime);

    // 貢献度を計算
    const contribution = calculateCardContribution(card, currentTime);
    cardRef.contribution = contribution;
    cardRef.status = card.status;
    cardRef.warning = card.warning;
  }

  // アクティブカードのみを対象に維持レベルを計算
  const activeCards = building.cards.filter((c) => c.status === "active");
  if (activeCards.length === 0) {
    // アクティブカードがない場合、全カードの平均を使用
    if (building.cards.length === 0) return 0;
    const totalContribution = building.cards.reduce(
      (sum, c) => sum + c.contribution,
      0
    );
    const averageContribution = totalContribution / building.cards.length;
    return Math.max(0, Math.min(1, averageContribution / 100));
  }

  // アクティブカードの平均貢献度を維持レベルとして使用
  const totalContribution = activeCards.reduce(
    (sum, c) => sum + c.contribution,
    0
  );
  const averageContribution = totalContribution / activeCards.length;
  return Math.max(0, Math.min(1, averageContribution / 100));
}

/**
 * 施設の生産量を計算
 */
export function calculateBuildingOutput(
  building: Building,
  currentTime: number
): number {
  const maintenanceLevel = building.metrics.maintenance_level;
  const baseOutput = building.metrics.output_per_tick;
  const efficiency = building.metrics.efficiency;

  // 維持レベルと効率に基づく生産量
  const output = baseOutput * maintenanceLevel * efficiency;

  // レベルによる補正
  const levelMultiplier = 1 + (building.level - 1) * 0.1;

  return Math.floor(output * levelMultiplier);
}

/**
 * 施設の外観を更新
 */
export function updateBuildingAppearance(
  building: Building
): void {
  const maintenance = building.metrics.maintenance_level;

  if (maintenance >= 0.9) {
    building.visual_state.appearance = "pristine";
    building.visual_state.condition = "operational";
  } else if (maintenance >= 0.7) {
    building.visual_state.appearance = "good";
    building.visual_state.condition = "operational";
  } else if (maintenance >= 0.5) {
    building.visual_state.appearance = "fair";
    building.visual_state.condition = "degraded";
  } else if (maintenance >= 0.3) {
    building.visual_state.appearance = "poor";
    building.visual_state.condition = "critical";
  } else {
    building.visual_state.appearance = "ruined";
    building.visual_state.condition = "shutdown";
  }
}

/**
 * 施設メトリクスを更新
 */
export function updateBuildingMetrics(
  building: Building,
  cards: Card[],
  currentTime: number
): void {
  // テスト用: 時間ベースの減衰を適用（10秒で1%減）
  if (!building.metadata.last_decay_time) {
    building.metadata.last_decay_time = currentTime;
  }
  
  const timeSinceLastDecay = (currentTime - building.metadata.last_decay_time) / 1000; // 秒
  const decayInterval = 10; // 10秒
  const decayAmount = 0.01; // 1%
  
  if (timeSinceLastDecay >= decayInterval) {
    const decayCount = Math.floor(timeSinceLastDecay / decayInterval);
    const currentMaintenance = building.metrics.maintenance_level;
    // 維持レベルを減らす（最小0）
    building.metrics.maintenance_level = Math.max(
      0,
      currentMaintenance - decayCount * decayAmount
    );
    building.metadata.last_decay_time = currentTime - (timeSinceLastDecay % decayInterval) * 1000;
  }
  
  // 維持レベルの更新（カードベースの計算）
  const cardBasedLevel = calculateMaintenanceLevel(
    building,
    cards,
    currentTime
  );
  
  // テスト用: 時間ベースの減衰とカードベースの計算の小さい方を採用
  building.metrics.maintenance_level = Math.min(
    building.metrics.maintenance_level,
    cardBasedLevel
  );

  // アクティブカード数の更新
  building.metrics.active_cards = building.cards.filter(
    (c) => c.status === "active"
  ).length;

  // 効率の計算
  const activeRatio =
    building.metrics.population > 0
      ? building.metrics.active_cards / building.metrics.population
      : 0;
  building.metrics.efficiency = activeRatio;

  // 幸福度の計算
  building.metrics.happiness = Math.floor(
    building.metrics.maintenance_level * 100
  );

  // 外観の更新
  updateBuildingAppearance(building);
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
  if (attempts > 1) return "ok";
  if (timeTaken < 3) return "perfect";
  if (timeTaken < 10) return "good";
  return "ok";
}

/**
 * SRSデータを更新（復習後）
 */
export function updateSRSAfterReview(
  card: Card,
  quizResult: QuizResult
): void {
  const now = Date.now();
  const today = new Date(now).toISOString().split("T")[0];

  card.last_review = today;
  card.metadata.total_reviews++;

  if (quizResult.rating === "perfect") {
    card.metadata.perfect_reviews++;
  }

  // 簡単なSRS更新ロジック
  const ratingMultiplier: Record<QuizResult["rating"], number> = {
    perfect: 2.5,
    good: 2.0,
    ok: 1.5,
    poor: 1.2,
  };

  const multiplier = ratingMultiplier[quizResult.rating];
  card.srs_data.interval = Math.max(
    1,
    Math.floor(card.srs_data.interval * multiplier)
  );
  card.srs_data.review_count++;
  card.srs_data.stability = Math.min(
    100,
    card.srs_data.stability + (quizResult.rating === "perfect" ? 5 : 2)
  );

  // 次回復習日を計算
  const nextReviewDate = new Date(now);
  nextReviewDate.setDate(nextReviewDate.getDate() + card.srs_data.interval);
  card.next_review = nextReviewDate.toISOString().split("T")[0];
  card.srs_data.next_review = card.next_review;
}

/**
 * 獲得リソースを計算
 */
export function calculateResourcesGained(
  building: Building,
  cardReviews: CardReview[],
  maintenanceImprovement: number
): ResourceAmount[] {
  const resources: ResourceAmount[] = [];

  // 知識リソース（正解数に基づく）
  const correctCount = cardReviews.filter(
    (r) => r.quiz_result.is_correct
  ).length;
  resources.push({
    type: "knowledge",
    amount: correctCount * 10,
  });

  // エネルギーリソース（維持レベル改善に基づく）
  resources.push({
    type: "energy",
    amount: Math.floor(maintenanceImprovement * 100),
  });

  // 材料リソース（完璧な復習に基づく）
  const perfectCount = cardReviews.filter(
    (r) => r.quiz_result.rating === "perfect"
  ).length;
  resources.push({
    type: "materials",
    amount: perfectCount * 5,
  });

  // ゴールド（総合評価に基づく）
  const totalRating = cardReviews.reduce((sum, r) => {
    const ratingValue: Record<QuizResult["rating"], number> = {
      perfect: 4,
      good: 3,
      ok: 2,
      poor: 1,
    };
    return sum + ratingValue[r.quiz_result.rating];
  }, 0);
  resources.push({
    type: "gold",
    amount: Math.floor(totalRating * 2.5),
  });

  return resources;
}

/**
 * 施設タイプから基本生産量を取得
 */
export function getBaseOutput(buildingType: BuildingType): number {
  const outputs: Record<BuildingType, number> = {
    library: 10,
    hospital: 8,
    power_plant: 15,
    farm: 12,
    factory: 20,
    school: 5,
    museum: 8,
    research_lab: 25,
    court: 10,
    bank: 30,
  };
  return outputs[buildingType];
}

/**
 * 施設タイプからリソースタイプを取得
 */
export function getResourceType(buildingType: BuildingType): ResourceAmount["type"] {
  const resourceTypes: Record<BuildingType, ResourceAmount["type"]> = {
    library: "knowledge",
    hospital: "energy",
    power_plant: "energy",
    farm: "materials",
    factory: "materials",
    school: "knowledge",
    museum: "knowledge",
    research_lab: "knowledge",
    court: "knowledge",
    bank: "gold",
  };
  return resourceTypes[buildingType];
}

/**
 * 施設名を生成
 */
export function generateBuildingName(
  buildingType: BuildingType,
  category: string
): string {
  const typeNames: Record<BuildingType, string> = {
    library: "図書館",
    hospital: "病院",
    power_plant: "発電所",
    farm: "農場",
    factory: "工場",
    school: "学校",
    museum: "博物館",
    research_lab: "研究所",
    court: "裁判所",
    bank: "銀行",
  };
  return `${typeNames[buildingType]}: ${category}`;
}

/**
 * 施設の絵文字を取得
 */
export function getBuildingEmoji(buildingType: BuildingType): string {
  const emojis: Record<BuildingType, string> = {
    library: "📚",
    hospital: "🏥",
    power_plant: "⚡",
    farm: "🚜",
    factory: "🏭",
    school: "🏫",
    museum: "🏛️",
    research_lab: "🔬",
    court: "⚖️",
    bank: "🏦",
  };
  return emojis[buildingType];
}

/**
 * IDを生成
 */
export function generateId(): string {
  return `id_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * 維持レベルが0%になるまでの推定日数を計算
 */
export function calculateDaysUntilZero(
  building: Building,
  cards: Card[],
  currentTime: number
): number | null {
  if (building.cards.length === 0) return null;

  // 現在の維持レベルを取得
  const currentLevel = calculateMaintenanceLevel(building, cards, currentTime);
  if (currentLevel <= 0) return 0;

  // 各カードが0になるまでの日数を計算
  const daysUntilZeroList: number[] = [];

  for (const cardRef of building.cards) {
    const card = cards.find((c) => c.card_id === cardRef.id);
    if (!card) continue;

    const daysSinceReview = calculateDaysSinceReview(card);
    const expectedInterval = card.srs_data.interval;
    
    // 現在の貢献度を計算
    const currentContribution = calculateCardContribution(card, currentTime);
    
    if (currentContribution <= 0) {
      daysUntilZeroList.push(0);
      continue;
    }

    // 貢献度が0になるまでの日数を推定
    // 大幅に遅れた場合の式: contribution = 40 - (daysSinceReview - expectedInterval * 1.5) * 5
    // これを逆算: daysUntilZero = (40 - contribution) / 5 + expectedInterval * 1.5 - daysSinceReview
    
    let daysUntilZero = 0;
    
    if (daysSinceReview <= expectedInterval * 1.5) {
      // まだ大幅に遅れていない場合
      // 大幅に遅れるまでの日数 + 0になるまでの日数
      const daysUntilSevereDelay = expectedInterval * 1.5 - daysSinceReview;
      // 大幅に遅れた後、0になるまでの日数（最大ボーナス30を考慮）
      const maxContribution = currentContribution + 30; // ボーナス最大値
      const daysFromSevereToZero = maxContribution / 5; // 1日あたり5ポイント減衰
      daysUntilZero = daysUntilSevereDelay + daysFromSevereToZero;
    } else {
      // 既に大幅に遅れている場合
      // 現在の貢献度から0になるまでの日数（ボーナスを除いた基本値）
      const baseContribution = Math.max(0, currentContribution - 30); // ボーナスを除く
      daysUntilZero = baseContribution / 5; // 1日あたり5ポイント減衰
    }

    daysUntilZeroList.push(Math.max(0, daysUntilZero));
  }

  if (daysUntilZeroList.length === 0) return null;

  // 最短の日数を返す（最も早く0になるカード）
  return Math.min(...daysUntilZeroList);
}

