'use client';

import Image from "next/image";
import { useEffect, useId, useImperativeHandle, useRef, useState } from "react";

// Artwork canvas is viewBox -24 -24 448 408; every layer in public/camera shares it
const CX = 200;
const CY = 228;
const GLASS = 44;
const ORIGIN = "50% 61.76%";

// Lens parts, back to front, and where each one flies to when the lens comes apart
const PARTS = [
    { src: "/camera/focus.webp", x: -0.07, y: 0.06, scale: 1.04, rotate: -50 },
    { src: "/camera/aperture.webp", x: -0.14, y: 0.12, scale: 1.08, rotate: 70 },
    { src: "/camera/bezel.webp", x: -0.21, y: 0.18, scale: 1.12, rotate: -35 },
];
const GLASS_PART = { x: -0.28, y: 0.24, scale: 1.16, rotate: 0 };
const BODY_PART = { x: 0.03, y: -0.025, scale: 0.98, rotate: 0 };

// Multicoated-glass reflections: soft glows that drift over the front element
const COATING = [
    { r: 30, from: 285, to: 345, color: "#FF5FA2", width: 11 },
    { r: 22, from: 300, to: 350, color: "#8F7BFF", width: 8 },
    { r: 31, from: 105, to: 160, color: "#6BE38E", width: 10 },
    { r: 20, from: 120, to: 165, color: "#FFC15E", width: 7 },
    { r: 9, from: 0, to: 300, color: "#5FD4FF", width: 5 },
];

const SPECTRUM = ["#FF5FA2", "#FF7A59", "#FFC15E", "#C9E86B", "#6BE38E", "#5FD4FF", "#6F9BFF", "#8F7BFF", "#C46BFF", "#FF5FD0"];
const RING_R = 46;
const SEG = (2 * Math.PI * RING_R) / SPECTRUM.length;

function arc(r, a0, a1) {
    const p = (a) => {
        const t = (a * Math.PI) / 180;
        return `${(CX + r * Math.cos(t)).toFixed(2)} ${(CY + r * Math.sin(t)).toFixed(2)}`;
    };
    return `M ${p(a0)} A ${r} ${r} 0 0 1 ${p(a1)}`;
}

// Glass disc with an octagonal iris cut out; same point count at every size so anime.js can morph it
function irisPath(open) {
    const pts = [];
    for (let i = 0; i < 8; i++) {
        const t = ((i * 45 + 22.5) * Math.PI) / 180;
        pts.push(`${(CX + open * Math.cos(t)).toFixed(2)} ${(CY + open * Math.sin(t)).toFixed(2)}`);
    }
    const disc = `M ${CX - GLASS} ${CY} A ${GLASS} ${GLASS} 0 1 0 ${CX + GLASS} ${CY} A ${GLASS} ${GLASS} 0 1 0 ${CX - GLASS} ${CY} Z`;
    return `${disc} M ${pts.join(" L ")} Z`;
}

const SPARKS = ["#FF5FA2", "#FFC15E", "#6BE38E", "#5FD4FF", "#8F7BFF"];

