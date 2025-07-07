// /* ──────────────────────────────────────────────────────────────
//    App.jsx – main routing setup (React‑Router‑DOM v6+)
//    ────────────────────────────────────────────────────────────── */
// import React, { useState, useEffect } from "react";
// import { Routes, Route, useLocation, Outlet } from "react-router-dom";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// /* ── Global layout / shared UI ─────────────────────────────── */
// import Navbar from "./global/Navbar";
// import Footer from "./global/Footer";
// import JaimaxSplash from "./global/Splashscreen";

// /* ── Auth / User pages ─────────────────────────────────────── */
// import AuthContainer from "./Authentication/Login";
// import ForgotPassword from "./Authentication/ForgotPassword";

// /* ── Public pages ──────────────────────────────────────────── */
// import Home from "./pages/home/Home";
// import JaimaxComponent from "./components/About/About";
// import Contact from "./components/contact/Contact";
// import FeaturesSection from "./pages/home/HomeFeatures";
// import BlogLayout from "./pages/home/Blog";
// import BlogDetailPage from "./pages/home/Article"; // ✅ NEW    // ✅ NEW
// import CryptoServicesFlipCards from "./components/Services/services";
// import SupportPage from "./global/SupportPage";
// import RefundPolicy from "./global/RefundPolicy";
// import TermsConditions from "./global/TermsConditons";
// import PrivacyPolicy from "./global/PrivacyPolicy";
// import Disclaimer from "./global/Disclaimer";

// /* Services */
// import Margintrading from "./services/Margintrading";
// import ApiTrading from "./services/Apitrading";
// import SpotTrading from "./services/Spottrading";
// import FuturesTrading from "./services/Futurestrading";
// import PreSale from "./services/Presale";
// import ReferEarn from "./services/Referearn";

// /* ── Dashboard (private) ───────────────────────────────────── */
// import Dashboard from "./components/Dashboard/pages/dashBoard/dashBoard";
// import Wallet from "./components/Dashboard/pages/wallet/wallet";
// import MyTotalTeam from "./components/Dashboard/pages/myTotalTeam/myTotalTeam";
// import BuyHistory from "./components/Dashboard/pages/buyHistory/buyHistory";
// import Security from "./components/Dashboard/pages/security/security";
// import Profile from "./components/Dashboard/pages/profile/profile";
// import Kyc from "./components/Dashboard/pages/kyc/kyc";
// import WithDrawal from "./components/Dashboard/pages/widthDrawal/withDrawal";
// import Support from "./components/Dashboard/pages/support/support";
// import Sidebar from "./components/Dashboard/sildeBar/Sidebar";
// import Header from "./components/Dashboard/header/header";
// import LogoutModal from "./components/Dashboard/pages/logout/logout";
// import Shareholders from "./components/Dashboard/pages/shareholders/shareholders";
// import AddMoneyToWallet from "./components/Dashboard/pages/AddMoneyToWallet/AddMoneyToWallet";
// import TodayEarning from "./components/Dashboard/pages/TodayEarnings/TodayEarning";
// import UserMeetingsShowcase from "./components/Meetings/Zoommeetings";
// /* ─────────────────────────────────────────────────────────────
//    DashboardLayout (sidebar + header wrapper)
//    ──────────────────────────────────────────────────────────── */
// const DashboardLayout = () => {
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [showLogoutModal, setShowLogoutModal] = useState(false);
//   const [showNavMenu, setShowNavMenu] = useState(false);

//   const handleLogout = () => {
//     setShowLogoutModal(false);
//     window.location.href = "/";
//   };

//   const handleNavigation = (path) => {
//     setShowNavMenu(false);
//     window.location.href = path;
//   };

//   const navigationItems = [
//     { label: "About", path: "/about" },
//     { label: "Services", path: "/services" },
//     { label: "Features", path: "/features" },
//     { label: "Contact", path: "/contact" }
//   ];

//   return (
//     <div className="relative flex h-screen bg-white overflow-hidden">
//       {/* Main layout container */}
//       <div className="overflow-auto">
//         <Sidebar
//           isOpen={sidebarOpen}
//           setIsOpen={setSidebarOpen}
//           onLogoutClick={() => setShowLogoutModal(true)}
//         />
//       </div>

