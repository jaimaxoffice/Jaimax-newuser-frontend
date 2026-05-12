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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm">
          <div className="relative bg-white rounded-lg shadow-2xl w-[90%] max-w-sm overflow-hidden animate-in fade-in zoom-in duration-300">

            {/* Close Button */}
            <button
              onClick={closeSellModal}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition"
            >
              <XCircle size={18} className="text-slate-500" />
            </button>

            {/* Progress bar */}
            <div className="h-1.5 bg-amber-400 sell-progress" />

            <div className="p-8 text-center">
              {/* Icon */}
              <div className="mx-auto w-16 h-16 rounded-full bg-amber-100 flex items-center justify-center mb-5">
                <Clock className="text-amber-600" size={30} />
              </div>

              <p className="text-slate-700 font-medium text-base">
                {sellModal.message}
              </p>

              <p className="text-slate-400 text-sm mt-2">
                This feature will be available soon
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default P2PModule;
