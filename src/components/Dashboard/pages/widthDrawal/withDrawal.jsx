// import React, { useState, useEffect } from "react";
// import {
//   AlertTriangle,
//   CheckCircle,
//   Info,
//   Download,
//   Building,
//   CreditCard,
//   Clock,
//   Shield,
//   ArrowRight,
//   Smartphone,
//   Search,
// } from "lucide-react";
// import Pagination from "../../../pagination/pagination";
// import {
//   useWithdrawHistoryQuery,
//   useWithdrawRequestListQuery,
//   useWithdrawRequestMutation,
//   useWithdrawCalculateQuery,
//   useCalculateWithdrawMutation,
//   useGetSettingQuery,
// } from "./withdrawApiSlice";
// import { useUserDataQuery } from "../../../Dashboard/pages/dashBoard/DashboardApliSlice";
// import { useGetkycDetailsQuery } from "../../../Dashboard/pages/kyc/kycApiSlice";
// import { toast } from "react-toastify";
// import Cookies from "js-cookie";
// const TransactionTable = ({
//   transactions,
//   state,
//   setState,
//   selectedStatus,
//   setSelectedStatus,
//   handleSearch,
//   handlePageChange,
//   loading,
// }) => {
//   const [isMobile, setIsMobile] = useState(false);
//   // console.log("Transactions:", transactions);
//   useEffect(() => {
//     const checkMobile = () => {
//       setIsMobile(window.innerWidth < 768);
//     };

//     checkMobile();
//     window.addEventListener("resize", checkMobile);
//     return () => window.removeEventListener("resize", checkMobile);
//   }, []);

// const getStatusColor = (status) => {
//   switch (status) {
//     case 1: return "border-green-500 text-green-600 bg-green-50";
//     case 0: return "border-yellow-500 text-yellow-600 bg-yellow-50";
//     case 2: return "border-red-500 text-red-600 bg-red-50";
//     default: return "border-gray-400 text-gray-500 bg-gray-50";
//   }
// };

//   const getStatusText = (status) => {
//     switch (status) {
//       case 1: return "Approved";
//       case 0 : return "Pending";
//       case 2: return "Rejected";
//       default: return "Unknown";
//     }
//   };


//   const formatDateWithAmPm = (isoString) => {
//     if (!isoString) return "-";
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

// const TransactionCard = ({ transaction, index }) => (
//   <div className="bg-white rounded-md overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 group">
//     {/* Decorative top accent */}
//     <div className="h-1 bg-gradient-to-r from-[#1d8e85] via-[#25b5aa] to-[#1d8e85] animate-gradient-x"></div>
    
//     {/* Header with shine effect */}
//     <div className="relative p-2.5 bg-gradient-to-r from-gray-50 to-white flex items-center justify-between overflow-hidden">
//       <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-[linear-gradient(110deg,rgba(255,255,255,0)_0%,rgba(255,255,255,0.9)_50%,rgba(255,255,255,0)_100%)] -translate-x-full group-hover:translate-x-full transform transition-transform duration-1500"></div>
      
//       <div className="flex items-center gap-2.5 z-10">
//         <div className="flex items-center justify-center w-7 h-7 rounded-full bg-gradient-to-br from-[#1d8e85] to-[#106b64] text-white shadow-sm group-hover:shadow transition-shadow relative">
//           <span className="text-xs font-bold">{index + 1}</span>
//           <span className="absolute inset-0 rounded-full border border-white/30 scale-0 group-hover:scale-100 transition-transform duration-300"></span>
//         </div>
//         <div>
//           <span className="text-[10px] text-gray-500 uppercase tracking-wide block leading-tight font-medium">Transaction ID</span>
//           <span className="text-xs font-bold text-gray-800 truncate block group-hover:text-[#1d8e85] transition-colors">
//             {transaction._id ? `...${transaction._id.slice(-6)}` : "-"}
//           </span>
//         </div>
//       </div>
      
//       <span className={`text-xs px-2 py-0.5 rounded-full border ${getStatusColor(transaction.status)} transform transition-transform shadow-sm z-10 relative`}>
//         <span className="inline-block w-1.5 h-1.5 rounded-full bg-current mr-1 align-middle animate-pulse"></span>
//         {getStatusText(transaction.status)}
//       </span>
//     </div>
    
//     {/* Amount section with highlight and card-like design */}
//     <div className="p-3 bg-gradient-to-r from-gray-50 to-white border-y border-gray-100 relative overflow-hidden">
//       <div className="absolute -right-3 -top-6 w-12 h-12 rounded-full bg-[#1d8e85]/5 group-hover:bg-[#1d8e85]/10 transition-colors"></div>
//       <div className="absolute -left-3 -bottom-6 w-12 h-12 rounded-full bg-[#1d8e85]/5 group-hover:bg-[#1d8e85]/10 transition-colors"></div>
      
//       <div className="flex justify-between items-center">
//         <div className="relative">
//           <span className="text-[10px] text-[#1d8e85] uppercase tracking-wide block leading-tight font-medium">Amount</span>
//           <span className="text-sm font-extrabold text-gray-800 group-hover:text-[#1d8e85] transition-colors">
//             {transaction.amount
//               ? transaction.currency === "INR"
//                 ? `₹${parseFloat(transaction.amount).toFixed(2)}`
//                 : `$${parseFloat(transaction.amount).toFixed(2)}`
//               : "-"}
//           </span>
//           <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#1d8e85] group-hover:w-full transition-all duration-300"></span>
//         </div>
//         <div className="relative">
//           <span className="text-[10px] text-red-500 uppercase tracking-wide block leading-tight font-medium text-right">Fee</span>
//           <span className="text-xs font-bold text-red-600 block text-right">
//             {transaction.admin_inr_charges
//               ? transaction.currency === "INR"
//                 ? `₹${transaction.admin_inr_charges}`
//                 : `$${transaction.admin_inr_charges}`
//               : "-"}
//           </span>
//           <span className="absolute -bottom-1 right-0 w-0 h-0.5 bg-red-500 group-hover:w-full transition-all duration-300"></span>
//         </div>
//       </div>
//     </div>
    
//     {/* Details section with refined styling */}
//     <div className="p-2.5 text-xs space-y-2">
//       <div className="grid grid-cols-2 gap-2">
//         <div className="rounded bg-gray-50 p-1.5 border border-gray-100 group-hover:border-[#1d8e85]/20 transition-colors">
//           <span className="text-[10px] text-gray-500 uppercase block mb-0.5 font-medium">Currency</span>
//           <span className="font-bold text-gray-800">{transaction.currency || "-"}</span>
//         </div>
//         <div className="rounded bg-gray-50 p-1.5 border border-gray-100 group-hover:border-[#1d8e85]/20 transition-colors">
//           <span className="text-[10px] text-gray-500 uppercase block mb-0.5 font-medium">Date</span>
//           <span className="font-bold text-gray-800 text-[11px]">{formatDateWithAmPm(transaction.created_at)}</span>
//         </div>
//       </div>
      
//       {(transaction.reason || transaction.note) && (
//         <div className="pt-1 mt-1 border-t border-dashed border-gray-200">
//           {transaction.reason && (
//             <div className="mb-1.5">
//               <div className="flex items-center gap-1 mb-1">
//                 <span className="w-1 h-3 bg-[#1d8e85] rounded-full"></span>
//                 <span className="text-[10px] text-gray-500 uppercase font-medium">Reason</span>
//               </div>
//               <p className="text-[11px] text-gray-700 bg-gray-50 p-1.5 rounded border border-gray-100 group-hover:border-[#1d8e85]/20 transition-colors">{transaction.reason}</p>
//             </div>
//           )}
          
//           {transaction.note && (
//             <div>
//               <div className="flex items-center gap-1 mb-1">
//                 <span className="w-1 h-3 bg-[#1d8e85] rounded-full"></span>
//                 <span className="text-[10px] text-gray-500 uppercase font-medium">Note</span>
//               </div>
//               <p className="text-[11px] text-gray-700 bg-gray-50 p-1.5 rounded border border-gray-100 group-hover:border-[#1d8e85]/20 transition-colors">{transaction.note}</p>
//             </div>
//           )}
//         </div>
//       )}
//     </div>
    
//     {/* Card Footer with shadow effect */}
//     <div className="h-1 bg-gradient-to-r from-transparent via-gray-200 to-transparent opacity-70"></div>
//   </div>
// );
//   return (
//     <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
//       <div className="px-4 sm:px-6 py-4 border-b border-gray-200 bg-gray-50">
//         <div className="flex flex-col gap-4">
//           <div className="flex items-center gap-2">
//             <h3 className="text-lg font-semibold text-gray-900">
//               Withdrawal History
//             </h3>
//             {isMobile && <Smartphone className="w-4 h-4 text-gray-500" />}
//           </div>

//           {/* Mobile and Tablet Filters */}
//           <div className="flex flex-col gap-3">
//             <div className="flex flex-col sm:flex-row gap-3">
//               <select
//                 value={selectedStatus}
//                 onChange={(e) => {
//                   setSelectedStatus(e.target.value);
//                   setState((prev) => ({ ...prev, currentPage: 1 }));
//                 }}
//                 className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-[#1d8e85] focus:border-[#1d8e85] text-gray-700 bg-white"
//               >
//                 <option value="">All Status</option>
//                 <option value="1">Approved</option>
//                 <option value="0">Pending</option>
//                 <option value="2">Rejected</option>
//               </select>

