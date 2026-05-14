import React, { useState } from "react";
import {
  CheckCircle,
  Clock,
  Pickaxe,
  Plus,
  PlusCircle,
  XCircle,
} from "lucide-react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import {
  useBuyP2PMutation,
  useGetP2PHistoryBuyerQuery,
  useLazyGetP2PQuoteQuery,
  useLazySellToCompanyQuery,
} from "./p2pApiSlice";
import { toast } from "../../../../ReusableComponents/Toasts/Toasts";
import CreateStakeModal from "./CreateStakeModal";
import StakingHistory from "./StakingHistory";

export const stakeSchema = Yup.object({
  sellerUsername: Yup.string().required("Seller username is required"),
  buyInr: Yup.number()
    .typeError("Amount must be a number")
    .positive("Amount must be greater than 0")
    .required("Amount is required"),
});

const P2PModule = () => {
  const [activeTab, setActiveTab] = useState("staking");
  const [showStakeModal, setShowStakeModal] = useState(false);
  const [page, setPage] = useState(1);
  const [wpPage, setWpPage] = useState(1);
  const [sellModal, setSellModal] = useState({
    show: false,
    type: "",
    message: "",
  });

  const [buyP2P, { isLoading }] = useBuyP2PMutation();

  const [
    getQuote,
    { data: quoteData, isFetching: quoteLoading, error: quoteError },
  ] = useLazyGetP2PQuoteQuery();

  const tradeType =
    activeTab === "wp-staking"
      ? "wpStaking"
      : activeTab === "mining"
        ? "mining"
        : "regular";
  // Regular staking history
  const { data: getHistory, isLoading: loading } = useGetP2PHistoryBuyerQuery({
    page,
    limit: 10,
    tradeType,
  });

  console.log(tradeType)
  // WP staking history — same API, extra field wpStaking: true
  const { data: getWpHistory, isLoading: wpLoading } = useGetP2PHistoryBuyerQuery({
    page: wpPage,
    limit: 10,
    tradeType,
  });

  const [triggerSellToCompany, { isFetching: sellLoading }] =
    useLazySellToCompanyQuery();

  const handleStakeSubmit = async (values, { resetForm }) => {
    try {
      const payload = {
        sellerUsername: values.sellerUsername,
        buyInr: Number(values.buyInr),
        tradeType,
      };

      const res = await buyP2P(payload).unwrap();

      toast.success(res?.message || "Stake request submitted");
      resetForm();
      setShowStakeModal(false);
    } catch (err) {
      toast.error(err?.data?.message || "Something went wrong");
    }
  };

  const closeSellModal = () => {
    setSellModal({ show: false, type: "", message: "" });
  };

  const handleSellToCompany = async () => {
    try {
      const res = await triggerSellToCompany().unwrap();

      setSellModal({
        show: true,
        type: "success",
        message: res?.message || "Sell to Company successful",
      });

      setTimeout(() => {
        // setSellModal({ show: false, type: "", message: "" });
        closeSellModal();
      }, 3000);
    } catch (err) {
      setSellModal({
        show: true,
        type: "error",
        message: err?.data?.message || "Sell to Company — Coming Soon",
      });

      setTimeout(() => {
        // setSellModal({ show: false, type: "", message: "" });
        closeSellModal();
      }, 3000);
    }
  };

  return (
    <div className="h-full overflow-y-auto bg-gradient-to-br from-teal-50 to-teal-100 p-4 sm:p-6">
      <div className="mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-xl sm:text-2xl lg:text-2xl font-bold text-gray-800 mb-2">
            P2P Dashboard
          </h1>
        </div>

        {/* Toggle */}
        <div className="bg-white rounded-lg p-2 shadow-md mb-8 w-full">
          <div className="grid grid-cols-3 gap-1 w-full">
            {["staking", "mining", "wp-staking"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`w-full py-2 rounded-lg font-semibold text-sm sm:text-base transition-all capitalize ${activeTab === tab
                    ? "bg-teal-600 text-white shadow-md"
                    : "bg-gray-100 text-gray-600 hover:bg-teal-50"
                  }`}
              >
                {tab === "wp-staking"
                  ? "WP Staking"
                  : tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Mining */}
        {activeTab === "mining" && (
          <div className="flex items-center justify-center min-h-[420px]">
            <div className="w-full bg-white rounded-lg border border-teal-100 shadow-sm p-6 sm:p-12 text-center">
              <div className="mx-auto w-16 h-16 sm:w-24 sm:h-24 rounded-lg bg-teal-50 flex items-center justify-center mb-6">
                <Pickaxe className="text-teal-600" size={32} />
              </div>
              <span className="inline-flex px-4 py-1.5 rounded-lg text-xs sm:text-sm font-semibold bg-amber-50 text-amber-700 border border-amber-100 mb-5">
                Coming Soon
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-teal-900">
                Jaimax Mining P2P
              </h2>
              <p className="mt-8 text-xs sm:text-sm text-slate-400">
                This feature will be available in an upcoming platform update.
                Insights are currently under development.
              </p>
            </div>
          </div>
        )}

        {/* Staking */}
        {activeTab === "staking" && (
          <div className="space-y-8">
            <div className="flex justify-end gap-2 sm:gap-4">
              <button
                onClick={handleSellToCompany}
                disabled={sellLoading}
                className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 text-sm sm:text-base rounded-lg font-semibold flex items-center gap-2 transition-all disabled:cursor-not-allowed disabled:bg-teal-400"
              >
                {/* <Plus size={18} /> */}
                {sellLoading ? "Processing..." : "Sell to company"}
              </button>
              <button
                onClick={() => setShowStakeModal(true)}
                className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 text-sm sm:text-base rounded-lg font-semibold flex items-center gap-2 transition-all"
              >
                <PlusCircle size={18} />
                Purchase
              </button>
            </div>
            <StakingHistory
              history={getHistory}
              onPageChange={(p) => setPage(p)}
              isLoading={isLoading || loading}
              onOpenStakeModal={() => setShowStakeModal(true)}
            />
          </div>
        )}

        {/* WP Staking */}
        {activeTab === "wp-staking" && (
          <div className="space-y-8">
            <div className="flex justify-end gap-2 sm:gap-4">
              <button
                onClick={handleSellToCompany}
                className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 text-sm sm:text-base rounded-lg font-semibold flex items-center gap-2 transition-all"
              >
                {/* <Plus size={18} /> */}
                {sellLoading ? "Processing..." : "Sell to company"}
              </button>
              <button
                onClick={() => setShowStakeModal(true)}
                className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 text-sm sm:text-base rounded-lg font-semibold flex items-center gap-2 transition-all"
              >
                <PlusCircle size={18} />
                Purchase
              </button>
            </div>
            <StakingHistory
              history={getWpHistory}
              onPageChange={(p) => setWpPage(p)}
              isLoading={isLoading || wpLoading}
            />
          </div>
        )}

        <CreateStakeModal
          show={showStakeModal}
          onClose={() => setShowStakeModal(false)}
          stakeSchema={stakeSchema}
          handleStakeSubmit={handleStakeSubmit}
          getQuote={getQuote}
          quoteData={quoteData}
          quoteError={quoteError}
          quoteLoading={quoteLoading}
          isLoading={isLoading}
          tradeType={tradeType}
        />
      </div>

{sellModal.show && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md">
    {/* Subtle grid background pattern */}
    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJhZGllbnQgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LCAwLjUpIiBvcGFjaXR5PSIwLjIiLz4KPHJhZGllbnQgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LCAwLjUpIiBvcGFjaXR5PSIwLjIiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDIsIDIpIi8+CjxwYXRoIGQ9Ik0wIDBoMzJ2MzJaIiBmaWxsPSJub25lIiBzdHJva2U9InVybCgjdGVhbC0xKSIvPgo8L3N2Zz4=')] opacity-5" />

    {/* Main Modal */}
    <div className="relative bg-white rounded-xl shadow-2xl w-[90%] max-w-md overflow-hidden border border-gray-100">
      {/* Header with subtle texture */}
      <div className="relative h-16 bg-gradient-to-r from-gray-50 to-gray-100 flex items-center px-6">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPgo8cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJub25lIiBzdHJva2U9InVybCgjdGVhbC0xKSIvPgo8cGF0aCBkPSJNMCAwaDEwMHYxMDBIMHoiIGZpbGw9Im5vbmUiIHN0cm9rZT0idXJsKCN0ZWFkLTEpIiBvcGFjaXR5PSIwLjAiLz4KPHBhdGggZD0iTTAgMGgxMDB2MTIwaC0xMDB6IiBmaWxsPSJub25lIiBzdHJva2U9InVybCgjdGVhbC0xKSIgb3BhY2l0eT0iMC4yIi8+Cjwvc3ZnPg==')] opacity-30" />

        <h3 className="text-gray-800 font-semibold text-lg relative z-10">
          Sell Order Processing
        </h3>

        <button
          onClick={closeSellModal}
          className="absolute right-4 w-8 h-8 rounded-full bg-white/80 hover:bg-white shadow-sm flex items-center justify-center transition-all"
        >
          <XCircle size={16} className="text-gray-500" />
        </button>
      </div>

      {/* Content with financial chart illustration */}
      <div className="p-8 text-center relative">
        {/* Subtle chart illustration */}
        <div className="absolute top-0 left-0 w-full h-24 opacity-10 pointer-events-none">
          <svg viewBox="0 0 300 80" className="w-full h-full">
            <path
              d="M0,60 Q50,20 100,50 T200,30 T300,50"
              stroke="url(#chartGradient)"
              strokeWidth="1.5"
              fill="none"
              strokeLinecap="round"
            />
            <defs>
              <linearGradient id="chartGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#10b981" />
                <stop offset="100%" stopColor="#059669" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Main Icon with document stack */}
        <div className="mx-auto w-20 h-20 mb-6 relative">
          <div className="absolute -bottom-1 -right-1 w-16 h-10 bg-gradient-to-br from-emerald-100 to-green-100 rounded-t-lg rounded-br-lg border border-gray-200 transform rotate-2" />
          <div className="absolute bottom-0 right-0 w-16 h-10 bg-white rounded-t-lg rounded-br-lg border border-gray-200 transform -rotate-1 shadow-sm" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center shadow-md">
              <Clock className="text-white" size={16} />
            </div>
          </div>
        </div>

        {/* Message with typewriter effect */}
        <div className="space-y-3 relative z-10">
          <h4 className="text-gray-800 font-medium text-lg">
            {sellModal.message}
          </h4>
          <p className="text-gray-500 text-sm">
            Your sell order system is being finalized
          </p>
        </div>

        {/* Progress with animated dots */}
        <div className="mt-6">
          <div className="flex items-center justify-center gap-1 mb-4">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className={`w-2 h-2 rounded-full ${i < 3 ? 'bg-emerald-500' : 'bg-gray-200'} transition-all duration-300`}
                style={{ animationDelay: `${i * 100}ms` }}
              />
            ))}
          </div>

          <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
            <span className="w-20 h-1 bg-gradient-to-r from-emerald-400 to-green-500 rounded-full" />
            <span>Processing</span>
            <span className="w-20 h-1 bg-gray-200 rounded-full" />
          </div>
        </div>

        {/* Footer with timestamp */}
        <div className="mt-8 pt-4 border-t border-gray-100 text-xs text-gray-400">
          <div className="flex items-center justify-between">
            <span>Order ID: #XK-4592</span>
            <span>Est. {new Date().toLocaleTimeString()}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
)}
    </div>
  );
};

export default P2PModule;
