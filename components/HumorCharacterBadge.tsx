import Image from "next/image";

const AVATAR_MAP = {
  EA: {
    label: "Expressive Absurdist",
    imageSrc: "/avatars/EA.svg",
    accent: "from-sky-400 to-cyan-300",
  },
  EC: {
    label: "Expressive Classicist",
    imageSrc: "/avatars/EC.svg",
    accent: "from-amber-400 to-orange-500",
  },
  IA: {
    label: "Introspective Absurdist",
    imageSrc: "/avatars/IA.svg",
    accent: "from-fuchsia-500 to-rose-400",
  },
  IC: {
    label: "Introspective Classicist",
    imageSrc: "/avatars/IC.svg",
    accent: "from-sky-500 to-indigo-500",
  },
} as const;

export type HumorFamilyCode = keyof typeof AVATAR_MAP;

export interface HumorCharacterBadgeProps {
  code: HumorFamilyCode;
  headline?: string;
  subheadline?: string;
}

export function HumorCharacterBadge({ code, headline, subheadline }: HumorCharacterBadgeProps) {
  const avatar = AVATAR_MAP[code];

  if (!avatar) {
    return null;
  }

  return (
    <div className="flex flex-col items-center gap-3 text-center">
      <div
        className={`relative flex h-28 w-28 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br shadow-lg ${avatar.accent}`}
      >
        <Image src={avatar.imageSrc} alt={`${avatar.label} avatar`} fill sizes="112px" />
      </div>
      <div className="space-y-1">
        <p className="text-sm uppercase tracking-wide text-slate-500 dark:text-slate-300">{headline ?? "Provisional Family"}</p>
        <p className="text-2xl font-semibold text-slate-900 dark:text-slate-100">{avatar.label}</p>
        {subheadline ? (
          <p className="text-sm text-slate-600 dark:text-slate-300">{subheadline}</p>
        ) : null}
      </div>
    </div>
  );
}

export default HumorCharacterBadge;
