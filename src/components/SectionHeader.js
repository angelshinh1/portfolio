import Reveal from "./Reveal";

export default function SectionHeader({ title, intro, align = "left", className = "" }) {
  const isCenter = align === "center";
  return (
    <Reveal className={`${className} ${isCenter ? "text-center" : "text-left"}`}>
      <h2 className="font-body text-[2.5rem] leading-[1.05] sm:text-5xl lg:text-[3.5rem] text-[var(--text-primary)] font-semibold">
        <span className="initial">{title[0]}</span>{title.slice(1)}
      </h2>

      {intro && (
        <p
          className={`font-body mt-5 text-base lg:text-lg leading-relaxed text-[var(--text-secondary)] max-w-[42ch] ${
            isCenter ? "mx-auto" : ""
          }`}
        >
          {intro}
        </p>
      )}
    </Reveal>
  );
}
