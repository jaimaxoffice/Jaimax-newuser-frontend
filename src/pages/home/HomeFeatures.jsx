// import React, { useState, useEffect, useRef } from 'react';
// import { motion, useInView } from 'framer-motion';
// import { TrendingUp, Shield, Users, Globe, BookOpen, Settings, CreditCard, Headphones, ArrowRight } from 'lucide-react';
// import icon from '../../assets/Images/loginReg.svg'
// import icon2 from '../../assets/Images/jaicoin.svg'
// const JaimaxLanding = () => {
//   const [isVisible, setIsVisible] = useState(false);

//   useEffect(() => {
//     setIsVisible(true);
//   }, []);

//   // Refs for each section you want to animate when it comes into view
//   const heroRef = useRef(null);
//   const featuresRef = useRef(null);
//   const whyChooseRef = useRef(null);
//   const isHeroInView = useInView(heroRef, { once: true, amount: 0.5 });
//   const isFeaturesInView = useInView(featuresRef, { once: true, amount: 0.3 });
//   const isWhyChooseInView = useInView(whyChooseRef, { once: true, amount: 0.4 });

//   const features = [
//     {
//       icon: Shield,
//       title: "User Account Management",
//       description: "Easily create and manage your personal Jaimax wallet. Our secure dashboard helps you track token balances, purchases, and transaction history all in one place."
//     },
//     {
//       icon: Settings,
//       title: "Privacy Settings & Data Protection",
//       description: "Your privacy matters. Jaimax uses advanced encryption to protect your data and allows you to control how your personal information is stored and shared."
//     },
//     {
//       icon: CreditCard,
//       title: "Secure Payment Processing",
//       description: "All transactions are powered by blockchain, ensuring fast, secure, and tamper-proof payments. You can invest and transfer with confidence."
//     },
//     {
//       icon: Headphones,
//       title: "24/7 Communication and Support",
//       description: "Get round-the-clock assistance from our expert support team. Whether you have questions about your wallet, transactions, or features, we're here to help."
//     },
//     {
//       icon: TrendingUp,
//       title: "Smart Analytics & Cookie Control",
//       description: "We provide real-time performance insights while allowing full control over cookies and tracking. It's all part of a transparent and secure user experience."
//     },
//     {
//       icon: Globe,
//       title: "International Access & Data Transfers",
//       description: "Jaimax supports global users with seamless cross-border crypto transactions. Our platform is built to serve an international audience with full compliance."
//     },
//     {
//       icon: BookOpen,
//       title: "Educational Resources",
//       description: "We empower users with simple, clear content about crypto, blockchain, DeFi, and tokenomics. Our resources are ideal for beginners and experts alike."
//     },
//     {
//       icon: Users,
//       title: "Policy Updates & User Rights",
//       description: "Stay up to date with regular policy notifications. Jaimax ensures full user control over personal data, privacy settings, and account activity."
//     }
//   ];

//   // --- Framer Motion Animation Variants ---
//   const fadeIn = {
//     hidden: { opacity: 0, y: 50 },
//     visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
//   };

//   const staggerContainer = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.1,
//         delayChildren: 0.2
//       },
//     },
//   };

//   const itemVariants = {
//     hidden: { opacity: 0, y: 30 },
//     visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
//   };

//   // Handler for navigation (e.g., to a login page)
//   const handleGetStartedClick = () => {
//     console.log("Navigating to login/signup page...");
//   };

//   return (
//     <div className="min-h-screen text-white">
//       {/* Geometric background pattern */}
//       <div className="absolute inset-0 overflow-hidden">
//         <img src={icon} alt="" className="absolute -top-0 -right-80  opacity-10" />
//         <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
//       </div>

