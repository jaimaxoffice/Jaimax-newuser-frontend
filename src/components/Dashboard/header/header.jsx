// import { useLocation } from "react-router-dom";
// import { FaShareAlt, FaDownload, FaUser } from "react-icons/fa";
// const routeTitles = {
//   "/": "Dashboard",
//   "/wallet": "Wallet",
//   "/my-team": "My Total Team",
//   "/shareholders": "Share Holders",
//   "/buy-history": "Buy History",
//   "/security": "Security",
//   "/profile": "Profile",
//   "/kyc": "Kyc",
//   "/withdrawal": "With Drawal",
//   "/support": "Support",
//   "/logout": "Logout"
// };

// function Header() {
//   const location = useLocation();
//   const title = routeTitles[location.pathname] || "Dashboard";
//   const username = JSON.parse(localStorage.getItem("userData"))?.data?.name || "User";
//   const email = JSON.parse(localStorage.getItem("userData"))?.data?.email || "email";
//   const userData = JSON.parse(localStorage.getItem("userData"));
//   return (
//     <header className="relative sm:px-6 lg:px-8 text-white border-r border-teal-600/20 bg-gradient-to-br from-[#085358] via-[#085358] to-[#085358] p-3 rounded-xl">
//       <h1 className="text-2xl text-center sm:text-2xl md:text-3xl font-extrabold">
//         {title}
//       </h1>
//       <div className="absolute top-3 right-3 flex items-center space-x-2">
//         <div className="flex flex-col text-right">
//           <p className="text-sm font-semibold">{username}</p>
//           <p className="text-xs text-gray-300">{email}</p>
//         </div>
//         <div className="relative group">
//   {/* Avatar */}
//   <div className="w-11 h-11 rounded-full overflow-hidden border-2 border-teal-100 cursor-pointer">
//     {userData?.data?.profile ? (
//       <img
//         src={userData.data.profile}
//         alt="Profile"
//         className="w-full h-full object-cover"
//       />
//     ) : (
//       <div className="w-full h-full bg-teal-50 flex items-center justify-center">
//         <FaUser className="text-teal-600 text-xl" />
//       </div>
//     )}
//   </div>

//   {/* Dropdown */}
//   <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg border border-teal-100 opacity-0 group-hover:opacity-100 scale-95 group-hover:scale-100 transition-all duration-200 z-50 pointer-events-none group-hover:pointer-events-auto">
//     <ul className="py-2 text-sm text-gray-700">
//       <li className="px-4 py-2 hover:bg-teal-50 cursor-pointer">Profile</li>
//       <li className="px-4 py-2 hover:bg-teal-50 cursor-pointer">Logout</li>
//     </ul>
//   </div>
// </div>

//       </div>
//     </header>
//   );
// }

// export default Header;



// import { useLocation } from "react-router-dom";
// import { FaShareAlt, FaDownload, FaUser } from "react-icons/fa";

// const routeTitles = {
//   "/": "Dashboard",
//   "/wallet": "Wallet",
//   "/my-team": "My Total Team",
//   "/shareholders": "Share Holders",
//   "/buy-history": "Buy History",
//   "/security": "Security",
//   "/profile": "Profile",
//   "/kyc": "Kyc",
//   "/withdrawal": "With Drawal",
//   "/support": "Support",
//   "/logout": "Logout"
// };

// function Header() {
//   const location = useLocation();
//   const title = routeTitles[location.pathname] || "Dashboard";
//   const username = JSON.parse(localStorage.getItem("userData"))?.data?.name || "User";
//   const email = JSON.parse(localStorage.getItem("userData"))?.data?.email || "email";
//   const userData = JSON.parse(localStorage.getItem("userData"));

