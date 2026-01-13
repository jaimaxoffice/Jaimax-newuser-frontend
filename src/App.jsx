import React, { useState, useEffect,useCallback,useMemo  } from "react";
import {
  Routes,
  Route,
  useLocation,
  Outlet,
  Navigate,
  useNavigate,
} from "react-router-dom";

import Navbar from "./global/Navbar";
import Footer from "./global/Footer";
import JaimaxSplash from "./global/Splashscreen";
import FloatingWhatsapp from "./global/FloatingWhatsapp";
import Landingpage from "./pages/home/Landingpage";
import AuthContainer from "./Authentication/Login";
import ForgotPassword from "./Authentication/ForgotPassword";
import ErrorBoundary from "./pages/chatSupport/ErrorBoundary";
import ChatAssistant from "./pages/chatSupport/chatComponent";
import Home from "./pages/home/Home";
import JaimaxComponent from "./components/About/About";
import Contact from "./components/contact/Contact";
import FeaturesSection from "./pages/home/HomeFeatures";
import BlogLayout from "./components/BlogSection/Blog";
import BlogDetailPage from "./components/BlogSection/Article";
import CryptoServicesFlipCards from "./components/MainServices/services";
import SupportPage from "./global/SupportPage";
import { SupportChart } from "./components/Dashboard/pages/support/support";
import RefundPolicy from "./global/RefundPolicy";
import TermsConditions from "./global/TermsConditons";
import PrivacyPolicy from "./global/PrivacyPolicy";
import Disclaimer from "./global/Disclaimer";
import AmlCtfPolicy from "./global/Aml_Ctf";
import Margintrading from "./services/Margintrading";
import ApiTrading from "./services/Apitrading";
import SpotTrading from "./services/Spottrading";
import FuturesTrading from "./services/Futurestrading";
import PreSale from "./services/Presale";
import ReferEarn from "./services/Referearn";
import KycPmlaPolicy from "./global/Kyc_Pmla";
import Dashboard from "./components/Dashboard/pages/dashBoard/dashBoard";
import Wallet from "./components/Dashboard/pages/wallet/wallet";
import MyTotalTeam from "./components/Dashboard/pages/myTotalTeam/myTotalTeam";
import BuyHistory from "./components/Dashboard/pages/buyHistory/buyHistory";
import Security from "./components/Dashboard/pages/security/security";
import Profile from "./components/Dashboard/pages/profile/profile";
import Kyc from "./components/Dashboard/pages/kyc/kyc";
import WithDrawal from "./components/Dashboard/pages/widthDrawal/withDrawal";
import Support from "./components/Dashboard/pages/support/support";
import Sidebar from "./ReusableComponents/sideBar/Sidebar";
import Header from "./ReusableComponents/header/header";
import LogoutModal from "./components/Dashboard/pages/logout/logout";
import Shareholders from "./components/Dashboard/pages/shareholders/shareholders";
import AddMoneyToWallet from "./components/Dashboard/pages/AddMoneyToWallet/AddMoneyToWallet";
import UserMeetingsShowcase from "./components/Dashboard/pages/Meetings/Zoommeetings";
import PrivateRoute from "./router/PrivateRoute";
import SuperBonusInfo from "./components/Dashboard/pages/lockedSuperBouns/LockedSuperbonus";
import UserDetailsComponent from "./components/Dashboard/pages/jwallet/jwallet";
import Cookies from "js-cookie";
import PublicRoute from "./router/PublicRoute";
import MarketingPlanReferrals from "./components/Dashboard/pages/GoaVacation/GoaVacation";
import FoundationBonusUI from "./components/Dashboard/pages/Foundation/Foundation";
import PromotersPage from "./components/Dashboard/pages/Promoters/Promoters";
import GuaranteedWealthDashboard from "./components/Dashboard/pages/GuaranteedWealthPlan/GuaranteedWealthPlan";
import GuaranteedWealthDashboard2_O from "./components/Dashboard/pages/GuaranteedWealth2.O/GuaranteedWealth2.O";
import { ToastContainer } from "./ReusableComponents/Toasts/Toasts";
import PreSaleCryptoCoin from "./services/PreSaleCryptoCoin";
import NotFound from "./pages/home/NotFound";
import Snowfall from "react-snowfall";
import KYCForm from "./components/Dashboard/pages/kyc/KYCForm";
const getAuthToken = () => {
  try {
    return Cookies.get("token") || null;
  } catch (error) {
    return null;
  }
};

