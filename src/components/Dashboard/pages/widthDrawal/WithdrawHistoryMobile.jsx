import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  Loader2,
  Wallet,
  Hash,
  IndianRupee,
  DollarSign,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Hourglass,
  Search,
} from "lucide-react";
import { useUsdtWithdrawHistoryQuery } from "./cryptoWithdrawalApiSlice";
import { useNavigate } from "react-router-dom";

const PRIMARY = "#C5D82E";
const SECONDARY = "#20934A";

export default function WithdrawHistoryMobile() {
  const [state, setState] = useState({ page: 1, limit: 10, search: "" });
  const [selectedStatus, setSelectedStatus] = useState(""); // "", "1", "2", etc.

  const navigate = useNavigate();

  // Build query string (your API expects this)
  const queryString = useMemo(() => {
    const s = encodeURIComponent(state.search || "");
    const st = selectedStatus ? `&status=${selectedStatus}` : "";
    return `page=${state.page}&limit=${state.limit}${st}&search=${s}`;
  }, [state.page, state.limit, state.search, selectedStatus]);

  const { data, isLoading, isFetching } = useUsdtWithdrawHistoryQuery(queryString);

  const apiList = data?.data?.withdrawRequests || [];
  const pagination = data?.data?.pagination;

  // append-mode list
  const [items, setItems] = useState([]);

  // When page=1 or filters/search change => replace list
  useEffect(() => {
    if (!data?.data?.withdrawRequests) return;

    if (state.page === 1) {
      setItems(apiList);
    } else {
      // append (avoid duplicates if API repeats)
      setItems((prev) => {
        const map = new Map(prev.map((x) => [x._id, x]));
        apiList.forEach((x) => map.set(x._id, x));
        return Array.from(map.values());
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, state.page]);

  const hasMore =
    pagination?.page && pagination?.totalPages
      ? pagination.page < pagination.totalPages
      : false;

  const resetAndLoad = (patch) => {
    setItems([]);
    setState((s) => ({ ...s, page: 1, ...patch }));
  };

  return (
    <div className="min-h-screen bg-[#0B0F14] p-4 pb-8 max-w-md mx-auto">
      {/* ================= HEADER ================= */}
      <div className="flex items-center gap-3 mb-4">
        <button
          onClick={() => navigate("/withdrawal-mobile")}
          className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center"
        >
          <ArrowLeft size={16} className="text-white" />
        </button>
        <div className="flex-1">
          <h1 className="text-lg font-bold text-white">Withdrawal History</h1>
          <p className="text-xs text-gray-400">USDT & INR withdrawal requests</p>
        </div>
      </div>

      {/* ================= SEARCH ================= */}
      <div className="mb-4">
        <div className="rounded-2xl p-[1px] bg-gradient-to-br from-[#20934A]/70 via-[#C5D82E]/30 to-[#20934A]/70">
          <div className="flex items-center gap-2 rounded-2xl bg-[linear-gradient(180deg,#13261E,#0F1D18)] px-3 py-2.5">
            <Search size={16} className="text-white/60" />
            <input
              value={state.search}
              onChange={(e) => resetAndLoad({ search: e.target.value })}
              placeholder="Search by wallet / hash / note..."
              className="w-full bg-transparent outline-none text-sm text-white placeholder:text-white/40"
            />
          </div>
        </div>
      </div>

      {/* ================= STATUS FILTER CHIPS ================= */}
      <div className="flex gap-2 mb-5 overflow-x-auto no-scrollbar">
  <Chip
    active={selectedStatus === ""}
    onClick={() => {
      setSelectedStatus("");
      resetAndLoad({});
    }}
  >
    All
  </Chip>

  <Chip
    active={selectedStatus === "1"}
    onClick={() => {
      setSelectedStatus("1");
      resetAndLoad({});
    }}
  >
    Success
  </Chip>

  <Chip
    active={selectedStatus === "2"}
    onClick={() => {
      setSelectedStatus("2");
      resetAndLoad({});
    }}
  >
    Failed
  </Chip>
</div>
      {/* ================= LOADING (FIRST PAGE) ================= */}
      {isLoading && state.page === 1 && (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-32 rounded-3xl bg-white/5 animate-pulse border border-white/10"
            />
          ))}
        </div>
      )}

      {/* ================= EMPTY ================= */}
      {!isLoading && items.length === 0 && (
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 text-center">
          <p className="text-sm text-gray-300">No withdrawals found</p>
          <p className="text-xs text-gray-500 mt-1">Try changing filters or search</p>
        </div>
      )}

      {/* ================= LIST ================= */}
      <div className="space-y-4">
        {items.map((item) => (
          <WithdrawHistoryCard key={item._id} item={item} />
        ))}
      </div>

      {/* ================= PAGINATION ================= */}
      {hasMore && (
        <button
          onClick={() => setState((s) => ({ ...s, page: s.page + 1 }))}
          className="w-full mt-6 py-3 rounded-2xl text-sm font-semibold text-black
            bg-[#C5D82E] active:scale-[0.99] transition
            shadow-[0_12px_30px_rgba(197,216,46,0.18)]
            flex items-center justify-center gap-2"
        >
          {isFetching ? <Loader2 size={16} className="animate-spin" /> : null}
          {isFetching ? "Loading..." : "Load more"}
        </button>
      )}

      {/* ================= FOOTER COUNT ================= */}
      {pagination?.total != null && (
        <div className="text-center text-xs text-white/40 mt-4">
          Showing {items.length} of {pagination.total}
        </div>
      )}
    </div>
  );
}

/* ================= CHIP ================= */

function Chip({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1.5 rounded-full text-xs font-medium border transition
        ${active
          ? "bg-[#C5D82E] text-black border-[#C5D82E]"
          : "bg-white/5 text-white/70 border-white/10"}`}
    >
      {children}
    </button>
  );
}

/* ================= CARD ================= */

function WithdrawHistoryCard({ item }) {
  const isUSDT = (item.currency || "").toUpperCase() === "USDT";
  const statusMeta = getStatusMeta(item.status);

  // Amount logic for mixed currency
  // USDT: use note (it contains 20 USDT + final 18.8), but we also have INR amount_in_inr
  // INR: amount is main, amount_in_inr is 0
  const mainAmountLabel = isUSDT ? "USDT Request" : "INR Withdrawal";
  const mainAmountValue = isUSDT
    ? parseUSDTRequested(item.note) || "USDT"
    : `₹${formatINR(item.amount)}`;

  const inrDeducted = isUSDT ? item.amount_in_inr : item.amount; // for INR withdrawals, amount is INR
  const rate = item.inr_price;

  return (
    <div className="rounded-3xl p-[1px] bg-gradient-to-br from-[#20934A]/60 via-[#C5D82E]/25 to-[#20934A]/60">
      <div className="rounded-3xl p-4 bg-[linear-gradient(180deg,#13261E,#0F1D18)] space-y-3">

        {/* Top row */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className={`w-10 h-10 rounded-2xl flex items-center justify-center border ${statusMeta.iconWrap}`}>
              <statusMeta.icon size={16} className={statusMeta.iconColor} />
            </div>

            <div className="min-w-0">
              <p className="text-xs text-white/50">{mainAmountLabel}</p>
              <p className="text-sm font-semibold text-white truncate">
                {isUSDT ? `${mainAmountValue}` : `${mainAmountValue}`}
              </p>
            </div>
          </div>

          <span className={`text-[11px] px-2 py-1 rounded-full border ${statusMeta.badge}`}>
            {statusMeta.label}
          </span>
        </div>

        {/* Middle stats */}
        <div className="grid grid-cols-2 gap-3">
          <StatBox
            icon={isUSDT ? IndianRupee : IndianRupee}
            title={isUSDT ? "INR Deducted" : "INR Amount"}
            value={`₹${formatINR(inrDeducted)}`}
            accent="text-white"
          />
          <StatBox
            icon={isUSDT ? DollarSign : AlertCircle}
            title={isUSDT ? "Rate (₹/USDT)" : "Fee (INR)"}
            value={
              isUSDT
                ? `₹${rate || "--"}`
                : `₹${formatINR(item.admin_inr_charges || 0)}`
            }
            accent={isUSDT ? "text-[#C5D82E]" : "text-white"}
          />
        </div>

        {/* Wallet / Hash section */}
        {isUSDT ? (
          <div className="space-y-2">
            <RowLine
              icon={Wallet}
              label="Wallet"
              value={shortAddr(extractWallet(item.note) || "")}
              mono
            />
            {item.txn_hash ? (
              <RowLine
                icon={Hash}
                label="Txn"
                value={shortHash(item.txn_hash)}
                mono
              />
            ) : null}
          </div>
        ) : (
          <div className="space-y-2">
            <RowLine
              icon={AlertCircle}
              label="Note"
              value={item.note || "—"}
            />
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between text-xs text-white/35 pt-2 border-t border-white/10">
          <div className="flex items-center gap-1">
            <Clock size={12} />
            {formatDate(item.created_at)}
          </div>
          <span className="text-white/30">{item.currency}</span>
        </div>
      </div>
    </div>
  );
}

function StatBox({ icon: Icon, title, value, accent = "text-white" }) {
  return (
    <div className="rounded-2xl bg-black/25 border border-white/10 p-3">
      <div className="flex items-center gap-2 text-xs text-white/50">
        <Icon size={14} className="text-white/40" />
        {title}
      </div>
      <div className={`text-sm font-semibold mt-1 ${accent}`}>{value}</div>
    </div>
  );
}

function RowLine({ icon: Icon, label, value, mono = false }) {
  return (
    <div className="flex items-center gap-2 text-xs text-white/55">
      <Icon size={13} className="text-white/35" />
      <span className="text-white/40">{label}:</span>
      <span className={`text-white/75 ${mono ? "font-mono" : ""} truncate`}>
        {value || "—"}
      </span>
    </div>
  );
}

/* ================= STATUS MAP (numeric) =================
   Adjust if your backend uses different meanings.
   Based on your sample: status 1 and 2 exist.
*/
function getStatusMeta(status) {
  // Only two states in UI:
  // 1 = Success
  // anything else = Failed

  if (status === 1) {
    return {
      label: "Success",
      icon: CheckCircle2,
      iconColor: "text-[#C5D82E]",
      iconWrap: "border-[#C5D82E]/30 bg-[#C5D82E]/10",
      badge: "border-[#C5D82E]/30 bg-[#C5D82E]/10 text-[#C5D82E]",
    };
  }

  return {
    label: "Failed",
    icon: XCircle,
    iconColor: "text-red-400",
    iconWrap: "border-red-500/30 bg-red-500/10",
    badge: "border-red-500/30 bg-red-500/10 text-red-400",
  };
}

/* ================= HELPERS ================= */

function formatINR(n) {
  const num = Number(n || 0);
  return num.toLocaleString("en-IN", { maximumFractionDigits: 2 });
}

function formatDate(iso) {
  try {
    return new Date(iso).toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return iso || "";
  }
}

function shortAddr(addr) {
  if (!addr) return "";
  if (addr.length <= 14) return addr;
  return `${addr.slice(0, 6)}…${addr.slice(-4)}`;
}

function shortHash(h) {
  if (!h) return "";
  return `${h.slice(0, 10)}…${h.slice(-8)}`;
}

// tries to extract 0x... from note
function extractWallet(note = "") {
  const m = note.match(/0x[a-fA-F0-9]{40}/);
  return m ? m[0] : "";
}

// tries to extract "20 USDT" from note
function parseUSDTRequested(note = "") {
  const m = note.match(/(\d+(\.\d+)?)\s*USDT/i);
  return m ? `${m[1]} USDT` : "";
}
