

// import React, { useState, useEffect } from "react";
// import { ChevronDown, Search, Calendar, CreditCard, DollarSign, Hash, TrendingUp, Globe } from "lucide-react";

// const TransactionDetails = () => {
//   const [isTokenVerified, setIsTokenVerified] = useState(true);
//   const [selectedStatus, setSelectedStatus] = useState("Completed");
//   const [searchTerm, setSearchTerm] = useState("");
  
//   // Pagination state
//   const [state, setState] = useState({
//     currentPage: 1,
//     perPage: "10",
//     search: "",
//   });
//   const [loading, setLoading] = useState(false);

//   // Mock data for demonstration
//   const mockTransactions = [
//     {
//       id: 1,
//       paypalTransactionId: "TXN123456789",
//       transactionId: "INT987654321",
//       modeOfPayment: "paypal",
//       jaimax: 150.500,
//       atPriceInr: "₹85.50",
//       atPriceUsdt: "$1.02",
//       round: "Round 3",
//       currency: "USD",
//       amount: 153.60,
//       createdAt: "2024-12-15T10:30:00Z",
//       status: "Completed"
//     },
//     {
//       id: 2,
//       paypalTransactionId: null,
//       transactionId: "INT456789012",
//       modeOfPayment: "bank transfer",
//       jaimax: 75.250,
//       atPriceInr: "₹85.50",
//       atPriceUsdt: "$1.02",
//       round: "Round 2",
//       currency: "INR",
//       amount: 6435.75,
//       createdAt: "2024-12-14T15:45:00Z",
//       status: "Pending"
//     },
//     {
//       id: 3,
//       paypalTransactionId: "TXN987654321",
//       transactionId: "INT123789456",
//       modeOfPayment: "credit card",
//       jaimax: 200.750,
//       atPriceInr: "₹85.50",
//       atPriceUsdt: "$1.02",
//       round: "Round 4",
//       currency: "USD",
//       amount: 205.25,
//       createdAt: "2024-12-13T09:20:00Z",
//       status: "Failed"
//     }
//   ];

//   const TableData = mockTransactions;

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

//   const getStatusColor = (status) => {
//     switch (status.toLowerCase()) {
//       case "completed":
//         return "text-green-600 bg-green-100";
//       case "pending":
//         return "text-yellow-600 bg-yellow-100";
//       case "failed":
//         return "text-red-600 bg-red-100";
//       default:
//         return "text-gray-600 bg-gray-100";
//     }
//   };

//   const getPaymentModeIcon = (mode) => {
//     switch (mode.toLowerCase()) {
//       case "paypal":
//         return <CreditCard className="w-4 h-4" />;
//       case "bank transfer":
//         return <DollarSign className="w-4 h-4" />;
//       case "credit card":
//         return <CreditCard className="w-4 h-4" />;
//       default:
//         return <DollarSign className="w-4 h-4" />;
//     }
//   };

//   // Filter transactions based on search term
//   const filteredTransactions = TableData.filter(transaction => 
//     transaction.transactionId.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     transaction.modeOfPayment.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     transaction.status.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div className="min-h-screen bg-white">
//       <div className="container mx-auto px-4 py-6">
//         {/* Header */}
//         <div className="mb-6">
//           <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
//             <h1 className="text-2xl lg:text-3xl font-bold" style={{color: '#1d8e85'}}>
//               Buy History Details
//             </h1>
            
