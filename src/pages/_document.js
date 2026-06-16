import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta name="description" content="Portfolio of Angel Shinh - software developer blending tech with art. Python, C++, JavaScript, and a guitar." />
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Cormorant Garamond (curly artistic serif) + IM Fell English (ornate initials) + Space Mono */}
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&family=IM+Fell+English:ital@0;1&family=Space+Mono:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body className="font-body antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
