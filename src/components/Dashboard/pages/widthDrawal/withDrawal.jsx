
// // import React, { useState } from "react";
// // import TransactionDetails from './withDrawalHistory/withDrawalHistory';

// // const WithDrawal = () => {
// //   const [amount, setAmount] = useState("");
// //   const [password, setPassword] = useState("");
// //   const [errors, setErrors] = useState({});

// //   const sampleData = [
// //     {
// //       sno: 1,
// //       transactionId: "279RWYX",
// //       amount: "₹0.00",
// //       type: "Credit",
// //       paymentMethod: "Available Balance",
// //       currency: "INR",
// //       transactionDate: "29-04-2025 5:25 PM",
// //       status: "Completed",
// //       reason: "N/A",
// //     },
// //     // ... duplicate entries removed for brevity ...
// //   ];

// //   const validate = () => {
// //     const newErrors = {};
// //     if (!amount) {
// //       newErrors.amount = "Amount is required";
// //     } else if (isNaN(amount) || Number(amount) <= 0) {
// //       newErrors.amount = "Enter a valid positive amount";
// //     }

// //     if (!password) {
// //       newErrors.password = "Password is required";
// //     } else if (password.length < 6) {
// //       newErrors.password = "Password must be at least 6 characters";
// //     }

// //     setErrors(newErrors);
// //     return Object.keys(newErrors).length === 0;
// //   };

// //   const handleConfirm = () => {
// //     if (validate()) {
// //       alert(`Withdrawal confirmed for amount ₹${amount}`);
// //     }
// //   };

// //   return (
// //     <div className="min-h-screen w-full bg-[#1d8e85] text-white flex flex-col">
// //       <div className="px-4 sm:px-8 py-8 flex-grow">
// //         <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
// //           {/* Left Side */}
// //           <div className="space-y-6 min-w-0">
// //             <div>
// //               <label className="block mb-2 text-sm text-white">Balance Type</label>
// //               <select className="w-full bg-transparent border border-gray-500 rounded px-4 py-2 focus:outline-none text-white">
// //                 <option className="text-black">Available Balance</option>
// //               </select>
// //               <p className="mt-2 text-sm text-white break-words">
// //                 Total Available Balance : 0.00
// //               </p>
// //             </div>

// //             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
// //               <div>
// //                 <label className="block mb-2 text-sm text-white">Payment Currency</label>
// //                 <button className="w-full bg-[#4ecdc4] text-white font-medium py-2 rounded">
// //                   INR
// //                 </button>
// //               </div>
// //               <div>
// //                 <label className="block mb-2 text-sm text-white">Amount</label>
// //                 <input
// //                   type="number"
// //                   placeholder="Enter Amount ₹"
// //                   value={amount}
// //                   onChange={(e) => setAmount(e.target.value)}
// //                   className={`w-full bg-transparent border rounded px-4 py-2 focus:outline-none text-white ${errors.amount ? "border-red-500" : "border-gray-500"}`}
// //                 />
// //                 {errors.amount && (
// //                   <p className="text-red-500 text-xs mt-1">{errors.amount}</p>
// //                 )}
// //               </div>
// //             </div>

// //             <div className="text-sm text-white space-y-2">
// //               <div className="flex justify-between py-2 border-b border-gray-600">
// //                 <span>Fees</span>
// //                 <span>0</span>
// //               </div>
// //               <div className="flex justify-between py-2 border-b border-gray-600">
// //                 <span>Will Get</span>
// //                 <span>0</span>
// //               </div>
// //             </div>

// //             <button
// //               type="button"
// //               onClick={handleConfirm}
// //               className="w-full bg-gradient-to-r from-[#094e54] to-[#4ecdc4] text-white font-semibold px-6 py-3 rounded-full hover:from-[#0a5c64] hover:to-[#5dd5cd] transition"
// //             >
// //               Confirm Password
// //             </button>
// //           </div>

// //           {/* Center - Bank Details */}
// //           <div className="border border-gray-600 rounded p-6 min-w-0">
// //             <h2 className="text-lg font-bold mb-6 text-white">Bank Details</h2>
// //             <p className="mb-3 truncate text-white">Bank Holder Name</p>
// //             <p className="mb-3 truncate text-white">Bank Account Number</p>
// //             <p className="mb-3 truncate text-white">Bank IFSC Code</p>
// //             <p className="mt-4 truncate text-white">Bank Name</p>
// //           </div>

// //           {/* Right - Terms & Conditions */}
// //           <div className="min-w-0">
// //             <h2 className="text-lg font-bold mb-6 text-white">Terms & Conditions</h2>
// //             <ul className="list-decimal space-y-3 pl-5 text-sm text-white">
// //               <li>You have to complete the KYC and get approved status; then you can start the withdrawal process.</li>
// //               <li>The withdrawal department works only during banking hours (10 AM to 4 PM) from Monday to Friday.</li>
// //               <li>When you initiate the withdrawal process, the funds will be credited to your account within 24 hours.</li>
// //               <li>We are not responsible if you provide the wrong bank details. Please check them carefully before initiating the withdrawal process.</li>
// //             </ul>
// //           </div>
// //         </div>
// //       </div>

// //       {/* Transaction Table */}
// //       <div className="flex-grow flex flex-col px-4 sm:px-8 pb-8">
// //         <div className="overflow-x-auto">
// //           <TransactionDetails list={sampleData} />
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default WithDrawal;




// // import React, { useState } from "react";
// // import { Eye, EyeOff, AlertTriangle, CheckCircle, Info, Download, Filter } from "lucide-react";

// // const TransactionTable = ({ transactions }) => {
// //   const [filterStatus, setFilterStatus] = useState('all');
// //   const [sortBy, setSortBy] = useState('date');

// //   const filteredTransactions = transactions.filter(t => 
// //     filterStatus === 'all' || t.status.toLowerCase() === filterStatus.toLowerCase()
// //   );

// //   const getStatusColor = (status) => {
// //     switch (status.toLowerCase()) {
// //       case 'completed': return 'bg-green-50 text-green-800 border-green-200';
// //       case 'pending': return 'bg-yellow-50 text-yellow-800 border-yellow-200';
// //       case 'failed': return 'bg-red-50 text-red-800 border-red-200';
// //       default: return 'bg-gray-50 text-gray-800 border-gray-200';
// //     }
// //   };

// //   const getTypeColor = (type) => {
// //     return type === 'Credit' 
// //       ? 'bg-blue-50 text-blue-800 border-blue-200' 
// //       : 'bg-orange-50 text-orange-800 border-orange-200';
// //   };

// //   return (
// //     <div className="bg-white rounded-lg border border-gray-200">
// //       <div className="px-6 py-4 border-b border-gray-200">
// //         <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
// //           <h3 className="text-lg font-semibold text-gray-900">Transaction History</h3>
// //           <div className="flex flex-col sm:flex-row gap-3">
// //             <select 
// //               value={filterStatus}
// //               onChange={(e) => setFilterStatus(e.target.value)}
// //               className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
// //             >
// //               <option value="all">All Status</option>
// //               <option value="completed">Completed</option>
// //               <option value="pending">Pending</option>
// //               <option value="failed">Failed</option>
// //             </select>
// //             <button className="px-3 py-2 bg-gray-100 text-gray-700 rounded-md text-sm hover:bg-gray-200 flex items-center gap-2">
// //               <Download className="w-4 h-4" />
// //               Export
// //             </button>
// //           </div>
// //         </div>
// //       </div>
      
// //       <div className="overflow-x-auto">
// //         <table className="w-full">
// //           <thead className="bg-gray-50">
// //             <tr>
// //               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
// //                 Transaction ID
// //               </th>
// //               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
// //                 Amount
// //               </th>
// //               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
// //                 Type
// //               </th>
// //               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
// //                 Status
// //               </th>
// //               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
// //                 Date & Time
// //               </th>
// //               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
// //                 Method
// //               </th>
// //             </tr>
// //           </thead>
// //           <tbody className="bg-white divide-y divide-gray-200">
// //             {filteredTransactions.map((transaction, index) => (
// //               <tr key={index} className="hover:bg-gray-50">
// //                 <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
// //                   {transaction.transactionId}
// //                 </td>
// //                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-semibold">
// //                   {transaction.amount}
// //                 </td>
// //                 <td className="px-6 py-4 whitespace-nowrap">
// //                   <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-md border ${getTypeColor(transaction.type)}`}>
// //                     {transaction.type}
// //                   </span>
// //                 </td>
// //                 <td className="px-6 py-4 whitespace-nowrap">
// //                   <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-md border ${getStatusColor(transaction.status)}`}>
// //                     {transaction.status}
// //                   </span>
// //                 </td>
// //                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
// //                   {transaction.transactionDate}
// //                 </td>
// //                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
// //                   {transaction.paymentMethod}
// //                 </td>
// //               </tr>
// //             ))}
// //           </tbody>
// //         </table>
// //       </div>
      
// //       {filteredTransactions.length === 0 && (
// //         <div className="px-6 py-8 text-center">
// //           <p className="text-gray-500">No transactions found matching your criteria.</p>
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // const WithDrawal = () => {
// //   const [amount, setAmount] = useState("");
// //   const [password, setPassword] = useState("");
// //   const [showPassword, setShowPassword] = useState(false);
// //   const [errors, setErrors] = useState({});
// //   const [isProcessing, setIsProcessing] = useState(false);

// //   const sampleData = [
// //     {
// //       transactionId: "WD279RWYX001",
// //       amount: "₹2,500.00",
// //       type: "Debit",
// //       paymentMethod: "Bank Transfer",
// //       currency: "INR",
// //       transactionDate: "25-06-2025 2:30 PM",
// //       status: "Completed",
// //     },
// //     {
// //       transactionId: "WD280ABCD002",
// //       amount: "₹1,200.00",
// //       type: "Debit",
// //       paymentMethod: "Bank Transfer",
// //       currency: "INR",
// //       transactionDate: "24-06-2025 11:15 AM",
// //       status: "Pending",
// //     },
// //     {
// //       transactionId: "WD281EFGH003",
// //       amount: "₹850.00",
// //       type: "Debit",
// //       paymentMethod: "Bank Transfer",
// //       currency: "INR",
// //       transactionDate: "23-06-2025 4:45 PM",
// //       status: "Completed",
// //     },
// //     {
// //       transactionId: "CR282IJKL004",
// //       amount: "₹5,000.00",
// //       type: "Credit",
// //       paymentMethod: "Available Balance",
// //       currency: "INR",
// //       transactionDate: "22-06-2025 9:20 AM",
// //       status: "Completed",
// //     },
// //   ];

// //   const availableBalance = 15750.50;
// //   const minWithdrawal = 100;
// //   const maxWithdrawal = 50000;
// //   const feePercentage = 0.5; // 0.5%

// //   const validate = () => {
// //     const newErrors = {};
// //     const amountNum = Number(amount);

// //     if (!amount) {
// //       newErrors.amount = "Amount is required";
// //     } else if (isNaN(amountNum) || amountNum <= 0) {
// //       newErrors.amount = "Please enter a valid amount";
// //     } else if (amountNum < minWithdrawal) {
// //       newErrors.amount = `Minimum withdrawal amount is ₹${minWithdrawal}`;
// //     } else if (amountNum > maxWithdrawal) {
// //       newErrors.amount = `Maximum withdrawal amount is ₹${maxWithdrawal}`;
// //     } else if (amountNum > availableBalance) {
// //       newErrors.amount = "Insufficient balance";
// //     }

// //     if (!password) {
// //       newErrors.password = "Transaction password is required";
// //     } else if (password.length < 6) {
// //       newErrors.password = "Password must be at least 6 characters";
// //     }

// //     setErrors(newErrors);
// //     return Object.keys(newErrors).length === 0;
// //   };

// //   const handleWithdraw = async () => {
// //     if (validate()) {
// //       setIsProcessing(true);
// //       try {
// //         // Simulate API call
// //         await new Promise(resolve => setTimeout(resolve, 2000));
// //         alert(`Withdrawal request submitted successfully for ₹${amount}`);
// //         setAmount("");
// //         setPassword("");
// //       } catch (error) {
// //         alert("Withdrawal failed. Please try again.");
// //       } finally {
// //         setIsProcessing(false);
// //       }
// //     }
// //   };

// //   const calculatedFee = amount ? (Number(amount) * feePercentage / 100) : 0;
// //   const netAmount = amount ? (Number(amount) - calculatedFee) : 0;

// //   return (
// //     <div className="min-h-screen bg-gray-50">
// //       {/* Header */}
// //       <div className="bg-white border-b border-gray-200">
// //         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
// //           <div className="py-6">
// //             <h1 className="text-2xl font-bold text-gray-900">Withdraw Funds</h1>
// //             <p className="mt-1 text-sm text-gray-600">Transfer funds to your registered bank account</p>
// //           </div>
// //         </div>
// //       </div>

// //       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
// //         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
// //           {/* Withdrawal Form */}
// //           <div className="lg:col-span-1">
// //             <div className="bg-white rounded-lg border border-gray-200 p-6">
// //               <div className="mb-6">
// //                 <h2 className="text-lg font-semibold text-gray-900 mb-2">Withdrawal Details</h2>
// //                 <div className="bg-blue-50 border border-blue-200 rounded-md p-3">
// //                   <div className="flex items-center">
// //                     <Info className="w-4 h-4 text-blue-600 mr-2" />
// //                     <span className="text-sm text-blue-800">
// //                       Available Balance: <span className="font-semibold">₹{availableBalance.toLocaleString('en-IN')}</span>
// //                     </span>
// //                   </div>
// //                 </div>
// //               </div>

// //               <div className="space-y-6">
// //                 <div>
// //                   <label className="block text-sm font-medium text-gray-700 mb-2">
// //                     Balance Type
// //                   </label>
// //                   <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
// //                     <option>Available Balance</option>
// //                   </select>
// //                 </div>

// //                 <div className="grid grid-cols-2 gap-4">
// //                   <div>
// //                     <label className="block text-sm font-medium text-gray-700 mb-2">
// //                       Currency
// //                     </label>
// //                     <div className="px-3 py-2 bg-gray-100 border border-gray-300 rounded-md text-gray-900 font-medium text-center">
// //                       INR
// //                     </div>
// //                   </div>
// //                   <div>
// //                     <label className="block text-sm font-medium text-gray-700 mb-2">
// //                       Amount <span className="text-red-500">*</span>
// //                     </label>
// //                     <input
// //                       type="number"
// //                       placeholder="0.00"
// //                       value={amount}
// //                       onChange={(e) => setAmount(e.target.value)}
// //                       className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
// //                         errors.amount ? 'border-red-300 ring-2 ring-red-500' : 'border-gray-300'
// //                       }`}
// //                     />
// //                     {errors.amount && (
// //                       <p className="mt-1 text-sm text-red-600 flex items-center">
// //                         <AlertTriangle className="w-4 h-4 mr-1" />
// //                         {errors.amount}
// //                       </p>
// //                     )}
// //                   </div>
// //                 </div>

// //                 {/* Transaction Summary */}
// //                 {amount && (
// //                   <div className="bg-gray-50 rounded-md p-4 space-y-2">
// //                     <h3 className="text-sm font-medium text-gray-900">Transaction Summary</h3>
// //                     <div className="space-y-1 text-sm">
// //                       <div className="flex justify-between">
// //                         <span className="text-gray-600">Withdrawal Amount:</span>
// //                         <span className="font-medium">₹{Number(amount).toLocaleString('en-IN')}</span>
// //                       </div>
// //                       <div className="flex justify-between">
// //                         <span className="text-gray-600">Processing Fee ({feePercentage}%):</span>
// //                         <span className="text-red-600">- ₹{calculatedFee.toFixed(2)}</span>
// //                       </div>
// //                       <div className="flex justify-between pt-2 border-t border-gray-200">
// //                         <span className="font-medium text-gray-900">Net Amount:</span>
// //                         <span className="font-semibold text-green-600">₹{netAmount.toLocaleString('en-IN')}</span>
// //                       </div>
// //                     </div>
// //                   </div>
// //                 )}

// //                 <div>
// //                   <label className="block text-sm font-medium text-gray-700 mb-2">
// //                     Transaction Password <span className="text-red-500">*</span>
// //                   </label>
// //                   <div className="relative">
// //                     <input
// //                       type={showPassword ? "text" : "password"}
// //                       placeholder="Enter transaction password"
// //                       value={password}
// //                       onChange={(e) => setPassword(e.target.value)}
// //                       className={`w-full px-3 py-2 pr-10 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
// //                         errors.password ? 'border-red-300 ring-2 ring-red-500' : 'border-gray-300'
// //                       }`}
// //                     />
// //                     <button
// //                       type="button"
// //                       onClick={() => setShowPassword(!showPassword)}
// //                       className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
// //                     >
// //                       {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
// //                     </button>
// //                   </div>
// //                   {errors.password && (
// //                     <p className="mt-1 text-sm text-red-600 flex items-center">
// //                       <AlertTriangle className="w-4 h-4 mr-1" />
// //                       {errors.password}
// //                     </p>
// //                   )}
// //                 </div>

// //                 <button
// //                   onClick={handleWithdraw}
// //                   disabled={isProcessing}
// //                   className="w-full bg-blue-600 text-white py-3 px-4 rounded-md font-medium hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
// //                 >
// //                   {isProcessing ? (
// //                     <>
// //                       <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
// //                       Processing...
// //                     </>
// //                   ) : (
// //                     "Submit Withdrawal"
// //                   )}
// //                 </button>
// //               </div>
// //             </div>
// //           </div>

// //           {/* Right Side */}
// //           <div className="lg:col-span-2 space-y-8">
            
// //             {/* Bank Details */}
// //             <div className="bg-white rounded-lg border border-gray-200 p-6">
// //               <div className="flex items-center justify-between mb-4">
// //                 <h2 className="text-lg font-semibold text-gray-900">Registered Bank Account</h2>
// //                 <div className="flex items-center text-green-600">
// //                   <CheckCircle className="w-4 h-4 mr-1" />
// //                   <span className="text-sm font-medium">Verified</span>
// //                 </div>
// //               </div>
              
// //               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// //                 <div>
// //                   <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
// //                     Account Holder Name
// //                   </label>
// //                   <p className="text-gray-900 font-medium">RAJESH KUMAR SHARMA</p>
// //                 </div>
                
// //                 <div>
// //                   <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
// //                     Account Number
// //                   </label>
// //                   <p className="text-gray-900 font-medium">•••• •••• •••• 8756</p>
// //                 </div>
                
// //                 <div>
// //                   <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
// //                     IFSC Code
// //                   </label>
// //                   <p className="text-gray-900 font-medium">HDFC0001234</p>
// //                 </div>
                
// //                 <div>
// //                   <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
// //                     Bank Name
// //                   </label>
// //                   <p className="text-gray-900 font-medium">HDFC Bank</p>
// //                 </div>
// //               </div>
// //             </div>

// //             {/* Terms & Important Information */}
// //             <div className="bg-white rounded-lg border border-gray-200 p-6">
// //               <h2 className="text-lg font-semibold text-gray-900 mb-4">Withdrawal Terms & Conditions</h2>
              
// //               <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
// //                 <div className="space-y-3">
// //                   <div className="flex items-start">
// //                     <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-semibold mr-3">1</span>
// //                     <p className="text-sm text-gray-700">KYC verification must be completed and approved before withdrawal.</p>
// //                   </div>
                  
// //                   <div className="flex items-start">
// //                     <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-semibold mr-3">2</span>
// //                     <p className="text-sm text-gray-700">Processing time: 2-24 hours during banking hours (10 AM - 4 PM, Mon-Fri).</p>
// //                   </div>
// //                 </div>
                
// //                 <div className="space-y-3">
// //                   <div className="flex items-start">
// //                     <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-semibold mr-3">3</span>
// //                     <p className="text-sm text-gray-700">Minimum: ₹{minWithdrawal.toLocaleString('en-IN')}, Maximum: ₹{maxWithdrawal.toLocaleString('en-IN')} per transaction.</p>
// //                   </div>
                  
