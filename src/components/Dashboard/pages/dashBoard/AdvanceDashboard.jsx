// import { useState, useMemo, useEffect } from "react";
// import {
//   Coins, Wallet, Package, ArrowUpCircle, ArrowDownCircle,
//   TrendingUp, ArrowUp, ArrowDown, User, Mail, Phone,
//   Shield, CheckCircle, Globe, Copy, Check, Activity,
//   CreditCard, Hash, Loader2, AlertCircle, Lock, Calendar,
//   ChevronLeft, ChevronRight, Download, Sparkles, Star,
//   Link, Users, Share2, RefreshCcw, Hexagon, Layers, Gem
// } from "lucide-react";
// import {
//   AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
//   XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, LineChart, Line
// } from "recharts";
// import { useGetDashboardDetailsQuery } from "./DashboardApliSlice";

// // ─── Helpers ─────────────────────────────────────────────
// const fmt = (n) => new Intl.NumberFormat("en-IN").format(n ?? 0);
// const fmtCur = (n) => `₹${fmt(n)}`;
// const fmtDec = (d) => parseFloat(d?.$numberDecimal ?? d ?? 0);
// const fmtDate = (d) => new Date(d).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
// const fmtShort = (d) => new Date(d).toLocaleDateString("en-IN", { day: "2-digit", month: "short" });
// const fmtTime = (d) => new Date(d).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" });
// const isoDate = (d) => new Date(d).toISOString().slice(0, 10);

// // ─── Dashboard Header ─────────────────────────────────────────────
// function DashboardHeader({ user, inrBalance, totalTokens, tokenPrice }) {
//   const firstName = user?.name || "User";
  
//   return (
//     <div className="bg-slate-900 rounded-3xl p-6 shadow-xl relative overflow-hidden">
//       {/* Background pattern */}
//       <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/20 to-purple-700/20 z-0"></div>
//       <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-gradient-to-br from-indigo-500/10 to-purple-600/10 rounded-full blur-3xl"></div>
      
//       <div className="relative z-10 flex flex-col md:flex-row justify-between gap-6">
//         <div>
//           <div className="flex items-center gap-3 mb-4">
//             <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg">
//               <User size={24} className="text-white" />
//             </div>
//             <div>
//               <p className="text-indigo-300 text-sm font-medium">Welcome back</p>
//               <h1 className="text-2xl font-bold text-white">{firstName}</h1>
//               {user.username && (
//                 <p className="text-indigo-200 text-sm mt-0.5">ID: {user.username}</p>
//               )}
//             </div>
//           </div>
          
//           <div className="flex items-center gap-2 text-indigo-200 text-sm">
//             <Calendar size={14} />
//             <span>{new Date().toLocaleDateString("en-IN", { 
//               weekday: 'long', 
//               day: "numeric", 
//               month: "long", 
//               year: "numeric" 
//             })}</span>
//           </div>
//         </div>
        
//         <div className="flex flex-col sm:flex-row gap-4">
//           <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 flex-1 min-w-[170px] backdrop-saturate-150">
//             <div className="flex items-center gap-3">
//               <div className="w-10 h-10 bg-indigo-500/20 rounded-xl flex items-center justify-center">
//                 <Wallet size={20} className="text-indigo-300" />
//               </div>
//               <div>
//                 <p className="text-indigo-200 text-xs">INR Balance</p>
//                 <p className="text-white text-xl font-bold">{fmtCur(user.Inr || 0)}</p>
//               </div>
//             </div>
//           </div>
          
//           <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 flex-1 min-w-[170px] backdrop-saturate-150">
//             <div className="flex items-center gap-3">
//               <div className="w-10 h-10 bg-purple-500/20 rounded-xl flex items-center justify-center">
//                 <Coins size={20} className="text-purple-300" />
//               </div>
//               <div>
//                 <p className="text-purple-200 text-xs">Total Tokens</p>
//                 <p className="text-white text-xl font-bold">{fmt(user.tokens || 0)}</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// // ─── Stats Card ───────────────────────────────────────────────────
// function StatCard({ title, value, subValue, icon: Icon, color, bgColor, animation }) {
//   return (
//     <div className={`bg-white dark:bg-slate-800 rounded-3xl p-5 shadow-md hover:shadow-lg transition-all duration-300 border border-slate-100 dark:border-slate-700 ${animation}`}>
//       <div className="flex items-center gap-4">
//         <div className={`w-12 h-12 rounded-2xl ${bgColor} flex items-center justify-center`}>
//           <Icon size={22} className={color} />
//         </div>
//         <div className="flex-1">
//           <p className="text-slate-500 dark:text-slate-400 text-xs font-medium">{title}</p>
//           <p className="text-slate-900 dark:text-white text-2xl font-bold">{value}</p>
//           {subValue && <p className="text-slate-500 dark:text-slate-400 text-xs mt-0.5">{subValue}</p>}
//         </div>
//       </div>
//     </div>
//   );
// }

// // ─── Wallet Card ───────────────────────────────────────────────────
// function WalletCard({ address, onCopy, copied }) {
//   return (
//     <div className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 rounded-3xl p-5 shadow-md border border-slate-200 dark:border-slate-700">
//       <div className="flex flex-col md:flex-row md:items-center gap-4">
//         <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-md">
//           <CreditCard size={22} className="text-white" />
//         </div>
//         <div className="flex-1 min-w-0">
//           <p className="text-slate-500 dark:text-slate-400 text-xs font-medium mb-1">Wallet Address</p>
//           <p className="font-mono text-sm font-semibold text-slate-700 dark:text-slate-200 break-all">{address}</p>
//         </div>
//         <button onClick={onCopy}
//           className="flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white rounded-xl px-4 py-3 text-sm font-semibold transition-all shadow-md hover:shadow-lg whitespace-nowrap">
//           {copied ? <Check size={16} /> : <Copy size={16} />}
//           {copied ? "Copied!" : "Copy"}
//         </button>
//       </div>
//     </div>
//   );
// }

// // ─── Round Status Card ────────────────────────────────────────────
// function RoundStatusCard({ rounds }) {
//   const activeRound = rounds.find(r => r.status === 1) || {};
  
//   return (
//     <div className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 rounded-3xl p-6 shadow-md border border-slate-200 dark:border-slate-700">
//       <div className="flex items-center gap-4 mb-6">
//         <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-md">
//           <Gem size={22} className="text-white" />
//         </div>
//         <div>
//           <h3 className="text-lg font-bold text-slate-800 dark:text-white">Current Token Round</h3>
//           <p className="text-slate-500 dark:text-slate-400 text-sm">Price: {fmtCur(activeRound.atPriceInr || 0)} per token</p>
//         </div>
//       </div>
      
//       <div className="space-y-5">
//         {rounds.map((round) => {
//           const status = round.status;
//           const soldPercentage = (round.soldQty / round.totalQty) * 100;
          
//           return (
//             <div key={round._id} className="relative">
//               <div className="flex justify-between items-center mb-2">
//                 <div className="flex items-center gap-2">
//                   <div className={`w-8 h-8 rounded-lg flex items-center justify-center shadow-sm ${
//                     status === 2 ? "bg-emerald-500 text-white" : 
//                     status === 1 ? "bg-blue-500 text-white" : 
//                     "bg-slate-300 dark:bg-slate-700 text-slate-600 dark:text-slate-400"
//                   }`}>
//                     {round.round}
//                   </div>
//                   <div>
//                     <p className="font-semibold text-slate-800 dark:text-white">Round {round.round}</p>
//                     <p className="text-xs text-slate-500 dark:text-slate-400">{fmtCur(round.atPriceInr)}</p>
//                   </div>
//                 </div>
                
//                 <div className={`px-3 py-1 rounded-full text-xs font-medium ${
//                   status === 2 ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400" : 
//                   status === 1 ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400" : 
//                   "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400"
//                 }`}>
//                   {status === 1 && <span className="inline-block w-2 h-2 bg-blue-500 rounded-full mr-1 animate-pulse"></span>}
//                   {status === 2 ? "Completed" : status === 1 ? "Active" : "Upcoming"}
//                 </div>
//               </div>
              
//               {status !== 0 && (
//                 <>
//                   <div className="h-2 w-full bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
//                     <div 
//                       className={`h-full ${
//                         status === 2 ? "bg-emerald-500" : "bg-blue-500"
//                       }`}
//                       style={{ width: `${Math.min(soldPercentage, 100)}%` }}
//                     ></div>
//                   </div>
                  
//                   <div className="flex justify-between mt-1 text-xs">
//                     <span className="text-slate-500 dark:text-slate-400">{fmt(round.soldQty)} sold</span>
//                     <span className={`font-medium ${
//                       status === 2 ? "text-emerald-600 dark:text-emerald-400" : 
//                       "text-blue-600 dark:text-blue-400"
//                     }`}>
//                       {soldPercentage.toFixed(1)}%
//                     </span>
//                     <span className="text-slate-500 dark:text-slate-400">{fmt(round.totalQty)} total</span>
//                   </div>
//                 </>
//               )}
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }

