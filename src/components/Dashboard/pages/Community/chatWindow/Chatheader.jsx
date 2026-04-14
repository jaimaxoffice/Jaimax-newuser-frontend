// import React, { useState, useEffect } from "react";
// import { FolderOpen, Trash2 } from "lucide-react";
// import { BsThreeDotsVertical } from "react-icons/bs";

// const ChatHeader = ({
//   selectedGroup,
//   totalUsers,
//   typingUsers,
//   setShowMembers,
//   setShowFilesPanel,
//   setActiveGroupTab,
//   setShowClearChatModal,
//   headerRef,
// }) => {
//   const [showHeaderMenu, setShowHeaderMenu] = useState(false);

//   useEffect(() => {
//     const handleClickOutside = () => {
//       if (showHeaderMenu) setShowHeaderMenu(false);
//     };
//     if (showHeaderMenu) document.addEventListener("click", handleClickOutside);
//     return () => document.removeEventListener("click", handleClickOutside);
//   }, [showHeaderMenu]);

//   const getTypingText = () => {
//     if (!typingUsers || typingUsers.length === 0) return null;
//     if (typingUsers.length === 1) return `${typingUsers[0].userId} is typing`;
//     if (typingUsers.length === 2)
//       return `${typingUsers[0].userId} and ${typingUsers[1].userId} are typing...`;
//     return `${typingUsers.length} people are typing...`;
//   };

//   if (!selectedGroup) return null;

//   return (
//     <div
//       ref={headerRef}
//       className="sticky top-0 z-30 bg-[#b9fd5c] p-2 sm:p-4 flex items-center justify-between border-b border-[#2a3942] flex-shrink-0 w-full"
//     >
//       <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
//         <div
//           onClick={() => {
//             setShowMembers(true);
//             setShowFilesPanel(false);
//           }}
//           className="flex items-center gap-3 flex-1 cursor-pointer p-2 rounded-lg transition-colors min-w-0 ml-2"
//         >
//           <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#00a884] to-[#008069] flex items-center justify-center text-xl flex-shrink-0">
//             <img
//               src="https://res.cloudinary.com/ddefr5owc/image/upload/v1766049897/logo_xwrr9w.png"
//               alt=""
//               className="w-full h-full rounded-full object-cover"
//             />
//           </div>
//           <div className="min-w-0 flex-1">
//             <h2 className="font-semibold text-black truncate">
//               {selectedGroup?.name}
//             </h2>
//             {typingUsers?.length > 0 ? (
//               <div className="flex items-center gap-1">
//                 <p className="text-xs text-white truncate animate-pulse">
//                   {getTypingText()}
//                 </p>
//                 <div className="flex gap-0.5">
//                   <span
//                     className="w-1 h-1 bg-[#00a884] rounded-full animate-bounce"
//                     style={{ animationDelay: "0ms" }}
//                   />
//                   <span
//                     className="w-1 h-1 bg-[#00a884] rounded-full animate-bounce"
//                     style={{ animationDelay: "150ms" }}
//                   />
//                   <span
//                     className="w-1 h-1 bg-[#00a884] rounded-full animate-bounce"
//                     style={{ animationDelay: "300ms" }}
//                   />
//                 </div>
//               </div>
//             ) : (
//               <p className="text-xs text-black truncate">
//                 {totalUsers ?? 0} members
//               </p>
//             )}
//           </div>
//         </div>
//       </div>

//       <div className="relative flex-shrink-0">
//         <button
//           onClick={(e) => {
//             e.stopPropagation();
//             setShowHeaderMenu((prev) => !prev);
//           }}
//           className="p-2 rounded-lg transition-colors"
//         >
//           <BsThreeDotsVertical className="w-6 h-6 text-black" />
//         </button>
//         {showHeaderMenu && (
//           <div className="absolute right-0 top-full mt-2 w-48 bg-[#000000] rounded-lg shadow-xl border border-[#2a3942] overflow-hidden z-50">
//             {/* <button
//                             onClick={() => { setShowFilesPanel(true); setShowMembers(false); setActiveGroupTab('overview'); setShowHeaderMenu(false); }}
//                             className="w-full flex items-center gap-3 px-4 py-3 hover:bg-[#0b141a] text-left transition-colors"
//                         >
//                             <FolderOpen className="w-4 h-4 text-gray-400" />
//                             <span className="text-sm">Shared Files</span>
//                         </button> */}
//             <div className="border-t border-[#2a3942]">
//               <button
//                 onClick={() => {
//                   setShowClearChatModal(true);
//                   setShowHeaderMenu(false);
//                 }}
//                 className="w-full flex items-center gap-3 px-4 py-3 hover:bg-red-600/10 text-left transition-colors"
//               >
//                 <Trash2 className="w-4 h-4" />
//                 <span className="text-sm">Clear Chat</span>
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ChatHeader;