//       <div
//         className={`transition-all duration-300 ease-in-out flex-1 flex flex-col ml-1 mr-1 ${
//           sidebarOpen ? "lg:ml-64" : "lg:ml-2"
//         } h-screen overflow-hidden`}
//       >
//         <div className="mt-6 mb-1">
//           <Header />
//         </div>

//         <div className="flex-1 overflow-y-auto bg-[#f2f2f2] rounded-xl scrollbar-hide mb-3 mt-1">
//           <Outlet />
//         </div>
//       </div>

//       {/* Navigation Button */}
//       <div className="fixed bottom-4 right-4 z-50">
//         <div className="relative">
//           <button
//             onClick={() => setShowNavMenu(!showNavMenu)}
//             className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
//             aria-label="Navigation menu"
//           >
//             <svg
//               className={`w-6 h-6 transition-transform duration-200 ${
//                 showNavMenu ? "rotate-45" : ""
//               }`}
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M12 6v6m0 0v6m0-6h6m-6 0H6"
//               />
//             </svg>
//           </button>

//           {/* Navigation Menu */}
//           {showNavMenu && (
//             <div className="absolute bottom-full right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50">
//               {navigationItems.map((item, index) => (
//                 <button
//                   key={index}
//                   onClick={() => handleNavigation(item.path)}
//                   className="w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors duration-150 text-gray-700 hover:text-gray-900 focus:outline-none focus:bg-gray-100"
//                 >
//                   {item.label}
//                 </button>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Click outside to close menu */}
//       {showNavMenu && (
//         <div
//           className="fixed inset-0 z-40"
//           onClick={() => setShowNavMenu(false)}
//         />
//       )}

//       {showLogoutModal && (
//         <LogoutModal
//           onCancel={() => setShowLogoutModal(false)}
//           onConfirm={handleLogout}
//         />
//       )}
//     </div>
//   );
// };

// /* ─────────────────────────────────────────────────────────────
//    PublicLayout (navbar + footer wrapper)
//    ──────────────────────────────────────────────────────────── */
// const PublicLayout = () => {
//   const location = useLocation();
//   const hideNavbarRoutes = ["/login", "/register", "/forgot-password"];
//   const shouldHideNavbar = hideNavbarRoutes.includes(location.pathname);

//   return (
//     <div className="min-h-screen flex flex-col">
//       {!shouldHideNavbar && <Navbar />}
//       <main className="flex-1">
//         <Outlet />
//       </main>
//       {!shouldHideNavbar && <Footer />}
//     </div>
//   );
// };

// /* ─────────────────────────────────────────────────────────────
//    App Component
//    ──────────────────────────────────────────────────────────── */
// const App = () => {
//   const [showSplash, setShowSplash] = useState(true);

//   /* Splash screen timer */
//   useEffect(() => {
//     const timer = setTimeout(() => setShowSplash(false), 4000);
//     return () => clearTimeout(timer);
//   }, []);

//   if (showSplash) return <JaimaxSplash />;

//   return (
//     <>
//     <Routes>
//       {/* ───────────────── Private / Dashboard Routes ─────────────── */}
//       <Route path="/dashboard" element={<DashboardLayout />}>
//         <Route index element={<Dashboard />} />
//         <Route path="wallet" element={<Wallet />} />
//         <Route path="wallet/add-funds" element={<AddMoneyToWallet />} />
//         <Route path="my-team" element={<MyTotalTeam />} />
//         <Route path="shareholders" element={<Shareholders />} />
//         <Route path="buy-history" element={<BuyHistory />} />
//         <Route path="security" element={<Security />} />
//         <Route path="profile" element={<Profile />} />
//         <Route path="kyc" element={<Kyc />} />
//         <Route path="withdrawal" element={<WithDrawal />} />
//         <Route path="support" element={<Support />} />
//       </Route>

