import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta name="description" content="Portfolio of Angel Shinh - Versatile Software Engineer with expertise in Python, C++, and JavaScript." />
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
        <link href="https://fonts.googleapis.com/css2?family=VT323&display=swap" rel="stylesheet" />
      </Head>
      <body className="font-sans bg-[#FAF9F6] text-[#1E1E1E] antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
