import React, { useState, useEffect } from "react";
import { ArrowLeft, Check, CheckCheck } from "lucide-react";
import { decryptMessage } from "../socket/encryptmsg";

const MessageInfoPanel = ({ data, loading, members, groupKey, onClose, formatTime, isMobile }) => {

  // console.log(groupKey ,"groupkey123")
  const [mounted, setMounted] = useState(false);
  const [decryptedText, setDecryptedText] = useState(null);
  const [decrypting, setDecrypting] = useState(false);

  /* slide-in on mount */
  useEffect(() => {
    const raf = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  /* decrypt message whenever data changes */
  useEffect(() => {
    // console.log("🔵 decrypt useEffect triggered", { data, groupKey });

    if (!data?.message.msgBody) {
      console.warn("⚠️ No msgBody found in data — skipping decrypt", data);
      return;
    }

    const run = async () => {
      setDecrypting(true);
      setDecryptedText(null);

      const payload = data.message.msgBody.message;
      // console.log(payload,'payload213')
      if (payload?.cipherText && payload?.iv && payload?.authTag) {
        const result = await decryptMessage(payload, groupKey);
        // console.log("✅ Decryption result:", result);
        setDecryptedText(result);
      } else {
        // console.log("📝 Payload is NOT encrypted — using as plain text");
        // console.log("   typeof payload:", typeof payload);
        // console.log("   payload?.media:", payload?.media);

        const fallback =
          typeof payload === "string"
            ? payload
            : payload?.media?.fileName || "Media message";

        // console.log("📝 Fallback text set to:", fallback);
        setDecryptedText(fallback);
      }

      setDecrypting(false);
      // console.log("🏁 Decrypt run complete");
    };

    run();
  }, [data, groupKey]);

  const handleClose = () => {
    // console.log("🚪 handleClose called");
    setMounted(false);
    setTimeout(onClose, 300);
  };

  const getMemberName = (userId) => {
    // console.log("👤 getMemberName called with userId:", userId);
    const m = members?.find(
      (m) =>
        m.userId?.toString() === userId?.toString() ||
        m.id?.toString() === userId?.toString()
    );
    // console.log("👤 resolved member:", m);
    return m?.name || userId || "Unknown";
  };

  /* ── Avatar ── */
  const Avatar = ({ name }) => (
    <div className="w-9 h-9 rounded-full bg-teal-50 border border-teal-100 flex items-center justify-center shrink-0 text-sm font-bold text-teal-600">
      {(name || "?")[0]?.toUpperCase()}
    </div>
  );

  /* ── Member row ── */
  const MemberRow = ({ userId, timeLabel, last }) => {
    const name = getMemberName(userId);
    return (
      <div
        className={`flex items-center justify-between px-4 py-2.5 ${last ? "" : "border-b border-teal-100"
          }`}
      >
        <div className="flex items-center gap-3 min-w-0">
          <Avatar name={name} />
          <span className="text-[13.5px] font-medium text-teal-950 truncate">
            {name}
          </span>
        </div>
        <span className="text-[11.5px] text-teal-400 shrink-0 ml-2">
          {timeLabel || "—"}
        </span>
      </div>
    );
  };

  /* ── Section header ── */
  const SectionHeader = ({ icon: Icon, label, className = "" }) => (
    <div className={`flex items-center gap-2.5 px-4 pt-3 pb-2 bg-teal-50 ${className}`}>
      <Icon className="w-[18px] h-[18px] shrink-0" />
      <span className="text-[11px] font-bold uppercase tracking-widest">
        {label}
      </span>
    </div>
  );

  const readBy = data?.message?.metaData?.readBy || [];
  const deliveredTo = data?.message?.metaData?.deliveredTo || [];

  // console.log("📬 readBy:", readBy);
  // console.log("📬 deliveredTo:", deliveredTo);
  // console.log("📬 sentAt:", data?.message?.metaData?.sentAt);
  // console.log("🕐 timestamp:", data?.timestamp);

  return (
    <div
      className={`absolute top-0 right-0 bottom-0 z-30 flex flex-col bg-teal-50
        ${isMobile ? "w-full border-l-0" : "w-[420px] border-l border-teal-100"}
        transition-transform duration-300 ease-out
        ${mounted ? "translate-x-0" : "translate-x-full"}`}
    >
      {/* ── HEADER ── */}
      <div
        className={`flex items-center gap-3 shrink-0 px-4
          ${isMobile ? "pt-10 pb-4" : "pt-7 pb-4"}`}
        style={{ background: "linear-gradient(135deg, #0fa89e 0%, #0c8c83 100%)" }}
      >
        <button
          onClick={handleClose}
          className="w-[34px] h-[34px] rounded-full flex items-center justify-center
            bg-white/20 border-0 cursor-pointer text-white shrink-0
            hover:bg-white/30 transition-colors"
        >
          <ArrowLeft className="w-[18px] h-[18px]" />
        </button>
        <h2 className="text-base font-bold text-white m-0 tracking-wide">
          Message info
        </h2>
      </div>

      {/* ── BODY ── */}
      <div className="flex-1 overflow-y-auto">

        {/* Loading spinner */}
        {loading && (
          <div className="flex items-center justify-center h-44">
            <div className="w-9 h-9 rounded-full border-[3px] border-teal-100 border-t-teal-600 animate-spin" />
          </div>
        )}

        {/* No data */}
        {!loading && !data && (
          <div className="flex flex-col items-center justify-center h-44">
            <p className="text-teal-400 text-sm">No data available</p>
          </div>
        )}

        {/* Data */}
        {!loading && data && (
          <>
            {/* ── Message preview bubble ── */}
            <div className="px-4 pt-4 bg-teal-50">
              <div className="max-w-[80%] ml-auto bg-teal-600 rounded-[18px_4px_18px_18px] px-3.5 py-2.5">
                {decrypting ? (
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full border-2 border-white/40 border-t-white animate-spin" />
                    <p className="text-[13px] text-white/70 m-0">Decrypting…</p>
                  </div>
                ) : (
                  <p className="text-[13.5px] text-white m-0 leading-relaxed break-words">
                    {decryptedText ?? "…"}
                  </p>
                )}
                <p className="text-[10.5px] text-white/65 text-right mt-1 mb-0">
                  {formatTime(data.timestamp)}
                </p>
              </div>
            </div>

            {/* ── Sent at ── */}
            <div className="mx-4 mt-4 bg-white rounded-2xl overflow-hidden border border-teal-100">
              <SectionHeader
                icon={Check}
                label="Sent"
                className="text-teal-700 [&_svg]:text-teal-300"
              />
              <div className="px-4 pb-3 pt-1">
                <p className="text-[13px] text-teal-950 m-0">
                  {data.message.metaData?.sentAt
                    ? new Date(data.message.metaData.sentAt).toLocaleString("en-IN", {
                      day: "numeric", month: "short", year: "numeric",
                      hour: "numeric", minute: "2-digit", hour12: true,
                    })
                    : formatTime(data.timestamp)}
                </p>
              </div>
            </div>

            {/* ── Delivered to ── */}
            {/* {deliveredTo.length > 0 && (
              <div className="mx-4 mt-3 bg-white rounded-2xl overflow-hidden border border-teal-100">
                <SectionHeader
                  icon={Check}
                  label={`Delivered to · ${deliveredTo.length}`}
                  className="text-teal-500 [&_svg]:text-teal-500"
                />
                {deliveredTo.map((d, i) => (
                  <MemberRow
                    key={i}
                    userId={d.userId}
                    timeLabel={d.deliveredAt ? formatTime(d.deliveredAt) : null}
                    last={i === deliveredTo.length - 1}
                  />
                ))}
              </div>
            )} */}

            {/* ── Read by ── */}
            <div className="mx-4 mt-3 mb-4 bg-white rounded-2xl overflow-hidden border border-teal-100">
              <SectionHeader
                icon={CheckCheck}
                label={`Read by · ${readBy.length}`}
                className="text-teal-500 [&_svg]:text-teal-500"
              />
              {readBy.length > 0 ? (
                readBy.map((r, i) => (
                  <MemberRow
                    key={i}
                    userId={r.userId}
                    timeLabel={r.readAt ? formatTime(r.readAt) : null}
                    last={i === readBy.length - 1}
                  />
                ))
              ) : (
                <p className="px-4 pt-2 pb-3.5 text-[13px] text-teal-400 m-0">
                  Not read by anyone yet
                </p>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MessageInfoPanel;