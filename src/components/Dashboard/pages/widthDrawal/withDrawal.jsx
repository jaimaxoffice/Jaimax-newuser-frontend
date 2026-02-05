// import React, { useState, useEffect, useMemo } from "react";
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
// import Pagination from "../../../../ReusableComponents/pagination/pagination";
// import ReusableTable from "../../../../ReusableComponents/tables/reusableTable";
// import {
//   useWithdrawHistoryQuery,
//   useWithdrawRequestMutation,
//   useGetSettingQuery,
// } from "./withdrawApiSlice";
// import { useUserDataQuery } from "../../../Dashboard/pages/dashBoard/DashboardApliSlice";
// import { useGetkycDetailsQuery } from "../../../Dashboard/pages/kyc/kycApiSlice";
// import { toast } from "../../../../ReusableComponents/Toasts/Toasts";
// import Cookies from "js-cookie";

// const TransactionTable = ({
//   state,
//   setState,
//   selectedStatus,
//   setSelectedStatus,
//   handleSearch,
//   loading,
// }) => {
//   const [isMobile, setIsMobile] = useState(false);
//   const [page, setPage] = useState(1);
//   const [limit, setLimit] = useState(10);

//   // Create query string with proper pagination
//   const queryString = useMemo(() => {
//     const params = new URLSearchParams();
//     params.append("page", state?.currentPage || page);
//     params.append("limit", state?.perPage || limit);
//     if (selectedStatus) params.append("status", selectedStatus);
//     if (state?.search) params.append("search", state.search);
//     return params.toString();
//   }, [state, selectedStatus, page, limit]);

//   const { data, isLoading, isFetching } = useWithdrawHistoryQuery(queryString);

//   const transactions = data?.data?.withdrawRequests || [];
//   const pagination = data?.data?.pagination || {};

//   // Check for mobile view
//   useEffect(() => {
//     const checkMobile = () => {
//       setIsMobile(window.innerWidth < 768);
//     };

//     checkMobile();
//     window.addEventListener("resize", checkMobile);
//     return () => window.removeEventListener("resize", checkMobile);
//   }, []);

//   // Helper functions for display
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

//   const handlePageChange = (page) => {
//     setState({ ...state, currentPage: page });
//   };

//   // Define columns for ReusableTable
//   const columns = useMemo(
//     () => [
//       {
//         header: "#",
//         accessor: "index",
//         render: (row, index) => (
//           <span className="text-center text-gray-600 font-medium">
//             {(state?.currentPage || 1) * (state?.perPage || 10) -
//               ((state?.perPage || 10) - 1) +
//               index}
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
//             {row._id && (
//               <button
//                 className="ml-1 text-gray-400 hover:text-[#1d8e85]"
//                 title="Copy ID"
//                 onClick={() => {
//                   navigator.clipboard.writeText(row._id);
//                   toast.success("Transaction ID copied to clipboard", {
//                     autoClose: 1500,
//                   });
//                 }}
//               >
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   className="h-3.5 w-3.5"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
//                   />
//                 </svg>
//               </button>
//             )}
//           </div>
//         ),
//       },
//       {
//         header: "User",
//         accessor: "userId",
//         render: (row) => row.userId?.email || "-",
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

//   // Mobile card component
//   const TransactionCard = ({ transaction, index }) => (
//     <div className="bg-white rounded-md overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 group">
//       {/* Decorative top accent */}
//       <div className="h-1 bg-gradient-to-r from-[#1d8e85] via-[#25b5aa] to-[#1d8e85] animate-gradient-x"></div>

//       {/* Header with shine effect */}
//       <div className="relative p-2.5 bg-gradient-to-r from-gray-50 to-white flex items-center justify-between overflow-hidden">
//         <div className="flex items-center gap-2.5 z-10">
//           <div className="flex items-center justify-center w-7 h-7 rounded-full bg-gradient-to-br from-[#1d8e85] to-[#106b64] text-white shadow-sm group-hover:shadow transition-shadow relative">
//             <span className="text-xs font-bold">{index + 1}</span>
//           </div>
//           <div>
//             <span className="text-[10px] text-gray-500 uppercase tracking-wide block leading-tight font-medium">
//               Transaction ID
//             </span>
//             <span className="text-xs font-bold text-gray-800 truncate block group-hover:text-[#1d8e85] transition-colors">
//               {transaction._id ? `...${transaction._id.slice(-6)}` : "-"}
//             </span>
//           </div>
//         </div>

//         <span
//           className={`text-xs px-2 py-0.5 rounded-full border ${getStatusColor(
//             transaction.status
//           )} transform transition-transform shadow-sm z-10 relative`}
//         >
//           <span className="inline-block w-1.5 h-1.5 rounded-full bg-current mr-1 align-middle animate-pulse"></span>
//           {getStatusText(transaction.status)}
//         </span>
//       </div>

//       {/* Amount section */}
//       <div className="p-3 bg-gradient-to-r from-gray-50 to-white border-y border-gray-100 relative overflow-hidden">
//         <div className="flex justify-between items-center">
//           <div className="relative">
//             <span className="text-[10px] text-[#1d8e85] uppercase tracking-wide block leading-tight font-medium">
//               Amount
//             </span>
//             <span className="text-sm font-extrabold text-gray-800 group-hover:text-[#1d8e85] transition-colors">
//               {transaction.amount
//                 ? transaction.currency === "INR"
//                   ? `₹${parseFloat(transaction.amount).toFixed(2)}`
//                   : `$${parseFloat(transaction.amount).toFixed(2)}`
//                 : "-"}
//             </span>
//           </div>
//           <div className="relative">
//             <span className="text-[10px] text-red-500 uppercase tracking-wide block leading-tight font-medium text-right">
//               Fee
//             </span>
//             <span className="text-xs font-bold text-red-600 block text-right">
//               {transaction.admin_inr_charges
//                 ? transaction.currency === "INR"
//                   ? `₹${transaction.admin_inr_charges}`
//                   : `$${transaction.admin_inr_charges}`
//                 : "-"}
//             </span>
//           </div>
//         </div>
//       </div>

