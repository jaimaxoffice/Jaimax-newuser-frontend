
import React from 'react';
import { 
  useGetWeekInfoQuery, 
  useGetUserWeeklyBonusJourneyQuery 
} from './referralApiSlice';
import { 
  Calendar, 
  TrendingUp, 
  Gift, 
  Award, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  Users,
  Target,
  Trophy,
  Star,
  Zap
} from 'lucide-react';
import Loader from "../../../../ReusableComponents/Loader/loader"

function WeeklyBonusComponent() {
  const { data: weekInfo, isLoading: weekLoading, isError: weekError } = useGetWeekInfoQuery();
  const { data: bonusJourney, isLoading: journeyLoading, isError: journeyError } = useGetUserWeeklyBonusJourneyQuery();

  if (weekLoading || journeyLoading) {
    return <Loader />;
  }

  if (weekError || journeyError) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-teal-50 to-white p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full border-l-4 border-red-500">
          <div className="flex items-center gap-3 mb-4">
            <AlertCircle className="w-8 h-8 text-red-500 flex-shrink-0" />
            <h2 className="text-lg font-bold text-gray-900">Something went wrong</h2>
          </div>
          <p className="text-gray-600 text-sm">Unable to load your bonus information. Please try again later.</p>
        </div>
      </div>
    );
  }

  const journeyData = bonusJourney?.data;
  const levelProgress = journeyData?.levelProgress || [];
  const totalRefs = journeyData?.totalRefs || 0;
  const weekNumber = journeyData?.weekNumber || 0;

  const achievedLevels = levelProgress.filter(level => level.achieved).length;
  const rewardedLevels = levelProgress.filter(level => level.rewarded).length;
  const totalPossibleBonus = levelProgress.reduce((sum, level) => sum + level.bonus, 0);
  const earnedBonus = levelProgress.filter(level => level.rewarded).reduce((sum, level) => sum + level.bonus, 0);

  const weekStart = journeyData?.weekStart 
    ? new Date(journeyData.weekStart).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) 
    : '';
  const weekEnd = journeyData?.weekEnd 
    ? new Date(journeyData.weekEnd).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) 
    : '';

  // Find next unclaimed level
  const nextLevel = levelProgress.find(l => l.achieved && !l.rewarded);

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-teal-50 py-6 md:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        {/* <div className="text-center mb-8 md:mb-12">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-teal-600 to-teal-700 rounded-full mb-4 shadow-lg">
            <Gift className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Weekly Bonus Challenge
          </h1>
          <p className="text-gray-600 text-sm md:text-base">Earn rewards by completing referral levels</p>
        </div> */}

        {/* Week Info Card */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-teal-600 to-teal-500 rounded-2xl shadow-xl p-6 md:p-8 text-white overflow-hidden relative">
            {/* Background pattern */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -mr-20 -mt-20"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full -ml-16 -mb-16"></div>

            <div className="relative z-10">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                {/* Week Info */}
                <div className="flex items-center gap-4">
                  <div className="bg-white/20 backdrop-blur-md rounded-xl p-3 flex-shrink-0">
                    <Calendar className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-teal-100 text-xs font-semibold uppercase tracking-wider">Week Number</p>
                    <h2 className="text-2xl md:text-3xl font-bold mt-1">Week {weekNumber}</h2>
                    <p className="text-teal-100 text-xs mt-1">{weekStart} - {weekEnd}</p>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-3 md:gap-4">
                  <div className="bg-white/15 backdrop-blur-md rounded-xl px-4 py-3 text-center">
                    <p className="text-teal-100 text-xs font-medium mb-1 flex items-center justify-center gap-1">
                      <Users className="w-4 h-4" /> Referrals
                    </p>
                    <p className="font-bold text-2xl">{totalRefs}</p>
                  </div>
                  <div className="bg-white/15 backdrop-blur-md rounded-xl px-4 py-3 text-center">
                    <p className="text-teal-100 text-xs font-medium mb-1 flex items-center justify-center gap-1">
                      <Trophy className="w-4 h-4" /> 
                      Earned
                    </p>
                    <p className="font-bold text-2xl">{earnedBonus}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Summary Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard 
            icon={<Target className="w-5 h-5" />}
            title="Total Levels"
            value={levelProgress.length}
            color="teal"
          />
          <StatCard 
            icon={<CheckCircle2 className="w-5 h-5" />}
            title="Achieved"
            value={achievedLevels}
            color="green"
          />
          <StatCard 
            icon={<Trophy className="w-5 h-5" />}
            title="Claimed"
            value={rewardedLevels}
            color="blue"
          />
          <StatCard 
            icon={<Star className="w-5 h-5" />}
            title="Max Bonus"
            value={`${totalPossibleBonus}`}
            color="amber"
          />
        </div>

        {/* Next Level Alert */}
        {nextLevel && (
          <div className="mb-8 p-4 bg-gradient-to-r from-amber-50 to-orange-50 border-l-4 border-amber-500 rounded-lg flex items-start gap-3">
            {/* <Zap className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" /> */}
            <div>
              <p className="font-semibold text-amber-900">Ready to claim!</p>
              <p className="text-sm text-amber-800">Level {nextLevel.level} is achieved. Claim your {nextLevel.bonus} bonus now!</p>
            </div>
          </div>
        )}

        {/* Level Progress Grid */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            {/* <TrendingUp className="w-6 h-6 text-teal-600" /> */}
            Your Levels
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {levelProgress.map((level) => (
              <LevelCard 
                key={level.level} 
                level={level} 
                totalRefs={totalRefs}
              />
            ))}
          </div>
        </div>

        {/* Timeline */}
        {levelProgress.some(l => l.achieved || l.rewarded) && (
          <ProgressTimeline levels={levelProgress} totalRefs={totalRefs} />
        )}
      </div>
    </div>
  );
}

function LevelCard({ level, totalRefs }) {
  const displayRefs = Math.min(totalRefs, level.maxRefsRequired);
  const progress = Math.min((totalRefs / level.maxRefsRequired) * 100, 100);
  
  const isAchieved = level.achieved;
  const isRewarded = level.rewarded;
  const isUnlocked = totalRefs >= level.maxRefsRequired;

  return (
    <div className={`relative rounded-xl overflow-hidden transition-all duration-300 ${
      isRewarded 
        ? 'bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-300 shadow-lg ring-2 ring-green-100' 
        : isAchieved
        ? 'bg-gradient-to-br from-teal-50 to-cyan-50 border-2 border-teal-300 shadow-lg ring-2 ring-teal-100'
        : 'bg-white border border-gray-200 shadow-md hover:shadow-lg'
    } ${isRewarded ? 'scale-105' : ''}`}>
      
      {/* Top accent bar */}
      <div className={`h-1 ${
        isRewarded ? 'bg-gradient-to-r from-green-400 to-emerald-500' :
        isAchieved ? 'bg-gradient-to-r from-teal-400 to-cyan-500' : 
        'bg-gray-300'
      }`}></div>

      <div className="p-5 md:p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className={`p-2.5 rounded-lg flex-shrink-0 ${
            isRewarded ? 'bg-green-100' :
            isAchieved ? 'bg-teal-100' : 
            'bg-gray-100'
          }`}>
            {isRewarded ? (
              <Trophy className="w-5 h-5 text-green-600" />
            ) : isAchieved ? (
              <CheckCircle2 className="w-5 h-5 text-teal-600" />
            ) : (
              <Target className="w-5 h-5 text-gray-500" />
            )}
          </div>
          
          <div className="text-right">
            <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-bold ${
              isRewarded ? 'bg-green-100 text-green-700' :
              isAchieved ? 'bg-teal-100 text-teal-700' : 
              'bg-gray-100 text-gray-600'
            }`}>
              {isRewarded ? '✓ Claimed' : isAchieved ? ' Ready' : 'Locked'}
            </span>
            <p className="text-xs text-gray-500 font-medium mt-1">Level {level.level}</p>
          </div>
        </div>

        {/* Referral Info */}
        <div className="mb-4">
          <div className="flex items-baseline gap-1 mb-2">
            <span className="text-2xl font-bold text-gray-900">{displayRefs}</span>
            <span className="text-xs text-gray-500">/ {level.maxRefsRequired}</span>
          </div>
          
          {/* Progress bar */}
          <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
            <div 
              className={`h-full rounded-full transition-all duration-500 ${
                isAchieved ? 'bg-gradient-to-r from-teal-500 to-cyan-500' : 'bg-gray-400'
              }`}
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <div className="mt-1.5 text-right">
            <span className="text-xs font-medium text-gray-600">{Math.round(progress)}%</span>
          </div>
        </div>

        {/* Reward */}
        <div className="pt-3 border-t border-gray-200 flex items-center justify-between">
          <span className="text-xs font-medium text-gray-600">Bonus</span>
          <span className="text-lg font-bold text-teal-600">{level.bonus}</span>
        </div>

        {/* Achievement badge */}
        {isRewarded && level.rewardedAt && (
          <div className="mt-3 pt-3 border-t border-green-200 text-xs text-green-700 font-medium">
            ✓ Claimed {new Date(level.rewardedAt).toLocaleDateString()}
          </div>
        )}
      </div>
    </div>
  );
}

