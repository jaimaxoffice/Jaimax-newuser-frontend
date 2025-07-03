import React, { useState, useEffect } from 'react';
import { Search, Share2, Copy, ShoppingBag, ChevronLeft, ChevronRight, Wallet, ExternalLink } from 'lucide-react';
import { useNavigate } from "react-router-dom";
import {
  useAvailableBalanceQuery,
  useWalletTransactionsListQuery,
} from "./walletApiSlice";

const ITEMS_PER_PAGE_OPTIONS = [10, 30, 50];

// Referral Modal Component
const ReferralModal = ({ show, onHide, userData, referralContent }) => {
  if (!show) return null;

  const handleCopyContent = async () => {
    try {
      await navigator.clipboard.writeText(referralContent);
      console.log('Referral content copied to clipboard!');
    } catch (error) {
      console.error('Failed to copy referral content:', error);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Join Jaimax Coin',
          text: referralContent,
          url: window.location.href,
        });
      } catch (error) {
        console.error('Failed to share:', error);
      }
    } else {
      handleCopyContent();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-teal-800">Share Referral</h3>
          <button 
            onClick={onHide}
            className="text-gray-500 hover:text-gray-700 text-xl"
          >
            ×
          </button>
        </div>
        <div className="mb-4">
          <textarea 
            value={referralContent}
            readOnly
            className="w-full h-32 p-3 border border-gray-300 rounded-lg text-sm resize-none"
          />
        </div>
        <div className="flex space-x-3">
          <button
            onClick={handleCopyContent}
            className="flex-1 bg-teal-600 text-white py-2 px-4 rounded-lg hover:bg-teal-700 transition-colors"
          >
            Copy Content
          </button>
          <button
            onClick={handleShare}
            className="flex-1 bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition-colors"
          >
            Share
          </button>
        </div>
      </div>
    </div>
  );
};

// Copy to Clipboard Button Component
const CopyToClipboardButton = ({ textToCopy, styles = {} }) => {
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(textToCopy);
      console.log('Text copied to clipboard!');
    } catch (error) {
      console.error('Failed to copy text:', error);
    }
  };

  return (
    <button
      onClick={handleCopy}
      style={styles}
      className="bg-teal-600 hover:bg-teal-700 text-white text-xs px-4 py-2 rounded-full transition-colors duration-200 flex items-center space-x-2 shadow-md"
    >
      <Copy className="w-4 h-4" />
      <span>Copy</span>
    </button>
  );
};

// Loader Component
const Loader = () => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white rounded-lg p-6">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto"></div>
      <p className="mt-4 text-teal-800 font-medium">Loading...</p>
    </div>
  </div>
);

