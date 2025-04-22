import React from "react";
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
  { img: img1, video: video2 },
  { img: img2, video: video8 },
  { img: img3, video: video6 },
  { img: img4, video: video0 },
  { img: img5, video: video4 },
  { img: img6, video: video5 },
  { img: img7, video: video3 },
  { img: img8, video: video7 },
  { img: img9, video: video1 },
];

const Project = () => {
  return (
    <section className="project">
      <div className="container">
        <div className="project-wrapper">
          <h1 className="project-heading">
            <span className="highlighted">3.</span> Past Projects
          </h1>
          <div className="project-grid">
            {projects.map((project, index) => (
              <div className="project-box" key={index}>
                <img
                  src={project.img}
                  alt={`Project ${index + 1}`}
                  className="project-img"
                />
                <video
                  className="project-video"
                  autoPlay
                  loop
                  muted
                  playsInline
                  onMouseEnter={(e) => e.currentTarget.play()}
                  onMouseLeave={(e) => e.currentTarget.pause()}
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
