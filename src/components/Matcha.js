'use client';

import Image from "next/image";
import { useEffect, useId, useRef } from "react";

// Artwork canvas is viewBox -24 -24 408 348 (public/matcha); bowl opening centred at (180, 142)
const CX = 180;
const CY = 142;
const WHISK_ORIGIN = "54.4% 47.1%";

// Foam bubbles riding a circular current: each sits on its own orbit (r = 0 centre … 1 rim).
// Tier 0 is always there; tier 1 is the froth whisking brings up. Rounded so server and client agree.
const round = (v) => Math.round(v * 100) / 100;
const hash = (n) => { const x = Math.sin(n * 12.9898) * 43758.5453; return x - Math.floor(x); };
const BUBBLES = Array.from({ length: 72 }, (_, i) => ({
    a: round(hash(i + 1) * Math.PI * 2),
    r: round(0.1 + 0.86 * Math.sqrt(hash(i + 101))),
    s: round(1.6 + ((i * 7) % 6) * 0.55),
    tier: i % 3 === 0 ? 1 : 0,
}));
// Inner water turns faster than the rim, like a real vortex (revolutions per 8s cycle)
const spin = (r) => 0.07 + 0.26 * (1 - r);
// Each bubble also drifts a little in and out of its orbit, so the foam never lines up in rings
const place = (b, turns) => {
    const t = b.a + turns * Math.PI * 2 * spin(b.r);
    const r = Math.min(0.97, b.r + 0.05 * Math.sin(turns * Math.PI * 2 * 1.3 + b.a * 3));
    return [round(CX + Math.cos(t) * r * 112), round(CY + Math.sin(t) * r * 24)];
};

const STEAM = [
    "M138 118 C 128 98, 150 84, 140 62 C 132 44, 150 30, 142 12",
    "M182 112 C 172 90, 196 76, 184 52 C 174 32, 194 18, 186 -2",
    "M250 116 C 242 96, 262 82, 252 62 C 244 46, 260 32, 254 16",
];

