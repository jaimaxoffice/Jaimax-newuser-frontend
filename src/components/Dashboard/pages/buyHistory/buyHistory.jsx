// import React, { useState, useEffect } from "react";
// import { ChevronDown, Search, Calendar, CreditCard, DollarSign, Hash, TrendingUp, Globe } from "lucide-react";
// import { useNavigate } from "react-router-dom";
//  import { useBuyDetailsQuery } from "./buyHistoryApiSlice";
//  import { toast } from "react-toastify";
// import Pagination from "../../../pagination/pagination";
// // Mock API hook - replace with your actual API integration
// const BuyHistory = () => {
//   const [isTokenVerified, setIsTokenVerified] = useState(false);
//   const [selectedStatus, setSelectedStatus] = useState("Completed");
//   const navigate = useNavigate();

//   // Pagination state
//   const [state, setState] = useState({
//     currentPage: 1,
//     perPage: "10",
//     search: "",
//   });
//   const [loading, setLoading] = useState(false);

//   // Update query parameters
//   const queryParams = `limit=${state?.perPage || ""}&page=${
//     state?.currentPage || ""
//     }&search=${state?.search || ""}&status=${selectedStatus}`;

//   const {
//     data: buyDetails,
//     isLoading,
//     error,
//     refetch,
//   } = useBuyDetailsQuery(queryParams);

//   console.log(buyDetails);    // ✅ shows the fetched data

  
//   const TableData = buyDetails?.data?.withdrawRequests || [];

//   // Handle PerChange
//   const handlePageChange = (e) => {
//     setLoading(true);
//     setState({ ...state, currentPage: e });
//   };

//   const handleStatusChange = (e) => {
//     setSelectedStatus(e.target.value);
//     setState({ ...state, currentPage: 1 });
//   };

//   // Function for handling search with delay
//   let searchTimeout;
//   const handleSearch = (e) => {
//     clearTimeout(searchTimeout);
//     searchTimeout = setTimeout(() => {
//       setState({ ...state, search: e.target.value, currentPage: 1 });
//     }, 1000);
//   };

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     console.log(token)
//     // const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4NDZjM2FkOWRkZWU1ZTM0OWZiZTk3YSIsImV4cCI6MTc1MDIzMTg0OCwiaWF0IjoxNzUwMjMxMjQ4fQ.LV0PtQ1pVAsuMj_om7Y_HNzUWH_UOiLK6VR0SoIj1PQ" 
//     const verifyToken = async () => {
//       if (!token) {
//         navigate("/login");
//         return;
//       }
//       setIsTokenVerified(true);
//     };

//     verifyToken();
//   }, [navigate]);

//   useEffect(() => {
//     if (isTokenVerified) {
//       const debounce = setTimeout(() => {
//         if (error?.data?.status_code === 400) {
//           localStorage.clear();
//           navigate("/login");
//           toast.error(error?.data?.message, {
//             position: "top-center",
//           });
//         }
//       }, 2000);

//       return () => clearTimeout(debounce);
//     }
//   }, [isTokenVerified, error, navigate]);

//   useEffect(() => {
//     refetch();
//     return () => {
//       clearTimeout(searchTimeout);
//     };
//   }, []); 

//   useEffect(() => {
//   refetch();                    // call API again
// }, [state.currentPage, state.search, selectedStatus, refetch]);


//   /**
//    * This method is used to convert the iso string to date & time format
//    * @param {*} isoString
//    */
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

//   useEffect(() => {
//     setLoading(false);
//   }, [buyDetails?.data?.withdrawRequests]);

//   return (
//    <div className="min-h-screen bg-[#1d8e85]">
//   <div className="container mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6">
//     {/* Header */}
//     <div className="mb-4 sm:mb-6">
//       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 mb-4 sm:mb-6">
//         <h1 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl text-white font-bold text-center sm:text-left">
//           Buy History Details
//         </h1>

//         {/* Search Bar */}
//         <div className="relative max-w-full sm:max-w-md w-full sm:w-auto">
//           <div className="relative">
//             <input
//               type="text"
//               className="w-full pl-8 sm:pl-10 pr-3 sm:pr-4 py-2 sm:py-2.5 text-sm sm:text-base bg-gray-50 border border-gray-200 rounded-lg text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:border-transparent"
//               style={{ focusRingColor: '#1d8e85' }}
//               placeholder="Search transactions..."
//               onChange={handleSearch}
//             />
//             <Search className="absolute left-2.5 sm:left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-3.5 h-3.5 sm:w-4 sm:h-4" />
//           </div>
//         </div>
//       </div>
//     </div>

