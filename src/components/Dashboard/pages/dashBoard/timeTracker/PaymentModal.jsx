import React, { useState } from "react";

const PaymentModal = ({
  show,
  onHide,
  purchaseCoinsBreakup,
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
                  {(Number(purchaseCoinsBreakup?.requsetedAmount) || 0).toFixed(
                    2
                  )}{" "}
                  {currency}
                </td>
              </tr>

              {/* Total Row */}
              <tr className="bg-teal-100 font-bold">
                <td className="border border-teal-100 px-3 py-2 text-center">
                  Total
                </td>
                <td className="border border-teal-100 px-3 py-2 text-center">
                  {(Number(purchaseCoinsBreakup?.charges) || 0).toFixed(2)}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>

        <div className="flex justify-end gap-3">
          <button
            className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-lg text-sm transition"
            onClick={onHide}
          >
            Cancel
          </button>
          <button
            type="button"
            className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg text-sm transition disabled:opacity-50 flex items-center justify-center gap-2"
            onClick={() => handlePayment(paymentMethod)}
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="animate-spin">⏳</span>
                <span>Processing...</span>
              </>
            ) : (
              "Proceed"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;