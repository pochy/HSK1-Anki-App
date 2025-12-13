# 文明維持シミュレーション (Civ-Style Maintenance) - 詳細仕様書

## 1. ゲーム概要

### 1.1 基本情報
- **ゲーム名**: 文明維持シミュレーション (Civ-Style Maintenance)
- **ジャンル**: 街づくり / 経営シミュレーション / ストラテジー
- **学習対象**: カテゴリ分け（階層構造）できる知識（法律、医学、IT用語、歴史）
- **ターゲット層**: 体系的な知識を身に着けたい層、マクロな視点で学習管理したい層
- **プレイ時間**: 1セッション 10-20分（放置時間含む）

### 1.2 コアコンセプト
知識のカテゴリ（例：英単語、文法、リスニング）ごとに、「図書館」「病院」「発電所」「農場」などの施設を建設し、文明を発展させます。個々の知識カードは、その施設を稼働させる「構成員」や「部品」です。復習を怠ると、その知識カードは機能を停止し、関連する施設の稼働率が下がり、街全体が荒廃（スラム化）していきます。

### 1.3 学習目標
- 体系的な知識の管理
- カテゴリー別の学習進捗把握
- マクロな視点での学習戦略
- 長期記憶の維持

---

## 2. データ構造

### 2.1 施設データ構造

```typescript
interface Building {
  building_id: string;                 // ユニークID（例: "b_library_english"）
  type: BuildingType;                  // 施設タイプ
  name: string;                        // 施設名
  category_tag: string;                 // カテゴリータグ
  level: number;                       // レベル（1-10）
  metrics: BuildingMetrics;            // メトリクス
  cards: CardReference[];              // 所属カード
  position: Position;                  // 位置
  visual_state: BuildingVisualState;   // 視覚状態
  upgrades: BuildingUpgrade[];          // アップグレード
  metadata: BuildingMetadata;          // メタデータ
}

type BuildingType = 
  | "library"        // 図書館（語学、文学）
  | "hospital"        // 病院（医学、生物学）
  | "power_plant"     // 発電所（物理、化学）
  | "farm"           // 農場（生物学、農業）
  | "factory"        // 工場（技術、工学）
  | "school"         // 学校（教育、一般知識）
  | "museum"         // 博物館（歴史、美術）
  | "research_lab"   // 研究所（科学、研究）
  | "court"          // 裁判所（法律）
  | "bank";          // 銀行（経済、金融）

interface BuildingMetrics {
  maintenance_level: number;           // 維持レベル（0.0 - 1.0）
  population: number;                  // 所属カード数
  active_cards: number;                // アクティブカード数
  output_per_tick: number;             // ティックあたりの生産リソース
  efficiency: number;                  // 効率（0.0 - 1.0）
  happiness: number;                   // 幸福度（0-100）
  decay_rate: number;                  // 減衰率（%/時間）
}

interface CardReference {
  id: string;                          // カードID
  status: CardStatus;                  // カード状態
  next_review: string;                 // 次回復習日（ISO 8601）
  last_review?: string;                // 最終復習日
  warning: boolean;                    // 警告フラグ
  contribution: number;                // 貢献度（0-100）
}

type CardStatus = 
  | "active"      // アクティブ
  | "decaying"    // 減衰中
  | "inactive"    // 非アクティブ
  | "broken";     // 破損

interface Position {
  x: number;                          // X座標（グリッド）
  y: number;                          // Y座標（グリッド）
  grid_index: number;                 // グリッドインデックス
}

interface BuildingVisualState {
  appearance: BuildingAppearance;      // 外観
  condition: BuildingCondition;       // 状態
  effects: VisualEffect[];             // 視覚効果
}

type BuildingAppearance = 
  | "pristine"    // 完璧
  | "good"        // 良好
  | "fair"        // 普通
  | "poor"        // 悪い
  | "ruined";     // 廃墟

type BuildingCondition = 
  | "operational"  // 稼働中
  | "degraded"     // 劣化
  | "critical"     // 危機的
  | "shutdown";    // 停止

interface VisualEffect {
  type: "smoke" | "sparkle" | "dust" | "glow";
  intensity: number;                   // 強度（0-1）
  color: string;                      // 色
}

interface BuildingUpgrade {
  upgrade_id: string;                  // アップグレードID
  name: string;                        // 名前
  description: string;                 // 説明
  cost: UpgradeCost;                   // コスト
  effect: UpgradeEffect;               // 効果
  unlocked: boolean;                   // アンロック済み
  applied: boolean;                    // 適用済み
}

interface UpgradeCost {
  resources: ResourceAmount[];          // リソース
  cards_required: number;              // 必要カード数
  level_required: number;              // 必要レベル
}

interface ResourceAmount {
  type: ResourceType;                  // リソースタイプ
  amount: number;                      // 量
}

type ResourceType = 
  | "knowledge"    // 知識
  | "energy"       // エネルギー
  | "materials"    // 材料
  | "gold";        // ゴールド

interface UpgradeEffect {
  type: "efficiency_boost" | "capacity_increase" | "decay_reduction" | "output_boost";
  value: number;                       // 値
  duration?: number;                   // 持続時間（永続の場合はundefined）
}

interface BuildingMetadata {
  constructed_date: string;            // 建設日
  total_output: number;                 // 総生産量
  maintenance_count: number;           // メンテナンス回数
  upgrade_count: number;               // アップグレード回数
  category: string;                    // カテゴリー
}
```

