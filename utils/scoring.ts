import { AxisKey } from "../data/humor-questions";
import { HumorTypeCode } from "../data/humor-types";

const AXIS_INDEX: Record<AxisKey, number> = {
  energy: 0,
  absurdity: 1,
  tone: 2,
  structure: 3,
};

const AXIS_NORMALIZED: Record<AxisKey, Record<string, number>> = {
  energy: { I: 0.35, E: 0.7 },
  absurdity: { C: 0.38, A: 0.68 },
  tone: { E: 0.45, L: 0.62 },
  structure: { P: 0.44, S: 0.66 },
};

function clamp(value: number, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value));
}

export function getNormalizedAxisValue(
  typeCode: HumorTypeCode,
  axis: AxisKey,
): number {
  const letterIndex = AXIS_INDEX[axis];
  const axisLetter = typeCode[letterIndex];
  const axisMap = AXIS_NORMALIZED[axis];
  const rawValue = axisLetter ? axisMap[axisLetter] ?? 0.5 : 0.5;
  return clamp(rawValue);
}

export function getNormalizedAxisValues(
  typeCode: HumorTypeCode,
): Record<AxisKey, number> {
  return {
    energy: getNormalizedAxisValue(typeCode, "energy"),
    absurdity: getNormalizedAxisValue(typeCode, "absurdity"),
    tone: getNormalizedAxisValue(typeCode, "tone"),
    structure: getNormalizedAxisValue(typeCode, "structure"),
  };
}
