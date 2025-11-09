import { ReactNode } from "react";
import { motion } from "framer-motion";
import Header from "./Header";
import Footer from "./Footer";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-[#FAF9FF] via-[#FFF9F5] to-[#F7EFE6] text-[#2B2B2B]">
      <motion.div
        aria-hidden
        className="humor-breath-left pointer-events-none absolute -top-24 -left-24 h-[44rem] w-[44rem] rounded-full bg-gradient-to-br from-[#EAE2FF]/50 via-[#EAF6FF]/40 to-[#FFECE5]/40 blur-3xl"
        animate={{ scale: [1, 1.03, 1], opacity: [0.6, 0.75, 0.6] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="humor-breath-right pointer-events-none absolute -bottom-28 -right-20 h-[38rem] w-[38rem] rounded-full bg-gradient-to-tl from-[#E8E1FF]/45 via-[#E7F3FF]/35 to-[#FFE9E3]/35 blur-3xl"
        animate={{ scale: [1, 1.05, 1], opacity: [0.55, 0.7, 0.55] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="relative z-10 flex min-h-screen flex-col">
        <Header />
        <main className="relative flex-1">{children}</main>
        <Footer />
      </div>
    </div>
  );
}
