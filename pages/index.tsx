import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>HumorType16</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
      </Head>
      <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-slate-100 flex items-center justify-center px-6 py-16">
        <div className="max-w-3xl w-full border border-slate-700/60 rounded-2xl bg-slate-900/70 backdrop-blur-sm p-8 shadow-xl">
          <h1 className="text-4xl font-semibold tracking-tight">HumorType16</h1>
          <p className="mt-5 text-lg text-slate-200/90">ユーモアタイプ診断（MBTIライク）・プレビュー表示中。</p>
          <p className="mt-3 text-slate-300/80">このページが見えたら、Vercelのデプロイ成功です。</p>
        </div>
      </main>
    </>
  );
}
