// Create a new component called LinkHandler.jsx
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const LinkHandler = () => {
  const location = useLocation();

  useEffect(() => {
    // Extract query parameters from URL
    const queryParams = new URLSearchParams(location.search);
    const section = queryParams.get("section");

    if (section) {
      // If there's a section parameter, scroll to it
      setTimeout(() => {
        const element = document.getElementById(section);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 300);
    } else if (location.hash) {
      // Handle hash links
      setTimeout(() => {
        const element = document.querySelector(location.hash);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 300);
    } else {
      // Default behavior: scroll to top
      window.scrollTo(0, 0);
    }
  }, [location]);

  return null;
};

export default LinkHandler;
