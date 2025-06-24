


// import React, { useRef, useState, useEffect, useCallback } from "react";
// import { ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';
// import jicon from "../../../../../assets/jcoin.png"

// import assets from "../../../../../assets/assets";

// const slabsData = [
//   {
//     id: 1,
//     title: "1st ICO Slab",
//     status: "Live",
//     statusColor: "bg-green-500",
//     type: "active",
//     prices: { usd: 0.00024, inr: 0.02 },
//     soldPercentage: 20.50,
//     totalCoins: "50000000000",
//     description: "Invest in Jaimax 1st ICO slab for your financial future."
//   },
//   {
//     id: 2,
//     title: "2nd ICO Slab",
//     status: "Upcoming",
//     statusColor: "bg-yellow-500",
//     type: "upcoming",
//     prices: { usd: 0.00059, inr: 0.05 },
//     totalCoins: "20000000000"
//   },
//   {
//     id: 3,
//     title: "3rd ICO Slab",
//     status: "Upcoming",
//     statusColor: "bg-yellow-500",
//     type: "upcoming",
//     prices: { usd: 0.00710, inr: 0.60000 },
//     totalCoins: "25000000000"
//   },
//   {
//     id: 4,
//     title: "4th ICO Slab",
//     status: "Upcoming",
//     statusColor: "bg-yellow-500",
//     type: "upcoming",
//     prices: { usd: 0.01893, inr: 1.60000 },
//     totalCoins: "30000000000"
//   },
//   {
//     id: 5,
//     title: "5th ICO Slab",
//     status: "Upcoming",
//     statusColor: "bg-yellow-500",
//     type: "upcoming",
//     prices: { usd: 0.00189, inr: 0.159 },
//     totalCoins: "23000000000"
//   }
// ];

// const ActiveSlabContent = ({ slab, isActive }) => {
//   const [paymentMethod, setPaymentMethod] = useState('INR');
//   const [amount, setAmount] = useState('');

//   const handleProceedToPay = () => {
//     if (!amount) {
//       alert('Please enter an amount');
//       return;
//     }
//     alert(`Proceeding to pay ${amount} ${paymentMethod} for ${slab.title}`);
//   };

//   return (
//     <div className={`bg-white rounded-lg p-4 w-full w-full max-w-7xl text-gray-800 shadow-lg border border-gray-200 transform transition-all duration-500 min-h-[350px] ${
//       isActive ? 'scale-100 opacity-100' : 'scale-95 opacity-80'
//     }`}>
//       {/* Header */}
//       <div className="flex justify-between items-center mb-4">
//         <h3 className="text-gray-800 font-semibold text-base">{slab.title}</h3>
//         <span className={`${slab.statusColor} text-white text-xs px-2 py-1 rounded-full flex items-center gap-1`}>
//           <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></div>
//           {slab.status}
//         </span>
//       </div>

//       {/* Payment Method Selection */}
//       <div className="mb-4">
//         <label className="block text-sm font-medium text-gray-600 mb-2">Pay with</label>
//         <div className="flex gap-4">
//           {['INR', 'USD'].map((method) => (
//             <label key={method} className="flex items-center gap-2 cursor-pointer group">
//               <div className="relative">
//                 <input 
//                   type="radio" 
//                   name="paymentMethod" 
//                   value={method}
//                   checked={paymentMethod === method}
//                   onChange={(e) => setPaymentMethod(e.target.value)}
//                   className="sr-only"
//                 />
//                 <div className={`w-3.5 h-3.5 rounded-full border-2 transition-all duration-300 ${
//                   paymentMethod === method 
//                     ? 'border-green-500 bg-green-500' 
//                     : 'border-gray-300'
//                 } flex items-center justify-center`}>
//                   {paymentMethod === method && (
//                     <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
//                   )}
//                 </div>
//               </div>
//               <span className={`text-sm font-medium ${
//                 paymentMethod === method ? 'text-gray-800' : 'text-gray-500'
//               }`}>{method}</span>
//             </label>
//           ))}
//         </div>
//       </div>

//       {/* Amount Input */}
//       <div className="mb-4 space-y-3">
//         <input
//           type="number"
//           placeholder="Enter Amount"
//           value={amount}
//           onChange={(e) => setAmount(e.target.value)}
//           className="w-full bg-gray-50 border border-gray-300 rounded-lg py-2.5 px-3 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500/20"
//         />

//         <button 
//           onClick={handleProceedToPay}
//           className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white py-2.5 px-3 rounded-lg text-sm font-semibold transition-all duration-300 shadow-md hover:shadow-lg"
//         >
//           Proceed to pay
//         </button>
//       </div>

//       {/* Price Changes */}
//       <div className="flex justify-between mb-4">
//         <span className="text-green-600 text-sm font-medium flex items-center gap-1">
//           <span className="text-green-600">↗</span>
//           {slab.prices.inr.toFixed(5)} INR
//         </span>
//         <span className="text-green-600 text-sm font-medium flex items-center gap-1">
//           <span className="text-green-600">↗</span>
//           {slab.prices.usd.toFixed(5)} USD
//         </span>
//       </div>

//       {/* Progress Section */}
//       <div className="mb-4">
//         <p className="text-gray-600 text-sm mb-2">Sold Tokens {slab.soldPercentage}%</p>
//         <div className="w-full bg-gray-200 rounded-full h-2">
//           <div
//             className="bg-gradient-to-r from-green-500 to-green-600 h-full rounded-full transition-all duration-1000"
//             style={{ width: `${slab.soldPercentage}%` }}
//           ></div>
//         </div>
//       </div>

//       {/* Description */}
//       <div className="text-center">
//         <p className="text-gray-600 text-sm leading-relaxed">
//           {slab.description}
//         </p>
//       </div>
//     </div>
//   );
// };

// const UpcomingSlabContent = ({ slab, isActive }) => (
//   <div className={`bg-white rounded-lg p-4 text-gray-800 shadow-lg border border-gray-200 transform transition-all duration-500 min-h-[320px] ${
//     isActive ? 'scale-100 opacity-100' : 'scale-95 opacity-80'
//   }`}>
//     {/* Header */}
//     <div className="flex justify-between items-center mb-4">
//       <h3 className="text-gray-800 font-semibold text-base">{slab.title}</h3>
//       <span className={`${slab.statusColor} text-white text-xs px-2 py-1 rounded-full flex items-center gap-1`}>
//         <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></div>
//         {slab.status}
//       </span>
//     </div>

//     {/* Coin Image */}
//     <div className="flex justify-center mb-4">
//       <div className="w-14 h-14 ">
//         <span className="text-white font-bold text-xl">

