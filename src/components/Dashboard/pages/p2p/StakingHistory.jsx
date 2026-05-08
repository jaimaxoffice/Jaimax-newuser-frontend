// import React from "react";
// import { Calendar, Coins } from "lucide-react";

// const maskEmail = (email = "") => {
//   if (!email) return "";

//   const [name, domain] = email.split("@");
//   if (!name || !domain) return email;

//   return `${name.slice(0, 2)}****@${domain}`;
// };

// const EmptyState = () => (
//   <div className="bg-white rounded-2xl shadow-md border border-teal-100 p-12 flex flex-col items-center justify-center text-center">
//     <div className="w-20 h-20 rounded-full bg-teal-100 flex items-center justify-center mb-4">
//       <Coins className="text-teal-600" size={34} />
//     </div>

//     <h3 className="text-lg font-bold text-gray-800">
//       No P2P Purchases Yet
//     </h3>

//     <p className="text-gray-500 mt-2">
//       Your staking purchases will appear here once completed
//     </p>
//   </div>
// );

// const TradeCard = ({ trade }) => (
//   <div className="bg-white rounded-2xl shadow-md border border-teal-100 p-6 hover:shadow-lg transition-all">
//     <div className="flex justify-between items-start mb-5">
//       <div>
//         <h3 className="text-lg font-bold text-gray-800">
//           {trade.tradeId.slice(-8).toUpperCase()}
//         </h3>

//         <p className="text-gray-500 flex items-center gap-2 mt-1">
//           <Calendar size={15} />
//           {new Date(trade.createdAt).toLocaleDateString()}
//         </p>
//       </div>

//       <span className="px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-700">
//         {trade.status}
//       </span>
//     </div>

//     <div className="space-y-3">
//       <div className="flex justify-between">
//         <span className="text-gray-500">Seller</span>
//         <span className="font-semibold text-red-400">
//           {trade.seller.username}
//         </span>
//       </div>

//       <div className="flex justify-between">
//         <span className="text-gray-500">Buyer</span>
//         <span className="font-semibold text-green-500">
//           {trade.buyer.username}
//         </span>
//       </div>

//       <div className="flex justify-between">
//         <span className="text-gray-500">Amount</span>
//         <span className="font-semibold text-teal-700">
//           ₹{trade.payment.totalInr}
//         </span>
//       </div>

//       <div className="flex justify-between">
//         <span className="text-gray-500">Coins</span>
//         <span className="font-semibold text-gray-800">
//           {trade.coins.totalCoins.toLocaleString()} JMX
//         </span>
//       </div>

//       <div className="flex justify-between">
//         <span className="text-gray-500">Seller Supply</span>
//         <span className="font-semibold text-gray-800">
//           {trade.split.sellerSupplyPct}
//         </span>
//       </div>

//       <div className="pt-3 border-t text-xs text-gray-400">
//         {maskEmail(trade.seller.email)}
//       </div>
//     </div>
//   </div>
// );

// const StakingHistory = ({ history }) => {
//   const trades = history?.data?.trades || [];

//   if (!trades.length) return <EmptyState />;

//   return (
//     <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
//       {trades.map((trade) => (
//         <TradeCard key={trade.tradeId} trade={trade} />
//       ))}
//     </div>
//   );
// };

// export default StakingHistory;

import React, { useState } from "react";
import {
  Calendar,
  Coins,
  ArrowRight,
  CheckCircle,
  Clock,
  Plus,
} from "lucide-react";
import ReusableTable from "../../../../ReusableComponents/tables/reusableTable";
import CreateStakeModal from "./CreateStakeModal";
import { stakeSchema } from "./P2PModule";
import { useBuyP2PMutation, useLazyGetP2PQuoteQuery } from "./p2pApiSlice";