export default function Matcha({ className = "", style, sizes = "260px" }) {
    const rootRef = useRef(null);
    const whiskRef = useRef(null);
    const restRef = useRef(null);
    const teaRef = useRef(null);
    const foamRef = useRef(null);
    const current = useRef({ cycles: 0, phase: 0, boost: 0 });
    const frame = useRef(0);
    const heartRef = useRef(null);
    const steamRef = useRef(null);
    const animeRef = useRef(null);
    const busyRef = useRef(false);
    const uid = useId().replace(/[^a-zA-Z0-9]/g, "");

    const reduced = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const loadAnime = async () => (animeRef.current ??= await import("animejs"));

    // Move every bubble to where the current has carried it
    function render() {
        frame.current = 0;
        const c = current.current;
        const turns = c.cycles + c.phase + c.boost;
        Array.from(foamRef.current?.children ?? []).forEach((el, i) => {
            const [x, y] = place(BUBBLES[i], turns);
            el.setAttribute("cx", x);
            el.setAttribute("cy", y);
        });
    }
    const schedule = () => { if (!frame.current) frame.current = requestAnimationFrame(render); };

    // Idle: the foam slowly circles on the current, the tea gently sways in the bowl,
    // the resting whisk rocks, and steam curls up one wisp after another
    useEffect(() => {
        if (reduced()) return;
        let cancelled = false;
        const loops = [];
        loadAnime().then(({ animate, stagger }) => {
            if (cancelled || !steamRef.current) return;
            const c = current.current;
            loops.push(
                animate(c, { phase: [0, 1], duration: 8000, ease: "linear", loop: true, onLoop: () => { c.cycles += 1; }, onUpdate: schedule }),
                animate(teaRef.current, { cx: [CX - 2.5, CX + 2.5], ry: [27.4, 28.2], duration: 3400, ease: "inOutSine", loop: true, alternate: true }),
                animate(foamRef.current, { translateX: [-2, 2], duration: 3400, ease: "inOutSine", loop: true, alternate: true }),
                animate(foamRef.current.querySelectorAll("circle"), {
                    r: (el) => [+el.getAttribute("r") * 0.9, +el.getAttribute("r") * 1.1],
                    duration: 1600,
                    delay: stagger(50, { from: "random" }),
                    ease: "inOutSine",
                    loop: true,
                    alternate: true,
                }),
                animate(restRef.current, { rotate: [-2.5, 2.5], duration: 2600, ease: "inOutSine", loop: true, alternate: true }),
            );
            loops.push(animate(steamRef.current.querySelectorAll("path"), {
                translateY: [{ from: 8, to: -16 }],
                opacity: [{ from: 0, to: 0.75, duration: 1400 }, { to: 0, duration: 1800 }],
                strokeDashoffset: [0, -60],
                duration: 3200,
                delay: stagger(900),
                ease: "inOutSine",
                loop: true,
            }));
        });
        return () => { cancelled = true; loops.forEach((a) => a.revert()); cancelAnimationFrame(frame.current); };
        // render/schedule only touch refs, so they never go stale
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Click: the bowl rocks, the chasen whisks in quick zig-zags and spins the current up, the froth rises,
    // then the whisk lifts away and a foam heart is left behind
    async function whisk() {
        if (busyRef.current || reduced()) return;
        busyRef.current = true;
        const { animate, createTimeline, stagger } = await loadAnime();
        const froth = (t) => Array.from(foamRef.current.children).filter((el) => +el.dataset.tier === t);
        const strokes = Array.from({ length: 14 }, (_, i) => ({ to: i % 2 ? "-4.5%" : "4.5%", duration: 75, ease: "inOutSine" }));
        createTimeline({ onComplete: () => { busyRef.current = false; } })
            .add(whiskRef.current, {
                translateX: [...strokes, { to: "0%", duration: 220, ease: "outQuad" }],
                rotate: [...strokes.map((_, i) => ({ to: i % 2 ? 7 : -7, duration: 75 })), { to: 0, duration: 220 }],
            })
            .add(rootRef.current, {
                rotate: [{ to: -2.2, duration: 160, ease: "outQuad" }, { to: 1.6, duration: 240 }, { to: 0, duration: 900, ease: "outElastic(1, .45)" }],
                translateY: [{ to: 2, duration: 120 }, { to: 0, duration: 500, ease: "outBack(2)" }],
            }, 0)
            .add(teaRef.current, {
                cx: [...Array.from({ length: 6 }, (_, i) => ({ to: CX + (i % 2 ? -7 : 7) * (1 - i / 7), duration: 170, ease: "inOutSine" })), { to: CX, duration: 500, ease: "outQuad" }],
                ry: [{ to: 25.5, duration: 300 }, { to: 28, duration: 900, ease: "outElastic(1, .5)" }],
            }, 0)
            .add(foamRef.current, {
                translateX: [...Array.from({ length: 6 }, (_, i) => ({ to: (i % 2 ? -6 : 6) * (1 - i / 7), duration: 170, ease: "inOutSine" })), { to: 0, duration: 500, ease: "outQuad" }],
            }, 30)
            .add(current.current, { boost: "+=1.6", duration: 2200, ease: "outCubic", onUpdate: schedule }, 0)
            .add(froth(0), { opacity: 0.9, duration: 500, ease: "outQuad" }, 150)
            .add(froth(1), {
                opacity: [0, 0.85],
                scale: [0, 1],
                duration: 560,
                delay: stagger(16, { from: "random" }),
                ease: "outBack(2)",
            }, 200)
            .add(whiskRef.current, { translateY: "-14%", translateX: "6%", rotate: 18, duration: 520, ease: "outBack(1.4)" }, "+=60")
            .add(heartRef.current, { opacity: [0, 1], scale: [0.4, 1], duration: 700, ease: "outBack(1.6)" }, "-=280");
        setTimeout(() => {
            animate(heartRef.current, { opacity: 0, duration: 900 });
            animate(whiskRef.current, { translateY: "0%", translateX: "0%", rotate: 0, duration: 700, ease: "inOutQuad" });
            animate(froth(0), { opacity: 0.55, duration: 1400 });
            animate(froth(1), { opacity: 0, scale: 0.4, duration: 1400, delay: stagger(12, { from: "random" }) });
        }, 6500);
    }

    return (
        <button
            ref={rootRef}
            className={`relative block cursor-pointer ${className}`}
            style={{ transformOrigin: "50% 95%", ...style }}
            onClick={whisk}
            aria-label="Whisk the matcha"
        >
            <Image src="/matcha/bowl.webp" alt="" width={1020} height={870} sizes={sizes} draggable={false} className="block w-full h-auto select-none drop-shadow-[0_8px_12px_rgba(62,44,30,0.18)]" />

            <svg viewBox="-24 -24 408 348" className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden>
                <defs>
                    <radialGradient id={`tea-${uid}`} cx=".45" cy=".4" r=".7">
                        <stop offset="0" stopColor="#A9C46A" />
                        <stop offset=".6" stopColor="#7FA046" />
                        <stop offset="1" stopColor="#5C7A31" />
                    </radialGradient>
                    <clipPath id={`surface-${uid}`}>
                        <ellipse cx={CX} cy={CY} rx="122" ry="28" />
                    </clipPath>
                </defs>
                <ellipse cx={CX} cy={CY} rx="122" ry="28" fill="#3B2E25" />
                <g clipPath={`url(#surface-${uid})`}>
                    <ellipse ref={teaRef} cx={CX} cy={CY} rx="122" ry="28" fill={`url(#tea-${uid})`} />
                    <g ref={foamRef}>
                        {BUBBLES.map((b, i) => {
                            const [x, y] = place(b, 0);
                            return (
                                <circle
                                    key={i}
                                    data-tier={b.tier}
                                    cx={x}
                                    cy={y}
                                    r={b.s}
                                    fill="#EAF2CC"
                                    stroke="#F8FBEA"
                                    strokeWidth="0.6"
                                    opacity={b.tier ? 0 : 0.55}
                                    style={{ transformBox: "fill-box", transformOrigin: "center" }}
                                />
                            );
                        })}
                    </g>
                    <path
                        ref={heartRef}
                        d={`M ${CX} ${CY + 17} C ${CX - 44} ${CY - 2}, ${CX - 32} ${CY - 25}, ${CX} ${CY - 11} C ${CX + 32} ${CY - 25}, ${CX + 44} ${CY - 2}, ${CX} ${CY + 17} Z`}
                        fill="#EEF4D4"
                        opacity="0"
                        style={{ transformBox: "fill-box", transformOrigin: "center" }}
                    />
                </g>
            </svg>

            <div ref={restRef} className="absolute inset-0 pointer-events-none" style={{ transformOrigin: WHISK_ORIGIN }}>
                <Image
                    ref={whiskRef}
                    src="/matcha/whisk.webp"
                    alt=""
                    width={1020}
                    height={870}
                    sizes={sizes}
                    draggable={false}
                    className="absolute inset-0 w-full h-auto select-none"
                    style={{ transformOrigin: WHISK_ORIGIN }}
                />
            </div>

            <svg ref={steamRef} viewBox="-24 -24 408 348" className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden>
                {STEAM.map((d) => (
                    <path key={d} d={d} fill="none" stroke="#FFFDF6" strokeWidth="5" strokeLinecap="round" strokeDasharray="70 40" opacity="0" />
                ))}
            </svg>
        </button>
    );
}
