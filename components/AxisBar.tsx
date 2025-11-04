interface AxisBarProps {
  label: string;
  value: number;
  leftPole: string;
  rightPole: string;
  accentColor?: string;
}

function clamp(value: number, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value));
}

export default function AxisBar({
  label,
  value,
  leftPole,
  rightPole,
  accentColor = "#1D7ED6",
}: AxisBarProps) {
  const clampedValue = clamp(value);
  const markerPosition = clampedValue * 100;

  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white/95 p-5 shadow-sm">
      <div className="flex items-baseline justify-between">
        <h3 className="text-base font-semibold text-slate-900">{label}</h3>
        <span className="text-xs font-medium uppercase tracking-wide text-slate-500">BALANCE</span>
      </div>
      <div
        className="relative h-3 w-full overflow-hidden rounded-full bg-slate-100"
        style={{
          backgroundImage: `linear-gradient(90deg, ${accentColor}14 0%, transparent 50%, ${accentColor}14 100%)`,
        }}
      >
        <div
          className="absolute top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white shadow-md transition-[left] duration-500"
          style={{
            left: `${markerPosition}%`,
            backgroundColor: accentColor,
          }}
        />
      </div>
      <div className="flex items-center justify-between text-xs font-medium text-slate-500">
        <span>{leftPole}</span>
        <span>{rightPole}</span>
      </div>
    </div>
  );
}
