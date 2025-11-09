// pages/about.tsx
import Head from "next/head";

export default function AboutPage() {
  return (
    <>
      <Head>
        <title>About | HumorType16</title>
        <meta
          name="description"
          content="HumorType16は、あなたの『笑いの骨格』を Direction / Approach / Tone / Style の4要素で読み解き、16タイプに分類するユーモア診断です。"
        />
      </Head>

      <main className="mx-auto max-w-3xl px-6 py-16">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900">
          About｜HumorType16
        </h1>

        <section className="mt-6 space-y-4 text-gray-700 leading-relaxed">
          <p>
            <strong>HumorType16</strong> は、あなたの「笑いの骨格」を
            4つの感性要素（<strong>Direction / Approach / Tone / Style</strong>）で読み解き、16タイプに分類するユーモア診断です。
          </p>
          <p>
            人が笑う瞬間には、性格よりも深い——
            <strong>思考のクセ、感情の流れ、タイミングの習性</strong>
            が潜んでいます。HumorType16 は、その見えない設計図を言語化し、
            <strong>「どんなユーモアを生み、どんなユーモアに惹かれるのか」</strong>を可視化します。
          </p>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-semibold text-gray-900">4つの要素と2極</h2>

          <div className="mt-6 space-y-10">
            <div>
              <h3 className="text-xl font-semibold text-gray-900">1. Direction｜E / I</h3>
              <p className="mt-2 text-gray-700">
                <strong>笑いの出力方向。</strong>
                <br />
                <strong>E（External）</strong>：場へ広げ、空気を変える。
                <br />
                <strong>I（Internal）</strong>：内で熟し、核心を一点で突く。
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900">2. Approach｜A / C</h3>
              <p className="mt-2 text-gray-700">
                <strong>笑いの組み立て方。</strong>
                <br />
                <strong>A（Absurd）</strong>：飛躍や不条理で驚かせる。
                <br />
                <strong>C（Coherent）</strong>：筋道と整合で納得させる。
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900">3. Tone｜L / E</h3>
              <p className="mt-2 text-gray-700">
                <strong>笑いの温度。</strong>
                <br />
                <strong>L（Lyrical）</strong>：あたたかさと共感で笑いを包む。
                <br />
                <strong>E（Edgy）</strong>：切れ味と知性で笑いを刺す。
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900">4. Style｜S / P</h3>
              <p className="mt-2 text-gray-700">
                <strong>笑いの時間軸。</strong>
                <br />
                <strong>S（Spontaneous）</strong>：即興で拾う。
                <br />
                <strong>P（Planned）</strong>：伏線を張り、構成で回収する。
              </p>
            </div>
          </div>
        </section>

        <section className="mt-12 space-y-4 text-gray-700 leading-relaxed">
          <h2 className="text-2xl font-semibold text-gray-900">何がわかるのか</h2>
          <p>
            この診断では、あなたのユーモアの特徴を知るだけでなく、
            <strong>仲間・恋人・職場</strong>といった日常の中で、
            「なぜあの人のボケが刺さらないのか」「なぜこの人とはずっと笑っていられるのか」——
            その理由を、ユーモアの構造として言語化します。
          </p>
          <p>
            自分の笑いのリズムを理解することで、場に合わせた伝え方を選べるようになり、
            相手とのテンポのズレも自然に整っていく。HumorType16は、
            <strong>ユーモアを“関係をラクにする知性”として再発見</strong>するための診断です。
          </p>
        </section>
      </main>
    </>
  );
}
