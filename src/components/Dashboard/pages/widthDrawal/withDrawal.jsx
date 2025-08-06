import React, { useState, useEffect } from "react";
import { AlertTriangle, CheckCircle, Info, Download, Building, CreditCard, Clock, Shield, ArrowRight, Smartphone, Search } from "lucide-react";
import Pagination from "../../../pagination/pagination";
import {useWithdrawHistoryQuery ,useWithdrawRequestListQuery, useWithdrawRequestMutation , useWithdrawCalculateQuery,  useCalculateWithdrawMutation,  useGetSettingQuery} from './withdrawApiSlice'
import { useUserDataQuery } from "../../../Dashboard/pages/dashBoard/DashboardApliSlice"
import {useGetkycDetailsQuery } from "../../../Dashboard/pages/kyc/kycApiSlice"
import { toast } from "react-toastify";
import Cookies from 'js-cookie'
const TransactionTable = ({ transactions, state, setState, selectedStatus, setSelectedStatus, handleSearch, handlePageChange, loading }) => {
  const [isMobile, setIsMobile] = useState(false);
  console.log("Transactions:", transactions);
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case "1": return 'bg-green-100 text-green-800 border-green-300';
      case "0": return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case "2": return 'bg-red-100 text-red-800 border-red-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "1": return "Approved";
      case "0": return "Pending";
      case "2": return "Rejected";
      default: return "Unknown";
    }
  };

  const formatDateWithAmPm = (isoString) => {
    if (!isoString) return "-";
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

  const TransactionCard = ({ transaction, index }) => (
    <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
      {/* Header with Status and Serial Number */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#1d8e85] rounded-lg flex items-center justify-center">
            <span className="text-white font-semibold text-sm">
              {(state?.currentPage || 1) * (state?.perPage || 10) - ((state?.perPage || 10) - 1) + index}
            </span>
          </div>
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wide">Transaction</p>
            <p className="text-sm font-semibold text-gray-900 truncate max-w-[120px]">
              {transaction._id ? `...${transaction._id.slice(-8)}` : "-"}
            </p>
          </div>
        </div>
        <span className={`px-3 py-1 text-xs font-medium rounded-full border ${getStatusColor(transaction.status)}`}>
          {getStatusText(transaction.status)}
        </span>
      </div>

      {/* Amount Section */}
      <div className="bg-gray-50 rounded-lg p-3 mb-4">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wide">Withdrawal Amount</p>
            <p className="text-lg font-bold text-gray-900">
              {transaction.amount ? (
                transaction.currency === "INR" 
                  ? `₹${parseFloat(transaction.amount).toFixed(2)}`
                  : `$${parseFloat(transaction.amount).toFixed(2)}`
              ) : "-"}
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-500 uppercase tracking-wide">Admin Fee</p>
            <p className="text-sm font-semibold text-red-600">
              {transaction.admin_inr_charges ? (
                transaction.currency === "INR" 
                  ? `₹${transaction.admin_inr_charges}`
                  : `$${transaction.admin_inr_charges}`
              ) : "-"}
            </p>
          </div>
        </div>
      </div>

      {/* Details Grid */}
      <div className="grid grid-cols-1 gap-3">
        <div className="flex justify-between items-center py-2 border-b border-gray-100">
          <span className="text-sm text-gray-600">Currency</span>
          <span className="text-sm font-medium text-gray-900">{transaction.currency || "-"}</span>
        </div>
        
        <div className="flex justify-between items-center py-2 border-b border-gray-100">
          <span className="text-sm text-gray-600">Date & Time</span>
          <span className="text-sm font-medium text-gray-900">{formatDateWithAmPm(transaction.created_at)}</span>
        </div>
        
        {transaction.reason && (
          <div className="py-2 border-b border-gray-100">
            <p className="text-sm text-gray-600 mb-1">Reason</p>
            <p className="text-sm text-gray-900 break-words">{transaction.reason}</p>
          </div>
        )}
        
        {transaction.note && (
          <div className="py-2">
            <p className="text-sm text-gray-600 mb-1">Note</p>
            <p className="text-sm text-gray-900 break-words">{transaction.note}</p>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
      <div className="px-4 sm:px-6 py-4 border-b border-gray-200 bg-gray-50">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-semibold text-gray-900">Withdrawal History</h3>
            {isMobile && <Smartphone className="w-4 h-4 text-gray-500" />}
          </div>
          
          {/* Mobile and Tablet Filters */}
          <div className="flex flex-col gap-3">
            <div className="flex flex-col sm:flex-row gap-3">
              <select
                value={selectedStatus}
                onChange={(e) => {
                  setSelectedStatus(e.target.value);
                  setState(prev => ({ ...prev, currentPage: 1 }));
                }}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-[#1d8e85] focus:border-[#1d8e85] text-gray-700 bg-white"
              >
                <option value="">All Status</option>
                <option value="1">Approved</option>
                <option value="0">Pending</option>
                <option value="2">Rejected</option>
              </select>
              
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Search transactions..."
                  onChange={handleSearch}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-[#1d8e85] focus:border-[#1d8e85]"
                />
                <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              </div>
            <button className="w-full sm:w-auto px-4 py-2 bg-[#1d8e85] text-white rounded-md text-sm hover:bg-[#166f67] focus:ring-2 focus:ring-[#1d8e85] focus:ring-offset-2 flex items-center justify-center gap-2 transition-colors">
              <Download className="w-4 h-4" />
              Export
            </button>
            </div>
            
          </div>
        </div>
      </div>

      {isMobile ? (
        // Mobile Card View
        <div className="p-4">
          <div className="space-y-4">
            {loading ? (
              [...Array(3)].map((_, i) => (
                <div key={i} className="bg-gray-200 animate-pulse rounded-xl h-48"></div>
              ))
            ) : !transactions || transactions?.length === 0 ? (
              <div className="text-center py-12">
                <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <Building className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No transactions found</h3>
                <p className="text-gray-500">Your withdrawal history will appear here</p>
              </div>
            ) : (
              transactions.map((transaction, index) => (
                <TransactionCard key={transaction._id || index} transaction={transaction} index={index} />
              ))
            )}
          </div>
        </div>
      ) : (
        // Desktop Table View
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#1d8e85] text-white text-sm">
              <tr>
                <th className="px-6 py-3 text-left text-xs uppercase tracking-wider">S.No</th>
                <th className="px-6 py-3 text-left text-xs uppercase tracking-wider">Transaction ID</th>
                <th className="px-6 py-3 text-left text-xs uppercase tracking-wider">Currency Type</th>
                <th className="px-6 py-3 text-left text-xs uppercase tracking-wider">Withdrawal Amount</th>
                <th className="px-6 py-3 text-left text-xs uppercase tracking-wider">Admin Charges</th>
                <th className="px-6 py-3 text-left text-xs uppercase tracking-wider">Date & Time</th>
                <th className="px-6 py-3 text-left text-xs uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs uppercase tracking-wider">Reason</th>
                <th className="px-6 py-3 text-left text-xs uppercase tracking-wider">Note</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {loading ? (
                [...Array(5)].map((_, i) => (
                  <tr key={i}>
                    {[...Array(9)].map((_, j) => (
                      <td key={j} className="px-6 py-4">
                        {console.log(j)}
                        <div className="bg-gray-200 animate-pulse h-4 rounded"></div>
                      </td>
                    ))}
                    
                  </tr>
                ))
              ) : !transactions || transactions?.length === 0 ? (
                <tr>
                  <td colSpan="9" className="px-6 py-8 text-center text-gray-500">
                    No data found
                  </td>
                </tr>
              ) : (
                transactions.map((transaction, index) => (
                  <tr key={transaction._id || index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {(state?.currentPage || 1) * (state?.perPage || 10) - ((state?.perPage || 10) - 1) + index}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {transaction._id || "-"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {transaction.currency || "-"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-semibold">
                      {transaction.amount ? (
                        transaction.currency === "INR" 
                          ? `₹${parseFloat(transaction.amount).toFixed(2)}` 
                          : `$${parseFloat(transaction.amount).toFixed(2)}`
                      ) : "-"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {transaction.admin_inr_charges ? (
                        transaction.currency === "INR" 
                          ? `₹${transaction.admin_inr_charges}` 
                          : `$${transaction.admin_inr_charges}`
                      ) : "-"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDateWithAmPm(transaction.created_at)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(transaction.status)}`}>
                        {getStatusText(transaction.status)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 max-w-24 truncate" title={transaction?.reason}>
                      {transaction?.reason || "-"}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      <span className="cursor-pointer hover:text-[#1d8e85]" title={transaction?.note}>
                        {transaction?.note ? "Details" : "-"}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

const Withdrawal = () => {
  const [withdrawRequest, { isLoading }] = useWithdrawRequestMutation();
  const { data: userData, refetch } = useUserDataQuery();
  const { data: getSetting } = useGetSettingQuery();
  const { data: kycDetails } = useGetkycDetailsQuery();

  const [formData, setFormData] = useState({
    balanceType: "referral",
    paymentCurrency: "",
    amount: "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [selectedStatus, setSelectedStatus] = useState("");
  const [state, setState] = useState({
    currentPage: 1,
    perPage: 10,
    search: "",
  });

  const queryParams = `limit=${state?.perPage || ""}&page=${state?.currentPage || ""}&search=${state?.search || ""}&status=${selectedStatus}`;
  
  const {
    data: withdrawHistory,
    isLoading: isLoadingWithdraw,
    refetch: refetchWithdraw,
  } = useWithdrawRequestListQuery(queryParams);

  const datafromApi = withdrawHistory?.data?.withdrawRequests || [];
  const id = Cookies.get("userData") ; 
  const userid=id?.data?._id
  const TableData = datafromApi.filter((item) => item?.userId?._id === userid);

  const [previewData, setPreviewData] = useState([
    { heading: "Fees", subHeading: "0" },
    { heading: "Will Get", subHeading: "0" },
  ]);

  useEffect(() => {
    if (
      userData &&
      userData?.data?.countryCode !== 91 &&
      formData.paymentCurrency !== "USD"
    ) {
      setFormData((prev) => ({
        ...prev,
        paymentCurrency: "USD",
      }));
    } else if (
      userData &&
      userData?.data?.countryCode === 91 &&
      formData.paymentCurrency !== "INR"
    ) {
      setFormData((prev) => ({
        ...prev,
        paymentCurrency: "INR",
      }));
    }
  }, [userData?.data?.countryCode, formData.paymentCurrency]);

  const validate = () => {
    const errors = {};

    if (!formData.balanceType) {
      errors.balanceType = "Balance Type is required";
    }

    if (formData.balanceType === "referral" && !formData.paymentCurrency) {
      errors.paymentCurrency = "Payment Currency is required";
    }

    if (!formData.amount) {
      errors.amount = "Amount is required";
    } else if (isNaN(formData.amount)) {
      errors.amount = "Amount must be a number";
    } else if (parseFloat(formData.amount) <= 0) {
      errors.amount = "Amount must be greater than zero";
    }

    return errors;
  };

  const calculatePreview = (amount, paymentCurrency) => {
    if (!getSetting?.data) {
      toast("Settings data is missing.");
      return;
    }

    const {
      min_withdrawal_inr,
      max_withdrawal_inr,
      withdrawal_commission_inr,
      min_withdrawal_usd,
      max_withdrawal_usd,
      withdrawal_commission_usd,
    } = getSetting.data;

    const parsedAmount = parseFloat(amount);
    let Fees;
    
    if (paymentCurrency === "INR") {
      if (parsedAmount < min_withdrawal_inr || parsedAmount > max_withdrawal_inr) {
        toast(`Withdrawal amount should be between ${min_withdrawal_inr} and ${max_withdrawal_inr}.`);
        return;
      }
      Fees = (parsedAmount * withdrawal_commission_inr) / 100;
    } else {
      if (parsedAmount < min_withdrawal_usd || parsedAmount > max_withdrawal_usd) {
        toast(`Withdrawal amount should be between ${min_withdrawal_usd} and ${max_withdrawal_usd}.`);
        return;
      }
      Fees = (parsedAmount * withdrawal_commission_usd) / 100;
    }

    const Will_Get = parsedAmount - Fees;

    setPreviewData([
      {
        heading: "Fees",
        subHeading: `${Fees.toFixed(2)} ${paymentCurrency === "USD" ? "USD" : paymentCurrency === "INR" ? "INR" : "Jaimax"}`,
      },
      {
        heading: "Will Get",
        subHeading: `${Will_Get.toFixed(2)} ${paymentCurrency === "USD" ? "USD" : paymentCurrency === "INR" ? "INR" : "Jaimax"}`,
      },
    ]);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "amount" && !/^\d*\.?\d*$/.test(value)) {
      return;
    }

    setFormData({ ...formData, [name]: value });
    if (value) {
      clearErrors();
    }
    setPreviewData([
      { heading: "Fees", subHeading: "0" },
      { heading: "Will Get", subHeading: "0" },
    ]);
  };

  const onBlurAmount = (e) => {
    if (e.target.value) {
      calculatePreview(e.target.value, formData.paymentCurrency);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validate();
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }

    const { amount, balanceType, paymentCurrency } = formData;
    try {
      const response = await withdrawRequest(
        balanceType == "referral"
          ? {
              amount: parseFloat(amount),
              currency: paymentCurrency,
              currencyType: paymentCurrency,
            }
          : balanceType == "JAIMAX"
          ? { amount: parseFloat(amount), currency: balanceType }
          : ""
      );
      
      if (response.success) {
        setFormData({
          balanceType: "referral",
          paymentCurrency: "",
          amount: "",
        });

        setPreviewData([
          { heading: "Fees", subHeading: "0" },
          { heading: "Will Get", subHeading: "0" },
        ]);
        toast(response?.message);
        refetchWithdraw();
      } else {
        toast(response.message);
      }
    } catch (error) {
      toast(error?.data?.message || "Withdrawal failed. Please try again.");
    }
  };

  const clearErrors = () => {
    setErrors({});
  };

  const addSymbolPlaceholder = (value) => {
    if (value === "INR") {
      return "₹";
    } else if (value === "USD") {
      return "$";
    } else {
      return "";
    }
  };

  const handlePageChange = (e) => {
    setLoading(true);
    setState({ ...state, currentPage: e });
  };

  let searchTimeout;
  const handleSearch = (e) => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
      setState({ ...state, search: e.target.value, currentPage: 1 });
    }, 1000);
  };

  const onChangeBalanceType = (e) => {
    setFormData({
      amount: "",
      balanceType: e.target.value,
      paymentCurrency: "",
    });
    setPreviewData([
      { heading: "Fees", subHeading: "0" },
      { heading: "Will Get", subHeading: "0" },
    ]);
  };

  useEffect(() => {
    setLoading(false);
  }, [withdrawHistory?.data?.withdrawRequests]);

  useEffect(() => {
    return () => {
      clearTimeout(searchTimeout);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      {/* <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-4 sm:py-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-[#1d8e85] rounded-lg shadow-lg">
                <Building className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">Fund Withdrawal</h1>
                <p className="text-xs sm:text-sm text-gray-600">Secure transfer to your registered bank account</p>
              </div>
            </div>
          </div>
        </div>
      </div> */}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6">
          {/* Left Column - Withdrawal Form */}
          <div className="lg:col-span-5 xl:col-span-4">
            <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6 shadow-sm">
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Withdrawal Request</h2>
                
                {/* Balance Display */}
                <div className="bg-gradient-to-r from-[#1d8e85] to-[#16a085] rounded-xl p-4 text-white mb-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm opacity-90">Available Balance</p>
                      <p className="text-xl sm:text-2xl font-bold">
                        ₹{userData?.data?.Inr?.toLocaleString('en-IN') || '0'}
                      </p>
                    </div>
                    <CreditCard className="w-6 h-6 sm:w-8 sm:h-8 opacity-80" />
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <label htmlFor="balanceType" className="block text-sm font-medium text-gray-700 mb-2">
                    Source Account
                  </label>
                  <select
                    id="balanceType"
                    name="balanceType"
                    value={formData.balanceType}
                    onChange={onChangeBalanceType}
                    onClick={clearErrors}
                    className="w-full text-white px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#1d8e85] focus:border-[#1d8e85] bg-[#1d8e85]"
                  >
                    <option className="" value="referral">Available Balance</option>
                    <option className="" value="JAIMAX">Purchase Token (JaiMax)</option>
                  </select>
                  {errors.balanceType && (
                    <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                      <AlertTriangle className="w-4 h-4" />
                      {errors.balanceType}
                    </p>
                  )}
                  {formData.balanceType === "referral" && (
                    <p className="text-gray-600 mt-2 text-sm">
                      Total Available Balance: ₹{userData?.data?.Inr?.toFixed(2) || '0.00'}
                    </p>
                  )}
                </div>

                {formData.balanceType === "referral" && (
                  <>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Currency
                        </label>
                        <div className="px-3 py-2 bg-gray-100 border border-gray-300 rounded-md text-gray-900 font-medium text-center">
                          {formData.paymentCurrency || (userData?.data?.countryCode === 91 ? "INR" : "USD")}
                        </div>
                      </div>
                      <div>
                        <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-2">
                          Amount *
                        </label>
                        <input
                          id="amount"
                          type="text"
                          placeholder={`Enter Amount ${addSymbolPlaceholder(formData.paymentCurrency)}`}
                          value={formData.amount}
                          onChange={handleInputChange}
                          onBlur={onBlurAmount}
                          onClick={clearErrors}
                          name="amount"
                          autoComplete="off"
                          className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-[#1d8e85] focus:border-[#1d8e85] ${
                            errors.amount ? 'border-red-300 bg-red-50' : 'border-gray-300'
                          }`}
                        />
                      </div>
                    </div>
                    {errors.amount && (
                      <p className="text-sm text-red-600 flex items-center gap-1">
                        <AlertTriangle className="w-4 h-4" />
                        {errors.amount}
                      </p>
                    )}

                    {/* Transaction Summary */}
                    {formData.amount && (
                      <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                        <h3 className="text-sm font-medium text-gray-900 mb-3">Transaction Summary</h3>
                        <div className="space-y-2 text-sm">
                          {previewData.map((data, i) => (
                            <div key={i} className="flex justify-between">
                              <span className={data.heading === "Fees" ? "text-red-600" : "text-gray-600"}>
                                {data.heading}
                              </span>
                              <span className={data.heading === "Will Get" ? "text-[#1d8e85] font-semibold" : "font-medium"}>
                                {data.subHeading}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </>
                )}

                {formData.balanceType === "JAIMAX" && (
                  <div className="text-center py-8">
                    <h5 className="text-gray-600 text-lg font-medium">Coming Soon</h5>
                    <p className="text-gray-500 text-sm mt-2">JaiMax token withdrawal will be available soon</p>
                  </div>
                )}

                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={isLoading || formData.balanceType === "JAIMAX"}
                  className="w-full bg-[#1d8e85] text-white py-3 px-4 rounded-md font-medium hover:bg-[#166f67] focus:ring-2 focus:ring-[#1d8e85] focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-colors"
                >
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Processing Request...
                    </>
                  ) : (
                    <>
                      Submit Withdrawal
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Right Column - Bank Details & Terms */}
          <div className="lg:col-span-7 xl:col-span-8 space-y-4 sm:space-y-6">
            {/* Bank Details */}
            <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
                <h2 className="text-lg font-semibold text-gray-900">Destination Account</h2>
                
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
                    Account Holder
                  </label>
                  <p className="text-gray-900 font-semibold">
                    {kycDetails?.data?.name || "Not Available"}
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
                    Account Number
                  </label>
                  <p className="text-gray-900 font-semibold  break-all">
                    {kycDetails?.data?.bank_account || "Not Available"}
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
                    {userData?.data?.countryCode === 91 ? "IFSC" : "Bank"} Code
                  </label>
                  <p className="text-gray-900 font-semibold">
                    {kycDetails?.data?.ifsc_code || "Not Available"}
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
                    Bank Name
                  </label>
                  <p className="text-gray-900 font-semibold">
                    {kycDetails?.data?.bank_name || "Not Available"}
                  </p>
                </div>
              </div>
            </div>

            {/* Processing Information */}
            <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Terms & Conditions</h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2  md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <Clock className="w-5 h-5 text-blue-600 flex-shrink-2" />
                  <div>
                    <p className="text-sm font-medium text-blue-900">Processing Time</p>
                    <p className="text-xs text-blue-700">Within 24 hours</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg border border-green-200">
                  <Shield className="w-5 h-5 text-green-600 flex-shrink-2" />
                  <div>
                    <p className="text-sm font-medium text-green-900">Working Hours</p>
                    <p className="text-xs text-green-700">Mon-Fri, 10 AM - 4 PM</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg border border-orange-200">
                  <Info className="w-5 h-5 text-orange-600 flex-shrink-2" />
                  <div>
                    <p className="text-sm font-medium text-orange-900">Processing Fee</p>
                    <p className="text-xs text-orange-700">
                      {getSetting?.data?.withdrawal_commission_inr || "0.5"}% per transaction
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex gap-3">
                  <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-sm font-semibold text-yellow-800">Important Notes</h3>
                    <ul className="text-sm text-yellow-700 mt-2 space-y-1">
                      <li>• You have to complete the KYC and get approved status; then you can start the withdrawal process.</li>
                      <li>• The withdrawal department works only during banking hours (10 AM to 4 PM) from Monday to Friday.</li>
                      <li>• When you initiate the withdrawal process, the funds will be credited to your account within 24 hours.</li>
                      <li>• We are not responsible if you provide the wrong bank details. Please check them carefully before initiating the withdrawal process.</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Transaction History */}
        <div className="mt-6 sm:mt-8">
          <TransactionTable 
            transactions={TableData}
            state={state}
            setState={setState}
            selectedStatus={selectedStatus}
            setSelectedStatus={setSelectedStatus}
            handleSearch={handleSearch}
            handlePageChange={handlePageChange}
            loading={isLoadingWithdraw || loading}
          />
          
          {/* Pagination - Only show if there's data */}
          {withdrawHistory?.data?.pagination?.total > 0 && (
            <div className="mt-6 bg-white rounded-lg border border-gray-200 shadow-sm">
              <div className="p-4">
                <div className="flex flex-col gap-4">
                  {/* Entries selector and results info */}
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                    <div className="flex items-center gap-2 text-sm">
                      <span className="text-gray-700">Show</span>
                      <select
                        value={state?.perPage}
                        onChange={(e) => {
                          const newPerPage = e.target.value;
                          setState({
                            ...state,
                            perPage: newPerPage,
                            currentPage: 1,
                          });
                        }}
                        className="px-3 py-1 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-[#1d8e85] focus:border-[#1d8e85]"
                      >
                        <option value="10">10</option>
                        <option value="30">30</option>
                        <option value="50">50</option>
                      </select>
                      <span className="text-gray-700">entries</span>
                    </div>
                    
                   
                  </div>
                  
                  {/* Pagination controls - Only show if more than 1 page */}
                  {Math.ceil(withdrawHistory.data.pagination.total / (state?.perPage || 10)) > 1 && (
                    <div className="flex justify-center">
                      <Pagination
                        currentPage={state?.currentPage || 1}
                        totalPages={Math.ceil(withdrawHistory.data.pagination.total / (state?.perPage || 10))}
                        onPageChange={handlePageChange}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Withdrawal;