//       <motion.div
//         ref={heroRef}
//         initial="hidden"
//         animate={isVisible || isHeroInView ? "visible" : "hidden"}
//         variants={fadeIn}
//         className="relative z-10"
//       >
//         {/* <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 lg:pt-10 pb-2 sm:pb-20 lg:pb-4">
//           <div className="text-center">
//             <motion.h1
//               initial={{ opacity: 0, y: 20 }}
//               animate={isVisible || isHeroInView ? { opacity: 1, y: 0 } : {}}
//               transition={{ duration: 0.8, delay: 0.2 }}
//               className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white mb-6 leading-tight"
//             >
//               <span className="block mb-2">Powering the</span>
//               <span className="bg-gradient-to-r from-lime-400 via-green-500 to-lime-400 bg-clip-text text-transparent">
//                 Future of Crypto
//               </span>
//             </motion.h1>
//             <motion.p
//               initial={{ opacity: 0, y: 20 }}
//               animate={isVisible || isHeroInView ? { opacity: 1, y: 0 } : {}}
//               transition={{ duration: 0.8, delay: 0.4 }}
//               className="text-lg sm:text-xl lg:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed px-4"
//             >
//               Welcome to Jaimax, one of the best crypto coins designed for growth, transparency, and financial freedom. Built on powerful blockchain technology, Jaimax offers a secure and scalable platform for users who want to be part of the next generation of digital finance.
//             </motion.p>
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={isVisible || isHeroInView ? { opacity: 1, y: 0 } : {}}
//               transition={{ duration: 0.8, delay: 0.6 }}
//               className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
//             >
//               <button
//                 onClick={handleGetStartedClick}
//                 className="group relative px-8 py-4 bg-gradient-to-r from-lime-500 to-green-600 text-white font-bold text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 w-full sm:w-auto"
//               >
//                 Get Started Now
//                 <ArrowRight className="inline-block ml-2 group-hover:translate-x-1 transition-transform duration-300" size={20} />
//               </button>
//               <button className="px-8 py-4 border-2 border-lime-500 text-lime-400 font-bold text-lg rounded-full hover:bg-lime-500 hover:text-white transition-all duration-300 w-full sm:w-auto">
//                 Learn More
//               </button>
//             </motion.div>
//           </div>
//         </div> */}

//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-14 lg:pt-12 pb-10 sm:pb-16 lg:pb-12">
//           <div className="text-center">
//             <motion.h1
//               initial={{ opacity: 0, y: 20 }}
//               animate={isVisible || isHeroInView ? { opacity: 1, y: 0 } : {}}
//               transition={{ duration: 0.8, delay: 0.2 }}
//               className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
//             >
//               <span className="block mb-2">Powering the</span>
//               <span className="bg-gradient-to-r from-[#a3e635] via-[#22c55e] to-[#a3e635] bg-clip-text text-transparent drop-shadow-md">
//                 Future of Crypto
//               </span>
//             </motion.h1>

//             <motion.p
//               initial={{ opacity: 0, y: 20 }}
//               animate={isVisible || isHeroInView ? { opacity: 1, y: 0 } : {}}
//               transition={{ duration: 0.8, delay: 0.4 }}
//               className="text-base sm:text-lg lg:text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed px-4"
//             >
//               Welcome to <strong className="text-lime-400">Jaimax</strong>, one of the best crypto coins designed for growth,
//               transparency, and financial freedom. Built on powerful blockchain technology,
//               Jaimax offers a secure and scalable platform for users who want to be part of
//               the next generation of digital finance.
//             </motion.p>

//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={isVisible || isHeroInView ? { opacity: 1, y: 0 } : {}}
//               transition={{ duration: 0.8, delay: 0.6 }}
//               className="flex flex-col sm:flex-row gap-4 justify-center items-center"
//             >
//               <button
//                 onClick={handleGetStartedClick}
//                 className="group relative px-6 py-3 bg-gradient-to-r from-lime-500 to-green-600 text-white font-semibold text-base rounded-full shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 w-full sm:w-auto"
//               >
//                 Get Started Now
//                 <ArrowRight className="inline-block ml-2 group-hover:translate-x-1 transition-transform duration-300" size={18} />
//               </button>

//               <button className="px-6 py-3 border-2 border-lime-500 text-lime-400 font-semibold text-base rounded-full hover:bg-lime-500 hover:text-white transition-all duration-300 w-full sm:w-auto">
//                 Learn More
//               </button>
//             </motion.div>
//           </div>
//         </div>

//       </motion.div>

//       {/* Features Section */}
//       <motion.div
//         ref={featuresRef}
//         initial="hidden"
//         animate={isFeaturesInView ? "visible" : "hidden"}
//         variants={fadeIn}
//         className="relative z-10"
//       >
//         <div className="w-full px-4 sm:px-6 lg:px-8 py-5 sm:py-16 lg:py-10">
//   <div className="max-w-[1200px] ml-[7vw] mr-[7vw]">
//     <div className="text-center mb-12 sm:mb-16">
//       <motion.h2
//         initial={{ opacity: 0, y: 10 }}
//         animate={isFeaturesInView ? { opacity: 1, y: 0 } : {}}
//         transition={{ duration: 0.2, delay: 0.2 }}
//         className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6"
//       >
//         Core <span className="text-lime-400">Functional Features</span>
//       </motion.h2>
//       <motion.p
//         initial={{ opacity: 0, y: 10 }}
//         animate={isFeaturesInView ? { opacity: 1, y: 0 } : {}}
//         transition={{ duration: 0.8, delay: 0.4 }}
//         className="text-lg sm:text-xl text-gray-400 max-w-3xl ml-auto mr-auto"
//       >
//         Discover the powerful features that make Jaimax the perfect choice for your crypto journey
//       </motion.p>
//     </div>

