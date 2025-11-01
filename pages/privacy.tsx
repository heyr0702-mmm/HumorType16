import Head from "next/head";

const sections = [
  {
    id: "about",
    title: "当サイトについて",
    body: (
      <p className="leading-7 text-gray-700">
        当サイト「HumorType16」は、ユーモアタイプ診断に関する情報と体験を提供する個人運営のウェブサイトです。利用者のみなさまに安心してご利用いただけるよう、個人情報とプライバシーの保護を最優先に考えています。
      </p>
    ),
  },
  {
    id: "collection",
    title: "収集する情報",
    body: (
      <p className="leading-7 text-gray-700">
        当サイトでは、広告配信およびアクセス解析のために Cookie や類似技術を通じて匿名の利用状況情報を収集する場合があります。これらの情報にはブラウザやデバイスの種類、閲覧したページ、アクセス日時などが含まれますが、特定の個人を識別するものではありません。
      </p>
    ),
  },
  {
    id: "adsense",
    title: "Google AdSense について",
    body: (
      <div className="space-y-4 text-gray-700">
        <p className="leading-7">
          当サイトでは、Google が提供する広告配信サービス「Google AdSense」を利用しています。パブリッシャー ID は「ca-pub-8802783650388237」です。Google およびそのパートナーは Cookie を使用してユーザーの興味に応じた広告を表示することがあります。
        </p>
        <pre className="whitespace-pre-wrap rounded-md bg-gray-100 p-4 text-sm font-mono text-gray-800">
{`<script
  async
  src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8802783650388237"
  crossorigin="anonymous"></script>`}
        </pre>
        <p className="leading-7">
          広告設定は Google の広告設定ページで無効化できます。詳細は Google 広告ポリシーをご確認ください。
        </p>
      </div>
    ),
  },
  {
    id: "analytics",
    title: "Google Analytics について",
    body: (
      <p className="leading-7 text-gray-700">
        当サイトではアクセス解析のために「Google Analytics」を利用しています。計測 ID は「G-EV89MLXEXB」です。Google Analytics は Cookie を利用して利用者の行動を分析し、サイト改善のための統計情報として使用します。この情報は匿名で収集され、個人を特定する目的では利用されません。
      </p>
    ),
  },
  {
    id: "cookie",
    title: "Cookie について",
    body: (
      <p className="leading-7 text-gray-700">
        Cookie は、利用者がサイトを訪問した際にブラウザへ保存される小さなデータファイルです。利用者はブラウザの設定から Cookie を無効化したり、保存済みの Cookie を削除することができます。Cookie を無効化した場合、当サイトの一部機能が利用できなくなる可能性がありますのでご了承ください。
      </p>
    ),
  },
  {
    id: "contact",
    title: "お問い合わせ先",
    body: (
      <p className="leading-7 text-gray-700">
        プライバシーに関するご質問やお問い合わせは、humortype16.info@gmail.com までメールでご連絡ください。迅速な回答に努めますが、返信までに数日かかる場合があります。
      </p>
    ),
  },
];

const PrivacyPage = () => {
  return (
    <>
      <Head>
        <title>プライバシーポリシー | HumorType16</title>
        <meta name="description" content="HumorType16 のプライバシーポリシー" />
      </Head>
      <main className="min-h-screen bg-white py-16">
        <div className="max-w-3xl mx-auto px-6 py-12">
          <h1 className="text-3xl font-semibold text-gray-900">プライバシーポリシー</h1>
          <p className="mt-4 text-gray-600">
            本ポリシーは、HumorType16 における個人情報の取り扱いと利用目的を明確にするためのものです。当サイトをご利用いただくにあたり、以下の内容をご確認ください。
          </p>
          <div className="mt-10 space-y-10">
            {sections.map((section) => (
              <section key={section.id} className="space-y-4">
                <h2 className="text-2xl font-semibold text-gray-900">{section.title}</h2>
                {section.body}
              </section>
            ))}
          </div>
          <p className="mt-12 text-sm text-gray-500">
            制定日：2025年10月27日 ／ 最終更新日：2025年10月27日
          </p>
        </div>
      </main>
    </>
  );
};

export default PrivacyPage;
