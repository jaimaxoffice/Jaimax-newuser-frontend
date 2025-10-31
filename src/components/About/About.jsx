// import React, { useEffect, useState } from "react";
// import { motion, useAnimation, useInView } from "framer-motion";
// import { useNavigate } from "react-router-dom";
// import Seo from '../../SeoContent/Seo'
// // import about from '../../assets/Images/future.png'
// const about='https://m.foolcdn.com/media/dubs/images/Businessman_using_tablet_online_banking_exchan.width-600.jpg'
// // SVG Icons as React Components (These remain the same as they are functional)
// const CoinsIcon = ({ className = "w-6 h-6" }) => (
//   <svg className={className} fill="currentColor" viewBox="0 0 24 24">
//     <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2" />
//     <text x="12" y="16" textAnchor="middle" fontSize="10" fill="currentColor">$</text>
//   </svg>
// );

// const TrendingUpIcon = ({ className = "w-6 h-6" }) => (
//   <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
//     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
//   </svg>
// );

// const ShieldIcon = ({ className = "w-6 h-6" }) => (
//   <svg className={className} fill="currentColor" viewBox="0 0 24 24">
//     <path d="M12 2L4 5V11C4 16.55 7.84 21.74 12 23C16.16 21.74 20 16.55 20 11V5L12 2Z" />
//     <path d="M9 12L11 14L15 10" fill="none" stroke="white" strokeWidth="2" />
//   </svg>
// );

// const GlobeIcon = ({ className = "w-6 h-6" }) => (
//   <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
//     <circle cx="12" cy="12" r="10" />
//     <line x1="2" y1="12" x2="22" y2="12" />
//     <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
//   </svg>
// );

// const TransparencyIcon = ({ className = "w-8 h-8" }) => (
//   <svg className={className} viewBox="0 0 48 48" fill="none">
//     <circle cx="24" cy="24" r="20" fill="#a3e635" />
//     <circle cx="24" cy="24" r="16" fill="#a3e635" />
//     <circle cx="24" cy="24" r="12" fill="#a3e635" />
//     <circle cx="24" cy="24" r="8" fill="#a3e635" />
//     <circle cx="24" cy="24" r="4" fill="#a3e635" />
//     <path d="M16 24h16M24 16v16" stroke="white" strokeWidth="2" />
//   </svg>
// );

// const TeamIcon = ({ className = "w-8 h-8" }) => (
//   <svg
//     className={className}
//     height="200px"
//     width="200px"
//     viewBox="0 0 512 512"
//     xmlns="http://www.w3.org/2000/svg"
//     fill="none"
//   >
//     <g>
//       <path
//         className="fill-lime-400"
//         d="M435.95,287.525c32.51,0,58.87-26.343,58.87-58.853c0-32.51-26.361-58.871-58.87-58.871
//         c-32.502,0-58.863,26.361-58.863,58.871C377.088,261.182,403.448,287.525,435.95,287.525z"
//       />
//       <path
//         className="fill-lime-400"
//         d="M511.327,344.251c-2.623-15.762-15.652-37.822-25.514-47.677c-1.299-1.306-7.105-1.608-8.673-0.636
//         c-11.99,7.374-26.074,11.714-41.19,11.714c-15.099,0-29.184-4.34-41.175-11.714c-1.575-0.972-7.373-0.67-8.672,0.636
//         c-2.757,2.757-5.765,6.427-8.698,10.683c7.935,14.94,14.228,30.81,16.499,44.476c2.27,13.7,1.533,26.67-2.138,38.494
//         c13.038,4.717,28.673,6.787,44.183,6.787C476.404,397.014,517.804,382.987,511.327,344.251z"
//       />
//       <path
//         className="fill-lime-400"
//         d="M254.487,262.691c52.687,0,95.403-42.716,95.403-95.402c0-52.67-42.716-95.386-95.403-95.386
//         c-52.678,0-95.378,42.716-95.378,95.386C159.109,219.975,201.808,262.691,254.487,262.691z"
//       />
//       <path
//         className="fill-lime-400"
//         d="M335.269,277.303c-2.07-2.061-11.471-2.588-14.027-1.006c-19.448,11.966-42.271,18.971-66.755,18.971
//         c-24.466,0-47.3-7.005-66.738-18.971c-2.555-1.583-11.956-1.055-14.026,1.006c-16.021,16.004-37.136,51.782-41.384,77.288
//         c-10.474,62.826,56.634,85.508,122.148,85.508c65.532,0,132.639-22.682,122.165-85.508
//         C372.404,329.085,351.289,293.307,335.269,277.303z"
//       />
//       <path
//         className="fill-lime-400"
//         d="M76.049,287.525c32.502,0,58.862-26.343,58.862-58.853c0-32.51-26.36-58.871-58.862-58.871
//         c-32.511,0-58.871,26.361-58.871,58.871C17.178,261.182,43.538,287.525,76.049,287.525z"
//       />
//       <path
//         className="fill-lime-400"
//         d="M115.094,351.733c2.414-14.353,9.225-31.253,17.764-46.88c-2.38-3.251-4.759-6.083-6.955-8.279
//         c-1.299-1.306-7.097-1.608-8.672-0.636c-11.991,7.374-26.076,11.714-41.182,11.714c-15.108,0-29.202-4.34-41.183-11.714
//         c-1.568-0.972-7.382-0.67-8.681,0.636c-9.887,9.854-22.882,31.915-25.514,47.677c-6.468,38.736,34.924,52.762,75.378,52.762
//         c14.437,0,29.016-1.777,41.459-5.84C113.587,379.108,112.757,365.835,115.094,351.733z"
//       />
//     </g>
//   </svg>
// );