const isAuthenticated = () => {
  const token = getAuthToken();
  return token;
};

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
    // console.error("Error getting last splash time from localStorage:", error);
    return null;
  }
};

const setLastSplashTime = () => {
  try {
    localStorage.setItem("lastSplashTime", Date.now().toString()); // Stores the current timestamp
  } catch (error) {
    // console.error("Error setting last splash time in localStorage:", error);
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
      // console.error("Error during logout:", error);
    }
    setShowLogoutModal(false);
    window.location.href = "/login/"; // Or use navigate("/login") if using react-router
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
    <div className="relative flex h-screen bg-[#1d8d84] overflow-hidden ">

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
// const PublicLayout = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const hideNavbarRoutes = ["/login/", "/register/", "/forgot-password/"];
//   const shouldHideNavbar = hideNavbarRoutes.includes(location.pathname);
//   return (
//     <div className="min-h-screen flex flex-col overflow-y-auto scrollbar-hide">
//       {!shouldHideNavbar && <Navbar />}
//       <main className="flex-1">
//         <Outlet />
//       </main>
//       {!shouldHideNavbar && <Footer />}
//       {/* {!shouldHideNavbar && <FloatingWhatsapp />} */}
//     </div>
//   );
// };
const PublicLayout = () => {
  const location = useLocation();

  const path = location.pathname.replace(/\/+$/, ""); // remove trailing slash
  const hideNavbarRoutes = ["/login", "/register", "/forgot-password"];

  const shouldHideNavbar = hideNavbarRoutes.includes(path);

  return (
    <div className="min-h-screen flex flex-col overflow-y-auto scrollbar-hide">
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

  const hideChatOnPaths = ["/login/", "/register/", "/forgot-password/"];
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
        }, 6000);

        return () => clearTimeout(timer);
      } else if (shouldShowSplash()) {
        setShowSplash(true);

        const timer = setTimeout(() => {
          setShowSplash(false);
          setLastSplashTime();
        }, 6000);

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
    }, 200000);

    return () => clearInterval(interval);
  }, [showSplash]);