//   return (
//     <header className="relative sm:px-6 lg:px-8 text-white border-r border-teal-600/20 bg-gradient-to-br from-[#085358] via-[#085358] to-[#085358] p-3 rounded-xl">
//       <h1 className="invisible md:visible text-2xl text-center sm:text-2xl md:text-3xl font-extrabold">
//         {title}
//       </h1>
//       <div className="absolute top-3 right-3 flex items-center space-x-2">
//         <div className="flex flex-col text-right">
//           <p className="text-sm font-semibold">{username}</p>
//           <p className="text-xs text-gray-300">{email}</p>
//         </div>
//         <div className="relative group">
//           {/* Avatar */}
//           <div className="w-11 h-11 rounded-full overflow-hidden border-2 border-teal-100 cursor-pointer">
//             {userData?.data?.profile ? (
//               <img
//                 src={userData.data.profile}
//                 alt="Profile"
//                 className="w-full h-full object-cover"
//               />
//             ) : (
//               <div className="w-full h-full bg-teal-50 flex items-center justify-center">
//                 <FaUser className="text-teal-600 text-xl" />
//               </div>
//             )}
//           </div>

//           {/* Dropdown */}
//           <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg border border-teal-100 opacity-0 group-hover:opacity-100 scale-95 group-hover:scale-100 transition-all duration-200 z-50 pointer-events-none group-hover:pointer-events-auto">
//             <ul className="py-2 text-sm text-gray-700">
//               <li className="px-4 py-2 hover:bg-teal-50 cursor-pointer">Profile</li>
//               <li className="px-4 py-2 hover:bg-teal-50 cursor-pointer">Logout</li>
//             </ul>
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// }

// export default Header;




// import { useLocation, Link } from "react-router-dom";
// import { FaShareAlt, FaDownload, FaUser } from "react-icons/fa";

// const routeTitles = {
//   "/": "Dashboard",
//   "/wallet": "Wallet",
//   "/my-team": "My Total Team",
//   "/shareholders": "Share Holders",
//   "/buy-history": "Buy History",
//   "/security": "Security",
//   "/profile": "Profile",
//   "/kyc": "Kyc",
//   "/withdrawal": "With Drawal",
//   "/support": "Support",
//   "/logout": "Logout",
// };

// function Header() {
//   const location = useLocation();
//   const title = routeTitles[location.pathname] || "Dashboard";
//   const username =
//     JSON.parse(localStorage.getItem("userData"))?.data?.name || "User";
//   const email =
//     JSON.parse(localStorage.getItem("userData"))?.data?.email || "email";
//   const userData = JSON.parse(localStorage.getItem("userData"));

//   return (
//     <header className="relative sm:px-6 lg:px-8 text-white border-r border-teal-600/20 bg-gradient-to-br from-[#085358] via-[#085358] to-[#085358] p-3 rounded-xl">
//       <h1 className="invisible md:visible text-2xl text-center sm:text-2xl md:text-3xl font-extrabold">
//         {title}
//       </h1>
//       <div className="absolute top-3 right-3 flex items-center space-x-2">
//         <div className="flex flex-col text-right">
//           <p className="text-sm font-semibold">{username}</p>
//           <p className="text-xs text-gray-300">{email}</p>
//         </div>
//         <div className="relative group">
//           {/* Avatar */}
//           <div className="w-11 h-11 rounded-full overflow-hidden border-2 border-teal-100 cursor-pointer">
//             {userData?.data?.profile ? (
//               <img
//                 src={userData.data.profile}
//                 alt="Profile"
//                 className="w-full h-full object-cover"
//               />
//             ) : (
//               <div className="w-full h-full bg-teal-50 flex items-center justify-center">
//                 <FaUser className="text-teal-600 text-xl" />
//               </div>
//             )}
//           </div>

