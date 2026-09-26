// Scrapbook primitives; styles in the SCRAPBOOK block of globals.css

import { useMemo } from "react";
import Image from "next/image";

// Small deterministic PRNG — a seed always yields the same tear.
function mulberry32(seed) {
    let a = seed >>> 0;
    return () => {
        a = (a + 0x6d2b79f5) >>> 0;
        let t = a;
        t = Math.imul(t ^ (t >>> 15), t | 1);
        t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
}

// Tear depth in px so every scrap looks equally ragged
export function tornClip(seed = 1, edges = "all", depth = 5, teeth = 44) {
    const r = mulberry32(seed);
    const on = (e) => edges === "all" || edges.includes(e);
    const j = () => (r() * depth).toFixed(1);
    const H = teeth; // teeth along top/bottom
    const V = 26; // teeth along the sides
    const pts = [];

    if (on("top")) for (let i = 0; i <= H; i++) pts.push(`${((i / H) * 100).toFixed(2)}% ${j()}px`);
    else pts.push("0 0", "100% 0");

    if (on("right")) for (let i = 1; i < V; i++) pts.push(`calc(100% - ${j()}px) ${((i / V) * 100).toFixed(2)}%`);

    if (on("bottom")) for (let i = H; i >= 0; i--) pts.push(`${((i / H) * 100).toFixed(2)}% calc(100% - ${j()}px)`);
    else pts.push("100% 100%", "0 100%");

    if (on("left")) for (let i = V - 1; i > 0; i--) pts.push(`${j()}px ${((i / V) * 100).toFixed(2)}%`);

    return `polygon(${pts.join(",")})`;
}

// Outer carries tilt + drop-shadow, inner is the clipped paper, `decor` sits outside the clip
export function Paper({
    as: Tag = "div",
    variant = "cream",
    tear = "all",
    seed = 1,
    depth = 5,
    teeth,
    rotate = 0,
    hover = false,
    className = "",
    innerClassName = "",
    style,
    decor,
    children,
    ref,
    ...rest
}) {
    const clipPath = useMemo(() => (tear ? tornClip(seed, tear, depth, teeth) : undefined), [seed, tear, depth, teeth]);
    return (
        <Tag
            ref={ref}
            className={`scrap ${hover ? "scrap-hover" : ""} ${className}`}
            style={{ "--r": `${rotate}deg`, ...style }}
            {...rest}
        >
            <div className={`paper paper-${variant} ${innerClassName}`} style={{ clipPath }}>
                {children}
            </div>
            {decor}
        </Tag>
    );
}

// Rotation uses the `rotate` property so it composes with Tailwind translates
export function Tape({ variant = "washi", rotate = -4, width = 96, className = "", style }) {
    return (
        <span
            aria-hidden
            className={`tape tape-${variant} ${className}`}
            style={{ rotate: `${rotate}deg`, width, ...style }}
        />
    );
}

export function Polaroid({
    src,
    alt,
    caption,
    rotate = 0,
    sizes = "(max-width: 768px) 45vw, 220px",
    aspect = "aspect-square",
    tape = "washi",
    tapeRotate = -3,
    priority = false,
    hover = true,
    className = "",
    style,
    children,
    ...rest
}) {
    return (
        <figure
            className={`scrap polaroid ${hover ? "scrap-hover" : ""} ${className}`}
            style={{ "--r": `${rotate}deg`, ...style }}
            {...rest}
        >
            <div className={`relative ${aspect} overflow-hidden bg-[var(--bg-grain)]`}>
                {children ?? (
                    <Image src={src} alt={alt} fill sizes={sizes} priority={priority} draggable={false} className="object-cover select-none" />
                )}
            </div>
            {caption && (
                <figcaption className="font-hand text-center text-[1.35rem] text-[var(--ink-brown)] pt-2 pb-3 px-1 leading-none">
                    {caption}
                </figcaption>
            )}
            {tape && <Tape variant={tape} rotate={tapeRotate} width={84} className="absolute -top-3 left-1/2 -translate-x-1/2" />}
        </figure>
    );
}

// Perforated postage stamp. Children fill the printed area.
export function Stamp({ children, rotate = 0, className = "", innerClassName = "" }) {
    return (
        <div aria-hidden className={`stamp ${className}`} style={{ rotate: `${rotate}deg` }}>
            <div className={`stamp-inner ${innerClassName}`}>{children}</div>
        </div>
    );
}

// Circular ink postmark with wavy cancellation lines trailing off to the right.
export function Postmark({ top = "TORONTO", bottom = "ON · 2026", middle = "★", className = "", rotate = -12 }) {
    return (
        <svg
            aria-hidden
            viewBox="0 0 220 120"
            className={`postmark ${className}`}
            style={{ rotate: `${rotate}deg` }}
        >
            <defs>
                <path id="pm-top" d="M 20 60 A 40 40 0 0 1 100 60" />
                <path id="pm-bottom" d="M 16 60 A 44 44 0 0 0 104 60" />
            </defs>
            <circle cx="60" cy="60" r="52" fill="none" stroke="currentColor" strokeWidth="2.5" />
            <circle cx="60" cy="60" r="34" fill="none" stroke="currentColor" strokeWidth="1.5" />
            <text fontSize="13" letterSpacing="3" fill="currentColor" fontFamily="var(--font-type)">
                <textPath href="#pm-top" startOffset="50%" textAnchor="middle">{top}</textPath>
            </text>
            <text fontSize="11" letterSpacing="2" fill="currentColor" fontFamily="var(--font-type)">
                <textPath href="#pm-bottom" startOffset="50%" textAnchor="middle" dominantBaseline="hanging">{bottom}</textPath>
            </text>
            <text x="60" y="66" fontSize="16" textAnchor="middle" fill="currentColor">{middle}</text>
            {[0, 1, 2, 3].map((i) => (
                <path
                    key={i}
                    d={`M 118 ${36 + i * 16} q 12 -7 24 0 t 24 0 t 24 0 t 24 0`}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                />
            ))}
        </svg>
    );
}

// Hand-drawn arrow. Points right by default; rotate/flip it with classes.
export function DoodleArrow({ className = "", style }) {
    return (
        <svg aria-hidden viewBox="0 0 120 60" fill="none" className={className} style={style}>
            <path
                d="M4 44 C 26 12, 62 6, 104 24"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
            />
            <path d="M88 12 L 106 25 L 86 34" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}

// A dashed "cut here" line with scissors partway along — the section divider.
export function CutLine({ className = "" }) {
    return (
        <div aria-hidden className={`relative flex items-center ${className}`}>
            <span className="cut-line flex-1" />
            <i className="ti ti-scissors text-[1.35rem] text-[var(--ink-sepia)] mx-3 -scale-x-100" />
            <span className="cut-line w-[12%]" />
        </div>
    );
}

export function PaperClip({ className = "", style }) {
    return (
        <svg aria-hidden viewBox="0 0 30 80" fill="none" className={className} style={style}>
            <path
                d="M20 22 V 62 a 7 7 0 0 1 -14 0 V 14 a 10 10 0 0 1 20 0 V 58 a 4 4 0 0 1 -8 0 V 24"
                stroke="#8C9488"
                strokeWidth="3"
                strokeLinecap="round"
            />
            <path
                d="M20 22 V 62 a 7 7 0 0 1 -14 0 V 14 a 10 10 0 0 1 20 0 V 58 a 4 4 0 0 1 -8 0 V 24"
                stroke="#E6EAE2"
                strokeWidth="1"
                strokeLinecap="round"
                transform="translate(-0.6 -0.6)"
            />
        </svg>
    );
}

// A pressed sprig — the dried-flower gesture, drawn in ink.
export function Sprig({ className = "", style }) {
    return (
        <svg aria-hidden viewBox="0 0 80 160" fill="none" className={className} style={style}>
            <path d="M40 158 C 38 120, 44 80, 40 8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            {[
                [40, 130, -1], [41, 110, 1], [41, 90, -1], [42, 72, 1], [41, 54, -1], [41, 38, 1], [40, 22, -1],
            ].map(([x, y, s], i) => (
                <path
                    key={i}
                    d={`M${x} ${y} q ${s * 16} -4 ${s * 22} -18 q ${s * -14} 2 ${s * -22} 18 z`}
                    fill="currentColor"
                    fillOpacity="0.22"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    strokeLinejoin="round"
                />
            ))}
            <circle cx="40" cy="8" r="4" fill="currentColor" fillOpacity="0.35" stroke="currentColor" strokeWidth="1.2" />
        </svg>
    );
}
