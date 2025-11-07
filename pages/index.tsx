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
      <section className="flex flex-col gap-12 py-8">
        <header className="flex flex-col gap-2">
          <p className="text-sm font-semibold uppercase tracking-wide text-indigo-500">HumorType16</p>
          <h1 className="text-3xl font-bold">ユーモアタイプ診断（MBTIライク）</h1>
          <p className="text-base text-slate-600">
            シンプルな質問に答えるだけで、あなたのユーモアの傾向が見えてきます。診断は数分で完了し、結果はすぐに確認できます。
          </p>
        </header>

        <div className="flex flex-col gap-10 lg:flex-row lg:items-start">
          <div className="flex-1 space-y-6">
            <div className="space-y-3">
              <p className="text-sm font-semibold text-indigo-500">Find your humor archetype</p>
              <h2 className="text-4xl font-semibold leading-tight">
                あなたのユーモアタイプを16タイプから診断してみましょう。
              </h2>
              <p className="text-base text-slate-600">
                気になる質問に直感で回答してみてください。診断後は、あなたに近いお笑いのスタイルや特徴を丁寧にフィードバックします。
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
    </>
  );
}