// //                   <div className="flex items-start">
// //                     <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-semibold mr-3">4</span>
// //                     <p className="text-sm text-gray-700">Verify bank details carefully. Incorrect details may cause delays or failures.</p>
// //                   </div>
// //                 </div>
// //               </div>

// //               <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
// //                 <div className="flex">
// //                   <AlertTriangle className="w-5 h-5 text-yellow-600 mr-3 flex-shrink-0" />
// //                   <div>
// //                     <h3 className="text-sm font-medium text-yellow-800">Important Notice</h3>
// //                     <p className="text-sm text-yellow-700 mt-1">
// //                       Processing fee of {feePercentage}% applies to all withdrawals. Funds will be transferred to your registered bank account only.
// //                     </p>
// //                   </div>
// //                 </div>
// //               </div>
// //             </div>
// //           </div>
// //         </div>

// //         {/* Transaction History */}
// //         <div className="mt-8">
// //           <TransactionTable transactions={sampleData} />
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default WithDrawal;




// // import React, { useState } from "react";
// // import { Eye, EyeOff, AlertTriangle, CheckCircle, Info, Download } from "lucide-react";

// // const TransactionTable = ({ transactions }) => {
// //   const [filterStatus, setFilterStatus] = useState('all');

// //   const filteredTransactions = transactions.filter(t =>
// //     filterStatus === 'all' || t.status.toLowerCase() === filterStatus.toLowerCase()
// //   );

// //   const getStatusColor = (status) => {
// //     switch (status.toLowerCase()) {
// //       case 'completed': return 'bg-green-100 text-green-800 border-green-200';
// //       case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
// //       case 'failed': return 'bg-red-100 text-red-800 border-red-200';
// //       default: return 'bg-gray-100 text-gray-800 border-gray-200';
// //     }
// //   };

// //   const getTypeColor = (type) => {
// //     // Reusing status colors for consistency with a white/teal theme
// //     switch (type.toLowerCase()) {
// //       case 'credit': return 'bg-teal-100 text-teal-800 border-teal-200'; // Teal for Credit
// //       case 'debit': return 'bg-orange-100 text-orange-800 border-orange-200'; // Orange for Debit (complementary to teal)
// //       default: return 'bg-gray-100 text-gray-800 border-gray-200';
// //     }
// //   };

// //   return (
// //     <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
// //       <div className="px-6 py-4 border-b border-gray-200">
// //         <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
// //           <h3 className="text-lg font-semibold text-gray-900">Transaction History</h3>
// //           <div className="flex flex-col sm:flex-row gap-3">
// //             <select
// //               value={filterStatus}
// //               onChange={(e) => setFilterStatus(e.target.value)}
// //               className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-teal-500 focus:border-teal-500 text-gray-700 bg-white"
// //             >
// //               <option value="all">All Status</option>
// //               <option value="completed">Completed</option>
// //               <option value="pending">Pending</option>
// //               <option value="failed">Failed</option>
// //             </select>
// //             <button className="px-3 py-2 bg-teal-600 text-white rounded-md text-sm hover:bg-teal-700 focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 flex items-center gap-2 transition-colors duration-200">
// //               <Download className="w-4 h-4" />
// //               Export
// //             </button>
// //           </div>
// //         </div>
// //       </div>

// //       <div className="overflow-x-auto">
// //         <table className="w-full">
// //           <thead className="bg-gray-50">
// //             <tr>
// //               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
// //                 Transaction ID
// //               </th>
// //               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
// //                 Amount
// //               </th>
// //               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
// //                 Type
// //               </th>
// //               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
// //                 Status
// //               </th>
// //               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
// //                 Date & Time
// //               </th>
// //               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
// //                 Method
// //               </th>
// //             </tr>
// //           </thead>
// //           <tbody className="bg-white divide-y divide-gray-200">
// //             {filteredTransactions.map((transaction, index) => (
// //               <tr key={index} className="hover:bg-gray-50">
// //                 <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
// //                   {transaction.transactionId}
// //                 </td>
// //                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-semibold">
// //                   {transaction.amount}
// //                 </td>
// //                 <td className="px-6 py-4 whitespace-nowrap">
// //                   <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-md border ${getTypeColor(transaction.type)}`}>
// //                     {transaction.type}
// //                   </span>
// //                 </td>
// //                 <td className="px-6 py-4 whitespace-nowrap">
// //                   <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-md border ${getStatusColor(transaction.status)}`}>
// //                     {transaction.status}
// //                   </span>
// //                 </td>
// //                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
// //                   {transaction.transactionDate}
// //                 </td>
// //                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
// //                   {transaction.paymentMethod}
// //                 </td>
// //               </tr>
// //             ))}
// //           </tbody>
// //         </table>
// //       </div>

// //       {filteredTransactions.length === 0 && (
// //         <div className="px-6 py-8 text-center">
// //           <p className="text-gray-500">No transactions found matching your criteria.</p>
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // const WithDrawal = () => {
// //   const [amount, setAmount] = useState("");
// //   const [password, setPassword] = useState("");
// //   const [showPassword, setShowPassword] = useState(false);
// //   const [errors, setErrors] = useState({});
// //   const [isProcessing, setIsProcessing] = useState(false);

// //   const sampleData = [
// //     {
// //       transactionId: "WD279RWYX001",
// //       amount: "₹2,500.00",
// //       type: "Debit",
// //       paymentMethod: "Bank Transfer",
// //       currency: "INR",
// //       transactionDate: "25-06-2025 2:30 PM",
// //       status: "Completed",
// //     },
// //     {
// //       transactionId: "WD280ABCD002",
// //       amount: "₹1,200.00",
// //       type: "Debit",
// //       paymentMethod: "Bank Transfer",
// //       currency: "INR",
// //       transactionDate: "24-06-2025 11:15 AM",
// //       status: "Pending",
// //     },
// //     {
// //       transactionId: "WD281EFGH003",
// //       amount: "₹850.00",
// //       type: "Debit",
// //       paymentMethod: "Bank Transfer",
// //       currency: "INR",
// //       transactionDate: "23-06-2025 4:45 PM",
// //       status: "Completed",
// //     },
// //     {
// //       transactionId: "CR282IJKL004",
// //       amount: "₹5,000.00",
// //       type: "Credit",
// //       paymentMethod: "Available Balance",
// //       currency: "INR",
// //       transactionDate: "22-06-2025 9:20 AM",
// //       status: "Completed",
// //     },
// //   ];

// //   const availableBalance = 15750.50;
// //   const minWithdrawal = 100;
// //   const maxWithdrawal = 50000;
// //   const feePercentage = 0.5; // 0.5%

// //   const validate = () => {
// //     const newErrors = {};
// //     const amountNum = Number(amount);

// //     if (!amount) {
// //       newErrors.amount = "Amount is required";
// //     } else if (isNaN(amountNum) || amountNum <= 0) {
// //       newErrors.amount = "Please enter a valid amount";
// //     } else if (amountNum < minWithdrawal) {
// //       newErrors.amount = `Minimum withdrawal amount is ₹${minWithdrawal}`;
// //     } else if (amountNum > maxWithdrawal) {
// //       newErrors.amount = `Maximum withdrawal amount is ₹${maxWithdrawal}`;
// //     } else if (amountNum > availableBalance) {
// //       newErrors.amount = "Insufficient balance";
// //     }

// //     if (!password) {
// //       newErrors.password = "Transaction password is required";
// //     } else if (password.length < 6) {
// //       newErrors.password = "Password must be at least 6 characters";
// //     }

// //     setErrors(newErrors);
// //     return Object.keys(newErrors).length === 0;
// //   };

// //   const handleWithdraw = async () => {
// //     if (validate()) {
// //       setIsProcessing(true);
// //       try {
// //         // Simulate API call
// //         await new Promise(resolve => setTimeout(resolve, 2000));
// //         alert(`Withdrawal request submitted successfully for ₹${amount}`);
// //         setAmount("");
// //         setPassword("");
// //       } catch (error) {
// //         alert("Withdrawal failed. Please try again.");
// //       } finally {
// //         setIsProcessing(false);
// //       }
// //     }
// //   };

// //   const calculatedFee = amount ? (Number(amount) * feePercentage / 100) : 0;
// //   const netAmount = amount ? (Number(amount) - calculatedFee) : 0;

// //   return (
// //     <div className="min-h-screen bg-gray-50 font-sans">
// //       {/* Header */}
// //       <div className="bg-white border-b border-gray-200 shadow-sm">
// //         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
// //           <div className="py-6">
// //             <h1 className="text-2xl font-bold text-gray-900">Withdraw Funds</h1>
// //             <p className="mt-1 text-sm text-gray-600">Transfer funds to your registered bank account</p>
// //           </div>
// //         </div>
// //       </div>

// //       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
// //         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

// //           {/* Withdrawal Form */}
// //           <div className="lg:col-span-1">
// //             <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
// //               <div className="mb-6">
// //                 <h2 className="text-lg font-semibold text-gray-900 mb-2">Withdrawal Details</h2>
// //                 <div className="bg-teal-50 border border-teal-200 rounded-md p-3">
// //                   <div className="flex items-center">
// //                     <Info className="w-4 h-4 text-teal-600 mr-2" />
// //                     <span className="text-sm text-teal-800">
// //                       Available Balance: <span className="font-semibold">₹{availableBalance.toLocaleString('en-IN')}</span>
// //                     </span>
// //                   </div>
// //                 </div>
// //               </div>

// //               <div className="space-y-6">
// //                 <div>
// //                   <label htmlFor="balanceType" className="block text-sm font-medium text-gray-700 mb-2">
// //                     Balance Type
// //                   </label>
// //                   <select
// //                     id="balanceType"
// //                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500 text-gray-700 bg-white"
// //                   >
// //                     <option>Available Balance</option>
// //                   </select>
// //                 </div>

// //                 <div className="grid grid-cols-2 gap-4">
// //                   <div>
// //                     <label className="block text-sm font-medium text-gray-700 mb-2">
// //                       Currency
// //                     </label>
// //                     <div className="px-3 py-2 bg-gray-100 border border-gray-300 rounded-md text-gray-900 font-medium text-center">
// //                       INR
// //                     </div>
// //                   </div>
// //                   <div>
// //                     <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-2">
// //                       Amount <span className="text-red-500">*</span>
// //                     </label>
// //                     <input
// //                       id="amount"
// //                       type="number"
// //                       placeholder="0.00"
// //                       value={amount}
// //                       onChange={(e) => setAmount(e.target.value)}
// //                       className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-teal-500 focus:border-teal-500 ${
// //                         errors.amount ? 'border-red-400 ring-2 ring-red-200' : 'border-gray-300'
// //                       }`}
// //                     />
// //                     {errors.amount && (
// //                       <p className="mt-1 text-sm text-red-600 flex items-center">
// //                         <AlertTriangle className="w-4 h-4 mr-1" />
// //                         {errors.amount}
// //                       </p>
// //                     )}
// //                   </div>
// //                 </div>

// //                 {/* Transaction Summary */}
// //                 {amount && (
// //                   <div className="bg-gray-50 rounded-md p-4 space-y-2 border border-gray-200">
// //                     <h3 className="text-sm font-medium text-gray-900">Transaction Summary</h3>
// //                     <div className="space-y-1 text-sm">
// //                       <div className="flex justify-between">
// //                         <span className="text-gray-600">Withdrawal Amount:</span>
// //                         <span className="font-medium text-gray-900">₹{Number(amount).toLocaleString('en-IN')}</span>
// //                       </div>
// //                       <div className="flex justify-between">
// //                         <span className="text-gray-600">Processing Fee ({feePercentage}%):</span>
// //                         <span className="text-red-600">- ₹{calculatedFee.toFixed(2)}</span>
// //                       </div>
// //                       <div className="flex justify-between pt-2 border-t border-gray-200 mt-2">
// //                         <span className="font-semibold text-gray-900">Net Amount:</span>
// //                         <span className="font-bold text-green-600">₹{netAmount.toLocaleString('en-IN')}</span>
// //                       </div>
// //                     </div>
// //                   </div>
// //                 )}

// //                 <div>
// //                   <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
// //                     Transaction Password <span className="text-red-500">*</span>
// //                   </label>
// //                   <div className="relative">
// //                     <input
// //                       id="password"
// //                       type={showPassword ? "text" : "password"}
// //                       placeholder="Enter transaction password"
// //                       value={password}
// //                       onChange={(e) => setPassword(e.target.value)}
// //                       className={`w-full px-3 py-2 pr-10 border rounded-md focus:ring-2 focus:ring-teal-500 focus:border-teal-500 ${
// //                         errors.password ? 'border-red-400 ring-2 ring-red-200' : 'border-gray-300'
// //                       }`}
// //                     />
// //                     <button
// //                       type="button"
// //                       onClick={() => setShowPassword(!showPassword)}
// //                       className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
// //                     >
// //                       {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
// //                     </button>
// //                   </div>
// //                   {errors.password && (
// //                     <p className="mt-1 text-sm text-red-600 flex items-center">
// //                       <AlertTriangle className="w-4 h-4 mr-1" />
// //                       {errors.password}
// //                     </p>
// //                   )}
// //                 </div>

// //                 <button
// //                   onClick={handleWithdraw}
// //                   disabled={isProcessing}
// //                   className="w-full bg-teal-600 text-white py-3 px-4 rounded-md font-medium hover:bg-teal-700 focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transition-colors duration-200"
// //                 >
// //                   {isProcessing ? (
// //                     <>
// //                       <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
// //                       Processing...
// //                     </>
// //                   ) : (
// //                     "Submit Withdrawal"
// //                   )}
// //                 </button>
// //               </div>
// //             </div>
// //           </div>

// //           {/* Right Side */}
// //           <div className="lg:col-span-2 space-y-8">

// //             {/* Bank Details */}
// //             <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
// //               <div className="flex items-center justify-between mb-4">
// //                 <h2 className="text-lg font-semibold text-gray-900">Registered Bank Account</h2>
// //                 <div className="flex items-center text-green-600 bg-green-50 px-2 py-1 rounded-full border border-green-200">
// //                   <CheckCircle className="w-4 h-4 mr-1" />
// //                   <span className="text-sm font-medium">Verified</span>
// //                 </div>
// //               </div>

// //               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// //                 <div>
// //                   <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
// //                     Account Holder Name
// //                   </label>
// //                   <p className="text-gray-900 font-medium">RAJESH KUMAR SHARMA</p>
// //                 </div>

// //                 <div>
// //                   <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
// //                     Account Number
// //                   </label>
// //                   <p className="text-gray-900 font-medium">•••• •••• •••• 8756</p>
// //                 </div>

// //                 <div>
// //                   <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
// //                     IFSC Code
// //                   </label>
// //                   <p className="text-gray-900 font-medium">HDFC0001234</p>
// //                 </div>

// //                 <div>
// //                   <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
// //                     Bank Name
// //                   </label>
// //                   <p className="text-gray-900 font-medium">HDFC Bank</p>
// //                 </div>
// //               </div>
// //             </div>

// //             {/* Terms & Important Information */}
// //             <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
// //               <h2 className="text-lg font-semibold text-gray-900 mb-4">Withdrawal Terms & Conditions</h2>

// //               <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
// //                 <div className="space-y-3">
// //                   <div className="flex items-start">
// //                     <span className="flex-shrink-0 w-6 h-6 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center text-xs font-semibold mr-3">1</span>
// //                     <p className="text-sm text-gray-700">KYC verification must be completed and approved before withdrawal.</p>
// //                   </div>

// //                   <div className="flex items-start">
// //                     <span className="flex-shrink-0 w-6 h-6 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center text-xs font-semibold mr-3">2</span>
// //                     <p className="text-sm text-gray-700">Processing time: 2-24 hours during banking hours (10 AM - 4 PM, Mon-Fri).</p>
// //                   </div>
// //                 </div>

// //                 <div className="space-y-3">
// //                   <div className="flex items-start">
// //                     <span className="flex-shrink-0 w-6 h-6 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center text-xs font-semibold mr-3">3</span>
// //                     <p className="text-sm text-gray-700">Minimum: ₹{minWithdrawal.toLocaleString('en-IN')}, Maximum: ₹{maxWithdrawal.toLocaleString('en-IN')} per transaction.</p>
// //                   </div>

// //                   <div className="flex items-start">
// //                     <span className="flex-shrink-0 w-6 h-6 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center text-xs font-semibold mr-3">4</span>
// //                     <p className="text-sm text-gray-700">Verify bank details carefully. Incorrect details may cause delays or failures.</p>
// //                   </div>
// //                 </div>
// //               </div>

// //               <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
// //                 <div className="flex">
// //                   <AlertTriangle className="w-5 h-5 text-yellow-600 mr-3 flex-shrink-0" />
// //                   <div>
// //                     <h3 className="text-sm font-medium text-yellow-800">Important Notice</h3>
// //                     <p className="text-sm text-yellow-700 mt-1">
// //                       Processing fee of {feePercentage}% applies to all withdrawals. Funds will be transferred to your registered bank account only.
// //                     </p>
// //                   </div>
// //                 </div>
// //               </div>
// //             </div>
// //           </div>
// //         </div>

// //         {/* Transaction History */}
// //         <div className="mt-8">
// //           <TransactionTable transactions={sampleData} />
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };



// // export default WithDrawal;



// // import React, { useState } from "react";
// // import { Eye, EyeOff, AlertTriangle, CheckCircle, Info, Download, Building, CreditCard, Clock, Shield, ArrowRight } from "lucide-react";

// // const TransactionTable = ({ transactions }) => {
// //   const [filterStatus, setFilterStatus] = useState('all');

// //   const filteredTransactions = transactions.filter(t =>
// //     filterStatus === 'all' || t.status.toLowerCase() === filterStatus.toLowerCase()
// //   );

// //   const getStatusColor = (status) => {
// //     switch (status.toLowerCase()) {
// //       case 'completed': return 'bg-green-50 text-green-700 border-green-200';
// //       case 'pending': return 'bg-yellow-50 text-yellow-700 border-yellow-200';
// //       case 'failed': return 'bg-red-50 text-red-700 border-red-200';
// //       default: return 'bg-gray-50 text-gray-700 border-gray-200';
// //     }
// //   };

// //   const getTypeColor = (type) => {
// //     switch (type.toLowerCase()) {
// //       case 'credit': return 'bg-blue-50 text-blue-700 border-blue-200';
// //       case 'debit': return 'bg-orange-50 text-orange-700 border-orange-200';
// //       default: return 'bg-gray-50 text-gray-700 border-gray-200';
// //     }
// //   };

// //   return (
// //     <div className="bg-[#1d8e85] rounded-lg border border-gray-200 shadow-sm">
// //       <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
// //         <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
// //           <h3 className="text-lg font-semibold text-gray-900">Transaction History</h3>
// //           <div className="flex flex-col sm:flex-row gap-3">
// //             <select
// //               value={filterStatus}
// //               onChange={(e) => setFilterStatus(e.target.value)}
// //               className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-[#1d8e85] focus:border-[#1d8e85] text-gray-700 bg-white"
// //             >
// //               <option value="all">All Status</option>
// //               <option value="completed">Completed</option>
// //               <option value="pending">Pending</option>
// //               <option value="failed">Failed</option>
// //             </select>
// //             <button className="px-4 py-2 bg-[#1d8e85] text-white rounded-md text-sm hover:bg-[#166f67] focus:ring-2 focus:ring-[#1d8e85] focus:ring-offset-2 flex items-center gap-2 transition-colors">
// //               <Download className="w-4 h-4" />
// //               Export
// //             </button>
// //           </div>
// //         </div>
// //       </div>

