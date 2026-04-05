import { Question, ScoreSet, Profile, DiagnosisResult, SteinerType, MIType } from "./types";

// ── スコア計算 ────────────────────────────────────────────
export function calcScores(questions: Question[], answers: number[]): ScoreSet {
  const scores: ScoreSet = {
    steiner: { sanguine: 0, choleric: 0, phlegmatic: 0, melancholic: 0 },
    mi: {
      linguistic: 0, logical: 0, spatial: 0, musical: 0,
      bodily: 0, interpersonal: 0, intrapersonal: 0, naturalist: 0,
    },
    jung: { extrovert: 0, introvert: 0 },
  };

  questions.forEach((q, i) => {
    const raw = answers[i] ?? 0;
    const val = q.reversed ? 3 - raw : raw;

    if (q.framework === "steiner") {
      scores.steiner[q.dimension as SteinerType] += val;
    } else if (q.framework === "mi") {
      scores.mi[q.dimension as MIType] += val;
    } else {
      if (q.dimension === "extrovert") scores.jung.extrovert += val;
      else scores.jung.introvert += val;
    }
  });

  return scores;
}

function sortedEntries<T extends string>(obj: Record<T, number>): [T, number][] {
  return (Object.entries(obj) as [T, number][]).sort((a, b) => b[1] - a[1]);
}

export function buildProfile(scores: ScoreSet): Profile {
  const steinerSorted = sortedEntries(scores.steiner);
  const primaryTemperament = steinerSorted[0][0];
  const secondaryTemperament = steinerSorted[1][0];

  const miSorted = sortedEntries(scores.mi);
  const topIntelligences = miSorted.slice(0, 3).map(([k]) => k);

  const { extrovert, introvert } = scores.jung;
  const diff = extrovert - introvert;
  const orientation = diff >= 2 ? "extrovert" : diff <= -2 ? "introvert" : "ambi";

  return {
    primaryTemperament,
    secondaryTemperament,
    temperamentScores: scores.steiner,
    topIntelligences,
    miScores: scores.mi,
    orientation,
    jungScores: scores.jung,
  };
}

export function buildResult(
  childAnswers: number[],
  parentAnswers: number[],
  childQs: Question[],
  parentQs: Question[]
): DiagnosisResult {
  return {
    child: buildProfile(calcScores(childQs, childAnswers)),
    parent: buildProfile(calcScores(parentQs, parentAnswers)),
  };
}

// ── ラベル辞書 ────────────────────────────────────────────
export const steinerLabel: Record<SteinerType, string> = {
  sanguine: "好奇心ワクワクタイプ",
  choleric: "情熱パワフルタイプ",
  phlegmatic: "おだやかマイペースタイプ",
  melancholic: "繊細こだわりタイプ",
};

export const steinerColor: Record<SteinerType, string> = {
  sanguine: "#F5A623",
  choleric: "#E05A4E",
  phlegmatic: "#4A9B8E",
  melancholic: "#8B6BAE",
};

export const steinerEmoji: Record<SteinerType, string> = {
  sanguine: "🌟",
  choleric: "🔥",
  phlegmatic: "🌊",
  melancholic: "🌙",
};

export const miLabel: Record<MIType, string> = {
  linguistic: "言語",
  logical: "論理・数学",
  spatial: "空間",
  musical: "音楽",
  bodily: "身体運動",
  interpersonal: "対人",
  intrapersonal: "内省",
  naturalist: "博物",
};

export const miEmoji: Record<MIType, string> = {
  linguistic: "📖",
  logical: "🔢",
  spatial: "🎨",
  musical: "🎵",
  bodily: "⚽",
  interpersonal: "🤝",
  intrapersonal: "💭",
  naturalist: "🌿",
};

export const orientationLabel = {
  extrovert: "外向型",
  introvert: "内向型",
  ambi: "両向型",
};

