export default function Footer() {
    const links = [
        { label: "About", href: "#about" },
        { label: "Experience", href: "#experience" },
        { label: "Projects", href: "#projects" },
        { label: "Fun stuff", href: "#fun-stuff" },
        { label: "Contact", href: "#contact" },
    ];

    return (
        <footer className="relative border-t border-[var(--line)] bg-[var(--bg-2)]">
            <div className="max-w-[88vw] lg:max-w-[64rem] mx-auto pt-14 lg:pt-16 pb-28 lg:pb-32">
                <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10">
                    {/* Name + tagline */}
                    <div className="text-center lg:text-left">
                        <h3 className="font-heading text-3xl lg:text-4xl text-[var(--ink)]">
                            Angel Shinh
                        </h3>
                        <p className="font-sans text-sm lg:text-base text-[var(--ink-2)] mt-2 max-w-[36ch]">
                            Peek at the{" "}
                            <a href="#fun-stuff" className="text-[var(--ink)] underline decoration-[var(--line-strong)] underline-offset-4 hover:text-[var(--accent)] hover:decoration-[var(--accent)] transition-colors">
                                Fun stuff
                            </a>{" "}
                            to see me being whimsical.
                        </p>
                    </div>

                    {/* Quick links */}
                    <nav className="flex flex-wrap gap-x-6 gap-y-2 justify-center font-mono text-xs tracking-tight">
                        {links.map((l) => (
                            <a
                                key={l.label}
                                href={l.href}
                                className="text-[var(--ink-2)] hover:text-[var(--accent)] transition-colors duration-200"
                            >
                                {l.label}
                            </a>
                        ))}
                    </nav>

                    {/* Socials */}
                    <div className="flex gap-3 justify-center">
                        <a
                            href="https://github.com/angelshinh1"
                            target="_blank" rel="noopener noreferrer"
                            aria-label="GitHub"
                            className="p-2.5 rounded-lg border border-[var(--line)] bg-[var(--surface)] text-[var(--ink-2)] transition-[transform,color,box-shadow] duration-200 ease-[var(--ease-out)] hover:text-[var(--accent)] hover:-translate-y-0.5 active:scale-95"
                        >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                            </svg>
                        </a>
                        <a
                            href="https://linkedin.com/in/angelshinh"
                            target="_blank" rel="noopener noreferrer"
                            aria-label="LinkedIn"
                            className="p-2.5 rounded-lg border border-[var(--line)] bg-[var(--surface)] text-[var(--ink-2)] transition-[transform,color,box-shadow] duration-200 ease-[var(--ease-out)] hover:text-[var(--accent)] hover:-translate-y-0.5 active:scale-95"
                        >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                            </svg>
                        </a>
                    </div>
                </div>

                <div className="mt-12 pt-6 border-t border-[var(--line)]">
                    <p className="font-mono text-center text-xs text-[var(--ink-3)] tracking-tight">
                        © 2026 Angel Shinh · Built with Next.js and lots of ☕
                    </p>
                </div>
            </div>
        </footer>
    );
}