//           {/* Dropdown - Removed pointer-events-none */}
//           <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg border border-teal-100 opacity-0 group-hover:opacity-100 scale-95 group-hover:scale-100 transition-all duration-200 z-50">
//             <ul className="py-2 text-sm text-gray-700">
//               <li>
//                 <Link
//                   to="/profile"
//                   className="block px-4 py-2 hover:bg-teal-50 cursor-pointer"
//                 >
//                   Profile
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   onClick={() => {
//                     localStorage.removeItem("userData");
//                     window.location.href = "/";
//                   }}
//                   className="block px-4 py-2 hover:bg-teal-50 cursor-pointer"
//                 >
//                   Logout
//                 </Link>
//               </li>
//             </ul>
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// }

// export default Header;




// import { useLocation, Link } from "react-router-dom";
// import { FaUser } from "react-icons/fa";
// import { useState, useRef, useEffect } from "react"; // Import useRef and useEffect

// const routeTitles = {
//   "/": "Dashboard",
//   "/wallet": "Wallet",
//   "/my-team": "My Total Team",
//   "/shareholders": "Share Holders",
//   "/buy-history": "Buy History",
//   "/security": "Security",
//   "/profile": "Profile",
//   "/kyc": "Kyc",
//   "/withdrawal": "With Drawal",
//   "/support": "Support",
//   "/logout": "Logout",
// };

// function Header() {
//   const location = useLocation();
//   const title = routeTitles[location.pathname] || "Dashboard";
//   const username =
//     JSON.parse(localStorage.getItem("userData"))?.data?.name || "User";
//   const email =
//     JSON.parse(localStorage.getItem("userData"))?.data?.email || "email";
//   const userData = JSON.parse(localStorage.getItem("userData"));

//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const dropdownRef = useRef(null); // Create a ref for the dropdown container

//   const handleAvatarClick = () => {
//     setIsDropdownOpen((prev) => !prev); // Toggle state
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("userData");
//     window.location.href = "/";
//   };

//   // Effect to handle clicks outside the dropdown
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       // If the dropdown is open and the click is outside the dropdown container
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setIsDropdownOpen(false);
//       }
//     };

//     if (isDropdownOpen) {
//       document.addEventListener("mousedown", handleClickOutside);
//     }

//     // Cleanup the event listener when the component unmounts or dropdown closes
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [isDropdownOpen]); // Re-run effect when isDropdownOpen changes

//   return (
//     <header className="relative sm:px-6 lg:px-8 text-white border-r border-teal-600/20 bg-gradient-to-br from-[#085358] via-[#085358] to-[#085358] p-3 rounded-xl">
//       <h1 className="invisible md:visible text-xl text-start sm:text-2xl md:text-3xl font-extrabold">
//         {title}
//       </h1>
//       <div className="absolute top-3 right-3 flex items-center space-x-2">
//         <div className="flex flex-col text-right">
//           <p className="text-sm font-semibold">{username}</p>
//           <p className="text-xs text-gray-300">{email}</p>
//         </div>
//         {/* Apply 'group' here to the avatar container */}
//         <div className="relative group" ref={dropdownRef}> {/* Attach the ref here */}
//           {/* Avatar - Add onClick handler */}
//           <div
//             className="w-10 h-10 rounded-full overflow-hidden border-2 border-teal-100 cursor-pointer"
//             onClick={handleAvatarClick}
//           >
//             {userData?.data?.profile ? (
//               <img
//                 src={userData.data.profile}
//                 alt="Profile"
//                 className="w-full h-full object-cover"
//               />
//             ) : (
//               <div className="w-full h-full bg-teal-50 flex items-center justify-center">
//                 <FaUser className="text-teal-600 text-xl" />
//               </div>
//             )}
//           </div>

//           {/* Dropdown - Conditionally render based on isDropdownOpen state */}
//           {isDropdownOpen && (
//             <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg border border-teal-100 transition-all duration-200 z-50">
//               <ul className="py-2 text-sm text-gray-700">
//                 <li>

//                   <Link
//                     to="/profile"
//                     onClick={() => setIsDropdownOpen(false)}
//                     className="flex items-center gap-2 px-4 py-2 hover:bg-teal-50 cursor-pointer"
//                   >
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       width="20"
//                       height="20"
//                       viewBox="0 0 24 24"
//                       fill="none"
//                       stroke="currentColor"
//                       strokeWidth="2"
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       className="lucide lucide-user"
//                     >
//                       <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
//                       <circle cx="12" cy="7" r="4" />
//                     </svg>
//                     <span>Profile</span>
//                   </Link>

//                 </li>
//                 <li>
//                   <Link
//                     onClick={handleLogout}
//                     className="flex items-center gap-2 px-4 py-2 hover:bg-teal-50 cursor-pointer"
//                   >

//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       width="20"
//                       height="20"
//                       viewBox="0 0 24 24"
//                       fill="none"
//                       stroke="currentColor"
//                       strokeWidth="2"
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       className="lucide lucide-log-out"
//                     >
//                       <path d="m16 17 5-5-5-5" />
//                       <path d="M21 12H9" />
//                       <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
//                     </svg>
//                     <span >Logout</span>
//                   </Link>
//                 </li>

//               </ul>
//             </div>
//           )}
//         </div>
//       </div>
//     </header >
//   );
// }

// export default Header;



// import { useLocation, Link } from "react-router-dom";
// import { FaUser } from "react-icons/fa";
// import { useState, useRef, useEffect } from "react";
// import {useUserDataQuery} from '../../Dashboard/pages/dashBoard/DashboardApliSlice'
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

// function Header() {
//   const location = useLocation();
//   const title = routeTitles[location.pathname] || "Dashboard";
//   const userData = JSON.parse(localStorage.getItem("userData"));
//   const username = userData?.data?.name || "User";
//   const email = userData?.data?.email || "email";

//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const dropdownRef = useRef(null);

//   const handleAvatarClick = () => {
//     setIsDropdownOpen((prev) => !prev);
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("userData");
//     window.location.href = "/";
//   };

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setIsDropdownOpen(false);
//       }
//     };

//     if (isDropdownOpen) {
//       document.addEventListener("mousedown", handleClickOutside);
//     }

//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [isDropdownOpen]);

//   return (
//     <header className="relative p-4 rounded-xl text-white border-r border-teal-600/20 bg-gradient-to-br from-[#085358] via-[#085358] to-[#085358]
//                        sm:px-6 lg:px-8">
//       {/* Title - Visible on medium screens and up */}
//       <h1 className="invisible md:visible text-xl text-start sm:text-2xl md:text-3xl font-extrabold">
//         {title}
//       </h1>

//       {/* User Info and Avatar Section */}
//       {/* Adjusted positioning for mobile: use 'right-2' for smaller screens, then 'sm:right-3' for larger */}
//       <div className="absolute top-3 right-2 sm:right-3 flex items-center space-x-2 ">
//         <div className="flex flex-col text-right">
//           <p className="text-sm font-semibold">{username}</p>
//           <p className="text-xs text-gray-300">{email}</p>
//         </div>

//         {/* Avatar and Dropdown Container */}
//         <div className="relative group  " ref={dropdownRef}>
//           {/* Avatar - Clickable to toggle dropdown */}
//           <div
//             className="w-10 h-10  rounded-full overflow-hidden border-2 border-teal-100 cursor-pointer"
//             onClick={handleAvatarClick}
//           >
//             {userData?.data?.profile ? (
//               <img
//                 src={userData.data.profile}
//                 alt="Profile"
//                 className="w-full h-full object-cover sm:p-3"
//               />
//             ) : (
//               <div className="w-full h-full bg-teal-50 flex items-center justify-center">
//                 <FaUser className="text-teal-600 text-xl" />
//               </div>
//             )}
//           </div>

//           {/* Dropdown Menu - Conditionally rendered */}
//           {isDropdownOpen && (
//             <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg border border-teal-100 transition-all duration-200 z-50">
//               <ul className="py-2 text-sm text-gray-700">
//                 <li>
//                   <Link
//                     to="/profile"
//                     onClick={() => setIsDropdownOpen(false)}
//                     className="flex items-center gap-2 px-4 py-2 hover:bg-teal-50 cursor-pointer"
//                   >
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       width="20"
//                       height="20"
//                       viewBox="0 0 24 24"
//                       fill="none"
//                       stroke="currentColor"
//                       strokeWidth="2"
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       className="lucide lucide-user"
//                     >
//                       <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
//                       <circle cx="12" cy="7" r="4" />
//                     </svg>
//                     <span>Profile</span>
//                   </Link>
//                 </li>
//                 <li>
//                   <Link
//                     to="#"
//                     onClick={handleLogout}
//                     className="flex items-center gap-2 px-4 py-2 hover:bg-teal-50 cursor-pointer"
//                   >
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       width="20"
//                       height="20"
//                       viewBox="0 0 24 24"
//                       fill="none"
//                       stroke="currentColor"
//                       strokeWidth="2"
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       className="lucide lucide-log-out"
//                     >
//                       <path d="m16 17 5-5-5-5" />
//                       <path d="M21 12H9" />
//                       <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
//                     </svg>
//                     <span>Logout</span>
//                   </Link>
//                 </li>
//               </ul>
//             </div>
//           )}
//         </div>
//       </div>
//     </header>
//   );
// }

// export default Header;



import { useLocation, Link } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { useState, useRef, useEffect } from "react";
import { useUserDataQuery } from '../../Dashboard/pages/dashBoard/DashboardApliSlice';

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

function Header() {
  const location = useLocation();
  const title = routeTitles[location.pathname] || "Dashboard";
  
  // Use API data instead of localStorage
  const { data: userData, isLoading, error } = useUserDataQuery();
  const name=JSON.parse(localStorage.getItem("userData"));
  const id=name?.data?.name;
  const mail=name?.data?.email;
  // console.log(id);
  // console.log(mail);
  // Extract user information from API response
  const username = userData?.data?.name || "User";
  const email = userData?.data?.email || "email";
  const profileImage = userData?.data?.profile;

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleAvatarClick = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleLogout = () => {
    localStorage.removeItem("userData");
    localStorage.removeItem('token');
    // You might want to also clear any API cache or call a logout API
    window.location.href = "/";
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  // Show loading state if data is still being fetched
  if (isLoading) {
    return (
      <header className="relative p-4 rounded-xl text-white border-r border-teal-600/20 bg-gradient-to-br from-[#085358] via-[#085358] to-[#085358]
                         sm:px-6 lg:px-8">
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

  // Show error state if API call fails
  if (error) {
    return (
      <header className="relative p-4 rounded-xl text-white border-r border-teal-600/20 bg-gradient-to-br from-[#085358] via-[#085358] to-[#085358]
                         sm:px-6 lg:px-8">
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
    <header className="relative p-4 rounded-xl text-white border-r border-teal-600/20 bg-gradient-to-br from-[#085358] via-[#085358] to-[#085358]
                       sm:px-6 lg:px-8">
      {/* Title - Visible on medium screens and up */}
      <h1 className="invisible md:visible text-xl text-start sm:text-2xl md:text-3xl font-extrabold">
        {title}
      </h1>

      {/* User Info and Avatar Section */}
      {/* Adjusted positioning for mobile: use 'right-2' for smaller screens, then 'sm:right-3' for larger */}
      <div className="absolute top-3 right-2 sm:right-3 flex items-center space-x-2 ">
        <div className="flex flex-col text-right">
          <p className="text-sm font-semibold">{id}</p>
          <p className="text-xs text-gray-300">{mail}</p>
        </div>

        {/* Avatar and Dropdown Container */}
        <div className="relative group  " ref={dropdownRef}>
          {/* Avatar - Clickable to toggle dropdown */}
          <div
            className="w-10 h-10  rounded-full overflow-hidden border-2 border-teal-100 cursor-pointer"
            onClick={handleAvatarClick}
          >
            {profileImage ? (
              <img
                src={profileImage}
                alt="Profile"
                className="w-full h-full object-cover sm:p-3"
              />
            ) : (
              <div className="w-full h-full bg-teal-50 flex items-center justify-center">
                <FaUser className="text-teal-600 text-xl" />
              </div>
            )}
          </div>

          {/* Dropdown Menu - Conditionally rendered */}
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg border border-teal-100 transition-all duration-200 z-50">
              <ul className="py-2 text-sm text-gray-700">
                <li>
                  <Link
                    to="/profile"
                    onClick={() => setIsDropdownOpen(false)}
                    className="flex items-center gap-2 px-4 py-2 hover:bg-teal-50 cursor-pointer"
                  >
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
                    <span>Profile</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    onClick={handleLogout}
                    className="flex items-center gap-2 px-4 py-2 hover:bg-teal-50 cursor-pointer"
                  >
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
                    <span>Logout</span>
                  </Link>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;