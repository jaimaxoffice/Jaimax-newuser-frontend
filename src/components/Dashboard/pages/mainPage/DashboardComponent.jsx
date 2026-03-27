// import React, { useState, useEffect } from "react";
// import {
//   useCreateMineWalletMutation,
//   useGetMineWalletDetailsQuery,
//   useMineJMCMutation,
// } from "./dashboardApiSlice";
// import { toast } from "react-toastify";

// const MiningPage = () => {
//   const [lastMineLog, setLastMineLog] = useState(null);
//   const [showReward, setShowReward] = useState(false);
//   const [mineError, setMineError] = useState(null);

//   // ============ API Hooks ============
//   const {
//     data: walletResponse,
//     isLoading: walletLoading,
//     isError: walletError,
//     refetch: refetchWallet,
//   } = useGetMineWalletDetailsQuery();

//   const [createWallet, { isLoading: creatingWallet }] =
//     useCreateMineWalletMutation();

//   const [mineJMC, { isLoading: miningLoading }] = useMineJMCMutation();

//   const wallet = walletResponse?.data;

//   // Auto dismiss error after 5 seconds
//   useEffect(() => {
//     let timer;
//     if (mineError) {
//       timer = setTimeout(() => {
//         setMineError(null);
//       }, 5000);
//     }
//     return () => clearTimeout(timer);
//   }, [mineError]);

//   // ============ Handlers ============
//   const handleCreateWallet = async () => {
//     try {
//       const res = await createWallet().unwrap();
//       toast.success(res?.message || "Wallet created successfully!");
//       refetchWallet();
//     } catch (err) {
//       toast.error(err?.data?.message || "Failed to create wallet");
//     }
//   };

//   const handleStartMining = async () => {
//     if (!wallet) {
//       toast.warning("Please create a wallet first!");
//       return;
//     }

//     // Reset states
//     setShowReward(false);
//     setLastMineLog(null);
//     setMineError(null);

//     try {
//       const res = await mineJMC({}).unwrap();

//       if (res?.success === 1) {
//         setLastMineLog(res?.data?.mineLog);
//         setShowReward(true);
//         toast.success(
//           `⛏️ Mined ${res?.data?.mineLog?.actualReward || 0} JMC!`
//         );
//         refetchWallet();
//       }
//     } catch (err) {
//       const errorMessage =
//         err?.data?.message || err?.message || "Mining failed. Try again later.";
//       const statusCode = err?.data?.status_code || err?.status || 400;

//       setMineError({
//         message: errorMessage,
//         statusCode: statusCode,
//       });

//       toast.error(errorMessage);
//     }
//   };

//   const handleDismissError = () => {
//     setMineError(null);
//   };

//   const handleDismissReward = () => {
//     setShowReward(false);
//     setLastMineLog(null);
//   };

//   // ============ Helper ============
//   const formatDate = (dateStr) => {
//     if (!dateStr) return "Never";
//     return new Date(dateStr).toLocaleString("en-IN", {
//       dateStyle: "medium",
//       timeStyle: "short",
//     });
//   };

//   // Get mining circle state
//   const getCircleState = () => {
//     if (miningLoading) return "loading";
//     if (mineError) return "error";
//     if (showReward && lastMineLog) return "success";
//     return "idle";
//   };

//   const circleState = getCircleState();

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-teal-950 via-gray-900 to-teal-950">
//       {/* Top Bar */}
//       <div className="h-1 bg-gradient-to-r from-teal-400 via-teal-300 to-teal-500" />

//       <div className="max-w-5xl mx-auto px-4 py-8 md:py-12">
//         {/* ============ Header ============ */}
//         <header className="text-center mb-10">
//           <div className="inline-flex items-center gap-2 bg-teal-500/10 border border-teal-500/20 rounded-full px-4 py-1.5 mb-4">
//             <span className="w-2 h-2 bg-teal-400 rounded-full animate-pulse" />
//             <span className="text-teal-300 text-sm font-medium">
//               JMC Mining Platform
//             </span>
//           </div>
//           <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
//             Mine <span className="text-teal-400">JMC</span> Tokens
//           </h1>
//           <p className="text-gray-400 text-lg max-w-md mx-auto">
//             Earn JMC tokens by mining. Build your balance and grow your wallet
//             daily.
//           </p>
//         </header>

//         {/* ============ No Wallet State ============ */}
//         {!walletLoading && (walletError || !wallet) && (
//           <div className="bg-gray-900/80 border border-teal-500/20 rounded-3xl p-8 md:p-12 text-center mb-8 backdrop-blur-sm">
//             <div className="w-24 h-24 bg-teal-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
//               <svg
//                 className="w-12 h-12 text-teal-400"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={1.5}
//                   d="M21 12a2.25 2.25 0 00-2.25-2.25H15a3 3 0 11-6 0H5.25A2.25 2.25 0 003 12m18 0v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 9m18 0V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v3"
//                 />
//               </svg>
//             </div>
//             <h2 className="text-2xl font-bold text-white mb-2">
//               Create Your Mining Wallet
//             </h2>
//             <p className="text-gray-400 mb-8 max-w-sm mx-auto">
//               Set up your JMC mining wallet to start earning tokens through
//               mining sessions.
//             </p>
//             <button
//               onClick={handleCreateWallet}
//               disabled={creatingWallet}
//               className="bg-teal-500 hover:bg-teal-600 text-white font-semibold py-3.5 px-8 rounded-xl 
//                          transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed
//                          shadow-lg shadow-teal-500/25 hover:shadow-teal-500/40 hover:scale-105 active:scale-95"
//             >
//               {creatingWallet ? (
//                 <span className="flex items-center gap-2">
//                   <Spinner />
//                   Creating Wallet...
//                 </span>
//               ) : (
//                 <span className="flex items-center gap-2">
//                   <svg
//                     className="w-5 h-5"
//                     fill="none"
//                     stroke="currentColor"
//                     viewBox="0 0 24 24"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M12 4v16m8-8H4"
//                     />
//                   </svg>
//                   Create Wallet
//                 </span>
//               )}
//             </button>
//           </div>
//         )}

//         {/* ============ Loading State ============ */}
//         {walletLoading && <LoadingSkeleton />}

//         {/* ============ Main Content ============ */}
//         {wallet && !walletLoading && (
//           <>
//             {/* Balance Cards */}
//             <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
//               <BalanceCard
//                 label="Total Balance"
//                 value={parseFloat(wallet.totalBalance).toFixed(2)}
//                 unit="JMC"
//                 icon={
//                   <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
//                       d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
//                     />
//                   </svg>
//                 }
//                 highlight
//               />
//               <BalanceCard
//                 label="Per Mine"
//                 value={wallet.perMineJMC}
//                 unit="JMC"
//                 icon={
//                   <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
//                       d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
//                     />
//                   </svg>
//                 }
//               />
//               <BalanceCard
//                 label="Lifetime Earned"
//                 value={parseFloat(wallet.totalEarnedLifetime).toFixed(2)}
//                 unit="JMC"
//                 icon={
//                   <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
//                       d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
//                     />
//                   </svg>
//                 }
//               />
//               <BalanceCard
//                 label="Mining Power"
//                 value={wallet.miningPowerPct}
//                 unit="%"
//                 icon={
//                   <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
//                       d="M13 10V3L4 14h7v7l9-11h-7z"
//                     />
//                   </svg>
//                 }
//               />
//             </div>

//             {/* ============ Mining Console ============ */}
//             <div className="bg-gray-900/80 border border-teal-500/20 rounded-3xl p-6 md:p-10 mb-8 backdrop-blur-sm">
//               <div className="flex flex-col items-center">
//                 {/* Mining Circle */}
//                 <div className="relative mb-8">
//                   {/* Pulse ring */}
//                   {miningLoading && (
//                     <div className="absolute -inset-4 rounded-full bg-teal-500/10 animate-ping" />
//                   )}
//                   {circleState === "error" && (
//                     <div className="absolute -inset-3 rounded-full bg-red-500/5 animate-pulse" />
//                   )}

//                   <div
//                     className={`relative w-44 h-44 md:w-56 md:h-56 rounded-full flex items-center justify-center
//                       transition-all duration-500 z-10
//                       ${
//                         circleState === "loading"
//                           ? "bg-gradient-to-br from-teal-500/20 to-teal-600/10 border-2 border-teal-400 shadow-lg shadow-teal-500/20"
//                           : circleState === "error"
//                           ? "bg-gradient-to-br from-red-500/10 to-red-600/5 border-2 border-red-500/50 shadow-lg shadow-red-500/10"
//                           : circleState === "success"
//                           ? "bg-gradient-to-br from-teal-500/20 to-emerald-600/10 border-2 border-teal-300"
//                           : "bg-gray-800/80 border-2 border-gray-700 hover:border-teal-500/50"
//                       }`}
//                   >
//                     {/* Spinning Ring - Loading */}
//                     {miningLoading && (
//                       <svg
//                         className="absolute inset-0 w-full h-full animate-spin-slow"
//                         viewBox="0 0 100 100"
//                       >
//                         <circle
//                           cx="50"
//                           cy="50"
//                           r="46"
//                           fill="none"
//                           stroke="url(#tealGrad)"
//                           strokeWidth="3"
//                           strokeDasharray="60 229"
//                           strokeLinecap="round"
//                         />
//                         <defs>
//                           <linearGradient id="tealGrad" x1="0%" y1="0%" x2="100%" y2="0%">
//                             <stop offset="0%" stopColor="#2dd4bf" />
//                             <stop offset="50%" stopColor="#14b8a6" />
//                             <stop offset="100%" stopColor="#0d9488" stopOpacity="0" />
//                           </linearGradient>
//                         </defs>
//                       </svg>
//                     )}

//                     {/* Center Content */}
//                     <div className="text-center z-10 px-4">
//                       {/* LOADING STATE */}
//                       {circleState === "loading" && (
//                         <>
//                           <svg
//                             className="w-10 h-10 md:w-12 md:h-12 text-teal-400 mx-auto mb-2 animate-bounce"
//                             fill="none"
//                             stroke="currentColor"
//                             viewBox="0 0 24 24"
//                           >
//                             <path
//                               strokeLinecap="round"
//                               strokeLinejoin="round"
//                               strokeWidth={1.5}
//                               d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
//                             />
//                           </svg>
//                           <p className="text-teal-300 font-semibold text-sm">
//                             Mining...
//                           </p>
//                           <div className="flex items-center justify-center gap-1 mt-2">
//                             <span className="w-1.5 h-1.5 bg-teal-400 rounded-full animate-bounce [animation-delay:0ms]" />
//                             <span className="w-1.5 h-1.5 bg-teal-400 rounded-full animate-bounce [animation-delay:150ms]" />
//                             <span className="w-1.5 h-1.5 bg-teal-400 rounded-full animate-bounce [animation-delay:300ms]" />
//                           </div>
//                         </>
//                       )}

//                       {/* ERROR STATE */}
//                       {circleState === "error" && (
//                         <>
//                           <svg
//                             className="w-12 h-12 md:w-14 md:h-14 text-red-400 mx-auto mb-2"
//                             fill="none"
//                             stroke="currentColor"
//                             viewBox="0 0 24 24"
//                           >
//                             <path
//                               strokeLinecap="round"
//                               strokeLinejoin="round"
//                               strokeWidth={1.5}
//                               d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
//                             />
//                           </svg>
//                           <p className="text-red-400 font-semibold text-xs leading-tight">
//                             Mining Failed
//                           </p>
//                         </>
//                       )}

//                       {/* SUCCESS STATE */}
//                       {circleState === "success" && lastMineLog && (
//                         <>
//                           <p className="text-lg text-teal-400 font-medium">
//                             Earned
//                           </p>
//                           <p className="text-4xl md:text-5xl font-bold text-white">
//                             +{lastMineLog.actualReward}
//                           </p>
//                           <p className="text-teal-300 text-sm font-medium">
//                             JMC
//                           </p>
//                         </>
//                       )}

//                       {/* IDLE STATE */}
//                       {circleState === "idle" && (
//                         <>
//                           <svg
//                             className="w-12 h-12 md:w-14 md:h-14 text-teal-400 mx-auto mb-2"
//                             fill="none"
//                             stroke="currentColor"
//                             viewBox="0 0 24 24"
//                           >
//                             <path
//                               strokeLinecap="round"
//                               strokeLinejoin="round"
//                               strokeWidth={1.5}
//                               d="M20.893 13.393l-1.135-1.135a2.252 2.252 0 01-.421-.585l-1.08-2.16a.414.414 0 00-.663-.107.827.827 0 01-.812.21l-1.273-.363a.89.89 0 00-.738 1.595l.587.39c.59.395.674 1.23.172 1.732l-.2.2c-.212.212-.33.498-.33.796v.41c0 .409-.11.809-.32 1.158l-1.315 2.191a2.11 2.11 0 01-1.81 1.025 1.055 1.055 0 01-1.055-1.055v-1.172c0-.92-.56-1.747-1.414-2.089l-.655-.261a2.25 2.25 0 01-1.383-2.46l.007-.042a2.25 2.25 0 01.29-.787l.09-.15a2.25 2.25 0 012.37-1.048l1.178.236a1.125 1.125 0 001.302-.795l.208-.73a1.125 1.125 0 00-.578-1.315l-.665-.332-.091.091a2.25 2.25 0 01-1.591.659h-.18c-.249 0-.487.1-.662.274a.931.931 0 01-1.458-1.137l1.411-2.353a2.25 2.25 0 00.286-.76m11.928 9.869A9 9 0 008.965 3.525m11.928 9.868A9 9 0 118.965 3.525"
//                             />
//                           </svg>
//                           <p className="text-gray-400 text-sm font-medium">
//                             Ready to Mine
//                           </p>
//                         </>
//                       )}
//                     </div>
//                   </div>
//                 </div>

//                 {/* ===== ERROR CARD ===== */}
//                 {mineError && (
//                   <div className="bg-red-500/10 border border-red-500/30 rounded-2xl px-6 py-4 mb-6 w-full max-w-lg animate-fadeIn">
//                     <div className="flex items-start gap-3">
//                       <div className="flex-shrink-0 w-10 h-10 bg-red-500/20 rounded-full flex items-center justify-center mt-0.5">
//                         <svg
//                           className="w-5 h-5 text-red-400"
//                           fill="none"
//                           stroke="currentColor"
//                           viewBox="0 0 24 24"
//                         >
//                           <path
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                             strokeWidth={2}
//                             d="M6 18L18 6M6 6l12 12"
//                           />
//                         </svg>
//                       </div>
//                       <div className="flex-1 min-w-0">
//                         <h4 className="text-red-300 font-semibold text-sm">
//                           Mining Failed
//                         </h4>
//                         <p className="text-red-200/80 text-sm mt-1">
//                           {mineError.message}
//                         </p>
//                         <div className="flex items-center gap-3 mt-3">
//                           <span className="text-red-400/60 text-xs bg-red-500/10 px-2 py-0.5 rounded">
//                             Error {mineError.statusCode}
//                           </span>
//                           <button
//                             onClick={handleDismissError}
//                             className="text-red-300/70 hover:text-red-200 text-xs underline transition-colors"
//                           >
//                             Dismiss
//                           </button>
//                         </div>
//                       </div>
//                       <button
//                         onClick={handleDismissError}
//                         className="flex-shrink-0 text-red-400/50 hover:text-red-300 transition-colors"
//                       >
//                         <svg
//                           className="w-4 h-4"
//                           fill="none"
//                           stroke="currentColor"
//                           viewBox="0 0 24 24"
//                         >
//                           <path
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                             strokeWidth={2}
//                             d="M6 18L18 6M6 6l12 12"
//                           />
//                         </svg>
//                       </button>
//                     </div>
//                   </div>
//                 )}

//                 {/* ===== SUCCESS REWARD CARD ===== */}
//                 {showReward && lastMineLog && (
//                   <div className="bg-teal-500/10 border border-teal-500/30 rounded-2xl px-6 py-4 mb-6 w-full max-w-lg animate-fadeIn">
//                     <div className="flex items-center justify-between mb-3">
//                       <div className="flex items-center gap-2">
//                         <div className="w-8 h-8 bg-teal-500/20 rounded-full flex items-center justify-center">
//                           <svg
//                             className="w-4 h-4 text-teal-300"
//                             fill="none"
//                             stroke="currentColor"
//                             viewBox="0 0 24 24"
//                           >
//                             <path
//                               strokeLinecap="round"
//                               strokeLinejoin="round"
//                               strokeWidth={2}
//                               d="M5 13l4 4L19 7"
//                             />
//                           </svg>
//                         </div>
//                         <h4 className="text-teal-300 font-semibold text-sm">
//                           Mining Successful!
//                         </h4>
//                       </div>
//                       <button
//                         onClick={handleDismissReward}
//                         className="text-teal-400/50 hover:text-teal-300 transition-colors"
//                       >
//                         <svg
//                           className="w-4 h-4"
//                           fill="none"
//                           stroke="currentColor"
//                           viewBox="0 0 24 24"
//                         >
//                           <path
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                             strokeWidth={2}
//                             d="M6 18L18 6M6 6l12 12"
//                           />
//                         </svg>
//                       </button>
//                     </div>
//                     <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
//                       <div className="bg-teal-500/10 rounded-xl p-3 text-center">
//                         <p className="text-teal-400/70 text-xs uppercase tracking-wider font-medium">
//                           Slot
//                         </p>
//                         <p className="text-white font-bold text-lg mt-0.5">
//                           #{lastMineLog.slotNumber}
//                         </p>
//                       </div>
//                       <div className="bg-teal-500/10 rounded-xl p-3 text-center">
//                         <p className="text-teal-400/70 text-xs uppercase tracking-wider font-medium">
//                           Base
//                         </p>
//                         <p className="text-white font-bold text-lg mt-0.5">
//                           {lastMineLog.baseReward}
//                         </p>
//                       </div>
//                       <div className="bg-teal-500/10 rounded-xl p-3 text-center">
//                         <p className="text-teal-400/70 text-xs uppercase tracking-wider font-medium">
//                           Earned
//                         </p>
//                         <p className="text-teal-300 font-bold text-lg mt-0.5">
//                           +{lastMineLog.actualReward}
//                         </p>
//                       </div>
//                       <div className="bg-teal-500/10 rounded-xl p-3 text-center">
//                         <p className="text-teal-400/70 text-xs uppercase tracking-wider font-medium">
//                           Status
//                         </p>
//                         <span className="inline-block bg-teal-500/20 text-teal-300 text-xs px-2 py-0.5 rounded-full font-medium capitalize mt-1">
//                           {lastMineLog.status}
//                         </span>
//                       </div>
//                     </div>
//                     <div className="mt-3 pt-3 border-t border-teal-500/20 flex items-center justify-between">
//                       <p className="text-gray-400 text-xs">
//                         Date:{" "}
//                         <span className="text-teal-300">
//                           {lastMineLog.mineDate}
//                         </span>
//                       </p>
//                       <p className="text-gray-400 text-xs">
//                         Mined at:{" "}
//                         <span className="text-teal-300">
//                           {formatDate(lastMineLog.minedAt)}
//                         </span>
//                       </p>
//                     </div>
//                   </div>
//                 )}

