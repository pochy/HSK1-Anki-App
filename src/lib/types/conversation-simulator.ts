export type SceneCategory =
  | "greeting"
  | "shopping"
  | "restaurant"
  | "transportation"
  | "asking_directions"
  | "phone"
  | "friendship"
  | "business"
  | "emergency"
  | "daily_life";

export type RelationshipType =
  | "friend"
  | "stranger"
  | "superior"
  | "colleague"
  | "family";

export type FormalityLevel = "casual" | "polite" | "formal";

export type EmotionalTone =
  | "neutral"
  | "friendly"
  | "apologetic"
  | "grateful"
  | "urgent";

export type ResponseRating = "perfect" | "good" | "ok" | "poor";

export type DistractorType =
  | "grammar_error"
  | "wrong_context"
  | "too_formal"
  | "too_casual"
  | "wrong_meaning";

export interface Participant {
  role: string;
  name?: string;
}

export interface ConversationContext {
  setting: string;
  participants: Participant[];
  relationship: RelationshipType;
  formality_level: FormalityLevel;
  emotional_tone?: EmotionalTone;
}

export interface Dialogue {
  speaker: string;
  text: string;
  pinyin?: string;
  translation: string;
  order: number;
}

export interface ResponseOption {
  response_id: string;
  text: string;
  pinyin?: string;
  translation: string;
  is_correct: boolean;
  rating: ResponseRating;
  explanation?: string;
  distractor_type?: DistractorType;
}

export interface GrammarExample {
  chinese: string;
  pinyin?: string;
  japanese: string;
  explanation: string;
}

export interface GrammarPoint {
  point_id: string;
  title: string;
  description: string;
  examples: GrammarExample[];
  related_scenes: number[];
}

export interface SRSData {
  next_review: string; // ISO 8601
  interval: number; // 日数
  stability: number; // FSRS Stability
  difficulty: number; // FSRS Difficulty 1-10
  streak: number; // 連続正解数
  last_review_date?: string; // ISO 8601
  review_count: number; // 総復習回数
}

export interface SceneMetadata {
  created_date: string; // ISO 8601
  total_plays: number;
  perfect_count: number;
  category_color: string; // Hex color
  estimated_time: number; // 秒数
}

export interface ConversationScene {
  scene_id: number;
  title: string;
  description: string;
  category: SceneCategory;
  difficulty_level: 1 | 2 | 3 | 4 | 5 | 6;
  context: ConversationContext;
  dialogue: Dialogue[];
  options: ResponseOption[];
  grammar_points: GrammarPoint[];
  srs_data: SRSData;
  metadata: SceneMetadata;
}

export interface SceneResult {
  scene_id: number;
  selected_response_id: string;
  correct_response_id: string;
  rating: ResponseRating;
  time_taken: number; // 秒数
  new_interval: number;
  new_stability: number;
  grammar_points_learned: string[];
}

export interface GameSettings {
  difficulty_range: [number, number]; // [min, max]
  category_filter?: SceneCategory[];
  enable_hints: boolean;
  sound_enabled: boolean;
  tts_enabled: boolean;
  show_explanation: boolean;
  time_limit_seconds: number; // 0で無制限
  max_scenes_per_session?: number;
}

export interface GameSession {
  session_id: string;
  start_time: number; // Unix timestamp
  end_time?: number;
  scene_ids: number[]; // シーンIDの配列
  current_scene_index: number;
  score: number;
  results: SceneResult[];
  settings: GameSettings;
}

