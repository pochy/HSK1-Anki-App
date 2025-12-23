# 構文構築ゲーム：言葉の鍛冶屋 (Sentence Smith) - 詳細仕様書

---

## 📖 このゲームについて（一般向け説明）

### ゲームの概要

「言葉の鍛冶屋」は、バラバラになった単語を正しい順序で並べ直すパズルゲームです。プレイ時間は1回5〜15分程度で、気軽に楽しみながら語学を学べます。

### ゲームのテーマ

あなたは「言葉の鍛冶職人」です。バラバラになった「素材（単語）」を、正しい順序で「金床」に並べ、文章という「武器や防具」を完成させます。速く正確に完成させると、より良いアイテムが作れます。

### ゲームのルール

#### 基本的な流れ

1. **文章がバラバラになる**
   - 例：「私は学生です」→「私」「は」「学生」「です」のように分割されます。

2. **素材を金床に配置する**
   - 画面下部の「素材置き場」から単語を選び、中央の「金床」に並べます。
   - タップで選び、正しい順序で配置します。

3. **「打つ」ボタンで完成**
   - 全ての単語を配置したら「打つ」ボタンを押します。
   - 正しい順序なら成功、間違っていれば失敗です。

#### 評価の仕組み

完成の仕方で4段階に評価されます。

- **伝説（Legendary）**: ミスなし、時間も短い
- **エピック（Epic）**: ミスなし、時間内に完成
- **レア（Rare）**: ミスが少ない、時間は少しオーバー
- **壊れた（Broken）**: ミスが多い、または時間切れ

#### 時間制限

文章の長さに応じて制限時間が決まります。

- 短い文章（3〜5語）：30秒
- 中程度（6〜8語）：45秒
- やや長い（9〜12語）：60秒
- 長い（13〜15語）：90秒
- とても長い（16語以上）：120秒

時間切れになると失敗です。

### ゲームの特徴

#### リアルタイムフィードバック

配置中に、正しい位置は緑、間違った位置は赤で表示されます。完成を待たずに確認できます。

#### ヒント機能

- 時間の半分が経過すると、次の正しい位置が点滅します。
- 手動でヒントボタンも使えます。

#### 連続正解ボーナス

連続で正解すると「連鎖（Combo）」が増えます。連鎖が続くと：

- 2回以上：炉がオレンジ色に
- 5回以上：炉が青い炎に

連鎖が長いほど、より良いアイテムが作れます。

#### 視覚・音の演出

- 正解時：火花、光るエフェクト、音
- 配置時：金属音
- ミス時：警告音と振動

### 学習の仕組み

#### 復習タイミングの自動調整

ゲームは、あなたの正解・ミス・時間を記録し、次に復習するタイミングを自動で決めます。

- 簡単に解けた：次はもっと先に
- 難しかった：次は早めに
- 間違えた：すぐに再挑戦

これにより、覚えにくいものは頻繁に、覚えたものは間隔を空けて出題されます。

#### 記憶の定着

- **連続正解数**: 何回連続で正解したか
- **記憶の安定性**: どれだけ覚えているか
- **難易度**: その文章の難しさ

これらを記録し、最適なタイミングで復習できるようにします。

### ゲームの目的

#### 学習目標

1. **文章構成力の向上**: 単語の順序を理解する
2. **語順の定着**: 正しい順序を覚える
3. **瞬発的な判断力**: 素早く正しい順序を見つける
4. **長期記憶の定着**: 忘れにくくする

#### 楽しみながら学ぶ

- **ゲーム性**: パズルとして楽しめる
- **達成感**: 良い評価や連鎖で満足感
- **継続しやすい**: 短時間で取り組める

### 画面の見方

```text
┌─────────────────────────┐
│  [タイマー] [連鎖数]    │  ← 残り時間と連続正解数
├─────────────────────────┤
│                         │
│      [金床エリア]       │  ← ここに単語を並べる
│   [ ] [ ] [ ] [ ]      │
│                         │
├─────────────────────────┤
│  [素材置き場]           │  ← バラバラになった単語
│  [私] [は] [学生] ...   │
│                         │
│  [打つ] [ヒント]        │  ← 操作ボタン
└─────────────────────────┘
```