### 2.2 カードデータ構造

```typescript
interface Card {
  card_id: string;                     // カードID
  content: CardContent;                // カード内容
  category: string;                    // カテゴリー
  building_id?: string;                // 所属施設ID
  status: CardStatus;                  // 状態
  srs_data: SRSData;                   // SRSデータ
  contribution: number;                // 貢献度（0-100）
  last_review?: string;                // 最終復習日
  next_review: string;                 // 次回復習日
  warning: boolean;                    // 警告フラグ
  metadata: CardMetadata;              // メタデータ
}

interface CardContent {
  question: string;                    // 問題
  answer: string;                      // 答え
  category: string;                    // カテゴリー
  subcategory?: string;                // サブカテゴリー
  tags: string[];                      // タグ
}

interface SRSData {
  next_review: string;                 // 次回復習日（ISO 8601）
  interval: number;                    // 間隔（日）
  ease_factor: number;                 // 難易度係数
  review_count: number;                // 復習回数
  stability: number;                   // 安定性
  last_review_date?: string;           // 最終復習日
}

interface CardMetadata {
  created_date: string;                // 作成日
  total_reviews: number;               // 総復習回数
  perfect_reviews: number;             // 完璧な復習回数
  category_color: string;              // カテゴリー色
}
```

### 2.3 都市データ構造

```typescript
interface City {
  city_id: string;                     // 都市ID
  name: string;                        // 都市名
  buildings: Building[];                // 施設リスト
  layout: CityLayout;                  // レイアウト
  resources: ResourceInventory;         // リソース在庫
  statistics: CityStatistics;          // 統計情報
  settings: CitySettings;              // 設定
  level: number;                       // 都市レベル
  population: number;                  // 総人口（総カード数）
}

interface CityLayout {
  grid_size: number;                   // グリッドサイズ（20x20など）
  theme: CityTheme;                    // テーマ
  districts: District[];               // 地区
  roads: Road[];                       // 道路
}

type CityTheme = 
  | "modern"       // モダン
  | "medieval"     // 中世
  | "futuristic"   // 未来
  | "industrial"   // 工業
  | "organic";     // 有機的

interface District {
  district_id: string;                 // 地区ID
  name: string;                        // 地区名
  type: DistrictType;                  // 地区タイプ
  buildings: string[];                 // 施設IDリスト
  boundaries: Position[];              // 境界
}

type DistrictType = 
  | "residential"  // 住宅
  | "commercial"   // 商業
  | "industrial"   // 工業
  | "educational"  // 教育
  | "cultural"     // 文化
  | "medical";      // 医療

interface Road {
  road_id: string;                     // 道路ID
  start: Position;                     // 開始位置
  end: Position;                       // 終了位置
  type: RoadType;                      // 道路タイプ
}

type RoadType = 
  | "dirt"        // 土道
  | "paved"       // 舗装
  | "highway";    // 高速道路

interface ResourceInventory {
  knowledge: number;                    // 知識
  energy: number;                       // エネルギー
  materials: number;                    // 材料
  gold: number;                         // ゴールド
  max_capacity: ResourceCapacity;       // 最大容量
}

interface ResourceCapacity {
  knowledge: number;
  energy: number;
  materials: number;
  gold: number;
}

interface CityStatistics {
  total_buildings: number;              // 総施設数
  operational_buildings: number;       // 稼働施設数
  total_cards: number;                  // 総カード数
  active_cards: number;                 // アクティブカード数
  average_maintenance: number;          // 平均維持レベル
  total_output: number;                 // 総生産量
  city_happiness: number;               // 都市幸福度（0-100）
  days_active: number;                  // 活動日数
  growth_rate: number;                  // 成長率（%/日）
}

interface CitySettings {
  auto_maintenance: boolean;            // 自動メンテナンス
  notification_enabled: boolean;        // 通知有効化
  notification_threshold: number;       // 通知閾値（維持レベル%）
  show_warnings: boolean;               // 警告表示
  animation_speed: number;              // アニメーション速度
  sound_enabled: boolean;               // 音声効果
}
```

