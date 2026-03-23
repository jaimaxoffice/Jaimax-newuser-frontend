// import React, { useState, useEffect, useMemo, useCallback } from "react";
// import { Routes, Route, Navigate, useLocation } from "react-router-dom";
// import DashboardLayout from "./layouts/DashboardLayout";
// import PublicLayout from "./layouts/PublicLayout";
// import PrivateRoute from "./router/PrivateRoute";
// import PublicRoute from "./router/PublicRoute";
// import { isAuthenticated } from "./utils/auth";
// import { shouldShowSplash, setLastSplashTime } from "./utils/splash.utils";
// import JaimaxSplash from "./global/Splashscreen";
// import FloatingWhatsapp from "./global/FloatingWhatsapp";
// import { ToastContainer } from "./ReusableComponents/Toasts/Toasts";
// import CoinPricePopup from "./ReusableComponents/popups/Countdown";
// import ErrorBoundary from "./pages/chatSupport/ErrorBoundary";
// import ChatAssistant from "./pages/chatSupport/chatComponent";
// import Home from "./pages/home/Home";
// import Landingpage from "./pages/home/Landingpage";
// import NotFound from "./pages/home/NotFound";
// import JaimaxComponent from "./components/About/About";
// import Contact from "./components/contact/Contact";
// import FeaturesSection from "./pages/home/HomeFeatures";
// import BlogLayout from "./components/BlogSection/Blog";
// import BlogDetailPage from "./components/BlogSection/Article";
// import CryptoServicesFlipCards from "./components/MainServices/services";
// import SupportPage from "./global/SupportPage";
// import RefundPolicy from "./global/RefundPolicy";
// import TermsConditions from "./global/TermsConditons";
// import PrivacyPolicy from "./global/PrivacyPolicy";
// import Disclaimer from "./global/Disclaimer";
// import AmlCtfPolicy from "./global/Aml_Ctf";
// import KycPmlaPolicy from "./global/Kyc_Pmla";
// import Margintrading from "./services/Margintrading";
// import ApiTrading from "./services/Apitrading";
// import SpotTrading from "./services/Spottrading";
// import FuturesTrading from "./services/Futurestrading";
// import PreSale from "./services/Presale";
// import ReferEarn from "./services/Referearn";
// import PreSaleCryptoCoin from "./services/PreSaleCryptoCoin";
// import AuthContainer from "./Authentication/Login";
// import ForgotPassword from "./Authentication/ForgotPassword";
// import Dashboard from "./components/Dashboard/pages/dashBoard/dashBoard";
// import Wallet from "./components/Dashboard/pages/wallet/wallet";
// import BuyHistory from "./components/Dashboard/pages/buyHistory/buyHistory";
// import Security from "./components/Dashboard/pages/security/security";
// import Profile from "./components/Dashboard/pages/profile/profile";
// import Kyc from "./components/Dashboard/pages/kyc/kyc";
// import WithDrawal from "./components/Dashboard/pages/widthDrawal/WithdrawalRoute";
// import Support, {SupportChart,} from "./components/Dashboard/pages/support/support";
// import AddMoneyToWallet from "./components/Dashboard/pages/AddMoneyToWallet/AddMoneyToWallet";
// import UserMeetingsShowcase from "./components/Dashboard/pages/Meetings/Zoommeetings";
// import UserDetailsComponent from "./components/Dashboard/pages/jwallet/jwallet";

