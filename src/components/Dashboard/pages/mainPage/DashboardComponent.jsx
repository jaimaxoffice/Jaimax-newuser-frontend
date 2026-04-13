import React, { useState, useEffect, useMemo } from "react";
import {
  useCreateMineWalletMutation,
  useGetMineWalletDetailsQuery,
  useMineJMCMutation,
  useGetSlotsInfoQuery,
  useGetTodayMineInfoQuery,
  useGetUserMineLogsQuery,
  useGetUserWalletTxsQuery,
  useGetUserReferralBonusQuery,
} from "./dashboardApiSlice";
import { toast } from "react-toastify";
import {
  Pickaxe,
  RefreshCw,
  Wallet,
  ClipboardList,
  Users,
  Clock,
  Gem,
  Zap,
  X,
  AlertTriangle,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  TrendingDown,
  Shield,
  Lightbulb,
  BarChart3,
  Gift,
  Loader2,
  ArrowRightLeft,
  Plus,
  CircleDot,
} from "lucide-react";

// ─── Circular Progress Component ─────────────────────────────
const CircularProgress = ({ progress = 0, size = 120, strokeWidth = 6, isActive = false, isMining = false, children }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg
        width={size}
        height={size}
        className={isMining ? 'animate-spin' : ''}
        style={!isMining ? { transform: 'rotate(-90deg)' } : undefined}
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={isActive ? 'rgba(255,255,255,0.15)' : '#e2e8f0'}
          strokeWidth={strokeWidth}
        />
        {!isMining && (
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={isActive ? 'rgba(255,255,255,0.8)' : '#14b8a6'}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            className="transition-all duration-1000 linear"
          />
        )}
        {isMining && (
          <>
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              stroke="#2dd4bf"
              strokeWidth={strokeWidth}
              strokeDasharray={`${circumference * 0.25} ${circumference * 0.75}`}
              strokeLinecap="round"
              opacity="0.8"
            />
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius - strokeWidth - 2}
              fill="none"
              stroke="#5eead4"
              strokeWidth={strokeWidth / 2}
              strokeDasharray={`${circumference * 0.15} ${circumference * 0.85}`}
              strokeLinecap="round"
              opacity="0.5"
            />
          </>
        )}
      </svg>
      <div className="absolute flex items-center justify-center">
        {children}
      </div>
    </div>
  );
};

// ─── Animated Circular Timer ─────────────────────────────────
const CircularTimer = ({ progress = 0, size = 80, isActive = false }) => {
  const strokeWidth = 5;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        <circle
          cx={size / 2} cy={size / 2} r={radius}
          fill="none"
          stroke={isActive ? 'rgba(255,255,255,0.12)' : '#e2e8f0'}
          strokeWidth={strokeWidth}
        />
        <circle
          cx={size / 2} cy={size / 2} r={radius}
          fill="none"
          stroke={isActive ? 'rgba(255,255,255,0.75)' : '#14b8a6'}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-1000 linear"
        />
      </svg>
      <div className="absolute flex items-center justify-center flex-col">
        <span className={`font-mono font-bold ${isActive ? 'text-white' : 'text-teal-600'}`} style={{ fontSize: size * 0.22 }}>
          {progress.toFixed(0)}%
        </span>
      </div>
    </div>
  );
};

// ─── Slot Timer Hook ─────────────────────────────────────────
const useSlotTimer = (slots) => {
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0, progress: 0 });
  const [currentSlot, setCurrentSlot] = useState(null);
  const [nextSlot, setNextSlot] = useState(null);

  useEffect(() => {
    if (!slots || slots.length === 0) return;

    const tick = () => {
      const now = new Date();
      const nowH = now.getHours();
      const nowM = now.getMinutes();
      const nowS = now.getSeconds();
      const nowMins = nowH * 60 + nowM;

      let active = null;
      let upcoming = null;

      for (const slot of slots) {
        const startMins = slot.startHour * 60;
        const endMins = slot.endHour * 60;
        if (nowMins >= startMins && nowMins < endMins) { active = slot; break; }
      }

      for (const slot of slots) {
        if (nowMins < slot.startHour * 60) { upcoming = slot; break; }
      }
      if (!upcoming) upcoming = slots[0] || null;

      setCurrentSlot(active);
      setNextSlot(active ? (slots[(slots.indexOf(active) + 1) % slots.length] || null) : upcoming);

      if (active) {
        const startMins = active.startHour * 60;
        const endMins = active.endHour * 60;
        const totalSecs = (endMins - startMins) * 60;
        const elapsed = (nowMins - startMins) * 60 + nowS;
        const remaining = Math.max(0, totalSecs - elapsed);
        const progress = totalSecs > 0 ? Math.min(100, (elapsed / totalSecs) * 100) : 0;
        setTimeLeft({ hours: Math.floor(remaining / 3600), minutes: Math.floor((remaining % 3600) / 60), seconds: remaining % 60, progress });
      } else if (upcoming) {
        let waitMins = upcoming.startHour * 60 - nowMins;
        if (waitMins < 0) waitMins += 24 * 60;
        const remaining = Math.max(0, waitMins * 60 - nowS);
        setTimeLeft({ hours: Math.floor(remaining / 3600), minutes: Math.floor((remaining % 3600) / 60), seconds: remaining % 60, progress: 0 });
      }
    };

    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [slots]);

  return { timeLeft, currentSlot, nextSlot };
};

// ─── Helpers ─────────────────────────────────────────────────
const fmt24 = (h) => {
  if (h === 24) return '12:00 AM';
  const suffix = h >= 12 ? 'PM' : 'AM';
  const hh = h % 12 === 0 ? 12 : h % 12;
  return `${hh}:00 ${suffix}`;
};
const pad = (n) => String(n || 0).padStart(2, '0');

