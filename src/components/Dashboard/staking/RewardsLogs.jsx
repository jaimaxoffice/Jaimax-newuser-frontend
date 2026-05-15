// // src/components/ReferralRewards/ReferralRewards.jsx
// import React, { useState } from 'react';
// import { useGetReferralRewardsQuery } from './stakingApiSlice';
// import ReusableTable from '../../../ReusableComponents/tables/reusableTable';
// import Pagination from '../../../ReusableComponents/pagination/pagination'; // Adjust path as needed
// import { ArrowLeft } from 'lucide-react';

// const ReferralRewards = ({ onBack }) => {
//   const [currentPage, setCurrentPage] = useState(1);
//   const [pageSize, setPageSize] = useState(10);

//   const {
//     data: response,
//     isLoading,
//     isError,
//     error,
//     refetch
//   } = useGetReferralRewardsQuery({ page: currentPage, limit: pageSize });

//   // Extract data properly from the API response
//   const data = response?.data;
//   const logs = data?.logs || [];
//   const pagination = data?.pagination;

//   const formatTokens = (tokens) => {
//     return new Intl.NumberFormat('en-US', {
//       minimumFractionDigits: 2,
//       maximumFractionDigits: 8
//     }).format(tokens || 0);
//   };

//   const formatDate = (dateString) => {
//     if (!dateString) return '-';
//     return new Date(dateString).toLocaleString('en-IN', {
//       year: 'numeric',
//       month: 'short',
//       day: 'numeric',
//       hour: '2-digit',
//       minute: '2-digit',
//       hour12: true
//     });
//   };

//   const handlePageChange = (newPage) => {
//     setCurrentPage(newPage);
//     window.scrollTo({ top: 0, behavior: 'smooth' });
//   };

//   if (isLoading) {
//     return (
//       <div className="space-y-6">
//         <div className="flex items-center justify-between">
//           <button
//             onClick={onBack}
//             className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
//           >
//            <ArrowLeft size={15} className='mr-2'/>
//             Back to Dashboard
//           </button>
//           <div className="h-8 w-48 bg-gray-200 rounded animate-pulse"></div>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           {[...Array(3)].map((_, i) => (
//             <div key={i} className="bg-gray-200 rounded-xl h-32 animate-pulse"></div>
//           ))}
//         </div>

