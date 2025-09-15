// import React, { useEffect, useState } from "react";
// import { ethers } from "ethers";
// import adaJSON from "./ada.json";
// import xrpjson from "./xrp.json";
// import USDTJSON from "./usdt.json";
// import trxJSON from "./trx.json";
// import USDCJSON from "./usdc.json";
// import Cookies from "js-cookie";
// import {
//   useExchangeCryptoMutation,
//   useAwardJmcToUserMutation,
// } from "./jwalletApiSlice.js";
// import { toast } from "react-toastify";
// import { useUserDataQuery } from "../dashBoard/DashboardApliSlice.js";
// import CryptoJS from "crypto-js";
// import Loader from "../../../Loader/loader";
// const BinanceExchange = ({ onClose }) => {
//   // State management
//   const [awardJmcToUserPayload, setAwardJmcToUserPayload] = useState({});
//   const [contract, setContract] = useState(null);
//   const [tokenBalance, setTokenBalance] = useState(0);
//   const [tokenSent, setTokenSent] = useState("");
//   const [bnbBalance, setBNBBalance] = useState(0);
//   const [selectedToken, setSelectedToken] = useState("USDT");
//   const [isTokenVerified, setIsTokenVerified] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [copySuccess, setCopySuccess] = useState(false);
//   const [isCalculating, setIsCalculating] = useState(false);
//   const [trxBalance, setTrxBalance] = useState("0.00");
//   const [usdcBalance, setUsdcBalance] = useState("0.00");
//   const [adaBalance, setAdaBalance] = useState("0.00");
//   const [xrpBalance, setXrpBalance] = useState("0.00");
//   const [showSuccess, setShowSuccess] = useState(false);
//   const [successMessage, setSuccessMessage] = useState("");
//   const [fetchingBalances, setFetchingBalances] = useState(false);
//   const [swapInProgress, setSwapInProgress] = useState(false);

//   // User data from cookies
//   const userData = Cookies.get("userData");
//   const parsedUserData = userData ? JSON.parse(userData) : null;
//   const userId = parsedUserData?._id;
//   const walletadress = parsedUserData?.walletadress || "N/A";
//   const [walletAddress] = useState(walletadress);

//   // Token configuration
//   const TOKEN_CONFIG = {
//     USDT: {
//       address: "0x55d398326f99059fF775485246999027B3197955",
//       abi: USDTJSON.abi,
//     },
//     USDC: {
//       address: "0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d",
//       abi: USDCJSON.abi,
//     },
//     TRX: {
//       address: "0xCE7de646e7208a4Ef112cb6ed5038FA6cC6b12e3",
//       abi: trxJSON.abi,
//     },
//     XRP: {
//       address: "0x1D2F0da169ceB9fC7B3144628dB156f3F6c60dBE",
//       abi: xrpjson.abi,
//     },
//     ADA: {
//       address: "0x3EE2200Efb3400fAbB9AacF31297cBdD1d435D47",
//       abi: adaJSON.abi,
//     },
//   };

//   // API mutations and queries
//   const [exchangeCrypto, { isLoading: isExchangeLoading }] =
//     useExchangeCryptoMutation();
//   const [awardJmcToUser, { isLoading: isAwarding }] =
//     useAwardJmcToUserMutation();
//   const { data: userdata, refetch } = useUserDataQuery(undefined, {
//     skip: !isTokenVerified,
//   });

//   // Token data mapping
//   const tokens = {
//     USDT: { symbol: "USDT", balance: tokenBalance, icon: "₮", color: "teal" },
//     USDC: { symbol: "USDC", balance: usdcBalance, icon: "$", color: "blue" },
//     TRX: { symbol: "TRX", balance: trxBalance, icon: "T", color: "red" },
//     XRP: { symbol: "XRP", balance: xrpBalance, icon: "X", color: "indigo" },
//     ADA: { symbol: "ADA", balance: adaBalance, icon: "A", color: "cyan" },
//   };

//   // Auto close on success
//   useEffect(() => {
//     if (showSuccess) {
//       const timer = setTimeout(() => {
//         closeModalDirectly();
//       }, 3000);
//       return () => clearTimeout(timer);
//     }
//   }, [showSuccess]);

//   // Security handling for seed phrase
//   const token = Cookies.get("token");

//   // Modal closing function with multiple fallbacks
//   const closeModalDirectly = () => {
//     if (typeof onClose === "function") {
//       onClose();
//       return;
//     }
//     if (typeof window.setShowBinanceExchange === "function") {
//       window.setShowBinanceExchange(false);
//       return;
//     }
//     document.dispatchEvent(new CustomEvent("binanceExchangeCompleted"));
//     try {
//       const modalElement = document.querySelector(
//         ".fixed.inset-0.bg-teal-900\\/40"
//       );
//       if (modalElement) {
//         modalElement.style.display = "none";
//       }
//     } catch (err) {
//       console.error("Failed to remove modal directly:", err);
//     }
//   };

//   // Token verification
//   useEffect(() => {
//     const verifyToken = async () => {
//       if (token) {
//         setIsTokenVerified(true);
//       }
//     };
//     verifyToken();
//   }, [token]);

//   // Contract connection
//   useEffect(() => {
//     const connectContract = async () => {
//       try {
//         const token = TOKEN_CONFIG[selectedToken];
//         if (!token) return;

//         const provider = new ethers.JsonRpcProvider(
//           // "https://bsc-dataseed.bnbchain.org"
//           "https://bnb-mainnet.g.alchemy.com/v2/Tf2Mn6CcpLPrZeIrhvO12"
//         );
//         const contract = new ethers.Contract(
//           token.address,
//           token.abi,
//           provider
//         );
//         setContract(contract);
//       } catch (error) {
//         console.error("Error connecting to contract:", error);
//         toast.error(
//           "Failed to connect to blockchain network. Please try again later."
//         );
//       }
//     };