//               <div className="relative flex-1">
//                 <input
//                   type="text"
//                   placeholder="Search transactions..."
//                   onChange={handleSearch}
//                   className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-[#1d8e85] focus:border-[#1d8e85]"
//                 />
//                 <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
//               </div>
//               <button className="w-full sm:w-auto px-4 py-2 bg-[#1d8e85] text-white rounded-md text-sm hover:bg-[#166f67] focus:ring-2 focus:ring-[#1d8e85] focus:ring-offset-2 flex items-center justify-center gap-2 transition-colors">
//                 <Download className="w-4 h-4" />
//                 Export
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {isMobile ? (
//         // Mobile Card View
//         <div className="p-4">
//           <div className="space-y-4">
//             {loading ? (
//               [...Array(3)].map((_, i) => (
//                 <div
//                   key={i}
//                   className="bg-gray-200 animate-pulse rounded-xl h-48"
//                 ></div>
//               ))
//             ) : !transactions || transactions?.length === 0 ? (
//               <div className="text-center py-12">
//                 <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
//                   <Building className="w-8 h-8 text-gray-400" />
//                 </div>
//                 <h3 className="text-lg font-medium text-gray-900 mb-2">
//                   No transactions found
//                 </h3>
//                 <p className="text-gray-500">
//                   Your withdrawal history will appear here
//                 </p>
//               </div>
//             ) : (
//               transactions.map((transaction, index) => (
//                 <TransactionCard
//                   key={transaction._id || index}
//                   transaction={transaction}
//                   index={index}
//                 />
//               ))
//             )}
//           </div>
//         </div>
//       ) : (
//         <div className="overflow-x-auto shadow-sm border border-gray-200 rounded-lg">
//   <table className="w-full border-collapse">
//     <thead className="bg-[#1d8e85] text-white sticky top-0 z-10">
//       <tr>
//         <th className="px-2 py-2 text-center text-xs font-medium">#</th>
//         <th className="px-2 py-2 text-left text-xs font-medium">Transaction ID</th>
//         <th className="px-2 py-2 text-center text-xs font-medium">Currency</th>
//         <th className="px-2 py-2 text-right text-xs font-medium">Amount</th>
//         <th className="px-2 py-2 text-right text-xs font-medium">Charges</th>
//         <th className="px-2 py-2 text-center text-xs font-medium">Date & Time</th>
//         <th className="px-2 py-2 text-center text-xs font-medium">Status</th>
//         <th className="px-2 py-2 text-left text-xs font-medium">Reason</th>
//         <th className="px-2 py-2 text-left text-xs font-medium">Note</th>
//       </tr>
//     </thead>
//     <tbody className="bg-white divide-y divide-gray-200">
//       {loading ? (
//         [...Array(3)].map((_, i) => (
//           <tr key={i}>
//             {[...Array(9)].map((_, j) => (
//               <td key={j} className="px-2 py-2.5">
//                 <div className="bg-gray-200 animate-pulse h-4 w-16 rounded"></div>
//               </td>
//             ))}
//           </tr>
//         ))
//       ) : !transactions || transactions?.length === 0 ? (
//         <tr>
//           <td colSpan="9" className="px-2 py-3 text-center text-gray-500">
//             No data found
//           </td>
//         </tr>
//       ) : (
//         transactions.map((transaction, index) => (
//           <tr key={transaction._id || index} className="hover:bg-gray-50">
//             <td className="px-2 py-2.5 text-center text-gray-600 text-xs font-medium">
//               {(state?.currentPage || 1) * (state?.perPage || 10) -
//                 ((state?.perPage || 10) - 1) +
//                 index}
//             </td>
//             <td className="px-2 py-2.5 text-gray-800 text-xs font-medium">
//               <div className="flex items-center">
//                 <span className="truncate max-w-[140px]" title={transaction._id || "-"}>
//                   {transaction._id || "-"}
//                 </span>
//                 {transaction._id && (
//                   <button 
//                     className="ml-1 text-gray-400 hover:text-[#1d8e85]" 
//                     title="Copy ID"
//                     onClick={() => navigator.clipboard.writeText(transaction._id)}
//                   >
//                     <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
//                     </svg>
//                   </button>
//                 )}
//               </div>
//             </td>
//             <td className="px-2 py-2.5 text-center text-gray-800 text-xs">
//               {transaction.currency || "-"}
//             </td>
//             <td className="px-2 py-2.5 text-right text-gray-800 text-xs font-medium">
//               {transaction.amount
//                 ? transaction.currency === "INR"
//                   ? `₹${parseFloat(transaction.amount).toFixed(2)}`
//                   : `$${parseFloat(transaction.amount).toFixed(2)}`
//                 : "-"}
//             </td>
//             <td className="px-2 py-2.5 text-center text-gray-700 text-xs font-medium">
//               {transaction.admin_inr_charges
//                 ? transaction.currency === "INR"
//                   ? `₹${transaction.admin_inr_charges}`
//                   : `$${transaction.admin_inr_charges}`
//                 : "-"}
//             </td>
//             <td className="px-2 py-2.5 text-center text-gray-700 text-xs whitespace-nowrap">
//               {formatDateWithAmPm(transaction.created_at)}
//             </td>
//             <td className="px-2 py-2.5 text-center">
//               <span className={`inline-flex px-1.5 py-0.5 text-xs font-medium rounded-full ${getStatusColor(transaction.status)}`}>
//                 {getStatusText(transaction.status)}
//               </span>
//             </td>
//             <td className="px-2 py-2.5 text-gray-700 text-xs max-w-[150px]">
//               <div className="line-clamp-2 hover:line-clamp-none" title={transaction?.reason || "-"}>
//                 {transaction?.reason || "-"}
//               </div>
//             </td>
//             <td className="px-2 py-2.5 text-gray-700 text-xs max-w-[150px]">
//               <div className="line-clamp-2 hover:line-clamp-none hover:text-[#1d8e85] cursor-pointer" title={transaction?.note || "-"}>
//                 {transaction?.note || "-"}
//               </div>
//             </td>
//           </tr>
//         ))
//       )}
//     </tbody>
//   </table>
// </div>
//         // Desktop Table View
//         // <div className="overflow-x-auto">
//         //   <table className="w-full">
//         //     <thead className="bg-[#1d8e85] text-white text-sm">
//         //       <tr>
//         //         <th className="px-2 py-3 text-center text-xs uppercase ">
//         //           S.No
//         //         </th>
//         //         <th className="px-2 py-3 text-center text-xs uppercase ">
//         //           Transaction ID
//         //         </th>
//         //         <th className="px-2 py-3 text-center text-xs uppercase ">
//         //           Currency Type
//         //         </th>
//         //         <th className="px-2 py-3 text-center text-xs uppercase">
//         //           Withdrawal Amount
//         //         </th>
//         //         <th className="px-2 py-3 text-center text-xs uppercase ">
//         //           Admin Charges
//         //         </th>
//         //         <th className="px-2 py-3 text-center text-xs uppercase r">
//         //           Date & Time
//         //         </th>
//         //         <th className="px-2 py-3 text-center text-xs uppercase r">
//         //           Status
//         //         </th>
//         //         <th className="px-2 py-3 text-center text-xs uppercase r">
//         //           Reason
//         //         </th>
//         //         <th className="px-2 py-3 text-center text-xs uppercase ">
//         //           Note
//         //         </th>
//         //       </tr>
//         //     </thead>
//         //     <tbody className="bg-white divide-y divide-gray-200">
//         //       {loading ? (
//         //         [...Array(5)].map((_, i) => (
//         //           <tr key={i}>
//         //             {[...Array(9)].map((_, j) => (
//         //               <td key={j} className="px-2 py-4">
//         //                 <div className="bg-gray-200 animate-pulse h-2 rounded"></div>
//         //               </td>
//         //             ))}
//         //           </tr>
//         //         ))
//         //       ) : !transactions || transactions?.length === 0 ? (
//         //         <tr>
//         //           <td
//         //             colSpan="9"
//         //             className="px-6 py-4 text-center text-gray-500"
//         //           >
//         //             No data found
//         //           </td>
//         //         </tr>
//         //       ) : (
//         //         transactions.map((transaction, index) => (
//         //           <tr
//         //             key={transaction._id || index}
//         //             className="hover:bg-gray-50"
//         //           >
//         //             <td className="px-6 py-4  text-sm text-gray-900">
//         //               {(state?.currentPage || 1) * (state?.perPage || 10) -
//         //                 ((state?.perPage || 10) - 1) +
//         //                 index}
//         //             </td>
//         //             <td className="px-6 py-4  text-xs font-medium text-gray-900">
//         //               {transaction._id || "-"}
//         //             </td>
//         //             <td className="px-2 py-4 whitespace-nowrap text-xs text-gray-900">
//         //               {transaction.currency || "-"}
//         //             </td>
//         //             <td className="px-2 py-4 whitespace-nowrap text-xs text-gray-900 font-medium">
//         //               {transaction.amount
//         //                 ? transaction.currency === "INR"
//         //                   ? `₹${parseFloat(transaction.amount).toFixed(2)}`
//         //                   : `$${parseFloat(transaction.amount).toFixed(2)}`
//         //                 : "-"}
//         //             </td>
//         //             <td className="px-2 py-4 whitespace-nowrap text-xs text-gray-900">
//         //               {transaction.admin_inr_charges
//         //                 ? transaction.currency === "INR"
//         //                   ? `₹${transaction.admin_inr_charges}`
//         //                   : `$${transaction.admin_inr_charges}`
//         //                 : "-"}
//         //             </td>
//         //             <td className="px-2 py-4 whitespace-nowrap text-xs text-gray-900">
//         //               {formatDateWithAmPm(transaction.created_at)}
//         //             </td>
//         //             <td className="px-2 py-4 whitespace-nowrap">
//         //               <span
//         //                 className={`inline-flex px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(
//         //                   transaction.status
//         //                 )}`}
//         //               >
//         //                 {getStatusText(transaction.status)}
//         //               </span>
//         //             </td>
//         //             <td
//         //               className="px-2 py-4 text-xs text-gray-900 max-w-20 "
//         //               title={transaction?.reason}
//         //             >
//         //               {transaction?.reason || "-"}
//         //             </td>
//         //             <td className="px-2 py-4 text-xs text-gray-900">
//         //               <span
//         //                 className="cursor-pointer hover:text-[#1d8e85]"
//         //                 title={transaction?.note}
//         //               >
//         //                 {transaction?.note }
//         //               </span>
//         //             </td>
//         //           </tr>
//         //         ))
//         //       )}
//         //     </tbody>
//         //   </table>
//         // </div>
//       )}
//     </div>
//   );
// };

// const Withdrawal = () => {
//   const [withdrawRequestList, { isLoading }] = useWithdrawRequestListQuery();
//   const { data: userData, refetch } = useUserDataQuery();
//   const { data: getSetting } = useGetSettingQuery();
//   const { data: kycDetails } = useGetkycDetailsQuery();

//   const [formData, setFormData] = useState({
//     balanceType: "referral",
//     paymentCurrency: "",
//     amount: "",
//   });
//   const [loading, setLoading] = useState(false);
//   const [errors, setErrors] = useState({});
//   const [selectedStatus, setSelectedStatus] = useState("");
//   const [state, setState] = useState({
//     currentPage: 1,
//     perPage: 10,
//     search: "",
//   });

//   const queryParams = `limit=${state?.perPage || ""}&page=${
//     state?.currentPage || ""
//   }&search=${state?.search || ""}&status=${selectedStatus}`;

//   const {
//     data: withdrawHistory,
//     isLoading: isLoadingWithdraw,
//     refetch: refetchWithdraw,
//   } = useWithdrawRequestListQuery(queryParams);
// console.log(withdrawHistory,"withdrwal history");
//   const datafromApi = withdrawRequestList?.data?.withdrawRequests || [];
//   console.log(datafromApi,"datafromApi");
//   const id = JSON.parse(Cookies.get("userData"));
//   // console.log(id)
//   const userid = id?._id;
//   console.log(userid);
//   const TableData = datafromApi.filter((item) => item?.userId?._id === userid);

//   const [previewData, setPreviewData] = useState([
//     { heading: "Fees", subHeading: "0" },
//     { heading: "Will Get", subHeading: "0" },
//   ]);

//   useEffect(() => {
//     if (
//       userData &&
//       userData?.data?.countryCode !== 91 &&
//       formData.paymentCurrency !== "USD"
//     ) {
//       setFormData((prev) => ({
//         ...prev,
//         paymentCurrency: "USD",
//       }));
//     } else if (
//       userData &&
//       userData?.data?.countryCode === 91 &&
//       formData.paymentCurrency !== "INR"
//     ) {
//       setFormData((prev) => ({
//         ...prev,
//         paymentCurrency: "INR",
//       }));
//     }
//   }, [userData?.data?.countryCode, formData.paymentCurrency]);

//   const validate = () => {
//     const errors = {};

//     if (!formData.balanceType) {
//       errors.balanceType = "Balance Type is required";
//     }

//     if (formData.balanceType === "referral" && !formData.paymentCurrency) {
//       errors.paymentCurrency = "Payment Currency is required";
//     }

//     if (!formData.amount) {
//       errors.amount = "Amount is required";
//     } else if (isNaN(formData.amount)) {
//       errors.amount = "Amount must be a number";
//     } else if (parseFloat(formData.amount) <= 0) {
//       errors.amount = "Amount must be greater than zero";
//     }

//     return errors;
//   };

//   const calculatePreview = (amount, paymentCurrency) => {
//     if (!getSetting?.data) {
//       toast("Settings data is missing.");
//       return;
//     }

//     const {
//       min_withdrawal_inr,
//       max_withdrawal_inr,
//       withdrawal_commission_inr,
//       min_withdrawal_usd,
//       max_withdrawal_usd,
//       withdrawal_commission_usd,
//     } = getSetting.data;

//     const parsedAmount = parseFloat(amount);
//     let Fees;

//     if (paymentCurrency === "INR") {
//       if (
//         parsedAmount < min_withdrawal_inr ||
//         parsedAmount > max_withdrawal_inr
//       ) {
//         toast(
//           `Withdrawal amount should be between ${min_withdrawal_inr} and ${max_withdrawal_inr}.`
//         );
//         return;
//       }
//       Fees = (parsedAmount * withdrawal_commission_inr) / 100;
//     } else {
//       if (
//         parsedAmount < min_withdrawal_usd ||
//         parsedAmount > max_withdrawal_usd
//       ) {
//         toast(
//           `Withdrawal amount should be between ${min_withdrawal_usd} and ${max_withdrawal_usd}.`
//         );
//         return;
//       }
//       Fees = (parsedAmount * withdrawal_commission_usd) / 100;
//     }

//     const Will_Get = parsedAmount - Fees;

//     setPreviewData([
//       {
//         heading: "Fees",
//         subHeading: `${Fees.toFixed(2)} ${
//           paymentCurrency === "USD"
//             ? "USD"
//             : paymentCurrency === "INR"
//             ? "INR"
//             : "Jaimax"
//         }`,
//       },
//       {
//         heading: "Will Get",
//         subHeading: `${Will_Get.toFixed(2)} ${
//           paymentCurrency === "USD"
//             ? "USD"
//             : paymentCurrency === "INR"
//             ? "INR"
//             : "Jaimax"
//         }`,
//       },
//     ]);
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;

//     if (name === "amount" && !/^\d*\.?\d*$/.test(value)) {
//       return;
//     }

//     setFormData({ ...formData, [name]: value });
//     if (value) {
//       clearErrors();
//     }
//     setPreviewData([
//       { heading: "Fees", subHeading: "0" },
//       { heading: "Will Get", subHeading: "0" },
//     ]);
//   };

//   const onBlurAmount = (e) => {
//     if (e.target.value) {
//       calculatePreview(e.target.value, formData.paymentCurrency);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const errors = validate();
//     if (Object.keys(errors).length > 0) {
//       setErrors(errors);
//       return;
//     }

//     const { amount, balanceType, paymentCurrency } = formData;
//     try {
//       const response = await withdrawRequest(
//         balanceType == "referral"
//           ? {
//               amount: parseFloat(amount),
//               currency: paymentCurrency,
//               currencyType: paymentCurrency,
//             }
//           : balanceType == "JAIMAX"
//           ? { amount: parseFloat(amount), currency: balanceType }
//           : ""
//       );

//       if (response.success) {
//         setFormData({
//           balanceType: "referral",
//           paymentCurrency: "",
//           amount: "",
//         });

//         setPreviewData([
//           { heading: "Fees", subHeading: "0" },
//           { heading: "Will Get", subHeading: "0" },
//         ]);
//         toast(response?.message);
//         refetchWithdraw();
//       } else {
//         toast(response.message);
//       }
//     } catch (error) {
//       toast(error?.data?.message || "Withdrawal failed. Please try again.");
//     }
//   };

//   const clearErrors = () => {
//     setErrors({});
//   };

//   const addSymbolPlaceholder = (value) => {
//     if (value === "INR") {
//       return "₹";
//     } else if (value === "USD") {
//       return "$";
//     } else {
//       return "";
//     }
//   };

//   const handlePageChange = (e) => {
//     setLoading(true);
//     setState({ ...state, currentPage: e });
//   };

//   let searchTimeout;
//   const handleSearch = (e) => {
//     clearTimeout(searchTimeout);
//     searchTimeout = setTimeout(() => {
//       setState({ ...state, search: e.target.value, currentPage: 1 });
//     }, 1000);
//   };

//   const onChangeBalanceType = (e) => {
//     setFormData({
//       amount: "",
//       balanceType: e.target.value,
//       paymentCurrency: "",
//     });
//     setPreviewData([
//       { heading: "Fees", subHeading: "0" },
//       { heading: "Will Get", subHeading: "0" },
//     ]);
//   };

//   useEffect(() => {
//     setLoading(false);
//   }, [withdrawHistory?.data?.withdrawRequests]);

//   useEffect(() => {
//     return () => {
//       clearTimeout(searchTimeout);
//     };
//   }, []);

//   return (
//     <div className="min-h-screen bg-gray-50 py-4">
//   <div className="max-w-screen mx-auto px-3 sm:px-4">
//     <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 auto-rows-auto">
//       {/* Left Column - Withdrawal Form */}
//       <div className="lg:col-span-4 h-full">
//         <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm h-full">
//           <div className="mb-4">
//             <h2 className="text-base font-semibold text-gray-900 mb-3">
//               Withdrawal Request
//             </h2>

//             {/* Balance Display */}
//             <div className="bg-gradient-to-r from-[#1d8e85] to-[#16a085] rounded-lg p-3 text-white mb-4">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-xs opacity-90">Available Balance</p>
//                   <p className="text-lg font-bold">
//                     ₹{userData?.data?.Inr?.toLocaleString("en-IN") || "0"}
//                   </p>
//                 </div>
//                 <CreditCard className="w-5 h-5 opacity-80" />
//               </div>
//             </div>
//           </div>

//           <div className="space-y-4">
//             <div>
//               <label
//                 htmlFor="balanceType"
//                 className="block text-xs font-medium text-gray-700 mb-1"
//               >
//                 Source Account
//               </label>
//               <select
//                 id="balanceType"
//                 name="balanceType"
//                 value={formData.balanceType}
//                 onChange={onChangeBalanceType}
//                 onClick={clearErrors}
//                 className="w-full text-white px-2.5 py-1.5 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-[#1d8e85] focus:border-[#1d8e85] bg-[#1d8e85]"
//               >
//                 <option value="referral">Available Balance</option>
//                 <option value="JAIMAX">Purchase Token (JaiMax)</option>
//               </select>
//               {errors.balanceType && (
//                 <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
//                   <AlertTriangle className="w-3 h-3" />
//                   {errors.balanceType}
//                 </p>
//               )}
//               {formData.balanceType === "referral" && (
//                 <p className="text-gray-600 mt-1 text-xs">
//                   Total Available: ₹{userData?.data?.Inr?.toFixed(2) || "0.00"}
//                 </p>
//               )}
//             </div>

//             {formData.balanceType === "referral" && (
//               <>
//                 <div className="grid grid-cols-2 gap-3">
//                   <div>
//                     <label className="block text-xs font-medium text-gray-700 mb-1">
//                       Currency
//                     </label>
//                     <div className="px-2.5 py-1.5 bg-gray-100 border border-gray-300 rounded text-gray-900 font-medium text-center text-sm">
//                       {formData.paymentCurrency ||
//                         (userData?.data?.countryCode === 91 ? "INR" : "USD")}
//                     </div>
//                   </div>
//                   <div>
//                     <label
//                       htmlFor="amount"
//                       className="block text-xs font-medium text-gray-700 mb-1"
//                     >
//                       Amount *
//                     </label>
//                     <input
//                       id="amount"
//                       type="text"
//                       placeholder={`Enter Amount ${addSymbolPlaceholder(
//                         formData.paymentCurrency
//                       )}`}
//                       value={formData.amount}
//                       onChange={handleInputChange}
//                       onBlur={onBlurAmount}
//                       onClick={clearErrors}
//                       name="amount"
//                       autoComplete="off"
//                       className={`w-full px-2.5 py-1.5 text-sm border rounded focus:ring-2 focus:ring-[#1d8e85] focus:border-[#1d8e85] ${
//                         errors.amount
//                           ? "border-red-300 bg-red-50"
//                           : "border-gray-300"
//                       }`}
//                     />
//                   </div>
//                 </div>
//                 {errors.amount && (
//                   <p className="text-xs text-red-600 flex items-center gap-1">
//                     <AlertTriangle className="w-3 h-3" />
//                     {errors.amount}
//                   </p>
//                 )}

//                 {/* Transaction Summary */}
//                 {formData.amount && (
//                   <div className="border border-gray-200 rounded p-3 bg-gray-50">
//                     <h3 className="text-xs font-medium text-gray-900 mb-2">
//                       Transaction Summary
//                     </h3>
//                     <div className="space-y-1.5 text-xs">
//                       {previewData.map((data, i) => (
//                         <div key={i} className="flex justify-between">
//                           <span
//                             className={
//                               data.heading === "Fees"
//                                 ? "text-red-600"
//                                 : "text-gray-600"
//                             }
//                           >
//                             {data.heading}
//                           </span>
//                           <span
//                             className={
//                               data.heading === "Will Get"
//                                 ? "text-[#1d8e85] font-semibold"
//                                 : "font-medium"
//                             }
//                           >
//                             {data.subHeading}
//                           </span>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 )}
//               </>
//             )}

//             {formData.balanceType === "JAIMAX" && (
//               <div className="text-center py-4">
//                 <h5 className="text-gray-600 text-sm font-medium">
//                   Coming Soon
//                 </h5>
//                 <p className="text-gray-500 text-xs mt-1">
//                   JaiMax token withdrawal will be available soon
//                 </p>
//               </div>
//             )}

//             <button
//               type="button"
//               onClick={handleSubmit}
//               disabled={isLoading || formData.balanceType === "JAIMAX"}
//               className="w-full bg-[#1d8e85] text-white py-2 px-3 text-sm rounded font-medium hover:bg-[#166f67] focus:ring-2 focus:ring-[#1d8e85] focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-1.5 transition-colors"
//             >
//               {isLoading ? (
//                 <>
//                   <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
//                   Processing...
//                 </>
//               ) : (
//                 <>
//                   Submit Withdrawal
//                   <ArrowRight className="w-3.5 h-3.5" />
//                 </>
//               )}
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Right Column - Bank Details & Terms */}
//       <div className="lg:col-span-8 space-y-4 flex flex-col">
//         {/* Bank Details */}
//         <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
//           <div className="flex items-center justify-between mb-3">
//             <h2 className="text-base font-semibold text-gray-900">
//               Destination Account
//             </h2>
//           </div>

//           <div className="grid grid-cols-2 gap-x-4 gap-y-3">
//             <div>
//               <label className="block text-xs font-medium text-gray-500 uppercase mb-0.5">
//                 Account Holder
//               </label>
//               <p className="text-sm text-gray-900 font-medium">
//                 {kycDetails?.data?.name || "Not Available"}
//               </p>
//             </div>

//             <div>
//               <label className="block text-xs font-medium text-gray-500 uppercase mb-0.5">
//                 Account Number
//               </label>
//               <p className="text-sm text-gray-900 font-medium break-all">
//                 {kycDetails?.data?.bank_account || "Not Available"}
//               </p>
//             </div>

//             <div>
//               <label className="block text-xs font-medium text-gray-500 uppercase mb-0.5">
//                 {userData?.data?.countryCode === 91 ? "IFSC" : "Bank"} Code
//               </label>
//               <p className="text-sm text-gray-900 font-medium">
//                 {kycDetails?.data?.ifsc_code || "Not Available"}
//               </p>
//             </div>

//             <div>
//               <label className="block text-xs font-medium text-gray-500 uppercase mb-0.5">
//                 Bank Name
//               </label>
//               <p className="text-sm text-gray-900 font-medium">
//                 {kycDetails?.data?.bank_name || "Not Available"}
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* Processing Information */}
//         <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
//           <h2 className="text-base font-semibold text-gray-900 mb-3">
//             Terms & Conditions
//           </h2>

