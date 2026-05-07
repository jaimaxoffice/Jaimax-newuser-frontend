
import React, { useState } from 'react';
import { useGetStakingRewardsQuery } from './stakingApiSlice';
import ReusableTable from "../../../ReusableComponents/tables/reusableTable";
import Pagination from "../../../ReusableComponents/Pagination/Pagination";
import dayjs from 'dayjs';
// ─── Helpers ──────────────────────────────────────────────────────────────────
const fmtTokens = (n) =>
  new Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 8 }).format(n || 0);

const fmtDate = (s) => {
  if (!s) return '—';
  return new Date(s).toLocaleString('en-IN', {
    day: '2-digit', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit', hour12: true,
  });
};

const fmtDateShort = (s) => {
  if (!s) return '—';
  return new Date(s).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
};

const statusStyle = (status) => {
  const map = {
    completed: { bg: '#E1F5EE', color: '#0F6E56', border: '#9FE1CB', dot: '#1D9E75' },
    pending: { bg: '#FAEEDA', color: '#854F0B', border: '#FAC775', dot: '#F59E0B' },
    failed: { bg: '#FEE2E2', color: '#991B1B', border: '#FCA5A5', dot: '#EF4444' },
    processing: { bg: '#E6F1FB', color: '#185FA5', border: '#B5D4F4', dot: '#3B82F6' },
  };
  return map[(status || '').toLowerCase()] || map.completed;
};

// ─── Status badge ─────────────────────────────────────────────────────────────
const Badge = ({ status = 'completed' }) => {
  const s = statusStyle(status);
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 5,
      fontSize: 11, fontWeight: 500, padding: '3px 9px',
      borderRadius: 100, background: s.bg, color: s.color,
      border: `0.5px solid ${s.border}`,
    }}>
      <span style={{ width: 6, height: 6, borderRadius: '50%', background: s.dot }} />
      {status || 'Completed'}
    </span>
  );
};

// ─── Back button ─────────────────────────────────────────────────────────────
const BackButton = ({ onBack }) => (
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
    ← Back to Dashboard
  </button>
);

// ─── Skeleton loader ──────────────────────────────────────────────────────────
const Skeleton = ({ h = 16, w = '100%', r = 8 }) => (
  <div style={{
    height: h, width: w, borderRadius: r,
    background: 'linear-gradient(90deg,#f0f0f0 25%,#e0e0e0 50%,#f0f0f0 75%)',
    backgroundSize: '200% 100%',
    animation: 'shimmer 1.4s infinite',
  }} />
);

