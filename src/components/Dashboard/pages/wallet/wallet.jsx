
// import React, { useEffect, useRef, useState } from 'react';
// import { FaShareAlt } from "react-icons/fa";
// import assets from "../../../../assets/assets"
// import { TextField, InputAdornment } from "@mui/material";
// import TransactionDetails from './transactionDetails/transactionDetails';
// import { useNavigate } from 'react-router-dom';



// const transactionData = []


// const Wallet = () => {

//   const navigate = useNavigate()

//   const shapeBaseStyles = {
//     position: 'absolute',
//     backgroundColor: '#111111',
//     opacity: 0.3,
//     pointerEvents: 'none',
//     transition: 'opacity 0.3s ease, transform 3s ease-in-out',
//     zIndex: 0,
//     animationIterationCount: 'infinite',
//     animationDirection: 'alternate',
//     willChange: 'transform',
//   };

//   const shapeStyles = {
//     circle: {
//       width: '6rem',
//       height: '6rem',
//       borderRadius: '50%',
//       animationName: 'floatUpDown',
//       animationDuration: '6s',
//     },
//     diamond: {
//       width: '5rem',
//       height: '5rem',
//       transform: 'rotate(45deg)',
//       animationName: 'floatLeftRight',
//       animationDuration: '5.5s',
//     },
//   };

//   const shapePositions = [
//     { top: '-1.5rem', right: '-1.5rem' },
//     { bottom: '-1.5rem', left: '-1.5rem' },
//   ];

//   return (
//     <>
//       <style>
//         {`
//             @keyframes floatUpDown {
//               0% { transform: translateY(0); }
//               100% { transform: translateY(10px); }
//             }
//             @keyframes floatLeftRight {
//               0% { transform: translateX(0); }
//               100% { transform: translateX(10px); }
//             }
//           `}
//       </style>

//       <div className='w-full bg-[#1d8e85] min-h-screen '>
//         <div className="px-4 py-6 space-y-6">
//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

//             {/* Wallet Box (Spans 2 Columns) */}
//             <div className="relative group p-6 rounded-xl shadow-lg bg-white overflow-hidden transition duration-300 ease-in-out hover:shadow-2xl hover:scale-[1.03] col-span-1 lg:col-span-2 flex flex-col justify-between">

//               {/* Floating shapes */}

//               {/* Floating shapes */}
//               {['circle', 'diamond'].map((shape, i) => (
//                 <div
//                   key={i}
//                   style={{ ...shapeBaseStyles, ...shapeStyles[shape], ...shapePositions[i] }}
//                   className="group-hover:opacity-100 opacity-30"
//                 />
//               ))}

//               {/* Wallet Content */}
//               {/* Wallet Content */}
//               <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center text-[#084e54] z-10 gap-4">
//                 {/* Wallet Info */}
//                 <div className="flex items-center gap-4">
//                   <div className="w-16 h-16 bg-[#e0f7f6] rounded-full flex items-center justify-center border-2 border-[#4ecdc4] shadow-md">
//                     <img
//                       src={assets.walletBal}
//                       alt="Wallet Icon"
//                       className="w-10 h-10 object-contain"
//                     />
//                   </div>
//                   <div>
//                     <p className="text-sm">Wallet Balance</p>
//                     <p className="text-2xl font-bold">₹0.00</p>
//                   </div>
//                 </div>

//                 {/* Add Money Button Section */}
//                 {/* Add Funds Button Section */}
//                 <div className="w-full  text-center sm:text-right">
//                   <h1 className="font-bold text-sm sm:text-base mb-2 sm:mb-2">Add Money to Wallet</h1>
//                   <button
//                     className="w-full bg-gradient-to-r from-[#094e54] to-[#4ecdc4] text-white 
//     font-semibold px-5 py-2 sm:px-2 sm:py-3 text-sm sm:text-base 
//     rounded-full hover:from-[#0a5c64] hover:to-[#5dd5cd] transition duration-300"

//     onClick={() => navigate("/add_funds")}
//                   >
//                     ADD FUNDS
//                   </button>
//                 </div>

//               </div>

//             </div>

//             {/* Referral Code Box (Single Column) */}
//             <div className="relative group bg-white p-6 rounded-xl shadow-lg text-[#084e54] overflow-hidden transition duration-300 ease-in-out hover:shadow-2xl hover:scale-[1.03]">
//               {/* Floating shapes */}
//               {['circle', 'diamond'].map((shape, i) => (
//                 <div
//                   key={i}
//                   style={{ ...shapeBaseStyles, ...shapeStyles[shape], ...shapePositions[i] }}
//                   className="group-hover:opacity-100 opacity-30"
//                 />
//               ))}


//                             <TextField
//                 fullWidth
//                 label="Referral Code"
//                 value="JMXA4557jXXN"
//                 InputProps={{
//                   readOnly: true,
//                   endAdornment: (
//                     <InputAdornment position="end">
//                       <FaShareAlt style={{ cursor: 'pointer', color: '#084e54' }} />
//                     </InputAdornment>
//                   ),
//                 }}
//                 variant="outlined"
//                 size="small"
//                 sx={{
//                   input: { color: '#084e54' },
//                   label: { color: '#084e54' },
//                   '& .MuiOutlinedInput-root': {
//                     '& fieldset': { borderColor: '#4caf50' },
//                     '&:hover fieldset': { borderColor: '#81c784' },
//                     '&.Mui-focused fieldset': { borderColor: '#66bb6a' },
//                   },
//                 }}
//               />

//             </div>

//           </div>
//         </div>

//         <div className="flex flex-col h-screen">
//           {/* Other sidebar or wallet boxes here */}
//           <TransactionDetails list={transactionData} />
//         </div>

//       </div>
//     {/* {(isLoading || loading) && <Loader />} */}
//     </>
//   );
// };

// export default Wallet; 



// import React, { useState, useEffect } from "react";
// import { FaShareAlt } from "react-icons/fa";
// import { TextField, InputAdornment } from "@mui/material";
// import { Search } from "lucide-react";
// import assets from "../../../../assets/assets";
// import { useNavigate } from "react-router-dom";
// import { toast, ToastContainer } from "react-toastify";


// const ITEMS_PER_PAGE = 10;

// const Wallet = () => {
//   const navigate = useNavigate();
//   const [query, setQuery] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);

//   // Replace with actual data
//   const transactionData = [];

//   const filteredList = transactionData.filter(
//     (item) =>
//       item.transactionId?.toLowerCase().includes(query.toLowerCase()) ||
//       item.updatedBy?.toLowerCase().includes(query.toLowerCase())
//   );

//   const totalPages = Math.ceil(filteredList.length / ITEMS_PER_PAGE);
//   const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
//   const paginatedList = filteredList.slice(
//     startIndex,
//     startIndex + ITEMS_PER_PAGE
//   ); 

//   useEffect(() => setCurrentPage(1), [query]);

//   const handlePrevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
//   const handleNextPage = () =>
//     setCurrentPage((prev) => Math.min(prev + 1, totalPages));

//   const shapeBaseStyles = {
//     position: "absolute",
//     backgroundColor: "#111111",
//     opacity: 0.3,
//     pointerEvents: "none",
//     transition: "opacity 0.3s ease, transform 3s ease-in-out",
//     zIndex: 0,
//     animationIterationCount: "infinite",
//     animationDirection: "alternate",
//     willChange: "transform",
//   };

//   const shapeStyles = {
//     circle: {
//       width: "6rem",
//       height: "6rem",
//       borderRadius: "50%",
//       animationName: "floatUpDown",
//       animationDuration: "6s",
//     },
//     diamond: {
//       width: "5rem",
//       height: "5rem",
//       transform: "rotate(45deg)",
//       animationName: "floatLeftRight",
//       animationDuration: "5.5s",
//     },
//   };

//   const shapePositions = [
//     { top: "-1.5rem", right: "-1.5rem" },
//     { bottom: "-1.5rem", left: "-1.5rem" },
//   ];

//   return (
//     <>
//       <style>
//         {`
//           @keyframes floatUpDown {
//             0% { transform: translateY(0); }
//             100% { transform: translateY(10px); }
//           }
//           @keyframes floatLeftRight {
//             0% { transform: translateX(0); }
//             100% { transform: translateX(10px); }
//           }
//         `}
//       </style>

//       <div className="w-full bg-[#1d8e85] min-h-screen">
//         <div className="px-4 py-6 space-y-6">
//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//             {/* Wallet Info */}
//             <div className="relative group p-6 rounded-xl shadow-lg bg-white overflow-hidden transition duration-300 ease-in-out hover:shadow-2xl hover:scale-[1.03] col-span-1 lg:col-span-2 flex flex-col justify-between">
//               {["circle", "diamond"].map((shape, i) => (
//                 <div
//                   key={i}
//                   style={{
//                     ...shapeBaseStyles,
//                     ...shapeStyles[shape],
//                     ...shapePositions[i],
//                   }}
//                   className="group-hover:opacity-100 opacity-30"
//                 />
//               ))}

//               <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center text-[#084e54] z-10 gap-4">
//                 <div className="flex items-center gap-4">
//                   <div className="w-16 h-16 bg-[#e0f7f6] rounded-full flex items-center justify-center border-2 border-[#4ecdc4] shadow-md">
//                     <img
//                       src={assets.walletBal}
//                       alt="Wallet Icon"
//                       className="w-10 h-10 object-contain"
//                     />
//                   </div>
//                   <div>
//                     <p className="text-sm">Wallet Balance</p>
//                     <p className="text-2xl font-bold">₹0.00</p>
//                   </div>
//                 </div>