//     connectContract();
//   }, [selectedToken]);

//   // Clipboard functionality
//   const copyToClipboard = () => {
//     navigator.clipboard
//       .writeText(walletAddress)
//       .then(() => {
//         setCopySuccess(true);
//         toast.info("Wallet address copied to clipboard!");
//         setTimeout(() => setCopySuccess(false), 2000);
//       })
//       .catch(() => {
//         toast.error("Failed to copy address");
//       });
//   };

//   // Token balance fetching
//   const fetchTokenBalance = async (symbol) => {
//     try {
//       const token = TOKEN_CONFIG[symbol];
//       if (!token) throw new Error(`Token ${symbol} not supported`);

//       // const BSC_URL = "https://bsc-dataseed.bnbchain.org";
//       const BSC_URL="https://bnb-mainnet.g.alchemy.com/v2/Tf2Mn6CcpLPrZeIrhvO12"
//       const provider = new ethers.JsonRpcProvider(BSC_URL);
//       const contract = new ethers.Contract(token.address, token.abi, provider);

//       const balance = await contract.balanceOf(walletAddress);
//       const decimals = await contract.decimals();
//       const formattedBalance = parseFloat(
//         ethers.formatUnits(balance, decimals)
//       ).toFixed(2);

//       // Update the specific token balance
//       switch (symbol) {
//         case "USDT":
//           setTokenBalance(formattedBalance);
//           break;
//         case "USDC":
//           setUsdcBalance(formattedBalance);
//           break;
//         case "TRX":
//           setTrxBalance(formattedBalance);
//           break;
//         case "XRP":
//           setXrpBalance(formattedBalance);
//           break;
//         case "ADA":
//           setAdaBalance(formattedBalance);
//           break;
//       }

//       return formattedBalance;
//     } catch (error) {
//       console.error(`Error fetching ${symbol} balance:`, error);
//       toast.error(
//         `Could not fetch ${symbol} balance. Network may be congested.`
//       );
//       return "0.00";
//     }
//   };

//   // BNB balance fetching
//   const fetchBnbBalance = async () => {
//     try {
//       const BSC_URL = "https://bsc-dataseed.bnbchain.org";
//       const provider = new ethers.JsonRpcProvider(BSC_URL);
//       const balanceWei = await provider.getBalance(walletAddress);
//       const balanceBNB = parseFloat(ethers.formatEther(balanceWei)).toFixed(4);
//       setBNBBalance(balanceBNB);
//     } catch (err) {
//       console.error("Error fetching BNB balance:", err);
//       toast.error("Could not fetch BNB balance. Network may be congested.");
//     }
//   };

//   useEffect(() => {
//     const fetchAllBalances = async () => {
//       setFetchingBalances(true);
//       try {
       
//         await Promise.all([
//           fetchTokenBalance("USDT"),
//           fetchTokenBalance("USDC"),
//           fetchTokenBalance("TRX"),
//           fetchTokenBalance("XRP"),
//           fetchTokenBalance("ADA"),
//           fetchBnbBalance(),
//         ]);
//         toast.success("Balances updated successfully");
//       } catch (error) {
//         console.error("Error fetching balances:", error);
//         toast.error("Failed to fetch some balances. Please try refreshing.");
//       } finally {
//         setFetchingBalances(false);
//       }
//     };

//     fetchAllBalances();
//   }, [walletAddress]);


// const calculateEquivalentJMC = async () => {
//   if (!tokenSent || !selectedToken || parseFloat(tokenSent) <= 0) {
//     setAwardJmcToUserPayload({});
   
//     return;
//   }

//   setIsCalculating(true);
//   try {
//     const response = await exchangeCrypto({
//       userId,
//       tokenName: selectedToken,
//       tokensSent: parseFloat(tokenSent),
//     }).unwrap();

//     console.log("API Response:", response); // Debug log to check response structure

//     if (response?.success === 1 && response?.data) {
//       setAwardJmcToUserPayload(response.data);
//     } else {
//       setAwardJmcToUserPayload({});
//       // Explicitly check and display the message
//       if (response && response.message) {
//         toast.warning(response.message);
//       } else {
//         toast.warning("Could not calculate JMC equivalent. Please try again.");
//       }
//     }
//   } catch (err) {
//     console.error("Failed to calculate equivalent JMC:", err);
    
//     // Make sure we're accessing error data correctly
//     console.log("Error object:", err); // Debug log
    
//     // Check different possible locations for the error message
//     const errorMessage =
//       (err?.data?.message) || 
//       (err?.message) || 
//       (err?.error) || 
//       "Error calculating JMC equivalent rate.";

//     toast.error(errorMessage);
//     setAwardJmcToUserPayload({});
//   } finally {
//     setIsCalculating(false);
//   }
// };
//   // Recalculate when token or amount changes
//   useEffect(() => {
//     const delayDebounceFn = setTimeout(() => {
//       if (tokenSent) {
//         calculateEquivalentJMC();
//       }
//     }, 0);

//     return () => clearTimeout(delayDebounceFn);
//   }, [tokenSent, selectedToken, userId]);

//   // Helper function to decrypt private key


// function getDecryptedPrivateKey(privatekey, secret) {
//   if (!privatekey) {
//     return null;
//   }

//   const aesKey = import.meta.env.VITE_DL_AES_KEY;
//   const aesIV = import.meta.env.VITE_DL_AES_IV;

//   if (!aesKey || !aesIV) {
//     return null;
//   }

//   try {

