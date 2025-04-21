import React, { useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Section from './components/Section';
import TimelineItem from './components/TimelineItem';
import ProjectCard from './components/ProjectCard';
import SkillBadge from './components/SkillBadge';

function App() {
  useEffect(() => {
    const handleScrollToSection = () => {
      // Handle hash links
      if (window.location.hash) {
        const id = window.location.hash.substring(1);
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };

    window.addEventListener('load', handleScrollToSection);
    return () => window.removeEventListener('load', handleScrollToSection);
  }, []);

  return (
    <div className="app">
      <Navbar />
      <Hero />

      <Section id="about" title="About Me" subtitle="Get to know me better">
        <div className="about-content">
          <div className="about-text">
            <p>
              I'm a versatile <strong>Software Engineer</strong> with a year of experience designing scalable systems. 
              Proficient in <strong>Python</strong>, <strong>C++</strong>, and <strong>JavaScript</strong> (React, Node.js), 
              I have hands-on experience delivering production-grade ML models, building intuitive web interfaces, and crafting APIs.
            </p>
            <p>
              My passion lies in creating clean, efficient code and continuously expanding my technical knowledge. 
              I thrive in collaborative environments where I can contribute to innovative solutions while growing professionally.
            </p>
            <div className="about-highlights">
              <div className="highlight">
                <i className="fas fa-code"></i>
                <h4>Software Development</h4>
                <p>Building clean, scalable applications</p>
              </div>
              <div className="highlight">
                <i className="fas fa-robot"></i>
                <h4>Machine Learning</h4>
                <p>Creating intelligent data-driven solutions</p>
              </div>
              <div className="highlight">
                <i className="fas fa-server"></i>
                <h4>Web Development</h4>
                <p>Crafting responsive user interfaces</p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section id="experience" title="Work Experience" subtitle="My professional journey" light={false}>
        <div className="timeline">
          <TimelineItem 
            title="Machine Learning Engineer & Data Science Intern"
            company="Meta Trading Club"
            period="Jan 2025 – Apr 2025"
            points={[
              "Designed and deployed ML models to support financial trading strategies with 15% improved prediction accuracy",
              "Built and refined data pipelines using Python and JavaScript handling 10GB+ of financial data daily",
              "Collaborated with finance experts to integrate AI-driven solutions, accelerating decision-making by 30%"
            ]}
          />
          <TimelineItem 
            title="Coding Tutor"
            company="Beaver Creek Kids Club"
            period="Sep 2024 – Present"
            points={[
              "Guide 20+ students weekly through C++ and Python fundamentals with interactive learning methods",
              "Developed custom debugging workshops and coding challenges that increased student engagement by 40%",
              "Created personalized learning paths resulting in 85% of students mastering core programming concepts"
            ]}
          />
          <TimelineItem 
            title="Lab Assistant, IPC144"
            company="Seneca College"
            period="Sep 2024 – Present"
            points={[
              "Assist 60+ students per semester with C programming labs and debugging sessions",
              "Improved class average by 10% through targeted one-on-one mentoring and custom learning resources",
              "Collaborated with professors to refine lab materials based on common student challenges"
            ]}
            isLast={true}
          />
        </div>
      </Section>

      <Section id="leadership" title="Leadership & Activities" subtitle="Making an impact">
        <div className="timeline">
          <TimelineItem 
            title="Peer Mentor"
            company="Seneca College"
            period="Aug 2024 – Present"
            points={[
              "Support 45+ international students, boosting first-term retention by 70% through weekly check-ins",
              "Co-developed time-management workshops rated 'very helpful' by 80% of participants",
              "Created comprehensive resource guides for new students to navigate college systems"
            ]}
          />
          <TimelineItem 
            title="Treasurer"
            company="Seneca Software Developers Club"
            period="Aug 2024 – Present"
            points={[
              "Manage club finances and budget approvals for tech events and hackathons",
              "Prepare detailed semester-end reports on club growth, member engagement, and ROI",
              "Secured 30% additional funding through strategic partnerships with local tech companies"
            ]}
            isLast={true}
          />
        </div>
      </Section>

      <Section id="projects" title="Projects" subtitle="My recent work" light={false}>
        <div className="projects-grid">
          <ProjectCard 
            title="Facial Expression Recognition App"
            description={[
              "Achieved 75.3% accuracy on 10K+ images with TensorFlow and OpenCV",
              "Implemented real-time emotion tracking at 30 FPS with inference under 200 ms",
              "Optimized model for edge deployment on mobile devices"
            ]}
            tech={["Python", "TensorFlow", "OpenCV", "Flask"]}
            links={{
              backend: "https://github.com/angelshinh1/face-expression-detector-backend/",
              frontend: "https://github.com/angelshinh1/face-expression-detector-frontend"
            }}
          />
          <ProjectCard 
            title="Diabetes Prediction System"
            description={[
              "Built model with 78.66% training accuracy and 77.27% test accuracy using SVM",
              "Implemented robust data preprocessing pipeline with feature scaling and normalization",
              "Performed exploratory data analysis to identify key trends and correlations in patient data"
            ]}
            tech={["Python", "Scikit-learn", "Pandas", "NumPy", "Matplotlib"]}
            links={{
              github: "https://github.com/angelshinh1/ML/blob/main/diabetes_prediction_ML.ipynb"
            }}
          />
          <ProjectCard 
            title="Movie Recommendation System"
            description={[
              "Developed hybrid recommendation engine combining collaborative and content-based filtering",
              "Implemented user preference tracking to refine recommendations over time",
              "Processed dataset of 5000+ movies and 100,000+ ratings for accurate suggestions"
            ]}
            tech={["Python", "Pandas", "Scikit-learn", "Flask", "React"]}
            links={{
              github: "#"
            }}
          />
          <ProjectCard 
            title="Portfolio Website"
            description={[
              "Designed and developed responsive personal portfolio with React",
              "Implemented smooth animations and transitions for enhanced user experience",
              "Optimized performance with lazy loading and code splitting techniques"
            ]}
            tech={["React", "JavaScript", "CSS3", "Responsive Design"]}
            links={{
              demo: "#"
            }}
          />
        </div>
      </Section>

      <Section id="skills" title="Skills & Technologies" subtitle="What I work with">
        <div className="skills-container">
          <div className="skills-category">
            <h3><i className="fas fa-code"></i> Programming</h3>
            <div className="skills-grid">
              <SkillBadge name="Python" icon="fab fa-python" />
              <SkillBadge name="JavaScript" icon="fab fa-js" />
              <SkillBadge name="C++" icon="fas fa-file-code" />
              <SkillBadge name="C" icon="fas fa-code" />
              <SkillBadge name="Bash" icon="fas fa-terminal" />
            </div>
          </div>
          
          <div className="skills-category">
            <h3><i className="fas fa-brain"></i> ML & Data Science</h3>
            <div className="skills-grid">
              <SkillBadge name="Pandas" icon="fas fa-table" />
              <SkillBadge name="NumPy" icon="fas fa-calculator" />
              <SkillBadge name="Scikit-learn" icon="fas fa-chart-line" />
              <SkillBadge name="TensorFlow" icon="fas fa-network-wired" />
              <SkillBadge name="PyTorch" icon="fas fa-fire" />
            </div>
          </div>
          
          <div className="skills-category">
            <h3><i className="fas fa-laptop-code"></i> Web Development</h3>
            <div className="skills-grid">
              <SkillBadge name="React" icon="fab fa-react" />
              <SkillBadge name="Node.js" icon="fab fa-node-js" />
              <SkillBadge name="Express.js" icon="fas fa-server" />
              <SkillBadge name="HTML5" icon="fab fa-html5" />
              <SkillBadge name="CSS3" icon="fab fa-css3-alt" />
            </div>
          </div>
          
          <div className="skills-category">
            <h3><i className="fas fa-database"></i> Databases</h3>
            <div className="skills-grid">
              <SkillBadge name="MySQL" icon="fas fa-database" />
              <SkillBadge name="MongoDB" icon="fas fa-leaf" />
              <SkillBadge name="PostgreSQL" icon="fas fa-elephant" />
            </div>
          </div>
          
          <div className="skills-category">
            <h3><i className="fas fa-tools"></i> Tools & Other</h3>
            <div className="skills-grid">
              <SkillBadge name="Git/GitHub" icon="fab fa-github" />
              <SkillBadge name="Jira" icon="fab fa-jira" />
              <SkillBadge name="VS Code" icon="fas fa-code" />
              <SkillBadge name="Linux" icon="fab fa-linux" />
              <SkillBadge name="Docker" icon="fab fa-docker" />
            </div>
          </div>
        </div>
      </Section>

      <Section id="contact" title="Get In Touch" subtitle="Let's connect" light={false}>
        <div className="contact-container">
          <div className="contact-info">
            <div className="contact-item">
              <i className="fas fa-map-marker-alt"></i>
              <div>
                <h4>Location</h4>
                <p>Markham, Ontario, Canada</p>
              </div>
            </div>
            <div className="contact-item">
              <i className="fas fa-envelope"></i>
              <div>
                <h4>Email</h4>
                <p>shinh.maverick@gmail.com</p>
              </div>
            </div>
            <div className="contact-item">
              <i className="fas fa-phone"></i>
              <div>
                <h4>Phone</h4>
                <p>+1 437-430-6774</p>
              </div>
            </div>
            <div className="contact-socials">
              <a href="YOUR_LINKEDIN_URL" target="_blank" rel="noopener noreferrer" className="social-icon">
                <i className="fab fa-linkedin-in"></i>
              </a>
              <a href="YOUR_GITHUB_URL" target="_blank" rel="noopener noreferrer" className="social-icon">
                <i className="fab fa-github"></i>
              </a>
              <a href="mailto:shinh.maverick@gmail.com" className="social-icon">
                <i className="fas fa-envelope"></i>
              </a>
            </div>
          </div>
          
          <div className="contact-form-container">
            <form className="contact-form">
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input type="text" id="name" name="name" placeholder="Your Name" required />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" placeholder="Your Email" required />
              </div>
              <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <input type="text" id="subject" name="subject" placeholder="Subject" required />
              </div>
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea id="message" name="message" placeholder="Your Message" required></textarea>
              </div>
              <button type="submit" className="submit-btn">
                <span>Send Message</span>
                <i className="fas fa-paper-plane"></i>
              </button>
            </form>
          </div>
        </div>
      </Section>
      
      <footer className="footer">
        <div className="footer-content">
          <p>&copy; {new Date().getFullYear()} Angel Shinh. All Rights Reserved.</p>
          <div className="footer-links">
            <a href="#hero">Home</a>
            <a href="#about">About</a>
            <a href="#experience">Experience</a>
            <a href="#projects">Projects</a>
            <a href="#contact">Contact</a>
          </div>
        </div>
      </footer>
      
      <a href="#hero" className="scroll-to-top">
        <i className="fas fa-chevron-up"></i>
      </a>
    </div>
  );
}

export default App;