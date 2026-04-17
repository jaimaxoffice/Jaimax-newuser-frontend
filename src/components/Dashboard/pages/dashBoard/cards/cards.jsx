
// import React, { useState, useEffect, useCallback, useMemo } from "react";
// import { useNavigate } from "react-router-dom";
// import assets from "../../../../../assets/assets";
// import { useUserDataQuery, useGetRoundQuery, useGetBonusLogsQuery} from "../DashboardApliSlice";
// import Cookies from "js-cookie";
// import BonusLogsModal from './BonusLogsModal';
// import { useGetAnnounceQuery } from "../../Announements/AnnouncementsApiSlice";

// const CardItem = React.memo(
//   ({ item, index, hoveredCard, setHoveredCard, onViewDetails ,onClick }) => {
//     const isCompleted = item.isCompleted;
//     const isHovered = hoveredCard === index;
//     const handleClick = () => {
//     if (onClick) {
//       onClick();
//     } else if (onViewDetails) {
//       onViewDetails();
//     }
//   };

//     return (
//       <div
//         className={`group cursor-pointer relative rounded-lg overflow-hidden
//         transition-all duration-300 ease-in-out
//         ${isHovered ? "shadow-xl scale-[1.02]" : "shadow-md"}
//         ${isCompleted ? "bg-gradient-to-br from-green-50 to-emerald-50" : "bg-white"}
//         border ${isCompleted ? "border-green-300" : "border-gray-100"}
//         hover:border-[#26a69a]`}
//         onMouseEnter={() => setHoveredCard(index)}
//         onMouseLeave={() => setHoveredCard(null)}
//         onClick={handleClick}
//       >
//         {/* Gradient Overlay on Hover */}
//         <div
//           className={`absolute inset-0 bg-gradient-to-br from-[#26a69a] to-[#084e54] 
//           transition-opacity duration-300 ${isHovered ? "opacity-100" : "opacity-0"}`}
//         />

//         {/* Content Container */}
//         <div className="relative z-10 p-4">
//           <div className="flex items-center justify-between gap-3">
//             {/* Left Side - Text Content */}
//             <div className="flex-1 min-w-0">
//               {/* Label */}
//               <div
//                 className={`text-xs font-semibold mb-1.5 line-clamp-1
//                 transition-colors duration-300
//                 ${isHovered ? "text-white" : isCompleted ? "text-green-700" : "text-gray-600"}`}
//               >
//                 {item.label}
//               </div>

//               {/* Value */}
//               <div
//                 className={`text-xl sm:text-2xl font-bold mb-2 truncate
//                 transition-colors duration-300
//                 ${isHovered ? "text-white" : isCompleted ? "text-green-800" : "text-[#084e54]"}`}
//               >
//                 {item.value}
//               </div>

//               {/* View Details Button */}
//               {onViewDetails && (
//                 <button
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     onViewDetails();
//                   }}
//                   className={`px-3 py-1.5 text-xs font-semibold rounded-md
//                     transition-all duration-300 flex items-center gap-1.5
//                     ${isHovered
//                       ? "bg-white text-[#084e54] hover:bg-gray-100"
//                       : "bg-[#084e54] text-white hover:bg-[#26a69a]"}
//                     shadow-sm hover:shadow-md`}
//                 >
//                   <span>View Details</span>
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     className="h-3.5 w-3.5"
//                     viewBox="0 0 20 20"
//                     fill="currentColor"
//                   >
//                     <path
//                       fillRule="evenodd"
//                       d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
//                       clipRule="evenodd"
//                     />
//                   </svg>
//                 </button>
//               )}
//             </div>

//             {/* Right Side - Icon */}
//             <div className="flex-shrink-0">
//               <div
//                 className={`w-14 h-14 sm:w-16 sm:h-16 rounded-xl flex items-center justify-center
//                 transition-all duration-300
//                 ${isHovered ? "scale-110 bg-white/90" : "scale-100"}`}
//                 style={{
//                   backgroundColor: isHovered ? undefined : item.iconBg,
//                 }}
//               >
//                 <img
//                   src={isHovered ? item.hoverImage : item.image}
//                   alt={item.label}
//                   className="w-10 h-10 sm:w-12 sm:h-12 object-contain transition-all duration-300"
//                 />
//               </div>
//             </div>
//           </div>

