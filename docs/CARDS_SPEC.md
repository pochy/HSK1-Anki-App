# 単語カード機能 仕様書

## 1. 概要と目的

本ドキュメントは、HSK1級・2級の中国語単語を学習するための「単語カード機能」の詳細仕様を定義するものです。

**機能の目的:** フラッシュカード形式で単語を学習し、カテゴリー別に体系的に学習を進めることで、効率的な語彙習得を支援します。習得済み単語の管理と進捗の可視化により、学習者のモチベーション維持と継続的な学習を促進します。

---

## 2. 機能概要

### 2.1 主要機能

1. **カテゴリー別学習**: 単語をカテゴリー（名詞、動詞、形容詞など）ごとに分類し、体系的に学習
2. **苦手復習モード**: 苦手フラグを付けた単語をランダムに10語選択して復習
3. **フラッシュカード表示**: カードをタップして意味を表示するインタラクティブな学習方式
4. **習得済み管理**: 各単語を「習得済み」としてマークし、進捗を記録
5. **音声読み上げ**: Web Speech APIを使用した中国語の発音読み上げ
6. **例文表示**: 各単語に関連する例文を最大3つまで表示
7. **進捗可視化**: カテゴリーごとの学習進捗をパーセンテージとプログレスバーで表示
8. **ビューモード切り替え**: リストビュー（カテゴリー選択）とカードビュー（学習）の切り替え

### 2.2 対応レベル

- **HSK 1級**: 428語（入門語彙150語 + 頻出・生活語句278語）
- **HSK 2級**: 332語（基礎語彙150語 + 頻出・生活語句182語）

---

## 3. データ構造

### 3.1 単語データ（WordItem型）

```typescript
type WordItem = {
  id: number;                    // ユニークID（101-1405など）
  char: string;                   // 中国語（簡体字）
  pinyin: string;                 // ピンイン（声調記号付き）
  meaning: string;                // 日本語訳
  category: string;               // カテゴリー名
  examples?: Array<{              // 例文（配列形式、推奨）
    chinese: string;
    japanese: string;
  }>;
  example?: string;               // 例文（中国語、旧形式・互換性のため）
  exampleMeaning?: string;        // 例文の日本語訳（旧形式・互換性のため）
};
```

### 3.2 アプリケーション状態（Svelteストア）

```typescript
// src/lib/stores/app.ts から使用
currentLevel: Writable<number>;        // 現在選択中のHSKレベル（1, 2）
headerTitle: Writable<string>;         // ヘッダータイトル
showBottomNav: Writable<boolean>;     // ボトムナビゲーション表示フラグ
currentCategory: Writable<string>;    // 現在選択中のカテゴリー
masteredIds: Writable<number[]>;      // 習得済み単語IDの配列
totalWords: Writable<number>;         // 総単語数
learnedWords: Writable<number>;       // 習得済み単語数
muted: Writable<boolean>;             // 音声読み上げミュート状態
customBackHandler: Writable<(() => void) | null>; // カスタム戻るハンドラ
```

### 3.3 LocalStorage キー

- `hsk1_mastered_ids`: 習得済み単語IDの配列（JSON文字列、全レベル共通）
- `hsk1_muted`: 音声読み上げミュート状態（`"true"` / `"false"`）

---

## 4. UI/UX 設計

### 4.1 リストビュー（カテゴリー選択画面）

#### 4.1.1 レイアウト構造

```
┌─────────────────────────────────┐
│  Header (HSK X級)               │
├─────────────────────────────────┤
│  Banner (合格への道)             │
│  - 全X語完全対応                 │
│  - [苦手復習] ボタン             │
├─────────────────────────────────┤
│  カテゴリー別学習                │
│  ┌───────────────────────────┐ │
│  │ [アイコン] カテゴリー名    │ │
│  │            X単語          │ │
│  │            [進捗バー] X%   │ │
│  └───────────────────────────┘ │
│  ... (各カテゴリー)              │
├─────────────────────────────────┤
│  [総合実力テスト] ボタン         │
└─────────────────────────────────┘
│  BottomNav (Cards/Game/List)     │
└─────────────────────────────────┘
```

#### 4.1.2 バナーセクション

