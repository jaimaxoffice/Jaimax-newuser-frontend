import React from "react";
import { Coins, CheckCircle } from "lucide-react";

const ActiveSlab = ({
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
  staking,
  setStaking,
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
            {/* Wallet Card */}
            <div
              className={`flex-1 border rounded-lg p-3 cursor-pointer transition ${
                paymentMethod === "wallet"
                  ? "border-emerald-700 bg-emerald-50"
                  : "border-gray-200 bg-white hover:border-gray-300"
              }`}
              onClick={() => {
                onChangePaymentMethod("wallet");
                setStaking(false);
              }}
            >
              <label className="flex items-center gap-2 cursor-pointer text-xs mb-0">
                <input
                  type="radio"
                  name="paymentMethod"
                  checked={paymentMethod === "wallet"}
                  onChange={() => {}}
                  className="w-3 h-3"
                />
                <span className="text-xs font-semibold text-gray-800">
                  {staking ? " Staking " : "Wallet"}
                </span>
                 {paymentMethod === "wallet" && (
                <div className="flex items-center justify-end ml-5">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setStaking(!staking);
                    }}
                    className={`relative w-10 h-5 rounded-full transition-colors ${
                      staking ? "bg-emerald-600" : "bg-gray-300"
                    }`}
                  >
                    <span
                      className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full transition-transform shadow-sm ${
                        staking ? "translate-x-5" : "translate-x-0"
                      }`}
                    />
                  </button>
                </div>
              )}
              </label>

              {/* Toggle Switch - Only show when Wallet is selected */}
             
            </div>

            {/* Available Balance Card */}
            <div
              className={`flex-1 border rounded-lg p-3 cursor-pointer transition ${
                paymentMethod === "Available Balance"
                  ? "border-emerald-700 bg-emerald-50"
                  : "border-gray-200 bg-white hover:border-gray-300"
              }`}
              onClick={() => {
                onChangePaymentMethod("Available Balance");
                setStaking(false);
              }}
            >
              <label className="flex items-center gap-2 cursor-pointer text-xs">
                <input
                  type="radio"
                  name="paymentMethod"
                  checked={paymentMethod === "Available Balance"}
                  onChange={() => {}}
                  className="w-3 h-3"
                />
                <span className="text-xs font-semibold text-gray-800">
                  Available Balance
                </span>
              </label>
            </div>
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
            </div>
            <p className="text-emerald-800 text-sm font-bold">
              ₹{slab.prices.inr.toFixed(5)}
            </p>
          </div>
          <div className="flex-1 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-2 border border-blue-200/50 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-blue-700 text-xs font-semibold">USD</span>
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

export default ActiveSlab;