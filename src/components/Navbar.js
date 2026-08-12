'use client';

import Link from "next/link";
import { useState, useRef, useEffect, useCallback } from "react";
import GuitarIllustration from "./GuitarIllustration";
import { createSpring, project, rubberband, createVelocityTracker } from "@/lib/spring";

// `external` items are real files in /public, not routes — next/link would try
// to client-side route to them and land on a 404, so they get a plain anchor.
const navItems = [
  { label: "Experience", href: "/#experience" },
  { label: "Projects",   href: "/projects"    },
  { label: "Resume",     href: "/Angel_Resume_swe.pdf", external: true },
  { label: "Fun Stuff",  href: "/#fun-stuff"  },
  { label: "Contact",    href: "/#contact"    },
];

// One component for both kinds of destination so the link markup below stays
// identical whichever it is.
function NavLink({ item, ...props }) {
  if (item.external) {
    return <a href={item.href} target="_blank" rel="noopener noreferrer" {...props} />;
  }
  // `scroll={false}` on hash links: Next's built-in hash handling is an instant
  // scrollIntoView, which lands on the section before Lenis can ease anything —
  // the jump you'd otherwise see. Lenis does the moving instead (Layout.js).
  return <Link href={item.href} scroll={!item.href.includes("#")} {...props} />;
}

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

  // The bar grows an edge once there is content behind it, and gets out of the
  // way when you scroll down — reading direction wins the screen; the moment you
  // scroll back up you're looking for navigation, so it returns.
  useEffect(() => {
    let lastY = window.scrollY;

    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 8);

      // A small threshold so a jittery trackpad or a rubber-band bounce at the
      // top doesn't flap the bar in and out.
      if (Math.abs(y - lastY) > 6) {
        setHidden(y > lastY && y > 120);
        lastY = y;
      }
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ── The menu is the bar ────────────────────────────────────────────────────
  // One surface, one spring, one dimension: the nav's own height. Opening grows
  // the bar into a full menu; closing shrinks it back. Because a spring owns the
  // value for the surface's whole life, an open can be caught halfway and pushed
  // back closed without a jump.
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

      // The pill has to stop being a pill almost immediately, or a tall box with
      // a 999px radius reads as a giant lozenge on the way open.
      const progress = clamp((h - collapsed) / (expanded - collapsed), 0, 1);
      el.style.borderRadius = `${999 - 971 * Math.min(1, progress * 6)}px`;

      // A thin strip of chrome can be translucent; a surface that covers the
      // screen is a blocking layer and has to read as near-solid, or the page
      // behind it competes with the menu.
      el.style.background = `rgba(232, 238, 226, ${(0.72 + 0.25 * progress).toFixed(3)})`;

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
        el.style.borderRadius = "999px";
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
    // `open` is read inside onResize only to re-settle after a viewport change
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
      el.style.borderRadius = open ? "28px" : "999px";
      if (menuRef.current) menuRef.current.style.opacity = open ? "1" : "0";
      return;
    }
    springRef.current?.set(open ? expanded : collapsed);
  }, [open]);

  // ── Push the menu back up into the bar ─────────────────────────────────────
  // Dragging upward shrinks the surface 1:1 with the finger; past fully open it
  // resists instead of stopping dead; the release is thrown, not snapped.
  const onPointerDown = useCallback((e) => {
    // Only an open menu can be dragged, and never by pressing something that
    // already does its own job (the toggle button, a link).
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

    // A decisive flick commits in the direction it was thrown; only an
    // ambiguous, slow release asks where the surface would have come to rest.
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
      {/* One floating surface. On mobile it grows from a pill into the whole
          menu; on desktop it stays a bar and never changes height. */}
      <div
        ref={navRef}
        className="material-chrome relative mx-auto max-w-[92vw] lg:max-w-[76rem] flex flex-col overflow-hidden rounded-full md:h-auto"
        style={{
          // The hide-on-scroll transform lives on this element, not on a
          // parent: a transformed *ancestor* creates a new backdrop root and
          // silently kills the backdrop blur on everything inside it.
          transform: hidden && !open ? "translate3d(0, -130%, 0)" : "translate3d(0, 0, 0)",
          border: `1px solid ${scrolled || open ? "var(--mat-edge)" : "transparent"}`,
          boxShadow: scrolled || open ? "var(--lift-2)" : "var(--lift-1)",
          transition:
            "transform var(--t-base) var(--spring), border-color var(--t-base) var(--spring), box-shadow var(--t-base) var(--spring)",
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
            className="press text-[var(--text-primary)] hover:text-[var(--green-deep)] transition-colors duration-200"
            style={{ fontFamily: "var(--font-serif)", fontWeight: 600, fontSize: "1.25rem", letterSpacing: "-0.015em" }}
          >
            Angel Shinh
          </Link>

          {/* Desktop links */}
          <nav className="hidden md:flex items-center" aria-label="Primary navigation">
            {navItems.map((item, i) => (
              <span key={item.label} className="flex items-center">
                {i > 0 && (
                  <span
                    className="mx-3 select-none"
                    style={{ fontFamily: "var(--font-sans)", fontWeight: 500, color: "var(--green-deep)", opacity: 0.5, fontSize: "0.9rem" }}
                    aria-hidden="true"
                  >
                    /
                  </span>
                )}
                <NavLink
                  item={item}
                  className="press vibrant relative group transition-colors duration-200 hover:text-[var(--green-deep)]"
                  style={{ fontFamily: "var(--font-sans)", fontSize: "0.95rem" }}
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

          {/* Mobile toggle — guitar string icon */}
          <button
            className="press-strong md:hidden p-1 relative z-10"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-label="Toggle navigation"
          >
            {open ? (
              /* Close: two strings crossing as X */
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
                <line x1="2" y1="2" x2="18" y2="18" stroke="var(--string-E)" strokeWidth="2.2" strokeLinecap="round" />
                <line x1="18" y1="2" x2="2" y2="18" stroke="var(--string-D)" strokeWidth="1.4" strokeLinecap="round" />
              </svg>
            ) : (
              /* Hamburger: 3 guitar strings of different thicknesses */
              <svg width="22" height="16" viewBox="0 0 22 16" fill="none" aria-hidden>
                <line x1="0" y1="2" x2="22" y2="2" stroke="var(--string-E)" strokeWidth="2.5" strokeLinecap="round" />
                <line x1="0" y1="8" x2="22" y2="8" stroke="var(--string-G)" strokeWidth="1.5" strokeLinecap="round" />
                <line x1="0" y1="14" x2="22" y2="14" stroke="var(--string-e)" strokeWidth="0.75" strokeLinecap="round" />
              </svg>
            )}
          </button>
        </div>

        {/* Menu body — part of the bar, not a panel under it. Revealed as the
            surface grows, so there is never a second layer to notice. */}
        <div
          ref={menuRef}
          className="md:hidden flex flex-col flex-1 min-h-0"
          style={{ opacity: 0, transition: "opacity var(--t-fast) linear" }}
          inert={!open ? true : undefined}
        >
          {/* Separator — a plucked string across the bar, deliberately visible */}
          <div className="flex justify-center pb-6" aria-hidden>
            <div
              style={{
                width: "80%",
                height: 1,
                borderRadius: 999,
                background:
                  "linear-gradient(90deg, transparent, var(--green-deep) 12%, var(--green-deep) 88%, transparent)",
                opacity: 0.8,
              }}
            />
          </div>

          <nav className="flex-1 flex flex-col gap-6 pl-6 pr-4 sm:pl-7 sm:pr-5" aria-label="Mobile navigation">
            {navItems.map((item, i) => (
              <NavLink
                key={item.label}
                item={item}
                onClick={() => setOpen(false)}
                onMouseEnter={() => wiggleLink(mobilePaths.current[i])}
                className="press relative group inline-block w-fit hover:text-[var(--green-deep)] transition-colors duration-200"
                style={{ fontFamily: "var(--font-sans)", fontWeight: 500, fontSize: "1.5rem", letterSpacing: "-0.012em", color: "var(--text-secondary)" }}
              >
                <span style={{ color: "var(--green-deep)", opacity: 0.45, marginRight: "0.6rem", fontSize: "1.1rem" }}>/</span>
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

          {/* Guitar illustration — centered at bottom */}
          <div className="flex justify-center pb-7 pointer-events-none" aria-hidden style={{ opacity: 0.37 }}>
            <GuitarIllustration style={{ width: 124, height: 260 }} />
          </div>
        </div>
      </div>
    </header>
  );
}
