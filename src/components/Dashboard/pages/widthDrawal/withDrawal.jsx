
// import React, { useState } from "react";
// import TransactionDetails from './withDrawalHistory/withDrawalHistory';

// const WithDrawal = () => {
//   const [amount, setAmount] = useState("");
//   const [password, setPassword] = useState("");
//   const [errors, setErrors] = useState({});

//   const sampleData = [
//     {
//       sno: 1,
//       transactionId: "279RWYX",
//       amount: "₹0.00",
//       type: "Credit",
//       paymentMethod: "Available Balance",
//       currency: "INR",
//       transactionDate: "29-04-2025 5:25 PM",
//       status: "Completed",
//       reason: "N/A",
//     },
//     // ... duplicate entries removed for brevity ...
//   ];

//   const validate = () => {
//     const newErrors = {};
//     if (!amount) {
//       newErrors.amount = "Amount is required";
//     } else if (isNaN(amount) || Number(amount) <= 0) {
//       newErrors.amount = "Enter a valid positive amount";
//     }

//     if (!password) {
//       newErrors.password = "Password is required";
//     } else if (password.length < 6) {
//       newErrors.password = "Password must be at least 6 characters";
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleConfirm = () => {
//     if (validate()) {
//       alert(`Withdrawal confirmed for amount ₹${amount}`);
//     }
//   };

//   return (
//     <div className="min-h-screen w-full bg-[#1d8e85] text-white flex flex-col">
//       <div className="px-4 sm:px-8 py-8 flex-grow">
//         <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
//           {/* Left Side */}
//           <div className="space-y-6 min-w-0">
//             <div>
//               <label className="block mb-2 text-sm text-white">Balance Type</label>
//               <select className="w-full bg-transparent border border-gray-500 rounded px-4 py-2 focus:outline-none text-white">
//                 <option className="text-black">Available Balance</option>
//               </select>
//               <p className="mt-2 text-sm text-white break-words">
//                 Total Available Balance : 0.00
//               </p>
//             </div>

//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//               <div>
//                 <label className="block mb-2 text-sm text-white">Payment Currency</label>
//                 <button className="w-full bg-[#4ecdc4] text-white font-medium py-2 rounded">
//                   INR
//                 </button>
//               </div>
//               <div>
//                 <label className="block mb-2 text-sm text-white">Amount</label>
//                 <input
//                   type="number"
//                   placeholder="Enter Amount ₹"
//                   value={amount}
//                   onChange={(e) => setAmount(e.target.value)}
//                   className={`w-full bg-transparent border rounded px-4 py-2 focus:outline-none text-white ${errors.amount ? "border-red-500" : "border-gray-500"}`}
//                 />
//                 {errors.amount && (
//                   <p className="text-red-500 text-xs mt-1">{errors.amount}</p>
//                 )}
//               </div>
//             </div>

//             <div className="text-sm text-white space-y-2">
//               <div className="flex justify-between py-2 border-b border-gray-600">
//                 <span>Fees</span>
//                 <span>0</span>
//               </div>
//               <div className="flex justify-between py-2 border-b border-gray-600">
//                 <span>Will Get</span>
//                 <span>0</span>
//               </div>
//             </div>

//             <button
//               type="button"
//               onClick={handleConfirm}
//               className="w-full bg-gradient-to-r from-[#094e54] to-[#4ecdc4] text-white font-semibold px-6 py-3 rounded-full hover:from-[#0a5c64] hover:to-[#5dd5cd] transition"
//             >
//               Confirm Password
//             </button>
//           </div>

//           {/* Center - Bank Details */}
//           <div className="border border-gray-600 rounded p-6 min-w-0">
//             <h2 className="text-lg font-bold mb-6 text-white">Bank Details</h2>
//             <p className="mb-3 truncate text-white">Bank Holder Name</p>
//             <p className="mb-3 truncate text-white">Bank Account Number</p>
//             <p className="mb-3 truncate text-white">Bank IFSC Code</p>
//             <p className="mt-4 truncate text-white">Bank Name</p>
//           </div>

//           {/* Right - Terms & Conditions */}
//           <div className="min-w-0">
//             <h2 className="text-lg font-bold mb-6 text-white">Terms & Conditions</h2>
//             <ul className="list-decimal space-y-3 pl-5 text-sm text-white">
//               <li>You have to complete the KYC and get approved status; then you can start the withdrawal process.</li>
//               <li>The withdrawal department works only during banking hours (10 AM to 4 PM) from Monday to Friday.</li>
//               <li>When you initiate the withdrawal process, the funds will be credited to your account within 24 hours.</li>
//               <li>We are not responsible if you provide the wrong bank details. Please check them carefully before initiating the withdrawal process.</li>
//             </ul>
//           </div>
//         </div>
//       </div>

//       {/* Transaction Table */}
//       <div className="flex-grow flex flex-col px-4 sm:px-8 pb-8">
//         <div className="overflow-x-auto">
//           <TransactionDetails list={sampleData} />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default WithDrawal;




// import React, { useState } from "react";
// import { Eye, EyeOff, AlertTriangle, CheckCircle, Info, Download, Filter } from "lucide-react";

// const TransactionTable = ({ transactions }) => {
//   const [filterStatus, setFilterStatus] = useState('all');
//   const [sortBy, setSortBy] = useState('date');

//   const filteredTransactions = transactions.filter(t => 
//     filterStatus === 'all' || t.status.toLowerCase() === filterStatus.toLowerCase()
//   );

//   const getStatusColor = (status) => {
//     switch (status.toLowerCase()) {
//       case 'completed': return 'bg-green-50 text-green-800 border-green-200';
//       case 'pending': return 'bg-yellow-50 text-yellow-800 border-yellow-200';
//       case 'failed': return 'bg-red-50 text-red-800 border-red-200';
//       default: return 'bg-gray-50 text-gray-800 border-gray-200';
//     }
//   };

//   const getTypeColor = (type) => {
//     return type === 'Credit' 
//       ? 'bg-blue-50 text-blue-800 border-blue-200' 
//       : 'bg-orange-50 text-orange-800 border-orange-200';
//   };

//   return (
//     <div className="bg-white rounded-lg border border-gray-200">
//       <div className="px-6 py-4 border-b border-gray-200">
//         <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//           <h3 className="text-lg font-semibold text-gray-900">Transaction History</h3>
//           <div className="flex flex-col sm:flex-row gap-3">
//             <select 
//               value={filterStatus}
//               onChange={(e) => setFilterStatus(e.target.value)}
//               className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//             >
//               <option value="all">All Status</option>
//               <option value="completed">Completed</option>
//               <option value="pending">Pending</option>
//               <option value="failed">Failed</option>
//             </select>
//             <button className="px-3 py-2 bg-gray-100 text-gray-700 rounded-md text-sm hover:bg-gray-200 flex items-center gap-2">
//               <Download className="w-4 h-4" />
//               Export
//             </button>
//           </div>
//         </div>
//       </div>
      
//       <div className="overflow-x-auto">
//         <table className="w-full">
//           <thead className="bg-gray-50">
//             <tr>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Transaction ID
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Amount
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Type
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Status
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Date & Time
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Method
//               </th>
//             </tr>
//           </thead>
//           <tbody className="bg-white divide-y divide-gray-200">
//             {filteredTransactions.map((transaction, index) => (
//               <tr key={index} className="hover:bg-gray-50">
//                 <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
//                   {transaction.transactionId}
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-semibold">
//                   {transaction.amount}
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap">
//                   <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-md border ${getTypeColor(transaction.type)}`}>
//                     {transaction.type}
//                   </span>
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap">
//                   <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-md border ${getStatusColor(transaction.status)}`}>
//                     {transaction.status}
//                   </span>
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                   {transaction.transactionDate}
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                   {transaction.paymentMethod}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
      
//       {filteredTransactions.length === 0 && (
//         <div className="px-6 py-8 text-center">
//           <p className="text-gray-500">No transactions found matching your criteria.</p>
//         </div>
//       )}
//     </div>
//   );
// };

// const WithDrawal = () => {
//   const [amount, setAmount] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [errors, setErrors] = useState({});
//   const [isProcessing, setIsProcessing] = useState(false);

//   const sampleData = [
//     {
//       transactionId: "WD279RWYX001",
//       amount: "₹2,500.00",
//       type: "Debit",
//       paymentMethod: "Bank Transfer",
//       currency: "INR",
//       transactionDate: "25-06-2025 2:30 PM",
//       status: "Completed",
//     },
//     {
//       transactionId: "WD280ABCD002",
//       amount: "₹1,200.00",
//       type: "Debit",
//       paymentMethod: "Bank Transfer",
//       currency: "INR",
//       transactionDate: "24-06-2025 11:15 AM",
//       status: "Pending",
//     },
//     {
//       transactionId: "WD281EFGH003",
//       amount: "₹850.00",
//       type: "Debit",
//       paymentMethod: "Bank Transfer",
//       currency: "INR",
//       transactionDate: "23-06-2025 4:45 PM",
//       status: "Completed",
//     },
//     {
//       transactionId: "CR282IJKL004",
//       amount: "₹5,000.00",
//       type: "Credit",
//       paymentMethod: "Available Balance",
//       currency: "INR",
//       transactionDate: "22-06-2025 9:20 AM",
//       status: "Completed",
//     },
//   ];

//   const availableBalance = 15750.50;
//   const minWithdrawal = 100;
//   const maxWithdrawal = 50000;
//   const feePercentage = 0.5; // 0.5%

//   const validate = () => {
//     const newErrors = {};
//     const amountNum = Number(amount);

//     if (!amount) {
//       newErrors.amount = "Amount is required";
//     } else if (isNaN(amountNum) || amountNum <= 0) {
//       newErrors.amount = "Please enter a valid amount";
//     } else if (amountNum < minWithdrawal) {
//       newErrors.amount = `Minimum withdrawal amount is ₹${minWithdrawal}`;
//     } else if (amountNum > maxWithdrawal) {
//       newErrors.amount = `Maximum withdrawal amount is ₹${maxWithdrawal}`;
//     } else if (amountNum > availableBalance) {
//       newErrors.amount = "Insufficient balance";
//     }

//     if (!password) {
//       newErrors.password = "Transaction password is required";
//     } else if (password.length < 6) {
//       newErrors.password = "Password must be at least 6 characters";
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleWithdraw = async () => {
//     if (validate()) {
//       setIsProcessing(true);
//       try {
//         // Simulate API call
//         await new Promise(resolve => setTimeout(resolve, 2000));
//         alert(`Withdrawal request submitted successfully for ₹${amount}`);
//         setAmount("");
//         setPassword("");
//       } catch (error) {
//         alert("Withdrawal failed. Please try again.");
//       } finally {
//         setIsProcessing(false);
//       }
//     }
//   };

//   const calculatedFee = amount ? (Number(amount) * feePercentage / 100) : 0;
//   const netAmount = amount ? (Number(amount) - calculatedFee) : 0;

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Header */}
//       <div className="bg-white border-b border-gray-200">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="py-6">
//             <h1 className="text-2xl font-bold text-gray-900">Withdraw Funds</h1>
//             <p className="mt-1 text-sm text-gray-600">Transfer funds to your registered bank account</p>
//           </div>
//         </div>
//       </div>

//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
//           {/* Withdrawal Form */}
//           <div className="lg:col-span-1">
//             <div className="bg-white rounded-lg border border-gray-200 p-6">
//               <div className="mb-6">
//                 <h2 className="text-lg font-semibold text-gray-900 mb-2">Withdrawal Details</h2>
//                 <div className="bg-blue-50 border border-blue-200 rounded-md p-3">
//                   <div className="flex items-center">
//                     <Info className="w-4 h-4 text-blue-600 mr-2" />
//                     <span className="text-sm text-blue-800">
//                       Available Balance: <span className="font-semibold">₹{availableBalance.toLocaleString('en-IN')}</span>
//                     </span>
//                   </div>
//                 </div>
//               </div>

//               <div className="space-y-6">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Balance Type
//                   </label>
//                   <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
//                     <option>Available Balance</option>
//                   </select>
//                 </div>

//                 <div className="grid grid-cols-2 gap-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Currency
//                     </label>
//                     <div className="px-3 py-2 bg-gray-100 border border-gray-300 rounded-md text-gray-900 font-medium text-center">
//                       INR
//                     </div>
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Amount <span className="text-red-500">*</span>
//                     </label>
//                     <input
//                       type="number"
//                       placeholder="0.00"
//                       value={amount}
//                       onChange={(e) => setAmount(e.target.value)}
//                       className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
//                         errors.amount ? 'border-red-300 ring-2 ring-red-500' : 'border-gray-300'
//                       }`}
//                     />
//                     {errors.amount && (
//                       <p className="mt-1 text-sm text-red-600 flex items-center">
//                         <AlertTriangle className="w-4 h-4 mr-1" />
//                         {errors.amount}
//                       </p>
//                     )}
//                   </div>
//                 </div>

//                 {/* Transaction Summary */}
//                 {amount && (
//                   <div className="bg-gray-50 rounded-md p-4 space-y-2">
//                     <h3 className="text-sm font-medium text-gray-900">Transaction Summary</h3>
//                     <div className="space-y-1 text-sm">
//                       <div className="flex justify-between">
//                         <span className="text-gray-600">Withdrawal Amount:</span>
//                         <span className="font-medium">₹{Number(amount).toLocaleString('en-IN')}</span>
//                       </div>
//                       <div className="flex justify-between">
//                         <span className="text-gray-600">Processing Fee ({feePercentage}%):</span>
//                         <span className="text-red-600">- ₹{calculatedFee.toFixed(2)}</span>
//                       </div>
//                       <div className="flex justify-between pt-2 border-t border-gray-200">
//                         <span className="font-medium text-gray-900">Net Amount:</span>
//                         <span className="font-semibold text-green-600">₹{netAmount.toLocaleString('en-IN')}</span>
//                       </div>
//                     </div>
//                   </div>
//                 )}

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Transaction Password <span className="text-red-500">*</span>
//                   </label>
//                   <div className="relative">
//                     <input
//                       type={showPassword ? "text" : "password"}
//                       placeholder="Enter transaction password"
//                       value={password}
//                       onChange={(e) => setPassword(e.target.value)}
//                       className={`w-full px-3 py-2 pr-10 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
//                         errors.password ? 'border-red-300 ring-2 ring-red-500' : 'border-gray-300'
//                       }`}
//                     />
//                     <button
//                       type="button"
//                       onClick={() => setShowPassword(!showPassword)}
//                       className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
//                     >
//                       {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
//                     </button>
//                   </div>
//                   {errors.password && (
//                     <p className="mt-1 text-sm text-red-600 flex items-center">
//                       <AlertTriangle className="w-4 h-4 mr-1" />
//                       {errors.password}
//                     </p>
//                   )}
//                 </div>

//                 <button
//                   onClick={handleWithdraw}
//                   disabled={isProcessing}
//                   className="w-full bg-blue-600 text-white py-3 px-4 rounded-md font-medium hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
//                 >
//                   {isProcessing ? (
//                     <>
//                       <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
//                       Processing...
//                     </>
//                   ) : (
//                     "Submit Withdrawal"
//                   )}
//                 </button>
//               </div>
//             </div>
//           </div>

//           {/* Right Side */}
//           <div className="lg:col-span-2 space-y-8">
            
//             {/* Bank Details */}
//             <div className="bg-white rounded-lg border border-gray-200 p-6">
//               <div className="flex items-center justify-between mb-4">
//                 <h2 className="text-lg font-semibold text-gray-900">Registered Bank Account</h2>
//                 <div className="flex items-center text-green-600">
//                   <CheckCircle className="w-4 h-4 mr-1" />
//                   <span className="text-sm font-medium">Verified</span>
//                 </div>
//               </div>
              
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div>
//                   <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
//                     Account Holder Name
//                   </label>
//                   <p className="text-gray-900 font-medium">RAJESH KUMAR SHARMA</p>
//                 </div>
                
//                 <div>
//                   <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
//                     Account Number
//                   </label>
//                   <p className="text-gray-900 font-medium">•••• •••• •••• 8756</p>
//                 </div>
                
//                 <div>
//                   <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
//                     IFSC Code
//                   </label>
//                   <p className="text-gray-900 font-medium">HDFC0001234</p>
//                 </div>
                
//                 <div>
//                   <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
//                     Bank Name
//                   </label>
//                   <p className="text-gray-900 font-medium">HDFC Bank</p>
//                 </div>
//               </div>
//             </div>

//             {/* Terms & Important Information */}
//             <div className="bg-white rounded-lg border border-gray-200 p-6">
//               <h2 className="text-lg font-semibold text-gray-900 mb-4">Withdrawal Terms & Conditions</h2>
              
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
//                 <div className="space-y-3">
//                   <div className="flex items-start">
//                     <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-semibold mr-3">1</span>
//                     <p className="text-sm text-gray-700">KYC verification must be completed and approved before withdrawal.</p>
//                   </div>
                  
//                   <div className="flex items-start">
//                     <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-semibold mr-3">2</span>
//                     <p className="text-sm text-gray-700">Processing time: 2-24 hours during banking hours (10 AM - 4 PM, Mon-Fri).</p>
//                   </div>
//                 </div>
                
//                 <div className="space-y-3">
//                   <div className="flex items-start">
//                     <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-semibold mr-3">3</span>
//                     <p className="text-sm text-gray-700">Minimum: ₹{minWithdrawal.toLocaleString('en-IN')}, Maximum: ₹{maxWithdrawal.toLocaleString('en-IN')} per transaction.</p>
//                   </div>
                  
//                   <div className="flex items-start">
//                     <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-semibold mr-3">4</span>
//                     <p className="text-sm text-gray-700">Verify bank details carefully. Incorrect details may cause delays or failures.</p>
//                   </div>
//                 </div>
//               </div>

//               <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
//                 <div className="flex">
//                   <AlertTriangle className="w-5 h-5 text-yellow-600 mr-3 flex-shrink-0" />
//                   <div>
//                     <h3 className="text-sm font-medium text-yellow-800">Important Notice</h3>
//                     <p className="text-sm text-yellow-700 mt-1">
//                       Processing fee of {feePercentage}% applies to all withdrawals. Funds will be transferred to your registered bank account only.
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Transaction History */}
//         <div className="mt-8">
//           <TransactionTable transactions={sampleData} />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default WithDrawal;




