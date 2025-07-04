// import React, { useEffect, useState } from "react";
// import { Select, MenuItem } from "@mui/material";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import { Users, Search, Copy, TrendingUp, UserCheck, Calendar, Mail, Award, Filter, ChevronDown, Share2 } from 'lucide-react';
// import Pagination from "../../../pagination/pagination";
// import { useUserDetailsQuery } from "./myTotatTeamApliSlice";
// import ReferralModal from "../../modals/referalModal";
// import Loader from "../../../Loader/loader";
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
//     const token = localStorage.getItem("token");
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
//       description: `${activeUsers} active members`,
//       icon: <Users className="w-6 h-6" />,
//       gradient: "from-teal-500 via-teal-600 to-teal-700",
//       change: "+12%",
//       trend: "up"
//     },
//     {
//       title: "Foundation",
//       value: totalChainUsers,
//       description: "Foundation network",
//       icon: <TrendingUp className="w-6 h-6" />,
//       gradient: "from-teal-500 via-teal-600 to-teal-700",
//       change: "+8%",
//       trend: "up"
//     },
//     {
//       title: "Referral Code",
//       value: userData?.data?.username || "",
//       description: "Your unique code",
//       icon: <Award className="w-6 h-6" />,
//       gradient: "from-teal-500 via-teal-600 to-teal-700",
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
//     <div className="min-h-screen bg-[#1d8d84] p-2 sm:p-4 lg:p-6">
//       {/* Stats Cards - Improved responsiveness */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
//         {infoBoxes.map((box, idx) => (
//           <div
//             key={idx}
//             className="group relative overflow-hidden rounded-2xl sm:rounded-3xl bg-white/80 backdrop-blur-sm p-4 sm:p-6 shadow-lg border border-white/50 hover:shadow-2xl hover:scale-105 transition-all duration-500 cursor-pointer"
//           >
//             {/* Background gradient */}
//             <div className={`absolute inset-0 bg-gradient-to-br ${box.gradient} opacity-5 group-hover:opacity-10 transition-opacity duration-500`}></div>
            
//             {/* Floating elements */}
//             <div className="absolute -top-4 -right-4 w-16 sm:w-24 h-16 sm:h-24 rounded-full bg-gradient-to-br from-white/20 to-transparent blur-xl group-hover:scale-110 transition-transform duration-500"></div>
            
