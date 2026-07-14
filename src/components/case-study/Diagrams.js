import { Fragment } from "react";

// Small, self-contained diagrams for case-study pages. Colors lean on the
// site's green tokens, plus a couple of one-off accents (amber / sky) that
// mirror DDP Hunt's own in-app palette for the DDP diagrams specifically.

const AMBER = "#D9922E";
const SKY = "#4A82B8";
const MID_GREEN = "#7FAE4A";

function ArrowGlyph() {
  return (
    <svg width="20" height="12" viewBox="0 0 20 12" fill="none" aria-hidden="true">
      <path
        d="M1 6H18M18 6L13 1M18 6L13 11"
        stroke="var(--text-muted)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function DiagramCard({ children, label }) {
  return (
    <div
      className="rounded-xl border border-[var(--line)] bg-[var(--bg-surface)] p-6 lg:p-8"
      style={{ boxShadow: "0 2px 14px rgba(0,0,0,0.06)" }}
    >
      {label && (
        <p className="font-mono text-[0.68rem] text-[var(--text-muted)] uppercase tracking-[0.15em] mb-5">
          {label}
        </p>
      )}
      {children}
    </div>
  );
}

export function DdpFlowDiagram() {
  const steps = [
    { n: "01", title: "Scan", desc: "The camera scanner reads a QR code at a booth or talk.", color: AMBER },
    { n: "02", title: "Validate & claim", desc: "Identifier checked against the item's window and claim cap.", color: SKY },
    { n: "03", title: "Points + achievements", desc: "Points are credited and achievement triggers are checked.", color: "var(--green-deep)" },
    { n: "04", title: "Leaderboard & shop", desc: "Standings update and points are spendable immediately.", color: "var(--green-deep)" },
  ];

  return (
    <DiagramCard label="The hunt loop">
      <div className="flex flex-col lg:flex-row lg:items-start gap-1">
        {steps.map((s, i) => (
          <Fragment key={s.n}>
            <div className="flex-1 flex flex-col gap-3 py-1 lg:pr-4">
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center font-mono text-[0.7rem] text-white flex-shrink-0"
                style={{ background: s.color }}
              >
                {s.n}
              </div>
              <h4 className="font-heading text-lg text-[var(--text-primary)]">{s.title}</h4>
              <p className="font-body text-sm leading-relaxed text-[var(--text-secondary)]">{s.desc}</p>
            </div>
            {i < steps.length - 1 && (
              <div className="hidden lg:flex items-center px-2 pt-3 opacity-40 flex-shrink-0" aria-hidden="true">
                <ArrowGlyph />
              </div>
            )}
            {i < steps.length - 1 && (
              <div className="lg:hidden h-6 w-px ml-4" style={{ background: "var(--line-strong)" }} aria-hidden="true" />
            )}
          </Fragment>
        ))}
      </div>
    </DiagramCard>
  );
}

function ArchNode({ title, desc, primary, accent, small }) {
  return (
    <div
      className={`text-center rounded-lg border mx-auto ${small ? "py-3 px-4 max-w-[210px]" : "py-4 px-6 max-w-[320px]"}`}
      style={{
        borderColor: accent ? accent : primary ? "var(--green-deep)" : "var(--line-strong)",
        background: primary ? "var(--green-soft)" : "var(--bg-base)",
      }}
    >
      <div className="font-heading text-base leading-tight" style={{ color: accent ? accent : "var(--text-primary)" }}>
        {title}
      </div>
      <div className="font-mono text-[0.63rem] text-[var(--text-muted)] mt-1.5 leading-snug">{desc}</div>
    </div>
  );
}

export function DdpArchitectureDiagram() {
  const branches = [
    { title: "Auth0", desc: "Role-based access — Admin, Volunteer, Hunter", color: AMBER },
    { title: "MongoDB + Mongoose", desc: "Hunt items, users, points, audit log", color: "var(--green-deep)" },
    { title: "Cloudinary", desc: "Shop & collectible images", color: SKY },
  ];

  return (
    <DiagramCard label="System overview">
      <div className="flex flex-col items-center">
        <ArchNode title="Browser" desc="Attendees scan; organizers manage the event" />
        <div className="h-7 w-px" style={{ background: "var(--line-strong)" }} aria-hidden="true" />
        <ArchNode title="Next.js App Router" desc="Server components, API routes, role checks" primary />

        <div className="relative w-full max-w-[600px] mt-0">
          <div className="hidden sm:block absolute top-0 h-px" style={{ left: "16.6667%", right: "16.6667%", background: "var(--line-strong)" }} aria-hidden="true" />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-3 pt-0 sm:pt-7">
            {branches.map((b) => (
              <div key={b.title} className="flex flex-col items-center gap-2">
                <div className="hidden sm:block h-7 w-px" style={{ background: "var(--line-strong)" }} aria-hidden="true" />
                <ArchNode title={b.title} desc={b.desc} accent={b.color} small />
              </div>
            ))}
          </div>
        </div>
      </div>
    </DiagramCard>
  );
}

export function SimilarityBreakdown() {
  const segments = [
    { label: "Tag overlap", value: 50, color: "var(--green-deep)" },
    { label: "Keyword match", value: 35, color: MID_GREEN },
    { label: "Emotional similarity", value: 15, color: "var(--green-muted)" },
  ];

  return (
    <DiagramCard label="Similarity score weighting">
      <div className="flex gap-[2px] h-4 rounded-full overflow-hidden">
        {segments.map((s) => (
          <div key={s.label} style={{ width: `${s.value}%`, background: s.color }} />
        ))}
      </div>
      <div className="flex flex-wrap gap-x-6 gap-y-2 mt-5">
        {segments.map((s) => (
          <div key={s.label} className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: s.color }} aria-hidden="true" />
            <span className="font-body text-sm text-[var(--text-secondary)]">{s.label}</span>
            <span className="font-mono text-xs text-[var(--text-muted)]">{s.value}%</span>
          </div>
        ))}
      </div>
    </DiagramCard>
  );
}

export function DiabetesAccuracyBars() {
  const bars = [
    { label: "Training accuracy", value: 78.7, color: "var(--green-deep)" },
    { label: "Test accuracy", value: 77.3, color: "var(--green-muted)" },
  ];

  return (
    <DiagramCard label="Model accuracy">
      <div className="space-y-5">
        {bars.map((b) => (
          <div key={b.label}>
            <div className="flex items-baseline justify-between mb-1.5">
              <span className="font-body text-sm text-[var(--text-secondary)]">{b.label}</span>
              <span className="font-mono text-sm text-[var(--text-primary)]">{b.value}%</span>
            </div>
            <div className="h-2.5 rounded-full overflow-hidden" style={{ background: "var(--bg-grain)" }}>
              <div className="h-full rounded-full" style={{ width: `${b.value}%`, background: b.color }} />
            </div>
          </div>
        ))}
      </div>
    </DiagramCard>
  );
}
