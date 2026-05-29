export default function ProjectCard({ project }) {
  return (
    <div className="group relative h-full w-full flex flex-col bg-[var(--surface)] rounded-2xl border border-[var(--line)] p-7 transition-[transform,box-shadow] duration-300 ease-[var(--ease-out)] shadow-[0_1px_3px_rgba(0,0,0,0.04),0_8px_24px_rgba(0,0,0,0.05)] hover:-translate-y-1 hover:shadow-[0_2px_6px_rgba(0,0,0,0.06),0_18px_44px_rgba(0,0,0,0.10)]">
      {/* Title + category */}
      <h3 className="font-heading text-2xl leading-tight text-[var(--ink)] transition-colors duration-300 group-hover:text-[var(--accent)]">
        {project.title}
      </h3>
      <p className="font-mono text-xs text-[var(--ink-3)] mt-2.5 tracking-tight">{project.category}</p>

      {/* Description */}
      <p className="font-sans text-[0.95rem] leading-relaxed text-[var(--ink-2)] mt-4 flex-1">
        {project.description}
      </p>

      {/* Technologies */}
      <div className="mt-6 flex flex-wrap gap-1.5">
        {project.technologies.map((tech, i) => (
          <span
            key={i}
            className="font-mono text-[0.7rem] px-2.5 py-1 rounded-full bg-[var(--bg-2)] text-[var(--ink-2)] tracking-tight"
          >
            {tech}
          </span>
        ))}
      </div>

      {/* Links */}
      <div className="mt-6 pt-5 border-t border-[var(--line)] flex items-center gap-5">
        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group/link inline-flex items-center gap-2 font-mono text-xs tracking-tight text-[var(--ink)] transition-colors duration-200 hover:text-[var(--accent)]"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" /></svg>
            Code
          </a>
        )}
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group/link inline-flex items-center gap-2 font-mono text-xs tracking-tight text-[var(--ink)] transition-colors duration-200 hover:text-[var(--accent)]"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" /></svg>
            Live demo
          </a>
        )}
      </div>
    </div>
  );
}