// const SecurityIcon = ({ className = "w-8 h-8" }) => (
//   <svg
//     viewBox="0 0 24 24"
//     xmlns="http://www.w3.org/2000/svg"
//     className={className}
//     fill="#a3e635"
//   >
//     <path d="M19.42,3.83,12.24,2h0A.67.67,0,0,0,12,2a.67.67,0,0,0-.2,0h0L4.58,3.83A2,2,0,0,0,3.07,5.92l.42,5.51a12,12,0,0,0,7.24,10.11l.88.38h0a.91.91,0,0,0,.7,0h0l.88-.38a12,12,0,0,0,7.24-10.11l.42-5.51A2,2,0,0,0,19.42,3.83ZM15.71,9.71l-4,4a1,1,0,0,1-1.42,0l-2-2a1,1,0,0,1,1.42-1.42L11,11.59l3.29-3.3a1,1,0,0,1,1.42,1.42Z" />
//   </svg>
// );

// const PlayIcon = ({ className = "w-6 h-6" }) => (
//   <svg className={className} fill="currentColor" viewBox="0 0 24 24">
//     <path d="M8 5v14l11-7z" />
//   </svg>
// );

// const CloseIcon = ({ className = "w-6 h-6" }) => (
//   <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
//     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//   </svg>
// );

// const features = [
//   {
//     icon: <TrendingUpIcon className="w-6 h-6" />,
//     text: "Best crypto coin in India for new investors looking for trust and transparency."
//   },
//   {
//     icon: <GlobeIcon className="w-6 h-6" />,
//     text: "A fast-growing Indian blockchain project with global scalability."
//   },
//   {
//     icon: <ShieldIcon className="w-6 h-6" />,
//     text: "Backed by a passionate team committed to long-term growth and education."
//   },
//   {
//     icon: <CoinsIcon className="w-6 h-6" />,
//     text: "A powerful opportunity to be part of one of India's most promising crypto coins."
//   }
// ];

// const missionCards = [
//   {
//     icon: <TransparencyIcon className="w-16 h-16" />,
//     title: "Transparency",
//     description: "Best crypto coin in India for new investors looking for trust and transparency."
//   },
//   {
//     icon: <TeamIcon className="w-16 h-16" />,
//     title: "Experienced team",
//     description: "Backed by a passionate team committed to long-term growth and education."
//   },
//   {
//     icon: <SecurityIcon className="w-16 h-16" />,
//     title: "Security guarantee",
//     description: "A powerful opportunity to be part of one of India's most promising crypto coins."
//   }
// ];

// // Subtle floating particles
// const FloatingParticles = () => {
//   const [particles, setParticles] = useState([]);

//   useEffect(() => {
//     const generateParticles = () => {
//       const newParticles = [];
//       for (let i = 0; i < 12; i++) {
//         newParticles.push({
//           id: i,
//           x: Math.random() * 100,
//           y: Math.random() * 100,
//           size: Math.random() * 2 + 1,
//           delay: Math.random() * 3,
//         });
//       }
//       setParticles(newParticles);
//     };
//     generateParticles();
//   }, []);

//   return (
//     <div className="absolute inset-0 overflow-hidden pointer-events-none">
//       {particles.map((particle) => (
//         <motion.div
//           key={particle.id}
//           className="absolute w-1 h-1 bg-teal-400 rounded-full opacity-10"
//           style={{
//             left: `${particle.x}%`,
//             top: `${particle.y}%`,
//             width: `${particle.size}px`,
//             height: `${particle.size}px`,
//           }}
//           animate={{
//             y: [0, -20, 0],
//             opacity: [0.1, 0.3, 0.1],
//           }}
//           transition={{
//             duration: 6,
//             repeat: Infinity,
//             delay: particle.delay,
//             ease: "easeInOut",
//           }}
//         />
//       ))}
//     </div>
//   );
// };

// const AnimatedSection = ({ children, className = "" }) => {
//   const controls = useAnimation();
//   const ref = React.useRef(null);
//   const inView = useInView(ref, { once: true, threshold: 0.1 });

//   useEffect(() => {
//     if (inView) {
//       controls.start("visible");
//     }
//   }, [controls, inView]);

//   return (
//     <motion.div
//       ref={ref}
//       animate={controls}
//       initial="hidden"
//       variants={{
//         visible: { opacity: 1, y: 0 },
//         hidden: { opacity: 0, y: 20 }
//       }}
//       transition={{ duration: 0.6, ease: "easeOut" }}
//       className={className}
//     >
//       {children}
//     </motion.div>
//   );
// };

// // Video Modal Component
// const VideoModal = ({ isOpen, onClose }) => {
//   if (!isOpen) return null;

//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       exit={{ opacity: 0 }}
//       className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4"
//       onClick={onClose}
//     >
//       <motion.div
//         initial={{ scale: 0.8, opacity: 0 }}
//         animate={{ scale: 1, opacity: 1 }}
//         exit={{ scale: 0.8, opacity: 0 }}
//         className="relative max-w-4xl w-full"
//         onClick={(e) => e.stopPropagation()}
//       >
//         <button
//           onClick={onClose}
//           className="absolute -top-10 right-0 text-white hover:text-gray-300 transition-colors"
//         >
//           <CloseIcon className="w-8 h-8" />
//         </button>
//         <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
//           <iframe
//             className="absolute top-0 left-0 w-full h-full rounded-lg"
//             src="https://www.youtube.com/embed/SsoOifQVL5s?si=9OL3dWLSPFtKm4ND"
//             title="YouTube video player"
//             frameBorder="0"
//             allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
//             referrerPolicy="strict-origin-when-cross-origin"
//             allowFullScreen
//           />
//         </div>
//       </motion.div>
//     </motion.div>
//   );
// };