//                 {/* Mine Button */}
//                 <button
//                   onClick={handleStartMining}
//                   disabled={!wallet || miningLoading}
//                   className={`group font-bold py-4 px-12 rounded-2xl text-lg transition-all duration-300 
//                              disabled:opacity-40 disabled:cursor-not-allowed
//                              hover:scale-105 active:scale-95
//                              ${
//                                mineError
//                                  ? "bg-teal-500 hover:bg-teal-600 text-white shadow-lg shadow-teal-500/25 hover:shadow-teal-500/40"
//                                  : "bg-teal-500 hover:bg-teal-600 text-white shadow-lg shadow-teal-500/25 hover:shadow-teal-500/40"
//                              }`}
//                 >
//                   {miningLoading ? (
//                     <span className="flex items-center gap-3">
//                       <Spinner />
//                       Mining in progress...
//                     </span>
//                   ) : mineError ? (
//                     <span className="flex items-center gap-2">
//                       <svg
//                         className="w-6 h-6 group-hover:rotate-45 transition-transform"
//                         fill="none"
//                         stroke="currentColor"
//                         viewBox="0 0 24 24"
//                       >
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           strokeWidth={2}
//                           d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
//                         />
//                       </svg>
//                       Retry Mining
//                     </span>
//                   ) : (
//                     <span className="flex items-center gap-2">
//                       <svg
//                         className="w-6 h-6 group-hover:rotate-12 transition-transform"
//                         fill="none"
//                         stroke="currentColor"
//                         viewBox="0 0 24 24"
//                       >
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           strokeWidth={2}
//                           d="M13 10V3L4 14h7v7l9-11h-7z"
//                         />
//                       </svg>
//                       Start Mining
//                     </span>
//                   )}
//                 </button>
//               </div>
//             </div>

//             {/* ============ Wallet Details Grid ============ */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
//               {/* Earnings Breakdown */}
//               <div className="bg-gray-900/80 border border-teal-500/20 rounded-3xl p-6 backdrop-blur-sm">
//                 <h3 className="text-white font-semibold text-lg mb-5 flex items-center gap-2">
//                   <svg className="w-5 h-5 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
//                       d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
//                     />
//                   </svg>
//                   Earnings Breakdown
//                 </h3>
//                 <div className="space-y-3">
//                   <DetailRow label="Total Balance" value={`${parseFloat(wallet.totalBalance).toFixed(2)} JMC`} color="text-teal-300" />
//                   <DetailRow label="Lifetime Earned" value={`${parseFloat(wallet.totalEarnedLifetime).toFixed(2)} JMC`} color="text-white" />
//                   {/* <DetailRow label="Total Deducted" value={`${parseFloat(wallet.totalDeducted).toFixed(2)} JMC`} color="text-red-400" />
//                   <DetailRow label="Referral Earned" value={`${parseFloat(wallet.totalReferralEarned).toFixed(2)} JMC`} color="text-blue-400" />
//                   <DetailRow label="Bonus Earned" value={`${parseFloat(wallet.totalBonusEarned).toFixed(2)} JMC`} color="text-yellow-400" /> */}
//                   <DetailRow label="Per Mine Reward" value={`${wallet.perMineJMC} JMC`} color="text-teal-400" />
//                 </div>
//               </div>

//               {/* Mining Status */}
//               <div className="bg-gray-900/80 border border-teal-500/20 rounded-3xl p-6 backdrop-blur-sm">
//                 <h3 className="text-white font-semibold text-lg mb-5 flex items-center gap-2">
//                   <svg className="w-5 h-5 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
//                       d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
//                     />
//                   </svg>
//                   Mining Status
//                 </h3>
//                 <div className="space-y-3">
//                   {/* Mining Power Bar */}
//                   <div className="bg-gray-800/80 rounded-xl p-4">
//                     <div className="flex justify-between items-center mb-2">
//                       <span className="text-gray-400 text-sm">Mining Power</span>
//                       <span className="text-teal-300 font-bold">{wallet.miningPowerPct}%</span>
//                     </div>
//                     <div className="bg-gray-700 rounded-full h-2.5 overflow-hidden">
//                       <div
//                         className={`h-full rounded-full transition-all duration-500 ${
//                           wallet.miningPowerPct >= 80
//                             ? "bg-teal-400"
//                             : wallet.miningPowerPct >= 50
//                             ? "bg-yellow-400"
//                             : "bg-red-400"
//                         }`}
//                         style={{ width: `${wallet.miningPowerPct}%` }}
//                       />
//                     </div>
//                   </div>

//                   <DetailRow
//                     label="Consecutive Missed"
//                     value={wallet.consecutiveMissedCount}
//                     color={wallet.consecutiveMissedCount > 0 ? "text-red-400" : "text-green-400"}
//                   />
//                   <DetailRow
//                     label="Recovery Mode"
//                     value={
//                       <StatusBadge
//                         active={wallet.isInRecovery}
//                         activeText="In Recovery"
//                         inactiveText="Normal"
//                         activeColor="bg-yellow-500/20 text-yellow-300"
//                         inactiveColor="bg-green-500/20 text-green-300"
//                       />
//                     }
//                   />
//                   {wallet.isInRecovery && (
//                     <DetailRow
//                       label="Recovery Progress"
//                       value={`${wallet.recoveryMinesCompleted} / ${wallet.recoveryMinesRequired}`}
//                       color="text-yellow-300"
//                     />
//                   )}
//                   <DetailRow
//                     label="Resurrection Mode"
//                     value={
//                       <StatusBadge
//                         active={wallet.isInResurrection}
//                         activeText="In Resurrection"
//                         inactiveText="Normal"
//                         activeColor="bg-purple-500/20 text-purple-300"
//                         inactiveColor="bg-green-500/20 text-green-300"
//                       />
//                     }
//                   />
//                   <DetailRow
//                     label="Penalty Tier"
//                     value={
//                       <span className={`font-semibold ${wallet.currentPenaltyTierId > 0 ? "text-red-400" : "text-green-400"}`}>
//                         {wallet.currentPenaltyTierId > 0 ? `Tier ${wallet.currentPenaltyTierId}` : "None"}
//                       </span>
//                     }
//                   />
//                   <DetailRow label="Last Mined" value={formatDate(wallet.lastMineAt)} color="text-gray-300" />
//                 </div>
//               </div>
//             </div>

//             {/* ============ Wallet Info Footer ============ */}
//             <div className="bg-gray-900/80 border border-teal-500/20 rounded-3xl p-6 backdrop-blur-sm mb-8">
//               <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
//                 <div>
//                   <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">Wallet ID</p>
//                   <p className="text-white font-mono text-sm bg-gray-800 px-3 py-1.5 rounded-lg inline-block">
//                     {wallet.id}
//                   </p>
//                 </div>
//                 <div>
//                   <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">Created</p>
//                   <p className="text-gray-300 text-sm font-medium">{formatDate(wallet.createdAt)}</p>
//                 </div>
//                 <div>
//                   <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">Last Updated</p>
//                   <p className="text-gray-300 text-sm font-medium">{formatDate(wallet.updatedAt)}</p>
//                 </div>
//                 <button
//                   onClick={refetchWallet}
//                   className="bg-teal-500/10 hover:bg-teal-500/20 text-teal-300 border border-teal-500/30 
//                              px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200
//                              flex items-center gap-2"
//                 >
//                   <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
//                       d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
//                     />
//                   </svg>
//                   Refresh
//                 </button>
//               </div>
//             </div>


//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// // ============================================================
// //  SUB COMPONENTS
// // ============================================================

// const BalanceCard = ({ label, value, unit, icon, highlight }) => (
//   <div
//     className={`rounded-2xl p-5 border backdrop-blur-sm transition-all duration-300 hover:scale-[1.02]
//     ${
//       highlight
//         ? "bg-teal-500/10 border-teal-500/30 shadow-lg shadow-teal-500/10"
//         : "bg-gray-900/80 border-gray-700/50"
//     }`}
//   >
//     <div className={`w-9 h-9 rounded-lg flex items-center justify-center mb-3 ${
//       highlight ? "bg-teal-500/20 text-teal-300" : "bg-gray-800 text-gray-400"
//     }`}>
//       {icon}
//     </div>
//     <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">{label}</p>
//     <p className="text-white text-2xl font-bold">
//       {value} <span className="text-sm font-normal text-gray-400">{unit}</span>
//     </p>
//   </div>
// );

// const DetailRow = ({ label, value, color = "text-white" }) => (
//   <div className="flex items-center justify-between bg-gray-800/60 rounded-xl px-4 py-3">
//     <span className="text-gray-400 text-sm">{label}</span>
//     {typeof value === "string" || typeof value === "number" ? (
//       <span className={`font-semibold text-sm ${color}`}>{value}</span>
//     ) : (
//       value
//     )}
//   </div>
// );

// const StatusBadge = ({ active, activeText, inactiveText, activeColor, inactiveColor }) => (
//   <span className={`text-xs px-3 py-1 rounded-full font-medium ${active ? activeColor : inactiveColor}`}>
//     {active ? activeText : inactiveText}
//   </span>
// );

// const InfoCard = ({ icon, title, desc }) => (
//   <div className="bg-gray-900/80 border border-gray-700/50 rounded-2xl p-5 hover:border-teal-500/30 transition-all duration-300 group">
//     <div className="w-10 h-10 rounded-xl bg-teal-500/10 text-teal-400 flex items-center justify-center mb-3 group-hover:bg-teal-500/20 transition-colors">
//       {icon}
//     </div>
//     <h4 className="text-white font-semibold mb-1">{title}</h4>
//     <p className="text-gray-400 text-sm">{desc}</p>
//   </div>
// );

// const Spinner = () => (
//   <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
//     <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
//     <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
//   </svg>
// );

// const LoadingSkeleton = () => (
//   <div className="space-y-6 animate-pulse">
//     <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//       {[...Array(4)].map((_, i) => (
//         <div key={i} className="bg-gray-800/60 border border-gray-700/50 rounded-2xl p-5">
//           <div className="w-9 h-9 bg-gray-700 rounded-lg mb-3" />
//           <div className="h-3 bg-gray-700 rounded w-16 mb-2" />
//           <div className="h-7 bg-gray-700 rounded w-24" />
//         </div>
//       ))}
//     </div>
//     <div className="bg-gray-800/60 border border-gray-700/50 rounded-3xl p-10">
//       <div className="flex flex-col items-center">
//         <div className="w-48 h-48 bg-gray-700 rounded-full mb-6" />
//         <div className="h-12 bg-gray-700 rounded-2xl w-48" />
//       </div>
//     </div>
//     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//       {[...Array(2)].map((_, i) => (
//         <div key={i} className="bg-gray-800/60 border border-gray-700/50 rounded-3xl p-6">
//           <div className="h-5 bg-gray-700 rounded w-40 mb-5" />
//           <div className="space-y-3">
//             {[...Array(5)].map((_, j) => (
//               <div key={j} className="h-12 bg-gray-700/50 rounded-xl" />
//             ))}
//           </div>
//         </div>
//       ))}
//     </div>
//   </div>
// );

// // export default MiningPage;
// import React, { useState, useEffect, useMemo } from "react";
// import {
//   useCreateMineWalletMutation,
//   useGetMineWalletDetailsQuery,
//   useMineJMCMutation,
//   useGetSlotsInfoQuery,
//   useGetTodayMineInfoQuery,
//   useGetUserMineLogsQuery,
//   useGetUserWalletTxsQuery,
//   useGetUserReferralBonusQuery,
// } from "./dashboardApiSlice";
// import { toast } from "react-toastify";

// // ─── Global Styles ────────────────────────────────────────────
// const GlobalStyle = () => (
//   <style>{`
//     @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;700&display=swap');

//     :root {
//       --teal-50:  #f0fdfa;
//       --teal-100: #ccfbf1;
//       --teal-200: #99f6e4;
//       --teal-300: #5eead4;
//       --teal-400: #2dd4bf;
//       --teal-500: #14b8a6;
//       --teal-600: #0d9488;
//       --teal-700: #0f766e;
//       --teal-800: #115e59;
//       --teal-900: #134e4a;
//       --slate-50:  #f8fafc;
//       --slate-100: #f1f5f9;
//       --slate-200: #e2e8f0;
//       --slate-300: #cbd5e1;
//       --slate-400: #94a3b8;
//       --slate-500: #64748b;
//       --slate-600: #475569;
//       --slate-700: #334155;
//       --slate-800: #1e293b;
//       --slate-900: #0f172a;
//       --red:    #ef4444;
//       --green:  #10b981;
//       --yellow: #f59e0b;
//     }

//     .mp * { box-sizing: border-box; margin: 0; padding: 0; }

//     .mp {
//       font-family: 'Plus Jakarta Sans', sans-serif;
//       background: #f8fafc;
//       min-height: 100vh;
//       color: var(--slate-800);
//     }

//     .mono { font-family: 'JetBrains Mono', monospace; }

//     @keyframes spin    { to { transform: rotate(360deg); } }
//     @keyframes fadeUp  { from { opacity:0; transform:translateY(12px); } to { opacity:1; transform:translateY(0); } }
//     @keyframes blink   { 0%,100%{opacity:1;} 50%{opacity:0.3;} }
//     @keyframes shimmer { 0%{background-position:-400px 0;} 100%{background-position:400px 0;} }
//     @keyframes ripple  { 0%{transform:scale(1);opacity:.4;} 100%{transform:scale(1.7);opacity:0;} }
//     @keyframes orbIdle { 0%,100%{box-shadow:0 0 0 0 rgba(20,184,166,0),0 8px 40px rgba(20,184,166,.18);} 50%{box-shadow:0 0 0 12px rgba(20,184,166,.06),0 8px 40px rgba(20,184,166,.28);} }
//     @keyframes orbMine { 0%,100%{box-shadow:0 0 0 0 rgba(20,184,166,0),0 12px 60px rgba(20,184,166,.35);} 50%{box-shadow:0 0 0 18px rgba(20,184,166,.1),0 12px 60px rgba(20,184,166,.5);} }

//     .fade-up { animation: fadeUp .4s ease both; }

//     .lift { transition: transform .2s ease, box-shadow .2s ease; }
//     .lift:hover { transform: translateY(-3px); box-shadow: 0 12px 36px rgba(14,165,150,.12) !important; }

//     .skeleton {
//       background: linear-gradient(90deg, var(--slate-100) 25%, var(--slate-200) 50%, var(--slate-100) 75%);
//       background-size: 400px 100%;
//       animation: shimmer 1.4s infinite;
//       border-radius: 12px;
//     }

//     .tab-btn { position:relative; background:none; border:none; cursor:pointer; transition:color .2s; }
//     .tab-btn::after { content:''; position:absolute; bottom:-1px; left:0; right:0; height:2px; background:var(--teal-500); border-radius:2px 2px 0 0; transform:scaleX(0); transition:transform .25s ease; }
//     .tab-btn.active { color:var(--teal-600) !important; }
//     .tab-btn.active::after { transform:scaleX(1); }

//     .dtable { width:100%; border-collapse:collapse; }
//     .dtable th { padding:10px 14px; text-align:left; font-family:'JetBrains Mono',monospace; font-size:10px; letter-spacing:.12em; text-transform:uppercase; color:var(--slate-400); border-bottom:1px solid var(--slate-200); font-weight:500; }
//     .dtable td { padding:13px 14px; border-bottom:1px solid var(--slate-100); font-size:14px; }
//     .dtable tbody tr:last-child td { border-bottom:none; }
//     .dtable tbody tr:hover td { background:#f0fdfa; }

//     .mp ::-webkit-scrollbar { width:4px; height:4px; }
//     .mp ::-webkit-scrollbar-track { background:var(--slate-100); }
//     .mp ::-webkit-scrollbar-thumb { background:var(--teal-300); border-radius:4px; }

//     .tab-strip { overflow-x:auto; scrollbar-width:none; }
//     .tab-strip::-webkit-scrollbar { display:none; }

//     .mine-btn {
//       background: linear-gradient(135deg, var(--teal-500), var(--teal-700));
//       color:white; border:none; border-radius:14px; cursor:pointer;
//       font-family:'Plus Jakarta Sans',sans-serif; font-weight:700;
//       transition: transform .2s, box-shadow .25s, opacity .2s;
//       display:inline-flex; align-items:center; justify-content:center;
//     }
//     .mine-btn:hover:not(:disabled) { transform:translateY(-2px); box-shadow:0 16px 48px rgba(20,184,166,.45); }
//     .mine-btn:active:not(:disabled) { transform:translateY(0); }
//     .mine-btn:disabled { opacity:.45; cursor:not-allowed; }

//     .sec-btn {
//       background:white; border:1px solid var(--slate-200); border-radius:10px;
//       color:var(--slate-600); cursor:pointer; font-family:'Plus Jakarta Sans',sans-serif;
//       font-weight:600; font-size:13px; transition:all .2s;
//     }
//     .sec-btn:hover { border-color:var(--teal-400); color:var(--teal-600); background:var(--teal-50); }
//   `}</style>
// );

// // ─── Slot Timer Hook — uses startHour / endHour (integers) ───
// const useSlotTimer = (slots) => {
//   const [timeLeft,     setTimeLeft]     = useState({ hours:0, minutes:0, seconds:0, progress:0 });
//   const [currentSlot,  setCurrentSlot]  = useState(null);
//   const [nextSlot,     setNextSlot]     = useState(null);

//   useEffect(() => {
//     if (!slots || slots.length === 0) return;

//     const tick = () => {
//       const now     = new Date();
//       const nowH    = now.getHours();
//       const nowM    = now.getMinutes();
//       const nowS    = now.getSeconds();
//       const nowMins = nowH * 60 + nowM;

//       let active   = null;
//       let upcoming = null;

//       for (const slot of slots) {
//         const startMins = slot.startHour * 60;
//         const endMins   = slot.endHour * 60; // endHour=24 → 1440, still works
//         if (nowMins >= startMins && nowMins < endMins) { active = slot; break; }
//       }

//       for (const slot of slots) {
//         if (nowMins < slot.startHour * 60) { upcoming = slot; break; }
//       }
//       if (!upcoming) upcoming = slots[0] || null; // wrap to tomorrow

//       setCurrentSlot(active);
//       setNextSlot(active ? (slots[(slots.indexOf(active) + 1) % slots.length] || null) : upcoming);

//       if (active) {
//         const startMins  = active.startHour * 60;
//         const endMins    = active.endHour   * 60;
//         const totalSecs  = (endMins - startMins) * 60;
//         const elapsed    = (nowMins - startMins) * 60 + nowS;
//         const remaining  = Math.max(0, totalSecs - elapsed);
//         const progress   = totalSecs > 0 ? Math.min(100, (elapsed / totalSecs) * 100) : 0;
//         setTimeLeft({ hours: Math.floor(remaining/3600), minutes: Math.floor((remaining%3600)/60), seconds: remaining%60, progress });
//       } else if (upcoming) {
//         let waitMins = upcoming.startHour * 60 - nowMins;
//         if (waitMins < 0) waitMins += 24 * 60;
//         const remaining = Math.max(0, waitMins * 60 - nowS);
//         setTimeLeft({ hours: Math.floor(remaining/3600), minutes: Math.floor((remaining%3600)/60), seconds: remaining%60, progress: 0 });
//       }
//     };

//     tick();
//     const id = setInterval(tick, 1000);
//     return () => clearInterval(id);
//   }, [slots]);

//   return { timeLeft, currentSlot, nextSlot };
// };

