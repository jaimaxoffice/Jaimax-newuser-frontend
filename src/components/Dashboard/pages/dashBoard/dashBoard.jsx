
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
import {toast} from "react-toastify"
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
  <div className="max-w-9xl mx-auto">
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
          <div className="mt-3 flex justify-center">
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