// // ─── Transaction Item ─────────────────────────────────────────────
// function TransactionItem({ tx }) {
//   const isCredit = tx.transactionType === "Credit";
  
//   return (
//     <div className="flex items-center gap-4 p-4 hover:bg-slate-100 dark:hover:bg-slate-800/50 rounded-2xl transition-colors">
//       <div className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 ${
//         isCredit 
//           ? "bg-gradient-to-br from-emerald-400 to-teal-500" 
//           : "bg-gradient-to-br from-rose-400 to-pink-500"
//       }`}>
//         {isCredit ? <ArrowDownCircle size={22} className="text-white" /> : <ArrowUpCircle size={22} className="text-white" />}
//       </div>
      
//       <div className="flex-1 min-w-0">
//         <p className="text-slate-800 dark:text-white font-semibold mb-1 truncate">{tx.transactionId}</p>
//         <div className="flex flex-wrap gap-x-2 gap-y-1 text-xs">
//           <span className="text-slate-500 dark:text-slate-400">{fmtDate(tx.transactionDate)}</span>
//           <span className="text-slate-500 dark:text-slate-400">{fmtTime(tx.transactionDate)}</span>
//           <span className="text-slate-600 dark:text-slate-300 font-medium">{tx.paymentMode}</span>
          
//           {tx.transactionFee > 0 && (
//             <span className="text-amber-600 dark:text-amber-400">Fee: {fmtCur(tx.transactionFee)}</span>
//           )}
          
//           {tx.utrRef && (
//             <span className="text-blue-600 dark:text-blue-400">UTR: {tx.utrRef}</span>
//           )}
//         </div>
//       </div>
      
//       <div className="flex flex-col items-end">
//         <p className={`text-lg font-bold ${
//           isCredit ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"
//         }`}>
//           {isCredit ? "+" : "−"}{fmtCur(tx.transactionAmount)}
//         </p>
        
//         <span className={`mt-1 px-2 py-0.5 rounded-full text-xs font-medium ${
//           tx.transactionStatus === "Completed" ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400" :
//           tx.transactionStatus === "Pending" ? "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400" :
//           "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400"
//         }`}>
//           {tx.transactionStatus}
//         </span>
//       </div>
//     </div>
//   );
// }

// // ─── Chart Tooltip ─────────────────────────────────────────────────
// function ChartTooltip({ active, payload, label }) {
//   if (!active || !payload?.length) return null;
  
//   return (
//     <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-lg p-3 text-xs">
//       <p className="text-slate-600 dark:text-slate-300 font-medium mb-2">{label}</p>
//       {payload.map((entry, index) => (
//         <div key={index} className="flex items-center gap-2 mb-1">
//           <span className="w-3 h-3 rounded" style={{ backgroundColor: entry.color || entry.stroke }}></span>
//           <span className="text-slate-700 dark:text-slate-200 font-semibold">
//             {entry.name}: {entry.name.includes("Amount") || entry.name.includes("Fee") || entry.name.includes("Balance") ? fmtCur(entry.value) : fmt(entry.value)}
//           </span>
//         </div>
//       ))}
//     </div>
//   );
// }

// // ─── Charts ───────────────────────────────────────────────────────
// function BalanceChart({ data }) {
//   return (
//     <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-md border border-slate-100 dark:border-slate-700">
//       <div className="flex items-center gap-3 mb-6">
//         <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center">
//           <TrendingUp size={20} className="text-white" />
//         </div>
//         <div>
//           <h3 className="text-slate-800 dark:text-white font-bold text-lg">Balance Trend</h3>
//           <p className="text-slate-500 dark:text-slate-400 text-xs">Last 15 transactions impact</p>
//         </div>
//       </div>
      
//       <div className="h-[300px]">
//         <ResponsiveContainer width="100%" height="100%">
//           <AreaChart data={data} margin={{ top: 10, right: 10, bottom: 10, left: 0 }}>
//             <defs>
//               <linearGradient id="balanceGradient" x1="0" y1="0" x2="0" y2="1">
//                 <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.3} />
//                 <stop offset="100%" stopColor="#3b82f6" stopOpacity={0} />
//               </linearGradient>
//             </defs>
//             <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
//             <XAxis 
//               dataKey="date" 
//               tick={{ fontSize: 12, fill: '#64748b' }}
//               axisLine={{ stroke: '#e2e8f0' }}
//               tickLine={{ stroke: '#e2e8f0' }}
//             />
//             <YAxis 
//               tick={{ fontSize: 12, fill: '#64748b' }}
//               axisLine={{ stroke: '#e2e8f0' }}
//               tickLine={{ stroke: '#e2e8f0' }}
//               tickFormatter={v => `₹${(v / 1000).toFixed(0)}k`}
//             />
//             <Tooltip content={<ChartTooltip />} />
//             <Area 
//               type="monotone" 
//               dataKey="balance" 
//               name="Balance" 
//               stroke="#3b82f6" 
//               strokeWidth={3} 
//               fill="url(#balanceGradient)" 
//               dot={{ r: 5, fill: "#3b82f6", strokeWidth: 2, stroke: "#fff" }}
//               activeDot={{ r: 7, stroke: "#3b82f6", strokeWidth: 2 }}
//             />
//           </AreaChart>
//         </ResponsiveContainer>
//       </div>
//     </div>
//   );
// }

// function TokenDistributionChart({ available, ordered }) {
//   const data = [
//     { name: "Available", value: available },
//     { name: "Ordered", value: ordered }
//   ];
  
//   const COLORS = ['#0ea5e9', '#8b5cf6'];
  
//   return (
//     <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-md border border-slate-100 dark:border-slate-700">
//       <div className="flex items-center gap-3 mb-6">
//         <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
//           <Hexagon size={20} className="text-white" />
//         </div>
//         <div>
//           <h3 className="text-slate-800 dark:text-white font-bold text-lg">Token Distribution</h3>
//           <p className="text-slate-500 dark:text-slate-400 text-xs">Available vs Ordered</p>
//         </div>
//       </div>
      
//       <div className="flex flex-col md:flex-row items-center">
//         <div className="w-full md:w-3/5 h-[200px]">
//           <ResponsiveContainer width="100%" height="100%">
//             <PieChart>
//               <Pie
//                 data={data}
//                 cx="50%"
//                 cy="50%"
//                 innerRadius={60}
//                 outerRadius={90}
//                 fill="#8884d8"
//                 paddingAngle={5}
//                 dataKey="value"
//               >
//                 {data.map((entry, index) => (
//                   <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                 ))}
//               </Pie>
//               <Tooltip content={<ChartTooltip />} />
//             </PieChart>
//           </ResponsiveContainer>
//         </div>
        
//         <div className="w-full md:w-2/5 flex flex-row md:flex-col gap-8 justify-center mt-6 md:mt-0">
//           <div className="text-center">
//             <div className="flex items-center justify-center gap-2 mb-2">
//               <div className="w-4 h-4 rounded bg-sky-500"></div>
//               <span className="text-slate-600 dark:text-slate-300 font-medium">Available</span>
//             </div>
//             <p className="text-2xl font-bold text-sky-600 dark:text-sky-400">{fmt(available)}</p>
//           </div>
          
//           <div className="text-center">
//             <div className="flex items-center justify-center gap-2 mb-2">
//               <div className="w-4 h-4 rounded bg-indigo-500"></div>
//               <span className="text-slate-600 dark:text-slate-300 font-medium">Ordered</span>
//             </div>
//             <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">{fmt(ordered)}</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// function WithdrawalChart({ data }) {
//   return (
//     <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-md border border-slate-100 dark:border-slate-700">
//       <div className="flex items-center gap-3 mb-6">
//         <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-rose-500 to-pink-600 flex items-center justify-center">
//           <ArrowUpCircle size={20} className="text-white" />
//         </div>
//         <div>
//           <h3 className="text-slate-800 dark:text-white font-bold text-lg">Withdrawal History</h3>
//           <p className="text-slate-500 dark:text-slate-400 text-xs">Amount, Fee & Net (Last 10)</p>
//         </div>
//       </div>
      