export default function WalletDashboard() {
  const [state, setState] = useState({
    currentPage: 1,
    perPage: 10,
    search: "",
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [availableWalletBalance, setAvailableWalletBalance] = useState(0);
  const [showReferralModal, setShowReferralModal] = useState(false);
  
  const navigate = useNavigate();

  // Get user data from localStorage
  const userData = localStorage.getItem("userData") && JSON.parse(localStorage.getItem("userData"));
  const countryCode = userData?.data?.countryCode;
  const REGISTER_REFERAL = `${window.location.origin}/register?referralCode=`;

  // Construct query parameters for API
  const queryParams = `limit=${state?.perPage || ""}&page=${state?.currentPage || ""}&search=${state?.search || ""}`;

  // API calls
  const {
    data: walletTransactionsList,
    isLoading: transactionsLoading,
    refetch: refetchWalletTransactions,
  } = useWalletTransactionsListQuery(queryParams);

  const { 
    data: availableBalance, 
    refetch: refetchAvailableBalance 
  } = useAvailableBalanceQuery();

  // Get transaction data from API response
  const transactionData = walletTransactionsList?.data?.transactions || [];
  const totalTransactions = walletTransactionsList?.data?.total || 0;

  // Calculate pagination
  const totalPages = Math.ceil(totalTransactions / state.perPage);

  // Referral content for sharing (from first file)
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

  // Search handler with debounce (from first file)
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

  // Format date function (from first file)
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
    navigate("/wallet/add-funds");
    // console.log("Navigate to add funds page");
  };

  // Handle share referral code
  const handleShareReferral = () => {
    setShowReferralModal(true);
  };

  // Status badge component
  const StatusBadge = ({ status }) => {
    const getStatusClass = (status) => {
      switch (status?.toLowerCase()) {
        case 'completed':
          return 'bg-green-100 text-green-800';
        case 'pending':
          return 'bg-yellow-100 text-yellow-800';
        case 'failed':
          return 'bg-red-100 text-red-800';
        default:
          return 'bg-gray-100 text-gray-800';
      }
    };

    return (
      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusClass(status)}`}>
        {status || 'N/A'}
      </span>
    );
  };

  // Mobile transaction card component
  const TransactionCard = ({ transaction, index }) => (
    <div className="bg-white rounded-lg shadow-md p-4 border border-teal-100 hover:shadow-lg transition-shadow duration-200">
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1">
          <h3 className="font-semibold text-teal-800 text-sm mb-1">
            Transaction #{(state.currentPage - 1) * state.perPage + index + 1}
          </h3>
          <div className="flex items-center space-x-2">
            <p className="text-xs text-gray-600 font-mono">
              {transaction.transactionId || "N/A"}
            </p>
            {transaction.screenshotUrl && (
              <a 
                href={transaction.screenshotUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-teal-600 hover:text-teal-800"
              >
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </div>
        </div>
        <StatusBadge status={transaction.transactionStatus} />
      </div>

      <div className="grid grid-cols-2 gap-3 text-sm">
        <div>
          <span className="text-gray-600">Amount:</span>
          <p className="font-semibold text-teal-700">
            {formatCurrency(transaction.transactionAmount)}
          </p>
        </div>
        <div>
          <span className="text-gray-600">Type:</span>
          <p className="font-medium">{transaction.transactionType || "N/A"}</p>
        </div>
        <div>
          <span className="text-gray-600">Payment:</span>
          <p className="font-medium">{transaction.paymentMode || "N/A"}</p>
        </div>
        <div>
          <span className="text-gray-600">Currency:</span>
          <p className="font-medium">{transaction.currency || "N/A"}</p>
        </div>
        {countryCode !== 91 && (
          <div className="col-span-2">
            <span className="text-gray-600">Fee:</span>
            <p className="font-medium">${(transaction.transactionFee || 0).toFixed(2)}</p>
          </div>
        )}
      </div>

      <div className="mt-3 pt-3 border-t border-gray-100">
        <div className="text-xs text-gray-600">
          <p><strong>Date:</strong> {formatDateWithAmPm(transaction.transactionDate)}</p>
          <p><strong>Reason:</strong> {transaction.reason || "N/A"}</p>
          <p><strong>Updated by:</strong> {transaction.updatedBy?.name || "N/A"}</p>
        </div>
      </div>
    </div>
  );

  // Loading skeleton component
  const SkeletonRow = () => (
    <tr>
      {Array.from({ length: countryCode !== 91 ? 12 : 11 }).map((_, i) => (
        <td key={i} className="px-3 py-3">
          <div className="animate-pulse h-4 bg-gray-200 rounded w-full"></div>
        </td>
      ))}
    </tr>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-teal-50 p-4">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* Top Section - Wallet Balance and Referral */}
        <div className="flex flex-col lg:flex-row gap-4">

          {/* Wallet Balance Card */}
          <div className="flex-1 bg-gradient-to-r from-teal-600 to-teal-700 rounded-2xl p-6 text-white shadow-xl border border-teal-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="bg-white/20 rounded-full p-3">
                  <Wallet className="w-8 h-8" />
                </div>
                <div>
                  <p className="text-teal-100 text-sm font-medium">Wallet Balance</p>
                  {transactionsLoading ? (
                    <div className="animate-pulse h-8 bg-white/20 rounded w-24 mt-1"></div>
                  ) : (
                    <p className="text-3xl font-bold">{formatCurrency(availableWalletBalance)}</p>
                  )}
                </div>
              </div>
              <div className="text-right">
                <p className="text-teal-100 text-sm mb-2">Add Money to Wallet</p>
                <button 
                  className="bg-white hover:bg-gray-50 text-teal-700 px-6 py-3 rounded-full font-semibold transition-colors duration-200 shadow-md uppercase"
                  onClick={onClickAddMoney}
                >
                  Add Funds
                </button>
              </div>
            </div>
          </div>

          {/* Referral Code Card */}
          <div className="lg:w-80 bg-white rounded-2xl p-6 shadow-xl">
            <div className="space-y-3">
              <p className="text-teal-600 text-sm font-medium">Referral Code</p>
              <div className="flex items-center justify-between bg-gray-50 rounded-lg p-3">
                <span className="text-sm font-bold tracking-wider text-teal-800 flex-1">
                  {userData?.data?.username || "N/A"}
                </span>
                <div className="flex items-center space-x-2">
                  <button 
                    onClick={handleShareReferral} 
                    className="text-teal-600 hover:text-teal-800 transition-colors duration-200 p-1 rounded-full hover:bg-teal-100"
                  >
                    <Share2 className="w-5 h-5" />
                  </button>
                  <CopyToClipboardButton
                    textToCopy={referralContent}
                    styles={{ fontSize: '12px', padding: '6px 12px' }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Transaction Details Section */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-teal-100">
          <div className="p-6 border-b border-teal-100 bg-teal-50">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
              <h2 className="text-2xl font-bold text-teal-800">Total Transaction Details</h2>

              {/* Search Bar */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-teal-400" />
                <input
                  type="text"
                  placeholder="Search"
                  onChange={handleSearch}
                  className="bg-white text-teal-800 placeholder-teal-400 pl-10 pr-4 py-2 rounded-full border-2 border-teal-200 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 w-full sm:w-64"
                />
              </div>
            </div>
          </div>

          {/* Mobile Card View */}
          <div className="block md:hidden p-4">
            {transactionsLoading ? (
              <div className="space-y-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="bg-white rounded-lg shadow-md p-4 border border-teal-100">
                    <div className="animate-pulse space-y-3">
                      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                      <div className="grid grid-cols-2 gap-3">
                        {Array.from({ length: 4 }).map((_, j) => (
                          <div key={j} className="h-3 bg-gray-200 rounded"></div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : transactionData.length > 0 ? (
              <div className="space-y-4">
                {transactionData.map((transaction, index) => (
                  <TransactionCard
                    key={transaction.id || index}
                    transaction={transaction}
                    index={index}
                  />
                ))}
              </div>
            ) : (
              <div className="py-12 text-center text-teal-500">
                <ShoppingBag className="w-12 h-12 text-teal-400 mx-auto mb-4" />
                <p className="text-lg font-medium text-teal-700">No data found</p>
              </div>
            )}
          </div>

          {/* Desktop Table View */}
          <div className="hidden md:block overflow-x-auto">
            {transactionData.length > 0 || transactionsLoading ? (
              <table className="min-w-full divide-y divide-teal-100">
                <thead className="bg-teal-600 text-xs font-semibold text-white">
                  <tr>
                    <th className="px-3 py-3 text-left uppercase">S.No</th>
                    <th className="px-3 py-3 text-left uppercase">Transaction ID</th>
                    <th className="px-3 py-3 text-left uppercase">Transaction Amount</th>
                    {countryCode !== 91 && (
                      <th className="px-3 py-3 text-left uppercase">Transaction Fee</th>
                    )}
                    <th className="px-3 py-3 text-left uppercase">Transaction Type</th>
                    <th className="px-3 py-3 text-left uppercase">Payment Method</th>
                    <th className="px-3 py-3 text-left uppercase">Currency</th>
                    <th className="px-3 py-3 text-left uppercase">Transaction Date</th>
                    <th className="px-3 py-3 text-left uppercase">Status</th>
                    <th className="px-3 py-3 text-left uppercase">Reason</th>
                    <th className="px-3 py-3 text-left uppercase">Updated By</th>
                    <th className="px-3 py-3 text-left uppercase">Updated On</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-teal-100">
                  {transactionsLoading ? (
                    Array.from({ length: 10 }).map((_, i) => <SkeletonRow key={i} />)
                  ) : (
                    transactionData.map((transaction, index) => (
                      <tr key={transaction.id || index} className="hover:bg-teal-50 transition-colors duration-150 text-xs">
                        <td className="px-3 py-3 whitespace-nowrap text-gray-900">
                          {(state.currentPage - 1) * state.perPage + index + 1}
                        </td>
                        <td className="px-3 py-3 whitespace-nowrap font-mono text-gray-900">
                          {transaction.screenshotUrl ? (
                            <a 
                              href={transaction.screenshotUrl} 
                              target="_blank" 
                              rel="noopener noreferrer" 
                              className="text-teal-600 hover:text-teal-800 flex items-center space-x-1"
                            >
                              <span>{transaction.transactionId || "N/A"}</span>
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          ) : (
                            transaction.transactionId || "N/A"
                          )}
                        </td>
                        <td className="px-3 py-3 whitespace-nowrap font-semibold text-teal-700">
                          {formatCurrency(transaction.transactionAmount)}
                        </td>
                        {countryCode !== 91 && (
                          <td className="px-3 py-3 whitespace-nowrap text-gray-900">
                            ${(transaction.transactionFee || 0).toFixed(2)}
                          </td>
                        )}
                        <td className="px-3 py-3 whitespace-nowrap text-gray-900">
                          {transaction.transactionType || "N/A"}
                        </td>
                        <td className="px-3 py-3 whitespace-nowrap text-gray-900">
                          {transaction.paymentMode || "N/A"}
                        </td>
                        <td className="px-3 py-3 whitespace-nowrap text-gray-900">
                          {transaction.currency || "N/A"}
                        </td>
                        <td className="px-3 py-3 whitespace-nowrap text-gray-900">
                          {formatDateWithAmPm(transaction.transactionDate)}
                        </td>
                        <td className="px-3 py-3 whitespace-nowrap">
                          <span 
                            className="text-capitalize font-bold"
                            style={{
                              color: transaction?.transactionStatus?.toLowerCase() === "pending"
                                ? "#daa520"
                                : transaction?.transactionStatus === "Completed"
                                ? "green"
                                : "red"
                            }}
                          >
                            {transaction?.transactionStatus}
                          </span>
                        </td>
                        <td 
                          className="px-3 py-3 text-gray-900 max-w-32 truncate" 
                          title={transaction?.reason}
                        >
                          {transaction?.reason || "N/A"}
                        </td>
                        <td className="px-3 py-3 whitespace-nowrap text-gray-900">
                          {transaction?.updatedBy?.name || "N/A"}
                        </td>
                        <td className="px-3 py-3 whitespace-nowrap text-gray-900">
                          {formatDateWithAmPm(transaction?.updatedOn)}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            ) : (
              <div className="px-6 py-12 text-center text-teal-500">
                <div className="flex flex-col items-center space-y-2">
                  <ShoppingBag className="w-12 h-12 text-teal-400" />
                  <p className="text-lg font-medium text-teal-700">No data found</p>
                </div>
              </div>
            )}
          </div>

          {/* Pagination and Per Page Selector */}
          <div className="px-6 py-4 bg-gray-50 border-t border-teal-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                {/* Per Page Selector */}
                <select
                  className="bg-white text-teal-800 border-2 border-teal-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-sm"
                  value={state.perPage}
                  onChange={(e) => handlePerPageChange(parseInt(e.target.value))}
                >
                  {ITEMS_PER_PAGE_OPTIONS.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
                
                {totalTransactions > 0 && (
                  <div className="text-sm text-gray-700">
                    Showing {((state.currentPage - 1) * state.perPage) + 1} to {Math.min(state.currentPage * state.perPage, totalTransactions)} of{' '}
                    {totalTransactions} transactions
                  </div>
                )}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center space-x-2">
                  <button
                    onClick={handlePrevPage}
                    disabled={state.currentPage === 1}
                    className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
                      state.currentPage === 1
                        ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                        : 'bg-teal-600 text-white hover:bg-teal-700'
                    }`}
                  >
                    <ChevronLeft className="w-4 h-4 mr-1" />
                    Previous
                  </button>

                  <span className="text-sm text-gray-700 px-2">
                    Page {state.currentPage} of {totalPages}
                  </span>

                  <button
                    onClick={handleNextPage}
                    disabled={state.currentPage === totalPages}
                    className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
                      state.currentPage === totalPages
                        ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                        : 'bg-teal-600 text-white hover:bg-teal-700'
                    }`}
                  >
                    Next
                    <ChevronRight className="w-4 h-4 ml-1" />
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