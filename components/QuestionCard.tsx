import { LikertValue } from "./Scale7";
import Scale7 from "./Scale7";

interface QuestionCardProps {
  id: number;
  prompt: string;
  value?: LikertValue | null;
  onChange?: (value: LikertValue) => void;
  lowLabel?: string;
  highLabel?: string;
  groupName?: string;
}

export default function QuestionCard({
  id,
  prompt,
  value,
  onChange,
  lowLabel,
  highLabel,
  groupName,
}: QuestionCardProps) {
  const headingId = `question-${id}-prompt`;
  return (
    <article className="rounded-3xl border border-slate-800/60 bg-slate-900/80 p-6 shadow-lg backdrop-blur">
      <h2 id={headingId} className="text-lg font-semibold leading-relaxed text-slate-100">
        {prompt}
      </h2>
      <div className="mt-6">
        <Scale7
          value={value ?? null}
          onChange={onChange}
          name={groupName ?? prompt}
          ariaLabelledBy={headingId}
          lowLabel={lowLabel}
          highLabel={highLabel}
        />
      </div>
    </article>
  );
}
