
// import { useNavigate } from "react-router-dom";
// import React, { useEffect, useState } from "react";
// import ActionButtons from "./actionComponent/actionCompent";
// import TopCards from "./cards/cards";
// import TeamCollaboration from "./teamWorkPanel/teamWorkPanel";
// import SlabTabs from "./timeTracker/timeTracker";
// import MyTotalTeam from "../myTotalTeam/myTotalTeam";
// import { useUserDetailsQuery } from "../myTotalTeam/myTotatTeamApliSlice";
// import search from "../../../../assets/search.svg"
// import Loader from "../../../Loader/loader";
// import { ToastContainer } from "react-toastify";
// import Pagination from "../../../pagination/pagination";

// const Dashboard = () => {
//    const navigate = useNavigate();
//    const [loading, setLoading] = useState(false);
//   const [state, setState] = useState({
//     currentPage: 1,
//     perPage: 10,
//     search: "",
//   });
//   const queryParams = `limit=${state.perPage}&page=${state.currentPage}&search=${state.search}`;
//   const { data, isLoading, isError, error, refetch } = useUserDetailsQuery(queryParams);

//   const TableData = data?.data?.withdrawRequests || [];

//   // Auth check
//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (!token) {
//       navigate("/login");
//     }
//   }, []);

//   // Auto logout on token failure
//   useEffect(() => {
//     if (error?.data?.status_code === 400) {
//       toast.error(error?.data?.message);
//       localStorage.clear();
//       navigate("/login");
//     }
//   }, [error]);

//   // Handle search debounce
//   let searchTimeout;
//   const handleSearch = (e) => {
//     clearTimeout(searchTimeout);
//     searchTimeout = setTimeout(() => {
//       setState({ ...state, search: e.target.value, currentPage: 1 });
//     }, 800);
//   };

  
//   useEffect(() => {
//     refetch();
//     return () => clearTimeout(searchTimeout);
//   }, []);


//   return (
//    <div className="min-h-screen p-2  bg-[#1d8e85]   rounded-xl text-sm sm:text-base md:text-lg overflow-x-hidden">
//       <div className="mb-6">
//         <ActionButtons />
//       </div>

//       {/* SlabTabs and TopCards side-by-side */}
//       <div className="flex flex-col lg:flex-row gap-2 mb-6">
//         {/* SlabTabs half width */}
//         <div className="lg:w-1/3">
//           <SlabTabs />
//         </div>

//         {/* TopCards half width */}
//         <div className="w-full">
//           <TopCards />
//         </div>
//       </div>

//       {/* Team Collaboration full width below */}
//        <div className="w-full bg-[#1d8e85] min-h-screen px-4 py-6 text-white">
//       <div className="max-w-7xl mx-auto">
//         <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
//           <h1 className="text-2xl font-semibold">Total Team Details</h1>
//           <div className="relative w-full sm:w-64">
//             <input
//               type="text"
//               placeholder="Search"
//               className="w-full bg-transparent border border-white/30 text-white rounded-md py-2 pl-10 pr-4 placeholder-white/70"
//               onChange={handleSearch}
//             />
//             <span className="absolute left-3 top-1/2 transform -translate-y-1/2">
//               <img src={search} alt="search" className="w-5 h-5 opacity-70" />
//             </span>
//           </div>
//         </div>

//         {/* Mobile cards */}
//         <div className="flex flex-wrap gap-3 lg:hidden">
//           {isLoading ? (
//             [...Array(3)].map((_, i) => (
//               <div key={i} className="w-full p-4 bg-white/10 rounded-md">
//                 <Loader />
//               </div>
//             ))
//           ) : TableData.length === 0 ? (
//             <p className="text-center w-full">No data found.</p>
//           ) : (
//             TableData.map((data, i) => (
//               <div key={i} className="p-4 w-full rounded-xl border border-white/20 bg-white/10">
//                 <div className="flex justify-between items-center mb-2">
//                   <h2 className="text-lg font-semibold">{data.name || "N/A"}</h2>
//                   <span
//                     className={`text-xs font-bold px-2 py-1 rounded-full ${
//                       data.isActive ? "bg-green-600" : "bg-red-600"
//                     }`}
//                   >
//                     {data.isActive ? "Active" : "Inactive"}
//                   </span>
//                 </div>
//                 <p>Email: {data.email || "N/A"}</p>
//                 <p>Username: {data.username || "N/A"}</p>
//                 <p>Referrals: {data.totalChainReferrals || 0}</p>
//                 <p>
//                   Join Date:{" "}
//                   {data.createdAt
//                     ? data.createdAt.slice(0, 10).split("-").reverse().join("-")
//                     : "N/A"}
//                 </p>
//               </div>
//             ))
//           )}
//         </div>

