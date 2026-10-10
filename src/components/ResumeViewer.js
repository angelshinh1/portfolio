'use client';

import { useCallback, useEffect, useRef, useState } from "react";
import { tornClip } from "./scrapbook";
import { RESUME_URL, RESUME_FILENAME } from "@/lib/resume";

// Zoom is a multiple of the fit-to-screen width
const ZOOMS = [1, 1.25, 1.5, 2, 2.5];
const MAX_SHEET = 880;
const SHEET_CLIP = tornClip(11, "all", 3, 90);
const BAR_CLIP = tornClip(17, ["bottom"], 3, 60);

// pdf.js and the parsed document are loaded once and shared
let docPromise = null;
function loadResume() {
    if (!docPromise) {
        docPromise = Promise.all([import("pdfjs-dist/legacy/build/pdf.mjs"), import("pdfjs-dist/legacy/build/pdf.worker.min.mjs")])
            .then(async ([pdfjs, worker]) => {
                pdfjs.GlobalWorkerOptions.workerSrc = worker.default;
                const doc = await pdfjs.getDocument({ url: new URL(RESUME_URL, window.location.href).href }).promise;
                const page = await doc.getPage(1);
                const [annotations, text] = await Promise.all([page.getAnnotations(), page.getTextContent()]);
                const [, , w, h] = page.view;
                const links = annotations
                    .filter((a) => a.subtype === "Link" && a.url)
                    .map((a) => ({
                        url: a.url,
                        left: (a.rect[0] / w) * 100,
                        top: ((h - a.rect[3]) / h) * 100,
                        width: ((a.rect[2] - a.rect[0]) / w) * 100,
                        height: ((a.rect[3] - a.rect[1]) / h) * 100,
                    }));
                return { pdfjs, page, text, links, w, h };
            })
            .catch((err) => {
                docPromise = null;
                throw err;
            });
    }
    return docPromise;
}

// Plain left clicks on resume links open the viewer; modified clicks keep the browser default
function resumeAnchor(event) {
    const a = event.target.closest?.("a[href]");
    if (!a || a.hasAttribute("download") || a.closest("[data-resume-viewer]")) return null;
    return new URL(a.href, window.location.href).pathname === RESUME_URL ? a : null;
}

