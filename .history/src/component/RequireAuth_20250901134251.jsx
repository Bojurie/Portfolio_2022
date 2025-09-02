import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./contexts/authContext";

export default function RequireAuth({
  children,
  roles,
  allowGuest = false,
  fallback = null,
}) {
  const { isAuthenticated, user, loading } = useAuth();
  const location = useLocation();

  if (loading) return null; 

  if (!isAuthenticated) {
    if (allowGuest && fallback) return fallback;
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  if (roles?.length) {
    const role = (user?.role || "").toLowerCase();
    const ok =
      roles.includes(role) ||
      (roles.includes("dashboard") && role === "admin");
    if (!ok) return <Navigate to="/" replace />;
  }

  return children;
}
