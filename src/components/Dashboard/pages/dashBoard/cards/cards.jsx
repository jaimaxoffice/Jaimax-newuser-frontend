// import React, { useState, useEffect, useContext } from "react";
// import assets from "../../../../../assets/assets";
// import { useUserDataQuery } from "../DashboardApliSlice"
// import { MyContext } from "../../../../../Authentication/AuthContext";

// const TopCards = () => {
//   const [hoveredCard, setHoveredCard] = useState(null);
//   const [isTokenVerified, setIsTokenVerified] = useState(false);
//   const [currency, setCurrency] = useState("");
//   const [currencySymbol, setCurrencySymbol] = useState("");
  
//   const { data } = useContext(MyContext);
//   const token = localStorage.getItem("token");

//   const { data: userData, refetch } = useUserDataQuery(undefined, {
//     skip: !isTokenVerified,
//   });

//   // Token verification effect
//   useEffect(() => {
//     const verifyToken = async () => {
//       if (!token) {
//         return;
//       }
//       setIsTokenVerified(true);
//     };
//     verifyToken();
//   }, [token]);

//   // Currency setup effect
//   useEffect(() => {
//     setCurrency(userData && userData?.data?.countryCode === 91 ? "INR" : "USD");

//     if (userData && userData?.data?.countryCode !== 91) {
//       setCurrencySymbol("$");
//     } else if (userData && userData?.data?.countryCode === 91) {
//       setCurrencySymbol("₹");
//     }
//   }, [userData?.data?.countryCode]);

//   // Refetch data when token is verified
//   useEffect(() => {
//     if (isTokenVerified) {
//       refetch();
//     }
//   }, [isTokenVerified, refetch]);

//   const cards = [
//     {
//       label: "Total Coins",
//       value: userData && userData?.data?.tokens
//         ? Number(userData?.data?.tokens).toFixed(3)
//         : "0.000",
//       image: assets.totalCoins1,
//       hoverImage: assets.totalCoins,
//       shapes: ["circle", "triangle"],
//       iconBg: "#2d3436",
//     },
//     {
//       label: "Wallet Balance",
//       value: `${currencySymbol}${Number(
//         userData?.data?.walletBalance || 0
//       ).toFixed(2)}`,
//       image: assets.walletBal,
//       hoverImage: assets.walletBal1,
//       shapes: ["square", "diamond"],
//       iconBg: "#6c5ce7",
//     },
//     {
//       label: "Available Balance",
//       value: `${currencySymbol}${Number(userData?.data?.Inr || 0).toFixed(2)}`,
//       image: assets.available,
//       hoverImage: assets.available1,
//       shapes: ["pentagon", "ellipse"],
//       iconBg: "#00b894",
//     },
//     {
//       label: "Referral Earnings",
//       value: `${currencySymbol}${Number(
//         userData?.data?.referenceInr || 0
//       ).toFixed(2)}`,
//       image: assets.referal,
//       hoverImage: assets.referal1,
//       shapes: ["hexagon", "circle"],
//       iconBg: "#d63031",
//     },
//     {
//       label: "Active Members",
//       value: userData && userData?.data?.activeUsers
//         ? userData?.data?.activeUsers
//         : 0,
//       image: assets.activememo,
//       hoverImage: assets.activememo1,
//       shapes: ["triangle", "square"],
//       iconBg: "#fdcb6e",
//     },
//     {
//       label: "Withdrawal Amount",
//       value: `${currencySymbol}${Number(
//         userData?.data?.withdrawalAmount || 0
//       ).toFixed(2)}`,
//       image: assets.withdraw,
//       hoverImage: assets.withdraw1,
//       shapes: ["diamond", "pentagon"],
//       iconBg: "#0984e3",
//     },
//     {
//       label: "Super Bonus",
//       value: `${currencySymbol}${Number(
//         userData?.data?.super_bonus || 0
//       ).toFixed(2)}`,
//       image: assets.superBonus,
//       hoverImage: assets.superBonus1,
//       shapes: ["ellipse", "hexagon"],
//       iconBg: "#6c3483",
//     },
//   ];

//   const shapeBaseStyles = {
//     position: "absolute",
//     opacity: 0.18,
//     pointerEvents: "none",
//     transition: "opacity 0.3s ease, transform 3s ease-in-out",
//     zIndex: 0,
//     animationIterationCount: "infinite",
//     animationDirection: "alternate",
//     willChange: "transform",
//   };

