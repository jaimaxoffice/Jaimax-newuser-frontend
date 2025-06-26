
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



// import React, { useState } from 'react';
// import { Menu, X, TrendingUp, Shield, Zap, Users, ArrowRight, Star, CheckCircle } from 'lucide-react';

// export default function App() {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-[#1d8e85] via-[#2aa398] to-[#1d8e85] relative overflow-hidden">
//       {/* Background Golden Particles */}
//       <div className="absolute inset-0 pointer-events-none">
//         {[...Array(50)].map((_, i) => (
//           <div
//             key={i}
//             className="absolute w-1 h-1 bg-yellow-400 rounded-full animate-pulse opacity-30"
//             style={{
//               left: `${Math.random() * 100}%`,
//               top: `${Math.random() * 100}%`,
//               animationDelay: `${Math.random() * 5}s`,
//               animationDuration: `${3 + Math.random() * 4}s`
//             }}
//           />
//         ))}
//       </div>
//       {/* Navigation */}
//       <nav className="relative z-50 px-4 sm:px-6 lg:px-8 py-4">
//         <div className="max-w-7xl mx-auto flex items-center justify-between">
//           <div className="flex items-center space-x-2">
//             <div className="w-8 h-8 bg-gradient-to-r from-white to-gray-100 rounded-full flex items-center justify-center">
//               <Zap className="w-5 h-5 text-[#1d8e85]" />
//             </div>
//             <span className="text-2xl font-bold text-white">JAIMX PAYOUTS</span>
//           </div>
          
//           {/* Desktop Menu */}
//           <div className="hidden md:flex items-center space-x-8">
//             <a href="#features" className="text-white hover:text-gray-200 transition-colors">Features</a>
//             <a href="#about" className="text-white hover:text-gray-200 transition-colors">About</a>
//             <a href="#roadmap" className="text-white hover:text-gray-200 transition-colors">Roadmap</a>
//             <a href="#contact" className="text-white hover:text-gray-200 transition-colors">Contact</a>
//             <button className="bg-white text-[#1d8e85] px-6 py-2 rounded-full font-semibold hover:bg-gray-100 transition-colors">
//               Join Now
//             </button>
//           </div>

//           {/* Mobile Menu Button */}
//           <button 
//             className="md:hidden text-white"
//             onClick={() => setIsMenuOpen(!isMenuOpen)}
//           >
//             {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
//           </button>
//         </div>

//         {/* Mobile Menu */}
//         {isMenuOpen && (
//           <div className="md:hidden absolute top-full left-0 right-0 bg-white bg-opacity-95 backdrop-blur-sm rounded-lg mx-4 mt-2 p-4 shadow-xl">
//             <div className="flex flex-col space-y-4">
//               <a href="#features" className="text-[#1d8e85] hover:text-[#2aa398] transition-colors">Features</a>
//               <a href="#about" className="text-[#1d8e85] hover:text-[#2aa398] transition-colors">About</a>
//               <a href="#roadmap" className="text-[#1d8e85] hover:text-[#2aa398] transition-colors">Roadmap</a>
//               <a href="#contact" className="text-[#1d8e85] hover:text-[#2aa398] transition-colors">Contact</a>
//               <button className="bg-[#1d8e85] text-white px-6 py-2 rounded-full font-semibold hover:bg-[#2aa398] transition-colors">
//                 Join Now
//               </button>
//             </div>
//           </div>
//         )}
//       </nav>

//       {/* Hero Section */}
//       <section className="px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
//         <div className="max-w-7xl mx-auto">
//           <div className="grid lg:grid-cols-2 gap-12 items-center">
//             <div className="text-center lg:text-left">
//               <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
//                 Earn up to <span className="text-yellow-300">15%</span> monthly with
//                 <br />
//                 <span className="text-7xl sm:text-8xl lg:text-9xl font-black bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
//                   JAIMX
//                   <br />
//                   PAYOUTS
//                 </span>
//               </h1>
//               <p className="text-xl text-gray-100 mb-8 max-w-lg mx-auto lg:mx-0">
//                 Deposit cryptocurrency or stablecoins and watch your investments grow with our innovative DeFi platform
//               </p>
//               <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
//                 <button className="bg-white text-[#1d8e85] px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-all transform hover:scale-105 shadow-xl">
//                   Start Earning <ArrowRight className="inline ml-2" size={20} />
//                 </button>
//                 <button className="border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-[#1d8e85] transition-all">
//                   Learn More
//                 </button>
//               </div>
//             </div>
            
