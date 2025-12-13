# ローグライクRPG：忘却のダンジョン (Rogue-like Memory) - 詳細仕様書

## 1. ゲーム概要

### 1.1 基本情報

- **ゲーム名**: 忘却のダンジョン (Rogue-like Memory)
- **ジャンル**: ダンジョン探索RPG / ハックアンドスラッシュ / ローグライク
- **学習対象**: 一問一答形式の知識全般、資格試験の過去問
- **ターゲット層**: ゲーム性を強く求める層、リスク＆リワードを楽しみたい層
- **プレイ時間**: 1セッション 15-30分

### 1.2 コアコンセプト

プレイヤーは「忘却のダンジョン」に挑む冒険者です。最大の特徴は、装備している武器・防具・魔法が「学習カード」そのものである点です。時間が経過するにつれ、装備は「錆び（忘却）」ていき、攻撃力や防御力が低下します。ダンジョン内での戦闘（クイズ）こそが、装備を研ぎ澄ます唯一の手段です。

### 1.3 学習目標

- 能動的な想起練習
- リスク管理の学習
- 戦略的思考の養成
- エンゲージメントの向上

---

## 2. データ構造

### 2.1 装備アイテム（カード）データ構造

```typescript
interface Equipment {
  item_id: string; // ユニークID（例: "sword_math_formula_01"）
  name: string; // アイテム名
  type: EquipmentType; // 装備タイプ
  base_stats: BaseStats; // 基本ステータス
  condition: Condition; // 状態（錆び具合）
  dynamic_stats: DynamicStats; // 動的ステータス（現在値）
  card_content: CardContent; // カード内容
  srs_data: SRSData; // SRSデータ
  metadata: ItemMetadata; // メタデータ
}

type EquipmentType =
  | "weapon" // 武器
  | "armor" // 防具
  | "accessory" // アクセサリー
  | "spell"; // 魔法

interface BaseStats {
  attack: number; // 基本攻撃力
  defense: number; // 基本防御力
  magic_power?: number; // 魔法力（魔法のみ）
  attribute: Attribute; // 属性（科目）
  rarity: Rarity; // レアリティ
}

type Attribute =
  | "logic" // 論理（数学、物理）
  | "language" // 言語（英語、国語）
  | "history" // 歴史
  | "science" // 科学
  | "art" // 芸術
  | "general"; // 一般知識

type Rarity =
  | "common" // 普通
  | "uncommon" // 珍しい
  | "rare" // レア
  | "epic" // エピック
  | "legendary"; // 伝説

interface Condition {
  sharpness: number; // 切れ味（0.0 - 1.0）
  durability: number; // 耐久度（0-100）
  status_label: StatusLabel; // 状態ラベル
  last_used: number; // 最終使用時刻（Unix timestamp）
  decay_rate: number; // 減衰率（%/時間）
}

type StatusLabel =
  | "Sharp" // 切れ味良好
  | "Dull" // 鈍い
  | "Rusty" // 錆びている
  | "Broken"; // 壊れている

interface DynamicStats {
  current_attack: number; // 現在の攻撃力
  current_defense: number; // 現在の防御力
  current_magic_power?: number; // 現在の魔法力
}

interface CardContent {
  question: string; // 問題
  answer: string; // 答え
  options?: string[]; // 選択肢（オプション）
  category: string; // カテゴリー
  difficulty: number; // 難易度（1-10）
}

interface SRSData {
  next_review: string; // 次回復習日（ISO 8601）
  interval: number; // 間隔（日）
  ease_factor: number; // 難易度係数
  review_count: number; // 復習回数
  last_review_date?: string; // 最終復習日
  stability: number; // 安定性
}

interface ItemMetadata {
  obtained_date: string; // 獲得日
  total_uses: number; // 総使用回数
  critical_hits: number; // クリティカルヒット数
  perfect_recalls: number; // 完璧な想起回数
}
```

### 2.2 プレイヤーデータ構造

