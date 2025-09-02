import React, { useState, useEffect, useMemo, useCallback } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
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
  FiLogOut,
  FiLogIn,
  FiUserPlus,
} from "react-icons/fi";
import { useAuth } from "./contexts/authContext"; // ✅ uses your AuthContext
import "./navbar.scss";

const Navbar = ({ darkMode, toggleDarkMode, themeMode, enableAutoTheme }) => {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showThemeOptions, setShowThemeOptions] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const { user, isAuthenticated, logout } = useAuth();

  const handleToggle = () => setNavbarOpen((prev) => !prev);

  const handleThemeOptionClick = (option) => {
    if (option === "auto") {
      enableAutoTheme();
    } else {
      // keep the signature you already use: toggleDarkMode expects boolean
      toggleDarkMode(option === "dark");
    }
    setShowThemeOptions(false);
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // close mobile drawer when route changes
  useEffect(() => setNavbarOpen(false), [location]);

  const navItems = useMemo(
    () => [
      { path: "/", name: "Home", icon: <FiHome /> },
      { path: "/about", name: "About", icon: <FiUser /> },
      { path: "/experience", name: "Experience", icon: <FiBriefcase /> },
      { path: "/projects", name: "Projects", icon: <FiCode /> },
      { path: "/contact", name: "Contact", icon: <FiMail /> },
      { path: "/resume", name: "Resume", icon: <FiFileText /> },
    ],
    []
  );

  const socialLinks = useMemo(
    () => [
      {
        href: "https://github.com/Bojurie",
        icon: <FiGithub />,
        label: "GitHub",
      },
      {
        href: "https://www.linkedin.com/in/bojurie-rogers-wright/",
        icon: <FiLinkedin />,
        label: "LinkedIn",
      },
      { href: "https://x.com/BojurieW", icon: <FiTwitter />, label: "Twitter" },
    ],
    []
  );

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
    exit: { x: "100%", opacity: 0, transition: { duration: 0.3 } },
  };

  const navItemVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0 },
  };

  const initials = useMemo(() => {
    const base = (user?.name || user?.email || "").trim();
    if (!base) return "";
    const parts = base.split(" ").filter(Boolean);
    const s = (parts[0]?.[0] || "") + (parts[1]?.[0] || "");
    return s.toUpperCase();
  }, [user]);

  const onLogout = useCallback(async () => {
    await logout();
    setNavbarOpen(false);
  }, [logout]);

  return (
    <motion.nav
      className={`nav ${scrolled ? "scrolled" : ""}`}
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <div className="nav-container">
        {/* Logo */}
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

        {/* Right Side: Social, Theme, Auth */}
        <div className="nav-right">
          {/* Social */}
          <motion.div
            className="nav-social"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            {socialLinks.map((s, i) => (
              <a
                key={i}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                aria-label={s.label}
              >
                {s.icon}
              </a>
            ))}
          </motion.div>

          {/* Theme */}
          <div className="theme-toggle-container">
            <button
              className="theme-toggle"
              onClick={() => setShowThemeOptions((v) => !v)}
              aria-label="Theme options"
              aria-expanded={showThemeOptions}
              data-theme-mode={themeMode}
            >
              {themeMode === "auto" ? (
                <FiWatch />
              ) : darkMode ? (
                <FiSun />
              ) : (
                <FiMoon />
              )}
            </button>
            <AnimatePresence>
              {showThemeOptions && (
                <motion.div
                  className="theme-options"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <button
                    className={`theme-option ${
                      themeMode === "light" ? "active" : ""
                    }`}
                    onClick={() => handleThemeOptionClick("light")}
                    aria-label="Light theme"
                  >
                    <FiSun /> Light
                  </button>
                  <button
                    className={`theme-option ${
                      themeMode === "dark" ? "active" : ""
                    }`}
                    onClick={() => handleThemeOptionClick("dark")}
                    aria-label="Dark theme"
                  >
                    <FiMoon /> Dark
                  </button>
                  <button
                    className={`theme-option ${
                      themeMode === "auto" ? "active" : ""
                    }`}
                    onClick={() => handleThemeOptionClick("auto")}
                    aria-label="Auto theme"
                  >
                    <FiWatch /> Auto
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Auth (desktop) */}
          <div className="auth-actions">
            {isAuthenticated ? (
              <>
                <div className="avatar" title={user?.name || user?.email}>
                  {user?.avatar ? (
                    <img src={user.avatar} alt="avatar" />
                  ) : (
                    <span>{initials || "U"}</span>
                  )}
                </div>
                <button
                  className="btn btn--secondary auth-btn"
                  onClick={onLogout}
                  aria-label="Logout"
                >
                  <FiLogOut /> <span className="hide-sm">Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link
                  className="btn btn--secondary auth-btn"
                  to="/login"
                  aria-label="Login"
                >
                  <FiLogIn /> <span className="hide-sm">Login</span>
                </Link>
                <Link
                  className="btn btn--primary auth-btn"
                  to="/register"
                  aria-label="Register"
                >
                  <FiUserPlus /> <span className="hide-sm">Register</span>
                </Link>
              </>
            )}
          </div>
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
                    {navItems.map((item) => (
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

                  {/* Auth (mobile) */}
                  <div className="nav-mobile-auth">
                    {isAuthenticated ? (
                      <>
                        <div
                          className="avatar avatar--mobile"
                          title={user?.name || user?.email}
                        >
                          {user?.avatar ? (
                            <img src={user.avatar} alt="avatar" />
                          ) : (
                            <span>{initials || "U"}</span>
                          )}
                        </div>
                        <button
                          className="btn btn--secondary btn--full"
                          onClick={onLogout}
                        >
                          <FiLogOut /> Logout
                        </button>
                      </>
                    ) : (
                      <div className="auth-buttons">
                        <Link
                          to="/login"
                          className="btn btn--secondary btn--full"
                          onClick={() => setNavbarOpen(false)}
                        >
                          <FiLogIn /> Login
                        </Link>
                        <Link
                          to="/register"
                          className="btn btn--primary btn--full"
                          onClick={() => setNavbarOpen(false)}
                        >
                          <FiUserPlus /> Register
                        </Link>
                      </div>
                    )}
                  </div>

                  <motion.div
                    className="nav-mobile-social"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                  >
                    {socialLinks.map((s, i) => (
                      <a
                        key={i}
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="social-link"
                        aria-label={s.label}
                      >
                        {s.icon}
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
                    <div className="mobile-theme-options">
                      <button
                        className={`theme-option ${
                          themeMode === "light" ? "active" : ""
                        }`}
                        onClick={() => handleThemeOptionClick("light")}
                      >
                        <FiSun /> Light
                      </button>
                      <button
                        className={`theme-option ${
                          themeMode === "dark" ? "active" : ""
                        }`}
                        onClick={() => handleThemeOptionClick("dark")}
                      >
                        <FiMoon /> Dark
                      </button>
                      <button
                        className={`theme-option ${
                          themeMode === "auto" ? "active" : ""
                        }`}
                        onClick={() => handleThemeOptionClick("auto")}
                      >
                        <FiWatch /> Auto
                      </button>
                    </div>
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
