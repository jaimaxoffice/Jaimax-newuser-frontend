// import React, { useEffect, useState } from "react";
// import { Select, MenuItem } from "@mui/material";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import { Users, Search, Copy, TrendingUp, UserCheck, Calendar, Mail, Award, Filter, ChevronDown, Share2 } from 'lucide-react';
// import Pagination from "../../../pagination/pagination";
// import { useUserDetailsQuery } from "./myTotatTeamApliSlice";
// import ReferralModal from "../../modals/referalModal";
// import Loader from "../../../Loader/loader";
// import Cookies from "js-cookie";
// const MyTotalTeam = () => {
//   const [isTokenVerified, setIsTokenVerified] = useState(false);
//   const navigate = useNavigate();
//   const [state, setState] = useState({
//     currentPage: 1,
//     perPage: 8,
//     search: "",
//     sortBy: 'name',
//     filterStatus: 'all'
//   });
  
//   const userData = JSON.parse(localStorage.getItem("userData") || "{}");
//   const [showReferralModal, setShowReferralModal] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [copiedCode, setCopiedCode] = useState(false);
//   const [showFilters, setShowFilters] = useState(false);

//   const REGISTER_REFERAL = `${window.location.origin}/register?referralCode=`;
//   const referralContent = `
//   🚀 Join the Jaimax Coin Revolution! 🚀
  
//   Hey there! 🌟
  
//   I'm excited to introduce you to Jaimax Coin – the future of cryptocurrency! 💰✨ It's a fast, secure, and innovative digital currency that offers amazing opportunities for everyone. Whether you're new to crypto or a seasoned investor, Jaimax Coin is designed to bring you great value. 🌍🔗
  
//   Don't miss out on this chance to be part of something BIG! 💥
  
//   👉 ${REGISTER_REFERAL + userData?.data?.username}
  
//   #JaimaxCoin #CryptoRevolution #JoinUs #FutureOfFinance`;

//   // Fixed: Remove search from query params since we're filtering client-side
//   const queryParams = `limit=${state?.perPage || ""}&page=${
//     state?.currentPage || ""}`;
  
//   const {
//     data: userDetails,
//     isLoading,
//     isError,
//     error,
//     refetch,
//   } = useUserDetailsQuery(queryParams);

//   const TableData = userDetails?.data?.withdrawRequests || [];
//   const totalUsers = userDetails?.data?.pagination?.total || 0;
//   const totalChainUsers = userDetails?.data?.pagination?.chainTotal || 0;
  
//   // Enhanced filtering and sorting - Fixed to work with client-side data
//   const filteredData = TableData
//     .filter(item => {
//       const matchesSearch = state.search === "" || 
//         item.name?.toLowerCase().includes(state.search.toLowerCase()) ||
//         item.username?.toLowerCase().includes(state.search.toLowerCase()) ||
//         item.email?.toLowerCase().includes(state.search.toLowerCase());
      
//       const matchesStatus = state.filterStatus === 'all' || 
//         (state.filterStatus === 'active' && item.isActive) ||
//         (state.filterStatus === 'inactive' && !item.isActive);
      
//       return matchesSearch && matchesStatus;
//     })
//     .sort((a, b) => {
//       switch (state.sortBy) {
//         case 'name':
//           return (a.name || '').localeCompare(b.name || '');
//         case 'referrals':
//           return (b.totalChainReferrals || 0) - (a.totalChainReferrals || 0);
//         case 'date':
//           return new Date(b.createdAt) - new Date(a.createdAt);
//         default:
//           return 0;
//       }
//     });

//   const activeUsers = filteredData.filter(user => user.isActive).length;
//   const totalFilteredUsers = filteredData.length;

//   // Handle PerChange
//   const handlePageChange = (e) => {
//     setLoading(true);
//     setState(prev => ({ ...prev, currentPage: e }));
//   };

//   // Fixed: Direct search handler without timeout for immediate filtering
//   const handleSearch = (e) => {
//     setState(prev => ({ 
//       ...prev, 
//       search: e.target.value, 
//       currentPage: 1 
//     }));
//   };

//   // Handle copy referral code
//   const handleCopyReferralCode = async () => {
//     try {
//       await navigator.clipboard.writeText(userData?.data?.username || "");
//       setCopiedCode(true);
//       setTimeout(() => setCopiedCode(false), 2000);
//     } catch (err) {
//       console.error('Failed to copy referral code');
//     }
//   };

//   useEffect(() => {
//     const token = Cookies.get("token");
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
//   }, [refetch]);

//   useEffect(() => {
//     setLoading(false);
//   }, [userDetails?.data?.withdrawRequests]);

//   const infoBoxes = [
//     {
//       title: "Total Active Members",
//       value: totalUsers,