// A little print that flies out of the camera, lands, and develops from blank to the photo
function Print({ src, x, y, r, onDone }) {
    const ref = useRef(null);
    const devRef = useRef(null);
    const sparkRef = useRef(null);

    useEffect(() => {
        let alive = true;
        import("animejs").then(({ createTimeline, animate, stagger, utils }) => {
            if (!alive) return;
            const sparkle = () => {
                const host = sparkRef.current;
                if (!host) return;
                const stars = SPARKS.concat(SPARKS.slice(0, 2)).map((color, i) => {
                    const el = document.createElement("span");
                    el.textContent = i % 2 ? "\u2726" : "\u2727";
                    Object.assign(el.style, {
                        position: "absolute", left: "50%", top: "45%", color,
                        fontSize: `${utils.random(10, 16)}px`, lineHeight: "1", translate: "-50% -50%",
                    });
                    host.appendChild(el);
                    return el;
                });
                animate(stars, {
                    translateX: () => utils.random(-62, 62),
                    translateY: () => utils.random(-70, 50),
                    scale: [{ from: 0, to: 1.2, duration: 380, ease: "outBack" }, { to: 0, duration: 520, ease: "inQuad" }],
                    rotate: () => utils.random(-120, 120),
                    delay: stagger(45),
                    ease: "outCubic",
                    onComplete: () => stars.forEach((el) => el.remove()),
                });
            };
            createTimeline({ onComplete: onDone })
                .add(ref.current, {
                    translateY: [34, -26],
                    scale: [0.5, 0.62],
                    opacity: [0, 1],
                    duration: 420,
                    ease: "outQuad",
                })
                .add(ref.current, {
                    translateX: x,
                    translateY: y,
                    rotate: [0, r],
                    scale: 1,
                    duration: 850,
                    ease: "outBack(1.5)",
                })
                .add(devRef.current, { opacity: [1, 0], duration: 2400, ease: "inOutQuad" }, "-=250")
                .call(sparkle)
                .add(ref.current, { opacity: 0, translateY: y + 18, rotate: r * 1.4, duration: 700, ease: "inQuad" }, "+=2600");
        });
        return () => { alive = false; };
        // runs once per print
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div
            ref={ref}
            className="absolute z-20 w-[74px] pointer-events-none"
            style={{ left: "50%", top: "22%", translate: "-50% -50%", opacity: 0 }}
        >
            <div ref={sparkRef} className="absolute inset-0 overflow-visible" />
            <div className="bg-[#FDFCF8] p-1 pb-4 shadow-[0_2px_4px_rgba(62,44,30,0.18),0_8px_16px_rgba(62,44,30,0.14)]">
                <div className="relative aspect-[4/5] overflow-hidden">
                    <Image src={src} alt="" fill sizes="80px" className="object-cover" />
                    <div ref={devRef} className="absolute inset-0" style={{ background: "linear-gradient(160deg, #F3ECDD, #E0D3B8)" }} />
                </div>
            </div>
        </div>
    );
}

const IRIS_OPEN = 62;
const IRIS_SHUT = 2;
const layerStyle = { transformOrigin: ORIGIN };

// `interactive`: click runs the shot; `prints`: photos it prints; `onShot(n)` after each print
export default function Camera({ className = "", style, live = true, interactive = false, prints, onShot, label = "Take a photo", apiRef, priority = false, sizes = "240px" }) {
    const rootRef = useRef(null);
    const bodyRef = useRef(null);
    const partRefs = useRef([]);
    const spinRefs = useRef([]);
    const glassRef = useRef(null);
    const irisRef = useRef(null);
    const coatRef = useRef(null);
    const ringRef = useRef(null);
    const glintRef = useRef(null);
    const animeRef = useRef(null);
    const busyRef = useRef(false);
    const fxRef = useRef(null);
    const shakeRef = useRef(null);
    const crankRef = useRef(null);
    const sheenRef = useRef(null);
    const turnsRef = useRef(0);
    const visibleRef = useRef(false);
    const printCount = useRef(0);
    const [printed, setPrinted] = useState([]);
    const uid = useId().replace(/[^a-zA-Z0-9]/g, "");

    const reduced = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const loadAnime = async () => (animeRef.current ??= await import("animejs"));

    async function wind(turns = 1, duration = 1300) {
        if (!crankRef.current || reduced()) return;
        const { animate } = await loadAnime();
        turnsRef.current += turns;
        animate(crankRef.current, { rotate: turnsRef.current * 360, duration: duration * turns, ease: "inOutCubic" });
    }

    async function shutter() {
        if (!irisRef.current || reduced()) return;
        const { animate } = await loadAnime();
        animate(irisRef.current, {
            d: [
                { to: irisPath(IRIS_SHUT), duration: 160, ease: "inQuad" },
                { to: irisPath(IRIS_OPEN), duration: 520, ease: "outQuart" },
            ],
        });
    }

    // The lens slides apart along its axis, ring by ring, then springs back together
    async function explode({ fast = false } = {}) {
        if (busyRef.current || !rootRef.current || reduced()) return;
        busyRef.current = true;
        const { createTimeline, stagger } = await loadAnime();
        const w = rootRef.current.offsetWidth;
        const moving = [bodyRef.current, ...partRefs.current, glassRef.current];
        const spec = [BODY_PART, ...PARTS, GLASS_PART];
        const at = (key) => (_, i) => (key === "x" || key === "y" ? spec[i][key] * w : spec[i][key]);
        const t = fast ? 0.72 : 1;

        const tl = createTimeline({ onComplete: () => { busyRef.current = false; } })
            .add(moving, {
                translateX: at("x"),
                translateY: at("y"),
                scale: at("scale"),
                rotate: at("rotate"),
                duration: 800 * t,
                ease: "outExpo",
                delay: stagger(70 * t),
            })
            .add(moving, {
                translateX: 0,
                translateY: 0,
                scale: 1,
                rotate: 0,
                duration: 1200 * t,
                ease: "outElastic(1, .7)",
                delay: stagger(70 * t, { from: "last" }),
            }, `+=${260 * t}`)
            .call(shutter, "-=900");
        return tl;
    }

    function print() {
        if (!prints?.length || reduced()) return;
        const n = printCount.current++;
        onShot?.(n + 1);
        setTimeout(() => wind(2, 700), 400);
        const side = n % 2 ? 1 : -1;
        setPrinted((list) => [
            ...list.slice(-2),
            {
                id: n,
                src: prints[n % prints.length],
                ...(window.matchMedia("(max-width: 1023px)").matches
                    ? { x: side * (rootRef.current.offsetWidth * 0.5 + 30 + Math.random() * 12), y: -40 - Math.random() * 25 }
                    : { x: side * (40 + Math.random() * 50), y: -150 - Math.random() * 40 }),
                r: side * (6 + Math.random() * 10),
            },
        ]);
    }

    // Press, snap, ripple, lens apart, print: one shot
    async function click() {
        if (busyRef.current) return;
        if (reduced()) { print(); return; }
        const anime = await loadAnime();
        anime.animate(shakeRef.current, {
            scaleY: [{ to: 0.93, duration: 90, ease: "outQuad" }, { to: 1, duration: 700, ease: "outElastic(1, .45)" }],
            scaleX: [{ to: 1.04, duration: 90, ease: "outQuad" }, { to: 1, duration: 700, ease: "outElastic(1, .45)" }],
        });
        shutter();
        setTimeout(() => explode(), 220);
        setTimeout(print, 1000);
    }

    useImperativeHandle(apiRef, () => ({ shutter, explode }));

    // Idle: the crank winds a turn now and then, and light travels around the chrome rim
    useEffect(() => {
        if (!live || reduced()) return;
        const io = new IntersectionObserver(([e]) => { visibleRef.current = e.isIntersecting; });
        io.observe(rootRef.current);
        let sheen;
        loadAnime().then(({ animate }) => {
            if (!sheenRef.current) return;
            sheen = animate(sheenRef.current, { rotate: 360, duration: 7000, ease: "linear", loop: true });
        });
        const timer = setInterval(() => {
            if (visibleRef.current && !document.hidden && !busyRef.current) wind();
        }, 5200);
        return () => { io.disconnect(); clearInterval(timer); sheen?.revert(); };
        // wind only touches refs, so it never goes stale
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [live]);

    useEffect(() => {
        if (!live || reduced()) return;

        let cancelled = false;
        const running = [];
        let blink;

        loadAnime().then(({ animate, stagger }) => {
            if (cancelled) return;

            running.push(
                // Focus and aperture rings rock against each other, like someone pulling focus
                animate(spinRefs.current[0], { rotate: [-16, 16], duration: 3400, ease: "inOutSine", loop: true, alternate: true }),
                animate(spinRefs.current[1], { rotate: [12, -12], duration: 4300, ease: "inOutSine", loop: true, alternate: true }),
                animate(coatRef.current, { rotate: 360, duration: 26000, ease: "linear", loop: true }),
                animate(coatRef.current.querySelectorAll("path"), {
                    opacity: [{ to: 0.95 }, { to: 0.3 }],
                    duration: 2400,
                    delay: stagger(380),
                    ease: "inOutSine",
                    loop: true,
                    alternate: true,
                }),
                animate(ringRef.current, { rotate: -360, duration: 14000, ease: "linear", loop: true }),
                // The iridescent rim slides in colour by colour
                animate(ringRef.current.querySelectorAll("circle"), {
                    strokeDashoffset: (_, i) => [-SEG * i + SEG, -SEG * i],
                    opacity: [0, 1],
                    duration: 900,
                    delay: stagger(90),
                    ease: "outQuad",
                }),
                animate(glintRef.current, {
                    scale: [{ from: 0, to: 1, duration: 420, ease: "outBack" }, { to: 0, duration: 520, ease: "inQuad" }],
                    rotate: [{ from: 0, to: 90, duration: 940 }],
                    loop: true,
                    loopDelay: 3200,
                }),
            );

            blink = setInterval(shutter, 9000);
        });

        return () => {
            cancelled = true;
            clearInterval(blink);
            running.forEach((a) => a.revert());
        };
        // shutter only touches refs, so it never goes stale
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [live]);

    const Tag = interactive ? "button" : "div";

    return (
        <Tag
            ref={rootRef}
            className={`${/\b(absolute|fixed)\b/.test(className) ? "" : "relative"} block ${interactive ? "press cursor-pointer" : ""} ${className}`}
            style={style}
            onClick={interactive ? click : undefined}
            aria-label={interactive ? label : undefined}
            aria-hidden={interactive ? undefined : true}
        >
            <div ref={shakeRef} className="relative" style={{ transformOrigin: "50% 90%" }}>
            <div ref={bodyRef} className="relative" style={layerStyle}>
                <Image
                    src="/camera/body.webp"
                    alt=""
                    width={1120}
                    height={1020}
                    sizes={sizes}
                    priority={priority}
                    draggable={false}
                    className="block w-full h-auto select-none drop-shadow-[0_8px_12px_rgba(62,44,30,0.18)]"
                />
                <Image
                    ref={crankRef}
                    src="/camera/crank.webp"
                    alt=""
                    width={1120}
                    height={1020}
                    sizes={sizes}
                    priority={priority}
                    draggable={false}
                    className="absolute inset-0 w-full h-auto select-none pointer-events-none"
                    style={{ transformOrigin: "85.04% 48.28%" }}
                />
                <svg viewBox="-24 -24 448 408" className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden>
                    <g ref={sheenRef} style={{ transformBox: "view-box", transformOrigin: `${CX}px ${CY}px` }}>
                        <circle
                            cx={CX}
                            cy={CY}
                            r="95"
                            fill="none"
                            stroke="#FFFFFF"
                            strokeWidth="3.5"
                            strokeLinecap="round"
                            strokeDasharray="34 563"
                            opacity="0.85"
                        />
                        <circle
                            cx={CX}
                            cy={CY}
                            r="95"
                            fill="none"
                            stroke="#FFFFFF"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeDasharray="12 585"
                            strokeDashoffset="-300"
                            opacity="0.5"
                        />
                    </g>
                </svg>
            </div>

            {PARTS.map((part, i) => (
                <div
                    key={part.src}
                    ref={(el) => { partRefs.current[i] = el; }}
                    className="absolute inset-0 pointer-events-none"
                    style={layerStyle}
                >
                    <Image
                        ref={(el) => { spinRefs.current[i] = el; }}
                        src={part.src}
                        alt=""
                        width={1120}
                        height={1020}
                        sizes={sizes}
                        priority={priority}
                        draggable={false}
                        className="block w-full h-auto select-none drop-shadow-[0_3px_4px_rgba(20,16,12,0.35)]"
                        style={layerStyle}
                    />
                </div>
            ))}

            <div ref={glassRef} className="absolute inset-0 pointer-events-none" style={layerStyle}>
                <svg viewBox="-24 -24 448 408" className="w-full h-full" aria-hidden>
                    <defs>
                        <clipPath id={`glass-${uid}`}>
                            <circle cx={CX} cy={CY} r={GLASS} />
                        </clipPath>
                        <radialGradient id={`tint-${uid}`} cx=".38" cy=".32" r=".8">
                            <stop offset="0" stopColor="#3E4D6E" />
                            <stop offset=".45" stopColor="#141A28" />
                            <stop offset="1" stopColor="#05070B" />
                        </radialGradient>
                        <filter id={`soft-${uid}`} x="-20%" y="-20%" width="140%" height="140%">
                            <feGaussianBlur stdDeviation="3" />
                        </filter>
                    </defs>

                    <circle cx={CX} cy={CY} r="48" fill="#0B0C0F" stroke="#2B211A" strokeWidth="1.5" />
                    <circle cx={CX} cy={CY} r={GLASS} fill={`url(#tint-${uid})`} />

                    <g clipPath={`url(#glass-${uid})`}>
                        <path ref={irisRef} d={irisPath(IRIS_OPEN)} fill="#07080B" fillRule="evenodd" fillOpacity="0.94" />
                        <g
                            ref={coatRef}
                            filter={`url(#soft-${uid})`}
                            style={{ mixBlendMode: "screen", transformBox: "view-box", transformOrigin: `${CX}px ${CY}px` }}
                        >
                            {COATING.map((c) => (
                                <path
                                    key={c.color}
                                    d={arc(c.r, c.from, c.to)}
                                    fill="none"
                                    stroke={c.color}
                                    strokeWidth={c.width}
                                    strokeLinecap="round"
                                    opacity={0.7}
                                />
                            ))}
                        </g>
                    </g>

                    <path
                        d={`M ${CX - 30} ${CY - 22} A 36 36 0 0 1 ${CX + 6} ${CY - 38}`}
                        fill="none"
                        stroke="#FFFFFF"
                        strokeWidth="4"
                        strokeOpacity=".5"
                        strokeLinecap="round"
                    />

                    <g
                        ref={ringRef}
                        style={{ mixBlendMode: "screen", transformBox: "view-box", transformOrigin: `${CX}px ${CY}px` }}
                        opacity="0.6"
                    >
                        {SPECTRUM.map((color, i) => (
                            <circle
                                key={color}
                                cx={CX}
                                cy={CY}
                                r={RING_R}
                                fill="none"
                                stroke={color}
                                strokeWidth="1.6"
                                strokeDasharray={`${SEG + 0.5} ${2 * Math.PI * RING_R}`}
                                strokeDashoffset={-SEG * i}
                            />
                        ))}
                    </g>

                    <path
                        ref={glintRef}
                        d={`M ${CX - 22} ${CY - 34} l 2 6 l 6 2 l -6 2 l -2 6 l -2 -6 l -6 -2 l 6 -2 Z`}
                        fill="#FFF6DA"
                        style={{ transformBox: "fill-box", transformOrigin: "center", transform: live ? "scale(0)" : "none" }}
                    />
                </svg>
            </div>

            </div>

            <div ref={fxRef} className="absolute inset-0 z-10 pointer-events-none overflow-visible" aria-hidden />
            {printed.map((p) => (
                <Print key={p.id} {...p} onDone={() => setPrinted((list) => list.filter((q) => q.id !== p.id))} />
            ))}
        </Tag>
    );
}