const EmptyState = ({
  setShowStakeModal,
  showStakeModal,
  handleStakeSubmit,
  getQuote,
  quoteData,
  quoteError,
  quoteLoading,
  loading
}) => (
    <>
  <div className="flex flex-col items-center justify-center text-center bg-white rounded-2xl border border-teal-100 shadow-sm p-6 sm:p-16">
    <div className="w-16 h-16 rounded-full bg-teal-50 flex items-center justify-center mb-5">
      <Coins className="text-teal-600" size={28} />
    </div>

    <h3 className="text-base font-semibold text-teal-900">
      No P2P Purchases Yet
    </h3>

    <div className="flex justify-end py-3">
      <button
        onClick={() => setShowStakeModal(true)}
        className="bg-teal-600 hover:bg-teal-700 text-white px-3 py-2 text-sm sm:text-md rounded-full font-semibold flex items-center gap-2 transition-all"
      >
        <Plus size={18} />
        Make First Purchase
      </button>
    </div>

    <p className="text-sm text-slate-400 mt-2 max-w-xs">
      Completed staking purchases will appear here automatically
    </p>

    </div>
    <CreateStakeModal
      show={showStakeModal}
      onClose={() => setShowStakeModal(false)}
      stakeSchema={stakeSchema}
      handleStakeSubmit={handleStakeSubmit}
      getQuote={getQuote}
      quoteData={quoteData}
      quoteError={quoteError}
      quoteLoading={quoteLoading}
      isLoading={loading}
    />
    </>
);

const TradeCard = ({ trade }) => (
  <div className="bg-white rounded-2xl border border-teal-100/80 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden">
    <div className="px-4 py-5 border-b border-teal-50 flex justify-between bg-teal-700">
      <div>
        <p className="text-[11px] uppercase text-white">Trade ID</p>
        <p className="mt-1 text-sm  text-white">
          #{trade.tradeId.toUpperCase()}
        </p>
      </div>
      <div className=" flex items-center">
        {trade.status === "COMPLETED" ? (
          <span className="border border-green-50 p-2 rounded-full bg-green-200">
            <CheckCircle size={16} className="text-green-700" />
          </span>
        ) : (
          <Clock />
        )}
      </div>
    </div>

    <div className="px-4 py-5 flex justify-between">
      <div>
        <p className="text-[10px] sm:text-xs uppercase text-slate-400">
          Amount
        </p>
        <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-teal-700 mt-1">
          ₹{Number(trade.payment.totalInr).toLocaleString("en-IN")}
        </h2>
      </div>

      <div className="text-right">
        <p className="text-[10px] sm:text-xs uppercase text-slate-400">Coins</p>
        <p className="text-lg sm:text-xl lg:text-2xl font-bold text-teal-700 mt-1">
          {trade.coins.totalCoins.toLocaleString()} JMC
        </p>
      </div>
    </div>

    <div className="mx-4 rounded-2xl bg-teal-50/50 border border-teal-100 px-2 py-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[9px] sm:text-[11px] uppercase text-slate-400">
            Seller
          </p>
          <p className="text-xs sm:text-sm font-semibold text-red-400 mt-1">
            {trade.seller.username}
          </p>
        </div>

        <ArrowRight size={16} className="text-teal-300" />

        <div className="text-right">
          <p className="text-[9px] sm:text-[11px] uppercase text-slate-400">
            Buyer
          </p>
          <p className="text-xs sm:text-sm font-semibold text-green-500 mt-1">
            {trade.buyer.username}
          </p>
        </div>
      </div>
    </div>

    <div className="px-6 py-5 flex justify-between items-center">
      <div>
        <p className="text-[11px] text-slate-400">From seller</p>
        <p className="text-sm font-semibold text-slate-800 mt-1">
          {trade.split.sellerSupplyPct}
        </p>
      </div>

      <div className="flex items-center gap-2 text-xs text-slate-400">
        <Calendar size={13} />
        {formatDateWithAmPm(trade.createdAt)}
      </div>
    </div>
  </div>
);