// ── 気質ごとの解説 ────────────────────────────────────────
export const steinerDesc: Record<SteinerType, {
  title: string;
  tagline: string;
  strengths: string[];
  challenges: string[];
  parentTips: string[];
  supportYell: string;
}> = {
  sanguine: {
    title: "好奇心ワクワクタイプ",
    tagline: "好奇心いっぱいの自由な探検家",
    strengths: ["新しいことへの好奇心旺盛", "社交的でコミュニケーション上手", "感情表現が豊か", "どんな状況にも柔軟に対応"],
    challenges: ["集中が続きにくい", "約束や片付けが苦手", "気が散りやすい"],
    parentTips: [
      "「次は〇〇やろう！」と次の楽しみを見せながら切り替えを促す",
      "同じ教え方を繰り返さず、様々なアプローチで学びを豊かに",
      "飽きる前に短いゴールを設定し、達成感をこまめに与える",
      "片付けをゲーム感覚にするなど、楽しさに変換してあげる",
      "「今日どんな面白いことあった？」と会話を楽しむ時間を大切に",
    ],
    supportYell: "毎日ドタバタしていても、あなたはしっかりお子さんの「楽しい！」を守っています。飽きっぽく見えるのは、それだけたくさんのことに興味を持てる才能の証。焦らなくて大丈夫。好奇心を大切にしてあげるあなたの関わりが、お子さんの一番の宝物です✨",
  },
  choleric: {
    title: "情熱パワフルタイプ",
    tagline: "情熱的な意志の強いリーダー",
    strengths: ["強い意志と実行力", "リーダーシップ", "目標に向かって突き進む力", "物事をやり遂げる力"],
    challenges: ["カッとなりやすい", "負けを認めるのが苦手", "指図されることへの抵抗"],
    parentTips: [
      "命令ではなく「どうしたいか」と選択肢を与えて自己決定を尊重する",
      "怒りが出たときは頭ごなしに叱らず、落ち着いてから話し合う",
      "「やるならとことん！」と目標を一緒に決め、達成を一緒に喜ぶ",
      "リーダー気質を活かせる役割（お手伝いの責任者など）を意識的に作る",
      "エネルギーを発散できる体を動かす遊びや運動の時間を確保する",
    ],
    supportYell: "強い意志をもつお子さんとの毎日は、正直へとへとになることもありますよね。でも大丈夫、それはお子さんが「自分らしく生きたい！」と全力で伝えているサイン。ぶつかっても、それだけ真剣に向き合っているあなたはすごい親御さんです。自信を持って🔥",
  },
  phlegmatic: {
    title: "おだやかマイペースタイプ",
    tagline: "穏やかで安定感のあるマイペース派",
    strengths: ["穏やかで安定している", "コツコツ取り組む持続力", "よく聴いて信頼される存在", "変化にじっくり適応する力"],
    challenges: ["急な変化や予定変更への対応", "なかなか動き出せない", "慎重すぎて機会を逃すことも"],
    parentTips: [
      "「10分後に〇〇するよ」と先の予告をして変化への準備時間を与える",
      "急かさずゆっくり待つ。せかすと逆効果になりやすい",
      "コツコツ続けていることを見つけてたくさん褒める",
      "新しいことへの挑戦は、小さな一歩から始められるよう工夫する",
      "毎日の決まったルーティンを大切にし、安心できる環境を作る",
    ],
    supportYell: "「もっと早くして」「なんでできないの」と思う瞬間があっても、責めなくて大丈夫。このタイプのお子さんはゆっくり確実に、自分のペースで育っていく力を持っています。あなたが待ってあげているその時間が、お子さんの根っこになっています🌊",
  },
  melancholic: {
    title: "繊細こだわりタイプ",
    tagline: "豊かな感受性を持つ繊細な芸術家",
    strengths: ["高い共感力と思いやり", "深く考え物事を丁寧にこなす", "芸術的・審美的センス", "細部への気配り"],
    challenges: ["傷つきやすく落ち込みやすい", "完璧主義で自分を追い詰める", "不安や心配が多くなりやすい"],
    parentTips: [
      "感情を否定せず「そう感じたんだね」と気持ちを受け止める",
      "完璧より「やってみたこと」のプロセスをたくさん褒める",
      "失敗した後は責めずに、次の小さな成功体験を一緒に作る",
      "一人でいる時間も大切にし、感情をアートや言葉で表現できる場を作る",
      "「大好きだよ」という言葉と安心できるスキンシップを日々意識する",
    ],
    supportYell: "繊細なお子さんのそばで、毎日気を配り続けているあなたは本当に頑張っています。泣いたり怒ったりが多くても、それはお子さんがそれだけ豊かに世界を感じている証拠。あなたが「大丈夫だよ」と受け止めてあげるだけで、お子さんの心はどんどん育っていきます🌙",
  },
};

