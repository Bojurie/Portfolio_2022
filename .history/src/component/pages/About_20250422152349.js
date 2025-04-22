import React from "react";
import { motion } from "framer-motion";
import {
  FiCode,
  FiServer,
  FiDatabase,
  FiGitBranch,
  FiCpu,
  FiLayers,
} from "react-icons/fi";
import "./About.css";
import image from "../images/IMG_0699-2.jpg";

const About = () => {
  const skills = [
    { name: "JavaScript (ES6+)", icon: <FiCode />, color: "#f0db4f" },
    { name: "React.js", icon: <FiCpu />, color: "#61dafb" },
    { name: "Next.js", icon: <FiLayers />, color: "#000000" },
    { name: "React Native", icon: <FiCpu />, color: "#61dafb" },
    { name: "HTML5 / CSS3", icon: <FiCode />, color: "#e34c26" },
    { name: "Node.js", icon: <FiServer />, color: "#68a063" },
    { name: "Express.js", icon: <FiServer />, color: "#000000" },
    { name: "MongoDB", icon: <FiDatabase />, color: "#4db33d" },
    { name: "MySQL", icon: <FiDatabase />, color: "#00758f" },
    { name: "Git & GitHub", icon: <FiGitBranch />, color: "#f34f29" },
    { name: "Heroku", icon: <FiServer />, color: "#430098" },
  ];

  return (
    <section className="section about" id="about">
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
          <span className="highlight">02.</span> About Me
        </motion.h2>

        <div className="about-grid">
          <motion.div
            className="about-image-container"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.8,
              delay: 0.2,
              ease: [0.16, 0.77, 0.47, 0.97],
            }}
          >
            <div className="about-image-wrapper">
              <img
                src={image}
                alt="Bojurie Rogers-Wright"
                className="about-image"
              />
              <div className="about-image-border" />
              <div className="about-image-grid" />
              <div className="about-image-glow" />
            </div>
          </motion.div>

          <motion.div
            className="about-content"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.8,
              delay: 0.4,
              ease: [0.16, 0.77, 0.47, 0.97],
            }}
          >
            <h3 className="about-name">
              <span className="name-gradient">Bojurie Rogers-Wright</span>
            </h3>
            <p className="about-role">
              <span className="role-outline">Full Stack Engineer</span>
            </p>

            <motion.p
              className="about-bio"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              Building the future—one thoughtfully engineered component at a
              time. From <span className="text-highlight">concept</span> to{" "}
              <span className="text-highlight">code</span>, I bring your vision
              to life.
            </motion.p>

            <div className="about-text">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
              >
                I'm <strong>Bojurie Rogers-Wright</strong>, a visionary
                full-stack engineer driven by a passion for transforming
                ambitious ideas into powerful digital solutions. I specialize in
                crafting elegant, responsive, and scalable applications that
                don't just work — they{" "}
                <span className="text-highlight">inspire</span>.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                My journey began in 2004, sparked by an early fascination with
                computer hardware and operating systems. What started as
                curiosity evolved into a lifelong pursuit of{" "}
                <span className="text-highlight">innovation</span>. Since 2019,
                I've been immersed in the JavaScript ecosystem, delivering
                cutting-edge solutions across startups, agencies, and
                client-focused projects.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
              >
                Today, I bring together intuitive UI design, robust backend
                engineering, and modern DevOps practices to deliver seamless,
                high-performance applications. With every line of code, I'm not
                just building software — I'm building the{" "}
                <span className="text-highlight">future</span>.
              </motion.p>
            </div>

            <motion.h3
              className="skills-heading"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 1.0 }}
            >
              <span className="highlight">Technologies</span> I Work With:
            </motion.h3>

            <div className="skills-grid">
              {skills.map((skill, index) => (
                <motion.div
                  key={index}
                  className="skill-item"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={{
                    y: -5,
                    scale: 1.03,
                    boxShadow: "0 10px 20px rgba(0,0,0,0.2)",
                  }}
                  transition={{
                    delay: 1.1 + index * 0.05,
                    duration: 0.3,
                    ease: "easeOut",
                  }}
                  style={{
                    borderLeft: `3px solid ${skill.color}`,
                    "--skill-color": skill.color,
                  }}
                >
                  <span className="skill-icon" style={{ color: skill.color }}>
                    {skill.icon}
                  </span>
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