export default function ResumeViewer() {
    // closed → opening → open → closing → closed
    const [phase, setPhase] = useState("closed");
    const open = phase !== "closed";
    const shown = phase === "open";
    const [zoom, setZoom] = useState(0);
    const [fit, setFit] = useState(MAX_SHEET);
    const [data, setData] = useState(null);
    const [failed, setFailed] = useState(false);

    const canvasRef = useRef(null);
    const textRef = useRef(null);
    const closeRef = useRef(null);
    const returnFocus = useRef(null);

    const close = useCallback(() => setPhase((p) => (p === "closed" ? p : "closing")), []);

    // Intercept resume links anywhere on the site; warm pdf.js on hover
    useEffect(() => {
        const onClick = (e) => {
            if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
            const a = resumeAnchor(e);
            if (!a) return;
            e.preventDefault();
            returnFocus.current = a;
            setPhase((p) => (p === "closed" ? "opening" : p));
        };
        const onHover = (e) => {
            if (resumeAnchor(e)) loadResume().catch(() => {});
        };
        document.addEventListener("click", onClick);
        document.addEventListener("pointerover", onHover);
        document.addEventListener("focusin", onHover);
        return () => {
            document.removeEventListener("click", onClick);
            document.removeEventListener("pointerover", onHover);
            document.removeEventListener("focusin", onHover);
        };
    }, []);

    // Mount, then show on the next frame so the sheet animates in
    useEffect(() => {
        if (phase !== "opening") return;
        setFailed(false);
        loadResume().then(setData, (err) => { console.error(err); setFailed(true); });
        const raf = requestAnimationFrame(() => requestAnimationFrame(() => setPhase("open")));
        return () => cancelAnimationFrame(raf);
    }, [phase]);

    // Unmount after the exit transition
    useEffect(() => {
        if (phase !== "closing") return;
        const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        const t = setTimeout(() => {
            setPhase("closed");
            setZoom(0);
            returnFocus.current?.focus?.({ preventScroll: true });
        }, reduced ? 0 : 260);
        return () => clearTimeout(t);
    }, [phase]);

    // Lock the page behind and take keyboard focus while open
    useEffect(() => {
        if (!open) return;
        const html = document.documentElement;
        const prev = html.style.overflow;
        html.style.overflow = "hidden";
        closeRef.current?.focus({ preventScroll: true });

        const onKey = (e) => {
            if (e.key === "Escape") close();
            else if (e.key === "+" || e.key === "=") setZoom((z) => Math.min(z + 1, ZOOMS.length - 1));
            else if (e.key === "-") setZoom((z) => Math.max(z - 1, 0));
        };
        window.addEventListener("keydown", onKey);
        return () => {
            window.removeEventListener("keydown", onKey);
            html.style.overflow = prev;
        };
    }, [open, close]);

    // Fit width follows the viewport
    useEffect(() => {
        if (!open) return;
        const measure = () => setFit(Math.min(MAX_SHEET, window.innerWidth - (window.innerWidth < 640 ? 32 : 96)));
        measure();
        window.addEventListener("resize", measure);
        return () => window.removeEventListener("resize", measure);
    }, [open]);

    const width = Math.round(fit * ZOOMS[zoom]);

    // Redraw on resize and on every reopen, since each open mounts a fresh canvas
    useEffect(() => {
        if (!data || !canvasRef.current || !textRef.current) return;
        let task = null;
        let textLayer = null;
        const t = setTimeout(() => {
            const { pdfjs, page, text, w } = data;
            const scale = width / w;
            // Extra resolution on touch screens so pinch-zoom stays sharp
            const touch = window.matchMedia("(pointer: coarse)").matches;
            const dpr = Math.min((window.devicePixelRatio || 1) * (touch ? 2 : 1), 4096 / width);
            const canvas = canvasRef.current;
            const viewport = page.getViewport({ scale });
            canvas.width = Math.floor(viewport.width * dpr);
            canvas.height = Math.floor(viewport.height * dpr);
            task = page.render({
                canvas,
                viewport,
                transform: [dpr, 0, 0, dpr, 0, 0],
            });
            task.promise.catch(() => {});

            const container = textRef.current;
            container.replaceChildren();
            container.style.setProperty("--total-scale-factor", String(scale));
            textLayer = new pdfjs.TextLayer({ textContentSource: text, container, viewport });
            textLayer.render().catch(() => {});
        }, 90);
        return () => {
            clearTimeout(t);
            task?.cancel();
            textLayer?.cancel();
        };
    }, [data, width, open]);

    if (!open) return null;

    const aspect = data ? `${data.w} / ${data.h}` : "612 / 792";

    return (
        <div
            data-resume-viewer
            role="dialog"
            aria-modal="true"
            aria-label="Resume"
            className="resume-viewer"
            data-shown={shown ? "" : undefined}
        >
            <div
                className="resume-scroll"
                onClick={(e) => { if (e.target === e.currentTarget || e.target.dataset.backdrop != null) close(); }}
            >
                <div data-backdrop className="resume-stage" style={{ width: Math.max(width, fit) }}>
                    <div className="resume-sheet scrap" style={{ width }}>
                        <div className="paper paper-cream relative" style={{ clipPath: SHEET_CLIP, aspectRatio: aspect }}>
                            <canvas ref={canvasRef} className="resume-ink absolute inset-0 w-full h-full" aria-hidden />
                            <div ref={textRef} className="textLayer" />
                            {data?.links.map((l) => (
                                <a
                                    key={l.url + l.top}
                                    href={l.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="resume-link"
                                    style={{ left: `${l.left}%`, top: `${l.top}%`, width: `${l.width}%`, height: `${l.height}%` }}
                                    aria-label={l.url.replace(/^mailto:|^https?:\/\//, "")}
                                />
                            ))}
                            {!data && (
                                <p className="font-hand absolute inset-0 flex items-center justify-center text-[1.6rem] text-[var(--ink-sepia)]">
                                    {failed ? (
                                        <a href={RESUME_URL} download={RESUME_FILENAME} className="underline">couldn&apos;t load it, grab the PDF instead</a>
                                    ) : "unfolding the paper…"}
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Controls on a torn strip, same paper as the navbar */}
            <div className="resume-bar scrap">
                <div className="paper paper-cream flex items-center gap-1 sm:gap-2 pl-3 pr-2 py-1.5 font-type text-[0.85rem] text-[var(--ink-brown)]" style={{ clipPath: BAR_CLIP }}>
                    <button type="button" className="resume-btn" onClick={() => setZoom((z) => Math.max(z - 1, 0))} disabled={zoom === 0} aria-label="Zoom out">
                        <i className="ti ti-minus" aria-hidden />
                    </button>
                    <span className="w-[3.2rem] text-center tabular-nums" aria-live="polite">{Math.round(ZOOMS[zoom] * 100)}%</span>
                    <button type="button" className="resume-btn" onClick={() => setZoom((z) => Math.min(z + 1, ZOOMS.length - 1))} disabled={zoom === ZOOMS.length - 1} aria-label="Zoom in">
                        <i className="ti ti-plus" aria-hidden />
                    </button>
                    <span className="w-px h-5 bg-[rgba(62,44,30,0.2)] mx-1" aria-hidden />
                    <a href={RESUME_URL} download={RESUME_FILENAME} className="resume-btn gap-1.5 px-2">
                        <i className="ti ti-download" aria-hidden />
                        <span className="max-sm:hidden">Download</span>
                    </a>
                    <button ref={closeRef} type="button" className="resume-btn" onClick={close} aria-label="Close resume">
                        <i className="ti ti-x" aria-hidden />
                    </button>
                </div>
            </div>
        </div>
    );
}
