

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

import Navbar from "./global/Navbar";
import Footer from "./global/Footer";
import JaimaxSplash from "./global/Splashscreen";


import AuthContainer from "./Authentication/Login";
import ForgotPassword from "./Authentication/ForgotPassword";

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


import Margintrading from "./services/Margintrading";
import ApiTrading from "./services/Apitrading";
import SpotTrading from "./services/Spottrading";
import FuturesTrading from "./services/Futurestrading";
import PreSale from "./services/Presale";
import ReferEarn from "./services/Referearn";


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
import FloatingNavButton from "./global/FloatingNavButton";
import UserDetailsComponent from './components/Dashboard/pages/jwallet/jwallet'
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


const PublicRoute = () => {
  const userIsAuthenticated = isAuthenticated();

  console.log("PublicRoute - Is Authenticated:", userIsAuthenticated);

  if (userIsAuthenticated) {
    console.log("User is authenticated, redirecting to dashboard");
    return <Navigate to="/dashboard" replace />;
  }
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
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
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
        className={`transition-all duration-300 ease-in-out flex-1 flex flex-col ml-1 mr-1 ${sidebarOpen ? "lg:ml-64" : "lg:ml-2"
          } h-screen overflow-hidden`}
      >
        <div className=" mb-1">
          <Header />
        </div>

        <div
          className="flex-1 overflow-y-auto bg-[#1d8d84] rounded-xl scrollbar-hide mb-3 "
          style={{ scrollbarWidth: "none" }}
        >
          <Outlet />
        </div>
      </div>

      {/* <FloatingNavButton /> */}

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
          <Route path="wallet" element={<Wallet />}>
            <Route path="add-funds" element={<AddMoneyToWallet />} />
          </Route>
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
        <Route path="/jwallet" element={<DashboardLayout />}>
          <Route index element={< UserDetailsComponent />} />
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
