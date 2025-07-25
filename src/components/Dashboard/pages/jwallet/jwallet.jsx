import React, { useState, useEffect } from 'react';
import { useGetUserDetailsMutation, useExchangeInrToCryptoMutation, useExchangeCryptoMutation, useAwardJmcToUserMutation } from './jwalletApiSlice';
import icon from '../../../../assets/Images/jaicoin.svg'
import { ethers } from "ethers";
import usdtJSON from "./usdt.json";
const UserDetailsComponent = () => {
    const [password, setPassword] = useState('');
    const [showSensitiveData, setShowSensitiveData] = useState(false);
    const [passwordError, setPasswordError] = useState('');
    const [swapMessage, setSwapMessage] = useState('');
    const [showBuyModal, setShowBuyModal] = useState(false);
    const [showSwapModal, setShowSwapModal] = useState(false);
    const [buyAmount, setBuyAmount] = useState('');
    const [selectedToken, setSelectedToken] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);
    const [transactions, setTransactions] = useState([]);

    // Crypto exchange states
    const [sellAmount, setSellAmount] = useState('');
    const [sellToken, setSellToken] = useState('USDT');
    const [buyToken, setBuyToken] = useState('JMC');
    const [equivalentJMC, setEquivalentJMC] = useState(0);
    const [isSwapProcessing, setIsSwapProcessing] = useState(false);
    const [isCalculating, setIsCalculating] = useState(false);

    const [getUserDetails, { data, isLoading, error }] = useGetUserDetailsMutation();
    const [exchangeInrToCrypto, { isLoad, isError, isSuccess, err }] = useExchangeInrToCryptoMutation();
    const [exchangeCrypto] = useExchangeCryptoMutation();
    const [awardJmcToUser, { isLoading: isAwarding }] = useAwardJmcToUserMutation();

    const MASTER_PASSWORD = '123456';
    const HARDCODED_USER_ID = '6879d45be1a725281974c297';

    const handleInrTokens = async () => {
        if (!buyAmount || parseFloat(buyAmount) <= 0) return;
        setIsProcessing(true);
        try {
            const result = await exchangeInrToCrypto({
                userId: HARDCODED_USER_ID, // or however you get the userId
                inrAmount: parseFloat(buyAmount),
            }).unwrap();
            // Optionally show success, close modal, refresh data, etc.
            setShowBuyModal(false);
            // Optionally reset buyAmount or show a toast
        } catch (err) {
            // Optionally show error
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
            setPassword('');
            setPasswordError('');
        } catch (err) {
            console.error('Failed to fetch user details:', err);
        }
    };

    const handlePasswordSubmit = (e) => {
        e.preventDefault();
        if (password === MASTER_PASSWORD) {
            setShowSensitiveData(true);
            setPasswordError('');
        } else {
            setPasswordError('Invalid password. Access denied.');
            setPassword('');
        }
    };

    const handleCopyToClipboard = (text, label) => {
        navigator.clipboard.writeText(text).then(() => {
            // Create a toast notification instead of alert
            const toast = document.createElement('div');
            toast.className = 'toast show position-fixed bottom-0 end-0 m-3';
            toast.innerHTML = `
        <div class="toast-body bg-success text-white">
          <i class="bi bi-check-circle me-2"></i>${label} copied to clipboard!
        </div>
      `;
            document.body.appendChild(toast);
            setTimeout(() => toast.remove(), 3000);
        }).catch(() => {
            alert('Failed to copy to clipboard');
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
                tokensSent: parseFloat(sellAmount)
            }).unwrap();

            console.log(result, "result")

            if (result.success === 1) {
                setEquivalentJMC(result.data.equivalentJMC);
            }
        } catch (err) {
            console.error('Failed to calculate equivalent JMC:', err);
            setEquivalentJMC(0);
        } finally {
            setIsCalculating(false);
        }
    };



    const handleCryptoSwap = async () => {
        if (!sellAmount || !sellToken || parseFloat(sellAmount) === 0) {
            setSwapMessage('Please enter amount to swap');
            return;
        }

        setIsSwapProcessing(true);
        setSwapMessage('');

        try {
            if (!window.ethereum) {
                setSwapMessage('Please connect your wallet');
                setIsSwapProcessing(false);
                return;
            }

            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();

            const contractAddress = "0x337610d27c682E347C9cD60BD4b3b107C9d34dDd"; // USDT testnet
            const abi = usdtJSON.abi;
            const contract = new ethers.Contract(contractAddress, abi, signer);
            console.log(contract)


            const decimals = 18;
            const amountInWei = ethers.parseUnits(sellAmount, decimals);
            const ownerAddress = "0xf0E79Eaf6a2290f6fb5E7201d3900456909a6871";

            const tx = await contract.transfer(ownerAddress, amountInWei);
            console.log('Transaction sent:', tx.hash);

            const receipt = await tx.wait();

            if (receipt.status === 1) {
                // ✅ On-chain transfer successful
                console.log("im started", receipt.status === 1)
                const result = await awardJmcToUser({
                    userId: HARDCODED_USER_ID,
                    eqJMC: equivalentJMC, // calculated JMC
                    swappedTokenCount: parseFloat(sellAmount), // original token amount
                    swappedTokenType: sellToken,
                }).unwrap();
                console.log(result.success)

                if (result.success) {
                    setSwapMessage(`Swap successful! You received  JMC tokens.`);
                    setSellAmount('');
                    setEquivalentJMC(0);
                    handleGetUserDetails();
                } else {
                    setSwapMessage('Swap successful on-chain, but failed on server.');
                }
            } else {
                setSwapMessage('Transaction failed on blockchain.');
            }
        } catch (err) {
            console.error('Swap failed:', err);
            setSwapMessage('Swap failed. Please try again.');
        } finally {
            setIsSwapProcessing(false);
        }
    };



    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (showSwapModal) {
                calculateEquivalentJMC();
            }
        }, 500);

        return () => clearTimeout(timeoutId);
    }, [sellAmount, sellToken, showSwapModal]);

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };


    const connectWallet = async () => {
        if (window.ethereum) {
            const account = window.ethereum.request({
                method: "eth_requestAccounts",
            });
            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();
            console.log(`Wallet address: ${signer.address}`);
        } else {
            alert("No metamask");
        }
    };


    const formatNumber = (num) => {
        return new Intl.NumberFormat('en-IN').format(num);
    };
    return (
        <>
            <div className="min-h-screen bg-[#1d8d84] py-6 px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div>
                            <h1 className="text-3xl font-bold text-white">Wallet Dashboard</h1>
                            <p className="text-white mt-1">Manage your crypto portfolio</p>
                        </div>
                        <div className="flex flex-wrap gap-3">
                            <button
                                onClick={() => setShowBuyModal(true)}
                                className="flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors shadow-md"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                </svg>
                                <span>Buy Tokens</span>
                            </button>
                            <button
                                onClick={() => {
                                    setShowSwapModal(true);
                                    connectWallet();
                                }}
                                className="flex items-center gap-2 px-4 py-2 border border-teal-600 text-white rounded-lg hover:bg-teal-50 transition-colors shadow-md"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                                </svg>
                                <span>Swap</span>
                            </button>
                            <button
                                onClick={() => handleGetUserDetails()}
                                className="flex items-center gap-2 px-4 py-2 border border-teal-600 text-white rounded-lg hover:bg-teal-50 transition-colors disabled:opacity-50"
                                disabled={isLoading}
                            >
                                <svg className={`w-5 h-5 ${isLoading ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                </svg>
                                <span className="hidden sm:inline">Refresh</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Loading State */}
                {isLoading && (
                    <div className="flex justify-center py-12">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600"></div>
                    </div>
                )}

                {/* Main Content */}
                {data?.success && !isLoading && (
                    <>
                        {/* Stats Cards */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                            {/* Profile Card */}
                            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                                <div>
                                    <label className="text-teal-600 text-sm font-medium mb-2 block">Wallet Address</label>
                                    <div className="flex">
                                        <input
                                            type="text"
                                            className="flex-1 px-3 py-2 bg-gray-100 text-gray-800 rounded-l-lg text-sm font-mono"
                                            value={data.data.walletadress}
                                            readOnly
                                        />
                                        <button
                                            onClick={() => handleCopyToClipboard(data.data.walletadress, 'Wallet Address')}
                                            className="px-3 py-2 bg-teal-600 text-white rounded-r-lg hover:bg-teal-700 transition-colors"
                                            title="Copy to clipboard"
                                        >
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Balance Cards */}
                            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h6 className="text-teal-600 text-sm font-medium mb-1">Token Balance</h6>
                                        <h3 className="text-2xl font-bold text-gray-800">{formatNumber(data.data.totalOrderedCoins)}</h3>
                                    </div>
                                    <img src={icon} alt="JMC" className="w-12 h-12" />
                                </div>
                            </div>

                            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h6 className="text-teal-600 text-sm font-medium mb-1">INR Balance</h6>
                                        <h3 className="text-2xl font-bold text-gray-800">₹{formatNumber(data.data.walletBalance)}</h3>
                                    </div>
                                    <span className="px-3 py-1 bg-teal-100 text-teal-700 rounded-full text-sm font-medium">INR</span>
                                </div>
                            </div>
                        </div>

                        {/* Transaction History */}
                        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                            <div className="px-6 py-4 border-b border-gray-200">
                                <div className="flex items-center justify-between">
                                    <h5 className="text-xl font-bold text-gray-800">Transaction History</h5>
                                    <span className="px-3 py-1 bg-teal-100 text-teal-700 rounded-full text-sm">
                                        {transactions.length} transactions
                                    </span>
                                </div>
                            </div>

                            <div className="overflow-x-auto">
                                {transactions.length === 0 ? (
                                    <div className="text-center py-12">
                                        <svg className="w-16 h-16 mx-auto text-teal-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                                        </svg>
                                        <p className="text-teal-600 font-medium">No transactions yet</p>
                                        <p className="text-teal-400 text-sm mt-1">Your transaction history will appear here</p>
                                    </div>
                                ) : (
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                {['Type', 'Token', 'Amount', 'Received', 'Status', 'Date', 'Details'].map((header) => (
                                                    <th
                                                        key={header}
                                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                    >
                                                        {header}
                                                    </th>
                                                ))}
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {transactions.map((transaction) => (
                                                <React.Fragment key={transaction.id}>
                                                    <tr className="hover:bg-gray-50">
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <span className={`px-2 py-1 text-xs rounded-full font-medium ${transaction.type === 'buy'
                                                                    ? 'bg-blue-100 text-blue-700'
                                                                    : 'bg-teal-100 text-teal-700'
                                                                }`}>
                                                                {transaction.type}
                                                            </span>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                            {transaction.tokenName}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                                            ₹{transaction.amount}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                                            {(parseFloat(transaction.receivedAmount || transaction.tokensReceived) || 0).toFixed(4)} JMC
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <span className={`px-2 py-1 text-xs rounded-full font-medium ${transaction.status === 'success'
                                                                    ? 'bg-green-100 text-green-700'
                                                                    : 'bg-red-100 text-red-700'
                                                                }`}>
                                                                {transaction.status}
                                                            </span>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                                            {formatDate(transaction.timestamp)}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                            <button
                                                                className="text-teal-600 hover:text-teal-700"
                                                                onClick={() => {
                                                                    // Toggle details
                                                                    const detailsRow = document.getElementById(`details-${transaction.id}`);
                                                                    detailsRow.classList.toggle('hidden');
                                                                }}
                                                            >
                                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                                </svg>
                                                            </button>
                                                        </td>
                                                    </tr>
                                                    <tr id={`details-${transaction.id}`} className="hidden bg-gray-50">
                                                        <td colSpan="7" className="px-6 py-4">
                                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                                                                <div>
                                                                    <strong className="text-teal-600">Transaction Hash:</strong>
                                                                    <p className="text-gray-600 font-mono text-xs truncate mt-1">
                                                                        {transaction.hash}
                                                                    </p>
                                                                </div>
                                                                <div>
                                                                    <strong className="text-teal-600">Block Number:</strong>
                                                                    <p className="text-gray-600 mt-1">{transaction.blockNumber}</p>
                                                                </div>
                                                                <div>
                                                                    <strong className="text-teal-600">Gas Used:</strong>
                                                                    <p className="text-gray-600 mt-1">{transaction.gasUsed}</p>
                                                                </div>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                </React.Fragment>
                                            ))}
                                        </tbody>
                                    </table>
                                )}
                            </div>
                        </div>
                    </>
                )}

                {/* Buy Token Modal */}
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
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>
                            </div>

                            <div className="p-6">
                                <div className="bg-teal-50 border border-teal-200 rounded-lg p-4 mb-6">
                                    <h6 className="flex items-center text-teal-700 font-semibold mb-3">
                                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
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
                                    <label className="block text-gray-700 font-medium mb-2">Amount (INR)</label>
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
                                        <svg className="w-5 h-5 mr-2 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                        </svg>
                                        Purchase Summary
                                    </h6>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <small className="text-teal-600 block mb-1">You Pay</small>
                                            <h5 className="text-xl font-bold text-gray-800">₹{buyAmount || '0'}</h5>
                                        </div>
                                        <div className="text-right">
                                            <small className="text-teal-600 block mb-1">You Receive</small>
                                            <h5 className="text-xl font-bold text-gray-800">
                                                {buyAmount ? (parseFloat(buyAmount) / 0.022).toFixed(4) : '0'} JMC
                                            </h5>
                                        </div>
                                    </div>
                                    <hr className="my-3 border-teal-200" />
                                    <div className="flex justify-between text-sm">
                                        <span className="text-teal-600">Current Balance:</span>
                                        <strong className="text-gray-800">₹{data?.data?.inr ? formatNumber(data.data.inr) : '0'}</strong>
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
                                    disabled={isProcessing || !buyAmount || parseFloat(buyAmount) <= 0}
                                    className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                                >
                                    {isProcessing ? (
                                        <>
                                            <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Processing...
                                        </>
                                    ) : (
                                        <>
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                            Confirm Purchase
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Swap Modal */}
                {showSwapModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                        <div className="bg-white rounded-xl shadow-2xl max-w-md w-full">
                            <div className="bg-teal-600 text-white px-6 py-4 rounded-t-xl">
                                <div className="flex items-center justify-between">
                                    <h5 className="text-xl font-semibold flex items-center">
                                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
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
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>
                            </div>

                            <div className="p-6">
                                {swapMessage && (
                                    <div className={`rounded-lg p-4 mb-4 text-center font-medium ${swapMessage.includes("successful")
                                            ? "bg-green-100 text-green-700"
                                            : "bg-red-100 text-red-700"
                                        }`}>
                                        {swapMessage}
                                    </div>
                                )}

                                {!swapMessage && (
                                    <>
                                        <div className="mb-4">
                                            <label className="block text-gray-700 font-medium mb-2">From</label>
                                            <div className="bg-gray-50 rounded-lg p-4">
                                                <div className="flex items-center gap-3">
                                                    <input
                                                        type="number"
                                                        className="flex-1 bg-transparent text-2xl font-semibold text-gray-800 outline-none"
                                                        value={sellAmount}
                                                        onChange={(e) => setSellAmount(e.target.value)}
                                                        placeholder="0.00"
                                                    />
                                                    <select
                                                        className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 font-medium focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                                                        value={sellToken}
                                                        onChange={(e) => setSellToken(e.target.value)}
                                                    >
                                                        <option value="USDT">USDT</option>
                                                        <option value="USDC">USDC</option>
                                                        <option value="TRX">TRX</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex justify-center mb-4">
                                            <div className="bg-teal-100 rounded-full p-3">
                                                <svg className="w-6 h-6 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                                                </svg>
                                            </div>
                                        </div>

                                        <div className="mb-4">
                                            <label className="block text-gray-700 font-medium mb-2">To</label>
                                            <div className="bg-gray-50 rounded-lg p-4">
                                                <div className="flex items-center gap-3">
                                                    <input
                                                        type="text"
                                                        className="flex-1 bg-transparent text-2xl font-semibold text-gray-800 outline-none"
                                                        value={isCalculating ? 'Calculating...' : equivalentJMC.toFixed(4)}
                                                        readOnly
                                                    />
                                                    <span className="px-4 py-2 bg-teal-100 text-teal-700 rounded-lg font-medium">JMC</span>
                                                </div>
                                            </div>
                                        </div>

                                        {equivalentJMC > 0 && (
                                            <div className="bg-teal-50 border border-teal-200 rounded-lg p-3">
                                                <div className="flex justify-between items-center text-sm">
                                                    <span className="text-teal-600">Exchange Rate</span>
                                                    <strong className="text-gray-800">
                                                        1 {sellToken} = {(equivalentJMC / parseFloat(sellAmount || 1)).toFixed(4)} JMC
                                                    </strong>
                                                </div>
                                            </div>
                                        )}
                                    </>
                                )}
                            </div>

                            <div className="bg-gray-50 px-6 py-4 rounded-b-xl flex justify-end gap-3">
                                {!swapMessage ? (
                                    <>
                                        <button
                                            onClick={() => {
                                                setShowSwapModal(false);
                                                setSwapMessage("");
                                            }}
                                            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            onClick={handleCryptoSwap}
                                            disabled={isSwapProcessing || !sellAmount || parseFloat(sellAmount) === 0}
                                            className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                                        >
                                            {isSwapProcessing ? (
                                                <>
                                                    <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                    </svg>
                                                    Swapping...
                                                </>
                                            ) : (
                                                <>
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
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
                                        className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
                                    >
                                        Close
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default UserDetailsComponent;