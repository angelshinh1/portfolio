import React, { useEffect, useRef } from 'react';

const Hero = () => {
  const textRef = useRef(null);
  
  useEffect(() => {
    const texts = ["Software Engineer", "ML Engineer", "Problem Solver"];
    let count = 0;
    let index = 0;
    let currentText = "";
    let letter = "";
    
    const type = () => {
      if (count === texts.length) {
        count = 0;
      }
      currentText = texts[count];
      letter = currentText.slice(0, ++index);
      
      if (textRef.current) {
        textRef.current.textContent = letter;
      }
      
      if (letter.length === currentText.length) {
        count++;
        index = 0;
        setTimeout(type, 2000);
      } else {
        setTimeout(type, 100);
      }
    };
    
    type();
  }, []);
  
  return (
    <div id="hero" className="hero">
      <div className="hero-content">
        <h4 className="greeting">Hello, I'm</h4>
        <h1 className="name">Angel Shinh</h1>
        <h2 className="dynamic-text">I'm a <span ref={textRef}></span><span className="cursor">|</span></h2>
        
        <p className="hero-description">
          Versatile engineer with a passion for building scalable systems and ML solutions
        </p>
        
        <div className="hero-contact">
          <div className="location">
            <i className="fas fa-map-marker-alt"></i>
            <span>Markham, ON</span>
          </div>
          <div className="phone">
            <i className="fas fa-phone"></i>
            <span>+1 437-430-6774</span>
          </div>
          <div className="email">
            <i className="fas fa-envelope"></i>
            <span>shinh.maverick@gmail.com</span>
          </div>
        </div>
        
        <div className="hero-links">
          <a href="YOUR_LINKEDIN_URL" target="_blank" rel="noopener noreferrer" className="social-link linkedin">
            <i className="fab fa-linkedin-in"></i>
          </a>
          <a href="YOUR_GITHUB_URL" target="_blank" rel="noopener noreferrer" className="social-link github">
            <i className="fab fa-github"></i>
          </a>
          <a href="#contact" className="cta-button">
            <span>Contact Me</span>
            <i className="fas fa-arrow-right"></i>
          </a>
        </div>
      </div>
      
      <div className="hero-image">
        <div className="avatar-container">
          <div className="avatar-placeholder">
            <i className="fas fa-user"></i>
          </div>
        </div>
        <div className="floating-shape shape1"></div>
        <div className="floating-shape shape2"></div>
        <div className="floating-shape shape3"></div>
      </div>
    </div>
  );
};

export default Hero;