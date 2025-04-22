// Footer.js
import React from "react";
import { motion } from "framer-motion";
import SocialFollow from "../../SocialFollow";
import "./Footer.css";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <motion.footer
      className="footer"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="footer-container">
        <div className="footer-content">
          <SocialFollow />

          <motion.div
            className="footer-legal"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <p className="footer-copyright">
              © {year} Bojurie Rogers-Wright. All Rights Reserved.
            </p>
            <div className="footer-links">
              <a href="/privacy">Privacy Policy</a>
              <span className="divider">•</span>
              <a href="/terms">Terms of Service</a>
            </div>
          </motion.div>
        </div>

        <div className="footer-accent">
          <div className="glow-bar"></div>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