//     // If it's already a valid key with 0x prefix
//     if (privatekey.startsWith("0x") && privatekey.length === 66) {
//       return privatekey;
//     }

//     // For hex-encoded encrypted data
//     if (/^[0-9a-f]+$/i.test(privatekey)) {

//       // Convert hex string to WordArray
//       const ciphertext = CryptoJS.enc.Hex.parse(privatekey);

//       // Parse key & IV
//       const key = CryptoJS.enc.Hex.parse(aesKey);
//       const iv = CryptoJS.enc.Hex.parse(aesIV);

//       // Build cipher params
//       const cipherParams = CryptoJS.lib.CipherParams.create({ ciphertext });

//       // Decrypt
//       const decrypted = CryptoJS.AES.decrypt(cipherParams, key, {
//         iv: iv,
//         mode: CryptoJS.mode.CBC,
//         padding: CryptoJS.pad.Pkcs7,
//       });
//       const decryptedStr = decrypted.toString(CryptoJS.enc.Utf8);

//       // Validate and format
//       if (decryptedStr && decryptedStr.length > 0) {
//         if (decryptedStr.startsWith("0x") && /^0x[0-9a-f]{64}$/i.test(decryptedStr)) {
//           return decryptedStr;
//         } else if (/^[0-9a-f]{64}$/i.test(decryptedStr)) {
//           return `0x${decryptedStr}`;
//         } else {
//           return decryptedStr.startsWith("0x") ? decryptedStr : `0x${decryptedStr}`;
//         }
//       }
//     }

//     return null;
//   } catch (err) {
//     return null;
//   }
// }


//   // Handle token swap
//   const handleTokenSwap = async (event) => {
//     event.preventDefault();
//     setLoading(true);
//     setSwapInProgress(true);
//     setShowSuccess(false);

//     try {
//       // Validation
//       if (!tokenSent || parseFloat(tokenSent) <= 0) {
//         toast.error("Please enter a valid amount to swap");
//         setLoading(false);
//         setSwapInProgress(false);
//         return;
//       }

//       const tokenInfo = TOKEN_CONFIG[selectedToken];
//       if (!tokenInfo) {
//         throw new Error(`Unsupported token: ${selectedToken}`);
//       }

//       // Get environment variable
//       const secret = import.meta.env.VITE_DL_AES_KEY;
//       const privatekey = userdata?.data?.privateKey;

//       if (!privatekey) {
//         toast.error("Private key not found. Please try again later.");
//         return;
//       }

//       const decryptedKey = getDecryptedPrivateKey(privatekey, secret);
//       console.log("Decryption result:", decryptedKey ? "Success" : "Failed");

//       if (!decryptedKey) {
//         toast.error("Invalid private key. Cannot proceed with swap.");
//         return;
//       }
//       toast.info(
//         `Initiating ${selectedToken} swap. Please confirm in your wallet...`
//       );

//       const provider = new ethers.JsonRpcProvider(
//         "https://bsc-dataseed.bnbchain.org"
//       );

//       const signer = new ethers.Wallet(decryptedKey, provider);
//       const tokenContract = new ethers.Contract(
//         tokenInfo.address,
//         tokenInfo.abi,
//         signer
//       );

//       const decimals = await tokenContract.decimals();
//       const amountToSend = ethers.parseUnits(tokenSent, decimals);

//       // Check balance before transaction
//       const balance = await tokenContract.balanceOf(walletAddress);
//       if (balance < amountToSend) {
//         toast.error(
//           `Insufficient ${selectedToken} balance. You need at least ${tokenSent} ${selectedToken}.`
//         );
//         return;
//       }

//       toast.info("Processing transaction...");

//       const tx = await tokenContract.transfer(
//         // "0x268B5dD7815c39062AC0A40eD4fA14c0C33255c9",
//         "0x90e18b768C5eCC93B73525ab973aBd1592Df3aB2",
//         amountToSend
//       );

//       console.log("Transaction sent:", tx.hash);
//       toast.info(`Transaction submitted! Hash: ${tx.hash.substring(0, 10)}...`);

//       const receipt = await tx.wait();
//       console.log("Transaction confirmed:", receipt);

//       if (receipt.status === 1) {
//         // Transaction successful, award JMC
//         toast.success("Token transfer confirmed! Awarding JMC...");

//         const result = await awardJmcToUser({
//           userId: userId,
//           swappedTokenCount: parseFloat(tokenSent),
//           swappedTokenType: selectedToken,
//           adminTransactionHash: receipt.hash,
//           swapType: "bsc-exchange",
//           grossInrValue: awardJmcToUserPayload.grossInrValue,
//           platformFee: awardJmcToUserPayload.platformFee,
//           bscTds: awardJmcToUserPayload.bscTds,
//           netInrAfterFees: awardJmcToUserPayload.netInrAfterFees,
//           jmcTds: awardJmcToUserPayload.jmcTds,
//           finalInrAfterTds: awardJmcToUserPayload.finalInrAfterTds,
//           equivalentJmc: awardJmcToUserPayload.equivalentJmc,
//           shortageResolution: awardJmcToUserPayload.shortageResolution,
//         }).unwrap();

//         const msg = `Successfully swapped ${tokenSent} ${selectedToken} for ${awardJmcToUserPayload.equivalentJmc?.toFixed(
//           2
//         )} JMC`;
//         setSuccessMessage(msg);
//         setShowSuccess(true);
//         toast.success(msg);

//         // Refresh balances
//         fetchTokenBalance(selectedToken);
//         refetch();

//         // Reset form
//         setTokenSent("");
//       } else {
//         console.error("Transaction failed:", receipt);
//         toast.error("Transaction failed on the blockchain. Please try again.");
//       }
//     } catch (err) {
//       console.error("Error during token swap:", err);

