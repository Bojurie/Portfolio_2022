import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState, useCallback } from "react";

import Home from "./component/pages/Home";
import About from "./component/pages/About";
import Projects from "./component/pages/Project";
import Contact from "./component/pages/Contact";
import Resume from "./component/pages/Resume";
import Header from "./component/Header";
import Footer from "./component/pages/Footer";
import Experience from "./component/pages/Experience";

import "./App.scss";

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 0.77, 0.47, 0.97],
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.4,
      ease: "easeInOut",
    },
  },
};

const AnimatedRoutes = () => {
  const location = useLocation();

  useEffect(() => {
    // Track page views for analytics
    if (process.env.NODE_ENV === "development") {
      console.log(`Navigated to: ${location.pathname}`);
    }
  }, [location]);

  return (
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <motion.div
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <Home />
            </motion.div>
          }
        />
        <Route
          path="/about"
          element={
            <motion.div
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <About />
            </motion.div>
          }
        />
        <Route
          path="/projects"
          element={
            <motion.div
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <Projects />
            </motion.div>
          }
        />
        <Route
          path="/experience"
          element={
            <motion.div
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <Experience />
            </motion.div>
          }
        />
        <Route
          path="/contact"
          element={
            <motion.div
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <Contact />
            </motion.div>
          }
        />
        <Route
          path="/resume"
          element={
            <motion.div
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <Resume />
            </motion.div>
          }
        />
      </Routes>
    </AnimatePresence>
  );
};

// Time-based theme utility functions
const getTimeBasedTheme = () => {
  const now = new Date();
  const hours = now.getHours();

  // Define time ranges for different themes
  const isNightTime = hours >= 18 || hours < 6; // 6 PM to 6 AM
  const isDayTime = hours >= 6 && hours < 18; // 6 AM to 6 PM

  return isNightTime ? "dark" : isDayTime ? "light" : "auto";
};

const scheduleNextThemeChange = (callback) => {
  const now = new Date();
  const hours = now.getHours();
  let nextChange;

  if (hours < 6) {
    // Before 6 AM, next change at 6 AM
    nextChange = new Date(now);
    nextChange.setHours(6, 0, 0, 0);
  } else if (hours < 18) {
    // Before 6 PM, next change at 6 PM
    nextChange = new Date(now);
    nextChange.setHours(18, 0, 0, 0);
  } else {
    // After 6 PM, next change at 6 AM next day
    nextChange = new Date(now);
    nextChange.setDate(nextChange.getDate() + 1);
    nextChange.setHours(6, 0, 0, 0);
  }

  const timeUntilChange = nextChange.getTime() - now.getTime();

  return setTimeout(() => {
    callback();
    scheduleNextThemeChange(callback); // Schedule next change
  }, timeUntilChange);
};

const App = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [themeMode, setThemeMode] = useState("auto"); // 'auto', 'light', 'dark'
  const [themeChangeTimeout, setThemeChangeTimeout] = useState(null);

  const applyTheme = useCallback((isDark, mode) => {
    setDarkMode(isDark);
    setThemeMode(mode);
    document.documentElement.setAttribute(
      "data-theme",
      isDark ? "dark" : "light"
    );
    localStorage.setItem("darkMode", isDark.toString());
    localStorage.setItem("themeMode", mode);
  }, []);

  const toggleDarkMode = useCallback(() => {
    const newMode =
      themeMode === "auto"
        ? "manual"
        : themeMode === "light"
        ? "dark"
        : "light";
    const isDark = newMode === "dark";

    applyTheme(isDark, newMode);

    // Clear any scheduled theme changes when manually toggling
    if (themeChangeTimeout) {
      clearTimeout(themeChangeTimeout);
      setThemeChangeTimeout(null);
    }
  }, [themeMode, applyTheme, themeChangeTimeout]);

  const enableAutoTheme = useCallback(() => {
    const timeBasedTheme = getTimeBasedTheme();
    const isDark = timeBasedTheme === "dark";

    applyTheme(isDark, "auto");

    // Schedule next theme change
    if (themeChangeTimeout) {
      clearTimeout(themeChangeTimeout);
    }

    const timeout = scheduleNextThemeChange(() => {
      if (themeMode === "auto") {
        const newTimeBasedTheme = getTimeBasedTheme();
        applyTheme(newTimeBasedTheme === "dark", "auto");
      }
    });

    setThemeChangeTimeout(timeout);
  }, [applyTheme, themeMode, themeChangeTimeout]);

  useEffect(() => {
    // Initialize theme from localStorage or system preference
    const savedDarkMode = localStorage.getItem("darkMode");
    const savedThemeMode = localStorage.getItem("themeMode");
    const systemPrefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    if (savedThemeMode === "auto") {
      // Auto mode - use time-based theme
      enableAutoTheme();
    } else if (savedThemeMode === "light" || savedThemeMode === "dark") {
      // Manual mode - use saved preference
      const isDark = savedThemeMode === "dark";
      applyTheme(isDark, savedThemeMode);
    } else if (savedDarkMode !== null) {
      // Legacy support - convert old darkMode setting to themeMode
      const isDark = savedDarkMode === "true";
      applyTheme(isDark, isDark ? "dark" : "light");
    } else {
      // First visit - use system preference but set to auto mode
      applyTheme(systemPrefersDark, "auto");
      enableAutoTheme();
    }

    // Listen for system preference changes (only in auto mode)
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleSystemThemeChange = (e) => {
      if (themeMode === "auto") {
        applyTheme(e.matches, "auto");
      }
    };

    mediaQuery.addEventListener("change", handleSystemThemeChange);

    // Add service worker for PWA functionality
    if ("serviceWorker" in navigator && process.env.NODE_ENV === "production") {
      navigator.serviceWorker
        .register("/sw.js")
        .then((registration) => {
          console.log(
            "Service Worker Registered with scope:",
            registration.scope
          );
        })
        .catch((err) => {
          console.log("Service Worker Registration Failed: ", err);
        });
    }

    return () => {
      mediaQuery.removeEventListener("change", handleSystemThemeChange);
      if (themeChangeTimeout) {
        clearTimeout(themeChangeTimeout);
      }
    };
  }, [applyTheme, enableAutoTheme, themeMode]);

  return (
    <Router>
      <div
        className="app"
        data-theme={darkMode ? "dark" : "light"}
        data-theme-mode={themeMode}
      >
        <Header
          darkMode={darkMode}
          toggleDarkMode={toggleDarkMode}
          themeMode={themeMode}
          enableAutoTheme={enableAutoTheme}
        />
        <main className="main-content">
          <AnimatedRoutes />
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
