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
import {
  Routes,
  Route,
  useLocation,
  Outlet,
  Navigate,
  useNavigate,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

/* ── Global layout / shared UI ─────────────────────────────── */
import Navbar from "./global/Navbar";
import Footer from "./global/Footer";
import JaimaxSplash from "./global/Splashscreen";

/* ── Auth / User pages ─────────────────────────────────────── */
import AuthContainer from "./Authentication/Login";
import ForgotPassword from "./Authentication/ForgotPassword";
// import PublicRoute from "./Authentication/PublicRoute"; // Commented out due to import error

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
import ProtectedRoute from "./router/PrivateRoute";
import FloatingNavButton from "./global/FlottingToggle";
// import PublicRoute from "./router/PublicRoute";

// Enhanced authentication helper functions
const getAuthToken = () => {
  try {
    return localStorage.getItem("token");
  } catch (error) {
    console.error("Error accessing storage:", error);
    return null;
  }
};

const isValidToken = (token) => {
  if (!token) return false;

  try {
    // If you're using JWT, you can decode and check expiration
    // For now, just check if token exists and is not empty
    return token.length > 0;

    // Uncomment below if you're using JWT:
    /*
    const payload = JSON.parse(atob(token.split('.')[1]));
    const currentTime = Date.now() / 1000;
    return payload.exp > currentTime;
    */
  } catch (error) {
    console.error("Invalid token:", error);
    return false;
  }
};

const isAuthenticated = () => {
  const token = getAuthToken();
  return isValidToken(token);
};

// Updated PublicRoute Component
const PublicRoute = () => {
  const userIsAuthenticated = isAuthenticated();

  console.log("PublicRoute - Is Authenticated:", userIsAuthenticated);

  // If user is authenticated, redirect to dashboard
  if (userIsAuthenticated) {
    console.log("User is authenticated, redirecting to dashboard");
    return <Navigate to="/dashboard" replace />;
  }

  // Allow access to auth routes (login, register, forgot-password)
  return <Outlet />;
};

const getLastSplashTime = () => {
  try {
    return localStorage.getItem("lastSplashTime");
  } catch (error) {
    console.error("Error accessing storage:", error);
    return null;
  }
};

const setLastSplashTime = () => {
  try {
    localStorage.setItem("lastSplashTime", Date.now().toString());
  } catch (error) {
    console.error("Error setting last splash time:", error);
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
   Dashboard Layout Component
   ──────────────────────────────────────────────────────────── */
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
      const x = window.innerWidth - 80;
      const y = window.innerHeight - 80;
      setNavPosition({ x, y });
    };

    updatePosition();
    window.addEventListener("resize", updatePosition);
    return () => window.removeEventListener("resize", updatePosition);
  }, []);

  const handleLogout = () => {
    try {
      localStorage.removeItem("token");
      sessionStorage.removeItem("token");
      localStorage.removeItem("lastSplashTime");
    } catch (error) {
      console.error("Error during logout:", error);
    }
    setShowLogoutModal(false);
    window.location.href = "/login";
  };

  const handleNavigation = (path) => {
    setShowNavMenu(false);
    window.location.href = path;
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    const rect = e.currentTarget.getBoundingClientRect();
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;

    const buttonSize = 64;
    const padding = 16;

    let newX = e.clientX - dragOffset.x;
    let newY = e.clientY - dragOffset.y;

    newX = Math.max(
      padding,
      Math.min(newX, window.innerWidth - buttonSize - padding)
    );
    newY = Math.max(
      padding,
      Math.min(newY, window.innerHeight - buttonSize - padding)
    );

    setNavPosition({ x: newX, y: newY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };
    }
  }, [isDragging, dragOffset]);

  const getBottomSemicirclePosition = (index, total) => {
    const radius = 90;
    const startAngle = Math.PI;
    const endAngle = 2 * Math.PI;
    const angle = startAngle + (index * (endAngle - startAngle)) / (total - 1);
    const x = radius * Math.cos(angle);
    const y = radius * Math.sin(angle);
    return { x, y };
  };

  return (
    <div className="relative flex h-screen bg-white overflow-hidden">
      {/* Sidebar */}
      <div className="overflow-auto" style={{ scrollbarWidth: "none" }}>
        <Sidebar
          isOpen={sidebarOpen}
          setIsOpen={setSidebarOpen}
          onLogoutClick={() => setShowLogoutModal(true)}
        />
      </div>

      {/* Main Content */}
      <div
        className={`transition-all duration-300 ease-in-out flex-1 flex flex-col ml-1 mr-1 ${
          sidebarOpen ? "lg:ml-64" : "lg:ml-2"
        } h-screen overflow-hidden`}
      >
        <div className="mt-6 mb-1">
          <Header />
        </div>

        <div
          className="flex-1 overflow-y-auto bg-[#f2f2f2] rounded-xl scrollbar-hide mb-3 mt-1"
          style={{ scrollbarWidth: "none" }}
        >
          <Outlet />
        </div>
      </div>

      <FloatingNavButton />

      {/* Backdrop */}
      {showNavMenu && (
        <div
          className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm transition-opacity duration-300"
          onClick={() => setShowNavMenu(false)}
        />
      )}

      {/* Logout Modal */}
      {showLogoutModal && (
        <LogoutModal
          onCancel={() => setShowLogoutModal(false)}
          onConfirm={handleLogout}
        />
      )}
    </div>
  );
};

