'use client';

import { useEffect } from "react";
import { useRouter } from "next/router";
import Lenis from "lenis";
import ScrollTrigger from "gsap/ScrollTrigger";
import gsap from "gsap";
import Footer from "./Footer";
import Navbar from "./Navbar";
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

        // Keeps future ScrollTrigger-driven work (Phase 2) in sync with Lenis's
        // virtual scroll position instead of the native scroll event.
        lenis.on("scroll", ScrollTrigger.update);

        return () => {
            ticker.remove(onTick);
            lenis.destroy();
            setLenis(null);
        };
    }, []);

    // ── Hash navigation ───────────────────────────────────────────────────────
    // Registered unconditionally (unlike Lenis above): with reduced motion the
    // helper falls back to an instant jump, but the links still have to work.
    useEffect(() => {
        if (typeof window === "undefined") return;

        // Same-page jumps: Next won't re-render for these, so handle the click
        // ourselves and keep the URL in step by hand.
        function onDocumentClick(event) {
            // No `defaultPrevented` guard: next/link has already cancelled the
            // event by the time this fires, which is exactly the case we want.
            if (event.button !== 0) return;
            if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

            const anchor = event.target.closest?.('a[href*="#"]');
            if (!anchor || anchor.target === "_blank") return;

            const url = new URL(anchor.href, window.location.href);
            if (url.pathname !== window.location.pathname || !url.hash) return;
            if (!document.querySelector(url.hash)) return;

            event.preventDefault();

            // Deferred so next/link's own router.push lands first: if it
            // already wrote the hash, pushing again would cost the user a
            // second press of the back button. Plain <a href="#..."> anchors
            // (the Hero CTA) have nothing else updating the URL, so they fall
            // through to this.
            setTimeout(() => {
                if (window.location.hash !== url.hash) {
                    window.history.pushState(null, "", url.hash);
                }
            }, 0);

            // Deferred, not immediate: a mobile-menu link is still holding the
            // scroll lock at click time and releases it a frame later.
            scrollToHashWhenReady(url.hash);
        }
        document.addEventListener("click", onDocumentClick);

        // Cross-page jumps (/projects → /#experience). Next lands on the new
        // page and scrolls to the top; the section may not even be mounted yet,
        // so the helper waits for it.
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

    // Cold load on a deep link (someone opens /#contact directly). The loading
    // overlay owns the scroll until it's finished, so wait for its signal.
    useEffect(() => {
        const hash = window.location.hash;
        if (!hash) return;

        // Immediate here, unlike the click paths: someone opening /#contact
        // directly wants to be there, not to watch the whole page scroll past.
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
        </>
    );
}
