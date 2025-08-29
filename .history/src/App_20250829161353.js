import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

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

const App = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Initialize dark mode from localStorage or system preference
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

    // Listen for system preference changes
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleSystemThemeChange = (e) => {
      if (!localStorage.getItem("darkMode")) {
        setDarkMode(e.matches);
        document.documentElement.setAttribute(
          "data-theme",
          e.matches ? "dark" : "light"
        );
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
    };
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);

    // Update data attribute for CSS custom properties
    document.documentElement.setAttribute(
      "data-theme",
      newDarkMode ? "dark" : "light"
    );
    localStorage.setItem("darkMode", newDarkMode.toString());
  };

  return (
    <Router>
      <div className="app" data-theme={darkMode ? "dark" : "light"}>
        <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        <main className="main-content">
          <AnimatedRoutes />
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