//             {/* Search Bar */}
//             <div className="relative max-w-md w-full lg:w-auto">
//               <div className="relative">
//                 <input
//                   type="text"
//                   className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:border-transparent"
//                   style={{focusRingColor: '#1d8e85'}}
//                   placeholder="Search transactions..."
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                 />
//                 <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Mobile Cards View */}
//         <div className="lg:hidden space-y-4">
//           {loading ? (
//             // Loading skeleton for mobile
//             [...Array(3)].map((_, i) => (
//               <div key={i} className="bg-gray-50 rounded-xl p-4 animate-pulse border border-gray-200">
//                 <div className="flex justify-between items-start mb-3">
//                   <div className="h-4 bg-gray-200 rounded w-24"></div>
//                   <div className="h-6 bg-gray-200 rounded w-20"></div>
//                 </div>
//                 <div className="space-y-2">
//                   <div className="h-3 bg-gray-200 rounded w-full"></div>
//                   <div className="h-3 bg-gray-200 rounded w-3/4"></div>
//                   <div className="h-3 bg-gray-200 rounded w-1/2"></div>
//                 </div>
//               </div>
//             ))
//           ) : filteredTransactions.length === 0 ? (
//             <div className="bg-gray-50 rounded-xl p-8 text-center border border-gray-200">
//               <p className="text-gray-500">No transactions found</p>
//             </div>
//           ) : (
//             filteredTransactions.map((data, i) => (
//               <div key={i} className="bg-white rounded-xl p-4 border border-gray-200 hover:shadow-md transition-all duration-200" style={{borderColor: '#1d8e85'}}>
//                 {/* Header with S.No and Status */}
//                 <div className="flex justify-between items-center mb-4">
//                   <div className="flex items-center gap-2">
//                     <Hash className="w-4 h-4" style={{color: '#1d8e85'}} />
//                     <span className="text-sm font-medium text-gray-600">
//                       #{state?.currentPage * state?.perPage - (state?.perPage - 1) + i}
//                     </span>
//                   </div>
//                   <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(data?.status)}`}>
//                     {data?.status}
//                   </span>
//                 </div>

//                 {/* Transaction ID */}
//                 <div className="mb-3">
//                   <div className="flex items-center gap-2 mb-1">
//                     <CreditCard className="w-4 h-4" style={{color: '#1d8e85'}} />
//                     <span className="text-xs text-gray-500 uppercase tracking-wide">Transaction ID</span>
//                   </div>
//                   <p className="text-gray-800 font-mono text-sm break-all">
//                     {data?.paypalTransactionId || data?.transactionId || "N/A"}
//                   </p>
//                 </div>

//                 {/* Payment Details */}
//                 <div className="grid grid-cols-2 gap-4 mb-3">
//                   <div>
//                     <div className="flex items-center gap-2 mb-1">
//                       <div style={{color: '#1d8e85'}}>
//                         {getPaymentModeIcon(data?.modeOfPayment)}
//                       </div>
//                       <span className="text-xs text-gray-500 uppercase tracking-wide">Payment Mode</span>
//                     </div>
//                     <p className="text-gray-800 text-sm capitalize">{data?.modeOfPayment || "N/A"}</p>
//                   </div>
//                   <div>
//                     <div className="flex items-center gap-2 mb-1">
//                       <TrendingUp className="w-4 h-4" style={{color: '#1d8e85'}} />
//                       <span className="text-xs text-gray-500 uppercase tracking-wide">JaiMax Coin</span>
//                     </div>
//                     <p className="text-gray-800 text-sm font-semibold">{data?.jaimax?.toFixed(3) || "N/A"}</p>
//                   </div>
//                 </div>

//                 {/* Price Information */}
//                 <div className="grid grid-cols-2 gap-4 mb-3">
//                   <div>
//                     <span className="text-xs text-gray-500 uppercase tracking-wide">INR Price</span>
//                     <p className="text-gray-800 text-sm">{data?.atPriceInr}</p>
//                   </div>
//                   <div>
//                     <span className="text-xs text-gray-500 uppercase tracking-wide">USD Price</span>
//                     <p className="text-gray-800 text-sm">{data?.atPriceUsdt}</p>
//                   </div>
//                 </div>

//                 {/* Round and Currency */}
//                 <div className="grid grid-cols-2 gap-4 mb-3">
//                   <div>
//                     <span className="text-xs text-gray-500 uppercase tracking-wide">Round</span>
//                     <p className="text-gray-800 text-sm">{data?.round}</p>
//                   </div>
//                   <div>
//                     <div className="flex items-center gap-2 mb-1">
//                       <Globe className="w-4 h-4" style={{color: '#1d8e85'}} />
//                       <span className="text-xs text-gray-500 uppercase tracking-wide">Currency</span>
//                     </div>
//                     <p className="text-gray-800 text-sm font-semibold">{data?.currency}</p>
//                   </div>
//                 </div>

//                 {/* Amount and Date */}
//                 <div className="grid grid-cols-2 gap-4 mb-3">
//                   <div>
//                     <span className="text-xs text-gray-500 uppercase tracking-wide">Amount</span>
//                     <p className="text-gray-800 text-lg font-bold">
//                       {data.currency === "INR"
//                         ? `₹${data.amount.toFixed(2)}`
//                         : `${data.amount.toFixed(2)}`}
//                     </p>
//                   </div>
//                   <div>
//                     <div className="flex items-center gap-2 mb-1">
//                       <Calendar className="w-4 h-4" style={{color: '#1d8e85'}} />
//                       <span className="text-xs text-gray-500 uppercase tracking-wide">Purchase Date</span>
//                     </div>
//                     <p className="text-gray-800 text-sm">{formatDateWithAmPm(data?.createdAt)}</p>
//                   </div>
//                 </div>
//               </div>
//             ))
//           )}
//         </div>

