// // import { useLocation, useNavigate } from "react-router-dom";
// // import { Sling as Hamburger } from "hamburger-react";
// // import {
// //   HiOutlineViewGrid,
// //   HiOutlineClipboardList,
// //   HiOutlineCalendar,
// //   HiOutlineChartBar,
// //   HiOutlineShieldCheck,
// //   HiOutlineUser,
// //   HiOutlineIdentification,
// //   HiOutlineCash,
// //   HiOutlineChatAlt2,
// //   HiOutlineLogout,
// //   HiOutlineClock,
// //   HiOutlineVideoCamera,
// //   HiOutlineCreditCard,
// // } from "react-icons/hi";
// // import { useState, useEffect } from "react";
// // import { FaHandshake } from "react-icons/fa";
// // import { TreePalm,HandCoins,Wallet,UserRound ,SwatchBook ,Handshake ,Landmark ,HousePlug} from "lucide-react";
// // import logo from "../../assets/Images/jaimaxlogo1.svg";

// // const navItems = [
// //   { name: "Dashboard", path: "/dashboard", icon: <HiOutlineViewGrid /> },
// //   { name: "Wallet", path: "/wallet", icon: <Wallet  size={18} /> },
// //   { name: "Buy History", path: "/buy-history", icon: <HiOutlineChartBar /> },
// //   // { name: "My Total Team", path: "/my-team", icon: <HiOutlineCalendar /> },
// //   { name: "J-Wallet", path: "/jwallet", icon: <HiOutlineCreditCard /> },
// //   { name: "consents", path: "/consents", icon: <HiOutlineCreditCard /> },
// //   { name: "dashboard", path: "/dashboardapis", icon: <HiOutlineVideoCamera /> },
// //   // { name: "Promoters", path: "/promoters", icon: <Handshake  size={18} /> },
// //   // { name: "Guaranteed Wealth", path: "/guaranteedwealthplan", icon: <Landmark   size={18} /> },
// //   // { name: "Guaranteed Wealth 2.0", path: "/guaranteedwealthplan-2-0", icon: <HousePlug   size={18} /> },
// //   { name: "Withdrawal", path: "/withdrawal", icon: <HiOutlineCash /> },
// //   // { name: "Foundation Bonus", path: "/foundation", icon: <SwatchBook size={18} /> },
// //   // { name: "Locked Superbonus", path: "/locked-superbonus", icon: <HandCoins   size={16}/> },
// //   // { name: "Goa-Gateway", path: "/goa-vacation", icon: <TreePalm size={16}/> },
// //   { name: "Profile", path: "/profile", icon: <UserRound size={18}  /> },
// //   { name: "KYC", path: "/kyc-information", icon: <HiOutlineIdentification /> },
// //   { name: "Support", path: "/support", icon: <HiOutlineChatAlt2 /> },
// //   { name: "Jaimax-Hub", path: "/meetings", icon: <HiOutlineVideoCamera /> },
// //   { name: "Security", path: "/security", icon: <HiOutlineShieldCheck /> },
// //   { name: "Logout", icon: <HiOutlineLogout /> },
// // ];

// // function Sidebar({ onLogoutClick }) {
// //   const location = useLocation();
// //   const navigate = useNavigate();
// //   const [isOpen, setIsOpen] = useState(false);
// //   const [isMobile, setIsMobile] = useState(false);

// //   useEffect(() => {
// //     const handleResize = () => {
// //       const width = window.innerWidth;
// //       setIsMobile(width < 768);
// //       // Auto-open on desktop, auto-close on mobile
// //       setIsOpen(width >= 768);
// //     };

// //     handleResize();
// //     window.addEventListener("resize", handleResize);
// //     return () => window.removeEventListener("resize", handleResize);
// //   }, []);

// //   const handleNavClick = (item) => {
// //     if (isMobile) setIsOpen(false);
// //     if (item.name === "Logout") {
// //       onLogoutClick();
// //     } else if (item.path && location.pathname !== item.path) {
// //       navigate(item.path);
// //     }
// //   };

// //   return (
// //     <>
// //       {/* Mobile hamburger button - only show on mobile when sidebar is closed */}
// //       {isMobile && !isOpen && (
// //         <div className="fixed -top-1 left-4 z-50 rounded-lg p-2 lg">
// //           <Hamburger
// //             toggled={isOpen}
// //             toggle={setIsOpen}
// //             size={20}
// //             color="#ffffff"
// //           />
// //         </div>
// //       )}

// //       {/* Mobile overlay */}
// //       {isMobile && isOpen && (
// //         <div
// //           className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
// //           onClick={() => setIsOpen(false)}
// //         />
// //       )}

