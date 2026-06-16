import Reveal from "./Reveal";

export default function Contact() {
  return (
    <section
      id="contact"
      className="relative max-w-[88vw] lg:max-w-[64rem] mx-auto px-1 py-28 lg:py-36 text-center"
    >
      <Reveal delay={0.05}>
        <h2 className="font-heading text-[clamp(2.75rem,9vw,6rem)] leading-[0.98] text-[var(--text-primary)]">
          <span className="initial">L</span>et&apos;s{" "}
          <em>talk</em>.
        </h2>
      </Reveal>

      <Reveal delay={0.1}>
        <p className="font-body text-lg lg:text-xl text-[var(--text-secondary)] max-w-[46ch] mx-auto leading-relaxed mt-8">
          Wanna chat? Shoot me a DM on{" "}
          <a
            href="https://www.linkedin.com/in/angelshinh/"
            target="_blank" rel="noopener noreferrer"
            className="text-[var(--green-deep)] font-medium underline underline-offset-[6px] decoration-[var(--green-muted)] hover:decoration-[var(--green-vivid)] transition-colors duration-200"
          >
            LinkedIn
          </a>
          , check out my work on{" "}
          <a
            href="https://github.com/angelshinh1"
            target="_blank" rel="noopener noreferrer"
            className="text-[var(--green-deep)] font-medium underline underline-offset-[6px] decoration-[var(--green-muted)] hover:decoration-[var(--green-vivid)] transition-colors duration-200"
          >
            GitHub
          </a>
          , or send me an{" "}
          <a
            href="mailto:shinh.maverick@gmail.com"
            className="text-[var(--green-deep)] font-medium underline underline-offset-[6px] decoration-[var(--green-muted)] hover:decoration-[var(--green-vivid)] transition-colors duration-200"
          >
            email
          </a>
          .
        </p>
      </Reveal>
    </section>
  );
}