### 2.4 メンテナンスセッションデータ

```typescript
interface MaintenanceSession {
  session_id: string;                   // セッションID
  building_id: string;                  // 施設ID
  start_time: number;                  // 開始時刻
  end_time?: number;                   // 終了時刻
  cards_reviewed: CardReview[];         // 復習したカード
  maintenance_level_before: number;     // メンテナンス前の維持レベル
  maintenance_level_after: number;      // メンテナンス後の維持レベル
  resources_gained: ResourceAmount[];    // 獲得リソース
  building_upgraded: boolean;           // 施設アップグレードフラグ
}

interface CardReview {
  card_id: string;                     // カードID
  quiz_result: QuizResult;             // クイズ結果
  contribution_before: number;          // 復習前の貢献度
  contribution_after: number;           // 復習後の貢献度
  status_before: CardStatus;           // 復習前の状態
  status_after: CardStatus;             // 復習後の状態
}

interface QuizResult {
  question: string;                    // 問題
  user_answer: string;                  // ユーザー回答
  correct_answer: string;               // 正解
  is_correct: boolean;                  // 正誤
  time_taken: number;                   // 回答時間（秒）
  rating: QuizRating;                   // 評価
}

type QuizRating = "perfect" | "good" | "ok" | "poor";
```

---

## 3. ゲームロジック

### 3.1 維持レベルの計算