// //       {/* Sidebar */}
// //       <div
// //         className={`
// //           fixed top-0 left-0 h-screen flex flex-col z-40
// //           transition-all duration-300 ease-in-out shadow-lg border-r border-teal-600/20
// //           bg-gradient-to-br from-[#085358] via-[#085358] to-[#085358]
// //           ${
// //             isMobile
// //               ? `${isOpen ? "translate-x-0" : "-translate-x-full"} w-72`
// //               : `${isOpen ? "w-64" : "w-20"}`
// //           }
// //           md:relative md:translate-x-0
// //         `}
// //       >
// //         {/* Header */}
// //         <div className="flex items-center justify-between p-4 border-b border-teal-600/30 bg-gradient-to-r from-teal-700/20 to-transparent">
// //           <div
// //             className={`flex items-center ${
// //               !isOpen && !isMobile ? "justify-center w-full" : ""
// //             }`}
// //           >
// //             {isOpen ? (
// //               <img src={logo} alt="Logo" 
// //               title=" Jaimax Coin – Best Pre-Sale Crypto token in India | Smart Investments"
// //                className="" />
// //             ) : (
// //               !isMobile && (
// //                 <div className="w-10 h-10 bg-teal-600/20 rounded-lg flex items-center justify-center"></div>
// //               )
// //             )}
// //           </div>

// //           {/* Hamburger menu */}
// //           <div
// //             className={`${
// //               !isOpen && !isMobile ? "absolute left-1/2 -translate-x-1/2" : ""
// //             }`}
// //           >
// //             <Hamburger
// //               toggled={isOpen}
// //               toggle={setIsOpen}
// //               size={20}
// //               color="#ffffff"
// //             />
// //           </div>
// //         </div>

// //         {/* Navigation */}
// //         <nav className="flex-1 overflow-y-auto overflow-x-hidden p-4 scrollbar-none ">
// //           {isOpen && (
// //             <p className="text-xs text-teal-300 uppercase font-semibold mb-4 tracking-wider">
// //               Menu
// //             </p>
// //           )}

// //           <div className="space-y-1">
// //             {navItems.map((item) => (
// //               <div
// //                 key={item.name}
// //                 onClick={() => handleNavClick(item)}
// //                 className={`
// //                   cursor-pointer relative flex items-center font-medium 
// //                   transition-all duration-200 rounded-lg group
// //                   ${isOpen ? "px-4 py-3" : "p-3 justify-center"}
// //                   ${
// //                     location.pathname === item.path ||
// //                     (item.path === "/wallet" &&
// //                       location.pathname === "/add-funds")
// //                       ? "text-white bg-gradient-to-r from-teal-600/40 to-emerald-600/40 shadow-md border border-teal-500/30"
// //                       : "text-teal-100 hover:text-white hover:bg-gradient-to-r hover:from-teal-700/30 hover:to-teal-600/30"
// //                   }
// //                 `}
// //                 title={!isOpen ? item.name : undefined}
// //               >
// //                 {/* Active indicator */}
// //                 {location.pathname === item.path && isOpen && (
// //                   <span className="absolute left-0 top-1/2 -translate-y-1/2 h-8 w-1 bg-gradient-to-b from-emerald-400 to-teal-400 rounded-r-full shadow-glow"></span>
// //                 )}

// //                 {/* Icon */}
// //                 <span
// //                   className={`
// //                   flex-shrink-0 transition-all duration-200
// //                   ${isOpen ? "text-xl" : "text-2xl"}
// //                   ${
// //                     location.pathname === item.path
// //                       ? "text-emerald-300"
// //                       : "text-teal-200 group-hover:text-white"
// //                   }
// //                 `}
// //                 >
// //                   {item.icon}
// //                 </span>

// //                 {/* Label */}
// //                 {isOpen && (
// //                   <span className="ml-4 text-sm font-medium truncate">
// //                     {item.name}
// //                   </span>
// //                 )}

// //                 {/* Tooltip for collapsed state */}
// //                 {!isOpen && !isMobile && (
// //                   <div className="absolute left-full ml-2 px-2 py-1 bg-white text-white text-sm rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50">
// //                     {item.name}
// //                   </div>
// //                 )}
// //               </div>
// //             ))}
// //           </div>
// //         </nav>
// //       </div>

