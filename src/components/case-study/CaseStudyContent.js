import Image from "next/image";
import ArchitectureDiagram from "./ArchitectureDiagram";
import { CutLine } from "../scrapbook";

// Prints alternate their tilt so a gallery reads as photos stuck down by hand
const PRINT_TILT = [-1.2, 1, 0.8, -1];

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
                className="absolute left-0 top-[0.55em] w-[8px] h-[8px] rounded-full border-[1.5px] border-[var(--ink-sepia)]"
                aria-hidden="true"
              />
              {item}
            </li>
          ))}
        </ul>
      );

    case "quote":
      return (
        <blockquote className="border-l-2 border-dashed pl-6 py-1 my-2 max-w-[56ch]" style={{ borderColor: "var(--ink-sepia)" }}>
          <p className="font-hand text-[1.7rem] lg:text-[2rem] leading-[1.3] text-[var(--ink-brown)]">
            {block.text}
          </p>
        </blockquote>
      );

    case "stats":
      return (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-6 py-7 border-y-2 border-dashed border-[rgba(62,44,30,0.22)]">
          {block.items.map((s, i) => (
            <div key={i}>
              <div
                className="font-heading text-3xl lg:text-4xl text-[var(--green-deep)]"
                style={{ letterSpacing: "-0.02em", lineHeight: 1.1 }}
              >
                {s.value}
              </div>
              <div className="font-type text-[0.72rem] tracking-[0.02em] text-[var(--ink-sepia)] mt-2 leading-snug">
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
      // Wide screenshots stay wide; photos crop to portrait
      const wide = project.galleryAspect === "wide";
      return (
        <div className={`grid grid-cols-1 gap-8 lg:gap-10 py-4 ${wide ? "" : "sm:grid-cols-2"}`}>
          {project.images.map((img, i) => (
            <figure
              key={i}
              className="scrap bg-white p-2 sm:p-2.5"
              style={{ "--r": `${PRINT_TILT[i % PRINT_TILT.length] * (wide ? 0.5 : 1)}deg` }}
            >
              <div
                className={`relative w-full overflow-hidden ${
                  wide ? "aspect-[16/10]" : "aspect-[4/5]"
                }`}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className={`object-cover ${wide ? "object-top" : ""}`}
                  sizes={wide ? "(max-width: 760px) 100vw, 760px" : "(max-width: 640px) 100vw, 50vw"}
                />
              </div>
            </figure>
          ))}
        </div>
      );
    }

    case "divider":
      return <CutLine className="py-4" />;

    default:
      return null;
  }
}
