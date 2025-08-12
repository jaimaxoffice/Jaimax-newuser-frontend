// import React, { useState, useEffect, useContext } from "react";
// import assets from "../../../../../assets/assets";
// import { useUserDataQuery } from "../DashboardApliSlice";
// import Cookies from "js-cookie";

// const TopCards = () => {
//   const [hoveredCard, setHoveredCard] = useState(null);
//   const [isTokenVerified, setIsTokenVerified] = useState(false);
//   const [currency, setCurrency] = useState("");
//   const [currencySymbol, setCurrencySymbol] = useState("");
//   const token = Cookies.get("token");

//   const { data: userData, refetch } = useUserDataQuery(undefined, {
//     skip: !isTokenVerified,
//   });

//   useEffect(() => {
//     const verifyToken = async () => {
//       if (!token) {
//         return;
//       }
//       setIsTokenVerified(true);
//     };
//     verifyToken();
//   }, [token]);

//   useEffect(() => {
//     setCurrency(userData && userData?.data?.countryCode === 91 ? "INR" : "USD");

//     if (userData && userData?.data?.countryCode !== 91) {
//       setCurrencySymbol("$");
//     } else if (userData && userData?.data?.countryCode === 91) {
//       setCurrencySymbol("₹");
//     }
//   }, [userData?.data?.countryCode]);

//   useEffect(() => {
//     if (isTokenVerified) {
//       refetch();
//     }
//   }, [isTokenVerified, refetch]);
//   const cards = [
//     {
//       label: "Total Coins",
//       value: userData?.data?.tokens
//         ? Number(userData.data.tokens).toFixed(3)
//         : "0.000",
//       image: assets.totalCoins1,
//       hoverImage: assets.totalCoins,
//       shapes: ["circle", "triangle"],
//       iconBg: "#e0f2f1",
//     },
//     {
//       label: "Wallet Balance",
//       value: `${currencySymbol}${Number(
//         userData?.data?.walletBalance || 0
//       ).toFixed(2)}`,
//       image: assets.walletBal,
//       hoverImage: assets.walletBal1,
//       shapes: ["square", "diamond"],
//       iconBg: "#e8f5e8",
//     },
//     {
//       label: "Available Balance",
//       value: `${currencySymbol}${Number(userData?.data?.Inr || 0).toFixed(2)}`,
//       image: assets.available,
//       hoverImage: assets.available1,
//       shapes: ["pentagon", "ellipse"],
//       iconBg: "#fff3e0",
//     },
//     {
//       label: "Referral Earnings",
//       value: `${currencySymbol}${Number(
//         userData?.data?.referenceInr || 0
//       ).toFixed(2)}`,
//       image: assets.referal,
//       hoverImage: assets.referal1,
//       shapes: ["hexagon", "circle"],
//       iconBg: "#f3e5f5",
//     },
//     {
//       label: "Active Members",
//       value: userData?.data?.activeUsers
//         ? userData.data.activeUsers.toString()
//         : "0",
//       image: assets.activememo,
//       hoverImage: assets.activememo1,
//       shapes: ["triangle", "square"],
//       iconBg: "#e3f2fd",
//     },
//     {
//       label: "Withdrawal Amount",
//       value: `${currencySymbol}${Number(
//         userData?.data?.withdrawalAmount || 0
//       ).toFixed(2)}`,
//       image: assets.withdraw,
//       hoverImage: assets.withdraw1,
//       shapes: ["diamond", "pentagon"],
//       iconBg: "#fce4ec",
//     },
//     {
//       label: "Super Bonus",
//       value: `${currencySymbol}${Number(
//         userData?.data?.super_bonus || 0
//       ).toFixed(2)}`,
//       image: assets.superBonus,
//       hoverImage: assets.superBonus1,
//       shapes: ["ellipse", "hexagon"],
//       iconBg: "#f1f8e9",
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

//       <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 px-1 sm:px-4 md:px-2 mb-0">
//         {cards.map((item, idx) => (
//           <div
//             key={idx}
//             className="group cursor-pointer relative p-3 sm:p-4 rounded-lg bg-white
//               transition duration-200 ease-in-out hover:bg-[#26a69a] hover:scale-[1.03] min-w-[220px]"
//             onMouseEnter={() => setHoveredCard(idx)}
//             onMouseLeave={() => setHoveredCard(null)}
//           >
//             {/* Text */}
//             <div className="z-10 relative">
//               <div className="text-[#084e54] text-sm font-bold mb-1 group-hover:text-white truncate">
//                 {item.label}
//               </div>
//               <div className="text-xl font-semibold mb-1 text-[#084e54] group-hover:text-white">
//                 {item.value}
//               </div>
//             </div>

