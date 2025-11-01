export type AxisKey = "energy" | "absurdity" | "tone" | "structure";

export interface HumorQuestion {
  id: number;
  prompt: string;
  axis: AxisKey;
  direction: 1 | -1;
}

export const HUMOR_QUESTIONS: HumorQuestion[] = [
  // ① energy（表現・即興）系 7問
  {
    id: 1,
    prompt: "面白い話をしていると、その場のノリでアドリブを足してもっと面白くできるほうだ。",
    axis: "energy",
    direction: 1,
  },
  {
    id: 2,
    prompt: "話す前に構成を考えておかないと不安になるほうだ。",
    axis: "energy",
    direction: -1,
  },
  {
    id: 3,
    prompt: "初対面の人が多い場でも、空気に合わせてテンションを調整できる。",
    axis: "energy",
    direction: 1,
  },
  {
    id: 4,
    prompt: "ネタや話を一度ひとりで練習してから話すほうが安心する。",
    axis: "energy",
    direction: -1,
  },
  {
    id: 5,
    prompt: "即興のやり取りやその場でのキャッチボールは、むしろ楽しいと感じる。",
    axis: "energy",
    direction: 1,
  },
  {
    id: 6,
    prompt: "考えを整理せずにしゃべり始めると、うまくオチない気がして落ち着かない。",
    axis: "energy",
    direction: -1,
  },
  {
    id: 7,
    prompt: "相手の反応や表情を見ながら、話をその場で広げていくタイプだ。",
    axis: "energy",
    direction: 1,
  },

  // ② absurdity（抽象/世界観 vs 日常観察）系 7問
  {
    id: 8,
    prompt: "日常の「あるある」やちょっとしたズレに気づきやすいほうだ。",
    axis: "absurdity",
    direction: -1,
  },
  {
    id: 9,
    prompt: "架空の設定や世界観を考えて、その中でボケるほうがワクワクする。",
    axis: "absurdity",
    direction: 1,
  },
  {
    id: 10,
    prompt: "実際にあった出来事をそのまま面白く話すことが多い。",
    axis: "absurdity",
    direction: -1,
  },
  {
    id: 11,
    prompt: "言葉遊びや発想の転換で笑いを作ることがよくある。",
    axis: "absurdity",
    direction: 1,
  },
  {
    id: 12,
    prompt: "人のクセやちょっとした動きを観察して、ネタとしてストックしておくタイプだ。",
    axis: "absurdity",
    direction: -1,
  },
  {
    id: 13,
    prompt: "たとえ話や比喩を使って、別の見方を提示するのが好きだ。",
    axis: "absurdity",
    direction: 1,
  },
  {
    id: 14,
    prompt: "目に見える出来事そのものよりも、「考え方の違い」や「発想のずらし方」に面白さを感じる。",
    axis: "absurdity",
    direction: 1,
  },

  // ③ tone（論理ツッコミ vs 共感ノリ）系 7問
  {
    id: 15,
    prompt: "物事の矛盾やおかしなところを見つけると、ついツッコミたくなる。",
    axis: "tone",
    direction: 1,
  },
  {
    id: 16,
    prompt: "誰かが傷つかないように、言い方や言葉選びにはけっこう気をつかう。",
    axis: "tone",
    direction: -1,
  },
  {
    id: 17,
    prompt: "理屈が通ったボケやツッコミのほうが、見ていて気持ちいいと感じる。",
    axis: "tone",
    direction: 1,
  },
  {
    id: 18,
    prompt: "場のノリやテンションを壊さないように、相手に合わせて盛り上がることが多い。",
    axis: "tone",
    direction: -1,
  },
  {
    id: 19,
    prompt: "言葉の使い方やニュアンスにはこだわるほうだ。",
    axis: "tone",
    direction: 1,
  },
  {
    id: 20,
    prompt: "多少おかしくても、場の空気を悪くしないほうを選びがちだ。",
    axis: "tone",
    direction: -1,
  },
  {
    id: 21,
    prompt: "みんなで一緒に笑える空気をつくることを大事にしている。",
    axis: "tone",
    direction: -1,
  },

  // ④ structure（構成して落とす vs ノリで崩す）系 7問
  {
    id: 22,
    prompt: "話す前に流れやオチを決めておいたほうが安心する。",
    axis: "structure",
    direction: 1,
  },
  {
    id: 23,
    prompt: "その場で思いついたことをサッと言うほうが、面白くなると思っている。",
    axis: "structure",
    direction: -1,
  },
  {
    id: 24,
    prompt: "伏線を張ったり、タイミングを計算して笑いを作るのが好きだ。",
    axis: "structure",
    direction: 1,
  },
  {
    id: 25,
    prompt: "計画よりも、そのときの勢いやノリを大事にして動くことが多い。",
    axis: "structure",
    direction: -1,
  },
  {
    id: 26,
    prompt: "台本どおりより、ちょっと脱線してから戻すくらいのほうが面白いと思う。",
    axis: "structure",
    direction: -1,
  },
  {
    id: 27,
    prompt: "きっちり構成を作っておいたほうが、逆に自由に動けると感じる。",
    axis: "structure",
    direction: 1,
  },
  {
    id: 28,
    prompt: "予想外の展開の中にこそ、一番おもしろい笑いが生まれると思う。",
    axis: "structure",
    direction: -1,
  },

  // ⑤ バリデーション・補助設問
  {
    id: 29,
    prompt: "初対面の人でも、だいたいすぐ打ち解けられるほうだと思う。",
    axis: "energy",
    direction: 1,
  },
  {
    id: 30,
    prompt: "即興は好きだけど、事前に準備していないとちょっと不安にもなる。",
    axis: "structure",
    direction: -1,
  },
];
