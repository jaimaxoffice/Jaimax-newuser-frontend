
// import React, { useState, useEffect } from "react";
// import {
//   AlertTriangle,
//   CheckCircle,
//   Info,
//   Wallet,
//   Smartphone,
//   Search,
//   Copy,
//   CreditCard,
//   Building,
//   ArrowRight,
// } from "lucide-react";

// import {
//   useUsdtWithdrawHistoryQuery,
//   useInrToTokenPreviewQuery,
//   useUsdtWithdrawRequestMutation,
//   usePreviewTokenWithdrawMutation,
//   useGetSettingQuery,
// } from "./usdtWithdrawalApiSlice";
// import {
//   useWithdrawHistoryQuery,
// } from "./withdrawApiSlice";

// import Pagination from "../../../../ReusableComponents/pagination/pagination";
// import ReusableTable from "../../../../ReusableComponents/tables/reusableTable";
// import { toast } from "../../../../ReusableComponents/Toasts/Toasts";
// import Loader from "../../../../ReusableComponents/Loader/loader";

// const copyToClipboard = (text) => {
//   navigator.clipboard.writeText(text);
//   toast.success("Copied");
// };

// // ─────────────────────────────────────────────
// // USDT Transaction Table (for tab)
// // ─────────────────────────────────────────────
// const UsdtTransactionTableTab = ({
//   state,
//   setState,
//   selectedStatus,
//   setSelectedStatus,
//   handleSearch,
// }) => {
//   const [isMobile, setIsMobile] = useState(false);

//   const queryString = `page=${state.page}&limit=${state.limit}&status=${selectedStatus}&search=${state.search}`;
//   const { data, isLoading } = useUsdtWithdrawHistoryQuery(queryString);

//   const transactions = data?.data?.withdrawRequests || [];
//   const pagination = data?.data?.pagination || {};

//   useEffect(() => {
//     const checkMobile = () => setIsMobile(window.innerWidth < 768);
//     checkMobile();
//     window.addEventListener("resize", checkMobile);
//     return () => window.removeEventListener("resize", checkMobile);
//   }, []);

//   const getStatusColor = (status) => {
//     switch (status) {
//       case 1:
//         return "border-green-500 text-green-600 bg-green-50";
//       case 0:
//         return "border-yellow-500 text-yellow-600 bg-yellow-50";
//       case 2:
//         return "border-red-500 text-red-600 bg-red-50";
//       default:
//         return "border-gray-400 text-gray-500 bg-gray-50";
//     }
//   };

//   const getStatusText = (status) => {
//     switch (status) {
//       case 1:
//         return "Completed";
//       case 2:
//         return "Failed";
//       case 0:
//         return "Pending";
//       default:
//         return "Unknown";
//     }
//   };

//   const formatDate = (isoString) => {
//     if (!isoString) return "-";
//     const clean = isoString.replace("Z", "").split(".")[0];
//     const [datePart, timePart] = clean.split("T");
//     const [year, month, day] = datePart.split("-");
//     let [hours, minutes] = timePart.split(":");
//     hours = parseInt(hours, 10);
//     const ampm = hours >= 12 ? "PM" : "AM";
//     hours = hours % 12 || 12;
//     return `${day}-${month}-${year} ${hours}:${minutes} ${ampm}`;
//   };

//   const copyText = (text, label) => {
//     navigator.clipboard.writeText(text);
//     toast.success(`${label} copied`);
//   };

// const UsdtCard = ({ transaction, index }) => (
//   <div className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 group">
//     {/* Top accent bar */}
//     <div className="h-1 bg-gradient-to-r from-[#1d8d84] via-[#00d4aa] to-[#1d8d84]"></div>

//     {/* Header - Transaction ID & Status */}
//     <div className="p-2.5 sm:p-3 bg-gradient-to-r from-gray-50 to-white flex items-center justify-between gap-2">
//       <div className="flex items-center gap-2 min-w-0 flex-1">
//         <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-[#1d8d84] to-[#1e8064] text-white flex items-center justify-center flex-shrink-0">
//           <Wallet className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
//         </div>
//         <div className="min-w-0 flex-1">
//           <span className="text-[9px] sm:text-[10px] text-gray-500 uppercase block leading-tight font-medium">
//             Transaction ID
//           </span>
//           <div className="flex items-center gap-1">
//             <span
//               className="text-[11px] sm:text-xs font-bold text-gray-800 truncate block group-hover:text-[#1d8d84] transition-colors"
//               title={transaction._id}
//             >
//               {transaction._id
//                 ? window.innerWidth < 400
//                   ? `...${transaction._id.slice(-6)}`
//                   : `...${transaction._id.slice(-10)}`
//                 : "-"}
//             </span>
//             {transaction._id && (
//               <button
//                 onClick={() => {
//                   navigator.clipboard.writeText(transaction._id);
//                   toast.success("ID copied");
//                 }}
//                 className="text-gray-400 hover:text-[#1d8d84] flex-shrink-0"
//               >
//                 <Copy className="w-3 h-3" />
//               </button>
//             )}
//           </div>
//         </div>
//       </div>
//       <span
//         className={`text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full border flex-shrink-0 whitespace-nowrap ${getStatusColor(
//           transaction.status
//         )}`}
//       >
//         <span className="inline-block w-1.5 h-1.5 rounded-full bg-current mr-1 align-middle animate-pulse"></span>
//         {getStatusText(transaction.status)}
//       </span>
//     </div>

//     {/* Amount Section */}
//     <div className="px-2.5 sm:px-4 py-2.5 sm:py-3 bg-gradient-to-r from-gray-50 to-white border-y border-gray-100">
//       {/* Mobile: Stack vertically, Desktop: Side by side */}
//       <div className="flex flex-col xs:flex-row xs:justify-between xs:items-center gap-2">
//         {/* Amount */}
//         <div className="flex-1">
//           <span className="text-[9px] sm:text-[10px] text-[#1d8d84] uppercase block font-medium leading-tight">
//             Amount
//           </span>
//           <span className="text-base sm:text-lg font-extrabold text-gray-800 group-hover:text-[#1d8d84] transition-colors">
//             {transaction.amount_in_token
//               ? `${parseFloat(transaction.amount_in_token).toFixed(2)} ${transaction.currency}`
//               : "-"}
//           </span>
//           <span className="text-[10px] sm:text-xs text-gray-500 block">
//             ≈ ₹{transaction.amount_in_inr?.toFixed(2) || "-"}
//           </span>
//         </div>

//         {/* Fees - Row on mobile */}
//         <div className="flex gap-3 xs:gap-4">
//           <div className="text-left xs:text-right">
//             <span className="text-[9px] sm:text-[10px] text-teal-500 uppercase block font-semibold leading-tight">
//               Fee (INR)
//             </span>
//             <span className="text-xs sm:text-sm font-bold text-teal-600">
//               ₹{transaction.admin_inr_charges?.toFixed(2) || "-"}
//             </span>
//           </div>
//           <div className="text-left xs:text-right">
//             <span className="text-[9px] sm:text-[10px] text-teal-500 uppercase block font-semibold leading-tight">
//               Fee (USDT)
//             </span>
//             <span className="text-xs sm:text-sm font-bold text-teal-600">
//               ${transaction.total_fee_token?.toFixed(2) || "-"}
//             </span>
//           </div>
//         </div>
//       </div>
//     </div>

//     {/* Details Grid */}
//     <div className="p-2.5 sm:p-3 space-y-2">
//       <div className="grid grid-cols-2 gap-1.5 sm:gap-2">
//         <div className="rounded bg-gray-50 p-1.5 sm:p-2 border border-gray-100 group-hover:border-[#1d8d84]/20 transition-colors">
//           <span className="text-[9px] sm:text-[10px] text-gray-500 uppercase block mb-0.5 font-medium">
//             Token Type
//           </span>
//           <span className="font-bold text-gray-800 text-xs sm:text-sm">
//             {transaction.currency || "-"}
//           </span>
//         </div>
//         <div className="rounded bg-gray-50 p-1.5 sm:p-2 border border-gray-100 group-hover:border-[#1d8d84]/20 transition-colors">
//           <span className="text-[9px] sm:text-[10px] text-gray-500 uppercase block mb-0.5 font-medium">
//             Rate
//           </span>
//           <span className="font-bold text-gray-800 text-xs sm:text-sm">
//             <span className="px-1 sm:px-1.5 py-0.5 bg-blue-50 text-blue-700 rounded text-[10px] sm:text-xs">
//               ₹{transaction.inr_price || "-"}
//             </span>
//           </span>
//         </div>
//       </div>

//       {/* Date - Full width */}
//       <div className="rounded bg-gray-50 p-1.5 sm:p-2 border border-gray-100 group-hover:border-[#1d8d84]/20 transition-colors">
//         <span className="text-[9px] sm:text-[10px] text-gray-500 uppercase block mb-0.5 font-medium">
//           Date & Time
//         </span>
//         <span className="font-bold text-gray-800 text-[10px] sm:text-xs">
//           {formatDate(transaction.created_at)}
//         </span>
//       </div>

//       {/* Tx Hash */}
//       {transaction.txn_hash && (
//         <div className="rounded bg-gray-50 p-1.5 sm:p-2 border border-gray-100 group-hover:border-[#1d8d84]/20 transition-colors">
//           <span className="text-[9px] sm:text-[10px] text-gray-500 uppercase block mb-0.5 font-medium">
//             Tx Hash
//           </span>
//           <div className="flex items-center gap-1">
//             <span
//               className="font-mono text-[10px] sm:text-xs text-gray-800 truncate flex-1"
//               title={transaction.txn_hash}
//             >
//               {transaction.txn_hash}
//             </span>
//             <button
//               onClick={() => copyText(transaction.txn_hash, "Tx Hash")}
//               className="text-[#1d8d84] hover:text-[#1e8064] flex-shrink-0 p-0.5"
//             >
//               <Copy className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
//             </button>
//           </div>
//         </div>
//       )}

//       {/* Reason / Note */}
//       {(transaction.reason || transaction.note) && (
//         <div className="pt-1.5 mt-1 border-t border-dashed border-gray-200">
//           {transaction.reason && (
//             <div className="mb-1.5">
//               <div className="flex items-center gap-1 mb-0.5">
//                 <span className="w-1 h-2.5 bg-red-400 rounded-full"></span>
//                 <span className="text-[9px] sm:text-[10px] text-gray-500 uppercase font-medium">
//                   Reason
//                 </span>
//               </div>
//               <p className="text-[10px] sm:text-[11px] text-gray-700 bg-red-50 p-1.5 rounded border border-red-100 break-words">
//                 {transaction.reason}
//               </p>
//             </div>
//           )}
//           {transaction.note && (
//             <div>
//               <div className="flex items-center gap-1 mb-0.5">
//                 <span className="w-1 h-2.5 bg-[#1d8d84] rounded-full"></span>
//                 <span className="text-[9px] sm:text-[10px] text-gray-500 uppercase font-medium">
//                   Note
//                 </span>
//               </div>
//               <p className="text-[10px] sm:text-[11px] text-gray-700 bg-gray-50 p-1.5 rounded border border-gray-100 break-words">
//                 {transaction.note}
//               </p>
//             </div>
//           )}
//         </div>
//       )}
//     </div>