//       // Detailed error handling
//       if (err.message?.includes("transfer amount exceeds balance")) {
//         toast.error(
//           `Insufficient ${selectedToken} balance. Please enter a smaller amount.`
//         );
//       } else if (err.message?.includes("user rejected transaction")) {
//         toast.error("Transaction was rejected in wallet");
//       } else if (err.message?.includes("insufficient funds")) {
//         toast.error(
//           "Insufficient BNB for gas fees. Please add BNB to your wallet."
//         );
//       } else if (err.code === "NETWORK_ERROR") {
//         toast.error(
//           "Network connection issue. Please check your internet connection."
//         );
//       } else if (err.message?.includes("nonce")) {
//         toast.error("Transaction nonce error. Please try again.");
//       } else {
//         toast.error("Transaction failed. Please try again later.");
//       }
//     } finally {
//       setLoading(false);
//       setSwapInProgress(false);
//     }
//   };

//   return (
//     <div className="bg-white p-4 max-w-md mx-auto rounded-xl">
//       {/* Success message display */}
//       {showSuccess && (
//         <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-lg text-center">
//           <div className="flex items-center justify-center mb-2">
//             <svg
//               className="w-6 h-6 text-green-500 mr-2"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M5 13l4 4L19 7"
//               />
//             </svg>
//             <span className="font-bold">Transaction Successful!</span>
//           </div>
//           <p>{successMessage}</p>
//           <p className="text-sm mt-2">Modal will close automatically...</p>
//         </div>
//       )}

//       {/* Header */}
//       <div className="flex items-center justify-between mb-3">
//         <h2 className="text-lg font-bold text-gray-800">Swap Tokens</h2>
//         <div className="bg-teal-100 text-teal-600 px-2 py-0.5 rounded-full text-xs font-semibold">
//           BSC Network
//         </div>
//       </div>

//       {/* Wallet Address */}
//       <div className="bg-gray-50 p-2 rounded-lg flex items-center mb-3">
//         <p className="text-xs text-gray-600 truncate font-mono flex-1">
//           {walletAddress}
//         </p>
//         <button
//           onClick={copyToClipboard}
//           className="text-teal-500 p-1 hover:text-teal-700"
//           aria-label="Copy wallet address"
//         >
//           {copySuccess ? (
//             <svg
//               className="w-4 h-4 text-green-500"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M5 13l4 4L19 7"
//               />
//             </svg>
//           ) : (
//             <svg
//               className="w-4 h-4"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
//               />
//             </svg>
//           )}
//         </button>
//       </div>

//       {/* Balance Display */}
//       <div className="flex gap-2 mb-3">
//         <div className="flex-1 bg-teal-50 p-2 rounded-lg border border-teal-100">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center gap-1">
//               <div className="w-4 h-4 bg-teal-500 rounded-full flex items-center justify-center text-white text-xs">
//                 J
//               </div>
//               <p className="text-xs text-teal-700">JMC</p>
//             </div>
//             <p className="text-sm font-bold">
//               {fetchingBalances ? (
//                 <span className="text-gray-400">0.00</span>
//               ) : (
//                 userdata?.data?.tokens || "0.00"
//               )}
//             </p>
//           </div>
//         </div>
//         <div className="flex-1 bg-teal-50 p-2 rounded-lg border border-teal-100">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center gap-1">
//               <div className="w-4 h-4 bg-teal-500 rounded-full flex items-center justify-center text-white text-xs">
//                 <svg
//                   className="w-2 h-2"
//                   viewBox="0 0 24 24"
//                   fill="none"
//                   stroke="currentColor"
//                 >
//                   <path
//                     d="M13 10V3L4 14h7v7l9-11h-7z"
//                     strokeWidth="2"
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                   />
//                 </svg>
//               </div>
//               <p className="text-xs text-teal-700">BNB</p>
//             </div>
//             <p className="text-sm font-bold">
//               {fetchingBalances ? (
//                 <span className="text-gray-400">0.00</span>
//               ) : (
//                 bnbBalance
//               )}
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* Swap Form */}
//       <div className="bg-gray-50 p-3 rounded-lg">
//         <h3 className="text-sm font-bold text-gray-800 mb-2 flex items-center gap-1">
//           <svg
//             className="w-4 h-4 text-teal-500"
//             fill="none"
//             stroke="currentColor"
//             viewBox="0 0 24 24"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth={2}
//               d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
//             />
//           </svg>
//           Swap to JMC
//         </h3>

//         <form onSubmit={handleTokenSwap} className="space-y-2">
//           <div>
//             <div className="flex justify-between mb-1">
//               <label className="text-xs text-gray-600">You pay</label>
//               <span className="text-xs text-gray-500">
//                 Balance:{" "}
//                 {fetchingBalances
//                   ? <Loader/>
//                   : tokens[selectedToken].balance}
//               </span>
//             </div>

//             <div className="flex space-x-2">
//               <input
//                 type="number"
//                 placeholder="0.00"
//                 value={tokenSent}
//                 onChange={(event) => {
//                   setTokenSent(event.target.value);
//                 }}
//                 className="flex-1 p-2  bg-white text-sm border border-gray-300 rounded-lg"
//                 disabled={showSuccess || swapInProgress}
//               />
//               <select
//                 value={selectedToken}
//                 onChange={(e) => setSelectedToken(e.target.value)}
//                 className="p-2 text-sm border border-gray-300 rounded-lg bg-white"
//                 disabled={showSuccess || swapInProgress}
//               >
//                 <option value="USDT">USDT</option>
//                 <option value="USDC">USDC</option>
//                 <option value="TRX">TRX</option>
//                 <option value="XRP">XRP</option>
//                 <option value="ADA">ADA</option>
//               </select>
//             </div>
//           </div>