// // ─── Helpers ─────────────────────────────────────────────────
// const fmt24 = (h) => {
//   if (h === 24) return '12:00 AM'; // midnight end
//   const suffix = h >= 12 ? 'PM' : 'AM';
//   const hh = h % 12 === 0 ? 12 : h % 12;
//   return `${hh}:00 ${suffix}`;
// };
// const pad = (n) => String(n || 0).padStart(2, '0');

// // ─── Main Component ───────────────────────────────────────────
// const MiningPage = () => {
//   const [lastMineLog,  setLastMineLog]  = useState(null);
//   const [showReward,   setShowReward]   = useState(false);
//   const [mineError,    setMineError]    = useState(null);
//   const [activeTab,    setActiveTab]    = useState('mining');
//   const [logsPage,     setLogsPage]     = useState(1);
//   const [txsPage,      setTxsPage]      = useState(1);
//   const [referralPage, setReferralPage] = useState(1);
//   const PER_PAGE = 10;

//   const { data: walletRes,  isLoading: walletLoading, isError: walletErr, refetch: refetchWallet }  = useGetMineWalletDetailsQuery();
//   const { data: slotsRes,   isLoading: slotsLoading,  refetch: refetchSlots }                       = useGetSlotsInfoQuery();
//   const { data: todayRes,                             refetch: refetchToday }                        = useGetTodayMineInfoQuery(undefined, { skip: !walletRes?.data });
//   const { data: logsRes,    isLoading: logsLoading,   refetch: refetchLogs }                         = useGetUserMineLogsQuery({ page: logsPage,     limit: PER_PAGE }, { skip: !walletRes?.data });
//   const { data: txsRes,     isLoading: txsLoading,    refetch: refetchTxs }                          = useGetUserWalletTxsQuery({ page: txsPage,      limit: PER_PAGE }, { skip: !walletRes?.data });
//   const { data: refRes,     isLoading: refLoading,    refetch: refetchRef }                          = useGetUserReferralBonusQuery({ page: referralPage, limit: PER_PAGE }, { skip: !walletRes?.data });

//   const [createWallet, { isLoading: creating }] = useCreateMineWalletMutation();
//   const [mineJMC,      { isLoading: mining   }] = useMineJMCMutation();

//   const wallet    = walletRes?.data;
//   const slotsData = slotsRes?.data;                      // { date, activeSlot, slots:[...] }
//   const slots     = useMemo(() => slotsData?.slots || [], [slotsData]);

//   const { timeLeft, currentSlot, nextSlot } = useSlotTimer(slots);

//   useEffect(() => {
//     if (!mineError) return;
//     const t = setTimeout(() => setMineError(null), 6000);
//     return () => clearTimeout(t);
//   }, [mineError]);

//   useEffect(() => {
//     if (activeTab === 'logs')         setLogsPage(1);
//     if (activeTab === 'transactions') setTxsPage(1);
//     if (activeTab === 'referrals')    setReferralPage(1);
//   }, [activeTab]);

//   const handleCreate = async () => {
//     try   { const r = await createWallet().unwrap(); toast.success(r?.message || 'Wallet created!'); refetchWallet(); }
//     catch (e) { toast.error(e?.data?.message || 'Failed to create wallet'); }
//   };

//   const handleMine = async () => {
//     if (!wallet) { toast.warning('Create a wallet first!'); return; }
//     setShowReward(false); setLastMineLog(null); setMineError(null);
//     try {
//       const r = await mineJMC({}).unwrap();
//       if (r?.success === 1) {
//         setLastMineLog(r?.data?.mineLog); setShowReward(true);
//         toast.success(`⛏ Mined ${r?.data?.mineLog?.actualReward || 0} JMC!`);
//         refetchWallet(); refetchToday(); refetchLogs(); refetchTxs();
//       }
//     } catch (e) {
//       setMineError({ message: e?.data?.message || 'Mining failed. Try again.', code: e?.data?.status_code || 400 });
//       toast.error(e?.data?.message || 'Mining failed');
//     }
//   };

//   const refreshAll = () => {
//     refetchWallet(); refetchToday(); refetchLogs();
//     refetchTxs(); refetchRef(); refetchSlots();
//     toast.info('Refreshed');
//   };

//   const fmtDate = (d) => d ? new Date(d).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' }) : '—';

//   const circleState = mining ? 'mining' : mineError ? 'error' : (showReward && lastMineLog) ? 'success' : 'idle';

//   const tabs = [
//     { id: 'mining',       label: 'Mining',    icon: '⛏' },
//     { id: 'logs',         label: 'History',   icon: '📋' },
//     { id: 'transactions', label: 'Wallet',    icon: '💰' },
//     { id: 'referrals',    label: 'Referrals', icon: '👥' },
//     { id: 'slots',        label: 'Slots',     icon: '🕐' },
//   ];

//   return (
//     <div className="mp">
//       <GlobalStyle />

//       {/* ── Top navbar ── */}
//       <div style={{ background:'white', borderBottom:'1px solid var(--slate-200)', position:'sticky', top:0, zIndex:50, boxShadow:'0 1px 0 var(--slate-100)' }}>
//         <div style={{ maxWidth:1100, margin:'0 auto', padding:'0 20px', height:62, display:'flex', alignItems:'center', justifyContent:'space-between' }}>
//           <div style={{ display:'flex', alignItems:'center', gap:10 }}>
//             <div style={{ width:34, height:34, background:'linear-gradient(135deg,var(--teal-500),var(--teal-700))', borderRadius:9, display:'flex', alignItems:'center', justifyContent:'center', color:'white', fontSize:17, boxShadow:'0 4px 12px rgba(20,184,166,.35)' }}>⛏</div>
//             <span style={{ fontWeight:800, fontSize:17, color:'var(--slate-800)', letterSpacing:'-.02em' }}>JMC <span style={{ color:'var(--teal-600)' }}>Mining</span></span>
//           </div>
//           <div style={{ display:'flex', alignItems:'center', gap:10 }}>
//             {wallet && (
//               <div className="mono" style={{ fontSize:13, color:'var(--slate-500)', background:'var(--teal-50)', border:'1px solid var(--teal-200)', borderRadius:8, padding:'5px 12px' }}>
//                 <span style={{ color:'var(--slate-400)' }}>Balance </span>
//                 <span style={{ fontWeight:700, color:'var(--teal-700)' }}>{parseFloat(wallet.totalBalance||0).toFixed(2)} JMC</span>
//               </div>
//             )}
//             <button className="sec-btn" onClick={refreshAll} style={{ padding:'6px 14px' }}>↻ Refresh</button>
//           </div>
//         </div>
//       </div>

//       <div style={{ maxWidth:1100, margin:'0 auto', padding:'32px 20px 80px' }}>

//         {/* ── No wallet ── */}
//         {!walletLoading && (walletErr || !wallet) && (
//           <div style={{ background:'white', border:'1px solid var(--slate-200)', borderRadius:20, padding:'72px 40px', textAlign:'center', boxShadow:'0 4px 24px rgba(0,0,0,.05)' }}>
//             <div style={{ width:88, height:88, background:'var(--teal-50)', border:'2px dashed var(--teal-300)', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 28px', fontSize:38 }}>💎</div>
//             <h2 style={{ fontSize:28, fontWeight:800, color:'var(--slate-800)', marginBottom:10 }}>Create Your Mining Wallet</h2>
//             <p style={{ color:'var(--slate-400)', fontSize:15, marginBottom:36, maxWidth:380, margin:'0 auto 36px', lineHeight:1.6 }}>Set up your JMC wallet to start earning tokens through daily mining sessions.</p>
//             <button className="mine-btn" onClick={handleCreate} disabled={creating} style={{ padding:'14px 44px', fontSize:15 }}>
//               {creating ? <><SpinIcon />Creating…</> : '+ Create Wallet'}
//             </button>
//           </div>
//         )}

//         {/* ── Loading ── */}
//         {walletLoading && <PageSkeleton />}

//         {/* ── Main ── */}
//         {wallet && !walletLoading && (
//           <>
//             {/* Tab strip */}
//             <div className="tab-strip" style={{ display:'flex', gap:2, borderBottom:'1px solid var(--slate-200)', marginBottom:28 }}>
//               {tabs.map(t => (
//                 <button key={t.id} onClick={() => setActiveTab(t.id)}
//                   className={`tab-btn${activeTab === t.id ? ' active' : ''}`}
//                   style={{ padding:'11px 18px', fontSize:13, fontWeight:600, color: activeTab===t.id?'var(--teal-600)':'var(--slate-400)', whiteSpace:'nowrap', fontFamily:'Plus Jakarta Sans,sans-serif' }}>
//                   <span style={{ marginRight:6 }}>{t.icon}</span>{t.label}
//                 </button>
//               ))}
//             </div>

//             {activeTab === 'mining' && (
//               <MiningTab
//                 wallet={wallet} mining={mining} circleState={circleState}
//                 mineError={mineError} showReward={showReward} lastMineLog={lastMineLog}
//                 handleMine={handleMine}
//                 dismissError={() => setMineError(null)}
//                 dismissReward={() => { setShowReward(false); setLastMineLog(null); }}
//                 refetchWallet={refetchWallet} fmtDate={fmtDate}
//                 timeLeft={timeLeft} currentSlot={currentSlot} nextSlot={nextSlot}
//                 slots={slots} slotsLoading={slotsLoading}
//               />
//             )}
//             {activeTab === 'logs'         && <LogsSection     data={logsRes?.data}  loading={logsLoading} refetch={refetchLogs} page={logsPage}     setPage={setLogsPage}     fmtDate={fmtDate} />}
//             {activeTab === 'transactions' && <TxSection       data={txsRes?.data}   loading={txsLoading}  refetch={refetchTxs}  page={txsPage}      setPage={setTxsPage}      fmtDate={fmtDate} />}
//             {activeTab === 'referrals'    && <ReferralSection data={refRes?.data}   loading={refLoading}  refetch={refetchRef}  page={referralPage} setPage={setReferralPage} fmtDate={fmtDate} />}
//             {activeTab === 'slots'        && <SlotsSection    slots={slots} currentSlot={currentSlot} timeLeft={timeLeft} loading={slotsLoading} refetch={refetchSlots} slotsData={slotsData} />}
//           </>
//         )}
//       </div>

//       {/* Footer */}
//       <div style={{ borderTop:'1px solid var(--slate-200)', padding:'20px', textAlign:'center' }}>
//         <span className="mono" style={{ fontSize:11, color:'var(--slate-400)', letterSpacing:'.12em' }}>JMC MINING PLATFORM © 2024</span>
//       </div>
//     </div>
//   );
// };

// // ─── Mining Tab ───────────────────────────────────────────────
// const MiningTab = ({ wallet, mining, circleState, mineError, showReward, lastMineLog, handleMine, dismissError, dismissReward, refetchWallet, fmtDate, timeLeft, currentSlot, nextSlot, slots, slotsLoading }) => (
//   <>
//     <SlotTimer timeLeft={timeLeft} currentSlot={currentSlot} nextSlot={nextSlot} loading={slotsLoading} hasSlots={slots.length > 0} />

//     {/* Balance row */}
//     <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(190px,1fr))', gap:12, marginBottom:20 }}>
//       <BalCard label="Total Balance"   value={parseFloat(wallet.totalBalance||0).toFixed(2)}        unit="JMC" primary />
//       <BalCard label="Per Mine"        value={wallet.perMineJMC||0}                                  unit="JMC" />
//       <BalCard label="Lifetime Earned" value={parseFloat(wallet.totalEarnedLifetime||0).toFixed(2)} unit="JMC" />
//       <BalCard label="Mining Power"    value={wallet.miningPowerPct||100} unit="%" bar barVal={wallet.miningPowerPct||100} />
//     </div>

//     {/* Mining console */}
//     <div style={{ background:'white', border:'1px solid var(--slate-200)', borderRadius:20, padding:'52px 32px', marginBottom:20, textAlign:'center', boxShadow:'0 2px 16px rgba(0,0,0,.04)' }}>
//       {/* Status pill */}
//       <div style={{ display:'inline-flex', alignItems:'center', gap:7,
//         background: circleState==='error'?'#fef2f2': circleState==='success'?'var(--teal-50)': circleState==='mining'?'var(--teal-50)':'var(--slate-50)',
//         border:`1px solid ${circleState==='error'?'#fecaca':circleState==='success'?'var(--teal-200)':circleState==='mining'?'var(--teal-300)':'var(--slate-200)'}`,
//         borderRadius:100, padding:'6px 16px', marginBottom:40 }}>
//         <div style={{ width:7, height:7, borderRadius:'50%',
//           background: circleState==='error'?'var(--red)':circleState==='success'?'var(--green)':'var(--teal-500)',
//           animation: circleState==='mining'?'blink 1s ease-in-out infinite':undefined,
//           boxShadow: circleState==='mining'?'0 0 8px var(--teal-400)':undefined }} />
//         <span className="mono" style={{ fontSize:11, letterSpacing:'.14em', textTransform:'uppercase',
//           color: circleState==='error'?'var(--red)':circleState==='success'?'var(--teal-700)':circleState==='mining'?'var(--teal-600)':'var(--slate-400)' }}>
//           {circleState==='mining'?'Mining in progress':circleState==='error'?'Mining failed':circleState==='success'?'Mine complete':'Ready to mine'}
//         </span>
//       </div>

//       {/* Orb */}
//       <div style={{ display:'flex', justifyContent:'center', marginBottom:44 }}>
//         <div style={{ position:'relative', display:'inline-flex', alignItems:'center', justifyContent:'center' }}>
//           {circleState==='mining' && [1,2].map(i=>(
//             <div key={i} style={{ position:'absolute', width:200, height:200, borderRadius:'50%', border:'1px solid rgba(20,184,166,.25)', animation:`ripple ${1.6+i*.5}s ease-out infinite`, animationDelay:`${i*.4}s` }} />
//           ))}
//           {circleState==='success' && (
//             <div style={{ position:'absolute', width:210, height:210, borderRadius:'50%', background:'radial-gradient(circle,rgba(20,184,166,.1) 0%,transparent 70%)', animation:'orbIdle 2s ease-in-out infinite' }} />
//           )}

//           <div
//             onClick={circleState==='idle' ? handleMine : undefined}
//             style={{
//               width:170, height:170, borderRadius:'50%', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center',
//               cursor: circleState==='idle'?'pointer':'default', position:'relative', zIndex:2, transition:'all .4s ease',
//               background: circleState==='error'?'linear-gradient(135deg,#fee2e2,#fef2f2)': circleState==='success'?'linear-gradient(135deg,var(--teal-100),var(--teal-50))': circleState==='mining'?'linear-gradient(135deg,var(--teal-50),white)':'linear-gradient(135deg,var(--teal-500),var(--teal-600))',
//               border:`2px solid ${circleState==='error'?'#fecaca':circleState==='success'?'var(--teal-300)':circleState==='mining'?'var(--teal-300)':'var(--teal-400)'}`,
//               animation: circleState==='idle'?'orbIdle 3s ease-in-out infinite':circleState==='mining'?'orbMine 1.5s ease-in-out infinite':undefined,
//             }}
//           >
//             {circleState==='mining' && (
//               <svg className="spin" style={{ position:'absolute', inset:0, width:'100%', height:'100%' }} viewBox="0 0 100 100">
//                 <circle cx="50" cy="50" r="47" fill="none" stroke="var(--teal-400)" strokeWidth="1.5" strokeDasharray="40 260" strokeLinecap="round" />
//               </svg>
//             )}

//             {circleState==='idle' && (
//               <div style={{ textAlign:'center' }}>
//                 <div style={{ fontSize:36, marginBottom:6 }}>⛏</div>
//                 <div style={{ color:'white', fontWeight:800, fontSize:14, letterSpacing:'.04em' }}>MINE</div>
//                 <div style={{ color:'rgba(255,255,255,.65)', fontSize:11, marginTop:3 }}>tap to start</div>
//               </div>
//             )}
//             {circleState==='mining' && (
//               <div style={{ textAlign:'center' }}>
//                 <div style={{ fontSize:30, marginBottom:8, animation:'blink 1s ease-in-out infinite' }}>⚡</div>
//                 <div className="mono" style={{ fontSize:11, color:'var(--teal-600)', letterSpacing:'.12em' }}>MINING…</div>
//                 <div style={{ display:'flex', gap:4, justifyContent:'center', marginTop:10 }}>
//                   {[0,.25,.5].map((d,i)=><div key={i} style={{ width:5, height:5, background:'var(--teal-400)', borderRadius:'50%', animation:`blink .8s ease-in-out infinite ${d}s` }} />)}
//                 </div>
//               </div>
//             )}
//             {circleState==='error' && (
//               <div style={{ textAlign:'center' }}>
//                 <div style={{ fontSize:32, marginBottom:6 }}>✕</div>
//                 <div className="mono" style={{ fontSize:11, color:'var(--red)', letterSpacing:'.1em' }}>FAILED</div>
//               </div>
//             )}
//             {circleState==='success' && lastMineLog && (
//               <div className="fade-up" style={{ textAlign:'center' }}>
//                 <div style={{ fontSize:10, color:'var(--teal-500)', letterSpacing:'.1em', textTransform:'uppercase', marginBottom:4 }}>Earned</div>
//                 <div className="mono" style={{ fontSize:38, fontWeight:700, color:'var(--teal-700)', lineHeight:1 }}>+{lastMineLog.actualReward}</div>
//                 <div style={{ fontSize:13, color:'var(--teal-500)', marginTop:4, fontWeight:600 }}>JMC</div>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Error */}
//       {mineError && (
//         <div className="fade-up" style={{ background:'#fef2f2', border:'1px solid #fecaca', borderRadius:12, padding:'14px 18px', maxWidth:480, margin:'0 auto 28px', display:'flex', alignItems:'flex-start', gap:12, textAlign:'left' }}>
//           <span style={{ fontSize:18, flexShrink:0 }}>⚠️</span>
//           <div style={{ flex:1 }}>
//             <div style={{ fontWeight:700, fontSize:14, color:'#b91c1c', marginBottom:3 }}>Mining Error</div>
//             <div style={{ fontSize:13, color:'#dc2626' }}>{mineError.message}</div>
//           </div>
//           <button onClick={dismissError} style={{ background:'none', border:'none', cursor:'pointer', color:'var(--slate-400)', fontSize:20, lineHeight:1, flexShrink:0 }}>×</button>
//         </div>
//       )}

//       {/* Success detail */}
//       {showReward && lastMineLog && (
//         <div className="fade-up" style={{ background:'var(--teal-50)', border:'1px solid var(--teal-200)', borderRadius:12, padding:'16px 20px', maxWidth:480, margin:'0 auto 28px' }}>
//           <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:14 }}>
//             <span style={{ fontWeight:700, color:'var(--teal-700)', fontSize:14 }}>✓ Mining Successful</span>
//             <button onClick={dismissReward} style={{ background:'none', border:'none', cursor:'pointer', color:'var(--slate-400)', fontSize:20 }}>×</button>
//           </div>
//           <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:8 }}>
//             {[{l:'Slot',v:`#${lastMineLog.slotNumber}`},{l:'Base',v:lastMineLog.baseReward},{l:'Earned',v:`+${lastMineLog.actualReward}`,hi:true},{l:'Status',v:lastMineLog.status}].map((item,i)=>(
//               <div key={i} style={{ background:'white', borderRadius:10, padding:'10px 8px', textAlign:'center', border:'1px solid var(--teal-100)' }}>
//                 <div className="mono" style={{ fontSize:9, color:'var(--slate-400)', letterSpacing:'.12em', textTransform:'uppercase', marginBottom:5 }}>{item.l}</div>
//                 <div className="mono" style={{ fontWeight:700, fontSize:14, color:item.hi?'var(--teal-600)':'var(--slate-700)' }}>{item.v}</div>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}

