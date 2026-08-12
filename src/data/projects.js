// Central project data — used by the Projects grid (src/components/Projects.js)
// and by the case-study detail pages (src/pages/projects/[slug].js).
//
// `content` is an array of blocks rendered by src/components/case-study/CaseStudyContent.js.
// Supported block types: lead, heading, paragraph, list, quote, stats, diagram, gallery, divider.

const projects = [
  {
    slug: "ddp-hunt",
    title: "DDP Hunt",
    subtitle: "A scavenger hunt for RBC's Digital Developer Practice event",
    category: "Full-Stack · Event Platform",
    year: "2026",
    role: "Full-Stack Developer",
    team: "RBC Digital Developer Practice",
    description:
      "A QR-powered scavenger hunt built for RBC's Digital Developer Practice event — role-gated admin tooling, a live points economy, and a leaderboard that updates as attendees scan their way around the venue.",
    technologies: [
      "Next.js",
      "TypeScript",
      "MongoDB",
      "Mongoose",
      "Auth0",
      "Cloudinary",
      "Tailwind CSS",
      "react-zxing",
    ],
    githubUrl: null,
    liveUrl: null,
    privateNote: "Internal RBC tool — the codebase is private.",
    coverImage: "/projects/ddp-hunt/ddp-2.jpg",
    images: [
      {
        src: "/projects/ddp-hunt/ddp-1.jpg",
        alt: "Presenting DDP Hunt from the podium at RBC",
        caption: "Introducing DDP Hunt to the room before the event kicked off.",
      },
      {
        src: "/projects/ddp-hunt/ddp-2.jpg",
        alt: "Talking through the hunt rules with attendees in a hallway",
        caption: "Walking attendees through how scanning and points work.",
      },
      {
        src: "/projects/ddp-hunt/ddp-3.jpg",
        alt: "The team reviewing the hunt on printed guides and a screen",
        caption: "On-site with the printed hunt guide and the live admin screen.",
      },
      {
        src: "/projects/ddp-hunt/ddp-4.jpg",
        alt: "Group huddle going over the scavenger hunt guide",
        caption: "Last huddle before doors opened.",
      },
    ],
    content: [
      {
        type: "lead",
        text: "DDP Hunt turned RBC's Digital Developer Practice event into a scavenger hunt: attendees scanned hidden QR codes around the venue, earned points, unlocked achievements, and redeemed prizes from a shop — all while a leaderboard tracked the standings live.",
      },
      {
        type: "heading",
        text: "The brief",
      },
      {
        type: "paragraph",
        text: "Developer events live or die on engagement — will people actually visit the sponsor booths, sit through the talks, and talk to each other, or just drift off to their phones? The ask was a lightweight game layer that made moving around the event worth it, plus tooling organizers could trust to run live, mid-event, without needing a developer on standby.",
      },
      {
        type: "heading",
        text: "How the hunt works",
      },
      {
        type: "list",
        items: [
          "Each hunt item — a talk, a booth, a sponsor table — gets a unique identifier and a QR code, generated per-environment (localhost, staging, production) from the admin panel.",
          "Attendees scan with the in-app camera scanner (react-zxing); the identifier is validated and matched against the item's active window and claim cap.",
          "A successful claim credits points, checks whether it unlocks a collectible or achievement, and logs the attempt — successful or not — for auditing.",
          "Points move on the leaderboard immediately and can be spent in the shop for prizes, some limited-quantity and time-boxed.",
        ],
      },
      {
        type: "heading",
        text: "Designing the points economy",
      },
      {
        type: "paragraph",
        text: "Everything claimable — hunt items, shop prizes, collectibles, achievements — shares the same shape: an activation window, an optional claim cap, and a point cost or reward. That consistency meant one admin form pattern could create and schedule all of it ahead of time, so items could go live automatically as the event's schedule unfolded instead of someone manually flipping switches between sessions.",
      },
      {
        type: "paragraph",
        text: "Achievements layer on top as a second, derived reward: some unlock from a specific hunt item, others from hitting a claim-count threshold. Both are computed off the same claim history, so adding a new achievement never means touching the claiming logic itself.",
      },
      {
        type: "heading",
        text: "Role-gated admin tooling",
      },
      {
        type: "paragraph",
        text: "Auth0 issues a custom roles claim (Admin, Volunteer, Hunter) that gates everything server-side. Admins get full CRUD over hunt items, shop prizes, collectibles, and achievements, plus a live claim-attempts monitor to catch anything that looks like abuse in real time. Volunteers get a scoped-down panel for redeeming points at the shop table without touching the rest of the system.",
      },
      {
        type: "paragraph",
        text: "Every admin mutation — editing a hunt item, adjusting a user's points, redeeming a prize — writes to an audit log with the before/after state, who made the change, and when. For a tool running live across a multi-day event with several admins on shift at once, that trail mattered more than almost anything else in the app.",
      },
      {
        type: "heading",
        text: "On-site",
      },
      {
        type: "paragraph",
        text: "Shipping it was only half the job — the other half was standing in the room explaining how it worked, onboarding attendees on the first scan, and watching the claim-attempts monitor during the busiest windows to make sure nothing broke.",
      },
      {
        type: "gallery",
      },
    ],
  },
  {
    slug: "devflow",
    title: "DevFlow",
    subtitle: "AI code review for GitHub pull requests",
    category: "Full-Stack · AI",
    year: "2026",
    role: "Solo Developer",
    team: "Personal project",
    description:
      "Connect a GitHub account, open a pull request, and get back a structured review — a plain-language summary, a ranked list of likely bugs with file locations and severity, and non-blocking suggestions — in a panel beside the diff.",
    technologies: [
      "Next.js 16",
      "TypeScript",
      "Supabase",
      "PostgreSQL",
      "Gemini",
      "Octokit",
      "Tailwind CSS",
      "Framer Motion",
    ],
    githubUrl: "https://github.com/angelshinh1/DevFlow",
    liveUrl: null,
    coverImage: "/projects/devflow/review-light.webp",
    galleryAspect: "wide",
    images: [
      {
        src: "/projects/devflow/dashboard-light.webp",
        alt: "DevFlow dashboard listing repositories and recent activity",
        caption: "The dashboard — your repositories, sorted by recent activity.",
      },
      {
        src: "/projects/devflow/review-dark.webp",
        alt: "A pull request diff beside the AI review panel, in dark mode",
        caption: "The review panel sits beside the diff, so findings stay next to the code they describe.",
      },
      {
        src: "/projects/devflow/login-page-dark.webp",
        alt: "DevFlow sign-in screen with GitHub OAuth, in dark mode",
        caption: "One-click GitHub OAuth — the only credential the app ever asks for.",
      },
    ],
    content: [
      {
        type: "lead",
        text: "DevFlow reads a pull request diff and hands back something you can act on: a summary of what the PR does, a ranked list of likely bugs with severity and file locations, and separate non-blocking suggestions. Reviews are saved per user, so you can reopen a PR and see what the model said last time.",
      },
      {
        type: "heading",
        text: "Why bother",
      },
      {
        type: "paragraph",
        text: "Asking a chat window to \"review this PR\" gives you prose — confident, unstructured, and impossible to triage. I wanted the opposite: output with a fixed shape, so a review can be sorted, ranked, stored, and compared against the next one. That constraint drove almost every decision in the project.",
      },
      {
        type: "heading",
        text: "Making the model return data, not paragraphs",
      },
      {
        type: "paragraph",
        text: "Gemini is called with a JSON response schema, so the shape of a review is enforced by the model rather than hoped for. What comes back is then parsed and validated against a Zod schema before it is trusted — if the model returns malformed JSON or drifts from the contract, the request fails loudly with a clean error state instead of writing junk to the database.",
      },
      {
        type: "paragraph",
        text: "The overall severity of a review isn't taken from the model's own summary judgment. It's derived: the worst individual bug wins, falling back to the model's call only when there are no bugs at all. Small thing, but it means the badge on a review can never disagree with the findings underneath it.",
      },
      {
        type: "paragraph",
        text: "The system prompt spends most of its length discouraging invention — an honest empty review beats a padded one, and the model is told so explicitly. It's also told it can only see the diff, not the surrounding codebase, which noticeably cuts down on confident speculation about code that isn't there.",
      },
      {
        type: "heading",
        text: "Working within GitHub's limits",
      },
      {
        type: "list",
        items: [
          "Diffs are fetched through Octokit in GitHub's raw diff format, then capped at 60k characters with an explicit truncation marker — big enough for real PRs, bounded enough to keep prompts and payloads predictable.",
          "Supabase only exposes the GitHub provider token right after sign-in, and drops it when its own access token later refreshes. DevFlow copies that token into its own httpOnly cookie at the OAuth callback and reads from there first, so GitHub access survives a refresh.",
          "Every review is written with the user's id attached and read back through Postgres Row Level Security — each policy compares auth.uid(), so a user can only ever touch their own rows, enforced by the database rather than by application code.",
        ],
      },
      {
        type: "heading",
        text: "The app itself",
      },
      {
        type: "paragraph",
        text: "It's Next.js 16 on the App Router with React Server Components, typed end-to-end in TypeScript strict mode. Review generation runs as a server action so the API keys never reach the browser, and the result comes back serializable to update the panel in place. Every async route has a loading skeleton and an error boundary — the difference between a demo and something you'd actually leave open in a tab.",
      },
      {
        type: "gallery",
      },
    ],
  },
  {
    slug: "fragments",
    title: "Fragments",
    subtitle: "A cloud microservice on AWS",
    category: "Cloud · Backend",
    year: "2026",
    role: "Solo Developer",
    team: "Seneca Polytechnic · CCP555",
    description:
      "A containerized Node microservice for storing and converting small pieces of text, JSON, and images — deployed to ECS Fargate behind a load balancer, with metadata in DynamoDB, blobs in S3, Cognito for auth, and a tagged release pipeline that ships it.",
    technologies: [
      "Node.js",
      "Express 5",
      "Docker",
      "AWS ECS Fargate",
      "Amazon ECR",
      "DynamoDB",
      "Amazon S3",
      "Amazon Cognito",
      "GitHub Actions",
      "Jest",
      "Hurl",
      "sharp",
    ],
    githubUrl: null,
    liveUrl: null,
    privateNote: "Coursework project — the repository is private and the AWS resources have been torn down.",
    coverImage: null,
    content: [
      {
        type: "lead",
        text: "Fragments is a cloud microservice built over a semester for a fictional manufacturing company: IoT devices, mobile apps, and assembly-line cameras all need to store small pieces of text and images, in a dozen formats, and read them back in whichever format the consumer happens to want.",
      },
      {
        type: "heading",
        text: "The problem it solves",
      },
      {
        type: "paragraph",
        text: "A fragment is smaller than a document — a sensor reading in CSV, a status update in Markdown, a photo of a damaged part. The requirement that shaped the whole design was conversion: a Markdown fragment has to be retrievable as HTML, a JPEG as a PNG, a CSV as JSON — without storing a second copy. Conversion therefore happens on read, from the single stored original, and costs nothing in storage.",
      },
      {
        type: "stats",
        items: [
          { value: "11", label: "Supported fragment types" },
          { value: "2", label: "Auth strategies, one codebase" },
          { value: "80%+", label: "Unit test coverage" },
          { value: "14", label: "Hurl integration suites" },
        ],
      },
      {
        type: "heading",
        text: "How it runs on AWS",
      },
      {
        type: "paragraph",
        text: "The service runs as a Fargate task behind an Application Load Balancer. Requests carry a Cognito identity token that the server verifies itself with aws-jwt-verify, so there's no session state to keep anywhere. Storage is deliberately split: fragment metadata — id, owner, type, size, timestamps — goes to DynamoDB keyed by owner and id, while the actual bytes go to S3 under an owner-scoped key. Metadata queries stay fast and cheap, and the blobs live somewhere built to hold them.",
      },
      {
        type: "diagram",
        id: "fragments-aws",
        caption:
          "The request path. Sign-in happens against Cognito before the API is touched; the container verifies the token itself rather than delegating to the load balancer.",
      },
      {
        type: "heading",
        text: "One codebase, two backends",
      },
      {
        type: "paragraph",
        text: "The data layer sits behind six functions — read and write for metadata, read and write for data, list, and delete. One implementation talks to DynamoDB and S3; another keeps everything in memory. Which one loads is decided by environment variables at startup, so the same server runs locally with no AWS account at all, and the model code above it never knows the difference.",
      },
      {
        type: "paragraph",
        text: "That indirection is what makes the tests honest. Integration tests run the real container against DynamoDB Local and a MiniStack S3 stand-in via Docker Compose, exercising the actual AWS code paths — the SDK calls, the key layout, the error handling — without a single real AWS resource or a cent of spend.",
      },
      {
        type: "heading",
        text: "Shipping it",
      },
      {
        type: "list",
        items: [
          "Every push to main runs ESLint, hadolint against the Dockerfile, Jest and Supertest unit tests above 80% coverage, and the full Hurl integration suite against the composed stack.",
          "The image is a multi-stage build on node:24-alpine — production dependencies installed in a throwaway stage, only the resulting node_modules and source copied into the final layer, with a HEALTHCHECK hitting the service's own health route.",
          "Deployment is gated on intent, not on merging: only pushing a v* git tag triggers CD, which builds the image, pushes it to ECR under both the version tag and latest, renders the ECS task definition with secrets injected from GitHub, and rolls the service — waiting for stability before it reports success.",
        ],
      },
      {
        type: "diagram",
        id: "fragments-pipeline",
        caption:
          "CI on every push, CD only on a version tag. Tagging an already-tested commit is what makes a deploy a decision rather than an accident.",
      },
      {
        type: "heading",
        text: "Conversion",
      },
      {
        type: "paragraph",
        text: "Every supported type declares which extensions it can be read as, in one table. A request for a fragment with an extension looks up that table, and either runs the conversion — markdown-it for Markdown to HTML, js-yaml for JSON to YAML, csv-parse for CSV to JSON, sharp for anything image to anything image — or returns a 415 explaining that the conversion isn't possible. Adding a format later means adding a row, not rewriting the route.",
      },
      {
        type: "heading",
        text: "What I took from it",
      },
      {
        type: "paragraph",
        text: "The interesting part of this project was never the API surface — CRUD over text is not hard. It was everything around it: making a service that behaves identically on a laptop and on Fargate, proving it with tests that don't need the cloud to run, and building a pipeline where the risky step is the one you have to opt into. Those constraints are what the AWS parts were really teaching.",
      },
    ],
  },
  {
    slug: "somnio",
    title: "Somnio",
    subtitle: "Dream Journal & Network Platform",
    category: "Full-Stack · Graph Database",
    year: "2026",
    role: "Solo Developer",
    team: "Personal project",
    description:
      "A dream journaling platform with AI-powered similarity matching and 3D network visualization. Tag-based algorithm hits 70%+ connection accuracy; Neo4j handles relationship mapping; Three.js renders an immersive live dream network.",
    technologies: ["Next.js", "React", "Node.js", "Express", "Neo4j", "Three.js", "JWT", "Tailwind CSS"],
    githubUrl: "https://github.com/angelshinh1/somnio",
    liveUrl: "https://somnio-r9ro.vercel.app/",
    coverImage: null,
    images: [],
    content: [
      {
        type: "lead",
        text: "Somnio lets people log their dreams and then discover who else, anywhere, has dreamt something similar — surfaced not as a search box but as a living 3D network of glowing, connected orbs.",
      },
      {
        type: "heading",
        text: "The matching problem",
      },
      {
        type: "paragraph",
        text: "Real semantic similarity between two dream descriptions is an NLP-embeddings problem, and that gets expensive fast at any real scale. Instead, the matching engine weighs three cheaper, tag-driven signals: tag overlap (50%), extracted-keyword overlap (35%), and emotional-state similarity (15%). Two dreams connect once they cross a 20% similarity score, with anything past 70% flagged as a strong match.",
      },
      {
        type: "heading",
        text: "Why a graph database",
      },
      {
        type: "paragraph",
        text: "Dream connections are inherently graph-shaped — a dream can relate to dozens of others, each relationship carrying its own similarity weight. Modeling that in a relational schema means either a sprawling join table or giving up on querying it efficiently. Neo4j makes \"find everything connected to this dream, ranked by strength\" a native, fast query instead of a workaround.",
      },
      {
        type: "heading",
        text: "Rendering the network",
      },
      {
        type: "paragraph",
        text: "The frontend renders each dream as a glowing orb in 3D space via Three.js and React Three Fiber, with connecting lines drawn between related dreams. Lucid and recurring dreams get their own visual markers — sparkles and rings — so patterns are visible before you read a single word. Users can rotate and zoom through their own personal dream network, or the public one.",
      },
      {
        type: "heading",
        text: "Privacy by default",
      },
      {
        type: "paragraph",
        text: "Every dream is private unless the author opts it into the public network, and JWT-backed auth keeps that boundary enforced end to end — private dreams never enter the similarity index other users can query against.",
      },
      {
        type: "stats",
        items: [
          { value: "70%+", label: "similarity for a strong match" },
          { value: "3", label: "weighted signals, no embeddings API" },
          { value: "20%", label: "minimum threshold to connect two dreams" },
        ],
      },
    ],
  },
  {
    slug: "face-expression-recognizer",
    title: "Face Expression Recognizer",
    subtitle: "Real-time Emotion Detection",
    category: "Machine Learning · Computer Vision",
    year: "2025",
    role: "Solo Developer",
    team: "Personal project",
    description:
      "75.3% accuracy on a 10K+ image dataset via TensorFlow and OpenCV — real-time emotion recognition at 30 FPS with inference under 200 ms. Modular, scalable architecture built for production use.",
    technologies: ["Python", "TensorFlow", "OpenCV", "Flask"],
    githubUrl: "https://github.com/angelshinh1/face-expression-detector-backend/",
    liveUrl: null,
    coverImage: null,
    images: [],
    content: [
      {
        type: "lead",
        text: "A CNN-based classifier that reads a face and predicts its emotional expression in real time, wrapped in a Flask backend built to be dropped into a larger application rather than run as a one-off script.",
      },
      {
        type: "heading",
        text: "Dataset and preprocessing",
      },
      {
        type: "paragraph",
        text: "Training data came from Kaggle's face-expression-recognition collection, pulled in via kagglehub. Before anything hit the model, images went through resizing, normalization, and augmentation, with the noisiest, mislabeled-looking samples filtered out — cheap preprocessing decisions that mattered more for final accuracy than most architecture tweaks did.",
      },
      {
        type: "heading",
        text: "Model architecture",
      },
      {
        type: "paragraph",
        text: "A convolutional neural network handles both feature extraction and classification in one pipeline, with stacked conv layers learning increasingly abstract facial features before a dense head maps them to expression classes.",
      },
      {
        type: "heading",
        text: "Getting to real time",
      },
      {
        type: "paragraph",
        text: "Accuracy on its own wasn't the goal — the model had to run against a live video feed. That constraint shaped the architecture as much as the dataset did: it needed to be light enough to hold 30 FPS with inference consistently under 200ms, which ruled out a lot of the heavier, deeper nets that would have squeezed out a couple more accuracy points at the cost of latency.",
      },
      {
        type: "stats",
        items: [
          { value: "75.3%", label: "test accuracy" },
          { value: "10K+", label: "training images" },
          { value: "<200ms", label: "inference latency" },
          { value: "30 FPS", label: "real-time throughput" },
        ],
      },
    ],
  },
  {
    slug: "diabetes-prediction",
    title: "Diabetes Prediction",
    subtitle: "Clinical ML Classifier",
    category: "Machine Learning",
    year: "2025",
    role: "Solo Developer",
    team: "Personal project",
    description:
      "SVM classifier on 768 clinical patient records: 78.7% training, 77.3% test accuracy. StandardScaler normalization, stratified splits, and grid search hyperparameter tuning.",
    technologies: ["Python", "Scikit-learn", "Pandas", "NumPy", "Matplotlib"],
    githubUrl: "https://github.com/angelshinh1/ML/blob/main/diabetes_prediction_ML.ipynb",
    liveUrl: null,
    coverImage: null,
    images: [],
    content: [
      {
        type: "lead",
        text: "A support vector machine trained to predict diabetes risk from clinical measurements — the kind of small, tabular medical dataset where getting the fundamentals right matters more than reaching for a bigger model.",
      },
      {
        type: "heading",
        text: "Data and features",
      },
      {
        type: "paragraph",
        text: "768 patient records, each with clinical measurements like glucose level, BMI, blood pressure, and age. Every feature ran through StandardScaler normalization before training — SVMs are distance-based under the hood, so leaving features on wildly different scales would have let high-magnitude ones quietly dominate the decision boundary.",
      },
      {
        type: "heading",
        text: "Model selection and tuning",
      },
      {
        type: "paragraph",
        text: "With a dataset this size, a support vector classifier was a better fit than anything deep-learning-shaped — enough structure to find a real margin, not enough data to justify the variance a bigger model would add. Stratified train/test splits kept the class balance honest, and grid search swept the kernel, C, and gamma hyperparameters to find the combination that generalized best rather than the one that just fit training data hardest.",
      },
      {
        type: "stats",
        items: [
          { value: "78.7%", label: "training accuracy" },
          { value: "77.3%", label: "test accuracy" },
        ],
      },
      {
        type: "heading",
        text: "Reading the results",
      },
      {
        type: "paragraph",
        text: "The gap between the two is narrow, and that gap is the signal that matters more than either number alone. A model that scores much higher on training data than on test data is memorizing, not learning; this one wasn't.",
      },
    ],
  },
  {
    slug: "movie-recommender",
    title: "Movie Recommender",
    subtitle: "Hybrid Filtering Engine",
    category: "Machine Learning · Data Science",
    year: "2025",
    role: "Solo Developer",
    team: "Personal project",
    description:
      "Hybrid recommendation engine combining collaborative and content-based filtering. Cosine similarity via Sklearn and Pandas, wrapped in an intuitive Streamlit interface.",
    technologies: ["Python", "Pandas", "Scikit-learn", "Streamlit", "NLTK"],
    githubUrl: "https://github.com/angelshinh1/movie-recommender-system",
    liveUrl: null,
    coverImage: null,
    images: [],
    content: [
      {
        type: "lead",
        text: "A movie recommender that hedges its bets — instead of picking one recommendation strategy, it blends two, so a thin user history doesn't leave the whole system guessing.",
      },
      {
        type: "heading",
        text: "Why hybrid",
      },
      {
        type: "paragraph",
        text: "Pure collaborative filtering (recommend what similar users liked) breaks down for anyone without much rating history — the classic cold-start problem. Pure content-based filtering (recommend what's textually similar to what you liked) avoids that but misses the \"people like you also loved this, for reasons the plot summary won't tell you\" signal entirely. Blending both means the system leans on whichever signal is actually available for a given user.",
      },
      {
        type: "heading",
        text: "How the matching works",
      },
      {
        type: "paragraph",
        text: "Content-based similarity comes from cosine similarity over vectorized movie metadata — genres, keywords, cast — processed with NLTK before it's compared. Collaborative filtering runs over user-rating patterns with the same similarity math, and the two scores combine into a single ranked list.",
      },
      {
        type: "heading",
        text: "Interface",
      },
      {
        type: "paragraph",
        text: "The whole thing is wrapped in a Streamlit app — pick a movie you like, get back a ranked list of recommendations, no separate frontend build needed. For a project centered on the recommendation logic itself, that let the interface stay out of the way.",
      },
    ],
  },
  {
    slug: "ray-tracer",
    title: "Ray Tracer",
    subtitle: "From-Scratch Rendering Engine",
    category: "Computer Graphics · Systems",
    year: "2024",
    role: "Solo Developer",
    team: "Personal project",
    description:
      "Ray tracing engine built from scratch in C++: ray-object intersection, Phong lighting, shadows, and reflections. Modular architecture, optimized math operations, clean scene management.",
    technologies: ["C++"],
    githubUrl: "https://github.com/angelshinh1/Ray_Tracer_1",
    liveUrl: null,
    coverImage: null,
    images: [],
    content: [
      {
        type: "lead",
        text: "A ray tracer built from first principles in C++ — no rendering engine, no graphics library doing the math for you, just vectors, rays, and a lot of intersection tests.",
      },
      {
        type: "heading",
        text: "Why build a renderer by hand",
      },
      {
        type: "paragraph",
        text: "It's one thing to use a rendering engine and another to understand why the image it produces looks the way it does. Starting from Peter Shirley's Ray Tracing in One Weekend as a base and extending it was a way to actually own that understanding — every reflection, shadow, and highlight in the output traces back to code I wrote and can explain line by line.",
      },
      {
        type: "heading",
        text: "The core pipeline",
      },
      {
        type: "paragraph",
        text: "The engine is split into small, single-purpose modules — vec3 for the 3D math, ray for ray representation, color for output — that compose into the main render loop: cast a ray per pixel, test it against every object in the scene for intersection, and shade the closest hit using a Phong lighting model. Shadow rays and reflection rays extend that same intersection logic recursively, which is what gives the output actual depth and shine rather than flat-shaded shapes.",
      },
      {
        type: "heading",
        text: "Keeping it modular",
      },
      {
        type: "paragraph",
        text: "Because intersection, shading, and scene management are cleanly separated, adding a new primitive or a new material later doesn't mean touching the render loop itself — it slots into the existing interfaces. That structure mattered more here than raw performance did; the goal was a codebase I could keep extending, not just one working image.",
      },
    ],
  },
];

export default projects;

export function getProjectBySlug(slug) {
  return projects.find((p) => p.slug === slug) || null;
}

export function getAllProjectSlugs() {
  return projects.map((p) => p.slug);
}
