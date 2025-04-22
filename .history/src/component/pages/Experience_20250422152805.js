import React from "react";
import { motion } from "framer-motion";
import { FiBriefcase, FiCode, FiGlobe, FiCpu, FiLayers } from "react-icons/fi";
import "./Experience.css";

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
      },
      {
        title: "Data Visualization Dashboard",
        description:
          "Created interactive dashboards with real-time analytics for financial data visualization.",
        technologies: ["TypeScript", "D3.js", "Express", "PostgreSQL"],
        impact: "Reduced data analysis time by 65%",
      },
      {
        title: "Content Management System",
        description:
          "Developed a custom CMS that reduced content publishing time by 60% for marketing teams.",
        technologies: ["Next.js", "Tailwind CSS", "Firebase"],
        impact: "Streamlined content workflow",
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
      },
      {
        title: "Restaurant Booking System",
        description:
          "Implemented reservation management with table availability tracking and SMS notifications.",
        technologies: ["React", "Node.js", "MySQL", "Twilio API"],
        impact: "Reduced no-shows by 30%",
      },
      {
        title: "Fitness Tracking App",
        description:
          "Built a mobile app for workout logging with progress charts and social sharing.",
        technologies: ["React Native", "Firebase", "Chart.js"],
        impact: "5K+ downloads in first month",
      },
    ],
  },
];

const Experience = () => {
  return (
    <section className="section experience" id="experience">
      <div className="container">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{
            duration: 0.8,
            ease: [0.16, 0.77, 0.47, 0.97],
          }}
        >
          <span className="highlight">03.</span> Professional Journey
        </motion.h2>

        <motion.div
          className="timeline"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          {experiences.map((exp, index) => (
            <motion.div
              className="timeline-item"
              key={exp.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.6,
                delay: index * 0.15,
                ease: [0.16, 0.77, 0.47, 0.97],
              }}
            >
              <div className="timeline-marker">
                <div className="timeline-dot" />
                <div className="timeline-line" />
              </div>

              <motion.div
                className="experience-card"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <div className="experience-header">
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
                </div>

                <p className="experience-description">{exp.description}</p>

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
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: pIndex * 0.1 }}
                        whileHover={{
                          y: -5,
                          boxShadow: "0 10px 30px rgba(58, 134, 255, 0.2)",
                        }}
                      >
                        <h5 className="project-title">{project.title}</h5>
                        <p className="project-description">
                          {project.description}
                        </p>

                        {project.impact && (
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
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;
