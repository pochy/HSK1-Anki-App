import type { ConversationScene } from "$lib/types/conversation-simulator";

// 会話シーンデータをインポート
import scene1 from "./conversation-scenes/hsk1_01_greeting.json";
import scene2 from "./conversation-scenes/hsk1_02_name.json";
import scene3 from "./conversation-scenes/hsk1_03_nationality.json";
import scene4 from "./conversation-scenes/hsk1_04_numbers_age.json";
import scene5 from "./conversation-scenes/hsk1_05_date_time.json";
import scene6 from "./conversation-scenes/hsk1_06_family.json";
import scene7 from "./conversation-scenes/hsk1_07_location.json";
import scene8 from "./conversation-scenes/hsk1_08_cafe.json";
import scene9 from "./conversation-scenes/hsk1_09_market.json";
import scene10 from "./conversation-scenes/hsk1_10_belongings.json";

// すべてのシーンを配列にまとめる
export const conversationScenes: ConversationScene[] = [
  scene1 as ConversationScene,
  scene2 as ConversationScene,
  scene3 as ConversationScene,
  scene4 as ConversationScene,
  scene5 as ConversationScene,
  scene6 as ConversationScene,
  scene7 as ConversationScene,
  scene8 as ConversationScene,
  scene9 as ConversationScene,
  scene10 as ConversationScene,
];

// シーンIDで検索するヘルパー関数
export function getSceneById(sceneId: number): ConversationScene | undefined {
  return conversationScenes.find((scene) => scene.scene_id === sceneId);
}

// 復習対象のシーンを取得する関数
export function getScenesForReview(
  scenes: ConversationScene[],
  difficultyRange: [number, number] = [1, 6],
  categoryFilter?: string[]
): ConversationScene[] {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  return scenes.filter((scene) => {
    // 難易度フィルター
    if (
      scene.difficulty_level < difficultyRange[0] ||
      scene.difficulty_level > difficultyRange[1]
    ) {
      return false;
    }

    // カテゴリーフィルター
    if (categoryFilter && categoryFilter.length > 0) {
      if (!categoryFilter.includes(scene.category)) {
        return false;
      }
    }

    // 復習日が来ているかチェック
    const nextReview = new Date(scene.srs_data.next_review);
    const nextReviewDate = new Date(
      nextReview.getFullYear(),
      nextReview.getMonth(),
      nextReview.getDate()
    );

    return nextReviewDate <= today;
  });
}

// シーンをシャッフルする関数
export function shuffleScenes<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

