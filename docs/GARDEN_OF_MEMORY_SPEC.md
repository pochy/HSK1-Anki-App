# 育成シミュレーション：記憶の庭 (Garden of Memory) - 詳細仕様書

## 1. ゲーム概要

### 1.1 基本情報
- **ゲーム名**: 記憶の庭 (Garden of Memory)
- **ジャンル**: 放置系育成ゲーム / ガーデニング / シミュレーション
- **学習対象**: 英単語、歴史年号、法律用語、定義などの暗記項目
- **ターゲット層**: コツコツと積み上げることに喜びを感じる学習者、癒やしを求める層
- **プレイ時間**: 1セッション 3-10分（放置時間含む）

### 1.2 コアコンセプト
ユーザーの脳内にある知識の集合体を「庭園」として可視化します。各知識は一本の「植物」です。学習直後の植物は水分をたっぷり含んでいますが、忘却曲線に従って時間とともに水分が蒸発（Decay）し、最終的に枯れてしまいます。プレイヤーの役割は、枯れる直前の「最適なタイミング」で水（復習）を与え、植物をより強壮な形態へと進化させることです。

### 1.3 学習目標
- 長期記憶の定着
- 最適な復習タイミングの学習
- 視覚的な進捗管理
- ストレスフリーな学習体験

---

## 2. データ構造

### 2.1 植物データ構造

```typescript
interface Plant {
  plant_id: string;                   // ユニークID（例: "vocab_apple"）
  content: CardContent;                // カード内容
  visual_state: VisualState;           // 視覚状態
  status: PlantStatus;                 // 状態
  srs_parameters: SRSParameters;      // SRSパラメータ
  evolution_data: EvolutionData;       // 進化データ
  metadata: PlantMetadata;             // メタデータ
}

interface CardContent {
  question: string;                    // 問題
  answer: string;                      // 答え
  category?: string;                   // カテゴリー
  tags?: string[];                     // タグ
}

interface VisualState {
  type: PlantType;                     // 植物タイプ
  stage: GrowthStage;                  // 成長段階
  color_code: string;                  // カラーコード（水分量に応じて変化）
  position: Position;                  // 庭内の位置
  size: number;                        // サイズ（0.5 - 2.0）
}

type PlantType = 
  | "AppleTree"       // りんごの木
  | "Rose"            // バラ
  | "Sunflower"       // ひまわり
  | "Bamboo"          // 竹
  | "Oak"             // 樫の木
  | "Lotus"           // 蓮
  | "CherryBlossom"   // 桜
  | "Cactus"          // サボテン
  | "Fern"            // シダ
  | "Lavender";       // ラベンダー

type GrowthStage = 
  | 0  // Seed（種）
  | 1  // Sprout（芽）
  | 2  // Sapling（若木）
  | 3  // Mature Tree（成木）
  | 4; // Ancient Guardian（古木/精霊）

interface Position {
  x: number;                          // X座標（0-100）
  y: number;                          // Y座標（0-100）
  grid_index?: number;                // グリッドインデックス（オプション）
}

interface PlantStatus {
  hydration: number;                  // 水分量（0.0 - 100.0%）
  withered: boolean;                   // 枯死フラグ
  health: number;                      // 健康度（0-100）
  last_watered: number;               // 最終水やり時刻（Unix timestamp）
  warning_threshold: number;          // 警告閾値（デフォルト: 20%）
}

interface SRSParameters {
  last_watered: number;               // Unix Timestamp
  decay_rate: number;                  // 1時間あたりの水分減少量
  stability: number;                   // 記憶の安定性（日数）
  interval: number;                    // 次回復習間隔（日）
  ease_factor: number;                // 難易度係数
  review_count: number;                // 復習回数
  next_review: string;                 // 次回復習日（ISO 8601）
}

interface EvolutionData {
  current_stage: GrowthStage;
  experience: number;                  // 経験値
  experience_to_next: number;          // 次段階までの必要経験値
  evolution_history: EvolutionEvent[]; // 進化履歴
  special_abilities: SpecialAbility[]; // 特殊能力
}

interface EvolutionEvent {
  timestamp: number;
  from_stage: GrowthStage;
  to_stage: GrowthStage;
  trigger: string;                    // 進化のきっかけ
}

interface SpecialAbility {
  id: string;
  name: string;
  description: string;
  effect: AbilityEffect;
  unlocked_at_stage: GrowthStage;
}

interface AbilityEffect {
  type: "buff" | "debuff" | "passive";
  target: "self" | "nearby" | "category";
  value: number;
  duration?: number;                   // 秒（passiveの場合はundefined）
}

interface PlantMetadata {
  created_at: string;                 // 作成日
  first_watered: string;               // 初回水やり日
  total_water_count: number;           // 総水やり回数
  perfect_water_count: number;         // 完璧なタイミングでの水やり回数
  category_color: string;              // カテゴリー色
}
```

