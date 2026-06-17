'use client';

import { forwardRef, useEffect, useRef, useImperativeHandle } from 'react';

const ALL_STRINGS = [
  { thickness: 3,    color: 'var(--string-E)' },
  { thickness: 2.5,  color: 'var(--string-A)' },
  { thickness: 2,    color: 'var(--string-D)' },
  { thickness: 1.5,  color: 'var(--string-G)' },
  { thickness: 1,    color: 'var(--string-B)' },
  { thickness: 0.75, color: 'var(--string-e)' },
];

function restPath(stringPos, length, isVertical) {
  const p = stringPos;
  const L = length;
  if (isVertical) {
    return `M ${p},0 C ${p},${r(L / 3)} ${p},${r(L * 2 / 3)} ${p},${L}`;
  }
  return `M 0,${p} C ${r(L / 3)},${p} ${r(L * 2 / 3)},${p} ${L},${p}`;
}

function pluckedPath(stringPos, length, amp, isVertical) {
  const p = stringPos;
  const L = length;
  if (isVertical) {
    return `M ${p},0 C ${p + amp},${r(L / 3)} ${p + amp},${r(L * 2 / 3)} ${p},${L}`;
  }
  return `M 0,${p} C ${r(L / 3)},${p + amp} ${r(L * 2 / 3)},${p + amp} ${L},${p}`;
}

function r(n) { return Math.round(n); }

const GuitarStrings = forwardRef(function GuitarStrings(props, ref) {
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
  const yPositions = STRINGS.map((_, i) =>
    r((minorAxis / (STRINGS.length + 1)) * (i + 1))
  );
  const stringLen = isVertical ? height : width;

  const pathRefs = useRef([]);
  const cooldowns = useRef([]);

  function doPluck(pathEl, stringPos, amplitude) {
    if (!pathEl) return;
    import('animejs').then(({ animate, utils }) => {
      utils.remove(pathEl);
      animate(pathEl, {
        d: [
          { to: pluckedPath(stringPos, stringLen,  amplitude,        isVertical), duration: 80  },
          { to: pluckedPath(stringPos, stringLen, -amplitude * 0.55, isVertical), duration: 110 },
          { to: pluckedPath(stringPos, stringLen,  amplitude * 0.28, isVertical), duration: 130 },
          { to: pluckedPath(stringPos, stringLen, -amplitude * 0.10, isVertical), duration: 160 },
          { to: restPath(stringPos, stringLen, isVertical),                       duration: 220 },
        ],
        ease: 'outSine',
      });
    });
  }

  function handleHover(i) {
    if (!interactive || cooldowns.current[i]) return;
    cooldowns.current[i] = true;
    setTimeout(() => { cooldowns.current[i] = false; }, 350);
    doPluck(pathRefs.current[i], yPositions[i], 10);
    onStringPluck?.(i);
  }

  function handleClick(i) {
    if (!interactive) return;
    cooldowns.current[i] = true;
    setTimeout(() => { cooldowns.current[i] = false; }, 400);
    doPluck(pathRefs.current[i], yPositions[i], 22);
    onStringPluck?.(i);
  }

  useImperativeHandle(ref, () => ({
    pluckString(index, amplitude = 14) {
      doPluck(pathRefs.current[index], yPositions[index], amplitude);
    },
  }));

  // onReady callback — reliable alternative to forwardRef when used via dynamic()
  useEffect(() => {
    onReady?.({
      pluckString(index, amplitude = 14) {
        doPluck(pathRefs.current[index], yPositions[index], amplitude);
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (!droneOnMount) return;

    import('animejs').then(({ animate }) => {
      pathRefs.current.forEach((pathEl, i) => {
        if (!pathEl) return;
        const p = yPositions[i];
        // Bass strings bow wider and oscillate slower (matches real string physics)
        const base   = droneAmplitude ?? 14;
        const A      = Math.max(base - i * 0.6, 1);
        const period = 2400 - i * 150;
        // Stagger start so strings ripple one after another
        const delay  = i * 260;
        animate(pathEl, {
          d: [
            { to: pluckedPath(p, stringLen, +A, isVertical), duration: period * 0.25 },
            { to: pluckedPath(p, stringLen, -A, isVertical), duration: period * 0.5  },
            { to: pluckedPath(p, stringLen,  0, isVertical), duration: period * 0.25 },
          ],
          loop: true,
          delay,
          ease: 'inOutSine',
        });
      });
    });

    return () => {
      import('animejs').then(({ utils }) => {
        pathRefs.current.forEach(el => el && utils.remove(el));
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [droneOnMount, width, height]);

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
        const p = yPositions[i];
        const rp = restPath(p, stringLen, isVertical);
        return (
          <g key={i}>
            {interactive && (
              <path
                d={rp}
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
              d={rp}
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
});

export default GuitarStrings;