//             <div className="relative z-10">
//               {box.isReferral ? (
//                 <div className="space-y-3 sm:space-y-4">
//                   <div className="flex items-center justify-between flex-wrap gap-2">
//                     <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
//                       <div className={`p-2 sm:p-3 rounded-xl bg-gradient-to-br ${box.gradient} text-white shadow-lg group-hover:shadow-xl transition-shadow duration-300`}>
//                         {box.icon}
//                       </div>
//                       <div className="min-w-0">
//                         <h3 className="font-semibold text-gray-800 text-sm sm:text-base truncate">
//                           {box.title}
//                         </h3>
//                         <p className="text-xs sm:text-sm text-gray-600 truncate">
//                           {box.description}
//                         </p>
//                       </div>
//                     </div>
//                     <div className="flex gap-2 flex-shrink-0">
//                       <button
//                         onClick={handleCopyReferralCode}
//                         className={`p-2 rounded-full bg-gradient-to-br ${box.gradient} text-white hover:shadow-lg transition-all duration-200 ${copiedCode ? 'scale-110' : ''}`}
//                         title="Copy referral code"
//                       >
//                         <Copy className="w-3 h-3 sm:w-4 sm:h-4" />
//                       </button>
//                       <button
//                         onClick={() => setShowReferralModal(true)}
//                         className={`p-2 rounded-full bg-gradient-to-br ${box.gradient} text-white hover:shadow-lg transition-all duration-200`}
//                         title="Share referral"
//                       >
//                         <Share2 className="w-3 h-3 sm:w-4 sm:h-4" />
//                       </button>
//                     </div>
//                   </div>
//                   <div className="bg-gradient-to-r from-teal-50 to-white rounded-xl p-3 sm:p-4 border border-teal-200">
//                     <div className="flex items-center justify-between gap-2">
//                       <code className="text-lg sm:text-xl font-bold text-teal-800 truncate flex-1">
//                         {box.value}
//                       </code>
//                       <span className="text-xs text-teal-600 whitespace-nowrap">
//                         {copiedCode ? '✓ Copied!' : 'Click to copy'}
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//               ) : (
//                 <div className="space-y-3 sm:space-y-4">
//                   <div className="flex items-center justify-between flex-wrap gap-2">
//                     <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
//                       <div className={`p-2 sm:p-3 rounded-xl bg-gradient-to-br ${box.gradient} text-white shadow-lg group-hover:shadow-xl transition-shadow duration-300`}>
//                         {box.icon}
//                       </div>
//                       <div className="min-w-0">
//                         <h3 className="font-semibold text-gray-800 text-sm sm:text-base truncate">
//                           {box.title}
//                         </h3>
//                         <p className="text-xs sm:text-sm text-gray-600 truncate">
//                           {box.description}
//                         </p>
//                       </div>
//                     </div>
//                     {box.change && (
//                       <div className="text-right flex-shrink-0">
//                         <span className="text-green-600 text-sm font-bold">
//                           {box.change}
//                         </span>
//                         <div className="text-xs text-gray-500 whitespace-nowrap">vs last month</div>
//                       </div>
//                     )}
//                   </div>
//                   <div className="text-2xl sm:text-3xl font-bold text-gray-800">
//                     {typeof box.value === 'number' ? box.value.toLocaleString() : box.value}
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Team Data Section - Improved responsiveness */}
//       <div className="bg-white/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-xl border border-white/50 p-4 sm:p-6 lg:p-8">
//         {/* Header with Search and Filters - Better mobile layout */}
//         <div className="flex flex-col gap-4 sm:gap-6 mb-6 sm:mb-8">
//           <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
//             <div>
//               <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-1 sm:mb-2">
//                 Total Team Details
//               </h2>
//               <p className="text-gray-600 text-sm sm:text-base">
//                 {totalFilteredUsers} of {totalUsers} members
//                 {state.search && ` (filtered by "${state.search}")`}
//                 {state.filterStatus !== 'all' && ` (${state.filterStatus} only)`}
//               </p>
//             </div>
//              <div className="hidden sm:block">
//             <div className="relative w-full max-w-md">
//               <input
//                 type="text"
//                 placeholder="Search members..."
//                 value={state.search}
//                 className="w-full bg-gray-50/80 backdrop-blur-sm border border-gray-200 text-gray-800 rounded-xl py-3 pl-12 pr-4 placeholder-gray-500 focus:outline-none focus:border-teal-500 focus:bg-white/90 transition-all duration-200"
//                 onChange={handleSearch}
//               />
//               <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
//             </div>
//           </div>
            

//             {/* Filter Button - Mobile friendly */}
//             <button
//               onClick={() => setShowFilters(!showFilters)}
//               className="flex items-center justify-center gap-2 px-4 py-3 bg-teal-50 text-teal-700 rounded-xl hover:bg-teal-100 transition-colors duration-200 border border-teal-200 sm:self-start"
//             >
//               <Filter className="w-4 h-4" />
//               <span>Filters & Search</span>
//               <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${showFilters ? 'rotate-180' : ''}`} />
//             </button>
            
//           </div>
         
//         </div>

//         {/* Filters Panel - Improved mobile layout */}
//         {showFilters && (
//           <div className="mb-6 p-4 bg-gray-50/80 rounded-xl border border-gray-200">
//             {/* Mobile Search Bar */}
//             <div className="mb-4 sm:hidden">
//               <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
//               <div className="relative">
//                 <input
//                   type="text"
//                   placeholder="Search members..."
//                   value={state.search}
//                   className="w-full bg-white border border-gray-300 rounded-lg py-3 pl-10 pr-4 text-sm focus:outline-none focus:border-teal-500"
//                   onChange={handleSearch}
//                 />
//                 <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
//               </div>
//             </div>

