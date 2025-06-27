// import React, { useState, useEffect } from "react";
// import { ChevronDown, Search, Calendar, CreditCard, DollarSign, Hash, TrendingUp, Globe } from "lucide-react";
// import { useNavigate } from "react-router-dom";
//  import { useBuyDetailsQuery } from "./buyHistoryApiSlice";
//  import { toast } from "react-toastify";
// import Pagination from "../../../pagination/pagination";
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
//   <div className="container mx-auto px-3 sm:px-2 lg:px-6 py-2 sm:py-6">
//     {/* Header */}
//     <div className="mb-2 sm:mb-6">
//       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-2 mb-2 sm:mb-6">
//         <h1 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl text-white font-bold text-center sm:text-left">
//           Buy History Details
//         </h1>

//         {/* Search Bar */}
//         <div className="relative max-w-full sm:max-w-md w-full sm:w-auto">
//           <div className="relative">
//             <input
//               type="text"
//               className="w-full pl-8 sm:pl-10 pr-3 sm:pr-2 py-2 sm:py-2.5 text-sm sm:text-base bg-gray-50 border border-gray-200 rounded-lg text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:border-transparent"
//               style={{ focusRingColor: '#1d8e85' }}
//               placeholder="Search transactions..."
//               onChange={handleSearch}
//             />
//             <Search className="absolute left-2.5 sm:left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-3.5 h-3.5 sm:w-2 sm:h-2" />
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
//               <div className="h-2.5 bg-gray-200 rounded w-3/2"></div>
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
//     <div className="hidden sm:block lg:hidden space-y-2">
//       {(isLoading || loading) ? (
//         // Loading skeleton for tablet
//         [...Array(8)].map((_, i) => (
//           <div key={i} className="bg-gray-50 rounded-xl p-2 animate-pulse border border-gray-200">
//             <div className="flex justify-between items-start mb-2">
//               <div className="h-2 bg-gray-200 rounded w-20"></div>
//               <div className="h-6 bg-gray-200 rounded w-20"></div>
//             </div>
//             <div className="grid grid-cols-2 gap-2">
//               <div className="space-y-2">
//                 <div className="h-3 bg-gray-200 rounded w-full"></div>
//                 <div className="h-3 bg-gray-200 rounded w-3/2"></div>
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
//           <div key={i} className="bg-white rounded-xl p-2 border border-gray-200 hover:shadow-md transition-all duration-200" style={{ borderColor: '#1d8e85' }}>
//             {/* Header with S.No and Status */}
//             <div className="flex justify-between items-center mb-2">
//               <div className="flex items-center gap-2">
//                 <Hash className="w-2 h-2" style={{ color: '#1d8e85' }} />
//                 <span className="text-sm font-medium text-gray-600">
//                   #{state?.currentPage * state?.perPage - (state?.perPage - 1) + i}
//                 </span>
//               </div>
//               <span className="px-3 py-1 rounded-full text-sm font-semibold">
//                 {data?.status}
//               </span>
//             </div>

