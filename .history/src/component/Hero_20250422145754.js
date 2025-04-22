import React from "react";
import { motion } from "framer-motion";
import "./Hero.css";
import backgroundVideo from "./images/video.mp4";
import Button from "./Button";

const Hero = () => {
  const textVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.8,
        ease: [0.16, 0.77, 0.47, 0.97],
      },
    }),
  };

  const floatingVariants = {
    float: {
      y: [0, -15, 0],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <section className="hero">
      <div className="hero-video-container">
        <video autoPlay loop muted playsInline className="hero-video">
          <source src={backgroundVideo} type="video/mp4" />
        </video>
        <div className="hero-overlay" />
        <div className="hero-grid-overlay" />
      </div>

      <div className="hero-content-container">
        <motion.div
          className="hero-content"
          initial="hidden"
          animate="visible"
          custom={0}
          variants={textVariants}
        >
          <motion.div
            className="hero-subtitle-container"
            custom={1}
            variants={textVariants}
          >
            <motion.span
              className="hero-subtitle"
              variants={floatingVariants}
              animate="float"
            >
              INNOVATIVE SOLUTIONS
            </motion.span>
          </motion.div>

          <motion.h1 className="hero-title" custom={2} variants={textVariants}>
            <span className="hero-title-gradient">B-Wright</span>
            <br />
            <span className="hero-title-outline">Codes</span>
          </motion.h1>

          <motion.p className="hero-text" custom={3} variants={textVariants}>
            Transforming visions into{" "}
            <span className="text-highlight">cutting-edge</span> digital
            experiences through{" "}
            <span className="text-highlight">innovative</span> engineering.
          </motion.p>

          <motion.div className="hero-cta" custom={4} variants={textVariants}>
            <Button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              Explore My Work
            </Button>
          </motion.div>
        </motion.div>

        <motion.div
          className="hero-scroll-indicator"
          animate={{
            y: [0, 10, 0],
            opacity: [0.6, 1, 0.6],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <div className="scroll-line" />
          <span>Scroll</span>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
