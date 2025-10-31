import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>HumorType16</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-EV89MLXEXB"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);} 
gtag('js', new Date());
gtag('config', 'G-EV89MLXEXB');`,
          }}
        />
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8802783650388237"
          crossOrigin="anonymous"
        />
      </Head>
      <main className="min-h-screen bg-slate-50 text-slate-900 flex items-center justify-center p-8">
        <div className="max-w-3xl w-full border border-slate-200 rounded-xl bg-white p-6 shadow-sm">
          <h1 className="text-3xl font-semibold">HumorType16</h1>
          <p className="mt-4">ユーモアタイプ診断（MBTIライク）・プレビュー表示中。</p>
          <p className="mt-2">このページが見えたら、Vercelのデプロイ成功です。</p>
        </div>
      </main>
    </>
  );
}
