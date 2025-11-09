import Head from "next/head";
import Hero from "../components/Hero";

export default function AboutPage() {
  return (
    <>
      <Head>
        <title>HumorType16 | About</title>
        <meta
          name="description"
          content="HumorType16は、あなたのユーモアの“骨格”を4つの感性でひもとし、言葉にする自己理解の診断です。"
        />
      </Head>

      <Hero
        title="HumorType16 とは"
        subtitle="ユーモアの“軸”と“重力”から16タイプに可視化。ホームの世界観をそのままに。"
      />

      <section className="mx-auto max-w-5xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="prose prose-zinc max-w-none dark:prose-invert">
          <h2>HumorType16とは</h2>
          <p>
            HumorType16は、<strong>あなたのユーモアの“骨格”を4つの感性でひもとし、言葉にする自己理解の診断</strong>です。
          </p>
          <p>
            SNSのやり取り、恋人とのテンポ、友達とのノリ、職場の空気。私たちが「居心地がいい」と感じる瞬間には、いつも
            <strong>ユーモアの相性</strong>が潜んでいます。
          </p>
          <p>
            この診断では、<strong>どんなユーモアを生み、どんなユーモアに惹かれるのか</strong>を読み解きながら、あなたらしい
            <strong>つながり方</strong>を見つけていきます。
          </p>

          <h2>4つの感性要素</h2>
          <h3>Direction｜ユーモアの向かう矢印</h3>
          <p>
            <strong>E（External）／I（Internal）</strong>
          </p>
          <p>外に広げるか、内で深めるか。場を明るく照らすタイプか、静かに味わうタイプかを映します。</p>
          <h3>Approach｜おもしろさの組み立て方</h3>
          <p>
            <strong>A（Absurd）／C（Coherent）</strong>
          </p>
          <p>ズラして驚かせるか、筋を通して納得させるか。あなたの“おもしろさの作り方”を表します。</p>
          <h3>Tone｜空気の温度</h3>
          <p>
            <strong>L（Lyrical）／E（Edgy）</strong>
          </p>
          <p>共感で包みこむか、切れ味で光らせるか。やさしさと鋭さ、そのバランスを描き出します。</p>
          <h3>Style｜時間のリズム</h3>
          <p>
            <strong>S（Spontaneous）／P（Planned）</strong>
          </p>
          <p>その瞬間を掴むか、構成で回収するか。テンポや“間”のセンスを表します。</p>

          <h2>何がわかるのか</h2>
          <p>
            「この人とはテンポが合う」「自然にふざけられる」——そんな感覚の<strong>背景にあるユーモアの型</strong>がわかります。
          </p>
          <p>
            恋人・友達・職場など、それぞれの関係の中で、<strong>伝え方や距離感の整え方</strong>が自然に見えてきます。これは“笑わせ方”ではなく、
            <strong>自分らしい感性で関わるための自己理解</strong>です。
          </p>

          <h2>どう楽しむ？</h2>
          <p>
            まずは自分のタイプを知り、次に身近な人にも受けてもらいましょう。結果を見せ合うと、
            <strong>ユーモの“翻訳の違い”</strong>が見えてきます。違いを比べながら、
            <strong>合うテンポや心地よい間合い</strong>を一緒に見つけていく——その過程こそ、この診断の面白さです。
          </p>

          <h2>最後に</h2>
          <p>
            自分のユーモアを言葉にできると、その場に合わせた伝え方や、人との距離の取り方がやさしく整います。
            <strong>あなたらしいユーモアの感性</strong>を、ここから見つめてください。
          </p>
        </div>
      </section>
    </>
  );
}
