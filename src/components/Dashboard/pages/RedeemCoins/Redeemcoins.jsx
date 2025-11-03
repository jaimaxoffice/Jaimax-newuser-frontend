// // components/WelcomeBonusModal.jsx
// import React from 'react';
// import { motion, AnimatePresence } from 'framer-motion';

// const WelcomeBonusModal = ({ isOpen, onClose, onClaim, isLoading }) => {
//   return (
//     <AnimatePresence>
//       {isOpen && (
//         <>
//           {/* Backdrop */}
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             onClick={onClose}
//             className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
//           >
//             {/* Modal Content */}
//             <motion.div
//               initial={{ scale: 0.9, opacity: 0 }}
//               animate={{ scale: 1, opacity: 1 }}
//               exit={{ scale: 0.9, opacity: 0 }}
//               onClick={(e) => e.stopPropagation()}
//               className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl"
//             >
//               {/* Close Button */}
//               <button
//                 onClick={onClose}
//                 className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
//               >
//                 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                 </svg>
//               </button>

//               {/* Modal Header */}
//               <div className="text-center mb-6">
//                 <div className="mx-auto w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mb-4">
//                   <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
//                     <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//                   </svg>
//                 </div>
//                 <h2 className="text-2xl font-bold text-gray-800 mb-2">
//                   Welcome Bonus Available!
//                 </h2>
//                 <p className="text-gray-600">
//                   Congratulations! You have a special welcome bonus waiting for you.
//                 </p>
//               </div>

//               {/* Bonus Amount */}
//               <div className="bg-gradient-to-r from-teal-50 to-teal-100 rounded-lg p-4 mb-6">
//                 <div className="text-center">
//                   <p className="text-sm text-teal-600 mb-1">Your Bonus</p>
//                   <p className="text-3xl font-bold text-teal-800">₹500</p>
//                   <p className="text-xs text-teal-600 mt-1">One-time welcome reward</p>
//                 </div>
//               </div>

//               {/* Features */}
//               <div className="space-y-2 mb-6">
//                 <div className="flex items-center text-sm text-gray-600">
//                   <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
//                     <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
//                   </svg>
//                   Instant credit to your account
//                 </div>
//                 <div className="flex items-center text-sm text-gray-600">
//                   <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
//                     <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
//                   </svg>
//                   No conditions attached
//                 </div>
//                 <div className="flex items-center text-sm text-gray-600">
//                   <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
//                     <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
//                   </svg>
//                   Use it for any game or withdrawal
//                 </div>
//               </div>

//               {/* Action Buttons */}
//               <div className="flex gap-3">
//                 <button
//                   onClick={onClose}
//                   className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
//                 >
//                   Maybe Later
//                 </button>
//                 <button
//                   onClick={onClaim}
//                   disabled={isLoading}
//                   className="flex-1 px-4 py-3 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-lg hover:from-teal-600 hover:to-teal-700 transition-all font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
//                 >
//                   {isLoading ? (
//                     <>
//                       <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
//                         <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
//                         <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
//                       </svg>
//                       Claiming...
//                     </>
//                   ) : (
//                     'Claim Bonus'
//                   )}
//                 </button>
//               </div>
//             </motion.div>
//           </motion.div>
//         </>
//       )}
//     </AnimatePresence>
//   );
// };

// export default WelcomeBonusModal;



// import React, { useEffect } from 'react';
// import { motion, AnimatePresence, useAnimation } from 'framer-motion';
// import confetti from 'canvas-confetti';
// import icon from "../../../../assets/Images/jaicoin.svg"
// const WelcomeBonusModal = ({ isOpen, onClose, onClaim, isLoading }) => {
//   const boardControls = useAnimation();
  
//   // Trigger confetti when modal opens
//   useEffect(() => {
//     if (isOpen) {
//       setTimeout(() => {
//         const duration = 2 * 1000;
//         const animationEnd = Date.now() + duration;
        
//         const randomInRange = (min, max) => Math.random() * (max - min) + min;
        
//         const confettiEffect = () => {
//           confetti({
//             particleCount: 3,
//             angle: randomInRange(60, 120),
//             spread: randomInRange(50, 70),
//             origin: { x: randomInRange(0.2, 0.8), y: randomInRange(0.2, 0.5) },
//             colors: ['#F59E0B', '#D97706', '#92400E', '#FBBF24'],
//             disableForReducedMotion: true
//           });
          