- **背景**: グラデーション（yellow-400 → orange-400）
- **タイトル**: "HSK{level}級 合格への道"
- **サブタイトル**: "全{totalWords}語完全対応"
- **苦手復習ボタン**: 白色背景、オレンジテキスト、角丸
- **装飾**: 右下にドラゴンアイコン（Font Awesome）を半透明で配置

#### 4.1.3 カテゴリーカード

各カテゴリーは以下の情報を表示：

- **アイコン**: カテゴリータイプに応じたFont Awesomeアイコン
  - 名詞: `fa-cube`
  - 動詞: `fa-running`
  - 形容詞: `fa-star`
  - 代名詞: `fa-user`
  - 数詞: `fa-calculator`
  - 食べ物: `fa-utensils`
  - 時間/カレンダー: `fa-clock`
  - 場所: `fa-map-marker-alt`
  - 自然: `fa-tree`
  - 定型/フレーズ: `fa-comments`
  - その他: `fa-book`
- **カテゴリー名**: 太字、グレー800
- **単語数**: 小さなテキスト、グレー400
- **進捗**: パーセンテージ表示とプログレスバー
  - 100%完了時: 緑色テキスト
  - 未完了時: グレーテキスト
  - プログレスバー: オレンジ色（primary）で表示

#### 4.1.4 総合実力テストボタン

- **スタイル**: インディゴ背景、白色テキスト、3Dボタン効果
- **リンク**: `/game/quiz/` に遷移
- **アイコン**: `fa-gamepad`

### 4.2 カードビュー（学習画面）

#### 4.2.1 レイアウト構造

```
┌─────────────────────────────────┐
│  Header (HSK X級)               │
├─────────────────────────────────┤
│                                 │
│      ┌─────────────────┐        │
│      │                 │        │
│      │   カード表示     │        │
│      │                 │        │
│      │  [習得済み]     │        │
│      └─────────────────┘        │
│                                 │
│  [←前]              [次→]       │
├─────────────────────────────────┤
│  BottomNav (Cards/Game/List)     │
└─────────────────────────────────┘
```

#### 4.2.2 カード表示

**初期状態（意味非表示）:**
- **HSKレベル表示**: 上部に小さなテキストで "HSK {level}"
- **中国語文字**: 大きなテキスト（text-6xl）、グレー800、太字
- **ヒントテキスト**: "Tap to reveal"（グレー400、パルスアニメーション）

**意味表示状態:**
- **ピンイン**: オレンジ色（primary）、セリフフォント、大きめのテキスト
- **音声ボタン**: ピンイン横に音量アイコンボタン（タップで発音）
- **区切り線**: 細いグレーの線
- **日本語訳**: 大きなテキスト、グレー700、太字
- **例文**: 最大3つまで表示
  - 背景: グレー50
  - 中国語例文: グレー800、中サイズ、左揃え
  - 各例文に音声ボタン付き
  - 日本語訳: 小さなテキスト、グレー500

#### 4.2.3 習得済み・苦手ボタン

- **習得済みボタン**: カード右上。未習得時はグレー背景・グレー300アイコン、習得済み時は緑背景・緑500アイコン、アイコンは`fa-check`
- **苦手ボタン**: カード左上。未指定時はグレー背景・グレー300アイコン、苦手指定時は赤背景・赤500アイコン、アイコンは`fa-flag`

#### 4.2.4 ナビゲーションコントロール

- **前のカードボタン**: 左側、白色背景、グレーアイコン
- **次のカードボタン**: 右側、オレンジ背景（primary）、白色アイコン
- **位置**: 画面下部、BottomNavの上（bottom-20）
- **サイズ**: 56px × 56px（w-14 h-14）
- **アニメーション**: アクティブ時にスケールダウン（active:scale-95）

#### 4.2.5 カードアニメーション

- **遷移アニメーション**: Svelteの`fly`トランジション
  - 次のカード: 右から左へ（x: 50 → 0）
  - 前のカード: 左から右へ（x: -50 → 0）
  - 持続時間: 300ms
- **意味表示アニメーション**: フェードイン（fadeIn）
  - 下から上へ（translateY: 10px → 0）
  - 持続時間: 300ms

---

## 5. 機能詳細

### 5.1 データロード

**関数**: `loadData()`

