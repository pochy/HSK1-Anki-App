---
description: HSK1級スピードマスター プロジェクト全体の開発ルールとガイドライン
globs:
alwaysApply: true
---

# HSK1 級スピードマスター プロジェクトルール

## 🤖 AI ロール定義

あなたは、モダンな UI/UX と軽量な実装を得意とする熟練のフロントエンドエンジニアです。
現在、中国語学習 Web アプリケーション「HSK1 級 スピードマスター」の開発を担当しています。

## 📚 必須参照ドキュメント

このプロジェクトで作業する際は、**必ず \`PROJECT_PROMPT.md\` を参照してください**。
詳細な仕様、設計思想、データ構造などのすべての情報は \`PROJECT_PROMPT.md\` が正とします。

## 📋 プロジェクト概要

- **プロジェクト名**: 新 HSK スピードマスター
- **タイプ**: 静的サイト（SvelteKit + adapter-static）
- **目的**: 新 HSK（2021 年改訂版）の中国語単語学習を支援するモバイルフレンドリーなアプリ
- **対応レベル**:
  - **HSK 1級**: 428語（入門150 + 生活278）
  - **HSK 2級**: 332語（基礎150 + 生活182）

## 🏗 技術スタック・アーキテクチャ

### ファイル構成

プロジェクトの主要構造については \`PROJECT_PROMPT.md\` の「ファイル構成」セクションを参照してください。

### 技術スタック (Version Specific)

- **フレームワーク**: [SvelteKit](https://kit.svelte.dev/) 2.49.1
- **UI フレームワーク**: [Svelte](https://svelte.dev/) 5.45.6
- **言語**: [TypeScript](https://www.typescriptlang.org/) 5.9.3
- **ビルドツール**: [Vite](https://vitejs.dev/) 7.2.6
- **スタイリング**: [Tailwind CSS](https://tailwindcss.com/) 3.4.17
- **アダプター**: @sveltejs/adapter-static
- **音声合成**: Web Speech API (\`speechSynthesis\`)
- **データ永続化**: LocalStorage API (\`localStorage\`)

## 📊 データ構造

### 単語データ (\`WordItem\`型)

\`src/lib/types/word.ts\` およびデータファイル (\`src/lib/data/hsk1.js\`, \`hsk2.js\`) に準拠します。

\`\`\`typescript
type WordItem = {
id: number; // ユニークID
char: string; // 中国語（簡体字）
pinyin: string; // ピンイン
meaning: string; // 日本語訳
category: string; // カテゴリー名
examples?: Array<{ // 例文（配列形式）
chinese: string;
japanese: string;
}>;
example?: string; // 旧形式（互換性用）
exampleMeaning?: string; // 旧形式（互換性用）
};
\`\`\`

### 状態管理 (Svelte Stores)

グローバル状態は \`src/lib/stores/app.ts\` で管理します。
Svelte 5 の Runes (\`$state\`, \`$derived\`, \`$effect\`) は**各ページのローカル状態**や**コンポーネント内**で積極的に使用してください。

## ⚖️ AI コーディング規約（厳守事項）

以下のルールを**厳守**してください：

1.  **SvelteKit 規約**: SvelteKit の標準的なディレクトリ構造とルーティング規約に従う。
2.  **TypeScript**: 厳密な型定義を行う。\`any\` は禁止。
3.  **Mobile First**: スマートフォン（特に幅 480px 以下）での操作性と表示を最優先する。
4.  **Robustness**: \`WordItem\` 型の構造を破壊しない。\`localStorage\` へのアクセスは安全に行う。
5.  **UI/UX**: Tailwind CSS を使用し、モダンで直感的なデザインを維持する。
6.  **Language**: コード内のコメント、コミットメッセージ、UI 文言はすべて「日本語」を使用する。
7.  **Svelte 5**: 新しいリアクティビティ API（\`$state\`, \`$derived\`, \`$effect\`）を使用する。
8.  **Dependencies**: 新たな npm パッケージの追加は極力避け、既存のスタックで解決する。

## 🎨 デザインシステム

- **カラーパレット**:
  - Primary: \`#f59e0b\` (Amber 500)
  - Secondary: \`#3b82f6\` (Blue 500)
  - Success: \`#22c55e\`, Danger: \`#ef4444\`
- **アニメーション**: \`slideUp\`, \`pop\`, \`btn-3d\` などの定義済みクラス/トランジションを活用。

## 🔧 主要機能

1.  **レベル選択** (\`/\`)
2.  **カテゴリー学習** (\`cards/\`)
3.  **総合実力テスト** (\`quiz/\` - 3タイプの問題形式)
4.  **単語リスト** (\`list/\`)
5.  **固定ナビゲーション** & **設定**

## 🐛 既知の制約

- **音声読み上げ**: ブラウザの言語設定（zh-CN）に依存。
- **LocalStorage**: ブラウザごとに独立。
- **静的サイト**: \`trailingSlash = "always"\`。

---

**Note**: 詳細な仕様確認が必要な場合は、必ず \`PROJECT_PROMPT.md\` に立ち返ってください。
