// axiosInstance.js
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:5000/api/v1",
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const { status, data } = error.response || {};

    // Handle specific error cases
    if (status === 401) {
      localStorage.removeItem("authToken");
      localStorage.removeItem("authUser");
      localStorage.removeItem("authTokenExpiry");

      if (!window.location.pathname.includes("/login")) {
        window.location.href = "/login";
      }
    }

    if (status === 429) {
      // Rate limiting
      console.warn("Rate limit exceeded:", data.message);
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
