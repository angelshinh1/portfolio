'use client';

import { useEffect } from "react";
import Lenis from "lenis";
import ScrollTrigger from "gsap/ScrollTrigger";
import gsap from "gsap";
import Footer from "./Footer";
import Navbar from "./Navbar";
import ticker from "@/lib/ticker";

gsap.registerPlugin(ScrollTrigger);

export default function Layout(props) {
    useEffect(() => {
        if (typeof window === "undefined") return;
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

        const lenis = new Lenis({ autoRaf: false });

        function onTick() {
            lenis.raf(performance.now());
        }
        ticker.add(onTick);

        // Keeps future ScrollTrigger-driven work (Phase 2) in sync with Lenis's
        // virtual scroll position instead of the native scroll event.
        lenis.on("scroll", ScrollTrigger.update);

        // Route in-page hash links (nav, CTAs) through Lenis so its internal
        // target doesn't fight a native scrollIntoView jump.
        function onDocumentClick(event) {
            const anchor = event.target.closest('a[href*="#"]');
            if (!anchor) return;
            const url = new URL(anchor.href, window.location.href);
            if (url.pathname !== window.location.pathname || !url.hash) return;
            const target = document.querySelector(url.hash);
            if (!target) return;
            event.preventDefault();
            lenis.scrollTo(target, { offset: -80 });
        }
        document.addEventListener("click", onDocumentClick);

        return () => {
            ticker.remove(onTick);
            document.removeEventListener("click", onDocumentClick);
            lenis.destroy();
        };
    }, []);

    return (
        <>
            <Navbar />
            <main>{props.children}</main>
            <Footer />
        </>
    );
}
