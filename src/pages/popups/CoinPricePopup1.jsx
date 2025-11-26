
// // import { useState, useEffect } from "react";
// // import mobilecoin from "../../assets/mobilecoin.webp";
// // import desktopcoin from "../../assets/coinprice.jpg";

// // const CountdownTimer = () => {
// //   const [timeLeft, setTimeLeft] = useState({
// //     days: 0,
// //     hours: 0,
// //     minutes: 0,
// //     seconds: 0,
// //   });
// //   const [isVisible, setIsVisible] = useState(true);

// //   useEffect(() => {
// //     const startDate = new Date("2025-11-24T00:00:00").getTime();
// //     const endDate = new Date("2025-12-01T00:00:00").getTime();

// //     const timer = setInterval(() => {
// //       const now = new Date().getTime();

// //       if (now < startDate) {
// //         setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
// //         return;
// //       }

// //       const distance = endDate - now;

// //       if (distance < 0) {
// //         clearInterval(timer);
// //         setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
// //       } else {
// //         setTimeLeft({
// //           days: Math.floor(distance / (1000 * 60 * 60 * 24)),
// //           hours: Math.floor(
// //             (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
// //           ),
// //           minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
// //           seconds: Math.floor((distance % (1000 * 60)) / 1000),
// //         });
// //       }
// //     }, 1000);

// //     return () => clearInterval(timer);
// //   }, []);

// //   // Hide entire component when closed
// //   if (!isVisible) return null;

// //   return (
// //     <div className="relative w-full">
// //       {/* Close Button */}
// //       <button
// //         onClick={() => setIsVisible(false)}
// //         className="absolute top-2 right-2 md:top-2 md:right-4 z-20 bg-black/50 hover:bg-black/70 text-white rounded-full w-6 h-6 md:w-8 md:h-8 flex items-center justify-center transition-all duration-200 hover:scale-110"
// //         aria-label="Close"
// //       >
// //         <svg
// //           xmlns="http://www.w3.org/2000/svg"
// //           className="h-5 w-5 md:h-6 md:w-6"
// //           fill="none"
// //           viewBox="0 0 24 24"
// //           stroke="currentColor"
// //           strokeWidth={2}
// //         >
// //           <path
// //             strokeLinecap="round"
// //             strokeLinejoin="round"
// //             d="M6 18L18 6M6 6l12 12"
// //           />
// //         </svg>
// //       </button>

// //       {/* Countdown Timer Overlay */}
// // <div className="absolute top-[60%] md:top-[50%] left-[40%] md:left-[20%] transform -translate-y-1/2 z-10">
// //   <div className="bg-black/70 backdrop-blur-sm rounded-lg p-4 md:p-6">
// //     <h3 className="text-white text-lg md:text-sm font-bold mb-3 md:mb-4 text-center">
// //       Time Remaining
// //     </h3>
// //     <div className="flex gap-2 md:gap-4">
// //       <div className="text-center">
// //         <div className="bg-white/20 rounded-lg p-2 md:p-3 min-w-[50px] md:min-w-[60px]">
// //           <span className="text-2xl md:text-sm font-semibold text-white">
// //             {String(timeLeft.days).padStart(2, "0")}
// //           </span>
// //         </div>
// //         <p className="text-white text-xs md:text-xs mt-1 md:mt-2">Days</p>
// //       </div>
// //       <div className="text-center">
// //         <div className="bg-white/20 rounded-lg p-2 md:p-3 min-w-[50px] md:min-w-[60px]">
// //           <span className="text-2xl md:text-sm font-semibold text-white">
// //             {String(timeLeft.hours).padStart(2, "0")}
// //           </span>
// //         </div>
// //         <p className="text-white text-xs md:text-xs mt-1 md:mt-2">
// //           Hours
// //         </p>
// //       </div>
// //       <div className="text-center">
// //         <div className="bg-white/20 rounded-lg p-2 md:p-3 min-w-[50px] md:min-w-[60px]">
// //           <span className="text-2xl md:text-sm font-semibold text-white">
// //             {String(timeLeft.minutes).padStart(2, "0")}
// //           </span>
// //         </div>
// //         <p className="text-white text-xs md:text-xs mt-1 md:mt-2">
// //           Minutes
// //         </p>
// //       </div>
// //       <div className="text-center">
// //         <div className="bg-white/20 rounded-lg p-2 md:p-3 min-w-[50px] md:min-w-[60px]">
// //           <span className="text-2xl md:text-sm font-semibold text-white">
// //             {String(timeLeft.seconds).padStart(2, "0")}
// //           </span>
// //         </div>
// //         <p className="text-white text-xs md:text-xs mt-1 md:mt-2">
// //           Seconds
// //         </p>
// //       </div>
// //     </div>
// //   </div>
// // </div>