//             {/* Coin Visual Element */}
//             <div className="relative flex justify-center lg:justify-end">
//               <div className="relative w-80 h-80 lg:w-96 lg:h-96 overflow-hidden">
//                 {/* Background Golden Particles */}
//                 <div className="absolute inset-0">
//                   {[...Array(20)].map((_, i) => (
//                     <div
//                       key={i}
//                       className="absolute w-2 h-2 bg-yellow-400 rounded-full animate-pulse opacity-60"
//                       style={{
//                         left: `${Math.random() * 100}%`,
//                         top: `${Math.random() * 100}%`,
//                         animationDelay: `${Math.random() * 2}s`,
//                         animationDuration: `${2 + Math.random() * 3}s`
//                       }}
//                     />
//                   ))}
//                 </div>
                
//                 {/* Main JAIMX Coin */}
//                 <div className="relative w-full h-full flex items-center justify-center">
//                   <div className="relative w-64 h-64 lg:w-80 lg:h-80 transform hover:scale-110 transition-transform duration-500 cursor-pointer group">
//                     {/* Coin Shadow/Glow */}
//                     <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/30 to-orange-400/30 rounded-full blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                    
//                     {/* Main Coin */}
//                     <div className="relative w-full h-full bg-gradient-to-br from-yellow-400 via-yellow-500 to-orange-500 rounded-full border-8 border-yellow-300 shadow-2xl flex items-center justify-center overflow-hidden">
//                       {/* Coin Inner Design */}
//                       <div className="absolute inset-4 border-4 border-yellow-200 rounded-full"></div>
//                       <div className="absolute inset-8 border-2 border-yellow-100 rounded-full"></div>
                      
//                       {/* JAIMX Logo */}
//                       <div className="relative z-10 text-white text-4xl lg:text-5xl font-black drop-shadow-lg">
//                         J
//                       </div>
                      
//                       {/* Coin Text Around Edge */}
//                       <div className="absolute inset-0 flex items-center justify-center">
//                         <svg className="w-full h-full animate-spin" style={{ animationDuration: '20s' }}>
//                           <circle cx="50%" cy="50%" r="45%" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1"/>
//                           <path id="coin-text" d="M 50,50 m -120,0 a 120,120 0 1,1 240,0 a 120,120 0 1,1 -240,0" fill="none"/>
//                           <text className="text-xs fill-white font-bold">
//                             <textPath href="#coin-text" startOffset="0%">
//                               JAIMX • DECENTRALIZED DIGITAL CURRENCY • JAIMX • 
//                             </textPath>
//                           </text>
//                         </svg>
//                       </div>
                      
//                       {/* Shine Effect */}
//                       <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
//                     </div>
//                   </div>
//                 </div>
                
//                 {/* Floating Smaller Coins */}
//                 <div className="absolute top-8 right-8 w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full animate-bounce opacity-80"></div>
//                 <div className="absolute bottom-12 left-8 w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full animate-bounce delay-300 opacity-60"></div>
//                 <div className="absolute top-20 left-12 w-6 h-6 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full animate-bounce delay-500 opacity-70"></div>
                
//                 {/* Interactive Stats Floating */}
//                 <div className="absolute -top-4 -right-4 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full p-3 animate-pulse hover:scale-110 transition-transform cursor-pointer">
//                   <TrendingUp className="text-white" size={20} />
//                 </div>
//                 <div className="absolute -bottom-4 -left-4 bg-gradient-to-r from-blue-400 to-blue-500 rounded-full p-3 animate-pulse hover:scale-110 transition-transform cursor-pointer delay-100">
//                   <Shield className="text-white" size={20} />
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Stats Section */}
//       <section className="px-4 sm:px-6 lg:px-8 py-16 bg-white/10 backdrop-blur-sm">
//         <div className="max-w-7xl mx-auto">
//           <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
//             <div>
//               <div className="text-4xl font-bold text-white mb-2">$50M+</div>
//               <div className="text-gray-200">Total Value Locked</div>
//             </div>
//             <div>
//               <div className="text-4xl font-bold text-white mb-2">25K+</div>
//               <div className="text-gray-200">Active Users</div>
//             </div>
//             <div>
//               <div className="text-4xl font-bold text-white mb-2">15%</div>
//               <div className="text-gray-200">Max Monthly Returns</div>
//             </div>
//             <div>
//               <div className="text-4xl font-bold text-white mb-2">99.9%</div>
//               <div className="text-gray-200">Uptime</div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Features Section */}
//       <section id="features" className="px-4 sm:px-6 lg:px-8 py-20">
//         <div className="max-w-7xl mx-auto">
//           <div className="text-center mb-16">
//             <h2 className="text-4xl font-bold text-white mb-4">Why Choose JAIMX?</h2>
//             <p className="text-xl text-gray-200 max-w-3xl mx-auto">
//               Experience the future of cryptocurrency investing with our cutting-edge platform
//             </p>
//           </div>
          
