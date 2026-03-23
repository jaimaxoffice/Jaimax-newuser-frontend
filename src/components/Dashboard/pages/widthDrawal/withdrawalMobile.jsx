import { useFormik } from "formik";
import {
  AlertCircle,
  AlertTriangle,
  ArrowDown,
  ArrowRightLeft,
  CheckCircle2,
  DollarSign,
  History,
  IndianRupee,
  Loader2,
  Shield,
  TrendingUp,
  Wallet,
  X,
  Zap,
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import {
  useInrToTokenPreviewQuery,
  usePreviewTokenWithdrawMutation,
  useUsdtWithdrawRequestMutation,
} from "./cryptoWithdrawalApiSlice";
import { useGetSettingQuery } from "./withDrawApiSlice";

export default function WithdrawMobile() {
  const { data, isLoading } = useInrToTokenPreviewQuery("USDT");
  const preview = data?.data;
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();

  return (
    <>
      <div className="min-h-screen bg-black p-4 pb-8 max-w-md mx-auto">
        {/* ================= HEADER STATS ================= */}
        <div className="mb-6 pt-2">
          <h1 className="text-xl font-bold text-white mb-1">
            Crypto Withdrawal
          </h1>
          <p className="text-sm text-gray-400">
            Convert your INR to USDT instantly
          </p>
        </div>

        {/* ================= ACTION CARDS ================= */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          {[
            {
              label: "Withdraw",
              sub: "Convert & Send",
              icon: ArrowRightLeft,
              // gradient: "from-emerald-500/20 via-emerald-600/10 to-transparent",
              bg: "emerald-500",
              iconColor: "text-white",
              border: "border-emerald-500/30",
              onClick: () => setShowModal(true),
            },
            {
              label: "History",
              sub: "View Records",
              icon: History,
              // gradient: "from-blue-500/20 via-blue-600/10 to-transparent",
              bg: "blue-500",
              iconColor: "text-white",
              border: "border-blue-500/30",
              onClick: () => navigate("/withdraw/history"),
            },
          ].map((item, i) => (
            <button
              key={i}
              onClick={item.onClick}
              className={`relative overflow-hidden rounded-2xl border ${item.border}
                bg-${item.bg}
                backdrop-blur-xl p-4 text-left
                hover:scale-[1.02] active:scale-[0.98] transition-transform duration-200
                shadow-lg`}
            >
              <div className="relative z-10">
                <div
                  className={`w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center mb-3
                  border border-white/40`}
                >
                  <item.icon size={18} className={item.iconColor} />
                </div>
                <h3 className="text-sm font-semibold text-white mb-0.5">
                  {item.label}
                </h3>
                <p className="text-xs text-gray-700">{item.sub}</p>
              </div>
              <div
                className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl ${item.gradient} 
                opacity-30 blur-2xl`}
              />
            </button>
          ))}
        </div>

        {/* ================= CONVERSION CARD ================= */}
        <div
          className="relative rounded-3xl border border-emerald-500/30 
          bg-gradient-to-br from-emerald-950/40 via-gray-900/60 to-gray-950/40
          backdrop-blur-xl overflow-hidden shadow-2xl"
        >
          {/* Animated glow effect */}
          <div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-emerald-500/10 to-transparent
            animate-[shimmer_3s_infinite]"
            style={{ backgroundSize: "200% 100%" }}
          />

          {/* Glass effect overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />

          <div className="relative p-5 space-y-4">
            {/* Header with live indicator */}
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2">
                <div
                  className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center
                  border border-emerald-500/30"
                >
                  <TrendingUp size={16} className="text-emerald-400" />
                </div>
                <div>
                  <h2 className="text-sm font-semibold text-white">
                    Live Conversion
                  </h2>
                  <p className="text-xs text-gray-400">INR to USDT</p>
                </div>
              </div>
              <div
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-full
                bg-emerald-500/20 border border-emerald-500/30"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs font-medium text-emerald-400">
                  Live
                </span>
              </div>
            </div>

            {/* ================= LOADING STATE ================= */}
            {isLoading && (
              <div className="space-y-3 py-4">
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="w-8 h-8 text-emerald-400 animate-spin" />
                </div>
                <div className="space-y-2">
                  {[1, 2].map((i) => (
                    <div
                      key={i}
                      className="h-16 rounded-xl bg-white/5 
                        animate-pulse border border-white/10"
                    />
                  ))}
                </div>
              </div>
            )}

            {/* ================= DATA DISPLAY ================= */}
            {!isLoading && preview && (
              <>
                {/* Available Balance */}
                <div
                  className="rounded-2xl border border-white/10 bg-white/5 
                  backdrop-blur-sm p-4 space-y-1"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-7 h-7 rounded-lg bg-amber-500/20 flex items-center justify-center
                        border border-amber-500/30"
                      >
                        <IndianRupee size={14} className="text-amber-400" />
                      </div>
                      <span className="text-xs font-medium text-gray-300">
                        Available Balance
                      </span>
                    </div>
                    <Shield size={12} className="text-gray-500" />
                  </div>
                  <p className="text-xl font-bold text-white pl-9">
                    ₹
                    {preview.walletINRBalance.toLocaleString("en-IN", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </p>
                </div>

                {/* Conversion Arrow */}
                <div className="flex justify-center -my-2">
                  <div
                    className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500/30 to-emerald-600/30
                    border border-emerald-500/40 flex items-center justify-center backdrop-blur-sm
                    shadow-lg shadow-emerald-500/20"
                  >
                    <ArrowRightLeft size={16} className="text-emerald-300" />
                  </div>
                </div>

                {/* Estimated Amount */}
                <div
                  className="rounded-2xl border border-emerald-500/30 
                  bg-gradient-to-br from-emerald-500/10 to-emerald-600/5
                  backdrop-blur-sm p-4 space-y-1
                  shadow-lg shadow-emerald-500/5"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-7 h-7 rounded-lg bg-emerald-500/30 flex items-center justify-center
                        border border-emerald-500/40"
                      >
                        <DollarSign size={14} className="text-emerald-300" />
                      </div>
                      <span className="text-xs font-medium text-gray-300">
                        You'll Receive
                      </span>
                    </div>
                    <Zap size={12} className="text-emerald-400" />
                  </div>
                  <p className="text-xl font-bold text-emerald-400 pl-9">
                    {preview.estimatedTokenAmount.toFixed(6)} USDT
                  </p>
                </div>

                {/* Exchange Rate & Details */}
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="rounded-xl border border-white/10 bg-white/5 p-3 space-y-1">
                    <p className="text-xs text-gray-400 font-medium">
                      Exchange Rate
                    </p>
                    <p className="text-sm font-semibold text-white">
                      ₹{preview.conversionRate}
                    </p>
                    <p className="text-xs text-gray-500">per USDT</p>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-white/5 p-3 space-y-1">
                    <p className="text-xs text-gray-400 font-medium">Token</p>
                    <p className="text-sm font-semibold text-white">
                      {preview.token}
                    </p>
                    <p className="text-xs text-gray-500">TRC-20</p>
                  </div>
                </div>

                {/* Wallet Address */}
                <div
                  className="rounded-xl border border-white/10 bg-white/5 p-3.5
                  flex items-center gap-3"
                >
                  <div
                    className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center
                    border border-purple-500/30 flex-shrink-0"
                  >
                    <Wallet size={14} className="text-purple-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-gray-400 mb-0.5">
                      Destination Wallet
                    </p>
                    <p className="text-xs font-mono text-white truncate">
                      {preview.walletAddress.slice(0, 12)}...
                      {preview.walletAddress.slice(-8)}
                    </p>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* ================= INFO FOOTER ================= */}
        <div
          className="mt-6 p-4 rounded-2xl border border-blue-500/20 
          bg-gradient-to-br from-blue-950/20 to-transparent"
        >
          <div className="flex items-start gap-3">
            <div
              className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center
              border border-blue-500/30 flex-shrink-0 mt-0.5"
            >
              <Shield size={14} className="text-blue-400" />
            </div>
            <div>
              <h3 className="text-xs font-semibold text-white mb-1">
                Secure Transaction
              </h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                All withdrawals are processed instantly with bank-grade
                encryption and security protocols.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ================= WITHDRAWAL MODAL ================= */}
      {showModal && (
        <WithdrawalModal
          onClose={() => setShowModal(false)}
          walletAddress={preview?.walletAddress || ""}
        />
      )}
    </>
  );
}

// ================= WITHDRAWAL MODAL COMPONENT =================
function WithdrawalModal({ onClose, walletAddress }) {
  const [previewWithdraw, { isLoading: isPreviewLoading }] =
    usePreviewTokenWithdrawMutation();
  const [submitWithdraw, { isLoading: isSubmitting }] =
    useUsdtWithdrawRequestMutation();
  const { data: getSetting } = useGetSettingQuery();
  const settings = getSetting?.data;
  const [withdrawalPreview, setWithdrawalPreview] = useState(null);
  const [previewError, setPreviewError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const formik = useFormik({
    initialValues: {
      walletAddress: walletAddress,
      amount: "",
    },
    validationSchema: Yup.object({
      walletAddress: Yup.string().required("Wallet address is required"),
      amount: Yup.number()
        .required("Amount is required")
        .positive("Amount must be positive"),
      // .min(20, "Minimum withdrawal is 20 USDT")
      // .max(1500, "Maximum withdrawal is 1500 USDT"),
    }),
    onSubmit: async (values) => {
      try {
        const result = await submitWithdraw({
          token: "USDT",
          amount: values.amount,
          walletAddress: values.walletAddress,
        }).unwrap();

        if (result.success === 1) {
          setSuccessMessage(
            result.message || "Withdrawal request submitted successfully!",
          );
          setWithdrawalPreview(null);
          setTimeout(() => {
            onClose();
          }, 2000);
        }
      } catch (error) {
        setPreviewError(error?.data?.message || "Failed to process withdrawal");
      }
    },
  });

  // Handle amount change and fetch preview
  const handleAmountChange = async (e) => {
    const value = e.target.value;
    formik.setFieldValue("amount", value);
    setPreviewError(null);
    setWithdrawalPreview(null);

    if (value && !isNaN(value) && parseFloat(value) > 0) {
      try {
        const result = await previewWithdraw({
          token: "USDT",
          amount: value,
        }).unwrap();

        if (result.success === 1) {
          setWithdrawalPreview(result.data);
          setPreviewError(null);
        } else {
          setPreviewError(result.message);
        }
      } catch (error) {
        setPreviewError(error?.data?.message || "Invalid amount");
        setWithdrawalPreview(null);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center sm:items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div
        className="w-full max-w-md bg-gradient-to-b from-gray-900 to-black rounded-t-3xl sm:rounded-3xl 
        border border-emerald-500/30 shadow-2xl max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div
          className="sticky top-0 bg-gray-900/95 backdrop-blur-xl border-b border-white/10 p-5 
          flex items-center justify-between z-10"
        >
          <div>
            <h2 className="text-lg font-bold text-white">Withdraw USDT</h2>
            <p className="text-xs text-gray-400">
              Complete your withdrawal request
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 
              flex items-center justify-center transition-colors border border-white/10"
          >
            <X size={16} className="text-gray-400" />
          </button>
        </div>

        {/* Success Message */}
        {successMessage && (
          <div
            className="m-5 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30
            flex items-start gap-3"
          >
            <CheckCircle2
              size={20}
              className="text-emerald-400 flex-shrink-0 mt-0.5"
            />
            <div>
              <p className="text-sm font-semibold text-emerald-400 mb-1">
                Success!
              </p>
              <p className="text-xs text-gray-300">{successMessage}</p>
            </div>
          </div>
        )}

        {/* Form */}
        <form onSubmit={formik.handleSubmit} className="p-5 space-y-4">
          {/* Wallet Address */}
          <div className="space-y-2">
            <label className="text-xs font-medium text-gray-300 flex items-center gap-2">
              <Wallet size={14} className="text-purple-400" />
              Wallet Address
            </label>
            <div className="relative">
              <input
                type="text"
                name="walletAddress"
                value={formik.values.walletAddress}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                readOnly
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10
                  text-sm text-white placeholder-gray-500 font-mono
                  focus:outline-none focus:border-purple-500/50 focus:bg-white/10
                  transition-all"
                placeholder="Enter wallet address"
              />
            </div>
            {formik.touched.walletAddress && formik.errors.walletAddress && (
              <p className="text-xs text-red-400 flex items-center gap-1">
                <AlertCircle size={12} />
                {formik.errors.walletAddress}
              </p>
            )}
          </div>

          {/* Amount */}
          <div className="space-y-2">
            <label className="text-xs font-medium text-gray-300 flex items-center gap-2">
              <DollarSign size={14} className="text-emerald-400" />
              Amount (USDT)
            </label>
            <div className="relative">
              <input
                type="text"
                name="amount"
                value={formik.values.amount}
                onChange={handleAmountChange}
                onBlur={formik.handleBlur}
                step="0.01"
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10
                  text-sm text-white placeholder-gray-500
                  focus:outline-none focus:border-emerald-500/50 focus:bg-white/10
                  transition-all"
                placeholder="Enter amount (20 - 1500 USDT)"
              />
              {isPreviewLoading && (
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  <Loader2
                    size={16}
                    className="text-emerald-400 animate-spin"
                  />
                </div>
              )}
            </div>
            <p className="text-xs text-gray-500">
              Min: 20 USDT • Max: 1500 USDT
            </p>
            {formik.touched.amount && formik.errors.amount && (
              <p className="text-xs text-red-400 flex items-center gap-1">
                <AlertCircle size={12} />
                {formik.errors.amount}
              </p>
            )}
            {previewError && (
              <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30">
                <p className="text-xs text-red-400 flex items-center gap-2">
                  <AlertCircle size={14} />
                  {previewError}
                </p>
              </div>
            )}
          </div>

          {/* Preview Section */}
          {withdrawalPreview && (
            <div className="space-y-3 pt-2">
              {/* Conversion Arrow */}
              <div className="flex justify-center">
                <div
                  className="w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-500/30
                  flex items-center justify-center"
                >
                  <ArrowDown size={14} className="text-emerald-400" />
                </div>
              </div>

              {/* Preview Card */}
              <div
                className="rounded-2xl border border-emerald-500/30 
                bg-gradient-to-br from-emerald-500/10 to-emerald-600/5 p-4 space-y-3"
              >
                <div className="flex items-center gap-2 pb-2 border-b border-white/10">
                  <Zap size={14} className="text-emerald-400" />
                  <span className="text-xs font-semibold text-white">
                    Withdrawal Preview
                  </span>
                </div>

                {/* Amount Details */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-400">
                      Entered Amount
                    </span>
                    <span className="text-sm font-semibold text-white">
                      {withdrawalPreview.enteredAmount} USDT
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-400">Admin Fee</span>
                    <span className="text-sm text-red-400">
                      -{withdrawalPreview.admin_fee_token} USDT
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-400">Network Fee</span>
                    <span className="text-sm text-red-400">
                      -{withdrawalPreview.network_fee_token} USDT
                    </span>
                  </div>
                  <div className="h-px bg-white/10 my-2" />
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-semibold text-gray-300">
                      Total Fees
                    </span>
                    <span className="text-sm font-semibold text-red-400">
                      -{withdrawalPreview.total_fee_token} USDT
                    </span>
                  </div>
                </div>

                {/* Final Amount */}
                <div className="rounded-xl bg-emerald-500/20 border border-emerald-500/40 p-3">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-semibold text-emerald-300">
                      You'll Receive
                    </span>
                    <span className="text-lg font-bold text-emerald-400">
                      {withdrawalPreview.final_token_received} USDT
                    </span>
                  </div>
                </div>

                {/* INR Details */}
                <div className="pt-2 space-y-2 border-t border-white/10">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-400">INR Deduction</span>
                    <span className="text-sm text-amber-400">
                      ₹{withdrawalPreview.estimatedINR_deduction.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-400">
                      Remaining Balance
                    </span>
                    <span className="text-sm font-semibold text-white">
                      ₹{withdrawalPreview.remainingINRBalance.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-400">Rate</span>
                    <span className="text-sm text-gray-300">
                      ₹{withdrawalPreview.conversionRate}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting || !withdrawalPreview || !!previewError}
            className="w-full py-4 rounded-xl font-semibold text-sm
              bg-gradient-to-r from-emerald-500 to-emerald-600
              hover:from-emerald-600 hover:to-emerald-700
              disabled:from-gray-700 disabled:to-gray-800
              disabled:text-gray-500 disabled:cursor-not-allowed
              active:scale-[0.98] transition-all duration-200
              text-white shadow-lg shadow-emerald-500/30
              disabled:shadow-none flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                Processing...
              </>
            ) : (
              "Confirm Withdrawal"
            )}
          </button>

          {/* Terms & Conditions */}
          <div className="rounded-xl border border-yellow-500/30 bg-yellow-500/10 p-4">
            {/* <h2 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
              <Shield size={14} className="text-yellow-400" />
              Terms & Conditions
            </h2> */}

            {/* <div className="rounded-lg border border-yellow-500/40 bg-yellow-500/5 p-3"> */}
            <div className="flex gap-2">
              <AlertTriangle className="w-3 h-3 text-yellow-400 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="text-xs font-semibold text-yellow-300 mb-2 ">
                  Important Notes
                </h3>
                <ul className="text-xs text-gray-300 space-y-1.5 leading-relaxed -ml-4">
                  <li>
                    • Verify wallet address before withdrawal - transactions
                    cannot be reversed
                  </li>
                  <li>• Ensure wallet supports TRC-20 network</li>
                  <li>
                    • Platform fee {settings?.withdrawal_commission_usd || 0}%
                    and network fee will be deducted from your withdrawal
                  </li>
                  <li>• Complete KYC verification for withdrawals</li>
                  <li>
                    • Withdrawal amount will be deducted from your INR balance
                  </li>
                </ul>
              </div>
            </div>
            {/* </div> */}
          </div>
        </form>
      </div>
    </div>
  );
}
