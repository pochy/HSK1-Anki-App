export interface SentenceCard {
    card_id: number; // Unique ID
    original_sentence: string; // Original sentence (the correct answer)
    tokens: Token[]; // Array of tokens to be arranged
    distractors: string[]; // Dummy words for difficulty adjustment
    difficulty_level: number; // 1-5 (1: short, 5: long)
    srs_data: SRSData; // SRS related data
    item_metadata: ItemMetadata; // Item metadata (RPG element)
    category?: string; // Optional category
    language?: string; // Optional language
}

export interface Token {
    id: string; // Token ID (e.g., "t1")
    text: string; // Text content of the token
    type: TokenType; // Part of speech type
    position: number; // Original position (0-indexed)
}

export type TokenType =
    | "subject"
    | "verb"
    | "object"
    | "article"
    | "adjective"
    | "noun"
    | "adverb"
    | "preposition"
    | "conjunction"
    | "punctuation"
    | "code_keyword"
    | "code_operator"
    | "code_identifier"
    | "other"; // Added 'other' for fallback

export interface SRSData {
    next_review: string; // ISO 8601 date string
    interval: number; // Current interval in days
    ease_factor: number; // Difficulty factor (Initial: 2.5)
    streak: number; // Consecutive correct answers
    last_review_date?: string; // Last review date
    review_count: number; // Total review count
}

export interface ItemMetadata {
    type: ItemType; // Item type
    rarity: Rarity; // Rarity
    quality_score: number; // Quality score (0-100)
    forged_date?: string; // Date forged
}

export type ItemType =
    | "sword"
    | "shield"
    | "armor"
    | "staff"
    | "bow"
    | "dagger";

export type Rarity =
    | "common"
    | "uncommon"
    | "rare"
    | "epic"
    | "legendary";

export interface GameSession {
    session_id: string;
    start_time: number; // Unix timestamp
    end_time?: number;
    cards: SentenceCard[];
    current_card_index: number;
    score: number;
    results: CardResult[];
    settings: GameSettings;
}

export interface CardResult {
    card_id: number;
    time_taken: number; // Seconds
    mistakes: number;
    rating: Rating;
    new_interval: number;
    new_ease_factor: number;
    item_created: ItemMetadata;
}

export type Rating = "legendary" | "epic" | "rare" | "broken";

export interface GameSettings {
    time_limit: number; // Seconds (0 for unlimited)
    difficulty_range: [number, number]; // [min, max]
    enable_distractors: boolean;
    enable_hints: boolean;
    sound_enabled: boolean;
    tts_enabled: boolean;
}
