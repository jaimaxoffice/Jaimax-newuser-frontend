import playstore from "../../assets/Images/playStore.svg";
import applestore from "../../assets/Images/appleStore.svg";
import mobilePhone from "../../assets/homefooter/Mobile.png";
import React, { useEffect, useState } from "react";
import { Download } from "lucide-react";
import BadgePill from "./BadgePill";

export default function HomeFooter() {
  const playStoreLink =
    "https://play.google.com/store/apps/details?id=com.jaimaxjaimax.jaimaxjaimax";
  const appleStoreLink = "#";

  return (
    <div
      className="w-full overflow-hidden bg-[var(--color-bg-overlay)]"
      style={{
        // background: "linear-gradient(135deg, #e8f5e0 0%, #c8e6b4 100%)",
        fontFamily: "'Sora', sans-serif",
      }}
    >

      {/* ══════════════════════════════════════════════════════════
          MOBILE  < 640px
          Full stack: badge → heading → p → buttons → phone
          ══════════════════════════════════════════════════════════ */}
      <div className="flex flex-col gap-6 px-6 pt-12 pb-0 sm:hidden justify-center items-center">
        {/* <BadgePill label="Secure Investment" /> */}
        <h2 className="text-3xl font-bold leading-tight tracking-tight sideHeading text-center">
          Secure Your Financial Tomorrow with{" "}
          <span style={{ color: "var(--color-brand-primary)" }}>Jaimax</span>
        </h2>
        <p className="text-sm leading-relaxed text-center" style={{ color: "var(--color-text-secondary)" }}>
          Begin your journey into the world of cryptocurrency investment with our{" "}
          <span className="font-semibold" style={{ color: "var(--color-brand-primary)" }}>
            revolutionary Starter Investment plan
          </span>
          . Your gateway to financial freedom awaits.
        </p>
        <DownloadBlock playStoreLink={playStoreLink} appleStoreLink={appleStoreLink} />
        <div className="w-full flex justify-center pt-4">
          <img
            src={mobilePhone}
            alt="Jaimax App"
            className="w-[70%] max-w-[260px] object-contain"
          />
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════
          TABLET  640px – 1023px  (sm → lg)
          Top: badge + heading centered
          Below: 3-col — p-text | phone (bottom-anchored) | buttons
          ══════════════════════════════════════════════════════════ */}
      <div className="hidden sm:flex lg:hidden flex-col px-8 md:px-8 pt-12 pb-0">

        {/* Top — badge + heading centered */}
        <div className="flex flex-col items-center gap-4 text-center mb-8 md:mb-10">
          {/* <BadgePill label="Secure Investment" /> */}
          <h2 className="text-4xl md:text-5xl font-bold leading-tight tracking-tight sideHeading max-w-2xl">
            Secure Your Financial Tomorrow with{" "}
            <span style={{ color: "var(--color-brand-primary)" }}>Jaimax</span>
          </h2>
        </div>

        {/* Bottom — 3-col: p | phone | buttons, phone anchored to bottom */}
        <div
          className="grid w-full"
          style={{ gridTemplateColumns: "1fr 1fr 1fr", alignItems: "end" }}
        >
          {/* Left — p text, self center */}
          <div
            className="flex flex-col justify-center pb-10"
            style={{ alignSelf: "center" }}
          >
            <p className="text-sm md:text-base leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
              Begin your journey into the world of cryptocurrency investment with our{" "}
              <span className="font-semibold" style={{ color: "var(--color-brand-primary)" }}>
                revolutionary Starter Investment plan
              </span>
              . Your gateway to financial freedom awaits.
            </p>
          </div>

          {/* Center — phone, anchored to bottom via alignItems:end on grid */}
          <div className="flex justify-center">
            <img
              src={mobilePhone}
              alt="Jaimax App"
              className="w-full object-contain"
              style={{ display: "block" }}
            />
          </div>

          {/* Right — download, self center */}
          <div
            className="flex flex-col justify-center pb-10"
            style={{ alignSelf: "center" }}
          >
            <DownloadBlock playStoreLink={playStoreLink} appleStoreLink={appleStoreLink} />
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════
          DESKTOP  ≥ 1024px
          3-col grid — left content | phone (bottom) | right download
          ══════════════════════════════════════════════════════════ */}
      <div
        className="hidden lg:grid w-full px-10 xl:px-16 pt-16 xl:pt-20"
        style={{ gridTemplateColumns: "2fr 1.4fr 2fr", alignItems: "end" }}
      >
        {/* Col 1 */}
        <div className="flex flex-col gap-6 pr-8 pb-16 xl:pb-20" style={{ alignSelf: "center" }}>
          {/* <BadgePill label="Secure Investment" /> */}
          <h2 className="text-4xl xl:text-5xl font-bold leading-tight tracking-tight sideHeading">
            Secure Your Financial Tomorrow with{" "}
            <span style={{ color: "var(--color-brand-primary)" }}>Jaimax</span>
          </h2>
          <p className="text-base xl:text-lg leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
            Begin your journey into the world of cryptocurrency investment with our{" "}
            <span className="font-semibold" style={{ color: "var(--color-brand-primary)" }}>
              revolutionary Starter Investment plan
            </span>
            . Your gateway to financial freedom awaits.
          </p>
        </div>

        {/* Col 2 — phone anchored to bottom */}
        <div className="flex justify-center">
          <img
            src={mobilePhone}
            alt="Jaimax App"
            className="w-full  drop-shadow-xl"
            style={{ display: "block" }}
          />
        </div>

        {/* Col 3 */}
        <div className="flex flex-col justify-center items-start pl-8 pb-16 xl:pb-20" style={{ alignSelf: "center" }}>
          <DownloadBlock playStoreLink={playStoreLink} appleStoreLink={appleStoreLink} />
        </div>
      </div>

    </div>
  );
}