import React, { useState, useEffect } from "react";
import { Trash2, ArrowLeft } from "lucide-react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
const ChatHeader = ({
  selectedGroup,
  totalUsers,
  typingUsers,
  setShowMembers,
  setShowFilesPanel,
  setActiveGroupTab,
  setShowClearChatModal,
  headerRef,
}) => {
  const [showHeaderMenu, setShowHeaderMenu] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const handleClickOutside = () => {
      if (showHeaderMenu) setShowHeaderMenu(false);
    };
    if (showHeaderMenu) document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [showHeaderMenu]);

  const getTypingText = () => {
    if (!typingUsers || typingUsers.length === 0) return null;
    if (typingUsers.length === 1) return `${typingUsers[0].userId} is typing`;
    if (typingUsers.length === 2)
      return `${typingUsers[0].userId} and ${typingUsers[1].userId} are typing...`;
    return `${typingUsers.length} people are typing...`;
  };

  if (!selectedGroup) return null;

  return (
    <div
      ref={headerRef}
      className="sticky top-0 z-30 bg-[#085056] border-b border-white/10 px-3 sm:px-5 py-6 flex items-center justify-between flex-shrink-0 w-full shadow-md shadow-[#085056]/30"
    >
      {/* ── Left: avatar + name + subtitle ── */}
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <button
          onClick={() => {
            setShowMembers(true);
            setShowFilesPanel(false);
          }}
          className="flex items-center gap-3 flex-1 min-w-0 px-2 py-1.5 cursor-pointer text-left"
        >
          <div className="relative shrink-0">
            <button
              onClick={(e) => {
                e.stopPropagation();
                navigate("/dashboard");
              }}
              className="shrink-0 p-2 rounded-xl text-white/70 hover:text-white hover:bg-white/10 border border-transparent hover:border-white/20 transition-all"
              aria-label="Go back"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
          </div>
          {/* Avatar */}
          <div className="relative shrink-0">
            <div className="w-10 h-10 rounded-full ring-2 ring-white/30 overflow-hidden bg-white/10">
              <img
                src="https://res.cloudinary.com/ddefr5owc/image/upload/v1766049897/logo_xwrr9w.png"
                alt={selectedGroup?.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Name + status */}
          <div className="min-w-0 flex-1">
            <h2 className="font-semibold text-white text-[15px] truncate leading-tight tracking-tight">
              {selectedGroup?.name}
            </h2>

            {typingUsers?.length > 0 ? (
              <div className="flex items-center gap-1.5 mt-0.5">
                <p className="text-[12px] text-white/75 font-medium truncate">
                  {getTypingText()}
                </p>
                <div className="flex items-end gap-[3px] pb-px">
                  <span
                    className="w-1 h-1 bg-white/70 rounded-full animate-bounce"
                    style={{ animationDelay: "0ms" }}
                  />
                  <span
                    className="w-1 h-1 bg-white/70 rounded-full animate-bounce"
                    style={{ animationDelay: "150ms" }}
                  />
                  <span
                    className="w-1 h-1 bg-white/70 rounded-full animate-bounce"
                    style={{ animationDelay: "300ms" }}
                  />
                </div>
              </div>
            ) : (
              <p className="text-[12px] text-white/55 mt-0.5 truncate">
                {totalUsers ?? 0} members
              </p>
            )}
          </div>
        </button>
      </div>

      {/* ── Right: three-dot menu ── */}
      <div className="relative shrink-0 ml-2">
        <button
          onClick={(e) => {
            e.stopPropagation();
            setShowHeaderMenu((prev) => !prev);
          }}
          className={`p-2 rounded-xl border transition-all ${showHeaderMenu
              ? "bg-white/20 border-white/30 text-white"
              : "bg-transparent border-transparent text-white/70"
            }`}
        >
          <BsThreeDotsVertical className="w-5 h-5" />
        </button>

        {/* Dropdown */}
        {showHeaderMenu && (
          <div className="absolute right-0 top-full mt-2 w-52 bg-white rounded-2xl shadow-xl shadow-[#085056]/10 border border-[#085056]/12 overflow-hidden z-50">

            {/* Clear chat */}
            <button
              onClick={() => {
                setShowClearChatModal(true);
                setShowHeaderMenu(false);
              }}
              className="w-full flex items-center gap-3 px-4 py-3 text-left group"
            >
              <div className="w-7 h-7 rounded-lg bg-red-50 flex items-center justify-center shrink-0">
                <Trash2 className="w-3.5 h-3.5 text-[#dc2626]" />
              </div>
              <span className="text-[13px] font-medium text-[#dc2626]">
                Clear Chat
              </span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatHeader;