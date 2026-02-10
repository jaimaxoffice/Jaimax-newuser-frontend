

// import React, { useState, useRef, useEffect, useCallback, useMemo } from "react";
// import { useLocation, Link } from "react-router-dom";
// import { FaUser } from "react-icons/fa";
// import { useUserDataQuery } from '../../components/Dashboard/pages/dashBoard/DashboardApliSlice';
// import Cookies from "js-cookie";

// // Keep static data outside component
// const routeTitles = {
//   "/": "Dashboard",
//   "/wallet": "Wallet",
//   "/my-team": "My Total Team",
//   "/shareholders": "Share Holders",
//   "/buy-history": "Buy History",
//   "/security": "Security",
//   "/profile": "Profile",
//   "/kyc": "kyc-information",
//   "/withdrawal": "With Drawal",
//   "/support": "Support",
//   "/logout": "Logout",
// };

// // Memoized SVG components to avoid recreating them on every render
// const ProfileIcon = React.memo(() => (
//   <svg
//     xmlns="http://www.w3.org/2000/svg"
//     width="20"
//     height="20"
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke="currentColor"
//     strokeWidth="2"
//     strokeLinecap="round"
//     strokeLinejoin="round"
//     className="lucide lucide-user"
//   >
//     <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
//     <circle cx="12" cy="7" r="4" />
//   </svg>
// ));

// const LogoutIcon = React.memo(() => (
//   <svg
//     xmlns="http://www.w3.org/2000/svg"
//     width="20"
//     height="20"
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke="currentColor"
//     strokeWidth="2"
//     strokeLinecap="round"
//     strokeLinejoin="round"
//     className="lucide lucide-log-out"
//   >
//     <path d="m16 17 5-5-5-5" />
//     <path d="M21 12H9" />
//     <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
//   </svg>
// ));

// // Memoized dropdown menu component
// const DropdownMenu = React.memo(({ onClose, onLogout }) => (
//   <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg border border-teal-100 transition-all duration-200 z-50">
//     <ul className="py-2 text-sm text-gray-700">
//       <li>
//         <Link
//           to="/profile"
//           onClick={onClose}
//           className="flex items-center gap-2 px-4 py-2 hover:bg-teal-50 cursor-pointer"
//         >
//           <ProfileIcon />
//           <span>Profile</span>
//         </Link>
//       </li>
//       <li>
//         <Link
//           to="#"
//           onClick={onLogout}
//           className="flex items-center gap-2 px-4 py-2 hover:bg-teal-50 cursor-pointer"
//         >
//           <LogoutIcon />
//           <span>Logout</span>
//         </Link>
//       </li>
//     </ul>
//   </div>
// ));

// DropdownMenu.displayName = "DropdownMenu";
// ProfileIcon.displayName = "ProfileIcon";
// LogoutIcon.displayName = "LogoutIcon";

// // Main component with React.memo
// const Header = React.memo(() => {
//   const location = useLocation();
//   const title = useMemo(() => routeTitles[location.pathname] || "Dashboard", [location.pathname]);
  
//   const { data: userData, isLoading, error } = useUserDataQuery();
  
//   // Parse cookies once and memoize the result
//   const cookieUserData = useMemo(() => {
//     try {
//       const userData = Cookies.get("userData");
//       return userData ? JSON.parse(userData) : null;
//     } catch (error) {
//       console.error("Error parsing user data from cookies:", error);
//       return null;
//     }
//   }, []);
  
//   const id = useMemo(() => cookieUserData?.username, [cookieUserData]);
//   const mail = useMemo(() => cookieUserData?.email, [cookieUserData]);
  
//   // Memoize profile image
//   const profileImage = useMemo(() => userData?.data?.profile, [userData?.data?.profile]);

//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const dropdownRef = useRef(null);

//   // Memoize event handlers
//   const handleAvatarClick = useCallback(() => {
//     setIsDropdownOpen(prev => !prev);
//   }, []);

//   const handleCloseDropdown = useCallback(() => {
//     setIsDropdownOpen(false);
//   }, []);

