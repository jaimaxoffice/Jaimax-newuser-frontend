// // BonusLogsModal.jsx
// import React, { useState, useEffect } from "react";
// import {
//   X,
//   Gift,
//   Calendar,
//   Coins,
//   FileText,
//   UserPlus,
//   Award,
//   Loader2,
//   ChevronLeft,
//   ChevronRight,
// } from "lucide-react";
// import { useGetBonusLogsQuery } from "../DashboardApliSlice";
// import Pagination from '../../../../../ReusableComponents/pagination/pagination'
// const BonusLogsModal = ({ isOpen, onClose, currencySymbol }) => {
//   const [activeTab, setActiveTab] = useState("registerationbonus");
//   const [currentPage, setCurrentPage] = useState(1);
//   const limit = 10;

//   // Fetch data with query params
//   const {
//     data: bonusLogsData,
//     isLoading,
//     isFetching,
//   } = useGetBonusLogsQuery(
//     {
//       page: currentPage,
//       limit: limit,
//       type: activeTab, // Pass activeTab directly (API slice handles 'all' case)
//     },
//     {
//       skip: !isOpen,
//       refetchOnMountOrArgChange: true,
//     }
//   );

//   const logs = bonusLogsData?.data?.logs || [];
//   const total = bonusLogsData?.data?.total || 0;
//   const totalPages = Math.ceil(total / limit);

//   // Define tabs
// const tabs = [
 
//   { id: "registrationbonus", label: "Registration Bonus", shortLabel: "Registration", icon: Award },
//   { id: "referralbonus", label: "Referral Bonus", shortLabel: "Referral", icon: UserPlus },
// ];

//   const formatDate = (dateString) => {
//     return new Date(dateString).toLocaleDateString("en-US", {
//       year: "numeric",
//       month: "short",
//       day: "numeric",
//       hour: "2-digit",
//       minute: "2-digit",
//     });
//   };

//   // Pagination handlers
//   const handlePrevious = () => {
//     if (currentPage > 1) {
//       setCurrentPage((prev) => prev - 1);
//     }
//   };

//   const handleNext = () => {
//     if (currentPage < totalPages) {
//       setCurrentPage((prev) => prev + 1);
//     }
//   };

//   const handlePageChange = (page) => {
//     if (page >= 1 && page <= totalPages) {
//       setCurrentPage(page);
//     }
//   };

//   // Generate page numbers
//   const getPageNumbers = () => {
//     const pages = [];
//     const maxVisiblePages = 5;

//     if (totalPages <= maxVisiblePages) {
//       for (let i = 1; i <= totalPages; i++) {
//         pages.push(i);
//       }
//     } else {
//       if (currentPage <= 3) {
//         for (let i = 1; i <= 4; i++) pages.push(i);
//         pages.push("...");
//         pages.push(totalPages);
//       } else if (currentPage >= totalPages - 2) {
//         pages.push(1);
//         pages.push("...");
//         for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
//       } else {
//         pages.push(1);
//         pages.push("...");
//         for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
//         pages.push("...");
//         pages.push(totalPages);
//       }
//     }

//     return pages;
//   };

//   // Handle tab change - Reset to page 1
//   const handleTabChange = (tabId) => {
//     if (tabId !== activeTab) {
//       setActiveTab(tabId);
//       setCurrentPage(1);
//     }
//   };

//   if (!isOpen) return null;

//   return (
//     <>
//       {/* Backdrop */}
//       <div
//         className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
//         onClick={onClose}
//       />