// const JaimaxOverview = () => {
//   const [isVideoOpen, setIsVideoOpen] = useState(false);
//   const navigate = useNavigate();

//   const openVideo = () => setIsVideoOpen(true);
//   const closeVideo = () => setIsVideoOpen(false);

//   const navigateToLogin = () => {
//     navigate('/login');
//   };

//   // Variants for the "Why Choose Jaimax?" features list
//   const featuresContainerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.1,
//         delayChildren: 0.3,
//       },
//     },
//   };

//   const featureItemVariants = {
//     hidden: { opacity: 0, x: -20 },
//     visible: { opacity: 1, x: 0 },
//   };

//   // Variants for the "Our Mission" cards
//   const missionContainerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.15, // Slightly different stagger for these cards
//         delayChildren: 0.2,
//       },
//     },
//   };

//   const missionCardItemVariants = {
//     hidden: { opacity: 0, y: 30 }, // Cards animate from bottom up
//     visible: { opacity: 1, y: 0 },
//   };

//   return (
//     <div className="relative min-h-screen text-white overflow-hidden bg-[#085056]">
//       <Seo page="about" />
//       <FloatingParticles />

//       {/* This outer div now only handles the background and particle effect */}
//       {/* Hero Section - Text on Image */}
//       <AnimatedSection className="mb-20">
//         <motion.div
//           whileHover={{ scale: 1.01 }}
//           transition={{ duration: 0.3 }}
//           className="relative rounded-xl shadow-xl overflow-hidden h-[400px] w-full flex items-center justify-center"
//         >
//           <img
//             src={about}
//             alt="Jaimax Hero Banner"
//             className="absolute inset-0 w-full h-full object-cover" // This is where we control the image's size
//           />

//           <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-center p-4">
//             <motion.h1
//               initial={{ opacity: 0, y: -30 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.8, delay: 0.4 }}
//               className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight bg-gradient-to-r from-teal-400 via-green-400 to-emerald-500 bg-clip-text text-transparent mb-4 drop-shadow-lg"
//             >
//               About Jaimax
//             </motion.h1>
//             <motion.p
//               initial={{ opacity: 0, y: -20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.8, delay: 0.6 }}
//               className="text-base sm:text-xl md:text-2xl text-gray-100 mb-8 max-w-3xl mx-auto [text-shadow:_0_2px_4px_rgb(0_0_0_/_70%)] px-2"
//             >
//               Building the Future of Digital Finance
//             </motion.p>
//             <motion.div
//               initial={{ width: 0 }}
//               animate={{ width: "250px" }}
//               transition={{ duration: 1.2, delay: 0.8, ease: "easeOut" }}
//               className="h-1 bg-gradient-to-r from-teal-400 via-green-400 to-transparent mx-auto mb-5"
//             />
//           </div>
//         </motion.div>
//       </AnimatedSection>

//       {/* This div now contains the rest of your content and maintains the max-width */}
//       <div className="max-w-8xl mx-auto relative z-10 px-4 sm:px-8 lg:px-20 py-0">
//         <AnimatedSection className="mb-20">
//           <p className="text-teal-400 text-sm font-semibold mb-4 uppercase tracking-wider text-center lg:text-left">OUR MISSION</p>
//           <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-12 gap-8">
//             <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white max-w-2xl text-center lg:text-left">
//               We are helping people get success.
//             </h2>
//             <p className="text-white max-w-lg leading-relaxed text-center lg:text-left">
//               Jaimax is an innovative cryptocurrency in India designed to transform the way people invest, transact, and grow in the blockchain era. As a secure and utility-driven crypto coin, Jaimax brings together technology, transparency, and trust to create a strong foundation for the future of decentralized finance (DeFi).
//               {/* Jaimax aims to be the top crypto project from India, creating impact far beyond borders. We're building a financial ecosystem that connects users, traders, and learners. With our strong blockchain foundation, we offer a safe and secure space for everyone to explore the future of crypto. */}
//             </p>
//             <p>
              
//             </p>
//           </div>

//           {/* Apply variants to the parent div for staggering mission cards */}
//           <motion.div
//             variants={missionContainerVariants}
//             initial="hidden"
//             whileInView="visible"
//             viewport={{ once: true, amount: 0.2 }} // Animate when 20% of the container is in view
//             className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
//           >
//             {missionCards.map((card, idx) => (
//               <motion.div
//                 key={idx}
//                 variants={missionCardItemVariants} // Apply item variants here
//                 whileHover={{ y: -5 }}
//                 className="bg-gray-800/50 rounded-2xl p-8 text-center backdrop-blur-sm border border-gray-700/50 flex flex-col justify-between items-center h-full"
//               >
//                 <div className="mb-6 flex justify-center">
//                   {card.icon}
//                 </div>
//                 <div>
//                   <h3 className="text-xl font-semibold text-white mb-4">{card.title}</h3>
//                   <p className="text-white text-sm leading-relaxed">{card.description}</p>
//                 </div>
//               </motion.div>
//             ))}
//           </motion.div>
//         </AnimatedSection>

//         {/* Why Now Section */}
//         <AnimatedSection className="mb-20">
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
//             {/* Images Grid */}
//             <div className="grid grid-cols-2 gap-4 order-2 lg:order-1">
//               <motion.div
//                 whileHover={{ scale: 1.05 }}
//                 className="col-span-2 relative rounded-2xl overflow-hidden"
//               >
//                 <img
//                   src="https://researchworld.com/uploads/attachments/cl5gw4sah25fd86tdzezrzu0f-gettyimages-1334086618.max.jpg"
//                   alt="Jaimax Global Reach"
//                   className="rounded-2xl w-full h-48 md:h-64 object-cover"
//                   loading="lazy"
//                 />
//                 <div className="absolute inset-0 bg-black/20 rounded-2xl"></div>
//               </motion.div>

