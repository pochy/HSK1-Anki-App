# プロジェクト理解用プロンプト

## 🤖 AI ロール定義

あなたは、モダンな UI/UX と軽量な実装を得意とする熟練のフロントエンドエンジニアです。
現在、中国語学習 Web アプリケーション「HSK1 級 スピードマスター」の開発を担当しています。

このプロンプトは、AI アシスタントが「新 HSK1 級 スピードマスター」プロジェクトを理解し、適切な支援を提供するための包括的な情報です。

## 📋 プロジェクト概要

**プロジェクト名**: 新 HSK スピードマスター  
**タイプ**: 静的サイト（SvelteKit + adapter-static）  
**目的**: 新 HSK（2021 年改訂版）の中国語単語学習を支援するモバイルフレンドリーなアプリ  
**対応レベル**: HSK 1級（428語）と HSK 2級（332語）
  - **HSK 1級**: 入門語彙 150語 + 頻出・生活語句 278語 = 428語
  - **HSK 2級**: 基礎語彙 150語 + 頻出・生活語句 182語 = 332語

## 🏗 アーキテクチャ

### ファイル構成

```
HSK1-Anki-App/
├── src/
│   ├── lib/
│   │   ├── components/      # Svelte コンポーネント
│   │   │   ├── Header.svelte
│   │   │   ├── BottomNav.svelte
│   │   │   └── SettingsModal.svelte
│   │   ├── data/            # 単語データ
│   │   │   ├── hsk1.js      # HSK 1級データ（428語）
│   │   │   └── hsk2.js      # HSK 2級データ（332語）
│   │   ├── stores/          # Svelte ストア（状態管理）
│   │   │   └── app.ts
│   │   ├── types/           # TypeScript 型定義
│   │   │   └── word.ts
│   │   └── utils/           # ユーティリティ関数
│   ├── routes/              # ページルート
│   │   ├── +page.svelte     # ホーム（レベル選択）
│   │   ├── +layout.svelte   # レイアウト
│   │   ├── cards/           # カテゴリー学習
│   │   │   └── +page.svelte
│   │   ├── quiz/            # クイズ
│   │   │   └── +page.svelte
│   │   └── list/            # 単語リスト
│   │       └── +page.svelte
│   └── app.css              # グローバルスタイル
├── build/                   # ビルド出力（生成）
├── static/                  # 静的ファイル
├── package.json
├── svelte.config.ts
├── vite.config.ts
├── tailwind.config.js
└── README.md
```

### 技術スタック

