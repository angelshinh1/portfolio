// Hand-drawn architecture diagrams for case studies that have no screenshots.
// Plain inline SVG — no library, no network — coloured from the site's own
// tokens so a diagram reads as part of the page rather than a pasted image.

const INK = "var(--text-primary)";
const MUTED = "var(--text-muted)";
const LINE = "var(--green-deep)";
const SURFACE = "var(--bg-surface)";
const SOFT = "var(--green-soft)";

function Box({ x, y, w, h, lines, fill = SURFACE, dashed = false }) {
  const centerX = x + w / 2;
  // Vertically centre the whole stack of lines on the box
  const startY = y + h / 2 - ((lines.length - 1) * 15) / 2 + 5;

  return (
    <g>
      <rect
        x={x} y={y} width={w} height={h} rx="10"
        fill={fill}
        stroke={LINE}
        strokeWidth="1.2"
        strokeOpacity={dashed ? 0.5 : 0.85}
        strokeDasharray={dashed ? "5 4" : undefined}
      />
      {lines.map((line, i) => (
        <text
          key={i}
          x={centerX}
          y={startY + i * 15}
          textAnchor="middle"
          fill={i === 0 ? INK : MUTED}
          fontSize={i === 0 ? 13 : 11}
          fontWeight={i === 0 ? 600 : 400}
          fontFamily="var(--font-sans)"
        >
          {line}
        </text>
      ))}
    </g>
  );
}

function Arrow({ from, to, label, dashed = false, labelDy = -7 }) {
  const [x1, y1] = from;
  const [x2, y2] = to;
  return (
    <g>
      <line
        x1={x1} y1={y1} x2={x2} y2={y2}
        stroke={LINE}
        strokeWidth="1.3"
        strokeOpacity={dashed ? 0.5 : 0.8}
        strokeDasharray={dashed ? "4 4" : undefined}
        markerEnd="url(#arrowhead)"
      />
      {label && (
        <text
          x={(x1 + x2) / 2}
          y={(y1 + y2) / 2 + labelDy}
          textAnchor="middle"
          fill={MUTED}
          fontSize="10.5"
          fontFamily="var(--font-sans)"
        >
          {label}
        </text>
      )}
    </g>
  );
}

function Frame({ viewBox, minWidth, children }) {
  // Diagrams keep their proportions and scroll sideways on narrow screens
  // rather than shrinking their labels into illegibility.
  return (
    <div className="w-full overflow-x-auto">
      <svg
        viewBox={viewBox}
        style={{ width: "100%", minWidth, height: "auto", display: "block" }}
        role="img"
      >
        <defs>
          <marker id="arrowhead" markerWidth="9" markerHeight="7" refX="8" refY="3.5" orient="auto">
            <polygon points="0 0, 9 3.5, 0 7" fill={LINE} fillOpacity="0.8" />
          </marker>
        </defs>
        {children}
      </svg>
    </div>
  );
}

// ── Where a request goes once it leaves the browser ──────────────────────────
function FragmentsAws() {
  return (
    <Frame viewBox="0 0 920 430" minWidth={700}>
      <title>Fragments request path on AWS</title>

      <Box x={16} y={186} w={150} h={64} lines={["fragments-ui", "browser client"]} />
      <Box x={252} y={40} w={182} h={64} lines={["Amazon Cognito", "user pool + hosted UI"]} fill={SOFT} />
      <Box x={252} y={186} w={182} h={64} lines={["Application", "Load Balancer"]} />
      <Box x={510} y={168} w={196} h={100} lines={["ECS Fargate", "fragments container", "Express · Node 24 alpine"]} fill={SOFT} />
      <Box x={760} y={120} w={148} h={62} lines={["DynamoDB", "fragment metadata"]} />
      <Box x={760} y={254} w={148} h={62} lines={["S3", "fragment blobs"]} />
      <Box x={510} y={330} w={196} h={54} lines={["CloudWatch Logs", "pino → awslogs driver"]} dashed />

      {/* Sign-in happens before anything else touches the API */}
      <Arrow from={[91, 186]} to={[91, 72]} />
      <Arrow from={[91, 72]} to={[248, 72]} label="1 · sign in" labelDy={-8} />
      <Arrow from={[166, 218]} to={[248, 218]} label="2 · Bearer token" />
      <Arrow from={[434, 218]} to={[506, 218]} label="3" />
      {/* The container checks the token against Cognito's keys itself */}
      <Arrow from={[528, 166]} to={[430, 110]} dashed label="verify JWT" labelDy={-8} />
      <Arrow from={[706, 200]} to={[756, 160]} label="metadata" labelDy={-6} />
      <Arrow from={[706, 240]} to={[756, 278]} label="data" labelDy={14} />
      <Arrow from={[608, 268]} to={[608, 326]} dashed />

      <text x={608} y={410} textAnchor="middle" fill={MUTED} fontSize="10.5" fontFamily="var(--font-sans)">
        One record per fragment, split across two stores: small metadata in DynamoDB, the bytes in S3.
      </text>
    </Frame>
  );
}

