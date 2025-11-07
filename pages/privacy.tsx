import Head from "next/head";

// ※このページでは AdSense を読み込まない（審査・ポリシー対策）
const sections = [
  {
    id: "about",
    title: "当サイトについて",
    body: (
      <div className="space-y-3 leading-7 text-gray-700">
        <p>
          本サイト「HumorType16」は、<strong>HumorType16運営チーム</strong>が管理・運営しています。ユーモアタイプ診断コンテンツをオンラインで提供することを目的としており、安心してご利用いただけるようプライバシー保護に努めています。
        </p>
        <p>
          コンテンツの品質向上や運営コストのカバーのために、一部で第三者の広告サービスを利用しています。
        </p>
      </div>
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
        <p>当サイトでは、Google が提供する広告配信サービス「Google AdSense」を利用しています。</p>
        <p>
          広告配信事業者は Cookie を使用して、利用者の興味・関心に応じた広告を表示する場合があります。Cookie の利用はブラウザの設定や
          <a
            href="https://adssettings.google.com/"
            className="text-blue-600 underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Google の広告設定ページ
          </a>
          で管理・無効化できます。詳細は
          <a
            href="https://policies.google.com/technologies/ads"
            className="text-blue-600 underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Google の広告ポリシー
          </a>
          をご確認ください。
        </p>
        <p>※ 当サイトで利用している広告パブリッシャーIDは「<strong>ca-pub-8802783650388237</strong>」です。</p>
      </div>
    ),
  },
  {
    id: "analytics",
    title: "Google Analytics について",
    body: (
      <div className="space-y-3 leading-7 text-gray-700">
        <p>当サイトでは、サービス改善のために Google アナリティクス（GA4）を使用してアクセスデータを取得しています。</p>
        <p>
          取得されるデータには個人を特定できる情報は含まれず、統計的な分析のために利用します。※ 使用している測定IDは「<strong>G-EV89MLXEXB</strong>」です。
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
        <p>本サイトに関するご連絡は、以下の窓口までお願いいたします。</p>
        <p>
          <code className="rounded bg-gray-100 px-1 py-0.5 font-mono text-gray-800">contact@humor-type16.example.com</code>
        </p>
        <p>
          ※ 小規模運営のため、ご質問の内容によってはお返事までお時間をいただく場合や、すべてにご回答できない場合があります。
        </p>
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
      <section className="space-y-10 py-4">
        <div className="space-y-4">
          <h1 className="text-3xl font-semibold text-gray-900">プライバシーポリシー</h1>
          <p className="text-gray-600">
            本ポリシーは、HumorType16運営チームが運営する HumorType16 における個人情報の取り扱いと利用目的を明確にするためのものです。当サイトをご利用いただくにあたり、以下の内容をご確認ください。
          </p>
        </div>
        <div className="space-y-10">
          {sections.map((section) => (
            <section key={section.id} className="space-y-4">
              <h2 className="text-2xl font-semibold text-gray-900">{section.title}</h2>
              {section.body}
            </section>
          ))}
        </div>
        <p className="text-sm text-gray-500">制定日：2025年10月27日 ／ 最終更新日：2025年10月27日</p>
      </section>
    </>
  );
};

export default PrivacyPage;