### 2.2 庭園データ構造

```typescript
interface Garden {
  garden_id: string;                   // 庭園ID
  plants: Plant[];                     // 植物リスト
  layout: GardenLayout;                // レイアウト設定
  statistics: GardenStatistics;        // 統計情報
  settings: GardenSettings;             // 設定
  weather: Weather;                     // 天候（装飾的）
}

interface GardenLayout {
  type: LayoutType;                    // レイアウトタイプ
  grid_size: number;                   // グリッドサイズ（10x10, 15x15など）
  theme: GardenTheme;                  // テーマ
  decorations: Decoration[];           // 装飾品
}

type LayoutType = 
  | "grid"           // グリッド配置
  | "isometric"      // アイソメトリック
  | "free"           // 自由配置
  | "spiral";        // 螺旋配置

type GardenTheme = 
  | "japanese"       // 日本庭園
  | "english"       // イングリッシュガーデン
  | "tropical"       // 熱帯
  | "minimalist"     // ミニマリスト
  | "fantasy";       // ファンタジー

interface Decoration {
  id: string;
  type: DecorationType;
  position: Position;
  unlocked: boolean;
}

type DecorationType = 
  | "fountain"      // 噴水
  | "bench"         // ベンチ
  | "path"          // 小道
  | "statue"        // 像
  | "lantern"       // 灯籠
  | "bridge";       // 橋

interface GardenStatistics {
  total_plants: number;
  healthy_plants: number;
  withered_plants: number;
  average_hydration: number;
  total_experience: number;
  garden_level: number;
  days_active: number;
  perfect_water_ratio: number;          // 完璧なタイミングでの水やり比率
}

interface GardenSettings {
  auto_water_enabled: boolean;          // 自動水やり（非推奨）
  notification_enabled: boolean;        // 通知有効化
  notification_threshold: number;       // 通知閾値（水分量%）
  show_warnings: boolean;               // 警告表示
  animation_speed: number;              // アニメーション速度（0.5-2.0）
  sound_enabled: boolean;               // 音声効果
}
```

### 2.3 水やりセッションデータ

```typescript
interface WateringSession {
  session_id: string;
  plant_id: string;
  start_time: number;
  end_time?: number;
  quiz_result: QuizResult;
  hydration_before: number;
  hydration_after: number;
  crisis_bonus: boolean;               // 危機回避ボーナス
  experience_gained: number;
  evolution_triggered: boolean;
}

interface QuizResult {
  question: string;
  user_answer: string;
  correct_answer: string;
  is_correct: boolean;
  time_taken: number;                  // 回答時間（秒）
  attempts: number;                     // 試行回数
  rating: QuizRating;
}

type QuizRating = "perfect" | "good" | "ok" | "poor";
```

---

## 3. ゲームロジック

### 3.1 水分減衰システム（Real-time Decay）

