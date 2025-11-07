// ★ AdSense審査中: Rewarded機能を完全停止（パススルー）
//   将来、GAM + IMA の報酬型を /result/[type]/plus ページで有効化予定。
import { type ReactNode } from "react";

export default function RewardedUnlock({
  children,
  className,
}: {
  unlockKey: string;
  children: ReactNode;
  className?: string;
}) {
  return <div className={className}>{children}</div>;
}
