'use client';

import Image from "next/image";
import { useState, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Reveal from "./Reveal";
import GuitarIllustration from "./GuitarIllustration";

gsap.registerPlugin(useGSAP);

export default function Hero() {
    const [showTooltip, setShowTooltip] = useState(false);
    const introRef = useRef(null);
    const avatarRef = useRef(null);
    const headingRef = useRef(null);
    const watermarkRef = useRef(null);

    // Intro — avatar scales in, name rises into place, guitar fades up last.
    // Animates whole elements only (no text splitting), so nothing clips
    // descenders or reflows the layout when it finishes. Waits for the
    // loading-screen curtain to lift so it isn't burned through underneath.
    useGSAP(() => {
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

        const play = () => {
            gsap.timeline({ defaults: { ease: "power3.out" } })
                .from(avatarRef.current, { scale: 0.85, opacity: 0, duration: 0.6, ease: "power2.out" })
                .from(headingRef.current, { y: 32, opacity: 0, duration: 0.8 }, "-=0.25")
                .from(watermarkRef.current, { opacity: 0, y: 24, duration: 0.8, ease: "power2.out" }, "-=0.4");
        };

        if (window.__appReady) {
            play();
        } else {
            window.addEventListener("app:ready", play, { once: true });
        }

        return () => window.removeEventListener("app:ready", play);
    }, { scope: introRef });

    const handleImageClick = () => {
        setShowTooltip(!showTooltip);
        if (!showTooltip) {
            setTimeout(() => setShowTooltip(false), 3000);
        }
    };

    return (
        <header
            id="about"
            ref={introRef}
            className="relative max-w-[88vw] lg:max-w-[64rem] mx-auto px-1 pt-32 pb-20 lg:pt-36 lg:pb-24"
        >
            {/* Guitar illustration — tilted accent, desktop only */}
            <div
                ref={watermarkRef}
                className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none hidden lg:block"
                aria-hidden="true"
                style={{ opacity: 0.70 }}
            >
                <GuitarIllustration style={{ width: 300, height: 500, transform: "rotate(8deg)" }} />
            </div>

            {/* Identity row — avatar (left) + name & subtitle (right) */}
            <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-6 lg:gap-8 items-center">
                <Reveal className="flex-shrink-0">
                    <div className="relative group w-fit mx-auto lg:mx-0">
                        <div
                            ref={avatarRef}
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

                <Reveal delay={0.05} className="flex-1 text-center lg:text-left">
                    <h1 ref={headingRef} className="font-heading text-[clamp(2.75rem,8vw,5rem)] leading-[1.3] text-[var(--text-primary)]">
                        Hi, I&apos;m{" "}
                        <em style={{ color: "var(--green-deep)", fontStyle: "normal" }}>Angel</em>.
                    </h1>
                    <p className="font-mono mt-4 text-xs md:text-sm text-[var(--text-muted)] tracking-widest uppercase">
                        Software Developer
                    </p>
                    <p className="font-body mt-3 text-lg md:text-xl leading-relaxed text-[var(--text-secondary)] max-w-[44ch] mx-auto lg:mx-0">
                        Passionate about building innovative solutions &amp; blending
                        tech with art.
                    </p>
                </Reveal>
            </div>

            {/* About */}
            <Reveal delay={0.1} className="mt-16 lg:mt-20">
                <h2 className="font-heading text-3xl lg:text-4xl text-[var(--text-primary)]">
                    About
                </h2>
                <div className="font-body mt-5 text-base lg:text-lg text-[var(--text-secondary)] leading-[1.7] space-y-5 max-w-[62ch]">
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