//       {/* Details section */}
//       <div className="p-2.5 text-xs space-y-2">
//         <div className="grid grid-cols-2 gap-2">
//           <div className="rounded bg-gray-50 p-1.5 border border-gray-100 group-hover:border-[#1d8e85]/20 transition-colors">
//             <span className="text-[10px] text-gray-500 uppercase block mb-0.5 font-medium">
//               Currency
//             </span>
//             <span className="font-bold text-gray-800">
//               {transaction.currency || "-"}
//             </span>
//           </div>
//           <div className="rounded bg-gray-50 p-1.5 border border-gray-100 group-hover:border-[#1d8e85]/20 transition-colors">
//             <span className="text-[10px] text-gray-500 uppercase block mb-0.5 font-medium">
//               Date
//             </span>
//             <span className="font-bold text-gray-800 text-[11px]">
//               {formatDateWithAmPm(transaction.created_at)}
//             </span>
//           </div>
//         </div>

//         {transaction.userId && transaction.userId.email && (
//           <div className="rounded bg-gray-50 p-1.5 border border-gray-100 group-hover:border-[#1d8e85]/20 transition-colors">
//             <span className="text-[10px] text-gray-500 uppercase block mb-0.5 font-medium">
//               Email
//             </span>
//             <span className="font-bold text-gray-800 text-[11px] truncate">
//               {transaction.userId.email}
//             </span>
//           </div>
//         )}

//         {(transaction.reason || transaction.note) && (
//           <div className="pt-1 mt-1 border-t border-dashed border-gray-200">
//             {transaction.reason && (
//               <div className="mb-1.5">
//                 <div className="flex items-center gap-1 mb-1">
//                   <span className="w-1 h-3 bg-[#1d8e85] rounded-full"></span>
//                   <span className="text-[10px] text-gray-500 uppercase font-medium">
//                     Reason
//                   </span>
//                 </div>
//                 <p className="text-[11px] text-gray-700 bg-gray-50 p-1.5 rounded border border-gray-100">
//                   {transaction.reason}
//                 </p>
//               </div>
//             )}

//             {transaction.note && (
//               <div>
//                 <div className="flex items-center gap-1 mb-1">
//                   <span className="w-1 h-3 bg-[#1d8e85] rounded-full"></span>
//                   <span className="text-[10px] text-gray-500 uppercase font-medium">
//                     Note
//                   </span>
//                 </div>
//                 <p className="text-[11px] text-gray-700 bg-gray-50 p-1.5 rounded border border-gray-100">
//                   {transaction.note}
//                 </p>
//               </div>
//             )}
//           </div>
//         )}
//       </div>

//       {/* Card Footer */}
//       <div className="h-1 bg-gradient-to-r from-transparent via-gray-200 to-transparent opacity-70"></div>
//     </div>
//   );

//   return (
//     <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
//       {/* Header with Filters */}
//       <div className="px-4 sm:px-6 py-4 border-b border-gray-200 bg-gray-50">
//         <div className="flex flex-col gap-4">
//           <div className="flex items-center gap-2">
//             <h3 className="text-lg font-semibold text-gray-900">
//               Withdrawal History
//             </h3>
//             {isMobile && <Smartphone className="w-4 h-4 text-gray-500" />}
//           </div>

//           {/* Filters */}
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
//                   className="w-full pl-10 pr-4 bg-white py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-[#1d8e85] focus:border-[#1d8e85]"
//                 />
//                 <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Table Content */}
//       {isMobile ? (
//         // Mobile Card View
//         <div className="p-4">
//           <div className="space-y-4">
//             {isLoading || loading ? (
//               [...Array(3)].map((_, i) => (
//                 <div
//                   key={i}
//                   className="bg-gray-200 animate-pulse rounded-xl h-48"
//                 ></div>
//               ))
//             ) : !transactions || transactions.length === 0 ? (
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
//         // Desktop Table View - Using ReusableTable
//         <div className="overflow-x-auto">
//           <ReusableTable
//             columns={columns}
//             data={transactions}
//             isLoading={isLoading || loading}
//           />
//         </div>
//       )}
//     </div>
//   );
// };

// // Rest of the Withdrawal component remains the same...
// const Withdrawal = () => {
//   const { data: userData, refetch } = useUserDataQuery();
//   const { data: getSetting } = useGetSettingQuery();
//   const { data: kycDetails } = useGetkycDetailsQuery();
//   const [withdrawRequest, { isLoading: isSubmitting }] =
//     useWithdrawRequestMutation();

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

//   const [previewData, setPreviewData] = useState([
//     { heading: "Fees", subHeading: "0" },
//     { heading: "Will Get", subHeading: "0" },
//   ]);

//   // Set default currency based on user's country
//   useEffect(() => {
//     if (userData?.data) {
//       const defaultCurrency = userData.data.countryCode === 91 ? "INR" : "USD";
//       if (formData.paymentCurrency !== defaultCurrency) {
//         setFormData((prev) => ({ ...prev, paymentCurrency: defaultCurrency }));
//       }
//     }
//   }, [userData?.data, formData.paymentCurrency]);

//   // Validation function
//   const validate = () => {
//     const errors = {};
//     const { balanceType, paymentCurrency, amount } = formData;

