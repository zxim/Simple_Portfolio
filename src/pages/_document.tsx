import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta
          name="google-site-verification"
          content="6jtaUiaRpd1H0P9bCa6VSNrOV65nlhuWIgOQhYh2sYk"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Fredoka:wght@700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body className="font-normal break-keep selection:bg-PRIMARY_LIGHT selection:dark:text-BLACK text-BLACK dark:bg-BLACK dark:text-white">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}