//           if (Date.now() < animationEnd) {
//             requestAnimationFrame(confettiEffect);
//           }
//         };
        
//         confettiEffect();
        
//         // Subtle swinging animation
//         const swingAnimation = async () => {
//           await boardControls.start({
//             rotate: [0, 2, -2, 1.5, -1.5, 0],
//             transition: { 
//               duration: 5,
//               ease: "easeInOut",
//               times: [0, 0.2, 0.4, 0.6, 0.8, 1]
//             }
//           });
          
//           // Repeat the swing with delay
//           setTimeout(swingAnimation, 7000);
//         };
        
//         swingAnimation();
//       }, 300);
//     }
//   }, [isOpen, boardControls]);
  
//   return (
//     <AnimatePresence>
//       {isOpen && (
//         <>
//           {/* Backdrop with forest scene */}
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             onClick={onClose}
//             className="fixed inset-0 bg-gradient-to-b from-teal-900/90 to-teak-700/90 z-50 flex items-center justify-center p-4 overflow-hidden"
//           >
//             {/* Background decorative elements */}
//             <motion.div 
//               className="absolute inset-0 overflow-hidden opacity-30"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 0.3 }}
//               transition={{ delay: 0.2 }}
//             >
//               {/* Create a pattern of trees/forest elements */}
//               {[...Array(10)].map((_, i) => (
//                 <div 
//                   key={i} 
//                   className="absolute w-20 h-32 bg-teal-900"
//                   style={{ 
//                     bottom: '5%', 
//                     left: `${i * 10 + Math.random() * 5}%`,
//                     clipPath: 'polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%)'
//                   }}
//                 />
//               ))}
//             </motion.div>
            
//             {/* Ropes and board container */}
//             <motion.div 
//               className="relative"
//               animate={boardControls}
//               style={{ originY: 0, originX: 0.5 }}
//             >
//               {/* Ropes with knot details */}
//               <div className="relative flex justify-between w-72 mx-auto">
//                 <motion.div 
//                   initial={{ height: 0 }}
//                   animate={{ height: 100 }}
//                   transition={{ duration: 0.8, ease: "easeOut" }}
//                   className="w-2 bg-gradient-to-b from-teal-900 to-teal-700 rounded-full"
//                 >
//                   {/* Left rope knot */}
//                   <div className="absolute top-full w-4 h-4 bg-teal-800 rounded-full -translate-x-1/4"></div>
//                 </motion.div>
//                 <motion.div 
//                   initial={{ height: 0 }}
//                   animate={{ height: 80 }}
//                   transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
//                   className="w-2 bg-gradient-to-b from-teal-900 to-teal-700 rounded-full"
//                 >
//                   {/* Right rope knot */}
//                   <div className="absolute top-full w-4 h-4 bg-teal-800 rounded-full -translate-x-1/4"></div>
//                 </motion.div>
//               </div>

//               {/* Wooden Board */}
//               <motion.div
//                 initial={{ y: -100, opacity: 0 }}
//                 animate={{ y: 0, opacity: 1 }}
//                 exit={{ y: -100, opacity: 0 }}
//                 transition={{ 
//                   type: "spring", 
//                   damping: 12, 
//                   stiffness: 100,
//                   delay: 0.2
//                 }}
//                 className="max-w-md w-full"
//               >
//                 {/* Board outer frame */}
//                 <div className="bg-gradient-to-b from-teal-800 to-teal-900 rounded-xl p-1.5 shadow-2xl">
//                   {/* Wood grain texture overlay */}
//                   <div className="absolute inset-0 rounded-xl opacity-20 bg-repeat" 
//                     style={{
//                       backgroundImage: "url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48cGF0aCBkPSJNMCAwaDYwdjYwSDB6Ii8+PHBhdGggZD0iTTU0IDQyQzE4IDQyIDQyIDE4IDQyIDE4UzE4IDQyIDYgMzBDNDIgMTggMzAgNiAxOCAxOCIgc3Ryb2tlPSIjMDAwIiBzdHJva2Utb3BhY2l0eT0iLjIiIHN0cm9rZS13aWR0aD0iLjUiLz48L2c+PC9zdmc+')"
//                     }}
//                   ></div>
                  
