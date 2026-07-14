import Link from "next/link";
import Reveal from "./Reveal";
import SectionHeader from "./SectionHeader";
import projects from "@/data/projects";

export default function Projects() {
  return (
    <section
      id="projects"
      className="relative max-w-[88vw] lg:max-w-[72rem] mx-auto px-1 py-24 lg:py-28"
    >
      <SectionHeader title="Projects!" className="mb-14 lg:mb-16" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6">
        {projects.map((project, idx) => (
          <Reveal key={project.slug} delay={Math.min(idx * 0.06, 0.24)} className="flex">
            <ProjectCard project={project} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function ProjectCard({ project }) {
  return (
    <div className="group relative string-border h-full w-full flex flex-col bg-[var(--bg-surface)] border border-[var(--line)] overflow-hidden transition-[box-shadow] duration-300 ease-[var(--ease-out)] hover:shadow-[0_8px_28px_rgba(0,0,0,0.10)]" style={{ borderRadius: "6px" }}>
      {/* Fretboard dot markers */}
      <div className="absolute top-3 left-3 flex gap-1.5 z-10" aria-hidden="true">
        {[0, 1, 2].map(i => (
          <svg key={i} width="7" height="7" viewBox="0 0 7 7">
            <circle cx="3.5" cy="3.5" r="3"
              fill={i === 1 ? 'var(--green-muted)' : 'transparent'}
              stroke="var(--green-muted)" strokeWidth="1" opacity={0.55} />
          </svg>
        ))}
      </div>

      <div className="flex flex-col flex-1 p-7">
        {/* Title — stretched link to the case study */}
        <h3 className="font-heading text-[1.6rem] leading-[1.1] text-[var(--text-primary)] transition-colors duration-300 group-hover:text-[var(--green-deep)]">
          <Link href={`/projects/${project.slug}`} className="static">
            <span className="absolute inset-0 z-[1]" aria-hidden="true" />
            {project.title}
          </Link>
        </h3>

        {/* Subtitle */}
        <p
          className="mt-1.5 mb-4"
          style={{
            fontFamily: "'IM Fell English', Georgia, serif",
            fontStyle: "italic",
            fontSize: "0.9rem",
            color: "var(--green-deep)",
            opacity: 0.75,
          }}
        >
          {project.subtitle}
        </p>

        {/* Thin rule */}
        <div className="h-px mb-4" style={{ background: "var(--line)" }} />

        {/* Description */}
        <p className="font-body text-[0.95rem] leading-relaxed text-[var(--text-secondary)] flex-1">
          {project.description}
        </p>

        {/* Tech tags */}
        <div className="mt-5 flex flex-wrap gap-1.5">
          {project.technologies.map((tech, i) => (
            <span
              key={i}
              className="font-mono text-[0.63rem] px-2.5 py-[0.3rem] text-[var(--text-secondary)] tracking-tight transition-colors duration-200"
              style={{
                background: "var(--green-soft)",
                borderRadius: "3px",
              }}
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="relative z-10 mt-5 pt-4 border-t border-[var(--line)] flex items-center flex-wrap gap-x-5 gap-y-2">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-mono text-[0.7rem] tracking-tight text-[var(--green-deep)] transition-colors duration-200 hover:text-[var(--text-primary)]"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" /></svg>
              Code
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-mono text-[0.7rem] tracking-tight text-[var(--green-deep)] transition-colors duration-200 hover:text-[var(--text-primary)]"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" /></svg>
              Live demo
            </a>
          )}
          <Link
            href={`/projects/${project.slug}`}
            className="inline-flex items-center gap-1.5 font-mono text-[0.7rem] tracking-tight text-[var(--text-primary)] transition-colors duration-200 hover:text-[var(--green-deep)] ml-auto"
          >
            Read case study
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-200 group-hover:translate-x-0.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
