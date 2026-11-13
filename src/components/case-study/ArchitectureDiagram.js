// Flat architecture diagrams: white boxes, warm grey lines, green for the main path
const STROKE = "#857B72";
const INK = "#4A433D";
const SUB = "#857B72";
const GROUP = "#F1EFE8";
const ACCENT = "var(--green-deep)";
const FONT = "var(--font-sans)";

function Node({ x, y, w, h = 64, t, s }) {
  const cy = y + h / 2;
  return (
    <g fontFamily={FONT}>
      <rect x={x} y={y} width={w} height={h} rx="10" fill="#fff" stroke={STROKE} strokeWidth="1.5" />
      <text x={x + 18} y={s ? cy - 3 : cy + 5} fill={INK} fontSize="15" fontWeight="500">{t}</text>
      {s && <text x={x + 18} y={cy + 16} fill={SUB} fontSize="12.5">{s}</text>}
    </g>
  );
}

function Group({ x, y, w, h, label, dashed = false, labelBottom = false }) {
  return (
    <g fontFamily={FONT}>
      <rect
        x={x} y={y} width={w} height={h} rx="14"
        fill={dashed ? "none" : GROUP}
        stroke={STROKE} strokeWidth="1.5"
        strokeDasharray={dashed ? "7 6" : undefined}
      />
      <text x={x + 20} y={labelBottom ? y + h - 16 : y + 28} fill={INK} fontSize="14" fontWeight="500">{label}</text>
    </g>
  );
}

function Edge({ d, accent = false, dashed = false, both = false, label, lx, ly, anchor = "middle" }) {
  const m = `url(#ah-${accent ? "a" : "g"})`;
  return (
    <g>
      <path
        d={d} fill="none"
        stroke={accent ? ACCENT : STROKE} strokeWidth="1.6"
        strokeDasharray={dashed ? "5 5" : undefined}
        markerEnd={m} markerStart={both ? m : undefined}
      />
      {label && (
        <text x={lx} y={ly} textAnchor={anchor} fill={SUB} fontSize="12" fontFamily={FONT}>{label}</text>
      )}
    </g>
  );
}

function Frame({ title, h, children }) {
  return (
    // Scroll sideways on narrow screens rather than shrinking labels
    <div className="w-full overflow-x-auto">
      <svg viewBox={`0 0 960 ${h}`} style={{ width: "100%", minWidth: 640, height: "auto", display: "block" }} role="img">
        <title>{title}</title>
        <defs>
          {[["a", ACCENT], ["g", STROKE]].map(([id, color]) => (
            <marker key={id} id={`ah-${id}`} viewBox="0 0 10 10" refX="8" refY="5" markerWidth="10" markerHeight="10" markerUnits="userSpaceOnUse" orient="auto-start-reverse">
              <path d="M2 1.5 L8 5 L2 8.5" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </marker>
          ))}
        </defs>
        {children}
      </svg>
    </div>
  );
}

function PiiArchitecture() {
  return (
    <Frame title="pii-scanner architecture" h={372}>
      <Group x={236} y={196} w={712} h={156} label="Raw data stays inside" dashed />
      <Node x={24} y={56} w={170} t="You" s="ask a question" />
      <Node x={262} y={56} w={200} t="Agent · ask.py" s="no built-in tools" />
      <Node x={510} y={56} w={200} t="Claude" s="sees masked values only" />
      <Node x={262} y={252} w={200} t="MCP server" s="server.py · 2 tools" />
      <Node x={510} y={252} w={200} t="Scanner + detectors" s="Luhn · prefixes · mask" />
      <Node x={758} y={252} w={170} t="Files on disk" s="raw SINs, cards" />
      <Edge d="M194 88 H258" accent />
      <Edge d="M462 88 H506" both />
      <Edge d="M440 120 V248" accent both label="stdio · masked findings only" lx={452} ly={164} anchor="start" />
      <Edge d="M462 284 H506" />
      <Edge d="M710 284 H754" />
    </Frame>
  );
}

function PiiDetector() {
  return (
    <Frame title="How one line becomes a finding" h={244}>
      <Node x={12} y={40} w={176} t="Line of text" s="from scan_file" />
      <Node x={202} y={40} w={176} t="Regex match" s="SIN or card shape" />
      <Node x={392} y={40} w={176} t="Luhn check" s="checksum must pass" />
      <Node x={582} y={40} w={176} t="Prefix rules" s="card brand, SIN start" />
      <Node x={772} y={40} w={176} t="Mask + rank" s="XXX-XXX-544 · high" />
      <Node x={392} y={164} w={366} h={60} t="Dropped" s="phone, order and invoice numbers that fail a check" />
      <Edge d="M188 72 H198" accent />
      <Edge d="M378 72 H388" accent />
      <Edge d="M568 72 H578" accent />
      <Edge d="M758 72 H768" accent />
      <Edge d="M480 104 V160" dashed />
      <Edge d="M670 104 V160" dashed />
    </Frame>
  );
}

