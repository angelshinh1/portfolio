import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import projects, { getProjectBySlug, getAllProjectSlugs } from "@/data/projects";
import CaseStudyContent from "@/components/case-study/CaseStudyContent";
import CaseReveal from "@/components/case-study/CaseReveal";

export async function getStaticPaths() {
  return {
    paths: getAllProjectSlugs().map((slug) => ({ params: { slug } })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const project = getProjectBySlug(params.slug);
  if (!project) return { notFound: true };

  const idx = projects.findIndex((p) => p.slug === params.slug);
  const next = projects[(idx + 1) % projects.length];

  return { props: { project, nextProject: { slug: next.slug, title: next.title, subtitle: next.subtitle } } };
}

export default function ProjectCaseStudy({ project, nextProject }) {
  const wordCount = project.content
    .map((b) => b.text || b.desc || (b.items ? b.items.join(" ") : ""))
    .join(" ")
    .trim()
    .split(/\s+/).length;
  const readingTime = Math.max(1, Math.ceil(wordCount / 200));

  return (
    <>
      <Head>
        <title>{project.title} | Angel Shinh</title>
        <meta name="description" content={project.description} />
      </Head>

      {/* Hero */}
      <header className="section-green pt-28 pb-16 lg:pt-32 lg:pb-20">
        <div className="max-w-[760px] mx-auto px-6">
          <CaseReveal>
            <Link
              href="/#projects"
              className="inline-flex items-center gap-2 font-mono text-xs text-[var(--text-secondary)] hover:text-[var(--green-deep)] transition-colors duration-200 mb-10"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              All projects
            </Link>
          </CaseReveal>

          <CaseReveal delay={40}>
            <p className="font-mono text-xs text-[var(--text-secondary)] uppercase tracking-[0.15em] opacity-80">
              {project.category} · {project.year}
            </p>

            <h1 className="font-heading text-[clamp(2.5rem,7vw,4rem)] leading-[1.02] text-[var(--text-primary)] mt-4">
              <span className="initial">{project.title[0]}</span>
              {project.title.slice(1)}
            </h1>

            <p
              className="mt-3"
              style={{
                fontFamily: "'IM Fell English', Georgia, serif",
                fontStyle: "italic",
                fontSize: "1.15rem",
                color: "var(--green-deep)",
                opacity: 0.85,
              }}
            >
              {project.subtitle}
            </p>

            <p className="font-body text-base text-[var(--text-secondary)] mt-5 max-w-[56ch] leading-relaxed">
              {project.description}
            </p>
          </CaseReveal>

          <CaseReveal delay={80}>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mt-7 font-mono text-xs text-[var(--text-secondary)]">
              <span>{project.role}</span>
              <span className="opacity-40">·</span>
              <span>{project.team}</span>
              <span className="opacity-40">·</span>
              <span>{readingTime} min read</span>
            </div>

            <div className="mt-6 flex flex-wrap gap-1.5">
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
      <article className="section-base pt-16 pb-20 lg:pt-20 lg:pb-28">
        <div className="max-w-[760px] mx-auto px-6">
          <CaseStudyContent project={project} />
        </div>
      </article>

      {/* Next project */}
      <div className="section-grain py-16 lg:py-20">
        <div className="max-w-[760px] mx-auto px-6">
          <CaseReveal>
            <Link
              href={`/projects/${nextProject.slug}`}
              className="group block rounded-xl border border-[var(--line)] bg-[var(--bg-surface)] p-8 lg:p-10 transition-[box-shadow,transform] duration-300 ease-[var(--ease-out)] hover:shadow-[0_8px_28px_rgba(0,0,0,0.10)] hover:-translate-y-0.5"
            >
              <p className="font-mono text-xs text-[var(--text-muted)] uppercase tracking-[0.15em]">Next project</p>
              <div className="flex items-center justify-between gap-6 mt-3">
                <div>
                  <h3 className="font-heading text-2xl lg:text-3xl text-[var(--text-primary)] transition-colors duration-300 group-hover:text-[var(--green-deep)]">
                    {nextProject.title}
                  </h3>
                  <p
                    className="mt-1"
                    style={{ fontFamily: "'IM Fell English', Georgia, serif", fontStyle: "italic", color: "var(--green-deep)", opacity: 0.75 }}
                  >
                    {nextProject.subtitle}
                  </p>
                </div>
                <svg
                  width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                  strokeLinecap="round" strokeLinejoin="round"
                  className="text-[var(--green-deep)] flex-shrink-0 transition-transform duration-300 ease-[var(--ease-out)] group-hover:translate-x-1"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          </CaseReveal>
        </div>
      </div>
    </>
  );
}
