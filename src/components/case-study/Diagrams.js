// Small, self-contained diagrams for case-study pages. Colors lean on the
// site's green tokens, plus a couple of one-off accents (amber / sky) that
// mirror DDP Hunt's own in-app palette for the DDP diagrams specifically.
//
// Deliberately avoids the generic "boxes + connector lines" flowchart look —
// no bordered rectangles, no thin gray lines with a dot in the middle.
// Hierarchy and flow are carried by icon badges, typography, and (for the
// hunt loop) an actual circular layout, not wireframe shapes.

const AMBER = "#D9922E";
const SKY = "#4A82B8";
const MID_GREEN = "#7FAE4A";

// ── Icons — 24x24 line icons, matching the strokeWidth/round-cap convention
// already used for the GitHub/link icons elsewhere in the case-study pages.
function Icon({ children, size = 18, color = "currentColor", strokeWidth = 2 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

const IconScan = (props) => (
  <Icon {...props}>
    <path d="M7 3H5a2 2 0 0 0-2 2v2" />
    <path d="M17 3h2a2 2 0 0 1 2 2v2" />
    <path d="M7 21H5a2 2 0 0 1-2-2v-2" />
    <path d="M17 21h2a2 2 0 0 0 2-2v-2" />
    <line x1="12" y1="7" x2="12" y2="17" />
  </Icon>
);

const IconShieldCheck = (props) => (
  <Icon {...props}>
    <path d="M12 2l7 3v6c0 5-3.5 8.5-7 10-3.5-1.5-7-5-7-10V5l7-3Z" />
    <path d="M9 12l2 2 4-4" />
  </Icon>
);

const IconStar = (props) => (
  <Icon {...props}>
    <path d="M12 2.5l2.6 5.9 6.4.6-4.8 4.3 1.4 6.2L12 16.4l-5.6 3.1 1.4-6.2-4.8-4.3 6.4-.6L12 2.5Z" />
  </Icon>
);

const IconTrophy = (props) => (
  <Icon {...props}>
    <path d="M8 3h8v5a4 4 0 0 1-8 0V3Z" />
    <path d="M8 4H5a1 1 0 0 0-1 1v1a4 4 0 0 0 4 4" />
    <path d="M16 4h3a1 1 0 0 1 1 1v1a4 4 0 0 1-4 4" />
    <path d="M10 15v3M14 15v3M8 21h8" />
  </Icon>
);

const IconBrowser = (props) => (
  <Icon {...props}>
    <rect x="3" y="4" width="18" height="16" rx="2" />
    <line x1="3" y1="9" x2="21" y2="9" />
  </Icon>
);

const IconLayers = (props) => (
  <Icon {...props}>
    <rect x="4" y="4" width="16" height="5" rx="1.5" />
    <rect x="4" y="10" width="16" height="5" rx="1.5" />
    <rect x="4" y="16" width="16" height="4" rx="1.5" />
  </Icon>
);

const IconLock = (props) => (
  <Icon {...props}>
    <rect x="5" y="11" width="14" height="9" rx="2" />
    <path d="M8 11V7a4 4 0 0 1 8 0v4" />
  </Icon>
);

const IconDatabase = (props) => (
  <Icon {...props}>
    <ellipse cx="12" cy="5" rx="8" ry="3" />
    <path d="M4 5v6c0 1.7 3.6 3 8 3s8-1.3 8-3V5" />
    <path d="M4 11v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6" />
  </Icon>
);

const IconCloud = (props) => (
  <Icon {...props}>
    <path d="M7 18h10a4 4 0 0 0 .5-7.97A6 6 0 0 0 6.06 9.5 4 4 0 0 0 7 18Z" />
  </Icon>
);

const IconTag = (props) => (
  <Icon {...props}>
    <path d="M12.6 2.6 21 11l-8.4 8.4a2 2 0 0 1-2.8 0L3 12.6V4a1.4 1.4 0 0 1 1.4-1.4H12.6Z" />
    <circle cx="7.5" cy="7.5" r="1.3" fill="currentColor" stroke="none" />
  </Icon>
);

const IconHash = (props) => (
  <Icon {...props}>
    <line x1="5" y1="9" x2="20" y2="9" />
    <line x1="4" y1="15" x2="19" y2="15" />
    <line x1="10" y1="3" x2="8" y2="21" />
    <line x1="16" y1="3" x2="14" y2="21" />
  </Icon>
);

const IconHeart = (props) => (
  <Icon {...props}>
    <path d="M12 20.5s-7-4.6-9.3-8.9C1.2 8.6 2.6 5 6.2 5c2 0 3.4 1.1 4 2.4A4.4 4.4 0 0 1 14.4 5c3.6 0 5 3.6 3.5 6.6C15.6 15.9 12 20.5 12 20.5Z" />
  </Icon>
);

const IconTarget = (props) => (
  <Icon {...props}>
    <circle cx="12" cy="12" r="8.5" />
    <circle cx="12" cy="12" r="4.5" />
    <circle cx="12" cy="12" r="0.8" fill="currentColor" stroke="none" />
  </Icon>
);

const IconFlask = (props) => (
  <Icon {...props}>
    <path d="M9 2h6M10 2v6.5L4.8 18a2 2 0 0 0 1.7 3h11a2 2 0 0 0 1.7-3L14 8.5V2" />
    <line x1="8" y1="14" x2="16" y2="14" />
  </Icon>
);

function DiagramCard({ children, label, corner }) {
  return (
    <div
      className="rounded-xl border border-[var(--line)] bg-[var(--bg-surface)] p-6 lg:p-8"
      style={{ boxShadow: "0 2px 14px rgba(0,0,0,0.06)" }}
    >
      {label && (
        <div className="flex items-center justify-between gap-4 mb-6">
          <p className="font-mono text-[0.68rem] text-[var(--text-muted)] uppercase tracking-[0.15em]">
            {label}
          </p>
          {corner}
        </div>
      )}
      {children}
    </div>
  );
}

// ── The hunt loop — an actual ring, not a row of circles with an arrow
// between them. Four stops around a dashed circle; the arc's open end
// closes with a real arrowhead pointing back into the first stop.
export function DdpFlowDiagram() {
  const R = 165;
  const C = 240;
  const steps = [
    { title: "Scan", desc: "The camera scanner reads a QR code at a booth or talk.", color: AMBER, Icon: IconScan, x: C, y: C - R },
    { title: "Validate & claim", desc: "Identifier checked against the item's window and claim cap.", color: SKY, Icon: IconShieldCheck, x: C + R, y: C },
    { title: "Points + achievements", desc: "Points are credited and achievement triggers are checked.", color: "var(--green-deep)", Icon: IconStar, x: C, y: C + R },
    { title: "Leaderboard & shop", desc: "Standings update and points are spendable immediately.", color: "var(--green-deep)", Icon: IconTrophy, x: C - R, y: C },
  ];

  return (
    <DiagramCard
      label="The hunt loop"
      corner={
        <span className="font-mono text-[0.62rem] text-[var(--text-muted)] uppercase tracking-wide whitespace-nowrap flex-shrink-0">
          Repeats every scan ↻
        </span>
      }
    >
      <div className="flex flex-col md:flex-row items-center md:items-center gap-8 md:gap-10">
        <svg
          viewBox="0 0 480 480"
          className="w-full max-w-[230px] md:max-w-[220px] flex-shrink-0"
          role="img"
          aria-label="Circular diagram: scan, then validate and claim, then points and achievements, then leaderboard and shop, looping back to scan"
        >
          <defs>
            <marker id="loop-arrow" viewBox="0 0 10 10" refX="7.5" refY="5" markerWidth="6.5" markerHeight="6.5" orient="auto-start-reverse">
              <path d="M0,0 L10,5 L0,10 Z" fill="var(--green-deep)" />
            </marker>
          </defs>

          {/* almost-full ring; the small gap is where the arrowhead closes the loop */}
          <path
            d={`M ${C + R * Math.cos(-85 * Math.PI / 180)},${C + R * Math.sin(-85 * Math.PI / 180)} A ${R},${R} 0 1 1 ${C + R * Math.cos(-95 * Math.PI / 180)},${C + R * Math.sin(-95 * Math.PI / 180)}`}
            fill="none"
            stroke="var(--green-deep)"
            strokeWidth="2.5"
            strokeDasharray="1 11"
            strokeLinecap="round"
            opacity="0.55"
            markerEnd="url(#loop-arrow)"
          />

          {steps.map((s) => (
            <g key={s.title}>
              <circle cx={s.x} cy={s.y} r="42" fill={s.color} />
              <foreignObject x={s.x - 21} y={s.y - 21} width="42" height="42">
                <div className="w-full h-full flex items-center justify-center">
                  <s.Icon size={22} color="#fff" strokeWidth={2} />
                </div>
              </foreignObject>
            </g>
          ))}
        </svg>

        <div className="flex-1 grid grid-cols-1 gap-5 w-full">
          {steps.map((s, i) => (
            <div key={s.title} className="flex gap-3">
              <span className="font-mono text-[0.65rem] text-[var(--text-muted)] mt-1 flex-shrink-0 w-4">{i + 1}</span>
              <div>
                <h4 className="font-heading text-lg leading-tight" style={{ color: s.color }}>{s.title}</h4>
                <p className="font-body text-sm leading-relaxed text-[var(--text-secondary)] mt-0.5">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DiagramCard>
  );
}

// ── System overview — no bordered boxes. Browser and the app router are
// plain icon+label stages joined by a chevron; the three services collapse
// into a single unified panel divided by hairlines, read as one layer.
function FlowStage({ icon, title, desc, filled }) {
  return (
    <div
      className={`flex items-center gap-3 rounded-full ${filled ? "px-6 py-3" : ""}`}
      style={filled ? { background: "var(--green-deep)" } : undefined}
    >
      <span
        className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
        style={{ background: filled ? "rgba(255,255,255,0.18)" : "var(--bg-grain)" }}
      >
        {icon}
      </span>
      <div>
        <div className="font-heading text-lg leading-tight" style={{ color: filled ? "#fff" : "var(--text-primary)" }}>
          {title}
        </div>
        <div className="font-mono text-[0.62rem] mt-0.5" style={{ color: filled ? "rgba(255,255,255,0.75)" : "var(--text-muted)" }}>
          {desc}
        </div>
      </div>
    </div>
  );
}

function FlowChevron() {
  return (
    <div className="py-1.5" aria-hidden="true">
      <svg width="16" height="9" viewBox="0 0 16 9" fill="none">
        <path d="M1 1L8 8L15 1" stroke="var(--green-deep)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" opacity="0.55" />
      </svg>
    </div>
  );
}

export function DdpArchitectureDiagram() {
  const services = [
    { title: "Auth0", desc: "Role-based access — Admin, Volunteer, Hunter", color: AMBER, icon: <path d="M5 11V7a4 4 0 0 1 8 0v4M3.5 11h9a1.5 1.5 0 0 1 1.5 1.5v6a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 18.5v-6A1.5 1.5 0 0 1 3.5 11Z" /> },
    { title: "MongoDB + Mongoose", desc: "Hunt items, users, points, audit log", color: "var(--green-deep)", icon: <><ellipse cx="8" cy="4" rx="6" ry="2.2" /><path d="M2 4v10c0 1.2 2.7 2.2 6 2.2s6-1 6-2.2V4" /></> },
    { title: "Cloudinary", desc: "Shop & collectible images", color: SKY, icon: <path d="M5 15h9a3.3 3.3 0 0 0 .4-6.6A5 5 0 0 0 4.7 6.9 3.3 3.3 0 0 0 5 15Z" /> },
  ];

  return (
    <DiagramCard label="System overview">
      <div className="flex flex-col items-center">
        <FlowStage icon={<IconBrowser size={18} color="var(--text-primary)" />} title="Browser" desc="Attendees scan; organizers manage the event" />
        <FlowChevron />
        <FlowStage icon={<IconLayers size={18} color="#fff" />} title="Next.js App Router" desc="Server components, API routes, role checks" filled />
        <FlowChevron />

        <div className="w-full max-w-[620px] rounded-2xl border border-[var(--line)] overflow-hidden" style={{ background: "var(--bg-base)" }}>
          <div className="grid grid-cols-1 sm:grid-cols-3">
            {services.map((s, i) => (
              <div
                key={s.title}
                className={`flex items-start gap-3 p-5 ${i > 0 ? "sm:border-l border-t sm:border-t-0" : ""}`}
                style={{ borderColor: "var(--line)" }}
              >
                <span
                  className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ background: s.color }}
                >
                  <Icon size={16} color="#fff" strokeWidth={2}>{s.icon}</Icon>
                </span>
                <div>
                  <div className="font-heading text-[0.98rem] leading-tight" style={{ color: s.color }}>{s.title}</div>
                  <div className="font-mono text-[0.62rem] text-[var(--text-muted)] mt-1 leading-snug">{s.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DiagramCard>
  );
}

// ── Shared stat-bar-list treatment for the two ML case studies — icon badge,
// label, big mono value, full-width bar. Same language, different numbers.
function StatBar({ Icon: BarIcon, label, value, displayValue, color }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <span className="flex items-center gap-2.5">
          <span
            className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
            style={{ background: color }}
          >
            <BarIcon size={14} color="#fff" strokeWidth={2.1} />
          </span>
          <span className="font-body text-sm text-[var(--text-secondary)]">{label}</span>
        </span>
        <span className="font-mono text-sm text-[var(--text-primary)]">{displayValue}</span>
      </div>
      <div className="h-2.5 rounded-full overflow-hidden" style={{ background: "var(--bg-grain)" }}>
        <div className="h-full rounded-full" style={{ width: `${value}%`, background: color }} />
      </div>
    </div>
  );
}

export function SimilarityBreakdown() {
  const segments = [
    { label: "Tag overlap", value: 50, color: "var(--green-deep)", Icon: IconTag },
    { label: "Keyword match", value: 35, color: MID_GREEN, Icon: IconHash },
    { label: "Emotional similarity", value: 15, color: "var(--green-muted)", Icon: IconHeart },
  ];

  return (
    <DiagramCard label="Similarity score weighting">
      <div className="space-y-5">
        {segments.map((s) => (
          <StatBar key={s.label} Icon={s.Icon} label={s.label} value={s.value} displayValue={`${s.value}%`} color={s.color} />
        ))}
      </div>
    </DiagramCard>
  );
}

export function DiabetesAccuracyBars() {
  const bars = [
    { label: "Training accuracy", value: 78.7, color: "var(--green-deep)", Icon: IconTarget },
    { label: "Test accuracy", value: 77.3, color: "var(--green-muted)", Icon: IconFlask },
  ];

  return (
    <DiagramCard label="Model accuracy">
      <div className="space-y-5">
        {bars.map((b) => (
          <StatBar key={b.label} Icon={b.Icon} label={b.label} value={b.value} displayValue={`${b.value}%`} color={b.color} />
        ))}
      </div>
    </DiagramCard>
  );
}
