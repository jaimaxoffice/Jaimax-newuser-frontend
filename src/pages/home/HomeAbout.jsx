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
//       className="ml-2 sm:ml-4 bg-green-600 hover:bg-green-700 text-white px-3 py-2 sm:px-4 sm:py-2 rounded-lg font-medium transition-all duration-300 text-sm sm:text-base flex-shrink-0"
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
//     className="mb-6 lg:mb-10 flex justify-center"
//     initial={{ scale: 0, rotate: -180 }}
//     whileInView={{ scale: 1, rotate: 0 }}
//     viewport={{ once: true }}
//     transition={{ duration: 1, type: "spring", bounce: 0.3 }}
//   >
//     {/* Hidden on mobile (below md breakpoint), visible on md+ */}
//     <div className="hidden md:flex w-[300px] md:w-[350px] lg:w-[400px] xl:w-[480px] h-[300px] md:h-[350px] lg:h-[400px] xl:h-[480px] overflow-hidden items-center justify-center">
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
//   // onClickNavigateToAboutUs = () => { },
// }) {
//   const navigate = useNavigate();
//    const onClickNavigateToAboutUs = () => { 
//     navigate("/blog")
//    }
//   const metrics = [
//     { icon: <FaDollarSign />, label: "Current Price", value: `$${liveRounds[0].atPriceUsdt}` },
//     { icon: <FaUsers />, label: "Tokens Sold", value: "225.7M" },
//     { icon: <FaChartLine />, label: "Community", value: "24,567" },
//   ];

//   return (
//     <section className="relative  text-white py-8 sm:py-12 md:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 xl:px-20 overflow-hidden">
//       {/* Background blur effect */}
//       <div className="absolute top-0 left-0 w-64 sm:w-96 h-64 sm:h-96 bg-green-400 opacity-20 rounded-full blur-3xl pointer-events-none" />

//       <div className="max-w-7xl mx-auto">
//         {/* Main content container */}
//         <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-16">
//           {/* Left side: Spline Animation - hidden on mobile (below md) */}
//           <div className="flex-1 flex justify-center order-2 lg:order-1">
//             {/* <CoinDisplay /> */}
//             <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1leb85WofOlN6KWXP0nIchbawzZg4lDq0eg&s" alt="" />
//           </div>

//           {/* Right side: Text Content */}
//           <div className="flex-1 space-y-4 sm:space-y-6 order-1 lg:order-2 text-center lg:text-left">
//             <p className="text-green-200 font-semibold text-base sm:text-lg tracking-wide">
//               Your Gateway to Digital Wealth
//             </p>

//             <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight bg-gradient-to-r from-green-200 via-white to-green-200 bg-clip-text text-transparent">
//               J COIN
//             </h1>

//             <h2 className="text-green-400 text-2xl sm:text-3xl md:text-4xl font-bold">
//               About Jaimax
//             </h2>

//             <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
//               Jaimax, the most valuable crypto investment app, is dedicated to making crypto accessible in a simple way. Established in 2024, Jaimax has addressed numerous challenges faced by the crypto community, providing solutions for investing, trading, and literacy.
//               <a
//                 href="#"
//                 onClick={onClickNavigateToAboutUs}
//                 className="cursor-pointer text-green-400 hover:text-green-500 font-semibold hover:underline transition-all duration-300 ml-2 inline-block sm:inline"
//               >
//                 READ MORE →
//               </a>
//             </p>

//             {/* Contract Address */}
//             <div className="flex flex-col sm:flex-row items-center justify-between bg-gray-800 border border-gray-700 rounded-2xl p-3 sm:p-4 gap-3 sm:gap-0">
//               <p className="text-green-400 font-mono font-medium text-xs sm:text-sm break-all sm:truncate sm:max-w-[60%] lg:max-w-[70%]">
//                 {contractAddress}
//               </p>
//               <CopyToClipboardButton textToCopy={contractAddress} />
//             </div>

