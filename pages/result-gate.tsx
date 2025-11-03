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
      <main className="min-h-screen bg-slate-50 py-12 px-4 text-slate-900">
        <div className="mx-auto flex max-w-3xl flex-col gap-8">
          <header className="space-y-2 text-center">
            <h1 className="text-2xl font-semibold text-slate-900">診断結果を表示する前に</h1>
            <p className="text-sm text-slate-600">
              このサイトはユーモア診断を無料で提供しているため、結果を表示する前にスポンサー表示を行っています。
            </p>
          </header>

          <div className="card-default bg-white py-8 px-6">
            <p className="mb-3 text-sm font-semibold text-slate-600">スポンサー表示</p>
            <AdSlot className="w-full" />
            <p className="mt-3 text-xs text-slate-500">
              ※ 広告が表示されない場合はそのまま「診断結果を表示する」を押してください。
            </p>
          </div>

          <div className="flex justify-center">
            <button
              onClick={handleContinue}
              disabled={!typeCode}
              className={`px-8 py-3 text-sm font-semibold text-white shadow-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 ${
                typeCode
                  ? "bg-indigo-600 hover:bg-indigo-500"
                  : "cursor-not-allowed bg-slate-300 text-slate-500 focus-visible:ring-offset-0"
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
