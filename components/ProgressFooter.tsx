import ProgressBar from "./ProgressBar";

type ProgressFooterProps = {
  progressPct: number;
  pageText?: string;
  canPrev: boolean;
  canNext: boolean;
  onPrev: () => void;
  onNext: () => void;
  nextLabel?: string;
};

export default function ProgressFooter({
  progressPct,
  pageText,
  canPrev,
  canNext,
  onPrev,
  onNext,
  nextLabel = "次へ",
}: ProgressFooterProps) {
  return (
    <div className="flex flex-col gap-3">
      <div className="rounded-2xl border border-black/5 bg-white/80 p-4 shadow-sm dark:border-white/10 dark:bg-zinc-900/70">
        <ProgressBar value={Math.round(progressPct)} />
        {pageText ? <div className="mt-2 text-center text-xs text-zinc-500 dark:text-zinc-400">{pageText}</div> : null}
      </div>
      <div className="flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={onPrev}
          disabled={!canPrev}
          className="h-11 rounded-xl border border-black/10 px-4 text-sm font-medium text-zinc-700 transition disabled:opacity-40 dark:border-white/10 dark:text-zinc-200"
          aria-label="前へ"
        >
          戻る
        </button>
        <button
          type="button"
          onClick={onNext}
          disabled={!canNext}
          className="h-11 rounded-xl bg-black px-5 text-sm font-semibold text-white transition disabled:opacity-40 dark:bg-zinc-100 dark:text-zinc-900"
          aria-label={nextLabel}
        >
          {nextLabel}
        </button>
      </div>
    </div>
  );
}
