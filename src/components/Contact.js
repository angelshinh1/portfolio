import StringLink from "./StringLink";
import { Paper, Tape, Stamp, Postmark } from "./scrapbook";

export default function Contact() {
  return (
    <section
      id="contact"
      className="relative max-w-[88vw] lg:max-w-[64rem] mx-auto px-1 py-28 lg:py-36"
    >
      <h2
        className="font-heading text-center text-[clamp(2.75rem,9vw,6rem)] text-[var(--text-primary)]"
        style={{ lineHeight: 0.98, letterSpacing: "-0.032em" }}
      >
        Get <em>in touch</em>.
      </h2>

      {/* A postcard — the message, centered, stamped in the corner */}
      <Paper
        variant="aged"
        tear={false}
        rotate={0.8}
        className="mt-16 lg:mt-20 max-w-[48rem] mx-auto"
        innerClassName="rounded-[3px] p-6 sm:p-8 md:p-12"
        decor={
          <>
            <Tape variant="clear" rotate={-35} width={110} className="-top-2 -left-8" />
            <Tape variant="clear" rotate={-35} width={110} className="-bottom-2 -right-8" />
          </>
        }
      >
        {/* Stamp + postmark in the corner, where they belong */}
        <div className="absolute top-5 right-5 md:top-7 md:right-8 hidden sm:block" aria-hidden>
          <Postmark className="absolute -left-24 top-3 w-36" rotate={-10} bottom="ON · CANADA" />
          <Stamp rotate={3} innerClassName="w-[4.75rem] h-[5.75rem] gap-1">
            <i className="ti ti-leaf text-[1.8rem]" />
            <span className="font-type text-[0.5rem] tracking-[0.14em]">TORONTO</span>
          </Stamp>
        </div>

        <p className="font-type text-center text-[1.1rem] md:text-[1.35rem] tracking-[0.5em] text-[var(--ink-brown)] pl-[0.5em] sm:mt-24 md:mt-20">
          POST CARD
        </p>

        <div className="relative max-w-[34rem] mx-auto mt-10 pb-4 text-center">
          <p className="font-hand text-[1.75rem] md:text-[2rem] leading-[1.2] text-[var(--ink-brown)]">
            Hey there!
          </p>
          <p className="font-hand text-[1.5rem] md:text-[1.75rem] leading-[1.35] text-[var(--ink-brown)] mt-3">
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
          <p className="font-hand text-[1.6rem] text-[var(--ink-brown)] mt-6" style={{ rotate: "-3deg" }}>
            — Angel
          </p>
        </div>
      </Paper>
    </section>
  );
}
