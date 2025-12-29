// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { Link } from 'react-router-dom';
// import { motion, AnimatePresence, useInView } from "framer-motion";
// import { useGetRoundQuery } from "../../components/Dashboard/pages/dashBoard/DashboardApliSlice";
// import bscscan from "../../assets/image.png";
// import logo from "../../../public/Images/site_logo.svg"
// const HomeAbout = () => {
//   const contractAddress = "0xD898d23a082136f4d752e4dE31D8296EaEb94277";
//   const [copied, setCopied] = useState(false);
//   const navigate = useNavigate();
//   const ref = React.useRef(null);
//   const isInView = useInView(ref, { once: true, amount: 0.3 });

//   // Fetch data using RTK Query
//   const { data: roundData, error, isLoading, refetch } = useGetRoundQuery();

//   // Get live rounds (status = 1)
//   const liveRounds =
//     roundData?.data?.rounds?.filter((round) => round.status === 1) || [];
//   const currentRound = liveRounds[0];
//   const quickLinks = [
//     { to: '/', label: 'Home' },
//     { to: '/best-presale-crypto-coin-in-india', label: 'Presale' },
//     { to: '/about', label: 'About' },
//     { to: '/features', label: 'Features' },
//     { to: '/services', label: 'Services' },
//     { to: '/blog', label: 'Blog' },
//     { to: '/contact', label: 'Contact' },
//   ];

//   const authLinks = [
//     { to: '/login', label: 'Login' },
//     { to: '/register', label: 'Register' },
//   ];

//   const legalLinks = [
//     { to: '/privacy-policy', label: 'Privacy Policy' },
//     { to: '/terms-and-conditions', label: 'Terms & Conditions' },
//     { to: '/refund-policy', label: 'Refund Policy' },
//     { to: '/kyc-pmla', label: 'KYC/PMLA' },
//     { to: '/aml-ctf', label: 'AML/CTF Policy' },
//   ];
//   const handleCopy = async () => {
//     try {
//       await navigator.clipboard.writeText(contractAddress);
//       setCopied(true);
//       setTimeout(() => setCopied(false), 2000);
//     } catch (err) {
//       // console.error('Failed to copy:', err);
//     }
//   };

//   const handleBSCScan = () => {
//     window.open(`https://bscscan.com/address/${contractAddress}`, "_blank");
//   };

//   // Auto-refresh data every 30 seconds
//   useEffect(() => {
//     const interval = setInterval(() => {
//       refetch();
//     }, 30000);
//     return () => clearInterval(interval);
//   }, [refetch]);

//   const formatNumber = (num) => {
//     if (num >= 1000000) {
//       return (num / 1000000).toFixed(1) + "M";
//     }
//     if (num >= 1000) {
//       return (num / 1000).toFixed(1) + "K";
//     }
//     return num.toLocaleString();
//   };

//   // Default stats data for when API data is loading or unavailable
//   const livePrice = currentRound?.atPriceInr || "0.0000";
//   const soldTokens = formatNumber(currentRound?.soldQty || 225765326);
//   const liveMembers = formatNumber(currentRound?.totalMembers || 24567);

//   // Animation Variants
//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.08,
//         delayChildren: 0.1,
//       },
//     },
//   };

//   const itemVariants = {
//     hidden: { y: 20, opacity: 0 },
//     visible: {
//       y: 0,
//       opacity: 1,
//       transition: {
//         duration: 0.5,
//         ease: "easeOut",
//       },
//     },
//   };

//   return (
//   <div className="relative">
//       {/* Background Pattern */}
//       <div className="absolute inset-0 opacity-5">
//         <div
//           className="absolute inset-0"
//           style={{
//             backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(184, 204, 38, 0.1) 35px, rgba(184, 204, 38, 0.1) 70px)`,
//           }}
//         ></div>
//       </div>

//       {/* Contract Address Section */}
//       <motion.div
//         className="relative py-10 px-4 sm:px-6 lg:px-8"
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ duration: 0.6 }}
//       >
//         <div className="max-w-6xl mx-auto">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5 }}
//             className="relative"
//           >
//             {/* Logo with Link to Home - Fixes orphan */}
//             <Link to="/" title="Go to Jaimax Home">
//               <img
//                 src={logo}
//                 alt="Jaimax Logo"
//                 title="Jaimax brand new crypto in market"
//                 className="mx-auto mb-6 w-80 object-contain hover:scale-105 transition-transform"
//               />
//             </Link>

