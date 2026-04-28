export default function ProjectCard({ project, hoverBgClass }) {
  return (
    <div 
      className={`group relative w-full bg-white rounded-xl transition-all duration-300 ease-out border border-black/10 hover:shadow-[6px_6px_0px_rgba(0,0,0,0.1)] hover:-translate-x-[2px] hover:-translate-y-[2px] hover:border-black/30 flex flex-col ${hoverBgClass || 'hover:bg-[#f4f4f5]'}`}
    >
      {/* Header section */}
      <div className="p-6 pb-2 text-left relative flex flex-col items-start">
        <h3 className="font-heading text-xl md:text-2xl font-bold text-[#1E1E1E] mb-2 transition-colors duration-300 group-hover:text-black">
          {project.title}
        </h3>
        <p className="font-sans text-xs text-gray-600 transition-colors duration-300 group-hover:text-gray-800 font-medium">
          {project.category}
        </p>
      </div>

      {/* Content */}
      <div className="p-6 pt-4 flex-1 flex flex-col">
        <p className="font-sans text-gray-700 mb-6 leading-relaxed text-sm transition-colors duration-300 group-hover:text-black flex-1">
          {project.description}
        </p>

        <div className="mb-6 text-left">
          <h4 className="font-heading text-xs font-bold text-[#1E1E1E] mb-3 tracking-wider transition-colors duration-300 group-hover:text-black">
            TECHNOLOGIES
          </h4>
          <div className="flex flex-wrap gap-2 justify-start">
            {project.technologies.map((tech, index) => (
              <span
                key={index}
                className="px-3 py-1 text-xs rounded-full bg-black/5 text-[#1E1E1E] border border-black/10 transition-colors duration-300 group-hover:bg-black/10 group-hover:border-black/20 font-medium"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Links */}
        <div className="flex flex-col sm:flex-row gap-3 mt-auto">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 text-center px-4 py-2.5 rounded-lg bg-[#1E1E1E] hover:bg-black transition-colors duration-200 text-white font-medium text-sm flex items-center justify-center gap-2 shadow-sm"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
              View Code
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 text-center px-4 py-2.5 rounded-lg bg-black/5 hover:bg-black/10 transition-colors duration-200 text-[#1E1E1E] font-medium border border-black/10 text-sm flex items-center justify-center gap-2"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
              Live Demo
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
