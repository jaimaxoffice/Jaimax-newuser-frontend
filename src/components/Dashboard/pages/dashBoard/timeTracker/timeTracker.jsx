import React, { useRef, useState, useEffect, useCallback } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Coins,
  DollarSign,
  Clock,
  CheckCircle,
} from "lucide-react";
import {
  useGetRoundQuery,
  useAddOrderMutation,
  useProceedOrderMutation,
  useCreatePaymentMutation,
  useCreatePaypalOrderMutation,
  useGetAdminSettingsQuery,
  useUserDataQuery,
} from "../DashboardApliSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import jcoin from "../../../../../assets/logo.png";
import Cookies from "js-cookie";
// Static fallback data
const staticSlabsData = [
  {
    id: 1,
    title: "1st ICO Slab",
    status: "Live",
    statusColor: "bg-emerald-500",
    type: "active",
    prices: { usd: 0.00024, inr: 0.02 },
    soldPercentage: 20.5,
    totalCoins: "50000000000",
    description: "Invest in Jaimax 1st ICO slab for your financial future.",
  },
  {
    id: 2,
    title: "2nd ICO Slab",
    status: "Upcoming",
    statusColor: "bg-amber-500",
    type: "upcoming",
    prices: { usd: 0.00059, inr: 0.05 },
    totalCoins: "20000000000",
  },
  {
    id: 3,
    title: "3rd ICO Slab",
    status: "Upcoming",
    statusColor: "bg-amber-500",
    type: "upcoming",
    prices: { usd: 0.0071, inr: 0.6 },
    totalCoins: "25000000000",
  },
  {
    id: 4,
    title: "4th ICO Slab",
    status: "Upcoming",
    statusColor: "bg-amber-500",
    type: "upcoming",
    prices: { usd: 0.01893, inr: 1.6 },
    totalCoins: "30000000000",
  },
  {
    id: 5,
    title: "5th ICO Slab",
    status: "Upcoming",
    statusColor: "bg-amber-500",
    type: "upcoming",
    prices: { usd: 0.00189, inr: 0.159 },
    totalCoins: "23000000000",
  },
];

// Helper function to get ordinal numbers
const getOrdinalNumber = (num) => {
  const suffixes = ["th", "st", "nd", "rd"];
  const remainder = num % 100;
  const suffix =
    suffixes[(remainder - 20) % 10] || suffixes[remainder] || suffixes[0];
  return `${num}${suffix}`;
};

// Helper function to transform API data to component format
const transformApiDataToSlabs = (apiData) => {
  if (!apiData?.data?.rounds) return staticSlabsData;

  return apiData.data.rounds.map((round) => {
    const soldPercentage = ((round.soldQty / round.totalQty) * 100).toFixed(2);
    const isActive = round.status === 1;

    return {
      id: round.round,
      _id: round._id,
      title: `${getOrdinalNumber(round.round)} ICO Slab`,
      status: isActive ? "Live" : round.status === 2 ? "Sold" : "Upcoming",
      statusColor: isActive
        ? "bg-emerald-500"
        : round.status === 2
        ? "bg-red-500"
        : "bg-amber-500",
      type: isActive ? "active" : round.status === 2 ? "sold" : "upcoming",
      prices: {
        usd: round.atPriceUsdt,
        inr: round.atPriceInr,
      },
      soldPercentage: parseFloat(soldPercentage),
      totalCoins: round.totalQty.toString(),
      soldQty: round.soldQty,
      remainingQty: round.remaingQty,
      jaimaxCoins: round.jaimaxCoins,
      round: round.round,
      atPriceInr: round.atPriceInr,
      atPriceUsdt: round.atPriceUsdt,
      description: isActive
        ? `Invest in Jaimax ${getOrdinalNumber(
            round.round
          )} ICO slab for your financial future.`
        : round.status === 2
        ? `${getOrdinalNumber(round.round)} ICO slab has been sold out.`
        : `Get ready for the ${getOrdinalNumber(round.round)} ICO slab launch.`,
    };
  });
};

