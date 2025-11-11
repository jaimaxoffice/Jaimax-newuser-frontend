
// import React, { useEffect, useState } from 'react';
// import { motion, useScroll, useTransform } from 'framer-motion';
// import { useGetRoundQuery } from "../../components/Dashboard/pages/dashBoard/DashboardApliSlice";
// const JaimaxContent = () => {
//   const [scrollPosition, setScrollPosition] = useState(0);
//   const { scrollYProgress } = useScroll();
//   const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
//     const { data: roundData, error, isLoading, refetch } = useGetRoundQuery();
//       const liveRounds = roundData?.data?.rounds?.filter(round => round.status === 1) || [];
//   const currentRound = liveRounds[0];
//     const formatNumber = (num) => {
//     if (num >= 1000000) {
//       return (num / 1000000).toFixed(1) + 'M';
//     }
//     if (num >= 1000) {
//       return (num / 1000).toFixed(1) + 'K';
//     }
//     return num.toLocaleString();
//   };
//     // Default stats data for when API data is loading or unavailable
//   const livePrice = currentRound?.atPriceInr || "0.0000";
//   const soldTokens = formatNumber(currentRound?.soldQty || 225765326);
//   const liveMembers = formatNumber(currentRound?.totalMembers || 24567);

//   useEffect(() => {
//     const handleScroll = () => setScrollPosition(window.scrollY);
//     const handleMouse = (e) => setMousePosition({ x: e.clientX, y: e.clientY });
    
//     window.addEventListener('scroll', handleScroll);
//     window.addEventListener('mousemove', handleMouse);
//     return () => {
//       window.removeEventListener('scroll', handleScroll);
//       window.removeEventListener('mousemove', handleMouse);
//     };
//   }, []);
  
//   const getActiveSection = () => {
//     const height = window.innerHeight;
//     if (scrollPosition < height * 0.3) return 0;
//     if (scrollPosition < height * 0.6) return 1;
//     if (scrollPosition < height) return 2;
//     if (scrollPosition < height * 1.4) return 3;
//     if (scrollPosition < height * 1.8) return 4;
//     return 5;
//   };
  
//   const activeSection = getActiveSection();

//   // Parallax
//   const y1 = useTransform(scrollYProgress, [0, 1], [0, -200]);
//   const y2 = useTransform(scrollYProgress, [0, 1], [0, 200]);

//   // Creative Number Badge Component
//   const CreativeNumber = ({ number, color }) => (
//     <motion.div
//       className="relative w-20 h-20"
//       whileHover={{ scale: 1.3, rotate: 360 }}
//       transition={{ type: "spring", stiffness: 200, damping: 15 }}
//     >
//       {/* Outer rotating ring */}
//       <motion.div
//         className="absolute inset-0 rounded-full border-2"
//         style={{ borderColor: color }}
//         animate={{ rotate: 360 }}
//         transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
//       >
//         <motion.div
//           className="absolute w-2 h-2 rounded-full -top-1 left-1/2 -ml-1"
//           style={{ backgroundColor: color }}
//           animate={{
//             boxShadow: [
//               `0 0 10px ${color}`,
//               `0 0 20px ${color}`,
//               `0 0 10px ${color}`,
//             ]
//           }}
//           transition={{ duration: 1.5, repeat: Infinity }}
//         />
//       </motion.div>
      
//       {/* Middle ring */}
//       <motion.div
//         className="absolute inset-2 rounded-full opacity-30"
//         style={{ backgroundColor: color }}
//         animate={{ scale: [1, 1.1, 1] }}
//         transition={{ duration: 2, repeat: Infinity }}
//       />
      
//       {/* Center with number */}
//       <motion.div
//         className="absolute inset-4 rounded-full flex items-center justify-center font-black text-2xl text-white"
//         style={{ 
//           background: `linear-gradient(135deg, ${color}, #085056)`,
//         }}
//         animate={{
//           boxShadow: [
//             `0 0 20px ${color}60`,
//             `0 0 35px ${color}90`,
//             `0 0 20px ${color}60`,
//           ]
//         }}
//         transition={{ duration: 2, repeat: Infinity }}
//       >
//         {number}
//       </motion.div>
      
//       {/* Particles */}
//       {[...Array(3)].map((_, i) => (
//         <motion.div
//           key={i}
//           className="absolute w-1 h-1 rounded-full"
//           style={{ backgroundColor: color, left: '50%', top: '50%' }}
//           animate={{
//             x: [0, Math.cos(i * 120 * Math.PI / 180) * 40, 0],
//             y: [0, Math.sin(i * 120 * Math.PI / 180) * 40, 0],
//             opacity: [0, 1, 0],
//             scale: [0, 1, 0],
//           }}
//           transition={{
//             duration: 2,
//             repeat: Infinity,
//             delay: i * 0.3,
//           }}
//         />
//       ))}
//     </motion.div>
//   );

//   // Hexagon Number Component
//   const HexagonNumber = ({ number, color }) => (
//     <motion.div
//       className="relative w-24 h-28 flex items-center justify-center"
//       whileHover={{ scale: 1.15 }}
//     >
//       <motion.div
//         className="absolute inset-0"
//         style={{
//           clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
//           background: `linear-gradient(135deg, ${color}, #085056)`,
//         }}
//         animate={{
//           boxShadow: [
//             `0 0 20px ${color}40`,
//             `0 0 40px ${color}80`,
//             `0 0 20px ${color}40`,
//           ]
//         }}
//         transition={{ duration: 2, repeat: Infinity }}
//       />
      
//       <motion.div
//         className="absolute inset-2"
//         style={{
//           clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
//           backgroundColor: '#085056',
//         }}
//       />
      
//       <motion.span
//         className="relative z-10 text-4xl font-black"
//         style={{ color }}
//         animate={{
//           textShadow: [
//             `0 0 10px ${color}60`,
//             `0 0 20px ${color}90`,
//             `0 0 10px ${color}60`,
//           ],
//           scale: [1, 1.1, 1],
//         }}
//         transition={{ duration: 2, repeat: Infinity }}
//       >
//         {number}
//       </motion.span>
      
//       <motion.div
//         className="absolute inset-0 opacity-50"
//         style={{
//           clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
//           border: `2px solid ${color}`,
//         }}
//         animate={{ rotate: 360 }}
//         transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
//       />
//     </motion.div>
//   );

//   // 3D Card Number
//   const CardNumber = ({ number, color }) => (
//     <motion.div
//       className="relative perspective-1000"
//       whileHover={{ rotateY: 180 }}
//       style={{ transformStyle: 'preserve-3d' }}
//     >
//       <motion.div
//         className="w-20 h-20 rounded-2xl flex items-center justify-center relative"
//         style={{
//           background: `linear-gradient(135deg, ${color}, #085056)`,
//           transformStyle: 'preserve-3d',
//         }}
//         animate={{
//           boxShadow: [
//             `0 10px 30px ${color}40`,
//             `0 20px 50px ${color}70`,
//             `0 10px 30px ${color}40`,
//           ]
//         }}
//         transition={{ duration: 2, repeat: Infinity }}
//       >
//         <motion.div
//           className="absolute inset-0 flex items-center justify-center text-4xl font-black text-white rounded-2xl"
//           style={{ backfaceVisibility: 'hidden' }}
//         >
//           {number}
//         </motion.div>
        
//         <motion.div
//           className="absolute inset-0 flex items-center justify-center text-4xl font-black rounded-2xl"
//           style={{ 
//             backfaceVisibility: 'hidden',
//             transform: 'rotateY(180deg)',
//             background: `linear-gradient(135deg, #085056, ${color})`,
//           }}
//         >
//           <span style={{ color }}>✓</span>
//         </motion.div>
        
