import { writable } from "svelte/store";
import { browser } from "$app/environment";

// Persist to localStorage
const storedMasteredIds: number[] = browser
  ? JSON.parse(localStorage.getItem("hsk1_mastered_ids") || "[]")
  : [];

export const masteredIds = writable<number[]>(storedMasteredIds);

if (browser) {
  masteredIds.subscribe((value) => {
    localStorage.setItem("hsk1_mastered_ids", JSON.stringify(value));
  });
}

// Load muted state from localStorage
const storedMuted: boolean = browser
  ? localStorage.getItem("hsk1_muted") === "true"
  : false;

// App state
export const currentLevel = writable<number>(1);
export const headerTitle = writable<string>("HSK学習アプリ");
export const showBottomNav = writable<boolean>(false);
export const currentCategory = writable<string>("all");
export const muted = writable<boolean>(storedMuted);

// Save muted state to localStorage
if (browser) {
  muted.subscribe((value) => {
    localStorage.setItem("hsk1_muted", value.toString());
  });
}

// Header stats
export const totalWords = writable<number>(0);
export const learnedWords = writable<number>(0);

// Search Query
export const searchQuery = writable<string>("");

// Modal State
export const showSettings = writable<boolean>(false);

// Custom back handler (for pages that need custom back behavior)
export const customBackHandler = writable<(() => void) | null>(null);
