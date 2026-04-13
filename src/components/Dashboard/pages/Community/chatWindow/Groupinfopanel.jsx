

import React, { useEffect, useMemo, useState, useRef } from "react";
import {
  ArrowLeft, X, File, Image as ImageIcon, Download, Link as LinkIcon,
  ChevronRight, Link, Pencil,
  ZoomIn, ZoomOut,
} from "lucide-react";
import { decryptMessage } from "../socket/encryptmsg";

/* ══════════════════════════════════════════════════════
   LOCAL DOWNLOAD UTILITY
   Fetches the file as a blob and saves it to the user's
   device (works on desktop & mobile browsers).
══════════════════════════════════════════════════════ */
const downloadFileLocally = async (url, fileName) => {
  try {
    const response = await fetch(url, { mode: "cors" });
    if (!response.ok) throw new Error("Fetch failed");
    const blob = await response.blob();
    const blobUrl = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = blobUrl;
    a.download = fileName || "download";
    a.style.display = "none";
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      URL.revokeObjectURL(blobUrl);
      document.body.removeChild(a);
    }, 200);
  } catch {
    /* CORS fallback — opens in new tab so user can long-press save (mobile)
       or use browser Save As (desktop) */
    const a = document.createElement("a");
    a.href = url;
    a.download = fileName || "download";
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
};

