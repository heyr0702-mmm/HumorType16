// pages/vision.tsx
import Head from "next/head";

export default function VisionPage() {
  return (
    <>
      <Head>
        <title>Vision | HumorType16</title>
        <meta
          name="description"
          content="HumorType16のビジョン。ユーモアは才能ではなく、感性のテンポ。違いが響き合う世界＝Humorverseを目指します。"
        />
      </Head>

      <main className="mx-auto max-w-3xl px-6 py-16">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900">
          Vision｜HumorType16
        </h1>

        {/* ① 問いの提示 */}
        <section className="mt-8 space-y-4 text-gray-700 leading-relaxed">
          <h2 className="text-2xl font-semibold text-gray-900">ユーモアって、誰のものだろう。</h2>
          <p>
            SNSのタイムラインには、誰かの“おもしろさ”があふれています。
            でもその中で、「自分は面白くない」「うまく返せない」と感じる瞬間もあります。
          </p>
          <p>
            けれど本当は——<strong>ユーモアは才能ではなく、感性のテンポ</strong>。
            人それぞれの感じ方と伝え方、リズムが違うだけなんです。
            その違いこそが、私たちのユーモアの始まりです。
          </p>
        </section>

        {/* ② 私たちの定義 */}
        <section className="mt-12 space-y-4 text-gray-700 leading-relaxed">
          <h2 className="text-2xl font-semibold text-gray-900">ユーモアとは、感情をやさしく翻訳する方法。</h2>
          <p>
            怒りや緊張をやわらげたり、距離を近づけたり。
            違和感を笑いに変えて、空気を整える。ユーモアは、
            <strong>感情を安全に共有するための方法</strong>だと私たちは考えています。
          </p>
          <p>
            それは“持っている／いない”ではなく、<strong>どう感じ、どう表現するか</strong>の違い。
            HumorType16は、その翻訳スタイルを4つの感性要素で読み解きます。
          </p>
        </section>

        {/* ③ ビジョン */}
        <section className="mt-12 space-y-4 text-gray-700 leading-relaxed">
          <h2 className="text-2xl font-semibold text-gray-900">違いが響き合う世界をつくる。</h2>
          <p>
            私たちが目指すのは、「面白い人」だけが笑わせる世界ではなく、
            <strong>それぞれのユーモアが共鳴し合う世界</strong>です。
          </p>
          <p>
            誰かのユーモアが、別の誰かをやさしく包む。静かな人のテンポが、場を落ち着かせるリズムになる。
            違いを競うのではなく、<strong>響き合いとして受け取る</strong>。それが、私たちの描く
            <strong> Humorverse（ユーモアバース）</strong> のかたちです。
          </p>
        </section>

        {/* ④ 背景（つくった理由） */}
        <section className="mt-12 space-y-4 text-gray-700 leading-relaxed">
          <h2 className="text-2xl font-semibold text-gray-900">“センス”という言葉の外側に、自由をつくりたかった。</h2>
          <p>
            「センスがある」「ウケる」「面白い」といった言葉は、ときに優劣の物差しとして使われがちでした。
            でも本当は、笑いのセンスにも<strong>構造とリズム</strong>がある。
            その違いを言葉にできれば、誰もが自分の感性を誇れる。
          </p>
          <p>
            HumorType16は、「笑い」を競うものから、「ユーモア」を<strong>共鳴のデザイン</strong>へと変えるために生まれました。
          </p>
        </section>

        {/* ⑤ メッセージ */}
        <section className="mt-12 text-gray-700 leading-relaxed">
          <blockquote className="border-l-4 border-violet-300 pl-4 italic text-gray-800">
            あなたのユーモアは、あなたにしか奏でられないリズムです。
            <br />
            それが誰かを笑顔にし、場をやわらげ、世界を少しだけ優しくする。
            <br />
            <br />
            <strong>そのリズムを誇って、世界と響き合おう。</strong>
            <br />
            <span className="opacity-70">in the Humorverse.</span>
          </blockquote>
        </section>
      </main>
    </>
  );
}
