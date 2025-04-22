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
      "Led development of responsive web applications and implemented modern frontend architectures.",
    projects: [
      {
        title: "E-Commerce Platform",
        description:
          "Developed a full-featured e-commerce platform with React, Node.js, and MongoDB that increased client sales by 40%.",
        technologies: ["React", "Node.js", "MongoDB", "Stripe API"],
      },
      {
        title: "Corporate Dashboard",
        description:
          "Built an analytics dashboard with real-time data visualization for enterprise clients.",
        technologies: ["TypeScript", "D3.js", "Express", "PostgreSQL"],
      },
      {
        title: "CMS System",
        description:
          "Created a custom content management system used by 50+ content creators.",
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
      "Delivered high-quality web solutions to diverse clients across multiple industries.",
    projects: [
      {
        title: "Portfolio Website",
        description:
          "Designed and developed a responsive portfolio website for a graphic designer client.",
        technologies: ["HTML5", "CSS3", "JavaScript", "GSAP"],
      },
      {
        title: "Restaurant Booking System",
        description:
          "Implemented an online reservation system with table management features.",
        technologies: ["React", "Node.js", "MySQL"],
      },
      {
        title: "Fitness App",
        description:
          "Created a workout tracking application with progress visualization.",
        technologies: ["React Native", "Firebase"],
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
          <span className="highlight">04.</span> Professional Experience
        </motion.h2>

        <div className="experience-timeline">
          {experiences.map((exp, index) => (
            <motion.div
              className="experience-item"
              key={exp.id}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <div className="experience-header">
                <div className="experience-icon">
                  <FiBriefcase />
                </div>
                <div className="experience-meta">
                  <h3 className="experience-role">{exp.role}</h3>
                  <div className="experience-company">{exp.company}</div>
                  <div className="experience-details">
                    <span className="experience-detail">
                      <FiCalendar /> {exp.period}
                    </span>
                    <span className="experience-detail">
                      <FiGlobe /> {exp.location}
                    </span>
                  </div>
                </div>
              </div>

              <p className="experience-description">{exp.description}</p>

              <div className="experience-projects">
                <h4 className="projects-title">Key Projects:</h4>
                <div className="projects-grid">
                  {exp.projects.map((project, pIndex) => (
                    <motion.div
                      className="project-card"
                      key={pIndex}
                      whileHover={{ y: -5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="project-content">
                        <h5 className="project-title">
                          <FiCode /> {project.title}
                        </h5>
                        <p className="project-description">
                          {project.description}
                        </p>
                        <div className="project-technologies">
                          {project.technologies.map((tech, tIndex) => (
                            <span key={tIndex} className="technology-tag">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
