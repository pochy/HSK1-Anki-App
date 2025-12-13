import { writable } from "svelte/store";
import { browser } from "$app/environment";

// Persist to localStorage
const storedMasteredIds = browser
  ? JSON.parse(localStorage.getItem("masteredIds") || "[]")
  : [];

export const masteredIds = writable(storedMasteredIds);

if (browser) {
  masteredIds.subscribe((value) => {
    localStorage.setItem("masteredIds", JSON.stringify(value));
  });
}

// App state
export const currentLevel = writable(1);
export const headerTitle = writable("HSK学習アプリ");
export const showBottomNav = writable(false);
export const currentCategory = writable("all");
export const muted = writable(false);

// Header stats
export const totalWords = writable(0);
export const learnedWords = writable(0);

// Search Query
export const searchQuery = writable("");

// Modal State
export const showSettings = writable(false);