```typescript
function loadData() {
  rawData = $currentLevel === 1 ? hsk1 : hsk2;
  categories = [...new Set(rawData.map((i) => i.category))];
  $totalWords = rawData.length;
  updateLearnedCount();
}
```

**処理内容:**
1. 現在のレベルに応じて`hsk1`または`hsk2`データを読み込み
2. カテゴリーの一意なリストを生成
3. 総単語数をストアに設定
4. 習得済み単語数を更新

### 5.2 カテゴリー別学習開始

**関数**: `startCategorySession(category: string)`

```typescript
function startCategorySession(category: string) {
  $currentCategory = category;
  items = rawData.filter((i) => i.category === category);
  // 習得済みを後ろにソート
  items = items.sort((a, b) => {
    const aMastered = $masteredIds.includes(a.id);
    const bMastered = $masteredIds.includes(b.id);
    return Number(aMastered) - Number(bMastered);
  });
  currentIndex = 0;
  uniqueKey = 0;
  showingMeaning = false;
  viewMode = "card";
  updateBackHandler();
  autoSpeak();
}
```

**処理内容:**
1. 選択されたカテゴリーの単語をフィルタリング
2. 習得済み単語を後ろにソート（未習得を優先）
3. カードビューモードに切り替え
4. カスタム戻るハンドラを更新
5. 自動音声読み上げ（意味表示時のみ）

### 5.3 苦手復習モード

**関数**: `startReview()`

```typescript
function startReview() {
  const difficultItems = rawData.filter((i) =>
    $difficultIds.includes(i.id)
  );
  if (difficultItems.length === 0) {
    alert("苦手な単語がありません。カードで苦手マークを付けてください。");
    return;
  }
  // ランダムに10語選択
  items = shuffle([...difficultItems]).slice(0, 10);
  $currentCategory = "review";
  currentIndex = 0;
  uniqueKey = 0;
  showingMeaning = false;
  viewMode = "card";
  updateBackHandler();
  autoSpeak();
}
```

**処理内容:**
1. 苦手フラグが付いた単語をフィルタリング
2. 苦手が0件の場合はアラート表示して終了（追加登録を促す）
3. 苦手単語をシャッフルして最大10語選択
4. カードビューモードに切り替え

**シャッフルアルゴリズム**: Fisher-Yates シャッフル

```typescript
function shuffle<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}
```

### 5.4 カードナビゲーション

#### 5.4.1 次のカード

**関数**: `nextCard()`

```typescript
function nextCard() {
  direction = 1;
  showingMeaning = false;
  if (currentIndex < items.length - 1) {
    currentIndex++;
  } else {
    // セッション完了
    showSessionComplete();
    return;
  }
  uniqueKey++;
  autoSpeak();
}
```

**処理内容:**
1. 方向を「次」に設定（アニメーション用）
2. 意味表示をリセット
3. 最後のカードの場合はセッション完了処理
4. それ以外はインデックスをインクリメント
5. ユニークキーを更新（アニメーション再トリガー）
6. 自動音声読み上げ（意味表示時のみ）

#### 5.4.2 前のカード

**関数**: `prevCard()`

```typescript
function prevCard() {
  direction = -1;
  showingMeaning = false;
  if (currentIndex > 0) {
    currentIndex--;
  } else {
    currentIndex = items.length - 1; // ループ
  }
  uniqueKey++;
}
```

**処理内容:**
1. 方向を「前」に設定
2. 意味表示をリセット
3. 最初のカードの場合は最後のカードにループ
4. ユニークキーを更新

#### 5.4.3 セッション完了

**関数**: `showSessionComplete()`

```typescript
function showSessionComplete() {
  viewMode = "list";
  $currentCategory = "all";
  updateBackHandler();
  alert("セッション完了！着実に力がついていますね。");
}
```

**処理内容:**
1. リストビューに戻る
2. カテゴリーをリセット
3. 戻るハンドラを更新
4. 完了メッセージを表示

### 5.5 意味表示の切り替え

**関数**: `toggleMeaning()`

```typescript
function toggleMeaning() {
  showingMeaning = !showingMeaning;
  if (showingMeaning) autoSpeak();
}
```

**処理内容:**
1. 意味表示状態をトグル
2. 意味を表示する場合は自動音声読み上げ

### 5.6 習得済み管理

**関数**: `toggleMastered()`