//     <motion.div
//       variants={staggerContainer}
//       initial="hidden"
//       animate={isFeaturesInView ? "visible" : "hidden"}
//       className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10 sm:gap-6 justify-center"
//     >
//       {features.map((feature, index) => {
//         const IconComponent = feature.icon;
//         return (
//           <motion.div
//             key={index}
//             variants={itemVariants}
//             className="group bg-teal-700 rounded-xl p-5 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:bg-slate-600 border border-slate-600 hover:border-lime-500/50"
//           >
//             <div className="flex flex-col h-full">
//               <div className="flex items-center mb-4">
//                 <div className="bg-gradient-to-r from-lime-500 to-green-600 rounded-lg w-12 h-12 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 mr-4">
//                   <IconComponent className="text-white" size={22} />
//                 </div>
//                 <h3 className="text-lg font-bold text-lime-400 group-hover:text-lime-300 transition-colors duration-300">
//                   {feature.title}
//                 </h3>
//               </div>
//               <p className="text-gray-300 text-sm leading-relaxed flex-grow group-hover:text-gray-200 transition-colors duration-300">
//                 {feature.description}
//               </p>
//               <div className="mt-4 flex justify-end">
//                 <div className="w-9 h-9 rounded-full flex items-center justify-center bg-lime-500 border border-lime-500 group-hover:bg-slate-500 transition-all duration-300">
//                   <ArrowRight
//                     className="text-black-400 group-hover:text-white transform group-hover:translate-x-1 transition-all duration-300"
//                     size={15}
//                   />
//                 </div>
//               </div>
//             </div>
//           </motion.div>
//         );
//       })}
//     </motion.div>
//   </div>
// </div>

//       </motion.div>

//       {/* Why Choose Section */}
//       {/* <motion.div
//         ref={whyChooseRef}
//         initial="hidden"
//         animate={isWhyChooseInView ? "visible" : "hidden"}
//         variants={fadeIn}
//         className="relative z-10"
//       >
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
//           <div className="bg-gradient-to-r from-[#095359] to-[#006400] rounded-3xl p-8 sm:p-12 lg:p-16 border border-slate-600 shadow-2xl">
//             <div className="text-center">
//               <motion.h2
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={isWhyChooseInView ? { opacity: 1, y: 0 } : {}}
//                 transition={{ duration: 0.8, delay: 0.2 }}
//                 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
//               >
//                 Why <span className="text-lime-400">Jaimax</span> is a Top Choice
//               </motion.h2>
//               <motion.p
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={isWhyChooseInView ? { opacity: 1, y: 0 } : {}}
//                 transition={{ duration: 0.8, delay: 0.4 }}
//                 className="text-lg sm:text-xl lg:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed"
//               >
//                 Jaimax isn't just another coin — it's a complete crypto investment platform with features designed for real-world use. Our mission is to provide secure, scalable, and user-friendly solutions that put you first.
//               </motion.p>
//               <motion.p
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={isWhyChooseInView ? { opacity: 1, y: 0 } : {}}
//                 transition={{ duration: 0.8, delay: 0.6 }}
//                 className="text-base sm:text-lg text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed"
//               >
//                 Whether you're holding for long-term gains or exploring the future of decentralized finance, Jaimax offers everything you need in one place.
//               </motion.p>

//               <motion.div
//                 variants={staggerContainer}
//                 initial="hidden"
//                 animate={isWhyChooseInView ? "visible" : "hidden"}
//                 className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12"
//               >
//                 <motion.div variants={itemVariants} className="text-center p-6 rounded-2xl bg-slate-800 border border-slate-600 hover:border-lime-500/50 transition-all duration-300">
//                   <div className="text-3xl sm:text-4xl font-bold text-lime-400 mb-2">99.9%</div>
//                   <div className="text-gray-300 font-medium">Uptime Guarantee</div>
//                 </motion.div>
//                 <motion.div variants={itemVariants} className="text-center p-6 rounded-2xl bg-slate-800 border border-slate-600 hover:border-lime-500/50 transition-all duration-300">
//                   <div className="text-3xl sm:text-4xl font-bold text-lime-400 mb-2">50K+</div>
//                   <div className="text-gray-300 font-medium">Active Users</div>
//                 </motion.div>
//                 <motion.div variants={itemVariants} className="text-center p-6 rounded-2xl bg-slate-800 border border-slate-600 hover:border-lime-500/50 transition-all duration-300">
//                   <div className="text-3xl sm:text-4xl font-bold text-lime-400 mb-2">24/7</div>
//                   <div className="text-gray-300 font-medium">Support Available</div>
//                 </motion.div>
//               </motion.div>
//             </div>
//           </div>
//         </div>
//       </motion.div> */}