// //       <div className="overflow-x-auto">
// //         <table className="w-full">
// //           <thead className="bg-gray-50">
// //             <tr>
// //               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
// //                 Transaction ID
// //               </th>
// //               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
// //                 Amount
// //               </th>
// //               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
// //                 Type
// //               </th>
// //               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
// //                 Status
// //               </th>
// //               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
// //                 Date & Time
// //               </th>
// //               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
// //                 Method
// //               </th>
// //             </tr>
// //           </thead>
// //           <tbody className="bg-white divide-y divide-gray-200">
// //             {filteredTransactions.map((transaction, index) => (
// //               <tr key={index} className="hover:bg-gray-50">
// //                 <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
// //                   {transaction.transactionId}
// //                 </td>
// //                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-semibold">
// //                   {transaction.amount}
// //                 </td>
// //                 <td className="px-6 py-4 whitespace-nowrap">
// //                   <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getTypeColor(transaction.type)}`}>
// //                     {transaction.type}
// //                   </span>
// //                 </td>
// //                 <td className="px-6 py-4 whitespace-nowrap">
// //                   <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(transaction.status)}`}>
// //                     {transaction.status}
// //                   </span>
// //                 </td>
// //                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
// //                   {transaction.transactionDate}
// //                 </td>
// //                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
// //                   {transaction.paymentMethod}
// //                 </td>
// //               </tr>
// //             ))}
// //           </tbody>
// //         </table>
// //       </div>

// //       {filteredTransactions.length === 0 && (
// //         <div className="px-6 py-8 text-center">
// //           <p className="text-gray-500">No transactions found matching your criteria.</p>
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // const WithDrawal = () => {
// //   const [amount, setAmount] = useState("");
// //   const [password, setPassword] = useState("");
// //   const [showPassword, setShowPassword] = useState(false);
// //   const [errors, setErrors] = useState({});
// //   const [isProcessing, setIsProcessing] = useState(false);

// //   const sampleData = [
// //     {
// //       transactionId: "WD279RWYX001",
// //       amount: "₹2,500.00",
// //       type: "Debit",
// //       paymentMethod: "Bank Transfer",
// //       currency: "INR",
// //       transactionDate: "25-06-2025 2:30 PM",
// //       status: "Completed",
// //     },
// //     {
// //       transactionId: "WD280ABCD002",
// //       amount: "₹1,200.00",
// //       type: "Debit",
// //       paymentMethod: "Bank Transfer",
// //       currency: "INR",
// //       transactionDate: "24-06-2025 11:15 AM",
// //       status: "Pending",
// //     },
// //     {
// //       transactionId: "WD281EFGH003",
// //       amount: "₹850.00",
// //       type: "Debit",
// //       paymentMethod: "Bank Transfer",
// //       currency: "INR",
// //       transactionDate: "23-06-2025 4:45 PM",
// //       status: "Completed",
// //     },
// //     {
// //       transactionId: "CR282IJKL004",
// //       amount: "₹5,000.00",
// //       type: "Credit",
// //       paymentMethod: "Available Balance",
// //       currency: "INR",
// //       transactionDate: "22-06-2025 9:20 AM",
// //       status: "Completed",
// //     },
// //   ];

// //   const availableBalance = 15750.50;
// //   const minWithdrawal = 100;
// //   const maxWithdrawal = 50000;
// //   const feePercentage = 0.5;

// //   const validate = () => {
// //     const newErrors = {};
// //     const amountNum = Number(amount);

// //     if (!amount) {
// //       newErrors.amount = "Amount is required";
// //     } else if (isNaN(amountNum) || amountNum <= 0) {
// //       newErrors.amount = "Please enter a valid amount";
// //     } else if (amountNum < minWithdrawal) {
// //       newErrors.amount = `Minimum withdrawal amount is ₹${minWithdrawal}`;
// //     } else if (amountNum > maxWithdrawal) {
// //       newErrors.amount = `Maximum withdrawal amount is ₹${maxWithdrawal}`;
// //     } else if (amountNum > availableBalance) {
// //       newErrors.amount = "Insufficient balance";
// //     }

// //     if (!password) {
// //       newErrors.password = "Transaction password is required";
// //     } else if (password.length < 6) {
// //       newErrors.password = "Password must be at least 6 characters";
// //     }

// //     setErrors(newErrors);
// //     return Object.keys(newErrors).length === 0;
// //   };

// //   const handleWithdraw = async () => {
// //     if (validate()) {
// //       setIsProcessing(true);
// //       try {
// //         await new Promise(resolve => setTimeout(resolve, 2000));
// //         alert(`Withdrawal request submitted successfully for ₹${amount}`);
// //         setAmount("");
// //         setPassword("");
// //       } catch (error) {
// //         alert("Withdrawal failed. Please try again.");
// //       } finally {
// //         setIsProcessing(false);
// //       }
// //     }
// //   };

// //   const calculatedFee = amount ? (Number(amount) * feePercentage / 100) : 0;
// //   const netAmount = amount ? (Number(amount) - calculatedFee) : 0;

// //   return (
// //     <div className="min-h-screen bg-[#1d8e85] ">
// //       {/* Header */}
// //       <div className="bg-white border-b border-gray-200">
// //         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
// //           <div className="py-6">
// //             <div className="flex items-center gap-3 ">
// //               <div className="p-2 bg-[#1d8e85] rounded-lg shadow-lg">
// //                 <Building className="w-6 h-6 text-white" />
// //               </div>
// //               <div>
// //                 <h1 className="text-2xl font-semibold text-gray-900">Fund Withdrawal</h1>
// //                 <p className="text-sm text-gray-600">Secure transfer to your registered bank account</p>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       </div>

// //       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 ">
// //         <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
// //           <div className="lg:col-span-4 ">
// //             <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
// //               <div className="mb-6">
// //                 <h2 className="text-lg font-semibold text-gray-900 mb-4">Withdrawal Request</h2>
                
// //                 {/* Balance Display */}
// //                 <div className="bg-[#1d8e85] rounded-lg p-4 text-white mb-6">
// //                   <div className="flex items-center justify-between">
// //                     <div>
// //                       <p className="text-sm opacity-90">Available Balance</p>
// //                       <p className="text-2xl font-bold">₹{availableBalance.toLocaleString('en-IN')}</p>
// //                     </div>
// //                     <CreditCard className="w-8 h-8 opacity-80" />
// //                   </div>
// //                 </div>
// //               </div>

// //               <form className="space-y-6">
// //                 <div>
// //                   <label htmlFor="balanceType" className="block text-sm font-medium text-gray-700 mb-2">
// //                     Source Account
// //                   </label>
// //                   <select
// //                     id="balanceType"
// //                     className="w-full text-gray-700  px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#1d8e85] focus:border-[#1d8e85]  bg-[#1d8e85]"
// //                   >
// //                     <option className="bg-[#1d8e85]">Available Balance</option>
// //                     <option className="bg-[#1d8e85]"> Purchase Token(Jaimax)</option>
// //                   </select>
// //                 </div>

// //                 <div className="grid grid-cols-5 gap-3">
// //                   <div className="col-span-2">
// //                     <label className="block text-sm font-medium text-gray-700 mb-2">
// //                       Currency
// //                     </label>
// //                     <div className="px-3 py-2 bg-gray-100 border border-gray-300 rounded-md text-gray-900 font-medium text-center">
// //                       INR
// //                     </div>
// //                   </div>
// //                   <div className="col-span-3">
// //                     <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-2">
// //                       Amount *
// //                     </label>
// //                     <input
// //                       id="amount"
// //                       type="number"
// //                       placeholder="Enter amount"
// //                       value={amount}
// //                       onChange={(e) => setAmount(e.target.value)}
// //                       className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-[#1d8e85] focus:border-[#1d8e85] ${
// //                         errors.amount ? 'border-red-300 bg-red-50' : 'border-gray-300'
// //                       }`}
// //                     />
// //                   </div>
// //                 </div>
// //                 {errors.amount && (
// //                   <p className="text-sm text-red-600 flex items-center gap-1">
// //                     <AlertTriangle className="w-4 h-4" />
// //                     {errors.amount}
// //                   </p>
// //                 )}

// //                 {/* Transaction Summary */}
// //                 {amount && (
// //                   <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
// //                     <h3 className="text-sm font-medium text-gray-900 mb-3">Transaction Summary</h3>
// //                     <div className="space-y-2 text-sm">
// //                       <div className="flex justify-between">
// //                         <span className="text-gray-600">Withdrawal Amount</span>
// //                         <span className="font-medium">₹{Number(amount).toLocaleString('en-IN')}</span>
// //                       </div>
// //                       <div className="flex justify-between">
// //                         <span className="text-gray-600">Processing Fee ({feePercentage}%)</span>
// //                         <span className="text-red-600">₹{calculatedFee.toFixed(2)}</span>
// //                       </div>
// //                       <div className="flex justify-between pt-2 border-t border-gray-200 font-semibold">
// //                         <span>Net Amount</span>
// //                         <span className="text-[#1d8e85]">₹{netAmount.toLocaleString('en-IN')}</span>
// //                       </div>
// //                     </div>
// //                   </div>
// //                 )}

// //                 <div>
// //                   <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
// //                     Transaction Password *
// //                   </label>
// //                   <div className="relative">
// //                     <input
// //                       id="password"
// //                       type={showPassword ? "text" : "password"}
// //                       placeholder="Enter transaction password"
// //                       value={password}
// //                       onChange={(e) => setPassword(e.target.value)}
// //                       className={`w-full px-3 py-2 pr-10 border rounded-md focus:ring-2 focus:ring-[#1d8e85] focus:border-[#1d8e85] ${
// //                         errors.password ? 'border-red-300 bg-red-50' : 'border-gray-300'
// //                       }`}
// //                     />
// //                     <button
// //                       type="button"
// //                       onClick={() => setShowPassword(!showPassword)}
// //                       className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
// //                     >
// //                       {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
// //                     </button>
// //                   </div>
// //                   {errors.password && (
// //                     <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
// //                       <AlertTriangle className="w-4 h-4" />
// //                       {errors.password}
// //                     </p>
// //                   )}
// //                 </div>

// //                 <button
// //                   type="button"
// //                   onClick={handleWithdraw}
// //                   disabled={isProcessing}
// //                   className="w-full bg-[#1d8e85] text-white py-3 px-4 rounded-md font-medium hover:bg-[#166f67] focus:ring-2 focus:ring-[#1d8e85] focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-colors"
// //                 >
// //                   {isProcessing ? (
// //                     <>
// //                       <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
// //                       Processing Request...
// //                     </>
// //                   ) : (
// //                     <>
// //                       Submit Withdrawal
// //                       <ArrowRight className="w-4 h-4" />
// //                     </>
// //                   )}
// //                 </button>
// //               </form>
// //             </div>
// //           </div>

// //           {/* Right Side Content */}
// //           <div className="lg:col-span-8 space-y-6">

// //             {/* Bank Details */}
// //             <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
// //               <div className="flex items-center justify-between mb-6">
// //                 <h2 className="text-lg font-semibold text-gray-900">Destination Account</h2>
// //                 <div className="flex items-center text-green-600 bg-green-50 px-3 py-1 rounded-full text-sm border border-green-200">
// //                   <CheckCircle className="w-4 h-4 mr-1" />
// //                   Verified
// //                 </div>
// //               </div>

// //               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// //                 <div>
// //                   <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
// //                     Account Holder
// //                   </label>
// //                   <p className="text-gray-900 font-semibold">RAJESH KUMAR SHARMA</p>
// //                 </div>

// //                 <div>
// //                   <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
// //                     Account Number
// //                   </label>
// //                   <p className="text-gray-900 font-semibold font-mono">XXXX XXXX XXXX 8756</p>
// //                 </div>

// //                 <div>
// //                   <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
// //                     IFSC Code
// //                   </label>
// //                   <p className="text-gray-900 font-semibold">HDFC0001234</p>
// //                 </div>

// //                 <div>
// //                   <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
// //                     Bank Name
// //                   </label>
// //                   <p className="text-gray-900 font-semibold">HDFC Bank Limited</p>
// //                 </div>
// //               </div>
// //             </div>

// //             {/* Processing Information */}
// //             <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
// //               <h2 className="text-lg font-semibold text-gray-900 mb-4">Processing Information</h2>
              
// //               <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
// //                 <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
// //                   <Clock className="w-5 h-5 text-blue-600" />
// //                   <div>
// //                     <p className="text-sm font-medium text-blue-900">Processing Time</p>
// //                     <p className="text-xs text-blue-700">2-24 hours</p>
// //                   </div>
// //                 </div>
                
// //                 <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg border border-green-200">
// //                   <Shield className="w-5 h-5 text-green-600" />
// //                   <div>
// //                     <p className="text-sm font-medium text-green-900">Secure Transfer</p>
// //                     <p className="text-xs text-green-700">Bank Grade Security</p>
// //                   </div>
// //                 </div>
                
// //                 <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg border border-orange-200">
// //                   <Info className="w-5 h-5 text-orange-600" />
// //                   <div>
// //                     <p className="text-sm font-medium text-orange-900">Processing Fee</p>
// //                     <p className="text-xs text-orange-700">{feePercentage}% per transaction</p>
// //                   </div>
// //                 </div>
// //               </div>

// //               <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
// //                 <div className="flex gap-3">
// //                   <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
// //                   <div>
// //                     <h3 className="text-sm font-semibold text-yellow-800">Important Notes</h3>
// //                     <ul className="text-sm text-yellow-700 mt-2 space-y-1">
// //                       <li>• Ensure sufficient balance before initiating withdrawal</li>
// //                       <li>• Processing during banking hours only (Mon-Fri, 10 AM - 4 PM)</li>
// //                       <li>• Minimum: ₹{minWithdrawal}, Maximum: ₹{maxWithdrawal} per transaction</li>
// //                       <li>• Failed transactions will be reversed within 24 hours</li>
// //                     </ul>
// //                   </div>
// //                 </div>
// //               </div>
// //             </div>
// //           </div>
// //         </div>

// //         {/* Transaction History */}
// //         <div className="mt-8">
// //           <TransactionTable transactions={sampleData} />
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default WithDrawal;



// // import React, { useState, useEffect } from "react";
// // import { Eye, EyeOff, AlertTriangle, CheckCircle, Info, Download, Building, CreditCard, Clock, Shield, ArrowRight, Smartphone } from "lucide-react";
// // import { useWithdrawHistoryQuery, useWithdrawRequestMutation, useCalculateWithdrawMutation, useGetSettingQuery } from "./withdrawApiSlice"; 


// // const TransactionTable = ({ transactions }) => {
// //   const [filterStatus, setFilterStatus] = useState('all');
// //   const [isMobile, setIsMobile] = useState(false);

// //   useEffect(() => {
// //     const checkMobile = () => {
// //       setIsMobile(window.innerWidth < 768);
// //     };
    
// //     checkMobile();
// //     window.addEventListener('resize', checkMobile);
// //     return () => window.removeEventListener('resize', checkMobile);
// //   }, []);

// //   const filteredTransactions = transactions?.filter(t =>
// //     filterStatus === 'all' || t.status.toLowerCase() === filterStatus.toLowerCase()
// //   ) || [];

// //   const getStatusColor = (status) => {
// //     switch (status.toLowerCase()) {
// //       case 'completed': return 'bg-green-50 text-green-700 border-green-200';
// //       case 'pending': return 'bg-yellow-50 text-yellow-700 border-yellow-200';
// //       case 'failed': return 'bg-red-50 text-red-700 border-red-200';
// //       default: return 'bg-gray-50 text-gray-700 border-gray-200';
// //     }
// //   };

// //   const getTypeColor = (type) => {
// //     switch (type.toLowerCase()) {
// //       case 'credit': return 'bg-blue-50 text-blue-700 border-blue-200';
// //       case 'debit': return 'bg-orange-50 text-orange-700 border-orange-200';
// //       default: return 'bg-gray-50 text-gray-700 border-gray-200';
// //     }
// //   };

// //   const TransactionCard = ({ transaction }) => (
// //     <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm space-y-3">
// //       <div className="flex justify-between items-start">
// //         <div>
// //           <p className="text-xs text-gray-500 uppercase tracking-wide">Transaction ID</p>
// //           <p className="font-medium text-gray-900 text-sm">{transaction.transactionId}</p>
// //         </div>
// //         <div className="flex flex-col items-end gap-2">
// //           <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(transaction.status)}`}>
// //             {transaction.status}
// //           </span>
// //           <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getTypeColor(transaction.type)}`}>
// //             {transaction.type}
// //           </span>
// //         </div>
// //       </div>
      
// //       <div className="grid grid-cols-2 gap-4">
// //         <div>
// //           <p className="text-xs text-gray-500 uppercase tracking-wide">Amount</p>
// //           <p className="font-semibold text-gray-900">{transaction.amount}</p>
// //         </div>
// //         <div>
// //           <p className="text-xs text-gray-500 uppercase tracking-wide">Method</p>
// //           <p className="text-sm text-gray-900">{transaction.paymentMethod}</p>
// //         </div>
// //       </div>
      
// //       <div>
// //         <p className="text-xs text-gray-500 uppercase tracking-wide">Date & Time</p>
// //         <p className="text-sm text-gray-900">{transaction.transactionDate}</p>
// //       </div>
// //     </div>
// //   );

// //   return (
// //     <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
// //       <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
// //         <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
// //           <div className="flex items-center gap-2">
// //             <h3 className="text-lg font-semibold text-gray-900">Transaction History</h3>
// //             {isMobile && <Smartphone className="w-4 h-4 text-gray-500" />}
// //           </div>
// //           <div className="flex flex-col sm:flex-row gap-3">
// //             <select
// //               value={filterStatus}
// //               onChange={(e) => setFilterStatus(e.target.value)}
// //               className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-[#1d8e85] focus:border-[#1d8e85] text-gray-700 bg-white"
// //             >
// //               <option value="all">All Status</option>
// //               <option value="completed">Completed</option>
// //               <option value="pending">Pending</option>
// //               <option value="failed">Failed</option>
// //             </select>
// //             <button className="px-4 py-2 bg-[#1d8e85] text-white rounded-md text-sm hover:bg-[#166f67] focus:ring-2 focus:ring-[#1d8e85] focus:ring-offset-2 flex items-center gap-2 transition-colors">
// //               <Download className="w-4 h-4" />
// //               Export
// //             </button>
// //           </div>
// //         </div>
// //       </div>

// //       {isMobile ? (
// //         // Mobile Card View
// //         <div className="p-4">
// //           <div className="space-y-4">
// //             {filteredTransactions.map((transaction, index) => (
// //               <TransactionCard key={index} transaction={transaction} />
// //             ))}
// //           </div>
// //         </div>
// //       ) : (
// //         // Desktop Table View
// //         <div className="overflow-x-auto">
// //           <table className="w-full">
// //             <thead className="bg-[#1d8e85] text-white text-sm">
// //               <tr>
// //                 <th className="px-6 py-3 text-left text-xs  uppercase tracking-wider">
// //                   Transaction ID
// //                 </th>
// //                 <th className="px-6 py-3 text-left text-xs   uppercase tracking-wider">
// //                   Amount
// //                 </th>
// //                 <th className="px-6 py-3 text-left text-xs   uppercase tracking-wider">
// //                   Type
// //                 </th>
// //                 <th className="px-6 py-3 text-left text-xs   uppercase tracking-wider">
// //                   Status
// //                 </th>
// //                 <th className="px-6 py-3 text-left text-xs   uppercase tracking-wider">
// //                   Date & Time
// //                 </th>
// //                 <th className="px-6 py-3 text-left text-xs   uppercase tracking-wider">
// //                   Method
// //                 </th>
// //               </tr>
// //             </thead>
// //             <tbody className="bg-white divide-y divide-gray-200">
// //               {filteredTransactions.map((transaction, index) => (
// //                 <tr key={index} className="hover:bg-gray-50">
// //                   <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
// //                     {transaction.transactionId}
// //                   </td>
// //                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-semibold">
// //                     {transaction.amount}
// //                   </td>
// //                   <td className="px-6 py-4 whitespace-nowrap">
// //                     <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getTypeColor(transaction.type)}`}>
// //                       {transaction.type}
// //                     </span>
// //                   </td>
// //                   <td className="px-6 py-4 whitespace-nowrap">
// //                     <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(transaction.status)}`}>
// //                       {transaction.status}
// //                     </span>
// //                   </td>
// //                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
// //                     {transaction.transactionDate}
// //                   </td>
// //                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
// //                     {transaction.paymentMethod}
// //                   </td>
// //                 </tr>
// //               ))}
// //             </tbody>
// //           </table>
// //         </div>
// //       )}