//                   {/* Wood plank border */}
//                   <div className="bg-teal-800 rounded-lg p-1.5 border-4 border-teal-700" 
//                     style={{boxShadow: 'inset 0 0 20px rgba(0,0,0,0.3)'}}>
                    
//                     {/* Board inner content area */}
//                     <div className="bg-gradient-to-br from-teal-100 to-teal-200 rounded-lg p-6 border-2 border-teal-300 shadow-inner">
//                       {/* Wood nails for decoration */}
//                       <div className="absolute top-3 left-3 w-3 h-3 rounded-full bg-gray-600"></div>
//                       <div className="absolute top-3 right-3 w-3 h-3 rounded-full bg-gray-600"></div>
//                       <div className="absolute bottom-3 left-3 w-3 h-3 rounded-full bg-gray-600"></div>
//                       <div className="absolute bottom-3 right-3 w-3 h-3 rounded-full bg-gray-600"></div>
                      
//                       {/* Close Button */}
//                       <button
//                         onClick={onClose}
//                         className="absolute top-2 right-2 text-teal-800 hover:text-teal-900 transition-colors z-10"
//                       >
//                         <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                         </svg>
//                       </button>

//                       {/* Modal Header */}
//                       <motion.div 
//                         initial={{ y: 10, opacity: 0 }}
//                         animate={{ y: 0, opacity: 1 }}
//                         transition={{ delay: 0.5 }}
//                         className="text-center mb-6"
//                       >
//                         <h2 className="text-4xl font-bold text-teal-800 mb-2 font-serif tracking-wider"
//                             style={{textShadow: '1px 1px 2px rgba(0,0,0,0.1)'}}>
//                           WELCOME!
//                         </h2>
                        
//                         {/* Animated star burst around icon */}
//                         <motion.div 
//                           className="relative mx-auto w-24 h-24 mb-4"
//                           initial={{ scale: 0.8, opacity: 0 }}
//                           animate={{ scale: 1, opacity: 1 }}
//                           transition={{ delay: 0.7, duration: 0.5 }}
//                         >
//                           <motion.div 
//                             className="absolute inset-0 bg-teal-400 rounded-full"
//                             animate={{ 
//                               scale: [1, 1.1, 1],
//                               opacity: [0.7, 1, 0.7]
//                             }}
//                             transition={{
//                               duration: 2,
//                               repeat: Infinity,
//                               repeatType: "reverse"
//                             }}
//                           />
//                           <div className="absolute inset-0 flex items-center justify-center">
//                             <img src={icon} alt="" />                       
//                             </div>
//                         </motion.div>
                        
//                         <motion.p 
//                           initial={{ opacity: 0 }}
//                           animate={{ opacity: 1 }}
//                           transition={{ delay: 0.9 }}
//                           className="text-teal-800 font-medium"
//                         >
//                           You've received an exciting welcome gift!
//                         </motion.p>
//                       </motion.div>

//                       {/* Bonus Amount with reveal animation */}
//                       <motion.div 
//                         initial={{ scale: 0.9, opacity: 0 }}
//                         animate={{ scale: 1, opacity: 1 }}
//                         transition={{ delay: 1.1, type: "spring" }}
//                         className="bg-gradient-to-r from-teal-50 to-teal-100 rounded-lg p-5 mb-6 border-2 border-teal-300"
//                         style={{boxShadow: 'inset 0 0 10px rgba(146, 64, 14, 0.1)'}}
//                       >
//                         <div className="text-center">
//                           <p className="text-sm text-teal-700 mb-1">Your Welcome Bonus</p>
                          
//                           <motion.div
//                             initial={{ scale: 0.5, opacity: 0 }}
//                             animate={{ 
//                               scale: [0.5, 1.2, 1],
//                               opacity: 1
//                             }}
//                             transition={{ 
//                               delay: 1.3,
//                               duration: 0.7,
//                               times: [0, 0.6, 1]
//                             }}
//                           >
//                             <p className="text-5xl font-bold text-teal-800 my-2"
//                                style={{textShadow: '0 1px 2px rgba(146, 64, 14, 0.2)'}}>
//                               100 JMC
//                             </p>
//                           </motion.div>
                          