//                 <div className="w-full text-center sm:text-right">
//                   <h1 className="font-bold text-sm sm:text-base mb-2 sm:mb-2">
//                     Add Money to Wallet
//                   </h1>
//                   <button
//                     className=" px-5 bg-gradient-to-r from-[#094e54] to-[#4ecdc4] text-white font-semibold py-2 sm:px-2 sm:py-3 text-sm sm:text-base rounded-full hover:from-[#0a5c64] hover:to-[#5dd5cd] transition duration-300"
//                     onClick={() => navigate("/add_funds")}
//                   >
//                     ADD FUNDS
//                   </button>
//                 </div>
//               </div>
//             </div>

//             {/* Referral Box */}
//             <div className="relative group bg-white p-6 rounded-xl shadow-lg text-[#084e54] overflow-hidden transition duration-300 ease-in-out hover:shadow-2xl hover:scale-[1.03]">
//               {["circle", "diamond"].map((shape, i) => (
//                 <div
//                   key={i}
//                   style={{
//                     ...shapeBaseStyles,
//                     ...shapeStyles[shape],
//                     ...shapePositions[i],
//                   }}
//                   className="group-hover:opacity-100 opacity-30"
//                 />
//               ))}
//               <TextField
//                 fullWidth
//                 label="Referral Code"
//                 value="JMXA4557jXXN"
//                 InputProps={{
//                   readOnly: true,
//                   endAdornment: (
//                     <InputAdornment position="end">
//                       <FaShareAlt
//                         style={{ cursor: "pointer", color: "#084e54" }}
//                       />
//                     </InputAdornment>
//                   ),
//                 }}
//                 variant="outlined"
//                 size="small"
//                 sx={{
//                   input: { color: "#084e54" },
//                   label: { color: "#084e54" },
//                   "& .MuiOutlinedInput-root": {
//                     "& fieldset": { borderColor: "#4caf50" },
//                     "&:hover fieldset": { borderColor: "#81c784" },
//                     "&.Mui-focused fieldset": { borderColor: "#66bb6a" },
//                   },
//                 }}
//               />
//             </div>
//           </div>
//         </div>

//         {/* Transaction Section */}
//         <div className="px-4 pb-10">
//           <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 mb-3">
//             <h2 className="text-lg text-white font-semibold">Team Transactions</h2>
//             <div className="flex items-center rounded-xl border border-white px-3 py-1.5 w-full max-w-sm sm:max-w-xs md:max-w-[200px] lg:max-w-[288px]">
//               <input
//                 type="text"
//                 placeholder="Search"
//                 value={query}
//                 onChange={(e) => setQuery(e.target.value)}
//                 className="bg-transparent text-white placeholder-white focus:outline-none flex-grow"
//                 style={{ fontSize: "0.85rem", padding: "4px 8px" }}
//               />
//               <Search className="text-white" size={16} />
//             </div>
//           </div>

//           {paginatedList.length > 0 ? (
//             <>
//               <div className="grid gap-4">
//                 {paginatedList.map((item, idx) => (
//                   <div
//                     key={startIndex + idx}
//                     className="bg-white rounded-md shadow p-4 text-sm text-[#333] flex flex-col gap-2 sm:grid sm:grid-cols-3 sm:gap-4"
//                   >
//                     {[
//                       ["No", item.sno],
//                       ["Txn ID", item.transactionId],
//                       ["Amount", item.amount],
//                       ["Type", item.type],
//                       ["Payment Method", item.paymentMethod],
//                       ["Currency", item.currency],
//                       ["Txn Date", item.transactionDate],
//                       ["Status", item.status],
//                       ["Reason", item.reason],
//                       ["Updated By", item.updatedBy],
//                       ["Updated On", item.updatedOn],
//                     ].map(([label, value], i) => (
//                       <div key={i}>
//                         <span className="font-semibold text-[#084e54]">
//                           {label}:{" "}
//                         </span>
//                         {value || "-"}
//                       </div>
//                     ))}
//                   </div>
//                 ))}
//               </div>

//               <div className="flex justify-center items-center gap-4 mt-4">
//                 <button
//                   onClick={handlePrevPage}
//                   disabled={currentPage === 1}
//                   className={`px-4 py-2 rounded font-medium transition-all duration-200 ${
//                     currentPage === 1
//                       ? "bg-[#a5d6a7] text-white cursor-not-allowed"
//                       : "bg-[#20934a] text-white hover:bg-[#1c7f3e]"
//                   }`}
//                   style={{ fontSize: "0.85rem" }}
//                 >
//                   Previous
//                 </button>

//                 <span
//                   style={{ fontSize: "0.85rem" }}
//                   className="text-white font-medium"
//                 >
//                   Page {currentPage} of {totalPages}
//                 </span>

//                 <button
//                   onClick={handleNextPage}
//                   disabled={currentPage === totalPages}
//                   className={`px-4 py-2 rounded font-medium transition-all duration-200 ${
//                     currentPage === totalPages
//                       ? "bg-[#a5d6a7] text-white cursor-not-allowed"
//                       : "bg-[#20934a] text-white hover:bg-[#1c7f3e]"
//                   }`}
//                   style={{ fontSize: "0.85rem" }}
//                 >
//                   Next
//                 </button>
//               </div>
//             </>
//           ) : (
//             <div className="text-white py-6 text-center text-base">
//               No transactions found.
//             </div>
//           )}
//         </div>
//       </div>
//     </>
//   );
// };

// export default Wallet;


// import React, { useState, useEffect } from "react";
// import { FaShareAlt } from "react-icons/fa";
// import { TextField, InputAdornment } from "@mui/material";
// import { Search } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import { toast, ToastContainer } from "react-toastify";
// import assets from "../../../../assets/assets";

// // Import API slice hooks
// import {
//    useAvailableBalanceQuery,
//   useWalletTransactionsListQuery,
//   // useGetUserReferralDataQuery,
//   // useShareReferralMutation,
// } from "./walletApiSlice"; // Adjust path as needed

// const ITEMS_PER_PAGE = 10;

// const Wallet = () => {
//   const navigate = useNavigate();
//   const [query, setQuery] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);

//   // Get user data from localStorage
//   const userData = localStorage.getItem("userData") && 
//     JSON.parse(localStorage.getItem("userData"));
//   const countryCode = userData?.data?.countryCode;

//   // API hooks
//   const {
//     data: balanceData,
//     isLoading: balanceLoading,
//     error: balanceError,
//     refetch: refetchBalance,
//   } = useAvailableBalanceQuery();

//   const {
//     data: transactionsData,
//     isLoading: transactionsLoading,
//     error: transactionsError,
//     refetch: refetchTransactions,
//   } = useWalletTransactionsListQuery({
//     page: currentPage,
//     limit: ITEMS_PER_PAGE,
//     search: query,
//   });

//   // const {
//   //   data: referralData,
//   //   isLoading: referralLoading,
//   // } = useGetUserReferralDataQuery();

//   // const [shareReferral, { isLoading: shareLoading }] = useShareReferralMutation();

//   // Extract data from API responses
//   const walletBalance = balanceData?.data?.totalAvailableBalance || 0;
//   const transactionsList = transactionsData?.data?.transactions || [];
//   const totalTransactions = transactionsData?.data?.total || 0;
//   const referralCode = referralData?.data?.referralCode || userData?.data?.username || "JMXA4557jXXN";

//   // Calculate pagination
//   const totalPages = Math.ceil(totalTransactions / ITEMS_PER_PAGE);

//   // Handle search - reset to page 1 when searching
//   useEffect(() => {
//     setCurrentPage(1);
//   }, [query]);

//   // Debounced search effect
//   useEffect(() => {
//     const delayedSearch = setTimeout(() => {
//       refetchTransactions();
//     }, 500);

//     return () => clearTimeout(delayedSearch);
//   }, [query, currentPage, refetchTransactions]);

//   const handlePrevPage = () => {
//     setCurrentPage((prev) => Math.max(prev - 1, 1));
//   };

//   const handleNextPage = () => {
//     setCurrentPage((prev) => Math.min(prev + 1, totalPages));
//   };

//   // Format date function
//   const formatDate = (dateString) => {
//     if (!dateString) return "N/A";
//     const date = new Date(dateString);
//     return date.toLocaleDateString() + " " + date.toLocaleTimeString();
//   };

//   // Format currency
//   const formatCurrency = (amount) => {
//     const symbol = countryCode === 91 ? "₹" : "$";
//     return `${symbol}${parseFloat(amount).toFixed(2)}`;
//   };

//   // Handle referral share
//   const handleShareReferral = async () => {
//     try {
//       const shareData = {
//         referralCode,
//         platform: 'general', // or detect platform
//       };

//       const result = await shareReferral(shareData).unwrap();
//       toast.success("Referral link shared successfully!");
//     } catch (error) {
//       toast.error("Failed to share referral link");
//       console.error("Share error:", error);
//     }
//   };

//   // Handle copy to clipboard
//   const handleCopyReferral = async () => {
//     try {
//       const referralUrl = `${window.location.origin}/register?referralCode=${referralCode}`;
//       await navigator.clipboard.writeText(referralUrl);
//       toast.success("Referral link copied to clipboard!");
//     } catch (error) {
//       toast.error("Failed to copy referral link");
//     }
//   };

//   // Shape styles for animations
//   const shapeBaseStyles = {
//     position: "absolute",
//     backgroundColor: "#111111",
//     opacity: 0.3,
//     pointerEvents: "none",
//     transition: "opacity 0.3s ease, transform 3s ease-in-out",
//     zIndex: 0,
//     animationIterationCount: "infinite",
//     animationDirection: "alternate",
//     willChange: "transform",
//   };

