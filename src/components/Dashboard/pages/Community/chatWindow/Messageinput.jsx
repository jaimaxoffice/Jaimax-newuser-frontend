

import React, { useState, useRef, useCallback, useEffect } from "react";
import EmojiPicker from "emoji-picker-react";
import { safeReplyText } from "./MessageText";
import { FileTypePopup } from "./Modals";
import { useUserDataQuery } from "../../dashBoard/DashboardApliSlice"
// import PollCreator from "./PollCreator";
import {
  Image, FileText, Music, Video, File, Sheet, Presentation,
  Archive, Send, Smile, X, AlertTriangle, Camera, SwitchCamera,
  FlashlightOff, Flashlight, RotateCcw, ZoomIn, ZoomOut, XCircle, Plus,
} from "lucide-react";

// ═══════════════════════════════════════════════════════════
//  Media Icon Helper (unchanged)
// ═══════════════════════════════════════════════════════════
const MediaIcon = ({ media }) => {
  const fileName = media?.fileName || "";
  const fileType = media?.file_type || "";
  if (fileType.startsWith("image/") || /\.(jpg|jpeg|png|gif|webp|bmp|svg)$/i.test(fileName))
    return <><Image className="w-3 h-3 inline mr-1" /> Photo</>;
  if (fileType.includes("pdf") || /\.pdf$/i.test(fileName))
    return <><FileText className="w-3 h-3 inline mr-1" /> PDF</>;
  if (fileType.includes("audio") || /\.(mp3|wav|ogg|m4a)$/i.test(fileName))
    return <><Music className="w-3 h-3 inline mr-1" /> Audio</>;
  if (fileType.includes("video") || /\.(mp4|mov|avi|webm)$/i.test(fileName))
    return <><Video className="w-3 h-3 inline mr-1" /> Video</>;
  if (fileType.includes("word") || /\.(doc|docx)$/i.test(fileName))
    return <><FileText className="w-3 h-3 inline mr-1" /> Document</>;
  if (fileType.includes("sheet") || /\.(xls|xlsx)$/i.test(fileName))
    return <><Sheet className="w-3 h-3 inline mr-1" /> Spreadsheet</>;
  if (fileType.includes("presentation") || /\.(ppt|pptx)$/i.test(fileName))
    return <><Presentation className="w-3 h-3 inline mr-1" /> Presentation</>;
  if (/\.(zip|rar)$/i.test(fileName))
    return <><Archive className="w-3 h-3 inline mr-1" /> Archive</>;
  return <><File className="w-3 h-3 inline mr-1" /> File</>;
};

