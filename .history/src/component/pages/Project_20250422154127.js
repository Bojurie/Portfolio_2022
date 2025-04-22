import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiExternalLink,
  FiGithub,
  FiX,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";
import "./Project.css";

// Video imports
const videos = Array(9)
  .fill()
  .map((_, i) =>
    require(`../videos/Screen Recording 2022-04-0${i < 8 ? i + 1 : 9} at ${
      i < 4 ? "8" : "3"
    }.${
      i < 3
        ? "22"
        : i < 5
        ? "25"
        : i < 6
        ? "27"
        : i < 7
        ? "28"
        : i < 8
        ? "30"
        : "48"
    }.${
      i < 2
        ? "57"
        : i < 3
        ? "20"
        : i < 4
        ? "25"
        : i < 5
        ? "28"
        : i < 6
        ? "35"
        : i < 7
        ? "37"
        : i < 8
        ? "30"
        : "52"
    }.mov`)
  );

// Image imports
const images = Array(9)
  .fill()
  .map((_, i) => require(`../images/${i + 1}.png`));

const projects = [
  {
    img: images[0],
    video: videos[0],
    title: "E-Commerce UI",
    category: "React",
    tags: ["React", "Redux", "Styled Components"],
    description:
      "A modern e-commerce platform with product filtering, cart functionality, and smooth animations.",
    links: { live: "#", code: "#" },
  },
  {
    img: images[1],
    video: videos[1],
    title: "Portfolio Website",
    category: "Next.js",
    tags: ["Next.js", "Framer Motion", "Tailwind CSS"],
    description:
      "A performant portfolio website with smooth page transitions and responsive design.",
    links: { live: "#", code: "#" },
  },
  {
    img: images[2],
    video: videos[2],
    title: "Admin Dashboard",
    category: "React",
    tags: ["React", "Chart.js", "Material UI"],
    description:
      "Comprehensive admin dashboard with data visualization, user management, and analytics.",
    links: { live: "#", code: "#" },
  },
  {
    img: images[3],
    video: videos[3],
    title: "News Platform",
    category: "MERN",
    tags: ["MongoDB", "Express", "React", "Node.js"],
    description:
      "Full-stack news aggregation platform with user authentication and content management.",
    links: { live: "#", code: "#" },
  },
  {
    img: images[4],
    video: videos[4],
    title: "Social App",
    category: "MERN",
    tags: ["MERN Stack", "Socket.io", "JWT"],
    description:
      "Social media application with real-time updates, friend connections, and activity feeds.",
    links: { live: "#", code: "#" },
  },
  {
    img: images[5],
    video: videos[5],
    title: "Booking System",
    category: "Full-Stack",
    tags: ["React", "Node.js", "PostgreSQL"],
    description:
      "Reservation management system with calendar integration and email notifications.",
    links: { live: "#", code: "#" },
  },
  {
    img: images[6],
    video: videos[6],
    title: "Analytics Tool",
    category: "Node.js",
    tags: ["Node.js", "D3.js", "Express"],
    description:
      "Data analytics dashboard with custom visualization and report generation.",
    links: { live: "#", code: "#" },
  },
  {
    img: images[7],
    video: videos[7],
    title: "Job Board",
    category: "Next.js",
    tags: ["Next.js", "TypeScript", "MongoDB"],
    description:
      "Job listing platform with search filters, applicant tracking, and employer dashboards.",
    links: { live: "#", code: "#" },
  },
  {
    img: images[8],
    video: videos[8],
    title: "Product Preview",
    category: "Full-Stack",
    tags: ["React", "Node.js", "Stripe API"],
    description:
      "Interactive product showcase with 360° view, zoom functionality, and checkout process.",
    links: { live: "#", code: "#" },
  },
];

const categories = ["All", "React", "Next.js", "MERN", "Full-Stack", "Node.js"];