function FragmentsAws() {
  return (
    <Frame title="Fragments request path on AWS" h={404}>
      <Node x={24} y={180} w={170} t="fragments-ui" s="browser client" />
      <Node x={262} y={48} w={200} t="Amazon Cognito" s="user pool + hosted UI" />
      <Node x={262} y={180} w={200} t="Load balancer" s="Application LB" />
      <Node x={530} y={172} w={200} h={80} t="Fragments container" s="ECS Fargate · Express" />
      <Node x={786} y={112} w={150} t="DynamoDB" s="metadata" />
      <Node x={786} y={248} w={150} t="Amazon S3" s="fragment bytes" />
      <Node x={530} y={320} w={200} t="CloudWatch Logs" s="pino → awslogs" />
      <Edge d="M109 180 V80 H258" accent label="1 · sign in" lx={121} ly={70} anchor="start" />
      <Edge d="M194 212 H258" accent label="2 · token" lx={226} ly={202} />
      <Edge d="M462 212 H526" accent />
      <Edge d="M630 172 V80 H466" dashed label="verifies the JWT itself" lx={642} ly={128} anchor="start" />
      <Edge d="M730 200 H758 V144 H782" />
      <Edge d="M730 224 H758 V280 H782" />
      <Edge d="M630 252 V316" dashed />
    </Frame>
  );
}

function FragmentsPipeline() {
  return (
    <Frame title="Fragments CI and CD pipelines" h={352}>
      <Group x={12} y={12} w={936} h={146} label="CI · every push to main" />
      <Node x={32} y={60} w={164} t="ESLint" s="+ Prettier" />
      <Node x={214} y={60} w={164} t="hadolint" s="Dockerfile lint" />
      <Node x={396} y={60} w={164} t="Jest + Supertest" s="unit tests · 80%+" />
      <Node x={578} y={60} w={164} t="Hurl" s="integration tests" />
      <Node x={760} y={60} w={168} t="docker compose" s="DynamoDB Local + S3" />
      <Edge d="M196 92 H210" />
      <Edge d="M378 92 H392" />
      <Edge d="M560 92 H574" />
      <Edge d="M742 92 H756" />
      <Group x={12} y={186} w={936} h={146} label="CD · only on a v* tag" dashed />
      <Node x={32} y={234} w={200} t="docker buildx" s="multi-stage build" />
      <Node x={264} y={234} w={200} t="Amazon ECR" s="version tag + latest" />
      <Node x={496} y={234} w={200} t="Task definition" s="secrets injected" />
      <Node x={728} y={234} w={200} t="ECS deploy" s="waits for stability" />
      <Edge d="M232 266 H260" accent />
      <Edge d="M464 266 H492" accent />
      <Edge d="M696 266 H724" accent />
    </Frame>
  );
}

function AskNode() {
  return (
    <Frame title="ask-node indexing and answering" h={352}>
      <Group x={12} y={12} w={936} h={146} label="Indexing · runs once" />
      <Node x={32} y={60} w={200} t="Node.js docs" s="70 Markdown files" />
      <Node x={264} y={60} w={200} t="Chunker" s="split on headings" />
      <Node x={496} y={60} w={200} t="Embeddings" s="text-embedding-3-small" />
      <Node x={728} y={60} w={200} t="Chroma" s="5,411 chunks" />
      <Edge d="M232 92 H260" />
      <Edge d="M464 92 H492" />
      <Edge d="M696 92 H724" />
      <Group x={12} y={186} w={936} h={146} label="Answering · every question" dashed />
      <Node x={32} y={234} w={200} t="Question" s="from the command line" />
      <Node x={264} y={234} w={200} t="Vector search" s="top 25 by cosine" />
      <Node x={496} y={234} w={200} t="Rerank" s="Cohere · top 5" />
      <Node x={728} y={234} w={200} t="Answer" s="cites the source file" />
      <Edge d="M232 266 H260" accent />
      <Edge d="M464 266 H492" accent />
      <Edge d="M696 266 H724" accent />
      <Edge d="M828 124 V172 H364 V230" dashed label="same collection" lx={840} ly={148} anchor="start" />
    </Frame>
  );
}

