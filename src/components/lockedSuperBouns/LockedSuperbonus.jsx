

// import React, { useState, useEffect } from "react";
// import { useGetAllLockedSuperbonusQuery, useDisburseBonusMutation } from "./lockedSupbonusApiSlice";
// import ReferralModal from '../Dashboard/modals/referalModal';
// import Loader from "../Loader/Loader";

// const LockedSuperBonusUI = () => {
//   const { data: response, isLoading, isError, refetch } = useGetAllLockedSuperbonusQuery();
//   const [disburseBonus, { isLoading: isDisbursingBonus, isSuccess, isError: disbursementError }] = useDisburseBonusMutation();
  
//   const [showModal, setShowModal] = useState(false);
//   const [showEligibilityModal, setShowEligibilityModal] = useState(false);
//   const [showSuccessModal, setShowSuccessModal] = useState(false);
//   const [isAnimating, setIsAnimating] = useState(false);

//   const handleDisburseBonus = async () => {
//     try {
//       await disburseBonus().unwrap();
//       refetch();
//       setShowSuccessModal(true);
//     } catch (error) {
//       console.error("Failed to disburse bonus:", error);
//     }
//   };

//   const handleCloseModal = () => setShowModal(false);
//   const handleCloseEligibilityModal = () => setShowEligibilityModal(false);
//   const handleCloseSuccessModal = () => setShowSuccessModal(false);
  
//   const openReferralModal = () => setShowModal(true);
//   const handleWithdrawNow = () => {
//     handleCloseEligibilityModal();
//     handleDisburseBonus();
//   };

//   // Automatically show eligibility modal when eligible but not unlocked
//   useEffect(() => {
//     if (response?.data?.eligibleToWithDrawTempSuperBonus && !response?.data?.alreadyUnlockedSuperBonus) {
//       setIsAnimating(true);
//       const timer = setTimeout(() => setIsAnimating(false), 1000);
//       // Auto show eligibility modal when eligible
//       setShowEligibilityModal(true);
//       return () => clearTimeout(timer);
//     }
//   }, [response]);

//   if (isLoading) {
//     return (
//       <div className="flex justify-center items-center h-64">
//         <div className="flex flex-col items-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
//           <p className="mt-3 text-teal-700">Loading your super bonus information...</p>
//         </div>
//       </div>
//     );
//   }

//   if (isError) {
//     return (
//       <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
//         <strong className="font-bold">Error!</strong>
//         <span className="block sm:inline"> Unable to load your super bonus information.</span>
//       </div>
//     );
//   }

//   const bonusData = response?.data;
//   const message = response?.message;
  
//   const progressPercentage = bonusData ? 
//     Math.min((bonusData.progress.currentRefs / bonusData.progress.requiredRefs) * 100, 100) : 0;
  
//   return (
//     <div className="container mx-auto px-3 py-5 max-w-screen">
//       {/* Referral Modal */}
//       <ReferralModal 
//         show={showModal} 
//         onHide={handleCloseModal} 
//         userData={bonusData}
//       />

//       {/* Eligibility Modal - When eligible but not yet redeemed */}
//       {showEligibilityModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//           <div className="bg-white rounded-lg p-6 max-w-md w-full shadow-xl border-2 border-teal-500">
//             <div className="mb-4 text-center">
//               <div className="h-16 w-16 rounded-full bg-teal-100 mx-auto flex items-center justify-center text-teal-600 mb-4">
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//                 </svg>
//               </div>
//               <h3 className="text-xl font-bold text-teal-800">Good News!</h3>
//               <p className="text-teal-700 mt-2">
//                 You are now eligible to withdraw your temporary SuperBonus!
//               </p>
//             </div>
//             <div className="p-4 bg-teal-50 rounded-lg mb-4 text-sm text-teal-800">
//               <p className="font-medium">What does this mean?</p>
//               <p className="mt-1">
//                 You can now access and withdraw your temporary SuperBonus funds. This bonus becomes permanent when you complete all required referrals.
//               </p>
//             </div>
//             <div className="flex flex-col md:flex-row gap-3 mt-6">
//               <button 
//                 onClick={handleCloseEligibilityModal}
//                 className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors md:flex-1"
//                 disabled={isDisbursingBonus}
//               >
//                 Later
//               </button>
//               <button 
//                 onClick={handleWithdrawNow}
//                 className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors md:flex-1 font-medium"
//                 disabled={isDisbursingBonus}
//               >
//                 {isDisbursingBonus ? 'Processing...' : 'Redeem Now'}
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
      
