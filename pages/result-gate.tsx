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
        <title>結果表示について | HumorType16</title>
        <meta name="robots" content="noindex" />
        <meta
          name="description"
          content="HumorType16 の結果ページに進む前に、データ利用方針や表示順序についてご案内するページです。"
        />
      </Head>
      <section className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 py-16 px-4 text-slate-100">
        <div className="mx-auto max-w-3xl rounded-3xl border border-slate-800/60 bg-slate-950/60 p-8 shadow-soft backdrop-blur">
          <header className="space-y-2 text-center">
            <h1 className="text-3xl font-semibold tracking-tight">結果表示について</h1>
            <p className="text-sm text-slate-300">
              診断結果ページへ進む前に、HumorType16 がどのように結果を取り扱い、どの順序で情報を提示するかをご案内します。
            </p>
          </header>

          <div className="mt-8 space-y-6 text-sm leading-relaxed text-slate-200">
            <p>
              HumorType16 は、回答者が自分のユーモア傾向を理解し、日々のコミュニケーションに活かすための指針を提供する診断サービスです。
              診断で取得するのは匿名の回答のみで、メールアドレスなどの個人情報は必要ありません。
              集計したデータは傾向分析と体験改善に利用し、それ以外の目的には用いません。
            </p>
            <p>
              結果ページでは、見出し・グラフ・要約コメントなど主要な本文を最初に掲載し、その内容を十分に読んでから広告枠が現れる構成としています。
              広告は 1～2 枠に限定し、読み進める体験を妨げない位置へ配置します。
              現在はスポンサー動画による解放機能を停止しており、結果の全てをそのまま閲覧できます。
            </p>
            <p>
              プライバシーの詳細やデータの扱いについては
              <Link href="/privacy" className="text-sky-300 underline-offset-4 hover:underline">
                プライバシーポリシー
              </Link>
              をご確認ください。
              直近の診断結果が保存されている場合は、数秒以内に自動で該当ページへ遷移します。
              保存が見つからない場合は、以下のボタンから新しく診断を開始できます。
            </p>
          </div>

          <div className="mt-10 flex flex-col items-center gap-4 text-center text-sm text-slate-300">
            {status === "checking" || status === "redirecting" ? (
              <p>
                診断結果を確認しています。保存済みの結果がある場合は自動でページが切り替わります。
              </p>
            ) : (
              <>
                <p>直近の診断結果が見つかりませんでした。よろしければもう一度診断してみましょう。</p>
                <Link
                  href="/diagnose"
                  className="inline-flex items-center justify-center rounded-xl bg-sky-500 px-6 py-3 font-medium text-white transition hover:bg-sky-400"
                >
                  診断を始める
                </Link>
              </>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