//             {/* Content Grid */}
//             <div className="grid grid-cols-2 gap-2">
//               {/* Left Column */}
//               <div className="space-y-3">
//                 {/* Transaction ID */}
//                 <div>
//                   <div className="flex items-center gap-2 mb-1">
//                     <CreditCard className="w-2 h-2" style={{ color: '#1d8e85' }} />
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
//                     <TrendingUp className="w-2 h-2" style={{ color: '#1d8e85' }} />
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
//                     <Globe className="w-2 h-2" style={{ color: '#1d8e85' }} />
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
//                     <Calendar className="w-2 h-2" style={{ color: '#1d8e85' }} />
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
//                 <th className="px-2 py-1 xl:py-2 text-left text-sm xl:text-base font-medium min-w-max">S.No</th>
//                 <th className="px-2  py-1 xl:py-2 text-left text-sm xl:text-base font-medium min-w-max">Transaction ID</th>
//                 <th className="px-2  py-1 xl:py-2 text-left text-sm xl:text-base font-medium min-w-max">Payment Mode</th>
//                 <th className="px-2 py-1 xl:py-2 text-left text-sm xl:text-base font-medium min-w-max">JaiMax Coin</th>
//                 <th className="px-2  py-1 xl:py-2 text-left text-sm xl:text-base font-medium min-w-max">INR Price</th>
//                 <th className="px-2  py-1 xl:py-2 text-left text-sm xl:text-base font-medium min-w-max">USD Price</th>
//                 <th className="px-2  py-1 xl:py-2 text-left text-sm xl:text-base font-medium min-w-max">Round</th>
//                 <th className="px-2  py-1 xl:py-2 text-left text-sm xl:text-base font-medium min-w-max">Currency</th>
//                 <th className="px-2  py-1 xl:py-2 text-left text-sm xl:text-base font-medium min-w-max">Amount</th>
//                 <th className="px-2  py-1 xl:py-2 text-left text-sm xl:text-base font-medium min-w-max">Purchase Date</th>
//                 <th className="px-2  py-1 xl:py-2 text-left text-sm xl:text-base font-medium min-w-max">Status</th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-gray-200">
//               {(isLoading || loading) ? (
//                 [...Array(5)].map((_, i) => (
//                   <tr key={i}>
//                     {[...Array(11)].map((_, j) => (
//                       <td key={j} className="px-2 xl:px-6 py-3 xl:py-2">
//                         <div className="h-2 bg-gray-200 rounded animate-pulse"></div>
//                       </td>
//                     ))}
//                   </tr>
//                 ))
//               ) : TableData.length === 0 ? (
//                 <tr>
//                   <td colSpan="11" className="px-2 xl:px-6 py-6 xl:py-8 text-center text-gray-500 text-sm xl:text-base">
//                     No data found
//                   </td>
//                 </tr>
//               ) : (
//                 TableData.map((data, i) => (
//                   <tr key={i} className="text-gray-800 hover:bg-gray-50 transition-colors">
//                     <td className="px-2 xl:px-6 py-3 xl:py-2 text-sm xl:text-base min-w-max">
//                       {state?.currentPage * state?.perPage - (state?.perPage - 1) + i}
//                     </td>
//                     <td className="px-2 xl:px-6 py-3 xl:py-2 font-mono text-xs xl:text-sm min-w-max">
//                       <div className="break-all whitespace-normal leading-relaxed">
//                         {data?.paypalTransactionId || data?.transactionId || "N/A"}
//                       </div>
//                     </td>
//                     <td className="px-2 xl:px-6 py-3 xl:py-2 capitalize text-sm xl:text-base min-w-max whitespace-nowrap">{data?.modeOfPayment || "N/A"}</td>
//                     <td className="px-2 xl:px-6 py-3 xl:py-2 font-semibold text-sm xl:text-base min-w-max">{data?.jaimax?.toFixed(3) || "N/A"}</td>
//                     <td className="px-2 xl:px-6 py-3 xl:py-2 text-sm xl:text-base min-w-max whitespace-nowrap">{data?.atPriceInr}</td>
//                     <td className="px-2 xl:px-6 py-3 xl:py-2 text-sm xl:text-base min-w-max whitespace-nowrap">{data?.atPriceUsdt}</td>
//                     <td className="px-2 xl:px-6 py-3 xl:py-2 text-sm xl:text-base min-w-max whitespace-nowrap">{data?.round}</td>
//                     <td className="px-2 xl:px-6 py-3 xl:py-2 font-semibold text-sm xl:text-base min-w-max whitespace-nowrap">{data?.currency}</td>
//                     <td className="px-2 xl:px-6 py-3 xl:py-2 font-bold text-sm xl:text-base min-w-max whitespace-nowrap">
//                       {data.currency === "INR"
//                         ? `₹${data.amount.toFixed(2)}`
//                         : `${data.amount.toFixed(2)}`}
//                     </td>
//                     <td className="px-2 xl:px-6 py-3 xl:py-2 text-xs xl:text-sm min-w-max">
//                       <div className="whitespace-normal break-words leading-relaxed">
//                         {formatDateWithAmPm(data?.createdAt)}
//                       </div>
//                     </td>
//                     <td className="px-2 xl:px-6 py-3 xl:py-2 min-w-max">
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
//       <div className="flex justify-center mt-2 sm:mt-6">
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


import React, { useState, useEffect } from "react";
import { ChevronDown, Search, Calendar, CreditCard, DollarSign, Hash, TrendingUp, Globe } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useBuyDetailsQuery } from "./buyHistoryApiSlice";
import { toast } from "react-toastify";
import Pagination from "../../../pagination/pagination";