//             {/* Action Buttons */}
//             <div className="flex flex-wrap gap-3 sm:gap-4 mt-4 sm:mt-6 justify-center lg:justify-start">
//               <button
//                 onClick={() => navigate("/images/Jaimax_white_paper.pdf")}
//                 className="border border-green-500 text-green-400 hover:bg-green-500 hover:text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full font-semibold transition-all duration-300 text-sm sm:text-base"
//               >
//                 Read Whitepaper
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Metrics Section */}
//         <div className="mt-12 sm:mt-16 lg:mt-20">
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
//             {metrics.map((item, index) => (
//               <motion.div
//                 key={index}
//                 initial={{ opacity: 0, y: 20 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true }}
//                 transition={{ duration: 0.6, delay: index * 0.2 }}
//                 className="bg-green-900/10 border border-green-500/20 rounded-xl py-4 sm:py-6 px-4 sm:px-6 flex flex-col items-center text-center hover:bg-green-900/20 transition-all duration-300 shadow-md"
//               >
//                 <div className="text-green-400 text-2xl sm:text-3xl mb-2 sm:mb-3">
//                   {item.icon}
//                 </div>
//                 <p className="text-base sm:text-lg font-semibold mb-1">
//                   {item.label}
//                 </p>
//                 <p className="text-lg sm:text-xl font-bold">
//                   {item.value}
//                 </p>
//               </motion.div>
//             ))}
//           </div>
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
//       className="ml-2 sm:ml-4 bg-green-600 hover:bg-green-700 text-white px-3 py-2 sm:px-4 sm:py-2 rounded-lg font-medium transition-all duration-300 text-sm sm:text-base flex-shrink-0"
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

// // This component is currently not being used, but is kept for reference as it was in the original code.
// // If you intend to use the Spline animation, uncomment the relevant sections in CryptoStakingSection.
// const CoinDisplay = () => (
//   <motion.div
//     className="mb-6 lg:mb-10 flex justify-center"
//     initial={{ scale: 0, rotate: -180 }}
//     whileInView={{ scale: 1, rotate: 0 }}
//     viewport={{ once: true }}
//     transition={{ duration: 1, type: "spring", bounce: 0.3 }}
//   >
//     {/* Hidden on mobile (below md breakpoint), visible on md+ */}
//     <div className="hidden md:flex w-[300px] md:w-[350px] lg:w-[400px] xl:w-[480px] h-[300px] md:h-[350px] lg:h-[400px] xl:h-[480px] overflow-hidden items-center justify-center">
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
// }) {
//   const navigate = useNavigate();
//   const onClickNavigateToAboutUs = () => {
//     navigate("/blog");
//   };

//   const metrics = [
//     { icon: <FaDollarSign />, label: "Current Price", value: `$${liveRounds[0].atPriceUsdt}` },
//     { icon: <FaUsers />, label: "Tokens Sold", value: "225.7M" },
//     { icon: <FaChartLine />, label: "Community", value: "24,567" },
//   ];

//   return (
//     <section className="relative text-white py-8 sm:py-12 md:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 xl:px-20 overflow-hidden">
//       {/* Background blur effect */}
//       <div className="absolute top-0 left-0 w-64 sm:w-96 h-64 sm:h-96 bg-green-400 opacity-20 rounded-full blur-3xl pointer-events-none" />

//       <div className="max-w-7xl mx-auto">
//         {/* Main content container */}
//         <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-16">
//           {/* Left side: Coin Image / Spline Animation */}
//           <div className="flex-1 flex justify-center order-2 lg:order-1 w-full lg:w-auto">
//             {/* Display static image on all screens, or conditional rendering if Spline is desired on desktop */}
//             <motion.img
//               src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1leb85WofOlN6KWXP0nIchbawzZg4lDq0eg&s"
//               alt="Jaimax Coin Illustration"
//               className="w-full h-auto max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl"
//               initial={{ opacity: 0, scale: 0.8 }}
//               whileInView={{ opacity: 1, scale: 1 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.8, ease: "easeOut" }}
//             />
//             {/* If you want to use the Spline animation on larger screens: */}
//             {/* <div className="hidden md:block">
//                 <CoinDisplay />
//             </div>
//             <div className="md:hidden">
//                 <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1leb85WofOlN6KWXP0nIchbawzZg4lDq0eg&s" alt="Jaimax Coin Illustration" className="w-full h-auto max-w-xs" />
//             </div> */}
//           </div>