### まとめ

「言葉の鍛冶屋」は、バラバラの単語を正しい順序で並べるパズルゲームです。速さと正確さで評価され、連続正解で連鎖が伸びます。ゲームはあなたの成績を記録し、最適なタイミングで復習できるようにします。楽しみながら、文章の順序を覚え、語学力を向上させることができます。

---

## 1. ゲーム概要

### 1.1 基本情報

- **ゲーム名**: 言葉の鍛冶屋 (Sentence Smith)
- **ジャンル**: パズル / タイムアタック / クラフト
- **学習対象**: 語学（英文法、慣用句）、プログラミングコード（構文、アルゴリズム）
- **ターゲット層**: 瞬発的な構成力を養いたい語学学習者、コーディング初心者
- **プレイ時間**: 1セッション 5-15分

### 1.2 コアコンセプト

プレイヤーは「言葉の鍛冶職人」として、バラバラに砕けた素材（単語やコード片）を、炉の火が消える前に正しい順序で配置し、強靭な武器や防具を鍛え上げます。正解までの「スピード」と「正確性」が、鍛え上がるアイテムの品質（レアリティ）と、次回の復習タイミング（冷却期間）を決定します。

### 1.3 学習目標

- 文章構成力の向上
- 語順の理解と定着
- 瞬発的な判断力の養成
- 間隔反復による長期記憶の定着

---

## 2. データ構造

### 2.1 カードデータ構造

```typescript
interface SentenceCard {
  card_id: number; // ユニークID
  original_sentence: string; // 元の文章
  tokens: Token[]; // トークン配列
  distractors: string[]; // 難易度調整用のダミー単語
  difficulty_level: number; // 1-5（1:短文、5:長文）
  srs_data: SRSData; // SRS関連データ
  item_metadata: ItemMetadata; // アイテムメタデータ
  category?: string; // カテゴリー（オプション）
  language?: string; // 言語（オプション）
}

interface Token {
  id: string; // トークンID（例: "t1"）
  text: string; // トークンのテキスト
  type: TokenType; // 品詞タイプ
  position: number; // 元の位置（検証用）
}

type TokenType =
  | "subject"
  | "verb"
  | "object"
  | "article"
  | "adjective"
  | "noun"
  | "adverb"
  | "preposition"
  | "conjunction"
  | "punctuation"
  | "code_keyword"
  | "code_operator"
  | "code_identifier";

interface SRSData {
  next_review: string; // ISO 8601形式の日付
  interval: number; // 現在の間隔（日）
  stability: number; // 記憶の安定性 (FSRS Stability)
  difficulty: number; // 難易度 (FSRS Difficulty 1-10)
  streak: number; // 連続正解数
  last_review_date?: string; // 最終復習日
  review_count: number; // 総復習回数
}

interface ItemMetadata {
  type: ItemType; // アイテムタイプ
  rarity: Rarity; // レアリティ
  quality_score: number; // 品質スコア（0-100）
  forged_date?: string; // 鍛造日
}

type ItemType =
  | "sword" // 剣
  | "shield" // 盾
  | "armor" // 鎧
  | "staff" // 杖
  | "bow" // 弓
  | "dagger"; // 短剣

type Rarity =
  | "common" // 普通
  | "uncommon" // 珍しい
  | "rare" // レア
  | "epic" // エピック
  | "legendary"; // 伝説
```

### 2.2 ゲームセッションデータ

