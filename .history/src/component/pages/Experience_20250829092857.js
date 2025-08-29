import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiBriefcase,
  FiCode,
  FiGlobe,
  FiChevronDown,
  FiChevronUp,
  FiExternalLink,
} from "react-icons/fi";
import "./experience.scss";

const experiences = [
  {
    id: 1,
    role: "Senior Full Stack Developer",
    company: "Beautiful Responsive Web",
    period: "2021 - Present",
    location: "Remote",
    description:
      "Led development of responsive web applications and implemented modern frontend architectures, delivering high-quality solutions to enterprise clients.",
    projects: [
      {
        title: "E-Commerce Platform",
        description:
          "Built a scalable e-commerce solution with React, Node.js, and MongoDB that processed over $2M in transactions in first year.",
        technologies: ["React", "Node.js", "MongoDB", "Stripe API"],
        impact: "Increased client revenue by 180% YoY",
        link: "#",
      },
      {
        title: "Data Visualization Dashboard",
        description:
          "Created interactive dashboards with real-time analytics for financial data visualization.",
        technologies: ["TypeScript", "D3.js", "Express", "PostgreSQL"],
        impact: "Reduced data analysis time by 65%",
        link: "#",
      },
      {
        title: "Content Management System",
        description:
          "Developed a custom CMS that reduced content publishing time by 60% for marketing teams.",
        technologies: ["Next.js", "Tailwind CSS", "Firebase"],
        impact: "Streamlined content workflow",
        link: "#",
      },
    ],
  },
  {
    id: 2,
    role: "Freelance Web Developer",
    company: "Fiverr",
    period: "2020 - Present",
    location: "Remote",
    description:
      "Delivered tailored web solutions to diverse clients, maintaining 100% satisfaction rating across 50+ projects.",
    projects: [
      {
        title: "Artist Portfolio",
        description:
          "Designed and developed a responsive portfolio showcasing artwork with smooth animations.",
        technologies: ["HTML5", "CSS3", "JavaScript", "GSAP"],
        impact: "Increased artist commission requests by 40%",
        link: "#",
      },
      {
        title: "Restaurant Booking System",
        description:
          "Implemented reservation management with table availability tracking and SMS notifications.",
        technologies: ["React", "Node.js", "MySQL", "Twilio API"],
        impact: "Reduced no-shows by 30%",
        link: "#",
      },
      {
        title: "Fitness Tracking App",
        description:
          "Built a mobile app for workout logging with progress charts and social sharing.",
        technologies: ["React Native", "Firebase", "Chart.js"],
        impact: "5K+ downloads in first month",
        link: "#",
      },
    ],
  },
];

const Experience = () => {
  const [expandedItems, setExpandedItems] = useState({});
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const toggleItem = (id) => {
    setExpandedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        when: "beforeChildren",
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.16, 0.77, 0.47, 0.97],
      },
    },
  };

  const projectVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="experience-section" id="experience">
      <div className="experience-container">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
        >
          <span className="highlight">03.</span> Professional Journey
        </motion.h2>

        <motion.div
          className="timeline"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {experiences.map((exp, index) => (
            <motion.div
              className="timeline-item"
              key={exp.id}
              variants={itemVariants}
            >
              <div className="timeline-marker">
                <div className="timeline-dot" />
                {index < experiences.length - 1 && (
                  <div className="timeline-line" />
                )}
              </div>

              <motion.div
                className="experience-card"
                whileHover={!isMobile ? { y: -3 } : {}}
                transition={{ duration: 0.2 }}
              >
                {/* Header - Always visible */}
                <div
                  className="experience-header"
                  onClick={() => isMobile && toggleItem(exp.id)}
                  style={{ cursor: isMobile ? "pointer" : "default" }}
                >
                  <div className="experience-icon">
                    <FiBriefcase />
                  </div>

                  <div className="experience-title">
                    <h3 className="role">{exp.role}</h3>
                    <div className="company-period">
                      <span className="company">{exp.company}</span>
                      <span className="period">{exp.period}</span>
                    </div>
                    <div className="location">
                      <FiGlobe />
                      {exp.location}
                    </div>
                  </div>

                  {isMobile && (
                    <div className="expand-toggle">
                      {expandedItems[exp.id] ? (
                        <FiChevronUp />
                      ) : (
                        <FiChevronDown />
                      )}
                    </div>
                  )}
                </div>

                {/* Content - Collapsible on mobile */}
                <AnimatePresence>
                  {(!isMobile || expandedItems[exp.id]) && (
                    <motion.div
                      initial={isMobile ? { opacity: 0, height: 0 } : false}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="experience-content"
                    >
                      <p className="experience-description">
                        {exp.description}
                      </p>

                      <div className="projects-section">
                        <h4 className="projects-heading">
                          <FiCode />
                          <span className="highlight">Key Projects</span>
                        </h4>

                        <div className="projects-grid">
                          {exp.projects.map((project, pIndex) => (
                            <motion.div
                              className="project-card"
                              key={pIndex}
                              variants={projectVariants}
                              initial="hidden"
                              whileInView="visible"
                              viewport={{ once: true, margin: "-20px" }}
                              whileHover={!isMobile ? { y: -2 } : {}}
                            >
                              <div className="project-header">
                                <div className="project-title-wrapper">
                                  <h5 className="project-title">
                                    {project.title}
                                  </h5>
                                  {project.link && (
                                    <a
                                      href={project.link}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="project-link"
                                      aria-label={`View ${project.title} project`}
                                    >
                                      <FiExternalLink />
                                    </a>
                                  )}
                                </div>

                                {/* Mobile-specific quick stats */}
                                {isMobile && project.impact && (
                                  <div className="project-mobile-stats">
                                    <span className="stat-badge">
                                      {project.impact}
                                    </span>
                                  </div>
                                )}
                              </div>

                              <p className="project-description">
                                {project.description}
                              </p>

                              {project.impact && !isMobile && (
                                <div className="project-impact">
                                  <span className="impact-label">Impact:</span>
                                  {project.impact}
                                </div>
                              )}

                              <div className="technologies">
                                {project.technologies.map((tech, tIndex) => (
                                  <span key={tIndex} className="tech-tag">
                                    {tech}
                                  </span>
                                ))}
                              </div>

                              {/* Mobile action button */}
                              {isMobile && project.link && (
                                <a
                                  href={project.link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="mobile-project-button"
                                >
                                  View Project
                                  <FiExternalLink />
                                </a>
                              )}
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Mobile instructions */}
        {isMobile && (
          <motion.div
            className="mobile-instructions"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <p>Tap on experience to view details</p>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Experience;
