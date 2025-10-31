import { useMemo, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import HumorQuestion, { LikertValue } from "../components/HumorQuestion";
import HumorCharacterBadge, { HumorFamilyCode } from "../components/HumorCharacterBadge";
import { HUMOR_QUESTIONS, AxisKey } from "../data/humor-questions";
import { HUMOR_TYPES } from "../data/humor-types";

const QUESTIONS_PER_PAGE = 5;
const FAMILY_CODES: HumorFamilyCode[] = ["EA", "EC", "IA", "IC"];

const AXIS_LABELS: Record<AxisKey, string> = {
  energy: "Expressive energy",
  absurdity: "Absurdist flair",
  tone: "Tone balance",
  structure: "Structural play",
};

function computeAxisScores(
  responses: Record<number, LikertValue | null>
): Partial<Record<AxisKey, number>> {
  const totals: Record<AxisKey, { sum: number; count: number }> = {
    energy: { sum: 0, count: 0 },
    absurdity: { sum: 0, count: 0 },
    tone: { sum: 0, count: 0 },
    structure: { sum: 0, count: 0 },
  };

  HUMOR_QUESTIONS.forEach((question) => {
    const response = responses[question.id];

    if (!response) {
      return;
    }

    const normalized = (response - 1) / 6;
    const oriented = question.direction === 1 ? normalized : 1 - normalized;

    totals[question.axis].sum += oriented;
    totals[question.axis].count += 1;
  });

  const scores: Partial<Record<AxisKey, number>> = {};

  (Object.keys(totals) as AxisKey[]).forEach((axis) => {
    const { sum, count } = totals[axis];

    if (count === 0) {
      return;
    }

    scores[axis] = (sum / count) * 100;
  });

  return scores;
}

function deriveFamilyCode(axisScores: Partial<Record<AxisKey, number>>): HumorFamilyCode {
  const energyScore = axisScores.energy ?? 50;
  const absurdityScore = axisScores.absurdity ?? 50;

  const family = `${energyScore >= 50 ? "E" : "I"}${absurdityScore >= 50 ? "A" : "C"}` as HumorFamilyCode;

  if (FAMILY_CODES.includes(family)) {
    return family;
  }

  return "EA";
}

function deriveLikelyType(axisScores: Partial<Record<AxisKey, number>>): string {
  const familyCode = deriveFamilyCode(axisScores);
  const matching = Object.keys(HUMOR_TYPES).find((code) => code.startsWith(familyCode));

  return matching ?? Object.keys(HUMOR_TYPES)[0];
}

export default function HumorTestWizard() {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(0);
  const [responses, setResponses] = useState<Record<number, LikertValue | null>>(() => {
    const initial: Record<number, LikertValue | null> = {};

    HUMOR_QUESTIONS.forEach((question) => {
      initial[question.id] = null;
    });

    return initial;
  });

  const totalQuestions = HUMOR_QUESTIONS.length;
  const totalPages = Math.max(1, Math.ceil(totalQuestions / QUESTIONS_PER_PAGE));

  const answeredCount = useMemo(
    () =>
      Object.values(responses).reduce((count, value) => (typeof value === "number" ? count + 1 : count), 0),
    [responses]
  );

  const progressPercent = totalQuestions === 0 ? 0 : Math.round((answeredCount / totalQuestions) * 100);

  const axisScores = useMemo(() => computeAxisScores(responses), [responses]);
  const provisionalFamily = useMemo(() => deriveFamilyCode(axisScores), [axisScores]);

  const start = currentPage * QUESTIONS_PER_PAGE;
  const end = start + QUESTIONS_PER_PAGE;
  const pageQuestions = HUMOR_QUESTIONS.slice(start, end);

  const canGoNext = pageQuestions.every((question) => typeof responses[question.id] === "number");
  const isFinalPage = currentPage === totalPages - 1;

  const handleAnswerChange = (id: number, value: LikertValue) => {
    setResponses((prev) => ({ ...prev, [id]: value }));
  };

  const handleBack = () => {
    setCurrentPage((page) => Math.max(0, page - 1));
  };

  const handleNext = () => {
    if (!canGoNext) {
      return;
    }

    if (isFinalPage) {
      const targetType = deriveLikelyType(axisScores);

      void router.push(`/result/${targetType}`);
      return;
    }

    setCurrentPage((page) => Math.min(totalPages - 1, page + 1));
  };

  return (
    <>
      <Head>
        <title>HumorType16 – Test</title>
        <meta name="description" content="Discover your HumorType16 profile with our playful wizard." />
      </Head>

      <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 py-12 px-4 text-slate-100">
        <div className="mx-auto flex max-w-5xl flex-col gap-10">
          <header className="flex flex-col gap-4 text-center">
            <h1 className="text-4xl font-semibold tracking-tight text-slate-50">HumorType16 Preview Wizard</h1>
            <p className="mx-auto max-w-2xl text-lg text-slate-300">
              Answer a few questions per step to sketch your comedy instincts. Your provisional family badge updates as you go,
              and you can review your results at the end.
            </p>
          </header>

          <section className="rounded-3xl border border-slate-800/60 bg-slate-900/80 p-6 shadow-xl backdrop-blur">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex flex-1 flex-col gap-4">
                <div>
                  <p className="text-sm uppercase tracking-wider text-slate-400">Progress</p>
                  <div className="mt-2 h-3 w-full overflow-hidden rounded-full bg-slate-800">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 transition-all"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                  <p className="mt-2 text-sm font-medium text-slate-200">
                    {answeredCount} of {totalQuestions} questions answered ({progressPercent}%)
                  </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  {(Object.keys(AXIS_LABELS) as AxisKey[]).map((axis) => {
                    const score = axisScores[axis] ?? 50;

                    return (
                      <div key={axis} className="rounded-2xl border border-slate-800 bg-slate-900/90 p-4">
                        <p className="text-sm uppercase tracking-wide text-slate-400">{AXIS_LABELS[axis]}</p>
                        <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-slate-800">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-violet-500 to-sky-400"
                            style={{ width: `${Math.round(score)}%` }}
                          />
                        </div>
                        <p className="mt-2 text-sm text-slate-300">{Math.round(score)}%</p>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="flex justify-center">
                <HumorCharacterBadge code={provisionalFamily} headline="Provisional Family" />
              </div>
            </div>
          </section>

          <section className="rounded-3xl border border-slate-800/60 bg-slate-900/80 p-6 shadow-xl backdrop-blur">
            <div className="flex items-center justify-between gap-2 border-b border-slate-800 pb-4">
              <p className="text-sm font-medium text-slate-300">
                Step {currentPage + 1} of {totalPages}
              </p>
              <p className="text-sm text-slate-400">Questions {start + 1}–{Math.min(totalQuestions, end)}</p>
            </div>

            <div className="mt-6 grid gap-6">
              {pageQuestions.map((question) => (
                <HumorQuestion
                  key={question.id}
                  id={question.id}
                  prompt={question.prompt}
                  selected={responses[question.id] ?? undefined}
                  onChange={(value) => handleAnswerChange(question.id, value)}
                />
              ))}

              {pageQuestions.length === 0 ? (
                <p className="text-center text-slate-400">
                  Question data is being prepared. Check back soon for the full HumorType16 experience!
                </p>
              ) : null}
            </div>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <button
                type="button"
                className="rounded-full border border-slate-700 px-6 py-3 text-sm font-medium text-slate-300 transition hover:border-slate-500 hover:text-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
                onClick={handleBack}
                disabled={currentPage === 0}
              >
                Back
              </button>
              <button
                type="button"
                className="rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 px-8 py-3 text-sm font-semibold text-white shadow-lg transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40"
                onClick={handleNext}
                disabled={!canGoNext || totalQuestions === 0}
              >
                {isFinalPage ? "View your humor profile" : "Next"}
              </button>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