//   const handleLogout = useCallback(() => {
//     Cookies.remove("userData");
//     Cookies.remove("token");
//     window.location.href = "/";
//   }, []);

//   // Memoize the click outside handler
//   const handleClickOutside = useCallback((event) => {
//     if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//       setIsDropdownOpen(false);
//     }
//   }, []);

//   // Optimize useEffect with proper dependencies
//   useEffect(() => {
//     if (isDropdownOpen) {
//       document.addEventListener("mousedown", handleClickOutside);
//       return () => {
//         document.removeEventListener("mousedown", handleClickOutside);
//       };
//     }
//   }, [isDropdownOpen, handleClickOutside]);

//   // Loading state component
//   if (isLoading) {
//     return (
//       <header className="relative p-4 rounded-xl text-white border-r border-teal-600/20 bg-gradient-to-br from-[#085358] via-[#085358] to-[#085358] sm:px-6 lg:px-8">
//         <h1 className="invisible md:visible text-xl text-start sm:text-2xl md:text-3xl font-extrabold">
//           {title}
//         </h1>
//         <div className="absolute top-3 right-2 sm:right-3 flex items-center space-x-2">
//           <div className="flex flex-col text-right">
//             <div className="h-4 w-20 bg-teal-300/30 rounded animate-pulse"></div>
//             <div className="h-3 w-24 bg-teal-300/20 rounded animate-pulse mt-1"></div>
//           </div>
//           <div className="w-10 h-10 rounded-full bg-teal-300/30 animate-pulse"></div>
//         </div>
//       </header>
//     );
//   }

//   // Error state component
//   if (error) {
//     return (
//       <header className="relative p-4 rounded-xl text-white border-r border-teal-600/20 bg-gradient-to-br from-[#085358] via-[#085358] to-[#085358] sm:px-6 lg:px-8">
//         <h1 className="invisible md:visible text-xl text-start sm:text-2xl md:text-3xl font-extrabold">
//           {title}
//         </h1>
//         <div className="absolute top-3 right-2 sm:right-3 flex items-center space-x-2">
//           <div className="flex flex-col text-right">
//             <p className="text-sm font-semibold">{id}</p>
//             <p className="text-xs text-gray-300">{mail}</p>
//           </div>
//           <div className="w-10 h-10 rounded-full bg-red-300/30 flex items-center justify-center">
//             <FaUser className="text-red-600 text-xl" />
//           </div>
//         </div>
//       </header>
//     );
//   }

//   return (
//     <header className="relative p-4 rounded-xl text-white border-r border-teal-600/20 bg-gradient-to-br from-[#085358] via-[#085358] to-[#085358] sm:px-6 lg:px-8">
//       {/* Title - Visible on medium screens and up */}
//       <h1 className="invisible md:visible text-xl text-start sm:text-2xl md:text-3xl font-extrabold">
//         {title}
//       </h1>

//       {/* User Info and Avatar Section */}
//       <div className="absolute top-3 right-2 sm:right-3 flex items-center space-x-2">
//         <div className="flex flex-col text-right">
//           <p className="text-sm font-semibold">{id}</p>
//           <p className="text-xs text-gray-300">{mail}</p>
//         </div>

//         {/* Avatar and Dropdown Container */}
//         <div className="relative group" ref={dropdownRef}>
//           {/* Avatar - Clickable to toggle dropdown */}
//           <div
//             className="w-10 h-10 rounded-full overflow-hidden border-2 border-teal-100 cursor-pointer"
//             onClick={handleAvatarClick}
//           >
//             {profileImage ? (
//               <img
//                 src={profileImage}
//                 alt="Profile"
//                 className=""
//                 loading="lazy"
//               />
//             ) : (
//               <div className="w-full h-full bg-teal-50 flex items-center justify-center"  
//               >
//                 <FaUser className="text-teal-600 text-xl" />
//               </div>
//             )}
//           </div>

