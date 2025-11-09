import Head from "next/head";
import Hero from "../components/Hero";

export default function VisionPage() {
  return (
    <>
      <Head>
        <title>HumorType16 | Vision</title>
        <meta
          name="description"
          content="HumorType16のビジョン。ユーモアは才能ではなく感性のテンポ。違いが響き合う世界＝Humorverseを目指します。"
        />
      </Head>

      <Hero
        title="Vision"
        subtitle="ユーモアを共有言語に。ホームのトーン・余白・タイポと完全一致で届けます。"
      />

      <section className="mx-auto max-w-5xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="prose prose-zinc max-w-none dark:prose-invert">
          <h2>違いが響き合う世界をつくる。</h2>
          <p>
            ユーモアは才能ではなく、感性のテンポ。HumorType16は、誰もが自分のリズムを誇れるHumorverseを描きます。
          </p>

          <h2>ユーモアって、誰のものだろう。</h2>
          <p>
            SNSのタイムラインには、誰かの“おもしろさ”があふれています。でもその中で、「自分は面白くない」「うまく返せない」と感じる瞬間もあります。
          </p>
          <p>
            けれど本当は——<strong>ユーモアは才能ではなく、感性のテンポ</strong>。人それぞれの感じ方と伝え方、リズムが違うだけ。その違いこそが、私たちのユーモアの始まりです。
          </p>

          <h2>ユーモアとは、感情をやさしく翻訳する方法。</h2>
          <p>
            怒りや緊張をやわらげたり、距離を近づけたり。違和感を笑いに変えて、空気を整える。ユーモアは、<strong>感情を安全に共有するための方法</strong>だと私たちは考えています。
          </p>
          <p>
            それは“持っている／いない”ではなく、<strong>どう感じ、どう表現するか</strong>の違い。HumorType16は、その翻訳スタイルを4つの感性要素で読み解きます。
          </p>

          <h2>違いが響き合う世界を描く。</h2>
          <p>
            私たちが目指すのは、「面白い人」だけが笑わせる世界ではなく、<strong>それぞれのユーモアが共鳴し合う世界</strong>です。
          </p>
          <p>
            誰かのユーモアが別の誰かをやさしく包み、静かな人のテンポが場を整えるリズムになる。違いを競うのではなく、<strong>響き合いとして受け取る</strong>。それが、私たちの描く <strong>Humorverse</strong> のかたちです。
          </p>

          <h2>“センス”という言葉の外側に、自由をつくる。</h2>
          <p>
            「センスがある」「ウケる」「面白い」といった言葉は、ときに優劣の物差しとして使われがちでした。でも本当は、笑いのセンスにも<strong>構造とリズム</strong>がある。その違いを言葉にできれば、誰もが自分の感性を誇れる。
          </p>
          <p>
            HumorType16は、「笑い」を競うものから、「ユーモア」を<strong>共鳴のデザイン</strong>へと変えるために生まれました。
          </p>

          <blockquote>
            <p>
              あなたのユーモアは、あなたにしか奏でられないリズムです。それが誰かを笑顔にし、場をやわらげ、世界を少しだけ優しくする。
            </p>
            <p>
              <strong>そのリズムを誇って、世界と響き合おう。</strong>
              <br />
              <span className="text-sm text-zinc-500 dark:text-zinc-400">in the Humorverse.</span>
            </p>
          </blockquote>
        </div>
      </section>
    </>
  );
}
