// import React, { useState, useEffect, useCallback, useMemo } from "react";
// import { useNavigate } from "react-router-dom";
// import assets from "../../../../../assets/assets";
// import { useUserDataQuery, useGetRoundQuery } from "../DashboardApliSlice";
// import Cookies from "js-cookie";

// import { useGetAnnounceQuery } from "../../Announements/AnnouncementsApiSlice";
// import { useGetAllLockedSuperbonusQuery } from "../../lockedSuperBouns/lockedSupBonusApiSlice";
// const shapeBaseStyles = {
//   position: "absolute",
//   opacity: 0.18,
//   pointerEvents: "none",
//   transition: "opacity 0.3s ease, transform 3s ease-in-out",
//   zIndex: 0,
//   animationIterationCount: "infinite",
//   animationDirection: "alternate",
//   willChange: "transform",
// };

// const shapeStyles = {
//   circle: {
//     width: "3rem",
//     height: "3rem",
//     borderRadius: "50%",
//     background: "#dcdcdc",
//     animationName: "floatUpDown",
//     animationDuration: "6s",
//   },
//   triangle: {
//     width: 0,
//     height: 0,
//     borderLeft: "1.8rem solid transparent",
//     borderRight: "1.8rem solid transparent",
//     borderBottom: "3rem solid #dcdcdc",
//     animationName: "floatLeftRight",
//     animationDuration: "5s",
//   },
//   square: {
//     width: "3.5rem",
//     height: "3.5rem",
//     background: "#dcdcdc",
//     animationName: "floatUpDown",
//     animationDuration: "7s",
//   },
//   pentagon: {
//     width: "3.5rem",
//     height: "3.5rem",
//     background: "#dcdcdc",
//     clipPath: "polygon(50% 0%, 95% 35%, 77% 90%, 23% 90%, 5% 35%)",
//     animationName: "floatLeftRight",
//     animationDuration: "6.5s",
//   },
//   diamond: {
//     width: "3rem",
//     height: "3rem",
//     background: "#dcdcdc",
//     transform: "rotate(45deg)",
//     animationName: "floatUpDown",
//     animationDuration: "5.5s",
//   },
//   ellipse: {
//     width: "4rem",
//     height: "2.5rem",
//     background: "#dcdcdc",
//     borderRadius: "50% / 100%",
//     animationName: "floatLeftRight",
//     animationDuration: "6s",
//   },
//   hexagon: {
//     width: "3.5rem",
//     height: "3.5rem",
//     background: "#dcdcdc",
//     clipPath: "polygon(25% 5%, 75% 5%, 100% 50%, 75% 95%, 25% 95%, 0% 50%)",
//     animationName: "floatUpDown",
//     animationDuration: "6.5s",
//   },
// };

// const shapePositions = [
//   { top: "0.5rem", left: "0.5rem" },
//   { bottom: "0.5rem", right: "0.5rem" },
// ];

// const CardItem = React.memo(
//   ({ item, index, hoveredCard, setHoveredCard, onViewDetails }) => {
//     return (
//       <div
//         className="group cursor-pointer relative p-3 sm:p-4 rounded-lg bg-white
//         transition duration-200 ease-in-out hover:bg-[#26a69a] hover:scale-[1.03] min-w-[220px]"
//         onMouseEnter={() => setHoveredCard(index)}
//         onMouseLeave={() => setHoveredCard(null)}
//       >
//         {/* Text */}
//         <div className="z-10 relative">
//           <div className="text-[#084e54] text-sm sm:text-base font-bold mb-1 group-hover:text-white truncate">
//             {item.alreadyUnlockedSuperBonus ? "Already Unlocked" : item.label}
//           </div>

//           <div className="text-xl font-semibold mb-1 text-[#084e54] group-hover:text-white">
//             {item.value}
//           </div>
//           {onViewDetails && (
//             <button
//               onClick={(e) => {
//                 e.stopPropagation();
//                 onViewDetails();
//               }}
//               className="mt-2 px-3 py-1.5 text-xs sm:text-sm font-medium text-white bg-[#084e54] rounded-md shadow-sm
//                  hover:bg-[#084e54] transition-all duration-300 flex items-center justify-center space-x-1"
//             >
//               <span>View Details</span>
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="h-3 w-3 sm:h-3.5 sm:w-3.5"
//                 viewBox="0 0 20 20"
//                 fill="currentColor"
//               >
//                 <path
//                   fillRule="evenodd"
//                   d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
//                   clipRule="evenodd"
//                 />
//               </svg>
//             </button>
//           )}
//         </div>