```typescript
function toggleMastered() {
  if (!currentItem) return;

  masteredIds.update((ids) => {
    if (ids.includes(currentItem.id)) {
      return ids.filter((id) => id !== currentItem.id);
    } else {
      return [...ids, currentItem.id];
    }
  });
  updateLearnedCount();
}
```

**処理内容:**
1. 現在の単語IDが習得済みリストに含まれているか確認
2. 含まれている場合は削除、含まれていない場合は追加
3. LocalStorageに自動保存（ストアのsubscribeにより）
4. 習得済み単語数を更新

**LocalStorage保存処理**（`src/lib/stores/app.ts`）:

```typescript
if (browser) {
  masteredIds.subscribe((value) => {
    localStorage.setItem("hsk1_mastered_ids", JSON.stringify(value));
  });
  difficultIds.subscribe((value) => {
    localStorage.setItem("hsk1_difficult_ids", JSON.stringify(value));
  });
}
```

#### 苦手管理

**関数**: `toggleDifficult()`

```typescript
function toggleDifficult() {
  if (!currentItem) return;

  difficultIds.update((ids) => {
    if (ids.includes(currentItem.id)) {
      return ids.filter((id) => id !== currentItem.id);
    }
    return [...ids, currentItem.id];
  });
}
```

**処理内容:**
1. 現在の単語IDが苦手リストに含まれているか確認
2. 含まれている場合は削除、含まれていない場合は追加
3. LocalStorageキー`hsk1_difficult_ids`に自動保存（ストアのsubscribeにより）

### 5.7 音声読み上げ

#### 5.7.1 音声読み上げ関数

**関数**: `speak(text: string)`

```typescript
function speak(text: string) {
  if ($muted) return;
  const u = new SpeechSynthesisUtterance(text);
  u.lang = "zh-CN";
  u.rate = 0.8;
  speechSynthesis.speak(u);
}
```

**処理内容:**
1. ミュート状態の場合は処理をスキップ
2. `SpeechSynthesisUtterance`を作成
3. 言語を中国語（zh-CN）に設定
4. 読み上げ速度を0.8に設定（標準よりやや遅め）
5. 音声合成を実行

#### 5.7.2 自動音声読み上げ

**関数**: `autoSpeak()`

```typescript
function autoSpeak() {
  if (currentItem && !$muted) {
    if (showingMeaning) {
      speak(currentItem.char);
    }
  }
}
```

**処理内容:**
1. 現在の単語が存在し、ミュートでない場合のみ実行
2. 意味が表示されている場合のみ、中国語文字を読み上げ

**呼び出しタイミング:**
- カテゴリー学習開始時
- 苦手復習開始時
- 次のカードに移動時（意味表示時のみ）
- 意味を表示した時

### 5.8 例文取得

**関数**: `getExamples(item: WordItem)`

```typescript
function getExamples(item: WordItem) {
  if (item.examples && Array.isArray(item.examples)) {
    return item.examples.slice(0, 3);
  }
  if (item.example && item.exampleMeaning) {
    return [{ chinese: item.example, japanese: item.exampleMeaning }];
  }
  return [];
}
```

**処理内容:**
1. 新しい形式（`examples`配列）が存在する場合は最大3つまで返す
2. 旧形式（`example`と`exampleMeaning`）が存在する場合は1つ返す
3. どちらも存在しない場合は空配列を返す

**互換性**: 旧形式のデータもサポート

### 5.9 進捗管理

#### 5.9.1 習得済み単語数の更新

**関数**: `updateLearnedCount()`

```typescript
function updateLearnedCount() {
  $learnedWords = rawData.filter((i) => $masteredIds.includes(i.id)).length;
}
```

**処理内容:**
1. 現在のレベルに対応する全単語データから
2. 習得済みIDリストに含まれる単語をフィルタリング
3. その数を`learnedWords`ストアに設定

#### 5.9.2 カテゴリー別進捗計算

リストビューで各カテゴリーの進捗を計算：

```typescript
{@const catItems = rawData.filter((i) => i.category === cat)}
{@const learnedCount = catItems.filter((i) =>
  $masteredIds.includes(i.id)
).length}
{@const progress = Math.round((learnedCount / catItems.length) * 100)}
```

