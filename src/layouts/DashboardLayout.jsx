// import React, { useState, useEffect, useCallback } from "react";
// import { Outlet } from "react-router-dom";
// import Sidebar from "../ReusableComponents/sideBar/Sidebar";
// import Header from "../ReusableComponents/header/header";
// import LogoutModal from "../components/Dashboard/pages/logout/logout";
// import Cookies from "js-cookie";

// const DashboardLayout = () => {
//   // Sidebar states
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
//   const [showLogoutModal, setShowLogoutModal] = useState(false);
//   const [isMobile, setIsMobile] = useState(false);

//   // Handle screen resize
//   useEffect(() => {
//     const handleResize = () => {
//       const mobile = window.innerWidth < 1024;
//       setIsMobile(mobile);
      
//       // Auto-close sidebar on mobile, auto-open on desktop
//       if (mobile) {
//         setSidebarOpen(false);
//       }
//     };

//     handleResize();
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   // Toggle sidebar (for mobile)
//   const toggleSidebar = useCallback(() => {
//     setSidebarOpen((prev) => !prev);
//   }, []);

//   // Toggle collapse (for desktop)
//   const toggleCollapse = useCallback(() => {
//     setSidebarCollapsed((prev) => !prev);
//   }, []);

//   // Close sidebar (for mobile after navigation)
//   const closeSidebar = useCallback(() => {
//     if (isMobile) {
//       setSidebarOpen(false);
//     }
//   }, [isMobile]);

//   // Logout handlers
//   const handleLogoutClick = useCallback(() => {
//     setShowLogoutModal(true);
//     closeSidebar();
//   }, [closeSidebar]);

//   const handleLogout = useCallback(() => {
//     try {
//       Cookies.remove("token");
//       Cookies.remove("userData");
//       Cookies.remove("email");
//       Cookies.remove("rememberMe");
//       sessionStorage.removeItem("isPinVerified");
//     } catch (error) {
//       console.error("Error during logout:", error);
//     }
//     setShowLogoutModal(false);
//     window.location.href = "/login";
//   }, []);

//   const handleCancelLogout = useCallback(() => {
//     setShowLogoutModal(false);
//   }, []);

//   return (
//     <div className="relative flex h-screen bg-[#1d8d84] overflow-hidden">
//       {/* Mobile Overlay */}
//       {sidebarOpen && isMobile && (
//         <div
//           className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300"
//           onClick={() => setSidebarOpen(false)}
//         />
//       )}

//       {/* Sidebar */}
//       <Sidebar
//         isOpen={sidebarOpen}
//         isCollapsed={sidebarCollapsed}
//         isMobile={isMobile}
//         onClose={closeSidebar}
//         onToggleCollapse={toggleCollapse}
//         onLogoutClick={handleLogoutClick}
//       />

//       {/* Main Content Area */}
//       <div
//         className={`
//           flex-1 flex flex-col h-screen overflow-hidden
//           transition-all duration-300 ease-in-out
//           ${!isMobile && !sidebarCollapsed ? "lg:ml-64" : ""}
//           ${!isMobile && sidebarCollapsed ? "lg:ml-20" : ""}
//         `}
//       >
//         {/* Header */}
//         <div className="m-1">
//           <Header 
//             onMenuClick={toggleSidebar} 
//             isSidebarOpen={sidebarOpen}
//             isMobile={isMobile}
//           />
//         </div>

//         {/* Page Content */}
//         <main
//           className="flex-1 overflow-y-auto bg-[#1d8d84] rounded-xl mx-1 mb-1"
//           style={{ scrollbarWidth: "none" }}
//         >
//           <Outlet />
//         </main>
//       </div>

//       {/* Logout Modal */}
//       {showLogoutModal && (
//         <LogoutModal
//           onCancel={handleCancelLogout}
//           onConfirm={handleLogout}
//         />
//       )}
//     </div>
//   );
// };

// export default DashboardLayout;


import React, { useState, useEffect, useCallback } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "../ReusableComponents/sideBar/Sidebar";
import Header from "../ReusableComponents/header/header";
import LogoutModal from "../components/Dashboard/pages/logout/logout";
import Cookies from "js-cookie";

const DashboardLayout = () => {
  // Sidebar states
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const location = useLocation();
  const isCommunityPage = location.pathname.includes("/community");

  // Handle screen resize
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);

      // Auto-close sidebar on mobile, auto-open on desktop
      if (mobile) {
        setSidebarOpen(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Toggle sidebar (for mobile)
  const toggleSidebar = useCallback(() => {
    setSidebarOpen((prev) => !prev);
  }, []);

  // Toggle collapse (for desktop)
  const toggleCollapse = useCallback(() => {
    setSidebarCollapsed((prev) => !prev);
  }, []);

  // Close sidebar (for mobile after navigation)
  const closeSidebar = useCallback(() => {
    if (isMobile) {
      setSidebarOpen(false);
    }
  }, [isMobile]);

  // Logout handlers
  const handleLogoutClick = useCallback(() => {
    setShowLogoutModal(true);
    closeSidebar();
  }, [closeSidebar]);

  const handleLogout = useCallback(() => {
    try {
      Cookies.remove("token");
      Cookies.remove("userData");
      Cookies.remove("email");
      Cookies.remove("rememberMe");
      sessionStorage.removeItem("isPinVerified");
    } catch (error) {
      console.error("Error during logout:", error);
    }
    setShowLogoutModal(false);
    window.location.href = "/login";
  }, []);

  const handleCancelLogout = useCallback(() => {
    setShowLogoutModal(false);
  }, []);

  return (
    <div className="relative flex h-screen bg-[#1d8d84] overflow-hidden">
      {/* Mobile Overlay */}
      {sidebarOpen && isMobile && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        isCollapsed={sidebarCollapsed}
        isMobile={isMobile}
        onClose={closeSidebar}
        onToggleCollapse={toggleCollapse}
        onLogoutClick={handleLogoutClick}
      />

      {/* Main Content Area */}
      <div
        className={`
          flex-1 flex flex-col h-screen overflow-hidden
          transition-all duration-300 ease-in-out
          ${!isMobile && !sidebarCollapsed ? "lg:ml-64" : ""}
          ${!isMobile && sidebarCollapsed ? "lg:ml-20" : ""}
        `}
      >
        {/* Header */}
        {/* Header */}
        {!isCommunityPage && (
          <div className="m-1">
            <Header
              onMenuClick={toggleSidebar}
              isSidebarOpen={sidebarOpen}
              isMobile={isMobile}
            />
          </div>
        )}

        {/* Page Content */}
        <main
          className="flex-1 overflow-y-auto bg-[#1d8d84] rounded-xl mx-1 mb-1"
          style={{ scrollbarWidth: "none" }}
        >
          <Outlet />
        </main>
      </div>

      {/* Logout Modal */}
      {showLogoutModal && (
        <LogoutModal
          onCancel={handleCancelLogout}
          onConfirm={handleLogout}
        />
      )}
    </div>
  );
};

export default DashboardLayout;