import React, {
  useState,
  useRef,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import ProjectCard from "../ProjectCard";
import ProjectFilter from "../ProjectFilter";
import ProjectModal from "../ProjectModal";
import { projects, categories, isIOS } from "./projectsData";
import "./project.scss";

const Project = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [showModal, setShowModal] = useState(false);
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
    return filteredProjects.slice(0, 6);
  }, [filteredProjects]);

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

  const handleViewMore = useCallback(() => {
    navigate("/projects/all", {
      state: {
        activeCategory,
        scrollToTop: true,
      },
    });
  }, [navigate, activeCategory]);

  // Handle opening modal
  const handleOpenModal = useCallback((index) => {
    setCurrentProjectIndex(index);
    setShowModal(true);
    document.body.style.overflow = "hidden";
  }, []);

  const closeProjectModal = useCallback(() => {
    setShowModal(false);
    setPlayingVideo(null);
    document.body.style.overflow = "auto";

    videoRefs.current.forEach((video) => {
      if (video && typeof video.pause === "function") {
        video.pause();
      }
    });
  }, []);

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
          onCategoryChange={setActiveCategory}
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

            {remainingProjects.length > 0 && (
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
          {showModal && (
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