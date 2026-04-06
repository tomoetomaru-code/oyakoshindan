import { Question } from "./types";

export const childQuestions: Question[] = [
  // ── シュタイナー4気質（8問）──────────────────────────────
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
    text: "自分のやり方にこだわりが強く、思い通りにならないと激しく怒ることがありますか？",
    framework: "steiner",
    dimension: "choleric",
    forWhom: "child",
  },
  {
    id: 4,
    text: "遊びの中で「こうしよう！」と提案したり、みんなをまとめようとすることがありますか？",
    framework: "steiner",
    dimension: "choleric",
    forWhom: "child",
  },
  {
    id: 5,
    text: "急な予定変更や環境の変化があると、戸惑ったりなかなか切り替えられませんか？",
    framework: "steiner",
    dimension: "phlegmatic",
    forWhom: "child",
  },
  {
    id: 6,
    text: "マイペースにコツコツ取り組むことが得意で、じっくり集中できますか？",
    framework: "steiner",
    dimension: "phlegmatic",
    forWhom: "child",
  },
  {
    id: 7,
    text: "誰かが悲しんでいたり困っていたりすると、自分も辛そうにして一緒に感じますか？",
    framework: "steiner",
    dimension: "melancholic",
    forWhom: "child",
  },
  {
    id: 8,
    text: "細かいことが気になり、やり直したり「うまくできなかった」と落ち込むことがありますか？",
    framework: "steiner",
    dimension: "melancholic",
    forWhom: "child",
  },

  // ── MI理論（8問）────────────────────────────────────────
  {
    id: 9,
    text: "絵本・お話・言葉遊びが大好きで、話すこと・聞くことを楽しんでいますか？",
    framework: "mi",
    dimension: "linguistic",
    forWhom: "child",
  },
  {
    id: 10,
    text: "「なぜ？」「どうして？」が多く、物事の仕組みやパターンを知りたがりますか？",
    framework: "mi",
    dimension: "logical",
    forWhom: "child",
  },
  {
    id: 11,
    text: "絵を描いたり、ブロック・パズルで何かを作ることが特に好きですか？",
    framework: "mi",
    dimension: "spatial",
    forWhom: "child",
  },
  {
    id: 12,
    text: "音楽に合わせて自然に体を動かしたり、歌ったり、リズムをとるのが好きですか？",
    framework: "mi",
    dimension: "musical",
    forWhom: "child",
  },
  {
    id: 13,
    text: "じっと座っているより体を動かしたり手を使っている方が、楽しそうにしていますか？",
    framework: "mi",
    dimension: "bodily",
    forWhom: "child",
  },
  {
    id: 14,
    text: "お友達と遊ぶのが大好きで、相手が悲しいときや嬉しいときを敏感に感じ取ることがありますか？",
    framework: "mi",
    dimension: "interpersonal",
    forWhom: "child",
  },
  {
    id: 15,
    text: "「楽しかった」「なんか嫌だった」など自分の気持ちをよく話してくれることがありますか？",
    framework: "mi",
    dimension: "intrapersonal",
    forWhom: "child",
  },
  {
    id: 16,
    text: "動物・植物・虫などに強い関心を持ち、観察したり集めたりすることが好きですか？",
    framework: "mi",
    dimension: "naturalist",
    forWhom: "child",
  },

  // ── ユング 内向/外向（4問）──────────────────────────────
  {
    id: 17,
    text: "大勢の人がいる場所（公園・誕生日会など）で特に元気が出て、楽しそうにしますか？",
    framework: "jung",
    dimension: "extrovert",
    forWhom: "child",
  },
  {
    id: 18,
    text: "一人でじっくり遊ぶことや、静かな場所でのんびりすることを好みますか？",
    framework: "jung",
    dimension: "introvert",
    forWhom: "child",
  },
  {
    id: 19,
    text: "グループ活動や集団の遊びのときに特に生き生きとしていますか？",
    framework: "jung",
    dimension: "extrovert",
    forWhom: "child",
  },
  {
    id: 20,
    text: "知らない人が多い場所では、しばらく様子を見てからゆっくり動き出しますか？",
    framework: "jung",
    dimension: "introvert",
    forWhom: "child",
  },
];

export const parentQuestions: Question[] = [
  // ── シュタイナー4気質（6問）──────────────────────────────
  {
    id: 1,
    text: "子育ての方針やルールをよく変えてしまったり、新しいやり方を試したくなりますか？",
    framework: "steiner",
    dimension: "sanguine",
    forWhom: "parent",
  },
  {
    id: 2,
    text: "子どもがなかなか言うことを聞いてくれないとき、感情的になってしまうことがありますか？",
    framework: "steiner",
    dimension: "choleric",
    forWhom: "parent",
  },
  {
    id: 3,
    text: "子どもに対して「こうしてほしい」という自分なりのこだわりや基準を大切にしていますか？",
    framework: "steiner",
    dimension: "choleric",
    forWhom: "parent",
  },
  {
    id: 4,
    text: "子育てで予期しないことが起きても、比較的冷静にのんびり対処できる方ですか？",
    framework: "steiner",
    dimension: "phlegmatic",
    forWhom: "parent",
  },
  {
    id: 5,
    text: "子どもの小さな変化や表情の違いにすぐ気づき、「何かあったのかな」と感じますか？",
    framework: "steiner",
    dimension: "melancholic",
    forWhom: "parent",
  },
  {
    id: 6,
    text: "「あの対応でよかったのか」と後からよく考え込んだり、自分を責めることがありますか？",
    framework: "steiner",
    dimension: "melancholic",
    forWhom: "parent",
  },

  // ── MI理論 親の強み（5問）────────────────────────────────
  {
    id: 7,
    text: "子どもに何かを伝えるとき、言葉で丁寧に説明するのが得意な方ですか？",
    framework: "mi",
    dimension: "linguistic",
    forWhom: "parent",
  },
  {
    id: 8,
    text: "計画を立てて行動したり、順序通りに物事を進めるのが得意な方ですか？",
    framework: "mi",
    dimension: "logical",
    forWhom: "parent",
  },
  {
    id: 9,
    text: "一緒に体を動かして遊んだり、実際にやって見せることで伝えるのが好きですか？",
    framework: "mi",
    dimension: "bodily",
    forWhom: "parent",
  },
  {
    id: 10,
    text: "子どもや周りの人の気持ちを察するのが得意で、場の雰囲気を読むのが上手いですか？",
    framework: "mi",
    dimension: "interpersonal",
    forWhom: "parent",
  },
  {
    id: 11,
    text: "一人で静かに考えたり、自分の感情や行動を振り返る時間を大切にしていますか？",
    framework: "mi",
    dimension: "intrapersonal",
    forWhom: "parent",
  },

  // ── ユング 内向/外向（4問）──────────────────────────────
  {
    id: 12,
    text: "人と長く話した後、少し疲れを感じて一人の時間で回復したいと思いますか？",
    framework: "jung",
    dimension: "introvert",
    forWhom: "parent",
  },
  {
    id: 13,
    text: "子どもの友達の親や地域の人と積極的に関わるのが好きで、会話でエネルギーが出ますか？",
    framework: "jung",
    dimension: "extrovert",
    forWhom: "parent",
  },
  {
    id: 14,
    text: "一人の時間がないとだんだんストレスを感じ、余裕がなくなってきますか？",
    framework: "jung",
    dimension: "introvert",
    forWhom: "parent",
  },
  {
    id: 15,
    text: "子育ての悩みは誰かに話すとスッキリして、一人で抱えているより楽になりますか？",
    framework: "jung",
    dimension: "extrovert",
    forWhom: "parent",
  },
];