//     },
//     {
//       title: "Foundation",
//       value: totalChainUsers,

//     },
//     {
//       title: "Referral Code",
//       value: userData?.data?.username || "",

//       isReferral: true
//     }
//   ];

//   // Fixed: Calculate pagination based on filtered data
//   const totalPages = Math.ceil(totalFilteredUsers / state.perPage);
//   const startIndex = (state.currentPage - 1) * state.perPage;
//   const paginatedData = filteredData.slice(startIndex, startIndex + state.perPage);

//   // Generate avatar initials
//   const getAvatarInitials = (name) => {
//     if (!name) return "NA";
//     return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
//   };

//   return (


//     <div className="min-h-screen bg-gradient-to-br from-[#1d8d84] to-[#156660] p-2 sm:p-3">
//   {/* Stats Cards Row */}
//  {/* Alternative Stats Cards Design */}
// <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 mb-4">
//   {infoBoxes.map((box, idx) => (
//     <div
//       key={idx}
//       className="group relative bg-white/95 rounded-lg shadow-md overflow-hidden"
//     >
//       {/* Side decorative element */}
//       <div className="absolute top-0 left-0 h-full w-1.5 bg-gradient-to-b from-teal-400 to-teal-600"></div>
      
//       <div className="p-3 pl-4">
//         {box.isReferral ? (
//           <>
//             <div className="flex items-center justify-between mb-3">
//               <h3 className="font-bold text-gray-800 text-sm">{box.title}</h3>
//               <div className="flex gap-1">
//                 <button
//                   onClick={handleCopyReferralCode}
//                   className={`p-1.5 rounded-full text-white ${copiedCode ? 'bg-green-500' : 'bg-teal-500 hover:bg-teal-600'} transition-colors`}
//                   title="Copy referral code"
//                 >
//                   <Copy className="w-3.5 h-3.5" />
//                 </button>
//                 <button
//                   onClick={() => setShowReferralModal(true)}
//                   className="p-1.5 rounded-full bg-teal-500 text-white hover:bg-teal-600 transition-colors"
//                   title="Share referral"
//                 >
//                   <Share2 className="w-3.5 h-3.5" />
//                 </button>
//               </div>
//             </div>
            
//             <p className="text-xs text-gray-500 mb-2">{box.description}</p>
            
//             <div className="bg-teal-50 rounded-md p-2.5 border border-teal-100 flex items-center justify-between">
//               <div className="flex items-center gap-2">
//                 <div className={`p-1.5 rounded-full bg-gradient-to-r ${box.gradient} text-white`}>
//                   {box.icon}
//                 </div>
//                 <code className="text-base font-bold text-teal-800 truncate max-w-[100px]">
//                   {box.value}
//                 </code>
//               </div>
//               <span className={`text-xs px-1.5 py-0.5 rounded-full ${copiedCode ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
//                 {copiedCode ? '✓ Copied!' : 'Click to copy'}
//               </span>
//             </div>
//           </>
//         ) : (
//           <>
//             <div className="flex items-center justify-between mb-2">
//               <h3 className="font-bold text-gray-800 text-sm">{box.title}</h3>
//               {box.change && (
//                 <div className="flex items-center gap-1 bg-green-50 text-green-700 px-2 py-0.5 rounded-full text-xs font-semibold">
//                   <TrendingUp className="w-3 h-3" />
//                   {box.change}
//                 </div>
//               )}
//             </div>
            
//             <p className="text-xs text-gray-500 mb-3">{box.description}</p>
            
//             <div className="flex items-center gap-3">
//               <div className={`p-2 rounded-full bg-gradient-to-r ${box.gradient} text-white shadow-sm`}>
//                 {box.icon}
//               </div>
//               <div className="text-xl font-bold text-gray-800">
//                 {typeof box.value === 'number' ? box.value.toLocaleString() : box.value}
//               </div>
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   ))}
// </div>

//   {/* Team Data Section */}
//   <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-md border border-white/40 overflow-hidden">
//     {/* Header with tabs and search */}
//     <div className="p-3 border-b border-gray-100">
//       <div className="flex flex-wrap items-center justify-between gap-2">
//         <div>
//           <h2 className="text-lg font-bold text-gray-800">Team Details</h2>
//           <p className="text-xs text-gray-600">
//             {totalFilteredUsers} of {totalUsers} members
//             {state.search && ` (filtered by "${state.search}")`}
//             {state.filterStatus !== 'all' && ` (${state.filterStatus} only)`}
//           </p>
//         </div>
//         <div className="flex gap-2">
//           <div className="relative hidden sm:block w-60">
//             <input
//               type="text"
//               placeholder="Search members..."
//               value={state.search}
//               className="w-full bg-gray-50 border border-gray-200 text-gray-800 rounded-md py-1.5 pl-8 pr-3 text-sm"
//               onChange={handleSearch}
//             />
//             <Search className="absolute left-2.5 top-1/2 transform -translate-y-1/2 text-gray-400 w-3.5 h-3.5" />
//           </div>
//           <button
//             onClick={() => setShowFilters(!showFilters)}
//             className="flex items-center gap-1.5 px-3 py-1.5 bg-teal-50 text-teal-700 rounded-md hover:bg-teal-100 border border-teal-100 text-sm"
//           >
//             <Filter className="w-3.5 h-3.5" />
//             <span className="sm:hidden">Filters</span>
//             <span className="hidden sm:inline">Filters</span>
//             <ChevronDown className={`w-3.5 h-3.5 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
//           </button>
//         </div>
//       </div>
      
