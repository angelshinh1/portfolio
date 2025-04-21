import React, { useEffect, useRef } from 'react';

const Section = ({ id, title, subtitle, children, light = false }) => {
  const sectionRef = useRef(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate');
        }
      },
      {
        threshold: 0.1
      }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);
  
  return (
    <section id={id} className={`section ${light ? 'light-section' : ''}`} ref={sectionRef}>
      <div className="section-heading">
        <h2>{title}</h2>
        {subtitle && <p className="section-subtitle">{subtitle}</p>}
        <div className="section-divider"></div>
      </div>
      <div className="section-content">
        {children}
      </div>
    </section>
  );
};

export default Section;