//   const shapeStyles = {
//     circle: {
//       width: "6rem",
//       height: "6rem",
//       borderRadius: "50%",
//       animationName: "floatUpDown",
//       animationDuration: "6s",
//     },
//     diamond: {
//       width: "5rem",
//       height: "5rem",
//       transform: "rotate(45deg)",
//       animationName: "floatLeftRight",
//       animationDuration: "5.5s",
//     },
//   };

//   const shapePositions = [
//     { top: "-1.5rem", right: "-1.5rem" },
//     { bottom: "-1.5rem", left: "-1.5rem" },
//   ];

//   // Loading skeleton component
//   const LoadingSkeleton = () => (
//     <div className="animate-pulse">
//       <div className="h-4 bg-gray-300 rounded mb-2"></div>
//       <div className="h-4 bg-gray-300 rounded mb-2 w-3/4"></div>
//       <div className="h-4 bg-gray-300 rounded w-1/2"></div>
//     </div>
//   );

//   return (
//     <>
//       <style>
//         {`
//           @keyframes floatUpDown {
//             0% { transform: translateY(0); }
//             100% { transform: translateY(10px); }
//           }
//           @keyframes floatLeftRight {
//             0% { transform: translateX(0); }
//             100% { transform: translateX(10px); }
//           }
//         `}
//       </style>

//       <div className="w-full bg-[#1d8e85] min-h-screen">
//         <div className="px-4 py-6 space-y-6">
//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//             {/* Wallet Info */}
//             <div className="relative group p-6 rounded-xl shadow-lg bg-white overflow-hidden transition duration-300 ease-in-out hover:shadow-2xl hover:scale-[1.03] col-span-1 lg:col-span-2 flex flex-col justify-between">
//               {["circle", "diamond"].map((shape, i) => (
//                 <div
//                   key={i}
//                   style={{
//                     ...shapeBaseStyles,
//                     ...shapeStyles[shape],
//                     ...shapePositions[i],
//                   }}
//                   className="group-hover:opacity-100 opacity-30"
//                 />
//               ))}

//               <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center text-[#084e54] z-10 gap-4">
//                 <div className="flex items-center gap-4">
//                   <div className="w-16 h-16 bg-[#e0f7f6] rounded-full flex items-center justify-center border-2 border-[#4ecdc4] shadow-md">
//                     <img
//                       src={assets.walletBal}
//                       alt="Wallet Icon"
//                       className="w-10 h-10 object-contain"
//                     />
//                   </div>
//                   <div>
//                     <p className="text-sm">Wallet Balance</p>
//                     {balanceLoading ? (
//                       <div className="animate-pulse h-8 bg-gray-300 rounded w-24"></div>
//                     ) : balanceError ? (
//                       <p className="text-red-500 text-sm">Error loading balance</p>
//                     ) : (
//                       <p className="text-2xl font-bold">{formatCurrency(walletBalance)}</p>
//                     )}
//                   </div>
//                 </div>

//                 <div className="w-full text-center sm:text-right">
//                   <h1 className="font-bold text-sm sm:text-base mb-2 sm:mb-2">
//                     Add Money to Wallet
//                   </h1>
//                   <button
//                     className="px-5 bg-gradient-to-r from-[#094e54] to-[#4ecdc4] text-white font-semibold py-2 sm:px-2 sm:py-3 text-sm sm:text-base rounded-full hover:from-[#0a5c64] hover:to-[#5dd5cd] transition duration-300"
//                     onClick={() => navigate("/add_funds")}
//                   >
//                     ADD FUNDS
//                   </button>
//                 </div>
//               </div>
//             </div>

//             {/* Referral Box */}
//             <div className="relative group bg-white p-6 rounded-xl shadow-lg text-[#084e54] overflow-hidden transition duration-300 ease-in-out hover:shadow-2xl hover:scale-[1.03]">
//               {["circle", "diamond"].map((shape, i) => (
//                 <div
//                   key={i}
//                   style={{
//                     ...shapeBaseStyles,
//                     ...shapeStyles[shape],
//                     ...shapePositions[i],
//                   }}
//                   className="group-hover:opacity-100 opacity-30"
//                 />
//               ))}

//               {referralLoading ? (
//                 <LoadingSkeleton />
//               ) : (
//                 <TextField
//                   fullWidth
//                   label="Referral Code"
//                   value={referralCode}
//                   InputProps={{
//                     readOnly: true,
//                     endAdornment: (
//                       <InputAdornment position="end">
//                         <FaShareAlt
//                           style={{ 
//                             cursor: "pointer", 
//                             color: "#084e54",
//                             opacity: shareLoading ? 0.5 : 1 
//                           }}
//                           onClick={!shareLoading ? handleShareReferral : undefined}
//                         />
//                       </InputAdornment>
//                     ),
//                   }}
//                   variant="outlined"
//                   size="small"
//                   sx={{
//                     input: { color: "#084e54" },
//                     label: { color: "#084e54" },
//                     "& .MuiOutlinedInput-root": {
//                       "& fieldset": { borderColor: "#4caf50" },
//                       "&:hover fieldset": { borderColor: "#81c784" },
//                       "&.Mui-focused fieldset": { borderColor: "#66bb6a" },
//                     },
//                   }}
//                   onClick={handleCopyReferral}
//                 />
//               )}
//             </div>
//           </div>
//         </div>

//         {/* Transaction Section */}
//         <div className="px-4 pb-10">
//           <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 mb-3">
//             <h2 className="text-lg text-white font-semibold">Wallet Transactions</h2>
//             <div className="flex items-center rounded-xl border border-white px-3 py-1.5 w-full max-w-sm sm:max-w-xs md:max-w-[200px] lg:max-w-[288px]">
//               <input
//                 type="text"
//                 placeholder="Search transactions..."
//                 value={query}
//                 onChange={(e) => setQuery(e.target.value)}
//                 className="bg-transparent text-white placeholder-white focus:outline-none flex-grow"
//                 style={{ fontSize: "0.85rem", padding: "4px 8px" }}
//               />
//               <Search className="text-white" size={16} />
//             </div>
//           </div>

//           {transactionsLoading ? (
//             <div className="grid gap-4">
//               {[...Array(5)].map((_, idx) => (
//                 <div key={idx} className="bg-white rounded-md shadow p-4">
//                   <LoadingSkeleton />
//                 </div>
//               ))}
//             </div>
//           ) : transactionsError ? (
//             <div className="text-white py-6 text-center text-base">
//               <p>Error loading transactions: {transactionsError.message}</p>
//               <button 
//                 onClick={refetchTransactions}
//                 className="mt-2 px-4 py-2 bg-[#20934a] text-white rounded hover:bg-[#1c7f3e]"
//               >
//                 Retry
//               </button>
//             </div>
//           ) : transactionsList.length > 0 ? (
//             <>
//               <div className="grid gap-4">
//                 {transactionsList.map((item, idx) => (
//                   <div
//                     key={item.id || idx}
//                     className="bg-white rounded-md shadow p-4 text-sm text-[#333] flex flex-col gap-2 sm:grid sm:grid-cols-3 sm:gap-4"
//                   >
//                     {[
//                       ["No", ((currentPage - 1) * ITEMS_PER_PAGE) + idx + 1],
//                       ["Txn ID", item.transactionId],
//                       ["Amount", formatCurrency(item.transactionAmount || item.amount)],
//                       ["Type", item.transactionType || item.type],
//                       ["Payment Method", item.paymentMode || item.paymentMethod],
//                       ["Currency", item.currency],
//                       ["Txn Date", formatDate(item.transactionDate)],
//                       ["Status", item.transactionStatus || item.status],
//                       ["Reason", item.reason],
//                       ["Updated By", item.updatedBy?.name || item.updatedBy],
//                       ["Updated On", formatDate(item.updatedOn)],
//                     ].map(([label, value], i) => (
//                       <div key={i}>
//                         <span className="font-semibold text-[#084e54]">
//                           {label}:{" "}
//                         </span>
//                         <span className={
//                           label === "Status" ? 
//                             `${value?.toLowerCase() === 'completed' ? 'text-green-600' : 
//                                value?.toLowerCase() === 'pending' ? 'text-yellow-600' : 
//                                'text-red-600'} font-medium` : ''
//                         }>
//                           {value || "N/A"}
//                         </span>
//                       </div>
//                     ))}
//                   </div>
//                 ))}
//               </div>

//               <div className="flex justify-center items-center gap-4 mt-4">
//                 <button
//                   onClick={handlePrevPage}
//                   disabled={currentPage === 1}
//                   className={`px-4 py-2 rounded font-medium transition-all duration-200 ${
//                     currentPage === 1
//                       ? "bg-[#a5d6a7] text-white cursor-not-allowed"
//                       : "bg-[#20934a] text-white hover:bg-[#1c7f3e]"
//                   }`}
//                   style={{ fontSize: "0.85rem" }}
//                 >
//                   Previous
//                 </button>

//                 <span
//                   style={{ fontSize: "0.85rem" }}
//                   className="text-white font-medium"
//                 >
//                   Page {currentPage} of {totalPages}
//                 </span>

//                 <button
//                   onClick={handleNextPage}
//                   disabled={currentPage === totalPages}
//                   className={`px-4 py-2 rounded font-medium transition-all duration-200 ${
//                     currentPage === totalPages
//                       ? "bg-[#a5d6a7] text-white cursor-not-allowed"
//                       : "bg-[#20934a] text-white hover:bg-[#1c7f3e]"
//                   }`}
//                   style={{ fontSize: "0.85rem" }}
//                 >
//                   Next
//                 </button>
//               </div>
//             </>
//           ) : (
//             <div className="text-white py-6 text-center text-base">
//               {query ? "No transactions found matching your search." : "No transactions found."}
//             </div>
//           )}
//         </div>
//       </div>