//     {/* Mobile Cards View */}
//     <div className="sm:hidden space-y-3">
//       {(isLoading || loading) ? (
//         // Loading skeleton for mobile
//         [...Array(10)].map((_, i) => (
//           <div key={i} className="bg-gray-50 rounded-xl p-3 animate-pulse border border-gray-200">
//             <div className="flex justify-between items-start mb-3">
//               <div className="h-3 bg-gray-200 rounded w-16"></div>
//               <div className="h-5 bg-gray-200 rounded w-16"></div>
//             </div>
//             <div className="space-y-2">
//               <div className="h-2.5 bg-gray-200 rounded w-full"></div>
//               <div className="h-2.5 bg-gray-200 rounded w-3/4"></div>
//               <div className="h-2.5 bg-gray-200 rounded w-1/2"></div>
//             </div>
//           </div>
//         ))
//       ) : TableData.length === 0 ? (
//         <div className="bg-gray-50 rounded-xl p-6 text-center border border-gray-200">
//           <p className="text-sm text-gray-500">No Data found</p>
//         </div>
//       ) : (
//         TableData.map((data, i) => (
//           <div key={i} className="bg-white rounded-xl p-3 border border-gray-200 hover:shadow-md transition-all duration-200" style={{ borderColor: '#1d8e85' }}>
//             {/* Header with S.No and Status */}
//             <div className="flex justify-between items-center mb-3">
//               <div className="flex items-center gap-1.5">
//                 <Hash className="w-3.5 h-3.5" style={{ color: '#1d8e85' }} />
//                 <span className="text-xs font-medium text-gray-600">
//                   #{state?.currentPage * state?.perPage - (state?.perPage - 1) + i}
//                 </span>
//               </div>
//               <span className="px-2 py-0.5 rounded-full text-xs font-semibold">
//                 {data?.status}
//               </span>
//             </div>

//             {/* Transaction ID */}
//             <div className="mb-3">
//               <div className="flex items-center gap-1.5 mb-1">
//                 <CreditCard className="w-3.5 h-3.5" style={{ color: '#1d8e85' }} />
//                 <span className="text-xs text-gray-500 uppercase tracking-wide">Transaction ID</span>
//               </div>
//               <p className="text-gray-800 font-mono text-xs break-all leading-relaxed max-w-xs sm:max-w-sm">
//                 {data?.paypalTransactionId
//                   ? data?.paypalTransactionId
//                   : data?.transactionId || "N/A"}
//               </p>
//             </div>

//             {/* Payment Details */}
//             <div className="grid grid-cols-2 gap-3 mb-3">
//               <div>
//                 <div className="flex items-center gap-1.5 mb-1">
//                   <span className="text-xs text-gray-500 uppercase tracking-wide">Payment Mode</span>
//                 </div>
//                 <p className="text-gray-800 text-xs capitalize break-words">{data?.modeOfPayment || "N/A"}</p>
//               </div>
//               <div>
//                 <div className="flex items-center gap-1.5 mb-1">
//                   <TrendingUp className="w-3.5 h-3.5" style={{ color: '#1d8e85' }} />
//                   <span className="text-xs text-gray-500 uppercase tracking-wide">JaiMax Coin</span>
//                 </div>
//                 <p className="text-gray-800 text-xs font-semibold">{data?.jaimax?.toFixed(3) || "N/A"}</p>
//               </div>
//             </div>

//             {/* Price Information */}
//             <div className="grid grid-cols-2 gap-3 mb-3">
//               <div>
//                 <span className="text-xs text-gray-500 uppercase tracking-wide">INR Price</span>
//                 <p className="text-gray-800 text-xs">{data?.atPriceInr}</p>
//               </div>
//               <div>
//                 <span className="text-xs text-gray-500 uppercase tracking-wide">USD Price</span>
//                 <p className="text-gray-800 text-xs">{data?.atPriceUsdt}</p>
//               </div>
//             </div>

