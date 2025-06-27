// import React, { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { FaChartLine, FaUsers, FaDollarSign } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";
// import icon from "../../assets/3dcoin.png";

// const CopyToClipboardButton = ({ textToCopy }) => {
//   const [copied, setCopied] = useState(false);

//   const handleCopy = () => {
//     navigator.clipboard.writeText(textToCopy);
//     setCopied(true);
//     setTimeout(() => setCopied(false), 2000);
//   };

//   return (
//     <motion.button
//       onClick={handleCopy}
//       className="ml-4 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-300"
//       whileHover={{ scale: 1.02 }}
//       whileTap={{ scale: 0.98 }}
//     >
//       <AnimatePresence mode="wait">
//         {copied ? (
//           <motion.span
//             key="copied"
//             initial={{ opacity: 0, y: 5 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -5 }}
//           >
//             ✓ Copied
//           </motion.span>
//         ) : (
//           <motion.span
//             key="copy"
//             initial={{ opacity: 0, y: 5 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -5 }}
//           >
//             Copy
//           </motion.span>
//         )}
//       </AnimatePresence>
//     </motion.button>
//   );
// };


// const CoinDisplay = () => (
//   <motion.div
//     className="mb-10 flex justify-center"
//     initial={{ scale: 0, rotate: -180 }}
//     whileInView={{ scale: 1, rotate: 0 }}
//     viewport={{ once: true }}
//     transition={{ duration: 1, type: "spring", bounce: 0.3 }}
//   >
//     <div className="w-64 h-64 sm:w-80 sm:h-80 rounded-full overflow-hidden shadow-2xl flex items-center justify-center bg-white">
//       <iframe
//         src="https://my.spline.design/security-4f17ed732da8f38cc4ab0615c59d5e68/"
//         frameBorder="0"
//         allow="autoplay; fullscreen"
//         className="w-full h-full"
//         title="Jaimax Coin Animation"
//       />
//     </div>
//   </motion.div>
// );

// export default function CryptoStakingSection({
//   contractAddress = "0x742d35Cc6648C25cbEC6900001Cfb3De3Fxxd4f",
//   liveRounds = [{ atPriceUsdt: "0.00012" }],
//   onClickNavigateToAboutUs = () => {}
// }) {
//   const navigate = useNavigate();
//   const metrics = [
//     { icon: <FaDollarSign />, label: "Current Price", value: `$${liveRounds[0].atPriceUsdt}` },
//     { icon: <FaUsers />, label: "Tokens Sold", value: "225.7M" },
//     { icon: <FaChartLine />, label: "Community", value: "24,567" },
//   ];

//   return (
//     <section className="relative bg-gradient-to-b from-black via-gray-900 to-black text-white py-20 px-4 sm:px-10 lg:px-20 overflow-hidden">
//       <div className="absolute top-0 left-0 w-96 h-96 bg-green-400 opacity-20 rounded-full blur-3xl pointer-events-none" />
//       <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-16">
//         <div className="flex-1">
//           <CoinDisplay />
//         </div>

//         <div className="flex-1 space-y-6">
//           <p className="text-green-200 font-semibold text-lg tracking-wide">
//             Your Gateway to Digital Wealth
//           </p>
//           <h1 className="text-5xl md:text-6xl font-extrabold leading-tight bg-gradient-to-r from-green-200 via-white to-green-200 bg-clip-text text-transparent">
//             J COIN
//           </h1>
//           <h2 className="text-green-400 text-3xl md:text-4xl font-bold">About Jaimax</h2>
//           <p className="text-gray-300 leading-relaxed">
//             Jaimax, the most valuable crypto investment app, is dedicated to making crypto accessible in a simple way. Established in 2024, Jaimax has addressed numerous challenges faced by the crypto community, providing solutions for investing, trading, and literacy.
//            <a
//   href="#"
//   onClick={onClickNavigateToAboutUs}
//   className="cursor-pointer text-green-400 hover:text-green-500 font-semibold hover:underline transition-all duration-300 ml-2"
// >
//   READ MORE →
// </a>

//           </p>

//           <div>
//             <h3 className="text-white font-bold text-xl mb-2">Contract Address</h3>
//             <div className="flex flex-wrap items-center bg-gray-800 border border-gray-700 rounded-2xl p-4">
//               <p className="text-green-400 font-mono break-all font-medium text-sm">
//                 {contractAddress}
//               </p>
//               <CopyToClipboardButton textToCopy={contractAddress} />
//             </div>
//           </div>

//           <div className="flex flex-wrap gap-4 mt-6">
//             <button
//               onClick={() => navigate("/images/Jaimax_white_paper.pdf")}
//               className="border border-green-500 text-green-400 hover:bg-green-500 hover:text-white px-6 py-3 rounded-full font-semibold transition-all duration-300"
//             >
//               Read Whitepaper
//             </button>
//           </div>
//         </div>
//       </div>

