import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/useAuth";

type Props = {
  children: React.ReactNode;
  redirectTo?: string; // Added prop for redirect URL
};

const ProtectedRoute = ({ children, redirectTo }: Props) => {
  const location = useLocation();
  const { isLoggedIn } = useAuth();

  return isLoggedIn() ? (
    <>{children}</>
  ) : (
    <Navigate to="/login" state={{ from: redirectTo || location }} replace />
  );
};

export default ProtectedRoute;