//         <div className="bg-white rounded-xl shadow-lg p-6">
//           <div className="space-y-4">
//             {[...Array(5)].map((_, i) => (
//               <div key={i} className="h-16 bg-gray-200 rounded animate-pulse"></div>
//             ))}
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (isError || !response?.success) {
//     return (
//       <div className="space-y-6">
//         <button
//           onClick={onBack}
//           className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
//         >
//          <ArrowLeft size={15} className='mr-2'/>
//           Back to Dashboard
//         </button>

//         <div className="bg-white rounded-xl shadow-lg p-12 text-center">
//           <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
//             <svg className="w-10 h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//             </svg>
//           </div>
//           <h3 className="text-xl font-bold text-gray-900 mb-3">Failed to load referral rewards</h3>
//           <p className="text-gray-600 mb-6">{error?.data?.message || 'Something went wrong'}</p>
//           <button
//             onClick={refetch}
//             className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
//           >
//             Try Again
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-6">
//       {/* Header with Back Button */}
//       <div className="flex items-center justify-between">
//         <button
//           onClick={onBack}
//           className="flex items-center px-4 py-2 text-white  transition-colors"
//         >
//           <ArrowLeft size={15} className='mr-2'/>
//              Back to Dashboard
//         </button>
//         <h1 className="text-lg text-white   ">Referral Rewards</h1>
//       </div>

//       {/* Rewards List */}
//       {!logs.length ? (
//         <div className="bg-white rounded-xl shadow-lg p-12 text-center">
//           <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
//             <svg className="w-8 h-8 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
//             </svg>
//           </div>
//           <h3 className="text-lg font-bold text-gray-900 mb-2">No referral rewards yet</h3>
//           <p className="text-gray-600">Your referral commissions will appear here</p>
//         </div>
//       ) : (
//         <div className="bg-white rounded-lg shadow-lg overflow-hidden">


//           {/* Desktop Table */}
//           <div className="hidden md:block">
//             <ReusableTable
//               columns={[
//                 {
//                   header: "S.No",
//                   accessor: "index",
//                   render: (row, index) => (
//                     <div className="text-sm text-gray-900 font-medium">
//                       {(currentPage - 1) * pageSize + index + 1}
//                     </div>
//                   )
//                 },
//                 {
//                   header: "Order ID",
//                   accessor: "orderId",
//                   render: (row) => (
//                     <div className="text-xs text-gray-900">
//                       {row.orderId ? `${row.orderId}` : '-'}
//                     </div>
//                   )
//                 },
//                 {
//                   header: "Date",
//                   accessor: "createdAt",
//                   render: (row) => (
//                     <div className="text-xs text-gray-900">
//                       {row.createdAt
//                         ?.replace('T', ' ')
//                         ?.replace('Z', '')
//                         ?.split('.')[0]}
//                     </div>
//                   )
//                 },
//                 {
//                   header: "Tokens(JMC)",
//                   accessor: "rewardTokens",
//                   render: (row) => (
//                     <div>
//                       <span className="text-xs font-bold text-green-600">
//                         +{formatTokens(row.rewardTokens || row.amount || row.tokens)}
//                       </span>
//                     </div>
//                   )
//                 },
//                 {
//                   header: "From User",
//                   accessor: "referralFromUsername",
//                   render: (row) => (
//                     <div className="text-xs text-gray-900">
//                       {row.referralFromUsername || row.fromUser || 'Unknown'}
//                     </div>
//                   )
//                 },
//                 {
//                   header: "Day",
//                   accessor: "stakingDisbursementDay",
//                   render: (row) => (
//                     <div className="text-sm text-gray-900">
//                       Day {row.stakingDisbursementDay || '-'}
//                     </div>
//                   )
//                 },
//                 {
//                   header: "Transaction ID",
//                   accessor: "transactionId",
//                   render: (row) => (
//                     <div className="text-xs ">
//                       {row.transactionId || '-'}
//                     </div>
//                   )
//                 }
//               ]}
//               data={logs}
//               isLoading={false}
//             />
//           </div>

//           {/* Mobile Cards */}
//           <div className="md:hidden p-4 space-y-3">
//             {logs.map((reward, index) => (
//               <div key={reward._id || index} className="border border-gray-200 rounded-lg p-4">
//                 <div className="flex justify-between items-start mb-2">
//                   <div>
//                     <p className="font-bold text-green-600">
//                       +{formatTokens(reward.rewardTokens || reward.amount || reward.tokens)} tokens
//                     </p>
//                     <p className="text-sm text-gray-600">{formatDate(reward.createdAt)}</p>
//                   </div>
//                   <span className="text-xs text-gray-500">
//                     Day {reward.stakingDisbursementDay || '-'}
//                   </span>
//                 </div>
//                 <div className="text-sm text-gray-600">
//                   <p>From: {reward.referralFromUsername || 'Unknown'}</p>
//                   <p className="text-xs text-gray-400 mt-1">
//                     TXN: {reward.transactionId ? `${reward.transactionId.slice(0, 12)}...` : '-'}
//                   </p>
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* Reusable Pagination Component */}
//           {pagination && pagination.totalPages > 1 && (
//             <Pagination
//               currentPage={currentPage}
//               totalPages={pagination.totalPages}
//               totalItems={pagination.total}
//               itemsPerPage={pageSize}
//               onPageChange={handlePageChange}
//               isLoading={isLoading}
//             />
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default ReferralRewards;


// src/components/ReferralRewards/ReferralRewards.jsx
import React, { useState } from 'react';
import { useGetReferralRewardsQuery } from './stakingApiSlice';
import Pagination from '../../../ReusableComponents/pagination/pagination';
import { ArrowLeft, Gift, Hash, ReceiptText, CalendarDays, Coins, User, Layers, ArrowLeftRight } from 'lucide-react';

