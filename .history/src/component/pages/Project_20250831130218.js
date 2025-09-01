import React, { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiExternalLink,
  FiGithub,
  FiX,
  FiChevronLeft,
  FiChevronRight,
  FiPlay,
  FiImage,
} from "react-icons/fi";
import "./project.scss";

// Project data - simplified and optimized
const projects = [
  {
    id: 1,
    title: "E-Commerce UI",
    category: "React",
    tags: ["React", "Redux", "Styled Components"],
    description:
      "A modern e-commerce platform with product filtering, cart functionality, and smooth animations.",
    links: { live: "#", code: "#" },
    image: "/api/placeholder/400/300",
  },
  {
    id: 2,
    title: "Portfolio Website",
    category: "Next.js",
    tags: ["Next.js", "Framer Motion", "Tailwind CSS"],
    description:
      "A performant portfolio website with smooth page transitions and responsive design.",
    links: { live: "#", code: "#" },
    image: "/api/placeholder/400/300",
  },
  {
    id: 3,
    title: "Admin Dashboard",
    category: "React",
    tags: ["React", "Chart.js", "Material UI"],
    description:
      "Comprehensive admin dashboard with data visualization, user management, and analytics.",
    links: { live: "#", code: "#" },
    image: "/api/placeholder/400/300",
  },
  {
    id: 4,
    title: "News Platform",
    category: "MERN",
    tags: ["MongoDB", "Express", "React", "Node.js"],
    description:
      "Full-stack news aggregation platform with user authentication and content management.",
    links: { live: "#", code: "#" },
    image: "/api/placeholder/400/300",
  },
  {
    id: 5,
    title: "Social App",
    category: "MERN",
    tags: ["MERN Stack", "Socket.io", "JWT"],
    description:
      "Social media application with real-time updates, friend connections, and activity feeds.",
    links: { live: "#", code: "#" },
    image: "/api/placeholder/400/300",
  },
  {
    id: 6,
    title: "Booking System",
    category: "Full-Stack",
    tags: ["React", "Node.js", "PostgreSQL"],
    description:
      "Reservation management system with calendar integration and email notifications.",
    links: { live: "#", code: "#" },
    image: "/api/placeholder/400/300",
  },
];

const categories = ["All", "React", "Next.js", "MERN", "Full-Stack", "Node.js"];

const Project = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const modalRef = useRef(null);

  // Memoized filtered projects
  const filteredProjects = React.useMemo(
    () =>
      activeCategory === "All"
        ? projects
        : projects.filter((project) => project.category === activeCategory),
    [activeCategory]
  );

  // Check device type
  useEffect(() => {
    const checkDevice = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkDevice();
    window.addEventListener("resize", checkDevice);

    return () => window.removeEventListener("resize", checkDevice);
  }, []);

  // Close modal on escape key
  useEffect(() => {
    const handleEscapeKey = (e) => {
      if (e.key === "Escape") {
        closeModal();
      }
    };

    if (showModal) {
      document.addEventListener("keydown", handleEscapeKey);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
      document.body.style.overflow = "auto";
    };
  }, [showModal]);

  // Optimized handlers
  const openModal = useCallback((index) => {
    setCurrentProjectIndex(index);
    setShowModal(true);
  }, []);

  const closeModal = useCallback(() => {
    setShowModal(false);
  }, []);

  const navigateProject = useCallback(
    (direction) => {
      setCurrentProjectIndex((prev) => {
        const lastIndex = filteredProjects.length - 1;
        return direction === "prev"
          ? prev === 0
            ? lastIndex
            : prev - 1
          : prev === lastIndex
          ? 0
          : prev + 1;
      });
    },
    [filteredProjects.length]
  );

  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = (e) => {
    const touchEnd = e.changedTouches[0].clientX;
    if (touchStart - touchEnd > 50) navigateProject("next");
    if (touchStart - touchEnd < -50) navigateProject("prev");
  };

  const currentProject = filteredProjects[currentProjectIndex];

  return (
    <section className="section projects" id="projects">
      <div className="container">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
        >
          <span className="highlight">04.</span> My Projects
        </motion.h2>

        <motion.div
          className="project-tabs"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          {categories.map((category) => (
            <button
              key={category}
              className={`tab-button ${
                activeCategory === category ? "active" : ""
              }`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </motion.div>

        <motion.div
          className="project-grid"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              className="project-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              whileHover={!isMobile ? { y: -5 } : {}}
              onClick={() => openModal(index)}
            >
              <div className="project-media">
                <div className="project-image">
                  <img
                    src={project.image}
                    alt={project.title}
                    loading="lazy"
                    onError={(e) => {
                      e.target.style.display = "none";
                      e.target.nextSibling.style.display = "flex";
                    }}
                  />
                  <div className="image-fallback">
                    <FiImage size={32} />
                    <span>{project.title}</span>
                  </div>
                </div>

                <div className="project-overlay">
                  <div className="overlay-content">
                    <p className="project-description">{project.description}</p>
                    <div className="project-links">
                      <a
                        href={project.links.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-link"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <FiExternalLink /> Live Demo
                      </a>
                      <a
                        href={project.links.code}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-link"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <FiGithub /> View Code
                      </a>
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

        <AnimatePresence>
          {showModal && currentProject && (
            <motion.div
              className="projects-modal"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeModal}
            >
              <motion.div
                className="modal-content"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                onClick={(e) => e.stopPropagation()}
                ref={modalRef}
              >
                <button className="modal-close" onClick={closeModal}>
                  <FiX />
                </button>

                <div className="modal-header">
                  <h3>{currentProject.title}</h3>
                  <div className="modal-tags">
                    {currentProject.tags.map((tag, i) => (
                      <span key={i}>{tag}</span>
                    ))}
                  </div>
                </div>

                <div className="modal-body">
                  <div className="modal-image">
                    <img
                      src={currentProject.image}
                      alt={currentProject.title}
                      onError={(e) => {
                        e.target.style.display = "none";
                        e.target.nextSibling.style.display = "flex";
                      }}
                    />
                    <div className="image-fallback">
                      <FiImage size={48} />
                      <span>{currentProject.title}</span>
                    </div>
                  </div>

                  <div className="modal-details">
                    <p className="modal-description">
                      {currentProject.description}
                    </p>

                    <div className="modal-links">
                      <a
                        href={currentProject.links.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="modal-link primary"
                      >
                        <FiExternalLink /> View Live Demo
                      </a>
                      <a
                        href={currentProject.links.code}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="modal-link secondary"
                      >
                        <FiGithub /> View Source Code
                      </a>
                    </div>
                  </div>
                </div>

                <div className="modal-navigation">
                  <button
                    className="nav-button"
                    onClick={() => navigateProject("prev")}
                    aria-label="Previous project"
                  >
                    <FiChevronLeft />
                  </button>

                  <div className="nav-indicator">
                    {currentProjectIndex + 1} / {filteredProjects.length}
                  </div>

                  <button
                    className="nav-button"
                    onClick={() => navigateProject("next")}
                    aria-label="Next project"
                  >
                    <FiChevronRight />
                  </button>
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
