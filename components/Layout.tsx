import { PropsWithChildren, ReactNode } from "react";
import AmbientBackground from "./AmbientBackground";
import Header from "./Header";
import Footer from "./Footer";

type LayoutProps = PropsWithChildren<{
  footerSlot?: ReactNode;
}>;

export default function Layout({ children, footerSlot }: LayoutProps) {
  return (
    <div className="relative flex min-h-screen flex-col text-zinc-900 dark:text-zinc-50">
      <AmbientBackground />
      <Header />
      <main className="flex-1">{children}</main>
      {footerSlot ? (
        <div className="border-t border-black/5 bg-white/70 backdrop-blur dark:border-white/5 dark:bg-zinc-900/70">
          <div className="mx-auto w-full max-w-5xl px-4 py-4 sm:px-6 lg:px-8">{footerSlot}</div>
        </div>
      ) : null}
      <Footer />
    </div>
  );
}
