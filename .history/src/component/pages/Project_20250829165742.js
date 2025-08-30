import React, { useState, useRef, useEffect } from "react";
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
    video: null, // We'll handle videos differently for iOS
    title: "E-Commerce UI",
    category: "React",
    tags: ["React", "Redux", "Styled Components"],
    description:
      "A modern e-commerce platform with product filtering, cart functionality, and smooth animations.",
    links: { live: "#", code: "#" },
    videoUrl: "/videos/ecommerce-demo.mp4", // Reference to actual video file
  },
  {
    img: images[1] || null,
    video: null,
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
    video: null,
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
    video: null,
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
    video: null,
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
    video: null,
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
    video: null,
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
    video: null,
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
    video: null,
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

  const filteredProjects =
    activeCategory === "All"
      ? projects
      : projects.filter((project) => project.category === activeCategory);

  const displayProjects = filteredProjects.slice(0, 6);
  const remainingProjects = filteredProjects.slice(6);

  useEffect(() => {
    // Check device type
    const checkDevice = () => {
      setIsMobile(window.innerWidth <= 768);
      setIsIOSDevice(isIOS());
    };

    checkDevice();
    window.addEventListener("resize", checkDevice);

    // Preload images
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

    // For iOS, we'll handle videos differently
    const loadVideos = async () => {
      // On iOS, we don't preload videos due to restrictions
      if (isIOSDevice) {
        setVideosLoaded(true);
        return;
      }

      // For non-iOS devices, preload first few videos
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

    // Close modal on escape key press
    const handleEscapeKey = (e) => {
      if (e.key === "Escape") {
        closeProjectModal();
      }
    };

    // Close modal when clicking outside
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
      videoRefs.current = [];
      window.removeEventListener("resize", checkDevice);
      document.removeEventListener("keydown", handleEscapeKey);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [filteredProjects, showAllProjects]);

  const handleVideoPlay = (index, e) => {
    e.stopPropagation();

    if (isIOSDevice) {
      // On iOS, we need to handle video playback differently
      setPlayingVideo(index);

      // Play the video directly (iOS requires user interaction)
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
  };

  const handleVideoHover = (index, action) => {
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
  };

  const handleVideoError = (index) => {
    setHasVideoError((prev) => ({ ...prev, [index]: true }));
  };

  const openProjectModal = (index) => {
    setCurrentProjectIndex(index);
    setShowAllProjects(true);
    document.body.style.overflow = "hidden";
  };

  const closeProjectModal = () => {
    setShowAllProjects(false);
    setPlayingVideo(null);
    document.body.style.overflow = "auto";

    // Pause all videos when modal closes
    videoRefs.current.forEach((video) => {
      if (video && typeof video.pause === "function") {
        video.pause();
      }
    });
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

    // Reset playing video when navigating
    setPlayingVideo(null);
  };

  // Handle touch events for mobile swipe navigation
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 50) {
      // Left swipe
      navigateProject("next");
    }

    if (touchStart - touchEnd < -50) {
      // Right swipe
      navigateProject("prev");
    }
  };

  // Fallback image component
  const FallbackImage = ({ title }) => (
    <div className="project-fallback">
      <FiImage size={32} />
      <span>{title}</span>
    </div>
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
            {[...Array(6)].map((_, i) => (
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
                <motion.div
                  key={`${project.title}-${index}`}
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

                    {/* Video play button for iOS */}
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
                ref={modalRef}
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
                                    ref={(el) =>
                                      (videoRefs.current[index] = el)
                                    }
                                    controls
                                    playsInline
                                    poster={project.img}
                                    key={index}
                                    onError={() => handleVideoError(index)}
                                    className={
                                      isIOSDevice && playingVideo !== index
                                        ? "ios-video-hidden"
                                        : ""
                                    }
                                  >
                                    <source
                                      src={project.videoUrl}
                                      type="video/mp4"
                                    />
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
                                    // Show fallback
                                    const fallback =
                                      document.createElement("div");
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
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Project;
