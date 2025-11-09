import { forwardRef } from "react";
import type { HTMLAttributes } from "react";

type MotionDivProps = HTMLAttributes<HTMLDivElement> & {
  animate?: Record<string, unknown>;
  transition?: Record<string, unknown>;
};

const MotionDiv = forwardRef<HTMLDivElement, MotionDivProps>(function MotionDiv(
  { animate: _animate, transition: _transition, ...props },
  ref
) {
  return <div ref={ref} {...props} />;
});

export const motion = {
  div: MotionDiv,
};

export type Variants = Record<string, unknown>;