```typescript
interface Player {
  player_id: string; // プレイヤーID
  name: string; // プレイヤー名
  level: number; // レベル
  experience: number; // 経験値
  stats: PlayerStats; // ステータス
  equipment: EquipmentSlot; // 装備スロット
  inventory: Equipment[]; // インベントリ
  current_dungeon: DungeonProgress; // 現在のダンジョン進行状況
  achievements: Achievement[]; // アチーブメント
}

interface PlayerStats {
  max_hp: number; // 最大HP
  current_hp: number; // 現在のHP
  max_mp: number; // 最大MP
  current_mp: number; // 現在のMP
  strength: number; // 筋力（装備の攻撃力に影響）
  vitality: number; // 体力（装備の防御力に影響）
  intelligence: number; // 知性（魔法力に影響）
  luck: number; // 運（クリティカル率に影響）
}

interface EquipmentSlot {
  weapon: Equipment | null; // 武器スロット
  armor: Equipment | null; // 防具スロット
  accessory: Equipment | null; // アクセサリースロット
  spell: Equipment | null; // 魔法スロット
}

interface DungeonProgress {
  dungeon_id: string; // ダンジョンID
  floor: number; // 現在の階層
  room: number; // 現在の部屋
  enemies_defeated: number; // 倒した敵数
  treasures_found: number; // 見つけた宝箱数
  start_time: number; // 開始時刻
}
```

### 2.3 敵データ構造

```typescript
interface Enemy {
  enemy_id: string; // 敵ID
  name: string; // 敵名
  type: EnemyType; // 敵タイプ
  stats: EnemyStats; // ステータス
  attribute: Attribute; // 属性
  floor: number; // 出現階層
  rewards: Rewards; // 報酬
  behavior: EnemyBehavior; // 行動パターン
}

type EnemyType =
  | "slime" // スライム
  | "goblin" // ゴブリン
  | "skeleton" // スケルトン
  | "wizard" // ウィザード
  | "boss"; // ボス

interface EnemyStats {
  hp: number; // HP
  attack: number; // 攻撃力
  defense: number; // 防御力
  speed: number; // 速度
  weakness?: Attribute; // 弱点属性
}

interface Rewards {
  experience: number; // 経験値
  gold: number; // ゴールド
  item_drop_chance: number; // アイテムドロップ率（%）
  possible_items: string[]; // ドロップ可能アイテムID
}

interface EnemyBehavior {
  attack_pattern: AttackPattern[]; // 攻撃パターン
  special_ability?: SpecialAbility; // 特殊能力
}

interface AttackPattern {
  type: "normal" | "strong" | "special";
  damage_multiplier: number;
  cooldown: number;
}
```

### 2.4 ダンジョンデータ構造

```typescript
interface Dungeon {
  dungeon_id: string; // ダンジョンID
  name: string; // ダンジョン名
  theme: DungeonTheme; // テーマ
  total_floors: number; // 総階層数
  floors: Floor[]; // 階層データ
  boss: Enemy; // ボス敵
  rewards: DungeonRewards; // クリア報酬
}

type DungeonTheme =
  | "ancient_ruins" // 古代遺跡
  | "crystal_cave" // 水晶洞窟
  | "dark_forest" // 暗黒の森
  | "tower" // 塔
  | "labyrinth"; // 迷宮

interface Floor {
  floor_number: number; // 階層番号
  rooms: Room[]; // 部屋リスト
  enemy_pool: string[]; // 敵プール（敵ID）
  treasure_pool: string[]; // 宝箱プール（アイテムID）
  difficulty_multiplier: number; // 難易度倍率
}

interface Room {
  room_id: string; // 部屋ID
  type: RoomType; // 部屋タイプ
  enemies?: Enemy[]; // 敵（戦闘部屋）
  treasure?: Treasure; // 宝箱（宝箱部屋）
  event?: Event; // イベント（イベント部屋）
}

type RoomType =
  | "combat" // 戦闘
  | "treasure" // 宝箱
  | "rest" // 休憩
  | "event" // イベント
  | "boss"; // ボス

interface Treasure {
  treasure_id: string; // 宝箱ID
  type: TreasureType; // 宝箱タイプ
  items: Equipment[]; // 中身（アイテム）
  gold: number; // ゴールド
  opened: boolean; // 開封済みフラグ
}

type TreasureType =
  | "wooden" // 木製
  | "iron" // 鉄製
  | "golden" // 金製
  | "legendary"; // 伝説
```

### 2.5 戦闘データ構造

