'use client';

import { useEffect, useRef, useState } from 'react';

// Strings low E → high e, matching GuitarIllustration x positions
const STRINGS = [
  { x: 91,    thickness: 1.4,  color: 'var(--string-E)', amp: 10 },
  { x: 94.2,  thickness: 1.1,  color: 'var(--string-A)', amp: 8.5 },
  { x: 97.4,  thickness: 0.9,  color: 'var(--string-D)', amp: 7 },
  { x: 100.6, thickness: 0.7,  color: 'var(--string-G)', amp: 6 },
  { x: 103.8, thickness: 0.5,  color: 'var(--string-B)', amp: 5 },
  { x: 107,   thickness: 0.4,  color: 'var(--string-e)', amp: 4 },
];

// Paths must share identical structure for anime.js to morph the `d` attribute
const rest  = (x) => `M ${x},20 C ${x},120 ${x},220 ${x},320`;
const pluck = (x, a) => `M ${x},20 C ${x + a},120 ${x + a},220 ${x},320`;

const STAGGER    = 150; // ms between each string pluck
const ANIM_DUR   = 700; // ms total per string (80+110+130+160+220)
const PAUSE      = 300; // ms after last string settles before fadeout
const FADE_DUR   = 500; // ms for overlay fade out

export default function LoadingScreen({ onDone }) {
  const overlayRef = useRef(null);
  const pathRefs   = useRef([]);
  const [ready, setReady]   = useState(false);

  // Defer one tick so SVG refs are bound before we kick off anime.js
  useEffect(() => { setReady(true); }, []);

  useEffect(() => {
    if (!ready) return;

    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReduced) {
      // Skip to fade-out immediately
      const el = overlayRef.current;
      if (el) {
        el.style.transition = `opacity ${FADE_DUR}ms ease-out`;
        el.style.opacity = '0';
      }
      const t = setTimeout(() => onDone?.(), FADE_DUR);
      return () => clearTimeout(t);
    }

    let cancelled = false;

    import('animejs').then(({ animate }) => {
      if (cancelled) return;

      STRINGS.forEach(({ x, amp }, i) => {
        const el = pathRefs.current[i];
        if (!el) return;
        animate(el, {
          d: [
            { to: pluck(x,  amp),         duration: 80  },
            { to: pluck(x, -amp * 0.55),  duration: 110 },
            { to: pluck(x,  amp * 0.28),  duration: 130 },
            { to: pluck(x, -amp * 0.10),  duration: 160 },
            { to: rest(x),                duration: 220 },
          ],
          delay: i * STAGGER,
          ease: 'outSine',
        });
      });

      const totalWait = (STRINGS.length - 1) * STAGGER + ANIM_DUR + PAUSE;

      const fadeTimer = setTimeout(() => {
        if (cancelled) return;
        const el = overlayRef.current;
        if (el) {
          el.style.transition = `opacity ${FADE_DUR}ms ease-out`;
          el.style.opacity = '0';
        }
        const doneTimer = setTimeout(() => { if (!cancelled) onDone?.(); }, FADE_DUR);
        return () => clearTimeout(doneTimer);
      }, totalWait);

      return () => clearTimeout(fadeTimer);
    });

    return () => { cancelled = true; };
  }, [ready]);

  // Lock scroll while visible
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  return (
    <div
      ref={overlayRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: 'var(--bg-base)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Guitar tilted 50 degrees, fully visible */}
      <div style={{ transform: 'rotate(50deg)' }}>
        <svg
          viewBox="0 0 200 420"
          width={220}
          height={462}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Body */}
          <path
            d="M 100,80 C 165,80 165,175 145,210 C 130,240 165,260 180,310 C 195,355 165,390 100,390 C 35,390 5,355 20,310 C 35,260 70,240 55,210 C 35,175 35,80 100,80 Z"
            fill="var(--green-muted)"
            fillOpacity={0.8}
            stroke="var(--green-deep)"
            strokeWidth={1.2}
          />

          {/* Sound hole */}
          <circle cx="100" cy="245" r="34"
            fill="var(--green-deep)" fillOpacity={0.45}
            stroke="var(--green-deep)" strokeWidth={1} strokeOpacity={0.6}
          />
          <circle cx="100" cy="245" r="28"
            fill="none"
            stroke="var(--green-deep)" strokeWidth={0.6} strokeOpacity={0.35}
          />

          {/* Neck */}
          <rect x="88" y="18" width="24" height="82" rx="4"
            fill="var(--bg-grain)"
            stroke="var(--green-deep)" strokeWidth={0.8} strokeOpacity={0.7}
          />

          {/* Headstock */}
          <rect x="79" y="0" width="42" height="26" rx="4"
            fill="var(--bg-grain)"
            stroke="var(--green-deep)" strokeWidth={0.8} strokeOpacity={0.7}
          />

          {/* Fret lines */}
          {[28, 38, 48, 58, 68, 78].map(fy => (
            <line key={fy} x1="88" y1={fy} x2="112" y2={fy}
              stroke="var(--green-deep)" strokeWidth={0.8} strokeOpacity={0.3}
            />
          ))}

          {/* Nut */}
          <line x1="88" y1="20" x2="112" y2="20"
            stroke="var(--green-deep)" strokeWidth={1.5} strokeOpacity={0.5}
          />

          {/* Animated strings — paths not lines, same structure for anime.js morphing */}
          {STRINGS.map(({ x, thickness, color }, i) => (
            <path
              key={i}
              ref={el => { pathRefs.current[i] = el; }}
              d={rest(x)}
              stroke={color}
              strokeWidth={thickness}
              strokeLinecap="round"
              fill="none"
            />
          ))}

          {/* Bridge */}
          <rect x="72" y="315" width="56" height="10" rx="2"
            fill="var(--green-deep)" fillOpacity={0.55}
          />
          {/* Saddle */}
          <rect x="74" y="313" width="52" height="4" rx="1"
            fill="var(--bg-surface)" fillOpacity={0.6}
            stroke="var(--green-deep)" strokeWidth={0.5} strokeOpacity={0.35}
          />

          {/* Tuning pegs — 3 left, 3 right */}
          {[5, 12, 19].map(py => (
            <g key={py}>
              <circle cx="82" cy={py} r="3.5" fill="var(--green-deep)" fillOpacity={0.55} />
              <circle cx="118" cy={py} r="3.5" fill="var(--green-deep)" fillOpacity={0.55} />
              <line x1="82" y1={py} x2="88" y2={py} stroke="var(--green-deep)" strokeWidth={1} strokeOpacity={0.3} />
              <line x1="112" y1={py} x2="118" y2={py} stroke="var(--green-deep)" strokeWidth={1} strokeOpacity={0.3} />
            </g>
          ))}

          {/* Body waist detail */}
          <path
            d="M 55,210 C 60,218 70,222 80,220 M 145,210 C 140,218 130,222 120,220"
            stroke="var(--green-deep)" strokeWidth={0.6} strokeOpacity={0.22} fill="none"
          />
        </svg>
      </div>
    </div>
  );
}