// //       {filteredTransactions.length === 0 && (
// //         <div className="px-6 py-8 text-center">
// //           <p className="text-gray-500">No transactions found matching your criteria.</p>
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // const WithDrawal = () => {
// //   const [amount, setAmount] = useState("");
// //   const [password, setPassword] = useState("");
// //   const [showPassword, setShowPassword] = useState(false);
// //   const [errors, setErrors] = useState({});
// //   const [isProcessing, setIsProcessing] = useState(false);
// //   const [calculatedFee, setCalculatedFee] = useState(0);
// //   const [netAmount, setNetAmount] = useState(0);

// //   // API hooks
// //   const { data: settingsData, isLoading: settingsLoading } = useGetSettingQuery();
// //   const { data: historyData, isLoading: historyLoading } = useWithdrawHistoryQuery('');
// //   const [withdrawRequest, { isLoading: withdrawLoading }] = useWithdrawRequestMutation();
// //   const [calculateWithdraw, { isLoading: calculateLoading }] = useCalculateWithdrawMutation();

// //   const settings = settingsData || {};
// //   const availableBalance = settings.availableBalance || 15750.50;
// //   const minWithdrawal = settings.minWithdrawal || 100;
// //   const maxWithdrawal = settings.maxWithdrawal || 50000;
// //   const feePercentage = settings.feePercentage || 0.5;

// //   // Calculate fees when amount changes
// //   useEffect(() => {
// //     const calculateFees = async () => {
// //       if (amount && !isNaN(amount) && Number(amount) > 0) {
// //         try {
// //           const result = await calculateWithdraw({ amount: Number(amount) });
// //           setCalculatedFee(result.fee || 0);
// //           setNetAmount(result.netAmount || 0);
// //         } catch (error) {
// //           console.error('Fee calculation error:', error);
// //           const fee = Number(amount) * feePercentage / 100;
// //           setCalculatedFee(fee);
// //           setNetAmount(Number(amount) - fee);
// //         }
// //       } else {
// //         setCalculatedFee(0);
// //         setNetAmount(0);
// //       }
// //     };

// //     const debounceTimer = setTimeout(calculateFees, 500);
// //     return () => clearTimeout(debounceTimer);
// //   }, [amount, calculateWithdraw, feePercentage]);

// //   const validate = () => {
// //     const newErrors = {};
// //     const amountNum = Number(amount);

// //     if (!amount) {
// //       newErrors.amount = "Amount is required";
// //     } else if (isNaN(amountNum) || amountNum <= 0) {
// //       newErrors.amount = "Please enter a valid amount";
// //     } else if (amountNum < minWithdrawal) {
// //       newErrors.amount = `Minimum withdrawal amount is ₹${minWithdrawal}`;
// //     } else if (amountNum > maxWithdrawal) {
// //       newErrors.amount = `Maximum withdrawal amount is ₹${maxWithdrawal}`;
// //     } else if (amountNum > availableBalance) {
// //       newErrors.amount = "Insufficient balance";
// //     }

// //     if (!password) {
// //       newErrors.password = "Transaction password is required";
// //     } else if (password.length < 6) {
// //       newErrors.password = "Password must be at least 6 characters";
// //     }

// //     setErrors(newErrors);
// //     return Object.keys(newErrors).length === 0;
// //   };

// //   const handleWithdraw = async () => {
// //     if (validate()) {
// //       setIsProcessing(true);
// //       try {
// //         const result = await withdrawRequest({
// //           amount: Number(amount),
// //           password: password,
// //           fee: calculatedFee,
// //           netAmount: netAmount
// //         });
        
// //         if (result.success) {
// //           alert(`Withdrawal request submitted successfully for ₹${amount}`);
// //           setAmount("");
// //           setPassword("");
// //           setCalculatedFee(0);
// //           setNetAmount(0);
// //         }
// //       } catch (error) {
// //         console.error('Withdrawal error:', error);
// //         alert("Withdrawal failed. Please try again.");
// //       } finally {
// //         setIsProcessing(false);
// //       }
// //     }
// //   };

// //   if (settingsLoading) {
// //     return (
// //       <div className="min-h-screen bg-[#1d8e85] flex items-center justify-center">
// //         <div className="bg-white rounded-lg p-8 shadow-lg">
// //           <div className="flex items-center gap-3">
// //             <div className="w-6 h-6 border-2 border-[#1d8e85] border-t-transparent rounded-full animate-spin"></div>
// //             <span className="text-gray-700">Loading...</span>
// //           </div>
// //         </div>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="min-h-screen bg-[#1d8e85]">
// //       {/* Header */}
// //       <div className="bg-white border-b border-gray-200">
// //         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
// //           <div className="py-6">
// //             <div className="flex items-center gap-3">
// //               <div className="p-2 bg-[#1d8e85] rounded-lg shadow-lg">
// //                 <Building className="w-6 h-6 text-white" />
// //               </div>
// //               <div>
// //                 <h1 className="text-2xl font-semibold text-gray-900">Fund Withdrawal</h1>
// //                 <p className="text-sm text-gray-600">Secure transfer to your registered bank account</p>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       </div>

// //       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
// //         <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
// //           <div className="lg:col-span-4">
// //             <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
// //               <div className="mb-6">
// //                 <h2 className="text-lg font-semibold text-gray-900 mb-4">Withdrawal Request</h2>
                
// //                 {/* Balance Display */}
// //                 <div className="bg-[#1d8e85] rounded-lg p-4 text-white mb-6">
// //                   <div className="flex items-center justify-between">
// //                     <div>
// //                       <p className="text-sm opacity-90">Available Balance</p>
// //                       <p className="text-2xl font-bold">₹{availableBalance.toLocaleString('en-IN')}</p>
// //                     </div>
// //                     <CreditCard className="w-8 h-8 opacity-80" />
// //                   </div>
// //                 </div>
// //               </div>

// //               <div className="space-y-6">
                
// //                 <div>
// //                   <label htmlFor="balanceType" className="block text-sm font-medium text-gray-700 mb-2">
// //                     Source Account
// //                   </label>
// //                   <select
// //                     id="balanceType"
// //                     className="w-full text-white px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#1d8e85] focus:border-[#1d8e85] bg-[#1d8e85]"
// //                   >
// //                     <option className="bg-[#1d8e85]">Available Balance</option>
// //                     <option className="bg-[#1d8e85]">Purchase Token(Jaimax)</option>
// //                   </select>
// //                 </div>

// //                 <div className="grid grid-cols-5 gap-3">
// //                   <div className="col-span-2">
// //                     <label className="block text-sm font-medium text-gray-700 mb-2">
// //                       Currency
// //                     </label>
// //                     <div className="px-3 py-2 bg-gray-100 border border-gray-300 rounded-md text-gray-900 font-medium text-center">
// //                       INR
// //                     </div>
// //                   </div>
// //                   <div className="col-span-3">
// //                     <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-2">
// //                       Amount *
// //                     </label>
// //                     <input
// //                       id="amount"
// //                       type="number"
// //                       placeholder="Enter amount"
// //                       value={amount}
// //                       onChange={(e) => setAmount(e.target.value)}
// //                       className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-[#1d8e85] focus:border-[#1d8e85] ${
// //                         errors.amount ? 'border-red-300 bg-red-50' : 'border-gray-300'
// //                       }`}
// //                     />
// //                   </div>
// //                 </div>
// //                 {errors.amount && (
// //                   <p className="text-sm text-red-600 flex items-center gap-1">
// //                     <AlertTriangle className="w-4 h-4" />
// //                     {errors.amount}
// //                   </p>
// //                 )}

// //                 {/* Transaction Summary */}
// //                 {amount && (
// //                   <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
// //                     <h3 className="text-sm font-medium text-gray-900 mb-3">Transaction Summary</h3>
// //                     <div className="space-y-2 text-sm">
// //                       <div className="flex justify-between">
// //                         <span className="text-gray-600">Withdrawal Amount</span>
// //                         <span className="font-medium">₹{Number(amount).toLocaleString('en-IN')}</span>
// //                       </div>
// //                       <div className="flex justify-between">
// //                         <span className="text-gray-600">Processing Fee ({feePercentage}%)</span>
// //                         <span className="text-red-600">₹{calculatedFee.toFixed(2)}</span>
// //                       </div>
// //                       <div className="flex justify-between pt-2 border-t border-gray-200 font-semibold">
// //                         <span>Net Amount</span>
// //                         <span className="text-[#1d8e85]">₹{netAmount.toLocaleString('en-IN')}</span>
// //                       </div>
// //                     </div>
// //                     {calculateLoading && (
// //                       <div className="flex items-center gap-2 mt-2 text-sm text-gray-500">
// //                         <div className="w-3 h-3 border border-gray-400 border-t-transparent rounded-full animate-spin"></div>
// //                         Calculating fees...
// //                       </div>
// //                     )}
// //                   </div>
// //                 )}

// //                 <div>
// //                   <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
// //                     Transaction Password *
// //                   </label>
// //                   <div className="relative">
// //                     <input
// //                       id="password"
// //                       type={showPassword ? "text" : "password"}
// //                       placeholder="Enter transaction password"
// //                       value={password}
// //                       onChange={(e) => setPassword(e.target.value)}
// //                       className={`w-full px-3 py-2 pr-10 border rounded-md focus:ring-2 focus:ring-[#1d8e85] focus:border-[#1d8e85] ${
// //                         errors.password ? 'border-red-300 bg-red-50' : 'border-gray-300'
// //                       }`}
// //                     />
// //                     <button
// //                       type="button"
// //                       onClick={() => setShowPassword(!showPassword)}
// //                       className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
// //                     >
// //                       {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
// //                     </button>
// //                   </div>
// //                   {errors.password && (
// //                     <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
// //                       <AlertTriangle className="w-4 h-4" />
// //                       {errors.password}
// //                     </p>
// //                   )}
// //                 </div>

// //                 <button
// //                   type="button"
// //                   onClick={handleWithdraw}
// //                   disabled={isProcessing || withdrawLoading}
// //                   className="w-full bg-[#1d8e85] text-white py-3 px-4 rounded-md font-medium hover:bg-[#166f67] focus:ring-2 focus:ring-[#1d8e85] focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-colors"
// //                 >
// //                   {isProcessing || withdrawLoading ? (
// //                     <>
// //                       <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
// //                       Processing Request...
// //                     </>
// //                   ) : (
// //                     <>
// //                       Submit Withdrawal
// //                       <ArrowRight className="w-4 h-4" />
// //                     </>
// //                   )}
// //                 </button>
// //               </div>
// //             </div>
// //           </div>

// //           {/* Right Side Content */}
// //           <div className="lg:col-span-8 space-y-6">
// //             {/* Bank Details */}
// //             <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
// //               <div className="flex items-center justify-between mb-6">
// //                 <h2 className="text-lg font-semibold text-gray-900">Destination Account</h2>
// //                 <div className="flex items-center text-green-600 bg-green-50 px-3 py-1 rounded-full text-sm border border-green-200">
// //                   <CheckCircle className="w-4 h-4 mr-1" />
// //                   Verified
// //                 </div>
// //               </div>

// //               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// //                 <div>
// //                   <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
// //                     Account Holder
// //                   </label>
// //                   <p className="text-gray-900 font-semibold">RAJESH KUMAR SHARMA</p>
// //                 </div>

// //                 <div>
// //                   <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
// //                     Account Number
// //                   </label>
// //                   <p className="text-gray-900 font-semibold font-mono">XXXX XXXX XXXX 8756</p>
// //                 </div>

// //                 <div>
// //                   <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
// //                     IFSC Code
// //                   </label>
// //                   <p className="text-gray-900 font-semibold">HDFC0001234</p>
// //                 </div>

// //                 <div>
// //                   <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
// //                     Bank Name
// //                   </label>
// //                   <p className="text-gray-900 font-semibold">HDFC Bank Limited</p>
// //                 </div>
// //               </div>
// //             </div>

// //             {/* Processing Information */}
// //             <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
// //               <h2 className="text-lg font-semibold text-gray-900 mb-4">Processing Information</h2>
              
// //               <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
// //                 <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
// //                   <Clock className="w-5 h-5 text-blue-600" />
// //                   <div>
// //                     <p className="text-sm font-medium text-blue-900">Processing Time</p>
// //                     <p className="text-xs text-blue-700">2-24 hours</p>
// //                   </div>
// //                 </div>
                
// //                 <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg border border-green-200">
// //                   <Shield className="w-5 h-5 text-green-600" />
// //                   <div>
// //                     <p className="text-sm font-medium text-green-900">Secure Transfer</p>
// //                     <p className="text-xs text-green-700">Bank Grade Security</p>
// //                   </div>
// //                 </div>
                
// //                 <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg border border-orange-200">
// //                   <Info className="w-5 h-5 text-orange-600" />
// //                   <div>
// //                     <p className="text-sm font-medium text-orange-900">Processing Fee</p>
// //                     <p className="text-xs text-orange-700">{feePercentage}% per transaction</p>
// //                   </div>
// //                 </div>
// //               </div>

// //               <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
// //                 <div className="flex gap-3">
// //                   <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
// //                   <div>
// //                     <h3 className="text-sm font-semibold text-yellow-800">Important Notes</h3>
// //                     <ul className="text-sm text-yellow-700 mt-2 space-y-1">
// //                       <li>• Ensure sufficient balance before initiating withdrawal</li>
// //                       <li>• Processing during banking hours only (Mon-Fri, 10 AM - 4 PM)</li>
// //                       <li>• Minimum: ₹{minWithdrawal}, Maximum: ₹{maxWithdrawal} per transaction</li>
// //                       <li>• Failed transactions will be reversed within 24 hours</li>
// //                     </ul>
// //                   </div>
// //                 </div>
// //               </div>
// //             </div>
// //           </div>
// //         </div>

// //         {/* Transaction History */}
// //         <div className="mt-8">
// //           {historyLoading ? (
// //             <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
// //               <div className="flex items-center justify-center gap-3">
// //                 <div className="w-6 h-6 border-2 border-[#1d8e85] border-t-transparent rounded-full animate-spin"></div>
// //                 <span className="text-gray-700">Loading transaction history...</span>
// //               </div>
// //             </div>
// //           ) : (
// //             <TransactionTable transactions={historyData?.transactions || []} />
// //           )}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default WithDrawal;



// // import React, { useState, useEffect } from "react";
// // import { Eye, EyeOff, AlertTriangle, CheckCircle, Info, Download, Building, CreditCard, Clock, Shield, ArrowRight, Smartphone, Search } from "lucide-react";
// // import Pagination from "../../../pagination/pagination";
// // import {useWithdrawHistoryQuery ,useWithdrawRequestListQuery, useWithdrawRequestMutation , useWithdrawCalculateQuery,  useCalculateWithdrawMutation,  useGetSettingQuery} from './withdrawApiSlice'
// // import { useUserDataQuery } from "../../../Dashboard/pages/dashBoard/DashboardApliSlice"
// // import {useGetkycDetailsQuery } from "../../../Dashboard/pages/kyc/kycApiSlice"
// // const TransactionTable = ({ transactions, state, setState, selectedStatus, setSelectedStatus, handleSearch, handlePageChange, loading }) => {
// //   const [isMobile, setIsMobile] = useState(false);

// //   useEffect(() => {
// //     const checkMobile = () => {
// //       setIsMobile(window.innerWidth < 768);
// //     };
    
// //     checkMobile();
// //     window.addEventListener('resize', checkMobile);
// //     return () => window.removeEventListener('resize', checkMobile);
// //   }, []);

// //   const getStatusColor = (status) => {
// //     switch (status) {
// //       case "1": return 'bg-green-50 text-green-700 border-green-200';
// //       case "0": return 'bg-yellow-50 text-yellow-700 border-yellow-200';
// //       case "2": return 'bg-red-50 text-red-700 border-red-200';
// //       default: return 'bg-gray-50 text-gray-700 border-gray-200';
// //     }
// //   };

// //   const getStatusText = (status) => {
// //     switch (status) {
// //       case "1": return "Approved";
// //       case "0": return "Pending";
// //       case "2": return "Rejected";
// //       default: return "Unknown";
// //     }
// //   };

// //   const formatDateWithAmPm = (isoString) => {
// //     const date = new Date(isoString);
// //     const day = String(date.getUTCDate()).padStart(2, "0");
// //     const month = String(date.getUTCMonth() + 1).padStart(2, "0");
// //     const year = date.getUTCFullYear();
// //     let hours = date.getUTCHours();
// //     const minutes = String(date.getUTCMinutes()).padStart(2, "0");
// //     const amAndPm = hours >= 12 ? "PM" : "AM";

// //     hours = hours % 12 || 12;
// //     return `${day}-${month}-${year} ${hours}:${minutes} ${amAndPm}`;
// //   };

// //   const TransactionCard = ({ transaction, index }) => (
// //     <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm space-y-3">
// //       <div className="flex justify-between items-start">
// //         <div>
// //           <p className="text-xs text-gray-500 uppercase tracking-wide">S.No</p>
// //           <p className="font-medium text-gray-900 text-sm">
// //             {state?.currentPage * state?.perPage - (state?.perPage - 1) + index}
// //           </p>
// //         </div>
// //         <div className="flex flex-col items-end gap-2">
// //           <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(transaction.status)}`}>
// //             {getStatusText(transaction.status)}
// //           </span>
// //         </div>
// //       </div>
      
// //       <div className="grid grid-cols-2 gap-4">
// //         <div>
// //           <p className="text-xs text-gray-500 uppercase tracking-wide">Transaction ID</p>
// //           <p className="text-sm text-gray-900 break-all">{transaction._id}</p>
// //         </div>
// //         <div>
// //           <p className="text-xs text-gray-500 uppercase tracking-wide">Currency</p>
// //           <p className="text-sm text-gray-900">{transaction.currency}</p>
// //         </div>
// //       </div>
      
// //       <div className="grid grid-cols-2 gap-4">
// //         <div>
// //           <p className="text-xs text-gray-500 uppercase tracking-wide">Amount</p>
// //           <p className="font-semibold text-gray-900">
// //             {transaction.currency === "INR" 
// //               ? `₹${transaction.amount.toFixed(2)}` 
// //               : `$${transaction.amount.toFixed(2)}`}
// //           </p>
// //         </div>
// //         <div>
// //           <p className="text-xs text-gray-500 uppercase tracking-wide">Admin Charges</p>
// //           <p className="text-sm text-gray-900">
// //             {transaction.currency === "INR" 
// //               ? `₹${transaction.admin_inr_charges}` 
// //               : `$${transaction.admin_inr_charges}`}
// //           </p>
// //         </div>
// //       </div>
      
// //       <div>
// //         <p className="text-xs text-gray-500 uppercase tracking-wide">Date & Time</p>
// //         <p className="text-sm text-gray-900">{formatDateWithAmPm(transaction.created_at)}</p>
// //       </div>

// //       <div>
// //         <p className="text-xs text-gray-500 uppercase tracking-wide">Reason</p>
// //         <p className="text-sm text-gray-900" title={transaction?.reason}>
// //           {transaction?.reason || "-"}
// //         </p>
// //       </div>

// //       <div>
// //         <p className="text-xs text-gray-500 uppercase tracking-wide">Note</p>
// //         <p className="text-sm text-gray-900" title={transaction.note}>
// //           {transaction.note || "-"}
// //         </p>
// //       </div>
// //     </div>
// //   );

