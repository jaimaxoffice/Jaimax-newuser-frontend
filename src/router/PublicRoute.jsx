

import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import Header from "../ReusableComponents/header/header";
import Footer from "../global/Footer";

const hideHeaderFooterRoutes = [
  "/login/",
  "/register/",
  "/forgot-password/"
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