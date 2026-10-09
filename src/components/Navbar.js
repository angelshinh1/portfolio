'use client';

import Link from "next/link";
import { useState, useRef, useEffect, useCallback } from "react";
import Camera from "./Camera";
import { Tape, tornClip } from "./scrapbook";
import { RESUME_URL } from "@/lib/resume";
import { createSpring, project, rubberband, createVelocityTracker } from "@/lib/spring";

// `external` items are files in /public, so they get a plain anchor
const navItems = [
  { label: "Experience", href: "/#experience" },
  { label: "Projects",   href: "/projects"    },
  { label: "Resume",     href: RESUME_URL, external: true },
  { label: "Fun Stuff",  href: "/#fun-stuff"  },
  { label: "Contact",    href: "/#contact"    },
];

// Same markup for routes and files
function NavLink({ item, ...props }) {
  if (item.external) {
    return <a href={item.href} target="_blank" rel="noopener noreferrer" {...props} />;
  }
  // scroll={false} on hash links so Lenis eases the jump instead of Next snapping
  return <Link href={item.href} scroll={!item.href.includes("#")} {...props} />;
}

// Torn bottom edge; fixed seed so server and client match
const NAV_CLIP = tornClip(5, ["bottom"], 4, 90);

const isMobile = () => window.matchMedia("(max-width: 767px)").matches;
const clamp = (v, min, max) => Math.max(min, Math.min(max, v));

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const wigglePaths = useRef([]);
  const mobilePaths = useRef([]);

  const navRef = useRef(null);    // the whole floating surface — this is what grows
  const rowRef = useRef(null);    // the bar row: wordmark + links + toggle
  const menuRef = useRef(null);   // everything revealed below the separator
  const springRef = useRef(null);
  const reducedRef = useRef(false);
  const openRef = useRef(false);
  const sizeRef = useRef({ collapsed: 56, expanded: 600 });
  const dragRef = useRef({ active: false, grabY: 0, startH: 0, h: 0 });
  const tracker = useRef(createVelocityTracker());

  function wiggleLink(pathEl) {
    if (!pathEl) return;
    import('animejs').then(({ animate, utils }) => {
      utils.remove(pathEl);
      animate(pathEl, {
        d: [
          { to: "M 0,3 C 20,0.5 40,5.5 60,3", duration: 170 },
          { to: "M 0,3 C 20,5 40,1 60,3",      duration: 180 },
          { to: "M 0,3 C 20,3 40,3 60,3",       duration: 260 },
        ],
        ease: 'outSine',
      });
    });
  }

  // Hide on scroll down, return on scroll up
  useEffect(() => {
    let lastY = window.scrollY;

    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 8);

      // Threshold so trackpad jitter doesn't flap the bar
      if (Math.abs(y - lastY) > 6) {
        setHidden(y > lastY && y > 120);
        lastY = y;
      }
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Mobile: the bar grows into the menu — one spring drives its height
  useEffect(() => {
    const el = navRef.current;
    const row = rowRef.current;
    if (!el || !row) return;

    reducedRef.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const measure = () => {
      const collapsed = row.offsetHeight;
      const inset = window.innerWidth >= 640 ? 16 : 12;
      sizeRef.current = {
        collapsed,
        expanded: Math.max(collapsed, window.innerHeight - inset * 2),
      };
      return sizeRef.current;
    };

    const paint = (h) => {
      const { collapsed, expanded } = sizeRef.current;
      dragRef.current.h = h;
      if (!isMobile()) return;   // desktop height is the browser's business

      el.style.height = `${h}px`;
      const progress = clamp((h - collapsed) / (expanded - collapsed), 0, 1);

      // Menu content arrives once there's actually room for it
      if (menuRef.current) {
        menuRef.current.style.opacity = String(clamp((progress - 0.2) / 0.5, 0, 1));
      }
    };

    const { collapsed } = measure();

    if (reducedRef.current) {
      // No growth animation: the menu is simply there or not.
      el.style.transition = "none";
      paint(collapsed);
      return;
    }

    const spring = createSpring({
      from: collapsed,
      damping: 1,
      response: 0.36,
      onChange: paint,
    });
    springRef.current = spring;
    paint(collapsed);

    const onResize = () => {
      const { collapsed: c, expanded: e } = measure();
      if (!isMobile()) {
        // Desktop lays out naturally — hand height back to the browser.
        el.style.height = "";
        return;
      }
      spring.setCurrent(open ? e : c);
    };
    window.addEventListener("resize", onResize);
    onResize();

    return () => {
      window.removeEventListener("resize", onResize);
      spring.stop();
    };
    // `open` is only read in onResize to re-settle
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Re-target the surface whenever the menu is toggled.
  useEffect(() => {
    const el = navRef.current;
    if (!el) return;

    openRef.current = open;
    document.body.style.overflow = open ? "hidden" : "";

    const { collapsed, expanded } = sizeRef.current;

    if (reducedRef.current) {
      el.style.height = isMobile() ? `${open ? expanded : collapsed}px` : "";
      if (menuRef.current) menuRef.current.style.opacity = open ? "1" : "0";
      return;
    }
    springRef.current?.set(open ? expanded : collapsed);
  }, [open]);

  // Drag the open menu up to close it: 1:1, rubber-banded, thrown on release
  const onPointerDown = useCallback((e) => {
    // Only an open menu drags, and never from a link or button
    if (reducedRef.current || !isMobile() || !openRef.current) return;
    if (e.target.closest("a, button")) return;
    const drag = dragRef.current;
    drag.active = true;
    drag.grabY = e.clientY;
    drag.startH = drag.h;
    springRef.current?.stop();
    tracker.current.reset();
    tracker.current.add(e.clientY);
    e.currentTarget.setPointerCapture(e.pointerId);
  }, []);

  const onPointerMove = useCallback((e) => {
    const drag = dragRef.current;
    if (!drag.active) return;
    tracker.current.add(e.clientY);

    const { collapsed, expanded } = sizeRef.current;
    // Finger up shortens the surface, finger down grows it — 1:1 either way
    let h = drag.startH + (e.clientY - drag.grabY);
    if (h > expanded) h = expanded + rubberband(h - expanded, expanded);
    springRef.current?.setCurrent(Math.max(collapsed, h));
  }, []);

  const onPointerUp = useCallback(() => {
    const drag = dragRef.current;
    if (!drag.active) return;
    drag.active = false;

    const { collapsed, expanded } = sizeRef.current;
    const velocity = tracker.current.velocity();   // px/s, downward positive

    // A flick commits in its direction; a slow release settles where it would land
    const FLICK = 450;
    const stayOpen = velocity < -FLICK
      ? false
      : velocity > FLICK
        ? true
        : drag.h + project(velocity, 0.99) > expanded - (expanded - collapsed) * 0.3;

    springRef.current?.set(stayOpen ? expanded : collapsed, velocity);
    setOpen(stayOpen);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-30 px-3 sm:px-5 pt-3 sm:pt-4">
      {/* Wrapper carries the hide transform and the drop-shadow (clip-path would cut a box-shadow) */}
      <div
        className="relative mx-auto max-w-[92vw] lg:max-w-[76rem]"
        style={{
          transform: hidden && !open ? "translate3d(0, -140%, 0)" : "translate3d(0, 0, 0)",
          filter: scrolled || open ? "var(--scrap-shadow-up)" : "var(--scrap-shadow)",
          transition: "transform var(--t-base) var(--spring), filter var(--t-base) var(--spring)",
        }}
      >
      <Tape variant="washi" rotate={-5} width={70} className="-top-2 -left-3 z-10" />
      <div
        ref={navRef}
        className="paper paper-cream relative flex flex-col overflow-hidden rounded-[2px] md:h-auto"
        style={{
          clipPath: NAV_CLIP,
          touchAction: open ? "none" : "auto",
        }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        <div ref={rowRef} className="flex-shrink-0 flex items-center justify-between pl-6 pr-4 sm:pl-7 sm:pr-5 py-3 md:py-3.5">

          {/* Wordmark — Playfair Display (the one serif touch outside headings, as a logotype) */}
          <Link
            href="/"
            className="press text-[var(--ink-brown)] hover:text-[var(--green-deep)] transition-colors duration-200"
            style={{ fontFamily: "var(--font-serif)", fontWeight: 600, fontSize: "1.25rem", letterSpacing: "-0.015em" }}
          >
            Angel Shinh
          </Link>

          {/* Desktop links */}
          <nav className="hidden md:flex items-center gap-7" aria-label="Primary navigation">
            {navItems.map((item, i) => (
              <span key={item.label} className="flex items-center">
                <NavLink
                  item={item}
                  className="press font-type relative group text-[var(--ink-brown)] transition-colors duration-200 hover:text-[var(--green-deep)]"
                  style={{ fontSize: "0.9rem", letterSpacing: "0.02em" }}
                  onMouseEnter={() => wiggleLink(wigglePaths.current[i])}
                >
                  {item.label}
                  <svg
                    className="absolute -bottom-[3px] left-0 w-0 h-[6px] overflow-visible transition-[width] duration-300 ease-[var(--spring)] group-hover:w-full"
                    viewBox="0 0 60 6"
                    preserveAspectRatio="none"
                    aria-hidden="true"
                  >
                    <path
                      ref={el => { wigglePaths.current[i] = el; }}
                      d="M 0,3 C 20,3 40,3 60,3"
                      stroke="var(--green-deep)"
                      strokeWidth="1.5"
                      fill="none"
                      strokeLinecap="round"
                    />
                  </svg>
                </NavLink>
              </span>
            ))}
          </nav>

          {/* Mobile toggle */}
          <button
            className="press-strong md:hidden p-1 relative z-10"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-label="Toggle navigation"
          >
            {open ? (
              /* Close */
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
                <line x1="2" y1="2" x2="18" y2="18" stroke="var(--ink-brown)" strokeWidth="2" strokeLinecap="round" />
                <line x1="18" y1="2" x2="2" y2="18" stroke="var(--ink-brown)" strokeWidth="2" strokeLinecap="round" />
              </svg>
            ) : (
              /* Hamburger */
              <svg width="22" height="16" viewBox="0 0 22 16" fill="none" aria-hidden>
                <line x1="0" y1="2" x2="22" y2="2" stroke="var(--ink-brown)" strokeWidth="2" strokeLinecap="round" />
                <line x1="0" y1="8" x2="22" y2="8" stroke="var(--ink-brown)" strokeWidth="2" strokeLinecap="round" />
                <line x1="0" y1="14" x2="22" y2="14" stroke="var(--ink-brown)" strokeWidth="2" strokeLinecap="round" />
              </svg>
            )}
          </button>
        </div>

        {/* Menu body, revealed as the bar grows */}
        <div
          ref={menuRef}
          className="md:hidden flex flex-col flex-1 min-h-0"
          style={{ opacity: 0, transition: "opacity var(--t-fast) linear" }}
          inert={!open ? true : undefined}
        >
          {/* Separator — a dashed cut line across the page */}
          <div className="flex justify-center pb-6" aria-hidden>
            <div className="cut-line w-[86%]" />
          </div>

          <nav className="flex-1 flex flex-col gap-6 pl-6 pr-4 sm:pl-7 sm:pr-5" aria-label="Mobile navigation">
            {navItems.map((item, i) => (
              <NavLink
                key={item.label}
                item={item}
                onClick={() => setOpen(false)}
                onMouseEnter={() => wiggleLink(mobilePaths.current[i])}
                className="press font-hand relative group inline-block w-fit text-[var(--ink-brown)] hover:text-[var(--green-deep)] transition-colors duration-200"
                style={{ fontSize: "2.1rem", lineHeight: 1.1 }}
              >
                {item.label}
                <svg
                  className="absolute -bottom-[3px] left-0 w-0 h-[7px] overflow-visible transition-[width] duration-300 ease-[var(--spring)] group-hover:w-full"
                  viewBox="0 0 60 6"
                  preserveAspectRatio="none"
                  aria-hidden
                >
                  <path
                    ref={el => { mobilePaths.current[i] = el; }}
                    d="M 0,3 C 20,3 40,3 60,3"
                    stroke="var(--green-deep)"
                    strokeWidth="1.2"
                    fill="none"
                    strokeLinecap="round"
                  />
                </svg>
              </NavLink>
            ))}
          </nav>

          {/* Camera sticker at the bottom of the menu */}
          <div className="flex justify-center pb-10 pointer-events-none">
            <Camera live={false} className="w-[150px]" style={{ rotate: "-6deg" }} sizes="150px" />
          </div>
        </div>
      </div>
      </div>
    </header>
  );
}