// //       {/* Add custom scrollbar styles */}
// //       <style jsx>{`
// //         .scrollbar-thin::-webkit-scrollbar {
// //           width: 6px;
// //         }
// //         .scrollbar-thin::-webkit-scrollbar-track {
// //           background: transparent;
// //         }
// //         .scrollbar-thin::-webkit-scrollbar-thumb {
// //           background: rgba(20, 184, 166, 0.3);
// //           border-radius: 3px;
// //         }
// //         .scrollbar-thin::-webkit-scrollbar-thumb:hover {
// //           background: rgba(20, 184, 166, 0.5);
// //         }
// //         .shadow-glow {
// //           box-shadow: 0 0 10px rgba(52, 211, 153, 0.5);
// //         }
// //       `}</style>
// //     </>
// //   );
// // }

// // export default Sidebar;
// // import { useLocation, useNavigate } from "react-router-dom";
// // import { Sling as Hamburger } from "hamburger-react";
// // import {
// //   HiOutlineViewGrid,
// //   HiOutlineChartBar,
// //   HiOutlineShieldCheck,
// //   HiOutlineIdentification,
// //   HiOutlineCash,
// //   HiOutlineChatAlt2,
// //   HiOutlineLogout,
// //   HiOutlineVideoCamera,
// //   HiOutlineCreditCard,
// // } from "react-icons/hi";
// // import { useState, useEffect, useCallback } from "react";
// // import { Wallet, UserRound, ChevronLeft, ChevronRight } from "lucide-react";
// // import logo from "../../assets/Images/jaimaxlogo1.svg";

// // const navItems = [
// //   { name: "Dashboard", path: "/dashboard", icon: HiOutlineViewGrid },
// //   { name: "Wallet", path: "/wallet", icon: Wallet, size: 18 },
// //   { name: "Buy History", path: "/buy-history", icon: HiOutlineChartBar },
// //   { name: "J-Wallet", path: "/jwallet", icon: HiOutlineCreditCard },
// //   { name: "Consents", path: "/consents", icon: HiOutlineCreditCard },
// //   { name: "Dashboard APIs", path: "/dashboardapis", icon: HiOutlineVideoCamera },
// //   { name: "Withdrawal", path: "/withdrawal", icon: HiOutlineCash },
// //   { name: "Profile", path: "/profile", icon: UserRound, size: 18 },
// //   { name: "KYC", path: "/kyc-information", icon: HiOutlineIdentification },
// //   { name: "Support", path: "/support", icon: HiOutlineChatAlt2 },
// //   { name: "Jaimax-Hub", path: "/meetings", icon: HiOutlineVideoCamera },
// //   { name: "Security", path: "/security", icon: HiOutlineShieldCheck },
// // ];

// // function Sidebar({ onLogoutClick }) {
// //   const location = useLocation();
// //   const navigate = useNavigate();
// //   const [isOpen, setIsOpen] = useState(false);
// //   const [isMobile, setIsMobile] = useState(false);

// //   useEffect(() => {
// //     const handleResize = () => {
// //       const width = window.innerWidth;
// //       setIsMobile(width < 768);
// //       setIsOpen(width >= 768);
// //     };

// //     handleResize();
// //     window.addEventListener("resize", handleResize);
// //     return () => window.removeEventListener("resize", handleResize);
// //   }, []);

// //   const handleNavClick = useCallback((item) => {
// //     if (isMobile) setIsOpen(false);
// //     if (item.path && location.pathname !== item.path) {
// //       navigate(item.path);
// //     }
// //   }, [isMobile, location.pathname, navigate]);

// //   const isActive = useCallback((path) => {
// //     return (
// //       location.pathname === path ||
// //       (path === "/wallet" && location.pathname === "/add-funds")
// //     );
// //   }, [location.pathname]);

// //   return (
// //     <>
// //       {/* Mobile hamburger button */}
// //       {isMobile && !isOpen && (
// //         <button
// //           onClick={() => setIsOpen(true)}
// //           className="fixed top-3 left-4 z-50 p-2 rounded-xl bg-[#085056] text-white shadow-lg"
// //         >
// //           <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
// //             <line x1="3" y1="6" x2="21" y2="6" />
// //             <line x1="3" y1="12" x2="21" y2="12" />
// //             <line x1="3" y1="18" x2="21" y2="18" />
// //           </svg>
// //         </button>
// //       )}

// //       {/* Mobile overlay */}
// //       {isMobile && isOpen && (
// //         <div
// //           className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
// //           onClick={() => setIsOpen(false)}
// //         />
// //       )}

