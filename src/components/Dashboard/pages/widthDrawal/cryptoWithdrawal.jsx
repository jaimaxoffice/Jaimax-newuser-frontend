import {
  AlertTriangle,
  CheckCircle,
  Copy,
  Info,
  Search,
  Smartphone,
  Wallet,
} from "lucide-react";
import { useEffect, useState } from "react";

import {
  useInrToTokenPreviewQuery,
  usePreviewTokenWithdrawMutation,
  useUsdtWithdrawHistoryQuery,
  useUsdtWithdrawRequestMutation,
} from "./cryptoWithdrawalApiSlice";

import Pagination from "../../../../ReusableComponents/pagination/pagination";
import { toast } from "../../../../ReusableComponents/Toasts/Toasts";
import { useGetSettingQuery } from "./withDrawApiSlice";

const copyToClipboard = (text) => {
  navigator.clipboard.writeText(text);
  toast.success("Copied");
};

const TransactionTable = ({
  state,
  setState,
  selectedStatus,
  setSelectedStatus,
  handleSearch,
  loading,
  transactions,
  pagination,
}) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 1:
        return "border-green-500 text-green-600 bg-green-50";
      case 0:
        return "border-yellow-500 text-yellow-600 bg-yellow-50";
      case 2:
        return "border-red-500 text-red-600 bg-red-50";
      default:
        return "border-gray-400 text-gray-500 bg-gray-50";
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 1:
        return "Completed";
      case 0:
        return "Pending";
      case 2:
        return "Failed";
      default:
        return "Unknown";
    }
  };

  const formatDate = (isoString) => {
    if (!isoString) return "-";

    // Remove milliseconds and Z
    const clean = isoString.replace("Z", "").split(".")[0];

    const [datePart, timePart] = clean.split("T");
    const [year, month, day] = datePart.split("-");
    let [hours, minutes] = timePart.split(":");

    hours = parseInt(hours, 10);
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;

    return `${day}-${month}-${year} ${hours}:${minutes} ${ampm}`;
  };

  const copyToClipboard = (text, label) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} copied`);
  };

  const TransactionCard = ({ transaction, index }) => (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all">
      <div className="h-1 bg-gradient-to-r from-[#1d8d84] via-[#00d4aa] to-[#1d8d84]"></div>

      <div className="p-3 bg-gradient-to-r from-gray-50 to-white flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#1d8d84] to-[#1e8064] text-white flex items-center justify-center">
            <Wallet className="w-4 h-4" />
          </div>
          <div>
            <span className="text-xs text-gray-500 uppercase block">
              Transaction ID
            </span>
            <span className="text-xs font-bold text-gray-800 block">
              {transaction._id ? `...${transaction._id.slice(-8)}` : "-"}
            </span>
          </div>
        </div>

        <span
          className={`text-xs px-2 py-1 rounded-full border ${getStatusColor(
            transaction.status,
          )}`}
        >
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-current mr-1 animate-pulse"></span>
          {getStatusText(transaction.status)}
        </span>
      </div>

      <div className="p-4 bg-gradient-to-r from-gray-50 to-white border-y border-gray-100">
        <div className="flex justify-between items-center mb-3">
          <div>
            <span className="text-xs text-[#1d8d84] uppercase block font-medium">
              Amount
            </span>
            <span className="text-lg font-extrabold text-gray-800">
              {transaction.amount_in_token
                ? `${parseFloat(transaction.amount_in_token).toFixed(2)} ${transaction.currency}`
                : "-"}
            </span>
            <span className="text-xs text-gray-600 block">
              ≈ ₹{transaction.amount_in_inr?.toFixed(2) || "-"}
            </span>
          </div>
          <div className="text-right">
            <span className="text-xs text-red-500 uppercase block font-medium">
              Fees
            </span>
            <span className="text-sm font-bold text-red-600">
              ₹{transaction.admin_inr_charges?.toFixed(2) || "-"}
            </span>
          </div>
        </div>
      </div>

      <div className="p-3 space-y-2">
        <div className="grid grid-cols-2 gap-2">
          <div className="rounded bg-gray-50 p-2 border border-gray-100">
            <span className="text-xs text-gray-500 uppercase block mb-1">
              Rate
            </span>
            <span className="font-bold text-gray-800 text-sm">
              ₹{transaction.inr_price || "-"}
            </span>
          </div>
          <div className="rounded bg-gray-50 p-2 border border-gray-100">
            <span className="text-xs text-gray-500 uppercase block mb-1">
              Date
            </span>
            <span className="font-bold text-gray-800 text-xs">
              {formatDate(transaction.created_at)}
            </span>
          </div>
        </div>

        {transaction.txn_hash && (
          <div className="rounded bg-gray-50 p-2 border border-gray-100">
            <span className="text-xs text-gray-500 uppercase block mb-1">
              Tx Hash
            </span>
            <div className="flex items-center gap-1">
              <span className="font-mono text-xs text-gray-800 truncate flex-1">
                {transaction.txn_hash}
              </span>
              <button
                onClick={() => copyToClipboard(transaction.txn_hash, "Tx Hash")}
                className="text-[#1d8d84] hover:text-[#1e8064]"
              >
                <Copy className="w-3 h-3" />
              </button>
            </div>
          </div>
        )}

        {/* {transaction.reason && (
                    <div className="pt-2 border-t border-dashed border-gray-200">
                        <span className="text-xs text-gray-500 uppercase font-medium block mb-1">
                            Reason
                        </span>
                        <p className="text-xs text-gray-700 bg-gray-50 p-2 rounded border border-gray-100">
                            {transaction.reason}
                        </p>
                    </div>
                )} */}
      </div>
    </div>
  );

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
      <div className="px-4 sm:px-6 py-4 border-b border-gray-200 bg-gray-50">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-semibold text-gray-900">
              Withdrawal History
            </h3>
            {isMobile && <Smartphone className="w-4 h-4 text-gray-500" />}
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <select
              value={selectedStatus}
              onChange={(e) => {
                setSelectedStatus(e.target.value);
                setState((prev) => ({ ...prev, page: 1 }));
              }}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-[#1d8d84]"
            >
              <option value="">All Status</option>
              <option value="1">Completed</option>
              <option value="0">Pending</option>
              <option value="2">Failed</option>
            </select>

            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Search transactions..."
                onChange={handleSearch}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-[#1d8d84]"
              />
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            </div>
          </div>
        </div>
      </div>

      {isMobile ? (
        <div className="p-4">
          <div className="space-y-4">
            {loading ? (
              [...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="bg-gray-200 animate-pulse rounded-lg h-48"
                ></div>
              ))
            ) : transactions.length === 0 ? (
              <div className="text-center py-12">
                <Wallet className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No transactions found
                </h3>
                <p className="text-gray-500">
                  Your withdrawal history will appear here
                </p>
              </div>
            ) : (
              transactions.map((transaction, index) => (
                <TransactionCard
                  key={transaction._id}
                  transaction={transaction}
                  index={index}
                />
              ))
            )}
          </div>
        </div>
      ) : (
        <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 p-6">
          <table className="w-full border">
            <thead className="bg-[#1d8d84] text-white">
              <tr>
                <th className="px-3 py-2 text-left text-xs font-medium">#</th>
                <th className="px-3 py-2 text-left text-xs font-medium">
                  Transaction ID
                </th>
                <th className="px-3 py-2 text-right text-xs font-medium">
                  Tokens
                </th>
                <th className="px-3 py-2 text-right text-xs font-medium">
                  Token Type
                </th>
                <th className="px-3 py-2 text-right text-xs font-medium">
                  Amount (INR)
                </th>
                <th className="px-3 py-2 text-center text-xs font-medium">
                  Rate
                </th>
                <th className="px-3 py-2 text-right text-xs font-medium">
                  Fees
                </th>
                <th className="px-3 py-2 text-center text-xs font-medium">
                  Date
                </th>
                <th className="px-3 py-2 text-center text-xs font-medium">
                  Status
                </th>
                <th className="px-3 py-2 text-left text-xs font-medium">
                  Tx Hash
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {loading ? (
                [...Array(3)].map((_, i) => (
                  <tr key={i}>
                    {[...Array(9)].map((_, j) => (
                      <td key={j} className="px-3 py-3">
                        <div className="bg-gray-200 animate-pulse h-4 rounded"></div>
                      </td>
                    ))}
                  </tr>
                ))
              ) : transactions.length === 0 ? (
                <tr>
                  <td
                    colSpan="9"
                    className="px-3 py-8 text-center text-gray-500"
                  >
                    No transactions found
                  </td>
                </tr>
              ) : (
                transactions.map((transaction, index) => (
                  <tr key={transaction._id} className="hover:bg-gray-50">
                    <td className="px-3 py-3 text-xs">
                      {(state.page - 1) * state.limit + index + 1}
                    </td>
                    <td className="px-3 py-3 text-xs">
                      <div className="flex items-center gap-1">
                        <span
                          className="truncate max-w-[120px]"
                          title={transaction._id}
                        >
                          {transaction._id
                            ? `...${transaction._id.slice(-8)}`
                            : "-"}
                        </span>
                        {transaction._id && (
                          <button
                            onClick={() =>
                              copyToClipboard(transaction._id, "Transaction ID")
                            }
                            className="text-[#1d8d84] hover:text-[#1e8064]"
                          >
                            <Copy className="w-3 h-3" />
                          </button>
                        )}
                      </div>
                    </td>
                    <td className="px-3 py-3 text-right text-xs font-medium">
                      {transaction.amount_in_token
                        ? `${parseFloat(transaction.amount_in_token).toFixed(2)}`
                        : "-"}
                    </td>
                    <td className="px-3 py-3 text-right text-xs font-medium">
                      {transaction.currency || "-"}
                    </td>
                    <td className="px-3 py-3 text-right text-xs font-medium text-gray-600">
                      ₹{transaction.amount_in_inr?.toFixed(2) || "-"}
                    </td>
                    <td className="px-3 py-3 text-center text-xs">
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full font-medium">
                        ₹{transaction.inr_price || "-"}
                      </span>
                    </td>
                    <td className="px-3 py-3 text-right text-xs text-red-600 font-medium">
                      ₹{transaction.admin_inr_charges?.toFixed(2) || "-"}
                    </td>
                    <td className="px-3 py-3 text-center text-xs whitespace-nowrap">
                      {formatDate(transaction.created_at)}
                    </td>
                    <td className="px-3 py-3 text-center">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(
                          transaction.status,
                        )}`}
                      >
                        {getStatusText(transaction.status)}
                      </span>
                    </td>
                    <td className="px-3 py-3 text-xs">
                      {transaction.txn_hash ? (
                        <div className="flex items-center gap-1">
                          <span
                            className="truncate max-w-[100px] font-mono"
                            title={transaction.txn_hash}
                          >
                            {transaction.txn_hash.slice(0, 8)}...
                          </span>
                          <button
                            onClick={() =>
                              copyToClipboard(transaction.txn_hash, "Tx Hash")
                            }
                            className="text-[#1d8d84] hover:text-[#1e8064]"
                          >
                            <Copy className="w-3 h-3" />
                          </button>
                        </div>
                      ) : (
                        "-"
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {pagination?.total > 0 && (
        <div className="p-3 flex flex-col sm:flex-row justify-between items-center gap-3 border-t border-gray-200">
          <p className="text-xs text-gray-700">
            Showing <span className="font-medium">{transactions.length}</span>{" "}
            of <span className="font-medium">{pagination.total}</span>{" "}
            transactions
          </p>

          <Pagination
            currentPage={state?.page || 1}
            totalPages={pagination?.totalPages || 1}
            onPageChange={(page) => setState({ ...state, page })}
          />

          <div className="flex items-center gap-2 text-xs">
            <span className="text-gray-700">Show</span>
            <select
              value={state.limit}
              onChange={(e) => {
                setState((prev) => ({
                  ...prev,
                  limit: Number(e.target.value),
                  page: 1,
                }));
              }}
              className="px-2 py-1 border border-gray-300 rounded text-xs focus:ring-1 focus:ring-[#1d8e85]"
            >
              <option value={10}>10</option>
              <option value={30}>30</option>
              <option value={50}>50</option>
            </select>

            <span className="text-gray-700">entries</span>
          </div>
        </div>
      )}
    </div>
  );
};
const CryptoWithdrawal = () => {
  // const [selectedToken, setSelectedToken] = useState("USDT");
  const selectedToken = "USDT";

  const [formData, setFormData] = useState({
    walletAddress: "",
    amount: "",
  });

  const [errors, setErrors] = useState({});
  const [previewData, setPreviewData] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState("");

  const [state, setState] = useState({
    page: 1,
    limit: 10,
    search: "",
  });
  const [debouncedAmount, setDebouncedAmount] = useState("");

  const queryString = `page=${state.page}&limit=${state.limit}&status=${selectedStatus}&search=${state.search}`;

  // console.log(selectedStatus)
  const {
    data: historyData,
    isLoading: historyLoading,
    refetch: withdrawRefetch,
  } = useUsdtWithdrawHistoryQuery(queryString);

  const {
    data: conversionData,
    isLoading: conversionLoading,
    refetch: conversionRefetch,
  } = useInrToTokenPreviewQuery(selectedToken);

  const [previewWithdraw, { isLoading: previewLoading }] =
    usePreviewTokenWithdrawMutation();

  const [submitWithdraw, { isLoading: isSubmitting }] =
    useUsdtWithdrawRequestMutation();
  const { data: getSetting } = useGetSettingQuery();

  const walletData = conversionData?.data;
  const token = walletData?.token || selectedToken;

  const transactions = historyData?.data?.withdrawRequests || [];
  const pagination = historyData?.data?.pagination;
  const settings = getSetting?.data;

  const validate = () => {
    const errs = {};

    if (!formData.walletAddress)
      errs.walletAddress = "Wallet address is required";

    if (!formData.amount || Number(formData.amount) <= 0)
      errs.amount = "Enter valid amount";

    if (Number(formData.amount) > Number(walletData?.estimatedTokenAmount || 0))
      errs.amount = "Insufficient balance";

    return errs;
  };

  const calculatePreview = async (amount) => {
    if (!amount) return setPreviewData(null);

    try {
      const res = await previewWithdraw({
        token: selectedToken,
        amount,
      });

      // console.log(res?.error?.data?.message)
      if (res?.data?.success) {
        setPreviewData(res.data.data);
      } else {
        toast.error(res?.error?.data?.message || "Preview failed");
        setPreviewData(null);
      }
    } catch {
      setPreviewData(null);
    }
  };

  useEffect(() => {
    if (!formData.amount) {
      setPreviewData(null);
      return;
    }

    const timer = setTimeout(() => {
      setDebouncedAmount(formData.amount);
    }, 500); // debounce delay (500ms is ideal)

    return () => clearTimeout(timer);
  }, [formData.amount]);

  useEffect(() => {
    if (!debouncedAmount) return;

    calculatePreview(debouncedAmount);
  }, [debouncedAmount]);

  /* ---------------- INPUT ---------------- */
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "amount" && !/^\d*\.?\d*$/.test(value)) return;

    setFormData((p) => ({ ...p, [name]: value }));
    setErrors((p) => ({ ...p, [name]: undefined }));

    // if (name === "amount") {
    //     clearTimeout(window.previewTimeout);
    //     window.previewTimeout = setTimeout(() => {
    //         calculatePreview(value);
    //     }, 400);
    // }

    if (name === "amount") {
      setPreviewData(null); // clear old preview while typing
    }
  };

  /* ---------------- SUBMIT ---------------- */
  const handleSubmit = async () => {
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }

    if (!previewData) {
      toast.error("Please wait for preview");
      return;
    }

    const res = await submitWithdraw({
      token: selectedToken,
      amount: formData.amount,
      walletAddress: formData.walletAddress,
    });

    // if (res?.data?.success) {
    //     toast.success("Withdrawal submitted");
    //     setFormData({ walletAddress: "", amount: "" });
    //     setPreviewData(null);
    //     refetch();
    // } else {
    //     toast.error(res?.data?.message || "Withdrawal failed");
    // }

    if (res?.data?.success) {
      toast.success(res?.data?.message || "Withdrawal submitted");
      setFormData({ walletAddress: "", amount: "" });
      setPreviewData(null);
      withdrawRefetch();
      conversionRefetch();
    } else {
      const errorMessage =
        res?.error?.data?.message || res?.data?.message || "Withdrawal failed";

      toast.error(errorMessage);
    }
  };

  /* ---------------- UI ---------------- */
  return (
    <div className="min-h-screen bg-gray-50 py-4">
      <div className="max-w-screen mx-auto px-3 sm:px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
          <div className="lg:col-span-4">
            <div className="bg-white rounded-lg border p-4 shadow-sm">
              <h2 className="font-semibold mb-3">Token Withdrawal</h2>

              {/* TOKEN SELECT */}

              {/* <select
                                value={selectedToken}
                                onChange={(e) => {
                                    setSelectedToken(e.target.value);
                                    setFormData({ walletAddress: "", amount: "" });
                                    setPreviewData(null);
                                }}
                                className="w-full mb-3 border px-3 py-2 rounded"
                            >
                                <option value="USDT">USDT</option>
                                <option value="USDC">USDC</option>
                                <option value="TRX">TRX</option>
                                <option value="XRP">XRP</option>
                            </select> */}

              {/* BALANCE */}
              {conversionLoading ? (
                <div className="h-20 bg-gray-200 animate-pulse rounded" />
              ) : (
                <div className="bg-gradient-to-r from-[#1d8d84] to-[#00d4aa] p-3 rounded text-white mb-4">
                  <p className="text-xs">Available Balance</p>
                  <p className="text-lg font-bold">
                    {walletData?.estimatedTokenAmount?.toFixed(4)} {token}
                  </p>
                  <p className="text-xs">
                    ≈ ₹{walletData?.walletINRBalance?.toFixed(2)}
                  </p>
                </div>
              )}

              {/* RATE */}
              <p className="text-xs bg-blue-50 p-2 rounded mb-3">
                <Info className="w-3 h-3 inline mr-1" />₹
                {walletData?.conversionRate} / {token}
              </p>

              {/* WALLET */}
              <input
                name="walletAddress"
                placeholder="Wallet address"
                value={formData.walletAddress}
                onChange={handleInputChange}
                className="w-full border px-3 py-2 rounded mb-2"
              />
              {errors.walletAddress && (
                <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                  <AlertTriangle className="w-3 h-3" />
                  {errors.walletAddress}
                </p>
              )}
              {walletData?.walletAddress && (
                <button
                  onClick={() =>
                    setFormData((prev) => ({
                      ...prev,
                      walletAddress: walletData.walletAddress,
                    }))
                  }
                  className="mt-1 text-xs text-[#1d8d84] hover:underline"
                >
                  User registered address:{" "}
                  {walletData.walletAddress.slice(0, 6)}...
                  {walletData.walletAddress.slice(-4)}
                </button>
              )}

              {/* AMOUNT */}
              <input
                name="amount"
                placeholder={`Amount (${token})`}
                value={formData.amount}
                onChange={handleInputChange}
                className="w-full border px-3 py-2 rounded mt-3"
              />
              {errors.amount && (
                <p className="text-xs text-red-600">{errors.amount}</p>
              )}

              {/* PREVIEW (ENHANCED FEES) */}
              {previewLoading ? (
                <div className="h-20 bg-gray-200 animate-pulse rounded mt-3" />
              ) : (
                previewData && (
                  <div className="bg-gray-50 border rounded p-3 mt-3 text-xs space-y-1">
                    <div className="flex justify-between">
                      <span>Entered</span>
                      <span>
                        {formData.amount} {token}
                      </span>
                    </div>
                    <div className="flex justify-between text-red-600">
                      <span>Platform Fee</span>
                      <span>
                        -{previewData.admin_fee_token} {token}
                      </span>
                    </div>
                    <div className="flex justify-between text-red-600">
                      <span>Network Fee</span>
                      <span>
                        -{previewData.network_fee_token} {token}
                      </span>
                    </div>
                    <div className="flex justify-between font-semibold">
                      <span>Total Fee</span>
                      <span>
                        {previewData.total_fee_token} {token}
                      </span>
                    </div>
                    <div className="flex justify-between text-green-600 font-bold">
                      <span>You Receive</span>
                      <span>
                        {previewData.final_token_received} {token}
                      </span>
                    </div>
                    <div className="flex justify-between text-gray-600 pt-1 border-t">
                      <span>INR Deduction</span>
                      <span>₹{previewData.estimatedINR_deduction}</span>
                    </div>
                  </div>
                )
              )}

              {/* SUBMIT (DISABLED UNTIL PREVIEW) */}
              <button
                disabled={
                  isSubmitting ||
                  previewLoading ||
                  !previewData ||
                  !formData.amount ||
                  !formData.walletAddress
                }
                onClick={handleSubmit}
                className="w-full mt-4 bg-[#1d8d84] text-white py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Processing..." : "Submit Withdrawal"}
              </button>
            </div>
          </div>

          <div className="lg:col-span-8 space-y-4">
            {/* Wallet Details */}
            <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-base font-semibold text-gray-900">
                  Registered Wallet
                </h2>
                <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium flex items-center gap-1">
                  <CheckCircle className="w-3 h-3" />
                  BSC Network
                </span>
              </div>

              <div className="grid grid-cols-1 gap-3">
                <div className="bg-gradient-to-r from-gray-50 to-white p-3 rounded-lg border border-gray-200">
                  <label className="block text-xs font-medium text-gray-500 uppercase mb-1">
                    Wallet Address
                  </label>
                  <div className="flex items-center gap-2">
                    <p className="text-sm text-gray-900 font-mono break-all flex-1">
                      {walletData?.walletAddress || "Not Available"}
                    </p>
                    {walletData?.walletAddress && (
                      <button
                        onClick={() =>
                          copyToClipboard(walletData.walletAddress)
                        }
                        className="text-[#1d8d84] hover:text-[#1e8064] p-1"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                    <label className="block text-xs font-medium text-gray-500 uppercase mb-1">
                      Network
                    </label>
                    <p className="text-sm text-gray-900 font-medium">
                      BSC(BEP20)
                    </p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                    <label className="block text-xs font-medium text-gray-500 uppercase mb-1">
                      Status
                    </label>
                    <p className="text-sm text-gray-900 font-medium">Active</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Terms & Conditions */}
            <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
              <h2 className="text-base font-semibold text-gray-900 mb-3">
                Terms & Conditions
              </h2>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                <div className="flex gap-2">
                  <AlertTriangle className="w-4 h-4 text-yellow-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-xs font-semibold text-yellow-800 mb-1">
                      Important Notes
                    </h3>
                    <ul className="text-xs text-yellow-700 space-y-1">
                      <li>
                        • Verify wallet address before withdrawal - transactions
                        cannot be reversed
                      </li>
                      <li>• Ensure wallet supports BSC (BEP20) network</li>
                      <li>
                        • Platform fee {settings?.withdrawal_commission_usd}%
                        and network fee 1% will be deducted from your withdrawal
                      </li>
                      {/* <li>• Processing time varies by network congestion (typically 10-30 minutes)</li> */}
                      <li>• Complete KYC verification for withdrawals</li>
                      <li>
                        • Withdrawal amount will be deducted from your INR
                        balance
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Network Info */}
            {/* <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200 p-4">
                            <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                                <Info className="w-4 h-4 text-blue-600" />
                                Network Information
                            </h3>
                            <div className="bg-white rounded p-3 border border-blue-100">
                                <p className="font-medium text-gray-700 mb-1">BEP20 (Binance Smart Chain)</p>
                                <p className="text-xs text-gray-600 mb-2">Fast & Efficient blockchain network</p>
                                <div className="flex items-center gap-4 text-xs">
                                    <div>
                                        <span className="text-gray-500">Network Fee:</span>
                                        <span className="text-blue-600 font-semibold ml-1">~1-2 USDT</span>
                                    </div>
                                    <div>
                                        <span className="text-gray-500">Processing Time:</span>
                                        <span className="text-blue-600 font-semibold ml-1">10-30 min</span>
                                    </div>
                                </div>
                            </div>
                        </div> */}
          </div>
        </div>
        <div className="mt-4">
          <TransactionTable
            state={state}
            setState={setState}
            selectedStatus={selectedStatus}
            setSelectedStatus={setSelectedStatus}
            handleSearch={(e) => {
              clearTimeout(window.searchTimeout);
              window.searchTimeout = setTimeout(() => {
                setState({ ...state, search: e.target.value, page: 1 });
              }, 500);
            }}
            loading={historyLoading}
            transactions={transactions}
            pagination={pagination}
          />
        </div>
      </div>
    </div>
    // </div>
  );
};

export default CryptoWithdrawal;