function ProgressTimeline({ levels, totalRefs }) {
  const completedLevels = levels.filter(l => l.rewarded);
  
  if (completedLevels.length === 0) return null;

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 border border-gray-100">
      <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
        <Award className="w-5 h-5 text-teal-600" />
        Achievements
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {completedLevels.map((level) => (
          <div key={level.level} className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-4 border border-green-200">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-bold text-gray-900">Level {level.level} Completed</p>
                <p className="text-xs text-gray-600 mt-1">{level.maxRefsRequired} referrals</p>
              </div>
              <Trophy className="w-5 h-5 text-green-600 flex-shrink-0" />
            </div>
            <p className="text-lg font-bold text-green-600 mt-2">${level.bonus}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function StatCard({ icon, title, value, color }) {
  const colorClasses = {
    teal: 'bg-teal-50 text-teal-700 border-teal-200',
    green: 'bg-green-50 text-green-700 border-green-200',
    blue: 'bg-blue-50 text-blue-700 border-blue-200',
    amber: 'bg-amber-50 text-amber-700 border-amber-200',
  };

  const iconClasses = {
    teal: 'bg-teal-100 text-teal-600',
    green: 'bg-green-100 text-green-600',
    blue: 'bg-blue-100 text-blue-600',
    amber: 'bg-amber-100 text-amber-600',
  };

  return (
    <div className={`rounded-lg p-4 border ${colorClasses[color]} transition-all hover:shadow-md`}>
      <div className="flex items-center gap-3">
        <div className={`p-2 rounded-lg ${iconClasses[color]} flex-shrink-0`}>
          {icon}
        </div>
        <div className="min-w-0">
          <p className={`text-xs font-medium ${color === 'teal' ? 'text-teal-600' : color === 'green' ? 'text-green-600' : color === 'blue' ? 'text-blue-600' : 'text-amber-600'}`}>{title}</p>
          <p className="text-xl font-bold text-gray-900 mt-0.5">{value}</p>
        </div>
      </div>
    </div>
  );
}

export default WeeklyBonusComponent;