//       <div className="max-w-7xl mx-auto mt-20 px-4 sm:px-10">
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
//           {metrics.map((item, index) => (
//             <motion.div
//               key={index}
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.6, delay: index * 0.2 }}
//               className="bg-green-900/10 border border-green-500/20 rounded-xl py-6 px-6 flex flex-col items-center text-center hover:bg-green-900/20 transition-all duration-300 shadow-md"
//             >
//               <div className="text-green-400 text-3xl mb-3">{item.icon}</div>
//               <p className="text-lg font-semibold">{item.label}</p>
//               <p className="text-xl font-bold">{item.value}</p>
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }



// import React, { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { FaChartLine, FaUsers, FaDollarSign, FaRocket, FaLock, FaGlobe } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";

// const CopyToClipboardButton = ({ textToCopy }) => {
//   const [copied, setCopied] = useState(false);

//   const handleCopy = () => {
//     navigator.clipboard.writeText(textToCopy);
//     setCopied(true);
//     setTimeout(() => setCopied(false), 2000);
//   };

//   return (
//     <motion.button
//       onClick={handleCopy}
//       className="ml-4 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-6 py-2.5 rounded-lg font-medium transition-all duration-300 shadow-lg hover:shadow-xl"
//       whileHover={{ scale: 1.02, y: -2 }}
//       whileTap={{ scale: 0.98 }}
//       initial={{ opacity: 0, x: 20 }}
//       animate={{ opacity: 1, x: 0 }}
//       transition={{ delay: 0.5 }}
//     >
//       <AnimatePresence mode="wait">
//         {copied ? (
//           <motion.span
//             key="copied"
//             initial={{ opacity: 0, rotateX: -90 }}
//             animate={{ opacity: 1, rotateX: 0 }}
//             exit={{ opacity: 0, rotateX: 90 }}
//             className="flex items-center gap-2"
//           >
//             <motion.span
//               initial={{ scale: 0 }}
//               animate={{ scale: 1 }}
//               transition={{ type: "spring", stiffness: 500 }}
//             >
//               ✓
//             </motion.span>
//             Copied!
//           </motion.span>
//         ) : (
//           <motion.span
//             key="copy"
//             initial={{ opacity: 0, rotateX: -90 }}
//             animate={{ opacity: 1, rotateX: 0 }}
//             exit={{ opacity: 0, rotateX: 90 }}
//           >
//             Copy Address
//           </motion.span>
//         )}
//       </AnimatePresence>
//     </motion.button>
//   );
// };

// const FloatingElements = () => (
//   <>
//     <motion.div
//       className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-emerald-400/20 to-teal-400/20 rounded-full blur-xl"
//       animate={{
//         y: [0, -20, 0],
//         x: [0, 10, 0],
//         scale: [1, 1.1, 1],
//       }}
//       transition={{
//         duration: 6,
//         repeat: Infinity,
//         ease: "easeInOut",
//       }}
//     />
//     <motion.div
//       className="absolute top-60 right-20 w-24 h-24 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-xl"
//       animate={{
//         y: [0, 15, 0],
//         x: [0, -15, 0],
//         scale: [1, 0.9, 1],
//       }}
//       transition={{
//         duration: 8,
//         repeat: Infinity,
//         ease: "easeInOut",
//         delay: 2,
//       }}
//     />
//     <motion.div
//       className="absolute bottom-40 left-1/4 w-20 h-20 bg-gradient-to-r from-green-400/20 to-emerald-400/20 rounded-full blur-xl"
//       animate={{
//         y: [0, -10, 0],
//         x: [0, 20, 0],
//         scale: [1, 1.2, 1],
//       }}
//       transition={{
//         duration: 7,
//         repeat: Infinity,
//         ease: "easeInOut",
//         delay: 4,
//       }}
//     />
//   </>
// );

// const MetricCard = ({ item, index }) => (
//   <motion.div
//     initial={{ opacity: 0, y: 60, scale: 0.8 }}
//     whileInView={{ opacity: 1, y: 0, scale: 1 }}
//     viewport={{ once: true, margin: "-100px" }}
//     transition={{ 
//       duration: 0.8, 
//       delay: index * 0.1,
//       type: "spring",
//       stiffness: 100
//     }}
//     whileHover={{ 
//       y: -8,
//       transition: { duration: 0.3 }
//     }}
//     className="group relative bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8 hover:border-emerald-500/50 transition-all duration-500 shadow-xl hover:shadow-2xl overflow-hidden"
//   >
//     {/* Hover glow effect */}
//     <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/5 to-teal-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