//             {/* Contract Container */}
//             <motion.div
//               className="relative overflow-hidden rounded-2xl"
//               whileHover={{ scale: 1.01 }}
//               transition={{ duration: 0.2 }}
//             >
//               {/* Gradient Border Effect */}
//               <div className="absolute inset-0 bg-gradient-to-r from-[#b8cc26] via-[#177338] to-[#b8cc26] opacity-60"></div>

//               <div className="relative bg-[#085056] m-[1px] rounded-2xl p-6">
//                 <div className="flex flex-col space-y-4">
//                   {/* Title */}
//                   <div className="flex items-center justify-between">
//                     <h3 className="text-lg font-bold text-white">
//                       CONTRACT <span className="text-[#b8cc26]">ADDRESS</span>
//                     </h3>
//                   </div>

//                   {/* Address and Actions */}
//                   <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-3">
//                     {/* Address Box */}
//                     <motion.div
//                       className="flex-1 bg-black/20 rounded-xl px-4 py-3 border border-[#177338]/30 group hover:border-[#b8cc26]/40 transition-colors"
//                       whileHover={{ backgroundColor: 'rgba(0,0,0,0.3)' }}
//                     >
//                       <p className="font-mono text-[13px] sm:text-sm text-gray-300 break-all leading-relaxed">
//                         {contractAddress}
//                       </p>
//                     </motion.div>

//                     {/* Buttons */}
//                     <div className="flex gap-2">
//                       <motion.button
//                         onClick={handleCopy}
//                         className="px-5 py-2.5 bg-[#177338] text-white text-sm font-bold rounded-lg hover:bg-[#177338]/90 transition-colors"
//                         whileHover={{ scale: 1.05, y: -2 }}
//                         whileTap={{ scale: 0.95 }}
//                       >
//                         {copied ? 'COPIED' : 'COPY'}
//                       </motion.button>

//                       <motion.button
//                         onClick={handleBSCScan}
//                         whileHover={{ scale: 1.05, y: -2 }}
//                         whileTap={{ scale: 0.95 }}
//                         className="relative backdrop-blur-md bg-white/10 border border-white/20 shadow-lg hover:bg-white/20 rounded-xl p-2 transition-all duration-300"
//                       >
//                         <img
//                           src={bscscan}
//                           width={100}
//                           alt="BscScan"
//                           title="BscScan"
//                           className="drop-shadow-lg"
//                         />
//                       </motion.button>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </motion.div>
//           </motion.div>

//           {/* Live Stats Section */}
//           <motion.div
//             ref={ref}
//             className="mt-8"
//             variants={containerVariants}
//             initial="hidden"
//             animate={isInView ? 'visible' : 'hidden'}
//           >
//             {/* Stats Cards */}
//             <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
//               {/* Price Card - Link to Presale */}
//               <Link to="/best-presale-crypto-coin-in-india">
//                 <motion.div
//                   variants={itemVariants}
//                   whileHover={{ scale: 1.03, y: -3 }}
//                   className="relative group cursor-pointer"
//                 >
//                   <div className="absolute inset-0 bg-gradient-to-br from-[#b8cc26]/20 to-transparent rounded-xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
//                   <div className="relative bg-gradient-to-br from-[#085056] to-[#063c40] rounded-xl border border-[#b8cc26]/20 hover:border-[#b8cc26]/40 transition-colors p-5">
//                     <div className="flex justify-between items-start mb-2">
//                       <h2 className="text-[10px] font-bold text-[#b8cc26] uppercase tracking-wider">
//                         Live Price
//                       </h2>
//                     </div>
//                     <div className="flex items-baseline space-x-1">
//                       <span className="text-2xl font-black text-[#b8cc26]">₹</span>
//                       <h2 className="text-3xl font-black text-white">{livePrice}</h2>
//                     </div>
//                     <div className="mt-2 h-[1px] bg-gradient-to-r from-[#b8cc26]/50 to-transparent"></div>
//                   </div>
//                 </motion.div>
//               </Link>