//         <motion.div
//           className="absolute -inset-1 rounded-2xl blur-md opacity-50"
//           style={{ backgroundColor: color }}
//           animate={{ opacity: [0.3, 0.6, 0.3] }}
//           transition={{ duration: 2, repeat: Infinity }}
//         />
//       </motion.div>
//     </motion.div>
//   );

//   return (
//     <div className="min-h-screen bg-[#085056] text-white relative overflow-hidden">
//       {/* Subtle Gradient Orbs */}

//       <motion.div 
//         className="fixed w-80 h-80  opacity-8 rounded-full blur-3xl pointer-events-none"
//         style={{ y: y1 }}
//         animate={{
//           x: [100, 300, 100],
//           rotate: [0, 360],
//         }}
//         transition={{
//           x: { duration: 8, repeat: Infinity, ease: "easeInOut" },
//           rotate: { duration: 20, repeat: Infinity, ease: "linear" }
//         }}
//       />



//       <div className="max-w-7xl mx-auto px-6 py-10 relative z-10">
//         {/* Professional Header */}
//         <motion.div 
//           className="text-center mb-16"
//           initial={{ opacity: 0, y: -50 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8 }}
//         >
          
          
//           <motion.h2 
//             className="text-4xl md:text-6xl font-black mb-4 leading-tight tracking-tight"
//             initial={{ opacity: 0, scale: 0.9 }}
//             animate={{ opacity: 1, scale: 1 }}
//             transition={{ delay: 0.2, duration: 0.8 }}
//           >
//             India's Trusted{' '}
//             <motion.span 
//               className="relative inline-block text-[#b8cc26]"
//               animate={{
//                 textShadow: [
//                   "0 0 20px rgba(184, 204, 38, 0.5)",
//                   "0 0 40px rgba(184, 204, 38, 0.9)",
//                   "0 0 20px rgba(184, 204, 38, 0.5)",
//                 ]
//               }}
//               transition={{ duration: 2, repeat: Infinity }}
//             >
//               Pre-Sale
//               <motion.div
//                 className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#b8cc26] to-transparent"
//                 animate={{ scaleX: [0.5, 1, 0.5] }}
//                 transition={{ duration: 2, repeat: Infinity }}
//               />
//             </motion.span>
//             <br />
//             Crypto Coin – <span className="text-[#2bcc39]">Jaimax</span>
//           </motion.h2>
//         </motion.div>
        
//         {/* Clean Navigation */}
//         <motion.div 
//           className="sticky top-4 z-30 mb-16"
//           initial={{ y: -100, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           transition={{ duration: 0.6 }}
//         >
//           <div className="bg-[#085056]/95 backdrop-blur-xl rounded-full p-1.5 border border-[#177338]/50 shadow-2xl">
//             <div className="grid grid-cols-6 gap-1">
//               {['Intro', 'About', 'Pre-Sale', 'Security', 'Ecosystem', 'Future'].map((name, index) => (
//                 <motion.button
//                   key={index}
//                   className={`px-4 py-2.5 rounded-full font-semibold text-xs transition-all ${
//                     activeSection === index ? 'bg-gradient-to-r from-[#177338] to-[#2bcc39] text-white' : 'text-gray-400'
//                   }`}
//                   onClick={() => window.scrollTo({ top: index * window.innerHeight * 0.4, behavior: 'smooth' })}
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                 >
//                   {name}
//                 </motion.button>
//               ))}
//             </div>
//           </div>
//         </motion.div>
        
//         {/* Section 0: Intro - FULL CONTENT */}
//         <motion.div 
//           className="mb-16"
//           initial={{ opacity: 0, x: -100 }}
//           whileInView={{ opacity: 1, x: 0 }}
//           viewport={{ once: false, amount: 0.3 }}
//           transition={{ duration: 0.6 }}
//         >
//           <motion.div 
//             className={`bg-[#085056]/60 backdrop-blur-sm rounded-3xl p-8 border transition-all ${
//               activeSection === 0 ? 'border-[#2bcc39] shadow-2xl shadow-[#2bcc39]/20' : 'border-[#177338]/30'
//             }`}
//             whileHover={{ scale: 1.01 }}
//           >
//             <div className="flex items-start gap-6">
//               <motion.div 
//                 className="w-1 h-16 bg-gradient-to-b from-[#b8cc26] to-[#2bcc39] rounded-full flex-shrink-0"
//                 animate={{ scaleY: [1, 1.3, 1] }}
//                 transition={{ duration: 2, repeat: Infinity }}
//               />
//               <div className="flex-1">
//                 <p className="text-gray-200 leading-relaxed text-base mb-4">
//                   In the evolving world of digital finance, <span className="text-[#b8cc26] font-bold">Jaimax Coin</span> has emerged as India's best pre-sale crypto coin, built for investors who value innovation, transparency, and long-term stability. As India embraces blockchain technology and decentralized finance, Jaimax is shaping the future of how people invest and grow wealth through digital currencies.
//                 </p>
//                 <p className="text-gray-200 leading-relaxed text-base">
//                   More than just a crypto coin, Jaimax represents a new era of secure, accessible, and rewarding investments for everyone.
//                 </p>
//               </div>
//             </div>
//           </motion.div>
//         </motion.div>
        
//         {/* Section 1: What Makes Unique - FULL CONTENT */}
//         <motion.div 
//           className="mb-16"
//           initial={{ opacity: 0, x: 100 }}
//           whileInView={{ opacity: 1, x: 0 }}
//           viewport={{ once: false, amount: 0.3 }}
//           transition={{ duration: 0.6 }}
//         >
//           <motion.div 
//             className={`bg-[#085056]/60 backdrop-blur-sm rounded-3xl p-8 border transition-all ${
//               activeSection === 1 ? 'border-[#2bcc39] shadow-2xl shadow-[#2bcc39]/20' : 'border-[#177338]/30'
//             }`}
//             whileHover={{ scale: 1.01 }}
//           >
//             <div className="flex items-start gap-6 mb-8">
//               <motion.div 
//                 className="w-1 h-16 bg-gradient-to-b from-[#b8cc26] to-[#2bcc39] rounded-full flex-shrink-0"
//                 animate={{ scaleY: [1, 1.3, 1] }}
//                 transition={{ duration: 2, repeat: Infinity }}
//               />
//               <div className="flex-1">
//                 <h2 className="text-3xl md:text-4xl font-black text-[#b8cc26] mb-4">What Makes Jaimax Unique</h2>
//                 <p className="text-gray-200 leading-relaxed text-base">
//                   What makes Jaimax truly unique among India's growing number of crypto pre-sale coins is its powerful combination of <span className="text-[#2bcc39] font-bold">trust, technology, and opportunity</span>. Backed by Jaisvik Software Solutions Private Limited, the project is designed to empower users to invest confidently in the future of cryptocurrency. From fast transactions and strong blockchain security to a simple and transparent investment model, Jaimax delivers everything an investor needs to participate in the decentralized economy.
//                 </p>
//               </div>
//             </div>
            
//             <div className="grid md:grid-cols-3 gap-8">
//               {[
//                 { title: 'Trust', desc: 'Backed by Jaisvik Software Solutions Private Limited', color: '#177338' },
//                 { title: 'Technology', desc: 'Fast transactions and strong blockchain security', color: '#2bcc39' },
//                 { title: 'Opportunity', desc: 'Simple and transparent investment model', color: '#b8cc26' }
//               ].map((item, idx) => (
//                 <motion.div 
//                   key={idx}
//                   className="relative bg-gradient-to-br from-[#177338]/20 to-transparent p-6 rounded-2xl border border-[#177338]/50 overflow-hidden group"
//                   initial={{ opacity: 0, y: 50 }}
//                   whileInView={{ opacity: 1, y: 0 }}
//                   viewport={{ once: true }}
//                   transition={{ delay: idx * 0.15 }}
//                   whileHover={{ 
//                     borderColor: "#2bcc39",
//                     boxShadow: "0 20px 40px rgba(43, 204, 57, 0.2)"
//                   }}
//                 >
//                   <motion.div
//                     className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
//                     initial={{ x: '-100%' }}
//                     whileHover={{ x: '100%' }}
//                     transition={{ duration: 0.6 }}
//                   />
                  