//     <div className="relative z-10">
//       <motion.div 
//         className="text-emerald-400 text-4xl mb-4 flex justify-center"
//         whileHover={{ 
//           scale: 1.1, 
//           rotate: 5,
//           transition: { type: "spring", stiffness: 300 }
//         }}
//       >
//         {item.icon}
//       </motion.div>
//       <motion.p 
//         className="text-slate-300 text-lg font-medium mb-2 text-center"
//         initial={{ opacity: 0 }}
//         whileInView={{ opacity: 1 }}
//         transition={{ delay: index * 0.1 + 0.3 }}
//       >
//         {item.label}
//       </motion.p>
//       <motion.p 
//         className="text-white text-2xl font-bold text-center"
//         initial={{ opacity: 0, scale: 0.5 }}
//         whileInView={{ opacity: 1, scale: 1 }}
//         transition={{ 
//           delay: index * 0.1 + 0.5,
//           type: "spring",
//           stiffness: 200
//         }}
//       >
//         {item.value}
//       </motion.p>
//     </div>
//   </motion.div>
// );

// export default function CryptoStakingSection({
//   contractAddress = "0x742d35Cc6648C25cbEC6900001Cfb3De3Fxxd4f",
//   liveRounds = [{ atPriceUsdt: "0.00012" }],
//   onClickNavigateToAboutUs = () => {}
// }) {
//   const navigate = useNavigate();

//   const metrics = [
//     { icon: <FaDollarSign />, label: "Current Price", value: `$${liveRounds[0].atPriceUsdt}` },
//     { icon: <FaUsers />, label: "Tokens Sold", value: "225.7M" },
//     { icon: <FaChartLine />, label: "Community", value: "24,567" },
//     { icon: <FaRocket />, label: "Market Cap", value: "$2.8M" },
//     { icon: <FaLock />, label: "Security Score", value: "98%" },
//     { icon: <FaGlobe />, label: "Global Reach", value: "45 Countries" },
//   ];

//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         duration: 0.8,
//         staggerChildren: 0.2
//       }
//     }
//   };

//   const itemVariants = {
//     hidden: { opacity: 0, y: 30 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: {
//         duration: 0.6,
//         ease: "easeOut"
//       }
//     }
//   };

//   return (
//     <section className="relative  text-white py-24 px-4 sm:px-10 lg:px-20 overflow-hidden min-h-screen"style={{backgroundImage:"url('https://ninetheme.com/themes/cryptoland/wp-content/uploads/2018/10/team-bg.png')",backgroundRepeat:'no-repeat'}}
//     >

//       <motion.div 
//         className="max-w-7xl mx-auto relative z-10"
//         variants={containerVariants}
//         initial="hidden"
//         animate="visible"
//       >
//         {/* Hero Section */}
//         <div className="text-center mb-20">
//           <motion.div
//             variants={itemVariants}
//             className="inline-block"
//           >
//             <span className="inline-block bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-6 py-2 rounded-full text-sm font-semibold mb-6 shadow-lg">
//               NEXT GENERATION CRYPTO
//             </span>
//           </motion.div>

//           <motion.h1 
//             variants={itemVariants}
//             className="text-6xl md:text-7xl lg:text-8xl font-extrabold leading-tight mb-6"
//           >
//             <span className="bg-gradient-to-r from-emerald-200 via-white to-teal-200 bg-clip-text text-transparent">
//               J COIN
//             </span>
//           </motion.h1>

//           <motion.h2 
//             variants={itemVariants}
//             className="text-emerald-400 text-4xl md:text-5xl font-bold mb-8"
//           >
//             Revolutionizing Digital Finance
//           </motion.h2>

//           <motion.p 
//             variants={itemVariants}
//             className="text-slate-300 text-xl leading-relaxed max-w-4xl mx-auto mb-8"
//           >
//             Jaimax represents the pinnacle of cryptocurrency innovation, providing institutional-grade security 
//             and accessibility for the modern investor. Since 2024, we've been pioneering solutions that bridge 
//             traditional finance with the decentralized future.
//           </motion.p>

//           <motion.div
//             variants={itemVariants}
//             className="inline-block"
//           >
//             <motion.button
//               onClick={onClickNavigateToAboutUs}
//               className="text-emerald-400 hover:text-emerald-300 font-semibold text-lg group cursor-pointer transition-all duration-300"
//               whileHover={{ x: 10 }}
//             >
//               Discover Our Story
//               <motion.span 
//                 className="inline-block ml-2"
//                 animate={{ x: [0, 5, 0] }}
//                 transition={{ duration: 1.5, repeat: Infinity }}
//               >
//                 →
//               </motion.span>
//             </motion.button>
//           </motion.div>
//         </div>

