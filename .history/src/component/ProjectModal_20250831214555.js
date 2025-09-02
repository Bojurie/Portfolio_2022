// ProjectModal.jsx
import React, { memo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiX,
  FiChevronLeft,
  FiChevronRight,
  FiPlay,
  FiExternalLink,
  FiGithub,
  FiImage,
} from "react-icons/fi";

const ProjectModal = memo(
  ({
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

      document.addEventListener("keydown", handleEscapeKey);
      document.addEventListener("mousedown", handleClickOutside);

      return () => {
        document.removeEventListener("keydown", handleEscapeKey);
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [closeProjectModal, modalRef]);

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
                          <div className="project-fallback">
                            <FiImage size={32} />
                            <span>{project.title}</span>
                          </div>
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
  }
);

export default ProjectModal;
