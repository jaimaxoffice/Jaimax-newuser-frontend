// import React, { useState, useEffect } from "react";
// import { Search, X, ChevronDown, Paperclip, Upload } from "lucide-react";
// import { useCategoryGetQuery, useCreateTicketMutation, useSupportDataQuery } from "./supportApi";
// import { toast } from "react-toastify";
// import SupportModal from "./supportModal/supportModal"
// import Loader from "../../../Loader/loader"

// const Support = () => {
//   const [show, setShow] = useState(false);
//   const [deleteModal, setDeleteModal] = useState(false);
//   const handleShow = () => setShow(true);
//   const handleDelete = () => setDeleteModal(true);
  
//   const [attachedFiles, setAttachedFiles] = useState([]);
//   const [state, setState] = useState({
//     currentPage: 1,
//     perPage: 10,
//     search: "",
//   });

//   const queryParams = `limit=${state?.perPage || ""}&page=${
//     state?.currentPage || ""
//   }&searchParam=${state?.search || ""}`;

//   const {
//     data: supportData,
//     error,
//     isLoading,
//   } = useSupportDataQuery(queryParams);
  
//   const TableData = supportData?.data?.response || [];
//   const [loading, setLoading] = useState(false);

//   const handleFileUpload = (e) => {
//     const files = Array.from(e.target.files);
//     setAttachedFiles(prev => [...prev, ...files]);
//   };

//   const removeFile = (index) => {
//     setAttachedFiles(prev => prev.filter((_, i) => i !== index));
//   };

//   const handlePageChange = (page) => {
//     setLoading(true);
//     setState((prev) => ({ ...prev, currentPage: page }));
//   };

//   const handlePrevPage = () => {
//     if (state.currentPage > 1) handlePageChange(state.currentPage - 1);
//   };

//   const handleNextPage = () => {
//     const totalPages = Math.ceil(supportData?.data?.totalCount / state.perPage);
//     if (state.currentPage < totalPages) handlePageChange(state.currentPage + 1);
//   };

//   useEffect(() => {
//     setLoading(false);
//   }, [supportData?.data?.response]);

//   const transformedData = TableData.map((data, index) => ({
//     id: data._id,
//     ticketId: state.currentPage * state.perPage - (state.perPage - 1) + index,
//     subject: data.title,
//     type: data?.category_id?.category_name || "N/A",
//     status: data.status === "open" ? "Open" : data.status === "inprogress" ? "In Progress" : "Closed",
//     priority: "Medium",
//     assignedTo: "Admin",
//     createdOn: data.created_at.split("T")[0],
//     updatedOn: data.created_at.split("T")[0],
//     originalData: data
//   }));

//   const totalPages = supportData 
//     ? Math.ceil(supportData?.data?.totalCount / state.perPage)
//     : 1;

//   const getStatusStyles = (status) => {
//     switch (status) {
//       case "open":
//         return "bg-green-500/20 text-green-400 border border-green-500/30";
//       case "close":
//         return "bg-red-500/20 text-red-400 border border-red-500/30";
//       default:
//         return "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30";
//     }
//   };

//   return (
//     <div className="p-4 md:p-6  bg-[#1d8e85] w-full mx-auto">
//       {/* Header */}
//       <div className="flex flex-col  md:flex-row justify-between items-start md:items-center mb-6 gap-4">
//         <h2 className="text-2xl md:text-3xl font-semibold text-white">Support Tickets</h2>
        
//         <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full md:w-auto">
//           <button 
//             onClick={handleShow}
//             className="bg-[#c5d82e] hover:from-blue-600 hover:to-green-700 text-white px-6 py-2.5 rounded-lg font-medium transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-lg hover:shadow-blue-500/25"
//           >
//             Create New
//           </button>
          
//           <div className="relative flex items-center bg-white/10 border border-white/20 rounded-lg px-3 py-2.5 min-w-[250px] backdrop-blur-sm">
//             <input
//               type="text"
//               placeholder="Search Ticket ID or Status"
//               value={state.search}
//               onChange={(e) => setState({ ...state, search: e.target.value })}
//               className="bg-transparent text-white placeholder-white/70 focus:outline-none flex-grow text-sm"
//             />
//             <Search className="text-white/70 ml-2" size={18} />
//           </div>
//         </div>
//       </div>