//                   <div className="flex justify-center mb-6">
//                     <CreativeNumber number={idx + 1} color={item.color} />
//                   </div>
                  
//                   <h4 className="font-black text-xl text-[#b8cc26] mb-3 text-center">{item.title}</h4>
//                   <p className="text-gray-300 text-sm text-center leading-relaxed">{item.desc}</p>
//                 </motion.div>
//               ))}
//             </div>
//           </motion.div>
//         </motion.div>
        
//         {/* Section 2: Pre-Sale - FULL CONTENT */}
//         <motion.div 
//           className="mb-16"
//           initial={{ opacity: 0, scale: 0.95 }}
//           whileInView={{ opacity: 1, scale: 1 }}
//           viewport={{ once: false, amount: 0.3 }}
//           transition={{ duration: 0.6 }}
//         >
//           <motion.div 
//             className={`bg-gradient-to-br from-[#177338]/15 to-[#085056]/60 backdrop-blur-sm rounded-3xl p-8 border-2 transition-all ${
//               activeSection === 2 ? 'border-[#2bcc39] shadow-2xl shadow-[#2bcc39]/30' : 'border-[#177338]/30'
//             }`}
//             whileHover={{ scale: 1.01 }}
//           >
//             <div className="flex items-start gap-6 mb-8">
//               <motion.div 
//                 className="w-1 h-16 bg-gradient-to-b from-[#b8cc26] to-[#2bcc39] rounded-full flex-shrink-0"
//                 animate={{ scaleY: [1, 1.3, 1] }}
//                 transition={{ duration: 2, repeat: Infinity }}
//               />
//               <div className="flex-1">
//                 <h2 className="text-3xl md:text-4xl font-black text-[#b8cc26] mb-4">Exclusive Pre-Sale Opportunity</h2>
//                 <p className="text-gray-200 leading-relaxed text-base">
//                   The Jaimax pre-sale offers early investors an exclusive opportunity to purchase coins at a low initial price before public trading begins. This pre-sale advantage allows holders to maximize their growth potential while supporting a rapidly expanding blockchain ecosystem. Whether you are an experienced trader or a first-time investor, Jaimax provides a trusted platform to access one of India's most promising pre-sale crypto coin.
//                 </p>
//               </div>
//             </div>
            
//             <div className="bg-[#085056]/80 border border-[#177338]/50 p-8 rounded-2xl">
//               <div className="grid md:grid-cols-2 gap-6 mb-8">
//                 <motion.div 
//                   className="relative bg-gradient-to-br from-[#177338]/30 to-transparent p-6 rounded-xl border border-[#2bcc39]/50 overflow-hidden"
//                   whileHover={{ scale: 1.03, boxShadow: "0 15px 40px rgba(43, 204, 57, 0.2)" }}
//                 >
//                   <span className="text-xs text-gray-400 block mb-2 font-semibold tracking-wider uppercase">Current Price</span>
//                   <motion.div className="flex items-center gap-3">
//                     <motion.span 
//                       className="text-4xl font-black text-[#2bcc39]"
//                       animate={{ scale: [1, 1.05, 1] }}
//                       transition={{ duration: 2, repeat: Infinity }}
//                     >
//                       ₹{livePrice}
//                     </motion.span>
//                     <motion.div
//                       className="px-2 py-1 bg-[#2bcc39]/20 rounded-full text-[#2bcc39] text-xs font-bold"
//                       animate={{ opacity: [0.5, 1, 0.5] }}
//                       transition={{ duration: 1.5, repeat: Infinity }}
//                     >
//                       LIVE
//                     </motion.div>
//                   </motion.div>
                  
//                   <motion.div
//                     className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-[#2bcc39]/20 to-transparent rounded-bl-full"
//                     animate={{ scale: [1, 1.2, 1] }}
//                     transition={{ duration: 3, repeat: Infinity }}
//                   />
//                 </motion.div>
                
//                 <motion.div 
//                   className="relative bg-gradient-to-br from-[#b8cc26]/20 to-transparent p-6 rounded-xl border border-[#b8cc26]/50 overflow-hidden"
//                   whileHover={{ scale: 1.03, boxShadow: "0 15px 40px rgba(184, 204, 38, 0.2)" }}
//                 >
//                   <span className="text-xs text-gray-400 block mb-2 font-semibold tracking-wider uppercase">Expected Launch</span>
//                   <motion.div className="flex items-center gap-3">
//                     <span className="text-4xl font-black text-[#b8cc26]">₹4.10</span>
//                     <motion.div
//                       className="px-2 py-1 bg-[#b8cc26]/20 rounded-full text-[#b8cc26] text-xs font-bold"
//                       initial={{ opacity: 0, x: -10 }}
//                       whileInView={{ opacity: 1, x: 0 }}
//                     >
//                       +250%
//                     </motion.div>
//                   </motion.div>
                  
//                   <motion.div
//                     className="absolute bottom-0 left-0 w-20 h-20 bg-gradient-to-tr from-[#b8cc26]/20 to-transparent rounded-tr-full"
//                     animate={{ scale: [1, 1.2, 1] }}
//                     transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
//                   />
//                 </motion.div>
//               </div>
              
//               <div>
//                 <div className="flex justify-between items-center mb-3">
//                   <span className="text-sm text-gray-300 font-semibold">Pre-Sale Progress</span>
//                   <motion.div className="flex items-center gap-2">
//                     <motion.span 
//                       className="text-2xl font-black text-[#2bcc39]"
//                       animate={{ scale: [1, 1.15, 1] }}
//                       transition={{ duration: 1.5, repeat: Infinity }}
//                     >
//                       65%
//                     </motion.span>
//                     <motion.span
//                       className="text-xs text-gray-400"
//                       animate={{ opacity: [0.5, 1, 0.5] }}
//                       transition={{ duration: 2, repeat: Infinity }}
//                     >
//                       Complete
//                     </motion.span>
//                   </motion.div>
//                 </div>
                
//                 <div className="relative w-full h-5 bg-[#085056] border border-[#177338] rounded-full overflow-hidden">
//                   <motion.div 
//                     className="absolute h-full bg-gradient-to-r from-[#177338] via-[#2bcc39] to-[#b8cc26] rounded-full"
//                     initial={{ width: 0 }}
//                     whileInView={{ width: '65%' }}
//                     transition={{ duration: 2, ease: "easeOut" }}
//                   />
//                   <motion.div 
//                     className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
//                     animate={{ x: ['-100%', '200%'] }}
//                     transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
//                   />
                  
//                   {[25, 50, 75].map((mark) => (
//                     <div
//                       key={mark}
//                       className="absolute top-0 bottom-0 w-px bg-white/20"
//                       style={{ left: `${mark}%` }}
//                     />
//                   ))}
//                 </div>
                
//                 <div className="flex justify-between text-xs text-gray-500 mt-2">
//                   <span>Start</span>
//                   <span>Goal</span>
//                 </div>
//               </div>
//             </div>
//           </motion.div>
//         </motion.div>
        
