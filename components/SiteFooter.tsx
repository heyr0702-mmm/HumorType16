import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="mt-16 border-t">
      <div className="mx-auto flex max-w-5xl flex-col gap-3 px-4 py-6 text-sm text-gray-600 md:flex-row md:items-center md:justify-between">
        <p>© {new Date().getFullYear()} HumorType16</p>
        <nav className="flex flex-wrap gap-4">
          <Link href="/">診断</Link>
          <Link href="/about">About</Link>
          <Link href="/privacy">Privacy</Link>
          <Link href="/terms">Terms</Link>
        </nav>
      </div>
    </footer>
  );
}