```typescript
function calculateMaintenanceLevel(
  building: Building,
  currentTime: number
): number {
  const activeCards = building.cards.filter(c => c.status === "active");
  if (activeCards.length === 0) return 0;
  
  // 各カードの貢献度を計算
  let totalContribution = 0;
  for (const cardRef of activeCards) {
    const card = getCardById(cardRef.id);
    if (!card) continue;
    
    // カードの状態を更新
    updateCardStatus(card, currentTime);
    
    // 貢献度を計算
    const contribution = calculateCardContribution(card, currentTime);
    cardRef.contribution = contribution;
    totalContribution += contribution;
  }
  
  // 平均貢献度を維持レベルとして使用
  const averageContribution = totalContribution / activeCards.length;
  return Math.max(0, Math.min(1, averageContribution / 100));
}

function calculateCardContribution(
  card: Card,
  currentTime: number
): number {
  // 基本貢献度
  let contribution = 50;
  
  // SRSデータに基づく貢献度
  const daysSinceReview = calculateDaysSinceReview(card);
  const expectedInterval = card.srs_data.interval;
  
  if (daysSinceReview <= expectedInterval * 0.5) {
    // 早めの復習: 貢献度高い
    contribution = 80 + (1 - daysSinceReview / (expectedInterval * 0.5)) * 20;
  } else if (daysSinceReview <= expectedInterval) {
    // 適切なタイミング: 貢献度標準
    contribution = 60 + (1 - (daysSinceReview - expectedInterval * 0.5) / (expectedInterval * 0.5)) * 20;
  } else if (daysSinceReview <= expectedInterval * 1.5) {
    // やや遅れ: 貢献度低下
    contribution = 40 + (1 - (daysSinceReview - expectedInterval) / (expectedInterval * 0.5)) * 20;
  } else {
    // 大幅に遅れ: 貢献度大幅低下
    contribution = Math.max(0, 40 - (daysSinceReview - expectedInterval * 1.5) * 5);
  }
  
  // 安定性による補正
  const stabilityBonus = Math.min(20, card.srs_data.stability / 2);
  contribution += stabilityBonus;
  
  // 復習回数による補正
  const reviewBonus = Math.min(10, card.srs_data.review_count / 10);
  contribution += reviewBonus;
  
  return Math.max(0, Math.min(100, contribution));
}

function updateCardStatus(
  card: Card,
  currentTime: number
): void {
  const daysSinceReview = calculateDaysSinceReview(card);
  const expectedInterval = card.srs_data.interval;
  
  if (daysSinceReview <= expectedInterval * 0.8) {
    card.status = "active";
    card.warning = false;
  } else if (daysSinceReview <= expectedInterval * 1.2) {
    card.status = "decaying";
    card.warning = daysSinceReview > expectedInterval;
  } else if (daysSinceReview <= expectedInterval * 2.0) {
    card.status = "inactive";
    card.warning = true;
  } else {
    card.status = "broken";
    card.warning = true;
  }
}

function calculateDaysSinceReview(card: Card): number {
  const lastReview = card.last_review 
    ? new Date(card.last_review).getTime()
    : new Date(card.srs_data.next_review).getTime() - (card.srs_data.interval * 24 * 60 * 60 * 1000);
  
  const now = Date.now();
  return (now - lastReview) / (24 * 60 * 60 * 1000);
}
```

### 3.2 施設の生産システム

```typescript
function calculateBuildingOutput(
  building: Building,
  currentTime: number
): number {
  const maintenanceLevel = calculateMaintenanceLevel(building, currentTime);
  const baseOutput = building.metrics.output_per_tick;
  const efficiency = building.metrics.efficiency;
  
  // 維持レベルと効率に基づく生産量
  const output = baseOutput * maintenanceLevel * efficiency;
  
  // レベルによる補正
  const levelMultiplier = 1 + (building.level - 1) * 0.1;
  
  return Math.floor(output * levelMultiplier);
}

function updateBuildingMetrics(
  building: Building,
  currentTime: number
): void {
  // 維持レベルの更新
  building.metrics.maintenance_level = calculateMaintenanceLevel(building, currentTime);
  
  // アクティブカード数の更新
  building.metrics.active_cards = building.cards.filter(
    c => c.status === "active"
  ).length;
  
  // 効率の計算
  const activeRatio = building.metrics.active_cards / building.metrics.population;
  building.metrics.efficiency = activeRatio;
  
  // 幸福度の計算
  building.metrics.happiness = Math.floor(
    building.metrics.maintenance_level * 100
  );
  
  // 外観の更新
  updateBuildingAppearance(building);
}

function updateBuildingAppearance(building: Building): void {
  const maintenance = building.metrics.maintenance_level;
  
  if (maintenance >= 0.9) {
    building.visual_state.appearance = "pristine";
    building.visual_state.condition = "operational";
  } else if (maintenance >= 0.7) {
    building.visual_state.appearance = "good";
    building.visual_state.condition = "operational";
  } else if (maintenance >= 0.5) {
    building.visual_state.appearance = "fair";
    building.visual_state.condition = "degraded";
  } else if (maintenance >= 0.3) {
    building.visual_state.appearance = "poor";
    building.visual_state.condition = "critical";
  } else {
    building.visual_state.appearance = "ruined";
    building.visual_state.condition = "shutdown";
  }
}
```

### 3.3 メンテナンスセッション

