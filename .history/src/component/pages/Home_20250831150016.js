import { motion } from "framer-motion";
import { useEffect } from "react";
import Hero from "../Hero";
import About from "./About";
import Projects from "./Project";
import Contact from "./Contact";
import Experience from "./Experience";
import "./home.scss";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      when: "beforeChildren",
    },
  },
};

const sectionVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 0.77, 0.47, 0.97],
    },
  },
};

const Home = () => {
  useEffect(() => {
    const hash = window.location.hash;

    if (hash) {
      // Only scroll to section if it's explicitly requested via hash
      setTimeout(() => {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 300);
    } else {
      // Default behavior: scroll to top
      window.scrollTo(0, 0);
    }
  }, []);

  return (
    <motion.main
      className="home"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.section variants={sectionVariants} className="home-section-hero">
        <div className="home-content">
          <Hero />
        </div>
      </motion.section>

      <motion.section
        variants={sectionVariants}
        className="home-section-regular"
        id="about"
      >
        <div className="home-content">
          <About />
        </div>
      </motion.section>

      <motion.section
        variants={sectionVariants}
        className="home-section-alt"
        id="experience"
      >
        <div className="home-content">
          <Experience />
        </div>
      </motion.section>

      <motion.section
        variants={sectionVariants}
        className="home-section-regular"
        id="projects"
      >
        <div className="home-content">
          <Projects />
        </div>
      </motion.section>

      <motion.section
        variants={sectionVariants}
        className="home-section-alt"
        id="contact"
      >
        <div className="home-content">
          <Contact />
        </div>
      </motion.section>
    </motion.main>
  );
};

export default Home;