//       {/* Modal */}
//       <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4">
//         <div
//           className="bg-white rounded-xl sm:rounded-2xl shadow-2xl w-full max-w-4xl max-h-[95vh] sm:max-h-[90vh] overflow-hidden flex flex-col"
//           onClick={(e) => e.stopPropagation()}
//         >
//           {/* Header */}
//           <div className="flex items-center justify-between p-3 sm:p-5 border-b bg-teal-500">
//             <div className="flex items-center gap-2 sm:gap-3">
//               <div className="p-1.5 sm:p-2 bg-white/20 rounded-full">
//                 <Gift className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
//               </div>
//               <div>
//                 <h2 className="text-base sm:text-xl font-bold text-white">
//                   Bonus Logs
//                 </h2>
//                 <p className="text-[10px] sm:text-xs text-teal-100">
//                   View your bonus history
//                 </p>
//               </div>
//             </div>
//             <button
//               onClick={onClose}
//               className="p-1.5 sm:p-2 hover:bg-white/20 rounded-full transition-colors"
//             >
//               <X className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
//             </button>
//           </div>

//           {/* Tabs */}
//           <div className="bg-teal-50 border-b border-teal-100 p-2 sm:p-3">
//             <div className="flex gap-1.5 sm:gap-2 overflow-x-auto pb-1 scrollbar-hide">
//               {tabs.map((tab) => {
//                 const Icon = tab.icon;
//                 const isActive = activeTab === tab.id;
//                 return (
//                   <button
//                     key={tab.id}
//                     onClick={() => handleTabChange(tab.id)}
//                     disabled={isFetching}
//                     className={`flex-shrink-0 flex items-center gap-1.5 sm:gap-2 
//                       px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg sm:rounded-xl font-medium text-xs sm:text-sm 
//                       transition-all duration-200 whitespace-nowrap disabled:opacity-50
//                       ${
//                         isActive
//                           ? "bg-teal-500 text-white shadow-md"
//                           : "bg-white text-teal-700 hover:bg-teal-100 border border-teal-200"
//                       }`}
//                   >
//                     <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
//                     <span className="sm:hidden">{tab.shortLabel}</span>
//                     <span className="hidden sm:inline">{tab.label}</span>
//                   </button>
//                 );
//               })}
//             </div>
//           </div>

//           {/* Content */}
//           <div className="flex-1 overflow-y-auto p-3 sm:p-5 bg-gray-50 min-h-[200px]">
//             {isLoading ? (
//               <div className="flex flex-col items-center justify-center py-12">
//                 <Loader2 className="w-8 h-8 text-teal-500 animate-spin mb-3" />
//                 <p className="text-gray-500 text-sm">Loading bonus logs...</p>
//               </div>
//             ) : logs.length === 0 ? (
//               <div className="text-center py-8 sm:py-12">
//                 <div className="w-12 h-12 sm:w-16 sm:h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
//                   <Gift className="w-6 h-6 sm:w-8 sm:h-8 text-teal-400" />
//                 </div>
//                 <p className="text-gray-600 text-sm sm:text-lg font-medium">
//                   No bonus logs found
//                 </p>
//                 <p className="text-gray-400 text-xs sm:text-sm mt-1">
//                   {activeTab !== "registrationbonus"
//                     ? `No ${activeTab} records found. Try selecting a different tab.`
//                     : "Check back later for bonus updates"}
//                 </p>
//               </div>
//             ) : (
//               <>
//                 {/* Desktop Table View */}
//                 <div className="hidden lg:block overflow-x-auto bg-white rounded-xl border border-gray-200">
//                   <table className="w-full">
//                     <thead>
//                       <tr className="bg-teal-50 border-b border-teal-100">
//                         <th className="px-4 py-3 text-left text-xs font-semibold text-teal-700 uppercase tracking-wider">
//                           Type
//                         </th>
//                         <th className="px-4 py-3 text-left text-xs font-semibold text-teal-700 uppercase tracking-wider">
//                           Tokens
//                         </th>
//                         <th className="px-4 py-3 text-left text-xs font-semibold text-teal-700 uppercase tracking-wider">
//                           From/To
//                         </th>
//                         <th className="px-4 py-3 text-left text-xs font-semibold text-teal-700 uppercase tracking-wider">
//                           Description
//                         </th>
//                         <th className="px-4 py-3 text-left text-xs font-semibold text-teal-700 uppercase tracking-wider">
//                           Date
//                         </th>
//                       </tr>
//                     </thead>
//                     <tbody className="divide-y divide-gray-100">
//                       {logs.map((log) => (
//                         <tr
//                           key={log._id}
//                           className="hover:bg-teal-50/50 transition-colors"
//                         >
//                           <td className="px-4 py-4">
//                             <span
//                               className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full capitalize
//                               ${
//                                 log.type === "registration bonus"
//                                   ? "bg-teal-100 text-teal-700"
//                                   : "bg-blue-100 text-blue-700"
//                               }`}
//                             >
//                               {log.type}
//                             </span>
//                           </td>
//                           <td className="px-4 py-4">
//                             <div className="flex items-center gap-2">
//                               <Coins className="w-4 h-4 text-teal-500" />
//                               <span className="font-bold text-gray-800">
//                                 {log.tokens}
//                               </span>
//                             </div>
//                           </td>
//                           <td className="px-4 py-4">
//                             <span className="text-gray-600 text-sm font-mono">
//                               {log.bonusFrom || log.refreredUser
//                                 ? `${(log.bonusFrom || log.refreredUser).slice(
//                                     0,
//                                     15
//                                   )}...`
//                                 : "-"}
//                             </span>
//                           </td>
//                           <td className="px-4 py-4">
//                             <span className="text-gray-600 text-sm line-clamp-2">
//                               {log.description}
//                             </span>
//                           </td>
//                           <td className="px-4 py-4">
//                             <div className="flex items-center gap-2 text-gray-500 text-sm whitespace-nowrap">
//                               <Calendar className="w-4 h-4 text-teal-400" />
//                               {formatDate(log.createdAt)}
//                             </div>
//                           </td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>

