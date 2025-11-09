import Link from "next/link";
import { useRouter } from "next/router";

const NAV_ITEMS = [
  { href: "/test", label: "診断する" },
  { href: "/about", label: "About" },
  { href: "/vision", label: "Vision" },
  { href: "/privacy", label: "プライバシーポリシー" },
];

export default function Header() {
  const { pathname } = useRouter();

  return (
    <header className="relative z-10 mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-6 sm:px-8">
      <Link href="/" className="flex items-center gap-3 text-[#2B2B2B]">
        <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-[#1F1F1F] text-lg font-bold text-white">
          H
        </span>
        <span className="font-semibold tracking-tight">HumorType16</span>
      </Link>
      <nav className="hidden items-center gap-8 text-sm md:flex">
        {NAV_ITEMS.map((item) => {
          const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={active ? "page" : undefined}
              className={`transition-opacity duration-300 ease-in-out hover:opacity-80 ${
                active ? "font-semibold text-[#2B2B2B]" : "text-[#3A3A3A]"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