//   const shapeStyles = {
//     circle: {
//       width: "3rem",
//       height: "3rem",
//       borderRadius: "50%",
//       background: "#dcdcdc",
//       animationName: "floatUpDown",
//       animationDuration: "6s",
//     },
//     triangle: {
//       width: 0,
//       height: 0,
//       borderLeft: "1.8rem solid transparent",
//       borderRight: "1.8rem solid transparent",
//       borderBottom: "3rem solid #dcdcdc",
//       animationName: "floatLeftRight",
//       animationDuration: "5s",
//     },
//     square: {
//       width: "3.5rem",
//       height: "3.5rem",
//       background: "#dcdcdc",
//       animationName: "floatUpDown",
//       animationDuration: "7s",
//     },
//     pentagon: {
//       width: "3.5rem",
//       height: "3.5rem",
//       background: "#dcdcdc",
//       clipPath: "polygon(50% 0%, 95% 35%, 77% 90%, 23% 90%, 5% 35%)",
//       animationName: "floatLeftRight",
//       animationDuration: "6.5s",
//     },
//     diamond: {
//       width: "3rem",
//       height: "3rem",
//       background: "#dcdcdc",
//       transform: "rotate(45deg)",
//       animationName: "floatUpDown",
//       animationDuration: "5.5s",
//     },
//     ellipse: {
//       width: "4rem",
//       height: "2.5rem",
//       background: "#dcdcdc",
//       borderRadius: "50% / 100%",
//       animationName: "floatLeftRight",
//       animationDuration: "6s",
//     },
//     hexagon: {
//       width: "3.5rem",
//       height: "3.5rem",
//       background: "#dcdcdc",
//       clipPath: "polygon(25% 5%, 75% 5%, 100% 50%, 75% 95%, 25% 95%, 0% 50%)",
//       animationName: "floatUpDown",
//       animationDuration: "6.5s",
//     },
//   };

//   const shapePositions = [
//     { top: "0.5rem", left: "0.5rem" },
//     { bottom: "0.5rem", right: "0.5rem" },
//   ];

//   return (
//     <>
//       <style>
//         {`
//           @keyframes floatUpDown {
//             0% { transform: translateY(0); }
//             100% { transform: translateY(6px); }
//           }
//           @keyframes floatLeftRight {
//             0% { transform: translateX(0); }
//             100% { transform: translateX(6px); }
//           }
//         `}
//       </style>

//       <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 px-3 sm:px-4 md:px-5 mb-4">
//         {cards.map((item, idx) => (
//           <div
//             key={idx}
//             className="group cursor-pointer relative p-3 sm:p-4 rounded-lg bg-white
//               transition duration-200 ease-in-out hover:bg-[#26a69a] hover:scale-[1.03] min-w-[220px]"
//             onMouseEnter={() => setHoveredCard(idx)}
//             onMouseLeave={() => setHoveredCard(null)}
//           >
//             {/* Text */}
//             <div className="z-10">
//               <div className="text-[#084e54] text-lg font-semibold mb-1 group-hover:text-white truncate">
//                 {item.label}
//               </div>
//               <div className="text-2xl font-bold mb-1 text-[#084e54] group-hover:text-white">
//                 {item.value}
//               </div>
//               <div className="text-sm text-[#1d4d4f] group-hover:text-white truncate">
//                 {userData ? "" : "Loading..."}
//               </div>
//             </div>

//             {/* Icon with dark background */}
//             <div
//               className="absolute right-4 top-1/2 transform -translate-y-1/2 w-16 h-16 rounded-full flex items-center justify-center z-10 transition-all duration-300"
//               style={{ backgroundColor: item.iconBg }}
//             >
//               <img
//                 src={hoveredCard === idx ? item.hoverImage : item.image}
//                 alt={item.label}
//                 className="w-20 h-20 object-contain opacity-80 group-hover:opacity-100 transition-opacity duration-200"
//               />
//             </div>

//             {/* Decorative Shapes */}
//             {item.shapes.map((shape, i) => (
//               <div
//                 key={i}
//                 className={`shape-${shape}`}
//                 style={{
//                   ...shapeBaseStyles,
//                   ...shapeStyles[shape],
//                   ...shapePositions[i],
//                 }}
//               />
//             ))}
//           </div>
//         ))}
//       </div>
//     </>
//   );
// };

// export default TopCards;