// ─── Main Component ───────────────────────────────────────────
const MiningPage = () => {
  const [lastMineLog, setLastMineLog] = useState(null);
  const [showReward, setShowReward] = useState(false);
  const [mineError, setMineError] = useState(null);
  const [activeTab, setActiveTab] = useState('mining');
  const [logsPage, setLogsPage] = useState(1);
  const [txsPage, setTxsPage] = useState(1);
  const [referralPage, setReferralPage] = useState(1);
  const PER_PAGE = 10;

  const { data: walletRes, isLoading: walletLoading, isError: walletErr, refetch: refetchWallet } = useGetMineWalletDetailsQuery();
  const { data: slotsRes, isLoading: slotsLoading, refetch: refetchSlots } = useGetSlotsInfoQuery();
  const { data: todayRes, refetch: refetchToday } = useGetTodayMineInfoQuery(undefined, { skip: !walletRes?.data });
  const { data: logsRes, isLoading: logsLoading, refetch: refetchLogs } = useGetUserMineLogsQuery({ page: logsPage, limit: PER_PAGE }, { skip: !walletRes?.data });
  const { data: txsRes, isLoading: txsLoading, refetch: refetchTxs } = useGetUserWalletTxsQuery({ page: txsPage, limit: PER_PAGE }, { skip: !walletRes?.data });
  const { data: refRes, isLoading: refLoading, refetch: refetchRef } = useGetUserReferralBonusQuery({ page: referralPage, limit: PER_PAGE }, { skip: !walletRes?.data });

  const [createWallet, { isLoading: creating }] = useCreateMineWalletMutation();
  const [mineJMC, { isLoading: mining }] = useMineJMCMutation();

  const wallet = walletRes?.data;
  const slotsData = slotsRes?.data;
  const slots = useMemo(() => slotsData?.slots || [], [slotsData]);

  const { timeLeft, currentSlot, nextSlot } = useSlotTimer(slots);

  useEffect(() => {
    if (!mineError) return;
    const t = setTimeout(() => setMineError(null), 6000);
    return () => clearTimeout(t);
  }, [mineError]);

  useEffect(() => {
    if (activeTab === 'logs') setLogsPage(1);
    if (activeTab === 'transactions') setTxsPage(1);
    if (activeTab === 'referrals') setReferralPage(1);
  }, [activeTab]);

  const handleCreate = async () => {
    try { const r = await createWallet().unwrap(); toast.success(r?.message || 'Wallet created!'); refetchWallet(); }
    catch (e) { toast.error(e?.data?.message || 'Failed to create wallet'); }
  };

  const handleMine = async () => {
    if (!wallet) { toast.warning('Create a wallet first!'); return; }
    setShowReward(false); setLastMineLog(null); setMineError(null);
    try {
      const r = await mineJMC({}).unwrap();
      if (r?.success === 1) {
        setLastMineLog(r?.data?.mineLog); setShowReward(true);
        toast.success(`Mined ${r?.data?.mineLog?.actualReward || 0} JMC!`);
        refetchWallet(); refetchToday(); refetchLogs(); refetchTxs();
      }
    } catch (e) {
      setMineError({ message: e?.data?.message || 'Mining failed. Try again.', code: e?.data?.status_code || 400 });
      toast.error(e?.data?.message || 'Mining failed');
    }
  };

  const refreshAll = () => {
    refetchWallet(); refetchToday(); refetchLogs();
    refetchTxs(); refetchRef(); refetchSlots();
    toast.info('Refreshed');
  };

  const fmtDate = (d) => d ? new Date(d).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' }) : '—';

  const circleState = mining ? 'mining' : mineError ? 'error' : (showReward && lastMineLog) ? 'success' : 'idle';

  const tabs = [
    { id: 'mining', label: 'Mining', Icon: Pickaxe },
    { id: 'logs', label: 'History', Icon: ClipboardList },
    { id: 'transactions', label: 'Wallet', Icon: Wallet },
    { id: 'referrals', label: 'Referrals', Icon: Users },
    { id: 'slots', label: 'Slots', Icon: Clock },
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      {/* Top navbar */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
        {/* <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 h-14 sm:h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-7 h-7 sm:w-9 sm:h-9 bg-gradient-to-br from-teal-500 to-teal-700 rounded-xl flex items-center justify-center text-white shadow-lg shadow-teal-500/30 hover:scale-105 transition-transform">
              <Pickaxe className="w-3.5 h-3.5 sm:w-5 sm:h-5" />
            </div>
            <span className="font-extrabold text-sm sm:text-lg bg-gradient-to-r from-slate-800 to-teal-700 bg-clip-text text-transparent tracking-tight">
              JMC Mining
            </span>
          </div>
          <div className="flex items-center gap-2">
            {wallet && (
              <div className="hidden md:flex font-mono text-xs text-slate-600 bg-gradient-to-br from-teal-50 to-green-50 border border-teal-200/50 rounded-xl px-3 py-1.5 shadow-sm">
                <span className="text-slate-400">Balance </span>
                <span className="font-bold text-teal-700 ml-1">
                  {parseFloat(wallet.totalBalance || 0).toFixed(2)} JMC
                </span>
              </div>
            )}

          </div>
        </div> */}
      </div>

      <div className="max-w-[1100px] mx-auto px-3 sm:px-4 md:px-5 lg:px-6 py-4 sm:py-6 md:py-8 pb-16 sm:pb-20">
        {/* No wallet */}
        {!walletLoading && (walletErr || !wallet) && (
          <div className="bg-white border border-slate-200 rounded-2xl p-8 sm:p-12 md:p-16 text-center shadow-lg">
            <div className="w-20 h-20 sm:w-24 sm:h-24 bg-teal-50 border-2 border-dashed border-teal-300 rounded-full flex items-center justify-center mx-auto mb-6 sm:mb-8">
              <Gem className="w-8 h-8 sm:w-10 sm:h-10 text-teal-500" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-800 mb-3 sm:mb-4">Create Your Mining Wallet</h2>
            <p className="text-slate-400 text-sm sm:text-base mb-8 sm:mb-10 max-w-md mx-auto leading-relaxed">
              Set up your JMC wallet to start earning tokens through daily mining sessions.
            </p>
            <button
              onClick={handleCreate}
              disabled={creating}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-teal-500 to-teal-700 text-white font-bold px-8 sm:px-12 py-3 sm:py-4 rounded-xl hover:shadow-2xl hover:shadow-teal-500/40 transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
            >
              {creating ? <><Loader2 className="w-4 h-4 animate-spin" />Creating…</> : <><Plus className="w-4 h-4" /> Create Wallet</>}
            </button>
          </div>
        )}

        {/* Loading */}
        {walletLoading && <PageSkeleton />}

        {/* Main */}
        {wallet && !walletLoading && (
          <>
            {/* Tab strip */}
            <div className="flex gap-1 border-b border-slate-200 mb-6 sm:mb-8 overflow-x-auto scrollbar-none">
              {tabs.map(t => (
                <button
                  key={t.id}
                  onClick={() => setActiveTab(t.id)}
                  className={`relative flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 md:px-5 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold whitespace-nowrap transition-colors ${activeTab === t.id
                      ? 'text-teal-600'
                      : 'text-slate-400 hover:text-slate-600'
                    }`}
                >
                  <t.Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  {t.label}
                  {activeTab === t.id && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-teal-500 rounded-t-sm" />
                  )}
                </button>
              ))}
            </div>

            {activeTab === 'mining' && (
              <MiningTab
                wallet={wallet} mining={mining} circleState={circleState}
                mineError={mineError} showReward={showReward} lastMineLog={lastMineLog}
                handleMine={handleMine}
                dismissError={() => setMineError(null)}
                dismissReward={() => { setShowReward(false); setLastMineLog(null); }}
                refetchWallet={refetchWallet} fmtDate={fmtDate}
                timeLeft={timeLeft} currentSlot={currentSlot} nextSlot={nextSlot}
                slots={slots} slotsLoading={slotsLoading}
              />
            )}
            {activeTab === 'logs' && <LogsSection data={logsRes?.data} loading={logsLoading} refetch={refetchLogs} page={logsPage} setPage={setLogsPage} fmtDate={fmtDate} />}
            {activeTab === 'transactions' && <TxSection data={txsRes?.data} loading={txsLoading} refetch={refetchTxs} page={txsPage} setPage={setTxsPage} fmtDate={fmtDate} />}
            {activeTab === 'referrals' && <ReferralSection data={refRes?.data} loading={refLoading} refetch={refetchRef} page={referralPage} setPage={setReferralPage} fmtDate={fmtDate} />}
            {activeTab === 'slots' && <SlotsSection slots={slots} currentSlot={currentSlot} timeLeft={timeLeft} loading={slotsLoading} refetch={refetchSlots} slotsData={slotsData} />}
          </>
        )}
      </div>

      {/* Footer */}
      <div className="border-t border-slate-200 py-5 sm:py-6 text-center">
        <span className="font-mono text-[10px] sm:text-xs text-slate-400 tracking-widest">JMC MINING PLATFORM © 2024</span>
      </div>
    </div>
  );
};

