import React, { useState, useEffect, useCallback } from "react";
import {
  useGetFoundationQuery,
  useRedeemBadgeFoundationMutation,
} from "./foundationApiSlice";
import confetti from "canvas-confetti";
import Loader from "../../../../ReusableComponents/Loader/loader";
import icon from "../../../../assets/Images/jaimaxcoin.png";
import icon2 from "../../../../assets/Images/jaicoin.svg";
import ReferralModal from "../../../../ReusableComponents/modals/referalModal";
import Cookies from "js-cookie"
const triggerConfetti = () => {
  confetti({
    particleCount: 150,
    spread: 70,
    origin: { y: 0.6 },
    colors: ["#0d9488", "#14b8a6", "#2dd4bf", "#ffffff"],
  });
};

// const ScratchCard = ({ index, onScratch }) => {
//   const [isScratched, setIsScratched] = useState(false);
//   const [isScratching, setIsScratching] = useState(false);

//   useEffect(() => {
//     if (localStorage.getItem(`scratch-card-${index}`) === "true")
//       setIsScratched(true);
//   }, [index]);

//   const handleScratch = () => {
//     if (!isScratched) {
//       setIsScratching(true);
//       setTimeout(() => {
//         setIsScratched(true);
//         localStorage.setItem(`scratch-card-${index}`, "true");
//         setIsScratching(false);
//         onScratch && onScratch();
//       }, 800);
//     }
//   };

//   return (
//     <div
//       className={`relative w-full aspect-[3/2] rounded-xl overflow-hidden transition-all duration-300 ${
//         isScratched
//           ? "bg-white shadow-lg"
//           : isScratching
//           ? "scale-[1.02]"
//           : "hover:scale-[1.02]"
//       } cursor-pointer`}
//       onClick={handleScratch}
//     >
//       {/* Scratch animation overlay */}
//       {isScratching && (
//         <div className="absolute inset-0 z-20 flex items-center justify-center bg-teal-500/20">
//           <div className="w-8 h-8 border-2 border-teal-100 border-t-transparent rounded-full animate-spin"></div>
//         </div>
//       )}

//       {isScratched ? (
//         // REVEALED STATE
//         <div className="flex flex-col items-center justify-center h-full p-3 relative">
//           {/* Top accent bar */}
//           <div className="absolute top-0 inset-x-0 h-1 bg-teal-500"></div>

//           {/* Content */}
//           <div className="w-12 h-12 bg-teal-500 rounded-full flex items-center justify-center mb-2">
//             <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none">
//               <path
//                 d="M5 12L10 17L19 8"
//                 stroke="currentColor"
//                 strokeWidth="3"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//               />
//             </svg>
//           </div>

//           <h3 className="text-base font-bold text-teal-800 mb-0.5">Reward</h3>

//           <div className="px-2 py-0.5 bg-teal-50 rounded-full">
//             <span className="text-xs text-teal-700">Added to balance</span>
//           </div>

//           {/* Card number */}
//           <div className="absolute bottom-2 right-2 bg-teal-50 px-2 py-0.5 rounded-full">
//             <span className="text-xs text-teal-700 font-medium">
//               #{index + 1}
//             </span>
//           </div>
//         </div>
//       ) : (
//         // UNREVEALED STATE
//         <div className="absolute inset-0">
//           {/* Background */}
//           <div className="absolute inset-0 bg-gradient-to-br from-teal-500 to-teal-600"></div>

//           {/* Content */}
//           <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-3">
//             {/* Icon container */}
//             <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-2">
//               <img src={icon2} alt="" className="w-7 h-7 object-contain" />
//             </div>

//             <h3 className="text-base font-bold mb-1">Scratch!</h3>

//             <div className="px-2 py-0.5 bg-white/20 rounded-full">
//               <span className="text-xs text-white">Tap to reveal</span>
//             </div>

//             {/* Card number */}
//             <div className="absolute bottom-2 right-2 bg-white/20 px-2 py-0.5 rounded-full">
//               <span className="text-xs text-white font-medium">
//                 #{index + 1}
//               </span>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };
// const ScratchCard = ({ index, onScratch }) => {
//   const [isScratched, setIsScratched] = useState(false);
//   const [isScratching, setIsScratching] = useState(false);