//     {/* Bottom accent */}
//     <div className="h-0.5 bg-gradient-to-r from-transparent via-gray-200 to-transparent opacity-70"></div>
//   </div>
// );

//   return (
//     <div>
//       <div className="flex flex-col sm:flex-row gap-3 mb-4">
//         <select
//           value={selectedStatus}
//           onChange={(e) => {
//             setSelectedStatus(e.target.value);
//             setState((prev) => ({ ...prev, page: 1 }));
//           }}
//           className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm bg-white focus:ring-2 focus:ring-[#1d8d84]"
//         >
//           <option value="">All Status</option>
//           <option value="1">Completed</option>
//           <option value="0">Pending</option>
//           <option value="2">Failed</option>
//         </select>
//         <div className="relative flex-1">
//           <input
//             type="text"
//             placeholder="Search USDT transactions..."
//             onChange={handleSearch}
//             className="w-full pl-10 pr-4 py-2 bg-white border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-[#1d8d84]"
//           />
//           <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
//         </div>
//       </div>

//       {isMobile ? (
//         <div className="space-y-4">
//           {isLoading ? (
//             [...Array(3)].map((_, i) => (
//               <div
//                 key={i}
//                 className="bg-gray-200 animate-pulse rounded-lg h-48"
//               ></div>
//             ))
//           ) : transactions.length === 0 ? (
//             <div className="text-center py-12">
//               <Wallet className="w-16 h-16 text-gray-400 mx-auto mb-4" />
//               <h3 className="text-lg font-medium text-gray-900 mb-2">
//                 No USDT transactions found
//               </h3>
//               <p className="text-gray-500">
//                 Your USDT withdrawal history will appear here
//               </p>
//             </div>
//           ) : (
//             transactions.map((transaction, index) => (
//               <UsdtCard
//                 key={transaction._id}
//                 transaction={transaction}
//                 index={index}
//               />
//             ))
//           )}
//         </div>
//       ) : (
//         <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300">
//           <table className="w-full border">
//             <thead className="bg-[#1d8d84] text-white">
//               <tr>
//                 <th className="px-3 py-2 text-left text-xs font-medium">#</th>
//                 <th className="px-3 py-2 text-left text-xs font-medium">
//                   Transaction ID
//                 </th>
//                 <th className="px-3 py-2 text-center text-xs font-medium">
//                   Token Type
//                 </th>
//                 <th className="px-3 py-2 text-center text-xs font-medium">
//                   Tokens
//                 </th>
//                 <th className="px-3 py-2 text-center text-xs font-medium">
//                   Platform Fee (USDT)
//                 </th>
//                 <th className="px-3 py-2 text-center text-xs font-medium">
//                   Amount (INR)
//                 </th>
//                 <th className="px-3 py-2 text-center text-xs font-medium">
//                   Rate
//                 </th>
//                 <th className="px-3 py-2 text-center text-xs font-medium">
//                   Platform Fee (INR)
//                 </th>
//                 <th className="px-3 py-2 text-center text-xs font-medium">
//                   Date
//                 </th>
//                 <th className="px-3 py-2 text-center text-xs font-medium">
//                   Status
//                 </th>
//                 <th className="px-3 py-2 text-left text-xs font-medium">
//                   Tx Hash
//                 </th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-gray-200">
//               {isLoading ? (
//                 [...Array(3)].map((_, i) => (
//                   <tr key={i}>
//                     {[...Array(11)].map((_, j) => (
//                       <td key={j} className="px-3 py-3">
//                         <div className="bg-gray-200 animate-pulse h-4 rounded"></div>
//                       </td>
//                     ))}
//                   </tr>
//                 ))
//               ) : transactions.length === 0 ? (
//                 <tr>
//                   <td
//                     colSpan="11"
//                     className="px-3 py-8 text-center text-gray-500"
//                   >
//                     No USDT transactions found
//                   </td>
//                 </tr>
//               ) : (
//                 transactions.map((transaction, index) => (
//                   <tr key={transaction._id} className="hover:bg-gray-50">
//                     <td className="px-3 py-3 text-xs">
//                       {((state.page || 1) - 1) * (state.limit || 10) +
//                         index +
//                         1}
//                     </td>
//                     <td className="px-3 py-3 text-xs">
//                       <span className="max-w-[140px]" title={transaction._id}>
//                         {transaction._id || "-"}
//                       </span>
//                     </td>
//                     <td className="px-3 py-3 text-center text-xs font-medium">
//                       {transaction.currency || "-"}
//                     </td>
//                     <td className="px-3 py-3 text-center text-xs font-medium">
//                       {transaction.amount_in_token
//                         ? parseFloat(transaction.amount_in_token).toFixed(2)
//                         : "-"}
//                     </td>
//                     <td className="px-3 py-3 text-center text-xs font-medium">
//                       {transaction.total_fee_token
//                         ? parseFloat(transaction.total_fee_token).toFixed(2)
//                         : "-"}
//                     </td>
//                     <td className="px-3 py-3 text-center text-xs font-medium text-gray-600">
//                       ₹{transaction.amount_in_inr?.toFixed(2) || "-"}
//                     </td>
//                     <td className="px-3 py-3 text-center text-xs">
//                       <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full font-medium">
//                         ₹{transaction.inr_price || "-"}
//                       </span>
//                     </td>
//                     <td className="px-3 py-3 text-center text-xs text-teal-600 font-medium">
//                       ₹{transaction.admin_inr_charges?.toFixed(2) || "-"}
//                     </td>
//                     <td className="px-3 py-3 text-center text-xs whitespace-nowrap">
//                       {formatDate(transaction.created_at)}
//                     </td>
//                     <td className="px-3 py-3 text-center">
//                       <span
//                         className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(
//                           transaction.status
//                         )}`}
//                       >
//                         {getStatusText(transaction.status)}
//                       </span>
//                     </td>
//                     <td className="px-3 py-3 text-xs">
//                       {transaction.txn_hash ? (
//                         <div className="flex items-center gap-1">
//                           <span
//                             className="truncate max-w-[100px] font-mono"
//                             title={transaction.txn_hash}
//                           >
//                             {transaction.txn_hash.slice(0, 8)}...
//                           </span>
//                           <button
//                             onClick={() =>
//                               copyText(transaction.txn_hash, "Tx Hash")
//                             }
//                             className="text-[#1d8d84] hover:text-[#1e8064]"
//                           >
//                             <Copy className="w-3 h-3" />
//                           </button>
//                         </div>
//                       ) : (
//                         "-"
//                       )}
//                     </td>
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </table>
//         </div>
//       )}

//       {pagination?.totalPages > 1 && (
//         <div className="p-3 flex justify-center border-t border-gray-200 mt-4">
//           <Pagination
//             currentPage={state?.page || 1}
//             totalPages={pagination?.totalPages || 1}
//             onPageChange={(page) => setState((prev) => ({ ...prev, page }))}
//           />
//         </div>
//       )}
//     </div>
//   );
// };

// // ─────────────────────────────────────────────
// // INR Transaction Table (for tab in USDT page)
// // ─────────────────────────────────────────────
// // ─────────────────────────────────────────────
// // INR Transaction Table (for tab in USDT page)
// // ─────────────────────────────────────────────
// const InrTransactionTableTab = ({
//   state,
//   setState,
//   selectedStatus,
//   setSelectedStatus,
//   handleSearch,
// }) => {
//   const [isMobile, setIsMobile] = useState(false);

//   // Fix: Build query string properly using URLSearchParams
//   const queryString = React.useMemo(() => {
//     const params = new URLSearchParams();
//     params.append("page", state?.currentPage || 1);
//     params.append("limit", state?.perPage || 10);
//     if (selectedStatus) params.append("status", selectedStatus);
//     if (state?.search) params.append("search", state.search);
//     return params.toString();
//   }, [state?.currentPage, state?.perPage, selectedStatus, state?.search]);

//   const { data, isLoading, isFetching } = useWithdrawHistoryQuery(queryString);

//   const transactions = data?.data?.withdrawRequests || [];
//   const pagination = data?.data?.pagination || {};

//   // Debug: Log to check data flow
//   useEffect(() => {
//     // console.log("INR Tab - Query String:", queryString);
//     // console.log("INR Tab - API Response:", data);
//     // console.log("INR Tab - Transactions:", transactions);
//     // console.log("INR Tab - isLoading:", isLoading, "isFetching:", isFetching);
//   }, [queryString, data, transactions, isLoading, isFetching]);

//   useEffect(() => {
//     const checkMobile = () => setIsMobile(window.innerWidth < 768);
//     checkMobile();
//     window.addEventListener("resize", checkMobile);
//     return () => window.removeEventListener("resize", checkMobile);
//   }, []);

//   const getStatusColor = (status) => {
//     switch (status) {
//       case 1:
//         return "border-green-500 text-green-600 bg-green-50";
//       case 0:
//         return "border-yellow-500 text-yellow-600 bg-yellow-50";
//       case 2:
//         return "border-red-500 text-red-600 bg-red-50";
//       default:
//         return "border-gray-400 text-gray-500 bg-gray-50";
//     }
//   };

//   const getStatusText = (status) => {
//     switch (status) {
//       case 1:
//         return "Approved";
//       case 0:
//         return "Pending";
//       case 2:
//         return "Rejected";
//       default:
//         return "Unknown";
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

//   const columns = React.useMemo(
//     () => [
//       {
//         header: "#",
//         accessor: "index",
//         render: (row, index) => (
//           <span className="text-center text-gray-600 font-medium">
//             {((state?.currentPage || 1) - 1) * (state?.perPage || 10) +
//               index +
//               1}
//           </span>
//         ),
//       },
//       {
//         header: "Transaction ID",
//         accessor: "_id",
//         render: (row) => (
//           <div className="flex items-center">
//             <span className="truncate max-w-[140px]" title={row._id || "-"}>
//               {row._id || "-"}
//             </span>

