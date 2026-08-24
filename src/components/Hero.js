'use client';

import Image from "next/image";
import { useState, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Reveal from "./Reveal";
import GuitarIllustration from "./GuitarIllustration";
import GithubContributions from "./GithubContributions";

gsap.registerPlugin(useGSAP);

export default function Hero() {
    const [showTooltip, setShowTooltip] = useState(false);
    const [hovered, setHovered] = useState(false);
    const tipVisible = showTooltip || hovered;
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
                    <div
                        className="relative group w-fit mx-auto lg:mx-0"
                        onMouseEnter={() => setHovered(true)}
                        onMouseLeave={() => setHovered(false)}
                    >
                        <button
                            ref={avatarRef}
                            className="press-strong relative block w-36 h-36 md:w-44 md:h-44 cursor-pointer overflow-hidden rounded-full transition-[translate] duration-500 ease-[var(--spring)] lg:group-hover:-translate-y-1"
                            style={{
                                boxShadow: "var(--lift-3), 0 0 0 1px var(--mat-edge) inset",
                                transition: "transform var(--t-press) var(--spring), box-shadow var(--t-base) var(--spring)",
                            }}
                            onClick={handleImageClick}
                            aria-label="Angel Shinh — say hi"
                        >
                            <Image
                                src="/profile.jpg"
                                alt="Angel Shinh"
                                fill
                                priority
                                className="object-cover"
                            />
                        </button>

                        {/* Tooltip grows out of the avatar it belongs to, and
                            materializes (blur + scale) rather than plainly fading. */}
                        <div
                            className="font-mono material absolute left-1/2 top-full mt-5 px-4 py-2.5 rounded-2xl text-[var(--text-primary)] text-xs whitespace-nowrap z-40 pointer-events-none"
                            style={{
                                transformOrigin: "top center",
                                transform: `translateX(-50%) scale(${tipVisible ? 1 : 0.94})`,
                                opacity: tipVisible ? 1 : 0,
                                filter: tipVisible ? "blur(0)" : "blur(4px)",
                                transition: "opacity var(--t-base) var(--spring), transform var(--t-base) var(--spring-soft), filter var(--t-base) var(--spring)",
                            }}
                        >
                            Ts guy got W rizz. Should ask him out{" "}
                            <span className="inline-block">✌️🥀</span>
                            <div className="absolute left-1/2 -translate-x-1/2 -top-[6px] w-3 h-3 rotate-45 bg-[var(--mat-regular)] border-l border-t border-[var(--mat-edge)]"></div>
                        </div>
                    </div>
                </Reveal>

                <Reveal delay={0.05} className="flex-1 text-center lg:text-left">
                    <h1 ref={headingRef} className="type-display text-[var(--text-primary)]">
                        Hi, I&apos;m{" "}
                        <em style={{ color: "var(--green-deep)", fontStyle: "normal" }}>Angel</em>.
                    </h1>
                    <p
                        className="font-body mt-3 text-[var(--green-deep)]"
                        style={{ fontWeight: 500, fontSize: "1.05rem", letterSpacing: "0.002em" }}
                    >
                        Software Engineer
                    </p>
                    <p className="font-body type-lead mt-4 text-[var(--text-secondary)] max-w-[44ch] mx-auto lg:mx-0">
                        Software engineer based in Toronto, with more than a year of
                        hands-on experience building real-world software.
                        Outside of code, usually behind a{" "}
                        <mark>camera or a guitar</mark>.
                    </p>

                    {/* CTAs */}
                    <div className="flex flex-wrap justify-center lg:justify-start gap-3 pt-6">
                        <a href="#contact" className="btn btn-solid">
                            Get in touch
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                                <path d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                        </a>
                        <a
                            href="/Angel_Resume_swe.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn"
                        >
                            View resume
                        </a>
                    </div>
                </Reveal>
            </div>

            {/* Contribution activity — the one stat worth leading with.
                Capped width on desktop so it sits beside the guitar
                illustration rather than running underneath it. */}
            <Reveal delay={0.1} className="mt-14 lg:mt-16 lg:max-w-[42rem]">
                <GithubContributions />
            </Reveal>
        </header>
    );
}
