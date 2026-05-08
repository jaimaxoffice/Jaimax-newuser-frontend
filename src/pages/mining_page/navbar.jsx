// import { useState, useEffect } from "react";

// const navLinks = ["Why Mining", "Shop", "Wallet", "Blog", "Accessories"];

// export default function Navbar() {
//   const [scrolled, setScrolled] = useState(false);

//   useEffect(() => {
//     const onScroll = () => setScrolled(window.scrollY > 10);
//     window.addEventListener("scroll", onScroll, { passive: true });
//     return () => window.removeEventListener("scroll", onScroll);
//   }, []);

//   const Logo = () => (
//   <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
//     <circle cx="14" cy="14" r="10" fill="#f46b1a" />
//     <circle cx="26" cy="10" r="5" fill="#f46b1a" opacity="0.7" />
//     <circle cx="10" cy="26" r="4" fill="#f46b1a" opacity="0.5" />
//   </svg>
// );

//   return (
//     <nav
//       className="sticky top-0 z-50 w-full transition-all duration-300"
//       style={{
//         background: scrolled ? "var(--clr-nav-scrolled)" : "transparent",
//         backdropFilter: scrolled ? "blur(14px)" : "none",
//         WebkitBackdropFilter: scrolled ? "blur(14px)" : "none",
//         boxShadow: scrolled ? "0 2px 20px rgba(0,0,0,0.06)" : "none",
//         fontFamily: "var(--font-body)",
//       }}
//     >
//       <div className="max-w-7xl mx-auto px-8 h-[68px] flex items-center justify-between">
//         {/* Logo */}
//         <div className="flex items-center gap-2">
//               <Logo />
//               <span
//                 className="text-xl font-bold"
//                 style={{ fontFamily: "var(--font-heading)", color: "var(--clr-text)" }}
//               >
//                 Jaimax
//               </span>
//         </div>
//         <div className="flex w-full justify-end gap-6 items-center">
//         {/* Nav Links */}
//         <ul className="hidden md:flex items-center gap-10">
//           {navLinks.map((link) => (
//             <li key={link}>
//               <a
//                 href="#"
//                 className="text-sm font-medium transition-opacity duration-200 hover:opacity-50"
//                 style={{ color: "var(--clr-text)" }}
//               >
//                 {link}
//               </a>
//             </li>
//           ))}
//         </ul>

//         {/* Get Started */}
//         <div className="flex items-center gap-3">
//           <span
//             className="hidden sm:block text-[15px] font-bold"
//             style={{ color: "var(--clr-navy)" }}
//           >
//             Get Started
//           </span>
//           <button
//             className="w-11 h-11 rounded-[10px] flex items-center justify-center transition-opacity hover:opacity-80"
//             style={{ background: "var(--clr-navy)" }}
//             aria-label="Get Started"
//           >
//             <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
//               <path
//                 d="M3 8h10M9 4l4 4-4 4"
//                 stroke="white"
//                 strokeWidth="1.8"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//               />
//             </svg>
//           </button>
//         </div>
//         </div>
//       </div>
//     </nav>
//   );
// }

import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Home,
  Pickaxe,
  Wallet,
  BookOpen,
  ArrowRight,
  Menu,
  X,
} from "lucide-react";

const navLinks = [
  { label: "Home",       href: "/mineLanding",  icon: Home },
  { label: "Why Mining", href: "/whymining",    icon: Pickaxe },
  { label: "Wallet",     href: "/minewallet",   icon: Wallet },
  { label: "Blog",       href: "/mineblog",     icon: BookOpen },
];