//           <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-3">
//             <div className="flex items-center gap-2 p-2 bg-blue-50 rounded border border-blue-200">
//               <Clock className="w-4 h-4 text-blue-600 flex-shrink-0" />
//               <div>
//                 <p className="text-xs font-medium text-blue-900">
//                   Processing Time
//                 </p>
//                 <p className="text-[10px] text-blue-700">Within 24 hours</p>
//               </div>
//             </div>

//             <div className="flex items-center gap-2 p-2 bg-green-50 rounded border border-green-200">
//               <Shield className="w-4 h-4 text-green-600 flex-shrink-0" />
//               <div>
//                 <p className="text-xs font-medium text-green-900">
//                   Working Hours
//                 </p>
//                 <p className="text-[10px] text-green-700">
//                   Mon-Fri, 10 AM - 4 PM
//                 </p>
//               </div>
//             </div>

//             <div className="flex items-center gap-2 p-2 bg-orange-50 rounded border border-orange-200">
//               <Info className="w-4 h-4 text-orange-600 flex-shrink-0" />
//               <div>
//                 <p className="text-xs font-medium text-orange-900">
//                   Processing Fee
//                 </p>
//                 <p className="text-[10px] text-orange-700">
//                   {getSetting?.data?.withdrawal_commission_inr || "0.5"}%
//                   per transaction
//                 </p>
//               </div>
//             </div>
//           </div>

