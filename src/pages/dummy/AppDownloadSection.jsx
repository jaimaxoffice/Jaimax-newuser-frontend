// import { useEffect, useRef } from "react";

// const AppIcon = ({ size = 48 }) => (
//   <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
//     {/* Outer diamond */}
//     <polygon
//       points="32,4 60,32 32,60 4,32"
//       fill="none"
//       stroke="#1a1a1a"
//       strokeWidth="4"
//     />
//     {/* Inner diamond rotated */}
//     <polygon
//       points="32,14 50,32 32,50 14,32"
//       fill="none"
//       stroke="#1a1a1a"
//       strokeWidth="4"
//     />
//     {/* Cross lines */}
//     <line x1="32" y1="4" x2="32" y2="60" stroke="#1a1a1a" strokeWidth="3" />
//     <line x1="4" y1="32" x2="60" y2="32" stroke="#1a1a1a" strokeWidth="3" />
//   </svg>
// );

// const PhoneMockup = ({ width, height, borderRadius, borderWidth, notchW, notchH, showIcon = false, iconSize = 40 }) => (
//   <div
//     className="relative flex flex-col items-center bg-white flex-shrink-0"
//     style={{
//       width,
//       height,
//       borderRadius,
//       border: `${borderWidth}px solid #1a1a1a`,
//       boxShadow: "0 8px 40px rgba(0,0,0,0.10)",
//     }}
//   >
//     {/* Dynamic Island */}
//     <div
//       className="bg-neutral-900 flex-shrink-0"
//       style={{
//         width: notchW,
//         height: notchH,
//         borderRadius: notchH,
//         marginTop: 12,
//       }}
//     />
//     {/* Screen */}
//     <div className="flex-1 w-full flex items-center justify-center">
//       {showIcon && <AppIcon size={iconSize} />}
//     </div>
//   </div>
// );

// const AppStoreBadge = () => (
//   <a
//     href="#"
//     className="inline-flex items-center gap-2.5 bg-black text-white rounded-lg px-4 py-2.5 no-underline transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
//   >
//     <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
//       <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11" />
//     </svg>
//     <div className="flex flex-col leading-none">
//       <span className="text-[9px] tracking-wider font-normal">Download on the</span>
//       <span className="text-[15px] font-semibold tracking-tight">App Store</span>
//     </div>
//   </a>
// );

// const GooglePlayBadge = () => (
//   <a
//     href="#"
//     className="inline-flex items-center gap-2.5 bg-black text-white rounded-lg px-4 py-2.5 no-underline transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
//   >
//     <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
//       <path d="M3.18 23.76A2 2 0 0 1 2 22V2a2 2 0 0 1 1.18-1.76l11.62 11.75L3.18 23.76Z" fill="#4CAF50" />
//       <path d="M20.5 10.52 17.34 8.7 13.8 12l3.54 3.3 3.16-1.82a2 2 0 0 0 0-3Z" fill="#FFC107" />
//       <path d="M3.18.24 14.8 12 3.18 23.76A2 2 0 0 1 2 22V2a2 2 0 0 1 1.18-1.76Z" fill="#4CAF50" />
//       <path d="m3.18.24 10.62 11.75-2.66 2.62L2 8.54V2A2 2 0 0 1 3.18.24Z" fill="#2196F3" />
//       <path d="M3.18 23.76 13.8 12l-2.66-2.61-8.14 8.07 .18 6.3Z" fill="#F44336" />
//     </svg>
//     <div className="flex flex-col leading-none">
//       <span className="text-[9px] tracking-wider font-normal">GET IT ON</span>
//       <span className="text-[15px] font-semibold tracking-tight">Google Play</span>
//     </div>
//   </a>
// );

// export default function AppDownloadSection() {
//   const sectionRef = useRef(null);

//   useEffect(() => {
//     const el = sectionRef.current;
//     if (!el) return;
//     el.style.opacity = "0";
//     el.style.transform = "translateY(24px)";
//     const id = requestAnimationFrame(() => {
//       el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
//       el.style.opacity = "1";
//       el.style.transform = "translateY(0)";
//     });
//     return () => cancelAnimationFrame(id);
//   }, []);

