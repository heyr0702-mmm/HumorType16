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
    prompt: "When I'm telling something funny, I often improvise on the spot and it gets better.",
    axis: "energy",
    direction: 1,
  },
  {
    id: 2,
    prompt: "I prefer to think through the structure of what I’ll say before I perform it.",
    axis: "energy",
    direction: -1,
  },
  {
    id: 3,
    prompt: "I can adjust my comedic tone to match the room, even with new people.",
    axis: "energy",
    direction: 1,
  },
  {
    id: 4,
    prompt: "I feel more confident telling jokes after I’ve rehearsed them alone.",
    axis: "energy",
    direction: -1,
  },
  {
    id: 5,
    prompt: "Ad-lib banter or fast back-and-forth is actually fun for me.",
    axis: "energy",
    direction: 1,
  },
  {
    id: 6,
    prompt: "If I don't organize my thoughts first, I get anxious about how it will land.",
    axis: "energy",
    direction: -1,
  },
  {
    id: 7,
    prompt: "I watch people’s reactions and build the comedy as I go.",
    axis: "energy",
    direction: 1,
  },

  // ② absurdity（抽象/世界観 vs 日常観察）系 7問
  {
    id: 8,
    prompt: "I’m good at noticing small, everyday ‘that’s so true’ moments.",
    axis: "absurdity",
    direction: -1,
  },
  {
    id: 9,
    prompt: "I like inventing scenarios or worlds and making the joke live there.",
    axis: "absurdity",
    direction: 1,
  },
  {
    id: 10,
    prompt: "I often retell real events and make them funny just by how I tell them.",
    axis: "absurdity",
    direction: -1,
  },
  {
    id: 11,
    prompt: "Wordplay or angle-shifting jokes are something I do a lot.",
    axis: "absurdity",
    direction: 1,
  },
  {
    id: 12,
    prompt: "I observe people’s quirks and habits and save them as material.",
    axis: "absurdity",
    direction: -1,
  },
  {
    id: 13,
    prompt: "I like using metaphors to show a completely different point of view.",
    axis: "absurdity",
    direction: 1,
  },
  {
    id: 14,
    prompt: "I find humor more in ‘how people think’ than in just ‘what happened’.",
    axis: "absurdity",
    direction: 1,
  },

  // ③ tone（論理ツッコミ vs 共感ノリ）系 7問
  {
    id: 15,
    prompt: "When I see something inconsistent, I want to point it out as a joke.",
    axis: "tone",
    direction: 1,
  },
  {
    id: 16,
    prompt: "I try to choose words so that nobody gets hurt by the joke.",
    axis: "tone",
    direction: -1,
  },
  {
    id: 17,
    prompt: "It feels good when a joke has a clean, logical setup and payoff.",
    axis: "tone",
    direction: 1,
  },
  {
    id: 18,
    prompt: "I often go along with the person’s vibe to keep everyone having fun.",
    axis: "tone",
    direction: -1,
  },
  {
    id: 19,
    prompt: "I care about using the right wording for the joke.",
    axis: "tone",
    direction: 1,
  },
  {
    id: 20,
    prompt: "Even if it’s a little off, I choose the option that won’t break the vibe.",
    axis: "tone",
    direction: -1,
  },
  {
    id: 21,
    prompt: "Creating a ‘we can all laugh together’ space matters to me.",
    axis: "tone",
    direction: -1,
  },

  // ④ structure（構成して落とす vs ノリで崩す）系 7問
  {
    id: 22,
    prompt: "I feel safer when I’ve planned the flow and the punchline.",
    axis: "structure",
    direction: 1,
  },
  {
    id: 23,
    prompt: "I think spontaneous, in-the-moment lines are the funniest.",
    axis: "structure",
    direction: -1,
  },
  {
    id: 24,
    prompt: "I like planting callbacks and timing the reveal.",
    axis: "structure",
    direction: 1,
  },
  {
    id: 25,
    prompt: "I trust momentum more than plans.",
    axis: "structure",
    direction: -1,
  },
  {
    id: 26,
    prompt: "Going slightly off-script and then coming back is fun for me.",
    axis: "structure",
    direction: -1,
  },
  {
    id: 27,
    prompt: "Having a tight structure actually gives me freedom.",
    axis: "structure",
    direction: 1,
  },
  {
    id: 28,
    prompt: "The wild, unexpected turns are where the best laughs happen.",
    axis: "structure",
    direction: -1,
  },

  // ⑤ バリデーション系（ページネーションの都合で入れておく）
  {
    id: 29,
    prompt: "I usually warm up to people quickly in social or comedy settings.",
    axis: "energy",
    direction: 1,
  },
  {
    id: 30,
    prompt: "I enjoy improv, but I also feel nervous when I haven’t prepped.",
    axis: "structure",
    direction: -1,
  },
];
