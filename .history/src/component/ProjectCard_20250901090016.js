// ProjectCard.jsx (Fixed)
import React, { memo } from "react";
import { motion } from "framer-motion";
import { FiExternalLink, FiGithub, FiImage, FiPlay } from "react-icons/fi";

const FallbackImage = memo(({ title }) => (
  <div className="project-fallback">
    <FiImage size={32} />
    <span>{title}</span>
  </div>
));

const ProjectCard = memo(
  ({
    project,
    index,
    onOpenModal,
    isIOSDevice,
    onVideoPlay,
    variant = "grid",
  }) => {
    const isListView = variant === "list";
    const hasVideo = project.videoSources && project.videoSources.length > 0;

    return (
      <motion.div
        className="project-card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        whileHover={!isListView ? { y: -10 } : {}}
        onClick={!isListView ? () => onOpenModal(index) : undefined}
        layout
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

          {isIOSDevice && hasVideo && !isListView && (
            <button
              className="ios-play-button"
              onClick={(e) => onVideoPlay(index, e)}
              aria-label="Play video"
            >
              <FiPlay size={24} />
            </button>
          )}

          {!isListView && (
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
          )}
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

          {isListView && (
            <div className="project-actions">
              {project.links.live && (
                <a
                  href={project.links.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-link"
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
                >
                  <FiGithub /> View Code
                </a>
              )}
              <button
                className="view-details-btn"
                onClick={() => onOpenModal(index)}
              >
                View Details
              </button>
            </div>
          )}
        </div>
      </motion.div>
    );
  }
);

export default ProjectCard;
