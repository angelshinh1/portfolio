import Image from "next/image";
import { getProjectBySlug, getAllProjectSlugs } from "@/data/projects";
import CaseStudyContent from "@/components/case-study/CaseStudyContent";
import CaseReveal from "@/components/case-study/CaseReveal";
import Breadcrumbs from "@/components/Breadcrumbs";
import Seo, { SITE_URL } from "@/components/Seo";
import { Sticker } from "@/components/scrapbook";

export async function getStaticPaths() {
  return {
    paths: getAllProjectSlugs().map((slug) => ({ params: { slug } })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const project = getProjectBySlug(params.slug);
  if (!project) return { notFound: true };

  return { props: { project } };
}

export default function ProjectCaseStudy({ project }) {
  return (
    <>
      <Seo
        title={`${project.title} | Angel Shinh`}
        description={project.description}
        path={`/projects/${project.slug}`}
        image={project.coverImage ? `${SITE_URL}${project.coverImage}` : undefined}
      />

      {/* Header: story on the left, facts on the right */}
      <header className="section-green pt-28 pb-12 lg:pt-32 lg:pb-16">
        <div className="max-w-[1120px] mx-auto px-6">
          <CaseReveal>
            <Breadcrumbs
              items={[
                { label: "Angel", href: "/" },
                { label: "Projects", href: "/projects" },
                { label: project.title },
              ]}
              className="mb-10"
            />
          </CaseReveal>

          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_280px] gap-10 lg:gap-20 items-start">
            <CaseReveal delay={40}>
              <div className="flex items-start gap-5">
                <h1 className="font-heading text-[var(--text-primary)] min-w-0" style={{ fontSize: "clamp(2.4rem, 5vw, 3.9rem)", lineHeight: 1.05, letterSpacing: "-0.025em" }}>
                  {project.title}
                </h1>
                <Sticker src={project.icon} size={96} rotate={7} className="shrink-0 -mt-2 max-sm:!w-16" />
              </div>
              <p className="font-body mt-4 text-[1.2rem] lg:text-[1.3rem] leading-snug text-[var(--text-secondary)] max-w-[40ch]">
                {project.subtitle}
              </p>
              <p className="font-body mt-5 text-[0.98rem] leading-[1.7] text-[var(--text-muted)] max-w-[58ch]">
                {project.description}
              </p>
              {(project.githubUrl || project.liveUrl) && (
                <div className="mt-7 flex flex-wrap items-center gap-4">
                  {project.githubUrl && (
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="btn btn-solid">
                      View code
                    </a>
                  )}
                  {project.liveUrl && (
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="btn">
                      Live demo
                    </a>
                  )}
                </div>
              )}
            </CaseReveal>

            <CaseReveal delay={80}>
              <dl className="font-body text-[0.92rem]">
                {[
                  ["Year", project.year],
                  ["Role", project.role],
                  ["Team", project.team],
                  ["Category", project.category],
                ].filter(([, v]) => v).map(([label, value]) => (
                  <div key={label} className="py-3 border-t border-[rgba(62,44,30,0.14)]">
                    <dt className="text-[0.78rem] text-[var(--text-muted)]">{label}</dt>
                    <dd className="mt-0.5 text-[var(--text-primary)]">{value}</dd>
                  </div>
                ))}
                <div className="py-3 border-t border-[rgba(62,44,30,0.14)]">
                  <dt className="text-[0.78rem] text-[var(--text-muted)]">Stack</dt>
                  <dd className="mt-1.5 flex flex-wrap gap-1.5">
                    {project.technologies.map((tech) => (
                      <span key={tech} className="text-[0.78rem] px-2 py-0.5 rounded-full text-[var(--ink-brown)] border border-[rgba(62,44,30,0.2)] bg-[rgba(255,255,255,0.5)]">
                        {tech}
                      </span>
                    ))}
                  </dd>
                </div>
                {project.privateNote && (
                  <div className="py-3 border-t border-b border-[rgba(62,44,30,0.14)]">
                    <dt className="text-[0.78rem] text-[var(--text-muted)]">Note</dt>
                    <dd className="mt-0.5 text-[var(--text-secondary)] leading-snug">{project.privateNote}</dd>
                  </div>
                )}
              </dl>
            </CaseReveal>
          </div>

          {project.coverImage && (
            <CaseReveal delay={120}>
              {/* Flat and untilted, so it stays sharp */}
              <div className="relative w-full aspect-[16/10] sm:aspect-[16/8] mt-12 lg:mt-16 overflow-hidden rounded-[20px]">
                <Image
                  src={project.coverImage}
                  alt={project.title}
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 1120px) 100vw, 1120px"
                />
              </div>
            </CaseReveal>
          )}
        </div>
      </header>

      {/* Article: one reading column on the same paper as everything else */}
      <article className="section-green pt-6 pb-24 lg:pt-10 lg:pb-32">
        <div className="max-w-[680px] mx-auto px-6">
          <CaseStudyContent project={project} />
        </div>
      </article>
    </>
  );
}
