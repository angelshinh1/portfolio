import Image from "next/image";
import Link from "next/link";
import SectionHeader from "./SectionHeader";
import { Paper, Tape } from "./scrapbook";
import projects from "@/data/projects";

const TEASER_COUNT = 4;

// Each clipping is cut from different stock and stuck down a little crooked.
const CLIPPINGS = [
  { variant: "cream", rotate: 1.2,  seed: 21, tape: "kraft", tapeRotate: -4 },
  { variant: "aged",  rotate: -1.0, seed: 22, tape: "clear", tapeRotate: 3 },
  { variant: "aged",  rotate: -0.8, seed: 23, tape: "clear", tapeRotate: -2 },
  { variant: "cream", rotate: 1.0,  seed: 24, tape: "kraft", tapeRotate: 4 },
];

const IconGithub = (props) => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

const IconLive = (props) => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
);

function Clipping({ project, look, offset }) {
  const caseHref = `/projects/${project.slug}`;

  return (
    <Paper
      as="article"
      variant={look.variant}
      seed={look.seed}
      rotate={look.rotate}
      hover
      className={`group ${offset ? "md:mt-14" : ""}`}
      innerClassName="p-6 md:p-8 h-full"
      decor={<Tape variant={look.tape} rotate={look.tapeRotate} className="-top-3 left-1/2 -translate-x-1/2" />}
    >
      {project.coverImage && (
        <div className="relative aspect-[16/9] mb-6 overflow-hidden bg-[var(--bg-grain)] border-[6px] border-white shadow-[0_1px_3px_rgba(62,44,30,0.18)]" style={{ rotate: "0.8deg" }}>
          <Image
            src={project.coverImage}
            alt=""
            fill
            sizes="(max-width: 768px) 88vw, 460px"
            className="object-cover"
          />
        </div>
      )}

      <p className="font-type text-[0.68rem] uppercase tracking-[0.16em] text-[var(--ink-sepia)]">
        {project.category}
      </p>

      <h3 className="type-row mt-2 text-[var(--text-primary)]">
        {/* Stretched link — the whole clipping opens the case study */}
        <Link href={caseHref} className="highlight-swipe after:absolute after:inset-0 after:content-['']">
          {project.title}
        </Link>
      </h3>
      <p className="mt-1 font-body text-[1.05rem] text-[var(--text-secondary)]">{project.subtitle}</p>

      <p className="mt-4 font-body type-small text-[var(--text-muted)] line-clamp-3">
        {project.description}
      </p>

      <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="Built with">
        {project.technologies.slice(0, 4).map((tech) => (
          <li
            key={tech}
            className="font-type text-[0.64rem] px-2 py-1 bg-[rgba(255,255,255,0.55)] text-[var(--ink-brown)] border border-dashed border-[rgba(62,44,30,0.28)]"
          >
            {tech}
          </li>
        ))}
      </ul>

      <div className="mt-6 flex items-center flex-wrap gap-x-5 gap-y-2">
        <span className="font-hand text-[1.45rem] leading-none text-[var(--green-deep)]">
          read the story &rarr;
        </span>
        {/* Raised above the stretched link so they stay clickable */}
        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="press relative z-10 inline-flex items-center gap-1.5 font-mono text-[0.72rem] text-[var(--text-secondary)] transition-colors duration-200 hover:text-[var(--green-deep)]"
          >
            <IconGithub /> Code
          </a>
        )}
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="press relative z-10 inline-flex items-center gap-1.5 font-mono text-[0.72rem] text-[var(--text-secondary)] transition-colors duration-200 hover:text-[var(--green-deep)]"
          >
            <IconLive /> Live
          </a>
        )}
      </div>
    </Paper>
  );
}

export default function Projects() {
  const teaser = projects.slice(0, TEASER_COUNT);

  return (
    <section
      id="projects"
      className="relative max-w-[88vw] lg:max-w-[66rem] mx-auto px-1 py-24 lg:py-28"
    >
      <SectionHeader title="Projects!" className="mb-14 lg:mb-16" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 lg:gap-x-14 gap-y-14 items-start">
        {teaser.map((project, index) => (
          <Clipping
            key={project.slug}
            project={project}
            look={CLIPPINGS[index % CLIPPINGS.length]}
            offset={index % 2 === 1}
          />
        ))}
      </div>

      <div className="mt-20 flex justify-center">
        <Link href="/projects" className="press ticket group/all" style={{ rotate: "-1.5deg" }}>
          <span className="font-body font-semibold text-[0.95rem] px-8 py-4 flex items-center gap-2 transition-colors duration-200 group-hover/all:text-[var(--green-deep)]">
            View all {projects.length} projects
            <svg
              width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
              aria-hidden
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </span>
        </Link>
      </div>
    </section>
  );
}
