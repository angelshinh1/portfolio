'use client';

import Image from "next/image";
import { useState, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Reveal from "./Reveal";
import Camera from "./Camera";
import GithubContributions from "./GithubContributions";
import { Paper, Tape, DoodleArrow } from "./scrapbook";
import { RESUME_URL } from "@/lib/resume";

gsap.registerPlugin(useGSAP);

const PRINTS = [1, 5, 3, 7, 2, 8, 4, 6].map((n) => `/gallery-${n}.jpg`);

// Circle with a stamp's notches bitten out of its edge, in a 100×100 viewBox
const PERFORATED_CIRCLE = (() => {
    const notches = 64, R = 49.5, r = 1.4, half = Math.asin(r / R);
    const at = (a) => `${(50 + R * Math.cos(a)).toFixed(2)} ${(50 + R * Math.sin(a)).toFixed(2)}`;
    const angle = (i) => (i / notches) * 2 * Math.PI;
    let d = `M${at(angle(0) - half)}`;
    for (let i = 0; i < notches; i++) {
        d += `A${r} ${r} 0 0 0 ${at(angle(i) + half)}A${R} ${R} 0 0 1 ${at(angle(i + 1) - half)}`;
    }
    return `${d}Z`;
})();

// One poster-style accent behind the heading: a gridded butter circle
function HeroShapes() {
    return (
        <>
            <svg aria-hidden viewBox="0 0 200 200" className="absolute pointer-events-none w-[120px] sm:w-[190px] lg:w-[250px] -top-[64px] right-[4%] lg:-top-[78px] lg:right-[4%] -z-10">
                <defs>
                    <pattern id="hero-grid" width="16" height="16" patternUnits="userSpaceOnUse">
                        <rect width="16" height="16" fill="#E9C46A" />
                        <path d="M0 0H16M0 0V16" stroke="#2B1E16" strokeWidth="0.8" opacity=".55" />
                    </pattern>
                </defs>
                <circle cx="100" cy="100" r="99" fill="url(#hero-grid)" />
            </svg>
        </>
    );
}

export default function Hero() {
    const [shots, setShots] = useState(0);
    const introRef = useRef(null);
    const avatarRef = useRef(null);
    const headingRef = useRef(null);
    const watermarkRef = useRef(null);

    // Intro: photo scales in, note drops in, camera fades up; waits for the loading screen
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

    return (
        <header
            id="about"
            ref={introRef}
            className="relative max-w-[88vw] lg:max-w-[70rem] mx-auto px-1 pt-40 pb-20 lg:pt-40 lg:pb-24"
        >
            {/* Photo on the left, intro on the right; stacked on small screens */}
            <div className="relative grid grid-cols-1 lg:grid-cols-[0.85fr_1.6fr] gap-12 lg:gap-10 items-center">
                <Reveal className="flex justify-center lg:block flex-shrink-0">
                    <div className="relative w-fit">
                        {/* Photo in a round frame with stamp perforations */}
                        <div ref={avatarRef} className="scrap w-[190px] h-[190px] sm:w-[220px] sm:h-[220px] lg:w-[280px] lg:h-[280px] xl:w-[300px] xl:h-[300px]">
                            <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full" aria-hidden>
                                <path d={PERFORATED_CIRCLE} fill="#FDFBF4" />
                            </svg>
                            <span className="absolute inset-[12px] lg:inset-5 rounded-full overflow-hidden border border-[rgba(62,44,30,0.35)]">
                                {/* Slight crop: keeps the raised finger outside the circle */}
                                <Image
                                    src="/profile.jpg"
                                    alt="Angel Shinh"
                                    fill
                                    priority
                                    sizes="(min-width: 1280px) 300px, (min-width: 1024px) 280px, 220px"
                                    className="object-cover scale-[1.08] origin-[19%_0%]"
                                />
                            </span>
                        </div>

                        {/* Margin note pointing back at the photo */}
                        <div
                            className="absolute -bottom-12 -right-4 hidden lg:flex items-center gap-1 text-[var(--ink-brown)] pointer-events-none"
                            aria-hidden
                        >
                            <DoodleArrow className="w-12 rotate-[200deg] -translate-y-3" />
                            <span className="font-hand text-[1.6rem] leading-none whitespace-nowrap" style={{ rotate: "-6deg" }}>
                                that&apos;s me!
                            </span>
                        </div>
                    </div>
                </Reveal>

                <div ref={headingRef} className="relative isolate text-center lg:text-left lg:pl-6">
                    <HeroShapes />
                    <h1 className="type-display text-[var(--text-primary)]">
                        Hi, I&apos;m Angel.
                    </h1>
                    <div className="mt-5">
                        <Paper
                            as="span"
                            variant="aged"
                            seed={8}
                            depth={2}
                            rotate={-1.5}
                            className="inline-block"
                            innerClassName="px-4 py-1.5 font-body font-semibold text-[0.84rem] tracking-[0.01em] text-[var(--ink-brown)]"
                        >
                            Software Engineer
                        </Paper>
                    </div>
                    <p className="font-body type-lead mt-6 text-[var(--text-secondary)] max-w-[38ch] mx-auto lg:mx-0">
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
                        {/* A cream paper slip, the scrapbook take on a secondary button */}
                        <Paper
                            as="a"
                            href={RESUME_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            variant="cream"
                            seed={5}
                            depth={3}
                            rotate={-1.5}
                            hover
                            className="press group/slip"
                            innerClassName="px-6 py-3 font-body font-semibold text-[0.82rem] tracking-[0.02em] text-[var(--text-primary)] transition-colors duration-200 group-hover/slip:text-[var(--green-deep)]"
                        >
                            View resume
                        </Paper>
                    </div>
                </div>
            </div>

            {/* Commit graph on graph paper; camera beside it on desktop, below it on mobile */}
            <div className="relative mt-28 lg:mt-24 grid grid-cols-1 lg:grid-cols-[1fr_47rem] items-center gap-6">
                <div className="relative flex justify-center lg:justify-start items-center h-full lg:min-h-[16rem] order-2 lg:order-1 mt-10 lg:mt-0 pb-20 lg:pb-0">
                    <div ref={watermarkRef} className="relative">
                        <Camera
                            interactive
                            prints={PRINTS}
                            onShot={setShots}
                            className="w-[180px] lg:w-[220px]"
                            style={{ rotate: "-7deg" }}
                            sizes="(max-width: 1024px) 180px, 220px"
                        />
                        {/* Handwritten nudge; turns into a roll counter once you start shooting */}
                        <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 lg:left-24 lg:translate-x-0 flex items-start gap-1 text-[var(--ink-brown)] pointer-events-none" aria-live="polite">
                            <DoodleArrow className="w-12 rotate-[200deg] -translate-y-2" />
                            <span className="font-hand text-[1.45rem] leading-tight whitespace-nowrap pt-3" style={{ rotate: "-4deg" }}>
                                {shots === 0
                                    ? "psst, click me! I take photos"
                                    : shots < PRINTS.length
                                        ? `shot ${shots} of ${PRINTS.length}, another?`
                                        : "that's the whole roll \u2726"}
                            </span>
                        </div>
                    </div>
                </div>
                <GithubContributions
                    frame={Paper}
                    frameProps={{
                        variant: "grid",
                        tear: ["bottom"],
                        seed: 9,
                        className: "order-1 lg:order-2",
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