//         {/* Section 3: Security - FULL CONTENT */}
//         <motion.div 
//           className="mb-16"
//           initial={{ opacity: 0, rotate: -2 }}
//           whileInView={{ opacity: 1, rotate: 0 }}
//           viewport={{ once: false, amount: 0.3 }}
//           transition={{ duration: 0.6 }}
//         >
//           <motion.div 
//             className={`bg-[#085056]/60 backdrop-blur-sm rounded-3xl p-8 border transition-all ${
//               activeSection === 3 ? 'border-[#2bcc39] shadow-2xl shadow-[#2bcc39]/20' : 'border-[#177338]/30'
//             }`}
//             whileHover={{ scale: 1.01 }}
//           >
//             <div className="flex items-start gap-6 mb-8">
//               <motion.div 
//                 className="w-1 h-16 bg-gradient-to-b from-[#b8cc26] to-[#2bcc39] rounded-full flex-shrink-0"
//                 animate={{ scaleY: [1, 1.3, 1] }}
//                 transition={{ duration: 2, repeat: Infinity }}
//               />
//               <div className="flex-1">
//                 <h2 className="text-3xl md:text-4xl font-black text-[#b8cc26] mb-4">Security at the Heart</h2>
//                 <p className="text-gray-200 leading-relaxed text-base mb-4">
//                   Security remains at the heart of the Jaimax ecosystem. Every transaction is protected by advanced blockchain encryption, ensuring full transparency and zero manipulation. Investors can buy, hold, and trade Jaimax confidently, knowing that the platform follows industry-leading standards for safety and compliance.
//                 </p>
//                 <p className="text-gray-200 leading-relaxed text-base">
//                   The Jaimax Coin is built to handle real-world utility — from DeFi and NFTs to decentralized applications — ensuring that each coin holds long-term value beyond speculation.
//                 </p>
//               </div>
//             </div>
            
//             <div className="grid md:grid-cols-2 gap-8">
//               {[
//                 { title: 'Advanced Protection', desc: 'Blockchain encryption ensures full transparency and zero manipulation' },
//                 { title: 'Industry Standards', desc: 'Platform follows industry-leading standards for safety and compliance' }
//               ].map((item, idx) => (
//                 <motion.div 
//                   key={idx}
//                   className="relative bg-gradient-to-br from-[#177338]/20 to-transparent p-6 rounded-2xl border border-[#177338]/50"
//                   initial={{ opacity: 0, x: idx % 2 === 0 ? -50 : 50 }}
//                   whileInView={{ opacity: 1, x: 0 }}
//                   viewport={{ once: true }}
//                   transition={{ delay: idx * 0.15 }}
//                   whileHover={{ 
//                     borderColor: "#2bcc39",
//                     boxShadow: "0 20px 40px rgba(43, 204, 57, 0.2)"
//                   }}
//                 >
//                   <div className="flex justify-center mb-6">
//                     <HexagonNumber 
//                       number={idx + 1} 
//                       color={idx === 0 ? '#2bcc39' : '#b8cc26'} 
//                     />
//                   </div>
//                   <h4 className="font-black text-xl text-[#b8cc26] mb-3 text-center">{item.title}</h4>
//                   <p className="text-gray-300 text-sm text-center leading-relaxed">{item.desc}</p>
//                 </motion.div>
//               ))}
//             </div>
//           </motion.div>
//         </motion.div>
        
//         {/* Section 4: Ecosystem - FULL CONTENT */}
//         <motion.div 
//           className="mb-16"
//           initial={{ opacity: 0, y: 100 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: false, amount: 0.3 }}
//           transition={{ duration: 0.6 }}
//         >
//           <motion.div 
//             className={`bg-[#085056]/60 backdrop-blur-sm rounded-3xl p-8 border transition-all ${
//               activeSection === 4 ? 'border-[#2bcc39] shadow-2xl shadow-[#2bcc39]/20' : 'border-[#177338]/30'
//             }`}
//             whileHover={{ scale: 1.01 }}
//           >
//             <div className="flex items-start gap-6 mb-8">
//               <motion.div 
//                 className="w-1 h-16 bg-gradient-to-b from-[#b8cc26] to-[#2bcc39] rounded-full flex-shrink-0"
//                 animate={{ scaleY: [1, 1.3, 1] }}
//                 transition={{ duration: 2, repeat: Infinity }}
//               />
//               <div className="flex-1">
//                 <h2 className="text-3xl md:text-4xl font-black text-[#b8cc26] mb-4">Complete Blockchain Ecosystem</h2>
//                 <p className="text-gray-200 leading-relaxed text-base">
//                   Unlike most projects that focus only on trading, Jaimax is creating a complete blockchain ecosystem where investors, developers, and learners come together. Its vision extends beyond profit — aiming to educate, innovate, and connect users worldwide through blockchain education and financial empowerment. This human-centered approach sets Jaimax apart as a best-in-class crypto coin designed to sustain long-term growth.
//                 </p>
//               </div>
//             </div>
            
//             <div className="grid grid-cols-3 gap-6">
//               {[
//                 { title: 'Educate', desc: 'Building knowledge of blockchain technology', color: '#177338' },
//                 { title: 'Innovate', desc: 'Driving new blockchain solutions', color: '#2bcc39' },
//                 { title: 'Connect', desc: 'Bringing users worldwide together', color: '#b8cc26' }
//               ].map((item, idx) => (
//                 <motion.div 
//                   key={idx}
//                   className="text-center bg-gradient-to-br from-[#177338]/20 to-transparent p-6 rounded-2xl border border-[#177338]/50"
//                   initial={{ opacity: 0, scale: 0.8 }}
//                   whileInView={{ opacity: 1, scale: 1 }}
//                   viewport={{ once: true }}
//                   transition={{ delay: idx * 0.15 }}
//                   whileHover={{ 
//                     borderColor: "#2bcc39",
//                     boxShadow: "0 20px 40px rgba(43, 204, 57, 0.2)"
//                   }}
//                 >
//                   <div className="flex justify-center mb-6">
//                     <CardNumber number={idx + 1} color={item.color} />
//                   </div>
//                   <h4 className="font-black text-lg text-[#b8cc26] mb-2">{item.title}</h4>
//                   <p className="text-gray-400 text-xs">{item.desc}</p>
//                 </motion.div>
//               ))}
//             </div>
//           </motion.div>
//         </motion.div>
        
//         {/* Section 5: Future & CTA - FULL CONTENT */}
//         <motion.div 
//           className="mb-16"
//           initial={{ opacity: 0, scale: 0.95 }}
//           whileInView={{ opacity: 1, scale: 1 }}
//           viewport={{ once: false, amount: 0.3 }}
//           transition={{ duration: 0.6 }}
//         >
//           <motion.div 
//             className={`bg-[#085056]/60 backdrop-blur-sm rounded-3xl p-8 border transition-all ${
//               activeSection === 5 ? 'border-[#2bcc39] shadow-2xl shadow-[#2bcc39]/20' : 'border-[#177338]/30'
//             }`}
//             whileHover={{ scale: 1.01 }}
//           >
//             <div className="flex items-start gap-6 mb-8">
//               <motion.div 
//                 className="w-1 h-16 bg-gradient-to-b from-[#b8cc26] to-[#2bcc39] rounded-full flex-shrink-0"
//                 animate={{ scaleY: [1, 1.3, 1] }}
//                 transition={{ duration: 2, repeat: Infinity }}
//               />
//               <div className="flex-1">
//                 <h2 className="text-3xl md:text-4xl font-black text-[#b8cc26] mb-4">The Future with Jaimax</h2>
//                 <p className="text-gray-200 leading-relaxed text-base">
//                   As India steps into the next generation of digital finance, Jaimax Coin continues to lead as the best pre-sale crypto coin in India, offering a bridge between today's investors and tomorrow's decentralized economy. By investing early, users not only secure potential profits but also contribute to the development of a transparent and accessible financial future.
//                 </p>
//               </div>
//             </div>
            