//       <ToastContainer
//         position="top-right"
//         autoClose={3000}
//         hideProgressBar={false}
//         newestOnTop={false}
//         closeOnClick
//         rtl={false}
//         pauseOnFocusLoss
//         draggable
//         pauseOnHover
//       />
//     </>
//   );
// };

// export default Wallet;


// import React, { useState, useEffect } from "react";
// import { FaShareAlt } from "react-icons/fa";
// import { TextField, InputAdornment, Select, MenuItem } from "@mui/material";
// import { Search } from "lucide-react";
// import assets from "../../../../assets/assets";
// import { useNavigate } from "react-router-dom";
// import { toast, ToastContainer } from "react-toastify";
// import {
//   useAvailableBalanceQuery,
//   useWalletTransactionsListQuery,
// } from "./walletApiSlice"
// import Loader from "../../../Loader/loader";

// const ITEMS_PER_PAGE = 10;

// const Wallet = () => {
//   const navigate = useNavigate();
//   const [query, setQuery] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [perPage, setPerPage] = useState(10);
//   const [loading, setLoading] = useState(false);

//   // Get user data from localStorage
//   const userData = localStorage.getItem("userData") && JSON.parse(localStorage.getItem("userData"));
//   const countryCode = userData?.data?.countryCode;

//   // API query parameters
//   const queryParams = `limit=${perPage}&page=${currentPage}&search=${query}`;

//   // API hooks
//   const {
//     data: walletTransactionsList,
//     isLoading,
//     refetch: refetchWalletTransactions,
//   } = useWalletTransactionsListQuery(queryParams);

//   const { data: availableBalance, refetch: refetchAvailableBalance } =
//     useAvailableBalanceQuery();

//   // State for wallet balance
//   const [availableWalletBalance, setAvailableWalletBalance] = useState(0);

//   // Get transaction data from API
//   const transactionData = walletTransactionsList?.data?.transactions || [];
//   const totalPages = walletTransactionsList
//     ? Math.ceil(walletTransactionsList?.data?.total / perPage)
//     : 1;

//   // Search with debounce
//   let searchTimeout;
//   const handleSearch = (e) => {
//     clearTimeout(searchTimeout);
//     searchTimeout = setTimeout(() => {
//       setQuery(e.target.value);
//       setCurrentPage(1);
//     }, 1000);
//   };

//   // Pagination handlers
//   const handlePrevPage = () => {
//     setLoading(true);
//     setCurrentPage((prev) => Math.max(prev - 1, 1));
//   };

//   const handleNextPage = () => {
//     setLoading(true);
//     setCurrentPage((prev) => Math.min(prev + 1, totalPages));
//   };

//   // Format date utility
//   const formatDateWithAmPm = (isoString) => {
//     const date = new Date(isoString);
//     const day = String(date.getUTCDate()).padStart(2, "0");
//     const month = String(date.getUTCMonth() + 1).padStart(2, "0");
//     const year = date.getUTCFullYear();
//     let hours = date.getUTCHours();
//     const minutes = String(date.getUTCMinutes()).padStart(2, "0");
//     const amAndPm = hours >= 12 ? "PM" : "AM";

//     hours = hours % 12 || 12;
//     return `${day}-${month}-${year} ${hours}:${minutes} ${amAndPm}`;
//   };

//   // Effects
//   useEffect(() => {
//     refetchWalletTransactions();
//     refetchAvailableBalance();
//   }, []);

//   useEffect(() => {
//     setAvailableWalletBalance(
//       +availableBalance?.data?.totalAvailableBalance || 0
//     );
//   }, [availableBalance]);

//   useEffect(() => {
//     setLoading(false);
//   }, [walletTransactionsList?.data?.transactions]);

//   useEffect(() => setCurrentPage(1), [query]);

//   const shapeBaseStyles = {
//     position: "absolute",
//     backgroundColor: "#111111",
//     opacity: 0.3,
//     pointerEvents: "none",
//     transition: "opacity 0.3s ease, transform 3s ease-in-out",
//     zIndex: 0,
//     animationIterationCount: "infinite",
//     animationDirection: "alternate",
//     willChange: "transform",
//   };

//   const shapeStyles = {
//     circle: {
//       width: "6rem",
//       height: "6rem",
//       borderRadius: "50%",
//       animationName: "floatUpDown",
//       animationDuration: "6s",
//     },
//     diamond: {
//       width: "5rem",
//       height: "5rem",
//       transform: "rotate(45deg)",
//       animationName: "floatLeftRight",
//       animationDuration: "5.5s",
//     },
//   };

//   const shapePositions = [
//     { top: "-1.5rem", right: "-1.5rem" },
//     { bottom: "-1.5rem", left: "-1.5rem" },
//   ];

//   return (
//     <>
//       <style>
//         {`
//           @keyframes floatUpDown {
//             0% { transform: translateY(0); }
//             100% { transform: translateY(10px); }
//           }
//           @keyframes floatLeftRight {
//             0% { transform: translateX(0); }
//             100% { transform: translateX(10px); }
//           }
//         `}
//       </style>
//      <div className="w-full bg-[#1d8e85] min-h-screen">
//   <div className="px-4 py-6 space-y-6">
//     <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//       {/* Wallet Info */}
//       <div className="relative group p-6 rounded-xl shadow-lg bg-white overflow-hidden transition duration-300 ease-in-out hover:shadow-2xl hover:scale-[1.03] col-span-1 lg:col-span-2 flex flex-col justify-between">
//         {["circle", "diamond"].map((shape, i) => (
//           <div
//             key={i}
//             style={{
//               ...shapeBaseStyles,
//               ...shapeStyles[shape],
//               ...shapePositions[i],
//             }}
//             className="group-hover:opacity-100 opacity-30"
//           />
//         ))}

//         <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center text-[#084e54] z-10 gap-4">
//           <div className="flex items-center gap-4">
//             <div className="w-16 h-16 bg-[#e0f7f6] rounded-full flex items-center justify-center border-2 border-[#4ecdc4] shadow-md">
//               <img
//                 src={assets.walletBal}
//                 alt="Wallet Icon"
//                 className="w-10 h-10 object-contain"
//               />
//             </div>
//             <div>
//               <p className="text-sm">Wallet Balance</p>
//               <p className="text-2xl font-bold">
//                 {countryCode === 91 ? "₹" : "$"}
//                 {availableWalletBalance.toFixed(2)}
//               </p>
//             </div>
//           </div>

//           <div className="w-full text-center sm:text-right">
//             <h1 className="font-bold text-sm sm:text-base mb-2 sm:mb-2">
//               Add Money to Wallet
//             </h1>
//             <button
//               className="px-5 bg-gradient-to-r from-[#094e54] to-[#4ecdc4] text-white font-semibold py-2 sm:px-2 sm:py-3 text-sm sm:text-base rounded-full hover:from-[#0a5c64] hover:to-[#5dd5cd] transition duration-300"
//               onClick={() => navigate("/add-funds")}
//             >
//               ADD FUNDS
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Referral Box */}
//       <div className="relative group bg-white p-6 rounded-xl shadow-lg text-[#084e54] overflow-hidden transition duration-300 ease-in-out hover:shadow-2xl hover:scale-[1.03]">
//         {["circle", "diamond"].map((shape, i) => (
//           <div
//             key={i}
//             style={{
//               ...shapeBaseStyles,
//               ...shapeStyles[shape],
//               ...shapePositions[i],
//             }}
//             className="group-hover:opacity-100 opacity-30"
//           />
//         ))}
//         <TextField
//           fullWidth
//           label="Referral Code"
//           value={userData?.data?.username || "JMXA4557jXXN"}
//           InputProps={{
//             readOnly: true,
//             endAdornment: (
//               <InputAdornment position="end">
//                 <FaShareAlt style={{ cursor: "pointer", color: "#084e54" }} />
//               </InputAdornment>
//             ),
//           }}
//           variant="outlined"
//           size="small"
//           sx={{
//             input: { color: "#084e54" },
//             label: { color: "#084e54" },
//             "& .MuiOutlinedInput-root": {
//               "& fieldset": { borderColor: "#4caf50" },
//               "&:hover fieldset": { borderColor: "#81c784" },
//               "&.Mui-focused fieldset": { borderColor: "#66bb6a" },
//             },
//           }}
//         />
//       </div>
//     </div>
//   </div>

//   {/* Transaction Section */}
//   <div className="px-4 pb-10">
//     {/* Heading stays with teal background */}
//     <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 mb-3">
//       <h2 className="text-lg text-white font-semibold">Total Transaction Details</h2>
//       <div className="flex items-center gap-3 w-full max-w-lg">
//         {/* Records per page selector */}
//         <Select
//           value={perPage}
//           onChange={(e) => {
//             setPerPage(e.target.value);
//             setCurrentPage(1);
//           }}
//           className="bg-white text-sm rounded-md flex-shrink-0"
//           size="small"
//           sx={{
//             color: "#084e54",
//             "& .MuiOutlinedInput-notchedOutline": {
//               borderColor: "#4caf50",
//             },
//             "&:hover .MuiOutlinedInput-notchedOutline": {
//               borderColor: "#81c784",
//             },
//             "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
//               borderColor: "#66bb6a",
//             },
//           }}
//         >
//           <MenuItem value={10}>10</MenuItem>
//           <MenuItem value={30}>30</MenuItem>
//           <MenuItem value={50}>50</MenuItem>
//         </Select>