//           {/* Right side: Text Content */}
//           <div className="flex-1 space-y-4 sm:space-y-6 order-1 lg:order-2 text-center lg:text-left">
//             <p className="text-green-200 font-semibold text-base sm:text-lg tracking-wide">
//               Your Gateway to Digital Wealth
//             </p>

//             <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight bg-gradient-to-r from-green-200 via-white to-green-200 bg-clip-text text-transparent">
//               J COIN
//             </h1>

//             <h2 className="text-green-400 text-2xl sm:text-3xl md:text-4xl font-bold">
//               About Jaimax
//             </h2>

//             <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
//               Jaimax, the most valuable crypto investment app, is dedicated to making crypto accessible in a simple way. Established in 2024, Jaimax has addressed numerous challenges faced by the crypto community, providing solutions for investing, trading, and literacy.
//               <a
//                 href="#"
//                 onClick={onClickNavigateToAboutUs}
//                 className="cursor-pointer text-green-400 hover:text-green-500 font-semibold hover:underline transition-all duration-300 ml-2 inline-block sm:inline"
//               >
//                 READ MORE →
//               </a>
//             </p>

//             {/* Contract Address */}
//             <div className="flex flex-col sm:flex-row items-center justify-between bg-gray-800 border border-gray-700 rounded-2xl p-3 sm:p-4 gap-3 sm:gap-0">
//               <p className="text-green-400 font-mono font-medium text-xs sm:text-sm break-all sm:truncate sm:max-w-[60%] lg:max-w-[70%]">
//                 {contractAddress}
//               </p>
//               <CopyToClipboardButton textToCopy={contractAddress} />
//             </div>

//             {/* Action Buttons */}
//             <div className="flex flex-wrap gap-3 sm:gap-4 mt-4 sm:mt-6 justify-center lg:justify-start">
//               <button
//                 onClick={() => navigate("/images/Jaimax_white_paper.pdf")}
//                 className="border border-green-500 text-green-400 hover:bg-green-500 hover:text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full font-semibold transition-all duration-300 text-sm sm:text-base"
//               >
//                 Read Whitepaper
//               </button>
//             </div>
//           </div>
//         </div>
//         {/* Metrics Section */}
//         <div className="mt-12 sm:mt-16 lg:mt-20">
//           <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-8 bg-gradient-to-r from-green-300 to-green-500 bg-clip-text text-transparent">
//             Jaimax Key Metrics
//           </h3>
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
//             {metrics.map((item, index) => (
//               <motion.div
//                 key={index}
//                 initial={{ opacity: 0, y: 20 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true }}
//                 transition={{ duration: 0.6, delay: index * 0.2 }}
//                 className="bg-green-900/10 border border-green-500/20 rounded-xl py-4 sm:py-6 px-4 sm:px-6 flex flex-col items-center text-center hover:bg-green-900/20 transition-all duration-300 shadow-md"
//               >
//                 <div className="text-green-400 text-2xl sm:text-3xl mb-2 sm:mb-3">
//                   {item.icon}
//                 </div>
//                 <p className="text-base sm:text-lg font-semibold mb-1">
//                   {item.label}
//                 </p>
//                 <p className="text-lg sm:text-xl font-bold">
//                   {item.value}
//                 </p>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }




// import React, { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { FaChartLine, FaUsers, FaDollarSign, FaCopy, FaCheck, FaArrowRight } from "react-icons/fa";

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
//       className="relative flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-4 py-2.5 rounded-xl font-medium transition-all duration-300 text-sm flex-shrink-0 shadow-lg hover:shadow-xl group overflow-hidden"
//       whileHover={{ scale: 1.02 }}
//       whileTap={{ scale: 0.98 }}
//     >
//       <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
//       <AnimatePresence mode="wait">
//         {copied ? (
//           <motion.div
//             key="copied"
//             initial={{ opacity: 0, scale: 0.8 }}
//             animate={{ opacity: 1, scale: 1 }}
//             exit={{ opacity: 0, scale: 0.8 }}
//             className="flex items-center gap-2"
//           >
//             <FaCheck className="text-sm" />
//             <span>Copied!</span>
//           </motion.div>
//         ) : (
//           <motion.div
//             key="copy"
//             initial={{ opacity: 0, scale: 0.8 }}
//             animate={{ opacity: 1, scale: 1 }}
//             exit={{ opacity: 0, scale: 0.8 }}
//             className="flex items-center gap-2"
//           >
//             <FaCopy className="text-sm" />
//             <span>Copy</span>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </motion.button>
//   );
// };