const Logo = () => (
  <svg width="32" height="32" viewBox="0 0 36 36" fill="none">
    <circle cx="14" cy="14" r="10" fill="#f46b1a" />
    <circle cx="26" cy="10" r="5" fill="#f46b1a" opacity="0.7" />
    <circle cx="10" cy="26" r="4" fill="#f46b1a" opacity="0.5" />
  </svg>
);

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 1024) setMenuOpen(false); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <div className="sticky top-0 z-50 w-full flex flex-col items-center px-4 pt-3 pb-2">

      {/* ── Floating pill bar ── */}
      <nav
        className={`w-full max-w-3xl rounded-2xl border transition-all duration-300 ${
          scrolled || menuOpen
            ? "bg-white/90 backdrop-blur-xl border-[#16213e]/10 shadow-[0_8px_32px_rgba(22,33,62,0.10)]"
            : "bg-white/80 backdrop-blur-md border-[#16213e]/08 shadow-[0_2px_16px_rgba(22,33,62,0.07)]"
        }`}
      >
        <div className="h-[56px] px-3 flex items-center justify-between gap-2">

          {/* Logo + divider */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <Link to="/mineLanding" className="flex items-center gap-2 no-underline">
              <Logo />
              <span className="text-[15px] font-extrabold text-[#1a1f2e] tracking-tight hidden sm:block">
                Jaimax
              </span>
            </Link>
            <div className="w-px h-5 bg-[#16213e]/10 hidden lg:block" />
          </div>

          {/* Desktop nav links */}
          <ul className="hidden lg:flex items-center gap-0.5 list-none m-0 p-0 flex-1 justify-center">
            {navLinks.map(({ label, href, icon: Icon }) => {
              const isActive = location.pathname === href;
              return (
                <li key={href}>
                  <Link
                    to={href}
                    className={`flex items-center gap-1.5 px-3.5 py-2 text-[13px] font-medium rounded-xl transition-all duration-200 no-underline
                      ${isActive
                        ? "bg-[#16213e]/[0.07] text-[#16213e] font-semibold"
                        : "text-[#1a1f2e]/60 hover:text-[#1a1f2e] hover:bg-[#16213e]/[0.04]"
                      }`}
                  >
                    <Icon
                      size={14}
                      className={isActive ? "text-[#f46b1a]" : "text-current"}
                      strokeWidth={isActive ? 2.2 : 1.8}
                    />
                    {label}
                    {isActive && (
                      <span className="ml-0.5 w-1 h-1 rounded-full bg-[#f46b1a] flex-shrink-0" />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Desktop right: Log In + Sign Up */}
          <div className="hidden lg:flex items-center gap-2 flex-shrink-0">
            <button className="px-4 py-2 text-[13px] font-medium text-[#1a1f2e]/60 hover:text-[#1a1f2e] rounded-xl hover:bg-[#16213e]/[0.04] transition-all duration-200 border-0 bg-transparent cursor-pointer">
              Log In
            </button>
            <button className="group flex items-center gap-2 pl-4 pr-3 py-2 rounded-xl text-[13px] font-semibold text-white border-0 cursor-pointer bg-[#16213e] hover:bg-[#1e3057] hover:shadow-[0_4px_16px_rgba(22,33,62,0.30)] hover:-translate-y-px active:scale-[0.97] transition-all duration-200">
              Get Started
              <span className="w-5 h-5 rounded-md flex items-center justify-center bg-white/10 group-hover:bg-white/20 group-hover:translate-x-0.5 transition-all duration-200 flex-shrink-0">
                <ArrowRight size={11} strokeWidth={2.4} />
              </span>
            </button>
          </div>

          {/* Mobile: hamburger */}
          <button
            className={`lg:hidden flex items-center justify-center w-9 h-9 rounded-xl transition-colors duration-150 border-0 cursor-pointer text-[#1a1f2e] ${
              menuOpen ? "bg-[#16213e]/[0.07]" : "bg-transparent hover:bg-[#16213e]/[0.04]"
            }`}
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={18} strokeWidth={2} /> : <Menu size={18} strokeWidth={1.8} />}
          </button>
        </div>

        {/* Mobile drawer */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ${
            menuOpen ? "max-h-[360px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="px-3 pt-1 pb-3 flex flex-col gap-0.5 border-t border-[#16213e]/[0.06]">
            {navLinks.map(({ label, href, icon: Icon }) => {
              const isActive = location.pathname === href;
              return (
                <Link
                  key={href}
                  to={href}
                  onClick={() => setMenuOpen(false)}
                  className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-[13px] font-medium transition-colors duration-150 no-underline
                    ${isActive
                      ? "bg-[#16213e]/[0.07] text-[#16213e] font-semibold"
                      : "text-[#1a1f2e]/60 hover:text-[#1a1f2e] hover:bg-[#16213e]/[0.04]"
                    }`}
                >
                  <Icon
                    size={14}
                    className={isActive ? "text-[#f46b1a]" : "text-current"}
                    strokeWidth={isActive ? 2.2 : 1.8}
                  />
                  {label}
                  {isActive && (
                    <span className="ml-auto w-1 h-1 rounded-full bg-[#f46b1a]" />
                  )}
                </Link>
              );
            })}

            <div className="pt-2 flex flex-col gap-1.5 border-t border-[#16213e]/[0.06] mt-1">
              <button className="w-full px-4 py-2.5 text-[13px] font-medium text-[#1a1f2e]/60 hover:text-[#1a1f2e] rounded-xl hover:bg-[#16213e]/[0.04] transition-all duration-200 border-0 bg-transparent cursor-pointer text-left">
                Log In
              </button>
              <button className="group w-full flex items-center justify-between pl-4 pr-3 py-2.5 rounded-xl text-[13px] font-semibold text-white border-0 cursor-pointer bg-[#16213e] hover:bg-[#1e3057] transition-all duration-200">
                Get Started
                <span className="w-5 h-5 rounded-md flex items-center justify-center bg-white/10 group-hover:bg-white/20 group-hover:translate-x-0.5 transition-all duration-200">
                  <ArrowRight size={11} strokeWidth={2.4} />
                </span>
              </button>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}