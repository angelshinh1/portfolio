import Head from "next/head";

export const SITE_URL = "https://ashinh.lol";
const SITE_NAME = "Angel Shinh";
const DEFAULT_IMAGE = `${SITE_URL}/profile.jpg`;

export default function Seo({ title, description, path = "", image = DEFAULT_IMAGE }) {
  const url = `${SITE_URL}${path}`;

  return (
    <Head>
      <title>{title}</title>
      {description && <meta name="description" content={description} />}
      <link rel="canonical" href={url} />

      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={title} />
      {description && <meta property="og:description" content={description} />}
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      {description && <meta name="twitter:description" content={description} />}
      <meta name="twitter:image" content={image} />
    </Head>
  );
}