```typescript
interface GameSession {
  session_id: string; // セッションID
  start_time: number; // 開始時刻（Unix timestamp）
  end_time?: number; // 終了時刻
  cards: SentenceCard[]; // 使用カード
  current_card_index: number; // 現在のカードインデックス
  score: number; // セッションスコア
  results: CardResult[]; // 各カードの結果
  settings: GameSettings; // ゲーム設定
}

interface CardResult {
  card_id: number;
  time_taken: number; // 所要時間（秒）
  mistakes: number; // ミス回数
  rating: Rating; // 評価（Legendary/Epic/Rare/Broken）
  new_interval: number; // 新しい間隔
  new_ease_factor: number; // 新しい難易度係数
  item_created: ItemMetadata; // 作成されたアイテム
}

type Rating = "legendary" | "epic" | "rare" | "broken";

interface GameSettings {
  time_limit: number; // 制限時間（秒、0で無制限）
  difficulty_range: [number, number]; // 難易度範囲 [min, max]
  enable_distractors: boolean; // ダミー単語を有効化
  enable_hints: boolean; // ヒント機能
  sound_enabled: boolean; // 音声効果
  tts_enabled: boolean; // テキスト読み上げ
}
```

---

## 3. ゲームロジック

### 3.1 ゲームフロー

#### 3.1.1 セッション開始

1. ユーザーがセッションを開始
2. 復習対象カードを取得（`next_review <= 今日`）
3. 難易度フィルターを適用（設定に基づく）
4. カードをシャッフル
5. セッションデータを初期化

#### 3.1.2 カード準備（Pre-Game）

1. **トークン化処理**
   - 文章をトークンに分割
   - 各トークンにID、タイプ、位置を割り当て
   - トークン配列をシャッフル

2. **Distractor Logic（難易度調整）**
   - `difficulty_level >= 3` の場合、ダミー単語を追加
   - 類似した品詞のダミー単語を選択
   - 例: "plays" に対して "playing", "played" を追加
   - ダミー単語は視覚的に区別可能（グレーアウト、または別エリア）

3. **UI初期化**
   - 素材置き場（下部）にトークンを表示
   - 金床（中央）に空スロットを表示
   - タイマーを開始（設定されている場合）

#### 3.1.3 鍛錬フェーズ（Interaction）

1. **ドラッグ＆ドロップ操作**
   - プレイヤーは素材をドラッグして金床に配置
   - 正しい位置に配置された場合、微かな火花エフェクト
   - 間違った位置に配置された場合、振動フィードバック
   - **タップ操作**: 素材をタップすると「単語カード」ダイアログが表示され、詳細確認やその場での配置（Use）が可能

2. **配置検証（リアルタイム）**
   - 各スロットの配置を検証
   - 正しい順序の部分は緑色でハイライト
   - 間違った順序は赤色で警告

3. **ヒント機能（オプション）**
   - 一定時間経過後、次の正しいトークンを点滅
   - または、品詞タイプを表示

4. **確定処理**
   - 「打つ（Forge）」ボタンで確定
   - 配置を検証し、結果を計算

#### 3.1.4 SRS判定アルゴリズム

```typescript
function calculateRating(
  timeTaken: number,
  mistakes: number,
  difficultyLevel: number
): Rating {
  const timeLimit = getTimeLimit(difficultyLevel);
  const perfectTime = timeLimit * 0.3; // 30%以内で完璧

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
```

#### 3.1.4 SRS判定アルゴリズム (FSRS準拠)

FSRS (Free Spaced Repetition Scheduler) の理論に基づき、記憶の安定性(S)と難易度(D)を更新します。