//         {/* Search Input */}
//         <div className="flex items-center rounded-xl border border-white px-3 py-1.5 flex-grow">
//           <input
//             type="text"
//             placeholder="Search"
//             onChange={handleSearch}
//             className="bg-transparent text-white placeholder-white focus:outline-none w-full"
//             style={{ fontSize: "0.85rem", padding: "4px 8px" }}
//           />
//           <Search className="text-white" size={16} />
//         </div>
//       </div>
//     </div>

//     {/* White background container for data */}
//     <div className="bg-white rounded-lg shadow-lg p-4">
//       {isLoading ? (
//         <div className="grid gap-4">
//           {[...Array(10)].map((_, idx) => (
//             <div key={idx} className="bg-gray-50 rounded-md shadow p-4 flex flex-col gap-2">
//               <Loader />
//             </div>
//           ))}
//         </div>
//       ) : transactionData.length > 0 ? (
//         <>
//           {/* Mobile Cards */}
//           <div className="block lg:hidden space-y-4">
//             {transactionData.map((item, idx) => (
//               <div
//                 key={idx}
//                 className="bg-gray-50 rounded-lg shadow-md p-4 border border-gray-200 hover:shadow-lg transition-shadow"
//               >
//                 <div className="grid grid-cols-2 gap-3 text-sm">
//                   <div className="col-span-2 border-b border-gray-200 pb-2 mb-3">
//                     <div className="flex justify-between items-center">
//                       <span className="text-xs text-gray-500 font-medium">#{currentPage * perPage - (perPage - 1) + idx}</span>
//                       <span
//                         className="px-2 py-1 rounded-full text-xs font-semibold capitalize"
//                         style={{
//                           backgroundColor:
//                             item?.transactionStatus?.toLowerCase() === "pending"
//                               ? "#fef3cd"
//                               : item?.transactionStatus === "Completed"
//                                 ? "#d1f7d1"
//                                 : "#f8d7da",
//                           color:
//                             item?.transactionStatus?.toLowerCase() === "pending"
//                               ? "#b8860b"
//                               : item?.transactionStatus === "Completed"
//                                 ? "#155724"
//                                 : "#721c24",
//                         }}
//                       >
//                         {item?.transactionStatus || "N/A"}
//                       </span>
//                     </div>
//                   </div>

//                   <div>
//                     <span className="text-gray-600 font-medium">Txn ID:</span>
//                     <div className="mt-1">
//                       {item.screenshotUrl ? (
//                         <a
//                           href={item.screenshotUrl}
//                           target="_blank"
//                           rel="noopener noreferrer"
//                           className="text-blue-600 hover:underline text-xs break-all"
//                         >
//                           {item.transactionId || "N/A"}
//                         </a>
//                       ) : (
//                         <span className="text-xs break-all">{item.transactionId || "N/A"}</span>
//                       )}
//                     </div>
//                   </div>

//                   <div>
//                     <span className="text-gray-600 font-medium">Amount:</span>
//                     <div className="mt-1 font-bold text-green-600">
//                       {countryCode === 91
//                         ? `₹${item.transactionAmount?.toFixed(2)}`
//                         : `$${item.transactionAmount?.toFixed(2)}`}
//                     </div>
//                   </div>

//                   {countryCode !== 91 && (
//                     <div>
//                       <span className="text-gray-600 font-medium">Fee:</span>
//                       <div className="mt-1">${item.transactionFee?.toFixed(2) || 0}</div>
//                     </div>
//                   )}

//                   <div>
//                     <span className="text-gray-600 font-medium">Type:</span>
//                     <div className="mt-1">{item.transactionType || "N/A"}</div>
//                   </div>

//                   <div>
//                     <span className="text-gray-600 font-medium">Payment:</span>
//                     <div className="mt-1">{item.paymentMode || "N/A"}</div>
//                   </div>

//                   <div>
//                     <span className="text-gray-600 font-medium">Currency:</span>
//                     <div className="mt-1">{item.currency || "N/A"}</div>
//                   </div>

//                   <div>
//                     <span className="text-gray-600 font-medium">Date:</span>
//                     <div className="mt-1 text-xs">{formatDateWithAmPm(item.transactionDate)}</div>
//                   </div>

//                   <div className="col-span-2">
//                     <span className="text-gray-600 font-medium">Reason:</span>
//                     <div className="mt-1 text-xs" title={item?.reason}>{item?.reason || "N/A"}</div>
//                   </div>

//                   <div>
//                     <span className="text-gray-600 font-medium">Updated By:</span>
//                     <div className="mt-1 text-xs">{item?.updatedBy?.name || "N/A"}</div>
//                   </div>

//                   <div>
//                     <span className="text-gray-600 font-medium">Updated On:</span>
//                     <div className="mt-1 text-xs">{formatDateWithAmPm(item?.updatedOn)}</div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* Desktop Table using div elements */}
//           <div className="hidden lg:block overflow-x-auto">
//             {/* Table Header */}
//             {/* <div className="grid grid-cols-12 gap-2 bg-[#1d8e85] text-white font-semibold text-xs p-3 rounded-t-lg"> */}
//             <div className="grid grid-cols-12 gap-2 bg-[#1d8e85] text-white font-semibold text-base p-3 rounded-t-lg">

//               <div className="col-span-1">S.No</div>
//               <div className="col-span-2">Transaction ID</div>
//               <div className="col-span-1">Transaction Amount</div>
//               {/* <div className="col-span-1">Fee</div> */}
//               <div className="col-span-1">	Transaction Type</div>
//               <div className="col-span-1">Payment Method</div>
//               <div className="col-span-1">Currency</div>
//               <div className="col-span-1">Transaction Date</div>
//               <div className="col-span-1">Status</div>
//               <div className="col-span-1">Reason</div>
//               <div className="col-span-1">Updated on</div>
//             </div>

//             {/* Table Body */}
//             <div className="divide-y divide-gray-200">
//               {transactionData.map((item, idx) => (
//                 <div
//                   key={idx}
//                   className="grid grid-cols-12 gap-2 p-3 text-sm text-gray-800 hover:bg-gray-50 transition-colors"
//                 >
//                   <div className="col-span-1 font-medium">
//                     {currentPage * perPage - (perPage - 1) + idx}
//                   </div>

//                   <div className="col-span-2">
//                     {item.screenshotUrl ? (
//                       <a
//                         href={item.screenshotUrl}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         className="text-blue-600 hover:underline break-all"
//                       >
//                         {item.transactionId || "N/A"}
//                       </a>
//                     ) : (
//                       <span className="break-all">{item.transactionId || "N/A"}</span>
//                     )}
//                   </div>

//                   <div className="col-span-1 font-semibold text-green-600">
//                     {countryCode === 91
//                       ? `₹${item.transactionAmount?.toFixed(2) || 0}`
//                       : `$${item.transactionAmount?.toFixed(2) || 0}`}
//                   </div>

//                   {/* <div className="col-span-1">
//                     {countryCode !== 91 ? `$${item.transactionFee?.toFixed(2) || 0}` : "-"}
//                   </div> */}

//                   <div className="col-span-1">{item.transactionType || "N/A"}</div>
//                   <div className="col-span-1">{item.paymentMode || "N/A"}</div>
//                   <div className="col-span-1">{item.currency || "N/A"}</div>
//                   <div className="col-span-1 text-xs">{formatDateWithAmPm(item.transactionDate)}</div>

//                   <div className="col-span-1">
//                     <span
//                       className="px-2 py-1 rounded-full text-xs font-semibold capitalize"
//                       style={{
//                         backgroundColor:
//                           item?.transactionStatus?.toLowerCase() === "pending"
//                             ? "#fef3cd"
//                             : item?.transactionStatus === "Completed"
//                               ? "#d1f7d1"
//                               : "#f8d7da",
//                         color:
//                           item?.transactionStatus?.toLowerCase() === "pending"
//                             ? "#b8860b"
//                             : item?.transactionStatus === "Completed"
//                               ? "#155724"
//                               : "#721c24",
//                       }}
//                     >
//                       {item?.transactionStatus || "N/A"}
//                     </span>
//                   </div>

//                   <div className="col-span-1 text-xs" title={item?.reason}>
//                     {item?.reason || "N/A"}
//                   </div>

//                   <div className="col-span-1 text-xs">
//                     <div>{item?.updatedBy?.name || "N/A"}</div>
//                     <div className="text-gray-500 mt-1">{formatDateWithAmPm(item?.updatedOn)}</div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Pagination Controls */}
//           <div className="flex justify-center items-center gap-4 mt-6 pt-4 border-t border-gray-200">
//             <button
//               onClick={handlePrevPage}
//               disabled={currentPage === 1}
//               className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
//                 currentPage === 1
//                   ? "bg-gray-200 text-gray-400 cursor-not-allowed"
//                   : "bg-[#1d8e85] text-white hover:bg-[#167a72]"
//               }`}
//             >
//               Previous
//             </button>

//             <span className="text-gray-600 font-medium px-4">
//               Page {currentPage} of {totalPages}
//             </span>

//             <button
//               onClick={handleNextPage}
//               disabled={currentPage === totalPages}
//               className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
//                 currentPage === totalPages
//                   ? "bg-gray-200 text-gray-400 cursor-not-allowed"
//                   : "bg-[#1d8e85] text-white hover:bg-[#167a72]"
//               }`}
//             >
//               Next
//             </button>
//           </div>
//         </>
//       ) : (
//         <div className="text-gray-500 py-12 text-center text-lg">
//           <div className="mb-2">📊</div>
//           No transactions found.
//         </div>
//       )}
//     </div>
//   </div>
// </div>

