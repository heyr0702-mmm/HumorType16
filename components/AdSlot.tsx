import { useEffect } from "react";

interface AdSlotProps extends React.HTMLAttributes<HTMLDivElement> {
  adSlot?: string;
}

export default function AdSlot({ className, adSlot, ...rest }: AdSlotProps) {
  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    try {
      ((window as typeof window & { adsbygoogle?: unknown[] }).adsbygoogle ||= []).push({});
    } catch (error) {
      console.error("Failed to load Google AdSense slot", error);
    }
  }, [adSlot]);

  const containerClassName = ["flex justify-center", className].filter(Boolean).join(" ");

  return (
    <div className={containerClassName} {...rest}>
      <ins
        className="adsbygoogle block w-full"
        style={{ display: "block" }}
        data-ad-client="ca-pub-8802783650388237"
        {...(adSlot ? { "data-ad-slot": adSlot } : {})}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}