//             <motion.div 
//               className="relative overflow-hidden bg-gradient-to-r from-[#177338] via-[#177338] to-[#177338] p-10 rounded-2xl text-center"
//               animate={{
//                 backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
//               }}
//               style={{ backgroundSize: '200% 100%' }}
//               transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
//             >
//               <motion.h3 
//                 className="text-2xl md:text-3xl font-black mb-4 text-white"
//                 initial={{ opacity: 0, y: 20 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//               >
//                 Join Jaimax today — the crypto pre-sale coin redefining how India invests in blockchain.
//               </motion.h3>
              
//               <motion.p 
//                 className="text-lg md:text-xl font-bold text-[#085056] mb-8"
//                 initial={{ opacity: 0 }}
//                 whileInView={{ opacity: 1 }}
//                 transition={{ delay: 0.2 }}
//               >
//                 Invest early. Grow confidently. Own the future with Jaimax.
//               </motion.p>
              
//               <motion.button 
//                 className="relative bg-[#085056] px-12 py-4 rounded-full text-white font-black text-lg shadow-2xl overflow-hidden group"
//                 whileHover={{ scale: 1.08 }}
//                 whileTap={{ scale: 0.95 }}
//               >
//                 <motion.span
//                   className="absolute inset-0 bg-[#b8cc26]"
//                   initial={{ x: '-100%' }}
//                   whileHover={{ x: 0 }}
//                   transition={{ duration: 0.3 }}
//                 />
//                 <span className="relative z-10 group-hover:text-[#085056] transition-colors flex items-center gap-2">
//                   Join Pre-Sale
//                   <motion.span
//                     animate={{ x: [0, 5, 0] }}
//                     transition={{ duration: 1.5, repeat: Infinity }}
//                   >
//                     →
//                   </motion.span>
//                 </span>
//               </motion.button>
//             </motion.div>
//           </motion.div>
//         </motion.div>
        
       
//       </div>
//     </div>
//   );
// };

// export default JaimaxContent;


import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useGetRoundQuery } from "../../components/Dashboard/pages/dashBoard/DashboardApliSlice";