// //       {/* Images */}
// //       <div className="w-full overflow-hidden">
// //         <img
// //           src={desktopcoin}
// //           alt="Desktop Coin"
// //           className="hidden md:block w-full h-auto object-contain rounded-xl"
// //         />
// //         <img
// //           src={mobilecoin}
// //           alt="Mobile Coin"
// //           className="block md:hidden w-full h-auto object-contain"
// //         />
// //       </div>
// //     </div>
// //   );
// // };

// // export default CountdownTimer;



// import { useState, useEffect } from "react";
// import mobilecoin from "../../assets/mobilecoin.webp";
// import desktopcoin from "../../assets/coinprice.jpg";

// const CountdownTimer = () => {
//   const [timeLeft, setTimeLeft] = useState({
//     days: 0,
//     hours: 0,
//     minutes: 0,
//     seconds: 0,
//   });
//   const [isVisible, setIsVisible] = useState(true);

//   useEffect(() => {
//     const startDate = new Date("2025-11-24T00:00:00").getTime();
//     const endDate = new Date("2025-12-01T00:00:00").getTime();

//     const timer = setInterval(() => {
//       const now = new Date().getTime();

//       if (now < startDate) {
//         setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
//         return;
//       }

//       const distance = endDate - now;

//       if (distance < 0) {
//         clearInterval(timer);
//         setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
//       } else {
//         setTimeLeft({
//           days: Math.floor(distance / (1000 * 60 * 60 * 24)),
//           hours: Math.floor(
//             (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
//           ),
//           minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
//           seconds: Math.floor((distance % (1000 * 60)) / 1000),
//         });
//       }
//     }, 1000);

//     return () => clearInterval(timer);
//   }, []);

//   // Hide entire component when closed
//   if (!isVisible) return null;

//   return (
//     <div className="relative w-full">
//       <style jsx>{`
//         @keyframes fadeInUp {
//           from {
//             opacity: 0;
//             transform: translate(-50%, -40%) translateY(20px);
//           }
//           to {
//             opacity: 1;
//             transform: translate(-50%, -50%) translateY(0);
//           }
//         }

//         @keyframes bounceSubtle {
//           0%, 100% {
//             transform: translateY(0);
//           }
//           50% {
//             transform: translateY(-5px);
//           }
//         }

//         .animate-fade-in-up {
//           animation: fadeInUp 0.8s ease-out;
//         }

//         .animate-bounce-subtle {
//           animation: bounceSubtle 2s ease-in-out infinite;
//         }

//         .animation-delay-100 {
//           animation-delay: 0.1s;
//         }

//         .animation-delay-200 {
//           animation-delay: 0.2s;
//         }

//         .animation-delay-300 {
//           animation-delay: 0.3s;
//         }
//       `}</style>
//       {/* Close Button */}
//       <button
//         onClick={() => setIsVisible(false)}
//         className="absolute top-2 right-2 md:top-2 md:right-4 z-20 bg-black/50 hover:bg-black/70 text-white rounded-full w-6 h-6 md:w-8 md:h-8 flex items-center justify-center transition-all duration-200 hover:scale-110"
//         aria-label="Close"
//       >
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           className="h-4 w-4 md:h-6 md:w-6"
//           fill="none"
//           viewBox="0 0 24 24"
//           stroke="currentColor"
//           strokeWidth={2}
//         >
//           <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             d="M6 18L18 6M6 6l12 12"
//           />
//         </svg>
//       </button>

//       {/* Countdown Timer Overlay */}
// <div className="
//   absolute 
//   top-[80%]       min-[640px]:top-[25%]      md:top-[50%]
//   left-[23%]      min-[640px]:left-[28%]     md:left-[30%]
//   -translate-x-1/2 
//   -translate-y-1/2 
//   z-10 mb-2
// ">
//   <div className="rounded-lg p-3 sm:p-4 md:p-6  hover:bg-black/40 transition-all duration-300">
//     <h6 className="hidden sm:block text-white text-[8px] sm:text-xs md:text-sm font-bold mb-2 md:mb-4 text-center animate-pulse">
//       Time Remaining
//     </h6>

