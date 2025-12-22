import type { SRSData, Rating, Rarity } from "../types/sentence-smith";

/**
 * Calculate the rating based on performance
 */
export function calculateRating(
  timeTaken: number,
  mistakes: number,
  difficultyLevel: number
): Rating {
  const timeLimit = getTimeLimit(difficultyLevel);
  // Relaxed timing for better UX: "Perfect" is within 40% of time limit
  const perfectTime = timeLimit * 0.4;

  if (mistakes === 0 && timeTaken <= perfectTime) {
    return "legendary";
  } else if (mistakes === 0 && timeTaken <= timeLimit) {
    return "epic";
  } else if (mistakes <= 2 && timeTaken <= timeLimit * 1.5) {
    return "rare";
  } else {
    return "broken";
  }
}

/**
 * Calculate Retrievability (R) - probability of recalling at time t
 * Based on FSRS theory: R(t) = (1 + factor * t/S)^(-decay)
 * Where R=0.9 when t=S
 */
export function calculateRetrievability(
  stability: number,
  daysSinceReview: number
): number {
  if (stability <= 0) return 0;
  if (daysSinceReview <= 0) return 1;

  // FSRS parameters (simplified version)
  const factor = 0.9;
  const decay = 1.0;

  const ratio = daysSinceReview / stability;
  return Math.pow(1 + factor * ratio, -decay);
}

/**
 * Get initial stability for new cards
 */
function getInitialStability(difficulty: number): number {
  // Base stability decreases with difficulty
  // Easy cards start with ~3 days, hard cards start with ~1 day
  return Math.max(1, 4 - (difficulty - 1) * 0.5);
}

/**
 * Update SRS data based on rating using FSRS algorithm
 * Based on FSRS theory from docs/FSRS.md
 */
export function updateSRS(
  currentSRS: SRSData,
  rating: Rating
): {
  interval: number;
  ease_factor: number;
  stability: number;
  difficulty: number;
} {
  // Initialize stability and difficulty if not present (backward compatibility)
  let stability =
    currentSRS.stability ?? getInitialStability(currentSRS.difficulty ?? 5);
  let difficulty = currentSRS.difficulty ?? 5;
  let newEaseFactor = currentSRS.ease_factor ?? 2.5;

  // FSRS update logic based on rating
  switch (rating) {
    case "legendary": // Easy (4) - FSRS equivalent
      // Decrease difficulty, increase stability significantly
      difficulty = Math.max(1, difficulty - 1);
      stability =
        stability *
        Math.exp(1.2) *
        (1 - (difficulty - 1) / 15); // FSRS formula approximation
      newEaseFactor = Math.min(newEaseFactor + 0.15, 3.0);
      break;

    case "epic": // Good (3) - FSRS equivalent
      // Maintain difficulty, increase stability moderately
      stability =
        stability *
        Math.exp(0.8) *
        (1 - (difficulty - 1) / 15); // FSRS formula approximation
      // Ease factor stays same
      break;

    case "rare": // Hard (2) - FSRS equivalent
      // Increase difficulty slightly, increase stability slightly
      difficulty = Math.min(10, difficulty + 0.5);
      stability =
        stability *
        Math.exp(0.3) *
        (1 - (difficulty - 1) / 15); // FSRS formula approximation
      newEaseFactor = Math.max(newEaseFactor - 0.15, 1.3);
      break;

    case "broken": // Again (1) - FSRS equivalent
      // Increase difficulty, reset stability with penalty
      difficulty = Math.min(10, difficulty + 1);
      stability = Math.max(1, stability * 0.5); // Penalty for forgetting
      newEaseFactor = Math.max(newEaseFactor - 0.2, 1.3);
      break;
  }

  // Ensure stability is at least 1 day
  stability = Math.max(1, Math.round(stability * 10) / 10); // Round to 1 decimal

  // Calculate new interval based on stability
  const newInterval = Math.max(1, Math.round(stability));

  return {
    interval: newInterval,
    ease_factor: newEaseFactor,
    stability: stability,
    difficulty: difficulty,
  };
}

/**
 * Calculate quality score (0-100) for RPG elements
 */
export function calculateQualityScore(
  rating: Rating,
  timeTaken: number,
  difficultyLevel: number
): number {
  const timeLimit = getTimeLimit(difficultyLevel);

  const baseScore = {
    legendary: 100,
    epic: 75,
    rare: 50,
    broken: 0,
  }[rating];

  if (rating === "broken") return 0;

  // Bonus for speed
  const timeBonus = Math.max(0, ((timeLimit - timeTaken) / timeLimit) * 20);
  return Math.min(100, Math.floor(baseScore + timeBonus));
}

/**
 * Determine item rarity based on quality and streak
 */
export function determineRarity(qualityScore: number, streak: number): Rarity {
  if (qualityScore >= 95 && streak >= 5) return "legendary";
  if (qualityScore >= 80) return "epic";
  if (qualityScore >= 60) return "rare";
  if (qualityScore >= 40) return "uncommon";
  return "common";
}

/**
 * Get days since last review
 */
export function getDaysSinceReview(lastReviewDate?: string): number {
  if (!lastReviewDate) return 0;
  const lastReview = new Date(lastReviewDate);
  const now = new Date();
  const diffTime = now.getTime() - lastReview.getTime();
  return Math.floor(diffTime / (1000 * 60 * 60 * 24));
}

/**
 * Get time limit based on difficulty level
 */
export function getTimeLimit(difficultyLevel: number): number {
  const baseTime: Record<number, number> = {
    1: 30,
    2: 45,
    3: 60,
    4: 90,
    5: 120,
  };
  return baseTime[difficultyLevel] || 60;
}

/**
 * Calculate proper difficulty level based on sentence length (word count)
 */
export function calculateDifficultyLevel(sentence: string): number {
  // For Chinese/English mix, simple space splitting might not be perfect for Chinese char counts
  // but let's assume space separated words or pinyin for now, or just length if no spaces.
  const isChinese = /[\u4e00-\u9fa5]/.test(sentence);

  let count = 0;
  if (isChinese) {
    // If predominantly Chinese, count characters
    count = sentence.replace(/\s+/g, "").length;
  } else {
    // Space separated (Pinyin or English)
    count = sentence.split(/\s+/).length;
  }

  if (count <= 5) return 1;
  if (count <= 8) return 2;
  if (count <= 12) return 3;
  if (count <= 15) return 4;
  return 5;
}