//       <motion.div
//   ref={whyChooseRef}
//   initial="hidden"
//   animate={isWhyChooseInView ? "visible" : "hidden"}
//   variants={fadeIn}
//   className="relative z-10"
// >
//   <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-4 py-10 sm:py-14 lg:py-10">
//     <div className=" rounded-3xl p-2 sm:p-10 lg:p-4  ">
//       <div className="text-center">
//         <motion.h2
//           initial={{ opacity: 0, y: 20 }}
//           animate={isWhyChooseInView ? { opacity: 1, y: 0 } : {}}
//           transition={{ duration: 0.7, delay: 0.2 }}
//           className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4"
//         >
//           Why <span className="text-lime-400">Jaimax</span> Stands Out
//         </motion.h2>

//         <motion.p
//           initial={{ opacity: 0, y: 20 }}
//           animate={isWhyChooseInView ? { opacity: 1, y: 0 } : {}}
//           transition={{ duration: 0.7, delay: 0.4 }}
//           className="text-sm sm:text-base text-gray-300 mb-6 max-w-3xl mx-auto leading-relaxed"
//         >
//           Jaimax goes beyond being a crypto coin — it's a full-stack platform built for secure, scalable, and user-focused crypto solutions.
//         </motion.p>

//         <motion.div
//           variants={staggerContainer}
//           initial="hidden"
//           animate={isWhyChooseInView ? "visible" : "hidden"}
//           className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-8"
//         >
//           <motion.div
//             variants={itemVariants}
//             className="rounded-xl text-center bg-slate-800 border border-slate-700 hover:border-lime-400/50 p-5 transition-all duration-300"
//           >
//             <div className="text-2xl sm:text-3xl font-bold text-lime-400">99.9%</div>
//             <div className="text-gray-300 text-sm font-medium mt-1">Uptime Guarantee</div>
//           </motion.div>

//           <motion.div
//             variants={itemVariants}
//             className="rounded-xl text-center bg-slate-800 border border-slate-700 hover:border-lime-400/50 p-5 transition-all duration-300"
//           >
//             <div className="text-2xl sm:text-3xl font-bold text-lime-400">50K+</div>
//             <div className="text-gray-300 text-sm font-medium mt-1">Active Users</div>
//           </motion.div>

//           <motion.div
//             variants={itemVariants}
//             className="rounded-xl text-center bg-slate-800 border border-slate-700 hover:border-lime-400/50 p-5 transition-all duration-300"
//           >
//             <div className="text-2xl sm:text-3xl font-bold text-lime-400">24/7</div>
//             <div className="text-gray-300 text-sm font-medium mt-1">Live Support</div>
//           </motion.div>
//         </motion.div>
//       </div>
//     </div>
//   </div>
// </motion.div>

//       <style jsx>{`
//         .bg-grid-pattern {
//           background-image:
//             linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px),
//             linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
//           background-size: 50px 50px;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default JaimaxLanding;

// import React from "react";
// import { Play } from "lucide-react";

// const hexImages = [
//   {
//     src: "https://images.unsplash.com/photo-1611079221193-1d3d34df3ff1?w=400&h=400&fit=crop",
//     rotate: "-5deg",
//     top: "10%",
//     left: "10%",
//   },
//   {
//     src: "https://images.unsplash.com/photo-1612435974214-c351f7a8f984?w=400&h=400&fit=crop",
//     rotate: "10deg",
//     top: "35%",
//     left: "0%",
//   },
//   {
//     src: "https://images.unsplash.com/photo-1613145992851-67b44853bb09?w=400&h=400&fit=crop",
//     rotate: "-15deg",
//     top: "20%",
//     left: "35%",
//   },
//   {
//     src: "https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg?cs=srgb&dl=pexels-souvenirpixels-414612.jpg&fm=jpg",
//     rotate: "8deg",
//     top: "55%",
//     left: "20%",
//   },
//   {
//     src: "https://images.unsplash.com/photo-1612937893669-05caefec74f7?w=400&h=400&fit=crop",
//     rotate: "18deg",
//     top: "70%",
//     left: "5%",
//   },
// ];

// const RotatedHex = ({ src, rotate, top, left }) => (
//   <div
//     className="absolute w-[110px] h-[125px] hex"
//     style={{ top, left, transform: `rotate(${rotate})` }}
//   >
//     <img src={src} alt="hex" className="w-full h-full object-cover rounded-lg" />
//   </div>
// );

// const JaimaxLanding = () => {
//   return (
//     <section className="relative bg-[#1d8e85] text-white py-16 px-6 overflow-hidden">
//       <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-12 relative z-10">
//         {/* Left: Floating Hexagons */}
//         <div className="relative w-full h-[500px]">
//           {hexImages.map((hex, index) => (
//             <RotatedHex key={index} {...hex} />
//           ))}
//         </div>