//           {/* Completion Badge */}
//           {isCompleted && (
//             <div className="absolute top-2 right-2">
//               <div className="bg-green-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
//                 <span>✓</span>
//               </div>
//             </div>
//           )}
          
//         </div>

//         {/* Bottom Accent Line */}
//         <div
//           className={`absolute -bottom-10 left-0 right-0 h-0.5 
//           bg-gradient-to-r from-[#26a69a] to-[#084e54]
//           transition-all duration-300
//           ${isHovered ? "opacity-100" : "opacity-0"}`}
//         />
//         {item.isClickable && (
//           <div className="flex items-center gap-1 text-green-600 text-xs font-bold absolute bottom-2 left-4  ">
//             <span>View History</span>
//             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//             </svg>
//           </div>
//         )}
//       </div>
//     );
//   }
// );

// CardItem.displayName = "CardItem";

// const TopCards = React.memo(() => {
//   const navigate = useNavigate();

//   const [hoveredCard, setHoveredCard] = useState(null);
//   const [isTokenVerified, setIsTokenVerified] = useState(false);
//   const [currency, setCurrency] = useState("");
//   const [currencySymbol, setCurrencySymbol] = useState("");
//   const token = Cookies.get("token");
//    const [isBonusModalOpen, setIsBonusModalOpen] = useState(false);
//   const { data: apiData, refetch: refetchRounds } = useGetRoundQuery();
//   const { data: userData, refetch } = useUserDataQuery(undefined, {
//     skip: !isTokenVerified,
//   });
//   const { data: bonusLogsData } = useGetBonusLogsQuery();
//   
//   const {
//     data: announceData,
//     Loading,
//     Error,
//   } = useGetAnnounceQuery(undefined, {
//     skip: !apiData?.data?.isActiveAnnouncement,
//   });

//   const handleNavigateToSuperbonus = useCallback(() => {
//     navigate("/locked-superbonus");
//   }, [navigate]);

//   const handleSetHoveredCard = useCallback((index) => {
//     setHoveredCard(index);
//   }, []);

//   const handleOpenBonusLogs = useCallback(() => {
//     setIsBonusModalOpen(true);
//   }, []);

//   // Handler to close bonus logs modal
//   const handleCloseBonusLogs = useCallback(() => {
//     setIsBonusModalOpen(false);
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

//   // Check if super bonus is completed
//   const isSuperBonusCompleted = useMemo(() => {
//     return (
//       userData?.data?.lockedSuperBonusInfo?.tempBonusReleased?.stage1 &&
//       userData?.data?.lockedSuperBonusInfo?.tempBonusReleased?.stage2 &&
//       userData?.data?.lockedSuperBonusInfo?.tempBonusReleased?.stage3
//     );
//   }, [userData?.data?.lockedSuperBonusInfo]);

