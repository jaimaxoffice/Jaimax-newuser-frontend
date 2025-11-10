import React, { useState, useEffect, useReducer, useMemo } from "react";
import {
  useGetUserDetailsMutation,
  useExchangeInrToCryptoMutation,
  useExchangeCryptoMutation,
  useAwardJmcToUserMutation,
} from "./jwalletApiSlice";
import icon from "../../../../assets/Images/jaicoin.svg";
import { ethers } from "ethers";
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
  useGetRoundQuery,
} from "../dashBoard/DashboardApliSlice.js";
import adaJSON from "./ada.json";
import xrpjson from "./xrp.json";
import USDTJSON from "./usdt.json";
import trxJSON from "./trx.json";
import USDCJSON from "./usdc.json";
import { useBuyDetailsQuery } from "../buyHistory/buyHistoryApiSlice.js";
import { ToastContainer, toast } from "react-toastify";
import Loader from "../../../../ReusableComponents/Loader/loader";
import { useNavigate } from "react-router-dom";
import icon2 from "../../../../assets/whitejaimaxlogo.webp";
import "./jwallet.css";

// Swap state reducer for better state management
const initialSwapState = {
  sellAmount: "",
  sellToken: "USDT",
  swapMessage: "",
  isCalculating: false,
  isProcessing: false,
  feeDetails: null,
};

function swapReducer(state, action) {
  switch (action.type) {
    case "SET_AMOUNT":
      return { ...state, sellAmount: action.payload };
    case "SET_TOKEN":
      return { ...state, sellToken: action.payload };
    case "SET_MESSAGE":
      return { ...state, swapMessage: action.payload };
    case "SET_CALCULATING":
      return { ...state, isCalculating: action.payload };
    case "SET_PROCESSING":
      return { ...state, isProcessing: action.payload };
    case "SET_FEE_DETAILS":
      return { ...state, feeDetails: action.payload };
    case "RESET":
      return initialSwapState;
    default:
      return state;
  }
}

// Modal state reducer
const initialModalState = {
  buyModal: false,
  swapModal: false,
  binanceExchange: false,
  pinModal: false,
  pinEntry: false,
  forgotPinModal: false,
  changePinModal: false,
  purchaseCoinsModal: false,
};

function modalReducer(state, action) {
  switch (action.type) {
    case "OPEN":
      return { ...state, [action.modal]: true };
    case "CLOSE":
      return { ...state, [action.modal]: false };
    case "CLOSE_ALL":
      return initialModalState;
    default:
      return state;
  }
}

