// import React, { useState } from "react";
// import { toast } from "react-toastify";

// // ICONS (All Inline SVG Components)
// const CopyIcon = ({ size = 18 }) => (
//   <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor"
//     strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
//     viewBox="0 0 24 24" width={size} height={size}>
//     <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
//     <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
//   </svg>
// );

// const CloseIcon = ({ size = 20 }) => (
//   <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor"
//     strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
//     viewBox="0 0 24 24" width={size} height={size}>
//     <line x1="18" y1="6" x2="6" y2="18" />
//     <line x1="6" y1="6" x2="18" y2="18" />
//   </svg>
// );

// const FacebookIcon = () => (
//   <svg xmlns="http://www.w3.org/2000/svg" fill="#1877F2" viewBox="0 0 24 24" width="20" height="20">
//     <path d="M22.675 0h-21.35C.595 0 0 .593 0 1.326v21.348C0 23.406.594 24 1.325 24h11.495v-9.294H9.691V11.41h3.129V8.797c0-3.1 1.893-4.788 4.658-4.788 1.325 0 2.464.099 2.796.143v3.24l-1.918.001c-1.504 0-1.794.715-1.794 1.763v2.31h3.587l-.467 3.296h-3.12V24h6.116c.73 0 1.324-.594 1.324-1.326V1.326C24 .593 23.406 0 22.675 0z"/>
//   </svg>
// );

// const TwitterIcon = () => (
//   <svg xmlns="http://www.w3.org/2000/svg" fill="#1DA1F2" viewBox="0 0 24 24" width="20" height="20">
//     <path d="M23.954 4.569c-.885.392-1.83.656-2.825.775 1.014-.611 1.794-1.574 2.163-2.723-.951.568-2.005.982-3.127 1.202-.897-.959-2.178-1.558-3.594-1.558-2.72 0-4.924 2.205-4.924 4.924 0 .39.045.765.127 1.124C7.728 8.087 4.1 6.128 1.671 3.149c-.427.733-.666 1.58-.666 2.475 0 1.708.869 3.216 2.188 4.099-.807-.026-1.566-.248-2.229-.616v.061c0 2.385 1.693 4.374 3.946 4.827-.413.112-.849.171-1.296.171-.314 0-.615-.03-.916-.086.631 1.953 2.445 3.376 4.6 3.415-1.68 1.318-3.809 2.103-6.102 2.103-.39 0-.779-.023-1.17-.067C2.905 21.408 6.355 22 9.999 22c11.998 0 18.542-9.94 18.542-18.542 0-.281-.006-.562-.019-.841A13.26 13.26 0 0 0 24 4.59z"/>
//   </svg>
// );

// const InstagramIcon = () => (
//   <svg xmlns="http://www.w3.org/2000/svg" fill="#E1306C" viewBox="0 0 24 24" width="20" height="20">
//     <path d="M7.75 2h8.5C19.55 2 22 4.45 22 7.75v8.5C22 19.55 19.55 22 16.25 22h-8.5C4.45 22 2 19.55 2 16.25v-8.5C2 4.45 4.45 2 7.75 2zm0-2C3.47 0 0 3.47 0 7.75v8.5C0 20.53 3.47 24 7.75 24h8.5C20.53 24 24 20.53 24 16.25v-8.5C24 3.47 20.53 0 16.25 0h-8.5z"/>
//     <path d="M12 5.838A6.162 6.162 0 1 0 18.162 12 6.167 6.167 0 0 0 12 5.838zm0 10.162A3.999 3.999 0 1 1 16 12a4.004 4.004 0 0 1-4 4z"/>
//     <circle cx="18.406" cy="5.594" r="1.44"/>
//   </svg>
// );

// const WhatsAppIcon = () => (
//   <svg xmlns="http://www.w3.org/2000/svg" fill="#25D366" viewBox="0 0 24 24" width="20" height="20">
//     <path d="M.057 24l1.687-6.163a11.867 11.867 0 0 1-1.62-5.97C.122 5.352 5.48 0 12.063 0c3.2 0 6.21 1.24 8.477 3.503A11.88 11.88 0 0 1 24 12.063c0 6.584-5.353 11.937-11.937 11.937a11.87 11.87 0 0 1-5.946-1.6L.057 24zM6.403 20.11l.384.228a9.847 9.847 0 0 0 5.276 1.542c5.455 0 9.89-4.435 9.89-9.89 0-2.637-1.03-5.117-2.902-6.988A9.865 9.865 0 0 0 12.063 2.1c-5.456 0-9.89 4.434-9.89 9.89 0 2.042.618 3.976 1.785 5.624l-.451 1.648 1.896-.552zm10.198-5.906c-.149-.074-.877-.43-1.014-.478-.136-.049-.236-.074-.336.075s-.387.478-.474.576c-.087.099-.174.111-.323.037-.149-.075-.628-.231-1.195-.736-.442-.393-.74-.875-.827-1.024-.087-.149-.01-.229.065-.303.067-.066.149-.174.224-.261.075-.087.099-.149.149-.248.05-.099.025-.186-.012-.261-.037-.074-.336-.812-.46-1.113-.121-.29-.244-.251-.336-.256l-.286-.005c-.099 0-.26.037-.397.186s-.522.508-.522 1.236.535 1.435.609 1.534c.075.099 1.05 1.602 2.545 2.243.356.153.633.244.85.313.357.114.682.098.94.06.287-.043.877-.357 1.001-.702.124-.345.124-.64.087-.702-.037-.062-.136-.099-.286-.173z"/>
//   </svg>
// );

