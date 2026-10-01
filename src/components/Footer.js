import Link from "next/link";
import { Paper, Postmark } from "./scrapbook";

const socialClass =
    "press label-dymo inline-flex items-center gap-2 transition-colors duration-200 hover:text-[var(--green-deep)]";

// Torn kraft strip; overlaps the section above so the tear shows its color
export default function Footer() {
    return (
        <Paper
            as="footer"
            variant="kraft"
            tear={["top"]}
            depth={14}
            teeth={90}
            seed={77}
            className="relative z-10 -mt-4"
            innerClassName="pt-16 lg:pt-20 pb-14 lg:pb-16"
        >
            <div className="relative max-w-[88vw] lg:max-w-[64rem] mx-auto">
                <Postmark
                    className="absolute -top-6 right-0 w-40 hidden lg:block"
                    rotate={8}
                    top="ANGEL SHINH"
                    bottom="TORONTO · 2026"
                />

                <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10">
                    {/* Name + tagline */}
                    <div className="text-center lg:text-left">
                        <h3 className="type-heading text-[var(--ink-brown)]">
                            Angel Shinh
                        </h3>
                        <p className="font-hand text-[1.5rem] leading-snug text-[var(--ink-brown)] mt-2 max-w-[40ch] mx-auto lg:mx-0">
                            Peek at the{" "}
                            {/* Root-relative so it works from /projects and /blog too */}
                            <Link
                                href="/#fun-stuff"
                                scroll={false}
                                className="underline decoration-[rgba(62,44,30,0.45)] decoration-2 underline-offset-4 transition-colors duration-200 hover:text-[var(--green-deep)] hover:decoration-[var(--green-deep)]"
                            >
                                Fun stuff
                            </Link>{" "}
                            to see me being whimsical.
                        </p>
                    </div>

                    {/* Socials — paper labels, like the one under the hero heading */}
                    <div className="flex gap-4 justify-center lg:mr-44">
                        <a
                            href="https://github.com/angelshinh1"
                            target="_blank" rel="noopener noreferrer"
                            className={socialClass}
                            style={{ rotate: "-2deg" }}
                        >
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                            </svg>
                            GitHub
                        </a>
                        <a
                            href="https://linkedin.com/in/angelshinh"
                            target="_blank" rel="noopener noreferrer"
                            className={socialClass}
                            style={{ rotate: "1.5deg" }}
                        >
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                            </svg>
                            LinkedIn
                        </a>
                    </div>
                </div>
            </div>
        </Paper>
    );
}