//       {/* Success Modal - When bonus is redeemed */}
//       {showSuccessModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//           <div className="bg-white rounded-lg p-6 max-w-md w-full shadow-xl border-2 border-teal-500">
//             <div className="mb-4 text-center">
//               <div className="h-16 w-16 rounded-full bg-teal-100 mx-auto flex items-center justify-center text-teal-600 mb-4">
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
//                 </svg>
//               </div>
//               <h3 className="text-xl font-bold text-teal-800">Congratulations!</h3>
//               <p className="text-teal-700 mt-2">
//                 Your SuperBonus has been successfully unlocked!
//               </p>
//             </div>
//             <div className="p-4 bg-teal-50 rounded-lg mb-4 text-sm text-teal-800">
//               <p className="font-medium">Great achievement!</p>
//               <p className="mt-1">
//                 You have successfully claimed your SuperBonus. Continue referring friends to earn more rewards!
//               </p>
//             </div>
//             <div className="flex justify-center mt-6">
//               <button 
//                 onClick={handleCloseSuccessModal}
//                 className="px-6 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors font-medium"
//               >
//                 Got It
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       <div className="bg-gradient-to-br from-white to-teal-50 rounded-xl shadow-lg overflow-hidden border border-teal-100">
//         {/* Header with Share Button */}
//         <div className="p-4 border-b border-teal-100 bg-teal-600 text-white">
//           <div className="flex justify-between items-center">
//             <div>
//               <h2 className="text-xl md:text-2xl font-bold">SuperBonus Dashboard</h2>
//               {message && (
//                 <p className="mt-1 text-teal-100 text-sm">
//                   {message}
//                 </p>
//               )}
//             </div>
//             <button 
//               onClick={openReferralModal}
//               className="px-4 py-2 bg-white text-teal-700 rounded-md hover:bg-teal-50 transition-all duration-200 transform hover:scale-105 shadow-md font-bold text-sm"
//             >
//               Share Your Link
//             </button>
//           </div>
//         </div>

//         <div className="p-4">
//           {bonusData ? (
//             <div className="space-y-4">
//               {/* User Information Card */}
//               <div className="bg-white p-4 rounded-lg shadow-md border border-teal-100">
//                 <div className="flex items-center">
//                   <div className="mr-4">
//                     <div className="h-12 w-12 rounded-full bg-teal-100 flex items-center justify-center text-teal-600">
//                       <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
//                     </div>
//                   </div>
//                   <div className="flex-grow">
//                     <h3 className="text-lg font-bold text-teal-800">
//                       {bonusData.name}
//                     </h3>
//                     <div className="flex items-center mt-2">
//                       <span className="text-xs text-gray-500 mr-2">Username:</span>
//                       <span className="bg-teal-50 text-teal-800 text-xs font-semibold px-2 py-1 rounded border border-teal-200">
//                         {bonusData.username}
//                       </span>
//                     </div>
//                   </div>
//                   <div className="ml-4 text-right">
//                     <div className="bg-teal-600 text-white px-3 py-1 rounded-full text-lg font-bold">
//                       {bonusData.amountToWithdrwSuperBonus}
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Congratulations message when already unlocked */}
//               {bonusData.alreadyUnlockedSuperBonus && (
//                 <div className="bg-teal-50 p-4 rounded-lg shadow-md border border-teal-200 mb-4">
//                   <div className="flex items-start">
//                     <div className="h-10 w-10 rounded-full bg-teal-500 flex items-center justify-center text-white mr-3 flex-shrink-0">
//                       <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
//                       </svg>
//                     </div>
//                     <div>
//                       <h3 className="text-lg font-bold text-teal-800">Congratulations!</h3>
//                       <p className="mt-1 text-teal-700">{message || "Your SuperBonus has been successfully unlocked!"}</p>
//                     </div>
//                   </div>
//                 </div>
//               )}

//               {/* Progress Card - Only show if not already unlocked */}
//               {!bonusData.alreadyUnlockedSuperBonus && (
//                 <div className={`bg-white p-4 rounded-lg shadow-md border border-teal-100 transform transition-all duration-500 ${isAnimating ? 'scale-105' : ''}`}>
//                   <h3 className="text-lg font-bold text-teal-800 mb-3">Your Referral Journey</h3>
                  