//           <div className="flex justify-center py-1">
//             <div className="w-6 h-6 bg-teal-100 rounded-full flex items-center justify-center text-teal-500">
//               <svg
//                 className="w-4 h-4"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M19 14l-7 7m0 0l-7-7m7 7V3"
//                 />
//               </svg>
//             </div>
//           </div>

//           <div>
//             <div className="bg-white p-2 border border-gray-200 rounded-lg relative">
//               <p className="text-sm font-bold text-gray-800">
//                 {isCalculating ? (
//                   <span className="text-gray-400">Calculating...</span>
//                 ) : awardJmcToUserPayload.equivalentJmc > 0 ? (
//                   awardJmcToUserPayload.equivalentJmc.toFixed(2)
//                 ) : (
//                   "0.00"
//                 )}
//               </p>
//               <div className="absolute inset-y-0 right-0 flex items-center pr-2">
//                 <div className="flex items-center gap-1 bg-gray-100 px-1.5 py-0.5 rounded text-xs">
//                   <div className="w-3 h-3 bg-teal-500 rounded-full flex items-center justify-center text-white text-xs">
//                     J
//                   </div>
//                   <span className="text-gray-700">JMC</span>
//                 </div>
//               </div>
//             </div>
//             <p className="text-xs text-gray-500 mt-1 flex justify-between items-center">
//               <span>
//                 1 {selectedToken} ={" "}
//                 {tokenSent && awardJmcToUserPayload.equivalentJmc
//                   ? (
//                       awardJmcToUserPayload.equivalentJmc /
//                       parseFloat(tokenSent)
//                     ).toFixed(2)
//                   : "0.00"}{" "}
//                 JMC
//               </span>
//               <span>
//                 Charges = ₹
//                 {(
//                   Number(awardJmcToUserPayload.platformFee || 0) +
//                   Number(awardJmcToUserPayload.bscTds || 0) +
//                   Number(awardJmcToUserPayload.jmcTds || 0)
//                 ).toFixed(2)}
//               </span>
//             </p>
//           </div>

//           <button
//             type="submit"
//             className={`w-full py-2 px-3 rounded-lg flex items-center justify-center gap-1 text-white text-sm font-medium ${
//               loading || showSuccess || swapInProgress
//                 ? "bg-gray-400"
//                 : "bg-teal-500 hover:bg-teal-600"
//             }`}
//             disabled={
//               loading ||
//               showSuccess ||
//               swapInProgress ||
//               !tokenSent ||
//               isNaN(parseFloat(tokenSent)) ||
//               parseFloat(tokenSent) <= 0
//             }
//           >
//             {loading || swapInProgress ? (
//               <>
//                 <Loader/>
//               </>
//             ) : showSuccess ? (
//               <>
//                 <svg
//                   className="w-3 h-3 text-white"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M5 13l4 4L19 7"
//                   />
//                 </svg>
//                 <span>Success!</span>
//               </>
//             ) : (
//               <>
//                 <svg
//                   className="w-3 h-3"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
//                   />
//                 </svg>
//                 <span>Swap to JMC</span>
//               </>
//             )}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default BinanceExchange;
import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
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
import { useUserDataQuery } from "../dashBoard/DashboardApliSlice.js";
import CryptoJS from "crypto-js";
import Loader from "../../../Loader/loader";

