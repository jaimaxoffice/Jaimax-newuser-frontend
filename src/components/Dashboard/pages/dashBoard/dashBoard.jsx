
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
   <div className="min-h-screen p-2  bg-[#1d8e85]   rounded-xl text-sm sm:text-base md:text-lg overflow-x-hidden">
      <div className="mb-6">
        <ActionButtons />
      </div>

      {/* SlabTabs and TopCards side-by-side */}
      <div className="flex flex-col lg:flex-row gap-6 mb-6">
        {/* SlabTabs half width */}
        <div className="lg:w-1/3">
          <SlabTabs />
        </div>

        {/* TopCards half width */}
        <div className="w-full">
          <TopCards />
        </div>
      </div>

      {/* Team Collaboration full width below */}
       <div className="w-full bg-[#1d8e85] min-h-screen px-4 py-6 text-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
          <h1 className="text-2xl font-semibold">Total Team Details</h1>
          <div className="relative w-full sm:w-64">
            <input
              type="text"
              placeholder="Search"
              className="w-full bg-transparent border border-white/30 text-white rounded-md py-2 pl-10 pr-4 placeholder-white/70"
              onChange={handleSearch}
            />
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2">
              <img src={search} alt="search" className="w-5 h-5 opacity-70" />
            </span>
          </div>
        </div>

        {/* Mobile cards */}
        <div className="flex flex-wrap gap-3 lg:hidden">
          {isLoading ? (
            [...Array(3)].map((_, i) => (
              <div key={i} className="w-full p-4 bg-white/10 rounded-md">
                <Loader />
              </div>
            ))
          ) : TableData.length === 0 ? (
            <p className="text-center w-full">No data found.</p>
          ) : (
            TableData.map((data, i) => (
              <div key={i} className="p-4 w-full rounded-xl border border-white/20 bg-white/10">
                <div className="flex justify-between items-center mb-2">
                  <h2 className="text-lg font-semibold">{data.name || "N/A"}</h2>
                  <span
                    className={`text-xs font-bold px-2 py-1 rounded-full ${
                      data.isActive ? "bg-green-600" : "bg-red-600"
                    }`}
                  >
                    {data.isActive ? "Active" : "Inactive"}
                  </span>
                </div>
                <p>Email: {data.email || "N/A"}</p>
                <p>Username: {data.username || "N/A"}</p>
                <p>Referrals: {data.totalChainReferrals || 0}</p>
                <p>
                  Join Date:{" "}
                  {data.createdAt
                    ? data.createdAt.slice(0, 10).split("-").reverse().join("-")
                    : "N/A"}
                </p>
              </div>
            ))
          )}
        </div>

        {/* Desktop table */}
        <div className="hidden lg:block overflow-x-auto mt-4">
          <div className="grid grid-cols-[60px_1.5fr_2fr_1.5fr_1fr_1fr_100px] text-white text-sm font-semibold bg-white/20 border border-white/30 rounded-t-md">
            <div className="p-3">S.No</div>
            <div className="p-3">Name</div>
            <div className="p-3">Email</div>
            <div className="p-3">Username</div>
            <div className="p-3">Referrals</div>
            <div className="p-3">Join Date</div>
            <div className="p-3">Status</div>
          </div>
          {isLoading ? (
            [...Array(5)].map((_, i) => (
              <div
                key={i}
                className="grid grid-cols-[60px_1.5fr_2fr_1.5fr_1fr_1fr_100px] border-t border-white/20 p-3"
              >
                <Loader />
              </div>
            ))
          ) : TableData.length === 0 ? (
            <div className="p-4 text-center text-white">No data found</div>
          ) : (
            TableData.map((data, i) => (
              <div
                key={i}
                className="grid grid-cols-[60px_1.5fr_2fr_1.5fr_1fr_1fr_100px] border-t border-white/20 hover:bg-white/10 transition-colors"
              >
                <div className="p-3">
                  {state.currentPage * state.perPage - (state.perPage - 1) + i}
                </div>
                <div className="p-3">{data.name || "N/A"}</div>
                <div className="p-3 break-all">{data.email || "N/A"}</div>
                <div className="p-3">{data.username || "N/A"}</div>
                <div className="p-3">{data.totalChainReferrals || 0}</div>
                <div className="p-3">
                  {data.createdAt
                    ? data.createdAt.slice(0, 10).split("-").reverse().join("-")
                    : "N/A"}
                </div>
                <div className="p-3">
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      data.isActive ? "bg-green-600" : "bg-red-600"
                    }`}
                  >
                    {data.isActive ? "Active" : "Inactive"}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>

 
        {/* Pagination */}
        <div className="mt-6 flex justify-center">
          <Pagination
            currentPage={state.currentPage}
            totalPages={data?.data?.pagination?.totalPages || 1}
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
