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
            <img src={image} alt="Bojurie Rogers-Wright profile" />
          </div>

          <div className="about-text">
            <p>
              Hi, my name is <strong>Bojurie Rogers-Wright</strong>, and I love
              turning ideas into fully functional digital experiences. My
              passion for web development began in 2019, but my tech roots go
              back to 2004 — tinkering with PCs, installing Windows XP, and
              learning how hardware and software come together.
            </p>

            <p>
              After studying International Business, I found my way back to
              tech. Over the years, I’ve worked in agencies, startups, and
              collaborative studios — focusing on creating responsive,
              accessible, and modern applications that not only work well but
              feel great to use.
            </p>

            <p>Here are a few technologies I use regularly:</p>

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
