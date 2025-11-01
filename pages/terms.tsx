import Head from "next/head";

const sections = [
  {
    id: "scope",
    title: "適用",
    body: (
      <p className="leading-7 text-gray-700">
        本利用規約（以下、「本規約」といいます。）は、HumorType16（以下、「当サイト」といいます。）の提供するサービスを利用するすべての方に適用されます。利用者は本規約に同意のうえ、当サイトを利用するものとします。
      </p>
    ),
  },
  {
    id: "responsibility",
    title: "利用者の責任",
    body: (
      <p className="leading-7 text-gray-700">
        利用者は、自己の判断と責任にもとづき当サイトを利用し、提供される情報やコンテンツを適切に活用してください。当サイトの利用により発生したいかなるトラブルについても、利用者自身の責任で対処するものとします。
      </p>
    ),
  },
  {
    id: "prohibited",
    title: "禁止事項",
    body: (
      <ul className="list-disc space-y-2 pl-6 text-gray-700">
        <li className="leading-7">法令または公序良俗に違反する行為</li>
        <li className="leading-7">当サイトの運営を妨害する行為</li>
        <li className="leading-7">他の利用者、第三者、または当サイトに不利益や損害を与える行為</li>
        <li className="leading-7">不正アクセス、データの改ざん、情報の不正取得などの行為</li>
        <li className="leading-7">当サイトが不適切と判断するその他の行為</li>
      </ul>
    ),
  },
  {
    id: "ads",
    title: "広告の掲載について",
    body: (
      <div className="space-y-4 text-gray-700">
        <p className="leading-7">
          当サイトでは、Google が提供する広告配信サービス「Google AdSense」を利用しています。広告配信事業者は Cookie を使用し、利用者の興味に応じた広告を表示する場合があります。
        </p>
        <p className="leading-7">
          Cookie により収集される情報には個人を特定できる内容は含まれませんが、利用者はブラウザの設定から Cookie の使用を無効化することができます。詳細は Google の広告ポリシーおよびプライバシーポリシーをご確認ください。
        </p>
      </div>
    ),
  },
  {
    id: "disclaimer",
    title: "免責事項",
    body: (
      <p className="leading-7 text-gray-700">
        当サイトに掲載されている情報の正確性や有用性については十分に注意を払っていますが、その内容を完全に保証するものではありません。利用者が当サイトを利用したことで生じたいかなる損害についても、当サイトは一切の責任を負いません。
      </p>
    ),
  },
  {
    id: "changes",
    title: "規約の変更",
    body: (
      <p className="leading-7 text-gray-700">
        当サイトは、必要に応じて本規約の内容を変更することがあります。変更後の本規約は、当サイト上に掲載された時点から効力を生じるものとし、利用者が変更後も当サイトを利用した場合、変更内容に同意したものとみなします。
      </p>
    ),
  },
];

const TermsPage = () => {
  return (
    <>
      <Head>
        <title>利用規約 | HumorType16</title>
        <meta name="description" content="HumorType16 の利用規約" />
      </Head>
      <main className="min-h-screen bg-white py-16">
        <div className="max-w-3xl mx-auto px-6 py-12">
          <h1 className="text-3xl font-semibold text-gray-900">利用規約</h1>
          <p className="mt-4 text-gray-600">
            本規約は、HumorType16 を利用されるすべての方に適用される利用条件を定めるものです。以下の内容をご確認いただき、サービスをご利用ください。
          </p>
          <div className="mt-10 space-y-10">
            {sections.map((section) => (
              <section key={section.id} className="space-y-4">
                <h2 className="text-2xl font-semibold text-gray-900">{section.title}</h2>
                {section.body}
              </section>
            ))}
          </div>
          <p className="mt-12 text-sm text-gray-500">制定日：2025年10月27日</p>
        </div>
      </main>
    </>
  );
};

export default TermsPage;
