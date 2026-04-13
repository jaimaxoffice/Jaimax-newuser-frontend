// import React, { useState, useEffect, useRef } from 'react';
// import {
//     Trash2, AlertTriangle, X, Send, File, ImageIcon, Eye, CheckCheck,
//     ChevronLeft, ChevronRight, ImagePlus, FileText, Camera, Image
// } from 'lucide-react';
// import { safeReplyText } from './MessageText';

// /* ─────────────────────────────────────────────────────────────────────────────
//    DESIGN TOKENS — website teal/white palette
// ───────────────────────────────────────────────────────────────────────────── */
// const TEAL = '#0d9488';
// const PAGE = '#ffffff';
// const CARD = '#f0fdfa';
// const SEP = '#99f6e4';
// const TEXT1 = '#134e4a';
// const TEXT2 = '#6b7280';
// const DANGER = '#ef4444';

// /* ── Bottom-sheet overlay ── */
// const Sheet = ({ onDismiss, children, zIndex = 'z-50' }) => (
//     <div
//         className={`fixed inset-0 ${zIndex} flex items-end sm:items-center justify-center`}
//         style={{ background: 'rgba(0,0,0,0.45)' }}
//         onClick={onDismiss}
//     >
//         <div
//             className="w-full rounded-t-3xl sm:rounded-2xl overflow-hidden"
//             style={{ background: PAGE, maxWidth: 390 }}
//             onClick={e => e.stopPropagation()}
//         >
//             {children}
//         </div>
//     </div>
// );

// /* ── iOS drag handle ── */
// const Handle = () => (
//     <div className="flex justify-center pt-3 pb-1 sm:hidden">
//         <div className="w-9 h-1 rounded-full" style={{ background: '#d1d5db' }} />
//     </div>
// );

// /* ── Section label ── */
// const SectionLabel = ({ children }) => (
//     <p className="px-4 pt-5 pb-1.5 text-xs font-semibold uppercase tracking-widest"
//         style={{ color: TEXT2 }}>
//         {children}
//     </p>
// );

// /* ── Grouped card ── */
// const GroupCard = ({ children }) => (
//     <div className="mx-4 rounded-2xl overflow-hidden" style={{ background: CARD, border: `1.5px solid ${SEP}` }}>
//         {children}
//     </div>
// );

// /* ── Single row inside GroupCard ── */
// const Row = ({ icon, label, sub, right, onClick, danger = false, last = false }) => (
//     <div
//         onClick={onClick}
//         className={`flex items-center px-4 py-3.5 gap-3.5 ${onClick ? 'active:opacity-60 cursor-pointer select-none' : ''}`}
//         style={{ borderBottom: last ? 'none' : `1px solid ${SEP}` }}
//     >
//         {icon && (
//             <div
//                 className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
//                 style={{ background: danger ? '#fde8e8' : '#ccfbf1' }}
//             >
//                 {icon}
//             </div>
//         )}
//         <div className="flex-1 min-w-0">
//             <p className="text-sm font-medium truncate"
//                 style={{ color: danger ? DANGER : TEXT1 }}>{label}</p>
//             {sub && <p className="text-xs mt-0.5 truncate" style={{ color: TEXT2 }}>{sub}</p>}
//         </div>
//         {right}
//     </div>
// );

// /* ── Spinner ── */
// const Spin = () => (
//     <div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
// );

// /* ── Dual-button footer ── */
// const DualFooter = ({ cancelLabel = 'Cancel', cancelColor = TEXT1, onCancel, confirmLabel, confirmBg, onConfirm, disabled = false, confirmIcon }) => (
//     <div className="flex gap-3 mx-4 mt-3 mb-8">
//         <button
//             onClick={onCancel}
//             className="flex-1 py-3.5 rounded-2xl text-sm font-semibold"
//             style={{ background: PAGE, color: cancelColor, border: `1.5px solid ${SEP}` }}
//         >
//             {cancelLabel}
//         </button>
//         <button
//             onClick={onConfirm}
//             disabled={disabled}
//             className="flex-1 py-3.5 rounded-2xl text-sm font-semibold text-white flex items-center justify-center gap-2 disabled:opacity-40"
//             style={{ background: confirmBg }}
//         >
//             {confirmIcon}{confirmLabel}
//         </button>
//     </div>
// );


// /* ══════════════════════════════════════════════════════════════════════════════
//    1. CLEAR CHAT MODAL
// ══════════════════════════════════════════════════════════════════════════════ */
// export const ClearChatModal = ({ selectedGroup, showClearChatModal, setShowClearChatModal, onClearChat }) => {
//     if (!showClearChatModal) return null;
//     return (
//         <Sheet onDismiss={() => setShowClearChatModal(false)}>
//             <Handle />

//             <SectionLabel>Clear Chat</SectionLabel>

//             <SectionLabel>Warning</SectionLabel>
//             <GroupCard>
//                 <Row
//                     icon={<AlertTriangle className="w-4 h-4 text-amber-500" />}
//                     label="This action cannot be undone"
//                     sub="Messages, media, and files will be permanently deleted."
//                     last
//                 />
//             </GroupCard>

//             <DualFooter
//                 onCancel={() => setShowClearChatModal(false)}
//                 confirmLabel="Clear"
//                 confirmBg={DANGER}
//                 onConfirm={onClearChat}
//                 confirmIcon={<Trash2 className="w-4 h-4" />}
//             />
//         </Sheet>
//     );
// };


// /* ══════════════════════════════════════════════════════════════════════════════
//    2. ERROR DETAIL MODAL
// ══════════════════════════════════════════════════════════════════════════════ */
// export const ErrorDetailModal = ({ showErrorDetail, setShowErrorDetail, retryMessage, formatTime }) => {
//     if (!showErrorDetail) return null;
//     return (
//         <Sheet onDismiss={() => setShowErrorDetail(null)}>
//             <Handle />

//             <SectionLabel>Message Not Sent</SectionLabel>
//             <GroupCard>
//                 <Row
//                     icon={<AlertTriangle className="w-4 h-4" style={{ color: DANGER }} />}
//                     label="Failed to deliver"
//                     sub={formatTime(showErrorDetail.timestamp)}
//                     last
//                 />
//             </GroupCard>

//             <SectionLabel>Error Detail</SectionLabel>
//             <GroupCard>
//                 <div className="px-4 py-4">
//                     <p className="text-sm leading-relaxed" style={{ color: DANGER }}>
//                         {showErrorDetail.error || 'Unknown error occurred'}
//                     </p>
//                 </div>
//             </GroupCard>

//             <DualFooter
//                 cancelLabel="Dismiss"
//                 onCancel={() => setShowErrorDetail(null)}
//                 confirmLabel="Retry"
//                 confirmBg={TEAL}
//                 onConfirm={() => { setShowErrorDetail(null); retryMessage?.(showErrorDetail); }}
//             />
//         </Sheet>
//     );
// };

// export const FileSendPreview = ({
//     showFilePreview, selectedFile, filePreview, uploadingFile,
//     cancelFileUpload, sendFileMessage
// }) => {
//     if (!showFilePreview) return null;
//     return (
//         <Sheet onDismiss={!uploadingFile ? cancelFileUpload : undefined}>
//             <Handle />

//             {/* ── Upload overlay loader ── */}
//             {uploadingFile && (
//                 <div
//                     className="absolute inset-0 z-[110] flex flex-col items-center justify-center rounded-t-3xl sm:rounded-2xl"
//                     style={{ background: 'rgba(255,255,255,0.97)' }}
//                 >
//                     <div className="relative w-20 h-20 mb-6">
//                         <div
//                             className="absolute inset-0 rounded-full animate-spin"
//                             style={{ border: `3px solid #ccfbf1`, borderTopColor: TEAL }}
//                         />
//                         <div
//                             className="absolute inset-0 rounded-full animate-spin"
//                             style={{
//                                 border: '3px solid transparent',
//                                 borderBottomColor: 'rgba(13,148,136,0.35)',
//                                 animationDirection: 'reverse',
//                                 animationDuration: '1.4s',
//                             }}
//                         />
//                         <div
//                             className="absolute inset-0 m-auto w-11 h-11 rounded-full flex items-center justify-center"
//                             style={{ background: TEAL }}
//                         >
//                             <Send className="w-5 h-5 text-white" />
//                         </div>
//                     </div>
//                     <p className="text-base font-semibold mb-1" style={{ color: TEXT1 }}>Uploading…</p>
//                     <p className="text-xs" style={{ color: TEXT2 }}>Please don't close this screen</p>
//                     <div className="flex items-center gap-1.5 mt-5">
//                         {[0, 200, 400].map(delay => (
//                             <div key={delay} className="w-2 h-2 rounded-full animate-bounce"
//                                 style={{ background: TEAL, animationDelay: `${delay}ms` }} />
//                         ))}
//                     </div>
//                 </div>
//             )}