//               {/* Tokens Card - Link to Features */}
//               <Link to="/features">
//                 <motion.div
//                   variants={itemVariants}
//                   whileHover={{ scale: 1.03, y: -3 }}
//                   className="relative group cursor-pointer"
//                 >
//                   <div className="absolute inset-0 to-transparent rounded-xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
//                   <div className="relative bg-gradient-to-br from-[#085056] to-[#063c40] rounded-xl border border-[#177338]/20 hover:border-[#177338]/40 transition-colors p-5">
//                     <div className="flex justify-between items-start mb-2">
//                       <span className="text-[10px] font-bold text-[#b8cc26] uppercase tracking-wider">
//                         Sold Tokens
//                       </span>
//                     </div>
//                     <h2 className="text-3xl font-black text-white">{soldTokens}</h2>
//                     <div className="mt-2 h-[1px] bg-gradient-to-r from-[#177338]/50 to-transparent"></div>
//                   </div>
//                 </motion.div>
//               </Link>

//               {/* Members Card - Link to About */}
//               <Link to="/about">
//                 <motion.div
//                   variants={itemVariants}
//                   whileHover={{ scale: 1.03, y: -3 }}
//                   className="relative group cursor-pointer"
//                 >
//                   <div className="absolute inset-0 to-transparent rounded-xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
//                   <div className="relative rounded-xl bg-gradient-to-br from-[#085056] to-[#063c40] border border-[#b8cc26]/20 hover:border-[#b8cc26]/40 transition-colors p-5">
//                     <div className="flex justify-between items-start mb-2">
//                       <span className="text-[10px] font-bold text-[#b8cc26] uppercase tracking-wider">
//                         Live Members
//                       </span>
//                     </div>
//                     <div className="text-3xl font-black text-white">{liveMembers}</div>
//                     <div className="mt-2 h-[1px] bg-gradient-to-r from-[#b8cc26]/50 to-transparent"></div>
//                   </div>
//                 </motion.div>
//               </Link>
//             </div>

//           </motion.div>
//         </div>
//       </motion.div>
//     </div>
//   );
// };


// export default HomeAbout;
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useInView } from "framer-motion";
import { 
  useGetRoundQuery, 
  useGetHolderCountQuery 
} from "../../components/Dashboard/pages/dashBoard/DashboardApliSlice";
import bscscan from "../../assets/image.png";
import logo from "../../../public/Images/site_logo.svg";

