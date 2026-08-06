import Link from "next/link";

const IconGithub = (props) => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

const IconLive = (props) => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
);

const IconArrow = (props) => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

function ExpandedDetails({ project, chipBg }) {
  return (
    <>
      <div className="mb-5 h-px w-10" style={{ background: "var(--green-vivid)" }} />

      <p className="font-body text-base text-[var(--text-secondary)] leading-relaxed max-w-[56ch]">
        {project.description}
      </p>

      <div className="mt-5 flex flex-wrap gap-1.5">
        {project.technologies.map((tech) => (
          <span
            key={tech}
            className="font-mono text-[0.63rem] px-2.5 py-[0.3rem] text-[var(--text-secondary)] tracking-tight"
            style={{ background: chipBg, borderRadius: "3px" }}
          >
            {tech}
          </span>
        ))}
      </div>

      <div className="mt-6 flex items-center flex-wrap gap-x-5 gap-y-2">
        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 font-mono text-[0.7rem] tracking-tight text-[var(--green-deep)] transition-colors duration-200 hover:text-[var(--text-primary)]"
          >
            <IconGithub /> Code
          </a>
        )}
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 font-mono text-[0.7rem] tracking-tight text-[var(--green-deep)] transition-colors duration-200 hover:text-[var(--text-primary)]"
          >
            <IconLive /> Live demo
          </a>
        )}
        <Link
          href={`/projects/${project.slug}`}
          className="inline-flex items-center gap-1.5 font-mono text-[0.7rem] tracking-tight text-[var(--text-primary)] transition-colors duration-200 hover:text-[var(--green-deep)]"
        >
          Read case study <IconArrow />
        </Link>
      </div>
    </>
  );
}

// Shared accordion unit for a project — used on the homepage teaser grid
// (variant="card") and the full /projects listing (variant="list").
export default function ProjectRow({ project, isExpanded, onToggle, onHoverStart, chipBg = "var(--bg-surface)", variant = "list" }) {
  if (variant === "card") {
    return (
      <div
        className="group/row rounded-lg border border-[var(--line)] bg-[var(--bg-surface)] h-full flex flex-col transition-shadow duration-300 hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)]"
        onMouseEnter={onHoverStart}
      >
        <button
          onClick={onToggle}
          className="w-full text-left cursor-pointer flex-1 flex flex-col p-6"
          aria-expanded={isExpanded}
        >
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <h3 className="font-heading text-xl md:text-2xl leading-snug text-[var(--text-primary)] transition-colors duration-200 group-hover/row:text-[var(--green-deep)]">
                {project.title}
              </h3>
              <p
                className="mt-1"
                style={{
                  fontFamily: "'Manrope', sans-serif",
                  fontWeight: 400,
                  fontSize: "1.15rem",
                  color: "var(--text-secondary)",
                }}
              >
                {project.subtitle}
              </p>
            </div>
            <span
              className="font-heading text-2xl leading-none select-none transition-all duration-300 flex-shrink-0"
              style={{
                color: "var(--green-deep)",
                opacity: isExpanded ? 1 : 0.45,
                transform: isExpanded ? "rotate(45deg)" : "rotate(0deg)",
                display: "inline-block",
              }}
            >
              +
            </span>
          </div>

          <p className="font-mono text-[0.68rem] text-[var(--text-secondary)] mt-3 tracking-tight opacity-70">
            {project.category}
          </p>
        </button>

        <div
          className="grid"
          style={{
            gridTemplateRows: isExpanded ? "1fr" : "0fr",
            opacity: isExpanded ? 1 : 0,
            transition: "grid-template-rows 350ms cubic-bezier(0.23,1,0.32,1), opacity 300ms ease",
          }}
        >
          <div className="overflow-hidden">
            <div className="px-6 pb-6">
              <ExpandedDetails project={project} chipBg={chipBg} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="border-t border-[var(--line)]"
      onMouseEnter={onHoverStart}
    >
      <button
        onClick={onToggle}
        onFocus={onHoverStart}
        className="w-full text-left cursor-pointer group/row py-6 md:py-7 px-1 md:px-2"
        aria-expanded={isExpanded}
      >
        <div className="flex items-start justify-between gap-4 md:gap-8">
          <div className="min-w-0">
            <h3 className="font-heading text-xl md:text-2xl leading-snug text-[var(--text-primary)] transition-colors duration-200 group-hover/row:text-[var(--green-deep)]">
              {project.title}
            </h3>
            <p
              className="mt-1"
              style={{
                fontFamily: "'Manrope', sans-serif",
                fontWeight: 400,
                fontSize: "1.15rem",
                color: "var(--text-secondary)",
              }}
            >
              {project.subtitle}
            </p>
          </div>

          <div className="flex-shrink-0 flex items-center gap-3 md:gap-4 mt-0.5">
            <span className="font-mono text-[0.72rem] text-[var(--text-secondary)] whitespace-nowrap tracking-tight hidden sm:block opacity-80">
              {project.category}
            </span>
            <span
              className="font-heading text-2xl leading-none select-none transition-all duration-300"
              style={{
                color: "var(--green-deep)",
                opacity: isExpanded ? 1 : 0.45,
                transform: isExpanded ? "rotate(45deg)" : "rotate(0deg)",
                display: "inline-block",
              }}
            >
              +
            </span>
          </div>
        </div>

        <p className="sm:hidden font-mono text-[0.7rem] text-[var(--text-secondary)] mt-1.5 tracking-tight opacity-80">
          {project.category}
        </p>
      </button>

      <div
        className="grid"
        style={{
          gridTemplateRows: isExpanded ? "1fr" : "0fr",
          opacity: isExpanded ? 1 : 0,
          transition: "grid-template-rows 350ms cubic-bezier(0.23,1,0.32,1), opacity 300ms ease",
        }}
      >
        <div className="overflow-hidden">
          <div className="px-1 md:px-2 pb-8 md:pb-9">
            <ExpandedDetails project={project} chipBg={chipBg} />
          </div>
        </div>
      </div>
    </div>
  );
}