// const FloatingElement = ({ children, delay = 0 }) => (
//   <motion.div
//     animate={{
//       y: [0, -10, 0],
//       rotate: [0, 1, -1, 0],
//     }}
//     transition={{
//       duration: 6,
//       delay,
//       repeat: Infinity,
//       ease: "easeInOut",
//     }}
//   >
//     {children}
//   </motion.div>
// );

// export default function CryptoStakingSection({
//   contractAddress = "0x742d35Cc6648C25cbEC6900001Cfb3De3Fxxd4f",
//   liveRounds = [{ atPriceUsdt: "0.00012" }],
// }) {
//   const metrics = [
//     { 
//       icon: <FaDollarSign />, 
//       label: "Current Price", 
//       value: `$${liveRounds[0].atPriceUsdt}`,
//       gradient: "from-yellow-400 to-orange-500"
//     },
//     { 
//       icon: <FaUsers />, 
//       label: "Tokens Sold", 
//       value: "225.7M",
//       gradient: "from-blue-400 to-purple-500"
//     },
//     { 
//       icon: <FaChartLine />, 
//       label: "Community", 
//       value: "24,567",
//       gradient: "from-pink-400 to-red-500"
//     },
//   ];

//   const handleWhitepaperClick = () => {
//     window.open("/images/Jaimax_white_paper.pdf", "_blank");
//   };

//   const handleReadMore = () => {
//     // Navigate to blog/about section
//     console.log("Navigate to about us");
//   };

//   return (
//     <section className="relative min-h-screen  text-white py-12 md:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 xl:px-12 overflow-hidden">
//       {/* Enhanced Background Effects */}
//       <div className="absolute inset-0 overflow-hidden pointer-events-none">
//         <div className="absolute top-0 left-0 w-72 h-72 bg-green-400/20 rounded-full blur-3xl animate-pulse" />
//         <div className="absolute top-1/4 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
//         <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-cyan-400/15 rounded-full blur-3xl" />

//         {/* Animated grid pattern */}
//         <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.05)_1px,transparent_0)] bg-[size:40px_40px] opacity-30" />
//       </div>

//       <div className="relative max-w-7xl mx-auto">
//         {/* Main Hero Section */}
//         <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center mb-16 lg:mb-24">
//           {/* Left side: Content */}
//           <motion.div 
//             className="space-y-6 lg:space-y-8 text-center lg:text-left order-2 lg:order-1"
//             initial={{ opacity: 0, x: -50 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.8 }}
//           >
//             <motion.p 
//               className="text-green-300 font-semibold text-lg md:text-xl tracking-wide"
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.2 }}
//             >
//               Your Gateway to Digital Wealth
//             </motion.p>

//             <motion.h1 
//               className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-none"
//               initial={{ opacity: 0, y: 30 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.4 }}
//             >
//               <span className="bg-gradient-to-r from-green-200 via-emerald-300 to-cyan-300 bg-clip-text text-transparent drop-shadow-2xl">
//                 J COIN
//               </span>
//             </motion.h1>

//             <motion.h2 
//               className="text-green-400 text-3xl sm:text-4xl md:text-5xl font-bold"
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.6 }}
//             >
//               About Jaimax
//             </motion.h2>

//             <motion.div 
//               className="space-y-4"
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.8 }}
//             >
//               <p className="text-gray-300 leading-relaxed text-base md:text-lg max-w-2xl mx-auto lg:mx-0">
//                 Jaimax, the most valuable crypto investment app, is dedicated to making crypto accessible in a simple way. Established in 2024, Jaimax has addressed numerous challenges faced by the crypto community, providing solutions for investing, trading, and literacy.
//               </p>

