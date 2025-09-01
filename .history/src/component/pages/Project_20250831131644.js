import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  useMemo,
} from "react";
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

// Static project data - remove dynamic image loading for production
const projects = [
  {
    img: "/images/project-1.jpg",
    title: "E-Commerce UI",
    category: "React",
    tags: ["React", "Redux", "Styled Components"],
    description:
      "A modern e-commerce platform with product filtering, cart functionality, and smooth animations.",
    links: { live: "#", code: "#" },
    videoUrl: "/videos/ecommerce-demo.mp4",
  },
  {
    img: "/images/project-2.jpg",
    title: "Portfolio Website",
    category: "Next.js",
    tags: ["Next.js", "Framer Motion", "Tailwind CSS"],
    description:
      "A performant portfolio website with smooth page transitions and responsive design.",
    links: { live: "#", code: "#" },
    videoUrl: "/videos/portfolio-demo.mp4",
  },
  {
    img: "/images/project-3.jpg",
    title: "Admin Dashboard",
    category: "React",
    tags: ["React", "Chart.js", "Material UI"],
    description:
      "Comprehensive admin dashboard with data visualization, user management, and analytics.",
    links: { live: "#", code: "#" },
    videoUrl: "/videos/dashboard-demo.mp4",
  },
  {
    img: "/images/project-4.jpg",
    title: "News Platform",
    category: "MERN",
    tags: ["MongoDB", "Express", "React", "Node.js"],
    description:
      "Full-stack news aggregation platform with user authentication and content management.",
    links: { live: "#", code: "#" },
    videoUrl: "/videos/news-demo.mp4",
  },
  {
    img: "/images/project-5.jpg",
    title: "Social App",
    category: "MERN",
    tags: ["MERN Stack", "Socket.io", "JWT"],
    description:
      "Social media application with real-time updates, friend connections, and activity feeds.",
    links: { live: "#", code: "#" },
    videoUrl: "/videos/social-demo.mp4",
  },
  {
    img: "/images/project-6.jpg",
    title: "Booking System",
    category: "Full-Stack",
    tags: ["React", "Node.js", "PostgreSQL"],
    description:
      "Reservation management system with calendar integration and email notifications.",
    links: { live: "#", code: "#" },
    videoUrl: "/videos/booking-demo.mp4",
  },
];

const categories = ["All", "React", "Next.js", "MERN", "Full-Stack", "Node.js"];

// Check if device is iOS
const isIOS = () => {
  return (
    /iPad|iPhone|iPod/.test(navigator.userAgent) ||
    (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1)
  );
};

