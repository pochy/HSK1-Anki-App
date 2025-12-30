<script lang="ts">
  import {
    currentLevel,
    headerTitle,
    showBottomNav,
    currentCategory,
    masteredIds,
    difficultIds,
    totalWords,
    learnedWords,
    muted,
    customBackHandler,
  } from "$lib/stores/app";
  import { hsk1 } from "$lib/data/hsk1.js";
  import { hsk2 } from "$lib/data/hsk2.js";
  import { onMount } from "svelte";
  import { fly, fade } from "svelte/transition";
  import { goto } from "$app/navigation";
  import { base } from "$app/paths";
  import type { WordItem } from "$lib/types/word";

  let rawData = $state<WordItem[]>([]);
  let items = $state<WordItem[]>([]);
  let categories = $state<string[]>([]);
  let currentIndex = $state(0);
  // For transition key
  let uniqueKey = $state(0);
  let direction = $state(1); // 1 for next, -1 for prev
  let showingMeaning = $state(false);
  let viewMode = $state<"list" | "card">("list"); // "list" or "card"

  let currentItem = $derived(items[currentIndex]);
  let isMastered = $derived(
    currentItem ? $masteredIds.includes(currentItem.id) : false
  );
  let isDifficult = $derived(
    currentItem ? $difficultIds.includes(currentItem.id) : false
  );
  let showHint = $state(false);

  // カスタム戻るハンドラを更新する関数
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

  onMount(() => {
    $headerTitle = `HSK ${$currentLevel}級`;
    $showBottomNav = true;

    loadData();
    updateBackHandler();

    // ページがアンマウントされたときに、カスタムハンドラをクリア
    return () => {
      $customBackHandler = null;
    };
  });

  function loadData() {
    rawData = $currentLevel === 1 ? hsk1 : hsk2;
    categories = [...new Set(rawData.map((i) => i.category))];

    $totalWords = rawData.length;
    updateLearnedCount();
  }

  function updateLearnedCount() {
    $learnedWords = rawData.filter((i) => $masteredIds.includes(i.id)).length;
  }

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

  function shuffle<T>(array: T[]): T[] {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  function goBackToList() {
    viewMode = "list";
    $currentCategory = "all";
    updateBackHandler();
  }

  function getCategoryIcon(cat: string): string {
    if (cat.includes("名詞")) return '<i class="fas fa-cube"></i>';
    if (cat.includes("動詞")) return '<i class="fas fa-running"></i>';
    if (cat.includes("形容詞")) return '<i class="fas fa-star"></i>';
    if (cat.includes("代名詞")) return '<i class="fas fa-user"></i>';
    if (cat.includes("数詞")) return '<i class="fas fa-calculator"></i>';
    if (cat.includes("食べ物")) return '<i class="fas fa-utensils"></i>';
    if (cat.includes("時間") || cat.includes("カレンダー"))
      return '<i class="fas fa-clock"></i>';
    if (cat.includes("場所")) return '<i class="fas fa-map-marker-alt"></i>';
    if (cat.includes("自然")) return '<i class="fas fa-tree"></i>';
    if (cat.includes("定型") || cat.includes("フレーズ"))
      return '<i class="fas fa-comments"></i>';
    return '<i class="fas fa-book"></i>';
  }

  function nextCard() {
    direction = 1;
    showingMeaning = false;
    showHint = false;
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

  function prevCard() {
    direction = -1;
    showingMeaning = false;
    showHint = false;
    if (currentIndex > 0) {
      currentIndex--;
    } else {
      currentIndex = items.length - 1;
    }
    uniqueKey++;
  }

  function showSessionComplete() {
    viewMode = "list";
    $currentCategory = "all";
    updateBackHandler();
    alert("セッション完了！着実に力がついていますね。");
  }

  function toggleMeaning() {
    showingMeaning = !showingMeaning;
    if (showingMeaning) autoSpeak();
  }

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

  function toggleDifficult() {
    if (!currentItem) return;

    difficultIds.update((ids) => {
      if (ids.includes(currentItem.id)) {
        return ids.filter((id) => id !== currentItem.id);
      }
      return [...ids, currentItem.id];
    });
  }

  function speak(text: string) {
    if ($muted) return;
    const u = new SpeechSynthesisUtterance(text);
    u.lang = "zh-CN";
    u.rate = 0.8;
    speechSynthesis.speak(u);
  }

  function autoSpeak() {
    if (currentItem && !$muted) {
      // Speak just the char initially? Or wait for click?
      // User app logic: speak on reveal?
      // "Tap to reveal" usually implies showing meaning.
      // Let's speak char immediately if needed, but maybe better on tap.
      // Existing app: "speak" function called manually or auto?
      // Card says "Tap to reveal", then plays audio.
      if (showingMeaning) {
        speak(currentItem.char);
      }
    }
  }

  // Helper for examples
  function getExamples(item: WordItem) {
    if (item.examples && Array.isArray(item.examples)) {
      return item.examples.slice(0, 3);
    }
    if (item.example && item.exampleMeaning) {
      return [{ chinese: item.example, japanese: item.exampleMeaning }];
    }
    return [];
  }

  // ヒント情報を生成
  function generateHint(item: WordItem): string[] {
    const hints: string[] = [];
    const char = item.char;
    const pinyin = item.pinyin;
    const meaning = item.meaning;

    // 文字数に基づいたヒント
    if (char.length === 1) {
      hints.push(`💡 これは一文字の単語です。基本的な概念を表します。`);
    } else if (char.length === 2) {
      hints.push(`💡 二文字の単語です。各文字の意味を理解すると覚えやすくなります。`);
    }

    // カテゴリー別のヒント
    if (item.category.includes("動詞")) {
      hints.push(
        `🎯 動詞なので、主に動作や行為を表します。文中では「〜する」という形で使われます。`
      );
    } else if (item.category.includes("名詞")) {
      hints.push(`🎯 名詞なので、人・物・場所などを表します。`);
    } else if (item.category.includes("形容詞")) {
      hints.push(
        `🎯 形容詞なので、状態や性質を表します。「很 + 形容詞」の形でよく使われます。`
      );
    }

    // 特定の単語に対する個別ヒント
    const specificHints: Record<string, string> = {
      我: "📝 中国語で最も基本的な単語の一つ。日本語の「私」に相当します。",
      你: '📝 「你好」(nǐ hǎo)で「こんにちは」の意味になります。',
      他: "📝 「彼」と同じ発音ですが、中国語では性別を含む三人称代名詞です。",
      她: "📝 「他」の女性形。発音は同じですが、文字が異なります。",
      是: '📝 英語の"be動詞"に相当。「A是B」で「AはBです」の意味。',
      不: "📝 否定を表す最も基本的な単語。四声が他の単語の前で変調することがあります。",
      很: '📝 「很 + 形容詞」で「とても〜」の意味。中国語では形容詞の前によく使われます。',
      好: '📝 「良い」という意味の他、「好了」で「できた・終わった」という意味にもなります。',
      吗: "📝 疑問文を作る助詞。文末に付けるだけで疑問文になります。",
      呢: "📝 疑問を表す語気助詞。「你呢？」で「あなたは？」の意味。",
      的: "📝 所有や修飾を表す助詞。「我的书」で「私の本」の意味。",
      了: "📝 完了や変化を表す助詞。中国語文法で重要な役割を果たします。",
      有: '📝 「持っている・ある」という意味。英語の"have"に相当します。',
      在: '📝 「〜にいる・〜にある」という意味。場所を表す際に使います。',
      人: "📝 日本語の「人」と同じ漢字で同じ意味。覚えやすい単語の一つです。",
      大: "📝 「大小」(dà xiǎo)のように反対語とセットで覚えると効果的です。",
      小: "📝 「小」は日本語でも「小さい」という意味で使われます。",
      多: '📝 「多少」(duō shǎo)で「いくら・どのくらい」という疑問詞になります。',
      少: "📝 「少」は量が少ないことを表します。「多」の反対語です。",
      爱: '📝 「愛」の簡体字。「我爱你」で「愛しています」の意味。',
      喜欢: '📝 「好き」という意味。"喜"と"欢"どちらも喜びを表す文字です。',
      想: '📝 「思う・考える」の意味の他、「〜したい」という願望も表します。',
      说: '📝 「話す」という意味。"讠"（言偏）が言葉に関連することを示しています。',
      话: '📝 「言葉・話」という意味。"说话"で「話す」という動詞になります。',
      看: '📝 「見る・読む」という意味。"看书"で「本を読む」、"看电影"で「映画を見る」。',
      听: '📝 「聞く」という意味。"口"偏は耳を表す簡略化された形です。',
      吃: '📝 「食べる」という意味。"吃饭"で「ご飯を食べる」という日常的な表現。',
      喝: '📝 「飲む」という意味。"口"偏が飲食に関連することを示しています。',
      来: '📝 「来る」という意味。日本語の「来」と同じ意味で覚えやすいです。',
      去: '📝 「行く」という意味。「来」の反対語として覚えましょう。',
      买: '📝 「買う」という意味。繁体字は"買"ですが、簡体字では画数が少なくなっています。',
      卖: '📝 「売る」という意味。"买"（買う）と似ているので注意が必要です。',
      做: '📝 「する・作る」という意味。"做什么"で「何をする？」という疑問文。',
      工作: '📝 "工"（仕事）+"作"（作る）で「働く・仕事」の意味。',
      学习: '📝 "学"（学ぶ）+"习"（練習する）で「勉強する」の意味。',
      老师: '📝 "老"（年配の）+"师"（先生）で「先生」の意味。尊敬を込めた呼び方。',
      学生: "📝 日本語と同じ漢字・同じ意味。覚えやすい単語です。",
      朋友: '📝 "朋"も"友"も「友達」を意味する文字。強調の意味を持ちます。',
      家: "📝 日本語の「家」と同じ。「家族」を表すこともあります。",
      中国: "📝 日本語と同じ漢字。「中国」を意味します。",
      日本: "📝 日本語と全く同じ！覚える必要はありませんね。",
      今天: '📝 "今"（今）+"天"（日）で「今日」の意味。論理的な構成です。',
      明天: '📝 "明"（明るい・次の）+"天"（日）で「明日」の意味。',
      昨天: '📝 "昨"（昨）+"天"（日）で「昨日」の意味。日本語と同じ構成です。',
      现在: '📝 「今・現在」という意味。"现"は"現"の簡体字です。',
      时间: '📝 「時間」の意味。"时"は"時"の簡体字、"间"は"間"の簡体字です。',
      年: "📝 日本語の「年」と同じ漢字・同じ意味。",
      月: "📝 「月」という意味。日本語と同じく月や暦の「月」を表します。",
      日: "📝 「日」という意味。日本語と同じ用法です。",
      星期: '📝 「週・曜日」を表します。"星期一"で「月曜日」の意味。',
      中文: '📝 "中"（中国）+"文"（言語・文字）で「中国語」の意味。',
      汉语: '📝 「中国語（漢語）」の意味。"汉"は"漢"の簡体字です。',
      水: "📝 日本語の「水」と同じ。発音は全く違います（shuǐ）。",
      茶: "📝 日本語の「茶」と同じ漢字。中国が茶の発祥地です。",
      饭: '📝 「ご飯・食事」の意味。"吃饭"で「ご飯を食べる」。',
      菜: '📝 「料理・野菜」の意味。"点菜"で「料理を注文する」。',
      钱: '📝 「お金」の意味。"钅"偏（金偏）が価値あるものを示しています。',
      多少: '📝 「いくら・どのくらい」という疑問詞。数量を尋ねる時に使います。',
      几: '📝 「いくつ」という疑問詞。比較的小さな数を尋ねる時に使います。',
      什么: '📝 「何」という疑問詞。最も基本的な疑問詞の一つです。',
      哪: '📝 「どの・どこ」という疑問詞。"哪里"で「どこ」、"哪个"で「どの」。',
      谁: '📝 「誰」という疑問詞。"谁"の文字に"隹"（とり）が含まれています。',
      怎么: '📝 「どのように・なぜ」という疑問詞。方法や理由を尋ねます。',
      为什么: '📝 「なぜ・どうして」という疑問詞。理由を尋ねる表現。',
      可以: '📝 「〜できる・〜してもよい」という意味。許可や可能を表します。',
      会: '📝 「〜できる」という意味。学習や訓練によって得た能力を表します。',
      能: '📝 「〜できる」という意味。能力や条件による可能性を表します。',
      要: '📝 「〜したい・必要だ」という意味。願望や必要性を表します。',
    };

    if (specificHints[char]) {
      hints.push(specificHints[char]);
    }

    // ピンインに関するヒント
    if (pinyin) {
      const tones = pinyin.match(/[āáǎàēéěèīíǐìōóǒòūúǔùǖǘǚǜ]/g);
      if (tones && tones.length > 0) {
        hints.push(
          `🎵 ピンイン "${pinyin}" に注意。声調を正しく発音することが重要です。`
        );
      }
    }

    // 一般的な学習アドバイス
    hints.push(`✍️ 何度も書いて、声に出して読むことで記憶に定着しやすくなります。`);

    // 例文がある場合のヒント
    const examples = getExamples(item);
    if (examples.length > 0) {
      hints.push(
        `📚 例文を使って実際の使い方を確認しましょう。文脈で覚えると忘れにくくなります。`
      );
    }

    return hints;
  }

  function toggleHint() {
    showHint = !showHint;
  }
</script>

<div class="h-full flex flex-col overflow-y-auto pb-24">
  {#if viewMode === "list"}
    <!-- Category List View (レガシー版と同じ) -->
    <div class="p-6 animate-slide-up">
      <!-- Banner -->
      <div
        class="bg-gradient-to-r from-yellow-400 to-orange-400 rounded-3xl p-6 text-white mb-8 shadow-lg relative overflow-hidden"
      >
        <div class="relative z-10">
          <h2 class="text-2xl font-bold mb-1">
            HSK{$currentLevel}級 合格への道
          </h2>
          <p class="opacity-90 text-sm mb-4">全{rawData.length}語完全対応</p>
          <button
            onclick={startReview}
            class="bg-white text-orange-500 px-6 py-2 rounded-full font-bold text-sm shadow-md active:scale-95 transition"
          >
            <i class="fas fa-sync-alt mr-1"></i> 苦手復習
          </button>
        </div>
        <i
          class="fas fa-dragon absolute -bottom-4 -right-4 text-8xl opacity-20 transform rotate-12"
        ></i>
      </div>

      <!-- Category List -->
      <h3 class="font-bold text-gray-700 mb-4 px-2 border-l-4 border-primary">
        カテゴリー別学習
      </h3>

      <div class="grid grid-cols-1 gap-4">
        {#each categories as cat}
          {@const catItems = rawData.filter((i) => i.category === cat)}
          {@const learnedCount = catItems.filter((i) =>
            $masteredIds.includes(i.id)
          ).length}
          {@const progress = Math.round((learnedCount / catItems.length) * 100)}
          <div
            onclick={() => startCategorySession(cat)}
            onkeydown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                startCategorySession(cat);
              }
            }}
            role="button"
            tabindex="0"
            aria-label={`${cat}カテゴリーを学習する`}
            class="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 active:bg-gray-50 transition cursor-pointer flex items-center justify-between"
          >
            <div class="flex items-center">
              <div
                class="w-12 h-12 rounded-xl bg-orange-50 text-orange-500 flex items-center justify-center text-xl mr-4"
              >
                {@html getCategoryIcon(cat)}
              </div>
              <div>
                <div class="font-bold text-gray-800">{cat}</div>
                <div class="text-xs text-gray-400">{catItems.length}単語</div>
              </div>
            </div>
            <div class="flex flex-col items-end">
              <span
                class="text-xs font-bold {progress === 100
                  ? 'text-green-500'
                  : 'text-gray-400'}"
              >
                {progress}%
              </span>
              <div
                class="w-16 h-1.5 bg-gray-100 rounded-full mt-1 overflow-hidden"
              >
                <div
                  class="h-full bg-primary transition-all"
                  style="width: {progress}%"
                ></div>
              </div>
            </div>
          </div>
        {/each}
      </div>

      <!-- Quiz Button -->
      <div class="mt-8">
        <button
          onclick={() => goto(`${base}/game/quiz`)}
          class="w-full bg-indigo-500 text-white font-bold py-4 rounded-2xl shadow-lg shadow-indigo-200 active:translate-y-1 transition btn-3d"
        >
          <i class="fas fa-gamepad mr-2"></i> 総合実力テスト (ランダム10問)
        </button>
      </div>
    </div>
  {:else}
    <!-- Card View -->
    <div class="h-full flex flex-col pt-4">
      <!-- Card Area -->
      <div class="flex-1 px-4 pb-24 relative perspective-1000">
        {#if currentItem}
          {#key uniqueKey}
            <div
              in:fly={{ x: direction * 50, duration: 300, opacity: 0 }}
              out:fly={{ x: direction * -50, duration: 300, opacity: 0 }}
              class="h-full absolute inset-x-4 top-0 bottom-24 bg-white rounded-3xl shadow-xl border border-gray-100 flex flex-col items-center justify-center p-6 text-center transition-all cursor-pointer hover:shadow-2xl"
              onclick={toggleMeaning}
              role="button"
              tabindex="0"
              onkeydown={(e) => {
                if (e.key === "Enter" || e.key === " ") toggleMeaning();
              }}
              aria-label="Tap to reveal meaning"
            >
              <div
                class="flex-1 flex flex-col items-center justify-center w-full"
              >
                <div
                  class="text-sm text-gray-400 font-bold mb-4 tracking-widest uppercase"
                >
                  HSK {$currentLevel}
                </div>

                <div class="text-6xl font-bold text-gray-800 mb-4 chinese-text">
                  {currentItem.char}
                </div>

                {#if showingMeaning}
                  <div class="animate-fade-in w-full">
                    <div
                      class="text-2xl text-primary font-serif mb-6 flex items-center justify-center gap-2"
                    >
                      {currentItem.pinyin}
                      <button
                        onclick={(e) => {
                          e.stopPropagation();
                          speak(currentItem.char);
                        }}
                        class="text-primary hover:text-primary-dark transition w-8 h-8 rounded-full flex items-center justify-center hover:bg-orange-50"
                        aria-label="Listen to pronunciation"
                      >
                        <i class="fas fa-volume-up text-sm"></i>
                      </button>
                    </div>
                    <div
                      class="w-12 h-1 bg-gray-100 mx-auto mb-6 rounded-full"
                    ></div>
                    <div class="text-2xl font-bold text-gray-700 mb-6">
                      {currentItem.meaning}
                    </div>

                    <!-- Examples -->
                    {#each getExamples(currentItem) as ex}
                      <div
                        class="text-left bg-gray-50 rounded-xl p-3 mb-2 w-full"
                      >
                        <div
                          class="text-gray-800 font-medium mb-1 chinese-text flex justify-between items-start"
                        >
                          <span>{ex.chinese}</span>
                          <button
                            onclick={(e) => {
                              e.stopPropagation();
                              speak(ex.chinese);
                            }}
                            class="text-gray-400 hover:text-primary p-1"
                            aria-label="Listen to example"
                          >
                            <i class="fas fa-volume-up text-xs"></i>
                          </button>
                        </div>
                        <div class="text-xs text-gray-500">
                          {ex.japanese}
                        </div>
                      </div>
                    {/each}
                  </div>
                {:else}
                  <div class="text-gray-400 text-sm mt-8 animate-pulse">
                    Tap to reveal
                  </div>
                {/if}
              </div>

              <!-- Difficult Button -->
              <button
                class="absolute top-4 left-4 w-10 h-10 rounded-full flex items-center justify-center transition-all {isDifficult
                  ? 'bg-red-100 text-red-500'
                  : 'bg-gray-100 text-gray-300 hover:bg-gray-200'}"
                onclick={(e) => {
                  e.stopPropagation();
                  toggleDifficult();
                }}
                aria-label={isDifficult ? "苦手を解除" : "苦手に登録"}
              >
                <i class="fas fa-flag"></i>
              </button>

              <!-- Master Button -->
              <button
                class="absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center transition-all {isMastered
                  ? 'bg-green-100 text-green-500'
                  : 'bg-gray-100 text-gray-300 hover:bg-gray-200'}"
                onclick={(e) => {
                  e.stopPropagation();
                  toggleMastered();
                }}
                aria-label={isMastered
                  ? "Unmark as mastered"
                  : "Mark as mastered"}
              >
                <i class="fas fa-check"></i>
              </button>

              <!-- Hint Button -->
              {#if showingMeaning}
                <button
                  class="absolute bottom-4 left-1/2 transform -translate-x-1/2 px-6 py-2 rounded-full flex items-center gap-2 transition-all {showHint
                    ? 'bg-yellow-100 text-yellow-600'
                    : 'bg-blue-100 text-blue-600 hover:bg-blue-200'}"
                  onclick={(e) => {
                    e.stopPropagation();
                    toggleHint();
                  }}
                  aria-label={showHint ? "ヒントを閉じる" : "ヒントを表示"}
                >
                  <i class="fas fa-lightbulb"></i>
                  <span class="text-sm font-bold"
                    >{showHint ? "閉じる" : "ヒント"}</span
                  >
                </button>
              {/if}
            </div>
          {/key}
        {/if}
      </div>

      <!-- Hint Panel -->
      {#if showHint && currentItem}
        <div
          class="absolute bottom-24 left-4 right-4 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl shadow-2xl border-2 border-yellow-200 p-4 z-20 max-h-64 overflow-y-auto animate-slide-up"
          transition:fly={{ y: 50, duration: 300 }}
        >
          <div class="flex items-start gap-2 mb-3">
            <i class="fas fa-lightbulb text-yellow-500 text-xl mt-1"></i>
            <h3 class="font-bold text-gray-800 text-lg">学習のヒント</h3>
          </div>
          <div class="space-y-2">
            {#each generateHint(currentItem) as hint}
              <div class="bg-white bg-opacity-60 rounded-lg p-3 text-sm text-gray-700 leading-relaxed">
                {hint}
              </div>
            {/each}
          </div>
        </div>
      {/if}

      <!-- Controls -->
      <div
        class="absolute bottom-20 left-0 right-0 px-8 flex items-center justify-between z-10 pointer-events-none"
      >
        <button
          onclick={prevCard}
          class="pointer-events-auto w-14 h-14 bg-white rounded-full shadow-lg text-gray-400 hover:text-primary flex items-center justify-center transition-transform active:scale-95 border border-gray-100"
          aria-label="Previous card"
        >
          <i class="fas fa-arrow-left text-xl"></i>
        </button>
        <button
          onclick={nextCard}
          class="pointer-events-auto w-14 h-14 bg-primary rounded-full shadow-lg shadow-orange-200 text-white flex items-center justify-center transition-transform active:scale-95 hover:bg-primary-dark"
          aria-label="Next card"
        >
          <i class="fas fa-arrow-right text-xl"></i>
        </button>
      </div>
    </div>
  {/if}
</div>

<style>
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
</style>
