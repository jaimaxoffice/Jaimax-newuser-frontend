// import React, { useState, useRef, useEffect } from 'react';
// import { Copy, Upload, Download, ArrowLeft, CreditCard } from 'lucide-react';
// import scan from '../../../../assets/Images/SignUp/newQr.jpg';
// export default function AddMoneyToWallet() {
//   const defaultFormData = {
//     upiId: "jaimaxcoin2024@upi",
//     bankAccountHolderName: "JAISVIK SOFTWARE SOLUTIONS PVT LTD-HYD",
//     bankAccountNumber: "50200109463200",
//     bankIfscCode: "HDFC0002083",
//     bankName: "HDFC",
//     transactionId: "",
//     screenshot: null,
//     amount: "",
//   };

//   // Refs
//   const fileInputRef = useRef(null);

//   // State management
//   const [formData, setFormData] = useState(defaultFormData);
//   const [amount, setAmount] = useState('');
//   const [transferAmount, setTransferAmount] = useState('');
//   const [selectedMethod, setSelectedMethod] = useState('currency');
//   const [copyNotification, setCopyNotification] = useState('');
//   const [errors, setErrors] = useState({});
//   const [paypalError, setPaypalError] = useState("");
//   const [othersError, setOthersError] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [isTransactionIdRead, setIsTransactionIdRead] = useState(false);
//   const [isToastShown, setIsToastShown] = useState(false);
//   const [isProceed, setIsProceed] = useState(false);
//   const [toasts, setToasts] = useState([]);

//   // Mock user data
//   const userData = {
//     data: {
//       countryCode: 91,
//       Inr: 5000,
//       name: "John Doe",
//       _id: "user123"
//     }
//   };

//   // Constants
//   const countryCode = userData?.data?.countryCode || 91;
//   const transactionPercentageValue = 3;

//   // Toast functionality
//   const showToast = (message, type = 'success') => {
//     const id = Date.now();
//     const newToast = { id, message, type };
//     setToasts(prev => [...prev, newToast]);
//     setTimeout(() => {
//       setToasts(prev => prev.filter(toast => toast.id !== id));
//     }, 5000);
//   };

//   const handleDownloadQrCode = () => {
//     const link = document.createElement('a');
//     link.href = "/images/QR_Code.png";
//     link.download = "QR_Code_Jaimaxcoin_Payments.png";
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//   };

//   // Validation function
//   const validateField = (name, value) => {
//     let error = "";
//     const allowedTypes = ["image/png", "image/jpeg", "image/jpg"];

//     switch (name) {
//       case "transactionId":
//         if (!value.trim()) {
//           error = "Transaction ID is required";
//         }
//         break;
//       case "amount":
//         if (!value || isNaN(value) || parseFloat(value) <= 0) {
//           error = "Please enter a valid amount greater than zero";
//         }
//         break;
//       case "screenshot":
//         if (!value) {
//           error = "Screenshot is required";
//         } else if (value && !allowedTypes.includes(value.type)) {
//           error = "Only JPG / PNG files are allowed";
//         }
//         break;
//       default:
//         break;
//     }

//     setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
//     return error === "";
//   };

//   // OCR Image processing (mock implementation)
//   const extractDetailsFromImage = (file) => {
//     if (!file) return;

//     setIsLoading(true);
//     // Mock OCR processing
//     setTimeout(() => {
//       setFormData((prev) => ({ ...prev, transactionId: "TXN123456789" }));
//       setIsLoading(false);
//       setIsTransactionIdRead(false);
//     }, 2000);
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     extractDetailsFromImage(file);
//     const isError = validateField("screenshot", file);
//     if (!isError) {
//       if (fileInputRef.current) {
//         fileInputRef.current.value = "";
//       }
//       setFormData((prev) => ({ ...prev, transactionId: "" }));
//     } else {
//       setFormData((prev) => ({ ...prev, screenshot: file }));
//     }
//   };

//   // Input change handlers
//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     if (name === "amount" && !/^[0-9]*$/.test(value)) {
//       return;
//     }
//     if (name === "transactionId" && !/^[A-Za-z0-9]*$/.test(value)) {
//       return;
//     }

//     if (name === "transactionId") {
//       const upperCaseValue = value.toUpperCase();
//       setFormData((prevData) => ({ ...prevData, [name]: upperCaseValue }));
//     } else {
//       setFormData((prevData) => ({ ...prevData, [name]: value }));
//     }

//     validateField(name, value);
//   };

//   const handleAmountChange = (e) => {
//     let inputValue = e.target.value;
//     inputValue = inputValue.replace(/[^0-9 ]/g, "");
//     setAmount(inputValue);
//     if (inputValue) {
//       setPaypalError("");
//       setIsProceed(false);
//     }
//   };

//   const handleTransferAmountChange = (e) => {
//     let inputValue = e.target.value;
//     inputValue = inputValue.replace(/[^0-9 ]/g, "");
//     setTransferAmount(inputValue);
//     if (inputValue) {
//       setOthersError("");
//     }
//   };

//   // Copy functions
//   const handleCopy = (text) => {
//     if (navigator.clipboard && navigator.clipboard.writeText) {
//       navigator.clipboard
//         .writeText(text)
//         .then(() => {
//           showToast("Text copied to clipboard!", "success");
//         })
//         .catch((err) => {
//           showToast("Failed to copy text", "error");
//         });
//     } else {
//       try {
//         const textArea = document.createElement("textarea");
//         textArea.value = text;
//         document.body.appendChild(textArea);
//         textArea.select();
//         document.execCommand("copy");
//         document.body.removeChild(textArea);
//         showToast("Text copied to clipboard!", "success");
//       } catch (err) {
//         showToast("Failed to copy text", "error");
//       }
//     }
//   };

