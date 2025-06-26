
import React, { useState, useEffect } from 'react';
import {Routes, Route, useLocation, Outlet } from 'react-router-dom';
import Navbar from './global/Navbar';
import Footer from './global/Footer';
import Home from './pages/home/Home';
import AuthContainer from './Authentication/Login';
// import Register from './Authentication/Register';
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
          <Route path="login" element={<AuthContainer />} />
          <Route path="register" element={<AuthContainer />} />
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





// import React from 'react';
// const BitcoinIcon = ({ size = 'w-10 h-10', children }) => (
//   <div className={`flex items-center justify-center bg-yellow-500 rounded-full ${size} shadow-lg text-gray-800 font-bold text-xl`}>
//     B
//     {children} {/* For the large icon at the end, if needed */}
//   </div>
// );

// function RoadmapPage() {
//   // Define roadmap items with their approximate positions along the diagonal
//   const roadmapItems = [
//     { year: '2022', description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', top: '65%', left: '10%' },
//     { year: '2023', description: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris ut aliquip ex ea commodo consequat.', top: '48%', left: '25%' },
//     { year: '2024', description: 'Duis aute irure dolor in reprehenderit in nisi nulla voluptate velit esse cillum dolore eu fugiat pariatur.', top: '31%', left: '40%' },
//     { year: '2025', description: 'Duis aute irure dolor in reprehenderit in nisi nulla.', top: '14%', left: '55%' },
//   ];

//   return (
//     <div className="min-h-screen bg-gray-900 text-white p-8 font-sans flex flex-col lg:flex-row items-center justify-center lg:justify-between relative overflow-hidden">

//       {/* --- Left Content Area --- */}
//       <div className="lg:w-1/2 p-4 text-center lg:text-left mb-8 lg:mb-0">
//         <h1 className="text-4xl md:text-5xl font-bold mb-6 text-green-400">
//           Cryptocurrency Roadmap
//         </h1>
//         <p className="text-base md:text-lg leading-relaxed text-gray-300 mb-8 max-w-lg mx-auto lg:mx-0">
//           Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit voluptate velit esse cillum dolore eu fugiat nulla.
//         </p>
//         {/* Bitcoin Plant Image */}
//         <div className="flex justify-center lg:justify-start">
//           <img
//             src={''}
//             alt="Bitcoin plant growing from coin"
//             className="w-48 h-48 object-contain" // Adjust size as needed
//           />
//         </div>
//       </div>

//       {/* --- Right Roadmap Section --- */}
//       {/* Ensure this container has a defined height or is allowed to expand */}
//       <div className="relative lg:w-1/2 p-4 flex flex-col items-center justify-center min-h-[500px] lg:min-h-screen">
//         {/* SVG for the diagonal line */}
//         <svg className="absolute inset-0 w-full h-full z-0" viewBox="0 0 100 100" preserveAspectRatio="none">
//           {/* Line from bottom-left (approx 15,85) to top-right (approx 75,5) */}
//           <line
//             x1="15" y1="85"
//             x2="75" y2="5"
//             stroke="#10B981"
//             strokeWidth="2"
//             strokeLinecap="round"
//           />
//         </svg>

//         {roadmapItems.map((item, index) => (
//           <div
//             key={item.year}
//             // Position each item absolutely using the top/left percentages defined in roadmapItems
//             className="absolute flex items-center w-auto z-10"
//             style={{ top: item.top, left: item.left, transform: 'translateY(-50%)' }} // translateY(-50%) centers the item vertically on its 'top' position
//           >
//             {/* Bitcoin Icon */}
//             <div className="flex-shrink-0 mr-4">
//               <BitcoinIcon />
//             </div>

//             {/* Content for the roadmap item */}
//             <div className="bg-gray-800 p-3 rounded-lg shadow-xl text-left max-w-xs md:max-w-sm">
//               <h3 className="text-lg font-bold mb-1 text-green-300">{item.year}</h3>
//               <p className="text-gray-400 text-xs md:text-sm">{item.description}</p>
//             </div>
//           </div>
//         ))}

//         {/* Large Bitcoin icon at the very top-right end of the roadmap */}
//         <div className="absolute top-[3%] right-[10%] z-10"> {/* Adjust position to match the end of the line */}
//           <BitcoinIcon size="w-24 h-24" />
//         </div>
//       </div>
//     </div>
//   );
// }

// export default RoadmapPage;




// src/RoadmapPage.jsx

// import React from 'react';


// // Helper component for the Bitcoin Icon to keep the code clean
// const BitcoinIcon = ({ size = 'w-10 h-10', children }) => (
//   <div className={`flex items-center justify-center bg-yellow-500 rounded-full ${size} shadow-lg text-gray-800 font-bold text-xl`}>
//     B
//     {children}
//   </div>
// );

