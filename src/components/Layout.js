'use client';

import { useEffect } from "react";
import { useRouter } from "next/router";
import Lenis from "lenis";
import ScrollTrigger from "gsap/ScrollTrigger";
import gsap from "gsap";
import Footer from "./Footer";
import Navbar from "./Navbar";
import ResumeViewer from "./ResumeViewer";
import ticker from "@/lib/ticker";
import { setLenis, scrollToHashWhenReady } from "@/lib/scroll";

gsap.registerPlugin(ScrollTrigger);

export default function Layout(props) {
    const router = useRouter();

    // ── Smooth scrolling ──────────────────────────────────────────────────────
    useEffect(() => {
        if (typeof window === "undefined") return;
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

        const lenis = new Lenis({ autoRaf: false });
        setLenis(lenis);

        function onTick() {
            lenis.raf(performance.now());
        }
        ticker.add(onTick);

        // Keep ScrollTrigger in sync with Lenis's virtual scroll
        lenis.on("scroll", ScrollTrigger.update);

        return () => {
            ticker.remove(onTick);
            lenis.destroy();
            setLenis(null);
        };
    }, []);

    // Hash navigation — registered even with reduced motion, which jumps instantly
    useEffect(() => {
        if (typeof window === "undefined") return;

        // Same-page jumps: Next won't re-render, so handle the click and URL ourselves
        function onDocumentClick(event) {
            // No defaultPrevented guard: next/link has already cancelled the event
            if (event.button !== 0) return;
            if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

            const anchor = event.target.closest?.('a[href*="#"]');
            if (!anchor || anchor.target === "_blank") return;

            const url = new URL(anchor.href, window.location.href);
            if (url.pathname !== window.location.pathname || !url.hash) return;
            if (!document.querySelector(url.hash)) return;

            event.preventDefault();

            // Deferred so next/link's push lands first and we don't add a second history entry
            setTimeout(() => {
                if (window.location.hash !== url.hash) {
                    window.history.pushState(null, "", url.hash);
                }
            }, 0);

            // Deferred: a mobile-menu link still holds the scroll lock for a frame
            scrollToHashWhenReady(url.hash);
        }
        document.addEventListener("click", onDocumentClick);

        // Cross-page jumps (/projects → /#experience): wait for the section to mount
        function onRouteDone(dest) {
            const hash = new URL(dest, window.location.origin).hash;
            if (hash) scrollToHashWhenReady(hash);
        }
        router.events.on("routeChangeComplete", onRouteDone);
        router.events.on("hashChangeComplete", onRouteDone);

        return () => {
            document.removeEventListener("click", onDocumentClick);
            router.events.off("routeChangeComplete", onRouteDone);
            router.events.off("hashChangeComplete", onRouteDone);
        };
    }, [router]);

    // Cold load on a deep link: wait for the loading screen to finish
    useEffect(() => {
        const hash = window.location.hash;
        if (!hash) return;

        // Jump instantly on a deep link rather than scrolling past the whole page
        if (window.__appReady) {
            scrollToHashWhenReady(hash, { immediate: true });
            return;
        }
        const onReady = () => scrollToHashWhenReady(hash, { immediate: true });
        window.addEventListener("app:ready", onReady, { once: true });
        return () => window.removeEventListener("app:ready", onReady);
    }, []);

    return (
        <>
            <Navbar />
            <main>{props.children}</main>
            <Footer />
            <ResumeViewer />
        </>
    );
}