//   const copyToClipboard = () => {
//     const textToCopy = `
//       Bank Account Holder Name: ${defaultFormData.bankAccountHolderName}
//       Bank Account Number: ${defaultFormData.bankAccountNumber}
//       Bank IFSC Code: ${defaultFormData.bankIfscCode}
//       Bank Name: ${defaultFormData.bankName}
//     `;
//     handleCopy(textToCopy);
//   };

//   // Validation for different payment methods
//   const validate = (paymentMethod) => {
//     let isError;

//     if (paymentMethod === "currency") {
//       if (!amount) {
//         setPaypalError("Please Enter Amount");
//         isError = true;
//       } else if (+amount <= 0) {
//         isError = true;
//         setPaypalError("Please Enter Valid Amount");
//       } else {
//         isError = false;
//         setPaypalError("");
//       }
//     } else {
//       if (!transferAmount) {
//         setOthersError("Please Enter Transfer Amount");
//         isError = true;
//       } else if (+transferAmount <= 0) {
//         isError = true;
//         setOthersError("Please Enter Valid Amount");
//       } else if (+transferAmount > +userData?.data?.Inr) {
//         isError = true;
//         setOthersError("Insufficient Balance");
//       } else {
//         isError = false;
//         setOthersError("");
//       }
//     }
//     return isError;
//   };

//   // Calculate transaction fee
//   const calculateTransactionFee = () => {
//     const transactionFee = (+amount * transactionPercentageValue) / 100;
//     return transactionFee || 0;
//   };

//   // Submit handlers
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const isTransactionIdValid = validateField("transactionId", formData.transactionId);
//     const isScreenshotValid = validateField("screenshot", formData.screenshot);
//     const isAmountValid = validateField("amount", formData.amount);

//     if (!(isTransactionIdValid && isScreenshotValid && isAmountValid)) {
//       setIsToastShown(true);
//       if (!isToastShown) {
//         showToast("Please fill in all required fields.", "error");
//       } else {
//         showToast("Please fill in all required fields.", "error");
//       }
//       return;
//     }

//     setLoading(true);
//     try {
//       // Mock API call
//       await new Promise(resolve => setTimeout(resolve, 2000));
//       showToast("Form submitted successfully!", "success");
//       setFormData(defaultFormData);
//       if (fileInputRef.current) {
//         fileInputRef.current.value = "";
//       }
//     } catch (error) {
//       console.log("Error submitting form:", error);
//       showToast("Form submission failed.", "error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // PayPal handlers
//   const proceedPaypalAddMoney = async () => {
//     if (validate("currency")) {
//       return;
//     }
//     setIsProceed(true);
//   };

//   const addMoneyThroughPaypal = async () => {
//     setLoading(true);
//     try {
//       // Mock PayPal API call
//       await new Promise(resolve => setTimeout(resolve, 2000));
//       showToast("Redirecting to PayPal...", "success");
//     } catch (error) {
//       console.error("Error while creating PayPal wallet order:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Transfer money handler
//   const onSubmitTransferMoney = async () => {
//     if (validate("others")) {
//       return;
//     }

//     setLoading(true);
//     try {
//       // Mock transfer API call
//       await new Promise(resolve => setTimeout(resolve, 2000));
//       showToast("Transfer successful!", "success");
//     } catch (error) {
//       showToast("Error while transferring funds", "error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Payment method change
//   const onChangePaymentMode = (checkedValue) => {
//     setSelectedMethod(checkedValue);
//     setOthersError("");
//     setPaypalError("");
//     setIsProceed(false);
//     setTransferAmount();
//   };

//   // Card payment handler
//   const onClickAddMoney = () => {
//     try {
//       showToast("Redirecting to payment gateway...", "success");
//       // Mock payment redirect
//     } catch (error) {
//       console.error("Error in onClickAddMoney:", error);
//       showToast("Something went wrong. Please try again.", "error");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-teal-50">
//       {/* Toast Container */}
//       <div className="fixed top-4 right-4 z-50 space-y-2">
//         {toasts.map((toast) => (
//           <div
//             key={toast.id}
//             className={`px-4 py-2 rounded-lg shadow-lg animate-pulse ${
//               toast.type === 'success' 
//                 ? 'bg-teal-500 text-white' 
//                 : 'bg-red-500 text-white'
//             }`}
//           >
//             {toast.message}
//           </div>
//         ))}
//       </div>

//       {/* Header */}
//       <div className="bg-white border-b border-teal-200 shadow-sm">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex items-center justify-between h-16">
//             <button
//               onClick={() => console.log("Navigate to wallet")}
//               className="flex items-center text-teal-600 hover:text-teal-700 transition-colors font-medium"
//             >
//               <ArrowLeft size={20} className="mr-2" />
//               <span className="hidden sm:inline">Back to Wallet</span>
//             </button>
//             <h1 className="text-lg sm:text-xl font-semibold text-gray-900">Add Money to Wallet</h1>
//             <div className="w-20"></div>
//           </div>
//         </div>
//       </div>