//   return (
//     <div className="min-h-screen bg-white flex flex-col items-center overflow-hidden">
//       <div ref={sectionRef} className="flex flex-col items-center w-full flex-1">

//         {/* Get Started pill — top center */}
//         <div className="mt-4 mb-6">
//           <button className="text-[11px] font-medium tracking-widest text-neutral-500 border border-neutral-300 rounded-full px-4 py-1 bg-transparent cursor-pointer hover:border-neutral-800 hover:text-neutral-800 transition-colors duration-200">
//             Get Started
//           </button>
//         </div>

//         {/* Headline */}
//         <h2 className="text-[clamp(26px,4.5vw,46px)] font-bold text-neutral-900 text-center leading-[1.2] tracking-tight max-w-lg px-4 mb-7">
//           Download our app and<br />
//           transform your workflow today
//         </h2>

//         {/* Store Badges */}
//         <div className="flex flex-col sm:flex-row gap-3 justify-center items-center mb-12 px-4">
//           <AppStoreBadge />
//           <GooglePlayBadge />
//         </div>

//         {/* Phones — anchored at bottom, partially cropped */}
//         <div className="relative flex items-end justify-center w-full flex-1 overflow-hidden">

//           {/* Left phone */}
//           <div
//             className="absolute"
//             style={{ bottom: -60, left: "calc(50% - 340px)" }}
//           >
//             <PhoneMockup
//               width={200}
//               height={390}
//               borderRadius={36}
//               borderWidth={8}
//               notchW={70}
//               notchH={20}
//               showIcon={false}
//             />
//           </div>

//           {/* Center phone */}
//           <div
//             className="relative z-10"
//             style={{ marginBottom: -80 }}
//           >
//             <PhoneMockup
//               width={230}
//               height={460}
//               borderRadius={44}
//               borderWidth={9}
//               notchW={85}
//               notchH={23}
//               showIcon={true}
//               iconSize={52}
//             />
//           </div>

//           {/* Right phone */}
//           <div
//             className="absolute"
//             style={{ bottom: -60, right: "calc(50% - 340px)" }}
//           >
//             <PhoneMockup
//               width={200}
//               height={390}
//               borderRadius={36}
//               borderWidth={8}
//               notchW={70}
//               notchH={20}
//               showIcon={false}
//             />
//           </div>

//         </div>
//       </div>
//     </div>
//   );
// }

import { useEffect, useRef } from "react";
import playstore from "../../assets/Images/playStore.svg";
import applestore from "../../assets/Images/appleStore.svg";

const playStoreLink =
  "https://play.google.com/store/apps/details?id=com.jaimaxjaimax.jaimaxjaimax";
const appleStoreLink = "#";

const AppIcon = ({ size = 48 }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
    <polygon points="32,4 60,32 32,60 4,32" fill="none" stroke="#1a1a1a" strokeWidth="4" />
    <polygon points="32,14 50,32 32,50 14,32" fill="none" stroke="#1a1a1a" strokeWidth="4" />
    <line x1="32" y1="4" x2="32" y2="60" stroke="#1a1a1a" strokeWidth="3" />
    <line x1="4" y1="32" x2="60" y2="32" stroke="#1a1a1a" strokeWidth="3" />
  </svg>
);

const PhoneMockup = ({ width, height, borderRadius, borderWidth, notchW, notchH, showIcon = false, iconSize = 40 }) => (
  <div
    className="relative flex flex-col items-center bg-white flex-shrink-0"
    style={{
      width,
      height,
      borderRadius,
      border: `${borderWidth}px solid #1a1a1a`,
      boxShadow: "0 8px 40px rgba(0,0,0,0.10)",
    }}
  >
    <div
      className="bg-neutral-900 flex-shrink-0"
      style={{ width: notchW, height: notchH, borderRadius: notchH, marginTop: 12 }}
    />
    <div className="flex-1 w-full flex items-center justify-center">
      {showIcon && <AppIcon size={iconSize} />}
    </div>
  </div>
);

