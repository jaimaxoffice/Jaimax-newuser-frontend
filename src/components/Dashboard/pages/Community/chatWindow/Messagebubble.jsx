

import React, { useState, useMemo, useEffect } from "react";
import {
  File, Download, ArrowUpRight, ChevronDown,
  AlertTriangle, X, Pin,
} from "lucide-react";
import { decryptMessage } from "../socket/encryptmsg";
import MessageText, { safeReplyText } from "./MessageText";

const MessageBubble = ({
  msg, currentUser, members, groupKey,
  effectiveOpenMenuId, copiedMessageId,
  toggleMenu, scrollToMessage,
  formatTime, formatFileSize, renderMessageWithLinks,
  getMessageReadStatus, isEdited, isForwarded,
  starred, pinned, reactions, readStatus,
  onReact, onRemoveReaction, onMediaLoad
}) => {
  const id = msg._id?.toString() || msg.id?.toString();
  const [activeGif, setActiveGif] = useState(null);

  // useEffect(() => {
  //   if (isFile && !fileType(msg)?.startsWith("image/") && !msg.msgBody?.media?.is_uploading) {
  //     onMediaLoad?.();
  //   }
  // }, [msg.msgBody?.media?.is_uploading]);

  console.log(msg, 'msg12e34')

  /* ── deleted-for-me guard ── */
  if (msg.deletedFor && Array.isArray(msg.deletedFor)) {
    if (msg.deletedFor.some(uid => uid?.toString() === currentUser?.id?.toString())) return null;
  }

  if (
    msg.messageType === "system" ||
    msg.msgBody?.message_type === "system" ||
    msg.msgType === "system" ||
    msg.type === "system"
  ) return null;

  const isMe = msg.fromUserId?.toString() === currentUser?.id?.toString();
  const isPinned = pinned || msg.isPinned;
  const isPending = msg.msgStatus === "pending";

  /* ── pin helpers ── */
  const formatPinTime = at => {
    if (!at) return "";
    const d = Math.floor((Date.now() - new Date(at)) / 1000);
    if (d < 60) return "just now";
    if (d < 3600) return `${Math.floor(d / 60)}m ago`;
    if (d < 86400) return `${Math.floor(d / 3600)}h ago`;
    if (d < 604800) return `${Math.floor(d / 86400)}d ago`;
    return new Date(at).toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  const getPinner = () => {
    const n = msg.pinnedBy || msg.pinnedByName;
    if (!n) return "";
    if (msg.pinnedBy === currentUser?.id?.toString() || msg.pinnedByName === currentUser?.name) return "You";
    return n.length > 20 ? n.slice(0, 18) + "…" : n;
  };

  /* ── text helpers ── */
  const isEnc = v => !!(v?.cipherText || v?.ciphertext || v?.encrypted || (v?.iv && v?.authTag));
  const safe = v => {
    if (!v || v === undefined) return "";
    if (typeof v === "string") return v;
    if (typeof v === "object") {
      if (isEnc(v)) return "";
      return v.text ? String(v.text) : v.body ? String(v.body) : v.content ? String(v.content) : "";
    }
    return String(v);
  };

  const resolveText = (m, k) => {
    const t = m.msgBody?.message;
    if (!t) return "";
    if (typeof t === "string") return t;
    if (typeof t === "object") {
      if (isEnc(t) && k) { try { const d = decryptMessage(t, k); if (typeof d === "string" && d.length) return d; } catch { } }
      return t.text ? String(t.text) : t.body ? String(t.body) : "";
    }
    return String(t || "");
  };

  const decText = useMemo(() => resolveText(msg, groupKey), [msg._id, msg.msgBody?.message, groupKey]);

  /* ── file helpers ── */
  const fileUrl = m => m.msgBody?.media?.tempPreview || m.msgBody?.media?.file_url || m.fileUrl || m.msgBody?.media?.fileUrl || null;
  const fileType = m => {
    const t = m.msgBody?.media?.file_type || m.msgBody?.media?.fileType; if (t) return t;
    const n = m.msgBody?.media?.fileName || "";
    if (/\.(jpg|jpeg|png|gif|webp|bmp|svg)$/i.test(n)) return "image/jpeg";
    if (/\.(mp4|mov|avi|webm)$/i.test(n)) return "video/mp4";
    if (/\.(pdf)$/i.test(n)) return "application/pdf";
    if (/\.gif$/i.test(n)) return "image/gif";
    return null;
  };
  const fileName = m => m.msgBody?.media?.fileName || (typeof m.msgBody?.message === "string" && m.msgBody.message) || "File";
  const fileSize = m => m.msgBody?.media?.file_size || m.msgBody?.media?.fileSize || null;

  const replyText = rt => {
    if (!rt) return "Message";
    if (rt.message_type === "file" || rt.msgBody?.message_type === "file") return `📎 ${rt.msgBody?.media?.fileName || rt.message || "Media"}`;
    const rc = rt.message || rt.msgBody?.message;
    if (typeof rc === "object" && isEnc(rc)) {
      if (groupKey) { try { const d = decryptMessage(rc, groupKey); if (typeof d === "string" && d.length) return d.slice(0, 100); } catch { } }
      return "Message";
    }
    if (typeof rc === "string" && rc.length) return rc.slice(0, 100);
    try { const s = safeReplyText(rc, groupKey); if (typeof s === "string" && s.length) return s.slice(0, 90); } catch { }
    return "Message";
  };

  const currentReactions = reactions || msg.reactions || [];
  const isFile = !!fileUrl(msg);
  const hasContent = msg.deletedForEveryone || isFile || (decText && decText.trim().length > 0);
  if (!hasContent) return null;

  /* ── bubble colours (website palette) ── */
  const bubbleBg = msg.deletedForEveryone
    ? "#f0fdfa"
    : isPending
      ? isMe ? "rgba(13,148,136,.45)" : "#f0fdfa"
      : isMe ? "#0d9488" : "#397378";

  const bubbleBdr = isPinned && !msg.deletedForEveryone
    ? "1.5px solid rgba(215,119,6,.35)"
    : isMe ? "none" : "1px solid #99f6e4";

  const bubbleRadius = isPinned && !msg.deletedForEveryone
    ? "0 0 16px 16px"
    : isMe ? "18px 4px 18px 18px" : "4px 18px 18px 18px";

  return (
    <div
      id={`msg-${id}`}
      data-msg-id={id}
      data-from-user-id={msg.fromUserId}
      className="group"
      style={{ display: "flex", justifyContent: isMe ? "flex-end" : "flex-start", marginBottom: 5, position: "relative" }}
    >
      <div style={{ position: "relative", maxWidth: "min(72%,480px)", minWidth: 0 }}>

        {/* ── PIN BANNER ── */}
        {isPinned && !msg.deletedForEveryone && (
          <div style={{
            display: "flex", alignItems: "center", gap: 5,
            justifyContent: isMe ? "flex-end" : "flex-start",
            padding: "3px 10px 2px",
            background: "#f0faf9",
            borderRadius: "8px 8px 0 0",
          }}>
            <Pin className="w-2.5 h-2.5 shrink-0" style={{ color: "#115e59", transform: "rotate(45deg)" }} />
            <span className="text-[10.5px] font-bold tracking-wide" style={{ color: "#115e59" }}>
              {getPinner() ? `Pinned by ${getPinner()}` : "Pinned"}
            </span>
            {msg.pinnedAt && (
              <>
                <span style={{ fontSize: 10, color: "#115e59" }}>·</span>
                <span style={{ fontSize: 10, color: "#115e59" }}>{formatPinTime(msg.pinnedAt)}</span>
              </>
            )}
          </div>
        )}

        {/* ── FORWARDED TAG ── */}
        {(isForwarded || msg.isForwarded) && !msg.deletedForEveryone && (
          <div className="flex items-center gap-1.5 px-3 pt-1 text-[11px] italic tracking-wide" style={{ color: "#5eead4" }}>
            <svg width="11" height="11" viewBox="0 0 16 16" fill="currentColor">
              <path d="M9.5 2L14 6.5 9.5 11V8C5 8 2.5 10 1 13c0-5 3-8 8.5-8V2z" />
            </svg>
            Forwarded
          </div>
        )}

        {/* ════════ MAIN BUBBLE ════════ */}
        <div style={{
          position: "relative",
          borderRadius: bubbleRadius,
          padding: "9px 13px 7px",
          background: bubbleBg,
          border: bubbleBdr,
          wordBreak: "break-word", overflowWrap: "anywhere",
          transition: "background .15s",
        }}>

          {/* Sender name — incoming only */}
          {!isMe && !msg.deletedForEveryone && (
            <p className="text-[11.5px] font-bold mb-1 tracking-wide overflow-hidden text-ellipsis whitespace-nowrap"
              style={{ color: "#23afa6" }}>
              {safe(msg.fromUserId || "Unknown")}
            </p>
          )}

          {/* Reply preview */}
          {msg.replyTo && !msg.deletedForEveryone && (
            <div
              onClick={() => scrollToMessage(msg.replyTo.msgId || msg.replyTo._id?.toString() || msg.replyTo.id?.toString())}
              style={{
                marginBottom: 8, padding: "6px 10px", borderRadius: 9,
                borderLeft: `3px solid ${isMe ? "rgba(255,255,255,.5)" : "#0d9488"}`,
                background: isMe ? "rgba(0,0,0,.12)" : "#f0fdfa",
                cursor: "pointer", transition: "background .15s",
              }}
              onMouseEnter={e => e.currentTarget.style.background = isMe ? "rgba(0,0,0,.18)" : "#ccfbf1"}
              onMouseLeave={e => e.currentTarget.style.background = isMe ? "rgba(0,0,0,.12)" : "#f0fdfa"}
            >
              <p className="text-[10.5px] font-bold mb-0.5 overflow-hidden text-ellipsis whitespace-nowrap"
                style={{ color: isMe ? "rgba(255,255,255,.8)" : "#0d9488" }}>
                {safe(msg.replyTo.fromUserId || "Unknown")}
              </p>
              <p className="text-[11.5px] line-clamp-2"
                style={{ color: isMe ? "rgba(255,255,255,0.72)" : "#134e4a" }}>
                {replyText(msg.replyTo)}
              </p>
            </div>
          )}

          {/* ── DELETED ── */}
          {msg.deletedForEveryone ? (
            <p className="text-[13px] italic flex items-center gap-1.5 py-0.5" style={{ color: "#000000" }}>
              <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
              </svg>
              This message was deleted
            </p>
          ) : (
            <>
              {/* ── IMAGE ── */}
              {isFile && (fileType(msg)?.startsWith("image/") || msg.msgBody?.media?.message_type === "image" || msg.messageType === "image") && (
                <div style={{ position: "relative", maxWidth: 260, marginBottom: decText && decText !== fileName(msg) ? 6 : 0 }}>
                  <div className="rounded-[10px] overflow-hidden">
                    <img
                      src={fileUrl(msg)} alt={fileName(msg)}
                      style={{
                        width: "100%", height: "auto",
                        maxHeight: fileType(msg) === "image/gif" ? "none" : 280,
                        objectFit: "cover", display: "block",
                        opacity: msg.msgBody?.media?.is_uploading ? 0.5 : 1,
                        cursor: msg.msgBody?.media?.is_uploading ? "wait" : "pointer",
                        transition: "opacity .2s", borderRadius: 10,
                      }}
                      onLoad={() => onMediaLoad?.()}

                      onMouseEnter={e => { if (!msg.msgBody?.media?.is_uploading) e.currentTarget.style.opacity = ".88"; }}
                      onMouseLeave={e => e.currentTarget.style.opacity = "1"}
                      onClick={() => {
                        if (!msg.msgBody?.media?.is_uploading && fileUrl(msg)) {
                          if (/\.gif$/i.test(fileName(msg))) setActiveGif(fileUrl(msg));
                          else if (!fileUrl(msg).startsWith("blob:")) window.open(fileUrl(msg), "_blank");
                        }
                      }}
                    />
                  </div>
                </div>
              )}

              {/* ── NON-IMAGE FILE ── */}
              {isFile && !fileType(msg)?.startsWith("image/") && (
                <div
                  onClick={() => {
                    if (!msg.msgBody?.media?.is_uploading && fileUrl(msg)) {
                      window.open(fileUrl(msg), "_blank");
                    }
                  }}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 11,
                    padding: "10px 12px",
                    borderRadius: 12,
                    background: isMe ? "rgba(0,0,0,.12)" : "#f0fdfa",
                    cursor: msg.msgBody?.media?.is_uploading ? "wait" : "pointer",
                    maxWidth: 300,
                    transition: "background .15s",
                    opacity: msg.msgBody?.media?.is_uploading ? 0.65 : 1,
                  }}

                  onMouseEnter={e => {
                    if (!msg.msgBody?.media?.is_uploading) {
                      e.currentTarget.style.background = isMe ? "rgba(0,0,0,.18)" : "#ccfbf1";
                    }
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = isMe ? "rgba(0,0,0,.12)" : "#f0fdfa";
                  }}
                >
                  <div
                    className="w-10 h-10 rounded-[10px] flex items-center justify-center shrink-0"
                    style={{ background: isMe ? "rgba(255,255,255,.25)" : "#0d9488" }}
                  >
                    {msg.msgBody?.media?.is_uploading ? (
                      <div
                        className="w-[18px] h-[18px] rounded-full border-2 animate-spin"
                        style={{
                          borderColor: isMe ? "rgba(255,255,255,.3)" : "rgba(13,148,136,.3)",
                          borderTopColor: isMe ? "#ffffff" : "#0d9488",
                        }}
                      />
                    ) : (
                      <File className="w-[18px] h-[18px] text-white" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <p
                      className="font-bold text-[13px] overflow-hidden text-ellipsis whitespace-nowrap"
                      style={{ color: isMe ? "#ffffff" : "#134e4a" }}
                    >
                      {fileName(msg)}
                    </p>
                    <p
                      className="text-[11px] mt-1"
                      style={{ color: isMe ? "rgba(255,255,255,.72)" : "#6b7280" }}
                    >
                      {fileSize(msg)
                        ? formatFileSize(fileSize(msg))
                        : fileType(msg)?.split("/")[1]?.toUpperCase() || "FILE"}
                    </p>
                    {!msg.msgBody?.media?.is_uploading && (
                      <a
                        href={fileUrl(msg)}
                        download={fileName(msg)}
                        onClick={e => e.stopPropagation()}
                        className="inline-flex items-center gap-1 mt-1 text-[11px] font-semibold"
                        style={{ color: isMe ? "rgba(255,255,255,.8)" : "#0d9488", textDecoration: "none" }}
                      >
                        <Download className="w-[11px] h-[11px]" />
                        Download
                      </a>
                    )}
                  </div>
                </div>
              )}

              {/* ── TEXT ── */}
              {decText && !isFile && (
                <MessageText
                  text={decText} isCurrentUser={isMe}
                  isReported={msg.isreported?.count >= 3 && msg.isreported?.isHidden}
                  renderMessageWithLinks={renderMessageWithLinks}
                />
              )}

              {/* ── FILE CAPTION ── */}
              {isFile && decText && decText !== fileName(msg) && (
                <p className="text-[12.5px] mt-1.5 leading-relaxed"
                  style={{ color: isMe ? "rgba(255,255,255,.85)" : "#ffffff" }}>
                  {renderMessageWithLinks ? renderMessageWithLinks(decText) : decText}
                </p>
              )}
            </>
          )}

          {/* ── REPORTED BADGE ── */}
          {msg.isreported?.count >= 3 && msg.isreported?.isHidden && (
            <div className="mt-2 px-2.5 py-1.5 rounded-lg flex items-center gap-1.5"
              style={{ background: "rgba(239,68,68,.08)", border: "1px solid rgba(239,68,68,.2)" }}>
              <AlertTriangle className="w-[13px] h-[13px] shrink-0 text-red-500" />
              <p className="text-[11.5px] font-semibold text-red-500">
                Reported {msg.isreported.count} times
              </p>
            </div>
          )}

          {/* ── TIMESTAMP ROW ── */}
          {!msg.deletedForEveryone && (
            <div className="flex items-center justify-end gap-1 mt-1">
              {isPinned && (
                <Pin className="w-[12px] h-[12px]" style={{ color: "#ffffff", transform: "rotate(45deg)" }} />
              )}
              {(isEdited || msg.isEdited) && (
                <span className="text-[9.5px] italic" style={{ color: isMe ? "rgba(255,255,255,0.72)" : "#6b7280" }}>
                  edited
                </span>
              )}
              <span className="text-[10px] tracking-wide" style={{ color: isMe ? "#ffffff" : "#ffffff" }}>
                {formatTime(msg.timestamp)}
              </span>
              {isMe && <ReadTicks status={readStatus} />}

              {/* Menu chevron */}
              <button
                className="group-hover:!opacity-100 ml-px p-px rounded-[5px] border-none bg-transparent cursor-pointer flex items-center opacity-0 transition-opacity"
                style={{ color: isMe ? "rgba(255,255,255,.4)" : "#6b7280" }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = isMe ? "rgba(255,255,255,.12)" : "#f0fdfa";
                  e.currentTarget.style.color = isMe ? "#ffffff" : "#134e4a";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.color = isMe ? "rgba(255,255,255,.4)" : "#6b7280";
                }}
                onClick={e => toggleMenu(id, e, isMe)}
              >
                <ChevronDown className="w-[13px] h-[13px]" />
              </button>
            </div>
          )}
        </div>{/* ── end main bubble ── */}

        {/* ── REACTIONS ── */}
        {currentReactions.length > 0 && !msg.deletedForEveryone && (
          <div className={`flex flex-wrap gap-1 mt-1 ${isMe ? "justify-end" : "justify-start"}`}>
            {Object.entries(
              currentReactions.reduce((a, r) => { a[r.emoji] = (a[r.emoji] || 0) + 1; return a; }, {})
            ).map(([emoji, count]) => {
              const mine = currentReactions.find(r => r.emoji === emoji && r.userId === currentUser?.id?.toString());
              return (
                <button
                  key={emoji}
                  onClick={() => mine ? onRemoveReaction?.(id) : onReact?.(id, emoji)}
                  className="inline-flex items-center gap-1 px-2 py-0.5 rounded-[20px] cursor-pointer transition-all"
                  style={{
                    border: mine ? "1.5px solid #0d9488" : "1px solid #99f6e4",
                    background: mine ? "rgba(13,148,136,.1)" : "#ffffff",
                  }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = "#0d9488"; e.currentTarget.style.background = "rgba(13,148,136,.12)"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = mine ? "#0d9488" : "#99f6e4"; e.currentTarget.style.background = mine ? "rgba(13,148,136,.1)" : "#ffffff"; }}
                >
                  <span className="text-[13px]">{emoji}</span>
                  <span className="text-[10.5px] font-semibold" style={{ color: "#134e4a" }}>{count}</span>
                </button>
              );
            })}
          </div>
        )}

        {/* ── HOVER PILLS (desktop) ── */}
        {!msg.deletedForEveryone && (
          <div
            className="group-hover:!opacity-100 group-hover:!pointer-events-auto absolute top-1 flex items-center gap-1 opacity-0 transition-opacity pointer-events-none"
            style={{ ...(isMe ? { left: -84 } : { right: -84 }) }}
          >
            <button
              onClick={e => onReact?.(id, e)}
              className="p-1.5 rounded-[9px] cursor-pointer text-[14px] flex items-center transition-all"
              style={{ border: "1px solid #99f6e4", background: "#ffffff" }}
              onMouseEnter={e => { e.currentTarget.style.background = "#f0fdfa"; e.currentTarget.style.transform = "scale(1.08)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "#ffffff"; e.currentTarget.style.transform = "scale(1)"; }}
              title="React"
            >😀</button>
            <button
              onClick={e => toggleMenu(id, e, isMe)}
              className="p-1.5 rounded-[9px] cursor-pointer flex items-center transition-all"
              style={{ border: "1px solid #99f6e4", background: "#ffffff", color: "#134e4a" }}
              onMouseEnter={e => { e.currentTarget.style.background = "#f0fdfa"; e.currentTarget.style.transform = "scale(1.08)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "#ffffff"; e.currentTarget.style.transform = "scale(1)"; }}
            >
              <ChevronDown className="w-[13px] h-[13px]" />
            </button>
          </div>
        )}

        {/* ── GIF LIGHTBOX ── */}
        {activeGif && (
          <div
            onClick={() => setActiveGif(null)}
            className="fixed inset-0 z-[9999] flex items-center justify-center"
            style={{ background: "rgba(0,0,0,.88)", backdropFilter: "blur(6px)" }}
          >
            <div
              className="relative"
              style={{ maxWidth: "90vw", maxHeight: "90vh" }}
              onClick={e => e.stopPropagation()}
            >
              <button
                onClick={() => setActiveGif(null)}
                className="absolute -top-10 right-0 p-2 rounded-[9px] cursor-pointer text-white flex transition-colors"
                style={{ background: "rgba(255,255,255,.1)", border: "1px solid rgba(255,255,255,.15)" }}
                onMouseEnter={e => e.currentTarget.style.background = "#0d9488"}
                onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,.1)"}
              >
                <X className="w-4 h-4" />
              </button>
              <img
                src={activeGif} alt="GIF"
                className="rounded-[14px] object-contain"
                style={{ maxWidth: "100%", maxHeight: "85vh" }}
                onLoad={() => onMediaLoad?.()}

              />
            </div>
          </div>
        )}

      </div>{/* ── end maxWidth wrapper ── */}

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        .group:hover .group-hover\\:\\!opacity-100          { opacity: 1 !important; }
        .group:hover .group-hover\\:\\!pointer-events-auto  { pointer-events: auto !important; }
      `}</style>
    </div>
  );
};

/* ── READ STATUS TICKS ─────────────────────────────────────────────────── */
const ReadTicks = ({ status }) => {
  if (!status) return null;
  const b = { fill: "none", stroke: "currentColor", strokeWidth: 1.7, strokeLinecap: "round", strokeLinejoin: "round" };
  switch (status) {
    case "sending":
      return <svg width="13" height="10" viewBox="0 0 16 11" style={{ color: "rgba(255,255,255,.3)" }}><path {...b} d="M11 1L4 8.5 1.5 6" opacity=".5" /></svg>;
    case "sent":
      return <svg width="13" height="10" viewBox="0 0 16 11" style={{ color: "rgba(255,255,255,.65)" }}><path {...b} d="M11 1L4 8.5 1.5 6" /></svg>;
    case "delivered": case "delivered_all":
      return <svg width="17" height="10" viewBox="0 0 20 11" style={{ color: "rgba(255,255,255,.65)" }}><path {...b} d="M11 1L4 8.5 1.5 6" /><path {...b} d="M15 1L8 8.5 5.5 6" /></svg>;
    case "read_some": case "read_all":
      return <svg width="17" height="10" viewBox="0 0 20 11" style={{ color: "#5eead4" }}><path {...b} d="M11 1L4 8.5 1.5 6" /><path {...b} d="M15 1L8 8.5 5.5 6" /></svg>;
    case "failed":
      return <svg width="13" height="13" viewBox="0 0 16 16" fill="#ef4444"><path d="M8 1a7 7 0 100 14A7 7 0 008 1zm0 10.5a.75.75 0 110 1.5.75.75 0 010-1.5zM8 4a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 018 4z" /></svg>;
    default: return null;
  }
};

export default MessageBubble;