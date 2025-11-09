import { PropsWithChildren } from "react";

type HeroProps = PropsWithChildren<{
  title: string;
  subtitle?: string;
}>;

export default function Hero({ title, subtitle, children }: HeroProps) {
  return (
    <section className="mx-auto max-w-5xl px-4 pt-16 pb-10 text-center sm:px-6 md:pt-20 md:pb-14 lg:px-8">
      <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">{title}</h1>
      {subtitle ? (
        <p className="mt-3 text-base text-zinc-600 dark:text-zinc-300 md:text-lg">{subtitle}</p>
      ) : null}
      {children ? <div className="mt-6">{children}</div> : null}
    </section>
  );
}
