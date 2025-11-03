import { ReactNode } from "react";

interface LayoutProps {
  title: string;
  description: string;
  children: ReactNode;
}

export default function Layout({ title, description, children }: LayoutProps) {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 py-12 px-4 text-slate-100">
      <div className="mx-auto flex max-w-5xl flex-col gap-10">
        <header className="flex flex-col gap-4 text-center">
          <h1 className="text-4xl font-semibold tracking-tight text-slate-50">{title}</h1>
          <p className="mx-auto max-w-2xl text-lg text-slate-300">{description}</p>
        </header>

        {children}
      </div>
    </main>
  );
}
