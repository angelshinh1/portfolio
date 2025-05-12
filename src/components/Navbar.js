import React, { useState, useEffect } from 'react';

const Navbar = () => {
  const [activeSection, setActiveSection] = useState("hero");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("section, .hero");
      
      // Set navbar background when scrolled
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
      
      // Determine which section is currently in view
      let current = "";
      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop - 300) {
          current = section.getAttribute("id");
        }
      });
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        <div className="logo">
          <a href="#hero">AS</a>
        </div>
        
        <button 
          className={`menu-toggle ${menuOpen ? 'active' : ''}`} 
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
        
        <div className={`dropdown-menu ${menuOpen ? 'open' : ''}`}>
          <ul className="nav-menu">
            <li><a href="#hero" className={activeSection === "hero" ? "active" : ""} onClick={closeMenu}>Home</a></li>
            <li><a href="#about" className={activeSection === "about" ? "active" : ""} onClick={closeMenu}>About</a></li>
            <li><a href="#experience" className={activeSection === "experience" ? "active" : ""} onClick={closeMenu}>Experience</a></li>
            <li><a href="#leadership" className={activeSection === "leadership" ? "active" : ""} onClick={closeMenu}>Leadership</a></li>
            <li><a href="#projects" className={activeSection === "projects" ? "active" : ""} onClick={closeMenu}>Projects</a></li>
            <li><a href="#skills" className={activeSection === "skills" ? "active" : ""} onClick={closeMenu}>Skills</a></li>
            <li><a href="#contact" className={activeSection === "contact" ? "active" : ""} onClick={closeMenu}>Contact</a></li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;