// const HIDE_CHAT_PATHS = ["/login", "/register", "/forgot-password"];
// const SPLASH_DURATION = 5000;
// const ChatButton = ({ isOpen, onClick }) => (
//   <button
//     onClick={onClick}
//     className="bg-white text-purple-600 rounded-full w-14 h-14 
//                shadow-2xl flex items-center justify-center 
//                transition-all duration-300 backdrop-blur-sm
//                border border-purple-200 hover:scale-110"
//     aria-label="AI Assistant"
//   >
//     {isOpen ? (
//       <svg
//         xmlns="http://www.w3.org/2000/svg"
//         className="h-6 w-6 transform transition-transform duration-300"
//         fill="none"
//         viewBox="0 0 24 24"
//         stroke="#085056"
//         strokeWidth={3}
//       >
//         <line x1="18" y1="6" x2="6" y2="18" />
//         <line x1="6" y1="6" x2="18" y2="18" />
//       </svg>
//     ) : (
//       <svg
//         xmlns="http://www.w3.org/2000/svg"
//         width="34"
//         height="34"
//         viewBox="0 0 24 24"
//         fill="none"
//         stroke="#085056"
//         strokeWidth={2}
//         strokeLinecap="round"
//         strokeLinejoin="round"
//       >
//         <path d="M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719" />
//         <path d="M8 12h.01" />
//         <path d="M12 12h.01" />
//         <path d="M16 12h.01" />
//       </svg>
//     )}
//   </button>
// );
// const App = () => {
//   const location = useLocation();
//   const [showSplash, setShowSplash] = useState(true);
//   const [isInitialLoad, setIsInitialLoad] = useState(true);
//   const [chatOpen, setChatOpen] = useState(false);
//   const showChat = useMemo(() => {
//     const isSupportChatRoute = location.pathname.startsWith(
//       "/dashboard/support/support-chat",
//     );
//     return !HIDE_CHAT_PATHS.includes(location.pathname) && !isSupportChatRoute;
//   }, [location.pathname]);
//   const toggleChat = useCallback(() => {
//     setChatOpen((prev) => !prev);
//   }, []);

//   const closeChat = useCallback(() => {
//     setChatOpen(false);
//   }, []);
//   useEffect(() => {
//     const handleSplashScreen = () => {
//       if (isInitialLoad || shouldShowSplash()) {
//         setShowSplash(true);
//         if (isInitialLoad) setIsInitialLoad(false);

//         const timer = setTimeout(() => {
//           setShowSplash(false);
//           setLastSplashTime();
//         }, SPLASH_DURATION);

//         return () => clearTimeout(timer);
//       }
//       setShowSplash(false);
//     };

//     handleSplashScreen();
//   }, [isInitialLoad]);
//   useEffect(() => {
//     const interval = setInterval(() => {
//       if (shouldShowSplash() && !showSplash) {
//         setShowSplash(true);
//         setTimeout(() => {
//           setShowSplash(false);
//           setLastSplashTime();
//         }, 500);
//       }
//     }, 200000);

//     return () => clearInterval(interval);
//   }, [showSplash]);


//   return (
//     <>

// {/* global components to show */}
//       {showChat && (
//         <>
//           <ToastContainer position="top-right" maxToasts={2} />
//           <div className="fixed bottom-20 right-6 z-50 flex flex-col items-center">
//             <ChatButton isOpen={chatOpen} onClick={toggleChat} />
//           </div>
//           <CoinPricePopup />
//           {chatOpen && (
//             <ErrorBoundary>
//               <ChatAssistant onClose={closeChat} />
//             </ErrorBoundary>
//           )}
//         </>
//       )}
//       <FloatingWhatsapp />



// {/* private routes */}
//       <Routes> 
//         <Route element={<PrivateRoute />}>
//           <Route element={<DashboardLayout />}>
//             <Route path="/dashboard" element={<Dashboard />} />
//             <Route path="/wallet" element={<Wallet />} />
//             <Route path="/add-funds" element={<AddMoneyToWallet />} />
//             <Route path="/buy-history" element={<BuyHistory />} />
//             <Route path="/security" element={<Security />} />
//             <Route path="/profile" element={<Profile />} />
//             <Route path="/jwallet" element={<UserDetailsComponent />} />
//             <Route path="/kyc-information" element={<Kyc />} />
//             <Route path="/withdrawal" element={<WithDrawal />} /> 
//             <Route path="/meetings" element={<UserMeetingsShowcase />} />
//           </Route>
//           <Route path="/support" element={<DashboardLayout />}>
//             <Route index element={<Support />} />
//             <Route path="support-chat/:id" element={<SupportChart />} />
//           </Route>
//         </Route>