//                   <div className="mb-4">
//                     <div className="flex justify-between mb-1">
//                       <span className="text-sm font-medium text-teal-700">
//                         {bonusData.progress.currentRefs} of {bonusData.progress.requiredRefs} Referrals
//                       </span>
//                       <span className="text-sm font-medium text-teal-700">
//                         {progressPercentage.toFixed(0)}% Complete
//                       </span>
//                     </div>
//                     <div className="w-full h-3 bg-teal-100 rounded-full overflow-hidden">
//                       <div 
//                         className="h-full bg-teal-600 rounded-full transition-all duration-1000 ease-out"
//                         style={{ width: `${progressPercentage}%` }}
//                       ></div>
//                     </div>
//                   </div>
                  
//                   {/* Referral Visual */}
//                   <div className="flex flex-wrap gap-2 my-6 justify-center">
//                     {[...Array(bonusData.progress.requiredRefs)].map((_, index) => (
//                       <div 
//                         key={index} 
//                         className={`h-10 w-10 rounded-lg flex items-center justify-center transition-all duration-300 ${
//                           index < bonusData.progress.currentRefs 
//                             ? 'bg-teal-600 shadow-md transform hover:scale-110' 
//                             : 'bg-teal-100 border border-teal-200'
//                         }`}
//                       >
//                         {index < bonusData.progress.currentRefs ? (
//                           <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
//                             <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
//                           </svg>
//                         ) : (
//                           <span className="text-xs font-medium text-teal-800">{index + 1}</span>
//                         )}
//                       </div>
//                     ))}
//                   </div>
                  
//                   <div className="bg-teal-50 p-3 rounded-md border border-teal-100">
//                     <p className="text-sm text-teal-700 font-medium text-center">
//                       {bonusData.progress.remainingRefs > 0 ? (
//                         <>You need <span className="text-teal-900 font-bold">{bonusData.progress.remainingRefs}</span> more referrals to unlock your SuperBonus!</>
//                       ) : (
//                         <>Congratulations! You've completed all required referrals.</>
//                       )}
//                     </p>
//                   </div>
//                 </div>
//               )}

//               {/* Status Card - Only show fully if not already unlocked */}
//               {!bonusData.alreadyUnlockedSuperBonus ? (
//                 <div className="bg-white p-4 rounded-lg shadow-md border border-teal-100">
//                   <h3 className="text-lg font-bold text-teal-800 mb-3">SuperBonus Status</h3>
                  
//                   <div className="space-y-3">
//                     <div className={`flex items-center p-3 rounded-md ${
//                       bonusData.eligibleToWithDrawTempSuperBonus 
//                         ? 'bg-teal-100 border border-teal-300' 
//                         : 'bg-teal-50 border border-teal-100'
//                     }`}>
//                       <div className={`h-5 w-5 rounded-full flex items-center justify-center ${
//                         bonusData.eligibleToWithDrawTempSuperBonus 
//                           ? 'bg-teal-500' 
//                           : 'bg-gray-300'
//                       }`}>
//                         {bonusData.eligibleToWithDrawTempSuperBonus && (
//                           <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-white" viewBox="0 0 20 20" fill="currentColor">
//                             <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
//                           </svg>
//                         )}
//                       </div>
//                       <div className="ml-3 flex-grow flex items-center justify-between">
//                         <span className="text-sm text-gray-800 font-medium">
//                           {bonusData.eligibleToWithDrawTempSuperBonus 
//                             ? 'You can withdraw your temporary SuperBonus!' 
//                             : 'Not yet eligible to withdraw temporary SuperBonus'}
//                         </span>
//                         {bonusData.eligibleToWithDrawTempSuperBonus && !bonusData.alreadyUnlockedSuperBonus && (
//                           <button 
//                             onClick={() => setShowEligibilityModal(true)}
//                             className="text-xs bg-teal-600 text-white px-2 py-1 rounded hover:bg-teal-700 transition-colors"
//                           >
//                             Details
//                           </button>
//                         )}
//                       </div>
//                     </div>
                    