const BuyHistory = () => {
  const [isTokenVerified, setIsTokenVerified] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("Completed");
  const navigate = useNavigate();
  const [state, setState] = useState({
    currentPage: 1,
    perPage: "10",
    search: "",
  });
  const [loading, setLoading] = useState(false);

  // Update query parameters
  const queryParams = `limit=${state?.perPage || ""}&page=${state?.currentPage || ""
    }&search=${state?.search || ""}&status=${selectedStatus}`;

  const {
    data: buyDetails,
    isLoading,
    error,
    refetch,
  } = useBuyDetailsQuery(queryParams);
  console.log(buyDetails); // ✅ shows the fetched data
  const TableData = buyDetails?.data?.withdrawRequests || [];

  const handlePageChange = (e) => {
    setLoading(true);
    setState({ ...state, currentPage: e });
  };

  const handleStatusChange = (e) => {
    setSelectedStatus(e.target.value);
    setState({ ...state, currentPage: 1 });
  };

  // Function for handling search with delay
  const [searchQuery, setSearchQuery] = useState("");
  useEffect(() => {
    const searchTimeout = setTimeout(() => {
      setState({ ...state, search: searchQuery, currentPage: 1 });
    }, 500); // Debounce for 500ms
    return () => clearTimeout(searchTimeout);
  }, [searchQuery, state]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const verifyToken = async () => {
      if (!token) {
        navigate("/login");
        return;
      }
      setIsTokenVerified(true);
    };

    verifyToken();
  }, [navigate]);

  useEffect(() => {
    if (isTokenVerified) {
      const debounce = setTimeout(() => {
        if (error?.data?.status_code === 400) {
          localStorage.clear();
          navigate("/login");
          toast.error(error?.data?.message, {
            position: "top-center",
          });
        }
      }, 2000);

      return () => clearTimeout(debounce);
    }
  }, [isTokenVerified, error, navigate]);

  useEffect(() => {
    refetch();
  }, [state.currentPage, state.search, selectedStatus, refetch]);

  /**
   * This method is used to convert the iso string to date & time format
   * @param {*} isoString
   */
  const formatDateWithAmPm = (isoString) => {
    const date = new Date(isoString);
    const options = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
      timeZone: 'UTC' // Assuming UTC date strings from backend
    };
    return new Intl.DateTimeFormat('en-GB', options).format(date).replace(',', '');
  };

  useEffect(() => {
    setLoading(false);
  }, [buyDetails?.data?.withdrawRequests]);

  const getStatusClasses = (status) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-700";
      case "Pending":
        return "bg-yellow-100 text-yellow-700";
      case "Cancelled":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="bg-[#1d8e85] p-2 sm:p-6 lg:p-8 min-h-screen">
      <div className="container mx-auto max-w-9xl">
        {/* Header and Controls */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 sm:mb-8 gap-2">
          <div className="relative w-full sm:w-80">
            <input
              type="text"
              className="w-full pl-10 pr-2 py-2.5 text-base bg-white border border-gray-300 rounded-lg text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 shadow-sm"
              placeholder="Search transactions..."
              onChange={(e) => setSearchQuery(e.target.value)}
              value={searchQuery}
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          </div>

          <div className="relative inline-block w-full sm:w-auto">
            <select
              value={selectedStatus}
              onChange={handleStatusChange}
              className="appearance-none bg-white border border-gray-300 text-gray-700 py-2.5 px-2 pr-8 rounded-lg leading-tight focus:outline-none focus:bg-white focus:border-emerald-500 cursor-pointer shadow-sm w-full"
            >
              <option value="Completed">Completed</option>
              <option value="Pending">Pending</option>
              <option value="Cancelled">Cancelled</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <ChevronDown className="w-2 h-2" />
            </div>
          </div>
        </div>

        {/* Mobile & Tablet Cards View */}
        <div className="sm:hidden space-y-2">
          {(isLoading || loading) ? (
            // Loading skeleton for mobile
            [...Array(3)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl p-2 animate-pulse border border-gray-200 shadow-sm">
                <div className="flex justify-between items-start mb-3">
                  <div className="h-2 bg-gray-200 rounded w-20"></div>
                  <div className="h-6 bg-gray-200 rounded-full w-24"></div>
                </div>
                <div className="space-y-3">
                  <div className="h-3 bg-gray-200 rounded w-full"></div>
                  <div className="h-3 bg-gray-200 rounded w-5/6"></div>
                  <div className="h-3 bg-gray-200 rounded w-3/2"></div>
                </div>
              </div>
            ))
          ) : TableData.length === 0 ? (
            <div className="bg-white rounded-xl p-6 text-center border border-gray-200 shadow-sm">
              <p className="text-lg text-gray-600 font-medium">No buy history found.</p>
            </div>
          ) : (
            TableData.map((data, i) => (
              <div key={i} className="bg-white rounded-xl p-5 border border-gray-200 hover:shadow-lg transition-shadow duration-200 ease-in-out">
                {/* Header with S.No and Status */}
                <div className="flex justify-between items-center mb-2 pb-3 border-b border-gray-100">
                  <div className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                    <Hash className="w-2 h-2 text-emerald-600" />
                    <span>S.No: {state?.currentPage * state?.perPage - (state?.perPage - 1) + i}</span>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusClasses(data?.status)}`}>
                    {data?.status}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-6">
                  {/* Transaction ID */}
                  <div className="flex flex-col">
                    <span className="text-xs text-gray-500 uppercase tracking-wider font-medium mb-1 flex items-center gap-1">
                      <CreditCard className="w-3.5 h-3.5 text-emerald-600" /> Transaction ID
                    </span>
                    <p className="text-gray-800 font-mono text-sm break-all leading-snug">{data?.paypalTransactionId || data?.transactionId || "N/A"}</p>
                  </div>

                  {/* Payment Mode */}
                  <div className="flex flex-col">
                    <span className="text-xs text-gray-500 uppercase tracking-wider font-medium mb-1">Payment Mode</span>
                    <p className="text-gray-800 text-sm capitalize font-semibold">{data?.modeOfPayment || "N/A"}</p>
                  </div>

                  {/* JaiMax Coin */}
                  <div className="flex flex-col">
                    <span className="text-xs text-gray-500 uppercase tracking-wider font-medium mb-1 flex items-center gap-1">
                      <TrendingUp className="w-3.5 h-3.5 text-emerald-600" /> JaiMax Coin
                    </span>
                    <p className="text-gray-800 text-sm font-bold">{data?.jaimax?.toFixed(3) || "N/A"}</p>
                  </div>

                  {/* INR Price */}
                  <div className="flex flex-col">
                    <span className="text-xs text-gray-500 uppercase tracking-wider font-medium mb-1">INR Price</span>
                    <p className="text-gray-800 text-sm font-semibold">{data?.atPriceInr || "N/A"}</p>
                  </div>

                  {/* USD Price */}
                  <div className="flex flex-col">
                    <span className="text-xs text-gray-500 uppercase tracking-wider font-medium mb-1">USD Price</span>
                    <p className="text-gray-800 text-sm font-semibold">{data?.atPriceUsdt || "N/A"}</p>
                  </div>

                  {/* Round */}
                  <div className="flex flex-col">
                    <span className="text-xs text-gray-500 uppercase tracking-wider font-medium mb-1">Round</span>
                    <p className="text-gray-800 text-sm font-semibold">{data?.round || "N/A"}</p>
                  </div>

                  {/* Currency */}
                  <div className="flex flex-col">
                    <span className="text-xs text-gray-500 uppercase tracking-wider font-medium mb-1 flex items-center gap-1">
                      <Globe className="w-3.5 h-3.5 text-emerald-600" /> Currency
                    </span>
                    <p className="text-gray-800 text-sm font-bold">{data?.currency || "N/A"}</p>
                  </div>

                  {/* Amount */}
                  <div className="flex flex-col">
                    <span className="text-xs text-gray-500 uppercase tracking-wider font-medium mb-1">Amount</span>
                    <p className="text-emerald-700 text-lg font-extrabold">
                      {data.currency === "INR" ? `₹${data.amount?.toFixed(2) || "0.00"}` : `$${data.amount?.toFixed(2) || "0.00"}`}
                    </p>
                  </div>

                  {/* Purchase Date */}
                  <div className="flex flex-col col-span-1 sm:col-span-2"> {/* Take full width on small screens, half on larger */}
                    <span className="text-xs text-gray-500 uppercase tracking-wider font-medium mb-1 flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-emerald-600" /> Purchase Date
                    </span>
                    <p className="text-gray-800 text-sm leading-snug">{data?.createdAt ? formatDateWithAmPm(data?.createdAt) : "N/A"}</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Desktop Table View */}
        <div className="hidden lg:block">
          <div className="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-lg">
            <div className="overflow-x-auto">
              <table className="w-full table-auto">
                <thead className="bg-[#1d8e85]">
                  <tr className="text-white text-xs">
                    <th className="px-1 py-2 text-center min-w-[40px]">S.No</th>
                    <th className="px-1 py-2 text-center min-w-[140px]">Transaction ID</th>
                    <th className="px-1 py-2 text-center min-w-[80px]">Payment Mode</th>
                    <th className="px-1 py-2 text-center min-w-[80px]">JaiMax Coin</th>
                    <th className="px-1 py-2 text-center min-w-[70px]">INR Price</th>
                    <th className="px-1 py-2 text-center min-w-[70px]">USD Price</th>
                    <th className="px-1 py-2 text-center min-w-[50px]">Round</th>
                    <th className="px-1 py-2 text-center min-w-[70px]">Currency</th>
                    <th className="px-1 py-2 text-center min-w-[80px]">Amount</th>
                    <th className="px-1 py-2 text-center min-w-[120px]">Purchase Date</th>
                    <th className="px-1 py-2 text-center min-w-[70px]">Status</th>
                  </tr>
                </thead>


                <tbody className="divide-y divide-gray-200">
                  {(isLoading || loading) ? (
                    [...Array(parseInt(state.perPage))].map((_, i) => (
                      <tr key={i}>
                        {[...Array(11)].map((_, j) => (
                          <td key={j} className="px-2 py-3">
                            <div className="h-2 bg-gray-100 rounded animate-pulse"></div>
                          </td>
                        ))}
                      </tr>
                    ))
                  ) : TableData.length === 0 ? (
                    <tr>
                      <td colSpan="11" className="px-2 py-6 text-center text-gray-500 text-base">
                        No buy history found.
                      </td>
                    </tr>
                  ) : (
                    TableData.map((data, i) => (
                      <tr key={i} className="text-gray-800 hover:bg-gray-50 transition-colors duration-150 text-center">
                        <td className="px-2 py-3 text-sm">
                          {state?.currentPage * parseInt(state.perPage) - (parseInt(state.perPage) - 1) + i}
                        </td>
                        <td className="px-2 py-3 font-semibold  text-sm max-w-[200px] break-words">
                          {data?.paypalTransactionId || data?.transactionId || "N/A"}
                        </td>
                        <td className="px-2 py-3 font-semibold capitalize text-xs whitespace-nowrap">{data?.modeOfPayment || "N/A"}</td>
                        <td className="px-2 py-3   font-semibold text-xs whitespace-nowrap">{data?.jaimax?.toFixed(3) || "N/A"}</td>
                        <td className="px-2 py-3 font-semibold text-xs whitespace-nowrap">{data?.atPriceInr || "N/A"}</td>
                        <td className="px-2 py-3 font-semibold text-xs whitespace-nowrap">{data?.atPriceUsdt || "N/A"}</td>
                        <td className="px-2 py-3 font-semibold text-xs whitespace-nowrap">{data?.round || "N/A"}</td>
                        <td className="px-2 py-3 font-semibold text-xs whitespace-nowrap">{data?.currency || "N/A"}</td>
                        <td className="px-2 py-3 font-semibold text-xs whitespace-nowrap">
                          {data.currency === "INR" ? `₹${data.amount?.toFixed(2) || "0.00"}` : `$${data.amount?.toFixed(2) || "0.00"}`}
                        </td>
                        <td className="px-2 py-3 text-xs font-semibold whitespace-nowrap">
                          {data?.createdAt ? formatDateWithAmPm(data?.createdAt) : "N/A"}
                        </td>
                        <td className="px-2 py-3">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${getStatusClasses(data?.status)}`}>
                            {data?.status}
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Pagination */}
        {buyDetails?.data?.pagination?.totalPages > 1 && (
          <div className="flex justify-center mt-6">
            <Pagination
              currentPage={state.currentPage}
              totalPages={buyDetails?.data?.pagination?.totalPages || 1}
              onPageChange={(page) =>
                setState((prev) => ({ ...prev, currentPage: page }))
              }
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default BuyHistory;