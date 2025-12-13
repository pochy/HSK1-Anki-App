/**
 * 単語アイテムの型定義
 * HSK学習アプリで使用される単語データの構造を定義
 */
export type WordItem = {
  id: number;
  char: string;
  pinyin: string;
  meaning: string;
  category: string;
  examples?: Array<{ chinese: string; japanese: string }>;
  example?: string;
  exampleMeaning?: string;
};

