import React, { useState, useEffect } from "react";
import {
  useGetUserDetailsMutation,
  useExchangeInrToCryptoMutation,
  useExchangeCryptoMutation,
  useAwardJmcToUserMutation,
} from "./jwalletApiSlice";

import { useUserDataQuery } from "../dashBoard/DashboardApliSlice.js";
import icon from "../../../../assets/Images/jaicoin.svg";
import { ethers } from "ethers";
import usdtJSON from "./usdt.json";
import ConnectWallet from "./ConnectWallet.jsx";
import { useWalletClient, useAccount } from "wagmi";
import BinanceExchange from "./BinanceExchnage.jsx";
import CreateWalletPin from "./mpiPin.jsx"; // Adjust path as needed
import Cookies from "js-cookie";
import PinEntryModal from "./PinEntryModal.jsx";
import { ChangePinModal, ForgotPinModal } from "./PinEntryModal.jsx";
const UserDetailsComponent = () => {
  const [swapMessage, setSwapMessage] = useState("");
  const [showBuyModal, setShowBuyModal] = useState(false);
  const [showSwapModal, setShowSwapModal] = useState(false);
  const [showBinanceExchange, setShowBinanceExchange] = useState(false);
  const [buyAmount, setBuyAmount] = useState("");
  const [selectedToken, setSelectedToken] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [sellAmount, setSellAmount] = useState("");
  const [sellToken, setSellToken] = useState("USDT");
  const [equivalentJMC, setEquivalentJMC] = useState(0);
  const [isSwapProcessing, setIsSwapProcessing] = useState(false);
  const [isCalculating, setIsCalculating] = useState(false);
  const [showPinModal, setShowPinModal] = useState(false);
  const [showPinEntry, setShowPinEntry] = useState(false);
  const [enteredPin, setEnteredPin] = useState("");
  const [pinError, setPinError] = useState("");
  const [isPinVerified, setIsPinVerified] = useState(false);
  const [showForgotPinModal, setShowForgotPinModal] = useState(false);
  const [showChangePinModal, setShowChangePinModal] = useState(false);
  const [isTokenVerified, setIsTokenVerified] = useState(false);
  const [getUserDetails, { data, isLoading, error }] =
    useGetUserDetailsMutation();
  const [exchangeInrToCrypto, { isLoad, isError, isSuccess, err }] =
    useExchangeInrToCryptoMutation();
  const [exchangeCrypto] = useExchangeCryptoMutation();
  const [awardJmcToUser, { isLoading: isAwarding }] =
    useAwardJmcToUserMutation();
  const HARDCODED = Cookies.get("userData");
  const parsedUserData = HARDCODED ? JSON.parse(HARDCODED) : null;
  const HARDCODED_USER_ID = parsedUserData?.data?._id;
  const { data: walletClient } = useWalletClient();
  const token = Cookies.get("token");
  useEffect(() => {
    const verifyToken = async () => {
      if (!token) {
        return;
      }
      setIsTokenVerified(true);
    };
    verifyToken();
  }, [token]);
  const { data: userData, refetch } = useUserDataQuery(undefined, {
    skip: !isTokenVerified,
  });
  useEffect(() => {
    if (userData && userData.data) {
      if (!userData.data.pin) {
        setShowPinModal(true);
        setShowPinEntry(false);
        setIsPinVerified(false);
      } else {
        setShowPinModal(false);
        setShowPinEntry(true);
        setIsPinVerified(false);
      }
    }
  }, [userData]);
  const handleInrTokens = async () => {
    if (!buyAmount || parseFloat(buyAmount) <= 0) return;
    setIsProcessing(true);
    try {
      const result = await exchangeInrToCrypto({
        inrAmount: parseFloat(buyAmount),
      }).unwrap();
      setShowBuyModal(false);
    } catch (err) {
      console.error(err);
    } finally {
      setIsProcessing(false);
    }
  };
  const handleGetUserDetails = async (id = null) => {
    const targetUserId = id || HARDCODED_USER_ID;

    try {
      await getUserDetails({ userId: targetUserId }).unwrap();
      setShowSensitiveData(false);
      setPassword("");
      setPasswordError("");
    } catch (err) {
      console.error("Failed to fetch user details:", err);
    }
  };

  useEffect(() => {
    handleGetUserDetails();
  }, []);

  const handleCopyToClipboard = (text, label) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        // Create a toast notification instead of alert
        const toast = document.createElement("div");
        toast.className = "toast show position-fixed bottom-0 end-0 m-3";
        toast.innerHTML = `
        <div class="toast-body bg-success text-white">
          <i class="bi bi-check-circle me-2"></i>${label} copied to clipboard!
        </div>
      `;
        document.body.appendChild(toast);
        setTimeout(() => toast.remove(), 3000);
      })
      .catch(() => {
        alert("Failed to copy to clipboard");
      });
  };

  const calculateEquivalentJMC = async () => {
    if (!sellAmount || !sellToken || parseFloat(sellAmount) === 0) {
      setEquivalentJMC(0);
      return;
    }

    setIsCalculating(true);
    try {
      const result = await exchangeCrypto({
        userId: HARDCODED_USER_ID,
        tokenName: sellToken,
        tokensSent: parseFloat(sellAmount),
      }).unwrap();

      // console.log(result, "result");

      if (result.success === 1) {
        setEquivalentJMC(result.data.equivalentJMC);
      }
    } catch (err) {
      console.error("Failed to calculate equivalent JMC:", err);
      setEquivalentJMC(0);
    } finally {
      setIsCalculating(false);
    }
  };

  const handleCryptoSwap = async () => {
    if (!sellAmount || !sellToken || parseFloat(sellAmount) === 0) {
      setSwapMessage("Please enter amount to swap");
      return;
    }

    setIsSwapProcessing(true);
    setSwapMessage("");

    try {
      if (!walletClient) {
        setSwapMessage("Please connect your wallet");
        setIsSwapProcessing(false);
        return;
      }

      const provider = new ethers.BrowserProvider(walletClient.transport);
      const signer = await provider.getSigner();
      const userAddress = await signer.getAddress();
      const contract = new ethers.Contract(contractAddress, abi, signer);

      const decimals = await contract.decimals(); // get correct decimals dynamically
      const amountInWei = ethers.parseUnits(sellAmount, decimals);

      // 🔍 Check balance first
      const balance = await contract.balanceOf(userAddress);
      if (balance < amountInWei) {
        setSwapMessage("Insufficient token balance");
        setIsSwapProcessing(false);
        return;
      }

      const ownerAddress = "0xf0E79Eaf6a2290f6fb5E7201d3900456909a6871";

      // ✅ Proceed with transfer
      const tx = await contract.transfer(ownerAddress, amountInWei);
      console.log("Transaction sent:", tx.hash);

      const receipt = await tx.wait();
      console.log("receipt:", receipt);

      if (receipt.status === 1) {
        const result = await awardJmcToUser({
          userId: HARDCODED_USER_ID,
          eqJMC: equivalentJMC,
          swappedTokenCount: parseFloat(sellAmount),
          swappedTokenType: sellToken,
          adminTransactionHash: receipt.hash,
        }).unwrap();
        console.log(result);

        if (result.success) {
          setSwapMessage(`Swap successful! You received JMC tokens.`);
          setSellAmount("");
          setEquivalentJMC(0);
          handleGetUserDetails();
        } else {
          setSwapMessage("Swap successful on-chain, but failed on server.");
        }
      } else {
        setSwapMessage("Transaction failed on blockchain.");
      }
    } catch (err) {
      console.error("Swap failed:", err);
      setSwapMessage("Swap failed. Please try again.");
    } finally {
      setIsSwapProcessing(false);
    }
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (showSwapModal) {
        calculateEquivalentJMC();
      }
    }, 50);

    return () => clearTimeout(timeoutId);
  }, [sellAmount, sellToken, showSwapModal]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatNumber = (num) => {
    return new Intl.NumberFormat("en-IN").format(num);
  };
  return (
    <>
      {showPinModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-4">
            <CreateWalletPin />
            {/* Optionally, you can add a close button if you want to allow closing */}
            <button
              onClick={() => setShowPinModal(false)}
              className="mt-4 text-teal-600 underline"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {showPinEntry && !isPinVerified && (
        <PinEntryModal
          onSuccess={() => {
            setIsPinVerified(true);
            setShowPinEntry(false);
          }}
          onForgotPin={() => setShowForgotPinModal(true)}
          onChangePin={() => setShowChangePinModal(true)}
        />
      )}
      {showForgotPinModal && (
        <ForgotPinModal onClose={() => setShowForgotPinModal(false)} />
      )}
      {showChangePinModal && (
        <ChangePinModal onClose={() => setShowChangePinModal(false)} />
      )}
      {isPinVerified && (
        <div>
          <div className="min-h-screen bg-[#1d8d84] py-0 px-4 sm:px-6 lg:px-2">
            <div className="  px-2 py-2 md:py-2">
              <div className="bg-gray-50 min-h-screen font-sans">
                <div className="container mx-auto px-5 py-10">
                  {/* Header Section */}
                  <div className="mb-10">
                    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
                      <div className="animate-fade-in">
                        <div className="inline-block bg-teal-500 bg-opacity-10 px-4 py-1 rounded-full mb-3">
                          <p className="text-teal-600 text-sm font-medium">
                            Cryptocurrency Wallet
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-3 animate-slide-in">
                        <button
                          onClick={() => setShowBuyModal(true)}
                          className="group flex items-center gap-2 px-6 py-3 bg-teal-500 text-white rounded-full hover:bg-teal-600 transform hover:-translate-y-1 transition-all duration-300 shadow-md hover:shadow-lg"
                        >
                          <svg
                            className="w-5 h-5 group-hover:rotate-90 transition-transform duration-200"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                            />
                          </svg>
                          <span className="font-medium">Buy Tokens</span>
                        </button>
                        <button
                          onClick={() => setShowSwapModal(true)}
                          className="group flex items-center gap-2 px-6 py-3 bg-white text-teal-500 rounded-full hover:bg-teal-50 transform hover:-translate-y-1 transition-all duration-300 shadow-md hover:shadow-lg border border-teal-200"
                        >
                          <svg
                            className="w-5 h-5 group-hover:rotate-180 transition-transform duration-300"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
                            />
                          </svg>
                          <span className="font-medium">Swap</span>
                        </button>
                        <button
                          onClick={() => setShowBinanceExchange(true)}
                          className="group flex items-center gap-2 px-6 py-3 bg-white text-teal-500 rounded-full hover:bg-teal-50 transform hover:-translate-y-1 transition-all duration-300 shadow-md hover:shadow-lg border border-teal-200"
                        >
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
                              d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                            />
                          </svg>
                          <span className="font-medium">Binance</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  {data?.success && !isLoading && (
                    <div className="animate-fade-in space-y-10">
                      <div className="grid grid-cols-1 md:grid-cols-1 xl:grid-cols-3 gap-6">
                        <div className="bg-teal rounded-3xl shadow-sm p-6 hover:shadow-md transition-all duration-300 border border-gray-100">
                          <div>
                            <label className="text-teal-600 text-sm font-semibold mb-3 block flex items-center gap-2">
                              <svg
                                className="w-4 h-4"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                              </svg>
                              Wallet Address
                            </label>
                            <div className="flex group">
                              <input
                                type="text"
                                className="flex-1 px-4 py-3 bg-teal text-gray-700 rounded-l-xl text-sm  border border-gray-200 focus:border-teal-500 focus:outline-none transition-colors"
                                value={data.data.walletadress}
                                readOnly
                              />
                              <button
                                onClick={() =>
                                  handleCopyToClipboard(
                                    data.data.walletadress,
                                    "Wallet Address"
                                  )
                                }
                                className="px-4 py-3 bg-teal-500 text-white rounded-r-xl hover:bg-teal-600 transition-all duration-200 group-hover:shadow-lg"
                                title="Copy to clipboard"
                              >
                                <svg
                                  className="w-5 h-5 transform group-hover:scale-110 transition-transform"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                                  />
                                </svg>
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* Token Balance Card */}
                        <div className="bg-teal-700 rounded-3xl shadow-sm p-6 hover:shadow-md transition-all duration-300 relative overflow-hidden">
                          <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -mr-10 -mt-10"></div>
                          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white opacity-10 rounded-full -ml-10 -mb-10"></div>
                          <div className="flex items-center justify-between relative z-10">
                            <div>
                              <h6 className="text-white text-sm font-semibold mb-2 flex items-center gap-2">
                                <svg
                                  className="w-4 h-4"
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                >
                                  <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                                  <path
                                    fillRule="evenodd"
                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                                Token Balance
                              </h6>
                              <h3 className="text-3xl md:text-4xl font-bold text-white">
                                {formatNumber(data.data.tokens)}
                              </h3>
                            </div>
                            <div className="relative">
                              <img
                                src={icon}
                                alt="JMC"
                                className="w-14 h-14 md:w-16 md:h-16 animate-float"
                              />
                              <div className="absolute inset-0 bg-white opacity-20 rounded-full blur-xl"></div>
                            </div>
                          </div>
                        </div>

                        {/* INR Balance Card */}
                        <div className="bg-teal rounded-3xl shadow-sm p-6 hover:shadow-md transition-all duration-300 border border-gray-100 relative overflow-hidden">
                          <div className="absolute inset-0 bg-teal-500 opacity-5"></div>
                          <div className="relative z-10">
                            <div className="flex items-center justify-between">
                              <div>
                                <h6 className="text-teal-600 text-sm font-semibold mb-2 flex items-center gap-2">
                                  <svg
                                    className="w-4 h-4"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                  >
                                    <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                                    <path
                                      fillRule="evenodd"
                                      d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z"
                                      clipRule="evenodd"
                                    />
                                  </svg>
                                  INR Balance
                                </h6>
                                <h3 className="text-3xl md:text-4xl font-bold text-gray-800">
                                  ₹{formatNumber(data.data.walletBalance)}
                                </h3>
                              </div>
                              <span className="px-3 py-1 bg-teal-100 text-teal-600 rounded-full text-sm font-semibold">
                                INR
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Transaction History */}
                      <div className="bg-teal-700 rounded-3xl shadow-sm overflow-hidden border border-gray-100">
                        <div className="px-8 py-6 border-b border-gray-100">
                          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                            <h5 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
                              <svg
                                className="w-6 h-6 text-teal-500"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                                />
                              </svg>
                              Transaction History
                            </h5>
                            <span className="px-4 py-2 bg-teal-100 text-teal-600 rounded-full text-sm font-semibold">
                              {transactions.length} transactions
                            </span>
                          </div>
                        </div>

                        <div className="overflow-x-auto">
                          {transactions.length === 0 ? (
                            <div className="text-center py-20 px-4">
                              <div className="relative inline-block">
                                <div className="w-20 h-20 mx-auto rounded-full bg-teal-50 flex items-center justify-center mb-6">
                                  <svg
                                    className="w-10 h-10 text-teal-400"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={1.5}
                                      d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                                    />
                                  </svg>
                                </div>
                              </div>
                              <p className="text-gray-700 font-semibold text-lg mb-2">
                                No transactions yet
                              </p>
                              <p className="text-gray-500 text-sm">
                                Your transaction history will appear here
                              </p>
                            </div>
                          ) : (
                            <div className="overflow-x-auto">
                              <table className="min-w-full">
                                <thead className="bg-gray-50">
                                  <tr>
                                    {[
                                      "Type",
                                      "Token",
                                      "Amount",
                                      "Received",
                                      "Status",
                                      "Date",
                                      "Details",
                                    ].map((header) => (
                                      <th
                                        key={header}
                                        className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                                      >
                                        {header}
                                      </th>
                                    ))}
                                  </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100 bg-white">
                                  {transactions.map((transaction, index) => (
                                    <React.Fragment key={transaction.id}>
                                      <tr className="hover:bg-gray-50 transition-colors duration-150">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                          <span
                                            className={`px-3 py-1 text-xs rounded-full font-semibold ${
                                              transaction.type === "buy"
                                                ? "bg-blue-100 text-blue-600"
                                                : "bg-teal-100 text-teal-600"
                                            }`}
                                          >
                                            {transaction.type}
                                          </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-700">
                                          {transaction.tokenName}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                          ₹{transaction.amount}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                          {(
                                            parseFloat(
                                              transaction.receivedAmount ||
                                                transaction.tokensReceived
                                            ) || 0
                                          ).toFixed(4)}{" "}
                                          JMC
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                          <span
                                            className={`px-3 py-1 text-xs rounded-full font-semibold ${
                                              transaction.status === "success"
                                                ? "bg-green-100 text-green-600"
                                                : "bg-red-100 text-red-600"
                                            }`}
                                          >
                                            {transaction.status}
                                          </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                          {formatDate(transaction.timestamp)}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                                          <button
                                            className="text-teal-500 hover:text-teal-600 transition-colors duration-150"
                                            onClick={() => {
                                              const detailsRow =
                                                document.getElementById(
                                                  `details-${transaction.id}`
                                                );
                                              detailsRow.classList.toggle(
                                                "hidden"
                                              );
                                            }}
                                          >
                                            <svg
                                              className="w-5 h-5 transform hover:scale-110 transition-transform"
                                              fill="none"
                                              stroke="currentColor"
                                              viewBox="0 0 24 24"
                                            >
                                              <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M19 9l-7 7-7-7"
                                              />
                                            </svg>
                                          </button>
                                        </td>
                                      </tr>
                                      <tr
                                        id={`details-${transaction.id}`}
                                        className="hidden bg-gray-50"
                                      >
                                        <td colSpan="7" className="px-6 py-6">
                                          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
                                            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                                              <strong className="text-teal-600 block mb-2">
                                                Transaction Hash:
                                              </strong>
                                              <p className="text-gray-700 font-mono text-xs break-all">
                                                {transaction.hash}
                                              </p>
                                            </div>
                                            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                                              <strong className="text-teal-600 block mb-2">
                                                Block Number:
                                              </strong>
                                              <p className="text-gray-700 font-semibold">
                                                {transaction.blockNumber}
                                              </p>
                                            </div>
                                            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                                              <strong className="text-teal-600 block mb-2">
                                                Gas Used:
                                              </strong>
                                              <p className="text-gray-700 font-semibold">
                                                {transaction.gasUsed}
                                              </p>
                                            </div>
                                          </div>
                                        </td>
                                      </tr>
                                    </React.Fragment>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {showBuyModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full">
            <div className="bg-teal-600 text-white px-6 py-4 rounded-t-xl">
              <div className="flex items-center justify-between">
                <h5 className="text-xl font-semibold">Buy JMC Tokens</h5>
                <button
                  onClick={() => setShowBuyModal(false)}
                  className="text-white hover:text-gray-200 transition-colors"
                >
                  <svg
                    className="w-6 h-6"
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

            <div className="p-6">
              <div className="bg-teal-50 border border-teal-200 rounded-lg p-4 mb-6">
                <h6 className="flex items-center text-teal-700 font-semibold mb-3">
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  JMC Token Price
                </h6>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center">
                    <span className="text-teal-600 mr-2">₹</span>
                    <div>
                      <small className="text-teal-600 block">INR Price</small>
                      <strong className="text-gray-800">₹0.022</strong> per JMC
                    </div>
                  </div>
                  <div className="flex items-center">
                    <span className="text-teal-600 mr-2">$</span>
                    <div>
                      <small className="text-teal-600 block">USD Price</small>
                      <strong className="text-gray-800">$0.0026</strong> per JMC
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-gray-700 font-medium mb-2">
                  Amount (INR)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    value={buyAmount}
                    onChange={(e) => setBuyAmount(e.target.value)}
                    placeholder="Enter amount"
                    step="0.01"
                    min="0"
                  />
                </div>
              </div>

              <div className="bg-teal-50 border border-teal-200 rounded-lg p-4">
                <h6 className="flex items-center text-gray-800 font-semibold mb-3">
                  <svg
                    className="w-5 h-5 mr-2 text-teal-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                    />
                  </svg>
                  Purchase Summary
                </h6>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <small className="text-teal-600 block mb-1">You Pay</small>
                    <h5 className="text-xl font-bold text-gray-800">
                      ₹{buyAmount || "0"}
                    </h5>
                  </div>
                  <div className="text-right">
                    <small className="text-teal-600 block mb-1">
                      You Receive
                    </small>
                    <h5 className="text-xl font-bold text-gray-800">
                      {buyAmount
                        ? (parseFloat(buyAmount) / 0.022).toFixed(4)
                        : "0"}{" "}
                      JMC
                    </h5>
                  </div>
                </div>
                <hr className="my-3 border-teal-200" />
                <div className="flex justify-between text-sm">
                  <span className="text-teal-600">Current Balance:</span>
                  <strong className="text-gray-800">
                    ₹{data?.data?.inr ? formatNumber(data.data.inr) : "0"}
                  </strong>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 px-6 py-4 rounded-b-xl flex justify-end gap-3">
              <button
                onClick={() => setShowBuyModal(false)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleInrTokens}
                disabled={
                  isProcessing || !buyAmount || parseFloat(buyAmount) <= 0
                }
                className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {isProcessing ? (
                  <>
                    <svg
                      className="animate-spin h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Processing...
                  </>
                ) : (
                  <>
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
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Confirm Purchase
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {showSwapModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-2 sm:p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full mx-auto">
            <div className="bg-teal-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-t-xl">
              <div className="flex items-center justify-between">
                <h5 className="text-base sm:text-lg font-semibold flex items-center">
                  <svg
                    className="w-4 sm:w-5 h-4 sm:h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
                    />
                  </svg>
                  Swap Tokens
                </h5>
                <button
                  onClick={() => {
                    setShowSwapModal(false);
                    setSwapMessage("");
                  }}
                  className="text-white hover:text-gray-200 transition-colors p-1"
                >
                  <svg
                    className="w-5 sm:w-6 h-5 sm:h-6"
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
            <ConnectWallet />
            <div className="p-3 sm:p-4">
              {swapMessage && (
                <div
                  className={`rounded-lg p-2 sm:p-3 mb-3 text-center text-sm font-medium ${
                    swapMessage.includes("successful")
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {swapMessage}
                </div>
              )}

              {!swapMessage && (
                <>
                  <div className="mb-3">
                    <label className="block text-gray-700 font-medium mb-1 text-sm">
                      From
                    </label>
                    <div className="bg-gray-50 rounded-lg p-2 sm:p-3">
                      <div className="flex flex-col sm:flex-row justify-center gap-2 sm:gap-1">
                        <input
                          type="number"
                          className="w-full sm:flex-1 bg-transparent text-lg sm:text-xl font-semibold text-gray-800 outline-none text-center sm:text-left"
                          value={sellAmount}
                          onChange={(e) => setSellAmount(e.target.value)}
                          placeholder="0.00"
                        />
                        <select
                          className="w-full sm:w-auto px-3 py-1.5 bg-white border border-gray-300 rounded-lg text-gray-700 font-medium focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm"
                          value={sellToken}
                          onChange={(e) => setSellToken(e.target.value)}
                        >
                          <option value="USDT">USDT</option>
                          <option value="USDC">USDC</option>
                          <option value="TRX">TRX</option>
                          <option value="POL">POL</option>
                          <option value="XRP">XRP</option>
                          <option value="ADA">ADA</option>
                          <option value="ARB">ARB</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-center mb-3">
                    <div className="bg-teal-100 rounded-full p-2">
                      <svg
                        className="w-4 sm:w-5 h-4 sm:h-5 text-teal-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 14l-7 7m0 0l-7-7m7 7V3"
                        />
                      </svg>
                    </div>
                  </div>

                  <div className="mb-3">
                    <label className="block text-gray-700 font-medium mb-1 text-sm">
                      To
                    </label>
                    <div className="bg-gray-50 rounded-lg p-2 sm:p-3">
                      <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3">
                        <input
                          type="text"
                          className="w-full sm:flex-1 bg-transparent text-lg sm:text-xl font-semibold text-gray-800 outline-none text-center sm:text-left"
                          value={
                            isCalculating
                              ? "Calculating..."
                              : equivalentJMC.toFixed(4)
                          }
                          readOnly
                        />
                        <span className="px-3 py-1.5 bg-teal-100 text-teal-700 rounded-lg font-medium text-sm">
                          JMC
                        </span>
                      </div>
                    </div>
                  </div>

                  {equivalentJMC > 0 && (
                    <div className="bg-teal-50 border border-teal-200 rounded-lg p-2">
                      <div className="flex flex-col sm:flex-row justify-between items-center text-xs sm:text-sm gap-1">
                        <span className="text-teal-600">Exchange Rate</span>
                        <strong className="text-gray-800">
                          1 {sellToken} ={" "}
                          {(
                            equivalentJMC / parseFloat(sellAmount || 1)
                          ).toFixed(4)}{" "}
                          JMC
                        </strong>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>

            <div className="bg-gray-50 px-4 sm:px-6 py-2 sm:py-3 rounded-b-xl flex flex-col sm:flex-row justify-end gap-2 sm:gap-3">
              {!swapMessage ? (
                <>
                  <button
                    onClick={() => {
                      setShowSwapModal(false);
                      setSwapMessage("");
                    }}
                    className="w-full sm:w-auto px-4 py-1.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors text-sm"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleCryptoSwap}
                    disabled={
                      isSwapProcessing ||
                      !sellAmount ||
                      parseFloat(sellAmount) === 0
                    }
                    className="w-full sm:w-auto px-4 py-1.5 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm"
                  >
                    {isSwapProcessing ? (
                      <>
                        <svg
                          className="animate-spin h-4 w-4"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Swapping...
                      </>
                    ) : (
                      <>
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
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        Confirm Swap
                      </>
                    )}
                  </button>
                </>
              ) : (
                <button
                  onClick={() => {
                    setShowSwapModal(false);
                    setSwapMessage("");
                  }}
                  className="w-full sm:w-auto px-4 py-1.5 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors text-sm"
                >
                  Close
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {showBinanceExchange && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-2 sm:p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full mx-auto">
            <div className="bg-teal-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-t-xl">
              <div className="flex items-center justify-between">
                <button
                  onClick={() => {
                    setShowBinanceExchange(false);
                  }}
                  className="text-white hover:text-gray-200 transition-colors p-1"
                >
                  <svg
                    className="w-5 sm:w-6 h-5 sm:h-6"
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
            <BinanceExchange />
          </div>
        </div>
      )}
    </>
  );
};

export default UserDetailsComponent;
