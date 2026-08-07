import projects from "@/data/projects";
import { getAllPostSlugs } from "@/lib/posts";
import { SITE_URL } from "@/components/Seo";

function generateSitemap(urls) {
  const body = urls
    .map(
      (url) => `  <url>
    <loc>${SITE_URL}${url}</loc>
  </url>`
    )
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${body}
</urlset>`;
}

export async function getServerSideProps({ res }) {
  const urls = [
    "/",
    "/projects",
    ...projects.map((p) => `/projects/${p.slug}`),
    "/blog",
    ...getAllPostSlugs().map((p) => `/blog/${p.params.slug}`),
  ];

  res.setHeader("Content-Type", "application/xml");
  res.write(generateSitemap(urls));
  res.end();

  return { props: {} };
}

export default function Sitemap() {
  return null;
}
