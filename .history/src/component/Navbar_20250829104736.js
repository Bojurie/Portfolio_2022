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
  FiSun,
  FiMoon,
} from "react-icons/fi";
import "./navbar.scss";

const Navbar = () => {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const location = useLocation();

  const handleToggle = () => {
    setNavbarOpen((prev) => !prev);
  };

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);

    // Update data attribute for CSS custom properties
    document.documentElement.setAttribute(
      "data-theme",
      newDarkMode ? "dark" : "light"
    );

    // Save preference to localStorage
    localStorage.setItem("darkMode", newDarkMode.toString());
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    // Check system preference and localStorage for dark mode
    const savedDarkMode = localStorage.getItem("darkMode");
    const systemPrefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    const initialDarkMode =
      savedDarkMode !== null ? savedDarkMode === "true" : systemPrefersDark;

    setDarkMode(initialDarkMode);
    document.documentElement.setAttribute(
      "data-theme",
      initialDarkMode ? "dark" : "light"
    );

    window.addEventListener("scroll", handleScroll, { passive: true });
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
    { href: "https://github.com/Bojurie", icon: <FiGithub />, label: "GitHub" },
    { href: "https://linkedin.com", icon: <FiLinkedin />, label: "LinkedIn" },
    { href: "https://twitter.com", icon: <FiTwitter />, label: "Twitter" },
  ];

  const mobileNavVariants = {
    hidden: { x: "100%", opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
        staggerChildren: 0.1,
      },
    },
    exit: {
      x: "100%",
      opacity: 0,
      transition: {
        duration: 0.3,
      },
    },
  };

  const navItemVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0 },
  };

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

        {/* Right Side - Social Links & Dark Mode Toggle */}
        <div className="nav-right">
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

          <button
            className="theme-toggle"
            onClick={toggleDarkMode}
            aria-label="Toggle dark mode"
          >
            {darkMode ? <FiSun /> : <FiMoon />}
          </button>
        </div>

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
                variants={mobileNavVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <div className="nav-mobile-content">
                  <div className="nav-mobile-header">
                    <span className="mobile-logo">BRW</span>
                    <button
                      className="mobile-close"
                      onClick={handleToggle}
                      aria-label="Close menu"
                    >
                      <FiX />
                    </button>
                  </div>

                  <ul className="nav-mobile-menu">
                    {navItems.map((item, index) => (
                      <motion.li
                        key={item.path}
                        className="nav-mobile-item"
                        variants={navItemVariants}
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
                    transition={{ delay: 0.6 }}
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
                    transition={{ delay: 0.8 }}
                  >
                    <p>Let's build something amazing together</p>
                    <button
                      className="theme-toggle mobile-theme-toggle"
                      onClick={toggleDarkMode}
                      aria-label="Toggle dark mode"
                    >
                      {darkMode ? <FiSun /> : <FiMoon />}
                      {darkMode ? "Light Mode" : "Dark Mode"}
                    </button>
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