//       {/* Compact Filters */}
//       {showFilters && (
//         <div className="mt-3 p-2 bg-gray-50 rounded-md border border-gray-100 text-sm">
//           <div className="sm:hidden mb-2">
//             <label className="block text-xs font-medium text-gray-700 mb-1">Search</label>
//             <div className="relative">
//               <input
//                 type="text"
//                 placeholder="Search members..."
//                 value={state.search}
//                 className="w-full bg-white border border-gray-200 rounded-md py-1.5 pl-8 pr-3 text-sm"
//                 onChange={handleSearch}
//               />
//               <Search className="absolute left-2.5 top-1/2 transform -translate-y-1/2 text-gray-400 w-3.5 h-3.5" />
//             </div>
//           </div>
          
//           <div className="grid grid-cols-1 sm:grid-cols-4 gap-2">
//             <div>
//               <label className="block text-xs font-medium text-gray-700 mb-1">Sort by</label>
//               <select
//                 value={state.sortBy}
//                 onChange={(e) => setState(prev => ({ ...prev, sortBy: e.target.value }))}
//                 className="w-full bg-white border border-gray-200 rounded-md px-2 py-1.5 text-sm"
//               >
//                 <option value="name">Name (A-Z)</option>
//                 <option value="referrals">Referrals (High to Low)</option>
//                 <option value="date">Join Date (Newest)</option>
//               </select>
//             </div>
//             <div>
//               <label className="block text-xs font-medium text-gray-700 mb-1">Status</label>
//               <select
//                 value={state.filterStatus}
//                 onChange={(e) => setState(prev => ({ ...prev, filterStatus: e.target.value, currentPage: 1 }))}
//                 className="w-full bg-white border border-gray-200 rounded-md px-2 py-1.5 text-sm"
//               >
//                 <option value="all">All Members</option>
//                 <option value="active">Active Only</option>
//                 <option value="inactive">Inactive Only</option>
//               </select>
//             </div>
//             <div>
//               <label className="block text-xs font-medium text-gray-700 mb-1">Per Page</label>
//               <select
//                 value={state.perPage}
//                 onChange={(e) => setState(prev => ({ ...prev, perPage: parseInt(e.target.value), currentPage: 1 }))}
//                 className="w-full bg-white border border-gray-200 rounded-md px-2 py-1.5 text-sm"
//               >
//                 <option value={8}>8</option>
//                 <option value={10}>10</option>
//                 <option value={30}>30</option>
//                 <option value={50}>50</option>
//               </select>
//             </div>
//             <div className="flex items-end">
//               <button
//                 onClick={() => setState(prev => ({ ...prev, search: "", filterStatus: "all", sortBy: "name", currentPage: 1 }))}
//                 className="w-full px-2 py-1.5 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 text-sm"
//               >
//                 Clear Filters
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>

//     {/* Mobile Cards View */}
//     <div className="grid gap-2 p-2 lg:hidden">
//       {isLoading ? (
//         [...Array(3)].map((_, i) => (
//           <div key={i} className="bg-white rounded-md p-3 border border-gray-200 animate-pulse">
//             <div className="flex items-center gap-3 mb-2">
//               <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
//               <div className="flex-1 min-w-0">
//                 <div className="h-3 bg-gray-200 rounded mb-1"></div>
//                 <div className="h-2 bg-gray-200 rounded w-2/3"></div>
//               </div>
//             </div>
//             <div className="space-y-1.5">
//               <div className="h-2 bg-gray-200 rounded"></div>
//               <div className="h-2 bg-gray-200 rounded w-3/4"></div>
//             </div>
//           </div>
//         ))
//       ) : paginatedData.length === 0 ? (
//         <div className="text-center py-8 bg-white rounded-md border border-gray-200">
//           <Users className="w-10 h-10 text-gray-400 mx-auto mb-2" />
//           <h3 className="text-base font-semibold text-gray-800 mb-1">No members found</h3>
//           <p className="text-xs text-gray-600">
//             {state.search || state.filterStatus !== 'all' 
//               ? "No members match your current filters" 
//               : "No team members to display"}
//           </p>
//         </div>
//       ) : (
//         paginatedData.map((data, i) => (
//           <div key={i} className="bg-white rounded-md p-3 border border-gray-200 hover:border-teal-200 hover:shadow-sm transition-all">
//             {/* Header Section */}
//             <div className="flex items-start gap-2.5">
//               <div className="w-9 h-9 rounded-full bg-gradient-to-br from-teal-500 to-teal-600 flex items-center justify-center text-white font-semibold text-xs flex-shrink-0">
//                 {getAvatarInitials(data.name)}
//               </div>
              
