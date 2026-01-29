// Dashboard.jsx
import React, { useState } from "react";
import { useDashboardApiDetailsQuery } from "./dashboardapiApiSlice";

export default function Dashboard() {
  const { data, isLoading, isError, refetch } = useDashboardApiDetailsQuery();
  const [copiedField, setCopiedField] = useState(null);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-50 to-white flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-teal-200 rounded-full"></div>
            <div className="w-16 h-16 border-4 border-teal-600 border-t-transparent rounded-full animate-spin absolute top-0 left-0"></div>
          </div>
          <p className="text-teal-600 font-medium text-lg">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-50 to-white flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-2xl shadow-xl border border-red-100 text-center max-w-md w-full">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">Failed to Load Dashboard</h2>
          <p className="text-gray-500 mb-6">Something went wrong while fetching your data.</p>
          <button 
            onClick={refetch}
            className="px-6 py-3 bg-teal-600 text-white rounded-xl font-medium hover:bg-teal-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // ✅ Correct path: data.data.user
  const user = data?.data?.user || {};
  const welcomeBonusLogs = data?.data?.welcomeBonusLogs || {};

  const handleCopy = (text, fieldName) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-teal-50">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-teal-600 via-teal-500 to-cyan-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            {/* Profile Image */}
            <div className="relative">
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-white p-1.5 shadow-xl">
                <img
                  src={user.profile || "https://via.placeholder.com/112"}
                  alt="Profile"
                  className="w-full h-full rounded-full object-cover"
                  onError={(e) => {
                    e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name || 'User')}&background=0d9488&color=fff&size=112`;
                  }}
                />
              </div>
              {user.isVerified && (
                <div className="absolute -bottom-1 -right-1 w-9 h-9 bg-emerald-500 rounded-full flex items-center justify-center border-4 border-teal-500 shadow-lg">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              )}
            </div>

            {/* User Info */}
            <div className="text-center sm:text-left flex-1">
              <h1 className="text-2xl sm:text-3xl font-bold text-white">{user.name || "User"}</h1>
              <p className="text-teal-100 mt-1 font-medium">@{user.username || "username"}</p>
              <p className="text-teal-200 text-sm mt-1 flex items-center justify-center sm:justify-start gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                {user.email}
              </p>
            </div>

            {/* Status Badges */}
            <div className="flex flex-wrap justify-center gap-2">
              <StatusBadge 
                active={user.isActive} 
                label={user.isActive ? "Active" : "Inactive"} 
                type="status"
              />
              <StatusBadge 
                active={user.isVerified} 
                label={user.isVerified ? "Verified" : "Unverified"} 
                type="verified"
              />
              <StatusBadge 
                active={!user.isBlock} 
                label={user.isBlock ? "Blocked" : "Not Blocked"} 
                type="block"
              />
            </div>
          </div>
        </div>

        {/* Wave Divider */}
        <div className="h-6 bg-gradient-to-br from-teal-50 via-white to-teal-50" style={{
          clipPath: 'ellipse(70% 100% at 50% 100%)'
        }}></div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        
        {/* Balance Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8">
          <BalanceCard 
            icon={
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
            }
            title="Wallet Balance"
            value={user.walletBalance || 0}
            prefix="₹"
            subtitle="Available balance"
            gradient="from-teal-500 to-teal-400"
          />
          <BalanceCard 
            icon={
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            }
            title="INR Balance"
            value={user.Inr || 0}
            prefix="₹"
            subtitle="Trading balance"
            gradient="from-emerald-500 to-teal-400"
          />
          <BalanceCard 
            icon={
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            }
            title="Tokens"
            value={user.tokens || 0}
            subtitle="Total tokens owned"
            gradient="from-cyan-500 to-teal-400"
          />
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 mb-8">
          <StatCard 
            icon={<UserGroupIcon />}
            label="Referrals"
            value={user.referenceCount || 0}
          />
          <StatCard 
            icon={<GiftIcon />}
            label="Super Bonus"
            value={`₹${user.super_bonus || 0}`}
          />
          <StatCard 
            icon={<ShoppingBagIcon />}
            label="Ordered Coins"
            value={user.totalOrderedCoins || 0}
          />
          <StatCard 
            icon={<LockIcon />}
            label="Freezed INR"
            value={`₹${user.freezed_inr || 0}`}
          />
          <StatCard 
            icon={<TokenIcon />}
            label="Freezed Tokens"
            value={user.freezed_token || 0}
          />
          <StatCard 
            icon={<CashIcon />}
            label="Commission"
            value={`₹${user.withdraw_commission || 0}`}
          />
        </div>

        {/* Info Cards Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Personal Information */}
          <InfoCard title="Personal Information" icon={<UserIcon />}>
            <InfoRow 
              label="Full Name" 
              value={user.name} 
            />
            <InfoRow 
              label="Email" 
              value={user.email}
              onCopy={() => handleCopy(user.email, 'email')}
              copied={copiedField === 'email'}
            />
            <InfoRow 
              label="Phone" 
              value={user.phone ? `+${user.countryCode || ''} ${user.phone}` : 'N/A'}
            />
            <InfoRow 
              label="Location" 
              value={[user.city, user.state, user.country].filter(Boolean).join(', ') || 'N/A'}
            />
            <InfoRow 
              label="Username" 
              value={user.username}
              onCopy={() => handleCopy(user.username, 'username')}
              copied={copiedField === 'username'}
            />
            <InfoRow 
              label="Reference ID" 
              value={user.referenceId ? `${user.referenceId.slice(0, 20)}...` : 'N/A'}
              fullValue={user.referenceId}
              onCopy={() => handleCopy(user.referenceId, 'refId')}
              copied={copiedField === 'refId'}
            />
          </InfoCard>

          {/* Wallet & Security */}
          <InfoCard title="Wallet & Security" icon={<WalletIcon />}>
            <InfoRow 
              label="Wallet Address" 
              value={user.walletadress ? `${user.walletadress.slice(0, 8)}...${user.walletadress.slice(-6)}` : 'N/A'}
              fullValue={user.walletadress}
              onCopy={() => handleCopy(user.walletadress, 'wallet')}
              copied={copiedField === 'wallet'}
            />
            <InfoRow 
              label="Wallet Balance" 
              value={`₹${user.walletBalance || 0}`}
            />
            <InfoRow 
              label="Reference Earnings" 
              value={`₹${user.referenceInr || 0}`}
            />
            <InfoRow 
              label="Member Since" 
              value={user.createdAt ? new Date(user.createdAt).toLocaleDateString('en-IN', {
                day: 'numeric',
                month: 'short',
                year: 'numeric'
              }) : 'N/A'}
            />
            
            {/* Security Status */}
            <div className="pt-4 mt-2 border-t border-gray-100">
              <p className="text-xs text-gray-500 uppercase tracking-wide mb-3">Security Status</p>
              <div className="flex flex-wrap gap-2">
                <SecurityBadge 
                  enabled={user.twoFactorEnabled} 
                  label="2FA"
                />
                <SecurityBadge 
                  enabled={user.isVerified} 
                  label="KYC"
                />
                <SecurityBadge 
                  enabled={user.isMiniKycVerified} 
                  label="Mini KYC"
                />
                <SecurityBadge 
                  enabled={!user.accountLocked} 
                  label="Account"
                />
              </div>
            </div>
          </InfoCard>
        </div>

        {/* Additional Info Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Wealth Plan Status */}
          <div className="bg-white rounded-2xl shadow-lg border border-teal-100 overflow-hidden">
            <div className="px-6 py-4 bg-gradient-to-r from-teal-500 to-cyan-500">
              <h3 className="text-white font-semibold flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
                Wealth Plan
              </h3>
            </div>
            <div className="p-6 space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-500 text-sm">Plan 1</span>
                <span className="font-semibold text-gray-800">₹{user.totalWealthPlanCollectedAmount || 0}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 text-sm">Plan 2</span>
                <span className="font-semibold text-gray-800">₹{user.totalWealthPlanCollectedAmount_2 || 0}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 text-sm">Plan 3</span>
                <span className="font-semibold text-gray-800">₹{user.totalWealthPlanCollectedAmount_3 || 0}</span>
              </div>
            </div>
          </div>

          {/* Bonuses */}
          <div className="bg-white rounded-2xl shadow-lg border border-teal-100 overflow-hidden">
            <div className="px-6 py-4 bg-gradient-to-r from-emerald-500 to-teal-500">
              <h3 className="text-white font-semibold flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                </svg>
                Bonuses
              </h3>
            </div>
            <div className="p-6 space-y-3">
              <BonusRow 
                label="Registration Bonus" 
                awarded={user.isRegistrationBonusAwarded} 
              />
              <BonusRow 
                label="Foundation Bonus" 
                awarded={user.foundationBonusAwarded} 
              />
              <BonusRow 
                label="Promoter Badge" 
                awarded={user.claimedPromoterBadge} 
              />
              <BonusRow 
                label="Goa Trip Eligible" 
                awarded={user.isElegibleForGoaTrip} 
              />
            </div>
          </div>

          {/* Welcome Bonus Logs */}
          <div className="bg-white rounded-2xl shadow-lg border border-teal-100 overflow-hidden">
            <div className="px-6 py-4 bg-gradient-to-r from-cyan-500 to-teal-500">
              <h3 className="text-white font-semibold flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Welcome Bonus Logs
              </h3>
            </div>
            <div className="p-6">
              {welcomeBonusLogs.logs?.length > 0 ? (
                <div className="space-y-2">
                  {welcomeBonusLogs.logs.map((log, index) => (
                    <div key={index} className="p-3 bg-gray-50 rounded-lg text-sm">
                      {log.description || 'Bonus log entry'}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <p className="text-gray-500">No bonus logs yet</p>
                  <p className="text-xs text-gray-400 mt-1">Total: {welcomeBonusLogs.total || 0}</p>
                </div>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

// ============ COMPONENT DEFINITIONS ============

// Status Badge Component
function StatusBadge({ active, label, type }) {
  const getColors = () => {
    if (type === 'status') {
      return active 
        ? 'bg-emerald-500 text-white' 
        : 'bg-white/20 text-white backdrop-blur-sm';
    }
    if (type === 'verified') {
      return active 
        ? 'bg-white text-teal-600' 
        : 'bg-yellow-400 text-yellow-900';
    }
    if (type === 'block') {
      return active 
        ? 'bg-teal-400/30 text-white' 
        : 'bg-red-500 text-white';
    }
    return 'bg-white/20 text-white';
  };

  return (
    <span className={`px-4 py-2 rounded-full text-sm font-medium ${getColors()}`}>
      {label}
    </span>
  );
}

// Balance Card Component
function BalanceCard({ icon, title, value, prefix = '', subtitle, gradient }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-teal-100 overflow-hidden hover:shadow-xl transition-shadow">
      <div className={`bg-gradient-to-r ${gradient} p-4`}>
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center text-white">
            {icon}
          </div>
          <span className="text-white font-medium">{title}</span>
        </div>
      </div>
      <div className="p-6">
        <p className="text-3xl font-bold text-gray-800">
          {prefix}{typeof value === 'number' ? value.toLocaleString() : value}
        </p>
        <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
      </div>
    </div>
  );
}

// Stat Card Component
function StatCard({ icon, label, value }) {
  return (
    <div className="bg-white rounded-xl p-4 shadow-md border border-teal-100 hover:shadow-lg hover:border-teal-200 transition-all">
      <div className="flex flex-col items-center text-center gap-2">
        <div className="w-10 h-10 bg-gradient-to-br from-teal-100 to-cyan-100 rounded-lg flex items-center justify-center text-teal-600">
          {icon}
        </div>
        <div>
          <p className="text-xs text-gray-500 uppercase tracking-wide">{label}</p>
          <p className="text-lg font-bold text-gray-800">{value}</p>
        </div>
      </div>
    </div>
  );
}

// Info Card Component
function InfoCard({ title, icon, children }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-teal-100 overflow-hidden">
      <div className="px-6 py-4 border-b border-teal-100 bg-gradient-to-r from-teal-50 to-cyan-50">
        <h2 className="text-lg font-semibold text-teal-800 flex items-center gap-2">
          <span className="text-teal-600">{icon}</span>
          {title}
        </h2>
      </div>
      <div className="p-6 space-y-3">
        {children}
      </div>
    </div>
  );
}

// Info Row Component
function InfoRow({ label, value, fullValue, onCopy, copied }) {
  return (
    <div className="flex justify-between items-center py-2 border-b border-gray-50 last:border-0">
      <span className="text-sm text-gray-500">{label}</span>
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium text-gray-800 text-right max-w-[180px] truncate" title={fullValue || value}>
          {value || "-"}
        </span>
        {onCopy && value && value !== 'N/A' && (
          <button 
            onClick={onCopy}
            className={`p-1.5 rounded-lg transition-all ${
              copied 
                ? 'bg-emerald-100 text-emerald-600' 
                : 'hover:bg-teal-100 text-teal-600'
            }`}
            title={copied ? 'Copied!' : 'Copy to clipboard'}
          >
            {copied ? (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            ) : (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            )}
          </button>
        )}
      </div>
    </div>
  );
}

// Security Badge Component
function SecurityBadge({ enabled, label }) {
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium ${
      enabled 
        ? 'bg-emerald-100 text-emerald-700' 
        : 'bg-amber-100 text-amber-700'
    }`}>
      {enabled ? (
        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
      ) : (
        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
        </svg>
      )}
      {label}
    </span>
  );
}

