import { useEffect } from "react";

declare global {
  interface Window {
    adsbygoogle: any[] | undefined;
  }
}

export default function AdSlot({
  slotId,
  minHeight = 280,
  className = "",
}: {
  slotId: string;
  minHeight?: number;
  className?: string;
}) {
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch {
        // Ignore errors to avoid blocking rendering when AdSense is unavailable.
      }
    }
  }, []);

  return (
    <ins
      className={`adsbygoogle ${className}`.trim()}
      style={{ display: "block", minHeight }}
      data-ad-client="ca-pub-8802783650388237"
      data-ad-slot={slotId}
      data-ad-format="auto"
      data-full-width-responsive="true"
    />
  );
}