const UserDetailsComponent = () => {
  const navigate = useNavigate();

  // Use reducers for complex state management
  const [swapState, dispatchSwap] = useReducer(swapReducer, initialSwapState);
  const [modals, dispatchModal] = useReducer(modalReducer, initialModalState);

  // Core state variables
  const [awardJmcToUserPayload, setAwardJmcToUserPayload] = useState({});
  const [calculateMessage, setCalculateMessage] = useState("");
  const [sessionChecked, setSessionChecked] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [buyAmount, setBuyAmount] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const [isProceedingOrder, setIsProceedingOrder] = useState(false);
  const [isCompletingPurchase, setIsCompletingPurchase] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [purchaseCoinsBreakup, setPurchaseCoinsBreakup] = useState({});
  const [paymentMethod, setPaymentMethod] = useState("");
  const [isPinVerified, setIsPinVerified] = useState(false);
  const [isTokenVerified, setIsTokenVerified] = useState(false);
  const contractAddress = "0x90e18b768C5eCC93B73525ab973aBd1592Df3aB2"; // Test address
  // Mutations and queries with loading states
  const [proceedOrder] = useProceedOrderMutation();
  const [createPayment] = useCreatePaymentMutation();
  // const [getUserDetails, { data, isLoading, error }] =
  //   useGetUserDetailsMutation();
  const [exchangeInrToCrypto, { isLoading: isExchangeLoading }] =
    useExchangeInrToCryptoMutation();
  const [exchangeCrypto] = useExchangeCryptoMutation();
  const [addOrder, { isLoading: isAddOrderLoading }] = useAddOrderMutation();
  const [awardJmcToUser, { isLoading: isAwarding }] =
    useAwardJmcToUserMutation();

  // User data and setup
  const HARDCODED = Cookies.get("userData");
  const parsedUserData = HARDCODED ? JSON.parse(HARDCODED) : null;
  const HARDCODED_USER_ID = parsedUserData?._id;
  const { data: walletClient } = useWalletClient();
  const tkn = Cookies.get("token");
  const id = sessionStorage.setItem("tkn", tkn);
  const token = sessionStorage.getItem("tkn");
  const { data: roundsData, isloading } = useGetRoundQuery();
  const liveRounds =
    roundsData?.data?.rounds?.filter((round) => round.status === 1) || [];
  const {
    data: userData,
    refetch,
    isLoading: isUserDataLoading,
  } = useUserDataQuery(undefined, {
    skip: !isTokenVerified,
  });
  // Determine if any loading state is active
  const isPageLoading =
    isUserDataLoading || isAwarding || isExchangeLoading || isAddOrderLoading;

  // Token configuration
  const TOKEN_CONFIG = {
    USDT: {
      address: "0x55d398326f99059fF775485246999027B3197955",
      abi: USDTJSON.abi,
    },
    USDC: {
      address: "0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d",
      abi: USDCJSON.abi,
    },
    TRX: {
      address: "0xCE7de646e7208a4Ef112cb6ed5038FA6cC6b12e3",
      abi: trxJSON.abi,
    },
    XRP: {
      address: "0x1D2F0da169ceB9fC7B3144628dB156f3F6c60dBE",
      abi: xrpjson.abi,
    },
    ADA: {
      address: "0x3EE2200Efb3400fAbB9AacF31297cBdD1d435D47",
      abi: adaJSON.abi,
    },
  };

  // Make setShowBinanceExchange available globally for BinanceExchange component
  window.setShowBinanceExchange = (value) => {
    dispatchModal({ type: value ? "OPEN" : "CLOSE", modal: "binanceExchange" });
  };

  useEffect(() => {
    const handleCompletion = () => {
      // console.log("Custom event received, closing modal");
      dispatchModal({ type: "CLOSE", modal: "binanceExchange" });
    };

    document.addEventListener("binanceExchangeCompleted", handleCompletion);

    return () => {
      document.removeEventListener(
        "binanceExchangeCompleted",
        handleCompletion
      );
    };
  }, []);

  useEffect(() => {
    const verifyToken = async () => {
      if (!token) {
        return;
      }
      setIsTokenVerified(true);
    };
    verifyToken();
  }, [token]);

  useEffect(() => {
    const storedData = sessionStorage.getItem("isPinVerified");
    if (storedData) {
      const { value, timestamp } = JSON.parse(storedData);
      const now = Date.now();
      const diff = now - timestamp;

      if (value === "true" && diff < 7 * 60 * 1000) {
        setIsPinVerified(true);
        dispatchModal({ type: "CLOSE", modal: "pinEntry" });

        // Auto-expire after remaining time
        const timeout = setTimeout(() => {
          sessionStorage.removeItem("isPinVerified");
          setIsPinVerified(false);
          dispatchModal({ type: "OPEN", modal: "pinEntry" });
        }, 7 * 60 * 1000 - diff);

        return () => clearTimeout(timeout);
      } else {
        // Expired -> clear storage
        sessionStorage.removeItem("isPinVerified");
        setIsPinVerified(false);
        dispatchModal({ type: "OPEN", modal: "pinEntry" });
      }
    }

    setSessionChecked(true); // Finished checking
  }, []);

  useEffect(() => {
    if (userData && userData.data && sessionChecked) {
      if (!userData.data.pin) {
        // User hasn't created a PIN yet
        dispatchModal({ type: "OPEN", modal: "pinModal" });
        dispatchModal({ type: "CLOSE", modal: "pinEntry" });
        setIsPinVerified(false);
      } else {
        const pinVerified = sessionStorage.getItem("isPinVerified");
        if (pinVerified !== "true") {
          dispatchModal({ type: "CLOSE", modal: "pinModal" });
          dispatchModal({ type: "OPEN", modal: "pinEntry" });
          setIsPinVerified(false);
        }
      }
    }
  }, [userData, sessionChecked]);

  const calculateEquivalentJMC = async () => {
    if (
      !swapState.sellAmount ||
      !swapState.sellToken ||
      parseFloat(swapState.sellAmount) === 0
    ) {
      dispatchSwap({
        type: "SET_MESSAGE",
        payload: "Please enter a valid amount to swap.",
      });
      toast.error("Please enter a valid amount to swap.");
      return;
    }

    dispatchSwap({ type: "SET_CALCULATING", payload: true });
    dispatchSwap({ type: "SET_MESSAGE", payload: "" });

    try {
      const result = await exchangeCrypto({
        userId: HARDCODED_USER_ID,
        tokenName: swapState.sellToken,
        tokensSent: parseFloat(swapState.sellAmount),
      }).unwrap();

      if (result.success === 1) {
        setAwardJmcToUserPayload(result?.data);
        dispatchSwap({
          type: "SET_FEE_DETAILS",
          payload: {
            grossInrValue: result?.data?.grossInrValue,
            platformFee: result?.data?.platformFee,
            bscTds: result?.data?.bscTds,
            netInrAfterFees: result?.data?.netInrAfterFees,
            jmcTds: result?.data?.jmcTds,
            finalInrAfterTds: result?.data?.finalInrAfterTds,
            equivalentJmc: result?.data?.equivalentJmc,
          },
        });
      }
    } catch (err) {
      // console.error("Failed to calculate equivalent JMC:", err);
      const errorMessage =
        err?.data?.message || err?.error || "Something went wrong ❌";
      dispatchSwap({ type: "SET_MESSAGE", payload: errorMessage });
      toast.error(errorMessage);
    } finally {
      dispatchSwap({ type: "SET_CALCULATING", payload: false });
    }
  };

  // Handle crypto swap with improved error handling
  const handleCryptoSwap = async () => {
    if (
      !swapState.sellAmount ||
      !swapState.sellToken ||
      parseFloat(swapState.sellAmount) === 0
    ) {
      dispatchSwap({
        type: "SET_MESSAGE",
        payload: "Please enter amount to swap",
      });
      return;
    }

    dispatchSwap({ type: "SET_PROCESSING", payload: true });
    dispatchSwap({ type: "SET_MESSAGE", payload: "" });

    try {
      if (!walletClient) {
        dispatchSwap({
          type: "SET_MESSAGE",
          payload: "Please connect your wallet",
        });
        dispatchSwap({ type: "SET_PROCESSING", payload: false });
        return;
      }

      // Token contract selection logic
      const tokenInfo = TOKEN_CONFIG[swapState.sellToken];
      if (!tokenInfo) {
        dispatchSwap({
          type: "SET_MESSAGE",
          payload: "Unsupported token selected",
        });
        dispatchSwap({ type: "SET_PROCESSING", payload: false });
        return;
      }

      const provider = new ethers.BrowserProvider(walletClient.transport);
      const signer = await provider.getSigner();
      const userAddress = await signer.getAddress();

      const contract = new ethers.Contract(
        tokenInfo.address,
        tokenInfo.abi,
        signer
      );

      const decimals = await contract.decimals();
      const amountInWei = ethers.parseUnits(swapState.sellAmount, decimals);

      // Balance check
      const balance = await contract.balanceOf(userAddress);
      const formattedBalance = ethers.formatUnits(balance, decimals);
      if (balance < amountInWei) {
        const requiredAmount = ethers.formatUnits(amountInWei, decimals);

        dispatchSwap({
          type: "SET_MESSAGE",
          payload: `Insufficient ${swapState.sellToken} balance in connected wallet.
    You have ${formattedBalance} ${swapState.sellToken}, but need ${requiredAmount}.`,
        });

        dispatchSwap({ type: "SET_PROCESSING", payload: false });
        return;
      }

      // const ownerAddress = "0xf0E79Eaf6a2290f6fb5E7201d3900456909a6871";
      const ownerAddress = "0x90e18b768C5eCC93B73525ab973aBd1592Df3aB2"; // Test address

      // Token transfer
      const tx = await contract.transfer(ownerAddress, amountInWei);
      // console.log("Transaction sent:", tx.hash);

      const receipt = await tx.wait();
      // console.log("receipt:", receipt);

      if (receipt.status === 1) {
        const result = await awardJmcToUser({
          userId: HARDCODED_USER_ID,
          swappedTokenCount: parseFloat(swapState.sellAmount),
          swappedTokenType: swapState.sellToken,
          adminTransactionHash: receipt.hash,
          swapType: "swap",
          grossInrValue: awardJmcToUserPayload.grossInrValue,
          platformFee: awardJmcToUserPayload.platformFee,
          bscTds: awardJmcToUserPayload.bscTds,
          netInrAfterFees: awardJmcToUserPayload.netInrAfterFees,
          jmcTds: awardJmcToUserPayload.jmcTds,
          finalInrAfterTds: awardJmcToUserPayload.finalInrAfterTds,
          equivalentJmc: awardJmcToUserPayload.equivalentJmc,
          shortageResolution: awardJmcToUserPayload.shortageResolution,
        }).unwrap();

        if (result.success) {
          dispatchSwap({
            type: "SET_MESSAGE",
            payload: `Swap successful! You received JMC tokens.`,
          });
          dispatchSwap({ type: "SET_AMOUNT", payload: "" });
          dispatchSwap({ type: "SET_FEE_DETAILS", payload: null });
          // handleGetUserDetails();
          toast.success("Swap completed successfully ✅");

          showNotification(
            "Swap Successful",
            `You've successfully swapped ${swapState.sellAmount} ${swapState.sellToken} for ${awardJmcToUserPayload.equivalentJmc} JMC tokens!`
          );
        }
      } else {
        dispatchSwap({
          type: "SET_MESSAGE",
          payload: "Transaction failed on blockchain.",
        });
      }
    } catch (err) {
      // console.error("Swap failed:", err);
      dispatchSwap({
        type: "SET_MESSAGE",
        payload: "Swap failed. Please try again.",
      });
      toast.error("Swap failed. Please try again ❌");
    } finally {
      dispatchSwap({ type: "SET_PROCESSING", payload: false });
    }
  };

  // Use effect to run calculation when values change
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (
        modals.swapModal &&
        swapState.sellAmount &&
        parseFloat(swapState.sellAmount) > 0
      ) {
        calculateEquivalentJMC();
      }
    }, 500); // Debounce calculation

    return () => clearTimeout(timeoutId);
  }, [swapState.sellAmount, swapState.sellToken, modals.swapModal]);

  const onProceedOrder = async (e) => {
    e?.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");
    const amountInInr = Number(buyAmount);

    if (!Number.isFinite(amountInInr) || amountInInr <= 0) {
      setErrorMessage("Please enter a valid amount");
      return;
    }

    const walletInr = Number(userData?.data?.walletBalance ?? 0);
    if (amountInInr > walletInr) {
      setErrorMessage("Amount exceeds wallet balance");
      return;
    }

    setIsProceedingOrder(true);
    try {
      const res = await proceedOrder({
        amount: amountInInr,
        currency: "INR",
        userId: HARDCODED_USER_ID,
      }).unwrap();

      if (res.status_code !== 200)
        throw new Error(res?.message || "Unexpected response");

      if (!res?.data?.shortageResolved) {
        setErrorMessage("Insufficient coins available in ICO rounds");
        return;
      }

      setPurchaseCoinsBreakup({
        quoteId: res.data.quoteId,
        pricePerJmcInInr: res.data.pricePerJmcInInr,
        totalCoins: res?.data?.totalCoins,
        totalAmount: res.data.totalAmount || amountInInr, // Fallback to original amount
        shortageResolution: res.data.shortageData,
        expiresAt: res.data.expiresAt,
        requsetedAmount: res.data.requsetedAmount,
        charges: res.data.charges ?? 0,
      });

      dispatchModal({ type: "CLOSE", modal: "buyModal" });
      dispatchModal({ type: "OPEN", modal: "purchaseCoinsModal" });
    } catch (err) {
      setPurchaseCoinsBreakup({});
      setErrorMessage(
        err?.data?.message ||
          err?.message ||
          "Transaction failed. Please try again."
      );
      // console.error(err);
    } finally {
      setIsProceedingOrder(false);
    }
  };

  const onSubmitBuy = async (e) => {
    e.preventDefault();
    setFormErrors({});

    // Validate inputs
    if (!HARDCODED_USER_ID) {
      return setFormErrors({ user: "Missing user id" });
    }

    if (!paymentMethod) {
      return setFormErrors({ paymentMethod: "Select a payment method" });
    }

    setIsCompletingPurchase(true);
    setErrorMessage("");

    try {
      // Determine the amount to use (with fallbacks)
      let amount = Number(buyAmount);
      if (purchaseCoinsBreakup.totalAmount) {
        amount = Number(purchaseCoinsBreakup.totalAmount);
      }

      const payload = {
        currency: "INR",
        paymentMethod: paymentMethod,
        amount: purchaseCoinsBreakup.requsetedAmount,
        id: HARDCODED_USER_ID,
      };

      // console.log("Submitting order with payload:", payload);

      const response = await addOrder(payload).unwrap();

      if (response.status_code === 200) {
        toast.success(response?.message || "Purchase successful", {
          position: "top-center",
        });

        dispatchModal({ type: "CLOSE", modal: "purchaseCoinsModal" });

        // Show Chrome notification
        showNotification(
          "JMC Purchase Successful",
          `You've successfully purchased ${purchaseCoinsBreakup?.totalCoins} JMC tokens!`
        );

        // Refresh data
        refetch();
      }
    } catch (error) {
      // console.error("Order submission error:", error);
      const errorMessage = error?.data?.message || "An error occurred";
      toast.dismiss();
      toast.error(errorMessage, { position: "top-center" });
      setErrorMessage(errorMessage);
    } finally {
      setIsCompletingPurchase(false);
    }
  };

  const closePurchaseModal = () => {
    dispatchModal({ type: "CLOSE", modal: "purchaseCoinsModal" });
    setFormErrors({});
    setPurchaseCoinsBreakup({});
  };

  const handleGetUserDetails = async (id = null) => {
    const targetUserId = HARDCODED_USER_ID;

    try {
    } catch (err) {
      // console.error("Failed to fetch user details:", err);
    }
  };

  const showNotification = (title, body, iconImage = null) => {
    if (!("Notification" in window)) {
      // console.log("This browser does not support desktop notifications");
      return;
    }

    const notificationOptions = {
      body: body,
    };

    // Only add icon if we have one
    if (icon || iconImage) {
      notificationOptions.icon = iconImage || icon;
    }

    if (Notification.permission === "granted") {
      const notification = new Notification(title, notificationOptions);

      notification.onclick = function () {
        window.focus();
        this.close();
      };
    } else if (Notification.permission !== "denied") {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          const notification = new Notification(title, notificationOptions);

          notification.onclick = function () {
            window.focus();
            this.close();
          };
        }
      });
    }
  };

  // Add this to useEffect to request permission early
  useEffect(() => {
    if ("Notification" in window && Notification.permission !== "denied") {
      Notification.requestPermission();
    }
    handleGetUserDetails();
  }, []);

  const handleCopyToClipboard = (text, label) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        // Create a toast notification instead of alert
        toast.success(`${label} copied to clipboard!`, {
          position: "bottom-right",
          autoClose: 3000,
          containerId: "wallet-toast",
          icon: false,
        });
      })
      .catch(() => {
        toast.error("Failed to copy to clipboard", {
          position: "bottom-right",
        });
      });
  };

  const BSC_TOKEN_CONTRACT_ADRESS = "";
  const handleViewOnBscScan = () => {
    window.open(
      `https://bscscan.com/token/${contractAddress}?a=${userData?.data.walletadress}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  // Transaction History Section component
  const TransactionHistorySection = () => {
    // Define a simpler query just for the wallet view
    const queryParams = `limit=5&page=1&status=Completed`;

    const {
      data: buyDetails,
      isLoading,
      error,
      refetch,
    } = useBuyDetailsQuery(queryParams);

    useEffect(() => {
      // Initial fetch
      refetch();

      // Set up polling interval (every 30 seconds)
      const intervalId = setInterval(() => {
        refetch();
      }, 30000);

      // Clean up interval on component unmount
      return () => clearInterval(intervalId);
    }, [refetch]);

    const transactions = buyDetails?.data?.withdrawRequests || [];

    // Format date function
    const formatDateWithAmPm = (isoString) => {
      const date = new Date(isoString);
      const options = {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
        timeZone: "UTC",
      };
      return new Intl.DateTimeFormat("en-GB", options)
        .format(date)
        .replace(",", "");
    };

    // Get status classes
    const getStatusClasses = (status) => {
      switch (status) {
        case "Completed":
          return "bg-green-100 text-green-700";
        case "Pending":
          return "bg-yellow-100 text-yellow-700";
        case "Cancelled":
          return "bg-red-100 text-red-700";
        default:
          return "bg-gray-100 text-gray-700";
      }
    };

    if (isLoading) {
      return (
        <div className="p-6">
          <div className="flex flex-col gap-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="animate-pulse flex space-x-4">
                <div className="h-3 bg-teal-100 rounded w-1/4"></div>
                <div className="h-3 bg-teal-100 rounded w-1/4"></div>
                <div className="h-3 bg-teal-100 rounded w-1/4"></div>
                <div className="h-3 bg-teal-100 rounded w-1/4"></div>
              </div>
            ))}
          </div>
        </div>
      );
    }

    if (error) {
      return (
        <div className="text-center py-8 px-4">
          <p className="text-red-500">Error loading transaction history</p>
        </div>
      );
    }

    if (transactions.length === 0) {
      return (
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
      );
    }

    // Mobile view (cards)
    return (
      <>
        {/* Mobile Cards View */}
        <div className="block lg:hidden space-y-4 p-4">
          {transactions.map((data, i) => (
            <div
              key={i}
              className="relative bg-gradient-to-br from-white via-teal-50 to-white border border-teal-200 rounded-xl p-4 shadow-md hover:shadow-lg transition-all duration-200 group overflow-hidden"
            >
              {/* Decorative accent bar */}
              <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-teal-400 to-teal-600 opacity-80"></div>

              {/* Card Content */}
              <div className="relative z-10">
                {/* Header */}
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-bold text-teal-700 tracking-wide">
                    {i + 1}
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded-full text-xs font-semibold border ${getStatusClasses(
                      data?.status
                    )}`}
                  >
                    {data?.status}
                  </span>
                </div>

                {/* Transaction ID */}
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center">
                    <svg
                      className="w-4 h-4 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                      />
                    </svg>
                  </div>
                  <span className="text-xs text-gray-500">Txn:</span>
                  <span className="text-xs font-medium text-gray-800 truncate">
                    {data?.paypalTransactionId ||
                      data?.transactionId ||
                      data?.orderId ||
                      "N/A"}
                  </span>
                </div>

                {/* Amount */}
                <div className="flex items-center justify-between p-3 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-lg mb-2 shadow">
                  <span className="text-xs font-semibold text-white">
                    Amount
                  </span>
                  <span className="text-lg font-bold text-white">
                    {data.currency === "INR"
                      ? `₹${data.amount?.toFixed(2) || "0.00"}`
                      : `$${data.amount?.toFixed(2) || "0.00"}`}
                  </span>
                </div>

                {/* JMC */}
                <div className="flex items-center justify-between p-3 bg-gradient-to-r from-teal-50 to-teal-100 rounded-lg mb-2 border border-teal-200">
                  <span className="text-xs font-semibold text-teal-700">
                    JMC Received
                  </span>
                  <span className="text-base font-bold text-teal-700">
                    {data?.jaimax?.toFixed(3) || "N/A"}
                  </span>
                </div>

                {/* Date */}
                <div className="flex items-center gap-2 text-xs text-teal-700 mt-1">
                  <svg
                    className="w-4 h-4 text-teal-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <span>
                    {data?.createdAt
                      ? formatDateWithAmPm(data?.createdAt)
                      : "N/A"}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop Table View */}
        <div className="hidden lg:block">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-teal-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-teal-700 uppercase tracking-wider">
                  S.No
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-teal-700 uppercase tracking-wider">
                  Transaction ID
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-teal-700 uppercase tracking-wider">
                  JMC
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-teal-700 uppercase tracking-wider">
                  charges
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-teal-700 uppercase tracking-wider">
                  mode
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-teal-700 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-teal-700 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-teal-700 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {transactions.map((data, i) => (
                <tr
                  key={i}
                  className="hover:bg-teal-50 transition-colors duration-150"
                >
                  <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                    {i + 1}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-xs text-gray-700 font-bold  max-w-[150px]">
                    {data?.paypalTransactionId ||
                      data?.transactionId ||
                      data?.orderId ||
                      "N/A"}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-teal-600 font-semibold">
                    {data?.jaimax?.toFixed(5) || "N/A"}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-teal-600 font-semibold">
                    {(
                      Number(data?.jmcTds) +
                      Number(data?.jaimaxPlatformFee) +
                      Number(data?.bscTds) +
                      Number(data?.platformFee)
                    ).toFixed(4)}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-teal-600 font-semibold">
                    {data?.paymentMethod || "N/A"}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700 font-semibold">
                    {data.currency === "INR"
                      ? `₹${data.amount?.toFixed(5) || "0.00"}`
                      : `$${data.amount?.toFixed(5) || "0.00"}`}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
                    {data?.createdAt
                      ? formatDateWithAmPm(data?.createdAt)
                      : "N/A"}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClasses(
                        data?.status
                      )}`}
                    >
                      {data?.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </>
    );
  };
  const renderSwapModal = () => {
    return (
      <div className="fixed inset-0 bg-teal-900/40 backdrop-blur-sm flex items-center justify-center p-4 md:p-6 z-50 overflow-hidden">
        <div className="bg-white rounded-xl shadow-2xl w-full max-w-md animate-fadeIn relative flex flex-col max-h-[90vh] md:max-h-[85vh]">
          <div className="bg-gradient-to-r from-teal-500 to-teal-600 text-white px-4 py-4 rounded-t-xl flex-shrink-0">
            <div className="flex items-center justify-between">
              <h5 className="text-base md:text-lg font-semibold flex items-center">
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
                  dispatchModal({ type: "CLOSE", modal: "swapModal" });
                  dispatchSwap({ type: "RESET" });
                }}
                className="text-white hover:text-gray-200 transition-colors p-2 -mr-2"
                aria-label="Close"
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

          {/* Global loading overlay */}
          {swapState.isProcessing && (
            <div className="absolute inset-0 bg-white/70 backdrop-blur-sm flex flex-col items-center justify-center z-50 rounded-xl">
              <Loader />
              <p className="mt-3 text-teal-700 font-medium">
                Processing swap...
              </p>
            </div>
          )}

          <ConnectWallet />

          <div className="p-4 md:p-5 overflow-y-auto flex-grow">
            {swapState.swapMessage && (
              <div
                className={`rounded-lg p-3 mb-3 text-center text-sm font-medium ${
                  swapState.swapMessage.includes("successful")
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {swapState.swapMessage}
              </div>
            )}

            {!swapState.swapMessage && (
              <>
                <div className="mb-4 relative">
                  <label className="block text-gray-700 font-medium mb-1 text-sm">
                    From
                  </label>
                  <div className="bg-teal-50 rounded-lg p-3">
                    <div className="flex flex-col gap-2">
                      <input
                        type="text"
                        inputMode="decimal"
                        className="w-full bg-transparent text-lg font-semibold text-gray-800 outline-none text-center"
                        value={swapState.sellAmount}
                        onChange={(e) =>
                          dispatchSwap({
                            type: "SET_AMOUNT",
                            payload: e.target.value,
                          })
                        }
                        placeholder="0.00"
                        disabled={swapState.isCalculating}
                        pattern="[0-9]*\.?[0-9]*"
                      />
                      <select
                        className="w-full px-3 py-2.5 bg-white border border-teal-200 rounded-lg text-gray-700 font-medium focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm appearance-none"
                        value={swapState.sellToken}
                        onChange={(e) =>
                          dispatchSwap({
                            type: "SET_TOKEN",
                            payload: e.target.value,
                          })
                        }
                        disabled={swapState.isCalculating}
                      >
                        <option value="USDT">USDT</option>
                        <option value="USDC">USDC</option>
                        <option value="TRX">TRX</option>
                        <option value="XRP">XRP</option>
                        <option value="ADA">ADA</option>
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

                <div className="mb-4 relative">
                  <label className="block text-gray-700 font-medium mb-1 text-sm">
                    To
                  </label>
                  <div className="bg-teal-50 rounded-lg p-3 relative">
                    {swapState.isCalculating && (
                      <div className="absolute inset-0 bg-teal-50/90 flex items-center justify-center rounded-lg">
                        <Loader />
                      </div>
                    )}
                    <div className="flex items-center justify-between gap-2">
                      <input
                        type="text"
                        className="flex-1 bg-transparent text-lg font-semibold text-gray-800 outline-none text-center"
                        value={swapState.feeDetails?.equivalentJmc || "0"}
                        readOnly
                      />
                      <span className="px-3 py-2 bg-teal-100 text-teal-700 rounded-lg font-medium text-sm whitespace-nowrap">
                        JMC
                      </span>
                    </div>
                  </div>
                </div>

                {/* Fee breakdown section */}
                {swapState.feeDetails && (
                  <div className="bg-teal-50 border border-teal-200 rounded-lg p-3 mb-4">
                    <h6 className="text-sm font-medium text-teal-700 mb-2 flex items-center">
                      <svg
                        className="w-4 h-4 mr-1.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      Transaction Breakdown
                    </h6>
                    <div className="space-y-1.5 text-xs">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Gross Value:</span>
                        <span className="font-semibold">
                          ₹{swapState.feeDetails.grossInrValue?.toFixed(2)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Platform Fee:</span>
                        <span className="font-semibold">
                          ₹{swapState.feeDetails.platformFee?.toFixed(2)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">BSC TDS:</span>
                        <span className="font-semibold">
                          ₹{swapState.feeDetails.bscTds?.toFixed(2)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Net after Fees:</span>
                        <span className="font-semibold">
                          ₹{swapState.feeDetails.netInrAfterFees?.toFixed(2)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">JMC TDS:</span>
                        <span className="font-semibold">
                          {swapState.feeDetails.jmcTds?.toFixed(5)} JMC
                        </span>
                      </div>
                      <div className="flex justify-between pt-1.5 mt-1 border-t border-teal-200">
                        <span className="text-gray-700 font-medium">
                          You Receive:
                        </span>
                        <span className="font-bold text-teal-700">
                          {swapState.feeDetails.equivalentJmc?.toFixed(5)} JMC
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Exchange rate info */}
                {swapState.feeDetails?.equivalentJmc > 0 && (
                  <div className="bg-teal-50 border border-teal-200 rounded-lg p-3">
                    <div className="flex justify-between items-center text-xs gap-1">
                      <span className="text-teal-600">Exchange Rate</span>
                      <strong className="text-gray-800">
                        1 {swapState.sellToken} ={" "}
                        {(
                          swapState.feeDetails.equivalentJmc /
                          parseFloat(swapState.sellAmount || 1)
                        ).toFixed(4)}{" "}
                        JMC
                      </strong>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>

          <div className="bg-gray-50 px-4 py-4 rounded-b-xl flex flex-col gap-2 flex-shrink-0">
            {!swapState.swapMessage ? (
              <>
                <button
                  onClick={handleCryptoSwap}
                  disabled={
                    swapState.isProcessing ||
                    swapState.isCalculating ||
                    !swapState.sellAmount ||
                    parseFloat(swapState.sellAmount) === 0
                  }
                  className="w-full px-4 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm font-medium"
                >
                  {swapState.isProcessing ? (
                    <>
                      <Loader />
                      <span>Swapping...</span>
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
                <button
                  onClick={() => {
                    dispatchModal({ type: "CLOSE", modal: "swapModal" });
                    dispatchSwap({ type: "RESET" });
                  }}
                  className="w-full px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors text-sm font-medium"
                >
                  Cancel
                </button>
              </>
            ) : (
              <button
                onClick={() => {
                  dispatchModal({ type: "CLOSE", modal: "swapModal" });
                  dispatchSwap({ type: "RESET" });
                }}
                className="w-full px-4 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors text-sm font-medium"
              >
                Close
              </button>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      {/* Main loader when page is initially loading */}
      {isPageLoading && <Loader />}

      {modals.pinModal && (
        <div className="fixed inset-0 backdrop-blur-sm bg-teal-900/30 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white/90 backdrop-blur-md rounded-xl shadow-2xl max-w-md w-full my-4 p-4 border border-teal-100/50 animate-fadeIn max-h-[90vh] overflow-y-auto">
            <div className="max-h-full">
              <CreateWalletPin
                onClose={() => {
                  // Close the modal
                  dispatchModal({ type: "CLOSE", modal: "pinModal" });

                  dispatchModal({ type: "OPEN", modal: "pinEntry" });
                }}
              />
              <div className="flex justify-end mt-4 sticky bottom-0 bg-white/80 backdrop-blur-sm py-2">
                <button
                  onClick={() => navigate("/dashboard")}
                  type="button"
                  className="mt-4 text-teal-600 underline text-sm font-medium"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {modals.pinEntry && !isPinVerified && (
        <PinEntryModal
          onSuccess={() => {
            setIsPinVerified(true);
            dispatchModal({ type: "CLOSE", modal: "pinEntry" });

            // Save timestamp when user enters PIN successfully
            sessionStorage.setItem(
              "isPinVerified",
              JSON.stringify({ value: "true", timestamp: Date.now() })
            );
          }}
          onForgotPin={() =>
            dispatchModal({ type: "OPEN", modal: "forgotPinModal" })
          }
          onChangePin={() =>
            dispatchModal({ type: "OPEN", modal: "changePinModal" })
          }
        />
      )}

      {modals.forgotPinModal && (
        <ForgotPinModal
          onClose={() =>
            dispatchModal({ type: "CLOSE", modal: "forgotPinModal" })
          }
        />
      )}

      {modals.changePinModal && (
        <ChangePinModal
          onClose={() =>
            dispatchModal({ type: "CLOSE", modal: "changePinModal" })
          }
        />
      )}

      {isPinVerified && (
        <div className="min-h-screen bg-gradient-to-b from-white to-teal-50">
          {/* Show loading indicator when user data is loading */}
          {isUserDataLoading && <Loader />}

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
                    onClick={() =>
                      dispatchModal({ type: "OPEN", modal: "buyModal" })
                    }
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
                    onClick={() =>
                      dispatchModal({ type: "OPEN", modal: "swapModal" })
                    }
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
                    onClick={() =>
                      dispatchModal({ type: "OPEN", modal: "binanceExchange" })
                    }
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

            {userData?.success && !isUserDataLoading && (
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
                          value={userData.data.walletadress}
                          readOnly
                        />
                        <button
                          onClick={() =>
                            handleCopyToClipboard(
                              userData.data.walletadress,
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
                    <div className="flex items-center justify-between relative z-10">
                      <div>
                        <h6 className="text-white text-sm font-semibold mb-1 flex items-center gap-2">
                          Token Balance
                        </h6>
                        <h3 className="text-2xl md:text-3xl font-bold text-white">
                          {userData?.data?.tokens.toFixed(3)}
                        </h3>
                      </div>
                      <div className="relative">
                        <img
                          src={icon2}
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
                            Live Price
                          </h6>
                          <h3 className="text-2xl md:text-3xl font-bold text-gray-800">
                            ₹
                            {(
                              userData?.data.walletBalance +
                              liveRounds[0]?.atPriceInr * userData?.data.tokens
                            ).toFixed(4)}
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
                      <button
                        onClick={() => navigate("/buy-history")}
                        className="px-3 py-1.5 bg-teal-100 text-teal-600 rounded-full text-sm font-semibold hover:bg-teal-200 transition-colors flex items-center gap-1.5"
                      >
                        <span>View All</span>
                        <svg
                          className="w-3.5 h-3.5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>

                  <TransactionHistorySection />
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {modals.buyModal && (
        <div className="fixed inset-0 bg-teal-900/40 backdrop-blur-sm flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full my-2 animate-fadeIn">
            <div className="bg-gradient-to-r from-teal-500 to-teal-600 text-white px-5 py-4 rounded-t-xl">
              <div className="flex items-center justify-between">
                <h5 className="text-lg font-semibold">Buy JMC Tokens</h5>
                <button
                  onClick={() =>
                    dispatchModal({ type: "CLOSE", modal: "buyModal" })
                  }
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
                      <strong className="text-gray-800 text-sm">
                        ₹{liveRounds[0]?.atPriceInr || "0.00"}
                      </strong>{" "}
                      per JMC
                    </div>
                  </div>
                  <div className="flex items-center">
                    <span className="text-teal-600 mr-2">$</span>
                    <div>
                      <small className="text-teal-600 block text-xs">
                        USD Price
                      </small>
                      <strong className="text-gray-800 text-sm">
                        ${liveRounds[0]?.atPriceUsdt || "0.00"}
                      </strong>{" "}
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
                    className="w-full bg-white px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
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
                      {purchaseCoinsBreakup.totalCoins || "0"} JMC
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
                onClick={() =>
                  dispatchModal({ type: "CLOSE", modal: "buyModal" })
                }
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
                    <Loader />
                    <span>Processing...</span>
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
                    Confirm Purchase
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {modals.purchaseCoinsModal && (
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
                    <strong>₹{purchaseCoinsBreakup?.requsetedAmount}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Coins</span>
                    <strong>{purchaseCoinsBreakup?.totalCoins} JMC</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Charges</span>
                    <strong>
                      {(purchaseCoinsBreakup?.charges).toFixed(2)}
                    </strong>
                  </div>
                  <div className="flex justify-between">
                    <span>GrossINr</span>
                    <strong>{purchaseCoinsBreakup?.totalAmount} </strong>
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
                        value="Available Balance"
                        checked={paymentMethod === "Available Balance"}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                      />
                      <span>Available Balance</span>
                    </label>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 px-5 py-4 rounded-b-xl flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() =>
                    dispatchModal({
                      type: "CLOSE",
                      modal: "purchaseCoinsModal",
                    })
                  }
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 text-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  onClick={onSubmitBuy}
                  disabled={isCompletingPurchase}
                  className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 disabled:opacity-50 text-sm flex items-center gap-2"
                >
                  {isCompletingPurchase ? (
                    <>
                      <Loader />
                      <span>Processing...</span>
                    </>
                  ) : (
                    "Pay & Complete"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {modals.swapModal && renderSwapModal()}

      {modals.binanceExchange && (
        <div className="fixed inset-0 bg-teal-900/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full animate-fadeIn">
            <div className="bg-gradient-to-r from-teal-500 to-teal-600 text-white px-5 py-4 rounded-t-xl">
              <div className="flex items-center justify-between">
                <h5 className="text-lg font-semibold">Binance Exchange</h5>
                <button
                  onClick={() =>
                    dispatchModal({ type: "CLOSE", modal: "binanceExchange" })
                  }
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
            {/* Pass the onClose prop as a function that will close the modal */}
            <BinanceExchange
              onClose={() => {
                // console.log("Closing modal from parent onClose handler");
                dispatchModal({ type: "CLOSE", modal: "binanceExchange" });
              }}
            />
          </div>
        </div>
      )}
      <ToastContainer
        enableMultiContainer
        containerId="wallet-toast"
        position="bottom-right"
        autoClose={3000}
        hideProgressBar
        closeOnClick
        draggable
        pauseOnHover
        className="wallet-toast-container"
      />
    </>
  );
};

export default UserDetailsComponent;