//       {/* Mine button */}
//       <button className="mine-btn" onClick={handleMine} disabled={!wallet||mining} style={{ padding:'16px 56px', fontSize:15, letterSpacing:'.03em', gap:8 }}>
//         {mining ? <><SpinIcon />Mining…</> : mineError ? '↺ Retry Mining' : '⛏  Start Mining'}
//       </button>
//     </div>

//     {/* Stats 2-col */}
//     <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16, marginBottom:16 }}>
//       <Panel title="Earnings Breakdown" icon="📊">
//         <DRow label="Total Balance"   value={`${parseFloat(wallet.totalBalance||0).toFixed(2)} JMC`}        color="var(--teal-600)" bold />
//         <DRow label="Lifetime Earned" value={`${parseFloat(wallet.totalEarnedLifetime||0).toFixed(2)} JMC`} />
//         <DRow label="Total Deducted"  value={`${parseFloat(wallet.totalDeducted||0).toFixed(2)} JMC`}       color="var(--red)" />
//         <DRow label="Referral Earned" value={`${parseFloat(wallet.totalReferralEarned||0).toFixed(2)} JMC`} color="#8b5cf6" />
//         <DRow label="Per Mine"        value={`${wallet.perMineJMC||0} JMC`} />
//       </Panel>
//       <Panel title="Mining Status" icon="🛡️">
//         <div style={{ background:'var(--slate-50)', border:'1px solid var(--slate-200)', borderRadius:10, padding:'12px 14px', marginBottom:6 }}>
//           <div style={{ display:'flex', justifyContent:'space-between', marginBottom:8 }}>
//             <span style={{ fontSize:13, color:'var(--slate-500)' }}>Mining Power</span>
//             <span className="mono" style={{ fontSize:13, fontWeight:700, color:(wallet.miningPowerPct||100)>=80?'var(--teal-600)':(wallet.miningPowerPct||100)>=50?'var(--yellow)':'var(--red)' }}>{wallet.miningPowerPct||100}%</span>
//           </div>
//           <div style={{ background:'var(--slate-200)', borderRadius:100, height:6, overflow:'hidden' }}>
//             <div style={{ height:'100%', width:`${wallet.miningPowerPct||100}%`, background:(wallet.miningPowerPct||100)>=80?'linear-gradient(90deg,var(--teal-400),var(--teal-600))':(wallet.miningPowerPct||100)>=50?'var(--yellow)':'var(--red)', borderRadius:100, transition:'width .8s ease' }} />
//           </div>
//         </div>
//         <DRow label="Consecutive Missed" value={wallet.consecutiveMissedCount||0}                                                             color={(wallet.consecutiveMissedCount||0)>0?'var(--red)':'var(--green)'} />
//         <DRow label="Recovery Mode"      value={wallet.isInRecovery?'In Recovery':'Normal'}                                                   color={wallet.isInRecovery?'var(--yellow)':'var(--green)'} />
//         <DRow label="Penalty Tier"       value={(wallet.currentPenaltyTierId||0)>0?`Tier ${wallet.currentPenaltyTierId}`:'None'}              color={(wallet.currentPenaltyTierId||0)>0?'var(--red)':'var(--green)'} />
//         <DRow label="Last Mined"         value={fmtDate(wallet.lastMineAt)} />
//       </Panel>
//     </div>


//   </>
// );

// // ─── Slot Timer Card ──────────────────────────────────────────
// const SlotTimer = ({ timeLeft, currentSlot, nextSlot, loading, hasSlots }) => {
//   if (loading) return <div className="skeleton" style={{ height:148, marginBottom:20 }} />;
//   if (!hasSlots) return (
//     <div style={{ background:'white', border:'1px solid var(--slate-200)', borderRadius:16, padding:'22px 28px', marginBottom:20, color:'var(--slate-400)', display:'flex', alignItems:'center', gap:10, fontSize:14 }}>
//       🕐 Loading slot information…
//     </div>
//   );

//   const isActive = !!currentSlot;
//   const display  = currentSlot || nextSlot;

//   return (
//     <div style={{
//       background: isActive ? 'linear-gradient(135deg,var(--teal-600),var(--teal-700))' : 'white',
//       border: `1px solid ${isActive ? 'var(--teal-500)' : 'var(--slate-200)'}`,
//       borderRadius:18, padding:'24px 28px', marginBottom:20,
//       boxShadow: isActive ? '0 8px 32px rgba(20,184,166,.25)' : '0 2px 12px rgba(0,0,0,.04)',
//       position:'relative', overflow:'hidden',
//     }}>
//       {isActive && (
//         <>
//           <div style={{ position:'absolute', right:-40, top:-40, width:200, height:200, borderRadius:'50%', background:'rgba(255,255,255,.05)' }} />
//           <div style={{ position:'absolute', right:40, bottom:-60, width:140, height:140, borderRadius:'50%', background:'rgba(255,255,255,.04)' }} />
//         </>
//       )}

//       <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:20, position:'relative', zIndex:1 }}>

//         {/* Left — slot info */}
//         <div>
//           <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:8 }}>
//             {isActive && (
//               <div style={{ width:8, height:8, background:'#6ee7b7', borderRadius:'50%', animation:'blink 1.5s ease-in-out infinite', boxShadow:'0 0 8px #6ee7b7' }} />
//             )}
//             <span style={{ fontSize:11, fontWeight:700, letterSpacing:'.12em', textTransform:'uppercase', color: isActive?'rgba(255,255,255,.6)':'var(--slate-400)' }}>
//               {isActive ? 'Active Mining Slot' : 'Next Slot'}
//             </span>
//           </div>
//           <div style={{ fontSize:28, fontWeight:800, color: isActive?'white':'var(--slate-800)', marginBottom:4 }}>
//             {display ? `Slot ${display.slotNumber}` : '—'}
//           </div>
//           {display && (
//             <div className="mono" style={{ fontSize:13, color: isActive?'rgba(255,255,255,.6)':'var(--slate-400)' }}>
//               {fmt24(display.startHour)} → {fmt24(display.endHour)}
//             </div>
//           )}
//           {!isActive && nextSlot && (
//             <div style={{ marginTop:6, fontSize:12, color:'var(--slate-400)' }}>Starts at {fmt24(nextSlot.startHour)}</div>
//           )}
//         </div>

//         {/* Center — countdown */}
//         <div style={{ textAlign:'center' }}>
//           <div style={{ fontSize:10, fontWeight:700, letterSpacing:'.14em', textTransform:'uppercase', color: isActive?'rgba(255,255,255,.5)':'var(--slate-400)', marginBottom:10 }}>
//             {isActive ? 'Time Remaining' : 'Starts In'}
//           </div>
//           <div style={{ display:'flex', alignItems:'flex-start', gap:6 }}>
//             {[{v:timeLeft.hours,l:'H'},{v:timeLeft.minutes,l:'M'},{v:timeLeft.seconds,l:'S'}].map((u,i,arr)=>(
//               <React.Fragment key={u.l}>
//                 <div style={{ textAlign:'center' }}>
//                   <div className="mono" style={{ fontSize:36, fontWeight:700, lineHeight:1, color: isActive?'white':'var(--slate-800)', background: isActive?'rgba(255,255,255,.12)':'var(--slate-100)', borderRadius:10, padding:'8px 14px', minWidth:64, border: isActive?'1px solid rgba(255,255,255,.15)':'1px solid var(--slate-200)' }}>
//                     {pad(u.v)}
//                   </div>
//                   <div className="mono" style={{ fontSize:9, color: isActive?'rgba(255,255,255,.4)':'var(--slate-400)', marginTop:5, letterSpacing:'.15em', textTransform:'uppercase' }}>{u.l}</div>
//                 </div>
//                 {i < arr.length-1 && (
//                   <div className="mono" style={{ fontSize:28, color: isActive?'rgba(255,255,255,.4)':'var(--slate-300)', lineHeight:'1.3', paddingTop:8, animation: isActive?'blink 1.2s ease-in-out infinite':undefined }}>:</div>
//                 )}
//               </React.Fragment>
//             ))}
//           </div>
//           {isActive && (
//             <div style={{ marginTop:12 }}>
//               <div style={{ background:'rgba(255,255,255,.15)', borderRadius:100, height:5, overflow:'hidden', width:220, margin:'0 auto' }}>
//                 <div style={{ height:'100%', width:`${timeLeft.progress||0}%`, background:'white', borderRadius:100, transition:'width 1s linear' }} />
//               </div>
//               <div style={{ fontSize:11, color:'rgba(255,255,255,.45)', marginTop:6 }}>{(timeLeft.progress||0).toFixed(1)}% elapsed</div>
//             </div>
//           )}
//         </div>

//         {/* Right — next slot badge (when active) */}
//         {isActive && nextSlot && (
//           <div style={{ textAlign:'center', background:'rgba(255,255,255,.1)', borderRadius:14, padding:'16px 20px', border:'1px solid rgba(255,255,255,.15)' }}>
//             <div style={{ fontSize:10, color:'rgba(255,255,255,.5)', letterSpacing:'.1em', textTransform:'uppercase', marginBottom:8, fontWeight:600 }}>Next Slot</div>
//             <div style={{ fontWeight:800, fontSize:18, color:'white', marginBottom:3 }}>Slot {nextSlot.slotNumber}</div>
//             <div className="mono" style={{ fontSize:11, color:'rgba(255,255,255,.5)' }}>{fmt24(nextSlot.startHour)}</div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// // ─── History ──────────────────────────────────────────────────
// const LogsSection = ({ data, loading, refetch, page, setPage, fmtDate }) => {
//   if (loading) return <TableSkeleton />;
//   const logs       = data?.logs || data?.items || data?.data || [];
//   const pagination = data?.pagination || {};
//   const totalPages = pagination.totalPages || 1;

//   return (
//     <Panel title="Mining History" icon="📋" count={pagination.total||logs.length} onRefresh={refetch}>
//       {logs.length === 0 ? <Empty icon="📋" msg="No mining logs yet" sub="Start mining to see your history" /> : (
//         <>
//           <div style={{ overflowX:'auto' }}>
//             <table className="dtable">
//               <thead><tr>{['Date','Slot','Base','Earned','Power','Status'].map(h=><th key={h}>{h}</th>)}</tr></thead>
//               <tbody>
//                 {logs.map((log,i)=>(
//                   <tr key={log._id||i}>
//                     <td style={{ color:'var(--slate-400)', fontSize:13 }}>{fmtDate(log.minedAt||log.createdAt)}</td>
//                     <td className="mono" style={{ fontWeight:700, color:'var(--slate-700)' }}>#{log.slotNumber}</td>
//                     <td className="mono" style={{ color:'var(--slate-500)' }}>{log.baseReward}</td>
//                     <td className="mono" style={{ fontWeight:700, color:'var(--teal-600)' }}>+{log.actualReward}</td>
//                     <td className="mono" style={{ fontWeight:600, color:(log.miningPowerUsed||100)>=80?'var(--teal-600)':(log.miningPowerUsed||100)>=50?'var(--yellow)':'var(--red)' }}>{log.miningPowerUsed||100}%</td>
//                     <td><Chip label={log.status} /></td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//           {totalPages>1 && <Pager page={page} total={totalPages} setPage={setPage} />}
//         </>
//       )}
//     </Panel>
//   );
// };

// // ─── Transactions ─────────────────────────────────────────────
// const TxSection = ({ data, loading, refetch, page, setPage, fmtDate }) => {
//   if (loading) return <TableSkeleton />;
//   const txs        = data?.txs || [];
//   const pagination = data?.pagination || {};
//   const totalPages = pagination.totalPages || 1;
//   const credit     = txs.filter(t=>t.direction==='credit').reduce((s,t)=>s+t.amount,0);
//   const debit      = txs.filter(t=>t.direction==='debit').reduce((s,t)=>s+t.amount,0);
//   const typeIcon   = (t) => ({ mine_reward:'⛏', referral_reward:'👥', penalty_deduction:'⚠️', bonus:'🎁' }[t]||'💎');
//   const typeName   = (t) => t?.replace(/_/g,' ').replace(/\b\w/g,l=>l.toUpperCase())||'Transaction';

//   return (
//     <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
//       <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:12 }}>
//         {[{l:'Credits',v:`+${credit.toFixed(2)}`,c:'var(--green)'},{l:'Debits',v:`-${debit.toFixed(2)}`,c:'var(--red)'},{l:'Net',v:`${(credit-debit).toFixed(2)}`,c:credit-debit>=0?'var(--teal-600)':'var(--red)'}].map((s,i)=>(
//           <div key={i} style={{ background:'white', border:'1px solid var(--slate-200)', borderRadius:14, padding:'18px 20px', boxShadow:'0 1px 8px rgba(0,0,0,.04)' }}>
//             <div style={{ fontSize:11, color:'var(--slate-400)', letterSpacing:'.1em', textTransform:'uppercase', marginBottom:8, fontWeight:600 }}>{s.l}</div>
//             <div className="mono" style={{ fontSize:24, fontWeight:700, color:s.c }}>{s.v} <span style={{ fontSize:12, opacity:.6 }}>JMC</span></div>
//           </div>
//         ))}
//       </div>
//       <Panel title="Transactions" icon="💰" count={pagination.total||txs.length} onRefresh={refetch}>
//         {txs.length===0 ? <Empty icon="💰" msg="No transactions yet" /> : (
//           <>
//             <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
//               {txs.map((tx,i)=>(
//                 <div key={tx._id||i} style={{ display:'flex', alignItems:'center', justifyContent:'space-between', gap:14, background:'var(--slate-50)', border:'1px solid var(--slate-200)', borderRadius:12, padding:'14px 18px' }}>
//                   <div style={{ display:'flex', alignItems:'center', gap:12 }}>
//                     <div style={{ width:42, height:42, borderRadius:11, background:tx.direction==='credit'?'#ecfdf5':'#fef2f2', display:'flex', alignItems:'center', justifyContent:'center', fontSize:20, border:`1px solid ${tx.direction==='credit'?'#d1fae5':'#fecaca'}`, flexShrink:0 }}>{typeIcon(tx.type)}</div>
//                     <div>
//                       <div style={{ fontWeight:600, fontSize:14, color:'var(--slate-700)', marginBottom:2 }}>{typeName(tx.type)}</div>
//                       <div style={{ fontSize:12, color:'var(--slate-400)' }}>{fmtDate(tx.createdAt)}</div>
//                     </div>
//                   </div>
//                   <div style={{ textAlign:'right', flexShrink:0 }}>
//                     <div className="mono" style={{ fontWeight:700, fontSize:16, color:tx.direction==='credit'?'var(--green)':'var(--red)' }}>{tx.direction==='credit'?'+':'-'}{tx.amount} JMC</div>
//                     <div className="mono" style={{ fontSize:11, color:'var(--slate-400)', marginTop:2 }}>{tx.balanceBefore} → {tx.balanceAfter}</div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//             {totalPages>1 && <Pager page={page} total={totalPages} setPage={setPage} />}
//           </>
//         )}
//       </Panel>
//     </div>
//   );
// };

// // ─── Referrals ────────────────────────────────────────────────
// const ReferralSection = ({ data, loading, refetch, page, setPage, fmtDate }) => {
//   if (loading) return <TableSkeleton />;
//   const refs       = data?.logs || [];
//   const pagination = data?.pagination || {};
//   const totalPages = pagination.totalPages || 1;
//   const total      = refs.reduce((s,r)=>s+(r.bonusAmount||0),0);

//   return (
//     <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
//       <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:12 }}>
//         {[
//           {l:'Total Earned', v:`${total} JMC`,                                              c:'var(--teal-600)'},
//           {l:'Referrals',    v:pagination.total||refs.length,                               c:'var(--slate-700)'},
//           {l:'Paid',         v:refs.filter(r=>r.status==='paid').length,                    c:'var(--green)'},
//           {l:'Avg Bonus',    v:`${refs.length?(total/refs.length).toFixed(1):0} JMC`,       c:'var(--slate-700)'},
//         ].map((s,i)=>(
//           <div key={i} style={{ background:'white', border:'1px solid var(--slate-200)', borderRadius:14, padding:'16px 18px', boxShadow:'0 1px 8px rgba(0,0,0,.04)' }}>
//             <div style={{ fontSize:10, color:'var(--slate-400)', letterSpacing:'.1em', textTransform:'uppercase', marginBottom:8, fontWeight:600 }}>{s.l}</div>
//             <div className="mono" style={{ fontSize:22, fontWeight:700, color:s.c }}>{s.v}</div>
//           </div>
//         ))}
//       </div>
//       <Panel title="Referral Bonuses" icon="👥" count={pagination.total||refs.length} onRefresh={refetch}>
//         {refs.length===0 ? <Empty icon="👥" msg="No referral bonuses yet" sub="Share your referral code to earn" /> : (
//           <>
//             {refs.map((ref,i)=>(
//               <div key={ref._id||i} style={{ display:'flex', alignItems:'center', justifyContent:'space-between', gap:14, background:'var(--slate-50)', border:'1px solid var(--slate-200)', borderRadius:12, padding:'13px 18px', marginBottom:8 }}>
//                 <div style={{ display:'flex', alignItems:'center', gap:12 }}>
//                   <div className="mono" style={{ width:40, height:40, background:'var(--teal-50)', border:'1px solid var(--teal-200)', borderRadius:10, display:'flex', alignItems:'center', justifyContent:'center', fontSize:13, fontWeight:700, color:'var(--teal-600)', flexShrink:0 }}>{ref.referredUserId?.slice(-2)?.toUpperCase()||'??'}</div>
//                   <div>
//                     <div className="mono" style={{ fontSize:13, color:'var(--slate-600)', marginBottom:2 }}>{ref.referredUserId?.length>10?`${ref.referredUserId.slice(0,8)}…${ref.referredUserId.slice(-4)}`:ref.referredUserId}</div>
//                     <div style={{ fontSize:12, color:'var(--slate-400)' }}>Mine date: {ref.mineDate}</div>
//                   </div>
//                 </div>
//                 <div style={{ textAlign:'right' }}>
//                   <div className="mono" style={{ fontWeight:700, color:'var(--teal-600)', fontSize:16 }}>+{ref.bonusAmount} JMC</div>
//                   <div style={{ fontSize:11, color:'var(--green)', fontWeight:600, marginTop:3 }}>{ref.status}</div>
//                 </div>
//               </div>
//             ))}
//             {totalPages>1 && <Pager page={page} total={totalPages} setPage={setPage} />}
//           </>
//         )}
//       </Panel>
//       <div style={{ background:'var(--teal-50)', border:'1px solid var(--teal-200)', borderRadius:14, padding:'18px 22px', display:'flex', gap:14, alignItems:'flex-start' }}>
//         <span style={{ fontSize:22 }}>💡</span>
//         <div>
//           <div style={{ fontWeight:700, color:'var(--teal-700)', marginBottom:5, fontSize:15 }}>How Referrals Work</div>
//           <div style={{ color:'var(--teal-600)', fontSize:13, lineHeight:1.7 }}>Earn <strong>3 JMC</strong> every time a referred user mines successfully. More active referrals = more passive income.</div>
//         </div>
//       </div>
//     </div>
//   );
// };

