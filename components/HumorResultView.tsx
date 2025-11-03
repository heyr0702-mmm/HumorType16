import { useMemo } from "react";
import { HumorTypeDetail } from "../data/humor-types";
import { AxisKey } from "../data/humor-questions";
import HumorCharacterBadge, { HumorFamilyCode } from "./HumorCharacterBadge";
import styles from "../styles/HumorResult.module.css";

export interface AxisInsight {
  key: AxisKey;
  label: string;
  description: string;
  percent: number;
}

export interface HumorResultViewProps {
  typeDetail: HumorTypeDetail;
  familyCode: HumorFamilyCode;
  axisInsights: AxisInsight[];
  familyTagline?: string;
}

export function HumorResultView({
  typeDetail,
  familyCode,
  axisInsights,
  familyTagline,
}: HumorResultViewProps) {
  const orderedInsights = useMemo(
    () =>
      axisInsights
        .slice()
        .sort((a, b) => a.label.localeCompare(b.label, "en", { sensitivity: "base" })),
    [axisInsights]
  );

  return (
    <section className={styles.container}>
      <div className={styles.badgeSection}>
        <HumorCharacterBadge code={familyCode} subheadline={familyTagline} />
        <div className={styles.typeSummary}>
          <h2>{typeDetail.title}</h2>
          <p>{typeDetail.catch}</p>
        </div>
      </div>

      <div className="space-y-8">
        <section className={styles.tabPanel}>
          <h3>How you connect laughs</h3>
          <div className="space-y-4 text-base text-slate-700">
            <p>{typeDetail.basicLong}</p>
            <p>{typeDetail.humorLong}</p>
          </div>
          {typeDetail.axesBrief && (
            <div className="space-y-3">
              <h4 className="text-base font-semibold text-slate-800">Your comedic balance</h4>
              <p className="text-sm text-slate-600">{typeDetail.axesBrief}</p>
            </div>
          )}
          <div className={styles.axisGrid}>
            {orderedInsights.map((insight) => (
              <div key={insight.key} className={styles.axisCard}>
                <span>{insight.label}</span>
                <span className="text-sm text-slate-500">{insight.description}</span>
                <div className={styles.axisProgress}>
                  <span
                    className={styles.axisProgressFill}
                    style={{ width: `${Math.max(0, Math.min(100, insight.percent))}%` }}
                  />
                </div>
                <span className="text-sm font-medium text-slate-700">
                  {Math.round(insight.percent)}%
                </span>
              </div>
            ))}
          </div>
        </section>

        {typeDetail.scenes.length > 0 && (
          <section className={styles.tabPanel}>
            <h3>Where your humor shines</h3>
            <div className="space-y-4">
              {typeDetail.scenes.map((scene) => (
                <article
                  key={scene.label}
                  className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
                >
                  <h4 className="text-lg font-semibold text-slate-900">{scene.label}</h4>
                  <p className="mt-2 text-sm text-slate-600">{scene.description}</p>
                  <p className="mt-3 text-sm italic text-slate-500">“{scene.example}”</p>
                </article>
              ))}
            </div>
          </section>
        )}

        {typeDetail.compatibility.length > 0 && (
          <section className={styles.tabPanel}>
            <h3>Your comedic chemistry</h3>
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
                    className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
                  >
                    <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                      <div className="flex flex-col sm:flex-row sm:items-baseline sm:gap-2">
                        {compatibilityLabel && (
                          <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                            {compatibilityLabel}
                          </span>
                        )}
                        <h4 className="text-lg font-semibold text-slate-900">
                          {match.title}{" "}
                          <span className="text-sm font-normal text-slate-500">({match.code})</span>
                        </h4>
                      </div>
                    </div>
                    <p className="mt-2 text-sm text-slate-600">{descriptionText}</p>
                  </article>
                );
              })}
            </div>
          </section>
        )}
      </div>
    </section>
  );
}

export default HumorResultView;
