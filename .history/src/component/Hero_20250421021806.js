import React from "react";
import "./Hero.css";
import backgroundVideo from "./images/video.mp4";
import Button from "./Button";

const Hero = () => {
  return (
    <section className="hero-container">
      <div className="hero-overlay">
        <video autoPlay loop muted playsInline className="hero-video">
          <source src={backgroundVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      <div className="hero-content">
        <h3>Welcome to</h3>
        <h2>BWright Codes</h2>
        <p>
          Creating beautiful Web and Mobile applications with different
          functionalities while keeping the code clean.
        </p>
        <Button>View Code Work</Button>
      </div>
    </section>
  );
};

export default Hero;
