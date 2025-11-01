import { ChangeEvent } from "react";

export type LikertValue = 1 | 2 | 3 | 4 | 5 | 6 | 7;

export interface HumorQuestionProps {
  id: number | string;
  prompt: string;
  selected?: LikertValue | null;
  onChange?: (value: LikertValue) => void;
  lowLabel?: string;
  highLabel?: string;
  groupName?: string;
}

const SCALE: LikertValue[] = [1, 2, 3, 4, 5, 6, 7];

export function HumorQuestion({
  id,
  prompt,
  selected,
  onChange,
  lowLabel = "まったく当てはまらない",
  highLabel = "とても当てはまる",
  groupName,
}: HumorQuestionProps) {
  const fieldName = groupName ?? `likert-${id}`;

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value) as LikertValue;
    if (onChange) {
      onChange(value);
    }
  };

  return (
    <fieldset className="space-y-3">
      <legend className="font-semibold text-lg text-slate-900 dark:text-slate-100">
        {prompt}
      </legend>
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between text-sm text-slate-600 dark:text-slate-300">
          <span>{lowLabel}</span>
          <span>{highLabel}</span>
        </div>
        <div className="flex items-center justify-between gap-1">
          {SCALE.map((value) => (
            <label
              key={value}
              className={`flex flex-1 flex-col items-center gap-2 rounded-md border px-3 py-2 text-sm transition-colors ${
                selected === value
                  ? "border-blue-600 bg-blue-50 text-blue-700 dark:border-blue-400 dark:bg-blue-900/30 dark:text-blue-200"
                  : "border-slate-200 bg-white text-slate-700 hover:border-blue-200 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
              }`}
            >
              <input
                type="radio"
                name={fieldName}
                value={value}
                checked={selected === value}
                onChange={handleChange}
                className="sr-only"
              />
              <span className="text-base font-medium">{value}</span>
            </label>
          ))}
        </div>
      </div>
    </fieldset>
  );
}

export default HumorQuestion;
