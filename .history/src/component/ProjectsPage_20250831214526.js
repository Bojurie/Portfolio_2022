// ProjectsPage.jsx
import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import ProjectCard from "./ProjectCard";
import ProjectFilter from "./ProjectFilter";

const ProjectsPage = ({
  projects,
  categories,
  activeCategory,
  onCategoryChange,
  onOpenModal,
  isIOSDevice,
  onVideoPlay,
}) => {
  const filteredProjects = useMemo(() => {
    return activeCategory === "All"
      ? projects
      : projects.filter((project) => project.category === activeCategory);
  }, [activeCategory, projects]);

  return (
    <div className="projects-page">
      <div className="container">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 0.77, 0.47, 0.97] }}
        >
          <span className="highlight">All</span> Projects
        </motion.h2>

        <ProjectFilter
          categories={categories}
          activeCategory={activeCategory}
          onCategoryChange={onCategoryChange}
        />

        <motion.div
          className="project-grid"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {filteredProjects.map((project, index) => (
            <ProjectCard
              key={`${project.title}-${index}`}
              project={project}
              index={index}
              onOpenModal={onOpenModal}
              isIOSDevice={isIOSDevice}
              onVideoPlay={onVideoPlay}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default ProjectsPage;