// ─── Mining Tab ───────────────────────────────────────────────
const MiningTab = ({ wallet, mining, circleState, mineError, showReward, lastMineLog, handleMine, dismissError, dismissReward, refetchWallet, fmtDate, timeLeft, currentSlot, nextSlot, slots, slotsLoading }) => (
  <>
    <SlotTimer timeLeft={timeLeft} currentSlot={currentSlot} nextSlot={nextSlot} loading={slotsLoading} hasSlots={slots.length > 0} />

    {/* Balance row */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-4 sm:mb-5">
      <BalCard label="Total Balance" value={parseFloat(wallet.totalBalance || 0).toFixed(2)} unit="JMC" primary Icon={Wallet} />
      <BalCard label="Per Mine" value={wallet.perMineJMC || 0} unit="JMC" Icon={Pickaxe} />
      <BalCard label="Lifetime Earned" value={parseFloat(wallet.totalEarnedLifetime || 0).toFixed(2)} unit="JMC" Icon={TrendingUp} />
      <BalCard label="Mining Power" value={wallet.miningPowerPct || 100} unit="%" bar barVal={wallet.miningPowerPct || 100} Icon={Zap} />
    </div>

    {/* Mining console */}
    <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 md:p-12 mb-4 sm:mb-5 text-center shadow-sm">
      {/* Status pill */}
      <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-8 sm:mb-10 border ${circleState === 'error'
          ? 'bg-red-50 border-red-200'
          : circleState === 'success'
            ? 'bg-teal-50 border-teal-200'
            : circleState === 'mining'
              ? 'bg-teal-50 border-teal-300'
              : 'bg-slate-50 border-slate-200'
        }`}>
        <div className={`w-1.5 h-1.5 rounded-full ${circleState === 'error'
            ? 'bg-red-500'
            : circleState === 'success'
              ? 'bg-green-500'
              : 'bg-teal-500'
          } ${circleState === 'mining' ? 'animate-pulse' : ''}`} />
        <span className={`font-mono text-[10px] sm:text-xs tracking-widest uppercase ${circleState === 'error'
            ? 'text-red-600'
            : circleState === 'success'
              ? 'text-teal-700'
              : circleState === 'mining'
                ? 'text-teal-600'
                : 'text-slate-400'
          }`}>
          {circleState === 'mining' ? 'Mining in progress' : circleState === 'error' ? 'Mining failed' : circleState === 'success' ? 'Mine complete' : 'Ready to mine'}
        </span>
      </div>

      {/* Orb with Circular Progress */}
      <div className="flex justify-center mb-8 sm:mb-11">
        <div className="relative inline-flex items-center justify-center">
          {circleState === 'mining' && (
            <>
              <div className="absolute w-40 h-40 sm:w-48 sm:h-48 md:w-52 md:h-52 rounded-full border border-teal-500/25 animate-ping" style={{ animationDuration: '2s' }} />
              <div className="absolute w-40 h-40 sm:w-48 sm:h-48 md:w-52 md:h-52 rounded-full border border-teal-500/25 animate-ping" style={{ animationDuration: '2.5s', animationDelay: '0.5s' }} />
            </>
          )}
          {circleState === 'success' && (
            <div className="absolute w-44 h-44 sm:w-52 sm:h-52 md:w-56 md:h-56 rounded-full bg-gradient-to-r from-teal-500/10 to-transparent animate-pulse" />
          )}

          <CircularProgress
            progress={circleState === 'mining' ? 0 : circleState === 'success' ? 100 : timeLeft.progress || 0}
            size={window.innerWidth < 640 ? 130 : window.innerWidth < 768 ? 150 : 180}
            strokeWidth={4}
            isMining={circleState === 'mining'}
          >
            <div
              onClick={circleState === 'idle' ? handleMine : undefined}
              className={`w-28 h-28 sm:w-36 sm:h-36 md:w-44 md:h-44 rounded-full flex flex-col items-center justify-center border-2 transition-all duration-300 relative z-10 ${circleState === 'idle' ? 'cursor-pointer hover:scale-105' : 'cursor-default'
                } ${circleState === 'error'
                  ? 'bg-gradient-to-br from-red-100 to-red-50 border-red-200'
                  : circleState === 'success'
                    ? 'bg-gradient-to-br from-teal-100 to-teal-50 border-teal-300'
                    : circleState === 'mining'
                      ? 'bg-gradient-to-br from-teal-50 to-white border-teal-300'
                      : 'bg-gradient-to-br from-teal-500 to-teal-600 border-teal-400 shadow-lg shadow-teal-500/30'
                }`}
            >
              {circleState === 'idle' && (
                <div className="text-center">
                  <Pickaxe className="w-7 h-7 sm:w-9 sm:h-9 text-white mb-1.5 sm:mb-2 mx-auto" />
                  <div className="text-white font-extrabold text-xs sm:text-sm tracking-wide">MINE</div>
                  <div className="text-white/65 text-[10px] sm:text-xs mt-1">tap to start</div>
                </div>
              )}
              {circleState === 'mining' && (
                <div className="text-center">
                  <Zap className="w-6 h-6 sm:w-8 sm:h-8 text-teal-500 mb-2 animate-pulse mx-auto" />
                  <div className="font-mono text-[10px] sm:text-xs text-teal-600 tracking-widest">MINING…</div>
                  <div className="flex gap-1 justify-center mt-2 sm:mt-3">
                    {[0, 0.2, 0.4].map((delay, i) => (
                      <div
                        key={i}
                        className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-teal-400 rounded-full animate-pulse"
                        style={{ animationDelay: `${delay}s` }}
                      />
                    ))}
                  </div>
                </div>
              )}
              {circleState === 'error' && (
                <div className="text-center">
                  <X className="w-7 h-7 sm:w-8 sm:h-8 text-red-500 mb-1.5 mx-auto" />
                  <div className="font-mono text-[10px] sm:text-xs text-red-500 tracking-widest">FAILED</div>
                </div>
              )}
              {circleState === 'success' && lastMineLog && (
                <div className="text-center animate-in fade-in duration-300">
                  <div className="text-[10px] sm:text-xs text-teal-500 tracking-widest uppercase mb-1">Earned</div>
                  <div className="font-mono text-2xl sm:text-3xl md:text-4xl font-bold text-teal-700 leading-none">+{lastMineLog.actualReward}</div>
                  <div className="text-xs sm:text-sm text-teal-500 mt-1 font-semibold">JMC</div>
                </div>
              )}
            </div>
          </CircularProgress>
        </div>
      </div>

      {/* Error */}
      {mineError && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-3 sm:p-4 max-w-md mx-auto mb-6 sm:mb-7 flex items-start gap-3 text-left animate-in fade-in slide-in-from-top-2 duration-300">
          <AlertTriangle className="w-4 h-4 sm:w-5 sm:h-5 text-red-600 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <div className="font-bold text-sm sm:text-base text-red-600 mb-1">Mining Error</div>
            <div className="text-xs sm:text-sm text-red-500">{mineError.message}</div>
          </div>
          <button onClick={dismissError} className="text-slate-400 hover:text-slate-600 flex-shrink-0">
            <X className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>
      )}

      {/* Success detail */}
      {showReward && lastMineLog && (
        <div className="bg-teal-50 border border-teal-200 rounded-xl p-4 sm:p-5 max-w-md mx-auto mb-6 sm:mb-7 animate-in fade-in slide-in-from-top-2 duration-300">
          <div className="flex justify-between items-center mb-3 sm:mb-4">
            <span className="font-bold text-teal-700 text-sm sm:text-base flex items-center gap-2">
              <CheckCircle className="w-4 h-4" /> Mining Successful
            </span>
            <button onClick={dismissReward} className="text-slate-400 hover:text-slate-600">
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {[
              { l: 'Slot', v: `#${lastMineLog.slotNumber}` },
              { l: 'Base', v: lastMineLog.baseReward },
              { l: 'Earned', v: `+${lastMineLog.actualReward}`, hi: true },
              { l: 'Status', v: lastMineLog.status }
            ].map((item, i) => (
              <div key={i} className="bg-white border border-teal-100 rounded-lg p-2 sm:p-2.5 text-center">
                <div className="font-mono text-[9px] sm:text-[10px] text-slate-400 tracking-widest uppercase mb-1">{item.l}</div>
                <div className={`font-mono font-bold text-xs sm:text-sm ${item.hi ? 'text-teal-600' : 'text-slate-700'}`}>{item.v}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Mine button */}
      <button
        onClick={handleMine}
        disabled={!wallet || mining}
        className="inline-flex items-center gap-2 bg-gradient-to-r from-teal-500 to-teal-700 text-white font-bold px-10 sm:px-14 md:px-16 py-3 sm:py-4 rounded-xl hover:shadow-2xl hover:shadow-teal-500/40 transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base w-full sm:w-auto justify-center"
      >
        {mining ? (
          <><Loader2 className="w-4 h-4 animate-spin" />Mining…</>
        ) : mineError ? (
          <><RefreshCw className="w-4 h-4" /> Retry Mining</>
        ) : (
          <><Pickaxe className="w-4 h-4" /> Start Mining</>
        )}
      </button>
    </div>

    {/* Stats 2-col */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <Panel title="Earnings Breakdown" Icon={BarChart3}>
        <DRow label="Total Balance" value={`${parseFloat(wallet.totalBalance || 0).toFixed(2)} JMC`} color="text-teal-600" bold />
        <DRow label="Lifetime Earned" value={`${parseFloat(wallet.totalEarnedLifetime || 0).toFixed(2)} JMC`} />
        <DRow label="Total Deducted" value={`${parseFloat(wallet.totalDeducted || 0).toFixed(2)} JMC`} color="text-red-500" />
        <DRow label="Referral Earned" value={`${parseFloat(wallet.totalReferralEarned || 0).toFixed(2)} JMC`} color="text-purple-600" />
        <DRow label="Per Mine" value={`${wallet.perMineJMC || 0} JMC`} />
      </Panel>
      <Panel title="Mining Status" Icon={Shield}>
        <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 sm:p-3.5 mb-2">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs sm:text-sm text-slate-500 flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> Mining Power
            </span>
            <span className={`font-mono text-xs sm:text-sm font-semibold ${(wallet.miningPowerPct || 100) >= 80 ? 'text-teal-600' :
                (wallet.miningPowerPct || 100) >= 50 ? 'text-yellow-500' : 'text-red-500'
              }`}>
              {wallet.miningPowerPct || 100}%
            </span>
          </div>
          <div className="bg-slate-200 rounded-full h-1.5 overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-700 ${(wallet.miningPowerPct || 100) >= 80 ? 'bg-gradient-to-r from-teal-400 to-teal-600' :
                  (wallet.miningPowerPct || 100) >= 50 ? 'bg-yellow-500' : 'bg-red-500'
                }`}
              style={{ width: `${wallet.miningPowerPct || 100}%` }}
            />
          </div>
        </div>
        <DRow
          label="Consecutive Missed"
          value={wallet.consecutiveMissedCount || 0}
          color={(wallet.consecutiveMissedCount || 0) > 0 ? 'text-red-500' : 'text-green-500'}
        />
        <DRow
          label="Recovery Mode"
          value={wallet.isInRecovery ? 'In Recovery' : 'Normal'}
          color={wallet.isInRecovery ? 'text-yellow-500' : 'text-green-500'}
        />
        <DRow
          label="Penalty Tier"
          value={(wallet.currentPenaltyTierId || 0) > 0 ? `Tier ${wallet.currentPenaltyTierId}` : 'None'}
          color={(wallet.currentPenaltyTierId || 0) > 0 ? 'text-red-500' : 'text-green-500'}
        />
        <DRow label="Last Mined" value={(wallet.lastMineAt)} />
      </Panel>
    </div>
  </>
);

// ─── Slot Timer Card ──────────────────────────────────────────
const SlotTimer = ({ timeLeft, currentSlot, nextSlot, loading, hasSlots }) => {
  if (loading) return <div className="h-32 sm:h-36 md:h-40 bg-slate-100 rounded-2xl mb-4 sm:mb-5 animate-pulse" />;
  if (!hasSlots) return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 mb-4 sm:mb-5 text-slate-400 flex items-center gap-2.5 text-sm sm:text-base">
      <Clock className="w-4 h-4 sm:w-5 sm:h-5" /> Loading slot information…
    </div>
  );

  const isActive = !!currentSlot;
  const display = currentSlot || nextSlot;

  return (
    <div className={`rounded-2xl p-5 sm:p-6 md:p-7 mb-4 sm:mb-5 relative overflow-hidden border ${isActive
        ? 'bg-gradient-to-br from-teal-600 to-teal-700 border-teal-500 shadow-xl shadow-teal-500/25'
        : 'bg-white border-slate-200 shadow-sm'
      }`}>
      {isActive && (
        <>
          <div className="absolute -right-10 -top-10 w-48 h-48 rounded-full bg-white/5" />
          <div className="absolute right-10 -bottom-16 w-36 h-36 rounded-full bg-white/5" />
        </>
      )}

      <div className="flex flex-col lg:flex-row items-center justify-between gap-5 sm:gap-6 relative z-10">
        {/* Left — slot info */}
        <div className="text-center lg:text-left">
          <div className="flex items-center gap-2 mb-2 justify-center lg:justify-start">
            {isActive && (
              <div className="w-2 h-2 bg-green-300 rounded-full animate-pulse shadow-lg shadow-green-300" />
            )}
            <span className={`text-[10px] sm:text-xs font-bold tracking-widest uppercase ${isActive ? 'text-white/60' : 'text-slate-400'
              }`}>
              {isActive ? 'Active Mining Slot' : 'Next Slot'}
            </span>
          </div>
          <div className={`text-2xl sm:text-3xl md:text-4xl font-extrabold mb-1 ${isActive ? 'text-white' : 'text-slate-800'
            }`}>
            {display ? `Slot ${display.slotNumber}` : '—'}
          </div>
          {display && (
            <div className={`font-mono text-xs sm:text-sm ${isActive ? 'text-white/60' : 'text-slate-400'
              }`}>
              {fmt24(display.startHour)} → {fmt24(display.endHour)}
            </div>
          )}
          {!isActive && nextSlot && (
            <div className="mt-1.5 text-xs sm:text-sm text-slate-400 flex items-center gap-1 justify-center lg:justify-start">
              <Clock className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> Starts at {fmt24(nextSlot.startHour)}
            </div>
          )}
        </div>

        {/* Center — countdown */}
        <div className="text-center flex flex-col items-center gap-3 sm:gap-4">
          <div className={`text-[10px] font-bold tracking-widest uppercase ${isActive ? 'text-white/50' : 'text-slate-400'
            }`}>
            {isActive ? 'Time Remaining' : 'Starts In'}
          </div>

          <div className="flex items-center gap-3 sm:gap-4">
            {/* <CircularTimer progress={timeLeft.progress || 0} size={window.innerWidth < 640 ? 56 : 64} isActive={isActive} /> */}

            <div className="flex items-start gap-1.5 sm:gap-2">
              {[{ v: timeLeft.hours, l: 'H' }, { v: timeLeft.minutes, l: 'M' }, { v: timeLeft.seconds, l: 'S' }].map((u, i, arr) => (
                <React.Fragment key={u.l}>
                  <div className="text-center">
                    <div className={`font-mono text-xl sm:text-2xl md:text-3xl font-bold leading-none px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg border min-w-[40px] sm:min-w-[52px] ${isActive
                        ? 'text-white bg-white/12 border-white/15'
                        : 'text-slate-800 bg-slate-100 border-slate-200'
                      }`}>
                      {pad(u.v)}
                    </div>
                    <div className={`font-mono text-[9px] sm:text-[10px] mt-1 tracking-widest uppercase ${isActive ? 'text-white/40' : 'text-slate-400'
                      }`}>
                      {u.l}
                    </div>
                  </div>
                  {i < arr.length - 1 && (
                    <div className={`font-mono text-xl sm:text-2xl md:text-3xl pt-1.5 sm:pt-2 ${isActive ? 'text-white/40 animate-pulse' : 'text-slate-300'
                      }`}>
                      :
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          {isActive && (
            <div className="w-full max-w-[220px]">
              <div className="bg-white/15 rounded-full h-1.5 overflow-hidden">
                <div
                  className="h-full bg-white rounded-full transition-all duration-1000 linear"
                  style={{ width: `${timeLeft.progress || 0}%` }}
                />
              </div>
              <div className="text-[10px] sm:text-xs text-white/45 mt-1.5">{(timeLeft.progress || 0).toFixed(1)}% elapsed</div>
            </div>
          )}
        </div>

        {/* Right — next slot badge */}
        {isActive && nextSlot && (
          <div className="text-center bg-white/10 border border-white/15 rounded-xl p-3 sm:p-4">
            <div className="text-[10px] text-white/50 tracking-widest uppercase mb-2 font-semibold">Next Slot</div>
            <div className="font-extrabold text-lg sm:text-xl text-white mb-1">Slot {nextSlot.slotNumber}</div>
            <div className="font-mono text-xs sm:text-sm text-white/50">{fmt24(nextSlot.startHour)}</div>
          </div>
        )}
      </div>
    </div>
  );
};

// ─── History ──────────────────────────────────────────────────
// ─── History ──────────────────────────────────────────────────
const LogsSection = ({ data, loading, refetch, page, setPage, fmtDate }) => {
  // Fetch today's mining info
  const { data: todayInfoRes, isLoading: todayInfoLoading } = useGetTodayMineInfoQuery();
  const todayInfo = todayInfoRes?.data;

  if (loading) return <TableSkeleton />;
  const logs = data?.logs || data?.items || data?.data || [];
  const pagination = data?.pagination || {};
  const totalPages = pagination.totalPages || 1;

  return (
    <div className="flex flex-col gap-3 sm:gap-4">
      {/* Today's Mining Stats */}
      {todayInfo && (
        <div className="bg-gradient-to-br from-teal-600 to-teal-700 rounded-xl sm:rounded-2xl p-4 sm:p-5 lg:p-6 text-white relative overflow-hidden shadow-xl shadow-teal-500/20">
          <div className="absolute -right-8 -top-8 w-32 h-32 sm:w-40 sm:h-40 rounded-full bg-white/5" />
          <div className="absolute right-10 -bottom-10 w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-white/5" />

          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4 sm:mb-5">
              <div>
                <div className="text-[10px] sm:text-xs tracking-widest uppercase text-white/60 mb-1 sm:mb-1.5 font-semibold">
                  Today's Mining Activity
                </div>
                <div className="text-xl sm:text-2xl lg:text-3xl font-extrabold">
                  {todayInfo.date}
                </div>
              </div>
              <div className="bg-white/10 border border-white/20 rounded-xl px-3 sm:px-4 py-2 sm:py-2.5">
                <div className="text-[10px] sm:text-xs text-white/60 mb-0.5">Total Mined</div>
                <div className="font-mono text-lg sm:text-xl lg:text-2xl font-bold">
                  {todayInfo.todayMined} <span className="text-xs opacity-70">JMC</span>
                </div>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-3">
              {[
                { label: 'Total Slots', value: todayInfo.totalSlots, icon: Clock },
                { label: 'Completed', value: todayInfo.completedSlots, icon: CheckCircle, highlight: true },
                { label: 'Claimed', value: todayInfo.claimedSlots, icon: Gem },
                { label: 'Missed', value: todayInfo.missedSlots, icon: AlertTriangle, warn: todayInfo.missedSlots > 0 },
                { label: 'Remaining', value: todayInfo.remainingSlots, icon: Clock },
                { label: 'Total Mined', value: todayInfo.totalMined, icon: TrendingUp },
              ].map((stat, i) => (
                <div
                  key={i}
                  className={`bg-white/10 backdrop-blur-sm border rounded-lg sm:rounded-xl p-2.5 sm:p-3 lg:p-4 ${stat.highlight
                      ? 'border-green-300/30'
                      : stat.warn
                        ? 'border-red-300/30'
                        : 'border-white/20'
                    }`}
                >
                  <div className="flex items-center gap-1 sm:gap-1.5 mb-1.5 sm:mb-2">
                    <stat.icon className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-white/70" />
                    <div className="text-[9px] sm:text-[10px] text-white/70 tracking-wider uppercase font-medium truncate">
                      {stat.label}
                    </div>
                  </div>
                  <div className={`font-mono text-lg sm:text-xl lg:text-2xl font-bold ${stat.highlight
                      ? 'text-green-200'
                      : stat.warn
                        ? 'text-red-200'
                        : 'text-white'
                    }`}>
                    {stat.value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Mining History Cards */}
      <Panel
        title="Mining History"
        Icon={ClipboardList}
        count={pagination.total || logs.length}
        onRefresh={refetch}
      >
        {logs.length === 0 ? (
          <Empty Icon={ClipboardList} msg="No mining logs yet" sub="Start mining to see your history" />
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3">
              {logs.map((log, i) => (
                <div
                  key={log._id || i}
                  className="bg-gradient-to-br from-slate-50 to-white border border-slate-200 rounded-lg sm:rounded-xl p-3 sm:p-4 hover:shadow-lg hover:border-teal-300 transition-all duration-200 group"
                >
                  {/* Header */}
                  <div className="flex items-start justify-between mb-3 sm:mb-4 z-10">
                    <div className="flex items-center gap-2">
                      <div className="w-9 h-9 sm:w-10 sm:h-10 bg-gradient-to-br from-teal-500 to-teal-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Pickaxe className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                      </div>
                      <div>
                        <div className="font-mono font-bold text-slate-700 text-sm sm:text-base">
                          Slot #{log.slotNumber}
                        </div>
                        <div className="text-[10px] sm:text-xs text-slate-400">
                          {fmtDate(log.minedAt || log.createdAt)}
                        </div>
                      </div>
                    </div>
                    <Chip label={log.status} />
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 gap-2 mb-3">
                    <div className="bg-slate-100 rounded-lg p-2 sm:p-2.5">
                      <div className="text-[9px] sm:text-[10px] text-slate-400 tracking-wider uppercase mb-1">
                        Base Reward
                      </div>
                      <div className="font-mono font-bold text-slate-700 text-sm sm:text-base">
                        {log.baseReward} JMC
                      </div>
                    </div>
                    <div className="bg-teal-50 rounded-lg p-2 sm:p-2.5 border border-teal-200">
                      <div className="text-[9px] sm:text-[10px] text-teal-600 tracking-wider uppercase mb-1">
                        Earned
                      </div>
                      <div className="font-mono font-bold text-teal-700 text-sm sm:text-base">
                        +{log.actualReward} JMC
                      </div>
                    </div>
                  </div>

                  {/* Mining Power Bar */}
                  <div className="bg-slate-100 rounded-lg p-2 sm:p-2.5">
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-1">
                        <Zap className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-slate-400" />
                        <span className="text-[9px] sm:text-[10px] text-slate-500 tracking-wider uppercase">
                          Mining Power
                        </span>
                      </div>
                      <span className={`font-mono font-bold text-xs sm:text-sm ${(log.miningPowerUsed || 100) >= 80
                          ? 'text-teal-600'
                          : (log.miningPowerUsed || 100) >= 50
                            ? 'text-yellow-600'
                            : 'text-red-600'
                        }`}>
                        {log.miningPowerUsed || 100}%
                      </span>
                    </div>
                    <div className="bg-slate-200 rounded-full h-1.5 overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${(log.miningPowerUsed || 100) >= 80
                            ? 'bg-gradient-to-r from-teal-400 to-teal-600'
                            : (log.miningPowerUsed || 100) >= 50
                              ? 'bg-yellow-500'
                              : 'bg-red-500'
                          }`}
                        style={{ width: `${log.miningPowerUsed || 100}%` }}
                      />
                    </div>
                  </div>

                  {/* Additional Info */}
                  {(log.bonusApplied || log.penaltyApplied) && (
                    <div className="mt-2 pt-2 border-t border-slate-200 flex items-center gap-2 flex-wrap">
                      {log.bonusApplied && (
                        <div className="flex items-center gap-1 bg-green-50 border border-green-200 rounded-full px-2 py-0.5">
                          <Gift className="w-3 h-3 text-green-600" />
                          <span className="text-[9px] sm:text-[10px] text-green-700 font-semibold">
                            Bonus
                          </span>
                        </div>
                      )}
                      {log.penaltyApplied && (
                        <div className="flex items-center gap-1 bg-red-50 border border-red-200 rounded-full px-2 py-0.5">
                          <AlertTriangle className="w-3 h-3 text-red-600" />
                          <span className="text-[9px] sm:text-[10px] text-red-700 font-semibold">
                            Penalty
                          </span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
            {totalPages > 1 && <Pager page={page} total={totalPages} setPage={setPage} />}
          </>
        )}
      </Panel>
    </div>
  );
};

// ─── Transactions ─────────────────────────────────────────────
const TxSection = ({ data, loading, refetch, page, setPage, fmtDate }) => {
  if (loading) return <TableSkeleton />;
  const txs = data?.txs || [];
  const pagination = data?.pagination || {};
  const totalPages = pagination.totalPages || 1;
  const credit = txs.filter(t => t.direction === 'credit').reduce((s, t) => s + t.amount, 0);
  const debit = txs.filter(t => t.direction === 'debit').reduce((s, t) => s + t.amount, 0);

  const typeIcon = (t) => ({ mine_reward: Pickaxe, referral_reward: Users, penalty_deduction: AlertTriangle, bonus: Gift }[t] || Gem);
  const typeName = (t) => t?.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) || 'Transaction';

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {[
          { l: 'Credits', v: `+${credit.toFixed(2)}`, c: 'text-green-600', bg: 'bg-green-50', border: 'border-green-200', Icon: TrendingUp },
          { l: 'Debits', v: `-${debit.toFixed(2)}`, c: 'text-red-600', bg: 'bg-red-50', border: 'border-red-200', Icon: TrendingDown },
          { l: 'Net', v: `${(credit - debit).toFixed(2)}`, c: credit - debit >= 0 ? 'text-teal-600' : 'text-red-600', bg: credit - debit >= 0 ? 'bg-teal-50' : 'bg-red-50', border: credit - debit >= 0 ? 'border-teal-200' : 'border-red-200', Icon: ArrowRightLeft }
        ].map((s, i) => (
          <div key={i} className={`${s.bg} border ${s.border} rounded-xl p-4 sm:p-5 shadow-sm`}>
            <div className="text-[10px] sm:text-xs text-slate-400 tracking-widest uppercase mb-2 font-semibold flex items-center gap-1.5">
              <s.Icon className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> {s.l}
            </div>
            <div className={`font-mono text-xl sm:text-2xl font-bold ${s.c}`}>
              {s.v} <span className="text-xs opacity-60">JMC</span>
            </div>
          </div>
        ))}
      </div>

      <Panel title="Transactions" Icon={Wallet} count={pagination.total || txs.length} onRefresh={refetch}>
        {txs.length === 0 ? (
          <Empty Icon={Wallet} msg="No transactions yet" />
        ) : (
          <>
            <div className="flex flex-col gap-2">
              {txs.map((tx, i) => {
                const TxIcon = typeIcon(tx.type);
                return (
                  <div key={tx._id || i} className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 bg-slate-50 border border-slate-200 rounded-xl p-3 sm:p-4">
                    <div className="flex items-center gap-3 w-full sm:w-auto">
                      <div className={`w-10 h-10 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center border flex-shrink-0 ${tx.direction === 'credit'
                          ? 'bg-green-50 border-green-200'
                          : 'bg-red-50 border-red-200'
                        }`}>
                        <TxIcon className={`w-4 h-4 sm:w-5 sm:h-5 ${tx.direction === 'credit' ? 'text-green-500' : 'text-red-500'
                          }`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-sm sm:text-base text-slate-700 mb-0.5 truncate">{typeName(tx.type)}</div>
                        <div className="text-xs sm:text-sm text-slate-400">{fmtDate(tx.createdAt)}</div>
                      </div>
                    </div>
                    <div className="text-left sm:text-right w-full sm:w-auto flex-shrink-0">
                      <div className={`font-mono font-bold text-base sm:text-lg ${tx.direction === 'credit' ? 'text-green-600' : 'text-red-600'
                        }`}>
                        {tx.direction === 'credit' ? '+' : '-'}{tx.amount} JMC
                      </div>
                      <div className="font-mono text-[10px] sm:text-xs text-slate-400 mt-0.5">
                        {tx.balanceBefore} → {tx.balanceAfter}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            {totalPages > 1 && <Pager page={page} total={totalPages} setPage={setPage} />}
          </>
        )}
      </Panel>
    </div>
  );
};

// ─── Referrals ────────────────────────────────────────────────
const ReferralSection = ({ data, loading, refetch, page, setPage, fmtDate }) => {
  if (loading) return <TableSkeleton />;
  const refs = data?.logs || [];
  const pagination = data?.pagination || {};
  const totalPages = pagination.totalPages || 1;
  const total = refs.reduce((s, r) => s + (r.bonusAmount || 0), 0);

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { l: 'Total Earned', v: `${total} JMC`, c: 'text-teal-600', Icon: TrendingUp },
          { l: 'Referrals', v: pagination.total || refs.length, c: 'text-slate-700', Icon: Users },
          { l: 'Paid', v: refs.filter(r => r.status === 'paid').length, c: 'text-green-600', Icon: CheckCircle },
          { l: 'Avg Bonus', v: `${refs.length ? (total / refs.length).toFixed(1) : 0} JMC`, c: 'text-slate-700', Icon: BarChart3 },
        ].map((s, i) => (
          <div key={i} className="bg-white border border-slate-200 rounded-xl p-3 sm:p-4 shadow-sm">
            <div className="text-[10px] sm:text-xs text-slate-400 tracking-widest uppercase mb-2 font-semibold flex items-center gap-1.5">
              <s.Icon className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> {s.l}
            </div>
            <div className={`font-mono text-lg sm:text-xl md:text-2xl font-bold ${s.c}`}>{s.v}</div>
          </div>
        ))}
      </div>

      <Panel title="Referral Bonuses" Icon={Users} count={pagination.total || refs.length} onRefresh={refetch}>
        {refs.length === 0 ? (
          <Empty Icon={Users} msg="No referral bonuses yet" sub="Share your referral code to earn" />
        ) : (
          <>
            <div className="space-y-2">
              {refs.map((ref, i) => (
                <div key={ref._id || i} className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 bg-slate-50 border border-slate-200 rounded-xl p-3 sm:p-4">
                  <div className="flex items-center gap-3 w-full sm:w-auto">
                    <div className="w-10 h-10 sm:w-11 sm:h-11 bg-teal-50 border border-teal-200 rounded-xl flex items-center justify-center font-mono text-xs sm:text-sm font-bold text-teal-600 flex-shrink-0">
                      {ref.referredUserId?.slice(-2)?.toUpperCase() || '??'}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-mono text-xs sm:text-sm text-slate-600 mb-0.5 truncate">
                        {ref.referredUserId?.length > 10
                          ? `${ref.referredUserId.slice(0, 8)}…${ref.referredUserId.slice(-4)}`
                          : ref.referredUserId}
                      </div>
                      <div className="text-xs sm:text-sm text-slate-400">Mine date: {ref.mineDate}</div>
                    </div>
                  </div>
                  <div className="text-left sm:text-right w-full sm:w-auto flex-shrink-0">
                    <div className="font-mono font-bold text-teal-600 text-base sm:text-lg">+{ref.bonusAmount} JMC</div>
                    <div className="text-xs sm:text-sm text-green-500 font-semibold mt-0.5 capitalize">{ref.status}</div>
                  </div>
                </div>
              ))}
            </div>
            {totalPages > 1 && <Pager page={page} total={totalPages} setPage={setPage} />}
          </>
        )}
      </Panel>

      <div className="bg-teal-50 border border-teal-200 rounded-xl p-4 sm:p-5 flex gap-3 sm:gap-4 items-start">
        <Lightbulb className="w-5 h-5 sm:w-6 sm:h-6 text-teal-600 flex-shrink-0 mt-0.5" />
        <div>
          <div className="font-bold text-teal-700 mb-1.5 text-sm sm:text-base">How Referrals Work</div>
          <div className="text-teal-600 text-xs sm:text-sm leading-relaxed">
            Earn <strong>3 JMC</strong> every time a referred user mines successfully. More active referrals = more passive income.
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── Slots Section ────────────────────────────────────────────
const SlotsSection = ({ slots, currentSlot, timeLeft, loading, refetch, slotsData }) => {
  if (loading) return <TableSkeleton />;

  return (
    <div className="flex flex-col gap-4">
      {currentSlot && (
        <div className="bg-gradient-to-br from-teal-600 to-teal-700 rounded-2xl p-6 sm:p-7 md:p-8 text-white relative overflow-hidden shadow-xl shadow-teal-500/30">
          <div className="absolute -right-8 -top-8 w-40 h-40 sm:w-48 sm:h-48 rounded-full bg-white/6" />
          <div className="absolute right-14 -bottom-12 w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-white/5" />

          <div className="flex flex-col lg:flex-row flex-wrap items-center justify-between gap-5 sm:gap-6 relative">
            <div className="text-center lg:text-left">
              <div className="text-[10px] sm:text-xs tracking-widest uppercase text-white/60 mb-2 font-semibold flex items-center gap-2 justify-center lg:justify-start">
                <CircleDot className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> Currently Active
              </div>
              <div className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-1.5">Slot {currentSlot.slotNumber}</div>
              <div className="font-mono text-xs sm:text-sm text-white/60">{fmt24(currentSlot.startHour)} → {fmt24(currentSlot.endHour)}</div>
            </div>

            <div className="flex gap-5 sm:gap-6 items-center">
              <CircularTimer progress={timeLeft.progress || 0} size={window.innerWidth < 640 ? 64 : 72} isActive={true} />
              <div className="text-center">
                <div className="text-[10px] sm:text-xs text-white/50 tracking-widest uppercase mb-2 font-semibold">Time Left</div>
                <div className="font-mono text-2xl sm:text-3xl md:text-4xl font-bold">
                  {pad(timeLeft.hours)}:{pad(timeLeft.minutes)}:{pad(timeLeft.seconds)}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-5">
            <div className="bg-white/15 rounded-full h-1.5 overflow-hidden">
              <div
                className="h-full bg-white rounded-full transition-all duration-1000 linear"
                style={{ width: `${timeLeft.progress || 0}%` }}
              />
            </div>
            <div className="text-xs sm:text-sm text-white/45 mt-1.5">{(timeLeft.progress || 0).toFixed(1)}% of slot elapsed</div>
          </div>
        </div>
      )}

      <Panel title="All Mining Slots" Icon={Clock} onRefresh={refetch}>
        {slots.length === 0 ? (
          <Empty Icon={Clock} msg="No slots available" />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
            {slots.map((slot, i) => {
              const isActive = currentSlot?.slotNumber === slot.slotNumber;
              return (
                <div
                  key={slot.slotNumber || i}
                  className={`rounded-xl p-4 sm:p-5 relative overflow-hidden border transition-all hover:shadow-md ${isActive
                      ? 'bg-teal-50 border-teal-400 shadow-lg shadow-teal-500/15'
                      : 'bg-slate-50 border-slate-200'
                    }`}
                >
                  {isActive && (
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-teal-400 to-teal-600" />
                  )}

                  <div className="flex justify-between items-start mb-3">
                    <div className={`font-extrabold text-base sm:text-lg ${isActive ? 'text-teal-700' : 'text-slate-700'
                      }`}>
                      Slot {slot.slotNumber}
                    </div>
                    {isActive && (
                      <div className="flex items-center gap-1.5 bg-teal-100 border border-teal-300 rounded-full px-2.5 py-1">
                        <div className="w-1.5 h-1.5 bg-teal-500 rounded-full animate-pulse" />
                        <span className="font-mono text-[9px] sm:text-[10px] text-teal-700 tracking-widest font-bold">LIVE</span>
                      </div>
                    )}
                  </div>

                  <div className="font-mono text-xs sm:text-sm text-slate-400 mb-1.5">
                    {fmt24(slot.startHour)} → {fmt24(slot.endHour)}
                  </div>
                  <div className={`text-xs sm:text-sm font-medium flex items-center gap-1 ${isActive ? 'text-teal-500' : 'text-slate-400'
                    }`}>
                    <Clock className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> {slot.endHour - slot.startHour}h window
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </Panel>

      {slotsData?.date && (
        <div className="text-center">
          <span className="font-mono text-xs sm:text-sm text-slate-400 tracking-widest">Schedule for {slotsData.date}</span>
        </div>
      )}
    </div>
  );
};

// ─── Shared UI ────────────────────────────────────────────────
const Panel = ({ title, Icon, count, onRefresh, children }) => (
  <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 md:p-6 shadow-sm">
    <div className="flex flex-wrap items-center justify-between mb-4 sm:mb-5 gap-2">
      <div>
        <div className="flex items-center gap-2 mb-0.5">
          <Icon className="w-4 h-4 text-teal-600" />
          <span className="font-extrabold text-base sm:text-lg text-slate-800">{title}</span>
        </div>
        {count !== undefined && (
          <div className="font-mono text-[10px] sm:text-xs text-slate-400 tracking-widest ml-6">{count} records</div>
        )}
      </div>
      {onRefresh && (
        <button
          onClick={onRefresh}
          className="flex items-center gap-1.5 bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-slate-600 hover:border-teal-400 hover:text-teal-600 hover:bg-teal-50 transition-all text-xs sm:text-sm font-semibold"
        >
          <RefreshCw className="w-3.5 h-3.5" /> Refresh
        </button>
      )}
    </div>
    {children}
  </div>
);

const BalCard = ({ label, value, unit, primary, bar, barVal, Icon }) => (
  <div className={`rounded-xl p-4 sm:p-5 transition-all hover:-translate-y-1 hover:shadow-lg ${primary
      ? 'bg-gradient-to-br from-teal-500 to-teal-700 border border-teal-400 shadow-xl shadow-teal-500/30'
      : 'bg-white border border-slate-200 shadow-sm'
    }`}>
    <div className="flex items-center gap-1.5 mb-2.5">
      <Icon className={`w-3 h-3 sm:w-3.5 sm:h-3.5 ${primary ? 'text-white/65' : 'text-slate-400'}`} />
      <div className={`font-mono text-[10px] sm:text-xs tracking-widest uppercase font-medium ${primary ? 'text-white/65' : 'text-slate-400'
        }`}>
        {label}
      </div>
    </div>
    <div className={`font-mono text-xl sm:text-2xl md:text-3xl font-bold leading-none ${primary ? 'text-white' : 'text-slate-800'
      }`}>
      {value} <span className="text-xs opacity-60 font-normal">{unit}</span>
    </div>
    {bar && (
      <div className={`mt-3 rounded-full h-1.5 overflow-hidden ${primary ? 'bg-white/20' : 'bg-slate-100'
        }`}>
        <div
          className={`h-full rounded-full transition-all duration-700 ${primary
              ? 'bg-white'
              : barVal >= 80
                ? 'bg-teal-500'
                : barVal >= 50
                  ? 'bg-yellow-500'
                  : 'bg-red-500'
            }`}
          style={{ width: `${barVal}%` }}
        />
      </div>
    )}
  </div>
);

const DRow = ({ label, value, color, bold }) => (
  <div className="flex justify-between items-center p-2.5 sm:p-3 bg-slate-50 rounded-lg border border-slate-200 mb-1.5">
    <span className="text-xs sm:text-sm text-slate-500">{label}</span>
    <span className={`font-mono text-xs sm:text-sm ${bold ? 'font-bold' : 'font-semibold'} ${color || 'text-slate-700'}`}>
      {value}
    </span>
  </div>
);

const Chip = ({ label }) => (
  <span className="inline-block font-mono text-[10px] sm:text-xs px-2.5 py-1 rounded-full bg-teal-50 text-teal-700 border border-teal-200 font-semibold tracking-wide capitalize">
    {label}
  </span>
);

const Empty = ({ Icon, msg, sub }) => (
  <div className="text-center py-12 sm:py-16">
    <Icon className="w-8 h-8 sm:w-10 sm:h-10 text-slate-300 mx-auto mb-3 sm:mb-4" />
    <div className="font-bold text-slate-600 mb-1.5 text-sm sm:text-base">{msg}</div>
    {sub && <div className="text-xs sm:text-sm text-slate-400">{sub}</div>}
  </div>
);

const Pager = ({ page, total, setPage }) => (
  <div className="flex flex-wrap items-center justify-center gap-2 mt-6 pt-5 border-t border-slate-200">
    <button
      onClick={() => setPage(page - 1)}
      disabled={page === 1}
      className="bg-white border border-slate-200 rounded-lg p-2 text-slate-500 hover:border-teal-400 hover:text-teal-600 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
    >
      <ChevronLeft className="w-4 h-4" />
    </button>
    {[...Array(Math.min(5, total))].map((_, i) => {
      const p = total <= 5 ? i + 1 : page <= 3 ? i + 1 : page >= total - 2 ? total - 4 + i : page - 2 + i;
      return (
        <button
          key={p}
          onClick={() => setPage(p)}
          className={`min-w-[36px] sm:min-w-[40px] px-3 py-2 rounded-lg font-mono text-xs sm:text-sm transition-all ${page === p
              ? 'bg-teal-500 border-teal-500 text-white font-bold'
              : 'bg-white border border-slate-200 text-slate-500 hover:border-teal-400 hover:text-teal-600'
            }`}
        >
          {p}
        </button>
      );
    })}
    <button
      onClick={() => setPage(page + 1)}
      disabled={page === total}
      className="bg-white border border-slate-200 rounded-lg p-2 text-slate-500 hover:border-teal-400 hover:text-teal-600 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
    >
      <ChevronRight className="w-4 h-4" />
    </button>
    <span className="font-mono text-xs sm:text-sm text-slate-400 ml-2">{page}/{total}</span>
  </div>
);

const PageSkeleton = () => (
  <div className="flex flex-col gap-3 sm:gap-4">
    <div className="h-12 sm:h-14 bg-slate-100 rounded-xl animate-pulse max-w-xs" />
    <div className="h-32 sm:h-40 bg-slate-100 rounded-2xl animate-pulse" />
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">{[...Array(4)].map((_, i) => <div key={i} className="h-24 sm:h-28 bg-slate-100 rounded-xl animate-pulse" />)}</div>
    <div className="h-80 sm:h-96 bg-slate-100 rounded-2xl animate-pulse" />
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">{[...Array(2)].map((_, i) => <div key={i} className="h-56 sm:h-64 bg-slate-100 rounded-2xl animate-pulse" />)}</div>
  </div>
);

const TableSkeleton = () => (
  <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-6">
    <div className="h-6 bg-slate-100 rounded-lg w-48 mb-5 animate-pulse" />
    {[...Array(5)].map((_, i) => <div key={i} className="h-12 sm:h-14 bg-slate-100 rounded-lg mb-2 animate-pulse" />)}
  </div>
);

export default MiningPage;