//         {/* Contract Address Section */}
//         <motion.div 
//           variants={itemVariants}
//           className="mb-20"
//         >
//           <div className="max-w-4xl mx-auto">
//             <h3 className="text-white font-bold text-2xl mb-6 text-center">Contract Address</h3>
//             <motion.div 
//               className="bg-gradient-to-r from-slate-800/80 to-slate-700/80 backdrop-blur-sm border border-slate-600/50 rounded-2xl p-6 shadow-2xl"
//               whileHover={{ scale: 1.02 }}
//               transition={{ type: "spring", stiffness: 300 }}
//             >
//               <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
//                 <motion.p 
//                   className="text-emerald-400 font-mono break-all font-medium text-lg flex-1"
//                   initial={{ opacity: 0, x: -20 }}
//                   animate={{ opacity: 1, x: 0 }}
//                   transition={{ delay: 0.3 }}
//                 >
//                   {contractAddress}
//                 </motion.p>
//                 <CopyToClipboardButton textToCopy={contractAddress} />
//               </div>
//             </motion.div>
//           </div>
//         </motion.div>

//         {/* Metrics Grid */}
//         <motion.div 
//           variants={itemVariants}
//           className="mb-16"
//         >
//           <h3 className="text-white font-bold text-3xl mb-12 text-center">Platform Metrics</h3>
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
//             {metrics.map((item, index) => (
//               <MetricCard key={index} item={item} index={index} />
//             ))}
//           </div>
//         </motion.div>

//         {/* CTA Section */}
//         <motion.div 
//           variants={itemVariants}
//           className="text-center"
//         >
//           <motion.button
//             onClick={() => navigate("/images/Jaimax_white_paper.pdf")}
//             className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-12 py-4 rounded-full font-bold text-lg shadow-2xl transition-all duration-300"
//             whileHover={{ 
//               scale: 1.05,
//               boxShadow: "0 20px 40px rgba(16, 185, 129, 0.3)"
//             }}
//             whileTap={{ scale: 0.95 }}
//           >
//             <motion.span
//               className="flex items-center gap-3"
//               whileHover={{ x: 5 }}
//             >
//               Read Whitepaper
//               <FaRocket className="text-xl" />
//             </motion.span>
//           </motion.button>
//         </motion.div>
//       </motion.div>
//     </section>
//   );
// }

// import React, { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { FaChartLine, FaUsers, FaDollarSign } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";

// const CopyToClipboardButton = ({ textToCopy }) => {
//   const [copied, setCopied] = useState(false);

//   const handleCopy = () => {
//     navigator.clipboard.writeText(textToCopy);
//     setCopied(true);
//     setTimeout(() => setCopied(false), 2000);
//   };

//   return (
//     <motion.button
//       onClick={handleCopy}
//       className="ml-4 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-300"
//       whileHover={{ scale: 1.02 }}
//       whileTap={{ scale: 0.98 }}
//     >
//       <AnimatePresence mode="wait">
//         {copied ? (
//           <motion.span
//             key="copied"
//             initial={{ opacity: 0, y: 5 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -5 }}
//           >
//             ✓ Copied
//           </motion.span>
//         ) : (
//           <motion.span
//             key="copy"
//             initial={{ opacity: 0, y: 5 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -5 }}
//           >
//             Copy
//           </motion.span>
//         )}
//       </AnimatePresence>
//     </motion.button>
//   );
// };

// const CoinDisplay = () => (
//   <motion.div
//     className="mb-10 flex justify-center"
//     initial={{ scale: 0, rotate: -180 }}
//     whileInView={{ scale: 1, rotate: 0 }}
//     viewport={{ once: true }}
//     transition={{ duration: 1, type: "spring", bounce: 0.3 }}
//   >
//     <div className="w-64 h-64 sm:w-80 sm:h-80 rounded-full overflow-hidden shadow-2xl flex items-center justify-center bg-white">
//       <iframe
//         src="https://my.spline.design/security-4f17ed732da8f38cc4ab0615c59d5e68/"
//         frameBorder="0"
//         allow="autoplay; fullscreen"
//         title="Jaimax Coin Animation"
//         className="w-full h-full"
//         style={{ pointerEvents: "none" }}
//       />
//     </div>
//   </motion.div>
// );


// export default function CryptoStakingSection({
//   contractAddress = "0x742d35Cc6648C25cbEC6900001Cfb3De3Fxxd4f",
//   liveRounds = [{ atPriceUsdt: "0.00012" }],
//   onClickNavigateToAboutUs = () => {},
// }) {
//   const navigate = useNavigate();
//   const metrics = [
//     { icon: <FaDollarSign />, label: "Current Price", value: `$${liveRounds[0].atPriceUsdt}` },
//     { icon: <FaUsers />, label: "Tokens Sold", value: "225.7M" },
//     { icon: <FaChartLine />, label: "Community", value: "24,567" },
//   ];

//   return (
//     <section className="relative bg-gradient-to-b from-black via-gray-900 to-black text-white py-20 px-4 sm:px-10 lg:px-20 overflow-hidden">
//       <div className="absolute top-0 left-0 w-96 h-96 bg-green-400 opacity-20 rounded-full blur-3xl pointer-events-none" />
//       <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-16">
//         <div className="flex-1">
//           <CoinDisplay />
//         </div>

