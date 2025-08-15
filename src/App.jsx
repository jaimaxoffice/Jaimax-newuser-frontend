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
import { SupportChart } from "./components/Dashboard/pages/support/support";
import RefundPolicy from "./global/RefundPolicy";
import TermsConditions from "./global/TermsConditons";
import PrivacyPolicy from "./global/PrivacyPolicy";
import Disclaimer from "./global/Disclaimer";
import AmlCtfPolicy from './global/Aml_Ctf'
import Margintrading from "./services/Margintrading";
import ApiTrading from "./services/Apitrading";
import SpotTrading from "./services/Spottrading";
import FuturesTrading from "./services/Futurestrading";
import PreSale from "./services/Presale";
import ReferEarn from "./services/Referearn";
import KycPmlaPolicy from './global/Kyc_Pmla'
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
import PrivateRoute from "./router/PrivateRoute";
import FloatingNavButton from "./global/FloatingNavButton";
import UserDetailsComponent from "./components/Dashboard/pages/jwallet/jwallet";
import Cookies from "js-cookie";
import PublicRoute from "./router/PublicRoute";
import ImagesUpload from './components/ImgesAdmin/Images'
import ErrorBoundary from "./pages/chatbot/ErrorBoundary";
import ChatAssistant from "./pages/chatbot/chatComponent";
// const getAuthToken = () => {
//   try {
//     return localStorage.getItem("token") || null; // Switched to localStorage
//   } catch (error) {
//     console.error("Error accessing localStorage:", error);
//     return null;
//   }
// };
const getAuthToken = () => {
  try {
    return Cookies.get("token") || null;
  } catch (error) {
    console.error("Error accessing cookies:", error);
    return null;
  }
};
// const isValidToken = (token) => {
//   // No need for try/catch here, just check if token is a non-empty string
//   return typeof token === "string" && token.length > 0;
// };

const isAuthenticated = () => {
  const token = getAuthToken();
  return token;
};

// const PublicRoute = () => {
//   if (isAuthenticated()) {
//     return <Navigate to="/dashboard" replace />;
//   }
//   return <Outlet />;
// };

const getLastSplashTime = () => {
  try {
    const lastTime = localStorage.getItem("lastSplashTime");
    if (lastTime) {
      const oneDay = 24 * 60 * 60 * 1000; // 1 day in milliseconds
      if (Date.now() - parseInt(lastTime) > oneDay) {
        localStorage.removeItem("lastSplashTime"); // Remove if expired
        return null;
      }
      return lastTime;
    }
    return null;
  } catch (error) {
    console.error("Error getting last splash time from localStorage:", error);
    return null;
  }
};

const setLastSplashTime = () => {
  try {
    localStorage.setItem("lastSplashTime", Date.now().toString()); // Stores the current timestamp
  } catch (error) {
    console.error("Error setting last splash time in localStorage:", error);
  }
};

const shouldShowSplash = () => {
  const lastSplashTime = getLastSplashTime();
  if (!lastSplashTime) return true;

  const oneHour = 60 * 60 * 1000; // 1 hour in milliseconds
  const timeSinceLastSplash = Date.now() - parseInt(lastSplashTime);

  return timeSinceLastSplash >= oneHour;
};

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showNavMenu, setShowNavMenu] = useState(false);
  const [navPosition, setNavPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
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
    Cookies.remove("token");
    Cookies.remove("userData");
    Cookies.remove("email");
    Cookies.remove("rememberMe");
    sessionStorage.removeItem("isPinVerified");
  } catch (error) {
    console.error("Error during logout:", error);
  }
  setShowLogoutModal(false);
  window.location.href = "/login"; // Or use navigate("/login") if using react-router
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
      <div className="overflow-auto" style={{ scrollbarWidth: "none" }}>
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
  );
};
const PublicLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
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