//           <div className="bg-yellow-50 border border-yellow-200 rounded p-3">
//             <div className="flex gap-2">
//               <AlertTriangle className="w-4 h-4 text-yellow-600 flex-shrink-0 mt-0.5" />
//               <div>
//                 <h3 className="text-xs font-semibold text-yellow-800">
//                   Important Notes
//                 </h3>
//                 <ul className="text-xs text-yellow-700 mt-1.5 space-y-1">
//                   <li>• Complete KYC and get approved status before withdrawal</li>
//                   <li>• Banking hours: 10 AM to 4 PM (Mon-Fri)</li>
//                   <li>• Funds credited within 24 hours of withdrawal request</li>
//                   <li>• Please verify bank details before initiating withdrawal</li>
//                 </ul>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>

//     {/* Transaction History */}
//     <div className="mt-4">
//       <TransactionTable
//         transactions={TableData}
//         state={state}
//         setState={setState}
//         selectedStatus={selectedStatus}
//         setSelectedStatus={setSelectedStatus}
//         handleSearch={handleSearch}
//         handlePageChange={handlePageChange}
//         loading={isLoadingWithdraw || loading}
//       />

//       {/* Pagination - Only show if there's data */}
//       {withdrawHistory?.data?.pagination?.total > 0 && (
//         <div className="mt-3 bg-white rounded border border-gray-200 shadow-sm">
//           <div className="p-3">
//             <div className="flex flex-col gap-3">
//               {/* Entries selector and results info */}
//               <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
//                 <div className="flex items-center gap-2 text-xs">
//                   <span className="text-gray-700">Show</span>
//                   <select
//                     value={state?.perPage}
//                     onChange={(e) => {
//                       const newPerPage = e.target.value;
//                       setState({
//                         ...state,
//                         perPage: newPerPage,
//                         currentPage: 1,
//                       });
//                     }}
//                     className="px-2 py-1 border border-gray-300 rounded text-xs focus:ring-1 focus:ring-[#1d8e85] focus:border-[#1d8e85]"
//                   >
//                     <option value="10">10</option>
//                     <option value="30">30</option>
//                     <option value="50">50</option>
//                   </select>
//                   <span className="text-gray-700">entries</span>
//                 </div>
//               </div>