// Bonus Row Component
function BonusRow({ label, awarded }) {
  return (
    <div className="flex justify-between items-center">
      <span className="text-sm text-gray-600">{label}</span>
      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
        awarded 
          ? 'bg-emerald-100 text-emerald-700' 
          : 'bg-gray-100 text-gray-500'
      }`}>
        {awarded ? '✓ Awarded' : 'Pending'}
      </span>
    </div>
  );
}

// Action Button Component
function ActionButton({ icon, label, onClick }) {
  return (
    <button 
      onClick={onClick}
      className="flex flex-col items-center justify-center gap-2 p-4 bg-white rounded-xl shadow-md border border-teal-100 hover:bg-gradient-to-br hover:from-teal-50 hover:to-cyan-50 hover:border-teal-300 hover:shadow-lg transition-all group"
    >
      <div className="w-12 h-12 bg-gradient-to-br from-teal-100 to-cyan-100 rounded-full flex items-center justify-center text-teal-600 group-hover:from-teal-500 group-hover:to-cyan-500 group-hover:text-white transition-all">
        {icon}
      </div>
      <span className="text-sm font-medium text-gray-700 group-hover:text-teal-700">{label}</span>
    </button>
  );
}

// ============ ICON COMPONENTS ============

function UserIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  );
}

function WalletIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
  );
}

function UserGroupIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
  );
}

function GiftIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
    </svg>
  );
}

function ShoppingBagIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
    </svg>
  );
}

function TokenIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
    </svg>
  );
}

function CashIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
  );
}
