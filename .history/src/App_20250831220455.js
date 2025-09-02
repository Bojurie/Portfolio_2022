import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState, useCallback, useMemo } from "react";

import Home from "./component/pages/Home";
import About from "./component/pages/About";
import Projects from "./component/pages/Project";
import Contact from "./component/pages/Contact";
import Resume from "./component/pages/Resume";
import Header from "./component/Header";
import Footer from "./component/pages/Footer";
import Experience from "./component/pages/Experience";

import "./App.scss";
import ProjectsPage from "./component/ProjectsPage";

// Simplified page variants
const pageVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const AnimatedRoutes = ({
  darkMode,
  themeMode,
  toggleDarkMode,
  enableAutoTheme,
}) => {
  const location = useLocation();

  return (
    <>
      <ScrollToTop />
      <AnimatePresence mode="wait" initial={false}>
        <Routes location={location} key={location.pathname}>
          {[
            { path: "/", component: Home },
            { path: "/about", component: About },
            { path: "/projects", component: Projects },
            { path: "/projects/all", component: ProjectsPage },
            { path: "/experience", component: Experience },
            { path: "/contact", component: Contact },
            { path: "/resume", component: Resume },
          ].map(({ path, component: Component }) => (
            <Route
              key={path}
              path={path}
              element={
                <motion.div
                  variants={pageVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={{ duration: 0.3 }}
                >
                  <Component
                    darkMode={darkMode}
                    themeMode={themeMode}
                    toggleDarkMode={toggleDarkMode}
                    enableAutoTheme={enableAutoTheme}
                  />
                </motion.div>
              }
            />
          ))}
          {/* Redirect any unknown routes to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AnimatePresence>
    </>
  );
};

const App = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [themeMode, setThemeMode] = useState("auto");
  const [isLoaded, setIsLoaded] = useState(false);

  const applyTheme = useCallback((isDark, mode) => {
    setDarkMode(isDark);
    setThemeMode(mode);
    document.documentElement.setAttribute(
      "data-theme",
      isDark ? "dark" : "light"
    );
    localStorage.setItem("themeMode", mode);
  }, []);

  const toggleDarkMode = useCallback(() => {
    const newMode =
      themeMode === "auto" ? "light" : themeMode === "light" ? "dark" : "auto";
    const isDark =
      newMode === "dark" ||
      (newMode === "auto" &&
        window.matchMedia("(prefers-color-scheme: dark)").matches);

    applyTheme(isDark, newMode);
  }, [themeMode, applyTheme]);

  const enableAutoTheme = useCallback(() => {
    const systemPrefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    applyTheme(systemPrefersDark, "auto");
  }, [applyTheme]);

  useEffect(() => {
    // Initialize theme
    const savedThemeMode = localStorage.getItem("themeMode");
    const systemPrefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    if (savedThemeMode) {
      const isDark =
        savedThemeMode === "dark" ||
        (savedThemeMode === "auto" && systemPrefersDark);
      applyTheme(isDark, savedThemeMode);
    } else {
      applyTheme(systemPrefersDark, "auto");
    }

    // Set app as loaded
    setIsLoaded(true);

    // Service worker registration (production only)
    if ("serviceWorker" in navigator && process.env.NODE_ENV === "production") {
      navigator.serviceWorker.register("/sw.js").catch(console.error);
    }

    // Listen for system theme changes
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleSystemThemeChange = (e) => {
      if (themeMode === "auto") {
        applyTheme(e.matches, "auto");
      }
    };

    mediaQuery.addEventListener("change", handleSystemThemeChange);

    return () => {
      mediaQuery.removeEventListener("change", handleSystemThemeChange);
    };
  }, [applyTheme, themeMode]);

  // Add loading state for better UX
  if (!isLoaded) {
    return (
      <div className="app-loading">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading Portfolio...</p>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <div className="app" data-theme={darkMode ? "dark" : "light"}>
        <Header
          darkMode={darkMode}
          toggleDarkMode={toggleDarkMode}
          themeMode={themeMode}
          enableAutoTheme={enableAutoTheme}
        />
        <main className="main-content">
          <AnimatedRoutes
            darkMode={darkMode}
            themeMode={themeMode}
            toggleDarkMode={toggleDarkMode}
            enableAutoTheme={enableAutoTheme}
          />
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
