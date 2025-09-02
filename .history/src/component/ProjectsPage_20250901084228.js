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
  const [viewMode, setViewMode] = useState("grid"); // "grid" | "list"
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("default"); // "default" | "name-asc" | "name-desc" | "newest"
  const [showFilters, setShowFilters] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");
  const [isIOSDevice, setIsIOSDevice] = useState(false);
   const [projects, setProjects] = useState([]);

  const navigate = useNavigate();
  const location = useLocation();

  // Initial load + respect nav state for category
  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 100);
    setIsIOSDevice(isIOS());
    setProjects(getProjects());
    if (location.state?.activeCategory) {
      setActiveCategory(location.state.activeCategory);
    }
    return () => clearTimeout(timer);
  }, [location.state]);

  // Derive view data
  const filteredAndSortedProjects = useMemo(() => {
    let filtered =
      activeCategory === "All"
        ? projects
        : projects.filter((p) => p.category === activeCategory);

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.tags?.some((t) => t.toLowerCase().includes(q))
      );
    }

    switch (sortBy) {
      case "name-asc":
        return [...filtered].sort((a, b) => a.title.localeCompare(b.title));
      case "name-desc":
        return [...filtered].sort((a, b) => b.title.localeCompare(a.title));
      case "newest":
        return [...filtered].reverse(); // assumes projects are pre-sorted oldest→newest
      default:
        return filtered;
    }
  }, [activeCategory, searchQuery, sortBy]);

  // Handlers
  const handleSearchChange = useCallback(
    (e) => setSearchQuery(e.target.value),
    []
  );
  const clearSearch = useCallback(() => setSearchQuery(""), []);
  const toggleViewMode = useCallback(
    () => setViewMode((prev) => (prev === "grid" ? "list" : "grid")),
    []
  );
  const toggleFilters = useCallback(() => setShowFilters((prev) => !prev), []);

  const handleCategoryChange = useCallback((category) => {
    setActiveCategory(category);
    setSearchQuery("");
    setShowFilters(false); // close mobile sheet for better UX
  }, []);

  const handleOpenModal = useCallback((index) => {
    // Hook your modal or route-based modal here
    console.log("Open modal for project:", index);
  }, []);

  const handleVideoPlay = useCallback(
    (index, e) => {
      e?.stopPropagation();
      // Listing-page level video action if needed
      console.log("Play video for project:", index, "iOS:", isIOSDevice);
    },
    [isIOSDevice]
  );

  const handleClose = useCallback(() => navigate("/projects"), [navigate]);

  const handleClearFilters = useCallback(() => {
    setSearchQuery("");
    setActiveCategory("All");
  }, []);

  // Animation presets
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.2 },
    },
  };
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };

  return (
    <motion.div
      className="projects-page section"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      id="projects"
    >
      {/* Header */}
      <motion.header
        className="projects-page__header"
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.45 }}
      >
        <div className="container projects-page__header-inner">
          <button
            className="projects-page__back-btn"
            onClick={handleClose}
            aria-label="Close projects"
          >
            <FiX size={22} />
          </button>

          <h1 className="projects-page__title section-title">
            <span className="highlight">All</span> Projects
            <span className="projects-page__count">
              ({filteredAndSortedProjects.length})
            </span>
          </h1>

          <div className="projects-page__header-actions">
            <button
              className={`projects-page__view-toggle ${viewMode}`}
              onClick={toggleViewMode}
              aria-label={`Switch to ${
                viewMode === "grid" ? "list" : "grid"
              } view`}
            >
              {viewMode === "grid" ? (
                <FiList size={18} />
              ) : (
                <FiGrid size={18} />
              )}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Controls */}
      <motion.div
        className="projects-page__controls"
        initial={{ y: -16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.35, delay: 0.05 }}
      >
        <div className="container">
          <div className="projects-page__controls-grid">
            {/* Search */}
            <label
              className="projects-page__search"
              aria-label="Search projects"
            >
              <FiSearch
                className="projects-page__search-icon"
                size={18}
                aria-hidden
              />
              <input
                type="text"
                placeholder="Search projects…"
                value={searchQuery}
                onChange={handleSearchChange}
                className="projects-page__search-input"
              />
              {searchQuery && (
                <button
                  type="button"
                  className="projects-page__clear-search"
                  onClick={clearSearch}
                  aria-label="Clear search"
                >
                  <FiX size={14} />
                </button>
              )}
            </label>

            {/* Sort */}
            <div className="projects-page__sort">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="projects-page__sort-select"
                aria-label="Sort projects"
              >
                <option value="default">Sort by: Default</option>
                <option value="name-asc">Sort by: Name (A–Z)</option>
                <option value="name-desc">Sort by: Name (Z–A)</option>
                <option value="newest">Sort by: Newest</option>
              </select>
              <FiChevronDown
                className="projects-page__select-arrow"
                size={14}
                aria-hidden
              />
            </div>

            {/* Mobile Filters Toggle */}
            <button
              className={`projects-page__filter-toggle ${
                showFilters ? "is-active" : ""
              }`}
              onClick={toggleFilters}
              aria-expanded={showFilters}
              aria-controls="mobile-filters"
            >
              <FiFilter size={18} />
              Filters
            </button>
          </div>

          {/* Category Filters (mobile) */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                id="mobile-filters"
                className="projects-page__mobile-filters"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25 }}
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
        className="projects-page__desktop-filters"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.35, delay: 0.1 }}
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

      {/* Results */}
      <motion.div
        className="container projects-page__results"
        variants={containerVariants}
        initial="hidden"
        animate={loaded ? "visible" : "hidden"}
      >
        {filteredAndSortedProjects.length === 0 ? (
          <motion.div className="projects-page__empty" variants={itemVariants}>
            <div className="projects-page__empty-inner">
              <FiSearch size={48} className="projects-page__empty-icon" />
              <h3>No projects found</h3>
              <p>Try adjusting your search or filter criteria.</p>
              {(searchQuery || activeCategory !== "All") && (
                <button
                  className="btn btn--secondary"
                  onClick={handleClearFilters}
                >
                  Clear all filters
                </button>
              )}
            </div>
          </motion.div>
        ) : (
          <motion.div
            className={`projects-page__list projects-page__list--${viewMode}`}
            variants={containerVariants}
          >
            {filteredAndSortedProjects.map((project, index) => (
              <motion.div
                key={`${project.id}-${index}`}
                variants={itemVariants}
                className="projects-page__item"
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

        <motion.div
          className="projects-page__results-info"
          variants={itemVariants}
        >
          <p>
            Showing {filteredAndSortedProjects.length} of {projects.length}{" "}
            projects
            {(searchQuery || activeCategory !== "All") && (
              <span className="projects-page__filter-info">
                {searchQuery && ` for "${searchQuery}"`}
                {searchQuery && activeCategory !== "All" && " in "}
                {activeCategory !== "All" && `category: ${activeCategory}`}
              </span>
            )}
          </p>
        </motion.div>
      </motion.div>

      {/* Floating filter (mobile convenience) */}
      <motion.button
        className="projects-page__fab"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.25, delay: 0.35 }}
        onClick={toggleFilters}
        aria-label="Toggle filters"
      >
        <FiFilter size={20} />
      </motion.button>
    </motion.div>
  );
};

export default ProjectsPage;
