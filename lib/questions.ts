import { Question } from "./types";

export const childQuestions: Question[] = [
  // ── わくわく冒険タイプ（4問）──────────────────────────────
  {
    id: 1,
    text: "子どもは新しいことや場所にすぐ興味を持ち、次々と違うことに挑戦しますか？",
    framework: "steiner",
    dimension: "sanguine",
    forWhom: "child",
  },
  {
    id: 2,
    text: "初めて会った人ともすぐに打ち解けて話しかけたり、一緒に遊ぼうとしますか？",
    framework: "steiner",
    dimension: "sanguine",
    forWhom: "child",
  },
  {
    id: 3,
    text: "遊びの途中でも「次はこれ！」と次々新しいことをやりたがりますか？",
    framework: "steiner",
    dimension: "sanguine",
    forWhom: "child",
  },
  {
    id: 4,
    text: "気持ちが顔や態度にすぐ出て、嬉しい・悲しいがわかりやすいですか？",
    framework: "steiner",
    dimension: "sanguine",
    forWhom: "child",
  },

  // ── 熱血チャレンジャータイプ（4問）──────────────────────────────
  {
    id: 5,
    text: "自分のやり方にこだわりが強く、思い通りにならないと激しく怒ることがありますか？",
    framework: "steiner",
    dimension: "choleric",
    forWhom: "child",
  },
  {
    id: 6,
    text: "自分のやりたいことを「こうしよう！」とはっきり言ったり、友達を引っ張って遊ぼうとすることがありますか？",
    framework: "steiner",
    dimension: "choleric",
    forWhom: "child",
  },
  {
    id: 7,
    text: "負けたり失敗したとき、悔しがって怒ったり、何度も諦めずに挑戦しようとしますか？",
    framework: "steiner",
    dimension: "choleric",
    forWhom: "child",
  },
  {
    id: 8,
    text: "「自分でやる！」「こっちがいい！」と自分の意志をはっきり主張することがありますか？",
    framework: "steiner",
    dimension: "choleric",
    forWhom: "child",
  },

  // ── ほっこりマイペースタイプ（4問）──────────────────────────────
  {
    id: 9,
    text: "急な予定変更や環境の変化があると、戸惑ったりなかなか切り替えられませんか？",
    framework: "steiner",
    dimension: "phlegmatic",
    forWhom: "child",
  },
  {
    id: 10,
    text: "マイペースにコツコツ取り組むことが得意で、じっくり集中できますか？",
    framework: "steiner",
    dimension: "phlegmatic",
    forWhom: "child",
  },
  {
    id: 11,
    text: "食事・睡眠・遊びなど毎日のリズムが安定していて崩れにくいですか？",
    framework: "steiner",
    dimension: "phlegmatic",
    forWhom: "child",
  },
  {
    id: 12,
    text: "初めての場所や知らない人には、すぐに馴染まずしばらく様子を見てから動き出しますか？",
    framework: "steiner",
    dimension: "phlegmatic",
    forWhom: "child",
  },

  // ── おもいやり深い共感タイプ（4問）──────────────────────────────
  {
    id: 13,
    text: "誰かが悲しんでいたり困っていたりすると、自分も辛そうにして一緒に感じますか？",
    framework: "steiner",
    dimension: "melancholic",
    forWhom: "child",
  },
  {
    id: 14,
    text: "おもちゃや遊びを選ぶとき、じっくり時間をかけて慎重に選びますか？",
    framework: "steiner",
    dimension: "melancholic",
    forWhom: "child",
  },
  {
    id: 15,
    text: "失敗したり注意されたとき、なかなか気持ちが切り替えられず引きずることがありますか？",
    framework: "steiner",
    dimension: "melancholic",
    forWhom: "child",
  },
  {
    id: 16,
    text: "嬉しいことがあっても大はしゃぎせず、あとからじわじわ喜んだり、時間が経ってから「楽しかった」と話してくれることがありますか？",
    framework: "steiner",
    dimension: "melancholic",
    forWhom: "child",
  },

  // ── 得意な遊び方（8問）────────────────────────────────────────
  {
    id: 17,
    text: "絵本・お話・言葉遊びが大好きで、話すこと・聞くことを楽しんでいますか？",
    framework: "mi",
    dimension: "linguistic",
    forWhom: "child",
  },
  {
    id: 18,
    text: "「これなに？」「なんで？」「どうして？」とよく質問してきて、いろんなことに興味津々ですか？",
    framework: "mi",
    dimension: "logical",
    forWhom: "child",
  },
  {
    id: 19,
    text: "絵を描いたり、ブロック・パズルで何かを作ることが特に好きですか？",
    framework: "mi",
    dimension: "spatial",
    forWhom: "child",
  },
  {
    id: 20,
    text: "音楽に合わせて自然に体を動かしたり、歌ったり、リズムをとるのが好きですか？",
    framework: "mi",
    dimension: "musical",
    forWhom: "child",
  },
  {
    id: 21,
    text: "じっと座っているより体を動かしたり手を使っている方が、楽しそうにしていますか？",
    framework: "mi",
    dimension: "bodily",
    forWhom: "child",
  },
  {
    id: 22,
    text: "周りの子が泣いていたり悲しそうにしていると、つられて悲しくなったり、そっと声をかけようとすることがありますか？",
    framework: "mi",
    dimension: "interpersonal",
    forWhom: "child",
  },
  {
    id: 23,
    text: "うれしいことがあると体全体で喜んだり、「いや！」「やだ！」と気持ちを全力で表現することがありますか？また自分の気持ちをよく話してくれますか？",
    framework: "mi",
    dimension: "intrapersonal",
    forWhom: "child",
  },
  {
    id: 24,
    text: "動物・植物・虫などに強い関心を持ち、観察したり集めたりすることが好きですか？",
    framework: "mi",
    dimension: "naturalist",
    forWhom: "child",
  },

  // ── エネルギーの方向（4問）──────────────────────────────
  {
    id: 25,
    text: "大勢の人がいる場所（公園・誕生日会など）で特に元気が出て、楽しそうにしますか？",
    framework: "jung",
    dimension: "extrovert",
    forWhom: "child",
  },
  {
    id: 26,
    text: "一人でじっくり遊ぶことや、静かな場所でのんびりすることを好みますか？",
    framework: "jung",
    dimension: "introvert",
    forWhom: "child",
  },
  {
    id: 27,
    text: "お友達や兄弟と一緒にいるとき、一人のときより特に楽しそうに生き生きとしていますか？",
    framework: "jung",
    dimension: "extrovert",
    forWhom: "child",
  },
  {
    id: 28,
    text: "知らない人が多い場所では、しばらく様子を見てからゆっくり動き出しますか？",
    framework: "jung",
    dimension: "introvert",
    forWhom: "child",
  },
];