//         {/* Desktop table */}
//         <div className="hidden lg:block overflow-x-auto mt-4">
//           <div className="grid grid-cols-[60px_1.5fr_2fr_1.5fr_1fr_1fr_100px] text-white text-sm font-semibold bg-white/20 border border-white/30 rounded-t-md">
//             <div className="p-3">S.No</div>
//             <div className="p-3">Name</div>
//             <div className="p-3">Email</div>
//             <div className="p-3">Username</div>
//             <div className="p-3">Referrals</div>
//             <div className="p-3">Join Date</div>
//             <div className="p-3">Status</div>
//           </div>
//           {isLoading ? (
//             [...Array(5)].map((_, i) => (
//               <div
//                 key={i}
//                 className="grid grid-cols-[60px_1.5fr_2fr_1.5fr_1fr_1fr_100px] border-t border-white/20 p-3"
//               >
//                 <Loader />
//               </div>
//             ))
//           ) : TableData.length === 0 ? (
//             <div className="p-4 text-center text-white">No data found</div>
//           ) : (
//             TableData.map((data, i) => (
//               <div
//                 key={i}
//                 className="grid grid-cols-[60px_1.5fr_2fr_1.5fr_1fr_1fr_100px] border-t border-white/20 hover:bg-white/10 transition-colors"
//               >
//                 <div className="p-3">
//                   {state.currentPage * state.perPage - (state.perPage - 1) + i}
//                 </div>
//                 <div className="p-3">{data.name || "N/A"}</div>
//                 <div className="p-3 break-all">{data.email || "N/A"}</div>
//                 <div className="p-3">{data.username || "N/A"}</div>
//                 <div className="p-3">{data.totalChainReferrals || 0}</div>
//                 <div className="p-3">
//                   {data.createdAt
//                     ? data.createdAt.slice(0, 10).split("-").reverse().join("-")
//                     : "N/A"}
//                 </div>
//                 <div className="p-3">
//                   <span
//                     className={`text-xs px-2 py-1 rounded-full ${
//                       data.isActive ? "bg-green-600" : "bg-red-600"
//                     }`}
//                   >
//                     {data.isActive ? "Active" : "Inactive"}
//                   </span>
//                 </div>
//               </div>
//             ))
//           )}
//         </div>

 
//         {/* Pagination */}
//         <div className="mt-6 flex justify-center">
//           <Pagination
//             currentPage={state.currentPage}
//             totalPages={data?.data?.pagination?.totalPages || 1}
//             onPageChange={(page) =>
//               setState((prev) => ({ ...prev, currentPage: page }))
//             }
//           />
//         </div>
//       </div>
//     </div>
//     </div>
//   );
// };

// export default Dashboard;




import React, { useEffect, useState } from "react";
import { Search, Users, Calendar, TrendingUp, Activity } from "lucide-react";
import SlabTabs from "./timeTracker/timeTracker";
import ActionButtons from "./actionComponent/actionCompent";
import TopCards from "./cards/cards";
const Loader = () => (
  <div className="flex items-center justify-center p-4">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600"></div>
  </div>
);

