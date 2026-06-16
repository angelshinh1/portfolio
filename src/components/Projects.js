import ProjectCard from "./ProjectCard";
import Reveal from "./Reveal";
import SectionHeader from "./SectionHeader";

const projects = [
  {
    title: "Somnio - Dream Journal & Network Platform",
    category: "Full-Stack Web App · Graph Database",
    description:
      "A dream journaling platform with AI-powered similarity matching and 3D network visualization. Features a tag-based similarity algorithm achieving 70%+ connection accuracy, a Neo4j graph database for relationship mapping, and an immersive Three.js 3D dream network with real-time navigation. Implements JWT auth, a RESTful API with 20+ endpoints, and a responsive Next.js frontend with emotion-based visualizations.",
    technologies: [
      "Next.js", "React", "Node.js", "Express", "Neo4j",
      "Three.js", "React Three Fiber", "JWT", "Tailwind CSS",
    ],
    githubUrl: "https://github.com/angelshinh1/somnio",
    liveUrl: "https://somnio-r9ro.vercel.app/",
  },
  {
    title: "Facial Expression Recognition App",
    category: "Machine Learning · Computer Vision",
    description:
      "Achieved 75.3% accuracy on a 10K+ image dataset using TensorFlow and OpenCV, enabling real-time emotion recognition at 30 FPS. Implemented real-time emotion tracking with inference under 200 ms. Designed for scalability using modular components and clean architecture.",
    technologies: ["Python", "TensorFlow", "OpenCV", "Flask"],
    githubUrl: "https://github.com/angelshinh1/face-expression-detector-backend/",
    liveUrl: null,
  },
  {
    title: "Diabetes Prediction System",
    category: "Machine Learning",
    description:
      "Implemented an SVM classifier on a clinical dataset of 768 patients achieving 78.7% training and 77.3% test accuracy. Used StandardScaler and stratified splitting to ensure balanced performance. Preprocessed features and applied grid search to fine-tune model parameters.",
    technologies: ["Python", "Scikit-learn", "Pandas", "NumPy", "Matplotlib"],
    githubUrl: "https://github.com/angelshinh1/ML/blob/main/diabetes_prediction_ML.ipynb",
    liveUrl: null,
  },
  {
    title: "Movie Recommendation System",
    category: "Machine Learning · Data Science",
    description:
      "Developed a hybrid recommendation engine combining collaborative and content-based filtering. Leveraged Sklearn, Pandas, and cosine similarity to personalize user recommendations with an intuitive Streamlit interface.",
    technologies: ["Python", "Pandas", "Scikit-learn", "Streamlit", "AST", "NLTK", "Pickle"],
    githubUrl: "https://github.com/angelshinh1/movie-recommender-system",
    liveUrl: null,
  },
  {
    title: "Ray Tracer",
    category: "Computer Graphics · Systems Programming",
    description:
      "Building a ray tracing engine from scratch in C++, implementing core rendering techniques including ray-object intersection, Phong lighting, shadows, and reflections. Designed a modular architecture for extensibility and optimized rendering performance with efficient math operations and scene management.",
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
      <SectionHeader
        title="Projects!"
        className="mb-14 lg:mb-16"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project, idx) => (
          <Reveal
            key={idx}
            delay={Math.min(idx * 0.06, 0.24)}
            className="flex"
          >
            <ProjectCard project={project} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