//   // Memoize the cards array
//   const cards = useMemo(
//     () => [
//       {
//         label: "Total Coins",
//         value: userData?.data?.tokens
//           ? Number(userData.data.tokens).toFixed(3)
//           : "0.000",
//         image: assets.totalCoins1,
//         hoverImage: assets.totalCoins,
//         iconBg: "#e0f2f1",
//         isCompleted: false,
//       },
//       {
//         label: "Wallet Balance",
//         value: `${currencySymbol}${Number(
//           userData?.data?.walletBalance || 0
//         ).toFixed(2)}`,
//         image: assets.walletBal,
//         hoverImage: assets.walletBal1,
//         iconBg: "#e8f5e8",
//         isCompleted: false,
//       },
//       {
//         label: "Available Balance",
//         value: `${currencySymbol}${Number(userData?.data?.Inr || 0).toFixed(
//           2
//         )}`,
//         image: assets.available,
//         hoverImage: assets.available1,
//         iconBg: "#fff3e0",
//         isCompleted: false,
//       },
//       {
//         label: "Referral Earnings",
//         value: `${currencySymbol}${Number(
//           userData?.data?.referenceInr || 0
//         ).toFixed(2)}`,
//         image: assets.referal,
//         hoverImage: assets.referal1,
//         iconBg: "#f3e5f5",
//         isCompleted: false,
//       },
//       // {
//       //   label: "Guaranteed Wealth Plan",
//       //   value: userData?.data?.totalWealthPlanCollectedAmount
//       //     ? userData.data.totalWealthPlanCollectedAmount.toString()
//       //     : "0",
//       //   image: assets.activememo,
//       //   hoverImage: assets.activememo1,
//       //   iconBg: "#e3f2fd",
//       //   isCompleted: false,
//       // },
//       {
//         label: "Withdrawal Amount",
//         value: `${currencySymbol}${Number(
//           userData?.data?.withdrawalAmount || 0
//         ).toFixed(2)}`,
//         image: assets.withdraw,
//         hoverImage: assets.withdraw1,
//         iconBg: "#fce4ec",
//         isCompleted: false,
//       },
//        {
//         label: "Super Bonus",
//         value: `${currencySymbol}${Number(
//           userData?.data?.super_bonus || 0
//         ).toFixed(2)}`,
//         image: assets.superBonus,
//         hoverImage: assets.superBonus1,
//         iconBg: "#f1f8e9",
//         isCompleted: false,
//       },
//       {
//         label: "Ref. Bonus Logs",
//         image: assets.welcomeDraw,
//         hoverImage: assets.totalCoins,
//         iconBg: "#e8f5e9",
//         isClickable: true, // Make this card clickable
//         onClick: handleOpenBonusLogs, // Add click handler
//       }


//     ],
//     [userData, currencySymbol, isSuperBonusCompleted,handleOpenBonusLogs]
//   );

//   return (
//     <div className="w-full px-0 sm:px-4 py-2  ">
//       <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
//         {cards.map((item, idx) => (
//           <CardItem
//               key={idx}
//               item={item}
//               index={idx}
//               hoveredCard={hoveredCard}
//               setHoveredCard={handleSetHoveredCard}
//               onViewDetails={
//                 item.hasViewButton ? handleNavigateToSuperbonus : null
//               }
//               onClick={item.isClickable ? item.onClick : null} // Pass click handler
//             />
//         ))}
//       </div>
//        <BonusLogsModal
//         isOpen={isBonusModalOpen}
//         onClose={handleCloseBonusLogs}
//         bonusLogsData={bonusLogsData}
//         currencySymbol={currencySymbol}
//       />
//     </div>
//   );
// });

// TopCards.displayName = "TopCards";

// export default TopCards;

import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import assets from "../../../../../assets/assets";
import { useUserDataQuery, useGetRoundQuery, useGetBonusLogsQuery } from "../DashboardApliSlice";
import Cookies from "js-cookie";
import BonusLogsModal from './BonusLogsModal';
import { useGetAnnounceQuery } from "../../Announements/AnnouncementsApiSlice";