//           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
//             {[
//               {
//                 icon: <TrendingUp size={32} />,
//                 title: "High Yields",
//                 description: "Earn up to 15% monthly returns on your cryptocurrency investments"
//               },
//               {
//                 icon: <Shield size={32} />,
//                 title: "Secure & Safe",
//                 description: "Military-grade security with multi-signature wallets and insurance coverage"
//               },
//               {
//                 icon: <Zap size={32} />,
//                 title: "Instant Deposits",
//                 description: "Quick and seamless deposits with support for major cryptocurrencies"
//               },
//               {
//                 icon: <Users size={32} />,
//                 title: "Community Driven",
//                 description: "Join thousands of investors earning passive income together"
//               },
//               {
//                 icon: <CheckCircle size={32} />,
//                 title: "Verified Platform",
//                 description: "Fully audited smart contracts and transparent operations"
//               },
//               {
//                 icon: <Star size={32} />,
//                 title: "24/7 Support",
//                 description: "Round-the-clock customer support to help you succeed"
//               }
//             ].map((feature, index) => (
//               <div key={index} className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 hover:bg-white/20 transition-all transform hover:scale-105">
//                 <div className="text-white mb-4">{feature.icon}</div>
//                 <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
//                 <p className="text-gray-200">{feature.description}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* How It Works */}
//       <section className="px-4 sm:px-6 lg:px-8 py-20 bg-white/5">
//         <div className="max-w-7xl mx-auto">
//           <div className="text-center mb-16">
//             <h2 className="text-4xl font-bold text-white mb-4">How It Works</h2>
//             <p className="text-xl text-gray-200">Get started in just 3 simple steps</p>
//           </div>
          
//           <div className="grid md:grid-cols-3 gap-8">
//             {[
//               {
//                 step: "01",
//                 title: "Create Account",
//                 description: "Sign up and verify your account in under 5 minutes"
//               },
//               {
//                 step: "02",
//                 title: "Deposit Funds",
//                 description: "Deposit your cryptocurrency or stablecoins securely"
//               },
//               {
//                 step: "03",
//                 title: "Start Earning",
//                 description: "Watch your investments grow with daily compound interest"
//               }
//             ].map((step, index) => (
//               <div key={index} className="text-center">
//                 <div className="bg-gradient-to-r from-white to-gray-200 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
//                   <span className="text-2xl font-bold text-[#1d8e85]">{step.step}</span>
//                 </div>
//                 <h3 className="text-2xl font-bold text-white mb-4">{step.title}</h3>
//                 <p className="text-gray-200 text-lg">{step.description}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* CTA Section */}
//       <section className="px-4 sm:px-6 lg:px-8 py-20">
//         <div className="max-w-4xl mx-auto text-center">
//           <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
//             Ready to Start Earning?
//           </h2>
//           <p className="text-xl text-gray-200 mb-8">
//             Join thousands of investors already earning passive income with JAIMX Payouts
//           </p>
//           <div className="flex flex-col sm:flex-row gap-4 justify-center">
//             <button className="bg-white text-[#1d8e85] px-10 py-4 rounded-full font-bold text-xl hover:bg-gray-100 transition-all transform hover:scale-105 shadow-2xl">
//               Join Now <ArrowRight className="inline ml-2" size={24} />
//             </button>
//             <button className="border-2 border-white text-white px-10 py-4 rounded-full font-bold text-xl hover:bg-white hover:text-[#1d8e85] transition-all">
//               View Whitepaper
//             </button>
//           </div>
//         </div>
//       </section>

