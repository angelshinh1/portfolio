'use client';

import { useEffect, useRef, useState } from 'react';
import GuitarStrings from './GuitarStrings';

const PEG_CYS = [10, 26, 42];
const NOTES = [
  { symbol: '♩', left: '8%',  top: '12%',  size: '1rem',  opacity: 0.28 },
  { symbol: '♫', left: '22%', top: '68%',  size: '0.8rem', opacity: 0.22 },
  { symbol: '♬', left: '50%', top: '8%',   size: '1.1rem', opacity: 0.25 },
  { symbol: '♪', left: '74%', top: '72%',  size: '0.85rem', opacity: 0.20 },
  { symbol: '♩', left: '88%', top: '15%',  size: '0.9rem', opacity: 0.22 },
];

export default function GuitarDivider() {
  const containerRef = useRef(null);
  const stringsRef = useRef(null);
  const hasAnimated = useRef(false);
  const lastPlucked = useRef({});
  const [containerWidth, setContainerWidth] = useState(0);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setContainerWidth(el.offsetWidth));
    ro.observe(el);
    setContainerWidth(el.offsetWidth);
    return () => ro.disconnect();
  }, []);

  // Scroll-triggered cascade pluck
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !hasAnimated.current) {
        hasAnimated.current = true;
        [0, 1, 2, 3, 4, 5].forEach(i => {
          setTimeout(() => stringsRef.current?.pluckString(i, 14), i * 110);
        });
      }
    }, { threshold: 0.5 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // Nearest-string hover pluck on mouse move
  function handleMouseMove(e) {
    if (!containerRef.current || !stringsRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const relY = e.clientY - rect.top;
    const idx = Math.min(5, Math.max(0, Math.round((relY / rect.height) * 5)));
    const now = Date.now();
    if (now - (lastPlucked.current[idx] ?? 0) < 400) return;
    lastPlucked.current[idx] = now;
    stringsRef.current.pluckString(idx, 10);
  }

  const stringAreaWidth = Math.max(0, containerWidth - 128);

  return (
    <div
      ref={containerRef}
      className="relative bg-[var(--bg-base)] py-8 overflow-hidden select-none"
      style={{ minHeight: 76 }}
      onMouseMove={handleMouseMove}
      aria-hidden
    >
      {/* Floating musical note symbols */}
      {NOTES.map((n, i) => (
        <span
          key={i}
          className="absolute pointer-events-none font-body"
          style={{
            left: n.left,
            top: n.top,
            fontSize: n.size,
            opacity: n.opacity,
            color: 'var(--green-deep)',
            transform: 'translateY(-50%)',
            userSelect: 'none',
          }}
        >
          {n.symbol}
        </span>
      ))}

      {/* Left tuning peg cluster */}
      <svg width="24" height="60" className="absolute left-6 top-1/2 -translate-y-1/2">
        {PEG_CYS.map((cy, i) => (
          <circle key={i} cx="12" cy={cy} r="4.5" fill="var(--string-E)" opacity={0.45} />
        ))}
      </svg>

      {/* Strings */}
      <div className="absolute left-16 right-16 top-1/2 -translate-y-1/2">
        {containerWidth > 0 && (
          <GuitarStrings
            ref={stringsRef}
            width={stringAreaWidth}
            height={60}
            count={6}
            interactive
          />
        )}
      </div>

      {/* Right tuning peg cluster */}
      <svg width="24" height="60" className="absolute right-6 top-1/2 -translate-y-1/2">
        {PEG_CYS.map((cy, i) => (
          <circle key={i} cx="12" cy={cy} r="4.5" fill="var(--string-e)" opacity={0.45} />
        ))}
      </svg>
    </div>
  );
}
