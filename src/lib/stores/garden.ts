/**
 * 記憶の庭 (Garden of Memory) のストア
 * 庭園の状態管理とLocalStorageへの永続化
 */

import { writable, get } from "svelte/store";
import { browser } from "$app/environment";
import type {
  Garden,
  Plant,
  WateringSession,
  Notification,
  GardenSettings,
  GardenStatistics,
  GardenLayout,
} from "../types/garden";
import {
  calculateCurrentHydration,
  checkWithered,
  createInitialPlant,
  applyGrowthAura,
  calculateColorCode,
  waterPlant,
  calculateQuizRating,
} from "../utils/garden";
import { hsk1 } from "../data/hsk1.js";
import { hsk2 } from "../data/hsk2.js";
import { currentLevel } from "./app";

// LocalStorageから庭園データを読み込み
const loadGardenFromStorage = (): Garden | null => {
  if (!browser) return null;

  try {
    const stored = localStorage.getItem("garden_of_memory");
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (e) {
    console.error("Failed to load garden from storage:", e);
  }

  return null;
};

// 初期庭園を作成
const createInitialGarden = (): Garden => {
  const now = Date.now();

  return {
    garden_id: `garden_${now}`,
    plants: [],
    layout: {
      type: "grid",
      grid_size: 10,
      theme: "japanese",
      decorations: [],
    },
    statistics: {
      total_plants: 0,
      healthy_plants: 0,
      withered_plants: 0,
      average_hydration: 100,
      total_experience: 0,
      garden_level: 1,
      days_active: 0,
      perfect_water_ratio: 0,
    },
    settings: {
      auto_water_enabled: false,
      notification_enabled: true,
      notification_threshold: 20,
      show_warnings: true,
      animation_speed: 1.0,
      sound_enabled: true,
    },
    weather: {
      type: "sunny",
      intensity: 50,
    },
  };
};

// ストアの初期化
const storedGarden = loadGardenFromStorage();
const initialGarden = storedGarden || createInitialGarden();

export const garden = writable<Garden>(initialGarden);

// LocalStorageへの保存
if (browser) {
  garden.subscribe((value) => {
    try {
      localStorage.setItem("garden_of_memory", JSON.stringify(value));
    } catch (e) {
      console.error("Failed to save garden to storage:", e);
    }
  });
}

// 通知ストア
export const notifications = writable<Notification[]>([]);

// 現在選択中の植物
export const selectedPlant = writable<Plant | null>(null);

// 水やりセッション中フラグ
export const isWatering = writable<boolean>(false);

// アクション: 植物を追加（HSK単語から）
export const addPlantFromWord = (wordId: number) => {
  const currentGarden = get(garden);
  const level = get(currentLevel);
  const wordData = level === 1 ? hsk1 : hsk2;
  const word = wordData.find((w) => w.id === wordId);

  if (!word) return;

  // 既に植物が存在するかチェック
  const existingPlant = currentGarden.plants.find(
    (p) => p.content.wordId === wordId
  );

  if (existingPlant) {
    // 既に存在する場合は選択
    selectedPlant.set(existingPlant);
    return;
  }

  // 新しい植物を作成
  const newPlant = createInitialPlant(
    wordId,
    word.meaning,
    word.char,
    word.category
  );

  // 庭園に追加
  garden.update((g) => {
    const updatedPlants = [...g.plants, newPlant];
    return {
      ...g,
      plants: updatedPlants,
      statistics: updateStatistics(g, updatedPlants),
    };
  });

  selectedPlant.set(newPlant);
};

// アクション: 植物に水をやる（クイズ結果を渡す）
export const waterPlantAction = (
  plantId: string,
  quizResult: {
    user_answer: string;
    is_correct: boolean;
    time_taken: number;
    attempts: number;
  }
) => {
  const currentGarden = get(garden);
  const plant = currentGarden.plants.find((p) => p.plant_id === plantId);

  if (!plant) return;

  const rating = calculateQuizRating(
    quizResult.is_correct,
    quizResult.time_taken,
    quizResult.attempts
  );

  const fullQuizResult = {
    question: plant.content.question,
    user_answer: quizResult.user_answer,
    correct_answer: plant.content.answer,
    is_correct: quizResult.is_correct,
    time_taken: quizResult.time_taken,
    attempts: quizResult.attempts,
    rating,
  };

  // 植物のコピーを作成（ミューテーションを避けるため）
  const plantCopy = JSON.parse(JSON.stringify(plant));
  const session = waterPlant(plantCopy, fullQuizResult, Date.now());

  // メタデータ更新
  plantCopy.metadata.total_water_count++;
  if (rating === "perfect") {
    plantCopy.metadata.perfect_water_count++;
  }

  // 植物を更新
  garden.update((g) => {
    const updatedPlants = g.plants.map((p) =>
      p.plant_id === plantId ? plantCopy : p
    );

    // 成長オーラを適用
    applyGrowthAura(updatedPlants);

    return {
      ...g,
      plants: updatedPlants,
      statistics: updateStatistics(g, updatedPlants),
    };
  });

  isWatering.set(false);
};

// アクション: 植物の水分を更新（リアルタイム減衰）
export const updatePlantHydration = () => {
  const currentGarden = get(garden);
  const now = Date.now();

  garden.update((g) => {
    const updatedPlants = g.plants.map((plant) => {
      const newHydration = calculateCurrentHydration(plant, now);
      const isWithered = checkWithered(newHydration);

      return {
        ...plant,
        status: {
          ...plant.status,
          hydration: newHydration,
          withered: isWithered,
        },
        visual_state: {
          ...plant.visual_state,
          color_code: calculateColorCode(
            newHydration,
            plant.visual_state.stage
          ),
        },
      };
    });

    return {
      ...g,
      plants: updatedPlants,
      statistics: updateStatistics(g, updatedPlants),
    };
  });
};

// 統計情報を更新
function updateStatistics(
  currentGarden: Garden,
  plants: Plant[]
): GardenStatistics {
  const healthyPlants = plants.filter(
    (p) => !p.status.withered && p.status.hydration > 0
  ).length;
  const witheredPlants = plants.filter((p) => p.status.withered).length;
  const totalHydration = plants.reduce((sum, p) => sum + p.status.hydration, 0);
  const averageHydration =
    plants.length > 0 ? totalHydration / plants.length : 100;
  const totalExperience = plants.reduce(
    (sum, p) => sum + p.evolution_data.experience,
    0
  );
  const totalPerfectWater = plants.reduce(
    (sum, p) => sum + p.metadata.perfect_water_count,
    0
  );
  const totalWater = plants.reduce(
    (sum, p) => sum + p.metadata.total_water_count,
    0
  );
  const perfectWaterRatio = totalWater > 0 ? totalPerfectWater / totalWater : 0;

  return {
    total_plants: plants.length,
    healthy_plants: healthyPlants,
    withered_plants: witheredPlants,
    average_hydration: averageHydration,
    total_experience: totalExperience,
    garden_level: currentGarden.statistics.garden_level,
    days_active: currentGarden.statistics.days_active,
    perfect_water_ratio: perfectWaterRatio,
  };
}

// アクション: 庭園をリセット
export const resetGarden = () => {
  if (confirm("庭園をリセットしますか？すべての植物が失われます。")) {
    garden.set(createInitialGarden());
    selectedPlant.set(null);
    notifications.set([]);
  }
};

// アクション: 設定を更新
export const updateGardenSettings = (settings: Partial<GardenSettings>) => {
  garden.update((g) => ({
    ...g,
    settings: { ...g.settings, ...settings },
  }));
};

// 定期的な水分更新（1分ごと）
if (browser) {
  setInterval(() => {
    updatePlantHydration();
  }, 60000); // 60秒
}
