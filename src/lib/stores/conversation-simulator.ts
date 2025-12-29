import { writable, get } from "svelte/store";
import { browser } from "$app/environment";
import type {
  ConversationScene,
  GameSession,
  GameSettings,
  SRSData,
} from "$lib/types/conversation-simulator";
import { conversationScenes } from "$lib/data/conversation-scenes";

// デフォルト設定
const defaultSettings: GameSettings = {
  difficulty_range: [1, 6],
  enable_hints: true,
  sound_enabled: true,
  tts_enabled: true,
  show_explanation: true,
  time_limit_seconds: 30, // 30秒制限
  max_scenes_per_session: 10,
};

// 初期セッション状態
const initialSession: GameSession = {
  session_id: "",
  start_time: 0,
  scene_ids: [],
  current_scene_index: 0,
  score: 0,
  results: [],
  settings: defaultSettings,
};

// ストア
export const gameSession = writable<GameSession>(initialSession);
export const isPlaying = writable<boolean>(false);
export const currentScene = writable<ConversationScene | null>(null);

// LocalStorageからSRSデータを読み込む
const storedSRS = browser
  ? JSON.parse(localStorage.getItem("conversation_simulator_scenes") || "{}")
  : {};

export const srsStore = writable<Record<number, Partial<SRSData>>>(storedSRS);

// LocalStorageに保存
if (browser) {
  srsStore.subscribe((val) => {
    try {
      localStorage.setItem(
        "conversation_simulator_scenes",
        JSON.stringify(val)
      );
    } catch (e) {
      // LocalStorage容量オーバーの場合、古いデータを削除
      console.warn("LocalStorage quota exceeded, cleaning up...");
      cleanupOldData();
    }
  });
}

// 古いデータをクリーンアップ
function cleanupOldData(): void {
  try {
    // 古いセッションデータを削除
    localStorage.removeItem("conversation_simulator_session");
    // SRSデータの一部を削除（最も古いものから）
    const currentSRS = get(srsStore);
    const entries = Object.entries(currentSRS);
    if (entries.length > 100) {
      // 100件を超える場合は古いものを削除
      const sorted = entries.sort((a, b) => {
        const dateA = a[1].last_review_date || "0";
        const dateB = b[1].last_review_date || "0";
        return dateA.localeCompare(dateB);
      });
      const toKeep = sorted.slice(-100);
      srsStore.set(Object.fromEntries(toKeep));
    }
  } catch (e) {
    console.error("Failed to cleanup old data:", e);
  }
}

// セッション開始
export function startSession(settings?: Partial<GameSettings>): void {
  const currentSRS = get(srsStore);
  const mergedSettings = { ...defaultSettings, ...settings };

  // 復習対象のシーンを取得
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  const reviewScenes = conversationScenes.filter((scene) => {
    // 難易度フィルター
    if (
      scene.difficulty_level < mergedSettings.difficulty_range[0] ||
      scene.difficulty_level > mergedSettings.difficulty_range[1]
    ) {
      return false;
    }

    // カテゴリーフィルター
    if (
      mergedSettings.category_filter &&
      mergedSettings.category_filter.length > 0
    ) {
      if (!mergedSettings.category_filter.includes(scene.category)) {
        return false;
      }
    }

    // 復習日が来ているかチェック
    const sceneSRS = currentSRS[scene.scene_id] || scene.srs_data;
    const nextReview = new Date(
      sceneSRS.next_review || scene.srs_data.next_review
    );
    const nextReviewDate = new Date(
      nextReview.getFullYear(),
      nextReview.getMonth(),
      nextReview.getDate()
    );

    return nextReviewDate <= today;
  });

  // 復習対象がない場合は全シーンから選択
  const availableScenes =
    reviewScenes.length > 0 ? reviewScenes : conversationScenes;

  // シャッフル
  const shuffled = [...availableScenes].sort(() => Math.random() - 0.5);

  // 最大シーン数を制限
  const selectedScenes = shuffled.slice(
    0,
    mergedSettings.max_scenes_per_session || 10
  );

  const sceneIds = selectedScenes.map((s) => s.scene_id);

  gameSession.set({
    ...initialSession,
    session_id: Date.now().toString(),
    start_time: Date.now(),
    scene_ids: sceneIds,
    settings: mergedSettings,
  });

  isPlaying.set(true);
  loadCurrentScene();
}

// 現在のシーンを読み込む
export function loadCurrentScene(): void {
  const session = get(gameSession);
  if (session.scene_ids.length === 0) {
    currentScene.set(null);
    return;
  }

  const sceneId = session.scene_ids[session.current_scene_index];
  const scene = conversationScenes.find((s) => s.scene_id === sceneId);

  if (scene) {
    // LocalStorageからSRSデータをマージ（新しいオブジェクトを作成）
    const currentSRS = get(srsStore);
    const storedSRS = currentSRS[scene.scene_id];

    // 新しいオブジェクトを作成してSRSデータをマージ
    const sceneWithSRS: ConversationScene = {
      ...scene,
      srs_data: storedSRS
        ? {
            ...scene.srs_data,
            ...storedSRS,
            // デフォルト値の確保
            stability: storedSRS.stability ?? scene.srs_data.stability ?? 1,
            difficulty: storedSRS.difficulty ?? scene.srs_data.difficulty ?? 5,
            interval: storedSRS.interval ?? scene.srs_data.interval ?? 1,
            streak: storedSRS.streak ?? scene.srs_data.streak ?? 0,
            review_count:
              storedSRS.review_count ?? scene.srs_data.review_count ?? 0,
          }
        : scene.srs_data,
    };

    currentScene.set(sceneWithSRS);
  } else {
    currentScene.set(null);
  }
}

// 次のシーンへ
export function nextScene(): void {
  gameSession.update((s) => {
    if (s.current_scene_index < s.scene_ids.length - 1) {
      return { ...s, current_scene_index: s.current_scene_index + 1 };
    }
    return s;
  });
  loadCurrentScene();
}

// セッション終了
export function endSession(): void {
  gameSession.update((s) => ({
    ...s,
    end_time: Date.now(),
  }));
  isPlaying.set(false);
}

// SRSデータを保存
export function saveSRSData(sceneId: number, srsData: Partial<SRSData>): void {
  srsStore.update((current) => ({
    ...current,
    [sceneId]: {
      ...current[sceneId],
      ...srsData,
    },
  }));
}