// {(isLoading || loading) && <Loader />}

//     </>
//   );
// };

// export default Wallet;




// import React, { useState, useEffect } from "react";
// import { FaShareAlt, FaWallet, FaPlus } from "react-icons/fa";
// import { TextField, InputAdornment, Select, MenuItem } from "@mui/material";
// import { Search } from "lucide-react";
// import assets from "../../../../assets/assets";
// import { useNavigate } from "react-router-dom";
// import { toast, ToastContainer } from "react-toastify";
// import {
//   useAvailableBalanceQuery,
//   useWalletTransactionsListQuery,
// } from "./walletApiSlice"
// import Loader from "../../../Loader/loader";

// const ITEMS_PER_PAGE = 10;

// const Wallet = () => {
//   const navigate = useNavigate();
//   const [query, setQuery] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [perPage, setPerPage] = useState(10);
//   const [loading, setLoading] = useState(false);

//   // Get user data from localStorage
//   const userData = localStorage.getItem("userData") && JSON.parse(localStorage.getItem("userData"));
//   const countryCode = userData?.data?.countryCode;

//   // API query parameters
//   const queryParams = `limit=${perPage}&page=${currentPage}&search=${query}`;

//   // API hooks
//   const {
//     data: walletTransactionsList,
//     isLoading,
//     refetch: refetchWalletTransactions,
//   } = useWalletTransactionsListQuery(queryParams);

//   const { data: availableBalance, refetch: refetchAvailableBalance } =
//     useAvailableBalanceQuery();

//   // State for wallet balance
//   const [availableWalletBalance, setAvailableWalletBalance] = useState(0);

//   // Get transaction data from API
//   const transactionData = walletTransactionsList?.data?.transactions || [];
//   const totalPages = walletTransactionsList
//     ? Math.ceil(walletTransactionsList?.data?.total / perPage)
//     : 1;

//   // Search with debounce
//   let searchTimeout;
//   const handleSearch = (e) => {
//     clearTimeout(searchTimeout);
//     searchTimeout = setTimeout(() => {
//       setQuery(e.target.value);
//       setCurrentPage(1);
//     }, 1000);
//   };

//   // Pagination handlers
//   const handlePrevPage = () => {
//     setLoading(true);
//     setCurrentPage((prev) => Math.max(prev - 1, 1));
//   };

//   const handleNextPage = () => {
//     setLoading(true);
//     setCurrentPage((prev) => Math.min(prev + 1, totalPages));
//   };

//   // Format date utility
//   const formatDateWithAmPm = (isoString) => {
//     const date = new Date(isoString);
//     const day = String(date.getUTCDate()).padStart(2, "0");
//     const month = String(date.getUTCMonth() + 1).padStart(2, "0");
//     const year = date.getUTCFullYear();
//     let hours = date.getUTCHours();
//     const minutes = String(date.getUTCMinutes()).padStart(2, "0");
//     const amAndPm = hours >= 12 ? "PM" : "AM";

//     hours = hours % 12 || 12;
//     return `${day}-${month}-${year} ${hours}:${minutes} ${amAndPm}`;
//   };

//   // Effects
//   useEffect(() => {
//     refetchWalletTransactions();
//     refetchAvailableBalance();
//   }, []);

//   useEffect(() => {
//     setAvailableWalletBalance(
//       +availableBalance?.data?.totalAvailableBalance || 0
//     );
//   }, [availableBalance]);

//   useEffect(() => {
//     setLoading(false);
//   }, [walletTransactionsList?.data?.transactions]);

//   useEffect(() => setCurrentPage(1), [query]);

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-teal-600 to-teal-800">
//       <div className="px-4 py-6">
//         <div className="max-w-7xl mx-auto space-y-6">

//           {/* Header Cards */}
//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

//             {/* Wallet Balance Card */}
//             <div className="lg:col-span-2 bg-white rounded-lg shadow-md p-6">
//               <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//                 <div className="flex items-center gap-4">
//                   <div className="w-14 h-14 bg-teal-100 rounded-lg flex items-center justify-center">
//                     <FaWallet className="text-teal-600 text-xl" />
//                   </div>
//                   <div>
//                     <p className="text-sm text-gray-600 mb-1">Available Balance</p>
//                     <p className="text-3xl font-bold text-gray-800">
//                       {countryCode === 91 ? "₹" : "$"}
//                       {availableWalletBalance.toFixed(2)}
//                     </p>
//                   </div>
//                 </div>
//                 <div className="text-center sm:text-right">
//                   <p className="text-sm font-medium text-gray-700 mb-3">Add Money to Wallet</p>
//                   <button
//                     className="px-6 py-3 bg-teal-600 text-white font-semibold rounded-lg hover:bg-teal-700 transition-colors flex items-center gap-2 mx-auto sm:mx-0"
//                     onClick={() => navigate("/add-funds")}
//                   >
//                     <FaPlus className="text-sm" />
//                     ADD FUNDS
//                   </button>
//                 </div>
//               </div>
//             </div>

//             {/* Referral Card */}
//             <div className="bg-white rounded-lg shadow-md p-6">
//               <div className="flex items-center gap-3 mb-4">
//                 <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center">
//                   <FaShareAlt className="text-teal-600" />
//                 </div>
//                 <div>
//                   <h3 className="font-semibold text-gray-800">Referral Code</h3>
//                   <p className="text-sm text-gray-600">Share & Earn</p>
//                 </div>
//               </div>

//               <TextField
//                 fullWidth
//                 size="small"
//                 label="Your Referral Code"
//                 value={userData?.data?.username || "JMXA4557jXXN"}
//                 InputProps={{
//                   readOnly: true,
//                   endAdornment: (
//                     <InputAdornment position="end">
//                       <FaShareAlt className="text-teal-600 cursor-pointer" />
//                     </InputAdornment>
//                   ),
//                 }}
//                 variant="outlined"
//                 sx={{
//                   '& .MuiOutlinedInput-root': {
//                     '& fieldset': { borderColor: '#14b8a6' },
//                     '&:hover fieldset': { borderColor: '#0f766e' },
//                     '&.Mui-focused fieldset': { borderColor: '#0f766e' },
//                   },
//                 }}
//               />
//             </div>
//           </div>

//           {/* Transactions Section */}
//           <div className="bg-white rounded-lg shadow-md">

//             {/* Header */}
//             <div className="p-4 border-b border-gray-200">
//               <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//                 <h2 className="text-xl font-semibold text-gray-800">Transaction History</h2>

//                 <div className="flex flex-col sm:flex-row gap-3">
//                   <Select
//                     value={perPage}
//                     onChange={(e) => {
//                       setPerPage(e.target.value);
//                       setCurrentPage(1);
//                     }}
//                     size="small"
//                     className="w-full sm:w-auto"
//                     sx={{
//                       '& .MuiOutlinedInput-root': {
//                         '& fieldset': { borderColor: '#14b8a6' },
//                         '&:hover fieldset': { borderColor: '#0f766e' },
//                         '&.Mui-focused fieldset': { borderColor: '#0f766e' },
//                       },
//                     }}
//                   >
//                     <MenuItem value={10}>10 per page</MenuItem>
//                     <MenuItem value={30}>30 per page</MenuItem>
//                     <MenuItem value={50}>50 per page</MenuItem>
//                   </Select>

//                   <div className="relative">
//                     <input
//                       type="text"
//                       placeholder="Search transactions..."
//                       onChange={handleSearch}
//                       className="w-full sm:w-64 px-4 py-2 pl-10 border border-teal-300 rounded-lg focus:outline-none focus:border-teal-500"
//                     />
//                     <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-teal-500" size={16} />
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Content */}
//             <div className="p-4">
//               {isLoading ? (
//                 <div className="space-y-3">
//                   {[...Array(5)].map((_, idx) => (
//                     <div key={idx} className="h-12 bg-gray-100 rounded animate-pulse"></div>
//                   ))}
//                 </div>
//               ) : transactionData.length > 0 ? (
//                 <>
//                   {/* Mobile Cards */}
//                   {transactionData.length > 0 && (
//                     <div className="block lg:hidden space-y-3">
//                       {transactionData.map((item, idx) => (
//                         <div key={idx} className="border border-gray-200 rounded-lg p-4">
//                           <div className="flex justify-between items-start mb-3">
//                             <div className="flex items-center gap-3">
//                               <span className="w-8 h-8 bg-teal-600 text-white rounded text-sm font-bold flex items-center justify-center">
//                                 {currentPage * perPage - (perPage - 1) + idx}
//                               </span>
//                               <div>
//                                 <p className="font-medium text-gray-800">{item.transactionType || "N/A"}</p>
//                                 <p className="text-sm text-gray-600">{formatDateWithAmPm(item.transactionDate)}</p>
//                               </div>
//                             </div>
//                             <span
//                               className="px-2 py-1 rounded text-xs font-medium"
//                               style={{
//                                 backgroundColor:
//                                   item?.transactionStatus?.toLowerCase() === "pending"
//                                     ? "#fef3cd"
//                                     : item?.transactionStatus === "Completed"
//                                       ? "#d1f7d1"
//                                       : "#f8d7da",
//                                 color:
//                                   item?.transactionStatus?.toLowerCase() === "pending"
//                                     ? "#b8860b"
//                                     : item?.transactionStatus === "Completed"
//                                       ? "#155724"
//                                       : "#721c24",
//                               }}
//                             >
//                               {item?.transactionStatus || "N/A"}
//                             </span>
//                           </div>

