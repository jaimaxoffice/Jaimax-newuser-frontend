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




import { useLocation, Link } from "react-router-dom";
import { FaShareAlt, FaDownload, FaUser } from "react-icons/fa";

const routeTitles = {
  "/": "Dashboard",
  "/wallet": "Wallet",
  "/my-team": "My Total Team",
  "/shareholders": "Share Holders",
  "/buy-history": "Buy History",
  "/security": "Security",
  "/profile": "Profile",
  "/kyc": "Kyc",
  "/withdrawal": "With Drawal",
  "/support": "Support",
  "/logout": "Logout",
};

function Header() {
  const location = useLocation();
  const title = routeTitles[location.pathname] || "Dashboard";
  const username =
    JSON.parse(localStorage.getItem("userData"))?.data?.name || "User";
  const email =
    JSON.parse(localStorage.getItem("userData"))?.data?.email || "email";
  const userData = JSON.parse(localStorage.getItem("userData"));

  return (
    <header className="relative sm:px-6 lg:px-8 text-white border-r border-teal-600/20 bg-gradient-to-br from-[#085358] via-[#085358] to-[#085358] p-3 rounded-xl">
      <h1 className="invisible md:visible text-2xl text-center sm:text-2xl md:text-3xl font-extrabold">
        {title}
      </h1>
      <div className="absolute top-3 right-3 flex items-center space-x-2">
        <div className="flex flex-col text-right">
          <p className="text-sm font-semibold">{username}</p>
          <p className="text-xs text-gray-300">{email}</p>
        </div>
        <div className="relative group">
          {/* Avatar */}
          <div className="w-11 h-11 rounded-full overflow-hidden border-2 border-teal-100 cursor-pointer">
            {userData?.data?.profile ? (
              <img
                src={userData.data.profile}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-teal-50 flex items-center justify-center">
                <FaUser className="text-teal-600 text-xl" />
              </div>
            )}
          </div>

          {/* Dropdown - Removed pointer-events-none */}
          <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg border border-teal-100 opacity-0 group-hover:opacity-100 scale-95 group-hover:scale-100 transition-all duration-200 z-50">
            <ul className="py-2 text-sm text-gray-700">
              <li>
                <Link
                  to="/profile"
                  className="block px-4 py-2 hover:bg-teal-50 cursor-pointer"
                >
                  Profile
                </Link>
              </li>
              <li>
                <Link
                  onClick={() => {
                    localStorage.removeItem("userData");
                    window.location.href = "/";
                  }}
                  className="block px-4 py-2 hover:bg-teal-50 cursor-pointer"
                >
                  Logout
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;