//         {/* Icon with background */}
//         <div
//           className="absolute right-4 top-1/2 transform -translate-y-1/2 w-16 h-16 rounded-full flex items-center justify-center z-10 transition-all duration-300"
//           style={{ backgroundColor: item.iconBg }}
//         >
//           <img
//             src={hoveredCard === index ? item.hoverImage : item.image}
//             alt={item.label}
//             className="w-20 h-20 object-contain opacity-80 group-hover:opacity-100 transition-opacity duration-200"
//           />
//         </div>

//         {/* Decorative Shapes */}
//         {item.shapes.map((shape, i) => (
//           <div
//             key={i}
//             className={`shape-${shape}`}
//             style={{
//               ...shapeBaseStyles,
//               ...shapeStyles[shape],
//               ...shapePositions[i],
//             }}
//           />
//         ))}
//       </div>
//     );
//   }
// );

// CardItem.displayName = "CardItem";

// const TopCards = React.memo(() => {
//   const navigate = useNavigate();
//   const {
//     data: response,
//     isLoading,
//     isError,
//   } = useGetAllLockedSuperbonusQuery();

//   const [hoveredCard, setHoveredCard] = useState(null);
//   const [isTokenVerified, setIsTokenVerified] = useState(false);
//   const [currency, setCurrency] = useState("");
//   const [currencySymbol, setCurrencySymbol] = useState("");
//   const token = Cookies.get("token");
//   const { data: apiData, refetch: refetchRounds } = useGetRoundQuery();
//   const { data: userData, refetch } = useUserDataQuery(undefined, {
//     skip: !isTokenVerified,
//   });
//   const {
//     data: announceData,
//     Loading,
//     Error,
//   } = useGetAnnounceQuery(
//     undefined, // No parameters needed
//     {
//       skip: !apiData?.data?.isActiveAnnouncement, // Skip the query when not active
//     }
//   );

//   const handleNavigateToSuperbonus = useCallback(() => {
//     navigate("/locked-superbonus");
//   }, [navigate]);

//   const handleSetHoveredCard = useCallback((index) => {
//     setHoveredCard(index);
//   }, []);

//   // Verify token only once
//   useEffect(() => {
//     if (token) {
//       setIsTokenVerified(true);
//     }
//   }, [token]);

//   // Set currency and symbol based on country code
//   useEffect(() => {
//     if (userData) {
//       const isIndian = userData?.data?.countryCode === 91;
//       setCurrency(isIndian ? "INR" : "USD");
//       setCurrencySymbol(isIndian ? "₹" : "$");
//     }
//   }, [userData?.data?.countryCode]);

//   // Fetch data when token is verified
//   useEffect(() => {
//     if (isTokenVerified) {
//       refetch();
//     }
//   }, [isTokenVerified, refetch]);

