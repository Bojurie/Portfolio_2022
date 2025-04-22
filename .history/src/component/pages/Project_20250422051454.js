import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiExternalLink,
  FiGithub,
  FiX,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";
import "./Project.css";

// Import all videos with require()
const videos = [
  require("../videos/Screen Recording 2022-04-01 at 8.22.57 PM.mov"),
  require("../videos/Screen Recording 2022-04-01 at 8.23.25 PM.mov"),
  require("../videos/Screen Recording 2022-04-01 at 8.25.20 PM.mov"),
  require("../videos/Screen Recording 2022-04-01 at 8.27.28 PM.mov"),
  require("../videos/Screen Recording 2022-04-01 at 8.28.35 PM.mov"),
  require("../videos/Screen Recording 2022-04-01 at 8.30.37 PM.mov"),
  require("../videos/Screen Recording 2022-04-01 at 8.34.30 PM.mov"),
  require("../videos/Screen Recording 2022-04-03 at 3.51.52 AM.mov"),
  require("../videos/Screen Recording 2022-04-03 at 3.48.52 AM.mov"),
];

// Import all images with require()
const images = [
  require("../images/1.png"),
  require("../images/2.png"),
  require("../images/3.png"),
  require("../images/4.png"),
  require("../images/5.png"),
  require("../images/6.png"),
  require("../images/7.png"),
  require("../images/8.png"),
  require("../images/9.png"),
];

const projects = [
  {
    img: images[0],
    video: videos[0],
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
    img: images[1],
    video: videos[1],
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
    img: images[2],
    video: videos[2],
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
    img: images[3],
    video: videos[3],
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
    img: images[4],
    video: videos[4],
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
    img: images[5],
    video: videos[5],
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
    img: images[6],
    video: videos[6],
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
    img: images[7],
    video: videos[7],
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
    img: images[8],
    video: videos[8],
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
  const [loadedImages, setLoadedImages] = useState({});
  const videoRefs = useRef([]);

  const filteredProjects =
    activeCategory === "All"
      ? projects
      : projects.filter((project) => project.category === activeCategory);

  const initialProjects = filteredProjects.slice(0, 5);
  const remainingProjects = filteredProjects.slice(5);

  useEffect(() => {
    // Preload images for better performance
    const loadImages = async () => {
      const imageLoadPromises = images.map((img, index) => {
        return new Promise((resolve) => {
          const image = new Image();
          image.src = img;
          image.onload = () => {
            setLoadedImages((prev) => ({ ...prev, [index]: true }));
            resolve();
          };
        });
      });
      await Promise.all(imageLoadPromises);
    };
    loadImages();
  }, []);

  const handleVideoHover = (index, action) => {
    const video = videoRefs.current[index];
    if (!video) return;

    if (action === "enter") {
      video.play().catch((e) => console.log("Video play error:", e));
    } else {
      video.pause();
      video.currentTime = 0;
    }
  };

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
          <span className="highlight">04.</span> My Projects
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
              onClick={() => openProjectModal(index)}
            >
              <div className="project-media">
                <video
                  ref={(el) => (videoRefs.current[index] = el)}
                  loop
                  muted
                  playsInline
                  preload="metadata"
                  poster={project.img}
                  onMouseEnter={() => handleVideoHover(index, "enter")}
                  onMouseLeave={() => handleVideoHover(index, "leave")}
                >
                  <source src={project.video} type="video/mp4" />
                  Your browser does not support the video tag.
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
                          onClick={(e) => e.stopPropagation()}
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
                          onClick={(e) => e.stopPropagation()}
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
                                controls
                                loop
                                muted
                                playsInline
                                poster={project.img}
                                key={index} // Force re-render when project changes
                              >
                                <source src={project.video} type="video/mp4" />
                                Your browser does not support the video tag.
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
                      <img
                        src={project.img}
                        alt={project.title}
                        className={loadedImages[index] ? "loaded" : ""}
                        loading="lazy"
                      />
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
