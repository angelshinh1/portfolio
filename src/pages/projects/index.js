import { useState } from "react";
import Head from "next/head";
import Reveal from "@/components/Reveal";
import Breadcrumbs from "@/components/Breadcrumbs";
import ProjectRow from "@/components/ProjectRow";
import ProjectPreview from "@/components/ProjectPreview";
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
      <Head>
        <title>Projects | Angel Shinh</title>
        <meta name="description" content="Everything I've built — from an event scavenger hunt to a from-scratch ray tracer." />
      </Head>

      <header className="section-base pt-32 pb-14 lg:pt-36 lg:pb-16">
        <div className="max-w-[88vw] lg:max-w-[64rem] mx-auto px-1">
          <Reveal>
            <Breadcrumbs
              items={[{ label: "Home", href: "/" }, { label: "Projects" }]}
              className="mb-8"
            />

            <h1 className="font-heading text-[clamp(2.5rem,6vw,3.75rem)] leading-[1.05] text-[var(--text-primary)]">
              All projects
            </h1>
            <p className="font-body text-base lg:text-lg text-[var(--text-secondary)] mt-4 max-w-[52ch] leading-relaxed">
              Hover a project to preview it, click to read more, or open the full case study.
            </p>
          </Reveal>
        </div>
      </header>

      <section className="section-grain">
        <div className="max-w-[88vw] lg:max-w-[72rem] mx-auto px-1 py-16 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-10 lg:gap-14 items-start">
            <div className="flex flex-col">
              {projects.map((project, index) => (
                <Reveal key={project.slug} delay={Math.min(index * 0.03, 0.18)}>
                  <ProjectRow
                    project={project}
                    isExpanded={expandedIndex === index}
                    onToggle={() => toggleExpand(index)}
                    onHoverStart={() => setHoveredIndex(index)}
                    chipBg="var(--bg-base)"
                  />
                </Reveal>
              ))}
              <div className="border-t border-[var(--line)]" />
            </div>

            <div className="hidden lg:block lg:sticky lg:top-28 lg:border-l lg:border-[var(--line)] lg:pl-10">
              <ProjectPreview project={previewProject} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