//             <SectionLabel>Send File</SectionLabel>
//             <GroupCard>
//                 {selectedFile?.type?.startsWith('image/') && filePreview ? (
//                     <div className="flex items-center justify-center" style={{ height: 200, background: '#111' }}>
//                         <img src={filePreview} alt="Preview"
//                             className="max-w-full max-h-full object-contain" />
//                     </div>
//                 ) : (
//                     <Row
//                         icon={<File className="w-4 h-4" style={{ color: TEAL }} />}
//                         label={selectedFile?.name || 'File'}
//                         sub={`${(selectedFile?.size / 1024 / 1024).toFixed(2)} MB`}
//                         last
//                     />
//                 )}
//             </GroupCard>

//             <DualFooter
//                 onCancel={cancelFileUpload}
//                 confirmLabel={uploadingFile ? 'Uploading…' : 'Send'}
//                 confirmBg={TEAL}
//                 onConfirm={sendFileMessage}
//                 disabled={uploadingFile}
//                 confirmIcon={uploadingFile ? <Spin /> : <Send className="w-4 h-4" />}
//             />
//         </Sheet>
//     );
// };


// /* ══════════════════════════════════════════════════════════════════════════════
//    5. IMAGE PREVIEW MODAL  (iOS full-screen camera-roll style)
// ══════════════════════════════════════════════════════════════════════════════ */
// export const ImagePreviewModal = ({
//     showImagePreview, selectedImages, imageCaption, setImageCaption,
//     uploadingFile, cancelImageUpload, sendImageMessage, removeImage,
//     formatFileSize, onAddMore,
// }) => {
//     const [activeIdx, setActiveIdx] = useState(0);
//     useEffect(() => {
//         if (selectedImages.length > 0 && activeIdx >= selectedImages.length)
//             setActiveIdx(selectedImages.length - 1);
//     }, [selectedImages, activeIdx]);

//     if (!showImagePreview || selectedImages.length === 0) return null;

//     const count = selectedImages.length;
//     const active = selectedImages[activeIdx];
//     const nav = dir => setActiveIdx(p => (p + dir + count) % count);

//     return (
//         <div
//             className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6"
//             style={{ background: 'rgba(0,0,0,0.82)' }}
//             onClick={(e) => { if (e.target === e.currentTarget) cancelImageUpload(); }}
//         >
//             {/* ── Upload overlay loader ── */}
//             {uploadingFile && (
//                 <div
//                     className="absolute inset-0 z-[110] flex flex-col items-center justify-center"
//                     style={{ background: 'rgba(0,0,0,0.82)' }}
//                 >
//                     <div className="relative w-20 h-20 mb-6">
//                         <div
//                             className="absolute inset-0 rounded-full animate-spin"
//                             style={{ border: '3px solid rgba(13,148,136,0.25)', borderTopColor: '#0d9488' }}
//                         />
//                         <div
//                             className="absolute inset-0 rounded-full animate-spin"
//                             style={{
//                                 border: '3px solid transparent',
//                                 borderBottomColor: 'rgba(13,148,136,0.4)',
//                                 animationDirection: 'reverse',
//                                 animationDuration: '1.4s',
//                             }}
//                         />
//                         <div
//                             className="absolute inset-0 m-auto w-11 h-11 rounded-full flex items-center justify-center"
//                             style={{ background: '#0d9488' }}
//                         >
//                             <ImageIcon className="w-5 h-5 text-white" />
//                         </div>
//                     </div>
//                     <p className="text-white text-base font-semibold mb-1">
//                         Uploading {count > 1 ? `${count} photos` : 'photo'}…
//                     </p>
//                     <p className="text-xs" style={{ color: 'rgba(255,255,255,0.45)' }}>
//                         Please don't close this screen
//                     </p>
//                     <div className="flex items-center gap-1.5 mt-5">
//                         {[0, 200, 400].map(delay => (
//                             <div
//                                 key={delay}
//                                 className="w-2 h-2 rounded-full animate-bounce"
//                                 style={{ background: '#0d9488', animationDelay: `${delay}ms` }}
//                             />
//                         ))}
//                     </div>
//                 </div>
//             )}

//             {/* ── Modal container ── */}
//             <div
//                 className="relative flex flex-col rounded-2xl overflow-hidden shadow-2xl border border-white/10"
//                 style={{
//                     width: '100%',
//                     maxWidth: '780px',
//                     height: 'clamp(320px, 55vh, 480px)',
//                     background: '#0f766e',
//                 }}
//                 onClick={(e) => e.stopPropagation()}
//             >
//                 {/* ── Top bar ── */}
//                 <div
//                     className="flex items-center justify-between px-4 py-2.5 flex-shrink-0 border-b border-white/10"
//                     style={{ background: '#115e59' }}
//                 >
//                     <button
//                         onClick={cancelImageUpload}
//                         className="flex items-center gap-1.5 text-sm font-semibold px-2.5 py-1.5 rounded-lg hover:bg-white/10 transition-colors"
//                         style={{ color: '#fff' }}
//                         onMouseEnter={e => e.currentTarget.style.color = '#5eead4'}
//                         onMouseLeave={e => e.currentTarget.style.color = '#fff'}
//                     >
//                         <ChevronLeft className="w-4 h-4" />
//                         Back
//                     </button>

//                     <span className="text-white text-xs sm:text-sm font-semibold tracking-wide uppercase opacity-70">
//                         {count > 1 ? `${activeIdx + 1} / ${count}` : 'Preview'}
//                     </span>

//                 </div>

//                 {/* ── Body: image left, panel right ── */}
//                 <div className="flex-1 flex flex-col sm:flex-row min-h-0 overflow-hidden">

//                     {/* Main image area */}
//                     <div className="flex-1 flex items-center justify-center relative overflow-hidden bg-black p-2 sm:p-3 min-h-0">
//                         <img
//                             src={active.preview}
//                             alt={active.name}
//                             className="max-w-full max-h-full object-contain rounded-lg shadow-xl"
//                         />

//                         {/* Remove current image */}
//                         <button
//                             onClick={() => removeImage(activeIdx)}
//                             className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-colors hover:bg-white/20"
//                             style={{ background: 'rgba(0,0,0,0.55)' }}
//                         >
//                             <X className="w-4 h-4 text-white" />
//                         </button>

//                         {/* Nav arrows */}
//                         {count > 1 && (
//                             <>
//                                 <button
//                                     onClick={() => nav(-1)}
//                                     className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center transition-colors hover:bg-white/20"
//                                     style={{ background: 'rgba(0,0,0,0.45)' }}
//                                 >
//                                     <ChevronLeft className="w-5 h-5 text-white" />
//                                 </button>
//                                 <button
//                                     onClick={() => nav(1)}
//                                     className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center transition-colors hover:bg-white/20"
//                                     style={{ background: 'rgba(0,0,0,0.45)' }}
//                                 >
//                                     <ChevronRight className="w-5 h-5 text-white" />
//                                 </button>
//                             </>
//                         )}
//                     </div>

//                     {/* ── Right panel ── */}
//                     <div
//                         className="sm:w-56 flex-shrink-0 flex flex-col gap-3 p-3 border-t sm:border-t-0 sm:border-l border-white/10"
//                         style={{ background: '#0f766e' }}
//                     >
//                         {/* Thumbnail strip */}
//                         {count > 1 && (
//                             <div className="flex sm:flex-col gap-2 overflow-x-auto sm:overflow-y-auto sm:overflow-x-hidden flex-shrink-0 sm:max-h-[160px]">
//                                 {selectedImages.map((img, i) => (
//                                     <div
//                                         key={i}
//                                         onClick={() => setActiveIdx(i)}
//                                         className="relative flex-shrink-0 w-12 h-12 sm:w-full sm:h-14 rounded-xl overflow-hidden cursor-pointer transition-opacity"
//                                         style={{
//                                             outline: i === activeIdx ? '2.5px solid #0d9488' : '2.5px solid transparent',
//                                             outlineOffset: 2,
//                                             opacity: i === activeIdx ? 1 : 0.6,
//                                         }}
//                                     >
//                                         <img
//                                             src={img.preview}
//                                             alt={img.name}
//                                             className="w-full h-full object-cover"
//                                         />
//                                         <button
//                                             onClick={e => { e.stopPropagation(); removeImage(i); }}
//                                             className="absolute top-0.5 right-0.5 w-4 h-4 rounded-full flex items-center justify-center"
//                                             style={{ background: 'rgba(0,0,0,0.6)' }}
//                                         >
//                                             <X className="w-2.5 h-2.5 text-white" />
//                                         </button>
//                                     </div>
//                                 ))}
//                             </div>
//                         )}