//       <div className="h-[300px]">
//         <ResponsiveContainer width="100%" height="100%">
//           <BarChart data={data} margin={{ top: 10, right: 10, bottom: 10, left: 0 }}>
//             <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
//             <XAxis 
//               dataKey="date" 
//               tick={{ fontSize: 12, fill: '#64748b' }}
//               axisLine={{ stroke: '#e2e8f0' }}
//               tickLine={{ stroke: '#e2e8f0' }}
//             />
//             <YAxis 
//               tick={{ fontSize: 12, fill: '#64748b' }}
//               axisLine={{ stroke: '#e2e8f0' }}
//               tickLine={{ stroke: '#e2e8f0' }}
//               tickFormatter={v => `₹${(v / 1000).toFixed(0)}k`}
//             />
//             <Tooltip content={<ChartTooltip />} />
//             <Legend wrapperStyle={{ fontSize: 12, color: '#64748b' }} />
//             <Bar dataKey="amount" name="Amount" fill="#8b5cf6" radius={[4, 4, 0, 0]} maxBarSize={30} />
//             <Bar dataKey="fee" name="Fee" fill="#f59e0b" radius={[4, 4, 0, 0]} maxBarSize={30} />
//             <Bar dataKey="net" name="Net" fill="#10b981" radius={[4, 4, 0, 0]} maxBarSize={30} />
//           </BarChart>
//         </ResponsiveContainer>
//       </div>
//     </div>
//   );
// }

// // ─── Referral Card ───────────────────────────────────────────────
// function ReferralCard({ referralId, referenceId }) {
//   const [copiedRef, setCopiedRef] = useState(false);
//   const [copiedLink, setCopiedLink] = useState(false);
  
//   const copyToClipboard = (text, setCopiedState) => {
//     navigator.clipboard?.writeText(text);
//     setCopiedState(true);
//     setTimeout(() => setCopiedState(false), 2000);
//   };
  
//   const referralLink = `https://jaimax.io/ref/${referralId}`;
  
//   return (
//     <div className="bg-gradient-to-br from-indigo-50 via-blue-50 to-indigo-50 dark:from-indigo-900/30 dark:via-blue-900/20 dark:to-indigo-900/30 rounded-3xl p-6 shadow-md border border-indigo-100 dark:border-indigo-800/30">
//       <div className="flex items-center gap-4 mb-5">
//         <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center shadow-md">
//           <Users size={22} className="text-white" />
//         </div>
//         <div>
//           <h3 className="text-slate-800 dark:text-white text-lg font-bold">Referral Program</h3>
//           <p className="text-slate-500 dark:text-slate-400 text-sm">Invite & earn rewards</p>
//         </div>
//         <div className="ml-auto bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 text-sm font-bold px-3 py-1 rounded-lg border border-indigo-200 dark:border-indigo-800/30">
//           5% Bonus
//         </div>
//       </div>
      
//       <div className="space-y-4">
//         <div className="bg-white/80 dark:bg-slate-800/60 backdrop-blur-sm rounded-2xl p-4 border border-indigo-100 dark:border-indigo-800/30">
//           <p className="text-slate-500 dark:text-slate-400 text-xs font-medium mb-2">Your Referral ID</p>
//           <div className="flex items-center justify-between">
//             <p className="font-mono text-base font-bold text-indigo-700 dark:text-indigo-300">{referralId || "N/A"}</p>
//             {referralId && (
//               <button 
//                 onClick={() => copyToClipboard(referralId, setCopiedRef)}
//                 className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 p-1.5 rounded-lg transition-colors"
//               >
//                 {copiedRef ? <Check size={18} /> : <Copy size={18} />}
//               </button>
//             )}
//           </div>
//         </div>
        
//         <div className="bg-white/80 dark:bg-slate-800/60 backdrop-blur-sm rounded-2xl p-4 border border-indigo-100 dark:border-indigo-800/30">
//           <p className="text-slate-500 dark:text-slate-400 text-xs font-medium mb-2">Reference ID</p>
//           <p className="font-mono text-base font-bold text-indigo-700 dark:text-indigo-300">
//             {referenceId || "Not available"}
//           </p>
//         </div>
        
//         <div className="bg-white/80 dark:bg-slate-800/60 backdrop-blur-sm rounded-2xl p-4 border border-indigo-100 dark:border-indigo-800/30">
//           <p className="text-slate-500 dark:text-slate-400 text-xs font-medium mb-2">Your Referral Link</p>
//           <div className="flex items-center gap-2">
//             <input 
//               type="text" 
//               value={referralId ? referralLink : "Activate your referral program"}
//               readOnly
//               className="text-sm bg-indigo-50 dark:bg-indigo-900/30 rounded-lg py-2 px-3 w-full font-medium text-indigo-700 dark:text-indigo-300 border border-indigo-100 dark:border-indigo-800/50 focus:outline-none"
//             />
//             <button 
//               onClick={() => copyToClipboard(referralLink, setCopiedLink)}
//               disabled={!referralId}
//               className={`p-2 rounded-lg ${
//                 referralId 
//                   ? 'bg-indigo-600 text-white hover:bg-indigo-700' 
//                   : 'bg-slate-300 text-slate-500 cursor-not-allowed'
//               }`}
//             >
//               {copiedLink ? <Check size={18} /> : <Share2 size={18} />}
//             </button>
//           </div>
//         </div>
//       </div>
      
//       <div className="mt-4 bg-indigo-100/70 dark:bg-indigo-900/20 rounded-2xl p-4 border border-indigo-200 dark:border-indigo-800/30">
//         <div className="flex items-center gap-3">
//           <div className="w-10 h-10 rounded-full bg-indigo-200 dark:bg-indigo-800/50 flex items-center justify-center text-indigo-700 dark:text-indigo-300">
//             <Star size={18} />
//           </div>
//           <p className="text-sm text-indigo-700 dark:text-indigo-300">
//             <span className="font-semibold">Invite friends to earn!</span> Get 5% of their investments as bonus.
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }

// // ─── Main Dashboard ───────────────────────────────────────────────
// export default function UserDashboard() {
//   const { data: apiData, isLoading, isError, refetch } = useGetDashboardDetailsQuery();
//   const [copied, setCopied] = useState(false);

//   // Set up refresh interval
//   useEffect(() => {
//     const interval = setInterval(() => {
//       refetch();
//     }, 300000); // Refresh every 5 minutes
//     return () => clearInterval(interval);
//   }, [refetch]);

//   // Extract data safely with defaults
//   const d = apiData?.data || {};
//   const u = d.userDetails || {};
//   const transactions = d.recentTransactions || [];
//   const withdrawals = d.withdrawals || [];
//   const creditTotal = d.credit?.[0]?.total || 0;
//   const rounds = d.getRounds || [];

//   // ─── ALL HOOKS MUST BE CALLED BEFORE ANY CONDITIONAL RETURNS ─────────────────
//   const totalWithdrawn = useMemo(() => 
//     withdrawals.reduce((s, w) => s + fmtDec(w.amount), 0), 
//     [withdrawals]
//   );

//   const totalFees = useMemo(() => 
//     withdrawals.reduce((s, w) => s + fmtDec(w.admin_inr_charges), 0), 
//     [withdrawals]
//   );

//   const availableTokens = useMemo(() => 
//     Math.max(0, (u.tokens || 0) ), 
//     [u.tokens]
//   );

//   const creditTransactions = useMemo(() => 
//     transactions.filter(t => t.transactionType === "Credit"), 
//     [transactions]
//   );

//   const debitTransactions = useMemo(() => 
//     transactions.filter(t => t.transactionType === "Debit"), 
//     [transactions]
//   );

//   const totalCredit = useMemo(() => 
//     creditTransactions.reduce((s, t) => s + t.transactionAmount, 0), 
//     [creditTransactions]
//   );

//   const totalDebit = useMemo(() => 
//     debitTransactions.reduce((s, t) => s + t.transactionAmount, 0), 
//     [debitTransactions]
//   );

//   const financialTrend = useMemo(() => {
//     const allDates = [...transactions, ...withdrawals.map(w => ({ transactionDate: w.created_at }))];
//     const sorted = [...allDates].sort((a, b) => 
//       new Date(a.transactionDate || a.created_at) - new Date(b.transactionDate || b.created_at)
//     );
    
//     let balance = 0;
//     return sorted.slice(-15).map((item) => {
//       const tx = transactions.find(t => t.transactionDate === item.transactionDate);
//       if (tx) {
//         balance += tx.transactionType === "Credit" ? tx.transactionAmount : -tx.transactionAmount;
//       }
//       const wd = withdrawals.find(w => w.created_at === item.created_at);
//       if (wd) balance -= fmtDec(wd.amount);
      
//       return {
//         date: fmtShort(item.transactionDate || item.created_at),
//         balance: Math.max(0, balance),
//       };
//     });
//   }, [transactions, withdrawals]);

//   const withdrawalTrend = useMemo(() => {
//     const sortedWithdrawals = [...withdrawals].sort((a, b) => 
//       new Date(a.created_at) - new Date(b.created_at)
//     );
    
//     return sortedWithdrawals
//       .slice(-10)
//       .map(w => ({
//         date: fmtShort(w.created_at),
//         amount: fmtDec(w.amount),
//         fee: fmtDec(w.admin_inr_charges),
//         net: fmtDec(w.amount) - fmtDec(w.admin_inr_charges),
//       }));
//   }, [withdrawals]);