//   useEffect(() => {
//     if (localStorage.getItem(`scratch-card-${index}`) === "true")
//       setIsScratched(true);
//   }, [index]);

//   const handleScratch = () => {
//     if (!isScratched) {
//       setIsScratching(true);
//       setTimeout(() => {
//         setIsScratched(true);
//         localStorage.setItem(`scratch-card-${index}`, "true");
//         setIsScratching(false);
//         onScratch && onScratch();
//       }, 800);
//     }
//   };

//   return (
//     <div
//       className={`relative w-full max-w-xs mx-auto aspect-[3/2] rounded-xl overflow-hidden 
//         transition-all duration-300 ${
//           isScratched
//             ? "bg-white shadow-lg"
//             : isScratching
//             ? "scale-[1.02]"
//             : "hover:scale-[1.02]"
//         } cursor-pointer touch-manipulation`}
//       onClick={handleScratch}
//     >
//       {/* Scratch animation overlay */}
//       {isScratching && (
//         <div className="absolute inset-0 z-20 flex items-center justify-center bg-teal-500/20">
//           <div className="w-8 h-8 md:w-10 md:h-10 border-2 border-teal-100 border-t-transparent rounded-full animate-spin"></div>
//         </div>
//       )}

//       {isScratched ? (
//         // REVEALED STATE
//         <div className="flex flex-col items-center justify-center h-full p-2 sm:p-3 relative">
//           {/* Top accent bar */}
//           <div className="absolute top-0 inset-x-0 h-1 bg-teal-500"></div>

//           {/* Content */}
//           {/* <div className="w-10 h-10 sm:w-12 sm:h-12 bg-teal-500 rounded-full flex items-center justify-center mb-1 sm:mb-2 rounded-full">
//             <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" viewBox="0 0 24 24" fill="none">
//               <path
//                 d="M5 12L10 17L19 8"
//                 stroke="currentColor"
//                 strokeWidth="3"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//               />
//             </svg>
//           </div> */}
//  <div className="  bg-teal-50 px-2 py-0.5 rounded-full">
//             <span className="text-xs text-teal-700 font-medium">
//               #{index + 1}
//             </span>
//           </div>
//           <h3 className="text-sm sm:text-base font-bold text-teal-800 mb-0.5">Rewarded</h3>

//           <div className="px-2 py-0.5 bg-teal-50 rounded-full">
//             <span className="text-xs text-teal-700">Added to Balance</span>
//           </div>

//           {/* Card number */}
         
//         </div>
//       ) : (
//         // UNREVEALED STATE
//         <div className="absolute inset-0">
//           {/* Background with enhanced gradient */}
//           <div className="absolute inset-0 bg-gradient-to-br from-teal-500 to-teal-600"></div>

//           {/* Patterns for visual interest (optional) */}
//           <div className="absolute inset-0 opacity-10">
//             <div className="w-full h-full bg-[radial-gradient(circle,_white_1px,_transparent_1px)] bg-[length:8px_8px]"></div>
//           </div>

//           {/* Content */}
//           <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-2 sm:p-3">
//             {/* Icon container */}
//             <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/20 rounded-full flex items-center justify-center mb-1 sm:mb-2">
             
//               <span className="text-xs text-white font-medium">
//                 #{index + 1}
//               </span>
            
//             </div>

//             <h3 className="text-sm sm:text-base font-bold mb-0.5 sm:mb-1">Scratch!</h3>

//             <div className="px-2 py-0.5 bg-white/20 rounded-full">
//               <span className="text-xs text-white">Tap to reveal</span>
//             </div>

//             {/* Card number */}
            
//           </div>
          
//           {/* Light reflection effect */}
//           <div className="absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b from-white/20 to-transparent"></div>
//         </div>
//       )}
//     </div>
//   );
// };

