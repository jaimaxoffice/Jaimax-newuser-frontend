// import React, { useState } from 'react';
// import { useGetStakingDashboardQuery } from './stakingApiSlice';
// import { useGetP2PHistorySellerQuery } from '../pages/p2p/p2pApiSlice';
// import StakingReward from './StakingRewards';
// import ReferralReward from './RewardsLogs';
// import { User } from 'lucide-react';
// import Loader from '../../../ReusableComponents/Loader/loader';

// const fmt = (n) =>
//   new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 }).format(n || 0);

// const fmtK = (n) => {
//   if (n >= 100000) return (n / 100000).toFixed(1) + 'L';
//   if (n >= 1000) return (n / 1000).toFixed(1) + 'K';
//   return fmt(n);
// };

// const fmtDate = (s) => {
//   if (!s) return '—';
//   return new Date(s).toLocaleDateString('en-IN', {
//     day: '2-digit',
//     month: 'short',
//     year: 'numeric',
//   });
// };

// const   = (n) =>
//   new Intl.NumberFormat('en-IN', {
//     style: 'currency',
//     currency: 'INR',
//     maximumFractionDigits: 0,
//   }).format(n || 0);

// // ─── Micro sparkline ─────────────────────────────────────────────────────────
// const Sparkline = ({ values = [3, 5, 8, 12, 18], color = '#1D9E75' }) => {
//   const max = Math.max(...values);
//   return (
//     <div style={{ display: 'flex', alignItems: 'flex-end', gap: 2, height: 28, marginTop: 6 }}>
//       {values.map((v, i) => (
//         <div
//           key={i}
//           style={{
//             flex: 1,
//             borderRadius: '2px 2px 0 0',
//             background: color,
//             opacity: 0.25 + (i / values.length) * 0.6,
//             height: `${Math.round((v / max) * 100)}%`,
//             minWidth: 5,
//             transition: 'height .4s ease',
//           }}
//         />
//       ))}
//     </div>
//   );
// };

// // ─── Status badge ─────────────────────────────────────────────────────────────
// const Badge = ({ status }) => {
//   const styles = {
//     active: { bg: '#E1F5EE', color: '#0F6E56', border: '#9FE1CB' },
//     completed: { bg: '#E6F1FB', color: '#185FA5', border: '#B5D4F4' },
//     pending: { bg: '#FAEEDA', color: '#854F0B', border: '#FAC775' },
//   };
//   const s = styles[status] || styles.pending;
//   return (
//     <span style={{
//       display: 'inline-flex', alignItems: 'center', gap: 4,
//       fontSize: 11, fontWeight: 500, padding: '3px 9px',
//       borderRadius: 100, background: s.bg, color: s.color,
//       border: `0.5px solid ${s.border}`,
//     }}>
//       {status === 'active' && (
//         <span style={{
//           width: 6, height: 6, borderRadius: '50%', background: s.color,
//           animation: 'pulse 2s infinite',
//         }} />
//       )}
//       {status}
//     </span>
//   );
// };

// // ─── Progress bar ─────────────────────────────────────────────────────────────
// const ProgressBar = ({ value }) => (
//   <div style={{ width: '100%', height: 5, background: '#E1F5EE', borderRadius: 100, overflow: 'hidden', marginTop: 6 }}>
//     <div style={{
//       height: '100%', width: `${Math.min(value, 100)}%`,
//       background: 'linear-gradient(90deg, #085358, #5DCAA5)',
//       borderRadius: 100, transition: 'width .8s cubic-bezier(.4,0,.2,1)',
//     }} />
//   </div>
// );

// // ─── Stat card ────────────────────────────────────────────────────────────────
// const StatCard = ({ label, value, sub, highlight, sparkline, icon }) => (
//   <div style={{
//     background: highlight ? '#085358' : 'white',
//     border: highlight ? 'none' : '0.5px solid #e5e7eb',
//     borderRadius: 8,
//     padding: '1rem 1.1rem',
//     position: 'relative',
//     overflow: 'hidden',
//     boxShadow: highlight
//       ? '0 4px 24px rgba(15,110,86,.22)'
//       : '0 1px 4px rgba(0,0,0,.04)',
//     transition: 'transform .18s, box-shadow .18s',
//   }}
//     onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = highlight ? '0 8px 32px rgba(15,110,86,.3)' : '0 4px 16px rgba(0,0,0,.08)'; }}
//     onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = highlight ? '0 4px 24px rgba(15,110,86,.22)' : '0 1px 4px rgba(0,0,0,.04)'; }}
//   >
//     <div style={{
//       position: 'absolute', top: -16, right: -16, width: 60, height: 60,
//       borderRadius: '50%', background: highlight ? 'rgba(255,255,255,.1)' : 'rgba(29,158,117,.06)',
//     }} />
//     <div style={{ position: 'relative', zIndex: 1 }}>
//       <div style={{ fontSize: 11, fontWeight: 500, color: highlight ? 'rgba(255,255,255,.75)' : '#9ca3af', marginBottom: 4, letterSpacing: '.04em', textTransform: 'uppercase' }}>
//         {label}
//       </div>
//       <div style={{ fontSize: 22, fontWeight: 600, color: highlight ? '#fff' : '#111827', lineHeight: 1.1, fontVariantNumeric: 'tabular-nums' }}>
//         {value}
//       </div>
//       {sub && <div style={{ fontSize: 11, color: highlight ? 'rgba(255,255,255,.6)' : '#9ca3af', marginTop: 2 }}>{sub}</div>}
//       {sparkline && <Sparkline color={highlight ? 'rgba(255,255,255,.7)' : '#085358'} values={sparkline} />}
//     </div>
//   </div>
// );

// // ─── Filter pill ──────────────────────────────────────────────────────────────
// const FilterPill = ({ label, count, active, onClick }) => (
//   <button onClick={onClick} style={{
//     display: 'inline-flex', alignItems: 'center', gap: 5,
//     fontSize: 12, fontWeight: 500, padding: '5px 13px', borderRadius: 100,
//     border: active ? 'none' : '0.5px solid #d1d5db',
//     background: active ? '#085358' : '#f9fafb',
//     color: active ? '#fff' : '#6b7280',
//     cursor: 'pointer', transition: 'all .15s', outline: 'none',
//     boxShadow: active ? '0 2px 10px rgba(15,110,86,.25)' : 'none',
//   }}>
//     {label}
//     <span style={{
//       fontSize: 10, fontWeight: 600, padding: '1px 6px', borderRadius: 100,
//       background: active ? 'rgba(255,255,255,.2)' : '#e5e7eb',
//       color: active ? '#fff' : '#6b7280',
//     }}>{count}</span>
//   </button>
// );

// // ─── Order row (desktop) ──────────────────────────────────────────────────────
// const OrderRow = ({ order, index, onView }) => (
//   <div style={{
//     background: '#fff',
//     border: '0.5px solid #e5e7eb',
//     borderRadius: 8,
//     overflow: 'hidden',
//     transition: 'border-color .15s, box-shadow .15s',
//     boxShadow: '0 1px 4px rgba(0,0,0,.04)',
//   }}
//     onMouseEnter={e => { e.currentTarget.style.borderColor = '#9FE1CB'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(15,110,86,.1)'; }}
//     onMouseLeave={e => { e.currentTarget.style.borderColor = '#e5e7eb'; e.currentTarget.style.boxShadow = '0 1px 4px rgba(0,0,0,.04)'; }}
//   >
//     <div style={{
//       display: 'flex', alignItems: 'center', justifyContent: 'space-between',
//       padding: '10px 16px',
//       background: 'linear-gradient(90deg, #f0fdf9, #ffffff)',
//       borderBottom: '0.5px solid #e5e7eb',
//     }}>
//       <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
//         <div style={{
//           width: 26, height: 26, borderRadius: '50%',
//           background: '#0F6E56', color: '#fff',
//           display: 'flex', alignItems: 'center', justifyContent: 'center',
//           fontSize: 11, fontWeight: 600,
//         }}>{index + 1}</div>
//         <span style={{ fontSize: 12, fontFamily: 'monospace', color: '#374151', letterSpacing: '.02em' }}>
//           {order.orderId}
//         </span>
//       </div>
//       <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
//         <span style={{ fontSize: 11, color: '#9ca3af' }}>
//           {fmtDate(order.startDate)} → {fmtDate(order.endDate)}
//         </span>
//         <Badge status={order.status} />
//       </div>
//     </div>

