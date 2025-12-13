// --- HSK 2級 データ (指定語句 + 頻出・生活語句で約550語規模を目指して拡充) ---
export const hsk2 = [
  // ■ 指定語句: 名詞 (人物・場所・物)
  {
    id: 2001,
    char: "报纸",
    pinyin: "bàozhǐ",
    meaning: "新聞",
    category: "名詞",
    examples: [
      {
        chinese: "他手里拿着一张报纸。",
        japanese: "彼の手には新聞が握られています。",
      },
      {
        chinese: "我也想要看这张报纸。",
        japanese: "私もその新聞を読みたいです。",
      },
      {
        chinese: "桌子上放着今天的报纸。",
        japanese: "机の上に今日の新聞が置いてあります。",
      },
    ],
  },
  {
    id: 2002,
    char: "宾馆",
    pinyin: "bīnguǎn",
    meaning: "ホテル",
    category: "名詞",
    examples: [
      {
        chinese: "她在一家宾馆当服务员。",
        japanese: "彼女はホテルで従業員として働いています。",
      },
      {
        chinese: "这家宾馆的房间很干净。",
        japanese: "このホテルの部屋はとてもきれいです。",
      },
      {
        chinese: "住在宾馆比住在家里贵。",
        japanese: "ホテルに泊まるのは家に住むより高いです。",
      },
    ],
  },
  {
    id: 2003,
    char: "车站",
    pinyin: "chēzhàn",
    meaning: "駅、バス停",
    category: "名詞",
    examples: [
      { chinese: "我在车站等你。", japanese: "駅であなたを待っています。" },
      {
        chinese: "去火车站要坐几路车？",
        japanese: "駅に行くには何番のバスに乗ればいいですか？",
      },
      {
        chinese: "车站离我家不远。",
        japanese: "駅は私の家から遠くありません。",
      },
    ],
  },
  {
    id: 2004,
    char: "房间",
    pinyin: "fángjiān",
    meaning: "部屋",
    category: "名詞",
    examples: [
      {
        chinese: "我们两个人住一个房间。",
        japanese: "私たち2人は1つの部屋に住んでいます。",
      },
      { chinese: "这个房间太小了。", japanese: "この部屋は小さすぎます。" },
      { chinese: "请打扫一下房间。", japanese: "部屋を掃除してください。" },
    ],
  },
  {
    id: 2005,
    char: "服务员",
    pinyin: "fúwùyuán",
    meaning: "従業員、店員",
    category: "名詞",
    examples: [
      {
        chinese: "这个饭店的服务员很热情。",
        japanese: "このホテルの従業員はとても親切です。",
      },
      {
        chinese: "服务员，请给我倒杯水。",
        japanese: "店員さん、水を一杯ください。",
      },
      {
        chinese: "由于服务员的帮助，我找到了座位。",
        japanese: "店員さんの助けで、私は席を見つけました。",
      },
    ],
  },
  {
    id: 2006,
    char: "哥哥",
    pinyin: "gēge",
    meaning: "兄",
    category: "名詞",
    examples: [
      { chinese: "这是我哥哥的汽车。", japanese: "これは私の兄の車です。" },
      { chinese: "我哥哥比我大三岁。", japanese: "兄は私より3つ年上です。" },
      {
        chinese: "哥哥喜欢打篮球。",
        japanese: "兄はバスケットボールをするのが好きです。",
      },
    ],
  },
  {
    id: 2007,
    char: "公共汽车",
    pinyin: "gōnggòng qìchē",
    meaning: "バス",
    category: "名詞",
    examples: [
      {
        chinese: "我们坐公共汽车去吧。",
        japanese: "私たちはバスで行きましょう。",
      },
      { chinese: "公共汽车上人很多。", japanese: "バスの中は人が多いです。" },
      {
        chinese: "虽然慢，但是坐公共汽车很便宜。",
        japanese: "遅いですが、バスに乗るのは安いです。",
      },
    ],
  },
  {
    id: 2008,
    char: "公司",
    pinyin: "gōngsī",
    meaning: "会社",
    category: "名詞",
    examples: [
      {
        chinese: "昨天我没上公司去。",
        japanese: "昨日は会社に行きませんでした。",
      },
      {
        chinese: "他在一家大公司工作。",
        japanese: "彼は大きな会社で働いています。",
      },
      {
        chinese: "公司离我家很近。",
        japanese: "会社は私の家からとても近いです。",
      },
    ],
  },
  {
    id: 2009,
    char: "孩子",
    pinyin: "háizi",
    meaning: "子供",
    category: "名詞",
    examples: [
      { chinese: "这孩子真聪明。", japanese: "この子供はとても賢いです。" },
      {
        chinese: "孩子们在公园里玩。",
        japanese: "子供たちは公園で遊んでいます。",
      },
      {
        chinese: "照顾孩子不容易。",
        japanese: "子供の世話は簡単ではありません。",
      },
    ],
  },
  {
    id: 2010,
    char: "火车站",
    pinyin: "huǒchēzhàn",
    meaning: "駅",
    category: "名詞",
    examples: [
      {
        chinese: "我们三点在火车站见面。",
        japanese: "私たちは3時に駅で会きましょう。",
      },
      { chinese: "送朋友去火车站。", japanese: "友達を駅まで見送ります。" },
      {
        chinese: "火车站前面有一个大商店。",
        japanese: "駅の前に大きな店があります。",
      },
    ],
  },
  {
    id: 2011,
    char: "教室",
    pinyin: "jiàoshì",
    meaning: "教室",
    category: "名詞",
    examples: [
      { chinese: "我们的教室在哪儿？", japanese: "私たちの教室はどこですか。" },
      {
        chinese: "教室里有很多学生。",
        japanese: "教室にはたくさんの学生がいます。",
      },
      { chinese: "请保持教室安静。", japanese: "教室では静かにしてください。" },
    ],
  },
  {
    id: 2012,
    char: "机场",
    pinyin: "jīchǎng",
    meaning: "空港",
    category: "名詞",
    examples: [
      {
        chinese: "我下飞机后在机场等你吧。",
        japanese: "私は飛行機から降りた後、空港であなたを待っていますね。",
      },
      { chinese: "去机场怎么走？", japanese: "空港へはどうやって行きますか？" },
      {
        chinese: "我们准时到达了机场。",
        japanese: "私たちは時間通りに空港に到着しました。",
      },
    ],
  },
  {
    id: 2013,
    char: "鸡蛋",
    pinyin: "jīdàn",
    meaning: "卵",
    category: "名詞",
    examples: [
      {
        chinese: "我爱吃西红柿炒鸡蛋。",
        japanese: "私はトマトと卵の炒め物を食べるのが好きです。",
      },
      {
        chinese: "早上我吃了一个鸡蛋。",
        japanese: "朝、私は卵を一つ食べました。",
      },
      { chinese: "鸡蛋很有营养。", japanese: "卵は栄養があります。" },
    ],
  },
  {
    id: 2014,
    char: "姐姐",
    pinyin: "jiějie",
    meaning: "姉",
    category: "名詞",
    examples: [
      {
        chinese: "这是我姐姐的自行车。",
        japanese: "これは私の姉の自転車です。",
      },
      {
        chinese: "姐姐正在学习英语。",
        japanese: "姉は今英語を勉強しています。",
      },
      {
        chinese: "我和姐姐一起去买衣服。",
        japanese: "私と姉は一緒に服を買いに行きます。",
      },
    ],
  },
  {
    id: 2015,
    char: "咖啡",
    pinyin: "kāfēi",
    meaning: "コーヒー",
    category: "名詞",
    examples: [
      {
        chinese: "这种咖啡味道很好。",
        japanese: "このコーヒーの味はとても良いです。",
      },
      {
        chinese: "我想喝一杯热咖啡。",
        japanese: "温かいコーヒーを一杯飲みたいです。",
      },
      {
        chinese: "你喜欢红茶还是咖啡？",
        japanese: "あなたは紅茶とコーヒーのどちらが好きですか？",
      },
    ],
  },
  {
    id: 2016,
    char: "课",
    pinyin: "kè",
    meaning: "授業",
    category: "名詞",
    examples: [
      {
        chinese: "我们明天开始学习新课。",
        japanese: "私たちは明日から新しい課を学び始めます。",
      },
      { chinese: "今天的课很难。", japanese: "今日の授業は難しいです。" },
      {
        chinese: "下课后我们去吃饭吧。",
        japanese: "授業が終わったらご飯を食べに行きましょう。",
      },
    ],
  },
  {
    id: 2017,
    char: "路",
    pinyin: "lù",
    meaning: "道",
    category: "名詞",
    examples: [
      {
        chinese: "这条路不太好走。",
        japanese: "この道はあまり通りやすくありません。",
      },
      {
        chinese: "过马路要小心。",
        japanese: "道を渡るときは気をつけてください。",
      },
      {
        chinese: "我不认识路，你能告诉我吗？",
        japanese: "道が分からないので、教えてくれませんか？",
      },
    ],
  },
  {
    id: 2018,
    char: "妹妹",
    pinyin: "mèimei",
    meaning: "妹",
    category: "名詞",
    examples: [
      {
        chinese: "我妹妹刚上小学。",
        japanese: "私の妹はちょうど小学校に上がったばかりです。",
      },
      { chinese: "妹妹喜欢唱歌。", japanese: "妹は歌うのが好きです。" },
      {
        chinese: "我给妹妹买了一个玩具。",
        japanese: "私は妹におもちゃを買いました。",
      },
    ],
  },
  {
    id: 2019,
    char: "门",
    pinyin: "mén",
    meaning: "ドア、門",
    category: "名詞",
    examples: [
      {
        chinese: "这个公园有四个门。",
        japanese: "この公園には4つの門があります。",
      },
      { chinese: "请把门关上。", japanese: "ドアを閉めてください。" },
      {
        chinese: "出门前记得带钥匙。",
        japanese: "出かける前に鍵を持つことを覚えておいてください。",
      },
    ],
  },
  {
    id: 2020,
    char: "面条",
    pinyin: "miàntiáo",
    meaning: "麺類",
    category: "名詞",
    examples: [
      {
        chinese: "我想吃饺子，可是妈妈做了面条。",
        japanese: "私は餃子が食べたかったのですが、母は麺を作りました。",
      },
      { chinese: "这碗面条真好吃。", japanese: "この麺は本当に美味しいです。" },
      {
        chinese: "过生日要吃长寿面(条)。",
        japanese: "誕生日には長寿麺を食べます。",
      },
    ],
  },
  {
    id: 2021,
    char: "牛奶",
    pinyin: "niúnǎi",
    meaning: "牛乳",
    category: "名詞",
    examples: [
      {
        chinese: "冰箱里的牛奶喝完了。",
        japanese: "冷蔵庫の中の牛乳は全部飲み終わった。",
      },
      {
        chinese: "睡觉前喝杯牛奶对身体好。",
        japanese: "寝る前に牛乳を飲むと体に良いです。",
      },
      {
        chinese: "我不喜欢喝热牛奶。",
        japanese: "私は温かい牛乳を飲むのが好きではありません。",
      },
    ],
  },
  {
    id: 2022,
    char: "旁边",
    pinyin: "pángbiān",
    meaning: "隣、そば",
    category: "名詞",
    examples: [
      {
        chinese: "我旁边这位是李老师。",
        japanese: "私の隣のこの方は李先生です。",
      },
      {
        chinese: "坐在我旁边的人是谁？",
        japanese: "私の隣に座っている人は誰ですか？",
      },
      {
        chinese: "学校旁边有一个书店。",
        japanese: "学校の隣に本屋があります。",
      },
    ],
  },
  {
    id: 2023,
    char: "票",
    pinyin: "piào",
    meaning: "チケット",
    category: "名詞",
    examples: [
      {
        chinese: "我买了两张电影票。",
        japanese: "私は映画のチケットを2枚買いました。",
      },
      {
        chinese: "火车票已经卖完了。",
        japanese: "電車のチケットはもう売り切れました。",
      },
      { chinese: "请出示您的车票。", japanese: "乗車券をご提示ください。" },
    ],
  },
  {
    id: 2024,
    char: "铅笔",
    pinyin: "qiānbǐ",
    meaning: "鉛筆",
    category: "名詞",
    examples: [
      {
        chinese: "你能借我一支铅笔吗？",
        japanese: "鉛筆を1本貸してくれませんか。",
      },
      {
        chinese: "用铅笔写字可以擦掉。",
        japanese: "鉛筆で字を書くと消すことができます。",
      },
      {
        chinese: "我有三支彩色的铅笔。",
        japanese: "私は色鉛筆を3本持っています。",
      },
    ],
  },
  {
    id: 2025,
    char: "妻子",
    pinyin: "qīzi",
    meaning: "妻",
    category: "名詞",
    examples: [
      { chinese: "我和我妻子都是老师。", japanese: "私と妻はともに教師です。" },
      {
        chinese: "他非常爱他的妻子。",
        japanese: "彼は妻をとても愛しています。",
      },
      { chinese: "妻子正在做饭。", japanese: "妻は今料理を作っています。" },
    ],
  },
  {
    id: 2026,
    char: "去年",
    pinyin: "qùnián",
    meaning: "去年",
    category: "名詞",
    examples: [
      {
        chinese: "我去年来过一次北京。",
        japanese: "私は去年1度北京に来たことがあります。",
      },
      {
        chinese: "去年冬天下了大雪。",
        japanese: "去年の冬は雪がたくさん降りました。",
      },
      {
        chinese: "他去年这个时候还在上学。",
        japanese: "彼は去年の今頃はまだ学校に通っていました。",
      },
    ],
  },
  {
    id: 2027,
    char: "生日",
    pinyin: "shēngrì",
    meaning: "誕生日",
    category: "名詞",
    examples: [
      { chinese: "明天是我妈妈的生日。", japanese: "明日は母の誕生日です。" },
      { chinese: "祝你生日快乐！", japanese: "誕生日おめでとう！" },
      {
        chinese: "你的生日是几月几号？",
        japanese: "あなたの誕生日はいつですか？",
      },
    ],
  },
  {
    id: 2028,
    char: "身体",
    pinyin: "shēntǐ",
    meaning: "体、健康",
    category: "名詞",
    examples: [
      { chinese: "你最近身体好吗？", japanese: "最近お元気ですか。" },
      { chinese: "运动对身体有好处。", japanese: "運動は体に良いです。" },
      {
        chinese: "因为身体不舒服，他今天没来。",
        japanese: "体調が悪いので、彼は今日来ませんでした。",
      },
    ],
  },
  {
    id: 2029,
    char: "时间",
    pinyin: "shíjiān",
    meaning: "時間",
    category: "名詞",
    examples: [
      { chinese: "明天你有时间吗？", japanese: "明日お時間ございますか。" },
      {
        chinese: "时间不早了，我们回家吧。",
        japanese: "時間が遅いので、帰りましょう。",
      },
      {
        chinese: "请抓紧时间。",
        japanese: "時間を大切にしてください（急いでください）。",
      },
    ],
  },
  {
    id: 2030,
    char: "事情",
    pinyin: "shìqing",
    meaning: "こと、用事",
    category: "名詞",
    examples: [
      {
        chinese: "这件事情很麻烦。",
        japanese: "このことはとても煩わしいです。",
      },
      {
        chinese: "如果你有事儿，先走也没关系。",
        japanese: "用事があるなら、先に帰っても大丈夫です。",
      },
      {
        chinese: "所有的事情都解决了吗？",
        japanese: "すべての問題は解決しましたか？",
      },
    ],
  },
  {
    id: 2031,
    char: "手表",
    pinyin: "shǒubiǎo",
    meaning: "腕時計",
    category: "名詞",
    examples: [
      {
        chinese: "这块手表我戴了二十年了。",
        japanese: "私はこの腕時計を20年使っています。",
      },
      {
        chinese: "你的手表真漂亮。",
        japanese: "あなたの腕時計はとてもきれいです。",
      },
      {
        chinese: "我送给爸爸一块手表。",
        japanese: "私は父に腕時計をプレゼントしました。",
      },
    ],
  },
  {
    id: 2032,
    char: "手机",
    pinyin: "shǒujī",
    meaning: "携帯電話",
    category: "名詞",
    examples: [
      { chinese: "你的手机号码是多少？", japanese: "携帯番号はいくつですか。" },
      {
        chinese: "我看了一天的手机，眼睛很累。",
        japanese: "一日中携帯を見ていたので、目が疲れました。",
      },
      {
        chinese: "请把手机关掉。",
        japanese: "携帯電話の電源を切ってください。",
      },
    ],
  },
  {
    id: 2033,
    char: "题",
    pinyin: "tí",
    meaning: "問題",
    category: "名詞",
    examples: [
      {
        chinese: "我们一起做这个题吧。",
        japanese: "私たちは一緒にこの問題を解きましょう。",
      },
      {
        chinese: "这次考试的题很容易。",
        japanese: "今回の試験の問題は易しかったです。",
      },
      { chinese: "这道题我不会做。", japanese: "この問題は私には解けません。" },
    ],
  },
  {
    id: 2034,
    char: "外",
    pinyin: "wài",
    meaning: "外",
    category: "名詞",
    examples: [
      {
        chinese: "窗外有一棵大树。",
        japanese: "窓の外には大きな木があります。",
      },
      { chinese: "外面下雨了。", japanese: "外は雨が降っています。" },
      {
        chinese: "请在门外等一下。",
        japanese: "ドアの外で少し待っていてください。",
      },
    ],
  },
  {
    id: 2035,
    char: "晚上",
    pinyin: "wǎnshang",
    meaning: "夜",
    category: "名詞",
    examples: [
      {
        chinese: "晚上我们一起去看电影吧。",
        japanese: "夜、私たちは一緒に映画を見に行きましょう。",
      },
      {
        chinese: "晚上不要喝太多咖啡。",
        japanese: "夜にコーヒーを飲みすぎないでください。",
      },
      {
        chinese: "昨天晚上我睡得很晚。",
        japanese: "昨日の夜私は遅く寝ました。",
      },
    ],
  },
  {
    id: 2036,
    char: "问题",
    pinyin: "wèntí",
    meaning: "問題、質問",
    category: "名詞",
    examples: [
      {
        chinese: "大家还有什么问题？",
        japanese: "皆さん他に質問はありますか。",
      },
      {
        chinese: "这个问题很难回答。",
        japanese: "この質問に答えるのは難しいです。",
      },
      {
        chinese: "没问题，我能帮你。",
        japanese: "問題ありません、手伝いますよ。",
      },
    ],
  },
  {
    id: 2037,
    char: "小时",
    pinyin: "xiǎoshí",
    meaning: "時間（長さ）",
    category: "名詞",
    examples: [
      {
        chinese: "从北京到上海坐火车要几个小时？",
        japanese: "北京から上海まで電車で何時間かかりますか？",
      },
      {
        chinese: "我每天学习三个小时汉语。",
        japanese: "私は毎日3時間中国語を勉強します。",
      },
      {
        chinese: "还有一个小时就下班了。",
        japanese: "あと1時間で仕事が終わりです。",
      },
    ],
  },
  {
    id: 2038,
    char: "西瓜",
    pinyin: "xīguā",
    meaning: "スイカ",
    category: "名詞",
    examples: [
      {
        chinese: "这个西瓜很好吃。",
        japanese: "このスイカはとても美味しいです。",
      },
      {
        chinese: "夏天吃西瓜最舒服。",
        japanese: "夏にスイカを食べるのは最高です。",
      },
      { chinese: "你想吃西瓜吗？", japanese: "スイカを食べたいですか？" },
    ],
  },
  {
    id: 2039,
    char: "雪",
    pinyin: "xuě",
    meaning: "雪",
    category: "名詞",
    examples: [
      { chinese: "昨天晚上下雪了。", japanese: "昨日の夜は雪が降りました。" },
      {
        chinese: "孩子们喜欢玩雪。",
        japanese: "子供たちは雪で遊ぶのが好きです。",
      },
      { chinese: "这里的雪很厚。", japanese: "ここの雪はとても深いです。" },
    ],
  },
  {
    id: 2040,
    char: "羊肉",
    pinyin: "yángròu",
    meaning: "羊肉",
    category: "名詞",
    examples: [
      {
        chinese: "这个饭店做的羊肉特别好吃。",
        japanese: "このレストランのラム肉はとりわけ美味しい。",
      },
      { chinese: "我不吃羊肉。", japanese: "私は羊肉を食べません。" },
      {
        chinese: "冬天吃羊肉火锅很暖和。",
        japanese: "冬に羊肉の火鍋を食べると温まります。",
      },
    ],
  },
  {
    id: 2041,
    char: "眼睛",
    pinyin: "yǎnjing",
    meaning: "目",
    category: "名詞",
    examples: [
      {
        chinese: "要注意保护你的眼睛。",
        japanese: "あなたの目を守るように気をつけないといけません。",
      },
      {
        chinese: "她的眼睛很大，很漂亮。",
        japanese: "彼女の目は大きくてとてもきれいです。",
      },
      { chinese: "我的眼睛有点痛。", japanese: "私の目は少し痛いです。" },
    ],
  },
  {
    id: 2042,
    char: "颜色",
    pinyin: "yánsè",
    meaning: "色",
    category: "名詞",
    examples: [
      {
        chinese: "这件红颜色的衣服很好看。",
        japanese: "この赤色の服はとても綺麗です。",
      },
      { chinese: "你喜欢什么颜色？", japanese: "あなたは何色が好きですか？" },
      {
        chinese: "这种颜色不太适合你。",
        japanese: "この色はあなたにはあまり似合いません。",
      },
    ],
  },
  {
    id: 2043,
    char: "药",
    pinyin: "yào",
    meaning: "薬",
    category: "名詞",
    examples: [
      { chinese: "你吃过药了吗？", japanese: "薬を飲みましたか。" },
      {
        chinese: "这个药一天吃三次。",
        japanese: "この薬は一日に三回飲みます。",
      },
      { chinese: "良药苦口。", japanese: "良い薬は口に苦し。" },
    ],
  },
  {
    id: 2044,
    char: "意思",
    pinyin: "yìsi",
    meaning: "意味",
    category: "名詞",
    examples: [
      {
        chinese: "这句话是什么意思？",
        japanese: "この言葉はどういう意味ですか。",
      },
      {
        chinese: "这本小说很有意思。",
        japanese: "この小説はとても面白いです。",
      },
      { chinese: "不好意思，我迟到了。", japanese: "すみません、遅れました。" },
    ],
  },
  {
    id: 2045,
    char: "右边",
    pinyin: "yòubian",
    meaning: "右側",
    category: "名詞",
    examples: [
      { chinese: "你的右边有人吗？", japanese: "あなたの右側に人はいますか。" },
      { chinese: "请靠右边走。", japanese: "右側を歩いてください。" },
      {
        chinese: "右边的商店是卖衣服的。",
        japanese: "右側のお店は服を売っています。",
      },
    ],
  },
  {
    id: 2046,
    char: "鱼",
    pinyin: "yú",
    meaning: "魚",
    category: "名詞",
    examples: [
      {
        chinese: "这条河里有很多鱼。",
        japanese: "この川にはたくさんの魚がいます。",
      },
      {
        chinese: "妈妈做的鱼很好吃。",
        japanese: "母が作った魚料理はおいしいです。",
      },
      { chinese: "我想去买两条鱼。", japanese: "魚を二匹買いに行きたいです。" },
    ],
  },
  {
    id: 2047,
    char: "早上",
    pinyin: "zǎoshang",
    meaning: "朝",
    category: "名詞",
    examples: [
      {
        chinese: "我每天早上七点到公司。",
        japanese: "私は毎朝7時に会社に着きます。",
      },
      { chinese: "早上好！", japanese: "おはようございます！" },
      { chinese: "早上空气很新鲜。", japanese: "朝の空気はとても新鮮です。" },
    ],
  },
  {
    id: 2048,
    char: "丈夫",
    pinyin: "zhàngfu",
    meaning: "夫",
    category: "名詞",
    examples: [
      {
        chinese: "你想找个什么样的丈夫？",
        japanese: "あなたはどんな夫がいいですか？",
      },
      { chinese: "她的丈夫是医生。", japanese: "彼女の夫は医者です。" },
      {
        chinese: "他们夫妻俩很恩爱。",
        japanese: "彼ら夫婦はとても仲が良いです。",
      },
    ],
  },
  {
    id: 2049,
    char: "左边",
    pinyin: "zuǒbian",
    meaning: "左側",
    category: "名詞",
    examples: [
      {
        chinese: "他坐在了左边的椅子上。",
        japanese: "彼は左側の椅子に座りました。",
      },
      {
        chinese: "左边那个穿红衣服的是谁？",
        japanese: "左側のあの赤い服を着ている人は誰ですか？",
      },
      { chinese: "向左边看。", japanese: "左を見てください。" },
    ],
  },

  // ■ HSK 2級 指定語句 (動詞)
  {
    id: 2050,
    char: "帮助",
    pinyin: "bāngzhù",
    meaning: "助ける",
    category: "動詞",
    examples: [
      {
        chinese: "我们是好朋友，应该互相帮助。",
        japanese: "私たちは仲の良い友だちなので、お互い助け合うべきです。",
      },
      { chinese: "谢谢你的帮助。", japanese: "助けてくれてありがとう。" },
      {
        chinese: "你能帮助我学习汉语吗？",
        japanese: "中国語の勉強を手伝ってくれませんか？",
      },
    ],
  },
  {
    id: 2051,
    char: "唱歌",
    pinyin: "chàng gē",
    meaning: "歌を歌う",
    category: "動詞",
    examples: [
      {
        chinese: "我们一起去唱歌，好吗？",
        japanese: "一緒に歌を歌いに行きませんか。",
      },
      {
        chinese: "她唱歌唱得很好听。",
        japanese: "彼女は歌うのがとても上手です。",
      },
      {
        chinese: "他正在房间里唱歌。",
        japanese: "彼は部屋で歌を歌っています。",
      },
    ],
  },
  {
    id: 2052,
    char: "出",
    pinyin: "chū",
    meaning: "出る",
    category: "動詞",
    examples: [
      {
        chinese: "出了大门，就是商店。",
        japanese: "正門を出ると、お店があります。",
      },
      { chinese: "你什么时候出差？", japanese: "いつ出張しますか？" },
      { chinese: "太阳出来了。", japanese: "太陽が出ました。" },
    ],
  },
  {
    id: 2053,
    char: "穿",
    pinyin: "chuān",
    meaning: "着る",
    category: "動詞",
    examples: [
      {
        chinese: "她穿着一件红毛衣。",
        japanese: "彼女は赤いセーターを着ています。",
      },
      { chinese: "你也穿得太少了吧。", japanese: "君も薄着すぎるでしょ。" },
      {
        chinese: "这双鞋穿着很舒服。",
        japanese: "この靴は履き心地が良いです。",
      },
    ],
  },
  {
    id: 2054,
    char: "到",
    pinyin: "dào",
    meaning: "着く",
    category: "動詞",
    examples: [
      {
        chinese: "飞机已经到北京了。",
        japanese: "飛行機はすでに北京に到着しました。",
      },
      { chinese: "我到家了。", japanese: "家に着きました。" },
      {
        chinese: "从这儿到学校要十分钟。",
        japanese: "ここから学校まで10分かかります。",
      },
    ],
  },
  {
    id: 2055,
    char: "等",
    pinyin: "děng",
    meaning: "待つ",
    category: "動詞",
    examples: [
      {
        chinese: "别着急，我们等你。",
        japanese: "急がないでください、私たちはあなたを待っています。",
      },
      { chinese: "请等一下。", japanese: "少々お待ちください。" },
      {
        chinese: "我等了你一个小时。",
        japanese: "私はあなたを1時間待ちました。",
      },
    ],
  },
  {
    id: 2056,
    char: "懂",
    pinyin: "dǒng",
    meaning: "分かる",
    category: "動詞",
    examples: [
      {
        chinese: "你的意思我懂了。",
        japanese: "あなたの言いたいことは分かりました。",
      },
      {
        chinese: "这个问题你听懂了吗？",
        japanese: "この問題が理解できましたか？",
      },
      {
        chinese: "我看不懂这封信。",
        japanese: "私はこの手紙が読めません（意味が分かりません）。",
      },
    ],
  },
  {
    id: 2057,
    char: "告诉",
    pinyin: "gàosu",
    meaning: "伝える",
    category: "動詞",
    examples: [
      {
        chinese: "我想告诉你一件事。",
        japanese: "あなたに伝えたいことがあります。",
      },
      {
        chinese: "请告诉我你的电话号码。",
        japanese: "あなたの電話番号を教えてください。",
      },
      {
        chinese: "别告诉他我在哪儿。",
        japanese: "私がどこにいるか彼に教えないでください。",
      },
    ],
  },
  {
    id: 2058,
    char: "给",
    pinyin: "gěi",
    meaning: "あげる、〜に",
    category: "動詞",
    examples: [
      { chinese: "给我一杯水吧。", japanese: "水を1杯ください。" },
      {
        chinese: "这是我送给你的礼物。",
        japanese: "これは私があなたに贈るプレゼントです。",
      },
      { chinese: "请给我打个电话。", japanese: "私に電話をしてください。" },
    ],
  },
  {
    id: 2059,
    char: "介绍",
    pinyin: "jièshào",
    meaning: "紹介する",
    category: "動詞",
    examples: [
      { chinese: "请你介绍一下自己。", japanese: "自己紹介をお願いします。" },
      {
        chinese: "我给你介绍一个朋友。",
        japanese: "あなたに友達を一人紹介します。",
      },
      {
        chinese: "这本书介绍了中国的历史。",
        japanese: "この本は中国の歴史を紹介しています。",
      },
    ],
  },
  {
    id: 2060,
    char: "进",
    pinyin: "jìn",
    meaning: "入る",
    category: "動詞",
    examples: [
      {
        chinese: "请大家进屋来坐吧。",
        japanese: "どうぞ皆さん中に入って座ってください。",
      },
      { chinese: "请进！", japanese: "どうぞお入りください！" },
      {
        chinese: "我们进那个商店看看吧。",
        japanese: "あのお店に入って見てみましょう。",
      },
    ],
  },
  {
    id: 2061,
    char: "觉得",
    pinyin: "juéde",
    meaning: "思う",
    category: "動詞",
    examples: [
      {
        chinese: "我突然觉得身体不舒服。",
        japanese: "私は急に体調が悪くなりました。",
      },
      {
        chinese: "我觉得这部电影很有意思。",
        japanese: "私はこの映画はとても面白いと思います。",
      },
      { chinese: "你觉得怎么样？", japanese: "あなたはどう思いますか？" },
    ],
  },
  {
    id: 2062,
    char: "开始",
    pinyin: "kāishǐ",
    meaning: "始まる",
    category: "動詞",
    examples: [
      { chinese: "比赛什么时候开始？", japanese: "試合はいつ始まりますか。" },
      { chinese: "我们开始上课吧。", japanese: "授業を始めましょう。" },
      {
        chinese: "好的开始是成功的一半。",
        japanese: "良い始まりは成功の半分（はじめが肝心）。",
      },
    ],
  },
  {
    id: 2063,
    char: "考试",
    pinyin: "kǎoshì",
    meaning: "試験を受ける",
    category: "動詞",
    examples: [
      {
        chinese: "我们下个星期考试。",
        japanese: "私たちは来週試験を受けます。",
      },
      { chinese: "考试考得怎么样？", japanese: "試験はどうでしたか？" },
      {
        chinese: "为了考试，他每天都学习。",
        japanese: "試験のために、彼は毎日勉強しています。",
      },
    ],
  },
  {
    id: 2064,
    char: "离",
    pinyin: "lí",
    meaning: "離れる",
    category: "動詞",
    examples: [
      {
        chinese: "他离家已经两年多了。",
        japanese: "彼が家を出てから2年以上経ちます。",
      },
      {
        chinese: "我家离公司很近。",
        japanese: "私の家は会社からとても近いです。",
      },
      {
        chinese: "离春节还有一个星期。",
        japanese: "春節まであと1週間あります。",
      },
    ],
  },
  {
    id: 2065,
    char: "旅游",
    pinyin: "lǚyóu",
    meaning: "旅行する",
    category: "動詞",
    examples: [
      {
        chinese: "这次旅游我非常快乐。",
        japanese: "今回の旅行、私はとても楽しかったです。",
      },
      {
        chinese: "我想去中国旅游。",
        japanese: "私は中国へ旅行に行きたいです。",
      },
      {
        chinese: "旅游可以开阔眼界。",
        japanese: "旅行は視野を広げることができます。",
      },
    ],
  },
  {
    id: 2066,
    char: "卖",
    pinyin: "mài",
    meaning: "売る",
    category: "動詞",
    examples: [
      {
        chinese: "你这苹果怎么卖？",
        japanese: "あなたはこのリンゴをどのように売りますか(いくらですか)。",
      },
      { chinese: "这个商店卖什么？", japanese: "この店は何を売っていますか？" },
      {
        chinese: "我的自行车卖给朋友了。",
        japanese: "私の自転車は友達に売りました。",
      },
    ],
  },
  {
    id: 2067,
    char: "跑步",
    pinyin: "pǎobù",
    meaning: "ジョギングする",
    category: "動詞",
    examples: [
      {
        chinese: "今天早上我跑了半个小时的步。",
        japanese: "今朝、私は30分ジョギングしました。",
      },
      {
        chinese: "我喜欢在公园跑步。",
        japanese: "私は公園で走るのが好きです。",
      },
      { chinese: "跑步对身体好。", japanese: "ジョギングは体に良いです。" },
    ],
  },
  {
    id: 2068,
    char: "起床",
    pinyin: "qǐchuáng",
    meaning: "起きる",
    category: "動詞",
    examples: [
      {
        chinese: "你每天什么时候起床？",
        japanese: "あなたは毎日いつ起きますか。",
      },
      {
        chinese: "我今天早上六点就起床了。",
        japanese: "私は今朝6時には起きました。",
      },
      {
        chinese: "快起床，要迟到了。",
        japanese: "早く起きて、遅刻しちゃうよ。",
      },
    ],
  },
  {
    id: 2069,
    char: "让",
    pinyin: "ràng",
    meaning: "譲る、させる",
    category: "動詞",
    examples: [
      {
        chinese: "这个机会他让给别人了。",
        japanese: "このチャンスを彼はほかの人に譲りました。",
      },
      {
        chinese: "妈妈不让我玩游戏。",
        japanese: "母は私にゲームをさせてくれません。",
      },
      {
        chinese: "由于生病，让他休息几天。",
        japanese: "病気のため、彼を数日休ませてください。",
      },
    ],
  },
  {
    id: 2070,
    char: "上班",
    pinyin: "shàngbān",
    meaning: "出勤する",
    category: "動詞",
    examples: [
      {
        chinese: "我每天早晨八点上班。",
        japanese: "私は毎朝8時に出勤します。",
      },
      { chinese: "他已经上班去了。", japanese: "彼はもう仕事に行きました。" },
      {
        chinese: "你爸爸在哪儿上班？",
        japanese: "あなたのお父さんはどこで働いていますか？",
      },
    ],
  },
  {
    id: 2071,
    char: "生病",
    pinyin: "shēngbìng",
    meaning: "病気になる",
    category: "動詞",
    examples: [
      {
        chinese: "他经常运动，很少生病。",
        japanese: "彼はいつも運動するので、めったに病気をしません。",
      },
      {
        chinese: "听说你生病了，好点儿了吗？",
        japanese: "病気になったと聞きましたが、良くなりましたか？",
      },
      {
        chinese: "生病要多喝水。",
        japanese: "病気のときは水をたくさん飲まなければなりません。",
      },
    ],
  },
  {
    id: 2072,
    char: "说话",
    pinyin: "shuōhuà",
    meaning: "話をする",
    category: "動詞",
    examples: [
      { chinese: "请大家不要说话了。", japanese: "皆さんお静かに。" },
      {
        chinese: "别说话，听老师讲。",
        japanese: "話さないで、先生の話を聞きなさい。",
      },
      { chinese: "他说话很有意思。", japanese: "彼の話はとても面白いです。" },
    ],
  },
  {
    id: 2073,
    char: "送",
    pinyin: "sòng",
    meaning: "送る、届ける",
    category: "動詞",
    examples: [
      {
        chinese: "我一会儿给你送过去。",
        japanese: "しばらくしてからあなたに持っていきます。",
      },
      {
        chinese: "我去机场送朋友。",
        japanese: "空港へ友達を見送りに行きます。",
      },
      {
        chinese: "这是朋友送我的书。",
        japanese: "これは友達が私にくれた本です。",
      },
    ],
  },
  {
    id: 2074,
    char: "跳舞",
    pinyin: "tiàowǔ",
    meaning: "踊る",
    category: "動詞",
    examples: [
      {
        chinese: "她每天早上去公园里跳舞。",
        japanese: "彼女は毎朝公園に行って踊ります。",
      },
      { chinese: "你会跳舞吗？", japanese: "あなたは踊れますか？" },
      {
        chinese: "大家一起唱歌跳舞。",
        japanese: "みんなで一緒に歌って踊ります。",
      },
    ],
  },
  {
    id: 2075,
    char: "完",
    pinyin: "wán",
    meaning: "終わる",
    category: "動詞",
    examples: [
      {
        chinese: "你的工作什么时候完啊？",
        japanese: "あなたの仕事はいつ終わりますか。",
      },
      { chinese: "这本书我看完了。", japanese: "この本は読み終わりました。" },
      {
        chinese: "吃完饭我们去散步。",
        japanese: "ご飯を食べ終わったら散歩に行きましょう。",
      },
    ],
  },
  {
    id: 2076,
    char: "玩",
    pinyin: "wán",
    meaning: "遊ぶ",
    category: "動詞",
    examples: [
      {
        chinese: "孩子们在外面玩儿呢。",
        japanese: "子供たちは外で遊んでいます。",
      },
      { chinese: "欢迎你来我家玩。", japanese: "私の家に遊びに来てください。" },
      { chinese: "你在玩什么游戏？", japanese: "何のゲームで遊んでいるの？" },
    ],
  },
  {
    id: 2077,
    char: "问",
    pinyin: "wèn",
    meaning: "聞く、尋ねる",
    category: "動詞",
    examples: [
      {
        chinese: "这个问题你问老师吧。",
        japanese: "この問題は先生に聞いてみて。",
      },
      { chinese: "请问，现在几点了？", japanese: "すみません、今何時ですか？" },
      {
        chinese: "不管什么问题都可以问。",
        japanese: "どんな質問でも聞いて大丈夫です。",
      },
    ],
  },
  {
    id: 2078,
    char: "洗",
    pinyin: "xǐ",
    meaning: "洗う",
    category: "動詞",
    examples: [
      {
        chinese: "衣服洗得真干净。",
        japanese: "服は本当にきれいに洗ってあります。",
      },
      {
        chinese: "吃饭前要洗手。",
        japanese: "食事の前に手を洗わなければなりません。",
      },
      { chinese: "我在洗澡。", japanese: "私は入浴しています。" },
    ],
  },
  {
    id: 2079,
    char: "笑",
    pinyin: "xiào",
    meaning: "笑う",
    category: "動詞",
    examples: [
      {
        chinese: "他笑起来很好看。",
        japanese: "彼は笑うととてもかっこいいです。",
      },
      { chinese: "别笑我。", japanese: "私を笑わないで。" },
      {
        chinese: "大家听了都笑了。",
        japanese: "みんなそれを聞いて笑いました。",
      },
    ],
  },
  {
    id: 2080,
    char: "姓",
    pinyin: "xìng",
    meaning: "苗字、〜という",
    category: "動詞",
    examples: [
      {
        chinese: "在中国，姓“李”的人最多。",
        japanese: "中国では、李という姓の人が最も多い。",
      },
      {
        chinese: "您贵姓？",
        japanese: "お名前（名字）は何とおっしゃいますか？",
      },
      {
        chinese: "我姓王，叫王明。",
        japanese: "私の名字は王で、王明と言います。",
      },
    ],
  },
  {
    id: 2081,
    char: "休息",
    pinyin: "xiūxi",
    meaning: "休む",
    category: "動詞",
    examples: [
      {
        chinese: "老师，我们休息一下吧。",
        japanese: "先生、私たちは少し休みましょう。",
      },
      {
        chinese: "你太累了，需要休息。",
        japanese: "あなたは疲れすぎているので、休息が必要です。",
      },
      {
        chinese: "在这个房间休息很舒服。",
        japanese: "この部屋で休むのはとても快適です。",
      },
    ],
  },
  {
    id: 2082,
    char: "希望",
    pinyin: "xīwàng",
    meaning: "望む、〜したい",
    category: "動詞",
    examples: [
      {
        chinese: "真希望今年暑假能去旅游。",
        japanese: "今年の夏休みは旅行にとても行きたいです。",
      },
      {
        chinese: "我希望能考上大学。",
        japanese: "大学に合格できることを望んでいます。",
      },
      {
        chinese: "希望能再次见到你。",
        japanese: "またあなたに会えることを望んでいます。",
      },
    ],
  },
  {
    id: 2083,
    char: "游泳",
    pinyin: "yóuyǒng",
    meaning: "泳ぐ",
    category: "動詞",
    examples: [
      {
        chinese: "我弟弟游泳游得非常快。",
        japanese: "私の弟は泳ぐのがとても速い。",
      },
      {
        chinese: "夏天我们经常去游泳。",
        japanese: "夏に私たちはよく泳ぎに行きます。",
      },
      { chinese: "你会游泳吗？", japanese: "あなたは泳げますか？" },
    ],
  },
  {
    id: 2084,
    char: "运动",
    pinyin: "yùndòng",
    meaning: "運動する",
    category: "動詞",
    examples: [
      {
        chinese: "很多人喜欢在早上运动。",
        japanese: "多くの人は早朝に運動するのが好きです。",
      },
      {
        chinese: "经常运动对身体好。",
        japanese: "よく運動するのは体に良いです。",
      },
      {
        chinese: "你最喜欢什么运动？",
        japanese: "あなたは何のスポーツが一番好きですか？",
      },
    ],
  },
  {
    id: 2085,
    char: "找",
    pinyin: "zhǎo",
    meaning: "探す",
    category: "動詞",
    examples: [
      {
        chinese: "请问，您找谁？",
        japanese: "すみません、どなたにご用ですか。",
      },
      { chinese: "我在找我的手机。", japanese: "私は携帯電話を探しています。" },
      { chinese: "找到了吗？", japanese: "見つかりましたか？" },
    ],
  },
  {
    id: 2086,
    char: "知道",
    pinyin: "zhīdao",
    meaning: "知っている",
    category: "動詞",
    examples: [
      {
        chinese: "我知道他昨天为什么没来。",
        japanese: "私は彼が昨日なぜ来なかったかを知っています。",
      },
      {
        chinese: "你知道这个字怎么读吗？",
        japanese: "あなたはこの字をどう読むか知っていますか？",
      },
      {
        chinese: "我不知道他在哪儿。",
        japanese: "私は彼がどこにいるか知りません。",
      },
    ],
  },
  {
    id: 2087,
    char: "准备",
    pinyin: "zhǔnbèi",
    meaning: "準備する",
    category: "動詞",
    examples: [
      {
        chinese: "他正在准备下周的考试。",
        japanese: "彼は今来週のテストの準備をしています。",
      },
      { chinese: "准备好了吗？", japanese: "準備はできましたか？" },
      {
        chinese: "我们准备去北京旅游。",
        japanese:
          "私たちは北京旅行の準備をしています（または計画しています）。",
      },
    ],
  },
  {
    id: 2088,
    char: "走",
    pinyin: "zǒu",
    meaning: "歩く、離れる",
    category: "動詞",
    examples: [
      {
        chinese: "我走累了，咱们休息一下吧。",
        japanese: "歩き疲れました。私たちは少し休憩しましょう。",
      },
      { chinese: "请慢慢走。", japanese: "ゆっくり歩いてください。" },
      { chinese: "慢走！", japanese: "気をつけて帰ってね！" },
    ],
  },

  // ■ HSK 2級 指定語句 (形容詞・その他)
  {
    id: 2089,
    char: "白",
    pinyin: "bái",
    meaning: "白い",
    category: "形容詞",
    examples: [
      {
        chinese: "她穿了一件白衬衫。",
        japanese: "彼女は白いブラウスを着ています。",
      },
      { chinese: "这只小猫是白色的。", japanese: "この子猫は白いです。" },
      { chinese: "天空中有白云。", japanese: "空に白い雲があります。" },
    ],
  },
  {
    id: 2090,
    char: "长",
    pinyin: "cháng",
    meaning: "長い",
    category: "形容詞",
    examples: [
      {
        chinese: "这件衣服比那件长很多。",
        japanese: "この服はあの服よりずっと長いです。",
      },
      { chinese: "这条路很长。", japanese: "この道はとても長いです。" },
      { chinese: "她的头发很长。", japanese: "彼女の髪はとても長いです。" },
    ],
  },
  {
    id: 2091,
    char: "错",
    pinyin: "cuò",
    meaning: "間違う",
    category: "形容詞",
    examples: [
      {
        chinese: "学汉语要敢说，说错了也没关系。",
        japanese:
          "中国語を学ぶには勇気をもって話さなければなりません。間違っても大丈夫です。",
      },
      {
        chinese: "对不起，我打错了。",
        japanese: "すみません、間違い電話でした。",
      },
      {
        chinese: "你的答案是错的。",
        japanese: "あなたの答えは間違っています。",
      },
    ],
  },
  {
    id: 2092,
    char: "高",
    pinyin: "gāo",
    meaning: "高い",
    category: "形容詞",
    examples: [
      { chinese: "他比我高很多。", japanese: "彼は私よりずっと背が高いです。" },
      { chinese: "这座山很高。", japanese: "この山はとても高いです。" },
      {
        chinese: "我很高兴认识你。",
        japanese: "あなたと知り合えてとても嬉しいです。",
      },
    ],
  },
  {
    id: 2093,
    char: "贵",
    pinyin: "guì",
    meaning: "高い(値段)",
    category: "形容詞",
    examples: [
      {
        chinese: "这里的东西都很贵。",
        japanese: "ここの物はすべてとても高いです。",
      },
      { chinese: "这也太贵了！", japanese: "これは高すぎます！" },
      { chinese: "有没有不贵的衣服？", japanese: "高くない服はありますか？" },
    ],
  },
  {
    id: 2094,
    char: "好吃",
    pinyin: "hǎochī",
    meaning: "美味しい",
    category: "形容詞",
    examples: [
      {
        chinese: "你做的菜太好吃了。",
        japanese: "あなたの作った料理はとても美味しいです。",
      },
      {
        chinese: "这个苹果真好吃。",
        japanese: "このリンゴは本当に美味しいです。",
      },
      {
        chinese: "北京烤鸭很好吃。",
        japanese: "北京ダックはとても美味しいです。",
      },
    ],
  },
  {
    id: 2095,
    char: "黑",
    pinyin: "hēi",
    meaning: "黒い",
    category: "形容詞",
    examples: [
      {
        chinese: "他穿着一件黑衬衫。",
        japanese: "彼は黒いワイシャツを着ています。",
      },
      {
        chinese: "天黑了，回家吧。",
        japanese: "空が暗くなったので、家に帰りましょう。",
      },
      {
        chinese: "我不喜欢黑颜色。",
        japanese: "私は黒色が好きではありません。",
      },
    ],
  },
  {
    id: 2096,
    char: "红",
    pinyin: "hóng",
    meaning: "赤い",
    category: "形容詞",
    examples: [
      {
        chinese: "我爱吃这种红苹果。",
        japanese: "私はこの赤いリンゴを食べるのが好きです。",
      },
      { chinese: "她的脸红了。", japanese: "彼女の顔が赤くなりました。" },
      {
        chinese: "我也有一件红衣服。",
        japanese: "私も赤い服を1着持っています。",
      },
    ],
  },
  {
    id: 2097,
    char: "近",
    pinyin: "jìn",
    meaning: "近い",
    category: "形容詞",
    examples: [
      {
        chinese: "我家离学校很近。",
        japanese: "我が家は学校からとても近いです。",
      },
      {
        chinese: "这是最近发生的事。",
        japanese: "これは最近起こったことです。",
      },
      { chinese: "邮局离这儿近吗？", japanese: "郵便局はここから近いですか？" },
    ],
  },
  {
    id: 2098,
    char: "快",
    pinyin: "kuài",
    meaning: "速い",
    category: "形容詞",
    examples: [
      {
        chinese: "他说话太快了，我没听懂。",
        japanese: "彼は話すのがとても速いので、聞き取れません。",
      },
      { chinese: "火车开得真快。", japanese: "電車が走るのが本当に速いです。" },
      { chinese: "快点儿！", japanese: "急いで！" },
    ],
  },
  {
    id: 2099,
    char: "快乐",
    pinyin: "kuàilè",
    meaning: "楽しい",
    category: "形容詞",
    examples: [
      {
        chinese: "他们在中国生活得很快乐。",
        japanese: "彼らは中国で楽しく生活しています。",
      },
      { chinese: "祝你新年快乐！", japanese: "新年おめでとう！" },
      {
        chinese: "快乐的时光总是过得很快。",
        japanese: "楽しい時間はいつも過ぎるのが速いです。",
      },
    ],
  },
  {
    id: 2100,
    char: "累",
    pinyin: "lèi",
    meaning: "疲れる",
    category: "形容詞",
    examples: [
      {
        chinese: "这几天工作太累了。",
        japanese: "この何日間、仕事がとても大変です。",
      },
      {
        chinese: "我不累，可以继续走。",
        japanese: "私は疲れていないので、歩き続けられます。",
      },
      { chinese: "累了就休息一下吧。", japanese: "疲れたら少し休みましょう。" },
    ],
  },
  {
    id: 2101,
    char: "慢",
    pinyin: "màn",
    meaning: "遅い、ゆっくり",
    category: "形容詞",
    examples: [
      {
        chinese: "请你说慢一点儿。",
        japanese: "もう少しゆっくり話してくれませんか。",
      },
      { chinese: "他走得很慢。", japanese: "彼は歩くのがとても遅いです。" },
      {
        chinese: "慢走，欢迎下次再来。",
        japanese: "お気をつけて、またのお越しをお待ちしています。",
      },
    ],
  },
  {
    id: 2102,
    char: "忙",
    pinyin: "máng",
    meaning: "忙しい",
    category: "形容詞",
    examples: [
      { chinese: "最近我很忙。", japanese: "最近私はとても忙しいです。" },
      {
        chinese: "你在忙什么呢？",
        japanese: "あなたは何に忙しくしているのですか？",
      },
      { chinese: "爸爸工作太忙了。", japanese: "父は仕事が忙しすぎます。" },
    ],
  },
  {
    id: 2103,
    char: "便宜",
    pinyin: "piányi",
    meaning: "安い",
    category: "形容詞",
    examples: [
      { chinese: "能不能便宜点儿？", japanese: "もう少し安くできませんか。" },
      { chinese: "这件衣服很便宜。", japanese: "この服はとても安いです。" },
      { chinese: "便宜没好货。", japanese: "安物買いの銭失い。" },
    ],
  },
  {
    id: 2104,
    char: "晴",
    pinyin: "qíng",
    meaning: "晴れ",
    category: "形容詞",
    examples: [
      { chinese: "今天晴转阴。", japanese: "今日は晴れのち曇りです。" },
      { chinese: "明天是晴天。", japanese: "明日は晴れです。" },
      {
        chinese: "晴天的时候我喜欢去公园。",
        japanese: "晴れの日は公園に行くのが好きです。",
      },
    ],
  },
  {
    id: 2105,
    char: "新",
    pinyin: "xīn",
    meaning: "新しい",
    category: "形容詞",
    examples: [
      {
        chinese: "这是我的新手表，你看怎么样？",
        japanese: "これは私の新しい腕時計です。どう思いますか？",
      },
      {
        chinese: "我也想买新手机。",
        japanese: "私も新しい携帯電話を買いたいです。",
      },
      { chinese: "新年好！", japanese: "新年おめでとう！" },
    ],
  },
  {
    id: 2106,
    char: "阴",
    pinyin: "yīn",
    meaning: "曇り",
    category: "形容詞",
    examples: [
      {
        chinese: "今天阴天，可能会下雨。",
        japanese: "今日は曇りですので、恐らく雨が降るでしょう。",
      },
      {
        chinese: "即使是阴天，紫外线也很强。",
        japanese: "曇りでも、紫外線は強いです。",
      },
      { chinese: "天阴下来了。", japanese: "空が曇ってきました。" },
    ],
  },
  {
    id: 2107,
    char: "远",
    pinyin: "yuǎn",
    meaning: "遠い",
    category: "形容詞",
    examples: [
      {
        chinese: "我家离学校很远。",
        japanese: "我が家は学校からとても遠いです。",
      },
      {
        chinese: "我不喜欢去远的地方。",
        japanese: "私は遠い所へ行くのが好きではありません。",
      },
      { chinese: "离车站不远。", japanese: "駅からは遠くありません。" },
    ],
  },
  {
    id: 2108,
    char: "别",
    pinyin: "bié",
    meaning: "〜するな",
    category: "副詞",
    examples: [
      {
        chinese: "别着急，会由办法的。",
        japanese: "焦らないでください、方法はありますので。",
      },
      {
        chinese: "别忘了带护照。",
        japanese: "パスポートを持つのを忘れないでください。",
      },
      {
        chinese: "以后别这样做了。",
        japanese: "今後はこのようにしないでください。",
      },
    ],
  },
  {
    id: 2109,
    char: "非常",
    pinyin: "fēicháng",
    meaning: "とても、非常に",
    category: "副詞",
    examples: [
      {
        chinese: "这个房间非常干净。",
        japanese: "この部屋はとてもきれいです。",
      },
      {
        chinese: "我非常喜欢吃中国菜。",
        japanese: "私は中国料理を食べるのがとても好きです。",
      },
      { chinese: "今天天气非常好。", japanese: "今日の天気はとても良いです。" },
    ],
  },
  {
    id: 2110,
    char: "还",
    pinyin: "hái",
    meaning: "さらに、まだ",
    category: "副詞",
    examples: [
      {
        chinese: "他会唱歌，还会跳舞。",
        japanese: "彼は歌が上手で、さらに踊りも上手です。",
      },
      { chinese: "还没到时间。", japanese: "まだ時間になっていません。" },
      { chinese: "我还有一个问题。", japanese: "私はあと一つ質問があります。" },
    ],
  },
  {
    id: 2111,
    char: "就",
    pinyin: "jiù",
    meaning: "すぐに",
    category: "副詞",
    examples: [
      { chinese: "我马上就来。", japanese: "すぐに参ります。" },
      { chinese: "就这一次。", japanese: "今回だけです。" },
      { chinese: "我就要回家了。", japanese: "私はもうすぐ家に帰ります。" },
    ],
  },
  {
    id: 2112,
    char: "可能",
    pinyin: "kěnéng",
    meaning: "恐らく",
    category: "副詞",
    examples: [
      {
        chinese: "天阴了，可能要下雨。",
        japanese: "曇りになったので、恐らく雨が降るでしょう。",
      },
      {
        chinese: "我也可能去，也可能不去。",
        japanese: "私も行くかもしれないし、行かないかもしれません。",
      },
      { chinese: "这不可能！", japanese: "そんなはずはない！" },
    ],
  },
  {
    id: 2113,
    char: "哪儿",
    pinyin: "nǎr",
    meaning: "どこ",
    category: "代名詞",
    examples: [
      { chinese: "他去哪儿了？", japanese: "彼はどこに行きましたか。" },
      { chinese: "你在哪儿工作？", japanese: "あなたはどこで働いていますか？" },
      { chinese: "哪儿都有好人。", japanese: "どこにでも良い人はいます。" },
    ],
  },
  {
    id: 2114,
    char: "谁",
    pinyin: "shéi",
    meaning: "誰",
    category: "代名詞",
    examples: [
      {
        chinese: "请问，您找谁？",
        japanese: "すみません、どなたをお探しですか。",
      },
      { chinese: "谁在那儿？", japanese: "そこにいるのは誰ですか？" },
      { chinese: "这是谁的书？", japanese: "これは誰の本ですか？" },
    ],
  },
  {
    id: 2115,
    char: "什么",
    pinyin: "shénme",
    meaning: "何",
    category: "代名詞",
    examples: [
      {
        chinese: "你最喜欢什么运动？",
        japanese: "あなたは何のスポーツが一番好きですか。",
      },
      { chinese: "这是什么？", japanese: "これは何ですか？" },
      { chinese: "你想吃什么？", japanese: "あなたは何を食べたいですか？" },
    ],
  },
  {
    id: 2116,
    char: "怎么",
    pinyin: "zěnme",
    meaning: "どう、どのように",
    category: "代名詞",
    examples: [
      {
        chinese: "他怎么一句话也不说呀？",
        japanese: "彼はどうして一言も話さないのでしょうか？",
      },
      {
        chinese: "去天安门怎么走？",
        japanese: "天安門へはどうやって行きますか？",
      },
      { chinese: "这个汉字怎么读？", japanese: "この漢字はどう読みますか？" },
    ],
  },
  {
    id: 2117,
    char: "怎么样",
    pinyin: "zěnmeyàng",
    meaning: "どう、どのような",
    category: "代名詞",
    examples: [
      {
        chinese: "你最近身体怎么样啊？",
        japanese: "最近お体の調子はどうですか。",
      },
      { chinese: "这件衣服怎么样？", japanese: "この服はどうですか？" },
      {
        chinese: "我们去看电影，怎么样？",
        japanese: "映画を見に行くのはどうですか？",
      },
    ],
  },
  {
    id: 2118,
    char: "那",
    pinyin: "nà",
    meaning: "あれ、それ",
    category: "代名詞",
    examples: [
      { chinese: "那是我哥哥。", japanese: "あれは私の兄です。" },
      { chinese: "那天我没去。", japanese: "あの日私は行きませんでした。" },
      { chinese: "那是谁的包？", japanese: "あれは誰の鞄ですか？" },
    ],
  },
  {
    id: 2119,
    char: "您",
    pinyin: "nín",
    meaning: "あなた（敬称）",
    category: "代名詞",
    examples: [
      {
        chinese: "您今年多大年纪？",
        japanese: "あなたは今年おいくつになられましたか。",
      },
      {
        chinese: "您好，请这边坐。",
        japanese: "こんにちは、こちらへお座りください。",
      },
      {
        chinese: "谢谢您的帮助。",
        japanese: "助けていただきありがとうございます。",
      },
    ],
  },
  {
    id: 2120,
    char: "它",
    pinyin: "tā",
    meaning: "それ（動物・物）",
    category: "代名詞",
    examples: [
      {
        chinese: "我家有只小狗，它很可爱。",
        japanese: "我が家には子犬がいて、それはとても可愛いです。",
      },
      {
        chinese: "我知道它在那儿。",
        japanese: "私はそれがそこにあることを知っています。",
      },
      { chinese: "它是我的猫。", japanese: "それは私の猫です。" },
    ],
  },
  {
    id: 2121,
    char: "大家",
    pinyin: "dàjiā",
    meaning: "みなさん",
    category: "代名詞",
    examples: [
      {
        chinese: "见到你，大家都很高兴。",
        japanese: "あなたに会うと、みんなとても喜びます。",
      },
      { chinese: "大家好！", japanese: "みなさん、こんにちは！" },
      { chinese: "请大家安静。", japanese: "みなさん静かにしてください。" },
    ],
  },
  {
    id: 2122,
    char: "每",
    pinyin: "měi",
    meaning: "それぞれの",
    category: "代名詞",
    examples: [
      {
        chinese: "每个人都有自己的爱好。",
        japanese: "人はそれぞれが自分の趣味を持っている。",
      },
      { chinese: "我每天都喝牛奶。", japanese: "私は毎日牛乳を飲みます。" },
      {
        chinese: "每次去都要排队。",
        japanese: "行くたびに並ばなければなりません。",
      },
    ],
  },
  {
    id: 2123,
    char: "为什么",
    pinyin: "wèishénme",
    meaning: "なぜ",
    category: "代名詞",
    examples: [
      {
        chinese: "你为什么学习汉语？",
        japanese: "あなたはなぜ中国語を勉強するのですか。",
      },
      { chinese: "你为什么不吃饭？", japanese: "なぜご飯を食べないのですか？" },
      {
        chinese: "不知道为什么，他今天没来。",
        japanese: "なぜか分かりませんが、彼は今日来ませんでした。",
      },
    ],
  },
  {
    id: 2124,
    char: "零",
    pinyin: "líng",
    meaning: "0",
    category: "数詞",
    examples: [
      { chinese: "我住三零五房间。", japanese: "私は305号室に住んでいます。" },
      {
        chinese: "现在气温是零下五度。",
        japanese: "現在の気温は氷点下5度です。",
      },
      { chinese: "请从零开始。", japanese: "ゼロから始めてください。" },
    ],
  },
  {
    id: 2125,
    char: "百",
    pinyin: "bǎi",
    meaning: "100",
    category: "数詞",
    examples: [
      { chinese: "这本书一百块钱。", japanese: "この本は100元です。" },
      {
        chinese: "我们学校有五百个学生。",
        japanese: "私たちの学校には500人の学生がいます。",
      },
      { chinese: "百闻不如一见。", japanese: "百聞は一見にしかず。" },
    ],
  },
  {
    id: 2126,
    char: "千",
    pinyin: "qiān",
    meaning: "1000",
    category: "数詞",
    examples: [
      {
        chinese: "我认识两千多个汉字了。",
        japanese: "私は2000字の漢字を知っています。",
      },
      {
        chinese: "一千米等于一公里。",
        japanese: "一千メートルは一キロメートルに等しい。",
      },
      { chinese: "这本书有三千页。", japanese: "この本は3000ページあります。" },
    ],
  },
  {
    id: 2127,
    char: "第一",
    pinyin: "dì yī",
    meaning: "一番",
    category: "数詞",
    examples: [
      {
        chinese: "他每次游泳比赛都是第一。",
        japanese: "彼は毎回水泳大会で一番です。",
      },
      {
        chinese: "这是我第一次来中国。",
        japanese: "中国へ来るのはこれが初めてです。",
      },
      { chinese: "安全第一。", japanese: "安全第一。" },
    ],
  },
  {
    id: 2128,
    char: "两",
    pinyin: "liǎng",
    meaning: "2",
    category: "数詞",
    examples: [
      { chinese: "我买了两本书。", japanese: "私は本を2冊買いました。" },
      { chinese: "我们两个是好朋友。", japanese: "私たち二人は良い友達です。" },
      { chinese: "两点钟见。", japanese: "2時に会いましょう。" },
    ],
  },
  {
    id: 2129,
    char: "次",
    pinyin: "cì",
    meaning: "回",
    category: "量詞",
    examples: [
      {
        chinese: "我去过两次美国。",
        japanese: "私はアメリカに2度行ったことがあります。",
      },
      {
        chinese: "再一次感谢大家。",
        japanese: "もう一度みなさんに感謝します。",
      },
      { chinese: "这是最后一次。", japanese: "これが最後の一回です。" },
    ],
  },

  // ■ HSK 2級 頻出語句 (抜粋)
  {
    id: 2130,
    char: "爸",
    pinyin: "bà",
    meaning: "お父さん",
    category: "名詞",
    examples: [
      { chinese: "这是我爸的汽车。", japanese: "これは私の父の自動車です。" },
      { chinese: "爸，我回来了。", japanese: "お父さん、ただいま。" },
      { chinese: "我爸喜欢看报纸。", japanese: "父は新聞を読むのが好きです。" },
    ],
  },
  {
    id: 2131,
    char: "部分",
    pinyin: "bùfen",
    meaning: "部分",
    category: "名詞",
    examples: [
      {
        chinese: "我还有一部分工作没做完。",
        japanese: "私はまだ仕事の一部が終わっていません。",
      },
      { chinese: "这部分内容很难。", japanese: "この部分の内容は難しいです。" },
      { chinese: "大部分人都同意。", japanese: "大部分の人が同意しています。" },
    ],
  },
  {
    id: 2132,
    char: "车",
    pinyin: "chē",
    meaning: "車",
    category: "名詞",
    examples: [
      { chinese: "我的车停在那儿了。", japanese: "私の車はそこに停めました。" },
      { chinese: "你会开车吗？", japanese: "あなたは車を運転できますか？" },
      { chinese: "路上车很多。", japanese: "道は車が多いです。" },
    ],
  },
  {
    id: 2133,
    char: "初中",
    pinyin: "chūzhōng",
    meaning: "中学校",
    category: "名詞",
    examples: [
      {
        chinese: "我的儿子今年就要上初中了。",
        japanese: "私の息子は今年もうすぐ中学校に通います。",
      },
      {
        chinese: "初中生活很有趣。",
        japanese: "中学校生活はとても面白いです。",
      },
      {
        chinese: "他是我的初中同学。",
        japanese: "彼は私の中学校の同級生です。",
      },
    ],
  },
  {
    id: 2134,
    char: "大学",
    pinyin: "dàxué",
    meaning: "大学",
    category: "名詞",
    examples: [
      {
        chinese: "他刚大学毕业，在找工作。",
        japanese: "彼は大学を卒業したばかりで、仕事を探しています。",
      },
      {
        chinese: "你想考哪个大学？",
        japanese: "あなたはどの大学を受けたいですか？",
      },
      { chinese: "大学很大。", japanese: "大学はとても広いです。" },
    ],
  },
  {
    id: 2135,
    char: "电影院",
    pinyin: "diànyǐngyuàn",
    meaning: "映画館",
    category: "名詞",
    examples: [
      {
        chinese: "我家附近有一家电影院。",
        japanese: "うちの近くに映画館が一つあります。",
      },
      {
        chinese: "我们在电影院门口见面。",
        japanese: "映画館の入り口で会いましょう。",
      },
      {
        chinese: "这家电影院很大。",
        japanese: "この映画館はとても大きいです。",
      },
    ],
  },
  {
    id: 2136,
    char: "饭馆儿",
    pinyin: "fànguǎnr",
    meaning: "レストラン",
    category: "名詞",
    examples: [
      {
        chinese: "妈妈说今天晚上去饭馆儿吃饭。",
        japanese: "母は今夜、料理店に行ってご飯を食べると言いました。",
      },
      {
        chinese: "这家饭馆儿的菜很好吃。",
        japanese: "このレストランの料理はおいしいです。",
      },
      {
        chinese: "我们找个饭馆儿坐坐吧。",
        japanese: "どこかレストランに入って座りましょう。",
      },
    ],
  },
  {
    id: 2137,
    char: "高中",
    pinyin: "gāozhōng",
    meaning: "高校",
    category: "名詞",
    examples: [
      {
        chinese: "他们都是我高中时候的朋友。",
        japanese: "彼らはみんな我的高校時代の友達です。",
      },
      {
        chinese: "高中三年很辛苦。",
        japanese: "高校の三年間はとても大変です。",
      },
      {
        chinese: "你在哪个高中上学？",
        japanese: "あなたはどこの高校に通っていますか？",
      },
    ],
  },
  {
    id: 2138,
    char: "汉语书",
    pinyin: "Hànyǔ shū",
    meaning: "中国語の本",
    category: "名詞",
    examples: [
      {
        chinese: "我们的汉语书很有意思。",
        japanese: "私たちの中国語の本はとても面白いです。",
      },
      {
        chinese: "借我看看你的汉语书。",
        japanese: "あなたの中国語の本を貸して見せてください。",
      },
      {
        chinese: "这本汉语书多少钱？",
        japanese: "この中国語の本はいくらですか？",
      },
    ],
  },
  {
    id: 2139,
    char: "汉字",
    pinyin: "Hànzì",
    meaning: "漢字",
    category: "名詞",
    examples: [
      {
        chinese: "今天我学会了十个汉字。",
        japanese: "今日私は10個の漢字を覚えました。",
      },
      { chinese: "这个汉字怎么写？", japanese: "この漢字はどう書きますか？" },
      { chinese: "我不认识这个汉字。", japanese: "私はこの漢字を知りません。" },
    ],
  },
  {
    id: 2140,
    char: "后天",
    pinyin: "hòutiān",
    meaning: "あさって",
    category: "名詞",
    examples: [
      {
        chinese: "后天就要开学了。",
        japanese: "あさってには学校が始まります。",
      },
      {
        chinese: "你可以后天来吗？",
        japanese: "あなたはあさって来られますか？",
      },
      { chinese: "后天是星期几？", japanese: "あさっては何曜日ですか？" },
    ],
  },
  {
    id: 2141,
    char: "火车",
    pinyin: "huǒchē",
    meaning: "電車",
    category: "名詞",
    examples: [
      {
        chinese: "下了火车，就能看见汽车站。",
        japanese: "電車を降りると、すぐにバス停が見えます。",
      },
      { chinese: "火车票买到了吗？", japanese: "電車の切符は買えましたか？" },
      {
        chinese: "我喜欢坐火车旅游。",
        japanese: "私は電車で旅行するのが好きです。",
      },
    ],
  },
  {
    id: 2142,
    char: "今年",
    pinyin: "jīnnián",
    meaning: "今年",
    category: "名詞",
    examples: [
      {
        chinese: "王老师今年四十六岁了。",
        japanese: "王先生は今年で46歳になります。",
      },
      { chinese: "今年是个好年。", japanese: "今年は良い年です。" },
      { chinese: "你今年多大？", japanese: "あなたは今年いくつですか？" },
    ],
  },
  {
    id: 2143,
    char: "块儿",
    pinyin: "kuàir",
    meaning: "かたまり",
    category: "名詞",
    examples: [
      {
        chinese: "我刚吃了一块儿蛋糕。",
        japanese: "私はケーキを1切れ食べたばかりです。",
      },
      {
        chinese: "切一块儿西瓜。",
        japanese: "スイカをひとかたまり切ってください。",
      },
      {
        chinese: "把这块儿肉洗一下。",
        japanese: "この肉のかたまりを洗ってください。",
      },
    ],
  },
  {
    id: 2144,
    char: "里面",
    pinyin: "lǐmiàn",
    meaning: "中",
    category: "名詞",
    examples: [
      {
        chinese: "房间里面有两个人在说话。",
        japanese: "部屋の中には話をしている人が2人います。",
      },
      {
        chinese: "我在里面，你进来吧。",
        japanese: "私は中にいます、入ってきてください。",
      },
      { chinese: "包里面有什么？", japanese: "鞄の中には何がありますか？" },
    ],
  },
  {
    id: 2145,
    char: "妈",
    pinyin: "mā",
    meaning: "お母さん",
    category: "名詞",
    examples: [
      {
        chinese: "我妈做菜可好吃了。",
        japanese: "私の母が作る料理は本当に美味しいです。",
      },
      { chinese: "妈，我饿了。", japanese: "お母さん、お腹すいた。" },
      { chinese: "我想给我妈打个电话。", japanese: "母に電話したいです。" },
    ],
  },
  {
    id: 2146,
    char: "美国人",
    pinyin: "Měiguórén",
    meaning: "アメリカ人",
    category: "名詞",
    examples: [
      { chinese: "他们都是美国人。", japanese: "彼らはみんなアメリカ人です。" },
      { chinese: "我是美国人。", japanese: "私はアメリカ人です。" },
      {
        chinese: "他认识很多美国人。",
        japanese: "彼は多くのアメリカ人を知り合いに持っています。",
      },
    ],
  },
  {
    id: 2147,
    char: "明年",
    pinyin: "míngnián",
    meaning: "来年",
    category: "名詞",
    examples: [
      {
        chinese: "今年的冬天很冷，希望明年比较暖和。",
        japanese:
          "今年の冬はとても寒いですが、来年は少し暖かくなってほしいです。",
      },
      { chinese: "我明年要去中国。", japanese: "私は来年中国に行きます。" },
      { chinese: "明年见！", japanese: "来年会いましょう！" },
    ],
  },
  {
    id: 2148,
    char: "前天",
    pinyin: "qiántiān",
    meaning: "おととい",
    category: "名詞",
    examples: [
      {
        chinese: "前天我在书店看见他了。",
        japanese: "おととい私は本屋で彼を見かけました。",
      },
      { chinese: "前天是他生日。", japanese: "おとといは彼の誕生日でした。" },
      {
        chinese: "你前天去哪儿了？",
        japanese: "あなたはおとといどこへ行きましたか？",
      },
    ],
  },
  {
    id: 2149,
    char: "热水",
    pinyin: "rèshuǐ",
    meaning: "お湯",
    category: "名詞",
    examples: [
      {
        chinese: "多喝热水对身体好。",
        japanese: "お湯をたくさん飲むのは体にいいです。",
      },
      { chinese: "我想喝杯热水。", japanese: "お湯を一杯飲みたいです。" },
      { chinese: "这里有热水吗？", japanese: "ここにお湯はありますか？" },
    ],
  },
  {
    id: 2150,
    char: "日本人",
    pinyin: "Rìběnrén",
    meaning: "日本人",
    category: "名詞",
    examples: [
      { chinese: "你是日本人吗？", japanese: "あなたは日本人ですか。" },
      {
        chinese: "我有两个日本人朋友。",
        japanese: "私には日本人の友達が二人います。",
      },
      {
        chinese: "日本人喜欢吃鱼。",
        japanese: "日本人は魚を食べるのが好きです。",
      },
    ],
  },
  {
    id: 2151,
    char: "上面",
    pinyin: "shàngmian",
    meaning: "上",
    category: "名詞",
    examples: [
      {
        chinese: "“六”的上面是一点儿。",
        japanese: "「六」の上は点が1つです。",
      },
      {
        chinese: "桌子上面有什么？",
        japanese: "テーブルの上には何がありますか？",
      },
      { chinese: "请写在上面。", japanese: "上に書いてください。" },
    ],
  },
  {
    id: 2152,
    char: "书店",
    pinyin: "shūdiàn",
    meaning: "書店",
    category: "名詞",
    examples: [
      {
        chinese: "学校附近哪儿有书店？",
        japanese: "学校の近くではどこに書店がありますか？",
      },
      {
        chinese: "我去书店买本书。",
        japanese: "私は本屋へ本を買いに行きます。",
      },
      {
        chinese: "这家书店的书很全。",
        japanese: "この本屋は本が充実しています。",
      },
    ],
  },
  {
    id: 2153,
    char: "听力",
    pinyin: "tīnglì",
    meaning: "リスニング",
    category: "名詞",
    examples: [
      {
        chinese: "这次考试的听力我听不太懂。",
        japanese: "今回のテストのリスニングがあまり聞き取れませんでした。",
      },
      {
        chinese: "他的听力很好。",
        japanese: "彼のリスニング力はとても良いです。",
      },
      {
        chinese: "我们要练习听力。",
        japanese: "私たちはリスニングの練習をしなければなりません。",
      },
    ],
  },
  {
    id: 2154,
    char: "下面",
    pinyin: "xiàmian",
    meaning: "下",
    category: "名詞",
    examples: [
      { chinese: "那个村子在山下面。", japanese: "あの村は山の下にあります。" },
      {
        chinese: "下面请看第一题。",
        japanese: "下（次）に、第一問を見てください。",
      },
      {
        chinese: "楼下面有人等你。",
        japanese: "階下であなたを待っている人がいます。",
      },
    ],
  },
  {
    id: 2155,
    char: "小狗",
    pinyin: "xiǎo gǒu",
    meaning: "子犬",
    category: "名詞",
    examples: [
      {
        chinese: "我要去喂小狗了。",
        japanese: "私は子犬に餌をやりに行かなければなりません。",
      },
      { chinese: "那只小狗真可爱。", japanese: "あの子犬は本当に可愛いです。" },
      { chinese: "小狗在睡觉。", japanese: "子犬は寝ています。" },
    ],
  },
  {
    id: 2156,
    char: "小猫",
    pinyin: "xiǎo māo",
    meaning: "子猫",
    category: "名詞",
    examples: [
      { chinese: "我家有一只小猫。", japanese: "私の家には子猫が1匹います。" },
      { chinese: "小猫喜欢吃鱼。", japanese: "子猫は魚を食べるのが好きです。" },
      { chinese: "你看那只小猫。", japanese: "あの子猫を見て。" },
    ],
  },
  {
    id: 2157,
    char: "小桌子",
    pinyin: "xiǎo zhuōzi",
    meaning: "小さなテーブル",
    category: "名詞",
    examples: [
      {
        chinese: "小桌子上面有封信，你看见了吗？",
        japanese: "小さいテーブルの上に手紙が1通あります、見ましたか。",
      },
      {
        chinese: "请把茶放在小桌子上。",
        japanese: "お茶を小さいテーブルの上に置いてください。",
      },
      {
        chinese: "这张小桌子很漂亮。",
        japanese: "この小さいテーブルはとてもきれいです。",
      },
    ],
  },
  {
    id: 2158,
    char: "小学",
    pinyin: "xiǎoxué",
    meaning: "小学校",
    category: "名詞",
    examples: [
      {
        chinese: "我儿子明年上小学。",
        japanese: "私の息子は来年小学校に上がります。",
      },
      { chinese: "这是我的小学。", japanese: "これは私の小学校です。" },
      {
        chinese: "小学就在家附近。",
        japanese: "小学校は家のすぐ近くにあります。",
      },
    ],
  },
  {
    id: 2159,
    char: "学生们",
    pinyin: "xuéshengmen",
    meaning: "学生たち",
    category: "名詞",
    examples: [
      { chinese: "学生们都来了。", japanese: "学生たちはみんな来ました。" },
      {
        chinese: "老师和学生们在一起。",
        japanese: "先生と学生たちは一緒にいます。",
      },
      { chinese: "学生们正在上课。", japanese: "学生たちは授業中です。" },
    ],
  },
  {
    id: 2160,
    char: "右面",
    pinyin: "yòumian",
    meaning: "右",
    category: "名詞",
    examples: [
      {
        chinese: "往右面看，你就能看到学校了。",
        japanese: "右側を見てください、学校が見えますよ。",
      },
      {
        chinese: "右面那个商店是卖花的。",
        japanese: "右側のあの店は花を売っています。",
      },
      { chinese: "请站在右面。", japanese: "右側に立ってください。" },
    ],
  },
  {
    id: 2161,
    char: "阅读",
    pinyin: "yuèdú",
    meaning: "読解",
    category: "名詞",
    examples: [
      {
        chinese: "我的爱好是阅读和运动。",
        japanese: "私の趣味は読書とスポーツです。",
      },
      {
        chinese: "这次考试有阅读理解。",
        japanese: "今回のテストには読解があります。",
      },
      {
        chinese: "阅读对学习很有帮助。",
        japanese: "読書は学習の助けになります。",
      },
    ],
  },
  {
    id: 2162,
    char: "中国人",
    pinyin: "Zhōngguórén",
    meaning: "中国人",
    category: "名詞",
    examples: [
      {
        chinese: "她是美国人，我是中国人。",
        japanese: "彼女はアメリカ人で、私は中国人です。",
      },
      { chinese: "中国人很热情。", japanese: "中国人はとても親切です。" },
      {
        chinese: "很多中国人喜欢喝茶。",
        japanese: "多くの中国人はお茶を飲むのが好きです。",
      },
    ],
  },
  {
    id: 2163,
    char: "左面",
    pinyin: "zuǒmiàn",
    meaning: "左",
    category: "名詞",
    examples: [
      {
        chinese: "坐在你左面的人是谁？",
        japanese: "あなたの左側に座っている人は誰ですか？",
      },
      { chinese: "左面有一家银行。", japanese: "左側に銀行があります。" },
      { chinese: "请向左面转。", japanese: "左を向いてください。" },
    ],
  },
  {
    id: 2164,
    char: "不见",
    pinyin: "bújiàn",
    meaning: "見当たらない",
    category: "動詞",
    examples: [
      { chinese: "我的钱包不见了。", japanese: "私の財布がなくなりました。" },
      { chinese: "好久不见！", japanese: "お久しぶりです！" },
      { chinese: "他怎么不见了？", japanese: "彼はどうしていなくなったの？" },
    ],
  },
  {
    id: 2165,
    char: "吃饭",
    pinyin: "chī fàn",
    meaning: "ご飯を食べる",
    category: "動詞",
    examples: [
      {
        chinese: "明天我们请老师吃饭。",
        japanese: "明日私たちは先生にご飯をごちそうします。",
      },
      { chinese: "你吃饭了吗？", japanese: "ご飯食べましたか？" },
      { chinese: "快来吃饭吧。", japanese: "早く来てご飯を食べなさい。" },
    ],
  },
  {
    id: 2166,
    char: "打来",
    pinyin: "dǎlai",
    meaning: "電話がかかってくる",
    category: "動詞",
    examples: [
      {
        chinese: "如果是他打来的，请告诉他我不在。",
        japanese:
          "もし彼から電話が掛かってきたら、私はいないと言ってください。",
      },
      {
        chinese: "这是谁打来的电话？",
        japanese: "これは誰からかかってきた電話ですか？",
      },
      {
        chinese: "刚才有个电话打来找你。",
        japanese: "さっきあなたに電話がありました。",
      },
    ],
  },
  {
    id: 2167,
    char: "读书",
    pinyin: "dúshū",
    meaning: "読書する、勉強する",
    category: "動詞",
    examples: [
      { chinese: "他读书很多。", japanese: "彼は本をよく読みます。" },
      { chinese: "我在北京读书。", japanese: "私は北京で勉強しています。" },
      { chinese: "读书可以使人聪明。", japanese: "読書は人を賢くします。" },
    ],
  },
  {
    id: 2168,
    char: "回来",
    pinyin: "huílai",
    meaning: "帰ってくる",
    category: "動詞",
    examples: [
      {
        chinese: "妈妈去买菜了，一会儿就回来。",
        japanese: "母は食材を買いに行きました。少ししたらもどってきます。",
      },
      { chinese: "你什么时候回来？", japanese: "いつ帰ってきますか？" },
      { chinese: "快回来吧。", japanese: "早く帰っておいで。" },
    ],
  },
  {
    id: 2169,
    char: "回去",
    pinyin: "huíqu",
    meaning: "帰っていく",
    category: "動詞",
    examples: [
      {
        chinese: "已经快十点了，我们回去吧。",
        japanese: "もうすぐ10時です、私たち帰りましょう。",
      },
      { chinese: "你先回去吧。", japanese: "先に帰っていいですよ。" },
      { chinese: "我要回去了。", japanese: "私はもう帰ります。" },
    ],
  },
  {
    id: 2170,
    char: "见",
    pinyin: "jiàn",
    meaning: "会う",
    category: "動詞",
    examples: [
      {
        chinese: "我们有十多年没见了。",
        japanese: "私たちは十数年会っていません。",
      },
      { chinese: "明天见！", japanese: "また明日！" },
      { chinese: "我想见见他。", japanese: "彼に会いたいです。" },
    ],
  },
  {
    id: 2171,
    char: "叫",
    pinyin: "jiào",
    meaning: "〜させる",
    category: "動詞",
    examples: [
      {
        chinese: "老师叫他去看看。",
        japanese: "先生が彼にちょっと見てくるように言いました。",
      },
      {
        chinese: "妈妈叫我吃饭。",
        japanese: "母が私にご飯を食べるように呼びました。",
      },
      { chinese: "谁叫你来的？", japanese: "誰があなたを呼んだのですか？" },
    ],
  },
  {
    id: 2172,
    char: "开车",
    pinyin: "kāichē",
    meaning: "車を運転する",
    category: "動詞",
    examples: [
      { chinese: "我正在学开车。", japanese: "私は今運転を学んでいます。" },
      { chinese: "他开车很慢。", japanese: "彼は運転が慎重です（遅いです）。" },
      { chinese: "今天我开车去上班。", japanese: "今日は車で仕事に行きます。" },
    ],
  },
  {
    id: 2173,
    char: "看不见",
    pinyin: "kànbujiàn",
    meaning: "見えない",
    category: "動詞",
    examples: [
      {
        chinese: "这儿太黑，什么也看不见。",
        japanese: "ここはとても暗く、何も見えません。",
      },
      { chinese: "我看不见黑板上的字。", japanese: "黒板の字が見えません。" },
      { chinese: "你怎么看不见我？", japanese: "どうして私が見えないの？" },
    ],
  },
  {
    id: 2174,
    char: "没",
    pinyin: "méi",
    meaning: "〜ない（完了否定）",
    category: "動詞",
    examples: [
      {
        chinese: "我是学生，没多少钱。",
        japanese: "私は学生で、お金はいくらもありません。",
      },
      { chinese: "还没开始。", japanese: "まだ始まっていません。" },
      {
        chinese: "我没去过北京。",
        japanese: "私は北京に行ったことがありません。",
      },
    ],
  },
  {
    id: 2175,
    char: "睡",
    pinyin: "shuì",
    meaning: "眠る",
    category: "動詞",
    examples: [
      {
        chinese: "他累了，回到家就睡了。",
        japanese: "彼は疲れていて、家に帰るとすぐに眠ってしまいました。",
      },
      { chinese: "你睡了吗？", japanese: "もう寝ましたか？" },
      { chinese: "孩子已经睡了。", japanese: "子供はもう寝ました。" },
    ],
  },
  {
    id: 2176,
    char: "说话",
    pinyin: "shuōhuà",
    meaning: "話をする",
    category: "動詞",
    examples: [
      {
        chinese: "他一直看着我，不说话。",
        japanese: "彼はずっと私を見ていて、話をしませんでした。",
      },
      { chinese: "请大声说话。", japanese: "大きな声で話してください。" },
      { chinese: "别和陌生人说话。", japanese: "知らない人と話さないで。" },
    ],
  },
  {
    id: 2177,
    char: "听不见",
    pinyin: "tīngbujiàn",
    meaning: "聞こえない",
    category: "動詞",
    examples: [
      { chinese: "我什么都听不见。", japanese: "何も聞こえません。" },
      {
        chinese: "声音太小，我听不见。",
        japanese: "声が小さすぎて、聞こえません。",
      },
      { chinese: "你听不见吗？", japanese: "聞こえませんか？" },
    ],
  },
  {
    id: 2178,
    char: "听见",
    pinyin: "tīngjiàn",
    meaning: "聞こえる",
    category: "動詞",
    examples: [
      {
        chinese: "我听见有人说话，所以过来看看。",
        japanese: "私が人が話すのが聞こえたので、見に来ました。",
      },
      { chinese: "你听见了吗？", japanese: "聞こえましたか？" },
      {
        chinese: "我听见外面有声音。",
        japanese: "外で音がするのが聞こえました。",
      },
    ],
  },
  {
    id: 2179,
    char: "想家",
    pinyin: "xiǎng jiā",
    meaning: "ホームシックになる",
    category: "動詞",
    examples: [
      { chinese: "他很想家。", japanese: "彼はとても家が恋しいです。" },
      {
        chinese: "刚出国的时候，我经常想家。",
        japanese: "出国したばかりの頃、私はよくホームシックになりました。",
      },
      { chinese: "你想家吗？", japanese: "ホームシックですか？" },
    ],
  },
  {
    id: 2180,
    char: "写下来",
    pinyin: "xiěxialai",
    meaning: "書き留める",
    category: "動詞",
    examples: [
      {
        chinese: "你可以把你的名字写下来吗？",
        japanese: "あなたの名前を書いてもらえませんか？",
      },
      {
        chinese: "请把这个地址写下来。",
        japanese: "この住所を書き留めてください。",
      },
      {
        chinese: "我把他说的话都写下来了。",
        japanese: "私は彼の言ったことをすべて書き留めました。",
      },
    ],
  },
  {
    id: 2181,
    char: "学",
    pinyin: "xué",
    meaning: "学ぶ",
    category: "動詞",
    examples: [
      {
        chinese: "现在我在中国学汉语，明年回国。",
        japanese: "現在私は中国で中国語を学んでいて、来年帰国します。",
      },
      { chinese: "你学了多久了？", japanese: "どれくらい勉強してますか？" },
      {
        chinese: "学然后知不足。",
        japanese: "学んで初めて自分の未熟さを知る。",
      },
    ],
  },
  {
    id: 2182,
    char: "住院",
    pinyin: "zhùyuàn",
    meaning: "入院する",
    category: "動詞",
    examples: [
      {
        chinese: "我的朋友住院了，我得去看他。",
        japanese:
          "私の友だちが入院したので、私は彼を見舞いに行かなければなりません。",
      },
      { chinese: "他住院了一个星期。", japanese: "彼は1週間入院しました。" },
      {
        chinese: "希望你早日出院。",
        japanese:
          "早く退院できることを望んでいます（これは「住院」の例文ではないが、文脈として）。",
      },
    ],
  },
  {
    id: 2183,
    char: "做好",
    pinyin: "zuòhão",
    meaning: "ちゃんと〜する",
    category: "動詞",
    examples: [
      {
        chinese: "你得做好准备。",
        japanese: "あなたはちゃんと準備をしなければなりません。",
      },
      {
        chinese: "请做好你的工作。",
        japanese: "自分の仕事をちゃんとやってください。",
      },
      { chinese: "一切都做好了。", japanese: "すべて準備完了しました。" },
    ],
  },
  {
    id: 2184,
    char: "做菜",
    pinyin: "zuò cài",
    meaning: "料理を作る",
    category: "動詞",
    examples: [
      {
        chinese: "米饭已经做好了，马上做菜吧。",
        japanese: "ご飯はもうできたので、すぐに料理を作りましょう。",
      },
      { chinese: "你会做菜吗？", japanese: "あなたは料理ができますか？" },
      { chinese: "今天谁做菜？", japanese: "今日は誰が料理を作りますか？" },
    ],
  },
  {
    id: 2185,
    char: "做饭",
    pinyin: "zuò fàn",
    meaning: "食事を作る",
    category: "動詞",
    examples: [
      {
        chinese: "妻子正在做饭时，丈夫回来了。",
        japanese: "妻がちょうど料理をしているとき、夫が帰ってきました。",
      },
      {
        chinese: "我每天回家做饭。",
        japanese: "私は毎日家に帰って食事を作ります。",
      },
      {
        chinese: "妈妈在厨房做饭。",
        japanese: "母はキッチンで食事を作っています。",
      },
    ],
  },
  {
    id: 2186,
    char: "那儿",
    pinyin: "nàr",
    meaning: "そこ",
    category: "代名詞",
    examples: [
      {
        chinese: "这儿没什么意思，我们去那儿看看吧。",
        japanese:
          "ここは面白くないから、あっちのほうをちょっと見に行きましょう。",
      },
      { chinese: "那儿有什么？", japanese: "あそこには何がありますか？" },
      { chinese: "我的书在那儿。", japanese: "私の本はあそこにあります。" },
    ],
  },
  {
    id: 2187,
    char: "他们",
    pinyin: "tāmen",
    meaning: "彼ら",
    category: "代名詞",
    examples: [
      {
        chinese: "我不认识他们。",
        japanese: "私は彼らと知り合いではありません。",
      },
      { chinese: "他们是我的同学。", japanese: "彼らは私の同級生です。" },
      { chinese: "他们去哪儿了？", japanese: "彼らはどこに行きましたか？" },
    ],
  },
  {
    id: 2188,
    char: "她们",
    pinyin: "tāmen",
    meaning: "彼女ら",
    category: "代名詞",
    examples: [
      {
        chinese: "她们都去哪儿了？",
        japanese: "彼女たちはみんなどこに行きましたか。",
      },
      {
        chinese: "她们在聊天。",
        japanese: "彼女たちはおしゃべりをしています。",
      },
      { chinese: "我很喜欢她们。", japanese: "私は彼女たちがとても好きです。" },
    ],
  },
  {
    id: 2189,
    char: "这么",
    pinyin: "zhème",
    meaning: "こんなに",
    category: "代名詞",
    examples: [
      {
        chinese: "我吃不了这么多。",
        japanese: "私はこんなにたくさん食べきれません。",
      },
      {
        chinese: "你怎么这么晚才来？",
        japanese: "どうしてこんなに遅くに来たのですか？",
      },
      {
        chinese: "这么好的机会，别放弃。",
        japanese: "こんなに良い機会なんだから、諦めないで。",
      },
    ],
  },
  {
    id: 2190,
    char: "这里",
    pinyin: "zhèli",
    meaning: "ここ",
    category: "代名詞",
    examples: [
      {
        chinese: "这里不太亮，我们开灯吧。",
        japanese: "ここはあまり明るくないので、私たちは電気をつけましょう。",
      },
      { chinese: "这里有人吗？", japanese: "ここには誰かいますか？" },
      { chinese: "请看这里。", japanese: "ここを見てください。" },
    ],
  },
  {
    id: 2191,
    char: "这儿",
    pinyin: "zhèr",
    meaning: "ここ",
    category: "代名詞",
    examples: [
      {
        chinese: "请在这儿写你的名字。",
        japanese: "ここにあなたの名前を書いてください。",
      },
      {
        chinese: "这儿离学校很近。",
        japanese: "ここは学校からとても近いです。",
      },
      { chinese: "我喜欢这儿。", japanese: "私はここが好きです。" },
    ],
  },
  {
    id: 2192,
    char: "你们",
    pinyin: "nǐmen",
    meaning: "あなたたち",
    category: "代名詞",
    examples: [
      {
        chinese: "你们现在学习忙不忙？",
        japanese: "あなたたちは現在勉強が忙しいですか。",
      },
      { chinese: "你们好！", japanese: "あなたたち、こんにちは！" },
      { chinese: "祝你们快乐！", japanese: "あなたたちの幸せを祈ります！" },
    ],
  },
  {
    id: 2193,
    char: "同学们",
    pinyin: "tóngxuémen",
    meaning: "同級生たち",
    category: "代名詞",
    examples: [
      {
        chinese: "同学们都很喜欢你。",
        japanese: "同級生たちはみんなあなたのことが好きです。",
      },
      { chinese: "同学们，上课了。", japanese: "みなさん、授業ですよ。" },
      {
        chinese: "我和同学们去旅游。",
        japanese: "私は同級生たちと旅行に行きます。",
      },
    ],
  },
  {
    id: 2194,
    char: "不太",
    pinyin: "bú tài",
    meaning: "あまり〜ない",
    category: "副詞",
    examples: [
      {
        chinese: "我最近事情比较少，不太忙。",
        japanese: "私は最近用事が比較的少なく、あまり忙しくありません。",
      },
      { chinese: "我不太舒服。", japanese: "私はあまり気分が良くありません。" },
      {
        chinese: "这个苹果不太甜。",
        japanese: "このリンゴはあまり甘くありません。",
      },
    ],
  },
  {
    id: 2195,
    char: "一共",
    pinyin: "yígòng",
    meaning: "合計",
    category: "副詞",
    examples: [
      {
        chinese: "这些东西一共多少钱？",
        japanese: "これらの物は全部でおいくらですか。",
      },
      {
        chinese: "我们班一共由二十个学生。",
        japanese: "私たちのクラスは合計で20人の学生がいます。",
      },
      { chinese: "一共三天。", japanese: "全部で三日間です。" },
    ],
  },
  {
    id: 2196,
    char: "不会",
    pinyin: "bú huì",
    meaning: "できない",
    category: "助動詞",
    examples: [
      {
        chinese: "我一句汉语都不会。",
        japanese: "私は中国語が一言もできません。",
      },
      {
        chinese: "他不会来。",
        japanese: "彼は来ないでしょう（可能性）。／彼は来られません（能力）。",
      },
      { chinese: "我不会喝酒。", japanese: "私はお酒が飲めません。" },
    ],
  },
  {
    id: 2197,
    char: "不少",
    pinyin: "bù shǎo",
    meaning: "少なくない、多い",
    category: "形容詞",
    examples: [
      {
        chinese: "今天的作业真不少。",
        japanese: "今日の宿題は本当に多いです。",
      },
      {
        chinese: "那里有不少人。",
        japanese: "あそこには少なからぬ（多くの）人がいます。",
      },
      {
        chinese: "他赚了不少钱。",
        japanese: "彼は少なからぬ（多くの）お金を稼ぎました。",
      },
    ],
  },
  {
    id: 2198,
    char: "好多",
    pinyin: "hǎoduō",
    meaning: "たくさん",
    category: "数量詞",
    examples: [
      {
        chinese: "妈妈做了好多我爱吃的菜。",
        japanese: "母は私の好きな料理をとてもたくさん作りました。",
      },
      {
        chinese: "我有好多问题想问你。",
        japanese: "あなたに聞きたい質問がたくさんあります。",
      },
      {
        chinese: "好久不见，我想死你了。",
        japanese:
          "久しぶり、会いたかったよ（「好多」ではないが文脈）。／ 好多人在排队。（たくさんの人が並んでいます）",
      },
    ],
  },
  {
    id: 2199,
    char: "男的",
    pinyin: "nán de",
    meaning: "男性の",
    category: "名詞",
    examples: [
      {
        chinese: "这个男的在哪里工作？",
        japanese: "この男性はどこで仕事をしていますか。",
      },
      { chinese: "那个男的是谁？", japanese: "あの男性は誰ですか？" },
      {
        chinese: "这里只有一个男的。",
        japanese: "ここは男性が一人しかいません。",
      },
    ],
  },
  {
    id: 2200,
    char: "女的",
    pinyin: "nǚ de",
    meaning: "女性の",
    category: "名詞",
    examples: [
      {
        chinese: "这个女的打算几点回家？",
        japanese: "この女性は何時に家に帰るつもりですか？",
      },
      { chinese: "那个女的很漂亮。", japanese: "あの女性はとてもきれいです。" },
      { chinese: "她是女的。", japanese: "彼女は女性です。" },
    ],
  },
  {
    id: 2201,
    char: "有点儿",
    pinyin: "yǒudiǎnr",
    meaning: "少し",
    category: "副詞",
    examples: [
      { chinese: "北京的冬天有点儿冷。", japanese: "北京の冬は少し寒いです。" },
      { chinese: "我有点儿累。", japanese: "私は少し疲れました。" },
      { chinese: "今天有点儿忙。", japanese: "今日は少し忙しいです。" },
    ],
  },
  {
    id: 2202,
    char: "一些",
    pinyin: "yìxiē",
    meaning: "少し",
    category: "数量詞",
    examples: [
      {
        chinese: "我买了一些家里用的东西。",
        japanese: "私は家で使うものを少し買いました。",
      },
      { chinese: "这里有一些书。", japanese: "ここに本が何冊かあります。" },
      { chinese: "我想喝一些水。", japanese: "水を少し飲みたいです。" },
    ],
  },
  {
    id: 2203,
    char: "点儿",
    pinyin: "diǎnr",
    meaning: "少し",
    category: "数量詞",
    examples: [
      { chinese: "你想买点儿什么？", japanese: "あなたは何を買いたいですか？" },
      { chinese: "吃点儿东西吧。", japanese: "何か食べましょう。" },
      { chinese: "请喝点儿茶。", japanese: "お茶を少しどうぞ。" },
    ],
  },
  {
    id: 2204,
    char: "多",
    pinyin: "duō",
    meaning: "〜過ぎ、多い",
    category: "形容詞",
    examples: [
      {
        chinese: "十二点多了，咱们吃饭吧。",
        japanese: "12時過ぎました。私達はご飯にしましょう。",
      },
      { chinese: "人很多。", japanese: "人が多いです。" },
      { chinese: "多谢！", japanese: "どうもありがとう！" },
    ],
  },
  {
    id: 2205,
    char: "哪里",
    pinyin: "nǎli",
    meaning: "どこ",
    category: "疑問詞",
    examples: [
      {
        chinese: "喂，你是哪里？",
        japanese: "もしもし、あなたはどこにいますか？",
      },
      { chinese: "你要去哪里？", japanese: "あなたはどこへ行きますか？" },
      { chinese: "哪里哪里。", japanese: "いえいえ（謙遜）。" },
    ],
  },
  {
    id: 2206,
    char: "次",
    pinyin: "cì",
    meaning: "回",
    category: "量詞",
    examples: [
      {
        chinese: "我给他打过两次电话了。",
        japanese: "私は彼に2回電話をかけました。",
      },
      { chinese: "这是第一次。", japanese: "これは初めてです。" },
      { chinese: "下次见。", japanese: "また次回。" },
    ],
  },
  {
    id: 2207,
    char: "分",
    pinyin: "fēn",
    meaning: "分",
    category: "量詞",
    examples: [
      {
        chinese: "飞机到达的时间是九点二十分。",
        japanese: "飛行機が到着する時間は9時20分です。",
      },
      { chinese: "现在几分？", japanese: "今何分ですか？" },
      { chinese: "请等我几分钟。", japanese: "数分待ってください。" },
    ],
  },
  {
    id: 2208,
    char: "第",
    pinyin: "dì",
    meaning: "第〜",
    category: "接頭語",
    examples: [
      {
        chinese: "我第一次坐飞机是十二岁。",
        japanese: "私が初めて飛行機に乗ったのは12歳のときです。",
      },
      { chinese: "这是第一课。", japanese: "これは第一課です。" },
      { chinese: "他得了第二名。", japanese: "彼は二位を取りました。" },
    ],
  },
  {
    id: 2209,
    char: "好的",
    pinyin: "hǎo de",
    meaning: "いいよ",
    category: "フレーズ",
    examples: [
      {
        chinese: "明天见，好吗？—好的，明天见。",
        japanese: "明日会いましょう、いいですか。—はい、明日会いましょう。",
      },
      { chinese: "好的，我知道了。", japanese: "はい、分かりました。" },
      { chinese: "好的，没问题。", japanese: "はい、問題ありません。" },
    ],
  },
  {
    id: 2210,
    char: "几个",
    pinyin: "jǐ ge",
    meaning: "いくつか",
    category: "数量詞",
    examples: [
      {
        chinese: "我买了几个苹果，你们吃吧。",
        japanese: "リンゴをいくつか買ったので、あなたたち食べてください。",
      },
      {
        chinese: "你有几个好朋友？",
        japanese: "あなたには仲の良い友達が何人いますか？",
      },
      {
        chinese: "这里有几个杯子。",
        japanese: "ここにコップがいくつかあります。",
      },
    ],
  },
  {
    id: 2211,
    char: "几天",
    pinyin: "jǐ tiān",
    meaning: "何日間",
    category: "数量詞",
    examples: [
      {
        chinese: "你一个星期工作几天？",
        japanese: "あなたは一週間に何日仕事をしていますか。",
      },
      {
        chinese: "我要去北京玩几天。",
        japanese: "私は北京へ数日遊びに行きます。",
      },
      {
        chinese: "过几天再说吧。",
        japanese: "数日経ってからまた話しましょう。",
      },
    ],
  },
  {
    id: 2212,
    char: "例如",
    pinyin: "lìrú",
    meaning: "例えば",
    category: "接続詞",
    examples: [
      {
        chinese: "我有很多想去的地方，例如北京。",
        japanese: "私は行きたい場所がたくさんあります。例えば北京がそうです。",
      },
      {
        chinese: "我喜欢水果，例如苹果和香蕉。",
        japanese: "私は果物が好きです、例えばリンゴとバナナです。",
      },
      {
        chinese: "运动有很多种，例如跑步和游泳。",
        japanese:
          "スポーツには多くの種類があります、例えばジョギングと水泳です。",
      },
    ],
  },
  {
    id: 2213,
    char: "哪年",
    pinyin: "nǎ nián",
    meaning: "何年",
    category: "疑問詞",
    examples: [
      {
        chinese: "你是哪一年大学毕业的？",
        japanese: "あなたは何年に大学を卒業しますか。",
      },
      { chinese: "他是哪年出生的？", japanese: "彼は何年に生まれましたか？" },
      { chinese: "这是哪年的酒？", japanese: "これは何年の酒ですか？" },
    ],
  },
  {
    id: 2214,
    char: "哪天",
    pinyin: "nǎ tiān",
    meaning: "いつ",
    category: "疑問詞",
    examples: [
      {
        chinese: "哪天咱们一起去公园玩儿。",
        japanese: "いつか私達で一緒に公園へ遊びに行きましょう。",
      },
      {
        chinese: "你是哪天来的？",
        japanese: "あなたはいつ（何日に）来たのですか？",
      },
      { chinese: "改天吧。", japanese: "また別の日にしましょう（関連表現）。" },
    ],
  },
  {
    id: 2215,
    char: "你看",
    pinyin: "nǐ kàn",
    meaning: "見て",
    category: "フレーズ",
    examples: [
      {
        chinese: "你看，前面就是银行。",
        japanese: "見てください、前に銀行があります。",
      },
      {
        chinese: "你看这件衣服怎么样？",
        japanese: "この服、どう思いますか（見てどうですか）？",
      },
      { chinese: "你看，下雪了。", japanese: "見て、雪が降ってきました。" },
    ],
  },
  {
    id: 2216,
    char: "上小学",
    pinyin: "shàng xiǎoxué",
    meaning: "小学校に通う",
    category: "動詞",
    examples: [
      {
        chinese: "他的儿子正在上小学。",
        japanese: "彼の息子は今小学校に通っています。",
      },
      {
        chinese: "我七岁开始上小学。",
        japanese: "私は7歳から小学校に通い始めました。",
      },
      {
        chinese: "上小学的时候我很调皮。",
        japanese: "小学校に通っていた頃、私はわんぱくでした。",
      },
    ],
  },
  {
    id: 2217,
    char: "是",
    pinyin: "shì",
    meaning: "はい",
    category: "フレーズ",
    examples: [
      {
        chinese: "请问，你是大卫吗？—是，我是。",
        japanese: "すみません、あなたはデビッドさんですか。—はい、そうです。",
      },
      { chinese: "是不是？", japanese: "そうですか？（そうではないですか？）" },
      { chinese: "是吗？", japanese: "そうですか？" },
    ],
  },
  {
    id: 2218,
    char: "是的",
    pinyin: "shì de",
    meaning: "そうです",
    category: "フレーズ",
    examples: [
      {
        chinese: "你是美国人吗？—是的，我是。",
        japanese: "あなたはアメリカ人ですか。—はい、そうです。",
      },
      { chinese: "是的，我明白。", japanese: "はい、分かります。" },
      { chinese: "是的，你说的对。", japanese: "はい、あなたの言う通りです。" },
    ],
  },
  {
    id: 2219,
    char: "是吗",
    pinyin: "shì ma",
    meaning: "そうですか",
    category: "フレーズ",
    examples: [
      {
        chinese: "我很喜欢看电影。—是吗？",
        japanese: "私は映画を見るのがとても好きです。—そうですか。",
      },
      {
        chinese: "他结婚了。—是吗？",
        japanese: "彼は結婚しました。—そうですか？",
      },
      { chinese: "真的吗？是吗？", japanese: "本当？そうですか？" },
    ],
  },
  {
    id: 2220,
    char: "是...的",
    pinyin: "shì...de",
    meaning: "〜のだ",
    category: "構文",
    examples: [
      {
        chinese: "这张桌子是他自己做的。",
        japanese: "このテーブルは彼自身が作ったものです。",
      },
      { chinese: "我是坐飞机来的。", japanese: "私は飛行機で来ました。" },
      { chinese: "这是在哪里买的？", japanese: "これはどこで買ったのですか？" },
    ],
  },
  {
    id: 2221,
    char: "太...了",
    pinyin: "tài...le",
    meaning: "〜すぎる",
    category: "構文",
    examples: [
      { chinese: "这本词典太大了。", japanese: "この辞書は大きすぎます。" },
      { chinese: "太好了！", japanese: "やったー！／よかった！" },
      { chinese: "今天太热了。", japanese: "今日は暑すぎます。" },
    ],
  },
  {
    id: 2222,
    char: "我回来了",
    pinyin: "wǒ huílai le",
    meaning: "ただいま",
    category: "フレーズ",
    examples: [
      { chinese: "妈妈，我回来了。", japanese: "お母さん、ただいま。" },
      {
        chinese: "我回来了，大家都在吗？",
        japanese: "ただいま、みんな居ますか？",
      },
      { chinese: "终于，我回来了。", japanese: "ついに、私は帰ってきました。" },
    ],
  },
  {
    id: 2223,
    char: "有人",
    pinyin: "yǒu rén",
    meaning: "誰か",
    category: "フレーズ",
    examples: [
      {
        chinese: "有人来了，去开门。",
        japanese: "誰かが来たので、ドアを開けに行きます。",
      },
      { chinese: "有人在吗？", japanese: "誰かいますか？" },
      {
        chinese: "听说有人找我。",
        japanese: "誰かが私を探していると聞きました。",
      },
    ],
  },

  // ■ HSK 2級 生活語句 (抜粋)
  {
    id: 2224,
    char: "星期天",
    pinyin: "xīngqītiān",
    meaning: "日曜日",
    category: "カレンダー",
    examples: [
      { chinese: "星期天我休息。", japanese: "日曜日は休みです。" },
      {
        chinese: "我们星期天去公园吧。",
        japanese: "日曜日に公園に行きましょう。",
      },
      { chinese: "星期天人很多。", japanese: "日曜日は人が多いです。" },
    ],
  },
  {
    id: 2225,
    char: "星期一",
    pinyin: "xīngqīyī",
    meaning: "月曜日",
    category: "カレンダー",
    examples: [
      { chinese: "今天是星期一。", japanese: "今日は月曜日です。" },
      {
        chinese: "星期一要上班。",
        japanese: "月曜日は仕事に行かなければなりません。",
      },
      {
        chinese: "每个星期一我都开会。",
        japanese: "毎週月曜日に私は会議をします。",
      },
    ],
  },
  {
    id: 2226,
    char: "一月",
    pinyin: "yīyuè",
    meaning: "1月",
    category: "カレンダー",
    examples: [
      { chinese: "一月是一年的开始。", japanese: "1月は一年の始まりです。" },
      { chinese: "北京的一月很冷。", japanese: "北京の1月はとても寒いです。" },
      { chinese: "我和他一月见过面。", japanese: "私と彼は1月に会いました。" },
    ],
  },
  {
    id: 2227,
    char: "拜拜",
    pinyin: "bàibai",
    meaning: "バイバイ",
    category: "定型表現",
    examples: [
      { chinese: "拜拜，明天见。", japanese: "バイバイ、また明日。" },
      { chinese: "我们要说拜拜了。", japanese: "さよならを言う時間です。" },
      { chinese: "跟阿姨说拜拜。", japanese: "おばさんにバイバイって言って。" },
    ],
  },
  {
    id: 2228,
    char: "帮忙",
    pinyin: "bāngmáng",
    meaning: "手伝う",
    category: "動詞",
    examples: [
      { chinese: "你能帮个忙吗？", japanese: "ちょっと手伝ってくれませんか。" },
      { chinese: "谢谢你的帮忙。", japanese: "手伝ってくれてありがとう。" },
      { chinese: "需要帮忙吗？", japanese: "手伝いが必要ですか？" },
    ],
  },
  {
    id: 2229,
    char: "抱歉",
    pinyin: "bàoqiàn",
    meaning: "ごめんなさい",
    category: "定型表現",
    examples: [
      {
        chinese: "抱歉，我来晚了。",
        japanese: "ごめんなさい、遅くなりました。",
      },
      {
        chinese: "真抱歉，打扰你了。",
        japanese: "本当にごめんなさい、お邪魔しました。",
      },
      {
        chinese: "对此感到很抱歉。",
        japanese: "このことに対して申し訳なく思います。",
      },
    ],
  },
  {
    id: 2230,
    char: "别害羞",
    pinyin: "bié hàixiū",
    meaning: "恥ずかしがらないで",
    category: "定型表現",
    examples: [
      {
        chinese: "别害羞，大家都是朋友。",
        japanese: "恥ずかしがらないで、みんな友達だよ。",
      },
      {
        chinese: "他有点害羞。",
        japanese: "彼は少し内気（恥ずかしがり屋）です。",
      },
      {
        chinese: "想说什么就说，别害羞。",
        japanese: "言いたいことがあれば言って、恥ずかしがらないで。",
      },
    ],
  },
  {
    id: 2231,
    char: "别见外",
    pinyin: "bié jiànwài",
    meaning: "遠慮しないで",
    category: "定型表現",
    examples: [
      {
        chinese: "别见外，多吃点。",
        japanese: "遠慮しないで、たくさん食べて。",
      },
      {
        chinese: "大家都是自己人，别见外。",
        japanese: "みんな身内なんだから、遠慮しないで。",
      },
      {
        chinese: "别见外，把这当成自己家。",
        japanese: "遠慮しないで、ここを自分の家だと思って。",
      },
    ],
  },
  {
    id: 2232,
    char: "别紧张",
    pinyin: "bié jǐnzhāng",
    meaning: "緊張しないで",
    category: "定型表現",
    examples: [
      {
        chinese: "别紧张，慢慢说。",
        japanese: "緊張しないで、ゆっくり話して。",
      },
      { chinese: "考试时别紧张。", japanese: "試験の時は緊張しないで。" },
      {
        chinese: "放松点，别紧张。",
        japanese: "リラックスして、緊張しないで。",
      },
    ],
  },
  {
    id: 2233,
    char: "别忘了",
    pinyin: "bié wàng le",
    meaning: "忘れないで",
    category: "定型表現",
    examples: [
      { chinese: "别忘了明天的考试。", japanese: "明日の試験を忘れないで。" },
      { chinese: "别忘了带伞。", japanese: "傘を持っていくのを忘れないで。" },
      {
        chinese: "别忘了给我打电话。",
        japanese: "私に電話するのを忘れないで。",
      },
    ],
  },
  {
    id: 2234,
    char: "别着急",
    pinyin: "bié zháojí",
    meaning: "焦らないで",
    category: "定型表現",
    examples: [
      {
        chinese: "别着急，还有时间。",
        japanese: "焦らないで、まだ時間はあるから。",
      },
      {
        chinese: "你别着急，慢慢来。",
        japanese: "焦らないで、ゆっくりやって。",
      },
      { chinese: "遇到事情别着急。", japanese: "何かあっても焦らないで。" },
    ],
  },
  {
    id: 2235,
    char: "别管我",
    pinyin: "bié guǎn wǒ",
    meaning: "放っておいて",
    category: "定型表現",
    examples: [
      {
        chinese: "别管我，我想一个人静静。",
        japanese: "放っておいて、一人で静かにしたいんだ。",
      },
      {
        chinese: "这是我的事，别管我。",
        japanese: "これは私のことだから、放っておいて。",
      },
      { chinese: "你别管我了。", japanese: "私のことはもう放っておいて。" },
    ],
  },
  {
    id: 2236,
    char: "比如",
    pinyin: "bǐrú",
    meaning: "例えば",
    category: "接続詞",
    examples: [
      {
        chinese: "我喜欢水果，比如苹果、香蕉。",
        japanese: "私は果物が好きです、例えばリンゴやバナナなど。",
      },
      {
        chinese: "很多城市我都去过，比如上海、西安。",
        japanese: "多くの都市に行きました、例えば上海や西安など。",
      },
      {
        chinese: "他有很多爱好，比如画画儿。",
        japanese: "彼には多くの趣味があります、例えば絵を描くことなど。",
      },
    ],
  },
  {
    id: 2237,
    char: "不敢当",
    pinyin: "bù gǎndāng",
    meaning: "とんでもない",
    category: "定型表現",
    examples: [
      {
        chinese: "您过奖了，不敢当。",
        japanese: "褒めすぎです、とんでもないです。",
      },
      {
        chinese: "實在不敢当。",
        japanese: "本当にとんでもないです（恐縮です）。",
      },
      {
        chinese: "这礼物我可不敢当。",
        japanese: "このプレゼントは私にはもったいない（受け取れません）。",
      },
    ],
  },
  {
    id: 2238,
    char: "不可能",
    pinyin: "bù kěnéng",
    meaning: "ありえない",
    category: "フレーズ",
    examples: [
      { chinese: "这绝对不可能。", japanese: "それは絶対にありえません。" },
      { chinese: "不可能完成的任务。", japanese: "達成不可能な任務。" },
      {
        chinese: "他不可能不知道。",
        japanese: "彼が知らないはずがありません。",
      },
    ],
  },
  {
    id: 2239,
    char: "不谢",
    pinyin: "bú xiè",
    meaning: "どういたしまして",
    category: "定型表現",
    examples: [
      {
        chinese: "谢谢你！—不谢。",
        japanese: "ありがとう！—どういたしまして。",
      },
      {
        chinese: "不用谢，不谢。",
        japanese: "お礼なんていりません、どういたしまして。",
      },
      {
        chinese: "小事一桩，不谢。",
        japanese: "たいしたことじゃないよ、いいってことよ。",
      },
    ],
  },
  {
    id: 2240,
    char: "不知道",
    pinyin: "bù zhīdào",
    meaning: "わかりません",
    category: "フレーズ",
    examples: [
      {
        chinese: "我不知道他在哪儿。",
        japanese: "彼がどこにいるか分かりません。",
      },
      { chinese: "谁都不知道这件事。", japanese: "誰もこの件を知りません。" },
      {
        chinese: "我不知道该怎么办。",
        japanese: "どうすればいいのか分かりません。",
      },
    ],
  },
  {
    id: 2241,
    char: "不错",
    pinyin: "búcuò",
    meaning: "なかなか良い",
    category: "形容詞",
    examples: [
      { chinese: "这件衣服不错。", japanese: "この服はなかなか良いです。" },
      {
        chinese: "味道真的不错。",
        japanese: "味は本当になかなか良いです（美味しいです）。",
      },
      {
        chinese: "今天的运气不错。",
        japanese: "今日の運勢はなかなか良いです。",
      },
    ],
  },
  {
    id: 2242,
    char: "不要紧",
    pinyin: "búyàojǐn",
    meaning: "差し支えない",
    category: "定型表現",
    examples: [
      { chinese: "没关系，不要紧。", japanese: "大丈夫、差し支えありません。" },
      {
        chinese: "受了点小伤，不要紧。",
        japanese: "少し怪我をしたけど、大したことありません。",
      },
      {
        chinese: "这点钱不要紧。",
        japanese: "これくらいのお金なら問題ありません。",
      },
    ],
  },
  {
    id: 2243,
    char: "差不多",
    pinyin: "chàbuduō",
    meaning: "ほぼ",
    category: "形容詞",
    examples: [
      {
        chinese: "我们俩差不多高。",
        japanese: "私たち二人はほぼ同じ背の高さです。",
      },
      {
        chinese: "时间差不多了。",
        japanese: "時間はもうそろそろです（ほとんどその時間です）。",
      },
      {
        chinese: "这两个意思差不多。",
        japanese: "この二つの意味はだいたい同じです。",
      },
    ],
  },
  {
    id: 2244,
    char: "吃好了",
    pinyin: "chī hǎo le",
    meaning: "食べ終わる",
    category: "フレーズ",
    examples: [
      {
        chinese: "我吃好了，大家慢用。",
        japanese: "ごちそうさまでした、皆さんごゆっくり。",
      },
      { chinese: "你吃好了吗？", japanese: "もう食べ終わりましたか？" },
      {
        chinese: "大家吃好喝好。",
        japanese: "皆さん、食べて飲んで楽しんでください。",
      },
    ],
  },
  {
    id: 2245,
    char: "吃什么？",
    pinyin: "chī shénme?",
    meaning: "何食べる？",
    category: "フレーズ",
    examples: [
      { chinese: "今晚吃什么？", japanese: "今夜は何を食べる？" },
      { chinese: "你想吃什么？", japanese: "何が食べたい？" },
      { chinese: "中午吃什么好呢？", japanese: "昼は何を食べたらいいかな？" },
    ],
  },
  {
    id: 2246,
    char: "初次见面",
    pinyin: "chūcì jiànmiàn",
    meaning: "初めまして",
    category: "定型表現",
    examples: [
      {
        chinese: "初次见面，请多关照。",
        japanese: "初めまして、よろしくお願いします。",
      },
      {
        chinese: "虽然是初次见面，但他很热情。",
        japanese: "初対面ですが、彼はとても親切です。",
      },
      {
        chinese: "很高兴初次见面。",
        japanese: "お会いできて嬉しいです（初対面）。",
      },
    ],
  },
  {
    id: 2247,
    char: "吹了",
    pinyin: "chuī le",
    meaning: "だめになった",
    category: "フレーズ",
    examples: [
      { chinese: "那件事吹了。", japanese: "あの件はだめになりました。" },
      { chinese: "我和女朋友吹了。", japanese: "私は彼女と別れました。" },
      { chinese: "计划全吹了。", japanese: "計画は全部おじゃんになりました。" },
    ],
  },
  {
    id: 2248,
    char: "大概",
    pinyin: "dàgài",
    meaning: "だいたい",
    category: "副詞",
    examples: [
      { chinese: "他大概十点到。", japanese: "彼はだいたい10時に着きます。" },
      { chinese: "我大概知道一点。", japanese: "だいたいのことは分かります。" },
      {
        chinese: "这本书大概多少钱？",
        japanese: "この本はだいたいいくらですか？",
      },
    ],
  },
  {
    id: 2249,
    char: "大家好",
    pinyin: "dàjiā hǎo",
    meaning: "みなさんこんにちは",
    category: "定型表現",
    examples: [
      {
        chinese: "大家好，我是新来的。",
        japanese: "みなさんこんにちは、私は新入りです。",
      },
      { chinese: "祝大家好运。", japanese: "みなさんの幸運を祈ります。" },
      {
        chinese: "大家好才是真的好。",
        japanese: "みんなが良いのが本当に良いことです。",
      },
    ],
  },
  {
    id: 2250,
    char: "当然了",
    pinyin: "dāngrán le",
    meaning: "もちろんです",
    category: "定型表現",
    examples: [
      {
        chinese: "你可以帮我吗？—当然了。",
        japanese: "手伝ってくれますか？—もちろんです。",
      },
      { chinese: "想去吗？—当然了！", japanese: "行きたい？—もちろん！" },
      {
        chinese: "当然了，这是我的责任。",
        japanese: "もちろんです、これは私の責任です。",
      },
    ],
  },
  {
    id: 2251,
    char: "当真",
    pinyin: "dàngzhēn",
    meaning: "本気にする",
    category: "動詞",
    examples: [
      {
        chinese: "我是开玩笑的，别当真。",
        japanese: "冗談だよ、本気にしないで。",
      },
      { chinese: "你怎么当真了？", japanese: "どうして本気にしちゃったの？" },
      {
        chinese: "说话要算数，我是当真的。",
        japanese: "言ったことは守るよ、私は本気だよ。",
      },
    ],
  },
  {
    id: 2252,
    char: "对",
    pinyin: "duì",
    meaning: "その通り",
    category: "フレーズ",
    examples: [
      {
        chinese: "你是李明吗？—对。",
        japanese: "あなたは李明ですか？—その通りです。",
      },
      { chinese: "对，就这样做。", japanese: "そう、その通りにやって。" },
      {
        chinese: "说的太对了。",
        japanese: "言っていることは全くその通りです。",
      },
    ],
  },
  {
    id: 2253,
    char: "赶上了",
    pinyin: "gǎn shàng le",
    meaning: "間に合った",
    category: "フレーズ",
    examples: [
      {
        chinese: "还好赶上了火车。",
        japanese: "なんとか電車に間に合いました。",
      },
      {
        chinese: "终于赶上了末班车。",
        japanese: "ついに終電に間に合いました。",
      },
      { chinese: "赶上了好机会。", japanese: "良い機会に恵まれました。" },
    ],
  },
  {
    id: 2254,
    char: "干杯",
    pinyin: "gānbēi",
    meaning: "乾杯",
    category: "定型表現",
    examples: [
      { chinese: "为我们的友谊干杯！", japanese: "私たちの友情に乾杯！" },
      { chinese: "大家以此干杯。", japanese: "みんな一緒に乾杯しましょう。" },
      { chinese: "先干杯再说。", japanese: "まずは乾杯してから話しましょう。" },
    ],
  },
  {
    id: 2255,
    char: "给你",
    pinyin: "gěi nǐ",
    meaning: "はい、どうぞ",
    category: "フレーズ",
    examples: [
      {
        chinese: "给你，这是你要的书。",
        japanese: "はいどうぞ、これがあなたの欲しかった本です。",
      },
      { chinese: "我就不给你看。", japanese: "あなたには見せてあげない。" },
      { chinese: "这些钱给你。", japanese: "このお金をあなたにあげます。" },
    ],
  },
  {
    id: 2256,
    char: "恭喜你",
    pinyin: "gōngxǐ nǐ",
    meaning: "おめでとう",
    category: "定型表現",
    examples: [
      { chinese: "恭喜你考上了大学！", japanese: "大学合格おめでとう！" },
      {
        chinese: "恭喜你发财。",
        japanese: "お金持ちになれますように（新年の挨拶など）。",
      },
      { chinese: "恭喜你要结婚了。", japanese: "結婚おめでとう。" },
    ],
  },
  {
    id: 2257,
    char: "还行",
    pinyin: "hái xíng",
    meaning: "まあまあ",
    category: "フレーズ",
    examples: [
      {
        chinese: "身体怎么样？—还行。",
        japanese: "体調はどう？—まあまあだよ。",
      },
      { chinese: "这菜味道还行。", japanese: "この料理の味はまあまあです。" },
      {
        chinese: "工作还行，不太累。",
        japanese: "仕事はまあまあです、それほど疲れません。",
      },
    ],
  },
  {
    id: 2258,
    char: "韩元",
    pinyin: "hányuán",
    meaning: "韓国ウォン",
    category: "名詞",
    examples: [
      { chinese: "一万韩元。", japanese: "1万ウォン。" },
      {
        chinese: "现在的韩元汇率是多少？",
        japanese: "現在のウォンのレートはいくらですか？",
      },
      { chinese: "我有五千韩元。", japanese: "私は5000ウォン持っています。" },
    ],
  },
  {
    id: 2259,
    char: "好",
    pinyin: "hǎo",
    meaning: "よい",
    category: "形容詞",
    examples: [
      { chinese: "天气很好。", japanese: "天気がとても良い。" },
      { chinese: "他是个好人。", japanese: "彼は良い人です。" },
      { chinese: "祝你有个好心情。", japanese: "良い気分でいられますように。" },
    ],
  },
  {
    id: 2260,
    char: "好吧",
    pinyin: "hǎo ba",
    meaning: "わかりました",
    category: "フレーズ",
    examples: [
      { chinese: "好吧，我同意。", japanese: "わかりました、同意します。" },
      {
        chinese: "好吧，就听你的。",
        japanese: "わかった、君の言う通りにするよ。",
      },
      { chinese: "好吧，下次再去。", japanese: "まあいいよ、また今度行こう。" },
    ],
  },
  {
    id: 2261,
    char: "好主意",
    pinyin: "hǎo zhǔyi",
    meaning: "いいアイデアですね",
    category: "フレーズ",
    examples: [
      { chinese: "去爬山？好主意！", japanese: "山登り？いいアイデアだね！" },
      { chinese: "这是一个好主意。", japanese: "それはいいアイデアです。" },
      { chinese: "谁出的好主意？", japanese: "誰が出したいいアイデアですか？" },
    ],
  },
  {
    id: 2262,
    char: "好久不见了",
    pinyin: "hǎojiǔ bújiàn le",
    meaning: "お久しぶりです",
    category: "定型表現",
    examples: [
      {
        chinese: "好久不见了，你还好吗？",
        japanese: "お久しぶりです、お元気ですか？",
      },
      { chinese: "真是好久不见了。", japanese: "本当にお久しぶりです。" },
      {
        chinese: "老朋友，好久不见了。",
        japanese: "古い友人よ、久しぶりだね。",
      },
    ],
  },
  {
    id: 2263,
    char: "很酷",
    pinyin: "hěn kù",
    meaning: "かっこいい",
    category: "形容詞",
    examples: [
      {
        chinese: "他戴着墨镜，很酷。",
        japanese: "彼はサングラスをかけていて、とてもかっこいい。",
      },
      { chinese: "你的车很酷。", japanese: "あなたの車はかっこいいですね。" },
      { chinese: "这个发型很酷。", japanese: "この髪型はかっこいいです。" },
    ],
  },
  {
    id: 2264,
    char: "欢迎",
    pinyin: "huānyíng",
    meaning: "ようこそ",
    category: "定型表現",
    examples: [
      { chinese: "欢迎光临。", japanese: "いらっしゃいませ。" },
      { chinese: "欢迎来到中国。", japanese: "中国へようこそ。" },
      {
        chinese: "热烈欢迎新同事。",
        japanese: "新しい同僚を熱烈に歓迎します。",
      },
    ],
  },
  {
    id: 2265,
    char: "灰心",
    pinyin: "huīxīn",
    meaning: "がっかりする",
    category: "動詞",
    examples: [
      {
        chinese: "别灰心，下次再努力。",
        japanese: "がっかりしないで、次は頑張ろう。",
      },
      {
        chinese: "失败了也不要灰心。",
        japanese: "失敗してもがっかりしないで。",
      },
      { chinese: "他有点灰心丧气。", japanese: "彼は少し意気消沈しています。" },
    ],
  },
  {
    id: 2266,
    char: "几点了？",
    pinyin: "jǐ diǎn le?",
    meaning: "何時ですか？",
    category: "フレーズ",
    examples: [
      { chinese: "请问，几点了？", japanese: "すみません、何時ですか？" },
      { chinese: "现在几点了？", japanese: "今何時ですか？" },
      {
        chinese: "看看几点了，该睡觉了。",
        japanese: "何時か見て、もう寝る時間だよ。",
      },
    ],
  },
  {
    id: 2267,
    char: "加油",
    pinyin: "jiāyóu",
    meaning: "頑張れ",
    category: "定型表現",
    examples: [
      { chinese: "加油！你能行！", japanese: "頑張れ！君ならできる！" },
      { chinese: "大家一起加油。", japanese: "みんなで一緒に頑張ろう。" },
      { chinese: "为比赛加油。", japanese: "試合を応援する（頑張れと言う）。" },
    ],
  },
  {
    id: 2268,
    char: "继续说",
    pinyin: "jìxù shuō",
    meaning: "しゃべり続ける",
    category: "フレーズ",
    examples: [
      { chinese: "请继续说下去。", japanese: "話を続けてください。" },
      {
        chinese: "我在听，你继续说。",
        japanese: "聞いているから、話を続けて。",
      },
      { chinese: "不要停，继续说。", japanese: "止めないで、話し続けて。" },
    ],
  },
  {
    id: 2269,
    char: "看情况",
    pinyin: "kàn qíngkuàng",
    meaning: "状況を見る",
    category: "フレーズ",
    examples: [
      { chinese: "去不去要看情况。", japanese: "行くかどうかは状況次第です。" },
      { chinese: "明天看情况定。", japanese: "明日の状況を見て決めます。" },
      {
        chinese: "目前还在看情况。",
        japanese: "現在はまだ状況を見ています（様子見です）。",
      },
    ],
  },
  {
    id: 2270,
    char: "可惜",
    pinyin: "kěxī",
    meaning: "惜しい、残念",
    category: "形容詞",
    examples: [
      {
        chinese: "真可惜，没赶上火车。",
        japanese: "本当に残念、電車に間に合わなかった。",
      },
      {
        chinese: "太可惜了，差一点就赢了。",
        japanese: "本当に惜しい、もう少しで勝てたのに。",
      },
      { chinese: "扔了不可惜吗？", japanese: "捨てるのは惜しくないですか？" },
    ],
  },
  {
    id: 2271,
    char: "可以",
    pinyin: "kěyǐ",
    meaning: "できる、よい",
    category: "助動詞",
    examples: [
      { chinese: "我可以进来吗？", japanese: "入ってもいいですか？" },
      { chinese: "你可以帮我一下吗？", japanese: "少し手伝ってくれますか？" },
      {
        chinese: "这样做是可以的。",
        japanese: "このようにするのは良いことです（可能です）。",
      },
    ],
  },
  {
    id: 2272,
    char: "快点儿",
    pinyin: "kuài diǎnr",
    meaning: "早くして",
    category: "フレーズ",
    examples: [
      { chinese: "快点儿，要迟到了。", japanese: "早くして、遅刻しちゃうよ。" },
      { chinese: "请走快点儿。", japanese: "もう少し早く歩いてください。" },
      { chinese: "快点儿做完作业。", japanese: "早く宿題を終わらせなさい。" },
    ],
  },
  {
    id: 2273,
    char: "里面请",
    pinyin: "lǐmiàn qǐng",
    meaning: "中へどうぞ",
    category: "定型表現",
    examples: [
      {
        chinese: "客人来了，里面请。",
        japanese: "お客様が来ました、中へどうぞ。",
      },
      {
        chinese: "大家里面请，随便坐。",
        japanese: "皆さん中へどうぞ、ご自由にお座りください。",
      },
      {
        chinese: "别站在门口，里面请。",
        japanese: "入り口に立っていないで、中へどうぞ。",
      },
    ],
  },
  {
    id: 2274,
    char: "麻烦你了",
    pinyin: "máfan nǐ le",
    meaning: "お手数おかけします",
    category: "定型表現",
    examples: [
      { chinese: "这事就麻烦你了。", japanese: "この件はお手数おかけします。" },
      {
        chinese: "真不好意思，麻烦你了。",
        japanese: "本当にすみません、お手数おかけしました。",
      },
      {
        chinese: "总要麻烦你，多谢。",
        japanese: "いつもお手数おかけして、ありがとうございます。",
      },
    ],
  },
  {
    id: 2275,
    char: "买单",
    pinyin: "mǎidān",
    meaning: "お会計",
    category: "動詞",
    examples: [
      { chinese: "服务员，买单。", japanese: "店員さん、お会計お願いします。" },
      { chinese: "今天谁买单？", japanese: "今日は誰がおごる（払う）の？" },
      { chinese: "我已经买单了。", japanese: "私はもう会計を済ませました。" },
    ],
  },
  {
    id: 2276,
    char: "没错吗",
    pinyin: "méi cuò ma",
    meaning: "間違いないですか",
    category: "フレーズ",
    examples: [
      { chinese: "你确定没错吗？", japanese: "本当に間違いないですか？" },
      {
        chinese: "这是你的，没错吗？",
        japanese: "これは君のだよね、間違いない？",
      },
      { chinese: "地址没错吗？", japanese: "住所は間違いないですか？" },
    ],
  },
  {
    id: 2277,
    char: "没问题",
    pinyin: "méi wèntí",
    meaning: "問題ない",
    category: "フレーズ",
    examples: [
      { chinese: "包在我身上，没问题。", japanese: "私に任せて、問題ないよ。" },
      {
        chinese: "这辆车没问题。",
        japanese: "この車は問題ありません（故障していません）。",
      },
      {
        chinese: "身体检查结果没问题。",
        japanese: "健康診断の結果は問題ありません。",
      },
    ],
  },
  {
    id: 2278,
    char: "明天见",
    pinyin: "míngtiān jiàn",
    meaning: "また明日",
    category: "定型表現",
    examples: [
      { chinese: "下班了，明天见。", japanese: "仕事終わり、また明日。" },
      { chinese: "各位，明天见。", japanese: "皆さん、また明日。" },
      { chinese: "希望明天见。", japanese: "明日お会いできることを望みます。" },
    ],
  },
  {
    id: 2279,
    char: "你多大了？",
    pinyin: "nǐ duō dà le?",
    meaning: "あなたはおいくつですか？",
    category: "フレーズ",
    examples: [
      {
        chinese: "小朋友，你多大了？",
        japanese: "お嬢ちゃん、いくつになったの？",
      },
      {
        chinese: "你问她多大了？",
        japanese: "彼女にいくつになったか聞きましたか？",
      },
      { chinese: "这棵树多大了？", japanese: "この木は樹齢どれくらいですか？" },
    ],
  },
  {
    id: 2280,
    char: "你好",
    pinyin: "nǐ hǎo",
    meaning: "こんにちは",
    category: "定型表現",
    examples: [
      { chinese: "老师，你好。", japanese: "先生、こんにちは。" },
      {
        chinese: "你好，很高兴认识你。",
        japanese: "こんにちは、お知り合いになれて嬉しいです。",
      },
      { chinese: "大家你好。", japanese: "みなさん、こんにちは。" },
    ],
  },
  {
    id: 2281,
    char: "你几岁了",
    pinyin: "nǐ jǐ suì le",
    meaning: "あなたは何歳ですか",
    category: "フレーズ",
    examples: [
      { chinese: "你几岁了？", japanese: "何歳ですか？（子供に対して）" },
      { chinese: "告诉我你几岁了？", japanese: "何歳か教えてくれる？" },
      { chinese: "你儿子几岁了？", japanese: "息子さんはおいくつですか？" },
    ],
  },
  {
    id: 2282,
    char: "你叫什么名字",
    pinyin: "nǐ jiào shénme míngzi",
    meaning: "お名前は何ですか",
    category: "フレーズ",
    examples: [
      {
        chinese: "请问，你叫什么名字？",
        japanese: "すみません、お名前は何ですか？",
      },
      {
        chinese: "那只狗叫什么名字？",
        japanese: "あの犬の名前は何と言いますか？",
      },
      {
        chinese: "我不记得你叫什么名字了。",
        japanese: "あなたの名前が何だったか覚えていません。",
      },
    ],
  },
  {
    id: 2283,
    char: "你呢？",
    pinyin: "nǐ ne?",
    meaning: "あなたは？",
    category: "フレーズ",
    examples: [
      { chinese: "我是中国人，你呢？", japanese: "私は中国人です、あなたは？" },
      {
        chinese: "我很开心，你呢？",
        japanese: "私はとても楽しいです、あなたは？",
      },
      { chinese: "我不去，你呢？", japanese: "私は行きませんが、あなたは？" },
    ],
  },
  {
    id: 2284,
    char: "你说呢？",
    pinyin: "nǐ shuō ne?",
    meaning: "どう思う？",
    category: "フレーズ",
    examples: [
      {
        chinese: "这事怎么办，你说呢？",
        japanese: "これはどうしようか、君はどう思う？",
      },
      {
        chinese: "这样做好不好，你说呢？",
        japanese: "こうやるのはいいかな、どう思う？",
      },
      { chinese: "这是谁的错，你说呢？", japanese: "これは誰のせいだと思う？" },
    ],
  },
  {
    id: 2285,
    char: "您贵姓？",
    pinyin: "nín guìxìng?",
    meaning: "お名前は？",
    category: "フレーズ",
    examples: [
      {
        chinese: "先生，您贵姓？",
        japanese: "お客様、お名前（苗字）は？（敬語）",
      },
      {
        chinese: "请问您贵姓？",
        japanese: "お名前をお伺いしてもよろしいですか？",
      },
      { chinese: "免贵姓王。", japanese: "王と申します（「貴姓」への返答）。" },
    ],
  },
  {
    id: 2286,
    char: "您好",
    pinyin: "nín hǎo",
    meaning: "こんにちは（敬語）",
    category: "定型表現",
    examples: [
      { chinese: "爷爷，您好。", japanese: "おじいさん、こんにちは。" },
      {
        chinese: "经理，您好。",
        japanese: "マネージャー（社長）、こんにちは。",
      },
      { chinese: "您好，请这边走。", japanese: "こんにちは、こちらへどうぞ。" },
    ],
  },
  {
    id: 2287,
    char: "您慢走",
    pinyin: "nín màn zǒu",
    meaning: "どうぞお気をつけて",
    category: "定型表現",
    examples: [
      {
        chinese: "再见，您慢走。",
        japanese: "さようなら、どうぞお気をつけて。",
      },
      {
        chinese: "不用送了，您慢走。",
        japanese: "送らなくて結構です、お気をつけて。",
      },
      {
        chinese: "天黑了，您慢走。",
        japanese: "暗くなりましたから、お気をつけて。",
      },
    ],
  },
  {
    id: 2288,
    char: "您请",
    pinyin: "nín qǐng",
    meaning: "あなたにお願いします",
    category: "フレーズ",
    examples: [
      {
        chinese: "这事还得您请。",
        japanese: "この件はやはりあなたにお願いします。",
      },
      { chinese: "您请上座。", japanese: "どうぞ上座にお座りください。" },
      { chinese: "您请先说。", japanese: "お先にどうぞお話しください。" },
    ],
  },
  {
    id: 2289,
    char: "您先请",
    pinyin: "nín xiān qǐng",
    meaning: "お先にどうぞ",
    category: "定型表現",
    examples: [
      {
        chinese: "电梯来了，您先请。",
        japanese: "エレベーターが来ました、お先にどうぞ。",
      },
      {
        chinese: "您是长辈，您先请。",
        japanese: "あなたは目上の方ですから、お先にどうぞ。",
      },
      {
        chinese: "我不急，您先请。",
        japanese: "急いでいませんので、お先にどうぞ。",
      },
    ],
  },
  {
    id: 2290,
    char: "茄子！",
    pinyin: "qiézi!",
    meaning: "チーズ！",
    category: "定型表現",
    examples: [
      {
        chinese: "拍照了，大家喊“茄子”！",
        japanese: "写真撮るよ、みんな「チーズ」って言って！",
      },
      { chinese: "笑一笑，茄子！", japanese: "笑って、はいチーズ！" },
      { chinese: "大家一起说：茄子！", japanese: "みんな一緒に：はいチーズ！" },
    ],
  },
  {
    id: 2291,
    char: "请等一下",
    pinyin: "qǐng děng yíxià",
    meaning: "少々お待ちください",
    category: "定型表現",
    examples: [
      {
        chinese: "请等一下，我马上回来。",
        japanese: "少々お待ちください、すぐ戻ります。",
      },
      {
        chinese: "请等一下，我也去。",
        japanese: "待ってください、私も行きます。",
      },
      {
        chinese: "麻烦请等一下。",
        japanese: "すみませんが少々お待ちください。",
      },
    ],
  },
  {
    id: 2292,
    char: "请多关照",
    pinyin: "qǐng duō guānzhào",
    meaning: "よろしくお願いします",
    category: "定型表現",
    examples: [
      { chinese: "以后请多关照。", japanese: "これからよろしくお願いします。" },
      {
        chinese: "我是新来的，请多关照。",
        japanese: "新入りです、よろしくお願いします。",
      },
      {
        chinese: "彼此彼此，请多关照。",
        japanese: "こちらこそ、よろしくお願いします。",
      },
    ],
  },
  {
    id: 2293,
    char: "请进",
    pinyin: "qǐng jìn",
    meaning: "お入りください",
    category: "定型表現",
    examples: [
      {
        chinese: "敲门后，老师说“请进”。",
        japanese: "ノックした後、先生は「お入りください」と言った。",
      },
      {
        chinese: "快请进，外面冷。",
        japanese: "早く中へ入ってください、外は寒いです。",
      },
      {
        chinese: "门没锁，请进。",
        japanese: "鍵はかかっていません、お入りください。",
      },
    ],
  },
  {
    id: 2294,
    char: "请留步",
    pinyin: "qǐng liúbù",
    meaning: "ここで結構です",
    category: "定型表現",
    examples: [
      {
        chinese: "不用送了，请留步。",
        japanese: "送らなくて大丈夫です、ここで結構です。",
      },
      {
        chinese: "您请留步，我自己走。",
        japanese: "ここで結構です、自分で行きます。",
      },
      {
        chinese: "外面下雨，请留步。",
        japanese: "外は雨ですから、ここで結構です。",
      },
    ],
  },
  {
    id: 2295,
    char: "请再说一遍",
    pinyin: "qǐng zài shuō yí biàn",
    meaning: "もう一度言ってください",
    category: "フレーズ",
    examples: [
      {
        chinese: "我没听清，请再说一遍。",
        japanese: "よく聞こえませんでした、もう一度言ってください。",
      },
      {
        chinese: "请再说一遍你的电话号码。",
        japanese: "もう一度電話番号を言ってください。",
      },
      {
        chinese: "对不起，请再说一遍。",
        japanese: "すみません、もう一度言ってください。",
      },
    ],
  },
  {
    id: 2296,
    char: "请坐",
    pinyin: "qǐng zuò",
    meaning: "座ってください",
    category: "定型表現",
    examples: [
      { chinese: "别客气，请坐。", japanese: "遠慮しないで、座ってください。" },
      { chinese: "大家请坐。", japanese: "皆さん座ってください。" },
      { chinese: "请坐下来喝杯茶。", japanese: "座ってお茶を飲んでください。" },
    ],
  },
  {
    id: 2297,
    char: "请问",
    pinyin: "qǐngwèn",
    meaning: "おたずねしますが",
    category: "定型表现",
    examples: [
      {
        chinese: "请问，车站在哪儿？",
        japanese: "おたずねしますが、駅はどこですか？",
      },
      { chinese: "请问，现在几点了？", japanese: "すみません、今何時ですか？" },
      {
        chinese: "请问，这里有人吗？",
        japanese: "すみません、ここは空いていますか（誰かいますか）？",
      },
    ],
  },
  {
    id: 2298,
    char: "求求你",
    pinyin: "qiúqiú nǐ",
    meaning: "お願い",
    category: "フレーズ",
    examples: [
      { chinese: "求求你，帮帮我吧。", japanese: "お願い、助けて。" },
      { chinese: "求求你别告诉他。", japanese: "お願い、彼には言わないで。" },
      { chinese: "我求求你了。", japanese: "お願いだから。" },
    ],
  },
  {
    id: 2299,
    char: "让你久等了",
    pinyin: "ràng nǐ jiǔ děng le",
    meaning: "お待たせしました",
    category: "定型表現",
    examples: [
      {
        chinese: "不好意思，让你久等了。",
        japanese: "すみません、お待たせしました。",
      },
      { chinese: "真是让你久等了。", japanese: "本当にお待たせしました。" },
      {
        chinese: "对不起，让你久等了。",
        japanese: "ごめんなさい、お待たせしました。",
      },
    ],
  },
  {
    id: 2300,
    char: "人民币",
    pinyin: "rénmínbì",
    meaning: "人民元",
    category: "名詞",
    examples: [
      { chinese: "一百块人民币。", japanese: "100人民元。" },
      { chinese: "我可以用人民币吗？", japanese: "人民元は使えますか？" },
      {
        chinese: "人民币现在很值钱。",
        japanese: "人民元は今とても価値があります。",
      },
    ],
  },
  {
    id: 2301,
    char: "日元",
    pinyin: "rìyuán",
    meaning: "日本円",
    category: "名詞",
    examples: [
      { chinese: "一千日元。", japanese: "1000円。" },
      {
        chinese: "我要把美元换成日元。",
        japanese: "ドルを日本円に両替したいです。",
      },
      { chinese: "这东西多少日元？", japanese: "これは何円ですか？" },
    ],
  },
  {
    id: 2302,
    char: "生日快乐！",
    pinyin: "shēngrì kuàilè!",
    meaning: "お誕生日おめでとう！",
    category: "定型表現",
    examples: [
      { chinese: "祝你生日快乐！", japanese: "お誕生日おめでとう！" },
      {
        chinese: "生日快乐！这是送给你的礼物。",
        japanese: "お誕生日おめでとう！これはプレゼントです。",
      },
      {
        chinese: "大家一起唱生日快乐歌。",
        japanese: "みんなでハッピーバースデーの歌を歌いましょう。",
      },
    ],
  },
  {
    id: 2303,
    char: "什么时候？",
    pinyin: "shénme shíhou?",
    meaning: "いつですか？",
    category: "フレーズ",
    examples: [
      { chinese: "你什么时候回来？", japanese: "いつ帰ってくるの？" },
      { chinese: "什么时候开始？", japanese: "いつ始まりますか？" },
      { chinese: "你什么时候有空？", japanese: "いつ時間がありますか？" },
    ],
  },
  {
    id: 2304,
    char: "说好了",
    pinyin: "shuō hǎo le",
    meaning: "約束しました",
    category: "フレーズ",
    examples: [
      { chinese: "我们说好了明天去。", japanese: "明日行くって約束したよね。" },
      { chinese: "说好了不生气的。", japanese: "怒らないって約束したでしょ。" },
      {
        chinese: "那就这么说好了。",
        japanese: "じゃあそういうことで（約束ね）。",
      },
    ],
  },
  {
    id: 2305,
    char: "随便用",
    pinyin: "suíbiàn yòng",
    meaning: "ご自由にお使いください",
    category: "フレーズ",
    examples: [
      {
        chinese: "这笔你随便用。",
        japanese: "このペンはご自由にお使いください。",
      },
      {
        chinese: "家里的东西随便用。",
        japanese: "家にあるものは自由に使って。",
      },
      {
        chinese: "网是免费的，随遍用。",
        japanese: "ネットは無料だから、自由に使って。",
      },
    ],
  },
  {
    id: 2306,
    char: "太好了",
    pinyin: "tài hǎo le",
    meaning: "いいね",
    category: "フレーズ",
    examples: [
      { chinese: "明天放假，太好了！", japanese: "明日は休みだ、やったね！" },
      {
        chinese: "你能来真是太好了。",
        japanese: "あなたが来てくれて本当によかった。",
      },
      { chinese: "这消息太好了。", japanese: "これは素晴らしいニュースだ。" },
    ],
  },
  {
    id: 2307,
    char: "讨厌",
    pinyin: "tǎoyàn",
    meaning: "嫌い",
    category: "形容詞",
    examples: [
      { chinese: "我讨厌下雨天。", japanese: "雨の日は嫌いです。" },
      { chinese: "这个时候真讨厌。", japanese: "この人は本当に嫌な奴だ。" },
      {
        chinese: "别做让人讨厌的事。",
        japanese: "人に嫌われるようなことはしないで。",
      },
    ],
  },
  {
    id: 2308,
    char: "听你的",
    pinyin: "tīng nǐ de",
    meaning: "あなたの言う通りにします",
    category: "フレーズ",
    examples: [
      {
        chinese: "好吧，听你的。",
        japanese: "わかった、君の言う通りにするよ。",
      },
      {
        chinese: "今天吃什么？听你的。",
        japanese: "今日何食べる？君に任せるよ。",
      },
      { chinese: "我都听你的。", japanese: "全部君の言う通りにするよ。" },
    ],
  },
  {
    id: 2309,
    char: "同意",
    pinyin: "tóngyì",
    meaning: "同意する",
    category: "動詞",
    examples: [
      {
        chinese: "我完全同意你的看法。",
        japanese: "あなたの意見に完全に同意します。",
      },
      {
        chinese: "大家不同意这个计划。",
        japanese: "みんなこの計画に同意していません。",
      },
      {
        chinese: "如果你同意，我们就开始。",
        japanese: "もし同意してくれるなら、始めましょう。",
      },
    ],
  },
  {
    id: 2310,
    char: "我看",
    pinyin: "wǒ kàn",
    meaning: "私の考えでは",
    category: "フレーズ",
    examples: [
      {
        chinese: "我看这事不简单。",
        japanese: "私の考えでは、これは簡単ではない。",
      },
      { chinese: "我看要下雨。", japanese: "雨が降りそうだと思う。" },
      {
        chinese: "我看你也累了，休息吧。",
        japanese: "君も疲れているようだから、休んだらどう？",
      },
    ],
  },
  {
    id: 2311,
    char: "我来",
    pinyin: "wǒ lái",
    meaning: "私がやります",
    category: "フレーズ",
    examples: [
      {
        chinese: "放着别动，我来。",
        japanese: "そのままにして、私がやります。",
      },
      {
        chinese: "这里有我，我来处理。",
        japanese: "ここは私に任せて、私が処理します。",
      },
      {
        chinese: "谁去买票？我来。",
        japanese: "誰がチケットを買いに行く？私がやります。",
      },
    ],
  },
  {
    id: 2312,
    char: "我请客",
    pinyin: "wǒ qǐngkè",
    meaning: "私がおごります",
    category: "フレーズ",
    examples: [
      {
        chinese: "今天我请客，大家随便吃。",
        japanese: "今日は私がおごるから、みんな好きに食べて。",
      },
      {
        chinese: "不用你付钱，我请客。",
        japanese: "払わなくていいよ、私がおごるから。",
      },
      { chinese: "下次我请客。", japanese: "次回は私がおごります。" },
    ],
  },
  {
    id: 2313,
    char: "我先走了",
    pinyin: "wǒ xiān zǒu le",
    meaning: "お先に失礼します",
    category: "定型表現",
    examples: [
      { chinese: "各位，我先走了。", japanese: "皆さん、お先に失礼します。" },
      {
        chinese: "家里有事，我先走了。",
        japanese: "家で用事があるので、お先に失礼します。",
      },
      { chinese: "我先走了，明天见。", japanese: "お先に帰ります、また明日。" },
    ],
  },
  {
    id: 2314,
    char: "无所谓",
    pinyin: "wúsuǒwèi",
    meaning: "どうでもいい",
    category: "フレーズ",
    examples: [
      {
        chinese: "吃什么都行，我无所谓。",
        japanese: "何を食べてもいいよ、僕はどうでもいい（気にしない）。",
      },
      {
        chinese: "去不去我无所谓。",
        japanese: "行くかどうかはどちらでもいいです。",
      },
      {
        chinese: "我对此无所谓。",
        japanese: "私はそれに対してこだわりはありません。",
      },
    ],
  },
  {
    id: 2315,
    char: "小意思",
    pinyin: "xiǎo yìsi",
    meaning: "心ばかりのもの",
    category: "フレーズ",
    examples: [
      {
        chinese: "这点礼物，小意思。",
        japanese: "これっぽっちのプレゼントですが、ほんの気持ちです。",
      },
      {
        chinese: "这对我来说只是小意思。",
        japanese: "これは私にとっては朝飯前です（簡単なことです）。",
      },
      {
        chinese: "别客气，小意思。",
        japanese: "遠慮しないで、ほんの気持ちだから。",
      },
    ],
  },
  {
    id: 2316,
    char: "辛苦了",
    pinyin: "xīnkǔ le",
    meaning: "ご苦労様です",
    category: "定型表現",
    examples: [
      { chinese: "大家辛苦了。", japanese: "みなさんお疲れ様でした。" },
      { chinese: "老师辛苦了。", japanese: "先生、お疲れ様でした。" },
      { chinese: "辛苦你了。", japanese: "ご苦労様、お疲れ様。" },
    ],
  },
  {
    id: 2317,
    char: "新年快乐！",
    pinyin: "xīnnián kuàilè!",
    meaning: "あけましておめでとう！",
    category: "定型表現",
    examples: [
      {
        chinese: "新年快乐，万事如意！",
        japanese: "あけましておめでとう、全て順調でありますように！",
      },
      { chinese: "祝大家新年快乐！", japanese: "みなさん、新年おめでとう！" },
      {
        chinese: "新年快乐，红包拿来。",
        japanese: "新年おめでとう、お年玉ちょうだい（冗談）。",
      },
    ],
  },
  {
    id: 2318,
    char: "一路平安",
    pinyin: "yílù píng'ān",
    meaning: "道中ご無事で",
    category: "定型表現",
    examples: [
      { chinese: "祝你一路平安！", japanese: "道中ご無事で！" },
      {
        chinese: "再见，一路平安。",
        japanese: "さようなら、気をつけて行ってらっしゃい。",
      },
      { chinese: "希望你一路平安。", japanese: "の無事を祈っています。" },
    ],
  },
  {
    id: 2319,
    char: "有道理",
    pinyin: "yǒu dàolǐ",
    meaning: "理にかなっている",
    category: "フレーズ",
    examples: [
      { chinese: "你说得有道理。", japanese: "君の言うことはもっともだ。" },
      { chinese: "这話很有道理。", japanese: "この話はとても筋が通っている。" },
      {
        chinese: "我觉得他说的有道理。",
        japanese: "彼の言っていることは理にかなっていると思う。",
      },
    ],
  },
  {
    id: 2320,
    char: "元（块）",
    pinyin: "yuán",
    meaning: "元",
    category: "名詞",
    examples: [
      { chinese: "五元钱。", japanese: "5元。" },
      { chinese: "一斤多少元？", japanese: "500gいくらですか？" },
      { chinese: "这件衣服五十元。", japanese: "この服は50元です。" },
    ],
  },
  {
    id: 2321,
    char: "再说吧",
    pinyin: "zài shuō ba",
    meaning: "またあとにしましょう",
    category: "フレーズ",
    examples: [
      {
        chinese: "这事以后再说吧。",
        japanese: "この件はまた後で話しましょう。",
      },
      {
        chinese: "如果不成，再说吧。",
        japanese: "もしだめなら、その時また考えよう。",
      },
      { chinese: "改天再说吧。", japanese: "後日また話しましょう。" },
    ],
  },
  {
    id: 2322,
    char: "赞成",
    pinyin: "zànchéng",
    meaning: "賛成する",
    category: "動詞",
    examples: [
      {
        chinese: "大家都很赞成这个计划。",
        japanese: "みんなその計画に賛成しています。",
      },
      { chinese: "我赞成你的意见。", japanese: "私はあなたの意見に賛成です。" },
      { chinese: "谁赞成，谁反对？", japanese: "誰が賛成で、誰が反対ですか？" },
    ],
  },
  {
    id: 2323,
    char: "糟了",
    pinyin: "zāo le",
    meaning: "まずい",
    category: "フレーズ",
    examples: [
      { chinese: "糟了，我忘了带钥匙。", japanese: "しまった、鍵を忘れた。" },
      { chinese: "糟了，要迟到了。", japanese: "やばい、遅刻する。" },
      { chinese: "这下糟了。", japanese: "こりゃまずいことになった。" },
    ],
  },
  {
    id: 2324,
    char: "怎么办？",
    pinyin: "zěnme bàn?",
    meaning: "どうしましょう",
    category: "フレーズ",
    examples: [
      { chinese: "车坏了，怎么办？", japanese: "車が壊れた、どうしよう？" },
      {
        chinese: "我不知道该怎么办。",
        japanese: "どうすればいいのか分からない。",
      },
      { chinese: "你说怎么办？", japanese: "どうしたらいいと思う？" },
    ],
  },
  {
    id: 2325,
    char: "怎么了？",
    pinyin: "zěnme le?",
    meaning: "どうしました？",
    category: "フレーズ",
    examples: [
      {
        chinese: "你脸色不好，怎么了？",
        japanese: "顔色が悪いけど、どうしたの？",
      },
      {
        chinese: "怎么了？发生了什么事？",
        japanese: "どうしたの？何があったの？",
      },
      {
        chinese: "你怎么了？不高兴吗？",
        japanese: "どうしたの？機嫌が悪いの？",
      },
    ],
  },
  {
    id: 2326,
    char: "真棒",
    pinyin: "zhēn bàng",
    meaning: "すばらしい",
    category: "形容詞",
    examples: [
      {
        chinese: "你的表现真棒！",
        japanese: "君のパフォーマンスは素晴らしい！",
      },
      { chinese: "你真棒！", japanese: "君はすごいね！" },
      { chinese: "这个主意真棒。", japanese: "そのアイデアは素晴らしい。" },
    ],
  },
  {
    id: 2327,
    char: "真的",
    pinyin: "zhēn de",
    meaning: "ほんとうに",
    category: "副詞",
    examples: [
      { chinese: "我真的很高兴。", japanese: "私は本当に嬉しいです。" },
      { chinese: "你是真的不知道吗？", japanese: "本当に知らないのですか？" },
      {
        chinese: "我说的都是真的。",
        japanese: "私が言っていることは全て本当です。",
      },
    ],
  },
  {
    id: 2328,
    char: "真烦人",
    pinyin: "zhēn fán rén",
    meaning: "やっかいだ",
    category: "フレーズ",
    examples: [
      { chinese: "这蚊子真烦人。", japanese: "この蚊は本当にうっとうしい。" },
      { chinese: "这件事真烦人。", japanese: "この件は本当に面倒くさい。" },
      { chinese: "他有时候真烦人。", japanese: "彼は時々本当にうっとうしい。" },
    ],
  },
  {
    id: 2329,
    char: "真精神",
    pinyin: "zhēn jīngshén",
    meaning: "元気である",
    category: "フレーズ",
    examples: [
      {
        chinese: "爷爷看起来真精神。",
        japanese: "おじいさんはとても元気そうだ。",
      },
      {
        chinese: "你穿这件衣服真精神。",
        japanese: "その服を着るととても活発に見える（よく似合っている）。",
      },
      { chinese: "小伙子真精神。", japanese: "若者はとても元気だ。" },
    ],
  },
  {
    id: 2330,
    char: "真帅",
    pinyin: "zhēn shuài",
    meaning: "かっこいい",
    category: "形容詞",
    examples: [
      {
        chinese: "他今天穿得真帅。",
        japanese: "彼は今日とてもかっこいい服を着ている。",
      },
      { chinese: "那个演员真帅。", japanese: "あの俳優は本当にかっこいい。" },
      { chinese: "你真帅！", japanese: "君かっこいいじゃん！" },
    ],
  },
  {
    id: 2331,
    char: "正合适",
    pinyin: "zhèng héshì",
    meaning: "おあつらえ向き",
    category: "フレーズ",
    examples: [
      {
        chinese: "这双鞋大小正合适。",
        japanese: "この靴のサイズはぴったりだ。",
      },
      {
        chinese: "这个时候去正合适。",
        japanese: "この時期に行くのがちょうどいい。",
      },
      { chinese: "这件衣服正合适。", japanese: "この服はぴったりです。" },
    ],
  },
  {
    id: 2332,
    char: "知道了",
    pinyin: "zhīdao le",
    meaning: "わかりました",
    category: "フレーズ",
    examples: [
      { chinese: "好的，我知道了。", japanese: "はい、わかりました。" },
      { chinese: "知道了，别啰嗦。", japanese: "分かってるよ、うるさいな。" },
      {
        chinese: "我知道了，马上就去。",
        japanese: "分かりました、すぐに行きます。",
      },
    ],
  },
];
