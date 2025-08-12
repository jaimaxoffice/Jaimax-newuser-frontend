import React, { useState, useEffect } from "react";
import {
  useGetUserDetailsMutation,
  useExchangeInrToCryptoMutation,
  useExchangeCryptoMutation,
  useAwardJmcToUserMutation,
} from "./jwalletApiSlice";
import abi from "./usdt.json";
// import { useUserDataQuery } from "../dashBoard/DashboardApliSlice.js";
import icon from "../../../../assets/Images/jaicoin.svg";
import { ethers } from "ethers";
import usdtJSON from "./usdt.json";
import ConnectWallet from "./ConnectWallet.jsx";
import { useWalletClient, useAccount } from "wagmi";
import BinanceExchange from "./BinanceExchnage.jsx";
import Cookies from "js-cookie";
import CreateWalletPin, {
  ForgotPinModal,
  ChangePinModal,
  PinEntryModal,
} from "./mpiPin.jsx";
import {
  useProceedOrderMutation,
  useAddOrderMutation,
  useUserDataQuery,
  useCreatePaymentMutation,
} from "../dashBoard/DashboardApliSlice.js";
import testnetUSDTJSON from "./testnetUSDT.json";
import { toast } from "react-toastify";
const UserDetailsComponent = () => {
  const [swapMessage, setSwapMessage] = useState("");
  const [showBuyModal, setShowBuyModal] = useState(false);
  const [showSwapModal, setShowSwapModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showBinanceExchange, setShowBinanceExchange] = useState(false);
  const [buyAmount, setBuyAmount] = useState("");
  const [selectedToken, setSelectedToken] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [isProceedingOrder, setIsProceedingOrder] = useState(false);
  const [isCompletingPurchase, setIsCompletingPurchase] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [purchaseCoinsBreakup, setPurchaseCoinsBreakup] = useState({});
  const [paymentMethod, setPaymentMethod] = useState("");
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
  const [showPurchaseCoinsModal, setShowPurchaseCoinsModal] = useState(false);
  const [proceedOrder] = useProceedOrderMutation();
  const [createPayment] = useCreatePaymentMutation();
  const [getUserDetails, { data, isLoading, error }] =
    useGetUserDetailsMutation();
  const [exchangeInrToCrypto, { isLoad, isError, isSuccess, err }] =
    useExchangeInrToCryptoMutation();
  const [exchangeCrypto] = useExchangeCryptoMutation();
  const [addOrder] = useAddOrderMutation();
  const [awardJmcToUser, { isLoading: isAwarding }] =
    useAwardJmcToUserMutation();
  const HARDCODED = Cookies.get("userData");
  const parsedUserData = HARDCODED ? JSON.parse(HARDCODED) : null;
  const HARDCODED_USER_ID = parsedUserData?._id;
  // console.log(HARDCODED_USER_ID);
  const { data: walletClient } = useWalletClient();
  const tkn = Cookies.get("token");
  const id = sessionStorage.setItem("tkn", tkn);
  const token = sessionStorage.getItem("tkn");
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

  const onProceedOrder = async (e) => {
    e?.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");
    const amountInInr = Number(buyAmount);

    if (!Number.isFinite(amountInInr) || amountInInr <= 0) {
      setErrorMessage("Please enter a valid amount");
      return;
    }

    const walletInr = Number(data?.data?.Inr ?? 0);
    if (amountInInr > walletInr) {
      setErrorMessage("Amount exceeds wallet balance");
      return;
    }

    setIsProceedingOrder(true);
    try {
      const res = await proceedOrder({
        amount: amountInInr,
        currency: "INR",
      }).unwrap();

      if (res.status_code !== 200)
        throw new Error(res?.message || "Unexpected response");

      if (!res?.data?.shortageResolved) {
        setErrorMessage("Insufficient coins available in ICO rounds");
        return;
      }

      // Trust server values only
      // In your onProceedOrder function
      setPurchaseCoinsBreakup({
        quoteId: res.data.quoteId,
        pricePerJmcInInr: res.data.pricePerJmcInInr,
        totalCoins: res.data.totalCoins,
        totalAmount: res.data.totalAmount || amountInInr, // Fallback to original amount
        shortageResolution: res.data.shortageData,
        expiresAt: res.data.expiresAt,
      });

      setShowBuyModal(false);
      setShowPurchaseCoinsModal(true);
    } catch (err) {
      setPurchaseCoinsBreakup({});
      setErrorMessage(
        err?.data?.message ||
          err?.message ||
          "Transaction failed. Please try again."
      );
      console.error(err);
    } finally {
      setIsProceedingOrder(false);
    }
  };

  // Second step - Complete the purchase with payment method
  const onSubmitBuy = async (e) => {
    console.log("entering the function");
    e.preventDefault();
    setFormErrors({});

    // Validate inputs
    if (!HARDCODED_USER_ID) {
      return setFormErrors({ user: "Missing user id" });
    }
    console.log("hardded is console");
    console.log(HARDCODED_USER_ID);
    if (!paymentMethod) {
      return setFormErrors({ paymentMethod: "Select a payment method" });
    }
    console.log(paymentMethod);
    console.log(purchaseCoinsBreakup, "hello");

    setIsCompletingPurchase(true);
    setErrorMessage("");

    try {
      // Determine the amount to use (with fallbacks)
      let amount = Number(buyAmount);
      if (purchaseCoinsBreakup.totalAmount) {
        amount = Number(purchaseCoinsBreakup.totalAmount);
      }
      console.log("gello submit");
      const payload = {
        currency: "INR",
        paymentMethod: paymentMethod,
        amount: amount,
        id:HARDCODED_USER_ID
      };


      console.log("Submitting order with payload:", payload);

      const response = await addOrder(payload).unwrap();

      if (response.status_code === 200) {
        toast.success(response?.message || "Purchase successful", {
          position: "top-center",
        });
        console.log(response, "response");
        setShowPurchaseCoinsModal(false);
        // setBuyAmount("");
        // setPurchaseCoinsBreakup({});

        // Refresh data
        refetch();
        // handleGetUserDetails();
      }
    } catch (error) {
      console.error("Order submission error:", error);
      const errorMessage = error?.data?.message || "An error occurred";
      console.log(error.data.message);
      toast.dismiss();
      toast.error(errorMessage, { position: "top-center" });
      setErrorMessage(errorMessage);
    } finally {
      setIsCompletingPurchase(false);
    }
  };
  const onSubmitPayment = async (method) => {
    setLoading(true);
    const payload = {
      amount: amount,
      currency: currency,
      paymentMethod: method,
      id: userDataTopassid,
    };

    try {
      const response = await addOrder(payload).unwrap();
      if (response.status_code === 200) {
        setIsAddOrderError("");
        toast.success(`${response?.message}`, {
          position: "top-center",
        });
        handleCloseModal();

        if (method === "cashFree") {
          await handleCreatePayment(response?.data?._id);
        } else if (method === "paypal") {
          await handleCreatePaypalPayment(response?.data?._id);
        } else {
          setAmount("");
          refetchUserData();
          refetchRounds();
          navigate("/buy-history");
        }
      }
    } catch (error) {
      setIsAddOrderError(error?.data?.message || "Payment failed");
    } finally {
      setLoading(false);
    }
  };
  const handleCreatePayment = async (orderId) => {
    try {
      const payload = { order_id: orderId };
      const res = await createPayment(payload).unwrap();
      const paymentSessionId = res?.data?.payment_session_id;

      // Initialize payment gateway here
      toast.info("Redirecting to payment gateway...", {
        position: "top-center",
      });

      // Add your payment gateway integration here
      // doPayment(paymentSessionId);
    } catch (error) {
      // console.error(error);
      toast.error(`${error?.data?.message}`, {
        position: "top-center",
      });
    } finally {
      refetchUserData();
    }
  };
  const closePurchaseModal = () => {
    setShowPurchaseCoinsModal(false);
    setFormErrors({});
    setPurchaseCoinsBreakup({});
  };
  const handleGetUserDetails = async (id = null) => {
    const targetUserId = id || HARDCODED_USER_ID;

    try {
      await getUserDetails({ userId: targetUserId }).unwrap();
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
  const testnetContractAddress = "0x337610d27c682E347C9cD60BD4b3b107C9d34dDd"; // Testnet USDT address
  const contractAddress = "0x55d398326f99059fF775485246999027B3197955"; //Mainnet USDT address (BSC)
  const handleCryptoSwap = async () => {
    console.log("hello");
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
      // const contract = new ethers.Contract(contractAddress, abi.abi, signer); // Mainnet USDT contract
      const contract = new ethers.Contract(
        testnetContractAddress,
        testnetUSDTJSON.abi,
        signer
      ); // Testnet USDT contract

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
          swapType: "swap",
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




  return (
    <>
      {showPinModal && (
        <div className="fixed inset-0 backdrop-blur-sm bg-teal-900/30 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white/90 backdrop-blur-md rounded-xl shadow-2xl max-w-md w-full my-4 p-4 border border-teal-100/50 animate-fadeIn max-h-[90vh] overflow-y-auto">
            <div className="max-h-full">
              <CreateWalletPin />
              <div className="flex justify-end mt-4 sticky bottom-0 bg-white/80 backdrop-blur-sm py-2">
                <button
                  onClick={() => setShowPinModal(false)}
                  className="px-4 py-2 text-sm text-teal-600 hover:text-teal-800 border border-teal-200 rounded-lg transition-all hover:bg-teal-50/50"
                >
                  Close
                </button>
              </div>
            </div>
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
        <div className="min-h-screen bg-gradient-to-b from-white to-teal-50">
          <div className="container mx-auto px-4 py-8">
            {/* Header Section */}
            <div className="mb-8">
              <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                <div className="animate-fadeIn">
                  <div className="inline-block bg-teal-500/10 px-4 py-1.5 rounded-full mb-2">
                    <p className="text-teal-600 text-sm font-medium">
                      Cryptocurrency Wallet
                    </p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 animate-slideIn">
                  <button
                    onClick={() => setShowBuyModal(true)}
                    className="group flex items-center gap-2 px-4 py-2 bg-teal-500 text-white rounded-full hover:bg-teal-600 transform hover:-translate-y-1 transition-all duration-300 shadow-md hover:shadow-lg"
                  >
                    <svg
                      className="w-4 h-4 group-hover:rotate-90 transition-transform duration-200"
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
                    <span className="font-medium text-sm">Buy Tokens</span>
                  </button>
                  <button
                    onClick={() => setShowSwapModal(true)}
                    className="group flex items-center gap-2 px-4 py-2 bg-white text-teal-500 rounded-full hover:bg-teal-50 transform hover:-translate-y-1 transition-all duration-300 shadow-md hover:shadow-lg border border-teal-200"
                  >
                    <svg
                      className="w-4 h-4 group-hover:rotate-180 transition-transform duration-300"
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
                    <span className="font-medium text-sm">Swap</span>
                  </button>
                  <button
                    onClick={() => setShowBinanceExchange(true)}
                    className="group flex items-center gap-2 px-4 py-2 bg-white text-teal-500 rounded-full hover:bg-teal-50 transform hover:-translate-y-1 transition-all duration-300 shadow-md hover:shadow-lg border border-teal-200"
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
                        d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                      />
                    </svg>
                    <span className="font-medium text-sm">Binance</span>
                  </button>
                </div>
              </div>
            </div>

            {data?.success && !isLoading && (
              <div className="animate-fadeIn space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                  {/* Wallet Address Card */}
                  <div className="bg-white rounded-2xl shadow-md p-5 hover:shadow-lg transition-all duration-300 border border-teal-100">
                    <div>
                      <label className="text-teal-600 text-sm font-semibold mb-2 block flex items-center gap-2">
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
                          className="flex-1 px-3 py-2 bg-white text-gray-700 rounded-l-lg text-sm border border-gray-200 focus:border-teal-500 focus:outline-none transition-colors"
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
                          className="px-3 py-2 bg-teal-500 text-white rounded-r-lg hover:bg-teal-600 transition-all duration-200 group-hover:shadow-lg"
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
                  <div className="bg-gradient-to-br from-teal-500 to-teal-600 rounded-2xl shadow-md p-5 hover:shadow-lg transition-all duration-300 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -mr-10 -mt-10"></div>
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-white opacity-10 rounded-full -ml-10 -mb-10"></div>
                    <div className="flex items-center justify-between relative z-10">
                      <div>
                        <h6 className="text-white text-sm font-semibold mb-1 flex items-center gap-2">
                          Token Balance
                        </h6>
                        <h3 className="text-2xl md:text-3xl font-bold text-white">
                          {(data?.data?.tokens)}
                        </h3>
                      </div>
                      <div className="relative">
                        <img
                          src={icon}
                          alt="JMC"
                          className="w-12 h-12 md:w-14 md:h-14 animate-float"
                        />
                        <div className="absolute inset-0 bg-white opacity-20 rounded-full blur-xl"></div>
                      </div>
                    </div>
                  </div>

                  {/* INR Balance Card */}
                  <div className="bg-white rounded-2xl shadow-md p-5 hover:shadow-lg transition-all duration-300 border border-teal-100 relative overflow-hidden md:col-span-2 xl:col-span-1">
                    <div className="absolute inset-0 bg-teal-500 opacity-5"></div>
                    <div className="relative z-10">
                      <div className="flex items-center justify-between">
                        <div>
                          <h6 className="text-teal-600 text-sm font-semibold mb-1 flex items-center gap-2">
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
                          <h3 className="text-2xl md:text-3xl font-bold text-gray-800">
                            ₹{userData?.data.walletBalance}
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
                <div className="bg-white rounded-2xl shadow-md overflow-hidden border border-teal-100">
                  <div className="px-6 py-4 border-b border-teal-100">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                      <h5 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                        <svg
                          className="w-5 h-5 text-teal-500"
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
                      <span className="px-3 py-1 bg-teal-100 text-teal-600 rounded-full text-sm font-semibold">
                        {transactions.length} transactions
                      </span>
                    </div>
                  </div>

                  <div className="overflow-x-auto">
                    {transactions.length === 0 ? (
                      <div className="text-center py-16 px-4">
                        <div className="relative inline-block">
                          <div className="w-16 h-16 mx-auto rounded-full bg-teal-50 flex items-center justify-center mb-4">
                            <svg
                              className="w-8 h-8 text-teal-400"
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
                          <thead className="bg-teal-50">
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
                                  className="px-4 py-3 text-left text-xs font-semibold text-teal-700 uppercase tracking-wider"
                                >
                                  {header}
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-teal-50 bg-white">
                            {transactions.map((transaction, index) => (
                              <React.Fragment key={transaction.id}>
                                <tr className="hover:bg-teal-50/50 transition-colors duration-150">
                                  <td className="px-4 py-3 whitespace-nowrap">
                                    <span
                                      className={`px-2 py-1 text-xs rounded-full font-semibold ${
                                        transaction.type === "buy"
                                          ? "bg-teal-100 text-teal-600"
                                          : "bg-teal-100 text-teal-600"
                                      }`}
                                    >
                                      {transaction.type}
                                    </span>
                                  </td>
                                  <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-700">
                                    {transaction.tokenName}
                                  </td>
                                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
                                    ₹{transaction.amount}
                                  </td>
                                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
                                    {(
                                      parseFloat(
                                        transaction.receivedAmount ||
                                          transaction.tokensReceived
                                      ) || 0
                                    ).toFixed(4)}{" "}
                                    JMC
                                  </td>
                                  <td className="px-4 py-3 whitespace-nowrap">
                                    <span
                                      className={`px-2 py-1 text-xs rounded-full font-semibold ${
                                        transaction.status === "success"
                                          ? "bg-green-100 text-green-600"
                                          : "bg-red-100 text-red-600"
                                      }`}
                                    >
                                      {transaction.status}
                                    </span>
                                  </td>
                                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
                                    {(transaction.timestamp)}
                                  </td>
                                  <td className="px-4 py-3 whitespace-nowrap text-sm">
                                    <button
                                      className="text-teal-500 hover:text-teal-600 transition-colors duration-150"
                                      onClick={() => {
                                        const detailsRow =
                                          document.getElementById(
                                            `details-${transaction.id}`
                                          );
                                        detailsRow.classList.toggle("hidden");
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
                                  className="hidden bg-teal-50/50"
                                >
                                  <td colSpan="7" className="px-4 py-4">
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                                      <div className="bg-white rounded-lg p-3 shadow-sm border border-teal-100">
                                        <strong className="text-teal-600 block mb-1">
                                          Transaction Hash:
                                        </strong>
                                        <p className="text-gray-700 font-mono text-xs break-all">
                                          {transaction.hash}
                                        </p>
                                      </div>
                                      <div className="bg-white rounded-lg p-3 shadow-sm border border-teal-100">
                                        <strong className="text-teal-600 block mb-1">
                                          Block Number:
                                        </strong>
                                        <p className="text-gray-700 font-semibold">
                                          {transaction.blockNumber}
                                        </p>
                                      </div>
                                      <div className="bg-white rounded-lg p-3 shadow-sm border border-teal-100">
                                        <strong className="text-teal-600 block mb-1">
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
      )}

      {showBuyModal && (
        <div className="fixed inset-0 bg-teal-900/40 backdrop-blur-sm flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full my-2 animate-fadeIn">
            <div className="bg-gradient-to-r from-teal-500 to-teal-600 text-white px-5 py-4 rounded-t-xl">
              <div className="flex items-center justify-between">
                <h5 className="text-lg font-semibold">Buy JMC Tokens</h5>
                <button
                  onClick={() => setShowBuyModal(false)}
                  className="text-white hover:text-gray-200 transition-colors"
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
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>

            <div className="p-5">
              {/* Success message display */}
              {successMessage && (
                <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-lg">
                  <p className="flex items-center">
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
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    {successMessage}
                  </p>
                </div>
              )}

              {/* Error message display */}
              {errorMessage && (
                <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
                  <p className="flex items-center">
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
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                      />
                    </svg>
                    {errorMessage}
                  </p>
                </div>
              )}

              <div className="bg-teal-50 border border-teal-200 rounded-lg p-4 mb-5">
                <h6 className="flex items-center text-teal-700 font-semibold mb-3 text-sm">
                  <svg
                    className="w-4 h-4 mr-2"
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
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex items-center">
                    <span className="text-teal-600 mr-2">₹</span>
                    <div>
                      <small className="text-teal-600 block text-xs">
                        INR Price
                      </small>
                      <strong className="text-gray-800 text-sm">₹0.022</strong>{" "}
                      per JMC
                    </div>
                  </div>
                  <div className="flex items-center">
                    <span className="text-teal-600 mr-2">$</span>
                    <div>
                      <small className="text-teal-600 block text-xs">
                        USD Price
                      </small>
                      <strong className="text-gray-800 text-sm">$0.0026</strong>{" "}
                      per JMC
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-5">
                <label className="block text-gray-700 font-medium mb-2 text-sm">
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
                <h6 className="flex items-center text-gray-800 font-semibold mb-3 text-sm">
                  <svg
                    className="w-4 h-4 mr-2 text-teal-600"
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
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <small className="text-teal-600 block mb-1 text-xs">
                      You Pay
                    </small>
                    <h5 className="text-lg font-bold text-gray-800">
                      ₹{buyAmount || "0"}
                    </h5>
                  </div>
                  <div className="text-right">
                    <small className="text-teal-600 block mb-1 text-xs">
                      You Receive
                    </small>
                    <h5 className="text-lg font-bold text-gray-800">
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
                    ₹{userData?.data.walletBalance || "0"}
                  </strong>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 px-5 py-4 rounded-b-xl flex justify-end gap-3">
              <button
                onClick={() => setShowBuyModal(false)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors text-sm"
              >
                Cancel
              </button>
              <button
                onClick={onProceedOrder}
                disabled={
                  isProceedingOrder ||
                  !buyAmount ||
                  !Number.isFinite(Number(buyAmount)) ||
                  Number(buyAmount) <= 0
                }
                className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 text-sm"
              >
                {isProceedingOrder ? (
                  <>
                    <svg
                      className="animate-spin h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      ...
                    </svg>
                    Processing...
                  </>
                ) : (
                  <>
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      ...
                    </svg>
                    Confirm Purchase
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
      {showPurchaseCoinsModal && (
        <div className="fixed inset-0 bg-teal-900/40 backdrop-blur-sm flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full my-2 animate-fadeIn">
            <div className="bg-gradient-to-r from-teal-500 to-teal-600 text-white px-5 py-4 rounded-t-xl">
              <div className="flex items-center justify-between">
                <h5 className="text-lg font-semibold">Complete Purchase</h5>
                <button
                  onClick={closePurchaseModal}
                  className="text-white hover:text-gray-200 transition-colors"
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
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>

            <form onSubmit={onSubmitBuy} noValidate>
              <div className="p-5 space-y-4">
                {/* Error and success messages */}
                {formErrors.quote && (
                  <div className="p-3 rounded bg-red-100 text-red-700 text-sm">
                    {formErrors.quote}
                  </div>
                )}
                {formErrors.user && (
                  <div className="p-3 rounded bg-red-100 text-red-700 text-sm">
                    {formErrors.user}
                  </div>
                )}
                {formErrors.paymentMethod && (
                  <div className="p-3 rounded bg-red-100 text-red-700 text-sm">
                    {formErrors.paymentMethod}
                  </div>
                )}
                {errorMessage && (
                  <div className="p-3 rounded bg-red-100 text-red-700 text-sm">
                    {errorMessage}
                  </div>
                )}
                {successMessage && (
                  <div className="p-3 rounded bg-green-100 text-green-700 text-sm">
                    {successMessage}
                  </div>
                )}

                <div className="bg-teal-50 border border-teal-200 rounded-lg p-3 text-sm">
                  <div className="flex justify-between">
                    <span>Amount</span>
                    <strong>₹{purchaseCoinsBreakup?.totalAmount}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Coins</span>
                    <strong>{purchaseCoinsBreakup?.totalCoins} JMC</strong>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Payment method
                  </label>
                  <div className="flex flex-wrap gap-3">
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="wallet"
                        checked={paymentMethod === "wallet"}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                      />
                      <span>Wallet</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="UPI"
                        checked={paymentMethod === "UPI"}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                      />
                      <span>UPI</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="CARD"
                        checked={paymentMethod === "CARD"}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                      />
                      <span>Card</span>
                    </label>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 px-5 py-4 rounded-b-xl flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowPurchaseCoinsModal(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 text-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  onClick={onSubmitBuy}
                  disabled={isCompletingPurchase}
                  className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 disabled:opacity-50 text-sm"
                >
                  {isCompletingPurchase ? "Processing..." : "Pay & Complete"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showSwapModal && (
        <div className="fixed inset-0 bg-teal-900/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full animate-fadeIn">
            <div className="bg-gradient-to-r from-teal-500 to-teal-600 text-white px-5 py-4 rounded-t-xl">
              <div className="flex items-center justify-between">
                <h5 className="text-lg font-semibold flex items-center">
                  <svg
                    className="w-4 h-4 mr-2"
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
                  className="text-white hover:text-gray-200 transition-colors"
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
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>
            <ConnectWallet />
            <div className="p-5">
              {swapMessage && (
                <div
                  className={`rounded-lg p-3 mb-3 text-center text-sm font-medium ${
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
                  <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-1 text-sm">
                      From
                    </label>
                    <div className="bg-teal-50 rounded-lg p-3">
                      <div className="flex flex-col sm:flex-row justify-center gap-2">
                        <input
                          type="number"
                          className="w-full sm:flex-1 bg-transparent text-lg font-semibold text-gray-800 outline-none text-center sm:text-left"
                          value={sellAmount}
                          onChange={(e) => setSellAmount(e.target.value)}
                          placeholder="0.00"
                        />
                        <select
                          className="w-full sm:w-auto px-3 py-1.5 bg-white border border-teal-200 rounded-lg text-gray-700 font-medium focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm"
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

                  <div className="flex justify-center mb-4">
                    <div className="bg-teal-100 rounded-full p-2">
                      <svg
                        className="w-4 h-4 text-teal-600"
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

                  <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-1 text-sm">
                      To
                    </label>
                    <div className="bg-teal-50 rounded-lg p-3">
                      <div className="flex flex-col sm:flex-row items-center gap-2">
                        <input
                          type="text"
                          className="w-full sm:flex-1 bg-transparent text-lg font-semibold text-gray-800 outline-none text-center sm:text-left"
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
                    <div className="bg-teal-50 border border-teal-200 rounded-lg p-3">
                      <div className="flex flex-col sm:flex-row justify-between items-center text-xs gap-1">
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

            <div className="bg-gray-50 px-5 py-4 rounded-b-xl flex flex-col sm:flex-row justify-end gap-2">
              {!swapMessage ? (
                <>
                  <button
                    onClick={() => {
                      setShowSwapModal(false);
                      setSwapMessage("");
                    }}
                    className="w-full sm:w-auto px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors text-sm"
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
                    className="w-full sm:w-auto px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm"
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
                  className="w-full sm:w-auto px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors text-sm"
                >
                  Close
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {showBinanceExchange && (
        <div className="fixed inset-0 bg-teal-900/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full animate-fadeIn">
            <div className="bg-gradient-to-r from-teal-500 to-teal-600 text-white px-5 py-4 rounded-t-xl">
              <div className="flex items-center justify-between">
                <h5 className="text-lg font-semibold">Binance Exchange</h5>
                <button
                  onClick={() => {
                    setShowBinanceExchange(false);
                  }}
                  className="text-white hover:text-gray-200 transition-colors"
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
