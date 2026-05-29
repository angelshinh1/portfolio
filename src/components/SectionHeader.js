import Reveal from "./Reveal";

/**
 * Editorial section header: a large display-serif title with an
 * optional lead paragraph held to a comfortable measure.
 */
export default function SectionHeader({ title, intro, align = "left", className = "" }) {
  const isCenter = align === "center";
  return (
    <Reveal className={`${className} ${isCenter ? "text-center" : "text-left"}`}>
      <h2 className="font-heading text-[2.5rem] leading-[1.05] sm:text-5xl lg:text-[3.5rem] text-[var(--ink)]">
        {title}
      </h2>

      {intro && (
        <p
          className={`font-sans mt-5 text-base lg:text-lg leading-relaxed text-[var(--ink-2)] max-w-[42ch] ${
            isCenter ? "mx-auto" : ""
          }`}
        >
          {intro}
        </p>
      )}
    </Reveal>
  );
}
