import React, { useState, useEffect } from "react";
import {
  useCreateMineWalletMutation,
  useGetMineWalletDetailsQuery,
  useMineJMCMutation,
} from "./dashboardApiSlice";
import { toast } from "react-toastify";

const MiningPage = () => {
  const [lastMineLog, setLastMineLog] = useState(null);
  const [showReward, setShowReward] = useState(false);
  const [mineError, setMineError] = useState(null);

  // ============ API Hooks ============
  const {
    data: walletResponse,
    isLoading: walletLoading,
    isError: walletError,
    refetch: refetchWallet,
  } = useGetMineWalletDetailsQuery();

  const [createWallet, { isLoading: creatingWallet }] =
    useCreateMineWalletMutation();

  const [mineJMC, { isLoading: miningLoading }] = useMineJMCMutation();

  const wallet = walletResponse?.data;

  // Auto dismiss error after 5 seconds
  useEffect(() => {
    let timer;
    if (mineError) {
      timer = setTimeout(() => {
        setMineError(null);
      }, 5000);
    }
    return () => clearTimeout(timer);
  }, [mineError]);

  // ============ Handlers ============
  const handleCreateWallet = async () => {
    try {
      const res = await createWallet().unwrap();
      toast.success(res?.message || "Wallet created successfully!");
      refetchWallet();
    } catch (err) {
      toast.error(err?.data?.message || "Failed to create wallet");
    }
  };

  const handleStartMining = async () => {
    if (!wallet) {
      toast.warning("Please create a wallet first!");
      return;
    }

    // Reset states
    setShowReward(false);
    setLastMineLog(null);
    setMineError(null);

    try {
      const res = await mineJMC({}).unwrap();

      if (res?.success === 1) {
        setLastMineLog(res?.data?.mineLog);
        setShowReward(true);
        toast.success(
          `⛏️ Mined ${res?.data?.mineLog?.actualReward || 0} JMC!`
        );
        refetchWallet();
      }
    } catch (err) {
      const errorMessage =
        err?.data?.message || err?.message || "Mining failed. Try again later.";
      const statusCode = err?.data?.status_code || err?.status || 400;

      setMineError({
        message: errorMessage,
        statusCode: statusCode,
      });

      toast.error(errorMessage);
    }
  };

  const handleDismissError = () => {
    setMineError(null);
  };

  const handleDismissReward = () => {
    setShowReward(false);
    setLastMineLog(null);
  };

  // ============ Helper ============
  const formatDate = (dateStr) => {
    if (!dateStr) return "Never";
    return new Date(dateStr).toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  // Get mining circle state
  const getCircleState = () => {
    if (miningLoading) return "loading";
    if (mineError) return "error";
    if (showReward && lastMineLog) return "success";
    return "idle";
  };

  const circleState = getCircleState();

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-950 via-gray-900 to-teal-950">
      {/* Top Bar */}
      <div className="h-1 bg-gradient-to-r from-teal-400 via-teal-300 to-teal-500" />

      <div className="max-w-5xl mx-auto px-4 py-8 md:py-12">
        {/* ============ Header ============ */}
        <header className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-teal-500/10 border border-teal-500/20 rounded-full px-4 py-1.5 mb-4">
            <span className="w-2 h-2 bg-teal-400 rounded-full animate-pulse" />
            <span className="text-teal-300 text-sm font-medium">
              JMC Mining Platform
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
            Mine <span className="text-teal-400">JMC</span> Tokens
          </h1>
          <p className="text-gray-400 text-lg max-w-md mx-auto">
            Earn JMC tokens by mining. Build your balance and grow your wallet
            daily.
          </p>
        </header>

        {/* ============ No Wallet State ============ */}
        {!walletLoading && (walletError || !wallet) && (
          <div className="bg-gray-900/80 border border-teal-500/20 rounded-3xl p-8 md:p-12 text-center mb-8 backdrop-blur-sm">
            <div className="w-24 h-24 bg-teal-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-12 h-12 text-teal-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M21 12a2.25 2.25 0 00-2.25-2.25H15a3 3 0 11-6 0H5.25A2.25 2.25 0 003 12m18 0v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 9m18 0V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v3"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">
              Create Your Mining Wallet
            </h2>
            <p className="text-gray-400 mb-8 max-w-sm mx-auto">
              Set up your JMC mining wallet to start earning tokens through
              mining sessions.
            </p>
            <button
              onClick={handleCreateWallet}
              disabled={creatingWallet}
              className="bg-teal-500 hover:bg-teal-600 text-white font-semibold py-3.5 px-8 rounded-xl 
                         transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed
                         shadow-lg shadow-teal-500/25 hover:shadow-teal-500/40 hover:scale-105 active:scale-95"
            >
              {creatingWallet ? (
                <span className="flex items-center gap-2">
                  <Spinner />
                  Creating Wallet...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                  Create Wallet
                </span>
              )}
            </button>
          </div>
        )}

        {/* ============ Loading State ============ */}
        {walletLoading && <LoadingSkeleton />}

        {/* ============ Main Content ============ */}
        {wallet && !walletLoading && (
          <>
            {/* Balance Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <BalanceCard
                label="Total Balance"
                value={parseFloat(wallet.totalBalance).toFixed(2)}
                unit="JMC"
                icon={
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                }
                highlight
              />
              <BalanceCard
                label="Per Mine"
                value={wallet.perMineJMC}
                unit="JMC"
                icon={
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                    />
                  </svg>
                }
              />
              <BalanceCard
                label="Lifetime Earned"
                value={parseFloat(wallet.totalEarnedLifetime).toFixed(2)}
                unit="JMC"
                icon={
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                }
              />
              <BalanceCard
                label="Mining Power"
                value={wallet.miningPowerPct}
                unit="%"
                icon={
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                }
              />
            </div>

            {/* ============ Mining Console ============ */}
            <div className="bg-gray-900/80 border border-teal-500/20 rounded-3xl p-6 md:p-10 mb-8 backdrop-blur-sm">
              <div className="flex flex-col items-center">
                {/* Mining Circle */}
                <div className="relative mb-8">
                  {/* Pulse ring */}
                  {miningLoading && (
                    <div className="absolute -inset-4 rounded-full bg-teal-500/10 animate-ping" />
                  )}
                  {circleState === "error" && (
                    <div className="absolute -inset-3 rounded-full bg-red-500/5 animate-pulse" />
                  )}

                  <div
                    className={`relative w-44 h-44 md:w-56 md:h-56 rounded-full flex items-center justify-center
                      transition-all duration-500 z-10
                      ${
                        circleState === "loading"
                          ? "bg-gradient-to-br from-teal-500/20 to-teal-600/10 border-2 border-teal-400 shadow-lg shadow-teal-500/20"
                          : circleState === "error"
                          ? "bg-gradient-to-br from-red-500/10 to-red-600/5 border-2 border-red-500/50 shadow-lg shadow-red-500/10"
                          : circleState === "success"
                          ? "bg-gradient-to-br from-teal-500/20 to-emerald-600/10 border-2 border-teal-300"
                          : "bg-gray-800/80 border-2 border-gray-700 hover:border-teal-500/50"
                      }`}
                  >
                    {/* Spinning Ring - Loading */}
                    {miningLoading && (
                      <svg
                        className="absolute inset-0 w-full h-full animate-spin-slow"
                        viewBox="0 0 100 100"
                      >
                        <circle
                          cx="50"
                          cy="50"
                          r="46"
                          fill="none"
                          stroke="url(#tealGrad)"
                          strokeWidth="3"
                          strokeDasharray="60 229"
                          strokeLinecap="round"
                        />
                        <defs>
                          <linearGradient id="tealGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#2dd4bf" />
                            <stop offset="50%" stopColor="#14b8a6" />
                            <stop offset="100%" stopColor="#0d9488" stopOpacity="0" />
                          </linearGradient>
                        </defs>
                      </svg>
                    )}

                    {/* Center Content */}
                    <div className="text-center z-10 px-4">
                      {/* LOADING STATE */}
                      {circleState === "loading" && (
                        <>
                          <svg
                            className="w-10 h-10 md:w-12 md:h-12 text-teal-400 mx-auto mb-2 animate-bounce"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={1.5}
                              d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
                            />
                          </svg>
                          <p className="text-teal-300 font-semibold text-sm">
                            Mining...
                          </p>
                          <div className="flex items-center justify-center gap-1 mt-2">
                            <span className="w-1.5 h-1.5 bg-teal-400 rounded-full animate-bounce [animation-delay:0ms]" />
                            <span className="w-1.5 h-1.5 bg-teal-400 rounded-full animate-bounce [animation-delay:150ms]" />
                            <span className="w-1.5 h-1.5 bg-teal-400 rounded-full animate-bounce [animation-delay:300ms]" />
                          </div>
                        </>
                      )}

                      {/* ERROR STATE */}
                      {circleState === "error" && (
                        <>
                          <svg
                            className="w-12 h-12 md:w-14 md:h-14 text-red-400 mx-auto mb-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={1.5}
                              d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                            />
                          </svg>
                          <p className="text-red-400 font-semibold text-xs leading-tight">
                            Mining Failed
                          </p>
                        </>
                      )}

                      {/* SUCCESS STATE */}
                      {circleState === "success" && lastMineLog && (
                        <>
                          <p className="text-lg text-teal-400 font-medium">
                            Earned
                          </p>
                          <p className="text-4xl md:text-5xl font-bold text-white">
                            +{lastMineLog.actualReward}
                          </p>
                          <p className="text-teal-300 text-sm font-medium">
                            JMC
                          </p>
                        </>
                      )}

                      {/* IDLE STATE */}
                      {circleState === "idle" && (
                        <>
                          <svg
                            className="w-12 h-12 md:w-14 md:h-14 text-teal-400 mx-auto mb-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={1.5}
                              d="M20.893 13.393l-1.135-1.135a2.252 2.252 0 01-.421-.585l-1.08-2.16a.414.414 0 00-.663-.107.827.827 0 01-.812.21l-1.273-.363a.89.89 0 00-.738 1.595l.587.39c.59.395.674 1.23.172 1.732l-.2.2c-.212.212-.33.498-.33.796v.41c0 .409-.11.809-.32 1.158l-1.315 2.191a2.11 2.11 0 01-1.81 1.025 1.055 1.055 0 01-1.055-1.055v-1.172c0-.92-.56-1.747-1.414-2.089l-.655-.261a2.25 2.25 0 01-1.383-2.46l.007-.042a2.25 2.25 0 01.29-.787l.09-.15a2.25 2.25 0 012.37-1.048l1.178.236a1.125 1.125 0 001.302-.795l.208-.73a1.125 1.125 0 00-.578-1.315l-.665-.332-.091.091a2.25 2.25 0 01-1.591.659h-.18c-.249 0-.487.1-.662.274a.931.931 0 01-1.458-1.137l1.411-2.353a2.25 2.25 0 00.286-.76m11.928 9.869A9 9 0 008.965 3.525m11.928 9.868A9 9 0 118.965 3.525"
                            />
                          </svg>
                          <p className="text-gray-400 text-sm font-medium">
                            Ready to Mine
                          </p>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* ===== ERROR CARD ===== */}
                {mineError && (
                  <div className="bg-red-500/10 border border-red-500/30 rounded-2xl px-6 py-4 mb-6 w-full max-w-lg animate-fadeIn">
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-10 h-10 bg-red-500/20 rounded-full flex items-center justify-center mt-0.5">
                        <svg
                          className="w-5 h-5 text-red-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-red-300 font-semibold text-sm">
                          Mining Failed
                        </h4>
                        <p className="text-red-200/80 text-sm mt-1">
                          {mineError.message}
                        </p>
                        <div className="flex items-center gap-3 mt-3">
                          <span className="text-red-400/60 text-xs bg-red-500/10 px-2 py-0.5 rounded">
                            Error {mineError.statusCode}
                          </span>
                          <button
                            onClick={handleDismissError}
                            className="text-red-300/70 hover:text-red-200 text-xs underline transition-colors"
                          >
                            Dismiss
                          </button>
                        </div>
                      </div>
                      <button
                        onClick={handleDismissError}
                        className="flex-shrink-0 text-red-400/50 hover:text-red-300 transition-colors"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                )}

                {/* ===== SUCCESS REWARD CARD ===== */}
                {showReward && lastMineLog && (
                  <div className="bg-teal-500/10 border border-teal-500/30 rounded-2xl px-6 py-4 mb-6 w-full max-w-lg animate-fadeIn">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-teal-500/20 rounded-full flex items-center justify-center">
                          <svg
                            className="w-4 h-4 text-teal-300"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        </div>
                        <h4 className="text-teal-300 font-semibold text-sm">
                          Mining Successful!
                        </h4>
                      </div>
                      <button
                        onClick={handleDismissReward}
                        className="text-teal-400/50 hover:text-teal-300 transition-colors"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      <div className="bg-teal-500/10 rounded-xl p-3 text-center">
                        <p className="text-teal-400/70 text-xs uppercase tracking-wider font-medium">
                          Slot
                        </p>
                        <p className="text-white font-bold text-lg mt-0.5">
                          #{lastMineLog.slotNumber}
                        </p>
                      </div>
                      <div className="bg-teal-500/10 rounded-xl p-3 text-center">
                        <p className="text-teal-400/70 text-xs uppercase tracking-wider font-medium">
                          Base
                        </p>
                        <p className="text-white font-bold text-lg mt-0.5">
                          {lastMineLog.baseReward}
                        </p>
                      </div>
                      <div className="bg-teal-500/10 rounded-xl p-3 text-center">
                        <p className="text-teal-400/70 text-xs uppercase tracking-wider font-medium">
                          Earned
                        </p>
                        <p className="text-teal-300 font-bold text-lg mt-0.5">
                          +{lastMineLog.actualReward}
                        </p>
                      </div>
                      <div className="bg-teal-500/10 rounded-xl p-3 text-center">
                        <p className="text-teal-400/70 text-xs uppercase tracking-wider font-medium">
                          Status
                        </p>
                        <span className="inline-block bg-teal-500/20 text-teal-300 text-xs px-2 py-0.5 rounded-full font-medium capitalize mt-1">
                          {lastMineLog.status}
                        </span>
                      </div>
                    </div>
                    <div className="mt-3 pt-3 border-t border-teal-500/20 flex items-center justify-between">
                      <p className="text-gray-400 text-xs">
                        Date:{" "}
                        <span className="text-teal-300">
                          {lastMineLog.mineDate}
                        </span>
                      </p>
                      <p className="text-gray-400 text-xs">
                        Mined at:{" "}
                        <span className="text-teal-300">
                          {formatDate(lastMineLog.minedAt)}
                        </span>
                      </p>
                    </div>
                  </div>
                )}

                {/* Mine Button */}
                <button
                  onClick={handleStartMining}
                  disabled={!wallet || miningLoading}
                  className={`group font-bold py-4 px-12 rounded-2xl text-lg transition-all duration-300 
                             disabled:opacity-40 disabled:cursor-not-allowed
                             hover:scale-105 active:scale-95
                             ${
                               mineError
                                 ? "bg-teal-500 hover:bg-teal-600 text-white shadow-lg shadow-teal-500/25 hover:shadow-teal-500/40"
                                 : "bg-teal-500 hover:bg-teal-600 text-white shadow-lg shadow-teal-500/25 hover:shadow-teal-500/40"
                             }`}
                >
                  {miningLoading ? (
                    <span className="flex items-center gap-3">
                      <Spinner />
                      Mining in progress...
                    </span>
                  ) : mineError ? (
                    <span className="flex items-center gap-2">
                      <svg
                        className="w-6 h-6 group-hover:rotate-45 transition-transform"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                        />
                      </svg>
                      Retry Mining
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <svg
                        className="w-6 h-6 group-hover:rotate-12 transition-transform"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 10V3L4 14h7v7l9-11h-7z"
                        />
                      </svg>
                      Start Mining
                    </span>
                  )}
                </button>
              </div>
            </div>

            {/* ============ Wallet Details Grid ============ */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {/* Earnings Breakdown */}
              <div className="bg-gray-900/80 border border-teal-500/20 rounded-3xl p-6 backdrop-blur-sm">
                <h3 className="text-white font-semibold text-lg mb-5 flex items-center gap-2">
                  <svg className="w-5 h-5 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                    />
                  </svg>
                  Earnings Breakdown
                </h3>
                <div className="space-y-3">
                  <DetailRow label="Total Balance" value={`${parseFloat(wallet.totalBalance).toFixed(2)} JMC`} color="text-teal-300" />
                  <DetailRow label="Lifetime Earned" value={`${parseFloat(wallet.totalEarnedLifetime).toFixed(2)} JMC`} color="text-white" />
                  <DetailRow label="Total Deducted" value={`${parseFloat(wallet.totalDeducted).toFixed(2)} JMC`} color="text-red-400" />
                  <DetailRow label="Referral Earned" value={`${parseFloat(wallet.totalReferralEarned).toFixed(2)} JMC`} color="text-blue-400" />
                  <DetailRow label="Bonus Earned" value={`${parseFloat(wallet.totalBonusEarned).toFixed(2)} JMC`} color="text-yellow-400" />
                  <DetailRow label="Per Mine Reward" value={`${wallet.perMineJMC} JMC`} color="text-teal-400" />
                </div>
              </div>

              {/* Mining Status */}
              <div className="bg-gray-900/80 border border-teal-500/20 rounded-3xl p-6 backdrop-blur-sm">
                <h3 className="text-white font-semibold text-lg mb-5 flex items-center gap-2">
                  <svg className="w-5 h-5 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                  Mining Status
                </h3>
                <div className="space-y-3">
                  {/* Mining Power Bar */}
                  <div className="bg-gray-800/80 rounded-xl p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-400 text-sm">Mining Power</span>
                      <span className="text-teal-300 font-bold">{wallet.miningPowerPct}%</span>
                    </div>
                    <div className="bg-gray-700 rounded-full h-2.5 overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          wallet.miningPowerPct >= 80
                            ? "bg-teal-400"
                            : wallet.miningPowerPct >= 50
                            ? "bg-yellow-400"
                            : "bg-red-400"
                        }`}
                        style={{ width: `${wallet.miningPowerPct}%` }}
                      />
                    </div>
                  </div>

                  <DetailRow
                    label="Consecutive Missed"
                    value={wallet.consecutiveMissedCount}
                    color={wallet.consecutiveMissedCount > 0 ? "text-red-400" : "text-green-400"}
                  />
                  <DetailRow
                    label="Recovery Mode"
                    value={
                      <StatusBadge
                        active={wallet.isInRecovery}
                        activeText="In Recovery"
                        inactiveText="Normal"
                        activeColor="bg-yellow-500/20 text-yellow-300"
                        inactiveColor="bg-green-500/20 text-green-300"
                      />
                    }
                  />
                  {wallet.isInRecovery && (
                    <DetailRow
                      label="Recovery Progress"
                      value={`${wallet.recoveryMinesCompleted} / ${wallet.recoveryMinesRequired}`}
                      color="text-yellow-300"
                    />
                  )}
                  <DetailRow
                    label="Resurrection Mode"
                    value={
                      <StatusBadge
                        active={wallet.isInResurrection}
                        activeText="In Resurrection"
                        inactiveText="Normal"
                        activeColor="bg-purple-500/20 text-purple-300"
                        inactiveColor="bg-green-500/20 text-green-300"
                      />
                    }
                  />
                  <DetailRow
                    label="Penalty Tier"
                    value={
                      <span className={`font-semibold ${wallet.currentPenaltyTierId > 0 ? "text-red-400" : "text-green-400"}`}>
                        {wallet.currentPenaltyTierId > 0 ? `Tier ${wallet.currentPenaltyTierId}` : "None"}
                      </span>
                    }
                  />
                  <DetailRow label="Last Mined" value={formatDate(wallet.lastMineAt)} color="text-gray-300" />
                </div>
              </div>
            </div>

            {/* ============ Wallet Info Footer ============ */}
            <div className="bg-gray-900/80 border border-teal-500/20 rounded-3xl p-6 backdrop-blur-sm mb-8">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">Wallet ID</p>
                  <p className="text-white font-mono text-sm bg-gray-800 px-3 py-1.5 rounded-lg inline-block">
                    {wallet.id}
                  </p>
                </div>
                <div>
                  <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">Created</p>
                  <p className="text-gray-300 text-sm font-medium">{formatDate(wallet.createdAt)}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">Last Updated</p>
                  <p className="text-gray-300 text-sm font-medium">{formatDate(wallet.updatedAt)}</p>
                </div>
                <button
                  onClick={refetchWallet}
                  className="bg-teal-500/10 hover:bg-teal-500/20 text-teal-300 border border-teal-500/30 
                             px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200
                             flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    />
                  </svg>
                  Refresh
                </button>
              </div>
            </div>


          </>
        )}
      </div>
    </div>
  );
};

// ============================================================
//  SUB COMPONENTS
// ============================================================

const BalanceCard = ({ label, value, unit, icon, highlight }) => (
  <div
    className={`rounded-2xl p-5 border backdrop-blur-sm transition-all duration-300 hover:scale-[1.02]
    ${
      highlight
        ? "bg-teal-500/10 border-teal-500/30 shadow-lg shadow-teal-500/10"
        : "bg-gray-900/80 border-gray-700/50"
    }`}
  >
    <div className={`w-9 h-9 rounded-lg flex items-center justify-center mb-3 ${
      highlight ? "bg-teal-500/20 text-teal-300" : "bg-gray-800 text-gray-400"
    }`}>
      {icon}
    </div>
    <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">{label}</p>
    <p className="text-white text-2xl font-bold">
      {value} <span className="text-sm font-normal text-gray-400">{unit}</span>
    </p>
  </div>
);

const DetailRow = ({ label, value, color = "text-white" }) => (
  <div className="flex items-center justify-between bg-gray-800/60 rounded-xl px-4 py-3">
    <span className="text-gray-400 text-sm">{label}</span>
    {typeof value === "string" || typeof value === "number" ? (
      <span className={`font-semibold text-sm ${color}`}>{value}</span>
    ) : (
      value
    )}
  </div>
);

const StatusBadge = ({ active, activeText, inactiveText, activeColor, inactiveColor }) => (
  <span className={`text-xs px-3 py-1 rounded-full font-medium ${active ? activeColor : inactiveColor}`}>
    {active ? activeText : inactiveText}
  </span>
);

const InfoCard = ({ icon, title, desc }) => (
  <div className="bg-gray-900/80 border border-gray-700/50 rounded-2xl p-5 hover:border-teal-500/30 transition-all duration-300 group">
    <div className="w-10 h-10 rounded-xl bg-teal-500/10 text-teal-400 flex items-center justify-center mb-3 group-hover:bg-teal-500/20 transition-colors">
      {icon}
    </div>
    <h4 className="text-white font-semibold mb-1">{title}</h4>
    <p className="text-gray-400 text-sm">{desc}</p>
  </div>
);

const Spinner = () => (
  <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
  </svg>
);

const LoadingSkeleton = () => (
  <div className="space-y-6 animate-pulse">
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="bg-gray-800/60 border border-gray-700/50 rounded-2xl p-5">
          <div className="w-9 h-9 bg-gray-700 rounded-lg mb-3" />
          <div className="h-3 bg-gray-700 rounded w-16 mb-2" />
          <div className="h-7 bg-gray-700 rounded w-24" />
        </div>
      ))}
    </div>
    <div className="bg-gray-800/60 border border-gray-700/50 rounded-3xl p-10">
      <div className="flex flex-col items-center">
        <div className="w-48 h-48 bg-gray-700 rounded-full mb-6" />
        <div className="h-12 bg-gray-700 rounded-2xl w-48" />
      </div>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {[...Array(2)].map((_, i) => (
        <div key={i} className="bg-gray-800/60 border border-gray-700/50 rounded-3xl p-6">
          <div className="h-5 bg-gray-700 rounded w-40 mb-5" />
          <div className="space-y-3">
            {[...Array(5)].map((_, j) => (
              <div key={j} className="h-12 bg-gray-700/50 rounded-xl" />
            ))}
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default MiningPage;