//   const paymentModeData = useMemo(() => {
//     const map = {};
//     transactions.forEach(tx => {
//       map[tx.paymentMode] = (map[tx.paymentMode] || 0) + tx.transactionAmount;
//     });
//     const COLORS = ["#10b981", "#8b5cf6", "#f59e0b", "#ef4444", "#3b82f6", "#ec4899"];
//     return Object.entries(map).map(([name, value], i) => ({ name, value, color: COLORS[i % COLORS.length] }));
//   }, [transactions]);

//   // ─── NOW WE CAN SAFELY RETURN EARLY ───────────────────────────────────────────
//   if (isLoading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center">
//         <div className="flex flex-col items-center gap-4">
//           <Loader2 size={45} className="text-indigo-600 dark:text-indigo-400 animate-spin" />
//           <p className="text-base font-medium text-slate-600 dark:text-slate-300">Loading your dashboard...</p>
//         </div>
//       </div>
//     );
//   }

//   if (isError || !apiData?.data) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center">
//         <div className="flex flex-col items-center gap-6 max-w-md mx-auto text-center">
//           <AlertCircle size={50} className="text-rose-500 dark:text-rose-400" />
//           <div>
//             <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">Connection Error</h3>
//             <p className="text-slate-600 dark:text-slate-300 mb-6">We couldn't load your dashboard information. Please try again.</p>
//             <button 
//               onClick={() => refetch()} 
//               className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl px-6 py-3 text-base font-semibold transition-all shadow-md hover:shadow-lg"
//             >
//               <RefreshCcw size={18} />
//               Refresh Dashboard
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   const copyWallet = () => {
//     navigator.clipboard?.writeText(u.walletadress);
//     setCopied(true);
//     setTimeout(() => setCopied(false), 2000);
//   };

//   // Find current active round
//   const activeRound = rounds.find(r => r.status === 1) || {};

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
//       <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8 space-y-6">
//         {/* Header section */}
//         <DashboardHeader 
//           user={u} 
//           inrBalance={u.Inr || 0}
//           totalTokens={u.tokens || 0}
//           tokenPrice={activeRound.atPriceInr || 0}
//         />
        
//         {/* Stats Cards */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
//           <StatCard 
//             title="Available Tokens" 
//             value={fmt(availableTokens)}
//             icon={Gem} 
//             color="text-white" 
//             bgColor="bg-gradient-to-br from-sky-500 to-blue-600"
//             animation="hover:-translate-y-1"
//           />
//           <StatCard 
//             title="Available Balance" 
//             value={fmt(u.Inr || 0)}
//             icon={Package} 
             
//             color="text-white" 
//             bgColor="bg-gradient-to-br from-violet-500 to-purple-600"
//             animation="hover:-translate-y-1"
//           />
//           <StatCard 
//             title="Referral Earnings" 
//             value={fmt(u.referenceInr || 0)}
//             icon={Package} 
             
//             color="text-white" 
//             bgColor="bg-gradient-to-br from-violet-500 to-purple-600"
//             animation="hover:-translate-y-1"
//           />
//           <StatCard 
//             title="Total Credits" 
//             value={fmtCur(totalCredit)}
//             subValue={`${creditTransactions.length} credits`}
//             icon={ArrowDownCircle} 
//             color="text-white" 
//             bgColor="bg-gradient-to-br from-emerald-500 to-green-600"
//             animation="hover:-translate-y-1"
//           />
//           <StatCard 
//             title="Total Withdrawn" 
//             value={fmtCur(totalWithdrawn)}
//             subValue={`${withdrawals.length} payouts`}
//             icon={ArrowUpCircle} 
//             color="text-white" 
//             bgColor="bg-gradient-to-br from-rose-500 to-pink-600"
//             animation="hover:-translate-y-1"
//           />
         
//           <StatCard 
//             title="Super Bonus" 
//             value={fmtCur(u.super_bonus || 0)}
//             icon={Star} 
//             color="text-white" 
//             bgColor="bg-gradient-to-br from-amber-400 to-yellow-600"
//             animation="hover:-translate-y-1"
//           />
//         </div>
        
       
        
//         {/* Charts */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//           {/* Balance Trend Chart */}
//           <BalanceChart data={financialTrend} />
          
//           {/* Token Distribution */}
//           <TokenDistributionChart 
//             available={availableTokens}
//             ordered={u.totalOrderedCoins || 0}
//           />
//         </div>
        
//         {/* Withdrawal History & Referral */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//           {/* Withdrawal Chart */}
//           <WithdrawalChart data={withdrawalTrend} />
          
//           {/* Referral Card */}
//           <ReferralCard 
//             referralId={u.username || ""}
//             referenceId={u.referenceId || ""}
//           />
//         </div>
        
//         {/* Transactions */}
//         <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-md border border-slate-100 dark:border-slate-700">
//           <div className="flex items-center gap-4 mb-6">
//             <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-md">
//               <Activity size={24} className="text-white" />
//             </div>
//             <div>
//               <h3 className="text-lg font-bold text-slate-800 dark:text-white">Recent Transactions</h3>
//               <p className="text-slate-500 dark:text-slate-400 text-sm">{transactions.length} total transactions</p>
//             </div>
//             <div className="ml-auto flex items-center gap-2">
//               <span className="bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 text-sm font-medium px-3 py-1 rounded-full">
//                 +{fmtCur(totalCredit)}
//               </span>
//               <span className="bg-rose-100 dark:bg-rose-900/30 text-rose-700 dark:text-rose-400 text-sm font-medium px-3 py-1 rounded-full">
//                 −{fmtCur(totalDebit)}
//               </span>
//             </div>
//           </div>
          
//           <div className="max-h-[500px] overflow-auto custom-scrollbar">
//             {transactions.length === 0 ? (
//               <div className="text-center py-12">
//                 <Activity size={40} className="mx-auto mb-3 text-slate-300 dark:text-slate-600" />
//                 <p className="text-slate-500 dark:text-slate-400">No transactions yet</p>
//               </div>
//             ) : (
//               <div className="space-y-2">
//                 {transactions.map(tx => (
//                   <TransactionItem key={tx._id} tx={tx} />
//                 ))}
//               </div>
//             )}
//           </div>
//         </div>
        
//         {/* Account Info */}
//         <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-md border border-slate-100 dark:border-slate-700">
//           <div className="flex items-center gap-4 mb-6">
//             <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-slate-600 to-slate-800 flex items-center justify-center shadow-md">
//               <User size={24} className="text-white" />
//             </div>
//             <div>
//               <h3 className="text-lg font-bold text-slate-800 dark:text-white">Account Information</h3>
//               <p className="text-slate-500 dark:text-slate-400 text-sm">Member since {u.createdAt ? fmtDate(u.createdAt) : "N/A"}</p>
//             </div>
//           </div>
          
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
//             {[
//               { 
//                 label: "KYC Status", 
//                 value: u.isVerified ? "Verified" : "Pending", 
//                 icon: CheckCircle,
//                 color: u.isVerified ? "text-emerald-600 dark:text-emerald-400" : "text-amber-600 dark:text-amber-400",
//                 bg: u.isVerified ? "bg-emerald-50 dark:bg-emerald-900/30" : "bg-amber-50 dark:bg-amber-900/30"
//               },
//               { 
//                 label: "2FA Status", 
//                 value: u.twoFactorEnabled ? "Enabled" : "Disabled", 
//                 icon: Shield,
//                 color: u.twoFactorEnabled ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400",
//                 bg: u.twoFactorEnabled ? "bg-emerald-50 dark:bg-emerald-900/30" : "bg-rose-50 dark:bg-rose-900/30"
//               },
//               { 
//                 label: "Account Status", 
//                 value: u.isActive ? "Active" : "Inactive", 
//                 icon: Activity,
//                 color: u.isActive ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400",
//                 bg: u.isActive ? "bg-emerald-50 dark:bg-emerald-900/30" : "bg-rose-50 dark:bg-rose-900/30"
//               },
//               { 
//                 label: "Account Lock", 
//                 value: u.accountLocked ? "Locked" : "Unlocked", 
//                 icon: Lock,
//                 color: !u.accountLocked ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400",
//                 bg: !u.accountLocked ? "bg-emerald-50 dark:bg-emerald-900/30" : "bg-rose-50 dark:bg-rose-900/30"
//               },
//               { 
//                 label: "Failed Logins", 
//                 value: u.failedLoginAttempts || 0, 
//                 icon: AlertCircle,
//                 color: (u.failedLoginAttempts || 0) === 0 ? "text-emerald-600 dark:text-emerald-400" : "text-amber-600 dark:text-amber-400",
//                 bg: (u.failedLoginAttempts || 0) === 0 ? "bg-emerald-50 dark:bg-emerald-900/30" : "bg-amber-50 dark:bg-amber-900/30"
//               },
//               { 
//                 label: "Last Updated", 
//                 value: u.updatedAt ? fmtShort(u.updatedAt) : "N/A", 
//                 icon: Calendar,
//                 color: "text-blue-600 dark:text-blue-400",
//                 bg: "bg-blue-50 dark:bg-blue-900/30"
//               },
//             ].map(item => (
//               <div key={item.label} className="bg-slate-50 dark:bg-slate-700/30 rounded-xl p-4 border border-slate-100 dark:border-slate-700">
//                 <div className="flex items-center justify-between mb-2">
//                   <p className="text-xs font-medium text-slate-500 dark:text-slate-400">{item.label}</p>
//                   <item.icon size={16} className={item.color} />
//                 </div>
//                 <div className={`inline-block px-3 py-1 rounded-lg ${item.bg} ${item.color} font-medium`}>
//                   {item.value}
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
        
//         {/* Footer */}
//         <div className="text-center py-4">
//           <p className="text-xs text-slate-500 dark:text-slate-400">
//             JAIMAX Dashboard · Last updated {u.updatedAt ? `${fmtDate(u.updatedAt)} at ${fmtTime(u.updatedAt)}` : "N/A"}
//           </p>
//         </div>
//       </div>

//       <style jsx>{`
//         .custom-scrollbar::-webkit-scrollbar {
//           width: 6px;
//           height: 6px;
//         }
//         .custom-scrollbar::-webkit-scrollbar-track {
//           background: rgba(241, 245, 249, 0.5);
//           border-radius: 10px;
//         }
//         .custom-scrollbar::-webkit-scrollbar-thumb {
//           background: rgba(203, 213, 225, 0.8);
//           border-radius: 10px;
//         }
//         .custom-scrollbar::-webkit-scrollbar-thumb:hover {
//           background: rgba(148, 163, 184, 0.8);
//         }
//       `}</style>
//     </div>
//   );
// }



import { useState, useMemo, useEffect } from "react";
import {
  Coins, Wallet, Package, ArrowUpCircle, ArrowDownCircle,
  TrendingUp, ArrowUp, ArrowDown, User, Mail, Phone,
  Shield, CheckCircle, Globe, Copy, Check, Activity,
  CreditCard, Hash, Loader2, AlertCircle, Lock, Calendar,
  ChevronLeft, ChevronRight, Download, Sparkles, Star,
  Link, Users, Share2, RefreshCcw, Hexagon, Layers, Gem,
  Clock, DollarSign, Zap
} from "lucide-react";
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, LineChart, Line
} from "recharts";
import { useGetDashboardDetailsQuery } from "./DashboardApliSlice";