//     if (!balanceType) errors.balanceType = "Balance Type is required";

//     if (balanceType === "referral" && !paymentCurrency) {
//       errors.paymentCurrency = "Payment Currency is required";
//     }

//     if (!amount) {
//       errors.amount = "Amount is required";
//     } else if (isNaN(amount) || parseFloat(amount) <= 0) {
//       errors.amount = "Amount must be a positive number";
//     } else if (balanceType === "referral") {
//       const settings = getSetting?.data;
//       if (settings) {
//         const currency =
//           paymentCurrency ||
//           (userData?.data?.countryCode === 91 ? "INR" : "USD");
//         const isINR = currency === "INR";
//         const min = isINR
//           ? settings.min_withdrawal_inr
//           : settings.min_withdrawal_usd;
//         const max = isINR
//           ? settings.max_withdrawal_inr
//           : settings.max_withdrawal_usd;

//         if (parseFloat(amount) < min || parseFloat(amount) > max) {
//           errors.amount = `Amount must be between ${min} and ${max} ${currency}`;
//         }
//       }
//     }

//     return errors;
//   };

//   // Calculate fees and preview amount
//   const calculatePreview = useMemo(() => {
//     return (amount, paymentCurrency) => {
//       if (!getSetting?.data || !amount) return;

//       const settings = getSetting.data;
//       const parsedAmount = parseFloat(amount);

//       const isINR = paymentCurrency === "INR";
//       const minLimit = isINR
//         ? settings.min_withdrawal_inr
//         : settings.min_withdrawal_usd;
//       const maxLimit = isINR
//         ? settings.max_withdrawal_inr
//         : settings.max_withdrawal_usd;
//       const commission = isINR
//         ? settings.withdrawal_commission_inr
//         : settings.withdrawal_commission_usd;

//       if (parsedAmount < minLimit || parsedAmount > maxLimit) {
//         toast.warning(
//           `Withdrawal amount should be between ${minLimit} and ${maxLimit} ${paymentCurrency}.`
//         );
//         return;
//       }

//       const fees = (parsedAmount * commission) / 100;
//       const willGet = parsedAmount - fees;

//       setPreviewData([
//         {
//           heading: "Fees",
//           subHeading: `${fees.toFixed(2)} ${paymentCurrency}`,
//         },
//         {
//           heading: "Will Get",
//           subHeading: `${willGet.toFixed(2)} ${paymentCurrency}`,
//         },
//       ]);
//     };
//   }, [getSetting?.data]);

//   // Handle input changes
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;

//     if (name === "amount" && !/^\d*\.?\d*$/.test(value)) {
//       return;
//     }

//     setFormData((prev) => ({ ...prev, [name]: value }));

//     if (value) {
//       setErrors((prev) => ({ ...prev, [name]: undefined }));
//     }

//     if (name === "amount" && !value) {
//       setPreviewData([
//         { heading: "Fees", subHeading: "0" },
//         { heading: "Will Get", subHeading: "0" },
//       ]);
//     }
//   };

//   // Calculate preview on amount blur
//   const onBlurAmount = (e) => {
//     if (e.target.value) {
//       calculatePreview(
//         e.target.value,
//         formData.paymentCurrency ||
//           (userData?.data?.countryCode === 91 ? "INR" : "USD")
//       );
//     }
//   };

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const validationErrors = validate();

//     if (Object.keys(validationErrors).length > 0) {
//       setErrors(validationErrors);
//       return;
//     }

//     try {
//       const { amount, balanceType, paymentCurrency } = formData;
//       const currency =
//         paymentCurrency ||
//         (userData?.data?.countryCode === 91 ? "INR" : "USD");

//       let requestData;
//       if (balanceType === "referral") {
//         requestData = {
//           amount: parseFloat(amount),
//           currency,
//           currencyType: currency,
//         };
//       } else if (balanceType === "JAIMAX") {
//         requestData = {
//           amount: parseFloat(amount),
//           currency: balanceType,
//         };
//       } else {
//         toast.error("Invalid balance type");
//         return;
//       }

//       const response = await withdrawRequest(requestData).unwrap();

//       if (response.success) {
//         setFormData({
//           balanceType: "referral",
//           paymentCurrency:
//             userData?.data?.countryCode === 91 ? "INR" : "USD",
//           amount: "",
//         });

//         setPreviewData([
//           { heading: "Fees", subHeading: "0" },
//           { heading: "Will Get", subHeading: "0" },
//         ]);

//         toast.success(
//           response.message || "Withdrawal request submitted successfully"
//         );
//         refetch();
//       } else {
//         toast.error(response.message || "Failed to submit withdrawal request");
//       }
//     } catch (error) {
//       toast.error(
//         error?.data?.message ||
//           "An error occurred while processing your request"
//       );
//     }
//   };

//   // Clear validation errors
//   const clearErrors = () => setErrors({});

//   // Currency symbol helper
//   const addSymbolPlaceholder = (value) => {
//     return value === "INR" ? "₹" : value === "USD" ? "$" : "";
//   };

//   // Handle balance type change
//   const onChangeBalanceType = (e) => {
//     const newBalanceType = e.target.value;
//     setFormData({
//       amount: "",
//       balanceType: newBalanceType,
//       paymentCurrency:
//         newBalanceType === "referral"
//           ? userData?.data?.countryCode === 91
//             ? "INR"
//             : "USD"
//           : "",
//     });

//     setPreviewData([
//       { heading: "Fees", subHeading: "0" },
//       { heading: "Will Get", subHeading: "0" },
//     ]);
//   };

