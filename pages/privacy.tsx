import Head from "next/head";

const sections = [
  {
    id: "about",
    title: "当サイトについて",
    body: (
      <p className="leading-7 text-gray-700">
        当サイト「HumorType16」は、ユーモアタイプ診断を気軽にお楽しみいただくための個人運営サイトです。安心してご利用いただけるよう、個人情報やプライバシーの扱いには細心の注意を払っています。
      </p>
    ),
  },
  {
    id: "collection",
    title: "収集する情報",
    body: (
      <div className="space-y-3 leading-7 text-gray-700">
        <p>
          当サイトでは、サービスの向上を目的に、広告配信やアクセス解析を通じて匿名の利用状況データを収集することがあります。
        </p>
        <p>
          収集される情報には、閲覧したページやアクセス日時、使用しているブラウザやデバイスの種類などが含まれます。これらのデータから特定の個人が識別されることはありません。
        </p>
      </div>
    ),
  },
  {
    id: "adsense",
    title: "Google AdSense について",
    body: (
      <div className="space-y-3 leading-7 text-gray-700">
        <p>
          当サイトでは、Google が提供する広告配信サービス「Google AdSense」を利用しています。Google およびそのパートナーは Cookie を使用し、利用者の興味・関心に合わせた広告を表示する場合があります。
        </p>
        <p>
          Cookie の利用を制御したい場合は、
          <a
            href="https://adssettings.google.com/"
            className="text-blue-600 underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Google の広告設定ページ
          </a>
          から無効化できます。詳細は
          <a
            href="https://policies.google.com/technologies/ads"
            className="text-blue-600 underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Google 広告ポリシー
          </a>
          をご確認ください。
        </p>
        <p>当サイトの広告パブリッシャー ID は「ca-pub-8802783650388237」です。</p>
      </div>
    ),
  },
  {
    id: "analytics",
    title: "Google Analytics について",
    body: (
      <div className="space-y-3 leading-7 text-gray-700">
        <p>
          当サイトでは、アクセス解析のために Google アナリティクス（GA4）を利用しています。これにより、Cookie を通じて匿名の利用状況データを収集します。
        </p>
        <p>
          収集された情報は個人を特定するものではなく、サイトの改善に役立てる目的でのみ使用します。GA4 の測定 ID は「G-EV89MLXEXB」です。
        </p>
      </div>
    ),
  },
  {
    id: "cookie",
    title: "Cookie について",
    body: (
      <div className="space-y-3 leading-7 text-gray-700">
        <p>
          Cookie は、サイトを訪問した際にブラウザへ保存される小さなデータファイルです。より快適にご利用いただくために活用しています。
        </p>
        <p>
          ブラウザの設定から Cookie の受け入れや削除を管理できますが、無効化すると一部機能が正しく動作しない場合があります。ご利用環境に合わせて設定をご確認ください。
        </p>
      </div>
    ),
  },
  {
    id: "contact",
    title: "お問い合わせ先",
    body: (
      <div className="space-y-3 leading-7 text-gray-700">
        <p>
          プライバシーに関するご相談やご不明点がありましたら、
          <a
            href="mailto:humortype16.info@gmail.com"
            className="text-blue-600 underline"
          >
            humortype16.info@gmail.com
          </a>
          までお気軽にご連絡ください。
        </p>
        <p>内容を確認のうえ、順次ご返信いたします。回答までに数日いただく場合がある点のみ、あらかじめご了承ください。</p>
      </div>
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