//       {/* Footer */}
//       <footer className="px-4 sm:px-6 lg:px-8 py-12 bg-white/10 backdrop-blur-sm">
//         <div className="max-w-7xl mx-auto">
//           <div className="grid md:grid-cols-4 gap-8">
//             <div>
//               <div className="flex items-center space-x-2 mb-4">
//                 <div className="w-8 h-8 bg-gradient-to-r from-white to-gray-100 rounded-full flex items-center justify-center">
//                   <Zap className="w-5 h-5 text-[#1d8e85]" />
//                 </div>
//                 <span className="text-xl font-bold text-white">JAIMX PAYOUTS</span>
//               </div>
//               <p className="text-gray-200">
//                 The future of cryptocurrency investing is here.
//               </p>
//             </div>
            
//             <div>
//               <h4 className="text-white font-semibold mb-4">Platform</h4>
//               <div className="space-y-2">
//                 <a href="#" className="block text-gray-200 hover:text-white transition-colors">Features</a>
//                 <a href="#" className="block text-gray-200 hover:text-white transition-colors">Security</a>
//                 <a href="#" className="block text-gray-200 hover:text-white transition-colors">Pricing</a>
//               </div>
//             </div>
            
//             <div>
//               <h4 className="text-white font-semibold mb-4">Resources</h4>
//               <div className="space-y-2">
//                 <a href="#" className="block text-gray-200 hover:text-white transition-colors">Documentation</a>
//                 <a href="#" className="block text-gray-200 hover:text-white transition-colors">API</a>
//                 <a href="#" className="block text-gray-200 hover:text-white transition-colors">Support</a>
//               </div>
//             </div>
            
//             <div>
//               <h4 className="text-white font-semibold mb-4">Company</h4>
//               <div className="space-y-2">
//                 <a href="#" className="block text-gray-200 hover:text-white transition-colors">About</a>
//                 <a href="#" className="block text-gray-200 hover:text-white transition-colors">Blog</a>
//                 <a href="#" className="block text-gray-200 hover:text-white transition-colors">Careers</a>
//               </div>
//             </div>
//           </div>
          
//           <div className="border-t border-white/20 mt-12 pt-8 text-center text-gray-200">
//             <p>&copy; 2025 JAIMX Payouts. All rights reserved.</p>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// }



// import React, { useState, useEffect } from 'react';
// import { Plus, TrendingUp, Shield, Target, Zap, BarChart3, DollarSign } from 'lucide-react';

// const App= () => {
//   const [hoveredSquare, setHoveredSquare] = useState(null);

//   // Chess pieces in Unicode
//   const chessPieces = ['♔', '♕', '♖', '♗', '♘', '♙', '♚', '♛', '♜', '♝', '♞', '♟'];

//   const strategies = [
//     {
//       id: 1,
//       title: "Strategic asset management in bear and bull markets",
//       icon: BarChart3,
//       position: { row: 0, col: 1 },
//       piece: '♕'
//     },
//     {
//       id: 2,
//       title: "Aggressive high/medium risk trading with 10x leveraged trading",
//       icon: TrendingUp,
//       position: { row: 0, col: 4 },
//       piece: '♖'
//     },
//     {
//       id: 3,
//       title: "Conservative growth portfolio management",
//       icon: Shield,
//       position: { row: 2, col: 2 },
//       piece: '♗'
//     }
//   ];

//   // Create 8x6 grid like in the image
//   const createGrid = () => {
//     const grid = [];
//     for (let row = 0; row < 4; row++) {
//       for (let col = 0; col < 6; col++) {
//         const isStrategy = strategies.find(s => s.position.row === row && s.position.col === col);
//         const isDark = (row + col) % 2 === 1;
//         const squareId = `${row}-${col}`;
        
//         grid.push({
//           id: squareId,
//           row,
//           col,
//           isDark,
//           strategy: isStrategy,
//           piece: isStrategy ? isStrategy.piece : chessPieces[Math.floor(Math.random() * chessPieces.length)]
//         });
//       }
//     }
//     return grid;
//   };

//   const [grid, setGrid] = useState(createGrid());

