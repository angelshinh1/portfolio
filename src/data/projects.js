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
        type: "diagram",
        variant: "ddp-flow",
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
        type: "diagram",
        variant: "ddp-architecture",
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
        type: "diagram",
        variant: "similarity-breakdown",
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
        type: "diagram",
        variant: "diabetes-accuracy",
      },
      {
        type: "heading",
        text: "Reading the results",
      },
      {
        type: "paragraph",
        text: "78.7% training accuracy against 77.3% on the held-out test set — a narrow gap, which is the signal that matters more than either number alone. A model that scores much higher on training data than on test data is memorizing, not learning; this one wasn't.",
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
