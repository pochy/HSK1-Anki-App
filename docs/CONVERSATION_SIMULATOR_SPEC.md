# 会話シミュレーションゲーム：実践会話マスター (Conversation Simulator) - 詳細仕様書

## 📑 目次

- [このゲームについて（一般向け説明）](#-このゲームについて一般向け説明)
- [1. ゲーム概要](#1-ゲーム概要)
- [2. データ構造](#2-データ構造)
- [3. ゲームロジック](#3-ゲームロジック)
- [4. UI/UX設計](#4-uiux設計)
- [5. 実装詳細](#5-実装詳細)
- [6. ゲームバランス調整](#6-ゲームバランス調整)
- [7. テストケース](#7-テストケース)
- [8. 今後の拡張案](#8-今後の拡張案)
- [9. 参考資料](#9-参考資料)

---

## 📖 このゲームについて（一般向け説明）

### ゲームの概要

「実践会話マスター」は、実際の会話シーンをシミュレートしながら、適切な中国語フレーズや文法を学ぶゲームです。プレイ時間は1回10〜20分程度で、実践的な会話力を身につけることができます。

### ゲームのテーマ

あなたは「会話の達人」を目指す学習者です。様々な日常シーン（買い物、レストラン、道案内、友達との会話など）で、適切な中国語フレーズを選択し、自然な会話を完成させます。正しい選択を続けることで、会話スキルが向上し、より高度なシーンに挑戦できるようになります。

### ゲームのルール

#### 基本的な流れ

1. **会話シーンの開始**
   - 例：「レストランで注文する」「道を尋ねる」「友達と約束する」など
   - シーンの状況と相手のセリフが表示されます

2. **適切な返答を選択**
   - 4つの選択肢から、文脈に最も適切なフレーズを選びます
   - 選択肢には正解、部分正解、不正解が含まれます

3. **フィードバックと解説**
   - 正解・不正解が即座に表示されます
   - なぜその選択が適切か（または不適切か）の解説が表示されます
   - 文法ポイントやフレーズの使い方が説明されます

#### 評価の仕組み

会話の完成度で4段階に評価されます。

- **完璧（Perfect）**: 最も自然で適切な表現を選択
- **良好（Good）**: 文法的に正しく、意味は通じる表現
- **可（OK）**: 意味は通じるが、より自然な表現がある
- **不適切（Poor）**: 文法的に誤りがある、または文脈に合わない

#### シーンの難易度

シーンは難易度別に分類されます。

- **初級（Level 1）**: 基本的な挨拶、簡単な質問と返答
- **中級（Level 2）**: 日常会話、買い物、レストランでの注文
- **上級（Level 3）**: 複雑な状況説明、意見交換、交渉
- **最上級（Level 4）**: ビジネスシーン、専門的な話題

### ゲームの特徴

#### リアルな会話シーン

実際の生活で遭遇する場面を再現します。

- **買い物**: 「いくらですか？」「もう少し安くできますか？」
- **レストラン**: 「注文をお願いします」「お会計をお願いします」
- **道案内**: 「駅はどこですか？」「まっすぐ行ってください」
- **友達との会話**: 「週末何をしますか？」「一緒に行きましょう」
- **電話**: 「もしもし」「後でかけ直します」

#### 文脈理解の学習

同じ意味でも、状況によって適切な表現が異なることを学びます。

- **丁寧さのレベル**: 友達 vs 目上の人
- **フォーマル度**: カジュアル vs ビジネス
- **感情の表現**: 感謝、謝罪、依頼など

#### 文法ポイントの解説

各シーンで重要な文法やフレーズを解説します。

- **助詞の使い方**: 了、的、地、得など
- **語順**: 時間表現の位置、目的語の位置
- **敬語・丁寧語**: 請、麻煩、不好意思など
- **接続詞**: 但是、所以、因为など

### 学習の仕組み

#### 復習タイミングの自動調整

ゲームは、あなたの正解・不正解を記録し、次に復習するタイミングを自動で決めます。

- 完璧に答えたシーン: 次はもっと先に
- 難しかったシーン: 次は早めに
- 間違えたシーン: すぐに再挑戦

これにより、覚えにくいシーンは頻繁に、覚えたシーンは間隔を空けて出題されます。

#### 記憶の定着

- **連続正解数**: 何回連続で正解したか
- **記憶の安定性**: どれだけ覚えているか
- **難易度**: そのシーンの難しさ

これらを記録し、最適なタイミングで復習できるようにします。

### ゲームの目的

#### 学習目標

1. **実践的な会話力**: 実際の場面で使えるフレーズを覚える
2. **文脈理解力**: 状況に応じた適切な表現を選ぶ
3. **文法の定着**: 自然な会話を通じて文法を学ぶ
4. **長期記憶の定着**: 忘れにくくする

#### 楽しみながら学ぶ

- **ゲーム性**: 会話を完成させる達成感
- **実用性**: 実際に使えるフレーズを学べる
- **継続しやすい**: 短時間で取り組める

### 画面の見方

```text
┌─────────────────────────┐
│  [シーン: レストラン]    │  ← 現在のシーン
├─────────────────────────┤
│                         │
│  [状況説明]              │
│  "レストランで注文する"  │
│                         │
│  [相手のセリフ]          │
│  服务员: "您要点什么？" │
│                         │
│  [あなたの返答を選択]    │
│  ○ 我要一个汉堡。       │
│  ○ 我想点菜。           │
│  ○ 多少钱？             │
│  ○ 谢谢。               │
│                         │
│  [回答] [ヒント]        │  ← 操作ボタン
└─────────────────────────┘
```

### まとめ

「実践会話マスター」は、実際の会話シーンをシミュレートしながら、適切な中国語フレーズを学ぶゲームです。文脈に応じた適切な表現を選ぶことで、実践的な会話力を身につけることができます。楽しみながら、実際に使える中国語を学びましょう。

---

## 1. ゲーム概要

### 1.1 基本情報

- **ゲーム名**: 実践会話マスター (Conversation Simulator)
- **ジャンル**: 会話シミュレーション / 教育ゲーム / クイズ
- **学習対象**: 中国語の会話表現、文法、フレーズ
- **ターゲット層**: 実践的な会話力を身につけたい語学学習者
- **プレイ時間**: 1セッション 10-20分

### 1.2 コアコンセプト

プレイヤーは様々な日常シーンで、適切な中国語フレーズを選択して会話を完成させます。文脈に応じた適切な表現を選ぶことで、実践的な会話力と文法理解を深めます。正解・不正解に基づいて、FSRSインスパイアの簡易SRS（difficulty + stability を用いたカスタムモデル）による最適な復習タイミングが自動調整されます。

### 1.3 学習目標

- 実践的な会話表現の習得
- 文脈に応じた適切な表現の選択
- 文法ルールの自然な理解
- 間隔反復による長期記憶の定着

---

## 2. データ構造

### 2.1 会話シーンデータ構造

```typescript
interface ConversationScene {
  scene_id: number; // ユニークID
  title: string; // シーンタイトル（例: "レストランで注文"）
  description: string; // シーン説明
  category: SceneCategory; // カテゴリー
  difficulty_level: number; // 難易度レベル（1-4）
  context: ConversationContext; // 会話の文脈
  dialogue: Dialogue[]; // 会話の流れ
  dialogue: Dialogue[]; // 会話の流れ
  options: ResponseOption[]; // 選択肢データ（4つ固定）
  grammar_points: GrammarPoint[]; // 文法ポイント
  srs_data: SRSData; // SRSデータ
  metadata: SceneMetadata; // メタデータ
}

type SceneCategory =
  | "greeting" // 挨拶
  | "shopping" // 買い物
  | "restaurant" // レストラン
  | "transportation" // 交通
  | "asking_directions" // 道案内
  | "phone" // 電話
  | "friendship" // 友達との会話
  | "business" // ビジネス
  | "emergency" // 緊急事態
  | "daily_life"; // 日常生活

interface ConversationContext {
  setting: string; // 設定（例: "レストラン"）
  participants: Participant[]; // 参加者
  relationship: RelationshipType; // 関係性
  formality_level: FormalityLevel; // フォーマル度
  emotional_tone?: EmotionalTone; // 感情のトーン
}

type RelationshipType =
  | "friend" // 友達
  | "stranger" // 見知らぬ人
  | "superior" // 目上の人
  | "colleague" // 同僚
  | "family"; // 家族

type FormalityLevel =
  | "casual" // カジュアル
  | "polite" // 丁寧
  | "formal"; // フォーマル

type EmotionalTone =
  | "neutral" // 中立
  | "friendly" // 友好的
  | "apologetic" // 謝罪
  | "grateful" // 感謝
  | "urgent"; // 緊急

interface Participant {
  role: string; // 役割（例: "服务员"）
  name?: string; // 名前（オプション）
}

interface Dialogue {
  speaker: string; // 話者（例: "服务员"）
  text: string; // セリフ（中国語）
  pinyin?: string; // ピンイン（オプション）
  translation: string; // 日本語訳
  order: number; // 順序
}



type ResponseRating = "perfect" | "good" | "ok" | "poor";

interface GrammarPoint {
  point_id: string; // 文法ポイントID
  title: string; // タイトル
  description: string; // 説明
  examples: GrammarExample[]; // 例文
  related_scenes: number[]; // 関連シーンID
}

interface GrammarExample {
  chinese: string; // 中国語例文
  pinyin?: string; // ピンイン
  japanese: string; // 日本語訳
  explanation: string; // 解説
}

interface SRSData {
  next_review: string; // 次回復習日（ISO 8601）
  interval: number; // 間隔（日）
  stability: number; // 記憶の安定性 (FSRS Stability)
  difficulty: number; // 難易度 (FSRS Difficulty 1-10)
  streak: number; // 連続正解数
  last_review_date?: string; // 最終復習日
  review_count: number; // 総復習回数
}

interface SceneMetadata {
  created_date: string; // 作成日
  total_plays: number; // 総プレイ回数
  perfect_count: number; // 完璧な回答回数
  category_color: string; // カテゴリー色
  estimated_time: number; // 推定プレイ時間（秒）
}
```

### 2.2 ゲームセッションデータ

```typescript
interface GameSession {
  session_id: string; // セッションID
  start_time: number; // 開始時刻（Unix timestamp）
  end_time?: number; // 終了時刻
  scene_ids: number[]; // 使用シーンのID配列（シーン本体は参照で持たない）
  // 実行時は conversationScenes からIDを使ってシーンデータを取得する
  // getScene(index: number): ConversationScene; 
  current_scene_index: number; // 現在のシーンインデックス
  score: number; // セッションスコア
  results: SceneResult[]; // 各シーンの結果
  settings: GameSettings; // ゲーム設定
}

interface DataPersistence {
  maxStorageSize: number; // 例: 5MB (5 * 1024 * 1024)
  cleanup(): void; // 古いセッションデータやキャッシュを削除
  compress(data: string): string; // JSON圧縮（LZStringなど使用）
  decompress(data: string): string;
}

interface SceneResult {
  scene_id: number;
  selected_response_id: string; // 選択した返答ID
  correct_response_id: string; // 正解の返答ID
  rating: ResponseRating; // 評価
  time_taken: number; // 所要時間（秒）
  new_interval: number; // 新しい間隔（日）
  new_stability: number; // 新しい安定性
  grammar_points_learned: string[]; // 学習した文法ポイントID
}

interface GameSettings {
  difficulty_range: [number, number]; // 難易度範囲 [min, max]
  category_filter?: SceneCategory[]; // カテゴリーフィルター
  enable_hints: boolean; // ヒント機能
  sound_enabled: boolean; // 音声効果
  tts_enabled: boolean; // テキスト読み上げ
  show_explanation: boolean; // 解説表示
  time_limit_seconds: number; // 1シーンの回答制限時間（0で無制限、推奨: 30）
  max_scenes_per_session?: number; // 1セッションで出題する最大シーン数
}
```

### 2.3 選択肢生成データ

```typescript
interface ResponseOption {
  response_id: string; // 返答ID
  text: string; // 返答文（中国語）
  pinyin?: string; // ピンイン
  translation: string; // 日本語訳
  is_correct: boolean; // 正解フラグ
  rating: ResponseRating; // 評価
  explanation?: string; // 解説（正解/不正解の理由）
  distractor_type?: DistractorType; // 不正解の場合のタイプ
}

type DistractorType =
  | "grammar_error" // 文法エラー
  | "wrong_context" // 文脈に合わない
  | "too_formal" // フォーマルすぎる
  | "too_casual" // カジュアルすぎる
  | "wrong_meaning"; // 意味が違う
```

---

## 3. ゲームロジック

### 3.1 ゲームフロー

#### 3.1.1 セッション開始

1. ユーザーがセッションを開始
2. 復習対象シーンを取得（`next_review <= 今日`）
3. 難易度フィルターを適用（設定に基づく）
4. カテゴリーフィルターを適用（設定に基づく）
5. シーンをシャッフル
6. セッションデータを初期化

#### 3.1.2 シーン準備

1. **会話コンテキストの表示**
   - シーンのタイトルと説明を表示
   - 参加者と関係性を表示
   - フォーマル度を表示

2. **会話の流れの表示**
   - 相手のセリフを順番に表示
   - 音声読み上げ（オプション）
   - 日本語訳を表示

3. **選択肢の準備**
   - シーンデータに含まれる4つの選択肢（`options`）を取得
   - 選択肢をシャッフルして表示順を決定

#### 3.1.3 回答フェーズ

1. **選択**
   - プレイヤーが4つの選択肢から1つを選択
   - タイマーを開始（GameSettings.time_limit_seconds を使用、0の場合は無制限）
   - 制限時間超過は自動で「Poor」扱いにして次のシーンへ遷移

2. **判定**
   - 選択した返答IDを正解と照合
   - 評価を計算（Perfect/Good/OK/Poor）
   - 所要時間を記録
   - スコア加算: Perfect=100 / Good=70 / OK=40 / Poor・タイムアウト=0（必要に応じて係数調整）

3. **フィードバック**
   - 正解・不正解を表示
   - 解説を表示
   - 文法ポイントを表示
   - 音声読み上げ（正解の返答）

#### 3.1.4 SRS更新

```typescript
function updateSRSAfterScene(
  scene: ConversationScene,
  result: SceneResult
): void {
  const rating = result.rating;

  switch (rating) {
    case "perfect": // Easy (4)
      scene.srs_data.difficulty = Math.max(1, scene.srs_data.difficulty - 1);
      scene.srs_data.stability =
        scene.srs_data.stability *
        Math.exp(1.2) *
        (1 - (scene.srs_data.difficulty - 1) / 15);
      scene.srs_data.streak++;
      break;
    case "good": // Good (3)
      scene.srs_data.stability =
        scene.srs_data.stability *
        Math.exp(0.8) *
        (1 - (scene.srs_data.difficulty - 1) / 15);
      scene.srs_data.streak++;
      break;
    case "ok": // Hard (2)
      scene.srs_data.difficulty = Math.min(10, scene.srs_data.difficulty + 0.5);
      scene.srs_data.stability =
        scene.srs_data.stability *
        Math.exp(0.3) *
        (1 - (scene.srs_data.difficulty - 1) / 15);
      scene.srs_data.streak = 0;
      break;
    case "poor": // Again (1)
      scene.srs_data.difficulty = Math.min(10, scene.srs_data.difficulty + 1);
      scene.srs_data.stability = Math.max(1, scene.srs_data.stability * 0.5);
      scene.srs_data.streak = 0;
      break;
  }

  // 間隔の更新
  scene.srs_data.interval = Math.max(1, Math.round(scene.srs_data.stability)); // 最低1日にクランプ

  // 次回復習日の計算
  const nextReviewDate = new Date();
  nextReviewDate.setDate(
    nextReviewDate.getDate() + scene.srs_data.interval
  );
  scene.srs_data.next_review = nextReviewDate.toISOString();
  scene.srs_data.review_count++;
  scene.srs_data.last_review_date = new Date().toISOString();

  // メタデータ更新
  scene.metadata.total_plays++;
  if (rating === "perfect") {
    scene.metadata.perfect_count++;
  }
}
```

- セッション終了条件: `scene_ids` をすべて処理するか `GameSettings.max_scenes_per_session` に達した時点で `end_time` を記録し、スコア集計を確定する。



### 3.3 評価アルゴリズム

```typescript
function calculateRating(
  selectedResponse: ResponseOption,
  correctResponse: CorrectResponse,
  timeTaken: number,
  timeLimitSeconds = 0 // 0 の場合は時間制限なし
): ResponseRating {
  if (timeLimitSeconds > 0 && timeTaken > timeLimitSeconds) {
    return "poor"; // タイムアウトは不正解扱い
  }
  if (!selectedResponse.is_correct) {
    return "poor";
  }

  // 正解の場合、評価を下げずに時間ボーナスのみ付与
  const baseRating = correctResponse.rating;
  const gotTimeBonus =
    timeLimitSeconds > 0 ? timeTaken <= timeLimitSeconds : timeTaken <= 5;

  if (baseRating === "perfect") {
    return "perfect";
  }

  // 時間ボーナスは評価(Rating)には一切影響させず、スコア計算のみに反映する。
  // これにより、反射神経ではなく理解度に基づいた正確なSRS評価を行う。

  if (baseRating === "ok" && gotTimeBonus) {
    return "good";
  }

  return baseRating;
}
```

---

## 4. UI/UX設計

### 4.1 画面レイアウト

#### 4.1.1 会話シーン画面

```
┌─────────────────────────────────────┐
│  [← 戻る] [シーン: レストラン]      │
├─────────────────────────────────────┤
│                                     │
│  [状況説明]                          │
│  "レストランで注文する"             │
│  関係: 客 - 服务员（丁寧）          │
│                                     │
│  [会話の流れ]                        │
│  服务员: "您要点什么？"             │
│  （何を注文されますか？）            │
│                                     │
│  [あなたの返答を選択]                │
│  ○ 我要一个汉堡。                   │
│     （ハンバーガーを1つください）   │
│  ○ 我想点菜。                       │
│     （注文したいです）              │
│  ○ 多少钱？                         │
│     （いくらですか？）               │
│  ○ 谢谢。                           │
│     （ありがとう）                  │
│                                     │
│  [回答] [ヒント] [スキップ]         │
└─────────────────────────────────────┘
```

#### 4.1.2 フィードバック画面

```
┌─────────────────────────────────────┐
│  [結果]                              │
├─────────────────────────────────────┤
│                                     │
│  [評価]                              │
│  ✅ 完璧（Perfect）                 │
│                                     │
│  [解説]                              │
│  "我要一个汉堡。"は、レストランで   │
│  注文する際の自然な表現です。       │
│  "要"は「欲しい」という意味で、     │
│  注文時に使われます。               │
│                                     │
│  [文法ポイント]                      │
│  • 要 + 数量詞 + 名詞               │
│  • 一个（1つ）の使い方              │
│                                     │
│  [音声再生] 🔊                      │
│                                     │
│  [次へ] [もう一度聞く]              │
└─────────────────────────────────────┘
```

### 4.2 視覚効果

#### 4.2.1 正解時のエフェクト

- **成功アニメーション**: 緑色のチェックマークが表示
- **グローエフェクト**: 選択肢が光る
- **パーティクル**: 星や光の粒子が舞い散る
- **音声**: 成功音が再生

#### 4.2.2 不正解時のエフェクト

- **エラーアニメーション**: 赤色の×マークが表示
- **シェイク**: 画面が揺れる
- **正解のハイライト**: 正解の選択肢が緑色で光る
- **音声**: エラー音が再生

#### 4.2.3 会話の流れ表示

- **タイピングアニメーション**: セリフが1文字ずつ表示
- **フェードイン**: 新しいセリフがフェードイン
- **音声読み上げ**: セリフが自動で読み上げられる（オプション）

### 4.3 聴覚効果

#### 4.3.1 効果音

- **正解音**: 爽快な「ピンポン」音
- **不正解音**: 鈍い「ブー」音
- **選択音**: クリック音
- **完成音**: ファンファーレ

#### 4.3.2 テキスト読み上げ（TTS）

- **実装**: Web Speech API (`window.speechSynthesis`)
- **言語**: 中国語（`zh-CN`）
- **速度**: 0.8倍速（聞き取りやすさ重視）
- **用途**: セリフと正解の返答を読み上げ

---

## 5. 実装詳細

### 5.1 技術スタック

- **フロントエンド**: SvelteKit 2.49.1 + Svelte 5.45.6
- **言語**: TypeScript 5.9.3
- **スタイリング**: Tailwind CSS 3.4.17
- **アニメーション**: Svelte transitions / CSS animations
- **音声合成**: Web Speech API
- **状態管理**: Svelte stores
- **データ永続化**: LocalStorage

### 5.2 データソース

#### 5.2.1 会話シーンの作成

会話シーンは以下の形式で定義します：

```typescript
// src/lib/data/conversation-scenes.ts
export const conversationScenes: ConversationScene[] = [
  {
    scene_id: 1,
    title: "レストランで注文",
    description: "レストランで注文する場面",
    category: "restaurant",
    difficulty_level: 2,
    context: {
      setting: "レストラン",
      participants: [
        { role: "服务员" },
        { role: "客" },
      ],
      relationship: "stranger",
      formality_level: "polite",
      emotional_tone: "neutral",
    },
    dialogue: [
      {
        speaker: "服务员",
        text: "您要点什么？",
        pinyin: "nín yào diǎn shénme?",
        translation: "何を注文されますか？",
        order: 1,
      },
    ],
    options: [
      {
        response_id: "r1",
        text: "我要一个汉堡。",
        pinyin: "wǒ yào yī gè hànbǎo.",
        translation: "ハンバーガーを1つください。",
        is_correct: true,
        rating: "perfect",
        explanation: "飲食店で注文する際の最も標準的な表現です。",
      },
      {
        response_id: "r2",
        text: "给我汉堡。",
        pinyin: "gěi wǒ hànbǎo.",
        translation: "ハンバーガーをよこせ。",
        is_correct: false,
        rating: "poor",
        explanation: "これは命令形で、お店で使うには失礼にあたります。",
        distractor_type: "too_casual"
      },
      {
        response_id: "r3",
        text: "我要点菜。",
        pinyin: "wǒ yào diǎn cài.",
        translation: "注文したいです。",
        is_correct: false, // 文脈的には「何を」と聞かれているので具体的に答えるべき
        rating: "ok",
        explanation: "間違いではありませんが、具体的に何を頼むか答える場面です。",
        distractor_type: "wrong_context"
      },
      {
        response_id: "r4",
        text: "多少钱？",
        pinyin: "duōshǎo qián?",
        translation: "いくらですか？",
        is_correct: false,
        rating: "poor",
        explanation: "注文を聞かれているので、値段を聞くのは文脈に合いません。",
        distractor_type: "wrong_context"
      }
    ],

    grammar_points: [
      {
        point_id: "grammar_001",
        title: "要 + 数量詞 + 名詞",
        description: "「要」は「欲しい」という意味で、注文や依頼に使われます。",
        examples: [
          {
            chinese: "我要一杯咖啡。",
            pinyin: "wǒ yào yī bēi kāfēi.",
            japanese: "コーヒーを1杯ください。",
            explanation: "「要」の後に数量詞と名詞を続けます。",
          },
        ],
        related_scenes: [1, 5, 12],
      },
    ],
    srs_data: {
      next_review: new Date().toISOString(),
      interval: 1,
      stability: 1,
      difficulty: 5,
      streak: 0,
      review_count: 0,
    },
    metadata: {
      created_date: new Date().toISOString(),
      total_plays: 0,
      perfect_count: 0,
      category_color: "#f59e0b",
      estimated_time: 30,
    },
  },
  // ... 他のシーン
];
```

### 5.3 パフォーマンス最適化

1. **シーンの事前読み込み**
   - 次のシーンをバックグラウンドで読み込み
   - 画像・音声の遅延読み込み

2. **アニメーション最適化**
   - CSS Transform の活用
   - リクエストアニメーションフレームの使用
   - パーティクル数の制限

3. **メモリ管理**
   - 使用済みシーンの解放
   - LocalStorage への自動保存

### 5.4 パフォーマンス目標
```typescript
const PERFORMANCE_TARGETS = {
  maxMemoryMB: 50, // 最大メモリ使用量
  minFPS: 60, // アニメーションFPS
  maxTTSLatencyMs: 500, // TTS再生遅延
  maxSceneLoadMs: 200, // シーン遷移時間
};
```

### 5.5 エラーハンドリング
- **TTS非対応ブラウザ**: ブラウザのサポート状況を検知し、非対応時はアイコンを非表示にする、または代替の視覚的合図（吹き出し強調など）を行う。
- **LocalStorage容量オーバー**: `quotaExceeded` エラーを捕捉し、古いセッションログやキャッシュを削除して再試行する（`DataPersistence.cleanup()`）。
- **データ不整合**: シーンIDが見つからない場合は、ユーザーにエラーを表示せず静かにスキップするか、デフォルトのシーン（メニューに戻る等）にフォールバックする。

### 5.4 アクセシビリティ

- **キーボード操作**: タブキーで選択肢を選択、Enterで確定
- **スクリーンリーダー対応**: ARIAラベルの適切な設定
- **色覚対応**: 色だけでなく形状・アイコンでも情報を伝達
- **フォントサイズ**: ユーザー設定に応じた調整
- **動きを減らす**: `prefers-reduced-motion` ではタイピング/パーティクルをオフにし、フェード最小限にする
- **音声代替**: 音声オフやTTS非対応環境でも全情報がテキストで取得できるよう字幕とテキストラベルを必須にする
- **高コントラストモード**: 視認性を高めるハイコントラストテーマを用意する
- **Deaf/Hard of Hearing対応**: すべての音声フィードバック（正解音など）に対して、視覚的なフィードバック（画面フラッシュ、アイコン表示）を併用する
- **読み上げ順序**: スクリーンリーダー利用時のDOM順序と見た目の順序を一致させる

---

## 6. ゲームバランス調整

### 6.1 難易度カーブ

| 難易度レベル | シーン例                     | 推奨HSKレベル | 推定時間 |
| ----------- | ---------------------------- | ------------- | -------- |
| 1 (初級)    | 基本的な挨拶、簡単な質問     | HSK 1級       | 20秒     |
| 2 (中級)    | 日常会話、買い物、レストラン | HSK 1-2級     | 30秒     |
| 3 (上級)    | 複雑な状況説明、意見交換     | HSK 2-3級     | 45秒     |
| 4 (最上級)  | ビジネスシーン、専門的な話題 | HSK 3級以上   | 60秒     |

### 6.2 評価システム

| 評価    | 条件                           | FSRS係数 (概算) | 備考 |
| ------- | ------------------------------ | -------- | ---------- |
| Perfect | 最も自然で適切な表現を選択     | 安定性 ×3.3 | `Math.exp(1.2)` |
| Good    | 文法的に正しく、意味は通じる   | 安定性 ×2.2 | `Math.exp(0.8)` |
| OK      | 意味は通じるが、より自然な表現 | 安定性 ×1.35 | `Math.exp(0.3)` |
| Poor    | 文法的に誤り、または文脈に合わない | 安定性 ×0.5 | 難易度上昇 |

※ 正確な計算式は `3.1.4 SRS更新` のコードを参照。難易度(`difficulty`)によって係数は変動します。

### 6.3 選択肢の難易度

- **Perfect**: 最も自然で適切な表現（1つ）
- **Good**: 文法的に正しいが、やや不自然（0-1つ）
- **OK**: 意味は通じるが、文脈に合わない（1-2つ）
- **Poor**: 文法的に誤りがある（1-2つ）

---

## 7. テストケース

### 7.1 機能テスト

1. **シーン表示テスト**
   - 様々なカテゴリー・難易度のシーン表示
   - 会話の流れの表示
   - 選択肢の生成

2. **評価テスト**
   - 各評価レベルの判定
   - SRS更新の計算
   ```typescript
   describe('SRS Update', () => {
     it('Perfect評価でdifficulty減、stability大幅増', () => {
       const scene = createTestScene({ difficulty: 5, stability: 2.0 });
       updateSRSAfterScene(scene, { rating: 'perfect' });
       expect(scene.srs_data.difficulty).toBeLessThan(5); // 難易度低下
       expect(scene.srs_data.stability).toBeGreaterThan(2.0); // 安定性増加
     });

     it('Poor評価でdifficulty増、stability減', () => {
       const scene = createTestScene({ difficulty: 5, stability: 5.0 });
       updateSRSAfterScene(scene, { rating: 'poor' });
       expect(scene.srs_data.difficulty).toBeGreaterThan(5); // 難易度上昇
       expect(scene.srs_data.stability).toBeLessThan(5.0); // 安定性低下
     });
   });
   ```

3. **UI操作テスト**
   - 選択肢の選択
   - フィードバックの表示
   - 音声読み上げ

### 7.2 パフォーマンステスト

- 100シーン連続プレイ時のメモリ使用量
- アニメーションのフレームレート（60fps維持）
- 音声読み上げの遅延

---

## 8. 今後の拡張案

1. **マルチプレイヤー**: 友達との対戦モード
2. **カスタムシーン**: ユーザーが独自のシーンを追加
3. **録音機能**: 自分の発音を録音して比較
4. **会話の続き**: 選択に応じて会話が分岐
5. **ロールプレイモード**: AIと実際に会話する
6. **統計ダッシュボード**: 詳細な学習分析
7. **カテゴリー別モード**: 特定のカテゴリーに集中
8. **難易度調整**: 自動的に難易度を調整

---

## 9. 参考資料

- エビングハウスの忘却曲線理論
- FSRS（Free Spaced Repetition Scheduler）
- 中国語会話表現のベストプラクティス
- ゲーミフィケーション理論
- 第二言語習得理論（SLA）

---

## 10. 実装ノート

### 10.1 データ永続化

- **LocalStorageキー**:
  - `conversation_simulator_scenes`: シーンデータ（Map形式のオブジェクト: `{ [scene_id: number]: ConversationScene }`）
  - `conversation_simulator_progress`: 進捗データ（Map形式のオブジェクト: `{ [scene_id: number]: SRSData }`）
  - `conversation_simulator_session`: 現在のセッション状態（scene_ids、current_scene_index、results、settings）

### 10.2 更新頻度

- **SRS更新**: 各シーン終了時
- **LocalStorage保存**: ストア更新時に自動保存

### 10.3 シーンの状態遷移

1. **新規**: 初めてプレイするシーン
2. **復習待ち**: 次回復習日が来たシーン
3. **習得済み**: 長期記憶に定着したシーン（間隔が30日以上）

### 10.4 選択肢生成のロジック

選択肢は以下の優先順位で生成します：

1. **正解**: 常に1つ含める
2. **文法エラー**: 難易度が高い場合に追加
3. **文脈エラー**: 常に1つ含める
4. **フォーマル度エラー**: フォーマル度が重要な場合に追加
5. **意味エラー**: 部分正解として追加
