'use client';

import { useEffect, useRef } from 'react';
import Camera from './Camera';

const START = 250;    // ms before the lens comes apart
const LIFT_AT = 1900; // ms when the curtain starts lifting (the lens is settling back by then)
const FADE = 500;     // ms overlay fade-out

// The lens comes apart and springs back together, then the page is revealed
export default function LoadingScreen({ onDone }) {
  const overlayRef = useRef(null);
  const cameraRef = useRef(null);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const timers = [];
    const later = (fn, ms) => timers.push(setTimeout(fn, ms));

    const lift = () => {
      const el = overlayRef.current;
      if (el) {
        el.style.transition = `opacity ${FADE}ms ease-out`;
        el.style.opacity = '0';
      }
      later(() => onDone?.(), FADE);
    };

    if (reduced) {
      lift();
    } else {
      later(() => cameraRef.current?.explode({ fast: true }), START);
      later(lift, LIFT_AT);
    }

    return () => timers.forEach(clearTimeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      <Camera apiRef={cameraRef} priority className="w-[240px] sm:w-[280px]" style={{ rotate: '-4deg' }} sizes="280px" />
    </div>
  );
}