//   // Animation for chess pieces
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setGrid(prevGrid => 
//         prevGrid.map(square => ({
//           ...square,
//           piece: square.strategy ? square.piece : chessPieces[Math.floor(Math.random() * chessPieces.length)]
//         }))
//       );
//     }, 2000);

//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div className="min-h-screen bg-[#1d8e85] text-white relative overflow-hidden">
//       {/* Background animated chess pieces */}
//       <div className="absolute inset-0 opacity-10">
//         {[...Array(20)].map((_, i) => (
//           <div
//             key={i}
//             className="absolute text-6xl animate-pulse text-white"
//             style={{
//               left: `${Math.random() * 100}%`,
//               top: `${Math.random() * 100}%`,
//               animationDelay: `${Math.random() * 2}s`,
//               animationDuration: `${3 + Math.random() * 2}s`
//             }}
//           >
//             {chessPieces[Math.floor(Math.random() * chessPieces.length)]}
//           </div>
//         ))}
//       </div>

//       <div className="relative z-10 p-8">
//         {/* Header */}
//         <div className="flex items-center justify-between mb-12">
//           <div className="flex items-center space-x-4">
//             <div className="flex items-center space-x-2">
//               <div className="text-green-400 text-2xl">✱</div>
//               <h1 className="text-2xl font-bold text-green-400 tracking-wider">SOLANA PAYOUTS</h1>
//             </div>
//             <div className="bg-[#1d8e85]/60 rounded-full p-2 backdrop-blur-sm border border-white/30">
//               <div className="flex items-center space-x-2 px-4 py-1">
//                 <span className="text-white">Menu</span>
//                 <Plus className="w-4 h-4 text-white" />
//               </div>
//             </div>
//           </div>
//           <div className="text-right">
//             <p className="text-gray-300 text-sm mb-1">Investment strategy</p>
//             <h2 className="text-4xl font-light tracking-wide">Investment strategy</h2>
//           </div>
//         </div>

//         {/* Chess Board Grid */}
//         <div className="max-w-6xl mx-auto">
//           <div className="grid grid-cols-6 gap-1 bg-[#1d8e85]/60 p-4 rounded-lg backdrop-blur-sm border border-white/20">
//             {grid.map((square) => (
//               <div
//                 key={square.id}
//                 className={`
//                   aspect-square relative cursor-pointer transition-all duration-500 group
//                   ${square.isDark ? 'bg-[#1d8e85]/80' : 'bg-[#1d8e85]/40'}
//                   ${hoveredSquare === square.id ? 'scale-105 z-20' : ''}
//                   ${square.strategy ? 'hover:bg-green-500/20' : 'hover:bg-[#1d8e85]/60'}
//                 `}
//                 onMouseEnter={() => setHoveredSquare(square.id)}
//                 onMouseLeave={() => setHoveredSquare(null)}
//               >
//                 {/* Chess piece background */}
//                 <div className={`
//                   absolute inset-0 flex items-center justify-center text-4xl opacity-30
//                   ${square.strategy ? 'text-green-400' : 'text-white'}
//                   transition-all duration-300 group-hover:scale-110 group-hover:rotate-12
//                 `}>
//                   {square.piece}
//                 </div>

//                 {/* Strategy content */}
//                 {square.strategy && (
//                   <div className="absolute inset-0 p-3 flex flex-col justify-center items-center text-center">
//                     <div className="bg-green-500/20 p-2 rounded-full mb-2 backdrop-blur-sm">
//                       <div className="text-green-400 text-xl">✱</div>
//                     </div>
//                     <p className="text-white text-xs leading-tight font-medium">
//                       {square.strategy.title}
//                     </p>
//                   </div>
//                 )}

//                 {/* Hover overlay */}
//                 {hoveredSquare === square.id && square.strategy && (
//                   <div className="absolute inset-0 bg-green-500/30 backdrop-blur-sm rounded-lg p-2 flex items-center justify-center border border-white/30">
//                     <div className="text-center">
//                       <div className="text-2xl mb-1 text-white">{square.strategy.piece}</div>
//                       <p className="text-xs text-white font-semibold">
//                         {square.strategy.title.split(' ').slice(0, 3).join(' ')}...
//                       </p>
//                     </div>
//                   </div>
//                 )}

//                 {/* Empty square hover effect */}
//                 {hoveredSquare === square.id && !square.strategy && (
//                   <div className="absolute inset-0 bg-[#1d8e85]/60 backdrop-blur-sm rounded-lg flex items-center justify-center border border-white/20">
//                     <div className="text-3xl animate-spin text-white">{square.piece}</div>
//                   </div>
//                 )}
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Bottom section with additional info */}
//         <div className="mt-12 max-w-6xl mx-auto">
//           <div className="grid grid-cols-3 gap-6">
//             {strategies.map((strategy, index) => (
//               <div key={strategy.id} className="bg-[#1d8e85]/60 rounded-lg p-6 backdrop-blur-sm hover:bg-[#1d8e85]/80 transition-all duration-300 border border-white/20">
//                 <div className="flex items-center space-x-3 mb-3">
//                   <div className="text-3xl text-white">{strategy.piece}</div>
//                   <div className="text-green-400 text-xl">✱</div>
//                 </div>
//                 <p className="text-white text-sm leading-relaxed">
//                   {strategy.title}
//                 </p>
//                 <div className="mt-4 flex items-center space-x-2">
//                   <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
//                   <span className="text-white text-xs">Active Strategy</span>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Floating chess pieces */}
//         <div className="fixed top-20 right-10 text-6xl text-white/20 animate-bounce">♔</div>
//         <div className="fixed bottom-20 left-10 text-6xl text-white/20 animate-pulse">♕</div>
//         <div className="fixed top-1/2 right-20 text-4xl text-white/30 animate-spin" style={{ animationDuration: '10s' }}>♖</div>
//       </div>
//     </div>
//   );
// };