//           </div>
//         ),
//       },
//       {
//         header: "User",
//         accessor: "userId",
//         render: (row) => (
//           <span className="truncate max-w-[120px] block" title={row.userId?.email}>
//             {row.userId?.email || "-"}
//           </span>
//         ),
//       },
//       {
//         header: "Currency",
//         accessor: "currency",
//         render: (row) => (
//           <span className="text-center">{row.currency || "-"}</span>
//         ),
//       },
//       {
//         header: "Amount",
//         accessor: "amount",
//         render: (row) => (
//           <span className="text-right font-medium">
//             {row.amount
//               ? row.currency === "INR"
//                 ? `₹${parseFloat(row.amount).toFixed(2)}`
//                 : `$${parseFloat(row.amount).toFixed(2)}`
//               : "-"}
//           </span>
//         ),
//       },
//       {
//         header: "Charges",
//         accessor: "admin_inr_charges",
//         render: (row) => (
//           <span className="text-center font-medium">
//             {row.admin_inr_charges
//               ? row.currency === "INR"
//                 ? `₹${row.admin_inr_charges}`
//                 : `$${row.admin_inr_charges}`
//               : "-"}
//           </span>
//         ),
//       },
//       {
//         header: "Date & Time",
//         accessor: "created_at",
//         render: (row) => (
//           <span className="text-center whitespace-nowrap">
//             {formatDateWithAmPm(row.created_at)}
//           </span>
//         ),
//       },
//       {
//         header: "Status",
//         accessor: "status",
//         render: (row) => (
//           <span
//             className={`inline-flex px-1.5 py-0.5 text-xs font-medium rounded-full ${getStatusColor(
//               row.status
//             )}`}
//           >
//             {getStatusText(row.status)}
//           </span>
//         ),
//       },
//       {
//         header: "Reason/Note",
//         accessor: "reason",
//         render: (row) => (
//           <div
//             className="max-w-[150px] line-clamp-2 hover:line-clamp-none"
//             title={row?.reason || row?.note || "-"}
//           >
//             {row?.reason || row?.note || "-"}
//           </div>
//         ),
//       },
//     ],
//     [state?.currentPage, state?.perPage]
//   );

//   // Mobile card
//   const InrCard = ({ transaction, index }) => (
//     <div className="bg-white rounded-md overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 group">
//       <div className="h-1 bg-gradient-to-r from-[#1d8e85] via-[#25b5aa] to-[#1d8e85]"></div>

//       <div className="p-2.5 bg-gradient-to-r from-gray-50 to-white flex items-center justify-between gap-2">
//         <div className="flex items-center gap-2 min-w-0 flex-1">
//           <div className="flex items-center justify-center w-7 h-7 rounded-full bg-gradient-to-br from-[#1d8e85] to-[#106b64] text-white shadow-sm flex-shrink-0">
//             <span className="text-xs font-bold">
//               {((state?.currentPage || 1) - 1) * (state?.perPage || 10) +
//                 index +
//                 1}
//             </span>
//           </div>
//           <div className="min-w-0 flex-1">
//             <span className="text-[9px] sm:text-[10px] text-gray-500 uppercase block font-medium leading-tight">
//               Transaction ID
//             </span>
//             <div className="flex items-center gap-1">
//               <span
//                 className="text-[11px] sm:text-xs font-bold text-gray-800 truncate block group-hover:text-[#1d8e85] transition-colors"
//                 title={transaction._id}
//               >
//                 {transaction._id ? `...${transaction._id.slice(-8)}` : "-"}
//               </span>

//             </div>
//           </div>
//         </div>
//         <span
//           className={`text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full border flex-shrink-0 whitespace-nowrap ${getStatusColor(
//             transaction.status
//           )}`}
//         >
//           <span className="inline-block w-1.5 h-1.5 rounded-full bg-current mr-1 align-middle animate-pulse"></span>
//           {getStatusText(transaction.status)}
//         </span>
//       </div>

//       <div className="px-2.5 sm:px-3 py-2.5 bg-gradient-to-r from-gray-50 to-white border-y border-gray-100">
//         <div className="flex justify-between items-center">
//           <div>
//             <span className="text-[9px] sm:text-[10px] text-[#1d8e85] uppercase block font-medium leading-tight">
//               Amount
//             </span>
//             <span className="text-sm sm:text-base font-extrabold text-gray-800 group-hover:text-[#1d8e85] transition-colors">
//               {transaction.amount
//                 ? transaction.currency === "INR"
//                   ? `₹${parseFloat(transaction.amount).toFixed(2)}`
//                   : `$${parseFloat(transaction.amount).toFixed(2)}`
//                 : "-"}
//             </span>
//           </div>
//           <div className="text-right">
//             <span className="text-[9px] sm:text-[10px] text-red-500 uppercase block font-medium leading-tight">
//               Fee
//             </span>
//             <span className="text-xs sm:text-sm font-bold text-red-600">
//               {transaction.admin_inr_charges
//                 ? transaction.currency === "INR"
//                   ? `₹${transaction.admin_inr_charges}`
//                   : `$${transaction.admin_inr_charges}`
//                 : "-"}
//             </span>
//           </div>
//         </div>
//       </div>

//       <div className="p-2.5 text-xs space-y-2">
//         <div className="grid grid-cols-2 gap-1.5 sm:gap-2">
//           <div className="rounded bg-gray-50 p-1.5 border border-gray-100 group-hover:border-[#1d8e85]/20 transition-colors">
//             <span className="text-[9px] sm:text-[10px] text-gray-500 uppercase block mb-0.5 font-medium">
//               Currency
//             </span>
//             <span className="font-bold text-gray-800 text-xs sm:text-sm">
//               {transaction.currency || "-"}
//             </span>
//           </div>
//           <div className="rounded bg-gray-50 p-1.5 border border-gray-100 group-hover:border-[#1d8e85]/20 transition-colors">
//             <span className="text-[9px] sm:text-[10px] text-gray-500 uppercase block mb-0.5 font-medium">
//               Date
//             </span>
//             <span className="font-bold text-gray-800 text-[10px] sm:text-[11px]">
//               {formatDateWithAmPm(transaction.created_at)}
//             </span>
//           </div>
//         </div>

//         {transaction.userId?.email && (
//           <div className="rounded bg-gray-50 p-1.5 border border-gray-100 group-hover:border-[#1d8e85]/20 transition-colors">
//             <span className="text-[9px] sm:text-[10px] text-gray-500 uppercase block mb-0.5 font-medium">
//               Email
//             </span>
//             <span className="font-bold text-gray-800 text-[10px] sm:text-[11px] truncate block">
//               {transaction.userId.email}
//             </span>
//           </div>
//         )}

//         {(transaction.reason || transaction.note) && (
//           <div className="pt-1.5 mt-1 border-t border-dashed border-gray-200">
//             {transaction.reason && (
//               <div className="mb-1.5">
//                 <div className="flex items-center gap-1 mb-0.5">
//                   <span className="w-1 h-2.5 bg-red-400 rounded-full"></span>
//                   <span className="text-[9px] sm:text-[10px] text-gray-500 uppercase font-medium">
//                     Reason
//                   </span>
//                 </div>
//                 <p className="text-[10px] sm:text-[11px] text-gray-700 bg-red-50 p-1.5 rounded border border-red-100 break-words">
//                   {transaction.reason}
//                 </p>
//               </div>
//             )}
//             {transaction.note && (
//               <div>
//                 <div className="flex items-center gap-1 mb-0.5">
//                   <span className="w-1 h-2.5 bg-[#1d8e85] rounded-full"></span>
//                   <span className="text-[9px] sm:text-[10px] text-gray-500 uppercase font-medium">
//                     Note
//                   </span>
//                 </div>
//                 <p className="text-[10px] sm:text-[11px] text-gray-700 bg-gray-50 p-1.5 rounded border border-gray-100 break-words">
//                   {transaction.note}
//                 </p>
//               </div>
//             )}
//           </div>
//         )}
//       </div>

//       <div className="h-0.5 bg-gradient-to-r from-transparent via-gray-200 to-transparent opacity-70"></div>
//     </div>
//   );

//   return (
//     <div>
//       <div className="flex flex-col sm:flex-row gap-3 mb-4">
//         <select
//           value={selectedStatus}
//           onChange={(e) => {
//             setSelectedStatus(e.target.value);
//             setState((prev) => ({ ...prev, currentPage: 1 }));
//           }}
//           className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm bg-white focus:ring-2 focus:ring-[#1d8e85]"
//         >
//           <option value="">All Status</option>
//           <option value="1">Approved</option>
//           <option value="0">Pending</option>
//           <option value="2">Rejected</option>
//         </select>
//         <div className="relative flex-1">
//           <input
//             type="text"
//             placeholder="Search INR transactions..."
//             onChange={handleSearch}
//             className="w-full pl-10 pr-4 py-2 bg-white border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-[#1d8e85]"
//           />
//           <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
//         </div>
//       </div>

//       {isMobile ? (
//         <div className="space-y-3 sm:space-y-4">
//           {isLoading || isFetching ? (
//             [...Array(3)].map((_, i) => (
//               <div
//                 key={i}
//                 className="bg-gray-200 animate-pulse rounded-xl h-44 sm:h-48"
//               ></div>
//             ))
//           ) : !transactions || transactions.length === 0 ? (
//             <div className="text-center py-10 sm:py-12">
//               <div className="mx-auto w-14 h-14 sm:w-16 sm:h-16 bg-gray-100 rounded-full flex items-center justify-center mb-3 sm:mb-4">
//                 <Building className="w-7 h-7 sm:w-8 sm:h-8 text-gray-400" />
//               </div>
//               <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-1.5 sm:mb-2">
//                 No INR transactions found
//               </h3>
//               <p className="text-sm text-gray-500">
//                 Your INR withdrawal history will appear here
//               </p>
//             </div>
//           ) : (
//             transactions.map((transaction, index) => (
//               <InrCard
//                 key={transaction._id || index}
//                 transaction={transaction}
//                 index={index}
//               />
//             ))
//           )}
//         </div>
//       ) : (
//         <div className="overflow-x-auto">
//           <ReusableTable
//             columns={columns}
//             data={transactions}
//             isLoading={isLoading || isFetching}
//           />
//         </div>
//       )}

//       {pagination?.totalPages > 1 && (
//         <div className="p-3 flex justify-center border-t border-gray-200 mt-4">
//           <Pagination
//             currentPage={state?.currentPage || 1}
//             totalPages={pagination?.totalPages || 1}
//             onPageChange={(page) =>
//               setState((prev) => ({ ...prev, currentPage: page }))
//             }
//           />
//         </div>
//       )}
//     </div>
//   );
// };

// // ─────────────────────────────────────────────
// // Combined History Section with Tabs
// // ─────────────────────────────────────────────
// const CombinedHistorySection = () => {
//   const [activeTab, setActiveTab] = useState("usdt"); // Default to USDT since this is the USDT page

