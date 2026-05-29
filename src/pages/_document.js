import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta name="description" content="Portfolio of Angel Shinh - software developer blending tech with art. Python, C++, JavaScript, and a guitar." />
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </Head>
      <body className="font-sans grain bg-[#F4F1EB] text-[#20201E] antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
