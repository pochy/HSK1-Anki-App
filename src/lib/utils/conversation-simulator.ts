import type {
  ConversationScene,
  SceneResult,
  ResponseOption,
  ResponseRating,
  GameSettings,
} from "$lib/types/conversation-simulator";

/**
 * SRS更新関数
 * 仕様書の3.1.4に基づいて実装
 */
export function updateSRSAfterScene(
  scene: ConversationScene,
  result: SceneResult
): void {
  const rating = result.rating;

  switch (rating) {
    case "perfect": // Easy (4)
      scene.srs_data.difficulty = Math.max(
        1,
        scene.srs_data.difficulty - 1
      );
      scene.srs_data.stability =
        scene.srs_data.stability *
        Math.exp(1.2) *
        (1 - (scene.srs_data.difficulty - 1) / 15);
      scene.srs_data.streak++;
      break;
    case "good": // Good (3)
      scene.srs_data.stability =
        scene.srs_data.stability *
        Math.exp(0.8) *
        (1 - (scene.srs_data.difficulty - 1) / 15);
      scene.srs_data.streak++;
      break;
    case "ok": // Hard (2)
      scene.srs_data.difficulty = Math.min(
        10,
        scene.srs_data.difficulty + 0.5
      );
      scene.srs_data.stability =
        scene.srs_data.stability *
        Math.exp(0.3) *
        (1 - (scene.srs_data.difficulty - 1) / 15);
      scene.srs_data.streak = 0;
      break;
    case "poor": // Again (1)
      scene.srs_data.difficulty = Math.min(
        10,
        scene.srs_data.difficulty + 1
      );
      scene.srs_data.stability = Math.max(
        1,
        scene.srs_data.stability * 0.5
      );
      scene.srs_data.streak = 0;
      break;
  }

  // 間隔の更新
  scene.srs_data.interval = Math.max(
    1,
    Math.round(scene.srs_data.stability)
  ); // 最低1日にクランプ

  // 次回復習日の計算
  const nextReviewDate = new Date();
  nextReviewDate.setDate(
    nextReviewDate.getDate() + scene.srs_data.interval
  );
  scene.srs_data.next_review = nextReviewDate.toISOString();
  scene.srs_data.review_count++;
  scene.srs_data.last_review_date = new Date().toISOString();

  // メタデータ更新
  scene.metadata.total_plays++;
  if (rating === "perfect") {
    scene.metadata.perfect_count++;
  }
}

/**
 * 評価アルゴリズム
 * 仕様書の3.3に基づいて実装
 */
export function calculateRating(
  selectedResponse: ResponseOption,
  correctResponse: ResponseOption,
  timeTaken: number,
  timeLimitSeconds = 0 // 0 の場合は時間制限なし
): ResponseRating {
  if (timeLimitSeconds > 0 && timeTaken > timeLimitSeconds) {
    return "poor"; // タイムアウトは不正解扱い
  }
  if (!selectedResponse.is_correct) {
    return "poor";
  }

  // 正解の場合、評価を下げずに時間ボーナスのみ付与
  const baseRating = correctResponse.rating;
  const gotTimeBonus =
    timeLimitSeconds > 0
      ? timeTaken <= timeLimitSeconds
      : timeTaken <= 5;

  if (baseRating === "perfect") {
    return "perfect";
  }

  // 時間ボーナスは評価(Rating)には一切影響させず、スコア計算のみに反映する。
  // これにより、反射神経ではなく理解度に基づいた正確なSRS評価を行う。

  if (baseRating === "ok" && gotTimeBonus) {
    return "good";
  }

  return baseRating;
}

/**
 * スコア計算
 * Perfect=100 / Good=70 / OK=40 / Poor=0
 */
export function calculateScore(rating: ResponseRating): number {
  switch (rating) {
    case "perfect":
      return 100;
    case "good":
      return 70;
    case "ok":
      return 40;
    case "poor":
      return 0;
  }
}

/**
 * 音声読み上げ関数
 */
export function speak(
  text: string,
  lang: string = "zh-CN",
  rate: number = 0.8
): void {
  if (typeof window === "undefined" || !window.speechSynthesis) {
    return;
  }

  // 既存の読み上げを停止
  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = lang;
  utterance.rate = rate;

  window.speechSynthesis.speak(utterance);
}

/**
 * 音声読み上げ停止
 */
export function stopSpeaking(): void {
  if (typeof window !== "undefined" && window.speechSynthesis) {
    window.speechSynthesis.cancel();
  }
}