// //   return (
// //     <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
// //       <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
// //         <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
// //           <div className="flex items-center gap-2">
// //             <h3 className="text-lg font-semibold text-gray-900">Withdrawal History</h3>
// //             {isMobile && <Smartphone className="w-4 h-4 text-gray-500" />}
// //           </div>
// //           <div className="flex flex-col sm:flex-row gap-3">
// //             <select
// //               value={selectedStatus}
// //               onChange={(e) => {
// //                 setSelectedStatus(e.target.value);
// //                 setState(prev => ({ ...prev, currentPage: 1 }));
// //               }}
// //               className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-[#1d8e85] focus:border-[#1d8e85] text-gray-700 bg-white"
// //             >
// //               <option value="">Select Status</option>
// //               <option value="1">Approved</option>
// //               <option value="0">Pending</option>
// //               <option value="2">Rejected</option>
// //             </select>
// //             <div className="relative">
// //               <input
// //                 type="text"
// //                 placeholder="Search"
// //                 onChange={handleSearch}
// //                 className="pl-10 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-[#1d8e85] focus:border-[#1d8e85]"
// //               />
// //               <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
// //             </div>
// //             <button className="px-4 py-2 bg-[#1d8e85] text-white rounded-md text-sm hover:bg-[#166f67] focus:ring-2 focus:ring-[#1d8e85] focus:ring-offset-2 flex items-center gap-2 transition-colors">
// //               <Download className="w-4 h-4" />
// //               Export
// //             </button>
// //           </div>
// //         </div>
// //       </div>

// //       {isMobile ? (
// //         // Mobile Card View
// //         <div className="p-4">
// //           <div className="space-y-4">
// //             {loading ? (
// //               [...Array(3)].map((_, i) => (
// //                 <div key={i} className="bg-gray-200 animate-pulse rounded-lg h-40"></div>
// //               ))
// //             ) : transactions.length === 0 ? (
// //               <div className="text-center py-8">
// //                 <p className="text-gray-500">No transactions found</p>
// //               </div>
// //             ) : (
// //               transactions.map((transaction, index) => (
// //                 <TransactionCard key={transaction._id} transaction={transaction} index={index} />
// //               ))
// //             )}
// //           </div>
// //         </div>
// //       ) : (
// //         // Desktop Table View
// //         <div className="overflow-x-auto">
// //           <table className="w-full">
// //             <thead className="bg-[#1d8e85] text-white text-sm">
// //               <tr>
// //                 <th className="px-6 py-3 text-left text-xs uppercase tracking-wider">S.No</th>
// //                 <th className="px-6 py-3 text-left text-xs uppercase tracking-wider">Transaction ID</th>
// //                 <th className="px-6 py-3 text-left text-xs uppercase tracking-wider">Currency Type</th>
// //                 <th className="px-6 py-3 text-left text-xs uppercase tracking-wider">Withdrawal Amount</th>
// //                 <th className="px-6 py-3 text-left text-xs uppercase tracking-wider">Admin Charges</th>
// //                 <th className="px-6 py-3 text-left text-xs uppercase tracking-wider">Date & Time</th>
// //                 <th className="px-6 py-3 text-left text-xs uppercase tracking-wider">Status</th>
// //                 <th className="px-6 py-3 text-left text-xs uppercase tracking-wider">Reason</th>
// //                 <th className="px-6 py-3 text-left text-xs uppercase tracking-wider">Note</th>
// //               </tr>
// //             </thead>
// //             <tbody className="bg-white divide-y divide-gray-200">
// //               {loading ? (
// //                 [...Array(5)].map((_, i) => (
// //                   <tr key={i}>
// //                     {[...Array(9)].map((_, j) => (
// //                       <td key={j} className="px-6 py-4">
// //                         <div className="bg-gray-200 animate-pulse h-4 rounded"></div>
// //                       </td>
// //                     ))}
// //                   </tr>
// //                 ))
// //               ) : transactions.length === 0 ? (
// //                 <tr>
// //                   <td colSpan="9" className="px-6 py-8 text-center text-gray-500">
// //                     No data found
// //                   </td>
// //                 </tr>
// //               ) : (
// //                 transactions.map((transaction, index) => (
// //                   <tr key={transaction._id} className="hover:bg-gray-50">
// //                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
// //                       {state?.currentPage * state?.perPage - (state?.perPage - 1) + index}
// //                     </td>
// //                     <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
// //                       {transaction._id}
// //                     </td>
// //                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
// //                       {transaction.currency}
// //                     </td>
// //                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-semibold">
// //                       {transaction.currency === "INR" 
// //                         ? `₹${transaction.amount.toFixed(2)}` 
// //                         : `$${transaction.amount.toFixed(2)}`}
// //                     </td>
// //                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
// //                       {transaction.currency === "INR" 
// //                         ? `₹${transaction.admin_inr_charges}` 
// //                         : `$${transaction.admin_inr_charges}`}
// //                     </td>
// //                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
// //                       {formatDateWithAmPm(transaction.created_at)}
// //                     </td>
// //                     <td className="px-6 py-4 whitespace-nowrap">
// //                       <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(transaction.status)}`}>
// //                         {getStatusText(transaction.status)}
// //                       </span>
// //                     </td>
// //                     <td className="px-6 py-4 text-sm text-gray-500 max-w-24 truncate" title={transaction?.reason}>
// //                       {transaction?.reason || "-"}
// //                     </td>
// //                     <td className="px-6 py-4 text-sm text-gray-500">
// //                       <span className="cursor-pointer hover:text-[#1d8e85]" title={transaction.note}>
// //                         Details
// //                       </span>
// //                     </td>
// //                   </tr>
// //                 ))
// //               )}
// //             </tbody>
// //           </table>
// //         </div>
// //       )}
// //     </div>
// //   );
// // };



// // const Withdrawal = () => {
// //   const [withdrawRequest, { isLoading }] = useWithdrawRequestMutation();
// //   const { data: userData, refetch } = useUserDataQuery();
// //   const { data: getSetting } = useGetSettingQuery();
// //   const { data: kycDetails } = useGetkycDetailsQuery();

// //   const [formData, setFormData] = useState({
// //     balanceType: "referral",
// //     paymentCurrency: "",
// //     amount: "",
// //   });
// //   const [loading, setLoading] = useState(false);
// //   const [errors, setErrors] = useState({});
// //   const [selectedStatus, setSelectedStatus] = useState("");
// //   const [state, setState] = useState({
// //     currentPage: 1,
// //     perPage: 10,
// //     search: "",
// //   });

// //   const queryParams = `limit=${state?.perPage || ""}&page=${state?.currentPage || ""}&search=${state?.search || ""}&status=${selectedStatus}`;
  
// //   const {
// //     data: withdrawHistory,
// //     isLoading: isLoadingWithdraw,
// //     refetch: refetchWithdraw,
// //   } = useWithdrawRequestListQuery(queryParams);

// //   const datafromApi = withdrawHistory?.data?.withdrawRequests || [];
// //   const id = "user123"; // Replace with actual user ID from localStorage
// //   const TableData = datafromApi.filter((item) => item?.userId?._id === id);

// //   const [previewData, setPreviewData] = useState([
// //     { heading: "Fees", subHeading: "0" },
// //     { heading: "Will Get", subHeading: "0" },
// //   ]);

// //   useEffect(() => {
// //     if (
// //       userData &&
// //       userData?.data?.countryCode !== 91 &&
// //       formData.paymentCurrency !== "USD"
// //     ) {
// //       setFormData((prev) => ({
// //         ...prev,
// //         paymentCurrency: "USD",
// //       }));
// //     } else if (
// //       userData &&
// //       userData?.data?.countryCode === 91 &&
// //       formData.paymentCurrency !== "INR"
// //     ) {
// //       setFormData((prev) => ({
// //         ...prev,
// //         paymentCurrency: "INR",
// //       }));
// //     }
// //   }, [userData?.data?.countryCode, formData.paymentCurrency]);

// //   const validate = () => {
// //     const errors = {};

// //     if (!formData.balanceType) {
// //       errors.balanceType = "Balance Type is required";
// //     }

// //     if (formData.balanceType === "referral" && !formData.paymentCurrency) {
// //       errors.paymentCurrency = "Payment Currency is required";
// //     }

// //     if (!formData.amount) {
// //       errors.amount = "Amount is required";
// //     } else if (isNaN(formData.amount)) {
// //       errors.amount = "Amount must be a number";
// //     } else if (parseFloat(formData.amount) <= 0) {
// //       errors.amount = "Amount must be greater than zero";
// //     }

// //     return errors;
// //   };

// //   const calculatePreview = (amount, paymentCurrency) => {
// //     if (!getSetting?.data) {
// //       alert("Settings data is missing.");
// //       return;
// //     }

// //     const {
// //       min_withdrawal_inr,
// //       max_withdrawal_inr,
// //       withdrawal_commission_inr,
// //       min_withdrawal_usd,
// //       max_withdrawal_usd,
// //       withdrawal_commission_usd,
// //     } = getSetting.data;

// //     const parsedAmount = parseFloat(amount);
// //     let Fees;
    
// //     if (paymentCurrency === "INR") {
// //       if (parsedAmount < min_withdrawal_inr || parsedAmount > max_withdrawal_inr) {
// //         alert(`Withdrawal amount should be between ${min_withdrawal_inr} and ${max_withdrawal_inr}.`);
// //         return;
// //       }
// //       Fees = (parsedAmount * withdrawal_commission_inr) / 100;
// //     } else {
// //       if (parsedAmount < min_withdrawal_usd || parsedAmount > max_withdrawal_usd) {
// //         alert(`Withdrawal amount should be between ${min_withdrawal_usd} and ${max_withdrawal_usd}.`);
// //         return;
// //       }
// //       Fees = (parsedAmount * withdrawal_commission_usd) / 100;
// //     }

// //     const Will_Get = parsedAmount - Fees;

// //     setPreviewData([
// //       {
// //         heading: "Fees",
// //         subHeading: `${Fees.toFixed(2)} ${paymentCurrency === "USD" ? "USD" : paymentCurrency === "INR" ? "INR" : "Jaimax"}`,
// //       },
// //       {
// //         heading: "Will Get",
// //         subHeading: `${Will_Get.toFixed(2)} ${paymentCurrency === "USD" ? "USD" : paymentCurrency === "INR" ? "INR" : "Jaimax"}`,
// //       },
// //     ]);
// //   };

// //   const handleInputChange = (e) => {
// //     const { name, value } = e.target;

// //     if (name === "amount" && !/^\d*$/.test(value)) {
// //       return;
// //     }

// //     setFormData({ ...formData, [name]: value });
// //     if (value) {
// //       clearErrors();
// //     }
// //     setPreviewData([
// //       { heading: "Fees", subHeading: "0" },
// //       { heading: "Will Get", subHeading: "0" },
// //     ]);
// //   };

// //   const onBlurAmount = (e) => {
// //     if (e.target.value) {
// //       calculatePreview(e.target.value, formData.paymentCurrency);
// //     }
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     const errors = validate();
// //     if (Object.keys(errors).length > 0) {
// //       setErrors(errors);
// //       return;
// //     }

// //     const { amount, balanceType, paymentCurrency } = formData;
// //     try {
// //       const response = await withdrawRequest(
// //         balanceType == "referral"
// //           ? {
// //               amount: parseFloat(amount),
// //               currency: paymentCurrency,
// //               currencyType: paymentCurrency,
// //             }
// //           : balanceType == "JAIMAX"
// //           ? { amount: parseFloat(amount), currency: balanceType }
// //           : ""
// //       );
      
// //       if (response.success) {
// //         setFormData({
// //           balanceType: "referral",
// //           paymentCurrency: "",
// //           amount: "",
// //         });

// //         setPreviewData([
// //           { heading: "Fees", subHeading: "0" },
// //           { heading: "Will Get", subHeading: "0" },
// //         ]);
// //         alert(response?.message);
// //         refetchWithdraw();
// //       } else {
// //         alert(response.message);
// //       }
// //     } catch (error) {
// //       alert(error?.data?.message || "Withdrawal failed. Please try again.");
// //     }
// //   };

// //   const clearErrors = () => {
// //     setErrors({});
// //   };

// //   const addSymbolPlaceholder = (value) => {
// //     if (value === "INR") {
// //       return "₹";
// //     } else if (value === "USD") {
// //       return "$";
// //     } else {
// //       return "";
// //     }
// //   };

// //   const handlePageChange = (e) => {
// //     setLoading(true);
// //     setState({ ...state, currentPage: e });
// //   };

// //   let searchTimeout;
// //   const handleSearch = (e) => {
// //     clearTimeout(searchTimeout);
// //     searchTimeout = setTimeout(() => {
// //       setState({ ...state, search: e.target.value, currentPage: 1 });
// //     }, 1000);
// //   };

// //   const onChangeBalanceType = (e) => {
// //     setFormData({
// //       amount: "",
// //       balanceType: e.target.value,
// //       paymentCurrency: "",
// //     });
// //     setPreviewData([
// //       { heading: "Fees", subHeading: "0" },
// //       { heading: "Will Get", subHeading: "0" },
// //     ]);
// //   };

// //   useEffect(() => {
// //     setLoading(false);
// //   }, [withdrawHistory?.data?.withdrawRequests]);

// //   useEffect(() => {
// //     return () => {
// //       clearTimeout(searchTimeout);
// //     };
// //   }, []);

// //   return (
// //     <div className="min-h-screen bg-[#1d8e85]">
// //       {/* Header */}
// //       <div className="bg-white border-b border-gray-200">
// //         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
// //           <div className="py-6">
// //             <div className="flex items-center gap-3">
// //               <div className="p-2 bg-[#1d8e85] rounded-lg shadow-lg">
// //                 <Building className="w-6 h-6 text-white" />
// //               </div>
// //               <div>
// //                 <h1 className="text-2xl font-semibold text-gray-900">Fund Withdrawal</h1>
// //                 <p className="text-sm text-gray-600">Secure transfer to your registered bank account</p>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       </div>

// //       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
// //         <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
// //           <div className="lg:col-span-4">
// //             <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
// //               <div className="mb-6">
// //                 <h2 className="text-lg font-semibold text-gray-900 mb-4">Withdrawal Request</h2>
                
// //                 {/* Balance Display */}
// //                 <div className="bg-[#1d8e85] rounded-lg p-4 text-white mb-6">
// //                   <div className="flex items-center justify-between">
// //                     <div>
// //                       <p className="text-sm opacity-90">Available Balance</p>
// //                       <p className="text-2xl font-bold">₹{userData?.data?.Inr?.toLocaleString('en-IN') || '0'}</p>
// //                     </div>
// //                     <CreditCard className="w-8 h-8 opacity-80" />
// //                   </div>
// //                 </div>
// //               </div>

// //               <div className="space-y-6">
// //                 <div>
// //                   <label htmlFor="balanceType" className="block text-sm font-medium text-gray-700 mb-2">
// //                     Source Account
// //                   </label>
// //                   <select
// //                     id="balanceType"
// //                     name="balanceType"
// //                     value={formData.balanceType}
// //                     onChange={onChangeBalanceType}
// //                     onClick={clearErrors}
// //                     className="w-full text-white px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#1d8e85] focus:border-[#1d8e85] bg-[#1d8e85]"
// //                   >
// //                     <option className="bg-[#1d8e85]" value="referral">Available Balance</option>
// //                     <option className="bg-[#1d8e85]" value="JAIMAX">Purchase Token (JaiMax)</option>
// //                   </select>
// //                   {errors.balanceType && (
// //                     <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
// //                       <AlertTriangle className="w-4 h-4" />
// //                       {errors.balanceType}
// //                     </p>
// //                   )}
// //                   {formData.balanceType === "referral" && (
// //                     <p className="text-gray-600 mt-2">
// //                       Total Available Balance: ₹{userData?.data?.Inr?.toFixed(2) || '0.00'}
// //                     </p>
// //                   )}
// //                 </div>

// //                 {formData.balanceType === "referral" && (
// //                   <>
// //                     <div className="grid grid-cols-5 gap-3">
// //                       <div className="col-span-2">
// //                         <label className="block text-sm font-medium text-gray-700 mb-2">
// //                           Currency
// //                         </label>
// //                         <div className="px-3 py-2 bg-gray-100 border border-gray-300 rounded-md text-gray-900 font-medium text-center">
// //                           {formData.paymentCurrency || (userData?.data?.countryCode === 91 ? "INR" : "USD")}
// //                         </div>
// //                       </div>
// //                       <div className="col-span-3">
// //                         <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-2">
// //                           Amount *
// //                         </label>
// //                         <input
// //                           id="amount"
// //                           type="text"
// //                           placeholder={`Enter Amount ${addSymbolPlaceholder(formData.paymentCurrency)}`}
// //                           value={formData.amount}
// //                           onChange={handleInputChange}
// //                           onBlur={onBlurAmount}
// //                           onClick={clearErrors}
// //                           name="amount"
// //                           autoComplete="off"
// //                           className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-[#1d8e85] focus:border-[#1d8e85] ${
// //                             errors.amount ? 'border-red-300 bg-red-50' : 'border-gray-300'
// //                           }`}
// //                         />
// //                       </div>
// //                     </div>
// //                     {errors.amount && (
// //                       <p className="text-sm text-red-600 flex items-center gap-1">
// //                         <AlertTriangle className="w-4 h-4" />
// //                         {errors.amount}
// //                       </p>
// //                     )}

// //                     {/* Transaction Summary */}
// //                     {formData.amount && (
// //                       <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
// //                         <h3 className="text-sm font-medium text-gray-900 mb-3">Transaction Summary</h3>
// //                         <div className="space-y-2 text-sm">
// //                           {previewData.map((data, i) => (
// //                             <div key={i} className="flex justify-between">
// //                               <span className={data.heading === "Fees" ? "text-red-600" : "text-gray-600"}>
// //                                 {data.heading}
// //                               </span>
// //                               <span className={data.heading === "Will Get" ? "text-[#1d8e85] font-semibold" : "font-medium"}>
// //                                 {data.subHeading}
// //                               </span>
// //                             </div>
// //                           ))}
// //                         </div>
// //                       </div>
// //                     )}
// //                   </>
// //                 )}

// //                 {formData.balanceType === "JAIMAX" && (
// //                   <div className="text-center py-8">
// //                     <h5 className="text-gray-600 text-lg font-medium">Coming Soon</h5>
// //                     <p className="text-gray-500 text-sm mt-2">JaiMax token withdrawal will be available soon</p>
// //                   </div>
// //                 )}

// //                 <button
// //                   type="button"
// //                   onClick={handleSubmit}
// //                   disabled={isLoading || formData.balanceType === "JAIMAX"}
// //                   className="w-full bg-[#1d8e85] text-white py-3 px-4 rounded-md font-medium hover:bg-[#166f67] focus:ring-2 focus:ring-[#1d8e85] focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-colors"
// //                 >
// //                   {isLoading ? (
// //                     <>
// //                       <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
// //                       Processing Request...
// //                     </>
// //                   ) : (
// //                     <>
// //                       Submit Withdrawal
// //                       <ArrowRight className="w-4 h-4" />
// //                     </>
// //                   )}
// //                 </button>
// //               </div>
// //             </div>
// //           </div>

// //           {/* Right Side Content */}
// //           <div className="lg:col-span-8 space-y-6">
// //             {/* Bank Details */}
// //             <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
// //               <div className="flex items-center justify-between mb-6">
// //                 <h2 className="text-lg font-semibold text-gray-900">Destination Account</h2>
// //                 <div className="flex items-center text-green-600 bg-green-50 px-3 py-1 rounded-full text-sm border border-green-200">
// //                   <CheckCircle className="w-4 h-4 mr-1" />
// //                   Verified
// //                 </div>
// //               </div>

// //               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// //                 <div>
// //                   <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
// //                     Account Holder
// //                   </label>
// //                   <p className="text-gray-900 font-semibold">{kycDetails?.data?.name || "Not Available"}</p>
// //                 </div>

// //                 <div>
// //                   <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
// //                     Account Number
// //                   </label>
// //                   <p className="text-gray-900 font-semibold font-mono">{kycDetails?.data?.bank_account || "Not Available"}</p>
// //                 </div>

