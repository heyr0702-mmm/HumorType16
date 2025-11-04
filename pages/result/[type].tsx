import fs from "node:fs/promises";
import path from "node:path";
import Head from "next/head";
import { GetStaticPaths, GetStaticProps } from "next";
import AdSlot from "../../components/AdSlot";
import Layout from "../../components/Layout";
import ResultHeader from "../../components/ResultHeader";
import { HumorFamilyCode } from "../../components/HumorCharacterBadge";
import { HUMOR_TYPES, HumorTypeDetail } from "../../data/humor-types";
import { AxisKey } from "../../data/humor-questions";

interface AxisInsight {
  key: AxisKey;
  label: string;
  description: string;
  percent: number;
}

interface ResultPageProps {
  typeDetail: HumorTypeDetail;
  familyCode: HumorFamilyCode;
  axisInsights: AxisInsight[];
  familyTagline: string | null;
  preloadAvatars: string[];
  shareUrl: string;
}

const AXIS_METADATA: Record<AxisKey, { label: string; description: string }> = {
  energy: {
    label: "エネルギー",
    description: "自分の笑いの視点をどれだけ大胆に表現するか。",
  },
  absurdity: {
    label: "ナンセンス度",
    description: "王道の展開と比べて、どれだけシュールなひねりを好むか。",
  },
  tone: {
    label: "トーン",
    description: "ユーモアがどれだけ軽やかか、あるいは鋭い切れ味か。",
  },
  structure: {
    label: "構成力",
    description: "綿密に練った構成とアドリブ感のどちらを好むか。",
  },
};

const FAMILY_TAGLINES: Record<HumorFamilyCode, string> = {
  EA: "High-energy surrealists who love to surprise.",
  EC: "Expressive storytellers with timeless structure.",
  IA: "Quiet experimenters who savor the unexpected.",
  IC: "Introspective observers with classic timing.",
};

const FAMILY_CODES: HumorFamilyCode[] = ["EA", "EC", "IA", "IC"];

const FAMILY_ACCENTS: Record<HumorFamilyCode, string> = {
  EA: "#1D7ED6",
  EC: "#2FA36B",
  IA: "#E67E22",
  IC: "#6E56CF",
};