//       {/* Content */}
//       {isLoading || loading ? (
//         <div className="text-center py-16 text-gray-400 text-lg">Loading...</div>
//       ) : transformedData.length > 0 ? (
//         <>
//           {/* Cards Container */}
//           <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
//             {transformedData.map((item, idx) => (
//               <div key={idx} className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 border border-white/10 rounded-xl p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/20 hover:border-blue-500/30 relative overflow-hidden group">
//                 {/* Top accent border */}
//                 <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-600"></div>
                
//                 {/* Card Header */}
//                 <div className="flex flex-col sm:flex-row justify-between items-start gap-3 mb-4">
//                   <div className="flex-1">
//                     <h3 className="text-xl font-semibold text-white mb-1">#{item.ticketId}</h3>
//                     <p className="text-gray-300 text-sm leading-relaxed line-clamp-2">{item.subject}</p>
//                   </div>
//                   <div className={`px-3 py-1.5 rounded-full text-xs font-medium uppercase tracking-wide whitespace-nowrap ${getStatusStyles(item.originalData.status)}`}>
//                     {item.status}
//                   </div>
//                 </div>
                
//                 {/* Card Body */}
//                 <div className="space-y-3 mb-4">
//                   <div className="flex flex-col sm:flex-row justify-between gap-3">
//                     <div className="flex-1">
//                       <span className="text-xs text-gray-400 uppercase tracking-wide font-medium block mb-1">Type</span>
//                       <span className="text-white text-sm font-medium">{item.type}</span>
//                     </div>
//                     <div className="flex-1">
//                       <span className="text-xs text-gray-400 uppercase tracking-wide font-medium block mb-1">Priority</span>
//                       <span className="text-white text-sm font-medium">{item.priority}</span>
//                     </div>
//                   </div>
                  
//                   <div className="flex flex-col sm:flex-row justify-between gap-3">
//                     <div className="flex-1">
//                       <span className="text-xs text-gray-400 uppercase tracking-wide font-medium block mb-1">Assigned To</span>
//                       <span className="text-white text-sm font-medium">{item.assignedTo}</span>
//                     </div>
//                     <div className="flex-1">
//                       <span className="text-xs text-gray-400 uppercase tracking-wide font-medium block mb-1">Created</span>
//                       <span className="text-white text-sm font-medium">{item.createdOn}</span>
//                     </div>
//                   </div>
                  
//                   <div className="flex flex-col sm:flex-row justify-between gap-3">
//                     <div className="flex-1">
//                       <span className="text-xs text-gray-400 uppercase tracking-wide font-medium block mb-1">Updated</span>
//                       <span className="text-white text-sm font-medium">{item.updatedOn}</span>
//                     </div>
//                   </div>
//                 </div>
                
//                 {/* Card Actions */}
//                 <div className="flex justify-end pt-4 border-t border-white/10">
//                   <a
//                     href={`/support/support-chat/${item.id}`}
//                     className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-lg hover:shadow-green-500/25 flex items-center gap-2"
//                   >
//                     <span>👁️</span>
//                     View Details
//                   </a>
//                 </div>
//               </div>
//             ))}
//           </div>
          
//           {/* Pagination */}
//           <div className="flex flex-col md:flex-row justify-between items-center gap-4 mt-8">
//             <div className="flex items-center gap-2">
//               <span className="text-gray-400 text-sm">Show:</span>
//               <select
//                 className="bg-gray-800 border border-gray-600 text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500 transition-colors"
//                 value={state?.perPage}
//                 onChange={(e) => {
//                   const newPerPage = e.target.value;
//                   setState({
//                     ...state,
//                     perPage: newPerPage,
//                     currentPage: 1,
//                   });
//                 }}
//               >
//                 <option value="10">10</option>
//                 <option value="30">30</option>
//                 <option value="50">50</option>
//               </select>
//               <span className="text-gray-400 text-sm">entries</span>
//             </div>

//             <div className="flex items-center gap-3">
//               <button 
//                 onClick={handlePrevPage} 
//                 disabled={state.currentPage === 1} 
//                 className="bg-white/10 hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 border border-white/20 hover:border-white/30"
//               >
//                 Previous
//               </button>
              
//               <span className="text-gray-300 text-sm font-medium px-3">
//                 Page {state.currentPage} of {totalPages}
//               </span>
              
