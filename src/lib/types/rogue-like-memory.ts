/**
 * ローグライクRPG：忘却のダンジョンの型定義
 */

export type EquipmentType = "weapon" | "armor" | "accessory" | "spell";

export type Attribute =
  | "logic" // 論理（数学、物理）
  | "language" // 言語（英語、国語）
  | "history" // 歴史
  | "science" // 科学
  | "art" // 芸術
  | "general"; // 一般知識

export type Rarity =
  | "common" // 普通
  | "uncommon" // 珍しい
  | "rare" // レア
  | "epic" // エピック
  | "legendary"; // 伝説

export type StatusLabel =
  | "Sharp" // 切れ味良好
  | "Dull" // 鈍い
  | "Rusty" // 錆びている
  | "Broken"; // 壊れている

export type QuizRating = "perfect" | "good" | "ok" | "poor";

export interface BaseStats {
  attack: number; // 基本攻撃力
  defense: number; // 基本防御力
  magic_power?: number; // 魔法力（魔法のみ）
  attribute: Attribute; // 属性（科目）
  rarity: Rarity; // レアリティ
}

export interface Condition {
  sharpness: number; // 切れ味（0.0 - 1.0）
  durability: number; // 耐久度（0-100）
  status_label: StatusLabel; // 状態ラベル
  last_used: number; // 最終使用時刻（Unix timestamp）
  decay_rate: number; // 減衰率（%/時間）
}

export interface DynamicStats {
  current_attack: number; // 現在の攻撃力
  current_defense: number; // 現在の防御力
  current_magic_power?: number; // 現在の魔法力
}

export interface CardContent {
  question: string; // 問題
  answer: string; // 答え
  options?: string[]; // 選択肢（オプション）
  category: string; // カテゴリー
  difficulty: number; // 難易度（1-10）
  wordId?: number; // HSK単語ID（オプション）
}

export interface SRSData {
  next_review: string; // 次回復習日（ISO 8601）
  interval: number; // 間隔（日）
  ease_factor: number; // 難易度係数
  review_count: number; // 復習回数
  last_review_date?: string; // 最終復習日
  stability: number; // 安定性
}

export interface ItemMetadata {
  obtained_date: string; // 獲得日
  total_uses: number; // 総使用回数
  critical_hits: number; // クリティカルヒット数
  perfect_recalls: number; // 完璧な想起回数
}

export interface Equipment {
  item_id: string; // ユニークID（例: "sword_math_formula_01"）
  name: string; // アイテム名
  type: EquipmentType; // 装備タイプ
  base_stats: BaseStats; // 基本ステータス
  condition: Condition; // 状態（錆び具合）
  dynamic_stats: DynamicStats; // 動的ステータス（現在値）
  card_content: CardContent; // カード内容
  srs_data: SRSData; // SRSデータ
  metadata: ItemMetadata; // メタデータ
}

export interface PlayerStats {
  max_hp: number; // 最大HP
  current_hp: number; // 現在のHP
  max_mp: number; // 最大MP
  current_mp: number; // 現在のMP
  strength: number; // 筋力（装備の攻撃力に影響）
  vitality: number; // 体力（装備の防御力に影響）
  intelligence: number; // 知性（魔法力に影響）
  luck: number; // 運（クリティカル率に影響）
}

export interface EquipmentSlot {
  weapon: Equipment | null; // 武器スロット
  armor: Equipment | null; // 防具スロット
  accessory: Equipment | null; // アクセサリースロット
  spell: Equipment | null; // 魔法スロット
}

export interface DungeonProgress {
  dungeon_id: string; // ダンジョンID
  floor: number; // 現在の階層
  room: number; // 現在の部屋
  enemies_defeated: number; // 倒した敵数
  treasures_found: number; // 見つけた宝箱数
  start_time: number; // 開始時刻
}

export interface Player {
  player_id: string; // プレイヤーID
  name: string; // プレイヤー名
  level: number; // レベル
  experience: number; // 経験値
  stats: PlayerStats; // ステータス
  equipment: EquipmentSlot; // 装備スロット
  inventory: Equipment[]; // インベントリ
  current_dungeon: DungeonProgress | null; // 現在のダンジョン進行状況
  gold: number; // ゴールド
}

export type EnemyType =
  | "slime" // スライム
  | "goblin" // ゴブリン
  | "skeleton" // スケルトン
  | "wizard" // ウィザード
  | "boss"; // ボス

export interface EnemyStats {
  hp: number; // HP
  max_hp: number; // 最大HP
  attack: number; // 攻撃力
  defense: number; // 防御力
  speed: number; // 速度
  weakness?: Attribute; // 弱点属性
}

export interface Enemy {
  enemy_id: string; // 敵ID
  name: string; // 敵名
  type: EnemyType; // 敵タイプ
  stats: EnemyStats; // ステータス
  attribute: Attribute; // 属性
  floor: number; // 出現階層
}

export type RoomType =
  | "combat" // 戦闘
  | "treasure" // 宝箱
  | "rest" // 休憩
  | "event" // イベント
  | "boss"; // ボス

export interface Room {
  room_id: string; // 部屋ID
  type: RoomType; // 部屋タイプ
  enemies?: Enemy[]; // 敵（戦闘部屋）
  completed: boolean; // クリア済みフラグ
}

export interface QuizResult {
  question: string; // 問題
  user_answer: string; // ユーザー回答
  correct_answer: string; // 正解
  is_correct: boolean; // 正誤
  time_taken: number; // 回答時間（秒）
  rating: QuizRating; // 評価
}

export type ActionType =
  | "attack" // 攻撃
  | "defend" // 防御
  | "spell" // 魔法
  | "item" // アイテム使用
  | "flee"; // 逃走

export interface CombatAction {
  actor: "player" | "enemy"; // 行動者
  action_type: ActionType; // 行動タイプ
  equipment_used?: Equipment; // 使用装備
  quiz_result?: QuizResult; // クイズ結果
  damage_dealt?: number; // 与えたダメージ
  damage_taken?: number; // 受けたダメージ
  critical?: boolean; // クリティカルフラグ
  timestamp: number; // タイムスタンプ
}

export interface CombatSession {
  session_id: string; // セッションID
  player: Player; // プレイヤー
  enemy: Enemy; // 敵
  turn: number; // ターン数
  actions: CombatAction[]; // 行動履歴
  result?: CombatResult; // 結果
  start_time: number; // 開始時刻
}

export interface CombatResult {
  victory: boolean; // 勝利フラグ
  experience_gained: number; // 獲得経験値
  gold_gained: number; // 獲得ゴールド
  items_dropped: Equipment[]; // ドロップアイテム
  equipment_updates: EquipmentUpdate[]; // 装備更新
  duration: number; // 戦闘時間（秒）
}

export interface EquipmentUpdate {
  equipment_id: string; // 装備ID
  sharpness_before: number; // 更新前の切れ味
  sharpness_after: number; // 更新後の切れ味
  recall_critical: boolean; // 想起クリティカルフラグ
}