// {/* public routes */}
//         <Route path="/" element={<PublicLayout />}>
//           <Route
//             index
//             element={
//               isAuthenticated() ? (
//                 <Navigate to="/dashboard" replace />
//               ) : (
//                 <Home />
//               )
//             }
//           />

// {/* Auth Routes (restricted when logged in) */}
//           <Route element={<PublicRoute restricted />}>
//             <Route path="login" element={<AuthContainer />} />
//             <Route path="register" element={<AuthContainer />} />
//             <Route path="forgot-password" element={<ForgotPassword />} />
//           </Route>


// {/* before login pages */}
//           <Route path="about" element={<JaimaxComponent />} />
//           <Route path="contact" element={<Contact />} />
//           <Route path="features" element={<FeaturesSection />} />
//           <Route path="landingpage" element={<Landingpage />} />
//           <Route path="blog">
//             <Route index element={<BlogLayout />} />
//             <Route path=":slug" element={<BlogDetailPage />} />
//           </Route>
//           <Route path="services" element={<CryptoServicesFlipCards />} />
//           <Route path="Margintrading" element={<Margintrading />} />
//           <Route path="ApiTrading" element={<ApiTrading />} />
//           <Route path="SpotTrading" element={<SpotTrading />} />
//           <Route path="FuturesTrading" element={<FuturesTrading />} />
//           <Route path="PreSale" element={<PreSale />} />
//           <Route path="ReferEarn" element={<ReferEarn />} />
//           <Route path="best-presale-crypto-coin-in-india" element={<Navigate to="/best-presale-crypto-token-in-india" replace />}/>
//           <Route path="best-presale-crypto-token-in-india" element={<PreSaleCryptoCoin />}/>
//           <Route path="privacy-policy" element={<PrivacyPolicy />} />
//           <Route path="terms-and-conditions" element={<TermsConditions />} />
//           <Route path="refund-policy" element={<RefundPolicy />} />
//           <Route path="disclaimer" element={<Disclaimer />} />
//           <Route path="Kyc-Pmla" element={<KycPmlaPolicy />} />
//           <Route path="AML-CTF" element={<AmlCtfPolicy />} />
//           <Route path="supportpage" element={<SupportPage />} />
//         </Route>
//         <Route path="*" element={<NotFound />} />
//       </Routes>
//     </>
//   );
// };

// export default App;

import React, {
  useState,
  useEffect,
  useMemo,
  useCallback,
  lazy,
  Suspense,
  useRef,
} from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

import DashboardLayout from "./layouts/DashboardLayout";
import PublicLayout from "./layouts/PublicLayout";
import PrivateRoute from "./router/PrivateRoute";
import PublicRoute from "./router/PublicRoute";
import { isAuthenticated } from "./utils/auth";
import { shouldShowSplash, setLastSplashTime } from "./utils/splash.utils";
import JaimaxSplash from "./global/Splashscreen";
import FloatingWhatsapp from "./global/FloatingWhatsapp";
import { ToastContainer } from "./ReusableComponents/Toasts/Toasts";
import ErrorBoundary from "./pages/chatSupport/ErrorBoundary";
import PageLoader from "./ReusableComponents/Loader/loader";
import GroupChatApp from "./components/Dashboard/pages/jaimaxcommunity/mainchatGroup";
import GrowthPlanTimeline from "./pages/dummy/DummyPage";
import GrowthPlanTimeline2 from "./pages/dummy/PhasesDummy";
import GrowthPlanTimelineV3 from "./pages/dummy/GrowthPlanTimelineV3";
import "../src/pages/dummy/theme.css";
import WhatWeOffer from "./pages/dummy/WhatweOffer";
import SecondSection from "./pages/dummy/SecondSection";
import Testimonials from "./pages/dummy/Testimonals";
import ContactComponent from "./pages/dummy/Contact";
import HomeContactSection from "./pages/dummy/HomeContactSection";
import HomeRoadmapSection from "./pages/dummy/HomeRoadmapSection";
import HeroSection from "./pages/dummy/HomeHeroSection";
import NewAbout from "./pages/dummy/about/NewAboutPage";
import FeaturesPage from "./pages/dummy/features/FeaturesPage";
import BlogGridPage from "./pages/dummy/blog/BlogGridPage";
import BlogPostDetail from "./pages/dummy/blog/BlogpostDetail";
import MainPage from "./pages/dummy/MainPage";