//             {/* Icon with background */}
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
import React, { useState, useEffect, useCallback, useMemo } from "react";
import assets from "../../../../../assets/assets";
import { useUserDataQuery } from "../DashboardApliSlice";
import Cookies from "js-cookie";

// Memoize the shape styles to prevent recreation on each render
const shapeBaseStyles = {
  position: "absolute",
  opacity: 0.18,
  pointerEvents: "none",
  transition: "opacity 0.3s ease, transform 3s ease-in-out",
  zIndex: 0,
  animationIterationCount: "infinite",
  animationDirection: "alternate",
  willChange: "transform",
};

const shapeStyles = {
  circle: {
    width: "3rem",
    height: "3rem",
    borderRadius: "50%",
    background: "#dcdcdc",
    animationName: "floatUpDown",
    animationDuration: "6s",
  },
  triangle: {
    width: 0,
    height: 0,
    borderLeft: "1.8rem solid transparent",
    borderRight: "1.8rem solid transparent",
    borderBottom: "3rem solid #dcdcdc",
    animationName: "floatLeftRight",
    animationDuration: "5s",
  },
  square: {
    width: "3.5rem",
    height: "3.5rem",
    background: "#dcdcdc",
    animationName: "floatUpDown",
    animationDuration: "7s",
  },
  pentagon: {
    width: "3.5rem",
    height: "3.5rem",
    background: "#dcdcdc",
    clipPath: "polygon(50% 0%, 95% 35%, 77% 90%, 23% 90%, 5% 35%)",
    animationName: "floatLeftRight",
    animationDuration: "6.5s",
  },
  diamond: {
    width: "3rem",
    height: "3rem",
    background: "#dcdcdc",
    transform: "rotate(45deg)",
    animationName: "floatUpDown",
    animationDuration: "5.5s",
  },
  ellipse: {
    width: "4rem",
    height: "2.5rem",
    background: "#dcdcdc",
    borderRadius: "50% / 100%",
    animationName: "floatLeftRight",
    animationDuration: "6s",
  },
  hexagon: {
    width: "3.5rem",
    height: "3.5rem",
    background: "#dcdcdc",
    clipPath: "polygon(25% 5%, 75% 5%, 100% 50%, 75% 95%, 25% 95%, 0% 50%)",
    animationName: "floatUpDown",
    animationDuration: "6.5s",
  },
};

// Memoize shape positions
const shapePositions = [
  { top: "0.5rem", left: "0.5rem" },
  { bottom: "0.5rem", right: "0.5rem" },
];

