/**
 * 文明維持シミュレーション (Civ-Style Maintenance) の型定義
 * 施設、カード、都市のデータ構造を定義
 */

// 施設タイプ
export type BuildingType =
  | "library" // 図書館（語学、文学）
  | "hospital" // 病院（医学、生物学）
  | "power_plant" // 発電所（物理、化学）
  | "farm" // 農場（生物学、農業）
  | "factory" // 工場（技術、工学）
  | "school" // 学校（教育、一般知識）
  | "museum" // 博物館（歴史、美術）
  | "research_lab" // 研究所（科学、研究）
  | "court" // 裁判所（法律）
  | "bank"; // 銀行（経済、金融）

// カード状態
export type CardStatus =
  | "active" // アクティブ
  | "decaying" // 減衰中
  | "inactive" // 非アクティブ
  | "broken"; // 破損

// 施設メトリクス
export interface BuildingMetrics {
  maintenance_level: number; // 維持レベル（0.0 - 1.0）
  population: number; // 所属カード数
  active_cards: number; // アクティブカード数
  output_per_tick: number; // ティックあたりの生産リソース
  efficiency: number; // 効率（0.0 - 1.0）
  happiness: number; // 幸福度（0-100）
  decay_rate: number; // 減衰率（%/時間）
}

// カード参照
export interface CardReference {
  id: string; // カードID
  status: CardStatus; // カード状態
  next_review: string; // 次回復習日（ISO 8601）
  last_review?: string; // 最終復習日
  warning: boolean; // 警告フラグ
  contribution: number; // 貢献度（0-100）
}

// 位置情報
export interface Position {
  x: number; // X座標（グリッド）
  y: number; // Y座標（グリッド）
  grid_index: number; // グリッドインデックス
}

// 施設外観
export type BuildingAppearance =
  | "pristine" // 完璧
  | "good" // 良好
  | "fair" // 普通
  | "poor" // 悪い
  | "ruined"; // 廃墟

// 施設状態
export type BuildingCondition =
  | "operational" // 稼働中
  | "degraded" // 劣化
  | "critical" // 危機的
  | "shutdown"; // 停止

// 視覚効果
export interface VisualEffect {
  type: "smoke" | "sparkle" | "dust" | "glow";
  intensity: number; // 強度（0-1）
  color: string; // 色
}

// 施設視覚状態
export interface BuildingVisualState {
  appearance: BuildingAppearance; // 外観
  condition: BuildingCondition; // 状態
  effects: VisualEffect[]; // 視覚効果
}

// リソースタイプ
export type ResourceType =
  | "knowledge" // 知識
  | "energy" // エネルギー
  | "materials" // 材料
  | "gold"; // ゴールド

// リソース量
export interface ResourceAmount {
  type: ResourceType; // リソースタイプ
  amount: number; // 量
}

// アップグレードコスト
export interface UpgradeCost {
  resources: ResourceAmount[]; // リソース
  cards_required: number; // 必要カード数
  level_required: number; // 必要レベル
}

// アップグレード効果
export interface UpgradeEffect {
  type:
    | "efficiency_boost"
    | "capacity_increase"
    | "decay_reduction"
    | "output_boost";
  value: number; // 値
  duration?: number; // 持続時間（永続の場合はundefined）
}

// 施設アップグレード
export interface BuildingUpgrade {
  upgrade_id: string; // アップグレードID
  name: string; // 名前
  description: string; // 説明
  cost: UpgradeCost; // コスト
  effect: UpgradeEffect; // 効果
  unlocked: boolean; // アンロック済み
  applied: boolean; // 適用済み
}

// 施設メタデータ
export interface BuildingMetadata {
  constructed_date: string; // 建設日
  total_output: number; // 総生産量
  maintenance_count: number; // メンテナンス回数
  upgrade_count: number; // アップグレード回数
  category: string; // カテゴリー
  last_decay_time?: number; // 最終減衰時刻（テスト用）
}

// 施設データ
export interface Building {
  building_id: string; // ユニークID（例: "b_library_english"）
  type: BuildingType; // 施設タイプ
  name: string; // 施設名
  category_tag: string; // カテゴリータグ
  level: number; // レベル（1-10）
  metrics: BuildingMetrics; // メトリクス
  cards: CardReference[]; // 所属カード
  position: Position; // 位置
  visual_state: BuildingVisualState; // 視覚状態
  upgrades: BuildingUpgrade[]; // アップグレード
  metadata: BuildingMetadata; // メタデータ
}

// カード内容
export interface CardContent {
  question: string; // 問題
  answer: string; // 答え
  category: string; // カテゴリー
  subcategory?: string; // サブカテゴリー
  tags: string[]; // タグ
  wordId?: number; // HSK単語ID（既存データとの連携用）
}

// SRSデータ
export interface SRSData {
  next_review: string; // 次回復習日（ISO 8601）
  interval: number; // 間隔（日）
  ease_factor: number; // 難易度係数
  review_count: number; // 復習回数
  stability: number; // 安定性
  last_review_date?: string; // 最終復習日
}

