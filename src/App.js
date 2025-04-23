import React, { useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Section from './components/Section';
import TimelineItem from './components/TimelineItem';
import ProjectCard from './components/ProjectCard';
import SkillBadge from './components/SkillBadge';
import { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';

function App() {
  const [formStatus, setFormStatus] = useState({
    submitting: false,
    submitted: false,
    error: null
  });
  const form = useRef();

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

  const sendEmail = (e) => {
    e.preventDefault();
    setFormStatus({ submitting: true, submitted: false, error: null });

    emailjs.sendForm(
      'service_i4bx25z',
      'template_ybgms7p', 
      form.current,
      'd4LN-aanQaHxZ9iBx' 
    )
      .then((result) => {
        console.log('Email sent successfully:', result.text);
        setFormStatus({ submitting: false, submitted: true, error: null });
        form.current.reset();
        
        // Reset form status after 5 seconds
        setTimeout(() => setFormStatus({ submitting: false, submitted: false, error: null }), 5000);
      }, (error) => {
        console.error('Failed to send email:', error.text);
        setFormStatus({ submitting: false, submitted: false, error: 'Failed to send message. Please try again.' });
      });
  };

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
            period="Jan 2025 - Apr 2025"
            points={[
              "Developed predictive models to analyze market patterns, leading to a 10% increase in simulated returns.",
              "Built data pipelines using Python and JavaScript to automate extraction and transformation of financial datasets.",
              "Integrated NLP-powered prompt engineering for news-based sentiment analysis, improving short-term prediction reliability by 15%.",
            ]}
          />
          <TimelineItem 
            title="Coding Tutor"
            company="Beaver Creek Kids Club"
            period="Sep 2024 - Present"
            points={[
              "Mentored 20+ students weekly in C++ and Python fundamentals, resulting in a 95% lab pass rate.",
              "Created interactive debugging sessions and coding challenges to reinforce core OOP concepts."
            ]}
          />
          <TimelineItem 
            title="Lab Assistant, IPC144"
            company="Seneca College"
            period="Sep 2024 - Present"
            points={[
              "Supported 60+ students per semester through hands-on help with assignments and lab activities.",
              "Raised class average by 30% through one-on-one guidance and peer-learning strategies.",
              "Maintained a safe and collaborative lab environment by enforcing lab guidelines."
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
            period="Aug 2024 - Present"
            points={[
              "Mentored 45+ international students, enhancing retention by 70% in the first term.",
              "Co-led workshops on time management and academic strategies which 90% of mentees rated sessions 'Very Helpful.'",
              "Enhancing cultural awareness by assisting international students with settling into life in Canada."
            ]}
          />
          <TimelineItem 
            title="Treasurer"
            company="Seneca Software Developers Club"
            period="Aug 2024 - Present"
            points={[
              "Managed budgeting and event financing in alignment with Seneca Student Federation guidelines.",
              "Delivered two financial reports showcasing 23% club membership growth and strong ROI on events.",
              "Assisted in organizing hands-on coding workshops, events and speaker sessions."
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
              "Achieved 75.3% accuracy on a 10K+ image dataset using TensorFlow and OpenCV, enabling real-time emotion recognition at 30 FPS. ",
              "Implemented real-time emotion tracking at 30 FPS with inference under 200 ms.",
              "Designed for scalability using modular components and clean architecture."
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
              "Implemented an SVM classifier on a clinical dataset of 768 patients achieving 78.7% training and 77.3% test accuracy.",
              "Used StandardScaler and stratified splitting to ensure balanced performance.",
              "Preprocessed features and applied grid search to fine-tune model parameters."
            ]}
            tech={["Python", "Scikit-learn", "Pandas", "NumPy", "Matplotlib"]}
            links={{
              github: "https://github.com/angelshinh1/ML/blob/main/diabetes_prediction_ML.ipynb"
            }}
          />
          <ProjectCard 
            title="Movie Recommendation System"
            description={[
              "Developed a cool hybrid recommendation engine combining collaborative and content-based filtering.",
              "Leveraged Sklearn, Pandas, and cosine similarity to personalize user recommendations.",
            ]}
            tech={["Python", "Pandas", "Scikit-learn", "Flask", "React"]}
            links={{
              github: "#"
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
              <SkillBadge name="PostgreSQL" icon="fas fa-circle-nodes" />
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
              <a href="https://www.linkedin.com/in/angelshinh/" target="_blank" rel="noopener noreferrer" className="social-icon">
                <i className="fab fa-linkedin-in"></i>
              </a>
              <a href="https://github.com/angelshinh1" target="_blank" rel="noopener noreferrer" className="social-icon">
                <i className="fab fa-github"></i>
              </a>
              <a href="mailto:shinh.maverick@gmail.com" className="social-icon">
                <i className="fas fa-envelope"></i>
              </a>
            </div>
          </div>
          
          <div className="contact-form-container">
            <form className="contact-form" ref={form} onSubmit={sendEmail}>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input type="text" id="name" name="user_name" placeholder="Your Name" required />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="user_email" placeholder="Your Email" required />
              </div>
              <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <input type="text" id="subject" name="subject" placeholder="Subject" required />
              </div>
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea id="message" name="message" placeholder="Your Message" required></textarea>
              </div>
              <button 
                type="submit" 
                className="submit-btn" 
                disabled={formStatus.submitting}
              >
                {formStatus.submitting ? (
                  <span>Sending...</span>
                ) : (
                  <>
                    <span>Send Message</span>
                    <i className="fas fa-paper-plane"></i>
                  </>
                )}
              </button>
              
              {formStatus.submitted && (
                <div className="form-success-message">
                  <i className="fas fa-check-circle"></i> Message sent successfully!
                </div>
              )}
              
              {formStatus.error && (
                <div className="form-error-message">
                  <i className="fas fa-exclamation-circle"></i> {formStatus.error}
                </div>
              )}
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