```typescript
function updateSRS(
  currentSRS: SRSData,
  rating: Rating
): { interval: number; stability: number; difficulty: number } {
  let { stability, difficulty } = currentSRS;

  switch (rating) {
    case "legendary": // Easy (4)
      difficulty = Math.max(1, difficulty - 1);
      stability = stability * Math.exp(1.2) * (1 - (difficulty - 1) / 15);
      break;
    case "epic": // Good (3)
      stability = stability * Math.exp(0.8) * (1 - (difficulty - 1) / 15);
      break;
    case "rare": // Hard (2)
      difficulty = Math.min(10, difficulty + 0.5);
      stability = stability * Math.exp(0.3) * (1 - (difficulty - 1) / 15);
      break;
    case "broken": // Again (1)
      difficulty = Math.min(10, difficulty + 1);
      stability = Math.max(1, stability * 0.5); // 罰則付き再学習
      break;
  }

  return {
    interval: Math.round(stability),
    stability,
    difficulty,
  };
}

function calculateQualityScore(
  rating: Rating,
  timeTaken: number,
  timeLimit: number
): number {
  const baseScore = {
    legendary: 100,
    epic: 75,
    rare: 50,
    broken: 0,
  }[rating];

  if (rating === "broken") return 0;

  const timeBonus = Math.max(0, ((timeLimit - timeTaken) / timeLimit) * 20);
  return Math.min(100, baseScore + timeBonus);
}

function determineRarity(qualityScore: number, streak: number): Rarity {
  if (qualityScore >= 95 && streak >= 5) return "legendary";
  if (qualityScore >= 80) return "epic";
  if (qualityScore >= 60) return "rare";
  if (qualityScore >= 40) return "uncommon";
  return "common";
}
```

### 3.2 難易度計算

```typescript
function getTimeLimit(difficultyLevel: number): number {
  // 難易度レベルに基づく制限時間（秒）
  const baseTime = {
    1: 30, // 短文: 30秒
    2: 45,
    3: 60,
    4: 90,
    5: 120, // 長文: 120秒
  };
  return baseTime[difficultyLevel] || 60;
}

function calculateDifficultyLevel(sentence: string): number {
  const wordCount = sentence.split(/\s+/).length;
  if (wordCount <= 5) return 1;
  if (wordCount <= 8) return 2;
  if (wordCount <= 12) return 3;
  if (wordCount <= 15) return 4;
  return 5;
}
```

---

## 4. UI/UX設計

### 4.1 画面レイアウト

```text
┌─────────────────────────────────────┐
│  [タイマー] [スコア] [連鎖数]      │
├─────────────────────────────────────┤
│                                     │
│         [金床エリア]                │
│    [ ] [ ] [ ] [ ] [ ] [ ]         │
│                                     │
│    [完成した文章プレビュー]         │
│                                     │
├─────────────────────────────────────┤
│  [素材置き場]                      │
│  [She] [plays] [the] [piano] ...   │
│                                     │
│  [打つ(Forge)] [ヒント] [ギブアップ]│
└─────────────────────────────────────┘
```

### 4.2 視覚効果

#### 4.2.1 正解時のエフェクト

- **ハンマーアニメーション**: 金床にハンマーが振り下ろされる
- **火花エフェクト**: 激しい火花が飛び散る
- **光るエフェクト**: 完成した文章が金色に光る
- **パーティクル**: 星や光の粒子が舞い散る

#### 4.2.2 連鎖ボーナス

- **ストリーク表示**: 連続正解数を表示
- **炉の変化**: 連続正解中は炉の火が青白く高温になる
- **BGM変化**: テンポが上がり、緊張感が高まる
- **画面エフェクト**: 画面全体が微かに揺れる

#### 4.2.3 リアルタイムフィードバック

- **正しい配置**: 緑色のグローエフェクト
- **間違った配置**: 赤色の警告エフェクト + 振動
- **部分正解**: 黄色のハイライト

### 4.3 聴覚効果

#### 4.3.1 効果音

- **配置音**: 金属的な「カキン」「チン」という音
- **正解音**: 爽快な「パリーン」という金属音
- **ミス音**: 鈍い「ガチャン」という音
- **完成音**: 壮大なファンファーレ

#### 4.3.2 テキスト読み上げ（TTS）

- **実装済み**: Web Speech API (`window.speechSynthesis`) を使用
- 完成時に中国語（`zh-CN`）で文章を読み上げ
- 読み上げ速度: 0.8倍速（聞き取りやすさ重視）

### 4.4 アニメーション

#### 4.4.1 トランジション

