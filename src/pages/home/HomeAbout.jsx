
// import React, { useState, useEffect, useRef } from "react";
// import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";
// import icon from '../../assets/3dcoin.png'
// const jaimaxicon = 'https://etimg.etb2bimg.com/thumb/msid-99241573,imgsize-47730,width-1200,height=765,overlay-etciosea/news/security/cryptocurrency-phishing-grows-by-40-in-one-year-kaspersky-report.jpg'
// const CopyToClipboardButton = ({ textToCopy, className }) => {
//   const [copied, setCopied] = useState(false);

//   const handleCopy = () => {
//     navigator.clipboard.writeText(textToCopy);
//     setCopied(true);
//     setTimeout(() => setCopied(false), 2000);
//   };

//   return (
//     <motion.button
//       onClick={handleCopy}
//       className={className}
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
//             className="flex items-center gap-2"
//           >
//             ✓ Copied
//           </motion.span>
//         ) : (
//           <motion.span
//             key="copy"
//             initial={{ opacity: 0, y: 5 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -5 }}
//             className="flex items-center gap-2"
//           >
//             📋 Copy
//           </motion.span>
//         )}
//       </AnimatePresence>
//     </motion.button>
//   );
// };

// // Professional floating elements
// const FloatingElements = () => {
//   const elements = Array.from({ length: 8 }, (_, i) => i);

//   return (
//     <div className="absolute inset-0 overflow-hidden pointer-events-none ">
//       {elements.map((element) => (
//         <motion.div
//           key={element}
//           className="absolute w-1 h-1 bg-white/30 rounded-full"
//           animate={{
//             x: [Math.random() * 100, Math.random() * 100 + 50],
//             y: [Math.random() * 100, Math.random() * 100 + 50],
//             opacity: [0.3, 0.6, 0.3],
//           }}
//           transition={{
//             duration: Math.random() * 15 + 10,
//             repeat: Infinity,
//             ease: "linear",
//           }}
//           style={{
//             left: Math.random() * 100 + "%",
//             top: Math.random() * 100 + "%",
//           }}
//         />
//       ))}
//     </div>
//   );
// };



// const gradients = [
//   "#085359", // Teal blue (matches your dark brand background)
//   "#93C572", // Olive green (already used by you)
//   "#24E19C", // Bright mint green
//   "#00D1B2", // Bright turquoise
// ];

// // 2️⃣ MetricCard Component
// const MetricCard = ({ title, value, subtitle, icon, delay = 0, index = 0 }) => {
//   const [isHovered, setIsHovered] = React.useState(false);
//   const bgGradient = gradients[index % gradients.length];

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 40 }}
//       whileInView={{ opacity: 1, y: 0 }}
//       viewport={{ once: true, amount: 0.3 }}
//       transition={{ duration: 0.6, delay, ease: "easeOut" }}
//       onHoverStart={() => setIsHovered(true)}
//       onHoverEnd={() => setIsHovered(false)}
//       className="group"
//     >
//       <motion.div
//         whileHover={{ y: -8, scale: 1.02 }}
//         transition={{ type: "spring", stiffness: 300, damping: 25 }}
//         className="relative rounded-2xl p-8 w-full sm:w-80 shadow-lg border border-white/20 overflow-hidden"
//         style={{
//           background: bgGradient,
//           backdropFilter: "blur(6px)",
//           WebkitBackdropFilter: "blur(6px)",
//           borderColor: "rgba(255, 255, 255, 0.15)",
//         }}
//       >
//         <div className="relative z-10">
//           <div className="flex items-center justify-between mb-4">
//             <motion.div
//               animate={{ rotate: isHovered ? 10 : 0 }}
//               transition={{ duration: 0.3 }}
//               className="text-3xl text-white"
//             >
//               {icon}
//             </motion.div>
//             <motion.div
//               className="w-2 h-2 bg-white rounded-full"
//               animate={{
//                 scale: [1, 1.2, 1],
//                 opacity: [0.7, 1, 0.7],
//               }}
//               transition={{ duration: 2, repeat: Infinity }}
//             />
//           </div>
//           <h3 className="text-[#BFFCF9] text-sm font-semibold uppercase tracking-wider mb-3">
//             {title}
//           </h3>
//           <div className="mb-2">
//             <motion.p
//               className="text-3xl font-bold text-white"
//               animate={{ scale: isHovered ? 1.05 : 1 }}
//               transition={{ type: "spring", stiffness: 300 }}
//             >
//               {value}
//             </motion.p>
//           </div>
//           {subtitle && (
//             <p className="text-[#AEE1E4] text-sm">{subtitle}</p>
//           )}
//         </div>
//       </motion.div>
//     </motion.div>
//   );
// };