// //                 <div>
// //                   <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
// //                     {userData?.data?.countryCode === 91 ? "IFSC" : "Bank"} Code
// //                   </label>
// //                   <p className="text-gray-900 font-semibold">{kycDetails?.data?.ifsc_code || "Not Available"}</p>
// //                 </div>

// //                 <div>
// //                   <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
// //                     Bank Name
// //                   </label>
// //                   <p className="text-gray-900 font-semibold">{kycDetails?.data?.bank_name || "Not Available"}</p>
// //                 </div>
// //               </div>
// //             </div>

// //             {/* Processing Information */}
// //             <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
// //               <h2 className="text-lg font-semibold text-gray-900 mb-4">Terms & Conditions</h2>
              
// //               <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
// //                 <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
// //                   <Clock className="w-5 h-5 text-blue-600" />
// //                   <div>
// //                     <p className="text-sm font-medium text-blue-900">Processing Time</p>
// //                     <p className="text-xs text-blue-700">Within 24 hours</p>
// //                   </div>
// //                 </div>
                
// //                 <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg border border-green-200">
// //                   <Shield className="w-5 h-5 text-green-600" />
// //                   <div>
// //                     <p className="text-sm font-medium text-green-900">Working Hours</p>
// //                     <p className="text-xs text-green-700">Mon-Fri, 10 AM - 4 PM</p>
// //                   </div>
// //                 </div>
                
// //                 <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg border border-orange-200">
// //                   <Info className="w-5 h-5 text-orange-600" />
// //                   <div>
// //                     <p className="text-sm font-medium text-orange-900">Processing Fee</p>
// //                     <p className="text-xs text-orange-700">{getSetting?.data?.withdrawal_commission_inr || 0.5}% per transaction</p>
// //                   </div>
// //                 </div>
// //               </div>

// //               <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
// //                 <div className="flex gap-3">
// //                   <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
// //                   <div>
// //                     <h3 className="text-sm font-semibold text-yellow-800">Important Notes</h3>
// //                     <ul className="text-sm text-yellow-700 mt-2 space-y-1">
// //                       <li>• You have to complete the KYC and get approved status; then you can start the withdrawal process.</li>
// //                       <li>• The withdrawal department works only during banking hours (10 AM to 4 PM) from Monday to Friday.</li>
// //                       <li>• When you initiate the withdrawal process, the funds will be credited to your account within 24 hours.</li>
// //                       <li>• We are not responsible if you provide the wrong bank details. Please check them carefully before initiating the withdrawal process.</li>
// //                     </ul>
// //                   </div>
// //                 </div>
// //               </div>
// //             </div>
// //           </div>
// //         </div>

// //         {/* Transaction History */}
// //         <div className="mt-8">
// //           <TransactionTable 
// //             transactions={TableData}
// //             state={state}
// //             setState={setState}
// //             selectedStatus={selectedStatus}
// //             setSelectedStatus={setSelectedStatus}
// //             handleSearch={handleSearch}
// //             handlePageChange={handlePageChange}
// //             loading={isLoadingWithdraw || loading}
// //           />
          
// //           {/* Pagination */}
// //           <div className="mt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
// //             <div className="flex items-center gap-2">
// //               <span className="text-sm text-gray-700">Show</span>
// //               <select
// //                 value={state?.perPage}
// //                 onChange={(e) => {
// //                   const newPerPage = e.target.value;
// //                   setState({
// //                     ...state,
// //                     perPage: newPerPage,
// //                     currentPage: 1,
// //                   });
// //                 }}
// //                 className="px-3 py-1 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-[#1d8e85] focus:border-[#1d8e85]"
// //               >
// //                 <option value="10">10</option>
// //                 <option value="30">30</option>
// //                 <option value="50">50</option>
// //               </select>
// //               <span className="text-sm text-gray-700">entries</span>
// //             </div>
            
// //             <Pagination
// //               currentPage={state?.currentPage}
// //               totalPages={
// //                 withdrawHistory
// //                   ? Math.ceil(withdrawHistory?.data?.pagination?.total / state?.perPage)
// //                   : 1
// //               }
// //               onPageChange={handlePageChange}
// //             />
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Withdrawal;


// import React, { useState, useEffect } from "react";
// import { AlertTriangle, CheckCircle, Info, Download, Building, CreditCard, Clock, Shield, ArrowRight, Smartphone, Search } from "lucide-react";
// import Pagination from "../../../pagination/pagination";
// import {useWithdrawHistoryQuery ,useWithdrawRequestListQuery, useWithdrawRequestMutation , useWithdrawCalculateQuery,  useCalculateWithdrawMutation,  useGetSettingQuery} from './withdrawApiSlice'
// import { useUserDataQuery } from "../../../Dashboard/pages/dashBoard/DashboardApliSlice"
// import {useGetkycDetailsQuery } from "../../../Dashboard/pages/kyc/kycApiSlice"

// const TransactionTable = ({ transactions, state, setState, selectedStatus, setSelectedStatus, handleSearch, handlePageChange, loading }) => {
//   const [isMobile, setIsMobile] = useState(false);

//   useEffect(() => {
//     const checkMobile = () => {
//       setIsMobile(window.innerWidth < 768);
//     };
    
//     checkMobile();
//     window.addEventListener('resize', checkMobile);
//     return () => window.removeEventListener('resize', checkMobile);
//   }, []);

//   const getStatusColor = (status) => {
//     switch (status) {
//       case "1": return 'bg-green-100 text-green-800 border-green-300';
//       case "0": return 'bg-yellow-100 text-yellow-800 border-yellow-300';
//       case "2": return 'bg-red-100 text-red-800 border-red-300';
//       default: return 'bg-gray-100 text-gray-800 border-gray-300';
//     }
//   };

//   const getStatusText = (status) => {
//     switch (status) {
//       case "1": return "Approved";
//       case "0": return "Pending";
//       case "2": return "Rejected";
//       default: return "Unknown";
//     }
//   };

//   const formatDateWithAmPm = (isoString) => {
//     if (!isoString) return "-";
//     const date = new Date(isoString);
//     const day = String(date.getUTCDate()).padStart(2, "0");
//     const month = String(date.getUTCMonth() + 1).padStart(2, "0");
//     const year = date.getUTCFullYear();
//     let hours = date.getUTCHours();
//     const minutes = String(date.getUTCMinutes()).padStart(2, "0");
//     const amAndPm = hours >= 12 ? "PM" : "AM";

//     hours = hours % 12 || 12;
//     return `${day}-${month}-${year} ${hours}:${minutes} ${amAndPm}`;
//   };

//   const TransactionCard = ({ transaction, index }) => (
//     <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
//       {/* Header with Status and Serial Number */}
//       <div className="flex justify-between items-start mb-4">
//         <div className="flex items-center gap-3">
//           <div className="w-10 h-10 bg-[#1d8e85] rounded-lg flex items-center justify-center">
//             <span className="text-white font-semibold text-sm">
//               {(state?.currentPage || 1) * (state?.perPage || 10) - ((state?.perPage || 10) - 1) + index}
//             </span>
//           </div>
//           <div>
//             <p className="text-xs text-gray-500 uppercase tracking-wide">Transaction</p>
//             <p className="text-sm font-semibold text-gray-900 truncate max-w-[120px]">
//               {transaction._id ? `...${transaction._id.slice(-8)}` : "-"}
//             </p>
//           </div>
//         </div>
//         <span className={`px-3 py-1 text-xs font-medium rounded-full border ${getStatusColor(transaction.status)}`}>
//           {getStatusText(transaction.status)}
//         </span>
//       </div>

//       {/* Amount Section */}
//       <div className="bg-gray-50 rounded-lg p-3 mb-4">
//         <div className="flex justify-between items-center">
//           <div>
//             <p className="text-xs text-gray-500 uppercase tracking-wide">Withdrawal Amount</p>
//             <p className="text-lg font-bold text-gray-900">
//               {transaction.amount ? (
//                 transaction.currency === "INR" 
//                   ? `₹${parseFloat(transaction.amount).toFixed(2)}`
//                   : `$${parseFloat(transaction.amount).toFixed(2)}`
//               ) : "-"}
//             </p>
//           </div>
//           <div className="text-right">
//             <p className="text-xs text-gray-500 uppercase tracking-wide">Admin Fee</p>
//             <p className="text-sm font-semibold text-red-600">
//               {transaction.admin_inr_charges ? (
//                 transaction.currency === "INR" 
//                   ? `₹${transaction.admin_inr_charges}`
//                   : `$${transaction.admin_inr_charges}`
//               ) : "-"}
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* Details Grid */}
//       <div className="grid grid-cols-1 gap-3">
//         <div className="flex justify-between items-center py-2 border-b border-gray-100">
//           <span className="text-sm text-gray-600">Currency</span>
//           <span className="text-sm font-medium text-gray-900">{transaction.currency || "-"}</span>
//         </div>
        
//         <div className="flex justify-between items-center py-2 border-b border-gray-100">
//           <span className="text-sm text-gray-600">Date & Time</span>
//           <span className="text-sm font-medium text-gray-900">{formatDateWithAmPm(transaction.created_at)}</span>
//         </div>
        
//         {transaction.reason && (
//           <div className="py-2 border-b border-gray-100">
//             <p className="text-sm text-gray-600 mb-1">Reason</p>
//             <p className="text-sm text-gray-900 break-words">{transaction.reason}</p>
//           </div>
//         )}
        
//         {transaction.note && (
//           <div className="py-2">
//             <p className="text-sm text-gray-600 mb-1">Note</p>
//             <p className="text-sm text-gray-900 break-words">{transaction.note}</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );

//   return (
//     <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
//       <div className="px-4 sm:px-6 py-4 border-b border-gray-200 bg-gray-50">
//         <div className="flex flex-col gap-4">
//           <div className="flex items-center gap-2">
//             <h3 className="text-lg font-semibold text-gray-900">Withdrawal History</h3>
//             {isMobile && <Smartphone className="w-4 h-4 text-gray-500" />}
//           </div>
          
//           {/* Mobile and Tablet Filters */}
//           <div className="flex flex-col gap-3">
//             <div className="flex flex-col sm:flex-row gap-3">
//               <select
//                 value={selectedStatus}
//                 onChange={(e) => {
//                   setSelectedStatus(e.target.value);
//                   setState(prev => ({ ...prev, currentPage: 1 }));
//                 }}
//                 className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-[#1d8e85] focus:border-[#1d8e85] text-gray-700 bg-white"
//               >
//                 <option value="">All Status</option>
//                 <option value="1">Approved</option>
//                 <option value="0">Pending</option>
//                 <option value="2">Rejected</option>
//               </select>
              
//               <div className="relative flex-1">
//                 <input
//                   type="text"
//                   placeholder="Search transactions..."
//                   onChange={handleSearch}
//                   className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-[#1d8e85] focus:border-[#1d8e85]"
//                 />
//                 <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
//               </div>
//             </div>
            
//             <button className="w-full sm:w-auto px-4 py-2 bg-[#1d8e85] text-white rounded-md text-sm hover:bg-[#166f67] focus:ring-2 focus:ring-[#1d8e85] focus:ring-offset-2 flex items-center justify-center gap-2 transition-colors">
//               <Download className="w-4 h-4" />
//               Export
//             </button>
//           </div>
//         </div>
//       </div>

//       {isMobile ? (
//         // Mobile Card View
//         <div className="p-4">
//           <div className="space-y-4">
//             {loading ? (
//               [...Array(3)].map((_, i) => (
//                 <div key={i} className="bg-gray-200 animate-pulse rounded-xl h-48"></div>
//               ))
//             ) : !transactions || transactions.length === 0 ? (
//               <div className="text-center py-12">
//                 <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
//                   <Building className="w-8 h-8 text-gray-400" />
//                 </div>
//                 <h3 className="text-lg font-medium text-gray-900 mb-2">No transactions found</h3>
//                 <p className="text-gray-500">Your withdrawal history will appear here</p>
//               </div>
//             ) : (
//               transactions.map((transaction, index) => (
//                 <TransactionCard key={transaction._id || index} transaction={transaction} index={index} />
//               ))
//             )}
//           </div>
//         </div>
//       ) : (
//         // Desktop Table View
//         <div className="overflow-x-auto">
//           <table className="w-full">
//             <thead className="bg-[#1d8e85] text-white text-sm">
//               <tr>
//                 <th className="px-6 py-3 text-left text-xs uppercase tracking-wider">S.No</th>
//                 <th className="px-6 py-3 text-left text-xs uppercase tracking-wider">Transaction ID</th>
//                 <th className="px-6 py-3 text-left text-xs uppercase tracking-wider">Currency Type</th>
//                 <th className="px-6 py-3 text-left text-xs uppercase tracking-wider">Withdrawal Amount</th>
//                 <th className="px-6 py-3 text-left text-xs uppercase tracking-wider">Admin Charges</th>
//                 <th className="px-6 py-3 text-left text-xs uppercase tracking-wider">Date & Time</th>
//                 <th className="px-6 py-3 text-left text-xs uppercase tracking-wider">Status</th>
//                 <th className="px-6 py-3 text-left text-xs uppercase tracking-wider">Reason</th>
//                 <th className="px-6 py-3 text-left text-xs uppercase tracking-wider">Note</th>
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-200">
//               {loading ? (
//                 [...Array(5)].map((_, i) => (
//                   <tr key={i}>
//                     {[...Array(9)].map((_, j) => (
//                       <td key={j} className="px-6 py-4">
//                         <div className="bg-gray-200 animate-pulse h-4 rounded"></div>
//                       </td>
//                     ))}
//                   </tr>
//                 ))
//               ) : !transactions || transactions.length === 0 ? (
//                 <tr>
//                   <td colSpan="9" className="px-6 py-8 text-center text-gray-500">
//                     No data found
//                   </td>
//                 </tr>
//               ) : (
//                 transactions.map((transaction, index) => (
//                   <tr key={transaction._id || index} className="hover:bg-gray-50">
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                       {(state?.currentPage || 1) * (state?.perPage || 10) - ((state?.perPage || 10) - 1) + index}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
//                       {transaction._id || "-"}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                       {transaction.currency || "-"}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-semibold">
//                       {transaction.amount ? (
//                         transaction.currency === "INR" 
//                           ? `₹${parseFloat(transaction.amount).toFixed(2)}` 
//                           : `$${parseFloat(transaction.amount).toFixed(2)}`
//                       ) : "-"}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                       {transaction.admin_inr_charges ? (
//                         transaction.currency === "INR" 
//                           ? `₹${transaction.admin_inr_charges}` 
//                           : `$${transaction.admin_inr_charges}`
//                       ) : "-"}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                       {formatDateWithAmPm(transaction.created_at)}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(transaction.status)}`}>
//                         {getStatusText(transaction.status)}
//                       </span>
//                     </td>
//                     <td className="px-6 py-4 text-sm text-gray-500 max-w-24 truncate" title={transaction?.reason}>
//                       {transaction?.reason || "-"}
//                     </td>
//                     <td className="px-6 py-4 text-sm text-gray-500">
//                       <span className="cursor-pointer hover:text-[#1d8e85]" title={transaction?.note}>
//                         {transaction?.note ? "Details" : "-"}
//                       </span>
//                     </td>
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// };

// const Withdrawal = () => {
//   const [withdrawRequest, { isLoading }] = useWithdrawRequestMutation();
//   const { data: userData, refetch } = useUserDataQuery();
//   const { data: getSetting } = useGetSettingQuery();
//   const { data: kycDetails } = useGetkycDetailsQuery();

//   const [formData, setFormData] = useState({
//     balanceType: "referral",
//     paymentCurrency: "",
//     amount: "",
//   });
//   const [loading, setLoading] = useState(false);
//   const [errors, setErrors] = useState({});
//   const [selectedStatus, setSelectedStatus] = useState("");
//   const [state, setState] = useState({
//     currentPage: 1,
//     perPage: 10,
//     search: "",
//   });

//   const queryParams = `limit=${state?.perPage || ""}&page=${state?.currentPage || ""}&search=${state?.search || ""}&status=${selectedStatus}`;
  
//   const {
//     data: withdrawHistory,
//     isLoading: isLoadingWithdraw,
//     refetch: refetchWithdraw,
//   } = useWithdrawRequestListQuery(queryParams);

//   const datafromApi = withdrawHistory?.data?.withdrawRequests || [];
//   const id = localStorage.getItem("userId") || "user123"; // Get actual user ID from localStorage
//   const TableData = datafromApi.filter((item) => item?.userId?._id === id);

//   const [previewData, setPreviewData] = useState([
//     { heading: "Fees", subHeading: "0" },
//     { heading: "Will Get", subHeading: "0" },
//   ]);

//   useEffect(() => {
//     if (
//       userData &&
//       userData?.data?.countryCode !== 91 &&
//       formData.paymentCurrency !== "USD"
//     ) {
//       setFormData((prev) => ({
//         ...prev,
//         paymentCurrency: "USD",
//       }));
//     } else if (
//       userData &&
//       userData?.data?.countryCode === 91 &&
//       formData.paymentCurrency !== "INR"
//     ) {
//       setFormData((prev) => ({
//         ...prev,
//         paymentCurrency: "INR",
//       }));
//     }
//   }, [userData?.data?.countryCode, formData.paymentCurrency]);

//   const validate = () => {
//     const errors = {};

//     if (!formData.balanceType) {
//       errors.balanceType = "Balance Type is required";
//     }

//     if (formData.balanceType === "referral" && !formData.paymentCurrency) {
//       errors.paymentCurrency = "Payment Currency is required";
//     }

//     if (!formData.amount) {
//       errors.amount = "Amount is required";
//     } else if (isNaN(formData.amount)) {
//       errors.amount = "Amount must be a number";
//     } else if (parseFloat(formData.amount) <= 0) {
//       errors.amount = "Amount must be greater than zero";
//     }

//     return errors;
//   };

//   const calculatePreview = (amount, paymentCurrency) => {
//     if (!getSetting?.data) {
//       alert("Settings data is missing.");
//       return;
//     }

//     const {
//       min_withdrawal_inr,
//       max_withdrawal_inr,
//       withdrawal_commission_inr,
//       min_withdrawal_usd,
//       max_withdrawal_usd,
//       withdrawal_commission_usd,
//     } = getSetting.data;

//     const parsedAmount = parseFloat(amount);
//     let Fees;
    
//     if (paymentCurrency === "INR") {
//       if (parsedAmount < min_withdrawal_inr || parsedAmount > max_withdrawal_inr) {
//         alert(`Withdrawal amount should be between ${min_withdrawal_inr} and ${max_withdrawal_inr}.`);
//         return;
//       }
//       Fees = (parsedAmount * withdrawal_commission_inr) / 100;
//     } else {
//       if (parsedAmount < min_withdrawal_usd || parsedAmount > max_withdrawal_usd) {
//         alert(`Withdrawal amount should be between ${min_withdrawal_usd} and ${max_withdrawal_usd}.`);
//         return;
//       }
//       Fees = (parsedAmount * withdrawal_commission_usd) / 100;
//     }

//     const Will_Get = parsedAmount - Fees;

//     setPreviewData([
//       {
//         heading: "Fees",
//         subHeading: `${Fees.toFixed(2)} ${paymentCurrency === "USD" ? "USD" : paymentCurrency === "INR" ? "INR" : "Jaimax"}`,
//       },
//       {
//         heading: "Will Get",
//         subHeading: `${Will_Get.toFixed(2)} ${paymentCurrency === "USD" ? "USD" : paymentCurrency === "INR" ? "INR" : "Jaimax"}`,
//       },
//     ]);
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;

//     if (name === "amount" && !/^\d*\.?\d*$/.test(value)) {
//       return;
//     }

//     setFormData({ ...formData, [name]: value });
//     if (value) {
//       clearErrors();
//     }
//     setPreviewData([
//       { heading: "Fees", subHeading: "0" },
//       { heading: "Will Get", subHeading: "0" },
//     ]);
//   };

//   const onBlurAmount = (e) => {
//     if (e.target.value) {
//       calculatePreview(e.target.value, formData.paymentCurrency);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const errors = validate();
//     if (Object.keys(errors).length > 0) {
//       setErrors(errors);
//       return;
//     }