//   // USDT state
//   const [usdtState, setUsdtState] = useState({
//     page: 1,
//     limit: 10,
//     search: "",
//   });
//   const [usdtStatus, setUsdtStatus] = useState("");

//   // INR state
//   const [inrState, setInrState] = useState({
//     currentPage: 1,
//     perPage: 10,
//     search: "",
//   });
//   const [inrStatus, setInrStatus] = useState("");

//   return (
//     <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
//       <div className="px-4 sm:px-6 py-4 border-b border-gray-200 bg-gray-50">
//         <div className="flex flex-col gap-4">
//           <h3 className="text-lg font-semibold text-gray-900">
//             Withdrawal History
//           </h3>

//           {/* Tab Buttons */}
// {/* Tab Buttons */}
// <div className="flex gap-0.5 sm:gap-1 bg-gray-100 rounded-lg p-0.5 sm:p-1">
//   <button
//     onClick={() => setActiveTab("usdt")}
//     className={`flex-1 flex items-center justify-center gap-1 sm:gap-2 px-2 sm:px-4 py-1.5 sm:py-2 rounded-md text-[11px] sm:text-sm font-medium transition-all duration-200 ${
//       activeTab === "usdt"
//         ? "bg-[#1d8d84] text-white shadow-sm"
//         : "text-gray-600 hover:text-gray-900 hover:bg-gray-200"
//     }`}
//   >
//     <Wallet className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
//     <span className="truncate">
//       <span className="hidden xs:inline">USDT </span>
//       <span className="xs:hidden">USDT</span>
//       <span className="hidden sm:inline"> Withdrawals</span>
//     </span>
//   </button>
//   <button
//     onClick={() => setActiveTab("inr")}
//     className={`flex-1 flex items-center justify-center gap-1 sm:gap-2 px-2 sm:px-4 py-1.5 sm:py-2 rounded-md text-[11px] sm:text-sm font-medium transition-all duration-200 ${
//       activeTab === "inr"
//         ? "bg-[#1d8d84] text-white shadow-sm"
//         : "text-gray-600 hover:text-gray-900 hover:bg-gray-200"
//     }`}
//   >
//     <CreditCard className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
//     <span className="truncate">
//       <span className="hidden xs:inline">INR </span>
//       <span className="xs:hidden">INR</span>
//       <span className="hidden sm:inline"> Withdrawals</span>
//     </span>
//   </button>
// </div>
//         </div>
//       </div>

//       <div className="p-4 sm:p-6">
//         {activeTab === "usdt" ? (
//           <UsdtTransactionTableTab
//             state={usdtState}
//             setState={setUsdtState}
//             selectedStatus={usdtStatus}
//             setSelectedStatus={setUsdtStatus}
//             handleSearch={(e) => {
//               clearTimeout(window.usdtSearchTimeout2);
//               window.usdtSearchTimeout2 = setTimeout(() => {
//                 setUsdtState((prev) => ({
//                   ...prev,
//                   search: e.target.value,
//                   page: 1,
//                 }));
//               }, 500);
//             }}
//           />
//         ) : (
//           <InrTransactionTableTab
//             state={inrState}
//             setState={setInrState}
//             selectedStatus={inrStatus}
//             setSelectedStatus={setInrStatus}
//             handleSearch={(e) => {
//               clearTimeout(window.inrSearchTimeout2);
//               window.inrSearchTimeout2 = setTimeout(() => {
//                 setInrState((prev) => ({
//                   ...prev,
//                   search: e.target.value,
//                   currentPage: 1,
//                 }));
//               }, 500);
//             }}
//           />
//         )}
//       </div>
//     </div>
//   );
// };

// // ─────────────────────────────────────────────
// // Main USDT Withdrawal Component
// // ─────────────────────────────────────────────
// const CryptoWithdrawal = () => {
//   const selectedToken = "USDT";

//   const [formData, setFormData] = useState({
//     walletAddress: "",
//     amount: "",
//   });

//   const [errors, setErrors] = useState({});
//   const [previewData, setPreviewData] = useState(null);
//   const [debouncedAmount, setDebouncedAmount] = useState("");

//   const {
//     data: conversionData,
//     isLoading: conversionLoading,
//     refetch: conversionRefetch,
//   } = useInrToTokenPreviewQuery(selectedToken);

//   const [previewWithdraw, { isLoading: previewLoading }] =
//     usePreviewTokenWithdrawMutation();

//   const [submitWithdraw, { isLoading: isSubmitting }] =
//     useUsdtWithdrawRequestMutation();
//   const { data: getSetting } = useGetSettingQuery();

//   const walletData = conversionData?.data;
//   const token = walletData?.token || selectedToken;
//   const settings = getSetting?.data;

//   const validate = () => {
//     const errs = {};
//     if (!formData.amount || Number(formData.amount) <= 0)
//       errs.amount = "Enter valid amount";



//     return errs;
//   };

//   const calculatePreview = async (amount) => {
//     if (!amount) return setPreviewData(null);

//     try {
//       const res = await previewWithdraw({
//         token: selectedToken,
//         amount,
//       });

//       if (res?.data?.success) {
//         setPreviewData(res.data.data);
//       } else {
//         toast.error(res?.error?.data?.message || "Preview failed");
//         setPreviewData(null);
//       }
//     } catch {
//       setPreviewData(null);
//     }
//   };

//   useEffect(() => {
//     if (!formData.amount) {
//       setPreviewData(null);
//       return;
//     }

//     const timer = setTimeout(() => {
//       setDebouncedAmount(formData.amount);
//     }, 500);

//     return () => clearTimeout(timer);
//   }, [formData.amount]);

//   useEffect(() => {
//     if (!debouncedAmount) return;
//     calculatePreview(debouncedAmount);
//   }, [debouncedAmount]);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     if (name === "amount" && !/^\d*\.?\d*$/.test(value)) return;

//     setFormData((p) => ({ ...p, [name]: value }));
//     setErrors((p) => ({ ...p, [name]: undefined }));

//     if (name === "amount") {
//       setPreviewData(null);
//     }
//   };

//   const handleSubmit = async () => {
//     const errs = validate();
//     if (Object.keys(errs).length) {
//       setErrors(errs);
//       return;
//     }

//     if (!previewData) {
//       toast.error("Please wait for preview");
//       return;
//     }

//     const res = await submitWithdraw({
//       token: selectedToken,
//       amount: formData.amount,
//     });

//     if (res?.data?.success) {
//       toast.success(res?.data?.message || "Withdrawal submitted");
//       setFormData({ walletAddress: "", amount: "" });
//       setPreviewData(null);
//       conversionRefetch();
//     } else {
//       const errorMessage =
//         res?.error?.data?.message || res?.data?.message || "Withdrawal failed";
//       toast.error(errorMessage);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 py-4">
//       <div className="max-w-screen mx-auto px-3 sm:px-4">
//         <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
//           <div className="lg:col-span-4">
//             <div className="bg-white rounded-lg border p-4 shadow-sm">
//               <h2 className="font-semibold mb-3">Token Withdrawal</h2>

//               {conversionLoading ? (
//                 <Loader />
//               ) : (
//                 <div className="bg-gradient-to-r from-[#1d8d84] to-[#00d4aa] p-3 rounded text-white mb-4">
//                   <p className="text-xs">Available Balance</p>
//                   <p className="text-lg font-bold">
//                     {walletData?.estimatedTokenAmount} {token}
//                   </p>
//                   <p className="text-xs">
//                     ≈ ₹{walletData?.walletINRBalance?.toFixed(2)}
//                   </p>
//                 </div>
//               )}

//               <p className="text-xs bg-blue-50 p-2 rounded mb-3">
//                 <Info className="w-3 h-3 inline mr-1" />₹
//                 {walletData?.conversionRate} / {token}
//               </p>

//               <input
//                 name="amount"
//                 placeholder={`Amount (${token})`}
//                 value={formData.amount}
//                 onChange={handleInputChange}
//                 className="w-full border px-3 py-2 bg-white rounded mt-3"
//               />
//               {errors.amount && (
//                 <p className="text-xs text-red-600">{errors.amount}</p>
//               )}

//               {previewLoading ? (
//                 <Loader />
//               ) : (
//                 previewData && (
//                   <div className="bg-gray-50 border rounded p-3 mt-3 text-xs space-y-1">
//                     <div className="flex justify-between">
//                       <span>Requested</span>
//                       <span>
//                         {formData.amount} {token}
//                       </span>
//                     </div>
//                     <div className="flex justify-between text-red-600">
//                       <span>Platform Fee</span>
//                       <span>
//                         -{previewData.admin_fee_token} {token}
//                       </span>
//                     </div>
//                     <div className="flex justify-between text-red-600">
//                       <span>Network Fee</span>
//                       <span>
//                         -{previewData.network_fee_token} {token}
//                       </span>
//                     </div>
//                     <div className="flex justify-between font-semibold">
//                       <span>Total Fee</span>
//                       <span>
//                         {previewData.total_fee_token} {token}
//                       </span>
//                     </div>
//                     <div className="flex justify-between text-green-600 font-bold">
//                       <span>You Receive</span>
//                       <span>
//                         {previewData.final_token_received} {token}
//                       </span>
//                     </div>
//                     <div className="flex justify-between text-gray-600 pt-1 border-t">
//                       <span>INR Deduction</span>
//                       <span>₹{previewData.estimatedINR_deduction}</span>
//                     </div>
//                   </div>
//                 )
//               )}

//               <button
//                 disabled={
//                   isSubmitting ||
//                   previewLoading ||
//                   !previewData ||
//                   !formData.amount
//                 }
//                 onClick={handleSubmit}
//                 className="w-full mt-4 bg-[#1d8d84] py-2 rounded flex items-center justify-center gap-2"
//               >
//                 {isSubmitting ? (
//                   <>
//                     <Loader />
//                     <span className="text-white">Processing...</span>
//                   </>
//                 ) : (
//                   <span className="text-white">Submit Withdrawal</span>
//                 )}
//               </button>
//             </div>
//           </div>

