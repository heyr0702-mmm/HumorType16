import { useMemo, useState } from "react";
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

type TabKey = "overview" | "strengths" | "growth" | "moves";

const TAB_LABELS: Record<TabKey, string> = {
  overview: "Overview",
  strengths: "Strengths",
  growth: "Growth Areas",
  moves: "Signature Moves",
};

export function HumorResultView({
  typeDetail,
  familyCode,
  axisInsights,
  familyTagline,
}: HumorResultViewProps) {
  const [activeTab, setActiveTab] = useState<TabKey>("overview");

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
          <h2>{typeDetail.name}</h2>
          <p>{typeDetail.summary}</p>
        </div>
      </div>

      <div className="space-y-5">
        <nav className={styles.tabs} aria-label="Humor result sections" role="tablist">
          {(Object.keys(TAB_LABELS) as TabKey[]).map((tab) => {
            const isActive = activeTab === tab;
            const tabId = `result-tab-${tab}`;
            const panelId = `result-panel-${tab}`;

            return (
              <button
                key={tab}
                type="button"
                id={tabId}
                role="tab"
                aria-selected={isActive}
                aria-controls={panelId}
                className={`${styles.tabButton} ${isActive ? styles.tabButtonActive : ""}`}
                onClick={() => setActiveTab(tab)}
              >
                {TAB_LABELS[tab]}
              </button>
            );
          })}
        </nav>

        {activeTab === "overview" && (
          <div
            id="result-panel-overview"
            role="tabpanel"
            aria-labelledby="result-tab-overview"
            className={styles.tabPanel}
          >
            <h3>How you connect laughs</h3>
            <p>{typeDetail.description}</p>
            <div className={styles.axisGrid}>
              {orderedInsights.map((insight) => (
                <div key={insight.key} className={styles.axisCard}>
                  <span>{insight.label}</span>
                  <span className="text-sm text-slate-500 dark:text-slate-300">{insight.description}</span>
                  <div className={styles.axisProgress}>
                    <span
                      className={styles.axisProgressFill}
                      style={{ width: `${Math.max(0, Math.min(100, insight.percent))}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-200">
                    {Math.round(insight.percent)}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "strengths" && (
          <div
            id="result-panel-strengths"
            role="tabpanel"
            aria-labelledby="result-tab-strengths"
            className={styles.tabPanel}
          >
            <h3>Signature strengths</h3>
            <ul>
              {(typeDetail.strengths ?? []).map((strength) => (
                <li key={strength}>{strength}</li>
              ))}
            </ul>
          </div>
        )}

        {activeTab === "growth" && (
          <div
            id="result-panel-growth"
            role="tabpanel"
            aria-labelledby="result-tab-growth"
            className={styles.tabPanel}
          >
            <h3>Growth opportunities</h3>
            <ul>
              {(typeDetail.growthAreas ?? []).map((area) => (
                <li key={area}>{area}</li>
              ))}
            </ul>
          </div>
        )}

        {activeTab === "moves" && (
          <div
            id="result-panel-moves"
            role="tabpanel"
            aria-labelledby="result-tab-moves"
            className={styles.tabPanel}
          >
            <h3>Signature moves</h3>
            <ul>
              {(typeDetail.signatureMoves ?? []).map((move) => (
                <li key={move}>{move}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}

export default HumorResultView;