**処理内容:**
1. カテゴリーに属する単語をフィルタリング
2. その中で習得済みの単語数をカウント
3. パーセンテージを計算（四捨五入）

### 5.10 戻るハンドラ管理

**関数**: `updateBackHandler()`

```typescript
function updateBackHandler() {
  $customBackHandler = () => {
    if (viewMode === "card") {
      goBackToList();
    } else {
      // リストビューの場合は、ブラウザの履歴を使って戻る
      if (typeof window !== "undefined" && window.history.length > 1) {
        window.history.back();
      } else {
        goto(`${base}/`);
      }
    }
  };
}
```

**処理内容:**
1. カードビューの場合: リストビューに戻る
2. リストビューの場合: ブラウザの戻るボタンまたはホームに遷移

**関数**: `goBackToList()`

```typescript
function goBackToList() {
  viewMode = "list";
  $currentCategory = "all";
  updateBackHandler();
}
```

---

## 6. 状態管理

### 6.1 ローカル状態（コンポーネント内）

```typescript
let rawData = $state<WordItem[]>([]);      // 全単語データ
let items = $state<WordItem[]>([]);        // 現在のセッションの単語
let categories = $state<string[]>([]);     // カテゴリー一覧
let currentIndex = $state(0);              // 現在のカードインデックス
let uniqueKey = $state(0);                // アニメーション用キー
let direction = $state(1);                // アニメーション方向（1:次, -1:前）
let showingMeaning = $state(false);        // 意味表示フラグ
let viewMode = $state<"list" | "card">("list"); // ビューモード
```

### 6.2 派生状態（$derived）

```typescript
let currentItem = $derived(items[currentIndex]);
let isMastered = $derived(
  currentItem ? $masteredIds.includes(currentItem.id) : false
);
```

### 6.3 グローバル状態（ストア）

- `currentLevel`: 現在のHSKレベル（1または2）
- `masteredIds`: 習得済み単語IDの配列（LocalStorageと同期）
- `difficultIds`: 苦手単語IDの配列（LocalStorageと同期）
- `totalWords`: 総単語数
- `learnedWords`: 習得済み単語数
- `muted`: 音声ミュート状態（LocalStorageと同期）
- `currentCategory`: 現在選択中のカテゴリー
- `headerTitle`: ヘッダーに表示するタイトル
- `showBottomNav`: ボトムナビゲーション表示フラグ
- `customBackHandler`: カスタム戻るハンドラ

---

## 7. アニメーションとトランジション

### 7.1 カード遷移アニメーション

**使用ライブラリ**: Svelteの`fly`トランジション

```svelte
{#key uniqueKey}
  <div
    in:fly={{ x: direction * 50, duration: 300, opacity: 0 }}
    out:fly={{ x: direction * -50, duration: 300, opacity: 0 }}
  >
    <!-- カード内容 -->
  </div>
{/key}
```

**動作:**
- `uniqueKey`が変更されると、古いカードが`out`、新しいカードが`in`アニメーションを実行
- `direction`が1（次）の場合: 右から左へ（x: 50 → 0）
- `direction`が-1（前）の場合: 左から右へ（x: -50 → 0）
- 持続時間: 300ms
- 透明度も同時にアニメーション

### 7.2 意味表示アニメーション

**CSSアニメーション**: `fadeIn`

