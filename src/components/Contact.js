import Reveal from "./Reveal";

export default function Contact() {
  return (
    <section
      id="contact"
      className="relative max-w-[88vw] lg:max-w-[64rem] mx-auto px-1 py-28 lg:py-36 text-center"
    >
      <Reveal delay={0.05}>
        <h2 className="font-heading text-[clamp(2.75rem,9vw,6rem)] leading-[0.98] text-[var(--ink)]">
          Let&apos;s{" "}
          <span className="italic">talk</span>.
        </h2>
      </Reveal>

      <Reveal delay={0.1}>
        <p className="font-sans text-lg lg:text-xl text-[var(--ink-2)] max-w-[46ch] mx-auto leading-relaxed mt-8">
          Wanna chat? Shoot me a DM on{" "}
          <a
            href="https://www.linkedin.com/in/angelshinh/"
            target="_blank" rel="noopener noreferrer"
            className="text-[var(--ink)] font-medium underline underline-offset-[6px] decoration-[var(--line-strong)] hover:text-[var(--accent)] hover:decoration-[var(--accent)] transition-colors duration-200"
          >
            LinkedIn
          </a>
          , check out my work on{" "}
          <a
            href="https://github.com/angelshinh1"
            target="_blank" rel="noopener noreferrer"
            className="text-[var(--ink)] font-medium underline underline-offset-[6px] decoration-[var(--line-strong)] hover:text-[var(--accent)] hover:decoration-[var(--accent)] transition-colors duration-200"
          >
            GitHub
          </a>
          , or send me an{" "}
          <a
            href="mailto:shinh.maverick@gmail.com"
            className="text-[var(--ink)] font-medium underline underline-offset-[6px] decoration-[var(--line-strong)] hover:text-[var(--accent)] hover:decoration-[var(--accent)] transition-colors duration-200"
          >
            email
          </a>
          .
        </p>
      </Reveal>

      <Reveal delay={0.15}>
        <a
          href="mailto:shinh.maverick@gmail.com"
          className="group inline-flex items-center gap-2 mt-12 px-7 py-3.5 bg-[var(--ink)] text-[var(--bg)] rounded-lg font-sans font-medium text-sm tracking-tight transition-[transform,opacity] duration-200 ease-[var(--ease-out)] hover:opacity-90 active:scale-[0.97]"
        >
          Contact
          <span className="transition-transform duration-200 ease-[var(--ease-out)] group-hover:translate-x-0.5">&gt;</span>
        </a>
      </Reveal>
    </section>
  );
}