// ── MI理論ごとの解説 ──────────────────────────────────────
export const miDesc: Record<MIType, {
  title: string;
  tagline: string;
  learningStyle: string;
  activities: string[];
}> = {
  linguistic: {
    title: "言語的知能",
    tagline: "言葉で世界を理解する",
    learningStyle: "読む・聞く・話すことで学ぶ。物語や言葉遊びが学びの扉になります。",
    activities: ["読み聞かせや図書館通い", "日記や絵日記をつける", "なぞなぞ・しりとり・言葉遊び", "自分の話を聞いてもらう時間"],
  },
  logical: {
    title: "論理・数学的知能",
    tagline: "仕組みと理由を探求する",
    learningStyle: "数字、パターン、論理的な問いかけから学ぶ。「なぜ？」に答え続けることが力になります。",
    activities: ["簡単な実験や観察", "パズル・数遊び・ボードゲーム", "料理や買い物で数を使う体験", "「なぜ？」への丁寧な説明"],
  },
  spatial: {
    title: "空間的知能",
    tagline: "視覚でイメージして創造する",
    learningStyle: "見て・描いて・作ることで学ぶ。視覚的な情報が頭の中で豊かに広がります。",
    activities: ["絵を描く・粘土・工作", "ブロック・積み木・レゴ", "地図を一緒に作る・迷路遊び", "映像や写真で学ぶ機会を増やす"],
  },
  musical: {
    title: "音楽的知能",
    tagline: "リズムとメロディで感じる",
    learningStyle: "音楽、リズム、メロディで学ぶ。歌いながら覚えると記憶が定着しやすい。",
    activities: ["好きな音楽を一緒に聴く・歌う", "楽器に触れる機会を作る", "リズム遊び・手遊び歌", "学習内容を歌やリズムに乗せる"],
  },
  bodily: {
    title: "身体運動的知能",
    tagline: "体で感じて体で覚える",
    learningStyle: "体を動かし、手を使って作ることで学ぶ。実際にやってみることが一番の学び。",
    activities: ["スポーツや体を使った遊びをたくさん", "工作・料理・ガーデニングなど手仕事", "外遊びと体験型の学び", "じっとしているより動きながらの学習"],
  },
  interpersonal: {
    title: "対人的知能",
    tagline: "人とのつながりで輝く",
    learningStyle: "人との関わりの中で学ぶ。友達や家族と一緒に学ぶと力が伸びます。",
    activities: ["友達と一緒に遊ぶ機会を大切に", "グループでの学びやゲーム", "家族での会話・話し合いの時間", "人の気持ちを考えるロールプレイ"],
  },
  intrapersonal: {
    title: "内省的知能",
    tagline: "自分の内側と深く向き合う",
    learningStyle: "一人でじっくり考え、自分の感情や体験を振り返ることで学ぶ。",
    activities: ["一人で集中できる静かな時間・空間", "日記や絵日記で気持ちを表現", "好きなことを自分のペースで深める", "感情を受け止めてもらう安心できる会話"],
  },
  naturalist: {
    title: "博物的知能",
    tagline: "自然の中で発見し分類する",
    learningStyle: "自然観察と分類・収集を通じて学ぶ。外に出て触れること全てが教材になります。",
    activities: ["公園・森・海での自然体験", "虫・植物・石などのコレクション", "図鑑や自然の本", "動物園・水族館・植物園"],
  },
};

// ── 親子の気質組み合わせアドバイス ────────────────────────
type CombinationKey = `${SteinerType}_${SteinerType}`;