const images = useMemo(() => {
    const img = new Image();
    img.src = "/poster.png";
    return [img];
  }, []);
  if (showSplash) return <JaimaxSplash />;

  return (
    <>
      {showChat && (
        <>
          <ToastContainer position="top-right" maxToasts={2} />
          <div className="fixed bottom-20 right-6 z-50 flex flex-col items-center">
            <button
              onClick={toggleChat}
              className="bg-white text-purple-600 rounded-full w-14 h-14 
             shadow-2xl
             flex items-center justify-center transition-all duration-300 
             backdrop-blur-sm
             border border-purple-200 "
              aria-label="AI Assistant"
            >
              {chatOpen ? (
                // Cross icon when chat is open
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 transform transition-transform duration-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="#085056"
                  strokeWidth={3}
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              ) : (
                // Message icon when chat is closed
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="34"
                  height="34"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#085056"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-message-circle-more-icon lucide-message-circle-more"
                >
                  <path d="M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719" />
                  <path d="M8 12h.01" />
                  <path d="M12 12h.01" />
                  <path d="M16 12h.01" />
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


      <FloatingWhatsapp />
      <Routes>
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="wallet" element={<Wallet />} />
            {/* <Route path="shareholders" element={<Shareholders />} /> */}
            {/* <Route path="locked-superbonu" element={<SuperBonusInfo />} /> */}
            <Route path="buy-history" element={<BuyHistory />} />
            <Route path="security" element={<Security />} />
            <Route path="profile" element={<Profile />} />
            <Route path="kyc" element={<Kyc />} />
            <Route path="withdrawal" element={<WithDrawal />} />
            <Route path="support" element={<Support />} />
            {/* <Route path="foundation" element={<Support />} /> */}
            <Route path="promoters" element={<Support />} />
          </Route>

          <Route path="/wallet" element={<DashboardLayout />}>
            <Route index element={<Wallet />} />
          </Route>
          <Route path="/add-funds" element={<DashboardLayout />}>
            <Route index element={<AddMoneyToWallet />} />
          </Route>
          {/* <Route path="/my-team" element={<DashboardLayout />}>
            <Route index element={<MyTotalTeam />} />
          </Route> */}

          {/* <Route path="/locked-superbonus" element={<DashboardLayout />}>
            <Route index element={<SuperBonusInfo />} />
          </Route> */}
          <Route path="/buy-history" element={<DashboardLayout />}>
            <Route index element={<BuyHistory />} />
          </Route>
          <Route path="/security" element={<DashboardLayout />}>
            <Route index element={<Security />} />
          </Route>
          <Route path="/goa-vacation" element={<DashboardLayout />}>
            <Route index element={<MarketingPlanReferrals />} />
          </Route>
          <Route path="/profile" element={<DashboardLayout />}>
            <Route index element={<Profile />} />
          </Route>
          <Route path="/jwallet" element={<DashboardLayout />}>
            <Route index element={<UserDetailsComponent />} />
          </Route>
          {/* <Route path="/foundation" element={<DashboardLayout />}>
            <Route index element={<FoundationBonusUI />} />
          </Route> */}
          <Route path="/promoters" element={<DashboardLayout />}>
            <Route index element={<PromotersPage />} />
          </Route>
          {/* <Route path="/guaranteedwealthplan" element={<DashboardLayout />}>
            <Route index element={<GuaranteedWealthDashboard />} />
          </Route>
          <Route path="/guaranteedwealthplan-2-0" element={<DashboardLayout />}>
            <Route index element={<GuaranteedWealthDashboard2_O />} />
          </Route> */}
          <Route path="/kyc-information" element={<DashboardLayout />}>
            <Route index element={<KYCForm />} />
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
              isAuthenticated() ? (
                <Navigate to="/dashboard" replace />
              ) : (
                <Home />
              )
            }
          />

          <Route element={<PublicRoute />}>
            <Route path="login/" element={<AuthContainer />} />
            <Route path="register/" element={<AuthContainer />} />
            <Route path="forgot-password/" element={<ForgotPassword />} />
          </Route>
          <Route path="about/" element={<JaimaxComponent />} />
          <Route path="contact/" element={<Contact />} />
          <Route path="features/" element={<FeaturesSection />} />
          <Route path="landingpage" element={<Landingpage />} />
          <Route path="blog/">
            <Route index element={<BlogLayout />} />
            <Route path=":slug" element={<BlogDetailPage />} />
          </Route>

          <Route path="services/" element={<CryptoServicesFlipCards />} />
          <Route path="privacy-policy/" element={<PrivacyPolicy />} />
          <Route path="/supportpage" element={<SupportPage />} />
          <Route path="terms-and-conditions/" element={<TermsConditions />} />
          <Route path="refund-policy/" element={<RefundPolicy />} />
          <Route path="disclaimer/" element={<Disclaimer />} />
          <Route path="Margintrading/" element={<Margintrading />} />
          <Route path="ApiTrading/" element={<ApiTrading />} />
          <Route path="SpotTrading/" element={<SpotTrading />} />
          {/* <Route
            path="best-presale-crypto-token-in-india/"
            element={<PreSaleCryptoCoin />}
          /> */}
          <Route
    path="/best-presale-crypto-coin-in-india"
    element={<Navigate to="/best-presale-crypto-token-in-india" replace />}
  />

  {/* Correct page */}
  <Route
    path="/best-presale-crypto-token-in-india"
    element={<PreSaleCryptoCoin />}
  />
          <Route path="FuturesTrading/" element={<FuturesTrading />} />
          <Route path="PreSale/" element={<PreSale />} />
          <Route path="Kyc-Pmla/" element={<KycPmlaPolicy />} />
          <Route path="AML-CTF" element={<AmlCtfPolicy />} />
          <Route path="ReferEarn" element={<ReferEarn />} />
        </Route>

        {/* <Route path="*" element={<Navigate to="/" replace />} /> */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default App;