// const TelegramIcon = () => (
//   <svg xmlns="http://www.w3.org/2000/svg" fill="#0088CC" viewBox="0 0 24 24" width="20" height="20">
//     <path d="M12 0C5.371 0 0 5.371 0 12s5.371 12 12 12 12-5.371 12-12S18.629 0 12 0zm5.93 8.176l-1.536 7.26c-.115.522-.414.649-.839.405l-2.32-1.714-1.12 1.08c-.124.124-.23.23-.472.23l.17-2.417 4.402-3.97c.192-.17-.042-.265-.3-.095l-5.437 3.42-2.34-.731c-.51-.159-.522-.51.107-.754l9.135-3.52c.425-.159.797.096.662.742z"/>
//   </svg>
// );

// const ReferralModal = ({ show, onHide, userData }) => {
//   const [copied, setCopied] = useState(false);

//   if (!show) return null;

//   const username = userData?.data?.username || "unknown";
//   const REGISTER_REFERAL = `${window.location.origin}/register?referralCode=${username}`;
//   const referralLink = REGISTER_REFERAL;

//   const referralMessage = `
// 🚀 Join the Jaimax Coin Revolution! 🚀

// Hey there! 🌟

// I'm excited to introduce you to Jaimax Coin – the future of cryptocurrency! 💰✨
// 👉 ${referralLink}
// #JaimaxCoin #CryptoRevolution
// `;

//   const encodedMessage = encodeURIComponent(referralMessage);
//   const twitterMessage = encodeURIComponent(`🚀 Join the Jaimax Coin Revolution! 💰✨\n👉 ${referralLink}\n#JaimaxCoin #CryptoRevolution`);

//   const copyToClipboard = () => {
//     navigator.clipboard.writeText(referralMessage).then(() => {
//       setCopied(true);
//       toast.success("Referral message copied to clipboard!");
//       setTimeout(() => setCopied(false), 2000);
//     }).catch(() => {
//       toast.error("Failed to copy.");
//     });
//   };

//   const handleOverlayClick = (e) => {
//     if (e.target === e.currentTarget) onHide();
//   };

//   return (
//     <div onClick={handleOverlayClick} className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//       <div className="bg-white rounded-xl w-[350px] md:w-[400px] p-6 relative shadow-lg">
//         <div className="flex justify-between items-center mb-4">
//           <h2 className="text-lg font-semibold">Share Your Referral Code</h2>
//           <button onClick={onHide} className="text-gray-600 hover:text-gray-900">
//             <CloseIcon />
//           </button>
//         </div>

//         <p className="text-sm text-gray-700 mb-4">Share this link via</p>
//         <div className="flex justify-between items-center gap-3 mb-4 px-4">
//           <a href={`https://www.facebook.com/sharer/sharer.php?u=${referralLink}`} target="_blank" className="w-10 h-10 flex justify-center items-center rounded-full bg-[#e8f0fe]">
//             <FacebookIcon />
//           </a>
//           <a href={`https://x.com/intent/tweet?text=${twitterMessage}`} target="_blank" className="w-10 h-10 flex justify-center items-center rounded-full bg-[#e8f5fd]">
//             <TwitterIcon />
//           </a>
//           <a href="#" className="w-10 h-10 flex justify-center items-center rounded-full bg-pink-100">
//             <InstagramIcon />
//           </a>
//           <a href={`https://api.whatsapp.com/send/?text=${encodedMessage}`} target="_blank" className="w-10 h-10 flex justify-center items-center rounded-full bg-green-100">
//             <WhatsAppIcon />
//           </a>
//           <a href={`https://t.me/share/url?url=${encodedMessage}`} target="_blank" className="w-10 h-10 flex justify-center items-center rounded-full bg-blue-100">
//             <TelegramIcon />
//           </a>
//         </div>

//         <p className="text-sm text-gray-700 mb-2">Copy link</p>
//         <div className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-md">
//           <span className="text-xs text-gray-600 truncate">{referralLink}</span>
//           <button onClick={copyToClipboard} disabled={copied}
//             className={`bg-purple-600 text-white text-sm px-3 py-1 rounded-md flex items-center transition duration-300 ${copied ? 'bg-green-600' : ''}`}>
//             {copied ? "✓" : <CopyIcon />}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ReferralModal;
import React, { useState } from "react";
import { toast } from "react-toastify";

