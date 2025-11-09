import { useCallback, useEffect, useMemo, useState } from "react";
import type { KeyboardEvent, ReactElement, ReactNode } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import type { NextPage } from "next";
import Layout from "../components/Layout";
import Hero from "../components/Hero";
import ProgressFooter from "../components/ProgressFooter";
import HumorQuestion, { LikertValue } from "../components/HumorQuestion";
import type { HumorFamilyCode } from "../components/HumorCharacterBadge";
import { HUMOR_QUESTIONS, AxisKey } from "../data/humor-questions";
import { HUMOR_TYPES } from "../data/humor-types";
import { trackEvent } from "@/utils/analytics";

const QUESTIONS_PER_PAGE = 5;
const FAMILY_CODES: HumorFamilyCode[] = ["EA", "EC", "IA", "IC"];

type ResponseMap = Record<number, LikertValue | null>;

type AxisTotals = Record<AxisKey, { sum: number; count: number }>;

type AxisScores = Partial<Record<AxisKey, number>>;

type NextPageWithOptionalLayout<P = {}> = NextPage<P> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

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

const TestPage: NextPageWithOptionalLayout = () => {
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

  const progressPercent = totalQuestions === 0 ? 0 : (answeredCount / totalQuestions) * 100;

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

  const footerSlot = (
    <div
      role="region"
      aria-label="進行状況と操作"
      tabIndex={0}
      onKeyDown={handleFooterKeyDown}
      className="outline-none"
    >
      <ProgressFooter
        progressPct={progressPercent}
        pageText={`${currentPage + 1} / ${totalPages}`}
        canPrev={currentPage > 0}
        canNext={canGoNext}
        onPrev={handleBack}
        onNext={handleNext}
        nextLabel={isFinalPage ? "結果へ" : "次へ"}
      />
    </div>
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

      <Layout footerSlot={footerSlot}>
        <Hero title="ユーモアタイプ診断" subtitle={`直感で回答してください（全${totalQuestions}問）`} />

        <section className="mx-auto max-w-5xl px-4 pb-16 sm:px-6 lg:px-8">
          <div className="min-h-[55vh] grid place-items-center">
            <div className="w-full max-w-3xl space-y-4">
              <ol className="space-y-4">
                {pageQuestions.map((question) => (
                  <li key={question.id} className="list-none">
                    <HumorQuestion
                      id={question.id}
                      prompt={question.prompt}
                      selected={responses[question.id] ?? null}
                      onChange={(value) => handleAnswerChange(question.id, value)}
                      groupName={`question-${question.id}`}
                    />
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
};

TestPage.getLayout = (page: ReactElement) => page;

export default TestPage;