// import React, { useState } from "react";
// import { Eye, EyeOff, AlertTriangle, CheckCircle, Info, Download } from "lucide-react";

// const TransactionTable = ({ transactions }) => {
//   const [filterStatus, setFilterStatus] = useState('all');

//   const filteredTransactions = transactions.filter(t =>
//     filterStatus === 'all' || t.status.toLowerCase() === filterStatus.toLowerCase()
//   );

//   const getStatusColor = (status) => {
//     switch (status.toLowerCase()) {
//       case 'completed': return 'bg-green-100 text-green-800 border-green-200';
//       case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
//       case 'failed': return 'bg-red-100 text-red-800 border-red-200';
//       default: return 'bg-gray-100 text-gray-800 border-gray-200';
//     }
//   };

//   const getTypeColor = (type) => {
//     // Reusing status colors for consistency with a white/teal theme
//     switch (type.toLowerCase()) {
//       case 'credit': return 'bg-teal-100 text-teal-800 border-teal-200'; // Teal for Credit
//       case 'debit': return 'bg-orange-100 text-orange-800 border-orange-200'; // Orange for Debit (complementary to teal)
//       default: return 'bg-gray-100 text-gray-800 border-gray-200';
//     }
//   };

//   return (
//     <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
//       <div className="px-6 py-4 border-b border-gray-200">
//         <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//           <h3 className="text-lg font-semibold text-gray-900">Transaction History</h3>
//           <div className="flex flex-col sm:flex-row gap-3">
//             <select
//               value={filterStatus}
//               onChange={(e) => setFilterStatus(e.target.value)}
//               className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-teal-500 focus:border-teal-500 text-gray-700 bg-white"
//             >
//               <option value="all">All Status</option>
//               <option value="completed">Completed</option>
//               <option value="pending">Pending</option>
//               <option value="failed">Failed</option>
//             </select>
//             <button className="px-3 py-2 bg-teal-600 text-white rounded-md text-sm hover:bg-teal-700 focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 flex items-center gap-2 transition-colors duration-200">
//               <Download className="w-4 h-4" />
//               Export
//             </button>
//           </div>
//         </div>
//       </div>