```typescript
interface CombatSession {
  session_id: string; // セッションID
  player: Player; // プレイヤー
  enemy: Enemy; // 敵
  turn: number; // ターン数
  actions: CombatAction[]; // 行動履歴
  result?: CombatResult; // 結果
  start_time: number; // 開始時刻
}

interface CombatAction {
  actor: "player" | "enemy"; // 行動者
  action_type: ActionType; // 行動タイプ
  equipment_used?: Equipment; // 使用装備
  quiz_result?: QuizResult; // クイズ結果
  damage_dealt?: number; // 与えたダメージ
  damage_taken?: number; // 受けたダメージ
  critical?: boolean; // クリティカルフラグ
  timestamp: number; // タイムスタンプ
}

type ActionType =
  | "attack" // 攻撃
  | "defend" // 防御
  | "spell" // 魔法
  | "item" // アイテム使用
  | "flee"; // 逃走

interface QuizResult {
  question: string; // 問題
  user_answer: string; // ユーザー回答
  correct_answer: string; // 正解
  is_correct: boolean; // 正誤
  time_taken: number; // 回答時間（秒）
  rating: QuizRating; // 評価
}

type QuizRating = "perfect" | "good" | "ok" | "poor";

interface CombatResult {
  victory: boolean; // 勝利フラグ
  experience_gained: number; // 獲得経験値
  gold_gained: number; // 獲得ゴールド
  items_dropped: Equipment[]; // ドロップアイテム
  equipment_updates: EquipmentUpdate[]; // 装備更新
  duration: number; // 戦闘時間（秒）
}

interface EquipmentUpdate {
  equipment_id: string; // 装備ID
  sharpness_before: number; // 更新前の切れ味
  sharpness_after: number; // 更新後の切れ味
  recall_critical: boolean; // 想起クリティカルフラグ
}
```

---

## 3. ゲームロジック

### 3.1 装備の減衰システム

```typescript
function calculateCurrentSharpness(
  equipment: Equipment,
  currentTime: number
): number {
  const timeSinceLastUsed =
    (currentTime - equipment.condition.last_used) / 3600; // 時間単位
  const decayAmount = timeSinceLastUsed * equipment.condition.decay_rate;
  const newSharpness = Math.max(0, equipment.condition.sharpness - decayAmount);

  return newSharpness;
}

function updateDecayRate(stability: number, review_count: number): number {
  // 安定性が高いほど、復習回数が多いほど減衰率が低い
  const baseDecayRate = 2.0; // 基本減衰率（%/時間）
  const stabilityModifier = Math.max(0.1, 1.0 / (stability / 10));
  const reviewModifier = Math.max(0.5, 1.0 / (review_count / 10));

  return baseDecayRate * stabilityModifier * reviewModifier;
}

function updateStatusLabel(sharpness: number): StatusLabel {
  if (sharpness >= 0.8) return "Sharp";
  if (sharpness >= 0.5) return "Dull";
  if (sharpness >= 0.2) return "Rusty";
  return "Broken";
}

function calculateDynamicStats(equipment: Equipment): DynamicStats {
  const sharpness = equipment.condition.sharpness;

  return {
    current_attack: Math.floor(equipment.base_stats.attack * sharpness),
    current_defense: Math.floor(equipment.base_stats.defense * sharpness),
    current_magic_power: equipment.base_stats.magic_power
      ? Math.floor(equipment.base_stats.magic_power * sharpness)
      : undefined,
  };
}
```

### 3.2 戦闘システム