const AppStoreBadge = () => (
  <a
    href={appleStoreLink}
    target="_blank"
    rel="noopener noreferrer"
    title="Download Jaimax Coin app from Apple App Store"
    aria-label="Download Jaimax on the App Store – Coming Soon"
    className="inline-flex items-center gap-2.5 bg-black text-white rounded-lg px-4 py-2.5 no-underline transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
  >
    <img src={applestore} alt="Apple App Store" className="w-5 h-5 object-contain" />
    <div className="flex flex-col leading-none">
      <span className="text-[9px] tracking-wider font-normal">Coming Soon</span>
      <span className="text-[15px] font-semibold tracking-tight">App Store</span>
    </div>
  </a>
);

const GooglePlayBadge = () => (
  <a
    href={playStoreLink}
    target="_blank"
    rel="noopener noreferrer"
    title="Download Jaimax Coin app from Google Play Store"
    aria-label="Download Jaimax on Google Play Store"
    className="inline-flex items-center gap-2.5 bg-black text-white rounded-lg px-4 py-2.5 no-underline transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
  >
    <img src={playstore} alt="Google Play Store" className="w-5 h-5 object-contain rounded" />
    <div className="flex flex-col leading-none">
      <span className="text-[9px] tracking-wider font-normal">GET IT ON</span>
      <span className="text-[15px] font-semibold tracking-tight">Google Play</span>
    </div>
  </a>
);

export default function AppDownloadSection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    el.style.opacity = "0";
    el.style.transform = "translateY(24px)";
    const id = requestAnimationFrame(() => {
      el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
      el.style.opacity = "1";
      el.style.transform = "translateY(0)";
    });
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <div className="min-h-screen bg-white flex flex-col items-center overflow-hidden">
      <div ref={sectionRef} className="flex flex-col items-center w-full flex-1">

        {/* Get Started pill */}
        <div className="mt-4 mb-6">
          <button className="text-[11px] font-medium tracking-widest text-neutral-500 border border-neutral-300 rounded-full px-4 py-1 bg-transparent cursor-pointer hover:border-neutral-800 hover:text-neutral-800 transition-colors duration-200">
            Get Started
          </button>
        </div>

        {/* Headline */}
        <h2 className="text-[clamp(26px,4.5vw,46px)] font-bold text-neutral-900 text-center leading-[1.2] tracking-tight max-w-lg px-4 mb-7">
          Secure Your Financial Tomorrow<br />with Jaimax
        </h2>

        {/* Sub-text */}
        <p className="text-neutral-500 text-center text-sm sm:text-base max-w-md px-4 mb-8 leading-relaxed">
          Begin your journey into cryptocurrency investment with our revolutionary
          Starter Investment plan. Your gateway to financial freedom awaits.
        </p>

        {/* Store Badges */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center mb-12 px-4">
          <GooglePlayBadge />
          <AppStoreBadge />
        </div>

        {/* Phones */}
        <div className="relative flex items-end justify-center w-full flex-1 overflow-hidden">

          {/* Left phone */}
          <div className="absolute" style={{ bottom: -60, left: "calc(50% - 340px)" }}>
            <PhoneMockup
              width={200} height={390}
              borderRadius={36} borderWidth={8}
              notchW={70} notchH={20}
              showIcon={false}
            />
          </div>

          {/* Center phone */}
          <div className="relative z-10" style={{ marginBottom: -80 }}>
            <PhoneMockup
              width={230} height={460}
              borderRadius={44} borderWidth={9}
              notchW={85} notchH={23}
              showIcon={true} iconSize={52}
            />
          </div>

          {/* Right phone */}
          <div className="absolute" style={{ bottom: -60, right: "calc(50% - 340px)" }}>
            <PhoneMockup
              width={200} height={390}
              borderRadius={36} borderWidth={8}
              notchW={70} notchH={20}
              showIcon={false}
            />
          </div>
        </div>
      </div>
    </div>
  );
}