//           <img src={assets.welcomeDraw} alt="" />
//         </span>
//       </div>
//     </div>

//     {/* Price Information */}
//     <div className="grid grid-cols-2 gap-3 mb-4">
//       <div className="bg-gray-50 rounded-lg p-3 border border-gray-200 text-center">
//         <p className="text-sm font-semibold text-gray-600 mb-1">USD</p>
//         <p className="text-base font-bold text-gray-800">{slab.prices.usd.toFixed(5)}</p>
//       </div>
//       <div className="bg-gray-50 rounded-lg p-3 border border-gray-200 text-center">
//         <p className="font-bold text-gray-600 text-sm mb-1">INR</p>
//         <p className="text-base font-semibold text-gray-800">{slab.prices.inr.toFixed(5)}</p>
//       </div>
//     </div>

//     {/* Total Coins */}
//     <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg p-4 border border-gray-200 text-center">
//       <p className="text-sm font-medium text-gray-600 mb-2">
//         Total Coins Ready for Release
//       </p>
//       <p className="text-xl font-bold text-green-600">
//         {parseInt(slab.totalCoins).toLocaleString()}
//       </p>
//     </div>
//   </div>
// );

// const SlabTabs = () => {
//   const [activeTab, setActiveTab] = useState(0);
//   const [isAutoPlay, setIsAutoPlay] = useState(false);
//   const scrollRef = useRef(null);
//   const autoPlayRef = useRef(null);

//   const scrollToTab = useCallback((index, smooth = true) => {
//     const container = scrollRef.current;
//     if (container && index >= 0 && index < slabsData.length) {
//       const width = container.clientWidth;
//       container.scrollTo({
//         left: width * index,
//         behavior: smooth ? "smooth" : "auto",
//       });
//       setActiveTab(index);
//     }
//   }, []);

//   const handleTabClick = (index) => {
//     setActiveTab(index);
//     scrollToTab(index, true);
//     setIsAutoPlay(false);
//   };

//   useEffect(() => {
//     if (isAutoPlay) {
//       autoPlayRef.current = setInterval(() => {
//         setActiveTab((prev) => {
//           const next = prev + 1 >= slabsData.length ? 0 : prev + 1;
//           scrollToTab(next);
//           return next;
//         });
//       }, 4000);
//     } else {
//       clearInterval(autoPlayRef.current);
//     }

//     return () => clearInterval(autoPlayRef.current);
//   }, [isAutoPlay, scrollToTab]);

//   useEffect(() => {
//     const handleKeyDown = (e) => {
//       if (e.key === "ArrowLeft" && activeTab > 0) {
//         handleTabClick(activeTab - 1);
//       } else if (e.key === "ArrowRight" && activeTab < slabsData.length - 1) {
//         handleTabClick(activeTab + 1);
//       } else if (e.key === " ") {
//         e.preventDefault();
//         setIsAutoPlay(!isAutoPlay);
//       }
//     };

//     window.addEventListener("keydown", handleKeyDown);
//     return () => window.removeEventListener("keydown", handleKeyDown);
//   }, [activeTab, isAutoPlay]);

//   const getOrdinalSuffix = (num) => {
//     const suffixes = ["th", "st", "nd", "rd"];
//     const remainder = num % 100;
//     return suffixes[(remainder - 20) % 10] || suffixes[remainder] || suffixes[0];
//   };

//   return (
//     <div className="bg-gradient-to-br from-gray-50 via-white to-gray-100 rounded-lg w-full max-w-7xl mx-auto">
//       <div className="px-6   py-2 md:px-12 md:py-4">

//         {/* Desktop Tabs */}
//         <div className="hidden md:flex justify-center mb-6">
//           <div className="flex bg-gray-900 rounded-lg p-2 border border-gray-800 shadow-md overflow-x-auto gap-2 max-w-full no-scrollbar">
//             {slabsData.map((slab, index) => (
//               <button
//                 key={slab.id}
//                 onClick={() => handleTabClick(index)}
//                 className={`px-5 py-2.5 text-base rounded-md font-semibold transition-all duration-300 whitespace-nowrap flex-shrink-0 ${
//                   activeTab === index
//                     ? "bg-green-500 text-white shadow"
//                     : "bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white"
//                 }`}
//               >
//                 {slab.id}
//                 {getOrdinalSuffix(slab.id)}
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* Mobile Tabs */}
//         <div className="flex md:hidden justify-start mb-4 overflow-x-auto no-scrollbar">
//           <div className="flex gap-2 min-w-max px-2">
//             {slabsData.map((slab, index) => (
//               <button
//                 key={slab.id}
//                 onClick={() => handleTabClick(index)}
//                 className={`px-4 py-2 text-sm rounded-md font-semibold transition-all duration-300 whitespace-nowrap flex-shrink-0 border ${
//                   activeTab === index
//                     ? "bg-green-500 text-white border-green-500"
//                     : "bg-gray-800 text-gray-300 border-gray-700 hover:bg-gray-700 hover:text-white"
//                 }`}
//               >
//                 {slab.id}
//                 {getOrdinalSuffix(slab.id)} Slab
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* Carousel Area */}
//         <div className="relative group">

//           {/* LEFT ARROW OUTSIDE */}
//           <button
//             onClick={() =>
//               handleTabClick(activeTab > 0 ? activeTab - 1 : slabsData.length - 1)
//             }
//             className="hidden md:block absolute -left-10 top-1/2 transform -translate-y-1/2 z-30
//                        bg-white/90 hover:bg-white shadow-md rounded-full p-3 border border-gray-200 transition-all"
//           >
//             <ChevronLeft size={20} className="text-gray-600" />
//           </button>

//           {/* Card Container */}
//           <div className="flex justify-center">
//             <div className="w-full max-w-lg md:max-w-4xl mx-auto h-[280px]">
//               {slabsData[activeTab].type === "active" ? (
//                 <ActiveSlabContent slab={slabsData[activeTab]} isActive />
//               ) : (
//                 <UpcomingSlabContent slab={slabsData[activeTab]} isActive />
//               )}
//             </div>
//           </div>

//           {/* RIGHT ARROW OUTSIDE */}
//           <button
//             onClick={() =>
//               handleTabClick(activeTab < slabsData.length - 1 ? activeTab + 1 : 0)
//             }
//             className="hidden md:block absolute -right-10 top-1/2 transform -translate-y-1/2 z-30
//                        bg-white/90 hover:bg-white shadow-md rounded-full p-3 border border-gray-200 transition-all"
//           >
//             <ChevronRight size={20} className="text-gray-600" />
//           </button>
//         </div>