const ScratchCard = ({ index, onScratch, achievedDirectRefs }) => {
  const [isScratched, setIsScratched] = useState(false);
  const [isScratching, setIsScratching] = useState(false);
  
  // Check if this card is already scratched based on achievedDirectRefs
  useEffect(() => {
    // First check if the card state is stored in localStorage
    const localStorageKey = `scratch-card-${index}`;
    const localStorageValue = localStorage.getItem(localStorageKey);
    
    if (localStorageValue === "true") {
      setIsScratched(true);
    } else if (achievedDirectRefs && Array.isArray(achievedDirectRefs)) {
      // If achievedDirectRefs is an array, check if it includes this card
      const scratchRefKey = `scratch_card_${index}`;
      if (achievedDirectRefs.includes(scratchRefKey)) {
        setIsScratched(true);
        // Also update localStorage for faster loading next time
        localStorage.setItem(localStorageKey, "true");
      }
    }
  }, [index, achievedDirectRefs]);

  const handleScratch = () => {
    if (!isScratched && !isScratching) {
      setIsScratching(true);
      setTimeout(() => {
        setIsScratched(true);
        localStorage.setItem(`scratch-card-${index}`, "true");
        setIsScratching(false);
        onScratch && onScratch(index);
      }, 800);
    }
  };

  return (
    <div
      className={`relative w-full max-w-xs mx-auto aspect-[3/2] rounded-xl overflow-hidden 
        transition-all duration-300 ${
          isScratched
            ? "bg-white shadow-lg"
            : isScratching
            ? "scale-[1.02]"
            : "hover:scale-[1.02]"
        } cursor-pointer touch-manipulation`}
      onClick={handleScratch}
    >
      {/* Scratch animation overlay */}
      {isScratching && (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-teal-500/20">
          <div className="w-8 h-8 md:w-10 md:h-10 border-2 border-teal-100 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {isScratched ? (
        // REVEALED STATE
        <div className="flex flex-col items-center justify-center h-full p-2 sm:p-3 relative">
          {/* Top accent bar */}
          <div className="absolute top-0 inset-x-0 h-1 bg-teal-500"></div>

          {/* Content */}
          <div className="bg-teal-50 px-2 py-0.5 rounded-full">
            <span className="text-xs text-teal-700 font-medium">
              #{index + 1}
            </span>
          </div>
          
          <h3 className="text-sm sm:text-base font-bold text-teal-800 mb-0.5">Rewarded</h3>

          <div className="px-2 py-0.5 bg-teal-50 rounded-full">
            <span className="text-xs text-teal-700">Added to Balance</span>
          </div>
        </div>
      ) : (
        // UNREVEALED STATE
        <div className="absolute inset-0">
          {/* Background with enhanced gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-teal-500 to-teal-600"></div>

          {/* Patterns for visual interest */}
          <div className="absolute inset-0 opacity-10">
            <div className="w-full h-full bg-[radial-gradient(circle,_white_1px,_transparent_1px)] bg-[length:8px_8px]"></div>
          </div>

          {/* Content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-2 sm:p-3">
            {/* Icon container */}
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/20 rounded-full flex items-center justify-center mb-1 sm:mb-2">
              <span className="text-xs text-white font-medium">
                #{index + 1}
              </span>
            </div>

            <h3 className="text-sm sm:text-base font-bold mb-0.5 sm:mb-1">Scratch!</h3>

            <div className="px-2 py-0.5 bg-white/20 rounded-full">
              <span className="text-xs text-white">Tap to reveal</span>
            </div>
          </div>
          
          {/* Light reflection effect */}
          <div className="absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b from-white/20 to-transparent"></div>
        </div>
      )}
    </div>
  );
};
const RedemptionModal = ({ onClose, onRedeem, isRedeeming }) => {
  useEffect(() => {
    setTimeout(() => triggerConfetti(), 300);
    const handleEscape = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-gradient-to-br from-white to-teal-50 rounded-2xl p-6 max-w-md w-full shadow-2xl transform transition-all duration-500 animate-modal-entry">
        <div className="absolute -top-10 left-1/2 transform -translate-x-1/2">
          <div className="w-20 h-20 bg-teal-500 rounded-full flex items-center justify-center shadow-lg border-4 border-white">
            <svg
              className="w-10 h-10 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        </div>
        <div className="mt-10 text-center">
          <h3 className="text-2xl font-bold text-teal-800">Congratulations!</h3>
          <div className="flex justify-center my-6">
            <div className="relative">
              <div className="absolute inset-0 bg-teal-200 rounded-full animate-ping opacity-20"></div>
              <div className="relative bg-gradient-to-r from-teal-600 to-teal-500 text-white text-3xl font-bold py-3 px-6 rounded-full shadow-lg">
                Reward
              </div>
            </div>
          </div>
          <p className="text-gray-700 mb-2">
            Your Foundation Bonus is ready to be claimed!
          </p>
          <p className="text-sm text-gray-500 mb-6">
            You've successfully referred the required number of friends.
          </p>
          <div className="flex flex-col gap-3">
            <button
              onClick={onRedeem}
              disabled={isRedeeming}
              className="bg-teal-500 hover:bg-teal-600 text-white py-3 px-6 rounded-xl"
            >
              {isRedeeming ? "Processing..." : "Claim Your Reward"}
            </button>

            <button
              onClick={onClose}
              className="text-teal-600 hover:text-teal-800 font-medium py-2 transition-colors duration-300"
            >
              Remind Me Later
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const PendingCard = ({ index }) => (
  <div className="w-full aspect-[3/2] rounded-xl border-2 border-dashed border-teal-200 flex flex-col items-center justify-center p-3 bg-white/70 backdrop-blur-sm hover:bg-white/90 transition-colors duration-300">
    <div className="w-10 h-10 rounded-full bg-teal-50 flex items-center justify-center mb-2">
      <svg
        className="w-5 h-5 text-teal-300"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path
          fillRule="evenodd"
          d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
          clipRule="evenodd"
        />
      </svg>
    </div>
    <span className="text-teal-400 text-xs font-medium">Pending Reward</span>
    <span className="text-gray-400 text-xs mt-1">#{index + 1}</span>
  </div>
);

const AlreadyClaimedMessage = () => {
  useEffect(() => {
    setTimeout(() => triggerConfetti(), 500);
  }, []);

  return (
    <div className="bg-gradient-to-r from-teal-50 to-white border border-teal-100 rounded-lg p-6 text-center">
      <div className="inline-block p-1 rounded-full bg-teal-50 border border-teal-100 mb-4">
        <img src={icon} alt="" width={100} />
      </div>
      <h3 className="text-2xl font-bold text-teal-800 mb-3">
        Foundation Bonus Claimed!
      </h3>
      <p className="text-teal-700 mb-1">
        Congratulations! You've successfully claimed your Foundation Bonus.
      </p>
      <div className="relative inline-block my-2">
        {/* <div className="absolute inset-0 bg-teal-200 rounded-full animate-ping opacity-20"></div> */}
        <div className="relative   py-1 px-6 rounded-full ">
          <span className="text-xl text-teal-500 font-bold">₹5000</span>
        </div>
      </div>
      <p className="text-gray-500 text-sm mt-1">
        Thank you for being part of our referral program. Keep an eye out for
        more opportunities!
      </p>
    </div>
  );
};

const FoundationBonusDashboard = () => {
  const { data, error, isLoading, refetch } = useGetFoundationQuery();
  const [redeemBadgeFoundation, { isLoading: isRedeemingg }] =
    useRedeemBadgeFoundationMutation();
  const [isRedeeming, setIsRedeeming] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const [referralCode] = useState("YOUR123CODE");
  const [showReferralModal, setShowReferralModal] = useState(false);
const userDataString = Cookies.get("userData");

let userData = null;
try {
  if (userDataString) {
    userData = JSON.parse(userDataString);
  }
} catch (e) {
  console.error("Failed to parse cookie JSON:", e);
}

  useEffect(() => {
    if (
      data?.data?.isElegibleForFoundationBonus &&
      !data?.data?.alreadyClimedFoundationBonus
    ) {
      setTimeout(() => setShowModal(true), 1000);
    }
  }, [data]);

  const copyReferralCode = useCallback(() => {
    navigator.clipboard.writeText(referralCode).then(() => {
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
      triggerConfetti();
    });
  }, [referralCode]);

  const handleRedeemBonus = async () => {
    try {
      const response = await redeemBadgeFoundation().unwrap();
      triggerConfetti();
      await refetch(); // refresh the foundation data
      setShowModal(false);
    } catch (err) {
      console.error("Failed to redeem bonus:", err);
      alert("Failed to redeem your bonus. Please try again.");
    }
  };

  if (isLoading) return <Loader />;

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mx-auto max-w-md my-8">
        <div className="flex">
          <svg
            className="w-5 h-5 mr-2 mt-0.5"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
              clipRule="evenodd"
            />
          </svg>
          <span>
            Unable to load foundation bonus data. Please try refreshing.
          </span>
        </div>
        <button
          onClick={() => window.location.reload()}
          className="mt-3 w-full bg-white text-red-600 border border-red-300 px-4 py-2 rounded hover:bg-red-50 transition-colors duration-200"
        >
          Retry
        </button>
      </div>
    );
  }

  if (!data) return null;

  const {
    achievedDirectRefs,
    directRefsRequired,
    isElegibleForFoundationBonus,
    alreadyClimedFoundationBonus,
  } = data.data;

  const progressPercent = Math.min(
    100,
    (achievedDirectRefs / directRefsRequired) * 100
  );
  const refsRemaining = directRefsRequired - achievedDirectRefs;

  return (
    <div className="max-w-9xl mx-auto p-2 sm:p-6 bg-gradient-to-br from-white to-teal-50 rounded-2xl shadow-sm">
      <div className="mb-3 text-center bg-white/70 backdrop-blur-sm p-4 sm:p-6 rounded-xl shadow-sm">
        <h2 className="text-2xl sm:text-3xl font-bold text-teal-700 mb-2">
          Foundation Bonus
        </h2>
      </div>

      {!alreadyClimedFoundationBonus && (
        <div className="mb-3 sm:mb-10 bg-white p-2 sm:p-6 rounded-xl shadow-sm">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end text-sm mb-2">
            <div>
              <span className="text-teal-800 font-semibold">Your Progress</span>
              <div className="flex items-center mt-1">
                <div className="h-5 w-5 rounded-full bg-teal-500 flex items-center justify-center text-white text-xs font-bold">
                  {achievedDirectRefs}
                </div>
                <span className="mx-1 text-gray-400">/</span>
                <div className="h-5 w-5 rounded-full bg-teal-100 flex items-center justify-center text-teal-800 text-xs font-bold">
                  {directRefsRequired}
                </div>
                <span className="ml-2 text-gray-500 text-xs">Referrals</span>
              </div>
            </div>
            <div className="text-left sm:text-right mt-2 sm:mt-0">
              <span className="text-teal-700 font-bold text-xl">Progress</span>
              <span className="text-gray-400 mx-1 text-lg">/</span>
              <span className="text-teal-900 font-bold text-xl">Target</span>
            </div>
          </div>

          <div className="relative w-full bg-gray-100 rounded-full h-3 overflow-hidden mt-4">
            <div
              className="bg-gradient-to-r from-teal-400 to-teal-500 h-full rounded-full transition-all duration-1000 ease-out"
              style={{ width: `${progressPercent}%` }}
            ></div>
            {[0.25, 0.5, 0.75, 1].map((milestone) => (
              <div
                key={milestone}
                className={`absolute w-2 h-2 rounded-full top-1/2 transform -translate-y-1/2 ${
                  progressPercent >= milestone * 100
                    ? "bg-white animate-pulse"
                    : "bg-gray-300"
                }`}
                style={{
                  left: `calc(${milestone * 100}% - ${milestone * 0.5}rem)`,
                }}
              ></div>
            ))}
          </div>

          <p className="mt-4 text-sm text-gray-600 flex flex-wrap items-center">
            {/* <svg
              className="w-4 h-4 mr-1 text-teal-500 flex-shrink-0"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                clipRule="evenodd"
              />
            </svg> */}
            {refsRemaining > 0 ? (
              <>
                Invite{" "}
                <span className="font-bold text-teal-800 mx-1">
                  {refsRemaining}
                </span>
                more {refsRemaining === 1 ? "friend" : "friends"} to unlock your{" "}
                <span className="font-bold text-teal-800 mx-1">
                  Foundation Bonus
                </span>
                !
              </>
            ) : (
              <span className="font-bold text-teal-800">
                You've completed all referrals! Claim your bonus now.
              </span>
            )}
          </p>
        </div>
      )}

      <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm mb-2">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6">
          {!alreadyClimedFoundationBonus && (
            <span className="text-xs font-medium text-teal-500 bg-teal-50 py-1 px-3 rounded-full self-start sm:self-auto">
              Rewards per referral
            </span>
          )}
        </div>

        {alreadyClimedFoundationBonus ? (
          <AlreadyClaimedMessage />
        ) : achievedDirectRefs > 0 ? (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
              {Array.from({ length: achievedDirectRefs }).map((_, index) => (
                <ScratchCard
                  key={index}
                  index={index}
                  onScratch={triggerConfetti}
                    achievedDirectRefs={data.data.achievedDirectRefs}
                />
              ))}
              {Array.from({ length: refsRemaining }).map((_, index) => (
                <PendingCard
                  key={index + achievedDirectRefs}
                  index={index + achievedDirectRefs}
                />
              ))}
            </div>

            <div className="mt-6 bg-teal-50 rounded-lg p-4 text-sm text-teal-700 flex items-start">
              <svg
                className="w-5 h-5 mr-2 text-teal-500 flex-shrink-0 mt-0.5"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z"
                  clipRule="evenodd"
                />
              </svg>
              <div>
                <span className="font-medium">How it works:</span> Scratch the
                cards to reveal your rewards! Each successful referral adds to
                your bonus pool.
              </div>
            </div>
          </>
        ) : (
          <div className="bg-gradient-to-r from-teal-50 to-white border border-teal-100 rounded-lg p-6 sm:p-8 text-center">
            <img
              src="https://placeholder-for-your-gift-image.svg"
              alt="Referral Gift"
              className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-4 opacity-80"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src =
                  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 24 24' fill='none' stroke='%230d9488' stroke-width='1' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M20 12v10H4V12'%3E%3C/path%3E%3Cpath d='M2 7h20v5H2z'%3E%3C/path%3E%3Cpath d='M12 22V7'%3E%3C/path%3E%3Cpath d='M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z'%3E%3C/path%3E%3Cpath d='M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z'%3E%3C/path%3E%3C/svg%3E";
              }}
            />
            <p className="text-teal-700 font-medium text-lg mb-2">
              Start your referral journey!
            </p>
            <p className="text-teal-600 text-sm mb-4">
              Invite friends using your referral code to earn scratch cards with
              rewards.
            </p>
            <div className="relative inline-block mb-2"></div>
            <button
              onClick={() => setShowReferralModal(true)}
              className="bg-teal-500 hover:bg-teal-600 text-white font-medium py-2 px-6 rounded-full transition-colors duration-300 shadow-sm hover:shadow-md"
            >
              Share Your Referral Code
            </button>
          </div>
        )}
      </div>
{showReferralModal && (
  <ReferralModal
    show={showReferralModal}
    onHide={() => setShowReferralModal(false)}
    userData={userData}
  />
)}


      {showModal && !alreadyClimedFoundationBonus && (
        <RedemptionModal
          onClose={() => setShowModal(false)}
          onRedeem={handleRedeemBonus}
          isRedeeming={isRedeeming}
        />
      )}

      <style jsx>{`
        @keyframes modal-entry {
          0% {
            opacity: 0;
            transform: scale(0.9) translateY(20px);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        .animate-modal-entry {
          animation: modal-entry 0.4s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default FoundationBonusDashboard;
