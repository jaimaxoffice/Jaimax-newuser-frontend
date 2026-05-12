// src/components/ReferralRewards/ReferralRewards.jsx
import React, { useState } from 'react';
import { useGetReferralRewardsQuery } from './stakingApiSlice';
import ReusableTable from '../../../ReusableComponents/tables/reusableTable';
import Pagination from '../../../ReusableComponents/pagination/pagination'; // Adjust path as needed
import { ArrowLeft } from 'lucide-react';

const ReferralRewards = ({ onBack }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const {
    data: response,
    isLoading,
    isError,
    error,
    refetch
  } = useGetReferralRewardsQuery({ page: currentPage, limit: pageSize });

  // Extract data properly from the API response
  const data = response?.data;
  const logs = data?.logs || [];
  const pagination = data?.pagination;

  const formatTokens = (tokens) => {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 8
    }).format(tokens || 0);
  };

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
           <ArrowLeft size={15} className='mr-2'/>
            Back to Dashboard
          </button>
          <div className="h-8 w-48 bg-gray-200 rounded animate-pulse"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-gray-200 rounded-xl h-32 animate-pulse"></div>
          ))}
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-16 bg-gray-200 rounded animate-pulse"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (isError || !response?.success) {
    return (
      <div className="space-y-6">
        <button
          onClick={onBack}
          className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
        >
         <ArrowLeft size={15} className='mr-2'/>
          Back to Dashboard
        </button>

        <div className="bg-white rounded-xl shadow-lg p-12 text-center">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-3">Failed to load referral rewards</h3>
          <p className="text-gray-600 mb-6">{error?.data?.message || 'Something went wrong'}</p>
          <button
            onClick={refetch}
            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with Back Button */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center px-4 py-2 text-white  transition-colors"
        >
          <ArrowLeft size={15} className='mr-2'/>
             Back to Dashboard
        </button>
        <h1 className="text-lg text-white   ">Referral Rewards</h1>
      </div>

      {/* Rewards List */}
      {!logs.length ? (
        <div className="bg-white rounded-xl shadow-lg p-12 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">No referral rewards yet</h3>
          <p className="text-gray-600">Your referral commissions will appear here</p>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">


          {/* Desktop Table */}
          <div className="hidden md:block">
            <ReusableTable
              columns={[
                {
                  header: "S.No",
                  accessor: "index",
                  render: (row, index) => (
                    <div className="text-sm text-gray-900 font-medium">
                      {(currentPage - 1) * pageSize + index + 1}
                    </div>
                  )
                },
                {
                  header: "Order ID",
                  accessor: "orderId",
                  render: (row) => (
                    <div className="text-xs text-gray-900">
                      {row.orderId ? `${row.orderId}` : '-'}
                    </div>
                  )
                },
                {
                  header: "Date",
                  accessor: "createdAt",
                  render: (row) => (
                    <div className="text-xs text-gray-900">
                      {row.createdAt
                        ?.replace('T', ' ')
                        ?.replace('Z', '')
                        ?.split('.')[0]}
                    </div>
                  )
                },
                {
                  header: "Tokens(JMC)",
                  accessor: "rewardTokens",
                  render: (row) => (
                    <div>
                      <span className="text-xs font-bold text-green-600">
                        +{formatTokens(row.rewardTokens || row.amount || row.tokens)}
                      </span>
                    </div>
                  )
                },
                {
                  header: "From User",
                  accessor: "referralFromUsername",
                  render: (row) => (
                    <div className="text-xs text-gray-900">
                      {row.referralFromUsername || row.fromUser || 'Unknown'}
                    </div>
                  )
                },
                {
                  header: "Day",
                  accessor: "stakingDisbursementDay",
                  render: (row) => (
                    <div className="text-sm text-gray-900">
                      Day {row.stakingDisbursementDay || '-'}
                    </div>
                  )
                },
                {
                  header: "Transaction ID",
                  accessor: "transactionId",
                  render: (row) => (
                    <div className="text-xs ">
                      {row.transactionId || '-'}
                    </div>
                  )
                }
              ]}
              data={logs}
              isLoading={false}
            />
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden p-4 space-y-3">
            {logs.map((reward, index) => (
              <div key={reward._id || index} className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="font-bold text-green-600">
                      +{formatTokens(reward.rewardTokens || reward.amount || reward.tokens)} tokens
                    </p>
                    <p className="text-sm text-gray-600">{formatDate(reward.createdAt)}</p>
                  </div>
                  <span className="text-xs text-gray-500">
                    Day {reward.stakingDisbursementDay || '-'}
                  </span>
                </div>
                <div className="text-sm text-gray-600">
                  <p>From: {reward.referralFromUsername || 'Unknown'}</p>
                  <p className="text-xs text-gray-400 mt-1">
                    TXN: {reward.transactionId ? `${reward.transactionId.slice(0, 12)}...` : '-'}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Reusable Pagination Component */}
          {pagination && pagination.totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={pagination.totalPages}
              totalItems={pagination.total}
              itemsPerPage={pageSize}
              onPageChange={handlePageChange}
              isLoading={isLoading}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default ReferralRewards;