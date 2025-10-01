import ProjectCard from "./ProjectCard";

const projects = [
  {
    title: "Facial Expression Recognition App",
    category: "Machine Learning & Computer Vision",
    description:
      "Achieved 75.3% accuracy on a 10K+ image dataset using TensorFlow and OpenCV, enabling real-time emotion recognition at 30 FPS. Implemented real-time emotion tracking with inference under 200 ms. Designed for scalability using modular components and clean architecture.",
    technologies: ["Python", "TensorFlow", "OpenCV", "Flask"],
    image: "/facial-expression.jpg", // Update with your actual image path
    githubUrl: "https://github.com/angelshinh1/face-expression-detector-backend/",
    liveUrl: null, 
  },
  {
    title: "Diabetes Prediction System",
    category: "Machine Learning",
    description:
      "Implemented an SVM classifier on a clinical dataset of 768 patients achieving 78.7% training and 77.3% test accuracy. Used StandardScaler and stratified splitting to ensure balanced performance. Preprocessed features and applied grid search to fine-tune model parameters.",
    technologies: ["Python", "Scikit-learn", "Pandas", "NumPy", "Matplotlib"],
    image: "/diabetes-prediction.jpg", // Update with your actual image path
    githubUrl: "https://github.com/angelshinh1/ML/blob/main/diabetes_prediction_ML.ipynb",
    liveUrl: null, // No live demo
  },
  {
    title: "Movie Recommendation System",
    category: "Machine Learning & Data Science",
    description:
      "Developed a hybrid recommendation engine combining collaborative and content-based filtering. Leveraged Sklearn, Pandas, and cosine similarity to personalize user recommendations with an intuitive Streamlit interface.",
    technologies: ["Python", "Pandas", "Scikit-learn", "Streamlit", "AST", "NLTK", "Pickle"],
    image: "/movie-recommendation.jpg", // Update with your actual image path
    githubUrl: "https://github.com/angelshinh1/movie-recommender-system",
    liveUrl: null, // No live demo
  },
];

export default function Projects() {
    return (
        <section id="projects" className="max-w-[90vw] lg:max-w-[60vw] mx-auto py-16">
            {/* Header */}
            <div className="ubuntu-mono-regular mb-10 text-center">
                <h2 className="text-2xl lg:text-5xl font-bold mb-3">My Projects</h2>
                <p className="text-base lg:text-xl text-gray-400">What I&apos;ve built so far</p>
            </div>

            <div className="flex flex-wrap gap-3 lg:gap-4 justify-center">
                {projects.map((project, idx) => (
                    <ProjectCard key={idx} project={project} />
                ))}
            </div>
        </section>
    );
}