export const parentQuestions: Question[] = [
  // ── わくわく冒険タイプ（2問）──────────────────────────────
  {
    id: 1,
    text: "子育ての方針やルールをよく変えてしまったり、新しいやり方を試したくなりますか？",
    framework: "steiner",
    dimension: "sanguine",
    forWhom: "parent",
  },
  {
    id: 2,
    text: "気分が乗ると子どもと一緒に夢中になりすぎて、時間を忘れてしまうことがありますか？",
    framework: "steiner",
    dimension: "sanguine",
    forWhom: "parent",
  },

  // ── 熱血チャレンジャータイプ（3問）──────────────────────────────
  {
    id: 3,
    text: "子どもがなかなか言うことを聞いてくれないとき、感情的になってしまうことがありますか？",
    framework: "steiner",
    dimension: "choleric",
    forWhom: "parent",
  },
  {
    id: 4,
    text: "子どもに対して「こうしてほしい」という自分なりのこだわりや基準を大切にしていますか？",
    framework: "steiner",
    dimension: "choleric",
    forWhom: "parent",
  },
  {
    id: 5,
    text: "子育てに「こうしたい」という熱い思いがあり、手を抜けないと感じますか？",
    framework: "steiner",
    dimension: "choleric",
    forWhom: "parent",
  },

  // ── ほっこりマイペースタイプ（2問）──────────────────────────────
  {
    id: 6,
    text: "子育てで予期しないことが起きても、比較的冷静にのんびり対処できる方ですか？",
    framework: "steiner",
    dimension: "phlegmatic",
    forWhom: "parent",
  },
  {
    id: 7,
    text: "子どものペースに合わせてゆっくり待つことが、比較的得意な方ですか？",
    framework: "steiner",
    dimension: "phlegmatic",
    forWhom: "parent",
  },

  // ── おもいやり深い共感タイプ（3問）──────────────────────────────
  {
    id: 8,
    text: "子どもの小さな変化や表情の違いにすぐ気づき、「何かあったのかな」と感じますか？",
    framework: "steiner",
    dimension: "melancholic",
    forWhom: "parent",
  },
  {
    id: 9,
    text: "「あの対応でよかったのか」と後からよく考え込んだり、自分を責めることがありますか？",
    framework: "steiner",
    dimension: "melancholic",
    forWhom: "parent",
  },
  {
    id: 10,
    text: "子どもが傷ついていないか、寂しくないかと、つい心配しすぎてしまうことがありますか？",
    framework: "steiner",
    dimension: "melancholic",
    forWhom: "parent",
  },

  // ── 親御さんの強み（5問）────────────────────────────────
  {
    id: 11,
    text: "子どもに何かを伝えるとき、言葉で丁寧に説明するのが得意な方ですか？",
    framework: "mi",
    dimension: "linguistic",
    forWhom: "parent",
  },
  {
    id: 12,
    text: "計画を立てて行動したり、順序通りに物事を進めるのが得意な方ですか？",
    framework: "mi",
    dimension: "logical",
    forWhom: "parent",
  },
  {
    id: 13,
    text: "一緒に体を動かして遊んだり、実際にやって見せることで伝えるのが好きですか？",
    framework: "mi",
    dimension: "bodily",
    forWhom: "parent",
  },
  {
    id: 14,
    text: "子どもや周りの人の気持ちを察するのが得意で、場の雰囲気を読むのが上手いですか？",
    framework: "mi",
    dimension: "interpersonal",
    forWhom: "parent",
  },
  {
    id: 15,
    text: "一人で静かに考えたり、自分の感情や行動を振り返る時間を大切にしていますか？",
    framework: "mi",
    dimension: "intrapersonal",
    forWhom: "parent",
  },

  // ── エネルギーの方向（4問）──────────────────────────────
  {
    id: 16,
    text: "人と長く話した後、少し疲れを感じて一人の時間で回復したいと思いますか？",
    framework: "jung",
    dimension: "introvert",
    forWhom: "parent",
  },
  {
    id: 17,
    text: "子どもの友達の親や地域の人と積極的に関わるのが好きで、会話でエネルギーが出ますか？",
    framework: "jung",
    dimension: "extrovert",
    forWhom: "parent",
  },
  {
    id: 18,
    text: "一人の時間がないとだんだんストレスを感じ、余裕がなくなってきますか？",
    framework: "jung",
    dimension: "introvert",
    forWhom: "parent",
  },
  {
    id: 19,
    text: "子育ての悩みは誰かに話すとスッキリして、一人で抱えているより楽になりますか？",
    framework: "jung",
    dimension: "extrovert",
    forWhom: "parent",
  },
];
