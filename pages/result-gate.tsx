"use client";

import { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

export default function HumorResultGate() {
  const router = useRouter();
  const [status, setStatus] = useState<"checking" | "redirecting" | "empty">(
    "checking",
  );

  useEffect(() => {
    if (typeof window === "undefined") return;
    const saved = window.localStorage.getItem("humorType16-last-result");
    if (saved) {
      setStatus("redirecting");
      void router.replace(`/result/${saved}`);
    } else {
      setStatus("empty");
    }
  }, [router]);

  return (
    <>
      <Head>
        <title>HumorType16 – 結果を表示する前に</title>
        <meta name="robots" content="noindex" />
      </Head>
      <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 py-12 px-4 text-slate-100">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 text-center">
          <h1 className="text-3xl font-semibold">診断結果を表示する前に</h1>
          {status !== "empty" ? (
            <p className="text-slate-300 text-sm">診断結果を読み込んでいます…</p>
          ) : (
            <>
              <p className="text-slate-300 text-sm">
                直近の診断結果が見つかりませんでした。もう一度診断を行ってみませんか？
              </p>
              <Link
                href="/diagnose"
                className="rounded-xl bg-sky-500 px-6 py-3 text-sm font-medium text-white hover:bg-sky-400"
              >
                診断を始める
              </Link>
            </>
          )}
        </div>
      </main>
    </>
  );
}