//                           <motion.p 
//                             initial={{ opacity: 0 }}
//                             animate={{ opacity: 1 }}
//                             transition={{ delay: 1.5 }}
//                             className="text-xs text-teal-700 italic"
//                           >
//                             Claim it now and start your adventure!
//                           </motion.p>
//                         </div>
//                       </motion.div>



//                       {/* Action Buttons */}
//                       <motion.div 
//                         className="flex gap-3"
//                         initial={{ y: 20, opacity: 0 }}
//                         animate={{ y: 0, opacity: 1 }}
//                         transition={{ delay: 2.3 }}
//                       >
//                         <button
//                           onClick={onClose}
//                           className="flex-1 px-4 py-3 border-2 border-teal-400 text-teal-800 rounded-lg hover:bg-teal-200 transition-colors font-medium"
//                         >
//                           Maybe Later
//                         </button>
//                         <motion.button
//                           onClick={onClaim}
//                           disabled={isLoading}
//                           whileHover={{ scale: 1.05 }}
//                           whileTap={{ scale: 0.95 }}
//                           className="flex-1 px-4 py-3 bg-gradient-to-r from-teal-500 to-teal-700 text-white rounded-lg hover:from-amber-600 hover:to-amber-800 transition-all font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
//                         >
//                           {isLoading ? (
//                             <>
//                               <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
//                                 <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
//                                 <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
//                               </svg>
//                               Claiming...
//                             </>
//                           ) : (
//                             'Claim Your Treasure!'
//                           )}
//                         </motion.button>
//                       </motion.div>
//                     </div>
//                   </div>
//                 </div>
//               </motion.div>
//             </motion.div>
//           </motion.div>
//         </>
//       )}
//     </AnimatePresence>
//   );
// };

// export default WelcomeBonusModal;


// import React, { useEffect } from 'react';
// import { motion, AnimatePresence, useAnimation } from 'framer-motion';
// import confetti from 'canvas-confetti';
// import icon from "../../../../assets/Images/jaicoin.svg"

// const WelcomeBonusModal = ({ isOpen, onClose, onClaim, isLoading }) => {
//   const boardControls = useAnimation();
  
//   // Trigger confetti when modal opens
//   useEffect(() => {
//     if (isOpen) {
//       setTimeout(() => {
//         const duration = 2 * 1000;
//         const animationEnd = Date.now() + duration;
        
//         const randomInRange = (min, max) => Math.random() * (max - min) + min;
        
//         const confettiEffect = () => {
//           confetti({
//             particleCount: 3,
//             angle: randomInRange(60, 120),
//             spread: randomInRange(50, 70),
//             origin: { x: randomInRange(0.2, 0.8), y: randomInRange(0.2, 0.5) },
//             colors: ['#F59E0B', '#D97706', '#92400E', '#FBBF24'],
//             disableForReducedMotion: true
//           });
          
//           if (Date.now() < animationEnd) {
//             requestAnimationFrame(confettiEffect);
//           }
//         };
        
//         confettiEffect();
        
//         // Subtle swinging animation
//         const swingAnimation = async () => {
//           await boardControls.start({
//             rotate: [0, 2, -2, 1.5, -1.5, 0],
//             transition: { 
//               duration: 5,
//               ease: "easeInOut",
//               times: [0, 0.2, 0.4, 0.6, 0.8, 1]
//             }
//           });
          
//           // Repeat the swing with delay
//           setTimeout(swingAnimation, 4000);
//         };
        
//         swingAnimation();
//       }, 300);
//     }
//   }, [isOpen, boardControls]);
  