// // ─── Slots Section ────────────────────────────────────────────
// const SlotsSection = ({ slots, currentSlot, timeLeft, loading, refetch, slotsData }) => {
//   if (loading) return <TableSkeleton />;

//   return (
//     <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
//       {currentSlot && (
//         <div style={{ background:'linear-gradient(135deg,var(--teal-600),var(--teal-700))', borderRadius:20, padding:'32px 36px', color:'white', position:'relative', overflow:'hidden', boxShadow:'0 12px 40px rgba(20,184,166,.3)' }}>
//           <div style={{ position:'absolute', right:-30, top:-30, width:180, height:180, borderRadius:'50%', background:'rgba(255,255,255,.06)' }} />
//           <div style={{ position:'absolute', right:60, bottom:-50, width:120, height:120, borderRadius:'50%', background:'rgba(255,255,255,.04)' }} />
//           <div style={{ display:'flex', flexWrap:'wrap', alignItems:'center', justifyContent:'space-between', gap:24, position:'relative' }}>
//             <div>
//               <div style={{ fontSize:11, letterSpacing:'.15em', textTransform:'uppercase', color:'rgba(255,255,255,.6)', marginBottom:8, fontWeight:600 }}>Currently Active</div>
//               <div style={{ fontSize:40, fontWeight:800, marginBottom:6 }}>Slot {currentSlot.slotNumber}</div>
//               <div className="mono" style={{ fontSize:13, color:'rgba(255,255,255,.6)' }}>{fmt24(currentSlot.startHour)} → {fmt24(currentSlot.endHour)}</div>
//             </div>
//             <div style={{ display:'flex', gap:24, alignItems:'center' }}>
//               <div style={{ textAlign:'center' }}>
//                 <div style={{ fontSize:10, color:'rgba(255,255,255,.5)', letterSpacing:'.12em', textTransform:'uppercase', marginBottom:8, fontWeight:600 }}>Time Left</div>
//                 <div className="mono" style={{ fontSize:32, fontWeight:700 }}>{pad(timeLeft.hours)}:{pad(timeLeft.minutes)}:{pad(timeLeft.seconds)}</div>
//               </div>
//             </div>
//           </div>
//           <div style={{ marginTop:20 }}>
//             <div style={{ background:'rgba(255,255,255,.15)', borderRadius:100, height:6, overflow:'hidden' }}>
//               <div style={{ height:'100%', width:`${timeLeft.progress||0}%`, background:'white', borderRadius:100, transition:'width 1s linear' }} />
//             </div>
//             <div style={{ fontSize:11, color:'rgba(255,255,255,.45)', marginTop:6 }}>{(timeLeft.progress||0).toFixed(1)}% of slot elapsed</div>
//           </div>
//         </div>
//       )}

//       <Panel title="All Mining Slots" icon="🕐" onRefresh={refetch}>
//         {slots.length===0 ? <Empty icon="🕐" msg="No slots available" /> : (
//           <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(190px,1fr))', gap:12 }}>
//             {slots.map((slot,i)=>{
//               const isActive = currentSlot?.slotNumber === slot.slotNumber;
//               return (
//                 <div key={slot.slotNumber||i} className="lift" style={{ background: isActive?'var(--teal-50)':'var(--slate-50)', border:`1.5px solid ${isActive?'var(--teal-400)':'var(--slate-200)'}`, borderRadius:14, padding:'18px 20px', position:'relative', overflow:'hidden', boxShadow: isActive?'0 4px 20px rgba(20,184,166,.15)':'none' }}>
//                   {isActive && <div style={{ position:'absolute', top:0, left:0, right:0, height:3, background:'linear-gradient(90deg,var(--teal-400),var(--teal-600))' }} />}
//                   <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:12 }}>
//                     <div style={{ fontWeight:800, fontSize:16, color: isActive?'var(--teal-700)':'var(--slate-700)' }}>Slot {slot.slotNumber}</div>
//                     {isActive && (
//                       <div style={{ display:'flex', alignItems:'center', gap:5, background:'var(--teal-100)', border:'1px solid var(--teal-300)', borderRadius:100, padding:'3px 10px' }}>
//                         <div style={{ width:6, height:6, background:'var(--teal-500)', borderRadius:'50%', animation:'blink 1.5s ease-in-out infinite' }} />
//                         <span className="mono" style={{ fontSize:9, color:'var(--teal-700)', letterSpacing:'.1em', fontWeight:700 }}>LIVE</span>
//                       </div>
//                     )}
//                   </div>
//                   <div className="mono" style={{ fontSize:12, color:'var(--slate-400)', marginBottom:6 }}>{fmt24(slot.startHour)} → {fmt24(slot.endHour)}</div>
//                   <div style={{ fontSize:12, color: isActive?'var(--teal-500)':'var(--slate-400)', fontWeight:500 }}>{slot.endHour - slot.startHour}h window</div>
//                 </div>
//               );
//             })}
//           </div>
//         )}
//       </Panel>

//       {slotsData?.date && (
//         <div style={{ textAlign:'center' }}>
//           <span className="mono" style={{ fontSize:11, color:'var(--slate-400)', letterSpacing:'.1em' }}>Schedule for {slotsData.date}</span>
//         </div>
//       )}
//     </div>
//   );
// };

// // ─── Shared UI ────────────────────────────────────────────────
// const Panel = ({ title, icon, count, onRefresh, children }) => (
//   <div style={{ background:'white', border:'1px solid var(--slate-200)', borderRadius:18, padding:22, boxShadow:'0 2px 12px rgba(0,0,0,.04)' }}>
//     <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:18 }}>
//       <div>
//         <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:2 }}>
//           <span style={{ fontSize:16 }}>{icon}</span>
//           <span style={{ fontWeight:800, fontSize:16, color:'var(--slate-800)' }}>{title}</span>
//         </div>
//         {count!==undefined && <div className="mono" style={{ fontSize:10, color:'var(--slate-400)', letterSpacing:'.1em', marginLeft:24 }}>{count} records</div>}
//       </div>
//       {onRefresh && <button className="sec-btn" onClick={onRefresh} style={{ padding:'6px 14px' }}>↻ Refresh</button>}
//     </div>
//     {children}
//   </div>
// );

// const BalCard = ({ label, value, unit, primary, bar, barVal }) => (
//   <div className="lift" style={{ background: primary?'linear-gradient(135deg,var(--teal-500),var(--teal-700))':'white', border:`1px solid ${primary?'var(--teal-400)':'var(--slate-200)'}`, borderRadius:14, padding:'18px 20px', boxShadow: primary?'0 8px 28px rgba(20,184,166,.3)':'0 1px 8px rgba(0,0,0,.04)' }}>
//     <div className="mono" style={{ fontSize:10, letterSpacing:'.12em', textTransform:'uppercase', color: primary?'rgba(255,255,255,.65)':'var(--slate-400)', marginBottom:10, fontWeight:500 }}>{label}</div>
//     <div className="mono" style={{ fontSize:26, fontWeight:700, color: primary?'white':'var(--slate-800)', lineHeight:1 }}>{value} <span style={{ fontSize:12, opacity:.6, fontWeight:400 }}>{unit}</span></div>
//     {bar && (
//       <div style={{ marginTop:12, background: primary?'rgba(255,255,255,.2)':'var(--slate-100)', borderRadius:100, height:5, overflow:'hidden' }}>
//         <div style={{ height:'100%', width:`${barVal}%`, background: primary?'white':barVal>=80?'var(--teal-500)':barVal>=50?'var(--yellow)':'var(--red)', borderRadius:100, transition:'width .8s ease' }} />
//       </div>
//     )}
//   </div>
// );

// const DRow = ({ label, value, color, bold }) => (
//   <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'9px 12px', background:'var(--slate-50)', borderRadius:9, border:'1px solid var(--slate-200)', marginBottom:6 }}>
//     <span style={{ fontSize:13, color:'var(--slate-500)' }}>{label}</span>
//     <span className="mono" style={{ fontSize:13, fontWeight: bold?700:600, color: color||'var(--slate-700)' }}>{value}</span>
//   </div>
// );

// const Chip = ({ label }) => (
//   <span className="mono" style={{ fontSize:10, padding:'3px 10px', borderRadius:100, background:'var(--teal-50)', color:'var(--teal-700)', border:'1px solid var(--teal-200)', fontWeight:600, letterSpacing:'.05em', textTransform:'capitalize' }}>{label}</span>
// );

// const Empty = ({ icon, msg, sub }) => (
//   <div style={{ textAlign:'center', padding:'52px 20px' }}>
//     <div style={{ fontSize:36, opacity:.2, marginBottom:14 }}>{icon}</div>
//     <div style={{ fontWeight:700, color:'var(--slate-600)', marginBottom:6, fontSize:15 }}>{msg}</div>
//     {sub && <div style={{ fontSize:13, color:'var(--slate-400)' }}>{sub}</div>}
//   </div>
// );

// const Pager = ({ page, total, setPage }) => (
//   <div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:6, marginTop:24, paddingTop:18, borderTop:'1px solid var(--slate-200)' }}>
//     <button onClick={()=>setPage(page-1)} disabled={page===1} style={{ background:'white', border:'1px solid var(--slate-200)', borderRadius:8, padding:'7px 14px', cursor:'pointer', color:'var(--slate-500)', opacity:page===1?.4:1 }}>←</button>
//     {[...Array(Math.min(5,total))].map((_,i)=>{
//       const p = total<=5?i+1:page<=3?i+1:page>=total-2?total-4+i:page-2+i;
//       return (
//         <button key={p} onClick={()=>setPage(p)} style={{ background:page===p?'var(--teal-500)':'white', border:`1px solid ${page===p?'var(--teal-500)':'var(--slate-200)'}`, borderRadius:8, padding:'7px 13px', minWidth:36, cursor:'pointer', fontWeight:page===p?700:400, color:page===p?'white':'var(--slate-500)', fontFamily:'JetBrains Mono,monospace', fontSize:13 }}>{p}</button>
//       );
//     })}
//     <button onClick={()=>setPage(page+1)} disabled={page===total} style={{ background:'white', border:'1px solid var(--slate-200)', borderRadius:8, padding:'7px 14px', cursor:'pointer', color:'var(--slate-500)', opacity:page===total?.4:1 }}>→</button>
//     <span className="mono" style={{ fontSize:11, color:'var(--slate-400)', marginLeft:6 }}>{page}/{total}</span>
//   </div>
// );

// const SpinIcon = () => (
//   <svg className="spin" style={{ display:'inline', width:15, height:15, marginRight:8, verticalAlign:'middle' }} fill="none" viewBox="0 0 24 24">
//     <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="32" strokeDashoffset="10" strokeLinecap="round" />
//   </svg>
// );

// const PageSkeleton = () => (
//   <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
//     <div className="skeleton" style={{ height:50, width:360 }} />
//     <div className="skeleton" style={{ height:148 }} />
//     <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:12 }}>{[...Array(4)].map((_,i)=><div key={i} className="skeleton" style={{ height:100 }} />)}</div>
//     <div className="skeleton" style={{ height:380 }} />
//     <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16 }}>{[...Array(2)].map((_,i)=><div key={i} className="skeleton" style={{ height:240 }} />)}</div>
//   </div>
// );

// const TableSkeleton = () => (
//   <div style={{ background:'white', border:'1px solid var(--slate-200)', borderRadius:18, padding:22 }}>
//     <div className="skeleton" style={{ height:24, width:200, marginBottom:20 }} />
//     {[...Array(5)].map((_,i)=><div key={i} className="skeleton" style={{ height:52, marginBottom:8 }} />)}
//   </div>
// );

// export default MiningPage;


import React, { useState, useEffect, useMemo, useRef } from "react";
import {
  useCreateMineWalletMutation,
  useGetMineWalletDetailsQuery,
  useMineJMCMutation,
  useGetSlotsInfoQuery,
  useGetTodayMineInfoQuery,
  useGetUserMineLogsQuery,
  useGetUserWalletTxsQuery,
  useGetUserReferralBonusQuery,
} from "./dashboardApiSlice";
import { toast } from "react-toastify";
import {
  Pickaxe,
  RefreshCw,
  Wallet,
  ClipboardList,
  Users,
  Clock,
  Gem,
  Zap,
  X,
  AlertTriangle,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  TrendingDown,
  Shield,
  Lightbulb,
  BarChart3,
  Gift,
  Loader2,
  ArrowRightLeft,
  Plus,
  CircleDot,
} from "lucide-react";

