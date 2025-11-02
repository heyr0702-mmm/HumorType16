import Head from "next/head";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Head>
        <title>HumorType16</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
      </Head>
      <main className="min-h-screen bg-slate-50 text-slate-900">
        <section className="mx-auto flex min-h-screen max-w-5xl flex-col gap-12 py-8 px-6">
          <header className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-indigo-500">HumorType16</p>
              <h1 className="text-3xl font-bold">ユーモアタイプ診断（MBTIライク）</h1>
            </div>
            <nav className="flex gap-6 text-sm font-medium text-slate-600">
              <Link href="/diagnose" className="transition hover:text-slate-900">
                診断
              </Link>
              <Link href="/result-gate" className="transition hover:text-slate-900">
                結果を見る
              </Link>
              <Link href="/about" className="transition hover:text-slate-900">
                サービスについて
              </Link>
            </nav>
          </header>

          <div className="flex flex-1 flex-col justify-center gap-10">
            <div className="max-w-2xl space-y-6">
              <div className="space-y-3">
                <p className="text-sm font-semibold text-indigo-500">Find your humor archetype</p>
                <h2 className="text-4xl font-semibold leading-tight">
                  あなたのユーモアタイプを16タイプから診断してみましょう。
                </h2>
                <p className="text-base text-slate-600">
                  シンプルな質問に答えるだけで、あなたのユーモアの傾向が見えてきます。診断は数分で完了し、結果はすぐに確認できます。
                </p>
              </div>
              <Link
                href="/diagnose"
                className="inline-flex items-center justify-center rounded-full bg-indigo-500 px-6 py-3 text-base font-semibold text-white transition hover:bg-indigo-400"
              >
                診断をはじめる
              </Link>
            </div>

            <div className="max-w-xl rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-slate-900">広告について</h3>
              <p className="mt-3 text-sm text-slate-600">
                現在、広告は審査中のためダミー表示となっています。正式な広告配信が開始されるまで今しばらくお待ちください。
              </p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
