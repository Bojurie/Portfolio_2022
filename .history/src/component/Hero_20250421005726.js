import React from "react";
import "./Hero.css";
import backgroundVideo from "./images/video.mp4";
import Button from "./Button";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section className="hero-container">
      <video autoPlay loop muted playsInline className="background-video">
        <source src={backgroundVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <motion.div
        className="hero-content"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h3>Welcome to</h3>
        <h2>Bojurie's Code</h2>
        <p>
          Creating beautiful Web and Mobile applications with different
          functionalities while keeping the code clean.
        </p>
        <Button>View Code Work</Button>
      </motion.div>
    </section>
  );
};

export default Hero;