// ─── Global Styles ────────────────────────────────────────────
const GlobalStyle = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;700&display=swap');

    :root {
      --teal-50:  #f0fdfa;
      --teal-100: #ccfbf1;
      --teal-200: #99f6e4;
      --teal-300: #5eead4;
      --teal-400: #2dd4bf;
      --teal-500: #14b8a6;
      --teal-600: #0d9488;
      --teal-700: #0f766e;
      --teal-800: #115e59;
      --teal-900: #134e4a;
      --slate-50:  #f8fafc;
      --slate-100: #f1f5f9;
      --slate-200: #e2e8f0;
      --slate-300: #cbd5e1;
      --slate-400: #94a3b8;
      --slate-500: #64748b;
      --slate-600: #475569;
      --slate-700: #334155;
      --slate-800: #1e293b;
      --slate-900: #0f172a;
      --red:    #ef4444;
      --green:  #10b981;
      --yellow: #f59e0b;
    }

    .mp * { box-sizing: border-box; margin: 0; padding: 0; }

    .mp {
      font-family: 'Plus Jakarta Sans', sans-serif;
      background: #f8fafc;
      min-height: 100vh;
      color: var(--slate-800);
    }

    .mono { font-family: 'JetBrains Mono', monospace; }

    @keyframes spin    { to { transform: rotate(360deg); } }
    @keyframes fadeUp  { from { opacity:0; transform:translateY(12px); } to { opacity:1; transform:translateY(0); } }
    @keyframes blink   { 0%,100%{opacity:1;} 50%{opacity:0.3;} }
    @keyframes shimmer { 0%{background-position:-400px 0;} 100%{background-position:400px 0;} }
    @keyframes ripple  { 0%{transform:scale(1);opacity:.4;} 100%{transform:scale(1.7);opacity:0;} }
    @keyframes orbIdle { 0%,100%{box-shadow:0 0 0 0 rgba(20,184,166,0),0 8px 40px rgba(20,184,166,.18);} 50%{box-shadow:0 0 0 12px rgba(20,184,166,.06),0 8px 40px rgba(20,184,166,.28);} }
    @keyframes orbMine { 0%,100%{box-shadow:0 0 0 0 rgba(20,184,166,0),0 12px 60px rgba(20,184,166,.35);} 50%{box-shadow:0 0 0 18px rgba(20,184,166,.1),0 12px 60px rgba(20,184,166,.5);} }
    @keyframes dashRotate { to { stroke-dashoffset: 0; } }
    @keyframes circularSpin { to { transform: rotate(360deg); } }
    @keyframes pulseRing { 0% { transform: scale(0.95); opacity: 0.7; } 50% { transform: scale(1.05); opacity: 1; } 100% { transform: scale(0.95); opacity: 0.7; } }
    @keyframes progressPulse { 0%,100% { filter: drop-shadow(0 0 4px rgba(20,184,166,0.3)); } 50% { filter: drop-shadow(0 0 12px rgba(20,184,166,0.6)); } }

    .fade-up { animation: fadeUp .4s ease both; }

    .lift { transition: transform .2s ease, box-shadow .2s ease; }
    .lift:hover { transform: translateY(-3px); box-shadow: 0 12px 36px rgba(14,165,150,.12) !important; }

    .skeleton {
      background: linear-gradient(90deg, var(--slate-100) 25%, var(--slate-200) 50%, var(--slate-100) 75%);
      background-size: 400px 100%;
      animation: shimmer 1.4s infinite;
      border-radius: 12px;
    }

    .tab-btn { position:relative; background:none; border:none; cursor:pointer; transition:color .2s; }
    .tab-btn::after { content:''; position:absolute; bottom:-1px; left:0; right:0; height:2px; background:var(--teal-500); border-radius:2px 2px 0 0; transform:scaleX(0); transition:transform .25s ease; }
    .tab-btn.active { color:var(--teal-600) !important; }
    .tab-btn.active::after { transform:scaleX(1); }

    .dtable { width:100%; border-collapse:collapse; }
    .dtable th { padding:10px 14px; text-align:left; font-family:'JetBrains Mono',monospace; font-size:10px; letter-spacing:.12em; text-transform:uppercase; color:var(--slate-400); border-bottom:1px solid var(--slate-200); font-weight:500; }
    .dtable td { padding:13px 14px; border-bottom:1px solid var(--slate-100); font-size:14px; }
    .dtable tbody tr:last-child td { border-bottom:none; }
    .dtable tbody tr:hover td { background:#f0fdfa; }

    .mp ::-webkit-scrollbar { width:4px; height:4px; }
    .mp ::-webkit-scrollbar-track { background:var(--slate-100); }
    .mp ::-webkit-scrollbar-thumb { background:var(--teal-300); border-radius:4px; }

    .tab-strip { overflow-x:auto; scrollbar-width:none; }
    .tab-strip::-webkit-scrollbar { display:none; }

    .mine-btn {
      background: linear-gradient(135deg, var(--teal-500), var(--teal-700));
      color:white; border:none; border-radius:14px; cursor:pointer;
      font-family:'Plus Jakarta Sans',sans-serif; font-weight:700;
      transition: transform .2s, box-shadow .25s, opacity .2s;
      display:inline-flex; align-items:center; justify-content:center;
    }
    .mine-btn:hover:not(:disabled) { transform:translateY(-2px); box-shadow:0 16px 48px rgba(20,184,166,.45); }
    .mine-btn:active:not(:disabled) { transform:translateY(0); }
    .mine-btn:disabled { opacity:.45; cursor:not-allowed; }

    .sec-btn {
      background:white; border:1px solid var(--slate-200); border-radius:10px;
      color:var(--slate-600); cursor:pointer; font-family:'Plus Jakarta Sans',sans-serif;
      font-weight:600; font-size:13px; transition:all .2s;
      display:inline-flex; align-items:center; gap:6px;
    }
    .sec-btn:hover { border-color:var(--teal-400); color:var(--teal-600); background:var(--teal-50); }

    /* Responsive */
    @media (max-width: 768px) {
      .mp-nav-bar { padding: 0 12px !important; height: 54px !important; }
      .mp-nav-bar .nav-title { font-size: 15px !important; }
      .mp-nav-bar .nav-balance { font-size: 11px !important; padding: 4px 8px !important; }
      .mp-main-content { padding: 16px 12px 60px !important; }
      .mp-stats-grid-4 { grid-template-columns: repeat(2, 1fr) !important; }
      .mp-stats-grid-3 { grid-template-columns: 1fr !important; }
      .mp-stats-grid-2 { grid-template-columns: 1fr !important; }
      .mp-bal-grid { grid-template-columns: repeat(2, 1fr) !important; }
      .mp-slots-grid { grid-template-columns: repeat(2, 1fr) !important; }
      .mp-console { padding: 32px 16px !important; }
      .mp-orb { width: 140px !important; height: 140px !important; }
      .mp-orb-ripple { width: 170px !important; height: 170px !important; }
      .mp-orb-glow { width: 178px !important; height: 178px !important; }
      .mp-orb-text { font-size: 30px !important; }
      .mp-orb-icon { width: 28px !important; height: 28px !important; }
      .mp-timer-wrap { flex-direction: column !important; gap: 16px !important; text-align: center !important; }
      .mp-timer-countdown .time-digit { font-size: 24px !important; min-width: 44px !important; padding: 6px 8px !important; }
      .mp-timer-countdown .time-colon { font-size: 20px !important; }
      .mp-timer-progress-bar { width: 100% !important; }
      .mp-timer-next { padding: 12px 14px !important; }
      .mp-detail-grid { grid-template-columns: repeat(2, 1fr) !important; }
      .mp-mine-btn { padding: 14px 36px !important; font-size: 14px !important; }
      .mp-tab-btn { padding: 9px 12px !important; font-size: 12px !important; }
      .mp-panel { padding: 16px !important; border-radius: 14px !important; }
      .mp-tx-row { flex-direction: column !important; align-items: flex-start !important; gap: 10px !important; }
      .mp-tx-amount { text-align: left !important; }
      .mp-ref-row { flex-direction: column !important; align-items: flex-start !important; gap: 10px !important; }
      .mp-ref-amount { text-align: left !important; }
      .mp-slot-hero { padding: 22px 20px !important; }
      .mp-slot-hero-title { font-size: 28px !important; }
      .mp-slot-hero-time { font-size: 24px !important; }
      .mp-slot-hero-wrap { flex-direction: column !important; gap: 16px !important; }
    }

    @media (max-width: 480px) {
      .mp-bal-grid { grid-template-columns: 1fr !important; }
      .mp-stats-grid-4 { grid-template-columns: 1fr !important; }
      .mp-slots-grid { grid-template-columns: 1fr !important; }
      .mp-detail-grid { grid-template-columns: 1fr !important; }
      .mp-orb { width: 120px !important; height: 120px !important; }
      .mp-orb-ripple { width: 150px !important; height: 150px !important; }
      .mp-orb-glow { width: 155px !important; height: 155px !important; }
      .mp-orb-text { font-size: 24px !important; }
      .mp-timer-countdown .time-digit { font-size: 20px !important; min-width: 38px !important; }
      .mp-nav-bar .nav-balance { display: none !important; }
      .dtable th, .dtable td { padding: 8px 10px !important; font-size: 12px !important; }
    }

    .circular-progress-container {
      position: relative;
      display: inline-flex;
      align-items: center;
      justify-content: center;
    }

    .circular-progress-svg {
      transform: rotate(-90deg);
      animation: progressPulse 2s ease-in-out infinite;
    }

    .circular-progress-bg {
      transition: all 0.3s ease;
    }

    .circular-progress-bar {
      transition: stroke-dashoffset 1s linear;
      stroke-linecap: round;
    }

    .circular-spinner {
      animation: circularSpin 1.5s linear infinite;
    }

    .spin-icon {
      animation: spin 1s linear infinite;
    }
  `}</style>
);

// ─── Circular Progress Component ─────────────────────────────
const CircularProgress = ({ progress = 0, size = 120, strokeWidth = 6, isActive = false, isMining = false, children }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div className="circular-progress-container" style={{ width: size, height: size }}>
      <svg
        width={size}
        height={size}
        className={isMining ? 'circular-spinner' : 'circular-progress-svg'}
        style={!isMining ? { transform: 'rotate(-90deg)' } : undefined}
      >
        {/* Background circle */}
        <circle
          className="circular-progress-bg"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={isActive ? 'rgba(255,255,255,0.15)' : 'var(--slate-200)'}
          strokeWidth={strokeWidth}
        />
        {/* Progress circle */}
        {!isMining && (
          <circle
            className="circular-progress-bar"
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={isActive ? 'rgba(255,255,255,0.8)' : 'var(--teal-500)'}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
          />
        )}
        {/* Mining spinner arcs */}
        {isMining && (
          <>
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              stroke="var(--teal-400)"
              strokeWidth={strokeWidth}
              strokeDasharray={`${circumference * 0.25} ${circumference * 0.75}`}
              strokeLinecap="round"
              opacity="0.8"
            />
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius - strokeWidth - 2}
              fill="none"
              stroke="var(--teal-300)"
              strokeWidth={strokeWidth / 2}
              strokeDasharray={`${circumference * 0.15} ${circumference * 0.85}`}
              strokeLinecap="round"
              opacity="0.5"
            />
          </>
        )}
      </svg>
      <div style={{ position: 'absolute', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {children}
      </div>
    </div>
  );
};

// ─── Animated Circular Timer ─────────────────────────────────
const CircularTimer = ({ progress = 0, size = 80, isActive = false }) => {
  const strokeWidth = 5;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div className="circular-progress-container" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="circular-progress-svg" style={{ transform: 'rotate(-90deg)' }}>
        <circle
          cx={size / 2} cy={size / 2} r={radius}
          fill="none"
          stroke={isActive ? 'rgba(255,255,255,0.12)' : 'var(--slate-200)'}
          strokeWidth={strokeWidth}
        />
        <circle
          cx={size / 2} cy={size / 2} r={radius}
          fill="none"
          stroke={isActive ? 'rgba(255,255,255,0.75)' : 'var(--teal-500)'}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 1s linear' }}
        />
      </svg>
      <div style={{
        position: 'absolute', display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexDirection: 'column'
      }}>
        <span className="mono" style={{
          fontSize: size * 0.22, fontWeight: 700,
          color: isActive ? 'white' : 'var(--teal-600)'
        }}>
          {progress.toFixed(0)}%
        </span>
      </div>
    </div>
  );
};

// ─── Slot Timer Hook ─────────────────────────────────────────
const useSlotTimer = (slots) => {
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0, progress: 0 });
  const [currentSlot, setCurrentSlot] = useState(null);
  const [nextSlot, setNextSlot] = useState(null);

  useEffect(() => {
    if (!slots || slots.length === 0) return;

    const tick = () => {
      const now = new Date();
      const nowH = now.getHours();
      const nowM = now.getMinutes();
      const nowS = now.getSeconds();
      const nowMins = nowH * 60 + nowM;

      let active = null;
      let upcoming = null;

      for (const slot of slots) {
        const startMins = slot.startHour * 60;
        const endMins = slot.endHour * 60;
        if (nowMins >= startMins && nowMins < endMins) { active = slot; break; }
      }

      for (const slot of slots) {
        if (nowMins < slot.startHour * 60) { upcoming = slot; break; }
      }
      if (!upcoming) upcoming = slots[0] || null;

      setCurrentSlot(active);
      setNextSlot(active ? (slots[(slots.indexOf(active) + 1) % slots.length] || null) : upcoming);

      if (active) {
        const startMins = active.startHour * 60;
        const endMins = active.endHour * 60;
        const totalSecs = (endMins - startMins) * 60;
        const elapsed = (nowMins - startMins) * 60 + nowS;
        const remaining = Math.max(0, totalSecs - elapsed);
        const progress = totalSecs > 0 ? Math.min(100, (elapsed / totalSecs) * 100) : 0;
        setTimeLeft({ hours: Math.floor(remaining / 3600), minutes: Math.floor((remaining % 3600) / 60), seconds: remaining % 60, progress });
      } else if (upcoming) {
        let waitMins = upcoming.startHour * 60 - nowMins;
        if (waitMins < 0) waitMins += 24 * 60;
        const remaining = Math.max(0, waitMins * 60 - nowS);
        setTimeLeft({ hours: Math.floor(remaining / 3600), minutes: Math.floor((remaining % 3600) / 60), seconds: remaining % 60, progress: 0 });
      }
    };

    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [slots]);

  return { timeLeft, currentSlot, nextSlot };
};

// ─── Helpers ─────────────────────────────────────────────────
const fmt24 = (h) => {
  if (h === 24) return '12:00 AM';
  const suffix = h >= 12 ? 'PM' : 'AM';
  const hh = h % 12 === 0 ? 12 : h % 12;
  return `${hh}:00 ${suffix}`;
};
const pad = (n) => String(n || 0).padStart(2, '0');

// ─── Main Component ───────────────────────────────────────────
const MiningPage = () => {
  const [lastMineLog, setLastMineLog] = useState(null);
  const [showReward, setShowReward] = useState(false);
  const [mineError, setMineError] = useState(null);
  const [activeTab, setActiveTab] = useState('mining');
  const [logsPage, setLogsPage] = useState(1);
  const [txsPage, setTxsPage] = useState(1);
  const [referralPage, setReferralPage] = useState(1);
  const PER_PAGE = 10;

  const { data: walletRes, isLoading: walletLoading, isError: walletErr, refetch: refetchWallet } = useGetMineWalletDetailsQuery();
  const { data: slotsRes, isLoading: slotsLoading, refetch: refetchSlots } = useGetSlotsInfoQuery();
  const { data: todayRes, refetch: refetchToday } = useGetTodayMineInfoQuery(undefined, { skip: !walletRes?.data });
  const { data: logsRes, isLoading: logsLoading, refetch: refetchLogs } = useGetUserMineLogsQuery({ page: logsPage, limit: PER_PAGE }, { skip: !walletRes?.data });
  const { data: txsRes, isLoading: txsLoading, refetch: refetchTxs } = useGetUserWalletTxsQuery({ page: txsPage, limit: PER_PAGE }, { skip: !walletRes?.data });
  const { data: refRes, isLoading: refLoading, refetch: refetchRef } = useGetUserReferralBonusQuery({ page: referralPage, limit: PER_PAGE }, { skip: !walletRes?.data });

  const [createWallet, { isLoading: creating }] = useCreateMineWalletMutation();
  const [mineJMC, { isLoading: mining }] = useMineJMCMutation();

  const wallet = walletRes?.data;
  const slotsData = slotsRes?.data;
  const slots = useMemo(() => slotsData?.slots || [], [slotsData]);

  const { timeLeft, currentSlot, nextSlot } = useSlotTimer(slots);

  useEffect(() => {
    if (!mineError) return;
    const t = setTimeout(() => setMineError(null), 6000);
    return () => clearTimeout(t);
  }, [mineError]);

  useEffect(() => {
    if (activeTab === 'logs') setLogsPage(1);
    if (activeTab === 'transactions') setTxsPage(1);
    if (activeTab === 'referrals') setReferralPage(1);
  }, [activeTab]);

  const handleCreate = async () => {
    try { const r = await createWallet().unwrap(); toast.success(r?.message || 'Wallet created!'); refetchWallet(); }
    catch (e) { toast.error(e?.data?.message || 'Failed to create wallet'); }
  };

  const handleMine = async () => {
    if (!wallet) { toast.warning('Create a wallet first!'); return; }
    setShowReward(false); setLastMineLog(null); setMineError(null);
    try {
      const r = await mineJMC({}).unwrap();
      if (r?.success === 1) {
        setLastMineLog(r?.data?.mineLog); setShowReward(true);
        toast.success(`Mined ${r?.data?.mineLog?.actualReward || 0} JMC!`);
        refetchWallet(); refetchToday(); refetchLogs(); refetchTxs();
      }
    } catch (e) {
      setMineError({ message: e?.data?.message || 'Mining failed. Try again.', code: e?.data?.status_code || 400 });
      toast.error(e?.data?.message || 'Mining failed');
    }
  };

  const refreshAll = () => {
    refetchWallet(); refetchToday(); refetchLogs();
    refetchTxs(); refetchRef(); refetchSlots();
    toast.info('Refreshed');
  };

  const fmtDate = (d) => d ? new Date(d).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' }) : '—';

  const circleState = mining ? 'mining' : mineError ? 'error' : (showReward && lastMineLog) ? 'success' : 'idle';

  const tabs = [
    { id: 'mining', label: 'Mining', Icon: Pickaxe },
    { id: 'logs', label: 'History', Icon: ClipboardList },
    { id: 'transactions', label: 'Wallet', Icon: Wallet },
    { id: 'referrals', label: 'Referrals', Icon: Users },
    { id: 'slots', label: 'Slots', Icon: Clock },
  ];

  return (
    <div className="mp">
      <GlobalStyle />

      {/* ── Top navbar ── */}
      <div style={{ background: 'white', borderBottom: '1px solid var(--slate-200)', position: 'sticky', top: 0, zIndex: 50, boxShadow: '0 1px 0 var(--slate-100)' }}>
        <div className="mp-nav-bar" style={{ maxWidth: 1100, margin: '0 auto', padding: '0 20px', height: 62, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 34, height: 34, background: 'linear-gradient(135deg,var(--teal-500),var(--teal-700))', borderRadius: 9, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', boxShadow: '0 4px 12px rgba(20,184,166,.35)' }}>
              <Pickaxe size={18} />
            </div>
            <span className="nav-title" style={{ fontWeight: 800, fontSize: 17, color: 'var(--slate-800)', letterSpacing: '-.02em' }}>JMC <span style={{ color: 'var(--teal-600)' }}>Mining</span></span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            {wallet && (
              <div className="mono nav-balance" style={{ fontSize: 13, color: 'var(--slate-500)', background: 'var(--teal-50)', border: '1px solid var(--teal-200)', borderRadius: 8, padding: '5px 12px' }}>
                <span style={{ color: 'var(--slate-400)' }}>Balance </span>
                <span style={{ fontWeight: 700, color: 'var(--teal-700)' }}>{parseFloat(wallet.totalBalance || 0).toFixed(2)} JMC</span>
              </div>
            )}
            <button className="sec-btn" onClick={refreshAll} style={{ padding: '6px 14px' }}>
              <RefreshCw size={14} /> Refresh
            </button>
          </div>
        </div>
      </div>

      <div className="mp-main-content" style={{ maxWidth: 1100, margin: '0 auto', padding: '32px 20px 80px' }}>

        {/* ── No wallet ── */}
        {!walletLoading && (walletErr || !wallet) && (
          <div style={{ background: 'white', border: '1px solid var(--slate-200)', borderRadius: 20, padding: '72px 40px', textAlign: 'center', boxShadow: '0 4px 24px rgba(0,0,0,.05)' }}>
            <div style={{ width: 88, height: 88, background: 'var(--teal-50)', border: '2px dashed var(--teal-300)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 28px' }}>
              <Gem size={38} color="var(--teal-500)" />
            </div>
            <h2 style={{ fontSize: 28, fontWeight: 800, color: 'var(--slate-800)', marginBottom: 10 }}>Create Your Mining Wallet</h2>
            <p style={{ color: 'var(--slate-400)', fontSize: 15, marginBottom: 36, maxWidth: 380, margin: '0 auto 36px', lineHeight: 1.6 }}>Set up your JMC wallet to start earning tokens through daily mining sessions.</p>
            <button className="mine-btn" onClick={handleCreate} disabled={creating} style={{ padding: '14px 44px', fontSize: 15, gap: 8 }}>
              {creating ? <><Loader2 size={16} className="spin-icon" />Creating…</> : <><Plus size={16} /> Create Wallet</>}
            </button>
          </div>
        )}

        {/* ── Loading ── */}
        {walletLoading && <PageSkeleton />}

        {/* ── Main ── */}
        {wallet && !walletLoading && (
          <>
            {/* Tab strip */}
            <div className="tab-strip" style={{ display: 'flex', gap: 2, borderBottom: '1px solid var(--slate-200)', marginBottom: 28 }}>
              {tabs.map(t => (
                <button key={t.id} onClick={() => setActiveTab(t.id)}
                  className={`tab-btn mp-tab-btn${activeTab === t.id ? ' active' : ''}`}
                  style={{ padding: '11px 18px', fontSize: 13, fontWeight: 600, color: activeTab === t.id ? 'var(--teal-600)' : 'var(--slate-400)', whiteSpace: 'nowrap', fontFamily: 'Plus Jakarta Sans,sans-serif', display: 'flex', alignItems: 'center', gap: 6 }}>
                  <t.Icon size={15} />{t.label}
                </button>
              ))}
            </div>

            {activeTab === 'mining' && (
              <MiningTab
                wallet={wallet} mining={mining} circleState={circleState}
                mineError={mineError} showReward={showReward} lastMineLog={lastMineLog}
                handleMine={handleMine}
                dismissError={() => setMineError(null)}
                dismissReward={() => { setShowReward(false); setLastMineLog(null); }}
                refetchWallet={refetchWallet} fmtDate={fmtDate}
                timeLeft={timeLeft} currentSlot={currentSlot} nextSlot={nextSlot}
                slots={slots} slotsLoading={slotsLoading}
              />
            )}
            {activeTab === 'logs' && <LogsSection data={logsRes?.data} loading={logsLoading} refetch={refetchLogs} page={logsPage} setPage={setLogsPage} fmtDate={fmtDate} />}
            {activeTab === 'transactions' && <TxSection data={txsRes?.data} loading={txsLoading} refetch={refetchTxs} page={txsPage} setPage={setTxsPage} fmtDate={fmtDate} />}
            {activeTab === 'referrals' && <ReferralSection data={refRes?.data} loading={refLoading} refetch={refetchRef} page={referralPage} setPage={setReferralPage} fmtDate={fmtDate} />}
            {activeTab === 'slots' && <SlotsSection slots={slots} currentSlot={currentSlot} timeLeft={timeLeft} loading={slotsLoading} refetch={refetchSlots} slotsData={slotsData} />}
          </>
        )}
      </div>

      {/* Footer */}
      <div style={{ borderTop: '1px solid var(--slate-200)', padding: '20px', textAlign: 'center' }}>
        <span className="mono" style={{ fontSize: 11, color: 'var(--slate-400)', letterSpacing: '.12em' }}>JMC MINING PLATFORM © 2024</span>
      </div>
    </div>
  );
};

// ─── Mining Tab ───────────────────────────────────────────────
const MiningTab = ({ wallet, mining, circleState, mineError, showReward, lastMineLog, handleMine, dismissError, dismissReward, refetchWallet, fmtDate, timeLeft, currentSlot, nextSlot, slots, slotsLoading }) => (
  <>
    <SlotTimer timeLeft={timeLeft} currentSlot={currentSlot} nextSlot={nextSlot} loading={slotsLoading} hasSlots={slots.length > 0} />

    {/* Balance row */}
    <div className="mp-bal-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(190px,1fr))', gap: 12, marginBottom: 20 }}>
      <BalCard label="Total Balance" value={parseFloat(wallet.totalBalance || 0).toFixed(2)} unit="JMC" primary Icon={Wallet} />
      <BalCard label="Per Mine" value={wallet.perMineJMC || 0} unit="JMC" Icon={Pickaxe} />
      <BalCard label="Lifetime Earned" value={parseFloat(wallet.totalEarnedLifetime || 0).toFixed(2)} unit="JMC" Icon={TrendingUp} />
      <BalCard label="Mining Power" value={wallet.miningPowerPct || 100} unit="%" bar barVal={wallet.miningPowerPct || 100} Icon={Zap} />
    </div>

    {/* Mining console */}
    <div className="mp-console" style={{ background: 'white', border: '1px solid var(--slate-200)', borderRadius: 20, padding: '52px 32px', marginBottom: 20, textAlign: 'center', boxShadow: '0 2px 16px rgba(0,0,0,.04)' }}>
      {/* Status pill */}
      <div style={{
        display: 'inline-flex', alignItems: 'center', gap: 7,
        background: circleState === 'error' ? '#fef2f2' : circleState === 'success' ? 'var(--teal-50)' : circleState === 'mining' ? 'var(--teal-50)' : 'var(--slate-50)',
        border: `1px solid ${circleState === 'error' ? '#fecaca' : circleState === 'success' ? 'var(--teal-200)' : circleState === 'mining' ? 'var(--teal-300)' : 'var(--slate-200)'}`,
        borderRadius: 100, padding: '6px 16px', marginBottom: 40
      }}>
        <div style={{
          width: 7, height: 7, borderRadius: '50%',
          background: circleState === 'error' ? 'var(--red)' : circleState === 'success' ? 'var(--green)' : 'var(--teal-500)',
          animation: circleState === 'mining' ? 'blink 1s ease-in-out infinite' : undefined,
          boxShadow: circleState === 'mining' ? '0 0 8px var(--teal-400)' : undefined
        }} />
        <span className="mono" style={{
          fontSize: 11, letterSpacing: '.14em', textTransform: 'uppercase',
          color: circleState === 'error' ? 'var(--red)' : circleState === 'success' ? 'var(--teal-700)' : circleState === 'mining' ? 'var(--teal-600)' : 'var(--slate-400)'
        }}>
          {circleState === 'mining' ? 'Mining in progress' : circleState === 'error' ? 'Mining failed' : circleState === 'success' ? 'Mine complete' : 'Ready to mine'}
        </span>
      </div>

      {/* Orb with Circular Progress */}
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 44 }}>
        <div style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
          {circleState === 'mining' && [1, 2].map(i => (
            <div key={i} className="mp-orb-ripple" style={{ position: 'absolute', width: 200, height: 200, borderRadius: '50%', border: '1px solid rgba(20,184,166,.25)', animation: `ripple ${1.6 + i * .5}s ease-out infinite`, animationDelay: `${i * .4}s` }} />
          ))}
          {circleState === 'success' && (
            <div className="mp-orb-glow" style={{ position: 'absolute', width: 210, height: 210, borderRadius: '50%', background: 'radial-gradient(circle,rgba(20,184,166,.1) 0%,transparent 70%)', animation: 'orbIdle 2s ease-in-out infinite' }} />
          )}

          {/* Circular Progress Ring wrapping the orb */}
          <CircularProgress
            progress={circleState === 'mining' ? 0 : circleState === 'success' ? 100 : timeLeft.progress || 0}
            size={190}
            strokeWidth={4}
            isMining={circleState === 'mining'}
          >
            <div
              className="mp-orb"
              onClick={circleState === 'idle' ? handleMine : undefined}
              style={{
                width: 170, height: 170, borderRadius: '50%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                cursor: circleState === 'idle' ? 'pointer' : 'default', position: 'relative', zIndex: 2, transition: 'all .4s ease',
                background: circleState === 'error' ? 'linear-gradient(135deg,#fee2e2,#fef2f2)' : circleState === 'success' ? 'linear-gradient(135deg,var(--teal-100),var(--teal-50))' : circleState === 'mining' ? 'linear-gradient(135deg,var(--teal-50),white)' : 'linear-gradient(135deg,var(--teal-500),var(--teal-600))',
                border: `2px solid ${circleState === 'error' ? '#fecaca' : circleState === 'success' ? 'var(--teal-300)' : circleState === 'mining' ? 'var(--teal-300)' : 'var(--teal-400)'}`,
                animation: circleState === 'idle' ? 'orbIdle 3s ease-in-out infinite' : circleState === 'mining' ? 'orbMine 1.5s ease-in-out infinite' : undefined,
              }}
            >
              {circleState === 'idle' && (
                <div style={{ textAlign: 'center' }}>
                  <Pickaxe className="mp-orb-icon" size={36} color="white" style={{ marginBottom: 6 }} />
                  <div style={{ color: 'white', fontWeight: 800, fontSize: 14, letterSpacing: '.04em' }}>MINE</div>
                  <div style={{ color: 'rgba(255,255,255,.65)', fontSize: 11, marginTop: 3 }}>tap to start</div>
                </div>
              )}
              {circleState === 'mining' && (
                <div style={{ textAlign: 'center' }}>
                  <Zap className="mp-orb-icon" size={30} color="var(--teal-500)" style={{ marginBottom: 8, animation: 'blink 1s ease-in-out infinite' }} />
                  <div className="mono" style={{ fontSize: 11, color: 'var(--teal-600)', letterSpacing: '.12em' }}>MINING…</div>
                  <div style={{ display: 'flex', gap: 4, justifyContent: 'center', marginTop: 10 }}>
                    {[0, .25, .5].map((d, i) => <div key={i} style={{ width: 5, height: 5, background: 'var(--teal-400)', borderRadius: '50%', animation: `blink .8s ease-in-out infinite ${d}s` }} />)}
                  </div>
                </div>
              )}
              {circleState === 'error' && (
                <div style={{ textAlign: 'center' }}>
                  <X size={32} color="var(--red)" style={{ marginBottom: 6 }} />
                  <div className="mono" style={{ fontSize: 11, color: 'var(--red)', letterSpacing: '.1em' }}>FAILED</div>
                </div>
              )}
              {circleState === 'success' && lastMineLog && (
                <div className="fade-up" style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: 10, color: 'var(--teal-500)', letterSpacing: '.1em', textTransform: 'uppercase', marginBottom: 4 }}>Earned</div>
                  <div className="mono mp-orb-text" style={{ fontSize: 38, fontWeight: 700, color: 'var(--teal-700)', lineHeight: 1 }}>+{lastMineLog.actualReward}</div>
                  <div style={{ fontSize: 13, color: 'var(--teal-500)', marginTop: 4, fontWeight: 600 }}>JMC</div>
                </div>
              )}
            </div>
          </CircularProgress>
        </div>
      </div>

      {/* Error */}
      {mineError && (
        <div className="fade-up" style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 12, padding: '14px 18px', maxWidth: 480, margin: '0 auto 28px', display: 'flex', alignItems: 'flex-start', gap: 12, textAlign: 'left' }}>
          <AlertTriangle size={18} color="#b91c1c" style={{ flexShrink: 0, marginTop: 2 }} />
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 700, fontSize: 14, color: '#b91c1c', marginBottom: 3 }}>Mining Error</div>
            <div style={{ fontSize: 13, color: '#dc2626' }}>{mineError.message}</div>
          </div>
          <button onClick={dismissError} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--slate-400)', flexShrink: 0 }}>
            <X size={18} />
          </button>
        </div>
      )}

      {/* Success detail */}
      {showReward && lastMineLog && (
        <div className="fade-up" style={{ background: 'var(--teal-50)', border: '1px solid var(--teal-200)', borderRadius: 12, padding: '16px 20px', maxWidth: 480, margin: '0 auto 28px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
            <span style={{ fontWeight: 700, color: 'var(--teal-700)', fontSize: 14, display: 'flex', alignItems: 'center', gap: 6 }}>
              <CheckCircle size={16} /> Mining Successful
            </span>
            <button onClick={dismissReward} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--slate-400)' }}>
              <X size={18} />
            </button>
          </div>
          <div className="mp-detail-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 8 }}>
            {[{ l: 'Slot', v: `#${lastMineLog.slotNumber}` }, { l: 'Base', v: lastMineLog.baseReward }, { l: 'Earned', v: `+${lastMineLog.actualReward}`, hi: true }, { l: 'Status', v: lastMineLog.status }].map((item, i) => (
              <div key={i} style={{ background: 'white', borderRadius: 10, padding: '10px 8px', textAlign: 'center', border: '1px solid var(--teal-100)' }}>
                <div className="mono" style={{ fontSize: 9, color: 'var(--slate-400)', letterSpacing: '.12em', textTransform: 'uppercase', marginBottom: 5 }}>{item.l}</div>
                <div className="mono" style={{ fontWeight: 700, fontSize: 14, color: item.hi ? 'var(--teal-600)' : 'var(--slate-700)' }}>{item.v}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Mine button */}
      <button className="mine-btn mp-mine-btn" onClick={handleMine} disabled={!wallet || mining} style={{ padding: '16px 56px', fontSize: 15, letterSpacing: '.03em', gap: 8 }}>
        {mining ? <><Loader2 size={16} className="spin-icon" />Mining…</> : mineError ? <><RefreshCw size={16} /> Retry Mining</> : <><Pickaxe size={16} /> Start Mining</>}
      </button>
    </div>

    {/* Stats 2-col */}
    <div className="mp-stats-grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
      <Panel title="Earnings Breakdown" Icon={BarChart3}>
        <DRow label="Total Balance" value={`${parseFloat(wallet.totalBalance || 0).toFixed(2)} JMC`} color="var(--teal-600)" bold />
        <DRow label="Lifetime Earned" value={`${parseFloat(wallet.totalEarnedLifetime || 0).toFixed(2)} JMC`} />
        <DRow label="Total Deducted" value={`${parseFloat(wallet.totalDeducted || 0).toFixed(2)} JMC`} color="var(--red)" />
        <DRow label="Referral Earned" value={`${parseFloat(wallet.totalReferralEarned || 0).toFixed(2)} JMC`} color="#8b5cf6" />
        <DRow label="Per Mine" value={`${wallet.perMineJMC || 0} JMC`} />
      </Panel>
      <Panel title="Mining Status" Icon={Shield}>
        <div style={{ background: 'var(--slate-50)', border: '1px solid var(--slate-200)', borderRadius: 10, padding: '12px 14px', marginBottom: 6 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
            <span style={{ fontSize: 13, color: 'var(--slate-500)', display: 'flex', alignItems: 'center', gap: 6 }}>
              <Zap size={14} /> Mining Power
            </span>
            <span className="mono" style={{ fontSize: 13, fontWeight: 700, color: (wallet.miningPowerPct || 100) >= 80 ? 'var(--teal-600)' : (wallet.miningPowerPct || 100) >= 50 ? 'var(--yellow)' : 'var(--red)' }}>{wallet.miningPowerPct || 100}%</span>
          </div>
          <div style={{ background: 'var(--slate-200)', borderRadius: 100, height: 6, overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${wallet.miningPowerPct || 100}%`, background: (wallet.miningPowerPct || 100) >= 80 ? 'linear-gradient(90deg,var(--teal-400),var(--teal-600))' : (wallet.miningPowerPct || 100) >= 50 ? 'var(--yellow)' : 'var(--red)', borderRadius: 100, transition: 'width .8s ease' }} />
          </div>
        </div>
        <DRow label="Consecutive Missed" value={wallet.consecutiveMissedCount || 0} color={(wallet.consecutiveMissedCount || 0) > 0 ? 'var(--red)' : 'var(--green)'} />
        <DRow label="Recovery Mode" value={wallet.isInRecovery ? 'In Recovery' : 'Normal'} color={wallet.isInRecovery ? 'var(--yellow)' : 'var(--green)'} />
        <DRow label="Penalty Tier" value={(wallet.currentPenaltyTierId || 0) > 0 ? `Tier ${wallet.currentPenaltyTierId}` : 'None'} color={(wallet.currentPenaltyTierId || 0) > 0 ? 'var(--red)' : 'var(--green)'} />
        <DRow label="Last Mined" value={fmtDate(wallet.lastMineAt)} />
      </Panel>
    </div>
  </>
);

// ─── Slot Timer Card ──────────────────────────────────────────
const SlotTimer = ({ timeLeft, currentSlot, nextSlot, loading, hasSlots }) => {
  if (loading) return <div className="skeleton" style={{ height: 148, marginBottom: 20 }} />;
  if (!hasSlots) return (
    <div style={{ background: 'white', border: '1px solid var(--slate-200)', borderRadius: 16, padding: '22px 28px', marginBottom: 20, color: 'var(--slate-400)', display: 'flex', alignItems: 'center', gap: 10, fontSize: 14 }}>
      <Clock size={18} /> Loading slot information…
    </div>
  );

  const isActive = !!currentSlot;
  const display = currentSlot || nextSlot;

  return (
    <div style={{
      background: isActive ? 'linear-gradient(135deg,var(--teal-600),var(--teal-700))' : 'white',
      border: `1px solid ${isActive ? 'var(--teal-500)' : 'var(--slate-200)'}`,
      borderRadius: 18, padding: '24px 28px', marginBottom: 20,
      boxShadow: isActive ? '0 8px 32px rgba(20,184,166,.25)' : '0 2px 12px rgba(0,0,0,.04)',
      position: 'relative', overflow: 'hidden',
    }}>
      {isActive && (
        <>
          <div style={{ position: 'absolute', right: -40, top: -40, width: 200, height: 200, borderRadius: '50%', background: 'rgba(255,255,255,.05)' }} />
          <div style={{ position: 'absolute', right: 40, bottom: -60, width: 140, height: 140, borderRadius: '50%', background: 'rgba(255,255,255,.04)' }} />
        </>
      )}

      <div className="mp-timer-wrap" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 20, position: 'relative', zIndex: 1 }}>

        {/* Left — slot info */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            {isActive && (
              <div style={{ width: 8, height: 8, background: '#6ee7b7', borderRadius: '50%', animation: 'blink 1.5s ease-in-out infinite', boxShadow: '0 0 8px #6ee7b7' }} />
            )}
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase', color: isActive ? 'rgba(255,255,255,.6)' : 'var(--slate-400)' }}>
              {isActive ? 'Active Mining Slot' : 'Next Slot'}
            </span>
          </div>
          <div style={{ fontSize: 28, fontWeight: 800, color: isActive ? 'white' : 'var(--slate-800)', marginBottom: 4 }}>
            {display ? `Slot ${display.slotNumber}` : '—'}
          </div>
          {display && (
            <div className="mono" style={{ fontSize: 13, color: isActive ? 'rgba(255,255,255,.6)' : 'var(--slate-400)' }}>
              {fmt24(display.startHour)} → {fmt24(display.endHour)}
            </div>
          )}
          {!isActive && nextSlot && (
            <div style={{ marginTop: 6, fontSize: 12, color: 'var(--slate-400)', display: 'flex', alignItems: 'center', gap: 4 }}>
              <Clock size={12} /> Starts at {fmt24(nextSlot.startHour)}
            </div>
          )}
        </div>

        {/* Center — countdown with circular progress */}
        <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '.14em', textTransform: 'uppercase', color: isActive ? 'rgba(255,255,255,.5)' : 'var(--slate-400)' }}>
            {isActive ? 'Time Remaining' : 'Starts In'}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            {/* Circular progress indicator */}
            <CircularTimer progress={timeLeft.progress || 0} size={64} isActive={isActive} />

            {/* Digital countdown */}
            <div className="mp-timer-countdown" style={{ display: 'flex', alignItems: 'flex-start', gap: 6 }}>
              {[{ v: timeLeft.hours, l: 'H' }, { v: timeLeft.minutes, l: 'M' }, { v: timeLeft.seconds, l: 'S' }].map((u, i, arr) => (
                <React.Fragment key={u.l}>
                  <div style={{ textAlign: 'center' }}>
                    <div className="mono time-digit" style={{ fontSize: 36, fontWeight: 700, lineHeight: 1, color: isActive ? 'white' : 'var(--slate-800)', background: isActive ? 'rgba(255,255,255,.12)' : 'var(--slate-100)', borderRadius: 10, padding: '8px 14px', minWidth: 64, border: isActive ? '1px solid rgba(255,255,255,.15)' : '1px solid var(--slate-200)' }}>
                      {pad(u.v)}
                    </div>
                    <div className="mono" style={{ fontSize: 9, color: isActive ? 'rgba(255,255,255,.4)' : 'var(--slate-400)', marginTop: 5, letterSpacing: '.15em', textTransform: 'uppercase' }}>{u.l}</div>
                  </div>
                  {i < arr.length - 1 && (
                    <div className="mono time-colon" style={{ fontSize: 28, color: isActive ? 'rgba(255,255,255,.4)' : 'var(--slate-300)', lineHeight: '1.3', paddingTop: 8, animation: isActive ? 'blink 1.2s ease-in-out infinite' : undefined }}>:</div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          {isActive && (
            <div style={{ width: '100%' }}>
              <div className="mp-timer-progress-bar" style={{ background: 'rgba(255,255,255,.15)', borderRadius: 100, height: 5, overflow: 'hidden', width: 220, margin: '0 auto' }}>
                <div style={{ height: '100%', width: `${timeLeft.progress || 0}%`, background: 'white', borderRadius: 100, transition: 'width 1s linear' }} />
              </div>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,.45)', marginTop: 6 }}>{(timeLeft.progress || 0).toFixed(1)}% elapsed</div>
            </div>
          )}
        </div>

        {/* Right — next slot badge (when active) */}
        {isActive && nextSlot && (
          <div className="mp-timer-next" style={{ textAlign: 'center', background: 'rgba(255,255,255,.1)', borderRadius: 14, padding: '16px 20px', border: '1px solid rgba(255,255,255,.15)' }}>
            <div style={{ fontSize: 10, color: 'rgba(255,255,255,.5)', letterSpacing: '.1em', textTransform: 'uppercase', marginBottom: 8, fontWeight: 600 }}>Next Slot</div>
            <div style={{ fontWeight: 800, fontSize: 18, color: 'white', marginBottom: 3 }}>Slot {nextSlot.slotNumber}</div>
            <div className="mono" style={{ fontSize: 11, color: 'rgba(255,255,255,.5)' }}>{fmt24(nextSlot.startHour)}</div>
          </div>
        )}
      </div>
    </div>
  );
};

// ─── History ──────────────────────────────────────────────────
const LogsSection = ({ data, loading, refetch, page, setPage, fmtDate }) => {
  if (loading) return <TableSkeleton />;
  const logs = data?.logs || data?.items || data?.data || [];
  const pagination = data?.pagination || {};
  const totalPages = pagination.totalPages || 1;

  return (
    <Panel title="Mining History" Icon={ClipboardList} count={pagination.total || logs.length} onRefresh={refetch}>
      {logs.length === 0 ? <Empty Icon={ClipboardList} msg="No mining logs yet" sub="Start mining to see your history" /> : (
        <>
          <div style={{ overflowX: 'auto' }}>
            <table className="dtable">
              <thead><tr>{['Date', 'Slot', 'Base', 'Earned', 'Power', 'Status'].map(h => <th key={h}>{h}</th>)}</tr></thead>
              <tbody>
                {logs.map((log, i) => (
                  <tr key={log._id || i}>
                    <td style={{ color: 'var(--slate-400)', fontSize: 13 }}>{fmtDate(log.minedAt || log.createdAt)}</td>
                    <td className="mono" style={{ fontWeight: 700, color: 'var(--slate-700)' }}>#{log.slotNumber}</td>
                    <td className="mono" style={{ color: 'var(--slate-500)' }}>{log.baseReward}</td>
                    <td className="mono" style={{ fontWeight: 700, color: 'var(--teal-600)' }}>+{log.actualReward}</td>
                    <td className="mono" style={{ fontWeight: 600, color: (log.miningPowerUsed || 100) >= 80 ? 'var(--teal-600)' : (log.miningPowerUsed || 100) >= 50 ? 'var(--yellow)' : 'var(--red)' }}>{log.miningPowerUsed || 100}%</td>
                    <td><Chip label={log.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {totalPages > 1 && <Pager page={page} total={totalPages} setPage={setPage} />}
        </>
      )}
    </Panel>
  );
};

// ─── Transactions ─────────────────────────────────────────────
const TxSection = ({ data, loading, refetch, page, setPage, fmtDate }) => {
  if (loading) return <TableSkeleton />;
  const txs = data?.txs || [];
  const pagination = data?.pagination || {};
  const totalPages = pagination.totalPages || 1;
  const credit = txs.filter(t => t.direction === 'credit').reduce((s, t) => s + t.amount, 0);
  const debit = txs.filter(t => t.direction === 'debit').reduce((s, t) => s + t.amount, 0);
  const typeIcon = (t) => ({ mine_reward: Pickaxe, referral_reward: Users, penalty_deduction: AlertTriangle, bonus: Gift }[t] || Gem);
  const typeName = (t) => t?.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) || 'Transaction';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div className="mp-stats-grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12 }}>
        {[{ l: 'Credits', v: `+${credit.toFixed(2)}`, c: 'var(--green)', Icon: TrendingUp }, { l: 'Debits', v: `-${debit.toFixed(2)}`, c: 'var(--red)', Icon: TrendingDown }, { l: 'Net', v: `${(credit - debit).toFixed(2)}`, c: credit - debit >= 0 ? 'var(--teal-600)' : 'var(--red)', Icon: ArrowRightLeft }].map((s, i) => (
          <div key={i} style={{ background: 'white', border: '1px solid var(--slate-200)', borderRadius: 14, padding: '18px 20px', boxShadow: '0 1px 8px rgba(0,0,0,.04)' }}>
            <div style={{ fontSize: 11, color: 'var(--slate-400)', letterSpacing: '.1em', textTransform: 'uppercase', marginBottom: 8, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6 }}>
              <s.Icon size={14} /> {s.l}
            </div>
            <div className="mono" style={{ fontSize: 24, fontWeight: 700, color: s.c }}>{s.v} <span style={{ fontSize: 12, opacity: .6 }}>JMC</span></div>
          </div>
        ))}
      </div>
      <Panel title="Transactions" Icon={Wallet} count={pagination.total || txs.length} onRefresh={refetch}>
        {txs.length === 0 ? <Empty Icon={Wallet} msg="No transactions yet" /> : (
          <>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {txs.map((tx, i) => {
                const TxIcon = typeIcon(tx.type);
                return (
                  <div key={tx._id || i} className="mp-tx-row" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 14, background: 'var(--slate-50)', border: '1px solid var(--slate-200)', borderRadius: 12, padding: '14px 18px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <div style={{ width: 42, height: 42, borderRadius: 11, background: tx.direction === 'credit' ? '#ecfdf5' : '#fef2f2', display: 'flex', alignItems: 'center', justifyContent: 'center', border: `1px solid ${tx.direction === 'credit' ? '#d1fae5' : '#fecaca'}`, flexShrink: 0 }}>
                        <TxIcon size={20} color={tx.direction === 'credit' ? 'var(--green)' : 'var(--red)'} />
                      </div>
                      <div>
                        <div style={{ fontWeight: 600, fontSize: 14, color: 'var(--slate-700)', marginBottom: 2 }}>{typeName(tx.type)}</div>
                        <div style={{ fontSize: 12, color: 'var(--slate-400)' }}>{fmtDate(tx.createdAt)}</div>
                      </div>
                    </div>
                    <div className="mp-tx-amount" style={{ textAlign: 'right', flexShrink: 0 }}>
                      <div className="mono" style={{ fontWeight: 700, fontSize: 16, color: tx.direction === 'credit' ? 'var(--green)' : 'var(--red)' }}>{tx.direction === 'credit' ? '+' : '-'}{tx.amount} JMC</div>
                      <div className="mono" style={{ fontSize: 11, color: 'var(--slate-400)', marginTop: 2 }}>{tx.balanceBefore} → {tx.balanceAfter}</div>
                    </div>
                  </div>
                );
              })}
            </div>
            {totalPages > 1 && <Pager page={page} total={totalPages} setPage={setPage} />}
          </>
        )}
      </Panel>
    </div>
  );
};

// ─── Referrals ────────────────────────────────────────────────
const ReferralSection = ({ data, loading, refetch, page, setPage, fmtDate }) => {
  if (loading) return <TableSkeleton />;
  const refs = data?.logs || [];
  const pagination = data?.pagination || {};
  const totalPages = pagination.totalPages || 1;
  const total = refs.reduce((s, r) => s + (r.bonusAmount || 0), 0);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div className="mp-stats-grid-4" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 12 }}>
        {[
          { l: 'Total Earned', v: `${total} JMC`, c: 'var(--teal-600)', Icon: TrendingUp },
          { l: 'Referrals', v: pagination.total || refs.length, c: 'var(--slate-700)', Icon: Users },
          { l: 'Paid', v: refs.filter(r => r.status === 'paid').length, c: 'var(--green)', Icon: CheckCircle },
          { l: 'Avg Bonus', v: `${refs.length ? (total / refs.length).toFixed(1) : 0} JMC`, c: 'var(--slate-700)', Icon: BarChart3 },
        ].map((s, i) => (
          <div key={i} style={{ background: 'white', border: '1px solid var(--slate-200)', borderRadius: 14, padding: '16px 18px', boxShadow: '0 1px 8px rgba(0,0,0,.04)' }}>
            <div style={{ fontSize: 10, color: 'var(--slate-400)', letterSpacing: '.1em', textTransform: 'uppercase', marginBottom: 8, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 5 }}>
              <s.Icon size={13} /> {s.l}
            </div>
            <div className="mono" style={{ fontSize: 22, fontWeight: 700, color: s.c }}>{s.v}</div>
          </div>
        ))}
      </div>
      <Panel title="Referral Bonuses" Icon={Users} count={pagination.total || refs.length} onRefresh={refetch}>
        {refs.length === 0 ? <Empty Icon={Users} msg="No referral bonuses yet" sub="Share your referral code to earn" /> : (
          <>
            {refs.map((ref, i) => (
              <div key={ref._id || i} className="mp-ref-row" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 14, background: 'var(--slate-50)', border: '1px solid var(--slate-200)', borderRadius: 12, padding: '13px 18px', marginBottom: 8 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div className="mono" style={{ width: 40, height: 40, background: 'var(--teal-50)', border: '1px solid var(--teal-200)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, color: 'var(--teal-600)', flexShrink: 0 }}>{ref.referredUserId?.slice(-2)?.toUpperCase() || '??'}</div>
                  <div>
                    <div className="mono" style={{ fontSize: 13, color: 'var(--slate-600)', marginBottom: 2 }}>{ref.referredUserId?.length > 10 ? `${ref.referredUserId.slice(0, 8)}…${ref.referredUserId.slice(-4)}` : ref.referredUserId}</div>
                    <div style={{ fontSize: 12, color: 'var(--slate-400)' }}>Mine date: {ref.mineDate}</div>
                  </div>
                </div>
                <div className="mp-ref-amount" style={{ textAlign: 'right' }}>
                  <div className="mono" style={{ fontWeight: 700, color: 'var(--teal-600)', fontSize: 16 }}>+{ref.bonusAmount} JMC</div>
                  <div style={{ fontSize: 11, color: 'var(--green)', fontWeight: 600, marginTop: 3 }}>{ref.status}</div>
                </div>
              </div>
            ))}
            {totalPages > 1 && <Pager page={page} total={totalPages} setPage={setPage} />}
          </>
        )}
      </Panel>
      <div style={{ background: 'var(--teal-50)', border: '1px solid var(--teal-200)', borderRadius: 14, padding: '18px 22px', display: 'flex', gap: 14, alignItems: 'flex-start' }}>
        <Lightbulb size={22} color="var(--teal-600)" style={{ flexShrink: 0, marginTop: 2 }} />
        <div>
          <div style={{ fontWeight: 700, color: 'var(--teal-700)', marginBottom: 5, fontSize: 15 }}>How Referrals Work</div>
          <div style={{ color: 'var(--teal-600)', fontSize: 13, lineHeight: 1.7 }}>Earn <strong>3 JMC</strong> every time a referred user mines successfully. More active referrals = more passive income.</div>
        </div>
      </div>
    </div>
  );
};

// ─── Slots Section ────────────────────────────────────────────
const SlotsSection = ({ slots, currentSlot, timeLeft, loading, refetch, slotsData }) => {
  if (loading) return <TableSkeleton />;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {currentSlot && (
        <div className="mp-slot-hero" style={{ background: 'linear-gradient(135deg,var(--teal-600),var(--teal-700))', borderRadius: 20, padding: '32px 36px', color: 'white', position: 'relative', overflow: 'hidden', boxShadow: '0 12px 40px rgba(20,184,166,.3)' }}>
          <div style={{ position: 'absolute', right: -30, top: -30, width: 180, height: 180, borderRadius: '50%', background: 'rgba(255,255,255,.06)' }} />
          <div style={{ position: 'absolute', right: 60, bottom: -50, width: 120, height: 120, borderRadius: '50%', background: 'rgba(255,255,255,.04)' }} />
          <div className="mp-slot-hero-wrap" style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 24, position: 'relative' }}>
            <div>
              <div style={{ fontSize: 11, letterSpacing: '.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,.6)', marginBottom: 8, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6 }}>
                <CircleDot size={14} /> Currently Active
              </div>
              <div className="mp-slot-hero-title" style={{ fontSize: 40, fontWeight: 800, marginBottom: 6 }}>Slot {currentSlot.slotNumber}</div>
              <div className="mono" style={{ fontSize: 13, color: 'rgba(255,255,255,.6)' }}>{fmt24(currentSlot.startHour)} → {fmt24(currentSlot.endHour)}</div>
            </div>
            <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
              {/* Circular progress in hero */}
              <CircularTimer progress={timeLeft.progress || 0} size={72} isActive={true} />
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 10, color: 'rgba(255,255,255,.5)', letterSpacing: '.12em', textTransform: 'uppercase', marginBottom: 8, fontWeight: 600 }}>Time Left</div>
                <div className="mono mp-slot-hero-time" style={{ fontSize: 32, fontWeight: 700 }}>{pad(timeLeft.hours)}:{pad(timeLeft.minutes)}:{pad(timeLeft.seconds)}</div>
              </div>
            </div>
          </div>
          <div style={{ marginTop: 20 }}>
            <div style={{ background: 'rgba(255,255,255,.15)', borderRadius: 100, height: 6, overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${timeLeft.progress || 0}%`, background: 'white', borderRadius: 100, transition: 'width 1s linear' }} />
            </div>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,.45)', marginTop: 6 }}>{(timeLeft.progress || 0).toFixed(1)}% of slot elapsed</div>
          </div>
        </div>
      )}

      <Panel title="All Mining Slots" Icon={Clock} onRefresh={refetch}>
        {slots.length === 0 ? <Empty Icon={Clock} msg="No slots available" /> : (
          <div className="mp-slots-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(190px,1fr))', gap: 12 }}>
            {slots.map((slot, i) => {
              const isActive = currentSlot?.slotNumber === slot.slotNumber;
              return (
                <div key={slot.slotNumber || i} className="lift" style={{ background: isActive ? 'var(--teal-50)' : 'var(--slate-50)', border: `1.5px solid ${isActive ? 'var(--teal-400)' : 'var(--slate-200)'}`, borderRadius: 14, padding: '18px 20px', position: 'relative', overflow: 'hidden', boxShadow: isActive ? '0 4px 20px rgba(20,184,166,.15)' : 'none' }}>
                  {isActive && <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: 'linear-gradient(90deg,var(--teal-400),var(--teal-600))' }} />}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                    <div style={{ fontWeight: 800, fontSize: 16, color: isActive ? 'var(--teal-700)' : 'var(--slate-700)' }}>Slot {slot.slotNumber}</div>
                    {isActive && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: 5, background: 'var(--teal-100)', border: '1px solid var(--teal-300)', borderRadius: 100, padding: '3px 10px' }}>
                        <div style={{ width: 6, height: 6, background: 'var(--teal-500)', borderRadius: '50%', animation: 'blink 1.5s ease-in-out infinite' }} />
                        <span className="mono" style={{ fontSize: 9, color: 'var(--teal-700)', letterSpacing: '.1em', fontWeight: 700 }}>LIVE</span>
                      </div>
                    )}
                  </div>
                  <div className="mono" style={{ fontSize: 12, color: 'var(--slate-400)', marginBottom: 6 }}>{fmt24(slot.startHour)} → {fmt24(slot.endHour)}</div>
                  <div style={{ fontSize: 12, color: isActive ? 'var(--teal-500)' : 'var(--slate-400)', fontWeight: 500, display: 'flex', alignItems: 'center', gap: 4 }}>
                    <Clock size={11} /> {slot.endHour - slot.startHour}h window
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </Panel>

      {slotsData?.date && (
        <div style={{ textAlign: 'center' }}>
          <span className="mono" style={{ fontSize: 11, color: 'var(--slate-400)', letterSpacing: '.1em' }}>Schedule for {slotsData.date}</span>
        </div>
      )}
    </div>
  );
};