export const combinationAdvice: Record<string, {
  title: string;
  description: string;
  tips: string[];
  parentIrritation: string;
}> = {
  sanguine_sanguine: {
    title: "自由な探検家コンビ",
    description: "お互い好奇心旺盛で楽しいことが大好き。一緒にいると毎日が冒険のようになります。一方で、ルールや継続を促すのが双方とも苦手なため、生活の軸作りに意識を向けましょう。",
    tips: ["「今日は何を発見した？」と冒険感覚で一日を振り返る", "親自身も新しいことを一緒に楽しむことで強い絆が生まれる", "ルーティンを楽しいゲームに変換する工夫を"],
    parentIrritation: "子どもと同じく飽きっぽい自分に気づいたら、「今日はこれだけ」と小さなゴールを決めることで安定します。",
  },
  sanguine_choleric: {
    title: "自由な子どもと熱血親",
    description: "親が「こうすべき」と押しつけると子どもは反発します。子どもの自由さを個性と認め、エネルギーをうまく方向付けてあげましょう。",
    tips: ["「やりたいこと」リストを一緒に作り、順番に挑戦する", "強制より提案形式に変えるだけで関係が大きく変わる", "子どもの好奇心を怒らず「面白いね」と受け止める"],
    parentIrritation: "子どもが飽きっぽかったり約束を忘れたりするとイライラしやすいです。「この子はこういう個性」と頭で理解して深呼吸を一つ。",
  },
  sanguine_phlegmatic: {
    title: "活発な子どもと穏やかな親",
    description: "子どものエネルギーに親がついていくのが大変に感じることも。でも穏やかな親の安定感が、子どもにとって安心の基地になっています。",
    tips: ["子どもの「次！次！」を全部叶えなくていい。「今はこれを楽しもう」とゆっくりペースに引き込む", "親のゆったりした空気が子どもを落ち着かせるプラスにもなる", "体力温存しながら付き合える遊びを見つける"],
    parentIrritation: "忙しく動き回る子どもに疲れを感じたら、「親も休む時間が必要」とはっきり伝えてOK。",
  },
  sanguine_melancholic: {
    title: "自由な子どもと繊細な親",
    description: "子どものマイペースさや無頓着さに親が傷つくことも。子どもに悪意はなく、ただエネルギーが外向きなだけと理解することが大切です。",
    tips: ["子どもの軽さを羨ましいと感じてもOK、それはあなたの感受性の豊かさです", "「傷ついた」と感じたら、深呼吸して「これは子どもの個性」と置き換える", "子どもの楽しさに少しだけ乗っかって一緒に笑う時間を"],
    parentIrritation: "子どもが約束を忘れたり軽く流したりするとダメージを受けやすいです。期待値を少し下げることで楽になれます。",
  },
  choleric_sanguine: {
    title: "リーダーな子どもと柔軟な親",
    description: "子どもが「自分でやる！」と主張するのを、親が柔軟に受け入れてあげましょう。指図されることを嫌う子どもに、選択肢を与える関わりが効果的です。",
    tips: ["「どうしたい？」と聞いてから動く習慣を", "子どもが決めたことを尊重し、失敗しても責めない", "エネルギーのはけ口としてスポーツや役割を与える"],
    parentIrritation: "子どもの強い主張に「またか」と思ったら、「この子は意志が強い」と肯定的に言い換えてみましょう。",
  },
  choleric_choleric: {
    title: "火と火の激しいコンビ",
    description: "お互い意志が強く、ぶつかりやすい組み合わせです。でも同じ情熱を持つからこそ、深く理解し合える可能性も大きいです。",
    tips: ["勝ち負けの争いにしない。「二人とも強い意志を持っている」と認め合う", "怒りがぶつかったときは一時退避。落ち着いてから話す", "共通の目標（キャンプ・料理など）で力を同じ方向に向ける"],
    parentIrritation: "子どもに反論されると更に強く返したくなりますが、そこが踏ん張りどころ。まず子どもの言い分を最後まで聞く練習を。",
  },
  choleric_phlegmatic: {
    title: "情熱的な子どもと安定した親",
    description: "子どものエネルギーの強さに驚くこともありますが、親の安定感が子どもの安心感につながっています。感情の波を受け止める器になれる組み合わせです。",
    tips: ["子どもが怒っているときも慌てず「そうか、怒っているんだね」と受け止める", "ルールは明確に・短く・シンプルに伝える", "達成したことをちゃんと認めて「やったね」と声に出す"],
    parentIrritation: "激しい感情表現に圧倒されたら、自分の落ち着いた呼吸を意識して。あなたの安定が子どもを落ち着かせます。",
  },
  choleric_melancholic: {
    title: "情熱的な子どもと繊細な親",
    description: "子どもの強い感情表現に親がクタクタになりやすい組み合わせ。親自身が疲弊しないためのセルフケアが最優先です。",
    tips: ["子どもの怒りを「攻撃」ではなく「感情の爆発」として受け取る", "一日の終わりに「今日もよく向き合えた」と自分を労う", "子どもが落ち着いているタイミングで、穏やかに感情の表し方を伝える"],
    parentIrritation: "子どもの激しさで消耗したら、自分だけのひと息時間を積極的に作って。あなたが満たされていることが子育ての土台です。",
  },
  phlegmatic_sanguine: {
    title: "のんびり屋さんと活発な親",
    description: "親が先へ先へと引っ張りすぎると子どもはストレスを感じます。子どものゆっくりしたペースを信頼することが大切な組み合わせです。",
    tips: ["「早く！」を「あと少しだよ」に言い換える", "準備時間を多めに設定する", "子どもが自分のペースでやり遂げたことを大いに褒める"],
    parentIrritation: "ゆっくりな子どもにじれったくなったら、「この子のペースが本来の姿」と思い出しましょう。",
  },
  phlegmatic_choleric: {
    title: "マイペースな子どもと熱血な親",
    description: "親が強く押せば押すほど子どもは動かなくなる組み合わせ。焦りや命令を手放すことが関係改善の鍵です。",
    tips: ["「〇〇しなさい」を「〇〇してくれると嬉しいな」に変える", "動き出すまでの時間を「怠け」ではなく「準備」と理解する", "子どもが自分から動けた瞬間を大切に取り上げて褒める"],
    parentIrritation: "「なんでやらないの！」という気持ちになったら要注意。強さで動かそうとするほど逆効果です。深呼吸を。",
  },
  phlegmatic_phlegmatic: {
    title: "のんびりゆったり安心コンビ",
    description: "お互いに急かさず、安心感のある空間が自然と生まれます。変化が必要なときは、ふたりで小さな一歩を踏み出しましょう。",
    tips: ["「このままでいいよ」という安心感を与え続ける", "変化が必要なときは「一緒にやってみよう」と親が先に動いて見せる", "日常のルーティンを大切にして安定した生活リズムを"],
    parentIrritation: "慎重すぎて選べないときは「どっちでも大丈夫」と伝えるだけで子どもが楽になります。",
  },
  phlegmatic_melancholic: {
    title: "のんびり屋さんと繊細な親",
    description: "お互い穏やかで衝突は少ないですが、感情の伝え合いが薄くなりがちです。気持ちを言葉にする習慣を大切に。",
    tips: ["「今日はどうだった？」と毎日少しだけ会話の時間を", "子どもが感情を出したときは丁寧に受け止める", "穏やかでいられる今を大切にしながら、少しずつ対話を深める"],
    parentIrritation: "子どもが何も言わずにいると「大丈夫かな」と不安になりやすいです。「この子は大丈夫」と信頼することも愛情のひとつ。",
  },
  melancholic_sanguine: {
    title: "繊細な子どもと活発な親",
    description: "子どもの繊細さや傷つきやすさを「弱い」と思わないで。豊かな感受性は大きな才能です。子どものペースに合わせてゆっくり関わりましょう。",
    tips: ["子どもが落ち込んでいるとき、すぐ元気づけようとしない。まず「そうだったんだね」と共感を", "完璧を求めず、できたことにフォーカスして褒める", "一人の時間・静かな時間を確保してあげる"],
    parentIrritation: "子どものネガティブな反応にイライラしたら「感受性が豊かな証拠」と置き換えてみましょう。",
  },
  melancholic_choleric: {
    title: "繊細な子どもと情熱的な親",
    description: "最も気をつけたい組み合わせのひとつ。親の強い言葉や態度が子どもの心に深く刺さります。言い方・関わり方を意識的にゆっくりにする工夫が大切です。",
    tips: ["声のトーンを一段下げるだけで子どもの安心感が大きく変わる", "叱るより「こうしてほしかったな」と気持ちベースで伝える", "「ありがとう」「すごいね」の言葉を意識的に増やす"],
    parentIrritation: "子どもが落ち込んだり引きずったりすることにイライラしたら、それが「深く感じる力」だと思い出して。",
  },
  melancholic_phlegmatic: {
    title: "繊細な子どもと穏やかな親",
    description: "お互い感情を内に秘めやすいため、気持ちの出し合いが大切です。子どもが安心して「弱い自分」を見せられる場所を作ってあげましょう。",
    tips: ["「悲しいの？」「どんな気持ち？」と感情を言葉にするサポートを", "子どもの完璧主義を責めず「やっただけで十分」と伝え続ける", "一緒に静かな時間を過ごすことで信頼感が育まれる"],
    parentIrritation: "子どもが落ち込んで動けないとき、どう関わればいいか迷ったら「そばにいるよ」の一言で十分です。",
  },
  melancholic_melancholic: {
    title: "深く感じ合う繊細コンビ",
    description: "共感力が高く、お互いの気持ちをよく理解できます。でも二人でネガティブな感情に沈まないよう、明るい体験も意識的に取り入れて。",
    tips: ["「今日のよかったこと」を寝る前に一緒に話す習慣を", "完璧より「楽しかった」「やってみた」を大切に", "二人でアートや音楽など感性を使う時間を作る"],
    parentIrritation: "子どもと一緒に落ち込みすぎることがあります。「私は大人として光になる」と自分に言い聞かせることも大切。",
  },
};