// export default App;



// import React, { useState } from 'react';
// import { Menu, X, TrendingUp, Shield, Zap, Users, ArrowRight, Star, CheckCircle } from 'lucide-react';

// export default function App() {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-[#1d8e85] via-[#2aa398] to-[#1d8e85]">
//       {/* Navigation */}
//       <nav className="relative z-50 px-4 sm:px-6 lg:px-8 py-4">
//         <div className="max-w-7xl mx-auto flex items-center justify-between">
//           <div className="flex items-center space-x-2">
//             <div className="w-8 h-8 bg-gradient-to-r from-white to-gray-100 rounded-full flex items-center justify-center">
//               <Zap className="w-5 h-5 text-[#1d8e85]" />
//             </div>
//             <span className="text-2xl font-bold text-white">JAIMX PAYOUTS</span>
//           </div>
          
//           {/* Desktop Menu */}
//           <div className="hidden md:flex items-center space-x-8">
//             <a href="#features" className="text-white hover:text-gray-200 transition-colors">Features</a>
//             <a href="#about" className="text-white hover:text-gray-200 transition-colors">About</a>
//             <a href="#roadmap" className="text-white hover:text-gray-200 transition-colors">Roadmap</a>
//             <a href="#contact" className="text-white hover:text-gray-200 transition-colors">Contact</a>
//             <button className="bg-white text-[#1d8e85] px-6 py-2 rounded-full font-semibold hover:bg-gray-100 transition-colors">
//               Join Now
//             </button>
//           </div>

//           {/* Mobile Menu Button */}
//           <button 
//             className="md:hidden text-white"
//             onClick={() => setIsMenuOpen(!isMenuOpen)}
//           >
//             {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
//           </button>
//         </div>

//         {/* Mobile Menu */}
//         {isMenuOpen && (
//           <div className="md:hidden absolute top-full left-0 right-0 bg-white bg-opacity-95 backdrop-blur-sm rounded-lg mx-4 mt-2 p-4 shadow-xl">
//             <div className="flex flex-col space-y-4">
//               <a href="#features" className="text-[#1d8e85] hover:text-[#2aa398] transition-colors">Features</a>
//               <a href="#about" className="text-[#1d8e85] hover:text-[#2aa398] transition-colors">About</a>
//               <a href="#roadmap" className="text-[#1d8e85] hover:text-[#2aa398] transition-colors">Roadmap</a>
//               <a href="#contact" className="text-[#1d8e85] hover:text-[#2aa398] transition-colors">Contact</a>
//               <button className="bg-[#1d8e85] text-white px-6 py-2 rounded-full font-semibold hover:bg-[#2aa398] transition-colors">
//                 Join Now
//               </button>
//             </div>
//           </div>
//         )}
//       </nav>

//       {/* Hero Section */}
//       <section className="px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
//         <div className="max-w-7xl mx-auto">
//           <div className="grid lg:grid-cols-2 gap-12 items-center">
//             <div className="text-center lg:text-left">
//               <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
//                 Earn up to <span className="text-yellow-300">15%</span> monthly with
//                 <br />
//                 <span className="text-7xl sm:text-8xl lg:text-9xl font-black bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
//                   JAIMX
//                   <br />
//                   PAYOUTS
//                 </span>
//               </h1>
//               <p className="text-xl text-gray-100 mb-8 max-w-lg mx-auto lg:mx-0">
//                 Deposit cryptocurrency or stablecoins and watch your investments grow with our innovative DeFi platform
//               </p>
//               <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
//                 <button className="bg-white text-[#1d8e85] px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-all transform hover:scale-105 shadow-xl">
//                   Start Earning <ArrowRight className="inline ml-2" size={20} />
//                 </button>
//                 <button className="border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-[#1d8e85] transition-all">
//                   Learn More
//                 </button>
//               </div>
//             </div>
            