//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
//         {/* Payment Method Selection */}
//         <div className="flex flex-wrap gap-4 mb-6">
//           <label className="flex items-center cursor-pointer">
//             <input
//               type="radio"
//               name="paymentMethod"
//               checked={selectedMethod === 'currency'}
//               onChange={() => onChangePaymentMode('currency')}
//               className="w-4 h-4 text-teal-600 bg-gray-100 border-gray-300 focus:ring-teal-500"
//             />
//             <span className="ml-2 text-gray-900 font-medium">
//               {countryCode === 91 ? "UPI" : "PayPal"}
//             </span>
//           </label>
//           <label className="flex items-center cursor-pointer">
//             <input
//               type="radio"
//               name="paymentMethod"
//               checked={selectedMethod === 'others'}
//               onChange={() => onChangePaymentMode('others')}
//               className="w-4 h-4 text-teal-600 bg-gray-100 border-gray-300 focus:ring-teal-500"
//             />
//             <span className="ml-2 text-gray-900 font-medium">Others</span>
//           </label>
//         </div>

//         {/* Main Content Grid */}
//         <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
//           {/* Payment Form Section */}
//           <div className="lg:col-span-4">
//             {selectedMethod === 'currency' && countryCode === 91 ? (
//               <div className="bg-white rounded-xl p-6 border border-teal-200 shadow-sm">
//                 {/* UPI ID */}
//                 <div className="mb-6">
//                   <label className="block text-teal-700 text-sm font-medium mb-2">UPI ID</label>
//                   <div className="relative">
//                     <input
//                       type="text"
//                       value={formData.upiId}
//                       readOnly
//                       className="w-full bg-teal-50 border border-teal-300 text-gray-900 px-4 py-3 rounded-lg pr-12 focus:outline-none focus:ring-2 focus:ring-teal-500"
//                     />
//                     <button
//                       onClick={() => handleCopy(defaultFormData.upiId)}
//                       className="absolute right-3 top-1/2 transform -translate-y-1/2 text-teal-600 hover:text-teal-700 transition-colors"
//                     >
//                       <Copy size={18} />
//                     </button>
//                   </div>
//                 </div>

//                 {/* Transaction Details */}
//                 <div className="bg-teal-50 rounded-lg p-4 mb-6 border border-teal-200">
//                   <h3 className="text-teal-700 font-medium mb-4">Transaction Details</h3>
                  
//                   {/* Transaction ID */}
//                   <div className="mb-4">
//                     <label className="block text-gray-900 text-sm font-medium mb-2">Transaction ID</label>
//                     <input
//                       type="text"
//                       value={formData.transactionId}
//                       onChange={handleChange}
//                       name="transactionId"
//                       disabled={!isTransactionIdRead}
//                       placeholder={!isTransactionIdRead ? "Autofill" : "Enter transaction ID"}
//                       className="w-full bg-white border border-teal-300 text-gray-900 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 disabled:opacity-60"
//                     />
//                     {errors.transactionId && (
//                       <p className="text-red-600 text-sm mt-1">{errors.transactionId}</p>
//                     )}
//                   </div>

//                   {/* Screenshot Upload */}
//                   <div className="mb-4">
//                     <label className="block text-gray-900 text-sm font-medium mb-2">Screenshot</label>
//                     <input
//                       type="file"
//                       ref={fileInputRef}
//                       onChange={handleImageChange}
//                       accept=".jpg,.jpeg,.png,.jfif"
//                       className="w-full bg-white border border-teal-300 text-gray-900 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-teal-50 file:text-teal-700 hover:file:bg-teal-100"
//                     />
//                     {errors.screenshot && (
//                       <p className="text-red-600 text-sm mt-1">{errors.screenshot}</p>
//                     )}
//                   </div>

//                   {/* Amount */}
//                   <div className="mb-4">
//                     <label className="block text-gray-900 text-sm font-medium mb-2">Amount</label>
//                     <input
//                       type="text"
//                       value={formData.amount}
//                       onChange={handleChange}
//                       name="amount"
//                       placeholder="Please enter amount"
//                       className="w-full bg-white border border-teal-300 text-gray-900 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
//                     />
//                     {errors.amount && (
//                       <p className="text-red-600 text-sm mt-1">{errors.amount}</p>
//                     )}
//                   </div>

//                   {/* Submit Button */}
//                   <button
//                     onClick={handleSubmit}
//                     disabled={loading || isLoading}
//                     className="w-full bg-teal-600 hover:bg-teal-700 text-white font-medium py-3 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//                   >
//                     {loading || isLoading ? 'Submitting...' : 'Submit'}
//                   </button>
//                 </div>
//               </div>
//             ) : selectedMethod === 'currency' && countryCode !== 91 ? (
//               <div className="bg-white rounded-xl p-6 border border-teal-200 shadow-sm">
//                 <h2 className="text-xl font-semibold mb-6 text-gray-900">Add Funds via PayPal</h2>
                
//                 <div className="mb-4">
//                   <label className="block text-gray-900 text-sm font-medium mb-2">
//                     Enter Amount <span className="text-red-600">*</span>
//                   </label>
//                   <input
//                     type="text"
//                     value={amount}
//                     onChange={handleAmountChange}
//                     placeholder="Enter Amount"
//                     className="w-full bg-teal-50 border border-teal-300 text-gray-900 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
//                   />
//                   {paypalError && (
//                     <p className="text-red-600 text-sm mt-1">{paypalError}</p>
//                   )}
//                 </div>