//               <motion.div whileHover={{ scale: 1.05 }} className="rounded-2xl overflow-hidden">
//                 <img
//                   src="https://images.stockcake.com/public/a/8/5/a852b6e8-6b91-4957-b31a-c7082a74b56e_large/business-discussion-meeting-stockcake.jpg"
//                   alt="Business meeting"
//                   className="rounded-2xl w-full h-32 md:h-48 object-cover"
//                   loading="lazy"
//                 />
//               </motion.div>

//               <motion.div whileHover={{ scale: 1.05 }} className="rounded-2xl overflow-hidden">
//                 <img
//                   src="https://bsmedia.business-standard.com/_media/bs/img/article/2022-03/30/full/1648657657-322.jpg?im=FeatureCrop,size=(826,465)"
//                   alt="Woman working"
//                   className="rounded-2xl w-full h-32 md:h-48 object-cover"
//                   loading="lazy"
//                 />
//               </motion.div>
//             </div>

//             {/* Content */}
//             <div className="order-1 lg:order-2">
//               <p className="text-teal-400 text-sm font-semibold mb-4 uppercase tracking-wider mt-8 lg:mt-0 text-center lg:text-left">WHY NOW?</p>
//               <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6 text-center lg:text-left">
//                 Why Now?
//               </h2>
//               <p className="text-white mb-8 leading-relaxed text-center lg:text-left">
//                 The world of cryptocurrency in India is evolving at lightning speed. From growing adoption among the youth to increasing interest from businesses and institutions, digital assets are no longer just a trend — they are the future of finance. And within this revolution, Jaimax is leading the way.
//               </p>
//               <p className="text-white mb-8 leading-relaxed text-center lg:text-left">
//                 Now is the perfect time to be part of something truly transformative. Jaimax is currently trading at an incredibly low entry price, offering a golden opportunity for early believers and smart investors.
//               </p>
//               <motion.button
//                 onClick={navigateToLogin}
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-full font-semibold transition-colors block mx-auto lg:inline-block"
//               >
//                 Start now
//               </motion.button>
//             </div>
//           </div>
//         </AnimatedSection>

//         {/* For Beginners Section */}
//         <AnimatedSection className="mb-20">
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
//             {/* Chart Visualization (order changed for better mobile layout) */}
//             <motion.div
//               whileHover={{ scale: 1.02 }}
//               className="relative bg-gradient-to-br from-teal-400 to-green-400 rounded-3xl p-8 sm:p-12 flex items-center justify-center order-2 lg:order-1 min-h-[300px]"
//             >
//               <div className="relative">
//                 {/* Candlestick Chart */}
//                 <svg width="300" height="200" viewBox="0 0 300 200" className="w-full h-auto max-w-[300px] mx-auto">
//                   {/* Candlestick 1 - Green */}
//                   <line x1="60" y1="40" x2="60" y2="160" stroke="#22c55e" strokeWidth="2" />
//                   <rect x="50" y="60" width="20" height="80" fill="#22c55e" rx="4" />

//                   {/* Candlestick 2 - Red */}
//                   <line x1="150" y1="20" x2="150" y2="140" stroke="#ef4444" strokeWidth="2" />
//                   <rect x="140" y="50" width="20" height="60" fill="#ef4444" rx="4" />

//                   {/* Candlestick 3 - Green */}
//                   <line x1="240" y1="30" x2="240" y2="120" stroke="#84cc16" strokeWidth="2" />
//                   <rect x="230" y="40" width="20" height="70" fill="#84cc16" rx="4" />
//                 </svg>

//                 {/* Play Button */}
//                 <motion.button
//                   onClick={openVideo}
//                   whileHover={{ scale: 1.1 }}
//                   className="absolute top-1/3 left-1/2  w-16 h-16 rounded-full flex items-center justify-center cursor-pointer bg-black/50 hover:bg-black/80 transition-colors"
//                 >
//                   <PlayIcon className="w-8 h-8 text-white ml-1" />
//                 </motion.button>
//               </div>
//             </motion.div>

//             {/* Content */}
//             <div className="order-1 lg:order-2">
//               <p className="text-teal-400 text-sm font-semibold mb-4 uppercase tracking-wider text-center lg:text-left">FOR BEGINNERS</p>
//               <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6 text-center lg:text-left">
//                 Watch our crypto guide for beginners
//               </h2>
//               <p className="text-white mb-8 leading-relaxed text-center lg:text-left">
//                 Whether you're new to crypto or looking to diversify your portfolio, Jaimax provides a powerful foundation to grow with a trustworthy and forward-looking project. We offer comprehensive guides and educational resources to help you understand the cryptocurrency market.
//               </p>
//               <motion.button
//                 onClick={() => navigate("/blog")}
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 className="border-2 border-white text-white hover:bg-white hover:text-gray-900 px-8 py-3 rounded-full font-semibold transition-all block mx-auto lg:inline-block"
//               >
//                 Learn more
//               </motion.button>
//             </div>
//           </div>
//         </AnimatedSection>

//         {/* Features Section */}
//         <AnimatedSection className="mb-16">
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
//             <div className="order-2 lg:order-1 flex items-center justify-center">
//               <img
//                 src="https://www.techfunnel.com/wp-content/uploads/2024/10/Blockchain-in-Corporate-Finance.jpg"
//                 alt="Blockchain Technology"
//                 className="rounded-xl shadow-lg w-full max-w-lg object-cover h-64 sm:h-80 lg:h-[400px]"
//                 loading="lazy"
//               />
//             </div>

