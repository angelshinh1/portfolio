'use client';

import { useRef } from "react";
import { Polaroid } from "./scrapbook";

// Snapshots scattered on the board. x/y are the desktop resting spots (% of the
// board); on smaller screens the board collapses to a plain grid.
const PHOTOS = [
    { n: 1, caption: "rainy downtown",    x: 1,  y: 6,  r: -5, tape: "kraft" },
    { n: 2, caption: "blue-sky day",      x: 19, y: 30, r: 3 },
    { n: 3, caption: "looking up",        x: 36, y: 2,  r: -2 },
    { n: 4, caption: "streetcar spotting", x: 54, y: 26, r: 4, tape: "clear" },
    { n: 5, caption: "that sunset",       x: 72, y: 4,  r: -3 },
    { n: 6, caption: "patio season",      x: 8,  y: 52, r: 3 },
    { n: 7, caption: "touched grass ✓",   x: 40, y: 50, r: -3 },
    { n: 8, caption: "golden hour",       x: 78, y: 48, r: 2, tape: "kraft" },
];

const DESKTOP = "(min-width: 1024px) and (hover: hover)";

// Photos can be picked up and moved with a mouse on desktop. Touch is left
// alone so swiping over the grid still scrolls the page.
export default function PhotoBoard() {
    const boardRef = useRef(null);
    const topZ = useRef(10);
    const drag = useRef(null);

    function onPointerDown(e) {
        if (e.pointerType === "touch" || e.button !== 0) return;
        if (!window.matchMedia(DESKTOP).matches) return;

        const el = e.currentTarget;
        const board = boardRef.current.getBoundingClientRect();
        const rect = el.getBoundingClientRect();
        const [tx = 0, ty = 0] = (el.style.translate || "0px 0px").split(" ").map(parseFloat);

        e.preventDefault();
        el.setPointerCapture(e.pointerId);
        el.style.zIndex = String(++topZ.current);
        el.classList.add("is-dragging");

        drag.current = {
            el,
            startX: e.clientX - tx,
            startY: e.clientY - ty,
            lastX: e.clientX,
            // Keep at least most of the photo on the board
            minX: tx + (board.left - rect.left) - rect.width * 0.25,
            maxX: tx + (board.right - rect.right) + rect.width * 0.25,
            minY: ty + (board.top - rect.top) - rect.height * 0.15,
            maxY: ty + (board.bottom - rect.bottom) + rect.height * 0.15,
        };
    }

    function onPointerMove(e) {
        const d = drag.current;
        if (!d || d.el !== e.currentTarget) return;
        const x = Math.min(d.maxX, Math.max(d.minX, e.clientX - d.startX));
        const y = Math.min(d.maxY, Math.max(d.minY, e.clientY - d.startY));
        d.el.style.translate = `${x}px ${y}px`;

        // Swing into the direction of travel, like holding a photo by a corner
        const vx = e.clientX - d.lastX;
        d.lastX = e.clientX;
        const base = parseFloat(d.el.dataset.r);
        d.el.style.rotate = `${base + Math.max(-10, Math.min(10, vx * 0.8))}deg`;
    }

    function onPointerUp(e) {
        const d = drag.current;
        if (!d || d.el !== e.currentTarget) return;
        d.el.classList.remove("is-dragging");
        d.el.style.rotate = "";
        drag.current = null;
    }

    return (
        <div
            ref={boardRef}
            className="relative grid grid-cols-2 sm:grid-cols-3 gap-x-5 gap-y-8 lg:block lg:h-[40rem]"
        >
            {PHOTOS.map((p) => (
                <Polaroid
                    key={p.n}
                    src={`/gallery-${p.n}.jpg`}
                    alt={p.caption}
                    caption={p.caption}
                    rotate={p.r}
                    tape={p.tape ?? null}
                    tapeRotate={p.r * -0.6}
                    aspect="aspect-[4/5]"
                    sizes="(max-width: 640px) 44vw, (max-width: 1024px) 28vw, 200px"
                    hover={false}
                    data-r={p.r}
                    className="drag-photo select-none lg:absolute lg:w-[12.5rem] lg:left-[var(--x)] lg:top-[var(--y)]"
                    style={{ "--x": `${p.x}%`, "--y": `${p.y}%` }}
                    onPointerDown={onPointerDown}
                    onPointerMove={onPointerMove}
                    onPointerUp={onPointerUp}
                    onPointerCancel={onPointerUp}
                />
            ))}
        </div>
    );
}