//         {/* Pagination Dots */}
//         <div className="flex justify-center items-center gap-2 my-4">
//           {slabsData.map((_, index) => (
//             <button
//               key={index}
//               onClick={() => handleTabClick(index)}
//               className={`h-2 rounded-full transition-all duration-300 ${
//                 activeTab === index ? "bg-green-500 w-5" : "bg-gray-300 w-2 hover:bg-gray-400"
//               }`}
//             />
//           ))}
//         </div>

//         {/* Progress Bar */}
//         <div className="text-sm md:text-base">
//           <div className="bg-gray-200 rounded-full h-2 overflow-hidden mb-2">
//             <div
//               className="bg-gradient-to-r from-green-400 to-green-500 h-full transition-all duration-500 rounded-full"
//               style={{
//                 width: `${((activeTab + 1) / slabsData.length) * 100}%`,
//               }}
//             />
//           </div>
//           <div className="flex justify-between text-gray-600 font-medium">
//             <span>
//               {activeTab + 1}/{slabsData.length}
//             </span>
//             <span className="text-green-600 truncate">{slabsData[activeTab].title}</span>
//           </div>
//         </div>
//       </div>

//       <style jsx>{`
//         .no-scrollbar {
//           -ms-overflow-style: none;
//           scrollbar-width: none;
//         }
//         .no-scrollbar::-webkit-scrollbar {
//           display: none;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default SlabTabs; 



// import React, { useRef, useState, useEffect, useCallback } from "react";
// import { ChevronLeft, ChevronRight, Play, Pause, TrendingUp, Coins, DollarSign, Clock, CheckCircle, AlertCircle } from 'lucide-react';

// // Mock assets for demonstration
// const assets = {
//   welcomeDraw: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='40' fill='%23f59e0b'/%3E%3Ctext x='50' y='55' font-family='Arial' font-size='20' font-weight='bold' text-anchor='middle' fill='white'%3EJ%3C/text%3E%3C/svg%3E"
// };

// const slabsData = [
//   {
//     id: 1,
//     title: "1st ICO Slab",
//     status: "Live",
//     statusColor: "bg-emerald-500",
//     type: "active",
//     prices: { usd: 0.00024, inr: 0.02 },
//     soldPercentage: 20.50,
//     totalCoins: "50000000000",
//     description: "Invest in Jaimax 1st ICO slab for your financial future."
//   },
//   {
//     id: 2,
//     title: "2nd ICO Slab",
//     status: "Upcoming",
//     statusColor: "bg-amber-500",
//     type: "upcoming",
//     prices: { usd: 0.00059, inr: 0.05 },
//     totalCoins: "20000000000"
//   },
//   {
//     id: 3,
//     title: "3rd ICO Slab",
//     status: "Upcoming",
//     statusColor: "bg-amber-500",
//     type: "upcoming",
//     prices: { usd: 0.00710, inr: 0.60000 },
//     totalCoins: "25000000000"
//   },
//   {
//     id: 4,
//     title: "4th ICO Slab",
//     status: "Upcoming",
//     statusColor: "bg-amber-500",
//     type: "upcoming",
//     prices: { usd: 0.01893, inr: 1.60000 },
//     totalCoins: "30000000000"
//   },
//   {
//     id: 5,
//     title: "5th ICO Slab",
//     status: "Upcoming",
//     statusColor: "bg-amber-500",
//     type: "upcoming",
//     prices: { usd: 0.00189, inr: 0.159 },
//     totalCoins: "23000000000"
//   }
// ];

// const ActiveSlabContent = ({ slab, isActive }) => {
//   const [paymentMethod, setPaymentMethod] = useState('INR');
//   const [amount, setAmount] = useState('');

//   const handleProceedToPay = () => {
//     if (!amount) {
//       alert('Please enter an amount');
//       return;
//     }
//     alert(`Proceeding to pay ${amount} ${paymentMethod} for ${slab.title}`);
//   };

//   return (
//     <div className={`bg-gradient-to-br from-white via-emerald-50/30 to-teal-50/50 rounded-2xl p-6 w-full text-gray-800 shadow-2xl border border-emerald-200/50 backdrop-blur-sm transform transition-all duration-700 min-h-[400px] relative overflow-hidden ${
//       isActive ? 'scale-100 opacity-100' : 'scale-95 opacity-80'
//     }`}>
      
//       {/* Decorative Background Elements */}
//       <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-emerald-400/20 to-transparent rounded-full -translate-y-8 translate-x-8 blur-2xl"></div>
//       <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-teal-400/15 to-transparent rounded-full translate-y-8 -translate-x-8 blur-xl"></div>
      
//       <div className="relative z-10">
//         {/* Header with Enhanced Status */}
//         <div className="flex justify-between items-center mb-6">
//           <div className="flex items-center gap-3">
//             <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-lg shadow-emerald-500/50"></div>
//             <h3 className="text-gray-800 font-bold text-xl bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
//               {slab.title}
//             </h3>
//           </div>
//           <span className={`${slab.statusColor} text-white text-sm px-4 py-2 rounded-full flex items-center gap-2 shadow-lg font-semibold`}>
//             <CheckCircle size={16} />
//             {slab.status}
//           </span>
//         </div>

//         {/* Enhanced Payment Method Selection */}
//         <div className="mb-6">
//           <label className="block text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
//             <DollarSign size={16} className="text-emerald-600" />
//             Payment Method
//           </label>
//           <div className="flex gap-4">
//             {['INR', 'USD'].map((method) => (
//               <label key={method} className="flex items-center gap-3 cursor-pointer group">
//                 <div className="relative">
//                   <input 
//                     type="radio" 
//                     name="paymentMethod" 
//                     value={method}
//                     checked={paymentMethod === method}
//                     onChange={(e) => setPaymentMethod(e.target.value)}
//                     className="sr-only"
//                   />
//                   <div className={`w-5 h-5 rounded-full border-3 transition-all duration-300 shadow-lg ${
//                     paymentMethod === method 
//                       ? 'border-emerald-500 bg-emerald-500 shadow-emerald-500/25' 
//                       : 'border-gray-300 bg-white shadow-gray-200'
//                   } flex items-center justify-center`}>
//                     {paymentMethod === method && (
//                       <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
//                     )}
//                   </div>
//                 </div>
//                 <span className={`text-base font-semibold transition-all duration-300 ${
//                   paymentMethod === method ? 'text-emerald-700' : 'text-gray-500'
//                 }`}>{method}</span>
//               </label>
//             ))}
//           </div>
//         </div>

