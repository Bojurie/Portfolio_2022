import React from "react";
import { motion } from "framer-motion";
import { FiGithub, FiLinkedin, FiTwitter, FiInstagram } from "react-icons/fi";
import "./SocialFollow.css";

const SocialFollow = () => {
  const socialLinks = [
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/bojurie-rogers-wright/",
      icon: <FiLinkedin />,
      color: "#0A66C2",
    },
    {
      name: "GitHub",
      url: "https://github.com/Bojurie",
      icon: <FiGithub />,
      color: "#333",
    },
    {
      name: "Twitter",
      url: "#",
      icon: <FiTwitter />,
      color: "#1DA1F2",
    },
    {
      name: "Instagram",
      url: "https://www.instagram.com/bwrightcodes/",
      icon: <FiInstagram />,
      color: "#E1306C",
    },
  ];

  return (
    <div className="social-container">
      <h3 className="social-title">Connect with Me</h3>
      <div className="social-links">
        {socialLinks.map((social, index) => (
          <motion.a
            key={index}
            href={social.url}
            className="social-link"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.9 }}
            style={{ color: social.color }}
            aria-label={social.name}
          >
            {social.icon}
          </motion.a>
        ))}
      </div>
    </div>
  );
};

export default SocialFollow;
