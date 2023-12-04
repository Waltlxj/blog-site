import Head from "next/head";
import { Noto_Serif_HK } from "next/font/google";

import "../styles/globals.css";

// If loading a variable font, you don't need to specify the font weight
const notoHK = Noto_Serif_HK({
  subsets: ["latin"],
});

function MyApp({ Component, pageProps }) {
  return (
    <main>
      <style jsx global>{`
        html {
          font-family: "Baskerville", ${notoHK.style.fontFamily}, serif;
        }
      `}</style>
      <Head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicon/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon/favicon-16x16.png"
        />
        <link rel="manifest" href="/favicon/site.webmanifest" />
        <link
          rel="mask-icon"
          href="/favicon/safari-pinned-tab.svg"
          color="#010101"
        />
        <link rel="shortcut icon" href="/favicon/favicon.ico" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta
          name="msapplication-config"
          content="/favicon/browserconfig.xml"
        />
      </Head>
      <Component {...pageProps} />
    </main>
  );
}

export default MyApp;