// ─── Helpers ─────────────────────────────────────────────
const fmt = (n) => new Intl.NumberFormat("en-IN").format(n ?? 0);
const fmtCur = (n) => `₹${fmt(n)}`;
const fmtDec = (d) => parseFloat(d?.$numberDecimal ?? d ?? 0);
const fmtDate = (d) => new Date(d).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
const fmtShort = (d) => new Date(d).toLocaleDateString("en-IN", { day: "2-digit", month: "short" });
const fmtTime = (d) => new Date(d).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" });
const isoDate = (d) => new Date(d).toISOString().slice(0, 10);

// ─── Dashboard Header ─────────────────────────────────────────────
function DashboardHeader({ user, inrBalance, totalTokens, tokenPrice }) {
  const firstName = user?.name?.split(' ')[0] || "User";
  
  return (
    <div className="bg-slate-900 rounded-3xl p-6 shadow-xl relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/20 to-purple-700/20 z-0"></div>
      <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-gradient-to-br from-indigo-500/10 to-purple-600/10 rounded-full blur-3xl"></div>
      
      <div className="relative z-10 flex flex-col md:flex-row justify-between gap-6">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg">
              <User size={24} className="text-white" />
            </div>
            <div>
              <p className="text-indigo-300 text-sm font-medium">Welcome back</p>
              <h1 className="text-2xl font-bold text-white">{firstName}</h1>
              {user.username && (
                <p className="text-indigo-200 text-sm mt-0.5">ID: {user.username}</p>
              )}
            </div>
          </div>
          
          <div className="flex items-center gap-2 text-indigo-200 text-sm">
            <Calendar size={14} />
            <span>{new Date().toLocaleDateString("en-IN", { 
              weekday: 'long', 
              day: "numeric", 
              month: "long", 
              year: "numeric" 
            })}</span>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 flex-1 min-w-[170px] backdrop-saturate-150">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-indigo-500/20 rounded-xl flex items-center justify-center">
                <Wallet size={20} className="text-indigo-300" />
              </div>
              <div>
                <p className="text-indigo-200 text-xs">INR Balance</p>
                <p className="text-white text-xl font-bold">{fmtCur(user.Inr || 0)}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 flex-1 min-w-[170px] backdrop-saturate-150">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-500/20 rounded-xl flex items-center justify-center">
                <Coins size={20} className="text-purple-300" />
              </div>
              <div>
                <p className="text-purple-200 text-xs">Total Tokens</p>
                <p className="text-white text-xl font-bold">{fmt(user.tokens || 0)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Stats Card ───────────────────────────────────────────────────
function StatCard({ title, value, subValue, icon: Icon, color, bgColor, animation }) {
  return (
    <div className={`bg-white dark:bg-slate-800 rounded-3xl p-5 shadow-md hover:shadow-lg transition-all duration-300 border border-slate-100 dark:border-slate-700 ${animation}`}>
      <div className="flex items-center gap-4">
        <div className={`w-12 h-12 rounded-2xl ${bgColor} flex items-center justify-center`}>
          <Icon size={22} className={color} />
        </div>
        <div className="flex-1">
          <p className="text-slate-500 dark:text-slate-400 text-xs font-medium">{title}</p>
          <p className="text-slate-900 dark:text-white text-2xl font-bold">{value}</p>
          {subValue && <p className="text-slate-500 dark:text-slate-400 text-xs mt-0.5">{subValue}</p>}
        </div>
      </div>
    </div>
  );
}

// ─── Token Round Cards ───────────────────────────────────────────────
function TokenRoundCard({ round, isActive = false }) {
  const status = round.status;
  const soldPercentage = (round.soldQty / round.totalQty) * 100;
  
  // For Completed Round (status = 2)
  if (status === 2) {
    return (
      <div className={`bg-white rounded-xl p-5 text-gray-800 shadow-md border border-gray-200 transform transition-all duration-300 ${isActive ? "scale-100" : "scale-95 opacity-80"}`}>
        {/* Subtle background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-slate-50 pointer-events-none"></div>

        {/* Header */}
        <div className="relative z-10">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center border border-slate-200">
                <Coins size={20} className="text-slate-600" />
              </div>
              <div>
                <h3 className="text-gray-900 font-semibold text-lg leading-tight">Round {round.round}</h3>
                <p className="text-gray-500 text-xs font-bold">Completed</p>
              </div>
            </div>
            <div className="flex items-center">
              <span className="bg-blue-50 text-blue-700 text-xs px-3 py-1 rounded-full flex items-center gap-1.5 border border-blue-200 font-medium">
                <CheckCircle size={12} strokeWidth={2.5} />
                <span>Sold Out</span>
              </span>
            </div>
          </div>

          {/* Token info */}
          <div className="flex-1 bg-slate-50 rounded-lg border border-slate-200 p-4 mb-4">
            <div className="flex justify-between items-center py-2 border-b border-slate-200">
              <span className="text-xs text-gray-500 font-semibold">Total Supply</span>
              <span className="text-sm text-gray-800 font-semibold">{fmt(round.totalQty)}</span>
            </div>

            <div className="flex justify-between items-center py-2 border-b border-slate-200">
              <span className="text-xs text-gray-500 font-semibold">Sold Tokens</span>
              <span className="text-sm text-gray-800 font-semibold">{fmt(round.soldQty)}</span>
            </div>

            <div className="flex justify-between items-center py-2">
              <span className="text-xs text-gray-500 font-medium">Completion</span>
              <span className="text-sm text-emerald-600 font-semibold">100%</span>
            </div>

            {/* Progress bar */}
            <div className="w-full bg-slate-200 rounded-full h-1.5 my-2 overflow-hidden">
              <div className="bg-emerald-500 h-full rounded-full w-full"></div>
            </div>
          </div>

          {/* Price Information */}
          <div className="flex gap-3 mb-4">
            <div className="flex-1 bg-blue-50 rounded-lg p-3 border border-blue-100">
              <p className="text-xs text-blue-800 font-semibold mb-1">USD Price</p>
              <p className="text-base font-bold text-blue-700">${round.atPriceUsdt.toFixed(5)}</p>
            </div>
            <div className="flex-1 bg-emerald-50 rounded-lg p-3 border border-emerald-100">
              <p className="text-xs text-emerald-800 font-semibold mb-1">INR Price</p>
              <p className="text-base font-bold text-emerald-700">₹{round.atPriceInr.toFixed(5)}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  // For Active Round (status = 1)
  if (status === 1) {
    return (
      <div className={`bg-gradient-to-br from-white via-emerald-50/30 to-teal-50/50 rounded-xl p-5 text-gray-800 shadow-xl border border-emerald-200/50 backdrop-blur-sm transform transition-all duration-300 ${isActive ? "scale-100" : "scale-95 opacity-80"}`}>
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-emerald-400/10 to-transparent rounded-full -translate-y-8 translate-x-8 blur-2xl"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-teal-400/15 to-transparent rounded-full translate-y-6 -translate-x-6 blur-xl"></div>

        {/* Header with Status */}
        <div className="flex justify-between items-center mb-4 relative z-10">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center border border-emerald-200">
              <Zap size={20} className="text-emerald-600" />
            </div>
            <div>
              <h3 className="text-gray-800 font-bold text-lg">Round {round.round}</h3>
              <p className="text-emerald-600 text-xs font-bold flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse shadow-sm shadow-emerald-500/50 inline-block"></span>
                Active Now
              </p>
            </div>
          </div>
          <span className="bg-emerald-50 text-emerald-700 text-xs px-3 py-1 rounded-full border border-emerald-200 font-medium">
            Current Round
          </span>
        </div>

        {/* Main content */}
        <div className="bg-white/70 backdrop-blur-sm rounded-lg p-4 border border-emerald-100 mb-4 relative z-10">
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="bg-emerald-50 rounded-lg p-3 border border-emerald-100">
              <p className="text-xs text-emerald-800 font-semibold mb-1">INR Price</p>
              <p className="text-base font-bold text-emerald-700">₹{round.atPriceInr.toFixed(5)}</p>
            </div>
            <div className="bg-blue-50 rounded-lg p-3 border border-blue-100">
              <p className="text-xs text-blue-800 font-semibold mb-1">USD Price</p>
              <p className="text-base font-bold text-blue-700">${round.atPriceUsdt.toFixed(5)}</p>
            </div>
          </div>

          <div className="mb-4">
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm font-medium text-gray-700 flex items-center gap-1">
                <Coins size={14} className="text-emerald-600" />
                Sold Tokens
              </span>
              <span className="text-sm font-bold text-emerald-700">{soldPercentage.toFixed(1)}%</span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
              <div 
                className="bg-emerald-500 h-full rounded-full relative"
                style={{ width: `${soldPercentage}%` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-slate-50 rounded-lg p-3 border border-slate-200">
              <p className="text-xs text-slate-600 font-medium">Total Supply</p>
              <p className="text-base font-bold text-slate-800">{fmt(round.totalQty)}</p>
            </div>
            <div className="bg-slate-50 rounded-lg p-3 border border-slate-200">
              <p className="text-xs text-slate-600 font-medium">Remaining</p>
              <p className="text-base font-bold text-slate-800">{fmt(round.remaingQty)}</p>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="flex justify-center relative z-10">
          <button className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white text-sm font-bold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all flex items-center gap-2">
            <DollarSign size={16} />
            Buy Tokens Now
          </button>
        </div>
      </div>
    );
  }
  
  // For Upcoming Round (status = 0)
  return (
    <div className={`bg-white rounded-xl p-5 text-gray-800 shadow-xl border border-amber-100 transform transition-all duration-300 ${isActive ? "scale-100" : "scale-95 opacity-80"}`}>
      <div className="absolute inset-0 bg-gradient-to-br from-amber-50/30 to-orange-50/20 pointer-events-none"></div>
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-amber-400/20 to-transparent rounded-full -translate-y-8 translate-x-8 blur-2xl"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-orange-400/15 to-transparent rounded-full translate-y-6 -translate-x-6 blur-xl"></div>

      <div className="relative z-10">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center border border-amber-200">
              <Clock size={20} className="text-amber-600" />
            </div>
            <div>
              <h3 className="text-gray-900 font-semibold text-lg">Round {round.round}</h3>
              <p className="text-amber-600 text-xs font-bold flex items-center gap-1">
                <Clock size={10} className="text-amber-500" />
                Upcoming
              </p>
            </div>
          </div>
          <span className="bg-amber-50 text-amber-700 text-xs px-3 py-1 rounded-full border border-amber-200 font-medium">
            Future Round
          </span>
        </div>

        {/* Main Content */}
        <div className="mb-4 bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-amber-100">
          <div className="text-center mb-4">
            <p className="text-sm text-gray-600 mb-2">Expected Release</p>
            <div className="inline-block bg-amber-100 rounded-xl px-4 py-2">
              <p className="text-lg font-bold text-amber-800">Coming Soon</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-blue-50 rounded-lg p-3 border border-blue-100">
              <p className="text-xs text-blue-800 font-semibold mb-1">USD Price</p>
              <p className="text-base font-bold text-blue-700">${round.atPriceUsdt.toFixed(5)}</p>
            </div>
            <div className="bg-emerald-50 rounded-lg p-3 border border-emerald-100">
              <p className="text-xs text-emerald-800 font-semibold mb-1">INR Price</p>
              <p className="text-base font-bold text-emerald-700">₹{round.atPriceInr.toFixed(5)}</p>
            </div>
          </div>
        </div>

        <div className="mb-4">
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm font-medium text-gray-700">Total Supply</span>
            <span className="text-sm font-bold text-gray-800">{fmt(round.totalQty)}</span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
            <div className="bg-amber-300 h-full rounded-full w-0 relative">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Chart Tooltip ─────────────────────────────────────────────────
function ChartTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  
  return (
    <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-lg p-3 text-xs">
      <p className="text-slate-600 dark:text-slate-300 font-medium mb-2">{label}</p>
      {payload.map((entry, index) => (
        <div key={index} className="flex items-center gap-2 mb-1">
          <span className="w-3 h-3 rounded" style={{ backgroundColor: entry.color || entry.stroke }}></span>
          <span className="text-slate-700 dark:text-slate-200 font-semibold">
            {entry.name}: {entry.name.includes("Amount") || entry.name.includes("Fee") || entry.name.includes("Balance") ? fmtCur(entry.value) : fmt(entry.value)}
          </span>
        </div>
      ))}
    </div>
  );
}

// ─── Main Dashboard ───────────────────────────────────────────────
export default function UserDashboard() {
  const { data: apiData, isLoading, isError, refetch } = useGetDashboardDetailsQuery();
  const [copied, setCopied] = useState(false);
  const [activeRoundIndex, setActiveRoundIndex] = useState(0);

  // Extract data safely with defaults
  const d = apiData?.data || {};
  const u = d.userDetails || {};
  const transactions = d.recentTransactions || [];
  const withdrawals = d.withdrawals || [];
  const creditTotal = d.credit?.[0]?.total || 0;
  const rounds = d.getRounds || [];

  // ─── ALL HOOKS MUST BE CALLED BEFORE ANY CONDITIONAL RETURNS ─────────────────
  const totalWithdrawn = useMemo(() => 
    withdrawals.reduce((s, w) => s + fmtDec(w.amount), 0), 
    [withdrawals]
  );

  const totalFees = useMemo(() => 
    withdrawals.reduce((s, w) => s + fmtDec(w.admin_inr_charges), 0), 
    [withdrawals]
  );

  const availableTokens = useMemo(() => 
    Math.max(0, (u.tokens || 0) ), 
    [u.tokens]
  );

  const creditTransactions = useMemo(() => 
    transactions.filter(t => t.transactionType === "Credit"), 
    [transactions]
  );

  const debitTransactions = useMemo(() => 
    transactions.filter(t => t.transactionType === "Debit"), 
    [transactions]
  );

  const totalCredit = useMemo(() => 
    creditTransactions.reduce((s, t) => s + t.transactionAmount, 0), 
    [creditTransactions]
  );

  const totalDebit = useMemo(() => 
    debitTransactions.reduce((s, t) => s + t.transactionAmount, 0), 
    [debitTransactions]
  );

  // Find active round
  useEffect(() => {
    if (rounds.length > 0) {
      const activeIndex = rounds.findIndex(round => round.status === 1);
      if (activeIndex !== -1) {
        setActiveRoundIndex(activeIndex);
      }
    }
  }, [rounds]);

  const financialTrend = useMemo(() => {
    const allDates = [...transactions, ...withdrawals.map(w => ({ transactionDate: w.created_at }))];
    const sorted = [...allDates].sort((a, b) => 
      new Date(a.transactionDate || a.created_at) - new Date(b.transactionDate || b.created_at)
    );
    
    let balance = 0;
    return sorted.slice(-15).map((item) => {
      const tx = transactions.find(t => t.transactionDate === item.transactionDate);
      if (tx) {
        balance += tx.transactionType === "Credit" ? tx.transactionAmount : -tx.transactionAmount;
      }
      const wd = withdrawals.find(w => w.created_at === item.created_at);
      if (wd) balance -= fmtDec(wd.amount);
      
      return {
        date: fmtShort(item.transactionDate || item.created_at),
        balance: Math.max(0, balance),
      };
    });
  }, [transactions, withdrawals]);

  const withdrawalTrend = useMemo(() => {
    const sortedWithdrawals = [...withdrawals].sort((a, b) => 
      new Date(a.created_at) - new Date(b.created_at)
    );
    
    return sortedWithdrawals
      .slice(-10)
      .map(w => ({
        date: fmtShort(w.created_at),
        amount: fmtDec(w.amount),
        fee: fmtDec(w.admin_inr_charges),
        net: fmtDec(w.amount) - fmtDec(w.admin_inr_charges),
      }));
  }, [withdrawals]);

  // ─── NOW WE CAN SAFELY RETURN EARLY ───────────────────────────────────────────
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 size={45} className="text-indigo-600 dark:text-indigo-400 animate-spin" />
          <p className="text-base font-medium text-slate-600 dark:text-slate-300">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (isError || !apiData?.data) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center">
        <div className="flex flex-col items-center gap-6 max-w-md mx-auto text-center">
          <AlertCircle size={50} className="text-rose-500 dark:text-rose-400" />
          <div>
            <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">Connection Error</h3>
            <p className="text-slate-600 dark:text-slate-300 mb-6">We couldn't load your dashboard information. Please try again.</p>
            <button 
              onClick={() => refetch()} 
              className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl px-6 py-3 text-base font-semibold transition-all shadow-md hover:shadow-lg"
            >
              <RefreshCcw size={18} />
              Refresh Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  const copyWallet = () => {
    navigator.clipboard?.writeText(u.walletadress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const navigateRound = (direction) => {
    if (direction === 'prev') {
      setActiveRoundIndex((prev) => (prev === 0 ? rounds.length - 1 : prev - 1));
    } else {
      setActiveRoundIndex((prev) => (prev === rounds.length - 1 ? 0 : prev + 1));
    }
  };

  const activeRound = rounds.find(r => r.status === 1) || {};

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8 space-y-6">
        {/* Header section */}
        <DashboardHeader 
          user={u} 
          inrBalance={u.Inr || 0}
          totalTokens={u.tokens || 0}
          tokenPrice={activeRound.atPriceInr || 0}
        />
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          <StatCard 
            title="Available Tokens" 
            value={fmt(availableTokens)}
            icon={Gem} 
            color="text-white" 
            bgColor="bg-gradient-to-br from-sky-500 to-blue-600"
            animation="hover:-translate-y-1"
          />
          <StatCard 
            title="Available Balance" 
            value={fmtCur(u.Inr || 0)}
            icon={Wallet} 
            color="text-white" 
            bgColor="bg-gradient-to-br from-violet-500 to-purple-600"
            animation="hover:-translate-y-1"
          />
          <StatCard 
            title="Referral Earnings" 
            value={fmtCur(u.referenceInr || 0)}
            icon={Users} 
            color="text-white" 
            bgColor="bg-gradient-to-br from-violet-500 to-purple-600"
            animation="hover:-translate-y-1"
          />
          <StatCard 
            title="Total Credits" 
            value={fmtCur(totalCredit)}
            subValue={`${creditTransactions.length} credits`}
            icon={ArrowDownCircle} 
            color="text-white" 
            bgColor="bg-gradient-to-br from-emerald-500 to-green-600"
            animation="hover:-translate-y-1"
          />
          <StatCard 
            title="Total Withdrawn" 
            value={fmtCur(totalWithdrawn)}
            subValue={`${withdrawals.length} payouts`}
            icon={ArrowUpCircle} 
            color="text-white" 
            bgColor="bg-gradient-to-br from-rose-500 to-pink-600"
            animation="hover:-translate-y-1"
          />
         
          <StatCard 
            title="Super Bonus" 
            value={fmtCur(u.super_bonus || 0)}
            icon={Star} 
            color="text-white" 
            bgColor="bg-gradient-to-br from-amber-400 to-yellow-600"
            animation="hover:-translate-y-1"
          />
        </div>

        {/* ICO Rounds Section */}
        {rounds.length > 0 && (
          <div className="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-800 dark:via-slate-900/50 dark:to-indigo-900/20 rounded-3xl shadow-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
            <div className="bg-gradient-to-r from-slate-800 to-indigo-900 text-white p-4 flex justify-between items-center">
              <h2 className="text-lg font-bold flex items-center gap-2">
                <Zap size={20} className="text-yellow-400" />
                JAIMAX Token Sale
              </h2>
              
              <div className="flex gap-2">
                <button className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1 font-medium">
                  <Coins size={14} />
                  Buy Tokens
                </button>
                <button className="bg-blue-600 hover:bg-blue-700 text-white text-xs px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1 font-medium">
                  <Wallet size={14} />
                  Deposit
                </button>
              </div>
            </div>

            {/* Round Navigation */}
            <div className="flex justify-center py-4">
              <div className="flex gap-2">
                {rounds.map((round, index) => {
                  let bgColor, textColor, icon;
                  
                  if (round.status === 2) { // Completed
                    bgColor = activeRoundIndex === index 
                      ? "bg-blue-600 text-white" 
                      : "bg-blue-50 text-blue-700 hover:bg-blue-100";
                    icon = <CheckCircle size={12} />;
                  } else if (round.status === 1) { // Active
                    bgColor = activeRoundIndex === index 
                      ? "bg-emerald-600 text-white" 
                      : "bg-emerald-50 text-emerald-700 hover:bg-emerald-100";
                    icon = <Zap size={12} />;
                  } else { // Upcoming
                    bgColor = activeRoundIndex === index 
                      ? "bg-amber-600 text-white" 
                      : "bg-amber-50 text-amber-700 hover:bg-amber-100";
                    icon = <Clock size={12} />;
                  }
                  
                  return (
                    <button 
                      key={round._id || index} 
                      onClick={() => setActiveRoundIndex(index)}
                      className={`${bgColor} px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1 transition-colors border border-slate-200 shadow-sm`}
                    >
                      {icon}
                      Round {round.round}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Round Display */}
            <div className="relative p-4">
              {/* Navigation Arrows */}
              <button 
                onClick={() => navigateRound('prev')} 
                className="absolute top-1/2 -translate-y-1/2 left-2 z-10 bg-white/80 dark:bg-slate-800/80 text-slate-700 dark:text-slate-200 rounded-full p-2 shadow-md hover:bg-white dark:hover:bg-slate-700 transition-colors"
              >
                <ChevronLeft size={20} />
              </button>
              
              <div className="px-12">
                <TokenRoundCard round={rounds[activeRoundIndex]} isActive={true} />
              </div>
              
              <button 
                onClick={() => navigateRound('next')} 
                className="absolute top-1/2 -translate-y-1/2 right-2 z-10 bg-white/80 dark:bg-slate-800/80 text-slate-700 dark:text-slate-200 rounded-full p-2 shadow-md hover:bg-white dark:hover:bg-slate-700 transition-colors"
              >
                <ChevronRight size={20} />
              </button>
            </div>
            
            {/* Pagination Dots */}
            <div className="flex justify-center items-center gap-2 pb-4">
              {rounds.map((round, index) => {
                // Determine dot color based on round status
                let dotClass;
                if (round.status === 2) {
                  dotClass = activeRoundIndex === index 
                    ? "bg-blue-600" 
                    : "bg-blue-200 hover:bg-blue-300";
                } else if (round.status === 1) {
                  dotClass = activeRoundIndex === index 
                    ? "bg-emerald-600" 
                    : "bg-emerald-200 hover:bg-emerald-300";
                } else {
                  dotClass = activeRoundIndex === index 
                    ? "bg-amber-600" 
                    : "bg-amber-200 hover:bg-amber-300";
                }
                
                return (
                  <button
                    key={round._id || index}
                    onClick={() => setActiveRoundIndex(index)}
                    className={`rounded-full transition-all duration-300 ${
                      activeRoundIndex === index
                        ? `${dotClass} w-6 h-2`
                        : `${dotClass} w-2 h-2 hover:scale-125`
                    }`}
                    aria-label={`View round ${round.round}`}
                  />
                );
              })}
            </div>
          </div>
        )}
        
        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Balance Trend Chart */}
          <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-md border border-slate-100 dark:border-slate-700">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center">
                <TrendingUp size={20} className="text-white" />
              </div>
              <div>
                <h3 className="text-slate-800 dark:text-white font-bold text-lg">Balance Trend</h3>
                <p className="text-slate-500 dark:text-slate-400 text-xs">Last 15 transactions impact</p>
              </div>
            </div>
            
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={financialTrend} margin={{ top: 10, right: 10, bottom: 10, left: 0 }}>
                  <defs>
                    <linearGradient id="balanceGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.3} />
                      <stop offset="100%" stopColor="#3b82f6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis 
                    dataKey="date" 
                    tick={{ fontSize: 12, fill: '#64748b' }}
                    axisLine={{ stroke: '#e2e8f0' }}
                    tickLine={{ stroke: '#e2e8f0' }}
                  />
                  <YAxis 
                    tick={{ fontSize: 12, fill: '#64748b' }}
                    axisLine={{ stroke: '#e2e8f0' }}
                    tickLine={{ stroke: '#e2e8f0' }}
                    tickFormatter={v => `₹${(v / 1000).toFixed(0)}k`}
                  />
                  <Tooltip content={<ChartTooltip />} />
                  <Area 
                    type="monotone" 
                    dataKey="balance" 
                    name="Balance" 
                    stroke="#3b82f6" 
                    strokeWidth={3} 
                    fill="url(#balanceGradient)" 
                    dot={{ r: 5, fill: "#3b82f6", strokeWidth: 2, stroke: "#fff" }}
                    activeDot={{ r: 7, stroke: "#3b82f6", strokeWidth: 2 }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          {/* Withdrawal Chart */}
          <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-md border border-slate-100 dark:border-slate-700">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-rose-500 to-pink-600 flex items-center justify-center">
                <ArrowUpCircle size={20} className="text-white" />
              </div>
              <div>
                <h3 className="text-slate-800 dark:text-white font-bold text-lg">Withdrawal History</h3>
                <p className="text-slate-500 dark:text-slate-400 text-xs">Amount, Fee & Net (Last 10)</p>
              </div>
            </div>
            
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={withdrawalTrend} margin={{ top: 10, right: 10, bottom: 10, left: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis 
                    dataKey="date" 
                    tick={{ fontSize: 12, fill: '#64748b' }}
                    axisLine={{ stroke: '#e2e8f0' }}
                    tickLine={{ stroke: '#e2e8f0' }}
                  />
                  <YAxis 
                    tick={{ fontSize: 12, fill: '#64748b' }}
                    axisLine={{ stroke: '#e2e8f0' }}
                    tickLine={{ stroke: '#e2e8f0' }}
                    tickFormatter={v => `₹${(v / 1000).toFixed(0)}k`}
                  />
                  <Tooltip content={<ChartTooltip />} />
                  <Legend wrapperStyle={{ fontSize: 12, color: '#64748b' }} />
                  <Bar dataKey="amount" name="Amount" fill="#8b5cf6" radius={[4, 4, 0, 0]} maxBarSize={30} />
                  <Bar dataKey="fee" name="Fee" fill="#f59e0b" radius={[4, 4, 0, 0]} maxBarSize={30} />
                  <Bar dataKey="net" name="Net" fill="#10b981" radius={[4, 4, 0, 0]} maxBarSize={30} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
        
        {/* Transactions */}
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-md border border-slate-100 dark:border-slate-700">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-md">
              <Activity size={24} className="text-white" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-800 dark:text-white">Recent Transactions</h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm">{transactions.length} total transactions</p>
            </div>
            <div className="ml-auto flex items-center gap-2">
              <span className="bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 text-sm font-medium px-3 py-1 rounded-full">
                +{fmtCur(totalCredit)}
              </span>
              <span className="bg-rose-100 dark:bg-rose-900/30 text-rose-700 dark:text-rose-400 text-sm font-medium px-3 py-1 rounded-full">
                −{fmtCur(totalDebit)}
              </span>
            </div>
          </div>
          
          <div className="max-h-[400px] overflow-auto custom-scrollbar">
            {transactions.length === 0 ? (
              <div className="text-center py-12">
                <Activity size={40} className="mx-auto mb-3 text-slate-300 dark:text-slate-600" />
                <p className="text-slate-500 dark:text-slate-400">No transactions yet</p>
              </div>
            ) : (
              <div className="space-y-2">
                {transactions.map(tx => (
                  <div key={tx._id} className="flex items-center gap-4 p-4 hover:bg-slate-100 dark:hover:bg-slate-800/50 rounded-2xl transition-colors">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 ${
                      tx.transactionType === "Credit" 
                        ? "bg-gradient-to-br from-emerald-400 to-teal-500" 
                        : "bg-gradient-to-br from-rose-400 to-pink-500"
                    }`}>
                      {tx.transactionType === "Credit" ? 
                        <ArrowDownCircle size={22} className="text-white" /> : 
                        <ArrowUpCircle size={22} className="text-white" />
                      }
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <p className="text-slate-800 dark:text-white font-semibold mb-1 truncate">{tx.transactionId}</p>
                      <div className="flex flex-wrap gap-x-2 gap-y-1 text-xs">
                        <span className="text-slate-500 dark:text-slate-400">{fmtDate(tx.transactionDate)}</span>
                        <span className="text-slate-500 dark:text-slate-400">{fmtTime(tx.transactionDate)}</span>
                        <span className="text-slate-600 dark:text-slate-300 font-medium">{tx.paymentMode}</span>
                        
                        {tx.transactionFee > 0 && (
                          <span className="text-amber-600 dark:text-amber-400">Fee: {fmtCur(tx.transactionFee)}</span>
                        )}
                        
                        {tx.utrRef && (
                          <span className="text-blue-600 dark:text-blue-400">UTR: {tx.utrRef}</span>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex flex-col items-end">
                      <p className={`text-lg font-bold ${
                        tx.transactionType === "Credit" ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"
                      }`}>
                        {tx.transactionType === "Credit" ? "+" : "−"}{fmtCur(tx.transactionAmount)}
                      </p>
                      
                      <span className={`mt-1 px-2 py-0.5 rounded-full text-xs font-medium ${
                        tx.transactionStatus === "Completed" ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400" :
                        tx.transactionStatus === "Pending" ? "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400" :
                        "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400"
                      }`}>
                        {tx.transactionStatus}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        
        {/* Account Info */}
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-md border border-slate-100 dark:border-slate-700">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-slate-600 to-slate-800 flex items-center justify-center shadow-md">
              <User size={24} className="text-white" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-800 dark:text-white">Account Information</h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm">Member since {u.createdAt ? fmtDate(u.createdAt) : "N/A"}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { 
                label: "KYC Status", 
                value: u.isVerified ? "Verified" : "Pending", 
                icon: CheckCircle,
                color: u.isVerified ? "text-emerald-600 dark:text-emerald-400" : "text-amber-600 dark:text-amber-400",
                bg: u.isVerified ? "bg-emerald-50 dark:bg-emerald-900/30" : "bg-amber-50 dark:bg-amber-900/30"
              },
              { 
                label: "2FA Status", 
                value: u.twoFactorEnabled ? "Enabled" : "Disabled", 
                icon: Shield,
                color: u.twoFactorEnabled ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400",
                bg: u.twoFactorEnabled ? "bg-emerald-50 dark:bg-emerald-900/30" : "bg-rose-50 dark:bg-rose-900/30"
              },
              { 
                label: "Account Status", 
                value: u.isActive ? "Active" : "Inactive", 
                icon: Activity,
                color: u.isActive ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400",
                bg: u.isActive ? "bg-emerald-50 dark:bg-emerald-900/30" : "bg-rose-50 dark:bg-rose-900/30"
              },
              { 
                label: "Account Lock", 
                value: u.accountLocked ? "Locked" : "Unlocked", 
                icon: Lock,
                color: !u.accountLocked ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400",
                bg: !u.accountLocked ? "bg-emerald-50 dark:bg-emerald-900/30" : "bg-rose-50 dark:bg-rose-900/30"
              },
              { 
                label: "Failed Logins", 
                value: u.failedLoginAttempts || 0, 
                icon: AlertCircle,
                color: (u.failedLoginAttempts || 0) === 0 ? "text-emerald-600 dark:text-emerald-400" : "text-amber-600 dark:text-amber-400",
                bg: (u.failedLoginAttempts || 0) === 0 ? "bg-emerald-50 dark:bg-emerald-900/30" : "bg-amber-50 dark:bg-amber-900/30"
              },
              { 
                label: "Last Updated", 
                value: u.updatedAt ? fmtShort(u.updatedAt) : "N/A", 
                icon: Calendar,
                color: "text-blue-600 dark:text-blue-400",
                bg: "bg-blue-50 dark:bg-blue-900/30"
              },
            ].map(item => (
              <div key={item.label} className="bg-slate-50 dark:bg-slate-700/30 rounded-xl p-4 border border-slate-100 dark:border-slate-700">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs font-medium text-slate-500 dark:text-slate-400">{item.label}</p>
                  <item.icon size={16} className={item.color} />
                </div>
                <div className={`inline-block px-3 py-1 rounded-lg ${item.bg} ${item.color} font-medium`}>
                  {item.value}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Footer */}
        <div className="text-center py-4">
          <p className="text-xs text-slate-500 dark:text-slate-400">
            JAIMAX Dashboard · Last updated {u.updatedAt ? `${fmtDate(u.updatedAt)} at ${fmtTime(u.updatedAt)}` : "N/A"}
          </p>
        </div>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
          height: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(241, 245, 249, 0.5);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(203, 213, 225, 0.8);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(148, 163, 184, 0.8);
        }
      `}</style>
    </div>
  );
}