import Image from "next/image";
import Link from "next/link";
import { useCallback, useMemo, useState } from "react";
import type { CSSProperties } from "react";
import type { HumorFamilyCode, HumorTypeDetail } from "../data/humor-types";
import { buildShareUrl, copyToClipboard } from "../utils/share";

type CSSVarStyle = CSSProperties & {
  [key: `--${string}`]: string | number;
};

type ShareStatus = "idle" | "copied" | "error";

const FAMILY_ACCENTS: Record<HumorFamilyCode, string> = {
  EA: "#1D7ED6",
  EC: "#2FA36B",
  IA: "#E67E22",
  IC: "#6E56CF",
};

interface ResultHeaderProps {
  typeDetail: HumorTypeDetail;
  familyCode: HumorFamilyCode;
  familyTagline?: string | null;
  shareUrl: string;
}

export default function ResultHeader({
  typeDetail,
  familyCode,
  familyTagline,
  shareUrl,
}: ResultHeaderProps) {
  const [shareStatus, setShareStatus] = useState<ShareStatus>("idle");
  const accentColor = FAMILY_ACCENTS[familyCode];

  const hasFamilyTagline = typeof familyTagline === "string" && familyTagline.trim().length > 0;

  const sharePath = useMemo(() => {
    if (shareUrl && !shareUrl.startsWith("http")) {
      return shareUrl;
    }

    return `/result/${typeDetail.code}`;
  }, [shareUrl, typeDetail.code]);

  const resolvedShareUrl = useMemo(() => {
    if (shareUrl && shareUrl.startsWith("http")) {
      return shareUrl;
    }

    return buildShareUrl(sharePath);
  }, [sharePath, shareUrl]);

  const bandStyle = useMemo(
    () => ({
      background: `linear-gradient(135deg, ${typeDetail.themeSoft ?? "#FAF9FF"} 0%, rgba(255, 255, 255, 0.9) 65%)`,
    }),
    [typeDetail.themeSoft]
  );

  const shareText = `HumorType16で「${typeDetail.title}」タイプでした。${typeDetail.catch}`;

  const xShareHref = useMemo(() => {
    return `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(
      resolvedShareUrl
    )}&hashtags=HumorType16`;
  }, [resolvedShareUrl, shareText]);

  const lineShareHref = useMemo(() => {
    return `https://line.me/R/msg/text/?${encodeURIComponent(`${shareText}\n${resolvedShareUrl}`)}`;
  }, [resolvedShareUrl, shareText]);

  const handleCopyLink = useCallback(async () => {
    const copied = await copyToClipboard(resolvedShareUrl);

    if (copied) {
      setShareStatus("copied");
      setTimeout(() => setShareStatus("idle"), 2000);
      return;
    }

    if (typeof window !== "undefined" && typeof window.prompt === "function") {
      try {
        window.prompt("以下のURLをコピーしてください", resolvedShareUrl);
      } catch (error) {
        console.warn("Copy fallback unavailable", error);
      }
    } else {
      console.warn("Copy fallback unavailable");
    }

    setShareStatus("error");
    setTimeout(() => setShareStatus("idle"), 2000);
  }, [resolvedShareUrl]);

  const actionButtonStyle = useMemo<CSSProperties>(
    () => ({
      backgroundColor: accentColor,
      color: "#fff",
      borderColor: `${accentColor}20`,
    }),
    [accentColor]
  );

  const secondaryButtonStyle = useMemo<CSSProperties>(
    () => ({
      borderColor: `${accentColor}40`,
      color: accentColor,
      backgroundColor: "rgba(255, 255, 255, 0.9)",
    }),
    [accentColor]
  );

  const tertiaryButtonStyle = useMemo<CSSProperties>(
    () => ({
      borderColor: "rgba(31, 31, 31, 0.1)",
      color: "#5A5A5A",
      backgroundColor: "rgba(255, 255, 255, 0.85)",
    }),
    []
  );

  const focusRingStyle = useMemo<CSSVarStyle>(
    () => ({
      // Tailwind's ring utilities rely on this CSS variable.
      // Setting it ensures the custom accent color is applied on focus.
      "--tw-ring-color": accentColor,
    }),
    [accentColor]
  );

  return (
    <section
      className="relative overflow-hidden rounded-2xl border border-white/60 bg-white/80 shadow-sm backdrop-blur-sm"
      style={bandStyle}
    >
      <div className="relative flex flex-col gap-6 p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
            <div className="h-28 w-28 overflow-hidden rounded-2xl border border-white/70 bg-white/70 shadow-sm">
              <Image
                src={typeDetail.avatar}
                alt={`${typeDetail.title}のアバター`}
                width={112}
                height={112}
                className="h-full w-full object-cover"
                priority
              />
            </div>
            <div className="space-y-3 text-[#2B2B2B]">
              <span
                className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.3em] text-white"
                style={{ backgroundColor: accentColor }}
              >
                {familyCode} ファミリー
              </span>
              <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">{typeDetail.title}</h1>
              <p className="max-w-2xl text-base text-[#5A5A5A]">{typeDetail.catch}</p>
            </div>
          </div>
          <div className="flex items-start justify-end text-right">
            <div className="flex flex-col items-end text-right">
              <span className="mt-1 text-[28px]/[32px] font-semibold text-[#2B2B2B]">
                {typeDetail.code}
              </span>
              {hasFamilyTagline ? (
                <p className="mt-2 max-w-xs text-right text-sm text-[#5A5A5A]">{familyTagline}</p>
              ) : null}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 border-t border-white/70 pt-4 text-[#5A5A5A] sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm">
            あなたの診断結果をシェアしたり、もう一度チャレンジして友だちと盛り上がりましょう。
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <a
              href={xShareHref}
              target="_blank"
              rel="noopener noreferrer"
              className="focus-ring inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition duration-300 ease-in-out hover:opacity-90"
              style={{ ...actionButtonStyle, ...focusRingStyle }}
              data-testid="share-x-button"
            >
              Xでシェア
            </a>
            <a
              href={lineShareHref}
              target="_blank"
              rel="noopener noreferrer"
              className="focus-ring inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-semibold shadow-sm transition duration-300 ease-in-out hover:opacity-90"
              style={{ ...secondaryButtonStyle, ...focusRingStyle }}
              data-testid="share-line-button"
            >
              LINEで送る
            </a>
            <button
              type="button"
              onClick={handleCopyLink}
              className="focus-ring inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-semibold shadow-sm transition duration-300 ease-in-out hover:opacity-90"
              style={{ ...tertiaryButtonStyle, ...focusRingStyle }}
              data-testid="copy-link-button"
            >
              {shareStatus === "copied" ? "リンクをコピー済" : "リンクをコピー"}
            </button>
            <Link
              href="/test"
              className="focus-ring inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-semibold text-[#2B2B2B] shadow-sm transition duration-300 ease-in-out hover:opacity-90"
              style={{ ...tertiaryButtonStyle, ...focusRingStyle }}
              data-testid="retry-button"
            >
              もう一度診断
            </Link>
          </div>
        </div>
        <span className="sr-only" aria-live="polite">
          {shareStatus === "copied" && "リンクをコピーしました"}
          {shareStatus === "error" && "リンクをコピーできませんでした"}
        </span>
      </div>
    </section>
  );
}
