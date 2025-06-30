import React, { useState, useRef, useEffect } from 'react';
import { Copy, Upload } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from "react-toastify";
import Tesseract from 'tesseract.js';
import Qrcode from "../../../../assets/QR_CODE.png";

// Import your API hooks - adjust paths as needed
import { useUserDataQuery } from '../dashBoard/DashboardApliSlice';
import {
  useAddTransactionMutation,
  useCreatePaypalWalletOrderMutation,
  useTransferAvailableBalanceMutation,
} from "../wallet/walletApiSlice";

export default function AddMoneyToWallet() {
  // Default form data
  const defaultFormData = {
    upiId: "jaimaxcoin2024@upi",
    bankAccountHolderName: "JAISVIK SOFTWARE SOLUTIONS PVT LTD-HYD",
    bankAccountNumber: "50200109463200",
    bankIfscCode: "HDFC0002083",
    bankName: "HDFC",
    transactionId: "",
    screenshot: null,
    amount: "",
  };

  // Refs
  const fileInputRef = useRef(null);

  // Navigation
  const navigate = useNavigate();

  // State management
  const [formData, setFormData] = useState(defaultFormData);
  const [transactionId, setTransactionId] = useState('');
  const [amount, setAmount] = useState('');
  const [transferAmount, setTransferAmount] = useState('');
  const [file, setFile] = useState(null);
  const [activeTab, setActiveTab] = useState('UPI');
  const [copyNotification, setCopyNotification] = useState('');
  const [errors, setErrors] = useState({});
  const [paypalError, setPaypalError] = useState("");
  const [othersError, setOthersError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isTransactionIdRead, setIsTransactionIdRead] = useState(false);
  const [upiIdMatch, setUpiIdMatch] = useState(false);
  const [isToastShown, setIsToastShown] = useState(false);
  const [isProceed, setIsProceed] = useState(false);

  // API hooks
  const [addTransaction] = useAddTransactionMutation();
  const [createPaypalWalletOrder] = useCreatePaypalWalletOrderMutation();
  const [transferAvailableBalance] = useTransferAvailableBalanceMutation();
  const { data: userData, refetch } = useUserDataQuery();

  // Constants
  const countryCode = userData?.data?.countryCode || 91;
  const transactionPercentageValue = 3;

  // Validation function
  const validateField = (name, value) => {
    let error = "";
    const allowedTypes = ["image/png", "image/jpeg", "image/jpg"];

    switch (name) {
      case "transactionId":
        if (!value.trim()) {
          error = "Transaction ID is required";
        }
        break;
      case "amount":
        if (!value || isNaN(value) || parseFloat(value) <= 0) {
          error = "Please enter a valid amount greater than zero";
        }
        break;
      case "screenshot":
        if (!value) {
          error = "Screenshot is required";
        } else if (value && !allowedTypes.includes(value.type)) {
          error = "Only JPG / PNG files are allowed";
        }
        break;
      default:
        break;
    }

    setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
    return error === "";
  };
   const handleImageChange = (e) => {
    const file = e.target.files[0];
    extractDetailsFromImage(file);
    const isError = validateField("screenshot", file);
    if (!isError) {
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      setFormData((prev) => ({ ...prev, transactionId: "" }));
      setUpiIdMatch(true);
    } else {
      setFormData((prev) => ({ ...prev, screenshot: file }));
    }
  };

  // OCR Image processing
  const extractDetailsFromImage = (file) => {
    if (!file) return;

    setIsLoading(true);
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.result) {
        Tesseract.recognize(reader.result, "eng")
          .then(({ data: { text } }) => {
            console.log(text, "extracted");

            // Clean up the extracted text by replacing ¥ with ₹
            let cleanedText = text.replace(/¥/g, "₹");

            // Regex to extract Transaction ID details
            const extractedTransactionID = cleanedText.match(
              /Transaction ID[:\s]*(\w+)/i
            );

            const upiRefNoMatch = cleanedText.match(
              /UPI Ref(?:\.|erence)? No[:\s]*([\d\s]+)(?=\D|$)/i
            );

            // Extract and clean up the UPI reference number
            const upiRefNo = upiRefNoMatch
              ? upiRefNoMatch[1].replace(/\s+/g, "")
              : null;

            const transactionID = extractedTransactionID
              ? extractedTransactionID[1]
              : upiRefNo
              ? upiRefNo
              : null;

            if (!transactionID) {
              setIsLoading(false);
              setTransactionId("");
              setIsTransactionIdRead(true);
            } else {
              setTransactionId(transactionID);
              setIsLoading(false);
              setIsTransactionIdRead(false);
            }
          })
          .catch((error) => {
            console.error("Error during OCR:", error);
            setIsLoading(false);
          });
      }
    };

    reader.readAsDataURL(file);
  };

  // File change handler
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    
    if (selectedFile) {
      extractDetailsFromImage(selectedFile);
      const isError = validateField("screenshot", selectedFile);
      if (!isError) {
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
        setTransactionId("");
        setUpiIdMatch(true);
      }
    }
  };

  // Input change handlers
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Additional validation for specific fields
    if (name === "amount" && !/^[0-9]*$/.test(value)) {
      return;
    }
    if (name === "transactionId" && !/^[A-Za-z0-9]*$/.test(value)) {
      return;
    }

    // Convert transactionId to uppercase
    if (name === "transactionId") {
      const upperCaseValue = value.toUpperCase();
      setTransactionId(upperCaseValue);
    } else if (name === "amount") {
      setAmount(value);
    }

    validateField(name, value);
  };

  const handleAmountChange = (e) => {
    let inputValue = e.target.value;
    inputValue = inputValue.replace(/[^0-9 ]/g, "");
    setAmount(inputValue);
    if (inputValue) {
      setPaypalError("");
      setIsProceed(false);
    }
  };

  const handleTransferAmountChange = (e) => {
    let inputValue = e.target.value;
    inputValue = inputValue.replace(/[^0-9 ]/g, "");
    setTransferAmount(inputValue);
    if (inputValue) {
      setOthersError("");
    }
  };

  // Copy functions
  const handleCopyUPI = () => {
    navigator.clipboard.writeText('jaimaxcoin2024@upi');
    showCopyNotification('UPI ID copied!');
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    showCopyNotification('Copied to clipboard!');
  };

  const showCopyNotification = (message) => {
    setCopyNotification(message);
    setTimeout(() => setCopyNotification(''), 2000);
  };

  // Validation for different payment methods
  const validate = (paymentMethod) => {
    let isError;

    if (paymentMethod === "currency") {
      if (!amount) {
        setPaypalError("Please Enter Amount");
        isError = true;
      } else if (+amount <= 0) {
        isError = true;
        setPaypalError("Please Enter Valid Amount");
      } else {
        isError = false;
        setPaypalError("");
      }
    } else {
      if (!transferAmount) {
        setOthersError("Please Enter Transfer Amount");
        isError = true;
      } else if (+transferAmount <= 0) {
        isError = true;
        setOthersError("Please Enter Valid Amount");
      } else if (+transferAmount > +userData?.data?.Inr) {
        isError = true;
        setOthersError("Insufficient Balance");
      } else {
        isError = false;
        setOthersError("");
      }
    }
    return isError;
  };

  // Calculate transaction fee
  const calculateTransactionFee = () => {
    const transactionFee = (+amount * transactionPercentageValue) / 100;
    return transactionFee || 0;
  };

  // Submit handlers
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Use current state values for validation
    const currentTransactionId = transactionId || 'Autofill';
    const currentAmount = amount;
    const currentFile = file;

    // Validate all fields before submission
    const isTransactionIdValid = validateField("transactionId", currentTransactionId);
    const isScreenshotValid = validateField("screenshot", currentFile);
    const isAmountValid = validateField("amount", currentAmount);

    if (!(isTransactionIdValid && isScreenshotValid && isAmountValid)) {
      setIsToastShown(true);
      if (!isToastShown) {
        toast.error("Please fill in all required fields.");
      } else {
        toast.dismiss();
        toast.error("Please fill in all required fields.");
      }
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append("transactionId", currentTransactionId);
    formDataToSend.append("transactionAmount", currentAmount);
    formDataToSend.append("screenshot", currentFile);

    setLoading(true);
    try {
      const res = await addTransaction(formDataToSend).unwrap();
      if (res?.status_code === 200) {
        toast.success(res?.message || "Form submitted successfully!");
        // Reset form
        setTransactionId('Autofill');
        setAmount('');
        setFile(null);
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
        navigate("/wallet");
      }
    } catch (error) {
      console.log("Error submitting form:", error);
      setIsToastShown(true);
      if (!isToastShown) {
        toast.error(error.data.message || "Form submission failed.");
      } else {
        toast.dismiss();
        toast.error(error.data.message || "Form submission failed.");
      }
    } finally {
      setLoading(false);
    }
  };

  // PayPal handlers
  const proceedPaypalAddMoney = async () => {
    if (validate("currency")) {
      return;
    }
    setIsProceed(true);
  };

  const addMoneyThroughPaypal = async () => {
    setLoading(true);

    const payload = {
      amount: amount,
    };

    try {
      const res = await createPaypalWalletOrder(payload).unwrap();
      window.location.href = res?.data?.forwardLink;
    } catch (error) {
      console.error("Error while creating PayPal wallet order:", error);
    } finally {
      setLoading(false);
    }
  };

  // Transfer money handler
  const onSubmitTransferMoney = async () => {
    if (validate("others")) {
      return;
    }

    const payload = {
      transferAmount: +transferAmount,
    };

    setLoading(true);
    try {
      const response = await transferAvailableBalance(payload).unwrap();
      toast.success(response?.message);
      navigate("/wallet");
    } catch (error) {
      toast.error(error?.data?.message || "Error while transferring funds");
    } finally {
      setLoading(false);
    }
  };

  // Effect to refetch user data
  useEffect(() => {
    refetch();
  }, [refetch]);

  return (
    <div className="h-screen text-white p-4 sm:p-6" style={{ backgroundColor: '#1d8e85' }}>
      {copyNotification && (
        <div className="fixed top-3 right-3 bg-white/10 text-lime-400 px-3 py-1 rounded-lg border border-lime-400 z-50 text-sm">
          {copyNotification}
        </div>
      )}

      <div className="max-w-7xl mx-auto px-2">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold mb-1 text-lime-300">Add Funds</h1>
          <p className="text-white/80 text-sm">Choose your preferred payment method</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-stretch">

          {/* Payment Method Card */}
         <div className="rounded-xl p-4 border border-white/20 shadow-lg bg-[#1d8e85] h-full flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-semibold mb-3">Payment Method</h3>
              <div className="flex gap-4 mb-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="paymentMethod"
                    checked={activeTab === 'UPI'}
                    onChange={() => setActiveTab('UPI')}
                    className="w-4 h-4 accent-lime-400"
                  />
                  <span className="text-sm">{countryCode === 91 ? "UPI" : "PayPal"}</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="paymentMethod"
                    checked={activeTab === 'Others'}
                    onChange={() => setActiveTab('Others')}
                    className="w-4 h-4 accent-lime-400"
                  />
                  <span className="text-sm">Others</span>
                </label>
              </div>

              {activeTab === 'UPI' && countryCode === 91 && (
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-semibold mb-1">UPI ID</label>
                    <div className="relative">
                      <input
                        type="text"
                        value="jaimaxcoin2024@upi"
                        readOnly
                        className="w-full bg-white/20 px-3 py-2 border border-white/30 rounded-lg pr-10 text-white text-sm focus:outline-none"
                      />
                      <button
                        onClick={handleCopyUPI}
                        className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-lime-500/20 hover:bg-lime-400/30 p-1 rounded-md text-white"
                        title="Copy UPI ID"
                      >
                        <Copy size={14} />
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-1">Amount</label>
                    <input
                      type="number"
                      value={amount}
                      onChange={handleAmountChange}
                      className="w-full bg-white/20 px-3 py-2 border border-white/30 rounded-lg text-white text-sm focus:outline-none"
                      placeholder="Enter amount"
                    />
                    {errors.amount && (
                      <div className="text-red-400 text-xs mt-1">{errors.amount}</div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-1">Transaction ID</label>
                    <input
                      type="text"
                      value={transactionId}
                      onChange={handleChange}
                      name="transactionId"
                      disabled={!isTransactionIdRead}
                      placeholder={!isTransactionIdRead ? "Autofill" : "Enter transaction ID"}
                      className="w-full bg-white/20 px-3 py-2 border border-white/30 rounded-lg text-white text-sm focus:outline-none"
                    />
                    {errors.transactionId && (
                      <div className="text-red-400 text-xs mt-1">{errors.transactionId}</div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-1">Payment Screenshot</label>
                    <input
                      type="file"
                      id="file-upload"
                      className="hidden"
                      onChange={handleImageChange}
                      accept="image/*"
                      ref={fileInputRef}
                    />
                    <label
                      htmlFor="file-upload"
                      className="flex justify-between items-center bg-white/20 hover:bg-white/30 px-3 py-2 rounded-lg cursor-pointer border border-white/30 text-white"
                    >
                      <span className="text-sm truncate">{file ? file.name : 'Choose screenshot'}</span>
                      <Upload size={14} className="text-lime-400" />
                    </label>
                    {errors.screenshot && (
                      <div className="text-red-400 text-xs mt-1">{errors.screenshot}</div>
                    )}
                  </div>
                </div>
              )}

              {activeTab === 'UPI' && countryCode !== 91 && (
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-semibold mb-1">Enter Amount <span className="text-red-400">*</span></label>
                    <input
                      type="text"
                      value={amount}
                      onChange={handleAmountChange}
                      className="w-full bg-white/20 px-3 py-2 border border-white/30 rounded-lg text-white text-sm focus:outline-none"
                      placeholder="Enter amount"
                    />
                    {paypalError && (
                      <div className="text-red-400 text-xs mt-1">{paypalError}</div>
                    )}
                  </div>

                  {isProceed && (
                    <div className="bg-white/10 p-3 rounded-lg text-xs">
                      <p className="mb-1">Transaction Amount: <span className="font-bold">${amount}.00</span></p>
                      <p className="mb-1">Transaction Fee: <span className="font-bold">${calculateTransactionFee()}</span></p>
                      <p className="mb-2">Total Amount: <span className="font-bold">${calculateTransactionFee() + +amount}</span></p>
                      <p className="text-white/80">Note: A transaction fee of {transactionPercentageValue}% applies to each transaction.</p>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'Others' && (
                <div className="space-y-3 text-sm">
                  <p className="text-lg font-bold text-white">
                    Available Balance: {countryCode === 91 ? "₹" : "$"}{(+userData?.data?.Inr || 0)?.toFixed(2)}
                  </p>
                  <p className="text-white/70">(Referral + Super Bonus)</p>

                  <div>
                    <label className="block font-semibold mb-1">Enter Amount To Transfer<span className="text-red-500">*</span></label>
                    <input
                      type="text"
                      value={transferAmount}
                      onChange={handleTransferAmountChange}
                      placeholder="Enter Transfer Amount"
                      className="w-full bg-white/20 px-3 py-2 border border-white/30 rounded-lg text-white focus:outline-none"
                    />
                    {othersError && (
                      <div className="text-red-400 text-xs mt-1">{othersError}</div>
                    )}
                  </div>
                </div>
              )}
            </div>

            <div className="mt-4">
              {activeTab === 'UPI' && countryCode === 91 && (
                <button 
                  onClick={handleSubmit}
                  disabled={loading || isLoading}
                  className="w-full bg-lime-400 text-black font-bold py-2 rounded-full hover:bg-lime-300 transition duration-200 disabled:opacity-50"
                >
                  {loading ? 'Submitting...' : 'Submit Payment'}
                </button>
              )}
              
              {activeTab === 'UPI' && countryCode !== 91 && (
                <button 
                  onClick={isProceed ? addMoneyThroughPaypal : proceedPaypalAddMoney}
                  disabled={loading}
                  className="w-full bg-lime-400 text-black font-bold py-2 rounded-full hover:bg-lime-300 transition duration-200 disabled:opacity-50"
                >
                  {loading ? 'Processing...' : (isProceed ? 'Add Funds' : 'Proceed')}
                </button>
              )}
              
              {activeTab === 'Others' && (
                <button 
                  onClick={onSubmitTransferMoney}
                  disabled={loading}
                  className="w-full bg-lime-400 text-black font-bold py-2 rounded-full hover:bg-lime-300 transition duration-200 disabled:opacity-50"
                >
                  {loading ? 'Transferring...' : 'Transfer'}
                </button>
              )}
            </div>
          </div>

          {/* QR Code Card */}
          {activeTab === 'UPI' && countryCode === 91 && (
            <div className="rounded-xl p-4 border border-white/20 shadow-lg bg-[#1d8e85] h-full flex flex-col justify-between">
              <div className="w-full max-w-xs">
                <img
                  src={Qrcode}
                  alt="QR Code"
                  className="w-full h-full object-contain rounded-lg"
                />
              </div>
            </div>
          )}

          {/* Bank Details Card */}
          {activeTab === 'UPI' && countryCode === 91 && (
           <div className="rounded-xl p-4 border border-white/20 shadow-lg bg-[#1d8e85] h-full flex flex-col justify-between">
              <div>
                <h2 className="text-lg font-bold mb-3 text-center lg:text-left">Bank Details</h2>
                <div className="space-y-2 text-sm">
                  {[
                    ['Account Holder', 'JAISVIK SOFTWARE SOLUTIONS PVT LTD-HYD'],
                    ['Account Number', '50200109463200'],
                    ['IFSC Code', 'HDFC0002083'],
                    ['Bank Name', 'HDFC Bank']
                  ].map(([label, value]) => (
                    <div key={label} className="flex justify-between items-center">
                      <div>
                        <p className="font-semibold">{label}</p>
                        <p className="font-mono break-all">{value}</p>
                      </div>
                      <button
                        onClick={() => handleCopy(value)}
                        className="bg-lime-500/20 hover:bg-lime-400/30 px-2 py-1 rounded-full"
                        title={`Copy ${label}`}
                      >
                        <Copy size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-4 p-3 bg-white/20 rounded-lg border border-white/30 text-center">
                <p className="text-xs">
                  💡 <strong>Note:</strong> Please upload payment screenshot after completing the transaction.
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="mt-6 text-center text-white/80 text-sm">
          For any payment issues, please contact our support team.
        </div>
      </div>

      {/* Loading overlay */}
      {(loading || isLoading) && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white/10 p-4 rounded-lg">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-lime-400"></div>
          </div>
        </div>
      )}
    </div>
  );
}
// import React, { useState } from 'react';
// import { Copy, Upload } from 'lucide-react';
// import Qrcode from "../../../../assets/QR_CODE.png";

// const PaymentIcon = ({ name, color }) => (
//   <div className={`w-6 h-6 ${color} rounded-md flex items-center justify-center text-white font-bold text-xs`}>
//     {name.slice(0, 2)}
//   </div>
// );

// export default function AddFundsPage() {
//   const [transactionId, setTransactionId] = useState('Autofill');
//   const [amount, setAmount] = useState('');
//   const [file, setFile] = useState(null);
//   const [activeTab, setActiveTab] = useState('UPI');
//   const [copyNotification, setCopyNotification] = useState('');

//   const handleFileChange = (event) => {
//     setFile(event.target.files[0]);
//   };

//   const handleCopyUPI = () => {
//     navigator.clipboard.writeText('jaimaxcoin2024@upi');
//     showCopyNotification('UPI ID copied!');
//   };

//   const handleCopy = (text) => {
//     navigator.clipboard.writeText(text);
//     showCopyNotification('Copied to clipboard!');
//   };

//   const showCopyNotification = (message) => {
//     setCopyNotification(message);
//     setTimeout(() => setCopyNotification(''), 2000);
//   };

//   return (
//     <div className="min-h-screen text-white p-4 sm:p-6" style={{ backgroundColor: '#1d8e85' }}>
//       {copyNotification && (
//         <div className="fixed top-3 right-3 bg-white/10 text-lime-400 px-3 py-1 rounded-lg border border-lime-400 z-50 text-sm">
//           {copyNotification}
//         </div>
//       )}

//       <div className="max-w-7xl mx-auto px-2">
//         <div className="text-center mb-6">
//           <h1 className="text-2xl font-bold mb-1 text-lime-300">Add Funds</h1>
//           <p className="text-white/80 text-sm">Choose your preferred payment method</p>
//         </div>

//         <div className="flex flex-wrap gap-4 justify-between">
//           {/* Payment Method Card */}
//           <div className="flex-1 min-w-[300px] rounded-xl p-4 border border-white/20 shadow-lg bg-[#1d8e85] flex flex-col h-full">
//             <div className="mb-3">
//               <h3 className="text-lg font-semibold mb-2">Payment Method</h3>
//               <div className="flex gap-4">
//                 <label className="flex items-center gap-2 cursor-pointer">
//                   <input
//                     type="radio"
//                     name="paymentMethod"
//                     checked={activeTab === 'UPI'}
//                     onChange={() => setActiveTab('UPI')}
//                     className="w-4 h-4 accent-lime-400"
//                   />
//                   <span className="text-sm">UPI</span>
//                 </label>
//                 <label className="flex items-center gap-2 cursor-pointer">
//                   <input
//                     type="radio"
//                     name="paymentMethod"
//                     checked={activeTab === 'Others'}
//                     onChange={() => setActiveTab('Others')}
//                     className="w-4 h-4 accent-lime-400"
//                   />
//                   <span className="text-sm">Others</span>
//                 </label>
//               </div>
//             </div>

//             {activeTab === 'UPI' && (
//               <div className="space-y-3">
//                 <div>
//                   <label className="block text-sm font-semibold mb-1">UPI ID</label>
//                   <div className="relative">
//                     <input
//                       type="text"
//                       value="jaimaxcoin2024@upi"
//                       readOnly
//                       className="w-full bg-white/20 px-3 py-2 border border-white/30 rounded-lg pr-10 text-white text-sm focus:outline-none"
//                     />
//                     <button
//                       onClick={handleCopyUPI}
//                       className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-lime-500/20 hover:bg-lime-400/30 p-1 rounded-md text-white"
//                       title="Copy UPI ID"
//                     >
//                       <Copy size={14} />
//                     </button>
//                   </div>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-semibold mb-1">Amount</label>
//                   <input
//                     type="number"
//                     value={amount}
//                     onChange={(e) => setAmount(e.target.value)}
//                     className="w-full bg-white/20 px-3 py-2 border border-white/30 rounded-lg text-white text-sm focus:outline-none"
//                     placeholder="Enter amount"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-semibold mb-1">Transaction ID</label>
//                   <input
//                     type="text"
//                     value={transactionId}
//                     onChange={(e) => setTransactionId(e.target.value)}
//                     className="w-full bg-white/20 px-3 py-2 border border-white/30 rounded-lg text-white text-sm focus:outline-none"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-semibold mb-1">Payment Screenshot</label>
//                   <input
//                     type="file"
//                     id="file-upload"
//                     className="hidden"
//                     onChange={handleFileChange}
//                     accept="image/*"
//                   />
//                   <label
//                     htmlFor="file-upload"
//                     className="flex justify-between items-center bg-white/20 hover:bg-white/30 px-3 py-2 rounded-lg cursor-pointer border border-white/30 text-white"
//                   >
//                     <span className="text-sm truncate">{file ? file.name : 'Choose screenshot'}</span>
//                     <Upload size={14} className="text-lime-400" />
//                   </label>
//                 </div>

//                 <button className="w-full bg-lime-400 text-black font-bold py-2 rounded-lg hover:bg-lime-300 transition duration-200">
//                   Submit Payment
//                 </button>
//               </div>
//             )}

//             {activeTab === 'Others' && (
//               <div className="mt-4 space-y-3 text-sm">
//                 <p className="text-lg font-bold text-white">Available Balance: ₹0.00</p>
//                 <p className="text-white/70">(Referral + Super Bonus)</p>

//                 <div>
//                   <label className="block font-semibold mb-1">Enter Amount To Transfer<span className="text-red-500">*</span></label>
//                   <input
//                     type="number"
//                     placeholder="Enter Transfer Amount"
//                     className="w-full bg-white/20 px-3 py-2 border border-white/30 rounded-lg text-white focus:outline-none"
//                   />
//                 </div>

//                 <button className="bg-lime-400 text-black font-bold py-2 px-4 rounded-full hover:bg-lime-300 transition">
//                   Transfer
//                 </button>
//               </div>
//             )}
//           </div>

//           {/* QR Code Card */}
//           {activeTab === 'UPI' && (
//             <div className="flex-1 min-w-[300px] rounded-xl p-4 border border-white/20 shadow-lg bg-[#1d8e85] flex items-center justify-center h-full">
//               <div className="w-full max-w-xs">
//                 <img
//                   src={Qrcode}
//                   alt="QR Code"
//                   className="w-full h-full object-contain rounded-lg"
//                 />
//               </div>
//             </div>
//           )}

//           {/* Bank Details Card */}
//           {activeTab === 'UPI' && (
//             <div className="flex-1 min-w-[300px] rounded-xl p-4 border border-white/20 shadow-lg bg-[#1d8e85] flex flex-col justify-between h-full">
//               <h2 className="text-lg font-bold mb-3 text-center lg:text-left">Bank Details</h2>
//               <div className="space-y-2 text-sm">
//                 {[
//                   ['Account Holder', 'JAISVIK SOFTWARE SOLUTIONS PVT LTD-HYD'],
//                   ['Account Number', '50200109463200'],
//                   ['IFSC Code', 'HDFC0002083'],
//                   ['Bank Name', 'HDFC Bank']
//                 ].map(([label, value]) => (
//                   <div key={label} className="flex justify-between items-center">
//                     <div>
//                       <p className="font-semibold">{label}</p>
//                       <p className="font-mono break-all">{value}</p>
//                     </div>
//                     <button
//                       onClick={() => handleCopy(value)}
//                       className="bg-lime-500/20 hover:bg-lime-400/30 px-2 py-1 rounded-lg"
//                       title={`Copy ${label}`}
//                     >
//                       <Copy size={14} />
//                     </button>
//                   </div>
//                 ))}
//               </div>

//               <div className="mt-3 p-3 bg-white/20 rounded-lg border border-white/30 text-center">
//                 <p className="text-xs">
//                   💡 <strong>Note:</strong> Please upload payment screenshot after completing the transaction.
//                 </p>
//               </div>
//             </div>
//           )}
//         </div>

//         <div className="mt-6 text-center text-white/80 text-sm">
//           For any payment issues, please contact our support team.
//         </div>
//       </div>
//     </div>
//   );
// }