//           {/* Dropdown Menu - Conditionally rendered */}
//           {isDropdownOpen && (
//             <DropdownMenu 
//               onClose={handleCloseDropdown} 
//               onLogout={handleLogout} 
//             />
//           )}
//         </div>
//       </div>
//     </header>
//   );
// });

// // Add display name for debugging
// Header.displayName = "Header";

// export default Header;

import React, { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { useLocation, Link } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import { useUserDataQuery } from "../../components/Dashboard/pages/dashBoard/DashboardApliSlice";
import Cookies from "js-cookie";

// Route titles mapping
const routeTitles = {
  "/dashboard": "Dashboard",
  "/wallet": "Wallet",
  "/add-funds": "Add Funds",
  "/my-team": "My Total Team",
  "/shareholders": "Share Holders",
  "/buy-history": "Buy History",
  "/security": "Security",
  "/profile": "Profile",
  "/kyc-information": "KYC",
  "/withdrawal": "Withdrawal",
  "/support": "Support",
  "/meetings": "Jaimax Hub",
  "/jwallet": "J-Wallet",
  "/consents": "Consents",
  "/dashboardapis": "Dashboard APIs",
  "/goa-vacation": "Goa Vacation",
};

// Memoized SVG components
const ProfileIcon = React.memo(() => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
));
ProfileIcon.displayName = "ProfileIcon";

const LogoutIcon = React.memo(() => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="m16 17 5-5-5-5" />
    <path d="M21 12H9" />
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
  </svg>
));
LogoutIcon.displayName = "LogoutIcon";

// Memoized dropdown menu component
const DropdownMenu = React.memo(({ onClose, onLogout }) => (
  <div
    className="absolute right-0 mt-2 w-44 bg-white rounded-xl shadow-xl border border-gray-100 
               overflow-hidden z-50 animate-fadeIn"
  >
    <div className="py-1">
      <Link
        to="/profile"
        onClick={onClose}
        className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-teal-50 
                   hover:text-teal-700 transition-colors"
      >
        <ProfileIcon />
        <span className="font-medium">Profile</span>
      </Link>
      <button
        onClick={onLogout}
        className="flex items-center gap-3 w-full px-4 py-3 text-red-600 hover:bg-red-50 
                   transition-colors"
      >
        <LogoutIcon />
        <span className="font-medium">Logout</span>
      </button>
    </div>
  </div>
));
DropdownMenu.displayName = "DropdownMenu";

