// import { Navigate, Outlet, useLocation } from "react-router-dom";
// import Cookies from "js-cookie";

// const ProtectedRoute = () => {
//   const location = useLocation();
//   const token = Cookies.get("token");
//   if (!token) {
//     return <Navigate to="/login" state={{ from: location }} replace />;
//   }
//   return <Outlet />;
// };

// export default ProtectedRoute;


import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { isAuthenticated } from "../utils/auth";

const PrivateRoute = () => {
  const location = useLocation();
  const authenticated = isAuthenticated();

  if (!authenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;