import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "./component/contexts/authContext";

const ThemeToaster = () => {
  const getTheme = () =>
    document.documentElement.getAttribute("data-theme") === "dark"
      ? "dark"
      : "light";

  const [theme, setTheme] = useState(getTheme());

  useEffect(() => {
    const obs = new MutationObserver(() => setTheme(getTheme()));
    obs.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
    return () => obs.disconnect();
  }, []);

  return (
    <ToastContainer
      theme={theme}
      position="top-right"
      autoClose={3000}
      newestOnTop
      closeOnClick
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <BrowserRouter basename={process.env.REACT_APP_BASENAME || "/"}>
      <AuthProvider>
        <App />
        <ThemeToaster />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