// export default function DashboardCards() {
//   const cardData = [
//     {
//       label: "Total Coins",
//       value: "₹ 0.00",
//       svgBg: (
//         <svg
//           className="absolute right-[-20px] bottom-[-20px] w-32 h-32 text-yellow-400 opacity-20"
//           fill="currentColor"
//           viewBox="0 0 24 24"
//         >
//           <path d="M12 1C5 1 1 5 1 12s4 11 11 11 11-4 11-11S19 1 12 1zm0 20c-5 0-9-4-9-9s4-9 9-9 9 4 9 9-4 9-9 9z" />
//         </svg>
//       ),
//     },
//     {
//       label: "Wallet Balance",
//       value: "₹ 0.00",
//       svgBg: (
//         <svg
//           className="absolute right-[-20px] bottom-[-20px] w-32 h-32 text-green-500 opacity-20"
//           fill="currentColor"
//           viewBox="0 0 24 24"
//         >
//           <path d="M21 7H3V5c0-1.1.9-2 2-2h14a2 2 0 012 2v2zm-1 3H4v9c0 1.1.9 2 2 2h12a2 2 0 002-2v-9zm-4 4a1 1 0 100-2 1 1 0 000 2z" />
//         </svg>
//       ),
//     },
//     {
//       label: "Available Balance",
//       value: "₹ 0.00",
//       svgBg: (
//         <svg
//           className="absolute right-[-20px] bottom-[-20px] w-32 h-32 text-blue-400 opacity-20"
//           fill="currentColor"
//           viewBox="0 0 24 24"
//         >
//           <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm1 15h-2v-2h2v2zm1.07-7.75l-.9.92C12.45 10.9 12 11.5 12 13h-2v-.5c0-.8.45-1.5 1.17-2.08l1.24-1.26A2 2 0 0012 7a2 2 0 00-2 2H8a4 4 0 018 0c0 1.1-.45 2.1-1.17 2.75z" />
//         </svg>
//       ),
//     },
//     {
//       label: "Referral Earnings",
//       value: "₹ 0.00",
//       svgBg: (
//         <svg
//           className="absolute right-[-20px] bottom-[-20px] w-32 h-32 text-pink-500 opacity-20"
//           fill="currentColor"
//           viewBox="0 0 24 24"
//         >
//           <path d="M13 12h7v2h-7v3l-5-4 5-4v3zM6 4h14v2H6v14H4V6a2 2 0 012-2z" />
//         </svg>
//       ),
//     },
//     {
//       label: "Active Members",
//       value: "0",
//       svgBg: (
//         <svg
//           className="absolute right-[-20px] bottom-[-20px] w-32 h-32 text-teal-400 opacity-20"
//           fill="currentColor"
//           viewBox="0 0 24 24"
//         >
//           <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5s-3 1.34-3 3 1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5C15 14.17 10.33 13 8 13zM16 13c-.29 0-.62.02-.97.05C16.16 13.78 18 14.84 18 16.5V19h4v-2.5c0-2.33-4.67-3.5-6-3.5z" />
//         </svg>
//       ),
//     },
//     {
//       label: "Withdrawal Amount",
//       value: "₹ 0.00",
//       svgBg: (
//         <svg
//           className="absolute right-[-20px] bottom-[-20px] w-32 h-32 text-red-400 opacity-20"
//           fill="currentColor"
//           viewBox="0 0 24 24"
//         >
//           <path d="M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6s-2.69 6-6 6v2c4.42 0 8-3.58 8-8s-3.58-8-8-8zM6 13c0-1.1.9-2 2-2h4v2H8v2h4v2H8c-1.1 0-2-.9-2-2z" />
//         </svg>
//       ),
//     },
//     {
//       label: "Super Bonus",
//       value: "₹ 0.00",
//       svgBg: (
//         <svg
//           className="absolute right-[-20px] bottom-[-20px] w-32 h-32 text-purple-500 opacity-20"
//           fill="currentColor"
//           viewBox="0 0 24 24"
//         >
//           <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
//         </svg>
//       ),
//     },
//   ];

//   return (
//     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-4">
//       {cardData.map((card, index) => (
//         <div
//           key={index}
//           className="relative bg-white rounded-2xl shadow-lg px-5 py-6 overflow-hidden transform transition duration-300 ease-in-out hover:shadow-2xl hover:-translate-y-1"
//         >
//           {/* SVG Background */}
//           {card.svgBg}

//           {/* Foreground content */}
//           <div className="relative z-10">
//             <p className="text-sm font-semibold text-gray-500">{card.label}</p>
//             <h3 className="text-2xl font-bold text-gray-800 mt-1">{card.value}</h3>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }



// import React, { useEffect, useState, useContext } from "react";
// import { useUserDataQuery } from "../DashboardApliSlice";
// import { MyContext } from "../../../../../Authentication/AuthContext";