//       {/* Additional dashboard aliases (optional) */}
//       <Route path="/wallet" element={<DashboardLayout />}>
//         <Route index element={<Wallet />} />
//       </Route>
//       <Route path="/my-team" element={<DashboardLayout />}>
//         <Route index element={<MyTotalTeam />} />
//       </Route>
//       <Route path="/shareholders" element={<DashboardLayout />}>
//         <Route index element={<Shareholders />} />
//       </Route>
//       <Route path="/earnings" element={<DashboardLayout />}>
//         <Route index element={<TodayEarning />} />
//       </Route>
//       <Route path="wallet/add-funds" element={<DashboardLayout />}>
//         <Route index element={<AddMoneyToWallet />} />
//       </Route>
//       <Route path="/buy-history" element={<DashboardLayout />}>
//         <Route index element={<BuyHistory />} />
//       </Route>
//       <Route path="/security" element={<DashboardLayout />}>
//         <Route index element={<Security />} />
//       </Route>
//       <Route path="/profile" element={<DashboardLayout />}>
//         <Route index element={<Profile />} />
//       </Route>
//       <Route path="/kyc-information" element={<DashboardLayout />}>
//         <Route index element={<Kyc />} />
//       </Route>
//       <Route path="/withdrawal" element={<DashboardLayout />}>
//         <Route index element={<WithDrawal />} />
//       </Route>
//       <Route path="/support" element={<DashboardLayout />}>
//         <Route index element={<Support />} />
//       </Route>
//       <Route path="/meetings" element={<DashboardLayout />}>
//         <Route index element={<UserMeetingsShowcase />} />
//       </Route>

//       {/* ───────────────── Public Routes ─────────────────────────── */}
//       <Route path="/" element={<PublicLayout />}>
//         <Route index element={<Home />} />
//         <Route path="login" element={<AuthContainer />} />
//         <Route path="register" element={<AuthContainer />} />
//         <Route path="forgot-password" element={<ForgotPassword />} />
//         <Route path="about" element={<JaimaxComponent />} />
//         <Route path="contact" element={<Contact />} />
//         <Route path="features" element={<FeaturesSection />} />

//         {/* ✅ BLOG ROUTES */}
//         <Route path="blog">
//           <Route index element={<BlogLayout />} />   {/* /blog */}
//           <Route path=":slug" element={<BlogDetailPage />} />
//         </Route>

//         {/* Services & info */}
//         <Route path="services" element={<CryptoServicesFlipCards />} />
//         <Route path="supporthome" element={<SupportPage />} />
//         <Route path="privacy-policy" element={<PrivacyPolicy />} />
//         <Route path="support-page" element={<SupportPage />} />
//         <Route path="terms-and-conditions" element={<TermsConditions />} />
//         <Route path="refund-policy" element={<RefundPolicy />} />
//         <Route path="disclaimer" element={<Disclaimer />} />
//         <Route path="Margintrading" element={<Margintrading />} />
//         <Route path="ApiTrading" element={<ApiTrading />} />
//         <Route path="SpotTrading" element={<SpotTrading />} />
//         <Route path="FuturesTrading" element={<FuturesTrading />} />
//         <Route path="PreSale" element={<PreSale />} />
//         <Route path="ReferEarn" element={<ReferEarn />} />
//       </Route>

//       {/* ───────────────── 404 Fallback (optional) ──────────────── */}
//       {/* <Route path="*" element={<NotFound />} /> */}
//     </Routes>
//     <ToastContainer
//         position="top-center"
//         autoClose={3000}
//         hideProgressBar={false}
//         newestOnTop={false}
//         closeOnClick
//         rtl={false}
//         pauseOnFocusLoss
//         draggable
//         pauseOnHover
//         theme="light"
//         style={{ zIndex: 9999 }}
//       />
//     </>
//   );
// };

// export default App;


