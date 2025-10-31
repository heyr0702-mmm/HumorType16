export interface HumorTypeDetail {
  code: string;
  name: string;
  summary: string;
  description: string;
  strengths: string[];
  growthAreas: string[];
  signatureMoves: string[];
}

export const HUMOR_TYPES: Record<string, HumorTypeDetail> = {
  EALS: {
    code: "EALS",
    name: "The Vaudeville Visionary",
    summary:
      "Expressive, experimental, and upbeat comedians who punch up energy with surreal twists.",
    description:
      "EALS humorists are magnetic performers who love building big, theatrical setups before zagging into unexpected absurdity. They thrive on rapid-fire improvisation, bold characters, and playful misdirection that keeps the room buzzing.",
    strengths: [
      "Commanding stage presence that keeps audiences leaning forward",
      "Inventive absurdism that surprises without alienating",
      "Instinct for weaving callbacks into a cohesive comedic arc",
    ],
    growthAreas: [
      "Allow quieter beats so jokes have room to breathe",
      "Balance experimental tangents with clear punchlines",
      "Remember to tailor energy to smaller, more intimate crowds",
    ],
    signatureMoves: [
      "Layered impressions that spiral into surreal territory",
      "Physical comedy riffs punctuated by sharp wordplay",
      "Improvised musical tags that heighten the premise",
    ],
  },
  // TODO: Add the remaining 15 humor type definitions once copy is approved.
};