// ─── Shared UI ────────────────────────────────────────────────
const Panel = ({ title, Icon, count, onRefresh, children }) => (
  <div className="mp-panel" style={{ background: 'white', border: '1px solid var(--slate-200)', borderRadius: 18, padding: 22, boxShadow: '0 2px 12px rgba(0,0,0,.04)' }}>
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18, flexWrap: 'wrap', gap: 8 }}>
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 2 }}>
          <Icon size={16} color="var(--teal-600)" />
          <span style={{ fontWeight: 800, fontSize: 16, color: 'var(--slate-800)' }}>{title}</span>
        </div>
        {count !== undefined && <div className="mono" style={{ fontSize: 10, color: 'var(--slate-400)', letterSpacing: '.1em', marginLeft: 24 }}>{count} records</div>}
      </div>
      {onRefresh && <button className="sec-btn" onClick={onRefresh} style={{ padding: '6px 14px' }}><RefreshCw size={13} /> Refresh</button>}
    </div>
    {children}
  </div>
);

const BalCard = ({ label, value, unit, primary, bar, barVal, Icon }) => (
  <div className="lift" style={{ background: primary ? 'linear-gradient(135deg,var(--teal-500),var(--teal-700))' : 'white', border: `1px solid ${primary ? 'var(--teal-400)' : 'var(--slate-200)'}`, borderRadius: 14, padding: '18px 20px', boxShadow: primary ? '0 8px 28px rgba(20,184,166,.3)' : '0 1px 8px rgba(0,0,0,.04)' }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 10 }}>
      <Icon size={13} color={primary ? 'rgba(255,255,255,.65)' : 'var(--slate-400)'} />
      <div className="mono" style={{ fontSize: 10, letterSpacing: '.12em', textTransform: 'uppercase', color: primary ? 'rgba(255,255,255,.65)' : 'var(--slate-400)', fontWeight: 500 }}>{label}</div>
    </div>
    <div className="mono" style={{ fontSize: 26, fontWeight: 700, color: primary ? 'white' : 'var(--slate-800)', lineHeight: 1 }}>{value} <span style={{ fontSize: 12, opacity: .6, fontWeight: 400 }}>{unit}</span></div>
    {bar && (
      <div style={{ marginTop: 12, background: primary ? 'rgba(255,255,255,.2)' : 'var(--slate-100)', borderRadius: 100, height: 5, overflow: 'hidden' }}>
        <div style={{ height: '100%', width: `${barVal}%`, background: primary ? 'white' : barVal >= 80 ? 'var(--teal-500)' : barVal >= 50 ? 'var(--yellow)' : 'var(--red)', borderRadius: 100, transition: 'width .8s ease' }} />
      </div>
    )}
  </div>
);

