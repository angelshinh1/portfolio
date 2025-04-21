import React from 'react';

const ProjectCard = ({ title, description, tech, links = {} }) => {
  return (
    <div className="project-card">
      <div className="project-content">
        <h3>{title}</h3>
        <ul className="project-points">
          {description.map((point, index) => (
            <li key={index}>{point}</li>
          ))}
        </ul>
        
        <div className="project-tech">
          {tech.map((item, index) => (
            <span key={index} className="tech-tag">{item}</span>
          ))}
        </div>
      </div>
      
      {(links.github || links.backend || links.frontend || links.demo) && (
        <div className="project-links">
          {links.github && (
            <a href={links.github} target="_blank" rel="noopener noreferrer" className="project-link">
              <i className="fab fa-github"></i> Repo
            </a>
          )}
          {links.backend && (
            <a href={links.backend} target="_blank" rel="noopener noreferrer" className="project-link">
              <i className="fas fa-server"></i> API
            </a>
          )}
          {links.frontend && (
            <a href={links.frontend} target="_blank" rel="noopener noreferrer" className="project-link">
              <i className="fas fa-code"></i> Frontend
            </a>
          )}
          {links.demo && (
            <a href={links.demo} target="_blank" rel="noopener noreferrer" className="project-link">
              <i className="fas fa-external-link-alt"></i> Demo
            </a>
          )}
        </div>
      )}
    </div>
  );
};

export default ProjectCard;