//     <div style={{
//       display: 'grid',
//       gridTemplateColumns: '1.6fr 1.4fr 1fr 1fr auto',
//       alignItems: 'center',
//     }}>
//       {[
//         { label: 'Investment', main:  (order.investedAmount), sub: `${fmt(order.tokens)} JMC` },
//         {
//           label: 'Progress',
//           custom: (
//             <div>
//               <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
//                 <span style={{ fontSize: 14, fontWeight: 600, color: '#0F6E56' }}>{order.progressPercent.toFixed(1)}%</span>
//                 <span style={{ fontSize: 11, color: '#9ca3af' }}>Day {order.disbursedDays}</span>
//               </div>
//               <ProgressBar value={order.progressPercent} />
//             </div>
//           ),
//         },
//         { label: 'Daily reward', main: `${fmt(order.dailyDisbursementStakingTokens)} JMC`, sub: `+${fmt(order.dailyReferralStakingTokens)} referral` },
//         { label: 'Days left', main: order.remainingDays, sub: 'remaining' },
//       ].map((cell, i) => (
//         <div key={i} style={{ padding: '12px 16px', borderRight: '0.5px solid #f3f4f6' }}>
//           <div style={{ fontSize: 10, color: '#9ca3af', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '.05em', marginBottom: 4 }}>{cell.label}</div>
//           {cell.custom || (
//             <>
//               <div style={{ fontSize: 14, fontWeight: 600, color: '#111827' }}>{cell.main}</div>
//               <div style={{ fontSize: 11, color: '#9ca3af', marginTop: 1 }}>{cell.sub}</div>
//             </>
//           )}
//         </div>
//       ))}
//       <div style={{ padding: '12px 16px' }}>
//         <button onClick={() => onView(order.orderId)} style={{
//           display: 'inline-flex', alignItems: 'center', gap: 5,
//           fontSize: 12, fontWeight: 500, padding: '7px 14px',
//           borderRadius: 10, border: '0.5px solid #9FE1CB',
//           background: '#E1F5EE', color: '#0F6E56',
//           cursor: 'pointer', transition: 'all .15s', whiteSpace: 'nowrap',
//         }}
//           onMouseEnter={e => { e.currentTarget.style.background = '#0F6E56'; e.currentTarget.style.color = '#fff'; }}
//           onMouseLeave={e => { e.currentTarget.style.background = '#E1F5EE'; e.currentTarget.style.color = '#0F6E56'; }}
//         >
//           View →
//         </button>
//       </div>
//     </div>
//   </div>
// );

// // ─── Order card (mobile) ──────────────────────────────────────────────────────
// const OrderCard = ({ order, index, onView }) => (
//   <div onClick={() => onView(order.orderId)} style={{
//     background: '#fff', border: '0.5px solid #e5e7eb', borderRadius: 16, overflow: 'hidden',
//     boxShadow: '0 1px 4px rgba(0,0,0,.04)', cursor: 'pointer',
//   }}>
//     <div style={{
//       display: 'flex', alignItems: 'center', justifyContent: 'space-between',
//       padding: '10px 14px', background: '#0F6E56',
//     }}>
//       <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
//         <div style={{
//           width: 26, height: 26, borderRadius: '50%', background: 'rgba(255,255,255,.2)',
//           display: 'flex', alignItems: 'center', justifyContent: 'center',
//           fontSize: 11, fontWeight: 600, color: '#fff',
//         }}>{index + 1}</div>
//         <span style={{ fontSize: 11, fontFamily: 'monospace', color: 'rgba(255,255,255,.85)' }}>
//           #{order.orderId.slice(-8)}
//         </span>
//       </div>
//       <Badge status={order.status} />
//     </div>

//     <div style={{ padding: '14px' }}>
//       <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 12 }}>
//         {[
//           { label: 'Amount', value:  (order.investedAmount) },
//           { label: 'Tokens', value: `${fmt(order.tokens)} JMC` },
//         ].map((item, i) => (
//           <div key={i} style={{ background: '#f9fafb', borderRadius: 10, padding: '8px 10px' }}>
//             <div style={{ fontSize: 10, color: '#9ca3af', marginBottom: 3, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '.04em' }}>{item.label}</div>
//             <div style={{ fontSize: 14, fontWeight: 600, color: '#111827' }}>{item.value}</div>
//           </div>
//         ))}
//       </div>

//       <div style={{ marginBottom: 12 }}>
//         <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
//           <span style={{ fontSize: 11, color: '#9ca3af' }}>Progress</span>
//           <span style={{ fontSize: 11, fontWeight: 600, color: '#0F6E56' }}>
//             {order.progressPercent.toFixed(1)}% · Day {order.disbursedDays}
//           </span>
//         </div>
//         <ProgressBar value={order.progressPercent} />
//       </div>

//       <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 12 }}>
//         {[
//           { label: 'Daily reward', value: `${fmt(order.dailyDisbursementStakingTokens)} JMC` },
//           { label: 'Days left', value: `${order.remainingDays} days` },
//         ].map((item, i) => (
//           <div key={i} style={{ border: '0.5px solid #e5e7eb', borderRadius: 10, padding: '8px 10px' }}>
//             <div style={{ fontSize: 10, color: '#9ca3af', marginBottom: 3, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '.04em' }}>{item.label}</div>
//             <div style={{ fontSize: 13, fontWeight: 600, color: '#0F6E56' }}>{item.value}</div>
//           </div>
//         ))}
//       </div>

//       <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 10, borderTop: '0.5px solid #f3f4f6' }}>
//         <span style={{ fontSize: 10, color: '#9ca3af' }}>
//           {fmtDate(order.startDate)} – {fmtDate(order.endDate)}
//         </span>
//         <span style={{
//           fontSize: 11, fontWeight: 500, color: '#0F6E56',
//           background: '#E1F5EE', padding: '4px 10px', borderRadius: 100,
//           border: '0.5px solid #9FE1CB',
//         }}>
//           View details →
//         </span>
//       </div>
//     </div>
//   </div>
// );

// // ─── Back button ─────────────────────────────────────────────────────────────
// const BackButton = ({ onBack, label }) => (
//   <button onClick={onBack} style={{
//     display: 'inline-flex', alignItems: 'center', gap: 6,
//     fontSize: 13, fontWeight: 500, padding: '7px 14px',
//     borderRadius: 10, border: '0.5px solid #e5e7eb',
//     background: '#fff', color: '#374151', cursor: 'pointer',
//     marginBottom: '1.25rem', transition: 'all .15s',
//     boxShadow: '0 1px 4px rgba(0,0,0,.04)',
//   }}
//     onMouseEnter={e => { e.currentTarget.style.borderColor = '#9FE1CB'; e.currentTarget.style.color = '#0F6E56'; }}
//     onMouseLeave={e => { e.currentTarget.style.borderColor = '#e5e7eb'; e.currentTarget.style.color = '#374151'; }}
//   >
//     ← {label}
//   </button>
// );

// // ─── Main Dashboard ────────────────────────────────────────────────────────────
// const StakingDashboard = () => {
//   const [filter, setFilter] = useState('all');
//   const [currentView, setCurrentView] = useState('dashboard');
//   const [selectedOrderId, setSelectedOrderId] = useState(null);
//   const [showInfoModal, setShowInfoModal] = useState(false);
//   const { data: response, isLoading, isError, error, refetch } = useGetStakingDashboardQuery();
//   const [activeTab, setActiveTab] = useState("staking");
//   const tradeType =
//     activeTab === "wp-staking"
//       ? "wpStaking"
//       : activeTab === "mining"
//         ? "mining"
//         : "regular";
//   const { data: getHistory, isLoading: loading } = useGetP2PHistorySellerQuery({
//     page: 1,
//     limit: 10,
//     tradeType,
//   });
//   const data = response?.success ? response.data : null;
//   console.log(getHistory, "hello")
//   // ✅ Safe wallet check
//   const hasWallet = data?.wallet && typeof data.wallet === 'object' && Object.keys(data.wallet).length > 0;

