import { useState } from "react";
import Reveal from "@/components/Reveal";
import Breadcrumbs from "@/components/Breadcrumbs";
import ProjectRow from "@/components/ProjectRow";
import ProjectPreview from "@/components/ProjectPreview";
import Seo from "@/components/Seo";
import { Paper } from "@/components/scrapbook";
import projects from "@/data/projects";

export default function ProjectsIndex() {
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [hoveredIndex, setHoveredIndex] = useState(0);

  const toggleExpand = (index) => {
    setExpandedIndex((current) => (current === index ? null : index));
  };

  const previewProject = projects[hoveredIndex];

  return (
    <>
      <Seo
        title="Projects | Angel Shinh"
        description="Everything I've built — from an event scavenger hunt to a from-scratch ray tracer."
        path="/projects"
      />

      <header className="section-green pt-32 pb-14 lg:pt-36 lg:pb-16">
        <div className="max-w-[88vw] lg:max-w-[64rem] mx-auto px-1">
          <Reveal>
            <Breadcrumbs
              items={[{ label: "Angel", href: "/" }, { label: "Projects" }]}
              className="mb-8"
            />

            <h1 className="type-title text-[var(--text-primary)]">
              All projects
            </h1>
            <p className="font-body type-lead text-[var(--text-secondary)] mt-5 max-w-[52ch]">
              Hover a project to preview it, click to read more, or open the full case study.
            </p>
            <p className="font-hand text-[1.5rem] leading-tight text-[var(--ink-brown)] mt-4" style={{ rotate: "-2deg" }} aria-hidden>
              everything I&apos;ve built, in one place
            </p>
          </Reveal>
        </div>
      </header>

      <section className="section-green">
        <div className="max-w-[88vw] lg:max-w-[72rem] mx-auto px-1 py-16 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-10 lg:gap-14 items-start">
            <Paper
              variant="cream"
              tear={["top", "bottom"]}
              seed={51}
              depth={6}
              rotate={0.4}
              innerClassName="px-4 md:px-8 py-6 md:py-8"
            >
              {projects.map((project, index) => (
                <Reveal key={project.slug} delay={Math.min(index * 0.03, 0.18)}>
                  <ProjectRow
                    project={project}
                    isExpanded={expandedIndex === index}
                    onToggle={() => toggleExpand(index)}
                    onHoverStart={() => setHoveredIndex(index)}
                    chipBg="rgba(255,255,255,0.55)"
                    topBorder={index !== 0}
                  />
                </Reveal>
              ))}
            </Paper>

            <div className="hidden lg:block lg:sticky lg:top-32">
              <ProjectPreview project={previewProject} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
