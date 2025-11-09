import Head from "next/head";

export default function VisionPage() {
  return (
    <>
      <Head>
        <title>Vision | HumorType16</title>
        <meta
          name="description"
          content="HumorType16のビジョン。ユーモアは才能ではなく感性のテンポ。違いが響き合う世界＝Humorverseを目指します。"
        />
      </Head>
      <section className="relative z-10 mx-auto w-full max-w-5xl px-6 py-16 sm:px-8 md:py-20">
        <header className="space-y-6">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#777777]">Vision</p>
          <h1 className="text-4xl font-extrabold leading-tight tracking-[-0.02em] text-[#2B2B2B] md:text-5xl">
            違いが響き合う世界をつくる。
          </h1>
          <p className="max-w-3xl text-lg leading-relaxed text-[#5A5A5A]">
            ユーモアは才能ではなく、感性のテンポ。HumorType16は、誰もが自分のリズムを誇れるHumorverseを描きます。
          </p>
        </header>

        <div className="mt-16 space-y-16 text-base leading-relaxed text-[#5A5A5A]">
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-[#2B2B2B]">ユーモアって、誰のものだろう。</h2>
            <p>
              SNSのタイムラインには、誰かの“おもしろさ”があふれています。でもその中で、「自分は面白くない」「うまく返せない」と感じる瞬間もあります。
            </p>
            <p>
              けれど本当は——<strong>ユーモアは才能ではなく、感性のテンポ</strong>。人それぞれの感じ方と伝え方、リズムが違うだけ。その違いこそが、私たちのユーモアの始まりです。
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-[#2B2B2B]">ユーモアとは、感情をやさしく翻訳する方法。</h2>
            <p>
              怒りや緊張をやわらげたり、距離を近づけたり。違和感を笑いに変えて、空気を整える。ユーモアは、
              <strong>感情を安全に共有するための方法</strong>だと私たちは考えています。
            </p>
            <p>
              それは“持っている／いない”ではなく、<strong>どう感じ、どう表現するか</strong>の違い。HumorType16は、その翻訳スタイルを4つの感性要素で読み解きます。
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-[#2B2B2B]">違いが響き合う世界を描く。</h2>
            <p>
              私たちが目指すのは、「面白い人」だけが笑わせる世界ではなく、<strong>それぞれのユーモアが共鳴し合う世界</strong>です。
            </p>
            <p>
              誰かのユーモアが別の誰かをやさしく包み、静かな人のテンポが場を整えるリズムになる。違いを競うのではなく、
              <strong>響き合いとして受け取る</strong>。それが、私たちの描く <strong>Humorverse</strong> のかたちです。
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-[#2B2B2B]">“センス”という言葉の外側に、自由をつくる。</h2>
            <p>
              「センスがある」「ウケる」「面白い」といった言葉は、ときに優劣の物差しとして使われがちでした。でも本当は、笑いのセンスにも
              <strong>構造とリズム</strong>がある。その違いを言葉にできれば、誰もが自分の感性を誇れる。
            </p>
            <p>
              HumorType16は、「笑い」を競うものから、「ユーモア」を<strong>共鳴のデザイン</strong>へと変えるために生まれました。
            </p>
          </section>

          <section className="rounded-2xl border border-[#6E56CF]/15 bg-[#6E56CF]/5 p-8 text-[#2B2B2B] shadow-sm">
            <blockquote className="space-y-4 text-base leading-relaxed">
              <p>
                あなたのユーモアは、あなたにしか奏でられないリズムです。それが誰かを笑顔にし、場をやわらげ、世界を少しだけ優しくする。
              </p>
              <p>
                <strong>そのリズムを誇って、世界と響き合おう。</strong>
                <br />
                <span className="text-[#777777]">in the Humorverse.</span>
              </p>
            </blockquote>
          </section>
        </div>
      </section>
    </>
  );
}