//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Sort by</label>
//                 <select
//                   value={state.sortBy}
//                   onChange={(e) => setState(prev => ({ ...prev, sortBy: e.target.value }))}
//                   className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-teal-500"
//                 >
//                   <option value="name">Name (A-Z)</option>
//                   <option value="referrals">Referrals (High to Low)</option>
//                   <option value="date">Join Date (Newest)</option>
//                 </select>
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
//                 <select
//                   value={state.filterStatus}
//                   onChange={(e) => setState(prev => ({ ...prev, filterStatus: e.target.value, currentPage: 1 }))}
//                   className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-teal-500"
//                 >
//                   <option value="all">All Members</option>
//                   <option value="active">Active Only</option>
//                   <option value="inactive">Inactive Only</option>
//                 </select>
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Per Page</label>
//                 <select
//                   value={state.perPage}
//                   onChange={(e) => {
//                     setState(prev => ({
//                       ...prev,
//                       perPage: parseInt(e.target.value),
//                       currentPage: 1,
//                     }));
//                   }}
//                   className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-teal-500"
//                 >
//                   <option value={8}>8</option>
//                   <option value={10}>10</option>
//                   <option value={30}>30</option>
//                   <option value={50}>50</option>
//                 </select>
//               </div>
//               <div className="flex items-end">
//                 <button
//                   onClick={() => setState(prev => ({ 
//                     ...prev, 
//                     search: "", 
//                     filterStatus: "all",
//                     sortBy: "name",
//                     currentPage: 1 
//                   }))}
//                   className="w-full px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors duration-200 text-sm"
//                 >
//                   Clear Filters
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Mobile Cards - Improved layout */}
//         <div className="grid gap-4 lg:hidden">
//           {isLoading ? (
//             [...Array(5)].map((_, i) => (
//               <div key={i} className="bg-white rounded-xl p-4 border border-gray-200 animate-pulse">
//                 <div className="flex items-center gap-3 mb-3">
//                   <div className="w-12 h-12 bg-gray-200 rounded-full flex-shrink-0"></div>
//                   <div className="flex-1 min-w-0">
//                     <div className="h-4 bg-gray-200 rounded mb-2"></div>
//                     <div className="h-3 bg-gray-200 rounded w-2/3"></div>
//                   </div>
//                 </div>
//                 <div className="space-y-2">
//                   <div className="h-3 bg-gray-200 rounded"></div>
//                   <div className="h-3 bg-gray-200 rounded w-3/4"></div>
//                 </div>
//               </div>
//             ))
//           ) : paginatedData.length === 0 ? (
//             <div className="text-center py-16">
//               <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
//                 <Users className="w-12 h-12 text-gray-400" />
//               </div>
//               <h3 className="text-xl font-semibold text-gray-800 mb-2">No members found</h3>
//               <p className="text-gray-600">
//                 {state.search || state.filterStatus !== 'all' 
//                   ? "No members match your current filters" 
//                   : "No team members to display"}
//               </p>
//             </div>
//           ) : (
//             paginatedData.map((data, i) => (
//               <div className="bg-gradient-to-r from-white to-teal-50/50 rounded-2xl p-3 md:p-5 border border-teal-100 hover:border-teal-200 hover:shadow-lg transition-all duration-300 group">
//   {/* Header Section */}
//   <div className="flex items-start gap-3 mb-4">
//     <div className="w-10 h-10 md:w-14 md:h-14 rounded-full bg-gradient-to-br from-teal-500 to-teal-600 flex items-center justify-center text-white font-semibold text-xs md:text-sm group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
//       {getAvatarInitials(data.name)}
//     </div>
    
//     <div className="flex-1 min-w-0">
//       <h3 className="font-semibold text-gray-800 text-sm md:text-lg mb-1 break-words">
//         {data.name || "N/A"}
//       </h3>
//       <p className="text-teal-600 text-xs md:text-sm break-words">
//         {data.username || "N/A"}
//       </p>
//     </div>
    
//     <span className={`px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap ${
//       data.isActive
//         ? "bg-green-100 text-green-700 border border-green-200"
//         : "bg-red-100 text-red-700 border border-red-200"
//     }`}>
//       {data.isActive ? "Active" : "Inactive"}
//     </span>
//   </div>

//   {/* Content Section */}
//   <div className="space-y-3">
//     {/* Email */}
//     <div className="flex items-start gap-2">
//       <Mail className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" />
//       <span className="text-gray-600 text-xs md:text-sm break-all">
//         {data.email || "N/A"}
//       </span>
//     </div>
    
//     {/* Stats Row - Stack on mobile */}
//     <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4">
//       <div className="flex items-center gap-2">
//         <Award className="w-4 h-4 text-gray-400 flex-shrink-0" />
//         <span className="text-teal-700 font-medium text-xs md:text-sm">
//           {data.totalChainReferrals || 0} referrals
//         </span>
//       </div>
      
//       <div className="flex items-center gap-2">
//         <Calendar className="w-4 h-4 text-gray-400 flex-shrink-0" />
//         <span className="text-gray-600 text-xs">
//           {data.createdAt 
//             ? data.createdAt.slice(0, 10).split("-").reverse().join("-") 
//             : "N/A"}
//         </span>
//       </div>
//     </div>
//   </div>
// </div>
//             ))
//           )}
//         </div>

