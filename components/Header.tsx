import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState, type SVGProps } from "react";

const NAV_ITEMS = [
  { href: "/", label: "Home" },
  { href: "/test", label: "診断" },
  { href: "/about", label: "About" },
  { href: "/vision", label: "Vision" },
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
];

const MenuIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <line x1="4" x2="20" y1="6" y2="6" />
    <line x1="4" x2="20" y1="12" y2="12" />
    <line x1="4" x2="20" y1="18" y2="18" />
  </svg>
);

const XIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <line x1="18" x2="6" y1="6" y2="18" />
    <line x1="6" x2="18" y1="6" y2="18" />
  </svg>
);

export default function Header() {
  const { pathname } = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

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
      <button
        type="button"
        aria-expanded={isOpen}
        aria-controls="mobile-nav"
        onClick={() => setIsOpen((prev) => !prev)}
        className="ml-4 inline-flex items-center justify-center rounded-lg border border-gray-200 p-2 text-[#1F1F1F] shadow-sm transition hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1F1F1F] focus-visible:ring-offset-2 md:hidden"
      >
        <span className="sr-only">メニューを開閉</span>
        {isOpen ? <XIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
      </button>
      {isOpen ? (
        <div
          id="mobile-nav"
          className="absolute left-0 right-0 top-full mx-6 mt-4 rounded-2xl border border-gray-200 bg-white shadow-lg sm:mx-8 md:hidden"
        >
          <nav className="flex flex-col divide-y divide-gray-100 text-sm">
            {NAV_ITEMS.map((item) => {
              const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`flex items-center justify-between px-4 py-3 transition-colors duration-200 hover:bg-gray-50 ${
                    active ? "font-semibold text-[#2B2B2B]" : "text-[#3A3A3A]"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      ) : null}
    </header>
  );
}
