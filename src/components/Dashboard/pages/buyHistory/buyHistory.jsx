import React, { useState, useEffect } from "react";
import {
  ChevronDown,
  Search,
  Calendar,
  CreditCard,
  DollarSign,
  Hash,
  TrendingUp,
  Globe,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useBuyDetailsQuery } from "./buyHistoryApiSlice";
import { toast } from "react-toastify";
import Pagination from "../../../pagination/pagination";
import Cookies from "js-cookie";
const BuyHistory = () => {
  const [isTokenVerified, setIsTokenVerified] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("Completed");
  const navigate = useNavigate();
  const [state, setState] = useState({
    currentPage: 1,
    perPage: "10",
    search: "",
  });
  const [loading, setLoading] = useState(false);

  // Update query parameters
  const queryParams = `limit=${state?.perPage || ""}&page=${
    state?.currentPage || ""
  }&search=${state?.search || ""}&status=${selectedStatus}`;

  const {
    data: buyDetails,
    isLoading,
    error,
    refetch,
  } = useBuyDetailsQuery(queryParams);
  console.log(buyDetails); // ✅ shows the fetched data
  const TableData = buyDetails?.data?.withdrawRequests || [];

  const handlePageChange = (e) => {
    setLoading(true);
    setState({ ...state, currentPage: e });
  };

  const handleStatusChange = (e) => {
    setSelectedStatus(e.target.value);
    setState({ ...state, currentPage: 1 });
  };

  // Function for handling search with delay
  const [searchQuery, setSearchQuery] = useState("");
  useEffect(() => {
    const searchTimeout = setTimeout(() => {
      setState({ ...state, search: searchQuery, currentPage: 1 });
    }, 500); // Debounce for 500ms
    return () => clearTimeout(searchTimeout);
  }, [searchQuery]);

  useEffect(() => {
    // const token = localStorage.getItem("token");
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
          // localStorage.clear();
          navigate("/login");
          toast.error(error?.data?.message, {
            position: "top-center",
          });
        }
      }, 2000);

      return () => clearTimeout(debounce);
    }
  }, [isTokenVerified, error, navigate]);

  useEffect(() => {
    refetch();
  }, [state.currentPage, state.search, selectedStatus, refetch]);

  /**
   * This method is used to convert the iso string to date & time format
   * @param {*} isoString
   */
  const formatDateWithAmPm = (isoString) => {
    const date = new Date(isoString);
    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
      timeZone: "UTC", // Assuming UTC date strings from backend
    };
    return new Intl.DateTimeFormat("en-GB", options)
      .format(date)
      .replace(",", "");
  };

  useEffect(() => {
    setLoading(false);
  }, [buyDetails?.data?.withdrawRequests]);

  const getStatusClasses = (status) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-700";
      case "Pending":
        return "bg-yellow-100 text-yellow-700";
      case "Cancelled":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="min-h-screen bg-[#1d8e85] p-2 sm:p-4 lg:p-8">
      <div className="container mx-auto max-w-screen">
        {/* Header and Controls */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 lg:mb-8 gap-3 sm:gap-4">
          {/* Search Input */}
          <div className="relative w-full sm:w-80 lg:w-96">
            <input
              type="text"
              className="w-full pl-10 pr-4 py-2.5 sm:py-3 text-sm sm:text-base bg-white border border-gray-300 rounded-lg text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 shadow-sm"
              placeholder="Search transactions..."
              onChange={(e) => setSearchQuery(e.target.value)}
              value={searchQuery}
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
          </div>

          {/* Status Dropdown - Improved Responsiveness */}
          <div className="relative w-full sm:w-auto sm:min-w-[160px] lg:min-w-[180px]">
            <select
              value={selectedStatus}
              onChange={handleStatusChange}
              className="appearance-none bg-white border border-gray-300 text-gray-700 py-2.5 sm:py-3 px-3 sm:px-4 pr-8 sm:pr-10 rounded-lg leading-tight focus:outline-none focus:bg-white focus:border-emerald-500 cursor-pointer shadow-sm w-full text-sm sm:text-base transition-all duration-200 hover:border-emerald-400"
            >
              <option value="Completed">Completed</option>
              <option value="Pending">Pending</option>
              <option value="Cancelled">Cancelled</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 sm:px-3 text-gray-700">
              <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
          </div>
        </div>

        {/* Mobile Cards View (xs to sm) */}
        <div className="block lg:hidden space-y-4">
          {isLoading || loading ? (
            [...Array(3)].map((_, i) => (
              <div
                key={i}
                className="bg-gradient-to-br from-teal-50 to-white border border-teal-100 rounded-xl p-4 shadow-md flex flex-col gap-3 animate-pulse"
              >
                <div className="flex justify-between items-center">
                  <div className="h-4 w-16 bg-gray-200 rounded"></div>
                  <div className="h-4 w-20 bg-gray-200 rounded"></div>
                </div>
                <div className="h-3 w-2/3 bg-gray-200 rounded"></div>
                <div className="h-3 w-1/2 bg-gray-200 rounded"></div>
              </div>
            ))
          ) : TableData.length === 0 ? (
            <div className="bg-gradient-to-br from-teal-50 to-white border border-teal-100 rounded-xl p-6 text-center shadow-md">
              <p className="text-base text-teal-700 font-semibold">
                No buy history found.
              </p>
            </div>
          ) : (
            TableData.map((data, i) => (
              <div
                key={i}
                className="relative bg-gradient-to-br from-white via-teal-50 to-white border border-teal-200 rounded-xl p-4 shadow-md hover:shadow-lg transition-all duration-200 group overflow-hidden"
              >
                {/* Decorative accent bar */}
                <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-teal-400 to-teal-600 opacity-80"></div>

                {/* Card Content */}
                <div className="relative z-10">
                  {/* Header */}
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-bold text-teal-700 tracking-wide">
                      #
                      {(state?.currentPage - 1) * parseInt(state?.perPage) +
                        i +
                        1}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded-full text-xs font-semibold border ${getStatusClasses(
                        data?.status
                      )}`}
                    >
                      {data?.status}
                    </span>
                  </div>

                  {/* Transaction ID */}
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center">
                      <CreditCard className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-xs text-gray-500">Txn:</span>
                    <span className="text-xs font-medium text-gray-800 truncate">
                      {data?.paypalTransactionId ||
                        data?.transactionId || data?.orderId ||
                        "N/A"}
                    </span>
                  </div>

                  {/* Info Grid */}
                  <div className="grid grid-cols-2 gap-2 text-xs mb-2">
                    <div className="flex items-center gap-1 bg-teal-50 rounded px-2 py-1">
                      <span className="text-teal-700 font-semibold">Pay:</span>
                      <span className="text-gray-800">
                        {data?.paymentMethod || "N/A"}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 bg-teal-50 rounded px-2 py-1">
                      <span className="text-teal-700 font-semibold">Cur:</span>
                      <span className="text-gray-800">
                        {data?.currency || "N/A"}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 bg-teal-50 rounded px-2 py-1">
                      <TrendingUp className="w-3 h-3 text-emerald-600" />
                      <span className="text-emerald-700 font-semibold">
                        {data?.jaimax?.toFixed(3) || "N/A"}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 bg-teal-50 rounded px-2 py-1">
                      <span className="text-teal-700 font-semibold">
                        Round:
                      </span>
                      <span className="text-gray-800">
                        {data?.round || "N/A"}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 bg-teal-50 rounded px-2 py-1">
                      <span className="text-teal-700 font-semibold">INR:</span>
                      <span className="text-gray-800">
                        {data?.atPriceInr || "N/A"}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 bg-teal-50 rounded px-2 py-1">
                      <span className="text-teal-700 font-semibold">USD:</span>
                      <span className="text-gray-800">
                        {data?.atPriceUsdt || "N/A"}
                      </span>
                    </div>
                  </div>

                  {/* Amount */}
                  <div className="flex items-center justify-between p-3 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-lg mb-2 shadow">
                    <span className="text-xs font-semibold text-white">
                      Amount
                    </span>
                    <span className="text-lg font-bold text-white">
                      {data.currency === "INR"
                        ? `₹${data.amount?.toFixed(2) || "0.00"}`
                        : `$${data.amount?.toFixed(2) || "0.00"}`}
                    </span>
                  </div>

                  {/* Date */}
                  <div className="flex items-center gap-2 text-xs text-teal-700 mt-1">
                    <Calendar className="w-4 h-4 text-teal-400" />
                    <span>
                      {data?.createdAt
                        ? formatDateWithAmPm(data?.createdAt)
                        : "N/A"}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        {/* Tablet Cards View (sm to lg) */}

        {/* Desktop Table View (lg and above) */}
        <div className="hidden lg:block">
          <div className="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-lg">
            <div className="overflow-x-auto">
              <table className="w-full table-auto">
                <thead className="bg-[#1d8e85]">
                  <tr className="text-white text-sm">
                    <th className="px-3 py-4 text-center min-w-[60px] font-semibold">
                      S.No
                    </th>
                    <th className="px-3 py-4 text-center min-w-[160px] font-semibold">
                      Transaction ID
                    </th>
                    <th className="px-3 py-4 text-center min-w-[100px] font-semibold">
                      Payment Mode
                    </th>
                    <th className="px-3 py-4 text-center min-w-[100px] font-semibold">
                      JaiMax Coin
                    </th>
                    <th className="px-3 py-4 text-center min-w-[100px] font-semibold">
                      Charges
                    </th>
                    
                    <th className="px-3 py-4 text-center min-w-[90px] font-semibold">
                      INR Price
                    </th>
                    <th className="px-3 py-4 text-center min-w-[90px] font-semibold">
                      USD Price
                    </th>
                    <th className="px-3 py-4 text-center min-w-[70px] font-semibold">
                      Round
                    </th>
                    <th className="px-3 py-4 text-center min-w-[90px] font-semibold">
                      Currency
                    </th>
                    <th className="px-3 py-4 text-center min-w-[100px] font-semibold">
                      Amount
                    </th>
                    <th className="px-3 py-4 text-center min-w-[140px] font-semibold">
                      Purchase Date
                    </th>
                    <th className="px-3 py-4 text-center min-w-[90px] font-semibold">
                      Status
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-200">
                  {isLoading || loading ? (
                    [...Array(parseInt(state.perPage))].map((_, i) => (
                      <tr key={i}>
                        {[...Array(11)].map((_, j) => (
                          <td key={j} className="px-3 py-4">
                            <div
                              className="h-4 bg-gray-100 rounded animate-pulse mx-auto"
                              style={{ width: j === 1 ? "120px" : "60px" }}
                            ></div>
                          </td>
                        ))}
                      </tr>
                    ))
                  ) : TableData.length === 0 ? (
                    <tr>
                      <td
                        colSpan="11"
                        className="px-3 py-8 text-center text-gray-500 text-lg"
                      >
                        No buy history found.
                      </td>
                    </tr>
                  ) : (
                    TableData.map((data, i) => (
                      <tr
                        key={i}
                        className="text-gray-800 hover:bg-gray-50 transition-colors duration-150 text-center"
                      >
                        <td className="px-3 py-4 text-sm font-medium">
                          {(state?.currentPage - 1) * parseInt(state.perPage) +
                            i +
                            1}
                        </td>
                        <td className="px-3 py-4 font-semibold text-xs whitespace-nowrap ">
                          {data?.paypalTransactionId ||
                            data?.transactionId ||
                            "N/A"}
                        </td>
                        {console.log(data?.transactionId)}
                        <td className="px-3 py-4 font-semibold capitalize text-sm whitespace-nowrap">
                          {data?.paymentMethod || "N/A"}
                        </td>
                        <td className="px-3 py-4 font-semibold text-sm whitespace-nowrap">
                          {data?.jaimax?.toFixed(3) || "N/A"}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-teal-600 font-semibold">
                    {(
                      Number(data?.jmcTds) +
                      Number(data?.jaimaxPlatformFee) +
                      Number(data?.bscTds) +
                      Number(data?.platformFee)
                    ).toFixed(4)}
                  </td>
                        <td className="px-3 py-4 font-semibold text-sm whitespace-nowrap">
                          {data?.atPriceInr || "N/A"}
                        </td>
                        <td className="px-3 py-4 font-semibold text-sm whitespace-nowrap">
                          {data?.atPriceUsdt || "N/A"}
                        </td>
                        <td className="px-3 py-4 font-semibold text-sm whitespace-nowrap">
                          {data?.round || "N/A"}
                        </td>
                        <td className="px-3 py-4 font-semibold text-sm whitespace-nowrap">
                          {data?.currency || "N/A"}
                        </td>
                        <td className="px-3 py-4 font-semibold text-sm whitespace-nowrap text-emerald-700">
                          {data.currency === "INR"
                            ? `₹${data.amount?.toFixed(2) || "0.00"}`
                            : `$${data.amount?.toFixed(2) || "0.00"}`}
                        </td>
                        <td className="px-3 py-4 text-sm font-medium whitespace-nowrap">
                          {data?.createdAt
                            ? formatDateWithAmPm(data?.createdAt)
                            : "N/A"}
                        </td>
                        <td className="px-3 py-4">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${getStatusClasses(
                              data?.status
                            )}`}
                          >
                            {data?.status}
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Pagination */}
        {buyDetails?.data?.pagination?.totalPages > 1 && (
          <div className="flex justify-center mt-6 lg:mt-8">
            <Pagination
              currentPage={state.currentPage}
              totalPages={buyDetails?.data?.pagination?.totalPages || 1}
              onPageChange={(page) =>
                setState((prev) => ({ ...prev, currentPage: page }))
              }
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default BuyHistory;
