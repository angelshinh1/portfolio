import Image from "next/image";
import ArchitectureDiagram from "./ArchitectureDiagram";

export default function CaseStudyContent({ project }) {
  return (
    <div className="space-y-7 lg:space-y-8">
      {project.content.map((block, i) => (
        <Block key={i} block={block} project={project} />
      ))}
    </div>
  );
}

function Block({ block, project }) {
  switch (block.type) {
    case "lead":
      return (
        <p
          className="font-body text-xl lg:text-[1.45rem] text-[var(--text-primary)] max-w-[62ch]"
          style={{ lineHeight: 1.55, letterSpacing: "-0.008em" }}
        >
          {block.text}
        </p>
      );

    case "heading":
      return (
        <h2 className="type-heading text-[var(--text-primary)] pt-2">
          {block.text}
        </h2>
      );

    case "paragraph":
      return (
        <p className="font-body text-[1.05rem] lg:text-[1.15rem] leading-[1.75] text-[var(--text-secondary)] max-w-[68ch]">
          {block.text}
        </p>
      );

    case "list":
      return (
        <ul className="space-y-3 max-w-[68ch]">
          {block.items.map((item, i) => (
            <li
              key={i}
              className="font-body text-[1.05rem] lg:text-[1.1rem] leading-[1.65] text-[var(--text-secondary)] pl-6 relative"
            >
              <span
                className="absolute left-0 top-[0.6em] w-[7px] h-[7px] rounded-full"
                style={{ background: "var(--green-vivid)" }}
                aria-hidden="true"
              />
              {item}
            </li>
          ))}
        </ul>
      );

    case "quote":
      return (
        <blockquote className="border-l-2 pl-6 py-1 my-2 max-w-[56ch]" style={{ borderColor: "var(--green-muted)" }}>
          <p className="font-body italic text-xl lg:text-2xl leading-[1.5] text-[var(--text-primary)]">
            {block.text}
          </p>
        </blockquote>
      );

    case "stats":
      return (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-6 py-7 border-y border-[var(--line)]">
          {block.items.map((s, i) => (
            <div key={i}>
              <div
                className="font-heading text-3xl lg:text-4xl text-[var(--green-deep)]"
                style={{ letterSpacing: "-0.02em", lineHeight: 1.1 }}
              >
                {s.value}
              </div>
              <div className="font-mono text-[0.68rem] text-[var(--text-muted)] mt-1.5 leading-snug tracking-tight">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      );

    case "diagram":
      return <ArchitectureDiagram id={block.id} caption={block.caption} />;

    case "gallery": {
      if (!project.images?.length) return null;
      // Screenshots are wide and meant to be read; photos crop happily into a
      // portrait tile. The project declares which kind of images it has.
      const wide = project.galleryAspect === "wide";
      return (
        <div className={`grid grid-cols-1 gap-4 lg:gap-6 py-2 ${wide ? "" : "sm:grid-cols-2"}`}>
          {project.images.map((img, i) => (
            <figure key={i} className="group">
              <div
                className={`relative w-full overflow-hidden rounded-xl border border-[var(--mat-edge)] ${
                  wide ? "aspect-[16/10]" : "aspect-[4/5]"
                }`}
                style={{ boxShadow: "var(--lift-2)" }}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className={`object-cover transition-transform duration-500 ease-[var(--spring)] group-hover:scale-[1.04] ${wide ? "object-top" : ""}`}
                  sizes={wide ? "(max-width: 760px) 100vw, 760px" : "(max-width: 640px) 100vw, 50vw"}
                />
              </div>
            </figure>
          ))}
        </div>
      );
    }

    case "divider":
      return <div className="ornament-divider">✦ ❧ ✦</div>;

    default:
      return null;
  }
}
