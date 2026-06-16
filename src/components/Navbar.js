import Link from "next/link";
import { useState } from "react";

const navItems = [
  { label: "Experience", href: "/#experience" },
  { label: "Projects",   href: "/#projects"   },
  { label: "Resume",     href: "/Angel_Resume_swe.pdf" },
  { label: "Fun Stuff",  href: "/#fun-stuff"  },
  { label: "Contact",    href: "/#contact"    },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-30">
      {/* Main bar */}
      <div
        className="border-b border-[var(--line)]"
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
                >
                  {label}
                  <span
                    className="absolute -bottom-[2px] left-0 w-0 h-[1.5px] transition-all duration-300 ease-[var(--ease-out)] group-hover:w-full"
                    style={{ background: "var(--green-deep)" }}
                  />
                </Link>
              </span>
            ))}
          </nav>

          {/* Mobile toggle */}
          <button
            className="md:hidden hover:text-[var(--green-deep)] transition-colors duration-200"
            style={{ fontFamily: "'IM Fell English', Georgia, serif", fontStyle: "italic", fontSize: "0.9rem", color: "var(--text-secondary)" }}
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-label="Toggle navigation"
          >
            {open ? "✕" : "menu"}
          </button>
        </div>
      </div>

      {/* Mobile dropdown panel */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-[var(--ease-out)] border-b border-[var(--line)]`}
        style={{
          background: "rgba(232, 238, 226, 0.97)",
          backdropFilter: "blur(12px)",
          maxHeight: open ? "320px" : "0px",
          opacity: open ? 1 : 0,
        }}
      >
        <nav className="max-w-[92vw] mx-auto py-6 flex flex-col gap-5" aria-label="Mobile navigation">
          {navItems.map(({ label, href }, i) => (
            <Link
              key={label}
              href={href}
              onClick={() => setOpen(false)}
              className="hover:text-[var(--green-deep)] transition-colors duration-200"
              style={{ fontFamily: "'IM Fell English', Georgia, serif", fontStyle: "italic", fontSize: "1.1rem", color: "var(--text-secondary)" }}
            >
              <span style={{ color: "var(--green-deep)", opacity: 0.5, marginRight: "0.5rem" }}>/</span>
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
