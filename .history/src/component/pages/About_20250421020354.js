import React from "react";
import "./About.css";
import image from "../images/IMG_0699-2.jpg";

const About = () => {
  return (
    <section className="about-section" id="about">
      <div className="about-container">
        <h2 className="about-title">
          <span className="highlighted">2.</span> About Me
        </h2>

        <div className="about-content">
          <div className="about-image">
            <img src={image} alt="Bojurie Rogers-Wright" />
          </div>

          <div className="about-text">
            <p>
              I'm <strong>Bojurie Rogers-Wright</strong>, a passionate
              full-stack developer focused on building elegant, responsive, and
              scalable web and mobile applications. I thrive on transforming
              ideas into impactful digital experiences — blending creativity
              with clean, functional code.
            </p>

            <p>
              My journey into tech began in 2004, sparked by a curiosity for
              hardware and systems. Over the years, I've grown through
              self-learning, professional experience, and a deep love for
              solving problems through software. Since 2019, I've been immersed
              in JavaScript ecosystems, collaborating on a variety of projects
              across startups, agencies, and client-based work.
            </p>

            <p>
              Today, I specialize in developing full-stack solutions with
              intuitive UI, efficient backend logic, and modern DevOps
              practices. I’m constantly learning and pushing boundaries to build
              accessible, high-performing applications.
            </p>

            <h3 className="skills-heading">🛠 Technologies I Work With:</h3>

            <div className="about-skills">
              <ul>
                <li>JavaScript (ES6+)</li>
                <li>React.js & React Native</li>
                <li>Next.js</li>
                <li>HTML5 / CSS3 / Sass</li>
              </ul>
              <ul>
                <li>Node.js</li>
                <li>Express.js</li>
                <li>MongoDB & MySQL</li>
                <li>Git & GitHub</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