//             <div className="space-y-6 order-1 lg:order-2">
//               <h2 className="text-3xl font-bold text-teal-400 mb-6 text-center lg:text-left">
//                 Why Choose Jaimax?
//               </h2>

//               <motion.div
//                 variants={featuresContainerVariants}
//                 initial="hidden"
//                 whileInView="visible"
//                 viewport={{ once: true, amount: 0.3 }}
//                 className="space-y-4"
//               >
//                 {features.map((item, idx) => (
//                   <motion.div
//                     key={idx}
//                     variants={featureItemVariants}
//                     whileHover={{ x: 5 }}
//                     className="flex items-start gap-4 p-4 rounded-lg border border-teal-500/20 hover:border-teal-500/40 transition-colors"
//                   >
//                     <div className="text-teal-400 mt-1 flex-shrink-0">
//                       {item.icon}
//                     </div>
//                     <span className="text-white text-left">{item.text}</span>
//                   </motion.div>
//                 ))}
//               </motion.div>
//             </div>
//           </div>
//         </AnimatedSection>

//         {/* CTA Section */}
//         <AnimatedSection>
//           <motion.div
//             whileHover={{ scale: 1.01 }}
//             className="bg-gradient-to-r from-teal-600 to-green-600 rounded-xl mb-4 py-12 px-4 sm:px-8 text-center"
//           >
//             <h5 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 text-white">
//               We're Not Just Building a Coin — We're Building a Future
//             </h5>

//             <p className="max-w-3xl mx-auto mb-6 text-white text-sm sm:text-base">
//               Jaimax is designed to be more than an investment — it's your gateway into the decentralized world. With every coin you hold, you become part of a mission to empower individuals, create global financial inclusivity, and make blockchain accessible for all.
//             </p>

//             <motion.button
//               onClick={navigateToLogin}
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               className="bg-white text-teal-700 px-8 py-3 font-semibold rounded-full hover:bg-gray-100 transition-colors text-sm sm:text-base"
//             >
//               Join Jaimax. Join the Future.
//             </motion.button>
//           </motion.div>
//         </AnimatedSection>
//       </div>

//       {/* Video Modal */}
//       <VideoModal isOpen={isVideoOpen} onClose={closeVideo} />
//     </div>
//   );
// };

// export default JaimaxOverview;


import React, { useEffect, useState } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Seo from '../../SeoContent/Seo'
// import about from '../../assets/Images/future.png'
const about='https://m.foolcdn.com/media/dubs/images/Businessman_using_tablet_online_banking_exchan.width-600.jpg'
// SVG Icons as React Components (These remain the same as they are functional)
const CoinsIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2" />
    <text x="12" y="16" textAnchor="middle" fontSize="10" fill="currentColor">$</text>
  </svg>
);

const TrendingUpIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
  </svg>
);

const ShieldIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2L4 5V11C4 16.55 7.84 21.74 12 23C16.16 21.74 20 16.55 20 11V5L12 2Z" />
    <path d="M9 12L11 14L15 10" fill="none" stroke="white" strokeWidth="2" />
  </svg>
);

const GlobeIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="10" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);

const TransparencyIcon = ({ className = "w-8 h-8" }) => (
  <svg className={className} viewBox="0 0 48 48" fill="none">
    <circle cx="24" cy="24" r="20" fill="#a3e635" />
    <circle cx="24" cy="24" r="16" fill="#a3e635" />
    <circle cx="24" cy="24" r="12" fill="#a3e635" />
    <circle cx="24" cy="24" r="8" fill="#a3e635" />
    <circle cx="24" cy="24" r="4" fill="#a3e635" />
    <path d="M16 24h16M24 16v16" stroke="white" strokeWidth="2" />
  </svg>
);

const TeamIcon = ({ className = "w-8 h-8" }) => (
  <svg
    className={className}
    height="200px"
    width="200px"
    viewBox="0 0 512 512"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
  >
    <g>
      <path
        className="fill-lime-400"
        d="M435.95,287.525c32.51,0,58.87-26.343,58.87-58.853c0-32.51-26.361-58.871-58.87-58.871
        c-32.502,0-58.863,26.361-58.863,58.871C377.088,261.182,403.448,287.525,435.95,287.525z"
      />
      <path
        className="fill-lime-400"
        d="M511.327,344.251c-2.623-15.762-15.652-37.822-25.514-47.677c-1.299-1.306-7.105-1.608-8.673-0.636
        c-11.99,7.374-26.074,11.714-41.19,11.714c-15.099,0-29.184-4.34-41.175-11.714c-1.575-0.972-7.373-0.67-8.672,0.636
        c-2.757,2.757-5.765,6.427-8.698,10.683c7.935,14.94,14.228,30.81,16.499,44.476c2.27,13.7,1.533,26.67-2.138,38.494
        c13.038,4.717,28.673,6.787,44.183,6.787C476.404,397.014,517.804,382.987,511.327,344.251z"
      />
      <path
        className="fill-lime-400"
        d="M254.487,262.691c52.687,0,95.403-42.716,95.403-95.402c0-52.67-42.716-95.386-95.403-95.386
        c-52.678,0-95.378,42.716-95.378,95.386C159.109,219.975,201.808,262.691,254.487,262.691z"
      />
      <path
        className="fill-lime-400"
        d="M335.269,277.303c-2.07-2.061-11.471-2.588-14.027-1.006c-19.448,11.966-42.271,18.971-66.755,18.971
        c-24.466,0-47.3-7.005-66.738-18.971c-2.555-1.583-11.956-1.055-14.026,1.006c-16.021,16.004-37.136,51.782-41.384,77.288
        c-10.474,62.826,56.634,85.508,122.148,85.508c65.532,0,132.639-22.682,122.165-85.508
        C372.404,329.085,351.289,293.307,335.269,277.303z"
      />
      <path
        className="fill-lime-400"
        d="M76.049,287.525c32.502,0,58.862-26.343,58.862-58.853c0-32.51-26.36-58.871-58.862-58.871
        c-32.511,0-58.871,26.361-58.871,58.871C17.178,261.182,43.538,287.525,76.049,287.525z"
      />
      <path
        className="fill-lime-400"
        d="M115.094,351.733c2.414-14.353,9.225-31.253,17.764-46.88c-2.38-3.251-4.759-6.083-6.955-8.279
        c-1.299-1.306-7.097-1.608-8.672-0.636c-11.991,7.374-26.076,11.714-41.182,11.714c-15.108,0-29.202-4.34-41.183-11.714
        c-1.568-0.972-7.382-0.67-8.681,0.636c-9.887,9.854-22.882,31.915-25.514,47.677c-6.468,38.736,34.924,52.762,75.378,52.762
        c14.437,0,29.016-1.777,41.459-5.84C113.587,379.108,112.757,365.835,115.094,351.733z"
      />
    </g>
  </svg>
);