//               <button 
//                 onClick={handleNextPage} 
//                 disabled={state.currentPage === totalPages} 
//                 className="bg-white/10 hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 border border-white/20 hover:border-white/30"
//               >
//                 Next
//               </button>
//             </div>
//           </div>
//         </>
//       ) : (
//         <div className="text-center py-16 text-gray-400 text-lg">No support tickets found</div>
//       )}

//       <SupportModal {...{ show, setShow, deleteModal, setDeleteModal }} />
//       {(isLoading || loading) && <Loader />}
//     </div>
//   );
// };

// export default Support;




// import React, { useState, useEffect } from "react";
// import { Search, X, ChevronDown, Paperclip, Upload } from "lucide-react";
// import { useCategoryGetQuery, useCreateTicketMutation, useSupportDataQuery } from "./supportApi";
// import { toast } from "react-toastify";
// import SupportModal from "./supportModal/supportModal"
// import Loader from "../../../Loader/loader"

// const Support = () => {
//   const [show, setShow] = useState(false);
//   const [deleteModal, setDeleteModal] = useState(false);
//   const handleShow = () => setShow(true);
//   const handleDelete = () => setDeleteModal(true);
//   
//   const [attachedFiles, setAttachedFiles] = useState([]);
//   const [state, setState] = useState({
//     currentPage: 1,
//     perPage: 10,
//     search: "",
//   });

//   const queryParams = `limit=${state?.perPage || ""}&page=${
//     state?.currentPage || ""
//   }&searchParam=${state?.search || ""}`;

//   const {
//     data: supportData,
//     error,
//     isLoading,
//   } = useSupportDataQuery(queryParams);
//   
//   const TableData = supportData?.data?.response || [];
//   const [loading, setLoading] = useState(false);

//   const handleFileUpload = (e) => {
//     const files = Array.from(e.target.files);
//     setAttachedFiles(prev => [...prev, ...files]);
//   };

//   const removeFile = (index) => {
//     setAttachedFiles(prev => prev.filter((_, i) => i !== index));
//   };

//   const handlePageChange = (page) => {
//     setLoading(true);
//     setState((prev) => ({ ...prev, currentPage: page }));
//   };

//   const handlePrevPage = () => {
//     if (state.currentPage > 1) handlePageChange(state.currentPage - 1);
//   };

//   const handleNextPage = () => {
//     const totalPages = Math.ceil(supportData?.data?.totalCount / state.perPage);
//     if (state.currentPage < totalPages) handlePageChange(state.currentPage + 1);
//   };

//   useEffect(() => {
//     setLoading(false);
//   }, [supportData?.data?.response]);

//   const transformedData = TableData.map((data, index) => ({
//     id: data._id,
//     ticketId: state.currentPage * state.perPage - (state.perPage - 1) + index,
//     subject: data.title,
//     type: data?.category_id?.category_name || "N/A",
//     status: data.status === "open" ? "Open" : data.status === "inprogress" ? "In Progress" : "Closed",
//     priority: "Medium",
//     assignedTo: "Admin",
//     createdOn: data.created_at.split("T")[0],
//     updatedOn: data.created_at.split("T")[0],
//     originalData: data
//   }));

//   const totalPages = supportData 
//     ? Math.ceil(supportData?.data?.totalCount / state.perPage)
//     : 1;

//   const getStatusStyles = (status) => {
//     switch (status) {
//       case "open":
//         return "bg-green-500/20 text-green-300 border border-green-500/30"; // Teal for open
//       case "close":
//         return "bg-red-500/20 text-red-300 border border-red-500/30"; // Red for closed
//       default:
//         return "bg-yellow-500/20 text-yellow-300 border border-yellow-500/30"; // Yellow for in-progress
//     }
//   };

//   return (
//     <div className="p-4 md:p-6 bg-[#1d8d84] min-h-screen text-white w-full mx-auto font-sans">
//       {/* Header - Always Visible */}
//       <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
//         <h2 className="text-3xl md:text-4xl font-extrabold text-white drop-shadow-md">Support Tickets</h2>
//         
//         <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full md:w-auto">
//           <button 
//             onClick={handleShow}
//             className="bg-gradient-to-r from-teal-500 to-teal-700 hover:from-teal-600 hover:to-teal-800 text-white px-6 py-2.5 rounded-xl font-semibold shadow-lg shadow-teal-500/30 transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 active:scale-95"
//           >
//             Create New Ticket
//           </button>
//           
//           <div className="relative flex items-center bg-white/15 border border-white/20 rounded-xl px-4 py-2.5 min-w-[280px] backdrop-blur-sm shadow-inner shadow-white/10">
//             <input
//               type="text"
//               placeholder="Search Ticket ID or Status..."
//               value={state.search}
//               onChange={(e) => setState({ ...state, search: e.target.value })}
//               className="bg-transparent text-white placeholder-white/80 focus:outline-none flex-grow text-base"
//             />
//             <Search className="text-white/70 ml-3" size={20} />
//           </div>
//         </div>
//       </div>