//     <div className="flex gap-1.5 md:gap-4">
//       <div className="text-center animate-bounce-subtle">
//         <div className="bg-white/20 rounded-lg p-1.5 sm:md:p-0 md:p-3 min-w-[20px] sm:min-w-[20px] md:min-w-[60px] hover:bg-white/30 transition-all duration-300 hover:scale-110">
//           <span className="text-[9px] md:text-sm sm:text-[5px] font-semibold text-white block">
//             {String(timeLeft.days).padStart(2, "0")}
//           </span>
//         </div>
//         <p className="text-white text-[6px] sm:text-[5px] md:text-xs mt-1 md:mt-2">Days</p>
//       </div>
      
//       <div className="text-center animate-bounce-subtle animation-delay-100">
//         <div className="bg-white/20 rounded-lg p-1.5 md:p-3 sm:md:p-0 min-w-[20px] sm:min-w-[20px] md:min-w-[60px] hover:bg-white/30 transition-all duration-300 hover:scale-110">
//           <span className="text-[9px] md:text-sm sm:text-[5px] font-semibold text-white block">
//             {String(timeLeft.hours).padStart(2, "0")}
//           </span>
//         </div>
//         <p className="text-white text-[6px] sm:text-[5px] md:text-xs mt-1 md:mt-2">
//           Hours
//         </p>
//       </div>
      
//       <div className="text-center animate-bounce-subtle animation-delay-200">
//         <div className="bg-white/20 rounded-lg p-1.5 md:p-3 sm:md:p-0 min-w-[20px] sm:min-w-[20px] md:min-w-[60px] hover:bg-white/30 transition-all duration-300 hover:scale-110">
//           <span className="text-[9px] md:text-sm sm:text-[5px] font-semibold text-white block">
//             {String(timeLeft.minutes).padStart(2, "0")}
//           </span>
//         </div>
//         <p className="text-white text-[6px] sm:text-[5px] md:text-xs mt-1 md:mt-2">
//           Minutes
//         </p>
//       </div>
      
//       <div className="text-center animate-bounce-subtle animation-delay-300">
//         <div className="bg-white/20 rounded-lg p-1.5 md:p-3 sm:md:p-0 min-w-[20px] sm:min-w-[20px] md:min-w-[60px] hover:bg-white/30 transition-all duration-300 hover:scale-110">
//           <span className="text-[9px] md:text-sm sm:text-xs font-semibold text-white block animate-pulse">
//             {String(timeLeft.seconds).padStart(2, "0")}
//           </span>
//         </div>
//         <p className="text-white text-[6px] sm:text-xs md:text-xs mt-1 md:mt-2">
//           Seconds
//         </p>
//       </div>
//     </div>
//   </div>
// </div>

//       {/* Images */}
//       <div className="w-full overflow-hidden">
//         <img
//           src={desktopcoin}
//           alt="Desktop Coin"
//           className="hidden md:block object-contain rounded-xl"
//         />
//         <img
//           src={mobilecoin}
//           alt="Mobile Coin"
//           className="block md:hidden  object-contain rounded-xl"
//         />
//       </div>
//     </div>
//   );
// };

// export default CountdownTimer;



// import { useState, useEffect } from "react";
// import mobilecoin from "../../assets/mobilecoin.webp";
// import desktopcoin from "../../assets/coinprice.jpg";

// const CountdownTimer = () => {
//   const [timeLeft, setTimeLeft] = useState({
//     days: 0,
//     hours: 0,
//     minutes: 0,
//     seconds: 0,
//   });
//   const [isVisible, setIsVisible] = useState(true);

//   useEffect(() => {
//     const startDate = new Date("2025-11-25T00:00:00").getTime();
//     const endDate = new Date("2025-12-01T00:00:00").getTime();

//     const timer = setInterval(() => {
//       const now = new Date().getTime();

//       if (now < startDate) {
//         setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
//         return;
//       }

//       const distance = endDate - now;

//       if (distance < 0) {
//         clearInterval(timer);
//         setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
//       } else {
//         setTimeLeft({
//           days: Math.floor(distance / (1000 * 60 * 60 * 24)),
//           hours: Math.floor(
//             (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
//           ),
//           minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
//           seconds: Math.floor((distance % (1000 * 60)) / 1000),
//         });
//       }
//     }, 1000);

//     return () => clearInterval(timer);
//   }, []);

//   if (!isVisible) return null;

//   return (
//     <>
//       <style>
//         {`
//           @keyframes fadeInUp {
//             from {
//               opacity: 0;
//               transform: translate(-50%, -40%) translateY(20px);
//             }
//             to {
//               opacity: 1;
//               transform: translate(-50%, -50%) translateY(0);
//             }
//           }