// // Enhanced text reveal animation
// const TextReveal = ({ children, className, delay = 0 }) => {
//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 30 }}
//       whileInView={{ opacity: 1, y: 0 }}
//       viewport={{ once: true }}
//       transition={{ duration: 0.8, delay, ease: "easeOut" }}
//       className={className}
//     >
//       {children}
//     </motion.div>
//   );
// };

// // Coin animation component
// const CoinDisplay = () => {
//   return (
//    <>
//     <motion.div
//       className="mb-12 flex justify-center"
//       initial={{ scale: 0, rotate: -180 }}
//       whileInView={{ scale: 1, rotate: 0 }}
//       viewport={{ once: true }}
//       transition={{ duration: 1, type: "spring", bounce: 0.3 }}
//     >
//       <motion.div
//         className="relative"
      
//       >
//         <div className="w-80 h-80 rounded-full flex items-center justify-center text-3xl font-bold text-yellow-900 ">
//           <img src={icon} style={{
//             width : "300px"
//           }} alt="" />
//         </div>
//         {/* Glow effect */}
//         <div className="absolute inset-0 w-24 h-24 rounded-full  z-10"></div>
       
//       </motion.div>
//     </motion.div>
//       <p className="mt-6 text-center text-xl md:text-2xl font-semibold text-green  max-w-lg">
//         "Don’t just watch others build their future—own it. Buy Jaimax coin now and secure your tomorrow."
//       </p>
//    </>
//   );
// };

// import { FaChartLine, FaUsers, FaDollarSign } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";


// export default function CryptoStakingSection({
//   contractAddress = "0x742d35Cc6648C25cbEC6900001Cfb3De3Fxxd4f",
//   liveRounds = [{ atPriceUsdt: "0.00012" }],
//   onClickNavigateToAboutUs = () => {}
// }) {
//   const metrics = [
//     { icon: <FaDollarSign />, label: "Current Price", value: `$${liveRounds[0].atPriceUsdt}` },
//     { icon: <FaUsers />, label: "Tokens Sold", value: "225.7M" },
//     { icon: <FaChartLine />, label: "Community", value: "24,567" },
//   ];
//      const navigate = useNavigate()

  
//   return (
//     <section className="relative bg-black/90 text-white py-20 overflow-hidden">
//       {/* Top Glow */}
//       <div className="absolute top-0 left-0 w-96 h-96 bg-green-400 opacity-20 rounded-full blur-3xl pointer-events-none"></div>

//       {/* Container */}
//       <div className="container mx-auto flex flex-col lg:flex-row items-center justify-around px-6 ">

//         <div className="flex-1 w-full max-w-md">
//           <CoinDisplay />
//         </div>
//         {/* Left Content */}
//         <div className="flex-1 max-w-lg space-y-6">
//           <p className="text-green-200 font-semibold text-lg tracking-wide">
//             Your Gateway to Digital Wealth
//           </p>
//           <h1 className="text-5xl md:text-6xl font-extrabold leading-tight">
//             <span className="bg-gradient-to-r from-green-200 via-white to-green-200 bg-clip-text text-transparent">
//               J COIN
//             </span>
//           </h1>
//           <h2 className="text-green-400 text-3xl md:text-4xl font-bold">
//             About Jaimax
//           </h2>
//           <p className="text-gray-300 leading-relaxed">
//             Jaimax, the most valuable crypto investment app, is dedicated to making crypto accessible in a simple way. Established in 2024, Jaimax has addressed numerous challenges faced by the crypto community, providing solutions for investing, trading, and literacy.
//             <span
//               onClick={onClickNavigateToAboutUs}
//               className="cursor-pointer text-green-400 hover:text-green-500 font-semibold hover:underline transition-all duration-300 ml-2"
//             >
//               READ MORE →
//             </span>
//           </p>

//           {/* Contract Address */}
//           <div>
//             <h3 className="text-white font-bold text-xl mb-2">
//               Contract Address
//             </h3>
//             <div className="flex items-center bg-gray-800 border border-gray-700 rounded-2xl p-4 overflow-x-auto">
//               <p className="text-green-400 font-mono break-all font-medium text-sm">
//                 {contractAddress}
//               </p>
//               <CopyToClipboardButton
//                 textToCopy={contractAddress}
//                 className="ml-12 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-300"
//               />
//             </div>
//           </div>

