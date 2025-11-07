import Head from "next/head";

// ※このページでは AdSense を読み込まない（審査・ポリシー対策）
export default function AboutPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "HumorType16とは",
    url: "https://humor-type16.vercel.app/about",
    description:
      "Energy / Approach / Tone / Style の4軸で“笑いの骨格”を可視化し、16タイプに分類するユーモア診断の紹介ページ。",
    inLanguage: "ja",
  };

  return (
    <>
      <Head>
        <title>HumorType16とは｜あなたの「笑いの骨格」を4軸で可視化</title>
        <meta
          name="description"
          content="HumorType16は、Energy / Approach / Tone / Styleの4軸から“笑いの骨格”を分析し、16タイプに分類するユーモア診断です。"
        />

        {/* OGP */}
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="HumorType16とは｜あなたの「笑いの骨格」を4軸で可視化"
        />
        <meta
          property="og:description"
          content="4軸×16タイプで、あなたのユーモアの設計図を言語化します。"
        />
        <meta property="og:url" content="https://humor-type16.vercel.app/about" />
        <meta property="og:image" content="https://humor-type16.vercel.app/og/about.png" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="HumorType16とは｜あなたの「笑いの骨格」を4軸で可視化"
        />
        <meta
          name="twitter:description"
          content="Energy・Approach・Tone・Styleの4軸からユーモアを解剖。16タイプで笑いの個性と相性が分かる診断です。"
        />
        <meta
          name="twitter:image"
          content="https://humor-type16.vercel.app/og/about.png"
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </Head>

      <main className="mx-auto max-w-3xl px-5 py-10">
        <h1 className="text-3xl font-bold mb-6">HumorType16とは</h1>

        <p className="mb-6 leading-relaxed">
          <strong>HumorType16</strong> は、あなたの「笑いの骨格」を
          <strong> 4つの要素（Energy / Approach / Tone / Style）</strong>で読み解き、
          <strong>16タイプ</strong>に分類するユーモア診断です。人が笑う瞬間には、性格より深い
          「思考のクセ」「感情の重力」「タイミングの習性」が潜んでいます。HumorType16は、その見えない設計図を言語化し、
          「どんな笑いを生み、どんな笑いに惹かれるのか」を可視化します。
        </p>

        <section className="space-y-5 mb-10">
          <h2 className="text-xl font-semibold">4つの要素と2極</h2>

          <div>
            <h3 className="font-semibold">Energy（エネルギー）｜E / I</h3>
            <p className="text-sm text-gray-700">
              笑いの出力方向。<strong>E（External）</strong>は場へ広げ、<strong>I（Internal）</strong>は内で熟して一点刺し。
            </p>
          </div>

          <div>
            <h3 className="font-semibold">Approach（アプローチ）｜A / C</h3>
            <p className="text-sm text-gray-700">
              笑いのつくり方。<strong>A（Absurd）</strong>は飛躍・不条理、<strong>C（Coherent）</strong>は筋道・整合で組み立てる。
            </p>
          </div>

          <div>
            <h3 className="font-semibold">Tone（トーン）｜L / E</h3>
            <p className="text-sm text-gray-700">
              笑いの温度。<strong>L（Lyrical）</strong>はあたたかさ・共感、<strong>E（Edgy）</strong>は切れ味・知性で刺す。
            </p>
          </div>

          <div>
            <h3 className="font-semibold">Style（スタイル）｜S / P</h3>
            <p className="text-sm text-gray-700">
              笑いのタイミングと構成。<strong>S（Spontaneous）</strong>は即興で拾い、<strong>P（Planned）</strong>は伏線で回収する。
            </p>
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">何がわかるのか</h2>
          <p className="leading-relaxed">
            自分の笑いの特徴を知るだけでなく、仲間・恋人・職場での
            <strong>ユーモアの相性</strong>が見えてきます。
            「なぜあの人のボケが刺さらないのか」「なぜこの人とはずっと笑っていられるのか」——
            その理由をタイプ構造として言語化します。
          </p>
          <p className="text-sm text-gray-700">
            ※ 診断ロジックは E / I・A / C・L / E・S / P の組み合わせで構成され、表記（用語）はUI表現として最適化しています。
          </p>
        </section>
      </main>
    </>
  );
}
