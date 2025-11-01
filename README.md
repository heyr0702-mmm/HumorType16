# HumorType16
HumorType16 – ユーモアタイプ診断（MBTIライク）

## Analytics & Advertising
- Google AdSense is loaded globally via the `<Script id="adsense-script" ...>` tag defined in `pages/_app.tsx` with the AdSense client ID `ca-pub-8802783650388237`.
- Google Analytics 4 (GA4) reads its measurement ID from the `NEXT_PUBLIC_GA_ID` environment variable, which defaults to `G-EV89MLXEXB` in `pages/_app.tsx`.
- Do **not** mix the AdSense client ID (`ca-pub-8802783650388237`) with the GA4 measurement ID (`G-EV89MLXEXB`); each integration must keep its own identifier.
