import React, { useState, useEffect } from 'react';
import { useGetAllLockedSuperbonusQuery } from './lockedSupBonusApiSlice';
import ReferralModal from '../Dashboard/modals/referalModal';

const SuperBonusInfo = () => {
  const { 
    data: response, 
    isLoading, 
    isError,
    refetch: refreshBonusData
  } = useGetAllLockedSuperbonusQuery();
  
  const [isWithdrawLoading, setIsWithdrawLoading] = useState(false);
  const [withdrawMessage, setWithdrawMessage] = useState('');
  const [showWithdrawMessage, setShowWithdrawMessage] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showEligibilityModal, setShowEligibilityModal] = useState(false);
  const bonusInfo = response?.data;
  const message = response?.message;
  const username = bonusInfo?.username;
  const progressPercentage = bonusInfo?.progress?.currentRefs && bonusInfo?.progress?.requiredRefs
    ? Math.min((bonusInfo.progress.currentRefs / bonusInfo.progress.requiredRefs) * 100, 100)
    : 0;
    
  useEffect(() => {
    if (!isLoading && bonusInfo) {
      setIsAnimating(true);
      const timer = setTimeout(() => setIsAnimating(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [isLoading, bonusInfo]);

  // Show eligibility modal when eligible to withdraw temp bonus
  useEffect(() => {
    if (bonusInfo?.eligibleToWithDrawTempSuperBonus) {
      setShowEligibilityModal(true);
    }
  }, [bonusInfo]);

  // Auto-hide withdraw message after 5 seconds
  useEffect(() => {
    if (showWithdrawMessage) {
      const timer = setTimeout(() => {
        setShowWithdrawMessage(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [showWithdrawMessage]);

  const openReferralModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleCloseEligibilityModal = () => {
    setShowEligibilityModal(false);
  };
  
  // Direct fetch approach instead of using RTK Query hook
  const handleWithdrawBonus = async () => {
    try {
      setIsWithdrawLoading(true);
      
      // Get the base URL from your API slice configuration
      // This is an example - adjust according to your actual API setup
      const baseUrl = '/api'; // Adjust this to match your API base URL
      const response = await fetch(`${baseUrl}/User/disburse-locked-superboonus`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          // Include auth headers if needed
          // 'Authorization': `Bearer ${yourAuthToken}`
        },
        credentials: 'include', // If you're using cookies for auth
      });
      
      // Parse the response
      const data = await response.json();
      console.log('Bonus withdrawal response:', data);
      
      // Store the message from the API
      setWithdrawMessage(data.message || 'Bonus withdrawal processed');
      setShowWithdrawMessage(true);
      
      // Close modal and refresh data
      handleCloseEligibilityModal();
      refreshBonusData();
    } catch (error) {
      console.error('Error withdrawing bonus:', error);
      setWithdrawMessage('Failed to withdraw bonus. Please try again.');
      setShowWithdrawMessage(true);
    } finally {
      setIsWithdrawLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-3 py-5 max-w-9xl">
      {/* Message Toast */}
      {showWithdrawMessage && (
        <div className="fixed top-5 right-5 z-50 max-w-sm">
          <div className="bg-teal-600 text-white px-4 py-3 rounded-lg shadow-lg flex items-center">
            <div className="mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p>{withdrawMessage}</p>
            <button 
              onClick={() => setShowWithdrawMessage(false)}
              className="ml-auto text-white hover:text-teal-100"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Referral Modal */}
      <ReferralModal 
        show={showModal} 
        onHide={handleCloseModal} 
        userData={bonusInfo}
      />

      {/* Eligibility Modal */}
      {showEligibilityModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full shadow-xl border-2 border-teal-500">
            <div className="mb-4 text-center">
              <div className="h-16 w-16 rounded-full bg-teal-100 mx-auto flex items-center justify-center text-teal-600 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-teal-800">Good News!</h3>
              <p className="text-teal-700 mt-2">
                You are now eligible to withdraw your temporary SuperBonus!
              </p>
            </div>
            <div className="p-4 bg-teal-50 rounded-lg mb-4 text-sm text-teal-800">
              <p className="font-medium">What does this mean?</p>
              <p className="mt-1">
                You can now access and withdraw your temporary SuperBonus funds. This bonus becomes permanent when you complete all required referrals.
              </p>
            </div>
            <div className="flex justify-center mt-6">
              <button 
                onClick={handleWithdrawBonus}
                disabled={isWithdrawLoading}
                className="px-6 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors font-medium w-full"
              >
                {isWithdrawLoading ? 'Processing...' : 'Withdraw Now'}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="bg-gradient-to-br from-white to-teal-50 rounded-xl shadow-lg overflow-hidden border border-teal-100">
        {/* Header with Share Button */}
        <div className="p-4 border-b border-teal-100 bg-teal-600 text-white">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl md:text-2xl font-bold">SuperBonus Dashboard</h2>
              {message && (
                <p className="mt-1 text-teal-100 text-sm">
                  {message}
                </p>
              )}
            </div>
            <button 
              onClick={openReferralModal}
              className="px-4 py-2 bg-white text-teal-700 rounded-md hover:bg-teal-50 transition-all duration-200 transform hover:scale-105 shadow-md font-bold text-sm"
            >
              Share Your Link
            </button>
          </div>
        </div>

        <div className="p-4">
          {isLoading && (
            <div className="flex justify-center items-center h-36">
              <div className="flex flex-col items-center">
                <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-10 w-10 mb-3 border-t-teal-500 animate-spin"></div>
                <h2 className="text-center text-teal-700 text-base font-semibold">Loading your SuperBonus data...</h2>
              </div>
            </div>
          )}

          {isError && (
            <div className="bg-red-50 p-4 rounded-lg shadow-inner border border-red-100 my-3">
              <div className="flex items-center">
                <div className="flex-shrink-0 mr-3">
                  <svg className="h-8 w-8 text-red-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-base font-bold text-red-800">Unable to fetch your SuperBonus data</h3>
                  <p className="text-sm text-red-700">We're having trouble loading your information.</p>
                </div>
              </div>
            </div>
          )}

          {!isLoading && !isError && bonusInfo && (
            <div className="space-y-4">
              {/* User Information Card */}
              <div className="bg-white p-4 rounded-lg shadow-md border border-teal-100">
                <div className="flex items-center">
                  <div className="mr-4">
                    <div className="h-12 w-12 rounded-full bg-teal-100 flex items-center justify-center text-teal-600">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-user"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                    </div>
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-lg font-bold text-teal-800">
                      {bonusInfo.name}
                    </h3>
                    <p className="text-sm text-teal-600">
                      {bonusInfo.email}
                    </p>
                    <div className="flex items-center mt-2">
                      <span className="text-xs text-gray-500 mr-2">Referral ID:</span>
                      <span className="bg-teal-50 text-teal-800 text-xs font-semibold px-2 py-1 rounded border border-teal-200">
                        {username}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Progress Card */}
              <div className={`bg-white p-4 rounded-lg shadow-md border border-teal-100 transform transition-all duration-500 ${isAnimating ? 'scale-105' : ''}`}>
                <h3 className="text-lg font-bold text-teal-800 mb-3">Your Referral Journey</h3>
                
                <div className="mb-4">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-teal-700">
                      {bonusInfo.progress.currentRefs} of {bonusInfo.progress.requiredRefs} Referrals
                    </span>
                    <span className="text-sm font-medium text-teal-700">
                      {progressPercentage.toFixed(0)}% Complete
                    </span>
                  </div>
                  <div className="w-full h-3 bg-teal-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-teal-600 rounded-full transition-all duration-1000 ease-out"
                      style={{ width: `${progressPercentage}%` }}
                    ></div>
                  </div>
                </div>
                
                {/* Referral Visual */}
                <div className="flex flex-wrap gap-2 my-6 justify-center">
                  {[...Array(bonusInfo.progress.requiredRefs)].map((_, index) => (
                    <div 
                      key={index} 
                      className={`h-10 w-10 rounded-lg flex items-center justify-center transition-all duration-300 ${
                        index < bonusInfo.progress.currentRefs 
                          ? 'bg-teal-600 shadow-md transform hover:scale-110' 
                          : 'bg-teal-100 border border-teal-200'
                      }`}
                    >
                      {index < bonusInfo.progress.currentRefs ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      ) : (
                        <span className="text-xs font-medium text-teal-800">{index + 1}</span>
                      )}
                    </div>
                  ))}
                </div>
                
                <div className="bg-teal-50 p-3 rounded-md border border-teal-100">
                  <p className="text-sm text-teal-700 font-medium text-center">
                    You need <span className="text-teal-900 font-bold">{bonusInfo.progress.remainingRefs}</span> more referrals to unlock your SuperBonus!
                  </p>
                </div>
              </div>

              {/* Status Card */}
              <div className="bg-white p-4 rounded-lg shadow-md border border-teal-100">
                <h3 className="text-lg font-bold text-teal-800 mb-3">SuperBonus Status</h3>
                
                <div className="space-y-3">
                  <div className={`flex items-center p-3 rounded-md ${
                    bonusInfo.eligibleToWithDrawTempSuperBonus 
                      ? 'bg-teal-100 border border-teal-300' 
                      : 'bg-teal-50 border border-teal-100'
                  }`}>
                    <div className={`h-5 w-5 rounded-full flex items-center justify-center ${
                      bonusInfo.eligibleToWithDrawTempSuperBonus 
                        ? 'bg-teal-500' 
                        : 'bg-gray-300'
                    }`}>
                      {bonusInfo.eligibleToWithDrawTempSuperBonus && (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-white" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                    <div className="ml-3 flex-grow">
                      <span className="text-sm text-gray-800 font-medium">
                        {bonusInfo.eligibleToWithDrawTempSuperBonus 
                          ? 'You can withdraw your temporary SuperBonus!' 
                          : 'Not yet eligible to withdraw temporary SuperBonus'}
                      </span>
                      {bonusInfo.eligibleToWithDrawTempSuperBonus && (
                        <button 
                          onClick={() => setShowEligibilityModal(true)}
                          className="ml-auto text-xs bg-teal-600 text-white px-2 py-1 rounded hover:bg-teal-700 transition-colors"
                        >
                          Details
                        </button>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center p-3 rounded-md bg-teal-50 border border-teal-100">
                    <div className={`h-5 w-5 rounded-full flex items-center justify-center ${
                      bonusInfo.alreadyUnlockedSuperBonus 
                        ? 'bg-teal-500' 
                        : 'bg-gray-300'
                    }`}>
                      {bonusInfo.alreadyUnlockedSuperBonus && (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-white" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                    <span className="ml-3 text-sm text-gray-800">
                      {bonusInfo.alreadyUnlockedSuperBonus 
                        ? 'Congratulations! Your SuperBonus is unlocked!' 
                        : 'SuperBonus not yet unlocked'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {!isLoading && !isError && !bonusInfo && (
            <div className="text-center py-6">
              <div className="bg-teal-50 p-6 rounded-lg shadow-inner border border-teal-100">
                <svg className="mx-auto h-12 w-12 text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <h3 className="mt-3 text-base font-medium text-teal-900">No SuperBonus data found</h3>
                <p className="mt-1 text-sm text-teal-600">We couldn't find any SuperBonus information for your account.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SuperBonusInfo;