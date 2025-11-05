import fs from "node:fs/promises";
import path from "node:path";
import Head from "next/head";
import { GetStaticPaths, GetStaticProps } from "next";
import AdSenseLoader from "../../components/AdSenseLoader";
import AdSlot from "../../components/AdSlot";
import Layout from "../../components/Layout";
import RewardedUnlock from "../../components/RewardedUnlock";
import ResultHeader from "../../components/ResultHeader";
import { HumorFamilyCode } from "../../components/HumorCharacterBadge";
import { HUMOR_TYPES, HumorTypeDetail } from "../../data/humor-types";
import { AxisKey } from "../../data/humor-questions";
import { getNormalizedAxisValues } from "../../utils/scoring";

interface ResultPageProps {
  typeDetail: HumorTypeDetail;
  familyCode: HumorFamilyCode;
  familyTagline: string | null;
  preloadAvatars: string[];
  shareUrl: string;
}

const AXIS_METADATA: Record<AxisKey, { label: string; description: string }> = {
  energy: {
    label: "瞬発力",
    description: "その場の温度をつかみ、テンポよく笑いを広げる即興性の高さです。",
  },
  absurdity: {
    label: "発想の飛距離",
    description: "現実の延長線上からどれだけ離れた視点や設定で楽しむかを示します。",
  },
  tone: {
    label: "語り口",
    description: "共感で包むか論理で切るか、ツッコミのトーンの傾向を表します。",
  },
  structure: {
    label: "構成バランス",
    description: "段取りを整えるかノリで崩すか、展開の組み立て方の志向を測ります。",
  },
};


const FAMILY_TAGLINES: Record<HumorFamilyCode, string | null> = {
  EA: "瞬発力で驚きを仕掛けるアイデア派。",
  EC: "表現豊かに王道の構成で魅せる語り手。",
  IA: "静かな空気からじわじわ笑いを醸す実験家。",
  IC: "内省的な視点でクラシックな間を生かす観察者。",
};

const FAMILY_CODES: HumorFamilyCode[] = ["EA", "EC", "IA", "IC"];

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

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  const sharePath = `/result/${typeDetail.code}`;
  const shareUrl = baseUrl ? `${baseUrl}${sharePath}` : sharePath;

  return {
    props: {
      typeDetail,
      familyCode: FAMILY_CODES.includes(derivedFamilyCode) ? derivedFamilyCode : "EA",
      familyTagline: FAMILY_TAGLINES[derivedFamilyCode] ?? null,
      preloadAvatars,
      shareUrl,
    },
  };
};

export default function HumorResultPage({
  typeDetail,
  familyCode,
  familyTagline,
  preloadAvatars,
  shareUrl,
}: ResultPageProps) {
  const axisValues = getNormalizedAxisValues(typeDetail.code);
  const axisOrder: AxisKey[] = ["energy", "absurdity", "tone", "structure"];
  const longFormBlocks = `${typeDetail.basicLong}\n\n${typeDetail.humorLong}`
    .split("\n\n")
    .map((block) => block.trim())
    .filter((block) => block.length > 0);
  const leadBlock = longFormBlocks[0] ?? "";
  const extraBlocks = longFormBlocks.slice(1);

  return (
    <>
      <AdSenseLoader />
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
        <AdSlot slotId="5161326360" className="mx-auto my-12 w-full max-w-3xl" />
        <section className="rounded-3xl border border-slate-200 bg-white/80 p-6 shadow-soft backdrop-blur sm:p-8">
          <header className="space-y-2">
            <h2 className="text-2xl font-semibold text-slate-900">あなたのユーモア・バランス</h2>
            {typeDetail.axesBrief ? (
              <p className="text-sm leading-relaxed text-slate-600">{typeDetail.axesBrief}</p>
            ) : (
              <p className="text-sm leading-relaxed text-slate-600">
                4つの軸からあなたの笑い方のバランスを可視化しました。
              </p>
            )}
          </header>
          <div className="mt-8 space-y-4">
            <h3 className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
              サブ指標
            </h3>
            <div className="grid gap-4 md:grid-cols-2">
              {axisOrder.map((axisKey) => {
                const axisValue = axisValues[axisKey] ?? 0.5;
                const axisPercent = Math.round(axisValue * 100);

                return (
                  <article
                    key={axisKey}
                    className="flex h-full flex-col justify-between rounded-2xl border border-slate-200 bg-white/95 p-5 shadow-sm"
                  >
                    <div className="flex items-baseline justify-between gap-3">
                      <h4 className="text-base font-semibold text-slate-900">
                        {AXIS_METADATA[axisKey].label}
                      </h4>
                      <span className="text-lg font-bold text-slate-900">{axisPercent}%</span>
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-slate-600">
                      {AXIS_METADATA[axisKey].description}
                    </p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="rounded-3xl border border-white/80 bg-white/80 p-8 shadow-soft backdrop-blur">
          <div className="space-y-10">
            {leadBlock ? (
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-slate-900">ユーモアの骨格</h2>
                <p className="text-base leading-relaxed text-slate-700">{leadBlock}</p>
              </div>
            ) : null}

            {extraBlocks.length > 0 ? (
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-slate-900">ユーモアの展開パターン</h2>
                <RewardedUnlock unlockKey={`result-extra-${typeDetail.code}`}>
                  <div className="space-y-4">
                    {extraBlocks.map((block, index) => (
                      <p key={index} className="text-base leading-relaxed text-slate-700">
                        {block}
                      </p>
                    ))}
                  </div>
                </RewardedUnlock>
              </div>
            ) : null}
          </div>
        </section>

        <AdSlot slotId="1222081353" className="mx-auto my-12 w-full max-w-3xl" />

        {typeDetail.scenes.length > 0 ? (
          <section className="rounded-3xl border border-slate-200 bg-white/80 p-8 shadow-soft backdrop-blur">
            <header className="mb-6 space-y-2">
              <h2 className="text-2xl font-semibold text-slate-900">どんなシーンで冴える？</h2>
              <p className="text-sm text-slate-600">場面別の活躍ポイントと、すぐに使える一言サンプルです。</p>
            </header>
            <div className="rounded-2xl border border-slate-200 bg-white/95 p-4 sm:p-5">
              <ul className="divide-y divide-slate-200">
                {typeDetail.scenes.map((scene, index) => {
                  const inlineText = [scene.label, scene.description, scene.example].join(" ｜ ");

                  return (
                    <li
                      key={`${scene.label}-${index}`}
                      className="flex min-w-0 items-center gap-3 py-3 text-sm text-slate-700 first:pt-0 last:pb-0 sm:text-base"
                    >
                      <span className="h-1.5 w-1.5 flex-none rounded-full bg-slate-400" />
                      <span className="flex-1 truncate" title={inlineText}>
                        {inlineText}
                      </span>
                    </li>
                  );
                })}
              </ul>
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

        <AdSlot slotId="5847722070" className="mx-auto my-12 w-full max-w-3xl" />
      </Layout>
    </>
  );
}