const DRow = ({ label, value, color, bold }) => (
  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '9px 12px', background: 'var(--slate-50)', borderRadius: 9, border: '1px solid var(--slate-200)', marginBottom: 6 }}>
    <span style={{ fontSize: 13, color: 'var(--slate-500)' }}>{label}</span>
    <span className="mono" style={{ fontSize: 13, fontWeight: bold ? 700 : 600, color: color || 'var(--slate-700)' }}>{value}</span>
  </div>
);

const Chip = ({ label }) => (
  <span className="mono" style={{ fontSize: 10, padding: '3px 10px', borderRadius: 100, background: 'var(--teal-50)', color: 'var(--teal-700)', border: '1px solid var(--teal-200)', fontWeight: 600, letterSpacing: '.05em', textTransform: 'capitalize' }}>{label}</span>
);

const Empty = ({ Icon, msg, sub }) => (
  <div style={{ textAlign: 'center', padding: '52px 20px' }}>
    <Icon size={36} color="var(--slate-300)" style={{ marginBottom: 14 }} />
    <div style={{ fontWeight: 700, color: 'var(--slate-600)', marginBottom: 6, fontSize: 15 }}>{msg}</div>
    {sub && <div style={{ fontSize: 13, color: 'var(--slate-400)' }}>{sub}</div>}
  </div>
);

const Pager = ({ page, total, setPage }) => (
  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, marginTop: 24, paddingTop: 18, borderTop: '1px solid var(--slate-200)', flexWrap: 'wrap' }}>
    <button onClick={() => setPage(page - 1)} disabled={page === 1} style={{ background: 'white', border: '1px solid var(--slate-200)', borderRadius: 8, padding: '7px 14px', cursor: 'pointer', color: 'var(--slate-500)', opacity: page === 1 ? .4 : 1, display: 'flex', alignItems: 'center' }}>
      <ChevronLeft size={16} />
    </button>
    {[...Array(Math.min(5, total))].map((_, i) => {
      const p = total <= 5 ? i + 1 : page <= 3 ? i + 1 : page >= total - 2 ? total - 4 + i : page - 2 + i;
      return (
        <button key={p} onClick={() => setPage(p)} style={{ background: page === p ? 'var(--teal-500)' : 'white', border: `1px solid ${page === p ? 'var(--teal-500)' : 'var(--slate-200)'}`, borderRadius: 8, padding: '7px 13px', minWidth: 36, cursor: 'pointer', fontWeight: page === p ? 700 : 400, color: page === p ? 'white' : 'var(--slate-500)', fontFamily: 'JetBrains Mono,monospace', fontSize: 13 }}>{p}</button>
      );
    })}
    <button onClick={() => setPage(page + 1)} disabled={page === total} style={{ background: 'white', border: '1px solid var(--slate-200)', borderRadius: 8, padding: '7px 14px', cursor: 'pointer', color: 'var(--slate-500)', opacity: page === total ? .4 : 1, display: 'flex', alignItems: 'center' }}>
      <ChevronRight size={16} />
    </button>
    <span className="mono" style={{ fontSize: 11, color: 'var(--slate-400)', marginLeft: 6 }}>{page}/{total}</span>
  </div>
);

const PageSkeleton = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
    <div className="skeleton" style={{ height: 50, width: '100%', maxWidth: 360 }} />
    <div className="skeleton" style={{ height: 148 }} />
    <div className="mp-stats-grid-4" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 12 }}>{[...Array(4)].map((_, i) => <div key={i} className="skeleton" style={{ height: 100 }} />)}</div>
    <div className="skeleton" style={{ height: 380 }} />
    <div className="mp-stats-grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>{[...Array(2)].map((_, i) => <div key={i} className="skeleton" style={{ height: 240 }} />)}</div>
  </div>
);

const TableSkeleton = () => (
  <div style={{ background: 'white', border: '1px solid var(--slate-200)', borderRadius: 18, padding: 22 }}>
    <div className="skeleton" style={{ height: 24, width: 200, marginBottom: 20 }} />
    {[...Array(5)].map((_, i) => <div key={i} className="skeleton" style={{ height: 52, marginBottom: 8 }} />)}
  </div>
);

export default MiningPage;