//                           <div className="grid grid-cols-2 gap-3 text-sm">
//                             <div>
//                               <span className="text-gray-600">Amount:</span>
//                               <p className="font-semibold text-teal-600">
//                                 {countryCode === 91
//                                   ? `₹${item.transactionAmount?.toFixed(2)}`
//                                   : `${item.transactionAmount?.toFixed(2)}`}
//                               </p>
//                             </div>
//                             <div>
//                               <span className="text-gray-600">Payment:</span>
//                               <p className="font-medium">{item.paymentMode || "N/A"}</p>
//                             </div>
//                             <div className="col-span-2">
//                               <span className="text-gray-600">Transaction ID:</span>
//                               {item.screenshotUrl ? (
//                                 <a
//                                   href={item.screenshotUrl}
//                                   target="_blank"
//                                   rel="noopener noreferrer"
//                                   className="text-teal-600 hover:underline text-sm break-all"
//                                 >
//                                   {item.transactionId || "N/A"}
//                                 </a>
//                               ) : (
//                                 <p className="text-sm break-all">{item.transactionId || "N/A"}</p>
//                               )}
//                             </div>
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   )}

//                   {/* Desktop Table */}
//                   {transactionData.length > 0 || (
//                     <div className="hidden lg:block overflow-x-auto">
//                       <table className="w-full">
//                         <thead>
//                           <tr className="bg-teal-600 text-white">
//                             <th className="px-3 py-2 text-left text-sm font-medium">S.No</th>
//                             <th className="px-3 py-2 text-left text-sm font-medium">Transaction ID</th>
//                             <th className="px-3 py-2 text-left text-sm font-medium">Amount</th>
//                             <th className="px-3 py-2 text-left text-sm font-medium">Type</th>
//                             <th className="px-3 py-2 text-left text-sm font-medium">Payment</th>
//                             <th className="px-3 py-2 text-left text-sm font-medium">Date</th>
//                             <th className="px-3 py-2 text-left text-sm font-medium">Status</th>
//                             <th className="px-3 py-2 text-left text-sm font-medium">Currency</th>
//                             <th className="px-3 py-2 text-left text-sm font-medium">Updated</th>
//                           </tr>
//                         </thead>
//                         <tbody className="divide-y divide-gray-200">
//                           {transactionData.map((item, idx) => (
//                             <tr key={idx} className="hover:bg-gray-50">
//                               <td className="px-3 py-2 text-sm">
//                                 <span className="w-6 h-6 bg-teal-600 text-white rounded text-xs font-bold flex items-center justify-center">
//                                   {currentPage * perPage - (perPage - 1) + idx}
//                                 </span>
//                               </td>
//                               <td className="px-3 py-2 text-sm">
//                                 {item.screenshotUrl ? (
//                                   <a
//                                     href={item.screenshotUrl}
//                                     target="_blank"
//                                     rel="noopener noreferrer"
//                                     className="text-teal-600 hover:underline break-all"
//                                   >
//                                     {item.transactionId || "N/A"}
//                                   </a>
//                                 ) : (
//                                   <span className="break-all">{item.transactionId || "N/A"}</span>
//                                 )}
//                               </td>
//                               <td className="px-3 py-2 text-sm font-semibold text-teal-600">
//                                 {countryCode === 91
//                                   ? `₹${item.transactionAmount?.toFixed(2) || 0}`
//                                   : `${item.transactionAmount?.toFixed(2) || 0}`}
//                               </td>
//                               <td className="px-3 py-2 text-sm">{item.transactionType || "N/A"}</td>
//                               <td className="px-3 py-2 text-sm">{item.paymentMode || "N/A"}</td>
//                               <td className="px-3 py-2 text-xs">{formatDateWithAmPm(item.transactionDate)}</td>
//                               <td className="px-3 py-2 text-sm">
//                                 <span
//                                   className="px-2 py-1 rounded text-xs font-medium"
//                                   style={{
//                                     backgroundColor:
//                                       item?.transactionStatus?.toLowerCase() === "pending"
//                                         ? "#fef3cd"
//                                         : item?.transactionStatus === "Completed"
//                                           ? "#d1f7d1"
//                                           : "#f8d7da",
//                                     color:
//                                       item?.transactionStatus?.toLowerCase() === "pending"
//                                         ? "#b8860b"
//                                         : item?.transactionStatus === "Completed"
//                                           ? "#155724"
//                                           : "#721c24",
//                                   }}
//                                 >
//                                   {item?.transactionStatus || "N/A"}
//                                 </span>
//                               </td>
//                               <td className="px-3 py-2 text-sm">{item.currency || "N/A"}</td>
//                               <td className="px-3 py-2 text-xs">
//                                 <div>{item?.updatedBy?.name || "N/A"}</div>
//                                 <div className="text-gray-500">{formatDateWithAmPm(item?.updatedOn)}</div>
//                               </td>
//                             </tr>
//                           ))}
//                         </tbody>
//                       </table>
//                     </div>
//                   )}

//                   {/* Pagination */}
//                   {transactionData.length > 0 && (
//                     <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-6 pt-4 border-t border-gray-200">
//                       <div className="text-sm text-gray-600">
//                         Showing {((currentPage - 1) * perPage) + 1} to {Math.min(currentPage * perPage, walletTransactionsList?.data?.total || 0)} of {walletTransactionsList?.data?.total || 0} entries
//                       </div>

//                       <div className="flex items-center gap-2">
//                         <button
//                           onClick={handlePrevPage}
//                           disabled={currentPage === 1}
//                           className={`px-3 py-1 rounded text-sm font-medium ${
//                             currentPage === 1
//                               ? "bg-gray-200 text-gray-400 cursor-not-allowed"
//                               : "bg-teal-600 text-white hover:bg-teal-700"
//                           }`}
//                         >
//                           Previous
//                         </button>

//                         <span className="text-sm text-gray-600 px-3">
//                           Page {currentPage} of {totalPages}
//                         </span>

//                         <button
//                           onClick={handleNextPage}
//                           disabled={currentPage === totalPages}
//                           className={`px-3 py-1 rounded text-sm font-medium ${
//                             currentPage === totalPages
//                               ? "bg-gray-200 text-gray-400 cursor-not-allowed"
//                               : "bg-teal-600 text-white hover:bg-teal-700"
//                           }`}
//                         >
//                           Next
//                         </button>
//                       </div>
//                     </div>
//                   )}
//                 </>
//               ) : (
//                 <div className="text-center py-12">
//                   <p className="text-gray-500 text-lg">No transactions found.</p>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>

//       {(isLoading || loading) && <Loader />}
//     </div>
//   );
// };

// export default Wallet;


import React, { useState, useEffect } from 'react';
import { Search, Share2, Copy, ShoppingBag, ChevronLeft, ChevronRight, Wallet } from 'lucide-react'; // Added Wallet icon
import {
  useAvailableBalanceQuery,
  useWalletTransactionsListQuery,
} from "./walletApiSlice";
import { useNavigate } from "react-router-dom";
const ITEMS_PER_PAGE = 10;