/* ─── DownloadBlock ───────────────────────────────────────────────────── */
/* ─── DownloadBlock ───────────────────────────────────────────────────── */
function DownloadBlock({ playStoreLink, appleStoreLink }) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
          style={{ background: "var(--color-brand-primary)" }}
        >
          <Download className="w-5 h-5 text-white animate-bounce" />
        </div>
        <div>
          <span className="block font-bold text-xs uppercase" style={{ color: "var(--color-brand-dark)" }}>
            Download Now
          </span>
          <span className="text-xs" style={{ color: "var(--color-brand-mid)" }}>
            Available on all platforms
          </span>
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <StoreBadge
          href={playStoreLink}
          sublabel="GET IT ON"
          label="Google Play"
          icon={<PlayStoreIcon />}
        />
        {/* <StoreBadge
          href={appleStoreLink}
          sublabel="Download on the"
          label="App Store"
          icon={<AppleIcon />}
          disabled
        /> */}
      </div>
    </div>
  );
}

/* ─── StoreBadge ── matches the official pill badge style ─────────────── */
function StoreBadge({ href, sublabel, label, icon, disabled }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-3 transition-all rounded-full duration-200 hover:scale-[1.03] hover:-translate-y-0.5 active:scale-[0.98]"
      style={{
        background: "#ffffff",
        border: "1.5px solid #d1d5db",
        // borderRadius: "14px",
        padding: "10px 20px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.10)",
        textDecoration: "none",
        width: "fit-content",
        opacity: disabled ? 0.6 : 1,
        pointerEvents: disabled ? "none" : "auto",
        minWidth: "180px",
      }}
    >
      <div style={{ width: "32px", height: "32px", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
        {icon}
      </div>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
        <span style={{ fontSize: "11px", color: "#6b7280", letterSpacing: "0.04em", lineHeight: 1.2 }}>
          {sublabel}
        </span>
        <span style={{ fontSize: "18px", fontWeight: "600", color: "gray", letterSpacing: "-0.01em", lineHeight: 1.2 }}>
          {label}
        </span>
      </div>
    </a>
  );
}

/* ─── PlayStoreIcon (inline SVG) ─────────────────────────────────────── */
function PlayStoreIcon() {
  return (
    <svg viewBox="0 0 512 512" width="32" height="32" xmlns="http://www.w3.org/2000/svg">
      <path d="M48 432L265 256 48 80z" fill="#EA4335" />
      <path d="M48 80l217 176 72-62L90 48C76 40 58 45 48 80z" fill="#4285F4" />
      <path d="M48 432c10 35 28 40 42 32l247-146-72-62z" fill="#34A853" />
      <path d="M337 194l-72 62 72 62 87-52c25-15 25-39 0-54z" fill="#FBBC05" />
    </svg>
  );
}

/* ─── AppleIcon (inline SVG) ─────────────────────────────────────────── */
function AppleIcon() {
  return (
    <svg viewBox="0 0 814 1000" width="28" height="28" xmlns="http://www.w3.org/2000/svg" fill="#111827">
      <path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76 0-103.7 40.8-165.9 40.8s-105-57.8-155.5-127.4C46 790.7 0 663 0 541.8c0-207.5 135.4-317.3 269-317.3 70.1 0 128.4 46.4 172.5 46.4 42.8 0 109.6-49.1 190.5-49.1zm-225.3-191.8c33.7-40.2 58.4-96.2 58.4-152.2 0-7.8-.6-15.6-2-22.9-55.8 2-121.4 37.1-161.3 84.1-31 35.1-59.7 90.4-59.7 147.1 0 8.4 1.4 16.9 2 19.5 3.4.6 8.4 1.2 13.4 1.2 50.3 0 112.9-33.1 149.2-76.8z"/>
    </svg>
  );
}

/* ─── StoreButton ─────────────────────────────────────────────────────── */
function StoreButton({ href, icon, iconAlt, label, sublabel }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group overflow-hidden rounded-xl transition-all duration-300 hover:scale-105 hover:-translate-y-1"
      style={{
        background: "var(--color-brand-dark)",
        border: "1.5px solid var(--color-brand-primary)",
        boxShadow: "var(--shadow-btn)",
        minWidth: "120px",
      }}
    >
      <div className="flex items-center gap-2 px-3 py-3">
        <div className="w-8 h-8 flex-shrink-0">
          <img src={icon} alt={iconAlt} className="w-full h-full rounded" />
        </div>
        <div className="text-left">
          <div className="text-xs" style={{ color: "var(--color-brand-light)" }}>{sublabel}</div>
          <div className="text-sm font-bold" style={{ color: "var(--color-brand-accent)" }}>{label}</div>
        </div>
      </div>
    </a>
  );
}