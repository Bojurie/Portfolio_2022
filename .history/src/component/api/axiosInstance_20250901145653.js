import axios from "axios";

const trim = (s = "") => String(s).replace(/\/+$/, "");

function resolveBaseURL() {
  if (typeof window !== "undefined" && window.__API_BASE__) {
    return trim(window.__API_BASE__);
  }

  const envUrl = process.env.REACT_APP_API_URL;
  if (envUrl) return trim(envUrl);

  if (typeof window !== "undefined" && window.location.port === "3000") {
    return "/api/v1";
  }

  return "http://localhost:5001/api/v1";
}

export function setApiBase(nextBase) {
  const base = trim(nextBase);
  instance.defaults.baseURL = base;
  if (process.env.NODE_ENV === "development") {
    console.info(`[axios] baseURL overridden -> ${base}`);
  }
}

const baseURL = resolveBaseURL();

const instance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
    "X-Requested-With": "XMLHttpRequest",
  },
  withCredentials: true,
  timeout: 20000, // 20s safety timeout
});

if (process.env.NODE_ENV === "development") {
  console.info(`[axios] baseURL = ${baseURL}`);
}

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

instance.interceptors.response.use(
  (res) => res,
  (error) => {
    const status = error.response?.status;

    if (status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("tokenExpiry");
      localStorage.removeItem("user");
      if (!/\/login$/.test(window.location.pathname)) {
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

export default instance;
