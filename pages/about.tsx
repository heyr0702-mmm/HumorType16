import Head from "next/head";
import Link from "next/link";
import Layout from "../components/Layout";
import Section from "../components/Section";

export default function AboutPage() {
  return (
    <Layout>
      <Head>
        <title>About | HumorType16</title>
        <meta
          name="description"
          content="HumorType16は、ユーモアの“骨格”を4つの感性でひもとし、言葉にする自己理解の診断。つながり方や心地よい間合いが見えてきます。"
        />
      </Head>

      <main className="mx-auto max-w-5xl px-4 md:px-6 py-10 md:py-16 space-y-6 md:space-y-10">
        <header className="text-center space-y-3">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">About</h1>
          <p className="text-neutral-600">あなたのユーモアを言葉にする診断 — HumorType16とは</p>
        </header>

        <Section
          eyebrow="INTRO"
          title="HumorType16は、あなたのユーモアの“骨格”を4つの感性でひもとし、言葉にする自己理解の診断です。"
          kicker="SNSのやり取り、恋人とのテンポ、友達とのノリ、職場の空気。居心地のよさの裏には、いつもユーモアの相性が潜んでいます。"
        >
          <p>
            この診断では、どんなユーモアを生み、どんなユーモアに惹かれるのかを読み解きながら、
            あなたらしい<strong>つながり方</strong>を見つけていきます。
          </p>
        </Section>

        <Section id="axes" eyebrow="FRAMEWORK" title="4つの感性要素">
          <div className="grid md:grid-cols-2 gap-4 md:gap-6">
            {[
              {
                h: "Direction｜ユーモアの向かう矢印",
                b: (
                  <>
                    <strong>E（External）／I（Internal）</strong> — 外に広げるか、内で深めるか。
                    場を明るく照らすタイプか、静かに味わうタイプかを映します。
                  </>
                ),
              },
              {
                h: "Approach｜おもしろさの組み立て方",
                b: (
                  <>
                    <strong>A（Absurd）／C（Coherent）</strong> — ズラして驚かせるか、筋を通して納得させるか。
                    あなたの“おもしろさの作り方”を表します。
                  </>
                ),
              },
              {
                h: "Tone｜空気の温度",
                b: (
                  <>
                    <strong>L（Lyrical）／E（Edgy）</strong> — 共感で包みこむか、切れ味で光らせるか。
                    やさしさと鋭さ、そのバランスを描き出します。
                  </>
                ),
              },
              {
                h: "Style｜時間のリズム",
                b: (
                  <>
                    <strong>S（Spontaneous）／P（Planned）</strong> — その瞬間を掴むか、構成で回収するか。
                    ユーモアのテンポや“間”のセンスを表します。
                  </>
                ),
              },
            ].map((card, i) => (
              <div key={i} className="rounded-xl border border-black/5 p-5 bg-white/60">
                <h3 className="text-lg font-semibold">{card.h}</h3>
                <p className="mt-2 text-sm text-neutral-600">{card.b}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section eyebrow="INSIGHTS" title="何がわかるのか">
          <p>
            「この人とはテンポが合う」「自然にふざけられる」——そんな感覚の背景にある<strong>ユーモアの型</strong>がわかります。
          </p>
          <p>
            恋人・友達・職場など、それぞれの関係の中で、<strong>伝え方や距離感の整え方</strong>が自然に見えてきます。
            これは“笑わせ方”ではなく、<strong>自分らしい感性で関わるための自己理解</strong>です。
          </p>
        </Section>

        <Section eyebrow="HOW TO ENJOY" title="どう楽しむ？">
          <ol className="list-decimal pl-5 space-y-2">
            <li>まずは自分のタイプを知る。</li>
            <li>次に身近な人にも受けてもらい、結果を見せ合う。</li>
            <li>
              <strong>ユーモアの“翻訳の違い”</strong>を比べながら、合うテンポや心地よい間合いを見つけていく。
            </li>
          </ol>
          <p className="mt-4">その過程こそ、この診断の面白さです。</p>
          <div className="mt-6">
            <Link
              href="/test"
              className="inline-flex items-center rounded-xl px-5 py-3 bg-black text-white shadow hover:opacity-90"
              data-analytics-id="cta_begin_from_about"
            >
              診断をはじめる
            </Link>
          </div>
        </Section>

        <Section eyebrow="CLOSING" title="最後に">
          <p>
            自分のユーモアを言葉にできると、その場に合わせた伝え方や、人との距離の取り方がやさしく整います。
            あなたらしいユーモアの感性を、ここから見つめてください。
          </p>
          <div className="mt-6 rounded-xl border border-amber-300 bg-amber-50 p-4 text-amber-900">
            <p className="text-sm">
              💬 トーン意図：技術語よりも「つながり方／関わり方」「居心地」「テンポ」「空気」「間合い」を軸に、
              SNSで“比べる・見せ合う”軽い行動へ自然接続します。
            </p>
          </div>
        </Section>
      </main>
    </Layout>
  );
}
