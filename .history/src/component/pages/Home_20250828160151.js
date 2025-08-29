import React from "react";
import { motion } from "framer-motion";
import Hero from "../components/Hero";
import About from "./About";
import Projects from "./Projects";
import Contact from "./Contact";
import Experience from "./Experience";

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
  return (
    <motion.main
      className="home"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.section variants={sectionVariants}>
        <Hero />
      </motion.section>

      <motion.section variants={sectionVariants}>
        <About />
      </motion.section>

      <motion.section variants={sectionVariants}>
        <Experience />
      </motion.section>

      <motion.section variants={sectionVariants}>
        <Projects />
      </motion.section>

      <motion.section variants={sectionVariants}>
        <Contact />
      </motion.section>
    </motion.main>
  );
};

export default Home;
