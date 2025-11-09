import Head from "next/head";

export default function About() {
  return (
    <>
      <Head>
        <title>About | HumorType16</title>
        <meta
          name="description"
          content="HumorType16は、あなたのユーモアの“骨格”を4つの感性でひもとし、言葉にする自己理解の診断です。どんなユーモアを生み、どんなユーモアに惹かれるのかを読み解きながら、あなたらしいつながり方を見つけていきます。"
        />
      </Head>

      <main className="mx-auto max-w-3xl px-5 py-12">
        <h1 className="text-3xl font-semibold tracking-tight">
          あなたのユーモアを言葉にする診断
        </h1>

        <section className="mt-8 space-y-4">
          <h2 className="text-xl font-semibold">HumorType16とは</h2>
          <p>
            HumorType16は、
            <strong>あなたのユーモアの“骨格”を4つの感性でひもとし、言葉にする自己理解の診断</strong>
            です。
          </p>
          <p>
            SNSのやり取り、恋人とのテンポ、友達とのノリ、職場の空気。
            私たちが「居心地がいい」と感じる瞬間には、いつも
            <strong>ユーモアの相性</strong>
            が潜んでいます。
          </p>
          <p>
            この診断では、
            <strong>どんなユーモアを生み、どんなユーモアに惹かれるのか</strong>
            を読み解きながら、あなたらしい
            <strong>つながり方</strong>
            を見つけていきます。
          </p>
        </section>

        <section className="mt-10 space-y-5">
          <h2 className="text-xl font-semibold">4つの感性要素</h2>

          <div>
            <h3 className="font-semibold">Direction｜ユーモアの向かう矢印</h3>
            <p className="mt-1">
              <strong>E（External）／I（Internal）</strong>
            </p>
            <p className="mt-1">
              外に広げるか、内で深めるか。場を明るく照らすタイプか、静かに味わうタイプかを映します。
            </p>
          </div>

          <div>
            <h3 className="font-semibold">Approach｜おもしろさの組み立て方</h3>
            <p className="mt-1">
              <strong>A（Absurd）／C（Coherent）</strong>
            </p>
            <p className="mt-1">
              ズラして驚かせるか、筋を通して納得させるか。あなたの“おもしろさの作り方”を表します。
            </p>
          </div>

          <div>
            <h3 className="font-semibold">Tone｜空気の温度</h3>
            <p className="mt-1">
              <strong>L（Lyrical）／E（Edgy）</strong>
            </p>
            <p className="mt-1">
              共感で包みこむか、切れ味で光らせるか。やさしさと鋭さ、そのバランスを描き出します。
            </p>
          </div>

          <div>
            <h3 className="font-semibold">Style｜時間のリズム</h3>
            <p className="mt-1">
              <strong>S（Spontaneous）／P（Planned）</strong>
            </p>
            <p className="mt-1">
              その瞬間を掴むか、構成で回収するか。テンポや“間”のセンスを表します。
            </p>
          </div>
        </section>

        <section className="mt-10 space-y-4">
          <h2 className="text-xl font-semibold">何がわかるのか</h2>
          <p>
            「この人とはテンポが合う」「自然にふざけられる」——そんな感覚の
            <strong>背景にあるユーモアの型</strong>
            がわかります。
          </p>
          <p>
            恋人・友達・職場など、それぞれの関係の中で、
            <strong>伝え方や距離感の整え方</strong>
            が自然に見えてきます。これは“笑わせ方”ではなく、
            <strong>自分らしい感性で関わるための自己理解</strong>
            です。
          </p>
        </section>

        <section className="mt-10 space-y-4">
          <h2 className="text-xl font-semibold">どう楽しむ？</h2>
          <p>
            まずは自分のタイプを知り、次に身近な人にも受けてもらいましょう。結果を見せ合うと、
            <strong>ユーモアの“翻訳の違い”</strong>
            が見えてきます。違いを比べながら、
            <strong>合うテンポや心地よい間合い</strong>
            を一緒に見つけていく——その過程こそ、この診断の面白さです。
          </p>
        </section>

        <section className="mt-10 space-y-3">
          <h2 className="text-xl font-semibold">最後に</h2>
          <p>
            自分のユーモアを言葉にできると、その場に合わせた伝え方や、人との距離の取り方がやさしく整います。
            <strong>あなたらしいユーモアの感性</strong>
            を、ここから見つめてください。
          </p>
        </section>
      </main>
    </>
  );
}