//                 {isProceed && (
//                   <div className="bg-teal-50 border border-teal-300 p-4 rounded-lg mb-4 text-sm">
//                     <p className="mb-2">Transaction Amount: <span className="font-bold">${amount}.00</span></p>
//                     <p className="mb-2">Transaction Fee: <span className="font-bold">${calculateTransactionFee().toFixed(2)}</span></p>
//                     <p className="mb-2">Total Amount: <span className="font-bold">${(calculateTransactionFee() + +amount).toFixed(2)}</span></p>
//                     <p className="text-gray-600 text-xs">Note: A transaction fee of {transactionPercentageValue}% applies to each transaction.</p>
//                   </div>
//                 )}

//                 <button
//                   onClick={isProceed ? addMoneyThroughPaypal : proceedPaypalAddMoney}
//                   disabled={loading}
//                   className="w-full bg-teal-600 hover:bg-teal-700 text-white font-medium py-3 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//                 >
//                   {loading ? 'Processing...' : (isProceed ? 'Add Funds' : 'Proceed')}
//                 </button>
//               </div>
//             ) : (
//               <div className="bg-white rounded-xl p-6 border border-teal-200 shadow-sm">
//                 <h2 className="text-xl font-semibold mb-4 text-gray-900">Transfer Available Balance</h2>
//                 <p className="text-lg font-bold mb-2 text-gray-900">
//                   Available Balance: {countryCode === 91 ? "₹" : "$"}{(+userData?.data?.Inr || 0)?.toFixed(2)}
//                 </p>
//                 <p className="text-gray-600 text-sm mb-6">(Referral + Super Bonus)</p>

//                 <div className="mb-4">
//                   <label className="block text-gray-900 text-sm font-medium mb-2">
//                     Enter Amount To Transfer <span className="text-red-600">*</span>
//                   </label>
//                   <input
//                     type="text"
//                     value={transferAmount}
//                     onChange={handleTransferAmountChange}
//                     placeholder="Enter Transfer Amount"
//                     className="w-full bg-teal-50 border border-teal-300 text-gray-900 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
//                   />
//                   {othersError && (
//                     <p className="text-red-600 text-sm mt-1">{othersError}</p>
//                   )}
//                 </div>

//                 <button
//                   onClick={onSubmitTransferMoney}
//                   disabled={loading}
//                   className="w-full bg-teal-600 hover:bg-teal-700 text-white font-medium py-3 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//                 >
//                   {loading ? 'Transferring...' : 'Transfer'}
//                 </button>
//               </div>
//             )}
//           </div>

//           {/* QR Code Section */}
//           {selectedMethod === 'currency' && countryCode === 91 && (
//             <div className="lg:col-span-4">
//               <div className="bg-white rounded-xl p-6 border border-teal-200 shadow-sm text-center">
//                 <button
//                   onClick={handleDownloadQrCode}
//                   className="text-teal-600 hover:text-teal-700 text-sm font-medium mb-4 underline flex items-center justify-center w-full"
//                 >
//                   <Download size={16} className="mr-2" />
//                   Download QR Code for Future Payments
//                 </button>
                
//                 <div className="bg-teal-50 p-4 rounded-lg inline-block mb-4 border border-teal-200">
//                   <img
//                     src={scan}
//                     alt="QR Code"
//                     className="w-48 h-48 sm:w-56 sm:h-56 rounded-lg"
//                   />
//                 </div>
                
//                 <p className="text-gray-900 text-sm mb-4">
//                   <span className="text-gray-600">UPI ID:</span><br />
//                   <span className="font-bold text-teal-700">jaimaxcoin2024@upi</span>
//                 </p>

//                 {/* Card Payment Section */}
//                 <div className="bg-teal-50 rounded-lg p-4 mt-6 border border-teal-200">
//                   <h3 className="text-gray-900 font-semibold mb-3 flex items-center justify-center">
//                     <CreditCard size={20} className="mr-2 text-teal-600" />
//                     Pay through Cards
//                   </h3>
//                   <img
//                     src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/Credit_or_Debit_Card_Flat_Icon_Vector.svg/2048px-Credit_or_Debit_Card_Flat_Icon_Vector.svg.png"
//                     alt="Credit Card"
//                     className="w-32 h-20 mx-auto mb-3 object-contain"
//                   />
//                   <p className="text-gray-700 text-sm mb-4">
//                     For payments above <strong className="text-gray-900">₹25,000</strong>, ensure your card
//                     has sufficient limit and is enabled for high-value online transactions.
//                   </p>
//                   <button
//                     onClick={onClickAddMoney}
//                     className="w-full bg-teal-600 hover:bg-teal-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
//                   >
//                     Pay Now
//                   </button>
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* Bank Details Section */}
//           {selectedMethod === 'currency' && countryCode === 91 && (
//             <div className="lg:col-span-4">
//               <div className="bg-white rounded-xl p-6 border border-teal-200 shadow-sm">
//                 <h2 className="text-xl font-semibold mb-6 text-gray-900">Bank Details</h2>
                
//                 <div className="space-y-4">
//                   {[
//                     ['Bank Holder Name', defaultFormData.bankAccountHolderName],
//                     ['Bank Account No', defaultFormData.bankAccountNumber],
//                     ['IFSC Code', defaultFormData.bankIfscCode],
//                     ['Bank Name', defaultFormData.bankName]
//                   ].map(([label, value]) => (
//                     <div key={label} className="bg-teal-50 rounded-lg p-4 border border-teal-200">
//                       <div className="flex flex-col sm:flex-row sm:items-center justify-between">
//                         <div className="mb-2 sm:mb-0">
//                           <p className="text-gray-700 text-sm font-medium">{label}:</p>
//                           <p className="text-gray-900 text-base break-all">{value}</p>
//                         </div>
//                         <button
//                           onClick={() => handleCopy(value)}
//                           className="self-start sm:self-center bg-teal-600 hover:bg-teal-700 text-white p-2 rounded-lg transition-colors"
//                           title={`Copy ${label}`}
//                         >
//                           <Copy size={16} />
//                         </button>
//                       </div>
//                     </div>
//                   ))}
//                 </div>

