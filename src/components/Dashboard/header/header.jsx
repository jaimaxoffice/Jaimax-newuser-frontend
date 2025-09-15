

import React, { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { useLocation, Link } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { useUserDataQuery } from '../../Dashboard/pages/dashBoard/DashboardApliSlice';
import Cookies from "js-cookie";

// Keep static data outside component
const routeTitles = {
  "/": "Dashboard",
  "/wallet": "Wallet",
  "/my-team": "My Total Team",
  "/shareholders": "Share Holders",
  "/buy-history": "Buy History",
  "/security": "Security",
  "/profile": "Profile",
  "/kyc": "kyc-information",
  "/withdrawal": "With Drawal",
  "/support": "Support",
  "/logout": "Logout",
};

// Memoized SVG components to avoid recreating them on every render
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
    className="lucide lucide-user"
  >
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
));

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
    className="lucide lucide-log-out"
  >
    <path d="m16 17 5-5-5-5" />
    <path d="M21 12H9" />
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
  </svg>
));

// Memoized dropdown menu component
const DropdownMenu = React.memo(({ onClose, onLogout }) => (
  <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg border border-teal-100 transition-all duration-200 z-50">
    <ul className="py-2 text-sm text-gray-700">
      <li>
        <Link
          to="/profile"
          onClick={onClose}
          className="flex items-center gap-2 px-4 py-2 hover:bg-teal-50 cursor-pointer"
        >
          <ProfileIcon />
          <span>Profile</span>
        </Link>
      </li>
      <li>
        <Link
          to="#"
          onClick={onLogout}
          className="flex items-center gap-2 px-4 py-2 hover:bg-teal-50 cursor-pointer"
        >
          <LogoutIcon />
          <span>Logout</span>
        </Link>
      </li>
    </ul>
  </div>
));

DropdownMenu.displayName = "DropdownMenu";
ProfileIcon.displayName = "ProfileIcon";
LogoutIcon.displayName = "LogoutIcon";

// Main component with React.memo
const Header = React.memo(() => {
  const location = useLocation();
  const title = useMemo(() => routeTitles[location.pathname] || "Dashboard", [location.pathname]);
  
  const { data: userData, isLoading, error } = useUserDataQuery();
  
  // Parse cookies once and memoize the result
  const cookieUserData = useMemo(() => {
    try {
      const userData = Cookies.get("userData");
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      console.error("Error parsing user data from cookies:", error);
      return null;
    }
  }, []);
  
  const id = useMemo(() => cookieUserData?.username, [cookieUserData]);
  const mail = useMemo(() => cookieUserData?.email, [cookieUserData]);
  
  // Memoize profile image
  const profileImage = useMemo(() => userData?.data?.profile, [userData?.data?.profile]);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Memoize event handlers
  const handleAvatarClick = useCallback(() => {
    setIsDropdownOpen(prev => !prev);
  }, []);

  const handleCloseDropdown = useCallback(() => {
    setIsDropdownOpen(false);
  }, []);

  const handleLogout = useCallback(() => {
    Cookies.remove("userData");
    Cookies.remove("token");
    window.location.href = "/";
  }, []);

  // Memoize the click outside handler
  const handleClickOutside = useCallback((event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  }, []);

  // Optimize useEffect with proper dependencies
  useEffect(() => {
    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [isDropdownOpen, handleClickOutside]);

  // Loading state component
  if (isLoading) {
    return (
      <header className="relative p-4 rounded-xl text-white border-r border-teal-600/20 bg-gradient-to-br from-[#085358] via-[#085358] to-[#085358] sm:px-6 lg:px-8">
        <h1 className="invisible md:visible text-xl text-start sm:text-2xl md:text-3xl font-extrabold">
          {title}
        </h1>
        <div className="absolute top-3 right-2 sm:right-3 flex items-center space-x-2">
          <div className="flex flex-col text-right">
            <div className="h-4 w-20 bg-teal-300/30 rounded animate-pulse"></div>
            <div className="h-3 w-24 bg-teal-300/20 rounded animate-pulse mt-1"></div>
          </div>
          <div className="w-10 h-10 rounded-full bg-teal-300/30 animate-pulse"></div>
        </div>
      </header>
    );
  }

  // Error state component
  if (error) {
    return (
      <header className="relative p-4 rounded-xl text-white border-r border-teal-600/20 bg-gradient-to-br from-[#085358] via-[#085358] to-[#085358] sm:px-6 lg:px-8">
        <h1 className="invisible md:visible text-xl text-start sm:text-2xl md:text-3xl font-extrabold">
          {title}
        </h1>
        <div className="absolute top-3 right-2 sm:right-3 flex items-center space-x-2">
          <div className="flex flex-col text-right">
            <p className="text-sm font-semibold">{id}</p>
            <p className="text-xs text-gray-300">{mail}</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-red-300/30 flex items-center justify-center">
            <FaUser className="text-red-600 text-xl" />
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="relative p-4 rounded-xl text-white border-r border-teal-600/20 bg-gradient-to-br from-[#085358] via-[#085358] to-[#085358] sm:px-6 lg:px-8">
      {/* Title - Visible on medium screens and up */}
      <h1 className="invisible md:visible text-xl text-start sm:text-2xl md:text-3xl font-extrabold">
        {title}
      </h1>

      {/* User Info and Avatar Section */}
      <div className="absolute top-3 right-2 sm:right-3 flex items-center space-x-2">
        <div className="flex flex-col text-right">
          <p className="text-sm font-semibold">{id}</p>
          <p className="text-xs text-gray-300">{mail}</p>
        </div>

        {/* Avatar and Dropdown Container */}
        <div className="relative group" ref={dropdownRef}>
          {/* Avatar - Clickable to toggle dropdown */}
          <div
            className="w-10 h-10 rounded-full overflow-hidden border-2 border-teal-100 cursor-pointer"
            onClick={handleAvatarClick}
          >
            {profileImage ? (
              <img
                src={profileImage}
                alt="Profile"
                className=""
                loading="lazy"
              />
            ) : (
              <div className="w-full h-full bg-teal-50 flex items-center justify-center">
                <FaUser className="text-teal-600 text-xl" />
              </div>
            )}
          </div>

          {/* Dropdown Menu - Conditionally rendered */}
          {isDropdownOpen && (
            <DropdownMenu 
              onClose={handleCloseDropdown} 
              onLogout={handleLogout} 
            />
          )}
        </div>
      </div>
    </header>
  );
});

// Add display name for debugging
Header.displayName = "Header";

export default Header;