//   // Clean up any timeouts on unmount
//   useEffect(() => {
//     return () => {
//       if (window.searchTimeout) {
//         clearTimeout(window.searchTimeout);
//       }
//     };
//   }, []);

//   return (
//     <div className="min-h-screen bg-gray-50 py-4">
//       <div className="max-w-screen mx-auto px-3 sm:px-4">
//         <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 auto-rows-auto">
//           {/* Left Column - Withdrawal Form */}
//           <div className="lg:col-span-4 h-full">
//             <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm h-full">
//               <div className="mb-4">
//                 <h2 className="text-base font-semibold text-gray-900 mb-3">
//                   Withdrawal Request
//                 </h2>

//                 {/* Balance Display */}
//                 <div className="bg-gradient-to-r from-[#1d8e85] to-[#16a085] rounded-lg p-3 text-white mb-4">
//                   <div className="flex items-center justify-between">
//                     <div>
//                       <p className="text-xs opacity-90">Available Balance</p>
//                       <p className="text-lg font-bold">
//                         ₹{userData?.data?.Inr?.toLocaleString("en-IN") || "0"}
//                       </p>
//                     </div>
//                     <CreditCard className="w-5 h-5 opacity-80" />
//                   </div>
//                 </div>
//               </div>

//               <div className="space-y-4">
//                 <div>
//                   <label
//                     htmlFor="balanceType"
//                     className="block text-xs font-medium text-gray-700 mb-1"
//                   >
//                     Source Account
//                   </label>
//                   <select
//                     id="balanceType"
//                     name="balanceType"
//                     value={formData.balanceType}
//                     onChange={onChangeBalanceType}
//                     onClick={clearErrors}
//                     className="w-full text-white px-2.5 py-1.5 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-[#1d8e85] focus:border-[#1d8e85] bg-[#1d8e85]"
//                   >
//                     <option value="referral">Available Balance</option>
//                     <option value="JAIMAX">Purchase Token (JaiMax)</option>
//                   </select>
//                   {errors.balanceType && (
//                     <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
//                       <AlertTriangle className="w-3 h-3" />
//                       {errors.balanceType}
//                     </p>
//                   )}
//                   {formData.balanceType === "referral" && (
//                     <p className="text-gray-600 mt-1 text-xs">
//                       Total Available: ₹
//                       {userData?.data?.Inr?.toFixed(2) || "0.00"}
//                     </p>
//                   )}
//                 </div>

//                 {formData.balanceType === "referral" && (
//                   <>
//                     <div className="grid grid-cols-2 gap-3">
//                       <div>
//                         <label className="block text-xs font-medium text-gray-700 mb-1">
//                           Currency
//                         </label>
//                         <div className="px-2.5 py-1.5 bg-gray-100 border border-gray-300 rounded text-gray-900 font-medium text-center text-sm">
//                           {formData.paymentCurrency ||
//                             (userData?.data?.countryCode === 91
//                               ? "INR"
//                               : "USD")}
//                         </div>
//                       </div>
//                       <div>
//                         <label
//                           htmlFor="amount"
//                           className="block text-xs font-medium text-gray-700 mb-1"
//                         >
//                           Amount *
//                         </label>
//                         <input
//                           id="amount"
//                           type="text"
//                           placeholder={`Enter Amount ${addSymbolPlaceholder(
//                             formData.paymentCurrency ||
//                               (userData?.data?.countryCode === 91
//                                 ? "INR"
//                                 : "USD")
//                           )}`}
//                           value={formData.amount}
//                           onChange={handleInputChange}
//                           onBlur={onBlurAmount}
//                           onClick={() =>
//                             setErrors((prev) => ({
//                               ...prev,
//                               amount: undefined,
//                             }))
//                           }
//                           name="amount"
//                           autoComplete="off"
//                           className={`w-full px-2.5 py-1.5 bg-white text-sm border rounded focus:ring-2 focus:ring-[#1d8e85] focus:border-[#1d8e85] ${
//                             errors.amount
//                               ? "border-red-300 bg-red-50"
//                               : "border-gray-300"
//                           }`}
//                         />
//                       </div>
//                     </div>
//                     {errors.amount && (
//                       <p className="text-xs text-red-600 flex items-center gap-1">
//                         <AlertTriangle className="w-3 h-3" />
//                         {errors.amount}
//                       </p>
//                     )}

//                     {/* Transaction Summary */}
//                     {formData.amount && (
//                       <div className="border border-gray-200 rounded p-3 bg-gray-50">
//                         <h3 className="text-xs font-medium text-gray-900 mb-2">
//                           Transaction Summary
//                         </h3>
//                         <div className="space-y-1.5 text-xs">
//                           {previewData.map((data, i) => (
//                             <div key={i} className="flex justify-between">
//                               <span
//                                 className={
//                                   data.heading === "Fees"
//                                     ? "text-red-600"
//                                     : "text-gray-600"
//                                 }
//                               >
//                                 {data.heading}
//                               </span>
//                               <span
//                                 className={
//                                   data.heading === "Will Get"
//                                     ? "text-[#1d8e85] font-semibold"
//                                     : "font-medium"
//                                 }
//                               >
//                                 {data.subHeading}
//                               </span>
//                             </div>
//                           ))}
//                         </div>
//                       </div>
//                     )}
//                   </>
//                 )}

//                 {formData.balanceType === "JAIMAX" && (
//                   <div className="text-center py-4">
//                     <h5 className="text-gray-600 text-sm font-medium">
//                       Coming Soon
//                     </h5>
//                     <p className="text-gray-500 text-xs mt-1">
//                       JaiMax token withdrawal will be available soon
//                     </p>
//                   </div>
//                 )}

