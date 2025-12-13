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
 * Update SRS data based on rating
 * Implementation based on SM-2 but adapted for the game mechanics described in FSRS.md / Spec
 */
export function updateSRS(
    currentSRS: SRSData,
    rating: Rating
): { interval: number; ease_factor: number } {
    let newInterval: number;
    let newEaseFactor: number = currentSRS.ease_factor;

    switch (rating) {
        case "legendary": // Like "Easy"
            newInterval = Math.round(currentSRS.interval * 2.5);
            newEaseFactor = Math.min(currentSRS.ease_factor + 0.15, 3.0);
            break;
        case "epic": // Like "Good"
            newInterval = Math.round(currentSRS.interval * 1.8);
            // Ease factor stays same
            break;
        case "rare": // Like "Hard"
            newInterval = Math.round(currentSRS.interval * 1.2);
            newEaseFactor = Math.max(currentSRS.ease_factor - 0.15, 1.3);
            break;
        case "broken": // Like "Again"
            newInterval = 1; // Reset to 1 day
            newEaseFactor = Math.max(currentSRS.ease_factor - 0.2, 1.3);
            break;
        default:
            newInterval = 1;
            break;
    }

    // Ensure interval is at least 1
    newInterval = Math.max(1, newInterval);

    return { interval: newInterval, ease_factor: newEaseFactor };
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
        count = sentence.replace(/\s+/g, '').length;
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
