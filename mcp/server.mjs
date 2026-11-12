#!/usr/bin/env node
// Portfolio MCP server (stdio): exposes the same data the site renders.
import path from "node:path";
import { fileURLToPath } from "node:url";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

// posts.js resolves posts/ from cwd, and Claude launches us from anywhere
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
process.chdir(ROOT);

const { default: projects, getProjectBySlug } = await import("../src/data/projects.js");
const { default: experiencesData } = await import("../src/data/experience.js");
const { getSortedPostsData, getPostData } = await import("../src/lib/posts.js");
const { RESUME_URL } = await import("../src/lib/resume.js");

const SITE = "https://www.ashinh.lol"; // mirrors SITE_URL in src/components/Seo.js

const PROFILE = {
  name: "Angel Shinh",
  headline: "Software Engineer",
  location: "Toronto, Canada",
  intro:
    "Software engineer based in Toronto, with more than a year of hands-on experience building real-world software. Outside of code, usually behind a camera or a guitar.",
  education: "Seneca Polytechnic — Computer Programming & Analysis",
  links: {
    website: SITE,
    github: "https://github.com/angelshinh1",
    linkedin: "https://www.linkedin.com/in/angelshinh/",
    email: "shinh.maverick@gmail.com",
    resume: SITE + RESUME_URL,
  },
};

const text = (s) => ({ content: [{ type: "text", text: s }] });

function experienceMarkdown() {
  return Object.values(experiencesData)
    .flatMap((c) => c.roles.map((r) => `- **${r.title}**, ${c.company} (${r.period}) — ${r.summary}`))
    .join("\n");
}

function projectSummary(p) {
  return `- **${p.title}** (\`${p.slug}\`, ${p.year}) — ${p.subtitle}. ${p.category}. Stack: ${p.technologies.join(", ")}.`;
}

function blockMarkdown(b) {
  switch (b.type) {
    case "lead":
    case "paragraph":
      return b.text;
    case "heading":
      return `## ${b.text}`;
    case "quote":
      return `> ${b.text}`;
    case "list":
      return b.items.map((i) => `- ${i}`).join("\n");
    case "stats":
      return b.items.map((s) => `- **${s.value}** ${s.label}`).join("\n");
    case "diagram":
      return b.caption ? `_Diagram: ${b.caption}_` : "";
    default:
      return "";
  }
}

function projectMarkdown(p) {
  const meta = [
    `# ${p.title} — ${p.subtitle}`,
    `Year: ${p.year} · Role: ${p.role} · Team: ${p.team} · Category: ${p.category}`,
    `Stack: ${p.technologies.join(", ")}`,
    `Case study: ${SITE}/projects/${p.slug}`,
    p.githubUrl && `Code: ${p.githubUrl}`,
    p.liveUrl && `Live: ${p.liveUrl}`,
    p.privateNote && `Note: ${p.privateNote}`,
    "",
    p.description,
  ];
  return [...meta, "", ...p.content.map(blockMarkdown).filter(Boolean)].filter((l) => l !== false && l != null).join("\n\n");
}

let resumeCache;
async function resumeText() {
  if (resumeCache) return resumeCache;
  const { getDocument } = await import("pdfjs-dist/legacy/build/pdf.mjs");
  const data = new Uint8Array(await (await import("node:fs/promises")).readFile(path.join(ROOT, "public", RESUME_URL)));
  const doc = await getDocument({ data, verbosity: 0 }).promise;
  const pages = [];
  for (let i = 1; i <= doc.numPages; i++) {
    const { items } = await (await doc.getPage(i)).getTextContent();
    pages.push(items.map((it) => it.str + (it.hasEOL ? "\n" : "")).join(""));
  }
  return (resumeCache = pages.join("\n\n").replace(/[ \t]+\n/g, "\n").trim());
}

const server = new McpServer({ name: "angel-portfolio", version: "1.0.0" });

server.registerTool(
  "get_profile",
  {
    title: "Profile overview",
    description:
      "Who Angel Shinh is: headline, intro, links, every role from the Experience section, and a one-line summary of every project. Start here for context about Angel.",
  },
  async () =>
    text(
      [
        `# ${PROFILE.name} — ${PROFILE.headline}`,
        `${PROFILE.location} · ${PROFILE.education}`,
        PROFILE.intro,
        "## Links",
        Object.entries(PROFILE.links).map(([k, v]) => `- ${k}: ${v}`).join("\n"),
        "## Experience",
        experienceMarkdown(),
        "## Projects (use get_project for the full case study)",
        projects.map(projectSummary).join("\n"),
      ].join("\n\n")
    )
);

server.registerTool(
  "list_projects",
  {
    title: "List projects",
    description: "Every portfolio project with slug, year, category and stack. Optionally filter by a technology or keyword.",
    inputSchema: { filter: z.string().optional().describe("Case-insensitive keyword matched against title, category, description and stack") },
  },
  async ({ filter }) => {
    const q = filter?.toLowerCase();
    const hits = q
      ? projects.filter((p) =>
          [p.title, p.subtitle, p.category, p.description, ...p.technologies].join(" ").toLowerCase().includes(q)
        )
      : projects;
    return text(hits.length ? hits.map(projectSummary).join("\n") : `No projects match "${filter}".`);
  }
);

server.registerTool(
  "get_project",
  {
    title: "Project case study",
    description: "The full written case study for one project, as Markdown.",
    inputSchema: { slug: z.string().describe("Project slug from list_projects, e.g. devflow") },
  },
  async ({ slug }) => {
    const p = getProjectBySlug(slug);
    if (!p) return { ...text(`Unknown project "${slug}". Known: ${projects.map((x) => x.slug).join(", ")}`), isError: true };
    return text(projectMarkdown(p));
  }
);

server.registerTool(
  "get_experience",
  { title: "Work experience", description: "Every role Angel has held, with dates and a one-line summary." },
  async () => text(experienceMarkdown())
);

server.registerTool(
  "get_resume",
  { title: "Resume", description: "The full text of Angel's current resume PDF." },
  async () => text(await resumeText())
);

server.registerTool(
  "list_posts",
  { title: "List blog posts", description: "Published blog posts with slug, date and description." },
  async () =>
    text(getSortedPostsData().map((p) => `- **${p.title}** (\`${p.slug}\`, ${p.date}) — ${p.description}`).join("\n"))
);

server.registerTool(
  "get_post",
  {
    title: "Blog post",
    description: "The full Markdown body of one blog post.",
    inputSchema: { slug: z.string().describe("Post slug from list_posts") },
  },
  async ({ slug }) => {
    try {
      const p = await getPostData(slug);
      return text(`# ${p.title}\n\n${p.date}\n\n${p.content}`);
    } catch (e) {
      return { ...text(e.message), isError: true };
    }
  }
);

await server.connect(new StdioServerTransport());
