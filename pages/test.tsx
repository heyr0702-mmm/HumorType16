import { useEffect, useMemo, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import ProgressBar from "../components/ProgressBar";
import QuestionCard from "../components/QuestionCard";
import { LikertValue } from "../components/Scale7";
import type { HumorFamilyCode } from "../components/HumorCharacterBadge";
import { HUMOR_QUESTIONS, AxisKey } from "../data/humor-questions";
import { HUMOR_TYPES } from "../data/humor-types";
import { trackEvent } from "@/utils/analytics";

const QUESTIONS_PER_PAGE = 5;
const FAMILY_CODES: HumorFamilyCode[] = ["EA", "EC", "IA", "IC"];

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

  useEffect(() => {
    trackEvent("begin_test", { total_questions: totalQuestions });
  }, [totalQuestions]);

  const answeredCount = useMemo(
    () =>
      Object.values(responses).reduce((count, value) => (typeof value === "number" ? count + 1 : count), 0),
    [responses]
  );

  const progressPercent = totalQuestions === 0 ? 0 : Math.round((answeredCount / totalQuestions) * 100);

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
      const axisScores = computeAxisScores(responses);
      const targetType = deriveLikelyType(axisScores);

      if (typeof window !== "undefined") {
        window.localStorage.setItem("humorType16-last-result", targetType);
      }

      trackEvent("complete_test", { result_type: targetType });
      void router.push("/result-gate");
      return;
    }

    setCurrentPage((page) => Math.min(totalPages - 1, page + 1));
  };

  return (
    <>
      <Head>
        <title>HumorType16 – 診断テスト</title>
        <meta
          name="description"
          content="30問のユーモアタイプ診断です。1ページにつき5問ずつ回答してください。すべての回答が完了すると、あなたのタイプ結果が表示されます。"
        />
      </Head>

      <section className="relative z-10 mx-auto w-full max-w-7xl px-6 py-16 sm:px-8 md:py-20">
        <header className="max-w-3xl space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#777777]">Test</p>
          <h1 className="text-3xl font-extrabold leading-tight tracking-[-0.01em] text-[#2B2B2B] md:text-4xl">
            あなたのユーモアのリズムを測る30問。
          </h1>
          <p className="text-base leading-relaxed text-[#5A5A5A]">
            直感で回答してみましょう。各ページ5問ずつ、全体でおよそ5分ほどの診断です。ユーモアのテンポが少しずつ輪郭を帯びていきます。
          </p>
        </header>

        <div className="mt-14 grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.6fr)]">
          <aside className="order-last lg:order-first">
            <ProgressBar
              answeredCount={answeredCount}
              totalQuestions={totalQuestions}
              progressPercent={progressPercent}
            />
          </aside>

          <div className="order-first space-y-6 lg:order-last">
            <div className="rounded-2xl border border-white/60 bg-white/70 p-6 shadow-sm backdrop-blur-sm">
              <div className="flex flex-col gap-3 text-xs text-[#777777] sm:flex-row sm:items-center sm:justify-between">
                <span className="font-semibold uppercase tracking-[0.2em]">
                  Step {currentPage + 1} / {totalPages}
                </span>
                <span>
                  質問 {start + 1}〜{Math.min(totalQuestions, end)}
                </span>
              </div>

              <div className="mt-6 space-y-6">
                {pageQuestions.map((question) => (
                  <QuestionCard
                    key={question.id}
                    id={question.id}
                    prompt={question.prompt}
                    value={responses[question.id] ?? null}
                    onChange={(value) => handleAnswerChange(question.id, value)}
                    groupName={`page-${currentPage}-q-${question.id}`}
                  />
                ))}

                {pageQuestions.length === 0 ? (
                  <p className="text-center text-sm text-[#5A5A5A]">
                    質問データを準備中です。HumorType16 の完全版をお楽しみに！
                  </p>
                ) : null}
              </div>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <button
                  type="button"
                  className="rounded-full border border-[#2B2B2B]/15 px-6 py-3 text-sm font-medium text-[#5A5A5A] transition duration-300 ease-in-out hover:border-[#2B2B2B]/30 hover:text-[#2B2B2B] disabled:cursor-not-allowed disabled:opacity-40"
                  onClick={handleBack}
                  disabled={currentPage === 0}
                >
                  前のページへ
                </button>
                <button
                  type="button"
                  className="rounded-full bg-[#6E56CF] px-8 py-3 text-sm font-semibold text-white shadow-sm transition duration-300 ease-in-out hover:bg-[#5B45B5] disabled:cursor-not-allowed disabled:opacity-40"
                  onClick={handleNext}
                  disabled={!canGoNext || totalQuestions === 0}
                >
                  {isFinalPage ? "診断結果を見る" : "次のページへ"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