function ReviewBoard() {
  return (
    <Frame title="Review Board agents and tools" h={396}>
      <Node x={24} y={134} w={190} t="Staged diff" s="or --file path" />
      <Group x={262} y={56} w={300} h={220} label="Run in parallel" dashed />
      <Node x={286} y={100} w={252} t="Security Auditor" s="injection, secrets, auth" />
      <Node x={286} y={186} w={252} t="Maintainability Critic" s="naming, duplication" />
      <Node x={650} y={134} w={160} t="Lead dev" s="judge · read_file" />
      <Node x={846} y={134} w={102} t="Report" s="HTML file" />
      <Node x={286} y={316} w={252} h={56} t="Repo tools" s="read_file · ripgrep, capped" />
      <Edge d="M214 166 H258" accent />
      <Edge d="M562 166 H646" accent label="JSON findings" lx={604} ly={156} />
      <Edge d="M810 166 H842" accent />
      <Edge d="M412 276 V312" dashed both />
      <Edge d="M730 198 V344 H542" dashed />
    </Frame>
  );
}

function BlueGreen() {
  return (
    <Frame title="Blue/green release pipeline" h={248}>
      <Node x={12} y={40} w={176} t="Build" s="tag: build ID + SHA" />
      <Node x={202} y={40} w={176} t="Validate" s="smoke test /albums" />
      <Node x={392} y={40} w={176} t="Deploy" s="approval · 0% traffic" />
      <Node x={582} y={40} w={176} t="Gate" s="test revision URL" />
      <Node x={772} y={40} w={176} t="Promote" s="100% to new label" />
      <Node x={582} y={168} w={176} h={60} t="Stopped" s="production untouched" />
      <Node x={772} y={168} w={176} h={60} t="Switch back" s="if prod check fails" />
      <Edge d="M188 72 H198" accent />
      <Edge d="M378 72 H388" accent />
      <Edge d="M568 72 H578" accent />
      <Edge d="M758 72 H768" accent />
      <Edge d="M670 104 V164" dashed label="fails" lx={682} ly={140} anchor="start" />
      <Edge d="M860 104 V164" dashed />
    </Frame>
  );
}

function DevFlow() {
  return (
    <Frame title="DevFlow review flow" h={384}>
      <Node x={12} y={24} w={166} t="GitHub OAuth" s="via Supabase Auth" />
      <Node x={214} y={24} w={166} t="httpOnly cookie" s="keeps the token" />
      <Group x={196} y={136} w={752} h={140} label="Server action · keys never reach the browser" dashed labelBottom />
      <Node x={12} y={166} w={166} t="Pull request" s="from the dashboard" />
      <Node x={214} y={166} w={166} t="Octokit" s="raw diff, 60k cap" />
      <Node x={398} y={166} w={166} t="Gemini" s="JSON schema" />
      <Node x={582} y={166} w={166} t="Zod" s="validate or fail" />
      <Node x={766} y={166} w={166} t="Postgres" s="RLS · own rows" />
      <Node x={766} y={300} w={166} t="Review panel" s="beside the diff" />
      <Edge d="M178 56 H210" />
      <Edge d="M297 88 V162" dashed />
      <Edge d="M178 198 H210" accent />
      <Edge d="M380 198 H394" accent />
      <Edge d="M564 198 H578" accent />
      <Edge d="M748 198 H762" accent />
      <Edge d="M849 230 V296" accent />
    </Frame>
  );
}

function DdpHunt() {
  return (
    <Frame title="DDP Hunt claim flow and admin tools" h={400}>
      <Node x={12} y={40} w={200} t="Attendee scan" s="QR via react-zxing" />
      <Node x={248} y={40} w={200} t="Claim check" s="window · cap · id" />
      <Node x={484} y={40} w={210} t="Points + unlocks" s="achievements, collectibles" />
      <Node x={730} y={40} w={200} t="Leaderboard" s="updates live" />
      <Node x={484} y={170} w={210} t="Prize shop" s="spend points" />
      <Node x={248} y={170} w={200} t="Attempt log" s="every scan, pass or fail" />
      <Edge d="M212 72 H244" accent />
      <Edge d="M448 72 H480" accent />
      <Edge d="M694 72 H726" accent />
      <Edge d="M589 104 V166" accent />
      <Edge d="M348 104 V166" />
      <Group x={12} y={270} w={936} h={118} label="Organizers" dashed />
      <Node x={32} y={312} w={196} h={56} t="Auth0 roles" s="Admin · Volunteer" />
      <Node x={248} y={312} w={200} h={56} t="Admin tools" s="create · schedule · redeem" />
      <Node x={484} y={312} w={210} h={56} t="Audit log" s="before / after · who · when" />
      <Edge d="M228 340 H244" />
      <Edge d="M448 340 H480" />
      <Edge d="M348 312 V238" dashed label="monitors" lx={360} ly={258} anchor="start" />
    </Frame>
  );
}