//           <div className="lg:col-span-8 space-y-4">
//             <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
//               <div className="flex items-center justify-between mb-3">
//                 <h2 className="text-base font-semibold text-gray-900">
//                   Registered Wallet
//                 </h2>
//                 <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium flex items-center gap-1">
//                   <CheckCircle className="w-3 h-3" />
//                   BSC Network
//                 </span>
//               </div>
//               <div className="grid grid-cols-1 gap-3">
//                 <div className="bg-gradient-to-r from-gray-50 to-white p-3 rounded-lg border border-gray-200">
//                   <label className="block text-xs font-medium text-gray-500 uppercase mb-1">
//                     Wallet Address
//                   </label>
//                   <div className="flex items-center gap-2">
//                     <p className="text-sm text-gray-900 font-mono break-all flex-1">
//                       {walletData?.walletAddress || "Not Available"}
//                     </p>
//                     {walletData?.walletAddress && (
//                       <button
//                         onClick={() =>
//                           copyToClipboard(walletData.walletAddress)
//                         }
//                         className="text-[#1d8d84] hover:text-[#1e8064] p-1"
//                       >
//                         <Copy className="w-4 h-4" />
//                       </button>
//                     )}
//                   </div>
//                 </div>
//                 <div className="grid grid-cols-2 gap-3">
//                   <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
//                     <label className="block text-xs font-medium text-gray-500 uppercase mb-1">
//                       Network
//                     </label>
//                     <p className="text-sm text-gray-900 font-medium">
//                       BSC(BEP20)
//                     </p>
//                   </div>
//                   <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
//                     <label className="block text-xs font-medium text-gray-500 uppercase mb-1">
//                       Status
//                     </label>
//                     <p className="text-sm text-gray-900 font-medium">Active</p>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
//               <h2 className="text-base font-semibold text-gray-900 mb-3">
//                 Terms & Conditions
//               </h2>
//               <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
//                 <div className="flex gap-2">
//                   <AlertTriangle className="w-4 h-4 text-yellow-600 flex-shrink-0 mt-0.5" />
//                   <div>
//                     <h3 className="text-xs font-semibold text-yellow-800 mb-1">
//                       Important Notes
//                     </h3>
//                     <ul className="text-xs text-yellow-700 space-y-1">
//                       <li>• Ensure wallet supports BSC (BEP20) network</li>
//                       <li>
//                         • Platform fee{" "}
//                         {settings?.withdrawal_commission_usd || 0}% and network
//                         fee {settings?.network_fee_token || 0}% will be deducted
//                       </li>
//                       <li>• Complete KYC verification for withdrawals</li>
//                       <li>
//                         • Withdrawal amount will be deducted from your INR
//                         balance
//                       </li>
//                     </ul>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* ── Combined Transaction History with Tabs ── */}
//         <div className="mt-4">
//           <CombinedHistorySection />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CryptoWithdrawal;




import React, { useState, useEffect } from "react";
import {
  AlertTriangle,
  CheckCircle,
  Info,
  Wallet,
  Smartphone,
  Search,
  Copy,
  CreditCard,
  Building,
  ArrowRight,
} from "lucide-react";

import {
  useUsdtWithdrawHistoryQuery,
  useInrToTokenPreviewQuery,
  useUsdtWithdrawRequestMutation,
  usePreviewTokenWithdrawMutation,
  useGetSettingQuery,
} from "./usdtWithdrawalApiSlice";
import { useWithdrawHistoryQuery } from "./withdrawApiSlice";

import Pagination from "../../../../ReusableComponents/pagination/pagination";
import ReusableTable from "../../../../ReusableComponents/tables/reusableTable";
import { toast } from "../../../../ReusableComponents/Toasts/Toasts";
import Loader from "../../../../ReusableComponents/Loader/loader";
import { v4 as uuidv4 } from "uuid";

const copyToClipboard = (text) => {
  navigator.clipboard.writeText(text);
  toast.success("Copied");
};


