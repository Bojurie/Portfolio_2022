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

// Video imports
const videos = Array(9)
  .fill()
  .map((_, i) =>
    require(`../videos/Screen Recording 2022-04-0${i < 8 ? i + 1 : 9} at ${
      i < 4 ? "8" : "3"
    }.${
      i < 3
        ? "22"
        : i < 5
        ? "25"
        : i < 6
        ? "27"
        : i < 7
        ? "28"
        : i < 8
        ? "30"
        : "48"
    }.${
      i < 2
        ? "57"
        : i < 3
        ? "20"
        : i < 4
        ? "25"
        : i < 5
        ? "28"
        : i < 6
        ? "35"
        : i < 7
        ? "37"
        : i < 8
        ? "30"
        : "52"
    }.mov`)
  );

// Image imports
const images = Array(9)
  .fill()
  .map((_, i) => require(`../images/${i + 1}.png`));

const projects = [
  {
    img: images[0],
    video: videos[0],
    title: "E-Commerce UI",
    category: "React",
    tags: ["React", "Redux", "Styled Components"],
    description:
      "A modern e-commerce platform with product filtering, cart functionality, and smooth animations.",
    links: { live: "#", code: "#" },
  },
  {
    img: images[1],
    video: videos[1],
    title: "Portfolio Website",
    category: "Next.js",
    tags: ["Next.js", "Framer Motion", "Tailwind CSS"],
    description:
      "A performant portfolio website with smooth page transitions and responsive design.",
    links: { live: "#", code: "#" },
  },
  {
    img: images[2],
    video: videos[2],
    title: "Admin Dashboard",
    category: "React",
    tags: ["React", "Chart.js", "Material UI"],
    description:
      "Comprehensive admin dashboard with data visualization, user management, and analytics.",
    links: { live: "#", code: "#" },
  },
  {
    img: images[3],
    video: videos[3],
    title: "News Platform",
    category: "MERN",
    tags: ["MongoDB", "Express", "React", "Node.js"],
    description:
      "Full-stack news aggregation platform with user authentication and content management.",
    links: { live: "#", code: "#" },
  },
  {
    img: images[4],
    video: videos[4],
    title: "Social App",
    category: "MERN",
    tags: ["MERN Stack", "Socket.io", "JWT"],
    description:
      "Social media application with real-time updates, friend connections, and activity feeds.",
    links: { live: "#", code: "#" },
  },
  {
    img: images[5],
    video: videos[5],
    title: "Booking System",
    category: "Full-Stack",
    tags: ["React", "Node.js", "PostgreSQL"],
    description:
      "Reservation management system with calendar integration and email notifications.",
    links: { live: "#", code: "#" },
  },
  {
    img: images[6],
    video: videos[6],
    title: "Analytics Tool",
    category: "Node.js",
    tags: ["Node.js", "D3.js", "Express"],
    description:
      "Data analytics dashboard with custom visualization and report generation.",
    links: { live: "#", code: "#" },
  },
  {
    img: images[7],
    video: videos[7],
    title: "Job Board",
    category: "Next.js",
    tags: ["Next.js", "TypeScript", "MongoDB"],
    description:
      "Job listing platform with search filters, applicant tracking, and employer dashboards.",
    links: { live: "#", code: "#" },
  },
  {
    img: images[8],
    video: videos[8],
    title: "Product Preview",
    category: "Full-Stack",
    tags: ["React", "Node.js", "Stripe API"],
    description:
      "Interactive product showcase with 360° view, zoom functionality, and checkout process.",
    links: { live: "#", code: "#" },
  },
];

const categories = ["All", "React", "Next.js", "MERN", "Full-Stack", "Node.js"];

const Project = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
  const [loadedImages, setLoadedImages] = useState({});
  const [videosLoaded, setVideosLoaded] = useState(false);
  const videoRefs = useRef([]);

  const filteredProjects =
    activeCategory === "All"
      ? projects
      : projects.filter((project) => project.category === activeCategory);

  const initialProjects = filteredProjects.slice(0, 5);
  const remainingProjects = filteredProjects.slice(5);

  useEffect(() => {
    // Preload images
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

    // Preload first 3 videos
    const loadVideos = async () => {
      const videoLoadPromises = filteredProjects.slice(0, 3).map((project) => {
        return new Promise((resolve) => {
          const video = document.createElement("video");
          video.src = project.video;
          video.preload = "auto";
          video.onloadeddata = resolve;
        });
      });
      await Promise.all(videoLoadPromises);
      setVideosLoaded(true);
    };

    loadImages();
    loadVideos();

    return () => {
      videoRefs.current = [];
    };
  }, [filteredProjects]);

  const handleVideoHover = (index, action) => {
    const video = videoRefs.current[index];
    if (!video) return;

    if (action === "enter") {
      video.play().catch((e) => console.log("Autoplay prevented:", e));
    } else {
      video.pause();
      video.currentTime = 0;
    }
  };

  const openProjectModal = (index) => {
    setCurrentProjectIndex(index);
    setShowAllProjects(true);
    document.body.style.overflow = "hidden";
  };

  const closeProjectModal = () => {
    setShowAllProjects(false);
    document.body.style.overflow = "auto";
  };

  const navigateProject = (direction) => {
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
  };

  return (
    <section className="section projects" id="projects">
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

        {!videosLoaded ? (
          <div className="loading-grid">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="project-skeleton" />
            ))}
          </div>
        ) : (
          <>
            <motion.div
              className="project-grid"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              {initialProjects.map((project, index) => (
                <motion.div
                  key={index}
                  className="project-card"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -10 }}
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
                    </video>
                    <div className="project-overlay">
                      <div className="project-overlay-content">
                        <p className="project-description">
                          {project.description}
                        </p>
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

            {remainingProjects.length > 0 && (
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
                  View More Projects ({remainingProjects.length}+)
                </button>
              </motion.div>
            )}
          </>
        )}

        <AnimatePresence>
          {showAllProjects && (
            <motion.div
              className="projects-modal"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="modal-overlay" onClick={closeProjectModal} />

              <motion.div
                className="modal-content"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 50, opacity: 0 }}
                transition={{ type: "spring", damping: 25 }}
              >
                <button className="modal-close-btn" onClick={closeProjectModal}>
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
                                key={index}
                              >
                                <source src={project.video} type="video/mp4" />
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