const COLUMNS = [
  { label: 'S.No',              icon: Hash,            key: 'index'    },
  { label: 'Order ID',       icon: ReceiptText,     key: 'orderId'  },
  { label: 'Date',           icon: CalendarDays,    key: 'date'     },
  { label: 'Tokens (JMC)',   icon: Coins,           key: 'tokens'   },
  { label: 'From User',      icon: User,            key: 'user'     },
  { label: 'Day',            icon: Layers,          key: 'day'      },
  { label: 'Transaction ID', icon: ArrowLeftRight,  key: 'txn'      },
];

const formatTokens = (val) =>
  new Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 8 }).format(val || 0);

const formatDate = (str) => {
  if (!str) return '-';
  return str.replace('T', ' ').replace('Z', '').split('.')[0];
};

/* ── Skeleton ── */
const Skeleton = ({ onBack }) => (
  <div className="space-y-5">
    <button onClick={onBack} className="flex items-center gap-2 text-sm text-white/60">
      <ArrowLeft size={14} /> Back to Dashboard
    </button>
    <div className="rounded-2xl overflow-hidden border border-white/10">
      <div className="bg-[#085041] px-6 py-4 flex items-center gap-3">
        <div className="w-7 h-7 rounded-lg bg-teal-700 animate-pulse" />
        <div className="h-4 w-40 bg-teal-700 rounded animate-pulse" />
      </div>
      <div className="bg-[#0a5e4a] px-6 py-3 grid grid-cols-7 gap-4">
        {[...Array(7)].map((_, i) => <div key={i} className="h-2.5 bg-teal-800 rounded animate-pulse" />)}
      </div>
      {[...Array(6)].map((_, i) => (
        <div key={i} className="bg-white px-6 py-4 grid grid-cols-7 gap-4 border-b border-gray-100 last:border-0">
          {[...Array(7)].map((_, j) => <div key={j} className="h-3 bg-gray-100 rounded animate-pulse" />)}
        </div>
      ))}
    </div>
  </div>
);

/* ── Error ── */
const ErrorState = ({ onBack, message, refetch }) => (
  <div className="space-y-5">
    <button onClick={onBack} className="flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors">
      <ArrowLeft size={14} /> Back to Dashboard
    </button>
    <div className="bg-white rounded-2xl p-14 text-center border border-gray-100">
      <p className="text-sm text-gray-500 mb-4">{message || 'Failed to load referral rewards.'}</p>
      <button onClick={refetch} className="px-5 py-2 text-sm font-medium bg-[#085041] text-white rounded-xl hover:bg-[#0F6E56] transition-colors">
        Try Again
      </button>
    </div>
  </div>
);

