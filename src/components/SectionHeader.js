import Reveal from "./Reveal";

export default function SectionHeader({ title, intro, align = "left", className = "" }) {
  const isCenter = align === "center";
  return (
    <Reveal className={`${className} ${isCenter ? "text-center" : "text-left"}`}>
      <h2 className="type-title text-[var(--text-primary)]">{title}</h2>

      {intro && (
        <p
          className={`font-body type-lead mt-5 text-[var(--text-secondary)] max-w-[42ch] ${
            isCenter ? "mx-auto" : ""
          }`}
        >
          {intro}
        </p>
      )}
    </Reveal>
  );
}
