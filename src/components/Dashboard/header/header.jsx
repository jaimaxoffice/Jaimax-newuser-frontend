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

  return (
    <header className=" sm:px-6 lg:px-8  text-white  border-r border-teal-600/20 bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#000000] p-3 rounded-xl">
      <h1 className="text-2xl  text-center pl-1 sm:text-3xl md:text-4xl font-extrabold ">
        {title}
      </h1>
    </header>

  );
}

export default Header;