const JaimaxContent = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const { scrollYProgress } = useScroll();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { data: roundData, error, isLoading, refetch } = useGetRoundQuery();
  const liveRounds = roundData?.data?.rounds?.filter(round => round.status === 1) || [];
  const currentRound = liveRounds[0];
  
  const formatNumber = (num) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toLocaleString();
  };
  
  const livePrice = currentRound?.atPriceInr || "0.0000";
  const soldTokens = formatNumber(currentRound?.soldQty || 225765326);
  const liveMembers = formatNumber(currentRound?.totalMembers || 24567);

  useEffect(() => {
    const handleScroll = () => setScrollPosition(window.scrollY);
    const handleMouse = (e) => setMousePosition({ x: e.clientX, y: e.clientY });
    
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouse);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouse);
    };
  }, []);
  
  const getActiveSection = () => {
    const height = window.innerHeight;
    if (scrollPosition < height * 0.3) return 0;
    if (scrollPosition < height * 0.6) return 1;
    if (scrollPosition < height) return 2;
    if (scrollPosition < height * 1.4) return 3;
    if (scrollPosition < height * 1.8) return 4;
    return 5;
  };
  
  const activeSection = getActiveSection();

  // Parallax
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 200]);

  // Compact Creative Number Badge Component
  const CreativeNumber = ({ number, color }) => (
    <motion.div
      className="relative w-16 h-16"
      whileHover={{ scale: 1.15, rotate: 360 }}
      transition={{ type: "spring", stiffness: 250, damping: 20 }}
    >
      <motion.div
        className="absolute inset-0 rounded-full border-2"
        style={{ borderColor: color }}
        animate={{ rotate: 360 }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
      >
        <motion.div
          className="absolute w-2 h-2 rounded-full -top-1 left-1/2 -ml-1"
          style={{ backgroundColor: color }}
          animate={{
            boxShadow: [
              `0 0 10px ${color}`,
              `0 0 20px ${color}`,
              `0 0 10px ${color}`,
            ]
          }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      </motion.div>
      
      <motion.div
        className="absolute inset-1 rounded-full opacity-20"
        style={{ backgroundColor: color }}
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 2.5, repeat: Infinity }}
      />
      
      <motion.div
        className="absolute inset-2 rounded-full flex items-center justify-center font-black text-xl text-white shadow-xl"
        style={{ 
          background: `linear-gradient(135deg, ${color}, #085056)`,
        }}
        animate={{
          boxShadow: [
            `0 0 15px ${color}50`,
            `0 0 30px ${color}80`,
            `0 0 15px ${color}50`,
          ]
        }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        {number}
      </motion.div>
      
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full"
          style={{ backgroundColor: color, left: '50%', top: '50%' }}
          animate={{
            x: [0, Math.cos(i * 120 * Math.PI / 180) * 30, 0],
            y: [0, Math.sin(i * 120 * Math.PI / 180) * 30, 0],
            opacity: [0, 1, 0],
            scale: [0, 1.2, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: i * 0.2,
          }}
        />
      ))}
    </motion.div>
  );

  // Compact Hexagon Number Component
  const HexagonNumber = ({ number, color }) => (
    <motion.div
      className="relative w-20 h-24 flex items-center justify-center"
      whileHover={{ scale: 1.15, rotate: 10 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <motion.div
        className="absolute inset-[-3px]"
        style={{
          clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
          background: `linear-gradient(135deg, ${color}40, transparent)`,
          filter: 'blur(6px)',
        }}
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      
      <motion.div
        className="absolute inset-0"
        style={{
          clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
          background: `linear-gradient(135deg, ${color}, #085056)`,
        }}
        animate={{
          boxShadow: [
            `0 0 15px ${color}30`,
            `0 0 30px ${color}60`,
            `0 0 15px ${color}30`,
          ]
        }}
        transition={{ duration: 2.5, repeat: Infinity }}
      />
      
      <motion.div
        className="absolute inset-2"
        style={{
          clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
          backgroundColor: '#085056',
        }}
      />
      
      <motion.span
        className="relative z-10 text-3xl font-black"
        style={{ color }}
        animate={{
          textShadow: [
            `0 0 10px ${color}50`,
            `0 0 20px ${color}80`,
            `0 0 10px ${color}50`,
          ],
          scale: [1, 1.05, 1],
        }}
        transition={{ duration: 2.5, repeat: Infinity }}
      >
        {number}
      </motion.span>
      
      <motion.div
        className="absolute inset-0 opacity-60"
        style={{
          clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
          border: `2px solid ${color}`,
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
      />
    </motion.div>
  );

  // Compact 3D Card Number
  const CardNumber = ({ number, color }) => (
    <motion.div
      className="relative perspective-1000"
      whileHover={{ rotateY: 180 }}
      style={{ transformStyle: 'preserve-3d' }}
      transition={{ duration: 0.6 }}
    >
      <motion.div
        className="w-16 h-16 rounded-xl flex items-center justify-center relative"
        style={{
          background: `linear-gradient(135deg, ${color}, #085056)`,
          transformStyle: 'preserve-3d',
        }}
        animate={{
          boxShadow: [
            `0 10px 25px ${color}30`,
            `0 15px 40px ${color}60`,
            `0 10px 25px ${color}30`,
          ]
        }}
        transition={{ duration: 2.5, repeat: Infinity }}
      >
        <motion.div
          className="absolute inset-0 flex items-center justify-center text-3xl font-black text-white rounded-xl"
          style={{ backfaceVisibility: 'hidden' }}
        >
          {number}
        </motion.div>
        
        <motion.div
          className="absolute inset-0 flex items-center justify-center text-3xl font-black rounded-xl"
          style={{ 
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            background: `linear-gradient(135deg, #085056, ${color})`,
          }}
        >
          <motion.div
            className="w-8 h-8 rounded-full border-2 flex items-center justify-center"
            style={{ borderColor: color }}
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <div className="w-4 h-0.5 rounded-full" style={{ backgroundColor: color }} />
          </motion.div>
        </motion.div>
        
        <motion.div
          className="absolute -inset-1 rounded-xl blur-lg opacity-40"
          style={{ backgroundColor: color }}
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 2.5, repeat: Infinity }}
        />
      </motion.div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-[#085056] text-white relative overflow-hidden">
      {/* Compact Gradient Orbs */}
      <motion.div 
        className="fixed w-[400px] h-[400px] opacity-8 rounded-full blur-3xl pointer-events-none"
        style={{ 
          y: y1,
          background: 'radial-gradient(circle, #177338, transparent)'
        }}
        animate={{
          x: [100, 300, 100],
          rotate: [0, 360],
        }}
        transition={{
          x: { duration: 10, repeat: Infinity, ease: "easeInOut" },
          rotate: { duration: 25, repeat: Infinity, ease: "linear" }
        }}
      />

      <motion.div 
        className="fixed w-[350px] h-[350px] opacity-6 rounded-full blur-3xl pointer-events-none right-0 bottom-0"
        style={{ 
          y: y2,
          background: 'radial-gradient(circle, #b8cc26, transparent)'
        }}
        animate={{
          x: [-100, -300, -100],
          rotate: [360, 0],
        }}
        transition={{
          x: { duration: 12, repeat: Infinity, ease: "easeInOut" },
          rotate: { duration: 30, repeat: Infinity, ease: "linear" }
        }}
      />

      <div className="max-w-7xl mx-auto px-4 py-6 relative z-10">
        {/* Compact Header */}
        <motion.div 
          className="text-center mb-8"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2 
            className="text-3xl md:text-5xl font-black mb-3 leading-tight tracking-tight"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            India's Trusted{' '}
            <motion.span 
              className="relative inline-block text-[#b8cc26]"
              animate={{
                textShadow: [
                  "0 0 20px rgba(184, 204, 38, 0.4)",
                  "0 0 40px rgba(184, 204, 38, 0.8)",
                  "0 0 20px rgba(184, 204, 38, 0.4)",
                ]
              }}
              transition={{ duration: 2.5, repeat: Infinity }}
            >
              Pre-Sale
              <motion.div
                className="absolute -bottom-1 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#b8cc26] to-transparent rounded-full"
                animate={{ 
                  scaleX: [0.5, 1, 0.5],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{ duration: 2.5, repeat: Infinity }}
              />
            </motion.span>
            <br />
            Crypto Coin – <span className="text-[#1a9850]">Jaimax</span>
          </motion.h2>
        </motion.div>
        
        {/* Compact Navigation */}
<motion.div 
  className="sticky top-3 z-30 mb-8"
  initial={{ y: -100, opacity: 0 }}
  animate={{ y: 0, opacity: 1 }}
  transition={{ duration: 0.6 }}
>
  <div className="bg-[#085056]/98 backdrop-blur-xl rounded-full p-1 border-2 border-[#177338]/60 shadow-xl">
    <div className="grid grid-cols-3 sm:grid-cols-6 gap-1">
      {['Intro', 'About', 'Pre-Sale', 'Security', 'Ecosystem', 'Future'].map((name, index) => (
        <motion.button
          key={index}
          className={`
            px-2 py-1.5 sm:px-3 sm:py-2 
            rounded-full font-bold 
            text-[10px] sm:text-xs 
            transition-all duration-300 
            ${
              activeSection === index 
                ? 'bg-gradient-to-r from-[#177338] to-[#1a9850] text-white shadow-lg shadow-[#177338]/50' 
                : 'text-gray-400 hover:text-white hover:bg-[#177338]/20'
            }
          `}
          onClick={() => window.scrollTo({ top: index * window.innerHeight * 0.4, behavior: 'smooth' })}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {name}
        </motion.button>
      ))}
    </div>
  </div>
</motion.div>
        
        {/* Section 0: Intro - Compact */}
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div 
            className={`bg-gradient-to-br from-[#085056]/80 to-[#177338]/20 backdrop-blur-md rounded-2xl p-5 border-2 transition-all duration-500 ${
              activeSection === 0 ? 'border-[#1a9850] shadow-xl shadow-[#1a9850]/30' : 'border-[#177338]/40'
            }`}
            whileHover={{ scale: 1.01, boxShadow: "0 15px 30px rgba(26, 152, 80, 0.2)" }}
          >
            <div className="flex items-start gap-4">
              <motion.div 
                className="w-1 h-12 bg-gradient-to-b from-[#b8cc26] via-[#1a9850] to-[#177338] rounded-full flex-shrink-0"
                animate={{ 
                  scaleY: [1, 1.3, 1],
                  opacity: [0.7, 1, 0.7]
                }}
                transition={{ duration: 2.5, repeat: Infinity }}
              />
              <div className="flex-1">
                <p className="text-gray-100 leading-relaxed text-sm mb-3 font-medium">
                  In the evolving world of digital finance, <span className="text-[#b8cc26] font-extrabold">Jaimax Coin</span> has emerged as India's best pre-sale crypto coin, built for investors who value innovation, transparency, and long-term stability. As India embraces blockchain technology and decentralized finance, Jaimax is shaping the future of how people invest and grow wealth through digital currencies.
                </p>
                <p className="text-gray-100 leading-relaxed text-sm font-medium">
                  More than just a crypto coin, Jaimax represents a new era of secure, accessible, and rewarding investments for everyone.
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
        
        {/* Section 1: What Makes Unique - Compact */}
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div 
            className={`bg-gradient-to-br from-[#085056]/80 to-[#177338]/20 backdrop-blur-md rounded-2xl p-5 border-2 transition-all duration-500 ${
              activeSection === 1 ? 'border-[#1a9850] shadow-xl shadow-[#1a9850]/30' : 'border-[#177338]/40'
            }`}
            whileHover={{ scale: 1.01, boxShadow: "0 15px 30px rgba(26, 152, 80, 0.2)" }}
          >
            <div className="flex items-start gap-4 mb-5">
              <motion.div 
                className="w-1 h-12 bg-gradient-to-b from-[#b8cc26] via-[#1a9850] to-[#177338] rounded-full flex-shrink-0"
                animate={{ 
                  scaleY: [1, 1.3, 1],
                  opacity: [0.7, 1, 0.7]
                }}
                transition={{ duration: 2.5, repeat: Infinity }}
              />
              <div className="flex-1">
                <h2 className="text-2xl md:text-3xl font-black text-[#b8cc26] mb-3 tracking-tight">What Makes Jaimax Unique</h2>
                <p className="text-gray-100 leading-relaxed text-sm font-medium">
                  What makes Jaimax truly unique among India's growing number of crypto pre-sale coins is its powerful combination of <span className="text-[#1a9850] font-extrabold">trust, technology, and opportunity</span>. Backed by Jaisvik Software Solutions Private Limited, the project is designed to empower users to invest confidently in the future of cryptocurrency.
                </p>
              </div>
            </div>
            
            <div className="grid md:grid-cols-3 gap-4">
              {[
                { title: 'Trust', desc: 'Backed by Jaisvik Software Solutions Private Limited', color: '#177338' },
                { title: 'Technology', desc: 'Lightning-fast transactions with blockchain security', color: '#1a9850' },
                { title: 'Opportunity', desc: 'Transparent investment model for maximum returns', color: '#b8cc26' }
              ].map((item, idx) => (
                <motion.div 
                  key={idx}
                  className="relative bg-gradient-to-br from-[#177338]/30 to-[#085056]/50 p-4 rounded-xl border-2 border-[#177338]/60 overflow-hidden group"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ 
                    borderColor: "#1a9850",
                    boxShadow: "0 15px 30px rgba(26, 152, 80, 0.3)",
                    scale: 1.03
                  }}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: '100%' }}
                    transition={{ duration: 0.8 }}
                  />
                  
                  <div className="flex justify-center mb-4">
                    <CreativeNumber number={idx + 1} color={item.color} />
                  </div>
                  
                  <h4 className="font-black text-base text-[#b8cc26] mb-2 text-center">{item.title}</h4>
                  <p className="text-gray-200 text-xs text-center leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
        
        {/* Section 2: Pre-Sale - Compact */}
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div 
            className={`bg-gradient-to-br from-[#177338]/25 to-[#085056]/80 backdrop-blur-md rounded-2xl p-5 border-2 transition-all duration-500 ${
              activeSection === 2 ? 'border-[#1a9850] shadow-xl shadow-[#1a9850]/40' : 'border-[#177338]/40'
            }`}
            whileHover={{ scale: 1.01, boxShadow: "0 15px 30px rgba(26, 152, 80, 0.3)" }}
          >
            <div className="flex items-start gap-4 mb-5">
              <motion.div 
                className="w-1 h-12 bg-gradient-to-b from-[#b8cc26] via-[#1a9850] to-[#177338] rounded-full flex-shrink-0"
                animate={{ 
                  scaleY: [1, 1.3, 1],
                  opacity: [0.7, 1, 0.7]
                }}
                transition={{ duration: 2.5, repeat: Infinity }}
              />
              <div className="flex-1">
                <h2 className="text-2xl md:text-3xl font-black text-[#b8cc26] mb-3 tracking-tight">Exclusive Pre-Sale Opportunity</h2>
                <p className="text-gray-100 leading-relaxed text-sm font-medium">
                  The Jaimax pre-sale offers early investors an exclusive opportunity to purchase coins at a low initial price before public trading begins. This pre-sale advantage allows holders to maximize their growth potential.
                </p>
              </div>
            </div>
            
            <div className="bg-[#085056]/90 border-2 border-[#177338]/60 p-5 rounded-2xl shadow-xl">
              <div className="grid md:grid-cols-2 gap-4 mb-5">
                <motion.div 
                  className="relative bg-gradient-to-br from-[#177338]/40 to-[#085056]/60 p-4 rounded-xl border-2 border-[#1a9850]/60 overflow-hidden group"
                  whileHover={{ 
                    scale: 1.03, 
                    boxShadow: "0 15px 30px rgba(26, 152, 80, 0.3)",
                    borderColor: "#1a9850"
                  }}
                >
                  <span className="text-xs text-gray-400 block mb-2 font-bold tracking-widest uppercase">Current Price</span>
                  <motion.div className="flex items-center gap-2">
                    <motion.span 
                      className="text-3xl font-black text-[#1a9850]"
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      ₹{livePrice}
                    </motion.span>
                    <motion.div
                      className="px-2 py-1 bg-[#1a9850]/30 rounded-full text-[#1a9850] text-xs font-black border border-[#1a9850]/50"
                      animate={{ opacity: [0.6, 1, 0.6] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      LIVE
                    </motion.div>
                  </motion.div>
                  
                  <motion.div
                    className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-[#1a9850]/30 to-transparent rounded-bl-full"
                    animate={{ 
                      scale: [1, 1.2, 1],
                      opacity: [0.3, 0.6, 0.3]
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />
                </motion.div>
                
                <motion.div 
                  className="relative bg-gradient-to-br from-[#b8cc26]/30 to-[#085056]/60 p-4 rounded-xl border-2 border-[#b8cc26]/60 overflow-hidden group"
                  whileHover={{ 
                    scale: 1.03, 
                    boxShadow: "0 15px 30px rgba(184, 204, 38, 0.3)",
                    borderColor: "#b8cc26"
                  }}
                >
                  <span className="text-xs text-gray-400 block mb-2 font-bold tracking-widest uppercase">Expected Launch</span>
                  <motion.div className="flex items-center gap-2">
                    <span className="text-3xl font-black text-[#b8cc26]">₹4.10</span>
                    <motion.div
                      className="px-2 py-1 bg-[#b8cc26]/30 rounded-full text-[#b8cc26] text-xs font-black border border-[#b8cc26]/50"
                      animate={{ scale: [1, 1.08, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      +250%
                    </motion.div>
                  </motion.div>
                  
                  <motion.div
                    className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-[#b8cc26]/30 to-transparent rounded-tr-full"
                    animate={{ 
                      scale: [1, 1.2, 1],
                      opacity: [0.3, 0.6, 0.3]
                    }}
                    transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                  />
                </motion.div>
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs text-gray-200 font-bold">Pre-Sale Progress</span>
                  <motion.div className="flex items-center gap-2">
                    <motion.span 
                      className="text-xl font-black text-[#1a9850]"
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      65%
                    </motion.span>
                    <motion.span
                      className="text-xs text-gray-400 font-semibold"
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      Complete
                    </motion.span>
                  </motion.div>
                </div>
                
                <div className="relative w-full h-4 bg-[#085056] border-2 border-[#177338]/60 rounded-full overflow-hidden shadow-inner">
                  <motion.div 
                    className="absolute h-full bg-gradient-to-r from-[#177338] via-[#1a9850] to-[#b8cc26] rounded-full"
                    initial={{ width: 0 }}
                    whileInView={{ width: '65%' }}
                    transition={{ duration: 2, ease: "easeOut" }}
                  />
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                    animate={{ x: ['-100%', '200%'] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  />
                </div>
                
                <div className="flex justify-between text-xs text-gray-400 mt-1 font-semibold">
                  <span>Start</span>
                  <span>Goal</span>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
        
        {/* Section 3: Security - Compact */}
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, rotate: -2 }}
          whileInView={{ opacity: 1, rotate: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div 
            className={`bg-gradient-to-br from-[#085056]/80 to-[#177338]/20 backdrop-blur-md rounded-2xl p-5 border-2 transition-all duration-500 ${
              activeSection === 3 ? 'border-[#1a9850] shadow-xl shadow-[#1a9850]/30' : 'border-[#177338]/40'
            }`}
            whileHover={{ scale: 1.01, boxShadow: "0 15px 30px rgba(26, 152, 80, 0.2)" }}
          >
            <div className="flex items-start gap-4 mb-5">
              <motion.div 
                className="w-1 h-12 bg-gradient-to-b from-[#b8cc26] via-[#1a9850] to-[#177338] rounded-full flex-shrink-0"
                animate={{ 
                  scaleY: [1, 1.3, 1],
                  opacity: [0.7, 1, 0.7]
                }}
                transition={{ duration: 2.5, repeat: Infinity }}
              />
              <div className="flex-1">
                <h2 className="text-2xl md:text-3xl font-black text-[#b8cc26] mb-3 tracking-tight">Security at the Heart</h2>
                <p className="text-gray-100 leading-relaxed text-sm font-medium">
                  Security remains at the heart of the Jaimax ecosystem. Every transaction is protected by advanced blockchain encryption, ensuring full transparency and zero manipulation. The platform follows industry-leading standards for safety and compliance.
                </p>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              {[
                { 
                  title: 'Advanced Protection', 
                  desc: 'Blockchain encryption ensures transparency',
                  features: ['256-bit Encryption', 'Multi-layer Security']
                },
                { 
                  title: 'Industry Standards', 
                  desc: 'Global standards for safety and compliance',
                  features: ['ISO Certified', 'Audited Contracts']
                }
              ].map((item, idx) => (
                <motion.div 
                  key={idx}
                  className="relative bg-gradient-to-br from-[#177338]/30 to-[#085056]/50 p-4 rounded-xl border-2 border-[#177338]/60 overflow-hidden"
                  initial={{ opacity: 0, x: idx % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ 
                    borderColor: "#1a9850",
                    boxShadow: "0 15px 30px rgba(26, 152, 80, 0.3)",
                    scale: 1.02
                  }}
                >
                  <div className="flex justify-center mb-4">
                    <HexagonNumber 
                      number={idx + 1} 
                      color={idx === 0 ? '#1a9850' : '#b8cc26'} 
                    />
                  </div>
                  <h4 className="font-black text-base text-[#b8cc26] mb-2 text-center">{item.title}</h4>
                  <p className="text-gray-200 text-xs text-center leading-relaxed mb-3">{item.desc}</p>
                  
                  <div className="space-y-1.5">
                    {item.features.map((feature, i) => (
                      <motion.div 
                        key={i}
                        className="flex items-center gap-2 bg-[#085056]/50 px-2 py-1.5 rounded-lg border border-[#177338]/40"
                        initial={{ opacity: 0, x: -15 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 + (i * 0.1) }}
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-[#1a9850]" />
                        <span className="text-xs text-gray-300 font-semibold">{feature}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
        
        {/* Section 4: Ecosystem - Compact */}
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div 
            className={`bg-gradient-to-br from-[#085056]/80 to-[#177338]/20 backdrop-blur-md rounded-2xl p-5 border-2 transition-all duration-500 ${
              activeSection === 4 ? 'border-[#1a9850] shadow-xl shadow-[#1a9850]/30' : 'border-[#177338]/40'
            }`}
            whileHover={{ scale: 1.01, boxShadow: "0 15px 30px rgba(26, 152, 80, 0.2)" }}
          >
            <div className="flex items-start gap-4 mb-5">
              <motion.div 
                className="w-1 h-12 bg-gradient-to-b from-[#b8cc26] via-[#1a9850] to-[#177338] rounded-full flex-shrink-0"
                animate={{ 
                  scaleY: [1, 1.3, 1],
                  opacity: [0.7, 1, 0.7]
                }}
                transition={{ duration: 2.5, repeat: Infinity }}
              />
              <div className="flex-1">
                <h2 className="text-2xl md:text-3xl font-black text-[#b8cc26] mb-3 tracking-tight">Complete Blockchain Ecosystem</h2>
                <p className="text-gray-100 leading-relaxed text-sm font-medium">
                  Unlike most projects that focus only on trading, Jaimax is creating a complete blockchain ecosystem where investors, developers, and learners come together.
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { 
                  title: 'Educate', 
                  desc: 'Building blockchain knowledge',
                  color: '#177338',
                  benefits: ['Free Courses', 'Expert Webinars']
                },
                { 
                  title: 'Innovate', 
                  desc: 'Driving blockchain solutions',
                  color: '#1a9850',
                  benefits: ['R&D Labs', 'Developer Tools']
                },
                { 
                  title: 'Connect', 
                  desc: 'Building global network',
                  color: '#b8cc26',
                  benefits: ['Global Network', 'Community Events']
                }
              ].map((item, idx) => (
                <motion.div 
                  key={idx}
                  className="relative bg-gradient-to-br from-[#177338]/30 to-[#085056]/50 p-4 rounded-xl border-2 border-[#177338]/60 overflow-hidden"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ 
                    borderColor: "#1a9850",
                    boxShadow: "0 15px 30px rgba(26, 152, 80, 0.3)",
                    y: -5
                  }}
                >
                  <div className="flex justify-center mb-4">
                    <CardNumber number={idx + 1} color={item.color} />
                  </div>
                  <h4 className="font-black text-base text-[#b8cc26] mb-2 text-center">{item.title}</h4>
                  <p className="text-gray-200 text-xs text-center mb-3 leading-relaxed">{item.desc}</p>
                  
                  <div className="space-y-1.5">
                    {item.benefits.map((benefit, i) => (
                      <motion.div 
                        key={i}
                        className="flex items-center gap-2 bg-[#085056]/50 px-2 py-1.5 rounded-lg border border-[#177338]/40"
                        initial={{ opacity: 0, x: -15 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 + (i * 0.1) }}
                      >
                        <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: item.color }} />
                        <span className="text-xs text-gray-300 font-semibold">{benefit}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
        
        {/* Section 5: Future & CTA - Compact */}
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div 
            className={`bg-gradient-to-br from-[#085056]/80 to-[#177338]/20 backdrop-blur-md rounded-2xl p-5 border-2 transition-all duration-500 ${
              activeSection === 5 ? 'border-[#1a9850] shadow-xl shadow-[#1a9850]/30' : 'border-[#177338]/40'
            }`}
            whileHover={{ scale: 1.01, boxShadow: "0 15px 30px rgba(26, 152, 80, 0.2)" }}
          >
            <div className="flex items-start gap-4 mb-5">
              <motion.div 
                className="w-1 h-12 bg-gradient-to-b from-[#b8cc26] via-[#1a9850] to-[#177338] rounded-full flex-shrink-0"
                animate={{ 
                  scaleY: [1, 1.3, 1],
                  opacity: [0.7, 1, 0.7]
                }}
                transition={{ duration: 2.5, repeat: Infinity }}
              />
              <div className="flex-1">
                <h2 className="text-2xl md:text-3xl font-black text-[#b8cc26] mb-3 tracking-tight">The Future with Jaimax</h2>
                <p className="text-gray-100 leading-relaxed text-sm font-medium">
                  As India steps into the next generation of digital finance, Jaimax Coin continues to lead as the best pre-sale crypto coin in India, offering a bridge between today's investors and tomorrow's decentralized economy.
                </p>
              </div>
            </div>
            
            <motion.div 
              className="relative overflow-hidden bg-gradient-to-br from-[#177338] via-[#1a9850] to-[#177338] p-6 rounded-2xl text-center shadow-xl"
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }}
              style={{ backgroundSize: '200% 100%' }}
              transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
            >
              <motion.div
                className="absolute top-0 left-0 w-24 h-24 bg-white/10 rounded-full blur-2xl"
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.3, 0.5, 0.3]
                }}
                transition={{ duration: 4, repeat: Infinity }}
              />
              <motion.div
                className="absolute bottom-0 right-0 w-28 h-28 bg-white/10 rounded-full blur-2xl"
                animate={{
                  scale: [1.3, 1, 1.3],
                  opacity: [0.5, 0.3, 0.5]
                }}
                transition={{ duration: 4, repeat: Infinity }}
              />
              
              <motion.h3 
                className="text-xl md:text-2xl font-black mb-3 text-white relative z-10"
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
              >
                Join Jaimax today — the crypto pre-sale coin redefining how India invests in blockchain.
              </motion.h3>
              
              <motion.p 
                className="text-base md:text-lg font-extrabold text-[#085056] mb-5 relative z-10"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                Invest early. Grow confidently. Own the future with Jaimax.
              </motion.p>
              
              <motion.button 
                className="relative bg-[#085056] px-10 py-3 rounded-full text-white font-black text-base shadow-xl overflow-hidden group z-10 mb-5"
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.span
                  className="absolute inset-0 bg-gradient-to-r from-[#b8cc26] to-[#177338]"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.4 }}
                />
                <span className="relative z-10 group-hover:text-white transition-colors flex items-center gap-2">
                  Join Pre-Sale
                  <motion.span
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    &rarr;
                  </motion.span>
                </span>
              </motion.button>
              

            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default JaimaxContent;