/* ── Main Component ── */
const ReferralRewards = ({ onBack }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);

  const { data: response, isLoading, isError, error, refetch } = useGetReferralRewardsQuery({
    page: currentPage,
    limit: pageSize,
  });

  const logs       = response?.data?.logs       || [];
  const pagination = response?.data?.pagination;

  const handlePageChange = (p) => { setCurrentPage(p); window.scrollTo({ top: 0, behavior: 'smooth' }); };

  if (isLoading) return <Skeleton onBack={onBack} />;
  if (isError || !response?.success)
    return <ErrorState onBack={onBack} message={error?.data?.message} refetch={refetch} />;

  return (
    <div className="space-y-5">

      {/* ── Page Header ── */}
      <div className="flex items-center justify-between">
        <button
            onClick={onBack}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              fontSize: 13, fontWeight: 500, padding: '7px 14px',
              borderRadius: 10, border: '0.5px solid #e5e7eb',
              background: '#fff', color: '#374151', cursor: 'pointer',
              transition: 'all .15s', boxShadow: '0 1px 4px rgba(0,0,0,.04)',
              outline: 'none',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = '#9FE1CB'; e.currentTarget.style.color = '#0F6E56'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = '#e5e7eb'; e.currentTarget.style.color = '#374151'; }}
          >
            <ArrowLeft size={15} /> Back to Dashboard
          </button>

        {/* <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-[#0F6E56] border border-[#1D9E75] flex items-center justify-center">
            <Gift size={15} className="text-[#9FE1CB]" />
          </div>
          <div>
            <p className="text-sm font-semibold text-white leading-tight">Referral Rewards</p>
            {pagination?.total > 0 && (
              <p className="text-[11px] text-white/40 leading-tight">{pagination.total} total records</p>
            )}
          </div>
        </div> */}
      </div>

      {/* ── Empty ── */}
      {!logs.length ? (
        <div className="bg-white rounded-2xl p-14 text-center border border-gray-100">
          {/* <div className="w-12 h-12 rounded-2xl bg-teal-50 flex items-center justify-center mx-auto mb-4">
            <Gift size={20} className="text-teal-600" />
          </div> */}
          <p className="text-sm font-semibold text-gray-800 mb-1">No referral rewards yet</p>
          <p className="text-xs text-gray-400">Your referral commissions will appear here</p>
        </div>
      ) : (
        <div className="rounded-2xl overflow-hidden border border-white/10 shadow-xl shadow-black/10">

          {/* ── Table Panel Header ── */}
          <div className="bg-[#f4fefb] px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              {/* <div className="w-8 h-8 rounded-xl bg-[#0F6E56] border border-[#1D9E75]/60 flex items-center justify-center">
                <Gift size={15} className="text-[#9FE1CB]" />
              </div> */}
              <div>
                <p className="text-sm font-semibold text-[#0F6E56]">Referral Rewards</p>
                {/* <p className="text-[11px] text-[#5DCAA5]">Commission earnings from your referrals</p> */}
              </div>
            </div>
            {/* {pagination?.total > 0 && (
              <span className="text-xs font-semibold text-[#085041] bg-[#9FE1CB] px-3 py-1 rounded-full">
                {pagination.total} records
              </span>
            )} */}
          </div>

          {/* ── Desktop Table ── */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full" style={{ tableLayout: 'fixed' }}>
              <colgroup>
                <col style={{ width: '4%' }} />
                <col style={{ width: '13%' }} />
                <col style={{ width: '17%' }} />
                <col style={{ width: '17%' }} />
                <col style={{ width: '15%' }} />
                <col style={{ width: '8%' }} />
                <col style={{ width: '26%' }} />
              </colgroup>

              {/* Column headers */}
              <thead>
                <tr className="bg-[#0a5e4a] border-b border-[#0F6E56]">
                  {COLUMNS.map(({ label, icon: Icon }) => (
                    <th key={label} className="px-4 py-3 text-left">
                      <div className="flex items-center gap-1.5">
                        {/* <Icon size={11} className="text-[#5DCAA5] flex-shrink-0" /> */}
                        <span className="text-[10px] font-semibold text-[#ffffff] uppercase tracking-widest whitespace-nowrap">
                          {label}
                        </span>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>

              {/* Rows */}
              <tbody className="bg-white">
                {logs.map((row, index) => (
                  <tr
                    key={row._id || index}
                    className="border-b border-gray-100 last:border-0 hover:bg-[#E1F5EE]/50 transition-colors duration-100 group"
                  >
                    <td className="px-4 py-3.5">
                      <span className="text-xs text-gray-400 font-medium">
                        {(currentPage - 1) * pageSize + index + 1}
                      </span>
                    </td>

                    <td className="px-4 py-3.5">
                      <span className="text-xs font-mono font-semibold text-gray-800 truncate block">
                        {row.orderId || '-'}
                      </span>
                    </td>

                    <td className="px-4 py-3.5">
                      <span className="text-xs text-gray-500 whitespace-nowrap">
                        {formatDate(row.createdAt)}
                      </span>
                    </td>

                    <td className="px-4 py-3.5">
                      <span className="inline-flex items-center gap-1 bg-[#E1F5EE] border border-[#5DCAA5] text-[#085041] text-xs font-bold px-2.5 py-1 rounded-full whitespace-nowrap">
                        <span className="text-[#1D9E75] text-[11px]">+</span>
                        {formatTokens(row.rewardTokens || row.amount || row.tokens)}
                      </span>
                    </td>

                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-1.5">
                        
                        <span className="text-xs text-gray-700 font-medium truncate">
                          {row.referralFromUsername || row.fromUser || 'Unknown'}
                        </span>
                      </div>
                    </td>

                    <td className="px-4 py-3.5">
                      <span className="inline-flex items-center bg-[#085041] text-[#ffff] text-[10px] font-bold px-2 py-0.5 rounded-md whitespace-nowrap">
                        Day {row.stakingDisbursementDay || '-'}
                      </span>
                    </td>

                    <td className="px-4 py-3.5">
                      <span className="text-[11px] font-mono text-gray-400 truncate block">
                        {row.transactionId || '-'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* ── Mobile Cards ── */}
          <div className="md:hidden bg-gray-50 divide-y divide-gray-200">
            {logs.map((row, index) => (
              <div
                key={row._id || index}
                className="bg-white mx-3 my-2 rounded-xl border border-gray-100 overflow-hidden shadow-sm"
              >
                {/* Card top bar */}
                <div className="bg-[#085041] px-4 py-2.5 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-semibold text-[#5DCAA5]">
                      #{(currentPage - 1) * pageSize + index + 1}
                    </span>
                    <span className="text-xs font-mono font-semibold text-[#E1F5EE] truncate max-w-[120px]">
                      {row.orderId || '-'}
                    </span>
                  </div>
                  <span className="inline-flex items-center bg-[#9FE1CB] text-[#085041] text-[10px] font-bold px-2 py-0.5 rounded-md whitespace-nowrap">
                    Day {row.stakingDisbursementDay || '-'}
                  </span>
                </div>

                {/* Card body */}
                <div className="px-4 py-3 space-y-2.5">

                  {/* Token amount — prominent */}
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] text-gray-400 font-medium">Tokens earned</span>
                    <span className="inline-flex items-center gap-1 bg-[#E1F5EE] border border-[#5DCAA5] text-[#085041] text-sm font-bold px-3 py-1 rounded-full">
                      <span className="text-[#1D9E75]">+</span>
                      {formatTokens(row.rewardTokens || row.amount || row.tokens)}
                      <span className="text-[10px] text-[#0F6E56] font-semibold ml-0.5">JMC</span>
                    </span>
                  </div>

                  {/* From user */}
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] text-gray-400 font-medium">From user</span>
                    <div className="flex items-center gap-1.5">
                      {/* <div className="w-5 h-5 rounded-full bg-[#E1F5EE] border border-[#9FE1CB] flex items-center justify-center">
                        <span className="text-[9px] font-bold text-[#0F6E56]">
                          {(row.referralFromUsername || row.fromUser || 'U').charAt(0).toUpperCase()}
                        </span>
                      </div> */}
                      <span className="text-xs font-semibold text-gray-700">
                        {row.referralFromUsername || row.fromUser || 'Unknown'}
                      </span>
                    </div>
                  </div>

                  {/* Date */}
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] text-gray-400 font-medium">Date</span>
                    <span className="text-xs text-gray-600">{formatDate(row.createdAt)}</span>
                  </div>

                  {/* Transaction ID */}
                  {row.transactionId && (
                    <div className="pt-2 border-t border-gray-100">
                      <p className="text-[10px] text-gray-400 mb-0.5 font-medium">Transaction ID</p>
                      <p className="text-[11px] font-mono text-gray-500 break-all leading-relaxed">
                        {row.transactionId}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* ── Pagination ── */}
          {pagination && pagination.totalPages > 1 && (
            <div className="bg-white border-t border-gray-100">
              <Pagination
                currentPage={currentPage}
                totalPages={pagination.totalPages}
                totalItems={pagination.total}
                itemsPerPage={pageSize}
                onPageChange={handlePageChange}
                isLoading={isLoading}
              />
            </div>
          )}

        </div>
      )}
    </div>
  );
};

export default ReferralRewards;