//         {/* Desktop Table View */}
//         <div className="hidden lg:block">
//           <div className="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm">
//             <div className="overflow-x-auto">
//               <table className="w-full">
//                 <thead style={{backgroundColor: '#1d8e85'}}>
//                   <tr className="text-white text-sm">
//                     <th className="px-6 py-4 text-left">S.No</th>
//                     <th className="px-6 py-4 text-left">Transaction ID</th>
//                     <th className="px-6 py-4 text-left">Payment Mode</th>
//                     <th className="px-6 py-4 text-left">JaiMax Coin</th>
//                     <th className="px-6 py-4 text-left">INR Price</th>
//                     <th className="px-6 py-4 text-left">USD Price</th>
//                     <th className="px-6 py-4 text-left">Round</th>
//                     <th className="px-6 py-4 text-left">Currency</th>
//                     <th className="px-6 py-4 text-left">Amount</th>
//                     <th className="px-6 py-4 text-left">Purchase Date</th>
//                     <th className="px-6 py-4 text-left">Status</th>
//                   </tr>
//                 </thead>
//                 <tbody className="divide-y divide-gray-200">
//                   {loading ? (
//                     [...Array(5)].map((_, i) => (
//                       <tr key={i}>
//                         {[...Array(11)].map((_, j) => (
//                           <td key={j} className="px-6 py-4">
//                             <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
//                           </td>
//                         ))}
//                       </tr>
//                     ))
//                   ) : filteredTransactions.length === 0 ? (
//                     <tr>
//                       <td colSpan="11" className="px-6 py-8 text-center text-gray-500">
//                         No data found
//                       </td>
//                     </tr>
//                   ) : (
//                     filteredTransactions.map((data, i) => (
//                       <tr key={i} className="text-gray-800 hover:bg-gray-50 transition-colors">
//                         <td className="px-6 py-4">
//                           {state?.currentPage * state?.perPage - (state?.perPage - 1) + i}
//                         </td>
//                         <td className="px-6 py-4 font-mono text-sm">
//                           {data?.paypalTransactionId || data?.transactionId || "N/A"}
//                         </td>
//                         <td className="px-6 py-4 capitalize">{data?.modeOfPayment || "N/A"}</td>
//                         <td className="px-6 py-4 font-semibold">{data?.jaimax?.toFixed(3) || "N/A"}</td>
//                         <td className="px-6 py-4">{data?.atPriceInr}</td>
//                         <td className="px-6 py-4">{data?.atPriceUsdt}</td>
//                         <td className="px-6 py-4">{data?.round}</td>
//                         <td className="px-6 py-4 font-semibold">{data?.currency}</td>
//                         <td className="px-6 py-4 font-bold">
//                           {data.currency === "INR"
//                             ? `₹${data.amount.toFixed(2)}`
//                             : `${data.amount.toFixed(2)}`}
//                         </td>
//                         <td className="px-6 py-4 text-sm">{formatDateWithAmPm(data?.createdAt)}</td>
//                         <td className="px-6 py-4">
//                           <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(data?.status)}`}>
//                             {data?.status}
//                           </span>
//                         </td>
//                       </tr>
//                     ))
//                   )}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </div>

//         {/* Pagination */}
//         <div className="mt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
//           <div className="flex items-center gap-2">
//             <span className="text-gray-600 text-sm">Show</span>
//             <select 
//               className="bg-white border border-gray-200 rounded-lg px-3 py-1 text-gray-800 text-sm focus:outline-none focus:ring-2 focus:border-transparent"
//               style={{focusRingColor: '#1d8e85'}}
//               value={state?.perPage}
//               onChange={(e) => {
//                 setState({
//                   ...state,
//                   perPage: e.target.value,
//                   currentPage: 1,
//                 });
//               }}
//             >
//               <option value="10" className="bg-white">10</option>
//               <option value="30" className="bg-white">30</option>
//               <option value="50" className="bg-white">50</option>
//             </select>
//             <span className="text-gray-600 text-sm">entries</span>
//           </div>
          
