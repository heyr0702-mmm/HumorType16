import Head from "next/head";

const PrivacyPage = () => {
  return (
    <>
      <Head>
        <title>プライバシーポリシー | HumorType16</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className="privacy">
        <h1>プライバシーポリシー</h1>

        <p>
          当サイト「HumorType16」では、Google が提供する広告配信サービス（Google AdSense）およびアクセス解析サービス（Google Analytics）を利用しています。
        </p>

        <p>
          これらのサービスでは、Cookie を使用して利用者の閲覧情報を収集する場合があります。この情報は匿名で収集されており、個人を特定するものではありません。
        </p>

        <p>
          ユーザーは、ブラウザの設定で Cookie の使用を無効にすることができます。Cookie の詳細や無効化の方法については、以下の Google のポリシーをご参照ください。
        </p>

        <ul>
          <li>
            <a href="https://policies.google.com/technologies/ads?hl=ja" target="_blank" rel="noreferrer">
              Google ポリシーと規約（広告について）
            </a>
          </li>
          <li>
            <a href="https://policies.google.com/privacy?hl=ja" target="_blank" rel="noreferrer">
              Google プライバシーポリシー
            </a>
          </li>
        </ul>

        <p>本ポリシーは予告なく変更される場合があります。改定後は当ページにて最新の内容を掲載いたします。</p>

        <p>
          運営者：HumorType16 運営チーム
          <br />
          制定日：2025年10月27日
        </p>
      </main>

      <style jsx>{`
        .privacy {
          font-family: system-ui, -apple-system, sans-serif;
          max-width: 720px;
          margin: 40px auto;
          line-height: 1.8;
          padding: 0 20px;
        }

        .privacy h1 {
          font-size: 1.6rem;
          border-bottom: 2px solid #ddd;
          padding-bottom: 0.4rem;
        }

        .privacy a {
          color: #3366cc;
        }
      `}</style>
    </>
  );
};

export default PrivacyPage;
