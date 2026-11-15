# ashinh.lol

My portfolio: a scrapbook-style site with project case studies, a blog and a few toys.
Live at [www.ashinh.lol](https://www.ashinh.lol).

Built with Next.js, Tailwind, GSAP and Framer Motion.

## Run it

```bash
npm install
npm run dev     # http://localhost:3000
```

## Where things live

| Path | What |
| --- | --- |
| `src/data/` | Projects and experience. Edit these to change the content. |
| `posts/` | Blog posts in Markdown |
| `public/projects/` | Project covers, stickers and screenshots |
| `mcp/server.mjs` | An MCP server that hands the same data to Claude |

## MCP

`npm run mcp` starts a stdio MCP server with tools for my profile, projects, experience, resume and posts.
Add it to Claude Code with:

```bash
claude mcp add -s user angel-portfolio -- node --disable-warning=MODULE_TYPELESS_PACKAGE_JSON /path/to/portfolio/mcp/server.mjs
```
