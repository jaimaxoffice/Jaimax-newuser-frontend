// import React, { useState } from "react";
// import { toast } from "react-toastify";

// // ICONS (All Inline SVG Components)
// const CopyIcon = ({ size = 18 }) => (
//   <svg
//     xmlns="http://www.w3.org/2000/svg"
//     fill="none"
//     stroke="currentColor"
//     strokeWidth="2"
//     strokeLinecap="round"
//     strokeLinejoin="round"
//     viewBox="0 0 24 24"
//     width={size}
//     height={size}
//   >
//     <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
//     <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
//   </svg>
// );

// const CloseIcon = ({ size = 20 }) => (
//   <svg
//     xmlns="http://www.w3.org/2000/svg"
//     fill="none"
//     stroke="currentColor"
//     strokeWidth="2"
//     strokeLinecap="round"
//     strokeLinejoin="round"
//     viewBox="0 0 24 24"
//     width={size}
//     height={size}
//   >
//     <line x1="18" y1="6" x2="6" y2="18" />
//     <line x1="6" y1="6" x2="18" y2="18" />
//   </svg>
// );

// const FacebookIcon = () => (
//   <svg
//     xmlns="http://www.w3.org/2000/svg"
//     width="24"
//     height="24"
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke="currentColor"
//     stroke-width="2"
//     stroke-linecap="round"
//     stroke-linejoin="round"
//     class="lucide lucide-facebook-icon lucide-facebook"
//   >
//     <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
//   </svg>
// );

// const TwitterIcon = () => (
//   <svg
//     xmlns="http://www.w3.org/2000/svg"
//     width="24"
//     height="24"
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke="currentColor"
//     stroke-width="2"
//     stroke-linecap="round"
//     stroke-linejoin="round"
//     class="lucide lucide-x-icon lucide-x"
//   >
//     <path d="M18 6 6 18" />
//     <path d="m6 6 12 12" />
//   </svg>
// );

// const InstagramIcon = () => (
//   <svg
//     xmlns="http://www.w3.org/2000/svg"
//     width="24"
//     height="24"
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke="currentColor"
//     stroke-width="2"
//     stroke-linecap="round"
//     stroke-linejoin="round"
//     class="lucide lucide-instagram-icon lucide-instagram"
//   >
//     <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
//     <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
//     <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
//   </svg>
// );

// const WhatsAppIcon = () => (
// <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
//                   <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
//                 </svg>
// );

// const TelegramIcon = () => (
//   <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
//     <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
//   </svg>
// );

// const ReferralModal = ({ show, onHide, userData }) => {
//   const [copied, setCopied] = useState(false);

//   if (!show) return null;
// console.log(userData,"data")
//   const username = userData?.username || "unknown";
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
//   const twitterMessage = encodeURIComponent(
//     `🚀 Join the Jaimax Coin Revolution! 💰✨\n👉 ${referralLink}\n#JaimaxCoin #CryptoRevolution`
//   );

//   const copyToClipboard = () => {
//     navigator.clipboard
//       .writeText(referralMessage)
//       .then(() => {
//         setCopied(true);
//         toast.success("Referral message copied to clipboard!");
//         setTimeout(() => setCopied(false), 2000);
//       })
//       .catch(() => {
//         toast.error("Failed to copy.");
//       });
//   };

//   const handleOverlayClick = (e) => {
//     if (e.target === e.currentTarget) onHide();
//   };

//   return (
//     <div
//       onClick={handleOverlayClick}
//       className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
//     >
//       <div className="bg-white rounded-xl w-full max-w-[350px] sm:max-w-[400px] md:max-w-[450px] lg:max-w-[500px] p-4 sm:p-6 relative shadow-lg mx-4">
//         {/* Header */}
//         <div className="flex justify-between items-center mb-4 sm:mb-6">
//           <h2 className="text-base sm:text-lg md:text-xl font-semibold text-gray-800">
//             Share Your Referral Code
//           </h2>
//           <button
//             onClick={onHide}
//             className="text-gray-600 hover:text-gray-900 p-1 hover:bg-gray-100 rounded-full transition-colors"
//           >
//             <CloseIcon size={18} />
//           </button>
//         </div>