```typescript
function performMaintenance(
  building: Building,
  cardsToReview: Card[],
  currentTime: number
): MaintenanceSession {
  const maintenanceBefore = building.metrics.maintenance_level;
  const cardReviews: CardReview[] = [];
  
  for (const card of cardsToReview) {
    // クイズを実行
    const quizResult = executeQuiz(card);
    
    // カードの状態を更新
    const contributionBefore = calculateCardContribution(card, currentTime);
    const statusBefore = card.status;
    
    // SRS更新
    updateSRSAfterReview(card, quizResult);
    
    // カード状態の更新
    updateCardStatus(card, currentTime);
    
    const contributionAfter = calculateCardContribution(card, currentTime);
    const statusAfter = card.status;
    
    // カード参照の更新
    const cardRef = building.cards.find(c => c.id === card.card_id);
    if (cardRef) {
      cardRef.contribution = contributionAfter;
      cardRef.status = statusAfter;
      cardRef.next_review = card.srs_data.next_review;
      cardRef.warning = card.warning;
    }
    
    cardReviews.push({
      card_id: card.card_id,
      quiz_result: quizResult,
      contribution_before: contributionBefore,
      contribution_after: contributionAfter,
      status_before: statusBefore,
      status_after: statusAfter
    });
  }
  
  // 施設メトリクスの更新
  updateBuildingMetrics(building, currentTime);
  const maintenanceAfter = building.metrics.maintenance_level;
  
  // リソースの獲得
  const resourcesGained = calculateResourcesGained(
    building,
    cardReviews,
    maintenanceAfter - maintenanceBefore
  );
  
  // リソースを都市に追加
  addResourcesToCity(resourcesGained);
  
  // アップグレードチェック
  const buildingUpgraded = checkAndApplyUpgrades(building);
  
  return {
    session_id: generateId(),
    building_id: building.building_id,
    start_time: currentTime,
    end_time: currentTime,
    cards_reviewed: cardReviews,
    maintenance_level_before: maintenanceBefore,
    maintenance_level_after: maintenanceAfter,
    resources_gained: resourcesGained,
    building_upgraded: buildingUpgraded
  };
}

function calculateResourcesGained(
  building: Building,
  cardReviews: CardReview[],
  maintenanceImprovement: number
): ResourceAmount[] {
  const resources: ResourceAmount[] = [];
  
  // 知識リソース（正解数に基づく）
  const correctCount = cardReviews.filter(
    r => r.quiz_result.is_correct
  ).length;
  resources.push({
    type: "knowledge",
    amount: correctCount * 10
  });
  
  // エネルギーリソース（維持レベル改善に基づく）
  resources.push({
    type: "energy",
    amount: Math.floor(maintenanceImprovement * 100)
  });
  
  // 材料リソース（完璧な復習に基づく）
  const perfectCount = cardReviews.filter(
    r => r.quiz_result.rating === "perfect"
  ).length;
  resources.push({
    type: "materials",
    amount: perfectCount * 5
  });
  
  // ゴールド（総合評価に基づく）
  const totalRating = cardReviews.reduce((sum, r) => {
    const ratingValue = {
      perfect: 4,
      good: 3,
      ok: 2,
      poor: 1
    }[r.quiz_result.rating];
    return sum + ratingValue;
  }, 0);
  resources.push({
    type: "gold",
    amount: Math.floor(totalRating * 2.5)
  });
  
  return resources;
}
```

### 3.4 施設の建設とアップグレード