//               <button
//                 onClick={handleReadMore}
//                 className="inline-flex items-center gap-2 text-green-400 hover:text-green-300 font-semibold transition-all duration-300 group"
//               >
//                 READ MORE
//                 <FaArrowRight className="text-sm group-hover:translate-x-1 transition-transform duration-300" />
//               </button>
//             </motion.div>

//             {/* Enhanced Contract Address Card */}
//             <motion.div 
//               className="bg-gradient-to-r from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-4 md:p-6"
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 1.0 }}
//             >
//               <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
//                 <div className="flex-1 min-w-0">
//                   <p className="text-gray-400 text-sm mb-1">Contract Address</p>
//                   <p className="text-green-400 font-mono font-medium text-sm md:text-base break-all">
//                     {contractAddress}
//                   </p>
//                 </div>
//                 <CopyToClipboardButton textToCopy={contractAddress} />
//               </div>
//             </motion.div>

//             {/* Action Buttons */}
//             <motion.div 
//               className="flex flex-wrap gap-4 justify-center lg:justify-start"
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 1.2 }}
//             >
//               <button
//                 onClick={handleWhitepaperClick}
//                 className="relative group bg-transparent border-2 border-green-500 text-green-400 hover:text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 overflow-hidden"
//               >
//                 <span className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
//                 <span className="relative z-10">Read Whitepaper</span>
//               </button>
//             </motion.div>
//           </motion.div>

//           {/* Right side: Coin Image */}
//           <motion.div 
//             className="flex justify-center order-1 lg:order-2"
//             initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
//             animate={{ opacity: 1, scale: 1, rotate: 0 }}
//             transition={{ duration: 1, delay: 0.5 }}
//           >
//             <di delay={0}>
//               <div className="relative">
//                 <div className="absolute inset-0 " />
//                 <img
//                   src="https://i.pinimg.com/736x/b6/a1/fa/b6a1fa6845d22fbaab3a2759f92d695e.jpg"
//                   alt="Jaimax Coin"
//                   className="relative rounded-lg shadow-2xl  w-full h-auto max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl"
//                 />
//                 {/* Glowing ring effect */}
//                 {/* <div className="absolute inset-0 rounded-full border-2 border-green-400/50 animate-pulse" /> */}
//               </div>
//             </di>
//           </motion.div>
//         </div>

//         {/* Enhanced Metrics Section */}
//         <motion.div 
//           className="space-y-8 md:space-y-12"
//           initial={{ opacity: 0, y: 50 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true, margin: "-100px" }}
//           transition={{ duration: 0.8 }}
//         >
//           <div className="text-center">
//             <h3 className="text-4xl sm:text-5xl md:text-6xl font-black mb-4">
//               <span className="bg-gradient-to-r from-green-300 via-emerald-400 to-cyan-400 bg-clip-text text-transparent">
//                 Key Metrics
//               </span>
//             </h3>
//             <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto">
//               Real-time insights into Jaimax's performance and community growth
//             </p>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
//             {metrics.map((item, index) => (
//               <motion.div
//                 key={index}
//                 initial={{ opacity: 0, y: 30 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true }}
//                 transition={{ duration: 0.6, delay: index * 0.2 }}
//                 whileHover={{ y: -10, scale: 1.02 }}
//                 className="group relative"
//               >
//                 <div className="relative bg-gradient-to-br from-gray-800/50 to-gray-900/80 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 md:p-8 text-center hover:border-green-500/50 transition-all duration-500 overflow-hidden">
//                   {/* Background gradient effect */}
//                   <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />

//                   {/* Icon */}
//                   <div className={`inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-to-br ${item.gradient} mb-4 md:mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
//                     <div className="text-white text-2xl md:text-3xl">
//                       {item.icon}
//                     </div>
//                   </div>

//                   {/* Content */}
//                   <div className="relative z-10">
//                     <p className="text-gray-300 text-base md:text-lg font-medium mb-2">
//                       {item.label}
//                     </p>
//                     <p className="text-2xl md:text-3xl lg:text-4xl font-bold text-white group-hover:text-green-300 transition-colors duration-300">
//                       {item.value}
//                     </p>
//                   </div>

