import { motion } from "framer-motion";
import { FiDownload, FiGithub, FiLinkedin, FiMail } from "react-icons/fi";
import { useState, useEffect } from "react";
import "./hero.scss";

const Hero = () => {
  const [displayedCode, setDisplayedCode] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTypingComplete, setIsTypingComplete] = useState(false);

  const codeSnippet = `const developer = {
  name: "Bojurie Rogers-Wright",
  role: "Full Stack Developer",
  skills: ["React", "Node.js", "TypeScript"],
  passion: "Building innovative solutions",
  location: "Worldwide"
};

function createAmazingProjects() {
  return transformIdeasIntoReality();
}`;

  useEffect(() => {
    if (currentIndex < codeSnippet.length) {
      const timer = setTimeout(() => {
        setDisplayedCode((prev) => prev + codeSnippet[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, 15); // Typing speed

      return () => clearTimeout(timer);
    } else {
      setIsTypingComplete(true);
    }
  }, [currentIndex, codeSnippet]);

  const textVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.8,
        ease: [0.16, 0.77, 0.47, 0.97],
      },
    }),
  };

  const floatingVariants = {
    float: {
      y: [0, -15, 0],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  const cursorVariants = {
    blinking: {
      opacity: [0, 1, 0],
      transition: {
        duration: 1,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  const socialLinks = [
    { icon: <FiGithub />, href: "https://github.com/Bojurie", label: "GitHub" },
    {
      icon: <FiLinkedin />,
      href: "https://www.linkedin.com/in/bojurie-rogers-wright/",
      label: "LinkedIn",
    },
    { icon: <FiMail />, href: "mailto:hello@example.com", label: "Email" },
  ];

  return (
    <section className="hero" id="home">
      <div className="hero-background">
        <div className="hero-gradient" />
        <div className="hero-grid" />
      </div>

      <div className="hero-container">
        <motion.div
          className="hero-content"
          initial="hidden"
          animate="visible"
          custom={0}
          variants={textVariants}
        >
          <motion.div className="hero-badge" custom={1} variants={textVariants}>
            <motion.span
              className="badge-text"
              variants={floatingVariants}
              animate="float"
            >
              🚀 Full Stack Developer
            </motion.span>
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
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FiDownload />
              Download Resume
            </motion.button>

            <motion.a
              href="#projects"
              className="btn btn-outline"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
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
                whileHover={{ scale: 1.2, y: -2 }}
                whileTap={{ scale: 0.9 }}
              >
                {social.icon}
              </motion.a>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          className="hero-visual"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
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
                      {!isTypingComplete && (
                        <motion.span
                          className="typing-cursor"
                          variants={cursorVariants}
                          animate="blinking"
                        >
                          |
                        </motion.span>
                      )}
                    </code>
                  </pre>
                  {isTypingComplete && (
                    <motion.div
                      className="code-complete-indicator"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5, duration: 0.5 }}
                    >
                      ✓ Code ready
                    </motion.div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div
        className="hero-scroll"
        animate={{
          y: [0, 10, 0],
          opacity: [0.6, 1, 0.6],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <div className="scroll-indicator" />
        <span>Scroll to explore</span>
      </motion.div>
    </section>
  );
};

export default Hero;
