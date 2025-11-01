import fs from "node:fs/promises";
import path from "node:path";
import Head from "next/head";
import { GetStaticPaths, GetStaticProps } from "next";
import AdSlot from "../../components/AdSlot";
import HumorResultView, { AxisInsight } from "../../components/HumorResultView";
import { HumorFamilyCode } from "../../components/HumorCharacterBadge";
import { HUMOR_TYPES, HumorTypeDetail } from "../../data/humor-types";
import { AxisKey } from "../../data/humor-questions";

interface ResultPageProps {
  typeDetail: HumorTypeDetail;
  familyCode: HumorFamilyCode;
  axisInsights: AxisInsight[];
  familyTagline: string | null;
  preloadAvatars: string[];
}

const AXIS_METADATA: Record<AxisKey, { label: string; description: string }> = {
  energy: {
    label: "Energy",
    description: "How boldly you project your comedic point of view.",
  },
  absurdity: {
    label: "Absurdity",
    description: "Your appetite for surreal twists versus classic setups.",
  },
  tone: {
    label: "Tone",
    description: "Whether your humor stays lighthearted or sharp-edged.",
  },
  structure: {
    label: "Structure",
    description: "How much you prefer planned arcs versus improvised riffs.",
  },
};

const FAMILY_TAGLINES: Record<HumorFamilyCode, string> = {
  EA: "High-energy surrealists who love to surprise.",
  EC: "Expressive storytellers with timeless structure.",
  IA: "Quiet experimenters who savor the unexpected.",
  IC: "Introspective observers with classic timing.",
};

const FAMILY_CODES: HumorFamilyCode[] = ["EA", "EC", "IA", "IC"];

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

  const familyCode = (typeCodeParam.slice(0, 2) as HumorFamilyCode) ?? "EA";

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

  return {
    props: {
      typeDetail,
      familyCode: FAMILY_CODES.includes(familyCode) ? familyCode : "EA",
      axisInsights,
      familyTagline: FAMILY_TAGLINES[familyCode] ?? null,
      preloadAvatars,
    },
  };
};

export default function HumorResultPage({
  typeDetail,
  familyCode,
  axisInsights,
  familyTagline,
  preloadAvatars,
}: ResultPageProps) {
  return (
    <>
      <Head>
        <title>{`${typeDetail.name} – HumorType16`}</title>
        <meta name="description" content={typeDetail.summary} />
        {preloadAvatars.map((src) => (
          <link key={src} rel="preload" as="image" href={src} />
        ))}
      </Head>
      <main className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-100 to-slate-200 py-12 px-4 text-slate-900 dark:from-slate-900 dark:via-slate-950 dark:to-slate-900">
        <div className="mx-auto flex max-w-5xl flex-col gap-8">
          <header className="space-y-4 text-center">
            <p className="text-sm font-medium uppercase tracking-[0.3em] text-slate-500 dark:text-slate-300">HumorType16 Result</p>
            <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white">{typeDetail.name}</h1>
            <p className="mx-auto max-w-2xl text-lg text-slate-600 dark:text-slate-300">{typeDetail.summary}</p>
          </header>

          <HumorResultView
            typeDetail={typeDetail}
            familyCode={familyCode}
            axisInsights={axisInsights}
            familyTagline={familyTagline ?? undefined}
          />
          <AdSlot className="mx-auto w-full max-w-3xl" />
        </div>
      </main>
    </>
  );
}