//                 <button
//                   type="button"
//                   onClick={handleSubmit}
//                   disabled={isSubmitting || formData.balanceType === "JAIMAX"}
//                   className="w-full bg-[#1d8e85] text-white py-2 px-3 text-sm rounded font-medium hover:bg-[#166f67] focus:ring-2 focus:ring-[#1d8e85] focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-1.5 transition-colors"
//                 >
//                   {isSubmitting ? (
//                     <>
//                       <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
//                       Processing...
//                     </>
//                   ) : (
//                     <>
//                       Submit Withdrawal
//                       <ArrowRight className="w-3.5 h-3.5" />
//                     </>
//                   )}
//                 </button>
//               </div>
//             </div>
//           </div>

//           {/* Right Column - Bank Details & Terms */}
//           <div className="lg:col-span-8 space-y-4 flex flex-col">
//             {/* Bank Details */}
//             <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
//               <div className="flex items-center justify-between mb-3">
//                 <h2 className="text-base font-semibold text-gray-900">
//                   Destination Account
//                 </h2>
//               </div>

//               <div className="grid grid-cols-2 gap-x-4 gap-y-3">
//                 <div>
//                   <label className="block text-xs font-medium text-gray-500 uppercase mb-0.5">
//                     Account Holder
//                   </label>
//                   <p className="text-sm text-gray-900 font-medium">
//                     {kycDetails?.data?.name || "Not Available"}
//                   </p>
//                 </div>

//                 <div>
//                   <label className="block text-xs font-medium text-gray-500 uppercase mb-0.5">
//                     Account Number
//                   </label>
//                   <p className="text-sm text-gray-900 font-medium break-all">
//                     {kycDetails?.data?.bank_account || "Not Available"}
//                   </p>
//                 </div>

//                 <div>
//                   <label className="block text-xs font-medium text-gray-500 uppercase mb-0.5">
//                     {userData?.data?.countryCode === 91 ? "IFSC" : "Bank"} Code
//                   </label>
//                   <p className="text-sm text-gray-900 font-medium">
//                     {kycDetails?.data?.ifsc_code || "Not Available"}
//                   </p>
//                 </div>

//                 <div>
//                   <label className="block text-xs font-medium text-gray-500 uppercase mb-0.5">
//                     Bank Name
//                   </label>
//                   <p className="text-sm text-gray-900 font-medium">
//                     {kycDetails?.data?.bank_name || "Not Available"}
//                   </p>
//                 </div>
//               </div>
//             </div>

//             {/* Processing Information */}
//             <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
//               <h2 className="text-base font-semibold text-gray-900 mb-3">
//                 Terms & Conditions
//               </h2>

//               <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-3">
//                 <div className="flex items-center gap-2 p-2 bg-blue-50 rounded border border-blue-200">
//                   <Clock className="w-4 h-4 text-blue-600 flex-shrink-0" />
//                   <div>
//                     <p className="text-xs font-medium text-blue-900">
//                       Processing Time
//                     </p>
//                     <p className="text-[10px] text-blue-700">Within 24 hours</p>
//                   </div>
//                 </div>

//                 <div className="flex items-center gap-2 p-2 bg-green-50 rounded border border-green-200">
//                   <Shield className="w-4 h-4 text-green-600 flex-shrink-0" />
//                   <div>
//                     <p className="text-xs font-medium text-green-900">
//                       Working Hours
//                     </p>
//                     <p className="text-[10px] text-green-700">
//                       Mon-Fri, 10 AM - 4 PM
//                     </p>
//                   </div>
//                 </div>

//                 <div className="flex items-center gap-2 p-2 bg-orange-50 rounded border border-orange-200">
//                   <Info className="w-4 h-4 text-orange-600 flex-shrink-0" />
//                   <div>
//                     <p className="text-xs font-medium text-orange-900">
//                       Processing Fee
//                     </p>
//                     <p className="text-[10px] text-orange-700">
//                       {getSetting?.data?.withdrawal_commission_inr || "0.5"}%
//                       per transaction
//                     </p>
//                   </div>
//                 </div>
//               </div>

//               <div className="bg-yellow-50 border border-yellow-200 rounded p-3">
//                 <div className="flex gap-2">
//                   <AlertTriangle className="w-4 h-4 text-yellow-600 flex-shrink-0 mt-0.5" />
//                   <div>
//                     <h3 className="text-xs font-semibold text-yellow-800">
//                       Important Notes
//                     </h3>
//                     <ul className="text-xs text-yellow-700 mt-1.5 space-y-1">
//                       <li>
//                         • Complete KYC and get approved status before withdrawal
//                       </li>
//                       <li>• Banking hours: 10 AM to 4 PM (Mon-Fri)</li>
//                       <li>
//                         • Funds credited within 24 hours of withdrawal request
//                       </li>
//                       <li>
//                         • Please verify bank details before initiating
//                         withdrawal
//                       </li>
//                     </ul>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Transaction History */}
//         <div className="mt-4">
//           <TransactionTable
//             state={state}
//             setState={setState}
//             selectedStatus={selectedStatus}
//             setSelectedStatus={setSelectedStatus}
//             handleSearch={(e) => {
//               clearTimeout(window.searchTimeout);
//               window.searchTimeout = setTimeout(() => {
//                 setState({ ...state, search: e.target.value, currentPage: 1 });
//               }, 500);
//             }}
//             loading={loading}
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Withdrawal;

import React, { useState, useEffect } from "react";
import {
  AlertTriangle,
  CheckCircle,
  Info,
  Wallet,
  Smartphone,
  Search,
  Copy,
  ArrowRight,
} from "lucide-react";

