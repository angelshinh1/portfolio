import Image from "next/image";
import { useState } from "react";
import Reveal from "./Reveal";

export default function Hero() {
    const [showTooltip, setShowTooltip] = useState(false);

    const handleImageClick = () => {
        setShowTooltip(!showTooltip);
        if (!showTooltip) {
            setTimeout(() => setShowTooltip(false), 3000);
        }
    };

    return (
        <header
            id="about"
            className="relative max-w-[88vw] lg:max-w-[64rem] mx-auto px-1 pt-24 pb-24 lg:pt-28 lg:pb-32 min-h-[88vh] flex flex-col justify-center gap-12 lg:gap-16"
        >
            {/* Top row — TV-frame avatar (left) + name & subtitle (right) */}
            <div className="flex flex-col md:flex-row items-start md:items-center gap-10 lg:gap-14">
                <Reveal className="flex-shrink-0">
                    <div className="relative group">
                        <div
                            className="relative w-36 h-36 md:w-44 md:h-44 cursor-pointer overflow-hidden rounded-full transition-transform duration-500 ease-[var(--ease-out)] group-hover:-translate-y-1"
                            style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.20)" }}
                            onClick={handleImageClick}
                        >
                            <Image
                                src="/profile.jpg"
                                alt="Angel Shinh"
                                fill
                                priority
                                className="object-cover"
                            />
                        </div>

                        <div
                            className={`font-mono absolute left-1/2 -translate-x-1/2 top-full mt-6 px-4 py-2.5 rounded-xl bg-[var(--bg-surface)] border border-[var(--line)] text-[var(--text-primary)] text-xs transition-all duration-300 ease-[var(--ease-out)] whitespace-nowrap shadow-xl z-40 ${
                                showTooltip
                                    ? "opacity-100 translate-y-0"
                                    : "opacity-0 translate-y-1 lg:group-hover:opacity-100 lg:group-hover:translate-y-0"
                            }`}
                        >
                            Ts guy got W rizz. Should ask him out{" "}
                            <span className="inline-block">✌️🥀</span>
                            <div className="absolute left-1/2 -translate-x-1/2 -top-[7px] w-3 h-3 rotate-45 bg-[var(--bg-surface)] border-l border-t border-[var(--line)]"></div>
                        </div>
                    </div>
                </Reveal>

                <Reveal delay={0.05} className="flex-1">
                    <h1 className="font-heading text-[clamp(2.75rem,8vw,5rem)] leading-[0.98] text-[var(--text-primary)]">
                        <span className="initial">H</span>i, I&apos;m{" "}
                        <em style={{ color: "var(--green-deep)" }}>Angel</em>.
                    </h1>
                    {/* Vivid green accent underline */}
                    <div className="mt-3 h-[3px] w-16 rounded-full" style={{ background: "var(--green-vivid)" }} />
                    <p className="font-mono mt-4 text-xs md:text-sm text-[var(--text-muted)] tracking-widest uppercase">
                        Software Developer
                    </p>
                    <p className="font-body mt-3 text-lg md:text-xl leading-relaxed text-[var(--text-secondary)] max-w-[44ch]">
                        Passionate about building innovative solutions &amp; blending
                        tech with art.
                    </p>
                </Reveal>
            </div>

            {/* About */}
            <Reveal delay={0.1}>
                <h2 className="font-heading text-3xl lg:text-4xl text-[var(--text-primary)]">
                    <span className="initial">A</span>bout
                </h2>
                <div className="font-body mt-5 text-base lg:text-lg text-[var(--text-secondary)] leading-[1.7] space-y-5">
                    <p>
                        I&apos;m really into exploring new technologies and staying
                        up-to-date with the latest trends in software development.
                        When I&apos;m not coding, I absolutely love{" "}
                        <mark>photography and playing guitar</mark>.
                    </p>
                    <p>
                        Currently I&apos;m exploring new opportunities in software
                        engineering, having previously worked at{" "}
                        <span className="text-[var(--text-primary)] font-semibold">RBC</span> as a
                        SWE Intern where I dove deep into{" "}
                        <mark>secure data exchange and backend systems</mark>. Feel free
                        to reach out - I&apos;m always down to make new friends and
                        collaborate on cool projects.
                    </p>

                    {/* CTAs */}
                    <div className="flex flex-wrap gap-3 pt-3">
                        <a href="#contact" className="btn btn-solid">
                            Get in touch
                        </a>
                        <a
                            href="./Angel_Resume_swe.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn"
                        >
                            View resume
                        </a>
                    </div>
                </div>
            </Reveal>
        </header>
    );
}
