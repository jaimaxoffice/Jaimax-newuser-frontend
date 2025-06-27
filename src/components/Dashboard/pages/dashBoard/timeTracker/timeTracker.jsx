

import React, { useRef, useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, Play, Pause, ArrowLeft, ArrowRight, TrendingUp, Coins, DollarSign, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import jcoin from "../../../../../assets/logo.png"
const slabsData = [
  {
    id: 1,
    title: "1st ICO Slab",
    status: "Live",
    statusColor: "bg-emerald-500",
    type: "active",
    prices: { usd: 0.00024, inr: 0.02 },
    soldPercentage: 20.50,
    totalCoins: "50000000000",
    description: "Invest in Jaimax 1st ICO slab for your financial future."
  },
  {
    id: 2,
    title: "2nd ICO Slab",
    status: "Upcoming",
    statusColor: "bg-amber-500",
    type: "upcoming",
    prices: { usd: 0.00059, inr: 0.05 },
    totalCoins: "20000000000"
  },
  {
    id: 3,
    title: "3rd ICO Slab",
    status: "Upcoming",
    statusColor: "bg-amber-500",
    type: "upcoming",
    prices: { usd: 0.00710, inr: 0.60000 },
    totalCoins: "25000000000"
  },
  {
    id: 4,
    title: "4th ICO Slab",
    status: "Upcoming",
    statusColor: "bg-amber-500",
    type: "upcoming",
    prices: { usd: 0.01893, inr: 1.60000 },
    totalCoins: "30000000000"
  },
  {
    id: 5,
    title: "5th ICO Slab",
    status: "Upcoming",
    statusColor: "bg-amber-500",
    type: "upcoming",
    prices: { usd: 0.00189, inr: 0.159 },
    totalCoins: "23000000000"
  }
];

const ActiveSlabContent = ({ slab, isActive }) => {
  const [paymentMethod, setPaymentMethod] = useState('INR');
  const [amount, setAmount] = useState('');

  const handleProceedToPay = () => {
    if (!amount) {
      alert('Please enter an amount');
      return;
    }
    alert(`Proceeding to pay ${amount} ${paymentMethod} for ${slab.title}`);
  };

  return (
    <div className={`bg-gradient-to-br from-white via-emerald-50/30 to-teal-50/50 rounded-xl p-4  text-gray-800 shadow-xl border border-emerald-200/50 backdrop-blur-sm transform transition-all duration-700 min-h-[250px] relative overflow-hidden ${isActive ? 'scale-100 opacity-100' : 'scale-95 opacity-80'
      }`}>

      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-emerald-400/20 to-transparent rounded-full -translate-y-4 translate-x-4 blur-xl"></div>
      <div className="absolute bottom-0 left-0 w-12 h-12 bg-gradient-to-tr from-teal-400/15 to-transparent rounded-full translate-y-4 -translate-x-4 blur-lg"></div>

      <div className="relative z-10">
        {/* Header with Status */}
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse shadow-lg shadow-emerald-500/50"></div>
            <h3 className="text-gray-800 font-bold text-base bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              {slab.title}
            </h3>
          </div>
          <span className={`${slab.statusColor} text-white text-xs px-2 py-1 rounded-full flex items-center gap-1 shadow-lg font-semibold`}>
            <CheckCircle size={12} />
            {slab.status}
          </span>
        </div>

        {/* Payment Method Selection */}
        <div className="mb-3">
          <label className="block text-xs font-bold text-gray-700 mb-2 flex items-center gap-1">
            {/* <DollarSign size={12} className="text-emerald-600" /> */}
            Pay with
          </label>
          <div className="flex gap-3">
            {['INR', 'USD'].map((method) => (
              <label key={method} className="flex items-center gap-2 cursor-pointer text-xs">
                <div className="relative">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value={method}
                    checked={paymentMethod === method}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="sr-only"
                  />
                  <div className={`w-3 h-3 rounded-full border-2 transition-all duration-300 shadow-md ${paymentMethod === method
                    ? 'border-emerald-500 bg-emerald-500 shadow-emerald-500/25'
                    : 'border-gray-300 bg-white shadow-gray-200'
                    } flex items-center justify-center`}>
                    {paymentMethod === method && (
                      <div className="w-1 h-1 bg-white rounded-full animate-pulse"></div>
                    )}
                  </div>
                </div>
                <span className={`text-xs font-semibold transition-all  duration-300 ${paymentMethod === method ? 'text-emerald-700' : 'text-gray-500'
                  }`}>{method}</span>
              </label>
            ))}
          </div>
        </div>
        <div className="mb-3">
          <label className="block text-xs font-bold text-gray-700 mb-2 flex items-center gap-1">
            Payment method
          </label>
          <div className="flex gap-3">
            {['WALLET', 'AVAILABLE BALANCE'].map((method) => (
              <label key={method} className="flex items-center gap-2 cursor-pointer">
                <div className="relative">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value={method}
                    checked={paymentMethod === method}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="sr-only"
                  />
                  <div className={`w-3 h-3 rounded-full border-2 transition-all duration-300 shadow-md ${paymentMethod === method
                    ? 'border-emerald-500 bg-emerald-500 shadow-emerald-500/25'
                    : 'border-gray-300 bg-white shadow-gray-200'
                    } flex items-center justify-center`}>
                    {paymentMethod === method && (
                      <div className="w-1 h-1 bg-white rounded-full animate-pulse"></div>
                    )}
                  </div>
                </div>
                <span className={`text-xs font-semibold transition-all duration-300 ${paymentMethod === method ? 'text-emerald-700' : 'text-gray-500'
                  }`}>{method}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Amount Input */}
        <div className="mb-3 space-y-2">
          <div className="relative">
            <input
              type="text"
              placeholder="Enter Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full bg-white/80 backdrop-blur-sm border border-emerald-200 rounded-lg py-2 px-3 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 shadow-md transition-all duration-300"
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-emerald-600 font-semibold text-xs">
              {paymentMethod}
            </div>
          </div>

          <button
            onClick={handleProceedToPay}
            className="w-full rounded-full bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:from-emerald-600 hover:via-teal-600 hover:to-cyan-600 text-white py-2 px-4 rounded-lg text-sm font-bold transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-1 relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform -skew-x-12"></div>
            <span className="relative rounded-full z-10">Proceed to Pay</span>
          </button>
        </div>
        <div className="flex justify-between mb-1 gap-2">
          <div className="flex-1 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-lg p-2 border border-emerald-200/50 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-emerald-700 text-xs font-semibold">INR</span>
              <span className="text-emerald-600 text-xs">↗ +5.2%</span>
            </div>
            <p className="text-emerald-800 text-sm font-bold">₹{slab.prices.inr.toFixed(5)}</p>
          </div>
          <div className="flex-1 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-2 border border-blue-200/50 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-blue-700 text-xs font-semibold">USD</span>
              <span className="text-blue-600 text-xs">↗ +3.8%</span>
            </div>
            <p className="text-blue-800 text-sm font-bold">${slab.prices.usd.toFixed(5)}</p>
          </div>
        </div>
        <div className="mb-1">
          <div className="flex justify-between items-center mb-1">
            <span className="text-gray-700 text-xs font-bold flex items-center gap-1">
              <Coins size={12} className="text-emerald-600" />
              Sold Tokens
            </span>
            <span className="text-emerald-700 text-sm font-bold">{slab.soldPercentage}%</span>
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
  <div className={`bg-gradient-to-br from-white via-emerald-50/30 to-teal-50/50 rounded-xl p-4 text-gray-800 shadow-xl border border-emerald-200/50 backdrop-blur-sm transform transition-all duration-700 min-h-[250px] relative overflow-hidden ${isActive ? 'scale-100 opacity-100' : 'scale-95 opacity-80'}`}>

    {/* Decorative Background Elements */}
    <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-amber-400/20 to-transparent rounded-full -translate-y-4 translate-x-4 blur-xl"></div>
    <div className="absolute bottom-0 left-0 w-12 h-12 bg-gradient-to-tr from-orange-400/15 to-transparent rounded-full translate-y-4 -translate-x-4 blur-lg"></div>

    <div className="relative z-10 flex flex-col justify-between h-full">
      {/* Header */}
      <div className="flex justify-between items-center mb-3">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-pulse shadow-lg shadow-amber-500/50"></div>
          <h3 className="text-gray-800 font-bold text-base bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
            {slab.title}
          </h3>
        </div>
        <span className={`${slab.statusColor} text-white text-xs px-2 py-1 rounded-full flex items-center gap-1 shadow-lg font-semibold`}>
          <Clock size={12} />
          {slab.status}
        </span>
      </div>

      {/* Large Coin Image */}
      <div className="flex justify-center mb-4">
        <div className="w-24 h-24 rounded-full border border-orange-400 shadow-lg overflow-hidden bg-white p-1">
          <img src={jcoin} alt="Coin" className="w-full h-full object-cover" />
        </div>
      </div>

      {/* Price Info */}
      <div className="flex justify-between mb-3 gap-2">
        <div className="flex-1 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-2 border border-blue-200/50 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-blue-700 text-xs font-semibold">USD</span>
            <span className="text-blue-600 text-xs">↗ +3.8%</span>
          </div>
          <p className="text-blue-800 text-sm font-bold">${slab.prices.usd.toFixed(5)}</p>
        </div>
        <div className="flex-1 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-lg p-2 border border-emerald-200/50 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-emerald-700 text-xs font-semibold">INR</span>
            <span className="text-emerald-600 text-xs">↗ +5.2%</span>
          </div>
          <p className="text-emerald-800 text-sm font-bold">₹{slab.prices.inr.toFixed(5)}</p>
        </div>
      </div>

      {/* Total Coins */}
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

      {/* Description */}
      <div className="text-start bg-gradient-to-r from-amber-50/50 to-orange-50/50 rounded-lg p-2 border border-amber-100">
        <p className="text-gray-700 text-sm ">
          {slab.description}
        </p>
      </div>
    </div>
  </div>
);



const SlabTabs = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(false);
  const scrollRef = useRef(null);
  const autoPlayRef = useRef(null);

  const scrollToTab = useCallback((index, smooth = true) => {
    const container = scrollRef.current;
    if (container && index >= 0 && index < slabsData.length) {
      const width = container.clientWidth;
      container.scrollTo({
        left: width * index,
        behavior: smooth ? "smooth" : "auto",
      });
      setActiveTab(index);
    }
  }, []);

  const handleTabClick = (index) => {
    setActiveTab(index);
    scrollToTab(index, true);
    setIsAutoPlay(false);
  };

  useEffect(() => {
    if (isAutoPlay) {
      autoPlayRef.current = setInterval(() => {
        setActiveTab((prev) => {
          const next = prev + 1 >= slabsData.length ? 0 : prev + 1;
          scrollToTab(next);
          return next;
        });
      }, 4000);
    } else {
      clearInterval(autoPlayRef.current);
    }

    return () => clearInterval(autoPlayRef.current);
  }, [isAutoPlay, scrollToTab]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft" && activeTab > 0) {
        handleTabClick(activeTab - 1);
      } else if (e.key === "ArrowRight" && activeTab < slabsData.length - 1) {
        handleTabClick(activeTab + 1);
      } else if (e.key === " ") {
        e.preventDefault();
        setIsAutoPlay(!isAutoPlay);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeTab, isAutoPlay]);

  const getOrdinalSuffix = (num) => {
    const suffixes = ["th", "st", "nd", "rd"];
    const remainder = num % 100;
    return suffixes[(remainder - 20) % 10] || suffixes[remainder] || suffixes[0];
  };

  return (
    <div className="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 rounded-2xl  w-full max-w-7xl mx-auto shadow-2xl border border-white/50 backdrop-blur-sm">
      <div className="px-4 py-3 md:px-3 md:py-1">

        {/* Desktop Tabs */}
        <div className="hidden md:flex justify-center mb-2">
          <div className="flex  rounded-xl p-1  shadow-xl overflow-x-auto gap-2 max-w-full no-scrollbar backdrop-blur-sm">
            {slabsData.map((slab, index) => (
              <button
                key={slab.id}
                onClick={() => handleTabClick(index)}
                className={`px-3 py-1 text-sm rounded-lg font-bold transition-all duration-500 whitespace-nowrap flex-shrink-0 relative overflow-hidden group ${activeTab === index
                  ? "bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-white shadow-lg shadow-emerald-500/25 scale-105"
                  : "bg-[#0d9387] text-slate-300 hover:from-slate-600 hover:to-slate-700 hover:text-white hover:scale-102 shadow-md"
                  }`}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform -skew-x-12"></div>
                <span className="relative z-10">
                  {slab.id}
                  {getOrdinalSuffix(slab.id)} Slab
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
                className={`px-3 py-2 text-xs rounded-lg font-bold transition-all duration-500 whitespace-nowrap flex-shrink-0 border ${activeTab === index
                  ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white border-emerald-400 shadow-md shadow-emerald-500/25"
                  : "bg-gradient-to-r from-slate-700 to-slate-800 text-slate-300 border-slate-600 hover:from-slate-600 hover:to-slate-700 hover:text-white shadow-sm"
                  }`}
              >
                {slab.id}
                {getOrdinalSuffix(slab.id)} Slab
              </button>
            ))}
          </div>
        </div>

        {/* Carousel Area */}
        <div className="relative group">

          {/* LEFT ARROW */}
          {/* <button
            onClick={() =>
              handleTabClick(activeTab > 0 ? activeTab - 1 : slabsData.length - 1)
            }
            className="hidden md:block absolute -left-12 top-1/2 transform -translate-y-1/2 z-30
             bg-gradient-to-r from-white via-white to-gray-50 hover:from-gray-50 hover:to-white 
             text-slate-700 shadow-xl rounded-full p-3 border border-slate-200/50 
             transition-all duration-300 hover:scale-110 hover:shadow-xl active:scale-95
             backdrop-blur-sm"
          >
            <ArrowLeft size={14} />
          </button>
 */}


          {/* Card Container */}
          <div className="flex justify-center">
            <div className="w-full max-w-lg md:max-w-4xl mx-auto">
              {slabsData[activeTab].type === "active" ? (
                <ActiveSlabContent slab={slabsData[activeTab]} isActive />
              ) : (
                <UpcomingSlabContent slab={slabsData[activeTab]} isActive />
              )}
            </div>
          </div>
          {/* <button
            onClick={() =>
              handleTabClick(activeTab < slabsData.length - 1 ? activeTab + 1 : 0)
            }
            className="hidden md:block absolute -right-12 top-1/2 transform -translate-y-1/2 z-30
             bg-gradient-to-r from-white via-white to-gray-50 hover:from-gray-50 hover:to-white 
             text-slate-700 shadow-xl rounded-full p-3 border border-slate-200/50 
             transition-all duration-300 hover:scale-110 hover:shadow-xl active:scale-95
             backdrop-blur-sm"
          >
            <ArrowRight size={14} />
          </button> */}
        </div>
        <div className="flex justify-center items-center gap-2 my-1.5">
          {slabsData.map((_, index) => (
            <button
              key={index}
              onClick={() => handleTabClick(index)}
              className={`rounded-full transition-all duration-500 shadow-md ${activeTab === index
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
  );
};

export default SlabTabs;


