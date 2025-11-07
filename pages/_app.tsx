import type { AppProps } from "next/app";
import Script from "next/script";
import "../styles/globals.css";
import SiteNav from "../components/SiteNav";
import SiteFooter from "../components/SiteFooter";

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID || "G-EV89MLXEXB";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      {GA_MEASUREMENT_ID && (
        <>
          <Script
            id="ga4-gtag"
            strategy="afterInteractive"
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          />
          <Script id="ga4-config" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_MEASUREMENT_ID}');
            `}
          </Script>
        </>
      )}
      <SiteNav />
      <main className="mx-auto max-w-5xl px-4 py-6">
        <Component {...pageProps} />
      </main>
      <SiteFooter />
    </>
  );
}