// Payment Modal Component
const PaymentModal = ({
  show,
  onHide,
  onConfirmPayment,
  purchasingAmount,
  currency,
  addOrderError,
  userData,
}) => {
  const [loading, setLoading] = useState(false);

  if (!show) return null;

  const handlePayment = async (method) => {
    setLoading(true);
    try {
      await onConfirmPayment(method);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl p-5 sm:p-6 max-w-3xl w-full mx-3 relative max-h-[85vh] overflow-y-auto border border-teal-200">
        {/* Close button */}
        <button
          className="absolute top-3 right-3 text-teal-500 hover:text-teal-700 text-2xl font-bold transition"
          onClick={onHide}
        >
          ×
        </button>

        {/* Title */}
        <h2 className="text-lg sm:text-xl font-bold mb-4 text-teal-700">
          Purchase Coins Breakdown
        </h2>

        {/* Table */}
        <div className="overflow-x-auto mb-5">
          <table className="w-full text-sm border border-teal-100 rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-teal-50">
                <th className="border border-teal-100 px-3 py-2 text-center font-semibold text-teal-700">
                  Round
                </th>
                <th className="border border-teal-100 px-3 py-2 text-center font-semibold text-teal-700">
                  Price ({currency})
                </th>
                <th className="border border-teal-100 px-3 py-2 text-center font-semibold text-teal-700">
                  Amount ({currency})
                </th>
                <th className="border border-teal-100 px-3 py-2 text-center font-semibold text-teal-700">
                  Coins Qty
                </th>
              </tr>
            </thead>
            <tbody>
              {purchaseCoinsBreakup?.shortageResolution?.map((item, index) => {
                const resolvedPrice =
                  currency === "INR"
                    ? item.resolvedPriceInr
                    : item.resolvedPriceUsdt;
                return (
                  <tr
                    key={item.round}
                    className={index % 2 === 0 ? "bg-white" : "bg-teal-50/30"}
                  >
                    <td className="border border-teal-100 px-3 py-2 text-center">
                      {item.round}
                    </td>
                    <td className="border border-teal-100 px-3 py-2 text-center">
                      {Number(resolvedPrice).toFixed(5)}
                    </td>
                    <td className="border border-teal-100 px-3 py-2 text-right">
                      {Number(item.amount).toFixed(2)}
                    </td>
                    <td className="border border-teal-100 px-3 py-2 text-right">
                      {Number(item.resolvedQty).toLocaleString()}
                    </td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot>
              {/* Charges Row */}
              <tr className="bg-orange-50 font-medium">
                <td className="border border-teal-100 px-3 py-2 text-center text-orange-700">
                  Charges
                </td>
                <td
                  className="border border-teal-100 px-3 py-2 text-center text-orange-700"
                  colSpan={3}
                >
                  {(Number(purchaseCoinsBreakup?.charges) || 0).toFixed(2)}{" "}
                  {currency}
                </td>
              </tr>

              {/* Total Row */}
              <tr className="bg-teal-100 font-bold">
                <td className="border border-teal-100 px-3 py-2 text-center">
                  Total
                </td>
                <td className="border border-teal-100 px-3 py-2 text-center">
                  {(
                    Number(purchaseCoinsBreakup?.requestedAmount) -
                    Number(purchaseCoinsBreakup?.totalAmount)
                  ).toFixed(2)}
                </td>
                <td className="border border-teal-100 px-3 py-2 text-right text-teal-800">
                  {(Number(purchaseCoinsBreakup?.totalAmount) || 0).toFixed(2)}
                </td>
                <td className="border border-teal-100 px-3 py-2 text-right text-teal-800">
                  {Number(purchaseCoinsBreakup?.totalCoins) || 0}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3">
          <button
            className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-lg text-sm transition"
            onClick={onHide}
            disabled={isProcessing}
          >
            Cancel
          </button>
          <button
            type="button"
            className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg text-sm transition disabled:opacity-50"
            onClick={onSubmitCoins}
            disabled={isProcessing}
          >
            {isProcessing ? "Processing..." : "Proceed"}
          </button>
        </div>
      </div>
    </div>
  );
};

// Purchase Coins Breakup Modal Component
const PurchaseCoinsBreakupModal = ({
  show,
  onHide,
  purchaseCoinsBreakup,
  currency,
  onSubmitBuy,
}) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const onSubmitCoins = useCallback(async () => {
    if (isProcessing) return;

    try {
      setIsProcessing(true);
      await onSubmitBuy();
    } catch (error) {
      // console.error("Error during operation:", error);
      toast.error(`Error: ${error.message || "An unknown error occurred"}`, {
        position: "top-center",
      });
    } finally {
      setIsProcessing(false);
    }
  }, [isProcessing, onSubmitBuy]);

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl p-5 sm:p-6 max-w-3xl w-full mx-3 relative max-h-[85vh] overflow-y-auto border border-teal-200">
        {/* Close button */}
        <button
          className="absolute top-3 right-3 text-teal-500 hover:text-teal-700 text-2xl font-bold transition"
          onClick={onHide}
        >
          ×
        </button>

        {/* Title */}
        <h2 className="text-lg sm:text-xl font-bold mb-4 text-teal-700 flex items-center gap-2">
          Purchase Coins Breakdown
        </h2>

        {/* Table */}
        <div className="overflow-x-auto mb-5">
          <table className="w-full text-sm border border-teal-100 rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-teal-50">
                <th className="border border-teal-100 px-3 py-2 text-center font-semibold text-teal-700">
                  Round
                </th>
                <th className="border border-teal-100 px-3 py-2 text-center font-semibold text-teal-700">
                  Price ({currency})
                </th>
                <th className="border border-teal-100 px-3 py-2 text-center font-semibold text-teal-700">
                  Amount ({currency})
                </th>
                <th className="border border-teal-100 px-3 py-2 text-center font-semibold text-teal-700">
                  Coins Qty
                </th>
              </tr>
            </thead>
            <tbody>
              {purchaseCoinsBreakup?.shortageResolution?.map((item, index) => {
                const resolvedPrice =
                  currency === "INR"
                    ? item.resolvedPriceInr
                    : item.resolvedPriceUsdt;
                return (
                  <tr
                    key={item.round}
                    className={index % 2 === 0 ? "bg-white" : "bg-teal-50/30"}
                  >
                    <td className="border border-teal-100 px-3 py-2 text-center">
                      {item.round}
                    </td>
                    <td className="border border-teal-100 px-3 py-2 text-center">
                      {resolvedPrice?.toFixed(5)}
                    </td>
                    <td className="border border-teal-100 px-3 py-2 text-right">
                      {item.amount?.toFixed(2)}
                    </td>
                    <td className="border border-teal-100 px-3 py-2 text-right">
                      {item.resolvedQty?.toLocaleString()}
                    </td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot>
              {/* Charges Row */}
              <tr className="bg-orange-50 font-medium">
                <td className="border border-teal-100 px-3 py-2 text-center text-orange-700">
                  Charges
                </td>
                <td
                  className="border border-teal-100 px-3 py-2 text-center text-orange-700"
                  colSpan={3}
                >
                  {(
                    Number(purchaseCoinsBreakup?.requsetedAmount) -
                    Number(purchaseCoinsBreakup?.totalAmount)
                  ).toFixed(2)}{" "}
                  {currency}
                  
                </td>
                {console.log(Number(purchaseCoinsBreakup?.requsetedAmount) -
                    Number(purchaseCoinsBreakup?.totalAmount))}
              </tr>

              {/* Total Row */}
              <tr className="bg-teal-100 font-bold">
                <td className="border border-teal-100 px-3 py-2 text-center">
                  Total
                </td>
                <td className="border border-teal-100 px-3 py-2 text-center">
                  —
                </td>
                <td className="border border-teal-100 px-3 py-2 text-right text-teal-800">
                  {(Number(purchaseCoinsBreakup?.totalAmount) || 0).toFixed(2)}
                </td>
                <td className="border border-teal-100 px-3 py-2 text-right text-teal-800">
                  {purchaseCoinsBreakup?.totalCoins}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3">
          <button
            className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-lg text-sm transition"
            onClick={onHide}
            disabled={isProcessing}
          >
            Cancel
          </button>
          <button
            type="button"
            className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg text-sm transition disabled:opacity-50"
            onClick={onSubmitCoins}
            disabled={isProcessing}
          >
            {isProcessing ? "Processing..." : "Proceed"}
          </button>
        </div>
      </div>
    </div>

    // <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
    //   <div className="bg-white rounded-xl shadow-2xl p-6 max-w-4xl w-full mx-4 relative max-h-[90vh] overflow-y-auto">
    //     <button
    //       className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-xl font-bold"
    //       onClick={onHide}
    //     >
    //       ×
    //     </button>

    //     <h2 className="text-xl font-bold mb-6 text-gray-800">
    //       Purchase Coins Breakdown
    //     </h2>

    //     <div className="overflow-x-auto mb-6">
    //       <table className="w-full border-collapse border border-gray-300 rounded-lg overflow-hidden">
    //         <thead>
    //           <tr className="bg-gray-100">
    //             <th className="border border-gray-300 px-4 py-3 text-center font-bold text-gray-700">
    //               Round
    //             </th>
    //             <th className="border border-gray-300 px-4 py-3 text-center font-bold text-gray-700">
    //               Price ({currency})
    //             </th>
    //             <th className="border border-gray-300 px-4 py-3 text-center font-bold text-gray-700">
    //               Amount ({currency})
    //             </th>
    //             <th className="border border-gray-300 px-4 py-3 text-center font-bold text-gray-700">
    //               Coins Quantity
    //             </th>
    //           </tr>
    //         </thead>
    //         <tbody>
    //           {purchaseCoinsBreakup?.shortageResolution?.map((item, index) => {
    //             const resolvedPrice =
    //               currency === "INR"
    //                 ? item.resolvedPriceInr
    //                 : item.resolvedPriceUsdt;
    //             return (
    //               <tr
    //                 key={item.round}
    //                 className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
    //               >
    //                 <td className="border border-gray-300 px-4 py-3 text-center font-medium">
    //                   {item.round}
    //                 </td>
    //                 <td className="border border-gray-300 px-4 py-3 text-center">
    //                   {resolvedPrice?.toFixed(5)}
    //                 </td>
    //                 <td className="border border-gray-300 px-4 py-3 text-right">
    //                   {item.amount?.toFixed(2)}
    //                 </td>
    //                 <td className="border border-gray-300 px-4 py-3 text-right">
    //                   {item.resolvedQty?.toLocaleString()}
    //                 </td>
    //               </tr>
    //             );
    //           })}
    //         </tbody>
    //         <tfoot>
    //           <tr className="bg-emerald-50 font-bold">
    //             <td className="border border-gray-300 px-4 py-3 text-center">
    //               Total
    //             </td>
    //             {console.log(purchaseCoinsBreakup, "hello")}
    //             {console.log(
    //               typeof purchaseCoinsBreakup.requestedAmount,
    //               "requested data"
    //             )}
    //             {console.log(
    //               typeof purchaseCoinsBreakup.totalAmount,
    //               "requested amount"
    //             )}
    //             <td className="border border-gray-300 px-4 py-3 text-center">
    //               {(
    //                 Number(purchaseCoinsBreakup?.requestedAmount) -
    //                 Number(purchaseCoinsBreakup?.totalAmount)
    //               ).toFixed(2)}
    //             </td>

    //             <td className="border border-gray-300 px-4 py-3 text-right text-emerald-700">
    //               {purchaseCoinsBreakup?.totalAmount}
    //             </td>
    //             <td className="border border-gray-300 px-4 py-3 text-right text-emerald-700">
    //               {purchaseCoinsBreakup?.totalCoins}
    //             </td>
    //           </tr>
    //         </tfoot>
    //       </table>
    //     </div>

    //     <div className="flex justify-center gap-4">
    //       <button
    //         className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-6 py-2 rounded-full transition-colors duration-200"
    //         onClick={onHide}
    //         disabled={isProcessing}
    //       >
    //         Cancel
    //       </button>
    //       <button
    //         type="button"
    //         className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-full transition-colors duration-200 disabled:opacity-50"
    //         onClick={onSubmitCoins}
    //         disabled={isProcessing}
    //       >
    //         {isProcessing ? "Processing..." : "Proceed with Purchase"}
    //       </button>
    //     </div>
    //   </div>
    // </div>
  );
};

const ActiveSlabContent = ({
  slab,
  isActive,
  onProceedOrder,
  amount,
  setAmount,
  currency,
  onChangeCurrency,
  paymentMethod,
  onChangePaymentMethod,
  errors,
  handleInputChange,
  handleBlur,
  userData,
}) => {
  return (
    <div
      className={`bg-gradient-to-br from-white via-emerald-50/30 to-teal-50/50 rounded-xl p-4 text-gray-800 shadow-xl border border-emerald-200/50 backdrop-blur-sm transform transition-all duration-700 min-h-[250px] relative overflow-hidden ${
        isActive ? "scale-100 opacity-100" : "scale-95 opacity-80"
      }`}
    >
      <div className="relative z-10">
        {/* Header with Status */}
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse shadow-lg shadow-emerald-500/50"></div>
            <h3 className="text-gray-800 font-bold text-base bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              {slab.title}
            </h3>
          </div>
          <span
            className={`${slab.statusColor} text-white text-xs px-2 py-1 rounded-full flex items-center gap-1 shadow-lg font-semibold`}
          >
            <CheckCircle size={12} />
            {slab.status}
          </span>
        </div>

        {/* Currency Selection */}
        <div className="mb-3">
          <label className="block text-xs font-bold text-gray-700 mb-2">
            Pay with
          </label>
          <div className="flex gap-3">
            {userData?.data?.countryCode === 91 && (
              <label className="flex items-center gap-2 cursor-pointer text-xs">
                <input
                  type="radio"
                  name="currency"
                  value="INR"
                  checked={currency === "INR"}
                  onChange={() => onChangeCurrency("INR")}
                  className="w-3 h-3"
                />
                <span
                  className={`text-xs font-semibold ${
                    currency === "INR" ? "text-emerald-700" : "text-gray-500"
                  }`}
                >
                  INR
                </span>
              </label>
            )}
            <label className="flex items-center gap-2 cursor-pointer text-xs">
              <input
                type="radio"
                name="currency"
                value="USD"
                checked={currency === "USD"}
                onChange={() => onChangeCurrency("USD")}
                disabled={userData?.data?.countryCode === 91}
                className="w-3 h-3"
              />
              <span
                className={`text-xs font-semibold ${
                  currency === "USD" ? "text-emerald-700" : "text-gray-500"
                }`}
              >
                USD
              </span>
            </label>
          </div>
        </div>

        {/* Payment Method Selection */}
        <div className="mb-3">
          <label className="block text-xs font-bold text-gray-700 mb-2">
            Payment Method
          </label>
          <div className="flex gap-3">
            <label className="flex items-center gap-2 cursor-pointer text-xs">
              <input
                type="radio"
                name="paymentMethod"
                value="wallet"
                checked={paymentMethod === "wallet"}
                onChange={() => onChangePaymentMethod("wallet")}
                className="w-3 h-3"
              />
              <span
                className={`text-xs font-semibold ${
                  paymentMethod === "wallet"
                    ? "text-emerald-700"
                    : "text-gray-500"
                }`}
              >
                Wallet
              </span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer text-xs">
              <input
                type="radio"
                name="paymentMethod"
                value="Available Balance"
                checked={paymentMethod === "Available Balance"}
                onChange={() => onChangePaymentMethod("Available Balance")}
                className="w-3 h-3"
              />
              <span
                className={`text-xs font-semibold ${
                  paymentMethod === "Available Balance"
                    ? "text-emerald-700"
                    : "text-gray-500"
                }`}
              >
                Available Balance
              </span>
            </label>
          </div>
        </div>

        {/* Amount Input */}
        <div className="mb-3 space-y-2">
          <div className="relative">
            <input
              type="text"
              maxLength={7}
              placeholder="Enter Amount"
              value={amount}
              onChange={handleInputChange}
              onBlur={handleBlur}
              className="w-full bg-white/80 backdrop-blur-sm border border-emerald-200 rounded-lg py-2 px-3 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 shadow-md transition-all duration-300"
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-emerald-600 font-semibold text-xs">
              {currency}
            </div>
          </div>
          {errors.amount && (
            <div className="text-red-600 text-xs">{errors.amount}</div>
          )}

          <button
            onClick={onProceedOrder}
            className="w-full bg-[#085553] hover:bg-[#25b8ac] text-white py-2 px-4 rounded-full text-sm font-bold transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
          >
            Proceed to Pay
          </button>
        </div>

        {/* Price Display */}
        <div className="flex justify-between mb-1 gap-2">
          <div className="flex-1 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-lg p-2 border border-emerald-200/50 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-emerald-700 text-xs font-semibold">
                INR
              </span>
              <span className="text-emerald-600 text-xs">↗ +5.2%</span>
            </div>
            <p className="text-emerald-800 text-sm font-bold">
              ₹{slab.prices.inr.toFixed(5)}
            </p>
          </div>
          <div className="flex-1 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-2 border border-blue-200/50 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-blue-700 text-xs font-semibold">USD</span>
              <span className="text-blue-600 text-xs">↗ +3.8%</span>
            </div>
            <p className="text-blue-800 text-sm font-bold">
              ${slab.prices.usd.toFixed(5)}
            </p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-1">
          <div className="flex justify-between items-center mb-1">
            <span className="text-gray-700 text-xs font-bold flex items-center gap-1">
              <Coins size={12} className="text-emerald-600" />
              Sold Tokens
            </span>
            <span className="text-emerald-700 text-sm font-bold">
              {slab.soldPercentage}%
            </span>
          </div>
          <div className="w-full bg-gradient-to-r from-gray-200 to-gray-300 rounded-full h-2 overflow-hidden shadow-inner">
            <div
              className="bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 h-full rounded-full transition-all duration-1000 ease-out shadow-sm relative overflow-hidden"
              style={{ width: `${slab.soldPercentage}%` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="text-start bg-gradient-to-r from-emerald-50/50 to-teal-50/50 rounded-lg p-1 border border-emerald-100 text-xs">
          <p className="text-gray-700 text-xs leading-relaxed font-medium">
            {slab.description}
          </p>
        </div>
      </div>
    </div>
  );
};

const UpcomingSlabContent = ({ slab, isActive }) => (
  <div
    className={`bg-gradient-to-br from-white via-emerald-50/30 to-teal-50/50 rounded-xl p-4 text-gray-800 shadow-xl border border-emerald-200/50 backdrop-blur-sm transform transition-all duration-700 min-h-[250px] relative overflow-hidden ${
      isActive ? "scale-100 opacity-100" : "scale-95 opacity-80"
    }`}
  >
    <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-amber-400/20 to-transparent rounded-full -translate-y-4 translate-x-4 blur-xl"></div>
    <div className="absolute bottom-0 left-0 w-12 h-12 bg-gradient-to-tr from-orange-400/15 to-transparent rounded-full translate-y-4 -translate-x-4 blur-lg"></div>

    <div className="relative z-10 flex flex-col justify-between h-full">
      <div className="flex justify-between items-center mb-3">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-pulse shadow-lg shadow-amber-500/50"></div>
          <h3 className="text-gray-800 font-bold text-base bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
            {slab.title}
          </h3>
        </div>
        <span
          className={`${slab.statusColor} text-white text-xs px-2 py-1 rounded-full flex items-center gap-1 shadow-lg font-semibold`}
        >
          <Clock size={12} />
          {slab.status}
        </span>
      </div>

      <div className="flex justify-center mb-4">
        <div className="w-24 h-24 rounded-full border border-orange-400 shadow-lg overflow-hidden bg-white p-1">
          <img src={jcoin} alt="Coin" className="w-full h-full object-cover" />
        </div>
      </div>

      <div className="flex justify-between mb-3 gap-2">
        <div className="flex-1 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-2 border border-blue-200/50 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-blue-700 text-xs font-semibold">USD</span>
            <span className="text-blue-600 text-xs">↗ +3.8%</span>
          </div>
          <p className="text-blue-800 text-sm font-bold">
            ${slab.prices.usd.toFixed(5)}
          </p>
        </div>
        <div className="flex-1 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-lg p-2 border border-emerald-200/50 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-emerald-700 text-xs font-semibold">INR</span>
            <span className="text-emerald-600 text-xs">↗ +5.2%</span>
          </div>
          <p className="text-emerald-800 text-sm font-bold">
            ₹{slab.prices.inr.toFixed(5)}
          </p>
        </div>
      </div>

      <div className="mb-3">
        <div className="text-xs font-bold text-gray-700 mb-1 flex items-center gap-1">
          <Coins size={12} className="text-amber-600" />
          Total Coins Ready for Release
        </div>
        <div className="bg-gradient-to-r from-orange-50 to-amber-100 rounded-lg p-3 border border-amber-200/50 shadow text-center">
          <p className="text-lg font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
            {parseInt(slab.totalCoins).toLocaleString()}
          </p>
        </div>
      </div>

      <div className="text-start bg-gradient-to-r from-amber-50/50 to-orange-50/50 rounded-lg p-2 border border-amber-100">
        <p className="text-gray-700 text-sm">{slab.description}</p>
      </div>
    </div>
  </div>
);

const SoldSlabContent = ({ slab, isActive }) => (
  <div
    className={`bg-gradient-to-br from-white via-red-50/30 to-pink-50/50 rounded-xl p-4 text-gray-800 shadow-xl border border-red-200/50 backdrop-blur-sm transform transition-all duration-700 min-h-[250px] relative overflow-hidden ${
      isActive ? "scale-100 opacity-100" : "scale-95 opacity-80"
    }`}
  >
    <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-red-400/20 to-transparent rounded-full -translate-y-4 translate-x-4 blur-xl"></div>
    <div className="absolute bottom-0 left-0 w-12 h-12 bg-gradient-to-tr from-pink-400/15 to-transparent rounded-full translate-y-4 -translate-x-4 blur-lg"></div>

    <div className="relative z-10 flex flex-col justify-between h-full">
      <div className="flex justify-between items-center mb-3">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 bg-red-500 rounded-full shadow-lg shadow-red-500/50"></div>
          <h3 className="text-gray-800 font-bold text-base bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">
            {slab.title}
          </h3>
        </div>
        <span
          className={`${slab.statusColor} text-white text-xs px-2 py-1 rounded-full flex items-center gap-1 shadow-lg font-semibold`}
        >
          <CheckCircle size={12} />
          {slab.status}
        </span>
      </div>

      <div className="flex justify-center mb-4">
        <div className="w-24 h-24 rounded-full border border-red-400 shadow-lg overflow-hidden bg-white p-1">
          <img src={jcoin} alt="Coin" className="w-full h-full object-cover" />
        </div>
      </div>

      <div className="flex justify-between mb-3 gap-2">
        <div className="flex-1 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-2 border border-blue-200/50 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-blue-700 text-xs font-semibold">USD</span>
            <span className="text-blue-600 text-xs">Final Price</span>
          </div>
          <p className="text-blue-800 text-sm font-bold">
            ${slab.prices.usd.toFixed(5)}
          </p>
        </div>
        <div className="flex-1 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-lg p-2 border border-emerald-200/50 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-emerald-700 text-xs font-semibold">INR</span>
            <span className="text-emerald-600 text-xs">Final Price</span>
          </div>
          <p className="text-emerald-800 text-sm font-bold">
            ₹{slab.prices.inr.toFixed(5)}
          </p>
        </div>
      </div>

      <div className="mb-3">
        <div className="text-xs font-bold text-gray-700 mb-1 flex items-center gap-1">
          <Coins size={12} className="text-red-600" />
          Total Coins Sold
        </div>
        <div className="bg-gradient-to-r from-red-50 to-pink-100 rounded-lg p-3 border border-red-200/50 shadow text-center">
          <p className="text-lg font-bold bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">
            {parseInt(slab.totalCoins).toLocaleString()}
          </p>
        </div>
      </div>

      <div className="text-start bg-gradient-to-r from-red-50/50 to-pink-50/50 rounded-lg p-2 border border-red-100">
        <p className="text-gray-700 text-sm">{slab.description}</p>
      </div>
    </div>
  </div>
);

const SlabTabs = () => {
  const [activeTab, setActiveTab] = useState(0);
  const navigate = useNavigate();

  // Form states
  const [currency, setCurrency] = useState("INR");
  const [amount, setAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("wallet");
  const [errors, setErrors] = useState({});
  const [isToastShown, setIsToastShown] = useState(false);
  const [loading, setLoading] = useState(false);

  // Modal states
  const [showModal, setShowModal] = useState(false);
  const [showPurchaseCoinsModal, setShowPurchaseCoinsModal] = useState(false);
  const [purchaseCoinsBreakup, setPurchaseCoinsBreakup] = useState({});
  const [isAddOrderError, setIsAddOrderError] = useState("");

  // Get user data
  const userDataTopasID = Cookies.get("userData");
  const parsedUserData = JSON.parse(userDataTopasID || "{}");

  // console.log(parsedUserData.data)
  const userDataTopassid = parsedUserData?._id;

  // console.log(userDataTopassid)

  // API hooks
  const { data: apiData, refetch: refetchRounds } = useGetRoundQuery();
  const { data: userData, refetch: refetchUserData } = useUserDataQuery();
  const { data: settings } = useGetAdminSettingsQuery();
  const [addOrder] = useAddOrderMutation();
  const [proceedOrder] = useProceedOrderMutation();
  const [createPayment] = useCreatePaymentMutation();
  const [createPaypalOrder] = useCreatePaypalOrderMutation();

  // Transform API data to component format, fallback to static data
  const slabsData = React.useMemo(() => {
    return transformApiDataToSlabs(apiData);
  }, [apiData]);

  // Set currency based on user country
  useEffect(() => {
    setCurrency(userData?.data?.countryCode === 91 ? "INR" : "USD");
  }, [userData?.data?.countryCode]);

  const handleTabClick = (index) => {
    setActiveTab(index);
    // Reset form when changing tabs
    setAmount("");
    setErrors({});
  };

  const getOrdinalSuffix = (num) => {
    const suffixes = ["th", "st", "nd", "rd"];
    const remainder = num % 100;
    return (
      suffixes[(remainder - 20) % 10] || suffixes[remainder] || suffixes[0]
    );
  };

  // Validation functions
  const validate = () => {
    let error = "";
    if (!amount) {
      error = "Amount is required";
    } else if (isNaN(Number(amount))) {
      error = "Amount must be a number";
    } else if (Number(amount) <= 0) {
      error = "Amount must be greater than 0";
    }

    if (error) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        amount: error,
      }));
      return false;
    }

    return true;
  };

  const handleInputChange = (e) => {
    const input = e.target.value;
    const numberPattern = /^[0-9]*$/;

    if (numberPattern.test(input)) {
      setAmount(input);
      setErrors((prevErrors) => ({
        ...prevErrors,
        amount: "",
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        amount: "Please enter only numbers.",
      }));
    }
  };

  const handleBlur = () => {
    const value = parseInt(amount, 10);
    const newErrors = {};

    if (!amount) {
      newErrors.amount = "Amount is required";
    } else if (isNaN(value)) {
      newErrors.amount = "Invalid amount entered.";
    } else if (settings?.data) {
      const isINR = currency === "INR";
      const currencySettings = isINR
        ? {
            min: settings.data.buy_min_price_jaimax_inr,
            max: settings.data.buy_max_price_jaimax_inr,
          }
        : {
            min: settings.data.buy_min_price_jaimax_usd,
            max: settings.data.buy_max_price_jaimax_usd,
          };

      const minAmount =
        isINR && Boolean(userData?.data.isActive) ? 100 : currencySettings.min;
      const maxAmount = currencySettings.max;

      if (value < minAmount) {
        newErrors.amount = `Minimum amount should be ${
          isINR ? "₹" : "$"
        }${minAmount}.`;
      } else if (value > maxAmount) {
        newErrors.amount = `Maximum amount should be ${
          isINR ? "₹" : "$"
        }${maxAmount}.`;
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onChangeCurrency = (currencyValue) => {
    setCurrency(currencyValue);
    if (amount) {
      setErrors({});
    }
  };

  const onChangePaymentMethod = (method) => {
    setPaymentMethod(method);
  };
  const onProceedOrder = async (e) => {
    e?.preventDefault();
    if (!validate() || !handleBlur() || Object.keys(errors).length !== 0) {
      return;
    }

    const payload = {
      amount: +amount,
      currency: currency,
      userId: userDataTopassid,
    };

    try {
      const response = await proceedOrder(payload).unwrap();
      console.log(response?.data?.requsetedAmount, "response");
      if (response.status_code === 200) {
        if (response.data.shortageResolved) {
          setPurchaseCoinsBreakup({
            shortageResolution: response.data.shortageData,
            totalCoins: response.data.totalCoins,
            totalAmount: response.data.totalAmount,
            requestedAmount: response.data.requsetedAmount,
          });
          setShowPurchaseCoinsModal(true);
        } else {
          setIsToastShown(true);
          if (!isToastShown) {
            toast.error("Insufficient coins available in ICO Rounds", {
              position: "top-center",
            });
          } else {
            toast.dismiss();
            toast.error("Insufficient coins available in ICO Rounds", {
              position: "top-center",
            });
          }
        }
      }
    } catch (error) {
      setPurchaseCoinsBreakup({});
      setShowPurchaseCoinsModal(false);
      setIsToastShown(true);
      if (!isToastShown) {
        toast.error(`${error?.data?.message}`, {
          position: "top-center",
        });
      } else {
        toast.dismiss();
        toast.error(`${error?.data?.message}`, {
          position: "top-center",
        });
      }
    }
  };
  const onSubmitBuy = async () => {
    if (!validate() || !handleBlur() || Object.keys(errors).length !== 0) {
      return;
    }

    const payload = {
      amount: +amount,
      currency: currency,
      paymentMethod: paymentMethod,
      id: userDataTopassid,
    };

    try {
      const response = await addOrder(payload).unwrap();
      if (response.status_code === 200) {
        toast.success(`${response?.message}`, {
          position: "top-center",
        });
        setAmount("");
        setShowPurchaseCoinsModal(false);
        refetchUserData();
        refetchRounds();
        navigate("/buy-history");
      }
    } catch (error) {
      setIsToastShown(true);
      const errorMessage = error?.data?.message || "An error occurred";
      if (!isToastShown) {
        toast.error(errorMessage, {
          position: "top-center",
        });
      } else {
        toast.dismiss();
        toast.error(errorMessage, {
          position: "top-center",
        });
      }
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setIsAddOrderError("");
  };

  const onSubmitPayment = async (method) => {
    setLoading(true);
    const payload = {
      amount: amount,
      currency: currency,
      paymentMethod: method,
      id: userDataTopassid,
    };

    try {
      const response = await addOrder(payload).unwrap();
      if (response.status_code === 200) {
        setIsAddOrderError("");
        toast.success(`${response?.message}`, {
          position: "top-center",
        });
        handleCloseModal();

        if (method === "cashFree") {
          await handleCreatePayment(response?.data?._id);
        } else if (method === "paypal") {
          await handleCreatePaypalPayment(response?.data?._id);
        } else {
          setAmount("");
          refetchUserData();
          refetchRounds();
          navigate("/buy-history");
        }
      }
    } catch (error) {
      setIsAddOrderError(error?.data?.message || "Payment failed");
    } finally {
      setLoading(false);
    }
  };

  const handleCreatePayment = async (orderId) => {
    try {
      const payload = { order_id: orderId };
      const res = await createPayment(payload).unwrap();
      const paymentSessionId = res?.data?.payment_session_id;

      // Initialize payment gateway here
      toast.info("Redirecting to payment gateway...", {
        position: "top-center",
      });

      // Add your payment gateway integration here
      // doPayment(paymentSessionId);
    } catch (error) {
      // console.error(error);
      toast.error(`${error?.data?.message}`, {
        position: "top-center",
      });
    } finally {
      refetchUserData();
    }
  };

  const handleCreatePaypalPayment = async (orderId) => {
    try {
      const payload = { order_id: orderId };
      const res = await createPaypalOrder(payload).unwrap();
      window.location.href = res?.data?.forwardLink;
    } catch (error) {
      toast.error(`${error?.data?.message}`, {
        position: "top-center",
      });
    } finally {
      refetchUserData();
    }
  };

  // Loading state - only show if no data at all
  if (slabsData.length === 0) {
    return (
      <div className="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 rounded-2xl w-full max-w-7xl mx-auto shadow-2xl border border-white/50 backdrop-blur-sm">
        <div className="px-4 py-8 text-center">
          <Coins className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">No ICO rounds available</p>
        </div>
      </div>
    );
  }

  const currentSlab = slabsData[activeTab];

  return (
    <>
      <div className="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 rounded-2xl w-full max-w-7xl mx-auto shadow-2xl border border-white/50 backdrop-blur-sm">
        <div className="px-4 py-3 md:px-3 md:py-1">
          {/* Desktop Tabs */}
          <div className="hidden md:flex justify-center mb-2">
            <div className="flex rounded-xl p-1 shadow-xl overflow-x-auto gap-2 max-w-full no-scrollbar backdrop-blur-sm">
              {slabsData.map((slab, index) => (
                <button
                  key={slab.id}
                  onClick={() => handleTabClick(index)}
                  className={`px-3 py-1 text-sm rounded-full font-bold transition-all duration-500 whitespace-nowrap flex-shrink-0 relative overflow-hidden group ${
                    activeTab === index
                      ? "bg-[#2cdacc] text-white shadow-lg shadow-emerald-500/25 scale-105"
                      : "bg-[#0d9387] text-slate-300 hover:from-slate-600 hover:to-slate-700 hover:text-white hover:scale-102 shadow-md"
                  }`}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform -skew-x-12"></div>
                  <span className="relative z-10">
                    {slab.id}
                    &ensp; Slab
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Mobile Tabs */}
          <div className="flex md:hidden justify-start mb-4 overflow-x-auto no-scrollbar">
            <div className="flex gap-2 min-w-max px-2">
              {slabsData.map((slab, index) => (
                <button
                  key={slab.id}
                  onClick={() => handleTabClick(index)}
                  className={`px-3 py-2 text-xs rounded-full font-bold transition-all duration-500 whitespace-nowrap flex-shrink-0 border ${
                    activeTab === index
                      ? "bg-gradient-to-r from-teal-500 to-teal-500 text-white border-emerald-400 shadow-md shadow-emerald-500/25"
                      : "bg-gradient-to-r from-teal-700 to-slate-800 text-slate-300 border-slate-600 hover:from-slate-600 hover:to-slate-700 hover:text-white shadow-sm"
                  }`}
                >
                  {slab.id}
                  {/* {getOrdinalSuffix(slab.id)} */}. Slab
                </button>
              ))}
            </div>
          </div>

          {/* Carousel Area */}
          <div className="relative group">
            {/* Card Container */}
            <div className="flex justify-center">
              <div className="w-full max-w-lg md:max-w-4xl mx-auto">
                {currentSlab?.type === "active" ? (
                  <ActiveSlabContent
                    slab={currentSlab}
                    isActive={true}
                    onProceedOrder={onProceedOrder}
                    amount={amount}
                    setAmount={setAmount}
                    currency={currency}
                    onChangeCurrency={onChangeCurrency}
                    paymentMethod={paymentMethod}
                    onChangePaymentMethod={onChangePaymentMethod}
                    errors={errors}
                    handleInputChange={handleInputChange}
                    handleBlur={handleBlur}
                    userData={userData}
                  />
                ) : currentSlab?.type === "sold" ? (
                  <SoldSlabContent slab={currentSlab} isActive={true} />
                ) : (
                  <UpcomingSlabContent slab={currentSlab} isActive={true} />
                )}
              </div>
            </div>
          </div>

          {/* Pagination Dots */}
          <div className="flex justify-center items-center gap-2 my-1.5">
            {slabsData.map((_, index) => (
              <button
                key={index}
                onClick={() => handleTabClick(index)}
                className={`rounded-full transition-all duration-500 shadow-md ${
                  activeTab === index
                    ? "bg-gradient-to-r from-emerald-500 to-teal-500 w-6 h-2 shadow-emerald-500/25"
                    : "bg-gradient-to-r from-slate-400 to-slate-500 w-2 h-2 hover:from-slate-300 hover:to-slate-400 hover:scale-125"
                }`}
              />
            ))}
          </div>
        </div>

        <style jsx>{`
          .no-scrollbar {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
          .no-scrollbar::-webkit-scrollbar {
            display: none;
          }
        `}</style>
      </div>

      {/* Payment Modal */}
      <PaymentModal
        show={showModal}
        onHide={handleCloseModal}
        onConfirmPayment={onSubmitPayment}
        purchasingAmount={+amount}
        currency={currency}
        addOrderError={isAddOrderError}
        userData={userData}
      />

      {/* Purchase Coins Breakup Modal */}
      <PurchaseCoinsBreakupModal
        show={showPurchaseCoinsModal}
        onHide={() => setShowPurchaseCoinsModal(false)}
        purchaseCoinsBreakup={purchaseCoinsBreakup}
        currency={currency}
        onSubmitBuy={onSubmitBuy}
      />
    </>
  );
};

export default SlabTabs;
