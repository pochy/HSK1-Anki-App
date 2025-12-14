# 新 HSK スピードマスター 🇨🇳

[![HSK Level](https://img.shields.io/badge/HSK-Level%201%20%7C%202-orange)](https://en.wikipedia.org/wiki/Hanyu_Shuiping_Kaoshi)
[![Words](https://img.shields.io/badge/単語数-760語-blue)](./src/lib/data)
[![License](https://img.shields.io/badge/license-MIT-green)](./LICENSE)
[![Svelte](https://img.shields.io/badge/Svelte-5.45.6-orange)](https://svelte.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-blue)](https://www.typescriptlang.org/)

新 HSK（2021 年改訂版）に対応した、モバイルフレンドリーな中国語単語学習 Web アプリケーションです。

## ✨ 特徴

- **📚 多レベル対応** - HSK 1級（428語）と HSK 2級（332語）を収録
- **🎯 カテゴリー別学習** - 品詞・テーマごとに効率的に学習
- **🎮 クイズモード** - ランダム 10 問の総合実力テスト（3種類の問題形式）
- **🔨 言葉の鍛冶屋** - 正しい語順で文章を組み立てるパズルゲーム（コンボ・TTS機能付き）
- **📋 単語リスト** - カテゴリー別に全単語を一覧表示・検索機能付き
- **🔊 音声読み上げ** - Web Speech API による中国語音声合成
- **💾 進捗保存** - ローカルストレージで学習記録を自動保存（現状はレベルを跨いで習得済み状態を共有）
- **📱 モバイル対応** - スマートフォンでも快適に学習可能なレスポンシブデザイン
- **🧭 固定ナビゲーション** - ページ下部のタブで主要機能に素早くアクセス
- **⚡ モダンな技術スタック** - SvelteKit + TypeScript による高速で型安全な実装

## 🚀 セットアップ

### 必要な環境

- Node.js 18 以上
- npm（`package-lock.json` を同梱しています）

### インストール

```bash
# リポジトリをクローン
git clone https://github.com/pochy/HSK1-Anki-App.git

# フォルダに移動
cd HSK1-Anki-App

# 依存関係をインストール
npm install
```

### 開発サーバーの起動

```bash
# 開発サーバーを起動（http://localhost:5173）
npm run dev
```

ブラウザで `http://localhost:5173` にアクセスしてください。

### ビルド

```bash
# 本番用ビルド
npm run build

# ビルド結果をプレビュー
npm run preview
```

ビルド結果は `build/` ディレクトリに出力されます（`adapter-static` / 全ページ `prerender`）。静的サイトとして配信可能です。

> 注意: 本プロジェクトは `trailingSlash = "always"` を有効にしています。静的ホスティング側はディレクトリ形式の URL（例: `/cards/`）で `index.html` が解決される必要があります。Vercel、Netlify、GitHub Pages などの主要なホスティングサービスでは自動的に対応されます。

## 🚢 デプロイ

### Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/pochy/HSK1-Anki-App)

1. Vercel にログイン
2. リポジトリを接続
3. ビルド設定は自動検出されます（`npm run build`）
4. デプロイ完了後、自動的に HTTPS 対応の URL が発行されます

### Netlify

1. Netlify にログイン
2. "Add new site" → "Import an existing project"
3. ビルド設定:
   - **Build command**: `npm run build`
   - **Publish directory**: `build`
4. デプロイ

### GitHub Pages

```bash
# ビルド
npm run build

# build/ ディレクトリを gh-pages ブランチにプッシュ
# （または GitHub Actions を使用して自動デプロイ）
```

## 📖 収録データ

### HSK 1級（428語）

- **入門語彙**: 150語（HSK 1級指定語句）
- **生活語句**: 278語（頻出・生活語句）
- **合計**: 428語

### HSK 2級（332語）

- **基礎語彙**: 150語（HSK 2級指定語句）
- **生活語句**: 182語（頻出・生活語句）
- **合計**: 332語

### カテゴリー分類

各レベルは以下のようなカテゴリーに分類されています：

- **代名詞** - 我、你、他、她 など
- **数詞・量詞** - 一〜十、个、岁 など
- **名詞** - 家族・場所・職業・時間・物 など
- **動詞** - 基本動作・感情表現 など
- **形容詞** - 大小・寒暖・感情 など
- **副詞・その他** - 否定・程度・助詞 など
- **生活語句** - 時間・数・人・物・場所・食べ物・自然 など
- **定型表現** - 挨拶・慣用句 など

## 🎓 学習モード

### 1. レベル選択

アプリ起動時に、HSK 1級または 2級を選択できます。各レベルの進捗状況が表示されます。

### 2. カテゴリー学習

各カテゴリーをタップして、フラッシュカード形式で単語を学習します。

- **タップで意味を表示** - カードをタップすると日本語訳と例文が表示されます
- **習得済みマーク** - 右上のチェックボタンで習得済みとしてマーク
- **音声読み上げ** - 自動または手動で中国語の発音を聞けます
- **前後ナビゲーション** - 左右の矢印ボタンで前後の単語に移動

### 3. 苦手復習

未習得の単語からランダムに 10 語を選んで集中学習します。

### 4. 言葉の鍛冶屋 (Sentence Smith)

バラバラになった単語を正しい順序で並べ替え、文章を完成させるパズルゲームです。

- **タイムアタック**: 素早く正確に並べることで高評価を獲得
- **コンボシステム**: 連続正解で「炉」の炎が激しくなり、ボーナス演出が発生
- **聴覚フィードバック**: 完成した文章を中国語音声で読み上げ
- **武器作成**: 学習成果に応じて様々なランクの武器（アイテム）が鍛造されます

### 5. 総合実力テスト

選択したレベルの全単語からランダムに 10 問出題されるクイズモードです。

**問題形式**:

- **タイプ 1**: 音声 → 意味を選択
- **タイプ 2**: 漢字 + ピンイン → 意味を選択
- **タイプ 3**: 日本語意味 → 中国語を選択

各問題は 4 択形式で、正解・不正解が即座に表示されます。10 問終了後にスコアが表示されます。

### 6. 単語リスト

カテゴリー別に全単語を一覧表示します。

- カテゴリーごとにグループ化
- 各単語の習得状況を表示（✓ マーク）
- 音声読み上げボタン付き
- 検索機能（中国語・ピンイン・日本語で検索可能）
- カテゴリーごとの進捗率表示

## 🧭 ナビゲーション

ページ下部の固定ナビゲーションから、主要機能に素早くアクセスできます：

- **Cards**: ホーム画面（カテゴリー別学習）に移動
- **Quiz**: クイズを開始
- **List**: 単語リストを表示

## 🛠 技術スタック

- **[SvelteKit](https://kit.svelte.dev/)** 2.49.1 - フルスタックフレームワーク
- **[Svelte](https://svelte.dev/)** 5.45.6 - コンパイル時フレームワーク
- **[TypeScript](https://www.typescriptlang.org/)** 5.9.3 - 型安全性
- **[Tailwind CSS](https://tailwindcss.com/)** 3.4.17 - ユーティリティファースト CSS
- **[Vite](https://vitejs.dev/)** 7.2.6 - 高速ビルドツール
- **Web Speech API** - 中国語音声合成
- **LocalStorage API** - 進捗データ永続化

## 📁 プロジェクト構成

```text
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
│   │   └── types/           # TypeScript 型定義
│   │       └── word.ts
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

## 🔧 カスタマイズ

### 単語データの編集

`src/lib/data/hsk1.js` または `src/lib/data/hsk2.js` を編集することで、単語の追加・変更が可能です：

```javascript
export const hsk1 = [
  {
    id: 101, // ユニークID
    char: "我", // 中国語（簡体字）
    pinyin: "wǒ", // ピンイン
    meaning: "私", // 日本語訳
    category: "代名詞", // カテゴリー
    examples: [
      // 例文（配列形式）
      {
        chinese: "我是学生。",
        japanese: "私は学生です。",
      },
      // ...
    ],
  },
  // ...
];
```

### スタイルのカスタマイズ

Tailwind CSS を使用しているため、`tailwind.config.js` でカスタマイズできます。また、`src/app.css` でグローバルスタイルを定義できます。

### 新しいレベルの追加

1. `src/lib/data/hsk3.js` などのデータファイルを作成
2. `src/routes/+page.svelte` の `levels` 配列に新しいレベルを追加
3. 必要に応じてルーティングを調整

## 📱 ブラウザ対応

| ブラウザ | 対応状況 |
| -------- | -------- |
| Chrome   | ✅ 推奨  |
| Safari   | ✅ 対応  |
| Firefox  | ✅ 対応  |
| Edge     | ✅ 対応  |

※ 音声読み上げ機能は、ブラウザの言語パック設定に依存します。中国語（zh-CN）の音声パックがインストールされている必要があります。
また、Web Speech API はブラウザによっては HTTPS（または `localhost`）上でのみ安定動作します。

### 音声読み上げについて

- **Chrome（推奨）**: 最も安定しています。初回使用時に中国語音声のダウンロードが自動で行われる場合があります
- **Safari**: iOS/macOS で利用可能。システムの言語設定で中国語が有効になっている必要があります
- **Firefox/Edge**: 対応していますが、音声品質や対応状況はシステム環境に依存します

## 🧪 開発

### コードチェック

```bash
# TypeScript と Svelte の型チェック
npm run check

# 型チェック（ウォッチモード）
npm run check:watch
```

### コードフォーマット

```bash
# フォーマット
npm run format

# フォーマットチェック
npm run format:check
```

## 📄 ライセンス

MIT License

## 🗂 旧実装（legacy）

`legacy/` 配下に、初期版（単一 `index.html` の Vanilla JS 実装）を残しています。現在のアプリ本体は SvelteKit 版（`src/`）です。

## 🙏 クレジット

- フォント: [Noto Sans SC](https://fonts.google.com/noto/specimen/Noto+Sans+SC) / [Noto Serif SC](https://fonts.google.com/noto/specimen/Noto+Serif+SC)
- アイコン: [Font Awesome](https://fontawesome.com/)
- CSS Framework: [Tailwind CSS](https://tailwindcss.com/)
- フレームワーク: [SvelteKit](https://kit.svelte.dev/)

---

**加油！** 🔥 HSK 合格を目指して頑張りましょう！