//                         <div className="flex-1" />

//                         <p className="text-white/60 text-xs font-medium uppercase tracking-wider hidden sm:block">
//                             Add caption
//                         </p>

//                         <input
//                             type="text"
//                             value={imageCaption}
//                             onChange={e => setImageCaption(e.target.value)}
//                             onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); sendImageMessage(); } }}
//                             placeholder="Add a caption…"
//                             maxLength={1000}
//                             className="w-full text-white rounded-lg px-3 py-2 text-sm outline-none transition-colors placeholder-white/40"
//                             style={{
//                                 background: 'rgba(255,255,255,0.12)',
//                                 border: '1px solid rgba(255,255,255,0.2)',
//                                 caretColor: '#5eead4',
//                             }}
//                             onFocus={e => e.target.style.borderColor = '#5eead4'}
//                             onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.2)'}
//                         />

//                         <button
//                             onClick={sendImageMessage}
//                             disabled={uploadingFile}
//                             className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl transition-colors active:scale-95 shadow-lg text-white font-medium text-sm disabled:opacity-40"
//                             style={{ background: '#0d9488' }}
//                             onMouseEnter={e => { if (!uploadingFile) e.currentTarget.style.background = '#14b8a6'; }}
//                             onMouseLeave={e => e.currentTarget.style.background = '#0d9488'}
//                         >
//                             {uploadingFile
//                                 ? <Spin />
//                                 : <><Send className="w-4 h-4" /> Send Photo</>
//                             }
//                         </button>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// /* ══════════════════════════════════════════════════════════════════════════════
//    6. DOCUMENT PREVIEW MODAL
// ══════════════════════════════════════════════════════════════════════════════ */
// export const DocumentPreviewModal = ({
//     showDocumentPreview, selectedDocument, uploadingFile,
//     cancelDocumentUpload, sendDocumentMessage, formatFileSize
// }) => {
//     if (!showDocumentPreview || !selectedDocument) return null;
//     return (
//         <Sheet onDismiss={!uploadingFile ? cancelDocumentUpload : undefined}>
//             <Handle />

//             {/* ── Upload overlay loader ── */}
//             {uploadingFile && (
//                 <div
//                     className="absolute inset-0 z-[110] flex flex-col items-center justify-center rounded-t-3xl sm:rounded-2xl"
//                     style={{ background: 'rgba(255,255,255,0.97)' }}
//                 >
//                     <div className="relative w-20 h-20 mb-6">
//                         <div
//                             className="absolute inset-0 rounded-full animate-spin"
//                             style={{ border: `3px solid #ccfbf1`, borderTopColor: TEAL }}
//                         />
//                         <div
//                             className="absolute inset-0 rounded-full animate-spin"
//                             style={{
//                                 border: '3px solid transparent',
//                                 borderBottomColor: 'rgba(13,148,136,0.35)',
//                                 animationDirection: 'reverse',
//                                 animationDuration: '1.4s',
//                             }}
//                         />
//                         <div
//                             className="absolute inset-0 m-auto w-11 h-11 rounded-full flex items-center justify-center"
//                             style={{ background: TEAL }}
//                         >
//                             <File className="w-5 h-5 text-white" />
//                         </div>
//                     </div>
//                     <p className="text-base font-semibold mb-1" style={{ color: TEXT1 }}>
//                         Uploading document…
//                     </p>
//                     <p className="text-xs text-center px-8" style={{ color: TEXT2 }}>
//                         Please don't close this screen
//                     </p>
//                     <div className="flex items-center gap-1.5 mt-5">
//                         {[0, 200, 400].map(delay => (
//                             <div
//                                 key={delay}
//                                 className="w-2 h-2 rounded-full animate-bounce"
//                                 style={{ background: TEAL, animationDelay: `${delay}ms` }}
//                             />
//                         ))}
//                     </div>
//                 </div>
//             )}

//             <SectionLabel>Send Document</SectionLabel>
//             <GroupCard>
//                 <Row
//                     icon={<span className="text-xl leading-none">{selectedDocument.icon}</span>}
//                     label={selectedDocument.name}
//                     sub={`${formatFileSize(selectedDocument.size)} · ${selectedDocument.type || 'Document'}`}
//                     last
//                 />
//             </GroupCard>

//             <DualFooter
//                 onCancel={cancelDocumentUpload}
//                 confirmLabel={uploadingFile ? 'Sending…' : 'Send'}
//                 confirmBg={TEAL}
//                 onConfirm={sendDocumentMessage}
//                 disabled={uploadingFile}
//                 confirmIcon={uploadingFile ? <Spin /> : <Send className="w-4 h-4" />}
//             />
//         </Sheet>
//     );
// };


// /* ══════════════════════════════════════════════════════════════════════════════
//    7. REPORT MODAL
// ══════════════════════════════════════════════════════════════════════════════ */
// const REASONS = [
//     { value: 'spam', label: 'Spam' },
//     { value: 'harassment', label: 'Harassment' },
//     { value: 'violence', label: 'Violence' },
//     { value: 'inappropriate', label: 'Inappropriate' },
//     { value: 'other', label: 'Other' },
// ];



// export const ReportModal = ({
//     showReportModal,
//     reportingMessage,
//     reportReason,
//     reportDescription,
//     setReportReason,
//     setReportDescription,
//     setShowReportModal,
//     setReportingMessage,
//     groupKey,
//     submitReport
// }) => {
//     if (!showReportModal || !reportingMessage) return null;

//     const close = () => {
//         setShowReportModal(false);
//         setReportingMessage(null);
//         setReportReason("");
//         setReportDescription("");
//     };

//     return (
//         <Sheet
//             onDismiss={close}
//             className="max-w-[460px] mx-auto rounded-t-3xl"
//         >
//             <Handle />

//             <div className="px-5 pb-5 pt-2 space-y-4">
//                 {/* Reported Message */}
//                 <div>
//                     <p
//                         className="text-sm font-semibold mb-2"
//                         style={{ color: TEXT2 }}
//                     >
//                         Reported Message
//                     </p>

//                     <div
//                         className="rounded-2xl px-4 py-3 border"
//                         style={{
//                             background: "rgba(255,255,255,0.04)",
//                             borderColor: SEP
//                         }}
//                     >
//                         <p
//                             className="text-xs font-semibold mb-1"
//                             style={{ color: TEXT2 }}
//                         >
//                             {reportingMessage.publisherName ||
//                                 reportingMessage.senderName}
//                         </p>

//                         <p
//                             className="text-sm leading-6 line-clamp-3"
//                             style={{ color: TEXT1 }}
//                         >
//                             {safeReplyText(
//                                 reportingMessage.msgBody?.message,
//                                 groupKey
//                             )}
//                         </p>
//                     </div>
//                 </div>

//                 {/* Reason */}
//                 <div>
//                     <p
//                         className="text-sm font-semibold mb-2"
//                         style={{ color: TEXT2 }}
//                     >
//                         Reason <span style={{ color: DANGER }}>*</span>
//                     </p>

//                     <div className="flex flex-wrap gap-2">
//                         {REASONS.map((r) => {
//                             const active = reportReason === r.value;

//                             return (
//                                 <button
//                                     key={r.value}
//                                     onClick={() => setReportReason(r.value)}
//                                     className="px-4 py-2 rounded-xl text-sm font-medium border transition-all duration-200"
//                                     style={{
//                                         background: active
//                                             ? `${TEAL}20`
//                                             : "rgba(255,255,255,0.03)",
//                                         borderColor: active ? TEAL : SEP,
//                                         color: active ? TEAL : TEXT1
//                                     }}
//                                 >
//                                     {r.label}
//                                 </button>
//                             );
//                         })}
//                     </div>
//                 </div>

//                 {/* Details */}
//                 <div>
//                     <p
//                         className="text-sm font-semibold mb-2"
//                         style={{ color: TEXT2 }}
//                     >
//                         Additional Details
//                     </p>