import React, { useState, useEffect } from "react";
import { Routes, Route, useLocation, Outlet, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

/* ── Global layout / shared UI ─────────────────────────────── */
import Navbar from "./global/Navbar";
import Footer from "./global/Footer";
import JaimaxSplash from "./global/Splashscreen";

/* ── Auth / User pages ─────────────────────────────────────── */
import AuthContainer from "./Authentication/Login";
import ForgotPassword from "./Authentication/ForgotPassword";

/* ── Public pages ──────────────────────────────────────────── */
import Home from "./pages/home/Home";
import JaimaxComponent from "./components/About/About";
import Contact from "./components/contact/Contact";
import FeaturesSection from "./pages/home/HomeFeatures";
import BlogLayout from "./pages/home/Blog";
import BlogDetailPage from "./pages/home/Article";
import CryptoServicesFlipCards from "./components/Services/services";
import SupportPage from "./global/SupportPage";
import RefundPolicy from "./global/RefundPolicy";
import TermsConditions from "./global/TermsConditons";
import PrivacyPolicy from "./global/PrivacyPolicy";
import Disclaimer from "./global/Disclaimer";

/* Services */
import Margintrading from "./services/Margintrading";
import ApiTrading from "./services/Apitrading";
import SpotTrading from "./services/Spottrading";
import FuturesTrading from "./services/Futurestrading";
import PreSale from "./services/Presale";
import ReferEarn from "./services/Referearn";

/* ── Dashboard (private) ───────────────────────────────────── */
import Dashboard from "./components/Dashboard/pages/dashBoard/dashBoard";
import Wallet from "./components/Dashboard/pages/wallet/wallet";
import MyTotalTeam from "./components/Dashboard/pages/myTotalTeam/myTotalTeam";
import BuyHistory from "./components/Dashboard/pages/buyHistory/buyHistory";
import Security from "./components/Dashboard/pages/security/security";
import Profile from "./components/Dashboard/pages/profile/profile";
import Kyc from "./components/Dashboard/pages/kyc/kyc";
import WithDrawal from "./components/Dashboard/pages/widthDrawal/withDrawal";
import Support from "./components/Dashboard/pages/support/support";
import Sidebar from "./components/Dashboard/sildeBar/Sidebar";
import Header from "./components/Dashboard/header/header";
import LogoutModal from "./components/Dashboard/pages/logout/logout";
import Shareholders from "./components/Dashboard/pages/shareholders/shareholders";
import AddMoneyToWallet from "./components/Dashboard/pages/AddMoneyToWallet/AddMoneyToWallet";
import TodayEarning from "./components/Dashboard/pages/TodayEarnings/TodayEarning";
import UserMeetingsShowcase from "./components/Meetings/Zoommeetings";

/* ─────────────────────────────────────────────────────────────
   Authentication Helper Functions
   ──────────────────────────────────────────────────────────── */
const getAuthToken = () => {
  try {
    return localStorage.getItem('token') || sessionStorage.getItem('token');
  } catch (error) {
    console.error('Error accessing storage:', error);
    return null;
  }
};

const isAuthenticated = () => {
  const token = getAuthToken();
  return token !== null && token !== undefined && token !== '';
};

const getLastSplashTime = () => {
  try {
    return localStorage.getItem('lastSplashTime');
  } catch (error) {
    console.error('Error accessing storage:', error);
    return null;
  }
};

const setLastSplashTime = () => {
  try {
    localStorage.setItem('lastSplashTime', Date.now().toString());
  } catch (error) {
    console.error('Error setting last splash time:', error);
  }
};

const shouldShowSplash = () => {
  const lastSplashTime = getLastSplashTime();
  if (!lastSplashTime) return true;
  
  const oneHour = 60 * 60 * 1000; // 1 hour in milliseconds
  const timeSinceLastSplash = Date.now() - parseInt(lastSplashTime);
  
  return timeSinceLastSplash >= oneHour;
};

/* ─────────────────────────────────────────────────────────────
   Protected Route Component
   ──────────────────────────────────────────────────────────── */
const ProtectedRoute = ({ children }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }
  return children;
};


