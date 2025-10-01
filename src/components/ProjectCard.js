import { useState, useRef, useEffect } from "react";
import Image from "next/image";

export default function ProjectCard({ project }) {
  const [showDetails, setShowDetails] = useState(false);
  const [popupPosition, setPopupPosition] = useState({ side: "right", top: 0, left: 0 });
  const cardRef = useRef(null);
  const popupRef = useRef(null);

  const calculatePosition = () => {
    if (cardRef.current) {
      const cardRect = cardRef.current.getBoundingClientRect();
      const isMobile = window.innerWidth < 768;
      const popupWidth = isMobile ? 320 : 500;
      
      let side = "right";
      let left = cardRect.right + 20;
      
      if (isMobile) {
        left = (window.innerWidth - popupWidth) / 2;
      } else {
        const spaceRight = window.innerWidth - cardRect.right;
        if (spaceRight < popupWidth + 40) {
          side = "left";
          left = cardRect.left - popupWidth - 20;
        }
        
        if (left < 20) {
          left = 20;
        }
        
        if (left + popupWidth > window.innerWidth - 20) {
          left = window.innerWidth - popupWidth - 20;
        }
      }
      
      return {
        side,
        top: isMobile ? 100 : Math.max(80, cardRect.top + (cardRect.height / 2) - 300),
        left
      };
    }
    return { side: "right", top: 0, left: 0 };
  };

  const handleShowDetails = () => {
    if (!showDetails) {
      setPopupPosition(calculatePosition());
    }
    setShowDetails(!showDetails);
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target) &&
        cardRef.current &&
        !cardRef.current.contains(event.target)
      ) {
        setShowDetails(false);
      }
    }

    if (showDetails) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [showDetails]);

  return (
    <>
      <div ref={cardRef} className="relative w-[280px] lg:w-[280px] mx-auto">
        <div className="border-none rounded-2xl overflow-hidden bg-black">
          <Image
            alt={project.title}
            className="object-cover w-full h-[280px]"
            src={project.image}
            width={280}
            height={280}
          />
          <div className="absolute bottom-2 left-2 right-2 bg-black/30 backdrop-blur-md border border-white/20 rounded-xl px-4 py-3 space-y-2">
            <p className="nova-oval-regular text-sm text-white/90 font-medium truncate text-center">
              {project.title}
            </p>
            <div className="flex justify-center">
              <button
                onClick={handleShowDetails}
                className="nova-oval-regular text-xs text-white bg-black/20 hover:bg-black/40 px-8 py-1.5 rounded-lg transition-all duration-200 min-w-[120px]"
              >
                {showDetails ? "Hide details" : "Show details"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Popup Details */}
      {showDetails && (
        <div
          ref={popupRef}
          className="fixed w-[320px] h-[500px] md:w-[500px] md:h-[600px] bg-black/30 backdrop-blur-md border border-white/20 rounded-2xl p-4 md:p-8 shadow-2xl z-50 transition-all duration-300 ease-out popup-animate"
          style={{
            top: `${Math.max(20, Math.min(popupPosition.top, window.innerHeight - (window.innerWidth < 768 ? 520 : 620)))}px`,
            left: `${popupPosition.left}px`
          }}
        >
          <button
            onClick={() => setShowDetails(false)}
            className="absolute top-6 right-6 text-white/60 hover:text-white transition-colors bg-white/5 hover:bg-white/10 rounded-full p-2"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M15 5L5 15M5 5L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>

          <div className="h-full flex flex-col">
            <div className="mb-4 md:mb-6">
              <h3 className="medievalsharp-regular text-xl md:text-3xl font-bold text-white mb-2 md:mb-3">{project.title}</h3>
              <p className="nova-oval-regular text-sm md:text-base text-white/70 font-medium">{project.category}</p>
            </div>
            
            <div className="flex-1 overflow-y-auto">
              <p className="nova-oval-regular text-white/90 mb-4 md:mb-6 leading-relaxed text-sm md:text-base">
                {project.description}
              </p>

              <div className="mb-4 md:mb-6">
                <h4 className="medievalsharp-regular text-base md:text-lg font-semibold text-white mb-3 md:mb-4">Technologies</h4>
                <div className="flex flex-wrap gap-2 md:gap-3">
                  {project.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 md:px-4 md:py-2 text-xs md:text-sm rounded-full bg-white/10 text-white border border-white/20 backdrop-blur-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-3 md:gap-4 mt-4 md:mt-6">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 text-center px-4 py-2 md:px-6 md:py-3 rounded-xl bg-white/10 hover:bg-white/20 transition-all duration-200 text-white font-medium border border-white/20 backdrop-blur-sm text-sm md:text-base"
                >
                  View Code
                </a>
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 text-center px-4 py-2 md:px-6 md:py-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-200 text-white font-medium border border-white/30 backdrop-blur-sm text-sm md:text-base"
                >
                  Live Demo
                </a>
              )}
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .popup-animate {
          animation: popupFade 0.3s ease-out forwards;
        }
        
        @keyframes popupFade {
          0% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
        }
      `}</style>
    </>
  );
}