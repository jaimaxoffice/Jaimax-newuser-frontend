

// import React, { useState, useEffect } from 'react';
// import icon from "../../assets/Images/jaimaxcoin.png";
// import { useNavigate } from 'react-router-dom'; 
// const CoinPricePopup = ({ 
//   coinName = "JaiMax Coin", 
//   coinSymbol = "JMC",
//   oldPriceINR = "0.028",
//   newPriceINR = "0.03",
//   oldPriceUSD = "0.00032",
//   newPriceUSD = "0.00034",
//  startDate = "2025-09-30T00:00:00",
//   endDate = "2025-10-03T00:00:00",
//   onBuy = () => {},
//   onClose = () => {},
//    forceVisible = false,
//   theme = "green"
// }) => {
//   const [isVisible, setIsVisible] = useState(forceVisible); 
//   const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
//   const [showConfetti, setShowConfetti] = useState(false);
//   const [progress, setProgress] = useState(0);
//   const navigate = useNavigate();
//   const percentageIncrease = ((parseFloat(newPriceINR) - parseFloat(oldPriceINR)) / parseFloat(oldPriceINR)) * 100;
//   const endTime = new Date(`2025-10-03T00:00:00`);
//   const mainGreen = "#18a04a";
//   const colors = {
//     primary: mainGreen,
//     secondary: "#0d3e23",
//     dark: "#0a2e19",
//     gradient: {
//       primary: `linear-gradient(135deg, ${mainGreen}, #106b32)`,
//       secondary: "linear-gradient(135deg, #0d3e23, #072713)"
//     }
//   };
//   const radius = 25;
//   const circumference = 2 * Math.PI * radius;
//   const offset = circumference - (progress / 100) * circumference;
  
//   useEffect(() => {
//     const shouldShowPopup = sessionStorage.getItem('pricePoupClosed') !== 'true';
//     setIsVisible(shouldShowPopup);
//     const handleStorageChange = (e) => {
//       if (e.key === 'pricePoupClosed' && e.newValue === 'true') {
//         setIsVisible(false);
//       }
//     };
    
//     window.addEventListener('storage', handleStorageChange);
    
//     return () => {
//       window.removeEventListener('storage', handleStorageChange);
//     };
//   }, []);
//   useEffect(() => {
//   if (forceVisible) {
//     setIsVisible(true);
//   } else {
//     const shouldShowPopup = sessionStorage.getItem('pricePoupClosed') !== 'true';
//     setIsVisible(shouldShowPopup);
//   }
  
//   const handleStorageChange = (e) => {
//     if (e.key === 'pricePoupClosed' && e.newValue === 'true') {
//       setIsVisible(false);
//     }
//   };
  
//   window.addEventListener('storage', handleStorageChange);
  
//   return () => {
//     window.removeEventListener('storage', handleStorageChange);
//   };
// }, [forceVisible]); // Add forceVisible to the dependency array
//   useEffect(() => {
//     if (!isVisible) return;
    
//     const timer = setInterval(() => {
//       const difference = endTime - new Date();
      
//       if (difference > 0) {
//         setTimeLeft({
//           days: Math.floor(difference / (1000 * 60 * 60 * 24)),
//           hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
//           minutes: Math.floor((difference / 1000 / 60) % 60),
//           seconds: Math.floor((difference / 1000) % 60)
//         });
//       } else {
//         setIsVisible(false);
//         sessionStorage.setItem('pricePoupClosed', 'true');
//         clearInterval(timer);
//       }
//     }, 1000);
    
//     return () => clearInterval(timer);
//   }, [endTime, isVisible]);
  
//   useEffect(() => {
//     if (!isVisible) return;
    
//     let startValue = 0;
//     const endValue = percentageIncrease;
//     const duration = 1500;
//     const startTime = Date.now();
    
//     const animateProgress = () => {
//       const currentTime = Date.now();
//       const elapsedTime = currentTime - startTime;
      
//       if (elapsedTime < duration) {
//         const progress = elapsedTime / duration;
//         const easedProgress = 1 - Math.pow(1 - progress, 3);
//         startValue = easedProgress * endValue;
//         setProgress(startValue);
//         requestAnimationFrame(animateProgress);
//       } else {
//         setProgress(endValue);
//       }
//     };
    
