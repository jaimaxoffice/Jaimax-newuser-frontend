import React, { useEffect, useRef, useState, useCallback } from "react";
import Cookies from "js-cookie";
import {
  Users, ChevronDown, Pin, PinOff, X, ArrowDown,
  Reply, Copy, Check, Pencil, Info, Trash2, Flag, Smile,
} from "lucide-react";
import { decryptMessage } from "./socket/encryptmsg";
import Loader from "../../../../ReusableComponents/Loader/loader";
import loaderImage from "../../../../assets/logo.webp";

import ChatHeader from "./chatWindow/Chatheader";
import MessageBubble from "./chatWindow/Messagebubble";
import MessageInput from "./chatWindow/Messageinput";
import GroupInfoPanel from "./chatWindow/Groupinfopanel";
import SharedFilesPanel from "./chatWindow/Sharedfilespanel";
import {
  ClearChatModal, ErrorDetailModal, FileSendPreview,
  ImagePreviewModal, DocumentPreviewModal, ReportModal, ReadReceiptsModal,
} from "./chatWindow/Modals";
import MessageInfoPanel from "./chatWindow/MessageInfoPanel";
import ForwardModal from "./chatWindow/ForwardModal";
import StarredMessagesPanel from "./chatWindow/StarredMessagesPanel";


const C = {
  teal: "#ffffff",
  tealD: "#0c8c83",
  tealL: "#0fa89e",
  page: "#f0faf9",
  white: "#ffffff",
  t1: "#0fa89e",
  t2: "#0fa89e",
  t3: "#7aadaa",
  sep: "#e0f0ef",
  tealXL: "#085056",
  amber: "#ffffff",
  danger: "#ef4444",
};

const REACTION_EMOJIS = ["👍", "❤️", "😂", "😮", "😢", "🙏"];

function useIsMobile(bp = 640) {
  const [v, setV] = useState(typeof window !== "undefined" ? window.innerWidth < bp : false);
  useEffect(() => {
    const mq = window.matchMedia(`(max-width:${bp - 1}px)`);
    const h = e => setV(e.matches);
    mq.addEventListener("change", h); setV(mq.matches);
    return () => mq.removeEventListener("change", h);
  }, [bp]);
  return v;
}
function useIsTablet() {
  const [v, setV] = useState(typeof window !== "undefined" ? window.innerWidth >= 640 && window.innerWidth < 1024 : false);
  useEffect(() => {
    const h = () => setV(window.innerWidth >= 640 && window.innerWidth < 1024);
    window.addEventListener("resize", h);
    return () => window.removeEventListener("resize", h);
  }, []);
  return v;
}

