import Head from "next/head";
import Image from "next/image";
import { getProjectBySlug, getAllProjectSlugs } from "@/data/projects";
import CaseStudyContent from "@/components/case-study/CaseStudyContent";
import CaseReveal from "@/components/case-study/CaseReveal";
import Breadcrumbs from "@/components/Breadcrumbs";

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
      <Head>
        <title>{project.title} | Angel Shinh</title>
        <meta name="description" content={project.description} />
      </Head>

      {/* Hero */}
      <header className="section-base pt-28 pb-16 lg:pt-32 lg:pb-20">
        <div className="max-w-[760px] mx-auto px-6">
          <CaseReveal>
            <Breadcrumbs
              items={[
                { label: "Home", href: "/" },
                { label: "Projects", href: "/projects" },
                { label: project.title },
              ]}
              className="mb-10"
            />
          </CaseReveal>

          <CaseReveal delay={40}>
            <h1 className="font-heading text-[clamp(2.5rem,7vw,4rem)] leading-[1.02] text-[var(--text-primary)]">
              {project.title}
            </h1>

            <p
              className="mt-3"
              style={{
                fontFamily: "'Manrope', sans-serif",
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
                  className="font-mono text-[0.68rem] px-2.5 py-[0.3rem] text-[var(--text-secondary)] tracking-tight"
                  style={{ background: "rgba(255,255,255,0.55)", borderRadius: "3px" }}
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
                <span className="inline-flex items-center gap-1.5 font-mono text-xs text-[var(--text-muted)]">
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
            <div className="max-w-[900px] mx-auto px-6 mt-14">
              <div
                className="relative w-full aspect-[16/10] sm:aspect-[16/9] overflow-hidden rounded-xl group"
                style={{ boxShadow: "0 12px 40px rgba(0,0,0,0.16)" }}
              >
                <Image
                  src={project.coverImage}
                  alt={project.title}
                  fill
                  priority
                  className="object-cover transition-transform duration-700 ease-[var(--ease-out)] group-hover:scale-[1.03]"
                  sizes="(max-width: 900px) 100vw, 900px"
                />
              </div>
            </div>
          </CaseReveal>
        )}
      </header>

      {/* Article body */}
      <article className="section-grain pt-16 pb-20 lg:pt-20 lg:pb-28">
        <div className="max-w-[760px] mx-auto px-6">
          <CaseStudyContent project={project} />
        </div>
      </article>
    </>
  );
}