//     const { amount, balanceType, paymentCurrency } = formData;
//     try {
//       const response = await withdrawRequest(
//         balanceType == "referral"
//           ? {
//               amount: parseFloat(amount),
//               currency: paymentCurrency,
//               currencyType: paymentCurrency,
//             }
//           : balanceType == "JAIMAX"
//           ? { amount: parseFloat(amount), currency: balanceType }
//           : ""
//       );
      
//       if (response.success) {
//         setFormData({
//           balanceType: "referral",
//           paymentCurrency: "",
//           amount: "",
//         });

//         setPreviewData([
//           { heading: "Fees", subHeading: "0" },
//           { heading: "Will Get", subHeading: "0" },
//         ]);
//         alert(response?.message);
//         refetchWithdraw();
//       } else {
//         alert(response.message);
//       }
//     } catch (error) {
//       alert(error?.data?.message || "Withdrawal failed. Please try again.");
//     }
//   };

//   const clearErrors = () => {
//     setErrors({});
//   };

//   const addSymbolPlaceholder = (value) => {
//     if (value === "INR") {
//       return "₹";
//     } else if (value === "USD") {
//       return "$";
//     } else {
//       return "";
//     }
//   };

//   const handlePageChange = (e) => {
//     setLoading(true);
//     setState({ ...state, currentPage: e });
//   };

//   let searchTimeout;
//   const handleSearch = (e) => {
//     clearTimeout(searchTimeout);
//     searchTimeout = setTimeout(() => {
//       setState({ ...state, search: e.target.value, currentPage: 1 });
//     }, 1000);
//   };

//   const onChangeBalanceType = (e) => {
//     setFormData({
//       amount: "",
//       balanceType: e.target.value,
//       paymentCurrency: "",
//     });
//     setPreviewData([
//       { heading: "Fees", subHeading: "0" },
//       { heading: "Will Get", subHeading: "0" },
//     ]);
//   };

//   useEffect(() => {
//     setLoading(false);
//   }, [withdrawHistory?.data?.withdrawRequests]);

//   useEffect(() => {
//     return () => {
//       clearTimeout(searchTimeout);
//     };
//   }, []);

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Header */}
//       <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="py-4 sm:py-6">
//             <div className="flex items-center gap-3">
//               <div className="p-2 bg-[#1d8e85] rounded-lg shadow-lg">
//                 <Building className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
//               </div>
//               <div>
//                 <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">Fund Withdrawal</h1>
//                 <p className="text-xs sm:text-sm text-gray-600">Secure transfer to your registered bank account</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
//         <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6">
//           {/* Left Column - Withdrawal Form */}
//           <div className="lg:col-span-5 xl:col-span-4">
//             <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6 shadow-sm">
//               <div className="mb-6">
//                 <h2 className="text-lg font-semibold text-gray-900 mb-4">Withdrawal Request</h2>
                
//                 {/* Balance Display */}
//                 <div className="bg-gradient-to-r from-[#1d8e85] to-[#16a085] rounded-xl p-4 text-white mb-6">
//                   <div className="flex items-center justify-between">
//                     <div>
//                       <p className="text-sm opacity-90">Available Balance</p>
//                       <p className="text-xl sm:text-2xl font-bold">
//                         ₹{userData?.data?.Inr?.toLocaleString('en-IN') || '0'}
//                       </p>
//                     </div>
//                     <CreditCard className="w-6 h-6 sm:w-8 sm:h-8 opacity-80" />
//                   </div>
//                 </div>
//               </div>

//               <div className="space-y-6">
//                 <div>
//                   <label htmlFor="balanceType" className="block text-sm font-medium text-gray-700 mb-2">
//                     Source Account
//                   </label>
//                   <select
//                     id="balanceType"
//                     name="balanceType"
//                     value={formData.balanceType}
//                     onChange={onChangeBalanceType}
//                     onClick={clearErrors}
//                     className="w-full text-white px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#1d8e85] focus:border-[#1d8e85] bg-[#1d8e85]"
//                   >
//                     <option className="bg-[#1d8e85]" value="referral">Available Balance</option>
//                     <option className="bg-[#1d8e85]" value="JAIMAX">Purchase Token (JaiMax)</option>
//                   </select>
//                   {errors.balanceType && (
//                     <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
//                       <AlertTriangle className="w-4 h-4" />
//                       {errors.balanceType}
//                     </p>
//                   )}
//                   {formData.balanceType === "referral" && (
//                     <p className="text-gray-600 mt-2 text-sm">
//                       Total Available Balance: ₹{userData?.data?.Inr?.toFixed(2) || '0.00'}
//                     </p>
//                   )}
//                 </div>

//                 {formData.balanceType === "referral" && (
//                   <>
//                     <div className="grid grid-cols-2 gap-3">
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-2">
//                           Currency
//                         </label>
//                         <div className="px-3 py-2 bg-gray-100 border border-gray-300 rounded-md text-gray-900 font-medium text-center">
//                           {formData.paymentCurrency || (userData?.data?.countryCode === 91 ? "INR" : "USD")}
//                         </div>
//                       </div>
//                       <div>
//                         <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-2">
//                           Amount *
//                         </label>
//                         <input
//                           id="amount"
//                           type="text"
//                           placeholder={`Enter Amount ${addSymbolPlaceholder(formData.paymentCurrency)}`}
//                           value={formData.amount}
//                           onChange={handleInputChange}
//                           onBlur={onBlurAmount}
//                           onClick={clearErrors}
//                           name="amount"
//                           autoComplete="off"
//                           className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-[#1d8e85] focus:border-[#1d8e85] ${
//                             errors.amount ? 'border-red-300 bg-red-50' : 'border-gray-300'
//                           }`}
//                         />
//                       </div>
//                     </div>
//                     {errors.amount && (
//                       <p className="text-sm text-red-600 flex items-center gap-1">
//                         <AlertTriangle className="w-4 h-4" />
//                         {errors.amount}
//                       </p>
//                     )}

//                     {/* Transaction Summary */}
//                     {formData.amount && (
//                       <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
//                         <h3 className="text-sm font-medium text-gray-900 mb-3">Transaction Summary</h3>
//                         <div className="space-y-2 text-sm">
//                           {previewData.map((data, i) => (
//                             <div key={i} className="flex justify-between">
//                               <span className={data.heading === "Fees" ? "text-red-600" : "text-gray-600"}>
//                                 {data.heading}
//                               </span>
//                               <span className={data.heading === "Will Get" ? "text-[#1d8e85] font-semibold" : "font-medium"}>
//                                 {data.subHeading}
//                               </span>
//                             </div>
//                           ))}
//                         </div>
//                       </div>
//                     )}
//                   </>
//                 )}

//                 {formData.balanceType === "JAIMAX" && (
//                   <div className="text-center py-8">
//                     <h5 className="text-gray-600 text-lg font-medium">Coming Soon</h5>
//                     <p className="text-gray-500 text-sm mt-2">JaiMax token withdrawal will be available soon</p>
//                   </div>
//                 )}

//                 <button
//                   type="button"
//                   onClick={handleSubmit}
//                   disabled={isLoading || formData.balanceType === "JAIMAX"}
//                   className="w-full bg-[#1d8e85] text-white py-3 px-4 rounded-md font-medium hover:bg-[#166f67] focus:ring-2 focus:ring-[#1d8e85] focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-colors"
//                 >
//                   {isLoading ? (
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
//               </div>
//             </div>
//           </div>

//           {/* Right Column - Bank Details & Terms */}
//           <div className="lg:col-span-7 xl:col-span-8 space-y-4 sm:space-y-6">
//             {/* Bank Details */}
//             <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6 shadow-sm">
//               <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
//                 <h2 className="text-lg font-semibold text-gray-900">Destination Account</h2>
                
//               </div>

//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
//                 <div>
//                   <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
//                     Account Holder
//                   </label>
//                   <p className="text-gray-900 font-semibold">
//                     {kycDetails?.data?.name || "Not Available"}
//                   </p>
//                 </div>

//                 <div>
//                   <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
//                     Account Number
//                   </label>
//                   <p className="text-gray-900 font-semibold font-mono break-all">
//                     {kycDetails?.data?.bank_account || "Not Available"}
//                   </p>
//                 </div>

//                 <div>
//                   <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
//                     {userData?.data?.countryCode === 91 ? "IFSC" : "Bank"} Code
//                   </label>
//                   <p className="text-gray-900 font-semibold">
//                     {kycDetails?.data?.ifsc_code || "Not Available"}
//                   </p>
//                 </div>

//                 <div>
//                   <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
//                     Bank Name
//                   </label>
//                   <p className="text-gray-900 font-semibold">
//                     {kycDetails?.data?.bank_name || "Not Available"}
//                   </p>
//                 </div>
//               </div>
//             </div>

//             {/* Processing Information */}
//             <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6 shadow-sm">
//               <h2 className="text-lg font-semibold text-gray-900 mb-4">Terms & Conditions</h2>
              
//               <div className="grid grid-cols-1 sm:grid-cols-2  md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
//                 <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
//                   <Clock className="w-5 h-5 text-blue-600 flex-shrink-2" />
//                   <div>
//                     <p className="text-sm font-medium text-blue-900">Processing Time</p>
//                     <p className="text-xs text-blue-700">Within 24 hours</p>
//                   </div>
//                 </div>
                
//                 <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg border border-green-200">
//                   <Shield className="w-5 h-5 text-green-600 flex-shrink-2" />
//                   <div>
//                     <p className="text-sm font-medium text-green-900">Working Hours</p>
//                     <p className="text-xs text-green-700">Mon-Fri, 10 AM - 4 PM</p>
//                   </div>
//                 </div>
                
//                 <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg border border-orange-200">
//                   <Info className="w-5 h-5 text-orange-600 flex-shrink-2" />
//                   <div>
//                     <p className="text-sm font-medium text-orange-900">Processing Fee</p>
//                     <p className="text-xs text-orange-700">
//                       {getSetting?.data?.withdrawal_commission_inr || "0.5"}% per transaction
//                     </p>
//                   </div>
//                 </div>
//               </div>

//               <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
//                 <div className="flex gap-3">
//                   <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
//                   <div>
//                     <h3 className="text-sm font-semibold text-yellow-800">Important Notes</h3>
//                     <ul className="text-sm text-yellow-700 mt-2 space-y-1">
//                       <li>• You have to complete the KYC and get approved status; then you can start the withdrawal process.</li>
//                       <li>• The withdrawal department works only during banking hours (10 AM to 4 PM) from Monday to Friday.</li>
//                       <li>• When you initiate the withdrawal process, the funds will be credited to your account within 24 hours.</li>
//                       <li>• We are not responsible if you provide the wrong bank details. Please check them carefully before initiating the withdrawal process.</li>
//                     </ul>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Transaction History */}
//         <div className="mt-6 sm:mt-8">
//           <TransactionTable 
//             transactions={TableData}
//             state={state}
//             setState={setState}
//             selectedStatus={selectedStatus}
//             setSelectedStatus={setSelectedStatus}
//             handleSearch={handleSearch}
//             handlePageChange={handlePageChange}
//             loading={isLoadingWithdraw || loading}
//           />
          
//           {/* Pagination - Only show if there's data */}
//           {withdrawHistory?.data?.pagination?.total > 0 && (
//             <div className="mt-6 bg-white rounded-lg border border-gray-200 shadow-sm">
//               <div className="p-4">
//                 <div className="flex flex-col gap-4">
//                   {/* Entries selector and results info */}
//                   <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
//                     <div className="flex items-center gap-2 text-sm">
//                       <span className="text-gray-700">Show</span>
//                       <select
//                         value={state?.perPage}
//                         onChange={(e) => {
//                           const newPerPage = e.target.value;
//                           setState({
//                             ...state,
//                             perPage: newPerPage,
//                             currentPage: 1,
//                           });
//                         }}
//                         className="px-3 py-1 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-[#1d8e85] focus:border-[#1d8e85]"
//                       >
//                         <option value="10">10</option>
//                         <option value="30">30</option>
//                         <option value="50">50</option>
//                       </select>
//                       <span className="text-gray-700">entries</span>
//                     </div>
                    
                   
//                   </div>
                  
//                   {/* Pagination controls - Only show if more than 1 page */}
//                   {Math.ceil(withdrawHistory.data.pagination.total / (state?.perPage || 10)) > 1 && (
//                     <div className="flex justify-center">
//                       <Pagination
//                         currentPage={state?.currentPage || 1}
//                         totalPages={Math.ceil(withdrawHistory.data.pagination.total / (state?.perPage || 10))}
//                         onPageChange={handlePageChange}
//                       />
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Withdrawal;