```typescript
function calculateCurrentHydration(
  plant: Plant,
  currentTime: number
): number {
  const timeSinceWatered = (currentTime - plant.status.last_watered) / 3600; // 時間単位
  const decayAmount = timeSinceWatered * plant.srs_parameters.decay_rate;
  const newHydration = Math.max(0, plant.status.hydration - decayAmount);
  
  return newHydration;
}

function updateDecayRate(
  stability: number,
  stage: GrowthStage
): number {
  // 安定性が高いほど、進化段階が高いほど減衰率が低い
  const baseDecayRate = 10.0; // 初期減衰率（%/時間）
  const stabilityModifier = Math.max(0.1, 1.0 / (stability / 10));
  const stageModifier = {
    0: 1.0,   // Seed: 減衰率100%
    1: 0.8,   // Sprout: 80%
    2: 0.6,   // Sapling: 60%
    3: 0.4,   // Mature: 40%
    4: 0.2    // Ancient: 20%
  }[stage];
  
  return baseDecayRate * stabilityModifier * stageModifier;
}

function checkWithered(hydration: number): boolean {
  return hydration <= 0;
}
```

### 3.2 水やりイベント（Review Session）

```typescript
function waterPlant(
  plant: Plant,
  quizResult: QuizResult,
  currentTime: number
): WateringSession {
  const hydrationBefore = calculateCurrentHydration(plant, currentTime);
  const isCrisis = hydrationBefore <= plant.status.warning_threshold;
  
  let hydrationAfter: number;
  let experienceGained: number;
  let crisisBonus = false;
  
  if (quizResult.is_correct) {
    // 正解時
    hydrationAfter = 100.0;
    
    // 経験値計算
    const baseExp = 10;
    const stageBonus = plant.visual_state.stage * 5;
    const ratingBonus = {
      perfect: 5,
      good: 3,
      ok: 1,
      poor: 0
    }[quizResult.rating];
    
    experienceGained = baseExp + stageBonus + ratingBonus;
    
    // 危機回避ボーナス
    if (isCrisis) {
      experienceGained *= 2;
      crisisBonus = true;
    }
    
    // 過剰な水やりペナルティ
    if (hydrationBefore >= 90) {
      experienceGained *= 0.1; // 90%減
    }
    
    // SRS更新
    updateSRSAfterReview(plant, quizResult);
  } else {
    // 不正解時
    hydrationAfter = Math.min(100, hydrationBefore + 20); // 部分回復
    experienceGained = 0;
    
    // SRS更新（間隔を短縮）
    plant.srs_parameters.interval = Math.max(1, plant.srs_parameters.interval * 0.5);
  }
  
  // 植物状態更新
  plant.status.hydration = hydrationAfter;
  plant.status.last_watered = currentTime;
  plant.status.withered = false;
  plant.evolution_data.experience += experienceGained;
  
  // 進化チェック
  const evolutionTriggered = checkEvolution(plant);
  
  return {
    session_id: generateId(),
    plant_id: plant.plant_id,
    start_time: currentTime,
    end_time: currentTime,
    quiz_result: quizResult,
    hydration_before: hydrationBefore,
    hydration_after: hydrationAfter,
    crisis_bonus: crisisBonus,
    experience_gained: experienceGained,
    evolution_triggered: evolutionTriggered
  };
}

function updateSRSAfterReview(
  plant: Plant,
  quizResult: QuizResult
): void {
  const rating = quizResult.rating;
  
  switch (rating) {
    case "perfect":
      plant.srs_parameters.interval *= 2.5;
      plant.srs_parameters.stability *= 1.3;
      plant.srs_parameters.ease_factor = Math.min(
        plant.srs_parameters.ease_factor + 0.15,
        3.0
      );
      break;
    case "good":
      plant.srs_parameters.interval *= 1.8;
      plant.srs_parameters.stability *= 1.15;
      break;
    case "ok":
      plant.srs_parameters.interval *= 1.2;
      plant.srs_parameters.stability *= 1.05;
      break;
    case "poor":
      plant.srs_parameters.interval *= 0.8;
      plant.srs_parameters.stability *= 0.9;
      plant.srs_parameters.ease_factor = Math.max(
        plant.srs_parameters.ease_factor - 0.1,
        1.3
      );
      break;
  }
  
  // 次回復習日の計算
  const nextReviewDate = new Date();
  nextReviewDate.setDate(nextReviewDate.getDate() + plant.srs_parameters.interval);
  plant.srs_parameters.next_review = nextReviewDate.toISOString();
  plant.srs_parameters.review_count++;
  
  // 減衰率の更新
  plant.srs_parameters.decay_rate = updateDecayRate(
    plant.srs_parameters.stability,
    plant.visual_state.stage
  );
}
```