//         {/* Enhanced Amount Input */}
//         <div className="mb-6 space-y-4">
//           <div className="relative">
//             <input
//               type="number"
//               placeholder="Enter Amount"
//               value={amount}
//               onChange={(e) => setAmount(e.target.value)}
//               className="w-full bg-white/80 backdrop-blur-sm border-2 border-emerald-200 rounded-xl py-4 px-4 text-base text-gray-800 placeholder-gray-400 focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/20 shadow-lg transition-all duration-300"
//             />
//             <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-emerald-600 font-semibold">
//               {paymentMethod}
//             </div>
//           </div>

//           <button 
//             onClick={handleProceedToPay}
//             className="w-full bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:from-emerald-600 hover:via-teal-600 hover:to-cyan-600 text-white py-4 px-6 rounded-xl text-base font-bold transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 relative overflow-hidden group"
//           >
//             <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform -skew-x-12"></div>
//             <span className="relative z-10">Proceed to Pay</span>
//             <TrendingUp size={18} className="relative z-10" />
//           </button>
//         </div>

//         {/* Enhanced Price Changes */}
//         <div className="flex justify-between mb-6 gap-4">
//           <div className="flex-1 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl p-4 border border-emerald-200/50 shadow-md">
//             <div className="flex items-center justify-between">
//               <span className="text-emerald-700 text-sm font-semibold">INR Price</span>
//               <span className="text-emerald-600 text-sm">↗ +5.2%</span>
//             </div>
//             <p className="text-emerald-800 text-lg font-bold mt-1">₹{slab.prices.inr.toFixed(5)}</p>
//           </div>
//           <div className="flex-1 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-200/50 shadow-md">
//             <div className="flex items-center justify-between">
//               <span className="text-blue-700 text-sm font-semibold">USD Price</span>
//               <span className="text-blue-600 text-sm">↗ +3.8%</span>
//             </div>
//             <p className="text-blue-800 text-lg font-bold mt-1">${slab.prices.usd.toFixed(5)}</p>
//           </div>
//         </div>

//         {/* Enhanced Progress Section */}
//         <div className="mb-6">
//           <div className="flex justify-between items-center mb-3">
//             <span className="text-gray-700 text-sm font-bold flex items-center gap-2">
//               <Coins size={16} className="text-emerald-600" />
//               Sold Tokens
//             </span>
//             <span className="text-emerald-700 text-lg font-bold">{slab.soldPercentage}%</span>
//           </div>
//           <div className="w-full bg-gradient-to-r from-gray-200 to-gray-300 rounded-full h-3 overflow-hidden shadow-inner">
//             <div
//               className="bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 h-full rounded-full transition-all duration-1000 ease-out shadow-lg relative overflow-hidden"
//               style={{ width: `${slab.soldPercentage}%` }}
//             >
//               <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
//             </div>
//           </div>
//         </div>

//         {/* Enhanced Description */}
//         <div className="text-center bg-gradient-to-r from-emerald-50/50 to-teal-50/50 rounded-xl p-4 border border-emerald-100">
//           <p className="text-gray-700 text-sm leading-relaxed font-medium">
//             {slab.description}
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// const UpcomingSlabContent = ({ slab, isActive }) => (
//   <div className={`bg-gradient-to-br from-white via-amber-50/30 to-orange-50/50 rounded-2xl p-6 text-gray-800 shadow-2xl border border-amber-200/50 backdrop-blur-sm transform transition-all duration-700 min-h-[400px] relative overflow-hidden ${
//     isActive ? 'scale-100 opacity-100' : 'scale-95 opacity-80'
//   }`}>
    
//     {/* Decorative Background Elements */}
//     <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-amber-400/20 to-transparent rounded-full -translate-y-8 translate-x-8 blur-2xl"></div>
//     <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-orange-400/15 to-transparent rounded-full translate-y-8 -translate-x-8 blur-xl"></div>
    
//     <div className="relative z-10">
//       {/* Enhanced Header */}
//       <div className="flex justify-between items-center mb-6">
//         <div className="flex items-center gap-3">
//           <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse shadow-lg shadow-amber-500/50"></div>
//           <h3 className="text-gray-800 font-bold text-xl bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
//             {slab.title}
//           </h3>
//         </div>
//         <span className={`${slab.statusColor} text-white text-sm px-4 py-2 rounded-full flex items-center gap-2 shadow-lg font-semibold`}>
//           <Clock size={16} />
//           {slab.status}
//         </span>
//       </div>

//       {/* Enhanced Coin Image */}
//       <div className="flex justify-center mb-6">
//         <div className="w-20 h-20 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full shadow-2xl shadow-amber-500/25 flex items-center justify-center transform hover:scale-110 transition-all duration-300">
//           <img src={assets.welcomeDraw} alt="Coin" className="w-16 h-16 rounded-full" />
//         </div>
//       </div>

//       {/* Enhanced Price Information */}
//       <div className="grid grid-cols-2 gap-4 mb-6">
//         <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl p-4 border border-blue-200/50 shadow-lg text-center transform hover:scale-105 transition-all duration-300">
//           <div className="flex items-center justify-center gap-2 mb-2">
//             <DollarSign size={16} className="text-blue-600" />
//             <p className="text-sm font-bold text-blue-700">USD</p>
//           </div>
//           <p className="text-xl font-bold text-blue-800">${slab.prices.usd.toFixed(5)}</p>
//         </div>
//         <div className="bg-gradient-to-br from-emerald-50 to-teal-100 rounded-xl p-4 border border-emerald-200/50 shadow-lg text-center transform hover:scale-105 transition-all duration-300">
//           <div className="flex items-center justify-center gap-2 mb-2">
//             <span className="text-emerald-600 font-bold">₹</span>
//             <p className="text-sm font-bold text-emerald-700">INR</p>
//           </div>
//           <p className="text-xl font-bold text-emerald-800">₹{slab.prices.inr.toFixed(5)}</p>
//         </div>
//       </div>

//       {/* Enhanced Total Coins */}
//       <div className="bg-gradient-to-r from-amber-50 via-orange-50 to-amber-50 rounded-xl p-6 border border-amber-200/50 shadow-lg text-center relative overflow-hidden">
//         <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
//         <div className="relative z-10">
//           <div className="flex items-center justify-center gap-2 mb-3">
//             <Coins size={20} className="text-amber-600" />
//             <p className="text-sm font-bold text-amber-700">
//               Total Coins Ready for Release
//             </p>
//           </div>
//           <p className="text-2xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
//             {parseInt(slab.totalCoins).toLocaleString()}
//           </p>
//         </div>
//       </div>
//     </div>
//   </div>
// );

