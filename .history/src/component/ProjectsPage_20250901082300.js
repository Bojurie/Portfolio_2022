import React, { useState, useMemo, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import {
  FiX,
  FiFilter,
  FiGrid,
  FiList,
  FiChevronDown,
  FiSearch,
} from "react-icons/fi";
import ProjectCard from "./ProjectCard";
import ProjectFilter from "./ProjectFilter";
import { projects, categories, isIOS } from "./projectsData";
import "./ProjectsPage.scss";

const ProjectsPage = () => {
  const [viewMode, setViewMode] = useState("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("default");
  const [showFilters, setShowFilters] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");
  const [isIOSDevice, setIsIOSDevice] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 100);
    setIsIOSDevice(isIOS());

    // Check for category from navigation state
    if (location.state?.activeCategory) {
      setActiveCategory(location.state.activeCategory);
    }

    return () => clearTimeout(timer);
  }, [location.state]);

  // Filter and sort projects
  const filteredAndSortedProjects = useMemo(() => {
    let filtered =
      activeCategory === "All"
        ? projects
        : projects.filter((project) => project.category === activeCategory);

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (project) =>
          project.title.toLowerCase().includes(query) ||
          project.description.toLowerCase().includes(query) ||
          project.tags.some((tag) => tag.toLowerCase().includes(query))
      );
    }

    // Apply sorting
    switch (sortBy) {
      case "name-asc":
        return [...filtered].sort((a, b) => a.title.localeCompare(b.title));
      case "name-desc":
        return [...filtered].sort((a, b) => b.title.localeCompare(a.title));
      case "newest":
        return [...filtered].reverse();
      default:
        return filtered;
    }
  }, [activeCategory, searchQuery, sortBy]);

  const handleSearchChange = useCallback((e) => {
    setSearchQuery(e.target.value);
  }, []);

  const clearSearch = useCallback(() => {
    setSearchQuery("");
  }, []);

  const toggleViewMode = useCallback(() => {
    setViewMode((prev) => (prev === "grid" ? "list" : "grid"));
  }, []);

  const toggleFilters = useCallback(() => {
    setShowFilters((prev) => !prev);
  }, []);

  const handleCategoryChange = useCallback((category) => {
    setActiveCategory(category);
    setSearchQuery("");
  }, []);

  const handleOpenModal = useCallback((index) => {
    // For modal functionality in ProjectsPage
    console.log("Open modal for project:", index);
    // You can implement modal here or navigate to a modal route
  }, []);

  const handleVideoPlay = useCallback((index, e) => {
    e?.stopPropagation();
    // Video play implementation
  }, []);

  const handleClose = useCallback(() => {
    navigate("/projects");
  }, [navigate]);

  const handleClearFilters = useCallback(() => {
    setSearchQuery("");
    setActiveCategory("All");
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.div
      className="projects-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.projectHeader
        className="projects-header"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="container">
          <div className="header-content">
            <button className="back-button" onClick={handleClose}>
              <FiX size={24} />
            </button>
            <h1 className="page-title">
              <span className="highlight">All</span> Projects
              <span className="project-count">
                ({filteredAndSortedProjects.length})
              </span>
            </h1>
            <div className="header-actions">
              <button
                className={`view-toggle ${viewMode}`}
                onClick={toggleViewMode}
                aria-label={`Switch to ${
                  viewMode === "grid" ? "list" : "grid"
                } view`}
              >
                {viewMode === "grid" ? (
                  <FiList size={20} />
                ) : (
                  <FiGrid size={20} />
                )}
              </button>
            </div>
          </div>
        </div>
      </motion.projectHeader>

      {/* Search and Filters */}
      <motion.div
        className="projects-controls"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <div className="container">
          <div className="controls-grid">
            {/* Search Bar */}
            <div className="search-container">
              <FiSearch className="search-icon" size={18} />
              <input
                type="text"
                placeholder="Search projects..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="search-input"
              />
              {searchQuery && (
                <button className="clear-search" onClick={clearSearch}>
                  <FiX size={16} />
                </button>
              )}
            </div>

            {/* Sort Dropdown */}
            <div className="sort-container">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="sort-select"
              >
                <option value="default">Sort by: Default</option>
                <option value="name-asc">Sort by: Name (A-Z)</option>
                <option value="name-desc">Sort by: Name (Z-A)</option>
                <option value="newest">Sort by: Newest</option>
              </select>
              <FiChevronDown className="select-arrow" size={16} />
            </div>

            {/* Mobile Filter Toggle */}
            <button
              className={`filter-toggle ${showFilters ? "active" : ""}`}
              onClick={toggleFilters}
            >
              <FiFilter size={18} />
              Filters
            </button>
          </div>

          {/* Category Filters */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                className="mobile-filters"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <ProjectFilter
                  categories={categories}
                  activeCategory={activeCategory}
                  onCategoryChange={handleCategoryChange}
                  variant="mobile"
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Desktop Category Filters */}
      <motion.div
        className="desktop-filters"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="container">
          <ProjectFilter
            categories={categories}
            activeCategory={activeCategory}
            onCategoryChange={handleCategoryChange}
            variant="desktop"
          />
        </div>
      </motion.div>

      {/* Projects Grid/List */}
      <motion.div
        className="container"
        variants={containerVariants}
        initial="hidden"
        animate={loaded ? "visible" : "hidden"}
      >
        {filteredAndSortedProjects.length === 0 ? (
          <motion.div className="no-projects" variants={itemVariants}>
            <div className="no-projects-content">
              <FiSearch size={48} className="no-projects-icon" />
              <h3>No projects found</h3>
              <p>Try adjusting your search or filter criteria</p>
              {(searchQuery || activeCategory !== "All") && (
                <button
                  className="clear-filters-btn"
                  onClick={handleClearFilters}
                >
                  Clear all filters
                </button>
              )}
            </div>
          </motion.div>
        ) : (
          <motion.div
            className={`projects-display ${viewMode}`}
            variants={containerVariants}
          >
            {filteredAndSortedProjects.map((project, index) => (
              <motion.div
                key={`${project.id}-${index}`}
                variants={itemVariants}
                className="project-item"
              >
                <ProjectCard
                  project={project}
                  index={index}
                  onOpenModal={handleOpenModal}
                  isIOSDevice={isIOSDevice}
                  onVideoPlay={handleVideoPlay}
                  variant={viewMode}
                />
              </motion.div>
            ))}
          </motion.div>
        )}

        <motion.div className="results-info" variants={itemVariants}>
          <p>
            Showing {filteredAndSortedProjects.length} of {projects.length}{" "}
            projects
            {(searchQuery || activeCategory !== "All") && (
              <span className="filter-info">
                {searchQuery && ` for "${searchQuery}"`}
                {searchQuery && activeCategory !== "All" && " in "}
                {activeCategory !== "All" && `category: ${activeCategory}`}
              </span>
            )}
          </p>
        </motion.div>
      </motion.div>

      <motion.button
        className="floating-action-btn"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.5 }}
        onClick={toggleFilters}
        whileTap={{ scale: 0.95 }}
      >
        <FiFilter size={20} />
      </motion.button>
    </motion.div>
  );
};

export default ProjectsPage;