//             {/* Round and Currency */}
//             <div className="grid grid-cols-2 gap-3 mb-3">
//               <div>
//                 <span className="text-xs text-gray-500 uppercase tracking-wide">Round</span>
//                 <p className="text-gray-800 text-xs">{data?.round}</p>
//               </div>
//               <div>
//                 <div className="flex items-center gap-1.5 mb-1">
//                   <Globe className="w-3.5 h-3.5" style={{ color: '#1d8e85' }} />
//                   <span className="text-xs text-gray-500 uppercase tracking-wide">Currency</span>
//                 </div>
//                 <p className="text-gray-800 text-xs font-semibold">{data?.currency}</p>
//               </div>
//             </div>

//             {/* Amount and Date */}
//             <div className="grid grid-cols-2 gap-3">
//               <div>
//                 <span className="text-xs text-gray-500 uppercase tracking-wide">Amount</span>
//                 <p className="text-gray-800 text-sm font-bold">
//                   {data.currency === "INR"
//                     ? `₹${data.amount.toFixed(2)}`
//                     : `$${data.amount.toFixed(2)}`}
//                 </p>
//               </div>
//               <div>
//                 <div className="flex items-center gap-1.5 mb-1">
//                   <Calendar className="w-3.5 h-3.5" style={{ color: '#1d8e85' }} />
//                   <span className="text-xs text-gray-500 uppercase tracking-wide">Purchase Date</span>
//                 </div>
//                 <p className="text-gray-800 text-xs leading-relaxed">{formatDateWithAmPm(data?.createdAt)}</p>
//               </div>
//             </div>
//           </div>
//         ))
//       )}
//     </div>

//     {/* Tablet Cards View */}
//     <div className="hidden sm:block lg:hidden space-y-4">
//       {(isLoading || loading) ? (
//         // Loading skeleton for tablet
//         [...Array(8)].map((_, i) => (
//           <div key={i} className="bg-gray-50 rounded-xl p-4 animate-pulse border border-gray-200">
//             <div className="flex justify-between items-start mb-4">
//               <div className="h-4 bg-gray-200 rounded w-20"></div>
//               <div className="h-6 bg-gray-200 rounded w-20"></div>
//             </div>
//             <div className="grid grid-cols-2 gap-4">
//               <div className="space-y-2">
//                 <div className="h-3 bg-gray-200 rounded w-full"></div>
//                 <div className="h-3 bg-gray-200 rounded w-3/4"></div>
//               </div>
//               <div className="space-y-2">
//                 <div className="h-3 bg-gray-200 rounded w-full"></div>
//                 <div className="h-3 bg-gray-200 rounded w-2/3"></div>
//               </div>
//             </div>
//           </div>
//         ))
//       ) : TableData.length === 0 ? (
//         <div className="bg-gray-50 rounded-xl p-8 text-center border border-gray-200">
//           <p className="text-gray-500">No Data found</p>
//         </div>
//       ) : (
//         TableData.map((data, i) => (
//           <div key={i} className="bg-white rounded-xl p-4 border border-gray-200 hover:shadow-md transition-all duration-200" style={{ borderColor: '#1d8e85' }}>
//             {/* Header with S.No and Status */}
//             <div className="flex justify-between items-center mb-4">
//               <div className="flex items-center gap-2">
//                 <Hash className="w-4 h-4" style={{ color: '#1d8e85' }} />
//                 <span className="text-sm font-medium text-gray-600">
//                   #{state?.currentPage * state?.perPage - (state?.perPage - 1) + i}
//                 </span>
//               </div>
//               <span className="px-3 py-1 rounded-full text-sm font-semibold">
//                 {data?.status}
//               </span>
//             </div>

//             {/* Content Grid */}
//             <div className="grid grid-cols-2 gap-4">
//               {/* Left Column */}
//               <div className="space-y-3">
//                 {/* Transaction ID */}
//                 <div>
//                   <div className="flex items-center gap-2 mb-1">
//                     <CreditCard className="w-4 h-4" style={{ color: '#1d8e85' }} />
//                     <span className="text-xs text-gray-500 uppercase tracking-wide">Transaction ID</span>
//                   </div>
//                   <p className="text-gray-800 font-mono text-sm break-all">
//                     {data?.paypalTransactionId
//                       ? data?.paypalTransactionId
//                       : data?.transactionId || ""}
//                   </p>
//                 </div>

