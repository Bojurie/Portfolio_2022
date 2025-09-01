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

// Fallback image component
const FallbackImage = ({ title, className = "" }) => (
  <div className={`project-fallback ${className}`}>
    <FiImage size={32} />
    <span>{title}</span>
  </div>
);

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

// Check if device is mobile
const isMobileDevice = () => {
  return (
    window.innerWidth <= 768 ||
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    )
  );
};

const Project = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
  const [loadedImages, setLoadedImages] = useState({});
  const [isMobile, setIsMobile] = useState(false);
  const [isIOSDevice, setIsIOSDevice] = useState(false);
  const [hasVideoError, setHasVideoError] = useState({});
  const [playingVideo, setPlayingVideo] = useState(null);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const videoRefs = useRef([]);
  const modalRef = useRef(null);

  // Project data with proper media handling
  const projects = [
    {
      id: 1,
      title: "E-Commerce Platform",
      category: "React",
      tags: ["React", "Redux", "Styled Components", "Node.js"],
      description:
        "A modern e-commerce platform with product filtering, cart functionality, and smooth animations. Built with React and integrated with a Node.js backend for seamless user experience.",
      links: {
        live: "https://ecommerce-demo.example.com",
        code: "https://github.com/Bojurie/ecommerce-platform",
      },
      media: {
        type: "image",
        src: "/images/projects/ecommerce.jpg",
        alt: "E-Commerce Platform Screenshot",
      },
    },
    {
      id: 2,
      title: "Portfolio Website",
      category: "Next.js",
      tags: ["Next.js", "Framer Motion", "Tailwind CSS", "TypeScript"],
      description:
        "A performant portfolio website with smooth page transitions and responsive design. Built with Next.js for optimal SEO and performance.",
      links: {
        live: "https://portfolio.example.com",
        code: "https://github.com/Bojurie/portfolio",
      },
      media: {
        type: "image",
        src: "/images/projects/portfolio.jpg",
        alt: "Portfolio Website Screenshot",
      },
    },
    {
      id: 3,
      title: "Admin Dashboard",
      category: "React",
      tags: ["React", "Chart.js", "Material UI", "REST API"],
      description:
        "Comprehensive admin dashboard with data visualization, user management, and analytics. Features real-time data updates and interactive charts.",
      links: {
        live: "https://dashboard.example.com",
        code: "https://github.com/Bojurie/admin-dashboard",
      },
      media: {
        type: "image",
        src: "/images/projects/dashboard.jpg",
        alt: "Admin Dashboard Screenshot",
      },
    },
    {
      id: 4,
      title: "News Platform",
      category: "MERN",
      tags: ["MongoDB", "Express", "React", "Node.js", "JWT"],
      description:
        "Full-stack news aggregation platform with user authentication and content management. Includes real-time updates and social features.",
      links: {
        live: "https://news-platform.example.com",
        code: "https://github.com/Bojurie/news-platform",
      },
      media: {
        type: "image",
        src: "/images/projects/news-platform.jpg",
        alt: "News Platform Screenshot",
      },
    },
    {
      id: 5,
      title: "Social App",
      category: "MERN",
      tags: ["MERN Stack", "Socket.io", "JWT", "Cloudinary"],
      description:
        "Social media application with real-time updates, friend connections, and activity feeds. Features file uploads and instant messaging.",
      links: {
        live: "https://social-app.example.com",
        code: "https://github.com/Bojurie/social-app",
      },
      media: {
        type: "image",
        src: "/images/projects/social-app.jpg",
        alt: "Social App Screenshot",
      },
    },
    {
      id: 6,
      title: "Booking System",
      category: "Full-Stack",
      tags: ["React", "Node.js", "PostgreSQL", "Stripe"],
      description:
        "Reservation management system with calendar integration and email notifications. Includes payment processing and booking confirmation.",
      links: {
        live: "https://booking.example.com",
        code: "https://github.com/Bojurie/booking-system",
      },
      media: {
        type: "image",
        src: "/images/projects/booking-system.jpg",
        alt: "Booking System Screenshot",
      },
    },
  ];

  const categories = ["All", "React", "Next.js", "MERN", "Full-Stack"];

  const filteredProjects =
    activeCategory === "All"
      ? projects
      : projects.filter((project) => project.category === activeCategory);

  useEffect(() => {
    const checkDevice = () => {
      setIsMobile(isMobileDevice());
      setIsIOSDevice(isIOS());
    };

    checkDevice();
    window.addEventListener("resize", checkDevice);

    // Preload images
    const loadImages = async () => {
      const loadPromises = projects.map((project, index) => {
        return new Promise((resolve) => {
          if (project.media.type !== "image") {
            resolve();
            return;
          }

          const img = new Image();
          img.src = project.media.src;
          img.onload = () => {
            setLoadedImages((prev) => ({ ...prev, [index]: true }));
            resolve();
          };
          img.onerror = () => {
            console.warn(`Failed to load image for project ${project.title}`);
            resolve();
          };
        });
      });

      await Promise.all(loadPromises);
    };

    loadImages();

    // Event listeners for modal
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
      window.removeEventListener("resize", checkDevice);
      document.removeEventListener("keydown", handleEscapeKey);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showAllProjects]);

  const handleVideoPlay = (index, e) => {
    e?.stopPropagation();
    setPlayingVideo(index);

    const video = videoRefs.current[index];
    if (video) {
      video.play().catch((err) => {
        console.warn("Video play failed:", err);
        setHasVideoError((prev) => ({ ...prev, [index]: true }));
      });
    }
  };

  const handleVideoPause = (index) => {
    const video = videoRefs.current[index];
    if (video) {
      video.pause();
    }
    setPlayingVideo(null);
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

    // Pause all videos
    videoRefs.current.forEach((video) => {
      if (video) video.pause();
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
    setPlayingVideo(null);
  };

  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 50) navigateProject("next");
    if (touchStart - touchEnd < -50) navigateProject("prev");
  };

  const ProjectMedia = ({ project, index, inModal = false }) => {
    if (project.media.type === "video") {
      return (
        <div className="project-video-container">
          <video
            ref={(el) => (videoRefs.current[index] = el)}
            controls={inModal || playingVideo === index}
            playsInline
            poster={project.media.poster}
            onEnded={() => setPlayingVideo(null)}
            onError={() =>
              setHasVideoError((prev) => ({ ...prev, [index]: true }))
            }
          >
            <source src={project.media.src} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          {(!inModal || (isIOSDevice && playingVideo !== index)) && (
            <button
              className="play-button"
              onClick={(e) => handleVideoPlay(index, e)}
              aria-label="Play video"
            >
              <FiPlay size={24} />
            </button>
          )}
        </div>
      );
    }

    // Image media
    return (
      <img
        src={project.media.src}
        alt={project.media.alt}
        loading="lazy"
        onError={(e) => {
          e.target.style.display = "none";
          const fallback = e.target.nextSibling;
          if (fallback) fallback.style.display = "flex";
        }}
      />
    );
  };

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
              onClick={() => setActiveCategory(category)}
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
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              className="project-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={!isMobile ? { y: -10 } : {}}
              onClick={() => openProjectModal(index)}
            >
              <div className="project-media">
                <ProjectMedia project={project} index={index} />
                <div
                  className="project-image-fallback"
                  style={{ display: "none" }}
                >
                  <FallbackImage title={project.title} />
                </div>

                <div className="project-overlay">
                  <div className="project-overlay-content">
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
                    {filteredProjects.map((project, index) => (
                      <div
                        className={`modal-project ${
                          index === currentProjectIndex ? "active" : ""
                        }`}
                        key={project.id}
                      >
                        {index === currentProjectIndex && (
                          <>
                            <div className="modal-project-media">
                              <ProjectMedia
                                project={project}
                                index={index}
                                inModal={true}
                              />
                              <div
                                className="project-image-fallback"
                                style={{ display: "none" }}
                              >
                                <FallbackImage title={project.title} />
                              </div>
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
                                <a
                                  href={project.links.live}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="modal-project-link"
                                >
                                  <FiExternalLink /> Live Demo
                                </a>
                                <a
                                  href={project.links.code}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="modal-project-link"
                                >
                                  <FiGithub /> View Code
                                </a>
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
                      key={project.id}
                      onClick={() => setCurrentProjectIndex(index)}
                    >
                      {project.media.type === "image" ? (
                        <img
                          src={project.media.src}
                          alt={project.media.alt}
                          loading="lazy"
                          onError={(e) => {
                            e.target.style.display = "none";
                            const fallback = e.target.nextSibling;
                            if (fallback) fallback.style.display = "flex";
                          }}
                        />
                      ) : (
                        <img
                          src={project.media.poster}
                          alt={project.media.alt}
                          loading="lazy"
                        />
                      )}
                      <div
                        className="thumbnail-fallback"
                        style={{ display: "none" }}
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
