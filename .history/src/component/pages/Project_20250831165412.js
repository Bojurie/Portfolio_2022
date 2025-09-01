import React, {
  useState,
  useRef,
  useEffect,
  useMemo,
  useCallback,
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

// Import all images with error handling
const importAll = (r) => {
  return r.keys().map(r);
};

// Try to import images with fallback
let images = [];
try {
  images = importAll(
    require.context("../images", false, /\.(png|jpe?g|svg|webp)$/)
  );
} catch (error) {
  console.warn("Images not found, using fallback:", error);
  // Create fallback image array
  images = Array(9).fill(null);
}

// Create project data with proper iOS-compatible video handling
const projects = [
  {
    img: images[0] || null,
    title: "E-Commerce UI",
    category: "React",
    tags: ["React", "Redux", "Styled Components"],
    description:
      "A modern e-commerce platform with product filtering, cart functionality, and smooth animations.",
    links: { live: "#", code: "#" },
    videoUrl: "/videos/ecommerce-demo.mp4",
  },
  {
    img: images[1] || null,
    title: "Portfolio Website",
    category: "Next.js",
    tags: ["Next.js", "Framer Motion", "Tailwind CSS"],
    description:
      "A performant portfolio website with smooth page transitions and responsive design.",
    links: { live: "#", code: "#" },
    videoUrl: "/videos/portfolio-demo.mp4",
  },
  {
    img: images[2] || null,
    title: "Admin Dashboard",
    category: "React",
    tags: ["React", "Chart.js", "Material UI"],
    description:
      "Comprehensive admin dashboard with data visualization, user management, and analytics.",
    links: { live: "#", code: "#" },
    videoUrl: "/videos/dashboard-demo.mp4",
  },
  {
    img: images[3] || null,
    title: "News Platform",
    category: "MERN",
    tags: ["MongoDB", "Express", "React", "Node.js"],
    description:
      "Full-stack news aggregation platform with user authentication and content management.",
    links: { live: "#", code: "#" },
    videoUrl: "/videos/news-demo.mp4",
  },
  {
    img: images[4] || null,
    title: "Social App",
    category: "MERN",
    tags: ["MERN Stack", "Socket.io", "JWT"],
    description:
      "Social media application with real-time updates, friend connections, and activity feeds.",
    links: { live: "#", code: "#" },
    videoUrl: "/videos/social-demo.mp4",
  },
  {
    img: images[5] || null,
    title: "Booking System",
    category: "Full-Stack",
    tags: ["React", "Node.js", "PostgreSQL"],
    description:
      "Reservation management system with calendar integration and email notifications.",
    links: { live: "#", code: "#" },
    videoUrl: "/videos/booking-demo.mp4",
  },
  {
    img: images[6] || null,
    title: "Analytics Tool",
    category: "Node.js",
    tags: ["Node.js", "D3.js", "Express"],
    description:
      "Data analytics dashboard with custom visualization and report generation.",
    links: { live: "#", code: "#" },
    videoUrl: "/videos/analytics-demo.mp4",
  },
  {
    img: images[7] || null,
    title: "Job Board",
    category: "Next.js",
    tags: ["Next.js", "TypeScript", "MongoDB"],
    description:
      "Job listing platform with search filters, applicant tracking, and employer dashboards.",
    links: { live: "#", code: "#" },
    videoUrl: "/videos/jobboard-demo.mp4",
  },
  {
    img: images[8] || null,
    title: "Product Preview",
    category: "Full-Stack",
    tags: ["React", "Node.js", "Stripe API"],
    description:
      "Interactive product showcase with 360° view, zoom functionality, and checkout process.",
    links: { live: "#", code: "#" },
    videoUrl: "/videos/product-demo.mp4",
  },
];

const categories = ["All", "React", "Next.js", "MERN", "Full-Stack", "Node.js"];

// Check if device is iOS
const isIOS = () => {
  return (
    [
      "iPad Simulator",
      "iPhone Simulator",
      "iPod Simulator",
      "iPad",
      "iPhone",
      "iPod",
    ].includes(navigator.platform) ||
    (navigator.userAgent.includes("Mac") && "ontouchend" in document)
  );
};

// Fallback image component
const FallbackImage = ({ title }) => (
  <div className="project-fallback">
    <FiImage size={32} />
    <span>{title}</span>
  </div>
);

const Project = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
  const [loadedImages, setLoadedImages] = useState({});
  const [videosLoaded, setVideosLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isIOSDevice, setIsIOSDevice] = useState(false);
  const [hasVideoError, setHasVideoError] = useState({});
  const [playingVideo, setPlayingVideo] = useState(null);
  const videoRefs = useRef([]);
  const modalRef = useRef(null);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  // Memoized filtered projects for better performance
  const filteredProjects = useMemo(() => {
    return activeCategory === "All"
      ? projects
      : projects.filter((project) => project.category === activeCategory);
  }, [activeCategory]);

  const displayProjects = useMemo(() => {
    return showAllProjects ? filteredProjects : filteredProjects.slice(0, 6);
  }, [showAllProjects, filteredProjects]);

  const remainingProjects = useMemo(() => {
    return filteredProjects.slice(6);
  }, [filteredProjects]);

  // Device detection and setup
  useEffect(() => {
    const checkDevice = () => {
      setIsMobile(window.innerWidth <= 768);
      setIsIOSDevice(isIOS());
    };

    checkDevice();
    window.addEventListener("resize", checkDevice);

    return () => window.removeEventListener("resize", checkDevice);
  }, []);

  // Image and video preloading
  useEffect(() => {
    const loadImages = async () => {
      const imageLoadPromises = projects.map((project, index) => {
        return new Promise((resolve) => {
          if (!project.img) {
            resolve();
            return;
          }

          const image = new Image();
          image.src = project.img;
          image.onload = () => {
            setLoadedImages((prev) => ({ ...prev, [index]: true }));
            resolve();
          };
          image.onerror = () => {
            console.warn(`Failed to load image for project ${index}`);
            resolve();
          };
        });
      });

      await Promise.all(imageLoadPromises);
    };

    const loadVideos = async () => {
      if (isIOSDevice) {
        setVideosLoaded(true);
        return;
      }

      const videoLoadPromises = projects.slice(0, 3).map((project, index) => {
        return new Promise((resolve) => {
          if (!project.videoUrl) {
            resolve();
            return;
          }

          const video = document.createElement("video");
          video.src = project.videoUrl;
          video.preload = "metadata";
          video.onloadeddata = resolve;
          video.onerror = resolve;
        });
      });

      try {
        await Promise.all(videoLoadPromises);
        setVideosLoaded(true);
      } catch (error) {
        console.warn("Video preloading failed:", error);
        setVideosLoaded(true);
      }
    };

    loadImages();
    loadVideos();
  }, [isIOSDevice]);

  // Modal event handlers
  useEffect(() => {
    const handleEscapeKey = (e) => {
      if (e.key === "Escape") {
        closeProjectModal();
      }
    };

    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        closeProjectModal();
      }
    };

    if (showAllProjects) {
      document.addEventListener("keydown", handleEscapeKey);
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showAllProjects]);

  // Video handlers
  const handleVideoPlay = useCallback(
    (index, e) => {
      e.stopPropagation();

      if (isIOSDevice) {
        setPlayingVideo(index);
        const video = videoRefs.current[index];
        if (video) {
          video.play().catch((err) => {
            console.warn("Video play failed:", err);
            setHasVideoError((prev) => ({ ...prev, [index]: true }));
          });
        }
      } else {
        handleVideoHover(index, "enter");
      }
    },
    [isIOSDevice]
  );

  const handleVideoHover = useCallback(
    (index, action) => {
      if (isMobile || isIOSDevice) return;

      const video = videoRefs.current[index];
      if (!video || hasVideoError[index]) return;

      try {
        if (action === "enter") {
          video.play().catch((e) => {
            console.log("Autoplay prevented:", e);
            setHasVideoError((prev) => ({ ...prev, [index]: true }));
          });
        } else {
          video.pause();
          video.currentTime = 0;
        }
      } catch (error) {
        console.warn("Video control error:", error);
        setHasVideoError((prev) => ({ ...prev, [index]: true }));
      }
    },
    [isMobile, isIOSDevice, hasVideoError]
  );

  const handleVideoError = useCallback((index) => {
    setHasVideoError((prev) => ({ ...prev, [index]: true }));
  }, []);

  // Modal handlers
  const openProjectModal = useCallback((index) => {
    setCurrentProjectIndex(index);
    setShowAllProjects(true);
    document.body.style.overflow = "hidden";
  }, []);

  const closeProjectModal = useCallback(() => {
    setShowAllProjects(false);
    setPlayingVideo(null);
    document.body.style.overflow = "auto";

    videoRefs.current.forEach((video) => {
      if (video && typeof video.pause === "function") {
        video.pause();
      }
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

  // Touch handlers for mobile swipe
  const handleTouchStart = useCallback((e) => {
    setTouchStart(e.targetTouches[0].clientX);
  }, []);

  const handleTouchMove = useCallback((e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  }, []);

  const handleTouchEnd = useCallback(() => {
    if (touchStart - touchEnd > 50) {
      navigateProject("next");
    } else if (touchStart - touchEnd < -50) {
      navigateProject("prev");
    }
  }, [touchStart, touchEnd, navigateProject]);

  // Category filter handler
  const handleCategoryChange = useCallback((category) => {
    setActiveCategory(category);
    setShowAllProjects(false);
    setCurrentProjectIndex(0);
  }, []);

  // Project card component
  const ProjectCard = useCallback(
    ({ project, index }) => (
      <motion.div
        className="project-card"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        whileHover={!isMobile ? { y: -10 } : {}}
        onClick={() => openProjectModal(index)}
      >
        <div className="project-media">
          {project.img ? (
            <>
              <img
                src={project.img}
                alt={project.title}
                loading="lazy"
                onError={(e) => {
                  e.target.style.display = "none";
                  e.target.nextSibling.style.display = "flex";
                }}
              />
              <div
                className="project-image-fallback"
                style={{ display: "none" }}
              >
                <FallbackImage title={project.title} />
              </div>
            </>
          ) : (
            <FallbackImage title={project.title} />
          )}

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
    ),
    [isMobile, isIOSDevice, handleVideoPlay, openProjectModal]
  );

  return (
    <section className="section projects" id="projects">
      <div className="container">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 0.77, 0.47, 0.97] }}
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
              onClick={() => handleCategoryChange(category)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        {!videosLoaded ? (
          <div className="loading-grid">
            {[...Array(Math.min(6, filteredProjects.length))].map((_, i) => (
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
              {displayProjects.map((project, index) => (
                <ProjectCard
                  key={`${project.title}-${index}`}
                  project={project}
                  index={index}
                />
              ))}
            </motion.div>

            {!showAllProjects && remainingProjects.length > 0 && (
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
            <ProjectsModal
              activeCategory={activeCategory}
              filteredProjects={filteredProjects}
              currentProjectIndex={currentProjectIndex}
              navigateProject={navigateProject}
              handleTouchStart={handleTouchStart}
              handleTouchMove={handleTouchMove}
              handleTouchEnd={handleTouchEnd}
              handleVideoPlay={handleVideoPlay}
              handleVideoError={handleVideoError}
              setCurrentProjectIndex={setCurrentProjectIndex}
              closeProjectModal={closeProjectModal}
              isIOSDevice={isIOSDevice}
              playingVideo={playingVideo}
              hasVideoError={hasVideoError}
              videoRefs={videoRefs}
              modalRef={modalRef}
            />
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

// Separate modal component for better organization
const ProjectsModal = ({
  activeCategory,
  filteredProjects,
  currentProjectIndex,
  navigateProject,
  handleTouchStart,
  handleTouchMove,
  handleTouchEnd,
  handleVideoPlay,
  handleVideoError,
  setCurrentProjectIndex,
  closeProjectModal,
  isIOSDevice,
  playingVideo,
  hasVideoError,
  videoRefs,
  modalRef,
}) => {
  const currentProject = filteredProjects[currentProjectIndex];

  return (
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
            <span className="project-count">({filteredProjects.length})</span>
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
                      {project.videoUrl && !hasVideoError[index] ? (
                        <>
                          <video
                            ref={(el) => (videoRefs.current[index] = el)}
                            controls
                            playsInline
                            poster={project.img}
                            onError={() => handleVideoError(index)}
                            className={
                              isIOSDevice && playingVideo !== index
                                ? "ios-video-hidden"
                                : ""
                            }
                          >
                            <source src={project.videoUrl} type="video/mp4" />
                            Your browser does not support the video tag.
                          </video>

                          {isIOSDevice && playingVideo !== index && (
                            <div
                              className="ios-video-preview"
                              onClick={(e) => handleVideoPlay(index, e)}
                            >
                              <img
                                src={project.img}
                                alt={project.title}
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
                      ) : project.img ? (
                        <img
                          src={project.img}
                          alt={project.title}
                          onError={(e) => {
                            e.target.style.display = "none";
                            const fallback = document.createElement("div");
                            fallback.className = "project-fallback";
                            fallback.innerHTML = `<FiImage size={32} /><span>${project.title}</span>`;
                            e.target.parentNode.appendChild(fallback);
                          }}
                        />
                      ) : (
                        <FallbackImage title={project.title} />
                      )}
                    </div>
                    <div className="modal-project-info">
                      <div className="modal-project-header">
                        <h4>{project.title}</h4>
                        <div className="modal-project-tags">
                          {project.tags.map((tag, i) => (
                            <span key={i}>{tag}</span>
                          ))}
                        </div>
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
            aria-label="Next project"
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
  );
};

export default Project;
