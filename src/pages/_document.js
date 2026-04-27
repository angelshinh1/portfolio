import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta name="description" content="Portfolio of Angel Shinh - Versatile Software Engineer with expertise in Python, C++, and JavaScript." />
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
        <link href="https://fonts.googleapis.com/css2?family=Bitcount+Single+Ink:wght@100..900&family=Jost:ital,wght@0,100..900;1,100..900&family=Outfit:wght@100..900&display=swap" rel="stylesheet" />
      </Head>
      <body className="font-sans text-[#FFE7A5] antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