//                     <div
//                         className="rounded-2xl border px-4 py-3"
//                         style={{
//                             background: "rgba(255,255,255,0.04)",
//                             borderColor: SEP
//                         }}
//                     >
//                         <textarea
//                             value={reportDescription}
//                             onChange={(e) =>
//                                 setReportDescription(e.target.value)
//                             }
//                             placeholder="Add any extra details about this report..."
//                             rows={4}
//                             maxLength={500}
//                             className="w-full bg-transparent resize-none outline-none text-sm leading-6"
//                             style={{
//                                 color: TEXT1,
//                                 caretColor: TEAL
//                             }}
//                         />

//                         <div
//                             className="text-xs text-right mt-2"
//                             style={{ color: TEXT2 }}
//                         >
//                             {reportDescription.length}/500
//                         </div>
//                     </div>
//                 </div>

//                 {/* Footer */}
//                 <div className="flex gap-3 pt-1">
//                     <button
//                         onClick={close}
//                         className="flex-1 h-12 rounded-2xl text-sm font-semibold border transition-all"
//                         style={{
//                             borderColor: SEP,
//                             color: TEXT2,
//                             background: "transparent"
//                         }}
//                     >
//                         Cancel
//                     </button>

//                     <button
//                         onClick={submitReport}
//                         disabled={!reportReason}
//                         className="flex-1 h-12 rounded-2xl text-sm font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
//                         style={{
//                             background: DANGER,
//                             color: "#fff"
//                         }}
//                     >
//                         Submit Report
//                     </button>
//                 </div>
//             </div>
//         </Sheet>
//     );
// };

// /* ══════════════════════════════════════════════════════════════════════════════
//    8. READ RECEIPTS MODAL
// ══════════════════════════════════════════════════════════════════════════════ */
// export const ReadReceiptsModal = ({
//     showReadReceipts, setShowReadReceipts, selectedMessageForReceipts, members, formatTime
// }) => {
//     if (!showReadReceipts || !selectedMessageForReceipts) return null;
//     const readers = selectedMessageForReceipts.metaData?.readBy ?? [];

//     return (
//         <div
//             className="absolute inset-0 z-50 flex items-end sm:items-center justify-center"
//             style={{ background: 'rgba(0,0,0,0.45)' }}
//             onClick={() => setShowReadReceipts(false)}
//         >
//             <div
//                 className="w-full rounded-t-3xl sm:rounded-2xl overflow-hidden flex flex-col"
//                 style={{ background: PAGE, maxHeight: '70vh', maxWidth: 390 }}
//                 onClick={e => e.stopPropagation()}
//             >
//                 <Handle />
//                 <SectionLabel>
//                     Read by · {readers.length} {readers.length === 1 ? 'person' : 'people'}
//                 </SectionLabel>

//                 <div className="mx-4 rounded-2xl overflow-hidden flex-1 overflow-y-auto"
//                     style={{ background: CARD, color: TEXT1, border: '1.5px solid ' + SEP }}>
//                     {readers.length > 0 ? (
//                         readers.map((readInfo, i) => {
//                             const member = members?.find(m => m.id === readInfo.userId);
//                             const initial = member?.name?.charAt(0).toUpperCase() || '?';
//                             return (
//                                 <Row
//                                     key={readInfo.userId}
//                                     icon={
//                                         <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold"
//                                             style={{ background: TEAL }}>
//                                             {initial}
//                                         </div>
//                                     }
//                                     label={member?.name || 'Unknown'}
//                                     sub={readInfo.readAt ? formatTime(readInfo.readAt) : 'Just now'}
//                                     right={<CheckCheck className="w-4 h-4 flex-shrink-0" style={{ color: TEAL }} />}
//                                     last={i === readers.length - 1}
//                                 />
//                             );
//                         })
//                     ) : (
//                         <div className="flex flex-col items-center justify-center py-14 px-6">
//                             <Eye className="w-10 h-10 mb-3" style={{ color: '#d1d5db' }} />
//                             <p className="text-sm font-medium" style={{ color: TEXT1 }}>No reads yet</p>
//                             <p className="text-xs mt-1 text-center" style={{ color: TEXT2 }}>
//                                 Read receipts will appear here
//                             </p>
//                         </div>
//                     )}
//                 </div>

//                 <div className="mx-4 mt-3 mb-8">
//                     <button
//                         onClick={() => setShowReadReceipts(false)}
//                         className="w-full py-3.5 rounded-2xl text-sm font-semibold"
//                         style={{ background: PAGE, color: TEXT1, border: '1.5px solid ' + SEP }}
//                     >
//                         Close
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// };




// export const FileTypePopup = ({
//     showFileTypeModal,
//     setShowFileTypeModal,
//     fileInputRef,
//     onOpenCamera,
//     onOpenPoll,        // ← NEW prop
//     anchorRef,
// }) => {
//     if (!showFileTypeModal) return null;

//     const items = [
//         {
//             label: "Images",
//             icon: (
//                 <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#8B5CF6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                     <rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" />
//                     <polyline points="21 15 16 10 5 21" />
//                 </svg>
//             ),
//             color: "#8B5CF6",
//             bg: "#F5F3FF",
//             //   onClick: () => { fileInputRef?.current?.click(); setShowFileTypeModal(false); },
//             onClick: () => {
//                 if (fileInputRef?.current) {
//                     fileInputRef.current.accept = "image/png,image/jpeg,image/jpg,image/gif,image/webp,video/mp4,video/mov,video/avi,video/webm";
//                     fileInputRef.current.click();
//                 }
//                 setShowFileTypeModal(false);
//             },
//         },
//         {
//             label: "Document",
//             icon: (
//                 <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0EA5E9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                     <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
//                     <polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" />
//                 </svg>
//             ),
//             color: "#0EA5E9",
//             bg: "#F0F9FF",
//             // onClick: () => { fileInputRef?.current?.click(); setShowFileTypeModal(false); },
//             onClick: () => {
//                 if (fileInputRef?.current) {
//                     fileInputRef.current.accept = ".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.zip,.rar";
//                     fileInputRef.current.click();
//                 }
//                 setShowFileTypeModal(false);
//             },
//         },
//         {
//             label: "Camera",
//             icon: (
//                 <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                     <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
//                     <circle cx="12" cy="13" r="4" />
//                 </svg>
//             ),
//             color: "#10B981",
//             bg: "#F0FDF4",
//             onClick: () => { onOpenCamera?.(); setShowFileTypeModal(false); },
//         },
//         // {
//         //     label: "Poll",
//         //     icon: (
//         //         <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//         //             <line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" />
//         //             <line x1="6" y1="20" x2="6" y2="14" />
//         //         </svg>
//         //     ),
//         //     color: "#F59E0B",
//         //     bg: "#FFFBEB",
//         //     onClick: () => { onOpenPoll?.(); setShowFileTypeModal(false); },
//         // },
//     ];

//     return (
//         <div
//             className="absolute z-50 bottom-12 left-0"
//             style={{
//                 background: "#ffffff",
//                 borderRadius: 16,
//                 boxShadow: "0 8px 32px rgba(0,0,0,0.15)",
//                 border: "1px solid #f0f0f0",
//                 padding: "8px 0",
//                 minWidth: 200,
//                 animation: "popupFadeIn 0.18s cubic-bezier(0.34,1.56,0.64,1)",
//             }}
//             onClick={(e) => e.stopPropagation()}
//         >
//             {items.map((item) => (
//                 <button
//                     key={item.label}
//                     onClick={item.onClick}
//                     style={{
//                         display: "flex", alignItems: "center", gap: 12,
//                         width: "100%", background: "none", border: "none",
//                         cursor: "pointer", padding: "10px 16px",
//                         transition: "background 0.12s",
//                     }}
//                     onMouseEnter={(e) => (e.currentTarget.style.background = "#f8f8f8")}
//                     onMouseLeave={(e) => (e.currentTarget.style.background = "none")}
//                 >
//                     <div style={{
//                         width: 36, height: 36, borderRadius: "50%",
//                         background: item.bg, display: "flex",
//                         alignItems: "center", justifyContent: "center", flexShrink: 0,
//                     }}>
//                         {item.icon}
//                     </div>
//                     <span style={{ fontSize: 14, fontWeight: 500, color: "#111b21" }}>
//                         {item.label}
//                     </span>
//                 </button>
//             ))}
//             <style>{`
//         @keyframes popupFadeIn {
//           from { opacity:0; transform:scale(0.9) translateY(8px) }
//           to   { opacity:1; transform:scale(1)   translateY(0)   }
//         }
//       `}</style>
//         </div>
//     );
// };