//       {/* Content - Conditional based on data */}
//       {isLoading || loading ? (
//         <div className="text-center py-20 text-teal-300 text-xl font-medium">
//           <Loader />
//           Loading Tickets...
//         </div>
//       ) : transformedData.length > 0 ? (
//         <>
//           {/* Cards Container */}
//           <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 mb-10">
//             {transformedData.map((item, idx) => (
//               <div key={idx} className="bg-gradient-to-br from-teal-700/80 to-teal-900/80 border border-teal-500/30 rounded-2xl p-7 backdrop-blur-sm shadow-xl shadow-black/30 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-teal-500/40 relative overflow-hidden group">
//                 {/* Subtle top accent border */}
//                 <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-teal-400 to-cyan-600 opacity-75 group-hover:h-1.5 transition-all duration-300"></div>
//                 
//                 {/* Card Header */}
//                 <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-5">
//                   <div className="flex-1">
//                     <h3 className="text-2xl font-bold text-white mb-1 drop-shadow">Ticket #{item.ticketId}</h3>
//                     <p className="text-teal-200 text-sm leading-relaxed line-clamp-2">{item.subject}</p>
//                   </div>
//                   <div className={`px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider whitespace-nowrap ${getStatusStyles(item.originalData.status)} shadow-md`}>
//                     {item.status}
//                   </div>
//                 </div>
//                 
//                 {/* Card Body */}
//                 <div className="space-y-4 mb-5 text-teal-100">
//                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
//                     <div>
//                       <span className="text-xs text-teal-300 uppercase tracking-wider font-medium block mb-1">Type</span>
//                       <span className="text-white text-base font-semibold">{item.type}</span>
//                     </div>
//                     <div>
//                       <span className="text-xs text-teal-300 uppercase tracking-wider font-medium block mb-1">Priority</span>
//                       <span className="text-white text-base font-semibold">{item.priority}</span>
//                     </div>
//                   </div>
//                   
//                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
//                     <div>
//                       <span className="text-xs text-teal-300 uppercase tracking-wider font-medium block mb-1">Assigned To</span>
//                       <span className="text-white text-base font-semibold">{item.assignedTo}</span>
//                     </div>
//                     <div>
//                       <span className="text-xs text-teal-300 uppercase tracking-wider font-medium block mb-1">Created On</span>
//                       <span className="text-white text-base font-semibold">{item.createdOn}</span>
//                     </div>
//                   </div>
//                   
//                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
//                     <div>
//                       <span className="text-xs text-teal-300 uppercase tracking-wider font-medium block mb-1">Last Updated</span>
//                       <span className="text-white text-base font-semibold">{item.updatedOn}</span>
//                     </div>
//                   </div>
//                 </div>
//                 
//                 {/* Card Actions */}
//                 <div className="flex justify-end pt-5 border-t border-teal-600/50">
//                   <a
//                     href={`/support/support-chat/${item.id}`}
//                     className="bg-gradient-to-r from-teal-400 to-cyan-500 hover:from-teal-500 hover:to-cyan-600 text-white px-5 py-2.5 rounded-lg text-sm font-semibold shadow-md shadow-teal-500/30 transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 flex items-center gap-2"
//                   >
//                     <Search size={18} />
//                     View Details
//                   </a>
//                 </div>
//               </div>
//             ))}
//           </div>
//           
//           {/* Pagination */}
//           <div className="flex flex-col md:flex-row justify-between items-center gap-6 mt-8">
//             <div className="flex items-center gap-3">
//               <span className="text-teal-200 text-base">Show:</span>
//               <select
//                 className="bg-teal-700/50 border border-teal-500/50 text-white rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-teal-400 transition-colors cursor-pointer shadow-inner shadow-teal-900/50"
//                 value={state?.perPage}
//                 onChange={(e) => {
//                   const newPerPage = e.target.value;
//                   setState({
//                     ...state,
//                     perPage: newPerPage,
//                     currentPage: 1,
//                   });
//                 }}
//               >
//                 <option value="10">10</option>
//                 <option value="30">30</option>
//                 <option value="50">50</option>
//               </select>
//               <span className="text-teal-200 text-base">entries</span>
//             </div>

