import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiHome,
  FiUser,
  FiBriefcase,
  FiCode,
  FiMail,
  FiFileText,
  FiX,
  FiMenu,
  FiGithub,
  FiLinkedin,
  FiTwitter,
} from "react-icons/fi";

const Navbar = () => {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const handleToggle = () => {
    setNavbarOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setNavbarOpen(false);
  }, [location]);

  const navItems = [
    { path: "/", name: "Home", icon: <FiHome /> },
    { path: "/about", name: "About", icon: <FiUser /> },
    { path: "/experience", name: "Experience", icon: <FiBriefcase /> },
    { path: "/projects", name: "Projects", icon: <FiCode /> },
    { path: "/contact", name: "Contact", icon: <FiMail /> },
    { path: "/resume", name: "Resume", icon: <FiFileText /> },
  ];

  const socialLinks = [
    { href: "https://github.com", icon: <FiGithub />, label: "GitHub" },
    { href: "https://linkedin.com", icon: <FiLinkedin />, label: "LinkedIn" },
    { href: "https://twitter.com", icon: <FiTwitter />, label: "Twitter" },
  ];

  return (
    <motion.nav
      className={`nav ${scrolled ? "scrolled" : ""}`}
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <div className="nav-container">
        <motion.div
          className="logo"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link className="logo-link" to="/" aria-label="Home">
            <motion.span
              className="logo-text"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <span className="logo-gradient">B</span>|
              <span className="logo-gradient">RW</span>
            </motion.span>
          </Link>
        </motion.div>

        {/* Desktop Navigation */}
        <ul className="nav-menu">
          {navItems.map((item, index) => (
            <motion.li
              key={item.path}
              className="nav-item"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
            >
              <Link
                to={item.path}
                className={`nav-link ${
                  location.pathname === item.path ? "active" : ""
                }`}
                aria-current={
                  location.pathname === item.path ? "page" : undefined
                }
              >
                <span className="nav-icon">{item.icon}</span>
                <span className="nav-text">{item.name}</span>
                <span className="nav-indicator"></span>
              </Link>
            </motion.li>
          ))}
        </ul>

        {/* Social Links */}
        <motion.div
          className="nav-social"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          {socialLinks.map((social, index) => (
            <a
              key={index}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
              aria-label={social.label}
            >
              {social.icon}
            </a>
          ))}
        </motion.div>

        {/* Mobile Toggle */}
        <motion.button
          className="nav-toggle"
          onClick={handleToggle}
          aria-label="Toggle navigation menu"
          aria-expanded={navbarOpen}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          {navbarOpen ? <FiX /> : <FiMenu />}
        </motion.button>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {navbarOpen && (
            <>
              <motion.div
                className="nav-backdrop"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={handleToggle}
              />

              <motion.div
                className="nav-mobile"
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                <div className="nav-mobile-content">
                  <ul className="nav-mobile-menu">
                    {navItems.map((item, index) => (
                      <motion.li
                        key={item.path}
                        className="nav-mobile-item"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <Link
                          to={item.path}
                          className={`nav-mobile-link ${
                            location.pathname === item.path ? "active" : ""
                          }`}
                          onClick={handleToggle}
                        >
                          <span className="nav-icon">{item.icon}</span>
                          <span className="nav-text">{item.name}</span>
                        </Link>
                      </motion.li>
                    ))}
                  </ul>

                  <motion.div
                    className="nav-mobile-social"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: navItems.length * 0.1 + 0.2 }}
                  >
                    {socialLinks.map((social, index) => (
                      <a
                        key={index}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="social-link"
                        aria-label={social.label}
                      >
                        {social.icon}
                      </a>
                    ))}
                  </motion.div>

                  <motion.div
                    className="nav-mobile-footer"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: navItems.length * 0.1 + 0.4 }}
                  >
                    <p>Let's build something amazing together</p>
                  </motion.div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar;