//                   {/* Decorative elements */}
//                   <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-white/5 to-transparent rounded-full transform translate-x-10 -translate-y-10" />
//                   <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-white/5 to-transparent rounded-full transform -translate-x-8 translate-y-8" />
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         </motion.div>

//       </div>
//     </section>
//   );
// }


// import React from "react";
// import { Copy } from "lucide-react";
// import logo from '../../../public/images/site_logo.svg';
// import { useNavigate } from "react-router-dom";

// const HomeAbout = () => {
//   const contractAddress = "0x71eC974DA6D18df497D21af8026B3ADF7B1865B6";
//   const navigate = useNavigate();
//   const handleCopy = () => {
//     navigator.clipboard.writeText(contractAddress);
//   };

//   return (
//     <section className=" text-teal-800 py-12 px-4 lg:px-24 text-center font-[Poppins]">
//       {/* Logo */}
//       <div className="flex justify-center mb-4 w-full h-50">
//         <img
//           src={logo}
//           alt="Jaimax Logo"
//           className="w-40 h-40 object-contain"
//         />
//       </div>

//       {/* Heading */}
//       <h2 className="text-4xl font-extrabold text-white uppercase mb-6">
//         About Jaimax
//       </h2>

//       {/* Description */}
//       <p className="text-lg leading-relaxed max-w-3xl mx-auto text-white">
//         Jaimax, the most valuable crypto investment app, is dedicated to making
//         crypto accessible in a simple way. Established in 2024, Jaimax has
//         addressed numerous challenges faced by the crypto community, providing
//         solutions for crypto investing, trading, and literacy...
//         <span className="text-teal-500 font-semibold ml-1 cursor-pointer hover:underline" onClick={()=>navigate('/about')}>
//           READ MORE
//         </span>
//       </p>

//       {/* Contract Address */}
//       <div className="mt-10">
//         <h4 className="text-xl text-white font-semibold mb-3">
//           CONTRACT ADDRESS
//         </h4>
//         <div className="inline-flex items-center bg-teal-100 text-teal-800 font-bold px-6 py-3 rounded-full shadow-lg space-x-2">
//           <span>{contractAddress}</span>
//           <button onClick={handleCopy} title="Copy">
//             <Copy size={18} className="hover:text-teal-600" />
//           </button>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default HomeAbout;



