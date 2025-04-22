import React from "react";
import { motion } from "framer-motion";
import Hero from "../Hero";
import About from "./About";
import Project from "./Project";
import Contact from "./Contact";
import "./Home.css";

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

const Home = () => {
  return (
    <motion.main
      className="home"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <Hero />
      <About />
      <Project />
      <Contact />
    </motion.main>
  );
};

export default Home;
