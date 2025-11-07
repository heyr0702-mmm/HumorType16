import Head from "next/head";

// ※このページでは AdSense を読み込まない（審査・ポリシー対策）
export default function AboutPage() {
  return (
    <>
      <Head>
        <title>About | HumorType16</title>
        <meta name="description" content="HumorType16 についてのご案内。" />
      </Head>
      <section className="space-y-6">
        <h1 className="text-2xl font-semibold">About</h1>
        <p className="leading-relaxed text-gray-700">
          HumorType16 は、笑いのセンスやユーモアのタイプを診断する Web サービスです。MBTI のような 16 分類の笑いタイプを通じて、自分や友人のユーモア傾向を楽しく知ることができます。
        </p>
        <p className="leading-relaxed text-gray-700">
          サービスは小規模チームで開発・運営しており、診断コンテンツの改善や新機能の実験を継続的に行っています。ご意見やフィードバックがあれば、お気軽にお知らせください。
        </p>
      </section>
    </>
  );
}
