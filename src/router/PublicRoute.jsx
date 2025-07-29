// // PublicRoute.js
// import React, { useMemo } from "react";
// import { Navigate, Outlet, useLocation } from "react-router-dom";
// import Cookies from "js-cookie";
// import Header from "../components/Dashboard/header/header";
// import Footer from "../global/Footer";

// const PublicRoute = React.memo(() => {
//   const location = useLocation();
  
//   // Memoize token check to prevent unnecessary re-renders
//   const token = useMemo(() => {
//     try {
//       return Cookies.get("token");
//     } catch (error) {
//       console.error("Error accessing token cookie:", error);
//       return null;
//     }
//   }, []);

//   // Memoize authentication status
//   const isAuthenticated = useMemo(() => {
//     return token && typeof token === "string" && token.length > 0;
//   }, [token]);

//   // Memoize routes that shouldn't show header/footer
//   const hideHeaderFooterRoutes = useMemo(() => [
//     "/login", 
//     "/register", 
//     "/forgot-password"
//   ], []);

//   const shouldHideHeaderFooter = useMemo(() => {
//     return hideHeaderFooterRoutes.includes(location.pathname);
//   }, [location.pathname, hideHeaderFooterRoutes]);

//   if (isAuthenticated) {
//     // Redirect to dashboard instead of /home for consistency
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
import Cookies from "js-cookie";
import Header from "../components/Dashboard/header/header";
import Footer from "../global/Footer";

const hideHeaderFooterRoutes = [
  "/login",
  "/register",
  "/forgot-password"
];

const PublicRoute = React.memo(() => {
  const location = useLocation();
  const token = Cookies.get("token");
  const isAuthenticated = token && typeof token === "string" && token.length > 0;
  const shouldHideHeaderFooter = hideHeaderFooterRoutes.includes(location.pathname);

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      {!shouldHideHeaderFooter && <Header />}
      <main className="flex-1">
        <Outlet />
      </main>
      {!shouldHideHeaderFooter && <Footer />}
    </div>
  );
});

PublicRoute.displayName = "PublicRoute";

export default PublicRoute;