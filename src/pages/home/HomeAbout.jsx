// import React, { useState, useEffect } from "react";
// import { Copy, Users, Coins, TrendingUp, Check } from "lucide-react";
// import logo from '../../../src/assets/Images/jaimaxlogo1.svg';
// import { useNavigate } from "react-router-dom";
// import { useGetRoundQuery } from "../../components/Dashboard/pages/dashBoard/DashboardApliSlice";
// import { motion } from "framer-motion";
// const HomeAbout = () => {
//   const contractAddress = "0xD898d23a082136f4d752e4dE31D8296EaEb94277";
//   const [copied, setCopied] = useState(false);
//   const navigate = useNavigate();

//   // Fetch data using RTK Query
//   const { data: roundData, error, isLoading, refetch } = useGetRoundQuery();

//   // Get live rounds (status = 1)
//   const liveRounds = roundData?.data?.rounds?.filter(round => round.status === 1) || [];
//   const currentRound = liveRounds[0];

//   const handleCopy = async () => {
//     try {
//       await navigator.clipboard.writeText(contractAddress);
//       setCopied(true);
//       setTimeout(() => setCopied(false), 2000);
//     } catch (err) {
//       // console.error('Failed to copy:', err);
//     }
//   };

//   // Auto-refresh data every 30 seconds
//   useEffect(() => {
//     const interval = setInterval(() => {
//       refetch();
//     }, 30000);
//     return () => clearInterval(interval);
//   }, [refetch]);

//   const handleNavigate = () => {
//     navigate("/blog");
//   };

//   const formatNumber = (num) => {
//     if (num >= 1000000) {
//       return (num / 1000000).toFixed(1) + 'M';
//     }
//     if (num >= 1000) {
//       return (num / 1000).toFixed(1) + 'K';
//     }
//     return num.toLocaleString();
//   };
//     const handleBSCScan = () => {
//     window.open(`https://bscscan.com/address/${contractAddress}`, '_blank');
//   };

//   // Default stats data for when API data is loading or unavailable
//   const livePrice = currentRound?.atPriceInr || "0.0000";
//   const soldTokens = formatNumber(currentRound?.soldQty || 225765326);
//   const liveMembers = formatNumber(currentRound?.totalMembers || 24567);

//   return (
//     <>
//     <div className="max-w-3xl p-14 mx-auto bg-[#085056]">
//               <h4 className="text-xl md:text-2xl font-semibold mb-6 text-gray-200">
//                 CONTRACT ADDRESS
//               </h4>
//               <div className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 w-full">
//                 <div className="flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-4 px-3 py-2 sm:px-4 sm:py-2">
//                   <p className="flex-1 text-center sm:text-left font-mono text-sm sm:text-base md:text-lg text-white break-all leading-tight">
//                     {contractAddress}
//                   </p>

//                   <button
//                     onClick={handleCopy}
//                     className="flex items-center justify-center space-x-0 sm:space-x-2 bg-teal-500 hover:bg-teal-600 text-white text-xs sm:text-sm font-medium px-4 py-1.5 sm:px-5 sm:py-2 rounded-full transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-md"
//                     title={copied ? 'Copied!' : 'Copy to clipboard'}
//                   >
//                     {copied ? (
//                       <>
//                         <Check className="hidden sm:inline" size={16} />
//                         <span>Copied!</span>
//                       </>
//                     ) : (
//                       <>
//                         <Copy className="hidden sm:inline" size={16} />
//                         <span>Copy</span>
//                       </>
//                     )}
//                   </button>
//                   <motion.button
//                     onClick={handleBSCScan}
//                     className="flex-1 lg:flex-initial px-4 sm:px-6 py-2.5 rounded-full font-semibold text-[#085056] text-sm bg-[#b8cc26] hover:bg-[#b8cc26]/80"
//                     whileHover={{ scale: 1.02 }}
//                     whileTap={{ scale: 0.98 }}
//                   >
//                     BSCScan
//                   </motion.button>
//                 </div>
//               </div>
//             </div>
//       {/* Your existing JSX */}
//       <section className="bg-[#085056] py-10 px-4 sm:px-6 lg:px-8">
//         <div className="max-w-6xl mx-auto text-center mb-10">
//           <h2 className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-lime-400 via-green-300 to-emerald-400 uppercase mb-2">
//             LIVE UPDATE
//           </h2>
//         </div>

