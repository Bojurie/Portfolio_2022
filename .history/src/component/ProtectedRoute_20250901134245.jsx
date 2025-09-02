import React from "react";
import RequireAuth from "./RequireAuth";


export default function ProtectedRoute({ roles, children }) {
  return <RequireAuth roles={roles}>{children}</RequireAuth>;
}