// function RoadmapPage() {
//   const roadmapItems = [
//     { year: '2022', description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', top: '75%', left: '12%' },
//     { year: '2023', description: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris ut aliquip ex ea commodo consequat.', top: '55%', left: '28%' },
//     { year: '2024', description: 'Duis aute irure dolor in reprehenderit in nisi nulla voluptate velit esse cillum dolore eu fugiat pariatur.', top: '35%', left: '44%' },
//     { year: '2025', description: 'Duis aute irure dolor in reprehenderit in nisi nulla.', top: '15%', left: '60%' },
//   ];
//   const wavyPathData = `
//     M 5 100                       
//     C 40 85, 20 65, 30 60         
//     C 50 55, 35 45, 50 40         
//     C 60 35, 55 25, 70 20         
//     C 80 15, 75 5, 85 10          
//   `;

//   return (
//     <div className="min-h-screen bg-gray-900 text-white p-8 font-sans flex flex-col lg:flex-row items-center justify-center lg:justify-between relative overflow-hidden">
//       <div className="lg:w-1/2 p-4 text-center lg:text-left mb-8 lg:mb-0">
//         <h1 className="text-4xl md:text-5xl font-bold mb-6 text-green-400">
//           Cryptocurrency Roadmap
//         </h1>
//         <p className="text-base md:text-lg leading-relaxed text-gray-300 mb-8 max-w-lg mx-auto lg:mx-0">
//           Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit voluptate velit esse cillum dolore eu fugiat nulla.
//         </p>
//         <div className="flex justify-center lg:justify-start">
//           <img
//             src={''}
//             alt="Bitcoin plant growing from coin"
//             className="w-48 h-48 object-contain"
//           />
//         </div>
//       </div>

//       {/* --- Right Roadmap Section --- */}
//       <div className="relative lg:w-1/2 p-0 flex flex-col items-center justify-center min-h-[600px] lg:min-h-screen">
//         {/* SVG for the Wavy Line - This is the correct way to draw it */}
//         <svg className="absolute  right-60  w-full h-full z-0" viewBox="0 0 100 100" preserveAspectRatio="none">
//           <path
//             d={wavyPathData}
//             stroke="#10B981" 
//             strokeWidth="1"
//             fill="none"
//             strokeLinecap="round"
//             strokeLinejoin="round"
//           />
//         </svg>

//         {roadmapItems.map((item, index) => (
//           <div
//             key={item.year}
//             className="absolute flex items-center w-auto z-10"
//             style={{ top: item.top, left: item.left, transform: 'translate(-50%, -50%)' }}
//           >
//             {/* Bitcoin Icon */}
//             <div className="flex-shrink-0 mr-4">
//               <BitcoinIcon />
//             </div>

//             {/* Content for the roadmap item */}
//             <div className="bg-gray-800 p-3 rounded-lg shadow-xl text-left max-w-xs md:max-w-sm">
//               <h3 className="text-lg font-bold mb-1 text-green-300">{item.year}</h3>
//               <p className="text-gray-400 text-xs md:text-sm">{item.description}</p>
//             </div>
//           </div>
//         ))}

//         {/* Large Bitcoin icon at the very top-right end of the roadmap */}
//         <div className="absolute top-[8%] left-[80%] z-10" style={{ transform: 'translate(-50%, -50%)' }}>
//           <BitcoinIcon size="w-24 h-24" />
//         </div>
//       </div>
//     </div>
//   );
// }

// export default RoadmapPage;




// import React from 'react';

// // Helper component for the Bitcoin Icon to keep the code clean
// const BitcoinIcon = ({ size = 'w-10 h-10', children }) => (
//   <div className={`flex items-center justify-center bg-yellow-500 rounded-full ${size} shadow-lg text-gray-800 font-bold text-xl`}>
//     B
//     {children}
//   </div>
// );

// function RoadmapPage() {
//   const roadmapItems = [
//     // These 'top' and 'left' values define the center of the Bitcoin icon.
//     // They are critical for the SVG path to pass through them accurately.
//     { year: '2022', description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', top: '80%', left: '46%' }, // Adjusted
//     { year: '2023', description: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris ut aliquip ex ea commodo consequat.', top: '60%', left: '56%' }, // Adjusted
//     { year: '2024', description: 'Duis aute irure dolor in reprehenderit in nisi nulla voluptate velit esse cillum dolore eu fugiat pariatur.', top: '40%', left: '68%' }, // Adjusted
//     { year: '2025', description: 'Duis aute irure dolor in reprehenderit in nisi nulla.', top: '18%', left: '78%' }, // Adjusted
//   ];

