import React from "react";
import "./Project.css";

import videos from "../videos";
import images from "../images";

const projects = [
  { video: videos.video2, image: images.img1 },
  { video: videos.video8, image: images.img2 },
  { video: videos.video6, image: images.img3 },
  { video: videos.video, image: images.img4 },
  { video: videos.video4, image: images.img5 },
  { video: videos.video5, image: images.img6 },
  { video: videos.video3, image: images.img7 },
  { video: videos.video7, image: images.img8 },
  { video: videos.video1, image: images.img9 },
];

const Project = () => {
  return (
    <section className="project-section">
      <div className="project-container">
        <h1 className="project-title">
          <span className="highlighted">3.</span> Past Projects
        </h1>

        <div className="project-grid">
          {projects.map((item, index) => (
            <div className="project-box" key={index}>
              <img
                src={item.image}
                alt={`Project ${index + 1}`}
                className="project-thumbnail"
              />
              <video
                className="project-video"
                playsInline
                muted
                loop
                onMouseEnter={(e) => e.target.play()}
                onMouseLeave={(e) => e.target.pause()}
              >
                <source src={item.video} type="video/mp4" />
              </video>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Project;