import React, { useState, useEffect } from "react";
import { Copy, Users, Coins, TrendingUp, Check } from "lucide-react";
import logo from '../../../public/images/site_logo.svg';
import { useNavigate } from "react-router-dom";
const HomeAbout = () => {
  const contractAddress = "0x71eC974DA6D18df497D21af8026B3ADF7B1865B6";
  const [copied, setCopied] = useState(false);
  const navigate = useNavigate()

  // Simulated live data - in real app, these would come from API
  const [liveData, setLiveData] = useState({
    members: 12547,
    soldCoins: 8924567,
    livePrice: 0.0234
  });

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(contractAddress);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const stats = [
    {
      label: "LIVE PRICE",
      value: "$0.00024",
      icon: <TrendingUp className="w-4 h-4 text-lime-400" />, // simulate up-trend
      color: "text-lime-400",
    },
    {
      label: "SOLD TOKENS",
      value: "225765326",
      icon: <TrendingUp className="w-4 h-4 text-white" />, // simulate up-trend
      color: "text-white",
    },
    {
      label: "LIVE MEMBERS",
      value: "24567",
      icon: <TrendingUp className="w-4 h-4 text-emerald-300" />,
      color: "text-emerald-300",
    },
  ];
  // Simulate live data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveData(prev => ({
        members: prev.members + Math.floor(Math.random() * 3),
        soldCoins: prev.soldCoins + Math.floor(Math.random() * 100),
        livePrice: prev.livePrice + (Math.random() - 0.5) * 0.001
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleNavigate = () => {
    // navigate('/about') - uncomment when using with router
   navigate("/blog")
  };

  const formatNumber = (num) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toLocaleString();
  };

  return (
    <>
      <section className=" text-white py-10 px-4 lg:px-14 sm:py-5 relative overflow-hidden">


        <div className="relative z-10 max-w-7xl mx-auto">
          {/* Logo Section */}
          <div className="flex justify-center mb-12">
            <div className="relative">
              <img src={logo} alt="" width="500px" />
              {/* <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-green-400 rounded-full animate-pulse"></div> */}
            </div>
          </div>

          {/* Stats Cards */}
          {/*    
<div className="mb-12">
  <img
    src="https://cdn.dribbble.com/users/1787323/screenshots/17509856/media/13f8ac5374e47b9a108d08912b97e2ae.png?compress=1&resize=1200x900"
    alt="Crypto Illustration"
    className="w-full max-w-4xl mx-auto rounded-3xl shadow-xl"
  />
</div> */}
          {/* Main Content */}
          <div className="text-center">
            {/* Heading */}
            {/* <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#1ac0c7] uppercase mb-8 leading-tight">
  About Jaimax
</h2> */}


            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-500 uppercase mb-8 leading-tight">
              About Jaimax
            </h2>

            {/* Description */}
            <div className="max-w-4xl mx-auto mb-12">
              <p className="text-lg md:text-xl leading-relaxed text-gray-200 mb-6">
                Jaimax, the most valuable crypto investment app, is dedicated to making crypto accessible in a simple way. Established in 2024, Jaimax has addressed numerous challenges faced by the crypto community, providing solutions for crypto investing, trading, and literacy...
              </p>
              <button
                onClick={handleNavigate}
                className="inline-flex items-center text-teal-400 font-semibold hover:text-teal-300 transition-colors duration-200 group"
              >
                <span
                
                className="border-b-2 border-teal-400 group-hover:border-teal-300 transition-colors duration-200">
                  READ MORE
                </span>
                <TrendingUp className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform duration-200" />
              </button>
            </div>

            {/* Contract Address */}
         <div className="max-w-2xl mx-auto">
  <h4 className="text-xl md:text-2xl font-semibold mb-6 text-gray-200">
    CONTRACT ADDRESS
  </h4>
  <div className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 w-full">
    <div className="flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-4 px-3 py-2 sm:px-4 sm:py-2">
      <p className="flex-1 text-center sm:text-left font-mono text-sm sm:text-base md:text-lg text-white break-all leading-tight">
        {contractAddress}
      </p>

      <button
        onClick={handleCopy}
        className="flex items-center justify-center space-x-0 sm:space-x-2 bg-teal-500 hover:bg-teal-600 text-white text-xs sm:text-sm font-medium px-4 py-1.5 sm:px-5 sm:py-2 rounded-lg transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-md"
        title={copied ? 'Copied!' : 'Copy to clipboard'}
      >
        {copied ? (
          <>
            {/* Icon hidden on mobile, visible on sm+ */}
            <Check className="hidden sm:inline" size={16} />
            {/* Text always visible */}
            <span>{copied ? "Copied!" : "Copied!"}</span>
          </>
        ) : (
          <>
            {/* Icon hidden on mobile, visible on sm+ */}
            <Copy className="hidden sm:inline" size={16} />
            {/* Text always visible */}
            <span>{copied ? "Copy" : "Copy"}</span>
          </>
        )}
      </button>
    </div>
  </div>
</div>

          </div>
        </div>
      </section>
      <section className="bg-[#085056] py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-lime-400 via-green-300 to-emerald-400 uppercase mb-2">
            LIVE UPDATE
          </h2>
          <p className="text-sm sm:text-base text-gray-200">
            TOTAL TOKENS: <span className="text-yellow-400 font-bold">10 BILLION</span> &nbsp;|&nbsp;
            STARTING PRICE: <span className="text-yellow-400 font-semibold">INR 0.01</span> (<span className="text-green-300">USD 0.00012</span>)
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-[#063c40] border border-[#17bba3] rounded-lg p-6 flex flex-col items-center justify-center text-center shadow-md hover:shadow-lg transition duration-300"
            >
              <p className="text-white text-sm tracking-wide mb-2 uppercase">
                {stat.label}
              </p>
              <div className="flex items-center gap-1">
                <h3 className={`text-2xl sm:text-3xl font-extrabold ${stat.color}`}>{stat.value}</h3>
                {stat.icon}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default HomeAbout;