//   return (
//     <AnimatePresence>
//       {isOpen && (
//         <>
         
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             onClick={onClose}
//             className="fixed inset-0 bg-gradient-to-b from-teal-900/90 to-teak-700/90 z-50 flex items-center justify-center p-4 overflow-hidden"
//           >

            
//             {/* Ropes and board container */}
//             <motion.div 
//               className="relative w-full max-w-xs sm:max-w-sm md:max-w-md mx-auto"
//               animate={boardControls}
//               style={{ originY: 0, originX: 0.5 }}
//             >
//               {/* Ropes with knot details */}
//               <div className="relative flex justify-between w-3/4 max-w-[18rem] mx-auto">
//                 <motion.div 
//                   initial={{ height: 0 }}
//                   animate={{ height: 60, sm: { height: 80 }, md: { height: 100 } }}
//                   transition={{ duration: 0.8, ease: "easeOut" }}
//                   className="w-1.5 md:w-2 bg-gradient-to-b from-teal-900 to-teal-700 rounded-full"
//                 >
//                   {/* Left rope knot */}
//                   <div className="absolute top-full w-3 h-3 md:w-4 md:h-4 bg-teal-800 rounded-full -translate-x-1/4"></div>
//                 </motion.div>
//                 <motion.div 
//                   initial={{ height: 0 }}
//                   animate={{ height: 60, sm: { height: 80 }, md: { height: 80 } }}
//                   transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
//                   className="w-1.5 md:w-2 bg-gradient-to-b from-teal-900 to-teal-700 rounded-full"
//                 >
//                   {/* Right rope knot */}
//                   <div className="absolute top-full w-3 h-3 md:w-4 md:h-4 bg-teal-800 rounded-full -translate-x-1/4"></div>
//                 </motion.div>
//               </div>

//               {/* Wooden Board */}
//               <motion.div
//                 initial={{ y: -100, opacity: 0 }}
//                 animate={{ y: 0, opacity: 1 }}
//                 exit={{ y: -100, opacity: 0 }}
//                 transition={{ 
//                   type: "spring", 
//                   damping: 12, 
//                   stiffness: 100,
//                   delay: 0.2
//                 }}
//                 className="w-full max-w-xs sm:max-w-sm md:max-w-md mx-auto"
//               >
//                 {/* Board outer frame */}
//                 <div className="bg-gradient-to-b from-teal-800 to-teal-900 rounded-xl p-1.5 shadow-2xl">
//                   {/* Wood grain texture overlay */}
//                   <div className="absolute inset-0 rounded-xl opacity-20 bg-repeat" 
//                     style={{
//                       backgroundImage: "url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48cGF0aCBkPSJNMCAwaDYwdjYwSDB6Ii8+PHBhdGggZD0iTTU0IDQyQzE4IDQyIDQyIDE4IDQyIDE4UzE4IDQyIDYgMzBDNDIgMTggMzAgNiAxOCAxOCIgc3Ryb2tlPSIjMDAwIiBzdHJva2Utb3BhY2l0eT0iLjIiIHN0cm9rZS13aWR0aD0iLjUiLz48L2c+PC9zdmc+')"
//                     }}
//                   ></div>
                  
//                   {/* Wood plank border */}
//                   <div className="bg-teal-800 rounded-lg p-1.5 border-2 sm:border-4 border-teal-700" 
//                     style={{boxShadow: 'inset 0 0 20px rgba(0,0,0,0.3)'}}>
                    
//                     {/* Board inner content area */}
//                     <div className="bg-gradient-to-br from-teal-100 to-teal-200 rounded-lg p-3 sm:p-4 md:p-6 border-2 border-teal-300 shadow-inner">
//                       <button
//                         onClick={onClose}
//                         className="absolute top-4 right-3 text-teal-800 hover:text-teal-900 transition-colors z-10"
//                       >
//                         <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                         </svg>
//                       </button>

                     
//                       <motion.div 
//                         initial={{ y: 10, opacity: 0 }}
//                         animate={{ y: 0, opacity: 1 }}
//                         transition={{ delay: 0.5 }}
//                         className="text-center mb-4 sm:mb-6"
//                       >
//                         <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-teal-800 mb-2 font-serif tracking-wider"
//                             style={{textShadow: '1px 1px 2px rgba(0,0,0,0.1)'}}>
//                           WELCOME!
//                         </h2>
                        
//                         {/* Animated star burst around icon */}
//                         <motion.div 
//                           className="relative mx-auto w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 mb-3 sm:mb-4"
//                           initial={{ scale: 0.8, opacity: 0 }}
//                           animate={{ scale: 1, opacity: 1 }}
//                           transition={{ delay: 0.7, duration: 0.5 }}
//                         >
//                           <motion.div 
//                             className="absolute inset-0 bg-teal-400 rounded-full"
//                             animate={{ 
//                               scale: [1, 1.1, 1],
//                               opacity: [0.7, 1, 0.7]
//                             }}
//                             transition={{
//                               duration: 2,
//                               repeat: Infinity,
//                               repeatType: "reverse"
//                             }}
//                           />
//                           <div className="absolute inset-0 flex items-center justify-center">
//                             <img src={icon} alt="" className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20" />                       
//                           </div>
//                         </motion.div>
                        
