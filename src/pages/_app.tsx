// pages/_app.tsx
import "@/styles/globals.css";
import Head from "next/head";
import type { AppProps } from "next/app";
import type { NextPage } from "next";
import Script from "next/script";

export type NextPageWithLayout = NextPage & {
  getLayout?: (page: React.ReactElement) => React.ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);
  const siteName = "Worldwide Short News";

  return (
    <>
      {/* Global SEO Tags */}
      <Head>
        {/* Primary Meta */}
        <title>{siteName} | Latest Global Headlines</title>
        <meta
          name="description"
          content="Worldwide Short News – Quick & short global breaking news, business insights, market trends and updates."
        />
        <meta
          name="keywords"
          content="news, worldwide news, global news, short news, business news, market news, breaking headlines"
        />
        <meta name="robots" content="index, follow" />
        <meta name="author" content={siteName} />
        <link rel="canonical" href="https://worldwideshortnews.com/" />

        {/* Open Graph */}
        <meta property="og:title" content={siteName} />
        <meta property="og:description" content="Quick and short worldwide news updates and trending global stories." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://worldwideshortnews.com/" />
        <meta property="og:site_name" content={siteName} />
        <meta property="og:image" content="https://worldwideshortnews.com/world-news.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content={siteName} />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={siteName} />
        <meta name="twitter:description" content="Quick and short worldwide news updates and trending global stories." />
        <meta name="twitter:image" content="https://worldwideshortnews.com/world-news.png" />
        <meta name="twitter:image:alt" content={siteName} />
      </Head>

      {process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_CLIENT_ID && (
        <Script
          async
          crossOrigin="anonymous"
          strategy="afterInteractive"
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_CLIENT_ID}`}
        />
      )}
      {getLayout(<Component {...pageProps} />)}
    </>
  );
}
