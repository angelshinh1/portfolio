import React, { useEffect, useRef, useState, lazy, Suspense } from 'react';
import * as THREE from 'three';

const HeroAnimation = ({ mountRef }) => {
  useEffect(() => {
    if (!mountRef.current) return;
    
    // Scene setup
    const scene = new THREE.Scene();
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setClearColor(0x000000, 0);
    
    // Get the parent container dimensions
    const container = mountRef.current;
    const containerWidth = container.clientWidth || 300;
    const containerHeight = container.clientHeight || 300;
    
    // Set up camera with responsive aspect ratio
    const camera = new THREE.PerspectiveCamera(
      75,
      containerWidth / containerHeight,
      0.1,
      1000
    );
    camera.position.z = 5;
    
    // Set renderer size based on container
    renderer.setSize(containerWidth, containerHeight);
    mountRef.current.appendChild(renderer.domElement);
    
    // Create particles
    const particlesCount = window.innerWidth <= 768 ? 150 : 300; 
    const particlesGeometry = new THREE.BufferGeometry();
    const posArray = new Float32Array(particlesCount * 3);
    const colorArray = new Float32Array(particlesCount * 3);
    
    // Set positions and colors
    for(let i = 0; i < particlesCount * 3; i++) {
      // Positions - create a sphere of particles
      posArray[i] = (Math.random() - 0.5) * 5;
      
      // Colors 
      if (i % 3 === 0) colorArray[i] = 0.95 + Math.random() * 0.05; 
      if (i % 3 === 1) colorArray[i] = 0.4 + Math.random() * 0.2; 
      if (i % 3 === 2) colorArray[i] = 0.3 + Math.random() * 0.2; 
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colorArray, 3));
    
    // Material with vertex colors
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.03,
      vertexColors: true,
      transparent: true,
      opacity: 0.8
    });
    
    // Create particle system
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);
    
    // central sphere 
    const sphereGeometry = new THREE.SphereGeometry(0.8, 32, 32);
    const sphereMaterial = new THREE.MeshBasicMaterial({ 
      color: 0xFF7F50, 
      transparent: true,
      opacity: 0.7,
      wireframe: true
    });
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    scene.add(sphere);
    
    // glow effect
    const glowGeometry = new THREE.SphereGeometry(0.9, 32, 32);
    const glowMaterial = new THREE.MeshBasicMaterial({
      color: 0xFF7F50,
      transparent: true,
      opacity: 0.15,
      side: THREE.BackSide
    });
    const glowSphere = new THREE.Mesh(glowGeometry, glowMaterial);
    scene.add(glowSphere);
    
    // Function to update sizes when window resizes
    const updateSize = () => {
      if (!mountRef.current) return;
      
      const width = mountRef.current.clientWidth || 300;
      const height = mountRef.current.clientHeight || 300;
      
      // Update camera aspect ratio
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      
      // Update renderer size
      renderer.setSize(width, height);
    };
    
    // adjust for mobile
    const adjustThreeJSForMobile = () => {
      const isMobile = window.innerWidth <= 768;
      
      if (isMobile) {
        camera.position.z = 6;
        sphere.scale.set(0.8, 0.8, 0.8);
        glowSphere.scale.set(0.8, 0.8, 0.8);
      } else {
        // Reset for desktop
        camera.position.z = 5;
        sphere.scale.set(1, 1, 1);
        glowSphere.scale.set(1, 1, 1);
      }
    };
    
    // Initial adjustment
    adjustThreeJSForMobile();
    
    // resize handler
    const handleResize = () => {
      updateSize();
      adjustThreeJSForMobile();
    };
    
    window.addEventListener('resize', handleResize);
    
    // Mouse movement effect
    let mouseX = 0;
    let mouseY = 0;
    
    const handleMouseMove = (event) => {
      // Get mouse position relative to the container
      const rect = mountRef.current.getBoundingClientRect();
      mouseX = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouseY = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    const handleClick = () => {
      const timeline = {
        start: Date.now(),
        duration: 500
      };
      
      const originalScale = sphere.scale.clone();
      const pulseAnimation = () => {
        const elapsed = Date.now() - timeline.start;
        if (elapsed < timeline.duration) {
          const pulseScale = 1 + 0.2 * Math.sin(elapsed / timeline.duration * Math.PI);
          sphere.scale.set(
            originalScale.x * pulseScale,
            originalScale.y * pulseScale,
            originalScale.z * pulseScale
          );
          requestAnimationFrame(pulseAnimation);
        } else {
          sphere.scale.copy(originalScale);
        }
      };
      
      pulseAnimation();
    };
    
    if (mountRef.current) {
      mountRef.current.addEventListener('click', handleClick);
    }
    
    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      
      // Rotate particles 
      particlesMesh.rotation.x += 0.001;
      particlesMesh.rotation.y += 0.001;
      
      // Rotate sphere in response to mouse
      sphere.rotation.y += 0.01;
      sphere.rotation.x += 0.01;
      glowSphere.rotation.copy(sphere.rotation);
      
      // Move particles slightly based on mouse position
      particlesMesh.rotation.y += mouseX * 0.001;
      particlesMesh.rotation.x += mouseY * 0.001;
      
      renderer.render(scene, camera);
    };
    
    animate();
    
    // Clean up
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      
      if (mountRef.current) {
        mountRef.current.removeEventListener('click', handleClick);
        if (renderer.domElement && mountRef.current.contains(renderer.domElement)) {
          mountRef.current.removeChild(renderer.domElement);
        }
      }
      
      // Dispose resources
      particlesGeometry.dispose();
      particlesMaterial.dispose();
      sphereGeometry.dispose();
      sphereMaterial.dispose();
      glowGeometry.dispose();
      glowMaterial.dispose();
      renderer.dispose();
    };
  }, [mountRef]);
  
  return null;
};

