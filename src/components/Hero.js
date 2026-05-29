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
            {/* Top row - avatar (left) + name & subtitle (right) */}
            <div className="flex flex-col md:flex-row items-start md:items-center gap-8 lg:gap-12">
                <Reveal className="flex-shrink-0">
                    <div className="relative group">
                        <div
                            className="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden cursor-pointer bg-[var(--surface)] shadow-[0_4px_6px_rgba(0,0,0,0.04),0_20px_40px_rgba(0,0,0,0.10),0_0_0_1px_var(--line)] transition-transform duration-500 ease-[var(--ease-out)] group-hover:-translate-y-1"
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

                        {/* Tooltip - preserved */}
                        <div
                            className={`font-sans absolute left-1/2 -translate-x-1/2 top-full mt-4 px-4 py-2.5 rounded-xl bg-[var(--surface)] border border-[var(--line)] text-[var(--ink)] text-xs transition-all duration-300 ease-[var(--ease-out)] whitespace-nowrap shadow-xl z-40 ${
                                showTooltip
                                    ? "opacity-100 translate-y-0"
                                    : "opacity-0 translate-y-1 lg:group-hover:opacity-100 lg:group-hover:translate-y-0"
                            }`}
                        >
                            Ts guy got W rizz. Should ask him out{" "}
                            <span className="inline-block">✌️🥀</span>
                            <div className="absolute left-1/2 -translate-x-1/2 -top-[7px] w-3 h-3 rotate-45 bg-[var(--surface)] border-l border-t border-[var(--line)]"></div>
                        </div>
                    </div>
                </Reveal>

                <Reveal delay={0.05} className="flex-1">
                    <h1 className="font-heading text-[clamp(2.75rem,8vw,5rem)] leading-[0.98] text-[var(--ink)]">
                        Hi, I&apos;m{" "}
                        <span className="italic">Angel</span>.
                    </h1>
                    <p className="font-mono mt-4 text-sm md:text-base text-[var(--ink-2)] tracking-tight">
                        Software Developer
                        <span className="mx-2 text-[var(--ink-3)]">/</span>
                        Prev @ RBC
                    </p>
                    <p className="font-sans mt-2 text-base md:text-lg leading-relaxed text-[var(--ink-2)] max-w-[44ch]">
                        Passionate about building innovative solutions &amp; blending
                        tech with art.
                    </p>
                </Reveal>
            </div>

            {/* About */}
            <Reveal delay={0.1}>
                <h2 className="font-heading text-3xl lg:text-4xl text-[var(--ink)]">About</h2>
                <div className="font-sans mt-5 text-base lg:text-lg text-[var(--ink-2)] leading-[1.7] space-y-5">
                    <p>
                        I&apos;m really into exploring new technologies and staying
                        up-to-date with the latest trends in software development.
                        When I&apos;m not coding, I absolutely love{" "}
                        <mark>photography and playing guitar</mark>.
                    </p>
                    <p>
                        Currently I&apos;m exploring new opportunities in software
                        engineering, having previously worked at{" "}
                        <span className="text-[var(--ink)] font-medium">RBC</span> as a
                        SWE Intern where I dove deep into{" "}
                        <mark>secure data exchange and backend systems</mark>. Feel free
                        to reach out - I&apos;m always down to make new friends and
                        collaborate on cool projects.
                    </p>

                    {/* CTAs */}
                    <div className="flex flex-wrap gap-3 pt-3">
                        <a
                            href="#contact"
                            className="group inline-flex items-center gap-2 px-6 py-3 bg-[var(--ink)] text-[var(--bg)] rounded-lg font-sans font-medium text-sm tracking-tight transition-[transform,opacity] duration-200 ease-[var(--ease-out)] hover:opacity-90 active:scale-[0.97]"
                        >
                            Get in touch
                            <span className="transition-transform duration-200 ease-[var(--ease-out)] group-hover:translate-x-0.5">
                                &gt;
                            </span>
                        </a>
                        <a
                            href="./Angel_Resume_swe.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center px-6 py-3 rounded-lg font-sans font-medium text-sm tracking-tight text-[var(--ink)] border border-[var(--line-strong)] transition-[transform,background] duration-200 ease-[var(--ease-out)] hover:bg-[var(--accent-soft)] active:scale-[0.97]"
                        >
                            View resume
                        </a>
                    </div>
                </div>
            </Reveal>
        </header>
    );
}
