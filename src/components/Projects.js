import Reveal from "./Reveal";
import SectionHeader from "./SectionHeader";

const projects = [
  {
    title: "Somnio",
    subtitle: "Dream Journal & Network Platform",
    category: "Full-Stack · Graph Database",
    description:
      "A dream journaling platform with AI-powered similarity matching and 3D network visualization. Tag-based algorithm hits 70%+ connection accuracy; Neo4j handles relationship mapping; Three.js renders an immersive live dream network.",
    technologies: ["Next.js", "React", "Node.js", "Express", "Neo4j", "Three.js", "JWT", "Tailwind CSS"],
    githubUrl: "https://github.com/angelshinh1/somnio",
    liveUrl: "https://somnio-r9ro.vercel.app/",
  },
  {
    title: "Face Expression Recognizer",
    subtitle: "Real-time Emotion Detection",
    category: "Machine Learning · Computer Vision",
    description:
      "75.3% accuracy on a 10K+ image dataset via TensorFlow and OpenCV — real-time emotion recognition at 30 FPS with inference under 200 ms. Modular, scalable architecture built for production use.",
    technologies: ["Python", "TensorFlow", "OpenCV", "Flask"],
    githubUrl: "https://github.com/angelshinh1/face-expression-detector-backend/",
    liveUrl: null,
  },
  {
    title: "Diabetes Prediction",
    subtitle: "Clinical ML Classifier",
    category: "Machine Learning",
    description:
      "SVM classifier on 768 clinical patient records: 78.7% training, 77.3% test accuracy. StandardScaler normalization, stratified splits, and grid search hyperparameter tuning.",
    technologies: ["Python", "Scikit-learn", "Pandas", "NumPy", "Matplotlib"],
    githubUrl: "https://github.com/angelshinh1/ML/blob/main/diabetes_prediction_ML.ipynb",
    liveUrl: null,
  },
  {
    title: "Movie Recommender",
    subtitle: "Hybrid Filtering Engine",
    category: "Machine Learning · Data Science",
    description:
      "Hybrid recommendation engine combining collaborative and content-based filtering. Cosine similarity via Sklearn and Pandas, wrapped in an intuitive Streamlit interface.",
    technologies: ["Python", "Pandas", "Scikit-learn", "Streamlit", "NLTK"],
    githubUrl: "https://github.com/angelshinh1/movie-recommender-system",
    liveUrl: null,
  },
  {
    title: "Ray Tracer",
    subtitle: "From-Scratch Rendering Engine",
    category: "Computer Graphics · Systems",
    description:
      "Ray tracing engine built from scratch in C++: ray-object intersection, Phong lighting, shadows, and reflections. Modular architecture, optimized math operations, clean scene management.",
    technologies: ["C++"],
    githubUrl: "https://github.com/angelshinh1/Ray_Tracer_1",
    liveUrl: null,
  },
];

export default function Projects() {
  return (
    <section
      id="projects"
      className="relative max-w-[88vw] lg:max-w-[72rem] mx-auto px-1 py-24 lg:py-28"
    >
      <SectionHeader title="Projects!" className="mb-14 lg:mb-16" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6">
        {projects.map((project, idx) => (
          <Reveal key={idx} delay={Math.min(idx * 0.06, 0.24)} className="flex">
            <ProjectCard project={project} index={idx} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function ProjectCard({ project, index }) {
  const num = String(index + 1).padStart(2, "0");

  return (
    <div className="group relative h-full w-full flex flex-col bg-[var(--bg-surface)] border border-[var(--line)] overflow-hidden transition-[transform,box-shadow] duration-300 ease-[var(--ease-out)] hover:shadow-[0_8px_28px_rgba(0,0,0,0.10)]" style={{ borderRadius: "6px" }}>
      <div className="flex flex-col flex-1 p-7">
        {/* Title */}
        <h3 className="font-heading text-[1.6rem] leading-[1.1] text-[var(--text-primary)] transition-colors duration-300 group-hover:text-[var(--green-deep)]">
          {project.title}
        </h3>

        {/* Subtitle */}
        <p
          className="mt-1.5 mb-4"
          style={{
            fontFamily: "'IM Fell English', Georgia, serif",
            fontStyle: "italic",
            fontSize: "0.9rem",
            color: "var(--green-deep)",
            opacity: 0.75,
          }}
        >
          {project.subtitle}
        </p>

        {/* Thin rule */}
        <div className="h-px mb-4" style={{ background: "var(--line)" }} />

        {/* Description */}
        <p className="font-body text-[0.95rem] leading-relaxed text-[var(--text-secondary)] flex-1">
          {project.description}
        </p>

        {/* Tech tags */}
        <div className="mt-5 flex flex-wrap gap-1.5">
          {project.technologies.map((tech, i) => (
            <span
              key={i}
              className="font-mono text-[0.63rem] px-2.5 py-[0.3rem] text-[var(--text-secondary)] tracking-tight transition-colors duration-200"
              style={{
                background: "var(--bg-green)",
                borderRadius: "3px",
              }}
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Links */}
        {(project.githubUrl || project.liveUrl) && (
          <div className="mt-5 pt-4 border-t border-[var(--line)] flex items-center gap-5">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-mono text-[0.7rem] tracking-tight text-[var(--green-deep)] transition-colors duration-200 hover:text-[var(--text-primary)]"
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" /></svg>
                Code
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-mono text-[0.7rem] tracking-tight text-[var(--green-deep)] transition-colors duration-200 hover:text-[var(--text-primary)]"
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" /></svg>
                Live demo
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
