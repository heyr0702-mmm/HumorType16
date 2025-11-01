import { AxisKey, HUMOR_QUESTIONS, HumorQuestion } from "../data/humor-questions";

const AXIS_LETTER_MAP: Record<AxisKey, { positive: string; negative: string }> = {
  energy: { positive: "E", negative: "I" },
  absurdity: { positive: "A", negative: "C" },
  tone: { positive: "L", negative: "D" },
  structure: { positive: "S", negative: "F" },
};

const FAMILY_LABELS: Record<string, string> = {
  EA: "Expressive Absurdists",
  EC: "Expressive Classicists",
  IA: "Introspective Absurdists",
  IC: "Introspective Classicists",
};

// NOTE: The Likert scale responses range from 1 to 7 and are centered on 4.
export function mapLikertToSigned(value: number): number {
  if (value < 1 || value > 7) {
    throw new RangeError(`Likert values must be between 1〜7. Received: ${value}`);
  }
  return value - 4;
}

export function computeAxisScores(
  questions: HumorQuestion[] = HUMOR_QUESTIONS,
  responses: Record<number, number>
): Record<AxisKey, number> {
  const scores: Record<AxisKey, number> = {
    energy: 0,
    absurdity: 0,
    tone: 0,
    structure: 0,
  };

  for (const question of questions) {
    const response = responses[question.id];
    if (typeof response !== "number") {
      continue;
    }

    const signed = mapLikertToSigned(response) * question.direction;
    scores[question.axis] += signed;
  }

  return scores;
}

export function normalizeToPercent(score: number, maxAbsolute: number): number {
  if (maxAbsolute <= 0) {
    return 50;
  }

  const clampedScore = Math.max(-maxAbsolute, Math.min(maxAbsolute, score));
  const normalized = (clampedScore + maxAbsolute) / (2 * maxAbsolute);
  return Math.round(normalized * 100);
}

export function axesToType(axisScores: Record<AxisKey, number>): string {
  return (Object.keys(AXIS_LETTER_MAP) as AxisKey[])
    .map((axis) =>
      axisScores[axis] >= 0
        ? AXIS_LETTER_MAP[axis].positive
        : AXIS_LETTER_MAP[axis].negative
    )
    .join("");
}

export function getFamilyFromAxes(axisScores: Record<AxisKey, number>): string {
  const energyLetter =
    axisScores.energy >= 0
      ? AXIS_LETTER_MAP.energy.positive
      : AXIS_LETTER_MAP.energy.negative;
  const absurdityLetter =
    axisScores.absurdity >= 0
      ? AXIS_LETTER_MAP.absurdity.positive
      : AXIS_LETTER_MAP.absurdity.negative;

  const familyKey = `${energyLetter}${absurdityLetter}`;
  return FAMILY_LABELS[familyKey] ?? "Hybrid Humorist";
}
