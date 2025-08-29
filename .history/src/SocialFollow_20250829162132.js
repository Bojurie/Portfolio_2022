import React from "react";
import { motion } from "framer-motion";
import {
  FiGithub,
  FiLinkedin,
  FiTwitter,
  FiInstagram,
  FiMail,
} from "react-icons/fi";
import "./SocialFollow.scss";

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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  };

  return (
    <motion.div
      className="social-container"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
    >
      <motion.h3
        className="social-title"
        variants={itemVariants}
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
      >
        CONNECT <span className="highlight">WITH ME</span>
      </motion.h3>

      <motion.div className="social-links" variants={containerVariants}>
        {socialLinks.map((social, index) => (
          <motion.a
            key={index}
            href={social.url}
            className="social-link"
            target="_blank"
            rel="noopener noreferrer"
            variants={itemVariants}
            whileHover={{
              y: -8,
              scale: 1.15,
              backgroundColor: `${social.color}20`,
              boxShadow: `0 10px 25px ${social.color}40`,
            }}
            whileTap={{ scale: 0.9 }}
            style={{
              color: social.color,
              "--social-color": social.color,
            }}
            aria-label={social.name}
          >
            <span className="social-icon-wrapper">{social.icon}</span>
            <span className="social-tooltip">{social.name}</span>
            <span className="social-pulse"></span>
          </motion.a>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default SocialFollow;
