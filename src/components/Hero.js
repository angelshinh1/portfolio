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

    // Intro: stamp scales in, note drops in, guitar fades up; waits for the loading screen
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
            className="relative max-w-[88vw] lg:max-w-[70rem] mx-auto px-1 pt-40 pb-20 lg:pt-40 lg:pb-24"
        >
            {/* Desktop: stamp beside the card. Below lg: stamp pinned to the card's top-right corner */}
            <div className="relative grid grid-cols-1 lg:grid-cols-[0.85fr_1.6fr] gap-16 lg:gap-6 items-center">
                <Reveal className="absolute -top-[4.5rem] right-1 sm:right-4 z-10 lg:static lg:z-auto flex-shrink-0">
                    <div
                        className="relative group w-fit lg:ml-4"
                        onMouseEnter={() => setHovered(true)}
                        onMouseLeave={() => setHovered(false)}
                    >
                        {/* The photo as a postage stamp, cancelled with a Toronto postmark */}
                        <button
                            ref={avatarRef}
                            className="press-strong stamp relative block cursor-pointer"
                            style={{ rotate: "-4deg" }}
                            onClick={handleImageClick}
                            aria-label="Angel Shinh — say hi"
                        >
                            <span className="block w-[88px] h-[108px] sm:w-[116px] sm:h-[140px] lg:w-[226px] lg:h-[276px] p-1.5 lg:p-2.5 bg-[#FDFBF4] border border-[rgba(62,44,30,0.14)]">
                                <span className="relative block w-full h-full overflow-hidden">
                                    <Image
                                        src="/profile.jpg"
                                        alt="Angel Shinh"
                                        fill
                                        priority
                                        sizes="226px"
                                        className="object-cover object-[50%_40%]"
                                    />
                                </span>
                            </span>
                        </button>
                        <Postmark className="absolute -top-8 -right-28 w-40 hidden lg:block" rotate={-8} />

                        {/* Margin note pointing back at the photo */}
                        <div
                            className="absolute -bottom-14 -right-28 hidden lg:flex items-center gap-1 text-[var(--ink-brown)] pointer-events-none"
                            style={{ opacity: tipVisible ? 0 : 1, transition: "opacity var(--t-base) var(--spring)" }}
                            aria-hidden
                        >
                            <DoodleArrow className="w-12 rotate-[200deg] -translate-y-3" />
                            <span className="font-hand text-[1.6rem] leading-none whitespace-nowrap" style={{ rotate: "-6deg" }}>
                                that&apos;s me!
                            </span>
                        </div>

                        {/* Taped note that fades in under the stamp */}
                        <div
                            className="absolute right-0 lg:right-auto lg:left-1/2 lg:-translate-x-1/2 top-full mt-5 z-40 pointer-events-none"
                            style={{
                                opacity: tipVisible ? 1 : 0,
                                transition: "opacity var(--t-base) var(--spring)",
                            }}
                            aria-hidden={!tipVisible}
                        >
                            <Paper
                                variant="cream"
                                seed={88}
                                depth={3}
                                rotate={2}
                                innerClassName="px-4 pt-3.5 pb-2.5"
                                decor={<Tape variant="clear" rotate={-4} width={46} className="-top-2 left-1/2 -translate-x-1/2" />}
                            >
                                <p className="font-hand w-[10rem] text-center text-[1.1rem] leading-tight text-[var(--ink-brown)]">
                                    Ts guy got W rizz. Should ask him out{" "}
                                    <span className="inline-block">✌️🥀</span>
                                </p>
                            </Paper>
                        </div>
                    </div>
                </Reveal>

                <Paper
                    ref={headingRef}
                    variant="cream"
                    seed={3}
                    depth={6}
                    rotate={1.2}
                    className="text-center lg:text-left"
                    innerClassName="px-6 pt-14 pb-10 sm:px-10 sm:pt-16 md:px-14 md:pb-14 lg:py-14"
                    decor={<Tape rotate={-7} className="-top-3 left-8 md:left-14" />}
                >
                    <h1 className="type-display text-[var(--text-primary)]">
                        Hi, I&apos;m Angel.
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

            {/* Commit graph on graph paper, guitar beside it on desktop */}
            <div className="relative mt-28 lg:mt-24 grid grid-cols-1 lg:grid-cols-[1fr_47rem] items-center gap-6">
                <div className="relative hidden lg:block h-full min-h-[16rem]" aria-hidden>
                    <div ref={watermarkRef} className="absolute left-2 top-1/2 -translate-y-1/2 pointer-events-none">
                        <GuitarIllustration style={{ width: 150, height: 260, transform: "rotate(-24deg)" }} />
                    </div>
                </div>
                <GithubContributions
                    frame={Paper}
                    frameProps={{
                        variant: "grid",
                        tear: ["bottom"],
                        seed: 9,
                        rotate: -0.6,
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
