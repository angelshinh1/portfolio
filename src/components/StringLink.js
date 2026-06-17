'use client';

import { useRef } from 'react';

export default function StringLink({ href, children, target, rel, className = '' }) {
  const pathRef = useRef(null);

  function handleHover() {
    if (!pathRef.current) return;
    import('animejs').then(({ animate, utils }) => {
      utils.remove(pathRef.current);
      animate(pathRef.current, {
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
    <span
      className={`relative inline-block ${className}`}
      onMouseEnter={handleHover}
    >
      <a
        href={href}
        target={target}
        rel={rel}
        className="text-[var(--green-deep)] font-medium transition-opacity duration-200 hover:opacity-80"
      >
        {children}
      </a>
      <svg
        className="absolute -bottom-[4px] left-0 w-full h-[6px] overflow-visible pointer-events-none"
        viewBox="0 0 60 6"
        preserveAspectRatio="none"
        aria-hidden
      >
        <path
          ref={pathRef}
          d="M 0,3 C 20,3 40,3 60,3"
          stroke="var(--green-deep)"
          strokeWidth="1.2"
          fill="none"
          strokeLinecap="round"
          opacity={0.55}
        />
      </svg>
    </span>
  );
}