// ─── Main Component ───────────────────────────────────────────────────────────
const StakingRewards = ({ onBack, orderId }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);

  const { data: response, isLoading, isError, error, refetch } =
    useGetStakingRewardsQuery({ page: currentPage, limit: pageSize, orderId });

  const data = response?.success ? response.data : null;
  const logs = data?.logs || [];
  const pagination = data?.pagination;

  // ── Loading ────────────────────────────────────────────────────────────────
  if (isLoading) {
    return (
      <>
        <style>{`@keyframes shimmer{0%{background-position:200% 0}100%{background-position:-200% 0}}`}</style>
        <div style={{ minHeight: '100vh', background: '#f8fafc', padding: '1.5rem 1rem' }}>
          <div style={{ maxWidth: 960, margin: '0 auto' }}>
            <BackButton onBack={onBack} />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(160px,1fr))', gap: 10, margin: '1.25rem 0' }}>
              {[...Array(4)].map((_, i) => <Skeleton key={i} h={90} r={16} />)}
            </div>
            <div style={{ background: '#fff', borderRadius: 16, border: '0.5px solid #e5e7eb', padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[...Array(6)].map((_, i) => <Skeleton key={i} h={44} r={10} />)}
            </div>
          </div>
        </div>
      </>
    );
  }

  // ── Error ──────────────────────────────────────────────────────────────────
  if (isError || !response?.success) {
    return (
      <div style={{ minHeight: '100vh', background: '#f8fafc', padding: '1.5rem 1rem' }}>
        <div style={{ maxWidth: 1500, margin: '0 auto' }}>
          <BackButton onBack={onBack} />
          <div style={{ marginTop: '1.25rem', background: '#fff', borderRadius: 16, border: '0.5px solid #e5e7eb', padding: '3rem 1rem', textAlign: 'center' }}>
            <div style={{ width: 52, height: 52, borderRadius: '50%', background: '#FEF2F2', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px', fontSize: 26 }}>⚠️</div>
            <div style={{ fontSize: 16, fontWeight: 600, color: '#111827', marginBottom: 6 }}>Failed to load rewards</div>
            <div style={{ fontSize: 13, color: '#9ca3af', marginBottom: 16 }}>{error?.data?.message || 'Something went wrong'}</div>
            <button onClick={refetch} style={{
              padding: '8px 20px', background: '#0F6E56', color: '#fff',
              borderRadius: 10, border: 'none', cursor: 'pointer', fontSize: 13, fontWeight: 500,
            }}>Try again</button>
          </div>
        </div>
      </div>
    );
  }

  // ── Summary stats from logs ────────────────────────────────────────────────
  const totalReward = logs.reduce((s, r) => s + (r.amount || r.rewardTokens || 0), 0);
  const totalDays = logs.length > 0 ? Math.max(...logs.map(r => r.stakingDisbursementDay || 0)) : 0;
  const latest = logs[0];

  // ── Empty ──────────────────────────────────────────────────────────────────
  if (!logs.length) {
    return (
      <div style={{ minHeight: '100vh', background: '#f8fafc', padding: '1.5rem 1rem' }}>
        <div style={{ maxWidth: 1500, margin: '0 auto' }}>
          <BackButton onBack={onBack} />
          <div style={{ marginTop: '1.25rem', background: '#fff', borderRadius: 16, border: '0.5px solid #e5e7eb', padding: '4rem 1rem', textAlign: 'center' }}>
            <div style={{ fontSize: 36, marginBottom: 12 }}>🪙</div>
            <div style={{ fontSize: 16, fontWeight: 600, color: '#111827', marginBottom: 6 }}>No rewards yet</div>
            <div style={{ fontSize: 13, color: '#9ca3af' }}>Staking rewards will appear here as they are disbursed daily</div>
          </div>
        </div>
      </div>
    );
  }

  // ── Main view ─────────────────────────────────────────────────────────────
  return (
    <>
      <style>{`
        @keyframes shimmer{0%{background-position:200% 0}100%{background-position:-200% 0}}
        @keyframes fadeUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:none}}
        .sr-container{animation:fadeUp .35s ease both}
        .reward-row{transition:background .12s}
        .reward-row:hover{background:#f8fafc}
        .sr-show-mobile{display:none !important}
        .sr-show-desktop{display:block !important}
        @media(max-width:640px){
          .sr-show-mobile{display:flex !important;flex-direction:column}
          .sr-show-desktop{display:none !important}
        }
      `}</style>

      <div className="sr-container" style={{ minHeight: '100vh', background: '#f8fafc', padding: '1.5rem 1rem' }}>
        <div style={{ maxWidth: 1500, margin: '0 auto' }}>

          {/* ── Header ─────────────────────────────────────────────────────── */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '.75rem', marginBottom: '1.25rem' }}>
            <BackButton onBack={onBack} />
            <div>
              <div style={{ fontSize: 18, fontWeight: 700, color: '#111827', letterSpacing: '-.02em', textAlign: 'right' }}>
                Staking Rewards
              </div>
              {orderId && (
                <div style={{ fontSize: 11, color: '#9ca3af', fontFamily: 'monospace', textAlign: 'right', marginTop: 2 }}>
                  {orderId}
                </div>
              )}
            </div>
          </div>

          {/* ── Summary cards ───────────────────────────────────────────────── */}


          {/* ── Table / Cards ───────────────────────────────────────────────── */}
          <div style={{ background: '#fff', borderRadius: 16, border: '0.5px solid #e5e7eb', overflow: 'hidden', boxShadow: '0 1px 4px rgba(0,0,0,.04)' }}>

            {/* Table header bar */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', borderBottom: '0.5px solid #f3f4f6', background: 'linear-gradient(90deg,#f0fdf9,#fff)' }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: '#111827' }}>Reward history</div>
              <div style={{ fontSize: 12, color: '#9ca3af' }}>
                {pagination?.totalItems || logs.length} entries · Page {currentPage} of {pagination?.totalPages || 1}
              </div>
            </div>

            {/* ── Desktop table ──────────────────────────────────────────────── */}
            <div className="sr-show-desktop">
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: '#085358', borderBottom: '0.5px solid #f3f4f6' }}>
                    {['S.No', 'Date & Time', 'Day', 'Reward (JMC)', 'Transaction ID', 'Status'].map((h) => (
                      <th key={h} style={{ padding: '10px 16px', textAlign: 'left', fontSize: 10, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.06em', color: '#ffff', whiteSpace: 'nowrap' }}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {logs.map((reward, i) => (
                    <tr key={reward.id || i} className="reward-row" style={{ borderBottom: '0.5px solid #f9fafb' }}>
                      <td style={{ padding: '12px 16px' }}>
                        <div style={{ width: 24, height: 24, borderRadius: '50%', background: '#E1F5EE', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 600, color: '#0F6E56' }}>
                          {(currentPage - 1) * pageSize + i + 1}
                        </div>
                      </td>

                      <td style={{ padding: '12px 16px', fontSize: 12, color: '#374151' }}>
                        {(reward.createdAt || reward.date)?.split('.')[0].replace('T', ' ')}
                      </td>
                      <td style={{ padding: '12px 16px' }}>
                        <span style={{ fontSize: 12, fontWeight: 500, color: '#0F6E56', background: '#E1F5EE', padding: '3px 8px', borderRadius: 100, border: '0.5px solid #9FE1CB' }}>
                          Day {reward.stakingDisbursementDay}
                        </span>
                      </td>
                      <td style={{ padding: '12px 16px' }}>
                        <div style={{ fontSize: 14, fontWeight: 700, color: '#111827', fontVariantNumeric: 'tabular-nums' }}>
                          +{fmtTokens(reward.amount || reward.rewardTokens)}
                        </div>
                      </td>
                      <td style={{ padding: '12px 16px', fontSize: 11, fontFamily: 'monospace', color: '#6b7280', maxWidth: 160, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {reward.transactionId || 'N/A'}
                      </td>
                      <td style={{ padding: '12px 16px' }}>
                        <Badge status={reward.status} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* ── Mobile cards ────────────────────────────────────────────────── */}
            <div className="sr-show-mobile" style={{ padding: '12px', gap: 10 }}>
              {logs.map((reward, i) => (
                <div key={reward.id || i} style={{
                  border: '0.5px solid #e5e7eb',
                  borderRadius: 14,
                  overflow: 'hidden',
                  background: '#fff',
                  boxShadow: '0 1px 3px rgba(0,0,0,.04)',
                }}>
                  {/* Card header */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 14px', background: 'linear-gradient(90deg,#f0fdf9,#fff)', borderBottom: '0.5px solid #f3f4f6' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div style={{ width: 24, height: 24, borderRadius: '50%', background: '#E1F5EE', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 600, color: '#0F6E56' }}>
                        {(currentPage - 1) * pageSize + i + 1}
                      </div>
                      <span style={{ fontSize: 11, fontWeight: 600, color: '#0F6E56', background: '#E1F5EE', padding: '2px 8px', borderRadius: 100, border: '0.5px solid #9FE1CB' }}>
                        Day {reward.stakingDisbursementDay}
                      </span>
                    </div>
                    <Badge status={reward.status} />
                  </div>

                  {/* Card body */}
                  <div style={{ padding: '12px 14px' }}>
                    <div style={{ fontSize: 22, fontWeight: 700, color: '#111827', fontVariantNumeric: 'tabular-nums', marginBottom: 2 }}>
                      +{fmtTokens(reward.amount || reward.rewardTokens)}
                      <span style={{ fontSize: 12, fontWeight: 500, color: '#9ca3af', marginLeft: 4 }}>JMC</span>
                    </div>

                    {reward.note && (
                      <div style={{ fontSize: 12, color: '#374151', background: '#f8fafc', border: '0.5px solid #e5e7eb', borderRadius: 8, padding: '6px 10px', margin: '8px 0' }}>
                        {reward.note}
                      </div>
                    )}

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginTop: 8 }}>
                      <div style={{ background: '#f9fafb', borderRadius: 10, padding: '8px 10px' }}>
                        <div style={{ fontSize: 10, color: '#9ca3af', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '.04em', marginBottom: 2 }}>Date</div>
                        <div style={{ fontSize: 12, fontWeight: 500, color: '#374151' }}>{fmtDateShort(reward.createdAt)}</div>
                      </div>
                      <div style={{ background: '#f9fafb', borderRadius: 10, padding: '8px 10px', overflow: 'hidden' }}>
                        <div style={{ fontSize: 10, color: '#9ca3af', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '.04em', marginBottom: 2 }}>Tx ID</div>
                        <div style={{ fontSize: 11, fontFamily: 'monospace', color: '#374151', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {reward.transactionId || 'N/A'}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* ── Pagination ──────────────────────────────────────────────────── */}
            {pagination && pagination.totalPages > 1 && (
              <div style={{ borderTop: '0.5px solid #f3f4f6', padding: '12px 16px' }}>
                <Pagination
                  currentPage={currentPage}
                  totalPages={pagination.totalPages}
                  onPageChange={setCurrentPage}
                />
              </div>
            )}
          </div>

        </div>
      </div>
    </>
  );
};

export default StakingRewards;