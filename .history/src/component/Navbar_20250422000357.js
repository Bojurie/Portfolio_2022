import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FiHome, FiUser, FiCode, FiMail, FiFileText } from "react-icons/fi";
import "./Navbar.css";

const Navbar = () => {
  const [navbarOpen, setNavbarOpen] = useState(false);

  const handleToggle = () => {
    setNavbarOpen((prev) => !prev);
  };

  const navItems = [
    { path: "/", name: "Home", icon: <FiHome /> },
    { path: "/about", name: "About", icon: <FiUser /> },
    { path: "/project", name: "Projects", icon: <FiCode /> },
    { path: "/contact", name: "Contact", icon: <FiMail /> },
    { path: "/resume", name: "Resume", icon: <FiFileText /> },
  ];

  return (
    <motion.nav
      className="nav"
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="navbar-container">
        <div className="logo">
          <Link
            className="logo-link"
            to="/"
            onClick={() => setNavbarOpen(false)}
          >
            <motion.h2 whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              B|R-W
            </motion.h2>
          </Link>
        </div>

        <motion.button
          className="menu-toggle"
          onClick={handleToggle}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {navbarOpen ? "✖" : "☰"}
        </motion.button>

        {/* Desktop Menu */}
        <ul className="nav-links-desktop">
          {navItems.map((item) => (
            <motion.li
              key={item.path}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link to={item.path} className="nav-link">
                <span className="nav-icon">{item.icon}</span>
                {item.name}
              </Link>
            </motion.li>
          ))}
        </ul>

        {/* Mobile Menu */}
        <AnimatePresence>
          {navbarOpen && (
            <motion.div
              className="mobile-menu-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleToggle}
            >
              <motion.ul
                className="nav-links-mobile"
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                onClick={(e) => e.stopPropagation()}
              >
                {navItems.map((item) => (
                  <motion.li key={item.path} whileHover={{ x: 5 }}>
                    <Link
                      to={item.path}
                      onClick={handleToggle}
                      className="mobile-nav-link"
                    >
                      <span className="nav-icon">{item.icon}</span>
                      {item.name}
                    </Link>
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar;