//           @keyframes flip {
//             0% {
//               transform: rotateX(0deg);
//             }
//             50% {
//               transform: rotateX(90deg);
//             }
//             100% {
//               transform: rotateX(0deg);
//             }
//           }

//           @keyframes scaleUp {
//             0%, 100% {
//               transform: scale(1);
//             }
//             50% {
//               transform: scale(1.2);
//             }
//           }

//           @keyframes glow {
//             0%, 100% {
//               box-shadow: 0 0 5px rgba(255, 255, 255, 0.3);
//             }
//             50% {
//               box-shadow: 0 0 20px rgba(255, 255, 255, 0.8);
//             }
//           }

//           .animate-fade-in-up {
//             animation: fadeInUp 0.8s ease-out;
//           }

//           .animate-flip {
//             animation: flip 0.6s ease-in-out;
//           }

//           .animate-scale {
//             animation: scaleUp 0.3s ease-in-out;
//           }

//           .animate-glow {
//             animation: glow 2s ease-in-out infinite;
//           }
//         `}
//       </style>

//       <div className="relative w-full ">
//         {/* Close Button */}
//         <button
//           onClick={() => setIsVisible(false)}
//           className="absolute top-2 right-2 md:top-2 md:right-4 z-20 bg-black/50 hover:bg-black/70 text-white rounded-full w-6 h-6 md:w-8 md:h-8 flex items-center justify-center transition-all duration-200 hover:scale-110"
//           aria-label="Close"
//         >
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             className="h-4 w-4 md:h-6 md:w-6"
//             fill="none"
//             viewBox="0 0 24 24"
//             stroke="currentColor"
//             strokeWidth={2}
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               d="M6 18L18 6M6 6l12 12"
//             />
//           </svg>
//         </button>

//         {/* Countdown Timer Overlay */}
//         <div className="
//           absolute 
//           top-[80%]       min-[640px]:top-[25%]      md:top-[50%]
//           left-[23%]      min-[640px]:left-[28%]     md:left-[30%]
//           -translate-x-1/2 
//           -translate-y-1/2 
//           z-10 mb-2
//         ">
//           <div className="rounded-lg p-3 sm:p-4 md:p-6   transition-all duration-300">
//             <h6 className="hidden sm:block text-white text-[8px] sm:text-xs md:text-sm font-bold mb-2 md:mb-4 text-center">
//               Time Remaining
//             </h6>

//             <div className="flex gap-1.5 md:gap-4">
//               <div className="text-center">
//                 <div className="bg-white/20 rounded-lg p-1.5 sm:md:p-0 md:p-3 min-w-[20px] sm:max-w-[20px] md:min-w-[60px] hover:bg-white/30 transition-all duration-300 hover:scale-110">
//                   <span 
//                     key={timeLeft.days}
//                     className="text-[9px] md:text-sm sm:text-[5px] font-semibold text-white block animate-flip"
//                   >
//                     {String(timeLeft.days).padStart(2, "0")}
//                   </span>
//                 </div>
//                 <p className="text-white text-[6px] sm:text-[5px] md:text-xs mt-1 md:mt-2">Days</p>
//               </div>
              
//               <div className="text-center">
//                 <div className="bg-white/20 rounded-lg p-1.5 md:p-3 sm:md:p-0 min-w-[20px] sm:min-w-[20px] md:min-w-[60px] hover:bg-white/30 transition-all duration-300 hover:scale-110">
//                   <span 
//                     key={timeLeft.hours}
//                     className="text-[9px] md:text-sm sm:text-[5px] font-semibold text-white block animate-flip"
//                   >
//                     {String(timeLeft.hours).padStart(2, "0")}
//                   </span>
//                 </div>
//                 <p className="text-white text-[6px] sm:text-[5px] md:text-xs mt-1 md:mt-2">
//                   Hours
//                 </p>
//               </div>
              
//               <div className="text-center">
//                 <div className="bg-white/20 rounded-lg p-1.5 md:p-3 sm:md:p-0 min-w-[20px] sm:min-w-[20px] md:min-w-[60px] hover:bg-white/30 transition-all duration-300 hover:scale-110">
//                   <span 
//                     key={timeLeft.minutes}
//                     className="text-[9px] md:text-sm sm:text-[5px] font-semibold text-white block animate-flip"
//                   >
//                     {String(timeLeft.minutes).padStart(2, "0")}
//                   </span>
//                 </div>
//                 <p className="text-white text-[6px] sm:text-[5px] md:text-xs mt-1 md:mt-2">
//                   Minutes
//                 </p>
//               </div>
              
