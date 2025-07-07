// src/routes/PublicRoute.jsx
import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PublicRoute = () => {
  const token = localStorage.getItem("token"); // or from Redux

  // If logged in, redirect to dashboard
  if (token) {
    return <Navigate to="/dashboard" />;
  }

  // Else, allow access to login/register
  return <Outlet />;
};

export default PublicRoute;