//                 {/* Mobile & Tablet Card View */}
//                 <div className="lg:hidden space-y-2 sm:space-y-3">
//                   {logs.map((log) => (
//                     <div
//                       key={log._id}
//                       className="bg-white rounded-lg sm:rounded-xl p-3 sm:p-4 border border-gray-200 hover:border-teal-300 hover:shadow-sm transition-all"
//                     >
//                       {/* Card Header */}
//                       <div className="flex justify-end items-start mb-2 sm:mb-3">
//                         <div className="flex items-center gap-1 bg-teal-50 px-2 py-1 rounded-lg border border-teal-200">
//                           <Coins className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-teal-500" />
//                           <span className="text-sm sm:text-lg font-bold text-teal-600">
//                             {log.tokens}
//                           </span>
//                         </div>
//                       </div>

//                       {/* Description */}
//                       <div className="flex items-start gap-2 mb-2 sm:mb-3">
//                         <FileText className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-teal-400 mt-0.5 flex-shrink-0" />
//                         <p className="text-gray-600 text-xs sm:text-sm line-clamp-2">
//                           {log.description}
//                         </p>
//                       </div>

//                       {/* Bonus From / Referred User */}
//                       {(log.bonusFrom || log.refreredUser) && (
//                         <div className="mb-2 sm:mb-3 p-2 bg-teal-50 rounded-lg border border-teal-100">
//                           <p className="text-[10px] sm:text-xs text-teal-600 font-medium">
//                             {log.bonusFrom ? "Bonus From:" : "Referred User:"}
//                           </p>
//                           <p className="text-[10px] sm:text-xs text-teal-800 font-mono truncate">
//                             {log.bonusFrom || log.refreredUser}
//                           </p>
//                         </div>
//                       )}

//                       {/* Date */}
//                       <div className="flex items-center gap-1.5 sm:gap-2 text-gray-400 text-[10px] sm:text-xs pt-2 border-t border-gray-100">
//                         <Calendar className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-teal-400" />
//                         {formatDate(log.createdAt)}
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </>
//             )}
//           </div>