const Project = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isIOSDevice, setIsIOSDevice] = useState(false);
  const [hasVideoError, setHasVideoError] = useState({});
  const [playingVideo, setPlayingVideo] = useState(null);

  const videoRefs = useRef([]);
  const modalRef = useRef(null);
  const touchStartRef = useRef(0);
  const touchEndRef = useRef(0);

  // Memoized filtered projects
  const filteredProjects = useMemo(
    () =>
      activeCategory === "All"
        ? projects
        : projects.filter((project) => project.category === activeCategory),
    [activeCategory]
  );

  const displayProjects = useMemo(
    () => filteredProjects.slice(0, 6),
    [filteredProjects]
  );
  const remainingProjects = useMemo(
    () => filteredProjects.slice(6),
    [filteredProjects]
  );

  // Device detection
  useEffect(() => {
    const checkDevice = () => {
      setIsMobile(window.innerWidth <= 768);
      setIsIOSDevice(isIOS());
    };

    checkDevice();
    const resizeHandler = () => checkDevice();
    window.addEventListener("resize", resizeHandler);

    return () => window.removeEventListener("resize", resizeHandler);
  }, []);

  // Modal event handlers
  useEffect(() => {
    if (!showAllProjects) return;

    const handleEscapeKey = (e) => {
      if (e.key === "Escape") closeProjectModal();
    };

    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        closeProjectModal();
      }
    };

    document.addEventListener("keydown", handleEscapeKey);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showAllProjects]);

  const handleVideoPlay = useCallback(
    (index, e) => {
      e.stopPropagation();

      if (isIOSDevice) {
        setPlayingVideo(index);
        const video = videoRefs.current[index];
        if (video) {
          video.play().catch((err) => {
            setHasVideoError((prev) => ({ ...prev, [index]: true }));
          });
        }
      }
    },
    [isIOSDevice]
  );

  const handleVideoError = useCallback((index) => {
    setHasVideoError((prev) => ({ ...prev, [index]: true }));
  }, []);

  const openProjectModal = useCallback((index) => {
    setCurrentProjectIndex(index);
    setShowAllProjects(true);
    document.body.style.overflow = "hidden";
  }, []);

  const closeProjectModal = useCallback(() => {
    setShowAllProjects(false);
    setPlayingVideo(null);
    document.body.style.overflow = "auto";

    // Pause all videos
    videoRefs.current.forEach((video) => {
      if (video?.pause) video.pause();
    });
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
      setPlayingVideo(null);
    },
    [filteredProjects.length]
  );

  // Touch handlers with refs for better performance
  const handleTouchStart = useCallback((e) => {
    touchStartRef.current = e.targetTouches[0].clientX;
  }, []);

  const handleTouchMove = useCallback((e) => {
    touchEndRef.current = e.targetTouches[0].clientX;
  }, []);

  const handleTouchEnd = useCallback(() => {
    const diff = touchStartRef.current - touchEndRef.current;
    if (Math.abs(diff) > 50) {
      navigateProject(diff > 0 ? "next" : "prev");
    }
  }, [navigateProject]);

  const FallbackImage = useCallback(
    ({ title }) => (
      <div className="project-fallback">
        <FiImage size={32} />
        <span>{title}</span>
      </div>
    ),
    []
  );

  const currentProject = filteredProjects[currentProjectIndex];

  return (
    <section className="section projects" id="projects">
      <div className="container">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
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
          {displayProjects.map((project, index) => (
            <motion.div
              key={project.title}
              className="project-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={!isMobile ? { y: -4 } : {}}
              onClick={() => openProjectModal(index)}
            >
              <div className="project-media">
                {project.img ? (
                  <img
                    src={project.img}
                    alt={project.title}
                    loading="lazy"
                    onError={(e) => {
                      e.target.style.display = "none";
                      const fallback = e.target.nextSibling;
                      if (fallback) fallback.style.display = "flex";
                    }}
                  />
                ) : null}
                <div
                  className="project-image-fallback"
                  style={{ display: project.img ? "none" : "flex" }}
                >
                  <FallbackImage title={project.title} />
                </div>

                {isIOSDevice && project.videoUrl && (
                  <button
                    className="ios-play-button"
                    onClick={(e) => handleVideoPlay(index, e)}
                    aria-label="Play video"
                  >
                    <FiPlay size={24} />
                  </button>
                )}

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

        <AnimatePresence>
          {showAllProjects && currentProject && (
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
                ref={modalRef}
              >
                <button className="modal-close-btn" onClick={closeProjectModal}>
                  <FiX />
                </button>

                <div className="modal-header">
                  <h3 className="modal-title">
                    {activeCategory === "All" ? "All" : activeCategory} Projects
                    <span className="project-count">
                      ({filteredProjects.length})
                    </span>
                  </h3>
                </div>

                <div className="modal-project-view">
                  <button
                    className="nav-arrow prev"
                    onClick={() => navigateProject("prev")}
                    aria-label="Previous project"
                  >
                    <FiChevronLeft />
                  </button>

                  <div
                    className="modal-project-container"
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                  >
                    <div className="modal-project active">
                      <div className="modal-project-media">
                        {currentProject.videoUrl &&
                        !hasVideoError[currentProjectIndex] ? (
                          <>
                            <video
                              ref={(el) =>
                                (videoRefs.current[currentProjectIndex] = el)
                              }
                              controls
                              playsInline
                              poster={currentProject.img}
                              onError={() =>
                                handleVideoError(currentProjectIndex)
                              }
                              className={
                                isIOSDevice &&
                                playingVideo !== currentProjectIndex
                                  ? "ios-video-hidden"
                                  : ""
                              }
                            >
                              <source
                                src={currentProject.videoUrl}
                                type="video/mp4"
                              />
                              Your browser does not support the video tag.
                            </video>

                            {isIOSDevice &&
                              playingVideo !== currentProjectIndex && (
                                <div
                                  className="ios-video-preview"
                                  onClick={(e) =>
                                    handleVideoPlay(currentProjectIndex, e)
                                  }
                                >
                                  <img
                                    src={currentProject.img}
                                    alt={currentProject.title}
                                    onError={(e) => {
                                      e.target.style.display = "none";
                                    }}
                                  />
                                  <button className="ios-play-button-large">
                                    <FiPlay size={32} />
                                    <span>Play Video</span>
                                  </button>
                                </div>
                              )}
                          </>
                        ) : currentProject.img ? (
                          <img
                            src={currentProject.img}
                            alt={currentProject.title}
                            onError={(e) => {
                              e.target.style.display = "none";
                              const fallback = document.createElement("div");
                              fallback.className = "project-fallback";
                              fallback.innerHTML = `<FiImage size={32} /><span>${currentProject.title}</span>`;
                              e.target.parentNode.appendChild(fallback);
                            }}
                          />
                        ) : (
                          <FallbackImage title={currentProject.title} />
                        )}
                      </div>
                      <div className="modal-project-info">
                        <div className="modal-project-header">
                          <h4>{currentProject.title}</h4>
                          <div className="modal-project-tags">
                            {currentProject.tags.map((tag, i) => (
                              <span key={i}>{tag}</span>
                            ))}
                          </div>
                        </div>
                        <p className="modal-project-description">
                          {currentProject.description}
                        </p>
                        <div className="modal-project-links">
                          {currentProject.links.live && (
                            <a
                              href={currentProject.links.live}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="modal-project-link"
                            >
                              <FiExternalLink /> Live Demo
                            </a>
                          )}
                          {currentProject.links.code && (
                            <a
                              href={currentProject.links.code}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="modal-project-link"
                            >
                              <FiGithub /> View Code
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <button
                    className="nav-arrow next"
                    onClick={() => navigateProject("next")}
                    aria-label="Next project"
                  >
                    <FiChevronRight />
                  </button>
                </div>

                <div className="modal-projects-grid">
                  {filteredProjects.map((project, index) => (
                    <div
                      key={project.title}
                      className={`modal-thumbnail ${
                        index === currentProjectIndex ? "active" : ""
                      }`}
                      onClick={() => setCurrentProjectIndex(index)}
                    >
                      {project.img ? (
                        <img
                          src={project.img}
                          alt={project.title}
                          loading="lazy"
                          onError={(e) => {
                            e.target.style.display = "none";
                            const fallback = e.target.nextSibling;
                            if (fallback) fallback.style.display = "flex";
                          }}
                        />
                      ) : null}
                      <div
                        className="thumbnail-fallback"
                        style={{ display: project.img ? "none" : "flex" }}
                      >
                        <FiImage size={16} />
                      </div>
                      <div className="thumbnail-overlay">
                        <span>{project.title}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mobile-nav-dots">
                  {filteredProjects.map((_, index) => (
                    <button
                      key={index}
                      className={`nav-dot ${
                        index === currentProjectIndex ? "active" : ""
                      }`}
                      onClick={() => setCurrentProjectIndex(index)}
                      aria-label={`View project ${index + 1}`}
                    />
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