// カードメタデータ
export interface CardMetadata {
  created_date: string; // 作成日
  total_reviews: number; // 総復習回数
  perfect_reviews: number; // 完璧な復習回数
  category_color: string; // カテゴリー色
}

// カードデータ
export interface Card {
  card_id: string; // カードID
  content: CardContent; // カード内容
  category: string; // カテゴリー
  building_id?: string; // 所属施設ID
  status: CardStatus; // 状態
  srs_data: SRSData; // SRSデータ
  contribution: number; // 貢献度（0-100）
  last_review?: string; // 最終復習日
  next_review: string; // 次回復習日
  warning: boolean; // 警告フラグ
  metadata: CardMetadata; // メタデータ
}

// 都市テーマ
export type CityTheme =
  | "modern" // モダン
  | "medieval" // 中世
  | "futuristic" // 未来
  | "industrial" // 工業
  | "organic"; // 有機的

// 地区タイプ
export type DistrictType =
  | "residential" // 住宅
  | "commercial" // 商業
  | "industrial" // 工業
  | "educational" // 教育
  | "cultural" // 文化
  | "medical"; // 医療

// 地区
export interface District {
  district_id: string; // 地区ID
  name: string; // 地区名
  type: DistrictType; // 地区タイプ
  buildings: string[]; // 施設IDリスト
  boundaries: Position[]; // 境界
}

// 道路タイプ
export type RoadType =
  | "dirt" // 土道
  | "paved" // 舗装
  | "highway"; // 高速道路

// 道路
export interface Road {
  road_id: string; // 道路ID
  start: Position; // 開始位置
  end: Position; // 終了位置
  type: RoadType; // 道路タイプ
}

// 都市レイアウト
export interface CityLayout {
  grid_size: number; // グリッドサイズ（20x20など）
  theme: CityTheme; // テーマ
  districts: District[]; // 地区
  roads: Road[]; // 道路
}

// リソース容量
export interface ResourceCapacity {
  knowledge: number;
  energy: number;
  materials: number;
  gold: number;
}

// リソース在庫
export interface ResourceInventory {
  knowledge: number; // 知識
  energy: number; // エネルギー
  materials: number; // 材料
  gold: number; // ゴールド
  max_capacity: ResourceCapacity; // 最大容量
}

// 都市統計
export interface CityStatistics {
  total_buildings: number; // 総施設数
  operational_buildings: number; // 稼働施設数
  total_cards: number; // 総カード数
  active_cards: number; // アクティブカード数
  average_maintenance: number; // 平均維持レベル
  total_output: number; // 総生産量
  city_happiness: number; // 都市幸福度（0-100）
  days_active: number; // 活動日数
  growth_rate: number; // 成長率（%/日）
}

// 都市設定
export interface CitySettings {
  auto_maintenance: boolean; // 自動メンテナンス
  notification_enabled: boolean; // 通知有効化
  notification_threshold: number; // 通知閾値（維持レベル%）
  show_warnings: boolean; // 警告表示
  animation_speed: number; // アニメーション速度
  sound_enabled: boolean; // 音声効果
  initial_review_interval: number; // 新規カードの初期復習間隔（日）
  decay_rate_multiplier: number; // 減衰率の倍率（1.0が標準）
}

// 都市データ
export interface City {
  city_id: string; // 都市ID
  name: string; // 都市名
  buildings: Building[]; // 施設リスト
  layout: CityLayout; // レイアウト
  resources: ResourceInventory; // リソース在庫
  statistics: CityStatistics; // 統計情報
  settings: CitySettings; // 設定
  level: number; // 都市レベル
  population: number; // 総人口（総カード数）
}

// クイズ評価
export type QuizRating = "perfect" | "good" | "ok" | "poor";

// クイズ結果
export interface QuizResult {
  question: string; // 問題
  user_answer: string; // ユーザー回答
  correct_answer: string; // 正解
  is_correct: boolean; // 正誤
  time_taken: number; // 回答時間（秒）
  rating: QuizRating; // 評価
}

// カード復習
export interface CardReview {
  card_id: string; // カードID
  quiz_result: QuizResult; // クイズ結果
  contribution_before: number; // 復習前の貢献度
  contribution_after: number; // 復習後の貢献度
  status_before: CardStatus; // 復習前の状態
  status_after: CardStatus; // 復習後の状態
}

// メンテナンスセッション
export interface MaintenanceSession {
  session_id: string; // セッションID
  building_id: string; // 施設ID
  start_time: number; // 開始時刻
  end_time?: number; // 終了時刻
  cards_reviewed: CardReview[]; // 復習したカード
  maintenance_level_before: number; // メンテナンス前の維持レベル
  maintenance_level_after: number; // メンテナンス後の維持レベル
  resources_gained: ResourceAmount[]; // 獲得リソース
  building_upgraded: boolean; // 施設アップグレードフラグ
}
