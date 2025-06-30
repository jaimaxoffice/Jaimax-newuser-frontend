
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import ActionButtons from "./actionComponent/actionCompent";
import TopCards from "./cards/cards";
import TeamCollaboration from "./teamWorkPanel/teamWorkPanel";
import SlabTabs from "./timeTracker/timeTracker";
import MyTotalTeam from "../myTotalTeam/myTotalTeam";
import { useUserDetailsQuery } from "../myTotalTeam/myTotatTeamApliSlice";
import search from "../../../../assets/search.svg"
import Loader from "../../../Loader/loader";
import { ToastContainer } from "react-toastify";
import Pagination from "../../../pagination/pagination";

const Dashboard = () => {
   const navigate = useNavigate();
   const [loading, setLoading] = useState(false);
  const [state, setState] = useState({
    currentPage: 1,
    perPage: 10,
    search: "",
  });
  const queryParams = `limit=${state.perPage}&page=${state.currentPage}&search=${state.search}`;
  const { data, isLoading, isError, error, refetch } = useUserDetailsQuery(queryParams);

  const TableData = data?.data?.withdrawRequests || [];

  // Auth check
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, []);

  // Auto logout on token failure
  useEffect(() => {
    if (error?.data?.status_code === 400) {
      toast.error(error?.data?.message);
      localStorage.clear();
      navigate("/login");
    }
  }, [error]);

  // Handle search debounce
  let searchTimeout;
  const handleSearch = (e) => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
      setState({ ...state, search: e.target.value, currentPage: 1 });
    }, 800);
  };

  
  useEffect(() => {
    refetch();
    return () => clearTimeout(searchTimeout);
  }, []);


  return (
   <div className="min-h-screen p-2  bg-[#1d8e85]  rounded-xl text-sm sm:text-base md:text-lg overflow-x-hidden">
      <div className="mb-3">
        <ActionButtons />
      </div>

      {/* SlabTabs and TopCards side-by-side */}
      <div className="flex flex-col lg:flex-row gap-2 mb-3">
        {/* SlabTabs half width */}
        <div className="lg:w-1/3">
          <SlabTabs />
        </div>

        {/* TopCards half width */}
        <div className="w-full">
          <TopCards />
        </div>
      </div>
<div className="w-full bg-gradient-to-br from-teal-50 to-teal-100 min-h-screen px-4 py-6">
  <div className="max-w-7xl mx-auto">
    <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
      <h1 className="text-2xl font-bold text-teal-800 mb-4 sm:mb-0">Total Team Details</h1>
      <div className="relative w-full sm:w-64">
        <input
          type="text"
          placeholder="Search team members..."
          className="w-full bg-white border-2 border-teal-200 text-teal-800 rounded-lg py-3 pl-12 pr-4 placeholder-teal-400 focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-200 transition-all duration-200"
          onChange={handleSearch}
        />
        <span className="absolute left-4 top-1/2 transform -translate-y-1/2">
          <img src={search} alt="search" className="w-5 h-5 text-teal-400" />
        </span>
      </div>
    </div>

    {/* Mobile cards */}
    <div className="flex flex-wrap gap-4 lg:hidden">
      {isLoading ? (
        [...Array(3)].map((_, i) => (
          <div key={i} className="w-full p-6 bg-white rounded-xl shadow-md border border-teal-100">
            <Loader />
          </div>
        ))
      ) : TableData.length === 0 ? (
        <div className="w-full p-8 bg-white rounded-xl shadow-md border border-teal-100 text-center">
          <div className="text-teal-300 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          </div>
          <p className="text-teal-600 text-lg font-medium">No team members found</p>
          <p className="text-teal-400 text-sm mt-2">Try adjusting your search criteria</p>
        </div>
      ) : (
        TableData.map((data, i) => (
          <div key={i} className="w-full bg-white rounded-xl shadow-lg border border-teal-100 overflow-hidden hover:shadow-xl transition-all duration-300 hover:border-teal-200">
            <div className="bg-gradient-to-r from-teal-500 to-teal-600 px-6 py-4">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-white truncate">{data.name || "N/A"}</h2>
                <span
                  className={`text-xs font-bold px-3 py-1 rounded-full ${
                    data.isActive 
                      ? "bg-emerald-500 text-white shadow-sm" 
                      : "bg-gray-500 text-white shadow-sm"
                  }`}
                >
                  {data.isActive ? "Active" : "Inactive"}
                </span>
              </div>
            </div>
            
            <div className="p-6 space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-teal-400 rounded-full"></div>
                <span className="text-sm text-teal-600 font-medium">Email:</span>
                <span className="text-sm text-teal-800 break-all">{data.email || "N/A"}</span>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-teal-400 rounded-full"></div>
                <span className="text-sm text-teal-600 font-medium">Username:</span>
                <span className="text-sm text-teal-800">{data.username || "N/A"}</span>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-teal-400 rounded-full"></div>
                <span className="text-sm text-teal-600 font-medium">Referrals:</span>
                <span className="text-sm font-semibold text-teal-800 bg-teal-50 px-2 py-1 rounded-md">
                  {data.totalChainReferrals || 0}
                </span>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-teal-400 rounded-full"></div>
                <span className="text-sm text-teal-600 font-medium">Join Date:</span>
                <span className="text-sm text-teal-800">
                  {data.createdAt
                    ? data.createdAt.slice(0, 10).split("-").reverse().join("-")
                    : "N/A"}
                </span>
              </div>
            </div>
          </div>
        ))
      )}
    </div>

        <div className="hidden lg:block overflow-x-auto mt-4 rounded-lg">
          <table className="w-full border-collapse rounded-lg">
            <thead>
              <tr style={{backgroundColor: '#13b3a1'}}>
                <th className="p-3 text-left text-white text-sm font-semibold  w-[60px]">S.No</th>
                <th className="p-3 text-left text-white text-sm font-semibold ">Name</th>
                <th className="p-3 text-left text-white text-sm font-semibold ">Email</th>
                <th className="p-3 text-left text-white text-sm font-semibold ">Username</th>
                <th className="p-3 text-left text-white text-sm font-semibold ">Referrals</th>
                <th className="p-3 text-left text-white text-sm font-semibold">Join Date</th>
                <th className="p-3 text-left text-white text-sm font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                [...Array(5)].map((_, i) => (
                  <tr key={i} className="bg-white border-t border-teal-200">
                    <td colSpan="7" className="p-3">
                      <Loader />
                    </td>
                  </tr>
                ))
              ) : TableData.length === 0 ? (
                <tr className=" border-t border-teal-200 justify-center align-center">
                  <td colSpan="7" className="p-4 text-center text-gray-600">No team build still</td>
                </tr>
              ) : (
                TableData.map((data, i) => (
                  <tr
                    key={i}
                    className="bg-white  text-xs font-semibold hover:bg-gray-50 transition-colors"
                  >
                    <td className="p-3 text-gray-700 ">
                      {state.currentPage * state.perPage - (state.perPage - 1) + i}
                    </td>
                    <td className="p-3 text-gray-900 ">{data.name || "N/A"}</td>
                    <td className="p-3 break-all text-gray-700 ">{data.email || "N/A"}</td>
                    <td className="p-3 text-gray-700 ">{data.username || "N/A"}</td>
                    <td className="p-3 text-gray-700 ">{data.totalChainReferrals || 0}</td>
                    <td className="p-3 text-gray-700 ">
                      {data.createdAt
                        ? data.createdAt.slice(0, 10).split("-").reverse().join("-")
                        : "N/A"}
                    </td>
                    <td className="p-3">
                      <span
                        className={`text-xs px-2 py-1 rounded-full text-white ${
                          data.isActive ? "bg-teal-600" : "bg-teal-400"
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

        {/* Conditional Pagination - Only show if there's data and pagination exists */}
        {!isLoading && TableData.length > 0 && data?.data?.pagination?.totalPages > 1 && (
          <div className="mt-6 flex justify-center">
            <Pagination
              currentPage={state.currentPage}
              totalPages={data?.data?.pagination?.totalPages || 1}
              onPageChange={(page) =>
                setState((prev) => ({ ...prev, currentPage: page }))
              }
            />
          </div>
        )}
  </div>
</div>
    </div>
  );
};

export default Dashboard;




// import React, { useEffect, useState } from "react";
// import { Search, Users, Calendar, TrendingUp, Activity } from "lucide-react";
// import SlabTabs from "./timeTracker/timeTracker";
// import ActionButtons from "./actionComponent/actionCompent";
// import TopCards from "./cards/cards";
// const Loader = () => (
//   <div className="flex items-center justify-center p-4">
//     <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600"></div>
//   </div>
// );

// const Pagination = ({ currentPage, totalPages, onPageChange }) => (
//   <div className="flex items-center justify-center space-x-2 mt-6">
//     <button
//       onClick={() => onPageChange(Math.max(1, currentPage - 1))}
//       disabled={currentPage === 1}
//       className="px-3 py-2 rounded-lg bg-white text-teal-600 border border-teal-200 hover:bg-teal-50 disabled:opacity-50 disabled:cursor-not-allowed"
//     >
//       Previous
//     </button>
    
//     {[...Array(Math.min(5, totalPages))].map((_, i) => {
//       const page = i + 1;
//       return (
//         <button
//           key={page}
//           onClick={() => onPageChange(page)}
//           className={`px-3 py-2 rounded-lg border ${
//             page === currentPage
//               ? 'bg-teal-600 text-white border-teal-600'
//               : 'bg-white text-teal-600 border-teal-200 hover:bg-teal-50'
//           }`}
//         >
//           {page}
//         </button>
//       );
//     })}
    
//     <button
//       onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
//       disabled={currentPage === totalPages}
//       className="px-3 py-2 rounded-lg bg-white text-teal-600 border border-teal-200 hover:bg-teal-50 disabled:opacity-50 disabled:cursor-not-allowed"
//     >
//       Next
//     </button>
//   </div>
// );

// const Dashboard = () => {
//   const [state, setState] = useState({
//     currentPage: 1,
//     perPage: 10,
//     search: "",
//   });
  
//   const [isLoading, setIsLoading] = useState(false);
  
//   // Mock data for demonstration
//   const mockData = {
//     data: {
//       withdrawRequests: [
//         {
//           name: "John Doe",
//           email: "john.doe@example.com",
//           username: "johndoe",
//           totalChainReferrals: 25,
//           createdAt: "2024-01-15T10:30:00Z",
//           isActive: true
//         },
//         {
//           name: "Jane Smith",
//           email: "jane.smith@example.com",
//           username: "janesmith",
//           totalChainReferrals: 42,
//           createdAt: "2024-02-20T14:15:00Z",
//           isActive: true
//         },
//         {
//           name: "Mike Johnson",
//           email: "mike.johnson@example.com",
//           username: "mikej",
//           totalChainReferrals: 18,
//           createdAt: "2024-01-08T09:45:00Z",
//           isActive: false
//         },
//         {
//           name: "Sarah Wilson",
//           email: "sarah.wilson@example.com",
//           username: "sarahw",
//           totalChainReferrals: 36,
//           createdAt: "2024-03-05T16:20:00Z",
//           isActive: true
//         },
//         {
//           name: "David Brown",
//           email: "david.brown@example.com",
//           username: "davidb",
//           totalChainReferrals: 12,
//           createdAt: "2024-02-28T11:10:00Z",
//           isActive: true
//         }
//       ],
//       pagination: {
//         totalPages: 3
//       }
//     }
//   };

//   const TableData = mockData?.data?.withdrawRequests || [];

//   // Handle search debounce
//   let searchTimeout;
//   const handleSearch = (e) => {
//     clearTimeout(searchTimeout);
//     searchTimeout = setTimeout(() => {
//       setState({ ...state, search: e.target.value, currentPage: 1 });
//     }, 800);
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-teal-500 via-teal-600 to-teal-700 lg:p-4 overflow-y-scroll scrollbar-hidden">
//       <div className="max-w-7xl mx-auto">
//         <ActionButtons />
//         <div className="grid grid-cols-1 lg:grid-cols-12 gap-1 mb-8">
//           {/* SlabTabs */}
//           <div className="lg:col-span-4 pt-5">
//             <SlabTabs />
//           </div>

//           {/* TopCards */}
//           <div className="lg:col-span-8">
//             <TopCards />
//           </div>
//         </div>

//         {/* Team Details Section */}
//         <div className="bg-white rounded-xl shadow-xl overflow-hidden">
//           {/* Header */}
//           <div className="bg-gradient-to-r from-teal-600 to-teal-700 px-6 py-4">
//             <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
//               <h2 className="text-2xl font-bold text-white">Total Team Details</h2>
//               <div className="relative w-full sm:w-80">
//                 <input
//                   type="text"
//                   placeholder="Search members..."
//                   className="w-full bg-white/20 backdrop-blur-sm border border-white/30 text-white rounded-lg py-3 pl-12 pr-4 placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 focus:bg-white/30 transition-all duration-200"
//                   onChange={handleSearch}
//                 />
//                 <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/70" />
//               </div>
//             </div>
//           </div>

//           {/* Mobile Cards */}
//           <div className="lg:hidden p-6">
//             <div className="space-y-4">
//               {isLoading ? (
//                 [...Array(3)].map((_, i) => (
//                   <div key={i} className="bg-gray-50 rounded-lg p-4">
//                     <Loader />
//                   </div>
//                 ))
//               ) : TableData.length === 0 ? (
//                 <div className="text-center py-12">
//                   <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
//                   <p className="text-gray-500 text-lg">No team members found</p>
//                 </div>
//               ) : (
//                 TableData.map((data, i) => (
//                   <div key={i} className="bg-gray-50 rounded-lg p-6 border border-gray-200 hover:shadow-md transition-all duration-200">
//                     <div className="flex justify-between items-start mb-4">
//                       <div>
//                         <h3 className="text-lg font-semibold text-gray-800">{data.name || "N/A"}</h3>
//                         <p className="text-gray-600">@{data.username || "N/A"}</p>
//                       </div>
//                       <span
//                         className={`px-3 py-1 rounded-full text-xs font-semibold ${
//                           data.isActive 
//                             ? "bg-green-100 text-green-800" 
//                             : "bg-red-100 text-red-800"
//                         }`}
//                       >
//                         {data.isActive ? "Active" : "Inactive"}
//                       </span>
//                     </div>
//                     <div className="space-y-2 text-sm">
//                       <p className="text-gray-600">
//                         <span className="font-medium">Email:</span> {data.email || "N/A"}
//                       </p>
//                       <p className="text-gray-600">
//                         <span className="font-medium">Referrals:</span> {data.totalChainReferrals || 0}
//                       </p>
//                       <p className="text-gray-600">
//                         <span className="font-medium">Joined:</span>{" "}
//                         {data.createdAt
//                           ? new Date(data.createdAt).toLocaleDateString()
//                           : "N/A"}
//                       </p>
//                     </div>
//                   </div>
//                 ))
//               )}
//             </div>
//           </div>

//           {/* Desktop Table */}
//           <div className="hidden lg:block overflow-x-auto">
//             <div className="bg-gray-50 border-b border-gray-200">
//               <div className="grid grid-cols-[80px_1.5fr_2fr_1.5fr_1fr_1.2fr_120px] gap-4 px-6 py-4 text-sm font-semibold text-gray-700">
//                 <div>S.No</div>
//                 <div>Name</div>
//                 <div>Email</div>
//                 <div>Username</div>
//                 <div>Referrals</div>
//                 <div>Join Date</div>
//                 <div>Status</div>
//               </div>
//             </div>
            
//             <div className="divide-y divide-gray-200">
//               {isLoading ? (
//                 [...Array(5)].map((_, i) => (
//                   <div key={i} className="px-6 py-4">
//                     <Loader />
//                   </div>
//                 ))
//               ) : TableData.length === 0 ? (
//                 <div className="text-center py-12">
//                   <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
//                   <p className="text-gray-500 text-lg">No team members found</p>
//                 </div>
//               ) : (
//                 TableData.map((data, i) => (
//                   <div
//                     key={i}
//                     className="grid grid-cols-[80px_1.5fr_2fr_1.5fr_1fr_1.2fr_120px] gap-4 px-6 py-4 hover:bg-gray-50 transition-colors duration-150"
//                   >
//                     <div className="text-gray-600 font-medium">
//                       {state.currentPage * state.perPage - (state.perPage - 1) + i}
//                     </div>
//                     <div className="font-medium text-gray-800">{data.name || "N/A"}</div>
//                     <div className="text-gray-600 break-all">{data.email || "N/A"}</div>
//                     <div className="text-gray-600">@{data.username || "N/A"}</div>
//                     <div className="text-gray-600 font-medium">{data.totalChainReferrals || 0}</div>
//                     <div className="text-gray-600">
//                       {data.createdAt
//                         ? new Date(data.createdAt).toLocaleDateString()
//                         : "N/A"}
//                     </div>
//                     <div>
//                       <span
//                         className={`px-3 py-1 rounded-full text-xs font-semibold ${
//                           data.isActive 
//                             ? "bg-green-100 text-green-800" 
//                             : "bg-red-100 text-red-800"
//                         }`}
//                       >
//                         {data.isActive ? "Active" : "Inactive"}
//                       </span>
//                     </div>
//                   </div>
//                 ))
//               )}
//             </div>
//           </div>

//           {/* Pagination */}
//           <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
//             <Pagination
//               currentPage={state.currentPage}
//               totalPages={mockData?.data?.pagination?.totalPages || 1}
//               onPageChange={(page) =>
//                 setState((prev) => ({ ...prev, currentPage: page }))
//               }
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;



// import React from "react";

// export default function JaimaxDashboard() {
//   const referralCode = "JAIMAX857DLQF";

//   const stats = [
//     { label: "Total Coins", value: "0.000" },
//     { label: "Wallet Balance", value: "₹0.00" },
//     { label: "Referral Earnings", value: "₹0.00" },
//     { label: "Super Bonus", value: "₹0.00" },
//     { label: "Available Balance", value: "₹0.00" },
//     { label: "Withdrawal Amount", value: "₹0.00" },
//     { label: "Active Members", value: "0" },
//   ];

//   return (
//     <div className="min-h-screen bg-[#065a60] text-gray-900 p-6">
//       {/* Header */}
//       <div className="bg-white rounded-xl shadow-md p-6 flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
//         <div>
//           <h1 className="text-xl font-semibold text-teal-700">
//             Hi <span className="text-yellow-600">Rajyalaxmi</span>
//           </h1>
//           <p className="text-2xl font-bold text-teal-900">
//             Welcome to Jaimax
//           </p>
//         </div>
//         <div className="flex items-center mt-4 md:mt-0 gap-2">
//           <span className="text-sm">Referral Code</span>
//           <input
//             value={referralCode}
//             readOnly
//             className="bg-gray-100 px-3 py-1 rounded border border-teal-300 text-sm"
//           />
//           <button
//             onClick={() => navigator.clipboard.writeText(referralCode)}
//             className="bg-teal-600 text-white px-3 py-1 rounded hover:bg-teal-700 text-sm"
//           >
//             Copy
//           </button>
//         </div>
//       </div>

//       {/* Slab Tabs */}
//       <div className="flex space-x-4 mb-4 text-white font-semibold">
//         {["1st Slab", "2nd Slab", "3rd Slab", "4th Slab", "5th Slab"].map(
//           (tab, idx) => (
//             <button
//               key={idx}
//               className={`${
//                 idx === 0 ? "text-teal-200 underline" : "hover:text-teal-300"
//               }`}
//             >
//               {tab}
//             </button>
//           )
//         )}
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//         {/* Slab Purchase Card */}
//         <div className="bg-white p-6 rounded-xl shadow-md space-y-4">
//           <div className="flex justify-between items-center">
//             <h2 className="text-lg font-bold text-teal-700">1st ICO Slab</h2>
//             <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-sm">
//               Live
//             </span>
//           </div>

//           {/* Currency & Payment Method */}
//           <div className="space-y-3">
//             <div className="flex gap-6">
//               <label className="flex items-center gap-1">
//                 <input type="radio" name="currency" defaultChecked />
//                 INR
//               </label>
//               <label className="flex items-center gap-1">
//                 <input type="radio" name="currency" />
//                 USD
//               </label>
//             </div>

//             <div className="flex gap-6">
//               <label className="flex items-center gap-1">
//                 <input type="radio" name="method" defaultChecked />
//                 Wallet
//               </label>
//               <label className="flex items-center gap-1">
//                 <input type="radio" name="method" />
//                 Available Balance
//               </label>
//             </div>

//             <input
//               type="text"
//               placeholder="Enter Amount"
//               className="w-full border border-teal-300 px-4 py-2 rounded"
//             />

//             <button className="w-full bg-teal-600 text-white py-2 rounded hover:bg-teal-700">
//               Proceed to pay
//             </button>

//             <div className="text-sm text-teal-800">
//               <p>₹0.02 INR &nbsp; | &nbsp; 0.00024 USD</p>
//               <div className="bg-gray-200 rounded-full h-2 mt-1">
//                 <div className="bg-teal-500 h-2 rounded-full w-[21.34%]"></div>
//               </div>
//               <p className="text-xs mt-1 text-gray-600">
//                 Sold Tokens 21.34%
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* Stat Cards */}
//         <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-4">
//           {stats.map((stat, idx) => (
//             <div
//               key={idx}
//               className="bg-white rounded-lg shadow p-4 text-center"
//             >
//               <p className="text-sm text-teal-500 font-semibold">{stat.label}</p>
//               <p className="text-2xl font-bold text-teal-900 mt-2">
//                 {stat.value}
//               </p>
//             </div>
//           ))}
//         </div>
//       </div>

//       <p className="text-white text-center mt-8">
//         Invest in Jaimax 1st ICO slab for your financial future.
//       </p>
//     </div>
//   );
// }

// import React, { useState } from "react";
// import { Share2, Copy, Check } from "lucide-react";

// export default function JaimaxDashboard() {
//   const [copied, setCopied] = useState(false);
//   const [activeTab, setActiveTab] = useState(0);
//   const referralCode = "JAIMAX857DLQF";

//   const tabs = ["1st Slab", "2nd Slab", "3rd Slab", "4th Slab", "5th Slab"];

//   const handleCopy = async () => {
//     await navigator.clipboard.writeText(referralCode);
//     setCopied(true);
//     setTimeout(() => setCopied(false), 2000);
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Header */}
//       <div className="bg-gradient-to-r from-teal-600 to-teal-700 p-6 rounded-b-3xl text-white">
//         <div className="flex justify-between items-center">
//           <div className="flex items-center gap-4">
//             <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
//               <span className="text-teal-600 font-bold text-xl">J</span>
//             </div>
//             <div>
//               <h1 className="text-xl font-medium">
//                 Hi <span className="text-teal-200">Rajyalaxmi</span>
//               </h1>
//               <h2 className="text-2xl font-bold">Welcome to Jaimax</h2>
//             </div>
//           </div>
          
//           <div className="text-right">
//             <p className="text-sm opacity-90 mb-2">Referral Code</p>
//             <div className="flex items-center gap-2">
//               <div className="bg-teal-800 px-4 py-2 rounded-lg flex items-center gap-2">
//                 <span className="font-mono text-sm">{referralCode}</span>
//                 <Share2 className="w-4 h-4" />
//               </div>
//               <button
//                 onClick={handleCopy}
//                 className="bg-white hover:bg-gray-100 text-teal-700 px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
//               >
//                 {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Navigation Tabs */}
//       <div className="px-6 py-4 bg-white">
//         <div className="flex gap-6">
//           {tabs.map((tab, idx) => (
//             <button
//               key={idx}
//               onClick={() => setActiveTab(idx)}
//               className={`text-sm font-medium transition-colors ${
//                 idx === activeTab 
//                   ? "text-teal-600 border-b-2 border-teal-600 pb-1" 
//                   : "text-gray-500 hover:text-teal-600"
//               }`}
//             >
//               {tab}
//             </button>
//           ))}
//         </div>
//       </div>

//       <div className="px-6 pb-6">
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//           {/* ICO Slab Card */}
//           <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
//             <div className="flex justify-between items-center mb-4">
//               <h3 className="text-xl font-bold text-teal-800">1st ICO Slab</h3>
//               <span className="bg-teal-100 text-teal-700 px-3 py-1 rounded-full text-sm font-medium">
//                 Live
//               </span>
//             </div>

//             {/* Pay with */}
//             <div className="mb-4">
//               <p className="text-sm text-gray-600 mb-2">Pay with</p>
//               <div className="flex gap-6">
//                 <label className="flex items-center gap-2 cursor-pointer">
//                   <div className="w-4 h-4 bg-teal-600 rounded-full flex items-center justify-center">
//                     <div className="w-2 h-2 bg-white rounded-full"></div>
//                   </div>
//                   <span className="text-sm text-teal-700">INR</span>
//                 </label>
//                 <label className="flex items-center gap-2 cursor-pointer">
//                   <div className="w-4 h-4 bg-gray-300 rounded-full"></div>
//                   <span className="text-sm text-gray-500">USD</span>
//                 </label>
//               </div>
//             </div>

//             {/* Payment Method */}
//             <div className="mb-4">
//               <p className="text-sm text-gray-600 mb-2">Payment Method</p>
//               <div className="flex gap-6">
//                 <label className="flex items-center gap-2 cursor-pointer">
//                   <div className="w-4 h-4 bg-teal-600 rounded-full flex items-center justify-center">
//                     <div className="w-2 h-2 bg-white rounded-full"></div>
//                   </div>
//                   <span className="text-sm text-teal-700">Wallet</span>
//                 </label>
//                 <label className="flex items-center gap-2 cursor-pointer">
//                   <div className="w-4 h-4 bg-gray-300 rounded-full"></div>
//                   <span className="text-sm text-gray-500">Available Balance</span>
//                 </label>
//               </div>
//             </div>

//             {/* Amount Input */}
//             <input
//               type="text"
//               placeholder="Enter Amount"
//               className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-gray-800 placeholder-gray-500 mb-4 focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
//             />

//             {/* Proceed Button */}
//             <button className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 rounded-lg transition-colors mb-4">
//               Proceed to pay
//             </button>

//             {/* Price Info */}
//             <div className="space-y-2">
//               <div className="flex justify-between text-sm">
//                 <span className="text-teal-600">↗ 0.02 INR</span>
//                 <span className="text-teal-600">↗ 0.00024 USD</span>
//               </div>
//               <p className="text-gray-600 text-sm">Sold Tokens 21.34%</p>
//               <div className="bg-gray-200 rounded-full h-2">
//                 <div className="bg-teal-500 h-2 rounded-full" style={{ width: '21.34%' }}></div>
//               </div>
//             </div>
//           </div>

//           {/* Stats Cards */}
//           <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
//             {/* Total Coins */}
//             <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
//               <div className="flex justify-between items-start mb-4">
//                 <div>
//                   <p className="text-sm text-gray-600">Total Coins</p>
//                   <p className="text-3xl font-bold text-teal-800">0.000</p>
//                 </div>
//                 <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center">
//                   <span className="text-2xl">🪙</span>
//                 </div>
//               </div>
//             </div>

//             {/* Wallet Balance */}
//             <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
//               <div className="flex justify-between items-start mb-4">
//                 <div>
//                   <p className="text-sm text-gray-600">Wallet Balance</p>
//                   <p className="text-3xl font-bold text-teal-800">₹0.00</p>
//                 </div>
//                 <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center">
//                   <span className="text-2xl">💰</span>
//                 </div>
//               </div>
//             </div>

//             {/* Referral Earnings */}
//             <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
//               <div className="flex justify-between items-start mb-4">
//                 <div>
//                   <p className="text-sm text-gray-600">Referral Earnings</p>
//                   <p className="text-3xl font-bold text-teal-800">₹0.00</p>
//                 </div>
//                 <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center">
//                   <span className="text-2xl">🔗</span>
//                 </div>
//               </div>
//             </div>

//             {/* Super Bonus */}
//             <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
//               <div className="flex justify-between items-start mb-4">
//                 <div>
//                   <p className="text-sm text-gray-600">Super Bonus</p>
//                   <p className="text-3xl font-bold text-teal-800">₹0.00</p>
//                 </div>
//                 <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center">
//                   <span className="text-2xl">⭐</span>
//                 </div>
//               </div>
//             </div>

//             {/* Available Balance */}
//             <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
//               <div className="flex justify-between items-start mb-4">
//                 <div>
//                   <p className="text-sm text-gray-600">Available Balance</p>
//                   <p className="text-3xl font-bold text-teal-800">₹0.00</p>
//                 </div>
//                 <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center">
//                   <span className="text-2xl">💳</span>
//                 </div>
//               </div>
//             </div>

//             {/* Withdrawal Amount */}
//             <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
//               <div className="flex justify-between items-start mb-4">
//                 <div>
//                   <p className="text-sm text-gray-600">Withdrawal Amount</p>
//                   <p className="text-3xl font-bold text-teal-800">₹0.00</p>
//                 </div>
//                 <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center">
//                   <span className="text-2xl">🏦</span>
//                 </div>
//               </div>
//             </div>

//             {/* Active Members */}
//             <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 md:col-span-2">
//               <div className="flex justify-between items-start mb-4">
//                 <div>
//                   <p className="text-sm text-gray-600">Active Members</p>
//                   <p className="text-3xl font-bold text-teal-800">0</p>
//                 </div>
//                 <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center">
//                   <span className="text-2xl">👥</span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Bottom Text */}
//         <p className="text-center text-gray-600 mt-8">
//           Invest in Jaimax 1st ICO slab for your financial future.
//         </p>
//       </div>
//     </div>
//   );
// }