const Hero = () => {
  const [displayText, setDisplayText] = useState("");
  const [isAnimationLoaded, setIsAnimationLoaded] = useState(false);
  const cursorRef = useRef(null);
  const mountRef = useRef(null);
  
  useEffect(() => {
    // Text typing animation
    const texts = ["Technical Systems Analyst", "Computer Science Instructor", "ML Engineer", "Problem Solver"];
    let count = 0;
    let index = 0;
    let currentText = "";
    
    const type = () => {
      if (count === texts.length) {
        count = 0;
      }
      currentText = texts[count];
      
      const letter = currentText.slice(0, ++index);
      setDisplayText(letter);
      
      if (letter.length === currentText.length) {
        count++;
        index = 0;
        setTimeout(type, 2000);
      } else {
        setTimeout(type, 100);
      }
    };
    
    // Start the typing animation
    type();
    
    let cursorVisible = true;
    const cursorBlink = setInterval(() => {
      if (cursorRef.current) {
        cursorRef.current.style.opacity = cursorVisible ? "1" : "0";
        cursorVisible = !cursorVisible;
      }
    }, 500);
    
    // Set animation as loaded after a short delay
    const loadTimer = setTimeout(() => {
      setIsAnimationLoaded(true);
    }, 100);
    
    // Clean up
    return () => {
      clearInterval(cursorBlink);
      clearTimeout(loadTimer);
    };
  }, []);

  // Handle smooth scrolling to contact section
  const scrollToContact = (e) => {
    e.preventDefault();
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  return (
    <section id="hero" className="hero" aria-label="Introduction">
      <div className="hero-content">
        <h4 className="greeting">Hello, I'm</h4>
        <h1 className="name">Angel Shinh</h1>
        <h2 className="dynamic-text" aria-live="polite">
          I'm a <span className="typed-text">{displayText}</span>
          <span ref={cursorRef} className="cursor" aria-hidden="true">|</span>
        </h2>
        
        <p className="hero-description">
          Versatile engineer with a passion for building scalable systems and ML solutions
        </p>
        
        <div className="hero-links">
  <div className="social-links-container">
    <a
      href="https://www.linkedin.com/in/angelshinh/"
      target="_blank"
      rel="noopener noreferrer"
      className="social-link linkedin"
      aria-label="LinkedIn Profile"
    >
      <i className="fab fa-linkedin-in"></i>
    </a>

    <a
      href="https://github.com/angelshinh1/"
      target="_blank"
      rel="noopener noreferrer"
      className="social-link github"
      aria-label="GitHub Profile"
    >
      <i className="fab fa-github"></i>
    </a>
  </div>

  <a
    href="#contact"
    className="cta-button primary-cta"
    onClick={scrollToContact}
    aria-label="Contact Me"
  >
    <span>Get in Touch</span>
    <i className="fas fa-arrow-right"></i>
  </a>

  <a
    href="https://drive.google.com/file/d/1CxIkzI7DpocLjvecnH8v1InCErbrlTfB/view?usp=sharing"
    className="cta-button secondary-cta"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Download Resume"
  >
    <span>Resume</span>
    <i className="fas fa-download"></i>
  </a>
</div>

      </div>
      
      <div className="hero-image">
        <div 
          className={`avatar-container ${isAnimationLoaded ? 'loaded' : 'loading'}`} 
          ref={mountRef}
          aria-hidden="true"
        >
          {isAnimationLoaded && <HeroAnimation mountRef={mountRef} />}
          {!isAnimationLoaded && <div className="loading-spinner"></div>}
        </div>
      </div>
    </section>
  );
};

export default Hero;