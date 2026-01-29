import React, { useEffect, useReducer, useCallback, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "../../../../ReusableComponents/Toasts/Toasts";
import {
  Users,
  Search,
  Copy,
  UserCheck,
  Calendar,
  Mail,
  Award,
  Filter,
  ChevronDown,
  Share2,
  Check,
  Phone
} from "lucide-react";
import Pagination from "../../../../ReusableComponents/pagination/pagination";
import { useUserDetailsQuery } from "./myTotalTeamApiSlice";
import ReferralModal from "../../../../ReusableComponents/modals/referalModal";
import Loader from "../../../../ReusableComponents/Loader/loader";
import Cookies from "js-cookie";

// Initial state
const initialState = {
  currentPage: 1,
  perPage: 8,
  search: "",
  sortBy: "name",
  filterStatus: "all",
  showReferralModal: false,
  copiedCode: false,
  showFilters: false,
  loading: false,
  isTokenVerified: false,
};

// Reducer function for state management
function reducer(state, action) {
  switch (action.type) {
    case "SET_PAGE":
      return { ...state, currentPage: action.payload, loading: true };
    case "SET_SEARCH":
      return { ...state, search: action.payload, currentPage: 1 };
    case "SET_SORT":
      return { ...state, sortBy: action.payload };
    case "SET_FILTER_STATUS":
      return { ...state, filterStatus: action.payload, currentPage: 1 };
    case "SET_PER_PAGE":
      return { ...state, perPage: action.payload, currentPage: 1 };
    case "TOGGLE_REFERRAL_MODAL":
      return { ...state, showReferralModal: !state.showReferralModal };
    case "SET_COPIED_CODE":
      return { ...state, copiedCode: action.payload };
    case "TOGGLE_FILTERS":
      return { ...state, showFilters: !state.showFilters };
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    case "SET_TOKEN_VERIFIED":
      return { ...state, isTokenVerified: action.payload };
    case "RESET_FILTERS":
      return {
        ...state,
        search: "",
        filterStatus: "all",
        sortBy: "name",
        currentPage: 1,
      };
    default:
      return state;
  }
}

const MyTotalTeam = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const navigate = useNavigate();

  const userData = useMemo(() => {
    const userDataCookie = Cookies.get("userData");
    return userDataCookie ? JSON.parse(userDataCookie) : {};
  }, []);


    const [copiedTop, setCopiedTop] = useState(false);
    const [copiedInline, setCopiedInline] = useState(false);

    // Query params for server-side pagination
    const queryParams = useMemo(() => {
      return `limit=${state.perPage}&page=${state.currentPage}`;
    }, [state.perPage, state.currentPage]);

    const {
      data: userDetails,
      isLoading,
      isError,
      error,
      refetch,
    } = useUserDetailsQuery(queryParams);

    const TableData = useMemo(() => {
      return userDetails?.data?.detailedDirectRefs || [];
    }, [userDetails]);

    const { totalUsers, totalChainUsers, totalPages, username } = useMemo(() => {
      return {
        totalUsers: userDetails?.data?.user?.totalActiveDirectUsers || 0,
        totalChainUsers: userDetails?.data?.user?.totalActiveChainRefs || 0,
        totalPages: userDetails?.data?.pagination?.totalPages || 1,
        username: userDetails?.data?.user?.username,
      };
    }, [userDetails]);

    // Filter data client-side
    const filteredData = useMemo(() => {
      return TableData.filter((item) => {
        const matchesSearch =
          state.search === "" ||
          item.name?.toLowerCase().includes(state.search.toLowerCase()) ||
          item.username?.toLowerCase().includes(state.search.toLowerCase()) ||
          item.email?.toLowerCase().includes(state.search.toLowerCase());

        const matchesStatus =
          state.filterStatus === "all" ||
          (state.filterStatus === "active" && item.isActive) ||
          (state.filterStatus === "inactive" && !item.isActive);

        return matchesSearch && matchesStatus;
      }).sort((a, b) => {
        switch (state.sortBy) {
          case "name":
            return (a.name || "").localeCompare(b.name || "");
          case "referrals":
            return (b.totalChainReferrals || 0) - (a.totalChainReferrals || 0);
          case "date":
            return new Date(b.createdAt) - new Date(a.createdAt);
          default:
            return 0;
        }
      });
    }, [TableData, state.search, state.filterStatus, state.sortBy]);

    // Handle page change
    const handlePageChange = useCallback((page) => {
      dispatch({ type: "SET_PAGE", payload: page });
    }, []);

    // Handle search
    const handleSearch = useCallback((e) => {
      dispatch({ type: "SET_SEARCH", payload: e.target.value });
    }, []);

    // Handle copy referral code
    const handleCopyReferralCode = useCallback(async () => {
      try {
        await navigator.clipboard.writeText(username);
        dispatch({ type: "SET_COPIED_CODE", payload: true });
        setTimeout(
          () => dispatch({ type: "SET_COPIED_CODE", payload: false }),
          2000
        );
      } catch (err) {
        console.error("Failed to copy referral code");
      }
    }, [userData]);

    // console.log("Referral code to copy:", userData?.username || box.value);
    // console.log(username)

    // Generate avatar initials
    const getAvatarInitials = useCallback((name) => {
      if (!name) return "NA";
      return name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);
    }, []);

    const infoBoxes = useMemo(
      () => [
        {
          title: "Direct Active Members",
          value: totalUsers,
          icon: <Users className="w-4 h-4" />,
          gradient: "from-teal-500 to-teal-600",
          description: "All active members in your team",
        },
        {
          title: "Chain Active Members",
          value: totalChainUsers,
          icon: <UserCheck className="w-4 h-4" />,
          gradient: "from-teal-500 to-teal-600",
          description: "Total users in your chain network",
        },
        {
          title: "Referral id",
          value: username,
          icon: <Copy className="w-4 h-4" />,
          gradient: "from-teal-500 to-teal-600",
          // description: "Share this code with new users",
          isReferral: true,
        },
      ],
      [totalUsers, totalChainUsers, userData, username]
    );

    // Token verification effect
    useEffect(() => {
      const token = Cookies.get("token");
      if (!token) {
        navigate("/logi/");
        return;
      }
      dispatch({ type: "SET_TOKEN_VERIFIED", payload: true });
    }, [navigate]);

    // Error handling effect
    useEffect(() => {
      if (state.isTokenVerified && error?.data?.status_code === 400) {
        const debounce = setTimeout(() => {
          localStorage.clear();
          navigate("/login");
          toast.error(error?.data?.message, {
            position: "top-center",
          });
        }, 2000);
        return () => clearTimeout(debounce);
      }
    }, [state.isTokenVerified, error, navigate]);

    // Refetch when page or perPage changes
    useEffect(() => {
      refetch();
    }, [state.currentPage, state.perPage, refetch]);

    // Update loading state after data arrives
    useEffect(() => {
      if (userDetails?.data?.detailedDirectRefs) {
        dispatch({ type: "SET_LOADING", payload: false });
      }
    }, [userDetails?.data?.detailedDirectRefs]);

    return (
      <div className="min-h-screen bg-gradient-to-br from-[#1d8d84] to-[#156660] p-2 sm:p-4 md:p-6">
        {/* Stats Cards Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3 md:gap-5 mb-4 md:mb-6">
          {infoBoxes.map((box, idx) => (
            <div
              key={idx}
              className="group relative bg-white/95 rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl border border-white/50"
            >
              {/* Side decorative element */}
              <div className="absolute top-0 left-0 h-full w-1.5 bg-gradient-to-b from-teal-400 to-teal-600"></div>

              <div className="p-4 pl-5">
                {box.isReferral ? (
                  <>
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-bold text-gray-800 text-sm">{box.title}</h3>
                      <div className="flex gap-1.5">
                        {/* ✅ Top Copy button */}
                        <button
                          onClick={async () => {
                            try {
                              await navigator.clipboard.writeText(box.value);
                              setCopiedTop(true);
                              setTimeout(() => setCopiedTop(false), 2000);
                            } catch (err) {
                              console.error("Failed to copy referral code");
                            }
                          }}
                          className={`p-1.5 rounded-full text-white ${copiedTop
                              ? "bg-green-500"
                              : "bg-teal-500 hover:bg-teal-600"
                            } transition-colors duration-300 shadow-sm cursor-pointer`}
                          title="Copy referral code"
                        >
                          {copiedTop ? (
                            <Check className="w-3.5 h-3.5" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>

                        {/* 📤 Share button */}
                        <button
                          onClick={() =>
                            dispatch({ type: "TOGGLE_REFERRAL_MODAL" })
                          }
                          className="p-1.5 rounded-full bg-teal-500 text-white hover:bg-teal-600 transition-colors duration-300 shadow-sm cursor-pointer"
                          title="Share referral"
                        >
                          <Share2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <p className="text-xs text-gray-500 mb-2">{box.description}</p>

                    {/* Inline referral display + copy */}
                    <div className="bg-teal-50 rounded-md p-2.5 border border-teal-100 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={async () => {
                            try {
                              await navigator.clipboard.writeText(box.value);
                              setCopiedInline(true);
                              setTimeout(() => setCopiedInline(false), 2000);
                            } catch (err) {
                              console.error("Failed to copy referral code");
                            }
                          }}
                          className={`p-2.5 rounded-full bg-gradient-to-r ${box.gradient} text-white shadow-sm cursor-pointer transition-colors duration-300`}
                          title="Copy referral code"
                        >
                          {copiedInline ? (
                            <Check className="w-3.5 h-3.5" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>

                        <code className="text-xs font-bold text-teal-800 max-w-[140px] sm:max-w-[180px] truncate">
                          {box.value}
                        </code>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-bold text-gray-800 text-sm">{box.title}</h3>
                    </div>

                    <p className="text-xs text-gray-500 mb-3">{box.description}</p>

                    <div className="flex items-center gap-3">
                      <div
                        className={`p-2.5 rounded-full bg-gradient-to-r ${box.gradient} text-white shadow-sm`}
                      >
                        {box.icon}
                      </div>
                      <div className="text-xl sm:text-2xl font-bold text-gray-800">
                        {typeof box.value === "number"
                          ? box.value.toLocaleString()
                          : box.value}
                      </div>
                    </div>
                  </>
                )}
              </div>

            </div>
          ))}
        </div>

        {/* Team Data Section */}
        <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-lg border border-white/40 overflow-hidden transition-all duration-300">
          {/* Header with search and filters */}
          <div className="p-3 sm:p-4 border-b border-gray-100">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="text-lg font-bold text-gray-800">Team Details</h2>
                <p className="text-xs text-gray-600">
                  {filteredData.length} of {totalUsers} members
                  {state.search && ` (filtered by "${state.search}")`}
                  {state.filterStatus !== "all" &&
                    ` (${state.filterStatus} only)`}
                </p>
              </div>
              <div className="flex gap-2">
                <div className="relative hidden sm:block w-60">
                  <input
                    type="text"
                    placeholder="Search members..."
                    value={state.search}
                    className="w-full bg-gray-50 border border-gray-200 text-gray-800 rounded-md py-1.5 pl-8 pr-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all duration-300"
                    onChange={handleSearch}
                  />
                  <Search className="absolute left-2.5 top-1/2 transform -translate-y-1/2 text-gray-400 w-3.5 h-3.5" />
                </div>
                <button
                  onClick={() => dispatch({ type: "TOGGLE_FILTERS" })}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-teal-50 text-teal-700 rounded-md hover:bg-teal-100 border border-teal-100 text-sm transition-all duration-300"
                >
                  <Filter className="w-3.5 h-3.5" />
                  <span className="sm:hidden">Filters</span>
                  <span className="hidden sm:inline">Filters</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-300 ${state.showFilters ? "rotate-180" : ""
                      }`}
                  />
                </button>
              </div>
            </div>

            {/* Filters Panel */}
            {state.showFilters && (
              <div className="mt-3 p-3 bg-gray-50 rounded-md border border-gray-100 text-sm animate-fadeIn">
                <div className="sm:hidden mb-2">
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Search
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search members..."
                      value={state.search}
                      className="w-full bg-white border border-gray-200 rounded-md py-1.5 pl-8 pr-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400"
                      onChange={handleSearch}
                    />
                    <Search className="absolute left-2.5 top-1/2 transform -translate-y-1/2 text-gray-400 w-3.5 h-3.5" />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Sort by
                    </label>
                    <select
                      value={state.sortBy}
                      onChange={(e) =>
                        dispatch({ type: "SET_SORT", payload: e.target.value })
                      }
                      className="w-full bg-white border border-gray-200 rounded-md px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400"
                    >
                      <option value="name">Name (A-Z)</option>
                      <option value="referrals">Referrals (High to Low)</option>
                      <option value="date">Join Date (Newest)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Status
                    </label>
                    <select
                      value={state.filterStatus}
                      onChange={(e) =>
                        dispatch({
                          type: "SET_FILTER_STATUS",
                          payload: e.target.value,
                        })
                      }
                      className="w-full bg-white border border-gray-200 rounded-md px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400"
                    >
                      <option value="all">All Members</option>
                      <option value="active">Active Only</option>
                      <option value="inactive">Inactive Only</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Per Page
                    </label>
                    <select
                      value={state.perPage}
                      onChange={(e) =>
                        dispatch({
                          type: "SET_PER_PAGE",
                          payload: parseInt(e.target.value),
                        })
                      }
                      className="w-full bg-white border border-gray-200 rounded-md px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400"
                    >
                      <option value={8}>8</option>
                      <option value={10}>10</option>
                      <option value={30}>30</option>
                      <option value={50}>50</option>
                    </select>
                  </div>
                  <div className="flex items-end">
                    <button
                      onClick={() => dispatch({ type: "RESET_FILTERS" })}
                      className="w-full px-2 py-1.5 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 text-sm transition-all duration-300"
                    >
                      Clear Filters
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Mobile Cards View */}
<div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 lg:hidden">
  {isLoading ? (
    [...Array(3)].map((_, i) => (
      <div
        key={i}
        className="bg-white rounded-lg p-4 border border-gray-200 animate-pulse"
      >
        <div className="flex items-center gap-3 mb-3">
          <div className="w-12 h-12 bg-gray-200 rounded-lg"></div>
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-3 bg-gray-200 rounded w-1/2"></div>
          </div>
        </div>
        <div className="space-y-2">
          <div className="h-3 bg-gray-200 rounded"></div>
          <div className="h-3 bg-gray-200 rounded w-5/6"></div>
        </div>
      </div>
    ))
  ) : filteredData.length === 0 ? (
    <div className="text-center py-12 bg-white rounded-lg border border-gray-200 col-span-full">
      <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-3">
        <Users className="w-8 h-8 text-teal-600" />
      </div>
      <h3 className="text-base font-semibold text-gray-900 mb-1">
        No members found
      </h3>
      <p className="text-sm text-gray-500 max-w-sm mx-auto px-4">
        {state.search || state.filterStatus !== "all"
          ? "No members match your current filters."
          : "Your team list is currently empty."}
      </p>
    </div>
  ) : (
    filteredData.map((data, i) => (
      <div
        key={i}
        className="bg-white rounded-lg p-4 border border-gray-200 hover:border-teal-400 hover:shadow-md transition-all"
      >
        {/* Header */}
        <div className="flex items-center gap-3 mb-3">
          {/* Avatar */}
          <div className="relative flex-shrink-0">
            <div className="w-12 h-12 rounded-lg overflow-hidden">
              {data.profile ? (
                <img
                  src={data?.profile}
                  alt={data.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-teal-500 to-teal-600 flex items-center justify-center text-white font-semibold  rounded-xl text-sm">
                  {getAvatarInitials(data.name)}
                </div>
              )}
            </div>
            
          </div>

          {/* Name & Status */}
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-gray-900 text-sm leading-tight truncate">
              {data.name || "N/A"}
            </h3>
            <p className="text-teal-600 text-xs font-medium truncate">
              {data.username || "N/A"}
            </p>
          </div>

          {/* Status Badge */}
          <span
            className={`px-2 py-0.5 rounded text-xs font-medium ${
              data.isActive
                ? "bg-green-50 text-green-700"
                : "bg-gray-100 text-gray-600"
            }`}
          >
            {data.isActive ? "Active" : "Inactive"}
          </span>
        </div>

        {/* Email */}
        <div className="flex items-center gap-2 mb-3 text-xs">
          <Mail className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
          <p className="text-gray-600 truncate">{data.email || "N/A"}</p>
        </div>
        <div className="flex items-center gap-2 mb-3 text-xs">
          <Phone className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
          <p className="text-gray-600 truncate">{data.phone || "N/A"}</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-2">
          {/* Referrals */}
          <div className="bg-teal-50 rounded-lg p-2.5 border border-teal-100">
            <div className="flex items-center gap-1.5 mb-0.5">
              <Award className="w-3.5 h-3.5 text-teal-600" />
              <p className="text-xs text-gray-600">Referrals</p>
            </div>
            <p className="text-lg font-bold text-gray-900">
              {data.totalChainReferrals + data?.totalDirectReferrals || 0}
            </p>
          </div>

          {/* Joined */}
          <div className="bg-gray-50 rounded-lg p-2.5 border border-gray-200">
            <div className="flex items-center gap-1.5 mb-0.5">
              <Calendar className="w-3.5 h-3.5 text-gray-500" />
              <p className="text-xs text-gray-600">Joined</p>
            </div>
            <p className="text-xs font-semibold text-gray-900">
              {data.createdAt
                ? data.createdAt.slice(0, 10).split("-").reverse().join("-")
                : "N/A"}
            </p>
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
                <tr className="bg-gradient-to-r from-teal-600 to-teal-700 text-white text-left">
                  <th className="py-2 px-4 font-medium">#</th>
                  <th className="py-2 px-4 font-medium">Name</th>
                  <th className="py-2 px-4 font-medium">Email</th>
                  <th className="py-2 px-4 font-medium">Username</th>
                  <th className="py-2 px-4 font-medium">Phone</th>
                  <th className="py-2 px-4 font-medium">Referrals</th>
                  <th className="py-2 px-4 font-medium">Join Date</th>
                  <th className="py-2 px-4 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  [...Array(5)].map((_, i) => (
                    <tr key={i} className="border-b border-gray-100">
                      {[...Array(7)].map((_, j) => (
                        <td key={j} className="py-3 px-4">
                          <div className="h-3 bg-gray-200 rounded w-16 animate-pulse"></div>
                        </td>
                      ))}
                    </tr>
                  ))
                ) : filteredData.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="text-center py-12">
                      <Users className="w-14 h-14 text-gray-400 mx-auto mb-3" />
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">
                        No members found
                      </h3>
                      <p className="text-sm text-gray-600 max-w-md mx-auto">
                        {state.search || state.filterStatus !== "all"
                          ? "No members match your current filters. Try adjusting your search criteria or filter settings."
                          : "Your team list is currently empty. When you add team members, they'll appear here."}
                      </p>
                    </td>
                  </tr>
                ) : (
                  filteredData.map((data, i) => (
                    <tr
                      key={i}
                      className="border-b border-gray-100 hover:bg-teal-50/50 transition-colors duration-200"
                    >
                      <td className="py-3 px-4 text-gray-700 font-medium">
                        {(state.currentPage - 1) * state.perPage + i + 1}
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <div
                            className="font-medium text-gray-800 max-w-[150px]"
                            title={data.name}
                          >
                            {data.name || "N/A"}
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-gray-700">
                        <div className="max-w-[200px]" title={data.email}>
                          {data.email || "N/A"}
                        </div>
                      </td>
                      <td className="py-3 px-4 text-teal-600 font-medium">
                        {data.username || "N/A"}
                      </td>
                      <td className="py-3 px-4 text-gray-600 font-medium">
                        {data.phone || "N/A"}
                      </td>
                      <td className="py-3 px-4 text-gray-700 font-medium">
                        {data.totalChainReferrals + data?.totalDirectReferrals ||
                          0}
                      </td>
                      <td className="py-3 px-4 text-gray-700">
                        {data.createdAt
                          ? data.createdAt
                            .slice(0, 10)
                            .split("-")
                            .reverse()
                            .join("-")
                          : "N/A"}
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-2.5 py-1 rounded-md text-xs font-medium ${data.isActive
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
          {filteredData.length !== 0 && (
            <div className="flex justify-center p-4 border-t border-gray-100">
              <Pagination
                currentPage={state.currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          )}
        </div>

        {/* Modals */}
        {state.showReferralModal && (
          <ReferralModal
            show={state.showReferralModal}
            onHide={() => dispatch({ type: "TOGGLE_REFERRAL_MODAL" })}
            userData={userData}
          />
        )}
        {(isLoading || state.loading) && <Loader />}

        {/* Animation styles */}
        <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
      `}</style>
      </div>
    );
  };

  export default MyTotalTeam;