### 3.3 進化システム（Evolution）

```typescript
function checkEvolution(plant: Plant): boolean {
  const currentExp = plant.evolution_data.experience;
  const requiredExp = plant.evolution_data.experience_to_next;
  
  if (currentExp >= requiredExp && plant.visual_state.stage < 4) {
    evolvePlant(plant);
    return true;
  }
  
  return false;
}

function evolvePlant(plant: Plant): void {
  const oldStage = plant.visual_state.stage;
  const newStage = (oldStage + 1) as GrowthStage;
  
  // 進化
  plant.visual_state.stage = newStage;
  plant.evolution_data.current_stage = newStage;
  
  // 経験値リセット
  plant.evolution_data.experience = 0;
  plant.evolution_data.experience_to_next = calculateRequiredExp(newStage);
  
  // 進化履歴に記録
  plant.evolution_data.evolution_history.push({
    timestamp: Date.now(),
    from_stage: oldStage,
    to_stage: newStage,
    trigger: "experience_threshold"
  });
  
  // 特殊能力の獲得
  checkSpecialAbilities(plant, newStage);
  
  // 視覚的変化
  updateVisualState(plant);
}

function calculateRequiredExp(stage: GrowthStage): number {
  const baseExp = {
    0: 50,   // Seed -> Sprout
    1: 100,  // Sprout -> Sapling
    2: 200,  // Sapling -> Mature
    3: 500   // Mature -> Ancient
  };
  return baseExp[stage] || 0;
}

function checkSpecialAbilities(plant: Plant, stage: GrowthStage): void {
  // Ancient段階で特殊能力を獲得
  if (stage === 4) {
    plant.evolution_data.special_abilities.push({
      id: "growth_aura",
      name: "成長のオーラ",
      description: "周囲の植物の成長を促進する",
      effect: {
        type: "buff",
        target: "nearby",
        value: 1.2 // 20%成長促進
      },
      unlocked_at_stage: 4
    });
  }
}
```

### 3.4 色の動的変化

```typescript
function calculateColorCode(hydration: number, stage: GrowthStage): string {
  // 水分量に基づく色の計算
  let hue: number;
  let saturation: number;
  let lightness: number;
  
  if (hydration >= 80) {
    // 健康: 鮮やかな緑
    hue = 120;
    saturation = 70;
    lightness = 50;
  } else if (hydration >= 50) {
    // やや乾燥: 黄緑
    hue = 90;
    saturation = 60;
    lightness = 55;
  } else if (hydration >= 30) {
    // 乾燥: 黄色
    hue = 60;
    saturation = 70;
    lightness = 60;
  } else if (hydration >= 20) {
    // 警告: オレンジ
    hue = 30;
    saturation = 80;
    lightness = 55;
  } else if (hydration > 0) {
    // 危機: 茶色
    hue = 20;
    saturation = 70;
    lightness = 40;
  } else {
    // 枯死: 灰色
    hue = 0;
    saturation = 0;
    lightness = 30;
  }
  
  // 成長段階による色の濃淡調整
  const stageModifier = {
    0: 0.7,  // Seed: 薄い
    1: 0.8,
    2: 0.9,
    3: 1.0,  // Mature: 標準
    4: 1.1   // Ancient: 濃い
  }[stage];
  
  lightness *= stageModifier;
  
  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}
```