/* ══════════════════════════════════════════════════════════════════════════ */
const ChatWindow = ({
  selectedGroup, messages, retryMessage, members, replyToMessage, groupKey,
  showMembers, refetchFiles, showClearChatModal, setShowClearChatModal,
  setShowMembers, handleReply, cancelReply, onClearChat,
  message, setMessage, onSendMessage, isInputDisabled, setIsInputDisabled,
  isLoadingMessages, isInitialMessagesLoad, loadNextPage, loadPrevPage,
  isLoadingUsers, userPage, totalPages, totalUsers, isLoadingGroups,
  onBackToGroups, currentUser, typingUsers, onlineUsers,
  showEmojiPicker, showFileTypeModal, setShowFileTypeModal, setShowEmojiPicker,
  selectedFile, filePreview, showFilePreview, audioBlob, recordingTime,
  loadMoreUsers, isLoadingMoreUsers, hasMoreUsers,
  showFilesPanel, setShowFilesPanel, openMenuId, setOpenMenuId,
  cancelFileUpload, sendFileMessage, cancelRecording, sendAudioMessage,
  handleTyping, formatTime, formatDuration, fileInputRef, emojiPickerRef,
  messagesEndRef, chatFiles, loadingFiles, uploadingFile, uploadingAudio,
  socketRef, formatDateHeader, groupMessagesByDate,
  deleteForMe, deleteForEveryone, onMarkAsRead,
  loadOlderMessages, loadNewerMessages, isLoadingOlder, isLoadingNewer,
  hasMoreOldMessages, hasMoreNewMessages, reportMessage,
  selectedImages, setSelectedImages, selectedDocument, setSelectedDocument,
  imageCaption, setImageCaption, documentCaption, setDocumentCaption,
  showImagePreview, setShowImagePreview, showDocumentPreview, setShowDocumentPreview,
  handleImageSelect, handleDocumentSelect, sendImageMessage, sendDocumentMessage,
  cancelImageUpload, cancelDocumentUpload, removeImage, formatFileSize,
  emojiButtonRef, emojiClickInsideRef, filesPagination, filesPage, setFilesPage,
  filesTabType, rateLimitError,
  isAdmin = false, isBlocked = false, onAdminDelete, onBlockUser, onUnblockUser, chatError,
  pinmessageError
}) => {
  const isMobile = useIsMobile();
  useIsTablet();

  // console.log(chatError, "chatError1w2e3r45")
  /* state */
  const [countdown, setCountdown] = useState(0);
  const containerRef = useRef(null);
  const headerRef = useRef(null);
  const messagesAreaRef = useRef(null);
  const inputRef = useRef(null);

  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const prevMessagesLengthRef = useRef(0);
  const [showErrorDetail, setShowErrorDetail] = useState(null);
  const [isComponentLoading, setIsComponentLoading] = useState(true);
  const [activeGroupTab, setActiveGroupTab] = useState("overview");
  const [localPinError, setLocalPinError] = useState(null);

  const hasMoreOldRef = useRef(hasMoreOldMessages);
  const isLoadOlderRef = useRef(isLoadingOlder);
  const hasMoreNewRef = useRef(hasMoreNewMessages);
  const isLoadNewerRef = useRef(isLoadingNewer);
  useEffect(() => { hasMoreOldRef.current = hasMoreOldMessages; }, [hasMoreOldMessages]);
  useEffect(() => { isLoadOlderRef.current = isLoadingOlder; }, [isLoadingOlder]);
  useEffect(() => { hasMoreNewRef.current = hasMoreNewMessages; }, [hasMoreNewMessages]);
  useEffect(() => { isLoadNewerRef.current = isLoadingNewer; }, [isLoadingNewer]);
  const [decryptedPinTexts, setDecryptedPinTexts] = useState({});
  const scrollPosRef = useRef(null);
  const isAtBottomRef = useRef(true);
  const isRestoringRef = useRef(false);

  const [userScrolledUp, setUserScrolledUp] = useState(false);
  const [newMsgCount, setNewMsgCount] = useState(0);
  const [copiedMsgId, setCopiedMsgId] = useState(null);
  const membersContainerRef = useRef(null);

  const [showReportModal, setShowReportModal] = useState(false);
  const [reportingMsg, setReportingMsg] = useState(null);
  const [reportReason, setReportReason] = useState("");
  const [reportDesc, setReportDesc] = useState("");

  const [showReadReceipts, setShowReadReceipts] = useState(false);
  const [selectedMsgReceipts, setSelectedMsgReceipts] = useState(null);

  const [showMsgInfo, setShowMsgInfo] = useState(false);
  const [msgInfoData, setMsgInfoData] = useState(null);
  const [msgInfoLoading, setMsgInfoLoading] = useState(false);

  const [showForwardModal, setShowForwardModal] = useState(false);
  const [forwardingMsg, setForwardingMsg] = useState(null);

  const [showStarred, setShowStarred] = useState(false);
  const [starredMsgs, setStarredMsgs] = useState([]);
  const [starredLoading, setStarredLoading] = useState(false);

  const [showReactionPicker, setShowReactionPicker] = useState(null);
  const [reactionPos, setReactionPos] = useState({ top: 0, left: 0 });

  const [showEditModal, setShowEditModal] = useState(false);
  const [editingMsg, setEditingMsg] = useState(null);
  const [editText, setEditText] = useState("");

  const [pinnedMsgs, setPinnedMsgs] = useState([]);
  const [showPinnedExp, setShowPinnedExp] = useState(false);
  const [pinnedIdx, setPinnedIdx] = useState(0);

  const [menuPos, setMenuPos] = useState({ top: 0, left: 0 });
  const [localMenuId, setLocalMenuId] = useState(null);
  const effectiveMenuId = typeof openMenuId !== "undefined" ? openMenuId : localMenuId;
  const setEffectiveMenuId = useCallback(v => {
    if (typeof setOpenMenuId === "function") setOpenMenuId(v);
    else setLocalMenuId(v);
  }, [setOpenMenuId]);

  const [observedMsgs, setObservedMsgs] = useState(new Set());
  const observerRef = useRef(null);

  const storedData = Cookies.get("adminUserData");
  let userRole = "";
  if (storedData) { try { userRole = JSON.parse(storedData)?.data?.role ?? ""; } catch { } }
  const isEffectiveAdmin = ["admin", "superAdmin", "subAdmin", "sub_admin"].includes(userRole);
  const isOverlayOpen = showFilesPanel || showStarred;


  const handleDeleteForMe = useCallback((msgId, userId) => {
    setPinnedMsgs(prev => prev.filter(m => m._id?.toString() !== msgId));
    setDecryptedPinTexts(prev => { const copy = { ...prev }; delete copy[msgId]; return copy; });
    deleteForMe(msgId, userId);
  }, [deleteForMe]);

  const handleDeleteForEveryone = useCallback((msgId) => {
    setPinnedMsgs(prev => prev.filter(m => m._id?.toString() !== msgId));
    setDecryptedPinTexts(prev => { const copy = { ...prev }; delete copy[msgId]; return copy; });
    deleteForEveryone(msgId);
  }, [deleteForEveryone]);

  useEffect(() => {
    if (!pinnedMsgs.length || !groupKey) return;
    pinnedMsgs
      .filter(pin =>
        !pin.deletedForEveryone &&
        !(pin.deletedFor?.some(uid => uid?.toString() === currentUser?.id?.toString()))
      )
      .forEach(async (pin) => {
        const msg = pin.msgBody?.message;
        if (msg?.cipherText && msg?.iv && msg?.authTag) {
          const result = await decryptMessage(msg, groupKey);
          setDecryptedPinTexts(prev => ({ ...prev, [pin._id]: result }));
        } else if (typeof msg === "string") {
          setDecryptedPinTexts(prev => ({ ...prev, [pin._id]: msg }));
        } else {
          setDecryptedPinTexts(prev => ({ ...prev, [pin._id]: pin.msgBody?.media?.fileName || "Media" }));
        }
      });
  }, [pinnedMsgs, groupKey, currentUser?.id]);



  useEffect(() => {
    if (!pinmessageError) return;
    setLocalPinError(pinmessageError);
    const t = setTimeout(() => setLocalPinError(null), 3000);
    return () => clearTimeout(t);
  }, [pinmessageError]);

  /* ── socket listeners ──────────────────────────────────────────────────── */
  useEffect(() => {
    const s = socketRef?.current;
    if (!s) return;
    // const onPinnedMsgs = ({ chatId, messages: p }) => {
    //   if (chatId === selectedGroup?.chatId)
    //     setPinnedMsgs((p || []).filter(m =>
    //       !m.deletedForEveryone &&
    //       !(m.deletedFor?.some(uid => uid?.toString() === currentUser?.id?.toString()))
    //     ));
    // };
    // const onMsgPinned = ({ chatId, message: m }) => {
    //   if (chatId === selectedGroup?.chatId) {
    //     if (m.deletedForEveryone || m.deletedFor?.some(uid => uid?.toString() === currentUser?.id?.toString())) return;
    //     setPinnedMsgs(p => [m, ...p].slice(0, 3));
    //   }
    // };
    const onPinnedMsgs = ({ chatId, messages: p }) => {
      if (chatId === selectedGroup?.chatId)
        setPinnedMsgs((p || []).filter(m =>
          !m.deletedForEveryone &&
          !(m.deletedFor?.some(uid => uid?.toString() === currentUser?.id?.toString())) &&
          !(m.isreported?.count >= 3 && m.isreported?.isHidden === true)   // ← add this
        ));
    };
    const onMsgPinned = ({ chatId, message: m }) => {
      if (chatId === selectedGroup?.chatId) {
        if (
          m.deletedForEveryone ||
          m.deletedFor?.some(uid => uid?.toString() === currentUser?.id?.toString()) ||
          (m.isreported?.count >= 3 && m.isreported?.isHidden === true)   // ← add this
        ) return;
        setPinnedMsgs(p => [m, ...p].slice(0, 3));
      }
    };
    const onMsgUnpinned = ({ chatId, msgId }) => { if (chatId === selectedGroup?.chatId) setPinnedMsgs(p => p.filter(m => m._id !== msgId)); };
    const onMsgInfo = d => { setMsgInfoData(d); setMsgInfoLoading(false); };
    const onStarredMsgs = ({ messages: m }) => { setStarredMsgs(m || []); setStarredLoading(false); };
    const onForwardOk = () => { setShowForwardModal(false); setForwardingMsg(null); };
    s.on("pinned_messages", onPinnedMsgs);
    s.on("message_pinned", onMsgPinned);
    s.on("message_unpinned", onMsgUnpinned);
    s.on("message_info", onMsgInfo);
    s.on("starred_messages", onStarredMsgs);
    s.on("forward_message_success", onForwardOk);
    return () => {
      s.off("pinned_messages", onPinnedMsgs); s.off("message_pinned", onMsgPinned);
      s.off("message_unpinned", onMsgUnpinned); s.off("message_info", onMsgInfo);
      s.off("starred_messages", onStarredMsgs); s.off("forward_message_success", onForwardOk);
    };
  }, [socketRef, selectedGroup?.chatId]);

  /* ── feature handlers ──────────────────────────────────────────────────── */
  const handlePin = useCallback(id => { socketRef?.current?.emit("pin_message", { msgId: id, chatId: selectedGroup.chatId, userId: currentUser.id, userName: currentUser.name }); setEffectiveMenuId(null); }, [socketRef, selectedGroup, currentUser, setEffectiveMenuId]);
  const handleUnpin = useCallback(id => { socketRef?.current?.emit("unpin_message", { msgId: id, chatId: selectedGroup.chatId }); setEffectiveMenuId(null); }, [socketRef, selectedGroup, setEffectiveMenuId]);
  const handleStar = useCallback(id => { socketRef?.current?.emit("star_message", { msgId: id, chatId: selectedGroup.chatId, userId: currentUser.id }); setEffectiveMenuId(null); }, [socketRef, selectedGroup, currentUser, setEffectiveMenuId]);
  const handleUnstar = useCallback(id => { socketRef?.current?.emit("unstar_message", { msgId: id, chatId: selectedGroup.chatId, userId: currentUser.id }); setEffectiveMenuId(null); }, [socketRef, selectedGroup, currentUser, setEffectiveMenuId]);

  const handleReaction = useCallback((id, emoji) => {
    socketRef?.current?.emit("message:react", { msgId: id, chatId: selectedGroup.chatId, emoji, userId: currentUser.id, userName: currentUser.name });
    setShowReactionPicker(null);
  }, [socketRef, selectedGroup, currentUser]);

  const handleRemoveReaction = useCallback(id => {
    socketRef?.current?.emit("message:remove_reaction", { msgId: id, chatId: selectedGroup.chatId, userId: currentUser.id });
  }, [socketRef, selectedGroup, currentUser]);

  const handleForward = useCallback(msg => { setForwardingMsg(msg); setShowForwardModal(true); setEffectiveMenuId(null); }, [setEffectiveMenuId]);
  const submitForward = useCallback(toChatIds => {
    if (!forwardingMsg) return;
    socketRef?.current?.emit("forward_message", { msgId: forwardingMsg.msgId || forwardingMsg._id, fromChatId: selectedGroup.chatId, toChatIds, userId: currentUser.id, userName: currentUser.name });
  }, [forwardingMsg, socketRef, selectedGroup, currentUser]);

  const handleEdit = useCallback(msg => {
    const t = typeof msg.msgBody?.message === "object" && groupKey ? decryptMessage(msg.msgBody.message, groupKey) : msg.msgBody?.message || "";
    setEditingMsg(msg); setEditText(t); setShowEditModal(true); setEffectiveMenuId(null);
  }, [groupKey, setEffectiveMenuId]);

  const submitEdit = useCallback(() => {
    if (!editingMsg || !editText.trim()) return;
    socketRef?.current?.emit("edit_message", { msgId: editingMsg.msgId || editingMsg._id, chatId: selectedGroup.chatId, newMessage: editText.trim(), userId: currentUser.id });
    setShowEditModal(false); setEditingMsg(null); setEditText("");
  }, [editingMsg, editText, socketRef, selectedGroup, currentUser]);

  const handleMsgInfo = useCallback(msg => {
    setMsgInfoLoading(true); setShowMsgInfo(true);
    socketRef?.current?.emit("get_message_info", { msgId: msg.msgId || msg._id, chatId: selectedGroup.chatId });
    setEffectiveMenuId(null);
  }, [socketRef, selectedGroup, setEffectiveMenuId]);

  const handleShowStarred = useCallback(() => {
    setStarredLoading(true); setShowStarred(true);
    socketRef?.current?.emit("get_starred_messages", { chatId: selectedGroup.chatId, userId: currentUser.id });
  }, [socketRef, selectedGroup, currentUser]);

  const handleReport = useCallback(msg => { setReportingMsg(msg); setShowReportModal(true); setEffectiveMenuId(null); }, [setEffectiveMenuId]);
  const submitReport = () => {
    if (!reportReason) { alert("Please select a reason"); return; }
    const d = { msgId: reportingMsg.msgId || reportingMsg._id?.toString(), chatId: selectedGroup.chatId, userId: currentUser.id, reason: reportReason, description: reportDesc };
    socketRef?.current?.emit("report_message", d); reportMessage?.(d);
    setShowReportModal(false); setReportingMsg(null); setReportReason(""); setReportDesc("");
  };

  const handleShowReactionPicker = useCallback((msgId, e) => {
    e?.stopPropagation();
    if (isMobile) setReactionPos({ top: window.innerHeight - 120, left: (window.innerWidth - 280) / 2 });
    else { const r = e.currentTarget.getBoundingClientRect(); setReactionPos({ top: Math.max(10, r.top - 50), left: Math.min(r.left, window.innerWidth - 300) }); }
    setShowReactionPicker(msgId);
  }, [isMobile]);

  /* ── effects ───────────────────────────────────────────────────────────── */
  useEffect(() => {
    if (!isInputDisabled) return;
    setCountdown(60);
    const t = setInterval(() => setCountdown(p => { if (p <= 1) { clearInterval(t); setIsInputDisabled(false); return 0; } return p - 1; }), 1000);
    return () => clearInterval(t);
  }, [isInputDisabled, setIsInputDisabled]);

  useEffect(() => { const t = setTimeout(() => { if (selectedGroup && messages !== undefined) setIsComponentLoading(false); }, 100); return () => clearTimeout(t); }, [selectedGroup, messages]);
  useEffect(() => { setIsComponentLoading(true); setPinnedMsgs([]); setShowStarred(false); setShowMsgInfo(false); }, [selectedGroup?.id]);
  useEffect(() => {
    if (!isComponentLoading && messages?.length > 0) requestAnimationFrame(() => requestAnimationFrame(() => { messagesEndRef.current?.scrollIntoView({ behavior: "instant" }); isAtBottomRef.current = true; }));
  }, [isComponentLoading]);

  useEffect(() => {
    const c = membersContainerRef.current; if (!c || activeGroupTab !== "members") return;
    let t;
    const h = () => { clearTimeout(t); t = setTimeout(() => { const { scrollTop, scrollHeight, clientHeight } = c; const p = ((scrollTop + clientHeight) / scrollHeight) * 100; if (p > 90 && userPage < totalPages && !isLoadingUsers) loadNextPage?.(); if (p < 10 && userPage > 1 && !isLoadingUsers) loadPrevPage?.(); }, 300); };
    c.addEventListener("scroll", h); return () => { clearTimeout(t); c.removeEventListener("scroll", h); };
  }, [activeGroupTab, isLoadingUsers, userPage, totalPages, loadNextPage, loadPrevPage]);

  useEffect(() => {
    const el = messagesAreaRef.current; if (!el) return;
    let t;
    const h = () => { clearTimeout(t); const { scrollTop, scrollHeight, clientHeight } = el; const dist = scrollHeight - scrollTop - clientHeight; isAtBottomRef.current = dist < 100; setUserScrolledUp(!isAtBottomRef.current); if (isAtBottomRef.current) setNewMsgCount(0); t = setTimeout(() => { if (scrollTop < 200 && hasMoreOldRef.current && !isLoadOlderRef.current) loadOlderMessages(); if (dist < 200 && hasMoreNewRef.current && !isLoadNewerRef.current && !isAtBottomRef.current) loadNewerMessages(); }, 200); };
    el.addEventListener("scroll", h, { passive: true }); return () => { clearTimeout(t); el.removeEventListener("scroll", h); };
  }, [loadOlderMessages, loadNewerMessages]);

  useEffect(() => {
    const el = messagesAreaRef.current; if (!el || !isLoadingOlder || scrollPosRef.current) return;
    const vis = el.querySelectorAll("[data-msg-id]"); if (!vis.length) return;
    const cr = el.getBoundingClientRect();
    for (const m of vis) { const r = m.getBoundingClientRect(); if (r.top >= cr.top && r.top <= cr.bottom) { scrollPosRef.current = m.getAttribute("data-msg-id"); isRestoringRef.current = true; break; } }
  }, [isLoadingOlder]);

  useEffect(() => {
    if (!isLoadingOlder && scrollPosRef.current && isRestoringRef.current) requestAnimationFrame(() => requestAnimationFrame(() => { const el = document.getElementById(`msg-${scrollPosRef.current}`); if (el) el.scrollIntoView({ block: "start", behavior: "instant" }); scrollPosRef.current = null; isRestoringRef.current = false; }));
  }, [isLoadingOlder, messages?.length]);

  useEffect(() => {
    if (!selectedGroup || !messagesAreaRef.current || !currentUser?.id) return;
    observerRef.current?.disconnect();
    observerRef.current = new IntersectionObserver(entries => { const now = Date.now(); entries.forEach(e => { if (!e.isIntersecting || e.intersectionRatio < 0.7) return; const id = e.target.getAttribute("data-msg-id"); const uid = e.target.getAttribute("data-from-user-id"); if (!id || !uid || uid === currentUser.id.toString() || observedMsgs.has(id)) return; setObservedMsgs(p => new Set([...p, id])); onMarkAsRead?.({ msgId: id, groupId: selectedGroup.id, chatId: selectedGroup.chatId, userId: currentUser.id, timestamp: now }); if (socketRef?.current?.connected) socketRef.current.emit("message:read", { msgId: id, chatId: selectedGroup.chatId, userId: currentUser.id, readAt: now }); }); }, { root: messagesAreaRef.current, threshold: 0.7, rootMargin: "-20px 0px -20px 0px" });
    const tid = setTimeout(() => messagesAreaRef.current?.querySelectorAll("[data-msg-id]").forEach(el => observerRef.current.observe(el)), 100);
    return () => { clearTimeout(tid); observerRef.current?.disconnect(); };
  }, [selectedGroup?.id, selectedGroup?.chatId, messages?.length, currentUser?.id, onMarkAsRead, socketRef]);

  useEffect(() => { setObservedMsgs(new Set()); }, [selectedGroup?.id]);


  useEffect(() => {
    if (!uploadingFile && isAtBottomRef.current) {
      requestAnimationFrame(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      });
    }
  }, [uploadingFile]);


  useEffect(() => {
    const el = messagesAreaRef.current; if (!el || !messages?.length) return;
    if (isRestoringRef.current || isLoadingOlder) { prevMessagesLengthRef.current = messages.length; return; }
    if (isInitialLoad) { if (!isInitialMessagesLoad && !isLoadingMessages) { requestAnimationFrame(() => requestAnimationFrame(() => { messagesEndRef.current?.scrollIntoView({ behavior: "instant" }); isAtBottomRef.current = true; })); setIsInitialLoad(false); } prevMessagesLengthRef.current = messages.length; return; }
    const prev = prevMessagesLengthRef.current, cur = messages.length; if (cur <= prev) return;
    const last = messages[cur - 1], prevLast = prev > 0 ? messages[prev - 1] : null;
    if (prevLast && last.msgId === prevLast.msgId) { prevMessagesLengthRef.current = cur; return; }
    const isMine = last?.fromUserId?.toString() === currentUser?.id?.toString();
    if (isMine || isAtBottomRef.current) { requestAnimationFrame(() => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })); setNewMsgCount(0); } else { setNewMsgCount(p => p + 1); }
    prevMessagesLengthRef.current = cur;
  }, [messages?.length, currentUser?.id, isInitialLoad, isInitialMessagesLoad, isLoadingMessages, isLoadingOlder]);

  useEffect(() => { const h = () => { setEffectiveMenuId(null); setShowReactionPicker(null); }; window.addEventListener("click", h); return () => window.removeEventListener("click", h); }, [setEffectiveMenuId]);
  useEffect(() => { const h = e => { if (e.key !== "Escape") return; setEffectiveMenuId(null); setShowReadReceipts(false); setShowReactionPicker(null); setShowMsgInfo(false); setShowForwardModal(false); setShowEditModal(false); setShowStarred(false); setShowPinnedExp(false); }; window.addEventListener("keydown", h); return () => window.removeEventListener("keydown", h); }, [setEffectiveMenuId]);
  useEffect(() => { const h = () => { setEffectiveMenuId(null); setShowReactionPicker(null); }; window.addEventListener("resize", h); return () => window.removeEventListener("resize", h); }, [setEffectiveMenuId]);

  /* ── helpers ────────────────────────────────────────────────────────────── */
  const renderLinks = text => {
    if (!text) return null; const s = String(text); const re = /(https?:\/\/[^\s]+)/g;
    return s.split(re).map((p, i) => re.test(p) ? <a key={i} href={p} target="_blank" rel="noopener noreferrer" className="hover:underline break-all font-medium" style={{ color: C.teal }} onClick={e => e.stopPropagation()}>{p}</a> : <span key={i}>{p}</span>);
  };

  const getReadStatus = msg => {
    const mine = msg.fromUserId?.toString() === currentUser?.id?.toString(); if (!mine) return null;
    const rb = msg.metaData?.readBy || [], db = msg.metaData?.deliveredTo || [], tot = members?.length || 0;
    if (!msg.metaData?.isSent && msg.msgStatus === "pending") return "sending";
    if (msg.msgStatus === "failed") return "failed";
    if (rb.length >= tot - 1 && tot > 1) return "read_all";
    if (rb.length > 0) return "read_some";
    if (db.length >= tot - 1 && tot > 1) return "delivered_all";
    if (db.length > 0 || msg.metaData?.isDelivered) return "delivered";
    if (msg.metaData?.isSent) return "sent";
    return "sending";
  };

  const isStarred = msg => (msg.starredBy || []).includes(currentUser?.id?.toString());
  const isPinned = msg => msg.isPinned === true;
  const canEdit = msg => {
    if (msg.fromUserId?.toString() !== currentUser?.id?.toString()) return false;
    if (["file", "audio"].includes(msg.msgBody?.message_type)) return false;
    return Date.now() - new Date(msg.timestamp).getTime() < 15 * 60 * 1000;
  };

  const toggleMenu = useCallback((msgId, e, isCur) => { e?.stopPropagation(); e?.preventDefault(); if (effectiveMenuId === msgId) { setEffectiveMenuId(null); return; } if (isMobile) { setMenuPos({ top: 0, left: 0 }); setEffectiveMenuId(msgId); return; } const me = document.getElementById(`msg-${msgId}`), c = containerRef.current; if (!me || !c) { setEffectiveMenuId(msgId); return; } const cr = c.getBoundingClientRect(), mr = me.getBoundingClientRect(); const W = 220, H = 340, G = 6, P = 8; let l = isCur ? mr.right - cr.left - W : mr.left - cr.left; l = Math.max(P, Math.min(l, cr.width - W - P)); const sb = cr.bottom - mr.bottom, sa = mr.top - cr.top; let t; if (sb >= H + G) t = mr.bottom - cr.top + G; else if (sa >= H + G) t = mr.top - cr.top - H - G; else t = sb > sa ? mr.bottom - cr.top + G : mr.top - cr.top - H - G; t = Math.max(P, Math.min(t, cr.height - H - P)); setMenuPos({ top: Math.round(t), left: Math.round(l) }); setEffectiveMenuId(msgId); }, [effectiveMenuId, isMobile, setEffectiveMenuId]);

  const scrollToMsg = id => { const el = document.getElementById(`msg-${id}`); if (!el) return; el.scrollIntoView({ behavior: "smooth", block: "center" }); el.classList.add("hl-msg"); setTimeout(() => el.classList.remove("hl-msg"), 2000); };
  const scrollToBottom = () => { messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }); setNewMsgCount(0); };

  const copyMsg = (text, id) => {
    if (!text) return; let t = text;
    if (typeof text === "object" && text !== null) { if (text.cipherText && groupKey) { try { t = decryptMessage(text, groupKey); } catch { t = "[Encrypted]"; } } else t = "[Unable to copy]"; }
    navigator.clipboard.writeText(String(t || "")).then(() => { setCopiedMsgId(id); setTimeout(() => setCopiedMsgId(null), 2000); }).catch(console.error);
  };

  const downloadFile = async (url, name) => {
    try { const r = await fetch(url, { mode: "cors" }); if (!r.ok) throw new Error(); const b = await r.blob(); const u = URL.createObjectURL(b); const a = document.createElement("a"); a.style.display = "none"; a.href = u; a.download = name || "download"; document.body.appendChild(a); a.click(); setTimeout(() => { document.body.removeChild(a); URL.revokeObjectURL(u); }, 100); }
    catch { const a = document.createElement("a"); a.href = url; a.download = name || "download"; a.target = "_blank"; document.body.appendChild(a); a.click(); document.body.removeChild(a); }
  };

  const deduped = React.useMemo(() => { if (!messages?.length) return []; const seen = new Map(); for (const m of messages) { const id = m._id?.toString() || m.msgId || m.correlationId || `${m.fromUserId}-${m.timestamp}-${m.msgBody?.message}`; seen.set(id, m); } return Array.from(seen.values()).sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp)); }, [messages]);
  const grouped = groupMessagesByDate(deduped);

  /* ══════════════════════════════════════════════════════════════════════════
     RENDER
  ══════════════════════════════════════════════════════════════════════════ */
  return (
    <>
      {isComponentLoading ? <Loader /> : (
        <div
          ref={containerRef}
          className="flex-1 flex flex-col relative h-full overflow-hidden w-full max-w-full"
          style={{ background: C.white }}
        >

          {/* ── HEADER ──────────────────────────────────────────────────── */}
          {!isOverlayOpen && (
            <div
              ref={headerRef}
              style={{ background: `linear-gradient(135deg, ${C.tealL} 0%, ${C.tealD} 100%)` }}
            >
              <ChatHeader
                selectedGroup={selectedGroup} totalUsers={totalUsers}
                typingUsers={typingUsers} setShowMembers={setShowMembers}
                setShowFilesPanel={setShowFilesPanel} setActiveGroupTab={setActiveGroupTab}
                setShowClearChatModal={setShowClearChatModal} onShowStarred={handleShowStarred}
                headerRef={headerRef} isMobile={isMobile} onBackToGroups={onBackToGroups}
              />
            </div>
          )}

          {/* ── PINNED BAR ──────────────────────────────────────────────── */}
          {localPinError && !isOverlayOpen && (
            <div
              style={{
                background: "#fef2f2",
                borderLeft: "3px solid #ef4444",
                borderBottom: "1px solid #fecaca",
              }}
              className="px-3 sm:px-4 py-2 flex items-center gap-2"
            >
              <div
                className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ background: "#fee2e2" }}
              >
                <Pin className="w-3 h-3" style={{ color: "#ef4444" }} />
              </div>
              <p className="text-xs sm:text-sm font-medium flex-1" style={{ color: "#b91c1c" }}>
                {localPinError}
              </p>
            </div>
          )}


          {pinnedMsgs.length > 0 && !isOverlayOpen && (
            <div
              style={{
                background: "#397378",
                // borderBottom: `1px solid #fde68a`,
                borderLeft: `3px solid ${C.amber}`,
              }}
              className="px-3 sm:px-4 py-2"
            >
              <div className="flex items-center justify-between gap-2">
                <div
                  className="flex items-center gap-2 flex-1 min-w-0 cursor-pointer"
                  onClick={() => { const id = pinnedMsgs[pinnedIdx]?._id; if (id) scrollToMsg(id); setPinnedIdx(p => (p + 1) % pinnedMsgs.length); }}
                >
                  <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0" >
                    <Pin className="w-3.5 h-3.5" style={{ color: C.amber }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] sm:text-xs font-bold tracking-widest uppercase" style={{ color: "#90b0b3" }}>
                      Pinned{pinnedMsgs.length > 1 && ` · ${pinnedIdx + 1}/${pinnedMsgs.length}`}
                    </span>
                    <p className="text-xs sm:text-sm truncate font-medium" style={{ color: "#ffffff" }}>
                      {decryptedPinTexts[pinnedMsgs[pinnedIdx]?._id] || "Decrypting…"}
                    </p>
                  </div>
                </div>
                {pinnedMsgs.length > 1 && (
                  <button onClick={() => setShowPinnedExp(v => !v)} className="p-1.5 rounded-lg flex-shrink-0" >
                    <ChevronDown className={`w-6 h-6 transition-transform ${showPinnedExp ? "rotate-180" : ""}`} style={{ color: C.amber }} />
                  </button>
                )}
              </div>
              {showPinnedExp && (
                <div className="mt-2 space-y-1 pt-2" style={{ borderTop: "1px solid #085056" }}>
                  {pinnedMsgs.map((pin, i) => (
                    <div key={pin._id} className="flex items-center justify-between py-1.5 px-2 rounded-lg cursor-pointer transition-colors"
                      onClick={() => { scrollToMsg(pin._id); setPinnedIdx(i); setShowPinnedExp(false); }}>
                      <div className="flex-1 min-w-0">
                        <span className="text-[10px] font-semibold" style={{ color: "#90b0b3" }}>{pin.fromUserId}</span>
                        <p className="text-xs truncate" style={{ color: "#ffffff" }}>
                          {decryptedPinTexts[pin._id] || "Decrypting…"}
                        </p>
                      </div>
                      <button onClick={e => { e.stopPropagation(); handleUnpin(pin._id); }} className="p-1 rounded-lg ml-2">
                        <X className="w-4 h-4" style={{ color: "#ffffff" }} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ── GROUP INFO OVERLAY ──────────────────────────────────────── */}
          {selectedGroup && showMembers && (
            <>
              <div className="absolute inset-0 z-[25] backdrop-blur-sm" style={{ background: "rgba(13,45,43,.3)" }} onClick={() => { setShowMembers(false); setActiveGroupTab("overview"); }} />
              <div className="absolute inset-0 z-[30] pointer-events-none flex justify-end">
                <div className="pointer-events-auto h-full">
                  <GroupInfoPanel
                    selectedGroup={selectedGroup} activeGroupTab={activeGroupTab} setActiveGroupTab={setActiveGroupTab}
                    members={members} messages={messages} groupKey={groupKey} totalUsers={totalUsers}
                    membersContainerRef={membersContainerRef}
                    accumulatedFiles={Array.isArray(chatFiles) ? chatFiles : []}
                    filesPage={filesPage} setFilesPage={setFilesPage} loadingFiles={loadingFiles}
                    filesPagination={filesPagination} refetchFiles={refetchFiles}
                    setShowMembers={setShowMembers} messagesEndRef={messagesEndRef}
                    formatFileSize={formatFileSize} downloadFileToDesktop={downloadFile} isMobile={isMobile}
                  />
                </div>
              </div>
            </>
          )}

          {/* ── OTHER OVERLAYS ──────────────────────────────────────────── */}
          {selectedGroup && showFilesPanel && (
            <div className={isMobile ? "absolute inset-0 z-40" : ""} style={isMobile ? { background: C.white } : {}}>
              <SharedFilesPanel setShowFilesPanel={setShowFilesPanel} accumulatedFiles={Array.isArray(chatFiles) ? chatFiles : []} filesPage={filesPage} loadingFiles={loadingFiles} filesPagination={filesPagination} formatTime={formatTime} formatFileSize={formatFileSize} isMobile={isMobile} />
            </div>
          )}

          {showStarred && (
            <div className={isMobile ? "absolute inset-0 z-40" : ""} style={isMobile ? { background: C.white } : {}}>
              <StarredMessagesPanel starredMessages={starredMsgs} loading={starredLoading} onClose={() => setShowStarred(false)} onScrollToMessage={id => { setShowStarred(false); setTimeout(() => scrollToMsg(id), 300); }} onUnstar={handleUnstar} formatTime={formatTime} groupKey={groupKey} currentUser={currentUser} isMobile={isMobile} />
            </div>
          )}

          {showMsgInfo && (
            <>
              <div
                className="absolute inset-0 z-[25] backdrop-blur-sm"
                style={{ background: "rgba(13,45,43,.3)" }}
                onClick={() => { setShowMsgInfo(false); setMsgInfoData(null); }}
              />
              <div className="absolute inset-0 z-[30] pointer-events-none flex justify-end">
                <div className="pointer-events-auto h-full">
                  <MessageInfoPanel
                    data={msgInfoData}
                    loading={msgInfoLoading}
                    members={members}
                    groupKey={groupKey}
                    onClose={() => { setShowMsgInfo(false); setMsgInfoData(null); }}
                    formatTime={formatTime}
                    isMobile={isMobile}
                  />
                </div>
              </div>
            </>
          )}

          {/* ── MESSAGES AREA ───────────────────────────────────────────── */}
          {selectedGroup && !isOverlayOpen && (
            <div
              ref={messagesAreaRef}
              className="flex-1 overflow-y-auto relative z-10 chat-scroll"
              style={{
                overflowAnchor: "none", WebkitOverflowScrolling: "touch",
                backgroundColor: C.page,
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%230d9488' fill-opacity='0.03'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3Ccircle cx='0' cy='0' r='4'/%3E%3Ccircle cx='60' cy='0' r='4'/%3E%3Ccircle cx='0' cy='60' r='4'/%3E%3Ccircle cx='60' cy='60' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                padding: isMobile ? "10px 8px" : "14px 18px",
              }}
            >
              {isInitialMessagesLoad && isLoadingMessages ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center z-50" style={{ background: `rgba(240,253,250,0.96)` }}>
                  <div className="relative w-16 h-16 sm:w-20 sm:h-20 mb-5">
                    <div className="absolute inset-0 rounded-full animate-spin" style={{ border: `2.5px solid #ccfbf1`, borderTopColor: "#0d9488" }} />
                    <div className="absolute inset-0 rounded-full animate-spin" style={{ border: "2.5px solid transparent", borderBottomColor: "rgba(13,148,136,0.3)", animationDirection: "reverse", animationDuration: "1.3s" }} />
                    <div className="absolute inset-0 m-auto rounded-full flex items-center justify-center" style={{ width: 44, height: 44, background: "#f0fdfa" }}>
                      <img src={loaderImage} alt="" className="w-7 h-7 object-contain" />
                    </div>
                  </div>
                  <p className="text-sm sm:text-base font-semibold mb-1" style={{ color: "#134e4a" }}>Loading messages…</p>
                  <p className="text-xs sm:text-sm" style={{ color: "#6b7280" }}>Please wait a moment</p>
                </div>
              ) : (
                <>
                  {isLoadingOlder && (
                    <div className="sticky top-0 z-20 flex justify-center py-2 mb-2">
                      <div className="flex items-center gap-2.5 px-4 py-2 rounded-full" style={{ background: "#ffffff", border: `1px solid #99f6e4` }}>
                        <div className="animate-spin rounded-full h-3.5 w-3.5" style={{ border: `2px solid #ccfbf1`, borderTopColor: "#0d9488" }} />
                        <span className="text-xs font-medium" style={{ color: "#115e59" }}>Loading older…</span>
                      </div>
                    </div>
                  )}

                  {!isLoadingOlder && hasMoreOldMessages && messages?.length > 0 && (
                    <div className="flex justify-center py-2 mb-3">
                      <button
                        onClick={loadOlderMessages}
                        className="flex items-center gap-2 px-5 py-2 rounded-full text-sm font-medium transition-all active:scale-95"
                        style={{ background: "#ffffff", border: `1.5px solid #0d9488`, color: "#0d9488" }}
                        onMouseEnter={e => { e.currentTarget.style.background = "#0d9488"; e.currentTarget.style.color = "#ffffff"; }}
                        onMouseLeave={e => { e.currentTarget.style.background = "#ffffff"; e.currentTarget.style.color = "#0d9488"; }}
                      >
                        ↑ Load older messages
                      </button>
                    </div>
                  )}

                  {!messages?.length ? (
                    <div className="flex flex-col items-center justify-center h-full px-4 py-16">
                      <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center mb-4" style={{ background: "#f0fdfa", border: `2px solid #99f6e4` }}>
                        <Users className="w-8 h-8 sm:w-10 sm:h-10" style={{ color: "#0d9488", opacity: .6 }} />
                      </div>
                      <p className="text-sm sm:text-base font-semibold mb-1 text-center" style={{ color: "#134e4a" }}>No messages yet</p>
                      <p className="text-xs sm:text-sm text-center" style={{ color: "#6b7280" }}>Send a message to start the conversation</p>
                    </div>
                  ) : (
                    <>
                      {Object.entries(grouped).map(([dk, dmsgs]) => (
                        <div key={dk}>
                          <div className="flex justify-center my-3">
                            <span className="px-3 py-1 rounded-full text-[10px] sm:text-[11px] font-semibold tracking-wider uppercase" style={{ background: "#ffffff", color: "#115e59", border: `1px solid #99f6e4` }}>
                              {formatDateHeader(dk)}
                            </span>
                          </div>

                          {dmsgs.map((msg, idx) => {
                            const key = msg._id?.toString() || msg.msgId || msg.correlationId || `${msg.fromUserId}-${msg.timestamp}-${idx}`;
                            return (
                              <MessageBubble
                                key={key} msg={msg} currentUser={currentUser} members={members}
                                groupKey={groupKey} effectiveOpenMenuId={effectiveMenuId}
                                copiedMessageId={copiedMsgId} toggleMenu={toggleMenu}
                                scrollToMessage={scrollToMsg} formatTime={formatTime}
                                formatFileSize={formatFileSize} renderMessageWithLinks={renderLinks}
                                getMessageReadStatus={getReadStatus}
                                isEdited={msg.isEdited || false} isForwarded={msg.isForwarded || false}
                                starred={isStarred(msg)} pinned={isPinned(msg)}
                                reactions={msg.reactions || []} readStatus={getReadStatus(msg)}
                                onReact={handleShowReactionPicker} onRemoveReaction={handleRemoveReaction}
                                isMobile={isMobile}
                                onMediaLoad={() => {
                                  if (isAtBottomRef.current) {
                                    requestAnimationFrame(() => {
                                      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
                                    });
                                  }
                                }}
                              />
                            );
                          })}
                        </div>
                      ))}
                    </>
                  )}

                  <div ref={messagesEndRef} />

                  {isLoadingNewer && (
                    <div className="flex justify-center py-2 mt-2">
                      <div className="flex items-center gap-2.5 px-4 py-2 rounded-full" style={{ background: "#ffffff", border: `1px solid #99f6e4` }}>
                        <div className="animate-spin rounded-full h-3.5 w-3.5" style={{ border: `2px solid #ccfbf1`, borderTopColor: "#0d9488" }} />
                        <span className="text-xs font-medium" style={{ color: "#115e59" }}>Loading newer…</span>
                      </div>
                    </div>
                  )}
                </>
              )}

              {userScrolledUp && (
                <button
                  onClick={scrollToBottom}
                  className={`fixed z-40 rounded-full flex items-center justify-center transition-all active:scale-95 ${isMobile ? "bottom-20 right-3 w-10 h-10" : "bottom-24 right-6 w-11 h-11"}`}
                  style={{ background: "#0d9488" }}
                >
                  <ArrowDown className={isMobile ? "w-4 h-4" : "w-5 h-5"} style={{ color: "#ffffff" }} />
                  {newMsgCount > 0 && (
                    <span className={`absolute font-bold rounded-full flex items-center justify-center ${isMobile ? "-top-1.5 -right-1.5 text-[9px] w-4 h-4" : "-top-2 -right-2 text-[10px] w-5 h-5"}`}
                      style={{ background: "#f59e0b", color: "#ffffff" }}>
                      {newMsgCount > 99 ? "99+" : newMsgCount}
                    </span>
                  )}
                </button>
              )}
            </div>
          )}


          {/* ── REACTION PICKER ─────────────────────────────────────────── */}
          {showReactionPicker && (
            <>
              {isMobile && <div className="fixed inset-0 z-40" style={{ background: "rgba(13,45,43,.35)" }} onClick={() => setShowReactionPicker(null)} />}
              <div
                className={`fixed z-50 flex items-center gap-0.5 ${isMobile ? "rounded-2xl px-3 py-2.5 left-1/2 -translate-x-1/2 bottom-20" : "rounded-full px-2 py-1.5"}`}
                style={{ background: C.white, border: `1px solid ${C.sep}`, ...(!isMobile ? { top: reactionPos.top, left: reactionPos.left } : {}) }}
                onClick={e => e.stopPropagation()}
              >
                {REACTION_EMOJIS.map(e => (
                  <button key={e} onClick={() => handleReaction(showReactionPicker, e)}
                    className={`flex items-center justify-center rounded-full transition-all hover:scale-125 active:scale-95 ${isMobile ? "w-10 h-10 text-2xl" : "w-8 h-8 text-xl"}`}
                    onMouseEnter={ev => ev.currentTarget.style.background = C.tealXL}
                    onMouseLeave={ev => ev.currentTarget.style.background = "transparent"}>
                    {e}
                  </button>
                ))}
              </div>
            </>
          )}


          {/* ── MODALS ──────────────────────────────────────────────────── */}
          <ImagePreviewModal showImagePreview={showImagePreview} selectedImages={selectedImages} imageCaption={imageCaption} setImageCaption={setImageCaption} uploadingFile={uploadingFile} cancelImageUpload={cancelImageUpload} sendImageMessage={sendImageMessage} removeImage={removeImage} formatFileSize={formatFileSize} />
          <DocumentPreviewModal showDocumentPreview={showDocumentPreview} selectedDocument={selectedDocument} uploadingFile={uploadingFile} cancelDocumentUpload={cancelDocumentUpload} sendDocumentMessage={sendDocumentMessage} formatFileSize={formatFileSize} />
          <ClearChatModal selectedGroup={selectedGroup} showClearChatModal={showClearChatModal} setShowClearChatModal={setShowClearChatModal} onClearChat={onClearChat} />
          <ErrorDetailModal showErrorDetail={showErrorDetail} setShowErrorDetail={setShowErrorDetail} retryMessage={retryMessage} formatTime={formatTime} />
          <FileSendPreview showFilePreview={showFilePreview} selectedFile={selectedFile} filePreview={filePreview} uploadingFile={uploadingFile} cancelFileUpload={cancelFileUpload} sendFileMessage={sendFileMessage} />

          {/* ── CONTEXT MENU ────────────────────────────────────────────── */}
          {selectedGroup && effectiveMenuId && (
            <EnhancedContextMenu
              isAdmin={isEffectiveAdmin} isBlocked={isBlocked} onAdminDelete={onAdminDelete} onBlockUser={onBlockUser}
              effectiveOpenMenuId={effectiveMenuId} menuPosition={menuPos} messages={messages}
              currentUser={currentUser} userRole={userRole} groupKey={groupKey} copiedMessageId={copiedMsgId}
              handleReply={handleReply} handleCopyMessage={copyMsg} retryMessage={retryMessage}
              deleteForMe={handleDeleteForMe}
              deleteForEveryone={handleDeleteForEveryone} setEffectiveOpenMenuId={setEffectiveMenuId}
              handlePinMessage={handlePin} handleUnpinMessage={handleUnpin}
              handleStarMessage={handleStar} handleUnstarMessage={handleUnstar}
              handleForward={handleForward} handleEditMessage={handleEdit}
              handleShowMessageInfo={handleMsgInfo} handleReport={handleReport}
              isMessageStarred={isStarred} isMessagePinned={isPinned} canEditMessage={canEdit} isMobile={isMobile}
            />
          )}

          <ReportModal showReportModal={showReportModal} reportingMessage={reportingMsg} reportReason={reportReason} reportDescription={reportDesc} setReportReason={setReportReason} setReportDescription={setReportDesc} setShowReportModal={setShowReportModal} setReportingMessage={setReportingMsg} groupKey={groupKey} submitReport={submitReport} />
          <ReadReceiptsModal showReadReceipts={showReadReceipts} setShowReadReceipts={setShowReadReceipts} selectedMessageForReceipts={selectedMsgReceipts} members={members} formatTime={formatTime} />

          {/* ── EDIT MODAL ──────────────────────────────────────────────── */}
          {showEditModal && (
            <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center" style={{ background: "rgba(13,45,43,.5)" }}>
              <div className={`w-full ${isMobile ? "rounded-t-3xl max-h-[85vh]" : "rounded-2xl max-w-lg mx-4"}`} style={{ background: C.white, border: `1px solid ${C.sep}` }}>
                {isMobile && <div className="flex justify-center pt-3 pb-1"><div className="w-10 h-1 rounded-full" style={{ background: C.sep }} /></div>}
                <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: `1px solid ${C.sep}` }}>
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: C.tealXL }}><Pencil className="w-4 h-4" style={{ color: C.teal }} /></div>
                    <h3 className="text-sm sm:text-base font-semibold" style={{ color: C.t1 }}>Edit message</h3>
                  </div>
                  <button onClick={() => { setShowEditModal(false); setEditingMsg(null); }} className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: C.page }}>
                    <X className="w-4 h-4" style={{ color: C.t3 }} />
                  </button>
                </div>
                <div className="p-4 sm:p-5">
                  <textarea
                    value={editText} onChange={e => setEditText(e.target.value)}
                    className="w-full rounded-xl px-4 py-3 text-sm outline-none resize-none transition-all"
                    style={{ background: C.page, color: C.t1, border: `1.5px solid ${C.sep}`, fontFamily: "inherit" }}
                    onFocus={e => { e.currentTarget.style.borderColor = C.teal; e.currentTarget.style.background = C.white; }}
                    onBlur={e => { e.currentTarget.style.borderColor = C.sep; e.currentTarget.style.background = C.page; }}
                    rows={isMobile ? 3 : 4} autoFocus placeholder="Edit your message…"
                  />
                </div>
                <div className="flex justify-end gap-3 px-4 sm:px-5 py-3 sm:py-4" style={{ borderTop: `1px solid ${C.sep}` }}>
                  <button onClick={() => { setShowEditModal(false); setEditingMsg(null); }}
                    className="px-4 sm:px-5 py-2 text-sm font-medium rounded-xl transition-all"
                    style={{ color: C.t2, background: C.page, border: `1px solid ${C.sep}` }}>
                    Cancel
                  </button>
                  <button onClick={submitEdit} disabled={!editText.trim()}
                    className="px-5 sm:px-6 py-2 text-sm font-semibold rounded-xl transition-all active:scale-95 text-white disabled:opacity-40"
                    style={{ background: "#0fa89e" }}>
                    Save changes
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ── FORWARD MODAL ───────────────────────────────────────────── */}
          {showForwardModal && <ForwardModal onClose={() => { setShowForwardModal(false); setForwardingMsg(null); }} onForward={submitForward} message={forwardingMsg} groupKey={groupKey} isMobile={isMobile} />}

          {/* ── UPLOAD TOAST ────────────────────────────────────────────── */}
          {uploadingFile && !showImagePreview && !showDocumentPreview && !showFilePreview && (
            <div
              style={{
                position: "absolute", bottom: isMobile ? 72 : 80,
                left: "50%", transform: "translateX(-50%)",
                zIndex: 60,
                display: "flex", alignItems: "center", gap: 10,
                padding: "9px 16px", borderRadius: 100,
                background: C.white, border: `1.5px solid ${C.sep}`,
                minWidth: 180, maxWidth: "calc(100% - 32px)",
              }}
            >
              <div style={{ position: "relative", width: 18, height: 18, flexShrink: 0 }}>
                <div style={{ position: "absolute", inset: 0, border: `2px solid rgba(29,142,133,.2)`, borderTopColor: C.teal, borderRadius: "50%", animation: "spin .8s linear infinite" }} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontSize: 12, fontWeight: 600, color: C.t1, margin: 0, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  {selectedImages?.length > 0 ? `Uploading ${selectedImages.length > 1 ? `${selectedImages.length} photos` : "photo"}…` : selectedDocument ? "Uploading document…" : "Uploading file…"}
                </p>
                <p style={{ fontSize: 10, color: C.t3, margin: 0 }}>Please don't close</p>
              </div>
              <div style={{ display: "flex", gap: 3, flexShrink: 0 }}>
                {[0, 150, 300].map(d => <div key={d} style={{ width: 4, height: 4, borderRadius: "50%", background: C.teal, animation: `bounce 1s ${d}ms ease-in-out infinite` }} />)}
              </div>
            </div>
          )}

          {/* ── INPUT BAR ───────────────────────────────────────────────── */}
          {selectedGroup && !isOverlayOpen && (
            <div style={{ background: C.white, borderTop: `1px solid ${C.sep}` }}>

              {(chatError || rateLimitError === "__BLOCKED__") ? (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 10,
                    padding: isMobile ? "14px 16px" : "16px 20px",
                    background: "#fef2f2",
                    borderTop: "1.5px solid #fecaca",
                  }}
                >
                  <div
                    style={{
                      width: 34, height: 34,
                      borderRadius: "50%",
                      background: "#fee2e2",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                      stroke="#ef4444" strokeWidth="2.2"
                      strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontSize: isMobile ? 13 : 14, fontWeight: 700, color: "#b91c1c", margin: 0, lineHeight: 1.3 }}>
                      {chatError ? "You are blocked from this group" : "You are blocked by admin"}
                    </p>
                    <p style={{ fontSize: isMobile ? 11 : 12, color: "#ef4444", margin: "2px 0 0", opacity: 0.8 }}>
                      You cannot send messages in this group
                    </p>
                  </div>
                </div>
              ) : (
                <MessageInput
                  message={message} setMessage={setMessage} onSendMessage={onSendMessage}
                  isInputDisabled={isInputDisabled} setIsInputDisabled={setIsInputDisabled}
                  countdown={countdown}
                  replyToMessage={replyToMessage} cancelReply={cancelReply}
                  groupKey={groupKey} handleTyping={handleTyping}
                  showEmojiPicker={showEmojiPicker} setShowEmojiPicker={setShowEmojiPicker}
                  showFileTypeModal={showFileTypeModal}
                  setShowFileTypeModal={setShowFileTypeModal}
                  fileInputRef={fileInputRef}
                  inputRef={inputRef} emojiPickerRef={emojiPickerRef}
                  emojiButtonRef={emojiButtonRef} emojiClickInsideRef={emojiClickInsideRef}
                  
                  rateLimitError={rateLimitError} isMobile={isMobile}
                  onCameraImageReady={d => {
                    setSelectedImages([{ file: d.file, preview: d.preview, name: d.fileName, size: d.fileSize, type: d.fileType }]);
                    setImageCaption(d.caption || ""); setShowImagePreview(true);
                  }}
                />
              )}
            </div>
          )}
        </div>
      )}

      {/* ── GLOBAL STYLES ─────────────────────────────────────────────────── */}
      <style>{`
        .hl-msg { animation: hlFade 2s ease-out; border-radius: 10px; }
        @keyframes hlFade {
          0%   { background-color: rgba(29,142,133,0.15); }
          100% { background-color: transparent; }
        }
        @keyframes slide-up {
          from { transform: translateY(100%); opacity: 0; }
          to   { transform: translateY(0);    opacity: 1; }
        }
        .animate-slide-up { animation: slide-up 0.26s cubic-bezier(0.34,1.56,0.64,1); }
        @keyframes spin   { to { transform: rotate(360deg); } }
        @keyframes bounce { 0%,100% { transform:translateY(0);   opacity:.35; } 50% { transform:translateY(-4px); opacity:1; } }
        .chat-scroll::-webkit-scrollbar       { width: 4px; }
        .chat-scroll::-webkit-scrollbar-track { background: transparent; }
        .chat-scroll::-webkit-scrollbar-thumb { background: rgba(29,142,133,0.2); border-radius: 8px; }
        .chat-scroll::-webkit-scrollbar-thumb:hover { background: rgba(29,142,133,0.4); }
        @supports (padding: env(safe-area-inset-bottom)) {
          .safe-bottom { padding-bottom: env(safe-area-inset-bottom); }
        }
        @media (max-width:639px) {
          button { -webkit-tap-highlight-color: transparent; }
        }
        .bubble-out {
          background: #1d8e85 !important;
          color: #ffffff !important;
          border-radius: 18px 4px 18px 18px !important;
        }
        .bubble-in {
          background: #ffffff !important;
          color: #0d2d2b !important;
          border-radius: 4px 18px 18px 18px !important;
          border: 1px solid #e0f0ef !important;
        }
        .bubble-time-out { color: rgba(255,255,255,0.7) !important; }
        .bubble-time-in  { color: #7aadaa !important; }
        @media (max-width:639px) {
          .msg-input-bar { padding: 6px 8px !important; }
        }
      `}</style>
    </>
  );
};

