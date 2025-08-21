import React, { useState, useEffect } from "react";
import {
  Search,
  Share2,
  Copy,
  ShoppingBag,
  ChevronLeft,
  ChevronRight,
  Wallet,
  ExternalLink,
  Menu,
  X,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  useAvailableBalanceQuery,
  useWalletTransactionsListQuery,
} from "./walletApiSlice";
import Cookies from "js-cookie";
import Loader from "../../../Loader/loader";
import ReferralModal from "../../modals/referalModal";
const ITEMS_PER_PAGE_OPTIONS = [10, 30, 50];

// Copy to Clipboard Button Component
const CopyToClipboardButton = ({ textToCopy, isMobile = false }) => {
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(textToCopy);
      // console.log('Text copied to clipboard!');
    } catch (error) {
      // console.error('Failed to copy text:', error);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className={`bg-teal-600 hover:bg-teal-700 text-white transition-colors duration-200 flex items-center space-x-2 shadow-md rounded-full ${
        isMobile ? "text-xs px-3 py-1.5" : "text-xs px-4 py-2"
      }`}
    >
      <Copy className={`${isMobile ? "w-3 h-3" : "w-4 h-4"}`} />
      <span className={isMobile ? "hidden xs:inline" : ""}>Copy</span>
    </button>
  );
};

export default function WalletDashboard() {
  const [state, setState] = useState({
    currentPage: 1,
    perPage: 10,
    search: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [availableWalletBalance, setAvailableWalletBalance] = useState(0);
  const [showReferralModal, setShowReferralModal] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigate = useNavigate();

  // Get user data from localStorage
  // const userData = Cookies.get("userData") ;
  const rawUserData = Cookies.get("userData"); // comes as string or undefined
  let userData = null;

  if (rawUserData) {
    try {
      userData = JSON.parse(rawUserData);
      console.log("Parsed userData:", userData);
    } catch (error) {
      console.error("Error parsing userData cookie:", error);
    }
  }
  const countryCode = userData?.data?.countryCode;
  const REGISTER_REFERAL = `${window.location.origin}/register?referralCode=`;

  // Construct query parameters for API
  const queryParams = `limit=${state?.perPage || ""}&page=${
    state?.currentPage || ""
  }&search=${state?.search || ""}`;

  // API calls
  const {
    data: walletTransactionsList,
    isLoading: transactionsLoading,
    refetch: refetchWalletTransactions,
  } = useWalletTransactionsListQuery(queryParams);

  const { data: availableBalance, refetch: refetchAvailableBalance } =
    useAvailableBalanceQuery();

  // Get transaction data from API response
  const transactionData = walletTransactionsList?.data?.transactions || [];
  const totalTransactions = walletTransactionsList?.data?.total || 0;

  // Calculate pagination
  const totalPages = Math.ceil(totalTransactions / state.perPage);

  // Referral content for sharing
  const referralContent = `
  🚀 Join the Jaimax Coin Revolution! 🚀
  
  Hey there! 🌟
  
  I'm excited to introduce you to Jaimax Coin – the future of cryptocurrency! 💰✨ It's a fast, secure, and innovative digital currency that offers amazing opportunities for everyone. Whether you're new to crypto or a seasoned investor, Jaimax Coin is designed to bring you great value. 🌍🔗
  
  Don't miss out on this chance to be part of something BIG! 💥
  
  👉 ${REGISTER_REFERAL + userData?.data?.username}
  
  #JaimaxCoin #CryptoRevolution #JoinUs #FutureOfFinance`;

  // Effects
  useEffect(() => {
    refetchWalletTransactions();
    refetchAvailableBalance();
  }, []);

  useEffect(() => {
    setAvailableWalletBalance(
      +availableBalance?.data?.totalAvailableBalance || 0
    );
  }, [availableBalance]);

  useEffect(() => {
    setIsLoading(false);
  }, [walletTransactionsList?.data?.transactions]);

  // Search handler with debounce
  let searchTimeout;
  const handleSearch = (e) => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
      setState({ ...state, search: e.target.value, currentPage: 1 });
    }, 1000);
  };

  // Pagination handlers
  const handlePageChange = (page) => {
    setIsLoading(true);
    setState({ ...state, currentPage: page });
  };

  const handlePrevPage = () => {
    if (state.currentPage > 1) {
      handlePageChange(state.currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (state.currentPage < totalPages) {
      handlePageChange(state.currentPage + 1);
    }
  };

  // Per page handler
  const handlePerPageChange = (newPerPage) => {
    setState({
      ...state,
      perPage: newPerPage,
      currentPage: 1,
    });
  };

  // Format date function
  const formatDateWithAmPm = (isoString) => {
    if (!isoString) return "N/A";
    const date = new Date(isoString);
    const day = String(date.getUTCDate()).padStart(2, "0");
    const month = String(date.getUTCMonth() + 1).padStart(2, "0");
    const year = date.getUTCFullYear();
    let hours = date.getUTCHours();
    const minutes = String(date.getUTCMinutes()).padStart(2, "0");
    const amAndPm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;
    return `${day}-${month}-${year} ${hours}:${minutes} ${amAndPm}`;
  };

  // Format currency
  const formatCurrency = (amount) => {
    const currencySymbol = countryCode === 91 ? "₹" : "$";
    return `${currencySymbol}${parseFloat(amount).toFixed(2)}`;
  };

  // Navigation to add funds
  const onClickAddMoney = () => {
    navigate("/add-funds");
  };

  // Handle share referral code
  const handleShareReferral = () => {
    setShowReferralModal(true);
  };

  // Status badge component
  const StatusBadge = ({ status }) => {
    const getStatusClass = (status) => {
      switch (status?.toLowerCase()) {
        case "completed":
          return "bg-green-100 text-green-800";
        case "pending":
          return "bg-yellow-100 text-yellow-800";
        case "failed":
          return "bg-red-100 text-red-800";
        default:
          return "bg-gray-100 text-gray-800";
      }
    };

    return (
      <span
        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusClass(
          status
        )}`}
      >
        {status || "N/A"}
      </span>
    );
  };

  // Mobile transaction card component
  const TransactionCard = ({ transaction, index }) => (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200 border border-teal-100 overflow-hidden group hover:border-teal-200">
      {/* Compact Header */}
      <div className="bg-gradient-to-r from-teal-50 to-teal-100 px-3 py-2 border-b border-teal-100">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2 flex-1 min-w-0">
            <div className="w-1.5 h-1.5 bg-teal-500 rounded-full"></div>
            <h3 className="font-semibold text-teal-800 text-sm truncate">
              Transaction {(state.currentPage - 1) * state.perPage + index + 1}
            </h3>
            {transaction.screenshotUrl && (
              <a
                href={transaction.screenshotUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-teal-600 hover:text-teal-800 transition-colors"
              >
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </div>
          <StatusBadge status={transaction.transactionStatus} />
        </div>
      </div>

      {/* Amount Section */}
      <div className="px-3 py-2 bg-gradient-to-r from-teal-500 to-teal-600 text-white">
        <div className="text-center">
          <p className="text-lg font-bold">{transaction.transactionAmount}</p>
        </div>
      </div>

      {/* Compact Details */}
      <div className="p-3 space-y-2">
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="bg-teal-50 rounded px-2 py-1">
            <span className="text-teal-600 font-medium">Type:</span>
            <p className="font-semibold text-teal-800 truncate">
              {transaction.transactionType || "N/A"}
            </p>
          </div>
          <div className="bg-teal-50 rounded px-2 py-1">
            <span className="text-teal-600 font-medium">Payment:</span>
            <p className="font-semibold text-teal-800 truncate">
              {transaction.paymentMode || "N/A"}
            </p>
          </div>
          <div className="bg-teal-50 rounded px-2 py-1">
            <span className="text-teal-600 font-medium">Currency:</span>
            <p className="font-semibold text-teal-800">
              {transaction.currency || "N/A"}
            </p>
          </div>
          {countryCode !== 91 && (
            <div className="bg-teal-50 rounded px-2 py-1">
              <span className="text-teal-600 font-medium">Fee:</span>
              <p className="font-semibold text-teal-800">
                {(transaction.transactionFee || 0).toFixed(2)}
              </p>
            </div>
          )}
        </div>

        {/* Bottom Info */}
        <div className="pt-2 border-t border-gray-100 space-y-1 text-xs">
          <div className="flex justify-between">
            <span className="text-gray-600">Date:</span>
            <span className="font-medium text-gray-800">
              {formatDateWithAmPm(transaction.transactionDate)}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">ID:</span>
            <span className="font-mono text-gray-800 text-xs truncate ml-2">
              {transaction.transactionId || "N/A"}
            </span>
          </div>
          <div>
            <span className="text-gray-600">Reason:</span>
            <p className="text-gray-800 break-words mt-1">
              {transaction.reason || "N/A"}
            </p>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Updated by:</span>
            <span className="font-medium text-gray-800">
              {transaction.updatedBy?.name || "N/A"}
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Accent */}
      <div className="h-0.5 bg-gradient-to-r from-teal-400 to-teal-600"></div>
    </div>
  );

  // Loading skeleton component
  const SkeletonRow = () => (
    <tr>
      {Array.from({ length: countryCode !== 91 ? 12 : 11 }).map((_, i) => (
        <td key={i} className="px-2 sm:px-3 py-3">
          <div className="animate-pulse h-4 bg-gray-200 rounded w-full"></div>
        </td>
      ))}
    </tr>
  );

  // Mobile loading skeleton
  const MobileSkeletonCard = () => (
    <div className="bg-white rounded-lg shadow-md p-3 sm:p-4 border border-teal-100">
      <div className="animate-pulse space-y-3">
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        <div className="grid grid-cols-1 xs:grid-cols-2 gap-3">
          {Array.from({ length: 4 }).map((_, j) => (
            <div key={j} className="h-3 bg-gray-200 rounded"></div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-teal-50 p-2 sm:p-4">
      <div className="max-w-9xl mx-auto space-y-4 sm:space-y-6">
        {/* Top Section - Wallet Balance and Referral */}
        <div className="flex flex-col xl:flex-row gap-4">
          {/* Wallet Balance Card */}
          <div className="flex-1 bg-gradient-to-r from-teal-600 to-teal-700 rounded-xl sm:rounded-2xl p-4 sm:p-6 text-white shadow-xl border border-teal-200">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
              <div className="flex items-center space-x-3 sm:space-x-4">
                <div className="bg-white/20 rounded-full p-2 sm:p-3 flex-shrink-0">
                  <Wallet className="w-6 h-6 sm:w-8 sm:h-8" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-teal-100 text-sm font-medium">
                    Wallet Balance
                  </p>
                  {transactionsLoading ? (
                    <div className="animate-pulse h-6 sm:h-8 bg-white/20 rounded w-24 mt-1"></div>
                  ) : (
                    <p className="text-2xl sm:text-3xl font-bold truncate">
                      {availableWalletBalance}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex flex-col sm:text-right">
                <p className="text-teal-100 text-sm mb-2">
                  Add Money to Wallet
                </p>
                <button
                  className="bg-white hover:bg-gray-50 text-teal-700 px-4 sm:px-6 py-2 sm:py-3 rounded-full font-semibold transition-colors duration-200 shadow-md uppercase text-sm"
                  onClick={onClickAddMoney}
                >
                  Add Funds
                </button>
              </div>
            </div>
          </div>

          {/* Referral Code Card */}
          <div className="xl:w-80 bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-xl">
            <div className="space-y-3">
              <p className="text-teal-600 text-sm font-medium">Referral Code</p>
              <div className="flex items-center justify-between bg-gray-50 rounded-lg p-3 gap-2">
                <span className="text-sm font-bold tracking-wider text-teal-800 flex-1 truncate">
                  {userData?.username || "N/A"}
                </span>

                {console.log(userData?.username, "data is coming")}
                <div className="flex items-center space-x-2 flex-shrink-0">
                  <button
                    onClick={handleShareReferral}
                    className="text-teal-600 hover:text-teal-800 transition-colors duration-200 p-1 rounded-full hover:bg-teal-100"
                  >
                    <Share2 className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                  <CopyToClipboardButton
                    textToCopy={referralContent}
                    isMobile={true}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Transaction Details Section */}
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl overflow-hidden border border-teal-100">
          <div className="p-4 sm:p-6 border-b border-teal-100 bg-teal-50">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
              <h2 className="text-xl sm:text-2xl font-bold text-teal-800">
                Total Transaction Details
              </h2>

              {/* Search Bar */}
              <div className="relative w-full sm:w-64">
                <input
                  type="text"
                  // value={searchTerm}
                  placeholder="Search"
                  className="w-full h-10 bg-white border border-gray-300 rounded-lg pl-10 pr-4 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all duration-200 text-sm shadow-sm hover:border-gray-400"
                  onChange={handleSearch}
                />
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
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
          </div>

          {/* Mobile Card View */}
          <div className="block lg:hidden p-3 sm:p-4">
            {transactionsLoading ? (
              <div className="space-y-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <MobileSkeletonCard key={i} />
                ))}
              </div>
            ) : transactionData.length > 0 ? (
              <div className="space-y-3 sm:space-y-4">
                {transactionData.map((transaction, index) => (
                  <TransactionCard
                    key={transaction.id || index}
                    transaction={transaction}
                    index={index}
                  />
                ))}
              </div>
            ) : (
              <div className="py-8 sm:py-12 text-center text-teal-500">
                <ShoppingBag className="w-10 h-10 sm:w-12 sm:h-12 text-teal-400 mx-auto mb-4" />
                <p className="text-lg font-medium text-teal-700">
                  No transactions found
                </p>
              </div>
            )}
          </div>

          {/* Desktop Table View */}
          <div className="hidden lg:block overflow-x-auto">
            {transactionData.length > 0 || transactionsLoading ? (
              <table className="min-w-full divide-y divide-teal-100">
                <thead className="bg-teal-600 text-xs font-semibold text-white">
                  <tr>
                    <th className="px-2 xl:px-3 py-3 text-left uppercase">
                      S.No
                    </th>
                    <th className="px-2 xl:px-3 py-3 text-left uppercase">
                      Transaction ID
                    </th>
                    <th className="px-2 xl:px-3 py-3 text-left uppercase">
                      Amount
                    </th>
                    {countryCode !== 91 && (
                      <th className="px-2 xl:px-3 py-3 text-left uppercase">
                        Fee
                      </th>
                    )}
                    <th className="px-2 xl:px-3 py-3 text-left uppercase">
                      Type
                    </th>
                    <th className="px-2 xl:px-3 py-3 text-left uppercase">
                      Payment
                    </th>
                    <th className="px-2 xl:px-3 py-3 text-left uppercase">
                      Currency
                    </th>
                    <th className="px-2 xl:px-3 py-3 text-left uppercase">
                      Date
                    </th>
                    <th className="px-2 xl:px-3 py-3 text-left uppercase">
                      Status
                    </th>
                    <th className="px-2 xl:px-3 py-3 text-left uppercase">
                      Reason
                    </th>
                    <th className="px-2 xl:px-3 py-3 text-left uppercase">
                      Updated By
                    </th>
                    <th className="px-2 xl:px-3 py-3 text-left uppercase">
                      Updated On
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-teal-100">
                  {transactionsLoading
                    ? Array.from({ length: 10 }).map((_, i) => (
                        <SkeletonRow key={i} />
                      ))
                    : transactionData.map((transaction, index) => (
                        <tr
                          key={transaction.id || index}
                          className="hover:bg-teal-50 transition-colors duration-150 text-xs"
                        >
                          <td className="px-2 xl:px-3 py-3 whitespace-nowrap text-gray-900">
                            {(state.currentPage - 1) * state.perPage +
                              index +
                              1}
                          </td>
                          <td className="px-2 xl:px-3 py-3 whitespace-nowrap  text-gray-900">
                            {transaction.screenshotUrl ? (
                              <a
                                href={transaction.screenshotUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-teal-600 hover:text-teal-800 flex items-center space-x-1"
                              >
                                <span className="truncate max-w-24 xl:max-w-32">
                                  {transaction.transactionId || "N/A"}
                                </span>
                                <ExternalLink className="w-3 h-3 flex-shrink-0" />
                              </a>
                            ) : (
                              <span className="truncate max-w-24 xl:max-w-32 block">
                                {transaction.transactionId || "N/A"}
                              </span>
                            )}
                          </td>
                          <td className="px-2 xl:px-3 py-3 whitespace-nowrap font-semibold text-teal-700">
                            {transaction.transactionAmount}
                          </td>
                          {countryCode !== 91 && (
                            <td className="px-2 xl:px-3 py-3 whitespace-nowrap text-gray-900">
                              {(transaction.transactionFee || 0).toFixed(2)}
                            </td>
                          )}
                          <td className="px-2 xl:px-3 py-3 whitespace-nowrap text-gray-900">
                            <span className="truncate max-w-16 xl:max-w-24 block">
                              {transaction.transactionType || "N/A"}
                            </span>
                          </td>
                          <td className="px-2 xl:px-3 py-3 whitespace-nowrap text-gray-900">
                            <span className="truncate max-w-16 xl:max-w-24 block">
                              {transaction.paymentMode || "N/A"}
                            </span>
                          </td>
                          <td className="px-2 xl:px-3 py-3 whitespace-nowrap text-gray-900">
                            {transaction.currency || "N/A"}
                          </td>
                          <td className="px-2 xl:px-3 py-3 whitespace-nowrap text-gray-900">
                            <span className="truncate max-w-20 xl:max-w-32 block">
                              {formatDateWithAmPm(transaction.transactionDate)}
                            </span>
                          </td>
                          <td className="px-2 xl:px-3 py-3 whitespace-nowrap">
                            <span
                              className="text-capitalize font-bold"
                              style={{
                                color:
                                  transaction?.transactionStatus?.toLowerCase() ===
                                  "pending"
                                    ? "#daa520"
                                    : transaction?.transactionStatus ===
                                      "Completed"
                                    ? "green"
                                    : "red",
                              }}
                            >
                              {transaction?.transactionStatus}
                            </span>
                          </td>
                          <td
                            className="px-2 xl:px-3 py-3 text-gray-900 max-w-20 xl:max-w-32 truncate"
                            title={transaction?.reason}
                          >
                            {transaction?.reason || "N/A"}
                          </td>
                          <td className="px-2 xl:px-3 py-3 whitespace-nowrap text-gray-900">
                            <span className="truncate max-w-16 xl:max-w-24 block">
                              {transaction?.updatedBy?.name || "N/A"}
                            </span>
                          </td>
                          <td className="px-2 xl:px-3 py-3 whitespace-nowrap text-gray-900">
                            <span className="truncate max-w-20 xl:max-w-32 block">
                              {formatDateWithAmPm(transaction?.updatedOn)}
                            </span>
                          </td>
                        </tr>
                      ))}
                </tbody>
              </table>
            ) : (
              <div className="px-6 py-12 text-center text-teal-500">
                <div className="flex flex-col items-center space-y-2">
                  <ShoppingBag className="w-12 h-12 text-teal-400" />
                  <p className="text-lg font-medium text-teal-700">
                    No transactions found
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Pagination and Per Page Selector */}
          <div className="px-3 sm:px-6 py-4 bg-gray-50 border-t border-teal-100">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
              <div className="flex flex-col xs:flex-row xs:items-center space-y-2 xs:space-y-0 xs:space-x-4">
                {/* Per Page Selector */}
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-700 whitespace-nowrap">
                    Show:
                  </span>
                  <select
                    className="bg-white text-teal-800 border-2 border-teal-200 rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-sm"
                    value={state.perPage}
                    onChange={(e) =>
                      handlePerPageChange(parseInt(e.target.value))
                    }
                  >
                    {ITEMS_PER_PAGE_OPTIONS.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>

                {totalTransactions > 0 && (
                  <div className="text-sm text-gray-700">
                    <span className="hidden sm:inline">
                      Showing {(state.currentPage - 1) * state.perPage + 1} to{" "}
                      {Math.min(
                        state.currentPage * state.perPage,
                        totalTransactions
                      )}{" "}
                      of {totalTransactions} transactions
                    </span>
                    <span className="sm:hidden">
                      {(state.currentPage - 1) * state.perPage + 1}-
                      {Math.min(
                        state.currentPage * state.perPage,
                        totalTransactions
                      )}{" "}
                      of {totalTransactions}
                    </span>
                  </div>
                )}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center sm:justify-end space-x-2">
                  <button
                    onClick={handlePrevPage}
                    disabled={state.currentPage === 1}
                    className={`flex items-center px-2 sm:px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
                      state.currentPage === 1
                        ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                        : "bg-teal-600 text-white hover:bg-teal-700"
                    }`}
                  >
                    <ChevronLeft className="w-4 h-4 sm:mr-1" />
                    <span className="hidden sm:inline">Previous</span>
                  </button>

                  <span className="text-sm text-gray-700 px-2 whitespace-nowrap">
                    <span className="hidden sm:inline">Page </span>
                    {state.currentPage} of {totalPages}
                  </span>

                  <button
                    onClick={handleNextPage}
                    disabled={state.currentPage === totalPages}
                    className={`flex items-center px-2 sm:px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
                      state.currentPage === totalPages
                        ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                        : "bg-teal-600 text-white hover:bg-teal-700"
                    }`}
                  >
                    <span className="hidden sm:inline">Next</span>
                    <ChevronRight className="w-4 h-4 sm:ml-1" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Referral Modal */}
      {showReferralModal && (
        <ReferralModal
          show={showReferralModal}
          onHide={() => setShowReferralModal(false)}
          userData={userData}
          referralContent={referralContent}
        />
      )}

      {/* Loader */}
      {(transactionsLoading || isLoading) && <Loader />}
    </div>
  );
}
