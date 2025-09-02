import axios from "axios";

const trim = (s = "") => String(s).replace(/\/+$/, "");

function resolveBaseURL() {
  if (typeof window !== "undefined" && window.__API_BASE__) {
    return trim(window.__API_BASE__); 
  }
  const envUrl =
    process.env.REACT_APP_API_BASE || process.env.REACT_APP_API_URL;
  if (envUrl) return trim(envUrl);
  return "/api/v1";
}

const instance = axios.create({
  baseURL: resolveBaseURL(),
  withCredentials: true, 
  timeout: 20000,
  headers: {
    "Content-Type": "application/json",
    "X-Requested-With": "XMLHttpRequest",
  },
});
export default instance;