//         <div className="flex-1 space-y-6">
//           <p className="text-green-200 font-semibold text-lg tracking-wide">
//             Your Gateway to Digital Wealth
//           </p>
//           <h1 className="text-5xl md:text-6xl font-extrabold leading-tight bg-gradient-to-r from-green-200 via-white to-green-200 bg-clip-text text-transparent">
//             J COIN
//           </h1>
//           <h2 className="text-green-400 text-3xl md:text-4xl font-bold">About Jaimax</h2>
//           <p className="text-gray-300 leading-relaxed">
//             Jaimax, the most valuable crypto investment app, is dedicated to making crypto accessible in a simple way. Established in 2024, Jaimax has addressed numerous challenges faced by the crypto community, providing solutions for investing, trading, and literacy.
//             <a
//               href="#"
//               onClick={onClickNavigateToAboutUs}
//               className="cursor-pointer text-green-400 hover:text-green-500 font-semibold hover:underline transition-all duration-300 ml-2"
//             >
//               READ MORE →
//             </a>
//           </p>

//           <div>
//             <h3 className="text-white font-bold text-xl mb-2">Contract Address</h3>
//             <div className="flex flex-wrap items-center bg-gray-800 border border-gray-700 rounded-2xl p-4">
//               <p className="text-green-400 font-mono break-all font-medium text-sm">
//                 {contractAddress}
//               </p>
//               <CopyToClipboardButton textToCopy={contractAddress} />
//             </div>
//           </div>

//           <div className="flex flex-wrap gap-4 mt-6">
//             <button
//               onClick={() => navigate("/images/Jaimax_white_paper.pdf")}
//               className="border border-green-500 text-green-400 hover:bg-green-500 hover:text-white px-6 py-3 rounded-full font-semibold transition-all duration-300"
//             >
//               Read Whitepaper
//             </button>
//           </div>
//         </div>
//       </div>

//       <div className="max-w-7xl mx-auto mt-20 px-4 sm:px-10">
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
//           {metrics.map((item, index) => (
//             <motion.div
//               key={index}
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.6, delay: index * 0.2 }}
//               className="bg-green-900/10 border border-green-500/20 rounded-xl py-6 px-6 flex flex-col items-center text-center hover:bg-green-900/20 transition-all duration-300 shadow-md"
//             >
//               <div className="text-green-400 text-3xl mb-3">{item.icon}</div>
//               <p className="text-lg font-semibold">{item.label}</p>
//               <p className="text-xl font-bold">{item.value}</p>
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

// import React, { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { FaChartLine, FaUsers, FaDollarSign } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";

// const CopyToClipboardButton = ({ textToCopy }) => {
//   const [copied, setCopied] = useState(false);

//   const handleCopy = () => {
//     navigator.clipboard.writeText(textToCopy);
//     setCopied(true);
//     setTimeout(() => setCopied(false), 2000);
//   };

//   return (
//     <motion.button
//       onClick={handleCopy}
//       className="ml-4 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-300"
//       whileHover={{ scale: 1.02 }}
//       whileTap={{ scale: 0.98 }}
//     >
//       <AnimatePresence mode="wait">
//         {copied ? (
//           <motion.span
//             key="copied"
//             initial={{ opacity: 0, y: 5 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -5 }}
//           >
//             ✓ Copied
//           </motion.span>
//         ) : (
//           <motion.span
//             key="copy"
//             initial={{ opacity: 0, y: 5 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -5 }}
//           >
//             Copy
//           </motion.span>
//         )}
//       </AnimatePresence>
//     </motion.button>
//   );
// };

// const CoinDisplay = () => (
//   <motion.div
//     className="mb-10 flex justify-center"
//     initial={{ scale: 0, rotate: -180 }}
//     whileInView={{ scale: 1, rotate: 0 }}
//     viewport={{ once: true }}
//     transition={{ duration: 1, type: "spring", bounce: 0.3 }}
//   >
//     <div className="w-100 h-100 sm:w-80 sm:h-80  overflow-hidden flex items-center justify-center">
//       <iframe
//         src="https://my.spline.design/security-4f17ed732da8f38cc4ab0615c59d5e68/"
//         frameBorder="0"
//         allow="autoplay; fullscreen"
//         title="Jaimax Coin Animation"
//         className="w-full h-full"
//         style={{ pointerEvents: "none" }}
//       />
//     </div>
//   </motion.div>
// );