// const SlabTabs = () => {
//   const [activeTab, setActiveTab] = useState(0);
//   const [isAutoPlay, setIsAutoPlay] = useState(false);
//   const scrollRef = useRef(null);
//   const autoPlayRef = useRef(null);

//   const scrollToTab = useCallback((index, smooth = true) => {
//     const container = scrollRef.current;
//     if (container && index >= 0 && index < slabsData.length) {
//       const width = container.clientWidth;
//       container.scrollTo({
//         left: width * index,
//         behavior: smooth ? "smooth" : "auto",
//       });
//       setActiveTab(index);
//     }
//   }, []);

//   const handleTabClick = (index) => {
//     setActiveTab(index);
//     scrollToTab(index, true);
//     setIsAutoPlay(false);
//   };

//   useEffect(() => {
//     if (isAutoPlay) {
//       autoPlayRef.current = setInterval(() => {
//         setActiveTab((prev) => {
//           const next = prev + 1 >= slabsData.length ? 0 : prev + 1;
//           scrollToTab(next);
//           return next;
//         });
//       }, 4000);
//     } else {
//       clearInterval(autoPlayRef.current);
//     }

//     return () => clearInterval(autoPlayRef.current);
//   }, [isAutoPlay, scrollToTab]);

//   useEffect(() => {
//     const handleKeyDown = (e) => {
//       if (e.key === "ArrowLeft" && activeTab > 0) {
//         handleTabClick(activeTab - 1);
//       } else if (e.key === "ArrowRight" && activeTab < slabsData.length - 1) {
//         handleTabClick(activeTab + 1);
//       } else if (e.key === " ") {
//         e.preventDefault();
//         setIsAutoPlay(!isAutoPlay);
//       }
//     };

//     window.addEventListener("keydown", handleKeyDown);
//     return () => window.removeEventListener("keydown", handleKeyDown);
//   }, [activeTab, isAutoPlay]);

//   const getOrdinalSuffix = (num) => {
//     const suffixes = ["th", "st", "nd", "rd"];
//     const remainder = num % 100;
//     return suffixes[(remainder - 20) % 10] || suffixes[remainder] || suffixes[0];
//   };

//   return (
//     <div className="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 rounded-3xl w-full max-w-7xl mx-auto shadow-2xl border border-white/50 backdrop-blur-sm">
//       <div className="px-6 py-4 md:px-12 md:py-8">

//         {/* Enhanced Desktop Tabs */}
//         <div className="hidden md:flex justify-center mb-8">
//           <div className="flex bg-gradient-to-r from-slate-800 via-slate-900 to-slate-800 rounded-2xl p-4 border border-slate-700/50 shadow-2xl overflow-x-auto gap-3 max-w-full no-scrollbar backdrop-blur-sm">
//             {slabsData.map((slab, index) => (
//               <button
//                 key={slab.id}
//                 onClick={() => handleTabClick(index)}
//                 className={`px-6 py-3 text-base rounded-xl font-bold transition-all duration-500 whitespace-nowrap flex-shrink-0 relative overflow-hidden group ${
//                   activeTab === index
//                     ? "bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-white shadow-xl shadow-emerald-500/25 scale-105"
//                     : "bg-gradient-to-r from-slate-700 to-slate-800 text-slate-300 hover:from-slate-600 hover:to-slate-700 hover:text-white hover:scale-102 shadow-lg"
//                 }`}
//               >
//                 <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform -skew-x-12"></div>
//                 <span className="relative z-10">
//                   {slab.id}
//                   {getOrdinalSuffix(slab.id)} Slab
//                 </span>
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* Enhanced Mobile Tabs */}
//         <div className="flex md:hidden justify-start mb-6 overflow-x-auto no-scrollbar">
//           <div className="flex gap-3 min-w-max px-2">
//             {slabsData.map((slab, index) => (
//               <button
//                 key={slab.id}
//                 onClick={() => handleTabClick(index)}
//                 className={`px-5 py-3 text-sm rounded-xl font-bold transition-all duration-500 whitespace-nowrap flex-shrink-0 border-2 ${
//                   activeTab === index
//                     ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white border-emerald-400 shadow-lg shadow-emerald-500/25"
//                     : "bg-gradient-to-r from-slate-700 to-slate-800 text-slate-300 border-slate-600 hover:from-slate-600 hover:to-slate-700 hover:text-white shadow-md"
//                 }`}
//               >
//                 {slab.id}
//                 {getOrdinalSuffix(slab.id)} Slab
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* Enhanced Carousel Area */}
//         <div className="relative group">

//           {/* Enhanced LEFT ARROW */}
//           <button
//             onClick={() =>
//               handleTabClick(activeTab > 0 ? activeTab - 1 : slabsData.length - 1)
//             }
//             className="hidden md:block absolute -left-16 top-1/2 transform -translate-y-1/2 z-30
//                        bg-gradient-to-r from-white via-white to-gray-50 hover:from-gray-50 hover:to-white 
//                        text-slate-700 shadow-2xl rounded-full p-4 border-2 border-slate-200/50 
//                        transition-all duration-300 hover:scale-110 hover:shadow-2xl active:scale-95
//                        backdrop-blur-sm"
//           >
//             <ChevronLeft size={24} />
//           </button>

//           {/* Enhanced Card Container */}
//           <div className="flex justify-center">
//             <div className="w-full max-w-lg md:max-w-5xl mx-auto">
//               {slabsData[activeTab].type === "active" ? (
//                 <ActiveSlabContent slab={slabsData[activeTab]} isActive />
//               ) : (
//                 <UpcomingSlabContent slab={slabsData[activeTab]} isActive />
//               )}
//             </div>
//           </div>

//           {/* Enhanced RIGHT ARROW */}
//           <button
//             onClick={() =>
//               handleTabClick(activeTab < slabsData.length - 1 ? activeTab + 1 : 0)
//             }
//             className="hidden md:block absolute -right-16 top-1/2 transform -translate-y-1/2 z-30
//                        bg-gradient-to-r from-white via-white to-gray-50 hover:from-gray-50 hover:to-white 
//                        text-slate-700 shadow-2xl rounded-full p-4 border-2 border-slate-200/50 
//                        transition-all duration-300 hover:scale-110 hover:shadow-2xl active:scale-95
//                        backdrop-blur-sm"
//           >
//             <ChevronRight size={24} />
//           </button>
//         </div>