---

## 4. UI/UX設計

### 4.1 画面レイアウト

#### 4.1.1 庭の全景ビュー

```
┌─────────────────────────────────────┐
│  [統計] [設定] [フィルター]         │
├─────────────────────────────────────┤
│                                     │
│         [庭園ビュー]                │
│                                     │
│    🌱  🌿  🌳  🌲  🌴              │
│                                     │
│    🍎  🌹  🌻  🎋  🌳              │
│                                     │
│    [警告マーク: !]                  │
│                                     │
├─────────────────────────────────────┤
│  [水やり待ち: 5] [健康: 12/15]     │
└─────────────────────────────────────┘
```

#### 4.1.2 植物詳細ビュー

```
┌─────────────────────────────────────┐
│  [← 戻る]                           │
├─────────────────────────────────────┤
│                                     │
│         [植物の3D表示]              │
│                                     │
│    🌳 (Mature Tree)                 │
│                                     │
│    水分: ████████░░ 80%            │
│    健康: ██████████ 100%           │
│    経験: ████████░░ 80/100        │
│                                     │
├─────────────────────────────────────┤
│  [問題]                              │
│  "りんご"                           │
│                                     │
│  [答えを入力]                        │
│  [________________]                  │
│                                     │
│  [水やり] [スキップ]                │
└─────────────────────────────────────┘
```

### 4.2 視覚効果

#### 4.2.1 リアルタイム色変化
- 水分量に応じて植物の色がリアルタイムに変化
- グラデーションアニメーション
- 枯死時はグレースケール化

#### 4.2.2 警告システム
- 水分量が20%以下で「！」マークが点滅
- 植物が微かに揺れる
- 画面端に通知バナー

#### 4.2.3 水やりエフェクト
- 水が注がれるアニメーション
- 植物が成長するアニメーション
- パーティクルエフェクト（水滴、光）

#### 4.2.4 進化エフェクト
- 光に包まれるアニメーション
- 形状変化のモーフィング
- 進化音とファンファーレ

### 4.3 通知システム

```typescript
interface Notification {
  id: string;
  type: NotificationType;
  plant_id: string;
  message: string;
  priority: "low" | "medium" | "high";
  timestamp: number;
}

type NotificationType = 
  | "hydration_low"      // 水分不足
  | "hydration_critical" // 水分危機
  | "evolution"          // 進化
  | "achievement"        // アチーブメント
  | "daily_reminder";    // 日次リマインダー

function generateNotification(plant: Plant): Notification | null {
  const hydration = calculateCurrentHydration(plant, Date.now());
  
  if (hydration <= 10 && !plant.status.withered) {
    return {
      id: generateId(),
      type: "hydration_critical",
      plant_id: plant.plant_id,
      message: `${plant.content.question} が枯れそうです！`,
      priority: "high",
      timestamp: Date.now()
    };
  } else if (hydration <= 20) {
    return {
      id: generateId(),
      type: "hydration_low",
      plant_id: plant.plant_id,
      message: `${plant.content.question} に水が必要です`,
      priority: "medium",
      timestamp: Date.now()
    };
  }
  
  return null;
}
```

---

## 5. 実装詳細

### 5.1 技術スタック（推奨）

- **フロントエンド**: React / Vue.js / Svelte
- **3Dレンダリング**: Three.js / Babylon.js（オプション）
- **アニメーション**: Framer Motion / GSAP
- **状態管理**: Redux / Zustand / Pinia
- **データ永続化**: IndexedDB
- **バックグラウンド処理**: Web Workers
- **通知**: Web Notifications API

### 5.2 パフォーマンス最適化

1. **レンダリング最適化**
   - 画面外の植物は非表示
   - LOD（Level of Detail）システム
   - インスタンシング（同じ植物タイプの一括描画）

