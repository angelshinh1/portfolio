export default function GuitarIllustration({ style, className = '' }) {
  return (
    <svg
      viewBox="0 0 200 420"
      width={200}
      height={420}
      style={style}
      className={className}
      aria-hidden
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Guitar body — figure-8 silhouette */}
      <path
        d="M 100,80
           C 165,80 165,175 145,210
           C 130,240 165,260 180,310
           C 195,355 165,390 100,390
           C 35,390 5,355 20,310
           C 35,260 70,240 55,210
           C 35,175 35,80 100,80 Z"
        fill="var(--green-muted)"
        fillOpacity={0.65}
        stroke="var(--green-deep)"
        strokeWidth={1.2}
      />

      {/* Sound hole */}
      <circle
        cx="100" cy="245" r="34"
        fill="var(--green-deep)"
        fillOpacity={0.35}
        stroke="var(--green-deep)"
        strokeWidth={1}
        strokeOpacity={0.5}
      />
      {/* Inner sound hole ring */}
      <circle
        cx="100" cy="245" r="28"
        fill="none"
        stroke="var(--green-deep)"
        strokeWidth={0.6}
        strokeOpacity={0.3}
      />

      {/* Neck */}
      <rect
        x="88" y="18" width="24" height="82" rx="4"
        fill="var(--bg-grain)"
        stroke="var(--green-deep)"
        strokeWidth={0.8}
        strokeOpacity={0.6}
      />

      {/* Headstock */}
      <rect
        x="79" y="0" width="42" height="26" rx="4"
        fill="var(--bg-grain)"
        stroke="var(--green-deep)"
        strokeWidth={0.8}
        strokeOpacity={0.6}
      />

      {/* Fret lines (6 frets) */}
      {[28, 38, 48, 58, 68, 78].map(fy => (
        <line
          key={fy}
          x1="88" y1={fy} x2="112" y2={fy}
          stroke="var(--green-deep)"
          strokeWidth={0.8}
          strokeOpacity={0.25}
        />
      ))}

      {/* Nut (top of neck) */}
      <line
        x1="88" y1="20" x2="112" y2="20"
        stroke="var(--green-deep)"
        strokeWidth={1.5}
        strokeOpacity={0.4}
      />

      {/* 6 strings running from bridge to nut */}
      {[91, 94.2, 97.4, 100.6, 103.8, 107].map((sx, i) => (
        <line
          key={i}
          x1={sx} y1="20" x2={sx} y2="320"
          stroke="var(--green-deep)"
          strokeWidth={i < 3 ? 0.9 - i * 0.1 : 0.55}
          strokeOpacity={0.2}
        />
      ))}

      {/* Bridge */}
      <rect
        x="72" y="315" width="56" height="10" rx="2"
        fill="var(--green-deep)"
        fillOpacity={0.5}
      />
      {/* Saddle */}
      <rect
        x="74" y="313" width="52" height="4" rx="1"
        fill="var(--bg-surface)"
        fillOpacity={0.6}
        stroke="var(--green-deep)"
        strokeWidth={0.5}
        strokeOpacity={0.3}
      />

      {/* Tuning pegs — 3 left, 3 right */}
      {[5, 12, 19].map(py => (
        <g key={py}>
          <circle cx="82" cy={py} r="3.5" fill="var(--green-deep)" fillOpacity={0.45} />
          <circle cx="118" cy={py} r="3.5" fill="var(--green-deep)" fillOpacity={0.45} />
          {/* Peg stem */}
          <line x1="82" y1={py} x2="88" y2={py} stroke="var(--green-deep)" strokeWidth={1} strokeOpacity={0.25} />
          <line x1="112" y1={py} x2="118" y2={py} stroke="var(--green-deep)" strokeWidth={1} strokeOpacity={0.25} />
        </g>
      ))}

      {/* Body waist detail line */}
      <path
        d="M 55,210 C 60,218 70,222 80,220 M 145,210 C 140,218 130,222 120,220"
        stroke="var(--green-deep)"
        strokeWidth={0.6}
        strokeOpacity={0.18}
        fill="none"
      />
    </svg>
  );
}