//         {/* Enhanced Pagination Dots */}
//         <div className="flex justify-center items-center gap-3 my-6">
//           {slabsData.map((_, index) => (
//             <button
//               key={index}
//               onClick={() => handleTabClick(index)}
//               className={`rounded-full transition-all duration-500 shadow-lg ${
//                 activeTab === index 
//                   ? "bg-gradient-to-r from-emerald-500 to-teal-500 w-10 h-4 shadow-emerald-500/25" 
//                   : "bg-gradient-to-r from-slate-400 to-slate-500 w-4 h-4 hover:from-slate-300 hover:to-slate-400 hover:scale-125"
//               }`}
//             />
//           ))}
//         </div>

//         {/* Enhanced Progress Bar */}
//         <div className="text-sm md:text-base">
//           <div className="bg-gradient-to-r from-slate-200 via-gray-200 to-slate-200 rounded-full h-4 overflow-hidden mb-4 shadow-inner border border-slate-300/50">
//             <div
//               className="bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 h-full transition-all duration-1000 ease-out rounded-full shadow-lg relative overflow-hidden"
//               style={{
//                 width: `${((activeTab + 1) / slabsData.length) * 100}%`,
//               }}
//             >
//               <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
//             </div>
//           </div>
//           <div className="flex justify-between items-center">
//             <span className="text-slate-700 font-bold bg-gradient-to-r from-slate-100 to-gray-100 px-4 py-2 rounded-full shadow-md border border-slate-200">
//               {activeTab + 1}/{slabsData.length}
//             </span>
//             <span className="text-slate-700 font-bold truncate max-w-xs bg-gradient-to-r from-emerald-50 to-teal-50 px-4 py-2 rounded-full shadow-md border border-emerald-200/50">
//               {slabsData[activeTab].title}
//             </span>
//           </div>
//         </div>
//       </div>

//       <style jsx>{`
//         .no-scrollbar {
//           -ms-overflow-style: none;
//           scrollbar-width: none;
//         }
//         .no-scrollbar::-webkit-scrollbar {
//           display: none;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default SlabTabs;


import React, { useRef, useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, Play, Pause, TrendingUp, Coins, DollarSign, Clock, CheckCircle, AlertCircle } from 'lucide-react';

// Mock assets for demonstration
const assets = {
  welcomeDraw: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='40' fill='%23f59e0b'/%3E%3Ctext x='50' y='55' font-family='Arial' font-size='20' font-weight='bold' text-anchor='middle' fill='white'%3EJ%3C/text%3E%3C/svg%3E"
};

const slabsData = [
  {
    id: 1,
    title: "1st ICO Slab",
    status: "Live",
    statusColor: "bg-emerald-500",
    type: "active",
    prices: { usd: 0.00024, inr: 0.02 },
    soldPercentage: 20.50,
    totalCoins: "50000000000",
    description: "Invest in Jaimax 1st ICO slab for your financial future."
  },
  {
    id: 2,
    title: "2nd ICO Slab",
    status: "Upcoming",
    statusColor: "bg-amber-500",
    type: "upcoming",
    prices: { usd: 0.00059, inr: 0.05 },
    totalCoins: "20000000000"
  },
  {
    id: 3,
    title: "3rd ICO Slab",
    status: "Upcoming",
    statusColor: "bg-amber-500",
    type: "upcoming",
    prices: { usd: 0.00710, inr: 0.60000 },
    totalCoins: "25000000000"
  },
  {
    id: 4,
    title: "4th ICO Slab",
    status: "Upcoming",
    statusColor: "bg-amber-500",
    type: "upcoming",
    prices: { usd: 0.01893, inr: 1.60000 },
    totalCoins: "30000000000"
  },
  {
    id: 5,
    title: "5th ICO Slab",
    status: "Upcoming",
    statusColor: "bg-amber-500",
    type: "upcoming",
    prices: { usd: 0.00189, inr: 0.159 },
    totalCoins: "23000000000"
  }
];

