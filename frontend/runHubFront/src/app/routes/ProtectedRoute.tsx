import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useStore } from "../stores/store";

type Props = {
  children: React.ReactNode;
  redirectTo?: string; // Added prop for redirect URL
  allowedRoles?: string[]; // Added prop for allowed roles
};

const ProtectedRoute = ({ children, redirectTo, allowedRoles }: Props) => {
  const location = useLocation();
  const {
    userStore: { isLoggedIn, user },
  } = useStore();

  // Check if the user is logged in
  const isAuthorized =
    isLoggedIn && (!allowedRoles || allowedRoles.includes(user!.role!));

  return isAuthorized ? (
    <>{children}</>
  ) : (
    <Navigate to="/login" state={{ from: redirectTo || location }} replace />
  );
};

export default ProtectedRoute;
