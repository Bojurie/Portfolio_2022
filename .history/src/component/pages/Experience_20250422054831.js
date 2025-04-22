import React from "react";
import { motion } from "framer-motion";
import { FiBriefcase, FiCode, FiGlobe, FiCalendar } from "react-icons/fi";
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
      },
      {
        title: "Data Visualization Dashboard",
        description:
          "Created interactive dashboards with real-time analytics for financial data visualization.",
        technologies: ["TypeScript", "D3.js", "Express", "PostgreSQL"],
      },
      {
        title: "Content Management System",
        description:
          "Developed a custom CMS that reduced content publishing time by 60% for marketing teams.",
        technologies: ["Next.js", "Tailwind CSS", "Firebase"],
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
      },
      {
        title: "Restaurant Booking System",
        description:
          "Implemented reservation management with table availability tracking and SMS notifications.",
        technologies: ["React", "Node.js", "MySQL", "Twilio API"],
      },
      {
        title: "Fitness Tracking App",
        description:
          "Built a mobile app for workout logging with progress charts and social sharing.",
        technologies: ["React Native", "Firebase", "Chart.js"],
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
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <span className="highlight">03.</span> Professional Experience
        </motion.h2>

        <motion.div
          className="experience-container"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {experiences.map((exp, index) => (
            <motion.div
              className="experience-card"
              key={exp.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              whileHover={{ y: -5 }}
            >
              <div className="experience-header">
                <div className="experience-icon-container">
                  <FiBriefcase className="experience-icon" />
                </div>
                <div className="experience-info">
                  <h3 className="experience-role">{exp.role}</h3>
                  <div className="experience-company-period">
                    <span className="experience-company">{exp.company}</span>
                    <span className="experience-period">{exp.period}</span>
                  </div>
                  <div className="experience-location">
                    <FiGlobe className="location-icon" />
                    {exp.location}
                  </div>
                </div>
              </div>

              <p className="experience-description">{exp.description}</p>

              <div className="projects-section">
                <h4 className="projects-heading">
                  <FiCode className="projects-icon" />
                  Key Projects
                </h4>
                <div className="projects-grid">
                  {exp.projects.map((project, pIndex) => (
                    <motion.div
                      className="project-card"
                      key={pIndex}
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.2 }}
                    >
                      <h5 className="project-title">{project.title}</h5>
                      <p className="project-description">
                        {project.description}
                      </p>
                      <div className="technologies-container">
                        {project.technologies.map((tech, tIndex) => (
                          <span key={tIndex} className="technology-tag">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;
