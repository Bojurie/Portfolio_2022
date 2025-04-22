import React, { useState } from "react";
import { motion } from "framer-motion";
import { FiExternalLink, FiGithub } from "react-icons/fi";
import "./Project.css";

const projects = [
  {
    img: "1.png",
    video: "Screen Recording 2022-04-01 at 8.25.20 PM.mov",
    title: "E-Commerce UI",
    category: "React",
    tags: ["React", "Redux", "Styled Components"],
    description:
      "A modern e-commerce platform with product filtering, cart functionality, and smooth animations.",
    links: {
      live: "#",
      code: "#",
    },
  },
  {
    img: "2.png",
    video: "Screen Recording 2022-04-03 at 3.48.52 AM.mov",
    title: "Portfolio Website",
    category: "Next.js",
    tags: ["Next.js", "Framer Motion", "Tailwind CSS"],
    description:
      "A performant portfolio website with smooth page transitions and responsive design.",
    links: {
      live: "#",
      code: "#",
    },
  },
  {
    img: "3.png",
    video: "Screen Recording 2022-04-01 at 8.34.30 PM.mov",
    title: "Admin Dashboard",
    category: "React",
    tags: ["React", "Chart.js", "Material UI"],
    description:
      "Comprehensive admin dashboard with data visualization, user management, and analytics.",
    links: {
      live: "#",
      code: "#",
    },
  },
  {
    img: "4.png",
    video: "Screen Recording 2022-04-01 at 8.22.57 PM.mov",
    title: "News Platform",
    category: "MERN",
    tags: ["MongoDB", "Express", "React", "Node.js"],
    description:
      "Full-stack news aggregation platform with user authentication and content management.",
    links: {
      live: "#",
      code: "#",
    },
  },
  {
    img: "5.png",
    video: "Screen Recording 2022-04-01 at 8.28.35 PM.mov",
    title: "Social App",
    category: "MERN",
    tags: ["MERN Stack", "Socket.io", "JWT"],
    description:
      "Social media application with real-time updates, friend connections, and activity feeds.",
    links: {
      live: "#",
      code: "#",
    },
  },
  {
    img: "6.png",
    video: "Screen Recording 2022-04-01 at 8.30.37 PM.mov",
    title: "Booking System",
    category: "Full-Stack",
    tags: ["React", "Node.js", "PostgreSQL"],
    description:
      "Reservation management system with calendar integration and email notifications.",
    links: {
      live: "#",
      code: "#",
    },
  },
  {
    img: "7.png",
    video: "Screen Recording 2022-04-01 at 8.27.28 PM.mov",
    title: "Analytics Tool",
    category: "Node.js",
    tags: ["Node.js", "D3.js", "Express"],
    description:
      "Data analytics dashboard with custom visualization and report generation.",
    links: {
      live: "#",
      code: "#",
    },
  },
  {
    img: "8.png",
    video: "Screen Recording 2022-04-03 at 3.51.52 AM.mov",
    title: "Job Board",
    category: "Next.js",
    tags: ["Next.js", "TypeScript", "MongoDB"],
    description:
      "Job listing platform with search filters, applicant tracking, and employer dashboards.",
    links: {
      live: "#",
      code: "#",
    },
  },
  {
    img: "9.png",
    video: "Screen Recording 2022-04-01 at 8.23.25 PM.mov",
    title: "Product Preview",
    category: "Full-Stack",
    tags: ["React", "Node.js", "Stripe API"],
    description:
      "Interactive product showcase with 360° view, zoom functionality, and checkout process.",
    links: {
      live: "#",
      code: "#",
    },
  },
];

const categories = ["All", "React", "Next.js", "MERN", "Full-Stack", "Node.js"];