import {
  useUsdtWithdrawHistoryQuery,
  useInrToTokenPreviewQuery,
  useUsdtWithdrawRequestMutation,
  usePreviewTokenWithdrawMutation,
  useGetSettingQuery,
} from "./withdrawApiSlice";

import Pagination from "../../../../ReusableComponents/pagination/pagination";
import { toast } from "../../../../ReusableComponents/Toasts/Toasts";
import Loader from "../../../../ReusableComponents/Loader/loader";

const copyToClipboard = (text) => {
  navigator.clipboard.writeText(text);
  toast.success("Copied");
};

const TransactionTable = ({
  state,
  setState,
  selectedStatus,
  setSelectedStatus,
  handleSearch,
  loading,
  transactions,
  pagination,
}) => {
  const [isMobile, setIsMobile] = useState(false);

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

    // Remove milliseconds and Z
    const clean = isoString.replace("Z", "").split(".")[0];

    const [datePart, timePart] = clean.split("T");
    const [year, month, day] = datePart.split("-");
    let [hours, minutes] = timePart.split(":");

    hours = parseInt(hours, 10);
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;

    return `${day}-${month}-${year} ${hours}:${minutes} ${ampm}`;
  };

  const copyToClipboard = (text, label) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} copied`);
  };

  const TransactionCard = ({ transaction, index }) => (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all">
      <div className="h-1 bg-gradient-to-r from-[#1d8d84] via-[#00d4aa] to-[#1d8d84]"></div>

      <div className="p-3 bg-gradient-to-r from-gray-50 to-white flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#1d8d84] to-[#1e8064] text-white flex items-center justify-center">
            <Wallet className="w-4 h-4" />
          </div>
          <div>
            <span className="text-xs text-gray-500 uppercase block">
              Transaction ID
            </span>
            <span className="text-xs font-bold text-gray-800 block">
              {transaction._id ? `${transaction._id}` : "-"}
            </span>
          </div>
        </div>

        <span
          className={`text-xs px-2 py-1 rounded-full border ${getStatusColor(
            transaction.status,
          )}`}
        >
          {getStatusText(transaction.status)}
        </span>
      </div>

      <div className="p-4 bg-gradient-to-r from-gray-50 to-white border-y border-gray-100">
        <div className="flex justify-between items-center mb-3">
          <div>
            <span className="text-xs text-[#1d8d84] uppercase block font-medium">
              Amount
            </span>
            <span className="text-lg font-extrabold text-gray-800">
              {transaction.amount_in_token
                ? `${parseFloat(transaction.amount_in_token).toFixed(2)} ${transaction.currency}`
                : "-"}
            </span>
            <span className="text-xs text-gray-600 block">
              ≈ ₹{transaction.amount_in_inr?.toFixed(2) || "-"}
            </span>
          </div>
          <div className="text-right">
            <span className="text-[10px] text-teal-500 uppercase block font-semibold">
            Platform  Fee (INR)
            </span>
            <span className="text-sm font-bold text-teal-600">
              ₹{transaction.admin_inr_charges?.toFixed(2) || "-"}
            </span>
          </div>
          <div className="text-right">
            <span className="text-[10px] text-teal-500 uppercase block font-semibold">
              Platform Fee (USDT)
            </span>
            <span className="text-sm font-bold text-teal-600">
              ${transaction.total_fee_token?.toFixed(2) || "-"}
            </span>
          </div>
        </div>
      </div>

      <div className="p-3 space-y-2">
        <div className="grid grid-cols-2 gap-2">
          <div className="rounded bg-gray-50 p-2 border border-gray-100">
            <span className="text-xs text-gray-500 uppercase block mb-1">
              Rate
            </span>
            <span className="font-bold text-gray-800 text-sm">
              ₹{transaction.inr_price || "-"}
            </span>
          </div>
          <div className="rounded bg-gray-50 p-2 border border-gray-100">
            <span className="text-xs text-gray-500 uppercase block mb-1">
              Date
            </span>
            <span className="font-bold text-gray-800 text-xs">
              {formatDate(transaction.created_at)}
            </span>
          </div>
        </div>

        {transaction.txn_hash && (
          <div className="rounded bg-gray-50 p-2 border border-gray-100">
            <span className="text-xs text-gray-500 uppercase block mb-1">
              Tx Hash
            </span>
            <div className="flex items-center gap-1">
              <span className="font-mono text-xs text-gray-800 truncate flex-1">
                {transaction.txn_hash}
              </span>
              <button
                onClick={() => copyToClipboard(transaction.txn_hash, "Tx Hash")}
                className="text-[#1d8d84] hover:text-[#1e8064]"
              >
                <Copy className="w-3 h-3" />
              </button>
            </div>
          </div>
        )}

        {/* {transaction.reason && (
                    <div className="pt-2 border-t border-dashed border-gray-200">
                        <span className="text-xs text-gray-500 uppercase font-medium block mb-1">
                            Reason
                        </span>
                        <p className="text-xs text-gray-700 bg-gray-50 p-2 rounded border border-gray-100">
                            {transaction.reason}
                        </p>
                    </div>
                )} */}
      </div>
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

          <div className="flex flex-col sm:flex-row gap-3">
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
              <option value="2">Failed</option>
              <option value="0">Pending</option>
            </select>

            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Search transactions..."
                onChange={handleSearch}
                className="w-full pl-10 pr-4 py-2 bg-white border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-[#1d8d84]"
              />
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            </div>
          </div>
        </div>
      </div>

      {isMobile ? (
        <div className="p-4">
          <div className="space-y-4">
            {loading ? (
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
                  No transactions found
                </h3>
                <p className="text-gray-500">
                  Your withdrawal history will appear here
                </p>
              </div>
            ) : (
              transactions.map((transaction, index) => (
                <TransactionCard
                  key={transaction._id}
                  transaction={transaction}
                  index={index}
                />
              ))
            )}
          </div>
        </div>
      ) : (
        <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 p-6">
          <table className="w-full border">
            <thead className="bg-[#1d8d84] text-white">
              <tr>
                <th className="px-3 py-2 text-left text-xs font-medium">#</th>
                <th className="px-3 py-2 text-left text-xs font-medium">
                  Transaction ID
                </th>
                 <th className="px-3 py-2 text-right text-xs font-medium">
                  Token Type
                </th>
                <th className="px-3 py-2 text-right text-xs font-medium">
                  Tokens
                </th>
                <th className="px-3 py-2 text-right text-xs font-medium">
                  Platform fee (USDT)
                </th>
               
                <th className="px-3 py-2 text-right text-xs font-medium">
                  Amount (INR)
                </th>
                <th className="px-3 py-2 text-center text-xs font-medium">
                  Rate
                </th>
                <th className="px-3 py-2 text-right text-xs font-medium">
                   Platform Fee (INR)
                </th>
                <th className="px-3 py-2 text-center text-xs font-medium">
                  Date
                </th>
                <th className="px-3 py-2 text-center text-xs font-medium">
                  Status
                </th>
                <th className="px-3 py-2 text-left text-xs font-medium">
                  Tx Hash
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {loading ? (
                [...Array(3)].map((_, i) => (
                  <tr key={i}>
                    {[...Array(9)].map((_, j) => (
                      <td key={j} className="px-3 py-3">
                        <div className="bg-gray-200 animate-pulse h-4 rounded"></div>
                      </td>
                    ))}
                  </tr>
                ))
              ) : transactions.length === 0 ? (
                <tr>
                  <td
                    colSpan="9"
                    className="px-3 py-8 text-center text-gray-500"
                  >
                    No transactions found
                  </td>
                </tr>
              ) : (
                transactions.map((transaction, index) => (
                  <tr key={transaction._id} className="hover:bg-gray-50">
                    <td className="px-3 py-3 text-xs">
                      {(state.page - 1) * state.limit + index + 1}
                    </td>
                    <td className="px-3 py-3 text-xs">
                      <div className="flex items-center gap-1">
                        <span
                          className=" max-w-[140px]"
                          title={transaction._id}
                        >
                          {transaction._id
                            ? `${transaction._id}`
                            : "-"}
                        </span>
                       
                      </div>
                    </td>
                    <td className="px-3 py-3 text-center text-xs font-medium">
                      {transaction.currency || "-"}
                    </td>
                    <td className="px-3 py-3 text-center text-xs font-medium">
                      {transaction.amount_in_token
                        ? `${parseFloat(transaction.amount_in_token).toFixed(2)}`
                        : "-"}
                    </td>
                   
                  
                    
                     <td className="px-3 py-3 text-center text-xs font-medium">
                      {transaction.total_fee_token
                        ? `${parseFloat(transaction.total_fee_token).toFixed(2)}`
                        : "-"}
                    </td>
                    <td className="px-3 py-3 text-center text-xs font-medium text-gray-600">
                      ₹{transaction.amount_in_inr?.toFixed(2) || "-"}
                    </td>
                    <td className="px-3 py-3 text-center text-xs">
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full font-medium">
                        ₹{transaction.inr_price || "-"}
                      </span>
                    </td>
                    <td className="px-3 py-3 text-center text-xs text-teal-600 font-medium">
                      ₹{transaction.admin_inr_charges?.toFixed(2) || "-"}
                    </td>
                    <td className="px-3 py-3 text-center text-xs whitespace-nowrap">
                      {formatDate(transaction.created_at)}
                    </td>
                    <td className="px-3 py-3 text-center">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(
                          transaction.status,
                        )}`}
                      >
                        {getStatusText(transaction.status)}
                      </span>
                    </td>
                    <td className="px-3 py-3 text-xs">
                      {transaction.txn_hash ? (
                        <div className="flex items-center gap-1">
                          <span
                            className="truncate max-w-[100px] font-mono"
                            title={transaction.txn_hash}
                          >
                            {transaction.txn_hash.slice(0, 8)}...
                          </span>
                          <button
                            onClick={() =>
                              copyToClipboard(transaction.txn_hash, "Tx Hash")
                            }
                            className="text-[#1d8d84] hover:text-[#1e8064]"
                          >
                            <Copy className="w-3 h-3" />
                          </button>
                        </div>
                      ) : (
                        "-"
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {pagination?.total > 0 && (
        <div className="p-3 flex flex-col sm:flex-row justify-between items-center gap-3 border-t border-gray-200">
          <Pagination
            currentPage={state?.page || 1}
            totalPages={pagination?.totalPages || 1}
            onPageChange={(page) => setState({ ...state, page })}
          />
        </div>
      )}
    </div>
  );
};
const CryptoWithdrawal = () => {
  const selectedToken = "USDT";

  const [formData, setFormData] = useState({
    walletAddress: "",
    amount: "",
  });

  const [errors, setErrors] = useState({});
  const [previewData, setPreviewData] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState("");

  const [state, setState] = useState({
    page: 1,
    limit: 10,
    search: "",
  });
  const [debouncedAmount, setDebouncedAmount] = useState("");

  const queryString = `page=${state.page}&limit=${state.limit}&status=${selectedStatus}&search=${state.search}`;
  const {
    data: historyData,
    isLoading: historyLoading,
    refetch: withdrawRefetch,
  } = useUsdtWithdrawHistoryQuery(queryString);

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

  const transactions = historyData?.data?.withdrawRequests || [];
  const pagination = historyData?.data?.pagination;
  const settings = getSetting?.data;

  const validate = () => {
    const errs = {};
    if (!formData.amount || Number(formData.amount) <= 0)
      errs.amount = "Enter valid amount";

    if (Number(formData.amount) > Number(walletData?.estimatedTokenAmount || 0))
      errs.amount = "Insufficient INR balance";

    return errs;
  };

  const calculatePreview = async (amount) => {
    if (!amount) return setPreviewData(null);

    try {
      const res = await previewWithdraw({
        token: selectedToken,
        amount,
      });

      // console.log(res?.error?.data?.message)
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
    }, 500); // debounce delay (500ms is ideal)

    return () => clearTimeout(timer);
  }, [formData.amount]);

  useEffect(() => {
    if (!debouncedAmount) return;

    calculatePreview(debouncedAmount);
  }, [debouncedAmount]);

  /* ---------------- INPUT ---------------- */
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "amount" && !/^\d*\.?\d*$/.test(value)) return;

    setFormData((p) => ({ ...p, [name]: value }));
    setErrors((p) => ({ ...p, [name]: undefined }));

    // if (name === "amount") {
    //     clearTimeout(window.previewTimeout);
    //     window.previewTimeout = setTimeout(() => {
    //         calculatePreview(value);
    //     }, 400);
    // }

    if (name === "amount") {
      setPreviewData(null); // clear old preview while typing
    }
  };

  /* ---------------- SUBMIT ---------------- */
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

    const res = await submitWithdraw({
      token: selectedToken,
      amount: formData.amount,
    });


    if (res?.data?.success) {
      toast.success(res?.data?.message || "Withdrawal submitted");
      setFormData({ walletAddress: "", amount: "" });
      setPreviewData(null);
      withdrawRefetch();
      conversionRefetch();
    } else {
      const errorMessage =
        res?.error?.data?.message || res?.data?.message || "Withdrawal failed";

      toast.error(errorMessage);
    }
  };

  /* ---------------- UI ---------------- */
  return (
    <div className="min-h-screen bg-gray-50 py-4">
      <div className="max-w-screen mx-auto px-3 sm:px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
          <div className="lg:col-span-4">
            <div className="bg-white rounded-lg border p-4 shadow-sm">
              <h2 className="font-semibold mb-3">Token Withdrawal</h2>


              {/* BALANCE */}
              {conversionLoading ? (
                <Loader />
              ) : (
                <div className="bg-gradient-to-r from-[#1d8d84] to-[#00d4aa] p-3 rounded text-white mb-4">
                  <p className="text-xs">Available Balance</p>
                  <p className="text-lg font-bold">
                    {walletData?.estimatedTokenAmount?.toFixed(4)} {token}
                  </p>
                  <p className="text-xs">
                    ≈ ₹{walletData?.walletINRBalance?.toFixed(2)}
                  </p>
                </div>
              )}

              {/* RATE */}
              <p className="text-xs bg-blue-50 p-2 rounded mb-3">
                <Info className="w-3 h-3 inline mr-1" />₹
                {walletData?.conversionRate} / {token}
              </p>


              <input
                name="amount"
                placeholder={`Amount (${token})`}
                value={formData.amount}
                onChange={handleInputChange}
                className="w-full border px-3 py-2 bg-white rounded mt-3"
              />
              {errors.amount && (
                <p className="text-xs text-red-600">{errors.amount}</p>
              )}

              {/* PREVIEW (ENHANCED FEES) */}
              {previewLoading ? (
                <Loader />
              ) : (
                previewData && (
                  <div className="bg-gray-50 border rounded p-3 mt-3 text-xs space-y-1">
                    <div className="flex justify-between">
                      <span>Entered</span>
                      <span>
                        {formData.amount} {token}
                      </span>
                    </div>
                    <div className="flex justify-between text-red-600">
                      <span>Platform Fee</span>
                      <span>
                        -{previewData.admin_fee_token} {token}
                      </span>
                    </div>
                    <div className="flex justify-between text-red-600">
                      <span>Network Fee</span>
                      <span>
                        -{previewData.network_fee_token} {token}
                      </span>
                    </div>
                    <div className="flex justify-between font-semibold">
                      <span>Total Fee</span>
                      <span>
                        {previewData.total_fee_token} {token}
                      </span>
                    </div>
                    <div className="flex justify-between text-green-600 font-bold">
                      <span>You Receive</span>
                      <span>
                        {previewData.final_token_received} {token}
                      </span>
                    </div>
                    <div className="flex justify-between text-gray-600 pt-1 border-t">
                      <span>INR Deduction</span>
                      <span>₹{previewData.estimatedINR_deduction}</span>
                    </div>
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
                className="w-full mt-4 bg-[#1d8d84] py-2 rounded
           
             flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    {/* Loader */}
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
            {/* Wallet Details */}
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

            {/* Terms & Conditions */}
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
                        • Platform fee {settings?.withdrawal_commission_usd || 0}%
                        and network fee {settings?.network_fee_token || 0}% will be deducted from your withdrawal
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
        <div className="mt-4">
          <TransactionTable
            state={state}
            setState={setState}
            selectedStatus={selectedStatus}
            setSelectedStatus={setSelectedStatus}
            handleSearch={(e) => {
              clearTimeout(window.searchTimeout);
              window.searchTimeout = setTimeout(() => {
                setState({ ...state, search: e.target.value, page: 1 });
              }, 500);
            }}
            loading={historyLoading}
            transactions={transactions}
            pagination={pagination}
          />
        </div>
      </div>
    </div>
    // </div>
  );
};

export default CryptoWithdrawal;