const Pagination = ({ pagination, onPageChange }) => {
  if (!pagination || pagination.totalPages <= 1) return null;

  return (
    <div className="flex justify-end mt-5">
      <div className="flex items-center gap-2">
        <button
          disabled={pagination.page === 1}
          onClick={() => onPageChange(pagination.page - 1)}
          className="px-4 py-2 rounded-xl border border-teal-100 text-sm font-medium disabled:opacity-40 disabled:cursor-not-allowed hover:bg-teal-50"
        >
          Prev
        </button>

        {Array.from({ length: pagination.totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => onPageChange(i + 1)}
            className={`w-10 h-10 rounded-xl text-sm font-semibold transition ${
              pagination.page === i + 1
                ? "bg-teal-600 text-white"
                : "border border-teal-100 text-slate-600 hover:bg-teal-50"
            }`}
          >
            {i + 1}
          </button>
        ))}

        <button
          disabled={!pagination.hasNextPage}
          onClick={() => onPageChange(pagination.page + 1)}
          className="px-4 py-2 rounded-xl border border-teal-100 text-sm font-medium disabled:opacity-40 disabled:cursor-not-allowed hover:bg-teal-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

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

const StakingHistory = ({ history, onPageChange = () => {}, isLoading }) => {
  const trades = history?.data?.trades || [];
  const pagination = history?.data?.pagination;
  const [showStakeModal, setShowStakeModal] = useState(false);
  const [
    getQuote,
    { data: quoteData, isFetching: quoteLoading, error: quoteError },
  ] = useLazyGetP2PQuoteQuery();
  const [buyP2P, { isLoading: loading }] = useBuyP2PMutation();

  const handleStakeSubmit = async (values, { resetForm }) => {
    try {
      const res = await buyP2P({
        sellerUsername: values.sellerUsername,
        buyInr: Number(values.buyInr),
      }).unwrap();

      toast.success(res?.message || "Stake request submitted");

      resetForm();
      setShowStakeModal(false);
    } catch (err) {
      toast.error(err?.data?.message || "Something went wrong");
    }
  };

  if (!trades.length)
    return (
      <EmptyState
        setShowStakeModal={setShowStakeModal}
        showStakeModal={showStakeModal}
        handleStakeSubmit={handleStakeSubmit}
        getQuote={getQuote}
        quoteData={quoteData}
        quoteError={quoteError}
        quoteLoading={quoteLoading}
        isLoading={loading}
      />
    );

  const useTable = trades.length >= 5;

  const stakingColumns = [
    {
      header: "S.No",
      render: (_, rowIndex) =>
        ((history?.data?.pagination?.page || 1) - 1) *
          (history?.data?.pagination?.limit || 10) +
        rowIndex +
        1,
    },
    {
      header: "Trade ID",
      render: (row) => (
        <span className="font-semibold text-teal-800">
          #{row.tradeId.toUpperCase()}
        </span>
      ),
    },
    {
      header: "Amount",
      render: (row) => (
        <span className="font-semibold text-teal-700">
          ₹{Number(row.payment.totalInr).toLocaleString("en-IN")}
        </span>
      ),
    },
    {
      header: "Coins",
      render: (row) => <span>{row.coins.totalCoins.toLocaleString()} JMC</span>,
    },
    {
      header: "Seller → Buyer",
      render: (row) => (
        <div className="flex items-center gap-2 whitespace-nowrap justify-center">
          <span className="text-red-400 font-medium">
            {row.seller.username}
          </span>
          <ArrowRight size={14} className="text-teal-300" />
          <span className="text-green-500 font-medium">
            {row.buyer.username}
          </span>
        </div>
      ),
    },
    {
      header: "Supply",
      render: (row) => row.split.sellerSupplyPct,
    },
    {
      header: "Date",
      render: (row) =>
        //   new Date(row.createdAt).toLocaleDateString("en-IN"),

        formatDateWithAmPm(row.createdAt),
    },
    {
      header: "Status",
      render: (row) => (
        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-50 text-green-700 border border-green-100 whitespace-nowrap">
          {row.status}
        </span>
      ),
    },
  ];

  return (
    <div className="space-y-5">
      {/* Mobile */}
      <div className="grid grid-cols-1 gap-5 md:hidden">
        {trades.map((trade) => (
          <TradeCard key={trade.tradeId} trade={trade} />
        ))}
      </div>

      {/* Tablet + Desktop */}
      <div className="hidden md:block">
        {useTable ? (
          <div className="overflow-x-auto bg-white">
            <div className="min-w-[1100px]">
              <ReusableTable
                columns={stakingColumns}
                data={trades}
                isLoading={isLoading}
              />
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 xl:grid-cols-3 gap-5">
            {trades.map((trade) => (
              <TradeCard key={trade.tradeId} trade={trade} />
            ))}
          </div>
        )}
      </div>

      <Pagination pagination={pagination} onPageChange={onPageChange} />
    </div>
  );
};

export default StakingHistory;