```typescript
function constructBuilding(
  buildingType: BuildingType,
  category: string,
  position: Position,
  city: City
): Building {
  const building: Building = {
    building_id: generateId(),
    type: buildingType,
    name: generateBuildingName(buildingType, category),
    category_tag: category,
    level: 1,
    metrics: {
      maintenance_level: 1.0,
      population: 0,
      active_cards: 0,
      output_per_tick: getBaseOutput(buildingType),
      efficiency: 1.0,
      happiness: 100,
      decay_rate: 1.0
    },
    cards: [],
    position: position,
    visual_state: {
      appearance: "pristine",
      condition: "operational",
      effects: []
    },
    upgrades: getAvailableUpgrades(buildingType),
    metadata: {
      constructed_date: new Date().toISOString(),
      total_output: 0,
      maintenance_count: 0,
      upgrade_count: 0,
      category: category
    }
  };
  
  city.buildings.push(building);
  return building;
}

function upgradeBuilding(
  building: Building,
  upgradeId: string,
  city: City
): boolean {
  const upgrade = building.upgrades.find(u => u.upgrade_id === upgradeId);
  if (!upgrade || upgrade.applied) return false;
  
  // コストチェック
  if (!canAffordUpgrade(upgrade, city.resources)) return false;
  
  // リソースを消費
  consumeResources(upgrade.cost.resources, city.resources);
  
  // アップグレードを適用
  applyUpgradeEffect(building, upgrade.effect);
  upgrade.applied = true;
  building.metadata.upgrade_count++;
  
  return true;
}

function applyUpgradeEffect(
  building: Building,
  effect: UpgradeEffect
): void {
  switch (effect.type) {
    case "efficiency_boost":
      building.metrics.efficiency = Math.min(
        1.0,
        building.metrics.efficiency + effect.value
      );
      break;
    case "capacity_increase":
      // カード容量の増加（実装に応じて）
      break;
    case "decay_reduction":
      building.metrics.decay_rate = Math.max(
        0.1,
        building.metrics.decay_rate - effect.value
      );
      break;
    case "output_boost":
      building.metrics.output_per_tick = Math.floor(
        building.metrics.output_per_tick * (1 + effect.value)
      );
      break;
  }
}
```

---

## 4. UI/UX設計

### 4.1 都市ビュー

```
┌─────────────────────────────────────┐
│  [統計] [設定] [建設]               │
├─────────────────────────────────────┤
│                                     │
│         [都市マップ]                │
│                                     │
│    📚  🏥  ⚡  🏭  🏛️              │
│                                     │
│    [警告マーク: !]                  │
│                                     │
│    [リソース表示]                   │
│    知識: 1500 エネルギー: 800      │
│    材料: 500  ゴールド: 1200       │
│                                     │
├─────────────────────────────────────┤
│  [稼働率: 85%] [幸福度: 78/100]    │
└─────────────────────────────────────┘
```

### 4.2 施設詳細ビュー

```
┌─────────────────────────────────────┐
│  [← 戻る] [📚 図書館: 英語]        │
├─────────────────────────────────────┤
│                                     │
│    [施設の3D表示]                   │
│    📚 (Level 3)                     │
│                                     │
│    維持レベル: ████████░░ 80%     │
│    効率: ██████████ 100%           │
│    幸福度: ████████░░ 80/100      │
│                                     │
│    カード: 150/200 (アクティブ: 120)│
│                                     │
├─────────────────────────────────────┤
│  [メンテナンス] [アップグレード]    │
│                                     │
│  [カードリスト]                     │
│  ✅ アクティブ: 120                │
│  ⚠️ 減衰中: 20                     │
│  ❌ 非アクティブ: 8                │
│  💔 破損: 2                        │
└─────────────────────────────────────┘
```

### 4.3 メンテナンス画面

```
┌─────────────────────────────────────┤
│  [メンテナンス: 図書館]             │
├─────────────────────────────────────┤
│                                     │
│  [問題]                              │
│  "apple"                            │
│                                     │
│  [答えを入力]                        │
│  [________________]                  │
│                                     │
│  [選択肢]                            │
│  ○ りんご                           │
│  ○ オレンジ                         │
│  ○ バナナ                           │
│  ○ ぶどう                           │
│                                     │
│  [回答] [スキップ]                  │
│                                     │
│  進捗: 5/20 カード                  │
└─────────────────────────────────────┘
```

### 4.4 視覚効果

#### 4.4.1 施設の状態表示
- **Pristine（完璧）**: 輝いている、煙が上がっている
- **Good（良好）**: 正常な外観
- **Fair（普通）**: ややくすんでいる
- **Poor（悪い）**: ほこりが舞っている、色が褪せている
- **Ruined（廃墟）**: 崩れかかっている、煙が上がっている