//             {/* 3D Visual Element */}
//             <div className="relative flex justify-center lg:justify-end">
//               <div className="relative w-80 h-80 lg:w-96 lg:h-96">
//                 {/* Animated Circles */}
//                 <div className="absolute inset-0 rounded-full bg-gradient-to-r from-white/20 to-white/10 animate-pulse"></div>
//                 <div className="absolute inset-4 rounded-full bg-gradient-to-r from-white/30 to-white/20 animate-ping"></div>
//                 <div className="absolute inset-8 rounded-full bg-white/40 flex items-center justify-center">
//                   <div className="text-6xl font-bold text-[#1d8e85]">₿</div>
//                 </div>
                
//                 {/* Floating Elements */}
//                 <div className="absolute -top-4 -right-4 bg-yellow-400 rounded-full p-3 animate-bounce">
//                   <TrendingUp className="text-white" size={24} />
//                 </div>
//                 <div className="absolute -bottom-4 -left-4 bg-green-400 rounded-full p-3 animate-bounce delay-100">
//                   <Shield className="text-white" size={24} />
//                 </div>
//                 <div className="absolute top-1/2 -right-8 bg-blue-400 rounded-full p-3 animate-bounce delay-200">
//                   <Zap className="text-white" size={24} />
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Stats Section */}
//       <section className="px-4 sm:px-6 lg:px-8 py-16 bg-white/10 backdrop-blur-sm">
//         <div className="max-w-7xl mx-auto">
//           <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
//             <div>
//               <div className="text-4xl font-bold text-white mb-2">$50M+</div>
//               <div className="text-gray-200">Total Value Locked</div>
//             </div>
//             <div>
//               <div className="text-4xl font-bold text-white mb-2">25K+</div>
//               <div className="text-gray-200">Active Users</div>
//             </div>
//             <div>
//               <div className="text-4xl font-bold text-white mb-2">15%</div>
//               <div className="text-gray-200">Max Monthly Returns</div>
//             </div>
//             <div>
//               <div className="text-4xl font-bold text-white mb-2">99.9%</div>
//               <div className="text-gray-200">Uptime</div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Features Section */}
//       <section id="features" className="px-4 sm:px-6 lg:px-8 py-20">
//         <div className="max-w-7xl mx-auto">
//           <div className="text-center mb-16">
//             <h2 className="text-4xl font-bold text-white mb-4">Why Choose JAIMX?</h2>
//             <p className="text-xl text-gray-200 max-w-3xl mx-auto">
//               Experience the future of cryptocurrency investing with our cutting-edge platform
//             </p>
//           </div>
          
//           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
//             {[
//               {
//                 icon: <TrendingUp size={32} />,
//                 title: "High Yields",
//                 description: "Earn up to 15% monthly returns on your cryptocurrency investments"
//               },
//               {
//                 icon: <Shield size={32} />,
//                 title: "Secure & Safe",
//                 description: "Military-grade security with multi-signature wallets and insurance coverage"
//               },
//               {
//                 icon: <Zap size={32} />,
//                 title: "Instant Deposits",
//                 description: "Quick and seamless deposits with support for major cryptocurrencies"
//               },
//               {
//                 icon: <Users size={32} />,
//                 title: "Community Driven",
//                 description: "Join thousands of investors earning passive income together"
//               },
//               {
//                 icon: <CheckCircle size={32} />,
//                 title: "Verified Platform",
//                 description: "Fully audited smart contracts and transparent operations"
//               },
//               {
//                 icon: <Star size={32} />,
//                 title: "24/7 Support",
//                 description: "Round-the-clock customer support to help you succeed"
//               }
//             ].map((feature, index) => (
//               <div key={index} className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 hover:bg-white/20 transition-all transform hover:scale-105">
//                 <div className="text-white mb-4">{feature.icon}</div>
//                 <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
//                 <p className="text-gray-200">{feature.description}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* How It Works */}
//       <section className="px-4 sm:px-6 lg:px-8 py-20 bg-white/5">
//         <div className="max-w-7xl mx-auto">
//           <div className="text-center mb-16">
//             <h2 className="text-4xl font-bold text-white mb-4">How It Works</h2>
//             <p className="text-xl text-gray-200">Get started in just 3 simple steps</p>
//           </div>
          
