import Script from "next/script";
import type { AppProps } from "next/app";
import "../styles/globals.css";

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID;

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
      {/**
       * Optional AdSense integration placeholder:
       *
       * <Script
       *   id="adsense-script"
       *   strategy="afterInteractive"
       *   async
       *   src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=YOUR_ADSENSE_CLIENT_ID"
       *   crossOrigin="anonymous"
       * />
       */}
      <Component {...pageProps} />
    </>
  );
}