export default function WalletDashboard() {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [walletBalance, setWalletBalance] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Mock transaction data - replace with actual API data
  const [transactionData] = useState([
    {
      id: 1,
      transactionId: 'TXN001234567890',
      transactionAmount: 150.00,
      transactionType: 'Credit',
      paymentMethod: 'UPI',
      currency: 'INR',
      transactionDate: '2025-06-25T10:30:00Z',
      status: 'Completed',
      reason: 'Wallet Recharge',
      updatedBy: 'System',
      updatedOn: '2025-06-25T10:30:00Z'
    },
    {
      id: 2,
      transactionId: 'TXN001234567891',
      transactionAmount: 75.50,
      transactionType: 'Debit',
      paymentMethod: 'Wallet',
      currency: 'INR',
      transactionDate: '2025-06-24T15:45:00Z',
      status: 'Completed',
      reason: 'Purchase',
      updatedBy: 'System',
      updatedOn: '2025-06-24T15:45:00Z'
    },
    {
      id: 3,
      transactionId: 'TXN001234567892',
      transactionAmount: 200.00,
      transactionType: 'Credit',
      paymentMethod: 'Bank Transfer',
      currency: 'INR',
      transactionDate: '2025-06-23T09:15:00Z',
      status: 'Pending',
      reason: 'Refund',
      updatedBy: 'Admin',
      updatedOn: '2025-06-23T09:15:00Z'
    }
  ]);

  const filteredTransactions = transactionData.filter(
    (item) =>
      item.transactionId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.transactionType?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.status?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.updatedBy?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate pagination
  const totalPages = Math.ceil(filteredTransactions.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedTransactions = filteredTransactions.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  // Reset to page 1 when search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  // Format date function
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN') + " " + date.toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Format currency
  const formatCurrency = (amount) => {
    return `₹${parseFloat(amount).toFixed(2)}`;
  };

  // Handle copy referral code
  const handleCopyReferral = async () => {
    try {
      await navigator.clipboard.writeText('JAIMAX156VODZ');
      // In a real app, you'd show a toast notification here
      console.log('Referral code copied to clipboard!');
    } catch (error) {
      console.error('Failed to copy referral code:', error);
    }
  };

  // Handle share referral code (basic example, actual sharing would use Web Share API or similar)
  const handleShareReferral = async () => {
    const referralCode = 'JAIMAX15BVODZ';
    const shareText = `Use my referral code to get amazing benefits: ${referralCode}`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Referral Code',
          text: shareText,
          url: window.location.href, // Or a specific referral link
        });
        console.log('Referral code shared successfully!');
      } catch (error) {
        console.error('Failed to share referral code:', error);
      }
    } else {
      alert('Web Share API is not supported in your browser. You can copy the code instead.');
    }
  };


  // Pagination handlers
  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  // Status badge component
  const StatusBadge = ({ status }) => {
    const getStatusClass = (status) => {
      switch (status?.toLowerCase()) {
        case 'completed':
          return 'bg-green-100 text-green-800';
        case 'pending':
          return 'bg-yellow-100 text-yellow-800';
        case 'failed':
          return 'bg-red-100 text-red-800';
        default:
          return 'bg-gray-100 text-gray-800';
      }
    };

    return (
      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusClass(status)}`}>
        {status || 'N/A'}
      </span>
    );
  };

  // Mobile transaction card component
  const TransactionCard = ({ transaction, index }) => (
    <div className="bg-white rounded-lg shadow-md p-4 border border-teal-100 hover:shadow-lg transition-shadow duration-200">
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1">
          <h3 className="font-semibold text-teal-800 text-sm mb-1">
            Transaction #{startIndex + index + 1}
          </h3>
          <p className="text-xs text-gray-600 font-mono">
            {transaction.transactionId}
          </p>
        </div>
        <StatusBadge status={transaction.status} />
      </div>

      <div className="grid grid-cols-2 gap-3 text-sm">
        <div>
          <span className="text-gray-600">Amount:</span>
          <p className="font-semibold text-teal-700">
            {formatCurrency(transaction.transactionAmount)}
          </p>
        </div>
        <div>
          <span className="text-gray-600">Type:</span>
          <p className="font-medium">{transaction.transactionType}</p>
        </div>
        <div>
          <span className="text-gray-600">Payment:</span>
          <p className="font-medium">{transaction.paymentMethod}</p>
        </div>
        <div>
          <span className="text-gray-600">Currency:</span>
          <p className="font-medium">{transaction.currency}</p>
        </div>
      </div>

      <div className="mt-3 pt-3 border-t border-gray-100">
        <div className="text-xs text-gray-600">
          <p><strong>Date:</strong> {formatDate(transaction.transactionDate)}</p>
          <p><strong>Reason:</strong> {transaction.reason}</p>
          <p><strong>Updated by:</strong> {transaction.updatedBy}</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-teal-50 p-4">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* Top Section - Wallet Balance and Referral */}
        <div className="flex flex-col lg:flex-row gap-4">

          {/* Wallet Balance Card */}
          <div className="flex-1 bg-gradient-to-r from-teal-600 to-teal-700 rounded-2xl p-3 text-white shadow-xl border border-teal-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="bg-white/20 rounded-full p-3">
                  <Wallet className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-teal-100 text-sm font-medium">Wallet Balance</p>
                  {isLoading ? (
                    <div className="animate-pulse h-8 bg-white/20 rounded w-24 mt-1"></div>
                  ) : (
                    <p className="text-3xl font-bold">{formatCurrency(walletBalance)}</p>
                  )}
                </div>
              </div>
              <div className="text-right">
                <p className="text-teal-100 text-sm mb-2">Add Money to Wallet</p>
                <button className="bg-white hover:bg-gray-50 text-teal-700 px-6 py-2 rounded-full font-semibold transition-colors duration-200 shadow-md"
                  onClick={() => navigate("/add-funds")}>
                  ADD FUNDS
                </button>
              </div>
            </div>
          </div>

          {/* Referral Code Card */}
          <div className="lg:w-80 bg-white rounded-2xl p-3 shadow-xl">
            <div className="text-center space-y-2">
              <p className="text-teal-600 text-sm font-medium">Referral Code</p>
              <div className="flex items-center justify-center space-x-2">
                <span className="text-sm font-bold tracking-wider text-teal-800">JAIMAX15BVODZ</span>
                <button onClick={handleShareReferral} className="text-teal-600 hover:text-teal-800 transition-colors duration-200 p-1 rounded-full hover:bg-teal-100">
                  <Share2 className="w-5 h-5" />
                </button>
                 <button
                onClick={handleCopyReferral}
                className="bg-teal-600 hover:bg-teal-700 text-white text-xs px-4 py-2 rounded-full transition-colors duration-200 flex items-center space-x-2 mx-auto shadow-md"
              >
                <Copy className="w-4 h-4" />
                <span>Copy</span>
              </button>
              </div>
             
            </div>
          </div>
        </div>

        {/* Transaction Details Section */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-teal-100">
          <div className="p-6 border-b border-teal-100 bg-teal-50">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
              <h2 className="text-2xl font-bold text-teal-800">Wallet Transactions</h2>

              {/* Search Bar */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-teal-400" />
                <input
                  type="text"
                  placeholder="Search transactions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-white text-teal-800 placeholder-teal-400 pl-10 pr-4 py-2 rounded-full border-2 border-teal-200 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 w-full sm:w-64"
                />
              </div>
            </div>
          </div>

          {/* Mobile Card View */}
          <div className="block md:hidden p-4">
            {paginatedTransactions.length > 0 ? (
              <div className="space-y-4">
                {paginatedTransactions.map((transaction, index) => (
                  <TransactionCard
                    key={transaction.id}
                    transaction={transaction}
                    index={index}
                  />
                ))}
              </div>
            ) : (
              <div className="py-12 text-center text-teal-500">
                <ShoppingBag className="w-12 h-12 text-teal-400 mx-auto mb-4" />
                <p className="text-lg font-medium text-teal-700">
                  {searchTerm ? "No transactions found matching your search" : "No transactions found"}
                </p>
                <p className="text-sm text-teal-500">
                  {searchTerm ? "Try adjusting your search terms" : "Your transaction history will appear here"}
                </p>
              </div>
            )}
          </div>
          <div className="hidden md:block overflow-x-auto">
            {paginatedTransactions.length > 0 ? (
              <table className="min-w-full divide-y divide-teal-100">
                <thead className="bg-teal-600 text-xs font-semibold text-white">
                  <tr>
                    <th scope="col" className="px-3 py-3    text-white uppercase">S.No</th>
                    <th scope="col" className="px-3 py-3   text-white uppercase ">Transaction ID</th>
                    <th scope="col" className="px-3 py-3   text-white uppercase ">Amount</th>
                    <th scope="col" className="px-3 py-3    text-white uppercase ">Type</th>
                    <th scope="col" className="px-3 py-3    text-white uppercase ">Method</th>
                    <th scope="col" className="px-3 py-3    text-white uppercase">Currency</th>
                    <th scope="col" className="px-3 py-3    text-white uppercase ">Date</th>
                    <th scope="col" className="px-3 py-3   text-white uppercase ">Status</th>
                    <th scope="col" className="px-3 py-3   text-white uppercase ">Reason</th>
                    <th scope="col" className="px-3 py-3    text-white uppercase ">Updated By</th>
                    <th scope="col" className="px-3 py-3    text-white uppercase ">Updated On</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-teal-100">
                  {paginatedTransactions.map((transaction, index) => (
                    <tr key={transaction.id} className="hover:bg-teal-50 transition-colors duration-150 text-xs">
                      <td className="px-3 py-3 whitespace-nowrap  text-gray-900">
                        {startIndex + index + 1}
                      </td>
                      <td className="px-3 py-3 whitespace-nowrap  font-mono text-gray-900">
                        {transaction.transactionId}
                      </td>
                      <td className="px-3 py-3 whitespace-nowrap  font-semibold text-teal-700">
                        {formatCurrency(transaction.transactionAmount)}
                      </td>
                      <td className="px-3 py-3 whitespace-nowrap  text-gray-900">
                        {transaction.transactionType}
                      </td>
                      <td className="px-3 py-3 whitespace-nowrap  text-gray-900">
                        {transaction.paymentMethod}
                      </td>
                      <td className="px-3 py-3 whitespace-nowrap  text-gray-900">
                        {transaction.currency}
                      </td>
                      <td className="px-3 py-3 whitespace-nowrap  text-gray-900">
                        {formatDate(transaction.transactionDate)}
                      </td>
                      <td className="px-3 py-3 whitespace-nowrap">
                        <StatusBadge status={transaction.status} />
                      </td>
                      <td className="px-3 py-3 whitespace-nowrap  text-gray-900">
                        {transaction.reason}
                      </td>
                      <td className="px-3 py-3 whitespace-nowrap  text-gray-900">
                        {transaction.updatedBy}
                      </td>
                      <td className="px-3 py-3 whitespace-nowrap  text-gray-900">
                        {formatDate(transaction.updatedOn)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="px-6 py-12 text-center text-teal-500">
                <div className="flex flex-col items-center space-y-2">
                  <ShoppingBag className="w-12 h-12 text-teal-400" />
                  <p className="text-lg font-medium text-teal-700">
                    {searchTerm ? "No transactions found matching your search" : "No transactions found"}
                  </p>
                  <p className="text-sm text-teal-500">
                    {searchTerm ? "Try adjusting your search terms" : "Your transaction history will appear here"}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="px-6 py-4 bg-gray-50 border-t border-teal-100">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-700">
                  Showing {startIndex + 1} to {Math.min(startIndex + ITEMS_PER_PAGE, filteredTransactions.length)} of{' '}
                  {filteredTransactions.length} transactions
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={handlePrevPage}
                    disabled={currentPage === 1}
                    className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${currentPage === 1
                        ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                        : 'bg-teal-600 text-white hover:bg-teal-700'
                      }`}
                  >
                    <ChevronLeft className="w-4 h-4 mr-1" />
                    Previous
                  </button>

                  <span className="text-sm text-gray-700 px-2">
                    Page {currentPage} of {totalPages}
                  </span>

                  <button
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                    className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${currentPage === totalPages
                        ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                        : 'bg-teal-600 text-white hover:bg-teal-700'
                      }`}
                  >
                    Next
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}