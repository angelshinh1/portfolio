'use client';

import Link from "next/link";
import { useState, useRef, useCallback } from "react";
import GuitarIllustration from "./GuitarIllustration";

const navItems = [
  { label: "Experience", href: "/#experience" },
  { label: "Projects",   href: "/#projects"   },
  { label: "Resume",     href: "/Angel_Resume_swe.pdf" },
  { label: "Fun Stuff",  href: "/#fun-stuff"  },
  { label: "Contact",    href: "/#contact"    },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const wigglePaths = useRef([]);
  const mobilePaths = useRef([]);

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

  return (
    <header className="fixed top-0 left-0 right-0 z-30">
      {/* Main bar */}
      <div
        className="border-b border-[var(--line)] relative z-10"
        style={{ background: "rgba(232, 238, 226, 0.88)", backdropFilter: "blur(12px)" }}
      >
        <div className="max-w-[92vw] lg:max-w-[80rem] mx-auto flex items-center justify-between py-4 md:py-5">

          {/* Wordmark — IM Fell English italic */}
          <Link
            href="/"
            className="text-[var(--text-primary)] hover:text-[var(--green-deep)] transition-colors duration-200"
            style={{ fontFamily: "'IM Fell English', Georgia, serif", fontStyle: "italic", fontSize: "1.25rem" }}
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
                    style={{ fontFamily: "'IM Fell English', Georgia, serif", fontStyle: "italic", color: "var(--green-deep)", opacity: 0.5, fontSize: "1rem" }}
                    aria-hidden="true"
                  >
                    /
                  </span>
                )}
                <Link
                  href={href}
                  className="relative group transition-colors duration-200 hover:text-[var(--green-deep)]"
                  style={{ fontFamily: "'IM Fell English', Georgia, serif", fontStyle: "italic", fontSize: "0.95rem", color: "var(--text-secondary)" }}
                  onMouseEnter={() => wiggleLink(wigglePaths.current[i])}
                >
                  {label}
                  <svg
                    className="absolute -bottom-[3px] left-0 w-0 h-[6px] overflow-visible transition-[width] duration-300 ease-[var(--ease-out)] group-hover:w-full"
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
            className="md:hidden p-1 transition-opacity duration-200 hover:opacity-70 relative z-10"
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

      {/* Mobile full-screen overlay */}
      <div
        className="md:hidden absolute inset-x-0 top-0 flex flex-col overflow-hidden"
        style={{
          height: '100dvh',
          background: "rgba(232, 238, 226, 0.97)",
          backdropFilter: "blur(16px)",
          transform: open ? 'translateY(0)' : 'translateY(-105%)',
          transition: 'transform 450ms cubic-bezier(0.23,1,0.32,1)',
          pointerEvents: open ? 'auto' : 'none',
        }}
      >
        {/* Spacer so links clear the navbar bar */}
        <div style={{ height: 65 }} />

        {/* Nav links */}
        <nav className="flex-1 max-w-[88vw] mx-auto pt-8 flex flex-col gap-6" aria-label="Mobile navigation">
          {navItems.map(({ label, href }, i) => (
            <Link
              key={label}
              href={href}
              onClick={() => setOpen(false)}
              onMouseEnter={() => wiggleLink(mobilePaths.current[i])}
              className="relative group inline-block hover:text-[var(--green-deep)] transition-colors duration-200"
              style={{ fontFamily: "'IM Fell English', Georgia, serif", fontStyle: "italic", fontSize: "1.6rem", color: "var(--text-secondary)" }}
            >
              <span style={{ color: "var(--green-deep)", opacity: 0.45, marginRight: "0.6rem", fontSize: "1.1rem" }}>/</span>
              {label}
              <svg
                className="absolute -bottom-[3px] left-0 w-0 h-[7px] overflow-visible transition-[width] duration-300 ease-[var(--ease-out)] group-hover:w-full"
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
