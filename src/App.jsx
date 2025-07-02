
// import React, { useState, useEffect } from 'react';
// import {Routes, Route, useLocation, Outlet } from 'react-router-dom';
// import Navbar from './global/Navbar';
// import Footer from './global/Footer';
// import Home from './pages/home/Home';
// import AuthContainer from './Authentication/Login';
// // import Register from './Authentication/Register';
// import ForgotPassword from './Authentication/ForgotPassword';
// import Contact from './components/contact/Contact';
// import JaimaxSplash from './global/Splashscreen';
// import JaimaxComponent from './components/About/About';
// import FeaturesSection from './pages/home/HomeFeatures';
// import BlogLayout from './pages/home/Blog';
// import Dashboard from "./components/Dashboard/pages/dashBoard/dashBoard";
// import Wallet from './components/Dashboard/pages/wallet/wallet';
// import MyTotalTeam from './components/Dashboard/pages/myTotalTeam/myTotalTeam';
// import BuyHistory from './components/Dashboard/pages/buyHistory/buyHistory';
// import Security from './components/Dashboard/pages/security/security';
// import Profile from './components/Dashboard/pages/profile/profile';
// import Kyc from './components/Dashboard/pages/kyc/kyc';
// import WithDrawal from './components/Dashboard/pages/widthDrawal/withDrawal';
// import Support from './components/Dashboard/pages/support/support';
// import Sidebar from './components/Dashboard/sildeBar/Sidebar';
// import Header from './components/Dashboard/header/header';
// import LogoutModal from './components/Dashboard/pages/logout/logout';
// import Shareholders from './components/Dashboard/pages/shareholders/shareholders';
// import CryptoServicesFlipCards from './components/Services/services';
// import SupportPage from './global/SupportPage';
// import RefundPolicy from './global/RefundPolicy';
// import TermsConditions from './global/TermsConditons';
// import PrivacyPolicy from './global/PrivacyPolicy';
// import Disclaimer from './global/Disclaimer';

// import Margintrading from "./services/Margintrading";
// import ApiTrading from "./services/Apitrading";
// import SpotTrading from "./services/Spottrading";
// import FuturesTrading from "./services/Futurestrading";
// import PreSale from './services/Presale'
// import ReferEarn from './services/Referearn'

// import AddFundsPage from './components/Dashboard/pages/AddMoneyToWallet/AddMoneyToWallet';
// import AddMoneyToWallet from './components/Dashboard/pages/AddMoneyToWallet/AddMoneyToWallet';
// import TodayEarning from './components/Dashboard/pages/TodayEarnings/TodayEarning';
// // Dashboard Layout Component

// const DashboardLayout = () => {
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [showLogoutModal, setShowLogoutModal] = useState(false);

//   const handleLogout = () => {
//     setShowLogoutModal(false);
//     window.location.href = '/';
//   };

//   return (
//     <div className="relative flex h-screen bg-white overflow-hidden">
//       <Sidebar
//         isOpen={sidebarOpen}
//         setIsOpen={setSidebarOpen}
//         onLogoutClick={() => setShowLogoutModal(true)}
//       />

//       <div
//         className={`transition-all duration-300 ease-in-out flex-1 flex flex-col ml-1 mr-1 ${sidebarOpen ? "lg:ml-64" : "lg:ml-2"
//           } h-screen overflow-hidden`}
//       >
//         <div className="mt-6 mb-1">
//           <Header />
//         </div>

//         <div className="flex-1 overflow-y-auto bg-[#f2f2f2] rounded-xl scrollbar-hide mb-3 mt-1">
//           <Outlet />
//         </div>
//       </div>

//       {showLogoutModal && (
//         <LogoutModal
//           onCancel={() => setShowLogoutModal(false)}
//           onConfirm={handleLogout}
//         />
//       )}
//     </div>
//   );
// };
// const PublicLayout = () => {
//   const location = useLocation();
//   const hideNavbarRoutes = ['/login', '/register','/forgot-password'];
//   const shouldHideNavbar = hideNavbarRoutes.includes(location.pathname);

//   return (
//     <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
//       {!shouldHideNavbar && <Navbar />}
//       <main style={{ flex: 1 }}>
//         <Outlet />
//       </main>
//       {!shouldHideNavbar && <Footer />}
//     </div>
//   );
// };
// const App = () => {
//   const [showSplash, setShowSplash] = useState(true);

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setShowSplash(false);
//     }, 4000);
//     return () => clearTimeout(timer);
//   }, []);

//   if (showSplash) {
//     return <JaimaxSplash />;
//   }

//   return (
    