// export default function DashboardCards() {
//   const [isTokenVerified, setIsTokenVerified] = useState(false);
//   const [currencySymbol, setCurrencySymbol] = useState("₹");
//   const token = localStorage.getItem("token");

//   const { data: userData, refetch } = useUserDataQuery(undefined, {
//     skip: !isTokenVerified,
//   });

//   useEffect(() => {
//     if (token) setIsTokenVerified(true);
//   }, [token]);

//   useEffect(() => {
//     if (isTokenVerified) refetch();
//   }, [isTokenVerified, refetch]);

//   useEffect(() => {
//     const code = userData?.data?.countryCode;
//     setCurrencySymbol(code !== 91 ? "$" : "₹");
//   }, [userData]);

//   const formatValue = (val, type = "currency") => {
//     if (val === undefined || val === null) return "Loading...";
//     if (type === "currency") return `${currencySymbol}${Number(val).toFixed(2)}`;
//     if (type === "coin") return Number(val).toFixed(3);
//     return val;
//   };

//   const cardData = [
//     {
//       label: "Total Coins",
//       value: formatValue(userData?.data?.tokens, "coin"),
//       svgColor: "text-yellow-400",
//       path: "M12 1C5 1 1 5 1 12s4 11 11 11 11-4 11-11S19 1 12 1zm0 20c-5 0-9-4-9-9s4-9 9-9 9 4 9 9-4 9-9 9z",
//     },
//     {
//       label: "Wallet Balance",
//       value: formatValue(userData?.data?.walletBalance),
//       svgColor: "text-green-500",
//       path: "M21 7H3V5c0-1.1.9-2 2-2h14a2 2 0 012 2v2zm-1 3H4v9c0 1.1.9 2 2 2h12a2 2 0 002-2v-9zm-4 4a1 1 0 100-2 1 1 0 000 2z",
//     },
//     {
//       label: "Available Balance",
//       value: formatValue(userData?.data?.Inr),
//       svgColor: "text-blue-400",
//       path: "M12 2a10 10 0 100 20 10 10 0 000-20zm1 15h-2v-2h2v2zm1.07-7.75l-.9.92C12.45 10.9 12 11.5 12 13h-2v-.5c0-.8.45-1.5 1.17-2.08l1.24-1.26A2 2 0 0012 7a2 2 0 00-2 2H8a4 4 0 018 0c0 1.1-.45 2.1-1.17 2.75z",
//     },
//     {
//       label: "Referral Earnings",
//       value: formatValue(userData?.data?.referenceInr),
//       svgColor: "text-pink-500",
//       path: "M13 12h7v2h-7v3l-5-4 5-4v3zM6 4h14v2H6v14H4V6a2 2 0 012-2z",
//     },
//     {
//       label: "Active Members",
//       value: userData?.data?.activeUsers ?? "Loading...",
//       svgColor: "text-teal-400",
//       path: "M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5s-3 1.34-3 3 1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5C15 14.17 10.33 13 8 13zM16 13c-.29 0-.62.02-.97.05C16.16 13.78 18 14.84 18 16.5V19h4v-2.5c0-2.33-4.67-3.5-6-3.5z",
//     },
//     {
//       label: "Withdrawal Amount",
//       value: formatValue(userData?.data?.withdrawalAmount),
//       svgColor: "text-red-400",
//       path: "M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6s-2.69 6-6 6v2c4.42 0 8-3.58 8-8s-3.58-8-8-8zM6 13c0-1.1.9-2 2-2h4v2H8v2h4v2H8c-1.1 0-2-.9-2-2z",
//     },
//     {
//       label: "Super Bonus",
//       value: formatValue(userData?.data?.super_bonus),
//       svgColor: "text-purple-500",
//       path: "M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z",
//     },
//   ];

//   return (
//     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 p-4">
//   {cardData.map((card, index) => (
//     <div
//       key={index}
//       className="relative bg-white rounded-2xl shadow-md px-6 py-6 overflow-hidden transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-1 group"
//     >
//       {/* SVG Background */}
//       <svg
//         className={`absolute right-[-20px] bottom-[-20px] w-32 h-32 ${card.svgColor} opacity-20`}
//         fill="currentColor"
//         viewBox="0 0 24 24"
//       >
//         <path d={card.path} />
//       </svg>