const ActiveSlabContent = ({ slab, isActive }) => {
  const [paymentMethod, setPaymentMethod] = useState('INR');
  const [amount, setAmount] = useState('');

  const handleProceedToPay = () => {
    if (!amount) {
      alert('Please enter an amount');
      return;
    }
    alert(`Proceeding to pay ${amount} ${paymentMethod} for ${slab.title}`);
  };

  return (
    <div className={`bg-gradient-to-br from-white via-emerald-50/30 to-teal-50/50 rounded-xl p-4  text-gray-800 shadow-xl border border-emerald-200/50 backdrop-blur-sm transform transition-all duration-700 min-h-[250px] relative overflow-hidden ${
      isActive ? 'scale-100 opacity-100' : 'scale-95 opacity-80'
    }`}>
      
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-emerald-400/20 to-transparent rounded-full -translate-y-4 translate-x-4 blur-xl"></div>
      <div className="absolute bottom-0 left-0 w-12 h-12 bg-gradient-to-tr from-teal-400/15 to-transparent rounded-full translate-y-4 -translate-x-4 blur-lg"></div>
      
      <div className="relative z-10">
        {/* Header with Status */}
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse shadow-lg shadow-emerald-500/50"></div>
            <h3 className="text-gray-800 font-bold text-base bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              {slab.title}
            </h3>
          </div>
          <span className={`${slab.statusColor} text-white text-xs px-2 py-1 rounded-full flex items-center gap-1 shadow-lg font-semibold`}>
            <CheckCircle size={12} />
            {slab.status}
          </span>
        </div>

        {/* Payment Method Selection */}
        <div className="mb-3">
          <label className="block text-xs font-bold text-gray-700 mb-2 flex items-center gap-1">
            <DollarSign size={12} className="text-emerald-600" />
            Payment Method
          </label>
          <div className="flex gap-3">
            {['INR', 'USD'].map((method) => (
              <label key={method} className="flex items-center gap-2 cursor-pointer">
                <div className="relative">
                  <input 
                    type="radio" 
                    name="paymentMethod" 
                    value={method}
                    checked={paymentMethod === method}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="sr-only"
                  />
                  <div className={`w-3 h-3 rounded-full border-2 transition-all duration-300 shadow-md ${
                    paymentMethod === method 
                      ? 'border-emerald-500 bg-emerald-500 shadow-emerald-500/25' 
                      : 'border-gray-300 bg-white shadow-gray-200'
                  } flex items-center justify-center`}>
                    {paymentMethod === method && (
                      <div className="w-1 h-1 bg-white rounded-full animate-pulse"></div>
                    )}
                  </div>
                </div>
                <span className={`text-sm font-semibold transition-all duration-300 ${
                  paymentMethod === method ? 'text-emerald-700' : 'text-gray-500'
                }`}>{method}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Amount Input */}
        <div className="mb-3 space-y-2">
          <div className="relative">
            <input
              type="number"
              placeholder="Enter Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full bg-white/80 backdrop-blur-sm border border-emerald-200 rounded-lg py-2 px-3 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 shadow-md transition-all duration-300"
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-emerald-600 font-semibold text-xs">
              {paymentMethod}
            </div>
          </div>

          <button 
            onClick={handleProceedToPay}
            className="w-full bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:from-emerald-600 hover:via-teal-600 hover:to-cyan-600 text-white py-2 px-4 rounded-lg text-sm font-bold transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-1 relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform -skew-x-12"></div>
            <span className="relative z-10">Proceed to Pay</span>
            <TrendingUp size={14} className="relative z-10" />
          </button>
        </div>

        {/* Price Changes */}
        <div className="flex justify-between mb-3 gap-2">
          <div className="flex-1 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-lg p-2 border border-emerald-200/50 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-emerald-700 text-xs font-semibold">INR</span>
              <span className="text-emerald-600 text-xs">↗ +5.2%</span>
            </div>
            <p className="text-emerald-800 text-sm font-bold">₹{slab.prices.inr.toFixed(5)}</p>
          </div>
          <div className="flex-1 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-2 border border-blue-200/50 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-blue-700 text-xs font-semibold">USD</span>
              <span className="text-blue-600 text-xs">↗ +3.8%</span>
            </div>
            <p className="text-blue-800 text-sm font-bold">${slab.prices.usd.toFixed(5)}</p>
          </div>
        </div>

        {/* Progress Section */}
        <div className="mb-3">
          <div className="flex justify-between items-center mb-1">
            <span className="text-gray-700 text-xs font-bold flex items-center gap-1">
              <Coins size={12} className="text-emerald-600" />
              Sold Tokens
            </span>
            <span className="text-emerald-700 text-sm font-bold">{slab.soldPercentage}%</span>
          </div>
          <div className="w-full bg-gradient-to-r from-gray-200 to-gray-300 rounded-full h-2 overflow-hidden shadow-inner">
            <div
              className="bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 h-full rounded-full transition-all duration-1000 ease-out shadow-sm relative overflow-hidden"
              style={{ width: `${slab.soldPercentage}%` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="text-center bg-gradient-to-r from-emerald-50/50 to-teal-50/50 rounded-lg p-2 border border-emerald-100">
          <p className="text-gray-700 text-xs leading-relaxed font-medium">
            {slab.description}
          </p>
        </div>
      </div>
    </div>
  );
};

const UpcomingSlabContent = ({ slab, isActive }) => (
  <div className={`bg-gradient-to-br from-white via-amber-50/30 to-orange-50/50 rounded-xl p-4 text-gray-800 shadow-xl border border-amber-200/50 backdrop-blur-sm transform transition-all duration-700 min-h-[250px] relative overflow-hidden ${
    isActive ? 'scale-100 opacity-100' : 'scale-95 opacity-80'
  }`}>
    
    {/* Decorative Background Elements */}
    <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-amber-400/20 to-transparent rounded-full -translate-y-4 translate-x-4 blur-xl"></div>
    <div className="absolute bottom-0 left-0 w-12 h-12 bg-gradient-to-tr from-orange-400/15 to-transparent rounded-full translate-y-4 -translate-x-4 blur-lg"></div>
    
    <div className="relative z-10">
      {/* Header */}
      <div className="flex justify-between items-center mb-3">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-pulse shadow-lg shadow-amber-500/50"></div>
          <h3 className="text-gray-800 font-bold text-base bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
            {slab.title}
          </h3>
        </div>
        <span className={`${slab.statusColor} text-white text-xs px-2 py-1 rounded-full flex items-center gap-1 shadow-lg font-semibold`}>
          <Clock size={12} />
          {slab.status}
        </span>
      </div>

      {/* Coin Image */}
      <div className="flex justify-center mb-3">
        <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full shadow-xl shadow-amber-500/25 flex items-center justify-center transform hover:scale-110 transition-all duration-300">
          <img src={assets.welcomeDraw} alt="Coin" className="w-10 h-10 rounded-full" />
        </div>
      </div>

      {/* Price Information */}
      <div className="grid grid-cols-2 gap-2 mb-3">
        <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg p-2 border border-blue-200/50 shadow-md text-center transform hover:scale-105 transition-all duration-300">
          <div className="flex items-center justify-center gap-1 mb-1">
            <DollarSign size={12} className="text-blue-600" />
            <p className="text-xs font-bold text-blue-700">USD</p>
          </div>
          <p className="text-sm font-bold text-blue-800">${slab.prices.usd.toFixed(5)}</p>
        </div>
        <div className="bg-gradient-to-br from-emerald-50 to-teal-100 rounded-lg p-2 border border-emerald-200/50 shadow-md text-center transform hover:scale-105 transition-all duration-300">
          <div className="flex items-center justify-center gap-1 mb-1">
            <span className="text-emerald-600 font-bold text-xs">₹</span>
            <p className="text-xs font-bold text-emerald-700">INR</p>
          </div>
          <p className="text-sm font-bold text-emerald-800">₹{slab.prices.inr.toFixed(5)}</p>
        </div>
      </div>

      {/* Total Coins */}
      <div className="bg-gradient-to-r from-amber-50 via-orange-50 to-amber-50 rounded-lg p-3 border border-amber-200/50 shadow-md text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
        <div className="relative z-10">
          <div className="flex items-center justify-center gap-1 mb-1">
            <Coins size={14} className="text-amber-600" />
            <p className="text-xs font-bold text-amber-700">
              Total Coins Ready for Release
            </p>
          </div>
          <p className="text-lg font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
            {parseInt(slab.totalCoins).toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  </div>
);

const SlabTabs = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(false);
  const scrollRef = useRef(null);
  const autoPlayRef = useRef(null);

  const scrollToTab = useCallback((index, smooth = true) => {
    const container = scrollRef.current;
    if (container && index >= 0 && index < slabsData.length) {
      const width = container.clientWidth;
      container.scrollTo({
        left: width * index,
        behavior: smooth ? "smooth" : "auto",
      });
      setActiveTab(index);
    }
  }, []);

  const handleTabClick = (index) => {
    setActiveTab(index);
    scrollToTab(index, true);
    setIsAutoPlay(false);
  };

  useEffect(() => {
    if (isAutoPlay) {
      autoPlayRef.current = setInterval(() => {
        setActiveTab((prev) => {
          const next = prev + 1 >= slabsData.length ? 0 : prev + 1;
          scrollToTab(next);
          return next;
        });
      }, 4000);
    } else {
      clearInterval(autoPlayRef.current);
    }

    return () => clearInterval(autoPlayRef.current);
  }, [isAutoPlay, scrollToTab]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft" && activeTab > 0) {
        handleTabClick(activeTab - 1);
      } else if (e.key === "ArrowRight" && activeTab < slabsData.length - 1) {
        handleTabClick(activeTab + 1);
      } else if (e.key === " ") {
        e.preventDefault();
        setIsAutoPlay(!isAutoPlay);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeTab, isAutoPlay]);

  const getOrdinalSuffix = (num) => {
    const suffixes = ["th", "st", "nd", "rd"];
    const remainder = num % 100;
    return suffixes[(remainder - 20) % 10] || suffixes[remainder] || suffixes[0];
  };

  return (
    <div className="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 rounded-2xl w-full max-w-7xl mx-auto shadow-2xl border border-white/50 backdrop-blur-sm">
      <div className="px-4 py-3 md:px-8 md:py-4">

        {/* Desktop Tabs */}
        <div className="hidden md:flex justify-center mb-4">
          <div className="flex bg-gradient-to-r from-slate-800 via-slate-900 to-slate-800 rounded-xl p-2 border border-slate-700/50 shadow-xl overflow-x-auto gap-2 max-w-full no-scrollbar backdrop-blur-sm">
            {slabsData.map((slab, index) => (
              <button
                key={slab.id}
                onClick={() => handleTabClick(index)}
                className={`px-4 py-2 text-sm rounded-lg font-bold transition-all duration-500 whitespace-nowrap flex-shrink-0 relative overflow-hidden group ${
                  activeTab === index
                    ? "bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-white shadow-lg shadow-emerald-500/25 scale-105"
                    : "bg-gradient-to-r from-slate-700 to-slate-800 text-slate-300 hover:from-slate-600 hover:to-slate-700 hover:text-white hover:scale-102 shadow-md"
                }`}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform -skew-x-12"></div>
                <span className="relative z-10">
                  {slab.id}
                  {getOrdinalSuffix(slab.id)} Slab
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Mobile Tabs */}
        <div className="flex md:hidden justify-start mb-4 overflow-x-auto no-scrollbar">
          <div className="flex gap-2 min-w-max px-2">
            {slabsData.map((slab, index) => (
              <button
                key={slab.id}
                onClick={() => handleTabClick(index)}
                className={`px-3 py-2 text-xs rounded-lg font-bold transition-all duration-500 whitespace-nowrap flex-shrink-0 border ${
                  activeTab === index
                    ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white border-emerald-400 shadow-md shadow-emerald-500/25"
                    : "bg-gradient-to-r from-slate-700 to-slate-800 text-slate-300 border-slate-600 hover:from-slate-600 hover:to-slate-700 hover:text-white shadow-sm"
                }`}
              >
                {slab.id}
                {getOrdinalSuffix(slab.id)} Slab
              </button>
            ))}
          </div>
        </div>

        {/* Carousel Area */}
        <div className="relative group">

          {/* LEFT ARROW */}
          <button
            onClick={() =>
              handleTabClick(activeTab > 0 ? activeTab - 1 : slabsData.length - 1)
            }
            className="hidden md:block absolute -left-12 top-1/2 transform -translate-y-1/2 z-30
                       bg-gradient-to-r from-white via-white to-gray-50 hover:from-gray-50 hover:to-white 
                       text-slate-700 shadow-xl rounded-full p-3 border border-slate-200/50 
                       transition-all duration-300 hover:scale-110 hover:shadow-xl active:scale-95
                       backdrop-blur-sm"
          >
            <ChevronLeft size={18} />
          </button>

          {/* Card Container */}
          <div className="flex justify-center">
            <div className="w-full max-w-lg md:max-w-4xl mx-auto">
              {slabsData[activeTab].type === "active" ? (
                <ActiveSlabContent slab={slabsData[activeTab]} isActive />
              ) : (
                <UpcomingSlabContent slab={slabsData[activeTab]} isActive />
              )}
            </div>
          </div>

          {/* RIGHT ARROW */}
          <button
            onClick={() =>
              handleTabClick(activeTab < slabsData.length - 1 ? activeTab + 1 : 0)
            }
            className="hidden md:block absolute -right-12 top-1/2 transform -translate-y-1/2 z-30
                       bg-gradient-to-r from-white via-white to-gray-50 hover:from-gray-50 hover:to-white 
                       text-slate-700 shadow-xl rounded-full p-3 border border-slate-200/50 
                       transition-all duration-300 hover:scale-110 hover:shadow-xl active:scale-95
                       backdrop-blur-sm"
          >
            <ChevronRight size={18} />
          </button>
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center items-center gap-2 my-3">
          {slabsData.map((_, index) => (
            <button
              key={index}
              onClick={() => handleTabClick(index)}
              className={`rounded-full transition-all duration-500 shadow-md ${
                activeTab === index 
                  ? "bg-gradient-to-r from-emerald-500 to-teal-500 w-6 h-3 shadow-emerald-500/25" 
                  : "bg-gradient-to-r from-slate-400 to-slate-500 w-3 h-3 hover:from-slate-300 hover:to-slate-400 hover:scale-125"
              }`}
            />
          ))}
        </div>

        {/* Progress Bar */}
        <div className="text-xs md:text-sm">
          <div className="bg-gradient-to-r from-slate-200 via-gray-200 to-slate-200 rounded-full h-3 overflow-hidden mb-2 shadow-inner border border-slate-300/50">
            <div
              className="bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 h-full transition-all duration-1000 ease-out rounded-full shadow-md relative overflow-hidden"
              style={{
                width: `${((activeTab + 1) / slabsData.length) * 100}%`,
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-slate-700 font-bold bg-gradient-to-r from-slate-100 to-gray-100 px-2 py-1 rounded-full shadow-sm border border-slate-200 text-xs">
              {activeTab + 1}/{slabsData.length}
            </span>
            <span className="text-slate-700 font-bold truncate max-w-xs bg-gradient-to-r from-emerald-50 to-teal-50 px-2 py-1 rounded-full shadow-sm border border-emerald-200/50 text-xs">
              {slabsData[activeTab].title}
            </span>
          </div>
        </div>
      </div>

      <style jsx>{`
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default SlabTabs;