//   const handleBackToDashboard = () => { setCurrentView('dashboard'); setSelectedOrderId(null); };

//   const filteredOrders = () => {
//     if (!data?.orders) return [];
//     if (filter === 'all') return data.orders;
//     return data.orders.filter((o) => o.status === filter);
//   };

//   const countByStatus = (s) => data?.orders?.filter((o) => o.status === s).length || 0;

//   const calculateAPY = () => {
//     if (!data?.orders?.length) return '0';
//     const active = data.orders.filter((o) => o.status === 'active');
//     if (!active.length) return '0';
//     const staked = active.reduce((s, o) => s + (o.tokens || 0), 0);
//     const daily = active.reduce((s, o) => s + (o.dailyDisbursementStakingTokens || 0), 0);
//     if (!staked) return '0';
//     return ((daily / staked) * 100 * 365).toFixed(1);
//   };

//   const handleView = (orderId) => {
//     setSelectedOrderId(orderId);
//     setCurrentView('staking-rewards');
//   };

//   if (currentView === 'staking-rewards') {
//     return <StakingReward orderId={selectedOrderId} onBack={handleBackToDashboard} />;
//   }
//   if (currentView === 'referral-rewards') {
//     return <ReferralReward onBack={handleBackToDashboard} />;
//   }
//   if (currentView === 'p2p-transactions') {
//     return <P2PTransactionsView onBack={handleBackToDashboard} />;
//   }

//   if (isLoading) return <Loader />;

//   if (isError || !response?.success) {
//     return (
//       <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
//         <div style={{ textAlign: 'center', maxWidth: 320, padding: '0 1rem' }}>
//           <div style={{ width: 52, height: 52, borderRadius: '50%', background: '#FEF2F2', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px', fontSize: 24 }}>⚠️</div>
//           <div style={{ fontSize: 16, fontWeight: 600, color: '#111827', marginBottom: 6 }}>Dashboard error</div>
//           <div style={{ fontSize: 13, color: '#9ca3af', marginBottom: 16 }}>{error?.data?.message || 'Unable to load data'}</div>
//           <button onClick={refetch} style={{ padding: '8px 20px', background: '#0F6E56', color: '#fff', borderRadius: 10, border: 'none', cursor: 'pointer', fontSize: 13, fontWeight: 500 }}>Retry</button>
//         </div>
//       </div>
//     );
//   }

//   const orders = filteredOrders();

//   return (
//     <>
//       <style>{`
//         @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:.4} }
//         @keyframes fadeUp { from{opacity:0;transform:translateY(14px)} to{opacity:1;transform:none} }
//         .dash-container { animation: fadeUp .4s ease both; }
//         .order-item { animation: fadeUp .35s ease both; }
//         .show-mobile { display: none; }
//         .show-desktop { display: block; }
//         @media (max-width: 640px) {
//           .show-mobile { display: block; }
//           .show-desktop { display: none; }
//         }
//       `}</style>

//       <div className="dash-container" style={{ minHeight: '100vh', background: '#f8fafc', padding: '1.5rem 1rem' }}>
//         <div style={{ maxWidth: 1500, margin: '0 auto' }}>

//           {/* ── Header ──────────────────────────────── */}
//           {/* <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '.75rem' }}>
//             <div>
//               <h1 style={{ fontSize: 22, fontWeight: 700, color: '#111827', margin: 0, letterSpacing: '-.02em' }}>
//                 Staking Dashboard
//               </h1>
//               <p style={{ fontSize: 13, color: '#9ca3af', margin: '3px 0 0' }}>JMC token portfolio overview</p>
//             </div>
//           </div> */}
//           <>
//             <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '.75rem' }}>
//               <div>
//                 <h1 style={{ fontSize: 22, fontWeight: 700, color: '#111827', margin: 0, letterSpacing: '-.02em' }}>
//                   Staking Dashboard
//                 </h1>
//                 <p style={{ fontSize: 13, color: '#9ca3af', margin: '3px 0 0' }}>JMC token portfolio overview</p>
//               </div>

//               <button
//                 onClick={() => setShowInfoModal(true)}
//                 style={{ padding: '8px 16px', backgroundColor: '#085358', color: '#fff', border: 'none', borderRadius: '6px', fontSize: '14px', fontWeight: '600', cursor: 'pointer' }}
//               >
//                 Note
//               </button>
//             </div>

//             {showInfoModal && (
//               <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }} onClick={() => setShowInfoModal(false)}>
//                 <div style={{ backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)', padding: '2rem', maxWidth: '500px', width: '90%', maxHeight: '80vh', overflow: 'auto' }} onClick={(e) => e.stopPropagation()}>
//                   <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
//                     <h2 style={{ fontSize: 18, fontWeight: 700, color: '#111827', margin: 0 }}>Dashboard Metrics</h2>
//                     <button onClick={() => setShowInfoModal(false)} style={{ background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer', color: '#6b7280' }}>✕</button>
//                   </div>

//                   <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
//                     <div>
//                       <p style={{ fontSize: 14, fontWeight: 200, color: '#111827', margin: '0 0 0.25rem 0' }}>Total Staked :  Your staked JMC tokens</p>

//                     </div>
//                     <hr style={{ margin: '0.5rem 0', border: 'none', borderTop: '1px solid #e5e7eb' }} />

//                     <div>
//                       <p style={{ fontSize: 14, fontWeight: 200, color: '#111827', margin: '0 0 0.25rem 0' }}>Interest Earned : Combined staking + referral earnings</p>

//                     </div>
//                     <hr style={{ margin: '0.5rem 0', border: 'none', borderTop: '1px solid #e5e7eb' }} />

//                     <div>
//                       <p style={{ fontSize: 14, fontWeight: 200, color: '#111827', margin: '0 0 0.25rem 0' }}>Referral Earnings : Tokens earned from referrals</p>

//                     </div>
//                     <hr style={{ margin: '0.5rem 0', border: 'none', borderTop: '1px solid #e5e7eb' }} />

//                     <div>
//                       <p style={{ fontSize: 14, fontWeight: 200, color: '#111827', margin: '0 0 0.25rem 0' }}>Lifetime Earnings : Total tokens earned since beginning</p>

//                     </div>
//                     <hr style={{ margin: '0.5rem 0', border: 'none', borderTop: '1px solid #e5e7eb' }} />

//                     <div>
//                       <p style={{ fontSize: 14, fontWeight: 200, color: '#111827', margin: '0 0 0.25rem 0' }}>Active Orders : Running orders now</p>
//                     </div>
//                     <hr style={{ margin: '0.5rem 0', border: 'none', borderTop: '1px solid #e5e7eb' }} />

//                     <div>
//                       <p style={{ fontSize: 14, fontWeight: 200, color: '#111827', margin: '0 0 0.25rem 0' }}>Available for P2P : Earnings minus what's already sold</p>

//                     </div>
//                   </div>

