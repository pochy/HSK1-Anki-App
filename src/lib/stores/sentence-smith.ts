import { writable, get } from "svelte/store";
import type {
  GameSession,
  SentenceCard,
  SRSData,
} from "../types/sentence-smith";
import { generateGameCards } from "../utils/sentence-generator";
import { browser } from "$app/environment";

// Initial state
const initialState: GameSession = {
  session_id: "",
  start_time: 0,
  cards: [],
  current_card_index: 0,
  score: 0,
  results: [],
  settings: {
    time_limit: 0,
    difficulty_range: [1, 5],
    enable_distractors: false,
    enable_hints: true,
    sound_enabled: true,
    tts_enabled: true,
  },
};

export const gameSession = writable<GameSession>(initialState);
export const isPlaying = writable<boolean>(false);

// Actions
export const startGame = (settings?: Partial<GameSession["settings"]>) => {
  // Load existing SRS data first
  const currentSRS = get(srsStore);
  
  // Generate cards with SRS-aware prioritization
  const cards = generateGameCards(5, [1, 5], currentSRS);

  // Cards already have SRS data merged from generateGameCards
  // But ensure backward compatibility for any missing fields
  const cardsWithSRS = cards.map((card) => {
    const existingSRS = currentSRS[card.original_sentence];
    if (existingSRS) {
      // Merge existing SRS data, ensuring backward compatibility
      return {
        ...card,
        srs_data: {
          ...card.srs_data,
          ...existingSRS,
          // Ensure stability and difficulty exist
          stability:
            existingSRS.stability ??
            card.srs_data.stability ??
            Math.max(1, 4 - ((existingSRS.difficulty ?? 5) - 1) * 0.5),
          difficulty:
            existingSRS.difficulty ??
            card.srs_data.difficulty ??
            5,
        },
      };
    }
    return card;
  });

  gameSession.set({
    ...initialState,
    session_id: Date.now().toString(),
    start_time: Date.now(),
    cards: cardsWithSRS,
    settings: { ...initialState.settings, ...settings },
  });
  isPlaying.set(true);
};

export const nextCard = () => {
  gameSession.update((s) => {
    if (s.current_card_index < s.cards.length - 1) {
      return { ...s, current_card_index: s.current_card_index + 1 };
    }
    return s;
  });
};

export const endGame = () => {
  gameSession.update((s) => ({ ...s, end_time: Date.now() }));
  isPlaying.set(false);
};

// --- Persistence for SRS Data (Mock / LocalStorage) ---
// In a real app, this would be a DB or complex sync.
// We will store SRS data keyed by sentence hash or ID if stable.
// Since IDs are generated dynamically in generator (oops), we should try to make them stable or just use sentence as key.
// 'sentence-generator.ts' generates IDs on the fly.
// Ideally we map `original_sentence` -> SRSData.

const storedSRS = browser
  ? JSON.parse(localStorage.getItem("sentence_smith_srs") || "{}")
  : {};
export const srsStore = writable<Record<string, SRSData>>(storedSRS);

if (browser) {
  srsStore.subscribe((val) => {
    localStorage.setItem("sentence_smith_srs", JSON.stringify(val));
  });
}
