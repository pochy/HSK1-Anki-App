// HSK 1級 指定語句 (150語) + 頻出・生活語句 (Total 450 words)
const hskData = [
  // --- 第1章 HSK指定語句 (150語) ---
  // 1. 代名詞
  {
    id: 101, char: "我", pinyin: "wǒ", meaning: "私", category: "代名詞", examples: [
      { chinese: "我是学生。", japanese: "私は学生です。" },
      { chinese: "我喜欢中国。", japanese: "私は中国が好きです。" },
      { chinese: "我今年二十岁。", japanese: "私は今年20歳です。" }
    ]
  },
  {
    id: 102, char: "你", pinyin: "nǐ", meaning: "あなた", category: "代名詞", examples: [
      { chinese: "你好！", japanese: "こんにちは！" },
      { chinese: "你叫什么名字？", japanese: "あなたの名前は何ですか？" },
      { chinese: "你是哪国人？", japanese: "あなたはどこの国の人ですか？" }
    ]
  },
  {
    id: 103, char: "他", pinyin: "tā", meaning: "彼", category: "代名詞", examples: [
      { chinese: "他是谁？", japanese: "彼は誰ですか？" },
      { chinese: "他是我的朋友。", japanese: "彼は私の友達です。" },
      { chinese: "他在哪儿？", japanese: "彼はどこにいますか？" }
    ]
  },
  {
    id: 104, char: "她", pinyin: "tā", meaning: "彼女", category: "代名詞", examples: [
      { chinese: "她是我的老师。", japanese: "彼女は私の先生です。" },
      { chinese: "她很漂亮。", japanese: "彼女はとても綺麗です。" },
      { chinese: "她喜欢学习。", japanese: "彼女は勉強が好きです。" }
    ]
  },
  {
    id: 105, char: "我们", pinyin: "wǒmen", meaning: "私たち", category: "代名詞", examples: [
      { chinese: "我们去吃饭吧。", japanese: "私たちは食事に行きましょう。" },
      { chinese: "我们是同学。", japanese: "私たちはクラスメートです。" },
      { chinese: "我们一起学习。", japanese: "私たちは一緒に勉強します。" }
    ]
  },
  {
    id: 106, char: "这", pinyin: "zhè", meaning: "これ、この", category: "代名詞", examples: [
      { chinese: "这是什么？", japanese: "これは何ですか？" },
      { chinese: "这是我的书。", japanese: "これは私の本です。" },
      { chinese: "这个人很好。", japanese: "この人はとても良いです。" }
    ]
  },
  {
    id: 107, char: "这儿", pinyin: "zhèr", meaning: "ここ", category: "代名詞", examples: [
      { chinese: "我坐在这儿。", japanese: "私はここに座ります。" },
      { chinese: "这儿很安静。", japanese: "ここはとても静かです。" },
      { chinese: "请到这儿来。", japanese: "ここに来てください。" }
    ]
  },
  {
    id: 108, char: "那", pinyin: "nà", meaning: "あれ、あの", category: "代名詞", examples: [
      { chinese: "那是我的书。", japanese: "あれは私の本です。" },
      { chinese: "那个人是谁？", japanese: "あの人は誰ですか？" },
      { chinese: "那是什么？", japanese: "あれは何ですか？" }
    ]
  },
  {
    id: 109, char: "那儿", pinyin: "nàr", meaning: "あそこ", category: "代名詞", examples: [
      { chinese: "他在那儿。", japanese: "彼はあそこにいます。" },
      { chinese: "那儿有商店。", japanese: "あそこに店があります。" },
      { chinese: "我们去那儿吧。", japanese: "私たちはあそこへ行きましょう。" }
    ]
  },
  {
    id: 110, char: "哪", pinyin: "nǎ", meaning: "どれ、どの", category: "代名詞", examples: [
      { chinese: "你是哪国人？", japanese: "あなたはどこの国の人ですか？" },
      { chinese: "哪本书是你的？", japanese: "どの本があなたのですか？" },
      { chinese: "你想去哪个地方？", japanese: "どの場所に行きたいですか？" }
    ]
  },
  {
    id: 111, char: "哪儿", pinyin: "nǎr", meaning: "どこ", category: "代名詞", examples: [
      { chinese: "你去哪儿？", japanese: "あなたはどこへ行きますか？" },
      { chinese: "洗手间在哪儿？", japanese: "トイレはどこですか？" },
      { chinese: "你从哪儿来？", japanese: "あなたはどこから来ましたか？" }
    ]
  },
  {
    id: 112, char: "谁", pinyin: "shéi", meaning: "誰", category: "代名詞", examples: [
      { chinese: "他是谁？", japanese: "彼は誰ですか？" },
      { chinese: "谁在说话？", japanese: "誰が話していますか？" },
      { chinese: "这是谁的书？", japanese: "これは誰の本ですか？" }
    ]
  },
  {
    id: 113, char: "什么", pinyin: "shénme", meaning: "何", category: "代名詞", examples: [
      { chinese: "你喝什么？", japanese: "あなたは何を飲みますか？" },
      { chinese: "这是什么？", japanese: "これは何ですか？" },
      { chinese: "你想吃什么？", japanese: "あなたは何を食べたいですか？" }
    ]
  },
  {
    id: 114, char: "多少", pinyin: "duōshao", meaning: "いくつ（多い）", category: "代名詞", examples: [
      { chinese: "这个多少钱？", japanese: "これはいくらですか？" },
      { chinese: "你们班有多少人？", japanese: "あなたのクラスには何人いますか？" },
      { chinese: "你今年多少岁？", japanese: "あなたは今年何歳ですか？" }
    ]
  },
  {
    id: 115, char: "几", pinyin: "jǐ", meaning: "いくつ（少ない）", category: "代名詞", examples: [
      { chinese: "你有几个苹果？", japanese: "あなたはリンゴをいくつ持っていますか？" },
      { chinese: "现在几点了？", japanese: "今は何時ですか？" },
      { chinese: "你学汉语几年了？", japanese: "あなたは中国語を何年勉強していますか？" }
    ]
  },
  {
    id: 116, char: "怎么", pinyin: "zěnme", meaning: "どうやって", category: "代名詞", examples: [
      { chinese: "这个字怎么读？", japanese: "この字はどう読みますか？" },
      { chinese: "怎么去学校？", japanese: "どうやって学校へ行きますか？" },
      { chinese: "你怎么了？", japanese: "どうしたんですか？" }
    ]
  },
  {
    id: 117, char: "怎么样", pinyin: "zěnmeyàng", meaning: "どうですか", category: "代名詞", examples: [
      { chinese: "天气怎么样？", japanese: "天気はどうですか？" },
      { chinese: "这本书怎么样？", japanese: "この本はどうですか？" },
      { chinese: "你觉得怎么样？", japanese: "どう思いますか？" }
    ]
  },

  // 2. 数詞
  {
    id: 201, char: "一", pinyin: "yī", meaning: "1", category: "数詞", examples: [
      { chinese: "一月一日。", japanese: "1月1日。" },
      { chinese: "一个人。", japanese: "一人。" },
      { chinese: "一本书。", japanese: "一冊の本。" }
    ]
  },
  {
    id: 202, char: "二", pinyin: "èr", meaning: "2", category: "数詞", examples: [
      { chinese: "二月二日。", japanese: "2月2日。" },
      { chinese: "二个人。", japanese: "二人。" },
      { chinese: "二年级。", japanese: "2年生。" }
    ]
  },
  {
    id: 203, char: "三", pinyin: "sān", meaning: "3", category: "数詞", examples: [
      { chinese: "星期三。", japanese: "水曜日。" },
      { chinese: "三个苹果。", japanese: "3つのリンゴ。" },
      { chinese: "三月。", japanese: "3月。" }
    ]
  },
  {
    id: 204, char: "四", pinyin: "sì", meaning: "4", category: "数詞", examples: [
      { chinese: "四个苹果。", japanese: "4つのリンゴ。" },
      { chinese: "四月。", japanese: "4月。" },
      { chinese: "四点钟。", japanese: "4時。" }
    ]
  },
  {
    id: 205, char: "五", pinyin: "wǔ", meaning: "5", category: "数詞", examples: [
      { chinese: "五个人。", japanese: "5人。" },
      { chinese: "五月。", japanese: "5月。" },
      { chinese: "五块钱。", japanese: "5元。" }
    ]
  },
  {
    id: 206, char: "六", pinyin: "liù", meaning: "6", category: "数詞", examples: [
      { chinese: "六点。", japanese: "6時。" },
      { chinese: "六月。", japanese: "6月。" },
      { chinese: "六个人。", japanese: "6人。" }
    ]
  },
  {
    id: 207, char: "七", pinyin: "qī", meaning: "7", category: "数詞", examples: [
      { chinese: "七岁。", japanese: "7歳。" },
      { chinese: "七月。", japanese: "7月。" },
      { chinese: "七点。", japanese: "7時。" }
    ]
  },
  {
    id: 208, char: "八", pinyin: "bā", meaning: "8", category: "数詞", examples: [
      { chinese: "八块钱。", japanese: "8元。" },
      { chinese: "八月。", japanese: "8月。" },
      { chinese: "八个人。", japanese: "8人。" }
    ]
  },
  {
    id: 209, char: "九", pinyin: "jiǔ", meaning: "9", category: "数詞", examples: [
      { chinese: "九月。", japanese: "9月。" },
      { chinese: "九点。", japanese: "9時。" },
      { chinese: "九个人。", japanese: "9人。" }
    ]
  },
  {
    id: 210, char: "十", pinyin: "shí", meaning: "10", category: "数詞", examples: [
      { chinese: "十月。", japanese: "10月。" },
      { chinese: "十个人。", japanese: "10人。" },
      { chinese: "十块钱。", japanese: "10元。" }
    ]
  },
  {
    id: 211, char: "零", pinyin: "líng", meaning: "0", category: "数詞", examples: [
      { chinese: "二零二五年。", japanese: "2025年。" },
      { chinese: "零下五度。", japanese: "マイナス5度。" },
      { chinese: "电话号码：一三零。", japanese: "電話番号：130。" }
    ]
  },

  // 3. 量詞
  {
    id: 301, char: "个", pinyin: "gè", meaning: "個、人", category: "量詞", examples: [
      { chinese: "一个人。", japanese: "一人。" },
      { chinese: "一个苹果。", japanese: "一個のリンゴ。" },
      { chinese: "三个学生。", japanese: "3人の学生。" }
    ]
  },
  {
    id: 302, char: "岁", pinyin: "suì", meaning: "歳", category: "量詞", examples: [
      { chinese: "我二十岁。", japanese: "私は20歳です。" },
      { chinese: "他五岁。", japanese: "彼は5歳です。" },
      { chinese: "你几岁？", japanese: "あなたは何歳ですか？" }
    ]
  },
  {
    id: 303, char: "本", pinyin: "běn", meaning: "冊", category: "量詞", examples: [
      { chinese: "一本书。", japanese: "一冊の本。" },
      { chinese: "三本书。", japanese: "3冊の本。" },
      { chinese: "买几本书？", japanese: "何冊の本を買いますか？" }
    ]
  },
  {
    id: 304, char: "些", pinyin: "xiē", meaning: "いくつかの", category: "量詞", examples: [
      { chinese: "这些书。", japanese: "これらの本。" },
      { chinese: "那些苹果。", japanese: "あれらのリンゴ。" },
      { chinese: "买些水果。", japanese: "いくつかの果物を買う。" }
    ]
  },
  {
    id: 305, char: "块", pinyin: "kuài", meaning: "元（通貨）、かたまり", category: "量詞", examples: [
      { chinese: "五十块钱。", japanese: "50元。" },
      { chinese: "一块钱。", japanese: "1元。" },
      { chinese: "这块糖。", japanese: "このかたまりの飴。" }
    ]
  },

  // 4. 名詞 (人物・場所・時間・物)
  {
    id: 401, char: "家", pinyin: "jiā", meaning: "家、家族", category: "名詞", examples: [
      { chinese: "大家", japanese: "みんな" },
      { chinese: "我回家了。", japanese: "私は家に帰りました。" },
      { chinese: "这是我的家。", japanese: "これは私の家です。" }
    ]
  },
  {
    id: 402, char: "学校", pinyin: "xuéxiào", meaning: "学校", category: "名詞", examples: [
      { chinese: "我去学校。", japanese: "私は学校へ行きます。" },
      { chinese: "学校很大。", japanese: "学校はとても大きいです。" },
      { chinese: "在学校学习。", japanese: "学校で勉強します。" }
    ]
  },
  {
    id: 403, char: "饭店", pinyin: "fàndiàn", meaning: "レストラン、ホテル", category: "名詞", examples: [
      { chinese: "大饭店。", japanese: "大きなホテル。" },
      { chinese: "去饭店吃饭。", japanese: "レストランへ行ってご飯を食べる。" },
      { chinese: "这家饭店很好。", japanese: "このレストランはとても良いです。" }
    ]
  },
  {
    id: 404, char: "商店", pinyin: "shāngdiàn", meaning: "店", category: "名詞", examples: [
      { chinese: "去商店买东西。", japanese: "店へ行って物を買う。" },
      { chinese: "商店开门了。", japanese: "店が開きました。" },
      { chinese: "这家商店很便宜。", japanese: "この店はとても安いです。" }
    ]
  },
  {
    id: 405, char: "医院", pinyin: "yīyuàn", meaning: "病院", category: "名詞", examples: [
      { chinese: "他在医院工作。", japanese: "彼は病院で働いています。" },
      { chinese: "去医院看病。", japanese: "病院へ行って診てもらう。" },
      { chinese: "医院在哪儿？", japanese: "病院はどこですか？" }
    ]
  },
  {
    id: 406, char: "火车站", pinyin: "huǒchēzhàn", meaning: "駅", category: "名詞", examples: [
      { chinese: "去火车站。", japanese: "駅へ行く。" },
      { chinese: "火车站很远。", japanese: "駅はとても遠いです。" },
      { chinese: "在火车站等车。", japanese: "駅で電車を待つ。" }
    ]
  },
  {
    id: 407, char: "中国", pinyin: "Zhōngguó", meaning: "中国", category: "名詞", examples: [
      { chinese: "中国人。", japanese: "中国人。" },
      { chinese: "我去中国。", japanese: "私は中国へ行きます。" },
      { chinese: "中国很大。", japanese: "中国はとても大きいです。" }
    ]
  },
  {
    id: 408, char: "北京", pinyin: "Běijīng", meaning: "北京", category: "名詞", examples: [
      { chinese: "北京烤鸭。", japanese: "北京ダック。" },
      { chinese: "我去北京。", japanese: "私は北京へ行きます。" },
      { chinese: "北京是中国的首都。", japanese: "北京は中国の首都です。" }
    ]
  },
  {
    id: 409, char: "爸爸", pinyin: "bàba", meaning: "お父さん", category: "名詞", examples: [
      { chinese: "我爸爸是医生。", japanese: "私の父は医者です。" },
      { chinese: "爸爸回来了。", japanese: "父が帰ってきました。" },
      { chinese: "我爱爸爸。", japanese: "私は父を愛しています。" }
    ]
  },
  {
    id: 410, char: "妈妈", pinyin: "māma", meaning: "お母さん", category: "名詞", examples: [
      { chinese: "我爱妈妈。", japanese: "私は母を愛しています。" },
      { chinese: "妈妈在做饭。", japanese: "母は料理を作っています。" },
      { chinese: "我妈妈很忙。", japanese: "私の母はとても忙しいです。" }
    ]
  },
  {
    id: 411, char: "儿子", pinyin: "érzi", meaning: "息子", category: "名詞", examples: [
      { chinese: "我儿子五岁。", japanese: "私の息子は5歳です。" },
      { chinese: "儿子去学校了。", japanese: "息子は学校へ行きました。" },
      { chinese: "我有一个儿子。", japanese: "私には息子が一人います。" }
    ]
  },
  {
    id: 412, char: "女儿", pinyin: "nǚ'ér", meaning: "娘", category: "名詞", examples: [
      { chinese: "她是我女儿。", japanese: "彼女は私の娘です。" },
      { chinese: "女儿很聪明。", japanese: "娘はとても賢いです。" },
      { chinese: "我女儿喜欢画画。", japanese: "私の娘は絵を描くのが好きです。" }
    ]
  },
  {
    id: 413, char: "老师", pinyin: "lǎoshī", meaning: "先生", category: "名詞", examples: [
      { chinese: "王老师。", japanese: "王先生。" },
      { chinese: "老师很好。", japanese: "先生はとても良いです。" },
      { chinese: "我们的老师很年轻。", japanese: "私たちの先生はとても若いです。" }
    ]
  },
  {
    id: 414, char: "学生", pinyin: "xuésheng", meaning: "学生", category: "名詞", examples: [
      { chinese: "他是好学生。", japanese: "彼は良い学生です。" },
      { chinese: "我是学生。", japanese: "私は学生です。" },
      { chinese: "学生们在教室里。", japanese: "学生たちは教室にいます。" }
    ]
  },
  {
    id: 415, char: "同学", pinyin: "tóngxué", meaning: "クラスメート", category: "名詞", examples: [
      { chinese: "我们是同学。", japanese: "私たちはクラスメートです。" },
      { chinese: "我的同学很好。", japanese: "私のクラスメートはとても良いです。" },
      { chinese: "和同学一起学习。", japanese: "クラスメートと一緒に勉強する。" }
    ]
  },
  {
    id: 416, char: "朋友", pinyin: "péngyou", meaning: "友達", category: "名詞", examples: [
      { chinese: "好朋友。", japanese: "親友。" },
      { chinese: "他是我的朋友。", japanese: "彼は私の友達です。" },
      { chinese: "和朋友一起玩。", japanese: "友達と一緒に遊ぶ。" }
    ]
  },
  {
    id: 417, char: "医生", pinyin: "yīshēng", meaning: "医者", category: "名詞", examples: [
      { chinese: "看医生。", japanese: "医者に診てもらう。" },
      { chinese: "他是医生。", japanese: "彼は医者です。" },
      { chinese: "医生很忙。", japanese: "医者はとても忙しいです。" }
    ]
  },
  {
    id: 418, char: "先生", pinyin: "xiānsheng", meaning: "～さん（男性）、夫", category: "名詞", examples: [
      { chinese: "李先生。", japanese: "李さん。" },
      { chinese: "这位先生是谁？", japanese: "この方は誰ですか？" },
      { chinese: "我先生是老师。", japanese: "私の夫は先生です。" }
    ]
  },
  {
    id: 419, char: "小姐", pinyin: "xiǎojiě", meaning: "～さん（女性）", category: "名詞", examples: [
      { chinese: "张小姐。", japanese: "張さん。" },
      { chinese: "这位小姐很漂亮。", japanese: "この女性はとても綺麗です。" },
      { chinese: "小姐，请问...", japanese: "すみません、お尋ねします..." }
    ]
  },
  {
    id: 501, char: "现在", pinyin: "xiànzài", meaning: "今", category: "名詞（時間・物）", examples: [
      { chinese: "现在几点？", japanese: "今は何時ですか？" },
      { chinese: "现在去吗？", japanese: "今行きますか？" },
      { chinese: "我现在很忙。", japanese: "私は今とても忙しいです。" }
    ]
  },
  {
    id: 502, char: "今天", pinyin: "jīntiān", meaning: "今日", category: "名詞（時間・物）", examples: [
      { chinese: "今天是星期一。", japanese: "今日は月曜日です。" },
      { chinese: "今天天气很好。", japanese: "今日は天気がとても良いです。" },
      { chinese: "今天你做什么？", japanese: "今日は何をしますか？" }
    ]
  },
  {
    id: 503, char: "明天", pinyin: "míngtiān", meaning: "明日", category: "名詞（時間・物）", examples: [
      { chinese: "明天见。", japanese: "また明日。" },
      { chinese: "明天去北京。", japanese: "明日北京へ行きます。" },
      { chinese: "明天是星期几？", japanese: "明日は何曜日ですか？" }
    ]
  },
  {
    id: 504, char: "昨天", pinyin: "zuótiān", meaning: "昨日", category: "名詞（時間・物）", examples: [
      { chinese: "昨天很冷。", japanese: "昨日は寒かった。" },
      { chinese: "昨天你去哪儿了？", japanese: "昨日はどこへ行きましたか？" },
      { chinese: "昨天是星期天。", japanese: "昨日は日曜日でした。" }
    ]
  },
  {
    id: 505, char: "上午", pinyin: "shàngwǔ", meaning: "午前", category: "名詞（時間・物）", examples: [
      { chinese: "上午好。", japanese: "おはようございます。" },
      { chinese: "上午有课。", japanese: "午前に授業があります。" },
      { chinese: "上午很忙。", japanese: "午前はとても忙しいです。" }
    ]
  },
  {
    id: 506, char: "中午", pinyin: "zhōngwǔ", meaning: "昼、正午", category: "名詞（時間・物）", examples: [
      { chinese: "中午吃饭。", japanese: "昼にご飯を食べる。" },
      { chinese: "中午十二点。", japanese: "昼の12時。" },
      { chinese: "中午休息一下。", japanese: "昼に少し休む。" }
    ]
  },
  {
    id: 507, char: "下午", pinyin: "xiàwǔ", meaning: "午後", category: "名詞（時間・物）", examples: [
      { chinese: "下午好。", japanese: "こんにちは。" },
      { chinese: "下午去公园。", japanese: "午後に公園へ行きます。" },
      { chinese: "下午三点。", japanese: "午後3時。" }
    ]
  },
  {
    id: 508, char: "年", pinyin: "nián", meaning: "年", category: "名詞（時間・物）", examples: [
      { chinese: "明年。", japanese: "来年。" },
      { chinese: "今年是2025年。", japanese: "今年は2025年です。" },
      { chinese: "一年有十二个月。", japanese: "一年には12ヶ月あります。" }
    ]
  },
  {
    id: 509, char: "月", pinyin: "yuè", meaning: "月", category: "名詞（時間・物）", examples: [
      { chinese: "一月。", japanese: "一月。" },
      { chinese: "这个月很忙。", japanese: "今月はとても忙しいです。" },
      { chinese: "下个月去旅游。", japanese: "来月旅行に行きます。" }
    ]
  },
  {
    id: 510, char: "号", pinyin: "hào", meaning: "日", category: "名詞（時間・物）", examples: [
      { chinese: "五月一号。", japanese: "5月1日。" },
      { chinese: "今天是几号？", japanese: "今日は何日ですか？" },
      { chinese: "一号是星期一。", japanese: "1日は月曜日です。" }
    ]
  },
  {
    id: 511, char: "星期", pinyin: "xīngqī", meaning: "週、曜日", category: "名詞（時間・物）", examples: [
      { chinese: "星期日。", japanese: "日曜日。" },
      { chinese: "这个星期很忙。", japanese: "今週はとても忙しいです。" },
      { chinese: "下星期去北京。", japanese: "来週北京へ行きます。" }
    ]
  },
  {
    id: 512, char: "点", pinyin: "diǎn", meaning: "時", category: "名詞（時間・物）", examples: [
      { chinese: "七点。", japanese: "7時。" },
      { chinese: "现在几点？", japanese: "今は何時ですか？" },
      { chinese: "八点上课。", japanese: "8時に授業があります。" }
    ]
  },
  {
    id: 513, char: "分钟", pinyin: "fēnzhōng", meaning: "分", category: "名詞（時間・物）", examples: [
      { chinese: "十分钟。", japanese: "10分。" },
      { chinese: "等五分钟。", japanese: "5分待つ。" },
      { chinese: "还有几分钟？", japanese: "あと何分ありますか？" }
    ]
  },
  {
    id: 514, char: "时候", pinyin: "shíhou", meaning: "時、ころ", category: "名詞（時間・物）", examples: [
      { chinese: "什么时候？", japanese: "いつですか？" },
      { chinese: "吃饭的时候。", japanese: "ご飯を食べる時。" },
      { chinese: "什么时候去？", japanese: "いつ行きますか？" }
    ]
  },
  {
    id: 515, char: "字", pinyin: "zì", meaning: "字", category: "名詞（時間・物）", examples: [
      { chinese: "汉字。", japanese: "漢字。" },
      { chinese: "这个字怎么读？", japanese: "この字はどう読みますか？" },
      { chinese: "写几个字。", japanese: "いくつかの字を書く。" }
    ]
  },
  {
    id: 516, char: "名字", pinyin: "míngzi", meaning: "名前", category: "名詞（時間・物）", examples: [
      { chinese: "你叫什么名字？", japanese: "あなたの名前は何ですか？" },
      { chinese: "我的名字是李明。", japanese: "私の名前は李明です。" },
      { chinese: "这个名字很好听。", japanese: "この名前はとても良い響きです。" }
    ]
  },
  {
    id: 517, char: "书", pinyin: "shū", meaning: "本", category: "名詞（時間・物）", examples: [
      { chinese: "看书。", japanese: "本を読む。" },
      { chinese: "这本书很好。", japanese: "この本はとても良いです。" },
      { chinese: "买一本书。", japanese: "一冊の本を買う。" }
    ]
  },
  {
    id: 518, char: "桌子", pinyin: "zhuōzi", meaning: "机、テーブル", category: "名詞（時間・物）", examples: [
      { chinese: "在桌子上。", japanese: "机の上に。" },
      { chinese: "这张桌子很大。", japanese: "この机はとても大きいです。" },
      { chinese: "把书放在桌子上。", japanese: "本を机の上に置く。" }
    ]
  },
  {
    id: 519, char: "椅子", pinyin: "yǐzi", meaning: "椅子", category: "名詞（時間・物）", examples: [
      { chinese: "请坐椅子。", japanese: "椅子に座ってください。" },
      { chinese: "这把椅子很舒服。", japanese: "この椅子はとても快適です。" },
      { chinese: "坐在椅子上。", japanese: "椅子に座る。" }
    ]
  },
  {
    id: 520, char: "衣服", pinyin: "yīfu", meaning: "服", category: "名詞（時間・物）", examples: [
      { chinese: "漂亮的衣服。", japanese: "きれいな服。" },
      { chinese: "买新衣服。", japanese: "新しい服を買う。" },
      { chinese: "洗衣服。", japanese: "服を洗う。" }
    ]
  },
  {
    id: 521, char: "水", pinyin: "shuǐ", meaning: "水", category: "名詞（時間・物）", examples: [
      { chinese: "喝水。", japanese: "水を飲む。" },
      { chinese: "一杯水。", japanese: "一杯の水。" },
      { chinese: "水很干净。", japanese: "水はとてもきれいです。" }
    ]
  },
  {
    id: 522, char: "菜", pinyin: "cài", meaning: "料理、野菜", category: "名詞（時間・物）", examples: [
      { chinese: "做菜。", japanese: "料理を作る。" },
      { chinese: "这个菜很好吃。", japanese: "この料理はとても美味しいです。" },
      { chinese: "买些菜。", japanese: "いくつかの野菜を買う。" }
    ]
  },
  {
    id: 523, char: "米饭", pinyin: "mǐfàn", meaning: "ご飯（米）", category: "名詞（時間・物）", examples: [
      { chinese: "吃米饭。", japanese: "ご飯を食べる。" },
      { chinese: "一碗米饭。", japanese: "一杯のご飯。" },
      { chinese: "米饭很好吃。", japanese: "ご飯はとても美味しいです。" }
    ]
  },
  {
    id: 524, char: "水果", pinyin: "shuǐguǒ", meaning: "果物", category: "名詞（時間・物）", examples: [
      { chinese: "买水果。", japanese: "果物を買う。" },
      { chinese: "吃水果。", japanese: "果物を食べる。" },
      { chinese: "这些水果很新鲜。", japanese: "これらの果物はとても新鮮です。" }
    ]
  },
  {
    id: 525, char: "苹果", pinyin: "píngguǒ", meaning: "リンゴ", category: "名詞（時間・物）", examples: [
      { chinese: "一个苹果。", japanese: "一個のリンゴ。" },
      { chinese: "吃苹果。", japanese: "リンゴを食べる。" },
      { chinese: "这个苹果很甜。", japanese: "このリンゴはとても甘いです。" }
    ]
  },
  {
    id: 526, char: "茶", pinyin: "chá", meaning: "お茶", category: "名詞（時間・物）", examples: [
      { chinese: "喝茶。", japanese: "お茶を飲む。" },
      { chinese: "一杯茶。", japanese: "一杯のお茶。" },
      { chinese: "中国茶很好喝。", japanese: "中国茶はとても美味しいです。" }
    ]
  },
  {
    id: 527, char: "杯子", pinyin: "bēizi", meaning: "コップ", category: "名詞（時間・物）", examples: [
      { chinese: "水杯。", japanese: "水飲みコップ。" },
      { chinese: "一个杯子。", japanese: "一つのコップ。" },
      { chinese: "用杯子喝水。", japanese: "コップで水を飲む。" }
    ]
  },
  {
    id: 528, char: "钱", pinyin: "qián", meaning: "お金", category: "名詞（時間・物）", examples: [
      { chinese: "多少钱？", japanese: "いくらですか？" },
      { chinese: "带钱。", japanese: "お金を持っていく。" },
      { chinese: "没有钱。", japanese: "お金がない。" }
    ]
  },
  {
    id: 529, char: "飞机", pinyin: "fēijī", meaning: "飛行機", category: "名詞（時間・物）", examples: [
      { chinese: "坐飞机。", japanese: "飛行機に乗る。" },
      { chinese: "飞机很快。", japanese: "飛行機はとても速いです。" },
      { chinese: "去机场坐飞机。", japanese: "空港へ行って飛行機に乗る。" }
    ]
  },
  {
    id: 530, char: "出租车", pinyin: "chūzūchē", meaning: "タクシー", category: "名詞（時間・物）", examples: [
      { chinese: "坐出租车。", japanese: "タクシーに乗る。" },
      { chinese: "叫出租车。", japanese: "タクシーを呼ぶ。" },
      { chinese: "出租车很方便。", japanese: "タクシーはとても便利です。" }
    ]
  },
  {
    id: 531, char: "电视", pinyin: "diànshì", meaning: "テレビ", category: "名詞（時間・物）", examples: [
      { chinese: "看电视。", japanese: "テレビを見る。" },
      { chinese: "打开电视。", japanese: "テレビをつける。" },
      { chinese: "电视节目。", japanese: "テレビ番組。" }
    ]
  },
  {
    id: 532, char: "电脑", pinyin: "diànnǎo", meaning: "コンピュータ", category: "名詞（時間・物）", examples: [
      { chinese: "玩电脑。", japanese: "パソコンで遊ぶ。" },
      { chinese: "用电脑学习。", japanese: "パソコンで勉強する。" },
      { chinese: "买新电脑。", japanese: "新しいパソコンを買う。" }
    ]
  },
  {
    id: 533, char: "电影", pinyin: "diànyǐng", meaning: "映画", category: "名詞（時間・物）", examples: [
      { chinese: "看电影。", japanese: "映画を見る。" },
      { chinese: "好电影。", japanese: "良い映画。" },
      { chinese: "去看电影。", japanese: "映画を見に行く。" }
    ]
  },
  {
    id: 534, char: "天气", pinyin: "tiānqì", meaning: "天気", category: "名詞（時間・物）", examples: [
      { chinese: "天气很好。", japanese: "天気がとても良い。" },
      { chinese: "今天天气怎么样？", japanese: "今日の天気はどうですか？" },
      { chinese: "天气很热。", japanese: "天気はとても暑いです。" }
    ]
  },
  {
    id: 535, char: "猫", pinyin: "māo", meaning: "猫", category: "名詞（時間・物）", examples: [
      { chinese: "小猫。", japanese: "子猫。" },
      { chinese: "我喜欢猫。", japanese: "私は猫が好きです。" },
      { chinese: "这只猫很可爱。", japanese: "この猫はとても可愛いです。" }
    ]
  },
  {
    id: 536, char: "狗", pinyin: "gǒu", meaning: "犬", category: "名詞（時間・物）", examples: [
      { chinese: "小狗。", japanese: "子犬。" },
      { chinese: "我有一只狗。", japanese: "私には犬が一匹います。" },
      { chinese: "狗很聪明。", japanese: "犬はとても賢いです。" }
    ]
  },
  {
    id: 537, char: "东西", pinyin: "dōngxi", meaning: "物", category: "名詞（時間・物）", examples: [
      { chinese: "买东西。", japanese: "買い物をする。" },
      { chinese: "这是什么东西？", japanese: "これは何ですか？" },
      { chinese: "东西很贵。", japanese: "物はとても高いです。" }
    ]
  },

  // 5. 動詞
  {
    id: 601, char: "谢谢", pinyin: "xièxie", meaning: "ありがとう", category: "動詞", examples: [
      { chinese: "谢谢你。", japanese: "ありがとう。" },
      { chinese: "谢谢你的帮助。", japanese: "助けてくれてありがとう。" },
      { chinese: "非常感谢。", japanese: "とても感謝しています。" }
    ]
  },
  {
    id: 602, char: "不客气", pinyin: "bú kèqi", meaning: "どういたしまして", category: "動詞", examples: [
      { chinese: "不客气。", japanese: "どういたしまして。" },
      { chinese: "不客气，这是应该的。", japanese: "どういたしまして、これは当然のことです。" },
      { chinese: "别客气。", japanese: "遠慮しないでください。" }
    ]
  },
  {
    id: 603, char: "再见", pinyin: "zàijiàn", meaning: "さようなら", category: "動詞", examples: [
      { chinese: "再见！", japanese: "さようなら！" },
      { chinese: "明天再见。", japanese: "また明日。" },
      { chinese: "再见，路上小心。", japanese: "さようなら、道中気をつけて。" }
    ]
  },
  {
    id: 604, char: "请", pinyin: "qǐng", meaning: "どうぞ～してください", category: "動詞", examples: [
      { chinese: "请进。", japanese: "どうぞお入りください。" },
      { chinese: "请坐。", japanese: "どうぞお座りください。" },
      { chinese: "请喝茶。", japanese: "どうぞお茶を飲んでください。" }
    ]
  },
  {
    id: 605, char: "对不起", pinyin: "duìbuqi", meaning: "ごめんなさい", category: "動詞", examples: [
      { chinese: "对不起。", japanese: "ごめんなさい。" },
      { chinese: "对不起，我迟到了。", japanese: "ごめんなさい、遅刻しました。" },
      { chinese: "对不起，打扰了。", japanese: "ごめんなさい、お邪魔しました。" }
    ]
  },
  {
    id: 606, char: "没关系", pinyin: "méi guānxi", meaning: "大丈夫です", category: "動詞", examples: [
      { chinese: "没关系。", japanese: "気にしないでください。" },
      { chinese: "没关系，不要紧。", japanese: "大丈夫です、問題ありません。" },
      { chinese: "没关系，下次注意。", japanese: "大丈夫です、次回気をつけます。" }
    ]
  },
  {
    id: 607, char: "是", pinyin: "shì", meaning: "はい、〜です", category: "動詞", examples: [
      { chinese: "我是学生。", japanese: "私は学生です。" },
      { chinese: "这是你的书。", japanese: "これはあなたの本です。" },
      { chinese: "他是我的老师。", japanese: "彼は私の先生です。" }
    ]
  },
  {
    id: 608, char: "有", pinyin: "yǒu", meaning: "ある、いる", category: "動詞", examples: [
      { chinese: "我有一本书。", japanese: "私は本を一冊持っています。" },
      { chinese: "有朋友。", japanese: "友達がいます。" },
      { chinese: "有时间吗？", japanese: "時間がありますか？" }
    ]
  },
  {
    id: 609, char: "看", pinyin: "kàn", meaning: "見る、読む", category: "動詞", examples: [
      { chinese: "看书。", japanese: "本を読む。" },
      { chinese: "看电视。", japanese: "テレビを見る。" },
      { chinese: "看朋友。", japanese: "友達に会う。" }
    ]
  },
  {
    id: 610, char: "听", pinyin: "tīng", meaning: "聞く", category: "動詞", examples: [
      { chinese: "听音乐。", japanese: "音楽を聴く。" },
      { chinese: "听老师说话。", japanese: "先生の話を聞く。" },
      { chinese: "听不清楚。", japanese: "はっきり聞こえない。" }
    ]
  },
  {
    id: 611, char: "说", pinyin: "shuō", meaning: "話す", category: "動詞", examples: [
      { chinese: "说汉语。", japanese: "中国語を話す。" },
      { chinese: "说话。", japanese: "話す。" },
      { chinese: "说得很好。", japanese: "とても上手に話します。" }
    ]
  },
  {
    id: 612, char: "读", pinyin: "dú", meaning: "読む", category: "動詞", examples: [
      { chinese: "读书。", japanese: "本を読む/勉強する。" },
      { chinese: "读课文。", japanese: "本文を読む。" },
      { chinese: "读汉字。", japanese: "漢字を読む。" }
    ]
  },
  {
    id: 613, char: "写", pinyin: "xiě", meaning: "書く", category: "動詞", examples: [
      { chinese: "写字。", japanese: "字を書く。" },
      { chinese: "写作业。", japanese: "宿題を書く。" },
      { chinese: "写汉字。", japanese: "漢字を書く。" }
    ]
  },
  {
    id: 614, char: "看见", pinyin: "kànjiàn", meaning: "見える、見かける", category: "動詞", examples: [
      { chinese: "我看见他了。", japanese: "彼を見かけました。" },
      { chinese: "看见朋友。", japanese: "友達を見かける。" },
      { chinese: "看不见。", japanese: "見えない。" }
    ]
  },
  {
    id: 615, char: "叫", pinyin: "jiào", meaning: "～という名前だ", category: "動詞", examples: [
      { chinese: "我叫李明。", japanese: "私は李明と言います。" },
      { chinese: "你叫什么名字？", japanese: "あなたの名前は何ですか？" },
      { chinese: "叫老师。", japanese: "先生を呼ぶ。" }
    ]
  },
  {
    id: 616, char: "来", pinyin: "lái", meaning: "来る", category: "動詞", examples: [
      { chinese: "你来吗？", japanese: "あなたは来ますか？" },
      { chinese: "来北京。", japanese: "北京に来る。" },
      { chinese: "来我家。", japanese: "私の家に来る。" }
    ]
  },
  {
    id: 617, char: "回", pinyin: "huí", meaning: "帰る、戻る", category: "動詞", examples: [
      { chinese: "回家。", japanese: "家に帰る。" },
      { chinese: "回学校。", japanese: "学校に戻る。" },
      { chinese: "回电话。", japanese: "電話をかけ直す。" }
    ]
  },
  {
    id: 618, char: "去", pinyin: "qù", meaning: "行く", category: "動詞", examples: [
      { chinese: "去学校。", japanese: "学校へ行く。" },
      { chinese: "我去北京。", japanese: "私は北京へ行きます。" },
      { chinese: "明天去吗？", japanese: "明日行きますか？" }
    ]
  },
  {
    id: 619, char: "吃", pinyin: "chī", meaning: "食べる", category: "動詞", examples: [
      { chinese: "吃饭。", japanese: "ご飯を食べる。" },
      { chinese: "吃苹果。", japanese: "リンゴを食べる。" },
      { chinese: "你吃什么？", japanese: "あなたは何を食べますか？" }
    ]
  },
  {
    id: 620, char: "喝", pinyin: "hē", meaning: "飲む", category: "動詞", examples: [
      { chinese: "喝茶。", japanese: "お茶を飲む。" },
      { chinese: "喝水。", japanese: "水を飲む。" },
      { chinese: "喝咖啡。", japanese: "コーヒーを飲む。" }
    ]
  },
  {
    id: 621, char: "睡觉", pinyin: "shuìjiào", meaning: "寝る", category: "動詞", examples: [
      { chinese: "去睡觉。", japanese: "寝に行く。" },
      { chinese: "早睡觉。", japanese: "早く寝る。" },
      { chinese: "睡觉前看书。", japanese: "寝る前に本を読む。" }
    ]
  },
  {
    id: 622, char: "打电话", pinyin: "dǎ diànhuà", meaning: "電話をかける", category: "動詞", examples: [
      { chinese: "他在打电话。", japanese: "彼は電話をしています。" },
      { chinese: "给朋友打电话。", japanese: "友達に電話をかける。" },
      { chinese: "打电话问一下。", japanese: "電話で聞いてみる。" }
    ]
  },
  {
    id: 623, char: "做", pinyin: "zuò", meaning: "する、作る", category: "動詞", examples: [
      { chinese: "做饭。", japanese: "料理を作る。" },
      { chinese: "做作业。", japanese: "宿題をする。" },
      { chinese: "做什么？", japanese: "何をしますか？" }
    ]
  },
  {
    id: 624, char: "买", pinyin: "mǎi", meaning: "買う", category: "動詞", examples: [
      { chinese: "买衣服。", japanese: "服を買う。" },
      { chinese: "买水果。", japanese: "果物を買う。" },
      { chinese: "买东西。", japanese: "物を買う。" }
    ]
  },
  {
    id: 625, char: "开", pinyin: "kāi", meaning: "開ける、運転する", category: "動詞", examples: [
      { chinese: "开车。", japanese: "車を運転する。" },
      { chinese: "开门。", japanese: "ドアを開ける。" },
      { chinese: "开灯。", japanese: "電気をつける。" }
    ]
  },
  {
    id: 626, char: "坐", pinyin: "zuò", meaning: "座る、乗る", category: "動詞", examples: [
      { chinese: "坐飞机。", japanese: "飛行機に乗る。" },
      { chinese: "坐椅子。", japanese: "椅子に座る。" },
      { chinese: "坐公共汽车。", japanese: "バスに乗る。" }
    ]
  },
  {
    id: 627, char: "住", pinyin: "zhù", meaning: "住む", category: "動詞", examples: [
      { chinese: "住在北京。", japanese: "北京に住む。" },
      { chinese: "住学校。", japanese: "学校に住む。" },
      { chinese: "住在哪儿？", japanese: "どこに住んでいますか？" }
    ]
  },
  {
    id: 628, char: "学习", pinyin: "xuéxí", meaning: "勉強する", category: "動詞", examples: [
      { chinese: "学习汉语。", japanese: "中国語を勉強する。" },
      { chinese: "努力学习。", japanese: "一生懸命勉強する。" },
      { chinese: "在学校学习。", japanese: "学校で勉強する。" }
    ]
  },
  {
    id: 629, char: "工作", pinyin: "gōngzuò", meaning: "働く、仕事", category: "動詞", examples: [
      { chinese: "他在工作。", japanese: "彼は仕事をしています。" },
      { chinese: "去工作。", japanese: "仕事に行く。" },
      { chinese: "工作很忙。", japanese: "仕事はとても忙しいです。" }
    ]
  },
  {
    id: 630, char: "下雨", pinyin: "xià yǔ", meaning: "雨が降る", category: "動詞", examples: [
      { chinese: "明天下雨。", japanese: "明日は雨が降ります。" },
      { chinese: "今天下雨了。", japanese: "今日は雨が降りました。" },
      { chinese: "下雨了，带伞。", japanese: "雨が降っているので、傘を持っていく。" }
    ]
  },
  {
    id: 631, char: "爱", pinyin: "ài", meaning: "愛する、好む", category: "動詞", examples: [
      { chinese: "我爱你。", japanese: "愛しています。" },
      { chinese: "爱学习。", japanese: "勉強が好きです。" },
      { chinese: "爱家人。", japanese: "家族を愛する。" }
    ]
  },
  {
    id: 632, char: "喜欢", pinyin: "xǐhuān", meaning: "好きだ", category: "動詞", examples: [
      { chinese: "我喜欢中国。", japanese: "私は中国が好きです。" },
      { chinese: "喜欢看书。", japanese: "本を読むのが好きです。" },
      { chinese: "很喜欢。", japanese: "とても好きです。" }
    ]
  },
  {
    id: 633, char: "想", pinyin: "xiǎng", meaning: "～したい、思う", category: "動詞", examples: [
      { chinese: "我想去北京。", japanese: "私は北京に行きたいです。" },
      { chinese: "想喝水。", japanese: "水を飲みたいです。" },
      { chinese: "我想你。", japanese: "あなたを思っています。" }
    ]
  },
  {
    id: 634, char: "认识", pinyin: "rènshi", meaning: "知っている", category: "動詞", examples: [
      { chinese: "认识你很高兴。", japanese: "お会いできて嬉しいです。" },
      { chinese: "认识汉字。", japanese: "漢字を知っている。" },
      { chinese: "认识朋友。", japanese: "友達を知っている。" }
    ]
  },
  {
    id: 635, char: "会", pinyin: "huì", meaning: "～できる", category: "動詞", examples: [
      { chinese: "我会说汉语。", japanese: "私は中国語が話せます。" },
      { chinese: "会游泳。", japanese: "泳げます。" },
      { chinese: "会开车。", japanese: "運転できます。" }
    ]
  },
  {
    id: 636, char: "能", pinyin: "néng", meaning: "～できる", category: "動詞", examples: [
      { chinese: "我能去吗？", japanese: "行ってもいいですか？" },
      { chinese: "能帮我吗？", japanese: "手伝ってもらえますか？" },
      { chinese: "不能去。", japanese: "行けません。" }
    ]
  },

  // 6. 形容詞・副詞・その他
  {
    id: 701, char: "好", pinyin: "hǎo", meaning: "良い", category: "形容詞", examples: [
      { chinese: "你好。", japanese: "こんにちは。" },
      { chinese: "很好。", japanese: "とても良い。" },
      { chinese: "天气很好。", japanese: "天気がとても良い。" }
    ]
  },
  {
    id: 702, char: "大", pinyin: "dà", meaning: "大きい", category: "形容詞", examples: [
      { chinese: "很大的苹果。", japanese: "とても大きなリンゴ。" },
      { chinese: "这个房间很大。", japanese: "この部屋はとても大きいです。" },
      { chinese: "大问题。", japanese: "大きな問題。" }
    ]
  },
  {
    id: 703, char: "小", pinyin: "xiǎo", meaning: "小さい", category: "形容詞", examples: [
      { chinese: "很小的猫。", japanese: "とても小さな猫。" },
      { chinese: "小房间。", japanese: "小さな部屋。" },
      { chinese: "这个很小。", japanese: "これはとても小さいです。" }
    ]
  },
  {
    id: 704, char: "多", pinyin: "duō", meaning: "多い", category: "形容詞", examples: [
      { chinese: "人很多。", japanese: "人がとても多い。" },
      { chinese: "很多书。", japanese: "たくさんの本。" },
      { chinese: "多少钱？", japanese: "いくらですか？" }
    ]
  },
  {
    id: 705, char: "少", pinyin: "shǎo", meaning: "少ない", category: "形容詞", examples: [
      { chinese: "人很少。", japanese: "人がとても少ない。" },
      { chinese: "很少的钱。", japanese: "少ないお金。" },
      { chinese: "少说话。", japanese: "あまり話さない。" }
    ]
  },
  {
    id: 706, char: "冷", pinyin: "lěng", meaning: "寒い", category: "形容詞", examples: [
      { chinese: "今天很冷。", japanese: "今日はとても寒い。" },
      { chinese: "很冷的天气。", japanese: "とても寒い天気。" },
      { chinese: "冷的水。", japanese: "冷たい水。" }
    ]
  },
  {
    id: 707, char: "热", pinyin: "rè", meaning: "暑い", category: "形容詞", examples: [
      { chinese: "夏天很热。", japanese: "夏はとても暑い。" },
      { chinese: "很热的天气。", japanese: "とても暑い天気。" },
      { chinese: "热茶。", japanese: "熱いお茶。" }
    ]
  },
  {
    id: 708, char: "高兴", pinyin: "gāoxìng", meaning: "嬉しい", category: "形容詞", examples: [
      { chinese: "很高兴。", japanese: "とても嬉しい。" },
      { chinese: "很高兴见到你。", japanese: "お会いできて嬉しいです。" },
      { chinese: "今天很高兴。", japanese: "今日はとても嬉しいです。" }
    ]
  },
  {
    id: 709, char: "漂亮", pinyin: "piàoliang", meaning: "きれいだ", category: "形容詞", examples: [
      { chinese: "你很漂亮。", japanese: "あなたはとても綺麗です。" },
      { chinese: "漂亮的衣服。", japanese: "きれいな服。" },
      { chinese: "很漂亮的花。", japanese: "とてもきれいな花。" }
    ]
  },
  {
    id: 801, char: "不", pinyin: "bù", meaning: "～ない（否定）", category: "副詞・その他", examples: [
      { chinese: "不是。", japanese: "違います。" },
      { chinese: "不去。", japanese: "行きません。" },
      { chinese: "不知道。", japanese: "知りません。" }
    ]
  },
  {
    id: 802, char: "没", pinyin: "méi", meaning: "～なかった（否定）", category: "副詞・その他", examples: [
      { chinese: "没去。", japanese: "行かなかった。" },
      { chinese: "没有。", japanese: "ありません。" },
      { chinese: "没时间。", japanese: "時間がありません。" }
    ]
  },
  {
    id: 803, char: "很", pinyin: "hěn", meaning: "とても", category: "副詞・その他", examples: [
      { chinese: "很好。", japanese: "とても良い。" },
      { chinese: "很大。", japanese: "とても大きい。" },
      { chinese: "很高兴。", japanese: "とても嬉しい。" }
    ]
  },
  {
    id: 804, char: "太", pinyin: "tài", meaning: "あまりに～すぎる", category: "副詞・その他", examples: [
      { chinese: "太好了！", japanese: "最高だ！" },
      { chinese: "太贵了。", japanese: "高すぎる。" },
      { chinese: "太累了。", japanese: "疲れすぎた。" }
    ]
  },
  {
    id: 805, char: "都", pinyin: "dōu", meaning: "すべて、みんな", category: "副詞・その他", examples: [
      { chinese: "我们都来了。", japanese: "私たちはみんな来ました。" },
      { chinese: "都是。", japanese: "すべてです。" },
      { chinese: "都喜欢。", japanese: "みんな好きです。" }
    ]
  },
  {
    id: 806, char: "和", pinyin: "hé", meaning: "～と", category: "副詞・その他", examples: [
      { chinese: "我和你。", japanese: "私とあなた。" },
      { chinese: "和朋友一起。", japanese: "友達と一緒に。" },
      { chinese: "和老师说话。", japanese: "先生と話す。" }
    ]
  },
  {
    id: 807, char: "在", pinyin: "zài", meaning: "～にある、いる", category: "副詞・その他", examples: [
      { chinese: "在家。", japanese: "家にいる。" },
      { chinese: "在学校。", japanese: "学校にいる。" },
      { chinese: "在北京。", japanese: "北京にいる。" }
    ]
  },
  {
    id: 808, char: "喂", pinyin: "wèi", meaning: "もしもし", category: "副詞・その他", examples: [
      { chinese: "喂，你好。", japanese: "もしもし、こんにちは。" },
      { chinese: "喂，是谁？", japanese: "もしもし、どちら様ですか？" },
      { chinese: "喂，听得到吗？", japanese: "もしもし、聞こえますか？" }
    ]
  },
  {
    id: 809, char: "的", pinyin: "de", meaning: "～の", category: "副詞・その他", examples: [
      { chinese: "我的书。", japanese: "私の本。" },
      { chinese: "你的朋友。", japanese: "あなたの友達。" },
      { chinese: "他的家。", japanese: "彼の家。" }
    ]
  },
  {
    id: 810, char: "了", pinyin: "le", meaning: "（完了・変化）", category: "副詞・その他", examples: [
      { chinese: "下雨了。", japanese: "雨が降ってきた。" },
      { chinese: "吃饭了。", japanese: "ご飯を食べました。" },
      { chinese: "回家了。", japanese: "家に帰りました。" }
    ]
  },
  {
    id: 811, char: "吗", pinyin: "ma", meaning: "～ですか？", category: "副詞・その他", examples: [
      { chinese: "好吗？", japanese: "いいですか？" },
      { chinese: "你去吗？", japanese: "あなたは行きますか？" },
      { chinese: "是吗？", japanese: "そうですか？" }
    ]
  },
  {
    id: 812, char: "呢", pinyin: "ne", meaning: "～は？", category: "副詞・その他", examples: [
      { chinese: "你呢？", japanese: "あなたは？" },
      { chinese: "我的书呢？", japanese: "私の本は？" },
      { chinese: "老师呢？", japanese: "先生は？" }
    ]
  },
  {
    id: 813, char: "一点儿", pinyin: "yìdiǎnr", meaning: "少し", category: "副詞・その他", examples: [
      { chinese: "喝一点儿水。", japanese: "水を少し飲む。" },
      { chinese: "吃一点儿。", japanese: "少し食べる。" },
      { chinese: "一点儿也不。", japanese: "少しもない。" }
    ]
  },
  {
    id: 814, char: "前面", pinyin: "qiánmiàn", meaning: "前", category: "副詞・その他", examples: [
      { chinese: "在前面。", japanese: "前にいる。" },
      { chinese: "往前走。", japanese: "前へ歩く。" },
      { chinese: "前面的商店。", japanese: "前の店。" }
    ]
  },
  {
    id: 815, char: "后面", pinyin: "hòumiàn", meaning: "後ろ", category: "副詞・その他", examples: [
      { chinese: "在后面。", japanese: "後ろにいる。" },
      { chinese: "往后面看。", japanese: "後ろを見る。" },
      { chinese: "后面的房间。", japanese: "後ろの部屋。" }
    ]
  },
  {
    id: 816, char: "里", pinyin: "lǐ", meaning: "中", category: "副詞・その他", examples: [
      { chinese: "在家里。", japanese: "家の中に。" },
      { chinese: "在教室里。", japanese: "教室の中に。" },
      { chinese: "在房间里。", japanese: "部屋の中に。" }
    ]
  },

  // --- 第2章 頻出語句 & 第3章 生活語句 (追加分) ---
  // カレンダー・日付・数字
  {
    id: 1001, char: "一月", pinyin: "yīyuè", meaning: "1月", category: "生活語句：時間", examples: [
      { chinese: "一月很冷。", japanese: "1月はとても寒いです。" },
      { chinese: "一月一日是新年。", japanese: "1月1日は新年です。" },
      { chinese: "一月份。", japanese: "1月。" }
    ]
  },
  {
    id: 1002, char: "二月", pinyin: "èryuè", meaning: "2月", category: "生活語句：時間", examples: [
      { chinese: "二月有二十八天。", japanese: "2月は28日あります。" },
      { chinese: "二月很冷。", japanese: "2月はとても寒いです。" },
      { chinese: "二月份。", japanese: "2月。" }
    ]
  },
  {
    id: 1003, char: "三月", pinyin: "sānyuè", meaning: "3月", category: "生活語句：時間", examples: [
      { chinese: "三月去北京。", japanese: "3月に北京へ行きます。" },
      { chinese: "三月天气很好。", japanese: "3月は天気が良いです。" },
      { chinese: "三月份。", japanese: "3月。" }
    ]
  },
  {
    id: 1004, char: "四月", pinyin: "sìyuè", meaning: "4月", category: "生活語句：時間", examples: [
      { chinese: "四月天气很好。", japanese: "4月は天気が良いです。" },
      { chinese: "四月去旅游。", japanese: "4月に旅行に行きます。" },
      { chinese: "四月份。", japanese: "4月。" }
    ]
  },
  {
    id: 1005, char: "五月", pinyin: "wǔyuè", meaning: "5月", category: "生活語句：時間", examples: [
      { chinese: "五月去旅游。", japanese: "5月に旅行に行きます。" },
      { chinese: "五月很暖和。", japanese: "5月はとても暖かいです。" },
      { chinese: "五月份。", japanese: "5月。" }
    ]
  },
  {
    id: 1006, char: "六月", pinyin: "liùyuè", meaning: "6月", category: "生活語句：時間", examples: [
      { chinese: "六月很热。", japanese: "6月は暑いです。" },
      { chinese: "六月去海边。", japanese: "6月に海に行きます。" },
      { chinese: "六月份。", japanese: "6月。" }
    ]
  },
  {
    id: 1007, char: "七月", pinyin: "qīyuè", meaning: "7月", category: "生活語句：時間", examples: [
      { chinese: "七月放假。", japanese: "7月は休みです。" },
      { chinese: "七月很热。", japanese: "7月はとても暑いです。" },
      { chinese: "七月份。", japanese: "7月。" }
    ]
  },
  {
    id: 1008, char: "八月", pinyin: "bāyuè", meaning: "8月", category: "生活語句：時間", examples: [
      { chinese: "八月去海边。", japanese: "8月に海に行きます。" },
      { chinese: "八月很热。", japanese: "8月はとても暑いです。" },
      { chinese: "八月份。", japanese: "8月。" }
    ]
  },
  {
    id: 1009, char: "九月", pinyin: "jiǔyuè", meaning: "9月", category: "生活語句：時間", examples: [
      { chinese: "九月开学。", japanese: "9月に学校が始まります。" },
      { chinese: "九月很凉快。", japanese: "9月は涼しいです。" },
      { chinese: "九月份。", japanese: "9月。" }
    ]
  },
  {
    id: 1010, char: "十月", pinyin: "shíyuè", meaning: "10月", category: "生活語句：時間", examples: [
      { chinese: "十月很凉快。", japanese: "10月は涼しいです。" },
      { chinese: "十月去爬山。", japanese: "10月に山登りに行きます。" },
      { chinese: "十月份。", japanese: "10月。" }
    ]
  },
  {
    id: 1011, char: "十一月", pinyin: "shíyīyuè", meaning: "11月", category: "生活語句：時間", examples: [
      { chinese: "十一月去爬山。", japanese: "11月に山登りに行きます。" },
      { chinese: "十一月很冷。", japanese: "11月はとても寒いです。" },
      { chinese: "十一月份。", japanese: "11月。" }
    ]
  },
  {
    id: 1012, char: "十二月", pinyin: "shí'èryuè", meaning: "12月", category: "生活語句：時間", examples: [
      { chinese: "十二月下雪。", japanese: "12月は雪が降ります。" },
      { chinese: "十二月很冷。", japanese: "12月はとても寒いです。" },
      { chinese: "十二月份。", japanese: "12月。" }
    ]
  },
  {
    id: 1013, char: "星期一", pinyin: "xīngqīyī", meaning: "月曜日", category: "生活語句：時間", examples: [
      { chinese: "星期一上班。", japanese: "月曜日に出勤します。" },
      { chinese: "星期一有课。", japanese: "月曜日に授業があります。" },
      { chinese: "星期一很忙。", japanese: "月曜日はとても忙しいです。" }
    ]
  },
  {
    id: 1014, char: "星期二", pinyin: "xīngqī'èr", meaning: "火曜日", category: "生活語句：時間", examples: [
      { chinese: "星期二有课。", japanese: "火曜日に授業があります。" },
      { chinese: "星期二去图书馆。", japanese: "火曜日に図書館へ行きます。" },
      { chinese: "星期二。", japanese: "火曜日。" }
    ]
  },
  {
    id: 1015, char: "星期三", pinyin: "xīngqīsān", meaning: "水曜日", category: "生活語句：時間", examples: [
      { chinese: "星期三休息。", japanese: "水曜日は休みです。" },
      { chinese: "星期三有课。", japanese: "水曜日に授業があります。" },
      { chinese: "星期三。", japanese: "水曜日。" }
    ]
  },
  {
    id: 1016, char: "星期四", pinyin: "xīngqīsì", meaning: "木曜日", category: "生活語句：時間", examples: [
      { chinese: "星期四去医院。", japanese: "木曜日に病院へ行きます。" },
      { chinese: "星期四有课。", japanese: "木曜日に授業があります。" },
      { chinese: "星期四。", japanese: "木曜日。" }
    ]
  },
  {
    id: 1017, char: "星期五", pinyin: "xīngqīwǔ", meaning: "金曜日", category: "生活語句：時間", examples: [
      { chinese: "星期五看电影。", japanese: "金曜日に映画を見ます。" },
      { chinese: "星期五下班。", japanese: "金曜日に退勤します。" },
      { chinese: "星期五。", japanese: "金曜日。" }
    ]
  },
  {
    id: 1018, char: "星期六", pinyin: "xīngqīliù", meaning: "土曜日", category: "生活語句：時間", examples: [
      { chinese: "星期六去公园。", japanese: "土曜日に公園へ行きます。" },
      { chinese: "星期六休息。", japanese: "土曜日は休みです。" },
      { chinese: "星期六。", japanese: "土曜日。" }
    ]
  },
  {
    id: 1019, char: "星期日", pinyin: "xīngqīrì", meaning: "日曜日", category: "生活語句：時間", examples: [
      { chinese: "星期日在家。", japanese: "日曜日は家にいます。" },
      { chinese: "星期日休息。", japanese: "日曜日は休みです。" },
      { chinese: "星期日。", japanese: "日曜日。" }
    ]
  },
  {
    id: 1020, char: "星期天", pinyin: "xīngqītiān", meaning: "日曜日(口語)", category: "生活語句：時間", examples: [
      { chinese: "星期天快乐。", japanese: "楽しい日曜日。" },
      { chinese: "星期天在家。", japanese: "日曜日は家にいます。" },
      { chinese: "星期天。", japanese: "日曜日。" }
    ]
  },
  {
    id: 1021, char: "百", pinyin: "bǎi", meaning: "百", category: "生活語句：数", examples: [
      { chinese: "一百块。", japanese: "100元。" },
      { chinese: "一百个人。", japanese: "100人。" },
      { chinese: "一百年。", japanese: "100年。" }
    ]
  },
  {
    id: 1022, char: "第一", pinyin: "dì-yī", meaning: "第一、一番目", category: "生活語句：数", examples: [
      { chinese: "这是第一次。", japanese: "これは初めてです。" },
      { chinese: "第一名。", japanese: "1位。" },
      { chinese: "第一课。", japanese: "第1課。" }
    ]
  },
  {
    id: 1023, char: "两", pinyin: "liǎng", meaning: "2（量詞の前で）", category: "生活語句：数", examples: [
      { chinese: "两个人。", japanese: "二人。" },
      { chinese: "两本书。", japanese: "2冊の本。" },
      { chinese: "两块钱。", japanese: "2元。" }
    ]
  },

  // 生活語句 - 名詞（人・物・場所）
  {
    id: 1101, char: "爷爷", pinyin: "yéye", meaning: "おじいさん", category: "生活語句：人・物", examples: [
      { chinese: "爷爷七十岁。", japanese: "祖父は70歳です。" },
      { chinese: "我爷爷很好。", japanese: "私の祖父はとても良いです。" },
      { chinese: "爷爷在家。", japanese: "祖父は家にいます。" }
    ]
  },
  {
    id: 1102, char: "奶奶", pinyin: "nǎinai", meaning: "おばあさん", category: "生活語句：人・物", examples: [
      { chinese: "奶奶喜欢喝茶。", japanese: "祖母はお茶が好きです。" },
      { chinese: "我奶奶很健康。", japanese: "私の祖母はとても健康です。" },
      { chinese: "奶奶在做饭。", japanese: "祖母は料理を作っています。" }
    ]
  },
  {
    id: 1103, char: "哥哥", pinyin: "gēge", meaning: "兄", category: "生活語句：人・物", examples: [
      { chinese: "我有哥哥。", japanese: "私には兄がいます。" },
      { chinese: "哥哥是学生。", japanese: "兄は学生です。" },
      { chinese: "哥哥很聪明。", japanese: "兄はとても賢いです。" }
    ]
  },
  {
    id: 1104, char: "姐姐", pinyin: "jiějie", meaning: "姉", category: "生活語句：人・物", examples: [
      { chinese: "姐姐很漂亮。", japanese: "姉はきれいです。" },
      { chinese: "我姐姐是老师。", japanese: "私の姉は先生です。" },
      { chinese: "姐姐在工作。", japanese: "姉は仕事をしています。" }
    ]
  },
  {
    id: 1105, char: "弟弟", pinyin: "dìdi", meaning: "弟", category: "生活語句：人・物", examples: [
      { chinese: "弟弟在学校。", japanese: "弟は学校にいます。" },
      { chinese: "我弟弟五岁。", japanese: "私の弟は5歳です。" },
      { chinese: "弟弟很可爱。", japanese: "弟はとても可愛いです。" }
    ]
  },
  {
    id: 1106, char: "妹妹", pinyin: "mèimei", meaning: "妹", category: "生活語句：人・物", examples: [
      { chinese: "妹妹喜欢苹果。", japanese: "妹はリンゴが好きです。" },
      { chinese: "我妹妹很聪明。", japanese: "私の妹はとても賢いです。" },
      { chinese: "妹妹在学习。", japanese: "妹は勉強しています。" }
    ]
  },
  {
    id: 1107, char: "手机", pinyin: "shǒujī", meaning: "携帯電話", category: "生活語句：人・物", examples: [
      { chinese: "看手机。", japanese: "スマホを見る。" },
      { chinese: "用手机打电话。", japanese: "スマホで電話をかける。" },
      { chinese: "买新手机。", japanese: "新しいスマホを買う。" }
    ]
  },
  {
    id: 1108, char: "钱包", pinyin: "qiánbāo", meaning: "財布", category: "生活語句：人・物", examples: [
      { chinese: "钱包不见了。", japanese: "財布がなくなった。" },
      { chinese: "我的钱包。", japanese: "私の財布。" },
      { chinese: "钱包在桌子上。", japanese: "財布は机の上にあります。" }
    ]
  },
  {
    id: 1109, char: "银行", pinyin: "yínháng", meaning: "銀行", category: "生活語句：人・物", examples: [
      { chinese: "去银行。", japanese: "銀行へ行く。" },
      { chinese: "在银行换钱。", japanese: "銀行で両替する。" },
      { chinese: "银行很远。", japanese: "銀行はとても遠いです。" }
    ]
  },
  {
    id: 1110, char: "公园", pinyin: "gōngyuán", meaning: "公園", category: "生活語句：人・物", examples: [
      { chinese: "在公园玩。", japanese: "公園で遊ぶ。" },
      { chinese: "去公园散步。", japanese: "公園へ散歩に行く。" },
      { chinese: "公园很漂亮。", japanese: "公園はとてもきれいです。" }
    ]
  },
  {
    id: 1111, char: "洗手间", pinyin: "xǐshǒujiān", meaning: "トイレ", category: "生活語句：人・物", examples: [
      { chinese: "洗手间在哪儿？", japanese: "トイレはどこですか？" },
      { chinese: "去洗手间。", japanese: "トイレへ行く。" },
      { chinese: "洗手间在左边。", japanese: "トイレは左側にあります。" }
    ]
  },
  {
    id: 1112, char: "左边", pinyin: "zuǒbian", meaning: "左側", category: "生活語句：人・物", examples: [
      { chinese: "往左边看。", japanese: "左を見て。" },
      { chinese: "在左边。", japanese: "左側にある。" },
      { chinese: "左边是商店。", japanese: "左側は店です。" }
    ]
  },
  {
    id: 1113, char: "右边", pinyin: "yòubian", meaning: "右側", category: "生活語句：人・物", examples: [
      { chinese: "在右边。", japanese: "右側にある。" },
      { chinese: "往右边走。", japanese: "右へ歩く。" },
      { chinese: "右边是学校。", japanese: "右側は学校です。" }
    ]
  },
  {
    id: 1114, char: "旁边", pinyin: "pángbiān", meaning: "そば、隣", category: "生活語句：人・物", examples: [
      { chinese: "坐在旁边。", japanese: "隣に座る。" },
      { chinese: "在旁边。", japanese: "そばにある。" },
      { chinese: "坐在我旁边。", japanese: "私の隣に座る。" }
    ]
  },
  {
    id: 1115, char: "早上", pinyin: "zǎoshang", meaning: "朝", category: "生活語句：人・物", examples: [
      { chinese: "早上好。", japanese: "おはよう。" },
      { chinese: "早上起床。", japanese: "朝起きる。" },
      { chinese: "早上很忙。", japanese: "朝はとても忙しいです。" }
    ]
  },
  {
    id: 1116, char: "晚上", pinyin: "wǎnshang", meaning: "夜", category: "生活語句：人・物", examples: [
      { chinese: "晚上好。", japanese: "こんばんは。" },
      { chinese: "晚上睡觉。", japanese: "夜に寝る。" },
      { chinese: "晚上很安静。", japanese: "夜はとても静かです。" }
    ]
  },
  {
    id: 1117, char: "身体", pinyin: "shēntǐ", meaning: "体、健康", category: "生活語句：人・物", examples: [
      { chinese: "身体很好。", japanese: "健康です。" },
      { chinese: "注意身体。", japanese: "体に気をつける。" },
      { chinese: "身体不舒服。", japanese: "体調が悪いです。" }
    ]
  },
  {
    id: 1118, char: "公共汽车", pinyin: "gōnggòng qìchē", meaning: "バス", category: "生活語句：人・物", examples: [
      { chinese: "坐公共汽车。", japanese: "バスに乗る。" },
      { chinese: "等公共汽车。", japanese: "バスを待つ。" },
      { chinese: "公共汽车站。", japanese: "バス停。" }
    ]
  },
  {
    id: 1119, char: "自行车", pinyin: "zìxíngchē", meaning: "自転車", category: "生活語句：人・物", examples: [
      { chinese: "骑自行车。", japanese: "自転車に乗る。" },
      { chinese: "买自行车。", japanese: "自転車を買う。" },
      { chinese: "自行车很方便。", japanese: "自転車はとても便利です。" }
    ]
  },
  {
    id: 1120, char: "教室", pinyin: "jiàoshì", meaning: "教室", category: "生活語句：人・物", examples: [
      { chinese: "在教室里。", japanese: "教室の中にいる。" },
      { chinese: "去教室。", japanese: "教室へ行く。" },
      { chinese: "教室很大。", japanese: "教室はとても大きいです。" }
    ]
  },
  {
    id: 1121, char: "房间", pinyin: "fángjiān", meaning: "部屋", category: "生活語句：人・物", examples: [
      { chinese: "我的房间。", japanese: "私の部屋。" },
      { chinese: "房间很大。", japanese: "部屋はとても大きいです。" },
      { chinese: "在房间里。", japanese: "部屋の中にいる。" }
    ]
  },
  {
    id: 1122, char: "门", pinyin: "mén", meaning: "ドア", category: "生活語句：人・物", examples: [
      { chinese: "开门。", japanese: "ドアを開ける。" },
      { chinese: "关门。", japanese: "ドアを閉める。" },
      { chinese: "在门口。", japanese: "入口にいる。" }
    ]
  },
  {
    id: 1123, char: "窗户", pinyin: "chuānghu", meaning: "窓", category: "生活語句：人・物", examples: [
      { chinese: "关窗户。", japanese: "窓を閉める。" },
      { chinese: "开窗户。", japanese: "窓を開ける。" },
      { chinese: "窗户很大。", japanese: "窓はとても大きいです。" }
    ]
  },
  {
    id: 1124, char: "路", pinyin: "lù", meaning: "道", category: "生活語句：人・物", examples: [
      { chinese: "过马路。", japanese: "道を渡る。" },
      { chinese: "在路上。", japanese: "道中に。" },
      { chinese: "这条路很长。", japanese: "この道はとても長いです。" }
    ]
  },
  {
    id: 1125, char: "题", pinyin: "tí", meaning: "問題", category: "生活語句：人・物", examples: [
      { chinese: "这个问题。", japanese: "この問題。" },
      { chinese: "做题。", japanese: "問題を解く。" },
      { chinese: "这道题很难。", japanese: "この問題はとても難しいです。" }
    ]
  },
  {
    id: 1126, char: "课", pinyin: "kè", meaning: "授業", category: "生活語句：人・物", examples: [
      { chinese: "上课。", japanese: "授業に出る。" },
      { chinese: "下课。", japanese: "授業が終わる。" },
      { chinese: "有课。", japanese: "授業がある。" }
    ]
  },
  {
    id: 1127, char: "姓", pinyin: "xìng", meaning: "名字", category: "生活語句：人・物", examples: [
      { chinese: "您贵姓？", japanese: "お名前（名字）は？" },
      { chinese: "我姓李。", japanese: "私は李という名字です。" },
      { chinese: "姓什么？", japanese: "名字は何ですか？" }
    ]
  },
  {
    id: 1128, char: "票", pinyin: "piào", meaning: "チケット", category: "生活語句：人・物", examples: [
      { chinese: "买票。", japanese: "チケットを買う。" },
      { chinese: "电影票。", japanese: "映画のチケット。" },
      { chinese: "一张票。", japanese: "一枚のチケット。" }
    ]
  },
  {
    id: 1129, char: "手", pinyin: "shǒu", meaning: "手", category: "生活語句：人・物", examples: [
      { chinese: "洗手。", japanese: "手を洗う。" },
      { chinese: "举手。", japanese: "手を挙げる。" },
      { chinese: "手很干净。", japanese: "手はとてもきれいです。" }
    ]
  },
  {
    id: 1130, char: "眼睛", pinyin: "yǎnjing", meaning: "目", category: "生活語句：人・物", examples: [
      { chinese: "大眼睛。", japanese: "大きな目。" },
      { chinese: "眼睛很漂亮。", japanese: "目はとてもきれいです。" },
      { chinese: "眼睛疼。", japanese: "目が痛いです。" }
    ]
  },
  {
    id: 1131, char: "鱼", pinyin: "yú", meaning: "魚", category: "生活語句：人・物", examples: [
      { chinese: "吃鱼。", japanese: "魚を食べる。" },
      { chinese: "一条鱼。", japanese: "一匹の魚。" },
      { chinese: "鱼很好吃。", japanese: "魚はとても美味しいです。" }
    ]
  },
  {
    id: 1132, char: "羊肉", pinyin: "yángròu", meaning: "羊肉", category: "生活語句：人・物", examples: [
      { chinese: "吃羊肉。", japanese: "羊肉を食べる。" },
      { chinese: "羊肉很好吃。", japanese: "羊肉はとても美味しいです。" },
      { chinese: "买羊肉。", japanese: "羊肉を買う。" }
    ]
  },
  {
    id: 1133, char: "牛奶", pinyin: "niúnǎi", meaning: "牛乳", category: "生活語句：人・物", examples: [
      { chinese: "喝牛奶。", japanese: "牛乳を飲む。" },
      { chinese: "一杯牛奶。", japanese: "一杯の牛乳。" },
      { chinese: "牛奶很营养。", japanese: "牛乳はとても栄養があります。" }
    ]
  },
  {
    id: 1134, char: "鸡蛋", pinyin: "jīdàn", meaning: "卵", category: "生活語句：人・物", examples: [
      { chinese: "吃鸡蛋。", japanese: "卵を食べる。" },
      { chinese: "一个鸡蛋。", japanese: "一個の卵。" },
      { chinese: "鸡蛋很好吃。", japanese: "卵はとても美味しいです。" }
    ]
  },
  {
    id: 1135, char: "西瓜", pinyin: "xīguā", meaning: "スイカ", category: "生活語句：人・物", examples: [
      { chinese: "买西瓜。", japanese: "スイカを買う。" },
      { chinese: "吃西瓜。", japanese: "スイカを食べる。" },
      { chinese: "西瓜很甜。", japanese: "スイカはとても甘いです。" }
    ]
  },
  {
    id: 1136, char: "咖啡", pinyin: "kāfēi", meaning: "コーヒー", category: "生活語句：人・物", examples: [
      { chinese: "喝咖啡。", japanese: "コーヒーを飲む。" },
      { chinese: "一杯咖啡。", japanese: "一杯のコーヒー。" },
      { chinese: "咖啡很好喝。", japanese: "コーヒーはとても美味しいです。" }
    ]
  },
  {
    id: 1137, char: "报纸", pinyin: "bàozhǐ", meaning: "新聞", category: "生活語句：人・物", examples: [
      { chinese: "看报纸。", japanese: "新聞を読む。" },
      { chinese: "买报纸。", japanese: "新聞を買う。" },
      { chinese: "今天的报纸。", japanese: "今日の新聞。" }
    ]
  },
  {
    id: 1138, char: "颜色", pinyin: "yánsè", meaning: "色", category: "生活語句：人・物", examples: [
      { chinese: "什么颜色？", japanese: "何色ですか？" },
      { chinese: "红色。", japanese: "赤色。" },
      { chinese: "这个颜色很漂亮。", japanese: "この色はとてもきれいです。" }
    ]
  },
  {
    id: 1139, char: "丈夫", pinyin: "zhàngfu", meaning: "夫", category: "生活語句：人・物", examples: [
      { chinese: "我的丈夫。", japanese: "私の夫。" },
      { chinese: "丈夫是医生。", japanese: "夫は医者です。" },
      { chinese: "丈夫在工作。", japanese: "夫は仕事をしています。" }
    ]
  },
  {
    id: 1140, char: "妻子", pinyin: "qīzi", meaning: "妻", category: "生活語句：人・物", examples: [
      { chinese: "我的妻子。", japanese: "私の妻。" },
      { chinese: "妻子是老师。", japanese: "妻は先生です。" },
      { chinese: "妻子在家。", japanese: "妻は家にいます。" }
    ]
  },
  {
    id: 1141, char: "孩子", pinyin: "háizi", meaning: "子供", category: "生活語句：人・物", examples: [
      { chinese: "小孩子。", japanese: "小さな子供。" },
      { chinese: "我有两个孩子。", japanese: "私には子供が二人います。" },
      { chinese: "孩子很聪明。", japanese: "子供はとても賢いです。" }
    ]
  },
  {
    id: 1142, char: "男", pinyin: "nán", meaning: "男", category: "生活語句：人・物", examples: [
      { chinese: "男孩儿。", japanese: "男の子。" },
      { chinese: "男人。", japanese: "男性。" },
      { chinese: "男朋友。", japanese: "彼氏。" }
    ]
  },
  {
    id: 1143, char: "女", pinyin: "nǚ", meaning: "女", category: "生活語句：人・物", examples: [
      { chinese: "女孩儿。", japanese: "女の子。" },
      { chinese: "女人。", japanese: "女性。" },
      { chinese: "女朋友。", japanese: "彼女。" }
    ]
  },
  {
    id: 1144, char: "服务员", pinyin: "fúwùyuán", meaning: "店員", category: "生活語句：人・物", examples: [
      { chinese: "叫服务员。", japanese: "店員を呼ぶ。" },
      { chinese: "服务员很热情。", japanese: "店員はとても親切です。" },
      { chinese: "问服务员。", japanese: "店員に聞く。" }
    ]
  },
  {
    id: 1145, char: "药", pinyin: "yào", meaning: "薬", category: "生活語句：人・物", examples: [
      { chinese: "吃药。", japanese: "薬を飲む。" },
      { chinese: "买药。", japanese: "薬を買う。" },
      { chinese: "这个药很有效。", japanese: "この薬はとても効きます。" }
    ]
  },
  {
    id: 1146, char: "雪", pinyin: "xuě", meaning: "雪", category: "生活語句：人・物", examples: [
      { chinese: "下雪了。", japanese: "雪が降った。" },
      { chinese: "雪很大。", japanese: "雪がとても大きいです。" },
      { chinese: "看雪。", japanese: "雪を見る。" }
    ]
  },
  {
    id: 1147, char: "手表", pinyin: "shǒubiǎo", meaning: "腕時計", category: "生活語句：人・物", examples: [
      { chinese: "买手表。", japanese: "腕時計を買う。" },
      { chinese: "戴手表。", japanese: "腕時計を着ける。" },
      { chinese: "手表很贵。", japanese: "腕時計はとても高いです。" }
    ]
  },
  {
    id: 1148, char: "事情", pinyin: "shìqing", meaning: "事柄", category: "生活語句：人・物", examples: [
      { chinese: "有什么事情？", japanese: "何か用事がありますか？" },
      { chinese: "重要的事情。", japanese: "重要な事柄。" },
      { chinese: "事情很多。", japanese: "用事がたくさんあります。" }
    ]
  },
  {
    id: 1149, char: "考试", pinyin: "kǎoshì", meaning: "試験", category: "生活語句：人・物", examples: [
      { chinese: "准备考试。", japanese: "試験の準備をする。" },
      { chinese: "参加考试。", japanese: "試験を受ける。" },
      { chinese: "考试很难。", japanese: "試験はとても難しいです。" }
    ]
  },
  {
    id: 1150, char: "意思", pinyin: "yìsi", meaning: "意味、面白さ", category: "生活語句：人・物", examples: [
      { chinese: "很有意思。", japanese: "とても面白い。" },
      { chinese: "什么意思？", japanese: "どういう意味ですか？" },
      { chinese: "这个意思。", japanese: "この意味。" }
    ]
  },

  // 生活語句 - 動詞・形容詞・その他
  {
    id: 1201, char: "累", pinyin: "lèi", meaning: "疲れた", category: "生活語句：動・形", examples: [
      { chinese: "我很累。", japanese: "私はとても疲れました。" },
      { chinese: "工作很累。", japanese: "仕事はとても疲れます。" },
      { chinese: "累得不行。", japanese: "疲れて仕方がない。" }
    ]
  },
  {
    id: 1202, char: "饿", pinyin: "è", meaning: "お腹が空いた", category: "生活語句：動・形", examples: [
      { chinese: "我饿了。", japanese: "お腹が空きました。" },
      { chinese: "很饿。", japanese: "とてもお腹が空いています。" },
      { chinese: "饿得不行。", japanese: "お腹が空いて仕方がない。" }
    ]
  },
  {
    id: 1203, char: "饱", pinyin: "bǎo", meaning: "お腹いっぱい", category: "生活語句：動・形", examples: [
      { chinese: "我吃饱了。", japanese: "お腹いっぱいです。" },
      { chinese: "很饱。", japanese: "とてもお腹いっぱいです。" },
      { chinese: "吃饱了。", japanese: "お腹いっぱい食べました。" }
    ]
  },
  {
    id: 1204, char: "欢迎", pinyin: "huānyíng", meaning: "ようこそ", category: "生活語句：動・形", examples: [
      { chinese: "欢迎光临。", japanese: "いらっしゃいませ。" },
      { chinese: "欢迎你。", japanese: "ようこそ。" },
      { chinese: "欢迎来中国。", japanese: "中国へようこそ。" }
    ]
  },
  {
    id: 1205, char: "介绍", pinyin: "jièshào", meaning: "紹介する", category: "生活語句：動・形", examples: [
      { chinese: "自我介绍。", japanese: "自己紹介。" },
      { chinese: "介绍朋友。", japanese: "友達を紹介する。" },
      { chinese: "介绍一下。", japanese: "紹介してください。" }
    ]
  },
  {
    id: 1206, char: "休息", pinyin: "xiūxi", meaning: "休む", category: "生活語句：動・形", examples: [
      { chinese: "休息一下。", japanese: "少し休む。" },
      { chinese: "好好休息。", japanese: "しっかり休む。" },
      { chinese: "休息一会儿。", japanese: "少しの間休む。" }
    ]
  },
  {
    id: 1207, char: "运动", pinyin: "yùndòng", meaning: "運動する", category: "生活語句：動・形", examples: [
      { chinese: "多运动。", japanese: "たくさん運動する。" },
      { chinese: "去运动。", japanese: "運動に行く。" },
      { chinese: "喜欢运动。", japanese: "運動が好きです。" }
    ]
  },
  {
    id: 1208, char: "开始", pinyin: "kāishǐ", meaning: "始める", category: "生活語句：動・形", examples: [
      { chinese: "开始上课。", japanese: "授業を始める。" },
      { chinese: "开始工作。", japanese: "仕事を始める。" },
      { chinese: "现在开始。", japanese: "今から始めます。" }
    ]
  },
  {
    id: 1209, char: "懂", pinyin: "dǒng", meaning: "わかる", category: "生活語句：動・形", examples: [
      { chinese: "听懂了吗？", japanese: "聞き取れましたか？" },
      { chinese: "我懂了。", japanese: "わかりました。" },
      { chinese: "不懂。", japanese: "わかりません。" }
    ]
  },
  {
    id: 1210, char: "知道", pinyin: "zhīdào", meaning: "知っている", category: "生活語句：動・形", examples: [
      { chinese: "我不知道。", japanese: "私は知りません。" },
      { chinese: "你知道吗？", japanese: "知っていますか？" },
      { chinese: "知道。", japanese: "知っています。" }
    ]
  },
  {
    id: 1211, char: "帮助", pinyin: "bāngzhù", meaning: "助ける", category: "生活語句：動・形", examples: [
      { chinese: "谢谢你的帮助。", japanese: "助けてくれてありがとう。" },
      { chinese: "帮助朋友。", japanese: "友達を助ける。" },
      { chinese: "需要帮助。", japanese: "助けが必要です。" }
    ]
  },
  {
    id: 1212, char: "给", pinyin: "gěi", meaning: "あげる", category: "生活語句：動・形", examples: [
      { chinese: "给你。", japanese: "君にあげる。" },
      { chinese: "给我。", japanese: "私にください。" },
      { chinese: "给朋友。", japanese: "友達にあげる。" }
    ]
  },
  {
    id: 1213, char: "玩", pinyin: "wán", meaning: "遊ぶ", category: "生活語句：動・形", examples: [
      { chinese: "去玩儿。", japanese: "遊びに行く。" },
      { chinese: "一起玩。", japanese: "一緒に遊ぶ。" },
      { chinese: "玩电脑。", japanese: "パソコンで遊ぶ。" }
    ]
  },
  {
    id: 1214, char: "因为", pinyin: "yīnwèi", meaning: "なぜなら", category: "生活語句：動・形", examples: [
      { chinese: "因为下雨。", japanese: "雨が降ったから。" },
      { chinese: "因为很忙。", japanese: "とても忙しいから。" },
      { chinese: "因为时间不够。", japanese: "時間が足りないから。" }
    ]
  },
  {
    id: 1215, char: "所以", pinyin: "suǒyǐ", meaning: "だから", category: "生活語句：動・形", examples: [
      { chinese: "所以不去。", japanese: "だから行かない。" },
      { chinese: "所以很累。", japanese: "だからとても疲れました。" },
      { chinese: "所以在家。", japanese: "だから家にいます。" }
    ]
  },
  {
    id: 1216, char: "可是", pinyin: "kěshì", meaning: "しかし", category: "生活語句：動・形", examples: [
      { chinese: "可是很贵。", japanese: "しかし高いです。" },
      { chinese: "可是没时间。", japanese: "しかし時間がありません。" },
      { chinese: "可是很远。", japanese: "しかしとても遠いです。" }
    ]
  },
  {
    id: 1217, char: "一起", pinyin: "yìqǐ", meaning: "一緒に", category: "生活語句：動・形", examples: [
      { chinese: "一起去。", japanese: "一緒に行く。" },
      { chinese: "一起学习。", japanese: "一緒に勉強する。" },
      { chinese: "一起吃饭。", japanese: "一緒にご飯を食べる。" }
    ]
  },
  {
    id: 1218, char: "真", pinyin: "zhēn", meaning: "本当に", category: "生活語句：動・形", examples: [
      { chinese: "真好。", japanese: "本当によい。" },
      { chinese: "真漂亮。", japanese: "本当にきれいです。" },
      { chinese: "真好吃。", japanese: "本当に美味しいです。" }
    ]
  },
  {
    id: 1219, char: "最", pinyin: "zuì", meaning: "最も", category: "生活語句：動・形", examples: [
      { chinese: "最好。", japanese: "最高。" },
      { chinese: "最喜欢。", japanese: "最も好きです。" },
      { chinese: "最重要。", japanese: "最も重要です。" }
    ]
  },
  {
    id: 1220, char: "非常", pinyin: "fēicháng", meaning: "非常に", category: "生活語句：動・形", examples: [
      { chinese: "非常好。", japanese: "非常に良い。" },
      { chinese: "非常喜欢。", japanese: "非常に好きです。" },
      { chinese: "非常忙。", japanese: "非常に忙しいです。" }
    ]
  },
  {
    id: 1221, char: "已经", pinyin: "yǐjīng", meaning: "すでに", category: "生活語句：動・形", examples: [
      { chinese: "已经走了。", japanese: "もう行ってしまった。" },
      { chinese: "已经吃了。", japanese: "もう食べました。" },
      { chinese: "已经完成了。", japanese: "もう完成しました。" }
    ]
  },
  {
    id: 1222, char: "正在", pinyin: "zhèngzài", meaning: "～しているところ", category: "生活語句：動・形", examples: [
      { chinese: "正在吃饭。", japanese: "食事中です。" },
      { chinese: "正在学习。", japanese: "勉強中です。" },
      { chinese: "正在工作。", japanese: "仕事中です。" }
    ]
  },
  {
    id: 1223, char: "还要", pinyin: "hái yào", meaning: "まだ～したい", category: "生活語句：動・形", examples: [
      { chinese: "还要那个。", japanese: "あれも欲しい。" },
      { chinese: "还要一个。", japanese: "もう一つ欲しい。" },
      { chinese: "还要吗？", japanese: "まだ欲しいですか？" }
    ]
  },
  {
    id: 1224, char: "别", pinyin: "bié", meaning: "～するな", category: "生活語句：動・形", examples: [
      { chinese: "别说话。", japanese: "話さないで。" },
      { chinese: "别去。", japanese: "行かないで。" },
      { chinese: "别担心。", japanese: "心配しないで。" }
    ]
  },
  {
    id: 1225, char: "便宜", pinyin: "piányi", meaning: "安い", category: "生活語句：動・形", examples: [
      { chinese: "很便宜。", japanese: "とても安い。" },
      { chinese: "便宜的东西。", japanese: "安い物。" },
      { chinese: "太便宜了。", japanese: "安すぎます。" }
    ]
  },
  {
    id: 1226, char: "贵", pinyin: "guì", meaning: "高い", category: "生活語句：動・形", examples: [
      { chinese: "太贵了。", japanese: "高すぎる。" },
      { chinese: "很贵。", japanese: "とても高い。" },
      { chinese: "贵的东西。", japanese: "高い物。" }
    ]
  },
  {
    id: 1227, char: "红", pinyin: "hóng", meaning: "赤い", category: "生活語句：動・形", examples: [
      { chinese: "红色的。", japanese: "赤色の。" },
      { chinese: "红苹果。", japanese: "赤いリンゴ。" },
      { chinese: "很红。", japanese: "とても赤い。" }
    ]
  },
  {
    id: 1228, char: "白", pinyin: "bái", meaning: "白い", category: "生活語句：動・形", examples: [
      { chinese: "白色的。", japanese: "白色の。" },
      { chinese: "白衣服。", japanese: "白い服。" },
      { chinese: "很白。", japanese: "とても白い。" }
    ]
  },
  {
    id: 1229, char: "黑", pinyin: "hēi", meaning: "黒い", category: "生活語句：動・形", examples: [
      { chinese: "黑色的。", japanese: "黒色の。" },
      { chinese: "黑头发。", japanese: "黒い髪。" },
      { chinese: "很黑。", japanese: "とても黒い。" }
    ]
  },
  {
    id: 1230, char: "新", pinyin: "xīn", meaning: "新しい", category: "生活語句：動・形", examples: [
      { chinese: "新书。", japanese: "新しい本。" },
      { chinese: "新衣服。", japanese: "新しい服。" },
      { chinese: "很新。", japanese: "とても新しい。" }
    ]
  },
  {
    id: 1231, char: "旧", pinyin: "jiù", meaning: "古い", category: "生活語句：動・形", examples: [
      { chinese: "旧车。", japanese: "古い車。" },
      { chinese: "旧书。", japanese: "古い本。" },
      { chinese: "很旧。", japanese: "とても古い。" }
    ]
  },
  {
    id: 1232, char: "远", pinyin: "yuǎn", meaning: "遠い", category: "生活語句：動・形", examples: [
      { chinese: "很远。", japanese: "とても遠い。" },
      { chinese: "远的地方。", japanese: "遠い場所。" },
      { chinese: "太远了。", japanese: "遠すぎます。" }
    ]
  },
  {
    id: 1233, char: "近", pinyin: "jìn", meaning: "近い", category: "生活語句：動・形", examples: [
      { chinese: "很近。", japanese: "とても近い。" },
      { chinese: "近的地方。", japanese: "近い場所。" },
      { chinese: "很近。", japanese: "とても近いです。" }
    ]
  },
  {
    id: 1234, char: "穿", pinyin: "chuān", meaning: "着る", category: "生活語句：動・形", examples: [
      { chinese: "穿衣服。", japanese: "服を着る。" },
      { chinese: "穿鞋。", japanese: "靴を履く。" },
      { chinese: "穿新衣服。", japanese: "新しい服を着る。" }
    ]
  },
  {
    id: 1235, char: "进", pinyin: "jìn", meaning: "入る", category: "生活語句：動・形", examples: [
      { chinese: "请进。", japanese: "お入りください。" },
      { chinese: "进房间。", japanese: "部屋に入る。" },
      { chinese: "进学校。", japanese: "学校に入る。" }
    ]
  },
  {
    id: 1236, char: "出", pinyin: "chū", meaning: "出る", category: "生活語句：動・形", examples: [
      { chinese: "出去。", japanese: "出ていく。" },
      { chinese: "出门。", japanese: "家を出る。" },
      { chinese: "出来。", japanese: "出てくる。" }
    ]
  },
  {
    id: 1237, char: "跑步", pinyin: "pǎobù", meaning: "走る", category: "生活語句：動・形", examples: [
      { chinese: "我喜欢跑步。", japanese: "私は走るのが好きです。" },
      { chinese: "去跑步。", japanese: "走りに行く。" },
      { chinese: "每天跑步。", japanese: "毎日走る。" }
    ]
  },
  {
    id: 1238, char: "唱歌", pinyin: "chànggē", meaning: "歌う", category: "生活語句：動・形", examples: [
      { chinese: "她爱唱歌。", japanese: "彼女は歌うのが好きです。" },
      { chinese: "去唱歌。", japanese: "歌いに行く。" },
      { chinese: "喜欢唱歌。", japanese: "歌うのが好きです。" }
    ]
  },
  {
    id: 1239, char: "跳舞", pinyin: "tiàowǔ", meaning: "踊る", category: "生活語句：動・形", examples: [
      { chinese: "会跳舞吗？", japanese: "踊れますか？" },
      { chinese: "去跳舞。", japanese: "踊りに行く。" },
      { chinese: "喜欢跳舞。", japanese: "踊るのが好きです。" }
    ]
  },
  {
    id: 1240, char: "旅游", pinyin: "lǚyóu", meaning: "旅行する", category: "生活語句：動・形", examples: [
      { chinese: "去旅游。", japanese: "旅行に行く。" },
      { chinese: "喜欢旅游。", japanese: "旅行が好きです。" },
      { chinese: "旅游很开心。", japanese: "旅行はとても楽しいです。" }
    ]
  },
  {
    id: 1241, char: "生病", pinyin: "shēngbìng", meaning: "病気になる", category: "生活語句：動・形", examples: [
      { chinese: "他生病了。", japanese: "彼は病気になった。" },
      { chinese: "生病了。", japanese: "病気になりました。" },
      { chinese: "不要生病。", japanese: "病気にならないでください。" }
    ]
  },
  {
    id: 1242, char: "起床", pinyin: "qǐchuáng", meaning: "起きる", category: "生活語句：動・形", examples: [
      { chinese: "早起床。", japanese: "早く起きる。" },
      { chinese: "起床了。", japanese: "起きました。" },
      { chinese: "几点起床？", japanese: "何時に起きますか？" }
    ]
  },
  {
    id: 1243, char: "上班", pinyin: "shàngbān", meaning: "出勤する", category: "生活語句：動・形", examples: [
      { chinese: "八点上班。", japanese: "8時に出勤する。" },
      { chinese: "去上班。", japanese: "出勤に行く。" },
      { chinese: "上班很忙。", japanese: "出勤はとても忙しいです。" }
    ]
  },
  {
    id: 1244, char: "让", pinyin: "ràng", meaning: "～させる", category: "生活語句：動・形", examples: [
      { chinese: "让我去。", japanese: "行かせてください。" },
      { chinese: "让我看看。", japanese: "見させてください。" },
      { chinese: "让我想想。", japanese: "考えさせてください。" }
    ]
  },
  {
    id: 1245, char: "告诉", pinyin: "gàosu", meaning: "教える、伝える", category: "生活語句：動・形", examples: [
      { chinese: "告诉我。", japanese: "私に教えて。" },
      { chinese: "告诉朋友。", japanese: "友達に伝える。" },
      { chinese: "告诉老师。", japanese: "先生に伝える。" }
    ]
  },
  {
    id: 1246, char: "找", pinyin: "zhǎo", meaning: "探す", category: "生活語句：動・形", examples: [
      { chinese: "找东西。", japanese: "物を探す。" },
      { chinese: "找朋友。", japanese: "友達を探す。" },
      { chinese: "找不到。", japanese: "見つからない。" }
    ]
  },
  {
    id: 1247, char: "等", pinyin: "děng", meaning: "待つ", category: "生活語句：動・形", examples: [
      { chinese: "等一下。", japanese: "ちょっと待って。" },
      { chinese: "等朋友。", japanese: "友達を待つ。" },
      { chinese: "等车。", japanese: "車を待つ。" }
    ]
  },
  {
    id: 1248, char: "送", pinyin: "sòng", meaning: "送る、あげる", category: "生活語句：動・形", examples: [
      { chinese: "送礼物。", japanese: "プレゼントを贈る。" },
      { chinese: "送朋友。", japanese: "友達を送る。" },
      { chinese: "送回家。", japanese: "家まで送る。" }
    ]
  },
  {
    id: 1249, char: "错", pinyin: "cuò", meaning: "間違い", category: "生活語句：動・形", examples: [
      { chinese: "没错。", japanese: "間違いない。" },
      { chinese: "错了。", japanese: "間違いました。" },
      { chinese: "做错了。", japanese: "間違ってやりました。" }
    ]
  },
  {
    id: 1250, char: "对", pinyin: "duì", meaning: "正しい", category: "生活語句：動・形", examples: [
      { chinese: "对不起。", japanese: "ごめんなさい（対不起）。" },
      { chinese: "对了。", japanese: "正しいです。" },
      { chinese: "说得对。", japanese: "正しく言っています。" }
    ]
  },
  {
    id: 1251, char: "快", pinyin: "kuài", meaning: "速い", category: "生活語句：動・形", examples: [
      { chinese: "跑得快。", japanese: "走るのが速い。" },
      { chinese: "很快。", japanese: "とても速い。" },
      { chinese: "快点儿。", japanese: "速くしてください。" }
    ]
  },
  {
    id: 1252, char: "慢", pinyin: "màn", meaning: "遅い", category: "生活語句：動・形", examples: [
      { chinese: "慢慢吃。", japanese: "ゆっくり食べる。" },
      { chinese: "很慢。", japanese: "とても遅い。" },
      { chinese: "慢点儿。", japanese: "ゆっくりしてください。" }
    ]
  },
  {
    id: 1253, char: "长", pinyin: "cháng", meaning: "長い", category: "生活語句：動・形", examples: [
      { chinese: "很长。", japanese: "とても長い。" },
      { chinese: "长头发。", japanese: "長い髪。" },
      { chinese: "太长了。", japanese: "長すぎます。" }
    ]
  },
  {
    id: 1254, char: "高", pinyin: "gāo", meaning: "高い", category: "生活語句：動・形", examples: [
      { chinese: "那个楼很高。", japanese: "あの建物は高い。" },
      { chinese: "很高。", japanese: "とても高い。" },
      { chinese: "高个子。", japanese: "背が高い人。" }
    ]
  },
  {
    id: 1255, char: "每", pinyin: "měi", meaning: "毎～", category: "生活語句：動・形", examples: [
      { chinese: "每天。", japanese: "毎日。" },
      { chinese: "每个。", japanese: "毎つ。" },
      { chinese: "每年。", japanese: "毎年。" }
    ]
  },
  {
    id: 1256, char: "您", pinyin: "nín", meaning: "あなた（敬称）", category: "生活語句：動・形", examples: [
      { chinese: "您好。", japanese: "こんにちは（丁寧）。" },
      { chinese: "您请。", japanese: "どうぞ（丁寧）。" },
      { chinese: "您贵姓？", japanese: "お名前は何ですか？（丁寧）" }
    ]
  },
  {
    id: 1257, char: "它", pinyin: "tā", meaning: "それ（動物・物）", category: "生活語句：動・形", examples: [
      { chinese: "它是猫。", japanese: "それは猫です。" },
      { chinese: "它很可爱。", japanese: "それはとても可愛いです。" },
      { chinese: "它在哪儿？", japanese: "それはどこですか？" }
    ]
  },
  {
    id: 1258, char: "大家", pinyin: "dàjiā", meaning: "みんな", category: "生活語句：動・形", examples: [
      { chinese: "大家好。", japanese: "みなさんこんにちは。" },
      { chinese: "大家一起来。", japanese: "みんな一緒に来てください。" },
      { chinese: "大家都很忙。", japanese: "みんなとても忙しいです。" }
    ]
  },
  {
    id: 1259, char: "离", pinyin: "lí", meaning: "～から（距離）", category: "生活語句：動・形", examples: [
      { chinese: "离这儿很近。", japanese: "ここからとても近い。" },
      { chinese: "离学校很远。", japanese: "学校からとても遠い。" },
      { chinese: "离北京很近。", japanese: "北京からとても近い。" }
    ]
  },
  {
    id: 1260, char: "往", pinyin: "wǎng", meaning: "～へ向かって", category: "生活語句：動・形", examples: [
      { chinese: "往前走。", japanese: "前へ歩く。" },
      { chinese: "往左。", japanese: "左へ。" },
      { chinese: "往右。", japanese: "右へ。" }
    ]
  },
  {
    id: 1261, char: "从", pinyin: "cóng", meaning: "～から（起点）", category: "生活語句：動・形", examples: [
      { chinese: "从北京来。", japanese: "北京から来る。" },
      { chinese: "从家来。", japanese: "家から来る。" },
      { chinese: "从现在开始。", japanese: "今から始める。" }
    ]
  },
  {
    id: 1262, char: "比", pinyin: "bǐ", meaning: "～より（比較）", category: "生活語句：動・形", examples: [
      { chinese: "比我大。", japanese: "私より大きい（年上）。" },
      { chinese: "比昨天冷。", japanese: "昨日より寒い。" },
      { chinese: "比这个好。", japanese: "これより良い。" }
    ]
  },
  {
    id: 1263, char: "可能", pinyin: "kěnéng", meaning: "たぶん、可能", category: "生活語句：動・形", examples: [
      { chinese: "可能下雨。", japanese: "たぶん雨が降る。" },
      { chinese: "可能去。", japanese: "たぶん行きます。" },
      { chinese: "可能不来。", japanese: "たぶん来ません。" }
    ]
  },
  {
    id: 1264, char: "可以", pinyin: "kěyǐ", meaning: "～してもよい", category: "生活語句：動・形", examples: [
      { chinese: "我可以去吗？", japanese: "行ってもいいですか？" },
      { chinese: "可以。", japanese: "いいですよ。" },
      { chinese: "可以进来。", japanese: "入ってもいいです。" }
    ]
  },
  {
    id: 1265, char: "要", pinyin: "yào", meaning: "～したい、要る", category: "生活語句：動・形", examples: [
      { chinese: "我要喝水。", japanese: "水を飲みたい。" },
      { chinese: "要这个。", japanese: "これが欲しい。" },
      { chinese: "要多少？", japanese: "いくつ要りますか？" }
    ]
  },
  {
    id: 1266, char: "得", pinyin: "de", meaning: "（様態補語の助詞）", category: "生活語句：動・形", examples: [
      { chinese: "做得好。", japanese: "よくできた。" },
      { chinese: "跑得快。", japanese: "走るのが速い。" },
      { chinese: "说得好。", japanese: "上手に話します。" }
    ]
  },
  {
    id: 1267, char: "着", pinyin: "zhe", meaning: "～している（持続）", category: "生活語句：動・形", examples: [
      { chinese: "看着书。", japanese: "本を読んでいる。" },
      { chinese: "坐着。", japanese: "座っている。" },
      { chinese: "开着门。", japanese: "ドアを開けている。" }
    ]
  },
  {
    id: 1268, char: "过", pinyin: "guo", meaning: "～したことがある", category: "生活語句：動・形", examples: [
      { chinese: "去过中国。", japanese: "中国に行ったことがある。" },
      { chinese: "吃过。", japanese: "食べたことがある。" },
      { chinese: "看过。", japanese: "見たことがある。" }
    ]
  },
  {
    id: 1269, char: "吧", pinyin: "ba", meaning: "～でしょう、～しよう", category: "生活語句：動・形", examples: [
      { chinese: "走吧。", japanese: "行こう。" },
      { chinese: "吃吧。", japanese: "食べましょう。" },
      { chinese: "好吧。", japanese: "いいでしょう。" }
    ]
  },
  {
    id: 1270, char: "次", pinyin: "cì", meaning: "回", category: "生活語句：動・形", examples: [
      { chinese: "第一次。", japanese: "初めて。" },
      { chinese: "第二次。", japanese: "2回目。" },
      { chinese: "下次。", japanese: "次回。" }
    ]
  },
  {
    id: 1271, char: "公斤", pinyin: "gōngjīn", meaning: "キログラム", category: "生活語句：動・形", examples: [
      { chinese: "五公斤。", japanese: "5キロ。" },
      { chinese: "一公斤。", japanese: "1キロ。" },
      { chinese: "多少公斤？", japanese: "何キロですか？" }
    ]
  },
  {
    id: 1272, char: "件", pinyin: "jiàn", meaning: "着、件（量詞）", category: "生活語句：動・形", examples: [
      { chinese: "一件衣服。", japanese: "一着の服。" },
      { chinese: "两件。", japanese: "二着。" },
      { chinese: "几件？", japanese: "何着ですか？" }
    ]
  },
  {
    id: 1273, char: "张", pinyin: "zhāng", meaning: "枚（量詞）", category: "生活語句：動・形", examples: [
      { chinese: "一张桌子。", japanese: "一台の机。" },
      { chinese: "一张纸。", japanese: "一枚の紙。" },
      { chinese: "几张？", japanese: "何枚ですか？" }
    ]
  },
  {
    id: 1274, char: "日", pinyin: "rì", meaning: "日", category: "生活語句：動・形", examples: [
      { chinese: "五月一日。", japanese: "5月1日。" },
      { chinese: "今日。", japanese: "今日。" },
      { chinese: "几日？", japanese: "何日ですか？" }
    ]
  },
  {
    id: 1275, char: "元", pinyin: "yuán", meaning: "元", category: "生活語句：動・形", examples: [
      { chinese: "一百元。", japanese: "100元。" },
      { chinese: "十元。", japanese: "10元。" },
      { chinese: "多少元？", japanese: "いくらですか？" }
    ]
  },
  {
    id: 1276, char: "晴", pinyin: "qíng", meaning: "晴れ", category: "生活語句：動・形", examples: [
      { chinese: "晴天。", japanese: "晴れの日。" },
      { chinese: "今天很晴。", japanese: "今日はとても晴れています。" },
      { chinese: "晴天很好。", japanese: "晴れの日はとても良いです。" }
    ]
  },
  {
    id: 1277, char: "阴", pinyin: "yīn", meaning: "曇り", category: "生活語句：動・形", examples: [
      { chinese: "阴天。", japanese: "曇りの日。" },
      { chinese: "今天很阴。", japanese: "今日はとても曇っています。" },
      { chinese: "阴天。", japanese: "曇りの日です。" }
    ]
  },
  {
    id: 1278, char: "好吃", pinyin: "hǎochī", meaning: "美味しい", category: "生活語句：動・形", examples: [
      { chinese: "很好吃。", japanese: "とても美味しい。" },
      { chinese: "好吃的东西。", japanese: "美味しい物。" },
      { chinese: "真好吃。", japanese: "本当に美味しいです。" }
    ]
  },
  {
    id: 1279, char: "觉得", pinyin: "juéde", meaning: "思う、感じる", category: "生活語句：動・形", examples: [
      { chinese: "我觉得好。", japanese: "良いと思います。" },
      { chinese: "觉得不错。", japanese: "悪くないと思います。" },
      { chinese: "觉得累。", japanese: "疲れたと感じます。" }
    ]
  },
  {
    id: 1280, char: "希望", pinyin: "xīwàng", meaning: "希望する", category: "生活語句：動・形", examples: [
      { chinese: "我希望...", japanese: "私は～と願っています。" },
      { chinese: "希望你去。", japanese: "あなたが行くことを願っています。" },
      { chinese: "希望成功。", japanese: "成功を願っています。" }
    ]
  },
  {
    id: 1281, char: "笑", pinyin: "xiào", meaning: "笑う", category: "生活語句：動・形", examples: [
      { chinese: "大笑。", japanese: "大笑いする。" },
      { chinese: "笑一笑。", japanese: "笑ってください。" },
      { chinese: "很开心地笑。", japanese: "とても嬉しそうに笑う。" }
    ]
  },
  {
    id: 1282, char: "哭", pinyin: "kū", meaning: "泣く", category: "生活語句：動・形", examples: [
      { chinese: "别哭。", japanese: "泣かないで。" },
      { chinese: "哭了。", japanese: "泣きました。" },
      { chinese: "不要哭。", japanese: "泣かないでください。" }
    ]
  },
  {
    id: 1283, char: "洗", pinyin: "xǐ", meaning: "洗う", category: "生活語句：動・形", examples: [
      { chinese: "洗衣服。", japanese: "服を洗う。" },
      { chinese: "洗手。", japanese: "手を洗う。" },
      { chinese: "洗水果。", japanese: "果物を洗う。" }
    ]
  },
  {
    id: 1284, char: "准备", pinyin: "zhǔnbèi", meaning: "準備する", category: "生活語句：動・形", examples: [
      { chinese: "准备好了。", japanese: "準備できました。" },
      { chinese: "准备考试。", japanese: "試験の準備をする。" },
      { chinese: "正在准备。", japanese: "準備中です。" }
    ]
  },
  {
    id: 1285, char: "问", pinyin: "wèn", meaning: "聞く、尋ねる", category: "生活語句：動・形", examples: [
      { chinese: "问老师。", japanese: "先生に聞く。" },
      { chinese: "问问题。", japanese: "質問をする。" },
      { chinese: "问一下。", japanese: "聞いてみる。" }
    ]
  },
  {
    id: 1286, char: "回答", pinyin: "huídá", meaning: "答える", category: "生活語句：動・形", examples: [
      { chinese: "回答问题。", japanese: "質問に答える。" },
      { chinese: "回答正确。", japanese: "正しく答える。" },
      { chinese: "回答不了。", japanese: "答えられません。" }
    ]
  },
  {
    id: 1287, char: "路", pinyin: "lù", meaning: "道", category: "生活語句：動・形", examples: [
      { chinese: "在路上。", japanese: "道中に。" },
      { chinese: "这条路。", japanese: "この道。" },
      { chinese: "过马路。", japanese: "道を渡る。" }
    ]
  },
  {
    id: 1288, char: "虽然", pinyin: "suīrán", meaning: "～だけれども", category: "生活語句：動・形", examples: [
      { chinese: "虽然很贵，但是很好。", japanese: "高価だけれども、とても良いです。" },
      { chinese: "虽然很远，但是要去。", japanese: "遠いだけれども、行きます。" },
      { chinese: "虽然累，但是很开心。", japanese: "疲れただけれども、とても楽しいです。" }
    ]
  },
  {
    id: 1289, char: "但是", pinyin: "dànshì", meaning: "しかし", category: "生活語句：動・形", examples: [
      { chinese: "但是很贵。", japanese: "しかし高いです。" },
      { chinese: "但是没时间。", japanese: "しかし時間がありません。" },
      { chinese: "但是很好。", japanese: "しかしとても良いです。" }
    ]
  },
  {
    id: 1290, char: "再", pinyin: "zài", meaning: "また", category: "生活語句：動・形", examples: [
      { chinese: "再见。", japanese: "また会いましょう。" },
      { chinese: "再来。", japanese: "また来てください。" },
      { chinese: "再试一次。", japanese: "もう一度試してください。" }
    ]
  },
  {
    id: 1291, char: "就", pinyin: "jiù", meaning: "すぐに、～だけ", category: "生活語句：動・形", examples: [
      { chinese: "我就去。", japanese: "すぐに行きます。" },
      { chinese: "就这个。", japanese: "これだけです。" },
      { chinese: "就现在。", japanese: "今すぐです。" }
    ]
  },
  {
    id: 1292, char: "还", pinyin: "hái", meaning: "まだ", category: "生活語句：動・形", examples: [
      { chinese: "还没去。", japanese: "まだ行っていない。" },
      { chinese: "还有。", japanese: "まだあります。" },
      { chinese: "还要。", japanese: "まだ欲しいです。" }
    ]
  },
  {
    id: 1293, char: "让", pinyin: "ràng", meaning: "～させる", category: "生活語句：動・形", examples: [
      { chinese: "让我看。", japanese: "私に見せて。" },
      { chinese: "让我去。", japanese: "行かせてください。" },
      { chinese: "让一下。", japanese: "ちょっと通してください。" }
    ]
  },
  {
    id: 1294, char: "告诉", pinyin: "gàosu", meaning: "教える", category: "生活語句：動・形", examples: [
      { chinese: "告诉我。", japanese: "私に教えて。" },
      { chinese: "告诉朋友。", japanese: "友達に伝える。" },
      { chinese: "告诉老师。", japanese: "先生に伝える。" }
    ]
  },
  {
    id: 1295, char: "找", pinyin: "zhǎo", meaning: "探す", category: "生活語句：動・形", examples: [
      { chinese: "找什么？", japanese: "何を探していますか？" },
      { chinese: "找朋友。", japanese: "友達を探す。" },
      { chinese: "找不到。", japanese: "見つからない。" }
    ]
  },
  {
    id: 1296, char: "懂", pinyin: "dǒng", meaning: "わかる", category: "生活語句：動・形", examples: [
      { chinese: "听懂了。", japanese: "聞き取れました。" },
      { chinese: "我懂了。", japanese: "わかりました。" },
      { chinese: "不懂。", japanese: "わかりません。" }
    ]
  },
  {
    id: 1297, char: "开始", pinyin: "kāishǐ", meaning: "始める", category: "生活語句：動・形", examples: [
      { chinese: "开始工作。", japanese: "仕事を始める。" },
      { chinese: "开始学习。", japanese: "勉強を始める。" },
      { chinese: "现在开始。", japanese: "今から始めます。" }
    ]
  },
  {
    id: 1298, char: "准备", pinyin: "zhǔnbèi", meaning: "準備", category: "生活語句：動・形", examples: [
      { chinese: "做准备。", japanese: "準備をする。" },
      { chinese: "准备考试。", japanese: "試験の準備をする。" },
      { chinese: "准备好了。", japanese: "準備できました。" }
    ]
  },
  {
    id: 1299, char: "非常", pinyin: "fēicháng", meaning: "非常に", category: "生活語句：動・形", examples: [
      { chinese: "非常好。", japanese: "非常に良い。" },
      { chinese: "非常喜欢。", japanese: "非常に好きです。" },
      { chinese: "非常忙。", japanese: "非常に忙しいです。" }
    ]
  },
  {
    id: 1300, char: "最", pinyin: "zuì", meaning: "最も", category: "生活語句：動・形", examples: [
      { chinese: "最好。", japanese: "最も良い。" },
      { chinese: "最喜欢。", japanese: "最も好きです。" },
      { chinese: "最重要。", japanese: "最も重要です。" }
    ]
  },

  // --- 追加：定型表現・生活語句 (残り約130語) ---
  {
    id: 1301, char: "饺子", pinyin: "jiǎozi", meaning: "餃子", category: "生活語句：食べ物", examples: [
      { chinese: "吃饺子。", japanese: "餃子を食べる。" },
      { chinese: "包饺子。", japanese: "餃子を作る。" },
      { chinese: "饺子很好吃。", japanese: "餃子はとても美味しいです。" }
    ]
  },
  {
    id: 1302, char: "面条", pinyin: "miàntiáo", meaning: "麺", category: "生活語句：食べ物", examples: [
      { chinese: "一碗面条。", japanese: "一杯の麺。" },
      { chinese: "吃面条。", japanese: "麺を食べる。" },
      { chinese: "面条很好吃。", japanese: "麺はとても美味しいです。" }
    ]
  },
  {
    id: 1303, char: "包子", pinyin: "bāozi", meaning: "肉まん", category: "生活語句：食べ物", examples: [
      { chinese: "买包子。", japanese: "肉まんを買う。" },
      { chinese: "吃包子。", japanese: "肉まんを食べる。" },
      { chinese: "包子很香。", japanese: "肉まんはとても香ばしいです。" }
    ]
  },
  {
    id: 1304, char: "面包", pinyin: "miànbāo", meaning: "パン", category: "生活語句：食べ物", examples: [
      { chinese: "吃面包。", japanese: "パンを食べる。" },
      { chinese: "买面包。", japanese: "パンを買う。" },
      { chinese: "新鲜的面包。", japanese: "新鮮なパン。" }
    ]
  },
  {
    id: 1305, char: "啤酒", pinyin: "píjiǔ", meaning: "ビール", category: "生活語句：食べ物", examples: [
      { chinese: "喝啤酒。", japanese: "ビールを飲む。" },
      { chinese: "一瓶啤酒。", japanese: "一瓶のビール。" },
      { chinese: "啤酒很凉。", japanese: "ビールはとても冷たいです。" }
    ]
  },
  {
    id: 1306, char: "香蕉", pinyin: "xiāngjiāo", meaning: "バナナ", category: "生活語句：食べ物", examples: [
      { chinese: "吃香蕉。", japanese: "バナナを食べる。" },
      { chinese: "买香蕉。", japanese: "バナナを買う。" },
      { chinese: "香蕉很甜。", japanese: "バナナはとても甘いです。" }
    ]
  },
  {
    id: 1307, char: "蛋糕", pinyin: "dàngāo", meaning: "ケーキ", category: "生活語句：食べ物", examples: [
      { chinese: "生日蛋糕。", japanese: "誕生日ケーキ。" },
      { chinese: "吃蛋糕。", japanese: "ケーキを食べる。" },
      { chinese: "蛋糕很甜。", japanese: "ケーキはとても甘いです。" }
    ]
  },
  {
    id: 1308, char: "筷子", pinyin: "kuàizi", meaning: "箸", category: "生活語句：食べ物", examples: [
      { chinese: "用筷子。", japanese: "箸を使う。" },
      { chinese: "一双筷子。", japanese: "一膳の箸。" },
      { chinese: "拿筷子。", japanese: "箸を取る。" }
    ]
  },
  {
    id: 1309, char: "碗", pinyin: "wǎn", meaning: "茶碗", category: "生活語句：食べ物", examples: [
      { chinese: "一只碗。", japanese: "一つのお椀。" },
      { chinese: "用碗吃饭。", japanese: "お椀でご飯を食べる。" },
      { chinese: "洗碗。", japanese: "お椀を洗う。" }
    ]
  },
  {
    id: 1310, char: "盘子", pinyin: "pánzi", meaning: "皿", category: "生活語句：食べ物", examples: [
      { chinese: "洗盘子。", japanese: "皿を洗う。" },
      { chinese: "一个盘子。", japanese: "一枚の皿。" },
      { chinese: "用盘子。", japanese: "皿を使う。" }
    ]
  },
  {
    id: 1311, char: "公司", pinyin: "gōngsī", meaning: "会社", category: "生活語句：場所", examples: [
      { chinese: "去公司。", japanese: "会社に行く。" },
      { chinese: "在公司工作。", japanese: "会社で働く。" },
      { chinese: "公司很大。", japanese: "会社はとても大きいです。" }
    ]
  },
  {
    id: 1312, char: "机场", pinyin: "jīchǎng", meaning: "空港", category: "生活語句：場所", examples: [
      { chinese: "去机场。", japanese: "空港に行く。" },
      { chinese: "在机场。", japanese: "空港にいる。" },
      { chinese: "机场很远。", japanese: "空港はとても遠いです。" }
    ]
  },
  {
    id: 1313, char: "超市", pinyin: "chāoshì", meaning: "スーパー", category: "生活語句：場所", examples: [
      { chinese: "逛超市。", japanese: "スーパーをぶらつく。" },
      { chinese: "去超市。", japanese: "スーパーに行く。" },
      { chinese: "超市很大。", japanese: "スーパーはとても大きいです。" }
    ]
  },
  {
    id: 1314, char: "图书馆", pinyin: "túshūguǎn", meaning: "図書館", category: "生活語句：場所", examples: [
      { chinese: "在图书馆。", japanese: "図書館にいる。" },
      { chinese: "去图书馆。", japanese: "図書館に行く。" },
      { chinese: "图书馆很安静。", japanese: "図書館はとても静かです。" }
    ]
  },
  {
    id: 1315, char: "宿舍", pinyin: "sùshè", meaning: "寮", category: "生活語句：場所", examples: [
      { chinese: "回宿舍。", japanese: "寮に帰る。" },
      { chinese: "在宿舍。", japanese: "寮にいる。" },
      { chinese: "宿舍很干净。", japanese: "寮はとてもきれいです。" }
    ]
  },
  {
    id: 1316, char: "食堂", pinyin: "shítáng", meaning: "食堂", category: "生活語句：場所", examples: [
      { chinese: "去食堂。", japanese: "食堂に行く。" },
      { chinese: "在食堂吃饭。", japanese: "食堂でご飯を食べる。" },
      { chinese: "食堂的菜。", japanese: "食堂の料理。" }
    ]
  },
  {
    id: 1317, char: "办公室", pinyin: "bàngōngshì", meaning: "オフィス", category: "生活語句：場所", examples: [
      { chinese: "在办公室。", japanese: "オフィスにいる。" },
      { chinese: "去办公室。", japanese: "オフィスに行く。" },
      { chinese: "办公室很忙。", japanese: "オフィスはとても忙しいです。" }
    ]
  },
  {
    id: 1318, char: "楼", pinyin: "lóu", meaning: "建物、階", category: "生活語句：場所", examples: [
      { chinese: "上楼。", japanese: "上の階に行く。" },
      { chinese: "下楼。", japanese: "下の階に行く。" },
      { chinese: "这栋楼。", japanese: "この建物。" }
    ]
  },
  {
    id: 1319, char: "地图", pinyin: "dìtú", meaning: "地図", category: "生活語句：身の回り", examples: [
      { chinese: "看地图。", japanese: "地図を見る。" },
      { chinese: "一张地图。", japanese: "一枚の地図。" },
      { chinese: "地图很有用。", japanese: "地図はとても役に立ちます。" }
    ]
  },
  {
    id: 1320, char: "照片", pinyin: "zhàopiàn", meaning: "写真", category: "生活語句：身の回り", examples: [
      { chinese: "拍照片。", japanese: "写真を撮る。" },
      { chinese: "看照片。", japanese: "写真を見る。" },
      { chinese: "一张照片。", japanese: "一枚の写真。" }
    ]
  },
  {
    id: 1321, char: "信", pinyin: "xìn", meaning: "手紙", category: "生活語句：身の回り", examples: [
      { chinese: "写信。", japanese: "手紙を書く。" },
      { chinese: "一封信。", japanese: "一通の手紙。" },
      { chinese: "收到信。", japanese: "手紙を受け取る。" }
    ]
  },
  {
    id: 1322, char: "伞", pinyin: "sǎn", meaning: "傘", category: "生活語句：身の回り", examples: [
      { chinese: "带伞。", japanese: "傘を持つ。" },
      { chinese: "一把伞。", japanese: "一本の傘。" },
      { chinese: "下雨带伞。", japanese: "雨が降るので傘を持っていく。" }
    ]
  },
  {
    id: 1323, char: "笔", pinyin: "bǐ", meaning: "ペン", category: "生活語句：身の回り", examples: [
      { chinese: "一支笔。", japanese: "一本のペン。" },
      { chinese: "用笔写字。", japanese: "ペンで字を書く。" },
      { chinese: "买笔。", japanese: "ペンを買う。" }
    ]
  },
  {
    id: 1324, char: "纸", pinyin: "zhǐ", meaning: "紙", category: "生活語句：身の回り", examples: [
      { chinese: "一张纸。", japanese: "一枚の紙。" },
      { chinese: "用纸。", japanese: "紙を使う。" },
      { chinese: "白纸。", japanese: "白い紙。" }
    ]
  },
  {
    id: 1325, char: "药", pinyin: "yào", meaning: "薬", category: "生活語句：身の回り", examples: [
      { chinese: "吃药。", japanese: "薬を飲む。" },
      { chinese: "买药。", japanese: "薬を買う。" },
      { chinese: "这个药。", japanese: "この薬。" }
    ]
  },
  {
    id: 1326, char: "包", pinyin: "bāo", meaning: "鞄", category: "生活語句：身の回り", examples: [
      { chinese: "买包。", japanese: "鞄を買う。" },
      { chinese: "一个包。", japanese: "一つの鞄。" },
      { chinese: "漂亮的包。", japanese: "きれいな鞄。" }
    ]
  },
  {
    id: 1327, char: "鞋", pinyin: "xié", meaning: "靴", category: "生活語句：身の回り", examples: [
      { chinese: "穿鞋。", japanese: "靴を履く。" },
      { chinese: "一双鞋。", japanese: "一足の靴。" },
      { chinese: "买新鞋。", japanese: "新しい靴を買う。" }
    ]
  },
  {
    id: 1328, char: "裤子", pinyin: "kùzi", meaning: "ズボン", category: "生活語句：身の回り", examples: [
      { chinese: "这条裤子。", japanese: "このズボン。" },
      { chinese: "穿裤子。", japanese: "ズボンを履く。" },
      { chinese: "买裤子。", japanese: "ズボンを買う。" }
    ]
  },
  {
    id: 1329, char: "裙子", pinyin: "qúnzi", meaning: "スカート", category: "生活語句：身の回り", examples: [
      { chinese: "漂亮的裙子。", japanese: "きれいなスカート。" },
      { chinese: "穿裙子。", japanese: "スカートを履く。" },
      { chinese: "买裙子。", japanese: "スカートを買う。" }
    ]
  },
  {
    id: 1330, char: "衬衫", pinyin: "chènshān", meaning: "シャツ", category: "生活語句：身の回り", examples: [
      { chinese: "白衬衫。", japanese: "白いシャツ。" },
      { chinese: "穿衬衫。", japanese: "シャツを着る。" },
      { chinese: "买衬衫。", japanese: "シャツを買う。" }
    ]
  },
  {
    id: 1331, char: "帽子", pinyin: "màozi", meaning: "帽子", category: "生活語句：身の回り", examples: [
      { chinese: "戴帽子。", japanese: "帽子をかぶる。" },
      { chinese: "一顶帽子。", japanese: "一つの帽子。" },
      { chinese: "买帽子。", japanese: "帽子を買う。" }
    ]
  },
  {
    id: 1332, char: "头", pinyin: "tóu", meaning: "頭", category: "生活語句：身の回り", examples: [
      { chinese: "头疼。", japanese: "頭が痛い。" },
      { chinese: "点头。", japanese: "うなずく。" },
      { chinese: "抬头。", japanese: "頭を上げる。" }
    ]
  },
  {
    id: 1333, char: "发", pinyin: "fà", meaning: "髪", category: "生活語句：身の回り", examples: [
      { chinese: "头发。", japanese: "髪の毛。" },
      { chinese: "长头发。", japanese: "長い髪。" },
      { chinese: "黑头发。", japanese: "黒い髪。" }
    ]
  },
  {
    id: 1334, char: "脸", pinyin: "liǎn", meaning: "顔", category: "生活語句：身の回り", examples: [
      { chinese: "洗脸。", japanese: "顔を洗う。" },
      { chinese: "一张脸。", japanese: "一つの顔。" },
      { chinese: "脸红。", japanese: "顔が赤くなる。" }
    ]
  },
  {
    id: 1335, char: "嘴", pinyin: "zuǐ", meaning: "口", category: "生活語句：身の回り", examples: [
      { chinese: "闭嘴。", japanese: "黙る。" },
      { chinese: "张嘴。", japanese: "口を開ける。" },
      { chinese: "用嘴说。", japanese: "口で話す。" }
    ]
  },
  {
    id: 1336, char: "耳朵", pinyin: "ěrduo", meaning: "耳", category: "生活語句：身の回り", examples: [
      { chinese: "耳朵疼。", japanese: "耳が痛い。" },
      { chinese: "用耳朵听。", japanese: "耳で聞く。" },
      { chinese: "大耳朵。", japanese: "大きな耳。" }
    ]
  },
  {
    id: 1337, char: "脚", pinyin: "jiǎo", meaning: "足", category: "生活語句：身の回り", examples: [
      { chinese: "洗脚。", japanese: "足を洗う。" },
      { chinese: "脚疼。", japanese: "足が痛い。" },
      { chinese: "两只脚。", japanese: "両足。" }
    ]
  },
  {
    id: 1338, char: "树", pinyin: "shù", meaning: "木", category: "生活語句：自然", examples: [
      { chinese: "种树。", japanese: "木を植える。" },
      { chinese: "一棵树。", japanese: "一本の木。" },
      { chinese: "大树。", japanese: "大きな木。" }
    ]
  },
  {
    id: 1339, char: "花", pinyin: "huā", meaning: "花", category: "生活語句：自然", examples: [
      { chinese: "红花。", japanese: "赤い花。" },
      { chinese: "看花。", japanese: "花を見る。" },
      { chinese: "漂亮的花。", japanese: "きれいな花。" }
    ]
  },
  {
    id: 1340, char: "草", pinyin: "cǎo", meaning: "草", category: "生活語句：自然", examples: [
      { chinese: "绿草。", japanese: "緑の草。" },
      { chinese: "很多草。", japanese: "たくさんの草。" },
      { chinese: "草很绿。", japanese: "草はとても緑です。" }
    ]
  },
  {
    id: 1341, char: "月亮", pinyin: "yuèliang", meaning: "月", category: "生活語句：自然", examples: [
      { chinese: "看月亮。", japanese: "月を見る。" },
      { chinese: "月亮很圆。", japanese: "月はとても丸いです。" },
      { chinese: "晚上的月亮。", japanese: "夜の月。" }
    ]
  },
  {
    id: 1342, char: "太阳", pinyin: "tàiyáng", meaning: "太陽", category: "生活語句：自然", examples: [
      { chinese: "晒太阳。", japanese: "日光浴をする。" },
      { chinese: "看太阳。", japanese: "太陽を見る。" },
      { chinese: "太阳很大。", japanese: "太陽はとても大きいです。" }
    ]
  },
  {
    id: 1343, char: "熊猫", pinyin: "xióngmāo", meaning: "パンダ", category: "生活語句：自然", examples: [
      { chinese: "大熊猫。", japanese: "ジャイアントパンダ。" },
      { chinese: "看熊猫。", japanese: "パンダを見る。" },
      { chinese: "熊猫很可爱。", japanese: "パンダはとても可愛いです。" }
    ]
  },
  {
    id: 1344, char: "鸟", pinyin: "niǎo", meaning: "鳥", category: "生活語句：自然", examples: [
      { chinese: "小鸟。", japanese: "小鳥。" },
      { chinese: "一只鸟。", japanese: "一羽の鳥。" },
      { chinese: "鸟在飞。", japanese: "鳥が飛んでいます。" }
    ]
  },
  {
    id: 1345, char: "马", pinyin: "mǎ", meaning: "馬", category: "生活語句：自然", examples: [
      { chinese: "骑马。", japanese: "馬に乗る。" },
      { chinese: "一匹马。", japanese: "一頭の馬。" },
      { chinese: "马跑得很快。", japanese: "馬は走るのがとても速いです。" }
    ]
  },
  {
    id: 1346, char: "羊", pinyin: "yáng", meaning: "羊", category: "生活語句：自然", examples: [
      { chinese: "小羊。", japanese: "子羊。" },
      { chinese: "一只羊。", japanese: "一頭の羊。" },
      { chinese: "羊很温顺。", japanese: "羊はとてもおとなしいです。" }
    ]
  },
  {
    id: 1347, char: "鱼", pinyin: "yú", meaning: "魚", category: "生活語句：自然", examples: [
      { chinese: "一条鱼。", japanese: "一匹の魚。" },
      { chinese: "看鱼。", japanese: "魚を見る。" },
      { chinese: "鱼在水里。", japanese: "魚は水の中にいます。" }
    ]
  },
  {
    id: 1348, char: "跑", pinyin: "pǎo", meaning: "走る", category: "生活語句：動・形", examples: [
      { chinese: "跑步。", japanese: "ランニングする。" },
      { chinese: "跑得快。", japanese: "走るのが速い。" },
      { chinese: "去跑步。", japanese: "走りに行く。" }
    ]
  },
  {
    id: 1349, char: "跳", pinyin: "tiào", meaning: "跳ぶ", category: "生活語句：動・形", examples: [
      { chinese: "跳高。", japanese: "高く跳ぶ。" },
      { chinese: "跳远。", japanese: "遠く跳ぶ。" },
      { chinese: "跳一下。", japanese: "跳んでみる。" }
    ]
  },
  {
    id: 1350, char: "拿", pinyin: "ná", meaning: "持つ、取る", category: "生活語句：動・形", examples: [
      { chinese: "拿书。", japanese: "本を取る。" },
      { chinese: "拿过来。", japanese: "持ってくる。" },
      { chinese: "拿给我。", japanese: "私に持ってきて。" }
    ]
  },
  {
    id: 1351, char: "换", pinyin: "huàn", meaning: "換える", category: "生活語句：動・形", examples: [
      { chinese: "换钱。", japanese: "両替する。" },
      { chinese: "换衣服。", japanese: "服を着替える。" },
      { chinese: "换一下。", japanese: "交換してください。" }
    ]
  },
  {
    id: 1352, char: "关", pinyin: "guān", meaning: "閉める、消す", category: "生活語句：動・形", examples: [
      { chinese: "关灯。", japanese: "電気を消す。" },
      { chinese: "关门。", japanese: "ドアを閉める。" },
      { chinese: "关窗户。", japanese: "窓を閉める。" }
    ]
  },
  {
    id: 1353, char: "放", pinyin: "fàng", meaning: "置く、放す", category: "生活語句：動・形", examples: [
      { chinese: "放在这儿。", japanese: "ここに置く。" },
      { chinese: "放下来。", japanese: "下に置く。" },
      { chinese: "放好。", japanese: "きちんと置く。" }
    ]
  },
  {
    id: 1354, char: "记", pinyin: "jì", meaning: "覚える", category: "生活語句：動・形", examples: [
      { chinese: "记住。", japanese: "しっかりと覚える。" },
      { chinese: "记单词。", japanese: "単語を覚える。" },
      { chinese: "记不住。", japanese: "覚えられない。" }
    ]
  },
  {
    id: 1355, char: "忘", pinyin: "wàng", meaning: "忘れる", category: "生活語句：動・形", examples: [
      { chinese: "忘了。", japanese: "忘れた。" },
      { chinese: "忘记了。", japanese: "忘れてしまいました。" },
      { chinese: "别忘记。", japanese: "忘れないでください。" }
    ]
  },
  {
    id: 1356, char: "借", pinyin: "jiè", meaning: "借りる、貸す", category: "生活語句：動・形", examples: [
      { chinese: "借书。", japanese: "本を借りる。" },
      { chinese: "借给我。", japanese: "私に貸してください。" },
      { chinese: "借一下。", japanese: "ちょっと借りてください。" }
    ]
  },
  {
    id: 1357, char: "用", pinyin: "yòng", meaning: "使う", category: "生活語句：動・形", examples: [
      { chinese: "用电脑。", japanese: "パソコンを使う。" },
      { chinese: "用筷子。", japanese: "箸を使う。" },
      { chinese: "用一下。", japanese: "ちょっと使ってください。" }
    ]
  },
  {
    id: 1358, char: "画", pinyin: "huà", meaning: "描く", category: "生活語句：動・形", examples: [
      { chinese: "画画儿。", japanese: "絵を描く。" },
      { chinese: "画得很好。", japanese: "とても上手に描きます。" },
      { chinese: "画一幅画。", japanese: "一枚の絵を描く。" }
    ]
  },
  {
    id: 1359, char: "像", pinyin: "xiàng", meaning: "似ている", category: "生活語句：動・形", examples: [
      { chinese: "很像。", japanese: "よく似ている。" },
      { chinese: "像爸爸。", japanese: "父に似ている。" },
      { chinese: "不像。", japanese: "似ていない。" }
    ]
  },
  {
    id: 1360, char: "疼", pinyin: "téng", meaning: "痛い", category: "生活語句：動・形", examples: [
      { chinese: "手疼。", japanese: "手が痛い。" },
      { chinese: "头疼。", japanese: "頭が痛い。" },
      { chinese: "很疼。", japanese: "とても痛いです。" }
    ]
  },
  {
    id: 1361, char: "清楚", pinyin: "qīngchu", meaning: "はっきりしている", category: "生活語句：動・形", examples: [
      { chinese: "听清楚。", japanese: "はっきりと聞く。" },
      { chinese: "看清楚了。", japanese: "はっきり見えました。" },
      { chinese: "很清楚。", japanese: "とてもはっきりしています。" }
    ]
  },
  {
    id: 1362, char: "干净", pinyin: "gānjìng", meaning: "きれいだ", category: "生活語句：動・形", examples: [
      { chinese: "很干净。", japanese: "とてもきれいだ。" },
      { chinese: "洗干净。", japanese: "きれいに洗う。" },
      { chinese: "房间很干净。", japanese: "部屋はとてもきれいです。" }
    ]
  },
  {
    id: 1363, char: "安静", pinyin: "ānjìng", meaning: "静かだ", category: "生活語句：動・形", examples: [
      { chinese: "安静一下。", japanese: "静かにしてください。" },
      { chinese: "很安静。", japanese: "とても静かだ。" },
      { chinese: "安静的地方。", japanese: "静かな場所。" }
    ]
  },
  {
    id: 1364, char: "容易", pinyin: "róngyì", meaning: "簡単だ", category: "生活語句：動・形", examples: [
      { chinese: "很容易。", japanese: "とても簡単だ。" },
      { chinese: "容易做。", japanese: "簡単にできる。" },
      { chinese: "不容易。", japanese: "簡単ではない。" }
    ]
  },
  {
    id: 1365, char: "难", pinyin: "nán", meaning: "難しい", category: "生活語句：動・形", examples: [
      { chinese: "很难。", japanese: "とても難しい。" },
      { chinese: "难学。", japanese: "学ぶのが難しい。" },
      { chinese: "太难了。", japanese: "難しすぎます。" }
    ]
  },
  {
    id: 1366, char: "胖", pinyin: "pàng", meaning: "太っている", category: "生活語句：動・形", examples: [
      { chinese: "长胖了。", japanese: "太った。" },
      { chinese: "很胖。", japanese: "とても太っている。" },
      { chinese: "不要长胖。", japanese: "太らないでください。" }
    ]
  },
  {
    id: 1367, char: "瘦", pinyin: "shòu", meaning: "痩せている", category: "生活語句：動・形", examples: [
      { chinese: "很瘦。", japanese: "とても痩せている。" },
      { chinese: "瘦了。", japanese: "痩せました。" },
      { chinese: "太瘦了。", japanese: "痩せすぎです。" }
    ]
  },
  {
    id: 1368, char: "一样", pinyin: "yíyàng", meaning: "同じだ", category: "生活語句：動・形", examples: [
      { chinese: "都一样。", japanese: "みんな同じだ。" },
      { chinese: "一样大。", japanese: "同じ大きさです。" },
      { chinese: "不一样。", japanese: "同じではない。" }
    ]
  },
  {
    id: 1369, char: "方便", pinyin: "fāngbiàn", meaning: "便利だ", category: "生活語句：動・形", examples: [
      { chinese: "很方便。", japanese: "とても便利だ。" },
      { chinese: "方便吗？", japanese: "便利ですか？" },
      { chinese: "不方便。", japanese: "便利ではない。" }
    ]
  },
  {
    id: 1370, char: "小心", pinyin: "xiǎoxīn", meaning: "気をつける", category: "生活語句：動・形", examples: [
      { chinese: "小心点儿。", japanese: "気をつけて。" },
      { chinese: "小心路滑。", japanese: "道が滑るので気をつけて。" },
      { chinese: "要小心。", japanese: "気をつけなければなりません。" }
    ]
  },
  {
    id: 1371, char: "努力", pinyin: "nǔlì", meaning: "努力する", category: "生活語句：動・形", examples: [
      { chinese: "努力学习。", japanese: "一生懸命勉強する。" },
      { chinese: "很努力。", japanese: "とても努力しています。" },
      { chinese: "努力吧。", japanese: "頑張りましょう。" }
    ]
  },
  {
    id: 1372, char: "相信", pinyin: "xiāngxìn", meaning: "信じる", category: "生活語句：動・形", examples: [
      { chinese: "相信我。", japanese: "私を信じて。" },
      { chinese: "相信你。", japanese: "あなたを信じています。" },
      { chinese: "不相信。", japanese: "信じません。" }
    ]
  },
  {
    id: 1373, char: "习惯", pinyin: "xíguàn", meaning: "慣れる", category: "生活語句：動・形", examples: [
      { chinese: "习惯了。", japanese: "慣れました。" },
      { chinese: "不习惯。", japanese: "慣れていません。" },
      { chinese: "习惯这里。", japanese: "ここに慣れる。" }
    ]
  },
  {
    id: 1374, char: "你好", pinyin: "nǐhǎo", meaning: "こんにちは", category: "定型表現", examples: [
      { chinese: "你好！", japanese: "こんにちは！" },
      { chinese: "你好吗？", japanese: "お元気ですか？" },
      { chinese: "你好，很高兴认识你。", japanese: "こんにちは、お会いできて嬉しいです。" }
    ]
  },
  {
    id: 1375, char: "早上好", pinyin: "zǎoshang hǎo", meaning: "おはよう", category: "定型表現", examples: [
      { chinese: "老师，早上好。", japanese: "先生、おはようございます。" },
      { chinese: "早上好！", japanese: "おはよう！" },
      { chinese: "大家早上好。", japanese: "みなさんおはようございます。" }
    ]
  },
  {
    id: 1376, char: "晚安", pinyin: "wǎn'ān", meaning: "おやすみ", category: "定型表現", examples: [
      { chinese: "大家晚安。", japanese: "みなさん、おやすみなさい。" },
      { chinese: "晚安！", japanese: "おやすみ！" },
      { chinese: "晚安，明天见。", japanese: "おやすみ、また明日。" }
    ]
  },
  {
    id: 1377, char: "好久不见", pinyin: "hǎojiǔ bújiàn", meaning: "お久しぶりです", category: "定型表現", examples: [
      { chinese: "好久不见！", japanese: "お久しぶりです！" },
      { chinese: "好久不见了。", japanese: "お久しぶりです。" },
      { chinese: "好久不见，你好吗？", japanese: "お久しぶりです、お元気ですか？" }
    ]
  },
  {
    id: 1378, char: "最近怎么样", pinyin: "zuìjìn zěnmeyàng", meaning: "最近どうですか", category: "定型表現", examples: [
      { chinese: "你最近怎么样？", japanese: "最近どうですか？" },
      { chinese: "最近怎么样？", japanese: "最近どうですか？" },
      { chinese: "最近怎么样，忙吗？", japanese: "最近どうですか、忙しいですか？" }
    ]
  },
  {
    id: 1379, char: "辛苦了", pinyin: "xīnkǔ le", meaning: "お疲れ様でした", category: "定型表現", examples: [
      { chinese: "大家辛苦了。", japanese: "みなさんお疲れ様でした。" },
      { chinese: "辛苦了。", japanese: "お疲れ様でした。" },
      { chinese: "今天辛苦了。", japanese: "今日はお疲れ様でした。" }
    ]
  },
  {
    id: 1380, char: "麻烦你了", pinyin: "máfan nǐ le", meaning: "お手数をおかけします", category: "定型表現", examples: [
      { chinese: "麻烦你了。", japanese: "ご迷惑をおかけします。" },
      { chinese: "麻烦你了，谢谢。", japanese: "ご迷惑をおかけして、ありがとうございます。" },
      { chinese: "麻烦你了，不好意思。", japanese: "ご迷惑をおかけして、すみません。" }
    ]
  },
  {
    id: 1381, char: "不用谢", pinyin: "búyòngxiè", meaning: "どういたしまして", category: "定型表現", examples: [
      { chinese: "不用谢。", japanese: "お礼には及びません。" },
      { chinese: "不用谢，应该的。", japanese: "お礼には及びません、当然のことです。" },
      { chinese: "不用谢，不客气。", japanese: "お礼には及びません、どういたしまして。" }
    ]
  },
  {
    id: 1382, char: "别客气", pinyin: "bié kèqi", meaning: "遠慮しないで", category: "定型表現", examples: [
      { chinese: "别客气。", japanese: "遠慮なさらないでください。" },
      { chinese: "别客气，请坐。", japanese: "遠慮なさらないで、どうぞお座りください。" },
      { chinese: "别客气，随便。", japanese: "遠慮なさらないで、ご自由にどうぞ。" }
    ]
  },
  {
    id: 1383, char: "请问", pinyin: "qǐngwèn", meaning: "お尋ねします", category: "定型表現", examples: [
      { chinese: "请问，厕所在哪儿？", japanese: "すみません、トイレはどこですか？" },
      { chinese: "请问，现在几点？", japanese: "すみません、今は何時ですか？" },
      { chinese: "请问，怎么去？", japanese: "すみません、どうやって行きますか？" }
    ]
  },
  {
    id: 1384, char: "请进", pinyin: "qǐngjìn", meaning: "どうぞお入りください", category: "定型表現", examples: [
      { chinese: "请进！", japanese: "どうぞお入りください！" },
      { chinese: "请进，请坐。", japanese: "どうぞお入りください、お座りください。" },
      { chinese: "请进，别客气。", japanese: "どうぞお入りください、遠慮なさらないで。" }
    ]
  },
  {
    id: 1385, char: "请坐", pinyin: "qǐngzuò", meaning: "どうぞお座りください", category: "定型表現", examples: [
      { chinese: "大家请坐。", japanese: "みなさんお座りください。" },
      { chinese: "请坐，请坐。", japanese: "どうぞお座りください。" },
      { chinese: "请坐，喝茶。", japanese: "どうぞお座りください、お茶をどうぞ。" }
    ]
  },
  {
    id: 1386, char: "请多关照", pinyin: "qǐng duō guānzhào", meaning: "よろしくお願いします", category: "定型表現", examples: [
      { chinese: "我是新来的，请多关照。", japanese: "新入りです、よろしくお願いします。" },
      { chinese: "请多关照。", japanese: "よろしくお願いします。" },
      { chinese: "以后请多关照。", japanese: "今後ともよろしくお願いします。" }
    ]
  },
  {
    id: 1387, char: "慢走", pinyin: "mànzǒu", meaning: "お気をつけて（見送り）", category: "定型表現", examples: [
      { chinese: "慢走啊。", japanese: "お気をつけてお帰りください。" },
      { chinese: "慢走，再见。", japanese: "お気をつけて、さようなら。" },
      { chinese: "慢走，路上小心。", japanese: "お気をつけて、道中気をつけてください。" }
    ]
  },
  {
    id: 1388, char: "一路平安", pinyin: "yílù píng'ān", meaning: "道中ご無事で", category: "定型表現", examples: [
      { chinese: "祝你一路平安。", japanese: "道中のご無事をお祈りします。" },
      { chinese: "一路平安！", japanese: "道中ご無事で！" },
      { chinese: "一路平安，再见。", japanese: "道中ご無事で、さようなら。" }
    ]
  },
  {
    id: 1389, char: "生日快乐", pinyin: "shēngrì kuàilè", meaning: "誕生日おめでとう", category: "定型表現", examples: [
      { chinese: "祝你生日快乐！", japanese: "お誕生日おめでとう！" },
      { chinese: "生日快乐！", japanese: "お誕生日おめでとう！" },
      { chinese: "生日快乐，身体健康。", japanese: "お誕生日おめでとう、健康でありますように。" }
    ]
  },
  {
    id: 1390, char: "新年快乐", pinyin: "xīnnián kuàilè", meaning: "明けましておめでとう", category: "定型表現", examples: [
      { chinese: "大家新年快乐！", japanese: "みなさん明けましておめでとう！" },
      { chinese: "新年快乐！", japanese: "明けましておめでとう！" },
      { chinese: "新年快乐，万事如意。", japanese: "明けましておめでとう、すべてがうまくいきますように。" }
    ]
  },
  {
    id: 1391, char: "恭喜", pinyin: "gōngxǐ", meaning: "おめでとう", category: "定型表現", examples: [
      { chinese: "恭喜恭喜！", japanese: "おめでとうございます！" },
      { chinese: "恭喜你。", japanese: "おめでとうございます。" },
      { chinese: "恭喜，恭喜。", japanese: "おめでとう、おめでとう。" }
    ]
  },
  {
    id: 1392, char: "干杯", pinyin: "gānbēi", meaning: "乾杯", category: "定型表現", examples: [
      { chinese: "为友谊干杯！", japanese: "友情のために乾杯！" },
      { chinese: "干杯！", japanese: "乾杯！" },
      { chinese: "大家一起干杯。", japanese: "みんな一緒に乾杯しましょう。" }
    ]
  },
  {
    id: 1393, char: "当然", pinyin: "dāngrán", meaning: "もちろん", category: "定型表現", examples: [
      { chinese: "当然可以。", japanese: "もちろんいいですよ。" },
      { chinese: "当然。", japanese: "もちろんです。" },
      { chinese: "当然没问题。", japanese: "もちろん問題ありません。" }
    ]
  },
  {
    id: 1394, char: "真的吗", pinyin: "zhēnde ma", meaning: "本当ですか", category: "定型表現", examples: [
      { chinese: "真的吗？太好了！", japanese: "本当ですか？やった！" },
      { chinese: "真的吗？", japanese: "本当ですか？" },
      { chinese: "真的吗？我不相信。", japanese: "本当ですか？信じられません。" }
    ]
  },
  {
    id: 1395, char: "别担心", pinyin: "bié dānxīn", meaning: "心配しないで", category: "定型表現", examples: [
      { chinese: "别担心，没事。", japanese: "心配しないで、大丈夫だから。" },
      { chinese: "别担心。", japanese: "心配しないで。" },
      { chinese: "别担心，会好的。", japanese: "心配しないで、大丈夫になりますよ。" }
    ]
  },
  {
    id: 1396, char: "我也一样", pinyin: "wǒ yě yíyàng", meaning: "私も同じです", category: "定型表現", examples: [
      { chinese: "我也一样。", japanese: "私も同じです。" },
      { chinese: "我也一样喜欢。", japanese: "私も同じように好きです。" },
      { chinese: "我也一样，很高兴。", japanese: "私も同じです、とても嬉しいです。" }
    ]
  },
  {
    id: 1397, char: "有点儿", pinyin: "yǒudiǎnr", meaning: "少し～だ", category: "定型表現", examples: [
      { chinese: "有点儿累。", japanese: "少し疲れました。" },
      { chinese: "有点儿贵。", japanese: "少し高いです。" },
      { chinese: "有点儿难。", japanese: "少し難しいです。" }
    ]
  },
  {
    id: 1398, char: "为什么", pinyin: "wèishénme", meaning: "なぜ", category: "定型表現", examples: [
      { chinese: "为什么不去？", japanese: "なぜ行かないのですか？" },
      { chinese: "为什么？", japanese: "なぜですか？" },
      { chinese: "为什么这样？", japanese: "なぜこうなのですか？" }
    ]
  },
  {
    id: 1399, char: "怎么了", pinyin: "zěnme le", meaning: "どうしたの", category: "定型表現", examples: [
      { chinese: "你怎么了？", japanese: "どうしたんですか？" },
      { chinese: "怎么了？", japanese: "どうしたの？" },
      { chinese: "怎么了，不舒服吗？", japanese: "どうしたんですか、体調が悪いですか？" }
    ]
  },
  {
    id: 1400, char: "怎么办", pinyin: "zěnme bàn", meaning: "どうしよう", category: "定型表現", examples: [
      { chinese: "我该怎么办？", japanese: "私はどうすればいいですか？" },
      { chinese: "怎么办？", japanese: "どうしよう？" },
      { chinese: "怎么办才好？", japanese: "どうすればいいですか？" }
    ]
  },
  {
    id: 1401, char: "加油", pinyin: "jiāyóu", meaning: "がんばれ", category: "定型表現", examples: [
      { chinese: "加油！", japanese: "がんばれ！" },
      { chinese: "加油，你能行。", japanese: "がんばれ、あなたならできます。" },
      { chinese: "大家一起加油。", japanese: "みんな一緒に頑張りましょう。" }
    ]
  },
  {
    id: 1402, char: "太棒了", pinyin: "tài bàng le", meaning: "すごい、素晴らしい", category: "定型表現", examples: [
      { chinese: "太棒了！", japanese: "すごいですね！" },
      { chinese: "太棒了，太好了。", japanese: "すごいですね、素晴らしいです。" },
      { chinese: "太棒了，恭喜。", japanese: "すごいですね、おめでとうございます。" }
    ]
  },
  {
    id: 1403, char: "好的", pinyin: "hǎo de", meaning: "わかりました、OK", category: "定型表現", examples: [
      { chinese: "好的，我知道了。", japanese: "はい、わかりました。" },
      { chinese: "好的。", japanese: "わかりました。" },
      { chinese: "好的，没问题。", japanese: "わかりました、問題ありません。" }
    ]
  },
  {
    id: 1404, char: "对了", pinyin: "duì le", meaning: "そうだ（話題転換）", category: "定型表現", examples: [
      { chinese: "对了，你吃饭了吗？", japanese: "そうだ、ご飯食べた？" },
      { chinese: "对了，我想起来了。", japanese: "そうだ、思い出しました。" },
      { chinese: "对了，还有一件事。", japanese: "そうだ、もう一つ用事があります。" }
    ]
  },
  {
    id: 1405, char: "一共", pinyin: "yígòng", meaning: "全部で", category: "生活語句：数", examples: [
      { chinese: "一共多少钱？", japanese: "全部でいくらですか？" },
      { chinese: "一共三个。", japanese: "全部で3つです。" },
      { chinese: "一共多少？", japanese: "全部でいくつですか？" }
    ]
  }
];