import Head from "next/head";

import AdSlot from "../components/AdSlot";

const AboutPage = () => {
  return (
    <>
      <Head>
        <title>About HumorType16</title>
      </Head>
      <main>
        <h1>About HumorType16</h1>
        <p>
          HumorType16 は、笑いのセンスやユーモアのタイプを診断するWebサービスです。MBTIのような16分類の笑いタイプを通じて、自分や友人の
          ユーモア傾向を知ることができます。
        </p>
        <p>本サイトは個人開発プロジェクトとして運営しています。</p>
      </main>
      <div className="px-6 pb-12">
        <AdSlot adSlot="ABOUT_FOOTER" className="mx-auto w-full max-w-3xl" />
      </div>
    </>
  );
};

export default AboutPage;