//                         <motion.p 
//                           initial={{ opacity: 0 }}
//                           animate={{ opacity: 1 }}
//                           transition={{ delay: 0.9 }}
//                           className="text-sm sm:text-base text-teal-800 font-medium px-2"
//                         >
//                           You've received an exciting welcome gift!
//                         </motion.p>
//                       </motion.div>

//                       {/* Bonus Amount with reveal animation */}
//                       <motion.div 
//                         initial={{ scale: 0.9, opacity: 0 }}
//                         animate={{ scale: 1, opacity: 1 }}
//                         transition={{ delay: 1.1, type: "spring" }}
//                         className="bg-gradient-to-r from-teal-50 to-teal-100 rounded-lg p-3 sm:p-4 md:p-5 mb-4 sm:mb-6 border-2 border-teal-300"
//                         style={{boxShadow: 'inset 0 0 10px rgba(146, 64, 14, 0.1)'}}
//                       >
//                         <div className="text-center">
//                           <p className="text-xs sm:text-sm text-teal-700 mb-1">Your Welcome Bonus</p>
                          
//                           <motion.div
//                             initial={{ scale: 0.5, opacity: 0 }}
//                             animate={{ 
//                               scale: [0.5, 1.2, 1],
//                               opacity: 1
//                             }}
//                             transition={{ 
//                               delay: 1.3,
//                               duration: 0.7,
//                               times: [0, 0.6, 1]
//                             }}
//                           >
//                             <p className="text-3xl sm:text-4xl md:text-5xl font-bold text-teal-800 my-1 sm:my-2"
//                                style={{textShadow: '0 1px 2px rgba(146, 64, 14, 0.2)'}}>
//                               100 JMC
//                             </p>
//                           </motion.div>
                          
//                           <motion.p 
//                             initial={{ opacity: 0 }}
//                             animate={{ opacity: 1 }}
//                             transition={{ delay: 1.5 }}
//                             className="text-xs text-teal-700 italic"
//                           >
//                             Claim it now and start your adventure!
//                           </motion.p>
//                         </div>
//                       </motion.div>

//                       {/* Action Buttons */}
//                       <motion.div 
//                         className="flex flex-col sm:flex-row gap-2 sm:gap-3"
//                         initial={{ y: 20, opacity: 0 }}
//                         animate={{ y: 0, opacity: 1 }}
//                         transition={{ delay: 2.3 }}
//                       >
//                         <button
//                           onClick={onClose}
//                           className="order-2 sm:order-1 sm:flex-1 px-4 py-2 sm:py-3 border-2 border-teal-400 text-teal-800 rounded-lg hover:bg-teal-200 transition-colors font-medium text-sm sm:text-base"
//                         >
//                           Maybe Later
//                         </button>
//                         <motion.button
//                           onClick={onClaim}
//                           disabled={isLoading}
//                           whileHover={{ scale: 1.05 }}
//                           whileTap={{ scale: 0.95 }}
//                           className="order-1 sm:order-2 sm:flex-1 px-4 py-2 sm:py-3 bg-gradient-to-r from-teal-500 to-teal-700 text-white rounded-lg hover:from-amber-600 hover:to-amber-800 transition-all font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center text-sm sm:text-base mb-2 sm:mb-0"
//                         >
//                           {isLoading ? (
//                             <>
//                               <svg className="animate-spin h-4 w-4 sm:h-5 sm:w-5 mr-2" viewBox="0 0 24 24">
//                                 <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
//                                 <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
//                               </svg>
//                               Claiming...
//                             </>
//                           ) : (
//                             'Claim Your Treasure!'
//                           )}
//                         </motion.button>
//                       </motion.div>
//                     </div>
//                   </div>
//                 </div>
//               </motion.div>
//             </motion.div>
//           </motion.div>
//         </>
//       )}
//     </AnimatePresence>
//   );
// };

// export default WelcomeBonusModal;