/* ─────────────────────────────────────────────────────────────
   Public Layout Component
   ──────────────────────────────────────────────────────────── */
// Updated PublicLayout Component
const PublicLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const hideNavbarRoutes = ["/login", "/register", "/forgot-password"];
  const shouldHideNavbar = hideNavbarRoutes.includes(location.pathname);

  // Check authentication and redirect if needed
  useEffect(() => {
    const userIsAuthenticated = isAuthenticated();

    console.log("PublicLayout - Location:", location.pathname);
    console.log("PublicLayout - Is Authenticated:", userIsAuthenticated);

    // If user is authenticated and trying to access home page, redirect to dashboard
    if (userIsAuthenticated && location.pathname === "/") {
      console.log("Authenticated user on home page, redirecting to dashboard");
      navigate("/dashboard", { replace: true });
    }
  }, [location.pathname, navigate]);

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

// const isAuthenticated = () => {
//   const token = getAuthToken();
//   return token !== null && token !== undefined && token !== "";
// };
// const PublicLayout = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const isAuthenticated = isAuthenticated(); // Use the helper function to check auth status
//   const hideNavbarRoutes = ["/login", "/register", "/forgot-password"];
//   const shouldHideNavbar = hideNavbarRoutes.includes(location.pathname);
//   // Redirect authenticated users to dashboard from home page
//   useEffect(() => {
//     if (isAuthenticated && location.pathname === "/") {
//       navigate("/dashboard", { replace: true });
//     }
//   }, [isAuthenticated, location.pathname, navigate]);

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

/* ─────────────────────────────────────────────────────────────
   Main App Component
   ──────────────────────────────────────────────────────────── */
const App = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  useEffect(() => {
    const checkSplashScreen = () => {
      if (isInitialLoad) {
        setShowSplash(true);
        setIsInitialLoad(false);

        const timer = setTimeout(() => {
          setShowSplash(false);
          setLastSplashTime();
        }, 4000);

        return () => clearTimeout(timer);
      } else if (shouldShowSplash()) {
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

  useEffect(() => {
    const interval = setInterval(() => {
      if (shouldShowSplash() && !showSplash) {
        setShowSplash(true);

        setTimeout(() => {
          setShowSplash(false);
          setLastSplashTime();
        }, 4000);
      }
    }, 60000);

    return () => clearInterval(interval);
  }, [showSplash]);

  if (showSplash) return <JaimaxSplash />;

  return (
    <Routes>
      {/* ─────── Protected Routes (Dashboard) ─────── */}
      <Route element={<ProtectedRoute />}>
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

        {/* Additional protected routes with DashboardLayout */}
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
      </Route>

      {/* ─────── Public Routes ─────── */}
      <Route path="/" element={<PublicLayout />}>
        <Route index element={<Home />} />

        {/* Auth Routes - Protected from logged-in users */}
        <Route element={<PublicRoute />}>
          <Route path="login" element={<AuthContainer />} />
          <Route path="register" element={<AuthContainer />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
        </Route>

        {/* Public pages */}
        <Route path="about" element={<JaimaxComponent />} />
        <Route path="contact" element={<Contact />} />
        <Route path="features" element={<FeaturesSection />} />

        <Route path="blog">
          <Route index element={<BlogLayout />} />
          <Route path=":slug" element={<BlogDetailPage />} />
        </Route>

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

      {/* Catch all route - redirect to home */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default App;
