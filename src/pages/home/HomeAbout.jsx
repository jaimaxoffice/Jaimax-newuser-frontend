
import React, { useState, useEffect } from "react";
import { Copy, Users, Coins, TrendingUp, Check } from "lucide-react";
import logo from '../../../src/assets/Images/jaimaxlogo1.svg';
import { useNavigate } from "react-router-dom";
import { useGetRoundQuery } from "../../components/Dashboard/pages/dashBoard/DashboardApliSlice";

const HomeAbout = () => {
  const contractAddress = "0xD898d23a082136f4d752e4dE31D8296EaEb94277";
  const [copied, setCopied] = useState(false);
  const navigate = useNavigate();

  // Fetch data using RTK Query
  const { data: roundData, error, isLoading, refetch } = useGetRoundQuery();

  // Get live rounds (status = 1)
  const liveRounds = roundData?.data?.rounds?.filter(round => round.status === 1) || [];
  const currentRound = liveRounds[0];

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(contractAddress);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      // console.error('Failed to copy:', err);
    }
  };

  // Auto-refresh data every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      refetch();
    }, 30000);
    return () => clearInterval(interval);
  }, [refetch]);

  const handleNavigate = () => {
    navigate("/blog");
  };

  const formatNumber = (num) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toLocaleString();
  };

  // Default stats data for when API data is loading or unavailable
  const livePrice = currentRound?.atPriceInr || "0.0000";
  const soldTokens = formatNumber(currentRound?.soldQty || 225765326);
  const liveMembers = formatNumber(currentRound?.totalMembers || 24567);

  return (
    <>
    <div className="max-w-3xl p-14 mx-auto bg-[#085056]">
              <h4 className="text-xl md:text-2xl font-semibold mb-6 text-gray-200">
                CONTRACT ADDRESS
              </h4>
              <div className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 w-full">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-4 px-3 py-2 sm:px-4 sm:py-2">
                  <p className="flex-1 text-center sm:text-left font-mono text-sm sm:text-base md:text-lg text-white break-all leading-tight">
                    {contractAddress}
                  </p>

                  <button
                    onClick={handleCopy}
                    className="flex items-center justify-center space-x-0 sm:space-x-2 bg-teal-500 hover:bg-teal-600 text-white text-xs sm:text-sm font-medium px-4 py-1.5 sm:px-5 sm:py-2 rounded-full transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-md"
                    title={copied ? 'Copied!' : 'Copy to clipboard'}
                  >
                    {copied ? (
                      <>
                        <Check className="hidden sm:inline" size={16} />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="hidden sm:inline" size={16} />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
      {/* Your existing JSX */}
      <section className="bg-[#085056] py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-lime-400 via-green-300 to-emerald-400 uppercase mb-2">
            LIVE UPDATE
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {/* LIVE PRICE */}
          <div className="bg-[#063c40] border border-[#17bba3] rounded-lg p-6 flex flex-col items-center justify-center text-center shadow-md hover:shadow-lg transition duration-300">
            <p className="text-white text-sm tracking-wide mb-2 uppercase">
              LIVE PRICE
            </p>
            <div className="flex items-center gap-1">
              <h3 className="text-2xl sm:text-3xl font-extrabold text-lime-400">
                ₹{livePrice}
              </h3>
              {/* <TrendingUp className="w-4 h-4 text-lime-400" /> */}
            </div>
          </div>

          {/* SOLD TOKENS */}
          <div className="bg-[#063c40] border border-[#17bba3] rounded-lg p-6 flex flex-col items-center justify-center text-center shadow-md hover:shadow-lg transition duration-300">
            <p className="text-white text-sm tracking-wide mb-2 uppercase">
              SOLD TOKENS
            </p>
            <div className="flex items-center gap-1">
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                {soldTokens}
              </h3>
              {/* <TrendingUp className="w-4 h-4 text-white" /> */}
            </div>
          </div>

          {/* LIVE MEMBERS */}
          <div className="bg-[#063c40] border border-[#17bba3] rounded-lg p-6 flex flex-col items-center justify-center text-center shadow-md hover:shadow-lg transition duration-300">
            <p className="text-white text-sm tracking-wide mb-2 uppercase">
              LIVE MEMBERS
            </p>
            <div className="flex items-center gap-1">
              <h3 className="text-2xl sm:text-3xl font-extrabold text-emerald-300">
                {liveMembers}
              </h3>
              {/* <TrendingUp className="w-4 h-4 text-emerald-300" /> */}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomeAbout;


