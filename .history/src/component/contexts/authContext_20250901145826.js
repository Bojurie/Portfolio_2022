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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const wasAuthed = useRef(!!user); // for smarter redirect decisions

  const setUserState = useCallback((u) => {
    setUser(u);
    saveUser(u);
  }, []);

  const refresh = useCallback(async () => {
    try {
      const { data } = await axios.get("/auth/me");
      const u = data?.user || null;
      setUserState(u);
      setError(null);
      return u;
    } catch {
      setUserState(null);
      return null;
    }
  }, [setUserState]);


  const login = useCallback(
    async ({ email, password }, { redirect = true } = {}) => {
      setError(null);
      setLoading(true);
      try {
        const { data } = await axiosInstance.post("/auth/login", {
          email,
          password,
        });
        const u = data?.user || null;
        if (!u) throw new Error("Login succeeded but no user returned");

        setUserState(u);

        if (redirect) {
          // Prefer “return to” URL if router placed it in state
          const from = location.state?.from;
          const dest = from || (u.role === "admin" ? "/admin/dashboard" : "/");
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
        wasAuthed.current = true;
      }
    },
    [location.state, navigate, setUserState]
  );


  const register = useCallback(
    async ({ name, email, password }, { autoLogin = false } = {}) => {
      setError(null);
      setLoading(true);
      try {
        const { status } = await axiosInstance.post("/auth/register", {
          name,
          email,
          password,
        });
        if (status === 201) {
          toast.success("Registration successful! Please log in.");
          if (autoLogin) {
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

  /**
   * POST /auth/logout — clears cookie on server; clear client state
   */
  const logout = useCallback(async () => {
    try {
      await axiosInstance.post("/auth/logout");
    } catch {
      // ignore network blips
    } finally {
      setUserState(null);
      toast.info("Logged out");
      navigate("/", { replace: true });
    }
  }, [navigate, setUserState]);

  /**
   * Initial hydrate:
   * - If a cached user exists, render immediately & refresh in the background.
   * - Otherwise, block until /auth/me resolves to avoid UI flicker.
   */
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const cached = getUserFromStorage();
        if (cached) {
          setLoading(false);
          refresh(); // background
          return;
        }
        await refresh(); // blocking
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [refresh]);

  /**
   * Global 401 handler (expired session)
   * - Clears local user once
   * - Redirects to /login unless already on auth screens
   */
  useEffect(() => {
    const id = axiosInstance.interceptors.response.use(
      (r) => r,
      (err) => {
        const status = err?.response?.status;
        if (status === 401) {
          // only react if we had a session or already think we’re logged in
          if (user || wasAuthed.current) {
            setUserState(null);
            const isAuthRoute = /\/login$|\/register$/.test(
              window.location.pathname
            );
            if (!isAuthRoute) {
              navigate("/login", {
                replace: true,
                state: { from: window.location.pathname },
              });
            }
            wasAuthed.current = false;
          }
        }
        return Promise.reject(err);
      }
    );
    return () => axiosInstance.interceptors.response.eject(id);
  }, [navigate, setUserState, user]);

  /**
   * Cross-tab sync (logout/login) using BroadcastChannel if available
   */
  useEffect(() => {
    if (!("BroadcastChannel" in window)) return;
    const bc = new BroadcastChannel("auth");
    bc.onmessage = (e) => {
      if (e?.data?.type === "LOGOUT") setUserState(null);
      if (e?.data?.type === "LOGIN") refresh();
    };
    return () => bc.close();
  }, [refresh, setUserState]);

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