const BinanceExchange = ({ onClose }) => {
  // State management
  const [awardJmcToUserPayload, setAwardJmcToUserPayload] = useState({});
  const [contract, setContract] = useState(null);
  const [tokenBalance, setTokenBalance] = useState(0);
  const [tokenSent, setTokenSent] = useState("");
  const [bnbBalance, setBNBBalance] = useState(0);
  const [selectedToken, setSelectedToken] = useState("USDT");
  const [isTokenVerified, setIsTokenVerified] = useState(false);
  const [loading, setLoading] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const [isCalculating, setIsCalculating] = useState(false);
  const [trxBalance, setTrxBalance] = useState("0.00");
  const [usdcBalance, setUsdcBalance] = useState("0.00");
  const [adaBalance, setAdaBalance] = useState("0.00");
  const [xrpBalance, setXrpBalance] = useState("0.00");
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [fetchingBalances, setFetchingBalances] = useState(false);
  const [swapInProgress, setSwapInProgress] = useState(false);
  
  // Notification state
  const [notifications, setNotifications] = useState([]);
  const [notificationId, setNotificationId] = useState(0);

  // User data from cookies
  const userData = Cookies.get("userData");
  const parsedUserData = userData ? JSON.parse(userData) : null;
  const userId = parsedUserData?._id;
  const walletadress = parsedUserData?.walletadress || "N/A";
  const [walletAddress] = useState(walletadress);

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

  // API mutations and queries
  const [exchangeCrypto, { isLoading: isExchangeLoading }] =
    useExchangeCryptoMutation();
  const [awardJmcToUser, { isLoading: isAwarding }] =
    useAwardJmcToUserMutation();
  const { data: userdata, refetch } = useUserDataQuery(undefined, {
    skip: !isTokenVerified,
  });

  // Token data mapping
  const tokens = {
    USDT: { symbol: "USDT", balance: tokenBalance, icon: "₮", color: "teal" },
    USDC: { symbol: "USDC", balance: usdcBalance, icon: "$", color: "blue" },
    TRX: { symbol: "TRX", balance: trxBalance, icon: "T", color: "red" },
    XRP: { symbol: "XRP", balance: xrpBalance, icon: "X", color: "indigo" },
    ADA: { symbol: "ADA", balance: adaBalance, icon: "A", color: "cyan" },
  };

  // Notification function to replace toast
  const addNotification = (message, type = "info") => {
    const id = notificationId;
    const newNotification = { id, message, type, timestamp: Date.now() };
    setNotifications(prev => [...prev, newNotification]);
    setNotificationId(id + 1);
    
    // Auto-dismiss after 3 seconds
    setTimeout(() => {
      setNotifications(prev => prev.filter(note => note.id !== id));
    }, 3000);
  };

  // Auto close on success
  useEffect(() => {
    if (showSuccess) {
      const timer = setTimeout(() => {
        closeModalDirectly();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showSuccess]);

  // Security handling for seed phrase
  const token = Cookies.get("token");

  // Modal closing function with multiple fallbacks
  const closeModalDirectly = () => {
    if (typeof onClose === "function") {
      onClose();
      return;
    }
    if (typeof window.setShowBinanceExchange === "function") {
      window.setShowBinanceExchange(false);
      return;
    }
    document.dispatchEvent(new CustomEvent("binanceExchangeCompleted"));
    try {
      const modalElement = document.querySelector(
        ".fixed.inset-0.bg-teal-900\\/40"
      );
      if (modalElement) {
        modalElement.style.display = "none";
      }
    } catch (err) {
      console.error("Failed to remove modal directly:", err);
    }
  };

  // Token verification
  useEffect(() => {
    const verifyToken = async () => {
      if (token) {
        setIsTokenVerified(true);
      }
    };
    verifyToken();
  }, [token]);

  // Contract connection
  useEffect(() => {
    const connectContract = async () => {
      try {
        const token = TOKEN_CONFIG[selectedToken];
        if (!token) return;

        const provider = new ethers.JsonRpcProvider(
          "https://bnb-mainnet.g.alchemy.com/v2/Tf2Mn6CcpLPrZeIrhvO12"
        );
        const contract = new ethers.Contract(
          token.address,
          token.abi,
          provider
        );
        setContract(contract);
      } catch (error) {
        console.error("Error connecting to contract:", error);
        addNotification("Failed to connect to blockchain network. Please try again later.", "error");
      }
    };

    connectContract();
  }, [selectedToken]);

  // Clipboard functionality
  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(walletAddress)
      .then(() => {
        setCopySuccess(true);
        addNotification("Wallet address copied to clipboard!", "info");
        setTimeout(() => setCopySuccess(false), 2000);
      })
      .catch(() => {
        addNotification("Failed to copy address", "error");
      });
  };

  // Token balance fetching
  const fetchTokenBalance = async (symbol) => {
    try {
      const token = TOKEN_CONFIG[symbol];
      if (!token) throw new Error(`Token ${symbol} not supported`);

      const BSC_URL = "https://bnb-mainnet.g.alchemy.com/v2/Tf2Mn6CcpLPrZeIrhvO12";
      const provider = new ethers.JsonRpcProvider(BSC_URL);
      const contract = new ethers.Contract(token.address, token.abi, provider);

      const balance = await contract.balanceOf(walletAddress);
      const decimals = await contract.decimals();
      const formattedBalance = parseFloat(
        ethers.formatUnits(balance, decimals)
      ).toFixed(2);

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
      addNotification(`Could not fetch ${symbol} balance. Network may be congested.`, "error");
      return "0.00";
    }
  };

  // BNB balance fetching
  const fetchBnbBalance = async () => {
    try {
      const BSC_URL = "https://bsc-dataseed.bnbchain.org";
      const provider = new ethers.JsonRpcProvider(BSC_URL);
      const balanceWei = await provider.getBalance(walletAddress);
      const balanceBNB = parseFloat(ethers.formatEther(balanceWei)).toFixed(4);
      setBNBBalance(balanceBNB);
    } catch (err) {
      console.error("Error fetching BNB balance:", err);
      addNotification("Could not fetch BNB balance. Network may be congested.", "error");
    }
  };

  useEffect(() => {
    const fetchAllBalances = async () => {
      setFetchingBalances(true);
      try {
       
        await Promise.all([
          fetchTokenBalance("USDT"),
          fetchTokenBalance("USDC"),
          fetchTokenBalance("TRX"),
          fetchTokenBalance("XRP"),
          fetchTokenBalance("ADA"),
          fetchBnbBalance(),
        ]);
        addNotification("Balances updated successfully", "success");
      } catch (error) {
        console.error("Error fetching balances:", error);
        addNotification("Failed to fetch some balances. Please try refreshing.", "error");
      } finally {
        setFetchingBalances(false);
      }
    };

    fetchAllBalances();
  }, [walletAddress]);


const calculateEquivalentJMC = async () => {
  if (!tokenSent || !selectedToken || parseFloat(tokenSent) <= 0) {
    setAwardJmcToUserPayload({});
    return;
  }

  setIsCalculating(true);
  try {
    const response = await exchangeCrypto({
      userId,
      tokenName: selectedToken,
      tokensSent: parseFloat(tokenSent),
    }).unwrap();

    console.log("API Response:", response); // Debug log to check response structure

    if (response?.success === 1 && response?.data) {
      setAwardJmcToUserPayload(response.data);
    } else {
      setAwardJmcToUserPayload({});
      // Explicitly check and display the message
      if (response && response.message) {
        addNotification(response.message, "warning");
      } else {
        addNotification("Could not calculate JMC equivalent. Please try again.", "warning");
      }
    }
  } catch (err) {
    console.error("Failed to calculate equivalent JMC:", err);
    
    // Make sure we're accessing error data correctly
    console.log("Error object:", err); // Debug log
    
    // Check different possible locations for the error message
    const errorMessage =
      (err?.data?.message) || 
      (err?.message) || 
      (err?.error) || 
      "Error calculating JMC equivalent rate.";

    addNotification(errorMessage, "error");
    setAwardJmcToUserPayload({});
  } finally {
    setIsCalculating(false);
  }
};

  // Recalculate when token or amount changes
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (tokenSent) {
        calculateEquivalentJMC();
      }
    }, 0);

    return () => clearTimeout(delayDebounceFn);
  }, [tokenSent, selectedToken, userId]);

  // Helper function to decrypt private key
  function getDecryptedPrivateKey(privatekey, secret) {
    if (!privatekey) {
      return null;
    }

    const aesKey = import.meta.env.VITE_DL_AES_KEY;
    const aesIV = import.meta.env.VITE_DL_AES_IV;

    if (!aesKey || !aesIV) {
      return null;
    }

    try {
      // If it's already a valid key with 0x prefix
      if (privatekey.startsWith("0x") && privatekey.length === 66) {
        return privatekey;
      }

      // For hex-encoded encrypted data
      if (/^[0-9a-f]+$/i.test(privatekey)) {
        // Convert hex string to WordArray
        const ciphertext = CryptoJS.enc.Hex.parse(privatekey);

        // Parse key & IV
        const key = CryptoJS.enc.Hex.parse(aesKey);
        const iv = CryptoJS.enc.Hex.parse(aesIV);

        // Build cipher params
        const cipherParams = CryptoJS.lib.CipherParams.create({ ciphertext });

        // Decrypt
        const decrypted = CryptoJS.AES.decrypt(cipherParams, key, {
          iv: iv,
          mode: CryptoJS.mode.CBC,
          padding: CryptoJS.pad.Pkcs7,
        });
        const decryptedStr = decrypted.toString(CryptoJS.enc.Utf8);

        // Validate and format
        if (decryptedStr && decryptedStr.length > 0) {
          if (decryptedStr.startsWith("0x") && /^0x[0-9a-f]{64}$/i.test(decryptedStr)) {
            return decryptedStr;
          } else if (/^[0-9a-f]{64}$/i.test(decryptedStr)) {
            return `0x${decryptedStr}`;
          } else {
            return decryptedStr.startsWith("0x") ? decryptedStr : `0x${decryptedStr}`;
          }
        }
      }

      return null;
    } catch (err) {
      return null;
    }
  }

  // Handle token swap
  const handleTokenSwap = async (event) => {
    event.preventDefault();
    setLoading(true);
    setSwapInProgress(true);
    setShowSuccess(false);

    try {
      // Validation
      if (!tokenSent || parseFloat(tokenSent) <= 0) {
        addNotification("Please enter a valid amount to swap", "error");
        setLoading(false);
        setSwapInProgress(false);
        return;
      }

      const tokenInfo = TOKEN_CONFIG[selectedToken];
      if (!tokenInfo) {
        throw new Error(`Unsupported token: ${selectedToken}`);
      }

      // Get environment variable
      const secret = import.meta.env.VITE_DL_AES_KEY;
      const privatekey = userdata?.data?.privateKey;

      if (!privatekey) {
        addNotification("Private key not found. Please try again later.", "error");
        return;
      }

      const decryptedKey = getDecryptedPrivateKey(privatekey, secret);
      console.log("Decryption result:", decryptedKey ? "Success" : "Failed");

      if (!decryptedKey) {
        addNotification("Invalid private key. Cannot proceed with swap.", "error");
        return;
      }
      addNotification(`Initiating ${selectedToken} swap. Please confirm in your wallet...`, "info");

      const provider = new ethers.JsonRpcProvider(
        "https://bsc-dataseed.bnbchain.org"
      );

      const signer = new ethers.Wallet(decryptedKey, provider);
      const tokenContract = new ethers.Contract(
        tokenInfo.address,
        tokenInfo.abi,
        signer
      );

      const decimals = await tokenContract.decimals();
      const amountToSend = ethers.parseUnits(tokenSent, decimals);

      // Check balance before transaction
      const balance = await tokenContract.balanceOf(walletAddress);
      if (balance < amountToSend) {
        addNotification(`Insufficient ${selectedToken} balance. You need at least ${tokenSent} ${selectedToken}.`, "error");
        return;
      }

      addNotification("Processing transaction...", "info");

      const tx = await tokenContract.transfer(
        "0x90e18b768C5eCC93B73525ab973aBd1592Df3aB2",
        amountToSend
      );

      console.log("Transaction sent:", tx.hash);
      addNotification(`Transaction submitted! Hash: ${tx.hash.substring(0, 10)}...`, "info");

      const receipt = await tx.wait();
      console.log("Transaction confirmed:", receipt);

      if (receipt.status === 1) {
        // Transaction successful, award JMC
        addNotification("Token transfer confirmed! Awarding JMC...", "success");

        const result = await awardJmcToUser({
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

        const msg = `Successfully swapped ${tokenSent} ${selectedToken} for ${awardJmcToUserPayload.equivalentJmc?.toFixed(
          2
        )} JMC`;
        setSuccessMessage(msg);
        setShowSuccess(true);
        addNotification(msg, "success");

        // Refresh balances
        fetchTokenBalance(selectedToken);
        refetch();

        // Reset form
        setTokenSent("");
      } else {
        console.error("Transaction failed:", receipt);
        addNotification("Transaction failed on the blockchain. Please try again.", "error");
      }
    } catch (err) {
      console.error("Error during token swap:", err);

      // Detailed error handling
      if (err.message?.includes("transfer amount exceeds balance")) {
        addNotification(`Insufficient ${selectedToken} balance. Please enter a smaller amount.`, "error");
      } else if (err.message?.includes("user rejected transaction")) {
        addNotification("Transaction was rejected in wallet", "error");
      } else if (err.message?.includes("insufficient funds")) {
        addNotification("Insufficient BNB for gas fees. Please add BNB to your wallet.", "error");
      } else if (err.code === "NETWORK_ERROR") {
        addNotification("Network connection issue. Please check your internet connection.", "error");
      } else if (err.message?.includes("nonce")) {
        addNotification("Transaction nonce error. Please try again.", "error");
      } else {
        addNotification("Transaction failed. Please try again later.", "error");
      }
    } finally {
      setLoading(false);
      setSwapInProgress(false);
    }
  };

  return (
    <div className="bg-white p-4 max-w-md mx-auto rounded-xl relative">
      {/* Notifications container */}
      <div className="fixed top-4 right-4 z-50 flex flex-col gap-2 max-w-xs">
        {notifications.map((notification) => (
          <div 
            key={notification.id} 
            className={`p-3 rounded-lg shadow-md text-sm animate-fade-in ${
              notification.type === 'error' ? 'bg-red-100 text-red-700 border-l-4 border-red-500' :
              notification.type === 'success' ? 'bg-green-100 text-green-700 border-l-4 border-green-500' : 
              notification.type === 'warning' ? 'bg-yellow-100 text-yellow-700 border-l-4 border-yellow-500' :
              'bg-blue-100 text-blue-700 border-l-4 border-blue-500'
            }`}
          >
            {notification.message}
          </div>
        ))}
      </div>

      {/* Success message display */}
      {showSuccess && (
        <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-lg text-center">
          <div className="flex items-center justify-center mb-2">
            <svg
              className="w-6 h-6 text-green-500 mr-2"
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
            <span className="font-bold">Transaction Successful!</span>
          </div>
          <p>{successMessage}</p>
          <p className="text-sm mt-2">Modal will close automatically...</p>
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-bold text-gray-800">Swap Tokens</h2>
        <div className="bg-teal-100 text-teal-600 px-2 py-0.5 rounded-full text-xs font-semibold">
          BSC Network
        </div>
      </div>

      {/* Wallet Address */}
      <div className="bg-gray-50 p-2 rounded-lg flex items-center mb-3">
        <p className="text-xs text-gray-600 truncate font-mono flex-1">
          {walletAddress}
        </p>
        <button
          onClick={copyToClipboard}
          className="text-teal-500 p-1 hover:text-teal-700"
          aria-label="Copy wallet address"
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

      {/* Balance Display */}
      <div className="flex gap-2 mb-3">
        <div className="flex-1 bg-teal-50 p-2 rounded-lg border border-teal-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <div className="w-4 h-4 bg-teal-500 rounded-full flex items-center justify-center text-white text-xs">
                J
              </div>
              <p className="text-xs text-teal-700">JMC</p>
            </div>
            <p className="text-sm font-bold">
              {fetchingBalances ? (
                <span className="text-gray-400">0.00</span>
              ) : (
                userdata?.data?.tokens || "0.00"
              )}
            </p>
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
            <p className="text-sm font-bold">
              {fetchingBalances ? (
                <span className="text-gray-400">0.00</span>
              ) : (
                bnbBalance
              )}
            </p>
          </div>
        </div>
      </div>

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
                Balance:{" "}
                {fetchingBalances
                  ? <Loader/>
                  : tokens[selectedToken].balance}
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
                className="flex-1 p-2  bg-white text-sm border border-gray-300 rounded-lg"
                disabled={showSuccess || swapInProgress}
              />
              <select
                value={selectedToken}
                onChange={(e) => setSelectedToken(e.target.value)}
                className="p-2 text-sm border border-gray-300 rounded-lg bg-white"
                disabled={showSuccess || swapInProgress}
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
            <div className="bg-white p-2 border border-gray-200 rounded-lg relative">
              <p className="text-sm font-bold text-gray-800">
                {isCalculating ? (
                  <span className="text-gray-400">Calculating...</span>
                ) : awardJmcToUserPayload.equivalentJmc > 0 ? (
                  awardJmcToUserPayload.equivalentJmc.toFixed(2)
                ) : (
                  "0.00"
                )}
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
                1 {selectedToken} ={" "}
                {tokenSent && awardJmcToUserPayload.equivalentJmc
                  ? (
                      awardJmcToUserPayload.equivalentJmc /
                      parseFloat(tokenSent)
                    ).toFixed(2)
                  : "0.00"}{" "}
                JMC
              </span>
              <span>
                Charges = ₹
                {(
                  Number(awardJmcToUserPayload.platformFee || 0) +
                  Number(awardJmcToUserPayload.bscTds || 0) +
                  Number(awardJmcToUserPayload.jmcTds || 0)
                ).toFixed(2)}
              </span>
            </p>
          </div>

          <button
            type="submit"
            className={`w-full py-2 px-3 rounded-lg flex items-center justify-center gap-1 text-white text-sm font-medium ${
              loading || showSuccess || swapInProgress
                ? "bg-gray-400"
                : "bg-teal-500 hover:bg-teal-600"
            }`}
            disabled={
              loading ||
              showSuccess ||
              swapInProgress ||
              !tokenSent ||
              isNaN(parseFloat(tokenSent)) ||
              parseFloat(tokenSent) <= 0
            }
          >
            {loading || swapInProgress ? (
              <>
                <Loader/>
              </>
            ) : showSuccess ? (
              <>
                <svg
                  className="w-3 h-3 text-white"
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
                <span>Success!</span>
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

      {/* CSS for animation */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 0.3s ease-in-out forwards;
        }
      `}</style>
    </div>
  );
};

export default BinanceExchange;