//                     <div className={`flex items-center p-3 rounded-md ${
//                       bonusData.alreadyUnlockedSuperBonus 
//                         ? 'bg-teal-100 border border-teal-300' 
//                         : 'bg-teal-50 border border-teal-100'
//                     }`}>
//                       <div className={`h-5 w-5 rounded-full flex items-center justify-center ${
//                         bonusData.alreadyUnlockedSuperBonus 
//                           ? 'bg-teal-500' 
//                           : 'bg-gray-300'
//                       }`}>
//                         {bonusData.alreadyUnlockedSuperBonus && (
//                           <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-white" viewBox="0 0 20 20" fill="currentColor">
//                             <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
//                           </svg>
//                         )}
//                       </div>
//                       <div className="ml-3 flex-grow flex items-center justify-between">
//                         <span className="text-sm text-gray-800 font-medium">
//                           {bonusData.alreadyUnlockedSuperBonus 
//                             ? 'Congratulations! Your SuperBonus is unlocked!' 
//                             : 'SuperBonus not yet unlocked'}
//                         </span>
//                         {bonusData.alreadyUnlockedSuperBonus && (
//                           <button 
//                             onClick={() => setShowSuccessModal(true)}
//                             className="text-xs bg-teal-600 text-white px-2 py-1 rounded hover:bg-teal-700 transition-colors"
//                           >
//                             Details
//                           </button>
//                         )}
//                       </div>
//                     </div>
//                   </div>
                  
//                   <div className="mt-6">
//                     <button
//                       onClick={handleDisburseBonus}
//                       disabled={isDisbursingBonus || !bonusData.eligibleToWithDrawTempSuperBonus || bonusData.alreadyUnlockedSuperBonus}
//                       className={`w-full py-3 px-4 rounded-lg font-medium transition ${
//                         isDisbursingBonus || !bonusData.eligibleToWithDrawTempSuperBonus || bonusData.alreadyUnlockedSuperBonus
//                           ? "bg-gray-300 text-gray-500 cursor-not-allowed" 
//                           : "bg-teal-600 text-white hover:bg-teal-700"
//                       }`}
//                     >
//                       {isDisbursingBonus ? "Processing..." : 
//                         bonusData.alreadyUnlockedSuperBonus ? "Already Unlocked" : 
//                         bonusData.eligibleToWithDrawTempSuperBonus ? "Withdraw Bonus" : "Not Eligible Yet"}
//                     </button>
//                   </div>
//                 </div>
//               ) : (
//                 <div className="bg-white p-4 rounded-lg shadow-md border border-teal-100">
//                   <div className="flex items-center p-3 rounded-md bg-teal-100 border border-teal-300">
//                     <div className="h-5 w-5 rounded-full flex items-center justify-center bg-teal-500">
//                       <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-white" viewBox="0 0 20 20" fill="currentColor">
//                         <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
//                       </svg>
//                     </div>
//                     <div className="ml-3">
//                       <span className="text-sm text-gray-800 font-medium">
//                         Your SuperBonus has been successfully unlocked and credited to your account!
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//               )}
              
//               {/* Status Messages */}
//               {isSuccess && (
//                 <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
//                   <p className="font-medium">Success! Your bonus has been transferred to your available balance.</p>
//                 </div>
//               )}
              
//               {disbursementError && (
//                 <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
//                   <p className="font-medium">Failed to withdraw bonus. Please try again.</p>
//                 </div>
//               )}
//             </div>
//           ) : (
//             <div className="text-center py-6">
//               <div className="bg-teal-50 p-6 rounded-lg shadow-inner border border-teal-100">
//                 <svg className="mx-auto h-12 w-12 text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
//                 </svg>
//                 <h3 className="mt-3 text-base font-medium text-teal-900">No SuperBonus data found</h3>
//                 <p className="mt-1 text-sm text-teal-600">We couldn't find any SuperBonus information for your account.</p>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LockedSuperBonusUI;



import React, { useState, useEffect } from "react";
import { useGetAllLockedSuperbonusQuery, useDisburseBonusMutation } from "./lockedSupbonusApiSlice";
import ReferralModal from '../Dashboard/modals/referalModal';
import Loader from "../Loader/Loader";