//             <div className="flex items-center gap-4">
//               <button 
//                 onClick={handlePrevPage} 
//                 disabled={state.currentPage === 1} 
//                 className="bg-white/15 hover:bg-white/25 disabled:opacity-40 disabled:cursor-not-allowed text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 border border-white/20 hover:border-white/30 shadow-md active:scale-95"
//               >
//                 Previous
//               </button>
//               
//               <span className="text-white text-base font-semibold px-3">
//                 Page {state.currentPage} of {totalPages}
//               </span>
//               
//               <button 
//                 onClick={handleNextPage} 
//                 disabled={state.currentPage === totalPages} 
//                 className="bg-white/15 hover:bg-white/25 disabled:opacity-40 disabled:cursor-not-allowed text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 border border-white/20 hover:border-white/30 shadow-md active:scale-95"
//               >
//                 Next
//               </button>
//             </div>
//           </div>
//         </>
//       ) : (
//         <div className="text-center py-20 text-teal-300 text-xl font-medium">No support tickets found. Create one to get started!</div>
//       )}

//       <SupportModal {...{ show, setShow, deleteModal, setDeleteModal }} />
//       {(isLoading || loading) && <Loader />}
//     </div>
//   );
// };

// export default Support;




import React, { useState, useEffect } from "react";
import { Search, X, ChevronDown, Paperclip, Upload } from "lucide-react";
// Assuming these are defined elsewhere and accessible
// import { useCategoryGetQuery, useCreateTicketMutation, useSupportDataQuery } from "./supportApi";
// import { toast } from "react-toastify";
import SupportModal from "./supportModal/supportModal"
// import Loader from "../../../Loader/loader"

// Mocking external imports for standalone execution
// In a real application, you would uncomment the actual imports above.
const useSupportDataQuery = (queryParams) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    // Simulate API call
    const fetchData = setTimeout(() => {
      const mockData = {
        data: {
          response: [
            { _id: "1", title: "Cannot log in to account", category_id: { category_name: "Technical" }, status: "open", created_at: "2024-06-25T10:00:00Z" },
            { _id: "2", title: "Problem with billing information", category_id: { category_name: "Billing" }, status: "inprogress", created_at: "2024-06-24T11:30:00Z" },
            { _id: "3", title: "Feature request: Dark mode", category_id: { category_name: "Feature Request" }, status: "close", created_at: "2024-06-23T14:45:00Z" },
            { _id: "4", title: "Password reset not working", category_id: { category_name: "Technical" }, status: "open", created_at: "2024-06-22T09:15:00Z" },
            { _id: "5", title: "Update profile information", category_id: { category_name: "Account Management" }, status: "inprogress", created_at: "2024-06-21T16:00:00Z" },
            { _id: "6", title: "Question about premium features", category_id: { category_name: "General Inquiry" }, status: "open", created_at: "2024-06-20T17:00:00Z" },
            { _id: "7", title: "Bug: Data not saving", category_id: { category_name: "Bug Report" }, status: "open", created_at: "2024-06-19T10:00:00Z" },
            { _id: "8", title: "Suggestions for dashboard UI", category_id: { category_name: "Feature Request" }, status: "inprogress", created_at: "2024-06-18T11:30:00Z" },
            { _id: "9", title: "Payment failed multiple times", category_id: { category_name: "Billing" }, status: "open", created_at: "2024-06-17T14:45:00Z" },
            { _id: "10", title: "Account suspension query", category_id: { category_name: "Account Management" }, status: "close", created_at: "2024-06-16T09:15:00Z" },
            { _id: "11", title: "Feedback on new feature", category_id: { category_name: "General Inquiry" }, status: "open", created_at: "2024-06-15T16:00:00Z" },
            { _id: "12", title: "Trouble uploading files", category_id: { category_name: "Technical" }, status: "inprogress", created_at: "2024-06-14T17:00:00Z" },
            { _id: "13", title: "App crashing on startup", category_id: { category_name: "Bug Report" }, status: "open", created_at: "2024-06-13T10:00:00Z" },
            { _id: "14", title: "Data export not working", category_id: { category_name: "Technical" }, status: "inprogress", created_at: "2024-06-12T11:30:00Z" },
            { _id: "15", title: "UI improvements for mobile", category_id: { category_name: "Feature Request" }, status: "open", created_at: "2024-06-11T14:45:00Z" },
          ],
          totalCount: 15, // Total count for pagination
        }
      };
      const searchParam = new URLSearchParams(queryParams).get("searchParam").toLowerCase();
      const filteredResponse = mockData.data.response.filter(ticket =>
        ticket.title.toLowerCase().includes(searchParam) ||
        ticket.status.toLowerCase().includes(searchParam)
      );

      const page = parseInt(new URLSearchParams(queryParams).get("page")) || 1;
      const limit = parseInt(new URLSearchParams(queryParams).get("limit")) || 10;
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      const paginatedResponse = filteredResponse.slice(startIndex, endIndex);

      setData({
        data: {
          response: paginatedResponse,
          totalCount: filteredResponse.length,
        }
      });
      setIsLoading(false);
    }, 500); // Simulate network delay
    return () => clearTimeout(fetchData);
  }, [queryParams]);

  return { data, isLoading, error };
};