const Project = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [currentProject, setCurrentProject] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const videoRefs = useRef([]);

  const filteredProjects =
    activeCategory === "All"
      ? projects
      : projects.filter((project) => project.category === activeCategory);

  useEffect(() => {
    const preloadVideos = async () => {
      try {
        await Promise.all(
          filteredProjects.slice(0, 3).map(
            (project) =>
              new Promise((resolve) => {
                const video = document.createElement("video");
                video.src = project.video;
                video.preload = "auto";
                video.onloadeddata = resolve;
              })
          )
        );
        setLoaded(true);
      } catch (error) {
        console.error("Video preload error:", error);
        setLoaded(true);
      }
    };

    preloadVideos();

    return () => {
      // Cleanup video refs
      videoRefs.current = [];
    };
  }, [filteredProjects]);

  const handleVideoHover = (index, action) => {
    const video = videoRefs.current[index];
    if (!video) return;

    if (action === "enter") {
      video.play().catch((e) => console.log("Autoplay prevented:", e));
    } else {
      video.pause();
      video.currentTime = 0;
    }
  };

  const openModal = (index) => {
    setCurrentProject(index);
    setShowModal(true);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setShowModal(false);
    document.body.style.overflow = "auto";
  };

  const navigateProject = (direction) => {
    setCurrentProject((prev) => {
      const lastIndex = filteredProjects.length - 1;
      return direction === "prev"
        ? prev === 0
          ? lastIndex
          : prev - 1
        : prev === lastIndex
        ? 0
        : prev + 1;
    });
  };

  return (
    <section className="section projects" id="projects">
      <div className="container">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{
            duration: 0.8,
            ease: [0.16, 0.77, 0.47, 0.97],
          }}
        >
          <span className="highlight">04.</span> Project Portfolio
        </motion.h2>

        <motion.div
          className="category-tabs"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {categories.map((category) => (
            <motion.button
              key={category}
              className={`tab ${activeCategory === category ? "active" : ""}`}
              onClick={() => setActiveCategory(category)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        {!loaded ? (
          <div className="loading-grid">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="project-skeleton" />
            ))}
          </div>
        ) : (
          <motion.div
            className="project-grid"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {filteredProjects.map((project, index) => (
              <motion.div
                key={index}
                className="project-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                  ease: [0.16, 0.77, 0.47, 0.97],
                }}
                whileHover={{
                  y: -10,
                  boxShadow: "0 20px 40px rgba(58, 134, 255, 0.2)",
                }}
                onClick={() => openModal(index)}
              >
                <div className="project-media">
                  <video
                    ref={(el) => (videoRefs.current[index] = el)}
                    loop
                    muted
                    playsInline
                    poster={project.img}
                    onMouseEnter={() => handleVideoHover(index, "enter")}
                    onMouseLeave={() => handleVideoHover(index, "leave")}
                  >
                    <source src={project.video} type="video/mp4" />
                  </video>
                  <div className="project-overlay">
                    <div className="overlay-content">
                      <h3>{project.title}</h3>
                      <p>{project.description}</p>
                      <div className="tags">
                        {project.tags.map((tag, i) => (
                          <span key={i}>{tag}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        <AnimatePresence>
          {showModal && (
            <motion.div
              className="project-modal"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="modal-backdrop" onClick={closeModal} />

              <motion.div
                className="modal-container"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: "spring", damping: 25 }}
              >
                <button className="close-btn" onClick={closeModal}>
                  <FiX />
                </button>

                <div className="modal-content">
                  <div className="modal-media">
                    <video
                      controls
                      autoPlay
                      loop
                      muted
                      playsInline
                      src={filteredProjects[currentProject].video}
                      poster={filteredProjects[currentProject].img}
                    />
                  </div>

                  <div className="modal-details">
                    <h3>{filteredProjects[currentProject].title}</h3>
                    <div className="category">
                      {filteredProjects[currentProject].category}
                    </div>
                    <p>{filteredProjects[currentProject].description}</p>

                    <div className="tech-stack">
                      <h4>Tech Stack</h4>
                      <div className="tags">
                        {filteredProjects[currentProject].tags.map((tag, i) => (
                          <span key={i}>{tag}</span>
                        ))}
                      </div>
                    </div>

                    <div className="project-links">
                      {filteredProjects[currentProject].links.live && (
                        <a
                          href={filteredProjects[currentProject].links.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="link-btn"
                        >
                          <FiExternalLink /> Live Demo
                        </a>
                      )}
                      {filteredProjects[currentProject].links.code && (
                        <a
                          href={filteredProjects[currentProject].links.code}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="link-btn secondary"
                        >
                          <FiGithub /> View Code
                        </a>
                      )}
                    </div>
                  </div>
                </div>

                <div className="modal-nav">
                  <button
                    className="nav-btn prev"
                    onClick={() => navigateProject("prev")}
                  >
                    <FiChevronLeft />
                  </button>

                  <div className="project-indicator">
                    {currentProject + 1} / {filteredProjects.length}
                  </div>

                  <button
                    className="nav-btn next"
                    onClick={() => navigateProject("next")}
                  >
                    <FiChevronRight />
                  </button>
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