const Project = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);

  const filteredProjects =
    activeCategory === "All"
      ? projects
      : projects.filter((project) => project.category === activeCategory);

  const initialProjects = filteredProjects.slice(0, 5);
  const remainingProjects = filteredProjects.slice(5);

  const openProjectModal = (index) => {
    setCurrentProjectIndex(index);
    setShowAllProjects(true);
  };

  const navigateProject = (direction) => {
    if (direction === "prev") {
      setCurrentProjectIndex((prev) =>
        prev === 0 ? filteredProjects.length - 1 : prev - 1
      );
    } else {
      setCurrentProjectIndex((prev) =>
        prev === filteredProjects.length - 1 ? 0 : prev + 1
      );
    }
  };

  return (
    <section className="section projects" id="projects">
      <div className="container">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <span className="highlight">03.</span> My Projects
        </motion.h2>

        <motion.div
          className="project-tabs"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {categories.map((category) => (
            <motion.button
              key={category}
              className={`tab-button ${
                activeCategory === category ? "active" : ""
              }`}
              onClick={() => {
                setActiveCategory(category);
                setShowAllProjects(false);
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        <motion.div
          className="project-grid"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {initialProjects.map((project, index) => (
            <motion.div
              className="project-card"
              key={index}
              whileHover={{ y: -10 }}
              transition={{ duration: 0.3 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
            >
              <div className="project-media">
                <video
                  loop
                  muted
                  playsInline
                  preload="none"
                  poster={`/images/${project.img}`}
                  onMouseEnter={(e) => e.currentTarget.play()}
                  onMouseLeave={(e) => e.currentTarget.pause()}
                >
                  <source src={`/videos/${project.video}`} type="video/mp4" />
                </video>
                <div className="project-overlay">
                  <div className="project-overlay-content">
                    <p className="project-description">{project.description}</p>
                    <div className="project-links">
                      {project.links.live && (
                        <a
                          href={project.links.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="project-link"
                        >
                          <FiExternalLink /> Live Demo
                        </a>
                      )}
                      {project.links.code && (
                        <a
                          href={project.links.code}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="project-link"
                        >
                          <FiGithub /> View Code
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="project-info">
                <h3 className="project-title">{project.title}</h3>
                <div className="project-tags">
                  {project.tags.map((tag, i) => (
                    <span key={i} className="project-tag">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {filteredProjects.length > 5 && (
          <motion.div
            className="view-more-container"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <button
              className="view-more-btn"
              onClick={() => setShowAllProjects(true)}
            >
              View More Projects ({filteredProjects.length - 5}+)
            </button>
          </motion.div>
        )}

        <AnimatePresence>
          {showAllProjects && (
            <motion.div
              className="projects-modal"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div
                className="modal-overlay"
                onClick={() => setShowAllProjects(false)}
              />

              <motion.div
                className="modal-content"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 50, opacity: 0 }}
                transition={{ type: "spring", damping: 25 }}
              >
                <button
                  className="modal-close-btn"
                  onClick={() => setShowAllProjects(false)}
                >
                  <FiX />
                </button>

                <h3 className="modal-title">
                  {activeCategory === "All" ? "All" : activeCategory} Projects
                  <span className="project-count">
                    ({filteredProjects.length})
                  </span>
                </h3>

                <div className="modal-project-view">
                  <button
                    className="nav-arrow prev"
                    onClick={() => navigateProject("prev")}
                  >
                    <FiChevronLeft />
                  </button>

                  <div className="modal-project-container">
                    {filteredProjects.map((project, index) => (
                      <div
                        className={`modal-project ${
                          index === currentProjectIndex ? "active" : ""
                        }`}
                        key={index}
                      >
                        {index === currentProjectIndex && (
                          <>
                            <div className="modal-project-media">
                              <video
                                autoPlay
                                loop
                                muted
                                playsInline
                                controls
                                poster={`/images/${project.img}`}
                              >
                                <source
                                  src={`/videos/${project.video}`}
                                  type="video/mp4"
                                />
                              </video>
                            </div>
                            <div className="modal-project-info">
                              <h4>{project.title}</h4>
                              <div className="modal-project-tags">
                                {project.tags.map((tag, i) => (
                                  <span key={i}>{tag}</span>
                                ))}
                              </div>
                              <p className="modal-project-description">
                                {project.description}
                              </p>
                              <div className="modal-project-links">
                                {project.links.live && (
                                  <a
                                    href={project.links.live}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="modal-project-link"
                                  >
                                    <FiExternalLink /> Live Demo
                                  </a>
                                )}
                                {project.links.code && (
                                  <a
                                    href={project.links.code}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="modal-project-link"
                                  >
                                    <FiGithub /> View Code
                                  </a>
                                )}
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                    ))}
                  </div>

                  <button
                    className="nav-arrow next"
                    onClick={() => navigateProject("next")}
                  >
                    <FiChevronRight />
                  </button>
                </div>

                <div className="modal-projects-grid">
                  {filteredProjects.map((project, index) => (
                    <div
                      className={`modal-thumbnail ${
                        index === currentProjectIndex ? "active" : ""
                      }`}
                      key={index}
                      onClick={() => setCurrentProjectIndex(index)}
                    >
                      <img src={`/images/${project.img}`} alt={project.title} />
                      <div className="thumbnail-overlay">
                        <span>{project.title}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Project;