interface ProgressBarProps {
  answeredCount: number;
  totalQuestions: number;
  progressPercent: number;
}

export default function ProgressBar({ answeredCount, totalQuestions, progressPercent }: ProgressBarProps) {
  return (
    <div className="sticky top-28 z-20">
      <section className="rounded-2xl border border-white/60 bg-white/70 p-6 shadow-sm backdrop-blur-sm">
        <div className="flex items-center justify-between text-xs font-medium uppercase tracking-[0.2em] text-[#777777]">
          <span>Progress</span>
          <span>{progressPercent}%</span>
        </div>
        <div
          className="mt-3 h-2.5 w-full overflow-hidden rounded-full bg-white/80"
          role="progressbar"
          aria-valuenow={progressPercent}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="回答進捗"
        >
          <div
            className="h-full rounded-full bg-primary transition-all duration-600 ease-in-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        <p className="mt-3 text-xs text-[#5A5A5A]">
          回答済み {answeredCount} / {totalQuestions}
        </p>
      </section>
    </div>
  );
}
