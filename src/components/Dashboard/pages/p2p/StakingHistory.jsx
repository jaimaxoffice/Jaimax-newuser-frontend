

import React from "react";
import {
  Calendar,
  Coins,
  ArrowRight,
  CheckCircle,
  Clock,
  Plus,
} from "lucide-react";

import ReusableTable from "../../../../ReusableComponents/tables/reusableTable";
import Loader from "../../../../ReusableComponents/Loader/loader";

const EmptyState = ({ onOpenStakeModal }) => (
  <div className="flex flex-col items-center justify-center text-center bg-white rounded-2xl border border-teal-100 shadow-sm p-6 sm:p-16">
    <div className="w-16 h-16 rounded-full bg-teal-50 flex items-center justify-center mb-5">
      <Coins className="text-teal-600" size={28} />
    </div>

    <h3 className="text-base font-semibold text-teal-900">
      No P2P Purchases Yet
    </h3>

    <div className="py-3">
      <button
        onClick={onOpenStakeModal}
        className="bg-teal-600 hover:bg-teal-700 text-white px-3 py-2 rounded-full font-semibold flex items-center gap-2"
      >
        <Plus size={18} />
        Make First Purchase
      </button>
    </div>

    <p className="text-sm text-slate-400 mt-2 max-w-xs">
      Completed staking purchases will appear here automatically
    </p>
  </div>
);

const TradeCard = ({ trade }) => (
  <div className="bg-white rounded-3xl border border-teal-100 shadow-lg overflow-hidden">
    {/* Header */}
    <div className="bg-gradient-to-r from-teal-700 to-teal-600 px-5 py-5">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-teal-100 text-xs uppercase tracking-wider">
            Trade ID
          </p>
          <p className="text-white font-semibold text-sm mt-1">
            {trade.tradeId.toUpperCase()}
          </p>
        </div>

        
      </div>

      {/* Highlight Amount */}
      <div className="mt-6 flex justify-between items-center">
        <div>
        <p className="text-teal-100 text-xs">Transaction Amount</p>
        <h2 className="text-3xl font-bold text-white mt-1">
          ₹{Number(trade.payment.totalInr).toLocaleString("en-IN")}
        </h2>
        </div>

        <span
          className={`px-2 py-2 rounded-full text-xs font-bold ${
            trade.status === "COMPLETED"
              ? "bg-green-100 text-green-500 backdrop-blur"
              : "bg-yellow-400/20 text-yellow-100"
          }`}
        >
          {trade.status === "COMPLETED" ? 
        <CheckCircle size={16}/> :
        <Clock size={16}/>  
        }
        </span>
      </div>
    </div>

    {/* Body */}
    <div className="p-4 space-y-5">
      {/* Buyer / Seller */}
      <div className="">
        {/* <div className="bg-teal-50 rounded-2xl p-3">
          <p className="text-xs text-slate-500">Buyer</p>
          <p className="font-semibold text-slate-800 mt-1 truncate">
            {trade.buyer?.username}
          </p>
        </div> */}

        <div className="bg-teal-50 rounded-2xl p-3 flex justify-between items-center">
          <p className="text-xs text-slate-500">Total Coins</p>
          <p className="font-semibold text-teal-700 mt-1 truncate">
            {trade.coins.totalCoins.toLocaleString()} JMC
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="flex justify-between">
        <div>
          <p className="text-xs text-slate-400">Seller</p>
          <p className="font-bold text-slate-800 text-sm mt-1">
            {/* {trade.coins.totalCoins.toLocaleString()} */}
            {trade.seller?.username}
          </p>
        </div>

        <div>
          <p className="text-xs text-slate-400">Price</p>
          <p className="font-bold text-slate-800 text-sm mt-1">
            ₹{trade.payment.pricePerCoinInr}
          </p>
        </div>

        <div>
          <p className="text-xs text-slate-400">Split</p>
          <p className="font-bold text-slate-800 text-sm mt-1">
            {trade.split.sellerSupplyPct}
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-slate-100 pt-4 flex items-center justify-between">
        <div className="flex items-center gap-2 text-slate-500 text-xs">
          <Calendar size={14} />
          {formatDateWithAmPm(trade.createdAt)}
        </div>

        {/* <span className="text-xs font-medium text-teal-600">
          {trade.coins.totalCoins.toLocaleString()} JMC
        </span> */}
      </div>
    </div>
  </div>
);

