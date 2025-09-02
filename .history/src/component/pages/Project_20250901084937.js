// src/component/pages/Project.js
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
import { getProjects, categories, isIOS } from "../projectsData"; // ✅ use getter
import "./project.scss";

const Project = () => {
  const [projectList, setProjectList] = useState([]); // ✅ local list
  const [activeCategory, setActiveCategory] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
  const [loadedImages, setLoadedImages] = useState({});
  const [videosLoaded, setVideosLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isIOSDevice, setIsIOSDevice] = useState(false);
  const [hasVideoError, setHasVideoError] = useState({});
  const [playingVideo, setPlayingVideo] = useState(null);

  // NOTE: videoRefs is used by hover/tap play and by the modal.
  // Your ProjectCard/Modal should set these refs when rendering <video>.
  const videoRefs = useRef([]);
  const modalRef = useRef(null);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const navigate = useNavigate();

  // Load projects + device flags
  useEffect(() => {
    const checkDevice = () => {
      setIsMobile(window.innerWidth <= 768);
      setIsIOSDevice(isIOS());
    };
    checkDevice();
    window.addEventListener("resize", checkDevice);

    // Lazy load data (prevents TDZ/HMR issues)
    setProjectList(getProjects());

    return () => window.removeEventListener("resize", checkDevice);
  }, []);

  // Derived lists
  const filteredProjects = useMemo(() => {
    return activeCategory === "All"
      ? projectList
      : projectList.filter((p) => p.category === activeCategory);
  }, [activeCategory, projectList]);

  const displayProjects = useMemo(
    () => filteredProjects.slice(0, 6),
    [filteredProjects]
  );
  const remainingProjects = useMemo(
    () => filteredProjects.slice(6),
    [filteredProjects]
  );

  // Preload media (images + a few videos for faster UX)
  useEffect(() => {
    if (!projectList.length) return;

    const loadImages = async () => {
      const promises = projectList.map((project, index) => {
        return new Promise((resolve) => {
          if (!project?.img) return resolve();
          const image = new Image();
          image.src = project.img;
          image.onload = () => {
            setLoadedImages((prev) => ({ ...prev, [index]: true }));
            resolve();
          };
          image.onerror = () => resolve();
        });
      });
      await Promise.all(promises);
    };

    const loadVideos = async () => {
      // On iOS, autoplay is restricted; mark loaded to avoid blocking UI skeleton
      if (isIOSDevice) {
        setVideosLoaded(true);
        return;
      }

      // Preload first 3 videos (if any)
      const preloadTargets = projectList.slice(0, 3);
      const promises = preloadTargets.map((project) => {
        const firstSrc = project?.videoSources?.[0]?.src;
        if (!firstSrc) return Promise.resolve();
        return new Promise((resolve) => {
          const video = document.createElement("video");
          video.src = firstSrc;
          video.preload = "metadata";
          video.onloadeddata = resolve;
          video.onerror = resolve;
        });
      });

      try {
        await Promise.all(promises);
      } finally {
        setVideosLoaded(true);
      }
    };

    loadImages();
    loadVideos();
  }, [projectList, isIOSDevice]);

  // Video handlers
  const handleVideoPlay = useCallback(
    (index, e) => {
      e?.stopPropagation();

      if (isIOSDevice) {
        setPlayingVideo(index);
        const video = videoRefs.current[index];
        if (video) {
          video
            .play()
            .catch(() =>
              setHasVideoError((prev) => ({ ...prev, [index]: true }))
            );
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
          video.play().catch(() => {
            setHasVideoError((prev) => ({ ...prev, [index]: true }));
          });
        } else {
          video.pause();
          video.currentTime = 0;
        }
      } catch {
        setHasVideoError((prev) => ({ ...prev, [index]: true }));
      }
    },
    [isMobile, isIOSDevice, hasVideoError]
  );

  const handleVideoError = useCallback((index) => {
    setHasVideoError((prev) => ({ ...prev, [index]: true }));
  }, []);

  // Modal navigation
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

  // Touch handlers (mobile swipe)
  const handleTouchStart = useCallback(
    (e) => setTouchStart(e.targetTouches[0].clientX),
    []
  );
  const handleTouchMove = useCallback(
    (e) => setTouchEnd(e.targetTouches[0].clientX),
    []
  );
  const handleTouchEnd = useCallback(() => {
    if (touchStart - touchEnd > 50) navigateProject("next");
    else if (touchStart - touchEnd < -50) navigateProject("prev");
  }, [touchStart, touchEnd, navigateProject]);

  // Category
  const handleCategoryChange = useCallback((category) => {
    setActiveCategory(category);
    setCurrentProjectIndex(0);
  }, []);

  // View more → full page
  const handleViewMore = useCallback(() => {
    navigate("/projects/all", {
      state: { activeCategory, scrollToTop: true },
    });
  }, [navigate, activeCategory]);

  // Modal open/close
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
      if (video && typeof video.pause === "function") video.pause();
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
          onCategoryChange={handleCategoryChange}
        />

        {!videosLoaded ? (
          <div className="loading-grid">
            {[...Array(Math.min(6, filteredProjects.length || 6))].map(
              (_, i) => (
                <div key={i} className="project-skeleton" />
              )
            )}
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
                  // If your ProjectCard exposes a way to supply a ref:
                  // onVideoRef={(el) => (videoRefs.current[index] = el)}
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
