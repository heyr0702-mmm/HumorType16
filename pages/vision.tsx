import Head from "next/head";
import Link from "next/link";
import Layout from "../components/Layout";
import Section from "../components/Section";

export default function VisionPage() {
  return (
    <Layout>
      <Head>
        <title>Vision | HumorType16</title>
        <meta
          name="description"
          content="違いが響き合う世界をつくる。HumorType16は、ユーモアを才能ではなく感性のテンポとして捉え、誰もが自分のリズムを誇れるHumorverseを描きます。"
        />
      </Head>

      <main className="mx-auto max-w-5xl px-4 md:px-6 py-10 md:py-16 space-y-6 md:space-y-10">
        {/* Hero */}
        <header className="text-center space-y-4">
          <p className="text-sm tracking-wide text-neutral-500">Key Message</p>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">違いが響き合う世界をつくる。</h1>
          <p className="text-neutral-700 md:text-lg">
            ユーモアは才能ではなく、感性のテンポ。HumorType16は、誰もが自分のリズムを誇れる<strong>Humorverse</strong>を描きます。
          </p>
        </header>

        <Section eyebrow="WHY" title="ユーモアって、誰のものだろう。">
          <p>
            SNSのタイムラインには、誰かの“おもしろさ”があふれています。でもその中で、「自分は面白くない」「うまく返せない」と感じる瞬間もあります。
          </p>
          <p>
            けれど本当は——<strong>ユーモアは才能ではなく、感性のテンポ</strong>。人それぞれの感じ方と伝え方、リズムが違うだけ。
            その違いこそが、私たちのユーモアの始まりです。
          </p>
        </Section>

        <Section eyebrow="PHILOSOPHY" title="ユーモアとは、感情をやさしく翻訳する方法。">
          <p>
            怒りや緊張をやわらげたり、距離を近づけたり。違和感を笑いに変えて、空気を整える。
            ユーモアは、<strong>感情を安全に共有するための方法</strong>だと私たちは考えています。
          </p>
          <p>
            それは“持っている／いない”ではなく、どう感じ、どう表現するかの違い。
            HumorType16は、その<strong>翻訳スタイル</strong>を4つの感性要素で読み解きます。
          </p>
        </Section>

        <Section eyebrow="WORLDVIEW" title="違いが響き合う世界を描く。">
          <p>
            私たちが目指すのは、「面白い人」だけが笑わせる世界ではなく、それぞれのユーモアが<strong>共鳴</strong>し合う世界です。
          </p>
          <p>
            誰かのユーモアが別の誰かをやさしく包み、静かな人のテンポが場を整えるリズムになる。
            違いを競うのではなく、<strong>響き合い</strong>として受け取る。それが、私たちの描く Humorverse のかたちです。
          </p>
        </Section>

        <Section eyebrow="BEYOND 'SENSE'" title="“センス”という言葉の外側に、自由をつくる。">
          <p>
            「センスがある」「ウケる」「面白い」といった言葉は、ときに優劣の物差しとして使われがちでした。
            でも本当は、<strong>笑いのセンスにも構造とリズム</strong>がある。
            その違いを言葉にできれば、誰もが自分の感性を誇れる。
          </p>
          <p>
            HumorType16は、「笑い」を競うものから、「ユーモア」を<strong>共鳴のデザイン</strong>へと変えるために生まれました。
          </p>
        </Section>

        <Section eyebrow="CALL TO ACTION" title="最後のフレーズ">
          <div className="rounded-xl border border-black/5 p-5 bg-white/60">
            <p>
              あなたのユーモアは、あなたにしか奏でられないリズムです。
              それが誰かを笑顔にし、場をやわらげ、世界を少しだけ優しくする。
            </p>
            <p className="mt-3">
              そのリズムを誇って、世界と響き合おう。<em> in the Humorverse.</em>
            </p>
          </div>
          <div className="mt-6">
            <Link
              href="/test"
              className="inline-flex items-center rounded-xl px-5 py-3 bg-black text-white shadow hover:opacity-90"
              data-analytics-id="cta_begin_from_vision"
            >
              診断をはじめる
            </Link>
          </div>
        </Section>
      </main>
    </Layout>
  );
}
