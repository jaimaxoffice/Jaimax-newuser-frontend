import React, { useMemo } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../global/Navbar";
import Footer from "../global/Footer";

// Routes where navbar/footer should be hidden
const HIDDEN_NAV_ROUTES = ["/login", "/register", "/forgot-password"];

// const PublicLayout = () => {
//   const location = useLocation();

//   const shouldHideNavbar = useMemo(() => {
//     return HIDDEN_NAV_ROUTES.includes(location.pathname);
//   }, [location.pathname]);

//   return (
//     <div className="min-h-screen flex flex-col overflow-y-auto scrollbar-hide">
//       {/* Navbar - hidden on auth pages */}
//       {!shouldHideNavbar && <Navbar />}

//       {/* Main Content */}
//       <main className="flex-1">
//         <Outlet />
//       </main>

//       {/* Footer - hidden on auth pages */}
//       {!shouldHideNavbar && <Footer />}
//     </div>
//   );
// };
const PublicLayout = () => {
  const location = useLocation();

  const shouldHideNavbar = useMemo(() => {
    return HIDDEN_NAV_ROUTES.includes(location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      {!shouldHideNavbar && <Navbar />}
      <main className="flex-1">
        <Outlet />
      </main>
      {!shouldHideNavbar && <Footer />}
    </div>
  );
};

export default PublicLayout;