```typescript
function executePlayerAttack(
  player: Player,
  enemy: Enemy,
  equipment: Equipment,
  quizResult: QuizResult
): CombatAction {
  let damage = 0;
  let critical = false;
  let sharpnessUpdate = equipment.condition.sharpness;

  if (quizResult.is_correct) {
    // 正解時
    const baseDamage =
      player.equipment.weapon?.dynamic_stats.current_attack || 0;
    const ratingMultiplier = {
      perfect: 1.5,
      good: 1.2,
      ok: 1.0,
      poor: 0.8,
    }[quizResult.rating];

    damage = Math.floor(baseDamage * ratingMultiplier);

    // 想起クリティカル（Recall Critical）
    const isRecallCritical = checkRecallCritical(equipment, quizResult);
    if (isRecallCritical) {
      damage = Math.floor(damage * 2.5);
      critical = true;

      // HP回復
      player.stats.current_hp = Math.min(
        player.stats.max_hp,
        player.stats.current_hp + Math.floor(damage * 0.1)
      );
    }

    // 装備を研ぎ澄ます
    sharpnessUpdate = 1.0;
    equipment.condition.sharpness = 1.0;
    equipment.condition.status_label = "Sharp";
    equipment.condition.last_used = Date.now();

    // SRS更新
    updateSRSAfterCombat(equipment, quizResult);
  } else {
    // 不正解時
    damage = 0;
    critical = false;

    // 装備の耐久度が下がる
    equipment.condition.durability = Math.max(
      0,
      equipment.condition.durability - 10
    );

    // 切れ味も少し下がる
    sharpnessUpdate = Math.max(0, equipment.condition.sharpness - 0.1);
    equipment.condition.sharpness = sharpnessUpdate;
    equipment.condition.status_label = updateStatusLabel(sharpnessUpdate);

    // プレイヤーがダメージを受ける
    const enemyDamage = Math.floor(enemy.stats.attack * 0.5);
    player.stats.current_hp = Math.max(
      0,
      player.stats.current_hp - enemyDamage
    );
  }

  // 敵のHPを減らす
  enemy.stats.hp = Math.max(0, enemy.stats.hp - damage);

  return {
    actor: "player",
    action_type: "attack",
    equipment_used: equipment,
    quiz_result: quizResult,
    damage_dealt: damage,
    damage_taken: quizResult.is_correct
      ? 0
      : Math.floor(enemy.stats.attack * 0.5),
    critical: critical,
    timestamp: Date.now(),
  };
}

function checkRecallCritical(
  equipment: Equipment,
  quizResult: QuizResult
): boolean {
  // 切れ味が0.3-0.4（忘れかけ）の状態で正解するとクリティカル
  const sharpness = equipment.condition.sharpness;
  const isForgotten = sharpness >= 0.3 && sharpness <= 0.4;
  const isCorrect = quizResult.is_correct;
  const isQuick = quizResult.time_taken <= 3; // 3秒以内

  return isForgotten && isCorrect && isQuick;
}

function updateSRSAfterCombat(
  equipment: Equipment,
  quizResult: QuizResult
): void {
  const rating = quizResult.rating;

  switch (rating) {
    case "perfect":
      equipment.srs_data.interval *= 2.5;
      equipment.srs_data.stability *= 1.3;
      equipment.srs_data.ease_factor = Math.min(
        equipment.srs_data.ease_factor + 0.15,
        3.0
      );
      break;
    case "good":
      equipment.srs_data.interval *= 1.8;
      equipment.srs_data.stability *= 1.15;
      break;
    case "ok":
      equipment.srs_data.interval *= 1.2;
      equipment.srs_data.stability *= 1.05;
      break;
    case "poor":
      equipment.srs_data.interval *= 0.8;
      equipment.srs_data.stability *= 0.9;
      equipment.srs_data.ease_factor = Math.max(
        equipment.srs_data.ease_factor - 0.1,
        1.3
      );
      break;
  }

  // 次回復習日の計算
  const nextReviewDate = new Date();
  nextReviewDate.setDate(
    nextReviewDate.getDate() + equipment.srs_data.interval
  );
  equipment.srs_data.next_review = nextReviewDate.toISOString();
  equipment.srs_data.review_count++;

  // 減衰率の更新
  equipment.condition.decay_rate = updateDecayRate(
    equipment.srs_data.stability,
    equipment.srs_data.review_count
  );

  // メタデータ更新
  equipment.metadata.total_uses++;
  if (quizResult.rating === "perfect") {
    equipment.metadata.perfect_recalls++;
  }
}
```

### 3.3 敵の行動システム

```typescript
function executeEnemyAttack(enemy: Enemy, player: Player): CombatAction {
  const baseDamage = enemy.stats.attack;
  const defense = player.equipment.armor?.dynamic_stats.current_defense || 0;
  const actualDamage = Math.max(1, baseDamage - Math.floor(defense * 0.5));

  player.stats.current_hp = Math.max(0, player.stats.current_hp - actualDamage);

  return {
    actor: "enemy",
    action_type: "attack",
    damage_dealt: actualDamage,
    timestamp: Date.now(),
  };
}
```

### 3.4 ダンジョン生成システム

