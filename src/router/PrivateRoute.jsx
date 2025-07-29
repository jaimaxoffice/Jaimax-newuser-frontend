// // PrivateRoute.js
// import React, { useMemo } from "react";
// import { Navigate, Outlet, useLocation } from "react-router-dom";
// import Cookies from "js-cookie";

// const PrivateRoute = React.memo(() => {
//   const location = useLocation();

//   // Memoize token check to prevent unnecessary re-renders
//   const token = useMemo(() => {
//     try {
//       console.log("Accessing token from cookies",Cookies.get("token"));
//       return Cookies.get("token") || null;
//     } catch (error) {
//       console.error("Error accessing token from localStorage:", error);
//       return null;
//     }
//   }, []);

//   // Memoize authentication status
//   const isAuthenticated = useMemo(() => {
//     return token && typeof token === "string" && token.length > 0;
//   }, [token]);

//   if (!isAuthenticated) {
//     // Preserve the attempted URL for redirect after login
//     return <Navigate to="/login" state={{ from: location }} replace />;
//   }

//   return <Outlet />;
// });

// PrivateRoute.displayName = "PrivateRoute";

// export default PrivateRoute;

import { Navigate, Outlet, useLocation } from "react-router-dom";
import Cookies from "js-cookie";

const ProtectedRoute = () => {
  const location = useLocation();
  const token = Cookies.get("token");
  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return <Outlet />;
};

export default ProtectedRoute;