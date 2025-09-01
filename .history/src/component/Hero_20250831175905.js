import { motion } from "framer-motion";
import { FiDownload, FiGithub, FiLinkedin, FiMail } from "react-icons/fi";
import { useState, useEffect, useMemo, useRef } from "react";
import "./hero.scss";

const Hero = () => {
  const [displayedCode, setDisplayedCode] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const heroRef = useRef(null);

  const codeSnippet = useMemo(
    () => `const developer = {
  name: "Bojurie Rogers-Wright",
  role: "Full Stack Developer",
  skills: ["React", "Node.js", "TypeScript"],
  passion: "Building innovative solutions",
  location: "Worldwide"
};

function createAmazingProjects() {
  return transformIdeasIntoReality();
}`,
    []
  );

  // Set up Intersection Observer to detect when hero section is in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Start animation when section is in view
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      {
        threshold: 0.5, // Trigger when 50% of the section is visible
        rootMargin: window.innerWidth < 768 ? "0px" : "-100px 0px", // Adjust for mobile vs desktop
      }
    );

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    return () => {
      if (heroRef.current) {
        observer.unobserve(heroRef.current);
      }
    };
  }, []);

  // Handle typing animation only when section is in view
  useEffect(() => {
    if (isInView && currentIndex < codeSnippet.length) {
      const timer = setTimeout(() => {
        setDisplayedCode((prev) => prev + codeSnippet[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, 25);

      return () => clearTimeout(timer);
    } else if (currentIndex >= codeSnippet.length) {
      setIsTypingComplete(true);
    }
  }, [currentIndex, codeSnippet, isInView]);

  // Reset animation when section comes into view (for mobile)
  useEffect(() => {
    if (isInView && currentIndex === 0) {
      // Start animation if it hasn't started yet
      setDisplayedCode("");
      setCurrentIndex(0);
      setIsTypingComplete(false);
    }
  }, [isInView, currentIndex]);

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const socialLinks = useMemo(
    () => [
      {
        icon: <FiGithub />,
        href: "https://github.com/Bojurie",
        label: "GitHub",
      },
      {
        icon: <FiLinkedin />,
        href: "https://www.linkedin.com/in/bojurie-rogers-wright/",
        label: "LinkedIn",
      },
      { icon: <FiMail />, href: "mailto:hello@example.com", label: "Email" },
    ],
    []
  );

  return (
    <section className="hero" id="home" ref={heroRef}>
      <div className="hero-background">
        <div className="hero-gradient" />
      </div>

      <div className="hero-container">
        <motion.div
          className="hero-content"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          custom={0}
          variants={textVariants}
        >
          <motion.div className="hero-badge" custom={1} variants={textVariants}>
            <span className="badge-text">🚀 Full Stack Developer</span>
          </motion.div>

          <motion.h1 className="hero-title" custom={2} variants={textVariants}>
            <span className="title-line">Hi, I'm </span>
            <span className="title-gradient">Bojurie</span>
            <span className="title-line"> Rogers-Wright</span>
          </motion.h1>

          <motion.p
            className="hero-subtitle"
            custom={3}
            variants={textVariants}
          >
            I build <span className="text-highlight">exceptional</span> digital
            experiences that merge{" "}
            <span className="text-highlight">cutting-edge</span>
            technology with <span className="text-highlight">
              beautiful
            </span>{" "}
            design.
          </motion.p>

          <motion.p
            className="hero-description"
            custom={4}
            variants={textVariants}
          >
            Specializing in modern web development, I transform complex ideas
            into intuitive, performant applications. Currently focused on React
            ecosystems, cloud architecture, and creating solutions that make a
            difference.
          </motion.p>

          <motion.div
            className="hero-actions"
            custom={5}
            variants={textVariants}
          >
            <motion.button
              className="btn btn-primary"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <FiDownload />
              Download Resume
            </motion.button>

            <motion.a
              href="#projects"
              className="btn btn-outline"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              View Projects
            </motion.a>
          </motion.div>

          <motion.div
            className="hero-social"
            custom={6}
            variants={textVariants}
          >
            {socialLinks.map((social, index) => (
              <motion.a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                aria-label={social.label}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                {social.icon}
              </motion.a>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          className="hero-visual"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={
            isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }
          }
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <div className="visual-container">
            <div className="visual-content">
              <div className="code-window">
                <div className="window-header">
                  <div className="window-controls">
                    <span className="control red"></span>
                    <span className="control yellow"></span>
                    <span className="control green"></span>
                  </div>
                  <span className="window-title">portfolio.js</span>
                </div>
                <div className="window-content">
                  <pre className="code-block">
                    <code>
                      {displayedCode}
                      {!isTypingComplete && isInView && (
                        <span className="typing-cursor">|</span>
                      )}
                    </code>
                  </pre>
                  {isTypingComplete && (
                    <div className="code-complete-indicator">✓ Code ready</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="hero-scroll">
        <div className="scroll-indicator" />
        <span>Scroll to explore</span>
      </div>
    </section>
  );
};

export default Hero;