```typescript
function generateDungeon(
  theme: DungeonTheme,
  totalFloors: number,
  playerLevel: number
): Dungeon {
  const floors: Floor[] = [];

  for (let i = 1; i <= totalFloors; i++) {
    const floor: Floor = {
      floor_number: i,
      rooms: generateRooms(i, playerLevel),
      enemy_pool: getEnemyPool(i, theme),
      treasure_pool: getTreasurePool(i),
      difficulty_multiplier: 1 + (i - 1) * 0.2,
    };

    floors.push(floor);
  }

  return {
    dungeon_id: generateId(),
    name: getDungeonName(theme),
    theme: theme,
    total_floors: totalFloors,
    floors: floors,
    boss: generateBoss(totalFloors, theme),
    rewards: generateDungeonRewards(totalFloors),
  };
}

function generateRooms(floor: number, playerLevel: number): Room[] {
  const roomCount = 5 + Math.floor(floor / 2);
  const rooms: Room[] = [];

  for (let i = 0; i < roomCount; i++) {
    const roomType = determineRoomType(i, roomCount);

    let room: Room;
    switch (roomType) {
      case "combat":
        room = {
          room_id: generateId(),
          type: "combat",
          enemies: generateEnemies(floor, playerLevel),
        };
        break;
      case "treasure":
        room = {
          room_id: generateId(),
          type: "treasure",
          treasure: generateTreasure(floor),
        };
        break;
      case "rest":
        room = {
          room_id: generateId(),
          type: "rest",
        };
        break;
      case "event":
        room = {
          room_id: generateId(),
          type: "event",
          event: generateEvent(floor),
        };
        break;
      default:
        room = {
          room_id: generateId(),
          type: "combat",
          enemies: generateEnemies(floor, playerLevel),
        };
    }

    rooms.push(room);
  }

  return rooms;
}

function determineRoomType(index: number, total: number): RoomType {
  // 最後の部屋は必ずボス
  if (index === total - 1) return "boss";

  const rand = Math.random();
  if (rand < 0.5) return "combat";
  if (rand < 0.7) return "treasure";
  if (rand < 0.85) return "rest";
  return "event";
}
```

---

## 4. UI/UX設計

### 4.1 戦闘画面レイアウト

```
┌─────────────────────────────────────┐
│  [HP: ████████░░] [MP: ████░░░░░]  │
├─────────────────────────────────────┤
│                                     │
│         [敵の表示]                   │
│         👹 Goblin                   │
│         HP: ████████░░ 80/100      │
│                                     │
├─────────────────────────────────────┤
│  [装備状態]                         │
│  武器: ⚔️ 二次方程式 [錆び] 40%   │
│  防具: 🛡️ 歴史年号 [切れ味良好] 90%│
│                                     │
├─────────────────────────────────────┤
│  [問題]                              │
│  "x² + 5x + 6 = 0 の解は？"        │
│                                     │
│  [選択肢]                            │
│  ○ x = -2, -3                      │
│  ○ x = 2, 3                        │
│  ○ x = -1, -6                      │
│  ○ x = 1, 6                        │
│                                     │
│  [攻撃] [防御] [魔法] [逃走]        │
└─────────────────────────────────────┘
```

### 4.2 装備画面レイアウト

```
┌─────────────────────────────────────┐
│  [← 戻る] [装備]                   │
├─────────────────────────────────────┤
│                                     │
│  [装備スロット]                     │
│  ⚔️ 武器: [二次方程式の解]         │
│  🛡️ 防具: [歴史年号]               │
│  💍 アクセサリー: [未装備]          │
│  ✨ 魔法: [英単語]                  │
│                                     │
├─────────────────────────────────────┤
│  [インベントリ]                     │
│  ┌─────┐ ┌─────┐ ┌─────┐          │
│  │ ⚔️ │ │ 🛡️ │ │ ✨ │          │
│  │ 錆  │ │ 切  │ │ 切  │          │
│  │ 40% │ │ 90% │ │ 85% │          │
│  └─────┘ └─────┘ └─────┘          │
│                                     │
└─────────────────────────────────────┘
```

### 4.3 視覚効果

#### 4.3.1 装備の視覚表現

- **Sharp（切れ味良好）**: ピカピカに光っている
- **Dull（鈍い）**: ややくすんでいる
- **Rusty（錆びている）**: 茶色の錆エフェクト
- **Broken（壊れている）**: ひび割れエフェクト

#### 4.3.2 戦闘エフェクト

- **正解時**: 剣の錆がパリーンと弾け飛び、眩しい光とともに敵を切り裂く
- **想起クリティカル**: 特大の光とパーティクル、画面全体のフラッシュ
- **不正解時**: 攻撃が外れ、プレイヤーがダメージを受けるアニメーション