//         <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-6xl mx-auto">
//           {/* LIVE PRICE */}
//           <div className="bg-[#063c40] border border-[#17bba3] rounded-lg p-6 flex flex-col items-center justify-center text-center shadow-md hover:shadow-lg transition duration-300">
//             <p className="text-white text-sm tracking-wide mb-2 uppercase">
//               LIVE PRICE
//             </p>
//             <div className="flex items-center gap-1">
//               <h3 className="text-2xl sm:text-3xl font-extrabold text-lime-400">
//                 ₹{livePrice}
//               </h3>
//               {/* <TrendingUp className="w-4 h-4 text-lime-400" /> */}
//             </div>
//           </div>

//           {/* SOLD TOKENS */}
//           <div className="bg-[#063c40] border border-[#17bba3] rounded-lg p-6 flex flex-col items-center justify-center text-center shadow-md hover:shadow-lg transition duration-300">
//             <p className="text-white text-sm tracking-wide mb-2 uppercase">
//               SOLD TOKENS
//             </p>
//             <div className="flex items-center gap-1">
//               <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
//                 {soldTokens}
//               </h3>
//               {/* <TrendingUp className="w-4 h-4 text-white" /> */}
//             </div>
//           </div>

//           {/* LIVE MEMBERS */}
//           <div className="bg-[#063c40] border border-[#17bba3] rounded-lg p-6 flex flex-col items-center justify-center text-center shadow-md hover:shadow-lg transition duration-300">
//             <p className="text-white text-sm tracking-wide mb-2 uppercase">
//               LIVE MEMBERS
//             </p>
//             <div className="flex items-center gap-1">
//               <h3 className="text-2xl sm:text-3xl font-extrabold text-emerald-300">
//                 {liveMembers}
//               </h3>
//               {/* <TrendingUp className="w-4 h-4 text-emerald-300" /> */}
//             </div>
//           </div>
//         </div>
//       </section>
//     </>
//   );
// };

