import React, { useState, useCallback } from "react";

const PurchaseCoinsModal = ({
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
      toast.error(`Error: ${error.message || "An unknown error occurred"}`, {
        position: "top-center",
        duration: 5000,
        actions: [
          {
            label: 'Retry',
            onClick: () => onSubmitCoins(),
          },
          {
            label: 'Dismiss',
            onClick: () => {},
          }
        ]
      });
    } finally {
      setIsProcessing(false);
    }
  }, [isProcessing, onSubmitBuy]);
  
  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-3 sm:p-6">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl relative flex flex-col max-h-[90vh] border border-teal-200 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-4 border-b border-gray-200">
          <h2 className="text-base sm:text-xl font-bold text-teal-700">
            Purchase Coins Breakdown
          </h2>
          <button
            className="text-gray-400 hover:text-teal-600 text-2xl font-bold transition"
            onClick={onHide}
            aria-label="Close"
          >
            ×
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          
          {/* Mobile Card View */}
          <div className="block sm:hidden space-y-3">
            {purchaseCoinsBreakup?.shortageResolution?.map((item, index) => {
              const resolvedPrice =
                currency === "INR"
                  ? item.resolvedPriceInr
                  : item.resolvedPriceUsdt;
              return (
                <div
                  key={item.round}
                  className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm"
                >
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-sm font-bold text-teal-700">
                      Round {item.round}
                    </span>
                    <span className="text-xs bg-teal-100 text-teal-700 px-2 py-1 rounded">
                      {item.resolvedQty?.toLocaleString()} Coins
                    </span>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Price ({currency})</span>
                      <span className="font-medium">{resolvedPrice?.toFixed(5)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Amount ({currency})</span>
                      <span className="font-medium">{item.amount?.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              );
            })}
            
            {/* Token Price Card */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-bold text-blue-700">Token Price</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-blue-600">INR:</span>
                  <span className="font-medium text-blue-700">₹{purchaseCoinsBreakup?.atPriceInr}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-blue-600">USD:</span>
                  <span className="font-medium text-blue-700">${purchaseCoinsBreakup?.atPriceUsdt}</span>
                </div>
              </div>
            </div>
            
            {/* Amounts Card */}
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-bold text-gray-700">Requested Amount</span>
                  <span className="font-semibold text-gray-800">
                    {(Number(purchaseCoinsBreakup?.requsetedAmount) || 0).toFixed(2)} {currency}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-bold text-gray-700">Effective Amount</span>
                  <span className="font-semibold text-gray-800">
                    {(Number(purchaseCoinsBreakup?.effectiveAmount) || 0).toFixed(2)} {currency}
                  </span>
                </div>
              </div>
            </div>
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-bold text-orange-700">Charges</span>
                <span className="font-semibold text-orange-700">
                  {(Number(purchaseCoinsBreakup?.charges) || 0).toFixed(2)} {currency}
                </span>
              </div>
            </div>
            
            {/* Total Card */}
            <div className="bg-teal-100 border-2 border-teal-300 rounded-lg p-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-bold text-teal-800">Total Coins</span>
                <span className="font-bold text-teal-800">
                  {purchaseCoinsBreakup?.totalCoins?.toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          {/* Desktop Table View */}
          <div className="hidden sm:block overflow-x-auto border border-gray-200 rounded-lg">
            <table className="w-full text-sm text-gray-700">
              <thead className="bg-gray-50 text-gray-600 uppercase text-xs font-semibold tracking-wide">
                <tr>
                  <th className="px-4 py-3 text-left">Round</th>
                  <th className="px-4 py-3 text-center">Price ({currency})</th>
                  <th className="px-4 py-3 text-right">Amount ({currency})</th>
                  <th className="px-4 py-3 text-right">Coins Qty</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {purchaseCoinsBreakup?.shortageResolution?.map(
                  (item, index) => {
                    const resolvedPrice =
                      currency === "INR"
                        ? item.resolvedPriceInr
                        : item.resolvedPriceUsdt;
                    return (
                      <tr
                        key={item.round}
                        className={
                          index % 2 === 0 ? "bg-white" : "bg-teal-50/40"
                        }
                      >
                        <td className="px-4 py-3 text-left font-medium">
                          {item.round}
                        </td>
                        <td className="px-4 py-3 text-center">
                          {resolvedPrice?.toFixed(5)}
                        </td>
                        <td className="px-4 py-3 text-right">
                          {item.amount?.toFixed(2)}
                        </td>
                        <td className="px-4 py-3 text-right font-semibold text-gray-800">
                          {item.resolvedQty?.toLocaleString()}
                        </td>
                      </tr>
                    );
                  }
                )}
              </tbody>
              <tfoot className="font-medium">
                {/* Token Price Row */}
                <tr className="bg-blue-50 text-blue-700">
                  <td className="px-4 py-3 text-left">Token Price</td>
                  <td className="px-4 py-3 text-center" colSpan="3">
                    <div className="flex justify-center space-x-8">
                      <span>₹{purchaseCoinsBreakup?.atPriceInr} (INR)</span>
                      <span>${purchaseCoinsBreakup?.atPriceUsdt} (USD)</span>
                    </div>
                  </td>
                </tr>
                
                {/* Requested Amount Row */}
                <tr className="bg-gray-50 text-gray-700">
                  <td className="px-4 py-3 text-left">Requested Amount</td>
                  <td className="px-4 py-3 text-center">-</td>
                  <td className="px-4 py-3 text-right">
                    {(Number(purchaseCoinsBreakup?.requsetedAmount) || 0).toFixed(2)} {currency}
                  </td>
                  <td className="px-4 py-3 text-right">-</td>
                </tr>
                
                {/* Effective Amount Row */}
                <tr className="bg-gray-100 text-gray-700">
                  <td className="px-4 py-3 text-left">Effective Amount</td>
                  <td className="px-4 py-3 text-center">-</td>
                  <td className="px-4 py-3 text-right">
                    {(purchaseCoinsBreakup?.effectiveAmount)} {currency}
                  </td>
                  <td className="px-4 py-3 text-right">—</td>
                </tr>
                <tr className="bg-orange-50 text-orange-700">
                  <td className="px-4 py-3 text-left">Charges</td>
                  <td className="px-4 py-3 text-center">-</td>
                  <td className="px-4 py-3 text-right">
                    {(Number(purchaseCoinsBreakup?.charges) || 0).toFixed(2)} {currency}
                  </td>
                  <td className="px-4 py-3 text-right">-</td>
                </tr>
                {/* Total Row */}
                <tr className="bg-teal-100 text-teal-800 font-bold">
                  <td className="px-4 py-3 text-left">Total Coins</td>
                  <td className="px-4 py-3 text-center">-</td>
                  <td className="px-4 py-3 text-right">-</td>
                  <td className="px-4 py-3 text-right">
                    {purchaseCoinsBreakup?.totalCoins?.toLocaleString()}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 px-4 sm:px-6 py-4 border-t border-gray-200 bg-gray-50">
          <button
            className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 sm:px-5 py-2 rounded-lg text-sm font-medium transition"
            onClick={onHide}
            disabled={isProcessing}
          >
            Cancel
          </button>
          <button
            type="button"
            className="bg-teal-600 hover:bg-teal-700 text-white px-4 sm:px-5 py-2 rounded-lg text-sm font-semibold transition disabled:opacity-50"
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

export default PurchaseCoinsModal;