//           <div className="flex items-center gap-2">
//             <button className="px-3 py-1 bg-white border border-gray-200 rounded-lg text-gray-600 text-sm hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
//               Previous
//             </button>
//             <span className="px-3 py-1 text-white rounded-lg text-sm" style={{backgroundColor: '#1d8e85'}}>1</span>
//             <button className="px-3 py-1 bg-white border border-gray-200 rounded-lg text-gray-600 text-sm hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
//               Next
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TransactionDetails;

import React, { useState, useEffect } from "react";
import { ChevronDown, Search, Calendar, CreditCard, DollarSign, Hash, TrendingUp, Globe } from "lucide-react";

import { useGetBuyDetailsQuery}  from "../buyHistoryApiSlice"
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie"
const TransactionDetails = () => {
  const [isTokenVerified, setIsTokenVerified] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("Completed");
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  
  // Pagination state
  const [state, setState] = useState({
    currentPage: 1,
    perPage: "10",
    search: "",
  });
  const [loading, setLoading] = useState(false);

  // Update query parameters
  const queryParams = `limit=${state?.perPage || ""}&page=${
    state?.currentPage || ""
  }&search=${state?.search || ""}&status=${selectedStatus}`;

  // API call using RTK Query
  const {
    data: buyDetails,
    isLoading,
    error,
    refetch,
  } = useGetBuyDetailsQuery(queryParams, {
    skip: !isTokenVerified, // Skip the query until token is verified
  });

  // Get table data from API response
  const TableData = buyDetails?.data?.withdrawRequests || [];

  // Handle PerChange
  const handlePageChange = (e) => {
    setLoading(true);
    setState({ ...state, currentPage: e });
  };

  const handleStatusChange = (e) => {
    setSelectedStatus(e.target.value);
    setState({ ...state, currentPage: 1 });
  };

  // Function for handling search with delay
  let searchTimeout;
  const handleSearch = (e) => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
      setState({ ...state, search: e.target.value, currentPage: 1 });
      setSearchTerm(e.target.value);
    }, 1000);
  };

  // Token verification effect
  useEffect(() => {
    const token = Cookies.get("token");
    const verifyToken = async () => {
      if (!token) {
        navigate("/login");
        return;
      }
      setIsTokenVerified(true);
    };
    verifyToken();
  }, [navigate]);

  // Error handling effect
  useEffect(() => {
    if (isTokenVerified) {
      const debounce = setTimeout(() => {
        if (error?.data?.status_code === 400) {
          // localStorage.clear();
          navigate("/login");
          toast.error(error?.data?.message, {
            position: "top-center",
          });
        }
      }, 2000);

      return () => clearTimeout(debounce);
    }
  }, [isTokenVerified, error, navigate]);

  // Refetch on component mount
  useEffect(() => {
    if (isTokenVerified) {
      refetch();
    }
    return () => {
      clearTimeout(searchTimeout);
    };
  }, [isTokenVerified, refetch]);

  // Set loading to false when data is loaded
  useEffect(() => {
    setLoading(false);
  }, [buyDetails?.data?.withdrawRequests]);

  /**
   * This method is used to convert the iso string to date & time format
   * @param {*} isoString
   */
  const formatDateWithAmPm = (isoString) => {
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

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "completed":
        return "text-green-600 bg-green-100";
      case "pending":
        return "text-yellow-600 bg-yellow-100";
      case "failed":
        return "text-red-600 bg-red-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  const getPaymentModeIcon = (mode) => {
    switch (mode.toLowerCase()) {
      case "paypal":
        return <CreditCard className="w-4 h-4" />;
      case "bank transfer":
        return <DollarSign className="w-4 h-4" />;
      case "credit card":
        return <CreditCard className="w-4 h-4" />;
      default:
        return <DollarSign className="w-4 h-4" />;
    }
  };

  // Filter transactions based on search term (client-side filtering for additional search capability)
  const filteredTransactions = TableData.filter(transaction => 
    (transaction.transactionId || transaction.paypalTransactionId || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
    (transaction.modeOfPayment || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
    (transaction.status || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
            <h1 className="text-2xl lg:text-3xl font-bold" style={{color: '#1d8e85'}}>
              Buy History Details
            </h1>
            
            {/* Search Bar */}
            <div className="relative max-w-md w-full lg:w-auto">
              <div className="relative">
                <input
                  type="text"
                  className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:border-transparent"
                  style={{focusRingColor: '#1d8e85'}}
                  placeholder="Search transactions..."
                  onChange={handleSearch}
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Cards View */}
        <div className="lg:hidden space-y-4">
          {(isLoading || loading) ? (
            // Loading skeleton for mobile
            [...Array(3)].map((_, i) => (
              <div key={i} className="bg-gray-50 rounded-xl p-4 animate-pulse border border-gray-200">
                <div className="flex justify-between items-start mb-3">
                  <div className="h-4 bg-gray-200 rounded w-24"></div>
                  <div className="h-6 bg-gray-200 rounded w-20"></div>
                </div>
                <div className="space-y-2">
                  <div className="h-3 bg-gray-200 rounded w-full"></div>
                  <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </div>
              </div>
            ))
          ) : filteredTransactions.length === 0 ? (
            <div className="bg-gray-50 rounded-xl p-8 text-center border border-gray-200">
              <p className="text-gray-500">No transactions found</p>
            </div>
          ) : (
            filteredTransactions.map((data, i) => (
              <div key={i} className="bg-white rounded-xl p-4 border border-gray-200 hover:shadow-md transition-all duration-200" style={{borderColor: '#1d8e85'}}>
                {/* Header with S.No and Status */}
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center gap-2">
                    <Hash className="w-4 h-4" style={{color: '#1d8e85'}} />
                    <span className="text-sm font-medium text-gray-600">
                      #{state?.currentPage * state?.perPage - (state?.perPage - 1) + i}
                    </span>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(data?.status)}`}>
                    {data?.status}
                  </span>
                </div>

                {/* Transaction ID */}
                <div className="mb-3">
                  <div className="flex items-center gap-2 mb-1">
                    <CreditCard className="w-4 h-4" style={{color: '#1d8e85'}} />
                    <span className="text-xs text-gray-500 uppercase tracking-wide">Transaction ID</span>
                  </div>
                  <p className="text-gray-800 text-sm break-all">
                    {data?.paypalTransactionId || data?.transactionId || "N/A"}
                  </p>
                </div>

                {/* Payment Details */}
                <div className="grid grid-cols-2 gap-4 mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <div style={{color: '#1d8e85'}}>
                        {getPaymentModeIcon(data?.modeOfPayment)}
                      </div>
                      <span className="text-xs text-gray-500 uppercase tracking-wide">Payment Mode</span>
                    </div>
                    <p className="text-gray-800 text-sm capitalize">{data?.modeOfPayment || "N/A"}</p>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <TrendingUp className="w-4 h-4" style={{color: '#1d8e85'}} />
                      <span className="text-xs text-gray-500 uppercase tracking-wide">JaiMax Coin</span>
                    </div>
                    <p className="text-gray-800 text-sm font-semibold">{data?.jaimax?.toFixed(3) || "N/A"}</p>
                  </div>
                </div>

                {/* Price Information */}
                <div className="grid grid-cols-2 gap-4 mb-3">
                  <div>
                    <span className="text-xs text-gray-500 uppercase tracking-wide">INR Price</span>
                    <p className="text-gray-800 text-sm">{data?.atPriceInr}</p>
                  </div>
                  <div>
                    <span className="text-xs text-gray-500 uppercase tracking-wide">USD Price</span>
                    <p className="text-gray-800 text-sm">{data?.atPriceUsdt}</p>
                  </div>
                </div>

                {/* Round and Currency */}
                <div className="grid grid-cols-2 gap-4 mb-3">
                  <div>
                    <span className="text-xs text-gray-500 uppercase tracking-wide">Round</span>
                    <p className="text-gray-800 text-sm">{data?.round}</p>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <Globe className="w-4 h-4" style={{color: '#1d8e85'}} />
                      <span className="text-xs text-gray-500 uppercase tracking-wide">Currency</span>
                    </div>
                    <p className="text-gray-800 text-sm font-semibold">{data?.currency}</p>
                  </div>
                </div>

                {/* Amount and Date */}
                <div className="grid grid-cols-2 gap-4 mb-3">
                  <div>
                    <span className="text-xs text-gray-500 uppercase tracking-wide">Amount</span>
                    <p className="text-gray-800 text-lg font-bold">
                      {data.currency === "INR"
                        ? `₹${data.amount.toFixed(2)}`
                        : `$${data.amount.toFixed(2)}`}
                    </p>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <Calendar className="w-4 h-4" style={{color: '#1d8e85'}} />
                      <span className="text-xs text-gray-500 uppercase tracking-wide">Purchase Date</span>
                    </div>
                    <p className="text-gray-800 text-sm">{formatDateWithAmPm(data?.createdAt)}</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Desktop Table View */}
        <div className="hidden lg:block">
          <div className="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead style={{backgroundColor: '#1d8e85'}}>
                  <tr className="text-white text-sm">
                    <th className="px-6 py-4 text-left">S.No</th>
                    <th className="px-6 py-4 text-left">Transaction ID</th>
                    <th className="px-6 py-4 text-left">Payment Mode</th>
                    <th className="px-6 py-4 text-left">JaiMax Coin</th>
                    <th className="px-6 py-4 text-left">INR Price</th>
                    <th className="px-6 py-4 text-left">USD Price</th>
                    <th className="px-6 py-4 text-left">Round</th>
                    <th className="px-6 py-4 text-left">Currency</th>
                    <th className="px-6 py-4 text-left">Amount</th>
                    <th className="px-6 py-4 text-left">Purchase Date</th>
                    <th className="px-6 py-4 text-left">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {(isLoading || loading) ? (
                    [...Array(5)].map((_, i) => (
                      <tr key={i}>
                        {[...Array(11)].map((_, j) => (
                          <td key={j} className="px-6 py-4">
                            <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                          </td>
                        ))}
                      </tr>
                    ))
                  ) : filteredTransactions.length === 0 ? (
                    <tr>
                      <td colSpan="11" className="px-6 py-8 text-center text-gray-500">
                        No data found
                      </td>
                    </tr>
                  ) : (
                    filteredTransactions.map((data, i) => (
                      <tr key={i} className="text-gray-800 hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4">
                          {state?.currentPage * state?.perPage - (state?.perPage - 1) + i}
                        </td>
                        <td className="px-6 py-4  text-sm">
                          {data?.paypalTransactionId || data?.transactionId || "N/A"}
                        </td>
                        <td className="px-6 py-4 capitalize">{data?.modeOfPayment || "N/A"}</td>
                        <td className="px-6 py-4 font-semibold">{data?.jaimax?.toFixed(3) || "N/A"}</td>
                        <td className="px-6 py-4">{data?.atPriceInr}</td>
                        <td className="px-6 py-4">{data?.atPriceUsdt}</td>
                        <td className="px-6 py-4">{data?.round}</td>
                        <td className="px-6 py-4 font-semibold">{data?.currency}</td>
                        <td className="px-6 py-4 font-bold">
                          {data.currency === "INR"
                            ? `₹${data.amount.toFixed(2)}`
                            : `$${data.amount.toFixed(2)}`}
                        </td>
                        <td className="px-6 py-4 text-sm">{formatDateWithAmPm(data?.createdAt)}</td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(data?.status)}`}>
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
        <div className="mt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-gray-600 text-sm">Show</span>
            <select 
              className="bg-white border border-gray-200 rounded-lg px-3 py-1 text-gray-800 text-sm focus:outline-none focus:ring-2 focus:border-transparent"
              style={{focusRingColor: '#1d8e85'}}
              value={state?.perPage}
              onChange={(e) => {
                const newPerPage = e.target.value;
                setState({
                  ...state,
                  perPage: newPerPage,
                  currentPage: 1,
                });
              }}
            >
              <option value="10" className="bg-white">10</option>
              <option value="30" className="bg-white">30</option>
              <option value="50" className="bg-white">50</option>
            </select>
            <span className="text-gray-600 text-sm">entries</span>
          </div>
          
          <div className="flex items-center gap-2">
            <button 
              className="px-3 py-1 bg-white border border-gray-200 rounded-full text-gray-600 text-sm hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={state.currentPage <= 1}
              onClick={() => handlePageChange(state.currentPage - 1)}
            >
              Previous
            </button>
            <span className="px-3 py-1 text-white rounded-full text-sm" style={{backgroundColor: '#1d8e85'}}>{state.currentPage}</span>
            <button 
              className="px-3 py-1 bg-white border border-gray-200 rounded-full text-gray-600 text-sm hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={state.currentPage >= Math.ceil((buyDetails?.data?.pagination?.total || 0) / state?.perPage)}
              onClick={() => handlePageChange(state.currentPage + 1)}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionDetails;
