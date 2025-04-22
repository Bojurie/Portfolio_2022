import React from "react";
import { motion } from "framer-motion";
import { FiCode, FiServer, FiDatabase, FiGitBranch } from "react-icons/fi";
import "./About.css";
import image from "../images/IMG_0699-2.jpg";

const About = () => {
  const skills = [
    { name: "JavaScript (ES6+)", icon: <FiCode /> },
    { name: "React.js", icon: <FiCode /> },
    { name: "Next.js", icon: <FiCode /> },
    { name: "React Native", icon: <FiCode /> },
    { name: "HTML5 / CSS3 / Sass", icon: <FiCode /> },
    { name: "Node.js", icon: <FiServer /> },
    { name: "Express.js", icon: <FiServer /> },
    { name: "MongoDB & MySQL", icon: <FiDatabase /> },
    { name: "Git & GitHub", icon: <FiGitBranch /> },
    { name: "Heroku", icon: <FiServer /> },
  ];

  return (
    <section className="section about" id="about">
      <div className="container">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <span className="highlight">02.</span> About Me
        </motion.h2>

        <div className="about-grid">
          <motion.div
            className="about-image-container"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="about-image-wrapper">
              <img
                src={image}
                alt="Bojurie Rogers-Wright"
                className="about-image"
              />
              <div className="about-image-border" />
            </div>
          </motion.div>

          <motion.div
            className="about-content"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h3 className="about-name">Bojurie Rogers-Wright</h3>
            <p className="about-role">Full Stack Engineer</p>
            <p className="about-bio">
              Building the future—one thoughtfully engineered component at a
              time. From concept to code, I bring your vision to life.
            </p>

            <div className="about-text">
              <p>
                I'm <strong>Bojurie Rogers-Wright</strong>, a visionary
                full-stack engineer driven by a passion for transforming
                ambitious ideas into powerful digital solutions. I specialize in
                crafting elegant, responsive, and scalable applications that
                don't just work — they inspire.
              </p>

              <p>
                My journey began in 2004, sparked by an early fascination with
                computer hardware and operating systems. What started as
                curiosity evolved into a lifelong pursuit of innovation. Since
                2019, I've been immersed in the JavaScript ecosystem, delivering
                cutting-edge solutions across startups, agencies, and
                client-focused projects.
              </p>

              <p>
                Today, I bring together intuitive UI design, robust backend
                engineering, and modern DevOps practices to deliver seamless,
                high-performance applications. With every line of code, I'm not
                just building software — I'm building the future.
              </p>
            </div>

            <h3 className="skills-heading">Technologies I Work With:</h3>

            <div className="skills-grid">
              {skills.map((skill, index) => (
                <motion.div
                  key={index}
                  className="skill-item"
                  whileHover={{ y: -3 }}
                  transition={{ duration: 0.2 }}
                >
                  <span className="skill-icon">{skill.icon}</span>
                  {skill.name}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
