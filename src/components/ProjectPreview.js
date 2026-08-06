import Image from "next/image";
import Link from "next/link";

// Preview shown beside the /projects accordion — swaps content on hover
// (and on keyboard focus, via the same handler in ProjectRow). Plain
// typographic content, no card framing — the column divider does the work
// of separating it from the list. Projects with a real cover photo show it;
// everything else gets built straight from the project's own data.
export default function ProjectPreview({ project }) {
  if (!project) return null;

  return (
    <div key={project.slug} className="preview-fade">
      {project.coverImage && (
        <div className="relative w-full aspect-[4/3] overflow-hidden rounded-lg mb-5">
          <Image
            src={project.coverImage}
            alt={project.title}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 320px"
          />
        </div>
      )}

      <p className="font-mono text-xs text-[var(--text-muted)] uppercase tracking-[0.15em]">
        {project.category}
      </p>

      <h3 className="font-heading text-[2rem] leading-tight text-[var(--text-primary)] mt-2.5">
        {project.title}
      </h3>
      <p
        className="mt-2"
        style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 400, fontSize: "1.3rem", color: "var(--text-secondary)" }}
      >
        {project.subtitle}
      </p>

      <div className="h-px w-8 my-5" style={{ background: "var(--green-vivid)" }} />

      <p className="font-body text-[1.05rem] leading-relaxed text-[var(--text-secondary)]">
        {project.description}
      </p>

      <div className="mt-5 flex flex-wrap gap-2">
        {project.technologies.slice(0, 5).map((tech) => (
          <span
            key={tech}
            className="font-mono text-[0.68rem] px-2.5 py-1 text-[var(--text-secondary)] tracking-tight"
            style={{ background: "var(--bg-surface)", borderRadius: "3px" }}
          >
            {tech}
          </span>
        ))}
      </div>

      <Link
        href={`/projects/${project.slug}`}
        className="mt-6 inline-flex items-center gap-1.5 font-mono text-sm tracking-tight text-[var(--green-deep)] transition-colors duration-200 hover:text-[var(--text-primary)]"
      >
        Read the case study
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </Link>
    </div>
  );
}
