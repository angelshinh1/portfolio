import React, { useState, useEffect } from 'react';

const Navbar = () => {
  const [activeSection, setActiveSection] = useState("hero");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("section, .hero");
      const currentScrollPos = window.scrollY;
      
      // Set navbar background when scrolled
      if (currentScrollPos > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
      
      // Hide/show navbar based on scroll direction
      // Don't hide at the very top of the page & don't hide when menu is open
      const isScrollingDown = currentScrollPos > prevScrollPos;
      const isAtTop = currentScrollPos < 100;
      
      if (!menuOpen) {
        if (isScrollingDown && !isAtTop && visible) {
          setVisible(false);
        } else if (!isScrollingDown && !visible) {
          setVisible(true);
        }
      }
      
      setPrevScrollPos(currentScrollPos);
      
      // Determine which section is currently in view
      let current = "";
      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (currentScrollPos >= sectionTop - 300) {
          current = section.getAttribute("id");
        }
      });
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos, visible, menuOpen]);

  const toggleMenu = () => {
    // When opening menu, ensure navbar is visible
    if (!menuOpen) {
      setVisible(true);
    }
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''} ${visible ? 'visible' : 'hidden'}`}>
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