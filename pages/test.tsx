import { useCallback, useEffect, useMemo, useState } from "react";
import type { KeyboardEvent } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import HumorQuestion, { LikertValue } from "../components/HumorQuestion";
import ProgressBar from "../components/ProgressBar";
import type { HumorFamilyCode } from "../components/HumorCharacterBadge";
import { HUMOR_QUESTIONS, AxisKey } from "../data/humor-questions";
import { HUMOR_TYPES } from "../data/humor-types";
import { trackEvent } from "@/utils/analytics";

const QUESTIONS_PER_PAGE = 5;
const FAMILY_CODES: HumorFamilyCode[] = ["EA", "EC", "IA", "IC"];

type ResponseMap = Record<number, LikertValue | null>;

type AxisTotals = Record<AxisKey, { sum: number; count: number }>;

type AxisScores = Partial<Record<AxisKey, number>>;

function computeAxisScores(responses: ResponseMap): AxisScores {
  const totals: AxisTotals = {
    energy: { sum: 0, count: 0 },
    absurdity: { sum: 0, count: 0 },
    tone: { sum: 0, count: 0 },
    structure: { sum: 0, count: 0 },
  };

  HUMOR_QUESTIONS.forEach((question) => {
    const response = responses[question.id];

    if (response === null) {
      return;
    }

    const normalized = (response - 1) / 6;
    const oriented = question.direction === 1 ? normalized : 1 - normalized;

    totals[question.axis].sum += oriented;
    totals[question.axis].count += 1;
  });

  const scores: AxisScores = {};

  (Object.keys(totals) as AxisKey[]).forEach((axis) => {
    const { sum, count } = totals[axis];

    if (count === 0) {
      return;
    }

    scores[axis] = (sum / count) * 100;
  });

  return scores;
}

function deriveFamilyCode(axisScores: AxisScores): HumorFamilyCode {
  const energyScore = axisScores.energy ?? 50;
  const absurdityScore = axisScores.absurdity ?? 50;

  const family = `${energyScore >= 50 ? "E" : "I"}${absurdityScore >= 50 ? "A" : "C"}` as HumorFamilyCode;

  if (FAMILY_CODES.includes(family)) {
    return family;
  }

  return "EA";
}

function deriveLikelyType(axisScores: AxisScores): string {
  const familyCode = deriveFamilyCode(axisScores);
  const matching = Object.keys(HUMOR_TYPES).find((code) => code.startsWith(familyCode));

  return matching ?? Object.keys(HUMOR_TYPES)[0];
}

export default function TestPage() {
  const router = useRouter();

  const [currentPage, setCurrentPage] = useState(0);
  const [responses, setResponses] = useState<ResponseMap>(() => {
    const initial: ResponseMap = {};
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

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [currentPage]);

  const answeredCount = useMemo(
    () =>
      Object.values(responses).reduce(
        (count, value) => (typeof value === "number" ? count + 1 : count),
        0
      ),
    [responses]
  );

  const progressPercent = totalQuestions === 0 ? 0 : Math.round((answeredCount / totalQuestions) * 100);

  const startIndex = currentPage * QUESTIONS_PER_PAGE;
  const endIndex = Math.min(startIndex + QUESTIONS_PER_PAGE, totalQuestions);
  const pageQuestions = HUMOR_QUESTIONS.slice(startIndex, endIndex);

  const canGoNext = pageQuestions.every((question) => typeof responses[question.id] === "number");
  const isFinalPage = currentPage === totalPages - 1;

  const handleAnswerChange = useCallback((id: number, value: LikertValue) => {
    setResponses((prev) => ({ ...prev, [id]: value }));
  }, []);

  const handleBack = useCallback(() => {
    setCurrentPage((page) => Math.max(0, page - 1));
  }, []);

  const handleNext = useCallback(() => {
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
  }, [canGoNext, isFinalPage, responses, router, totalPages]);

  const handleFooterKeyDown = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      if ((event.key === "Enter" || event.key === " ") && canGoNext) {
        event.preventDefault();
        handleNext();
      }
    },
    [canGoNext, handleNext]
  );

  return (
    <>
      <Head>
        <title>HumorType16 – 診断テスト</title>
        <meta
          name="description"
          content="30問のユーモアタイプ診断です。1ページにつき5問ずつ回答してください。すべての回答が完了すると、あなたのタイプ結果が表示されます。"
        />
      </Head>

      <div className="min-h-screen flex flex-col bg-white dark:bg-slate-950">
        <header className="w-full">
          <div className="mx-auto max-w-3xl px-4 pt-6 pb-4 text-center">
            <h1 className="text-xl font-semibold text-slate-900 dark:text-slate-100">ユーモアタイプ診断</h1>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
              直感で答えてください（全{totalQuestions}問）
            </p>
          </div>
        </header>

        <main className="flex-1 grid place-items-center px-4 pb-28 md:pb-32">
          <div className="w-full max-w-3xl space-y-6">
            <ol className="space-y-6">
              {pageQuestions.map((question) => (
                <li key={question.id} className="list-none">
                  <HumorQuestion
                    id={question.id}
                    prompt={question.prompt}
                    selected={responses[question.id]}
                    onChange={(value) => handleAnswerChange(question.id, value)}
                    groupName={`question-${question.id}`}
                  />
                </li>
              ))}
            </ol>
          </div>
        </main>

        <div
          role="region"
          aria-label="進行状況と操作"
          tabIndex={0}
          onKeyDown={handleFooterKeyDown}
          className="fixed bottom-0 left-1/2 w-full max-w-3xl -translate-x-1/2 px-4 pb-[env(safe-area-inset-bottom)]"
        >
          <div className="rounded-2xl border border-black/5 bg-white/90 p-4 shadow-lg backdrop-blur dark:border-white/10 dark:bg-slate-900/80">
            <div className="px-1 [&>div]:static [&>div]:z-auto [&>div]:top-auto">
              <ProgressBar
                answeredCount={answeredCount}
                totalQuestions={totalQuestions}
                progressPercent={progressPercent}
              />
            </div>
            <div className="mt-4 flex items-center justify-between gap-4">
              <button
                type="button"
                onClick={handleBack}
                disabled={currentPage === 0}
                aria-label="前の5問へ戻る"
                className="h-11 rounded-xl border border-slate-200 px-4 text-sm font-medium text-slate-700 transition disabled:opacity-40 dark:border-slate-700 dark:text-slate-200"
              >
                戻る
              </button>
              <div className="text-sm text-slate-600 dark:text-slate-300">
                {currentPage + 1} / {totalPages}
              </div>
              <button
                type="button"
                onClick={handleNext}
                aria-label={isFinalPage ? "結果へ進む" : "次の5問へ進む"}
                disabled={!canGoNext}
                className="h-11 rounded-xl bg-slate-900 px-5 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:opacity-40 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-200"
              >
                {isFinalPage ? "結果へ" : "次へ"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
