import React from "react";
import "./About.css";
import image from "../images/IMG_0699-2.jpg";

const About = () => {
  return (
    <section className="about-section">
      <div className="about-container">
        <h1 className="about-title">
          <span className="highlighted">2.</span> About Me
        </h1>

        <div className="about-content">
          <div className="about-image">
            <img src={image} alt="Bojurie profile" />
          </div>

          <div className="about-text">
            <p>
              Hi, my name is <strong>Bojurie Rogers-Wright</strong> and I love
              bringing my clients’ ideas to life. My passion for creating
              beautiful, responsive web applications started back in 2019 — but
              my fascination with technology goes all the way back to 2004 when
              I first arrived in the States. I was the kind of kid who took
              apart PCs, upgraded RAM, and installed Windows XP just to
              understand how everything worked.
            </p>

            <p>
              Although I later pursued a degree in International Business, tech
              always remained at my core. I've had the opportunity to work in
              startups, corporate environments, and student-led studios. Today,
              I focus on building inclusive, accessible digital experiences that
              merge functionality and beauty.
            </p>

            <p>Here are a few technologies I’ve been working with recently:</p>

            <div className="about-skills">
              <ul>
                <li>JavaScript</li>
                <li>React.js</li>
                <li>Node.js</li>
              </ul>
              <ul>
                <li>Express.js</li>
                <li>MySQL</li>
                <li>MongoDB</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