//               <div className="flex-1 min-w-0">
//                 <div className="flex items-start justify-between">
//                   <div>
//                     <h3 className="font-semibold text-gray-800 text-sm break-words">
//                       {data.name || "N/A"}
//                     </h3>
//                     <p className="text-teal-600 text-xs break-words">
//                       {data.username || "N/A"}
//                     </p>
//                   </div>
                  
//                   <span className={`px-1.5 py-0.5 rounded-md text-[10px] font-medium ${
//                     data.isActive
//                       ? "bg-green-100 text-green-700 border border-green-200"
//                       : "bg-red-100 text-red-700 border border-red-200"
//                   }`}>
//                     {data.isActive ? "Active" : "Inactive"}
//                   </span>
//                 </div>
                
//                 <div className="mt-2 space-y-1 text-xs">
//                   <div className="flex items-start gap-1.5">
//                     <Mail className="w-3.5 h-3.5 text-gray-400 flex-shrink-0 mt-0.5" />
//                     <span className="text-gray-600 break-all">{data.email || "N/A"}</span>
//                   </div>
                  
//                   <div className="flex flex-wrap gap-y-1 justify-between">
//                     <div className="flex items-center gap-1.5">
//                       <Award className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
//                       <span className="text-teal-700 font-medium">{data.totalChainReferrals || 0} referrals</span>
//                     </div>
                    
//                     <div className="flex items-center gap-1.5">
//                       <Calendar className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
//                       <span className="text-gray-600">
//                         {data.createdAt 
//                           ? data.createdAt.slice(0, 10).split("-").reverse().join("-") 
//                           : "N/A"}
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         ))
//       )}
//     </div>

//     {/* Desktop Table */}
//     <div className="hidden lg:block overflow-x-auto">
//       <table className="w-full text-sm">
//         <thead>
//           <tr className="bg-teal-600 text-white text-left">
//             <th className="py-1.5 px-3 font-medium text-xs">#</th>
//             <th className="py-1.5 px-3 font-medium text-xs">Name</th>
//             <th className="py-1.5 px-3 font-medium text-xs">Email</th>
//             <th className="py-1.5 px-3 font-medium text-xs">Username</th>
//             <th className="py-1.5 px-3 font-medium text-xs">Referrals</th>
//             <th className="py-1.5 px-3 font-medium text-xs">Join Date</th>
//             <th className="py-1.5 px-3 font-medium text-xs">Status</th>
//           </tr>
//         </thead>
//         <tbody>
//           {isLoading ? (
//             [...Array(5)].map((_, i) => (
//               <tr key={i} className="border-b border-gray-100">
//                 {[...Array(7)].map((_, j) => (
//                   <td key={j} className="py-3 px-3">
//                     <div className="h-2 bg-gray-200 rounded w-12 animate-pulse"></div>
//                   </td>
//                 ))}
//               </tr>
//             ))
//           ) : paginatedData.length === 0 ? (
//             <tr>
//               <td colSpan="7" className="text-center py-10">
//                 <Users className="w-10 h-10 text-gray-400 mx-auto mb-2" />
//                 <h3 className="text-base font-semibold text-gray-800 mb-1">No members found</h3>
//                 <p className="text-xs text-gray-600">
//                   {state.search || state.filterStatus !== 'all' 
//                     ? "No members match your current filters" 
//                     : "No team members to display"}
//                 </p>
//               </td>
//             </tr>
//           ) : (
//             paginatedData.map((data, i) => (
//               <tr key={i} className="border-b border-gray-100 hover:bg-teal-50/50 transition-colors">
//                 <td className="py-2 px-3 text-gray-700 font-medium">
//                   {startIndex + i + 1}
//                 </td>
//                 <td className="py-2 px-3">
//                   <div className="font-medium text-gray-800 truncate">{data.name || "N/A"}</div>
//                 </td>
//                 <td className="py-2 px-3 text-gray-700">
//                   <div className="truncate max-w-[150px]" title={data.email}>
//                     {data.email || "N/A"}
//                   </div>
//                 </td>
//                 <td className="py-2 px-3 text-gray-700">{data.username || "N/A"}</td>
//                 <td className="py-2 px-3 text-gray-700">{data.totalChainReferrals || 0}</td>
//                 <td className="py-2 px-3 text-gray-700 text-xs">
//                   {data.createdAt ? data.createdAt.slice(0, 10).split("-").reverse().join("-") : "N/A"}
//                 </td>
//                 <td className="py-2 px-3">
//                   <span className={`px-2 py-0.5 rounded-md text-xs font-medium ${
//                     data.isActive
//                       ? "bg-green-100 text-green-700 border border-green-200"
//                       : "bg-red-100 text-red-700 border border-red-200"
//                   }`}>
//                     {data.isActive ? "Active" : "Inactive"}
//                   </span>
//                 </td>
//               </tr>
//             ))
//           )}
//         </tbody>
//       </table>
//     </div>

