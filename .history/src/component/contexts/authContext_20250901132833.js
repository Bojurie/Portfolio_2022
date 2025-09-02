// src/contexts/AuthContext.jsx
import React, {
  createContext,
  useState,
  useEffect,
  useCallback,
  useContext,
} from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "../api/axiosInstance";
import { toast } from "react-toastify";
import { handleApiError } from "../utils/handleApiError";

// If you want to persist just the user (optional)
const USER_KEY = "authUser";
const saveUser = (u) => {
  try {
    if (u) localStorage.setItem(USER_KEY, JSON.stringify(u));
    else localStorage.removeItem(USER_KEY);
  } catch {}
};
const getUserFromStorage = () => {
  try {
    const raw = localStorage.getItem(USER_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [user, setUser] = useState(getUserFromStorage());
  const [loading, setLoading] = useState(true); // boot/loading state
  const [error, setError] = useState(null);

  const setUserState = useCallback((u) => {
    setUser(u);
    saveUser(u);
  }, []);

  /** Ping backend for current user (uses cookie) */
  const refresh = useCallback(async () => {
    try {
      const { data } = await axios.get("/auth/me");
      // backend returns { user: {...} }
      const u = data?.user || null;
      setUserState(u);
      setError(null);
      return u;
    } catch (err) {
      // 401 means not logged in or expired
      setUserState(null);
      return null;
    }
  }, [setUserState]);

  /** Login: backend sets cookie; response includes { user } */
  const login = useCallback(
    async ({ email, password }, { redirect = true } = {}) => {
      setError(null);
      setLoading(true);
      try {
        const { data } = await axios.post("/auth/login", { email, password });
        const u = data?.user || null;
        if (!u) throw new Error("Login succeeded but no user returned.");
        setUserState(u);

        // Go back to the previous protected page if any, else dashboard/home
        if (redirect) {
          const dest =
            (location.state && location.state.from) ||
            (u.role === "admin" ? "/admin/dashboard" : "/");
          toast.success(`Welcome back${u.name ? `, ${u.name}` : ""}!`);
          navigate(dest, { replace: true });
        }
        return u;
      } catch (err) {
        handleApiError(err);
        setError(err?.response?.data?.message || "Login failed");
        setUserState(null);
        return null;
      } finally {
        setLoading(false);
      }
    },
    [navigate, setUserState, location.state]
  );

  /** Register: simple flow -> notify then push to login */
  const register = useCallback(
    async ({ name, email, password }, { autoLogin = false } = {}) => {
      setError(null);
      setLoading(true);
      try {
        const { status } = await axios.post("/auth/register", {
          name,
          email,
          password,
        });
        if (status === 201) {
          toast.success("Registration successful! Please log in.");
          if (autoLogin) {
            // Optional: directly log in after sign up
            await login({ email, password });
          } else {
            navigate("/login", { replace: true });
          }
          return true;
        }
        return false;
      } catch (err) {
        handleApiError(err);
        setError(err?.response?.data?.message || "Registration failed");
        return false;
      } finally {
        setLoading(false);
      }
    },
    [login, navigate]
  );

  /** Logout: clears cookie on server; then clear client state */
  const logout = useCallback(async () => {
    try {
      await axios.post("/auth/logout");
    } catch {
      // ignore
    } finally {
      setUserState(null);
      toast.info("Logged out");
      navigate("/", { replace: true });
    }
  }, [navigate, setUserState]);

  /** Initial hydration */
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        // If we have a cached user, render instantly, refresh in background
        const cached = getUserFromStorage();
        if (cached) {
          setLoading(false);
          // background refresh
          refresh();
          return;
        }
        // otherwise block UI until we know
        await refresh();
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [refresh]);

  /** Optional: 401 auto-logout redirect */
  useEffect(() => {
    const id = axios.interceptors.response.use(
      (r) => r,
      async (err) => {
        if (err?.response?.status === 401) {
          // If a request returns 401, ensure state is cleared once
          setUserState(null);
          // only redirect if not already on auth routes
          const isAuthRoute = /\/login$|\/register$/.test(
            window.location.pathname
          );
          if (!isAuthRoute) navigate("/login", { replace: true });
        }
        return Promise.reject(err);
      }
    );
    return () => axios.interceptors.response.eject(id);
  }, [navigate, setUserState]);

  const value = {
    user,
    isAuthenticated: !!user,
    loading,
    error,
    login,
    register,
    logout,
    refresh,
    clearError: () => setError(null),
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
};