#### 4.4.2 リソース生産エフェクト
- リソースが施設から都市リソースプールへ流れるアニメーション
- 数値のカウントアップアニメーション

#### 4.4.3 警告システム
- 維持レベルが低い施設は赤く点滅
- カードが減衰している場合は警告マーク
- 都市全体の健康度が低い場合は画面全体が暗くなる

---

## 5. 実装詳細

### 5.1 技術スタック（推奨）

- **フロントエンド**: React / Vue.js / Svelte
- **3Dレンダリング**: Three.js / Babylon.js（オプション）
- **アニメーション**: Framer Motion / GSAP
- **状態管理**: Redux / Zustand / Pinia
- **データ永続化**: IndexedDB
- **バックグラウンド処理**: Web Workers

### 5.2 パフォーマンス最適化

1. **レンダリング最適化**
   - 画面外の施設は非表示
   - LOD（Level of Detail）システム
   - インスタンシング

2. **計算の最適化**
   - 維持レベル計算をWeb Workerで実行
   - バッチ更新（1分ごと）
   - キャッシュの活用

3. **メモリ管理**
   - 使用されていない施設データのアーカイブ
   - 画像の遅延読み込み
   - オブジェクトプーリング

---

## 6. ゲームバランス調整

### 6.1 施設タイプ別の基本生産量

| 施設タイプ | 基本生産量/ティック | リソースタイプ |
|----------|------------------|--------------|
| 図書館 | 10 | 知識 |
| 病院 | 8 | エネルギー |
| 発電所 | 15 | エネルギー |
| 農場 | 12 | 材料 |
| 工場 | 20 | 材料 |
| 学校 | 5 | 知識 |
| 博物館 | 8 | 知識 |
| 研究所 | 25 | 知識 |
| 裁判所 | 10 | 知識 |
| 銀行 | 30 | ゴールド |

### 6.2 維持レベルの影響

| 維持レベル | 生産効率 | 外観 | 状態 |
|----------|---------|------|------|
| 0.9-1.0 | 100% | Pristine | Operational |
| 0.7-0.9 | 85% | Good | Operational |
| 0.5-0.7 | 70% | Fair | Degraded |
| 0.3-0.5 | 50% | Poor | Critical |
| 0.0-0.3 | 0% | Ruined | Shutdown |

### 6.3 カード貢献度の計算式

```
基本貢献度 = 50
+ タイミングボーナス（-20 ～ +30）
+ 安定性ボーナス（最大+20）
+ 復習回数ボーナス（最大+10）
= 0 ～ 100
```

---

## 7. 特殊機能

### 7.1 地区システム

同じカテゴリーの施設を近くに配置すると、地区ボーナスが発動します。

### 7.2 施設の連鎖効果

特定の施設の組み合わせで、特別な効果が発動します。

### 7.3 都市イベント

- **知識の祭典**: 全施設の生産量が一時的に増加
- **技術革新**: 新しいアップグレードがアンロック
- **災害**: 維持レベルが一時的に低下（復習で回復可能）

---

## 8. テストケース

### 8.1 機能テスト

1. **維持レベル計算テスト**
   - 様々なカード状態での維持レベル計算
   - 境界値テスト

2. **施設生産テスト**
   - 維持レベルに応じた生産量
   - リソースの獲得

3. **アップグレードテスト**
   - コストの検証
   - 効果の適用

### 8.2 パフォーマンステスト

- 100施設での計算性能
- レンダリングのフレームレート
- メモリ使用量の監視

---

## 9. 今後の拡張案

1. **マルチプレイヤー**: 友達の都市を訪問
2. **貿易システム**: 都市間のリソース交換
3. **研究ツリー**: 新しい施設タイプのアンロック
4. **災害システム**: ランダムイベント
5. **統計ダッシュボード**: 詳細な学習分析
6. **AR機能**: 現実世界に都市を表示

---

## 10. 参考資料

- エビングハウスの忘却曲線理論
- FSRSアルゴリズム
- シミュレーションゲームのベストプラクティス
- 都市計画の理論