const SecurityIcon = ({ className = "w-8 h-8" }) => (
  <svg
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    fill="#a3e635"
  >
    <path d="M19.42,3.83,12.24,2h0A.67.67,0,0,0,12,2a.67.67,0,0,0-.2,0h0L4.58,3.83A2,2,0,0,0,3.07,5.92l.42,5.51a12,12,0,0,0,7.24,10.11l.88.38h0a.91.91,0,0,0,.7,0h0l.88-.38a12,12,0,0,0,7.24-10.11l.42-5.51A2,2,0,0,0,19.42,3.83ZM15.71,9.71l-4,4a1,1,0,0,1-1.42,0l-2-2a1,1,0,0,1,1.42-1.42L11,11.59l3.29-3.3a1,1,0,0,1,1.42,1.42Z" />
  </svg>
);

const PlayIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M8 5v14l11-7z" />
  </svg>
);

const CloseIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const features = [
  {
    icon: <ShieldIcon className="w-6 h-6" />,
    text: "Secure & Transparent: Built on advanced blockchain infrastructure ensuring full data integrity and security."
  },
  {
    icon: <TrendingUpIcon className="w-6 h-6" />,
    text: "User-Focused Platform: Easy to use, fast, and reliable for everyday crypto transactions."
  },
  {
    icon: <GlobeIcon className="w-6 h-6" />,
    text: "Growing Ecosystem: Jaimax continues to expand its utility use cases in trading, payments, and smart applications."
  },
  {
    icon: <CoinsIcon className="w-6 h-6" />,
    text: "Global Vision: Aiming to become one of the top cryptocurrencies in India with an international footprint."
  }
];

const missionCards = [
  {
    icon: <TransparencyIcon className="w-16 h-16" />,
    title: "Transparency",
    description: "Built on advanced blockchain infrastructure ensuring full data integrity and security for all transactions."
  },
  {
    icon: <TeamIcon className="w-16 h-16" />,
    title: "Experienced Team",
    description: "Our strength lies in our users — a united Jaimax community that believes in long-term value and shared growth."
  },
  {
    icon: <SecurityIcon className="w-16 h-16" />,
    title: "Security Guarantee",
    description: "We create a complete financial ecosystem that connects opportunity, security, and scalability."
  }
];

// Subtle floating particles
const FloatingParticles = () => {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const generateParticles = () => {
      const newParticles = [];
      for (let i = 0; i < 12; i++) {
        newParticles.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 2 + 1,
          delay: Math.random() * 3,
        });
      }
      setParticles(newParticles);
    };
    generateParticles();
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute w-1 h-1 bg-teal-400 rounded-full opacity-10"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            delay: particle.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

