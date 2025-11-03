import { useEffect, useMemo, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import HumorQuestion, { LikertValue } from "../components/HumorQuestion";
import type { HumorFamilyCode } from "../components/HumorCharacterBadge";
import { HUMOR_QUESTIONS, AxisKey } from "../data/humor-questions";
import { HUMOR_TYPES } from "../data/humor-types";

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
    // TODO: 診断開始イベントを送信
  }, []);

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

      // TODO: 診断完了イベントを送信
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

      <main className="min-h-screen bg-slate-50 py-12 px-4 text-slate-900">
        <div className="mx-auto flex max-w-5xl flex-col gap-10">
          <header className="flex flex-col gap-4 text-center">
            <h1 className="text-2xl font-semibold tracking-tight text-slate-900">HumorType16 診断テスト</h1>
            <p className="mx-auto max-w-2xl text-lg text-slate-600">
              30問のユーモアタイプ診断です。1ページにつき5問ずつ回答してください。結果はすべて回答が終わったあとに表示されます。
            </p>
          </header>

          <section className="card-default bg-white py-8 px-6">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-slate-500">進捗</p>
              <div className="mt-2 h-3 w-full overflow-hidden rounded-full bg-slate-200">
                <div
                  className="h-full rounded-full bg-indigo-500 transition-all"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              <p className="mt-2 text-sm font-medium text-slate-600">
                回答済み {answeredCount} / {totalQuestions}（{progressPercent}%）
              </p>
            </div>
          </section>

          <section className="card-default bg-white py-8 px-6">
            <div className="flex items-center justify-between gap-2 border-b border-slate-200 pb-4">
              <p className="text-sm font-medium text-slate-600">
                ステップ {currentPage + 1} / {totalPages}
              </p>
              <p className="text-sm text-slate-500">質問 {start + 1}〜{Math.min(totalQuestions, end)}</p>
            </div>

            <div className="mt-6 grid gap-6">
              {pageQuestions.map((question) => (
                <HumorQuestion
                  key={question.id}
                  id={question.id}
                  prompt={question.prompt}
                  selected={responses[question.id] ?? undefined}
                  onChange={(value) => handleAnswerChange(question.id, value)}
                  groupName={`page-${currentPage}-q-${question.id}`}
                />
              ))}

              {pageQuestions.length === 0 ? (
                <p className="text-center text-slate-500">
                  質問データを準備中です。HumorType16 の完全版をお楽しみに！
                </p>
              ) : null}
            </div>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <button
                type="button"
                className="border border-slate-300 bg-white px-6 py-3 text-sm font-medium text-slate-700 transition hover:border-slate-400 hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-60"
                onClick={handleBack}
                disabled={currentPage === 0}
              >
                前のページへ
              </button>
              <button
                type="button"
                className="bg-indigo-600 px-8 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-500"
                onClick={handleNext}
                disabled={!canGoNext || totalQuestions === 0}
              >
                {isFinalPage ? "診断結果を見る" : "次のページへ"}
              </button>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