// //       {/* Sidebar */}
// //       <aside
// //         className={`
// //           fixed top-0 left-0 h-screen flex flex-col z-50
// //           transition-all duration-300 ease-in-out
// //           bg-[#085056] border-r border-white/10 shadow-2xl
// //           ${isMobile
// //             ? `${isOpen ? "translate-x-0" : "-translate-x-full"} w-72`
// //             : `${isOpen ? "w-64" : "w-20"}`
// //           }
// //           md:relative md:translate-x-0
// //         `}
// //       >
// //         {/* Header */}
// //         <div className="flex items-center justify-between h-16 px-4 border-b border-white/10">
// //           <div className={`flex items-center gap-3 ${!isOpen && !isMobile ? "justify-center w-full" : ""}`}>
// //             {isOpen ? (
// //               <img
// //                 src={logo}
// //                 alt="Jaimax Logo"
// //                 className="h-8"
// //               />
// //             ) : (
// //               !isMobile && (
// //                 <div className="w-10 h-10 bg-white/15 rounded-xl flex items-center justify-center">
// //                   <span className="text-white font-bold">J</span>
// //                 </div>
// //               )
// //             )}
// //           </div>

// //           {/* Toggle Button */}
// //           {!isMobile && (
// //             <button
// //               onClick={() => setIsOpen(!isOpen)}
// //               className="p-2 rounded-lg hover:bg-white/10 text-white/70 hover:text-white transition-colors"
// //             >
// //               {isOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
// //             </button>
// //           )}

// //           {/* Mobile Close Button */}
// //           {isMobile && isOpen && (
// //             <button
// //               onClick={() => setIsOpen(false)}
// //               className="p-2 rounded-lg hover:bg-white/10 text-white"
// //             >
// //               <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
// //                 <line x1="18" y1="6" x2="6" y2="18" />
// //                 <line x1="6" y1="6" x2="18" y2="18" />
// //               </svg>
// //             </button>
// //           )}
// //         </div>

// //         {/* Navigation */}
// //         <nav 
// //           className="flex-1 overflow-y-auto p-3"
// //           style={{ scrollbarWidth: "none" }}
// //         >
// //           {isOpen && (
// //             <p className="text-[10px] text-white/40 uppercase font-semibold mb-3 px-3 tracking-widest">
// //               Navigation
// //             </p>
// //           )}

// //           <div className="space-y-1">
// //             {navItems.map((item) => {
// //               const IconComponent = item.icon;
// //               const active = isActive(item.path);
              
// //               return (
// //                 <button
// //                   key={item.name}
// //                   onClick={() => handleNavClick(item)}
// //                   className={`
// //                     w-full relative flex items-center font-medium 
// //                     transition-all duration-200 rounded-xl group
// //                     ${isOpen ? "px-4 py-3 justify-start" : "p-3 justify-center"}
// //                     ${active
// //                       ? "text-white bg-white/20"
// //                       : "text-white/60 hover:text-white hover:bg-white/10"
// //                     }
// //                   `}
// //                 >
// //                   {/* Active indicator */}
// //                   {active && (
// //                     <span className={`absolute ${isOpen ? "left-0" : "left-1/2 -translate-x-1/2 bottom-0"} ${isOpen ? "top-1/2 -translate-y-1/2 h-8 w-1" : "h-1 w-8"} bg-white rounded-full`}></span>
// //                   )}

// //                   {/* Icon */}
// //                   <span className={`flex-shrink-0 ${isOpen ? "text-xl" : "text-2xl"}`}>
// //                     <IconComponent size={item.size || 20} />
// //                   </span>

// //                   {/* Label */}
// //                   {isOpen && (
// //                     <span className="ml-3 text-sm font-medium truncate">
// //                       {item.name}
// //                     </span>
// //                   )}

// //                   {/* Tooltip */}
// //                   {!isOpen && !isMobile && (
// //                     <div className="absolute left-full ml-3 px-3 py-2 bg-[#085056] border border-white/20 text-white text-sm font-medium rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50 shadow-xl">
// //                       {item.name}
// //                       <div className="absolute right-full top-1/2 -translate-y-1/2 border-8 border-transparent border-r-[#085056]"></div>
// //                     </div>
// //                   )}
// //                 </button>
// //               );
// //             })}
// //           </div>
// //         </nav>

// //         {/* Logout Section */}
// //         <div className="p-3 border-t border-white/10">
// //           <button
// //             onClick={onLogoutClick}
// //             className={`
// //               w-full flex items-center font-medium rounded-xl
// //               text-white/60 hover:text-white hover:bg-white/10
// //               transition-all duration-200 group
// //               ${isOpen ? "px-4 py-3 justify-start" : "p-3 justify-center"}
// //             `}
// //           >
// //             <HiOutlineLogout className={`flex-shrink-0 ${isOpen ? "text-xl" : "text-2xl"}`} />
// //             {isOpen && (
// //               <span className="ml-3 text-sm font-medium">Logout</span>
// //             )}

