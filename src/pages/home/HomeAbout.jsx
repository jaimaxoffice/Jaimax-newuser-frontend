// import React, { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { FaChartLine, FaUsers, FaDollarSign } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";
// import icon from "../../assets/3dcoin.png";
// import icon2 from "../../assets/Images/coinshield.svg"

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

//       <img src={icon2} alt="Jaimax Coin" className="w-full h-full object-contain" />
   
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


import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChartLine, FaUsers, FaDollarSign } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import icon from "../../assets/3dcoin.png";
import icon2 from "../../assets/Images/coinshield.svg";

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
      className="ml-2 sm:ml-4 bg-green-600 hover:bg-green-700 text-white px-3 py-2 sm:px-4 sm:py-2 rounded-lg font-medium transition-all duration-300 text-sm whitespace-nowrap flex-shrink-0"
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
    <img src={icon2} alt="Jaimax Coin" className="w-full h-full object-contain" />
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
    <section
      className="relative text-white py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 xl:px-20 overflow-hidden"
      style={{
        backgroundImage: `
          url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23ffffff1A' stroke-width='1'%3E%3Cpath d='M40 0H0v40'/%3E%3C/g%3E%3C/svg%3E"),
          linear-gradient(to bottom, #000000, #111827, #000000)
        `,
        backgroundSize: "40px 40px, cover",
        backgroundBlendMode: "overlay",
        backgroundRepeat: "repeat",
        backgroundPosition: "center",
      }}
    >
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-48 h-48 sm:w-72 sm:h-72 lg:w-96 lg:h-96 bg-green-400 opacity-20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-48 h-48 sm:w-64 sm:h-64 lg:w-80 lg:h-80 bg-blue-400 opacity-10 rounded-full blur-3xl pointer-events-none" />

      {/* Main content container */}
      <div className="max-w-7xl mx-auto">
        {/* Hero section with iframe and content */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-16">
          {/* Left side - 3D iframe */}
          {/* <motion.div 
            className="w-full lg:flex-1 order-2 lg:order-1"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="w-full  sm:h-[500px] lg:h-[500px] overflow-hidden ">
              <iframe
                src="https://my.spline.design/security-4f17ed732da8f38cc4ab0615c59d5e68/"
                frameBorder="0"
                width="100%"
                height="100%"
                allowFullScreen
                className="w-full h-full rounded-2xl"
                title="Jaimax 3D Animation"
              ></iframe>
            </div>
          </motion.div> */}
          <motion.div 
  className="hidden sm:block w-full lg:flex-1 order-2 lg:order-1"
  initial={{ opacity: 0, x: -50 }}
  whileInView={{ opacity: 1, x: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.8 }}
>
  <div className="w-full sm:h-[500px] lg:h-[500px] overflow-hidden">
    <iframe
      src="https://my.spline.design/security-4f17ed732da8f38cc4ab0615c59d5e68/"
      frameBorder="0"
      width="100%"
      height="100%"
      allowFullScreen
      className="w-full h-full rounded-2xl"
      title="Jaimax 3D Animation"
    ></iframe>
  </div>
</motion.div>


          {/* Right side - Content */}
          <motion.div 
            className="w-full lg:flex-1 space-y-4 sm:space-y-6 order-1 lg:order-2 text-center lg:text-left"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Tagline */}
            <p className="text-green-200 font-semibold text-base sm:text-lg tracking-wide">
              Your Gateway to Digital Wealth
            </p>

            {/* Main title */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight bg-gradient-to-r from-green-200 via-white to-green-200 bg-clip-text text-transparent">
              J COIN
            </h1>

            {/* Subtitle */}
            <h2 className="text-green-400 text-2xl sm:text-3xl lg:text-4xl font-bold">
              About Jaimax
            </h2>

            {/* Description */}
            <div className="text-gray-300 leading-relaxed text-sm sm:text-base max-w-2xl mx-auto lg:mx-0">
              <p>
                Jaimax, the most valuable crypto investment app, is dedicated to making crypto accessible in a simple way. Established in 2024, Jaimax has addressed numerous challenges faced by the crypto community, providing solutions for investing, trading, and literacy.
                <a
                  href="#"
                  onClick={onClickNavigateToAboutUs}
                  className="cursor-pointer text-green-400 hover:text-green-500 font-semibold hover:underline transition-all duration-300 ml-2 inline-block"
                >
                  READ MORE →
                </a>
              </p>
            </div>

            {/* Contract Address */}
            <div className="bg-gray-900/30 border border-green-500/20 rounded-2xl p-4 sm:p-6">
              <h3 className="text-white font-bold text-lg sm:text-xl mb-3">Contract Address</h3>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-0">
                <p className="text-green-400 font-mono break-all font-medium text-xs sm:text-sm flex-1 min-w-0">
                  {contractAddress}
                </p>
                <CopyToClipboardButton textToCopy={contractAddress} />
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row flex-wrap justify-center lg:justify-start gap-3 sm:gap-4 mt-6">
              <button
                onClick={() => navigate("/images/Jaimax_white_paper.pdf")}
                className="border border-green-500 text-green-400 hover:bg-green-500 hover:text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105 transform"
              >
                Read Whitepaper
              </button>
              <button
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105 transform"
              >
                Buy J COIN
              </button>
            </div>
          </motion.div>
        </div>

        {/* Metrics section */}
        <motion.div 
          className="mt-12 sm:mt-16 lg:mt-20"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {metrics.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="bg-gradient-to-br from-green-900/20 to-green-800/10 border border-green-500/30 rounded-xl py-6 px-4 sm:px-6 flex flex-col items-center text-center hover:bg-green-900/30 transition-all duration-300 shadow-lg hover:shadow-green-500/20 hover:scale-105 transform backdrop-blur-sm"
              >
                <div className="text-green-400 text-2xl sm:text-3xl mb-3 p-3 bg-green-500/10 rounded-full">
                  {item.icon}
                </div>
                <p className="text-base sm:text-lg font-semibold text-gray-200 mb-1">
                  {item.label}
                </p>
                <p className="text-xl sm:text-2xl font-bold text-white">
                  {item.value}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// import React, { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { FaChartLine, FaUsers, FaDollarSign } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";
// import icon from "../../assets/3dcoin.png";
// import icon2 from "../../assets/Images/coinshield.svg";


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
//     <img src={icon2} alt="Jaimax Coin" className="w-full h-full object-contain" />
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
//     // <section
//     //   className="relative text-white py-20 px-4 sm:px-10 lg:px-20 overflow-hidden bg-gradient-to-b from-black via-gray-900 to-black"
//     //   style={{
//     //     // backgroundImage: `url(${bgImage})`,
//     //     backgroundSize: "cover",
//     //     backgroundPosition: "center",
//     //     backgroundRepeat: "no-repeat",
//     //     backgroundBlendMode: "overlay",
//     //   }}
//     // >
//     <section
//   className="relative text-white py-20 px-4 sm:px-10 lg:px-20 overflow-hidden"
//   style={{
//     backgroundImage: `
//       url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23ffffff1A' stroke-width='1'%3E%3Cpath d='M40 0H0v40'/%3E%3C/g%3E%3C/svg%3E"),
//       linear-gradient(to bottom, #000000, #111827, #000000)
//     `,
//     backgroundSize: "40px 40px, cover",
//     backgroundBlendMode: "overlay",
//     backgroundRepeat: "repeat",
//     backgroundPosition: "center",
//   }}
// >

//       <div className="absolute top-0 left-0 w-96 h-96 bg-green-400 opacity-20 rounded-full blur-3xl pointer-events-none" />
//       <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-16">
//        <div className="flex-1">
//   <div className="w-full h-[500px] rounded-2xl overflow-hidden ">
//     <iframe
//       src="https://my.spline.design/security-4f17ed732da8f38cc4ab0615c59d5e68/"
//       frameBorder="0"
//       width="100%"
//       height="100%"
//       allowFullScreen
//       className="w-full h-full"
//     ></iframe>
//   </div>
// </div>


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
//             <div className="flex flex-wrap items-center rounded-2xl p-4">
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