// export default function CryptoStakingSection({
//   contractAddress = "0x742d35Cc6648C25cbEC6900001Cfb3De3Fxxd4f",
//   liveRounds = [{ atPriceUsdt: "0.00012" }],
//   onClickNavigateToAboutUs = () => {},
// }) {
//   const navigate = useNavigate();
//   const metrics = [
//     { icon: <FaDollarSign />, label: "Current Price", value: `$${liveRounds[0].atPriceUsdt}` },
//     { icon: <FaUsers />, label: "Tokens Sold", value: "225.7M" },
//     { icon: <FaChartLine />, label: "Community", value: "24,567" },
//   ];

//   return (
//     <section className="relative bg-gradient-to-b from-black via-gray-900 to-black text-white py-20 px-4 sm:px-10 lg:px-20 overflow-hidden">
//       <div className="absolute top-0 left-0 w-96 h-96 bg-green-400 opacity-20 rounded-full blur-3xl pointer-events-none" />
//       <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-16">
//         {/* Left side: Spline Animation */}
//         <div className="flex-1 flex justify-center">
//           <CoinDisplay />
//         </div>

//         {/* Right side: Text Content */}
//         <div className="flex-1 space-y-6">
//           <p className="text-green-200 font-semibold text-lg tracking-wide">
//             Your Gateway to Digital Wealth
//           </p>
//           <h1 className="text-5xl md:text-6xl font-extrabold leading-tight bg-gradient-to-r from-green-200 via-white to-green-200 bg-clip-text text-transparent">
//             J COIN
//           </h1>
//           <h2 className="text-green-400 text-3xl md:text-4xl font-bold">About Jaimax</h2>
//           <p className="text-gray-300 leading-relaxed">
//             Jaimax, the most valuable crypto investment app, is dedicated to making crypto accessible in a simple way. Established in 2024, Jaimax has addressed numerous challenges faced by the crypto community, providing solutions for investing, trading, and literacy.
//             <a
//               href="#"
//               onClick={onClickNavigateToAboutUs}
//               className="cursor-pointer text-green-400 hover:text-green-500 font-semibold hover:underline transition-all duration-300 ml-2"
//             >
//               READ MORE →
//             </a>
//           </p>

//           <div>
//             <h3 className="text-white font-bold text-xl mb-2">Contract Address</h3>
//             <div className="flex flex-wrap items-center bg-gray-800 border border-gray-700 rounded-2xl p-4">
//               <p className="text-green-400 font-mono break-all font-medium text-sm">
//                 {contractAddress}
//               </p>
//               <CopyToClipboardButton textToCopy={contractAddress} />
//             </div>
//           </div>

//           <div className="flex flex-wrap gap-4 mt-6">
//             <button
//               onClick={() => navigate("/images/Jaimax_white_paper.pdf")}
//               className="border border-green-500 text-green-400 hover:bg-green-500 hover:text-white px-6 py-3 rounded-full font-semibold transition-all duration-300"
//             >
//               Read Whitepaper
//             </button>
//           </div>
//         </div>
//       </div>

//       <div className="max-w-7xl mx-auto mt-20 px-4 sm:px-10">
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
//           {metrics.map((item, index) => (
//             <motion.div
//               key={index}
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.6, delay: index * 0.2 }}
//               className="bg-green-900/10 border border-green-500/20 rounded-xl py-6 px-6 flex flex-col items-center text-center hover:bg-green-900/20 transition-all duration-300 shadow-md"
//             >
//               <div className="text-green-400 text-3xl mb-3">{item.icon}</div>
//               <p className="text-lg font-semibold">{item.label}</p>
//               <p className="text-xl font-bold">{item.value}</p>
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

// import React, { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { FaChartLine, FaUsers, FaDollarSign } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";

// const CopyToClipboardButton = ({ textToCopy }) => {
//   const [copied, setCopied] = useState(false);

//   const handleCopy = () => {
//     navigator.clipboard.writeText(textToCopy);
//     setCopied(true);
//     setTimeout(() => setCopied(false), 2000);
//   };

//   return (
//     <motion.button
//       onClick={handleCopy}
//       className="ml-4 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-300"
//       whileHover={{ scale: 1.02 }}
//       whileTap={{ scale: 0.98 }}
//     >
//       <AnimatePresence mode="wait">
//         {copied ? (
//           <motion.span
//             key="copied"
//             initial={{ opacity: 0, y: 5 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -5 }}
//           >
//             ✓ Copied
//           </motion.span>
//         ) : (
//           <motion.span
//             key="copy"
//             initial={{ opacity: 0, y: 5 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -5 }}
//           >
//             Copy
//           </motion.span>
//         )}
//       </AnimatePresence>
//     </motion.button>
//   );
// };