function deriveAxisPercent(typeCode: string, axis: AxisKey): number {
  const letters = typeCode.split("");

  switch (axis) {
    case "energy":
      return letters[0] === "I" ? 35 : 70;
    case "absurdity":
      return letters[1] === "C" ? 38 : 68;
    case "tone":
      return letters[2] === "L" ? 62 : 45;
    case "structure":
      return letters[3] === "S" ? 66 : 44;
    default:
      return 50;
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: Object.keys(HUMOR_TYPES).map((code) => ({
      params: { type: code },
    })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<ResultPageProps> = async ({ params }) => {
  const typeCodeParam = params?.type;

  if (typeof typeCodeParam !== "string") {
    return { notFound: true };
  }

  const typeDetail = HUMOR_TYPES[typeCodeParam];

  if (!typeDetail) {
    return { notFound: true };
  }

  const derivedFamilyCode = (typeDetail.family ?? typeCodeParam.slice(0, 2)) as HumorFamilyCode;

  const avatarDirectory = path.join(process.cwd(), "public", "avatars");
  const preloadAvatars = await fs
    .readdir(avatarDirectory)
    .then((files) => files.filter((file) => file.endsWith(".svg")).map((file) => `/avatars/${file}`))
    .catch(() => FAMILY_CODES.map((code) => `/avatars/${code}.svg`));

  const axisInsights: AxisInsight[] = (Object.keys(AXIS_METADATA) as AxisKey[]).map((axis) => ({
    key: axis,
    label: AXIS_METADATA[axis].label,
    description: AXIS_METADATA[axis].description,
    percent: deriveAxisPercent(typeCodeParam, axis),
  }));

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  const sharePath = `/result/${typeDetail.code}`;
  const shareUrl = baseUrl ? `${baseUrl}${sharePath}` : sharePath;

  return {
    props: {
      typeDetail,
      familyCode: FAMILY_CODES.includes(derivedFamilyCode) ? derivedFamilyCode : "EA",
      axisInsights,
      familyTagline: FAMILY_TAGLINES[derivedFamilyCode] ?? null,
      preloadAvatars,
      shareUrl,
    },
  };
};

export default function HumorResultPage({
  typeDetail,
  familyCode,
  axisInsights,
  familyTagline,
  preloadAvatars,
  shareUrl,
}: ResultPageProps) {
  const orderedInsights = axisInsights
    .slice()
    .sort((a, b) => a.label.localeCompare(b.label, "en", { sensitivity: "base" }));

  const accentColor = FAMILY_ACCENTS[familyCode];

  return (
    <>
      <Head>
        <title>{`${typeDetail.title} – HumorType16`}</title>
        <meta name="description" content={typeDetail.catch} />
        {preloadAvatars.map((src) => (
          <link key={src} rel="preload" as="image" href={src} />
        ))}
      </Head>
      <Layout
        variant="light"
        hero={
          <ResultHeader
            typeDetail={typeDetail}
            familyCode={familyCode}
            familyTagline={familyTagline}
            shareUrl={shareUrl}
          />
        }
      >
        <section className="rounded-3xl border border-white/80 bg-white/80 p-8 shadow-soft backdrop-blur">
          <div className="space-y-6">
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-slate-900">あなたの笑いの骨格</h2>
              <p className="text-base leading-relaxed text-slate-700">{typeDetail.basicLong}</p>
              <p className="text-base leading-relaxed text-slate-700">{typeDetail.humorLong}</p>
            </div>

            {typeDetail.axesBrief ? (
              <div className="rounded-2xl border border-slate-200 bg-white/90 p-4 shadow-sm">
                <h3 className="text-sm font-semibold text-slate-900">あなたのユーモア・バランス</h3>
                <p className="mt-1 text-sm leading-relaxed text-slate-600">{typeDetail.axesBrief}</p>
              </div>
            ) : null}

            <div className="grid gap-4 md:grid-cols-2">
              {orderedInsights.map((insight) => (
                <article key={insight.key} className="rounded-2xl border border-slate-200 bg-white/90 p-5 shadow-sm">
                  <div className="flex items-baseline justify-between gap-3">
                    <h4 className="text-base font-semibold text-slate-900">{insight.label}</h4>
                    <span className="text-sm font-semibold text-slate-700">{Math.round(insight.percent)}%</span>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{insight.description}</p>
                  <div className="mt-4 h-2 w-full rounded-full bg-slate-200">
                    <div
                      className="h-2 rounded-full"
                      style={{
                        width: `${Math.max(0, Math.min(100, insight.percent))}%`,
                        background: `linear-gradient(90deg, ${accentColor} 0%, ${accentColor}cc 100%)`,
                      }}
                    />
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {typeDetail.scenes.length > 0 ? (
          <section className="rounded-3xl border border-slate-200 bg-white/80 p-8 shadow-soft backdrop-blur">
            <header className="mb-6 space-y-2">
              <h2 className="text-2xl font-semibold text-slate-900">どんなシーンで冴える？</h2>
              <p className="text-sm text-slate-600">場面別の活躍ポイントと、すぐに使える一言サンプルです。</p>
            </header>
            <div className="grid gap-4 md:grid-cols-2">
              {typeDetail.scenes.map((scene) => (
                <article
                  key={scene.label}
                  className="flex h-full flex-col gap-3 rounded-2xl border border-slate-200 bg-white/95 p-5 shadow-sm"
                >
                  <h3 className="text-lg font-semibold text-slate-900">{scene.label}</h3>
                  <p className="text-sm leading-relaxed text-slate-600">{scene.description}</p>
                  <p className="text-sm italic text-slate-500">“{scene.example}”</p>
                </article>
              ))}
            </div>
          </section>
        ) : null}

        {typeDetail.compatibility.length > 0 ? (
          <section className="rounded-3xl border border-slate-200 bg-white/80 p-8 shadow-soft backdrop-blur">
            <header className="mb-6 space-y-2">
              <h2 className="text-2xl font-semibold text-slate-900">相性の良いタイプ</h2>
              <p className="text-sm text-slate-600">タッグで笑いを磨くときのヒントをまとめました。</p>
            </header>
            <div className="space-y-4">
              {typeDetail.compatibility.map((match, index) => {
                const labelMatch = match.description.match(/^\[(.*?)\]\s*/);
                const compatibilityLabel = labelMatch?.[1];
                const descriptionText = labelMatch
                  ? match.description.slice(labelMatch[0].length)
                  : match.description;

                return (
                  <article
                    key={`${match.code}-${index}`}
                    className="rounded-2xl border border-slate-200 bg-white/95 p-5 shadow-sm"
                  >
                    <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                      <div className="flex flex-col sm:flex-row sm:items-baseline sm:gap-2">
                        {compatibilityLabel ? (
                          <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                            {compatibilityLabel}
                          </span>
                        ) : null}
                        <h3 className="text-lg font-semibold text-slate-900">
                          {match.title}{" "}
                          <span className="text-sm font-normal text-slate-500">({match.code})</span>
                        </h3>
                      </div>
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-slate-600">{descriptionText}</p>
                  </article>
                );
              })}
            </div>
          </section>
        ) : null}

        <AdSlot className="mx-auto w-full max-w-3xl" />
      </Layout>
    </>
  );
}