#### 4.3.3 ダメージ表示

- ダメージ数値が飛び散る
- クリティカル時は金色の大きな数字
- HPバーの減少アニメーション

---

## 5. 実装詳細

### 5.1 技術スタック（推奨）

- **フロントエンド**: React / Vue.js / Svelte
- **ゲームエンジン**: Phaser.js / PixiJS（オプション）
- **アニメーション**: Framer Motion / GSAP
- **状態管理**: Redux / Zustand / Pinia
- **データ永続化**: IndexedDB
- **音声**: Howler.js

### 5.2 パフォーマンス最適化

1. **レンダリング最適化**
   - スプライトシートの使用
   - オブジェクトプーリング
   - 画面外の要素の非表示

2. **計算の最適化**
   - 装備の減衰計算をバッチ処理
   - 敵のAI計算を最適化
   - キャッシュの活用

3. **メモリ管理**
   - 使用されていない装備データのアーカイブ
   - 画像の遅延読み込み
   - 音声ファイルのストリーミング

---

## 6. ゲームバランス調整

### 6.1 装備の減衰率

| 安定性 | 復習回数 | 減衰率（%/時間） |
| ------ | -------- | ---------------- |
| 5      | 0-5      | 2.0              |
| 10     | 6-10     | 1.5              |
| 20     | 11-20    | 1.0              |
| 30     | 21-30    | 0.7              |
| 50+    | 31+      | 0.5              |

### 6.2 想起クリティカル条件

- 切れ味: 0.3 - 0.4（忘れかけの状態）
- 正解: 必須
- 回答時間: 3秒以内
- ダメージ倍率: 2.5倍
- HP回復: ダメージの10%

### 6.3 ダメージ計算

```typescript
function calculateDamage(
  baseAttack: number,
  sharpness: number,
  rating: QuizRating,
  isCritical: boolean
): number {
  let damage = baseAttack * sharpness;

  const ratingMultiplier = {
    perfect: 1.5,
    good: 1.2,
    ok: 1.0,
    poor: 0.8,
  }[rating];

  damage *= ratingMultiplier;

  if (isCritical) {
    damage *= 2.5;
  }

  return Math.floor(damage);
}
```

---

## 7. 特殊機能

### 7.1 属性相性システム

```typescript
function calculateAttributeBonus(
  equipmentAttribute: Attribute,
  enemyAttribute: Attribute
): number {
  // 属性相性テーブル
  const compatibility: Record<Attribute, Attribute[]> = {
    logic: ["science", "general"],
    language: ["history", "art"],
    history: ["language", "general"],
    science: ["logic", "general"],
    art: ["language", "history"],
    general: [],
  };

  if (compatibility[equipmentAttribute]?.includes(enemyAttribute)) {
    return 1.2; // 20%ダメージ増加
  }

  if (enemyAttribute === equipmentAttribute) {
    return 1.1; // 10%ダメージ増加
  }

  return 1.0;
}
```

### 7.2 装備セットボーナス

同じカテゴリーの装備を複数装備するとボーナスが発動します。

### 7.3 ダンジョンクリア報酬

- 経験値ボーナス
- レア装備の獲得
- 称号の獲得

---

## 8. テストケース

### 8.1 機能テスト

1. **減衰計算テスト**
   - 様々な時間経過での切れ味計算
   - 境界値テスト（0.0, 0.2, 0.4, 0.8, 1.0）

2. **戦闘システムテスト**
   - 各評価レベルのダメージ計算
   - 想起クリティカルの発動条件

3. **ダンジョン生成テスト**
   - 階層ごとの難易度調整
   - 部屋タイプの分布

### 8.2 パフォーマンステスト

- 100装備での減衰計算性能
- 戦闘アニメーションのフレームレート
- メモリ使用量の監視

---

## 9. 今後の拡張案

1. **マルチプレイヤー**: 協力プレイ、PvP
2. **装備強化システム**: 装備のレベルアップ
3. **スキルツリー**: プレイヤースキルの習得
4. **ギルドシステム**: プレイヤー同士の協力
5. **イベントダンジョン**: 期間限定の特別ダンジョン
6. **ストーリーモード**: 物語に沿った進行

---

## 10. 参考資料

- エビングハウスの忘却曲線理論
- FSRSアルゴリズム
- ローグライクゲームのベストプラクティス
- RPGバランス調整の理論