//         {/* Right: Headline + Content */}
//         <div className="z-20">
//           <h1 className="text-4xl md:text-5xl font-bold text-white leading-snug">
//             Life With <span className="text-white">Jaimax Coin</span><br /> Is Secure &{" "}
//             <span className="text-yellow-500">Powerful</span>
//           </h1>
//           <p className="text-gray-300 mt-6 text-lg max-w-md">
//             Experience seamless digital transactions and revolutionary blockchain technology with Jaimax.
//           </p>

//           <div className="flex gap-4 mt-8 flex-wrap">
//             <button className="bg-yellow-500 hover:bg-yellow-600 text-black px-6 py-3 rounded-lg font-semibold shadow-md transition">
//               Start Investing
//             </button>
//             <button className="flex items-center gap-2 px-6 py-3 border border-yellow-500 text-yellow-300 hover:bg-yellow-500 hover:text-black rounded-lg transition">
//               <div className="bg-yellow-500 text-black p-1.5 rounded-full">
//                 <Play size={16} />
//               </div>
//               Learn More
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Hexagon Shape CSS */}
//       <style jsx>{`
//         .hex {
//           clip-path: polygon(
//             50% 0%,
//             93% 25%,
//             93% 75%,
//             50% 100%,
//             7% 75%,
//             7% 25%
//           );
//           background-color: #1a1a1a;
//           box-shadow: 0 0 10px #facc15;
//           transition: transform 0.3s ease;
//         }

//         .hex:hover {
//           transform: scale(1.05);
//         }
//       `}</style>
//     </section>
//   );
// };

// export default JaimaxLanding;
// import React from "react";
// import { Play } from "lucide-react";

// const hexImages = [
//   {
//     src: "https://images.unsplash.com/photo-1611079221193-1d3d34df3ff1?w=400&h=400&fit=crop",
//     rotate: "-5deg",
//     top: "0px",
//     left: "10px",
//   },
//   {
//     src: "https://images.unsplash.com/photo-1612435974214-c351f7a8f984?w=400&h=400&fit=crop",
//     rotate: "10deg",
//     top: "210px",
//     left: "100px",
//   },
//   {
//     src: "https://images.unsplash.com/photo-1613145992851-67b44853bb09?w=400&h=400&fit=crop",
//     rotate: "-15deg",
//     top: "0px",
//     left: "190px",
//   },
//   {
//     src: "https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg?cs=srgb&dl=pexels-souvenirpixels-414612.jpg&fm=jpg",
//     rotate: "8deg",
//     top: "210px",
//     left: "280px",
//   },
//   {
//     src: "https://images.unsplash.com/photo-1612937893669-05caefec74f7?w=400&h=400&fit=crop",
//     rotate: "18deg",
//     top: "420px",
//     left: "10px",
//   },
//   {
//     src: "https://images.unsplash.com/photo-1591696331119-7b0b4f1b387c?w=400&h=400&fit=crop",
//     rotate: "-10deg",
//     top: "420px",
//     left: "190px",
//   },
// ];

// const RotatedHex = ({ src, rotate, top, left }) => (
//   <div
//     className="absolute w-[180px] h-[200px] hex"
//     style={{ top, left, transform: `rotate(${rotate})` }}
//   >
//     <img src={src} alt="hex" className="w-full h-full object-cover rounded-lg" />
//   </div>
// );

// const FloatingCircle = ({ size, top, left, color }) => (
//   <div
//     className="absolute rounded-full opacity-30 blur-2xl"
//     style={{
//       width: size,
//       height: size,
//       top,
//       left,
//       backgroundColor: color,
//     }}
//   ></div>
// );

// const JaimaxLanding = () => {
//   return (
//     <section className="relative bg-[#1d8e85] text-white px-6 overflow-hidden">
//       <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-12 relative z-10 min-h-[750px]">
//         <div className="relative w-[500px] h-[500px] overflow-hidden">
//           {hexImages.map((hex, index) => (
//             <RotatedHex key={index} {...hex} />
//           ))}
//           <FloatingCircle size="120px" top="20%" left="70%" color="#facc15" />
//           <FloatingCircle size="170px" top="65%" left="60%" color="#ffffff" />
//           <FloatingCircle size="140px" top="40%" left="85%" color="#00ffc3" />
//         </div>
//         <div className="z-20">
//           <h1 className="text-5xl font-bold text-white leading-snug">
//             Life With <span className="text-[#b8cc26]">Jaimax Coin</span><br />Is Secure & <span className="text-yellow-400">Powerful</span>
//           </h1>
//           <p className="text-gray-200 mt-6 text-lg max-w-md">
//             Experience seamless digital transactions and revolutionary blockchain technology with Jaimax.
//           </p>
//           <div className="flex gap-4 mt-8 flex-wrap">
//             <button className="bg-yellow-400 hover:bg-yellow-500 text-black px-6 py-3 rounded-lg font-semibold shadow-md transition">
//               Start Investing
//             </button>
//             <button className="flex items-center gap-2 px-6 py-3 border border-yellow-300 text-yellow-200 hover:bg-yellow-300 hover:text-black rounded-lg transition">
//               <div className="bg-yellow-300 text-black p-1.5 rounded-full">
//                 <Play size={16} />
//               </div>
//               Learn More
//             </button>
//           </div>
//         </div>
//       </div>
//       <style jsx>{`
//         .hex {
//           clip-path: polygon(
//             50% 0%,
//             93% 25%,
//             93% 75%,
//             50% 100%,
//             7% 75%,
//             7% 25%
//           );
//           background-color: #1a1a1a;
//           box-shadow: 0 0 10px #facc15;
//           transition: transform 0.3s ease;
//         }
//         .hex:hover {
//           transform: scale(1.05);
//         }
//       `}</style>
//     </section>
//   );
// };

