import Head from "next/head";
import Hero from "../components/Hero";

const sections = [
  {
    id: "scope",
    title: "適用",
    body: (
      <p>
        本利用規約（以下、「本規約」といいます。）は、HumorType16運営チーム（以下「当チーム」といいます。）が提供・運営する HumorType16（以下、「当サイト」といいます。）のサービスを利用するすべての方に適用されます。利用者は本規約に同意のうえ、当サイトを利用するものとします。
      </p>
    ),
  },
  {
    id: "responsibility",
    title: "利用者の責任",
    body: (
      <p>
        利用者は、自己の判断と責任にもとづき当サイトを利用し、提供される情報やコンテンツを適切に活用してください。当サイトの利用により発生したいかなるトラブルについても、利用者自身の責任で対処するものとします。
      </p>
    ),
  },
  {
    id: "prohibited",
    title: "禁止事項",
    body: (
      <ul className="list-disc space-y-2 pl-6">
        <li>法令または公序良俗に違反する行為</li>
        <li>当サイトの運営を妨害する行為</li>
        <li>他の利用者、第三者、または当サイトに不利益や損害を与える行為</li>
        <li>不正アクセス、データの改ざん、情報の不正取得などの行為</li>
        <li>当サイトが不適切と判断するその他の行為</li>
      </ul>
    ),
  },
  {
    id: "ads",
    title: "広告の掲載について",
    body: (
      <div className="space-y-3">
        <p>当サイトでは、Google が提供する広告配信サービス「Google AdSense」を利用しています。</p>
        <p>
          広告配信事業者は Cookie を使用して、利用者の興味・関心に応じた広告を表示する場合があります。Cookie の利用はブラウザの設定や
          <a
            href="https://adssettings.google.com/"
            className="font-medium text-[#6E56CF] underline-offset-4 transition duration-300 ease-in-out hover:opacity-80"
            target="_blank"
            rel="noopener noreferrer"
          >
            Google の広告設定ページ
          </a>
          で管理・無効化できます。詳細は
          <a
            href="https://policies.google.com/technologies/ads"
            className="font-medium text-[#6E56CF] underline-offset-4 transition duration-300 ease-in-out hover:opacity-80"
            target="_blank"
            rel="noopener noreferrer"
          >
            Google の広告ポリシー
          </a>
          をご確認ください。
        </p>
      </div>
    ),
  },
  {
    id: "disclaimer",
    title: "免責事項",
    body: (
      <p>
        当サイトに掲載されている情報の正確性や有用性については十分に注意を払っていますが、その内容を完全に保証するものではありません。利用者が当サイトを利用したことで生じたいかなる損害についても、当サイトは一切の責任を負いません。
      </p>
    ),
  },
  {
    id: "changes",
    title: "規約の変更",
    body: (
      <p>
        当サイトは、必要に応じて本規約の内容を変更することがあります。変更後の本規約は、当サイト上に掲載された時点から効力を生じるものとし、利用者が変更後も当サイトを利用した場合、変更内容に同意したものとみなします。
      </p>
    ),
  },
];

export default function TermsPage() {
  return (
    <>
      <Head>
        <title>HumorType16 | Terms</title>
        <meta name="description" content="HumorType16 の利用規約" />
      </Head>

      <Hero title="Terms of Service" subtitle="ホームのUIに完全準拠。" />

      <section className="mx-auto max-w-5xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="prose prose-zinc max-w-none dark:prose-invert">
          <p>
            本規約は、HumorType16運営チームが提供する当サイトを利用されるすべての方に適用される利用条件を定めるものです。以下の内容をご確認いただき、サービスをご利用ください。
          </p>
          {sections.map((section) => (
            <section key={section.id} className="mt-10">
              <h2>{section.title}</h2>
              {section.body}
            </section>
          ))}
          <p className="mt-12 text-sm text-zinc-500 dark:text-zinc-400">制定日：2025年10月27日</p>
        </div>
      </section>
    </>
  );
}