const LockedSuperBonusUI = () => {
  const { data: response, isLoading, isError, refetch } = useGetAllLockedSuperbonusQuery();
  const [disburseBonus, { isLoading: isDisbursingBonus, isSuccess, isError: disbursementError }] = useDisburseBonusMutation();
  
  const [showModal, setShowModal] = useState(false);
  const [showEligibilityModal, setShowEligibilityModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleDisburseBonus = async () => {
    try {
      await disburseBonus().unwrap();
      refetch();
      setShowSuccessModal(true);
    } catch (error) {
      console.error("Failed to disburse bonus:", error);
    }
  };

  const handleCloseModal = () => setShowModal(false);
  const handleCloseEligibilityModal = () => setShowEligibilityModal(false);
  const handleCloseSuccessModal = () => setShowSuccessModal(false);
  
  const openReferralModal = () => setShowModal(true);
  const handleWithdrawNow = () => {
    handleCloseEligibilityModal();
    handleDisburseBonus();
  };

  // Automatically show eligibility modal when eligible but not unlocked
  useEffect(() => {
    if (response?.data?.eligibleToWithDrawTempSuperBonus && !response?.data?.alreadyUnlockedSuperBonus) {
      setIsAnimating(true);
      const timer = setTimeout(() => setIsAnimating(false), 1000);
      // Auto show eligibility modal when eligible
      setShowEligibilityModal(true);
      return () => clearTimeout(timer);
    }
  }, [response]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="bg-red-100 border-l-4 border-red-500 text-red-700 px-3 py-3 sm:px-4 sm:py-3 rounded-md shadow-sm relative" role="alert">
        <div className="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-red-500" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          <strong className="font-bold">Error!</strong>
          <span className="ml-2"> Unable to load your super bonus information.</span>
        </div>
      </div>
    );
  }

  const bonusData = response?.data;
  const message = response?.message;
  
  const progressPercentage = bonusData ? 
    Math.min((bonusData.progress.currentRefs / bonusData.progress.requiredRefs) * 100, 100) : 0;
  
  return (
    <div className="container mx-auto px-2 sm:px-3 py-3 sm:py-5 max-w-screen">
      {/* Referral Modal */}
      <ReferralModal 
        show={showModal} 
        onHide={handleCloseModal} 
        userData={bonusData}
      />

      {/* Eligibility Modal - When eligible but not yet redeemed */}
      {showEligibilityModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-2 sm:p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-4 sm:p-6 max-w-xs sm:max-w-md w-full shadow-2xl border-2 border-teal-500 animate-fadeIn">
            <div className="mb-3 sm:mb-4 text-center">
              <div className="h-14 w-14 sm:h-16 sm:w-16 rounded-full bg-teal-100 mx-auto flex items-center justify-center text-teal-600 mb-3 sm:mb-4 shadow-md">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-wallet">
                  <path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1"/>
                  <path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4"/>
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-teal-800">Good News!</h3>
              <p className="text-sm sm:text-base text-teal-700 mt-2">
                You are now eligible to withdraw your temporary SuperBonus!
              </p>
            </div>
            <div className="p-3 sm:p-4 bg-gradient-to-r from-teal-50 to-teal-100 rounded-lg mb-3 sm:mb-4 text-xs sm:text-sm text-teal-800 shadow-inner">
              <p className="font-medium">What does this mean?</p>
              <p className="mt-1">
                You can now access and withdraw your temporary SuperBonus funds. This bonus becomes permanent when you complete all required referrals.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mt-4 sm:mt-6">
              <button 
                onClick={handleCloseEligibilityModal}
                className="px-3 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors sm:flex-1 text-sm sm:text-base shadow-sm hover:shadow"
                disabled={isDisbursingBonus}
              >
                Later
              </button>
              <button 
                onClick={handleWithdrawNow}
                className="px-3 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors sm:flex-1 font-medium text-sm sm:text-base shadow-sm hover:shadow"
                disabled={isDisbursingBonus}
              >
                {isDisbursingBonus ? 'Processing...' : 'Redeem Now'}
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Success Modal - When bonus is redeemed */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-2 sm:p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-4 sm:p-6 max-w-xs sm:max-w-md w-full shadow-2xl border-2 border-teal-500 animate-fadeIn">
            <div className="mb-3 sm:mb-4 text-center">
              <div className="h-14 w-14 sm:h-16 sm:w-16 rounded-full bg-teal-100 mx-auto flex items-center justify-center text-teal-600 mb-3 sm:mb-4 shadow-md">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 sm:h-8 sm:w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-teal-800">Congratulations!</h3>
              <p className="text-sm sm:text-base text-teal-700 mt-2">
                Your SuperBonus has been successfully unlocked!
              </p>
            </div>
            <div className="p-3 sm:p-4 bg-gradient-to-r from-teal-50 to-teal-100 rounded-lg mb-3 sm:mb-4 text-xs sm:text-sm text-teal-800 shadow-inner">
              <p className="font-medium">Great achievement!</p>
              <p className="mt-1">
                You have successfully claimed your SuperBonus. Continue referring friends to earn more rewards!
              </p>
            </div>
            <div className="flex justify-center mt-4 sm:mt-6">
              <button 
                onClick={handleCloseSuccessModal}
                className="px-6 sm:px-8 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors font-medium text-sm sm:text-base shadow-sm hover:shadow-md"
              >
                Got It
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="bg-gradient-to-br from-white to-teal-50 rounded-xl shadow-lg overflow-hidden border border-teal-100 transition-all duration-300 hover:shadow-xl">
        {/* Header with Share Button */}
        <div className="p-3 sm:p-4 border-b border-teal-100 bg-gradient-to-r from-teal-600 to-teal-500 text-white">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-0">
            <div>
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold">SuperBonus Dashboard</h2>
              {message && (
                <p className="mt-1 text-teal-100 text-xs sm:text-sm">
                  {message}
                </p>
              )}
            </div>
            <button 
              onClick={openReferralModal}
              className="px-3 py-1.5 sm:px-4 sm:py-2 bg-white text-teal-700 rounded-md hover:bg-teal-50 transition-all duration-200 transform hover:scale-105 shadow-md font-bold text-xs sm:text-sm self-start sm:self-auto flex items-center justify-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
              </svg>
              Refer Your Friends
            </button>
          </div>
        </div>

        <div className="p-3 sm:p-4">
          {bonusData ? (
            <div className="space-y-3 sm:space-y-4">
              {/* User Information Card */}
              <div className="bg-white p-3 sm:p-4 rounded-lg shadow-md border border-teal-100 hover:shadow-lg transition-shadow duration-300">
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-0">
                  <div className="sm:mr-4 flex justify-center sm:justify-start">
                    <div className="h-12 w-12 sm:h-14 sm:w-14 rounded-full bg-gradient-to-br from-teal-100 to-teal-200 flex items-center justify-center text-teal-600 shadow-inner">
                      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/>
                        <circle cx="12" cy="7" r="4"/>
                      </svg>
                    </div>
                  </div>
                  <div className="flex-grow text-center sm:text-left">
                    <h3 className="text-base sm:text-lg font-bold text-teal-800">
                      {bonusData.name}
                    </h3>
                    <div className="flex items-center justify-center sm:justify-start mt-2">
                      <span className="text-xs text-gray-500 mr-2">Username:</span>
                      <span className="bg-teal-50 text-teal-800 text-xs font-semibold px-2 py-1 rounded border border-teal-200">
                        {bonusData.username}
                      </span>
                    </div>
                  </div>
                  <div className="text-center sm:text-right sm:ml-4">
                    <div className="bg-gradient-to-r from-teal-600 to-teal-500 text-white px-4 py-1.5 rounded-full text-base sm:text-lg font-bold inline-block sm:block shadow-sm">
                      {bonusData.amountToWithdrwSuperBonus}
                    </div>
                  </div>
                </div>
              </div>

              {/* Congratulations message when already unlocked */}
              {bonusData.alreadyUnlockedSuperBonus && (
                <div className="bg-gradient-to-r from-teal-50 to-teal-100 p-3 sm:p-4 rounded-lg shadow-md border border-teal-200 mb-3 sm:mb-4">
                  <div className="flex items-start">
                    <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-gradient-to-br from-teal-500 to-teal-400 flex items-center justify-center text-white mr-3 flex-shrink-0 shadow-md">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-teal-800">Congratulations!</h3>
                      <p className="mt-1 text-sm text-teal-700">{message || "Your SuperBonus has been successfully unlocked!"}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Progress Card - Only show if not already unlocked */}
              {!bonusData.alreadyUnlockedSuperBonus && (
                <div className={`bg-white p-3 sm:p-4 rounded-lg shadow-md border border-teal-100 transform transition-all duration-500 hover:shadow-lg ${isAnimating ? 'scale-105' : ''}`}>
                  <h3 className="text-base sm:text-lg font-bold text-teal-800 mb-2 sm:mb-3">Your Referral Journey</h3>
                  
                  <div className="mb-3 sm:mb-4">
                    <div className="flex justify-between mb-1">
                      <span className="text-xs sm:text-sm font-medium text-teal-700">
                        {bonusData.progress.currentRefs} of {bonusData.progress.requiredRefs} Referrals
                      </span>
                      <span className="text-xs sm:text-sm font-medium text-teal-700">
                        {progressPercentage.toFixed(0)}% Complete
                      </span>
                    </div>
                    <div className="w-full h-2.5 sm:h-3.5 bg-teal-100 rounded-full overflow-hidden shadow-inner">
                      <div 
                        className="h-full bg-gradient-to-r from-teal-500 to-teal-400 rounded-full transition-all duration-1000 ease-out"
                        style={{ width: `${progressPercentage}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  {/* Referral Visual */}
                  <div className="flex flex-wrap gap-1.5 sm:gap-2.5 my-4 sm:my-6 justify-center">
                    {[...Array(bonusData.progress.requiredRefs)].map((_, index) => (
                      <div 
                        key={index} 
                        className={`h-9 w-9 sm:h-11 sm:w-11 rounded-lg flex items-center justify-center transition-all duration-300 ${
                          index < bonusData.progress.currentRefs 
                            ? 'bg-gradient-to-br from-teal-600 to-teal-500 shadow-md transform hover:scale-110' 
                            : 'bg-teal-100 border border-teal-200'
                        }`}
                      >
                        {index < bonusData.progress.currentRefs ? (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        ) : (
                          <span className="text-2xs sm:text-xs font-medium text-teal-800">{index + 1}</span>
                        )}
                      </div>
                    ))}
                  </div>
                  
                  <div className="bg-gradient-to-r from-teal-50 to-teal-100 p-2.5 sm:p-3.5 rounded-md border border-teal-100 shadow-inner">
                    <p className="text-xs sm:text-sm text-teal-700 font-medium text-center">
                      {bonusData.progress.remainingRefs > 0 ? (
                        <>You need <span className="text-teal-900 font-bold">{bonusData.progress.remainingRefs}</span> more referrals to unlock your SuperBonus!</>
                      ) : (
                        <>Congratulations! You've completed all required referrals.</>
                      )}
                    </p>
                  </div>
                </div>
              )}

              {/* Status Card - Only show fully if not already unlocked */}
              {!bonusData.alreadyUnlockedSuperBonus ? (
                <div className="bg-white p-3 sm:p-4 rounded-lg shadow-md border border-teal-100 hover:shadow-lg transition-shadow duration-300">
                  <h3 className="text-base sm:text-lg font-bold text-teal-800 mb-2 sm:mb-3">SuperBonus Status</h3>
                  
                  <div className="space-y-2 sm:space-y-3">
                    <div className={`flex items-center p-2.5 sm:p-3.5 rounded-md ${
                      bonusData.eligibleToWithDrawTempSuperBonus 
                        ? 'bg-gradient-to-r from-teal-100 to-teal-50 border border-teal-300' 
                        : 'bg-teal-50 border border-teal-100'
                    }`}>
                      <div className={`h-5 w-5 sm:h-6 sm:w-6 rounded-full flex items-center justify-center ${
                        bonusData.eligibleToWithDrawTempSuperBonus 
                          ? 'bg-gradient-to-br from-teal-500 to-teal-400' 
                          : 'bg-gray-300'
                      }`}>
                        {bonusData.eligibleToWithDrawTempSuperBonus && (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-white" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        )}
                      </div>
                      <div className="ml-2 sm:ml-3 flex-grow flex items-center justify-between">
                        <span className="text-xs sm:text-sm text-gray-800 font-medium">
                          {bonusData.eligibleToWithDrawTempSuperBonus 
                            ? 'You can withdraw your temporary SuperBonus!' 
                            : 'Not yet eligible to withdraw temporary SuperBonus'}
                        </span>
                        {bonusData.eligibleToWithDrawTempSuperBonus && !bonusData.alreadyUnlockedSuperBonus && (
                          <button 
                            onClick={() => setShowEligibilityModal(true)}
                            className="text-2xs sm:text-xs bg-gradient-to-r from-teal-600 to-teal-500 text-white px-2 py-1 sm:px-2.5 sm:py-1.5 rounded hover:from-teal-700 hover:to-teal-600 transition-colors shadow-sm"
                          >
                            Details
                          </button>
                        )}
                      </div>
                    </div>
                    
                    <div className={`flex items-center p-2.5 sm:p-3.5 rounded-md ${
                      bonusData.alreadyUnlockedSuperBonus 
                        ? 'bg-gradient-to-r from-teal-100 to-teal-50 border border-teal-300' 
                        : 'bg-teal-50 border border-teal-100'
                    }`}>
                      <div className={`h-5 w-5 sm:h-6 sm:w-6 rounded-full flex items-center justify-center ${
                        bonusData.alreadyUnlockedSuperBonus 
                          ? 'bg-gradient-to-br from-teal-500 to-teal-400' 
                          : 'bg-gray-300'
                      }`}>
                        {bonusData.alreadyUnlockedSuperBonus && (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-white" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        )}
                      </div>
                      <div className="ml-2 sm:ml-3 flex-grow flex items-center justify-between">
                        <span className="text-xs sm:text-sm text-gray-800 font-medium">
                          {bonusData.alreadyUnlockedSuperBonus 
                            ? 'Congratulations! Your SuperBonus is unlocked!' 
                            : 'SuperBonus not yet unlocked'}
                        </span>
                        {bonusData.alreadyUnlockedSuperBonus && (
                          <button 
                            onClick={() => setShowSuccessModal(true)}
                            className="text-2xs sm:text-xs bg-gradient-to-r from-teal-600 to-teal-500 text-white px-2 py-1 sm:px-2.5 sm:py-1.5 rounded hover:from-teal-700 hover:to-teal-600 transition-colors shadow-sm"
                          >
                            Details
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4 sm:mt-6">
                    <button
                      onClick={handleDisburseBonus}
                      disabled={isDisbursingBonus || !bonusData.eligibleToWithDrawTempSuperBonus || bonusData.alreadyUnlockedSuperBonus}
                      className={`w-full py-2.5 sm:py-3.5 px-3 sm:px-4 rounded-lg font-medium transition text-sm sm:text-base shadow-sm ${
                        isDisbursingBonus || !bonusData.eligibleToWithDrawTempSuperBonus || bonusData.alreadyUnlockedSuperBonus
                          ? "bg-gray-300 text-gray-500 cursor-not-allowed" 
                          : "bg-gradient-to-r from-teal-600 to-teal-500 text-white hover:from-teal-700 hover:to-teal-600 transform hover:translate-y-[-1px] hover:shadow"
                      }`}
                    >
                      {isDisbursingBonus ? (
                        <div className="flex items-center justify-center">
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Processing...
                        </div>
                      ) : (
                        bonusData.alreadyUnlockedSuperBonus ? "Already Unlocked" : 
                        bonusData.eligibleToWithDrawTempSuperBonus ? "Withdraw Bonus" : "Not Eligible Yet"
                      )}
                    </button>
                  </div>
                </div>
              ) : (
                <div className="bg-white p-3 sm:p-4 rounded-lg shadow-md border border-teal-100 hover:shadow-lg transition-shadow duration-300">
                  <div className="flex items-center p-2.5 sm:p-3.5 rounded-md bg-gradient-to-r from-teal-100 to-teal-50 border border-teal-300">
                    <div className="h-5 w-5 sm:h-6 sm:w-6 rounded-full flex items-center justify-center bg-gradient-to-br from-teal-500 to-teal-400 shadow-sm">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-white" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-2 sm:ml-3">
                      <span className="text-xs sm:text-sm text-gray-800 font-medium">
                        Your SuperBonus has been successfully unlocked and credited to your account!
                      </span>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Status Messages */}
              {isSuccess && (
                <div className="bg-gradient-to-r from-green-100 to-green-50 border border-green-400 text-green-700 px-3 py-2.5 sm:px-4 sm:py-3.5 rounded-md shadow-sm">
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <p className="text-xs sm:text-sm font-medium">Success! Your bonus has been transferred to your available balance.</p>
                  </div>
                </div>
              )}
              
              {disbursementError && (
                <div className="bg-gradient-to-r from-red-100 to-red-50 border border-red-400 text-red-700 px-3 py-2.5 sm:px-4 sm:py-3.5 rounded-md shadow-sm">
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    <p className="text-xs sm:text-sm font-medium">Failed to withdraw bonus. Please try again.</p>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-4 sm:py-6">
              <div className="bg-gradient-to-r from-teal-50 to-teal-100 p-5 sm:p-7 rounded-lg shadow-inner border border-teal-200">
                <svg className="mx-auto h-12 w-12 sm:h-16 sm:w-16 text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <h3 className="mt-4 text-base sm:text-lg font-medium text-teal-900">No SuperBonus Data Found</h3>
                <p className="mt-2 text-xs sm:text-sm text-teal-700">We couldn't find any SuperBonus information for your account.</p>
                <button 
                  onClick={openReferralModal}
                  className="mt-4 px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors shadow-sm hover:shadow text-sm sm:text-base flex items-center mx-auto"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                  </svg>
                  Start Referring Friends
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Add animations keyframes for fadeIn effect */}
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
        .text-2xs {
          font-size: 0.65rem;
        }
      `}</style>
    </div>
  );
};

export default LockedSuperBonusUI;