//       <div className="overflow-x-auto">
//         <table className="w-full">
//           <thead className="bg-gray-50">
//             <tr>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Transaction ID
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Amount
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Type
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Status
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Date & Time
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Method
//               </th>
//             </tr>
//           </thead>
//           <tbody className="bg-white divide-y divide-gray-200">
//             {filteredTransactions.map((transaction, index) => (
//               <tr key={index} className="hover:bg-gray-50">
//                 <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
//                   {transaction.transactionId}
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-semibold">
//                   {transaction.amount}
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap">
//                   <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-md border ${getTypeColor(transaction.type)}`}>
//                     {transaction.type}
//                   </span>
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap">
//                   <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-md border ${getStatusColor(transaction.status)}`}>
//                     {transaction.status}
//                   </span>
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                   {transaction.transactionDate}
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                   {transaction.paymentMethod}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {filteredTransactions.length === 0 && (
//         <div className="px-6 py-8 text-center">
//           <p className="text-gray-500">No transactions found matching your criteria.</p>
//         </div>
//       )}
//     </div>
//   );
// };

// const WithDrawal = () => {
//   const [amount, setAmount] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [errors, setErrors] = useState({});
//   const [isProcessing, setIsProcessing] = useState(false);

//   const sampleData = [
//     {
//       transactionId: "WD279RWYX001",
//       amount: "₹2,500.00",
//       type: "Debit",
//       paymentMethod: "Bank Transfer",
//       currency: "INR",
//       transactionDate: "25-06-2025 2:30 PM",
//       status: "Completed",
//     },
//     {
//       transactionId: "WD280ABCD002",
//       amount: "₹1,200.00",
//       type: "Debit",
//       paymentMethod: "Bank Transfer",
//       currency: "INR",
//       transactionDate: "24-06-2025 11:15 AM",
//       status: "Pending",
//     },
//     {
//       transactionId: "WD281EFGH003",
//       amount: "₹850.00",
//       type: "Debit",
//       paymentMethod: "Bank Transfer",
//       currency: "INR",
//       transactionDate: "23-06-2025 4:45 PM",
//       status: "Completed",
//     },
//     {
//       transactionId: "CR282IJKL004",
//       amount: "₹5,000.00",
//       type: "Credit",
//       paymentMethod: "Available Balance",
//       currency: "INR",
//       transactionDate: "22-06-2025 9:20 AM",
//       status: "Completed",
//     },
//   ];

//   const availableBalance = 15750.50;
//   const minWithdrawal = 100;
//   const maxWithdrawal = 50000;
//   const feePercentage = 0.5; // 0.5%

//   const validate = () => {
//     const newErrors = {};
//     const amountNum = Number(amount);

//     if (!amount) {
//       newErrors.amount = "Amount is required";
//     } else if (isNaN(amountNum) || amountNum <= 0) {
//       newErrors.amount = "Please enter a valid amount";
//     } else if (amountNum < minWithdrawal) {
//       newErrors.amount = `Minimum withdrawal amount is ₹${minWithdrawal}`;
//     } else if (amountNum > maxWithdrawal) {
//       newErrors.amount = `Maximum withdrawal amount is ₹${maxWithdrawal}`;
//     } else if (amountNum > availableBalance) {
//       newErrors.amount = "Insufficient balance";
//     }

//     if (!password) {
//       newErrors.password = "Transaction password is required";
//     } else if (password.length < 6) {
//       newErrors.password = "Password must be at least 6 characters";
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleWithdraw = async () => {
//     if (validate()) {
//       setIsProcessing(true);
//       try {
//         // Simulate API call
//         await new Promise(resolve => setTimeout(resolve, 2000));
//         alert(`Withdrawal request submitted successfully for ₹${amount}`);
//         setAmount("");
//         setPassword("");
//       } catch (error) {
//         alert("Withdrawal failed. Please try again.");
//       } finally {
//         setIsProcessing(false);
//       }
//     }
//   };

//   const calculatedFee = amount ? (Number(amount) * feePercentage / 100) : 0;
//   const netAmount = amount ? (Number(amount) - calculatedFee) : 0;

//   return (
//     <div className="min-h-screen bg-gray-50 font-sans">
//       {/* Header */}
//       <div className="bg-white border-b border-gray-200 shadow-sm">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="py-6">
//             <h1 className="text-2xl font-bold text-gray-900">Withdraw Funds</h1>
//             <p className="mt-1 text-sm text-gray-600">Transfer funds to your registered bank account</p>
//           </div>
//         </div>
//       </div>

//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

//           {/* Withdrawal Form */}
//           <div className="lg:col-span-1">
//             <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
//               <div className="mb-6">
//                 <h2 className="text-lg font-semibold text-gray-900 mb-2">Withdrawal Details</h2>
//                 <div className="bg-teal-50 border border-teal-200 rounded-md p-3">
//                   <div className="flex items-center">
//                     <Info className="w-4 h-4 text-teal-600 mr-2" />
//                     <span className="text-sm text-teal-800">
//                       Available Balance: <span className="font-semibold">₹{availableBalance.toLocaleString('en-IN')}</span>
//                     </span>
//                   </div>
//                 </div>
//               </div>

//               <div className="space-y-6">
//                 <div>
//                   <label htmlFor="balanceType" className="block text-sm font-medium text-gray-700 mb-2">
//                     Balance Type
//                   </label>
//                   <select
//                     id="balanceType"
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500 text-gray-700 bg-white"
//                   >
//                     <option>Available Balance</option>
//                   </select>
//                 </div>

//                 <div className="grid grid-cols-2 gap-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Currency
//                     </label>
//                     <div className="px-3 py-2 bg-gray-100 border border-gray-300 rounded-md text-gray-900 font-medium text-center">
//                       INR
//                     </div>
//                   </div>
//                   <div>
//                     <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-2">
//                       Amount <span className="text-red-500">*</span>
//                     </label>
//                     <input
//                       id="amount"
//                       type="number"
//                       placeholder="0.00"
//                       value={amount}
//                       onChange={(e) => setAmount(e.target.value)}
//                       className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-teal-500 focus:border-teal-500 ${
//                         errors.amount ? 'border-red-400 ring-2 ring-red-200' : 'border-gray-300'
//                       }`}
//                     />
//                     {errors.amount && (
//                       <p className="mt-1 text-sm text-red-600 flex items-center">
//                         <AlertTriangle className="w-4 h-4 mr-1" />
//                         {errors.amount}
//                       </p>
//                     )}
//                   </div>
//                 </div>

//                 {/* Transaction Summary */}
//                 {amount && (
//                   <div className="bg-gray-50 rounded-md p-4 space-y-2 border border-gray-200">
//                     <h3 className="text-sm font-medium text-gray-900">Transaction Summary</h3>
//                     <div className="space-y-1 text-sm">
//                       <div className="flex justify-between">
//                         <span className="text-gray-600">Withdrawal Amount:</span>
//                         <span className="font-medium text-gray-900">₹{Number(amount).toLocaleString('en-IN')}</span>
//                       </div>
//                       <div className="flex justify-between">
//                         <span className="text-gray-600">Processing Fee ({feePercentage}%):</span>
//                         <span className="text-red-600">- ₹{calculatedFee.toFixed(2)}</span>
//                       </div>
//                       <div className="flex justify-between pt-2 border-t border-gray-200 mt-2">
//                         <span className="font-semibold text-gray-900">Net Amount:</span>
//                         <span className="font-bold text-green-600">₹{netAmount.toLocaleString('en-IN')}</span>
//                       </div>
//                     </div>
//                   </div>
//                 )}

//                 <div>
//                   <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
//                     Transaction Password <span className="text-red-500">*</span>
//                   </label>
//                   <div className="relative">
//                     <input
//                       id="password"
//                       type={showPassword ? "text" : "password"}
//                       placeholder="Enter transaction password"
//                       value={password}
//                       onChange={(e) => setPassword(e.target.value)}
//                       className={`w-full px-3 py-2 pr-10 border rounded-md focus:ring-2 focus:ring-teal-500 focus:border-teal-500 ${
//                         errors.password ? 'border-red-400 ring-2 ring-red-200' : 'border-gray-300'
//                       }`}
//                     />
//                     <button
//                       type="button"
//                       onClick={() => setShowPassword(!showPassword)}
//                       className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
//                     >
//                       {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
//                     </button>
//                   </div>
//                   {errors.password && (
//                     <p className="mt-1 text-sm text-red-600 flex items-center">
//                       <AlertTriangle className="w-4 h-4 mr-1" />
//                       {errors.password}
//                     </p>
//                   )}
//                 </div>

//                 <button
//                   onClick={handleWithdraw}
//                   disabled={isProcessing}
//                   className="w-full bg-teal-600 text-white py-3 px-4 rounded-md font-medium hover:bg-teal-700 focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transition-colors duration-200"
//                 >
//                   {isProcessing ? (
//                     <>
//                       <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
//                       Processing...
//                     </>
//                   ) : (
//                     "Submit Withdrawal"
//                   )}
//                 </button>
//               </div>
//             </div>
//           </div>

//           {/* Right Side */}
//           <div className="lg:col-span-2 space-y-8">

//             {/* Bank Details */}
//             <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
//               <div className="flex items-center justify-between mb-4">
//                 <h2 className="text-lg font-semibold text-gray-900">Registered Bank Account</h2>
//                 <div className="flex items-center text-green-600 bg-green-50 px-2 py-1 rounded-full border border-green-200">
//                   <CheckCircle className="w-4 h-4 mr-1" />
//                   <span className="text-sm font-medium">Verified</span>
//                 </div>
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div>
//                   <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
//                     Account Holder Name
//                   </label>
//                   <p className="text-gray-900 font-medium">RAJESH KUMAR SHARMA</p>
//                 </div>

//                 <div>
//                   <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
//                     Account Number
//                   </label>
//                   <p className="text-gray-900 font-medium">•••• •••• •••• 8756</p>
//                 </div>

//                 <div>
//                   <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
//                     IFSC Code
//                   </label>
//                   <p className="text-gray-900 font-medium">HDFC0001234</p>
//                 </div>

//                 <div>
//                   <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
//                     Bank Name
//                   </label>
//                   <p className="text-gray-900 font-medium">HDFC Bank</p>
//                 </div>
//               </div>
//             </div>

//             {/* Terms & Important Information */}
//             <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
//               <h2 className="text-lg font-semibold text-gray-900 mb-4">Withdrawal Terms & Conditions</h2>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
//                 <div className="space-y-3">
//                   <div className="flex items-start">
//                     <span className="flex-shrink-0 w-6 h-6 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center text-xs font-semibold mr-3">1</span>
//                     <p className="text-sm text-gray-700">KYC verification must be completed and approved before withdrawal.</p>
//                   </div>

//                   <div className="flex items-start">
//                     <span className="flex-shrink-0 w-6 h-6 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center text-xs font-semibold mr-3">2</span>
//                     <p className="text-sm text-gray-700">Processing time: 2-24 hours during banking hours (10 AM - 4 PM, Mon-Fri).</p>
//                   </div>
//                 </div>

//                 <div className="space-y-3">
//                   <div className="flex items-start">
//                     <span className="flex-shrink-0 w-6 h-6 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center text-xs font-semibold mr-3">3</span>
//                     <p className="text-sm text-gray-700">Minimum: ₹{minWithdrawal.toLocaleString('en-IN')}, Maximum: ₹{maxWithdrawal.toLocaleString('en-IN')} per transaction.</p>
//                   </div>

//                   <div className="flex items-start">
//                     <span className="flex-shrink-0 w-6 h-6 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center text-xs font-semibold mr-3">4</span>
//                     <p className="text-sm text-gray-700">Verify bank details carefully. Incorrect details may cause delays or failures.</p>
//                   </div>
//                 </div>
//               </div>

//               <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
//                 <div className="flex">
//                   <AlertTriangle className="w-5 h-5 text-yellow-600 mr-3 flex-shrink-0" />
//                   <div>
//                     <h3 className="text-sm font-medium text-yellow-800">Important Notice</h3>
//                     <p className="text-sm text-yellow-700 mt-1">
//                       Processing fee of {feePercentage}% applies to all withdrawals. Funds will be transferred to your registered bank account only.
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Transaction History */}
//         <div className="mt-8">
//           <TransactionTable transactions={sampleData} />
//         </div>
//       </div>
//     </div>
//   );
// };



// export default WithDrawal;



// import React, { useState } from "react";
// import { Eye, EyeOff, AlertTriangle, CheckCircle, Info, Download, Building, CreditCard, Clock, Shield, ArrowRight } from "lucide-react";

// const TransactionTable = ({ transactions }) => {
//   const [filterStatus, setFilterStatus] = useState('all');

//   const filteredTransactions = transactions.filter(t =>
//     filterStatus === 'all' || t.status.toLowerCase() === filterStatus.toLowerCase()
//   );

//   const getStatusColor = (status) => {
//     switch (status.toLowerCase()) {
//       case 'completed': return 'bg-green-50 text-green-700 border-green-200';
//       case 'pending': return 'bg-yellow-50 text-yellow-700 border-yellow-200';
//       case 'failed': return 'bg-red-50 text-red-700 border-red-200';
//       default: return 'bg-gray-50 text-gray-700 border-gray-200';
//     }
//   };

//   const getTypeColor = (type) => {
//     switch (type.toLowerCase()) {
//       case 'credit': return 'bg-blue-50 text-blue-700 border-blue-200';
//       case 'debit': return 'bg-orange-50 text-orange-700 border-orange-200';
//       default: return 'bg-gray-50 text-gray-700 border-gray-200';
//     }
//   };

//   return (
//     <div className="bg-[#1d8e85] rounded-lg border border-gray-200 shadow-sm">
//       <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
//         <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//           <h3 className="text-lg font-semibold text-gray-900">Transaction History</h3>
//           <div className="flex flex-col sm:flex-row gap-3">
//             <select
//               value={filterStatus}
//               onChange={(e) => setFilterStatus(e.target.value)}
//               className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-[#1d8e85] focus:border-[#1d8e85] text-gray-700 bg-white"
//             >
//               <option value="all">All Status</option>
//               <option value="completed">Completed</option>
//               <option value="pending">Pending</option>
//               <option value="failed">Failed</option>
//             </select>
//             <button className="px-4 py-2 bg-[#1d8e85] text-white rounded-md text-sm hover:bg-[#166f67] focus:ring-2 focus:ring-[#1d8e85] focus:ring-offset-2 flex items-center gap-2 transition-colors">
//               <Download className="w-4 h-4" />
//               Export
//             </button>
//           </div>
//         </div>
//       </div>

//       <div className="overflow-x-auto">
//         <table className="w-full">
//           <thead className="bg-gray-50">
//             <tr>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Transaction ID
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Amount
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Type
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Status
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Date & Time
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Method
//               </th>
//             </tr>
//           </thead>
//           <tbody className="bg-white divide-y divide-gray-200">
//             {filteredTransactions.map((transaction, index) => (
//               <tr key={index} className="hover:bg-gray-50">
//                 <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
//                   {transaction.transactionId}
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-semibold">
//                   {transaction.amount}
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap">
//                   <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getTypeColor(transaction.type)}`}>
//                     {transaction.type}
//                   </span>
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap">
//                   <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(transaction.status)}`}>
//                     {transaction.status}
//                   </span>
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                   {transaction.transactionDate}
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                   {transaction.paymentMethod}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {filteredTransactions.length === 0 && (
//         <div className="px-6 py-8 text-center">
//           <p className="text-gray-500">No transactions found matching your criteria.</p>
//         </div>
//       )}
//     </div>
//   );
// };

// const WithDrawal = () => {
//   const [amount, setAmount] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [errors, setErrors] = useState({});
//   const [isProcessing, setIsProcessing] = useState(false);

//   const sampleData = [
//     {
//       transactionId: "WD279RWYX001",
//       amount: "₹2,500.00",
//       type: "Debit",
//       paymentMethod: "Bank Transfer",
//       currency: "INR",
//       transactionDate: "25-06-2025 2:30 PM",
//       status: "Completed",
//     },
//     {
//       transactionId: "WD280ABCD002",
//       amount: "₹1,200.00",
//       type: "Debit",
//       paymentMethod: "Bank Transfer",
//       currency: "INR",
//       transactionDate: "24-06-2025 11:15 AM",
//       status: "Pending",
//     },
//     {
//       transactionId: "WD281EFGH003",
//       amount: "₹850.00",
//       type: "Debit",
//       paymentMethod: "Bank Transfer",
//       currency: "INR",
//       transactionDate: "23-06-2025 4:45 PM",
//       status: "Completed",
//     },
//     {
//       transactionId: "CR282IJKL004",
//       amount: "₹5,000.00",
//       type: "Credit",
//       paymentMethod: "Available Balance",
//       currency: "INR",
//       transactionDate: "22-06-2025 9:20 AM",
//       status: "Completed",
//     },
//   ];

//   const availableBalance = 15750.50;
//   const minWithdrawal = 100;
//   const maxWithdrawal = 50000;
//   const feePercentage = 0.5;

//   const validate = () => {
//     const newErrors = {};
//     const amountNum = Number(amount);

//     if (!amount) {
//       newErrors.amount = "Amount is required";
//     } else if (isNaN(amountNum) || amountNum <= 0) {
//       newErrors.amount = "Please enter a valid amount";
//     } else if (amountNum < minWithdrawal) {
//       newErrors.amount = `Minimum withdrawal amount is ₹${minWithdrawal}`;
//     } else if (amountNum > maxWithdrawal) {
//       newErrors.amount = `Maximum withdrawal amount is ₹${maxWithdrawal}`;
//     } else if (amountNum > availableBalance) {
//       newErrors.amount = "Insufficient balance";
//     }

//     if (!password) {
//       newErrors.password = "Transaction password is required";
//     } else if (password.length < 6) {
//       newErrors.password = "Password must be at least 6 characters";
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleWithdraw = async () => {
//     if (validate()) {
//       setIsProcessing(true);
//       try {
//         await new Promise(resolve => setTimeout(resolve, 2000));
//         alert(`Withdrawal request submitted successfully for ₹${amount}`);
//         setAmount("");
//         setPassword("");
//       } catch (error) {
//         alert("Withdrawal failed. Please try again.");
//       } finally {
//         setIsProcessing(false);
//       }
//     }
//   };

//   const calculatedFee = amount ? (Number(amount) * feePercentage / 100) : 0;
//   const netAmount = amount ? (Number(amount) - calculatedFee) : 0;

//   return (
//     <div className="min-h-screen bg-[#1d8e85] ">
//       {/* Header */}
//       <div className="bg-white border-b border-gray-200">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="py-6">
//             <div className="flex items-center gap-3 ">
//               <div className="p-2 bg-[#1d8e85] rounded-lg shadow-lg">
//                 <Building className="w-6 h-6 text-white" />
//               </div>
//               <div>
//                 <h1 className="text-2xl font-semibold text-gray-900">Fund Withdrawal</h1>
//                 <p className="text-sm text-gray-600">Secure transfer to your registered bank account</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 ">
//         <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
//           <div className="lg:col-span-4 ">
//             <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
//               <div className="mb-6">
//                 <h2 className="text-lg font-semibold text-gray-900 mb-4">Withdrawal Request</h2>
                
//                 {/* Balance Display */}
//                 <div className="bg-[#1d8e85] rounded-lg p-4 text-white mb-6">
//                   <div className="flex items-center justify-between">
//                     <div>
//                       <p className="text-sm opacity-90">Available Balance</p>
//                       <p className="text-2xl font-bold">₹{availableBalance.toLocaleString('en-IN')}</p>
//                     </div>
//                     <CreditCard className="w-8 h-8 opacity-80" />
//                   </div>
//                 </div>
//               </div>

//               <form className="space-y-6">
//                 <div>
//                   <label htmlFor="balanceType" className="block text-sm font-medium text-gray-700 mb-2">
//                     Source Account
//                   </label>
//                   <select
//                     id="balanceType"
//                     className="w-full text-gray-700  px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#1d8e85] focus:border-[#1d8e85]  bg-[#1d8e85]"
//                   >
//                     <option className="bg-[#1d8e85]">Available Balance</option>
//                     <option className="bg-[#1d8e85]"> Purchase Token(Jaimax)</option>
//                   </select>
//                 </div>

//                 <div className="grid grid-cols-5 gap-3">
//                   <div className="col-span-2">
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Currency
//                     </label>
//                     <div className="px-3 py-2 bg-gray-100 border border-gray-300 rounded-md text-gray-900 font-medium text-center">
//                       INR
//                     </div>
//                   </div>
//                   <div className="col-span-3">
//                     <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-2">
//                       Amount *
//                     </label>
//                     <input
//                       id="amount"
//                       type="number"
//                       placeholder="Enter amount"
//                       value={amount}
//                       onChange={(e) => setAmount(e.target.value)}
//                       className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-[#1d8e85] focus:border-[#1d8e85] ${
//                         errors.amount ? 'border-red-300 bg-red-50' : 'border-gray-300'
//                       }`}
//                     />
//                   </div>
//                 </div>
//                 {errors.amount && (
//                   <p className="text-sm text-red-600 flex items-center gap-1">
//                     <AlertTriangle className="w-4 h-4" />
//                     {errors.amount}
//                   </p>
//                 )}

//                 {/* Transaction Summary */}
//                 {amount && (
//                   <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
//                     <h3 className="text-sm font-medium text-gray-900 mb-3">Transaction Summary</h3>
//                     <div className="space-y-2 text-sm">
//                       <div className="flex justify-between">
//                         <span className="text-gray-600">Withdrawal Amount</span>
//                         <span className="font-medium">₹{Number(amount).toLocaleString('en-IN')}</span>
//                       </div>
//                       <div className="flex justify-between">
//                         <span className="text-gray-600">Processing Fee ({feePercentage}%)</span>
//                         <span className="text-red-600">₹{calculatedFee.toFixed(2)}</span>
//                       </div>
//                       <div className="flex justify-between pt-2 border-t border-gray-200 font-semibold">
//                         <span>Net Amount</span>
//                         <span className="text-[#1d8e85]">₹{netAmount.toLocaleString('en-IN')}</span>
//                       </div>
//                     </div>
//                   </div>
//                 )}

//                 <div>
//                   <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
//                     Transaction Password *
//                   </label>
//                   <div className="relative">
//                     <input
//                       id="password"
//                       type={showPassword ? "text" : "password"}
//                       placeholder="Enter transaction password"
//                       value={password}
//                       onChange={(e) => setPassword(e.target.value)}
//                       className={`w-full px-3 py-2 pr-10 border rounded-md focus:ring-2 focus:ring-[#1d8e85] focus:border-[#1d8e85] ${
//                         errors.password ? 'border-red-300 bg-red-50' : 'border-gray-300'
//                       }`}
//                     />
//                     <button
//                       type="button"
//                       onClick={() => setShowPassword(!showPassword)}
//                       className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
//                     >
//                       {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
//                     </button>
//                   </div>
//                   {errors.password && (
//                     <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
//                       <AlertTriangle className="w-4 h-4" />
//                       {errors.password}
//                     </p>
//                   )}
//                 </div>

//                 <button
//                   type="button"
//                   onClick={handleWithdraw}
//                   disabled={isProcessing}
//                   className="w-full bg-[#1d8e85] text-white py-3 px-4 rounded-md font-medium hover:bg-[#166f67] focus:ring-2 focus:ring-[#1d8e85] focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-colors"
//                 >
//                   {isProcessing ? (
//                     <>
//                       <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
//                       Processing Request...
//                     </>
//                   ) : (
//                     <>
//                       Submit Withdrawal
//                       <ArrowRight className="w-4 h-4" />
//                     </>
//                   )}
//                 </button>
//               </form>
//             </div>
//           </div>

//           {/* Right Side Content */}
//           <div className="lg:col-span-8 space-y-6">

//             {/* Bank Details */}
//             <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
//               <div className="flex items-center justify-between mb-6">
//                 <h2 className="text-lg font-semibold text-gray-900">Destination Account</h2>
//                 <div className="flex items-center text-green-600 bg-green-50 px-3 py-1 rounded-full text-sm border border-green-200">
//                   <CheckCircle className="w-4 h-4 mr-1" />
//                   Verified
//                 </div>
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div>
//                   <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
//                     Account Holder
//                   </label>
//                   <p className="text-gray-900 font-semibold">RAJESH KUMAR SHARMA</p>
//                 </div>

//                 <div>
//                   <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
//                     Account Number
//                   </label>
//                   <p className="text-gray-900 font-semibold font-mono">XXXX XXXX XXXX 8756</p>
//                 </div>

//                 <div>
//                   <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
//                     IFSC Code
//                   </label>
//                   <p className="text-gray-900 font-semibold">HDFC0001234</p>
//                 </div>

//                 <div>
//                   <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
//                     Bank Name
//                   </label>
//                   <p className="text-gray-900 font-semibold">HDFC Bank Limited</p>
//                 </div>
//               </div>
//             </div>

//             {/* Processing Information */}
//             <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
//               <h2 className="text-lg font-semibold text-gray-900 mb-4">Processing Information</h2>
              
//               <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
//                 <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
//                   <Clock className="w-5 h-5 text-blue-600" />
//                   <div>
//                     <p className="text-sm font-medium text-blue-900">Processing Time</p>
//                     <p className="text-xs text-blue-700">2-24 hours</p>
//                   </div>
//                 </div>
                
//                 <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg border border-green-200">
//                   <Shield className="w-5 h-5 text-green-600" />
//                   <div>
//                     <p className="text-sm font-medium text-green-900">Secure Transfer</p>
//                     <p className="text-xs text-green-700">Bank Grade Security</p>
//                   </div>
//                 </div>
                
//                 <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg border border-orange-200">
//                   <Info className="w-5 h-5 text-orange-600" />
//                   <div>
//                     <p className="text-sm font-medium text-orange-900">Processing Fee</p>
//                     <p className="text-xs text-orange-700">{feePercentage}% per transaction</p>
//                   </div>
//                 </div>
//               </div>

//               <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
//                 <div className="flex gap-3">
//                   <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
//                   <div>
//                     <h3 className="text-sm font-semibold text-yellow-800">Important Notes</h3>
//                     <ul className="text-sm text-yellow-700 mt-2 space-y-1">
//                       <li>• Ensure sufficient balance before initiating withdrawal</li>
//                       <li>• Processing during banking hours only (Mon-Fri, 10 AM - 4 PM)</li>
//                       <li>• Minimum: ₹{minWithdrawal}, Maximum: ₹{maxWithdrawal} per transaction</li>
//                       <li>• Failed transactions will be reversed within 24 hours</li>
//                     </ul>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Transaction History */}
//         <div className="mt-8">
//           <TransactionTable transactions={sampleData} />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default WithDrawal;



import React, { useState, useEffect } from "react";
import { Eye, EyeOff, AlertTriangle, CheckCircle, Info, Download, Building, CreditCard, Clock, Shield, ArrowRight, Smartphone } from "lucide-react";
import { useWithdrawHistoryQuery, useWithdrawRequestMutation, useCalculateWithdrawMutation, useGetSettingQuery } from "./withdrawApiSlice"; 


const TransactionTable = ({ transactions }) => {
  const [filterStatus, setFilterStatus] = useState('all');
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const filteredTransactions = transactions?.filter(t =>
    filterStatus === 'all' || t.status.toLowerCase() === filterStatus.toLowerCase()
  ) || [];

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'completed': return 'bg-green-50 text-green-700 border-green-200';
      case 'pending': return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case 'failed': return 'bg-red-50 text-red-700 border-red-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const getTypeColor = (type) => {
    switch (type.toLowerCase()) {
      case 'credit': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'debit': return 'bg-orange-50 text-orange-700 border-orange-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const TransactionCard = ({ transaction }) => (
    <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm space-y-3">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-xs text-gray-500 uppercase tracking-wide">Transaction ID</p>
          <p className="font-medium text-gray-900 text-sm">{transaction.transactionId}</p>
        </div>
        <div className="flex flex-col items-end gap-2">
          <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(transaction.status)}`}>
            {transaction.status}
          </span>
          <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getTypeColor(transaction.type)}`}>
            {transaction.type}
          </span>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-xs text-gray-500 uppercase tracking-wide">Amount</p>
          <p className="font-semibold text-gray-900">{transaction.amount}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500 uppercase tracking-wide">Method</p>
          <p className="text-sm text-gray-900">{transaction.paymentMethod}</p>
        </div>
      </div>
      
      <div>
        <p className="text-xs text-gray-500 uppercase tracking-wide">Date & Time</p>
        <p className="text-sm text-gray-900">{transaction.transactionDate}</p>
      </div>
    </div>
  );

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
      <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-semibold text-gray-900">Transaction History</h3>
            {isMobile && <Smartphone className="w-4 h-4 text-gray-500" />}
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-[#1d8e85] focus:border-[#1d8e85] text-gray-700 bg-white"
            >
              <option value="all">All Status</option>
              <option value="completed">Completed</option>
              <option value="pending">Pending</option>
              <option value="failed">Failed</option>
            </select>
            <button className="px-4 py-2 bg-[#1d8e85] text-white rounded-md text-sm hover:bg-[#166f67] focus:ring-2 focus:ring-[#1d8e85] focus:ring-offset-2 flex items-center gap-2 transition-colors">
              <Download className="w-4 h-4" />
              Export
            </button>
          </div>
        </div>
      </div>

      {isMobile ? (
        // Mobile Card View
        <div className="p-4">
          <div className="space-y-4">
            {filteredTransactions.map((transaction, index) => (
              <TransactionCard key={index} transaction={transaction} />
            ))}
          </div>
        </div>
      ) : (
        // Desktop Table View
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#1d8e85] text-white text-sm">
              <tr>
                <th className="px-6 py-3 text-left text-xs  uppercase tracking-wider">
                  Transaction ID
                </th>
                <th className="px-6 py-3 text-left text-xs   uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs   uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs   uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs   uppercase tracking-wider">
                  Date & Time
                </th>
                <th className="px-6 py-3 text-left text-xs   uppercase tracking-wider">
                  Method
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredTransactions.map((transaction, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {transaction.transactionId}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-semibold">
                    {transaction.amount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getTypeColor(transaction.type)}`}>
                      {transaction.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(transaction.status)}`}>
                      {transaction.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {transaction.transactionDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {transaction.paymentMethod}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {filteredTransactions.length === 0 && (
        <div className="px-6 py-8 text-center">
          <p className="text-gray-500">No transactions found matching your criteria.</p>
        </div>
      )}
    </div>
  );
};

const WithDrawal = () => {
  const [amount, setAmount] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [calculatedFee, setCalculatedFee] = useState(0);
  const [netAmount, setNetAmount] = useState(0);

  // API hooks
  const { data: settingsData, isLoading: settingsLoading } = useGetSettingQuery();
  const { data: historyData, isLoading: historyLoading } = useWithdrawHistoryQuery('');
  const [withdrawRequest, { isLoading: withdrawLoading }] = useWithdrawRequestMutation();
  const [calculateWithdraw, { isLoading: calculateLoading }] = useCalculateWithdrawMutation();

  const settings = settingsData || {};
  const availableBalance = settings.availableBalance || 15750.50;
  const minWithdrawal = settings.minWithdrawal || 100;
  const maxWithdrawal = settings.maxWithdrawal || 50000;
  const feePercentage = settings.feePercentage || 0.5;

  // Calculate fees when amount changes
  useEffect(() => {
    const calculateFees = async () => {
      if (amount && !isNaN(amount) && Number(amount) > 0) {
        try {
          const result = await calculateWithdraw({ amount: Number(amount) });
          setCalculatedFee(result.fee || 0);
          setNetAmount(result.netAmount || 0);
        } catch (error) {
          console.error('Fee calculation error:', error);
          const fee = Number(amount) * feePercentage / 100;
          setCalculatedFee(fee);
          setNetAmount(Number(amount) - fee);
        }
      } else {
        setCalculatedFee(0);
        setNetAmount(0);
      }
    };

    const debounceTimer = setTimeout(calculateFees, 500);
    return () => clearTimeout(debounceTimer);
  }, [amount, calculateWithdraw, feePercentage]);

  const validate = () => {
    const newErrors = {};
    const amountNum = Number(amount);

    if (!amount) {
      newErrors.amount = "Amount is required";
    } else if (isNaN(amountNum) || amountNum <= 0) {
      newErrors.amount = "Please enter a valid amount";
    } else if (amountNum < minWithdrawal) {
      newErrors.amount = `Minimum withdrawal amount is ₹${minWithdrawal}`;
    } else if (amountNum > maxWithdrawal) {
      newErrors.amount = `Maximum withdrawal amount is ₹${maxWithdrawal}`;
    } else if (amountNum > availableBalance) {
      newErrors.amount = "Insufficient balance";
    }

    if (!password) {
      newErrors.password = "Transaction password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleWithdraw = async () => {
    if (validate()) {
      setIsProcessing(true);
      try {
        const result = await withdrawRequest({
          amount: Number(amount),
          password: password,
          fee: calculatedFee,
          netAmount: netAmount
        });
        
        if (result.success) {
          alert(`Withdrawal request submitted successfully for ₹${amount}`);
          setAmount("");
          setPassword("");
          setCalculatedFee(0);
          setNetAmount(0);
        }
      } catch (error) {
        console.error('Withdrawal error:', error);
        alert("Withdrawal failed. Please try again.");
      } finally {
        setIsProcessing(false);
      }
    }
  };

  if (settingsLoading) {
    return (
      <div className="min-h-screen bg-[#1d8e85] flex items-center justify-center">
        <div className="bg-white rounded-lg p-8 shadow-lg">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 border-2 border-[#1d8e85] border-t-transparent rounded-full animate-spin"></div>
            <span className="text-gray-700">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#1d8e85]">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-[#1d8e85] rounded-lg shadow-lg">
                <Building className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-semibold text-gray-900">Fund Withdrawal</h1>
                <p className="text-sm text-gray-600">Secure transfer to your registered bank account</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-4">
            <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Withdrawal Request</h2>
                
                {/* Balance Display */}
                <div className="bg-[#1d8e85] rounded-lg p-4 text-white mb-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm opacity-90">Available Balance</p>
                      <p className="text-2xl font-bold">₹{availableBalance.toLocaleString('en-IN')}</p>
                    </div>
                    <CreditCard className="w-8 h-8 opacity-80" />
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                
                <div>
                  <label htmlFor="balanceType" className="block text-sm font-medium text-gray-700 mb-2">
                    Source Account
                  </label>
                  <select
                    id="balanceType"
                    className="w-full text-white px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#1d8e85] focus:border-[#1d8e85] bg-[#1d8e85]"
                  >
                    <option className="bg-[#1d8e85]">Available Balance</option>
                    <option className="bg-[#1d8e85]">Purchase Token(Jaimax)</option>
                  </select>
                </div>

                <div className="grid grid-cols-5 gap-3">
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Currency
                    </label>
                    <div className="px-3 py-2 bg-gray-100 border border-gray-300 rounded-md text-gray-900 font-medium text-center">
                      INR
                    </div>
                  </div>
                  <div className="col-span-3">
                    <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-2">
                      Amount *
                    </label>
                    <input
                      id="amount"
                      type="number"
                      placeholder="Enter amount"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-[#1d8e85] focus:border-[#1d8e85] ${
                        errors.amount ? 'border-red-300 bg-red-50' : 'border-gray-300'
                      }`}
                    />
                  </div>
                </div>
                {errors.amount && (
                  <p className="text-sm text-red-600 flex items-center gap-1">
                    <AlertTriangle className="w-4 h-4" />
                    {errors.amount}
                  </p>
                )}

                {/* Transaction Summary */}
                {amount && (
                  <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                    <h3 className="text-sm font-medium text-gray-900 mb-3">Transaction Summary</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Withdrawal Amount</span>
                        <span className="font-medium">₹{Number(amount).toLocaleString('en-IN')}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Processing Fee ({feePercentage}%)</span>
                        <span className="text-red-600">₹{calculatedFee.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between pt-2 border-t border-gray-200 font-semibold">
                        <span>Net Amount</span>
                        <span className="text-[#1d8e85]">₹{netAmount.toLocaleString('en-IN')}</span>
                      </div>
                    </div>
                    {calculateLoading && (
                      <div className="flex items-center gap-2 mt-2 text-sm text-gray-500">
                        <div className="w-3 h-3 border border-gray-400 border-t-transparent rounded-full animate-spin"></div>
                        Calculating fees...
                      </div>
                    )}
                  </div>
                )}

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                    Transaction Password *
                  </label>
                  <div className="relative">
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter transaction password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className={`w-full px-3 py-2 pr-10 border rounded-md focus:ring-2 focus:ring-[#1d8e85] focus:border-[#1d8e85] ${
                        errors.password ? 'border-red-300 bg-red-50' : 'border-gray-300'
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                      <AlertTriangle className="w-4 h-4" />
                      {errors.password}
                    </p>
                  )}
                </div>

                <button
                  type="button"
                  onClick={handleWithdraw}
                  disabled={isProcessing || withdrawLoading}
                  className="w-full bg-[#1d8e85] text-white py-3 px-4 rounded-md font-medium hover:bg-[#166f67] focus:ring-2 focus:ring-[#1d8e85] focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-colors"
                >
                  {isProcessing || withdrawLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Processing Request...
                    </>
                  ) : (
                    <>
                      Submit Withdrawal
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Right Side Content */}
          <div className="lg:col-span-8 space-y-6">
            {/* Bank Details */}
            <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900">Destination Account</h2>
                <div className="flex items-center text-green-600 bg-green-50 px-3 py-1 rounded-full text-sm border border-green-200">
                  <CheckCircle className="w-4 h-4 mr-1" />
                  Verified
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
                    Account Holder
                  </label>
                  <p className="text-gray-900 font-semibold">RAJESH KUMAR SHARMA</p>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
                    Account Number
                  </label>
                  <p className="text-gray-900 font-semibold font-mono">XXXX XXXX XXXX 8756</p>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
                    IFSC Code
                  </label>
                  <p className="text-gray-900 font-semibold">HDFC0001234</p>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
                    Bank Name
                  </label>
                  <p className="text-gray-900 font-semibold">HDFC Bank Limited</p>
                </div>
              </div>
            </div>

            {/* Processing Information */}
            <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Processing Information</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <Clock className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="text-sm font-medium text-blue-900">Processing Time</p>
                    <p className="text-xs text-blue-700">2-24 hours</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg border border-green-200">
                  <Shield className="w-5 h-5 text-green-600" />
                  <div>
                    <p className="text-sm font-medium text-green-900">Secure Transfer</p>
                    <p className="text-xs text-green-700">Bank Grade Security</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg border border-orange-200">
                  <Info className="w-5 h-5 text-orange-600" />
                  <div>
                    <p className="text-sm font-medium text-orange-900">Processing Fee</p>
                    <p className="text-xs text-orange-700">{feePercentage}% per transaction</p>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex gap-3">
                  <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-sm font-semibold text-yellow-800">Important Notes</h3>
                    <ul className="text-sm text-yellow-700 mt-2 space-y-1">
                      <li>• Ensure sufficient balance before initiating withdrawal</li>
                      <li>• Processing during banking hours only (Mon-Fri, 10 AM - 4 PM)</li>
                      <li>• Minimum: ₹{minWithdrawal}, Maximum: ₹{maxWithdrawal} per transaction</li>
                      <li>• Failed transactions will be reversed within 24 hours</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Transaction History */}
        <div className="mt-8">
          {historyLoading ? (
            <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
              <div className="flex items-center justify-center gap-3">
                <div className="w-6 h-6 border-2 border-[#1d8e85] border-t-transparent rounded-full animate-spin"></div>
                <span className="text-gray-700">Loading transaction history...</span>
              </div>
            </div>
          ) : (
            <TransactionTable transactions={historyData?.transactions || []} />
          )}
        </div>
      </div>
    </div>
  );
};

export default WithDrawal;