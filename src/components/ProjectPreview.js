import Image from "next/image";
import Link from "next/link";
import { Paper, Tape } from "./scrapbook";

// Preview shown beside the /projects accordion — swaps content on hover
// (and on keyboard focus, via the same handler in ProjectRow). It's a scrap
// of paper taped beside the list. Projects with a real cover photo show it,
// white-bordered like a print; everything else is built from the project's
// own data.
export default function ProjectPreview({ project }) {
  if (!project) return null;

  return (
    <Paper
      variant="cream"
      seed={61}
      rotate={1}
      innerClassName="p-6"
      decor={<Tape variant="kraft" rotate={-3} className="-top-3 left-1/2 -translate-x-1/2" />}
    >
    <div key={project.slug} className="preview-fade">
      {project.coverImage && (
        <div className="relative w-full aspect-[4/3] overflow-hidden mb-5 border-[6px] border-white shadow-[0_1px_3px_rgba(62,44,30,0.18)]">
          <Image
            src={project.coverImage}
            alt={project.title}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 320px"
          />
        </div>
      )}

      <p className="font-type text-[0.66rem] text-[var(--ink-sepia)] uppercase tracking-[0.14em]">
        {project.category}
      </p>

      <h3 className="type-heading text-[var(--text-primary)] mt-2.5">
        {project.title}
      </h3>
      <p
        className="mt-2"
        style={{ fontFamily: "var(--font-sans)", fontWeight: 400, fontSize: "1.1rem", color: "var(--text-secondary)" }}
      >
        {project.subtitle}
      </p>

      <p className="font-body type-small text-[var(--text-muted)] mt-4">
        {project.description}
      </p>

      <div className="mt-5 flex flex-wrap gap-2">
        {project.technologies.slice(0, 5).map((tech) => (
          <span
            key={tech}
            className="font-type text-[0.64rem] px-2 py-1 text-[var(--ink-brown)] border border-dashed border-[rgba(62,44,30,0.28)] bg-[rgba(255,255,255,0.55)]"
          >
            {tech}
          </span>
        ))}
      </div>

      <Link
        href={`/projects/${project.slug}`}
        className="press mt-6 inline-block font-hand text-[1.45rem] leading-none text-[var(--green-deep)] transition-colors duration-200 hover:text-[var(--ink-brown)]"
      >
        read the story &rarr;
      </Link>
    </div>
    </Paper>
  );
}