- **フレームワーク**: [SvelteKit](https://kit.svelte.dev/) 2.49.1
- **UI フレームワーク**: [Svelte](https://svelte.dev/) 5.45.6
- **言語**: [TypeScript](https://www.typescriptlang.org/) 5.9.3
- **ビルドツール**: [Vite](https://vitejs.dev/) 7.2.6
- **スタイリング**: [Tailwind CSS](https://tailwindcss.com/) 3.4.17
- **アダプター**: @sveltejs/adapter-static（静的サイト生成）
- **音声合成**: Web Speech API（`speechSynthesis`）
- **データ永続化**: LocalStorage API（`localStorage`）

### 設計パターン

- **コンポーネントベース**: Svelte コンポーネントで UI を構築
- **状態管理**: Svelte ストア（`src/lib/stores/app.ts`）でアプリケーション状態を管理
- **リアクティビティ**: Svelte 5 の `$state`, `$derived`, `$effect` を使用
- **ルーティング**: SvelteKit のファイルベースルーティング
- **型安全性**: TypeScript で型定義を提供

## 📊 データ構造

### 単語データ（`WordItem`型）

データファイル: `src/lib/data/hsk1.js`, `src/lib/data/hsk2.js`  
型定義: `src/lib/types/word.ts`

各単語オブジェクトの構造：

```typescript
type WordItem = {
  id: number;              // ユニークID（101-1405など）
  char: string;            // 中国語（簡体字）
  pinyin: string;          // ピンイン（声調記号付き）
  meaning: string;        // 日本語訳
  category: string;        // カテゴリー名
  examples?: Array<{       // 例文（配列形式、推奨）
    chinese: string;
    japanese: string;
  }>;
  example?: string;        // 例文（中国語、旧形式・互換性のため）
  exampleMeaning?: string; // 例文の日本語訳（旧形式・互換性のため）
};
```

### カテゴリー分類

各レベルの単語は、品詞やテーマごとにカテゴリーに分類されています。カテゴリーはデータファイル（`src/lib/data/hsk1.js`, `hsk2.js`）内の各単語の `category` プロパティで定義されており、アプリケーション内で動的にグループ化されます。

主なカテゴリー例：
- **代名詞** - 我、你、他、她 など
- **数詞・量詞** - 一〜十、个、岁 など
- **名詞** - 家族・場所・職業・時間・物 など
- **動詞** - 基本動作・感情表現 など
- **形容詞** - 大小・寒暖・感情 など
- **副詞・その他** - 否定・程度・助詞 など
- **生活語句** - 時間・数・人・物・場所・食べ物・自然・動・形 など
- **定型表現** - 挨拶・慣用句 など

各レベルのカテゴリー構成は異なります。詳細は各データファイルを参照してください。

### アプリケーション状態（Svelteストア）

ストアファイル: `src/lib/stores/app.ts`

```typescript
// 主要なストア
masteredIds: Writable<number[]>;        // 習得済み単語IDの配列（全レベル共通）
currentLevel: Writable<number>;         // 現在選択中のHSKレベル（1, 2）
headerTitle: Writable<string>;           // ヘッダータイトル
showBottomNav: Writable<boolean>;        // ボトムナビゲーション表示フラグ
currentCategory: Writable<string>;       // 現在選択中のカテゴリー
muted: Writable<boolean>;               // 音声読み上げミュート状態
totalWords: Writable<number>;            // 総単語数
learnedWords: Writable<number>;          // 習得済み単語数
searchQuery: Writable<string>;          // 検索クエリ（単語リスト用）
showSettings: Writable<boolean>;         // 設定モーダル表示フラグ
customBackHandler: Writable<(() => void) | null>; // カスタム戻るハンドラ
```

各ページでは、Svelte 5 の `$state` を使用してローカル状態を管理：
- `currentIndex`: 現在の学習/クイズインデックス
- `score`: クイズスコア（0-100）
- `learningQueue`: 学習キュー（単語オブジェクトの配列）
- `quizQueue`: クイズキュー（問題オブジェクトの配列）
- `quizAnswered`: クイズ回答済みフラグ

### LocalStorage キー

- `hsk1_mastered_ids`: 習得済み単語 ID の配列（JSON 文字列、全レベル共通）
- `hsk1_muted`: 音声読み上げミュート状態（`"true"` / `"false"`）

## 🎯 主要機能

### 1. レベル選択画面（`/` - `src/routes/+page.svelte`）

- HSK 1級と2級の選択画面
- 各レベルの進捗率表示（習得済み/総数）
- レベル選択後、`/cards/` に遷移

### 2. カテゴリー学習（`/cards/` - `src/routes/cards/+page.svelte`）

- 選択したレベルのカテゴリー別学習一覧表示
- 各カテゴリーの進捗率表示（習得済み/総数）
- カテゴリー選択後、フラッシュカード形式で学習
- 未習得単語を優先表示
- 各単語に「覚えた」「まだ」ボタン
- 音声読み上げ機能（自動 + 手動）
- リストビューとカードビューの切り替え

### 3. 総合実力テスト（`/quiz/` - `src/routes/quiz/+page.svelte`）

- 選択したレベルの全単語からランダムに 10 問を出題
- 問題タイプ（ランダム選択）:
  - **タイプ 1**: 音声 → 意味を選択
  - **タイプ 2**: 漢字 + ピンイン → 意味を選択
  - **タイプ 3**: 日本語意味 → 中国語を選択
- 各問題 4 択（正解 1 つ + 誤答 3 つ）
- スコア表示（10 点/問、満点 100 点）

### 4. 単語リスト（`/list/` - `src/routes/list/+page.svelte`）

- 選択したレベルの全単語をカテゴリー別にグループ化して一覧表示
- 各単語に習得状況のアイコンを表示
- 各単語に音声読み上げボタンを追加
- カテゴリーごとの習得進捗を表示
- 検索機能（中国語・ピンイン・日本語で検索可能）

### 5. 進捗管理

- 習得済み単語の記録（LocalStorage、全レベル共通）
- ヘッダーに習得率表示（パーセンテージ + 円形プログレスバー）
- カテゴリー別進捗率表示

### 6. 音声読み上げ

- Web Speech API を使用
- 中国語（zh-CN）で読み上げ
- 読み上げ速度: 0.8 倍速
- 自動読み上げ（カード表示時）と手動読み上げ（ボタンクリック）
- ミュート機能（設定で保存）

### 7. 設定機能（`src/lib/components/SettingsModal.svelte`）

- 学習データのリセット（確認ダイアログ付き）

### 8. 固定ボトムナビゲーション（`src/lib/components/BottomNav.svelte`）

- ページ下部に常に表示される固定ナビゲーション
- 3つのタブ:
  - **Cards**: `/cards/` に遷移（カテゴリー別学習）
  - **Quiz**: `/quiz/` に遷移（クイズ開始）
  - **List**: `/list/` に遷移（単語リスト表示）
- アクティブなタブはオレンジ色でハイライト表示

## 🎨 UI/UX 特徴

### デザインシステム

- **カラーパレット**:
  - Primary: `#f59e0b` (Amber 500)
  - Primary Dark: `#d97706`
  - Secondary: `#3b82f6` (Blue 500)
  - Success: `#22c55e`
  - Danger: `#ef4444`
- **レイアウト**: モバイルファースト（最大幅 480px）
- **アニメーション**:
  - `slideUp`: フェードイン + 上方向スライド
  - `pop`: スケール + フェードイン
  - `btn-3d`: ボタン押下時の 3D 効果

### コンポーネント

- **ヘッダー**: タイトル、戻るボタン、統計表示、設定ボタン
- **メインコンテンツエリア**: 動的にコンテンツを差し替え
- **ボトムナビゲーション**: コンテキストに応じたボタン表示（学習カードの「まだ」「覚えた」ボタンなど）
- **固定ボトムナビゲーション**: 常に表示される3つのタブ（Cards、Quiz、List）
- **モーダル/オーバーレイ**: 設定画面用

### レスポンシブ対応

- タッチ操作最適化（`touch-action: manipulation`）
- タップハイライト無効化
- モバイルビューポート設定

## 🔧 主要実装パターン

### 状態管理

- **Svelte ストア**: `src/lib/stores/app.ts` でグローバル状態を管理
- **ローカル状態**: 各ページで Svelte 5 の `$state` を使用
- **リアクティビティ**: `$derived` で計算プロパティを定義
- **副作用**: `$effect` で副作用を処理

### ナビゲーション

- **SvelteKit ルーティング**: ファイルベースルーティング（`src/routes/`）
- **`goto()`**: `$app/navigation` からインポートしてページ遷移
- **カスタム戻るハンドラ**: `customBackHandler` ストアで各ページの戻る動作をカスタマイズ

### データ取得

- **データインポート**: `src/lib/data/hsk1.js` と `hsk2.js` から直接インポート
- **レベル選択**: `currentLevel` ストアで現在のレベルを管理
- **フィルタリング**: 各ページで `$derived` を使用してデータをフィルタリング

### 音声読み上げ

- **Web Speech API**: 各ページで `speechSynthesis` を使用
- **ミュート状態**: `muted` ストアで管理（LocalStorage に保存）

### 進捗管理

- **習得済みID**: `masteredIds` ストアで管理（LocalStorage に自動保存）
- **進捗計算**: `$derived` で習得率を計算

## 🐛 既知の制約・注意事項

1. **音声読み上げ**: ブラウザの言語パック設定に依存。中国語（zh-CN）の音声パックがインストールされていない場合、読み上げが正常に動作しない可能性がある。Web Speech API は HTTPS（または `localhost`）上でのみ安定動作する。

2. **LocalStorage**:
   - ブラウザのプライベートモードでは制限される場合がある
   - データはブラウザごとに独立
   - クリアすると学習進捗が失われる
   - 全レベルの習得済みIDを共有（`hsk1_mastered_ids`）

3. **モバイル対応**:
   - iOS Safari での動作確認推奨
   - Android Chrome での動作確認推奨

4. **静的サイト**:
   - `adapter-static` を使用。全ページが `prerender: true` で事前レンダリングされる
   - `trailingSlash = "always"` を有効化。URL は `/cards/`, `/quiz/`, `/list/` 形式

5. **データ構造**:
   - 単語データは `src/lib/data/hsk1.js` と `hsk2.js` に定義
   - 外部 JSON ファイルからの読み込みは未実装（必要に応じて実装可能）

## 🔄 開発時の注意点

### コード編集時の推奨事項

1. **単語データの追加・編集**:
   - `src/lib/data/hsk1.js` または `hsk2.js` に新しいオブジェクトを追加
   - `id`は既存のものと重複しないように注意
   - カテゴリー名は既存のものと完全一致させる
   - `examples` 配列形式を推奨（旧形式の `example` と `exampleMeaning` も互換性のため残す）

2. **スタイルの変更**:
   - Tailwind CSS クラスを直接使用
   - カスタム CSS は各コンポーネントの `<style>` タグ内に記述
   - グローバルスタイルは `src/app.css` に記述

3. **機能追加**:
   - 新しいページは `src/routes/` 配下に追加
   - 共通コンポーネントは `src/lib/components/` に追加
   - 状態管理は `src/lib/stores/app.ts` にストアを追加
   - ユーティリティ関数は `src/lib/utils/` に追加

4. **デバッグ**:
   - ブラウザの開発者ツールでストアの値を確認可能
   - `localStorage.getItem('hsk1_mastered_ids')` で進捗データを確認可能
   - Svelte DevTools を使用してリアクティビティを確認可能

## ⚖️ AI コーディング規約（厳守事項）

コードを提案・修正する際は以下のルールを厳守してください：

1. **SvelteKit 規約**: SvelteKit のルーティング、ストア、コンポーネント規約に従う。
2. **TypeScript**: 型安全性を保つ。`any` の使用は避け、適切な型定義を使用する。
3. **Mobile First**: スマホでの操作性（タップ領域、レイアウト）を最優先する。
4. **Robustness**: `WordItem` 型の構造を破壊しない。`localStorage` エラーのハンドリングを考慮する。
5. **UI/UX**: Tailwind CSS を活用し、モダンで直感的な（アプリライクな）デザインを維持する。
6. **Language**: コード内のコメントと UI 文言は「日本語」を使用する。
7. **Svelte 5**: Svelte 5 の `$state`, `$derived`, `$effect` などの新しいリアクティビティ API を使用する。
8. **依存関係**: 新たな npm パッケージを追加する場合は、必要性を十分に検討し、軽量性を優先する。

## 📝 コード規約・スタイル

- **インデント**: 2 スペース
- **命名規則**:
  - 関数/メソッド/変数: camelCase
  - コンポーネント: PascalCase（例: `Header.svelte`）
  - 型/インターフェース: PascalCase（例: `WordItem`）
  - ファイル名: kebab-case（例: `app.ts`, `word.ts`）
  - CSS クラス: Tailwind CSS 準拠
- **コメント**: 日本語で記述
- **文字エンコーディング**: UTF-8
- **Svelte コンポーネント**: `<script lang="ts">` を使用し、TypeScript で記述
- **リアクティビティ**: Svelte 5 の `$state`, `$derived`, `$effect` を使用

## 🎯 今後の拡張可能性

1. **データ管理**: 外部 JSON ファイルからの読み込み、HSK 3級以降の追加
2. **ユーザー認証**: 複数ユーザー対応
3. **クラウド同期**: 進捗データのクラウド保存
4. **統計機能**: 学習時間、正答率などの詳細統計
5. **復習アルゴリズム**: 間隔反復学習（FSRS など、既に `src/lib/utils/fsrs.ts` が存在）
6. **オフライン対応**: Service Worker による PWA 化
7. **多言語対応**: 英語、中国語（繁体字）など
8. **ゲームモード**: 既に `src/routes/game/` が存在（Sentence Smith など）

## 📍 現在のコンテキスト

現在のフェーズは、SvelteKit への移行が完了し、HSK 1級と2級の両方をサポートする基盤が整備されています。UI のブラッシュアップや追加機能（ゲームモードなど）の実装が進行中です。

---

**このプロンプトを使用する際の注意**:

- プロジェクトの構造や機能を理解する際の参考資料として使用
- コード変更や機能追加の際は、このプロンプトの情報を基に判断
- 不明点がある場合は、実際のコード（`src/` 配下）を確認すること
- README.md も参照して、最新の実装状況を確認すること