//           {/* Pagination */}
//           {!isLoading && totalPages > 1 && (
//             <div className="px-3 sm:px-5 py-3 sm:py-4 border-t bg-white">
//               <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
//                 {/* Page Info */}
//                 <p className="text-xs sm:text-sm text-gray-500 order-2 sm:order-1">
//                   Page{" "}
//                   <span className="font-semibold text-teal-600">
//                     {currentPage}
//                   </span>{" "}
//                   of{" "}
//                   <span className="font-semibold text-teal-600">
//                     {totalPages}
//                   </span>
//                 </p>

//                 {/* Pagination Controls */}
//                 <div className="flex items-center gap-1 sm:gap-2 order-1 sm:order-2">
//                   {/* Previous Button */}
//                   <button
//                     onClick={handlePrevious}
//                     disabled={currentPage === 1 || isFetching}
//                     className={`flex items-center gap-1 px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-all
//                       ${
//                         currentPage === 1 || isFetching
//                           ? "bg-gray-100 text-gray-400 cursor-not-allowed"
//                           : "bg-teal-50 text-teal-600 hover:bg-teal-100 border border-teal-200"
//                       }`}
//                   >
//                     <ChevronLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
//                     <span className="hidden sm:inline">Previous</span>
//                   </button>

//                   {/* Page Numbers */}
//                   <div className="flex items-center gap-1">
//                     {getPageNumbers().map((page, index) => (
//                       <React.Fragment key={index}>
//                         {page === "..." ? (
//                           <span className="px-2 py-1 text-gray-400 text-xs sm:text-sm">
//                             ...
//                           </span>
//                         ) : (
//                           <button
//                             onClick={() => handlePageChange(page)}
//                             disabled={isFetching}
//                             className={`min-w-[28px] sm:min-w-[36px] h-7 sm:h-9 flex items-center justify-center rounded-lg text-xs sm:text-sm font-medium transition-all
//                               ${
//                                 currentPage === page
//                                   ? "bg-teal-500 text-white shadow-md"
//                                   : "bg-white text-teal-600 hover:bg-teal-50 border border-teal-200"
//                               } ${
//                               isFetching ? "opacity-50 cursor-not-allowed" : ""
//                             }`}
//                           >
//                             {page}
//                           </button>
//                         )}
//                       </React.Fragment>
//                     ))}
//                   </div>

//                   {/* Next Button */}
//                   <button
//                     onClick={handleNext}
//                     disabled={currentPage === totalPages || isFetching}
//                     className={`flex items-center gap-1 px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-all
//                       ${
//                         currentPage === totalPages || isFetching
//                           ? "bg-gray-100 text-gray-400 cursor-not-allowed"
//                           : "bg-teal-50 text-teal-600 hover:bg-teal-100 border border-teal-200"
//                       }`}
//                   >
//                     <span className="hidden sm:inline">Next</span>
//                     <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
//                   </button>
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* Footer */}
//           <div className="p-3 sm:p-4 border-t bg-gray-50 flex justify-end">
//             <button
//               onClick={onClose}
//               className="px-4 sm:px-6 py-2 sm:py-2.5 bg-teal-500 text-white rounded-lg hover:bg-teal-600 
//                       transition-colors font-medium text-xs sm:text-sm shadow-sm"
//             >
//               Close
//             </button>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default BonusLogsModal;
// BonusLogsModal.jsx
import React, { useState } from "react";
import {
  X,
  Gift,
  Calendar,
  Coins,
  FileText,
  UserPlus,
  Award,
  Loader2,
} from "lucide-react";
import { useGetBonusLogsQuery } from "../DashboardApliSlice";
import Pagination from "../../../../../ReusableComponents/pagination/pagination";