// ═══════════════════════════════════════════════════════════
//  LiveCamera (unchanged from original)
// ═══════════════════════════════════════════════════════════
const LiveCamera = ({ onCapture, onClose, isMobile, isOpen }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);
  const [facingMode, setFacingMode] = useState("environment");
  const [flashEnabled, setFlashEnabled] = useState(false);
  const [flashSupported, setFlashSupported] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const [caption, setCaption] = useState("");
  const [cameraError, setCameraError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [maxZoom, setMaxZoom] = useState(1);
  const [hasMultipleCameras, setHasMultipleCameras] = useState(false);
  const [countdown, setCountdown] = useState(null);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    navigator.mediaDevices?.enumerateDevices().then((devices) => {
      setHasMultipleCameras(devices.filter((d) => d.kind === "videoinput").length > 1);
    }).catch(() => { });
  }, [isOpen]);

  const startCamera = useCallback(async () => {
    setIsLoading(true); setCameraError(null);
    if (streamRef.current) { streamRef.current.getTracks().forEach((t) => t.stop()); streamRef.current = null; }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode, width: { ideal: 1920 }, height: { ideal: 1080 } }, audio: false });
      streamRef.current = stream;
      if (videoRef.current) { videoRef.current.srcObject = stream; await videoRef.current.play(); }
      const track = stream.getVideoTracks()[0];
      if (track) {
        const caps = track.getCapabilities?.();
        setFlashSupported(!!caps?.torch);
        if (!caps?.torch) setFlashEnabled(false);
        if (caps?.zoom) { setMaxZoom(caps.zoom.max || 1); setZoomLevel(caps.zoom.min || 1); } else setMaxZoom(1);
      }
      setIsLoading(false);
    } catch (err) {
      if (err.name === "NotAllowedError" || err.name === "PermissionDeniedError") setCameraError("Camera permission denied.");
      else if (err.name === "NotFoundError") setCameraError("No camera found on this device.");
      else if (err.name === "NotReadableError") setCameraError("Camera is in use by another app.");
      else setCameraError("Unable to access camera.");
      setIsLoading(false);
    }
  }, [facingMode]);

  useEffect(() => {
    if (isOpen) { setSent(false); setCapturedImage(null); setCaption(""); startCamera(); }
    return () => { if (streamRef.current) { streamRef.current.getTracks().forEach((t) => t.stop()); streamRef.current = null; } };
  }, [isOpen, startCamera]);

  const toggleFlash = useCallback(async () => {
    if (!streamRef.current || !flashSupported) return;
    const track = streamRef.current.getVideoTracks()[0]; if (!track) return;
    try { await track.applyConstraints({ advanced: [{ torch: !flashEnabled }] }); setFlashEnabled((v) => !v); } catch { }
  }, [flashEnabled, flashSupported]);

  const switchCamera = useCallback(() => setFacingMode((p) => p === "environment" ? "user" : "environment"), []);

  const handleZoom = useCallback(async (direction) => {
    if (!streamRef.current || maxZoom <= 1) return;
    const track = streamRef.current.getVideoTracks()[0]; if (!track) return;
    const step = (maxZoom - 1) / 10;
    const newZoom = direction === "in" ? Math.min(zoomLevel + step, maxZoom) : Math.max(zoomLevel - step, 1);
    try { await track.applyConstraints({ advanced: [{ zoom: newZoom }] }); setZoomLevel(newZoom); } catch { }
  }, [zoomLevel, maxZoom]);

  const capturePhoto = useCallback(() => {
    if (!videoRef.current || !canvasRef.current) return;
    const video = videoRef.current, canvas = canvasRef.current;
    canvas.width = video.videoWidth; canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");
    if (facingMode === "user") { ctx.translate(canvas.width, 0); ctx.scale(-1, 1); }
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height); ctx.setTransform(1, 0, 0, 1, 0, 0);
    setCapturedImage(canvas.toDataURL("image/jpeg", 0.92));
    streamRef.current?.getTracks().forEach((t) => t.stop());
  }, [facingMode]);

  const startTimerCapture = useCallback((seconds) => {
    setCountdown(seconds);
    const interval = setInterval(() => {
      setCountdown((prev) => { if (prev <= 1) { clearInterval(interval); capturePhoto(); return null; } return prev - 1; });
    }, 1000);
  }, [capturePhoto]);

  const retakePhoto = useCallback(() => { setCapturedImage(null); setCaption(""); setSent(false); startCamera(); }, [startCamera]);

  const sendPhoto = useCallback(() => {
    if (!capturedImage) return;
    const byteString = atob(capturedImage.split(",")[1]);
    const mimeType = capturedImage.split(",")[0].split(":")[1].split(";")[0];
    const ab = new ArrayBuffer(byteString.length); const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) ia[i] = byteString.charCodeAt(i);
    const blob = new Blob([ab], { type: mimeType }); const fileName = `camera_${Date.now()}.jpg`;
    onCapture({ file: new window.File([blob], fileName, { type: mimeType }), preview: capturedImage, caption: caption.trim(), fileName, fileType: mimeType, fileSize: blob.size });
    setSent(true);
  }, [capturedImage, caption, onCapture]);

  useEffect(() => { if (isOpen) document.body.style.overflow = "hidden"; else document.body.style.overflow = ""; return () => { document.body.style.overflow = ""; }; }, [isOpen]);
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e) => { if (e.key === "Escape") { capturedImage ? retakePhoto() : onClose(); } if (e.key === " " && !capturedImage && !cameraError) { e.preventDefault(); capturePhoto(); } };
    window.addEventListener("keydown", handleKey); return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, capturedImage, cameraError, capturePhoto, retakePhoto, onClose]);

  if (!isOpen) return null;
  if (capturedImage) {
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6" style={{ background: "rgba(0,0,0,0.82)" }} onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
        <div className="relative flex flex-col rounded-2xl overflow-hidden shadow-2xl border border-white/10" style={{ width: "100%", maxWidth: "780px", height: "clamp(320px, 55vh, 480px)", background: "#0f766e" }} onClick={(e) => e.stopPropagation()}>
          <canvas ref={canvasRef} className="hidden" />
          <div className="flex items-center justify-between px-4 py-2.5 backdrop-blur-sm flex-shrink-0 border-b border-white/10" style={{ background: "#115e59" }}>
            <button onClick={retakePhoto} className="flex items-center gap-1.5 text-white text-xs sm:text-sm transition-colors px-2.5 py-1.5 rounded-lg hover:bg-white/10"><RotateCcw className="w-4 h-4" /><span>Retake</span></button>
            <span className="text-white text-xs sm:text-sm font-semibold tracking-wide uppercase opacity-70">Preview</span>
            <button onClick={onClose} className="p-1.5 text-gray-300 hover:text-white transition-colors rounded-lg hover:bg-white/10"><X className="w-4 h-4 sm:w-5 sm:h-5" /></button>
          </div>
          <div className="flex-1 flex flex-col sm:flex-row min-h-0 overflow-hidden">
            <div className="flex-1 flex items-center justify-center p-2 sm:p-3 overflow-hidden min-h-0" style={{ background: "#000" }}>
              {sent ? <div className="flex flex-col items-center gap-3 opacity-30"><Camera className="w-10 h-10 text-white" /></div> : <img src={capturedImage} alt="Captured" className="max-w-full max-h-full object-contain rounded-lg shadow-xl" />}
            </div>
            <div className="sm:w-56 flex-shrink-0 flex flex-col justify-end gap-3 p-3 border-t sm:border-t-0 sm:border-l border-white/10" style={{ background: "#0f766e" }}>
              <input type="text" value={sent ? "" : caption} onChange={(e) => setCaption(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); if (!sent) sendPhoto(); } }} placeholder="Add a caption…" disabled={sent} className="w-full text-white rounded-lg px-3 py-2 text-sm outline-none transition-colors placeholder-white/40 disabled:opacity-30" style={{ background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.2)" }} autoFocus={!sent} />
              <button onClick={sent ? retakePhoto : sendPhoto} className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl transition-colors active:scale-95 shadow-lg text-white font-medium text-sm" style={{ background: sent ? "#115e59" : "#0d9488" }}>
                {sent ? <><RotateCcw className="w-4 h-4" /> New Photo</> : <><Send className="w-4 h-4" /> Send Photo</>}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6" style={{ background: "rgba(0,0,0,0.82)" }} onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="relative flex rounded-2xl overflow-hidden shadow-2xl border border-white/10" style={{ width: "100%", maxWidth: "820px", height: "clamp(300px, 52vh, 460px)", flexDirection: "row", background: "#000" }} onClick={(e) => e.stopPropagation()}>
        <canvas ref={canvasRef} className="hidden" />
        <div className="relative flex-1 overflow-hidden bg-black min-w-0">
          {isLoading && !cameraError && (<div className="absolute inset-0 flex flex-col items-center justify-center z-20 bg-black/60"><div className="w-10 h-10 border-4 rounded-full animate-spin" style={{ borderColor: "#134e4a", borderTopColor: "#0d9488" }} /></div>)}
          {cameraError && (<div className="absolute inset-0 flex flex-col items-center justify-center z-20 px-5 bg-black/85"><XCircle className="w-7 h-7 text-red-400 mb-3" /><p className="text-white text-sm mb-1 font-semibold text-center">Camera Error</p><p className="text-gray-400 text-xs text-center mb-4">{cameraError}</p><button onClick={startCamera} className="px-4 py-2 text-white text-xs font-medium rounded-lg" style={{ background: "#0d9488" }}>Retry</button></div>)}
          <video ref={videoRef} autoPlay playsInline muted className={`w-full h-full object-cover ${facingMode === "user" ? "scale-x-[-1]" : ""}`} />
          {countdown !== null && (<div className="absolute inset-0 flex items-center justify-center z-30 bg-black/50"><span className="text-white text-7xl font-bold">{countdown}</span></div>)}
          <button onClick={onClose} className="absolute top-2.5 left-2.5 z-10 p-1.5 text-white hover:text-gray-300 rounded-full hover:bg-white/10"><X className="w-5 h-5" /></button>
        </div>
        <div className="flex flex-col items-center justify-between py-4 px-2.5 border-l border-white/10" style={{ width: "72px", flexShrink: 0, background: "#115e59" }}>
          <div className="flex flex-col items-center gap-2">
            {flashSupported && (<button onClick={toggleFlash} className="p-2 rounded-full transition-all" style={flashEnabled ? { background: "rgba(13,148,136,0.3)", color: "#0d9488" } : { color: "rgba(255,255,255,0.5)" }}>{flashEnabled ? <Flashlight className="w-4 h-4" /> : <FlashlightOff className="w-4 h-4" />}</button>)}
            <button onClick={() => startTimerCapture(3)} className="p-1.5 rounded-full text-[10px] font-bold" style={{ color: "rgba(255,255,255,0.5)" }}>3s</button>
            {maxZoom > 1 && (<button onClick={() => handleZoom("in")} disabled={zoomLevel >= maxZoom} className="p-2 rounded-full disabled:opacity-30" style={{ color: "rgba(255,255,255,0.5)" }}><ZoomIn className="w-4 h-4" /></button>)}
            {maxZoom > 1 && (<button onClick={() => handleZoom("out")} disabled={zoomLevel <= 1} className="p-2 rounded-full disabled:opacity-30" style={{ color: "rgba(255,255,255,0.5)" }}><ZoomOut className="w-4 h-4" /></button>)}
          </div>
          <button onClick={capturePhoto} disabled={isLoading || !!cameraError} className="relative w-14 h-14 rounded-full flex items-center justify-center transition-all disabled:opacity-40 active:scale-90 shadow-xl flex-shrink-0" style={{ border: "3px solid #0d9488" }}>
            <div className="w-10 h-10 rounded-full" style={{ background: "#0d9488" }} />
          </button>
          <div className="flex flex-col items-center gap-2">
            {hasMultipleCameras && (<button onClick={switchCamera} className="p-2 rounded-full" style={{ color: "rgba(255,255,255,0.5)" }}><SwitchCamera className="w-4 h-4" /></button>)}
          </div>
        </div>
      </div>
    </div>
  );
};


