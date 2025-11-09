import { KeyboardEvent, useMemo, useRef } from "react";

export type LikertValue = 1 | 2 | 3 | 4 | 5 | 6 | 7;

interface Scale7Props {
  value?: LikertValue | null;
  onChange?: (value: LikertValue) => void;
  name?: string;
  ariaLabelledBy?: string;
  lowLabel?: string;
  highLabel?: string;
}

const SCALE_VALUES: LikertValue[] = [1, 2, 3, 4, 5, 6, 7];

export default function Scale7({
  value,
  onChange,
  name,
  ariaLabelledBy,
  lowLabel = "まったく当てはまらない",
  highLabel = "とても当てはまる",
}: Scale7Props) {
  const optionRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const currentIndex = useMemo(() => {
    if (!value) {
      return -1;
    }

    return SCALE_VALUES.indexOf(value);
  }, [value]);

  const focusOption = (index: number) => {
    const ref = optionRefs.current[index];
    if (ref) {
      ref.focus();
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (!onChange) {
      return;
    }

    if (event.key === "ArrowLeft" || event.key === "ArrowDown") {
      event.preventDefault();
      const nextIndex = Math.max(0, index - 1);
      onChange(SCALE_VALUES[nextIndex]);
      focusOption(nextIndex);
      return;
    }

    if (event.key === "ArrowRight" || event.key === "ArrowUp") {
      event.preventDefault();
      const nextIndex = Math.min(SCALE_VALUES.length - 1, index + 1);
      onChange(SCALE_VALUES[nextIndex]);
      focusOption(nextIndex);
    }
  };

  return (
    <div>
      <div className="mb-3 flex items-center justify-between text-xs font-medium uppercase tracking-[0.12em] text-[#777777]">
        <span>{lowLabel}</span>
        <span>{highLabel}</span>
      </div>
      <div
        className="grid grid-cols-7 gap-2"
        role="radiogroup"
        aria-label={ariaLabelledBy ? undefined : name ?? "7段階評価"}
        aria-labelledby={ariaLabelledBy}
      >
        {SCALE_VALUES.map((scaleValue, index) => {
          const selected = value === scaleValue;
          return (
            <button
              key={scaleValue}
              type="button"
              role="radio"
              aria-checked={selected}
              data-selected={selected ? "true" : "false"}
              onClick={() => onChange?.(scaleValue)}
              onKeyDown={(event) => handleKeyDown(event, index)}
              ref={(element) => {
                optionRefs.current[index] = element;
              }}
              className={`focus-ring flex h-12 items-center justify-center rounded-xl border text-sm font-semibold transition duration-600 ease-in-out shadow-sm md:h-14 ${
                selected
                  ? "border-primary bg-primary/10 text-[#2B2B2B]"
                  : "border-transparent bg-white/90 text-[#5A5A5A] hover:ring-1 hover:ring-primary/30"
              }`}
              tabIndex={
                selected
                  ? 0
                  : currentIndex === -1
                  ? index === Math.floor(SCALE_VALUES.length / 2)
                    ? 0
                    : -1
                  : -1
              }
            >
              {scaleValue}
            </button>
          );
        })}
      </div>
    </div>
  );
}
