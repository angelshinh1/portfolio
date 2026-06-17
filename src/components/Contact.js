import Reveal from "./Reveal";
import StringLink from "./StringLink";

export default function Contact() {
  return (
    <section
      id="contact"
      className="relative max-w-[88vw] lg:max-w-[64rem] mx-auto px-1 py-28 lg:py-36 text-center"
    >
      {/* Floating musical note */}
      <span
        className="absolute top-12 right-8 font-body text-2xl pointer-events-none select-none hidden lg:block"
        style={{ color: 'var(--green-deep)', opacity: 0.18 }}
        aria-hidden
      >♬</span>
      <span
        className="absolute bottom-12 left-8 font-body text-xl pointer-events-none select-none hidden lg:block"
        style={{ color: 'var(--green-deep)', opacity: 0.15 }}
        aria-hidden
      >♩</span>

      <Reveal delay={0.05}>
        <h2 className="font-heading text-[clamp(2.75rem,9vw,6rem)] leading-[0.98] text-[var(--text-primary)]">
          <span className="initial">L</span>et&apos;s{" "}
          <em>talk</em>.
        </h2>
      </Reveal>

      <Reveal delay={0.1}>
        <p className="font-body text-lg lg:text-xl text-[var(--text-secondary)] max-w-[46ch] mx-auto leading-relaxed mt-8">
          Wanna chat? Shoot me a DM on{" "}
          <StringLink
            href="https://www.linkedin.com/in/angelshinh/"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </StringLink>
          , check out my work on{" "}
          <StringLink
            href="https://github.com/angelshinh1"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </StringLink>
          , or send me an{" "}
          <StringLink href="mailto:shinh.maverick@gmail.com">
            email
          </StringLink>
          .
        </p>
      </Reveal>
    </section>
  );
}