//         {/* Share Description */}
//         <p className="text-xs sm:text-sm text-gray-700 mb-3 sm:mb-4">
//           Share this link via
//         </p>

//         {/* Social Media Icons */}
//         <div className="flex justify-center items-center gap-2 sm:gap-3 mb-4 sm:mb-6 flex-wrap">
//           <a
//             href={`https://www.facebook.com/sharer/sharer.php?u=${referralLink}`}
//             target="_blank"
//             rel="noopener noreferrer"
//             className="w-8 h-8 sm:w-10 sm:h-10 flex justify-center items-center rounded-full bg-[#e8f0fe] hover:bg-[#d0e1ff] transition-colors"
//           >
//             <FacebookIcon />
//           </a>
//           <a
//             href={`https://x.com/intent/tweet?text=${twitterMessage}`}
//             target="_blank"
//             rel="noopener noreferrer"
//             className="w-8 h-8 sm:w-10 sm:h-10 flex justify-center items-center rounded-full bg-[#e8f5fd] hover:bg-[#d0ebfa] transition-colors"
//           >
//             <TwitterIcon />
//           </a>
//           <a
//             href="#"
//             className="w-8 h-8 sm:w-10 sm:h-10 flex justify-center items-center rounded-full bg-pink-100 hover:bg-pink-200 transition-colors"
//           >
//             <InstagramIcon />
//           </a>
//           <a
//             href={`https://api.whatsapp.com/send/?text=${encodedMessage}`}
//             target="_blank"
//             rel="noopener noreferrer"
//             className="w-8 h-8 sm:w-10 sm:h-10 flex justify-center items-center rounded-full bg-green-100 hover:bg-green-200 transition-colors"
//           >
//             <WhatsAppIcon />
//           </a>
//           <a
//             href={`https://t.me/share/url?url=${encodedMessage}`}
//             target="_blank"
//             rel="noopener noreferrer"
//             className="w-8 h-8 sm:w-10 sm:h-10 flex justify-center items-center rounded-full bg-blue-100 hover:bg-blue-200 transition-colors"
//           >
//             <TelegramIcon />
//           </a>
//         </div>

//         {/* Copy Link Section */}
//         <p className="text-xs sm:text-sm text-gray-700 mb-2 sm:mb-3">
//           Copy link
//         </p>
//         <div className="flex items-center gap-2 bg-gray-100 px-2 sm:px-3 py-2 sm:py-3 rounded-md">
//           <span className="text-xs sm:text-sm text-gray-600 truncate flex-1 min-w-0">
//             {referralLink}
//           </span>
//           <button
//             onClick={copyToClipboard}
//             disabled={copied}
//             className={`text-white text-xs sm:text-sm px-2 sm:px-3 py-1 sm:py-2 rounded-md flex items-center gap-1 transition-all duration-300 whitespace-nowrap ${
//               copied
//                 ? "bg-green-600 hover:bg-green-700"
//                 : "bg-purple-600 hover:bg-purple-700"
//             } focus:outline-none focus:ring-2 focus:ring-offset-2 ${
//               copied ? "focus:ring-green-500" : "focus:ring-purple-500"
//             }`}
//           >
//             {copied ? (
//               <span className="flex items-center gap-1">
//                 <span className="text-xs sm:text-sm">✓</span>
//                 <span className="hidden sm:inline">Copied</span>
//               </span>
//             ) : (
//               <span className="flex items-center gap-1">
//                 <CopyIcon size={14} />
//                 <span className="hidden sm:inline">Copy</span>
//               </span>
//             )}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ReferralModal;
import React, { useState } from "react";
import { toast } from "../../ReusableComponents/Toasts/Toasts";

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
    // navigator.clipboard
    //   .writeText(referralMessage)
    navigator.clipboard.writeText(referralLink)
      .then(() => {
        setCopied(true);
        // toast.success("Referral message copied to clipboard!");
        toast.success("Referral link copied!");
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
