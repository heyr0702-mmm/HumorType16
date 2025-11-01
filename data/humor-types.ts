export interface HumorScene {
  label: string;
  description: string;
  example: string;
}

export interface HumorCompatibility {
  code: string;
  title: string;
  dynamic: string;
}

export interface HumorTypeDetail {
  code: string;
  title: string;
  catch: string;
  avatar?: string;
  themeSoft?: string;
  themeAccent?: string;
  basicLong: string;
  humorLong: string;
  axesBrief: string;
  scenes: HumorScene[];
  compatibility: HumorCompatibility[];
  family?: string;
}

export const HUMOR_TYPES: Record<string, HumorTypeDetail> = {
  EALS: {
    code: "EALS",
    title: "The Vaudeville Visionary",
    catch:
      "Expressive, experimental, and upbeat comedians who punch up energy with surreal twists.",
    basicLong:
      "EALS humorists are magnetic performers who love building big, theatrical setups before zagging into unexpected absurdity. They thrive on rapid-fire improvisation, bold characters, and playful misdirection that keeps the room buzzing.",
    humorLong:
      "They lean on layered impressions, musical tags, and physical comedy riffs to heighten every premise, all while stitching callbacks into a cohesive comedic arc that leaves audiences delighted by the ride.",
    axesBrief:
      "Big energy, experimental instincts, and a taste for playful structure keep your sets feeling like organized chaos in the best way.",
    scenes: [
      {
        label: "Late-night variety stages",
        description:
          "Theatrical lighting and a lively crowd let you build momentum with characters before detonating a surreal twist.",
        example:
          "You stack three increasingly bizarre lounge singers until the final one turns out to be a fog machine with stage fright.",
      },
      {
        label: "Improv jam sessions",
        description:
          "Loose formats give you room to escalate bits on the fly while playing off teammates' offers.",
        example:
          "You heighten an improv scene into a full-on time-travel musical complete with beatboxed transitions.",
      },
      {
        label: "Festival side stages",
        description:
          "A rotating crowd gets hooked by your high-energy openers and stays for the wild places you take the story.",
        example:
          "You transform a mundane weather report into a cosmic prophecy, complete with audience sound effects.",
      },
    ],
    compatibility: [
      {
        code: "ECLS",
        title: "The Polished Playwright",
        dynamic:
          "Their structured storytelling keeps your wildest ideas on track while you inject color, callbacks, and momentum.",
      },
      {
        code: "IALS",
        title: "The Thoughtful Trickster",
        dynamic:
          "You supply the spark they sometimes hold back, and their grounded observations give your surreal worlds heart.",
      },
    ],
  },
  // TODO: Add the remaining 15 humor type definitions once copy is approved.
};