function Somnio() {
  return (
    <Frame title="Somnio dream matching" h={300}>
      <Node x={12} y={128} w={180} t="Dream entry" s="text, tags, mood" />
      <Group x={232} y={36} w={300} h={248} label="Similarity score" />
      <Node x={256} y={80} w={252} h={56} t="Tag overlap" s="50% of the score" />
      <Node x={256} y={144} w={252} h={56} t="Keyword overlap" s="35% of the score" />
      <Node x={256} y={208} w={252} h={56} t="Emotion match" s="15% of the score" />
      <Node x={572} y={128} w={170} t="Neo4j" s="edge if ≥ 20%" />
      <Node x={782} y={128} w={166} t="Three.js" s="3D dream network" />
      <Edge d="M192 160 H228" accent />
      <Edge d="M532 160 H568" accent />
      <Edge d="M742 160 H778" accent />
    </Frame>
  );
}

function AdkHarness() {
  return (
    <Frame title="ADK Harness policy gate" h={330}>
      <Node x={12} y={138} w={180} t="Agent" s="Gemini · Antigravity" />
      <Node x={232} y={138} w={180} t="Policy gate" s="allow · hold · block" />
      <Node x={760} y={30} w={188} t="Workspace APIs" s="Calendar · Gmail · Docs" />
      <Node x={470} y={138} w={200} t="Approval UI" s="a person decides" />
      <Node x={760} y={138} w={188} t="Cloud Run worker" s="Eventarc · runs once" />
      <Node x={470} y={250} w={200} t="Stopped" s="with a reason" />
      <Edge d="M192 170 H228" accent />
      <Edge d="M412 150 H440 V62 H756" accent label="allowed" lx={600} ly={52} />
      <Edge d="M412 170 H466" label="held" lx={439} ly={162} />
      <Edge d="M412 190 H440 V282 H466" dashed label="blocked" lx={452} ly={240} anchor="start" />
      <Edge d="M670 170 H756" accent label="approved" lx={713} ly={162} />
      <Edge d="M854 138 V98" accent />
    </Frame>
  );
}

function AdkApproval() {
  return (
    <Frame title="ADK Harness approval to execution" h={320}>
      <Group x={4} y={8} w={952} h={128} label="Deciding" dashed labelBottom />
      <Node x={16} y={22} w={172} t="Task request" s="what the agent wants" />
      <Node x={204} y={22} w={172} t="ChangeSet" s="canonical, SHA-256" />
      <Node x={392} y={22} w={172} t="Review" s="read-only, fails closed" />
      <Node x={580} y={22} w={172} t="Your approval" s="Google + Firebase ID" />
      <Node x={768} y={22} w={172} t="Firestore" s="immutable record" />
      <Edge d="M188 54 H200" accent />
      <Edge d="M376 54 H388" accent />
      <Edge d="M564 54 H576" accent />
      <Edge d="M752 54 H764" accent />
      <Group x={4} y={176} w={952} h={136} label="Executing" dashed labelBottom />
      <Node x={768} y={190} w={172} t="Eventarc" s="fires on the record" />
      <Node x={580} y={190} w={172} t="Cloud Run worker" s="re-checks the gate" />
      <Node x={392} y={190} w={172} t="Workspace" s="Calendar · Docs" />
      <Node x={204} y={190} w={172} t="Reconciler" s="reads before retrying" />
      <Edge d="M854 86 V186" accent />
      <Edge d="M768 222 H756" accent />
      <Edge d="M580 222 H568" accent />
      <Edge d="M376 222 H388" dashed />
    </Frame>
  );
}

const DIAGRAMS = {
  "adk-harness": AdkHarness,
  "adk-approval": AdkApproval,
  "pii-architecture": PiiArchitecture,
  "pii-detector": PiiDetector,
  "fragments-aws": FragmentsAws,
  "fragments-pipeline": FragmentsPipeline,
  "ask-node": AskNode,
  "review-board": ReviewBoard,
  "blue-green": BlueGreen,
  devflow: DevFlow,
  "ddp-hunt": DdpHunt,
  somnio: Somnio,
};

export default function ArchitectureDiagram({ id, caption }) {
  const Diagram = DIAGRAMS[id];
  if (!Diagram) return null;

  return (
    // Wider than the text column on desktop; no card, so it shares the page's paper
    <figure className="my-8 lg:-mx-[7.5rem]">
      <Diagram />
      {caption && (
        <figcaption className="lg:px-[7.5rem] font-body text-[0.86rem] text-[var(--text-muted)] mt-3 leading-relaxed">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