//                   {/* <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1.5rem' }}>
//           <button onClick={() => setShowInfoModal(false)} style={{ padding: '8px 16px', backgroundColor: '#085358', color: '#fff', border: 'none', borderRadius: '6px', fontSize: '14px', fontWeight: '600', cursor: 'pointer' }}>Close</button>
//         </div> */}
//                 </div>
//               </div>
//             )}
//           </>
//           {/* ── Wallet Stats (Only show if wallet exists) ──────────────────────────── */}
//           {hasWallet ? (
//             <div style={{
//               display: 'grid',
//               gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
//               gap: 10,
//               marginBottom: '1.25rem',
//             }}>
//               <StatCard highlight label="Total staked" value={data.wallet.stakedTokens || 0} sub="JMC tokens" />
//               <StatCard label="Interest earned" value={data.wallet.netInterestEarned || 0} sub="Net earned" sparkline={[3, 5, 8, 12, 18]} />
//               <StatCard label="Referral earnings" value={data.wallet.totalReferralEarned || 0} sub="JMC tokens" sparkline={[2, 4, 6, 7, 9]} />
//               <StatCard label="Lifetime earnings" value={data.wallet.totalInterestEarnedLifetime || 0} sub="All time" />
//               <StatCard label="Active orders" value={data.summary.totalActiveOrders || 0} sub="Running now" />
//               <StatCard label="Sold in P2P" value={data.summary.totalSoldInP2P || 0} sub="Transferred" />
//             </div>
//           ) : (
//             <div style={{
//               // background: '#fff', border: '0.5px solid #e5e7eb', borderRadius: 8,
//               // padding: '2.5rem 1.5rem', textAlign: 'center', marginBottom: '1.25rem',
//               // boxShadow: '0 1px 4px rgba(0,0,0,.04)'
//             }}>
//               {/* <div style={{ fontSize: 36, marginBottom: 10 }}>👛</div> */}
//               {/* <div style={{ fontSize: 16, fontWeight: 600, color: '#111827', marginBottom: 6 }}>No Wallet Data</div>
//               <div style={{ fontSize: 13, color: '#9ca3af', maxWidth: 320, margin: '0 auto' }}>
//                 Your staking wallet hasn't been activated or funded yet. Create a staking order to get started.
//               </div> */}
//             </div>
//           )}

//           {/* ── Referral banner (Only show if wallet exists) ─────────────────────── */}
//           {hasWallet && (
//             <div style={{
//               display: 'flex', alignItems: 'center', justifyContent: 'space-between',
//               padding: '14px 18px', marginBottom: '1.25rem',
//               background: '#fff', border: '0.5px solid #e5e7eb', borderRadius: 8,
//               cursor: 'pointer', boxShadow: '0 1px 4px rgba(0,0,0,.04)',
//               transition: 'border-color .15s, box-shadow .15s',
//             }}
//               onMouseEnter={e => { e.currentTarget.style.borderColor = '#9FE1CB'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(15,110,86,.1)'; }}
//               onMouseLeave={e => { e.currentTarget.style.borderColor = '#e5e7eb'; e.currentTarget.style.boxShadow = '0 1px 4px rgba(0,0,0,.04)'; }}
//               onClick={() => setCurrentView('referral-rewards')}
//             >
//               <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
//                 <div style={{
//                   width: 42, height: 42, borderRadius: 12, background: '#E1F5EE',
//                   display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20,
//                 }}><User /></div>
//                 <div>
//                   <div style={{ fontSize: 11, color: '#9ca3af', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '.06em', marginBottom: 2 }}>
//                     Referral earnings
//                   </div>
//                   <div style={{ fontSize: 20, fontWeight: 700, color: '#111827' }}>
//                     {data.wallet.totalReferralEarned || 0} JMC
//                   </div>
//                 </div>
//               </div>
//               <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: '#9ca3af' }}>
//                 View logs <span style={{ fontSize: 16 }}>›</span>
//               </div>
//             </div>
//           )}

//           {/* ── Orders section ───────────────────────── */}
//           {data.orders?.length > 0 && (
//             <>
//               <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '.75rem', marginBottom: '1rem' }}>
//                 <div style={{ fontSize: 13, fontWeight: 600, color: '#374151' }}>Staking orders</div>
//                 <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
//                   {[
//                     { key: 'all', label: 'All', count: data.orders.length },
//                     { key: 'active', label: 'Active', count: countByStatus('active') },
//                     { key: 'completed', label: 'Completed', count: countByStatus('completed') },
//                     { key: 'pending', label: 'Pending', count: countByStatus('pending') },
//                   ]
//                     .filter((f) => f.key === 'all' || f.count > 0)
//                     .map((f) => (
//                       <FilterPill key={f.key} label={f.label} count={f.count} active={filter === f.key} onClick={() => setFilter(f.key)} />
//                     ))}
//                 </div>
//               </div>

//               {orders.length === 0 ? (
//                 <div style={{ textAlign: 'center', padding: '3rem 1rem', color: '#9ca3af', fontSize: 14, background: '#fff', borderRadius: 8, border: '0.5px solid #e5e7eb' }}>
//                   No {filter} orders found
//                 </div>
//               ) : (
//                 <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
//                   {orders.map((order, i) => (
//                     <div className="order-item" key={order.orderId} style={{ animationDelay: `${i * 0.06}s` }}>
//                       <div className="show-desktop"><OrderRow order={order} index={i} onView={handleView} /></div>
//                       <div className="show-mobile"><OrderCard order={order} index={i} onView={handleView} /></div>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </>
//           )}

//           {!data.orders?.length && (
//             <div style={{ textAlign: 'center', padding: '4rem 1rem', background: '#fff', borderRadius: 8, border: '0.5px solid #e5e7eb' }}>
//               <div style={{ fontSize: 16, fontWeight: 600, color: '#111827', marginBottom: 6 }}>No orders yet</div>
//               <div style={{ fontSize: 13, color: '#9ca3af' }}>Start your staking journey by creating your first order</div>
//             </div>
//           )}

//         </div>
//       </div>
//     </>
//   );
// };

// export default StakingDashboard;4


import React, { useState } from 'react';
import { useGetStakingDashboardQuery } from './stakingApiSlice';
import { useGetP2PHistorySellerQuery } from '../pages/p2p/p2pApiSlice';
import StakingReward from './StakingRewards';
import ReferralReward from './RewardsLogs';
import { User, ArrowLeftRight } from 'lucide-react';
import Loader from '../../../ReusableComponents/Loader/loader';

const fmt = (n) =>
  new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 }).format(n || 0);

const fmtK = (n) => {
  if (n >= 100000) return (n / 100000).toFixed(1) + 'L';
  if (n >= 1000) return (n / 1000).toFixed(1) + 'K';
  return fmt(n);
};

const fmtDate = (s) => {
  if (!s) return '—';
  return new Date(s).toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
};

const fmtDateTime = (s) => {
  if (!s) return '—';
  return new Date(s).toLocaleString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};



// ─── Sparkline ─────────────────────────────────────────────────────────
const Sparkline = ({ values = [3, 5, 8, 12, 18], color = '#1D9E75' }) => {
  const max = Math.max(...values);
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 2, height: 28, marginTop: 6 }}>
      {values.map((v, i) => (
        <div
          key={i}
          style={{
            flex: 1,
            borderRadius: '2px 2px 0 0',
            background: color,
            opacity: 0.25 + (i / values.length) * 0.6,
            height: `${Math.round((v / max) * 100)}%`,
            minWidth: 5,
            transition: 'height .4s ease',
          }}
        />
      ))}
    </div>
  );
};

// ─── Status badge ─────────────────────────────────────────────────────────────
const Badge = ({ status }) => {
  const styles = {
    active: { bg: '#E1F5EE', color: '#0F6E56', border: '#9FE1CB' },
    completed: { bg: '#E6F1FB', color: '#185FA5', border: '#B5D4F4' },
    COMPLETED: { bg: '#E6F1FB', color: '#185FA5', border: '#B5D4F4' },
    pending: { bg: '#FAEEDA', color: '#854F0B', border: '#FAC775' },
    PENDING: { bg: '#FAEEDA', color: '#854F0B', border: '#FAC775' },
  };
  const s = styles[status] || styles.pending;
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 4,
      fontSize: 11, fontWeight: 500, padding: '3px 9px',
      borderRadius: 100, background: s.bg, color: s.color,
      border: `0.5px solid ${s.border}`,
    }}>
      {status === 'active' && (
        <span style={{
          width: 6, height: 6, borderRadius: '50%', background: s.color,
          animation: 'pulse 2s infinite',
        }} />
      )}
      {status}
    </span>
  );
};

// ─── Progress bar ─────────────────────────────────────────────────────────────
const ProgressBar = ({ value }) => (
  <div style={{ width: '100%', height: 5, background: '#E1F5EE', borderRadius: 100, overflow: 'hidden', marginTop: 6 }}>
    <div style={{
      height: '100%', width: `${Math.min(value, 100)}%`,
      background: 'linear-gradient(90deg, #085358, #5DCAA5)',
      borderRadius: 100, transition: 'width .8s cubic-bezier(.4,0,.2,1)',
    }} />
  </div>
);