const Loader = () => (
  <div className="flex items-center justify-center py-4">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-300"></div>
  </div>
);


const Support = () => {
  const [show, setShow] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const handleShow = () => setShow(true);
  const handleDelete = () => setDeleteModal(true); // This function is not used in the current render, but kept for completeness.

  const [attachedFiles, setAttachedFiles] = useState([]);
  const [state, setState] = useState({
    currentPage: 1,
    perPage: 10,
    search: "",
  });

  // State to manage view based on screen size
  const [isMobileView, setIsMobileView] = useState(window.innerWidth < 768); // 768px is Tailwind's 'md' breakpoint

  const queryParams = `limit=${state?.perPage || ""}&page=${
    state?.currentPage || ""
  }&searchParam=${state?.search || ""}`;

  const {
    data: supportData,
    error,
    isLoading, // isLoading from RTK Query
  } = useSupportDataQuery(queryParams);

  const TableData = supportData?.data?.response || [];
  const [loading, setLoading] = useState(false); // Local loading state for pagination/search changes

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    setAttachedFiles(prev => [...prev, ...files]);
  };

  const removeFile = (index) => {
    setAttachedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handlePageChange = (page) => {
    setLoading(true); // Set local loading true when page changes
    setState((prev) => ({ ...prev, currentPage: page }));
  };

  const handlePrevPage = () => {
    if (state.currentPage > 1) handlePageChange(state.currentPage - 1);
  };

  const handleNextPage = () => {
    const totalPages = Math.ceil(supportData?.data?.totalCount / state.perPage);
    if (state.currentPage < totalPages) handlePageChange(state.currentPage + 1);
  };

  useEffect(() => {
    // This effect runs when supportData changes (after API call completes)
    setLoading(false); // Set local loading false when data is fetched
  }, [supportData?.data?.response]);

  // Effect to handle window resize for responsive view
  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); // Empty dependency array means this runs once on mount and cleans up on unmount

  const transformedData = TableData.map((data, index) => ({
    id: data._id,
    // Calculate ticket ID based on current page and perPage
    ticketId: state.currentPage * state.perPage - (state.perPage - 1) + index,
    subject: data.title,
    type: data?.category_id?.category_name || "N/A",
    status: data.status === "open" ? "Open" : data.status === "inprogress" ? "In Progress" : "Closed",
    priority: "Medium", // Hardcoded as per original code
    assignedTo: "Admin", // Hardcoded as per original code
    createdOn: data.created_at.split("T")[0],
    updatedOn: data.created_at.split("T")[0],
    originalData: data
  }));

  const totalPages = supportData
    ? Math.ceil(supportData?.data?.totalCount / state.perPage)
    : 1;

  const getStatusStyles = (status) => {
    switch (status) {
      case "open":
        return "bg-green-500/20 text-green-300 border border-green-500/30"; // Teal for open
      case "close":
        return "bg-red-500/20 text-red-300 border border-red-500/30"; // Red for closed
      case "inprogress": // Explicitly handling inprogress for clarity
        return "bg-yellow-500/20 text-yellow-300 border border-yellow-500/30"; // Yellow for in-progress
      default:
        return "bg-gray-500/20 text-gray-300 border border-gray-500/30"; // Default for unknown status
    }
  };

  return (
    <div className="p-4 md:p-6 bg-[#1d8d84] min-h-screen text-white w-full mx-auto font-sans">
      {/* Header - Always Visible */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h2 className="text-3xl md:text-4xl font-extrabold text-white drop-shadow-md">Support Tickets</h2>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full md:w-auto">
          {/* Create New Ticket Button */}
          <button
            onClick={handleShow}
            className="w-full sm:w-auto bg-gradient-to-r from-teal-500 to-teal-700 hover:from-teal-600 hover:to-teal-800 text-white px-6 py-2.5 rounded-xl font-semibold shadow-lg shadow-teal-500/30 transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 active:scale-95 text-center"
          >
            Create New Ticket
          </button>

          {/* Search Input */}
          <div className="relative flex items-center bg-white/15 border border-white/20 rounded-xl px-4 py-2.5 w-full min-w-[280px] backdrop-blur-sm shadow-inner shadow-white/10">
            <input
              type="text"
              placeholder="Search Ticket ID or Status..."
              value={state.search}
              onChange={(e) => setState({ ...state, search: e.target.value, currentPage: 1 })} // Reset to page 1 on search
              className="bg-transparent text-white placeholder-white/80 focus:outline-none flex-grow text-base"
            />
            <Search className="text-white/70 ml-3" size={20} />
          </div>
        </div>
      </div>

      {/* Content - Conditional based on data and view */}
      {(isLoading || loading) ? (
        // Loader centered both horizontally and vertically within its container
        <div className="flex flex-col items-center justify-center py-20 text-teal-300 text-xl font-medium">
          <Loader />
          Loading Tickets...
        </div>
      ) : transformedData.length > 0 ? (
        <>
          {/* Render Cards for Mobile View (hidden on md and up) */}
          <div className="grid grid-cols-1 md:hidden gap-6 md:gap-8 mb-10">
            {transformedData.map((item, idx) => (
              <div key={idx} className="bg-gradient-to-br from-teal-700/80 to-teal-900/80 border border-teal-500/30 rounded-2xl p-6 sm:p-7 backdrop-blur-sm shadow-xl shadow-black/30 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-teal-500/40 relative overflow-hidden group">
                {/* Subtle top accent border */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-teal-400 to-cyan-600 opacity-75 group-hover:h-1.5 transition-all duration-300"></div>

                {/* Card Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-5">
                  <div className="flex-1">
                    <h3 className="text-xl sm:text-2xl font-bold text-white mb-1 drop-shadow">Ticket #{item.ticketId}</h3>
                    <p className="text-teal-200 text-sm leading-relaxed line-clamp-2">{item.subject}</p>
                  </div>
                  <div className={`flex-shrink-0 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider whitespace-nowrap ${getStatusStyles(item.originalData.status)} shadow-md`}>
                    {item.status}
                  </div>
                </div>

                {/* Card Body */}
                <div className="space-y-4 mb-5 text-teal-100">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
                    <div>
                      <span className="text-xs text-teal-300 uppercase tracking-wider font-medium block mb-1">Type</span>
                      <span className="text-white text-base font-semibold">{item.type}</span>
                    </div>
                    <div>
                      <span className="text-xs text-teal-300 uppercase tracking-wider font-medium block mb-1">Priority</span>
                      <span className="text-white text-base font-semibold">{item.priority}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
                    <div>
                      <span className="text-xs text-teal-300 uppercase tracking-wider font-medium block mb-1">Assigned To</span>
                      <span className="text-white text-base font-semibold">{item.assignedTo}</span>
                    </div>
                    <div>
                      <span className="text-xs text-teal-300 uppercase tracking-wider font-medium block mb-1">Created On</span>
                      <span className="text-white text-base font-semibold">{item.createdOn}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
                    <div>
                      <span className="text-xs text-teal-300 uppercase tracking-wider font-medium block mb-1">Last Updated</span>
                      <span className="text-white text-base font-semibold">{item.updatedOn}</span>
                    </div>
                  </div>
                </div>

                {/* Card Actions */}
                <div className="flex justify-end pt-5 border-t border-teal-600/50">
                  <a
                    href={`/support/support-chat/${item.id}`}
                    className="bg-gradient-to-r from-teal-400 to-cyan-500 hover:from-teal-500 hover:to-cyan-600 text-white px-5 py-2.5 rounded-lg text-sm font-semibold shadow-md shadow-teal-500/30 transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 flex items-center gap-2"
                  >
                    <Search size={18} />
                    View Details
                  </a>
                </div>
              </div>
            ))}
          </div>
          <div className="hidden md:block overflow-x-auto  rounded-2xl shadow-xl shadow-black/30 mb-10 border border-teal-500/30 backdrop-blur-sm">
            <table className="w-full text-left table-auto">
                <thead className="bg-teal-600 text-xs font-semibold text-white">
                  <tr>
                    <th scope="col" className="px-3 py-3    text-white uppercase">S.No</th>
                    <th scope="col" className="px-3 py-3   text-white uppercase ">Ticket Type</th>
                    <th scope="col" className="px-3 py-3   text-white uppercase ">Title</th>
                    <th scope="col" className="px-3 py-3    text-white uppercase ">Ticket Generated</th>
                    <th scope="col" className="px-3 py-3    text-white uppercase ">Status</th>
                    <th scope="col" className="px-3 py-3    text-white uppercase">Action</th>
                    
                  </tr>
                </thead>
              <tbody>
                {transformedData.map((item) => (
                  <tr key={item.id} className=" bg-white border-teal-800/50 last:border-b-0 text-gray-800 text-xs  transition-colors duration-200">
                    <td className="px-4 py-4 whitespace-nowrap  ">{item.ticketId}</td>
                    {/* <td className="px-6 py-4  max-w-xs truncate">{item.subject}</td> */}
                    <td className="px-6 py-4 whitespace-nowrap ">{item.type}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1.5 rounded-full text-xs font-semibold ${getStatusStyles(item.originalData.status)}`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap ">{item.priority}</td>
                    {/* <td className="px-6 py-4 whitespace-nowrap ">{item.assignedTo}</td> */}
                    <td className="px-6 py-4 whitespace-nowrap ">{item.createdOn}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <a
                        href={`/support/support-chat/${item.id}`}
                        className="text-teal-300 hover:text-teal-100 transition-colors duration-200 flex items-center gap-1"
                      >
                        <Search size={18} />
                        View
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 mt-8">
            {/* Items Per Page Selector */}
            <div className="flex items-center gap-3">
              <span className="text-teal-200 text-base">Show:</span>
              <div className="relative">
                <select
                  className="appearance-none bg-teal-700/50 border border-teal-500/50 text-white rounded-lg pl-4 pr-10 py-2 text-sm focus:outline-none focus:border-teal-400 transition-colors cursor-pointer shadow-inner shadow-teal-900/50"
                  value={state?.perPage}
                  onChange={(e) => {
                    const newPerPage = Number(e.target.value); // Ensure it's a number
                    setState({
                      ...state,
                      perPage: newPerPage,
                      currentPage: 1, // Reset to page 1 when perPage changes
                    });
                  }}
                >
                  <option value="10">10</option>
                  <option value="30">30</option>
                  <option value="50">50</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-white/70 pointer-events-none" size={16} />
              </div>
              <span className="text-teal-200 text-base">entries</span>
            </div>

            {/* Pagination Controls */}
            <div className="flex items-center gap-4">
              <button
                onClick={handlePrevPage}
                disabled={state.currentPage === 1}
                className="bg-white/15 hover:bg-white/25 disabled:opacity-40 disabled:cursor-not-allowed text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 border border-white/20 hover:border-white/30 shadow-md active:scale-95"
              >
                Previous
              </button>

              <span className="text-white text-base font-semibold px-3">
                Page {state.currentPage} of {totalPages}
              </span>

              <button
                onClick={handleNextPage}
                disabled={state.currentPage === totalPages}
                className="bg-white/15 hover:bg-white/25 disabled:opacity-40 disabled:cursor-not-allowed text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 border border-white/20 hover:border-white/30 shadow-md active:scale-95"
              >
                Next
              </button>
            </div>
          </div>
        </>
      ) : (
        <div className="text-center py-20 text-teal-300 text-xl font-medium">No support tickets found. Create one to get started!</div>
      )}

      {/* Support Modal for creating/deleting tickets */}
      {/* The SupportModal component's content would need its own responsiveness */}
      <SupportModal {...{ show, setShow, deleteModal, setDeleteModal }} />
    </div>
  );
};

export default Support;
