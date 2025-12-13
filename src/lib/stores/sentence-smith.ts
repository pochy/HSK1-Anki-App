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
  const cards = generateGameCards(5); // Start with 5 cards for a quick session

  gameSession.set({
    ...initialState,
    session_id: Date.now().toString(),
    start_time: Date.now(),
    cards: cards,
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