export function getCombinationKey(childTemp: SteinerType, parentTemp: SteinerType): string {
  return `${childTemp}_${parentTemp}`;
}

// ── 親自身のトリセツ ──────────────────────────────────────
export const parentSelfCare: Record<SteinerType, {
  strengths: string[];
  tendencies: string[];
  irritationTriggers: string[];
  selfCareTips: string[];
}> = {
  sanguine: {
    strengths: ["子どもと一緒に全力で楽しめる明るさ", "どんな状況でも笑いに変えるユーモア", "子どもの気持ちを瞬時にキャッチする感性"],
    tendencies: ["楽しいことに全力投球できる", "気分で行動が変わりやすい", "子どもと一緒になって興奮しすぎることも"],
    irritationTriggers: ["毎日同じルーティンが続くとき", "子どもがテンションを合わせてくれないとき"],
    selfCareTips: ["新しいことを意識的に生活に取り入れる", "「今日の気分」を手帳に書いてパターンを知る", "楽しい予定を先に作って気持ちを前向きに保つ"],
  },
  choleric: {
    strengths: ["どんな壁も突破できる行動力と決断力", "子どもの未来を力強く切り開くリーダーシップ", "困難な状況でも諦めないタフな心"],
    tendencies: ["行動力と決断力が子育てを助ける", "つい強く言いすぎることがある", "「べき思考」が強くなりやすい"],
    irritationTriggers: ["子どもが言うことを聞かないとき", "思い通りに進まないとき", "子どもがぐずぐずしているとき"],
    selfCareTips: ["「言いたいことを3秒待つ」習慣を", "日記や運動でエネルギーを発散する", "「完璧な親はいない」と定期的に自分を許す"],
  },
  phlegmatic: {
    strengths: ["どんなときも動じない穏やかな安定感", "子どもの話をじっくり聴ける包容力", "コツコツ続ける忍耐強さと信頼感"],
    tendencies: ["冷静で安定した子育てができる", "感情的にならずに対処できる", "変化への対応が遅く感じることも"],
    irritationTriggers: ["忙しすぎてゆっくりできないとき", "急な予定変更が続くとき"],
    selfCareTips: ["自分だけのゆっくりした時間を「予定」として確保する", "「ゆっくり考えていい」と自分に許可を与える", "一つ一つを丁寧にこなすことへの誇りを持つ"],
  },
  melancholic: {
    strengths: ["子どもの小さな変化も見逃さない繊細な観察力", "深く愛して丁寧に関わる誠実さ", "子どもの気持ちに寄り添える高い共感力"],
    tendencies: ["子どもの気持ちを繊細に読み取れる", "自分を責めすぎてしまうことがある", "「完璧な親でありたい」プレッシャーを感じやすい"],
    irritationTriggers: ["自分の言葉で子どもが傷ついたと感じたとき", "思い描いていた関わり方ができなかったとき"],
    selfCareTips: ["「今日のよかった関わり」を1つ毎日見つける", "一人の時間（お茶・日記・音楽）を罪悪感なく取る", "「完璧でなくていい、ここにいるだけで十分」を繰り返す"],
  },
};
