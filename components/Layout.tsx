import { ReactNode } from "react";

interface LayoutProps {
  title?: string;
  description?: string;
  children: ReactNode;
  hero?: ReactNode;
  variant?: "dark" | "light";
}

const VARIANT_STYLES: Record<
  NonNullable<LayoutProps["variant"]>,
  {
    wrapper: string;
    title: string;
    description: string;
  }
> = {
  dark: {
    wrapper:
      "min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 py-12 px-4 text-slate-100",
    title: "text-4xl font-semibold tracking-tight text-slate-50",
    description: "mx-auto max-w-2xl text-lg text-slate-300",
  },
  light: {
    wrapper:
      "min-h-screen bg-gradient-to-br from-surface-50 via-white to-surface-100 py-12 px-4 text-surface-900",
    title: "text-4xl font-semibold tracking-tight text-surface-900",
    description: "mx-auto max-w-2xl text-lg text-surface-600",
  },
};

export default function Layout({
  title,
  description,
  children,
  hero,
  variant = "dark",
}: LayoutProps) {
  const variantStyles = VARIANT_STYLES[variant];

  return (
    <section className={variantStyles.wrapper}>
      <div className="mx-auto flex max-w-5xl flex-col gap-10">
        {hero ? (
          hero
        ) : (
          (title || description) && (
            <header className="flex flex-col gap-4 text-center">
              {title ? <h1 className={variantStyles.title}>{title}</h1> : null}
              {description ? <p className={variantStyles.description}>{description}</p> : null}
            </header>
          )
        )}

        {children}
      </div>
    </section>
  );
}