import React, { useState, useEffect } from "react";
import { AlertTriangle, CheckCircle, Info, Download, Building, CreditCard, Clock, Shield, ArrowRight, Smartphone, Search } from "lucide-react";
import { toast } from "react-toastify";
import { InputLabel, Select, MenuItem } from "@mui/material";
import {
  useCalculateWithdrawMutation,
  useGetSettingQuery,
  useWithdrawRequestListQuery,
  useWithdrawRequestMutation,
  useWithdrawHistoryQuery,
} from "./withdrawApiSlice";
import Pagination from "../../../pagination/pagination";
import { useUserDataQuery } from "../../../Dashboard/pages/dashBoard/DashboardApliSlice";
import { useGetkycDetailsQuery } from "../kyc/kycApiSlice";
import Loader from "../../../Loader/loader";
const SkeltonComponent = ({ width = "w-full", height = "h-6", rounded = "rounded-md" }) => {
  return (
    <div className={`animate-pulse bg-gray-300 dark:bg-gray-700 ${width} ${height} ${rounded}`}></div>
  );
};
const TransactionTable = ({ 
  transactions, 
  state, 
  setState, 
  selectedStatus, 
  setSelectedStatus, 
  handleSearch, 
  handlePageChange, 
  loading,
  withdrawHistory,
  formatDateWithAmPm
}) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case "1": return 'bg-green-100 text-green-800 border-green-300';
      case "0": return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case "2": return 'bg-red-100 text-red-800 border-red-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "1": return "Approved";
      case "0": return "Pending";
      case "2": return "Rejected";
      default: return "Unknown";
    }
  };

  const TransactionCard = ({ transaction, index }) => (
    <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
      {/* Header with Status and Serial Number */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#1d8e85] rounded-lg flex items-center justify-center">
            <span className="text-white font-semibold text-sm">
              {(state?.currentPage || 1) * (state?.perPage || 10) - ((state?.perPage || 10) - 1) + index}
            </span>
          </div>
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wide">Transaction</p>
            <p className="text-sm font-semibold text-gray-900 truncate max-w-[120px]">
              {transaction._id ? `...${transaction._id.slice(-8)}` : "-"}
            </p>
          </div>
        </div>
        <span className={`px-3 py-1 text-xs font-medium rounded-full border ${getStatusColor(transaction.status)}`}>
          {getStatusText(transaction.status)}
        </span>
      </div>

      {/* Amount Section */}
      <div className="bg-gray-50 rounded-lg p-3 mb-4">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wide">Withdrawal Amount</p>
            <p className="text-lg font-bold text-gray-900">
              {transaction.amount ? (
                transaction.currency === "INR" 
                  ? `₹${parseFloat(transaction.amount).toFixed(2)}`
                  : `$${parseFloat(transaction.amount).toFixed(2)}`
              ) : "-"}
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-500 uppercase tracking-wide">Admin Fee</p>
            <p className="text-sm font-semibold text-red-600">
              {transaction.admin_inr_charges ? (
                transaction.currency === "INR" 
                  ? `₹${transaction.admin_inr_charges}`
                  : `$${transaction.admin_inr_charges}`
              ) : "-"}
            </p>
          </div>
        </div>
      </div>

      {/* Details Grid */}
      <div className="grid grid-cols-1 gap-3">
        <div className="flex justify-between items-center py-2 border-b border-gray-100">
          <span className="text-sm text-gray-600">Currency</span>
          <span className="text-sm font-medium text-gray-900">{transaction.currency || "-"}</span>
        </div>
        
        <div className="flex justify-between items-center py-2 border-b border-gray-100">
          <span className="text-sm text-gray-600">Date & Time</span>
          <span className="text-sm font-medium text-gray-900">{formatDateWithAmPm(transaction.created_at)}</span>
        </div>
        
        {transaction.reason && (
          <div className="py-2 border-b border-gray-100">
            <p className="text-sm text-gray-600 mb-1">Reason</p>
            <p className="text-sm text-gray-900 break-words">{transaction.reason}</p>
          </div>
        )}
        
        {transaction.note && (
          <div className="py-2">
            <p className="text-sm text-gray-600 mb-1">Note</p>
            <p className="text-sm text-gray-900 break-words">{transaction.note}</p>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
      <div className="px-4 sm:px-6 py-4 border-b border-gray-200 bg-gray-50">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-semibold text-gray-900">Withdrawal History</h3>
            {isMobile && <Smartphone className="w-4 h-4 text-gray-500" />}
          </div>
          
          {/* Mobile and Tablet Filters */}
          <div className="flex flex-col gap-3">
            <div className="flex flex-col sm:flex-row gap-3">
              <Select
                className="flex-1 form-control form-select shadow-none bg-transparent p-0 customSelect"
                aria-label="Default select example"
                value={selectedStatus}
                onChange={(e) => {
                  setSelectedStatus(e.target.value);
                  setState(prev => ({ ...prev, currentPage: 1 }));
                }}
                displayEmpty
                MenuProps={{
                  disableScrollLock: true,
                  classes: { list: "customMuiListRoot" },
                }}
              >
                <MenuItem value="" className="customMenuItem p-2 m-0 text-muted">
                  Select Status
                </MenuItem>
                <MenuItem value="Approved" className="customMenuItem p-2 m-0">
                  Approved
                </MenuItem>
                <MenuItem value="Pending" className="customMenuItem p-2 m-0">
                  Pending
                </MenuItem>
                <MenuItem value="Rejected" className="customMenuItem p-2 m-0">
                  Rejected
                </MenuItem>
              </Select>
              
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Search transactions..."
                  onChange={handleSearch}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-[#1d8e85] focus:border-[#1d8e85]"
                />
                <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              </div>
            </div>
            
            <button className="w-full sm:w-auto px-4 py-2 bg-[#1d8e85] text-white rounded-md text-sm hover:bg-[#166f67] focus:ring-2 focus:ring-[#1d8e85] focus:ring-offset-2 flex items-center justify-center gap-2 transition-colors">
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
            {loading ? (
              [...Array(3)].map((_, i) => (
                <div key={i} className="bg-gray-200 animate-pulse rounded-xl h-48"></div>
              ))
            ) : !transactions || transactions.length === 0 ? (
              <div className="text-center py-12">
                <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <Building className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No transactions found</h3>
                <p className="text-gray-500">Your withdrawal history will appear here</p>
              </div>
            ) : (
              transactions.map((transaction, index) => (
                <TransactionCard key={transaction._id || index} transaction={transaction} index={index} />
              ))
            )}
          </div>
        </div>
      ) : (
        // Desktop Table View
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#1d8e85] text-white text-sm">
              <tr>
                <th className="px-6 py-3 text-left text-xs uppercase tracking-wider">S.No</th>
                <th className="px-6 py-3 text-left text-xs uppercase tracking-wider">Transaction ID</th>
                <th className="px-6 py-3 text-left text-xs uppercase tracking-wider">Currency Type</th>
                <th className="px-6 py-3 text-left text-xs uppercase tracking-wider">Withdrawal Amount</th>
                <th className="px-6 py-3 text-left text-xs uppercase tracking-wider">Admin Charges</th>
                <th className="px-6 py-3 text-left text-xs uppercase tracking-wider">Date & Time</th>
                <th className="px-6 py-3 text-left text-xs uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs uppercase tracking-wider">Reason</th>
                <th className="px-6 py-3 text-left text-xs uppercase tracking-wider">Note</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {loading ? (
                [...Array(10)].map((_, i) => (
                  <tr key={i}>
                    {[...Array(9)].map((_, j) => (
                      <td key={j} className="px-6 py-4">
                        <SkeltonComponent />
                      </td>
                    ))}
                  </tr>
                ))
              ) : !transactions || transactions.length === 0 ? (
                <tr>
                  <td colSpan="9" className="px-6 py-8 text-center text-gray-500">
                    No data found
                  </td>
                </tr>
              ) : (
                transactions.map((transaction, index) => (
                  <tr key={transaction._id || index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {state?.currentPage * state?.perPage - (state?.perPage - 1) + index}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {transaction._id || "-"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {transaction.currency || "-"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-semibold">
                      <span>
                        {transaction.currency === "INR"
                          ? `₹${transaction.amount.toFixed(2)}`
                          : `$${transaction.amount.toFixed(2)}`}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <span>
                        {transaction.currency === "INR"
                          ? `₹${transaction.admin_inr_charges}`
                          : `$${transaction.admin_inr_charges}`}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDateWithAmPm(transaction.created_at)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span 
                        className={`inline-flex px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(transaction.status)}`}
                        style={{
                          color: transaction.status == "1" ? "green" : transaction.status == "2" ? "red" : "goldenrod",
                          fontFamily: "MontserratExtraBold",
                        }}
                      >
                        {transaction.status == "1" ? "Approved" : transaction.status == "2" ? "Rejected" : "Pending"}
                      </span>
                    </td>
                    <td 
                      className="px-6 py-4 text-sm text-gray-500 max-w-24 truncate" 
                      style={{
                        maxWidth: "60px",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                      title={transaction?.reason}
                    >
                      {transaction?.reason || "-"}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      <a
                        className="pointer cursor-pointer hover:text-[#1d8e85]"
                        data-bs-toggle="tooltip"
                        data-bs-placement="left"
                        title={transaction.note}
                      >
                        Details
                      </a>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

const Withdrawal = () => {
  const [withdrawRequest, { isLoading }] = useWithdrawRequestMutation();
  const { data: userData, refetch } = useUserDataQuery(undefined, {});
  const [calculateWithdraw, { data: withdrawCalculate }] = useCalculateWithdrawMutation();
  const { data: getSetting } = useGetSettingQuery();
  const { data: kycDetails } = useGetkycDetailsQuery();

  const [formData, setFormData] = useState({
    balanceType: "referral",
    paymentCurrency: "",
    amount: "",
  });
  const [loading, setLoading] = useState(false);
  const [isToastShown, setIsToastShown] = useState(false);
  const [errors, setErrors] = useState({});
  const [isTokenVerified, setIsTokenVerified] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [state, setState] = useState({
    currentPage: 1,
    perPage: 10,
    search: "",
  });

  const queryParams = `limit=${state?.perPage || ""}&page=${state?.currentPage || ""}&search=${state?.search || ""}&status=${selectedStatus}`;

  const {
    data: withdrawHistory,
    isLoading: isLoadingWithdraw,
    isError,
    refetch: refetchWithdraw,
    error,
  } = useWithdrawRequestListQuery(queryParams);

  const datafromApi = withdrawHistory?.data?.withdrawRequests || [];
  const id = JSON.parse(localStorage.getItem('userData'))?.data?._id;
  const TableData = datafromApi?.filter((item) => item?.userId?._id === id) || [];

  const [previewData, setPreviewData] = useState([
    { heading: "Fees", subHeading: "0" },
    { heading: "Will Get", subHeading: "0" },
  ]);

  useEffect(() => {
    if (
      userData &&
      userData?.data?.countryCode !== 91 &&
      formData.paymentCurrency !== "USD"
    ) {
      setFormData((prev) => ({
        ...prev,
        paymentCurrency: "USD",
      }));
    } else if (
      userData &&
      userData?.data?.countryCode === 91 &&
      formData.paymentCurrency !== "INR"
    ) {
      setFormData((prev) => ({
        ...prev,
        paymentCurrency: "INR",
      }));
    }
  }, [userData?.data?.countryCode, formData.paymentCurrency]);

  const validate = () => {
    const errors = {};

    if (!formData.balanceType) {
      errors.balanceType = "Balance Type is required";
    }

    if (formData.balanceType === "referral" && !formData.paymentCurrency) {
      errors.paymentCurrency = "Payment Currency is required";
    }

    if (!formData.amount) {
      errors.amount = "Amount is required";
    } else if (isNaN(formData.amount)) {
      errors.amount = "Amount must be a number";
    } else if (parseFloat(formData.amount) <= 0) {
      errors.amount = "Amount must be greater than zero";
    }

    return errors;
  };

  const calculatePreview = (amount, paymentCurrency) => {
    if (!getSetting?.data) {
      toast.error("Settings data is missing.", {
        position: "top-center",
      });
      return;
    }

    const {
      min_withdrawal_inr,
      max_withdrawal_inr,
      withdrawal_commission_inr,
      min_withdrawal_usd,
      max_withdrawal_usd,
      withdrawal_commission_usd,
    } = getSetting.data;

    const parsedAmount = parseFloat(amount);
    let Fees;
    
    if (paymentCurrency === "INR") {
      if (parsedAmount < min_withdrawal_inr || parsedAmount > max_withdrawal_inr) {
        setIsToastShown(true);
        if (!isToastShown) {
          toast.error(
            `Withdrawal amount should be between ${min_withdrawal_inr} and ${max_withdrawal_inr}.`,
            { position: "top-center" }
          );
        } else {
          toast.dismiss();
          toast.error(
            `Withdrawal amount should be between ${min_withdrawal_inr} and ${max_withdrawal_inr}.`,
            { position: "top-center" }
          );
        }
        return;
      }
      Fees = (parsedAmount * withdrawal_commission_inr) / 100;
    } else {
      if (parsedAmount < min_withdrawal_usd || parsedAmount > max_withdrawal_usd) {
        setIsToastShown(true);
        if (!isToastShown) {
          toast.error(
            `Withdrawal amount should be between ${min_withdrawal_usd} and ${max_withdrawal_usd}.`,
            { position: "top-center" }
          );
        } else {
          toast.dismiss();
          toast.error(
            `Withdrawal amount should be between ${min_withdrawal_usd} and ${max_withdrawal_usd}.`,
            { position: "top-center" }
          );
        }
        return;
      }
      Fees = (parsedAmount * withdrawal_commission_usd) / 100;
    }

    const Will_Get = parsedAmount - Fees;

    setPreviewData([
      {
        heading: "Fees",
        subHeading: `${Fees.toFixed(2)} ${paymentCurrency === "USD" ? "USD" : paymentCurrency === "INR" ? "INR" : "Jaimax"}`,
      },
      {
        heading: "Will Get",
        subHeading: `${Will_Get.toFixed(2)} ${paymentCurrency === "USD" ? "USD" : paymentCurrency === "INR" ? "INR" : "Jaimax"}`,
      },
    ]);
  };

  const handleStatusChange = (e) => {
    setSelectedStatus(e.target.value);
    setState({ ...state, currentPage: 1 });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "amount" && !/^\d*$/.test(value)) {
      return;
    }

    setFormData({ ...formData, [name]: value });
    if (value) {
      clearErrors();
    }
    setPreviewData([
      { heading: "Fees", subHeading: "0" },
      { heading: "Will Get", subHeading: "0" },
    ]);
  };

  const onBlurAmount = (e) => {
    if (e.target.value) {
      calculatePreview(e.target.value, formData.paymentCurrency);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validate();
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }

    const { amount, balanceType, paymentCurrency } = formData;
    try {
      const response = await withdrawRequest(
        balanceType == "referral"
          ? {
              amount: parseFloat(amount),
              currency: paymentCurrency,
              currencyType: paymentCurrency,
            }
          : balanceType == "JAIMAX"
          ? { amount: parseFloat(amount), currency: balanceType }
          : ""
      ).unwrap();
      
      if (response.success) {
        setFormData({
          balanceType: "referral",
          paymentCurrency: "",
          amount: "",
        });

        setPreviewData([
          { heading: "Fees", subHeading: "0" },
          { heading: "Will Get", subHeading: "0" },
        ]);
        
        toast.success(`${response?.message}`, {
          position: "top-center",
        });
        refetchWithdraw();
      } else {
        setIsToastShown(true);
        if (!isToastShown) {
          toast.error(response.message, {
            position: "top-center",
          });
        } else {
          toast.dismiss();
          toast.error(response.message, {
            position: "top-center",
          });
        }
      }
    } catch (error) {
      if (error?.data?.status_code == 400) {
        setIsToastShown(true);
        if (!isToastShown) {
          toast.error(`${error?.data?.message}`, {
            position: "top-center",
          });
        } else {
          toast.dismiss();
          toast.error(`${error?.data?.message}`, {
            position: "top-center",
          });
        }
      } else {
        setIsToastShown(true);
        if (!isToastShown) {
          toast.error(
            error?.data?.message ||
            error?.data?.withdrawType?.message ||
            error?.data?.currency?.message,
            {
              position: "top-center",
            }
          );
        } else {
          toast.dismiss();
          toast.error(
            error?.data?.message ||
            error?.data?.withdrawType?.message ||
            error?.data?.currency?.message,
            {
              position: "top-center",
            }
          );
        }
      }
    }
  };

  const clearErrors = () => {
    setErrors({});
  };

  const addSymbolPlaceholder = (value) => {
    if (value === "INR") {
      return "₹";
    } else if (value === "USD") {
      return "$";
    } else {
      return "";
    }
  };

  const handlePageChange = (e) => {
    setLoading(true);
    setState({ ...state, currentPage: e });
  };

  let searchTimeout;
  const handleSearch = (e) => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
      setState({ ...state, search: e.target.value, currentPage: 1 });
    }, 1000);
  };

  const onChangeBalanceType = (e) => {
    setFormData({
      amount: "",
      balanceType: e.target.value,
      paymentCurrency: "",
    });
    setPreviewData([
      { heading: "Fees", subHeading: "0" },
      { heading: "Will Get", subHeading: "0" },
    ]);
  };

  const formatDateWithAmPm = (isoString) => {
    const date = new Date(isoString);
    const day = String(date.getUTCDate()).padStart(2, "0");
    const month = String(date.getUTCMonth() + 1).padStart(2, "0");
    const year = date.getUTCFullYear();
    let hours = date.getUTCHours();
    const minutes = String(date.getUTCMinutes()).padStart(2, "0");
    const amAndPm = hours >= 12 ? "PM" : "AM";

    hours = hours % 12 || 12;
    return `${day}-${month}-${year} ${hours}:${minutes} ${amAndPm}`;
  };

  useEffect(() => {
    setLoading(false);
  }, [withdrawHistory?.data?.withdrawRequests]);

  useEffect(() => {
    return () => {
      clearTimeout(searchTimeout);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-4 sm:py-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-[#1d8e85] rounded-lg shadow-lg">
                <Building className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">Fund Withdrawal</h1>
                <p className="text-xs sm:text-sm text-gray-600">Secure transfer to your registered bank account</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6">
          {/* Left Column - Withdrawal Form */}
          <div className="lg:col-span-5 xl:col-span-4">
            <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6 shadow-sm">
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Withdrawal Request</h2>
                
                {/* Balance Display */}
                <div className="bg-gradient-to-r from-[#1d8e85] to-[#16a085] rounded-xl p-4 text-white mb-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm opacity-90">Available Balance</p>
                      <p className="text-xl sm:text-2xl font-bold">
                        ₹{userData?.data?.Inr?.toLocaleString('en-IN') || '0'}
                      </p>
                    </div>
                    <CreditCard className="w-6 h-6 sm:w-8 sm:h-8 opacity-80" />
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="balanceTypeFire">
                  <InputLabel id="balance-type-label" className="pb-1">
                    Balance Type
                  </InputLabel>
                  <Select
                    labelId="balance-type-label"
                    id="balance-type"
                    name="balanceType"
                    value={formData.balanceType}
                    onClick={clearErrors}
                    className="form-control form-select shadow-none bg-transparent p-0 customSelect w-full"
                    onChange={onChangeBalanceType}
                    displayEmpty
                    MenuProps={{
                      disableScrollLock: true,
                      classes: { list: "customMuiListRoot" },
                    }}
                  >
                    <MenuItem value="referral" className="customMenuItem p-2 m-0">
                      Available Balance
                    </MenuItem>
                    <MenuItem value="JAIMAX" className="customMenuItem p-2 m-0">
                      Purchase Token (JaiMax)
                    </MenuItem>
                  </Select>
                  {errors.balanceType && (
                    <div className="error_cls mt-1 text-sm text-red-600 flex items-center gap-1">
                      <AlertTriangle className="w-4 h-4" />
                      {errors.balanceType}
                    </div>
                  )}
                  {formData.balanceType === "referral" && (
                    <p className="text-gray-600 mt-2 text-sm">
                      Total Available Balance: ₹{userData?.data?.Inr?.toFixed(2) || '0.00'}
                    </p>
                  )}
                </div>

                {formData.balanceType === "referral" && (
                  <>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label htmlFor="paymentCurrency" className="block text-sm font-medium text-gray-700 mb-2">
                          Payment Currency
                        </label>
                        <input
                          type="text"
                          className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md text-gray-900 font-medium text-center paymentCurrencyView"
                          aria-label="paymentCurrency"
                          name="paymentCurrency"
                          value={formData.paymentCurrency || (userData?.data?.countryCode === 91 ? "INR" : "USD")}
                          disabled
                        />
                        {errors.paymentCurrency && (
                          <div className="error_cls mt-1 text-sm text-red-600 flex items-center gap-1">
                            <AlertTriangle className="w-4 h-4" />
                            {errors.paymentCurrency}
                          </div>
                        )}
                      </div>
                      <div>
                        <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-2">
                          Amount *
                        </label>
                        <input
                          id="amount"
                          type="text"
                          placeholder={`Enter Amount ${addSymbolPlaceholder(formData.paymentCurrency)}`}
                          value={formData.amount}
                          onChange={handleInputChange}
                          onBlur={onBlurAmount}
                          onClick={clearErrors}
                          name="amount"
                          autoComplete="off"
                          className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-[#1d8e85] focus:border-[#1d8e85] ${
                            errors.amount ? 'border-red-300 bg-red-50' : 'border-gray-300'
                          }`}
                        />
                        {errors.amount && (
                          <div className="error_cls mt-1 text-sm text-red-600 flex items-center gap-1">
                            <AlertTriangle className="w-4 h-4" />
                            {errors.amount}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Transaction Summary */}
                    <div className="rounded-3 py-4">
                      <div className="rounded-3 h-100">
                        <div className="h-100 preview_data d-flex flex-column justify-content-end rounded-3 px-3">
                          <ul className="list-unstyled">
                            {previewData.map((data, i) => (
                              <li className="pb-3 mb-2" key={i}>
                                <div className="preview_data d-flex align-items-center justify-content-between">
                                  <p className="mb-0">{data.heading}</p>
                                  <p className="mb-0">{data.subHeading}</p>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {formData.balanceType === "JAIMAX" && (
                  <div className="text-center py-8">
                    <h5 className="text-gray-600 text-lg font-medium cmgSoon">Coming Soon</h5>
                    <p className="text-gray-500 text-sm mt-2">JaiMax token withdrawal will be available soon</p>
                  </div>
                )}

                <div className="submit_btn text-end">
                  {isLoading ? (
                    <button
                      type="button"
                      className="w-full bg-[#1d8e85] text-white py-3 px-4 rounded-md font-medium border-0 revolutionBtn"
                      disabled
                    >
                      Submit
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="w-full bg-[#1d8e85] text-white py-3 px-4 rounded-md font-medium hover:bg-[#166f67] focus:ring-2 focus:ring-[#1d8e85] focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-colors border-0 revolutionBtn"
                      onClick={handleSubmit}
                      disabled={isLoading}
                    >
                      Submit Withdrawal
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Bank Details & Terms */}
          <div className="lg:col-span-7 xl:col-span-8 space-y-4 sm:space-y-6">
            {/* Bank Details */}
            <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6 shadow-sm my_total_team_data bank_details bankDetailsGrid">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
                <h1 className="text-lg font-semibold text-gray-900 mb-4 text-white">Bank Details</h1>
                <div className="flex items-center text-green-600 bg-green-50 px-3 py-1 rounded-full text-sm border border-green-200">
                  <CheckCircle className="w-4 h-4 mr-1" />
                  Verified
                </div>
              </div>

              <div className="">
                <p className="mb-1">
                  <label>Bank Holder Name</label>
                  <p className="desc">{kycDetails?.data?.name || "Not Available"}</p>
                </p>
                <div className="d-flex justify-content-between py-4">
                  <p className="mb-1">
                    <label>Bank Account Number</label>
                    <p className="desc">{kycDetails?.data?.bank_account || "Not Available"}</p>
                  </p>
                  <p className="mb-1 text-end">
                    <label>
                      Bank {userData?.data?.countryCode === 91 && "IFSC"} Code
                    </label>
                    <p className="desc">{kycDetails?.data?.ifsc_code || "Not Available"}</p>
                  </p>
                </div>
                <p className="mb-1 text-center">
                  <label>Bank Name</label>
                  <p className="desc">{kycDetails?.data?.bank_name || "Not Available"}</p>
                </p>
              </div>
            </div>

            {/* Processing Information */}
            <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6 shadow-sm my_total_team_data bank_details">
              <h1 className="text-lg font-semibold text-gray-900 mb-4 text-white">Terms & Conditions</h1>
              
              <div>
                <p className="mb-1">
                  1. You have to complete the KYC and get approved status;
                  then you can start the withdrawal process.
                </p>
                <p className="mb-1">
                  2. The withdrawal department works only during banking hours
                  (10 AM to 4 PM) from Monday to Friday.
                </p>
                <p className="mb-1">
                  3. When you initiate the withdrawal process, the funds will
                  be credited to your account within 24 hours.
                </p>
                <p className="mb-1">
                  4. We are not responsible if you provide the wrong bank
                  details. Please check them carefully before initiating the
                  withdrawal process.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Transaction History */}
        <div className="mt-6 sm:mt-8">
          <div className="my_total_team_data rounded-3 py-4">
            <TransactionTable 
              transactions={TableData}
              state={state}
              setState={setState}
              selectedStatus={selectedStatus}
              setSelectedStatus={setSelectedStatus}
              handleSearch={handleSearch}
              handlePageChange={handlePageChange}
              loading={isLoadingWithdraw || loading}
              withdrawHistory={withdrawHistory}
              formatDateWithAmPm={formatDateWithAmPm}
            />
          </div>
          
          {/* Pagination */}
          {withdrawHistory?.data?.pagination?.total > 0 && (
            <div className="d-flex justify-content-end customPagination">
              <div className="pagination__box pe-3">
                <div className="showing_data">
                  <Select
                    className="form-control form-select shadow-none bg-transparent p-0 customSelect"
                    aria-label="Default select example"
                    value={state?.perPage}
                    onChange={(e) => {
                      const newPerPage = e.target.value;
                      setState({
                        ...state,
                        perPage: newPerPage,
                        currentPage: 1,
                      });
                    }}
                    MenuProps={{
                      disableScrollLock: true,
                      classes: { list: "customMuiListRoot" },
                    }}
                  >
                    <MenuItem value="10" className="customMenuItem p-2 m-0">
                      10
                    </MenuItem>
                    <MenuItem value="30" className="customMenuItem p-2 m-0">
                      30
                    </MenuItem>
                    <MenuItem value="50" className="customMenuItem p-2 m-0">
                      50
                    </MenuItem>
                  </Select>
                </div>
              </div>
              <Pagination
                currentPage={state?.currentPage}
                totalPages={
                  withdrawHistory
                    ? Math.ceil(
                        withdrawHistory?.data?.pagination?.total /
                        state?.perPage
                      )
                    : 1
                }
                onPageChange={handlePageChange}
              />
            </div>
          )}
        </div>
      </div>
      
      {(isLoading || loading) && <Loader />}
    </div>
  );
};

export default Withdrawal;