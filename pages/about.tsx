import Head from "next/head";

const ELEMENTS = [
  {
    id: "direction",
    title: "Direction",
    heading: "笑いの出力方向",
    body:
      "E（External）は場へ広げ、I（Internal）は内へ熟し一点で届ける。あなたが笑いを放つ矢印を描きます。",
  },
  {
    id: "approach",
    title: "Approach",
    heading: "笑いの組み立て方",
    body:
      "A（Absurd）は飛躍で驚かせ、C（Coherent）は整合で納得させる。どんなロジックで笑いを紡ぐかを可視化します。",
  },
  {
    id: "tone",
    title: "Tone",
    heading: "笑いの温度",
    body:
      "L（Lyrical）は共感で包み、E（Edgy）は切れ味で刺す。声色とニュアンスの揺らぎを言語化します。",
  },
  {
    id: "style",
    title: "Style",
    heading: "笑いの時間軸",
    body:
      "S（Spontaneous）は瞬間を拾い、P（Planned）は構成で回収する。テンポ感と伏線の扱い方を読み解きます。",
  },
];

export default function AboutPage() {
  return (
    <>
      <Head>
        <title>About | HumorType16</title>
        <meta
          name="description"
          content="HumorType16は、あなたの『笑いの骨格』を4つの感性要素で読み解き、16タイプに分類するユーモア診断です。"
        />
      </Head>
      <section className="relative z-10 mx-auto w-full max-w-5xl px-6 py-16 sm:px-8 md:py-20">
        <header className="space-y-6">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#777777]">About</p>
          <h1 className="text-4xl font-extrabold leading-tight tracking-[-0.02em] text-[#2B2B2B] md:text-5xl">
            ユーモアを、感性の設計図で読み解く。
          </h1>
          <p className="max-w-3xl text-lg leading-relaxed text-[#5A5A5A]">
            <strong>HumorType16</strong> は、あなたの「笑いの骨格」を4つの感性要素で読み解き、
            <strong>「どんなユーモアを生み、どんなユーモアに惹かれるのか」</strong>
            を可視化する診断です。思考のクセ、感情の流れ、タイミングの習性——ユーモアのリズムを丁寧に言語化します。
          </p>
        </header>

        <section className="mt-16 space-y-10">
          <h2 className="text-2xl font-semibold text-[#2B2B2B]">4つの感性要素</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {ELEMENTS.map((element) => (
              <article
                key={element.id}
                className="rounded-2xl border border-white/60 bg-white/70 p-6 shadow-sm backdrop-blur-sm transition duration-600 ease-in-out"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#777777]">{element.title}</p>
                <h3 className="mt-3 text-lg font-semibold text-[#2B2B2B]">{element.heading}</h3>
                <p className="mt-4 text-sm leading-relaxed text-[#5A5A5A]">{element.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-16 space-y-4">
          <h2 className="text-2xl font-semibold text-[#2B2B2B]">何がわかるのか</h2>
          <p className="text-base leading-relaxed text-[#5A5A5A]">
            診断では、自分のユーモアの特徴だけでなく、仲間・恋人・職場など日常のコミュニケーションを整えるヒントが得られます。
            なぜあの人のボケが刺さらないのか、どうしてこの人とはずっと笑っていられるのか——ユーモアの構造として言語化できます。
          </p>
          <p className="text-base leading-relaxed text-[#5A5A5A]">
            自分の笑いのリズムを理解することで、場に合わせた伝え方を選べるようになり、相手とのテンポのズレも自然に整っていく。
            HumorType16は、ユーモアを<strong>“関係をラクにする知性”</strong>として再発見するための診断です。
          </p>
        </section>
      </section>
    </>
  );
}