const UsdtTransactionTableTab = ({
  state,
  setState,
  selectedStatus,
  setSelectedStatus,
  handleSearch,
}) => {
  const [isMobile, setIsMobile] = useState(false);
  const [searchInput, setSearchInput] = useState(""); // Add local state for input

  const queryString = `page=${state.page}&limit=${state.limit}&status=${selectedStatus}&search=${state.search}`;
  const { data, isLoading } = useUsdtWithdrawHistoryQuery(queryString);

  const transactions = data?.data?.withdrawRequests || [];
  const pagination = data?.data?.pagination || {};

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Handle Enter key press
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      setState((prev) => ({ ...prev, search: searchInput, page: 1 }));
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 1:
        return "border-green-500 text-green-600 bg-green-50";
      case 0:
        return "border-yellow-500 text-yellow-600 bg-yellow-50";
      case 2:
        return "border-red-500 text-red-600 bg-red-50";
      default:
        return "border-gray-400 text-gray-500 bg-gray-50";
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 1:
        return "Completed";
      case 2:
        return "Failed";
      case 0:
        return "Pending";
      default:
        return "Unknown";
    }
  };

  const formatDate = (isoString) => {
    if (!isoString) return "-";
    const clean = isoString.replace("Z", "").split(".")[0];
    const [datePart, timePart] = clean.split("T");
    const [year, month, day] = datePart.split("-");
    let [hours, minutes] = timePart.split(":");
    hours = parseInt(hours, 10);
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;
    return `${day}-${month}-${year} ${hours}:${minutes} ${ampm}`;
  };

  const copyText = (text, label) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} copied`);
  };

  // Define columns for ReusableTable
  const columns = React.useMemo(
    () => [
      {
        header: "S.No",
        accessor: "index",
        align: 'center',
        render: (row, index) => (
          <span className="text-gray-600 font-medium">
            {((state.page || 1) - 1) * (state.limit || 10) + index + 1}
          </span>
        ),
      },
      {
        header: "Transaction ID",
        accessor: "_id",
        render: (row) => (
          <div className="flex items-center gap-1 whitespace-nowrap">
            <span className="truncate max-w-[140px]" title={row._id || "-"}>
              {row._id || "-"}
            </span>
            {row._id && (
              <button
                onClick={() => copyText(row._id, "Transaction ID")}
                className="text-[#1d8d84] hover:text-[#1e8064] flex-shrink-0"
              >
                <Copy className="w-3 h-3" />
              </button>
            )}
          </div>
        ),
      },
      {
        header: "Token Type",
        accessor: "currency",
        align: 'center',
        render: (row) => (
          <span className="font-medium whitespace-nowrap">{row.currency || "-"}</span>
        ),
      },
      {
        header: "Tokens",
        accessor: "amount_in_token",
        align: 'center',
        render: (row) => (
          <span className="font-medium whitespace-nowrap">
            {row.amount_in_token
              ? `${parseFloat(row.amount_in_token)} ${row.currency}`
              : "-"}
          </span>
        ),
      },
      {
        header: "Platform Fee (USDT)",
        accessor: "total_fee_token",
        align: 'center',
        render: (row) => (
          <div className="flex justify-center">
            <span className="font-medium text-red-600 whitespace-nowrap">
              {row.total_fee_token
                ? parseFloat(row.total_fee_token)
                : "-"}
            </span>
          </div>
        ),
      },
      {
        header: "Final Token(USDT)",
        accessor: "senttoken",
        align: 'center',
        render: (row) => (
          <div className="flex justify-center">
            <span className="font-medium text-black whitespace-nowrap">
              {row.senttoken
                ? parseFloat(row.senttoken)
                : "-"}
            </span>
          </div>
        ),
      },
      {
        header: "Amount (INR)",
        accessor: "amount_in_inr",
        align: 'center',
        render: (row) => (
          <span className="font-medium text-gray-600 whitespace-nowrap">
            ₹{row.amount_in_inr || "-"}
          </span>
        ),
      },
      {
        header: "Rate",
        accessor: "inr_price",
        align: 'center',
        render: (row) => (
          <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium inline-block whitespace-nowrap">
            ₹{row.inr_price || "-"}
          </span>
        ),
      },
      // {
      //   header: "Platform Fee (INR)",
      //   accessor: "admin_inr_charges",
      //   align: 'center',
      //   render: (row) => (
      //     <div className="flex justify-center">
      //       <span className="text-teal-600 font-medium whitespace-nowrap">
      //         ₹{row.admin_inr_charges || "-"}
      //       </span>
      //     </div>
      //   ),
      // },
      {
        header: "Date",
        accessor: "created_at",
        align: 'center',
        render: (row) => (
          <span className="whitespace-nowrap text-xs">
            {formatDate(row.created_at)}
          </span>
        ),
      },
      {
        header: "Status",
        accessor: "status",
        align: 'center',
        render: (row) => (
          <span
            className={`inline-flex px-2 py-1 text-xs font-medium rounded-full whitespace-nowrap ${getStatusColor(
              row.status
            )}`}
          >
            {/* <span className="inline-block w-1.5 h-1.5 rounded-full bg-current mr-1 animate-pulse"></span> */}
            {getStatusText(row.status)}
          </span>
        ),
      },
      {
        header: "Tx Hash",
        accessor: "txn_hash",
        render: (row) =>
          row.txn_hash ? (
            <div className="flex items-center gap-1 whitespace-nowrap">
              <span
                className="truncate max-w-[100px] font-mono text-xs"
                title={row.txn_hash}
              >
                {row.txn_hash.slice(0, 9)}...
              </span>
              <button
                onClick={() => copyText(row.txn_hash, "Tx Hash")}
                className="text-[#1d8d84] hover:text-[#1e8064] flex-shrink-0"
              >
                <Copy className="w-3 h-3" />
              </button>
            </div>
          ) : (
            <span className="text-gray-400">-</span>
          ),
      },

    ],
    [state.page, state.limit]
  );

  const UsdtCard = ({ transaction, index }) => (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 group">
      {/* Top accent bar */}
      <div className="h-1 bg-gradient-to-r from-[#1d8d84] via-[#00d4aa] to-[#1d8d84]"></div>

      {/* Header - Transaction ID & Status */}
      <div className="p-2.5 sm:p-3 bg-gradient-to-r from-gray-50 to-white flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0 flex-1">
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-[#1d8d84] to-[#1e8064] text-white flex items-center justify-center flex-shrink-0">
            <Wallet className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </div>
          <div className="min-w-0 flex-1">
            <span className="text-[9px] sm:text-[10px] text-gray-500 uppercase block leading-tight font-medium">
              Transaction ID
            </span>
            <div className="flex items-center gap-1">
              <span
                className="text-[11px] sm:text-xs font-bold text-gray-800 truncate block group-hover:text-[#1d8d84] transition-colors"
                title={transaction._id}
              >
                {transaction._id
                  ? window.innerWidth < 400
                    ? `...${transaction._id.slice(-6)}`
                    : `...${transaction._id.slice(-10)}`
                  : "-"}
              </span>
              {transaction._id && (
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(transaction._id);
                    toast.success("ID copied");
                  }}
                  className="text-gray-400 hover:text-[#1d8d84] flex-shrink-0"
                >
                  <Copy className="w-3 h-3" />
                </button>
              )}
            </div>
          </div>
        </div>
        <span
          className={`text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full border flex-shrink-0 whitespace-nowrap ${getStatusColor(
            transaction.status
          )}`}
        >
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-current mr-1 align-middle animate-pulse"></span>
          {getStatusText(transaction.status)}
        </span>
      </div>

      {/* Amount Section */}
      <div className="px-2.5 sm:px-4 py-2.5 sm:py-3 bg-gradient-to-r from-gray-50 to-white border-y border-gray-100">
        <div className="flex flex-col xs:flex-row xs:justify-between xs:items-center gap-2">
          <div className="flex-1">
            <span className="text-[9px] sm:text-[10px] text-[#1d8d84] uppercase block font-medium leading-tight">
              Amount
            </span>
            <span className="text-base sm:text-lg font-extrabold text-gray-800 group-hover:text-[#1d8d84] transition-colors">
              {transaction.amount_in_token
                ? `${parseFloat(transaction.amount_in_token)} ${transaction.currency}`
                : "-"}
            </span>
            <span className="text-[10px] sm:text-xs text-gray-500 block">
              ≈ ₹{transaction.amount_in_inr || "-"}
            </span>
          </div>
          <div className="flex gap-3 xs:gap-4">
            <div className="text-left xs:text-right">
              <span className="text-[9px] sm:text-[10px] text-teal-500 uppercase block font-semibold leading-tight">
                Fee (INR)
              </span>
              <span className="text-xs sm:text-sm font-bold text-teal-600">
                ₹{transaction.admin_inr_charges || "-"}
              </span>
            </div>
            <div className="text-left xs:text-right">
              <span className="text-[9px] sm:text-[10px] text-teal-500 uppercase block font-semibold leading-tight">
                Fee (USDT)
              </span>
              <span className="text-xs sm:text-sm font-bold text-teal-600">
                ${transaction.total_fee_token || "-"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Details Grid */}
      <div className="p-2.5 sm:p-3 space-y-2">
        <div className="grid grid-cols-2 gap-1.5 sm:gap-2">
          <div className="rounded bg-gray-50 p-1.5 sm:p-2 border border-gray-100 group-hover:border-[#1d8d84]/20 transition-colors">
            <span className="text-[9px] sm:text-[10px] text-gray-500 uppercase block mb-0.5 font-medium">
              Token Type
            </span>
            <span className="font-bold text-gray-800 text-xs sm:text-sm">
              {transaction.currency || "-"}
            </span>
          </div>
          <div className="rounded bg-gray-50 p-1.5 sm:p-2 border border-gray-100 group-hover:border-[#1d8d84]/20 transition-colors">
            <span className="text-[9px] sm:text-[10px] text-gray-500 uppercase block mb-0.5 font-medium">
              Rate
            </span>
            <span className="font-bold text-gray-800 text-xs sm:text-sm">
              <span className="px-1 sm:px-1.5 py-0.5 bg-blue-50 text-blue-700 rounded text-[10px] sm:text-xs">
                ₹{transaction.inr_price || "-"}
              </span>
            </span>
          </div>
        </div>
        <div className=" flex rounded bg-gray-50 p-1.5 sm:p-2 border border-gray-100 group-hover:border-[#1d8d84]/20 transition-colors">
          <div className="p-2">
            <span className="text-[9px] sm:text-[10px] text-gray-500 uppercase block mb-0.5 font-medium">
              Final Token (USDT)
            </span>
            <span className="font-bold text-gray-800 text-xs sm:text-sm">
              {transaction.senttoken || "-"}
            </span>
          </div>
          <div className="p-2">
            <span className="text-[9px] sm:text-[10px] text-gray-500 uppercase block mb-0.5 font-medium">
              Final Amount (INR)
            </span>
            <span className="font-bold text-gray-800 text-xs sm:text-sm">
              {transaction.senttoken || "-"}
            </span>
          </div>


        </div>
        <div className="rounded bg-gray-50 p-1.5 sm:p-2 border border-gray-100 group-hover:border-[#1d8d84]/20 transition-colors">
          <span className="text-[9px] sm:text-[10px] text-gray-500 uppercase block mb-0.5 font-medium">
            Date & Time
          </span>
          <span className="font-bold text-gray-800 text-[10px] sm:text-xs">
            {formatDate(transaction.created_at)}
          </span>
        </div>

        {transaction.txn_hash && (
          <div className="rounded bg-gray-50 p-1.5 sm:p-2 border border-gray-100 group-hover:border-[#1d8d84]/20 transition-colors">
            <span className="text-[9px] sm:text-[10px] text-gray-500 uppercase block mb-0.5 font-medium">
              Tx Hash
            </span>
            <div className="flex items-center gap-1">
              <span
                className="font-mono text-[10px] sm:text-xs text-gray-800 truncate flex-1"
                title={transaction.txn_hash}
              >
                {transaction.txn_hash}
              </span>
              <button
                onClick={() => copyText(transaction.txn_hash, "Tx Hash")}
                className="text-[#1d8d84] hover:text-[#1e8064] flex-shrink-0 p-0.5"
              >
                <Copy className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              </button>
            </div>
          </div>
        )}


      </div>

      <div className="h-0.5 bg-gradient-to-r from-transparent via-gray-200 to-transparent opacity-70"></div>
    </div>
  );

  return (
    <div>
      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <select
          value={selectedStatus}
          onChange={(e) => {
            setSelectedStatus(e.target.value);
            setState((prev) => ({ ...prev, page: 1 }));
          }}
          className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm bg-white focus:ring-2 focus:ring-[#1d8d84]"
        >
          <option value="">All Status</option>
          <option value="1">Completed</option>
          <option value="0">Pending</option>
          <option value="2">Failed</option>
        </select>
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search USDT transactions... (Press Enter)"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyPress={handleKeyPress}
            className="w-full pl-10 pr-4 py-2 bg-white border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-[#1d8d84]"
          />
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
        </div>
      </div>

      {isMobile ? (
        <div className="space-y-4">
          {isLoading ? (
            [...Array(3)].map((_, i) => (
              <div
                key={i}
                className="bg-gray-200 animate-pulse rounded-lg h-48"
              ></div>
            ))
          ) : transactions.length === 0 ? (
            <div className="text-center py-12">
              <Wallet className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No USDT transactions found
              </h3>
              <p className="text-gray-500">
                Your USDT withdrawal history will appear here
              </p>
            </div>
          ) : (
            transactions.map((transaction, index) => (
              <UsdtCard
                key={transaction._id}
                transaction={transaction}
                index={index}
              />
            ))
          )}
        </div>
      ) : (
        <div className="overflow-x-auto">
          <ReusableTable
            columns={columns}
            data={transactions}
            isLoading={isLoading}
          />
        </div>
      )}

      {pagination?.totalPages > 1 && (
        <div className="p-3 flex justify-center border-t border-gray-200 mt-4">
          <Pagination
            currentPage={state?.page || 1}
            totalPages={pagination?.totalPages || 1}
            onPageChange={(page) => setState((prev) => ({ ...prev, page }))}
          />
        </div>
      )}
    </div>
  );
};

const InrTransactionTableTab = ({
  state,
  setState,
  selectedStatus,
  setSelectedStatus,
  handleSearch,
}) => {
  const [isMobile, setIsMobile] = useState(false);

  // Fix: Build query string properly using URLSearchParams
  const queryString = React.useMemo(() => {
    const params = new URLSearchParams();
    params.append("page", state?.currentPage || 1);
    params.append("limit", state?.perPage || 10);
    if (selectedStatus) params.append("status", selectedStatus);
    if (state?.search) params.append("search", state.search);
    return params.toString();
  }, [state?.currentPage, state?.perPage, selectedStatus, state?.search]);

  const { data, isLoading, isFetching } = useWithdrawHistoryQuery(queryString);

  const transactions = data?.data?.withdrawRequests || [];
  const pagination = data?.data?.pagination || {};

  // Debug: Log to check data flow
  useEffect(() => {
    console.log("INR Tab - Query String:", queryString);
    console.log("INR Tab - API Response:", data);
    console.log("INR Tab - Transactions:", transactions);
    console.log("INR Tab - isLoading:", isLoading, "isFetching:", isFetching);
  }, [queryString, data, transactions, isLoading, isFetching]);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 1:
        return "border-green-500 text-green-600 bg-green-50";
      case 0:
        return "border-yellow-500 text-yellow-600 bg-yellow-50";
      case 2:
        return "border-red-500 text-red-600 bg-red-50";
      default:
        return "border-gray-400 text-gray-500 bg-gray-50";
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 1:
        return "Approved";
      case 0:
        return "Pending";
      case 2:
        return "Rejected";
      default:
        return "Unknown";
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

  const columns = React.useMemo(
    () => [
      {
        header: "S.No",
        accessor: "index",
        align: 'center',
        render: (row, index) => (
          <span className="text-center text-gray-600 font-medium">
            {((state?.currentPage || 1) - 1) * (state?.perPage || 10) +
              index +
              1}
          </span>
        ),
      },
      {
        header: "Transaction ID",
        accessor: "_id",
        align: 'center',
        render: (row) => (
          <div className="flex items-center">
            <span className="truncate max-w-[140px]" title={row._id || "-"}>
              {row._id || "-"}
            </span>
          </div>
        ),
      },
      {
        header: "User",
        accessor: "userId",
        align: 'center',
        render: (row) => (
          <span
            className="truncate max-w-[120px] block"
            title={row.userId?.email}
          >
            {row.userId?.email || "-"}
          </span>
        ),
      },
      {
        header: "Currency",
        accessor: "currency",
        align: 'center',
        render: (row) => (
          <span className="text-center">{row.currency || "-"}</span>
        ),
      },
      {
        header: "Amount",
        accessor: "amount",
        align: 'center',
        render: (row) => (
          <span className="text-center font-medium">
            {row.amount
              ? row.currency === "INR"
                ? `₹${parseFloat(row.amount).toFixed(2)}`
                : `$${parseFloat(row.amount).toFixed(2)}`
              : "-"}
          </span>
        ),
      },
      {
        header: "Charges",
        accessor: "admin_inr_charges",
        align: 'center',
        render: (row) => (
          <span className=" font-medium">
            {row.admin_inr_charges
              ? row.currency === "INR"
                ? `₹${row.admin_inr_charges}`
                : `$${row.admin_inr_charges}`
              : "-"}
          </span>
        ),
      },
      {
        header: "Date & Time",
        accessor: "created_at",
        render: (row) => (
          <span className="text-center whitespace-nowrap">
            {formatDateWithAmPm(row.created_at)}
          </span>
        ),
      },
      {
        header: "Status",
        accessor: "status",
        render: (row) => (
          <span
            className={`inline-flex px-1.5 py-0.5 text-xs font-medium rounded-full ${getStatusColor(
              row.status,
            )}`}
          >
            {getStatusText(row.status)}
          </span>
        ),
      },

    ],
    [state?.currentPage, state?.perPage],
  );

  // Mobile card
  const InrCard = ({ transaction, index }) => (
    <div className="bg-white rounded-md overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 group">
      <div className="h-1 bg-gradient-to-r from-[#1d8e85] via-[#25b5aa] to-[#1d8e85]"></div>

      <div className="p-2.5 bg-gradient-to-r from-gray-50 to-white flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0 flex-1">
          <div className="flex items-center justify-center w-7 h-7 rounded-full bg-gradient-to-br from-[#1d8e85] to-[#106b64] text-white shadow-sm flex-shrink-0">
            <span className="text-xs font-bold">
              {((state?.currentPage || 1) - 1) * (state?.perPage || 10) +
                index +
                1}
            </span>
          </div>
          <div className="min-w-0 flex-1">
            <span className="text-[9px] sm:text-[10px] text-gray-500 uppercase block font-medium leading-tight">
              Transaction ID
            </span>
            <div className="flex items-center gap-1">
              <span
                className="text-[11px] sm:text-xs font-bold text-gray-800 truncate block group-hover:text-[#1d8e85] transition-colors"
                title={transaction._id}
              >
                {transaction._id ? `...${transaction._id.slice(-8)}` : "-"}
              </span>
            </div>
          </div>
        </div>
        <span
          className={`text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full border flex-shrink-0 whitespace-nowrap ${getStatusColor(
            transaction.status,
          )}`}
        >
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-current mr-1 align-middle animate-pulse"></span>
          {getStatusText(transaction.status)}
        </span>
      </div>

      <div className="px-2.5 sm:px-3 py-2.5 bg-gradient-to-r from-gray-50 to-white border-y border-gray-100">
        <div className="flex justify-between items-center">
          <div>
            <span className="text-[9px] sm:text-[10px] text-[#1d8e85] uppercase block font-medium leading-tight">
              Amount
            </span>
            <span className="text-sm sm:text-base font-extrabold text-gray-800 group-hover:text-[#1d8e85] transition-colors">
              {transaction.amount
                ? transaction.currency === "INR"
                  ? `₹${parseFloat(transaction.amount).toFixed(2)}`
                  : `$${parseFloat(transaction.amount).toFixed(2)}`
                : "-"}
            </span>
          </div>
          <div className="text-right">
            <span className="text-[9px] sm:text-[10px] text-red-500 uppercase block font-medium leading-tight">
              Fee
            </span>
            <span className="text-xs sm:text-sm font-bold text-red-600">
              {transaction.admin_inr_charges
                ? transaction.currency === "INR"
                  ? `₹${transaction.admin_inr_charges}`
                  : `$${transaction.admin_inr_charges}`
                : "-"}
            </span>
          </div>
        </div>
      </div>

      <div className="p-2.5 text-xs space-y-2">
        <div className="grid grid-cols-2 gap-1.5 sm:gap-2">
          <div className="rounded bg-gray-50 p-1.5 border border-gray-100 group-hover:border-[#1d8e85]/20 transition-colors">
            <span className="text-[9px] sm:text-[10px] text-gray-500 uppercase block mb-0.5 font-medium">
              Currency
            </span>
            <span className="font-bold text-gray-800 text-xs sm:text-sm">
              {transaction.currency || "-"}
            </span>
          </div>
          <div className="rounded bg-gray-50 p-1.5 border border-gray-100 group-hover:border-[#1d8e85]/20 transition-colors">
            <span className="text-[9px] sm:text-[10px] text-gray-500 uppercase block mb-0.5 font-medium">
              Date
            </span>
            <span className="font-bold text-gray-800 text-[10px] sm:text-[11px]">
              {formatDateWithAmPm(transaction.created_at)}
            </span>
          </div>
        </div>

        {transaction.userId?.email && (
          <div className="rounded bg-gray-50 p-1.5 border border-gray-100 group-hover:border-[#1d8e85]/20 transition-colors">
            <span className="text-[9px] sm:text-[10px] text-gray-500 uppercase block mb-0.5 font-medium">
              Email
            </span>
            <span className="font-bold text-gray-800 text-[10px] sm:text-[11px] truncate block">
              {transaction.userId.email}
            </span>
          </div>
        )}

        {(transaction.reason || transaction.note) && (
          <div className="pt-1.5 mt-1 border-t border-dashed border-gray-200">
            {transaction.reason && (
              <div className="mb-1.5">
                <div className="flex items-center gap-1 mb-0.5">
                  <span className="w-1 h-2.5 bg-red-400 rounded-full"></span>
                  <span className="text-[9px] sm:text-[10px] text-gray-500 uppercase font-medium">
                    Reason
                  </span>
                </div>
                <p className="text-[10px] sm:text-[11px] text-gray-700 bg-red-50 p-1.5 rounded border border-red-100 break-words">
                  {transaction.reason}
                </p>
              </div>
            )}
            {transaction.note && (
              <div>
                <div className="flex items-center gap-1 mb-0.5">
                  <span className="w-1 h-2.5 bg-[#1d8e85] rounded-full"></span>
                  <span className="text-[9px] sm:text-[10px] text-gray-500 uppercase font-medium">
                    Note
                  </span>
                </div>
                <p className="text-[10px] sm:text-[11px] text-gray-700 bg-gray-50 p-1.5 rounded border border-gray-100 break-words">
                  {transaction.note}
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="h-0.5 bg-gradient-to-r from-transparent via-gray-200 to-transparent opacity-70"></div>
    </div>
  );

  return (
    <div>
      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <select
          value={selectedStatus}
          onChange={(e) => {
            setSelectedStatus(e.target.value);
            setState((prev) => ({ ...prev, currentPage: 1 }));
          }}
          className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm bg-white focus:ring-2 focus:ring-[#1d8e85]"
        >
          <option value="">All Status</option>
          <option value="1">Approved</option>
          <option value="0">Pending</option>
          <option value="2">Rejected</option>
        </select>
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search INR transactions..."
            onChange={handleSearch}
            className="w-full pl-10 pr-4 py-2 bg-white border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-[#1d8e85]"
          />
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
        </div>
      </div>

      {isMobile ? (
        <div className="space-y-3 sm:space-y-4">
          {isLoading || isFetching ? (
            [...Array(3)].map((_, i) => (
              <div
                key={i}
                className="bg-gray-200 animate-pulse rounded-xl h-44 sm:h-48"
              ></div>
            ))
          ) : !transactions || transactions.length === 0 ? (
            <div className="text-center py-10 sm:py-12">
              <div className="mx-auto w-14 h-14 sm:w-16 sm:h-16 bg-gray-100 rounded-full flex items-center justify-center mb-3 sm:mb-4">
                <Building className="w-7 h-7 sm:w-8 sm:h-8 text-gray-400" />
              </div>
              <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-1.5 sm:mb-2">
                No INR transactions found
              </h3>
              <p className="text-sm text-gray-500">
                Your INR withdrawal history will appear here
              </p>
            </div>
          ) : (
            transactions.map((transaction, index) => (
              <InrCard
                key={transaction._id || index}
                transaction={transaction}
                index={index}
              />
            ))
          )}
        </div>
      ) : (
        <div className="overflow-x-auto">
          <ReusableTable
            columns={columns}
            data={transactions}
            isLoading={isLoading || isFetching}
          />
        </div>
      )}

      {pagination?.totalPages > 1 && (
        <div className="p-3 flex justify-center border-t border-gray-200 mt-4">
          <Pagination
            currentPage={state?.currentPage || 1}
            totalPages={pagination?.totalPages || 1}
            onPageChange={(page) =>
              setState((prev) => ({ ...prev, currentPage: page }))
            }
          />
        </div>
      )}
    </div>
  );
};

const CombinedHistorySection = () => {
  const [activeTab, setActiveTab] = useState("usdt"); // Default to USDT since this is the USDT page

  // USDT state
  const [usdtState, setUsdtState] = useState({
    page: 1,
    limit: 10,
    search: "",
  });
  const [usdtStatus, setUsdtStatus] = useState("");

  // INR state
  const [inrState, setInrState] = useState({
    currentPage: 1,
    perPage: 10,
    search: "",
  });
  const [inrStatus, setInrStatus] = useState("");

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
      <div className="px-4 sm:px-6 py-4 border-b border-gray-200 bg-gray-50">
        <div className="flex flex-col gap-4">
          <h3 className="text-lg font-semibold text-gray-900">
            Withdrawal History
          </h3>

          {/* Tab Buttons */}
          {/* Tab Buttons */}
          <div className="flex gap-0.5 sm:gap-1 bg-gray-100 rounded-lg p-0.5 sm:p-1">
            <button
              onClick={() => setActiveTab("usdt")}
              className={`flex-1 flex items-center justify-center gap-1 sm:gap-2 px-2 sm:px-4 py-1.5 sm:py-2 rounded-md text-[11px] sm:text-sm font-medium transition-all duration-200 ${activeTab === "usdt"
                ? "bg-[#1d8d84] text-white shadow-sm"
                : "text-gray-600 hover:text-gray-900 hover:bg-gray-200"
                }`}
            >
              <Wallet className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
              <span className="truncate">
                <span className="hidden xs:inline">USDT </span>
                <span className="xs:hidden">USDT</span>
                <span className="hidden sm:inline"> Withdrawals</span>
              </span>
            </button>
            <button
              onClick={() => setActiveTab("inr")}
              className={`flex-1 flex items-center justify-center gap-1 sm:gap-2 px-2 sm:px-4 py-1.5 sm:py-2 rounded-md text-[11px] sm:text-sm font-medium transition-all duration-200 ${activeTab === "inr"
                ? "bg-[#1d8d84] text-white shadow-sm"
                : "text-gray-600 hover:text-gray-900 hover:bg-gray-200"
                }`}
            >
              <CreditCard className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
              <span className="truncate">
                <span className="hidden xs:inline">INR </span>
                <span className="xs:hidden">INR</span>
                <span className="hidden sm:inline"> Withdrawals</span>
              </span>
            </button>
          </div>
        </div>
      </div>

      <div className="p-4 sm:p-6">
        {activeTab === "usdt" ? (
          <UsdtTransactionTableTab
            state={usdtState}
            setState={setUsdtState}
            selectedStatus={usdtStatus}
            setSelectedStatus={setUsdtStatus}
            handleSearch={(e) => {
              clearTimeout(window.usdtSearchTimeout2);
              window.usdtSearchTimeout2 = setTimeout(() => {
                setUsdtState((prev) => ({
                  ...prev,
                  search: e.target.value,
                  page: 1,
                }));
              }, 500);
            }}
          />
        ) : (
          <InrTransactionTableTab
            state={inrState}
            setState={setInrState}
            selectedStatus={inrStatus}
            setSelectedStatus={setInrStatus}
            handleSearch={(e) => {
              clearTimeout(window.inrSearchTimeout2);
              window.inrSearchTimeout2 = setTimeout(() => {
                setInrState((prev) => ({
                  ...prev,
                  search: e.target.value,
                  currentPage: 1,
                }));
              }, 500);
            }}
          />
        )}
      </div>
    </div>
  );
};

const CryptoWithdrawal = () => {
  const selectedToken = "USDT";

  const [formData, setFormData] = useState({
    amount: "",
  });
  const [amountInput, setAmountInput] = useState(""); // Local state for input
  const [idempotencyKey, setIdempotencyKey] = useState(null);
  const [errors, setErrors] = useState({});
  const [previewData, setPreviewData] = useState(null);
  const [debouncedAmount, setDebouncedAmount] = useState("");
  const requestId = `JAIMAX-${uuidv4()}-${Math.random().toString(36).substring(7)}`;

  const {
    data: conversionData,
    isLoading: conversionLoading,
    refetch: conversionRefetch,
  } = useInrToTokenPreviewQuery(selectedToken);

  const [previewWithdraw, { isLoading: previewLoading }] =
    usePreviewTokenWithdrawMutation();

  const [submitWithdraw, { isLoading: isSubmitting }] =
    useUsdtWithdrawRequestMutation();
  const { data: getSetting } = useGetSettingQuery();

  const walletData = conversionData?.data;
  const token = walletData?.token || selectedToken;
  const settings = getSetting?.data;

  const validate = () => {
    const errs = {};
    if (!formData.amount || Number(formData.amount) <= 0)
      errs.amount = "Enter valid amount";

    return errs;
  };

  const calculatePreview = async (amount) => {
    if (!amount) return setPreviewData(null);

    try {
      const res = await previewWithdraw({
        token: selectedToken,
        amount,
      });

      if (res?.data?.success) {
        setPreviewData(res.data.data);
      } else {
        toast.error(res?.error?.data?.message || "Preview failed");
        setPreviewData(null);
      }
    } catch {
      setPreviewData(null);
    }
  };

  useEffect(() => {
    if (!formData.amount) {
      setPreviewData(null);
      return;
    }

    const timer = setTimeout(() => {
      setDebouncedAmount(formData.amount);
    }, 500);

    return () => clearTimeout(timer);
  }, [formData.amount]);

  useEffect(() => {
    if (!debouncedAmount) return;
    calculatePreview(debouncedAmount);
  }, [debouncedAmount]);

  // Handle text input change (just update local state)
  const handleInputChange = (e) => {
    const { value } = e.target;
    // Only allow numbers and decimal point
    if (!/^\d*\.?\d*$/.test(value)) return;
    setAmountInput(value);
  };

  // Handle Enter key press
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      if (amountInput.trim() === "") {
        setErrors({ amount: "Enter valid amount" });
        return;
      }

      setFormData({ amount: amountInput });
      setErrors({});
      setPreviewData(null);
      setIdempotencyKey(null);
    }
  };

  // Handle focus out (optional - if you want to validate on blur)
  const handleBlur = () => {
    // You can optionally trigger preview on blur
    // Or leave empty if you only want Enter key
  };

  const handleSubmit = async () => {
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }

    if (!previewData) {
      toast.error("Please wait for preview");
      return;
    }

    // ✅ Generate key once per submit attempt, reuse on retry
    const keyToUse =
      idempotencyKey ??
      (() => {
        const newKey = `JAIMAX-${selectedToken}-${formData.amount}-${uuidv4()}`;
        setIdempotencyKey(newKey);
        return newKey;
      })();

    console.log("Using idempotency key:", keyToUse);
    const res = await submitWithdraw({
      token: selectedToken,
      amount: formData.amount,
      idempotencyKey: keyToUse,
      requestId,
    });

    if (res?.data?.success) {
      toast.success(res?.data?.message || "Withdrawal submitted");
      setFormData({ amount: "" });
      setAmountInput(""); // Clear input state too
      setPreviewData(null);
      setIdempotencyKey(null);
      conversionRefetch();
    } else {
      const errorMessage =
        res?.error?.data?.message || res?.data?.message || "Withdrawal failed";
      toast.error(errorMessage);
      // ✅ Do NOT clear idempotencyKey on failure — same key reused on retry
      // ✅ If error is "already processed", clear it to allow new withdrawal
      if (
        errorMessage.includes("already used with different parameters") ||
        errorMessage.includes("Withdrawal successful") // duplicate detected, treat as success
      ) {
        setIdempotencyKey(null);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-4">
      <div className="max-w-screen mx-auto px-3 sm:px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
          <div className="lg:col-span-4">
            <div className="bg-white rounded-lg border p-4 shadow-sm">
              <h2 className="font-semibold mb-3">Token Withdrawal</h2>

              {conversionLoading ? (
                <Loader />
              ) : (
                <div className="bg-gradient-to-r from-[#1d8d84] to-[#00d4aa] p-3 rounded text-white mb-4">
                  <p className="text-xs">Available Balance</p>
                  <p className="text-lg font-bold">
                    {walletData?.estimatedTokenAmount} {token}
                  </p>
                  <p className="text-xs">
                    ≈ ₹{walletData?.walletINRBalance}
                  </p>
                </div>
              )}

              <p className="text-xs bg-blue-50 p-2 rounded mb-3">
                <Info className="w-3 h-3 inline mr-1" />₹
                {walletData?.conversionRate} / {token}
              </p>

              <div>
                <input
                  type="text"
                  placeholder={`Amount (INR) - Press Enter to confirm`}
                  value={amountInput}
                  onChange={handleInputChange}
                  onKeyPress={handleKeyPress}
                  onBlur={handleBlur}
                  className="w-full border px-3 py-2 bg-white rounded mt-3 focus:ring-2 focus:ring-[#1d8d84] focus:border-transparent"
                />
                {errors.amount && (
                  <p className="text-xs text-red-600 mt-1">{errors.amount}</p>
                )}
              </div>

              {/* Display confirmed amount */}
              {formData.amount && (
                <div className="text-xs text-gray-600 mt-2 p-2 bg-blue-50 rounded">
                  Confirmed amount: <span className="font-semibold">{formData.amount} INR</span>
                </div>
              )}

              {previewLoading ? (
                <Loader />
              ) : (
                previewData && (
                  <div className="bg-gray-50 border rounded p-3 mt-3 text-xs space-y-1">
                    <div className="flex justify-between">
                      <span>Requested</span>
                      <span>
                        {formData.amount} ₹
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Equivalent USDT</span>
                      <span>
                        {previewData.tokenEquivalent} USDT
                      </span>
                    </div>
                    <div className="flex justify-between text-red-600">
                      <span>Transaction fee</span>
                      <span>
                        -{previewData.adminFeeToken} {token}
                      </span>
                    </div>
                    <div className="flex justify-between text-red-600">
                      <span>Network Fee</span>
                      <span>
                        -{previewData.networkFeeToken} {token}
                      </span>
                    </div>
                    <div className="flex justify-between font-semibold">
                      <span>Total Fee</span>
                      <span>
                        {previewData.totalTokenFees} {token}
                      </span>
                    </div>
                    <div className="flex justify-between text-green-600 font-bold">
                      <span>You Receive</span>
                      <span>
                        {previewData.finalTokenReceived} {token}
                      </span>
                    </div>
                    {/* <div className="flex justify-between text-gray-600 pt-1 border-t">
                      <span>INR Deduction</span>
                      <span>₹{previewData.finalTokenReceived}</span>
                    </div> */}
                  </div>
                )
              )}

              <button
                disabled={
                  isSubmitting ||
                  previewLoading ||
                  !previewData ||
                  !formData.amount
                }
                onClick={handleSubmit}
                className="w-full mt-4 bg-[#1d8d84] py-2 rounded flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#1a7a73] transition-colors"
              >
                {isSubmitting ? (
                  <>
                    <Loader />
                    <span className="text-white">Processing...</span>
                  </>
                ) : (
                  <span className="text-white">Submit Withdrawal</span>
                )}
              </button>
            </div>
          </div>

          <div className="lg:col-span-8 space-y-4">
            <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-base font-semibold text-gray-900">
                  Registered Wallet
                </h2>
                <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium flex items-center gap-1">
                  <CheckCircle className="w-3 h-3" />
                  BSC Network
                </span>
              </div>
              <div className="grid grid-cols-1 gap-3">
                <div className="bg-gradient-to-r from-gray-50 to-white p-3 rounded-lg border border-gray-200">
                  <label className="block text-xs font-medium text-gray-500 uppercase mb-1">
                    Wallet Address
                  </label>
                  <div className="flex items-center gap-2">
                    <p className="text-sm text-gray-900 font-mono break-all flex-1">
                      {walletData?.walletAddress || "Not Available"}
                    </p>
                    {walletData?.walletAddress && (
                      <button
                        onClick={() =>
                          copyToClipboard(walletData.walletAddress)
                        }
                        className="text-[#1d8d84] hover:text-[#1e8064] p-1"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                    <label className="block text-xs font-medium text-gray-500 uppercase mb-1">
                      Network
                    </label>
                    <p className="text-sm text-gray-900 font-medium">
                      BSC(BEP20)
                    </p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                    <label className="block text-xs font-medium text-gray-500 uppercase mb-1">
                      Status
                    </label>
                    <p className="text-sm text-gray-900 font-medium">Active</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
              <h2 className="text-base font-semibold text-gray-900 mb-3">
                Terms & Conditions
              </h2>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                <div className="flex gap-2">
                  <AlertTriangle className="w-4 h-4 text-yellow-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-xs font-semibold text-yellow-800 mb-1">
                      Important Notes
                    </h3>
                    <ul className="text-xs text-yellow-700 space-y-1">
                      <li>• Ensure wallet supports BSC (BEP20) network</li>
                      <li>
                        • Transaction fee{" "}
                        {settings?.withdrawal_commission_usd || 0}% and network
                        fee {settings?.network_fee_token || 0}% will be deducted
                      </li>
                      <li>• Complete KYC verification for withdrawals</li>
                      <li>
                        • Withdrawal amount will be deducted from your INR
                        balance
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Combined Transaction History with Tabs ── */}
        <div className="mt-4">
          <CombinedHistorySection />
        </div>
      </div>
    </div>
  );
};
export default CryptoWithdrawal;