import React, { useState, useEffect, useRef } from 'react';
import {
    Trash2, AlertTriangle, X, Send, File, ImageIcon, Eye, CheckCheck,
    ChevronLeft, ChevronRight, ImagePlus, FileText, Camera, Image
} from 'lucide-react';

/* ─────────────────────────────────────────────────────────────────────────────
   DESIGN TOKENS — website teal/white palette
───────────────────────────────────────────────────────────────────────────── */
const TEAL = '#0d9488';
const PAGE = '#ffffff';
const CARD = '#f0fdfa';
const SEP = '#99f6e4';
const TEXT1 = '#134e4a';
const TEXT2 = '#6b7280';
const DANGER = '#ef4444';

/* ────────────────────────────────────────────────────────────────────────────
   UNIVERSAL RESPONSIVE MODAL BACKDROP & CENTERING
────────────────────────────────────────────────────────────────────────────── */
const ResponsiveBackdrop = ({ onDismiss, children }) => {
    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{
                background: 'rgba(0,0,0,0.5)',
                animation: 'backdropFadeIn 0.3s ease-out',
            }}
            onClick={onDismiss}
        >
            <style>{`
                @keyframes backdropFadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes modalSlideUp {
                    from { 
                        opacity: 0;
                        transform: translateY(30px) scale(0.95);
                    }
                    to { 
                        opacity: 1;
                        transform: translateY(0) scale(1);
                    }
                }
                @keyframes modalFadeIn {
                    from { 
                        opacity: 0;
                        transform: scale(0.95);
                    }
                    to { 
                        opacity: 1;
                        transform: scale(1);
                    }
                }
            `}</style>
            {children}
        </div>
    );
};

/* ────────────────────────────────────────────────────────────────────────────
   CENTERED MODAL CONTAINER (Works on ALL screen sizes)
────────────────────────────────────────────────────────────────────────────── */
const CenteredModal = ({ onDismiss, children, maxWidth = 420, animated = true }) => {
    return (
        <ResponsiveBackdrop onDismiss={onDismiss}>
            <div
                onClick={(e) => e.stopPropagation()}
                style={{
                    background: PAGE,
                    borderRadius: '20px',
                    boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
                    maxWidth: `min(100%, ${maxWidth}px)`,
                    width: '100%',
                    maxHeight: '90vh',
                    overflowY: 'auto',
                    animation: animated ? 'modalFadeIn 0.3s ease-out' : 'none',
                }}
                className="max-h-[90vh]"
            >
                {children}
            </div>
        </ResponsiveBackdrop>
    );
};

/* ────────────────────────────────────────────────────────────────────────────
   SECTION LABEL
────────────────────────────────────────────────────────────────────────────── */
const SectionLabel = ({ children }) => (
    <p
        className="px-4 sm:px-6 py-4 sm:py-5 text-xs sm:text-sm font-bold uppercase tracking-widest"
        style={{ color: TEXT2 }}
    >
        {children}
    </p>
);

/* ────────────────────────────────────────────────────────────────────────────
   GROUPED CARD
────────────────────────────────────────────────────────────────────────────── */
const GroupCard = ({ children }) => (
    <div
        className="mx-4 sm:mx-6 rounded-2xl overflow-hidden"
        style={{ background: CARD, border: `1.5px solid ${SEP}` }}
    >
        {children}
    </div>
);

/* ────────────────────────────────────────────────────────────────────────────
   ROW ITEM (List item in cards)
────────────────────────────────────────────────────────────────────────────── */
const Row = ({ icon, label, sub, right, onClick, danger = false, last = false }) => (
    <div
        onClick={onClick}
        className={`flex items-center px-4 sm:px-6 py-3.5 sm:py-4 gap-3 sm:gap-4 ${onClick ? 'hover:opacity-80 active:opacity-60 cursor-pointer transition-opacity' : ''
            }`}
        style={{ borderBottom: last ? 'none' : `1px solid ${SEP}` }}
    >
        {icon && (
            <div
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: danger ? '#fde8e8' : '#ccfbf1' }}
            >
                {icon}
            </div>
        )}
        <div className="flex-1 min-w-0">
            <p
                className="text-sm sm:text-base font-semibold truncate"
                style={{ color: danger ? DANGER : TEXT1 }}
            >
                {label}
            </p>
            {sub && (
                <p className="text-xs sm:text-sm mt-1 truncate" style={{ color: TEXT2 }}>
                    {sub}
                </p>
            )}
        </div>
        {right && <div className="flex-shrink-0">{right}</div>}
    </div>
);

/* ────────────────────────────────────────────────────────────────────────────
   LOADING SPINNER
────────────────────────────────────────────────────────────────────────────── */
const Spin = () => (
    <div className="w-5 h-5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
);

/* ────────────────────────────────────────────────────────────────────────────
   DUAL BUTTON FOOTER (Fully Responsive)
────────────────────────────────────────────────────────────────────────────── */
const DualFooter = ({
    cancelLabel = 'Cancel',
    cancelColor = TEXT1,
    onCancel,
    confirmLabel,
    confirmBg,
    onConfirm,
    disabled = false,
    confirmIcon,
}) => (
    <div className="flex gap-3 sm:gap-4 px-4 sm:px-6 py-4 sm:py-5 mt-4 sm:mt-6 border-t" style={{ borderColor: SEP }}>
        <button
            onClick={onCancel}
            className="flex-1 py-2.5 sm:py-3 rounded-2xl text-sm sm:text-base font-semibold transition-all hover:opacity-80 active:opacity-60"
            style={{
                background: PAGE,
                color: cancelColor,
                border: `1.5px solid ${SEP}`,
            }}
        >
            {cancelLabel}
        </button>
        <button
            onClick={onConfirm}
            disabled={disabled}
            className="flex-1 py-2.5 sm:py-3 rounded-2xl text-sm sm:text-base font-semibold text-white flex items-center justify-center gap-2 disabled:opacity-40 transition-all hover:disabled:opacity-40 active:scale-95"
            style={{ background: confirmBg }}
        >
            {confirmIcon}
            {confirmLabel}
        </button>
    </div>
);


/* ══════════════════════════════════════════════════════════════════════════════
   MODAL 1: CLEAR CHAT
══════════════════════════════════════════════════════════════════════════════ */
export const ClearChatModal = ({
    showClearChatModal,
    setShowClearChatModal,
    onClearChat,
}) => {
    if (!showClearChatModal) return null;
    return (
        <CenteredModal
            onDismiss={() => setShowClearChatModal(false)}
            maxWidth={420}
        >
            <SectionLabel>Clear Chat</SectionLabel>
            <SectionLabel style={{ color: DANGER }}>⚠️ Warning</SectionLabel>

            <GroupCard>
                <Row
                    icon={<AlertTriangle className="w-5 h-5 sm:w-6 sm:h-6 text-amber-500" />}
                    label="This action cannot be undone"
                    sub="Messages, media, and files will be permanently deleted."
                    last
                />
            </GroupCard>

            <DualFooter
                onCancel={() => setShowClearChatModal(false)}
                confirmLabel="Clear Chat"
                confirmBg={DANGER}
                onConfirm={onClearChat}
                confirmIcon={<Trash2 className="w-4 h-4 sm:w-5 sm:h-5" />}
            />
        </CenteredModal>
    );
};


/* ══════════════════════════════════════════════════════════════════════════════
   MODAL 2: ERROR DETAIL
══════════════════════════════════════════════════════════════════════════════ */
export const ErrorDetailModal = ({
    showErrorDetail,
    setShowErrorDetail,
    retryMessage,
    formatTime,
}) => {
    if (!showErrorDetail) return null;
    return (
        <CenteredModal
            onDismiss={() => setShowErrorDetail(null)}
            maxWidth={420}
        >
            <SectionLabel>❌ Error</SectionLabel>

            <GroupCard>
                <Row
                    icon={<AlertTriangle className="w-5 h-5 sm:w-6 sm:h-6" style={{ color: DANGER }} />}
                    label="Failed to deliver"
                    sub={formatTime?.(showErrorDetail.timestamp) || 'Unknown time'}
                    last
                />
            </GroupCard>

            <div className="mx-4 sm:mx-6 mt-4 p-4 sm:p-5 rounded-2xl" style={{ background: '#fde8e8' }}>
                <p className="text-sm leading-relaxed" style={{ color: DANGER }}>
                    {showErrorDetail.error || 'An unexpected error occurred'}
                </p>
            </div>

            <DualFooter
                cancelLabel="Dismiss"
                onCancel={() => setShowErrorDetail(null)}
                confirmLabel="Retry"
                confirmBg={TEAL}
                onConfirm={() => {
                    setShowErrorDetail(null);
                    retryMessage?.(showErrorDetail);
                }}
            />
        </CenteredModal>
    );
};