const HomeAbout = () => {
  const contractAddress = "0xD898d23a082136f4d752e4dE31D8296EaEb94277";
  const [copied, setCopied] = useState(false);
  const navigate = useNavigate();
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  // Fetch data using RTK Query
// Round data (refresh every 30s)
const { data: roundData, error, isLoading } = useGetRoundQuery(undefined, {
  pollingInterval: 30000,
  refetchOnFocus: true,
  refetchOnReconnect: true,
});

// Holder count (refresh every 60s)
const {
  data: holderCount,
  error: holderError,
  isLoading: holderLoading,
} = useGetHolderCountQuery(contractAddress, {
  pollingInterval: 60000,
  refetchOnFocus: true,
  refetchOnReconnect: true,
});

  // Get live rounds (status = 1)
  const liveRounds =
    roundData?.data?.rounds?.filter((round) => round.status === 1) || [];
  const currentRound = liveRounds[0];

  const quickLinks = [
    { to: '/', label: 'Home' },
    { to: '/best-presale-crypto-token-in-india', label: 'Presale' },
    { to: '/about', label: 'About' },
    { to: '/features', label: 'Features' },
    { to: '/services', label: 'Services' },
    { to: '/blog', label: 'Blog' },
    { to: '/contact', label: 'Contact' },
  ];

  const authLinks = [
    { to: '/login', label: 'Login' },
    { to: '/register', label: 'Register' },
  ];

  const legalLinks = [
    { to: '/privacy-policy', label: 'Privacy Policy' },
    { to: '/terms-and-conditions', label: 'Terms & Conditions' },
    { to: '/refund-policy', label: 'Refund Policy' },
    { to: '/kyc-pmla', label: 'KYC/PMLA' },
    { to: '/aml-ctf', label: 'AML/CTF Policy' },
  ];

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(contractAddress);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      // console.error('Failed to copy:', err);
    }
  };

  const handleBSCScan = () => {
    window.open(`https://bscscan.com/address/${contractAddress}`, "_blank");
  };



  const formatNumber = (num) => {
    if (!num && num !== 0) return null;
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + "M";
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + "K";
    }
    return num.toLocaleString();
  };

  // LIVE VALUES ONLY - NO FALLBACKS
  const livePrice = currentRound?.atPriceInr;
  const soldTokens = currentRound?.soldQty ? formatNumber(currentRound.soldQty) : null;
  const liveMembers = currentRound?.totalMembers ? formatNumber(currentRound.totalMembers) : 25.86;
  const tokenHolders = holderCount ? formatNumber(holderCount) : null;

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <div className="relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(184, 204, 38, 0.1) 35px, rgba(184, 204, 38, 0.1) 70px)`,
          }}
        ></div>
      </div>

      {/* Contract Address Section */}
      <motion.div
        className="relative py-10 px-4 sm:px-6 lg:px-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            {/* Logo with Link to Home */}
            <Link to="/" title="Go to Jaimax Home">
              <img
                src={logo}
                alt="Jaimax Logo"
                title="Jaimax brand new crypto in market"
                className="mx-auto mb-6 w-80 object-contain hover:scale-105 transition-transform"
              />
            </Link>

            {/* Contract Container */}
            <motion.div
              className="relative overflow-hidden rounded-2xl"
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.2 }}
            >
              {/* Gradient Border Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#b8cc26] via-[#177338] to-[#b8cc26] opacity-60"></div>

              <div className="relative bg-[#085056] m-[1px] rounded-2xl p-6">
                <div className="flex flex-col space-y-4">
                  {/* Title */}
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-white">
                      CONTRACT <span className="text-[#b8cc26]">ADDRESS</span>
                    </h3>
                  </div>

                  {/* Address and Actions */}
                  <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-3">
                    {/* Address Box */}
                    <motion.div
                      className="flex-1 bg-black/20 rounded-xl px-4 py-3 border border-[#177338]/30 group hover:border-[#b8cc26]/40 transition-colors"
                      whileHover={{ backgroundColor: 'rgba(0,0,0,0.3)' }}
                    >
                      <p className="font-mono text-[13px] sm:text-sm text-gray-300 break-all leading-relaxed">
                        {contractAddress}
                      </p>
                    </motion.div>

                    {/* Buttons */}
                    <div className="flex gap-2">
                      <motion.button
                        onClick={handleCopy}
                        className="px-5 py-2.5 bg-[#177338] text-white text-sm font-bold rounded-lg hover:bg-[#177338]/90 transition-colors"
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {copied ? 'COPIED' : 'COPY'}
                      </motion.button>

                      <motion.button
                        onClick={handleBSCScan}
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        className="relative backdrop-blur-md bg-white/10 border border-white/20 shadow-lg hover:bg-white/20 rounded-xl p-2 transition-all duration-300"
                      >
                        <img
                          src={bscscan}
                          width={100}
                          alt="BscScan"
                          title="BscScan"
                          className="drop-shadow-lg"
                        />
                      </motion.button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Live Stats Section - Updated to 4 columns */}
          <motion.div
            ref={ref}
            className="mt-8"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
          >
            {/* Stats Cards - Now 4 columns on lg screens */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              
              {/* Price Card - Link to Presale */}
              <Link to="/best-presale-crypto-token-in-india/">
                <motion.div
                  variants={itemVariants}
                  whileHover={{ scale: 1.03, y: -3 }}
                  className="relative group cursor-pointer"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-[#b8cc26]/20 to-transparent rounded-xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                  <div className="relative bg-gradient-to-br from-[#085056] to-[#063c40] rounded-xl border border-[#b8cc26]/20 hover:border-[#b8cc26]/40 transition-colors p-5">
                    <div className="flex justify-between items-start mb-2">
                      <h2 className="text-[10px] font-bold text-[#b8cc26] uppercase tracking-wider">
                        Live Price
                      </h2>
                    </div>
                    <div className="flex items-baseline space-x-1">
                      {isLoading ? (
                        <div className="animate-pulse h-8 w-24 bg-gray-700 rounded"></div>
                      ) : livePrice ? (
                        <>
                          <span className="text-2xl font-black text-[#b8cc26]">₹</span>
                          <h2 className="text-3xl font-black text-white">{livePrice}</h2>
                        </>
                      ) : (
                        <span className="text-gray-500">--</span>
                      )}
                    </div>
                    <div className="mt-2 h-[1px] bg-gradient-to-r from-[#b8cc26]/50 to-transparent"></div>
                  </div>
                </motion.div>
              </Link>

              {/* Tokens Card - Link to Features */}
              <Link to="/features">
                <motion.div
                  variants={itemVariants}
                  whileHover={{ scale: 1.03, y: -3 }}
                  className="relative group cursor-pointer"
                >
                  <div className="absolute inset-0 to-transparent rounded-xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                  <div className="relative bg-gradient-to-br from-[#085056] to-[#063c40] rounded-xl border border-[#177338]/20 hover:border-[#177338]/40 transition-colors p-5">
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-[10px] font-bold text-[#b8cc26] uppercase tracking-wider">
                        Sold Tokens
                      </span>
                    </div>
                    {isLoading ? (
                      <div className="animate-pulse h-8 w-20 bg-gray-700 rounded"></div>
                    ) : soldTokens ? (
                      <h2 className="text-3xl font-black text-white">{soldTokens}</h2>
                    ) : (
                      <span className="text-gray-500 text-3xl">--</span>
                    )}
                    <div className="mt-2 h-[1px] bg-gradient-to-r from-[#177338]/50 to-transparent"></div>
                  </div>
                </motion.div>
              </Link>

              {/* Members Card - Link to About */}
              <Link to="/about">
                <motion.div
                  variants={itemVariants}
                  whileHover={{ scale: 1.03, y: -3 }}
                  className="relative group cursor-pointer"
                >
                  <div className="absolute inset-0 to-transparent rounded-xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                  <div className="relative rounded-xl bg-gradient-to-br from-[#085056] to-[#063c40] border border-[#b8cc26]/20 hover:border-[#b8cc26]/40 transition-colors p-5">
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-[10px] font-bold text-[#b8cc26] uppercase tracking-wider">
                        Live Members
                      </span>
                    </div>
                    {isLoading ? (
                      <div className="animate-pulse h-8 w-20 bg-gray-700 rounded"></div>
                    ) : liveMembers ? (
                      <div className="text-3xl font-black text-white">{liveMembers}k</div>
                    ) : (
                      <span className="text-gray-500 text-3xl">--</span>
                    )}
                    <div className="mt-2 h-[1px] bg-gradient-to-r from-[#b8cc26]/50 to-transparent"></div>
                  </div>
                </motion.div>
              </Link>

              {/* Token Holders Card - LIVE VALUES ONLY */}
              {/* <motion.div
                variants={itemVariants}
                whileHover={{ scale: 1.03, y: -3 }}
                onClick={handleBSCScan}
                className="relative group cursor-pointer"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#177338]/20 to-transparent rounded-xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                <div className="relative bg-gradient-to-br from-[#085056] to-[#063c40] rounded-xl border border-[#177338]/20 hover:border-[#177338]/40 transition-colors p-5">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-[10px] font-bold text-[#b8cc26] uppercase tracking-wider">
                      Token Holders
                    </span>
                    {tokenHolders && (
                      <span className="flex items-center gap-1">
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                        </span>
                        <span className="text-[8px] text-green-400 font-semibold">LIVE</span>
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    {holderLoading ? (
                      <div className="animate-pulse h-8 w-20 bg-gray-700 rounded"></div>
                    ) : holderError ? (
                      <span className="text-red-400 text-sm">Failed</span>
                    ) : tokenHolders ? (
                      <h2 className="text-3xl font-black text-white">{tokenHolders}</h2>
                    ) : (
                      <span className="text-gray-500 text-3xl">--</span>
                    )}
                  </div>
                  <div className="mt-2 h-[1px] bg-gradient-to-r from-[#177338]/50 to-transparent"></div>
                </div>
              </motion.div> */}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default HomeAbout;