// ── What happens between a commit and a running container ────────────────────
function FragmentsPipeline() {
  return (
    <Frame viewBox="0 0 920 400" minWidth={720}>
      <title>Fragments CI and CD pipelines</title>

      {/* CI lane — every push to main */}
      <rect x={16} y={30} width={888} height={130} rx="12" fill="none" stroke={LINE} strokeWidth="1" strokeOpacity="0.28" strokeDasharray="6 5" />
      <text x={32} y={52} fill={MUTED} fontSize="11" fontWeight="600" fontFamily="var(--font-sans)" letterSpacing="0.08em">
        CI · ON EVERY PUSH TO MAIN
      </text>

      <Box x={32} y={66} w={126} h={62} lines={["ESLint", "+ Prettier"]} />
      <Box x={186} y={66} w={126} h={62} lines={["hadolint", "Dockerfile lint"]} />
      <Box x={340} y={66} w={150} h={62} lines={["Jest + Supertest", "unit tests · 80%+"]} />
      <Box x={518} y={66} w={180} h={62} lines={["Hurl", "integration tests"]} />
      <Box x={726} y={60} w={162} h={74} lines={["docker compose", "DynamoDB Local +", "MiniStack (S3)"]} dashed />

      <Arrow from={[698, 97]} to={[722, 97]} />

      {/* CD lane — only on a version tag */}
      <rect x={16} y={196} width={888} height={130} rx="12" fill="none" stroke={LINE} strokeWidth="1" strokeOpacity="0.28" strokeDasharray="6 5" />
      <text x={32} y={218} fill={MUTED} fontSize="11" fontWeight="600" fontFamily="var(--font-sans)" letterSpacing="0.08em">
        CD · ONLY ON A v* GIT TAG
      </text>

      <Box x={32} y={232} w={150} h={62} lines={["docker buildx", "multi-stage build"]} fill={SOFT} />
      <Box x={216} y={232} w={150} h={62} lines={["Amazon ECR", "tagged + latest"]} fill={SOFT} />
      <Box x={400} y={232} w={170} h={62} lines={["Task definition", "rendered with secrets"]} fill={SOFT} />
      <Box x={604} y={232} w={184} h={62} lines={["ECS service deploy", "waits for stability"]} fill={SOFT} />

      <Arrow from={[182, 263]} to={[212, 263]} />
      <Arrow from={[366, 263]} to={[396, 263]} />
      <Arrow from={[570, 263]} to={[600, 263]} />

      <text x={460} y={368} textAnchor="middle" fill={MUTED} fontSize="10.5" fontFamily="var(--font-sans)">
        Tests never touch real AWS — the same code runs against local DynamoDB and S3 stand-ins in CI.
      </text>
    </Frame>
  );
}

const DIAGRAMS = {
  "fragments-aws": FragmentsAws,
  "fragments-pipeline": FragmentsPipeline,
};

export default function ArchitectureDiagram({ id, caption }) {
  const Diagram = DIAGRAMS[id];
  if (!Diagram) return null;

  return (
    // Diagrams break out past the reading column once there's room for them —
    // a wide figure squeezed into a 65-character measure is unreadable.
    <figure className="my-2 lg:-mx-20">
      <div className="material rounded-2xl p-5 sm:p-6">
        <Diagram />
      </div>
      {caption && (
        <figcaption className="font-mono text-[0.72rem] text-[var(--text-muted)] mt-3 leading-snug">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