2. **計算の最適化**
   - 水分計算をWeb Workerで実行
   - バッチ更新（1秒ごと）
   - キャッシュの活用

3. **メモリ管理**
   - 使用されていない植物データのアーカイブ
   - 画像の遅延読み込み
   - オブジェクトプーリング

### 5.3 オフライン対応

- Service Workerによるオフライン動作
- ローカルストレージへの自動保存
- 同期機能（オンライン復帰時）

---

## 6. ゲームバランス調整

### 6.1 減衰率の設定

| 成長段階 | 初期減衰率（%/時間） | 安定性10の場合 | 安定性30の場合 |
|---------|-------------------|--------------|--------------|
| Seed    | 10.0              | 10.0         | 3.3          |
| Sprout  | 8.0               | 8.0          | 2.7          |
| Sapling | 6.0               | 6.0          | 2.0          |
| Mature  | 4.0               | 4.0          | 1.3          |
| Ancient | 2.0               | 2.0          | 0.7          |

### 6.2 経験値システム

| 評価 | 基本経験値 | 段階ボーナス | 危機ボーナス |
|-----|----------|------------|------------|
| Perfect | 10 | +5/段階 | ×2 |
| Good | 10 | +3/段階 | ×2 |
| OK | 10 | +1/段階 | ×2 |
| Poor | 5 | 0 | ×2 |

### 6.3 進化要件

| 段階 | 必要経験値 | 追加条件 |
|-----|----------|---------|
| Seed → Sprout | 50 | 復習3回以上 |
| Sprout → Sapling | 100 | 復習5回以上、安定性5以上 |
| Sapling → Mature | 200 | 復習10回以上、安定性10以上 |
| Mature → Ancient | 500 | 復習20回以上、安定性20以上 |

---

## 7. 特殊機能

### 7.1 関連植物の成長促進

Ancient段階の植物は、周囲の植物の成長を促進するバフ効果を持ちます。

```typescript
function applyGrowthAura(garden: Garden): void {
  const ancientPlants = garden.plants.filter(
    p => p.visual_state.stage === 4
  );
  
  for (const ancient of ancientPlants) {
    const nearbyPlants = getNearbyPlants(garden, ancient, 2); // 半径2以内
    
    for (const nearby of nearbyPlants) {
      if (nearby.plant_id !== ancient.plant_id) {
        // 経験値獲得ボーナス
        nearby.evolution_data.experience += 1;
      }
    }
  }
}
```

### 7.2 カテゴリー別の視覚化

同じカテゴリーの植物は、色や配置でグループ化されます。

### 7.3 季節イベント

- 春: 新規植物の成長速度アップ
- 夏: 減衰率がやや上昇
- 秋: 収穫イベント（経験値ボーナス）
- 冬: 保護モード（減衰率低下）

---

## 8. テストケース

### 8.1 機能テスト

1. **減衰計算テスト**
   - 様々な時間経過での水分量計算
   - 境界値テスト（0%, 20%, 50%, 80%, 100%）

2. **進化テスト**
   - 各段階への進化条件
   - 特殊能力の獲得

3. **通知テスト**
   - 閾値での通知発火
   - プッシュ通知の動作

### 8.2 パフォーマンステスト

- 1000植物でのレンダリング性能
- リアルタイム計算の負荷
- メモリ使用量の監視

---

## 9. 今後の拡張案

1. **マルチプレイヤー**: 友達の庭を訪問
2. **植物の交配**: 2つの植物から新しい植物を作成
3. **装飾品システム**: 庭のカスタマイズ
4. **アチーブメント**: 様々な達成条件
5. **統計ダッシュボード**: 詳細な学習分析
6. **AR機能**: 現実世界に植物を表示

---

## 10. 参考資料

- エビングハウスの忘却曲線理論
- FSRSアルゴリズム
- ガーデニングゲームのベストプラクティス
- ゲーミフィケーション理論

