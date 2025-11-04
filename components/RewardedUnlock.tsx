import { useEffect, useState, type ReactNode } from "react";
import { playRewarded } from "../lib/ima";

type UnlockStatus = "locked" | "unlocking" | "unlocked";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

interface RewardedUnlockProps {
  unlockKey: string;
  children: ReactNode;
  className?: string;
}

const AD_TAG_URL = process.env.NEXT_PUBLIC_IMA_AD_TAG_URL ?? "";

function getStoredUnlock(unlockKey: string): boolean {
  if (typeof window === "undefined") {
    return false;
  }

  try {
    return window.localStorage.getItem(unlockKey) === "unlocked";
  } catch (error) {
    console.warn("Failed to read unlock state", error);
    return false;
  }
}

function persistUnlock(unlockKey: string) {
  if (typeof window === "undefined") {
    return;
  }

  try {
    window.localStorage.setItem(unlockKey, "unlocked");
  } catch (error) {
    console.warn("Failed to persist unlock state", error);
  }
}

export default function RewardedUnlock({ unlockKey, children, className }: RewardedUnlockProps) {
  const [status, setStatus] = useState<UnlockStatus>("locked");
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    setMessage(null);

    if (getStoredUnlock(unlockKey)) {
      setStatus("unlocked");
      return;
    }

    if (!AD_TAG_URL) {
      setStatus("unlocked");
      setMessage("スポンサー動画が現在利用できないため、すぐに続きを表示します。");
      if (typeof window !== "undefined") {
        window.gtag?.("event", "rewarded_unlock_missing_tag", {
          unlock_key: unlockKey,
        });
      }
      return;
    }

    setStatus("locked");
  }, [unlockKey]);

  useEffect(() => {
    if (status === "unlocked") {
      persistUnlock(unlockKey);
    }
  }, [status, unlockKey]);

  const isUnlocked = status === "unlocked";
  const isUnlocking = status === "unlocking";

  const unlockImmediately = (
    notice: string,
    eventName: string,
    extraData?: Record<string, unknown>,
  ) => {
    setMessage(notice);
    setStatus("unlocked");
    if (typeof window !== "undefined") {
      window.gtag?.("event", eventName, {
        unlock_key: unlockKey,
        ...extraData,
      });
    }
  };

  const handleUnlock = async () => {
    if (isUnlocking || isUnlocked) {
      return;
    }

    if (!AD_TAG_URL) {
      unlockImmediately("スポンサー動画が現在利用できないため、すぐに続きを表示します。", "rewarded_unlock_missing_tag");
      return;
    }

    setStatus("unlocking");
    setMessage(null);

    if (typeof window !== "undefined") {
      window.gtag?.("event", "rewarded_unlock_start", {
        unlock_key: unlockKey,
      });
    }

    try {
      await playRewarded(AD_TAG_URL);
      setStatus("unlocked");
      setMessage("動画の視聴が完了したので続きを解放しました。");
      if (typeof window !== "undefined") {
        window.gtag?.("event", "rewarded_unlock_complete", {
          unlock_key: unlockKey,
        });
      }
    } catch (error) {
      console.error("Rewarded playback failed", error);
      const errorMessage = error instanceof Error ? error.message : String(error);
      unlockImmediately(
        "スポンサー動画を再生できなかったため、すぐに続きを表示します。",
        "rewarded_unlock_error",
        { error_message: errorMessage },
      );
    }
  };

  const handleRemindLater = () => {
    if (typeof window !== "undefined") {
      window.gtag?.("event", "rewarded_unlock_later", {
        unlock_key: unlockKey,
      });
    }
    setMessage("このセクションはいつでもスポンサー動画の視聴で解放できます。");
  };

  return (
    <div className={className}>
      <div className="relative rounded-2xl">
        <div
          className={`${
            isUnlocked ? "pointer-events-auto blur-0" : "pointer-events-none select-none blur-sm"
          } transition-all duration-300`}
          aria-hidden={!isUnlocked}
        >
          {children}
        </div>
        {!isUnlocked ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-5 rounded-2xl border border-slate-200 bg-white/90 p-6 text-center backdrop-blur">
            <div className="space-y-1">
              <p className="text-base font-semibold text-slate-900">スポンサー動画の視聴で続きを解放</p>
              <p className="text-sm text-slate-600">数十秒の視聴で追加の分析が読めるようになります。</p>
            </div>
            <div className="flex w-full flex-col gap-3 sm:flex-row sm:justify-center">
              <button
                type="button"
                onClick={handleUnlock}
                disabled={isUnlocking}
                className="inline-flex items-center justify-center rounded-full bg-slate-900 px-6 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-700"
              >
                {isUnlocking ? "読み込み中…" : "動画を見て解放"}
              </button>
              <button
                type="button"
                onClick={handleRemindLater}
                className="inline-flex items-center justify-center rounded-full border border-slate-300 px-6 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:text-slate-900"
              >
                後で読む
              </button>
            </div>
          </div>
        ) : null}
      </div>
      {message ? (
        <div className="mt-4 rounded-xl border border-slate-200 bg-white/60 p-3 text-sm text-slate-700">
          {message}
        </div>
      ) : null}
    </div>
  );
}
