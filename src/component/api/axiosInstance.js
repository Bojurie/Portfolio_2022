// src/lib/axiosInstance.js
import axios from "axios";

const trim = (s = "") => String(s).replace(/\/+$/, "");

function resolveBaseURL() {
  // (a) runtime override (handy for previews)
  if (typeof window !== "undefined" && window.__API_BASE__) {
    return trim(window.__API_BASE__);
  }
  // (b) explicit env for production builds
  if (process.env.REACT_APP_API_URL) {
    return trim(process.env.REACT_APP_API_URL);
  }
  // (c) dev default: let CRA proxy handle /api -> :5001
  return "/api/v1";
}

const axiosInstance = axios.create({
  baseURL: resolveBaseURL(),
  withCredentials: true, // <-- REQUIRED for cookie auth
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
    "X-Requested-With": "XMLHttpRequest",
  },
});

axiosInstance.interceptors.response.use(
  (res) => res,
  (err) => {
    const { status } = err.response || {};
    if (status === 401) {
      // if you also stored anything in localStorage, clear it:
      localStorage.removeItem("authToken");
      localStorage.removeItem("authUser");
      localStorage.removeItem("authTokenExpiry");
      if (!window.location.pathname.includes("/login")) {
        window.location.href = "/login";
      }
    }
    return Promise.reject(err);
  }
);

export default axiosInstance;
