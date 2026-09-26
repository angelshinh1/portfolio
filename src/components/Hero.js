'use client';

import Image from "next/image";
import { useState, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Reveal from "./Reveal";
import GuitarIllustration from "./GuitarIllustration";
import GithubContributions from "./GithubContributions";
import { Paper, Tape, Postmark, DoodleArrow } from "./scrapbook";

gsap.registerPlugin(useGSAP);

export default function Hero() {
    const [showTooltip, setShowTooltip] = useState(false);
    const [hovered, setHovered] = useState(false);
    const tipVisible = showTooltip || hovered;
    const introRef = useRef(null);
    const avatarRef = useRef(null);
    const headingRef = useRef(null);
    const watermarkRef = useRef(null);

    // Intro — photo sticker scales in, the note drops onto the page, the
    // guitar by the commit graph fades up last. Animates whole elements only (no text splitting), so
    // nothing reflows when it finishes. Waits for the loading-screen curtain
    // to lift so it isn't burned through underneath.
    useGSAP(() => {
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

        const play = () => {
            gsap.timeline({ defaults: { ease: "power3.out" } })
                .from(avatarRef.current, { scale: 0.85, opacity: 0, duration: 0.6, ease: "power2.out" })
                .from(headingRef.current, { y: -28, rotation: -3, opacity: 0, duration: 0.8 }, "-=0.25")
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
            className="relative max-w-[88vw] lg:max-w-[70rem] mx-auto px-1 pt-32 pb-20 lg:pt-40 lg:pb-24"
        >
            {/* Identity collage — photo sticker (left) + torn note (right) */}
            <div className="relative grid grid-cols-1 lg:grid-cols-[0.85fr_1.6fr] gap-16 lg:gap-6 items-center">
                <Reveal className="flex-shrink-0">
                    <div
                        className="relative group w-fit mx-auto lg:mx-0 lg:ml-4"
                        onMouseEnter={() => setHovered(true)}
                        onMouseLeave={() => setHovered(false)}
                    >
                        <button
                            ref={avatarRef}
                            className="press-strong sticker-cut relative block w-44 h-44 md:w-56 md:h-56 cursor-pointer overflow-hidden rounded-full"
                            style={{ rotate: "-3deg" }}
                            onClick={handleImageClick}
                            aria-label="Angel Shinh — say hi"
                        >
                            <Image
                                src="/profile.jpg"
                                alt="Angel Shinh"
                                fill
                                priority
                                sizes="224px"
                                className="object-cover"
                            />
                        </button>
                        <Tape variant="kraft" rotate={-38} width={92} className="top-2 -right-7" />

                        {/* Margin note pointing back at the photo */}
                        <div
                            className="absolute -bottom-14 -right-24 md:-right-28 hidden sm:flex items-center gap-1 text-[var(--ink-brown)] pointer-events-none"
                            aria-hidden
                        >
                            <DoodleArrow className="w-12 rotate-[200deg] -translate-y-3" />
                            <span className="font-hand text-[1.6rem] leading-none whitespace-nowrap" style={{ rotate: "-6deg" }}>
                                that&apos;s me!
                            </span>
                        </div>

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

                <Paper
                    ref={headingRef}
                    variant="cream"
                    seed={3}
                    depth={6}
                    rotate={-1.2}
                    className="text-center lg:text-left"
                    innerClassName="px-6 py-10 sm:px-10 md:px-14 md:py-14"
                    decor={
                        <>
                            <Tape rotate={-7} className="-top-3 left-8 md:left-14" />
                            <Postmark className="absolute -top-12 -right-4 md:-right-10 w-36 md:w-44 hidden sm:block" />
                        </>
                    }
                >
                    <h1 className="type-display text-[var(--text-primary)]">
                        Hi, I&apos;m{" "}
                        <em style={{ color: "var(--green-deep)", fontStyle: "normal" }}>Angel</em>.
                    </h1>
                    <p className="mt-5">
                        <span className="label-dymo" style={{ rotate: "-1.5deg" }}>Software Engineer</span>
                    </p>
                    <p className="font-body type-lead mt-6 text-[var(--text-secondary)] max-w-[44ch] mx-auto lg:mx-0">
                        Software engineer based in Toronto, with more than a year of
                        hands-on experience building real-world software.
                        Outside of code, usually behind a{" "}
                        <mark>camera or a guitar</mark>.
                    </p>

                    {/* CTAs */}
                    <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-8">
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
                            className="press ticket group/ticket"
                            style={{ rotate: "1.5deg" }}
                        >
                            <span className="font-body font-semibold text-[0.82rem] px-7 py-3 flex items-center transition-colors duration-200 group-hover/ticket:text-[var(--green-deep)]">
                                View resume
                            </span>
                        </a>
                    </div>
                </Paper>
            </div>

            {/* Contribution activity on graph paper, with the guitar lying
                beside it on desktop. Capped width so the calendar fits without
                scrolling. */}
            <div className="relative mt-28 lg:mt-24 grid grid-cols-1 lg:grid-cols-[1fr_47rem] items-center gap-6">
                <div className="relative hidden lg:block h-full min-h-[16rem]" aria-hidden>
                    <div ref={watermarkRef} className="absolute left-2 top-1/2 -translate-y-1/2 pointer-events-none">
                        <GuitarIllustration style={{ width: 150, height: 260, transform: "rotate(-24deg)" }} />
                    </div>
                    <p
                        className="font-hand absolute right-2 top-0 text-[1.5rem] leading-tight text-[var(--ink-brown)] max-w-[8.5rem] text-right"
                        style={{ rotate: "-4deg" }}
                    >
                        proof I actually ship code
                    </p>
                </div>
                <p
                    className="font-hand lg:hidden -mb-2 ml-3 text-[1.5rem] leading-tight text-[var(--ink-brown)]"
                    style={{ rotate: "-3deg" }}
                    aria-hidden
                >
                    proof I actually ship code
                </p>
                <GithubContributions
                    frame={Paper}
                    frameProps={{
                        variant: "grid",
                        tear: ["bottom"],
                        seed: 9,
                        rotate: 0.6,
                        innerClassName: "p-5 md:p-7",
                        decor: (
                            <Tape variant="clear" rotate={-3} width={90} className="-top-3 left-1/2 -translate-x-1/2" />
                        ),
                    }}
                />
            </div>
        </header>
    );
}
