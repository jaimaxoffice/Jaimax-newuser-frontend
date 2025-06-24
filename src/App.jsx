
import React, { useState, useEffect } from 'react';
import {Routes, Route, useLocation, Outlet } from 'react-router-dom';
import Navbar from './global/Navbar';
import Footer from './global/Footer';
import Home from './pages/home/Home';
import Login from './Authentication/Login';
import Register from './Authentication/Register';
import ForgotPassword from './Authentication/ForgotPassword';
import Contact from './components/contact/Contact';
import JaimaxSplash from './global/Splashscreen';
import JaimaxComponent from './components/About/About';
import FeaturesSection from './pages/home/HomeFeatures';
import BlogLayout from './pages/home/Blog';
import Dashboard from "./components/Dashboard/pages/dashBoard/dashBoard";
import Wallet from './components/Dashboard/pages/wallet/wallet';
import MyTotalTeam from './components/Dashboard/pages/myTotalTeam/myTotalTeam';
import BuyHistory from './components/Dashboard/pages/buyHistory/buyHistory';
import Security from './components/Dashboard/pages/security/security';
import Profile from './components/Dashboard/pages/profile/profile';
import Kyc from './components/Dashboard/pages/kyc/kyc';
import WithDrawal from './components/Dashboard/pages/widthDrawal/withDrawal';
import Support from './components/Dashboard/pages/support/support';
import Sidebar from './components/Dashboard/sildeBar/Sidebar';
import Header from './components/Dashboard/header/header';
import LogoutModal from './components/Dashboard/pages/logout/logout';
import Shareholders from './components/Dashboard/pages/shareholders/shareholders';
import CryptoServicesFlipCards from './components/Services/services';
import SupportPage from './global/SupportPage';
import RefundPolicy from './global/RefundPolicy';
import TermsConditions from './global/TermsConditons';
import PrivacyPolicy from './global/PrivacyPolicy';
import Disclaimer from './global/Disclaimer';

import Margintrading from "./services/Margintrading";
import ApiTrading from "./services/Apitrading";
import SpotTrading from "./services/Spottrading";
import FuturesTrading from "./services/Futurestrading";
import PreSale from './services/Presale'
import ReferEarn from './services/Referearn'

import AddFundsPage from './components/Dashboard/pages/AddMoneyToWallet/AddMoneyToWallet';
import AddMoneyToWallet from './components/Dashboard/pages/AddMoneyToWallet/AddMoneyToWallet';
// Dashboard Layout Component

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogout = () => {
    setShowLogoutModal(false);
    window.location.href = '/';
  };

  return (
    <div className="relative flex h-screen bg-white overflow-hidden">
      <Sidebar
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
        onLogoutClick={() => setShowLogoutModal(true)}
      />

      <div
        className={`transition-all duration-300 ease-in-out flex-1 flex flex-col ml-1 mr-1 ${sidebarOpen ? "lg:ml-64" : "lg:ml-2"
          } h-screen overflow-hidden`}
      >
        <div className="mt-6 mb-3">
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
const PublicLayout = () => {
  const location = useLocation();
  const hideNavbarRoutes = ['/login', '/register','/forgot-password'];
  const shouldHideNavbar = hideNavbarRoutes.includes(location.pathname);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {!shouldHideNavbar && <Navbar />}
      <main style={{ flex: 1 }}>
        <Outlet />
      </main>
      {!shouldHideNavbar && <Footer />}
    </div>
  );
};
const App = () => {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  if (showSplash) {
    return <JaimaxSplash />;
  }

  return (
    
      <Routes>
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
        <Route path="/wallet" element={<DashboardLayout />}>
          <Route index element={<Wallet />} />
        </Route>
        <Route path="/my-team" element={<DashboardLayout />}>
          <Route index element={<MyTotalTeam />} />
        </Route>
        <Route path="/shareholders" element={<DashboardLayout />}>
          <Route index element={<Shareholders />} />
        </Route>
           <Route path="/add_funds" element={<DashboardLayout />}>
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
        <Route path="/kyc" element={<DashboardLayout />}>
          <Route index element={<Kyc />} />
        </Route>
        <Route path="/withdrawal" element={<DashboardLayout />}>
          <Route index element={<WithDrawal />} />
        </Route>
        <Route path="/support" element={<DashboardLayout />}>
          <Route index element={<Support />} />
        </Route>
        <Route path="/" element={<PublicLayout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword/>}/>
          <Route path="about" element={<JaimaxComponent />} />
          <Route path="contact" element={<Contact />} />
          <Route path="features" element={<FeaturesSection />} />
          <Route path="blog" element={<BlogLayout />} />
          <Route path="services" element={<CryptoServicesFlipCards />} />
          <Route path='/supporthome' element={<SupportPage/>}/>
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/support-page" element={<SupportPage />} />
          <Route path="/terms-and-conditions" element={<TermsConditions />} />
          <Route path="/refund-policy" element={<RefundPolicy />} />
          <Route path="/disclaimer" element={<Disclaimer />} />
          <Route path="/Margintrading" element={<Margintrading />} />
          <Route path="/ApiTrading" element={<ApiTrading />} />
          <Route path="/SpotTrading" element={<SpotTrading />} />
          <Route path="/FuturesTrading" element={<FuturesTrading />} />
          <Route path="/PreSale" element={<PreSale />} />
          <Route path="/ReferEarn" element={<ReferEarn />} />
        </Route>
      </Routes>
  );
};