// Lazy loaded components
const CoinPricePopup = lazy(() => import("./ReusableComponents/popups/Countdown"));
const ChatAssistant = lazy(() => import("./pages/chatSupport/chatComponent"));
const Home = lazy(() => import("./pages/home/Home"));
const Landingpage = lazy(() => import("./pages/home/Landingpage"));
const NotFound = lazy(() => import("./pages/home/NotFound"));
const JaimaxComponent = lazy(() => import("./components/About/About"));
const Contact = lazy(() => import("./components/contact/Contact"));
const FeaturesSection = lazy(() => import("./pages/home/HomeFeatures"));
const BlogLayout = lazy(() => import("./components/BlogSection/Blog"));
const BlogDetailPage = lazy(() => import("./components/BlogSection/Article"));
const CryptoServicesFlipCards = lazy(() => import("./components/MainServices/services"));
const SupportPage = lazy(() => import("./global/SupportPage"));
const RefundPolicy = lazy(() => import("./global/RefundPolicy"));
const TermsConditions = lazy(() => import("./global/TermsConditons"));
const PrivacyPolicy = lazy(() => import("./global/PrivacyPolicy"));
const Disclaimer = lazy(() => import("./global/Disclaimer"));
const AmlCtfPolicy = lazy(() => import("./global/Aml_Ctf"));
const KycPmlaPolicy = lazy(() => import("./global/Kyc_Pmla"));
const Margintrading = lazy(() => import("./services/Margintrading"));
const ApiTrading = lazy(() => import("./services/Apitrading"));
const SpotTrading = lazy(() => import("./services/Spottrading"));
const FuturesTrading = lazy(() => import("./services/Futurestrading"));
const PreSale = lazy(() => import("./services/Presale"));
const ReferEarn = lazy(() => import("./services/Referearn"));
const PreSaleCryptoCoin = lazy(() => import("./services/PreSaleCryptoCoin"));
const AuthContainer = lazy(() => import("./Authentication/Login"));
const ForgotPassword = lazy(() => import("./Authentication/ForgotPassword"));
const Dashboard = lazy(() => import("./components/Dashboard/pages/dashBoard/dashBoard"));
const Wallet = lazy(() => import("./components/Dashboard/pages/wallet/wallet"));
const BuyHistory = lazy(() => import("./components/Dashboard/pages/buyHistory/buyHistory"));
const Security = lazy(() => import("./components/Dashboard/pages/security/security"));
const Profile = lazy(() => import("./components/Dashboard/pages/profile/profile"));
const Kyc = lazy(() => import("./components/Dashboard/pages/kyc/kyc"));
const WithDrawal = lazy(() => import("./components/Dashboard/pages/widthDrawal/WithdrawalRoute"));
const Support = lazy(() => import("./components/Dashboard/pages/support/support"));
const AddMoneyToWallet = lazy(() => import("./components/Dashboard/pages/AddMoneyToWallet/AddMoneyToWallet"));
const UserMeetingsShowcase = lazy(() => import("./components/Dashboard/pages/Meetings/Zoommeetings"));
const UserDetailsComponent = lazy(() => import("./components/Dashboard/pages/jwallet/jwallet"));

const SupportChart = lazy(() =>
  import("./components/Dashboard/pages/support/support").then((module) => ({
    default: module.SupportChart,
  }))
);

const HIDE_CHAT_PATHS = ["/login", "/register", "/forgot-password"];
const SPLASH_DURATION = 5000;