//     requestAnimationFrame(animateProgress);
//   }, [isVisible, percentageIncrease]);

// const handleClose = () => {
//     setIsVisible(false);
//     sessionStorage.setItem('pricePoupClosed', 'true');
//     onClose(); // Call onClose when closing
//   };
  
//   const handleBuy = () => {
//      navigate("/dashboard");
//     // setShowConfetti(true);

//     onBuy();
//   };

//   if (!isVisible) return null;

//   return (
//     <div className="fixed inset-0 flex items-center justify-center z-50 p-3 mt-10">
//       <style>
//         {`
//           @keyframes pulse { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.05); } }
//           @keyframes confetti-fall { 
//             0% { transform: translateY(0) rotate(0); opacity: 1; } 
//             100% { transform: translateY(100vh) rotate(720deg); opacity: 0; } 
//           }
//           @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-5px); } }
//           .coin-float { animation: float 6s ease-in-out infinite; }
          
//           .confetti-piece {
//             position: absolute;
//             top: 0;
//             animation-name: confetti-fall;
//             animation-timing-function: ease-in-out;
//             animation-fill-mode: forwards;
//           }
          
//           .gradient-border {
//             position: relative;
//           }
//           .gradient-border::after {
//             content: '';
//             position: absolute;
//             inset: 0;
//             border-radius: inherit;
//             padding: 1px;
//             background: ${colors.gradient.primary};
//             -webkit-mask: 
//               linear-gradient(#fff 0 0) content-box, 
//               linear-gradient(#fff 0 0);
//             -webkit-mask-composite: xor;
//             mask-composite: exclude;
//             pointer-events: none;
//           }
//         `}
//       </style>

//       {/* Confetti effect */}
//       {showConfetti && (
//         <div className="fixed inset-0 pointer-events-none z-[100]">
//           {Array.from({ length: 100 }).map((_, i) => {
//             const size = Math.random() * 10 + 5;
//             const duration = Math.random() * 3 + 2;
//             const delay = Math.random() * 0.5;
            
//             return (
//               <div 
//                 key={i}
//                 className="confetti-piece rounded-lg"
//                 style={{
//                   left: `${Math.random() * 100}%`,
//                   width: `${size}px`,
//                   height: `${size}px`,
//                   backgroundColor: i % 3 === 0 ? mainGreen : i % 3 === 1 ? '#ffffff' : '#ffdd00',
//                   transform: `rotate(${Math.random() * 360}deg)`,
//                   animationDuration: `${duration}s`,
//                   animationDelay: `${delay}s`
//                 }}
//               />
//             );
//           })}
//         </div>
//       )}
      
//       <div 
//         className="relative rounded-xl overflow-hidden w-full max-w-xs shadow-[0_10px_25px_rgba(0,0,0,0.5)]" 
//         style={{ backgroundColor: mainGreen }}
//       >
//         {/* Close button in top-right */}
//         <button 
//           onClick={handleClose} 
//           className="absolute top-3 right-3 text-white/70 hover:text-white hover:bg-black/10 rounded-full p-1.5 z-10"
//           aria-label="Close"
//         >
//           <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//           </svg>
//         </button>
        
//         <div className="p-5">
//           {/* Main Announcement */}
//           <div className="text-center mb-4">
//             <div className="flex items-center justify-center mb-2">
//             </div>
//             <h3 className="text-lg font-bold text-white mb-1">Price Update!</h3>
//             <div className="text-white/70 text-sm">The price has officially increased</div>
//           </div>
          
//           {/* Price Comparison */}
//           <div className="bg-black/20 rounded-lg p-3 mb-4 border border-opacity-20 shadow-inner gradient-border">
//             <div className="flex justify-between items-center">
//               <div>
//                 <div className="text-white/60 text-xs mb-0.5">Previous</div>
//                 <div className="text-white font-medium text-base">{oldPriceINR} ₹</div>
//                 <div className="text-white/50 text-[10px]">${oldPriceUSD}</div>
//               </div>
              
//               <div className="flex flex-col items-center justify-center">
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: "#ffffff" }}>
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
//                 </svg>
//               </div>
              
//               <div>
//                 <div className="text-xs mb-0.5 text-white">Current</div>
//                 <div className="text-white font-bold text-base">{newPriceINR} ₹</div>
//                 <div className="text-white/50 text-[10px]">${newPriceUSD}</div>
//               </div>
//             </div>
//           </div>
          