//                 {/* Copy All Button */}
//                 <button
//                   onClick={copyToClipboard}
//                   className="w-full mt-4 bg-teal-100 hover:bg-teal-200 text-teal-700 font-medium py-2 px-4 rounded-lg transition-colors border border-teal-300"
//                 >
//                   Copy All Bank Details
//                 </button>

//                 <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
//                   <p className="text-blue-800 text-sm">
//                     💡 <strong>Note:</strong> Please upload payment screenshot after completing the transaction.
//                   </p>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>

//         {/* Footer */}
//         <div className="mt-8 text-center text-gray-600 text-sm">
//           <p>For any payment issues, please contact our support team.</p>
//         </div>
//       </div>

//       {/* Loading Overlay */}
//       {(loading || isLoading) && (
//         <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 backdrop-blur-sm">
//           <div className="bg-white p-6 rounded-lg shadow-2xl flex items-center space-x-3 border border-teal-200">
//             <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-teal-500"></div>
//             <p className="text-lg font-medium text-gray-900">
//               {loading ? 'Processing...' : 'Reading screenshot...'}
//             </p>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }



import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { useUserDataQuery } from "../../../Dashboard/pages/dashBoard/DashboardApliSlice";
import {
  useAddTransactionMutation,
  useCreatePaypalWalletOrderMutation,
  useTransferAvailableBalanceMutation,
} from "../wallet/walletApiSlice";
import Tesseract from "tesseract.js";
// import scan from "../../assets/Images/SignUp/scan.png";
import scan from "../../../../assets/Images/SignUp/newQr.jpg";
import bhumi from "../../../../assets/Images/SignUp/bhumi.png";
// import scanners from "../../assets/Images/SignUp/scanners.svg";
import socialMedia from "../../../../assets/Images/SignUp/socialmedia.svg";
import CopyToClipboardButton from "../../../../pages/home/CopyToClipboard";
// import loaderImage from "../../assets/Images/loader.svg";
import Loader from "../../../Loader/loader";
import CryptoJS from "crypto-js";

/**
 * This component is used to add funds to wallet by different payment methods UPI, Paypal & Transfer Available Balance
 * @return {*}
 */