//       <Routes>
//         <Route path="/dashboard" element={<DashboardLayout />}>
//           <Route index element={<Dashboard />} />
//           <Route path="wallet" element={<Wallet />} />
//           <Route path="my-team" element={<MyTotalTeam />} />
//           <Route path="shareholders" element={<Shareholders />} />
//           <Route path="buy-history" element={<BuyHistory />} />
//           <Route path="security" element={<Security />} />
//           <Route path="profile" element={<Profile />} />
//           <Route path="kyc" element={<Kyc />} />
//           <Route path="withdrawal" element={<WithDrawal />} />
//           <Route path="support" element={<Support />} />
//         </Route>
//         <Route path="/wallet" element={<DashboardLayout />}>
//           <Route index element={<Wallet />} />
//         </Route>
//         <Route path="/my-team" element={<DashboardLayout />}>
//           <Route index element={<MyTotalTeam />} />
//         </Route>
//         <Route path="/shareholders" element={<DashboardLayout />}>
//           <Route index element={<Shareholders />} />
//         </Route>
//         <Route path="/earnings" element={<DashboardLayout />}>
//           <Route index element={<TodayEarning />} />
//         </Route>
//            <Route path="/add-funds" element={<DashboardLayout />}>
//           <Route index element={<AddMoneyToWallet />} />
//         </Route>
//         <Route path="/buy-history" element={<DashboardLayout />}>
//           <Route index element={<BuyHistory />} />
//         </Route>
//         <Route path="/security" element={<DashboardLayout />}>
//           <Route index element={<Security />} />
//         </Route>
//         <Route path="/profile" element={<DashboardLayout />}>
//           <Route index element={<Profile />} />
//         </Route>
//         <Route path="/kyc" element={<DashboardLayout />}>
//           <Route index element={<Kyc />} />
//         </Route>
//         <Route path="/withdrawal" element={<DashboardLayout />}>
//           <Route index element={<WithDrawal />} />
//         </Route>
//         <Route path="/support" element={<DashboardLayout />}>
//           <Route index element={<Support />} />
//         </Route>
//         <Route path="/" element={<PublicLayout />}>
//           <Route index element={<Home />} />
//           <Route path="login" element={<AuthContainer />} />
//           <Route path="register" element={<AuthContainer />} />
//           <Route path="/forgot-password" element={<ForgotPassword/>}/>
//           <Route path="about" element={<JaimaxComponent />} />
//           <Route path="contact" element={<Contact />} />
//           <Route path="features" element={<FeaturesSection />} />
//           <Route path="blog" element={<BlogLayout />} />
//           <Route path="services" element={<CryptoServicesFlipCards />} />
//           <Route path='/supporthome' element={<SupportPage/>}/>
//           <Route path="/privacy-policy" element={<PrivacyPolicy />} />
//           <Route path="/support-page" element={<SupportPage />} />
//           <Route path="/terms-and-conditions" element={<TermsConditions />} />
//           <Route path="/refund-policy" element={<RefundPolicy />} />
//           <Route path="/disclaimer" element={<Disclaimer />} />
//           <Route path="/Margintrading" element={<Margintrading />} />
//           <Route path="/ApiTrading" element={<ApiTrading />} />
//           <Route path="/SpotTrading" element={<SpotTrading />} />
//           <Route path="/FuturesTrading" element={<FuturesTrading />} />
//           <Route path="/PreSale" element={<PreSale />} />
//           <Route path="/ReferEarn" element={<ReferEarn />} />
//         </Route>
//       </Routes>
//   );
// };

// export default App;


/* ──────────────────────────────────────────────────────────────
   App.jsx – main routing setup (React‑Router‑DOM v6+)
   ────────────────────────────────────────────────────────────── */
import React, { useState, useEffect } from "react";
import { Routes, Route, useLocation, Outlet } from "react-router-dom";

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
import BlogDetailPage from "./pages/home/Article"; // ✅ NEW    // ✅ NEW
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

/* ─────────────────────────────────────────────────────────────
   DashboardLayout (sidebar + header wrapper)
   ──────────────────────────────────────────────────────────── */
const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogout = () => {
    setShowLogoutModal(false);
    window.location.href = "/";
  };

  return (
<div className="relative flex h-screen  bg-white overflow-hidden"> {/* This is your main layout container */}
  <Sidebar
    isOpen={sidebarOpen}
    setIsOpen={setSidebarOpen}
    onLogoutClick={() => setShowLogoutModal(true)}
  />

  <div
    className={`transition-all duration-300 ease-in-out flex-1 flex flex-col ml-1 mr-1 ${sidebarOpen ? "lg:ml-64" : "lg:ml-2"
        } h-screen overflow-hidden`} // This is your main content wrapper
  >
    <div className="mt-6 mb-1">
      <Header />
    </div>

    <div className="flex-1 overflow-y-auto bg-[#f2f2f2] rounded-xl scrollbar-hide mb-3 mt-1">
      <Outlet />
    </div>
  </div>

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
   PublicLayout (navbar + footer wrapper)
   ──────────────────────────────────────────────────────────── */
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

  /* Splash screen timer */
  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 4000);
    return () => clearTimeout(timer);
  }, []);

  if (showSplash) return <JaimaxSplash />;

  return (
    <Routes>
      {/* ───────────────── Private / Dashboard Routes ─────────────── */}
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="wallet" element={<Wallet />} />
        <Route path="my-team" element={<MyTotalTeam />} />
        <Route path="shareholders" element={<Shareholders />} />
        <Route path="buy-history" element={<BuyHistory />} />
        <Route path="security" element={<Security />} />
        <Route path="profile" element={<Profile />} />
        <Route path="kyc" element={<Kyc />} />
        <Route path="withdrawal" element={<WithDrawal />} />
        <Route path="support" element={<Support />} />
      </Route>

      {/* Additional dashboard aliases (optional) */}
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
      <Route path="/add-funds" element={<DashboardLayout />}>
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

      {/* ───────────────── Public Routes ─────────────────────────── */}
      <Route path="/" element={<PublicLayout />}>
        <Route index element={<Home />} />
        <Route path="login" element={<AuthContainer />} />
        <Route path="register" element={<AuthContainer />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route path="about" element={<JaimaxComponent />} />
        <Route path="contact" element={<Contact />} />
        <Route path="features" element={<FeaturesSection />} />

        {/* ✅ BLOG ROUTES */}
        <Route path="blog">
          <Route index element={<BlogLayout />} />   {/* /blog */}
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

      {/* ───────────────── 404 Fallback (optional) ──────────────── */}
      {/* <Route path="*" element={<NotFound />} /> */}
    </Routes>
  );
};

export default App;


