import Script from "next/script";

export default function AdSenseLoader() {
  return (
    <Script
      async
      src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8802783650388237"
      crossOrigin="anonymous"
      strategy="afterInteractive"
    />
  );
}
