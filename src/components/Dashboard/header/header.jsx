import { useLocation } from "react-router-dom";

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
  "/logout": "Logout"
};

function Header() {
  const location = useLocation();
  const title = routeTitles[location.pathname] || "Dashboard";

  // return (
  //   <header className=" sm:px-6 lg:px-8  text-white  border-r border-teal-600/20 bg-gradient-to-br from-[#085358] via-[#085358] to-[#085358] p-3 rounded-xl">
  //     <h1 className="text-2xl  text-center pl-1 sm:text-3xl md:text-4xl font-extrabold ">
  //       {title}
  //     </h1>
  //     <img src='https://static.vecteezy.com/system/resources/previews/036/885/313/non_2x/blue-profile-icon-free-png.png' alt="" className="w-10" />
  //   </header>

  // );

const username = "Ravali"; // Replace with actual username logic
const email = "ravali@jaimax.com";
 return (
  <header className="relative sm:px-6 lg:px-8 text-white border-r border-teal-600/20 bg-gradient-to-br from-[#085358] via-[#085358] to-[#085358] p-3 rounded-xl">
    {/* Title */}
    <h1 className="text-2xl text-center sm:text-3xl md:text-4xl font-extrabold">
      {title}
    </h1>

    {/* Top-right: Name + Email to the left of the Image */}
    <div className="absolute top-3 right-3 flex items-center space-x-3">
      <div className="flex flex-col text-right">
        <p className="text-sm font-semibold">{username}</p>
        <p className="text-xs text-gray-300">{email}</p>
      </div>
      <img
        src="https://static.vecteezy.com/system/resources/previews/036/885/313/non_2x/blue-profile-icon-free-png.png"
        alt="Profile"
        className="w-10 h-10 object-cover rounded-full"
      />
    </div>
  </header>
);


}

export default Header;