/* ══════════════════════════════════════════════════════════════════════════════
   MODAL 3: FILE SEND PREVIEW
══════════════════════════════════════════════════════════════════════════════ */
export const FileSendPreview = ({
    showFilePreview,
    selectedFile,
    filePreview,
    uploadingFile,
    cancelFileUpload,
    sendFileMessage,
}) => {
    if (!showFilePreview) return null;

    return (
        <CenteredModal
            onDismiss={!uploadingFile ? cancelFileUpload : undefined}
            maxWidth={420}
        >
            {/* Upload Overlay */}
            {uploadingFile && (
                <div
                    className="absolute inset-0 rounded-2xl z-[110] flex flex-col items-center justify-center"
                    style={{ background: 'rgba(255,255,255,0.98)' }}
                >
                    <div className="relative w-16 h-16 sm:w-20 sm:h-20 mb-4 sm:mb-6">
                        <div
                            className="absolute inset-0 rounded-full animate-spin"
                            style={{ border: `3px solid #ccfbf1`, borderTopColor: TEAL }}
                        />
                        <div
                            className="absolute inset-0 m-auto w-8 h-8 sm:w-11 sm:h-11 rounded-full flex items-center justify-center"
                            style={{ background: TEAL }}
                        >
                            <Send className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                        </div>
                    </div>
                    <p className="text-base sm:text-lg font-semibold mb-1" style={{ color: TEXT1 }}>
                        Uploading…
                    </p>
                    <p className="text-xs sm:text-sm text-center px-4" style={{ color: TEXT2 }}>
                        Please don't close this screen
                    </p>
                </div>
            )}

            <SectionLabel>📎 Send File</SectionLabel>

            <GroupCard>
                {selectedFile?.type?.startsWith('image/') && filePreview ? (
                    <div
                        className="flex items-center justify-center"
                        style={{ height: '160px', background: '#111' }}
                    >
                        <img
                            src={filePreview}
                            alt="Preview"
                            className="max-w-full max-h-full object-contain rounded-lg"
                        />
                    </div>
                ) : (
                    <Row
                        icon={<File className="w-5 h-5 sm:w-6 sm:h-6" style={{ color: TEAL }} />}
                        label={selectedFile?.name || 'File'}
                        sub={`${((selectedFile?.size || 0) / 1024 / 1024).toFixed(2)} MB`}
                        last
                    />
                )}
            </GroupCard>

            <DualFooter
                onCancel={cancelFileUpload}
                confirmLabel={uploadingFile ? 'Uploading…' : 'Send'}
                confirmBg={TEAL}
                onConfirm={sendFileMessage}
                disabled={uploadingFile}
                confirmIcon={uploadingFile ? <Spin /> : <Send className="w-4 h-4 sm:w-5 sm:h-5" />}
            />
        </CenteredModal>
    );
};


/* ══════════════════════════════════════════════════════════════════════════════
   MODAL 4: IMAGE PREVIEW (Ultra Responsive)
══════════════════════════════════════════════════════════════════════════════ */
export const ImagePreviewModal = ({
    showImagePreview,
    selectedImages,
    imageCaption,
    setImageCaption,
    uploadingFile,
    cancelImageUpload,
    sendImageMessage,
    removeImage,
    formatFileSize,
}) => {
    const [activeIdx, setActiveIdx] = useState(0);

    useEffect(() => {
        if (selectedImages.length > 0 && activeIdx >= selectedImages.length)
            setActiveIdx(selectedImages.length - 1);
    }, [selectedImages, activeIdx]);

    if (!showImagePreview || selectedImages.length === 0) return null;

    const count = selectedImages.length;
    const active = selectedImages[activeIdx];
    const nav = (dir) => setActiveIdx((p) => (p + dir + count) % count);

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: 'rgba(0,0,0,0.92)' }}
            onClick={(e) => {
                if (e.target === e.currentTarget) cancelImageUpload();
            }}
        >
            {/* Upload Overlay */}
            {uploadingFile && (
                <div
                    className="absolute inset-0 z-[110] flex flex-col items-center justify-center"
                    style={{ background: 'rgba(0,0,0,0.92)' }}
                >
                    <div className="relative w-16 h-16 sm:w-20 sm:h-20 mb-4 sm:mb-6">
                        <div
                            className="absolute inset-0 rounded-full animate-spin"
                            style={{
                                border: '3px solid rgba(13,148,136,0.25)',
                                borderTopColor: '#0d9488',
                            }}
                        />
                        <div
                            className="absolute inset-0 m-auto w-8 h-8 sm:w-11 sm:h-11 rounded-full flex items-center justify-center"
                            style={{ background: '#0d9488' }}
                        >
                            <ImageIcon className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                        </div>
                    </div>
                    <p className="text-white text-base sm:text-lg font-semibold mb-1">
                        Uploading {count > 1 ? `${count} photos` : 'photo'}…
                    </p>
                    <p className="text-xs sm:text-sm text-center px-4" style={{ color: 'rgba(255,255,255,0.6)' }}>
                        Please don't close this screen
                    </p>
                </div>
            )}

            {/* Modal Container */}
            <div
                className="relative w-full flex flex-col lg:flex-row rounded-2xl overflow-hidden shadow-2xl"
                style={{
                    maxWidth: '900px',
                    height: 'clamp(320px, 85vh, 580px)',
                    background: '#0f766e',
                }}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Top Bar */}
                <div
                    className="flex items-center justify-between px-4 sm:px-5 py-3 flex-shrink-0 border-b border-white/10"
                    style={{ background: '#115e59' }}
                >
                    <button
                        onClick={cancelImageUpload}
                        className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold px-2 sm:px-3 py-1.5 rounded-lg hover:bg-white/10 transition-colors text-white"
                    >
                        <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                        <span className="hidden sm:inline">Back</span>
                    </button>

                    <span className="text-white text-xs sm:text-sm font-semibold opacity-70">
                        {count > 1 ? `${activeIdx + 1} / ${count}` : 'Preview'}
                    </span>
                </div>

                {/* Main Content Area */}
                <div className="flex-1 flex flex-col lg:flex-row min-h-0 overflow-hidden gap-0">
                    {/* Image Viewer */}
                    <div className="flex-1 flex items-center justify-center relative bg-black p-3 sm:p-4 min-h-0 lg:min-h-auto">
                        <img
                            src={active.preview}
                            alt={active.name}
                            className="max-w-full max-h-full object-contain rounded-lg"
                        />

                        {/* Remove Button */}
                        <button
                            onClick={() => removeImage(activeIdx)}
                            className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-colors hover:bg-white/20"
                            style={{ background: 'rgba(0,0,0,0.55)' }}
                        >
                            <X className="w-4 h-4 text-white" />
                        </button>

                        {/* Nav Arrows */}
                        {count > 1 && (
                            <>
                                <button
                                    onClick={() => nav(-1)}
                                    className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center transition-colors hover:bg-white/20"
                                    style={{ background: 'rgba(0,0,0,0.45)' }}
                                >
                                    <ChevronLeft className="w-5 h-5 text-white" />
                                </button>
                                <button
                                    onClick={() => nav(1)}
                                    className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center transition-colors hover:bg-white/20"
                                    style={{ background: 'rgba(0,0,0,0.45)' }}
                                >
                                    <ChevronRight className="w-5 h-5 text-white" />
                                </button>
                            </>
                        )}
                    </div>

                    {/* Right Panel */}
                    <div
                        className="w-full lg:w-52 flex-shrink-0 flex flex-col gap-3 p-3 sm:p-4 border-t lg:border-t-0 lg:border-l border-white/10"
                        style={{ background: '#0f766e' }}
                    >
                        {/* Thumbnails */}
                        {count > 1 && (
                            <div className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-y-auto flex-shrink-0 lg:max-h-[180px] pb-2 lg:pb-0">
                                {selectedImages.map((img, i) => (
                                    <div
                                        key={i}
                                        onClick={() => setActiveIdx(i)}
                                        className="relative flex-shrink-0 w-12 h-12 lg:h-auto lg:aspect-square rounded-lg overflow-hidden cursor-pointer transition-opacity"
                                        style={{
                                            outline: i === activeIdx ? '2px solid #0d9488' : 'none',
                                            opacity: i === activeIdx ? 1 : 0.6,
                                        }}
                                    >
                                        <img
                                            src={img.preview}
                                            alt={img.name}
                                            className="w-full h-full object-cover"
                                        />
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                removeImage(i);
                                            }}
                                            className="absolute top-0.5 right-0.5 w-4 h-4 rounded-full flex items-center justify-center"
                                            style={{ background: 'rgba(0,0,0,0.6)' }}
                                        >
                                            <X className="w-2.5 h-2.5 text-white" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}

                        <div className="flex-1" />

                        <p className="text-white/60 text-xs font-medium uppercase hidden lg:block">
                            Caption
                        </p>

                        <input
                            type="text"
                            value={imageCaption}
                            onChange={(e) => setImageCaption(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    e.preventDefault();
                                    sendImageMessage();
                                }
                            }}
                            placeholder="Add a caption…"
                            maxLength={1000}
                            className="w-full text-white rounded-lg px-3 py-2 text-xs sm:text-sm outline-none"
                            style={{
                                background: 'rgba(255,255,255,0.12)',
                                border: '1px solid rgba(255,255,255,0.2)',
                                caretColor: '#5eead4',
                            }}
                            onFocus={(e) => (e.target.style.borderColor = '#5eead4')}
                            onBlur={(e) => (e.target.style.borderColor = 'rgba(255,255,255,0.2)')}
                        />

                        <button
                            onClick={sendImageMessage}
                            disabled={uploadingFile}
                            className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl transition-all text-white font-medium text-sm disabled:opacity-40"
                            style={{ background: '#0d9488' }}
                            onMouseEnter={(e) => {
                                if (!uploadingFile) e.currentTarget.style.background = '#14b8a6';
                            }}
                            onMouseLeave={(e) => (e.currentTarget.style.background = '#0d9488')}
                        >
                            {uploadingFile ? <Spin /> : <><Send className="w-4 h-4" /><span className="hidden sm:inline">Send</span></>}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};


