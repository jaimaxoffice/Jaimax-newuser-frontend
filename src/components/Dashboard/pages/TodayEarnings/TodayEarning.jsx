import React, { useState, useEffect } from 'react';
import { Crown, Trophy, Zap, Clock, Medal, Star, Percent, Check, ChevronRight, Sparkles, Target, TrendingUp, Gift } from 'lucide-react';
import { useGetTodayEarningStatusMutation } from './userEarningApiSlice';
import Loader from "../../../Loader/loader";
import ReferralModal from '../../modals/referalModal';

const VictoryLeaderboard = () => {
  const [getTodayEarningStatus, { data: apiData, isLoading, error }] = useGetTodayEarningStatusMutation();
  console.log("API Data:", apiData);

  const [data, setData] = useState({
    earnings: {
      completedLevels: 0,
      totalTodayEarnings: 0,
    },
    validityWindow: {
      hoursRemaining: 0
    },
    progress: {
      percentage: 0,
      completedTasks: 0,
      totalTasks: 0
    },
    leaderboard: Array.from({ length: 10 }, (_, i) => ({
      id: `locked-${i}`,
      name: `Level ${i + 1}`,
      score: 0,
      status: 'locked',
      earnings: 0,
      commissionRate: '0%',
      originalIndex: i
    }))
  });
  const [showReferralModal, setShowReferralModal] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userData"));
    const userId = user?.data?._id;

    if (userId) {
      getTodayEarningStatus({ id: userId });
    } else {
      console.error("User ID not found in localStorage.");
    }
  }, [getTodayEarningStatus]);

  useEffect(() => {
    if (apiData && apiData.success) {
      const updatedLeaderboard = Array.from({ length: 10 }, (_, i) => {
        const levelDetail = apiData.data?.earnings?.levelDetails?.[i];

        if (levelDetail) {
          return {
            id: `level-${levelDetail.level}`,
            name: `Level ${levelDetail.level}`,
            score: 0,
            status: levelDetail.status,
            earnings: levelDetail.earnings || 0,
            commissionRate: levelDetail.commissionRate || '0%',
            originalIndex: i
          };
        }
        return {
          id: `locked-${i}`,
          name: `Level ${i + 1}`,
          score: 0,
          status: 'locked',
          earnings: 0,
          commissionRate: '0%',
          originalIndex: i
        };
      });

      const sortedLeaderboard = updatedLeaderboard.sort((a, b) => {
        if (a.status === 'active' && b.status !== 'active') return -1;
        if (a.status !== 'active' && b.status === 'active') return 1;
        if (a.status === 'pending' && b.status !== 'pending' && b.status !== 'active') return -1;
        if (a.status !== 'pending' && b.status === 'pending' && a.status !== 'active') return 1;
        if (a.status === 'locked' && b.status !== 'locked' && b.status !== 'active' && b.status !== 'pending') return -1;
        if (a.status !== 'locked' && b.status === 'locked' && a.status !== 'active' && a.status !== 'pending') return 1;
        return a.originalIndex - b.originalIndex;
      });

      setData({
        earnings: {
          completedLevels: apiData.data?.earnings?.completedLevels || 0,
          totalTodayEarnings: apiData.data?.earnings?.totalTodayEarnings || 0,
        },
        validityWindow: {
          hoursRemaining: apiData.data?.validityWindow?.hoursRemaining || 0
        },
        progress: {
          percentage: apiData.data?.progress?.percentage || 0,
          completedTasks: apiData.data?.earnings?.completedLevels || 0,
          totalTasks: apiData.data?.maxReferralsAllowed || 10
        },
        leaderboard: sortedLeaderboard
      });
    }
  }, [apiData]);

  const getStatusStyles = (status) => {
    switch (status) {
      case 'completed': return 'bg-teal-600 text-white';
      case 'active': return 'bg-teal-400 text-gray-900';
      case 'pending': return 'bg-yellow-500/50 text-gray-200';
      case 'locked': return 'bg-gray-500/20 text-gray-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  const getRankIcon = (rank, status) => {
    if (status === 'completed') {
      return <Check size={16} className="text-white" />;
    }

    switch (rank) {
      case 1: return <Crown size={16} className="text-white" />;
      case 2: return <Medal size={16} className="text-white" />;
      case 3: return <Medal size={16} className="text-white" />;
      default: return <Star size={14} className="text-white" />;
    }
  };

  const getNextLevelToComplete = () => {
    const completedLevels = data.leaderboard.filter(level => level.status === 'completed');
    const activeLevels = data.leaderboard.filter(level => level.status === 'active');
    const pendingLevels = data.leaderboard.filter(level => level.status === 'pending');

    if (activeLevels.length > 0) {
      return activeLevels[0];
    }

    if (pendingLevels.length > 0) {
      return pendingLevels[0];
    }

    const nextLockedLevel = data.leaderboard.find(level =>
      level.status === 'locked' && level.originalIndex === completedLevels.length
    );

    return nextLockedLevel || data.leaderboard[0];
  };

  const getEncouragingMessage = (level, completedCount, totalTasks) => {
    const messages = {
      active: [
        " You're so close! Complete this level now!",
        " Almost there! Finish this level to unlock rewards!",
        " Final push! Complete this active level!",
        " You've got this! Finish strong!"
      ],
      pending: [
        " Your progress is being reviewed! Next level coming soon!",
        " We're processing your completion. Great work!",
        "Almost verified! Keep up the momentum!"
      ],
      locked: completedCount === 0 ? [
        " Start your victory journey! Complete Level 1!",
        " Begin your earning adventure! Level 1 awaits!",
        " Take the first step! Unlock Level 1 now!",
        " Your success story starts here! Go for Level 1!"
      ] : [
        ` Amazing progress! You've completed ${completedCount} level${completedCount > 1 ? 's' : ''}!`,
        ` Keep the momentum! You're ${completedCount === 1 ? 'on a roll' : 'unstoppable'}!`,
        ` ${completedCount} down, more to go! You're doing great!`,
        ` Level ${completedCount + 1} is calling your name!`
      ],
      allCompleted: [
        "Congratulations! You've completed all levels!",
        "You're a true champion! All levels mastered!",
        "Victory achieved! You've conquered the leaderboard!",
        "Incredible! You've finished every challenge!"
      ]
    };

    if (completedCount === totalTasks) {
      return messages.allCompleted[Math.floor(Math.random() * messages.allCompleted.length)];
    }

    const messageArray = messages[level.status] || messages.locked;
    return messageArray[Math.floor(Math.random() * messageArray.length)];
  };

  const nextLevel = getNextLevelToComplete();
  const completedCount = data.leaderboard.filter(level => level.status === 'completed').length;
  const totalTasks = data.progress.totalTasks;
  const allLevelsCompleted = completedCount === totalTasks;
  const encouragingMessage = getEncouragingMessage(nextLevel, completedCount, totalTasks);

  const SkeletonCard = () => (
    <div className="text-center p-2 sm:p-3 rounded-lg bg-white/10 border border-white/20 min-h-[70px] sm:min-h-[80px] animate-pulse">
      <div className="w-5 h-5 bg-white/20 rounded-full mx-auto mb-1 animate-pulse"></div>
      <div className="w-10 h-3 bg-white/20 rounded mx-auto mb-1 animate-pulse"></div>
      <div className="w-8 h-4 bg-white/20 rounded mx-auto animate-pulse"></div>
    </div>
  );

  const SkeletonVictoryHeader = () => (
    <div className="text-center mb-3 md:mb-4">
      <div className="inline-block relative w-full max-w-md">
        <div className="relative p-3 sm:p-4 rounded-2xl border border-white/20 bg-white/10 animate-pulse">
          <div className="flex items-center justify-center mb-3">
            <div className="w-8 h-8 bg-white/20 rounded-full mr-2 animate-pulse"></div>
            <div className="w-30 h-8 bg-white/20 rounded animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );

  const SkeletonLeaderboardItem = () => (
    <div className="flex items-center p-2 sm:p-3 rounded-lg mb-2 bg-white/10 border border-white/20 animate-pulse">
      <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white/20 rounded-full mr-2 sm:mr-3 animate-pulse"></div>
      <div className="flex-grow">
        <div className="flex items-center justify-between">
          <div className="flex-grow mr-2">
            <div className="w-20 h-4 bg-white/20 rounded mb-1 animate-pulse"></div>
            <div className="flex items-center flex-wrap">
              <div className="w-10 h-3 bg-white/20 rounded mr-2 animate-pulse"></div>
              <div className="w-15 h-3 bg-white/20 rounded animate-pulse"></div>
            </div>
          </div>
          <div className="text-right">
            <div className="w-12 h-4 bg-white/20 rounded mb-1 animate-pulse"></div>
            <div className="w-15 h-3 bg-white/20 rounded animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );

  if (isLoading) {
    return (
      <>

          <div className="bg-[#1d8d84]">
            <div className="container mx-auto px-2 sm:px-3">
              <div className="flex justify-center">
                <div className="w-full xl:w-10/12">
                  <div className="p-2 sm:p-3">
                    <SkeletonVictoryHeader />

                    <div className="grid grid-cols-2 gap-2 sm:gap-3 mb-3 md:mb-4">
                      <SkeletonCard />
                      <SkeletonCard />
                    </div>

                    <div>
                      <div className="w-30 h-6 bg-white/20 rounded mx-auto mb-3 animate-pulse"></div>
                      {Array.from({ length: 10 }, (_, i) => (
                        <SkeletonLeaderboardItem key={i} />
                      ))}
                    </div>

                    <div className="text-center mt-3 md:mt-4">
                      <div className="inline-flex items-center px-3 py-2 rounded-full bg-white/10 border border-white/20 w-38 h-10 animate-pulse"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        
      </>
    );
  }

  return (
    <>

        <div className="bg-[#1d8d84] min-h-screen">
          <div className="container mx-auto px-1 sm:px-3">
            <div className="flex justify-center">
              <div className="w-full">
                <div className="p-2 sm:p-3">
                  {/* VICTORY Header */}
                  <div className="text-center mb-3 md:mb-4">
                    <div className="inline-block relative w-1/2">
                      <div className="relative p-3 sm:p-4 rounded-2xl border border-white/30 bg-white/20">
                        <div className="flex items-center justify-center mb-3">
                          <Crown size={window.innerWidth < 576 ? 24 : 32} className="mr-2 text-white" />
                          <h1 className="text-2xl sm:text-4xl font-bold text-white">
                            VICTORY
                          </h1>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Stats Cards Row */}
                  <div className="grid grid-cols-2 gap-2 sm:gap-3 mb-3 md:mb-4">
                    <div className="stat-card text-center text-white p-2 sm:p-3 rounded-lg bg-white/20 border border-white/30 min-h-[70px] sm:min-h-[80px] cursor-pointer transition-all duration-300 hover:transform hover:-translate-y-1 hover:scale-105 hover:bg-white/25 hover:border-white/40">
                      <div className="mb-1">
                        <Crown size={window.innerWidth < 576 ? 16 : 20} className="text-white mx-auto" />
                      </div>
                      <div>
                        <p className="text-xs sm:text-sm font-medium mb-0 text-white/80">Levels Achieved</p>
                        <p className="text-base sm:text-xl font-bold mb-0">{data.earnings.completedLevels}</p>
                      </div>
                    </div>

                    <div className="stat-card text-center text-white p-2 sm:p-3 rounded-lg bg-white/20 border border-white/30 min-h-[70px] sm:min-h-[80px] cursor-pointer transition-all duration-300 hover:transform hover:-translate-y-1 hover:scale-105 hover:bg-white/25 hover:border-white/40">
                      <div className="mb-1">
                        <Clock size={window.innerWidth < 576 ? 16 : 20} className="text-white mx-auto" />
                      </div>
                      <div>
                        <p className="text-xs sm:text-sm font-medium mb-0 text-white/80">Time Left</p>
                        <p className="text-base sm:text-xl font-bold mb-0">{data.validityWindow.hoursRemaining}h</p>
                      </div>
                    </div>
                  </div>

                  {allLevelsCompleted ? (
                    <div className="mb-4 text-center">
                      <div className="p-4 rounded-xl bg-white/25 border-2 border-white/40 overflow-hidden">
                        <div className="relative">
                          <h3 className="text-3xl font-bold text-white mb-2 drop-shadow-lg">
                            You've done it!
                          </h3>
                          <p className="text-lg font-medium text-gray-200 mb-0">
                            {encouragingMessage}
                          </p>
                          <Gift size={36} className="mt-3 text-white mx-auto" />
                        </div>
                      </div>
                    </div>
                  ) : (
                    nextLevel && (
                      <div className="mb-4">
                        <div className={`next-level-card relative p-4 rounded-xl overflow-hidden cursor-pointer transition-all duration-400 hover:transform hover:-translate-y-1.5 ${
                          nextLevel.status === 'active'
                            ? 'bg-white/25 border-2 border-white/40'
                            : nextLevel.status === 'pending'
                              ? 'bg-white/20 border-2 border-white/35'
                              : 'bg-white/20 border-2 border-white/30'
                        }`}>
                          {/* Animated background effect */}
                          <div className={`absolute top-0 left-0 w-full h-full animate-pulse ${
                            nextLevel.status === 'active'
                              ? 'bg-white/5'
                              : nextLevel.status === 'pending'
                                ? 'bg-white/3'
                                : 'bg-white/3'
                          }`}></div>

                          <div className="relative">
                            {/* Encouraging Message */}
                            <div className="text-center mb-3">
                              <p className="font-medium mb-2 text-white text-base drop-shadow-sm">
                                {encouragingMessage}
                              </p>
                            </div>

                            {/* Level Info */}
                            <div className="flex items-center justify-between mb-3">
                              <div className="flex items-center">
                                <div>
                                  <h3 className="text-xl font-bold text-white mb-1">
                                    {nextLevel.status === 'active' && " Complete Now: "}
                                    {nextLevel.status === 'pending' && " In Progress: "}
                                    {nextLevel.status === 'locked' && " Up Next: "}
                                    {nextLevel.name}
                                  </h3>
                                  <div className="flex items-center">
                                    <span className={`px-2 py-1 rounded-full font-medium mr-2 text-xs ${getStatusStyles(nextLevel.status)}`}>
                                      {nextLevel.status}
                                    </span>
                                    {nextLevel.commissionRate && (
                                      <span className={`font-bold text-sm text-white`}>
                                        {nextLevel.commissionRate} Commission
                                      </span>
                                    )}
                                  </div>
                                </div>
                              </div>
                              <ChevronRight
                                size={28}
                                className={`${
                                  nextLevel.status === 'active' ? 'text-white animate-bounce' : 'text-white'
                                } cursor-pointer`}
                                onClick={() => setShowReferralModal(true)}
                              />
                            </div>

                            {/* Earnings and Progress Info */}
                            <div className="grid grid-cols-2 gap-3">
                              <div className="text-center">
                                <span className="font-bold text-white text-xl block">
                                  ₹{nextLevel.commissionRate || ''}
                                </span>
                                <span className="text-sm text-white/80">
                                  Potential Earnings
                                </span>
                              </div>
                              <div className="text-center">
                                <span className="font-bold text-white text-xl block">
                                  {completedCount}/{data.progress.totalTasks}
                                </span>
                                <span className="text-sm text-white/80">
                                  Levels Complete
                                </span>
                              </div>
                            </div>

                            {/* Action Button */}
                            {nextLevel.status === 'active' && (
                              <div className="text-center mt-3">
                                <button className="btn font-bold px-4 py-2 rounded-full bg-white text-[#1d8d84] border-none text-base transition-all duration-300 hover:transform hover:-translate-y-0.5 hover:bg-gray-100">
                                  🚀 Complete Level Now!
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    )
                  )}

                  {/* Leaderboard */}
                  <div>
                    <h2 className="text-lg md:text-xl font-bold text-white mb-3 text-center">Leaderboard</h2>

                    {data.leaderboard.map((player) => (
                      <div
                        key={player.id}
                        className={`leaderboard-item flex items-center p-2 sm:p-3 rounded-lg mb-2 cursor-pointer transition-all duration-300 hover:transform hover:translate-x-2 hover:-translate-y-0.5 hover:bg-white/15 hover:border-white/40 ${
                          player.status === 'completed'
                            ? 'bg-white/25 border-2 border-white/40 transform scale-102'
                            : player.originalIndex === 0
                              ? 'bg-white/20 border border-white/35'
                              : 'bg-white/15 border border-white/30'
                        } ${
                          player.status === 'locked' ? 'opacity-70 blur-[1px]' : 'opacity-100'
                        }`}
                      >
                        <div className={`flex items-center justify-center rounded-full mr-2 sm:mr-3 w-8 h-8 sm:w-10 sm:h-10 ${
                          player.status === 'completed'
                            ? 'bg-white/30'
                            : player.originalIndex === 0 ? 'bg-white/25' : 'bg-white/20'
                        }`}>
                          <div className="flex items-center">
                            {getRankIcon(player.originalIndex + 1, player.status)}
                            <span className="font-bold text-white ml-1 text-xs sm:text-sm">{player.originalIndex + 1}</span>
                          </div>
                        </div>

                        <div className="flex-grow">
                          <div className="flex items-center justify-between">
                            <div className="flex-grow mr-2">
                              <h3 className="font-semibold text-white mb-1 text-sm sm:text-base">
                                {player.name}
                              </h3>
                              <div className="flex items-center flex-wrap">
                                {player.commissionRate && (
                                  <span className={`mr-2 font-bold text-xs sm:text-sm text-white`}>
                                    {player.commissionRate}
                                  </span>
                                )}
                                <span className={`px-2 py-1 rounded-full font-medium text-xs ${getStatusStyles(player.status)}`}>
                                  {player.status}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {error && (
                    <div className="bg-red-500/20 border border-red-500 text-red-200 px-4 py-3 rounded-lg mt-3" role="alert">
                      Error loading data: {error.message || 'Something went wrong'}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        {(isLoading) && <Loader />}
      

      {showReferralModal && (
        <ReferralModal
          show={showReferralModal}
          onHide={() => setShowReferralModal(false)}
          userData={apiData}
        />
      )}
    </>
  );
};

export default VictoryLeaderboard;