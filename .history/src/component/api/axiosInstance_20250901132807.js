// src/api/axiosInstance.js
import axios from "axios";

const trim = (s = "") => String(s).replace(/\/+$/, "");

// Resolve base once; in dev we rely on CRA proxy (`setupProxy.js`) so keep relative `/api/v1`
function resolveBaseURL() {
  if (typeof window !== "undefined" && window.__API_BASE__) {
    return trim(window.__API_BASE__); // optional global override
  }
  const envUrl =
    process.env.REACT_APP_API_BASE || process.env.REACT_APP_API_URL;
  if (envUrl) return trim(envUrl);
  // Default to relative path so proxy/same-origin deploys work
  return "/api/v1";
}

const instance = axios.create({
  baseURL: resolveBaseURL(),
  withCredentials: true, // <<< IMPORTANT for httpOnly cookies
  timeout: 20000,
  headers: {
    "Content-Type": "application/json",
    "X-Requested-With": "XMLHttpRequest",
  },
});

// No Authorization header needed for cookie-based auth.
// If you *also* support Bearer tokens, you can set it here.

export default instance;