//   // Memoize the cards array to prevent recreation on each render
//   const cards = useMemo(
//     () => [
//       {
//         label: "Total Coins",
//         value: userData?.data?.tokens
//           ? Number(userData.data.tokens).toFixed(3)
//           : "0.000",
//         image: assets.totalCoins1,
//         hoverImage: assets.totalCoins,
//         shapes: ["circle", "triangle"],
//         iconBg: "#e0f2f1",
//       },
//       {
//         label: "Wallet Balance",
//         value: `${currencySymbol}${Number(
//           userData?.data?.walletBalance || 0
//         ).toFixed(2)}`,
//         image: assets.walletBal,
//         hoverImage: assets.walletBal1,
//         shapes: ["square", "diamond"],
//         iconBg: "#e8f5e8",
//       },
//       {
//         label: "Available Balance",
//         value: `${currencySymbol}${Number(userData?.data?.Inr || 0).toFixed(
//           2
//         )}`,
//         image: assets.available,
//         hoverImage: assets.available1,
//         shapes: ["pentagon", "ellipse"],
//         iconBg: "#fff3e0",
//       },
//       {
//         label: "Referral Earnings",
//         value: `${currencySymbol}${Number(
//           userData?.data?.referenceInr || 0
//         ).toFixed(2)}`,
//         image: assets.referal,
//         hoverImage: assets.referal1,
//         shapes: ["hexagon", "circle"],
//         iconBg: "#f3e5f5",
//       },
//       {
//         label: "Guanranteed Wealth plan",
//         value: userData?.data?.totalWealthPlanCollectedAmount
//           ? userData.data.totalWealthPlanCollectedAmount.toString()
//           : "0",
//         image: assets.activememo,
//         hoverImage: assets.activememo1,
//         shapes: ["triangle", "square"],
//         iconBg: "#e3f2fd",
//       },
//       {
//         label: "Withdrawal Amount",
//         value: `${currencySymbol}${Number(
//           userData?.data?.withdrawalAmount || 0
//         ).toFixed(2)}`,
//         image: assets.withdraw,
//         hoverImage: assets.withdraw1,
//         shapes: ["diamond", "pentagon"],
//         iconBg: "#fce4ec",
//       },
//       // {
//       //   label: "Locked Superbonus",
//       //   value: `${currencySymbol}${Number(
//       //     response?.data?.amountToWithdrwSuperBonus || 0
//       //   ).toFixed(2)}`,
//       //   image: assets.withdraw,
//       //   hoverImage: assets.withdraw1,
//       //   shapes: ["diamond", "pentagon"],
//       //   iconBg: "#fce4ec",
//       //   hasViewButton: true,
//       //   alreadyUnlockedSuperBonus:
//       //     response?.data?.alreadyUnlockedSuperBonus || false,
//       // },
//       {
//         label:
//           userData?.data?.lockedSuperBonusInfo?.tempBonusReleased?.stage1 &&
//           userData?.data?.lockedSuperBonusInfo?.tempBonusReleased?.stage2 &&
//           userData?.data?.lockedSuperBonusInfo?.tempBonusReleased?.stage3
//             ? "Super Bonus Completed"
//             : "Locked Superbonus",
//         value:
//           userData?.data?.lockedSuperBonusInfo?.tempBonusReleased?.stage1 &&
//           userData?.data?.lockedSuperBonusInfo?.tempBonusReleased?.stage2 &&
//           userData?.data?.lockedSuperBonusInfo?.tempBonusReleased?.stage3
//             ? `✅ Congratulations! Claimed: ${currencySymbol}${Number(
//                 userData?.data?.lockedSuperBonusInfo?.totalReleased || 0
//               ).toFixed(2)}`
//             : `${currencySymbol}${Number(
//                 userData?.data?.lockedSuperBonusInfo?.totalReleased || 0
//               ).toFixed(2)} Locked`,
//         image: assets.withdraw,
//         hoverImage: assets.withdraw1,
//         shapes: ["diamond", "pentagon"],
//         iconBg: "#fce4ec",
//         hasViewButton: !(
//           userData?.data?.lockedSuperBonusInfo?.tempBonusReleased?.stage1 &&
//           userData?.data?.lockedSuperBonusInfo?.tempBonusReleased?.stage2 &&
//           userData?.data?.lockedSuperBonusInfo?.tempBonusReleased?.stage3
//         ),
//       },

//       {
//         label: "Super Bonus",
//         value: `${currencySymbol}${Number(
//           userData?.data?.super_bonus || 0
//         ).toFixed(2)}`,
//         image: assets.superBonus,
//         hoverImage: assets.superBonus1,
//         shapes: ["ellipse", "hexagon"],
//         iconBg: "#f1f8e9",
//       },
//     ],
//     [userData, currencySymbol, response?.data?.amountToWithdrwSuperBonus]
//   );

//   // Define animation styles once with useEffect
//   useEffect(() => {
//     const styleEl = document.createElement("style");
//     styleEl.textContent = `
//       @keyframes floatUpDown {
//         0% { transform: translateY(0); }
//         100% { transform: translateY(6px); }
//       }
//       @keyframes floatLeftRight {
//         0% { transform: translateX(0); }
//         100% { transform: translateX(6px); }
//       }
//     `;
//     document.head.appendChild(styleEl);
//     return () => document.head.removeChild(styleEl);
//   }, []);

//   return (
//     <>
//       <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 px-1 sm:px-4 md:px-2 mb-0">
//         {cards.map((item, idx) => (
//           <CardItem
//             key={idx}
//             item={item}
//             index={idx}
//             hoveredCard={hoveredCard}
//             setHoveredCard={handleSetHoveredCard}
//             onViewDetails={
//               item.hasViewButton ? handleNavigateToSuperbonus : null
//             }
//           />
//         ))}
//       </div>
//     </>
//   );
// });