// const CoinDisplay = () => (
//   <motion.div
//     className="mb-10 flex justify-center"
//     initial={{ scale: 0, rotate: -180 }}
//     whileInView={{ scale: 1, rotate: 0 }}
//     viewport={{ once: true }}
//     transition={{ duration: 1, type: "spring", bounce: 0.3 }}
//   >
//     {/* Hidden on mobile (below md breakpoint), visible on md+ */}
//     <div className="hidden md:flex w-[320px] md:w-[400px] lg:w-[480px] h-[320px] md:h-[400px] lg:h-[480px] overflow-hidden flex items-center justify-center">
//       <iframe
//         src="https://my.spline.design/security-4f17ed732da8f38cc4ab0615c59d5e68/"
//         frameBorder="0"
//         allow="autoplay; fullscreen"
//         title="Jaimax Coin Animation"
//         className="w-full h-full"
//         style={{ pointerEvents: "none" }}
//       />
//     </div>
//   </motion.div>
// );

// export default function CryptoStakingSection({
//   contractAddress = "0x742d35Cc6648C25cbEC6900001Cfb3De3Fxxd4f",
//   liveRounds = [{ atPriceUsdt: "0.00012" }],
//   onClickNavigateToAboutUs = () => { },
// }) {
//   const navigate = useNavigate();
//   const metrics = [
//     { icon: <FaDollarSign />, label: "Current Price", value: `$${liveRounds[0].atPriceUsdt}` },
//     { icon: <FaUsers />, label: "Tokens Sold", value: "225.7M" },
//     { icon: <FaChartLine />, label: "Community", value: "24,567" },
//   ];

//   return (
//     <section className="relative bg-gradient-to-b from-black via-gray-900 to-black text-white py-20 px-4 sm:py-1 lg:px-20 overflow-hidden">
//       <div className="absolute top-0 left-0 w-96 h-96 bg-green-400 opacity-20 rounded-full blur-3xl pointer-events-none" />
//       <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-16">
//         {/* Left side: Spline Animation - hidden on mobile */}
//         <div className="flex-1 flex justify-center">
//           <CoinDisplay />
//         </div>

//         {/* Right side: Text Content */}
//         <div className="flex-1 space-y-6">
//           <p className="text-green-200 font-semibold text-lg tracking-wide">
//             Your Gateway to Digital Wealth
//           </p>
//           <h1 className="text-5xl md:text-6xl font-extrabold leading-tight bg-gradient-to-r from-green-200 via-white to-green-200 bg-clip-text text-transparent">
//             J COIN
//           </h1>
//           <h2 className="text-green-400 text-3xl md:text-4xl font-bold">About Jaimax</h2>
//           <p className="text-gray-300 leading-relaxed">
//             Jaimax, the most valuable crypto investment app, is dedicated to making crypto accessible in a simple way. Established in 2024, Jaimax has addressed numerous challenges faced by the crypto community, providing solutions for investing, trading, and literacy.
//             <a
//               href="#"
//               onClick={onClickNavigateToAboutUs}
//               className="cursor-pointer text-green-400 hover:text-green-500 font-semibold hover:underline transition-all duration-300 ml-2"
//             >
//               READ MORE →
//             </a>
//           </p>
//           <div className="flex items-center justify-between bg-gray-800 border border-gray-700 rounded-2xl p-4">
//             <p className="text-green-400 font-mono font-medium text-sm truncate max-w-[180px] sm:max-w-full">
//               {contractAddress}
//             </p>
//             <CopyToClipboardButton textToCopy={contractAddress} />
//           </div>



//           <div className="flex flex-wrap gap-4 mt-6">
//             <button
//               onClick={() => navigate("/images/Jaimax_white_paper.pdf")}
//               className="border border-green-500 text-green-400 hover:bg-green-500 hover:text-white px-6 py-3 rounded-full font-semibold transition-all duration-300"
//             >
//               Read Whitepaper
//             </button>
//           </div>
//         </div>
//       </div>