// //             {/* Tooltip */}
// //             {!isOpen && !isMobile && (
// //               <div className="absolute left-full ml-3 px-3 py-2 bg-[#085056] border border-white/20 text-white text-sm font-medium rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50 shadow-xl">
// //                 Logout
// //               </div>
// //             )}
// //           </button>
// //         </div>

        
// //       </aside>
// //     </>
// //   );
// // }

// // export default Sidebar;


// import { useLocation, useNavigate } from "react-router-dom";
// import {
//   HiOutlineViewGrid,
//   HiOutlineChartBar,
//   HiOutlineShieldCheck,
//   HiOutlineIdentification,
//   HiOutlineCash,
//   HiOutlineChatAlt2,
//   HiOutlineLogout,
//   HiOutlineVideoCamera,
//   HiOutlineCreditCard,
//   HiOutlineMenu,
//   HiOutlineX,
// } from "react-icons/hi";
// import { useState, useEffect, useCallback } from "react";
// import { Wallet, UserRound, ChevronLeft, ChevronRight } from "lucide-react";
// import logo from "../../assets/Images/jaimaxlogo1.svg";
// import logo2 from "../../assets/welcomeProfile.svg"

// const navItems = [
//   { name: "Dashboard", path: "/dashboard", icon: HiOutlineViewGrid },
//   { name: "Wallet", path: "/wallet", icon: Wallet, size: 18 },
//   { name: "Buy History", path: "/buy-history", icon: HiOutlineChartBar },
//   { name: "J-Wallet", path: "/jwallet", icon: HiOutlineCreditCard },
//   // { name: "Consents", path: "/consents", icon: HiOutlineCreditCard },
//   // { name: "Dashboard APIs", path: "/dashboardapis", icon: HiOutlineVideoCamera },
//   { name: "Withdrawal", path: "/withdrawal", icon: HiOutlineCash },
//   { name: "Profile", path: "/profile", icon: UserRound, size: 18 },
//   { name: "KYC", path: "/kyc-information", icon: HiOutlineIdentification },
//   { name: "Support", path: "/support", icon: HiOutlineChatAlt2 },
//   { name: "Jaimax-Hub", path: "/meetings", icon: HiOutlineVideoCamera },
//   { name: "Security", path: "/security", icon: HiOutlineShieldCheck },
// ];

// function Sidebar({ onLogoutClick }) {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const [isOpen, setIsOpen] = useState(false);
//   const [isCollapsed, setIsCollapsed] = useState(false);
//   const [screenSize, setScreenSize] = useState("desktop");

//   // Handle screen resize
//   useEffect(() => {
//     const handleResize = () => {
//       const width = window.innerWidth;
//       if (width < 768) {
//         setScreenSize("mobile");
//         setIsOpen(false);
//       } else if (width < 1024) {
//         setScreenSize("tablet");
//         setIsOpen(false);
//       } else {
//         setScreenSize("desktop");
//         setIsOpen(true);
//       }
//     };

