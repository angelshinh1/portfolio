import Image from "next/image";
import {
  DdpFlowDiagram,
  DdpArchitectureDiagram,
  SimilarityBreakdown,
  DiabetesAccuracyBars,
} from "./Diagrams";

const diagramComponents = {
  "ddp-flow": DdpFlowDiagram,
  "ddp-architecture": DdpArchitectureDiagram,
  "similarity-breakdown": SimilarityBreakdown,
  "diabetes-accuracy": DiabetesAccuracyBars,
};

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
        <p className="font-body text-xl lg:text-[1.45rem] leading-[1.55] text-[var(--text-primary)] max-w-[62ch]">
          {block.text}
        </p>
      );

    case "heading":
      return (
        <h2 className="font-heading text-[1.85rem] lg:text-[2.25rem] leading-[1.15] text-[var(--text-primary)] pt-2">
          <span className="initial">{block.text[0]}</span>
          {block.text.slice(1)}
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
              <div className="font-heading text-3xl lg:text-4xl text-[var(--green-deep)]">{s.value}</div>
              <div className="font-mono text-[0.68rem] text-[var(--text-muted)] mt-1.5 leading-snug tracking-tight">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      );

    case "diagram": {
      const DiagramComponent = diagramComponents[block.variant];
      if (!DiagramComponent) return null;
      return (
        <div className="py-2">
          <DiagramComponent />
        </div>
      );
    }

    case "gallery": {
      if (!project.images?.length) return null;
      return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-5 py-2">
          {project.images.map((img, i) => (
            <figure key={i} className="group">
              <div
                className="relative w-full aspect-[4/5] overflow-hidden rounded-lg"
                style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.10)" }}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover transition-transform duration-500 ease-[var(--ease-out)] group-hover:scale-[1.04]"
                  sizes="(max-width: 640px) 100vw, 50vw"
                />
              </div>
              <figcaption className="font-mono text-[0.7rem] text-[var(--text-muted)] mt-2.5 leading-snug">
                {img.caption}
              </figcaption>
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