const App = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [chatOpen, setChatOpen] = useState(false);
  const toggleChat = () => setChatOpen((prev) => !prev);
  const [userDetails, setUserDetails] = useState(null);

  const hideChatOnPaths = ["/login", "/register", "/forgot-password"];
  const isSupportChatRoute = location.pathname.startsWith(
    "/dashboard/support/support-chat"
  );
  const showChat =
    !hideChatOnPaths.includes(location.pathname) && !isSupportChatRoute;
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
        }, 500);
      }
    }, 60000);

    return () => clearInterval(interval);
  }, [showSplash]);

  if (showSplash) return <JaimaxSplash />;

  return (
  <>
  
     {showChat && (
  <>
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-center">
      <button
        onClick={toggleChat}
        className="bg-white text-purple-600 rounded-full w-16 h-16 
        shadow-2xl hover:shadow-purple-300 hover:shadow-3xl
        flex items-center justify-center transition-all duration-300 transform hover:scale-110 
        focus:outline-none focus:ring-4 focus:ring-purple-300 backdrop-blur-sm
        border border-purple-200 animate-bounce hover:animate-none"
        aria-label="AI Assistant"
      >
        {chatOpen ? (
          // Cross icon when chat is open
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 transform transition-transform duration-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={3}
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        ) : (
          // Robot icon when chat is closed
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12 transform transition-transform duration-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <rect x="6" y="8" width="12" height="8" rx="2" ry="2" />
            <circle cx="9" cy="12" r="1" />
            <circle cx="15" cy="12" r="1" />
            <line x1="12" y1="6" x2="12" y2="8" />
          </svg>
        )}
      </button>
    </div>

    {chatOpen && (
      <ErrorBoundary>
        <ChatAssistant onClose={() => setChatOpen(false)} />
      </ErrorBoundary>
    )}
  </>
)}
    <Routes>
      <Route element={<PrivateRoute />}>
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="wallet" element={<Wallet />}/>
          <Route path="my-team" element={<MyTotalTeam />} />
          <Route path="shareholders" element={<Shareholders />} />
          <Route path="buy-history" element={<BuyHistory />} />
          <Route path="security" element={<Security />} />
          <Route path="profile" element={<Profile />} />
          <Route path="kyc" element={<Kyc />} />
          <Route path="withdrawal" element={<WithDrawal />} />
          <Route path="support" element={<Support />} />
          
        </Route>

        <Route path="/wallet" element={<DashboardLayout />}>
          <Route index element={<Wallet />} />
        </Route>
        <Route path="/add-funds" element={<DashboardLayout />}>
          <Route index element={<AddMoneyToWallet />} />
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
          <Route index element={<UserDetailsComponent />} />
        </Route>
        <Route path="/kyc-information" element={<DashboardLayout />}>
          <Route index element={<Kyc />} />
        </Route>
        <Route path="/withdrawal" element={<DashboardLayout />}>
          <Route index element={<WithDrawal />} />
        </Route>
        <Route path="/support" element={<DashboardLayout />}>
          <Route index element={<Support />} />
          
        <Route path="support-chat/:id" element={<SupportChart />} />

        </Route>
        <Route path="/meetings" element={<DashboardLayout />}>
          <Route index element={<UserMeetingsShowcase />} />
        </Route>
      </Route>

      <Route path="/" element={<PublicLayout />}>
        <Route
          index
          element={
            isAuthenticated() ? <Navigate to="/dashboard" replace /> : <Home />
          }
        />
        <Route element={<PublicRoute />}>
          <Route path="login" element={<AuthContainer />} />
          <Route path="register" element={<AuthContainer />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
        </Route>
        <Route path="about" element={<JaimaxComponent />} />
        <Route path="contact" element={<Contact />} />
        <Route path="features" element={<FeaturesSection />} />
        <Route path="/images" element={<ImagesUpload/>}/>

        <Route path="blog">
          <Route index element={<BlogLayout />} />
          <Route path=":slug" element={<BlogDetailPage />} />
        </Route>

        <Route path="services" element={<CryptoServicesFlipCards />} />
        <Route path="supporthome" element={<SupportPage />} />
        <Route path="privacy-policy" element={<PrivacyPolicy />} />
        <Route path="support-page" element={<SupportPage />} />
        <Route path="support-chat/:id" element={<SupportChart />} />
        <Route path="terms-and-conditions" element={<TermsConditions />} />
        <Route path="refund-policy" element={<RefundPolicy />} />
        <Route path="disclaimer" element={<Disclaimer />} />
        <Route path="Margintrading" element={<Margintrading />} />
        <Route path="ApiTrading" element={<ApiTrading />} />
        <Route path="SpotTrading" element={<SpotTrading />} />
        <Route path="FuturesTrading" element={<FuturesTrading />} />
        <Route path="PreSale" element={<PreSale />} />
        <Route path="Kyc_Pmla" element={<KycPmlaPolicy />} />
        <Route path="AML_CTF" element={<AmlCtfPolicy  />} />
        <Route path="ReferEarn" element={<ReferEarn />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  </>
  );
};

export default App;
