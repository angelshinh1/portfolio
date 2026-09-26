import Image from "next/image";
import { getProjectBySlug, getAllProjectSlugs } from "@/data/projects";
import CaseStudyContent from "@/components/case-study/CaseStudyContent";
import CaseReveal from "@/components/case-study/CaseReveal";
import Breadcrumbs from "@/components/Breadcrumbs";
import Seo, { SITE_URL } from "@/components/Seo";
import { Paper, Tape } from "@/components/scrapbook";

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

      {/* Hero */}
      <header className="section-green pt-28 pb-16 lg:pt-32 lg:pb-20">
        <div className="max-w-[760px] mx-auto px-6">
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

          <CaseReveal delay={40}>
            <h1 className="type-display text-[var(--text-primary)]">
              {project.title}
            </h1>

            <p
              className="mt-3"
              style={{
                fontFamily: "var(--font-sans)",
                fontWeight: 400,
                fontSize: "1.4rem",
                color: "var(--text-secondary)",
              }}
            >
              {project.subtitle}
            </p>

            <p className="font-body text-base text-[var(--text-secondary)] mt-5 max-w-[56ch] leading-relaxed">
              {project.description}
            </p>
          </CaseReveal>

          <CaseReveal delay={80}>
            <div className="mt-7 flex flex-wrap gap-1.5">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="font-type text-[0.66rem] px-2 py-1 text-[var(--ink-brown)] border border-dashed border-[rgba(62,44,30,0.28)] bg-[rgba(255,255,255,0.55)]"
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className="mt-7 flex flex-wrap items-center gap-5">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-solid"
                >
                  View code
                </a>
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn"
                >
                  Live demo
                </a>
              )}
              {project.privateNote && (
                <span className="inline-flex items-center gap-1.5 font-hand text-[1.3rem] leading-none text-[var(--ink-sepia)]">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                  {project.privateNote}
                </span>
              )}
            </div>
          </CaseReveal>
        </div>

        {project.coverImage && (
          <CaseReveal delay={120}>
            <div className="max-w-[900px] mx-auto px-6 mt-16">
              {/* The cover is a print taped into the book */}
              <div className="scrap bg-white p-2 sm:p-3" style={{ "--r": "-0.8deg" }}>
                <Tape variant="kraft" rotate={-4} width={110} className="-top-3 left-1/2 -translate-x-1/2" />
                <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] overflow-hidden">
                <Image
                  src={project.coverImage}
                  alt={project.title}
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 900px) 100vw, 900px"
                />
                </div>
              </div>
            </div>
          </CaseReveal>
        )}
      </header>

      {/* Article body — written up on a journal page */}
      <article className="section-green pt-16 pb-24 lg:pt-20 lg:pb-32">
        <div className="max-w-[860px] mx-auto px-3 sm:px-6">
          <Paper
            variant="cream"
            tear={["top", "bottom"]}
            seed={71}
            depth={7}
            innerClassName="px-5 py-12 sm:px-10 md:px-14 md:py-16"
          >
            <CaseStudyContent project={project} />
          </Paper>
        </div>
      </article>
    </>
  );
}
