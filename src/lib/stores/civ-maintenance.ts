/**
 * 文明維持シミュレーション (Civ-Style Maintenance) のストア
 * 都市の状態管理とLocalStorageへの永続化
 */

import { writable, get } from "svelte/store";
import { browser } from "$app/environment";
import type {
  City,
  Building,
  Card,
  BuildingType,
  Position,
  MaintenanceSession,
  CardReview,
  QuizResult,
  ResourceAmount,
  BuildingUpgrade,
} from "../types/civ-maintenance";
import {
  calculateMaintenanceLevel,
  updateBuildingMetrics,
  calculateCardContribution,
  updateCardStatus,
  updateSRSAfterReview,
  calculateResourcesGained,
  getBaseOutput,
  getResourceType,
  generateBuildingName,
  generateId,
  calculateQuizRating,
  calculateBuildingOutput,
} from "../utils/civ-maintenance";
import { hsk1 } from "../data/hsk1.js";
import { hsk2 } from "../data/hsk2.js";
import { currentLevel } from "./app";

// LocalStorageから都市データを読み込み
const loadCityFromStorage = (): City | null => {
  if (!browser) return null;

  try {
    const stored = localStorage.getItem("civ_maintenance_city");
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (e) {
    console.error("Failed to load city from storage:", e);
  }

  return null;
};

// 初期都市を作成
const createInitialCity = (): City => {
  const now = Date.now();

  return {
    city_id: `city_${now}`,
    name: "知識の都",
    buildings: [],
    layout: {
      grid_size: 20,
      theme: "modern",
      districts: [],
      roads: [],
    },
    resources: {
      knowledge: 0,
      energy: 0,
      materials: 0,
      gold: 0,
      max_capacity: {
        knowledge: 10000,
        energy: 10000,
        materials: 10000,
        gold: 10000,
      },
    },
    statistics: {
      total_buildings: 0,
      operational_buildings: 0,
      total_cards: 0,
      active_cards: 0,
      average_maintenance: 100,
      total_output: 0,
      city_happiness: 100,
      days_active: 0,
      growth_rate: 0,
    },
    settings: {
      auto_maintenance: false,
      notification_enabled: true,
      notification_threshold: 30,
      show_warnings: true,
      animation_speed: 1.0,
      sound_enabled: true,
    },
    level: 1,
    population: 0,
  };
};

// ストアの初期化
const storedCity = loadCityFromStorage();
const initialCity = storedCity || createInitialCity();

export const city = writable<City>(initialCity);

// LocalStorageへの保存
if (browser) {
  city.subscribe((value) => {
    try {
      localStorage.setItem("civ_maintenance_city", JSON.stringify(value));
    } catch (e) {
      console.error("Failed to save city to storage:", e);
    }
  });
}

// カードストア
export const cards = writable<Card[]>([]);

// LocalStorageからカードデータを読み込み
const loadCardsFromStorage = (): Card[] => {
  if (!browser) return [];

  try {
    const stored = localStorage.getItem("civ_maintenance_cards");
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (e) {
    console.error("Failed to load cards from storage:", e);
  }

  return [];
};

// カードストアの初期化
const storedCards = loadCardsFromStorage();
cards.set(storedCards);

// LocalStorageへの保存
if (browser) {
  cards.subscribe((value) => {
    try {
      localStorage.setItem("civ_maintenance_cards", JSON.stringify(value));
    } catch (e) {
      console.error("Failed to save cards to storage:", e);
    }
  });
}

// 現在選択中の施設
export const selectedBuilding = writable<Building | null>(null);

// メンテナンスセッション中フラグ
export const isMaintenance = writable<boolean>(false);

// アクション: カードを追加（HSK単語から）
export const addCardFromWord = (wordId: number, buildingId?: string) => {
  const currentCity = get(city);
  const currentCards = get(cards);
  const level = get(currentLevel);
  const wordData = level === 1 ? hsk1 : hsk2;
  const word = wordData.find((w) => w.id === wordId);

  if (!word) return;

  // 既にカードが存在するかチェック
  const existingCard = currentCards.find(
    (c) => c.content.wordId === wordId
  );

  if (existingCard) {
    // 既に存在する場合は施設に追加（まだ追加されていない場合）
    if (buildingId && !existingCard.building_id) {
      addCardToBuilding(existingCard.card_id, buildingId);
    }
    return existingCard;
  }

  // 新しいカードを作成
  const now = Date.now();
  const today = new Date(now).toISOString().split("T")[0];
  const nextReview = new Date(now);
  nextReview.setDate(nextReview.getDate() + 1);

  const newCard: Card = {
    card_id: generateId(),
    content: {
      question: word.meaning,
      answer: word.char,
      category: word.category,
      tags: [],
      wordId: word.id,
    },
    category: word.category,
    building_id: buildingId,
    status: "active",
    srs_data: {
      next_review: nextReview.toISOString().split("T")[0],
      interval: 1,
      ease_factor: 2.5,
      review_count: 0,
      stability: 1,
    },
    contribution: 100,
    next_review: nextReview.toISOString().split("T")[0],
    warning: false,
    metadata: {
      created_date: today,
      total_reviews: 0,
      perfect_reviews: 0,
      category_color: "#3b82f6",
    },
  };

  // カードを追加
  cards.update((c) => [...c, newCard]);

  // 施設にカードを追加
  if (buildingId) {
    addCardToBuilding(newCard.card_id, buildingId);
  }

  return newCard;
};

// アクション: カードを施設に追加
export const addCardToBuilding = (cardId: string, buildingId: string) => {
  const currentCity = get(city);
  const currentCards = get(cards);
  const card = currentCards.find((c) => c.card_id === cardId);
  const building = currentCity.buildings.find(
    (b) => b.building_id === buildingId
  );

  if (!card || !building) return;

  // カードが既に他の施設に所属している場合は削除
  if (card.building_id && card.building_id !== buildingId) {
    removeCardFromBuilding(cardId, card.building_id);
  }

  // カードを更新
  card.building_id = buildingId;

  // 施設にカード参照を追加（まだ存在しない場合）
  const existingRef = building.cards.find((c) => c.id === cardId);
  if (!existingRef) {
    building.cards.push({
      id: cardId,
      status: card.status,
      next_review: card.next_review,
      last_review: card.last_review,
      warning: card.warning,
      contribution: card.contribution,
    });
    building.metrics.population = building.cards.length;
  }

  // 都市を更新
  city.update((c) => {
    const updatedBuildings = c.buildings.map((b) =>
      b.building_id === buildingId ? building : b
    );
    return {
      ...c,
      buildings: updatedBuildings,
      statistics: updateCityStatistics(c, updatedBuildings, currentCards),
    };
  });
};

// アクション: カードを施設から削除
export const removeCardFromBuilding = (
  cardId: string,
  buildingId: string
) => {
  const currentCity = get(city);
  const building = currentCity.buildings.find(
    (b) => b.building_id === buildingId
  );

  if (!building) return;

  // カード参照を削除
  building.cards = building.cards.filter((c) => c.id !== cardId);
  building.metrics.population = building.cards.length;

  // カードのbuilding_idをクリア
  cards.update((c) =>
    c.map((card) =>
      card.card_id === cardId ? { ...card, building_id: undefined } : card
    )
  );

  // 都市を更新
  city.update((c) => {
    const updatedBuildings = c.buildings.map((b) =>
      b.building_id === buildingId ? building : b
    );
    const currentCards = get(cards);
    return {
      ...c,
      buildings: updatedBuildings,
      statistics: updateCityStatistics(c, updatedBuildings, currentCards),
    };
  });
};

// アクション: 施設を建設
export const constructBuilding = (
  buildingType: BuildingType,
  category: string,
  position: Position
) => {
  const currentCity = get(city);
  const now = Date.now();
  const today = new Date(now).toISOString();

  const building: Building = {
    building_id: generateId(),
    type: buildingType,
    name: generateBuildingName(buildingType, category),
    category_tag: category,
    level: 1,
    metrics: {
      maintenance_level: 1.0,
      population: 0,
      active_cards: 0,
      output_per_tick: getBaseOutput(buildingType),
      efficiency: 1.0,
      happiness: 100,
      decay_rate: 1.0,
    },
    cards: [],
    position: position,
    visual_state: {
      appearance: "pristine",
      condition: "operational",
      effects: [],
    },
    upgrades: [],
    metadata: {
      constructed_date: today,
      total_output: 0,
      maintenance_count: 0,
      upgrade_count: 0,
      category: category,
    },
  };

  city.update((c) => {
    const updatedBuildings = [...c.buildings, building];
    const currentCards = get(cards);
    return {
      ...c,
      buildings: updatedBuildings,
      statistics: updateCityStatistics(c, updatedBuildings, currentCards),
    };
  });

  return building;
};

// アクション: メンテナンスを実行
export const performMaintenance = (
  buildingId: string,
  cardsToReview: Card[],
  quizResults: QuizResult[]
): MaintenanceSession => {
  const currentCity = get(city);
  const currentCards = get(cards);
  const building = currentCity.buildings.find(
    (b) => b.building_id === buildingId
  );

  if (!building) {
    throw new Error("Building not found");
  }

  const maintenanceBefore = building.metrics.maintenance_level;
  const cardReviews: CardReview[] = [];
  const now = Date.now();

  // 各カードを復習
  for (let i = 0; i < cardsToReview.length; i++) {
    const card = cardsToReview[i];
    const quizResult = quizResults[i];

    if (!card || !quizResult) continue;

    // 復習前の状態を保存
    const contributionBefore = calculateCardContribution(card, now);
    const statusBefore = card.status;

    // SRS更新
    updateSRSAfterReview(card, quizResult);

    // カード状態の更新
    updateCardStatus(card, now);

    const contributionAfter = calculateCardContribution(card, now);
    const statusAfter = card.status;

    // カード参照の更新
    const cardRef = building.cards.find((c) => c.id === card.card_id);
    if (cardRef) {
      cardRef.contribution = contributionAfter;
      cardRef.status = statusAfter;
      cardRef.next_review = card.next_review;
      cardRef.last_review = card.last_review;
      cardRef.warning = card.warning;
    }

    cardReviews.push({
      card_id: card.card_id,
      quiz_result: quizResult,
      contribution_before: contributionBefore,
      contribution_after: contributionAfter,
      status_before: statusBefore,
      status_after: statusAfter,
    });
  }

  // 施設メトリクスの更新
  updateBuildingMetrics(building, currentCards, now);
  const maintenanceAfter = building.metrics.maintenance_level;

  // リソースの獲得
  const resourcesGained = calculateResourcesGained(
    building,
    cardReviews,
    maintenanceAfter - maintenanceBefore
  );

  // リソースを都市に追加
  addResourcesToCity(resourcesGained);

  // 施設メタデータを更新
  building.metadata.maintenance_count++;
  building.metadata.total_output += calculateBuildingOutput(building, now);

  // 都市を更新
  city.update((c) => {
    const updatedBuildings = c.buildings.map((b) =>
      b.building_id === buildingId ? building : b
    );
    return {
      ...c,
      buildings: updatedBuildings,
      statistics: updateCityStatistics(c, updatedBuildings, currentCards),
    };
  });

  return {
    session_id: generateId(),
    building_id: buildingId,
    start_time: now,
    end_time: now,
    cards_reviewed: cardReviews,
    maintenance_level_before: maintenanceBefore,
    maintenance_level_after: maintenanceAfter,
    resources_gained: resourcesGained,
    building_upgraded: false,
  };
};

// アクション: リソースを都市に追加
export const addResourcesToCity = (resources: ResourceAmount[]) => {
  city.update((c) => {
    const updatedResources = { ...c.resources };
    for (const resource of resources) {
      const currentAmount = updatedResources[resource.type] || 0;
      const maxCapacity = updatedResources.max_capacity[resource.type];
      updatedResources[resource.type] = Math.min(
        maxCapacity,
        currentAmount + resource.amount
      );
    }
    return {
      ...c,
      resources: updatedResources,
    };
  });
};

// アクション: 施設メトリクスを更新（定期的に）
export const updateAllBuildingMetrics = () => {
  const currentCity = get(city);
  const currentCards = get(cards);
  const now = Date.now();

  city.update((c) => {
    const updatedBuildings = c.buildings.map((building) => {
      updateBuildingMetrics(building, currentCards, now);
      return building;
    });
    return {
      ...c,
      buildings: updatedBuildings,
      statistics: updateCityStatistics(c, updatedBuildings, currentCards),
    };
  });
};

// 都市統計を更新
function updateCityStatistics(
  currentCity: City,
  buildings: Building[],
  cards: Card[]
): City["statistics"] {
  const totalBuildings = buildings.length;
  const operationalBuildings = buildings.filter(
    (b) => b.visual_state.condition === "operational"
  ).length;
  const totalCards = cards.length;
  const activeCards = cards.filter((c) => c.status === "active").length;
  const totalMaintenance = buildings.reduce(
    (sum, b) => sum + b.metrics.maintenance_level,
    0
  );
  const averageMaintenance =
    totalBuildings > 0 ? (totalMaintenance / totalBuildings) * 100 : 100;
  const totalOutput = buildings.reduce(
    (sum, b) => sum + b.metadata.total_output,
    0
  );
  const totalHappiness = buildings.reduce(
    (sum, b) => sum + b.metrics.happiness,
    0
  );
  const cityHappiness =
    totalBuildings > 0 ? Math.floor(totalHappiness / totalBuildings) : 100;

  return {
    total_buildings: totalBuildings,
    operational_buildings: operationalBuildings,
    total_cards: totalCards,
    active_cards: activeCards,
    average_maintenance: averageMaintenance,
    total_output: totalOutput,
    city_happiness: cityHappiness,
    days_active: currentCity.statistics.days_active,
    growth_rate: currentCity.statistics.growth_rate,
  };
}

// アクション: 都市をリセット
export const resetCity = () => {
  if (confirm("都市をリセットしますか？すべての施設とカードが失われます。")) {
    city.set(createInitialCity());
    cards.set([]);
    selectedBuilding.set(null);
  }
};

// 定期的なメトリクス更新（1分ごと）
if (browser) {
  setInterval(() => {
    updateAllBuildingMetrics();
  }, 60000); // 60秒
}

