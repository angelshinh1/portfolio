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
    // Prevent scrolling when menu is open
    if (!menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  };

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        <div className="logo">
          <a href="#hero">AS</a>
        </div>
        
        <div className="menu-toggle" onClick={toggleMenu}>
          <i className={menuOpen ? "fas fa-times" : "fas fa-bars"}></i>
        </div>
        
        <ul className={`nav-menu ${menuOpen ? 'active' : ''}`}>
          <li><a href="#hero" className={activeSection === "hero" ? "active" : ""} onClick={() => {setMenuOpen(false); document.body.style.overflow = 'auto';}}>Home</a></li>
          <li><a href="#about" className={activeSection === "about" ? "active" : ""} onClick={() => {setMenuOpen(false); document.body.style.overflow = 'auto';}}>About</a></li>
          <li><a href="#experience" className={activeSection === "experience" ? "active" : ""} onClick={() => {setMenuOpen(false); document.body.style.overflow = 'auto';}}>Experience</a></li>
          <li><a href="#leadership" className={activeSection === "leadership" ? "active" : ""} onClick={() => {setMenuOpen(false); document.body.style.overflow = 'auto';}}>Leadership</a></li>
          <li><a href="#projects" className={activeSection === "projects" ? "active" : ""} onClick={() => {setMenuOpen(false); document.body.style.overflow = 'auto';}}>Projects</a></li>
          <li><a href="#skills" className={activeSection === "skills" ? "active" : ""} onClick={() => {setMenuOpen(false); document.body.style.overflow = 'auto';}}>Skills</a></li>
          <li><a href="#contact" className={activeSection === "contact" ? "active" : ""} onClick={() => {setMenuOpen(false); document.body.style.overflow = 'auto';}}>Contact</a></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;