//                 {/* Payment Mode */}
//                 <div>
//                   <span className="text-xs text-gray-500 uppercase tracking-wide">Payment Mode</span>
//                   <p className="text-gray-800 text-sm capitalize">{data?.modeOfPayment || "N/A"}</p>
//                 </div>

//                 {/* JaiMax Coin */}
//                 <div>
//                   <div className="flex items-center gap-2 mb-1">
//                     <TrendingUp className="w-4 h-4" style={{ color: '#1d8e85' }} />
//                     <span className="text-xs text-gray-500 uppercase tracking-wide">JaiMax Coin</span>
//                   </div>
//                   <p className="text-gray-800 text-sm font-semibold">{data?.jaimax?.toFixed(3) || "N/A"}</p>
//                 </div>

//                 {/* Prices */}
//                 <div className="grid grid-cols-2 gap-2">
//                   <div>
//                     <span className="text-xs text-gray-500 uppercase tracking-wide">INR Price</span>
//                     <p className="text-gray-800 text-sm">{data?.atPriceInr}</p>
//                   </div>
//                   <div>
//                     <span className="text-xs text-gray-500 uppercase tracking-wide">USD Price</span>
//                     <p className="text-gray-800 text-sm">{data?.atPriceUsdt}</p>
//                   </div>
//                 </div>
//               </div>

//               {/* Right Column */}
//               <div className="space-y-3">
//                 {/* Round */}
//                 <div>
//                   <span className="text-xs text-gray-500 uppercase tracking-wide">Round</span>
//                   <p className="text-gray-800 text-sm">{data?.round}</p>
//                 </div>

//                 {/* Currency */}
//                 <div>
//                   <div className="flex items-center gap-2 mb-1">
//                     <Globe className="w-4 h-4" style={{ color: '#1d8e85' }} />
//                     <span className="text-xs text-gray-500 uppercase tracking-wide">Currency</span>
//                   </div>
//                   <p className="text-gray-800 text-sm font-semibold">{data?.currency}</p>
//                 </div>

//                 {/* Amount */}
//                 <div>
//                   <span className="text-xs text-gray-500 uppercase tracking-wide">Amount</span>
//                   <p className="text-gray-800 text-lg font-bold">
//                     {data.currency === "INR"
//                       ? `₹${data.amount.toFixed(2)}`
//                       : `$${data.amount.toFixed(2)}`}
//                   </p>
//                 </div>

//                 {/* Purchase Date */}
//                 <div>
//                   <div className="flex items-center gap-2 mb-1">
//                     <Calendar className="w-4 h-4" style={{ color: '#1d8e85' }} />
//                     <span className="text-xs text-gray-500 uppercase tracking-wide">Purchase Date</span>
//                   </div>
//                   <p className="text-gray-800 text-sm">{formatDateWithAmPm(data?.createdAt)}</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         ))
//       )}
//     </div>