// Main Header Component
const Header = React.memo(({ onMenuClick, isSidebarOpen, isMobile }) => {
  const location = useLocation();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Get page title
  const title = useMemo(() => {
    if (routeTitles[location.pathname]) {
      return routeTitles[location.pathname];
    }
    const matchingPath = Object.keys(routeTitles).find((path) =>
      location.pathname.startsWith(path)
    );
    return matchingPath ? routeTitles[matchingPath] : "Dashboard";
  }, [location.pathname]);

  // Get user data from API
  const { data: userData, isLoading } = useUserDataQuery();

  // Parse cookies - Get all user data from cookies
  const cookieData = useMemo(() => {
    try {
      // Get userData cookie (might contain username, email, etc.)
      const userDataCookie = Cookies.get("userData");
      const parsedUserData = userDataCookie ? JSON.parse(userDataCookie) : {};
      
      // Get separate email cookie (fallback)
      const emailCookie = Cookies.get("email");
      
      return {
        userData: parsedUserData,
        emailCookie: emailCookie
      };
    } catch (error) {
      console.error("Error parsing cookies:", error);
      return {
        userData: {},
        emailCookie: null
      };
    }
  }, []);

  // Extract username - Priority: cookie userData > API data > fallback
  const username = useMemo(() => {
    return (
      cookieData.userData?.username ||
      cookieData.userData?.name ||
      userData?.data?.username ||
      userData?.data?.name ||
      "User"
    );
  }, [cookieData, userData]);

  // Extract email - Priority: cookie userData > separate email cookie > API data > fallback
  const email = useMemo(() => {
    return (
      cookieData.userData?.email ||
      cookieData.emailCookie ||
      userData?.data?.email ||
      ""
    );
  }, [cookieData, userData]);

  // Get profile image from API
  const profileImage = useMemo(() => {
    return userData?.data?.profile || userData?.data?.profileImage || userData?.data?.avatar;
  }, [userData]);

  // Event handlers
  const handleAvatarClick = useCallback(() => {
    setIsDropdownOpen((prev) => !prev);
  }, []);

  const handleCloseDropdown = useCallback(() => {
    setIsDropdownOpen(false);
  }, []);

  const handleLogout = useCallback(() => {
    Cookies.remove("userData");
    Cookies.remove("token");
    Cookies.remove("email");
    Cookies.remove("rememberMe");
    sessionStorage.removeItem("isPinVerified");
    window.location.href = "/";
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isDropdownOpen]);

  // Debug: Log the data sources (remove in production)
 

  return (
    <header
      className="relative flex items-center justify-between p-3 sm:p-4 rounded-xl text-white 
                 bg-gradient-to-br from-[#085358] via-[#085358] to-[#085358]
                 border border-teal-600/20 shadow-lg min-h-[60px] sm:min-h-[72px]"
    >
      {/* Left Section - Hamburger & Title */}
      <div className="flex items-center gap-2 sm:gap-4">
        {/* Hamburger Menu Button - Only visible on mobile/tablet */}
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 -ml-1 rounded-lg text-white/80 hover:text-white 
                     hover:bg-white/10 transition-colors flex-shrink-0"
          aria-label={isSidebarOpen ? "Close menu" : "Open menu"}
        >
          {isSidebarOpen ? (
            <HiOutlineX size={24} />
          ) : (
            <HiOutlineMenu size={24} />
          )}
        </button>

        {/* Page Title - HIDDEN on small screens, visible from md and up */}
        <h1 className="hidden md:block text-xl lg:text-xl xl:text-2xl font-bold truncate">
          {title}
        </h1>
      </div>

      {/* Right Section - User Info */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* User Info */}
        <div className="flex flex-col text-right">
          {/* Username - Always visible */}
          <p className="text-xs sm:text-sm font-semibold truncate max-w-[100px] sm:max-w-[150px] md:max-w-[180px]">
            {username}
          </p>
          
          {/* Email - Hidden on very small screens */}
          {email && (
            <p className="text-[10px] sm:text-xs text-white/60 truncate max-w-[100px] sm:max-w-[150px] md:max-w-[180px]">
              {email}
            </p>
          )}
        </div>

        {/* Avatar and Dropdown */}
<div className="relative" ref={dropdownRef}>
  <button
    onClick={handleAvatarClick}
    className="relative w-9 h-9 sm:w-10 sm:h-10 md:w-11 md:h-11
               rounded-full overflow-hidden
               border-2 border-white/30 hover:border-white/60 transition-colors
               focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2
               focus:ring-offset-[#085358] flex-shrink-0"
    aria-label="User menu"
  >
    {isLoading ? (
      <div className="w-full h-full bg-teal-300/30 animate-pulse" />
    ) : profileImage ? (
      <img
        src={profileImage}
        alt="Profile"
        className="w-full h-full object-cover"
        loading="lazy"
      />
    ) : (
      <div className="w-full h-full bg-teal-600 flex items-center justify-center">
        <FaUser className="text-white text-sm sm:text-base md:text-lg" />
      </div>
    )}
  </button>

  {/* Online indicator (outside button, but click-through) */}
  <span
    className="absolute bottom-1.5 right-1 translate-x-1/4 translate-y-1/4
               w-2.5 h-2.5 sm:w-3 sm:h-3
               bg-green-500 border-2 border-[#085358] rounded-full
               z-50 pointer-events-none"
  />

  {isDropdownOpen && (
    <div className="absolute right-0 mt-2 z-50">
      <DropdownMenu onClose={handleCloseDropdown} onLogout={handleLogout} />
    </div>
  )}
</div>

      </div>
    </header>
  );
});

Header.displayName = "Header";

export default Header;