// export default JaimaxLanding;


import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { TrendingUp, Shield, Users, Globe, BookOpen, Settings, CreditCard, Headphones, ArrowRight, Play } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const JaimaxLanding = () => {
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate()

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Refs for each section
  const heroRef = useRef(null);
  const featuresRef = useRef(null);
  const whyChooseRef = useRef(null);
  const hexSectionRef = useRef(null);
  
  const isHeroInView = useInView(heroRef, { once: true, amount: 0.5 });
  const isFeaturesInView = useInView(featuresRef, { once: true, amount: 0.3 });
  const isWhyChooseInView = useInView(whyChooseRef, { once: true, amount: 0.4 });
  const isHexSectionInView = useInView(hexSectionRef, { once: true, amount: 0.3 });

  const features = [
    {
      icon: Shield,
      title: "User Account Management",
      description: "Easily create and manage your personal Jaimax wallet. Our secure dashboard helps you track token balances, purchases, and transaction history all in one place."
    },
    {
      icon: Settings,
      title: "Privacy Settings & Data Protection",
      description: "Your privacy matters. Jaimax uses advanced encryption to protect your data and allows you to control how your personal information is stored and shared."
    },
    {
      icon: CreditCard,
      title: "Secure Payment Processing",
      description: "All transactions are powered by blockchain, ensuring fast, secure, and tamper-proof payments. You can invest and transfer with confidence."
    },
    {
      icon: Headphones,
      title: "24/7 Communication and Support",
      description: "Get round-the-clock assistance from our expert support team. Whether you have questions about your wallet, transactions, or features, we're here to help."
    },
    {
      icon: TrendingUp,
      title: "Smart Analytics & Cookie Control",
      description: "We provide real-time performance insights while allowing full control over cookies and tracking. It's all part of a transparent and secure user experience."
    },
    {
      icon: Globe,
      title: "International Access & Data Transfers",
      description: "Jaimax supports global users with seamless cross-border crypto transactions. Our platform is built to serve an international audience with full compliance."
    },
    {
      icon: BookOpen,
      title: "Educational Resources",
      description: "We empower users with simple, clear content about crypto, blockchain, DeFi, and tokenomics. Our resources are ideal for beginners and experts alike."
    },
    {
      icon: Users,
      title: "Policy Updates & User Rights",
      description: "Stay up to date with regular policy notifications. Jaimax ensures full user control over personal data, privacy settings, and account activity."
    }
  ];

  const hexImages = [
    {
      src: "https://images.unsplash.com/photo-1611079221193-1d3d34df3ff1?w=400&h=400&fit=crop",
      rotate: "-5deg",
      top: "0px",
      left: "10px",
    },
    {
      src: "https://images.unsplash.com/photo-1612435974214-c351f7a8f984?w=400&h=400&fit=crop",
      rotate: "10deg",
      top: "210px",
      left: "100px",
    },
    {
      src: "https://images.unsplash.com/photo-1613145992851-67b44853bb09?w=400&h=400&fit=crop",
      rotate: "-15deg",
      top: "0px",
      left: "190px",
    },
    {
      src: "https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg?cs=srgb&dl=pexels-souvenirpixels-414612.jpg&fm=jpg",
      rotate: "8deg",
      top: "210px",
      left: "280px",
    },
    {
      src: "https://images.unsplash.com/photo-1612937893669-05caefec74f7?w=400&h=400&fit=crop",
      rotate: "18deg",
      top: "420px",
      left: "10px",
    },
    {
      src: "https://images.unsplash.com/photo-1591696331119-7b0b4f1b387c?w=400&h=400&fit=crop",
      rotate: "-10deg",
      top: "420px",
      left: "190px",
    },
  ];

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const handleGetStartedClick = () => {
    console.log("Navigating to login/signup page...");
  };

  const RotatedHex = ({ src, rotate, top, left }) => (
    <div
      className="absolute w-[180px] h-[200px] hex"
      style={{ top, left, transform: `rotate(${rotate})` }}
    >
      <img src={src} alt="hex" className="w-full h-full object-cover rounded-lg" />
    </div>
  );

  const FloatingCircle = ({ size, top, left, color }) => (
    <div
      className="absolute rounded-full opacity-30 blur-2xl"
      style={{
        width: size,
        height: size,
        top,
        left,
        // backgroundColor: color,
      }}
    ></div>
  );

  return (
    <div className="min-h-screen">
      {/* Hero Section */}

       <motion.section
        ref={hexSectionRef}
        initial="hidden"
        animate={isHexSectionInView ? "visible" : "hidden"}
        variants={fadeIn}
        className="relative bg-[#095359] text-white px-6 overflow-hidden"
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 py-12 gap-12 relative z-10 min-h-[600px]">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isHexSectionInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative w-[500px] h-[500px] overflow-hidden"
          >
            {hexImages.map((hex, index) => (
              <RotatedHex key={index} {...hex} />
            ))}
            <FloatingCircle size="120px" top="20%" left="70%" color="#facc15" />
            <FloatingCircle size="170px" top="65%" left="60%" color="#ffffff" />
            <FloatingCircle size="140px" top="40%" left="85%" color="#00ffc3" />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isHexSectionInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="z-20 py-12"
          >
            <h1 className="text-5xl font-bold text-white leading-snug">
              Life With <span className="text-[#b8cc26]">Jaimax Coin</span><br />Is Secure & <span className="text-yellow-400">Powerful</span>
            </h1>
            <p className="text-gray-200 mt-6 text-lg max-w-md">
              Experience seamless digital transactions and revolutionary blockchain technology with Jaimax.
            </p>
            <div className="flex gap-4 mt-8 flex-wrap">
              <button
              onClick={() => navigate("/")}
              className="bg-yellow-400 hover:bg-yellow-500 text-black px-6 py-3 rounded-lg font-semibold shadow-md transition">
                Start Investing
              </button>
              <button
              onClick={() => navigate("/blog")}
              className="flex items-center gap-2 px-6 py-3 border border-yellow-300 text-yellow-200 hover:bg-yellow-300 hover:text-black rounded-lg transition">
                <div className="bg-yellow-300 text-black p-1.5 rounded-full">
                  <Play size={16} />
                </div>
                Learn More
              </button>
            </div>
          </motion.div>
        </div>
      </motion.section>

      <style jsx>{`
        .bg-grid-pattern {
          background-image:
            linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
          background-size: 50px 50px;
        }
        .hex {
          clip-path: polygon(
            50% 0%,
            93% 25%,
            93% 75%,
            50% 100%,
            7% 75%,
            7% 25%
          );
          background-color: #1a1a1a;
          
          transition: transform 0.3s ease;
        }
        .hex:hover {
          transform: scale(1.05);
        }
      `}</style>
      <div className="text-white bg-[#095359]  relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0  opacity-5"></div>
        </div>

        <motion.div
          ref={heroRef}
          initial="hidden"
          animate={isVisible || isHeroInView ? "visible" : "hidden"}
          variants={fadeIn}
          className="relative z-10"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-14 lg:pt-12 pb-10 sm:pb-16 lg:pb-12">
            <div className="text-center">
              {/* <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={isVisible || isHeroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
              >
                <span className="block mb-2">Powering the</span>
                <span className="bg-[#095359]  text-yellow-500 bg-clip-text text-transparent drop-shadow-md">
                  Future of Crypto
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={isVisible || isHeroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-base sm:text-lg lg:text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed px-4"
              >
                Welcome to <strong className="text-lime-400">Jaimax</strong>, one of the best crypto coins designed for growth,
                transparency, and financial freedom. Built on powerful blockchain technology,
                Jaimax offers a secure and scalable platform for users who want to be part of
                the next generation of digital finance.
              </motion.p> */}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isVisible || isHeroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              >
                <button
                  onClick={handleGetStartedClick}
                  className="group relative px-6 py-3 bg-gradient-to-r from-lime-500 to-green-600 text-white font-semibold text-base rounded-full shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 w-full sm:w-auto"
                >
                  Get Started Now
                  <ArrowRight className="inline-block ml-2 group-hover:translate-x-1 transition-transform duration-300" size={18} />
                </button>

                <button className="px-6 py-3 border-2 border-lime-500 text-lime-400 font-semibold text-base rounded-full hover:bg-lime-500 hover:text-white transition-all duration-300 w-full sm:w-auto">
                  Learn More
                </button>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Features Section */}
      <div className=" bg-[#095359]  text-white">
        <motion.div
          ref={featuresRef}
          initial="hidden"
          animate={isFeaturesInView ? "visible" : "hidden"}
          variants={fadeIn}
          className="relative z-10"
        >
          <div className="w-full px-4 sm:px-6 lg:px-8 py-5 sm:py-16 lg:py-10">
            <div className="max-w-[1200px] ml-[7vw] mr-[7vw]">
              <div className="text-center mb-12 sm:mb-16">
                <motion.h2
                  initial={{ opacity: 0, y: 10 }}
                  animate={isFeaturesInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.2, delay: 0.2 }}
                  className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6"
                >
                  Core <span className="text-lime-400">Functional Features</span>
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={isFeaturesInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="text-lg sm:text-xl text-gray-400 max-w-3xl ml-auto mr-auto"
                >
                  Discover the powerful features that make Jaimax the perfect choice for your crypto journey
                </motion.p>
              </div>

              <motion.div
                variants={staggerContainer}
                initial="hidden"
                animate={isFeaturesInView ? "visible" : "hidden"}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10 sm:gap-6 justify-center"
              >
                {features.map((feature, index) => {
                  const IconComponent = feature.icon;
                  return (
                    <motion.div
                      key={index}
                      variants={itemVariants}
                      className="group bg-teal-700 rounded-xl p-5 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:bg-slate-600 border border-slate-600 hover:border-lime-500/50"
                    >
                      <div className="flex flex-col h-full">
                        <div className="flex items-center mb-4">
                          <div className="bg-gradient-to-r from-lime-500 to-green-600 rounded-lg w-12 h-12 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 mr-4">
                            <IconComponent className="text-white" size={22} />
                          </div>
                          <h3 className="text-lg font-bold text-lime-400 group-hover:text-lime-300 transition-colors duration-300">
                            {feature.title}
                          </h3>
                        </div>
                        <p className="text-gray-300 text-sm leading-relaxed flex-grow group-hover:text-gray-200 transition-colors duration-300">
                          {feature.description}
                        </p>
                        <div className="mt-4 flex justify-end">
                          <div className="w-9 h-9 rounded-full flex items-center justify-center bg-lime-500 border border-lime-500 group-hover:bg-slate-500 transition-all duration-300">
                            <ArrowRight
                              className="text-black-400 group-hover:text-white transform group-hover:translate-x-1 transition-all duration-300"
                              size={15}
                            />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Why Choose Section */}
      <div className="bg-[#095359]  text-white">
        <motion.div
          ref={whyChooseRef}
          initial="hidden"
          animate={isWhyChooseInView ? "visible" : "hidden"}
          variants={fadeIn}
          className="relative z-10"
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-4 py-10 sm:py-14 lg:py-10">
            <div className="rounded-3xl p-2 sm:p-10 lg:p-4">
              <div className="text-center">
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={isWhyChooseInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.7, delay: 0.2 }}
                  className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4"
                >
                  Why <span className="text-lime-400">Jaimax</span> Stands Out
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={isWhyChooseInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.7, delay: 0.4 }}
                  className="text-sm sm:text-base text-gray-300 mb-6 max-w-3xl mx-auto leading-relaxed"
                >
                  Jaimax goes beyond being a crypto coin — it's a full-stack platform built for secure, scalable, and user-focused crypto solutions.
                </motion.p>

                <motion.div
                  variants={staggerContainer}
                  initial="hidden"
                  animate={isWhyChooseInView ? "visible" : "hidden"}
                  className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-8"
                >
                  <motion.div
                    variants={itemVariants}
                    className="rounded-xl text-center bg-slate-800 border border-slate-700 hover:border-lime-400/50 p-5 transition-all duration-300"
                  >
                    <div className="text-2xl sm:text-3xl font-bold text-lime-400">99.9%</div>
                    <div className="text-gray-300 text-sm font-medium mt-1">Uptime Guarantee</div>
                  </motion.div>

                  <motion.div
                    variants={itemVariants}
                    className="rounded-xl text-center bg-slate-800 border border-slate-700 hover:border-lime-400/50 p-5 transition-all duration-300"
                  >
                    <div className="text-2xl sm:text-3xl font-bold text-lime-400">50K+</div>
                    <div className="text-gray-300 text-sm font-medium mt-1">Active Users</div>
                  </motion.div>

                  <motion.div
                    variants={itemVariants}
                    className="rounded-xl text-center bg-slate-800 border border-slate-700 hover:border-lime-400/50 p-5 transition-all duration-300"
                  >
                    <div className="text-2xl sm:text-3xl font-bold text-lime-400">24/7</div>
                    <div className="text-gray-300 text-sm font-medium mt-1">Live Support</div>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Hexagon Section */}
     
    </div>
  );
};

export default JaimaxLanding;