//           {/* Message */}
//           <div className="bg-black/30 rounded-lg p-3 mb-4 border border-opacity-20 text-white shadow-inner gradient-border">
//             <p className="text-center mb-2 text-xs">
//               Don't miss the chance — the earlier you buy, the bigger your future rewards!
//             </p>
//           </div>
          
//           {/* Side by side: Icon with circular progress + Timer */}
//           <div className="flex items-center space-x-3 mb-4">
//             {/* Left: Icon with circular progress */}
//             <div className="relative w-16 h-16 flex-shrink-0 ">
//               <svg className="w-full h-full transform -rotate-90" viewBox="0 0 60 60">
//                 <defs>
//                   <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
//                     <stop offset="0%" stopColor="#ffffff" />
//                     <stop offset="100%" stopColor="#e6e6e6" />
//                   </linearGradient>
//                   <filter id="glow">
//                     <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
//                     <feMerge>
//                       <feMergeNode in="coloredBlur"/>
//                       <feMergeNode in="SourceGraphic"/>
//                     </feMerge>
//                   </filter>
//                 </defs>
//                 <circle 
//                   cx="30" 
//                   cy="30" 
//                   r={radius} 
//                   fill="transparent"
//                   stroke="rgba(255,255,255,0.2)"
//                   strokeWidth="4"
//                 />
//                 <circle 
//                   cx="30" 
//                   cy="30" 
//                   r={radius} 
//                   fill="transparent"
//                   stroke="url(#progressGradient)"
//                   strokeWidth="4"
//                   strokeLinecap="round"
//                   strokeDasharray={circumference}
//                   strokeDashoffset={offset}
//                   filter="url(#glow)"
//                 />
//               </svg>
//               <div className="absolute inset-0 flex items-center justify-center w-full h-full">
//                 <div className="w-13 h-13 rounded-full bg-white/10 flex items-center justify-center p-0.5">
//                   <img src={icon} alt={coinName} className="w-13 h-13 object-contain" />
//                 </div>
//               </div>
//             </div>
            
//             {/* Right: Timer */}
//             <div className="flex-grow">
//               <div className="grid grid-cols-4 gap-1.5">
//                 {['days', 'hours', 'minutes', 'seconds'].map((unit, idx) => (
//                   <div key={unit} className="text-center">
//                     <div className="bg-black/30 border border-opacity-30 rounded-lg p-1.5 shadow-inner gradient-border">
//                       <div className="text-white text-sm font-mono font-bold">
//                         {unit === 'days' ? timeLeft[unit] : 
//                           timeLeft[unit].toString().padStart(2, '0')}
//                       </div>
//                     </div>
//                     <div className="text-white/60 text-[9px] mt-1">
//                       {unit === 'days' ? 'DAYS' : unit === 'hours' ? 'HRS' : unit === 'minutes' ? 'MIN' : 'SEC'}
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
          
//           {/* Action Button */}
//           <button 
//             className="w-full py-3 px-3 rounded-lg text-base font-bold flex items-center justify-center shadow-lg transition-all duration-200 hover:shadow-xl" 
//             style={{ background: "linear-gradient(135deg, #ffffff, #e6e6e6)" }}
//             onClick={handleBuy}
//           >
//             <span className="text-[#18a04a] text-xs">Secure your coins today and be part of the growth.</span>
//           </button>
//         </div>
//       </div>
      
//       {/* Semi-transparent backdrop */}
//       <div className="fixed inset-0 bg-black/75 backdrop-blur-sm -z-10" onClick={handleClose} />
//     </div>
//   );
// };

// export default CoinPricePopup;

import React, { useState, useEffect } from 'react';
import icon from "../../assets/Images/jaimaxcoin.png";
import { useNavigate } from 'react-router-dom'; 

