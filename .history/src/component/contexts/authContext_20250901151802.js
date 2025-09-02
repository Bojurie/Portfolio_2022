import React, {
  createContext,
  useState,
  useEffect,
  useCallback,
  useContext,
  useRef,
} from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import { toast } from "react-toastify";
import { handleApiError } from "../utils/handleApiError";
import {
  saveToken,
  getToken,
  saveUser,
  getUser,
  removeToken,
  removeUser,
  clearAuthData,
  getTokenExpiry,
  setTokenExpiry,
  isTokenExpired,
  migrateAuthData,
} from "../localStorageService"; 

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    migrateAuthData();
  }, []);

  const [user, setUser] = useState(() => getUser());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const wasAuthed = useRef(!!user);
  const refreshTimeoutRef = useRef(null);

  const setUserState = useCallback((userData) => {
    setUser(userData);
    saveUser(userData);
  }, []);

  const clearAuth = useCallback(() => {
    setUserState(null);
    removeToken();
    removeUser();
    if (refreshTimeoutRef.current) {
      clearTimeout(refreshTimeoutRef.current);
      refreshTimeoutRef.current = null;
    }
  }, [setUserState]);

  const refresh = useCallback(async () => {
    try {
      const { data } = await axiosInstance.get("/auth/me");
      const userData = data?.user || null;
      setUserState(userData);
      setError(null);
      return userData;
    } catch (error) {
      if (error.response?.status === 401) {
        clearAuth();
      }
      return null;
    }
  }, [setUserState, clearAuth]);

  const scheduleTokenRefresh = useCallback(() => {
    const expiry = getTokenExpiry();
    if (!expiry) return;

    const now = Date.now();
    const timeUntilExpiry = expiry - now;

    const refreshTime = Math.max(0, timeUntilExpiry - 5 * 60 * 1000);

    if (refreshTimeoutRef.current) {
      clearTimeout(refreshTimeoutRef.current);
    }

    if (refreshTime > 0) {
      refreshTimeoutRef.current = setTimeout(() => {
        refresh();
      }, refreshTime);
    }
  }, [refresh]);

  const login = useCallback(
    async (credentials, options = {}) => {
      const { redirect = true, silent = false } = options;

      setError(null);
      setLoading(true);

      try {
        const { data } = await axiosInstance.post("/auth/login", credentials);

        if (!data?.user || !data?.token) {
          throw new Error("Invalid response from server");
        }
        saveToken(data.token);
        setUserState(data.user);

        if (data.tokenExpiry) {
          setTokenExpiry(data.tokenExpiry);
          scheduleTokenRefresh();
        }

        if (redirect) {
          const from = location.state?.from?.pathname || "/";
          if (!silent) {
            toast.success(
              `Welcome back${data.user.name ? `, ${data.user.name}` : ""}!`
            );
          }
          navigate(from, { replace: true });
        }

        return data.user;
      } catch (error) {
        const errorMessage = error.response?.data?.message || "Login failed";
        setError(errorMessage);

        if (!silent) {
          handleApiError(error);
        }

        clearAuth();
        return null;
      } finally {
        setLoading(false);
        wasAuthed.current = true;
      }
    },
    [navigate, location.state, setUserState, clearAuth, scheduleTokenRefresh]
  );

  // Add the missing register function
  const register = useCallback(
    async (userData, options = {}) => {
      const { autoLogin = false, silent = false } = options;

      setError(null);
      setLoading(true);

      try {
        const { data } = await axiosInstance.post("/auth/register", userData);

        if (!silent) {
          toast.success("Registration successful! Please log in.");
        }

        if (autoLogin && data.token) {
          saveToken(data.token);
          setUserState(data.user);

          if (data.tokenExpiry) {
            setTokenExpiry(data.tokenExpiry);
            scheduleTokenRefresh();
          }

          navigate("/", { replace: true });
        } else {
          navigate("/login", { replace: true });
        }

        return data.user;
      } catch (error) {
        const errorMessage =
          error.response?.data?.message || "Registration failed";
        setError(errorMessage);

        if (!silent) {
          handleApiError(error);
        }

        return null;
      } finally {
        setLoading(false);
      }
    },
    [navigate, setUserState, scheduleTokenRefresh]
  );

  // Add the missing logout function
  const logout = useCallback(
    async (options = {}) => {
      const { silent = false, redirect = true } = options;

      try {
        await axiosInstance.post("/auth/logout");
      } catch (error) {
        // Continue with logout even if API call fails
        console.warn("Logout API call failed:", error);
      } finally {
        clearAuth();

        if (!silent) {
          toast.info("Logged out successfully");
        }

        if (redirect) {
          navigate("/login", { replace: true });
        }
      }
    },
    [navigate, clearAuth]
  );

  useEffect(() => {
    let isMounted = true;

    const initializeAuth = async () => {
      const token = getToken();
      const storedUser = getUser();

      if (token && isTokenExpired()) {
        if (isMounted) {
          clearAuth();
          setLoading(false);
        }
        return;
      }

      if (!token) {
        if (isMounted) {
          setLoading(false);
        }
        return;
      }

      if (token && !storedUser) {
        try {
          await refresh();
        } catch (error) {
          console.warn("Failed to refresh user data:", error);
        }
      }

      if (token && storedUser) {
        setUserState(storedUser);
        scheduleTokenRefresh();
      }

      if (isMounted) {
        setLoading(false);
      }
    };

    initializeAuth();

    return () => {
      isMounted = false;
      if (refreshTimeoutRef.current) {
        clearTimeout(refreshTimeoutRef.current);
      }
    };
  }, [refresh, setUserState, scheduleTokenRefresh, clearAuth]);

  useEffect(() => {
    const interceptorId = axiosInstance.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          if (user || wasAuthed.current) {
            clearAuth();

            const isAuthRoute = /^\/(login|register|forgot-password)/.test(
              window.location.pathname
            );

            if (!isAuthRoute) {
              navigate("/login", {
                replace: true,
                state: {
                  from: window.location.pathname,
                  message: "Your session has expired. Please log in again.",
                },
              });
            }

            wasAuthed.current = false;
          }
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosInstance.interceptors.response.eject(interceptorId);
    };
  }, [navigate, clearAuth, user]);

  useEffect(() => {
    if (!("BroadcastChannel" in window)) return;

    const authChannel = new BroadcastChannel("auth");

    authChannel.onmessage = (event) => {
      switch (event.data?.type) {
        case "LOGOUT":
          clearAuth();
          break;
        case "LOGIN":
          refresh();
          break;
        case "TOKEN_REFRESH":
          scheduleTokenRefresh();
          break;
        default:
          break;
      }
    };

    return () => {
      authChannel.close();
    };
  }, [clearAuth, refresh, scheduleTokenRefresh]);

  const value = {
    // State
    user,
    loading,
    error,

    // Computed properties
    isAuthenticated: !!user && !!getToken() && !isTokenExpired(),
    isAdmin: user?.role === "admin",

    // Actions
    login,
    register,
    logout,
    refresh,
    clearError: () => setError(null),
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};
