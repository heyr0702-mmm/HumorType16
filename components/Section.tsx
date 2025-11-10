import { ReactNode } from "react";

type Props = {
  eyebrow?: string;
  title: string;
  kicker?: string;
  className?: string;
  children: ReactNode;
  as?: keyof JSX.IntrinsicElements;
  id?: string;
};

export default function Section({
  eyebrow,
  title,
  kicker,
  className = "",
  children,
  as = "section",
  id,
}: Props) {
  const Tag = as as any;
  const base =
    "relative rounded-2xl bg-white/70 backdrop-blur p-6 md:p-10 shadow-sm ring-1 ring-black/5";
  return (
    <Tag id={id} className={`${base} ${className}`}>
      {(eyebrow || title) && (
        <header className="mb-6 md:mb-8">
          {eyebrow && (
            <p className="text-sm font-medium tracking-wide text-neutral-500 uppercase">
              {eyebrow}
            </p>
          )}
          <h2 className="text-2xl md:text-3xl font-semibold leading-tight mt-1">
            {title}
          </h2>
          {kicker && <p className="mt-2 text-neutral-600 md:text-lg">{kicker}</p>}
        </header>
      )}
      <div className="[&_strong]:font-semibold">{children}</div>
    </Tag>
  );
}