export default App;

// import React, { useEffect, useRef } from "react";
// import QRCode from "qrcode";
// import logo from './assets/jcoin1.png'; // Ensure this is in your src folder

// const App = () => {
//   const canvasRef = useRef();
//   const downloadRef = useRef();

//   useEffect(() => {
//     const upiID = "jaimaxcoin2024@upi";
//     const payeeName = "JAIMAX PAYMENTS";
//     const amount = "1.00";
//     const qrData = `upi://pay?pa=${upiID}&pn=${encodeURIComponent(
//       payeeName
//     )}&am=${amount}&cu=INR`;

//     QRCode.toCanvas(canvasRef.current, qrData, {
//       errorCorrectionLevel: "H",
//       width: 300,
//       margin: 1,
//       color: {
//         dark: "#000000",
//         light: "#ffffff",
//       },
//     });
//   }, []);

//   const downloadImage = () => {
//     const canvas = canvasRef.current;
//     const ctx = canvas.getContext("2d");

//     const tempImage = new Image();
//     tempImage.src = logo;
//     tempImage.onload = () => {
//       const size = 60;
//       const x = (canvas.width - size) / 2;
//       const y = (canvas.height - size) / 2;

//       // Draw the logo on the canvas
//       ctx.drawImage(tempImage, x, y, size, size);

//       const link = document.createElement("a");
//       link.download = "jaimax_upi_qr.png";
//       link.href = canvas.toDataURL("image/png");
//       link.click();
//     };
//   };

//   return (
//     <div style={{ textAlign: "center" }}>
//       <div
//         style={{
//           position: "relative",
//           width: 300,
//           height: 300,
//           margin: "0 auto",
//         }}
//       >
//         <canvas ref={canvasRef} width={300} height={300} />
//         <img
//           src={logo}
//           alt="JAIMAX Logo"
//           style={{
//             position: "absolute",
//             top: "50%",
//             left: "50%",
//             transform: "translate(-50%, -50%)",
//             width: 60,
//             height: 60,
//             borderRadius: "10px",
//             backgroundColor: "#ffffff",
//             padding: 4,
//             pointerEvents: "none",
//           }}
//         />
//       </div>

//       <button
//         onClick={downloadImage}
//         style={{
//           marginTop: 20,
//           backgroundColor: "#1d8e85",
//           color: "#fff",
//           padding: "10px 20px",
//           border: "none",
//           borderRadius: "6px",
//           cursor: "pointer",
//           fontWeight: "bold",
//         }}
//       >
//         Download QR
//       </button>
//     </div>
//   );
// };

// export default App;
