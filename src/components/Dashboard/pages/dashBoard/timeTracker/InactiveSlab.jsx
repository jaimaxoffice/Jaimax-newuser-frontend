import React from "react";
import { Clock, Coins } from "lucide-react";
import jcoin from "../../../../../assets/logo.webp";

const InactiveSlab = ({ slab, isActive }) => (
  <div
    className={`bg-gradient-to-br from-white via-emerald-50/30 to-teal-50/50 rounded-xl p-4 text-gray-800 shadow-xl border border-emerald-200/50 backdrop-blur-sm transform transition-all duration-700 min-h-[250px] relative overflow-hidden ${
      isActive ? "scale-100 opacity-100 " : "scale-95 opacity-80"
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

export default InactiveSlab;