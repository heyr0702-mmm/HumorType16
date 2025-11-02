import { useEffect, useState } from "react";

interface AdSlotProps extends React.HTMLAttributes<HTMLDivElement> {
  adSlot?: string;
}

export default function AdSlot({ className, adSlot, ...rest }: AdSlotProps) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const adsWindow = window as typeof window & {
      adsbygoogle?: { push: (args: unknown) => void } & unknown[];
    };

    if (!adsWindow.adsbygoogle || typeof adsWindow.adsbygoogle.push !== "function") {
      console.warn("Google AdSense is not available; showing placeholder.");
      return;
    }

    try {
      adsWindow.adsbygoogle.push({});
      setReady(true);
    } catch (error) {
      console.warn("Failed to load Google AdSense slot", error);
    }
  }, [adSlot]);

  const containerClassName = ["flex justify-center", className].filter(Boolean).join(" ");

  return (
    <div className={containerClassName} {...rest}>
      {/* TODO: Read data-ad-client value from an environment variable. */}
      {ready ? (
        <ins
          className="adsbygoogle block w-full"
          style={{ display: "block" }}
          data-ad-client="ca-pub-8802783650388237"
          {...(adSlot ? { "data-ad-slot": adSlot } : {})}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      ) : (
        <div className="flex h-32 w-full items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-100 text-sm text-slate-500">
          広告枠（審査中 / ダミー表示です）
        </div>
      )}
    </div>
  );
}
