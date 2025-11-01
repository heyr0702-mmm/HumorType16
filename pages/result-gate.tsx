"use client";

import { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import AdSlot from "../components/AdSlot";

export default function HumorResultGate() {
  const router = useRouter();
  const [typeCode, setTypeCode] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const saved = window.localStorage.getItem("humorType16-last-result");
    if (saved) {
      setTypeCode(saved);
    }
  }, []);

  const handleContinue = () => {
    if (!typeCode) return;
    void router.push(`/result/${typeCode}`);
  };

  return (
    <>
      <Head>
        <title>HumorType16 – 結果を表示する前に</title>
        <meta name="robots" content="noindex" />
      </Head>
      <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 py-12 px-4 text-slate-100">
        <div className="mx-auto flex max-w-3xl flex-col gap-8">
          <header className="text-center space-y-2">
            <h1 className="text-3xl font-semibold">診断結果を表示する前に</h1>
            <p className="text-slate-300 text-sm">
              このサイトはユーモア診断を無料で提供しているため、結果を表示する前にスポンサー表示を行っています。
            </p>
          </header>

          <div className="rounded-2xl border border-slate-800/60 bg-slate-900/70 p-6">
            <p className="text-sm mb-3 text-slate-200">スポンサー表示</p>
            <AdSlot className="w-full" />
            <p className="text-xs mt-3 text-slate-400">
              ※ 広告が表示されない場合はそのまま「診断結果を表示する」を押してください。
            </p>
          </div>

          <div className="flex justify-center">
            <button
              onClick={handleContinue}
              disabled={!typeCode}
              className={`px-6 py-3 rounded-xl text-sm font-medium ${
                typeCode ? "bg-sky-500 hover:bg-sky-400" : "bg-slate-500 cursor-not-allowed"
              }`}
            >
              診断結果を表示する
            </button>
          </div>
        </div>
      </main>
    </>
  );
}
