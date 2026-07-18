'use client';

import { useEffect, useRef } from 'react';
import ticker from '@/lib/ticker';
import { VerletString } from '@/lib/verletString';

// Verlet-physics drop-in replacement for GuitarStrings.js — same props, same
// SVG path structure (M ... C ...), same pluck/drone/onReady API — but the
// path is sampled from a real point-mass simulation each tick instead of a
// fixed 5-coefficient keyframe curve. See ANIMATION_PLAN.md concept #1.

const ALL_STRINGS = [
  { thickness: 3,    color: 'var(--string-E)' },
  { thickness: 2.5,  color: 'var(--string-A)' },
  { thickness: 2,    color: 'var(--string-D)' },
  { thickness: 1.5,  color: 'var(--string-G)' },
  { thickness: 1,    color: 'var(--string-B)' },
  { thickness: 0.75, color: 'var(--string-e)' },
];

function r(n) { return Math.round(n); }

export default function GuitarStringsPhysics(props) {
  const {
    width = 400,
    height = 60,
    count = 6,
    orientation = 'horizontal',
    opacity = 1,
    interactive = true,
    droneOnMount = false,
    droneAmplitude,
    onStringPluck,
    onReady,
    className = '',
  } = props;

  const isVertical = orientation === 'vertical';
  const STRINGS = ALL_STRINGS.slice(6 - count);

  const minorAxis = isVertical ? width : height;
  const positions = STRINGS.map((_, i) =>
    r((minorAxis / (STRINGS.length + 1)) * (i + 1))
  );
  const stringLen = isVertical ? height : width;

  const pathRefs = useRef([]);
  const enginesRef = useRef([]);
  const cooldowns = useRef([]);
  const droneStateRef = useRef([]);
  const reducedMotionRef = useRef(false);

  // (Re)build the physics engines when geometry changes.
  useEffect(() => {
    reducedMotionRef.current = typeof window !== 'undefined'
      && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    enginesRef.current = STRINGS.map(() => new VerletString({ length: stringLen, segments: 16 }));
    droneStateRef.current = STRINGS.map((_, i) => ({
      nextPluckAt: i * 0.26,
      period: (2400 - i * 150) / 1000,
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stringLen, count, orientation]);

  useEffect(() => {
    function tick(time) {
      enginesRef.current.forEach((engine, i) => {
        if (!engine) return;

        if (droneOnMount && !reducedMotionRef.current) {
          const state = droneStateRef.current[i];
          if (state && time >= state.nextPluckAt) {
            const base = droneAmplitude ?? 14;
            const amp = Math.max(base - i * 0.6, 1);
            engine.pluck(amp, 0.5, 5);
            state.nextPluckAt = time + state.period;
          }
        }

        engine.step();
        const pathEl = pathRefs.current[i];
        if (pathEl) {
          pathEl.setAttribute('d', engine.toPath({ position: positions[i], vertical: isVertical }));
        }
      });
    }

    ticker.add(tick);
    return () => ticker.remove(tick);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [droneOnMount, droneAmplitude, isVertical, positions.join(',')]);

  function doPluck(i, amplitude) {
    enginesRef.current[i]?.pluck(amplitude, 0.5, 4);
  }

  function handleHover(i) {
    if (!interactive || cooldowns.current[i]) return;
    cooldowns.current[i] = true;
    setTimeout(() => { cooldowns.current[i] = false; }, 350);
    doPluck(i, 10);
    onStringPluck?.(i);
  }

  function handleClick(i) {
    if (!interactive) return;
    doPluck(i, 22);
    onStringPluck?.(i);
  }

  // onReady callback — reliable alternative to forwardRef when loaded via dynamic().
  useEffect(() => {
    onReady?.({
      pluckString(index, amplitude = 14) {
        doPluck(index, amplitude);
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const svgProps = isVertical
    ? { width, height }
    : { width: '100%', height };

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      style={{ opacity, display: 'block', overflow: 'visible' }}
      {...svgProps}
      className={className}
      aria-hidden
    >
      {STRINGS.map(({ thickness, color }, i) => {
        const p = positions[i];
        const restD = isVertical
          ? `M ${p},0 L ${p},${stringLen}`
          : `M 0,${p} L ${stringLen},${p}`;
        return (
          <g key={i}>
            {interactive && (
              <path
                d={restD}
                stroke="transparent"
                fill="none"
                strokeWidth={16}
                onMouseEnter={() => handleHover(i)}
                onClick={() => handleClick(i)}
                style={{ cursor: 'pointer' }}
              />
            )}
            <path
              ref={el => { pathRefs.current[i] = el; }}
              d={restD}
              stroke={color}
              strokeWidth={thickness}
              fill="none"
              strokeLinecap="round"
              pointerEvents="none"
            />
          </g>
        );
      })}
    </svg>
  );
}
