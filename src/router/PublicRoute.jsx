

// import React from "react";
// import { Navigate, Outlet, useLocation } from "react-router-dom";
// import Cookies from "js-cookie";
// import Header from "../ReusableComponents/header/header";
// import Footer from "../global/Footer";

// const hideHeaderFooterRoutes = [
//   "/login",
//   "/register",
//   "/forgot-password"
// ];

// const PublicRoute = React.memo(() => {
//   const location = useLocation();
//   const token = Cookies.get("token");
//   const isAuthenticated = token && typeof token === "string" && token.length > 0;
//   const shouldHideHeaderFooter = hideHeaderFooterRoutes.includes(location.pathname);

//   if (isAuthenticated) {
//     return <Navigate to="/dashboard" replace />;
//   }

//   return (
//     <div className="min-h-screen flex flex-col">
//       {!shouldHideHeaderFooter && <Header />}
//       <main className="flex-1">
//         <Outlet />
//       </main>
//       {!shouldHideHeaderFooter && <Footer />}
//     </div>
//   );
// });

// PublicRoute.displayName = "PublicRoute";

// export default PublicRoute;


import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { isAuthenticated } from "../utils/auth";

const PublicRoute = ({ restricted = true }) => {
  const location = useLocation();
  const authenticated = isAuthenticated();

  // If restricted and user is authenticated, redirect to dashboard
  if (restricted && authenticated) {
    const from = location.state?.from?.pathname || "/dashboard";
    return <Navigate to={from} replace />;
  }

  return <Outlet />;
};

export default PublicRoute;