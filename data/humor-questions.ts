export type AxisKey = "energy" | "absurdity" | "tone" | "structure";

export interface HumorQuestion {
  id: number;
  prompt: string;
  axis: AxisKey;
  direction: 1 | -1;
}

export const HUMOR_QUESTIONS: HumorQuestion[] = [
  {
    id: 1,
    prompt:
      "I naturally slip into characters, voices, and exaggerated gestures when telling a funny story.",
    axis: "energy",
    direction: 1,
  },
  // TODO: Paste questions 2–30 once localization and copy edits are finished.
];