const BonusLogsModal = ({ isOpen, onClose, currencySymbol }) => {
  const [activeTab, setActiveTab] = useState("registrationbonus");
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 10;

  // Fetch data with query params
  const {
    data: bonusLogsData,
    isLoading,
    isFetching,
  } = useGetBonusLogsQuery(
    {
      page: currentPage,
      limit: limit,
      type: activeTab,
    },
    {
      skip: !isOpen,
      refetchOnMountOrArgChange: true,
    }
  );

  const logs = bonusLogsData?.data?.logs || [];
  const total = bonusLogsData?.data?.total || 0;
  const totalPages = Math.ceil(total / limit);

  // Define tabs
  const tabs = [
    {
      id: "registrationbonus",
      label: "KYC Bonus",
      shortLabel: "Registration",
      icon: Award,
    },
    {
      id: "referralbonus",
      label: "KYC Referral Bonus",
      shortLabel: "Referral",
      icon: UserPlus,
    },
  ];

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Handle page change from Pagination component
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Handle tab change - Reset to page 1
  const handleTabChange = (tabId) => {
    if (tabId !== activeTab) {
      setActiveTab(tabId);
      setCurrentPage(1);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4">
        <div
          className="bg-white rounded-xl sm:rounded-2xl shadow-2xl w-full max-w-4xl max-h-[95vh] sm:max-h-[90vh] overflow-hidden flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-3 sm:p-5 border-b bg-teal-500">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="p-1.5 sm:p-2 bg-white/20 rounded-full">
                <Gift className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
              <div>
                <h2 className="text-base sm:text-xl font-bold text-white">
                 KYC Bonus Logs
                </h2>
                <p className="text-[10px] sm:text-xs text-teal-100">
                  View your KYC bonus history
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 sm:p-2 hover:bg-white/20 rounded-full transition-colors"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </button>
          </div>

          {/* Tabs */}
          <div className="bg-teal-50 border-b border-teal-100 p-2 sm:p-3">
            <div className="flex gap-1.5 sm:gap-2 overflow-x-auto pb-1 scrollbar-hide">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => handleTabChange(tab.id)}
                    disabled={isFetching}
                    className={`flex-shrink-0 flex items-center gap-1.5 sm:gap-2 
                      px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg sm:rounded-xl font-medium text-xs sm:text-sm 
                      transition-all duration-200 whitespace-nowrap disabled:opacity-50
                      ${
                        isActive
                          ? "bg-teal-500 text-white shadow-md"
                          : "bg-white text-teal-700 hover:bg-teal-100 border border-teal-200"
                      }`}
                  >
                    <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
                    <span className="sm:hidden">{tab.shortLabel}</span>
                    <span className="hidden sm:inline">{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-3 sm:p-5 bg-gray-50 min-h-[200px]">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-12">
                <Loader2 className="w-8 h-8 text-teal-500 animate-spin mb-3" />
                <p className="text-gray-500 text-sm">Loading bonus logs...</p>
              </div>
            ) : logs.length === 0 ? (
              <div className="text-center py-8 sm:py-12">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <Gift className="w-6 h-6 sm:w-8 sm:h-8 text-teal-400" />
                </div>
                <p className="text-gray-600 text-sm sm:text-lg font-medium">
                  No bonus logs found
                </p>
                <p className="text-gray-400 text-xs sm:text-sm mt-1">
                  {activeTab !== "registrationbonus"
                    ? `No ${activeTab} records found. Try selecting a different tab.`
                    : "Check back later for bonus updates"}
                </p>
              </div>
            ) : (
              <>
                {/* Desktop Table View */}
                <div className="hidden lg:block overflow-x-auto bg-white rounded-xl border border-gray-200">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-teal-50 border-b border-teal-100">
                       
                        <th className="px-4 py-3 text-left text-xs font-semibold text-teal-700 uppercase tracking-wider">
                          S.No
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-teal-700 uppercase tracking-wider">
                          Tokens
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-teal-700 uppercase tracking-wider">
                          From/To
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-teal-700 uppercase tracking-wider">
                          Description
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-teal-700 uppercase tracking-wider">
                          Date
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {logs.map((log,index) => (
                        <tr
                          key={log._id }
                          className="hover:bg-teal-50/50 transition-colors"
                        >
                         
                          <td className="px-4 py-4">
                            <div className="flex items-center gap-2">
                              <span className="font- text-black text-xs">
                              {(currentPage - 1) * limit + index + 1}
                              </span>
                            </div>
                          </td>
                          <td className="px-4 py-4">
                            <div className="flex items-center gap-2">
                              {/* <Coins className="w-4 h-4 text-teal-500" /> */}
                              <span className="font-bold text-gray-600 text-sm">
                                {log.tokens}
                              </span>
                            </div>
                          </td>
                          <td className="px-4 py-4">
                            <span className="text-gray-600 text-sm font-mono">
                              {log.bonusFrom || log.refreredUser
                                ? `${(log.bonusFrom || log.refreredUser)}`
                                : "-"}
                            </span>
                          </td>
                          <td className="px-4 py-4">
                            <span className="text-gray-600 text-xs line-clamp-2">
                              {log.description}
                            </span>
                          </td>
                          <td className="px-4 py-4">
                            <div className="flex items-center gap-2 text-gray-500 text-sm whitespace-nowrap">
                              {/* <Calendar className="w-4 h-4 text-teal-400" /> */}
                              {formatDate(log.createdAt)}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Mobile & Tablet Card View */}
                <div className="lg:hidden space-y-2 sm:space-y-3">
                  {logs.map((log) => (
                    <div
                      key={log._id}
                      className="bg-white rounded-lg sm:rounded-xl p-3 sm:p-4 border border-gray-200 hover:border-teal-300 hover:shadow-sm transition-all"
                    >
                      {/* Card Header */}
                      <div className="flex justify-end items-start mb-2 sm:mb-3">
                        <div className="flex items-center gap-1 bg-teal-50 px-2 py-1 rounded-lg border border-teal-200">
                          <Coins className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-teal-500" />
                          <span className="text-sm sm:text-lg font-bold text-teal-600">
                            {log.tokens}
                          </span>
                        </div>
                      </div>

                      {/* Description */}
                      <div className="flex items-start gap-2 mb-2 sm:mb-3">
                        <FileText className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-teal-400 mt-0.5 flex-shrink-0" />
                        <p className="text-gray-600 text-xs sm:text-sm line-clamp-2">
                          {log.description}
                        </p>
                      </div>

                      {/* Bonus From / Referred User */}
                      {(log.bonusFrom || log.refreredUser) && (
                        <div className="mb-2 sm:mb-3 p-2 bg-teal-50 rounded-lg border border-teal-100">
                          <p className="text-[10px] sm:text-xs text-teal-600 font-medium">
                            {log.bonusFrom ? "Bonus From:" : "Referred User:"}
                          </p>
                          <p className="text-[10px] sm:text-xs text-teal-800 font-mono truncate">
                            {log.bonusFrom || log.refreredUser}
                          </p>
                        </div>
                      )}

                      {/* Date */}
                      <div className="flex items-center gap-1.5 sm:gap-2 text-gray-400 text-[10px] sm:text-xs pt-2 border-t border-gray-100">
                        <Calendar className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-teal-400" />
                        {formatDate(log.createdAt)}
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Pagination - Using Reusable Component */}
          {!isLoading && logs.length > 0 && totalPages > 1 && (
            <div className="px-3 sm:px-5 py-3 sm:py-4 border-t bg-white">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
                isLoading={isFetching}
                showPageInfo={true}
                className="justify-center sm:justify-between"
              />
            </div>
          )}

          {/* Footer */}
          <div className="p-3 sm:p-4 border-t bg-gray-50 flex justify-end">
            <button
              onClick={onClose}
              className="px-4 sm:px-6 py-2 sm:py-2.5 bg-teal-500 text-white rounded-lg hover:bg-teal-600 
                      transition-colors font-medium text-xs sm:text-sm shadow-sm"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default BonusLogsModal;