//               {/* Pagination controls - Only show if more than 1 page */}
//               {Math.ceil(
//                 withdrawHistory.data.pagination.total /
//                   (state?.perPage || 10)
//               ) > 1 && (
//                 <div className="flex justify-center">
//                   <Pagination
//                     currentPage={state?.currentPage || 1}
//                     totalPages={Math.ceil(
//                       withdrawHistory.data.pagination.total /
//                         (state?.perPage || 10)
//                     )}
//                     onPageChange={handlePageChange}
//                   />
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   </div>
// </div>
//   );
// };

// export default Withdrawal;
// // import React, { useState } from 'react';
// // import { useWithdrawHistoryQuery } from './withdrawApiSlice'; // adjust path as needed

// // const WithdrawHistory = () => {
// //   const [page, setPage] = useState(1);
// //   const [limit, setLimit] = useState(10);
  
// //   const queryString = `page=${page}&limit=${limit}`;
// //   const { data, error, isLoading, isFetching } = useWithdrawHistoryQuery(queryString);
  
// //   // Status mapping (assuming 0 = pending, 1 = approved, 2 = rejected)
// //   const getStatusLabel = (statusCode) => {
// //     switch (statusCode) {
// //       case 0: return { label: 'Pending', classes: 'bg-yellow-100 text-yellow-800' };
// //       case 1: return { label: 'Approved', classes: 'bg-green-100 text-green-800' };
// //       case 2: return { label: 'Rejected', classes: 'bg-red-100 text-red-800' };
// //       default: return { label: 'Unknown', classes: 'bg-gray-100 text-gray-800' };
// //     }
// //   };

// //   const withdrawRequests = data?.data?.withdrawRequests || [];
// //   const pagination = data?.data?.pagination || {};

// //   return (
// //     <div className="p-6 max-w-screen mx-auto bg-white rounded-lg shadow-md">
// //       <div className="flex justify-between items-center mb-6">
// //         <h2 className="text-2xl font-semibold text-gray-800">Withdrawal History</h2>
// //       </div>
      
// //       {isLoading ? (
// //         <div className="flex justify-center items-center h-64">
// //           <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
// //         </div>
// //       ) : error ? (
// //         <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
// //           <p>Error loading withdrawal history. Please try again.</p>
// //         </div>
// //       ) : (
// //         <>
// //           <div className="overflow-x-auto">
// //             <table className="min-w-full divide-y divide-gray-200">
// //               <thead className="bg-gray-50">
// //                 <tr>
// //                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
// //                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
// //                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
// //                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Currency</th>
// //                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
// //                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
// //                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fees</th>
// //                 </tr>
// //               </thead>
// //               <tbody className="bg-white divide-y divide-gray-200">
// //                 {withdrawRequests.map((request) => {
// //                   const status = getStatusLabel(request.status);
// //                   return (
// //                     <tr key={request._id} className="hover:bg-gray-50">
// //                       <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
// //                         {request.userId._id}
// //                       </td>
// //                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
// //                         {request.userId.email}
// //                       </td>
// //                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
// //                         {request.amount}
// //                       </td>
// //                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
// //                         {request.currency}
// //                       </td>
// //                       <td className="px-6 py-4 whitespace-nowrap text-sm">
// //                         <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${status.classes}`}>
// //                           {status.label}
// //                         </span>
// //                       </td>
// //                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
// //                         {new Date(request.created_at).toLocaleDateString()}
// //                       </td>
// //                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
// //                         {request.admin_inr_charges}
// //                       </td>
// //                     </tr>
// //                   );
// //                 })}
// //               </tbody>
// //             </table>
// //           </div>
          
// //           <div className="flex justify-between items-center mt-6">
// //             <p className="text-sm text-gray-700">
// //               Showing <span className="font-medium">{withdrawRequests.length}</span> of{' '}
// //               <span className="font-medium">{pagination.total || 0}</span> transactions
// //             </p>
            
// //             <div className="flex space-x-2">
// //               <button
// //                 onClick={() => setPage(prev => Math.max(prev - 1, 1))}
// //                 disabled={page === 1 || isLoading || isFetching}
// //                 className={`px-3 py-1 border rounded-md ${page === 1 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
// //               >
// //                 Previous
// //               </button>
// //               <button
// //                 onClick={() => setPage(prev => prev + 1)}
// //                 disabled={page >= (pagination.totalPages || 1) || isLoading || isFetching}
// //                 className={`px-3 py-1 border rounded-md ${page >= (pagination.totalPages || 1) ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
// //               >
// //                 Next
// //               </button>
// //             </div>
// //           </div>
// //         </>
// //       )}
// //     </div>
// //   );
// // };

// // export default WithdrawHistory;



import React, { useState, useEffect, useMemo } from "react";
import {
  AlertTriangle,
  CheckCircle,
  Info,
  Download,
  Building,
  CreditCard,
  Clock,
  Shield,
  ArrowRight,
  Smartphone,
  Search,
} from "lucide-react";
import Pagination from "../../../pagination/pagination";
import {
  useWithdrawHistoryQuery,
  useWithdrawRequestMutation,
  useGetSettingQuery,
} from "./withdrawApiSlice";
import { useUserDataQuery } from "../../../Dashboard/pages/dashBoard/DashboardApliSlice";
import { useGetkycDetailsQuery } from "../../../Dashboard/pages/kyc/kycApiSlice";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

