import { useNavigate } from "react-router-dom";
import React, {
  useEffect,
  useState,
  useCallback,
  useMemo,
  lazy,
  Suspense,
} from "react";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import search from "../../../../assets/search.svg";
import Loader from "../../../Loader/loader";
import Pagination from "../../../pagination/pagination";
import { useUserDetailsQuery } from "../myTotalTeam/myTotalTeamApiSlice";

// Lazy-loaded components
const ActionButtons = lazy(() => import("./actionComponent/actionCompent"));
const TopCards = lazy(() => import("./cards/cards"));
const SlabTabs = lazy(() => import("./timeTracker/timeTracker"));

// Loading fallback component
const ComponentLoader = () => (
  <div className="p-4 bg-white/10 animate-pulse rounded-lg">
    <div className="h-24 bg-teal-100/30 rounded"></div>
  </div>
);

// Memoized Table component to prevent unnecessary re-renders
const TeamTable = React.memo(({ data, isLoading, currentPage, perPage }) => {
  if (isLoading) {
    return (
      <tbody>
        {[...Array(5)].map((_, i) => (
          <tr key={i} className="bg-white border-t border-teal-200">
            <td colSpan="7" className="p-3">
              <Loader />
            </td>
          </tr>
        ))}
      </tbody>
    );
  }

  if (!data || data.length === 0) {
    return (
      <tbody>
        <tr className="border-t border-teal-200 justify-center align-center">
          <td colSpan="7" className="p-4 text-center text-gray-600">
            <p className="text-teal text-lg font-medium">
              No team members found
            </p>
            <p className="text-teal text-sm mt-2">
              Try adjusting your search criteria
            </p>
          </td>
        </tr>
      </tbody>
    );
  }

  return (
    <tbody>
      {data.map((item, i) => (
        <tr
          key={item._id || i}
          className="bg-white text-xs font-semibold hover:bg-gray-50 transition-colors"
        >
          <td className="p-3 text-gray-700">
            {currentPage * perPage - (perPage - 1) + i}
          </td>
          <td className="p-3 text-gray-900">{item.name || "N/A"}</td>
          <td className="p-3 break-all text-gray-700">{item.email || "N/A"}</td>
          <td className="p-3 text-gray-700">{item.username || "N/A"}</td>
          <td className="p-3 text-gray-700">{item.totalDirectReferrals+item.totalChainReferrals || 0}</td>
          <td className="p-3 text-gray-700">
            {item.createdAt
              ? item.createdAt.slice(0, 10).split("-").reverse().join("-")
              : "N/A"}
          </td>
          <td className="p-3">
            <span
              className={`text-xs px-2 py-1 rounded-full text-white ${
                item.isActive ? "bg-teal-600" : "bg-teal-400"
              }`}
            >
              {item.isActive ? "Active" : "Inactive"}
            </span>
          </td>
        </tr>
      ))}
    </tbody>
  );
});

// Memoized mobile cards component
const MobileTeamCards = React.memo(({ data, isLoading }) => {
  if (isLoading) {
    return (
      <>
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="w-full p-6 bg-white rounded-xl shadow-md border border-teal-100"
          >
            <Loader />
          </div>
        ))}
      </>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="w-full p-8 bg-white rounded-xl shadow-md border border-teal-100 text-center">
        <div className="text-teal-300 mb-4">
          <svg
            className="w-16 h-16 mx-auto"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <p className="text-teal-600 text-lg font-medium">
          No team members found
        </p>
        <p className="text-teal-400 text-sm mt-2">
          Try adjusting your search criteria
        </p>
      </div>
    );
  }

  return (
    <>
      {data.map((item, i) => (
        <div
          key={item._id || i}
          className="w-full bg-white rounded-xl shadow-lg border border-teal-100 overflow-hidden hover:shadow-xl transition-all duration-300 hover:border-teal-200"
        >
          <div className="bg-gradient-to-r from-teal-500 to-teal-600 px-6 py-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold text-white truncate">
                {item.name || "N/A"}
              </h2>
              <span
                className={`text-xs font-bold px-3 py-1 rounded-full ${
                  item.isActive
                    ? "bg-emerald-500 text-white shadow-sm"
                    : "bg-gray-500 text-white shadow-sm"
                }`}
              >
                {item.isActive ? "Active" : "Inactive"}
              </span>
            </div>
          </div>

          <div className="p-6 space-y-3">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-teal-400 rounded-full"></div>
              <span className="text-sm text-teal-600 font-medium">Email:</span>
              <span className="text-sm text-teal-800 break-all">
                {item.email || "N/A"}
              </span>
            </div>

            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-teal-400 rounded-full"></div>
              <span className="text-sm text-teal-600 font-medium">
                Username:
              </span>
              <span className="text-sm text-teal-800">
                {item.username || "N/A"}
              </span>
            </div>

            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-teal-400 rounded-full"></div>
              <span className="text-sm text-teal-600 font-medium">
                Referrals:
              </span>
              <span className="text-sm font-semibold text-teal-800 bg-teal-50 px-2 py-1 rounded-md">
                {item.totalChainReferrals + item.totalDirectReferrals || 0}
              </span>
            </div>

            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-teal-400 rounded-full"></div>
              <span className="text-sm text-teal-600 font-medium">
                Join Date:
              </span>
              <span className="text-sm text-teal-800">
                {item.createdAt
                  ? item.createdAt.slice(0, 10).split("-").reverse().join("-")
                  : "N/A"}
              </span>
            </div>
          </div>
        </div>
      ))}
    </>
  );
});