//         {/* Desktop Table - Better responsive behavior */}
//         <div className="hidden lg:block overflow-x-auto rounded-xl border border-gray-200">
//           <table className="w-full text-sm">
//             <thead>
//               <tr className="bg-gradient-to-r from-teal-600 to-teal-700 text-white text-left">
//                 <th className="text-left py-1 px-4 xl:px-4 font-semibold rounded-tl-xl">S.No</th>
//                 <th className="text-left py-1 px-4 xl:px-4 font-semibold">Name</th>
//                 <th className="text-left py-1 px-4 xl:px-4 font-semibold">Email</th>
//                 <th className="text-left py-1 px-4 xl:px-4 font-semibold">User Name</th>
//                 <th className="text-left py-1 px-4 xl:px-4 font-semibold">No of Referral</th>
//                 <th className="text-left py-1 px-4 xl:px-4 font-semibold">Join Date</th>
//                 <th className="text-left py-1 px-4 xl:px-4 font-semibold rounded-tr-xl">Status</th>
//               </tr>
//             </thead>
//             <tbody className="bg-white">
//               {isLoading ? (
//                 [...Array(state.perPage)].map((_, i) => (
//                   <tr key={i} className="border-b border-gray-100">
//                     <td className="py-4 px-4 xl:px-6">.......</td>
//                     <td className="py-4 px-4 xl:px-6">....... </td>
//                     <td className="py-4 px-4 xl:px-6">....... </td>
//                     <td className="py-4 px-4 xl:px-6">....... </td>
//                     <td className="py-4 px-4 xl:px-6">....... </td>
//                     <td className="py-4 px-4 xl:px-6">....... </td>
//                     <td className="py-4 px-4 xl:px-6">....... </td>
//                   </tr>
//                 ))
//               ) : paginatedData.length === 0 ? (
//                 <tr>
//                   <td colSpan="7" className="text-center py-16">
//                     <div className="flex flex-col items-center">
//                       <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
//                         <Users className="w-12 h-12 text-gray-400" />
//                       </div>
//                       <h3 className="text-xl font-semibold text-gray-800 mb-2">No members found</h3>
//                       <p className="text-gray-600">
//                         {state.search || state.filterStatus !== 'all' 
//                           ? "No members match your current filters" 
//                           : "No team members to display"}
//                       </p>
//                     </div>
//                   </td>
//                 </tr>
//               ) : (
//                 paginatedData.map((data, i) => (
//                   <tr
//                     key={i}
//                     className=" hover:bg-teal-50/50 transition-colors duration-200 group"
//                   >
//                     <td className="py-4 px-4 xl:px-6 text-gray-700 font-semibold">
//                       {startIndex + i + 1}
//                     </td>
//                     <td className="py-4 px-4 xl:px-6">
//                       <div className="flex items-center gap-3">
                        
//                         <div className="font-medium text-gray-800 truncate font-semibold">{data.name || "N/A"}</div>
//                       </div>
//                     </td>
//                     <td className="py-4 px-4 xl:px-6 text-gray-700">
//                       <div className="truncate max-w-xs font-semibold" title={data.email}>
//                         {data.email || "N/A"}
//                       </div>
//                     </td>
//                     <td className="py-4 px-4 xl:px-6 text-gray-700 font-semibold">{data.username || "N/A"}</td>
//                     <td className="py-4 px-4 xl:px-6 text-gray-700 font-semibold">{data.totalChainReferrals || 0}</td>
//                     <td className="py-4 px-4 xl:px-6 text-gray-700 font-semibold text-xs">
//                       {data.createdAt ? data.createdAt.slice(0, 10).split("-").reverse().join("-") : "N/A"}
//                     </td>
//                     <td className="py-4 px-4 xl:px-6">
//                       <span
//                         className={`px-3 py-1 rounded-full text-xs font-bold ${
//                           data.isActive
//                             ? "bg-green-100 text-green-700 border border-green-200"
//                             : "bg-red-100 text-red-700 border border-red-200"
//                         }`}
//                       >
//                         {data.isActive ? "Active" : "Inactive"}
//                       </span>
//                     </td>
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </table>
//         </div>

//         {/* Pagination - Only show if there are pages */}
//         {totalPages > 1 && (
//           <div className="flex justify-center sm:justify-end mt-6">
//             <Pagination
//               currentPage={state?.currentPage}
//               totalPages={totalPages}
//               onPageChange={handlePageChange}
//             />
//           </div>
//         )}
//       </div>