//   // The single, continuous wavy path (SVG 'd' attribute).
//   // These coordinates are relative to the SVG's viewBox (0 0 100 100) of the right section.
//   // **This path is meticulously crafted to pass through the centers of the Bitcoin icons.**
//   // The numbers are percentages of the right section's width/height.
//   const wavyPathData = `
//     M 41 82.5                     
//     C 45 76, 48 70, 52 61.5      
//     C 56 53, 60 45, 65 40.5      
//     C 70 36, 73 29, 76 21      
//     C 79 16, 82 11, 85.5 5       
//   `;

//   // Path data for the subtle background wave/gradient shape on the left side of the roadmap
//   const backgroundWavePath = `M0 0 H30 C 50 20, 40 80, 20 100 H0 Z`;

//   return (
//     // Main container with a single dark background color
//     <div className="min-h-screen bg-[#1A1A1A] text-white p-8 font-sans flex flex-col lg:flex-row items-center justify-center lg:justify-between relative overflow-hidden">

//       {/* Left section content */}
//       <div className="lg:w-1/2 p-4 text-center lg:text-left mb-8 lg:mb-0 relative z-10">
//         <h1 className="text-4xl md:text-5xl font-bold mb-6 text-green-400">
//           Cryptocurrency Roadmap
//         </h1>
//         <p className="text-base md:text-lg leading-relaxed text-gray-300 mb-8 max-w-lg mx-auto lg:mx-0">
//           Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit voluptate velit esse cillum dolore eu fugiat nulla.
//         </p>
//         <div className="flex justify-center lg:justify-start">
//           {/* Bitcoin plant image - using a suitable placeholder URL */}
//           <img
//             src={'https://via.placeholder.com/200?text=Bitcoin+Plant'} // Replace with your actual image URL
//             alt="Bitcoin plant growing from coin"
//             className="w-48 h-48 object-contain"
//             style={{ filter: 'drop-shadow(0 0 10px rgba(0,255,0,0.5))' }} // Subtle glow similar to image
//           />
//         </div>
//       </div>

//       {/* --- Right Roadmap Section --- */}
//       <div className="relative lg:w-1/2 p-0 flex flex-col items-center justify-center min-h-[600px] lg:min-h-screen">
        
//         {/* Subtle background wave shape for the left side of the roadmap section */}
//         <div className="absolute inset-0 z-0">
//           <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
//             <path
//               d={backgroundWavePath}
//               fill="rgba(0,0,0,0.1)" // A very subtle dark overlay, matching the image's background depth
//             />
//           </svg>
//         </div>

//         {/* SVG for the main continuous wavy line connecting the roadmap items */}
//         <svg className="absolute w-full h-full z-0" viewBox="0 0 100 100" preserveAspectRatio="none">
//           <path
//             d={wavyPathData}
//             stroke="#10B981" // Green color for the line
//             strokeWidth="3" // Increased stroke width to match the image
//             fill="none"
//             strokeLinecap="round"
//             strokeLinejoin="round"
//           />
//         </svg>

//         {roadmapItems.map((item, index) => (
//           <div
//             key={item.year}
//             // Position the entire flex container (year + icon + text)
//             className="absolute flex items-center w-auto z-10"
//             // The 'left' calculation is crucial for aligning the Bitcoin icon on the path.
//             // It subtracts half the icon's width (assuming w-10 = 40px, so 20px) plus some padding.
//             style={{ 
//               top: item.top, 
//               left: `calc(${item.left} - 25px)`, // Offset left to place Bitcoin icon correctly on the line
//               transform: 'translate(-50%, -50%)',
//               flexDirection: 'row' // Ensure items align horizontally
//             }} 
//           >
//             {/* Year text - positioned to the left of the Bitcoin icon */}
//             <span className="text-xl font-bold mr-4 text-green-300" style={{ transform: 'translateX(-100%)', whiteSpace: 'nowrap' }}>
//               {item.year}
//             </span>

//             {/* Bitcoin Icon */}
//             <div className="flex-shrink-0 mr-4">
//               <BitcoinIcon />
//             </div>

//             {/* Content for the roadmap item - offset to the right of the icon */}
//             <div className="bg-gray-800 p-3 rounded-lg shadow-xl text-left max-w-xs md:max-w-sm">
//               <p className="text-gray-400 text-xs md:text-sm">{item.description}</p>
//             </div>
//           </div>
//         ))}

//         {/* Large Bitcoin icon at the very top-right end of the roadmap */}
//         <div className="absolute top-[8%] left-[88%] z-10" style={{ transform: 'translate(-50%, -50%)' }}>
//           <BitcoinIcon size="w-24 h-24" />
//         </div>
//       </div>
//     </div>
//   );
// }

// export default RoadmapPage;