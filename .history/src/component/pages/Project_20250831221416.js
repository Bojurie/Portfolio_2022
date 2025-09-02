// Project.jsx (Fixed Main Component)
import React, {
  useState,
  useRef,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiPlay, FiImage } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import ProjectCard from "../ProjectCard";
import ProjectFilter from "../ProjectFilter";
import ProjectModal from "../ProjectModal";
import ProjectsPage from "./ProjectsPage";
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
    id: 1,
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
    id: 2,
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
    id: 3,
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
    id: 4,
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
    id: 5,
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
    id: 6,
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
    id: 7,
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
    id: 8,
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
    id: 9,
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

  const navigate = useNavigate();

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

  useEffect(() => {
    const checkDevice = () => {
      setIsMobile(window.innerWidth <= 768);
      setIsIOSDevice(isIOS());
    };

    checkDevice();
    window.addEventListener("resize", checkDevice);

    return () => window.removeEventListener("resize", checkDevice);
  }, []);

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

  // Video handlers
  const handleVideoPlay = useCallback(
    (index, e) => {
      e?.stopPropagation();

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
    setCurrentProjectIndex(0);
  }, []);

  // Handle view more projects - navigate to dedicated page
  const handleViewMore = useCallback(() => {
    navigate("/projects/all", {
      state: {
        activeCategory,
        scrollToTop: true,
      },
    });
  }, [navigate, activeCategory]);

  // Handle opening modal or navigating based on context
  const handleOpenModal = useCallback(
    (index) => {
      if (window.location.pathname === "/projects/all") {
        setCurrentProjectIndex(index);
        setShowAllProjects(true);
        document.body.style.overflow = "hidden";
      } else {
        // If we're on the main projects page, navigate to full page first
        navigate("/projects/all", {
          state: {
            activeCategory,
            openModalIndex: index,
          },
        });
      }
    },
    [navigate, activeCategory]
  );

  // Check if we need to open modal from navigation state
  useEffect(() => {
    if (window.location.pathname === "/projects/all") {
      const state = window.history.state?.usr || {};
      if (state.openModalIndex !== undefined) {
        setCurrentProjectIndex(state.openModalIndex);
        setShowAllProjects(true);
        document.body.style.overflow = "hidden";
      }

      if (state.activeCategory) {
        setActiveCategory(state.activeCategory);
      }
    }
  }, []);

  // If we're on the dedicated projects page, render the full page component
  if (window.location.pathname === "/projects/all") {
    return (
      <ProjectsPage
        projects={projects}
        categories={categories}
        activeCategory={activeCategory}
        onCategoryChange={handleCategoryChange}
        onOpenModal={handleOpenModal}
        isIOSDevice={isIOSDevice}
        onVideoPlay={handleVideoPlay}
        onClose={() => navigate("/projects")}
      />
    );
  }

  // Otherwise render the main projects section
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

        <ProjectFilter
          categories={categories}
          activeCategory={activeCategory}
          onCategoryChange={handleCategoryChange}
        />

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
                  key={`${project.id}-${index}`}
                  project={project}
                  index={index}
                  onOpenModal={handleOpenModal}
                  isIOSDevice={isIOSDevice}
                  onVideoPlay={handleVideoPlay}
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
                <button className="view-more-btn" onClick={handleViewMore}>
                  View More Projects ({remainingProjects.length}+)
                </button>
              </motion.div>
            )}
          </>
        )}

        <AnimatePresence>
          {showAllProjects && (
            <ProjectModal
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

export default Project;
