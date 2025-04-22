import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { motion } from "framer-motion";

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
      transition={{ duration: 0.5 }}
    >
      <div className="Navbar">
        <div className="logo">
          <Link className="anchor" to="/">
            <h2>B|R-W</h2>
          </Link>
        </div>

        <button className="menu-toggle" onClick={handleToggle}>
          {navbarOpen ? "✖" : "☰"}
        </button>

        <ul className={`menuNav Navbar-links ${navbarOpen ? "showMenu" : ""}`}>
          <li>
            <Link to="/" onClick={handleToggle}>
              1. Home
            </Link>
          </li>
          <li>
            <Link to="/about" onClick={handleToggle}>
              2. About
            </Link>
          </li>
          <li>
            <Link to="/project" onClick={handleToggle}>
              3. Projects
            </Link>
          </li>
          <li>
            <Link to="/contact" onClick={handleToggle}>
              4. Contact
            </Link>
          </li>
          <li className="resume">
            <Link to="/resume" onClick={handleToggle}>
              Resume
            </Link>
          </li>
        </ul>
      </div>
    </motion.nav>
  );
};

export default Navbar;