const CardItem = React.memo(
  ({ item, index, hoveredCard, setHoveredCard, onViewDetails, onClick }) => {
    const isCompleted = item.isCompleted;
    const isHovered = hoveredCard === index;
    const isBonusCard = item.isBonusCard;

    const handleClick = () => {
      if (onClick) {
        onClick();
      } else if (onViewDetails) {
        onViewDetails();
      }
    };

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
        onClick={handleClick}
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

              {/* View Details Button - For cards with onViewDetails */}
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

              {/* View History Button - For Bonus Card */}
              {isBonusCard && (
                <button
                  className={`px-3 py-1.5 text-xs font-semibold rounded-md
                    transition-all duration-300 flex items-center gap-1.5
                    ${isHovered
                      ? "bg-white text-[#084e54] hover:bg-gray-100"
                      : "bg-[#084e54] text-white hover:bg-[#26a69a]"}
                    shadow-sm hover:shadow-md`}
                >
                  <svg 
                    className="w-3.5 h-3.5" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" 
                    />
                  </svg>
                  <span>View History</span>
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

          {/* Bonus Count Badge - Only for Bonus Card */}
          {isBonusCard && item.bonusCount > 0 && (
            <div className="absolute top-2 right-2">
              <div className={`text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1
                transition-colors duration-300
                ${isHovered ? "bg-white text-[#084e54]" : "bg-[#084e54] text-white"}`}>
                <span>{item.bonusCount} {item.bonusCount === 1 ? 'Bonus' : 'Bonuses'}</span>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Accent Line */}
        <div
          className={`absolute -bottom-10 left-0 right-0 h-0.5 
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

  const [hoveredCard, setHoveredCard] = useState(null);
  const [isTokenVerified, setIsTokenVerified] = useState(false);
  const [currency, setCurrency] = useState("");
  const [currencySymbol, setCurrencySymbol] = useState("");
  const token = Cookies.get("token");
  const [isBonusModalOpen, setIsBonusModalOpen] = useState(false);
  const { data: apiData, refetch: refetchRounds } = useGetRoundQuery();
  const { data: userData, refetch } = useUserDataQuery(undefined, {
    skip: !isTokenVerified,
  });
  const { data: bonusLogsData } = useGetBonusLogsQuery();
  // 
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

  const handleOpenBonusLogs = useCallback(() => {
    setIsBonusModalOpen(true);
  }, []);

  const handleCloseBonusLogs = useCallback(() => {
    setIsBonusModalOpen(false);
  }, []);

  useEffect(() => {
    if (token) {
      setIsTokenVerified(true);
    }
  }, [token]);

  useEffect(() => {
    if (userData) {
      const isIndian = userData?.data?.countryCode === 91;
      setCurrency(isIndian ? "INR" : "USD");
      setCurrencySymbol(isIndian ? "₹" : "$");
    }
  }, [userData?.data?.countryCode]);

  useEffect(() => {
    if (isTokenVerified) {
      refetch();
    }
  }, [isTokenVerified, refetch]);

  const isSuperBonusCompleted = useMemo(() => {
    return (
      userData?.data?.lockedSuperBonusInfo?.tempBonusReleased?.stage1 &&
      userData?.data?.lockedSuperBonusInfo?.tempBonusReleased?.stage2 &&
      userData?.data?.lockedSuperBonusInfo?.tempBonusReleased?.stage3
    );
  }, [userData?.data?.lockedSuperBonusInfo]);

  // Calculate bonus stats
  const bonusStats = useMemo(() => {
    const logs = bonusLogsData?.data || [];
    // const totalBonus = logs.reduce((sum, log) => sum + (log.amount || 0), 0);
    return {
      count: logs.length,
      // total: totalBonus
    };
  }, [bonusLogsData]);

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
        label: "Super Bonus",
        value: `${currencySymbol}${Number(
          userData?.data?.super_bonus || 0
        ).toFixed(2)}`,
        image: assets.superBonus,
        hoverImage: assets.superBonus1,
        iconBg: "#f1f8e9",
        isCompleted: false,
      },
      {
        label: "KYC Bonus Logs",
        // value: `${currencySymbol}${Number(bonusStats.total || 0).toFixed(2)}`,
        image: assets.welcomeDraw,
        hoverImage: assets.totalCoins,
        iconBg: "#e0f2f1",
        isBonusCard: true,
        isClickable: true,
        onClick: handleOpenBonusLogs,
        bonusCount: bonusStats.count,
      }
    ],
    [userData, currencySymbol, isSuperBonusCompleted, handleOpenBonusLogs, bonusStats]
  );

  return (
    <div className="w-full px-0 sm:px-4 py-2">
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
            onClick={item.isClickable ? item.onClick : null}
          />
        ))}
      </div>
      <BonusLogsModal
        isOpen={isBonusModalOpen}
        onClose={handleCloseBonusLogs}
        bonusLogsData={bonusLogsData}
        currencySymbol={currencySymbol}
      />
    </div>
  );
});

TopCards.displayName = "TopCards";

export default TopCards;