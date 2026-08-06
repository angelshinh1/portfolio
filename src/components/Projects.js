import { useState } from "react";
import Link from "next/link";
import Reveal from "./Reveal";
import SectionHeader from "./SectionHeader";
import ProjectRow from "./ProjectRow";
import projects from "@/data/projects";

const TEASER_COUNT = 4;

export default function Projects() {
  const [expandedIndex, setExpandedIndex] = useState(null);
  const teaser = projects.slice(0, TEASER_COUNT);

  const toggleExpand = (index) => {
    setExpandedIndex((current) => (current === index ? null : index));
  };

  return (
    <section
      id="projects"
      className="relative max-w-[88vw] lg:max-w-[64rem] mx-auto px-1 py-24 lg:py-28"
    >
      <SectionHeader title="Projects!" className="mb-10 lg:mb-12" />

      <div className="flex flex-col">
        {teaser.map((project, index) => (
          <Reveal key={project.slug} delay={Math.min(index * 0.04, 0.2)}>
            <ProjectRow
              project={project}
              isExpanded={expandedIndex === index}
              onToggle={() => toggleExpand(index)}
              chipBg="var(--bg-surface)"
            />
          </Reveal>
        ))}

        <Link
          href="/projects"
          className="group/all border-t border-[var(--line)] py-6 md:py-7 px-1 md:px-2 flex items-center justify-between transition-colors duration-200 hover:text-[var(--green-deep)]"
        >
          <span className="font-heading text-xl md:text-2xl text-[var(--text-primary)] transition-colors duration-200 group-hover/all:text-[var(--green-deep)]">
            View all {projects.length} projects
          </span>
          <svg
            width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--green-deep)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            className="transition-transform duration-200 group-hover/all:translate-x-1 flex-shrink-0"
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </section>
  );
}
