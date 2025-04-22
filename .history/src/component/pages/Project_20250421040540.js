import React, { useState } from "react";
import "./Project.css";

import video0 from "../videos/Screen Recording 2022-04-01 at 8.22.57 PM.mov";
import video1 from "../videos/Screen Recording 2022-04-01 at 8.23.25 PM.mov";
import video2 from "../videos/Screen Recording 2022-04-01 at 8.25.20 PM.mov";
import video3 from "../videos/Screen Recording 2022-04-01 at 8.27.28 PM.mov";
import video4 from "../videos/Screen Recording 2022-04-01 at 8.28.35 PM.mov";
import video5 from "../videos/Screen Recording 2022-04-01 at 8.30.37 PM.mov";
import video6 from "../videos/Screen Recording 2022-04-01 at 8.34.30 PM.mov";
import video7 from "../videos/Screen Recording 2022-04-03 at 3.51.52 AM.mov";
import video8 from "../videos/Screen Recording 2022-04-03 at 3.48.52 AM.mov";

import img1 from "../images/1.png";
import img2 from "../images/2.png";
import img3 from "../images/3.png";
import img4 from "../images/4.png";
import img5 from "../images/5.png";
import img6 from "../images/6.png";
import img7 from "../images/7.png";
import img8 from "../images/8.png";
import img9 from "../images/9.png";

const projects = [
  { img: img1, video: video2, title: "E-Commerce UI", category: "React" },
  { img: img2, video: video8, title: "Portfolio Website", category: "Next.js" },
  { img: img3, video: video6, title: "Admin Dashboard", category: "React" },
  { img: img4, video: video0, title: "News Platform", category: "MERN" },
  { img: img5, video: video4, title: "Social App", category: "MERN" },
  { img: img6, video: video5, title: "Booking System", category: "Full-Stack" },
  { img: img7, video: video3, title: "Analytics Tool", category: "Node.js" },
  { img: img8, video: video7, title: "Job Board", category: "Next.js" },
  {
    img: img9,
    video: video1,
    title: "Product Preview",
    category: "Full-Stack",
  },
];

const categories = ["All", "React", "Next.js", "MERN", "Full-Stack", "Node.js"];

const Project = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProjects =
    activeCategory === "All"
      ? projects
      : projects.filter((project) => project.category === activeCategory);

  return (
    <section className="project" id="projects">
      <div className="container">
        <div className="project-wrapper">
          <h2 className="project-heading">
            <span className="highlighted">3.</span> My Projects
          </h2>

          <div className="project-tabs">
            {categories.map((category) => (
              <button
                key={category}
                className={`tab-button ${
                  activeCategory === category ? "active" : ""
                }`}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="project-grid">
            {filteredProjects.map((project, index) => (
              <div className="project-box" key={index}>
                <div className="project-label">{project.title}</div>
                <video
                  className="project-video"
                  loop
                  muted
                  playsInline
                  preload="none"
                  onMouseEnter={(e) => {
                    if (e.currentTarget.paused) {
                      e.currentTarget.play().catch((err) => {
                        console.warn("Play interrupted:", err.message);
                      });
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!e.currentTarget.paused) {
                      e.currentTarget.pause();
                    }
                  }}
                >
                  <source src={project.video} type="video/mp4" />
                </video>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Project;