/* ══════════════════════════════════════════════════════
   LOAD MORE SPINNER
══════════════════════════════════════════════════════ */
const LoadMoreSpinner = ({ loadingFiles, filesPage, filesPagination, allFiles, setFilesPage }) => {
  const hasMore = filesPagination?.page < filesPagination?.totalPages;
  if (loadingFiles && filesPage > 1)
    return (
      <div className="py-6 flex justify-center">
        <div className="w-5 h-5 border-2 border-[#085056] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  if (hasMore)
    return (
      <div className="py-5 flex justify-center">
        <button
          onClick={() => setFilesPage((p) => p + 1)}
          className="px-5 py-2 text-[12px] font-medium text-[#085056] border border-[#085056]/35 rounded-full hover:bg-[#085056]/5 transition-colors"
        >
          Load more
        </button>
      </div>
    );
  if (allFiles.length > 0)
    return (
      <div className="py-4 flex justify-center">
        <p className="text-[11px] text-[#4a7a7e]">All loaded</p>
      </div>
    );
  return null;
};

/* ══════════════════════════════════════════════════════
   LINK CARD
══════════════════════════════════════════════════════ */
const LinkCard = ({ url, senderName, timestamp }) => (

  
  <a
    href={url}
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center gap-2.5 px-4 py-2.5 border-b border-[#085056]/8 hover:bg-[#f0f8f8] transition-colors group"
  >
    <div className="w-7 h-7 rounded-full bg-[#085056]/10 flex items-center justify-center shrink-0">
      <LinkIcon className="w-3.5 h-3.5 text-[#085056]" />
    </div>
    <div className="flex-1 min-w-0">
      <p className="text-[12.5px] text-[#085056] truncate group-hover:underline leading-snug">{url}</p>
      <div className="flex items-center gap-1.5 mt-0.5">
        {senderName && (
          <span className="text-[11px] text-[#4a7a7e] truncate max-w-[100px]">{senderName}</span>
        )}
        {senderName && timestamp && <span className="text-[10px] text-[#4a7a7e]/50">·</span>}
        {timestamp && (
          <span className="text-[11px] text-[#4a7a7e]/70">
            {new Date(timestamp).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
          </span>
        )}
      </div>
    </div>
  </a>
  
);

/* ══════════════════════════════════════════════════════
   EMPTY STATE
══════════════════════════════════════════════════════ */
const EmptyState = ({ icon, label }) => (
  <div className="flex flex-col items-center justify-center h-52 text-[#4a7a7e]">
    <div className="opacity-[0.18] mb-3">{icon}</div>
    <p className="text-[13px]">{label}</p>
  </div>
);

/* ══════════════════════════════════════════════════════
   IMAGE VIEWER — centered modal overlay
══════════════════════════════════════════════════════ */
const ImageViewer = ({ images, startIndex, senderName, senderImage, timestamp, onClose, downloadFileToDesktop }) => {
  const [index, setIndex] = useState(startIndex ?? 0);
  const [zoom, setZoom] = useState(1);
  const thumbRef = useRef(null);

  const getFileName = (url) => url?.split("?")[0].split("/").pop() || "File";
  const currentUrl = images[index];

  useEffect(() => {
    const strip = thumbRef.current;
    if (!strip) return;
    strip.children[index]?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  }, [index]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowLeft") setIndex((i) => (i - 1 + images.length) % images.length);
      if (e.key === "ArrowRight") setIndex((i) => (i + 1) % images.length);
      if (e.key === "Escape") onClose();
      if (e.key === "+" || e.key === "=") setZoom((z) => Math.min(z + 0.25, 4));
      if (e.key === "-") setZoom((z) => Math.max(z - 0.25, 0.25));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [images.length, onClose]);

  useEffect(() => { setZoom(1); }, [index]);

  const displayTime = timestamp
    ? new Date(timestamp).toLocaleString("en-IN", {
      weekday: "long", hour: "numeric", minute: "2-digit", hour12: true,
    })
    : `${new Date().toLocaleDateString("en-IN", { weekday: "long" })} at ${new Date().toLocaleTimeString("en-IN", { hour: "numeric", minute: "2-digit", hour12: true })}`;

  return (
    /* ── Backdrop ── */
    <div
      className="fixed inset-0 z-[10000] flex items-center justify-center p-4"
      style={{ background: "rgba(6,28,30,0.82)", backdropFilter: "blur(6px)" }}
      onClick={onClose}
    >
      {/* ── Modal card ── */}
      <div
        className="relative flex flex-col rounded-2xl overflow-hidden"
        style={{
          width: "min(780px, 96vw)",
          height: "min(580px, 88vh)",
          background: "#141f20",
          boxShadow: "0 32px 80px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.06)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* ── Top bar ── */}
        <div
          className="flex-shrink-0 flex items-center gap-3 px-4 py-3"
          style={{ background: "linear-gradient(180deg,#1e2e2f 0%,#182526 100%)", borderBottom: "1px solid rgba(255,255,255,0.07)" }}
        >
          {/* Sender avatar */}
          <div className="w-9 h-9 rounded-full overflow-hidden shrink-0 border border-white/10 bg-[#085056]/40 flex items-center justify-center">
            {senderImage ? (
              <img src={senderImage} alt={senderName} className="w-full h-full object-cover" />
            ) : (
              <ImageIcon className="w-4 h-4 text-white/35" />
            )}
          </div>

          {/* Name + time */}
          <div className="flex-1 min-w-0">
            <p className="text-white text-[13.5px] font-semibold leading-tight truncate">
              {senderName || "Media"}
            </p>
            <p className="text-white/40 text-[11px] leading-tight mt-0.5">{displayTime}</p>
          </div>

          {/* Counter pill */}
          {images.length > 1 && (
            <div className="shrink-0 px-3 py-1 rounded-full text-[11.5px] font-semibold text-white/60"
              style={{ background: "rgba(255,255,255,0.07)" }}>
              {index + 1} / {images.length}
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center gap-0.5 shrink-0">
            <button
              onClick={() => setZoom((z) => Math.min(z + 0.25, 4))}
              className="p-2 rounded-lg text-white/45 hover:text-white hover:bg-white/8 transition-colors"
              title="Zoom in (+)"
            >
              <ZoomIn className="w-[17px] h-[17px]" />
            </button>
            <button
              onClick={() => setZoom((z) => Math.max(z - 0.25, 0.25))}
              className="p-2 rounded-lg text-white/45 hover:text-white hover:bg-white/8 transition-colors"
              title="Zoom out (-)"
            >
              <ZoomOut className="w-[17px] h-[17px]" />
            </button>
            {/* <button
              onClick={async (e) => { e.stopPropagation(); e.preventDefault(); downloadFileToDesktop ? await downloadFileToDesktop(currentUrl, getFileName(currentUrl)) : await downloadFileLocally(currentUrl, getFileName(currentUrl)); }}
              className="p-2 rounded-lg text-white/45 hover:text-white hover:bg-white/8 transition-colors"
              title="Download"
            >
              <Download className="w-[17px] h-[17px]" />
            </button> */}
            <div className="w-px h-4 bg-white/10 mx-1" />
            <button
              onClick={onClose}
              className="p-2 rounded-lg text-white/45 hover:text-white hover:bg-white/8 transition-colors"
              title="Close (Esc)"
            >
              <X className="w-[17px] h-[17px]" />
            </button>
          </div>
        </div>

        {/* ── Image area ── */}
        <div
          className="flex-1 flex items-center justify-center relative overflow-hidden"
          style={{ background: "#0e1a1b" }}
        >
          <img
            src={currentUrl}
            alt={getFileName(currentUrl)}
            style={{
              transform: `scale(${zoom})`,
              transition: "transform .18s ease",
              maxWidth: "100%",
              maxHeight: "100%",
              objectFit: "contain",
              cursor: zoom > 1 ? "zoom-out" : "default",
              borderRadius: 2,
            }}
            onClick={() => zoom > 1 && setZoom(1)}
          />

          {/* Zoom badge */}
          {zoom !== 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/65 text-white text-[11.5px] font-medium px-3 py-1.5 rounded-full pointer-events-none backdrop-blur-sm">
              {Math.round(zoom * 100)}%
            </div>
          )}

          {/* Nav arrows */}
          {images.length > 1 && (
            <>
              <button
                onClick={() => setIndex((i) => (i - 1 + images.length) % images.length)}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center text-white transition-colors"
                style={{ background: "rgba(0,0,0,0.45)", border: "1px solid rgba(255,255,255,0.12)" }}
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIndex((i) => (i + 1) % images.length)}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center text-white transition-colors"
                style={{ background: "rgba(0,0,0,0.45)", border: "1px solid rgba(255,255,255,0.12)" }}
              >
                <ArrowLeft className="w-4 h-4 rotate-180" />
              </button>
            </>
          )}
        </div>

        {/* ── Thumbnail strip ── */}
        {images.length > 1 && (
          <div
            className="flex-shrink-0 py-2.5"
            style={{ background: "#182526", borderTop: "1px solid rgba(255,255,255,0.06)" }}
          >
            <div
              ref={thumbRef}
              className="flex gap-1.5 overflow-x-auto px-3"
              style={{ scrollbarWidth: "none" }}
            >
              {images.map((url, i) => (
                <button
                  key={`${url}-${i}`}
                  onClick={() => setIndex(i)}
                  className={`shrink-0 rounded-lg overflow-hidden transition-all ${i === index
                      ? "opacity-100 ring-2 ring-[#0a9aa4] ring-offset-1 ring-offset-[#182526]"
                      : "opacity-35 hover:opacity-60"
                    }`}
                  style={{ width: 52, height: 52 }}
                >
                  <img
                    src={url}
                    alt=""
                    className="w-full h-full object-cover block"
                    onError={(e) => { e.currentTarget.style.display = "none"; }}
                  />
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

/* ══════════════════════════════════════════════════════
   ALL CHATS MEDIA MODAL — centered overlay
══════════════════════════════════════════════════════ */
const AllChatsMediaModal = ({
  imageFiles = [],
  documentFiles = [],
  linkItems = [],
  loadingFiles,
  filesPage,
  filesPagination,
  allFiles = [],
  setFilesPage,
  refetchFiles,
  downloadFileToDesktop,
  onClose,
  getFileName,
  setActiveGroupTab,
}) => {
  const [tab, setTab] = useState("media");
  const [viewerIndex, setViewerIndex] = useState(null);

  const switchTab = (t) => {
    setTab(t);
    if (t === "media") { setActiveGroupTab?.("media"); refetchFiles?.("image"); }
    else if (t === "docs") { setActiveGroupTab?.("files"); refetchFiles?.("document"); }
  };

  const TABS = [
    { id: "media", label: "Media" },
    { id: "docs", label: "Docs" },
    { id: "links", label: linkItems.length > 0 ? `Links (${linkItems.length})` : "Links" },
  ];

  return (
    <>
      {/* ── Backdrop ── */}
      <div
        className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
        style={{ background: "rgba(8,40,44,0.58)", backdropFilter: "blur(5px)" }}
        onClick={onClose}
      >
        {/* ── Modal card ── */}
        <div
          className="relative flex flex-col bg-white rounded-2xl overflow-hidden"
          style={{
            width: "min(560px, 95vw)",
            height: "min(620px, 90vh)",
            boxShadow: "0 24px 64px rgba(8,80,86,0.24)",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div
            className="flex-shrink-0 flex items-center gap-3 px-5 py-4"
            style={{ background: "linear-gradient(135deg,#085056 0%,#0a6b73 100%)" }}
          >
            <div className="flex-1">
              <h2 className="text-white font-semibold text-[15px] tracking-tight leading-tight">

                Jaimax Community Gallery

              </h2>
              <p className="text-white/55 text-[11px] mt-0.5">
                {allFiles.length} file{allFiles.length !== 1 ? "s" : ""} shared
              </p>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4 text-white" />
            </button>
          </div>

          {/* Tab bar */}
          <div className="flex-shrink-0 flex border-b border-[#085056]/10 bg-white">
            {TABS.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => switchTab(id)}
                className={`flex-1 py-3 text-[13px] font-semibold border-b-2 -mb-px transition-colors ${tab === id
                    ? "border-[#085056] text-[#085056]"
                    : "border-transparent text-[#4a7a7e] hover:text-[#085056]/70"
                  }`}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Scrollable content */}
          <div className="flex-1 overflow-y-auto bg-[#f7fbfb]">

            {/* Media */}
            {tab === "media" && (
              filesPage === 1 && loadingFiles ? (
                <div className="flex items-center justify-center h-48">
                  <div className="w-9 h-9 border-2 border-[#085056] border-t-transparent rounded-full animate-spin" />
                </div>
              ) : imageFiles.length > 0 ? (
                <>
                  <p className="px-5 pt-5 pb-2 text-[10.5px] font-black text-[#4a7a7e] uppercase tracking-[.14em]">
                    Shared Media
                  </p>
                  <div className="grid grid-cols-3 gap-[2px] bg-[#085056]/6 mx-1 rounded-xl overflow-hidden">
                    {imageFiles.map((url, i) => (
                      <div
                        key={`${url}-${i}`}
                        className="relative group aspect-square overflow-hidden bg-[#ddf0f1] cursor-pointer"
                        onClick={() => setViewerIndex(i)}
                      >
                        <img
                          src={url}
                          alt=""
                          className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
                          onError={(e) => { e.currentTarget.style.display = "none"; }}
                        />
                        {/* <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                          <button
                            onClick={async (e) => {
                              e.stopPropagation();
                              e.preventDefault();
                              downloadFileToDesktop ? await downloadFileToDesktop(url, getFileName(url)) : await downloadFileLocally(url, getFileName(url));
                            }}
                            className="w-8 h-8 rounded-full bg-white/20 border border-white/35 flex items-center justify-center backdrop-blur-sm hover:bg-white/30 transition-colors"
                          >
                            <Download className="w-3.5 h-3.5 text-white" />
                          </button>
                        </div> */}
                      </div>
                    ))}
                  </div>
                  <LoadMoreSpinner
                    loadingFiles={loadingFiles} filesPage={filesPage}
                    filesPagination={filesPagination} allFiles={allFiles} setFilesPage={setFilesPage}
                  />
                </>
              ) : (
                <EmptyState icon={<ImageIcon className="w-12 h-12" />} label="No images shared yet" />
              )
            )}

            {/* Docs */}
            {tab === "docs" && (
              filesPage === 1 && loadingFiles ? (
                <div className="flex items-center justify-center h-48">
                  <div className="w-9 h-9 border-2 border-[#085056] border-t-transparent rounded-full animate-spin" />
                </div>
              ) : documentFiles.length > 0 ? (
                <div className="px-4 pt-3 pb-4 space-y-2">
                  <p className="px-1 pt-3 pb-1.5 text-[10.5px] font-black text-[#4a7a7e] uppercase tracking-[.14em]">
                    Documents
                  </p>
                  {documentFiles.map((url, i) => (
                    <div
                      key={`${url}-${i}`}
                      className="flex items-center gap-3 px-3 py-3 rounded-xl border border-[#085056]/10 bg-white cursor-pointer hover:bg-[#f0f8f8] transition-colors"
                      onClick={() => window.open(url, "_blank")}
                    >
                      <div className="w-10 h-10 rounded-lg bg-[#e3f3f4] border border-[#085056]/12 flex items-center justify-center shrink-0">
                        <File className="w-5 h-5 text-[#085056]" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[13px] font-semibold text-[#0d2426] truncate">{getFileName(url)}</p>
                        <p className="text-[11px] text-[#4a7a7e] mt-0.5">Document</p>
                      </div>
                      {/* <button
                        onClick={async (e) => {
                          e.stopPropagation();
                          e.preventDefault();
                          downloadFileToDesktop ? await downloadFileToDesktop(url, getFileName(url)) : await downloadFileLocally(url, getFileName(url));
                        }}
                        className="p-2 shrink-0 text-[#085056] hover:bg-[#085056]/8 rounded-lg transition-colors"
                      >
                        <Download className="w-4 h-4" />
                      </button> */}
                    </div>
                  ))}
                  <LoadMoreSpinner
                    loadingFiles={loadingFiles} filesPage={filesPage}
                    filesPagination={filesPagination} allFiles={allFiles} setFilesPage={setFilesPage}
                  />
                </div>
              ) : (
                <EmptyState icon={<File className="w-12 h-12" />} label="No documents shared yet" />
              )
            )}

            {/* Links */}
            {tab === "links" && (
              linkItems.length > 0 ? (
                <>
                  <p className="px-5 pt-5 pb-2 text-[10.5px] font-black text-[#4a7a7e] uppercase tracking-[.14em]">
                    Shared Links · {linkItems.length}
                  </p>
                  <div className="mx-1 rounded-xl overflow-hidden border border-[#085056]/8 bg-white">
                    {linkItems.map((item, i) => (
                      <LinkCard
                        key={i} url={item.url} text={item.text}
                        senderName={item.fromUserId} timestamp={item.timestamp}
                      />
                    ))}
                  </div>
                </>
              ) : (
                <EmptyState icon={<Link className="w-12 h-12" />} label="No links shared yet" />
              )
            )}
          </div>

          {/* Footer */}
          <div className="flex-shrink-0 px-5 py-3 bg-white border-t border-[#085056]/8 flex items-center justify-between">
            <span className="text-[11.5px] text-[#4a7a7e]">
              {tab === "media" && `${imageFiles.length} image${imageFiles.length !== 1 ? "s" : ""}`}
              {tab === "docs" && `${documentFiles.length} document${documentFiles.length !== 1 ? "s" : ""}`}
              {tab === "links" && `${linkItems.length} link${linkItems.length !== 1 ? "s" : ""}`}
            </span>
            <button
              onClick={onClose}
              className="px-4 py-1.5 text-[12.5px] font-semibold text-[#085056] border border-[#085056]/30 rounded-full hover:bg-[#085056]/6 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>

      {/* ImageViewer modal — stacks above AllChatsMediaModal */}
      {viewerIndex !== null && (
        <ImageViewer
          images={imageFiles}
          startIndex={viewerIndex}
          senderName="Group Media"
          onClose={() => setViewerIndex(null)}
          downloadFileToDesktop={downloadFileToDesktop}
        />
      )}
    </>
  );
};

/* ══════════════════════════════════════════════════════
   MAIN GROUP INFO PANEL
══════════════════════════════════════════════════════ */
const GroupInfoPanel = ({
  selectedGroup, activeGroupTab, setActiveGroupTab, totalUsers,
  membersContainerRef, accumulatedFiles, filesPage, setFilesPage,
  loadingFiles, filesPagination, refetchFiles, setShowMembers,
  messagesEndRef, formatFileSize, downloadFileToDesktop,
  messages = [],
  groupKey,
}) => {
  const [mounted, setMounted] = useState(false);
  const [subTab, setSubTab] = useState("media");
  const [viewerIndex, setViewerIndex] = useState(null);
  const [showAllChats, setShowAllChats] = useState(false);

  useEffect(() => {
    const raf = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    if (activeGroupTab === "files") setSubTab("docs");
    else if (activeGroupTab === "media") setSubTab("media");
    else if (activeGroupTab === "links") setSubTab("links");
  }, [activeGroupTab]);

  useEffect(() => {
    if (activeGroupTab === "media") refetchFiles?.("image");
    else if (activeGroupTab === "files") refetchFiles?.("document");
  }, [activeGroupTab]); // eslint-disable-line

  useEffect(() => {
    const container = membersContainerRef?.current;
    if (!container || activeGroupTab === "overview") return;
    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = container;
      const hasMore = filesPagination?.page < filesPagination?.totalPages;
      if (scrollHeight - scrollTop - clientHeight < 150 && hasMore && !loadingFiles && filesPagination?.page >= 1) {
        setFilesPage((p) => p + 1);
      }
    };
    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => container.removeEventListener("scroll", handleScroll);
  }, [activeGroupTab, loadingFiles, filesPagination]); // eslint-disable-line

  const allFiles = Array.isArray(accumulatedFiles) ? accumulatedFiles : [];
  const getFileType = (url) => {
    if (!url || typeof url !== "string") return "unknown";
    const clean = url.split("?")[0].toLowerCase();
    if (/\.(jpg|jpeg|png|gif|webp|svg|bmp)$/.test(clean)) return "image";
    return "file";
  };
  const getFileName = (url) => url?.split("?")[0].split("/").pop() || "File";
  const imageFiles = allFiles.filter((url) => getFileType(url) === "image");
  const documentFiles = allFiles.filter((url) => getFileType(url) !== "image");

  /* Extract links from messages */
  const URL_REGEX = /(https?:\/\/[^\s<>"{}|\\^`[\]]+)/gi;
  const linkItems = useMemo(() => {
    if (!Array.isArray(messages) || messages.length === 0) return [];
    const items = [];
    const seen = new Set();
    const sorted = [...messages].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    for (const msg of sorted) {
      if (msg.deletedForEveryone) continue;
      if (msg.msgBody?.message_type === "file") continue;
      let text = "";
      const raw = msg.msgBody?.message;
      if (typeof raw === "string") {
        text = raw;
      } else if (raw && typeof raw === "object") {
        if (groupKey) {
          try { const dec = decryptMessage(raw, groupKey); if (typeof dec === "string") text = dec; } catch { /* skip */ }
        }
        if (!text) text = raw.text || raw.body || raw.content || "";
      }
      if (!text) continue;
      const matches = text.match(URL_REGEX);
      if (!matches) continue;
      for (const url of matches) {
        if (seen.has(url)) continue;
        seen.add(url);
        items.push({ url, text: text.trim(), senderName: msg.fromUserId  , timestamp: msg.timestamp });
      }
    }
    return items;
  }, [messages, groupKey]);


  const isMediaBrowser = activeGroupTab === "media" || activeGroupTab === "files" || activeGroupTab === "links";

  const closePanel = () => {
    setMounted(false);
    setTimeout(() => {
      setShowMembers(false);
      setActiveGroupTab("overview");
      messagesEndRef?.current?.scrollIntoView({ behavior: "smooth" });
    }, 300);
  };

  return (
    <>
      {/* ══ SIDE PANEL ══ */}
      <div
        className={`
          absolute top-0 right-0 bottom-0 z-20 flex flex-col bg-[#f0f8f8]
          w-[420px] max-w-full border-l border-[#085056]/10
          shadow-[-8px_0_24px_rgba(8,80,86,0.08)]
          transition-transform duration-300 ease-out
          ${mounted ? "translate-x-0" : "translate-x-full"}
        `}
      >
        {/* ── OVERVIEW ── */}
        {!isMediaBrowser && (
          <div className="flex flex-col h-full">
            <div className="bg-[#085056] px-4 py-8 flex items-center gap-3 flex-shrink-0">
              <button onClick={closePanel} className="text-white/75 p-1 shrink-0">
                <ArrowLeft className="w-5 h-5" />
              </button>
              <h2 className="text-white font-semibold text-[15px] tracking-tight flex-1 truncate">
                Group info
              </h2>
            </div>

            <div className="flex-1 overflow-y-auto">
              {/* Avatar + name */}
              <div className="bg-white px-4 pt-8 pb-6 flex flex-col items-center text-center border-b border-[#085056]/8">
                <div className="w-24 h-24 rounded-full overflow-hidden mb-4 shadow-md shadow-[#085056]/15">
                  {selectedGroup?.groupImage ? (
                    <img src={selectedGroup.groupImage} alt={selectedGroup?.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center bg-[#cceaec] gap-1">
                      <ImageIcon className="w-8 h-8 text-[#085056]/40" />
                      <span className="text-[10px] text-[#085056]/50 font-medium px-2 text-center">Add group icon</span>
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-[20px] font-semibold text-[#0d2426]">{selectedGroup?.name}</h3>
                </div>
                <p className="text-[13px] text-[#4a7a7e]">Group · {totalUsers ?? 0} members</p>
              </div>

              {/* Description */}
              <div className="bg-white mt-2 px-4 py-4 border-b border-[#085056]/8">
                {selectedGroup?.groupDescription ? (
                  <p className="text-[13.5px] text-[#0d2426] leading-relaxed">{selectedGroup.groupDescription}</p>
                ) : (
                  <button className="flex items-center gap-2.5 text-[#085056]">
                    <Pencil className="w-4 h-4" />
                    <span className="text-[13.5px] font-medium">Add group description</span>
                  </button>
                )}
              </div>

              {/* Created info */}
              {(selectedGroup?.createdAt || selectedGroup?.createdBy) && (
                <div className="bg-white px-4 py-3 border-b border-[#085056]/8">
                  <p className="text-[12px] text-[#4a7a7e] leading-relaxed">
                    Group created by{" "}
                    <span className="text-[#085056] font-medium">{selectedGroup?.createdBy || "Admin"}</span>
                    {selectedGroup?.createdAt && (
                      <>
                        , on{" "}
                        {new Date(selectedGroup.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "numeric", year: "numeric" })}{" "}
                        at{" "}
                        {new Date(selectedGroup.createdAt).toLocaleTimeString("en-IN", { hour: "numeric", minute: "2-digit", hour12: true })}
                      </>
                    )}
                  </p>
                </div>
              )}

              {/* Media row */}
              <button
                onClick={() => { setSubTab("media"); setActiveGroupTab("media"); refetchFiles?.("image"); }}
                className="w-full bg-white mt-2 px-4 py-4 flex items-center justify-between border-b border-[#085056]/8"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#e6f4f5] flex items-center justify-center shrink-0">
                    <ImageIcon className="w-[18px] h-[18px] text-[#085056]" />
                  </div>
                  <span className="text-[13.5px] text-[#0d2426] font-medium">Media, links and docs</span>
                </div>
                <div className="flex items-center gap-1.5">
                  {/* <span className="text-[13px] text-[#4a7a7e]">{allFiles.length}</span> */}
                  <ChevronRight className="w-4 h-4 text-[#4a7a7e]" />
                </div>
              </button>

              {/* Members count */}
              <div className="mt-2 px-4 py-2 border-b border-[#085056]/8 flex items-center justify-between">
                <p className="text-[13px] font-semibold text-[#085056] uppercase tracking-wide">Total Members</p>
                <span className="text-[13px] font-semibold text-[#085056]">{totalUsers ?? 0}</span>
              </div>
            </div>
          </div>
        )}

        {/* ── MEDIA / DOCS / LINKS BROWSER ── */}
        {isMediaBrowser && (
          <div className="flex flex-col h-full">
            <div className="bg-white flex-shrink-0 shadow-sm shadow-[#085056]/6">
              <div className="flex items-center px-2 pt-2">
                <button onClick={() => setActiveGroupTab("overview")} className="p-2 text-[#0d2426]">
                  <ArrowLeft className="w-5 h-5" />
                </button>
              </div>
              <div className="flex border-b border-[#085056]/10">
                {[
                  { id: "media", label: "Media" },
                  { id: "docs", label: "Docs" },
                  { id: "links", label: `Links${linkItems.length > 0 ? ` (${linkItems.length})` : ""}` },
                ].map(({ id, label }) => (
                  <button
                    key={id}
                    onClick={() => {
                      setSubTab(id);
                      if (id === "media") { setActiveGroupTab("media"); refetchFiles?.("image"); }
                      else if (id === "docs") { setActiveGroupTab("files"); refetchFiles?.("document"); }
                      else if (id === "links") setActiveGroupTab("links");
                    }}
                    className={`flex-1 py-3 text-[13.5px] font-semibold border-b-2 -mb-px ${subTab === id ? "border-[#085056] text-[#085056]" : "border-transparent text-[#4a7a7e]"
                      }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            <div ref={membersContainerRef} className="flex-1 overflow-y-auto bg-white">
              {/* Media */}
              {subTab === "media" && (
                filesPage === 1 && loadingFiles ? (
                  <div className="flex items-center justify-center h-48">
                    <div className="w-10 h-10 border-2 border-[#085056] border-t-transparent rounded-full animate-spin" />
                  </div>
                ) : imageFiles.length > 0 ? (
                  <>
                    <p className="px-4 pt-5 pb-2 text-[11px] font-black text-[#4a7a7e] uppercase tracking-[.12em]">Shared Media</p>
                    <div className="grid grid-cols-3 gap-px bg-[#085056]/5">
                      {imageFiles.map((url, i) => (
                        <div
                          key={`${url}-${i}`}
                          className="relative group aspect-square overflow-hidden bg-[#e6f4f5] cursor-pointer"
                          onClick={() => setViewerIndex(i)}
                        >
                          <img
                            src={url} alt=""
                            className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
                            onError={(e) => { e.currentTarget.style.display = "none"; }}
                          />
                          {/* <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <button
                              onClick={async (e) => { e.stopPropagation(); e.preventDefault(); downloadFileToDesktop ? await downloadFileToDesktop(url, getFileName(url)) : await downloadFileLocally(url, getFileName(url)); }}
                              className="w-10 h-10 rounded-full bg-black/50 border border-white/30 flex items-center justify-center"
                            >
                              <Download className="w-4 h-4 text-white" />
                            </button>
                          </div> */}
                        </div>
                      ))}
                    </div>
                    <LoadMoreSpinner
                      loadingFiles={loadingFiles} filesPage={filesPage}
                      filesPagination={filesPagination} allFiles={allFiles} setFilesPage={setFilesPage}
                    />
                  </>
                ) : (
                  <EmptyState icon={<ImageIcon className="w-16 h-16" />} label="No images shared yet" />
                )
              )}

              {/* Docs */}
              {subTab === "docs" && (
                filesPage === 1 && loadingFiles ? (
                  <div className="flex items-center justify-center h-48">
                    <div className="w-10 h-10 border-2 border-[#085056] border-t-transparent rounded-full animate-spin" />
                  </div>
                ) : documentFiles.length > 0 ? (
                  <div className="px-3 pt-2 pb-3 space-y-1">
                    <p className="px-1 pt-4 pb-2 text-[11px] font-black text-[#4a7a7e] uppercase tracking-[.12em]">Documents</p>
                    {documentFiles.map((url, i) => (
                      <div
                        key={`${url}-${i}`}
                        className="flex items-center gap-3 px-3 py-3 rounded-2xl border border-[#085056]/10 bg-white cursor-pointer hover:bg-[#f0f8f8] transition-colors"
                        onClick={() => window.open(url, "_blank")}
                      >
                        <div className="w-11 h-11 rounded-xl bg-[#e6f4f5] border border-[#085056]/12 flex items-center justify-center shrink-0">
                          <File className="w-5 h-5 text-[#085056]" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-[13px] font-semibold text-[#0d2426] truncate">{getFileName(url)}</p>
                          <p className="text-[11px] text-[#4a7a7e] mt-0.5">Document</p>
                        </div>
                        {/* <button
                          onClick={async (e) => { e.stopPropagation(); e.preventDefault(); downloadFileToDesktop ? await downloadFileToDesktop(url, getFileName(url)) : await downloadFileLocally(url, getFileName(url)); }}
                          className="p-2 shrink-0 text-[#085056]"
                        >
                          <Download className="w-4 h-4" />
                        </button> */}
                      </div>
                    ))}
                    <LoadMoreSpinner
                      loadingFiles={loadingFiles} filesPage={filesPage}
                      filesPagination={filesPagination} allFiles={allFiles} setFilesPage={setFilesPage}
                    />
                  </div>
                ) : (
                  <EmptyState icon={<File className="w-16 h-16" />} label="No documents shared yet" />
                )
              )}

              {/* Links */}
              {subTab === "links" && (
                linkItems.length > 0 ? (
                  <>
                    <p className="px-4 pt-5 pb-2 text-[11px] font-black text-[#4a7a7e] uppercase tracking-[.12em]">
                      Shared Links · {linkItems.length}
                    </p>
                    <div>
                      {linkItems.map((item, i) => (
                        <LinkCard key={i} url={item.url} text={item.text} senderName={item.senderName} timestamp={item.timestamp} />
                      ))}
                    </div>
                  </>
                ) : (
                  <EmptyState icon={<Link className="w-16 h-16" />} label="No links shared yet" />
                )
              )}
            </div>

            {/* Footer — view all chats */}
            <button
              onClick={() => setShowAllChats(true)}
              className="flex-shrink-0 border-t border-[#085056]/10 bg-white px-4 py-3 flex items-center justify-center gap-2 w-full hover:bg-[#f0f8f8] transition-colors"
            >
              <ImageIcon className="w-4 h-4 text-[#085056]" />
              <span className="text-[13px] font-semibold text-[#085056]">View media from all chats</span>
            </button>
          </div>
        )}
      </div>

      {/* ══ IMAGE VIEWER modal ══ */}
      {viewerIndex !== null && (
        <ImageViewer
          images={imageFiles}
          startIndex={viewerIndex}
          senderName={selectedGroup?.name}
          senderImage={selectedGroup?.groupImage}
          onClose={() => setViewerIndex(null)}
          downloadFileToDesktop={downloadFileToDesktop}
        />
      )}

      {/* ══ ALL CHATS MEDIA MODAL ══ */}
      {showAllChats && (
        <AllChatsMediaModal
          imageFiles={imageFiles}
          documentFiles={documentFiles}
          linkItems={linkItems}
          loadingFiles={loadingFiles}
          filesPage={filesPage}
          filesPagination={filesPagination}
          allFiles={allFiles}
          setFilesPage={setFilesPage}
          refetchFiles={refetchFiles}
          downloadFileToDesktop={downloadFileToDesktop}
          onClose={() => setShowAllChats(false)}
          getFileName={getFileName}
          setActiveGroupTab={setActiveGroupTab}
        />
      )}
    </>
  );
};

export default GroupInfoPanel;

