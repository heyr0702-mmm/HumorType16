# HumorType16
HumorType16 – ユーモアタイプ診断（MBTIライク）

## Analytics & Advertising
- Google AdSense is loaded globally via the `<Script id="adsense-script" ...>` tag defined in `pages/_app.tsx` with the AdSense client ID `ca-pub-8802783650388237`.
- Google Analytics 4 (GA4) reads its measurement ID from the `NEXT_PUBLIC_GA_ID` environment variable, which defaults to `G-EV89MLXEXB` in `pages/_app.tsx`.
- Do **not** mix the AdSense client ID (`ca-pub-8802783650388237`) with the GA4 measurement ID (`G-EV89MLXEXB`); each integration must keep its own identifier.

### Result-page rewarded unlock flow
- Result pages always surface the “ユーモアの骨格” summary for free, while the detailed “ユーモアの展開パターン” copy is wrapped by `components/RewardedUnlock.tsx` and gated behind a rewarded video experience. 【F:pages/result/[type].tsx†L169-L209】【F:components/RewardedUnlock.tsx†L18-L155】
- Rewarded playback is powered by the Google IMA SDK via `lib/ima.ts`. If `NEXT_PUBLIC_IMA_AD_TAG_URL` is not provided, if the SDK cannot load, or if playback errors occur, the component automatically unlocks the gated content and emits diagnostic GA4 events instead of blocking the user. 【F:components/RewardedUnlock.tsx†L18-L137】【F:lib/ima.ts†L1-L196】
- Deployments must expose a valid `NEXT_PUBLIC_IMA_AD_TAG_URL` environment variable (typically configured from Google Ad Manager) for rewarded ads to run; missing values trigger the graceful-unlock fallback above. 【F:components/RewardedUnlock.tsx†L18-L104】

### AdSense inventory guidelines
- Approved AdSense placements include the `RESULT_TOP` and `RESULT_MID` slots on the diagnosis result page, plus a single footer slot on `/`, `/about`, `/policy`, and `/terms`. No AdSense tags should be embedded inside quiz questions, gate flows, or other interactive funnels. 【F:pages/result/[type].tsx†L124-L210】【F:pages/index.tsx†L62-L64】【F:pages/about.tsx†L3-L23】【F:pages/privacy.tsx†L3-L141】【F:pages/terms.tsx†L3-L114】
- The site’s `ads.txt` file is committed at `public/ads.txt`; update it in tandem with any monetisation changes. 【F:public/ads.txt†L1-L6】

### Rewarded unlock analytics events
- Rewarded video actions emit GA4 events via `window.gtag` under the names `rewarded_unlock_missing_tag`, `rewarded_unlock_start`, `rewarded_unlock_complete`, `rewarded_unlock_error`, and `rewarded_unlock_later`, carrying the unlock key (and error messages when relevant). Use these to monitor unlock attempts, completions, and fallback usage. 【F:components/RewardedUnlock.tsx†L51-L137】
