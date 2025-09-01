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
  FiWatch,
} from "react-icons/fi";
import "./navbar.scss";

const Navbar = ({ darkMode, toggleDarkMode, themeMode }) => {
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
    {
      href: "https://www.linkedin.com/in/bojurie-rogers-wright/",
      icon: <FiLinkedin />,
      label: "LinkedIn",
    },
    { href: "https://x.com/BojurieW", icon: <FiTwitter />, label: "Twitter" },
  ];

  return (
    <motion.nav
      className={`nav ${scrolled ? "scrolled" : ""}`}
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="nav-container">
        <div className="logo">
          <Link className="logo-link" to="/" aria-label="Home">
            <span className="logo-text">
              <span className="logo-gradient">B</span>|
              <span className="logo-gradient">RW</span>
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <ul className="nav-menu">
          {navItems.map((item) => (
            <li key={item.path} className="nav-item">
              <Link
                to={item.path}
                className={`nav-link ${
                  location.pathname === item.path ? "active" : ""
                }`}
              >
                <span className="nav-icon">{item.icon}</span>
                <span className="nav-text">{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>

        <div className="nav-right">
          <div className="nav-social">
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
          </div>

          <button
            className="theme-toggle"
            onClick={toggleDarkMode}
            aria-label="Toggle theme"
          >
            {themeMode === "auto" ? (
              <FiWatch />
            ) : darkMode ? (
              <FiSun />
            ) : (
              <FiMoon />
            )}
          </button>
        </div>

        {/* Mobile Toggle */}
        <button
          className="nav-toggle"
          onClick={handleToggle}
          aria-label="Toggle navigation menu"
          aria-expanded={navbarOpen}
        >
          {navbarOpen ? <FiX /> : <FiMenu />}
        </button>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {navbarOpen && (
            <>
              <div className="nav-backdrop" onClick={handleToggle} />
              <div className="nav-mobile">
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
                    {navItems.map((item) => (
                      <li key={item.path} className="nav-mobile-item">
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
                      </li>
                    ))}
                  </ul>

                  <div className="nav-mobile-social">
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
                  </div>
                </div>
              </div>
            </>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar;
