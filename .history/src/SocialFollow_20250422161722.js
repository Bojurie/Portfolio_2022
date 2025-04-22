// SocialFollow.js
import React from "react";
import { motion } from "framer-motion";
import {
  FiGithub,
  FiLinkedin,
  FiTwitter,
  FiInstagram,
  FiMail,
} from "react-icons/fi";
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
      color: "#ffffff",
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
    {
      name: "Email",
      url: "mailto:bojurie@example.com",
      icon: <FiMail />,
      color: "#EA4335",
    },
  ];

  return (
    <motion.div
      className="social-container"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <motion.h3
        className="social-title"
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
      >
        CONNECT <span className="highlight">WITH ME</span>
      </motion.h3>

      <div className="social-links">
        {socialLinks.map((social, index) => (
          <motion.a
            key={index}
            href={social.url}
            className="social-link"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{
              y: -5,
              scale: 1.1,
              backgroundColor: `${social.color}20`,
              boxShadow: `0 0 15px ${social.color}`,
            }}
            whileTap={{ scale: 0.9 }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
              delay: index * 0.1,
            }}
            style={{ color: social.color }}
            aria-label={social.name}
          >
            {social.icon}
            <span className="social-tooltip">{social.name}</span>
          </motion.a>
        ))}
      </div>
    </motion.div>
  );
};

export default SocialFollow;