const CoinPricePopup = ({ 
  coinName = "JaiMax Coin", 
  coinSymbol = "JMC",
  oldPriceINR = "0.028",
  newPriceINR = "0.03",
  oldPriceUSD = "0.00032",
  newPriceUSD = "0.00034",
  startDate = "2025-09-30T00:00:00", // Corrected to Sept 30
  endDate = "2025-10-03T00:00:00",
  onBuy = () => {},
  onClose = () => {},
  forceVisible = false,
  theme = "green"
}) => {
  const [isVisible, setIsVisible] = useState(forceVisible); 
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [showConfetti, setShowConfetti] = useState(false);
  const [progress, setProgress] = useState(100); // Start at 100% (full time remaining)
  const navigate = useNavigate();
  
  const percentageIncrease = ((parseFloat(newPriceINR) - parseFloat(oldPriceINR)) / parseFloat(oldPriceINR)) * 100;
  const startTime = new Date(startDate);
  const endTime = new Date(endDate);
  const mainGreen = "#18a04a";
  
  const colors = {
    primary: mainGreen,
    secondary: "#0d3e23",
    dark: "#0a2e19",
    gradient: {
      primary: `linear-gradient(135deg, ${mainGreen}, #106b32)`,
      secondary: "linear-gradient(135deg, #0d3e23, #072713)"
    }
  };
  
  const radius = 25;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  // Check if popup should be visible based on current date and storage
  useEffect(() => {
    const now = new Date();
    const shouldBeVisible = (
      (now >= startTime && now <= endTime) && // Within date range
      sessionStorage.getItem('pricePoupClosed') !== 'true' // Not closed by user
    ) || forceVisible; // Or forced visible by prop
    
    setIsVisible(shouldBeVisible);
    
    const handleStorageChange = (e) => {
      if (e.key === 'pricePoupClosed' && e.newValue === 'true') {
        setIsVisible(false);
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [forceVisible, startTime, endTime]);

  // Timer and progress bar update
  useEffect(() => {
    if (!isVisible) return;
    
    const timer = setInterval(() => {
      const now = new Date();
      const totalDuration = endTime - startTime; // Total duration in ms
      const timeRemaining = endTime - now; // Time remaining until end
      
      // Calculate percentage of time remaining (0-100)
      const progressValue = Math.max(0, Math.min(100, (timeRemaining / totalDuration) * 100));
      setProgress(progressValue);
      
      if (timeRemaining > 0) {
        setTimeLeft({
          days: Math.floor(timeRemaining / (1000 * 60 * 60 * 24)),
          hours: Math.floor((timeRemaining / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((timeRemaining / 1000 / 60) % 60),
          seconds: Math.floor((timeRemaining / 1000) % 60)
        });
      } else {
        // Time has expired
        setIsVisible(false);
        sessionStorage.setItem('pricePoupClosed', 'true');
        clearInterval(timer);
      }
    }, 1000);
    
    return () => clearInterval(timer);
  }, [isVisible, startTime, endTime]);

  const handleClose = () => {
    setIsVisible(false);
    sessionStorage.setItem('pricePoupClosed', 'true');
    onClose(); 
  };
  
  const handleBuy = () => {
    navigate("/dashboard");
    setTimeout(() => {
      handleClose();
    }, 300); 
    onBuy();
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-3 mt-10">
      <style>
        {`
          @keyframes pulse { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.05); } }
          @keyframes confetti-fall { 
            0% { transform: translateY(0) rotate(0); opacity: 1; } 
            100% { transform: translateY(100vh) rotate(720deg); opacity: 0; } 
          }
          @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-5px); } }
          .coin-float { animation: float 6s ease-in-out infinite; }
          
          .confetti-piece {
            position: absolute;
            top: 0;
            animation-name: confetti-fall;
            animation-timing-function: ease-in-out;
            animation-fill-mode: forwards;
          }
          
          .gradient-border {
            position: relative;
          }
          .gradient-border::after {
            content: '';
            position: absolute;
            inset: 0;
            border-radius: inherit;
            padding: 1px;
            background: ${colors.gradient.primary};
            -webkit-mask: 
              linear-gradient(#fff 0 0) content-box, 
              linear-gradient(#fff 0 0);
            -webkit-mask-composite: xor;
            mask-composite: exclude;
            pointer-events: none;
          }
        `}
      </style>
      
      <div 
        className="relative rounded-xl overflow-hidden w-full max-w-xs shadow-[0_10px_25px_rgba(0,0,0,0.5)]" 
        style={{ backgroundColor: mainGreen }}
      >
        {/* Close button in top-right */}
        <button 
          onClick={handleClose} 
          className="absolute top-3 right-3 text-white/70 hover:text-white hover:bg-black/10 rounded-full p-1.5 z-10"
          aria-label="Close"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        
        <div className="p-5">
          {/* Main Announcement */}
          <div className="text-center mb-4">
            <div className="flex items-center justify-center mb-2">
            </div>
            <h3 className="text-lg font-bold text-white mb-1">Price Update!</h3>
            <div className="text-white/70 text-sm">The price is about to increase</div>
          </div>
          
          {/* Price Comparison */}
          <div className="bg-black/20 rounded-lg p-3 mb-4 border border-opacity-20 shadow-inner gradient-border">
            <div className="flex justify-between items-center">
              <div>
                <div className="text-white/60 text-xs mb-0.5">Previous</div>
                <div className="text-white font-medium text-base">{oldPriceINR} ₹</div>
                <div className="text-white/50 text-[10px]">${oldPriceUSD}</div>
              </div>
              
              <div className="flex flex-col items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: "#ffffff" }}>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              
              <div>
                <div className="text-xs mb-0.5 text-white">Current</div>
                <div className="text-white font-bold text-base">{newPriceINR} ₹</div>
                <div className="text-white/50 text-[10px]">${newPriceUSD}</div>
              </div>
            </div>
          </div>
          
          {/* Message */}
          <div className="bg-black/30 rounded-lg p-3 mb-4 border border-opacity-20 text-white shadow-inner gradient-border">
            <p className="text-center mb-2 text-xs">
              Don't miss the chance — the earlier you buy, the bigger your future rewards!
            </p>
          </div>
          
          {/* Side by side: Icon with circular progress + Timer */}
          <div className="flex items-center space-x-3 mb-4">
            {/* Left: Icon with circular progress */}
            <div className="relative w-16 h-16 flex-shrink-0 ">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 60 60">
                <defs>
                  <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#ffffff" />
                    <stop offset="100%" stopColor="#e6e6e6" />
                  </linearGradient>
                  <filter id="glow">
                    <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                    <feMerge>
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                </defs>
                <circle 
                  cx="30" 
                  cy="30" 
                  r={radius} 
                  fill="transparent"
                  stroke="rgba(255,255,255,0.2)"
                  strokeWidth="4"
                />
                <circle 
                  cx="30" 
                  cy="30" 
                  r={radius} 
                  fill="transparent"
                  stroke="url(#progressGradient)"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeDasharray={circumference}
                  strokeDashoffset={offset}
                  filter="url(#glow)"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center w-full h-full">
                <div className="w-13 h-13 rounded-full bg-white/10 flex items-center justify-center p-0.5">
                  <img src={icon} alt={coinName} className="w-13 h-13 object-contain" />
                </div>
              </div>
            </div>
            
            {/* Right: Timer */}
            <div className="flex-grow">
              <div className="grid grid-cols-4 gap-1.5">
                {['days', 'hours', 'minutes', 'seconds'].map((unit, idx) => (
                  <div key={unit} className="text-center">
                    <div className="bg-black/30 border border-opacity-30 rounded-lg p-1.5 shadow-inner gradient-border">
                      <div className="text-white text-sm font-mono font-bold">
                        {unit === 'days' ? timeLeft[unit] : 
                          timeLeft[unit].toString().padStart(2, '0')}
                      </div>
                    </div>
                    <div className="text-white/60 text-[9px] mt-1">
                      {unit === 'days' ? 'DAYS' : unit === 'hours' ? 'HRS' : unit === 'minutes' ? 'MIN' : 'SEC'}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Action Button */}
          <button 
            className="w-[90%] ml-4 py-2 px-3 rounded-lg text-base font-bold flex items-center justify-center shadow-lg transition-all duration-200 hover:shadow-xl" 
            style={{ background: "linear-gradient(135deg, #ffffff, #e6e6e6)" }}
            onClick={handleBuy}
          >
            <span className="text-[#18a04a] text-xs">Secure your coins today and be part of the growth.</span>
          </button>
        </div>
      </div>
      
      {/* Semi-transparent backdrop */}
      <div className="fixed inset-0 bg-black/75 backdrop-blur-sm -z-10" onClick={handleClose} />
    </div>
  );
};

export default CoinPricePopup;