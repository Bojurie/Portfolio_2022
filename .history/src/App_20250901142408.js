import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState, useCallback } from "react";

// Core pages
import Home from "./component/pages/Home";
import About from "./component/pages/About";
import Projects from "./component/pages/Project";
import Contact from "./component/pages/Contact";
import Resume from "./component/pages/Resume";
import Header from "./component/Header";
import Footer from "./component/pages/Footer";
import Experience from "./component/pages/Experience";
import ProjectsPage from "./component/ProjectsPage";

// Auth pages (you created these earlier)
import Login from "./component/pages/Login";
import Register from "./component/pages/Register";
import Dashboard from "./component/pages/Dashboard";

// Auth context (guards use this)
import { useAuth } from "./component/contexts/authContext";

import "./App.scss";

const pageVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => window.scrollTo(0, 0), [pathname]);
  return null;
};

/* -------------------------- Route Guards -------------------------- */

const ProtectedRoute = ({ children, roles }) => {
  const { user, isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="app-loading">
        <div className="loading-spinner">
          <div className="spinner" />
          <p>Loading…</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  // role-gated route (e.g., admin dashboard)
  if (roles && roles.length > 0 && !roles.includes(user?.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

const PublicOnly = ({ children }) => {
  const { isAuthenticated, user } = useAuth();
  if (isAuthenticated) {
    // send admins to dashboard; others to home
    return (
      <Navigate
        to={user?.role === "admin" ? "/admin/dashboard" : "/"}
        replace
      />
    );
  }
  return children;
};

/* ----------------------- Animated route shell ---------------------- */

const AnimatedRoutes = ({
  darkMode,
  themeMode,
  toggleDarkMode,
  enableAutoTheme,
}) => {
  const location = useLocation();

  const routes = [
    { path: "/", component: Home },
    { path: "/about", component: About },
    { path: "/projects", component: Projects },
    { path: "/projects/all", component: ProjectsPage },
    { path: "/experience", component: Experience },
    { path: "/contact", component: Contact },
    { path: "/resume", component: Resume },
  ];

  return (
    <>
      <ScrollToTop />
      <AnimatePresence mode="wait" initial={false}>
        <Routes location={location} key={location.pathname}>
          {/* Public content */}
          {routes.map(({ path, component: Component }) => (
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

          {/* Auth routes (public-only) */}
          <Route
            path="/login"
            element={
              <PublicOnly>
                <motion.div
                  variants={pageVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={{ duration: 0.3 }}
                >
                  <Login />
                </motion.div>
              </PublicOnly>
            }
          />
          <Route
            path="/register"
            element={
              <PublicOnly>
                <motion.div
                  variants={pageVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={{ duration: 0.3 }}
                >
                  <Register />
                </motion.div>
              </PublicOnly>
            }
          />

          {/* Admin dashboard (protected + role-gated) */}
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute roles={["admin"]}>
                <motion.div
                  variants={pageVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={{ duration: 0.3 }}
                >
                  <Dashboard />
                </motion.div>
              </ProtectedRoute>
            }
          />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AnimatePresence>
    </>
  );
};

/* ----------------------------- App shell ----------------------------- */

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

    setIsLoaded(true);

    if ("serviceWorker" in navigator && process.env.NODE_ENV === "production") {
      navigator.serviceWorker.register("/sw.js").catch(console.error);
    }

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = (e) =>
      themeMode === "auto" && applyTheme(e.matches, "auto");
    mediaQuery.addEventListener("change", onChange);
    return () => mediaQuery.removeEventListener("change", onChange);
  }, [applyTheme, themeMode]);

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
  );
};

export default App;