/* ══════════════════════════════════════════════════════════════════════════════
   MODAL 5: DOCUMENT PREVIEW
══════════════════════════════════════════════════════════════════════════════ */
export const DocumentPreviewModal = ({
    showDocumentPreview,
    selectedDocument,
    uploadingFile,
    cancelDocumentUpload,
    sendDocumentMessage,
    formatFileSize,
}) => {
    if (!showDocumentPreview || !selectedDocument) return null;

    return (
        <CenteredModal
            onDismiss={!uploadingFile ? cancelDocumentUpload : undefined}
            maxWidth={420}
        >
            {/* Upload Overlay */}
            {uploadingFile && (
                <div
                    className="absolute inset-0 rounded-2xl z-[110] flex flex-col items-center justify-center"
                    style={{ background: 'rgba(255,255,255,0.98)' }}
                >
                    <div className="relative w-16 h-16 sm:w-20 sm:h-20 mb-4 sm:mb-6">
                        <div
                            className="absolute inset-0 rounded-full animate-spin"
                            style={{ border: `3px solid #ccfbf1`, borderTopColor: TEAL }}
                        />
                        <div
                            className="absolute inset-0 m-auto w-8 h-8 sm:w-11 sm:h-11 rounded-full flex items-center justify-center"
                            style={{ background: TEAL }}
                        >
                            <File className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                        </div>
                    </div>
                    <p className="text-base sm:text-lg font-semibold mb-1" style={{ color: TEXT1 }}>
                        Uploading…
                    </p>
                    <p className="text-xs sm:text-sm text-center px-4" style={{ color: TEXT2 }}>
                        Please don't close
                    </p>
                </div>
            )}

            <SectionLabel>📄 Send Document</SectionLabel>

            <GroupCard>
                <Row
                    icon={<span className="text-2xl">{selectedDocument.icon || '📄'}</span>}
                    label={selectedDocument.name}
                    sub={`${formatFileSize?.(selectedDocument.size) || '0 KB'} · ${selectedDocument.type || 'Document'}`}
                    last
                />
            </GroupCard>

            <DualFooter
                onCancel={cancelDocumentUpload}
                confirmLabel={uploadingFile ? 'Sending…' : 'Send'}
                confirmBg={TEAL}
                onConfirm={sendDocumentMessage}
                disabled={uploadingFile}
                confirmIcon={uploadingFile ? <Spin /> : <Send className="w-4 h-4 sm:w-5 sm:h-5" />}
            />
        </CenteredModal>
    );
};


/* ══════════════════════════════════════════════════════════════════════════════
   MODAL 6: REPORT
══════════════════════════════════════════════════════════════════════════════ */
const REPORT_REASONS = [
    { value: 'spam', label: 'Spam', emoji: '🚫' },
    { value: 'harassment', label: 'Harassment', emoji: '⚠️' },
    { value: 'violence', label: 'Violence', emoji: '🔴' },
    { value: 'inappropriate', label: 'Inappropriate', emoji: '❌' },
    { value: 'other', label: 'Other', emoji: '❓' },
];

export const ReportModal = ({
    showReportModal,
    reportingMessage,
    reportReason,
    reportDescription,
    setReportReason,
    setReportDescription,
    setShowReportModal,
    setReportingMessage,
    groupKey,
    submitReport,
}) => {
    if (!showReportModal || !reportingMessage) return null;

    const close = () => {
        setShowReportModal(false);
        setReportingMessage(null);
        setReportReason('');
        setReportDescription('');
    };

    return (
        <CenteredModal onDismiss={close} maxWidth={460}>
            <SectionLabel>🚨 Report Message</SectionLabel>

            <div className="px-4 sm:px-6 pb-4">
                <p className="text-xs sm:text-sm font-semibold mb-2" style={{ color: TEXT2 }}>
                    Message Content
                </p>

                <div
                    className="rounded-2xl px-4 py-3 border"
                    style={{ background: 'rgba(255,255,255,0.04)', borderColor: SEP }}
                >
                    <p className="text-xs font-semibold mb-1" style={{ color: TEXT2 }}>
                        {reportingMessage.publisherName || reportingMessage.senderName}
                    </p>
                    <p className="text-sm leading-6 line-clamp-3" style={{ color: TEXT1 }}>
                        {reportingMessage.msgBody?.message || 'Message content'}
                    </p>
                </div>
            </div>

            <div className="px-4 sm:px-6 pb-4">
                <p className="text-xs sm:text-sm font-semibold mb-3" style={{ color: TEXT2 }}>
                    Select Reason <span style={{ color: DANGER }}>*</span>
                </p>

                <div className="flex flex-wrap gap-2">
                    {REPORT_REASONS.map((r) => {
                        const active = reportReason === r.value;
                        return (
                            <button
                                key={r.value}
                                onClick={() => setReportReason(r.value)}
                                className="px-3 py-2 rounded-xl text-xs sm:text-sm font-medium border transition-all"
                                style={{
                                    background: active ? `${TEAL}20` : 'rgba(255,255,255,0.03)',
                                    borderColor: active ? TEAL : SEP,
                                    color: active ? TEAL : TEXT1,
                                }}
                            >
                                {r.emoji} {r.label}
                            </button>
                        );
                    })}
                </div>
            </div>

            <div className="px-4 sm:px-6 pb-4">
                <p className="text-xs sm:text-sm font-semibold mb-2" style={{ color: TEXT2 }}>
                    Details
                </p>

                <div className="rounded-2xl border p-3 sm:p-4" style={{ background: 'rgba(255,255,255,0.04)', borderColor: SEP }}>
                    <textarea
                        value={reportDescription}
                        onChange={(e) => setReportDescription(e.target.value)}
                        placeholder="Additional details..."
                        rows={4}
                        maxLength={500}
                        className="w-full bg-transparent resize-none outline-none text-xs sm:text-sm leading-6"
                        style={{ color: TEXT1, caretColor: TEAL }}
                    />
                    <div className="text-xs text-right mt-2" style={{ color: TEXT2 }}>
                        {reportDescription.length}/500
                    </div>
                </div>
            </div>

            <DualFooter
                cancelLabel="Cancel"
                onCancel={close}
                confirmLabel="Submit"
                confirmBg={DANGER}
                onConfirm={submitReport}
                disabled={!reportReason}
            />
        </CenteredModal>
    );
};