//     handleResize();
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   const handleNavClick = useCallback((item) => {
//     // Close sidebar on mobile and tablet after navigation
//     if (screenSize !== "desktop") {
//       setIsOpen(false);
//     }
//     if (item.path && location.pathname !== item.path) {
//       navigate(item.path);
//     }
//   }, [screenSize, location.pathname, navigate]);

//   const handleLogoutClick = useCallback(() => {
//     if (screenSize !== "desktop") {
//       setIsOpen(false);
//     }
//     onLogoutClick();
//   }, [screenSize, onLogoutClick]);

//   const isActive = useCallback((path) => {
//     return (
//       location.pathname === path ||
//       (path === "/wallet" && location.pathname === "/add-funds")
//     );
//   }, [location.pathname]);

//   const toggleSidebar = () => {
//     if (screenSize === "desktop") {
//       setIsCollapsed(!isCollapsed);
//     } else {
//       setIsOpen(!isOpen);
//     }
//   };

//   // Determine sidebar width
//   const getSidebarWidth = () => {
//     if (screenSize === "desktop") {
//       return isCollapsed ? "w-20" : "w-64";
//     }
//     return "w-72";
//   };

//   // Determine if sidebar should show
//   const shouldShowSidebar = () => {
//     if (screenSize === "desktop") return true;
//     return isOpen;
//   };

//   return (
//     <>
//       {/* Mobile/Tablet Menu Button - Shows when sidebar is closed */}
//       {screenSize !== "desktop" && !isOpen && (
//         <button
//           onClick={() => setIsOpen(true)}
//           className="fixed top-3 left-3 z-50 p-2.5 rounded-xl text-white   transition-colors"
//           aria-label="Open menu"
//         >
//           <HiOutlineMenu size={22} />
//         </button>
//       )}

//       {/* Overlay - Shows on mobile/tablet when sidebar is open */}
//       {screenSize !== "desktop" && isOpen && (
//         <div
//           className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
//           onClick={() => setIsOpen(false)}
//         />
//       )}

//       {/* Sidebar */}
//       <aside
//         className={`
//           fixed top-0 left-0 h-screen flex flex-col z-50
//           transition-all duration-300 ease-in-out
//           bg-[#085056] shadow-2xl
//           ${getSidebarWidth()}
//           ${screenSize === "desktop" 
//             ? "relative translate-x-0" 
//             : isOpen 
//               ? "translate-x-0" 
//               : "-translate-x-full"
//           }
//         `}
//       >
//         {/* Header */}
//         <div className="flex items-center justify-between h-16 px-4 border-b border-white/10 flex-shrink-0">
//           {/* Logo */}
//           <div className={`flex items-center ${(screenSize === "desktop" && isCollapsed) ? "justify-center w-full" : ""}`}>
//             {(screenSize !== "desktop" || !isCollapsed) ? (
//               <img
//                 src={logo}
//                 alt="Jaimax Logo"
//                 className="h-12 object-contain"
//               />
//             ) : (
//               <img
//                 src={logo2}
//                 alt="Jaimax Logo"
//                 className="h-8 object-contain"
//               />
//             )}
//           </div>

//           {/* Toggle/Close Button */}
//           <button
//             onClick={toggleSidebar}
//             className={`p-2 rounded-lg text-white/70 hover:text-white transition-colors ${
//               (screenSize === "desktop" && isCollapsed) ? "absolute -right-2" : ""
//             }`}
//             aria-label={isOpen ? "Close menu" : "Open menu"}
//           >
//             {screenSize === "desktop" ? (
//               isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />
//             ) : (
//               <HiOutlineX size={20} />
//             )}
//           </button>
//         </div>

//         {/* Navigation */}
//         <nav 
//           className="flex-1 overflow-y-auto p-3"
//           style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
//         >
//           {/* Menu Label */}
//           {(screenSize !== "desktop" || !isCollapsed) && (
//             <p className="text-[10px] text-white/40 uppercase font-semibold mb-3 px-3 tracking-widest">
//               MEnu
//             </p>
//           )}

//           <div className="space-y-1">
//             {navItems.map((item) => {
//               const IconComponent = item.icon;
//               const active = isActive(item.path);
//               const showLabel = screenSize !== "desktop" || !isCollapsed;

//               return (
//                 <button
//                   key={item.name}
//                   onClick={() => handleNavClick(item)}
//                   className={`
//                     w-full relative flex items-center font-medium 
//                     transition-all duration-200 rounded-xl group
//                     ${showLabel ? "px-4 py-3 justify-start" : "p-3 justify-center"}
//                     ${active
//                       ? "text-white bg-white/20"
//                       : "text-white hover:text-white hover:bg-white/10"
//                     }
//                   `}
//                 >
//                   {/* Active indicator */}
//                   {active && (
//                     <span 
//                       className={`absolute bg-white rounded-full ${
//                         showLabel 
//                           ? "left-0 top-1/2 -translate-y-1/2 h-8 w-1" 
//                           : "bottom-1 left-1/2 -translate-x-1/2 h-1 w-6"
//                       }`}
//                     />
//                   )}

//                   {/* Icon */}
//                   <span className={`flex-shrink-0 ${showLabel ? "text-xl" : "text-2xl"}`}>
//                     <IconComponent size={item.size || 20} />
//                   </span>

//                   {/* Label */}
//                   {showLabel && (
//                     <span className="ml-3 text-sm font-medium truncate">
//                       {item.name}
//                     </span>
//                   )}

//                   {/* Tooltip - Desktop collapsed only */}
//                   {screenSize === "desktop" && isCollapsed && (
//                     <div className="absolute left-full ml-3 px-3 py-2 bg-[#085056] border border-white/20 text-white text-sm font-medium rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-[60] shadow-xl">
//                       {item.name}
//                       <div className="absolute right-full top-1/2 -translate-y-1/2 border-8 border-transparent border-r-[#085056]" />
//                     </div>
//                   )}
//                 </button>
//               );
//             })}
//           </div>
//         </nav>

//         {/* Logout Section */}
//         <div className="p-3 border-t border-white/10 flex-shrink-0">
//           <button
//             onClick={handleLogoutClick}
//             className={`
//               w-full flex items-center font-medium rounded-xl
//               text-white/60 hover:text-white hover:bg-white/10
//               transition-all duration-200 group relative
//               ${(screenSize !== "desktop" || !isCollapsed) ? "px-4 py-3 justify-start" : "p-3 justify-center"}
//             `}
//           >
//             <HiOutlineLogout className={`flex-shrink-0 ${(screenSize !== "desktop" || !isCollapsed) ? "text-xl" : "text-2xl"}`} />
            
//             {(screenSize !== "desktop" || !isCollapsed) && (
//               <span className="ml-3 text-sm font-medium">Logout</span>
//             )}

//             {/* Tooltip - Desktop collapsed only */}
//             {screenSize === "desktop" && isCollapsed && (
//               <div className="absolute left-full ml-3 px-3 py-2 bg-[#085056] border border-white/20 text-white text-sm font-medium rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-[60] shadow-xl">
//                 Logout
//               </div>
//             )}
//           </button>
//         </div>

//       </aside>

//       {/* Hide scrollbar styles */}
//       <style>{`
//         nav::-webkit-scrollbar {
//           display: none;
//         }
//       `}</style>
//     </>
//   );
// }

// export default Sidebar;


import { useLocation, useNavigate } from "react-router-dom";
import {
  HiOutlineViewGrid,
  HiOutlineChartBar,
  HiOutlineShieldCheck,
  HiOutlineIdentification,
  HiOutlineCash,
  HiOutlineChatAlt2,
  HiOutlineLogout,
  HiOutlineVideoCamera,
  HiOutlineCreditCard,
  HiOutlineX,
} from "react-icons/hi";
import { useCallback } from "react";
import { Wallet, UserRound, ChevronLeft, ChevronRight } from "lucide-react";
import logo from "../../assets/Images/jaimaxlogo1.svg";
import logo2 from "../../assets/welcomeProfile.svg";

const navItems = [
  { name: "Dashboard", path: "/dashboard", icon: HiOutlineViewGrid },
  { name: "Wallet", path: "/wallet", icon: Wallet, size: 18 },
  { name: "Buy History", path: "/buy-history", icon: HiOutlineChartBar },
  { name: "J-Wallet", path: "/jwallet", icon: HiOutlineCreditCard },
  { name: "Withdrawal", path: "/withdrawal", icon: HiOutlineCash },
  { name: "Profile", path: "/profile", icon: UserRound, size: 18 },
  { name: "KYC", path: "/kyc-information", icon: HiOutlineIdentification },
  { name: "Support", path: "/support", icon: HiOutlineChatAlt2 },
  { name: "Jaimax-Hub", path: "/meetings", icon: HiOutlineVideoCamera },
  { name: "Security", path: "/security", icon: HiOutlineShieldCheck },
];

function Sidebar({
  isOpen,
  isCollapsed,
  isMobile,
  onClose,
  onToggleCollapse,
  onLogoutClick,
}) {
  const location = useLocation();
  const navigate = useNavigate();

  // Handle navigation click
  const handleNavClick = useCallback(
    (item) => {
      if (item.path && location.pathname !== item.path) {
        navigate(item.path);
      }
      // Close sidebar on mobile after navigation
      if (isMobile) {
        onClose();
      }
    },
    [isMobile, location.pathname, navigate, onClose]
  );

  // Handle logout click
  const handleLogoutClick = useCallback(() => {
    onLogoutClick();
  }, [onLogoutClick]);

  // Check if route is active
  const isActive = useCallback(
    (path) => {
      return (
        location.pathname === path ||
        (path === "/wallet" && location.pathname === "/add-funds") ||
        location.pathname.startsWith(path + "/")
      );
    },
    [location.pathname]
  );

  // Determine sidebar width
  const getSidebarClasses = () => {
    if (isMobile) {
      return `w-72 ${isOpen ? "translate-x-0" : "-translate-x-full"}`;
    }
    return `${isCollapsed ? "w-20" : "w-64"} translate-x-0`;
  };

  // Check if labels should be shown
  const showLabels = isMobile || !isCollapsed;

  return (
    <aside
      className={`
        fixed top-0 left-0 h-screen flex flex-col z-50
        transition-all duration-300 ease-in-out
        bg-[#085056] shadow-2xl
        ${getSidebarClasses()}
      `}
    >
      {/* Header */}
      <div className="flex items-center justify-between h-16 px-4 border-b border-white/10 flex-shrink-0">
        {/* Logo */}
        <div
          className={`flex items-center ${
            !isMobile && isCollapsed ? "justify-center w-full" : ""
          }`}
        >
          {showLabels ? (
            <img src={logo} alt="Jaimax Logo" className="h-12 object-contain" />
          ) : (
            <img src={logo2} alt="Jaimax Logo" className="h-8 object-contain" />
          )}
        </div>

        {/* Toggle/Close Button */}
        {isMobile ? (
          // Mobile: Close button
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Close menu"
          >
            <HiOutlineX size={22} />
          </button>
        ) : (
          // Desktop: Collapse toggle button
          <button
            onClick={onToggleCollapse}
            className={`p-2 rounded-lg text-white/70   transition-colors
              ${isCollapsed ? "absolute -right-1 top-5  rounded-full" : ""}
            `}
            aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {isCollapsed ? (
              <ChevronRight size={18} />
            ) : (
              <ChevronLeft size={18} />
            )}
          </button>
        )}
      </div>

      {/* Navigation */}
      <nav
        className="flex-1 overflow-y-auto p-3"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {/* Menu Label */}
        {showLabels && (
          <p className="text-[10px] text-white/40 uppercase font-semibold mb-3 px-3 tracking-widest">
            Menu
          </p>
        )}

        <div className="space-y-1">
          {navItems.map((item) => {
            const IconComponent = item.icon;
            const active = isActive(item.path);

            return (
              <button
                key={item.name}
                onClick={() => handleNavClick(item)}
                className={`
                  w-full relative flex items-center font-medium 
                  transition-all duration-200 rounded-xl group
                  ${showLabels ? "px-4 py-3 justify-start" : "p-3 justify-center"}
                  ${
                    active
                      ? "text-white bg-white/20"
                      : "text-white/70 hover:text-white hover:bg-white/10"
                  }
                `}
              >
                {/* Active indicator */}
                {active && (
                  <span
                    className={`absolute bg-white rounded-full ${
                      showLabels
                        ? "left-0 top-1/2 -translate-y-1/2 h-8 w-1"
                        : "bottom-1 left-1/2 -translate-x-1/2 h-1 w-6"
                    }`}
                  />
                )}

                {/* Icon */}
                <span
                  className={`flex-shrink-0 ${showLabels ? "text-xl" : "text-2xl"}`}
                >
                  <IconComponent size={item.size || 20} />
                </span>

                {/* Label */}
                {showLabels && (
                  <span className="ml-3 text-sm font-medium truncate">
                    {item.name}
                  </span>
                )}

                {/* Tooltip - Desktop collapsed only */}
                {!isMobile && isCollapsed && (
                  <div
                    className="absolute left-full ml-3 px-3 py-2 bg-[#085056] border border-white/20 
                               text-white text-sm font-medium rounded-lg opacity-0 invisible 
                               group-hover:opacity-100 group-hover:visible transition-all duration-200 
                               whitespace-nowrap z-[60] shadow-xl pointer-events-none"
                  >
                    {item.name}
                    <div className="absolute right-full top-1/2 -translate-y-1/2 border-8 border-transparent border-r-[#085056]" />
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </nav>

      {/* Logout Section */}
      <div className="p-3 border-t border-white/10 flex-shrink-0">
        <button
          onClick={handleLogoutClick}
          className={`
            w-full flex items-center font-medium rounded-xl
            text-white/60 hover:text-white hover:bg-red-500/20
            transition-all duration-200 group relative
            ${showLabels ? "px-4 py-3 justify-start" : "p-3 justify-center"}
          `}
        >
          <HiOutlineLogout
            className={`flex-shrink-0 ${showLabels ? "text-xl" : "text-2xl"}`}
          />

          {showLabels && (
            <span className="ml-3 text-sm font-medium">Logout</span>
          )}

          {/* Tooltip - Desktop collapsed only */}
          {!isMobile && isCollapsed && (
            <div
              className="absolute left-full ml-3 px-3 py-2 bg-[#085056] border border-white/20 
                         text-white text-sm font-medium rounded-lg opacity-0 invisible 
                         group-hover:opacity-100 group-hover:visible transition-all duration-200 
                         whitespace-nowrap z-[60] shadow-xl pointer-events-none"
            >
              Logout
            </div>
          )}
        </button>
      </div>

      {/* Hide scrollbar styles */}
      <style>{`
        nav::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </aside>
  );
}

export default Sidebar;