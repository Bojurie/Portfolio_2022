// src/api/axiosInstance.js
import axios from "axios";

const trim = (s = "") => String(s).replace(/\/+$/, "");

function resolveBaseURL() {
  // Optional runtime override (helpful in previews)
  if (typeof window !== "undefined" && window.__API_BASE__) {
    return trim(window.__API_BASE__);
  }
  // Production: set REACT_APP_API_BASE to your deployed API origin + /api/v1
  const envUrl =
    process.env.REACT_APP_API_BASE || process.env.REACT_APP_API_URL;
  if (envUrl) return trim(envUrl);

  // Development: rely on CRA proxy (setupProxy.js). Keep it relative.
  return "/api/v1";
}

const instance = axios.create({
  baseURL: resolveBaseURL(),
  withCredentials: true, // required for httpOnly cookie auth
  timeout: 20_000,
  headers: {
    "Content-Type": "application/json",
    "X-Requested-With": "XMLHttpRequest",
  },
});

export default instance;
