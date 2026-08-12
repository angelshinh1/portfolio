'use client';

import Link from "next/link";
import { useState, useRef, useEffect, useCallback } from "react";
import GuitarIllustration from "./GuitarIllustration";
import { createSpring, project, rubberband, createVelocityTracker } from "@/lib/spring";

const navItems = [
  { label: "Experience", href: "/#experience" },
  { label: "Projects",   href: "/projects"    },
  { label: "Resume",     href: "/Angel_Resume_swe.pdf" },
  { label: "Fun Stuff",  href: "/#fun-stuff"  },
  { label: "Contact",    href: "/#contact"    },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const wigglePaths = useRef([]);
  const mobilePaths = useRef([]);

  const sheetRef = useRef(null);
  const springRef = useRef(null);
  const reducedRef = useRef(false);
  const dragRef = useRef({ active: false, grabY: 0, y: 0, height: 0 });
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

  // One spring owns the sheet's Y for its whole life — opening, closing, and
  // every gesture in between — so a transition can be grabbed mid-flight and
  // reversed without a jump. Closed rests at -height (offscreen, above).
  useEffect(() => {
    const el = sheetRef.current;
    if (!el) return;

    const height = el.offsetHeight || window.innerHeight;
    dragRef.current.height = height;

    // Reduced motion: the sheet cross-fades in place — no slide, no gesture.
    reducedRef.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedRef.current) {
      el.style.transform = "none";
      el.style.opacity = "0";
      el.style.pointerEvents = "none";
      el.style.transition = "opacity 200ms ease";
      return;
    }

    const spring = createSpring({
      from: -height,
      damping: 1,
      response: 0.34,
      onChange: (y) => {
        dragRef.current.y = y;
        el.style.transform = `translate3d(0, ${y}px, 0)`;
        // Fade the surface out while it makes a large move, back in once settled
        el.style.opacity = String(Math.min(1, 1 + y / (height * 0.5)));
        el.style.pointerEvents = y > -height + 4 ? "auto" : "none";
      },
    });
    springRef.current = spring;
    el.style.transform = `translate3d(0, ${-height}px, 0)`;
    el.style.opacity = "0";

    // Keep the closed position correct across rotation / viewport changes
    const onResize = () => {
      dragRef.current.height = el.offsetHeight || window.innerHeight;
    };
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      spring.stop();
    };
  }, []);

  // Re-target on open/close. Because it re-targets rather than restarting, a
  // toggle mid-animation continues from the live position with its velocity.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";

    if (reducedRef.current) {
      const el = sheetRef.current;
      if (el) {
        el.style.opacity = open ? "1" : "0";
        el.style.pointerEvents = open ? "auto" : "none";
      }
      return;
    }
    springRef.current?.set(open ? 0 : -dragRef.current.height);
  }, [open]);

  // ── Drag to dismiss: 1:1 tracking up, rubber-banded down, thrown on release ──
  const onPointerDown = useCallback((e) => {
    if (reducedRef.current || e.target.closest("a")) return;   // let links win
    const drag = dragRef.current;
    drag.active = true;
    drag.grabY = e.clientY - drag.y;     // respect where they grabbed it
    springRef.current?.stop();
    tracker.current.reset();
    tracker.current.add(e.clientY);
    e.currentTarget.setPointerCapture(e.pointerId);
  }, []);

  const onPointerMove = useCallback((e) => {
    const drag = dragRef.current;
    if (!drag.active) return;
    tracker.current.add(e.clientY);
    let y = e.clientY - drag.grabY;
    // Past the open position there is nothing more to show — resist, don't stop
    if (y > 0) y = rubberband(y, drag.height);
    springRef.current?.setCurrent(Math.max(-drag.height, y));
  }, []);

  const onPointerUp = useCallback(() => {
    const drag = dragRef.current;
    if (!drag.active) return;
    drag.active = false;

    const velocity = tracker.current.velocity();

    // A decisive flick commits in the direction it was thrown, whatever the
    // position at release. Only an ambiguous, slow release falls back to
    // asking where the sheet would have come to rest — a snappier
    // deceleration than scroll's 0.998, since a sheet shouldn't coast.
    const FLICK = 450;
    const dismiss = velocity < -FLICK
      ? true
      : velocity > FLICK
        ? false
        : drag.y + project(velocity, 0.99) < -drag.height * 0.3;

    // Hand the finger's velocity straight to the spring — no seam between
    // dragging and animating.
    springRef.current?.set(dismiss ? -drag.height : 0, velocity);
    // Keep React's idea of the state in step with where the gesture left the
    // sheet — pulling a closing sheet back open has to re-open it for real,
    // not just visually (aria state, scroll lock, the next toggle press).
    setOpen(!dismiss);
  }, []);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-30 px-3 sm:px-5 pt-3 sm:pt-4"
      style={{
        // Slide the whole bar out the way it came in. The sheet is a child, so
        // it never hides while the menu is open.
        transform: hidden && !open ? "translate3d(0, -130%, 0)" : "translate3d(0, 0, 0)",
        transition: "transform var(--t-base) var(--spring)",
      }}
    >
      {/* Floating bar — a rounded pill of translucent chrome with the page
          sliding underneath it. It gains an edge and a deeper shadow only
          once there is content behind it to lift away from. */}
      <div
        className="material-chrome relative z-10 mx-auto max-w-[92vw] lg:max-w-[76rem] rounded-full"
        style={{
          border: `1px solid ${scrolled ? "var(--mat-edge)" : "transparent"}`,
          boxShadow: scrolled ? "var(--lift-2)" : "var(--lift-1)",
          transition: "border-color var(--t-base) var(--spring), box-shadow var(--t-base) var(--spring)",
        }}
      >
        <div className="flex items-center justify-between pl-6 pr-4 sm:pl-7 sm:pr-5 py-3 md:py-3.5">

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
            {navItems.map(({ label, href }, i) => (
              <span key={label} className="flex items-center">
                {i > 0 && (
                  <span
                    className="mx-3 select-none"
                    style={{ fontFamily: "var(--font-sans)", fontWeight: 500, color: "var(--green-deep)", opacity: 0.5, fontSize: "0.9rem" }}
                    aria-hidden="true"
                  >
                    /
                  </span>
                )}
                <Link
                  href={href}
                  className="press vibrant relative group transition-colors duration-200 hover:text-[var(--green-deep)]"
                  style={{ fontFamily: "var(--font-sans)", fontSize: "0.95rem" }}
                  onMouseEnter={() => wiggleLink(wigglePaths.current[i])}
                >
                  {label}
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
                </Link>
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
      </div>

      {/* Mobile sheet — a floating rounded panel that matches the bar. It enters
          from the top, dismisses back to the top, and can be dragged there
          directly. Spring-driven, so it is grabbable mid-flight. */}
      <div
        ref={sheetRef}
        className="material-sheet md:hidden absolute left-3 right-3 top-3 sm:left-5 sm:right-5 sm:top-4 h-[calc(100dvh-1.5rem)] sm:h-[calc(100dvh-2rem)] flex flex-col overflow-hidden rounded-[28px]"
        style={{
          touchAction: 'none',
          willChange: 'transform, opacity',
          border: '1px solid var(--mat-edge)',
          boxShadow: 'var(--lift-3)',
        }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        {/* Spacer so links clear the floating bar sitting on top of the sheet */}
        <div style={{ height: 58 }} />

        {/* Grab handle — tells you the sheet is draggable before you try */}
        <div className="flex justify-center pt-1" aria-hidden>
          <div style={{ width: 40, height: 4, borderRadius: 999, background: "var(--green-deep)", opacity: 0.35 }} />
        </div>

        {/* Nav links */}
        <nav className="flex-1 max-w-[88vw] mx-auto pt-8 flex flex-col gap-6 w-full" aria-label="Mobile navigation">
          {navItems.map(({ label, href }, i) => (
            <Link
              key={label}
              href={href}
              onClick={() => setOpen(false)}
              onMouseEnter={() => wiggleLink(mobilePaths.current[i])}
              className="press relative group inline-block w-fit hover:text-[var(--green-deep)] transition-colors duration-200"
              style={{ fontFamily: "var(--font-sans)", fontWeight: 500, fontSize: "1.5rem", letterSpacing: "-0.012em", color: "var(--text-secondary)" }}
            >
              <span style={{ color: "var(--green-deep)", opacity: 0.45, marginRight: "0.6rem", fontSize: "1.1rem" }}>/</span>
              {label}
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
            </Link>
          ))}
        </nav>

        {/* Guitar illustration — centered at bottom */}
        <div
          className="flex justify-center pb-6 pointer-events-none overflow-hidden"
          aria-hidden
          style={{ opacity: 0.37, maxHeight: 260 }}
        >
          <GuitarIllustration />
        </div>
      </div>
    </header>
  );
}