//       {/* Modals and Loaders */}
//       {showReferralModal && (
//         <ReferralModal
//           show={showReferralModal}
//           onHide={() => setShowReferralModal(false)}
//           userData={userData}
//         />
//       )}
//       {(isLoading || loading) && <Loader />}
//     </div>
//   );
// };

// export default MyTotalTeam;




import React, { useEffect, useState, useMemo, useCallback } from "react";
import { Select, MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Users, Search, Copy, TrendingUp, UserCheck, Calendar, Mail, Award, Filter, ChevronDown, Share2 } from 'lucide-react';
import Pagination from "../../../pagination/pagination";
import { useUserDetailsQuery } from "./myTotatTeamApliSlice";
import ReferralModal from "../../modals/referalModal";
import Loader from "../../../Loader/loader";

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

  // Query parameters for API call
  const queryParams = useMemo(() => {
    return `limit=${state.perPage}&page=${state.currentPage}&search=${encodeURIComponent(state.search)}&sortBy=${state.sortBy}&filterStatus=${state.filterStatus}`;
  }, [state.perPage, state.currentPage, state.search, state.sortBy, state.filterStatus]);
  
  const {
    data: userDetails,
    isLoading,
    isError,
    error,
    refetch,
  } = useUserDetailsQuery(queryParams);

  // Extract data from API response
  const tableData = userDetails?.data?.withdrawRequests || [];
  const totalUsers = userDetails?.data?.pagination?.total || 0;
  const totalChainUsers = userDetails?.data?.pagination?.chainTotal || 0;
  const totalPages = userDetails?.data?.pagination?.totalPages || 0;
  const currentPageFromAPI = userDetails?.data?.pagination?.currentPage || 1;

  // Calculate active users from current page data
  const activeUsers = useMemo(() => {
    return tableData.filter(user => user.isActive).length;
  }, [tableData]);

  // Handle page change with proper loading state
  const handlePageChange = useCallback((newPage) => {
    setLoading(true);
    setState(prev => ({ ...prev, currentPage: newPage }));
  }, []);

  // Handle search with debouncing
  const handleSearch = useCallback((e) => {
    const searchValue = e.target.value;
    setState(prev => ({ 
      ...prev, 
      search: searchValue, 
      currentPage: 1 
    }));
  }, []);

  // Handle filter changes
  const handleFilterChange = useCallback((filterType, value) => {
    setState(prev => ({ 
      ...prev, 
      [filterType]: value, 
      currentPage: 1 
    }));
  }, []);

  // Handle copy referral code
  const handleCopyReferralCode = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(userData?.data?.username || "");
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    } catch (err) {
      console.error('Failed to copy referral code');
    }
  }, [userData?.data?.username]);

  // Clear all filters
  const clearAllFilters = useCallback(() => {
    setState(prev => ({ 
      ...prev, 
      search: "", 
      filterStatus: "all",
      sortBy: "name",
      currentPage: 1 
    }));
  }, []);

  // Token verification effect
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

  // Error handling effect
  useEffect(() => {
    if (isTokenVerified && error?.data?.status_code === 400) {
      localStorage.clear();
      navigate("/login");
      toast.error(error?.data?.message, {
        position: "top-center",
      });
    }
  }, [isTokenVerified, error, navigate]);

  // Stop loading when data is received
  useEffect(() => {
    if (!isLoading) {
      setLoading(false);
    }
  }, [isLoading]);

  // Info boxes with dynamic data
  const infoBoxes = useMemo(() => [
    {
      title: "Total Active Members",
      value: totalUsers,
      description: `${activeUsers} active members on this page`,
      icon: <Users className="w-5 h-5 sm:w-6 sm:h-6" />,
      gradient: "from-teal-500 via-teal-600 to-teal-700",
      change: "+12%",
      trend: "up"
    },
    {
      title: "Foundation Network",
      value: totalChainUsers,
      description: "Total foundation network",
      icon: <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6" />,
      gradient: "from-teal-500 via-teal-600 to-teal-700",
      change: "+8%",
      trend: "up"
    },
    {
      title: "Referral Code",
      value: userData?.data?.username || "N/A",
      description: "Your unique referral code",
      icon: <Award className="w-5 h-5 sm:w-6 sm:h-6" />,
      gradient: "from-teal-500 via-teal-600 to-teal-700",
      isReferral: true
    }
  ], [totalUsers, totalChainUsers, activeUsers, userData?.data?.username]);

  // Generate avatar initials
  const getAvatarInitials = useCallback((name) => {
    if (!name) return "NA";
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  }, []);

  // Format date
  const formatDate = useCallback((dateString) => {
    if (!dateString) return "N/A";
    return dateString.slice(0, 10).split("-").reverse().join("-");
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-400 via-teal-500 to-teal-600 p-3 sm:p-4 lg:p-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
        {infoBoxes.map((box, idx) => (
          <div
            key={idx}
            className="group relative overflow-hidden rounded-2xl sm:rounded-3xl bg-white/90 backdrop-blur-sm p-4 sm:p-6 shadow-xl border border-white/20 hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 cursor-pointer"
          >
            {/* Background gradient */}
            <div className={`absolute inset-0 bg-gradient-to-br ${box.gradient} opacity-5 group-hover:opacity-10 transition-opacity duration-500`}></div>
            
            {/* Floating elements */}
            <div className="absolute -top-4 -right-4 w-16 sm:w-24 h-16 sm:h-24 rounded-full bg-gradient-to-br from-white/30 to-transparent blur-xl group-hover:scale-110 transition-transform duration-500"></div>
            
            <div className="relative z-10">
              {box.isReferral ? (
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                      <div className={`p-2 sm:p-3 rounded-xl bg-gradient-to-br ${box.gradient} text-white shadow-lg group-hover:shadow-xl transition-shadow duration-300`}>
                        {box.icon}
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="font-semibold text-gray-800 text-sm sm:text-base truncate">
                          {box.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-gray-600 truncate">
                          {box.description}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2 flex-shrink-0">
                      <button
                        onClick={handleCopyReferralCode}
                        className={`p-2 rounded-full bg-gradient-to-br ${box.gradient} text-white hover:shadow-lg transition-all duration-200 ${copiedCode ? 'scale-110' : ''}`}
                        title="Copy referral code"
                      >
                        <Copy className="w-3 h-3 sm:w-4 sm:h-4" />
                      </button>
                      <button
                        onClick={() => setShowReferralModal(true)}
                        className={`p-2 rounded-full bg-gradient-to-br ${box.gradient} text-white hover:shadow-lg transition-all duration-200`}
                        title="Share referral"
                      >
                        <Share2 className="w-3 h-3 sm:w-4 sm:h-4" />
                      </button>
                    </div>
                  </div>
                  <div className="bg-gradient-to-r from-teal-50 to-white rounded-xl p-3 sm:p-4 border border-teal-200">
                    <div className="flex items-center justify-between gap-2">
                      <code className="text-lg sm:text-xl font-bold text-teal-800 truncate flex-1">
                        {box.value}
                      </code>
                      <span className="text-xs text-teal-600 whitespace-nowrap">
                        {copiedCode ? '✓ Copied!' : 'Click to copy'}
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                      <div className={`p-2 sm:p-3 rounded-xl bg-gradient-to-br ${box.gradient} text-white shadow-lg group-hover:shadow-xl transition-shadow duration-300`}>
                        {box.icon}
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="font-semibold text-gray-800 text-sm sm:text-base truncate">
                          {box.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-gray-600 truncate">
                          {box.description}
                        </p>
                      </div>
                    </div>
                    {box.change && (
                      <div className="text-right flex-shrink-0">
                        <span className="text-green-600 text-sm font-bold">
                          {box.change}
                        </span>
                        <div className="text-xs text-gray-500 whitespace-nowrap">vs last month</div>
                      </div>
                    )}
                  </div>
                  <div className="text-2xl sm:text-3xl font-bold text-gray-800">
                    {typeof box.value === 'number' ? box.value.toLocaleString() : box.value}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Team Data Section */}
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-xl border border-white/20 p-4 sm:p-6 lg:p-8">
        {/* Header with Search and Filters */}
        <div className="flex flex-col gap-4 sm:gap-6 mb-6 sm:mb-8">
  {/* Force horizontal layout on 768px+ */}
  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 flex-wrap">
    <div className="flex-2">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-0">
        Total Team Details
      </h2>
    </div>

    {/* Desktop Search */}
    <div className="hidden sm:block">
      <div className="relative w-full max-w-md">
        <input
          type="text"
          placeholder="Search members..."
          value={state.search}
          className="w-full bg-gray-50/80 backdrop-blur-sm border border-gray-200 text-gray-800 rounded-xl py-3 pl-12 pr-4 placeholder-gray-500 focus:outline-none focus:border-teal-500 focus:bg-white/90 transition-all duration-200"
          onChange={handleSearch}
        />
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
      </div>
    </div>

    {/* Filter Toggle Button */}
    <button
      onClick={() => setShowFilters(!showFilters)}
      className="flex items-center justify-center gap-2 px-4 py-3 bg-teal-50 text-teal-700 rounded-xl hover:bg-teal-100 transition-colors duration-200 border border-teal-200"
    >
      <Filter className="w-4 h-4" />
      <span className="text-sm sm:text-base">Filters</span>
      <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${showFilters ? 'rotate-180' : ''}`} />
    </button>
  </div>
</div>


        {/* Filters Panel */}
        {showFilters && (
          <div className="mb-6 p-4 bg-gray-50/80 rounded-xl border border-gray-200">
            {/* Mobile Search Bar */}
            <div className="mb-4 sm:hidden">
              <label className="block text-sm font-medium text-gray-700 mb-2">Search Members</label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search by name, email, or username..."
                  value={state.search}
                  className="w-full bg-white border border-gray-300 rounded-lg py-3 pl-10 pr-4 text-sm focus:outline-none focus:border-teal-500"
                  onChange={handleSearch}
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Sort by</label>
                <select
                  value={state.sortBy}
                  onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                  className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-teal-500"
                >
                  <option value="name">Name (A-Z)</option>
                  <option value="referrals">Referrals (High to Low)</option>
                  <option value="date">Join Date (Newest)</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                <select
                  value={state.filterStatus}
                  onChange={(e) => handleFilterChange('filterStatus', e.target.value)}
                  className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-teal-500"
                >
                  <option value="all">All Members</option>
                  <option value="active">Active Only</option>
                  <option value="inactive">Inactive Only</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Per Page</label>
                <select
                  value={state.perPage}
                  onChange={(e) => handleFilterChange('perPage', parseInt(e.target.value))}
                  className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-teal-500"
                >
                  <option value={8}>8 per page</option>
                  <option value={10}>10 per page</option>
                  <option value={20}>20 per page</option>
                  <option value={50}>50 per page</option>
                </select>
              </div>
              
              <div className="flex items-end">
                <button
                  onClick={clearAllFilters}
                  className="w-full px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors duration-200 text-sm"
                >
                  Clear All
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Mobile & Tablet Cards */}
        <div className="grid gap-4 xl:hidden">
          {isLoading || loading ? (
            [...Array(5)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl p-4 md:p-5 border border-gray-200 animate-pulse">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 md:w-14 md:h-14 bg-gray-200 rounded-full flex-shrink-0"></div>
                  <div className="flex-1 min-w-0">
                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="h-3 bg-gray-200 rounded"></div>
                  <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                </div>
              </div>
            ))
          ) : tableData.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                <Users className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">No members found</h3>
              <p className="text-gray-600 text-center">
                {state.search || state.filterStatus !== 'all' 
                  ? "No members match your current filters. Try adjusting your search criteria." 
                  : "No team members to display at the moment."}
              </p>
            </div>
          ) : (
            tableData.map((data, i) => (
              <div key={i} className="bg-gradient-to-r from-white to-teal-50/50 rounded-2xl p-4 md:p-6 border border-teal-100 hover:border-teal-200 hover:shadow-lg transition-all duration-300 group">
                {/* Header Section */}
                <div className="flex items-start gap-3 md:gap-4 mb-4">
                  <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-teal-500 to-teal-600 flex items-center justify-center text-white font-semibold text-sm md:text-base group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                    {getAvatarInitials(data.name)}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-800 text-base md:text-lg mb-1 break-words">
                      {data.name || "N/A"}
                    </h3>
                    <p className="text-teal-600 text-sm md:text-base break-words">
                      {data.username || "N/A"}
                    </p>
                  </div>
                  
                  <span className={`px-2 py-1 md:px-3 md:py-1.5 rounded-full text-xs md:text-sm font-medium whitespace-nowrap ${
                    data.isActive
                      ? "bg-green-100 text-green-700 border border-green-200"
                      : "bg-red-100 text-red-700 border border-red-200"
                  }`}>
                    {data.isActive ? "Active" : "Inactive"}
                  </span>
                </div>

                {/* Content Section */}
                <div className="space-y-3 md:space-y-4">
                  {/* Email */}
                  <div className="flex items-start gap-2 md:gap-3">
                    <Mail className="w-4 h-4 md:w-5 md:h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600 text-sm md:text-base break-all">
                      {data.email || "N/A"}
                    </span>
                  </div>
                  
                  {/* Stats Row - Always stacked vertically */}
                  <div className="flex flex-col gap-2 md:gap-3">
                    <div className="flex items-center gap-2 md:gap-3">
                      <Award className="w-4 h-4 md:w-5 md:h-5 text-gray-400 flex-shrink-0" />
                      <span className="text-teal-700 font-medium text-sm md:text-base">
                        {data.totalChainReferrals || 0} referrals
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-2 md:gap-3">
                      <Calendar className="w-4 h-4 md:w-5 md:h-5 text-gray-400 flex-shrink-0" />
                      <span className="text-gray-600 text-xs md:text-sm">
                        {formatDate(data.createdAt)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Desktop Table */}
        <div className="hidden xl:block overflow-x-auto rounded-xl border border-gray-200">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gradient-to-r from-teal-600 to-teal-700 text-white">
                <th className="text-left py-4 px-6 font-semibold rounded-tl-xl">S.No</th>
                <th className="text-left py-4 px-6 font-semibold">Name</th>
                <th className="text-left py-4 px-6 font-semibold">Email</th>
                <th className="text-left py-4 px-6 font-semibold">Username</th>
                <th className="text-left py-4 px-6 font-semibold">Referrals</th>
                <th className="text-left py-4 px-6 font-semibold">Join Date</th>
                <th className="text-left py-4 px-6 font-semibold rounded-tr-xl">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {isLoading || loading ? (
                [...Array(state.perPage)].map((_, i) => (
                  <tr key={i} className="border-b border-gray-100 animate-pulse">
                    <td className="py-4 px-6"><div className="h-4 bg-gray-200 rounded"></div></td>
                    <td className="py-4 px-6"><div className="h-4 bg-gray-200 rounded"></div></td>
                    <td className="py-4 px-6"><div className="h-4 bg-gray-200 rounded"></div></td>
                    <td className="py-4 px-6"><div className="h-4 bg-gray-200 rounded"></div></td>
                    <td className="py-4 px-6"><div className="h-4 bg-gray-200 rounded"></div></td>
                    <td className="py-4 px-6"><div className="h-4 bg-gray-200 rounded"></div></td>
                    <td className="py-4 px-6"><div className="h-4 bg-gray-200 rounded"></div></td>
                  </tr>
                ))
              ) : tableData.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center py-16">
                    <div className="flex flex-col items-center">
                      <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                        <Users className="w-12 h-12 text-gray-400" />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-800 mb-2">No members found</h3>
                      <p className="text-gray-600">
                        {state.search || state.filterStatus !== 'all' 
                          ? "No members match your current filters. Try adjusting your search criteria." 
                          : "No team members to display at the moment."}
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                tableData.map((data, i) => (
                  <tr
                    key={i}
                    className="border-b border-gray-50 hover:bg-teal-50/50 transition-colors duration-200"
                  >
                    <td className="py-4 px-6 text-gray-700 font-semibold">
                      {((currentPageFromAPI - 1) * state.perPage) + i + 1}
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-500 to-teal-600 flex items-center justify-center text-white font-semibold text-sm">
                          {getAvatarInitials(data.name)}
                        </div>
                        <div className="font-medium text-gray-800 truncate">
                          {data.name || "N/A"}
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-gray-700">
                      <div className="truncate max-w-xs" title={data.email}>
                        {data.email || "N/A"}
                      </div>
                    </td>
                    <td className="py-4 px-6 text-gray-700 font-medium">
                      {data.username || "N/A"}
                    </td>
                    <td className="py-4 px-6 text-gray-700 font-semibold">
                      {data.totalChainReferrals || 0}
                    </td>
                    <td className="py-4 px-6 text-gray-700 text-sm">
                      {formatDate(data.createdAt)}
                    </td>
                    <td className="py-4 px-6">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          data.isActive
                            ? "bg-green-100 text-green-700 border border-green-200"
                            : "bg-red-100 text-red-700 border border-red-200"
                        }`}
                      >
                        {data.isActive ? "Active" : "Inactive"}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex flex-col sm:flex-row justify-between items-center mt-6 gap-4">
            <div className="text-sm text-gray-600 order-2 sm:order-1">
              Showing page {currentPageFromAPI} of {totalPages} ({totalUsers} total members)
            </div>
            <div className="order-1 sm:order-2">
              <Pagination
                currentPage={currentPageFromAPI}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          </div>
        )}
      </div>

      {/* Modals and Loaders */}
      {showReferralModal && (
        <ReferralModal
          show={showReferralModal}
          onHide={() => setShowReferralModal(false)}
          userData={userData}
          referralContent={referralContent}
        />
      )}
      {(isLoading || loading) && <Loader />}
    </div>
  );
};

export default MyTotalTeam;