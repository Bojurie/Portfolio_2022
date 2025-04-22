import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import "./Navbar.css";

const Navbar = () => {
  const [navbarOpen, setNavbarOpen] = useState(false);

  const handleToggle = () => {
    setNavbarOpen((prev) => !prev);
  };

  return (
    <motion.nav
      className="nav"
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="Navbar">
        <div className="logo">
          <Link className="anchor" to="/" onClick={() => setNavbarOpen(false)}>
            <h2>B|R-W</h2>
          </Link>
        </div>

        <button className="menu-toggle" onClick={handleToggle}>
          {navbarOpen ? "✖" : "☰"}
        </button>

        {/* Desktop Menu */}
        <ul className="nav-links-desktop">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/project">Projects</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
          <li>
            <Link to="/resume">Resume</Link>
          </li>
        </ul>

        {/* Mobile Menu */}
        <AnimatePresence>
          {navbarOpen && (
            <motion.ul
              className="nav-links-mobile"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <li>
                <Link to="/" onClick={handleToggle}>
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" onClick={handleToggle}>
                  About
                </Link>
              </li>
              <li>
                <Link to="/project" onClick={handleToggle}>
                  Projects
                </Link>
              </li>
              <li>
                <Link to="/contact" onClick={handleToggle}>
                  Contact
                </Link>
              </li>
              <li className="resume">
                <Link to="/resume" onClick={handleToggle}>
                  Resume
                </Link>
              </li>
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar;