//           <div className="grid md:grid-cols-3 gap-8">
//             {[
//               {
//                 step: "01",
//                 title: "Create Account",
//                 description: "Sign up and verify your account in under 5 minutes"
//               },
//               {
//                 step: "02",
//                 title: "Deposit Funds",
//                 description: "Deposit your cryptocurrency or stablecoins securely"
//               },
//               {
//                 step: "03",
//                 title: "Start Earning",
//                 description: "Watch your investments grow with daily compound interest"
//               }
//             ].map((step, index) => (
//               <div key={index} className="text-center">
//                 <div className="bg-gradient-to-r from-white to-gray-200 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
//                   <span className="text-2xl font-bold text-[#1d8e85]">{step.step}</span>
//                 </div>
//                 <h3 className="text-2xl font-bold text-white mb-4">{step.title}</h3>
//                 <p className="text-gray-200 text-lg">{step.description}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* CTA Section */}
//       <section className="px-4 sm:px-6 lg:px-8 py-20">
//         <div className="max-w-4xl mx-auto text-center">
//           <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
//             Ready to Start Earning?
//           </h2>
//           <p className="text-xl text-gray-200 mb-8">
//             Join thousands of investors already earning passive income with JAIMX Payouts
//           </p>
//           <div className="flex flex-col sm:flex-row gap-4 justify-center">
//             <button className="bg-white text-[#1d8e85] px-10 py-4 rounded-full font-bold text-xl hover:bg-gray-100 transition-all transform hover:scale-105 shadow-2xl">
//               Join Now <ArrowRight className="inline ml-2" size={24} />
//             </button>
//             <button className="border-2 border-white text-white px-10 py-4 rounded-full font-bold text-xl hover:bg-white hover:text-[#1d8e85] transition-all">
//               View Whitepaper
//             </button>
//           </div>
//         </div>
//       </section>

//       {/* Footer */}
//       <footer className="px-4 sm:px-6 lg:px-8 py-12 bg-white/10 backdrop-blur-sm">
//         <div className="max-w-7xl mx-auto">
//           <div className="grid md:grid-cols-4 gap-8">
//             <div>
//               <div className="flex items-center space-x-2 mb-4">
//                 <div className="w-8 h-8 bg-gradient-to-r from-white to-gray-100 rounded-full flex items-center justify-center">
//                   <Zap className="w-5 h-5 text-[#1d8e85]" />
//                 </div>
//                 <span className="text-xl font-bold text-white">JAIMX PAYOUTS</span>
//               </div>
//               <p className="text-gray-200">
//                 The future of cryptocurrency investing is here.
//               </p>
//             </div>
            
//             <div>
//               <h4 className="text-white font-semibold mb-4">Platform</h4>
//               <div className="space-y-2">
//                 <a href="#" className="block text-gray-200 hover:text-white transition-colors">Features</a>
//                 <a href="#" className="block text-gray-200 hover:text-white transition-colors">Security</a>
//                 <a href="#" className="block text-gray-200 hover:text-white transition-colors">Pricing</a>
//               </div>
//             </div>
            
//             <div>
//               <h4 className="text-white font-semibold mb-4">Resources</h4>
//               <div className="space-y-2">
//                 <a href="#" className="block text-gray-200 hover:text-white transition-colors">Documentation</a>
//                 <a href="#" className="block text-gray-200 hover:text-white transition-colors">API</a>
//                 <a href="#" className="block text-gray-200 hover:text-white transition-colors">Support</a>
//               </div>
//             </div>
            
//             <div>
//               <h4 className="text-white font-semibold mb-4">Company</h4>
//               <div className="space-y-2">
//                 <a href="#" className="block text-gray-200 hover:text-white transition-colors">About</a>
//                 <a href="#" className="block text-gray-200 hover:text-white transition-colors">Blog</a>
//                 <a href="#" className="block text-gray-200 hover:text-white transition-colors">Careers</a>
//               </div>
//             </div>
//           </div>
          
//           <div className="border-t border-white/20 mt-12 pt-8 text-center text-gray-200">
//             <p>&copy; 2025 JAIMX Payouts. All rights reserved.</p>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// }