- **カード切り替え**: スライドアニメーション
- **結果表示**: フェードイン + スケールアニメーション
- **アイテム表示**: 3D回転アニメーション

#### 4.4.2 ゲームフィードバック

- **コンボ表示**: 連続正解数を画面上部に表示（Combo xN）
- **ヒートアップ**:
  - Streak 2+: 炉がオレンジ色に燃え上がる（`orange-fire`）
  - Streak 5+: 炉が青い炎に包まれる（`blue-fire`）

#### 4.4.2 インタラクション

- **ドラッグ中**: トークンが拡大し、影が濃くなる
- **ドロップ時**: バウンスアニメーション
- **タップ時**: 単語カードダイアログがフェードイン表示
- **ボタン押下**: プレスアニメーション

---

## 5. 実装詳細

### 5.1 技術スタック（推奨）

- **フロントエンド**: React / Vue.js / Svelte
- **アニメーション**: Framer Motion / GSAP
- **音声合成**: Web Speech API
- **状態管理**: Redux / Zustand / Pinia
- **データ永続化**: IndexedDB / LocalStorage

### 5.2 パフォーマンス最適化

1. **トークン化の事前処理**
   - カードデータの事前トークン化
   - キャッシュによる高速化

2. **アニメーション最適化**
   - CSS Transform の活用
   - リクエストアニメーションフレームの使用
   - パーティクル数の制限

3. **メモリ管理**
   - 使用済みカードの解放
   - 画像・音声の遅延読み込み

### 5.3 アクセシビリティ

- **キーボード操作**: タブキーでトークンを選択、矢印キーで移動
- **スクリーンリーダー対応**: ARIAラベルの適切な設定
- **色覚対応**: 色だけでなく形状・アイコンでも情報を伝達
- **フォントサイズ**: ユーザー設定に応じた調整

---

## 6. ゲームバランス調整

### 6.1 難易度カーブ

| 難易度レベル | 単語数 | 制限時間 | 推奨ストリーク |
| ------------ | ------ | -------- | -------------- |
| 1 (短文)     | 3-5    | 30秒     | 0-2            |
| 2            | 6-8    | 45秒     | 3-5            |
| 3            | 9-12   | 60秒     | 6-10           |
| 4            | 13-15  | 90秒     | 11-15          |
| 5 (長文)     | 16+    | 120秒    | 16+            |

### 6.2 報酬システム

- **経験値（XP）**: 各カードの品質スコアに基づく
- **コイン**: レアリティに応じた報酬
- **アチーブメント**: 連続正解、完璧なスコアなど

### 6.3 プログレッション

- **レベルシステム**: 総経験値に基づくプレイヤーレベル
- **アイテムコレクション**: 鍛造したアイテムの記録
- **統計情報**: 正答率、平均時間、最長ストリークなど

---

## 7. テストケース

### 7.1 機能テスト

1. **トークン化テスト**
   - 様々な言語・文章形式でのトークン化
   - 特殊文字・記号の処理

2. **SRS計算テスト**
   - 各評価レベルの間隔計算
   - 難易度係数の上限・下限チェック

3. **UI操作テスト**
   - ドラッグ＆ドロップの動作
   - タッチデバイスでの操作

### 7.2 パフォーマンステスト

- 100カード連続プレイ時のメモリ使用量
- アニメーションのフレームレート（60fps維持）
- 音声読み上げの遅延

---

## 8. 今後の拡張案

1. **マルチプレイヤー**: 友達との対戦モード
2. **カスタムカード**: ユーザーが独自の文章を追加
3. **カテゴリー別モード**: 文法、語彙、コードなど
4. **ダークモード**: 視覚的な疲労軽減
5. **オフライン対応**: サービスワーカーによる完全オフライン

---

## 9. 参考資料

- エビングハウスの忘却曲線理論
- Anki SRSアルゴリズム
- FSRS（Free Spaced Repetition Scheduler）
- ゲーミフィケーション理論
