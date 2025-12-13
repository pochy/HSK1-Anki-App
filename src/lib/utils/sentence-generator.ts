import { hsk1 } from "../data/hsk1";
import { hsk2 } from "../data/hsk2";
import type { SentenceCard, Token, TokenType } from "../types/sentence-smith";
import { calculateDifficultyLevel } from "./fsrs";

// Combine data sources
const allWords = [...hsk1, ...hsk2];

/**
 * Generate a list of SentenceCards for a game session
 */
export function generateGameCards(
    count: number = 10,
    difficultyRange: [number, number] = [1, 5]
): SentenceCard[] {
    // 1. Extract all potential sentences from examples
    let potentialCards: SentenceCard[] = [];
    let cardIdCounter = 1;

    // Shuffle words to get random variety each time
    const shuffledWords = [...allWords].sort(() => Math.random() - 0.5);

    for (const word of shuffledWords) {
        if (!word.examples) continue;

        for (const example of word.examples) {
            if (!example.chinese) continue;

            const sentence = example.chinese;
            const difficulty = calculateDifficultyLevel(sentence);

            // Filter by difficulty
            if (
                difficulty < difficultyRange[0] ||
                difficulty > difficultyRange[1]
            ) {
                continue;
            }

            // Tokenize
            // Strategy: Keep the target word intact, split the rest by characters
            const tokens = tokenizeSentence(sentence, word.char);

            const card: SentenceCard = {
                card_id: cardIdCounter++,
                original_sentence: sentence,
                tokens: tokens,
                distractors: [], // To be filled if needed
                difficulty_level: difficulty,
                srs_data: {
                    next_review: new Date().toISOString(),
                    interval: 0,
                    ease_factor: 2.5,
                    streak: 0,
                    review_count: 0,
                },
                item_metadata: {
                    type: "dagger", // Default, could be random based on difficulty
                    rarity: "common",
                    quality_score: 0,
                },
                category: word.category,
            };

            potentialCards.push(card);

            // Limit processing if we have enough candidates (optimization)
            if (potentialCards.length >= count * 5) break;
        }
        if (potentialCards.length >= count * 5) break;
    }

    // Shuffle candidates and pick requested count
    return potentialCards.sort(() => Math.random() - 0.5).slice(0, count);
}

/**
 * Tokenize sentence into game tokens
 */
function tokenizeSentence(sentence: string, targetWord: string): Token[] {
    let tokens: Token[] = [];
    let currentSentence = sentence;
    let idCounter = 1;

    // Simple tokenization:
    // 1. Identify target word occurences
    // 2. Split everything else by character (for Chinese)
    // Note: This is a simplified approach. Ideally we'd use a segmenter.

    // Placeholder for parts
    const placeholder = "___TARGET___";
    const tempSentence = currentSentence.split(targetWord).join(placeholder);

    // Split by placeholder
    // "我是学生。" (target: 学生) -> "我是___TARGET___。"
    // parts: ["我是", "。", ""] or similar?
    // Actually let's just iterate.

    let remaining = sentence;
    let position = 0;

    while (remaining.length > 0) {
        if (remaining.startsWith(targetWord)) {
            tokens.push({
                id: `t_${idCounter++}`,
                text: targetWord,
                type: "noun", // Simplified assumption, or could use 'other'
                position: position
            });
            remaining = remaining.substring(targetWord.length);
            position++;
        } else {
            // Take one char
            const char = remaining[0];
            tokens.push({
                id: `t_${idCounter++}`,
                text: char,
                type: getTokenType(char),
                position: position
            });
            remaining = remaining.substring(1);
            position++;
        }
    }

    return tokens;
}

function getTokenType(char: string): TokenType {
    if (/[。！？，、\.\?!,\s]/.test(char)) return "punctuation";
    return "other";
}
