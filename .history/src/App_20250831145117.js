import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
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

const AnimatedRoutes = () => {
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
                  <Component />
                </motion.div>
              }
            />
          ))}
        </Routes>
      </AnimatePresence>
    </>
  );
};

const App = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [themeMode, setThemeMode] = useState("auto");

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

    // Service worker registration (production only)
    if ("serviceWorker" in navigator && process.env.NODE_ENV === "production") {
      navigator.serviceWorker.register("/sw.js").catch(console.error);
    }
  }, [applyTheme]);

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
          <AnimatedRoutes />
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