// Add display names for React DevTools
TeamTable.displayName = "TeamTable";
MobileTeamCards.displayName = "MobileTeamCards";

const Dashboard = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [queryState, setQueryState] = useState({
    currentPage: 1,
    perPage: 10,
    search: "",
  });

  // Memoized query parameters
  const queryParams = useMemo(
    () =>
      `limit=${queryState.perPage}&page=${queryState.currentPage}}`,
    [queryState.perPage, queryState.currentPage]
  );

  // API data fetching with react-query
  const { data, isLoading, isError, error, refetch } =
    useUserDetailsQuery(queryParams);
  // Extract team data and memoize it
  const tableData = useMemo(
    () => data?.data?.detailedDirectRefs || [],
    [data?.data?.detailedDirectRefs]
  );
  // console.log(tableData,"data from team")

  // Token validation effect
  useEffect(() => {
    const token = Cookies.get("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  // Error handling effect
  useEffect(() => {
    if (error?.data?.status_code === 400) {
      toast.error(error?.data?.message);
      Cookies.remove("token");
      Cookies.remove("userData");
      Cookies.remove("email");
      Cookies.remove("rememberMe");
      navigate("/login");
    }
  }, [error, navigate]);

  // Debounced search handler
  const handleSearch = useCallback((e) => {
    const value = e.target.value;
    setSearchTerm(value);

    // Use a proper debounce implementation
    const timeoutId = setTimeout(() => {
      setQueryState((prev) => ({
        ...prev,
        search: value,
        currentPage: 1,
      }));
    }, 800);

    return () => clearTimeout(timeoutId);
  }, []);

  // Memoized pagination handler
  const handlePageChange = useCallback((page) => {
    setQueryState((prev) => ({ ...prev, currentPage: page }));
  }, []);

  return (
    <div className="min-h-screen p-2 bg-[#1d8e85] rounded-xl text-sm sm:text-base md:text-lg overflow-x-hidden">
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />

      <div className="mb-3">
        <Suspense fallback={<ComponentLoader />}>
          <ActionButtons />
        </Suspense>
      </div>

      {/* SlabTabs and TopCards side-by-side */}
      <div className="flex flex-col lg:flex-row gap-2 mb-3">
        {/* SlabTabs half width */}
        <div className="lg:w-1/3">
          <Suspense fallback={<ComponentLoader />}>
            <SlabTabs />
          </Suspense>
        </div>

        {/* TopCards half width */}
        <div className="w-full">
          <Suspense fallback={<ComponentLoader />}>
            <TopCards />
          </Suspense>
        </div>
      </div>

      <div className="w-full bg-gradient-to-br from-teal-50 to-teal-100 min-h-screen px-4 py-6">
        <div className="max-w-9xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-teal-800 mb-4 sm:mb-0">
              Total Team Details
            </h1>
            <div className="relative w-full sm:w-64">
              <input
                type="text"
                value={searchTerm}
                placeholder="Search"
                className="w-full h-10 bg-white border border-gray-300 rounded-lg pl-10 pr-4 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all duration-200 text-sm shadow-sm hover:border-gray-400"
                onChange={handleSearch}
              />
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                {/* Using an SVG directly instead of an img tag to avoid path issues */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Mobile cards */}
          <div className="flex flex-wrap gap-4 lg:hidden">
            <MobileTeamCards data={tableData} isLoading={isLoading} />
          </div>

          {/* Desktop table */}
          <div className="hidden lg:block overflow-x-auto mt-4 rounded-lg">
            <table className="w-full border-collapse rounded-lg">
              <thead>
                <tr style={{ backgroundColor: "#13b3a1" }}>
                  <th className="p-3 text-left text-white text-sm font-semibold w-[60px]">
                    S.No
                  </th>
                  <th className="p-3 text-left text-white text-sm font-semibold">
                    Name
                  </th>
                  <th className="p-3 text-left text-white text-sm font-semibold">
                    Email
                  </th>
                  <th className="p-3 text-left text-white text-sm font-semibold">
                    Username
                  </th>
                  <th className="p-3 text-left text-white text-sm font-semibold">
                    Referrals
                  </th>
                  <th className="p-3 text-left text-white text-sm font-semibold">
                    Join Date
                  </th>
                  <th className="p-3 text-left text-white text-sm font-semibold">
                    Status
                  </th>
                </tr>
              </thead>
              <TeamTable
                data={tableData}
                isLoading={isLoading}
                currentPage={queryState.currentPage}
                perPage={queryState.perPage}
              />
            </table>
          </div>

          {/* Pagination */}
          {!isLoading &&
            tableData.length > 0 &&
            data?.data?.pagination?.totalPages > 1 && (
              <div className="mt-3 flex justify-center">
                <Pagination
                  currentPage={queryState.currentPage}
                  totalPages={data?.data?.pagination?.totalPages || 1}
                  onPageChange={handlePageChange}
                />
              </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default React.memo(Dashboard);