//       <div className="max-w-7xl mx-auto mt-20 px-4 sm:px-10">
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
//           {metrics.map((item, index) => (
//             <motion.div
//               key={index}
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.6, delay: index * 0.2 }}
//               className="bg-green-900/10 border border-green-500/20 rounded-xl py-6 px-6 flex flex-col items-center text-center hover:bg-green-900/20 transition-all duration-300 shadow-md"
//             >
//               <div className="text-green-400 text-3xl mb-3">{item.icon}</div>
//               <p className="text-lg font-semibold">{item.label}</p>
//               <p className="text-xl font-bold">{item.value}</p>
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChartLine, FaUsers, FaDollarSign } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const CopyToClipboardButton = ({ textToCopy }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.button
      onClick={handleCopy}
      className="ml-2 sm:ml-4 bg-green-600 hover:bg-green-700 text-white px-3 py-2 sm:px-4 sm:py-2 rounded-lg font-medium transition-all duration-300 text-sm sm:text-base flex-shrink-0"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <AnimatePresence mode="wait">
        {copied ? (
          <motion.span
            key="copied"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
          >
            ✓ Copied
          </motion.span>
        ) : (
          <motion.span
            key="copy"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
          >
            Copy
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
};

const CoinDisplay = () => (
  <motion.div
    className="mb-6 lg:mb-10 flex justify-center"
    initial={{ scale: 0, rotate: -180 }}
    whileInView={{ scale: 1, rotate: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 1, type: "spring", bounce: 0.3 }}
  >
    {/* Hidden on mobile (below md breakpoint), visible on md+ */}
    <div className="hidden md:flex w-[300px] md:w-[350px] lg:w-[400px] xl:w-[480px] h-[300px] md:h-[350px] lg:h-[400px] xl:h-[480px] overflow-hidden items-center justify-center">
      <iframe
        src="https://my.spline.design/security-4f17ed732da8f38cc4ab0615c59d5e68/"
        frameBorder="0"
        allow="autoplay; fullscreen"
        title="Jaimax Coin Animation"
        className="w-full h-full"
        style={{ pointerEvents: "none" }}
      />
    </div>
  </motion.div>
);

export default function CryptoStakingSection({
  contractAddress = "0x742d35Cc6648C25cbEC6900001Cfb3De3Fxxd4f",
  liveRounds = [{ atPriceUsdt: "0.00012" }],
  // onClickNavigateToAboutUs = () => { },
}) {
  const navigate = useNavigate();
   const onClickNavigateToAboutUs = () => { 
    navigate("/blog")
   }
  const metrics = [
    { icon: <FaDollarSign />, label: "Current Price", value: `$${liveRounds[0].atPriceUsdt}` },
    { icon: <FaUsers />, label: "Tokens Sold", value: "225.7M" },
    { icon: <FaChartLine />, label: "Community", value: "24,567" },
  ];

  return (
    <section className="relative bg-gradient-to-b from-black via-gray-900 to-black text-white py-8 sm:py-12 md:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 xl:px-20 overflow-hidden">
      {/* Background blur effect */}
      <div className="absolute top-0 left-0 w-64 sm:w-96 h-64 sm:h-96 bg-green-400 opacity-20 rounded-full blur-3xl pointer-events-none" />
      
      <div className="max-w-7xl mx-auto">
        {/* Main content container */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-16">
          {/* Left side: Spline Animation - hidden on mobile (below md) */}
          <div className="flex-1 flex justify-center order-2 lg:order-1">
            <CoinDisplay />
          </div>

          {/* Right side: Text Content */}
          <div className="flex-1 space-y-4 sm:space-y-6 order-1 lg:order-2 text-center lg:text-left">
            <p className="text-green-200 font-semibold text-base sm:text-lg tracking-wide">
              Your Gateway to Digital Wealth
            </p>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight bg-gradient-to-r from-green-200 via-white to-green-200 bg-clip-text text-transparent">
              J COIN
            </h1>
            
            <h2 className="text-green-400 text-2xl sm:text-3xl md:text-4xl font-bold">
              About Jaimax
            </h2>
            
            <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
              Jaimax, the most valuable crypto investment app, is dedicated to making crypto accessible in a simple way. Established in 2024, Jaimax has addressed numerous challenges faced by the crypto community, providing solutions for investing, trading, and literacy.
              <a
                href="#"
                onClick={onClickNavigateToAboutUs}
                className="cursor-pointer text-green-400 hover:text-green-500 font-semibold hover:underline transition-all duration-300 ml-2 inline-block sm:inline"
              >
                READ MORE →
              </a>
            </p>
            
            {/* Contract Address */}
            <div className="flex flex-col sm:flex-row items-center justify-between bg-gray-800 border border-gray-700 rounded-2xl p-3 sm:p-4 gap-3 sm:gap-0">
              <p className="text-green-400 font-mono font-medium text-xs sm:text-sm break-all sm:truncate sm:max-w-[60%] lg:max-w-[70%]">
                {contractAddress}
              </p>
              <CopyToClipboardButton textToCopy={contractAddress} />
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3 sm:gap-4 mt-4 sm:mt-6 justify-center lg:justify-start">
              <button
                onClick={() => navigate("/images/Jaimax_white_paper.pdf")}
                className="border border-green-500 text-green-400 hover:bg-green-500 hover:text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full font-semibold transition-all duration-300 text-sm sm:text-base"
              >
                Read Whitepaper
              </button>
            </div>
          </div>
        </div>

        {/* Metrics Section */}
        <div className="mt-12 sm:mt-16 lg:mt-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {metrics.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="bg-green-900/10 border border-green-500/20 rounded-xl py-4 sm:py-6 px-4 sm:px-6 flex flex-col items-center text-center hover:bg-green-900/20 transition-all duration-300 shadow-md"
              >
                <div className="text-green-400 text-2xl sm:text-3xl mb-2 sm:mb-3">
                  {item.icon}
                </div>
                <p className="text-base sm:text-lg font-semibold mb-1">
                  {item.label}
                </p>
                <p className="text-lg sm:text-xl font-bold">
                  {item.value}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}