/* ══════════════════════════════════════════════════════════════════════════════
   MODAL 7: READ RECEIPTS
══════════════════════════════════════════════════════════════════════════════ */
export const ReadReceiptsModal = ({
    showReadReceipts,
    setShowReadReceipts,
    selectedMessageForReceipts,
    members,
    formatTime,
}) => {
    if (!showReadReceipts || !selectedMessageForReceipts) return null;
    const readers = selectedMessageForReceipts.metaData?.readBy ?? [];

    return (
        <CenteredModal
            onDismiss={() => setShowReadReceipts(false)}
            maxWidth={420}
        >
            <SectionLabel>
                👁️ Read by · {readers.length} {readers.length === 1 ? 'person' : 'people'}
            </SectionLabel>

            <GroupCard>
                {readers.length > 0 ? (
                    <div>
                        {readers.map((readInfo, i) => {
                            const member = members?.find((m) => m.id === readInfo.userId);
                            const initial = member?.name?.charAt(0).toUpperCase() || '?';
                            return (
                                <Row
                                    key={readInfo.userId}
                                    icon={
                                        <div
                                            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-white text-xs sm:text-sm font-bold"
                                            style={{ background: TEAL }}
                                        >
                                            {initial}
                                        </div>
                                    }
                                    label={member?.name || 'Unknown'}
                                    sub={
                                        readInfo.readAt
                                            ? formatTime?.(readInfo.readAt) || 'Sometime'
                                            : 'Just now'
                                    }
                                    right={<CheckCheck className="w-4 h-4 sm:w-5 sm:h-5" style={{ color: TEAL }} />}
                                    last={i === readers.length - 1}
                                />
                            );
                        })}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-12 px-4">
                        <Eye className="w-10 h-10 mb-3" style={{ color: '#d1d5db' }} />
                        <p className="text-sm font-semibold" style={{ color: TEXT1 }}>
                            No reads yet
                        </p>
                        <p className="text-xs mt-1 text-center" style={{ color: TEXT2 }}>
                            Receipts will appear here
                        </p>
                    </div>
                )}
            </GroupCard>

            <DualFooter
                cancelLabel="Close"
                onCancel={() => setShowReadReceipts(false)}
                confirmLabel=""
                confirmBg="transparent"
                onConfirm={() => setShowReadReceipts(false)}
            />
        </CenteredModal>
    );
};


/* ══════════════════════════════════════════════════════════════════════════════
   FILE TYPE POPUP
══════════════════════════════════════════════════════════════════════════════ */
// export const FileTypePopup = ({
//     showFileTypeModal,
//     setShowFileTypeModal,
//     fileInputRef,
//     onOpenCamera,
//     onOpenPoll,
//     anchorRef,
// }) => {
//     if (!showFileTypeModal) return null;

//     const items = [
//         {
//             label: 'Images',
//             icon: '🖼️',
//             color: '#8B5CF6',
//             bg: '#F5F3FF',
//             onClick: () => {
//                 if (fileInputRef?.current) {
//                     fileInputRef.current.accept = 'image/png,image/jpeg,image/jpg,image/gif,image/webp';
//                     fileInputRef.current.click();
//                 }
//                 setShowFileTypeModal(false);
//             },
//         },
//         {
//             label: 'Document',
//             icon: '📄',
//             color: '#0EA5E9',
//             bg: '#F0F9FF',
//             onClick: () => {
//                 if (fileInputRef?.current) {
//                     fileInputRef.current.accept = '.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt';
//                     fileInputRef.current.click();
//                 }
//                 setShowFileTypeModal(false);
//             },
//         },
//         {
//             label: 'Camera',
//             icon: '📷',
//             color: '#10B981',
//             bg: '#F0FDF4',
//             onClick: () => {
//                 onOpenCamera?.();
//                 setShowFileTypeModal(false);
//             },
//         },
//     ];

//     return (
//         <>
//             <div
//                 className="fixed inset-0 z-40"
//                 onClick={() => setShowFileTypeModal(false)}
//             />

//             <div
//                 className="fixed z-50 bottom-20 left-4 right-4 sm:bottom-auto"
//                 style={{
//                     background: PAGE,
//                     borderRadius: 16,
//                     boxShadow: '0 10px 40px rgba(0,0,0,0.15)',
//                     border: `1px solid ${SEP}`,
//                     padding: '12px 0',
//                     animation: 'modalSlideUp 0.3s ease-out',
//                 }}
//                 onClick={(e) => e.stopPropagation()}
//             >
//                 {items.map((item) => (
//                     <button
//                         key={item.label}
//                         onClick={item.onClick}
//                         className="flex items-center gap-3 w-full px-4 py-3 sm:py-4 transition-colors hover:bg-gray-100"
//                     >
//                         <div
//                             className="w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center text-xl sm:text-2xl flex-shrink-0"
//                             style={{ background: item.bg }}
//                         >
//                             {item.icon}
//                         </div>
//                         <span className="text-sm sm:text-base font-semibold" style={{ color: TEXT1 }}>
//                             {item.label}
//                         </span>
//                     </button>
//                 ))}
//             </div>

//             <style>{`
//                 @keyframes modalSlideUp {
//                     from { opacity: 0; transform: translateY(20px); }
//                     to { opacity: 1; transform: translateY(0); }
//                 }
//             `}</style>
//         </>
//     );
// };





export const FileTypePopup = ({
    showFileTypeModal,
    setShowFileTypeModal,
    fileInputRef,
    onOpenCamera,
    onOpenPoll,        // ← NEW prop
    anchorRef,
}) => {
    if (!showFileTypeModal) return null;

    const items = [
        {
            label: "Images",
            icon: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#8B5CF6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" />
                    <polyline points="21 15 16 10 5 21" />
                </svg>
            ),
            color: "#8B5CF6",
            bg: "#F5F3FF",
            //   onClick: () => { fileInputRef?.current?.click(); setShowFileTypeModal(false); },
            onClick: () => {
                if (fileInputRef?.current) {
                    fileInputRef.current.accept = "image/png,image/jpeg,image/jpg,image/gif,image/webp,video/mp4,video/mov,video/avi,video/webm";
                    fileInputRef.current.click();
                }
                setShowFileTypeModal(false);
            },
        },
        {
            label: "Document",
            icon: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0EA5E9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" />
                </svg>
            ),
            color: "#0EA5E9",
            bg: "#F0F9FF",
            // onClick: () => { fileInputRef?.current?.click(); setShowFileTypeModal(false); },
            onClick: () => {
                if (fileInputRef?.current) {
                    fileInputRef.current.accept = ".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.zip,.rar";
                    fileInputRef.current.click();
                }
                setShowFileTypeModal(false);
            },
        },
        {
            label: "Camera",
            icon: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                    <circle cx="12" cy="13" r="4" />
                </svg>
            ),
            color: "#10B981",
            bg: "#F0FDF4",
            onClick: () => { onOpenCamera?.(); setShowFileTypeModal(false); },
        },
        // {
        //     label: "Poll",
        //     icon: (
        //         <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        //             <line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" />
        //             <line x1="6" y1="20" x2="6" y2="14" />
        //         </svg>
        //     ),
        //     color: "#F59E0B",
        //     bg: "#FFFBEB",
        //     onClick: () => { onOpenPoll?.(); setShowFileTypeModal(false); },
        // },
    ];

    return (
        <div
            className="absolute z-50 bottom-12 left-0"
            style={{
                background: "#ffffff",
                borderRadius: 16,
                boxShadow: "0 8px 32px rgba(0,0,0,0.15)",
                border: "1px solid #f0f0f0",
                padding: "8px 0",
                minWidth: 200,
                animation: "popupFadeIn 0.18s cubic-bezier(0.34,1.56,0.64,1)",
            }}
            onClick={(e) => e.stopPropagation()}
        >
            {items.map((item) => (
                <button
                    key={item.label}
                    onClick={item.onClick}
                    style={{
                        display: "flex", alignItems: "center", gap: 12,
                        width: "100%", background: "none", border: "none",
                        cursor: "pointer", padding: "10px 16px",
                        transition: "background 0.12s",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = "#f8f8f8")}
                    onMouseLeave={(e) => (e.currentTarget.style.background = "none")}
                >
                    <div style={{
                        width: 36, height: 36, borderRadius: "50%",
                        background: item.bg, display: "flex",
                        alignItems: "center", justifyContent: "center", flexShrink: 0,
                    }}>
                        {item.icon}
                    </div>
                    <span style={{ fontSize: 14, fontWeight: 500, color: "#111b21" }}>
                        {item.label}
                    </span>
                </button>
            ))}
            <style>{`
        @keyframes popupFadeIn {
          from { opacity:0; transform:scale(0.9) translateY(8px) }
          to   { opacity:1; transform:scale(1)   translateY(0)   }
        }
      `}</style>
        </div>
    );
};
