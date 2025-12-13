/**
 * 記憶の庭 (Garden of Memory) の型定義
 * 育成シミュレーションゲームのデータ構造を定義
 */

// 植物タイプ
export type PlantType =
  | "AppleTree"
  | "Rose"
  | "Sunflower"
  | "Bamboo"
  | "Oak"
  | "Lotus"
  | "CherryBlossom"
  | "Cactus"
  | "Fern"
  | "Lavender";

// 成長段階
export type GrowthStage = 0 | 1 | 2 | 3 | 4;
// 0: Seed（種）
// 1: Sprout（芽）
// 2: Sapling（若木）
// 3: Mature Tree（成木）
// 4: Ancient Guardian（古木/精霊）

// カード内容
export interface CardContent {
  question: string; // 問題
  answer: string; // 答え
  category?: string; // カテゴリー
  tags?: string[]; // タグ
  wordId?: number; // HSK単語ID（既存データとの連携用）
}

// 位置情報
export interface Position {
  x: number; // X座標（0-100）
  y: number; // Y座標（0-100）
  grid_index?: number; // グリッドインデックス（オプション）
}

// 視覚状態
export interface VisualState {
  type: PlantType; // 植物タイプ
  stage: GrowthStage; // 成長段階
  color_code: string; // カラーコード（水分量に応じて変化）
  position: Position; // 庭内の位置
  size: number; // サイズ（0.5 - 2.0）
}

// 植物状態
export interface PlantStatus {
  hydration: number; // 水分量（0.0 - 100.0%）
  withered: boolean; // 枯死フラグ
  health: number; // 健康度（0-100）
  last_watered: number; // 最終水やり時刻（Unix timestamp）
  warning_threshold: number; // 警告閾値（デフォルト: 20%）
}

// SRSパラメータ
export interface SRSParameters {
  last_watered: number; // Unix Timestamp
  decay_rate: number; // 1時間あたりの水分減少量
  stability: number; // 記憶の安定性（日数）
  interval: number; // 次回復習間隔（日）
  ease_factor: number; // 難易度係数
  review_count: number; // 復習回数
  next_review: string; // 次回復習日（ISO 8601）
}

// 特殊能力の効果
export interface AbilityEffect {
  type: "buff" | "debuff" | "passive";
  target: "self" | "nearby" | "category";
  value: number;
  duration?: number; // 秒（passiveの場合はundefined）
}

// 特殊能力
export interface SpecialAbility {
  id: string;
  name: string;
  description: string;
  effect: AbilityEffect;
  unlocked_at_stage: GrowthStage;
}

// 進化イベント
export interface EvolutionEvent {
  timestamp: number;
  from_stage: GrowthStage;
  to_stage: GrowthStage;
  trigger: string; // 進化のきっかけ
}

// 進化データ
export interface EvolutionData {
  current_stage: GrowthStage;
  experience: number; // 経験値
  experience_to_next: number; // 次段階までの必要経験値
  evolution_history: EvolutionEvent[]; // 進化履歴
  special_abilities: SpecialAbility[]; // 特殊能力
}

// 植物メタデータ
export interface PlantMetadata {
  created_at: string; // 作成日
  first_watered: string; // 初回水やり日
  total_water_count: number; // 総水やり回数
  perfect_water_count: number; // 完璧なタイミングでの水やり回数
  category_color: string; // カテゴリー色
}

// 植物データ
export interface Plant {
  plant_id: string; // ユニークID（例: "vocab_apple"）
  content: CardContent; // カード内容
  visual_state: VisualState; // 視覚状態
  status: PlantStatus; // 状態
  srs_parameters: SRSParameters; // SRSパラメータ
  evolution_data: EvolutionData; // 進化データ
  metadata: PlantMetadata; // メタデータ
}

// レイアウトタイプ
export type LayoutType = "grid" | "isometric" | "free" | "spiral";

// 庭園テーマ
export type GardenTheme =
  | "japanese"
  | "english"
  | "tropical"
  | "minimalist"
  | "fantasy";

// 装飾タイプ
export type DecorationType =
  | "fountain"
  | "bench"
  | "path"
  | "statue"
  | "lantern"
  | "bridge";

// 装飾品
export interface Decoration {
  id: string;
  type: DecorationType;
  position: Position;
  unlocked: boolean;
}

// 庭園レイアウト
export interface GardenLayout {
  type: LayoutType; // レイアウトタイプ
  grid_size: number; // グリッドサイズ（10x10, 15x15など）
  theme: GardenTheme; // テーマ
  decorations: Decoration[]; // 装飾品
}

// 庭園統計
export interface GardenStatistics {
  total_plants: number;
  healthy_plants: number;
  withered_plants: number;
  average_hydration: number;
  total_experience: number;
  garden_level: number;
  days_active: number;
  perfect_water_ratio: number; // 完璧なタイミングでの水やり比率
}

// 庭園設定
export interface GardenSettings {
  auto_water_enabled: boolean; // 自動水やり（非推奨）
  notification_enabled: boolean; // 通知有効化
  notification_threshold: number; // 通知閾値（水分量%）
  show_warnings: boolean; // 警告表示
  animation_speed: number; // アニメーション速度（0.5-2.0）
  sound_enabled: boolean; // 音声効果
}

// 天候（装飾的）
export interface Weather {
  type: "sunny" | "cloudy" | "rainy" | "snowy";
  intensity: number; // 0-100
}

// 庭園データ
export interface Garden {
  garden_id: string; // 庭園ID
  plants: Plant[]; // 植物リスト
  layout: GardenLayout; // レイアウト設定
  statistics: GardenStatistics; // 統計情報
  settings: GardenSettings; // 設定
  weather: Weather; // 天候（装飾的）
}

// クイズ評価
export type QuizRating = "perfect" | "good" | "ok" | "poor";

// クイズ結果
export interface QuizResult {
  question: string;
  user_answer: string;
  correct_answer: string;
  is_correct: boolean;
  time_taken: number; // 回答時間（秒）
  attempts: number; // 試行回数
  rating: QuizRating;
}

// 水やりセッション
export interface WateringSession {
  session_id: string;
  plant_id: string;
  start_time: number;
  end_time?: number;
  quiz_result: QuizResult;
  hydration_before: number;
  hydration_after: number;
  crisis_bonus: boolean; // 危機回避ボーナス
  experience_gained: number;
  evolution_triggered: boolean;
}

// 通知タイプ
export type NotificationType =
  | "hydration_low" // 水分不足
  | "hydration_critical" // 水分危機
  | "evolution" // 進化
  | "achievement" // アチーブメント
  | "daily_reminder"; // 日次リマインダー

// 通知
export interface Notification {
  id: string;
  type: NotificationType;
  plant_id: string;
  message: string;
  priority: "low" | "medium" | "high";
  timestamp: number;
}