//           {/* CTA Buttons */}
//           <div className="flex flex-wrap gap-4 mt-6">
//             {/* <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-full font-semibold shadow-lg transition-all duration-300">
//               Enter App
//             </button> */}
//             <button  
//             onClick={()=> navigate("/images/Jaimax_white_paper.pdf")}
//             className="border border-green-500 text-green-400 hover:bg-green-500 hover:text-white px-6 py-3 rounded-full font-semibold transition-all duration-300">
//               Read Whitepaper
//             </button>
//           </div>
//         </div>

        
//       </div>

//       {/* Bottom Metrics */}
//       <div className="container mx-auto mt-20 px-6">
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
import icon from "../../assets/3dcoin.png";

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
      className="ml-4 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-300"
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
    className="mb-10 flex justify-center"
    initial={{ scale: 0, rotate: -180 }}
    whileInView={{ scale: 1, rotate: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 1, type: "spring", bounce: 0.3 }}
  >
    <div className="w-64 h-64 sm:w-80 sm:h-80 rounded-full overflow-hidden  flex items-center justify-center">
      <img src={icon} alt="Jaimax Coin" className="w-full h-full object-contain" />
  
    </div>
  </motion.div>
);

export default function CryptoStakingSection({
  contractAddress = "0x742d35Cc6648C25cbEC6900001Cfb3De3Fxxd4f",
  liveRounds = [{ atPriceUsdt: "0.00012" }],
  onClickNavigateToAboutUs = () => {}
}) {
  const navigate = useNavigate();
  const metrics = [
    { icon: <FaDollarSign />, label: "Current Price", value: `$${liveRounds[0].atPriceUsdt}` },
    { icon: <FaUsers />, label: "Tokens Sold", value: "225.7M" },
    { icon: <FaChartLine />, label: "Community", value: "24,567" },
  ];

  return (
    <section className="relative bg-gradient-to-b from-black via-gray-900 to-black text-white py-20 px-4 sm:px-10 lg:px-20 overflow-hidden">
      <div className="absolute top-0 left-0 w-96 h-96 bg-green-400 opacity-20 rounded-full blur-3xl pointer-events-none" />
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-16">
        <div className="flex-1">
          <CoinDisplay />
          
          <h1 className="mt-6 text-2xl md:text-3xl font-bold leading-snug tracking-wide text-center">
    Missed Bitcoin? Don’t miss Jaimax. <br className="hidden md:block" />
    <span className="text-yellow-300">Buy before the world catches up.</span>
  </h1>
        </div>

        <div className="flex-1 space-y-6">
          <p className="text-green-200 font-semibold text-lg tracking-wide">
            Your Gateway to Digital Wealth
          </p>
          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight bg-gradient-to-r from-green-200 via-white to-green-200 bg-clip-text text-transparent">
            J COIN
          </h1>
          <h2 className="text-green-400 text-3xl md:text-4xl font-bold">About Jaimax</h2>
          <p className="text-gray-300 leading-relaxed">
            Jaimax, the most valuable crypto investment app, is dedicated to making crypto accessible in a simple way. Established in 2024, Jaimax has addressed numerous challenges faced by the crypto community, providing solutions for investing, trading, and literacy.
           <a
  href="#"
  onClick={onClickNavigateToAboutUs}
  className="cursor-pointer text-green-400 hover:text-green-500 font-semibold hover:underline transition-all duration-300 ml-2"
>
  READ MORE →
</a>

          </p>

          <div>
            <h3 className="text-white font-bold text-xl mb-2">Contract Address</h3>
            <div className="flex flex-wrap items-center bg-gray-800 border border-gray-700 rounded-2xl p-4">
              <p className="text-green-400 font-mono break-all font-medium text-sm">
                {contractAddress}
              </p>
              <CopyToClipboardButton textToCopy={contractAddress} />
            </div>
          </div>

          <div className="flex flex-wrap gap-4 mt-6">
            <button
              onClick={() => navigate("/images/Jaimax_white_paper.pdf")}
              className="border border-green-500 text-green-400 hover:bg-green-500 hover:text-white px-6 py-3 rounded-full font-semibold transition-all duration-300"
            >
              Read Whitepaper
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-20 px-4 sm:px-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {metrics.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="bg-green-900/10 border border-green-500/20 rounded-xl py-6 px-6 flex flex-col items-center text-center hover:bg-green-900/20 transition-all duration-300 shadow-md"
            >
              <div className="text-green-400 text-3xl mb-3">{item.icon}</div>
              <p className="text-lg font-semibold">{item.label}</p>
              <p className="text-xl font-bold">{item.value}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
