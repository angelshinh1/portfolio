'use client';

import Image from "next/image";
import { useEffect, useRef } from "react";

// Classical guitar artwork, viewBox -24 -24 248 568 (public/guitar.webp); silver-wound bass, nylon treble
const NUT_Y = 60;
const SADDLE_Y = 427;
const HOLE = { left: "50%", top: `${((300 + 24) / 568) * 100}%` };
const STRINGS = Array.from({ length: 6 }, (_, i) => ({
    x0: 90 + 4 * i,
    x1: 86 + 5.6 * i,
    width: i < 3 ? 1.9 - i * 0.2 : 1.5 - (i - 3) * 0.15,
    color: i < 3 ? "#CFCBC0" : "#F3EBDA",
}));

const NOTE_COLORS = ["#FF5FA2", "#FFC15E", "#6BE38E", "#5FD4FF", "#8F7BFF", "#FF7A59"];
const GLYPHS = ["♪", "♫", "♬", "♩"];

// Same command structure at every amplitude so anime.js can morph between them
const stringPath = ({ x0, x1 }, a = 0) =>
    `M ${x0} ${NUT_Y} Q ${((x0 + x1) / 2 + a).toFixed(2)} ${(NUT_Y + SADDLE_Y) / 2} ${x1} ${SADDLE_Y}`;

// `playing` keeps the strings vibrating and notes flowing (synced to the guitar video)
export default function Guitar({ className = "", style, playing = false, interactive = true, sizes = "140px" }) {
    const rootRef = useRef(null);
    const stringRefs = useRef([]);
    const notesRef = useRef(null);
    const animeRef = useRef(null);
    const visibleRef = useRef(false);
    const hummingRef = useRef([]);

    const reduced = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const loadAnime = async () => (animeRef.current ??= await import("animejs"));

    async function pluck(i, strength = 1, delay = 0) {
        const el = stringRefs.current[i];
        if (!el) return;
        const { animate } = await loadAnime();
        const s = STRINGS[i];
        const a = (4.5 - i * 0.35) * strength;
        animate(el, {
            d: [
                { to: stringPath(s, a), duration: 70 },
                { to: stringPath(s, -a * 0.6), duration: 100 },
                { to: stringPath(s, a * 0.32), duration: 130 },
                { to: stringPath(s, -a * 0.12), duration: 170 },
                { to: stringPath(s), duration: 240 },
            ],
            delay,
            ease: "outSine",
        });
    }

    // A note floats up out of the sound hole, drifting and turning as it fades
    async function note(delay = 0) {
        const host = notesRef.current;
        if (!host) return;
        const { animate, utils } = await loadAnime();
        const el = document.createElement("span");
        el.textContent = utils.randomPick(GLYPHS);
        el.className = "absolute font-body leading-none select-none";
        Object.assign(el.style, {
            left: HOLE.left,
            top: HOLE.top,
            color: utils.randomPick(NOTE_COLORS),
            fontSize: `${utils.random(16, 26)}px`,
            textShadow: "0 0 1px #fff, 0 0 6px rgba(255,253,246,.9)",
            opacity: "0",
            translate: "-50% -50%",
        });
        host.appendChild(el);
        animate(el, {
            translateX: [0, utils.random(-70, 90)],
            translateY: [0, utils.random(-190, -120)],
            rotate: [utils.random(-30, 30), utils.random(-50, 50)],
            scale: [{ from: 0.4, to: 1.25, duration: 700, ease: "outBack" }, { to: 0.9, duration: 1400 }],
            opacity: [{ from: 0, to: 1, duration: 260 }, { to: 1, duration: 1100 }, { to: 0, duration: 800 }],
            duration: 2200,
            delay,
            ease: "outSine",
            onComplete: () => el.remove(),
        });
    }

    function strum() {
        if (reduced()) return;
        STRINGS.forEach((_, i) => pluck(i, 1, i * 45));
        for (let k = 0; k < 4; k++) note(120 + k * 140);
    }

    // Idle: every so often a single string rings and one note drifts out
    useEffect(() => {
        if (reduced()) return;
        const io = new IntersectionObserver(([e]) => { visibleRef.current = e.isIntersecting; });
        io.observe(rootRef.current);
        const idle = setInterval(() => {
            if (!visibleRef.current || playing || document.hidden) return;
            pluck(Math.floor(Math.random() * 6), 0.7);
            note();
        }, 6500);
        return () => { io.disconnect(); clearInterval(idle); };
        // pluck/note only touch refs, so they never go stale
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [playing]);

    // While the video plays, the strings shimmer and notes keep coming
    useEffect(() => {
        if (!playing || reduced()) return;
        let cancelled = false;
        let flow;
        loadAnime().then(({ animate, utils }) => {
            if (cancelled) return;
            hummingRef.current = STRINGS.map((s, i) =>
                animate(stringRefs.current[i], {
                    d: [stringPath(s, utils.random(1.2, 2.2, 2)), stringPath(s, -utils.random(1.2, 2.2, 2))],
                    duration: utils.random(55, 95),
                    ease: "inOutSine",
                    loop: true,
                    alternate: true,
                }),
            );
            flow = setInterval(() => { if (visibleRef.current) note(); }, 650);
        });
        return () => {
            cancelled = true;
            clearInterval(flow);
            hummingRef.current.forEach((a) => a.revert());
            hummingRef.current = [];
        };
        // note only touches refs, so it never goes stale
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [playing]);

    const Tag = interactive ? "button" : "div";

    return (
        <Tag
            ref={rootRef}
            className={`${/\b(absolute|fixed)\b/.test(className) ? "" : "relative"} block pointer-events-none ${interactive ? "press cursor-pointer" : ""} ${className}`}
            style={style}
            onClick={interactive ? strum : undefined}
            aria-label={interactive ? "Strum the guitar" : undefined}
            aria-hidden={interactive ? undefined : true}
        >
            {/* Only the body takes clicks, so the neck never blocks what it overlaps */}
            {interactive && <span className="absolute inset-x-0 bottom-0 h-[58%] pointer-events-auto" />}
            <Image
                src="/guitar.webp"
                alt=""
                width={620}
                height={1420}
                sizes={sizes}
                draggable={false}
                className="block w-full h-auto select-none drop-shadow-[0_8px_12px_rgba(62,44,30,0.2)]"
            />
            <svg viewBox="-24 -24 248 568" className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden>
                {STRINGS.map((s, i) => (
                    <path
                        key={i}
                        ref={(el) => { stringRefs.current[i] = el; }}
                        d={stringPath(s)}
                        fill="none"
                        stroke={s.color}
                        strokeWidth={s.width}
                        strokeLinecap="round"
                    />
                ))}
            </svg>
            <div ref={notesRef} className="absolute inset-0 pointer-events-none overflow-visible" aria-hidden />
        </Tag>
    );
}
