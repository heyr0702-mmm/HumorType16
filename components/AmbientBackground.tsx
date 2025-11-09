import { useEffect, useRef } from "react";

export default function AmbientBackground() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let t = 0;
    let raf = 0;
    const loop = () => {
      t += 0.0045;
      const glow = 0.35 + Math.sin(t) * 0.15;
      el.style.setProperty("--glow", String(glow));
      raf = requestAnimationFrame(loop);
    };

    raf = requestAnimationFrame(loop);

    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(1200px_800px_at_20%_20%,rgba(120,96,255,0.16),transparent),radial-gradient(900px_700px_at_80%_30%,rgba(44,201,140,0.16),transparent),linear-gradient(180deg,rgba(255,255,255,1),rgba(250,248,255,1))] before:absolute before:inset-0 before:bg-[radial-gradient(540px_540px_at_50%_110%,rgba(120,96,255,0.36),transparent)] before:opacity-[var(--glow,0.4)] before:content-[''] dark:bg-[radial-gradient(1200px_800px_at_20%_20%,rgba(120,96,255,0.18),transparent),radial-gradient(900px_700px_at_80%_30%,rgba(44,201,140,0.18),transparent),linear-gradient(180deg,rgba(18,18,22,1),rgba(10,10,14,1))]"
    />
  );
}
