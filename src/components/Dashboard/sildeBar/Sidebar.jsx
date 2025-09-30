import { useLocation, useNavigate } from "react-router-dom";
import { Sling as Hamburger } from "hamburger-react";
import {
  HiOutlineViewGrid,
  HiOutlineClipboardList,
  HiOutlineCalendar,
  HiOutlineChartBar,
  HiOutlineShieldCheck,
  HiOutlineUser,
  HiOutlineIdentification,
  HiOutlineCash,
  HiOutlineChatAlt2,
  HiOutlineLogout,
  HiOutlineClock,
  HiOutlineVideoCamera,
  HiOutlineCreditCard,
} from "react-icons/hi";
import { useState, useEffect } from "react";
import { FaHandshake } from "react-icons/fa";
import { TreePalm,Vault  } from "lucide-react";
import logo from "../../../assets/Images/jaimaxlogo1.svg";

const navItems = [
  { name: "Dashboard", path: "/dashboard", icon: <HiOutlineViewGrid /> },
  { name: "Wallet", path: "/wallet", icon: <HiOutlineClipboardList /> },
  { name: "My Total Team", path: "/my-team", icon: <HiOutlineCalendar /> },
  // { name: "Share Holders", path: "/shareholders", icon: <FaHandshake /> },
  // { name: "Todays Earnings", path: "/earnings", icon: <HiOutlineClock /> },
  { name: "Buy History", path: "/buy-history", icon: <HiOutlineChartBar /> },
  { name: "Security", path: "/security", icon: <HiOutlineShieldCheck /> },
  { name: "Profile", path: "/profile", icon: <HiOutlineUser /> },
  { name: "Goa-Gateway", path: "/goa-vacation", icon: <TreePalm size={16}/> },
  { name: "Locked Superbonus", path: "/locked-superbonus", icon: <Vault  size={16}/> },

  { name: "J-Wallet", path: "/jwallet", icon: <HiOutlineCreditCard /> },
  { name: "KYC", path: "/kyc-information", icon: <HiOutlineIdentification /> },
  { name: "Withdrawal", path: "/withdrawal", icon: <HiOutlineCash /> },
  { name: "Support", path: "/support", icon: <HiOutlineChatAlt2 /> },
  { name: "Jaimax-Hub", path: "/meetings", icon: <HiOutlineVideoCamera /> },
  { name: "Logout", icon: <HiOutlineLogout /> },
];

function Sidebar({ onLogoutClick }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      // Auto-open on desktop, auto-close on mobile
      setIsOpen(width >= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleNavClick = (item) => {
    if (isMobile) setIsOpen(false);
    if (item.name === "Logout") {
      onLogoutClick();
    } else if (item.path && location.pathname !== item.path) {
      navigate(item.path);
    }
  };

  return (
    <>
      {/* Mobile hamburger button - only show on mobile when sidebar is closed */}
      {isMobile && !isOpen && (
        <div className="fixed -top-1 left-4 z-50 rounded-lg p-2 lg">
          <Hamburger
            toggled={isOpen}
            toggle={setIsOpen}
            size={20}
            color="#ffffff"
          />
        </div>
      )}

      {/* Mobile overlay */}
      {isMobile && isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed top-0 left-0 h-screen flex flex-col z-40
          transition-all duration-300 ease-in-out shadow-lg border-r border-teal-600/20
          bg-gradient-to-br from-[#085358] via-[#085358] to-[#085358]
          ${
            isMobile
              ? `${isOpen ? "translate-x-0" : "-translate-x-full"} w-72`
              : `${isOpen ? "w-64" : "w-20"}`
          }
          md:relative md:translate-x-0
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-teal-600/30 bg-gradient-to-r from-teal-700/20 to-transparent">
          <div
            className={`flex items-center ${
              !isOpen && !isMobile ? "justify-center w-full" : ""
            }`}
          >
            {isOpen ? (
              <img src={logo} alt="Logo" className="" />
            ) : (
              !isMobile && (
                <div className="w-10 h-10 bg-teal-600/20 rounded-lg flex items-center justify-center"></div>
              )
            )}
          </div>

          {/* Hamburger menu */}
          <div
            className={`${
              !isOpen && !isMobile ? "absolute left-1/2 -translate-x-1/2" : ""
            }`}
          >
            <Hamburger
              toggled={isOpen}
              toggle={setIsOpen}
              size={20}
              color="#ffffff"
            />
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto overflow-x-hidden p-4 scrollbar-none ">
          {isOpen && (
            <p className="text-xs text-teal-300 uppercase font-semibold mb-4 tracking-wider">
              Menu
            </p>
          )}

          <div className="space-y-1">
            {navItems.map((item) => (
              <div
                key={item.name}
                onClick={() => handleNavClick(item)}
                className={`
                  cursor-pointer relative flex items-center font-medium 
                  transition-all duration-200 rounded-lg group
                  ${isOpen ? "px-4 py-3" : "p-3 justify-center"}
                  ${
                    location.pathname === item.path ||
                    (item.path === "/wallet" &&
                      location.pathname === "/add-funds")
                      ? "text-white bg-gradient-to-r from-teal-600/40 to-emerald-600/40 shadow-md border border-teal-500/30"
                      : "text-teal-100 hover:text-white hover:bg-gradient-to-r hover:from-teal-700/30 hover:to-teal-600/30"
                  }
                `}
                title={!isOpen ? item.name : undefined}
              >
                {/* Active indicator */}
                {location.pathname === item.path && isOpen && (
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 h-8 w-1 bg-gradient-to-b from-emerald-400 to-teal-400 rounded-r-full shadow-glow"></span>
                )}

                {/* Icon */}
                <span
                  className={`
                  flex-shrink-0 transition-all duration-200
                  ${isOpen ? "text-xl" : "text-2xl"}
                  ${
                    location.pathname === item.path
                      ? "text-emerald-300"
                      : "text-teal-200 group-hover:text-white"
                  }
                `}
                >
                  {item.icon}
                </span>

                {/* Label */}
                {isOpen && (
                  <span className="ml-4 text-sm font-medium truncate">
                    {item.name}
                  </span>
                )}

                {/* Tooltip for collapsed state */}
                {!isOpen && !isMobile && (
                  <div className="absolute left-full ml-2 px-2 py-1 bg-white text-white text-sm rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50">
                    {item.name}
                  </div>
                )}
              </div>
            ))}
          </div>
        </nav>
      </div>

      {/* Add custom scrollbar styles */}
      <style jsx>{`
        .scrollbar-thin::-webkit-scrollbar {
          width: 6px;
        }
        .scrollbar-thin::-webkit-scrollbar-track {
          background: transparent;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb {
          background: rgba(20, 184, 166, 0.3);
          border-radius: 3px;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb:hover {
          background: rgba(20, 184, 166, 0.5);
        }
        .shadow-glow {
          box-shadow: 0 0 10px rgba(52, 211, 153, 0.5);
        }
      `}</style>
    </>
  );
}

export default Sidebar;