const AnimatedSection = ({ children, className = "" }) => {
  const controls = useAnimation();
  const ref = React.useRef(null);
  const inView = useInView(ref, { once: true, threshold: 0.1 });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  return (
    <motion.div
      ref={ref}
      animate={controls}
      initial="hidden"
      variants={{
        visible: { opacity: 1, y: 0 },
        hidden: { opacity: 0, y: 20 }
      }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Video Modal Component
const VideoModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        className="relative max-w-4xl w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute -top-10 right-0 text-white hover:text-gray-300 transition-colors"
        >
          <CloseIcon className="w-8 h-8" />
        </button>
        <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
          <iframe
            className="absolute top-0 left-0 w-full h-full rounded-lg"
            src="https://www.youtube.com/embed/SsoOifQVL5s?si=9OL3dWLSPFtKm4ND"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </div>
      </motion.div>
    </motion.div>
  );
};

const JaimaxOverview = () => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const navigate = useNavigate();

  const openVideo = () => setIsVideoOpen(true);
  const closeVideo = () => setIsVideoOpen(false);

  const navigateToLogin = () => {
    navigate('/login');
  };

  // Variants for the "Why Choose Jaimax?" features list
  const featuresContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const featureItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  };

  // Variants for the "Our Mission" cards
  const missionContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15, // Slightly different stagger for these cards
        delayChildren: 0.2,
      },
    },
  };

  const missionCardItemVariants = {
    hidden: { opacity: 0, y: 30 }, // Cards animate from bottom up
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="relative min-h-screen text-white overflow-hidden bg-[#085056]">
      <Seo page="about" />
      <FloatingParticles />

      {/* This outer div now only handles the background and particle effect */}
      {/* Hero Section - Text on Image */}
      <AnimatedSection className="mb-20">
        <motion.div
          whileHover={{ scale: 1.01 }}
          transition={{ duration: 0.3 }}
          className="relative rounded-xl shadow-xl overflow-hidden h-[400px] w-full flex items-center justify-center"
        >
          <img
            src={about}
            alt="Jaimax Hero Banner"
            className="absolute inset-0 w-full h-full object-cover" // This is where we control the image's size
          />

          <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-center p-4">
            <motion.h1
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight bg-gradient-to-r from-teal-400 via-green-400 to-emerald-500 bg-clip-text text-transparent mb-4 drop-shadow-lg"
            >
              About Jaimax
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-base sm:text-xl md:text-2xl text-gray-100 mb-8 max-w-3xl mx-auto [text-shadow:_0_2px_4px_rgb(0_0_0_/_70%)] px-2"
            >
              Building the Future of Digital Finance
            </motion.p>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "250px" }}
              transition={{ duration: 1.2, delay: 0.8, ease: "easeOut" }}
              className="h-1 bg-gradient-to-r from-teal-400 via-green-400 to-transparent mx-auto mb-5"
            />
          </div>
        </motion.div>
      </AnimatedSection>

      {/* This div now contains the rest of your content and maintains the max-width */}
      <div className="max-w-8xl mx-auto relative z-10 px-4 sm:px-8 lg:px-20 py-0">
        <AnimatedSection className="mb-20">
          <p className="text-teal-400 text-xl font-semibold mb-4 uppercase tracking-wider text-center lg:text-left">OUR MISSION</p>
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-12 gap-8">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white max-w-2xl text-center lg:text-left">
              Empowering financial freedom through blockchain
            </h2>
            <div className="text-white max-w-lg leading-relaxed text-center lg:text-left">
              <p className="mb-4">
                Jaimax is an innovative <a href="http://www.jaimax.com" className="text-teal-300">cryptocurrency in India</a> designed to transform the way people invest, transact, and grow in the blockchain era. As a secure and utility-driven crypto coin, Jaimax brings together technology, transparency, and trust to create a strong foundation for the future of decentralized finance (DeFi).
              </p>
              <p>
                We believe that digital currency should not just be a trend — it should be a tool for empowerment. That's why Jaimax is built to make crypto investing simple, safe, and rewarding for everyone, from new investors to blockchain experts.
              </p>
            </div>
          </div>

          {/* Apply variants to the parent div for staggering mission cards */}
          <motion.div
            variants={missionContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }} // Animate when 20% of the container is in view
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {missionCards.map((card, idx) => (
              <motion.div
                key={idx}
                variants={missionCardItemVariants} // Apply item variants here
                whileHover={{ y: -5 }}
                className="bg-gray-800/50 rounded-2xl p-8 text-center backdrop-blur-sm border border-gray-700/50 flex flex-col justify-between items-center h-full"
              >
                <div className="mb-6 flex justify-center">
                  {card.icon}
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-4">{card.title}</h3>
                  <p className="text-white text-sm leading-relaxed">{card.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatedSection>

        {/* Vision Section */}
        <AnimatedSection className="mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Images Grid */}
            <div className="grid grid-cols-2 gap-4 order-2 lg:order-1">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="col-span-2 relative rounded-2xl overflow-hidden"
              >
                <img
                  src="https://researchworld.com/uploads/attachments/cl5gw4sah25fd86tdzezrzu0f-gettyimages-1334086618.max.jpg"
                  alt="Jaimax Global Reach"
                  className="rounded-2xl w-full h-48 md:h-64 object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/20 rounded-2xl"></div>
              </motion.div>

              <motion.div whileHover={{ scale: 1.05 }} className="rounded-2xl overflow-hidden">
                <img
                  src="https://images.stockcake.com/public/a/8/5/a852b6e8-6b91-4957-b31a-c7082a74b56e_large/business-discussion-meeting-stockcake.jpg"
                  alt="Business meeting"
                  className="rounded-2xl w-full h-32 md:h-48 object-cover"
                  loading="lazy"
                />
              </motion.div>

              <motion.div whileHover={{ scale: 1.05 }} className="rounded-2xl overflow-hidden">
                <img
                  src="https://bsmedia.business-standard.com/_media/bs/img/article/2022-03/30/full/1648657657-322.jpg?im=FeatureCrop,size=(826,465)"
                  alt="Woman working"
                  className="rounded-2xl w-full h-32 md:h-48 object-cover"
                  loading="lazy"
                />
              </motion.div>
            </div>

            {/* Content */}
            <div className="order-1 lg:order-2">
              <p className="text-teal-400 text-xl font-semibold mb-4 uppercase tracking-wider mt-8 lg:mt-0 text-center lg:text-left">OUR VISION</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6 text-center lg:text-left">
                A Global Crypto Brand from India
              </h2>
              <p className="text-white mb-6 leading-relaxed text-center lg:text-left">
                To position Jaimax Coin as a leading global crypto brand originating from India. We envision a world where <a href="http://www.jaimax.com" className="text-teal-300">blockchain technology</a> enables financial equality, where every transaction is secure, and where every investor can be part of a borderless digital economy.
              </p>
              <p className="text-white mb-8 leading-relaxed text-center lg:text-left">
                Our goal is to make Jaimax the most trusted cryptocurrency brand in India and across international markets.
              </p>
              <motion.button
                onClick={navigateToLogin}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-full font-semibold transition-colors block mx-auto lg:inline-block"
              >
                Join Our Vision
              </motion.button>
            </div>
          </div>
        </AnimatedSection>

        {/* For Beginners Section */}
        <AnimatedSection className="mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Chart Visualization (order changed for better mobile layout) */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="relative bg-gradient-to-br from-teal-400 to-green-400 rounded-3xl p-8 sm:p-12 flex items-center justify-center order-2 lg:order-1 min-h-[300px]"
            >
              <div className="relative">
                {/* Candlestick Chart */}
                <svg width="300" height="200" viewBox="0 0 300 200" className="w-full h-auto max-w-[300px] mx-auto">
                  {/* Candlestick 1 - Green */}
                  <line x1="60" y1="40" x2="60" y2="160" stroke="#22c55e" strokeWidth="2" />
                  <rect x="50" y="60" width="20" height="80" fill="#22c55e" rx="4" />

                  {/* Candlestick 2 - Red */}
                  <line x1="150" y1="20" x2="150" y2="140" stroke="#ef4444" strokeWidth="2" />
                  <rect x="140" y="50" width="20" height="60" fill="#ef4444" rx="4" />

                  {/* Candlestick 3 - Green */}
                  <line x1="240" y1="30" x2="240" y2="120" stroke="#84cc16" strokeWidth="2" />
                  <rect x="230" y="40" width="20" height="70" fill="#84cc16" rx="4" />
                </svg>

                {/* Play Button */}
                <motion.button
                  onClick={openVideo}
                  whileHover={{ scale: 1.1 }}
                  className="absolute top-1/3 left-1/2  w-16 h-16 rounded-full flex items-center justify-center cursor-pointer bg-black/50 hover:bg-black/80 transition-colors"
                >
                  <PlayIcon className="w-8 h-8 text-white ml-1" />
                </motion.button>
              </div>
            </motion.div>

            {/* Content */}
            <div className="order-1 lg:order-2">
              <p className="text-teal-400 text-xl font-semibold mb-4 uppercase tracking-wider text-center lg:text-left">FOR BEGINNERS</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6 text-center lg:text-left">
                Understanding Cryptocurrency
              </h2>
              <p className="text-white mb-8 leading-relaxed text-center lg:text-left">
                Whether you're new to crypto or looking to diversify your portfolio, Jaimax provides a powerful foundation to grow with a trustworthy and forward-looking project. We offer comprehensive guides and educational resources to help you understand the cryptocurrency market and make informed decisions.
              </p>
              <motion.button
                onClick={() => navigate("/blog")}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-white text-white hover:bg-white hover:text-gray-900 px-8 py-3 rounded-full font-semibold transition-all block mx-auto lg:inline-block"
              >
                Learn more
              </motion.button>
            </div>
          </div>
        </AnimatedSection>

        {/* Features Section */}
        <AnimatedSection className="mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1 flex items-center justify-center">
              <img
                src="https://www.techfunnel.com/wp-content/uploads/2024/10/Blockchain-in-Corporate-Finance.jpg"
                alt="Blockchain Technology"
                className="rounded-xl shadow-lg w-full max-w-lg object-cover h-64 sm:h-80 lg:h-[400px]"
                loading="lazy"
              />
            </div>

            <div className="space-y-6 order-1 lg:order-2">
              <h2 className="text-3xl font-bold text-teal-400 mb-6 text-center lg:text-left">
                Why Choose Jaimax?
              </h2>

              <motion.div
                variants={featuresContainerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                className="space-y-4"
              >
                {features.map((item, idx) => (
                  <motion.div
                    key={idx}
                    variants={featureItemVariants}
                    whileHover={{ x: 5 }}
                    className="flex items-start gap-4 p-4 rounded-lg border border-teal-500/20 hover:border-teal-500/40 transition-colors"
                  >
                    <div className="text-teal-400 mt-1 flex-shrink-0">
                      {item.icon}
                    </div>
                    <span className="text-white text-left">{item.text}</span>
                  </motion.div>
                ))}

                <motion.div
                  variants={featureItemVariants}
                  whileHover={{ x: 5 }}
                  className="flex items-start gap-4 p-4 rounded-lg border border-teal-500/20 hover:border-teal-500/40 transition-colors"
                >
                  <div className="text-teal-400 mt-1 flex-shrink-0">
                    <TeamIcon className="w-6 h-6" />
                  </div>
                  <span className="text-white text-left">Community Powered: Our strength lies in our users — a united Jaimax community that believes in long-term value and shared growth.</span>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </AnimatedSection>

        {/* CTA Section */}
        <AnimatedSection>
          <motion.div
            whileHover={{ scale: 1.01 }}
            className="bg-gradient-to-r from-teal-600 to-green-600 rounded-xl mb-4 py-12 px-4 sm:px-8 text-center"
          >
            <h5 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 text-white">
              Our Commitment to Digital Finance
            </h5>

            <p className="max-w-3xl mx-auto mb-6 text-white text-sm sm:text-base">
              At Jaimax, we are dedicated to building trust in digital currency through innovation and integrity. We are creating not just a token, but a complete financial ecosystem that connects opportunity, security, and scalability.
            </p>

            <motion.button
              onClick={navigateToLogin}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-teal-700 px-8 py-3 font-semibold rounded-full hover:bg-gray-100 transition-colors text-sm sm:text-base"
            >
              Jaimax — Your Gateway to the Future of Digital Finance
            </motion.button>
          </motion.div>
        </AnimatedSection>
      </div>

      {/* Video Modal */}
      <VideoModal isOpen={isVideoOpen} onClose={closeVideo} />
    </div>
  );
};

export default JaimaxOverview;