//     {/* Desktop Table View */}
//     <div className="hidden lg:block">
//       <div className="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm">
//         <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
//           <table className="w-full table-auto">
//             <thead style={{ backgroundColor: '#1d8e85' }}>
//               <tr className="text-white">
//                 <th className="px-2 py-1 xl:py-4 text-left text-sm xl:text-base font-medium min-w-max">S.No</th>
//                 <th className="px-4  py-1 xl:py-4 text-left text-sm xl:text-base font-medium min-w-max">Transaction ID</th>
//                 <th className="px-4  py-1 xl:py-4 text-left text-sm xl:text-base font-medium min-w-max">Payment Mode</th>
//                 <th className="px-4 py-1 xl:py-4 text-left text-sm xl:text-base font-medium min-w-max">JaiMax Coin</th>
//                 <th className="px-4  py-1 xl:py-4 text-left text-sm xl:text-base font-medium min-w-max">INR Price</th>
//                 <th className="px-4  py-1 xl:py-4 text-left text-sm xl:text-base font-medium min-w-max">USD Price</th>
//                 <th className="px-4  py-1 xl:py-4 text-left text-sm xl:text-base font-medium min-w-max">Round</th>
//                 <th className="px-4  py-1 xl:py-4 text-left text-sm xl:text-base font-medium min-w-max">Currency</th>
//                 <th className="px-4  py-1 xl:py-4 text-left text-sm xl:text-base font-medium min-w-max">Amount</th>
//                 <th className="px-4  py-1 xl:py-4 text-left text-sm xl:text-base font-medium min-w-max">Purchase Date</th>
//                 <th className="px-4  py-1 xl:py-4 text-left text-sm xl:text-base font-medium min-w-max">Status</th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-gray-200">
//               {(isLoading || loading) ? (
//                 [...Array(5)].map((_, i) => (
//                   <tr key={i}>
//                     {[...Array(11)].map((_, j) => (
//                       <td key={j} className="px-4 xl:px-6 py-3 xl:py-4">
//                         <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
//                       </td>
//                     ))}
//                   </tr>
//                 ))
//               ) : TableData.length === 0 ? (
//                 <tr>
//                   <td colSpan="11" className="px-4 xl:px-6 py-6 xl:py-8 text-center text-gray-500 text-sm xl:text-base">
//                     No data found
//                   </td>
//                 </tr>
//               ) : (
//                 TableData.map((data, i) => (
//                   <tr key={i} className="text-gray-800 hover:bg-gray-50 transition-colors">
//                     <td className="px-4 xl:px-6 py-3 xl:py-4 text-sm xl:text-base min-w-max">
//                       {state?.currentPage * state?.perPage - (state?.perPage - 1) + i}
//                     </td>
//                     <td className="px-4 xl:px-6 py-3 xl:py-4 font-mono text-xs xl:text-sm min-w-max">
//                       <div className="break-all whitespace-normal leading-relaxed">
//                         {data?.paypalTransactionId || data?.transactionId || "N/A"}
//                       </div>
//                     </td>
//                     <td className="px-4 xl:px-6 py-3 xl:py-4 capitalize text-sm xl:text-base min-w-max whitespace-nowrap">{data?.modeOfPayment || "N/A"}</td>
//                     <td className="px-4 xl:px-6 py-3 xl:py-4 font-semibold text-sm xl:text-base min-w-max">{data?.jaimax?.toFixed(3) || "N/A"}</td>
//                     <td className="px-4 xl:px-6 py-3 xl:py-4 text-sm xl:text-base min-w-max whitespace-nowrap">{data?.atPriceInr}</td>
//                     <td className="px-4 xl:px-6 py-3 xl:py-4 text-sm xl:text-base min-w-max whitespace-nowrap">{data?.atPriceUsdt}</td>
//                     <td className="px-4 xl:px-6 py-3 xl:py-4 text-sm xl:text-base min-w-max whitespace-nowrap">{data?.round}</td>
//                     <td className="px-4 xl:px-6 py-3 xl:py-4 font-semibold text-sm xl:text-base min-w-max whitespace-nowrap">{data?.currency}</td>
//                     <td className="px-4 xl:px-6 py-3 xl:py-4 font-bold text-sm xl:text-base min-w-max whitespace-nowrap">
//                       {data.currency === "INR"
//                         ? `₹${data.amount.toFixed(2)}`
//                         : `${data.amount.toFixed(2)}`}
//                     </td>
//                     <td className="px-4 xl:px-6 py-3 xl:py-4 text-xs xl:text-sm min-w-max">
//                       <div className="whitespace-normal break-words leading-relaxed">
//                         {formatDateWithAmPm(data?.createdAt)}
//                       </div>
//                     </td>
//                     <td className="px-4 xl:px-6 py-3 xl:py-4 min-w-max">
//                       <span className="px-2 xl:px-3 py-1 rounded-full text-xs xl:text-sm font-semibold whitespace-nowrap">
//                         {data?.status}
//                       </span>
//                     </td>
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
              
//     {buyDetails?.data?.pagination?.totalPages > 1 && (
//       <div className="flex justify-center mt-4 sm:mt-6">
//         <Pagination
//           currentPage={state.currentPage}
//           totalPages={buyDetails?.data?.pagination?.totalPages || 1}
//           onPageChange={(page) =>
//             setState((prev) => ({ ...prev, currentPage: page }))
//           }
//         />
//       </div>
//     )}
//   </div>
// </div>
//   );
// };

// export default BuyHistory;


import React from 'react'

export default function buyHistory() {
  return (
    <div>buyHistory</div>
  )
}