// TopCards.displayName = "TopCards";

// export default TopCards;
import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import assets from "../../../../../assets/assets";
import { useUserDataQuery, useGetRoundQuery } from "../DashboardApliSlice";
import Cookies from "js-cookie";

import { useGetAnnounceQuery } from "../../Announements/AnnouncementsApiSlice";
import { useGetAllLockedSuperbonusQuery } from "../../lockedSuperBouns/lockedSupBonusApiSlice";

const CardItem = React.memo(
  ({ item, index, hoveredCard, setHoveredCard, onViewDetails }) => {
    const isCompleted = item.isCompleted;
    const isHovered = hoveredCard === index;

    return (
      <div
        className={`group cursor-pointer relative rounded-lg overflow-hidden
        transition-all duration-300 ease-in-out
        ${isHovered ? "shadow-xl scale-[1.02]" : "shadow-md"}
        ${isCompleted ? "bg-gradient-to-br from-green-50 to-emerald-50" : "bg-white"}
        border ${isCompleted ? "border-green-300" : "border-gray-100"}
        hover:border-[#26a69a]`}
        onMouseEnter={() => setHoveredCard(index)}
        onMouseLeave={() => setHoveredCard(null)}
      >
        {/* Gradient Overlay on Hover */}
        <div
          className={`absolute inset-0 bg-gradient-to-br from-[#26a69a] to-[#084e54] 
          transition-opacity duration-300 ${isHovered ? "opacity-100" : "opacity-0"}`}
        />

        {/* Content Container */}
        <div className="relative z-10 p-4">
          <div className="flex items-center justify-between gap-3">
            {/* Left Side - Text Content */}
            <div className="flex-1 min-w-0">
              {/* Label */}
              <div
                className={`text-xs font-semibold mb-1.5 line-clamp-1
                transition-colors duration-300
                ${isHovered ? "text-white" : isCompleted ? "text-green-700" : "text-gray-600"}`}
              >
                {item.label}
              </div>

              {/* Value */}
              <div
                className={`text-xl sm:text-2xl font-bold mb-2 truncate
                transition-colors duration-300
                ${isHovered ? "text-white" : isCompleted ? "text-green-800" : "text-[#084e54]"}`}
              >
                {item.value}
              </div>

              {/* View Details Button */}
              {onViewDetails && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onViewDetails();
                  }}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-md
                    transition-all duration-300 flex items-center gap-1.5
                    ${isHovered
                      ? "bg-white text-[#084e54] hover:bg-gray-100"
                      : "bg-[#084e54] text-white hover:bg-[#26a69a]"}
                    shadow-sm hover:shadow-md`}
                >
                  <span>View Details</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-3.5 w-3.5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              )}
            </div>

            {/* Right Side - Icon */}
            <div className="flex-shrink-0">
              <div
                className={`w-14 h-14 sm:w-16 sm:h-16 rounded-xl flex items-center justify-center
                transition-all duration-300
                ${isHovered ? "scale-110 bg-white/90" : "scale-100"}`}
                style={{
                  backgroundColor: isHovered ? undefined : item.iconBg,
                }}
              >
                <img
                  src={isHovered ? item.hoverImage : item.image}
                  alt={item.label}
                  className="w-10 h-10 sm:w-12 sm:h-12 object-contain transition-all duration-300"
                />
              </div>
            </div>
          </div>

          {/* Completion Badge */}
          {isCompleted && (
            <div className="absolute top-2 right-2">
              <div className="bg-green-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                <span>✓</span>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Accent Line */}
        <div
          className={`absolute bottom-0 left-0 right-0 h-0.5 
          bg-gradient-to-r from-[#26a69a] to-[#084e54]
          transition-all duration-300
          ${isHovered ? "opacity-100" : "opacity-0"}`}
        />
      </div>
    );
  }
);

CardItem.displayName = "CardItem";

const TopCards = React.memo(() => {
  const navigate = useNavigate();
  const {
    data: response,
    isLoading,
    isError,
  } = useGetAllLockedSuperbonusQuery();

  const [hoveredCard, setHoveredCard] = useState(null);
  const [isTokenVerified, setIsTokenVerified] = useState(false);
  const [currency, setCurrency] = useState("");
  const [currencySymbol, setCurrencySymbol] = useState("");
  const token = Cookies.get("token");
  const { data: apiData, refetch: refetchRounds } = useGetRoundQuery();
  const { data: userData, refetch } = useUserDataQuery(undefined, {
    skip: !isTokenVerified,
  });
  const {
    data: announceData,
    Loading,
    Error,
  } = useGetAnnounceQuery(undefined, {
    skip: !apiData?.data?.isActiveAnnouncement,
  });

  const handleNavigateToSuperbonus = useCallback(() => {
    navigate("/locked-superbonus");
  }, [navigate]);

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

  // Check if super bonus is completed
  const isSuperBonusCompleted = useMemo(() => {
    return (
      userData?.data?.lockedSuperBonusInfo?.tempBonusReleased?.stage1 &&
      userData?.data?.lockedSuperBonusInfo?.tempBonusReleased?.stage2 &&
      userData?.data?.lockedSuperBonusInfo?.tempBonusReleased?.stage3
    );
  }, [userData?.data?.lockedSuperBonusInfo]);

  // Memoize the cards array
  const cards = useMemo(
    () => [
      {
        label: "Total Coins",
        value: userData?.data?.tokens
          ? Number(userData.data.tokens).toFixed(3)
          : "0.000",
        image: assets.totalCoins1,
        hoverImage: assets.totalCoins,
        iconBg: "#e0f2f1",
        isCompleted: false,
      },
      {
        label: "Wallet Balance",
        value: `${currencySymbol}${Number(
          userData?.data?.walletBalance || 0
        ).toFixed(2)}`,
        image: assets.walletBal,
        hoverImage: assets.walletBal1,
        iconBg: "#e8f5e8",
        isCompleted: false,
      },
      {
        label: "Available Balance",
        value: `${currencySymbol}${Number(userData?.data?.Inr || 0).toFixed(
          2
        )}`,
        image: assets.available,
        hoverImage: assets.available1,
        iconBg: "#fff3e0",
        isCompleted: false,
      },
      {
        label: "Referral Earnings",
        value: `${currencySymbol}${Number(
          userData?.data?.referenceInr || 0
        ).toFixed(2)}`,
        image: assets.referal,
        hoverImage: assets.referal1,
        iconBg: "#f3e5f5",
        isCompleted: false,
      },
      {
        label: "Guaranteed Wealth Plan",
        value: userData?.data?.totalWealthPlanCollectedAmount
          ? userData.data.totalWealthPlanCollectedAmount.toString()
          : "0",
        image: assets.activememo,
        hoverImage: assets.activememo1,
        iconBg: "#e3f2fd",
        isCompleted: false,
      },
      {
        label: "Withdrawal Amount",
        value: `${currencySymbol}${Number(
          userData?.data?.withdrawalAmount || 0
        ).toFixed(2)}`,
        image: assets.withdraw,
        hoverImage: assets.withdraw1,
        iconBg: "#fce4ec",
        isCompleted: false,
      },
      {
        label: isSuperBonusCompleted
          ? " Already Unlocked"
          : " Locked Super Bonus",
        value: isSuperBonusCompleted
          ? `${currencySymbol}${Number(
              userData?.data?.lockedSuperBonusInfo?.totalReleased || 0
            ).toFixed(2)}`
          : `${currencySymbol}${Number(
              userData?.data?.lockedSuperBonusInfo?.totalReleased || 0
            ).toFixed(2)} Locked`,
        image: assets.withdraw,
        hoverImage: assets.withdraw1,
        iconBg: isSuperBonusCompleted ? "#d4edda" : "#fce4ec",
        hasViewButton: !isSuperBonusCompleted,
        isCompleted: isSuperBonusCompleted,
      },
      {
        label: "Super Bonus",
        value: `${currencySymbol}${Number(
          userData?.data?.super_bonus || 0
        ).toFixed(2)}`,
        image: assets.superBonus,
        hoverImage: assets.superBonus1,
        iconBg: "#f1f8e9",
        isCompleted: false,
      },
    ],
    [userData, currencySymbol, isSuperBonusCompleted]
  );

  return (
    <div className="w-full px-0 sm:px-4 py-2  ">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        {cards.map((item, idx) => (
          <CardItem
            key={idx}
            item={item}
            index={idx}
            hoveredCard={hoveredCard}
            setHoveredCard={handleSetHoveredCard}
            onViewDetails={
              item.hasViewButton ? handleNavigateToSuperbonus : null
            }
          />
        ))}
      </div>
    </div>
  );
});

TopCards.displayName = "TopCards";

export default TopCards;