interface ProgressBarProps {
  answeredCount: number;
  totalQuestions: number;
  progressPercent: number;
}

export default function ProgressBar({
  answeredCount,
  totalQuestions,
  progressPercent,
}: ProgressBarProps) {
  return (
    <div className="sticky top-6 z-20">
      <section className="rounded-3xl border border-slate-800/60 bg-slate-900/80 p-6 shadow-xl backdrop-blur">
        <p className="text-sm uppercase tracking-wider text-slate-400">進捗</p>
        <div
          className="mt-2 h-3 w-full overflow-hidden rounded-full bg-slate-800"
          role="progressbar"
          aria-valuenow={progressPercent}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="回答進捗"
        >
          <div
            className="h-full rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 transition-all"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        <p className="mt-2 text-sm font-medium text-slate-200">
          回答済み {answeredCount} / {totalQuestions}（{progressPercent}%）
        </p>
      </section>
    </div>
  );
}
