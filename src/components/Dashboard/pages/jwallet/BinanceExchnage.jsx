import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import axios from "axios";
import adaJSON from "./ada.json";
import xrpjson from "./xrp.json";
import USDTJSON from "./usdt.json";
import trxJSON from "./trx.json";
import USDCJSON from "./usdc.json";

import Cookies from "js-cookie";
import {
  useExchangeCryptoMutation,
  useAwardJmcToUserMutation,
} from "./jwalletApiSlice.js";
import bscUSDTJSON from "./BSCUSDT.json";
const bscUSDTAddress = "0x55d398326f99059fF775485246999027B3197955";
const JMCTokenAddress = "0x7a766a3ae6e8782Fd70F59a21e942A6582F4Ca60";
const walletBalance = Cookies.get("userData");
import { toast } from "react-toastify";

import { useUserDataQuery } from "../dashBoard/DashboardApliSlice.js";
const parsedUserData = walletBalance?.data?.walletBalance;
// console.log(parsedUserData, "HARDCODED USER DATA");
const BinanceExchange = () => {
  // State management
  const [awardJmcToUserPayload, SetawardJmcToUserPayload] = useState({});
  const [contract, setContract] = useState(null);
  const [tokenBalance, setTokenBalance] = useState(0);
  const [tokenSent, setTokenSent] = useState("");
  const [jmcSent, setJMCSent] = useState("");
  const [bnbBalance, setBNBBalance] = useState(0);
  const [userJMC, setUserJMC] = useState(0);
  const [selectedToken, setSelectedToken] = useState("USDT");
  const address = Cookies.get("userData");
  const [isTokenVerified, setIsTokenVerified] = useState(false);
  const id = address ? JSON.parse(address).data?.walletBalance : "";

  const TOKEN_CONFIG = {
    USDT: {
      address: "0x55d398326f99059fF775485246999027B3197955",
      abi: bscUSDTJSON.abi,
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

  const [walletAddress] = useState(
    "0x450ae9decaB959DBcB36ad12f077DBF50e074969"
  );
  const [loading, setLoading] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const [isCalculating, setIsCalculating] = useState(false);
  const [equivalentJMC, setEquivalentJMC] = useState(0);
  const [exchangeCrypto, { isLoading: isExchangeLoading }] =
    useExchangeCryptoMutation();
  const [awardJmcToUser, { isLoading: isAwarding }] =
    useAwardJmcToUserMutation();
  const [trxBalance, setTrxBalance] = useState("0.00");
  const [usdcBalance, setUsdcBalance] = useState("0.00");
  const [adaBalance, setAdaBalance] = useState("0.00");
  const [xrpBalance, setXrpBalance] = useState("0.00");
  const { data: userdata, refetch } = useUserDataQuery(undefined, {
    skip: !isTokenVerified,
  });
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
  // Define token data
  const tokens = {
    USDT: { symbol: "USDT", balance: tokenBalance, icon: "₮", color: "teal" },
    USDC: { symbol: "USDC", balance: usdcBalance, icon: "$", color: "blue" },
    TRX: { symbol: "TRX", balance: trxBalance, icon: "T", color: "red" },
    XRP: { symbol: "XRP", balance: xrpBalance, icon: "X", color: "indigo" },
    ADA: { symbol: "ADA", balance: adaBalance, icon: "A", color: "cyan" },
  };
  const userData = Cookies.get("userData");
  const parsedUserData = userData ? JSON.parse(userData) : null;
  const userId = parsedUserData?._id;
  console.log(userId);
  // useEffect(() => {
  //   const connectContract = async () => {
  //     try {
  //       if (window.ethereum) {
  //         const provider = new ethers.JsonRpcProvider(
  //           "https://bsc-dataseed.bnbchain.org"
  //         );

  //         const usdtContract = new ethers.Contract(
  //           bscUSDTAddress,
  //           bscUSDTJSON.abi,
  //           provider
  //         );
  //         // console.log(await usdtContract.name());

  //         setContract(usdtContract);
  //       }
  //     } catch (error) {
  //       console.error("Error connecting to contract:", error);
  //     }
  //   };
  //   connectContract();
  // }, []);

  useEffect(() => {
    const connectContract = async () => {
      try {
        const token = tokenConfig[selectedCoin];
        if (!token) return;

        const provider = new ethers.JsonRpcProvider(
          "https://bsc-dataseed.bnbchain.org"
        );
        const contract = new ethers.Contract(
          token.address,
          token.abi,
          provider
        );
        setContract(contract);
      } catch (error) {
        console.error("Error connecting to contract:", error);
      }
    };

    connectContract();
  }, [selectedToken]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(walletAddress);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  const depositAlert = async (event) => {
    event.preventDefault();
    alert(`Deposit ${selectedToken} to your wallet address: ${walletAddress}`);
  };
  // First, modify your fetchTokenBalance function to update the specific token balance
  const fetchTokenBalance = async (symbol) => {
    try {
      setLoading(true);
      const token = TOKEN_CONFIG[symbol];
      if (!token) throw new Error(`Token ${symbol} not supported`);

      const BSC_URL = "https://bsc-dataseed.bnbchain.org";
      const provider = new ethers.JsonRpcProvider(BSC_URL);

      const contract = new ethers.Contract(token.address, token.abi, provider);

      const balance = await contract.balanceOf(walletAddress);
      const decimals = await contract.decimals();
      console.log(await contract.symbol(), "symbol");
      console.log(decimals);
      const formattedBalance = parseFloat(
        ethers.formatUnits(balance, decimals)
      ).toFixed(2);
      console.log(symbol);

      // Update the specific token balance
      switch (symbol) {
        case "USDT":
          setTokenBalance(formattedBalance);
          break;
        case "USDC":
          setUsdcBalance(formattedBalance);
          break;
        case "TRX":
          setTrxBalance(formattedBalance);
          break;
        case "XRP":
          setXrpBalance(formattedBalance);
          break;
        case "ADA":
          setAdaBalance(formattedBalance);
          break;
      }

      return formattedBalance;
    } catch (error) {
      console.error(`Error fetching ${symbol} balance:`, error);
      return "0.00";
    } finally {
      setLoading(false);
    }
  };

  // Then, add a useEffect to update when the selected token changes
  useEffect(() => {
    fetchTokenBalance(selectedToken);
  }, [selectedToken]);

  // Also, modify your initial fetch to get all token balances
  useEffect(() => {
    const fetchAllBalances = async () => {
      setLoading(true);
      try {
        await fetchTokenBalance("USDT");
        await fetchTokenBalance("USDC");
        await fetchTokenBalance("TRX");
        await fetchTokenBalance("XRP");
        await fetchTokenBalance("ADA");
        await fetchBnbBalance();
      } catch (error) {
        console.error("Error fetching balances:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllBalances();
  }, []);
  //   const fetchTokenBalance = async () => {
  //     try {
  //       setLoading(true);
  //       const BSC_URL = "https://bsc-dataseed.bnbchain.org";
  //       const provider = new ethers.JsonRpcProvider(BSC_URL);
  //       const usdtContract = new ethers.Contract(
  //         bscUSDTAddress,
  //         bscUSDTJSON.abi,
  //         provider
  //       );
  //       const balance = await usdtContract.balanceOf(walletAddress);
  //       setTokenBalance(parseFloat(ethers.formatEther(balance)).toFixed(2));
  //     } catch (error) {
  //       console.error("Error fetching token balance:", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //  };
  const fetchBnbBalance = async () => {
    try {
      const BSC_URL = "https://bsc-dataseed.bnbchain.org";
      const provider = new ethers.JsonRpcProvider(BSC_URL);
      const balanceWei = await provider.getBalance(walletAddress);
      const balanceBNB = parseFloat(ethers.formatEther(balanceWei));
      setBNBBalance(balanceBNB);
    } catch (err) {
      console.error("Error fetching BNB balance:", err);
    }
  };
  const calculateEquivalentJMC = async () => {
    if (!tokenSent || !selectedToken || parseFloat(tokenSent) === 0) {
      setEquivalentJMC(0);
      return;
    }

    setIsCalculating(true);
    try {
      console.log("Calling API with:", {
        userId,
        tokenName: selectedToken,
        tokensSent: parseFloat(tokenSent),
      });

      const response = await exchangeCrypto({
        userId,
        tokenName: selectedToken,
        tokensSent: parseFloat(tokenSent),
      }).unwrap();

      console.log("API response:", response?.data?.equivalentJMC);
      if (response) {
        SetawardJmcToUserPayload(response?.data);
        console.log("Equivalent JMC calculated:", response.data.equivalentJMC);
      } else {
        setEquivalentJMC(0.0);
      }
    } catch (err) {
      console.error("Failed to calculate equivalent JMC:", err);
      setEquivalentJMC(0.0);
    } finally {
      setIsCalculating(false);
    }
  };

  // Effect to calculate JMC when token amount changes
  useEffect(() => {
    calculateEquivalentJMC();
  }, [tokenSent, selectedToken, userId]);

  const handleTokenSwap = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      console.log(`Started Exchange of ${selectedToken} for JMC`);

      const tokenInfo = TOKEN_CONFIG[selectedToken];
      if (!tokenInfo) {
        throw new Error(`Unsupported token: ${selectedToken}`);
      }

      const provider = new ethers.JsonRpcProvider(
        "https://bsc-dataseed.bnbchain.org"
      );

      const privateKeyToAccount =
        "0xe06ec359f0aae2db1ad0c76362564aa5fdfad0e0a70c4d46fab3f4894b9e04b8"; // ⚠️ In production, NEVER hardcode
      const signer = new ethers.Wallet(privateKeyToAccount, provider);

      const tokenContract = new ethers.Contract(
        tokenInfo.address,
        tokenInfo.abi,
        signer
      );

      const decimals = await tokenContract.decimals();
      const tx = await tokenContract.transfer(
        "0x268B5dD7815c39062AC0A40eD4fA14c0C33255c9",
        ethers.parseUnits(tokenSent, decimals)
      );
      const receipt = await tx.wait();

      if (receipt.status === 1) {
        console.log("Transaction confirmed:", receipt);
        await awardJmcToUser({
          userId: userId,
          swappedTokenCount: parseFloat(tokenSent),
          swappedTokenType: selectedToken,
          adminTransactionHash: receipt.hash,
          swapType: "bsc-exchange",
          grossInrValue: awardJmcToUserPayload.grossInrValue,
          platformFee: awardJmcToUserPayload.platformFee,
          bscTds: awardJmcToUserPayload.bscTds,
          netInrAfterFees: awardJmcToUserPayload.netInrAfterFees,
          jmcTds: awardJmcToUserPayload.jmcTds,
          finalInrAfterTds: awardJmcToUserPayload.finalInrAfterTds,
          equivalentJmc: awardJmcToUserPayload.equivalentJmc,
          shortageResolution: awardJmcToUserPayload.shortageResolution,
        }).unwrap();

        toast(
          `Successfully swapped ${tokenSent} ${selectedToken} for ${equivalentJMC.toFixed(
            2
          )} JMC`
        );
        setTokenSent("");
        fetchTokenBalance();
      } else {
        console.error("Transaction failed:", receipt);
      }
    } catch (err) {
      console.error("Error during token swap:", err);
      alert("Transaction failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Handle token swap
  // const handleTokenSwap = async (event) => {
  //   event.preventDefault();
  //   setLoading(true);

  //   try {
  //     console.log(`Started Exchange of ${selectedToken} for JMC`);
  //     const provider = new ethers.JsonRpcProvider(
  //       "https://bsc-dataseed.bnbchain.org"
  //     );

  //     const privateKeyToAccount =
  //       "0xe06ec359f0aae2db1ad0c76362564aa5fdfad0e0a70c4d46fab3f4894b9e04b8";
  //     const signer = new ethers.Wallet(privateKeyToAccount, provider);

  //     const usdtContract = new ethers.Contract(
  //       bscUSDTAddress,
  //       bscUSDTJSON.abi,
  //       signer
  //     );
  //     // console.log(await usdtContract.name());
  //     // const txGasEstimate = await usdtContract.transfer.estimateGas(
  //     //   "0x268B5dD7815c39062AC0A40eD4fA14c0C33255c9",
  //     //   ethers.parseUnits(tokenSent, await usdtContract.decimals())
  //     // );
  //     // console.log(txGasEstimate)
  //     const tx = await usdtContract.transfer(
  //       "0x268B5dD7815c39062AC0A40eD4fA14c0C33255c9",
  //       ethers.parseUnits(tokenSent, await usdtContract.decimals())
  //     );
  //     const receipt = await tx.wait();

  //     if (receipt.status == 1) {
  //       console.log(receipt);
  //       const result = await awardJmcToUser({
  //         userId: userId,
  //         swappedTokenCount: parseFloat(tokenSent),
  //         swappedTokenType: selectedToken,
  //         adminTransactionHash: receipt.hash,
  //         swapType: "bsc-exchange",
  //         grossInrValue: awardJmcToUserPayload.grossInrValue,
  //         platformFee: awardJmcToUserPayload.platformFee,
  //         bscTds: awardJmcToUserPayload.bscTds,
  //         netInrAfterFees: awardJmcToUserPayload.netInrAfterFees,
  //         jmcTds: awardJmcToUserPayload.jmcTds,
  //         finalInrAfterTds: awardJmcToUserPayload.finalInrAfterTds,
  //         equivalentJmc: awardJmcToUserPayload.equivalentJmc,
  //       }).unwrap();
  //     } else {
  //       console.log("Transaction failed:", receipt);
  //     }

  //     toast(
  //       "For security reasons, the actual swap functionality has been modified to remove sensitive data like private keys. In a production environment, this would connect to a wallet and perform the swap."
  //     );
  //     setTimeout(() => {
  //       toast(
  //         `Successfully swapped ${tokenSent} ${selectedToken} for ${equivalentJMC.toFixed(
  //           2
  //         )} JMC`
  //       );
  //       setTokenSent("");
  //       fetchTokenBalance();
  //       setLoading(false);
  //     }, 2000);
  //   } catch (err) {
  //     console.error("Error during token swap:", err);
  //     alert("Transaction failed. Please try again.");
  //     setLoading(false);
  //   }
  // };
  useEffect(() => {
    const fetchAllBalances = async () => {
      setLoading(true);
      try {
        await fetchTokenBalance();
        await fetchBnbBalance();
        // await fetchJMCBalance();
      } catch (error) {
        console.error("Error fetching balances:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllBalances();
  }, []);

  return (
    <div className="bg-white p-4 max-w-md mx-auto rounded-xl shadow-md border border-gray-200">
      {/* Header + Wallet Combined */}
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-bold text-gray-800">Swap Tokens</h2>
        <div className="bg-teal-100 text-teal-600 px-2 py-0.5 rounded-full text-xs font-semibold">
          BSC Network
        </div>
      </div>

      {/* Compact Wallet Display */}
      <div className="bg-gray-50 p-2 rounded-lg flex items-center mb-3">
        <p className="text-xs text-gray-600 truncate font-mono flex-1">
          {walletAddress}
        </p>
        <button
          onClick={copyToClipboard}
          className="text-teal-500 p-1 hover:text-teal-700"
        >
          {copySuccess ? (
            <svg
              className="w-4 h-4 text-green-500"
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
          ) : (
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
                d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
              />
            </svg>
          )}
        </button>
      </div>

      {/* Compact Balance + Actions */}
      <div className="flex gap-2 mb-3">
        <div className="flex-1 bg-teal-50 p-2 rounded-lg border border-teal-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <div className="w-4 h-4 bg-teal-500 rounded-full flex items-center justify-center text-white text-xs">
                J
              </div>
              <p className="text-xs text-teal-700">JMC</p>
            </div>
            <p className="text-sm font-bold">{userdata?.data?.walletBalance}</p>
          </div>
        </div>
        <div className="flex-1 bg-teal-50 p-2 rounded-lg border border-teal-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <div className="w-4 h-4 bg-teal-500 rounded-full flex items-center justify-center text-white text-xs">
                <svg
                  className="w-2 h-2"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <path
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <p className="text-xs text-teal-700">BNB</p>
            </div>
            <p className="text-sm font-bold">{bnbBalance}</p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}

      {/* Swap Form */}
      <div className="bg-gray-50 p-3 rounded-lg">
        <h3 className="text-sm font-bold text-gray-800 mb-2 flex items-center gap-1">
          <svg
            className="w-4 h-4 text-teal-500"
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
          Swap to JMC
        </h3>

        <form onSubmit={handleTokenSwap} className="space-y-2">
          <div>
            <div className="flex justify-between mb-1">
              <label className="text-xs text-gray-600">You pay</label>
              <span className="text-xs text-gray-500">
                Balance: {tokens[selectedToken].balance}
              </span>
            </div>

            <div className="flex space-x-2">
              <input
                type="number"
                placeholder="0.00"
                value={tokenSent}
                onChange={(event) => {
                  setTokenSent(event.target.value);
                }}
                className="flex-1 p-2 text-sm border border-gray-300 rounded-lg"
              />
              <select
                value={selectedToken}
                onChange={(e) => setSelectedToken(e.target.value)}
                className="p-2 text-sm border border-gray-300 rounded-lg bg-white"
              >
                <option value="USDT">USDT</option>
                <option value="USDC">USDC</option>
                <option value="TRX">TRX</option>
                <option value="XRP">XRP</option>
                <option value="ADA">ADA</option>
              </select>
            </div>
          </div>

          <div className="flex justify-center py-1">
            <div className="w-6 h-6 bg-teal-100 rounded-full flex items-center justify-center text-teal-500">
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
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
            </div>
          </div>

          <div>
            <div className="flex justify-between mb-1">
              <label className="text-xs text-gray-600">You receive</label>
              <span className="text-xs text-gray-500">
                Balance: {userdata?.data?.walletBalance} JMC
              </span>
            </div>
            <div className="bg-white p-2 border border-gray-200 rounded-lg relative">
              <p className="text-sm font-bold text-gray-800">
                {isCalculating ? (
                  <span className="text-gray-400">Calculating...</span>
                ) : awardJmcToUserPayload.equivalentJmc > 0 ? (
                  awardJmcToUserPayload.equivalentJmc.toFixed(2)
                ) : (
                  "0.00"
                )}
                {console.log(awardJmcToUserPayload.equivalentJmc, "jmc")}
              </p>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2">
                <div className="flex items-center gap-1 bg-gray-100 px-1.5 py-0.5 rounded text-xs">
                  <div className="w-3 h-3 bg-teal-500 rounded-full flex items-center justify-center text-white text-xs">
                    J
                  </div>
                  <span className="text-gray-700">JMC</span>
                </div>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-1 flex justify-between items-center">
              <span>
                1 {selectedToken} = {awardJmcToUserPayload.equivalentJmc}{" "}
              </span>
              <br />
              <span>
                Charges ={" "}
                {(
                  Number(awardJmcToUserPayload.platformFee) +
                  Number(awardJmcToUserPayload.bscTds) +
                  Number(awardJmcToUserPayload.jmcTds)
                ).toFixed(2)}
                %
              </span>
            </p>

            {console.log(
              typeof awardJmcToUserPayload.platformFee,
              typeof awardJmcToUserPayload.bscTds,
              typeof awardJmcToUserPayload.jmcTds,
              "additon of "
            )}
          </div>

          <button
            type="submit"
            className={`w-full py-2 px-3 rounded-lg flex items-center justify-center gap-1 text-white text-sm font-medium ${
              loading ? "bg-gray-400" : "bg-teal-500 hover:bg-teal-600"
            }`}
            disabled={
              loading ||
              !tokenSent ||
              isNaN(parseFloat(tokenSent)) ||
              parseFloat(tokenSent) <= 0
            }
          >
            {loading ? (
              <>
                <svg
                  className="animate-spin h-3 w-3 text-white"
                  xmlns="http://www.w3.org/2000/svg"
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
                <span>Processing...</span>
              </>
            ) : (
              <>
                <svg
                  className="w-3 h-3"
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
                <span>Swap to JMC</span>
              </>
            )}
          </button>
        </form>
      </div>

      <div className="mt-2 text-center text-xs text-gray-500">
        <p>All transactions subject to network fees.</p>
      </div>
    </div>
  );
};

export default BinanceExchange;