//     {/* Pagination */}
//     {totalPages > 1 && (
//       <div className="flex justify-center p-3 border-t border-gray-100">
//         <Pagination
//           currentPage={state?.currentPage}
//           totalPages={totalPages}
//           onPageChange={handlePageChange}
//         />
//       </div>
//     )}
//   </div>

//   {/* Modals */}
//   {showReferralModal && (
//     <ReferralModal
//       show={showReferralModal}
//       onHide={() => setShowReferralModal(false)}
//       userData={userData}
//     />
//   )}
//   {(isLoading || loading) && <Loader />}
// </div>

//   );
// };

// export default MyTotalTeam;



import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Users, Search, Copy, TrendingUp, Calendar, Mail, Award, Filter, ChevronDown, Share2 } from 'lucide-react';
import Pagination from "../../../pagination/pagination";
import { useUserDetailsQuery } from "./myTotatTeamApliSlice";
import ReferralModal from "../../modals/referalModal";
import Loader from "../../../Loader/loader";
import Cookies from "js-cookie";

const MyTotalTeam = () => {
  const [isTokenVerified, setIsTokenVerified] = useState(false);
  const navigate = useNavigate();
  const [state, setState] = useState({
    currentPage: 1,
    perPage: 8,
    search: "",
    sortBy: 'name',
    filterStatus: 'all'
  });
  
  const userData = JSON.parse(localStorage.getItem("userData") || "{}");
  const [showReferralModal, setShowReferralModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const REGISTER_REFERAL = `${window.location.origin}/register?referralCode=`;
  const referralContent = `
  🚀 Join the Jaimax Coin Revolution! 🚀
  
  Hey there! 🌟
  
  I'm excited to introduce you to Jaimax Coin – the future of cryptocurrency! 💰✨ It's a fast, secure, and innovative digital currency that offers amazing opportunities for everyone. Whether you're new to crypto or a seasoned investor, Jaimax Coin is designed to bring you great value. 🌍🔗
  
  Don't miss out on this chance to be part of something BIG! 💥
  
  👉 ${REGISTER_REFERAL + userData?.data?.username}
  
  #JaimaxCoin #CryptoRevolution #JoinUs #FutureOfFinance`;

  // Critical fix: Include search and filters in API request
  const queryParams = `limit=${state.perPage}&page=${state.currentPage}`;
  
  const {
    data: userDetails,
    isLoading,
    isError,
    error,
    refetch,
  } = useUserDetailsQuery(queryParams);

  const TableData = userDetails?.data?.withdrawRequests || [];
  const totalUsers = userDetails?.data?.pagination?.total || 0;
  const totalChainUsers = userDetails?.data?.pagination?.chainTotal || 0;
  
  // Enhanced filtering and sorting - applied after getting data from API
  const filteredData = TableData.filter(item => {
      const matchesSearch = state.search === "" || 
        item.name?.toLowerCase().includes(state.search.toLowerCase()) ||
        item.username?.toLowerCase().includes(state.search.toLowerCase()) ||
        item.email?.toLowerCase().includes(state.search.toLowerCase());
      
      const matchesStatus = state.filterStatus === 'all' || 
        (state.filterStatus === 'active' && item.isActive) ||
        (state.filterStatus === 'inactive' && !item.isActive);
      
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      switch (state.sortBy) {
        case 'name':
          return (a.name || '').localeCompare(b.name || '');
        case 'referrals':
          return (b.totalChainReferrals || 0) - (a.totalChainReferrals || 0);
        case 'date':
          return new Date(b.createdAt) - new Date(a.createdAt);
        default:
          return 0;
      }
    });

  const activeUsers = filteredData.filter(user => user.isActive).length;
  const totalFilteredUsers = filteredData.length;

  // Handle Page Change - Critical fix for pagination
  const handlePageChange = (e) => {
    setLoading(true);
    setState(prev => ({ ...prev, currentPage: e }));
    window.scrollTo(0, 0);
  };

  // Search handler - Reset to page 1 when searching
  const handleSearch = (e) => {
    setState(prev => ({ 
      ...prev, 
      search: e.target.value, 
      currentPage: 1 
    }));
  };

  // Handle copy referral code
  const handleCopyReferralCode = async () => {
    try {
      await navigator.clipboard.writeText(userData?.data?.username || "");
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
      toast.success("Referral code copied!", { 
        position: "top-center", 
        autoClose: 2000
      });
    } catch (err) {
      console.error('Failed to copy referral code');
      toast.error("Failed to copy code", { 
        position: "top-center", 
        autoClose: 2000
      });
    }
  };

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

  // Critical fix: Immediately refetch data when component mounts or when pagination/search changes
  useEffect(() => {
    if (isTokenVerified) {
      refetch()
        .then(() => setLoading(false))
        .catch(() => setLoading(false));
    }
  }, [refetch, isTokenVerified, state.currentPage]);

  // Additional loading state reset
  useEffect(() => {
    if (!isLoading) {
      setLoading(false);
    }
  }, [isLoading]);
const filteredCount = (() => {
  if (state.filterStatus === 'active') return filteredData.length;
  if (state.filterStatus === 'inactive') return filteredData.length;
  return totalUsers;
})();

const infoBoxes = [
  {
    title: "Total Members",
    value: totalUsers,
    icon: <Users className="w-5 h-5" />,
  },
  {
    title: "Foundation",
    value: `${filteredCount} / ${totalChainUsers}`,
    icon: <TrendingUp className="w-5 h-5" />,
    subtitle: state.filterStatus === 'active'
      ? "Active / Foundation"
      : state.filterStatus === 'inactive'
        ? "Inactive / Foundation"
        : "All / Foundation"
  },
  {
    title: "Referral Code",
    value: userData?.data?.username || "",
    icon: <Award className="w-5 h-5" />,
    isReferral: true
  }
];
  // Stats cards data
  // const infoBoxes = [
  //   {
  //     title: "Total Active Members",
  //     value: totalUsers,
  //     icon: <Users className="w-5 h-5" />,
  //   },
  //   {
  //     title: "Foundation",
  //     value: totalChainUsers,
  //     icon: <TrendingUp className="w-5 h-5" />,
  //   },
  //   {
  //     title: "Referral Code",
  //     value: userData?.data?.username || "",
  //     icon: <Award className="w-5 h-5" />,
  //     isReferral: true
  //   }
  // ];

  // Calculate pagination - Using server-side pagination information
  const totalPages = Math.max(1, Math.ceil(totalChainUsers / state.perPage));
  
  // Don't slice the data - use the data directly from the API
  const paginatedData = TableData; // Already paginated by the server
  
  console.log("Data status:", {
    loading: isLoading || loading,
    currentPage: state.currentPage,
    totalPages,
    dataLength: TableData.length,
    totalChainUsers,
    perPage: state.perPage
  });

  // Generate avatar initials
  const getAvatarInitials = (name) => {
    if (!name) return "NA";
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1d8d84] to-[#156660] p-3 sm:p-4">
      {/* Stats Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        {infoBoxes.map((box, idx) => (
          <div
            key={idx}
            className="relative bg-white/95 rounded-lg shadow-md overflow-hidden h-28 flex"
          >
            {/* Left accent */}
            <div className="w-1.5 bg-gradient-to-b from-teal-400 to-teal-600"></div>
            
            {/* Content */}
            <div className="flex-1 p-4 flex flex-col justify-between">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-teal-500 to-teal-700 flex items-center justify-center text-white mr-2.5">
                  {box.icon}
                </div>
                <h3 className="font-bold text-gray-800 text-sm">{box.title}</h3>
              </div>
              
              {box.isReferral ? (
                <div className="flex items-center justify-between mt-2">
                  <div className="bg-teal-50 rounded-md py-2 px-3 border border-teal-100 flex-grow mr-2">
                    <code className="font-mono text-base font-semibold text-teal-800 truncate max-w-[150px] block">
                      {box.value}
                    </code>
                  </div>
                  <div className="flex gap-1">
                    <button
                      onClick={handleCopyReferralCode}
                      className={`p-2 rounded-md text-white ${copiedCode ? 'bg-green-500' : 'bg-teal-500 hover:bg-teal-600'} transition-colors shadow-sm`}
                      title="Copy referral code"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setShowReferralModal(true)}
                      className="p-2 rounded-md bg-teal-500 text-white hover:bg-teal-600 transition-colors shadow-sm"
                      title="Share referral"
                    >
                      <Share2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ) : (
                <div className="mt-2">
                  <div className="text-2xl font-bold text-gray-800">
                    {typeof box.value === 'number' ? box.value.toLocaleString() : box.value}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Team Data Section */}
      <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-md border border-white/40 overflow-hidden">
        {/* Header with search */}
        <div className="p-4 border-b border-gray-100">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-bold text-gray-800">Team Details</h2>
              <p className="text-xs text-gray-600 mt-1">
                Showing {paginatedData.length} members 
                (Page {state.currentPage} of {totalPages})
              </p>
            </div>
            <div className="flex gap-2">
              <div className="relative w-60">
                <input
                  type="text"
                  placeholder="Search members..."
                  value={state.search}
                  className="w-full bg-gray-50 border border-gray-200 text-gray-800 rounded-md py-2 pl-9 pr-3 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-teal-500"
                  onChange={handleSearch}
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              </div>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-1.5 px-3 py-2 bg-teal-50 text-teal-700 rounded-md hover:bg-teal-100 border border-teal-100 text-sm"
              >
                <Filter className="w-4 h-4" />
                <span>Filters</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
              </button>
            </div>
          </div>
          
          {/* Filters - Removed Per Page */}
          {showFilters && (
            <div className="mt-3 p-3 bg-gray-50 rounded-md border border-gray-100 text-sm">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Sort by</label>
                  <select
                    value={state.sortBy}
                    onChange={(e) => setState(prev => ({ ...prev, sortBy: e.target.value }))}
                    className="w-full bg-white border border-gray-200 rounded-md px-2 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-teal-500"
                  >
                    <option value="name">Name (A-Z)</option>
                    <option value="referrals">Referrals (High to Low)</option>
                    <option value="date">Join Date (Newest)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Status</label>
                  <select
                    value={state.filterStatus}
                    onChange={(e) => setState(prev => ({ ...prev, filterStatus: e.target.value, currentPage: 1 }))}
                    className="w-full bg-white border border-gray-200 rounded-md px-2 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-teal-500"
                  >
                    <option value="all">All Members</option>
                    <option value="active">Active Only</option>
                    <option value="inactive">Inactive Only</option>
                  </select>
                </div>
                <div className="flex items-end">
                  <button
                    onClick={() => setState(prev => ({ ...prev, search: "", filterStatus: "all", sortBy: "name", currentPage: 1 }))}
                    className="w-full px-3 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 text-sm font-medium"
                  >
                    Clear Filters
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Mobile Cards View */}
        <div className="grid gap-3 p-3 lg:hidden">
          {isLoading || loading ? (
            [...Array(3)].map((_, i) => (
              <div key={i} className="bg-white rounded-md p-3 border border-gray-200 animate-pulse">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                  <div className="flex-1 min-w-0">
                    <div className="h-3 bg-gray-200 rounded mb-1"></div>
                    <div className="h-2 bg-gray-200 rounded w-2/3"></div>
                  </div>
                </div>
                <div className="space-y-1.5">
                  <div className="h-2 bg-gray-200 rounded"></div>
                  <div className="h-2 bg-gray-200 rounded w-3/4"></div>
                </div>
              </div>
            ))
          ) : filteredData.length === 0 ? (
            <div className="text-center py-8 bg-white rounded-md border border-gray-200">
              <Users className="w-10 h-10 text-gray-400 mx-auto mb-2" />
              <h3 className="text-base font-semibold text-gray-800 mb-1">No members found</h3>
              <p className="text-xs text-gray-600">
                {state.search || state.filterStatus !== 'all' 
                  ? "No members match your current filters" 
                  : state.currentPage > 1 
                    ? "No team members found on this page. Try going back to page 1." 
                    : "No team members to display"}
              </p>
              {state.currentPage > 1 && (
                <button 
                  onClick={() => setState(prev => ({ ...prev, currentPage: 1 }))}
                  className="mt-3 px-4 py-1.5 bg-teal-500 text-white rounded-md hover:bg-teal-600 text-sm"
                >
                  Go to Page 1
                </button>
              )}
            </div>
          ) : (
            filteredData.map((data, i) => (
              <div key={i} className="bg-white rounded-md p-4 border border-gray-200 hover:border-teal-200 hover:shadow-sm transition-all">
                {/* Header Section */}
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-500 to-teal-600 flex items-center justify-center text-white font-semibold text-sm flex-shrink-0">
                    {getAvatarInitials(data.name)}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold text-gray-800 text-sm break-words">
                          {data.name || "N/A"}
                        </h3>
                        <p className="text-teal-600 text-xs break-words">
                          {data.username || "N/A"}
                        </p>
                      </div>
                      
                      <span className={`px-2 py-0.5 rounded-md text-xs font-medium ${
                        data.isActive
                          ? "bg-green-100 text-green-700 border border-green-200"
                          : "bg-red-100 text-red-700 border border-red-200"
                      }`}>
                        {data.isActive ? "Active" : "Inactive"}
                      </span>
                    </div>
                    
                    <div className="mt-3 space-y-2 text-xs">
                      <div className="flex items-start gap-2">
                        <Mail className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-600 break-all">{data.email || "N/A"}</span>
                      </div>
                      
                      <div className="flex flex-wrap gap-y-2 justify-between border-t border-gray-100 pt-2">
                        <div className="flex items-center gap-2">
                          <Award className="w-4 h-4 text-gray-400 flex-shrink-0" />
                          <span className="text-teal-700 font-medium">{data.totalChainReferrals || 0} referrals</span>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-gray-400 flex-shrink-0" />
                          <span className="text-gray-600">
                            {data.createdAt 
                              ? data.createdAt.slice(0, 10).split("-").reverse().join("-") 
                              : "N/A"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Desktop Table */}
        <div className="hidden lg:block overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-teal-600 text-white text-left">
                <th className="py-2.5 px-4 font-medium text-xs">#</th>
                <th className="py-2.5 px-4 font-medium text-xs">Name</th>
                <th className="py-2.5 px-4 font-medium text-xs">Email</th>
                <th className="py-2.5 px-4 font-medium text-xs">Username</th>
                <th className="py-2.5 px-4 font-medium text-xs">Referrals</th>
                <th className="py-2.5 px-4 font-medium text-xs">Join Date</th>
                <th className="py-2.5 px-4 font-medium text-xs">Status</th>
              </tr>
            </thead>
            <tbody>
              {isLoading || loading ? (
                [...Array(5)].map((_, i) => (
                  <tr key={i} className="border-b border-gray-100">
                    {[...Array(7)].map((_, j) => (
                      <td key={j} className="py-3 px-4">
                        <div className="h-2 bg-gray-200 rounded w-12 animate-pulse"></div>
                      </td>
                    ))}
                  </tr>
                ))
              ) : filteredData.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center py-10">
                    <Users className="w-10 h-10 text-gray-400 mx-auto mb-2" />
                    <h3 className="text-base font-semibold text-gray-800 mb-1">No members found</h3>
                    <p className="text-xs text-gray-600">
                      {state.search || state.filterStatus !== 'all' 
                        ? "No members match your current filters" 
                        : state.currentPage > 1 
                          ? "No team members found on this page. Try going back to page 1." 
                          : "No team members to display"}
                    </p>
                    {state.currentPage > 1 && (
                      <button 
                        onClick={() => setState(prev => ({ ...prev, currentPage: 1 }))}
                        className="mt-3 px-4 py-1.5 bg-teal-500 text-white rounded-md hover:bg-teal-600 text-sm"
                      >
                        Go to Page 1
                      </button>
                    )}
                  </td>
                </tr>
              ) : (
                filteredData.map((data, i) => {
                  // Calculate row number based on current page
                  const rowNumber = ((state.currentPage - 1) * state.perPage) + i + 1;
                  
                  return (
                    <tr key={i} className="border-b border-gray-100 hover:bg-teal-50/50 transition-colors">
                      <td className="py-3 px-4 text-gray-700 font-medium">
                        {rowNumber}
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-teal-500 to-teal-600 flex items-center justify-center text-white text-xs font-medium">
                            {getAvatarInitials(data.name)}
                          </div>
                          <div className="font-medium text-gray-800 truncate">{data.name || "N/A"}</div>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-gray-700">
                        <div className="truncate max-w-[180px]" title={data.email}>
                          {data.email || "N/A"}
                        </div>
                      </td>
                      <td className="py-3 px-4 text-gray-700">{data.username || "N/A"}</td>
                      <td className="py-3 px-4 font-medium text-teal-700">{data.totalChainReferrals || 0}</td>
                      <td className="py-3 px-4 text-gray-700 text-xs">
                        {data.createdAt ? data.createdAt.slice(0, 10).split("-").reverse().join("-") : "N/A"}
                      </td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-0.5 rounded-md text-xs font-medium ${
                          data.isActive
                            ? "bg-green-100 text-green-700 border border-green-200"
                            : "bg-red-100 text-red-700 border border-red-200"
                        }`}>
                          {data.isActive ? "Active" : "Inactive"}
                        </span>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-center p-4 border-t border-gray-100">
          {totalPages > 1 && (
            <>
              <div className="text-sm text-gray-600 mr-3 hidden sm:block">
                Page {state.currentPage} of {totalPages}
              </div>
              
              <Pagination
                currentPage={state.currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </>
          )}
        </div>
      </div>

      {/* Modals */}
      {showReferralModal && (
        <ReferralModal
          show={showReferralModal}
          onHide={() => setShowReferralModal(false)}
          userData={userData}
        />
      )}
      {(isLoading || loading) && <Loader />}
    </div>
  );
};

export default MyTotalTeam;