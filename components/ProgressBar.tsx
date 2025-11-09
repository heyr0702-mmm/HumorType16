type ProgressBarProps = {
  value: number;
  label?: string;
};

export default function ProgressBar({ value, label = "回答進捗" }: ProgressBarProps) {
  const clamped = Math.max(0, Math.min(100, Math.round(value)));

  return (
    <div>
      <div className="flex items-center justify-between text-xs font-medium uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">
        <span>Progress</span>
        <span>{clamped}%</span>
      </div>
      <div
        className="mt-2 h-2 w-full overflow-hidden rounded-full bg-zinc-200/80 dark:bg-zinc-800/80"
        role="progressbar"
        aria-valuenow={clamped}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={label}
      >
        <div
          className="h-full rounded-full bg-gradient-to-r from-[#6E56CF] to-[#A779E9] transition-all duration-500"
          style={{ width: `${clamped}%` }}
        />
      </div>
    </div>
  );
}