const ChatButton = ({ isOpen, onClick }) => (
  <button
    onClick={onClick}
    className="bg-white text-purple-600 rounded-full w-14 h-14 
               shadow-2xl flex items-center justify-center 
               transition-all duration-300 backdrop-blur-sm
               border border-purple-200 hover:scale-110"
    aria-label="AI Assistant"
  >
    {isOpen ? (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
        viewBox="0 0 24 24" stroke="#085056" strokeWidth={3}>
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
      </svg>
    ) : (
      <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34"
        viewBox="0 0 24 24" fill="none" stroke="#085056" strokeWidth={2}
        strokeLinecap="round" strokeLinejoin="round">
        <path d="M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719" />
        <path d="M8 12h.01" />
        <path d="M12 12h.01" />
        <path d="M16 12h.01" />
      </svg>
    )}
  </button>
);

const App = () => {
  const location = useLocation();
  const [showSplash, setShowSplash] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const splashShownRef = useRef(false);
  const staticElementsRemovedRef = useRef(false);
  const loaderRemovedRef = useRef(false);
  const showChat = useMemo(() => {
    const isSupportChatRoute = location.pathname.startsWith("/dashboard/support/support-chat");
    return !HIDE_CHAT_PATHS.includes(location.pathname) && !isSupportChatRoute;
  }, [location.pathname]);

  const toggleChat = useCallback(() => setChatOpen((prev) => !prev), []);
  const closeChat = useCallback(() => setChatOpen(false), []);

  // ✅ SINGLE useEffect to remove static elements
  useEffect(() => {
    // Only run once
    if (staticElementsRemovedRef.current) return;
    staticElementsRemovedRef.current = true;

    const staticNavbar = document.getElementById("static-navbar");
    const staticHero = document.getElementById("static-hero");

    // Immediately hide (prevents visual duplication)
    if (staticNavbar) {
      staticNavbar.style.opacity = '0';
      staticNavbar.style.pointerEvents = 'none';
    }
    if (staticHero) {
      staticHero.style.opacity = '0';
      staticHero.style.pointerEvents = 'none';
    }

    // Remove from DOM after transition
    const timer = setTimeout(() => {
      staticNavbar?.remove();
      staticHero?.remove();
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  // ✅ Initial splash — runs ONCE
  useEffect(() => {
    if (splashShownRef.current) return;
    splashShownRef.current = true;

    if (shouldShowSplash()) {
      setShowSplash(true);
      const timer = setTimeout(() => {
        setShowSplash(false);
        setLastSplashTime();
      }, SPLASH_DURATION);
      return () => clearTimeout(timer);
    }
  }, []);
  useEffect(() => {
    if (loaderRemovedRef.current) return;
    loaderRemovedRef.current = true;

    const loader = document.getElementById("initial-loader");
    if (loader) {
      // Add fade-out class
      loader.classList.add("fade-out");

      // Remove from DOM after animation
      setTimeout(() => {
        loader.remove();
      }, 400);
    }
  }, []);

  // ✅ Periodic splash
  useEffect(() => {
    const interval = setInterval(() => {
      if (shouldShowSplash()) {
        setShowSplash(true);
        setTimeout(() => {
          setShowSplash(false);
          setLastSplashTime();
        }, 500);
      }
    }, 200000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Splash screen overlay */}
      {/* {showSplash && <JaimaxSplash />} */}

      {/* Global components */}
      {/* {showChat && (
        <>
          <ToastContainer position="top-right" maxToasts={2} />
          <div className="fixed bottom-20 right-6 z-50 flex flex-col items-center">
            <ChatButton isOpen={chatOpen} onClick={toggleChat} />
          </div>
          <Suspense fallback={null}>
            <CoinPricePopup />
          </Suspense>
          {chatOpen && (
            <ErrorBoundary>
              <Suspense
                fallback={
                  <div className="fixed bottom-36 right-6 z-50 bg-gray-900 rounded-xl p-8 shadow-2xl border border-gray-700">
                    <div className="w-8 h-8 rounded-full border-4 border-gray-600 border-t-purple-500 animate-spin mx-auto" />
                  </div>
                }
              >
                <ChatAssistant onClose={closeChat} />
              </Suspense>
            </ErrorBoundary>
          )}
        </>
      )}
      <FloatingWhatsapp /> */}

      {/* Routes with Suspense fallback */}
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route element={<PrivateRoute />}>
            <Route element={<DashboardLayout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/wallet" element={<Wallet />} />
              <Route path="/add-funds" element={<AddMoneyToWallet />} />
              <Route path="/buy-history" element={<BuyHistory />} />
              <Route path="/security" element={<Security />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/jwallet" element={<UserDetailsComponent />} />
              <Route path="/kyc-information" element={<Kyc />} />
              <Route path="/withdrawal" element={<WithDrawal />} />
              <Route path="/meetings" element={<UserMeetingsShowcase />} />
              <Route path="/community" element={<GroupChatApp />} />

            </Route>
            <Route path="/support" element={<DashboardLayout />}>
              <Route index element={<Support />} />
              <Route path="support-chat/:id" element={<SupportChart />} />
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
            <Route element={<PublicRoute restricted />}>
              <Route path="login" element={<AuthContainer />} />
              <Route path="register" element={<AuthContainer />} />
              <Route path="forgot-password" element={<ForgotPassword />} />
            </Route>
            <Route path="about" element={<JaimaxComponent />} />
            <Route path="contact" element={<Contact />} />
            <Route path="features" element={<FeaturesSection />} />
            <Route path="landingpage" element={<Landingpage />} />
            <Route path="blog">
              <Route index element={<BlogLayout />} />
              <Route path=":slug" element={<BlogDetailPage />} />
            </Route>
            <Route path="services" element={<CryptoServicesFlipCards />} />
            <Route path="Margintrading" element={<Margintrading />} />
            <Route path="ApiTrading" element={<ApiTrading />} />
            <Route path="SpotTrading" element={<SpotTrading />} />
            <Route path="FuturesTrading" element={<FuturesTrading />} />
            <Route path="PreSale" element={<PreSale />} />
            <Route path="ReferEarn" element={<ReferEarn />} />
            <Route
              path="best-presale-crypto-coin-in-india"
              element={<Navigate to="/best-presale-crypto-token-in-india" replace />}
            />
            <Route path="best-presale-crypto-token-in-india" element={<PreSaleCryptoCoin />} />
            <Route path="privacy-policy" element={<PrivacyPolicy />} />
            <Route path="terms-and-conditions" element={<TermsConditions />} />
            <Route path="refund-policy" element={<RefundPolicy />} />
            <Route path="disclaimer" element={<Disclaimer />} />
            <Route path="Kyc-Pmla" element={<KycPmlaPolicy />} />
            <Route path="AML-CTF" element={<AmlCtfPolicy />} />
            <Route path="supportpage" element={<SupportPage />} />


            {/* <Route path="dummy" element={<GrowthPlanTimeline />} /> */}
            {/* <Route path="phases-dummy" element={<GrowthPlanTimeline2 />} /> */}
            <Route path="phases" element={<GrowthPlanTimelineV3 />} />
            <Route path="offer" element={<WhatWeOffer />} />
            <Route path="second" element={<SecondSection />} />
            <Route path="testimonals" element={<Testimonials />} />
            <Route path="contactpage" element={<ContactComponent />} />
            <Route path="homeContact" element={<HomeContactSection />} />
            <Route path="roadmap" element={<HomeRoadmapSection />} />
            <Route path="hero" element={<HeroSection />} />
            <Route path="newAbout" element={<NewAbout />} />
            <Route path="newFeatures" element={<FeaturesPage />} />
            <Route path="blogGrid" element={<BlogGridPage />} />
             <Route path="blogGrid">
             <Route path=":slug" element={<BlogPostDetail />} />
            </Route>
             <Route path="main" element={<MainPage />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </>
  );
};

export default App;