```css
.animate-fade-in {
  animation: fadeIn 0.3s ease-out;
}
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

**動作:**
- フェードイン（透明度: 0 → 1）
- 下から上へ移動（translateY: 10px → 0）
- 持続時間: 300ms
- イージング: ease-out

### 7.3 リストビューアニメーション

**CSSアニメーション**: `slideUp`

```css
.animate-slide-up {
  animation: slideUp 0.3s ease-out forwards;
}
@keyframes slideUp {
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}
```

**動作:**
- 下から上へスライド（translateY: 20px → 0）
- フェードイン（透明度: 0 → 1）
- 持続時間: 300ms

### 7.4 ボタンアニメーション

**3Dボタン効果**（総合実力テストボタン）:

```css
.btn-3d {
  transition: all 0.1s;
  box-shadow: 0 4px 0 rgba(0, 0, 0, 0.1);
  position: relative;
  top: 0;
}
.btn-3d:active {
  top: 4px;
  box-shadow: 0 0 0 rgba(0, 0, 0, 0);
}
```

**動作:**
- 通常時: 影が下に4px
- アクティブ時: ボタンが4px下に移動し、影が消える
- 3D押し込み効果を実現

---

## 8. アクセシビリティ

### 8.1 キーボード操作

- **Enter/Spaceキー**: カテゴリーカードを選択、意味を表示
- **Tabキー**: フォーカス可能な要素間を移動

### 8.2 ARIA属性

- `role="button"`: クリック可能な要素に設定
- `tabindex="0"`: キーボードフォーカス可能に設定
- `aria-label`: ボタンの目的を説明
  - "Tap to reveal meaning"
  - "Listen to pronunciation"
  - "Mark as mastered" / "Unmark as mastered"
  - "Previous card" / "Next card"
  - "{カテゴリー名}カテゴリーを学習する"

### 8.3 セマンティックHTML

- `<header>`: ヘッダーセクション
- `<nav>`: ボトムナビゲーション
- `<button>`: クリック可能な要素
- `<h1>`, `<h2>`, `<h3>`: 適切な見出し階層

---

## 9. パフォーマンス最適化

### 9.1 データフィルタリング

- カテゴリー別フィルタリングは必要時のみ実行
- 習得済み単語のソートはセッション開始時のみ

### 9.2 アニメーション最適化

- `{#key}`ブロックを使用して、必要な時のみアニメーションをトリガー
- CSSアニメーションを使用（JavaScriptアニメーションより軽量）

### 9.3 メモリ管理

- `onMount`のクリーンアップ関数でカスタムハンドラをクリア
- 不要な状態更新を避ける

---

## 10. エラーハンドリング

### 10.1 LocalStorageエラー

LocalStorageへの保存は`src/lib/stores/app.ts`で自動的に処理されるが、プライベートモードなどで失敗する可能性がある。現在は明示的なエラーハンドリングは実装されていないが、ブラウザの制約により自動的に処理される。

### 10.2 音声読み上げエラー

- ミュート状態のチェック
- ブラウザの音声合成APIの可用性チェック（現在は未実装）

### 10.3 データ不存在エラー

- `currentItem`の存在チェック（`toggleMastered`関数など）
- 空のカテゴリーや単語リストのチェック

---

## 11. 今後の拡張可能性

### 11.1 学習統計

- カテゴリー別の学習時間
- 習得済み単語の復習頻度
- 苦手単語の自動検出

### 11.2 学習モードの追加

- タイムアタックモード
- ランダム順序モード
- 習得済みのみの復習モード

### 11.3 カスタマイズ機能

- カードの色テーマ変更
- フォントサイズ調整
- 音声読み上げ速度の調整

### 11.4 ソーシャル機能

- 学習進捗の共有
- 友達との進捗比較
- 学習記録のエクスポート

---

## 12. 技術スタック

- **フレームワーク**: SvelteKit 2.49.1
- **言語**: TypeScript 5.9.3
- **スタイリング**: Tailwind CSS 3.4.17
- **アニメーション**: Svelte transitions (`fly`, `fade`)
- **音声合成**: Web Speech API (`speechSynthesis`)
- **データ永続化**: LocalStorage API
- **アイコン**: Font Awesome（CDN経由）

---

## 13. ファイル構成

```
src/routes/cards/
  └── +page.svelte          # 単語カード機能のメインコンポーネント

src/lib/
  ├── data/
  │   ├── hsk1.js          # HSK 1級単語データ（428語）
  │   └── hsk2.js          # HSK 2級単語データ（332語）
  ├── stores/
  │   └── app.ts           # アプリケーション状態管理
  ├── types/
  │   └── word.ts          # WordItem型定義
  └── components/
      ├── Header.svelte    # ヘッダーコンポーネント
      └── BottomNav.svelte # ボトムナビゲーション
```

---

## 14. まとめ

単語カード機能は、HSK1級・2級の中国語単語を効率的に学習するためのコア機能です。カテゴリー別の体系的な学習、苦手単語の復習、進捗の可視化により、学習者の継続的な学習を支援します。フラッシュカード形式のインタラクティブなUIと音声読み上げ機能により、視覚的・聴覚的な学習体験を提供します。

---

**最終更新日**: 2025年1月
**バージョン**: 1.0.0
