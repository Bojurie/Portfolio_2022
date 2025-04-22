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
          <div>
            <div className="about-image">
              <img src={image} alt="Bojurie Rogers-Wright" />
            </div>
            <div>
              <h2>Bojurie Rogers-Wright</h2>
              <p>Full Stack Engineer</p>
              <p>
                Building the future—one thoughtfully engineered component at a
                time. From concept to code, I bring your vision to life.{" "}
              </p>
            </div>
          </div>
          <div className="about-text">
            <p>
              I'm <strong>Bojurie Rogers-Wright</strong>, a visionary full-stack
              engineer driven by a passion for transforming ambitious ideas into
              powerful digital solutions. I specialize in crafting elegant,
              responsive, and scalable applications that don’t just work — they
              inspire.
            </p>

            <p>
              My journey began in 2004, sparked by an early fascination with
              computer hardware and operating systems. What started as curiosity
              evolved into a lifelong pursuit of innovation. Since 2019, I’ve
              been immersed in the JavaScript ecosystem, delivering cutting-edge
              solutions across startups, agencies, and client-focused projects.
            </p>

            <p>
              Today, I bring together intuitive UI design, robust backend
              engineering, and modern DevOps practices to deliver seamless,
              high-performance applications. With every line of code, I’m not
              just building software — I’m building the future.
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