//               <div className="text-center">
//                 <div className="bg-white/20 rounded-lg p-1.5 md:p-3 sm:md:p-0 min-w-[20px] sm:min-w-[20px] md:min-w-[60px] hover:bg-white/30 transition-all duration-300 hover:scale-110 animate-glow">
//                   <span 
//                     key={timeLeft.seconds}
//                     className="text-[9px] md:text-sm sm:text-xs font-semibold text-white block animate-scale"
//                   >
//                     {String(timeLeft.seconds).padStart(2, "0")}
//                   </span>
//                 </div>
//                 <p className="text-white text-[6px] sm:text-xs md:text-xs mt-1 md:mt-2">
//                   Seconds
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Images */}
//         <div className="w-full overflow-hidden">
//           <img
//             src={desktopcoin}
//             alt="Desktop Coin"
//             className="hidden md:block w-full h-auto object-contain rounded-xl"
//           />
//           <img
//             src={mobilecoin}
//             alt="Mobile Coin"
//             className="block md:hidden w-full h-auto object-contain "
//           />
//         </div>
//       </div>
//     </>
//   );
// };

// export default CountdownTimer;



import { useState, useEffect } from "react";
import mobilecoin from "../../assets/mobilecoin.webp";
import desktopcoin from "../../assets/desktopcoinprice.webp";

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isVisible, setIsVisible] = useState(true);
  const [isInTimeRange, setIsInTimeRange] = useState(false);

  useEffect(() => {
    const startDate = new Date("2025-11-26T00:00:00").getTime();
    const endDate = new Date("2025-12-01T00:00:00").getTime();

    const timer = setInterval(() => {
      const now = new Date().getTime();

      // Check if before start date or after end date
      if (now < startDate || now > endDate) {
        setIsInTimeRange(false);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      setIsInTimeRange(true);

      const distance = endDate - now;

      if (distance < 0) {
        clearInterval(timer);
        setIsInTimeRange(false);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor(
            (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          ),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Hide component if closed manually OR outside time range
  if (!isVisible || !isInTimeRange) return null;

  return (
    <>
      <style>
        {`
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translate(-50%, -40%) translateY(20px);
            }
            to {
              opacity: 1;
              transform: translate(-50%, -50%) translateY(0);
            }
          }

          @keyframes flip {
            0% {
              transform: rotateX(0deg);
            }
            50% {
              transform: rotateX(90deg);
            }
            100% {
              transform: rotateX(0deg);
            }
          }

          @keyframes scaleUp {
            0%, 100% {
              transform: scale(1);
            }
            50% {
              transform: scale(1.2);
            }
          }

          @keyframes glow {
            0%, 100% {
              box-shadow: 0 0 5px rgba(255, 255, 255, 0.3);
            }
            50% {
              box-shadow: 0 0 20px rgba(106, 103, 103, 0.8);
            }
          }

          .animate-fade-in-up {
            animation: fadeInUp 0.8s ease-out;
          }

          .animate-flip {
            animation: flip 0.6s ease-in-out;
          }

          .animate-scale {
            animation: scaleUp 0.9s ease-in-out;
          }

          .animate-glow {
            animation: glow 2s ease-in-out infinite;
          }
            @keyframes pulseExplosion {
  0% {
    transform: scale(1);
    box-shadow: 0 0 5px rgba(255,255,255,0.5);
  }
  50% {
    transform: scale(1.25);
    box-shadow: 0 0 30px rgba(101, 97, 97, 1);
  }
  100% {
    transform: scale(1);
    box-shadow: 0 0 5px rgba(255,255,255,0.5);
  }
}

@keyframes neonFlicker {
  0%, 19%, 21%, 23%, 25%, 54%, 100% {
    opacity: 1;
    text-shadow:
      0 0 5px #fff,
      0 0 10px #0ff,
      0 0 20px #0ff;
  }
  20%, 24%, 55% {
    opacity: 0.4;
    text-shadow: none;
  }
}

@keyframes shockwaveBounce {
  0% {
    transform: scale(1);
  }
  30% {
    transform: scale(1.4);
  }
  50% {
    transform: scale(0.9);
  }
  70% {
    transform: scale(1.15);
  }
  100% {
    transform: scale(1);
  }
}

.animate-pulse-explosion {
  animation: pulseExplosion 1.3s ease-in-out infinite;
}

.animate-neon-flicker {
  animation: neonFlicker 2.5s linear infinite;
}

.animate-shockwave {
  animation: shockwaveBounce 0.9s ease-in-out;
}

        `}
      </style>

      <div className="relative w-full ">
        {/* Close Button */}
        <button
          onClick={() => setIsVisible(false)}
          className="absolute top-2 right-2 md:top-2 md:right-4 z-20 bg-black/50 hover:bg-black/70 text-white rounded-full w-6 h-6 md:w-8 md:h-8 flex items-center justify-center transition-all duration-200 hover:scale-110"
          aria-label="Close"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 md:h-6 md:w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Countdown Timer Overlay */}
        <div className="
          absolute 
          top-[80%]       min-[640px]:top-[25%]      md:top-[50%]
          left-[23%]      min-[640px]:left-[28%]     md:left-[30%]
          -translate-x-1/2 
          -translate-y-1/2 
          z-10 mb-2
        ">
          <div className="rounded-lg p-3 sm:p-4 md:p-6   transition-all duration-300">
            <h6 className="hidden sm:block text-white text-[8px] sm:text-xs md:text-sm font-bold mb-2 md:mb-4 text-center">
              Time Remaining
            </h6>

            <div className="flex gap-1.5 md:gap-4">
              <div className="text-center">
                <div className="bg-white/20 rounded-[5px] p-1.5 sm:md:p-0 md:p-3 min-w-[20px] sm:max-w-[20px] md:min-w-[60px] hover:bg-white/30 transition-all duration-300 hover:scale-110">
                  <span 
                    key={timeLeft.days}
                    className="text-[9px] md:text-sm sm:text-[5px] font-semibold text-white block animate-flip"
                  >
                    {String(timeLeft.days).padStart(2, "0")}
                  </span>
                </div>
                <p className="text-white text-[6px] sm:text-[5px] md:text-xs mt-1 md:mt-2">Days</p>
              </div>
              
              <div className="text-center">
                <div className="bg-white/20 rounded-[5px] p-1.5 md:p-3 sm:md:p-0 min-w-[20px] sm:min-w-[20px] md:min-w-[60px] hover:bg-white/30 transition-all duration-300 hover:scale-110">
                  <span 
                    key={timeLeft.hours}
                    className="text-[9px] md:text-sm sm:text-[5px] font-semibold text-white block animate-flip"
                  >
                    {String(timeLeft.hours).padStart(2, "0")}
                  </span>
                </div>
                <p className="text-white text-[6px] sm:text-[5px] md:text-xs mt-1 md:mt-2">
                  Hours
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-white/20 rounded-[5px] p-1.5 md:p-3 sm:md:p-0 min-w-[20px] sm:min-w-[20px] md:min-w-[60px] hover:bg-white/30 transition-all duration-300 hover:scale-110">
                  <span 
                    key={timeLeft.minutes}
                    className="text-[9px] md:text-sm sm:text-[5px] font-semibold text-white block animate-flip"
                  >
                    {String(timeLeft.minutes).padStart(2, "0")}
                  </span>
                </div>
                <p className="text-white text-[6px] sm:text-[5px] md:text-xs mt-1 md:mt-2">
                  Minutes
                </p>
              </div>
              
<div className="text-center">
  <div className="bg-white/80 rounded-[5px] p-1.5 md:p-3 sm:md:p-0 
                  min-w-[20px] sm:min-w-[20px] md:min-w-[60px] 
                  hover:bg-gray-100 transition-all duration-300 hover:scale-110 
                  animate-glow animate-pulse-explosion">
    <span 
      key={timeLeft.seconds}
      className="text-[9px] md:text-sm sm:text-xs font-semibold text-black block 
                 animate-scale animate-shockwave animate-neon-flicker"
    >
      {String(timeLeft.seconds).padStart(2, "0")}
    </span>
  </div>

  <p className="text-white text-[6px] sm:text-xs md:text-xs mt-1 md:mt-2">
    Seconds
  </p>
</div>


            </div>
          </div>
        </div>

        {/* Images */}
        <div className="w-full overflow-hidden">
          <img
            src={desktopcoin}
            alt="Desktop Coin"
            className="hidden md:block w-full h-auto object-contain "
          />
          <img
            src={mobilecoin}
            alt="Mobile Coin"
            className="block md:hidden w-full h-auto object-contain"
          />
        </div>
      </div>
    </>
  );
};

export default CountdownTimer;