const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showNavMenu, setShowNavMenu] = useState(false);
  const [navPosition, setNavPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  // Initialize position on component mount
  useEffect(() => {
    const updatePosition = () => {
      // Position in bottom-right corner with some padding
      const x = window.innerWidth - 80; // 64px button width + 16px padding
      const y = window.innerHeight - 80; // 64px button height + 16px padding
      setNavPosition({ x, y });
    };

    updatePosition();
    window.addEventListener('resize', updatePosition);
    return () => window.removeEventListener('resize', updatePosition);
  }, []);

  const handleLogout = () => {
    try {
      // Using variables instead of localStorage for compatibility
      window.tempTokenStorage = null;
      window.tempSplashStorage = null;
    } catch (error) {
      console.error('Error during logout:', error);
    }
    setShowLogoutModal(false);
    window.location.href = "/";
  };

  const handleNavigation = (path) => {
    setShowNavMenu(false);
    window.location.href = path;
  };

  // Handle drag functionality
  const handleMouseDown = (e) => {
    setIsDragging(true);
    const rect = e.currentTarget.getBoundingClientRect();
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    
    const buttonSize = 64; // Approximate button size
    const padding = 16; // Padding from screen edges
    
    let newX = e.clientX - dragOffset.x;
    let newY = e.clientY - dragOffset.y;
    
    // Constrain within screen bounds
    newX = Math.max(padding, Math.min(newX, window.innerWidth - buttonSize - padding));
    newY = Math.max(padding, Math.min(newY, window.innerHeight - buttonSize - padding));
    
    setNavPosition({ x: newX, y: newY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Add global mouse event listeners for dragging
  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, dragOffset]);

  // Calculate positions for bottom semicircle around main button
  const getBottomSemicirclePosition = (index, total) => {
    const radius = 90; // Distance from center of main button
    
    // Create semicircle on bottom side only (from left to right across the bottom)
    const startAngle = Math.PI; // Start from left (180 degrees)
    const endAngle = 2 * Math.PI; // End at right (360 degrees/0 degrees)
    
    // Calculate angle for each item
    const angle = startAngle + (index * (endAngle - startAngle)) / (total - 1);
    
    const x = radius * Math.cos(angle);
    const y = radius * Math.sin(angle);
    
    return { x, y };
  };

  const navigationItems = [
    { 
      label: "About", 
      path: "/about", 
      icon: "info", 
      color: "from-blue-500 to-blue-600",
      iconPath: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    },
    { 
      label: "Services", 
      path: "/services", 
      icon: "settings", 
      color: "from-purple-500 to-purple-600",
      iconPath: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
    },
    { 
      label: "Features", 
      path: "/features", 
      icon: "star", 
      color: "from-amber-500 to-amber-600",
      iconPath: "M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
    },
    { 
      label: "Contact", 
      path: "/contact", 
      icon: "phone", 
      color: "from-emerald-500 to-emerald-600",
      iconPath: "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
    }
  ];

  return (
    <ProtectedRoute>
      <div className="relative flex h-screen bg-white overflow-hidden">
        {/* Main layout container */}
        <div className="overflow-auto"style={{ scrollbarWidth: "none" }}>
          <Sidebar
            isOpen={sidebarOpen}
            setIsOpen={setSidebarOpen}
            onLogoutClick={() => setShowLogoutModal(true)}
          />
        </div>

        <div
          className={`transition-all duration-300 ease-in-out flex-1 flex flex-col ml-1 mr-1 ${
            sidebarOpen ? "lg:ml-64" : "lg:ml-2"
          } h-screen overflow-hidden`}
        >
          <div className="mt-6 mb-1">
            <Header />
          </div>

          <div className="flex-1 overflow-y-auto bg-[#f2f2f2] rounded-xl scrollbar-hide mb-3 mt-1" style={{ scrollbarWidth: "none" }}>
            <Outlet />
          </div>
        </div>

        {/* Draggable Floating Navigation Button */}
        <div 
          className="fixed z-50"
          style={{
            left: `${navPosition.x}px`,
            top: `${navPosition.y}px`,
            cursor: isDragging ? 'grabbing' : 'grab'
          }}
        >
          <div className="relative">
            {/* Main Navigation Button */}
            <button
              onMouseDown={handleMouseDown}
              onClick={() => !isDragging && setShowNavMenu(!showNavMenu)}
              className={`
                relative group overflow-hidden
                w-16 h-16 rounded-full shadow-2xl
                bg-gradient-to-br from-green-600 via-teal-600 to-yellow-600
                
                transform transition-all duration-300 ease-out
                hover:scale-105 hover:rotate-3 hover:shadow-3xl
                focus:outline-none focus:ring-4 focus:ring-purple-300/50
                active:scale-95 select-none
                ${showNavMenu ? 'rotate-45 scale-105' : ''}
                ${isDragging ? 'scale-110 shadow-3xl' : ''}
              `}
              aria-label="Navigation menu"
            >
              {/* Animated background gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-full"></div>
              
              {/* Icon */}
              <div className="relative z-10 flex items-center justify-center h-full">
                {showNavMenu ? (
                  <svg className="w-8 h-8 text-white drop-shadow-lg transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="w-8 h-8 text-white drop-shadow-lg transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </div>

              {/* Ripple effect */}
              <div className="absolute inset-0 rounded-full bg-white/10 scale-0 group-active:scale-100 transition-transform duration-150"></div>
              
              {/* Drag indicator */}
              <div className="absolute bottom-1 right-1 w-2 h-2 bg-white/30 rounded-full"></div>
            </button>

            {/* Bottom Semicircle Navigation Menu */}
            {showNavMenu && (
              <>
                <style>{`
                  @keyframes expandFromCenter {
                    from {
                      opacity: 0;
                      transform: scale(0) translate(var(--translate-x), var(--translate-y));
                    }
                    to {
                      opacity: 1;
                      transform: scale(1) translate(var(--translate-x), var(--translate-y));
                    }
                  }
                  .animate-expand-from-center {
                    animation: expandFromCenter 0.3s ease-out forwards;
                  }
                `}</style>
                
                {navigationItems.map((item, index) => {
                  const position = getBottomSemicirclePosition(index, navigationItems.length);
                  return (
                    <div
                      key={index}
                      className="absolute animate-expand-from-center"
                      style={{
                        '--translate-x': `${position.x}px`,
                        '--translate-y': `${position.y}px`,
                        transform: `translate(${position.x}px, ${position.y}px)`,
                        transformOrigin: 'center',
                        animationDelay: `${index * 0.1}s`
                      }}
                    >
                      <button
                        onClick={() => handleNavigation(item.path)}
                        className={`
                          group relative overflow-hidden
                          w-12 h-12 rounded-full shadow-xl
                          bg-gradient-to-r ${item.color}
                          hover:shadow-2xl hover:scale-110
                          transform transition-all duration-200 ease-out
                          focus:outline-none focus:ring-3 focus:ring-white/50
                          active:scale-95
                          flex items-center justify-center
                        `}
                        title={item.label}
                      >
                        {/* Background effects */}
                        <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent rounded-full"></div>
                        <div className="absolute inset-0 bg-white/10 scale-0 group-hover:scale-100 transition-transform duration-300 rounded-full"></div>
                        
                        {/* Icon */}
                        <div className="relative z-10">
                          <svg className="w-5 h-5 text-white drop-shadow-sm" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.iconPath} />
                          </svg>
                        </div>

                        {/* Shine effect */}
                        <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12"></div>
                      </button>
                      
                      {/* Label tooltip */}
                      <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50">
                        <span className="text-xs text-white bg-black/80 px-3 py-1 rounded-lg whitespace-nowrap shadow-lg">
                          {item.label}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </>
            )}
          </div>
        </div>

        {/* Backdrop for closing menu */}
        {showNavMenu && (
          <div
            className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm transition-opacity duration-300"
            onClick={() => setShowNavMenu(false)}
          />
        )}

        {showLogoutModal && (
          <LogoutModal
            onCancel={() => setShowLogoutModal(false)}
            onConfirm={handleLogout}
          />
        )}
      </div>
    </ProtectedRoute>
  );
};
const PublicLayout = () => {
  const location = useLocation();
  const hideNavbarRoutes = ["/login", "/register", "/forgot-password"];
  const shouldHideNavbar = hideNavbarRoutes.includes(location.pathname);

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

/* ─────────────────────────────────────────────────────────────
   App Component
   ──────────────────────────────────────────────────────────── */
const App = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  /* Splash screen logic */
  useEffect(() => {
    const checkSplashScreen = () => {
      if (isInitialLoad) {
        // Always show splash on initial load
        setShowSplash(true);
        setIsInitialLoad(false);
        
        const timer = setTimeout(() => {
          setShowSplash(false);
          setLastSplashTime();
        }, 4000);
        
        return () => clearTimeout(timer);
      } else if (shouldShowSplash()) {
        // Show splash if an hour has passed
        setShowSplash(true);
        
        const timer = setTimeout(() => {
          setShowSplash(false);
          setLastSplashTime();
        }, 4000);
        
        return () => clearTimeout(timer);
      } else {
        setShowSplash(false);
      }
    };

    checkSplashScreen();
  }, [isInitialLoad]);

  /* Check for hourly splash screen */
  useEffect(() => {
    const interval = setInterval(() => {
      if (shouldShowSplash() && !showSplash) {
        setShowSplash(true);
        
        setTimeout(() => {
          setShowSplash(false);
          setLastSplashTime();
        }, 4000);
      }
    }, 60000); // Check every minute

    return () => clearInterval(interval);
  }, [showSplash]);

  if (showSplash) return <JaimaxSplash />;

  return (
    <>
      <Routes>
        {/* ───────────────── Private / Dashboard Routes ─────────────── */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="wallet" element={<Wallet />} />
          <Route path="wallet/add-funds" element={<AddMoneyToWallet />} />
          <Route path="my-team" element={<MyTotalTeam />} />
          <Route path="shareholders" element={<Shareholders />} />
          <Route path="buy-history" element={<BuyHistory />} />
          <Route path="security" element={<Security />} />
          <Route path="profile" element={<Profile />} />
          <Route path="kyc" element={<Kyc />} />
          <Route path="withdrawal" element={<WithDrawal />} />
          <Route path="support" element={<Support />} />
        </Route>

        {/* Additional dashboard aliases (all protected) */}
        <Route path="/wallet" element={<DashboardLayout />}>
          <Route index element={<Wallet />} />
        </Route>
        <Route path="/my-team" element={<DashboardLayout />}>
          <Route index element={<MyTotalTeam />} />
        </Route>
        <Route path="/shareholders" element={<DashboardLayout />}>
          <Route index element={<Shareholders />} />
        </Route>
        <Route path="/earnings" element={<DashboardLayout />}>
          <Route index element={<TodayEarning />} />
        </Route>
        <Route path="wallet/add-funds" element={<DashboardLayout />}>
          <Route index element={<AddMoneyToWallet />} />
        </Route>
        <Route path="/buy-history" element={<DashboardLayout />}>
          <Route index element={<BuyHistory />} />
        </Route>
        <Route path="/security" element={<DashboardLayout />}>
          <Route index element={<Security />} />
        </Route>
        <Route path="/profile" element={<DashboardLayout />}>
          <Route index element={<Profile />} />
        </Route>
        <Route path="/kyc-information" element={<DashboardLayout />}>
          <Route index element={<Kyc />} />
        </Route>
        <Route path="/withdrawal" element={<DashboardLayout />}>
          <Route index element={<WithDrawal />} />
        </Route>
        <Route path="/support" element={<DashboardLayout />}>
          <Route index element={<Support />} />
        </Route>
        <Route path="/meetings" element={<DashboardLayout />}>
          <Route index element={<UserMeetingsShowcase />} />
        </Route>

        {/* ───────────────── Public Routes ─────────────────────────── */}
        <Route path="/" element={<PublicLayout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<AuthContainer />} />
          <Route path="register" element={<AuthContainer />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="about" element={<JaimaxComponent />} />
          <Route path="contact" element={<Contact />} />
          <Route path="features" element={<FeaturesSection />} />

          {/* Blog routes */}
          <Route path="blog">
            <Route index element={<BlogLayout />} />
            <Route path=":slug" element={<BlogDetailPage />} />
          </Route>

          {/* Services & info */}
          <Route path="services" element={<CryptoServicesFlipCards />} />
          <Route path="supporthome" element={<SupportPage />} />
          <Route path="privacy-policy" element={<PrivacyPolicy />} />
          <Route path="support-page" element={<SupportPage />} />
          <Route path="terms-and-conditions" element={<TermsConditions />} />
          <Route path="refund-policy" element={<RefundPolicy />} />
          <Route path="disclaimer" element={<Disclaimer />} />
          <Route path="Margintrading" element={<Margintrading />} />
          <Route path="ApiTrading" element={<ApiTrading />} />
          <Route path="SpotTrading" element={<SpotTrading />} />
          <Route path="FuturesTrading" element={<FuturesTrading />} />
          <Route path="PreSale" element={<PreSale />} />
          <Route path="ReferEarn" element={<ReferEarn />} />
        </Route>
      </Routes>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        style={{ zIndex: 9999 }}
      />
    </>
  );
};

export default App;