// ─── Stat card ────────────────────────────────────────────────────────────────
const StatCard = ({ label, value, sub, highlight, sparkline, icon }) => (
  <div style={{
    background: highlight ? '#085358' : 'white',
    border: highlight ? 'none' : '0.5px solid #e5e7eb',
    borderRadius: 8,
    padding: '1rem 1.1rem',
    position: 'relative',
    overflow: 'hidden',
    boxShadow: highlight
      ? '0 4px 24px rgba(15,110,86,.22)'
      : '0 1px 4px rgba(0,0,0,.04)',
    transition: 'transform .18s, box-shadow .18s',
  }}
    onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = highlight ? '0 8px 32px rgba(15,110,86,.3)' : '0 4px 16px rgba(0,0,0,.08)'; }}
    onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = highlight ? '0 4px 24px rgba(15,110,86,.22)' : '0 1px 4px rgba(0,0,0,.04)'; }}
  >
    <div style={{
      position: 'absolute', top: -16, right: -16, width: 60, height: 60,
      borderRadius: '50%', background: highlight ? 'rgba(255,255,255,.1)' : 'rgba(29,158,117,.06)',
    }} />
    <div style={{ position: 'relative', zIndex: 1 }}>
      <div style={{ fontSize: 11, fontWeight: 500, color: highlight ? 'rgba(255,255,255,.75)' : '#9ca3af', marginBottom: 4, letterSpacing: '.04em', textTransform: 'uppercase' }}>
        {label}
      </div>
      <div style={{ fontSize: 22, fontWeight: 600, color: highlight ? '#fff' : '#111827', lineHeight: 1.1, fontVariantNumeric: 'tabular-nums' }}>
        {value}
      </div>
      {sub && <div style={{ fontSize: 11, color: highlight ? 'rgba(255,255,255,.6)' : '#9ca3af', marginTop: 2 }}>{sub}</div>}
      {sparkline && <Sparkline color={highlight ? 'rgba(255,255,255,.7)' : '#085358'} values={sparkline} />}
    </div>
  </div>
);

// ─── Filter pill ──────────────────────────────────────────────────────────────
const FilterPill = ({ label, count, active, onClick }) => (
  <button onClick={onClick} style={{
    display: 'inline-flex', alignItems: 'center', gap: 5,
    fontSize: 12, fontWeight: 500, padding: '5px 13px', borderRadius: 100,
    border: active ? 'none' : '0.5px solid #d1d5db',
    background: active ? '#085358' : '#f9fafb',
    color: active ? '#fff' : '#6b7280',
    cursor: 'pointer', transition: 'all .15s', outline: 'none',
    boxShadow: active ? '0 2px 10px rgba(15,110,86,.25)' : 'none',
  }}>
    {label}
    <span style={{
      fontSize: 10, fontWeight: 600, padding: '1px 6px', borderRadius: 100,
      background: active ? 'rgba(255,255,255,.2)' : '#e5e7eb',
      color: active ? '#fff' : '#6b7280',
    }}>{count}</span>
  </button>
);

// ─── Order row (desktop) ──────────────────────────────────────────────────────
const OrderRow = ({ order, index, onView }) => (
  <div style={{
    background: '#fff',
    border: '0.5px solid #e5e7eb',
    borderRadius: 8,
    overflow: 'hidden',
    transition: 'border-color .15s, box-shadow .15s',
    boxShadow: '0 1px 4px rgba(0,0,0,.04)',
  }}
    onMouseEnter={e => { e.currentTarget.style.borderColor = '#9FE1CB'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(15,110,86,.1)'; }}
    onMouseLeave={e => { e.currentTarget.style.borderColor = '#e5e7eb'; e.currentTarget.style.boxShadow = '0 1px 4px rgba(0,0,0,.04)'; }}
  >
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '10px 16px',
      background: 'linear-gradient(90deg, #f0fdf9, #ffffff)',
      borderBottom: '0.5px solid #e5e7eb',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{
          width: 26, height: 26, borderRadius: '50%',
          background: '#0F6E56', color: '#fff',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 11, fontWeight: 600,
        }}>{index + 1}</div>
        <span style={{ fontSize: 12, fontFamily: 'monospace', color: '#374151', letterSpacing: '.02em' }}>
          {order.orderId}
        </span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <span style={{ fontSize: 11, color: '#9ca3af' }}>
          {fmtDate(order.startDate)} → {fmtDate(order.endDate)}
        </span>
        <Badge status={order.status} />
      </div>
    </div>

    <div style={{
      display: 'grid',
      gridTemplateColumns: '1.6fr 1.4fr 1fr 1fr auto',
      alignItems: 'center',
    }}>
      {[
        { label: 'Investment', main: (order.investedAmount), sub: `${fmt(order.tokens)} JMC` },
        {
          label: 'Progress',
          custom: (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: 14, fontWeight: 600, color: '#0F6E56' }}>{order.progressPercent.toFixed(1)}%</span>
                <span style={{ fontSize: 11, color: '#9ca3af' }}>Day {order.disbursedDays}</span>
              </div>
              <ProgressBar value={order.progressPercent} />
            </div>
          ),
        },
        { label: 'Daily reward', main: `${fmt(order.dailyDisbursementStakingTokens)} JMC`, sub: `+${fmt(order.dailyReferralStakingTokens)} referral` },
        { label: 'Days left', main: order.remainingDays, sub: 'remaining' },
      ].map((cell, i) => (
        <div key={i} style={{ padding: '12px 16px', borderRight: '0.5px solid #f3f4f6' }}>
          <div style={{ fontSize: 10, color: '#9ca3af', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '.05em', marginBottom: 4 }}>{cell.label}</div>
          {cell.custom || (
            <>
              <div style={{ fontSize: 14, fontWeight: 600, color: '#111827' }}>{cell.main}</div>
              <div style={{ fontSize: 11, color: '#9ca3af', marginTop: 1 }}>{cell.sub}</div>
            </>
          )}
        </div>
      ))}
      <div style={{ padding: '12px 16px' }}>
        <button onClick={() => onView(order.orderId)} style={{
          display: 'inline-flex', alignItems: 'center', gap: 5,
          fontSize: 12, fontWeight: 500, padding: '7px 14px',
          borderRadius: 10, border: '0.5px solid #9FE1CB',
          background: '#E1F5EE', color: '#0F6E56',
          cursor: 'pointer', transition: 'all .15s', whiteSpace: 'nowrap',
        }}
          onMouseEnter={e => { e.currentTarget.style.background = '#0F6E56'; e.currentTarget.style.color = '#fff'; }}
          onMouseLeave={e => { e.currentTarget.style.background = '#E1F5EE'; e.currentTarget.style.color = '#0F6E56'; }}
        >
          View →
        </button>
      </div>
    </div>
  </div>
);