//       {/* Foreground */}
//       <div className="relative z-10">
//         <p className="text-xl font-extrabold text-gray-800 group-hover:text-gray-600">
//           {card.label}
//         </p>
//         <h3 className="text-xl font-semibold text-gray-500 mt-1 group-hover:text-black transition">
//           {card.value}
//         </h3>
//       </div>
//     </div>
//   ))}
// </div>

//   );
// }


import React, { useEffect, useState } from "react";

export default function DashboardCards() {
  const [isTokenVerified, setIsTokenVerified] = useState(true);
  const [currencySymbol, setCurrencySymbol] = useState("₹");

  // Mock data for demonstration
  const mockUserData = {
    data: {
      tokens: 1234.567,
      walletBalance: 5678.90,
      Inr: 3456.78,
      referenceInr: 890.12,
      activeUsers: 42,
      withdrawalAmount: 1200.00,
      super_bonus: 345.67,
      countryCode: 91
    }
  };

  const formatValue = (val, type = "currency") => {
    if (val === undefined || val === null) return "Loading...";
    if (type === "currency") return `${currencySymbol}${Number(val).toFixed(2)}`;
    if (type === "coin") return Number(val).toFixed(3);
    return val;
  };

  const cardData = [
    {
      label: "Total Coins",
      value: formatValue(mockUserData?.data?.tokens, "coin"),
      svgColor: "text-yellow-400",
      path: "M12 1C5 1 1 5 1 12s4 11 11 11 11-4 11-11S19 1 12 1zm0 20c-5 0-9-4-9-9s4-9 9-9 9 4 9 9-4 9-9 9z",
    },
    {
      label: "Wallet Balance",
      value: formatValue(mockUserData?.data?.walletBalance),
      svgColor: "text-green-500",
      path: "M21 7H3V5c0-1.1.9-2 2-2h14a2 2 0 012 2v2zm-1 3H4v9c0 1.1.9 2 2 2h12a2 2 0 002-2v-9zm-4 4a1 1 0 100-2 1 1 0 000 2z",
    },
    {
      label: "Available Balance",
      value: formatValue(mockUserData?.data?.Inr),
      svgColor: "text-blue-400",
      path: "M12 2a10 10 0 100 20 10 10 0 000-20zm1 15h-2v-2h2v2zm1.07-7.75l-.9.92C12.45 10.9 12 11.5 12 13h-2v-.5c0-.8.45-1.5 1.17-2.08l1.24-1.26A2 2 0 0012 7a2 2 0 00-2 2H8a4 4 0 018 0c0 1.1-.45 2.1-1.17 2.75z",
    },
    {
      label: "Referral Earnings",
      value: formatValue(mockUserData?.data?.referenceInr),
      svgColor: "text-pink-500",
      path: "M13 12h7v2h-7v3l-5-4 5-4v3zM6 4h14v2H6v14H4V6a2 2 0 012-2z",
    },
    {
      label: "Active Members",
      value: mockUserData?.data?.activeUsers ?? "Loading...",
      svgColor: "text-teal-400",
      path: "M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5s-3 1.34-3 3 1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5C15 14.17 10.33 13 8 13zM16 13c-.29 0-.62.02-.97.05C16.16 13.78 18 14.84 18 16.5V19h4v-2.5c0-2.33-4.67-3.5-6-3.5z",
    },
    {
      label: "Withdrawal Amount",
      value: formatValue(mockUserData?.data?.withdrawalAmount),
      svgColor: "text-red-400",
      path: "M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6s-2.69 6-6 6v2c4.42 0 8-3.58 8-8s-3.58-8-8-8zM6 13c0-1.1.9-2 2-2h4v2H8v2h4v2H8c-1.1 0-2-.9-2-2z",
    },
    {
      label: "Super Bonus",
      value: formatValue(mockUserData?.data?.super_bonus),
      svgColor: "text-purple-500",
      path: "M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 p-4">
      {cardData.map((card, index) => (
        <div
          key={index}
          className="relative bg-white rounded-2xl shadow-md px-6 py-6 overflow-hidden transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-1 group"
        >
          {/* SVG Background */}
          <svg
            className={`absolute right-[-20px] bottom-[-20px] w-32 h-32 ${card.svgColor} opacity-20`}
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d={card.path} />
          </svg>

          {/* Foreground */}
          <div className="relative z-10">
            <p className="text-xl font-extrabold text-gray-800 group-hover:text-gray-600">
              {card.label}
            </p>
            <h3 className="text-xl font-semibold text-gray-500 mt-1 group-hover:text-black transition">
              {card.value}
            </h3>
          </div>
        </div>
      ))}
    </div>
  );
}