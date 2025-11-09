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
    <article className="rounded-2xl border border-white/60 bg-white/70 p-6 shadow-sm backdrop-blur-sm">
      <h2 id={headingId} className="text-lg font-semibold leading-relaxed text-[#2B2B2B]">
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