const TransactionTable = ({
  state,
  setState,
  selectedStatus,
  setSelectedStatus,
  handleSearch,
  loading,
}) => {
  const [isMobile, setIsMobile] = useState(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  
  // Create query string with proper pagination
  const queryString = useMemo(() => {
    const params = new URLSearchParams();
    params.append('page', state?.currentPage || page);
    params.append('limit', state?.perPage || limit);
    if (selectedStatus) params.append('status', selectedStatus);
    if (state?.search) params.append('search', state.search);
    return params.toString();
  }, [state, selectedStatus, page, limit]);
  
  const { data, isLoading, isFetching } = useWithdrawHistoryQuery(queryString);
  
  const transactions = data?.data?.withdrawRequests || [];
  const pagination = data?.data?.pagination || {};

  // Check for mobile view
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Helper functions for display
  const getStatusColor = (status) => {
    switch (status) {
      case 1: return "border-green-500 text-green-600 bg-green-50";
      case 0: return "border-yellow-500 text-yellow-600 bg-yellow-50";
      case 2: return "border-red-500 text-red-600 bg-red-50";
      default: return "border-gray-400 text-gray-500 bg-gray-50";
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 1: return "Approved";
      case 0: return "Pending";
      case 2: return "Rejected";
      default: return "Unknown";
    }
  };

  const formatDateWithAmPm = (isoString) => {
    if (!isoString) return "-";
    const date = new Date(isoString);
    const day = String(date.getUTCDate()).padStart(2, "0");
    const month = String(date.getUTCMonth() + 1).padStart(2, "0");
    const year = date.getUTCFullYear();
    let hours = date.getUTCHours();
    const minutes = String(date.getUTCMinutes()).padStart(2, "0");
    const amAndPm = hours >= 12 ? "PM" : "AM";

    hours = hours % 12 || 12;
    return `${day}-${month}-${year} ${hours}:${minutes} ${amAndPm}`;
  };

  const handlePageChange = (page) => {
    setState({ ...state, currentPage: page });
  };

  // Export transactions functionality
  const exportTransactions = () => {
    if (!transactions.length) {
      toast.info("No transactions to export");
      return;
    }
    
    try {
      // Create CSV content
      const headers = ["Transaction ID", "User", "Currency", "Amount", "Charges", "Date", "Status", "Reason/Note"];
      
      const csvRows = [
        headers.join(','),
        ...transactions.map(t => [
          t._id || '-',
          t.userId?.email || '-',
          t.currency || '-',
          t.amount || '0',
          t.admin_inr_charges || '0',
          formatDateWithAmPm(t.created_at),
          getStatusText(t.status),
          (t.reason || t.note || '-').replace(/,/g, ';') // Prevent CSV issues with commas
        ].join(','))
      ];
      
      const csvContent = csvRows.join('\n');
      
      // Create download link
      const blob = new Blob([csvContent], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.setAttribute('hidden', '');
      a.setAttribute('href', url);
      a.setAttribute('download', `withdrawal-history-${new Date().toISOString().slice(0,10)}.csv`);
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      
      toast.success("Export completed successfully");
    } catch (error) {
      toast.error("Failed to export transactions");
    }
  };

  // Mobile card component
  const TransactionCard = ({ transaction, index }) => (
    <div className="bg-white rounded-md overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 group">
      {/* Decorative top accent */}
      <div className="h-1 bg-gradient-to-r from-[#1d8e85] via-[#25b5aa] to-[#1d8e85] animate-gradient-x"></div>
      
      {/* Header with shine effect */}
      <div className="relative p-2.5 bg-gradient-to-r from-gray-50 to-white flex items-center justify-between overflow-hidden">
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-[linear-gradient(110deg,rgba(255,255,255,0)_0%,rgba(255,255,255,0.9)_50%,rgba(255,255,255,0)_100%)] -translate-x-full group-hover:translate-x-full transform transition-transform duration-1500"></div>
        
        <div className="flex items-center gap-2.5 z-10">
          <div className="flex items-center justify-center w-7 h-7 rounded-full bg-gradient-to-br from-[#1d8e85] to-[#106b64] text-white shadow-sm group-hover:shadow transition-shadow relative">
            <span className="text-xs font-bold">{index + 1}</span>
            <span className="absolute inset-0 rounded-full border border-white/30 scale-0 group-hover:scale-100 transition-transform duration-300"></span>
          </div>
          <div>
            <span className="text-[10px] text-gray-500 uppercase tracking-wide block leading-tight font-medium">Transaction ID</span>
            <span className="text-xs font-bold text-gray-800 truncate block group-hover:text-[#1d8e85] transition-colors">
              {transaction._id ? `...${transaction._id.slice(-6)}` : "-"}
            </span>
          </div>
        </div>
        
        <span className={`text-xs px-2 py-0.5 rounded-full border ${getStatusColor(transaction.status)} transform transition-transform shadow-sm z-10 relative`}>
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-current mr-1 align-middle animate-pulse"></span>
          {getStatusText(transaction.status)}
        </span>
      </div>
      
      {/* Amount section */}
      <div className="p-3 bg-gradient-to-r from-gray-50 to-white border-y border-gray-100 relative overflow-hidden">
        <div className="absolute -right-3 -top-6 w-12 h-12 rounded-full bg-[#1d8e85]/5 group-hover:bg-[#1d8e85]/10 transition-colors"></div>
        <div className="absolute -left-3 -bottom-6 w-12 h-12 rounded-full bg-[#1d8e85]/5 group-hover:bg-[#1d8e85]/10 transition-colors"></div>
        
        <div className="flex justify-between items-center">
          <div className="relative">
            <span className="text-[10px] text-[#1d8e85] uppercase tracking-wide block leading-tight font-medium">Amount</span>
            <span className="text-sm font-extrabold text-gray-800 group-hover:text-[#1d8e85] transition-colors">
              {transaction.amount
                ? transaction.currency === "INR"
                  ? `₹${parseFloat(transaction.amount).toFixed(2)}`
                  : `$${parseFloat(transaction.amount).toFixed(2)}`
                : "-"}
            </span>
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#1d8e85] group-hover:w-full transition-all duration-300"></span>
          </div>
          <div className="relative">
            <span className="text-[10px] text-red-500 uppercase tracking-wide block leading-tight font-medium text-right">Fee</span>
            <span className="text-xs font-bold text-red-600 block text-right">
              {transaction.admin_inr_charges
                ? transaction.currency === "INR"
                  ? `₹${transaction.admin_inr_charges}`
                  : `$${transaction.admin_inr_charges}`
                : "-"}
            </span>
            <span className="absolute -bottom-1 right-0 w-0 h-0.5 bg-red-500 group-hover:w-full transition-all duration-300"></span>
          </div>
        </div>
      </div>
      
      {/* Details section */}
      <div className="p-2.5 text-xs space-y-2">
        <div className="grid grid-cols-2 gap-2">
          <div className="rounded bg-gray-50 p-1.5 border border-gray-100 group-hover:border-[#1d8e85]/20 transition-colors">
            <span className="text-[10px] text-gray-500 uppercase block mb-0.5 font-medium">Currency</span>
            <span className="font-bold text-gray-800">{transaction.currency || "-"}</span>
          </div>
          <div className="rounded bg-gray-50 p-1.5 border border-gray-100 group-hover:border-[#1d8e85]/20 transition-colors">
            <span className="text-[10px] text-gray-500 uppercase block mb-0.5 font-medium">Date</span>
            <span className="font-bold text-gray-800 text-[11px]">{formatDateWithAmPm(transaction.created_at)}</span>
          </div>
        </div>
        
        {/* Display email from the userId if available */}
        {transaction.userId && transaction.userId.email && (
          <div className="rounded bg-gray-50 p-1.5 border border-gray-100 group-hover:border-[#1d8e85]/20 transition-colors">
            <span className="text-[10px] text-gray-500 uppercase block mb-0.5 font-medium">Email</span>
            <span className="font-bold text-gray-800 text-[11px] truncate">{transaction.userId.email}</span>
          </div>
        )}
        
        {(transaction.reason || transaction.note) && (
          <div className="pt-1 mt-1 border-t border-dashed border-gray-200">
            {transaction.reason && (
              <div className="mb-1.5">
                <div className="flex items-center gap-1 mb-1">
                  <span className="w-1 h-3 bg-[#1d8e85] rounded-full"></span>
                  <span className="text-[10px] text-gray-500 uppercase font-medium">Reason</span>
                </div>
                <p className="text-[11px] text-gray-700 bg-gray-50 p-1.5 rounded border border-gray-100 group-hover:border-[#1d8e85]/20 transition-colors">{transaction.reason}</p>
              </div>
            )}
            
            {transaction.note && (
              <div>
                <div className="flex items-center gap-1 mb-1">
                  <span className="w-1 h-3 bg-[#1d8e85] rounded-full"></span>
                  <span className="text-[10px] text-gray-500 uppercase font-medium">Note</span>
                </div>
                <p className="text-[11px] text-gray-700 bg-gray-50 p-1.5 rounded border border-gray-100 group-hover:border-[#1d8e85]/20 transition-colors">{transaction.note}</p>
              </div>
            )}
          </div>
        )}
      </div>
      
      {/* Card Footer */}
      <div className="h-1 bg-gradient-to-r from-transparent via-gray-200 to-transparent opacity-70"></div>
    </div>
  );

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
      <div className="px-4 sm:px-6 py-4 border-b border-gray-200 bg-gray-50">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-semibold text-gray-900">
              Withdrawal History
            </h3>
            {isMobile && <Smartphone className="w-4 h-4 text-gray-500" />}
          </div>

          {/* Mobile and Tablet Filters */}
          <div className="flex flex-col gap-3">
            <div className="flex flex-col sm:flex-row gap-3">
              <select
                value={selectedStatus}
                onChange={(e) => {
                  setSelectedStatus(e.target.value);
                  setState((prev) => ({ ...prev, currentPage: 1 }));
                }}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-[#1d8e85] focus:border-[#1d8e85] text-gray-700 bg-white"
              >
                <option value="">All Status</option>
                <option value="1">Approved</option>
                <option value="0">Pending</option>
                <option value="2">Rejected</option>
              </select>

              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Search transactions..."
                  onChange={handleSearch}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-[#1d8e85] focus:border-[#1d8e85]"
                />
                <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              </div>
              <button 
                className="w-full sm:w-auto px-4 py-2 bg-[#1d8e85] text-white rounded-md text-sm hover:bg-[#166f67] focus:ring-2 focus:ring-[#1d8e85] focus:ring-offset-2 flex items-center justify-center gap-2 transition-colors"
                onClick={exportTransactions}
              >
                <Download className="w-4 h-4" />
                Export
              </button>
            </div>
          </div>
        </div>
      </div>

      {isMobile ? (
        // Mobile Card View
        <div className="p-4">
          <div className="space-y-4">
            {isLoading || loading ? (
              [...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="bg-gray-200 animate-pulse rounded-xl h-48"
                ></div>
              ))
            ) : !transactions || transactions.length === 0 ? (
              <div className="text-center py-12">
                <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <Building className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No transactions found
                </h3>
                <p className="text-gray-500">
                  Your withdrawal history will appear here
                </p>
              </div>
            ) : (
              transactions.map((transaction, index) => (
                <TransactionCard
                  key={transaction._id || index}
                  transaction={transaction}
                  index={index}
                />
              ))
            )}
          </div>
        </div>
      ) : (
        <div className="overflow-x-auto shadow-sm border border-gray-200 rounded-lg">
          <table className="w-full border-collapse">
            <thead className="bg-[#1d8e85] text-white sticky top-0 z-10">
              <tr>
                <th className="px-2 py-2 text-center text-xs font-medium">#</th>
                <th className="px-2 py-2 text-left text-xs font-medium">Transaction ID</th>
                <th className="px-2 py-2 text-left text-xs font-medium">User</th>
                <th className="px-2 py-2 text-center text-xs font-medium">Currency</th>
                <th className="px-2 py-2 text-right text-xs font-medium">Amount</th>
                <th className="px-2 py-2 text-right text-xs font-medium">Charges</th>
                <th className="px-2 py-2 text-center text-xs font-medium">Date & Time</th>
                <th className="px-2 py-2 text-center text-xs font-medium">Status</th>
                <th className="px-2 py-2 text-left text-xs font-medium">Reason/Note</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {isLoading || loading ? (
                [...Array(3)].map((_, i) => (
                  <tr key={i}>
                    {[...Array(9)].map((_, j) => (
                      <td key={j} className="px-2 py-2.5">
                        <div className="bg-gray-200 animate-pulse h-4 w-16 rounded"></div>
                      </td>
                    ))}
                  </tr>
                ))
              ) : !transactions || transactions.length === 0 ? (
                <tr>
                  <td colSpan="9" className="px-2 py-3 text-center text-gray-500">
                    No data found
                  </td>
                </tr>
              ) : (
                transactions.map((transaction, index) => (
                  <tr key={transaction._id || index} className="hover:bg-gray-50">
                    <td className="px-2 py-2.5 text-center text-gray-600 text-xs font-medium">
                      {(state?.currentPage || 1) * (state?.perPage || 10) -
                        ((state?.perPage || 10) - 1) +
                        index}
                    </td>
                    <td className="px-2 py-2.5 text-gray-800 text-xs font-medium">
                      <div className="flex items-center">
                        <span className="truncate max-w-[140px]" title={transaction._id || "-"}>
                          {transaction._id || "-"}
                        </span>
                        {transaction._id && (
                          <button 
                            className="ml-1 text-gray-400 hover:text-[#1d8e85]" 
                            title="Copy ID"
                            onClick={() => {
                              navigator.clipboard.writeText(transaction._id);
                              toast.success("Transaction ID copied to clipboard", { autoClose: 1500 });
                            }}
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                            </svg>
                          </button>
                        )}
                      </div>
                    </td>
                    <td className="px-2 py-2.5 text-gray-800 text-xs">
                      {transaction.userId && transaction.userId.email ? transaction.userId.email : "-"}
                    </td>
                    <td className="px-2 py-2.5 text-center text-gray-800 text-xs">
                      {transaction.currency || "-"}
                    </td>
                    <td className="px-2 py-2.5 text-right text-gray-800 text-xs font-medium">
                      {transaction.amount
                        ? transaction.currency === "INR"
                          ? `₹${parseFloat(transaction.amount).toFixed(2)}`
                          : `$${parseFloat(transaction.amount).toFixed(2)}`
                        : "-"}
                    </td>
                    <td className="px-2 py-2.5 text-center text-gray-700 text-xs font-medium">
                      {transaction.admin_inr_charges
                        ? transaction.currency === "INR"
                          ? `₹${transaction.admin_inr_charges}`
                          : `$${transaction.admin_inr_charges}`
                        : "-"}
                    </td>
                    <td className="px-2 py-2.5 text-center text-gray-700 text-xs whitespace-nowrap">
                      {formatDateWithAmPm(transaction.created_at)}
                    </td>
                    <td className="px-2 py-2.5 text-center">
                      <span className={`inline-flex px-1.5 py-0.5 text-xs font-medium rounded-full ${getStatusColor(transaction.status)}`}>
                        {getStatusText(transaction.status)}
                      </span>
                    </td>
                    <td className="px-2 py-2.5 text-gray-700 text-xs max-w-[150px]">
                      <div className="line-clamp-2 hover:line-clamp-none" title={transaction?.reason || transaction?.note || "-"}>
                        {transaction?.reason || transaction?.note || "-"}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination controls */}
      {pagination.total > 0 && (
        <div className="p-3 flex flex-col sm:flex-row justify-between items-center gap-3 border-t border-gray-200">
          <p className="text-xs text-gray-700">
            Showing <span className="font-medium">{transactions.length}</span> of{' '}
            <span className="font-medium">{pagination.total || 0}</span> transactions
          </p>
          
          <div className="flex justify-center">
            <Pagination
              currentPage={state?.currentPage || 1}
              totalPages={Math.ceil(pagination.total / (state?.perPage || 10))}
              onPageChange={handlePageChange}
            />
          </div>
          
          <div className="flex items-center gap-2 text-xs">
            <span className="text-gray-700">Show</span>
            <select
              value={state?.perPage}
              onChange={(e) => {
                setState({
                  ...state,
                  perPage: e.target.value,
                  currentPage: 1,
                });
              }}
              className="px-2 py-1 border border-gray-300 rounded text-xs focus:ring-1 focus:ring-[#1d8e85] focus:border-[#1d8e85]"
            >
              <option value="10">10</option>
              <option value="30">30</option>
              <option value="50">50</option>
            </select>
            <span className="text-gray-700">entries</span>
          </div>
        </div>
      )}
    </div>
  );
};

const Withdrawal = () => {
  const { data: userData, refetch } = useUserDataQuery();
  const { data: getSetting } = useGetSettingQuery();
  const { data: kycDetails } = useGetkycDetailsQuery();
  const [withdrawRequest, { isLoading: isSubmitting }] = useWithdrawRequestMutation();

  const [formData, setFormData] = useState({
    balanceType: "referral",
    paymentCurrency: "",
    amount: "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [selectedStatus, setSelectedStatus] = useState("");
  const [state, setState] = useState({
    currentPage: 1,
    perPage: 10,
    search: "",
  });

  const [previewData, setPreviewData] = useState([
    { heading: "Fees", subHeading: "0" },
    { heading: "Will Get", subHeading: "0" },
  ]);

  // Set default currency based on user's country
  useEffect(() => {
    if (userData?.data) {
      const defaultCurrency = userData.data.countryCode === 91 ? "INR" : "USD";
      if (formData.paymentCurrency !== defaultCurrency) {
        setFormData(prev => ({ ...prev, paymentCurrency: defaultCurrency }));
      }
    }
  }, [userData?.data, formData.paymentCurrency]);

  // Validation function
  const validate = () => {
    const errors = {};
    const { balanceType, paymentCurrency, amount } = formData;

    if (!balanceType) errors.balanceType = "Balance Type is required";
    
    if (balanceType === "referral" && !paymentCurrency) {
      errors.paymentCurrency = "Payment Currency is required";
    }

    if (!amount) {
      errors.amount = "Amount is required";
    } else if (isNaN(amount) || parseFloat(amount) <= 0) {
      errors.amount = "Amount must be a positive number";
    } else if (balanceType === "referral") {
      // Check min/max withdrawal limits
      const settings = getSetting?.data;
      if (settings) {
        const currency = paymentCurrency || (userData?.data?.countryCode === 91 ? "INR" : "USD");
        const isINR = currency === "INR";
        const min = isINR ? settings.min_withdrawal_inr : settings.min_withdrawal_usd;
        const max = isINR ? settings.max_withdrawal_inr : settings.max_withdrawal_usd;
        
        if (parseFloat(amount) < min || parseFloat(amount) > max) {
          errors.amount = `Amount must be between ${min} and ${max} ${currency}`;
        }
      }
    }

    return errors;
  };

  // Calculate fees and preview amount
  const calculatePreview = useMemo(() => {
    return (amount, paymentCurrency) => {
      if (!getSetting?.data || !amount) return;
  
      const settings = getSetting.data;
      const parsedAmount = parseFloat(amount);
      
      const isINR = paymentCurrency === "INR";
      const minLimit = isINR ? settings.min_withdrawal_inr : settings.min_withdrawal_usd;
      const maxLimit = isINR ? settings.max_withdrawal_inr : settings.max_withdrawal_usd;
      const commission = isINR ? settings.withdrawal_commission_inr : settings.withdrawal_commission_usd;
      
      if (parsedAmount < minLimit || parsedAmount > maxLimit) {
        toast.warning(`Withdrawal amount should be between ${minLimit} and ${maxLimit} ${paymentCurrency}.`);
        return;
      }
      
      const fees = (parsedAmount * commission) / 100;
      const willGet = parsedAmount - fees;
      
      setPreviewData([
        { heading: "Fees", subHeading: `${fees.toFixed(2)} ${paymentCurrency}` },
        { heading: "Will Get", subHeading: `${willGet.toFixed(2)} ${paymentCurrency}` },
      ]);
    };
  }, [getSetting?.data]);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Validate numbers for amount field
    if (name === "amount" && !/^\d*\.?\d*$/.test(value)) {
      return;
    }

    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (value) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
    
    // Reset preview when amount changes
    if (name === "amount" && !value) {
      setPreviewData([
        { heading: "Fees", subHeading: "0" },
        { heading: "Will Get", subHeading: "0" },
      ]);
    }
  };

  // Calculate preview on amount blur
  const onBlurAmount = (e) => {
    if (e.target.value) {
      calculatePreview(e.target.value, formData.paymentCurrency || (userData?.data?.countryCode === 91 ? "INR" : "USD"));
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    
    try {
      const { amount, balanceType, paymentCurrency } = formData;
      const currency = paymentCurrency || (userData?.data?.countryCode === 91 ? "INR" : "USD");
      
      let requestData;
      if (balanceType === "referral") {
        requestData = {
          amount: parseFloat(amount),
          currency,
          currencyType: currency
        };
      } else if (balanceType === "JAIMAX") {
        requestData = { 
          amount: parseFloat(amount), 
          currency: balanceType 
        };
      } else {
        toast.error("Invalid balance type");
        return;
      }
      
      const response = await withdrawRequest(requestData).unwrap();
      
      if (response.success) {
        // Reset form
        setFormData({
          balanceType: "referral",
          paymentCurrency: userData?.data?.countryCode === 91 ? "INR" : "USD",
          amount: "",
        });
        
        setPreviewData([
          { heading: "Fees", subHeading: "0" },
          { heading: "Will Get", subHeading: "0" },
        ]);
        
        toast.success(response.message || "Withdrawal request submitted successfully");
        refetch(); // Refresh user data
      } else {
        toast.error(response.message || "Failed to submit withdrawal request");
      }
    } catch (error) {
      toast.error(error?.data?.message || "An error occurred while processing your request");
    }
  };

  // Clear validation errors
  const clearErrors = () => setErrors({});

  // Currency symbol helper
  const addSymbolPlaceholder = (value) => {
    return value === "INR" ? "₹" : value === "USD" ? "$" : "";
  };

  // Handle balance type change
  const onChangeBalanceType = (e) => {
    const newBalanceType = e.target.value;
    setFormData({
      amount: "",
      balanceType: newBalanceType,
      paymentCurrency: newBalanceType === "referral" 
        ? (userData?.data?.countryCode === 91 ? "INR" : "USD") 
        : "",
    });
    
    setPreviewData([
      { heading: "Fees", subHeading: "0" },
      { heading: "Will Get", subHeading: "0" },
    ]);
  };

  // Clean up any timeouts on unmount
  useEffect(() => {
    return () => {
      if (window.searchTimeout) {
        clearTimeout(window.searchTimeout);
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-4">
      <div className="max-w-screen mx-auto px-3 sm:px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 auto-rows-auto">
          {/* Left Column - Withdrawal Form */}
          <div className="lg:col-span-4 h-full">
            <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm h-full">
              <div className="mb-4">
                <h2 className="text-base font-semibold text-gray-900 mb-3">
                  Withdrawal Request
                </h2>

                {/* Balance Display */}
                <div className="bg-gradient-to-r from-[#1d8e85] to-[#16a085] rounded-lg p-3 text-white mb-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs opacity-90">Available Balance</p>
                      <p className="text-lg font-bold">
                        ₹{userData?.data?.Inr?.toLocaleString("en-IN") || "0"}
                      </p>
                    </div>
                    <CreditCard className="w-5 h-5 opacity-80" />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="balanceType"
                    className="block text-xs font-medium text-gray-700 mb-1"
                  >
                    Source Account
                  </label>
                  <select
                    id="balanceType"
                    name="balanceType"
                    value={formData.balanceType}
                    onChange={onChangeBalanceType}
                    onClick={clearErrors}
                    className="w-full text-white px-2.5 py-1.5 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-[#1d8e85] focus:border-[#1d8e85] bg-[#1d8e85]"
                  >
                    <option value="referral">Available Balance</option>
                    <option value="JAIMAX">Purchase Token (JaiMax)</option>
                  </select>
                  {errors.balanceType && (
                    <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                      <AlertTriangle className="w-3 h-3" />
                      {errors.balanceType}
                    </p>
                  )}
                  {formData.balanceType === "referral" && (
                    <p className="text-gray-600 mt-1 text-xs">
                      Total Available: ₹{userData?.data?.Inr?.toFixed(2) || "0.00"}
                    </p>
                  )}
                </div>

                {formData.balanceType === "referral" && (
                  <>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">
                          Currency
                        </label>
                        <div className="px-2.5 py-1.5 bg-gray-100 border border-gray-300 rounded text-gray-900 font-medium text-center text-sm">
                          {formData.paymentCurrency ||
                            (userData?.data?.countryCode === 91 ? "INR" : "USD")}
                        </div>
                      </div>
                      <div>
                        <label
                          htmlFor="amount"
                          className="block text-xs font-medium text-gray-700 mb-1"
                        >
                          Amount *
                        </label>
                        <input
                          id="amount"
                          type="text"
                          placeholder={`Enter Amount ${addSymbolPlaceholder(
                            formData.paymentCurrency || (userData?.data?.countryCode === 91 ? "INR" : "USD")
                          )}`}
                          value={formData.amount}
                          onChange={handleInputChange}
                          onBlur={onBlurAmount}
                          onClick={() => setErrors(prev => ({ ...prev, amount: undefined }))}
                          name="amount"
                          autoComplete="off"
                          className={`w-full px-2.5 py-1.5 text-sm border rounded focus:ring-2 focus:ring-[#1d8e85] focus:border-[#1d8e85] ${
                            errors.amount
                              ? "border-red-300 bg-red-50"
                              : "border-gray-300"
                          }`}
                        />
                      </div>
                    </div>
                    {errors.amount && (
                      <p className="text-xs text-red-600 flex items-center gap-1">
                        <AlertTriangle className="w-3 h-3" />
                        {errors.amount}
                      </p>
                    )}

                    {/* Transaction Summary */}
                    {formData.amount && (
                      <div className="border border-gray-200 rounded p-3 bg-gray-50">
                        <h3 className="text-xs font-medium text-gray-900 mb-2">
                          Transaction Summary
                        </h3>
                        <div className="space-y-1.5 text-xs">
                          {previewData.map((data, i) => (
                            <div key={i} className="flex justify-between">
                              <span
                                className={
                                  data.heading === "Fees"
                                    ? "text-red-600"
                                    : "text-gray-600"
                                }
                              >
                                {data.heading}
                              </span>
                              <span
                                className={
                                  data.heading === "Will Get"
                                    ? "text-[#1d8e85] font-semibold"
                                    : "font-medium"
                                }
                              >
                                {data.subHeading}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </>
                )}

                {formData.balanceType === "JAIMAX" && (
                  <div className="text-center py-4">
                    <h5 className="text-gray-600 text-sm font-medium">
                      Coming Soon
                    </h5>
                    <p className="text-gray-500 text-xs mt-1">
                      JaiMax token withdrawal will be available soon
                    </p>
                  </div>
                )}

                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={isSubmitting || formData.balanceType === "JAIMAX"}
                  className="w-full bg-[#1d8e85] text-white py-2 px-3 text-sm rounded font-medium hover:bg-[#166f67] focus:ring-2 focus:ring-[#1d8e85] focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-1.5 transition-colors"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Processing...
                    </>
                  ) : (
                    <>
                      Submit Withdrawal
                      <ArrowRight className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Right Column - Bank Details & Terms */}
          <div className="lg:col-span-8 space-y-4 flex flex-col">
            {/* Bank Details */}
            <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-base font-semibold text-gray-900">
                  Destination Account
                </h2>
              </div>

              <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                <div>
                  <label className="block text-xs font-medium text-gray-500 uppercase mb-0.5">
                    Account Holder
                  </label>
                  <p className="text-sm text-gray-900 font-medium">
                    {kycDetails?.data?.name || "Not Available"}
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-500 uppercase mb-0.5">
                    Account Number
                  </label>
                  <p className="text-sm text-gray-900 font-medium break-all">
                    {kycDetails?.data?.bank_account || "Not Available"}
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-500 uppercase mb-0.5">
                    {userData?.data?.countryCode === 91 ? "IFSC" : "Bank"} Code
                  </label>
                  <p className="text-sm text-gray-900 font-medium">
                    {kycDetails?.data?.ifsc_code || "Not Available"}
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-500 uppercase mb-0.5">
                    Bank Name
                  </label>
                  <p className="text-sm text-gray-900 font-medium">
                    {kycDetails?.data?.bank_name || "Not Available"}
                  </p>
                </div>
              </div>
            </div>

            {/* Processing Information */}
            <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
              <h2 className="text-base font-semibold text-gray-900 mb-3">
                Terms & Conditions
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-3">
                <div className="flex items-center gap-2 p-2 bg-blue-50 rounded border border-blue-200">
                  <Clock className="w-4 h-4 text-blue-600 flex-shrink-0" />
                  <div>
                    <p className="text-xs font-medium text-blue-900">
                      Processing Time
                    </p>
                    <p className="text-[10px] text-blue-700">Within 24 hours</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 p-2 bg-green-50 rounded border border-green-200">
                  <Shield className="w-4 h-4 text-green-600 flex-shrink-0" />
                  <div>
                    <p className="text-xs font-medium text-green-900">
                      Working Hours
                    </p>
                    <p className="text-[10px] text-green-700">
                      Mon-Fri, 10 AM - 4 PM
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 p-2 bg-orange-50 rounded border border-orange-200">
                  <Info className="w-4 h-4 text-orange-600 flex-shrink-0" />
                  <div>
                    <p className="text-xs font-medium text-orange-900">
                      Processing Fee
                    </p>
                    <p className="text-[10px] text-orange-700">
                      {getSetting?.data?.withdrawal_commission_inr || "0.5"}%
                      per transaction
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded p-3">
                <div className="flex gap-2">
                  <AlertTriangle className="w-4 h-4 text-yellow-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-xs font-semibold text-yellow-800">
                      Important Notes
                    </h3>
                    <ul className="text-xs text-yellow-700 mt-1.5 space-y-1">
                      <li>• Complete KYC and get approved status before withdrawal</li>
                      <li>• Banking hours: 10 AM to 4 PM (Mon-Fri)</li>
                      <li>• Funds credited within 24 hours of withdrawal request</li>
                      <li>• Please verify bank details before initiating withdrawal</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Transaction History */}
        <div className="mt-4">
          <TransactionTable
            state={state}
            setState={setState}
            selectedStatus={selectedStatus}
            setSelectedStatus={setSelectedStatus}
            handleSearch={e => {
              clearTimeout(window.searchTimeout);
              window.searchTimeout = setTimeout(() => {
                setState({ ...state, search: e.target.value, currentPage: 1 });
              }, 500);
            }}
            loading={loading}
          />
        </div>
      </div>
    </div>
  );
};

export default Withdrawal;