// export default HomeAbout;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { useGetRoundQuery } from "../../components/Dashboard/pages/dashBoard/DashboardApliSlice";
import bscscan from "../../assets/image.png";
const HomeAbout = () => {
  const contractAddress = "0xD898d23a082136f4d752e4dE31D8296EaEb94277";
  const [copied, setCopied] = useState(false);
  const navigate = useNavigate();
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  // Fetch data using RTK Query
  const { data: roundData, error, isLoading, refetch } = useGetRoundQuery();

  // Get live rounds (status = 1)
  const liveRounds =
    roundData?.data?.rounds?.filter((round) => round.status === 1) || [];
  const currentRound = liveRounds[0];

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

  // Auto-refresh data every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      refetch();
    }, 30000);
    return () => clearInterval(interval);
  }, [refetch]);

  const formatNumber = (num) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + "M";
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + "K";
    }
    return num.toLocaleString();
  };

  // Default stats data for when API data is loading or unavailable
  const livePrice = currentRound?.atPriceInr || "0.0000";
  const soldTokens = formatNumber(currentRound?.soldQty || 225765326);
  const liveMembers = formatNumber(currentRound?.totalMembers || 24567);

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
    <div className="relative ">
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
            {/* Header Badge */}
            <motion.div
              className="flex justify-center mb-6"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
            >
              <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-[#177338]/20 border border-[#b8cc26]/30">
                <span className="text-[#b8cc26] text-xs font-bold tracking-wider uppercase">
                  Contract Address
                </span>
              </div>
            </motion.div>

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
                    <motion.div
                      animate={{
                        boxShadow: [
                          "0 0 0 0 rgba(184, 204, 38, 0)",
                          "0 0 0 10px rgba(184, 204, 38, 0.2)",
                          "0 0 0 0 rgba(184, 204, 38, 0)",
                        ],
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="w-2 h-2 bg-[#b8cc26] rounded-full"
                    />
                  </div>

                  {/* Address and Actions */}
                  <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-3">
                    {/* Address Box */}
                    <motion.div
                      className="flex-1 bg-black/20 rounded-xl px-4 py-3 border border-[#177338]/30 group hover:border-[#b8cc26]/40 transition-colors"
                      whileHover={{ backgroundColor: "rgba(0,0,0,0.3)" }}
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
                        {copied ? "COPIED" : "COPY"}
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
                          className="drop-shadow-lg"
                        />
                      </motion.button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Live Stats Section */}
          <motion.div
            ref={ref}
            className="mt-8"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {/* Live Update Header */}
            <motion.div
              className="flex items-center justify-center mb-6"
              variants={itemVariants}
            >
              <div className="flex items-center space-x-3">
                <div className="h-[1px] w-8 bg-gradient-to-r from-transparent to-[#b8cc26]"></div>
                <h3 className="text-xl font-bold text-white">
                  LIVE <span className="text-[#b8cc26]">UPDATE</span>
                </h3>
                <div className="h-[1px] w-8 bg-gradient-to-l from-transparent to-[#b8cc26]"></div>
              </div>
            </motion.div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* Price Card */}
              <motion.div
                variants={itemVariants}
                whileHover={{ scale: 1.03, y: -3 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#b8cc26]/20 to-transparent rounded-xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                <div className="relative bg-gradient-to-br from-[#085056] to-[#063c40] rounded-xl border border-[#b8cc26]/20 hover:border-[#b8cc26]/40 transition-colors p-5">
                  <div className="flex justify-between items-start mb-2">
                    <h2 className="text-[10px] font-bold text-[#b8cc26] uppercase tracking-wider">
                      Live Price
                    </h2>
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="w-1.5 h-1.5 bg-[#b8cc26] rounded-full"
                    />
                  </div>
                  <div className="flex items-baseline space-x-1">
                    <span className="text-2xl font-black text-[#b8cc26]">
                      ₹
                    </span>
                    <h2 className="text-3xl font-black text-white">
                      {livePrice}
                    </h2>
                  </div>
                  <div className="mt-2 h-[1px] bg-gradient-to-r from-[#b8cc26]/50 to-transparent"></div>
                </div>
              </motion.div>

              {/* Tokens Card */}
              <motion.div
                variants={itemVariants}
                whileHover={{ scale: 1.03, y: -3 }}
                className="relative group"
              >
                <div className="absolute inset-0  to-transparent rounded-xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                <div className="relative bg-gradient-to-br from-[#085056] to-[#063c40] rounded-xl border border-[#177338]/20 hover:border-[#177338]/40 transition-colors p-5">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-[10px] font-bold text-[#b8cc26] uppercase tracking-wider">
                      Sold Tokens
                    </span>
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                      className="w-1.5 h-1.5 bg-[#177338] rounded-full"
                    />
                  </div>
                  <h2 className="text-3xl font-black text-white">
                    {soldTokens}
                  </h2>
                  <div className="mt-2 h-[1px] bg-gradient-to-r from-[#177338]/50 to-transparent"></div>
                </div>
              </motion.div>

              {/* Members Card */}
              <motion.div
                variants={itemVariants}
                whileHover={{ scale: 1.03, y: -3 }}
                className="relative group"
              >
                <div className="absolute inset-0   to-transparent rounded-xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                <div className="relative  rounded-xl bg-gradient-to-br from-[#085056] to-[#063c40] border border-[#b8cc26]/20 hover:border-[#b8cc26]/40 transition-colors p-5">
                  <div className="flex justify-between items-start mb-2 ">
                    <span className="text-[10px] font-bold text-[#b8cc26] uppercase tracking-wider">
                      Live Members
                    </span>
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                      className="w-1.5 h-1.5 bg-[#b8cc26] rounded-full"
                    />
                  </div>
                  <div className="text-3xl font-black text-white">
                    {liveMembers}
                  </div>
                  <div className="mt-2 h-[1px] bg-gradient-to-r from-[#b8cc26]/50 to-transparent"></div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default HomeAbout;