// ICONS (All Inline SVG Components)
const CopyIcon = ({ size = 18 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    viewBox="0 0 24 24"
    width={size}
    height={size}
  >
    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
  </svg>
);

const CloseIcon = ({ size = 20 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    viewBox="0 0 24 24"
    width={size}
    height={size}
  >
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const FacebookIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    class="lucide lucide-facebook-icon lucide-facebook"
  >
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const TwitterIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    class="lucide lucide-x-icon lucide-x"
  >
    <path d="M18 6 6 18" />
    <path d="m6 6 12 12" />
  </svg>
);

const InstagramIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    class="lucide lucide-instagram-icon lucide-instagram"
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const WhatsAppIcon = () => (
<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                </svg>
);

const TelegramIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
  </svg>
);

const ReferralModal = ({ show, onHide, userData }) => {
  const [copied, setCopied] = useState(false);

  if (!show) return null;
console.log(userData,"data")
  const username = userData?.username || "unknown";
  const REGISTER_REFERAL = `${window.location.origin}/register?referralCode=${username}`;
  const referralLink = REGISTER_REFERAL;

  const referralMessage = `
🚀 Join the Jaimax Coin Revolution! 🚀

Hey there! 🌟

I'm excited to introduce you to Jaimax Coin – the future of cryptocurrency! 💰✨
👉 ${referralLink}
#JaimaxCoin #CryptoRevolution
`;

  const encodedMessage = encodeURIComponent(referralMessage);
  const twitterMessage = encodeURIComponent(
    `🚀 Join the Jaimax Coin Revolution! 💰✨\n👉 ${referralLink}\n#JaimaxCoin #CryptoRevolution`
  );

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(referralMessage)
      .then(() => {
        setCopied(true);
        toast.success("Referral message copied to clipboard!");
        setTimeout(() => setCopied(false), 2000);
      })
      .catch(() => {
        toast.error("Failed to copy.");
      });
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onHide();
  };

  return (
    <div
      onClick={handleOverlayClick}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
    >
      <div className="bg-white rounded-xl w-full max-w-[350px] sm:max-w-[400px] md:max-w-[450px] lg:max-w-[500px] p-4 sm:p-6 relative shadow-lg mx-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-4 sm:mb-6">
          <h2 className="text-base sm:text-lg md:text-xl font-semibold text-gray-800">
            Share Your Referral Code
          </h2>
          <button
            onClick={onHide}
            className="text-gray-600 hover:text-gray-900 p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <CloseIcon size={18} />
          </button>
        </div>

        {/* Share Description */}
        <p className="text-xs sm:text-sm text-gray-700 mb-3 sm:mb-4">
          Share this link via
        </p>

        {/* Social Media Icons */}
        <div className="flex justify-center items-center gap-2 sm:gap-3 mb-4 sm:mb-6 flex-wrap">
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${referralLink}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-8 h-8 sm:w-10 sm:h-10 flex justify-center items-center rounded-full bg-[#e8f0fe] hover:bg-[#d0e1ff] transition-colors"
          >
            <FacebookIcon />
          </a>
          <a
            href={`https://x.com/intent/tweet?text=${twitterMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-8 h-8 sm:w-10 sm:h-10 flex justify-center items-center rounded-full bg-[#e8f5fd] hover:bg-[#d0ebfa] transition-colors"
          >
            <TwitterIcon />
          </a>
          <a
            href="#"
            className="w-8 h-8 sm:w-10 sm:h-10 flex justify-center items-center rounded-full bg-pink-100 hover:bg-pink-200 transition-colors"
          >
            <InstagramIcon />
          </a>
          <a
            href={`https://api.whatsapp.com/send/?text=${encodedMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-8 h-8 sm:w-10 sm:h-10 flex justify-center items-center rounded-full bg-green-100 hover:bg-green-200 transition-colors"
          >
            <WhatsAppIcon />
          </a>
          <a
            href={`https://t.me/share/url?url=${encodedMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-8 h-8 sm:w-10 sm:h-10 flex justify-center items-center rounded-full bg-blue-100 hover:bg-blue-200 transition-colors"
          >
            <TelegramIcon />
          </a>
        </div>

        {/* Copy Link Section */}
        <p className="text-xs sm:text-sm text-gray-700 mb-2 sm:mb-3">
          Copy link
        </p>
        <div className="flex items-center gap-2 bg-gray-100 px-2 sm:px-3 py-2 sm:py-3 rounded-md">
          <span className="text-xs sm:text-sm text-gray-600 truncate flex-1 min-w-0">
            {referralLink}
          </span>
          <button
            onClick={copyToClipboard}
            disabled={copied}
            className={`text-white text-xs sm:text-sm px-2 sm:px-3 py-1 sm:py-2 rounded-md flex items-center gap-1 transition-all duration-300 whitespace-nowrap ${
              copied
                ? "bg-green-600 hover:bg-green-700"
                : "bg-purple-600 hover:bg-purple-700"
            } focus:outline-none focus:ring-2 focus:ring-offset-2 ${
              copied ? "focus:ring-green-500" : "focus:ring-purple-500"
            }`}
          >
            {copied ? (
              <span className="flex items-center gap-1">
                <span className="text-xs sm:text-sm">✓</span>
                <span className="hidden sm:inline">Copied</span>
              </span>
            ) : (
              <span className="flex items-center gap-1">
                <CopyIcon size={14} />
                <span className="hidden sm:inline">Copy</span>
              </span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReferralModal;