const AddMoneyToWallet = () => {
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
  const fileInputRef = useRef(null);

  const [isTransactionIdRead, setIsTransactionIdRead] = useState(false);
  const [upiIdMatch, setUpiIdMatch] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState(defaultFormData);
  const [errors, setErrors] = useState({});
  const [paypalError, setPaypalError] = useState("");
  const [othersError, setOthersError] = useState("");
  const [addTransaction] = useAddTransactionMutation();
  const [createPaypalWalletOrder] = useCreatePaypalWalletOrderMutation();
  const [transferAvailableBalance] = useTransferAvailableBalanceMutation();
  const { data: userData, refetch } = useUserDataQuery();
  const [isToastShown, setIsToastShown] = useState(false);

  const countryCode = userData?.data?.countryCode;
  const transactionPercentageValue = 3;

  const [amount, setAmount] = useState();
  const [transferAmount, setTransferAmount] = useState();
  const [selectedMethod, setSelectedMethod] = useState("currency");
  const [isProceed, setIsProceed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = "/images/QR_Code.png";
    link.download = "QR_Code.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const copyToClipboard = () => {
    // Format the object into a readable string
    const textToCopy = `
      Bank Account Holder Name: ${defaultFormData.bankAccountHolderName}
      Bank Account Number: ${defaultFormData.bankAccountNumber}
      Bank IFSC Code: ${defaultFormData.bankIfscCode}
      Bank Name: ${defaultFormData.bankName}
    `;

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard
        .writeText(textToCopy)
        .then(() => {
          toast.success("Text copied to clipboard!");
        })
        .catch((err) => {
          toast.error("Failed to copy: ", err);
        });
    } else {
      // Fallback for unsupported environments
      try {
        const textArea = document.createElement("textarea");
        textArea.value = textToCopy;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
        toast.success("Text copied to clipboard!");
      } catch (err) {
        toast.error("Fallback: Failed to copy text", err);
      }
    }
  };

  const copyUPI = () => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard
        .writeText(formData.upiId)
        .then(() => {
          toast.success("Text copied to clipboard!");
        })
        .catch((err) => {
          toast.error("Failed to copy: ", err);
        });
    } else {
      // Fallback for unsupported environments
      try {
        const textArea = document.createElement("textarea");
        textArea.value = formData.upiId;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
        toast.success("Text copied to clipboard!");
      } catch (err) {
        toast.error("Fallback: Failed to copy text", err);
      }
    }
  };

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
    return error === ""; // Returns true if no error
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

  const extractDetailsFromImage = (file) => {
    if (!file) return;

    setIsLoading(true);
    const reader = new FileReader();
    let toastShown = false; // Flag to ensure the toast shows only once

    reader.onload = () => {
      if (reader.result) {
        Tesseract.recognize(reader.result, "eng")
          .then(({ data: { text } }) => {
            console.log(text, "extracted");

            // Hard coded values to be expected from the screenshot to be valid
            const expectedUpiId = "jaimaxcoin2024@upi";
            const sentToLabel = "Sentto :";
            let upiId = null;

            // Clean up the extracted text by replacing ¥ with ₹
            let cleanedText = text.replace(/¥/g, "₹");

            // Regex to extract Transaction ID details
            const extractedTransactionID = cleanedText.match(
              /Transaction ID[:\s]*(\w+)/i
            );

            const upiRefNoMatch = cleanedText.match(
              /UPI Ref(?:\.|erence)? No[:\s]*([\d\s]+)(?=\D|$)/i
            );

            console.log(upiRefNoMatch, "upiRefNoMatch");

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
              setFormData((prev) => ({
                ...prev,
                transactionId: "",
              }));
              setIsTransactionIdRead(true);
            } else {
              setFormData((prev) => ({
                ...prev,
                transactionId: transactionID,
              }));
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Additional validation for specific fields
    if (name === "amount" && !/^[0-9]*$/.test(value)) {
      return;
    }
    if (name === "transactionId" && !/^[A-Za-z0-9]*$/.test(value)) {
      return;
    }
    // Convert transactionId to uppercase before setting
    if (name === "transactionId") {
      const upperCaseValue = toUpperCase(value);
      setFormData((prevData) => ({ ...prevData, [name]: upperCaseValue }));
    } else {
      // For other fields, just set the value normally
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }

    validateField(name, value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate all fields before submission
    const isTransactionIdValid = validateField(
      "transactionId",
      formData.transactionId
    );
    const isScreenshotValid = validateField("screenshot", formData.screenshot);
    const isAmountValid = validateField("amount", formData.amount);

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
    formDataToSend.append("transactionId", formData.transactionId);
    formDataToSend.append("transactionAmount", formData.amount);
    formDataToSend.append("screenshot", formData.screenshot);

    setLoading(true);
    try {
      const res = await addTransaction(formDataToSend).unwrap();
      if (res?.status_code === 200) {
        toast.success(res?.message || "Form submitted successfully!");
        setFormData(defaultFormData);
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
      setLoading(false); // Reset loading state
    }
  };

  const toUpperCase = (text) => {
    return text.toUpperCase();
  };

  /**
   * This method is used to change the amount
   * @param {*} e
   */
  const handleAmountChange = (e) => {
    let inputValue = e.target.value;
    inputValue = inputValue.replace(/[^0-9 ]/g, "");
    setAmount(inputValue);
    if (inputValue) {
      setPaypalError("");
      setIsProceed(false);
    }
  };

  /**
   * This method is used to validate the amounts
   * @param {*} paymentMethod
   * @return {*}
   */
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

  /**
   * This method is used to proceed the paypal wallet order by passing amount
   */
  const proceedPaypalAddMoney = async () => {
    if (validate("currency")) {
      return;
    }
    setIsProceed(true);
  };

  /**
   * This method is used to create the paypal wallet order by passing amount
   */
  const addMoneyThroughPaypal = async () => {
    setLoading(true);

    /* Prepare the request payload */
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

  /**
   * This method is used to change the payment mode radio input
   * @param {*} checkedValue
   */
  const onChangePaymentMode = (checkedValue) => {
    setSelectedMethod(checkedValue);
    setOthersError("");
    setPaypalError("");
    setIsProceed(false);
    setTransferAmount();
  };

  /**
   * This method is used to change the amount to transfer
   * @param {*} e
   */
  const handleTransferAmountChange = (e) => {
    let inputValue = e.target.value;
    inputValue = inputValue.replace(/[^0-9 ]/g, "");
    setTransferAmount(inputValue);
    if (inputValue) {
      setOthersError("");
    }
  };

  /**
   * This method is used to create the paypal wallet order by passing amount
   */
  const onSubmitTransferMoney = async () => {
    if (validate("others")) {
      return;
    }
    /* Prepare the request payload */
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

  /**
   * This method is used to calculate the transaction fee based on the percentage
   * @return {*}
   */
  const calculateTransactionFee = () => {
    const transactionFee = (+amount * transactionPercentageValue) / 100;
    return transactionFee || 0;
  };

  useEffect(() => {
    refetch();
  }, []);

  const onClickAddMoney = () => {
    try {
      // Step 1: Get and parse user data from localStorage
      const userDataRaw = localStorage.getItem("userData");
      if (!userDataRaw) {
        console.error("User not found in localStorage");
        alert("User not logged in. Please login and try again.");
        return;
      }

      const userData = JSON.parse(userDataRaw);
      const userId = userData?.data?._id;
      const name = userData?.data?.name;

      if (!userId || !name) {
        console.error("User data is incomplete");
        alert("User details are missing. Please contact support.");
        return;
      }

      // Step 2: Encrypt user data
      const secretKey = "6LfJPggqAAAAAKjkkCmWhGcHgvudxBl4519iceGa";
      const encryptedUserId = CryptoJS.AES.encrypt(
        userId,
        secretKey
      ).toString();
      const encryptedUserName = CryptoJS.AES.encrypt(
        name,
        secretKey
      ).toString();

      // Step 3: Sign the payload
      const payload = `${encryptedUserId}|${encryptedUserName}`;
      const signature = CryptoJS.HmacSHA256(payload, secretKey).toString();

      // Step 4: Construct the redirect URL
      const redirectUrl = `http://localhost:5173/paynow?userId=${encodeURIComponent(
        encryptedUserId
      )}&name=${encodeURIComponent(encryptedUserName)}&signature=${signature}`;

      // Step 5: Open the payment page in a new tab
      const paymentWindow = window.open(redirectUrl, "_blank");

      // Step 6: Check if popup was blocked
      if (
        !paymentWindow ||
        paymentWindow.closed ||
        typeof paymentWindow.closed === "undefined"
      ) {
        alert(
          "Popup blocked! Please allow popups for this site to proceed with payment."
        );
      } else {
        paymentWindow.focus(); // optional: bring the tab into focus
      }
    } catch (error) {
      console.error("Error in onClickAddMoney:", error);
      alert("Something went wrong. Please try again or contact support.");
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Payment Method Selection */}
      <div className="flex pt-6 gap-6">
        <div className="flex items-center">
          <input
            className="w-4 h-4 text-teal-600 border-gray-300 focus:ring-teal-500 cursor-pointer"
            type="radio"
            name="currency"
            id="currency"
            checked={selectedMethod === "currency"}
            onChange={() => onChangePaymentMode("currency")}
          />
          <label
            className="ml-2 text-lg font-medium text-slate-700 cursor-pointer"
            htmlFor="currency"
          >
            {countryCode === 91 ? "UPI" : "Paypal"}
          </label>
        </div>
        <div className="flex items-center">
          <input
            className="w-4 h-4 text-teal-600 border-gray-300 focus:ring-teal-500 cursor-pointer"
            type="radio"
            name="others"
            id="others"
            checked={selectedMethod === "others"}
            onChange={() => onChangePaymentMode("others")}
          />
          <label
            className="ml-2 text-lg font-medium text-slate-700 cursor-pointer"
            htmlFor="others"
          >
            Others
          </label>
        </div>
      </div>

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 py-6">
          {selectedMethod === "currency" && countryCode === 91 ? (
            <>
              {/* UPI Payment Form */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-xl shadow-lg p-6">
                  {/* UPI ID Section */}
                  <div className="mb-6">
                    <label className="block text-teal-700 font-semibold mb-2">
                      UPI ID
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        className="w-full px-4 py-3 pr-12 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                        value={formData.upiId}
                        name="upiId"
                        onChange={handleChange}
                        disabled
                        readOnly={true}
                      />
                      <CopyToClipboardButton
                        textToCopy={defaultFormData.upiId}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-teal-600 hover:bg-teal-700 text-white px-3 py-1 rounded-md text-sm transition-colors"
                      />
                    </div>
                  </div>

                  {/* Transaction Details */}
                  <div className="bg-slate-50 rounded-lg p-4">
                    <h3 className="text-teal-700 font-semibold mb-4">Transaction Details</h3>
                    
                    {/* Transaction ID */}
                    <div className="mb-4">
                      <label className="block text-slate-600 font-medium mb-2">
                        Transaction ID
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                        placeholder={
                          !isTransactionIdRead
                            ? "Autofill"
                            : "Enter transaction ID"
                        }
                        value={formData.transactionId}
                        name="transactionId"
                        onChange={handleChange}
                        autoComplete="off"
                        disabled={!isTransactionIdRead}
                      />
                      {errors.transactionId && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.transactionId}
                        </p>
                      )}
                    </div>

                    {/* Screenshot Upload */}
                    <div className="mb-4">
                      <label className="block text-slate-600 font-medium mb-2">
                        Screenshot
                      </label>
                      <input
                        type="file"
                        accept=".jpg,.jpeg,.png,.jfif"
                        className="w-full px-4 py-3 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-teal-50 file:text-teal-700 hover:file:bg-teal-100"
                        onChange={handleImageChange}
                        ref={fileInputRef}
                      />
                      {errors.screenshot && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.screenshot}
                        </p>
                      )}
                    </div>

                    {/* Amount */}
                    <div className="mb-6">
                      <label className="block text-slate-600 font-medium mb-2">
                        Amount
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                        placeholder="Please enter amount"
                        value={formData.amount}
                        name="amount"
                        onChange={handleChange}
                        autoComplete="off"
                      />
                      {errors.amount && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.amount}
                        </p>
                      )}
                    </div>

                    <button
                      type="submit"
                      onClick={handleSubmit}
                      className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </div>

              {/* QR Code Section */}
              <div className="lg:col-span-1">
                <div className="text-center mb-4">
                  <button
                    className="text-teal-600 hover:text-teal-700 font-semibold underline"
                    onClick={handleDownload}
                  >
                    Download QR Code for Future Payments
                  </button>
                </div>
                
                <div className="bg-white rounded-xl shadow-lg p-6 text-center">
                  <p className="text-slate-700 font-semibold mb-4">
                    Jaisvik Software Solutions Pvt Ltd.
                  </p>
                  <img
                    src={scan}
                    className="mx-auto mb-4 h-48 object-contain"
                    alt="QR Code"
                  />
                  <p className="text-slate-600 mb-4">
                    UPI ID: <span className="text-teal-600 font-semibold">Jaimaxcoin2024@upi</span>
                  </p>
                  <img src={bhumi} className="mx-auto mb-4 h-8" alt="Bhumi" />
                  <div className="mt-4">
                    <img src={socialMedia} className="mx-auto h-6" alt="Social Media" />
                  </div>
                </div>

                {/* Card Payment Section */}
                <div className="bg-white rounded-xl shadow-lg p-6 text-center mt-6">
                  <h3 className="text-slate-700 font-bold text-lg mb-4">
                    Pay through the cards
                  </h3>
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/Credit_or_Debit_Card_Flat_Icon_Vector.svg/2048px-Credit_or_Debit_Card_Flat_Icon_Vector.svg.png"
                    className="mx-auto mb-4 w-32 h-20 object-contain"
                    alt="Card Payment"
                  />
                  <p className="text-slate-600 text-sm mb-4">
                    For payments above <strong className="text-slate-700">₹25,000,</strong> ensure your card
                    has sufficient limit and is enabled for high-value online transactions.
                  </p>
                  <button
                    onClick={onClickAddMoney}
                    className="w-3/5 bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
                  >
                    Pay Now
                  </button>
                </div>
              </div>

              {/* Bank Details Section */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h3 className="text-slate-700 font-bold text-xl mb-6">
                    Bank Details
                  </h3>
                  
                  {/* Bank Holder Name */}
                  <div className="flex justify-between items-start mb-6">
                    <div className="flex-1">
                      <p className="text-slate-600 font-semibold mb-1">
                        Bank Holder Name:
                      </p>
                      <p className="text-slate-700 text-sm break-words">
                        {formData.bankAccountHolderName}
                      </p>
                    </div>
                    <CopyToClipboardButton
                      textToCopy={defaultFormData.bankAccountHolderName}
                      className="ml-4 bg-teal-600 hover:bg-teal-700 text-white px-3 py-2 rounded-md text-sm transition-colors"
                    />
                  </div>

                  {/* Account Number */}
                  <div className="flex justify-between items-start mb-6">
                    <div className="flex-1">
                      <p className="text-slate-600 font-semibold mb-1">
                        Bank Account No:
                      </p>
                      <p className="text-slate-700">
                        {formData.bankAccountNumber}
                      </p>
                    </div>
                    <CopyToClipboardButton
                      textToCopy={defaultFormData.bankAccountNumber}
                      className="ml-4 bg-teal-600 hover:bg-teal-700 text-white px-3 py-2 rounded-md text-sm transition-colors"
                    />
                  </div>

                  {/* IFSC Code */}
                  <div className="flex justify-between items-start mb-6">
                    <div className="flex-1">
                      <p className="text-slate-600 font-semibold mb-1">
                        IFSC Code:
                      </p>
                      <p className="text-slate-700">
                        {formData.bankIfscCode}
                      </p>
                    </div>
                    <CopyToClipboardButton
                      textToCopy={defaultFormData.bankIfscCode}
                      className="ml-4 bg-teal-600 hover:bg-teal-700 text-white px-3 py-2 rounded-md text-sm transition-colors"
                    />
                  </div>

                  {/* Bank Name */}
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <p className="text-slate-600 font-semibold mb-1">
                        Bank Name:
                      </p>
                      <p className="text-slate-700">
                        {formData.bankName}
                      </p>
                    </div>
                    <CopyToClipboardButton
                      textToCopy={defaultFormData.bankName}
                      className="ml-4 bg-teal-600 hover:bg-teal-700 text-white px-3 py-2 rounded-md text-sm transition-colors"
                    />
                  </div>
                </div>
              </div>
            </>
          ) : selectedMethod === "currency" && countryCode !== 91 ? (
            /* PayPal Payment Section */
            <div className="lg:col-span-3">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-2xl font-bold text-slate-700 mb-6">Add Funds</h2>
                
                <div className="max-w-md">
                  <div className="mb-4">
                    <label className="block text-slate-600 font-medium mb-2">
                      Enter Amount <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                      placeholder="Enter Amount"
                      name="amount"
                      value={amount}
                      onChange={handleAmountChange}
                      autoComplete="off"
                    />
                    {paypalError && (
                      <p className="text-red-500 text-sm mt-1">* {paypalError}</p>
                    )}
                  </div>

                  {isProceed && (
                    <div className="bg-slate-50 rounded-lg p-4 mb-4">
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-slate-600">Transaction Amount:</span>
                          <span className="font-semibold text-slate-700">${amount}.00</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-600">Transaction Fee:</span>
                          <span className="font-semibold text-slate-700">${calculateTransactionFee()}</span>
                        </div>
                        <div className="text-xs text-slate-500 mb-2">
                          Note: A transaction fee of <strong>{transactionPercentageValue}%</strong> applies to each transaction.
                        </div>
                        <div className="flex justify-between border-t pt-2">
                          <span className="text-slate-600 font-medium">Total Amount:</span>
                          <span className="font-bold text-slate-700">${calculateTransactionFee() + +amount}</span>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="flex gap-4">
                    {isProceed ? (
                      <button
                        type="button"
                        onClick={addMoneyThroughPaypal}
                        className="bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
                      >
                        Add Funds
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={proceedPaypalAddMoney}
                        className="bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
                      >
                        Proceed
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Transfer Available Balance Section */
            <div className="lg:col-span-3">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-slate-700">
                    Available Balance: {countryCode === 91 ? "₹" : "$"}
                    {(+userData?.data?.Inr)?.toFixed(2)}
                  </h2>
                  <p className="text-slate-500 text-sm">(Referral + Super Bonus)</p>
                </div>

                <div className="max-w-md">
                  <div className="mb-4">
                    <label className="block text-slate-600 font-medium mb-2">
                      Enter Amount To Transfer <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                      placeholder="Enter Transfer Amount"
                      name="transferAmount"
                      value={transferAmount}
                      onChange={handleTransferAmountChange}
                      autoComplete="off"
                    />
                    {othersError && (
                      <p className="text-red-500 text-sm mt-1">* {othersError}</p>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={onSubmitTransferMoney}
                    className="bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
                  >
                    Transfer
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {(isLoading || loading) && <Loader />}
    </div>
  );
};

export default AddMoneyToWallet;