// ═══════════════════════════════════════════════════════════
//  MESSAGE INPUT — with Poll support
// ═══════════════════════════════════════════════════════════
const MessageInput = ({
  message, setMessage, onSendMessage, isInputDisabled, setIsInputDisabled,
  countdown, replyToMessage, cancelReply, groupKey, handleTyping,
  showEmojiPicker, setShowEmojiPicker, showFileTypeModal, setShowFileTypeModal,
  inputRef, emojiPickerRef, emojiButtonRef, emojiClickInsideRef,
  rateLimitError, isMobile = false, onCameraCapture, onCameraImageReady,
  fileInputRef,

  onCreatePoll,   // ← NEW: called with poll data to send it
}) => {
  const [showCamera, setShowCamera] = useState(false);
  const [capturedPhoto, setCapturedPhoto] = useState(null);
  // const [showPollCreator, setShowPollCreator] = useState(false);
  const attachBtnRef = useRef(null);

  const handleEmojiClick = (emojiObject) => {
    setMessage((prev) => prev + emojiObject.emoji);
    setTimeout(() => inputRef.current?.focus(), 0);
  };
  const { data: userData, isLoading } = useUserDataQuery();
  const isAllowed = userData?.data?.isUserAllowedToCommunity;
  const finalDisabled = isInputDisabled || !isAllowed || isLoading;
  const isBlocked = !isLoading && !isAllowed;
  const handleCameraCapture = useCallback((captureData) => {
    setShowCamera(false);
    if (onCameraCapture) { onCameraCapture(captureData); return; }
    if (onCameraImageReady) { onCameraImageReady(captureData); return; }
    setCapturedPhoto(captureData);
  }, [onCameraCapture, onCameraImageReady]);

  const clearCapturedPhoto = useCallback(() => setCapturedPhoto(null), []);
  {
    !isLoading && !isAllowed && (
      <div className="mb-2 px-3 py-2 rounded-lg bg-yellow-50 border border-yellow-300 text-xs text-yellow-700 flex items-center gap-2">
        <AlertTriangle className="w-4 h-4 text-yellow-600" />
        You are not allowed to send messages in this community.
      </div>
    )
  }
  return (
    <>
      {/* Camera Modal */}
      <LiveCamera isOpen={showCamera} onCapture={handleCameraCapture} onClose={() => setShowCamera(false)} isMobile={isMobile} />

      {/* Poll Creator Modal */}
      {/* <PollCreator
        isOpen={showPollCreator}
        onClose={() => setShowPollCreator(false)}
        onSendPoll={(pollData) => {
          onCreatePoll?.(pollData);
          setShowPollCreator(false);
        }}
        isMobile={isMobile}
      /> */}

      {/* Captured Photo Preview fallback */}
      {capturedPhoto && !onCameraCapture && !onCameraImageReady && (
        <div className="fixed inset-0 z-[90] bg-black/80 flex items-center justify-center p-4">
          <div className="rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl" style={{ background: "#ffffff", border: "1px solid #99f6e4" }}>
            <div className="flex items-center justify-between px-4 py-3" style={{ borderBottom: "1px solid #e5e7eb" }}>
              <h3 className="font-medium text-sm" style={{ color: "#134e4a" }}>Photo Ready</h3>
              <button onClick={clearCapturedPhoto} className="p-1.5 rounded-full" style={{ color: "#6b7280" }}><X className="w-4 h-4" /></button>
            </div>
            <div className="p-4">
              <img src={capturedPhoto.preview} alt="Captured" className="w-full rounded-lg" />
              {capturedPhoto.caption && <p className="text-sm mt-2" style={{ color: "#134e4a" }}>{capturedPhoto.caption}</p>}
              <p className="text-xs mt-2" style={{ color: "#6b7280" }}>{(capturedPhoto.fileSize / 1024).toFixed(1)} KB · {capturedPhoto.fileName}</p>
            </div>
            <div className="flex gap-3 px-4 pb-4">
              <button onClick={clearCapturedPhoto} className="flex-1 py-2.5 rounded-lg text-sm font-medium" style={{ background: "#f0fdfa", color: "#134e4a", border: "1px solid #99f6e4" }}>Discard</button>
              <button onClick={() => {  clearCapturedPhoto(); }} className="flex-1 py-2.5 text-white rounded-lg text-sm font-medium" style={{ background: "#0d9488" }}>Send</button>
            </div>
          </div>
        </div>
      )}

      {/* ── MAIN INPUT BAR ── */}
      <div className="z-20 flex-shrink-0" style={{ background: "#ffffff", borderTop: "1px solid #e5e7eb" }}>
        {/* Reply preview */}
        {replyToMessage && (
          <div className="flex items-center gap-2 px-2 sm:px-3 pt-2 pb-0">
            <div className="flex-1 min-w-0 flex items-stretch rounded-lg overflow-hidden" style={{ background: "#f0fdfa" }}>
              <div className="w-1 flex-shrink-0" style={{ background: "#0d9488" }} />
              <div className="flex-1 min-w-0 px-2 py-1.5">
                <p className="text-[11px] sm:text-xs font-semibold truncate leading-tight" style={{ color: "#0d9488" }}>{replyToMessage.fromUserId || "User"}</p>
                <p className="text-[11px] sm:text-xs truncate leading-tight mt-0.5 flex items-center" style={{ color: "#6b7280" }}>
                  {replyToMessage.msgBody?.media?.file_url ? <MediaIcon media={replyToMessage.msgBody.media} /> : typeof replyToMessage.msgBody?.message === "string" ? replyToMessage.msgBody.message.slice(0, 100) : safeReplyText(replyToMessage.msgBody?.message, groupKey)}
                </p>
              </div>
              {replyToMessage.msgBody?.media?.file_url && replyToMessage.msgBody?.media?.file_type?.startsWith("image/") && (
                <img src={replyToMessage.msgBody.media.file_url} alt="" className="w-10 h-10 object-cover flex-shrink-0" />
              )}
            </div>
            <button onClick={cancelReply} className="flex-shrink-0 p-1.5 rounded-full transition-colors" style={{ color: "#6b7280" }} aria-label="Cancel reply"><X className="w-4 h-4" /></button>
          </div>
        )}

        {/* Input row wrapper */}
        <div className="p-1.5 sm:p-2 md:p-3">
          {/* Rate limit warning */}
          {isInputDisabled && (
            <div className="mb-2 rounded-xl px-3 sm:px-4 py-2 sm:py-2.5 flex items-center gap-2 sm:gap-3 border border-red-500/30 bg-red-50">
              <div className="flex-shrink-0 w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-red-100 border border-red-200 flex items-center justify-center"><AlertTriangle className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-red-500" /></div>
              <div className="flex-1 min-w-0">
                <p className="text-[11px] sm:text-xs font-medium text-red-600 tracking-wide truncate">{rateLimitError || "Message rate limit exceeded"}</p>
                <p className="text-[9px] sm:text-[10px] text-red-400 mt-0.5">Please wait before sending more messages</p>
              </div>
              {/* <div className="flex-shrink-0 flex items-center gap-1.5 bg-red-100 border border-red-200 rounded-lg px-2 sm:px-3 py-1 sm:py-1.5">
                <span className="text-xs sm:text-sm font-bold font-mono tracking-widest text-red-500">0:{countdown?.toString().padStart(2, "0") || "00"}</span>
              </div> */}
            </div>
          )}

          {/* Main input row */}
          <div className="flex items-center gap-0.5 sm:gap-1 relative" style={{ minWidth: 0 }}>
            {/* Emoji button */}
            {/* <button ref={emojiButtonRef} onPointerDown={(e) => { e.stopPropagation(); setShowEmojiPicker((p) => !p); }} disabled={isInputDisabled}
              className={`p-1.5 sm:p-2 transition-colors flex-shrink-0 rounded-full ${isInputDisabled ? "cursor-not-allowed opacity-50" : "hover:bg-[#f0fdfa] active:bg-[#ccfbf1]"}`}
              style={{ color: isInputDisabled ? "#d1d5db" : "#6b7280" }}>
              <Smile className="w-5 h-5" />
            </button> */}

            <button
              ref={emojiButtonRef}
              onPointerDown={(e) => {
                e.stopPropagation();
                if (finalDisabled) return;
                setShowEmojiPicker((p) => !p);
              }}
              disabled={finalDisabled}
              className={`p-1.5 sm:p-2 transition-colors flex-shrink-0 rounded-full ${finalDisabled
                  ? "cursor-not-allowed opacity-50"
                  : "hover:bg-[#f0fdfa] active:bg-[#ccfbf1]"
                }`}
              style={{
                color: finalDisabled ? "#d1d5db" : "#6b7280",
              }}
            >
              <Smile className="w-5 h-5" />
            </button>
            {/* Emoji picker */}
            {/* {showEmojiPicker && !isInputDisabled && (
              <div ref={emojiPickerRef} className={`absolute z-50 ${isMobile ? "bottom-14 left-0 right-0 mx-2" : "bottom-14 left-0"}`}
                onPointerDown={() => { if (emojiClickInsideRef) emojiClickInsideRef.current = true; }}>
                <EmojiPicker onEmojiClick={handleEmojiClick} theme="light" width={isMobile ? "100%" : 350} height={isMobile ? 320 : 400} searchPlaceHolder="Search emoji..." skinTonesDisabled={isMobile} previewConfig={{ showPreview: !isMobile }} />
              </div>
            )} */}

            {showEmojiPicker && !finalDisabled && (
              <div
                ref={emojiPickerRef}
                className={`absolute z-50 ${isMobile ? "bottom-14 left-0 right-0 mx-2" : "bottom-14 left-0"
                  }`}
              >
                <EmojiPicker
                  onEmojiClick={handleEmojiClick}
                  theme="light"
                  width={isMobile ? "100%" : 350}
                  height={isMobile ? 320 : 400}
                  searchPlaceHolder="Search emoji..."
                  skinTonesDisabled={isMobile}
                  previewConfig={{ showPreview: !isMobile }}
                />
              </div>
            )}

            {/* Plus / Attach button */}
            <div className="relative flex-shrink-0">
           <button
  ref={attachBtnRef}
  onClick={() => {
    if (finalDisabled) return;
    setShowFileTypeModal((p) => !p);
  }}
  disabled={finalDisabled}
  className={`p-1.5 sm:p-2 transition-all flex-shrink-0 rounded-full ${
    finalDisabled
      ? "cursor-not-allowed opacity-50"
      : "hover:bg-[#f0fdfa] active:bg-[#ccfbf1]"
  }`}
  style={{
    color: finalDisabled ? "#d1d5db" : "#6b7280",
    transform: showFileTypeModal ? "rotate(45deg)" : "rotate(0deg)",
    transition: "transform 0.2s ease, color 0.15s ease",
  }}
>
  <Plus className="w-5 h-5" />
</button>

              {/* WhatsApp-style popup — pass onOpenPoll */}
              <FileTypePopup
                showFileTypeModal={showFileTypeModal}
                setShowFileTypeModal={setShowFileTypeModal}
                fileInputRef={fileInputRef}
                onOpenCamera={() => setShowCamera(true)}
                // onOpenPoll={() => setShowPollCreator(true)}
                anchorRef={attachBtnRef}
              />
            </div>

            {/* Text input */}
            {/* <input ref={inputRef} type="text" value={message} 
              onChange={(e) => { setMessage(e.target.value); handleTyping?.(); }}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  if (isInputDisabled) {  return; }
                  if (message?.trim()) onSendMessage?.();
                }
              }}
              disabled={isInputDisabled} placeholder="Type a message"
              className={`flex-1 min-w-0 w-0 px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg text-sm transition-all ${isInputDisabled ? "opacity-50 cursor-not-allowed" : ""}`}
              style={{ background: "#f0fdfa", color: "#134e4a", border: "1px solid #99f6e4", outline: "none" }}
              onFocus={(e) => (e.target.style.boxShadow = "0 0 0 2px rgba(13,148,136,0.3)")}
              onBlur={(e) => (e.target.style.boxShadow = "none")}
            /> */}
            {isBlocked ? (
              <div className="flex-1 min-w-0 px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg text-sm flex items-center justify-center text-teal-600 bg-teal-50 border border-teal-200">
                {/* <AlertTriangle className="w-4 h-4 mr-2 text-red-500" /> */}
                You are not allowed to send messages
              </div>
            ) : (
              <input
                ref={inputRef}
                type="text"
                value={message}
                onChange={(e) => {
                  setMessage(e.target.value);
                  handleTyping?.();
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    if (message?.trim()) onSendMessage?.();
                  }
                }}
                disabled={finalDisabled}
                placeholder={
                  isLoading ? "Checking permission..." : "Type a message"
                }
                className={`flex-1 min-w-0 w-0 px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg text-sm transition-all ${finalDisabled ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                style={{
                  background: "#f0fdfa",
                  color: "#134e4a",
                  border: "1px solid #99f6e4",
                  outline: "none",
                }}
              />
            )}
            {/* {message?.trim() && (
              <button onPointerDown={(e) => { e.preventDefault(); if (!isInputDisabled && message?.trim()) onSendMessage?.(); }} disabled={isInputDisabled}
                className={`flex-shrink-0 p-2 sm:p-2.5 rounded-full transition-all active:scale-90 ${isInputDisabled ? "opacity-50 cursor-not-allowed" : "shadow-lg"}`}
                style={{ background: isInputDisabled ? "#d1d5db" : "#0d9488" }}
                onMouseEnter={(e) => { if (!isInputDisabled) e.currentTarget.style.background = "#14b8a6"; }}
                onMouseLeave={(e) => { if (!isInputDisabled) e.currentTarget.style.background = "#0d9488"; }}>
                <Send className="w-5 h-5 text-white" />
              </button>
            )} */}
            {message?.trim() && (
              <button
                onPointerDown={(e) => {
                  e.preventDefault();

                  if (finalDisabled) return;

                  if (message?.trim()) onSendMessage?.();
                }}
                disabled={finalDisabled}
                className={`flex-shrink-0 p-2 sm:p-2.5 rounded-full transition-all active:scale-90 ${finalDisabled ? "opacity-50 cursor-not-allowed" : "shadow-lg"
                  }`}
                style={{
                  background: finalDisabled ? "#d1d5db" : "#0d9488",
                }}
              >
                <Send className="w-5 h-5 text-white" />
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default MessageInput;