// ─── Order card (mobile) ──────────────────────────────────────────────────────
const OrderCard = ({ order, index, onView }) => (
  <div onClick={() => onView(order.orderId)} style={{
    background: '#fff', border: '0.5px solid #e5e7eb', borderRadius: 16, overflow: 'hidden',
    boxShadow: '0 1px 4px rgba(0,0,0,.04)', cursor: 'pointer',
  }}>
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '10px 14px', background: '#0F6E56',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <div style={{
          width: 26, height: 26, borderRadius: '50%', background: 'rgba(255,255,255,.2)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 11, fontWeight: 600, color: '#fff',
        }}>{index + 1}</div>
        <span style={{ fontSize: 11, fontFamily: 'monospace', color: 'rgba(255,255,255,.85)' }}>
          #{order.orderId.slice(-8)}
        </span>
      </div>
      <Badge status={order.status} />
    </div>

    <div style={{ padding: '14px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 12 }}>
        {[
          { label: 'Amount', value: (order.investedAmount) },
          { label: 'Tokens', value: `${fmt(order.tokens)} JMC` },
        ].map((item, i) => (
          <div key={i} style={{ background: '#f9fafb', borderRadius: 10, padding: '8px 10px' }}>
            <div style={{ fontSize: 10, color: '#9ca3af', marginBottom: 3, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '.04em' }}>{item.label}</div>
            <div style={{ fontSize: 14, fontWeight: 600, color: '#111827' }}>{item.value}</div>
          </div>
        ))}
      </div>

      <div style={{ marginBottom: 12 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
          <span style={{ fontSize: 11, color: '#9ca3af' }}>Progress</span>
          <span style={{ fontSize: 11, fontWeight: 600, color: '#0F6E56' }}>
            {order.progressPercent.toFixed(1)}% · Day {order.disbursedDays}
          </span>
        </div>
        <ProgressBar value={order.progressPercent} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 12 }}>
        {[
          { label: 'Daily reward', value: `${fmt(order.dailyDisbursementStakingTokens)} JMC` },
          { label: 'Days left', value: `${order.remainingDays} days` },
        ].map((item, i) => (
          <div key={i} style={{ border: '0.5px solid #e5e7eb', borderRadius: 10, padding: '8px 10px' }}>
            <div style={{ fontSize: 10, color: '#9ca3af', marginBottom: 3, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '.04em' }}>{item.label}</div>
            <div style={{ fontSize: 13, fontWeight: 600, color: '#0F6E56' }}>{item.value}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 10, borderTop: '0.5px solid #f3f4f6' }}>
        <span style={{ fontSize: 10, color: '#9ca3af' }}>
          {fmtDate(order.startDate)} – {fmtDate(order.endDate)}
        </span>
        <span style={{
          fontSize: 11, fontWeight: 500, color: '#0F6E56',
          background: '#E1F5EE', padding: '4px 10px', borderRadius: 100,
          border: '0.5px solid #9FE1CB',
        }}>
          View details →
        </span>
      </div>
    </div>
  </div>
);

// ─── P2P Transaction Row (Desktop) ────────────────────────────────────────────
const P2PTransactionRow = ({ trade, index }) => (
  <div style={{
    background: '#fff',
    border: '0.5px solid #e5e7eb',
    borderRadius: 8,
    overflow: 'hidden',
    transition: 'border-color .15s, box-shadow .15s',
    boxShadow: '0 1px 4px rgba(0,0,0,.04)',
  }}
    onMouseEnter={e => { e.currentTarget.style.borderColor = '#9FE1CB'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(15,110,86,.1)'; }}
    onMouseLeave={e => { e.currentTarget.style.borderColor = '#e5e7eb'; e.currentTarget.style.boxShadow = '0 1px 4px rgba(0,0,0,.04)'; }}
  >
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '10px 16px',
      background: 'linear-gradient(90deg, #f0fdf9, #ffffff)',
      borderBottom: '0.5px solid #e5e7eb',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{
          width: 26, height: 26, borderRadius: '50%',
          background: '#0F6E56', color: '#fff',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 11, fontWeight: 600,
        }}>{index + 1}</div>
        <span style={{ fontSize: 12, fontFamily: 'monospace', color: '#374151', letterSpacing: '.02em' }}>
          #{trade.tradeId.slice(-8)}
        </span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <span style={{ fontSize: 11, color: '#9ca3af' }}>
          {fmtDateTime(trade.createdAt)}
        </span>
        <Badge status={trade.status} />
      </div>
    </div>

    <div style={{
      display: 'grid',
      gridTemplateColumns: '1.2fr 1.2fr 1fr 1fr 1fr',
      alignItems: 'center',
    }}>
      {[
        {
          label: 'Buyer',
          main: trade.buyer.username,
          sub: trade.buyer.email
        },
        {
          label: 'Total Amount',
          main: (trade.payment.totalInr),
          // sub: `@ ${ (trade.payment.pricePerCoinInr)}/coin` 
        },
        {
          label: 'You Received',
          main: (trade.payment.sellerReceivesInr),
          sub: `${trade.split.sellerSupplyPct} split`
        },
        {
          label: 'Coins Sold',
          main: fmt(trade.coins.totalCoins),
          sub: `${fmt(trade.coins.fromSeller)} from you`
        },
        {
          label: 'For Company',
          main: (trade.payment.companyReceivesInr),
          sub: `${fmt(trade.coins.fromCompany)} coins`
        },
      ].map((cell, i) => (
        <div key={i} style={{ padding: '12px 16px', borderRight: i < 4 ? '0.5px solid #f3f4f6' : 'none' }}>
          <div style={{ fontSize: 10, color: '#9ca3af', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '.05em', marginBottom: 4 }}>{cell.label}</div>
          <div style={{ fontSize: 14, fontWeight: 600, color: '#111827' }}>{cell.main}</div>
          <div style={{ fontSize: 11, color: '#9ca3af', marginTop: 1 }}>{cell.sub}</div>
        </div>
      ))}
    </div>
  </div>
);

// ─── P2P Transaction Card (Mobile) ────────────────────────────────────────────
const P2PTransactionCard = ({ trade, index }) => (
  <div style={{
    background: '#fff', border: '0.5px solid #e5e7eb', borderRadius: 16, overflow: 'hidden',
    boxShadow: '0 1px 4px rgba(0,0,0,.04)',
  }}>
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '10px 14px', background: '#0F6E56',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <div style={{
          width: 26, height: 26, borderRadius: '50%', background: 'rgba(255,255,255,.2)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 11, fontWeight: 600, color: '#fff',
        }}>{index + 1}</div>
        <span style={{ fontSize: 11, fontFamily: 'monospace', color: 'rgba(255,255,255,.85)' }}>
          #{trade.tradeId.slice(-8)}
        </span>
      </div>
      <Badge status={trade.status} />
    </div>

    <div style={{ padding: '14px' }}>
      <div style={{ marginBottom: 12, background: '#f9fafb', borderRadius: 10, padding: '10px' }}>
        <div style={{ fontSize: 10, color: '#9ca3af', marginBottom: 3, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '.04em' }}>Buyer</div>
        <div style={{ fontSize: 13, fontWeight: 600, color: '#111827' }}>{trade.buyer.username}</div>
        <div style={{ fontSize: 11, color: '#9ca3af', marginTop: 1 }}>{trade.buyer.email}</div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 12 }}>
        {[
          { label: 'Total Amount', value: (trade.payment.totalInr) },
          { label: 'You Received', value: (trade.payment.sellerReceivesInr) },
        ].map((item, i) => (
          <div key={i} style={{ background: '#f9fafb', borderRadius: 10, padding: '8px 10px' }}>
            <div style={{ fontSize: 10, color: '#9ca3af', marginBottom: 3, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '.04em' }}>{item.label}</div>
            <div style={{ fontSize: 14, fontWeight: 600, color: '#111827' }}>{item.value}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 12 }}>
        {[
          { label: 'Coins Sold', value: fmt(trade.coins.totalCoins) },
          { label: 'Company Receives', value: (trade.payment.companyReceivesInr) },
        ].map((item, i) => (
          <div key={i} style={{ border: '0.5px solid #e5e7eb', borderRadius: 10, padding: '8px 10px' }}>
            <div style={{ fontSize: 10, color: '#9ca3af', marginBottom: 3, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '.04em' }}>{item.label}</div>
            <div style={{ fontSize: 13, fontWeight: 600, color: '#0F6E56' }}>{item.value}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 10, borderTop: '0.5px solid #f3f4f6' }}>
        <span style={{ fontSize: 10, color: '#9ca3af' }}>
          {fmtDateTime(trade.createdAt)}
        </span>
        <span style={{ fontSize: 11, color: '#0F6E56', fontWeight: 500 }}>
          Split: {trade.split.sellerSupplyPct}
        </span>
      </div>
    </div>
  </div>
);

// ─── Back button ─────────────────────────────────────────────────────────────
const BackButton = ({ onBack, label }) => (
  <button onClick={onBack} style={{
    display: 'inline-flex', alignItems: 'center', gap: 6,
    fontSize: 13, fontWeight: 500, padding: '7px 14px',
    borderRadius: 10, border: '0.5px solid #e5e7eb',
    background: '#fff', color: '#374151', cursor: 'pointer',
    marginBottom: '1.25rem', transition: 'all .15s',
    boxShadow: '0 1px 4px rgba(0,0,0,.04)',
  }}
    onMouseEnter={e => { e.currentTarget.style.borderColor = '#9FE1CB'; e.currentTarget.style.color = '#0F6E56'; }}
    onMouseLeave={e => { e.currentTarget.style.borderColor = '#e5e7eb'; e.currentTarget.style.color = '#374151'; }}
  >
    ← {label}
  </button>
);

// ─── P2P Transactions View ────────────────────────────────────────────────────
// ─── P2P Transactions View ────────────────────────────────────────────────────
const P2PTransactionsView = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState("staking");
  const tradeType =
    activeTab === "wp-staking"
      ? "wpStaking"
      : activeTab === "mining"
        ? "mining"
        : "regular";

  const { data: getHistory, isLoading: loading } = useGetP2PHistorySellerQuery({
    page: 1,
    limit: 10,
    tradeType,
  });

  const trades = getHistory?.data?.trades || [];
  const summary = getHistory?.data?.orderSummary || { total: 0 };

  if (loading) return <Loader />;

  return (
    <>
      <style>{`
        @keyframes fadeUp { from{opacity:0;transform:translateY(14px)} to{opacity:1;transform:none} }
        .trade-item { animation: fadeUp .35s ease both; }
        .show-mobile { display: none; }
        .show-desktop { display: block; }
        @media (max-width: 640px) {
          .show-mobile { display: block; }
          .show-desktop { display: none; }
        }
      `}</style>

      <div style={{ minHeight: '100vh', background: '#f8fafc', padding: '1.5rem 1rem' }}>
        <div style={{ maxWidth: 1500, margin: '0 auto' }}>
          <BackButton onBack={onBack} label="Back to Dashboard" />

          <div style={{ marginBottom: '1.5rem' }}>
            <h1 style={{ fontSize: 22, fontWeight: 700, color: '#111827', margin: 0, letterSpacing: '-.02em' }}>
              P2P Sold Logs
            </h1>
            <p style={{ fontSize: 13, color: '#9ca3af', margin: '3px 0 0' }}>
              Your selling history ({summary.total} total transaction{summary.total !== 1 ? 's' : ''})
            </p>
          </div>

          {trades.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '4rem 1rem', background: '#fff', borderRadius: 8, border: '0.5px solid #e5e7eb' }}>
              {/* <div style={{ fontSize: 48, marginBottom: 16 }}>💱</div> */}
              <div style={{ fontSize: 16, fontWeight: 600, color: '#111827', marginBottom: 6 }}>No transactions yet</div>
              <div style={{ fontSize: 13, color: '#9ca3af' }}>Your P2P selling history will appear here</div>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {trades.map((trade, i) => (
                <div className="trade-item" key={trade.tradeId} style={{ animationDelay: `${i * 0.06}s` }}>
                  {/* Desktop View */}
                  <div className="show-desktop">
                    <P2PTransactionRow trade={trade} index={i} />
                  </div>

                  {/* Mobile View */}
                  <div className="show-mobile">
                    <P2PTransactionCard trade={trade} index={i} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

// ─── Main Dashboard ────────────────────────────────────────────────────────────
const StakingDashboard = () => {
  const [filter, setFilter] = useState('all');
  const [currentView, setCurrentView] = useState('dashboard');
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const { data: response, isLoading, isError, error, refetch } = useGetStakingDashboardQuery();

  const data = response?.success ? response.data : null;

  const hasWallet = data?.wallet && typeof data.wallet === 'object' && Object.keys(data.wallet).length > 0;

  const handleBackToDashboard = () => { setCurrentView('dashboard'); setSelectedOrderId(null); };

  const filteredOrders = () => {
    if (!data?.orders) return [];
    if (filter === 'all') return data.orders;
    return data.orders.filter((o) => o.status === filter);
  };

  const countByStatus = (s) => data?.orders?.filter((o) => o.status === s).length || 0;

  const handleView = (orderId) => {
    setSelectedOrderId(orderId);
    setCurrentView('staking-rewards');
  };

  if (currentView === 'staking-rewards') {
    return <StakingReward orderId={selectedOrderId} onBack={handleBackToDashboard} />;
  }
  if (currentView === 'referral-rewards') {
    return <ReferralReward onBack={handleBackToDashboard} />;
  }
  if (currentView === 'p2p-transactions') {
    return <P2PTransactionsView onBack={handleBackToDashboard} />;
  }

  if (isLoading) return <Loader />;

  if (isError || !response?.success) {
    return (
      <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center', maxWidth: 320, padding: '0 1rem' }}>
          <div style={{ width: 52, height: 52, borderRadius: '50%', background: '#FEF2F2', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px', fontSize: 24 }}>⚠️</div>
          <div style={{ fontSize: 16, fontWeight: 600, color: '#111827', marginBottom: 6 }}>Dashboard error</div>
          <div style={{ fontSize: 13, color: '#9ca3af', marginBottom: 16 }}>{error?.data?.message || 'Unable to load data'}</div>
          <button onClick={refetch} style={{ padding: '8px 20px', background: '#0F6E56', color: '#fff', borderRadius: 10, border: 'none', cursor: 'pointer', fontSize: 13, fontWeight: 500 }}>Retry</button>
        </div>
      </div>
    );
  }

  const orders = filteredOrders();

  return (
    <>
      <style>{`
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:.4} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(14px)} to{opacity:1;transform:none} }
        .dash-container { animation: fadeUp .4s ease both; }
        .order-item { animation: fadeUp .35s ease both; }
        .show-mobile { display: none; }
        .show-desktop { display: block; }
        @media (max-width: 640px) {
          .show-mobile { display: block; }
          .show-desktop { display: none; }
        }
      `}</style>

      <div className="dash-container" style={{ minHeight: '100vh', background: '#f8fafc', padding: '1.5rem 1rem' }}>
        <div style={{ maxWidth: 1500, margin: '0 auto' }}>

          {/* ── Header with Info Modal ──────────────────────────── */}
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '.75rem' }}>
            <div>
              <h1 style={{ fontSize: 22, fontWeight: 700, color: '#111827', margin: 0, letterSpacing: '-.02em' }}>
                Staking Dashboard
              </h1>
              <p style={{ fontSize: 13, color: '#9ca3af', margin: '3px 0 0' }}>JMC token portfolio overview</p>
            </div>

            <button
              onClick={() => setShowInfoModal(true)}
              style={{ padding: '8px 16px', backgroundColor: '#085358', color: '#fff', border: 'none', borderRadius: '6px', fontSize: '14px', fontWeight: '600', cursor: 'pointer' }}
            >
              Note
            </button>
          </div>

          {/* Info Modal */}
          {showInfoModal && (
            <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }} onClick={() => setShowInfoModal(false)}>
              <div style={{ backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)', padding: '2rem', maxWidth: '500px', width: '90%', maxHeight: '80vh', overflow: 'auto' }} onClick={(e) => e.stopPropagation()}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                  <h2 style={{ fontSize: 18, fontWeight: 700, color: '#111827', margin: 0 }}>Dashboard Metrics</h2>
                  <button onClick={() => setShowInfoModal(false)} style={{ background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer', color: '#6b7280' }}>✕</button>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                  <div>
                    <p style={{ fontSize: 14, fontWeight: 200, color: '#111827', margin: '0 0 0.25rem 0' }}>Total Staked : Total JMC tokens you have locked in staking</p>
                  </div>
                  <hr style={{ margin: '0.5rem 0', border: 'none', borderTop: '1px solid #e5e7eb' }} />

                  <div>
                    <p style={{ fontSize: 14, fontWeight: 200, color: '#111827', margin: '0 0 0.25rem 0' }}>Interest Earned : Rewards earned from staking and referrals.</p>
                  </div>
                  <hr style={{ margin: '0.5rem 0', border: 'none', borderTop: '1px solid #e5e7eb' }} />

                  <div>
                    <p style={{ fontSize: 14, fontWeight: 200, color: '#111827', margin: '0 0 0.25rem 0' }}>Referral Earnings :  Tokens earned by inviting users.</p>
                  </div>
                  <hr style={{ margin: '0.5rem 0', border: 'none', borderTop: '1px solid #e5e7eb' }} />

                  <div>
                    <p style={{ fontSize: 14, fontWeight: 200, color: '#111827', margin: '0 0 0.25rem 0' }}>Lifetime Earnings :Total earnings since you started.</p>
                  </div>
                  <hr style={{ margin: '0.5rem 0', border: 'none', borderTop: '1px solid #e5e7eb' }} />

                  <div>
                    <p style={{ fontSize: 14, fontWeight: 200, color: '#111827', margin: '0 0 0.25rem 0' }}>Active Orders :Orders that are currently running.</p>
                  </div>
                  <hr style={{ margin: '0.5rem 0', border: 'none', borderTop: '1px solid #e5e7eb' }} />

                  <div>
                    <p style={{ fontSize: 14, fontWeight: 200, color: '#111827', margin: '0 0 0.25rem 0' }}>Sold in P2P : Tokens  sold in the P2P market.</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ── Wallet Stats ──────────────────────────── */}
          {hasWallet && (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
              gap: 10,
              marginBottom: '1.25rem',
            }}>
              <StatCard highlight label="Total staked" value={data.wallet.stakedTokens || 0} sub="JMC tokens" />
              <StatCard label="Interest earned" value={data.wallet.netInterestEarned || 0} sub="Net earned" sparkline={[3, 5, 8, 12, 18]} />
              <StatCard label="Referral earnings" value={data.wallet.totalReferralEarned || 0} sub="JMC tokens" sparkline={[2, 4, 6, 7, 9]} />
              <StatCard label="Lifetime earnings" value={data.wallet.totalInterestEarnedLifetime || 0} sub="All time" />
              <StatCard label="Active orders" value={data.summary.totalActiveOrders || 0} sub="Running now" />
              <StatCard label="Sold in P2P" value={data.wallet.totalSoldInP2P || 0} sub="Transferred" />
            </div>
          )}

          {/* ── Referral + P2P Banners ─────────────────────── */}
          {hasWallet && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 12, marginBottom: '1.25rem' }}>
              {/* Referral Banner */}
              <div style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '14px 18px',
                background: '#fff', border: '0.5px solid #e5e7eb', borderRadius: 8,
                cursor: 'pointer', boxShadow: '0 1px 4px rgba(0,0,0,.04)',
                transition: 'border-color .15s, box-shadow .15s',
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = '#9FE1CB'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(15,110,86,.1)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = '#e5e7eb'; e.currentTarget.style.boxShadow = '0 1px 4px rgba(0,0,0,.04)'; }}
                onClick={() => setCurrentView('referral-rewards')}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{
                    width: 42, height: 42, borderRadius: 12, background: '#E1F5EE',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20,
                  }}><User /></div>
                  <div>
                    <div style={{ fontSize: 10, color: '#9ca3af', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '.06em', marginBottom: 2 }}>
                      Referral earnings
                    </div>
                    <div style={{ fontSize: 15, fontWeight: 700, color: '#111827' }}>
                      {data.wallet.totalReferralEarned || 0} JMC
                    </div>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: '#9ca3af' }}>
                  View logs <span style={{ fontSize: 16 }}>›</span>
                </div>
              </div>

              {/* P2P Transactions Banner */}
              <div style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '14px 18px',
                background: '#fff', border: '0.5px solid #e5e7eb', borderRadius: 8,
                cursor: 'pointer', boxShadow: '0 1px 4px rgba(0,0,0,.04)',
                transition: 'border-color .15s, box-shadow .15s',
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = '#9FE1CB'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(15,110,86,.1)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = '#e5e7eb'; e.currentTarget.style.boxShadow = '0 1px 4px rgba(0,0,0,.04)'; }}
                onClick={() => setCurrentView('p2p-transactions')}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{
                    width: 42, height: 42, borderRadius: 12, background: '#E1F5EE',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20,
                  }}><ArrowLeftRight /></div>
                  <div>
                    <div style={{ fontSize: 11, color: '#9ca3af', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '.06em', marginBottom: 2 }}>
                      P2P Sold Logs
                    </div>
                    <div style={{ fontSize: 15, fontWeight: 700, color: '#111827' }}>
                      {data.wallet.totalSoldInP2P || 0} JMC
                    </div>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: '#9ca3af' }}>
                  View logs <span style={{ fontSize: 16 }}>›</span>
                </div>
              </div>
            </div>
          )}

          {/* ── Orders section ───────────────────────── */}
          {data.orders?.length > 0 && (
            <>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '.75rem', marginBottom: '1rem' }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: '#374151' }}>Staking orders</div>
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                  {[
                    { key: 'all', label: 'All', count: data.orders.length },
                    { key: 'active', label: 'Active', count: countByStatus('active') },
                    { key: 'completed', label: 'Completed', count: countByStatus('completed') },
                    { key: 'pending', label: 'Pending', count: countByStatus('pending') },
                  ]
                    .filter((f) => f.key === 'all' || f.count > 0)
                    .map((f) => (
                      <FilterPill key={f.key} label={f.label} count={f.count} active={filter === f.key} onClick={() => setFilter(f.key)} />
                    ))}
                </div>
              </div>

              {orders.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '3rem 1rem', color: '#9ca3af', fontSize: 14, background: '#fff', borderRadius: 8, border: '0.5px solid #e5e7eb' }}>
                  No {filter} orders found
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {orders.map((order, i) => (
                    <div className="order-item" key={order.orderId} style={{ animationDelay: `${i * 0.06}s` }}>
                      <div className="show-desktop"><OrderRow order={order} index={i} onView={handleView} /></div>
                      <div className="show-mobile"><OrderCard order={order} index={i} onView={handleView} /></div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

          {!data.orders?.length && (
            // <div style={{ textAlign: 'center', padding: '4rem 1rem', background: '#fff', borderRadius: 8, border: '0.5px solid #e5e7eb' }}>
            //   <div style={{ fontSize: 16, fontWeight: 600, color: '#111827', marginBottom: 6 }}>No orders yet</div>
            //   <div style={{ fontSize: 13, color: '#9ca3af' }}>Start your staking journey by creating your first order</div>
            // </div>

            <div style={{
              textAlign: 'center',
              padding: '4rem 1rem',
              background: `
    radial-gradient(circle at 20% 20%, rgba(20, 184, 166, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 80% 80%, rgba(15, 118, 110, 0.1) 0%, transparent 50%),
    linear-gradient(45deg, rgba(20, 184, 166, 0.05) 25%, transparent 25%),
    linear-gradient(-45deg, rgba(20, 184, 166, 0.05) 25%, transparent 25%),
    #ffffff
  `,
              backgroundSize: '100% 100%, 100% 100%, 20px 20px, 20px 20px',
              borderRadius: 16,
              border: '2px dashed #14b8a6',
              position: 'relative',
              overflow: 'hidden'
            }}>
              <div style={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                background: 'linear-gradient(45deg, #14b8a6, #0f766e)',
                opacity: 0.1,
                transform: 'rotate(45deg)'
              }}></div>

              <div style={{
                position: 'absolute',
                bottom: '15px',
                left: '15px',
                width: '40px',
                height: '40px',
                border: '3px solid #14b8a6',
                borderRadius: '50%',
                opacity: 0.2
              }}></div>

              <div style={{
                fontSize: '2.5rem',
                marginBottom: 8,
                color: '#0f766e'
              }}>

              </div>

              <div style={{
                fontSize: 18,
                fontWeight: 700,
                color: '#0f766e',
                marginBottom: 10,
                textTransform: 'uppercase',
                letterSpacing: '1px'
              }}>
                No orders yet
              </div>
              <div style={{
                fontSize: 14,
                color: '#14b8a6',
                fontWeight: 500,
                fontStyle: 'italic'
              }}>
                Start your staking journey by creating your first order
              </div>

              <div style={{
                marginTop: '1rem',
                display: 'inline-flex',
                gap: '4px'
              }}>
                {[1, 2, 3].map(i => (
                  <div key={i} style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: i === 2 ? '#14b8a6' : '#e6fffa'
                  }}></div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </>
  );
};

export default StakingDashboard;