const Pagination = ({ currentPage, totalPages, onPageChange }) => (
  <div className="flex items-center justify-center space-x-2 mt-6">
    <button
      onClick={() => onPageChange(Math.max(1, currentPage - 1))}
      disabled={currentPage === 1}
      className="px-3 py-2 rounded-lg bg-white text-teal-600 border border-teal-200 hover:bg-teal-50 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      Previous
    </button>
    
    {[...Array(Math.min(5, totalPages))].map((_, i) => {
      const page = i + 1;
      return (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-3 py-2 rounded-lg border ${
            page === currentPage
              ? 'bg-teal-600 text-white border-teal-600'
              : 'bg-white text-teal-600 border-teal-200 hover:bg-teal-50'
          }`}
        >
          {page}
        </button>
      );
    })}
    
    <button
      onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
      disabled={currentPage === totalPages}
      className="px-3 py-2 rounded-lg bg-white text-teal-600 border border-teal-200 hover:bg-teal-50 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      Next
    </button>
  </div>
);

const Dashboard = () => {
  const [state, setState] = useState({
    currentPage: 1,
    perPage: 10,
    search: "",
  });
  
  const [isLoading, setIsLoading] = useState(false);
  
  // Mock data for demonstration
  const mockData = {
    data: {
      withdrawRequests: [
        {
          name: "John Doe",
          email: "john.doe@example.com",
          username: "johndoe",
          totalChainReferrals: 25,
          createdAt: "2024-01-15T10:30:00Z",
          isActive: true
        },
        {
          name: "Jane Smith",
          email: "jane.smith@example.com",
          username: "janesmith",
          totalChainReferrals: 42,
          createdAt: "2024-02-20T14:15:00Z",
          isActive: true
        },
        {
          name: "Mike Johnson",
          email: "mike.johnson@example.com",
          username: "mikej",
          totalChainReferrals: 18,
          createdAt: "2024-01-08T09:45:00Z",
          isActive: false
        },
        {
          name: "Sarah Wilson",
          email: "sarah.wilson@example.com",
          username: "sarahw",
          totalChainReferrals: 36,
          createdAt: "2024-03-05T16:20:00Z",
          isActive: true
        },
        {
          name: "David Brown",
          email: "david.brown@example.com",
          username: "davidb",
          totalChainReferrals: 12,
          createdAt: "2024-02-28T11:10:00Z",
          isActive: true
        }
      ],
      pagination: {
        totalPages: 3
      }
    }
  };

  const TableData = mockData?.data?.withdrawRequests || [];

  // Handle search debounce
  let searchTimeout;
  const handleSearch = (e) => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
      setState({ ...state, search: e.target.value, currentPage: 1 });
    }, 800);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-500 via-teal-600 to-teal-700 lg:p-4 overflow-y-scroll scrollbar-hidden">
      <div className="max-w-7xl mx-auto">
        <ActionButtons />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-1 mb-8">
          {/* SlabTabs */}
          <div className="lg:col-span-4 pt-5">
            <SlabTabs />
          </div>

          {/* TopCards */}
          <div className="lg:col-span-8">
            <TopCards />
          </div>
        </div>

        {/* Team Details Section */}
        <div className="bg-white rounded-xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-teal-600 to-teal-700 px-6 py-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <h2 className="text-2xl font-bold text-white">Total Team Details</h2>
              <div className="relative w-full sm:w-80">
                <input
                  type="text"
                  placeholder="Search members..."
                  className="w-full bg-white/20 backdrop-blur-sm border border-white/30 text-white rounded-lg py-3 pl-12 pr-4 placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 focus:bg-white/30 transition-all duration-200"
                  onChange={handleSearch}
                />
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/70" />
              </div>
            </div>
          </div>

          {/* Mobile Cards */}
          <div className="lg:hidden p-6">
            <div className="space-y-4">
              {isLoading ? (
                [...Array(3)].map((_, i) => (
                  <div key={i} className="bg-gray-50 rounded-lg p-4">
                    <Loader />
                  </div>
                ))
              ) : TableData.length === 0 ? (
                <div className="text-center py-12">
                  <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 text-lg">No team members found</p>
                </div>
              ) : (
                TableData.map((data, i) => (
                  <div key={i} className="bg-gray-50 rounded-lg p-6 border border-gray-200 hover:shadow-md transition-all duration-200">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800">{data.name || "N/A"}</h3>
                        <p className="text-gray-600">@{data.username || "N/A"}</p>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          data.isActive 
                            ? "bg-green-100 text-green-800" 
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {data.isActive ? "Active" : "Inactive"}
                      </span>
                    </div>
                    <div className="space-y-2 text-sm">
                      <p className="text-gray-600">
                        <span className="font-medium">Email:</span> {data.email || "N/A"}
                      </p>
                      <p className="text-gray-600">
                        <span className="font-medium">Referrals:</span> {data.totalChainReferrals || 0}
                      </p>
                      <p className="text-gray-600">
                        <span className="font-medium">Joined:</span>{" "}
                        {data.createdAt
                          ? new Date(data.createdAt).toLocaleDateString()
                          : "N/A"}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Desktop Table */}
          <div className="hidden lg:block overflow-x-auto">
            <div className="bg-gray-50 border-b border-gray-200">
              <div className="grid grid-cols-[80px_1.5fr_2fr_1.5fr_1fr_1.2fr_120px] gap-4 px-6 py-4 text-sm font-semibold text-gray-700">
                <div>S.No</div>
                <div>Name</div>
                <div>Email</div>
                <div>Username</div>
                <div>Referrals</div>
                <div>Join Date</div>
                <div>Status</div>
              </div>
            </div>
            
            <div className="divide-y divide-gray-200">
              {isLoading ? (
                [...Array(5)].map((_, i) => (
                  <div key={i} className="px-6 py-4">
                    <Loader />
                  </div>
                ))
              ) : TableData.length === 0 ? (
                <div className="text-center py-12">
                  <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 text-lg">No team members found</p>
                </div>
              ) : (
                TableData.map((data, i) => (
                  <div
                    key={i}
                    className="grid grid-cols-[80px_1.5fr_2fr_1.5fr_1fr_1.2fr_120px] gap-4 px-6 py-4 hover:bg-gray-50 transition-colors duration-150"
                  >
                    <div className="text-gray-600 font-medium">
                      {state.currentPage * state.perPage - (state.perPage - 1) + i}
                    </div>
                    <div className="font-medium text-gray-800">{data.name || "N/A"}</div>
                    <div className="text-gray-600 break-all">{data.email || "N/A"}</div>
                    <div className="text-gray-600">@{data.username || "N/A"}</div>
                    <div className="text-gray-600 font-medium">{data.totalChainReferrals || 0}</div>
                    <div className="text-gray-600">
                      {data.createdAt
                        ? new Date(data.createdAt).toLocaleDateString()
                        : "N/A"}
                    </div>
                    <div>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          data.isActive 
                            ? "bg-green-100 text-green-800" 
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {data.isActive ? "Active" : "Inactive"}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Pagination */}
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
            <Pagination
              currentPage={state.currentPage}
              totalPages={mockData?.data?.pagination?.totalPages || 1}
              onPageChange={(page) =>
                setState((prev) => ({ ...prev, currentPage: page }))
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;