/* ══════════════════════════════════════════════════════════════════════════
   ENHANCED CONTEXT MENU
══════════════════════════════════════════════════════════════════════════ */
const EnhancedContextMenu = ({
  effectiveOpenMenuId, menuPosition, messages, currentUser, userRole, groupKey,
  copiedMessageId, handleReply, handleCopyMessage, retryMessage,
  deleteForMe, deleteForEveryone, setEffectiveOpenMenuId,
  handlePinMessage, handleUnpinMessage, handleStarMessage, handleUnstarMessage,
  handleForward, handleEditMessage, handleShowMessageInfo, handleReport,
  isMessageStarred, isMessagePinned, canEditMessage, isMobile,
  isAdmin: adminProp = false,
}) => {
  const menuRef = useRef(null);
  if (!effectiveOpenMenuId) return null;
  const msg = messages?.find(m => (m.msgId || m._id?.toString()) === effectiveOpenMenuId);
  if (!msg) return null;

  const isMine = msg.fromUserId?.toString() === currentUser?.id?.toString();
  const isAdmin = adminProp || ["admin", "superAdmin", "subAdmin", "sub_admin"].includes(userRole);
  const starred = isMessageStarred(msg);
  const pinned = isMessagePinned(msg);
  const editable = canEditMessage(msg);
  const msgId = msg.msgId || msg._id?.toString();
  const copied = copiedMessageId === effectiveOpenMenuId;

  const Item = ({ icon: Icon, label, onClick, danger = false, iconColor }) => (
    <button
      onClick={e => { e.stopPropagation(); onClick(); setEffectiveOpenMenuId(null); }}
      className={`w-full flex items-center gap-3 font-medium transition-all active:scale-[0.98] ${isMobile ? "px-5 py-3.5" : "px-4 py-2.5"}`}
      style={{ color: danger ? C.danger : C.t1, background: "transparent" }}
    // onMouseEnter={e => e.currentTarget.style.background = danger ? "#fef2f2" : C.tealXL}
    // onMouseLeave={e => e.currentTarget.style.background = "transparent"}
    >
      <div className={`flex-shrink-0 rounded-lg flex items-center justify-center ${isMobile ? "w-8 h-8" : "w-7 h-7"}`}
        style={{ background: danger ? "#fef2f2" : C.tealXL }}>
        <Icon className={isMobile ? "w-4 h-4" : "w-3.5 h-3.5"} style={{ color: danger ? C.danger : (iconColor || C.teal) }} />
      </div>
      <span className={isMobile ? "text-[15px]" : "text-[13px]"}>{label}</span>
    </button>
  );
  const Divider = () => <div className={isMobile ? "my-2 mx-5" : "my-1 mx-4"} style={{ borderTop: `1px solid ${C.sep}` }} />;

  const content = (
    <>
      <Item icon={Reply} label="Reply" onClick={() => handleReply(msg)} />
      {msg.msgBody?.message_type !== "file" && <Item icon={copied ? Check : Copy} label={copied ? "Copied!" : "Copy"} onClick={() => handleCopyMessage(msg.msgBody?.message, effectiveOpenMenuId)} iconColor={copied ? "#10b981" : C.teal} />}
      {isMine && editable && <Item icon={Pencil} label="Edit" onClick={() => handleEditMessage(msg)} />}
      {pinned ? <Item icon={PinOff} label="Unpin" onClick={() => handleUnpinMessage(msgId)} iconColor={C.amber} /> : <Item icon={Pin} label="Pin" onClick={() => handlePinMessage(msgId)} iconColor={C.amber} />}
      {isMine && <Item icon={Info} label="Message info" onClick={() => handleShowMessageInfo(msg)} />}
      <Divider />
      {!isMine && <Item icon={Flag} label="Report" onClick={() => handleReport(msg)} danger />}
      <Item icon={Trash2} label="Delete for me" onClick={() => deleteForMe(msgId, currentUser.id)} danger />
      {(isMine || isAdmin) && <Item icon={Trash2} label="Delete for everyone" onClick={() => deleteForEveryone(msgId)} danger />}
    </>
  );

  if (isMobile) return (
    <>
      <div className="fixed inset-0 z-[60]" style={{ background: "rgba(13,45,43,.45)" }} onClick={e => { e.stopPropagation(); setEffectiveOpenMenuId(null); }} />
      <div className="fixed bottom-0 left-0 right-0 z-[70] animate-slide-up" style={{ background: C.white, borderRadius: "22px 22px 0 0", border: `1px solid ${C.sep}`, maxHeight: "78vh", paddingBottom: "env(safe-area-inset-bottom,16px)" }} onClick={e => e.stopPropagation()}>
        <div className="flex justify-center pt-3 pb-1"><div className="w-10 h-1 rounded-full" style={{ background: C.sep }} /></div>
        <div className="px-5 py-3 mx-4 rounded-xl mb-2" style={{ background: C.page, border: `1px solid ${C.sep}` }}>
          <p className="text-xs font-semibold mb-0.5" style={{ color: C.teal }}>{msg.publisherName || msg.fromUserId}</p>
          <p className="text-sm leading-snug line-clamp-2" style={{ color: C.t2 }}>
            {typeof msg.msgBody?.message === "string" ? msg.msgBody.message.slice(0, 80) + (msg.msgBody.message.length > 80 ? "…" : "") : msg.msgBody?.message_type === "file" ? msg.msgBody?.media?.fileName || "File" : "Message"}
          </p>
        </div>
        <div className="overflow-y-auto pb-2" style={{ maxHeight: "calc(78vh - 110px)" }}>{content}</div>
      </div>
    </>
  );

  return (
    <>
      <div className="absolute inset-0 z-[60]" onClick={e => { e.stopPropagation(); setEffectiveOpenMenuId(null); }} />
      <div ref={menuRef} className="absolute z-[70] rounded-2xl py-1.5 overflow-hidden" style={{ top: menuPosition.top, left: menuPosition.left, width: 220, maxHeight: "min(340px,calc(100%-16px))", overflowY: "auto", background: C.white, border: `1px solid ${C.sep}` }} onClick={e => e.stopPropagation()}>
        {content}
      </div>
    </>
  );
};

export default ChatWindow;