// Memoized CardItem component to prevent unnecessary re-renders
const CardItem = React.memo(({ item, index, hoveredCard, setHoveredCard }) => {
  return (
    <div
      className="group cursor-pointer relative p-3 sm:p-4 rounded-lg bg-white
        transition duration-200 ease-in-out hover:bg-[#26a69a] hover:scale-[1.03] min-w-[220px]"
      onMouseEnter={() => setHoveredCard(index)}
      onMouseLeave={() => setHoveredCard(null)}
    >
      {/* Text */}
      <div className="z-10 relative">
        <div className="text-[#084e54] text-sm font-bold mb-1 group-hover:text-white truncate">
          {item.label}
        </div>
        <div className="text-xl font-semibold mb-1 text-[#084e54] group-hover:text-white">
          {item.value}
        </div>
      </div>

      {/* Icon with background */}
      <div
        className="absolute right-4 top-1/2 transform -translate-y-1/2 w-16 h-16 rounded-full flex items-center justify-center z-10 transition-all duration-300"
        style={{ backgroundColor: item.iconBg }}
      >
        <img
          src={hoveredCard === index ? item.hoverImage : item.image}
          alt={item.label}
          className="w-20 h-20 object-contain opacity-80 group-hover:opacity-100 transition-opacity duration-200"
        />
      </div>

      {/* Decorative Shapes */}
      {item.shapes.map((shape, i) => (
        <div
          key={i}
          className={`shape-${shape}`}
          style={{
            ...shapeBaseStyles,
            ...shapeStyles[shape],
            ...shapePositions[i],
          }}
        />
      ))}
    </div>
  );
});

CardItem.displayName = "CardItem";

// Main component with React.memo to prevent unnecessary re-renders
const TopCards = React.memo(() => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [isTokenVerified, setIsTokenVerified] = useState(false);
  const [currency, setCurrency] = useState("");
  const [currencySymbol, setCurrencySymbol] = useState("");
  const token = Cookies.get("token");

  const { data: userData, refetch } = useUserDataQuery(undefined, {
    skip: !isTokenVerified,
  });

  // Use useCallback for event handlers
  const handleSetHoveredCard = useCallback((index) => {
    setHoveredCard(index);
  }, []);

  // Verify token only once
  useEffect(() => {
    if (token) {
      setIsTokenVerified(true);
    }
  }, [token]);

  // Set currency and symbol based on country code
  useEffect(() => {
    if (userData) {
      const isIndian = userData?.data?.countryCode === 91;
      setCurrency(isIndian ? "INR" : "USD");
      setCurrencySymbol(isIndian ? "₹" : "$");
    }
  }, [userData?.data?.countryCode]);

  // Fetch data when token is verified
  useEffect(() => {
    if (isTokenVerified) {
      refetch();
    }
  }, [isTokenVerified, refetch]);

  // Memoize the cards array to prevent recreation on each render
  const cards = useMemo(() => [
    {
      label: "Total Coins",
      value: userData?.data?.tokens
        ? Number(userData.data.tokens).toFixed(3)
        : "0.000",
      image: assets.totalCoins1,
      hoverImage: assets.totalCoins,
      shapes: ["circle", "triangle"],
      iconBg: "#e0f2f1",
    },
    {
      label: "Wallet Balance",
      value: `${currencySymbol}${Number(
        userData?.data?.walletBalance || 0
      ).toFixed(2)}`,
      image: assets.walletBal,
      hoverImage: assets.walletBal1,
      shapes: ["square", "diamond"],
      iconBg: "#e8f5e8",
    },
    {
      label: "Available Balance",
      value: `${currencySymbol}${Number(userData?.data?.Inr || 0).toFixed(2)}`,
      image: assets.available,
      hoverImage: assets.available1,
      shapes: ["pentagon", "ellipse"],
      iconBg: "#fff3e0",
    },
    {
      label: "Referral Earnings",
      value: `${currencySymbol}${Number(
        userData?.data?.referenceInr || 0
      ).toFixed(2)}`,
      image: assets.referal,
      hoverImage: assets.referal1,
      shapes: ["hexagon", "circle"],
      iconBg: "#f3e5f5",
    },
    {
      label: "Active Members",
      value: userData?.data?.activeUsers
        ? userData.data.activeUsers.toString()
        : "0",
      image: assets.activememo,
      hoverImage: assets.activememo1,
      shapes: ["triangle", "square"],
      iconBg: "#e3f2fd",
    },
    {
      label: "Withdrawal Amount",
      value: `${currencySymbol}${Number(
        userData?.data?.withdrawalAmount || 0
      ).toFixed(2)}`,
      image: assets.withdraw,
      hoverImage: assets.withdraw1,
      shapes: ["diamond", "pentagon"],
      iconBg: "#fce4ec",
    },
    {
      label: "Super Bonus",
      value: `${currencySymbol}${Number(
        userData?.data?.super_bonus || 0
      ).toFixed(2)}`,
      image: assets.superBonus,
      hoverImage: assets.superBonus1,
      shapes: ["ellipse", "hexagon"],
      iconBg: "#f1f8e9",
    },
  ], [userData, currencySymbol]);

  // Define animation styles once with useEffect
  useEffect(() => {
    const styleEl = document.createElement('style');
    styleEl.textContent = `
      @keyframes floatUpDown {
        0% { transform: translateY(0); }
        100% { transform: translateY(6px); }
      }
      @keyframes floatLeftRight {
        0% { transform: translateX(0); }
        100% { transform: translateX(6px); }
      }
    `;
    document.head.appendChild(styleEl);
    return () => document.head.removeChild(styleEl);
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 px-1 sm:px-4 md:px-2 mb-0">
      {cards.map((item, idx) => (
        <CardItem
          key={idx}
          item={item}
          index={idx}
          hoveredCard={hoveredCard}
          setHoveredCard={handleSetHoveredCard}
        />
      ))}
    </div>
  );
});

TopCards.displayName = "TopCards";

export default TopCards;