const formatDateWithAmPm = (isoString) => {
  if (!isoString) return "N/A";
  const date = new Date(isoString);

  return date.toLocaleString("en-IN");
};

const StakingHistory = ({
  history,
  onPageChange = () => {},
  isLoading,
  onOpenStakeModal,
}) => {
  const trades = history?.data?.trades || [];
 if(isLoading){
  <Loader/>
 }
  if (!trades.length) {
    return <EmptyState onOpenStakeModal={onOpenStakeModal} />;
  }

  const pagination = history?.data?.pagination || {};
const currentPage = Number(pagination.page || 1);
const totalPages = Number(pagination.totalPages || 1);

  const stakingColumns = [
  {
    header: "S.No.",
    render: (_, rowIndex) => rowIndex + 1,
  },
  {
    header: "Trade ID",
    render: (row) => `${row.tradeId.toUpperCase().slice(0,-3)}`,
  },
  {
    header: "Buyer",
    render: (row) => row.buyer?.username || "-",
  },
  {
    header: "Seller",
    render: (row) => row.seller?.username || "-",
  },
  {
    header: "Amount",
    render: (row) =>
      `₹${Number(row.payment?.totalInr || 0).toLocaleString("en-IN")}`,
  },
  {
    header: "Coins (JMC)",
    render: (row) =>
      <span
        className="truncate max-w-[200px]"
      >
        {Number(row.coins?.totalCoins || 0).toLocaleString()}
      </span>

  },
  {
    header: "Price / Coin",
    render: (row) => `₹${row.payment?.pricePerCoinInr || 0}`,
  },
  {
    header: "Status",
    render: (row) => (
      <span
        className={`px-2 py-1 rounded-full text-xs font-semibold ${
          row.status === "COMPLETED"
            ? "bg-green-100 text-green-700"
            : "bg-yellow-100 text-yellow-700"
        }`}
      >
        {row.status}
      </span>
    ),
  },
  {
    header: "Created",
    render: (row) => 
      <span
        className="max-w-[240px] truncate"
      >
        {formatDateWithAmPm(row.createdAt)}
      </span>
      
  },
];

  return (
    <div className="space-y-5 ">
       <h1 className="text-base sm:text-lg font-semibold text-gray-900 block sm:hidden">Staking History</h1>
      <div className="grid grid-cols-1 gap-5 md:hidden">
        {trades.map((trade) => (
          <TradeCard key={trade.tradeId} trade={trade} />
        ))}
      </div>

      <h1 className="text-base sm:text-lg font-semibold text-gray-900 hidden sm:block">Staking History</h1>
      <div className="hidden md:block bg-white overflow-x-auto">
        <ReusableTable
          columns={stakingColumns}
          data={trades}
          isLoading={isLoading}
        />
      </div>

      {totalPages > 1 && (
  <div className="flex items-center justify-between bg-white rounded-2xl border border-teal-100 px-4 py-3">
    <p className="text-sm text-slate-500">
      Page {currentPage} of {totalPages}
    </p>

    <div className="flex gap-2">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-4 py-2 rounded-xl text-sm font-medium transition ${
          currentPage === 1
            ? "bg-slate-100 text-slate-400 cursor-not-allowed"
            : "bg-teal-600 text-white hover:bg-teal-700"
        }`}
      >
        Previous
      </button>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-4 py-2 rounded-xl text-sm font-medium transition ${
          currentPage === totalPages
            ? "bg-slate-100 text-slate-400 cursor-not-allowed"
            : "bg-teal-600 text-white hover:bg-teal-700"
        }`}
      >
        Next
      </button>
    </div>
  </div>
)}
    </div>
  );
};

export default StakingHistory;