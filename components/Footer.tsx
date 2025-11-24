import Link from "next/link";

const FOOTER_ITEMS = [
  { href: "/", label: "Home" },
  { href: "/test", label: "診断スタート" },
  { href: "/about", label: "About" },
  { href: "/vision", label: "Vision" },
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
];

export default function Footer() {
  return (
    <footer className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-10 pt-12 sm:px-8">
      <div className="flex flex-col gap-4 text-xs text-[#777777] md:flex-row md:items-center md:justify-between">
        <span>in the Humorverse</span>
        <nav>
          <ul className="flex flex-wrap items-center gap-5">
            {FOOTER_ITEMS.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="transition-opacity duration-300 ease-in-out hover:opacity-80"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  );
}
