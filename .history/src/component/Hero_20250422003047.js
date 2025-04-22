import React from "react";
import { motion } from "framer-motion";
import "./Hero.css";
import backgroundVideo from "./images/video.mp4";
import Button from "./Button";

const textVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-video-container">
        <video autoPlay loop muted playsInline className="hero-video">
          <source src={backgroundVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="hero-overlay" />
      </div>

      <motion.div
        className="hero-content"
        initial="hidden"
        animate="visible"
        variants={textVariants}
      >
        <motion.h3 className="hero-subtitle" transition={{ delay: 0.2 }}>
          Welcome to
        </motion.h3>
        <motion.h1 className="hero-title" transition={{ delay: 0.4 }}>
          B-Wright Codes
        </motion.h1>
        <motion.p className="hero-text" transition={{ delay: 0.6 }}>
          Empowering your ideas through beautifully engineered web and mobile
          applications — crafted with precision, purpose, and clean code.
        </motion.p>
        <motion.div transition={{ delay: 0.8 }}>
          <Button>View Code Work</Button>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
