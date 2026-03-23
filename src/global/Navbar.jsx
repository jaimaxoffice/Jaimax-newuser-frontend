import { React, useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import Logo from "/jaimaxlogo.svg";
import { Turn as Hamburger } from "hamburger-react";

const Navbar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  // Close mobile menu when clicking outside or on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024 && isOpen) {
        setIsOpen(false);
      }
    };

    const handleClickOutside = (event) => {
      if (isOpen && !event.target.closest("nav")) {
        setIsOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    document.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen]);

  const closeNavbar = () => {
    setIsOpen(false);
    const navbarCollapse = document.getElementById("navbarNav");
    if (navbarCollapse) {
      navbarCollapse.classList.remove("show");
    }
  };

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
    const navbarCollapse = document.getElementById("navbarNav");
    if (navbarCollapse) {
      navbarCollapse.classList.toggle("show");
    }
  };

  return (
    <nav
      className="sticky top-0 z-[1000] backdrop-blur-[16px] shadow-[0_8px_32px_rgba(0,0,0,0.15)] border-b border-white/10"
      style={{
        background:
          "linear-gradient(135deg, rgba(8,83,89,0.95) 0%, rgba(8,83,89,0.9) 100%)",
        WebkitBackdropFilter: "blur(16px)",
      }}
    >
      <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 xl:px-12">
        <div className="flex items-center justify-between h-14 sm:h-16 lg:h-15">
          {/* Logo */}
          <NavLink
            className="flex-shrink-0 transition-transform duration-300 hover:scale-105 z-10"
            to="/"
            title="Jaimax Coin - Go to Homepage"
            aria-label="Jaimax Coin Home"
          >
            <img
              src={Logo}
              className="h-7 w-auto object-contain max-h-12 transform transition-transform duration-300
             xs:h-8 sm:h-9 md:h-10 lg:h-11 xl:h-12 2xl:h-14
             hover:scale-105 filter drop-shadow-lg"
              alt="Jaimax Coin Logo"
              title="Jaimax Coin – Best Pre-Sale Crypto token in India | Smart Investments"
            />
          </NavLink>

          {/* Desktop navigation */}
          <div className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            <ul className="flex items-center space-x-1 xl:space-x-2">
              <li>
                <NavLink
                  className={({ isActive }) =>
                    isActive && location.pathname === "/" && !location.hash
                      ? "inline-flex items-center text-[#0e0b0b] bg-gradient-to-r from-[#c5d82e] to-[#b8cc26] font-semibold px-3 py-2 xl:px-4 xl:py-1.5 rounded-full mx-0.5 xl:mx-1 transition-all duration-300 ease-in-out text-xs xl:text-sm shadow-lg transform hover:scale-105"
                      : "inline-flex items-center text-white/90 px-3 py-0 xl:px-4 xl:py-1.5 rounded-full  transition-all duration-300 ease-in-out hover:bg-gradient-to-r hover:from-[#c5d82e] hover:to-[#b8cc26] hover:text-[#0e0b0b] hover:shadow-lg hover:scale-105 text-xs xl:text-sm"
                  }
                  aria-current="page"
                  to="/"
                  title="Jaimax Coin - India's Leading Pre-Sale Cryptocurrency Platform"
                  onClick={closeNavbar}
                >
                  Home
                </NavLink>
              </li>

              <li>
                <NavLink
                  className={({ isActive }) =>
                    isActive
                      ? "inline-flex items-center text-[#0e0b0b] bg-gradient-to-r from-[#c5d82e] to-[#b8cc26] font-semibold px-3 py-2 xl:px-4 xl:py-1.5 rounded-full mx-0.5 xl:mx-1 transition-all duration-300 ease-in-out text-xs xl:text-sm shadow-lg transform hover:scale-105"
                      : "inline-flex items-center text-white/90 px-3 py-0 xl:px-4 xl:py-1.5 rounded-full  transition-all duration-300 ease-in-out hover:bg-gradient-to-r hover:from-[#c5d82e] hover:to-[#b8cc26] hover:text-[#0e0b0b] hover:shadow-lg hover:scale-105 text-xs xl:text-sm"
                  }
                  to="/about/"
                  onClick={closeNavbar}
                  title="About Jaimax - Building the Future of Cryptocurrency in India"
                >
                  About
                </NavLink>
              </li>

              <li>
                <NavLink
                  className={({ isActive }) =>
                    isActive
                      ? "inline-flex items-center text-[#0e0b0b] bg-gradient-to-r from-[#c5d82e] to-[#b8cc26] font-semibold px-3 py-2 xl:px-4 xl:py-1.5 rounded-full mx-0.5 xl:mx-1 transition-all duration-300 ease-in-out text-xs xl:text-sm shadow-lg transform hover:scale-105"
                      : "inline-flex items-center text-white/90 px-3 py-0 xl:px-4 xl:py-1.5 rounded-full transition-all duration-300 ease-in-out hover:bg-gradient-to-r hover:from-[#c5d82e] hover:to-[#b8cc26] hover:text-[#0e0b0b] hover:shadow-lg hover:scale-105 text-xs xl:text-sm"
                  }
                  to="/services/"
                  title="Explore Jaimax Coin Services - Trading, Wallet & Investment Solutions"
                  onClick={closeNavbar}
                >
                  Services
                </NavLink>
              </li>

              <li>
                <NavLink
                  className={({ isActive }) =>
                    isActive
                      ? "inline-flex items-center text-[#0e0b0b] bg-gradient-to-r from-[#c5d82e] to-[#b8cc26] font-semibold px-3 py-2 xl:px-4 xl:py-1.5 rounded-full mx-0.5 xl:mx-1 transition-all duration-300 ease-in-out text-xs xl:text-sm shadow-lg transform hover:scale-105"
                      : "inline-flex items-center text-white/90 px-3 py-0 xl:px-4 xl:py-1.5 rounded-full transition-all duration-300 ease-in-out hover:bg-gradient-to-r hover:from-[#c5d82e] hover:to-[#b8cc26] hover:text-[#0e0b0b] hover:shadow-lg hover:scale-105 text-xs xl:text-sm"
                  }
                  to="/features/"
                  title="Jaimax Coin Features - Security, Speed & User-Friendly Interface"
                  onClick={closeNavbar}
                >
                  Features
                </NavLink>
              </li>

              <li>
                <NavLink
                  className={({ isActive }) =>
                    isActive
                      ? "inline-flex items-center text-[#0e0b0b] bg-gradient-to-r from-[#c5d82e] to-[#b8cc26] font-semibold px-3 py-2 xl:px-4 xl:py-2.5 rounded-full mx-0.5 xl:mx-1 transition-all duration-300 ease-in-out text-xs xl:text-sm shadow-lg transform hover:scale-105"
                      : "inline-flex items-center text-white/90 px-3 py-0 xl:px-4 xl:py-1.5 rounded-full transition-all duration-300 ease-in-out hover:bg-gradient-to-r hover:from-[#c5d82e] hover:to-[#b8cc26] hover:text-[#0e0b0b] hover:shadow-lg hover:scale-105 text-xs xl:text-sm"
                  }
                  to="/blog/"
                  title="Jaimax Blog - Latest Crypto News, Insights & Market Analysis"
                  onClick={closeNavbar}
                >
                  Blog
                </NavLink>
              </li>

              <li>
                <NavLink
                  className={({ isActive }) =>
                    isActive
                      ? "inline-flex items-center text-[#0e0b0b] bg-gradient-to-r from-[#c5d82e] to-[#b8cc26] font-semibold px-3 py-2 xl:px-4 xl:py-2.5 rounded-full mx-0.5 xl:mx-1 transition-all duration-300 ease-in-out text-xs xl:text-sm shadow-lg transform hover:scale-105"
                      : "inline-flex items-center text-white/90 px-3 py-0 xl:px-4 xl:py-1.5 rounded-full transition-all duration-300 ease-in-out hover:bg-gradient-to-r hover:from-[#c5d82e] hover:to-[#b8cc26] hover:text-[#0e0b0b] hover:shadow-lg hover:scale-105 text-xs xl:text-sm"
                  }
                  to="/contact/"
                  title="Contact Jaimax - Get Support & Connect with Our Team"
                  onClick={closeNavbar}
                >
                  Contact
                </NavLink>
              </li>

              <li>
                <NavLink
                  className="inline-flex items-center text-white/90 px-3 py-0 xl:px-4 xl:py-1.5 rounded-full transition-all duration-300 ease-in-out hover:bg-gradient-to-r hover:from-[#c5d82e] hover:to-[#b8cc26] hover:text-[#0e0b0b] hover:shadow-lg hover:scale-105 text-xs xl:text-sm whitespace-nowrap"
                  to="/jaimax-whitepaper.pdf"
                  title="Jaimax Coin Whitepaper - Technical Documentation & Roadmap (PDF)"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  White Paper
                </NavLink>
              </li>
            </ul>

            {/* Action buttons */}
            <div className="flex items-center space-x-2 xl:space-x-3 ml-4 xl:ml-6">
              <NavLink
                to="/login"
                onClick={closeNavbar}
                title="Login to Jaimax - Access Your Crypto Account Now"
              >
                <button
                  type="button"
                  className="bg-gradient-to-r from-[#c5d82e] to-[#b8cc26] text-[#0e0b0b] border border-white/20 rounded-full px-4 py-2 xl:px-6 xl:py-1.5 font-semibold transition-all duration-300 ease-in-out backdrop-blur-[4px] hover:shadow-lg hover:scale-105 hover:from-[#b8cc26] hover:to-[#c5d82e] text-xs xl:text-sm whitespace-nowrap"
                  style={{
                    WebkitBackdropFilter: "blur(4px)",
                  }}
                >
                  Login
                </button>
              </NavLink>

              <NavLink
                to="/register"
                onClick={closeNavbar}
                title="Register on Jaimax - Start Your Crypto Investment Journey Today"
              >
                <button
                  type="button"
                  className="bg-gradient-to-r from-[#20934a] to-[#16a34a] text-white border border-white/20 rounded-full px-4 py-2 xl:px-6 xl:py-1.5 font-semibold transition-all duration-300 ease-in-out backdrop-blur-[4px] hover:shadow-lg hover:scale-105 hover:from-[#16a34a] hover:to-[#20934a] text-xs xl:text-sm whitespace-nowrap"
                  style={{
                    WebkitBackdropFilter: "blur(4px)",
                  }}
                >
                  Register
                </button>
              </NavLink>
            </div>
          </div>

          {/* Mobile menu button */}
          <button
            className="lg:hidden p-2 rounded-lg hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all duration-200 z-10"
            type="button"
            onClick={toggleNavbar}
            aria-controls="navbarNav"
            aria-expanded={isOpen}
            aria-label="Toggle navigation menu"
            title="Open navigation menu"
          >
            <Hamburger
              toggled={isOpen}
              toggle={setIsOpen}
              color="#fff"
              duration={0.5}
              size={20}
            />
          </button>
        </div>

        {/* Mobile navigation */}
        <div
          className={`lg:hidden transition-all duration-300 ease-in-out overflow-hidden ${
            isOpen
              ? "max-h-[90vh] opacity-100 visible"
              : "max-h-0 opacity-0 invisible"
          }`}
          id="navbarNav"
        >
          <div className="pb-4 pt-2">
            <div
              className="backdrop-blur-[16px] border border-white/10 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.2)] overflow-hidden mt-2 max-h-[80vh] overflow-y-auto"
              style={{
                background:
                  "linear-gradient(135deg, #085359 0%, rgba(8,83,89,0.95) 100%)",
                WebkitBackdropFilter: "blur(16px)",
              }}
            >
              <ul className="flex flex-col p-3 sm:p-4 space-y-1">
                <li>
                  <NavLink
                    className={({ isActive }) =>
                      isActive && location.pathname === "/" && !location.hash
                        ? "flex items-center justify-center text-[#0e0b0b] bg-gradient-to-r from-[#c5d82e] to-[#b8cc26] font-semibold px-4 py-3 rounded-xl transition-all duration-300 ease-in-out text-sm shadow-lg"
                        : "flex items-center justify-center text-white/90 px-4 py-3 rounded-xl transition-all duration-300 ease-in-out hover:bg-gradient-to-r hover:from-[#c5d82e] hover:to-[#b8cc26] hover:text-[#0e0b0b] hover:shadow-lg text-sm active:scale-95"
                    }
                    aria-current="page"
                    to="/"
                    title="Jaimax Coin - India's Leading Pre-Sale Cryptocurrency Platform"
                    onClick={closeNavbar}
                  >
                    Home
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    className={({ isActive }) =>
                      isActive
                        ? "flex items-center justify-center text-[#0e0b0b] bg-gradient-to-r from-[#c5d82e] to-[#b8cc26] font-semibold px-4 py-3 rounded-xl transition-all duration-300 ease-in-out text-sm shadow-lg"
                        : "flex items-center justify-center text-white/90 px-4 py-3 rounded-xl transition-all duration-300 ease-in-out hover:bg-gradient-to-r hover:from-[#c5d82e] hover:to-[#b8cc26] hover:text-[#0e0b0b] hover:shadow-lg text-sm active:scale-95"
                    }
                    to="/about/"
                    title="About Jaimax - Building the Future of Cryptocurrency in India"
                    onClick={closeNavbar}
                  >
                    About
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    className={({ isActive }) =>
                      isActive
                        ? "flex items-center justify-center text-[#0e0b0b] bg-gradient-to-r from-[#c5d82e] to-[#b8cc26] font-semibold px-4 py-3 rounded-xl transition-all duration-300 ease-in-out text-sm shadow-lg"
                        : "flex items-center justify-center text-white/90 px-4 py-3 rounded-xl transition-all duration-300 ease-in-out hover:bg-gradient-to-r hover:from-[#c5d82e] hover:to-[#b8cc26] hover:text-[#0e0b0b] hover:shadow-lg text-sm active:scale-95"
                    }
                    to="/services/"
                    title="Explore Jaimax Coin Services - Trading, Wallet & Investment Solutions"
                    onClick={closeNavbar}
                  >
                    Services
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    className={({ isActive }) =>
                      isActive
                        ? "flex items-center justify-center text-[#0e0b0b] bg-gradient-to-r from-[#c5d82e] to-[#b8cc26] font-semibold px-4 py-3 rounded-xl transition-all duration-300 ease-in-out text-sm shadow-lg"
                        : "flex items-center justify-center text-white/90 px-4 py-3 rounded-xl transition-all duration-300 ease-in-out hover:bg-gradient-to-r hover:from-[#c5d82e] hover:to-[#b8cc26] hover:text-[#0e0b0b] hover:shadow-lg text-sm active:scale-95"
                    }
                    to="/features/"
                    title="Jaimax Coin Features - Security, Speed & User-Friendly Interface"
                    onClick={closeNavbar}
                  >
                    Features
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    className={({ isActive }) =>
                      isActive
                        ? "flex items-center justify-center text-[#0e0b0b] bg-gradient-to-r from-[#c5d82e] to-[#b8cc26] font-semibold px-4 py-3 rounded-xl transition-all duration-300 ease-in-out text-sm shadow-lg"
                        : "flex items-center justify-center text-white/90 px-4 py-3 rounded-xl transition-all duration-300 ease-in-out hover:bg-gradient-to-r hover:from-[#c5d82e] hover:to-[#b8cc26] hover:text-[#0e0b0b] hover:shadow-lg text-sm active:scale-95"
                    }
                    to="/blog/"
                    title="Jaimax Blog - Latest Crypto News, Insights & Market Analysis"
                    onClick={closeNavbar}
                  >
                    Blog
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    className={({ isActive }) =>
                      isActive
                        ? "flex items-center justify-center text-[#0e0b0b] bg-gradient-to-r from-[#c5d82e] to-[#b8cc26] font-semibold px-4 py-3 rounded-xl transition-all duration-300 ease-in-out text-sm shadow-lg"
                        : "flex items-center justify-center text-white/90 px-4 py-3 rounded-xl transition-all duration-300 ease-in-out hover:bg-gradient-to-r hover:from-[#c5d82e] hover:to-[#b8cc26] hover:text-[#0e0b0b] hover:shadow-lg text-sm active:scale-95"
                    }
                    to="/contact/"
                    title="Contact Jaimax - Get Support & Connect with Our Team"
                    onClick={closeNavbar}
                  >
                    Contact
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    className="flex items-center justify-center text-white/90 px-4 py-3 rounded-xl transition-all duration-300 ease-in-out hover:bg-gradient-to-r hover:from-[#c5d82e] hover:to-[#b8cc26] hover:text-[#0e0b0b] hover:shadow-lg text-sm active:scale-95"
                    to="/jaimax-whitepaper.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Jaimax Coin Whitepaper - Technical Documentation & Roadmap (PDF)"
                    onClick={closeNavbar}
                  >
                    White Paper
                  </NavLink>
                </li>

                <li className="pt-4 border-t border-white/10 mt-4">
                  <div className="flex flex-col space-y-3">
                    <NavLink
                      to="/login"
                      onClick={closeNavbar}
                      title="Login to Jaimax - Access Your Crypto Account Now"
                    >
                      <button
                        type="button"
                        className="w-full bg-gradient-to-r from-[#c5d82e] to-[#b8cc26] text-[#0e0b0b] border border-white/20 rounded-xl px-6 py-3 font-semibold transition-all duration-300 ease-in-out backdrop-blur-[4px] hover:shadow-lg hover:from-[#b8cc26] hover:to-[#c5d82e] text-sm active:scale-95"
                        style={{
                          WebkitBackdropFilter: "blur(4px)",
                        }}
                      >
                        Login
                      </button>
                    </NavLink>

                    <NavLink
                      to="/register"
                      onClick={closeNavbar}
                      title="Register on Jaimax - Start Your Crypto Investment Journey Today"
                    >
                      <button
                        type="button"
                        className="w-full bg-gradient-to-r from-[#20934a] to-[#16a34a] text-white border border-white/20 rounded-xl px-6 py-3 font-semibold transition-all duration-300 ease-in-out backdrop-blur-[4px] hover:shadow-lg hover:from-[#16a34a] hover:to-[#20934a] text-sm active:scale-95"
                        style={{
                          WebkitBackdropFilter: "blur(4px)",
                        }}
                      >
                        Register
                      </button>
                    </NavLink>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

// import { React, useEffect, useState } from "react";
// import { NavLink, useLocation } from "react-router-dom";
// import Logo from "/jaimaxlogo.svg";
// import { Turn as Hamburger } from "hamburger-react";
// import "../pages/home/jaimax-theme.css";

// const Navbar = () => {
//   const location = useLocation();
//   const [isOpen, setIsOpen] = useState(false);

//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, [location]);

//   useEffect(() => {
//     const handleResize = () => {
//       if (window.innerWidth >= 1024 && isOpen) setIsOpen(false);
//     };
//     const handleClickOutside = (e) => {
//       if (isOpen && !e.target.closest("nav")) setIsOpen(false);
//     };
//     window.addEventListener("resize", handleResize);
//     document.addEventListener("click", handleClickOutside);
//     return () => {
//       window.removeEventListener("resize", handleResize);
//       document.removeEventListener("click", handleClickOutside);
//     };
//   }, [isOpen]);

//   const closeNavbar = () => {
//     setIsOpen(false);
//     const el = document.getElementById("navbarNav");
//     if (el) el.classList.remove("show");
//   };

//   const toggleNavbar = () => {
//     setIsOpen(!isOpen);
//     const el = document.getElementById("navbarNav");
//     if (el) el.classList.toggle("show");
//   };

//   const activeLink =
//     "jx-navlink jx-navlink--on flex items-center px-[14px] h-[56px] font-semibold text-[var(--jaimax-primary-soft)] transition";

//   const inactiveLink =
//     "jx-navlink flex items-center px-[14px] h-[56px] font-medium text-gray-300 hover:text-[var(--jaimax-text)] transition";
//   const mobileActive =
// "flex items-center px-[18px] py-[11px] text-[11px] tracking-[.12em] uppercase text-[var(--jaimax-primary-soft)] border-l-2 border-[var(--jaimax-primary)] bg-[rgba(72,207,255,.08)]";

// const mobileInactive =
// "flex items-center px-[18px] py-[11px] text-[11px] tracking-[.12em] uppercase text-[var(--jaimax-muted)] hover:text-[var(--jaimax-text)] hover:bg-[rgba(72,207,255,.05)] border-l-2 border-transparent transition";

//   return (
//     <>
//       <style>{`
// .jx-navlink{
// position:relative;
// }

// /* vertical separators */
// .jx-navlink + .jx-navlink::before{
// content:'';
// position:absolute;
// left:-1px;
// top:30%;
// height:40%;
// width:1px;
// background:rgba(255,255,255,.06);
// }

// /* hover line */
// .jx-navlink:not(.jx-navlink--on):hover::after{
// content:'';
// position:absolute;
// bottom:0;
// left:25%;
// right:25%;
// height:2px;
// background:var(--jaimax-primary);
// opacity:.6;
// }

// /* active diamond */
// .jx-navlink--on::after{
// content:'';
// position:absolute;
// bottom:8px;
// left:50%;
// width:6px;
// height:6px;
// background:var(--jaimax-primary-soft);
// transform:translateX(-50%) rotate(45deg);
// animation:jx-diamond-spin 3.5s linear infinite;
// }

// @keyframes jx-diamond-spin{
// 0%{transform:translateX(-50%) rotate(45deg);}
// 100%{transform:translateX(-50%) rotate(405deg);}
// }

// `}</style>

//       <nav
//         className="
// sticky top-0 z-[1000]
// bg-[rgba(6,12,17,.92)]
// backdrop-blur-md
// border-b border-[var(--jaimax-line)]
// shadow-[0_10px_40px_rgba(0,0,0,.55)]
// font-[Outfit]
// "
//       >
//         <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 xl:px-12">
//           <div className="flex items-center justify-between h-14 sm:h-[56px] lg:h-[56px]">
//             {/* ── Logo ── */}
//             <NavLink
//               className="flex-shrink-0 z-10"
//               style={{ transition: "opacity .2s" }}
//               to="/"
//               title="Jaimax Coin - Go to Homepage"
//               aria-label="Jaimax Coin Home"
//               onMouseEnter={(e) => (e.currentTarget.style.opacity = ".75")}
//               onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
//             >
//               <img
//                 src={Logo}
//                 className="h-7 w-auto object-contain
//                  xs:h-8 sm:h-9 md:h-10 lg:h-[36px] xl:h-[40px] 2xl:h-11"
//                 alt="Jaimax Coin Logo"
//                 title="Jaimax Coin – Best Pre-Sale Crypto token in India | Smart Investments"
//               />
//             </NavLink>

//             {/* ── Desktop nav ── */}
//             <div className="hidden lg:flex items-center">
//               {/* Floating nav links — no box, no chamber */}
//               <nav className="flex items-stretch text-[11px] tracking-[.12em] uppercase text-[var(--jaimax-muted)]">
//                 <NavLink
//                   className={({ isActive }) =>
//                     isActive && location.pathname === "/" && !location.hash
//                       ? activeLink
//                       : inactiveLink
//                   }
//                   aria-current="page"
//                   to="/"
//                   title="Jaimax Coin - India's Leading Pre-Sale Cryptocurrency Platform"
//                   onClick={closeNavbar}
//                 >
//                   Home
//                 </NavLink>

//                 <NavLink
//                   className={({ isActive }) =>
//                     isActive ? activeLink : inactiveLink
//                   }
//                   to="/about/"
//                   onClick={closeNavbar}
//                   title="About Jaimax"
//                 >
//                   About
//                 </NavLink>

//                 <NavLink
//                   className={({ isActive }) =>
//                     isActive ? activeLink : inactiveLink
//                   }
//                   to="/services/"
//                   onClick={closeNavbar}
//                   title="Jaimax Services"
//                 >
//                   Services
//                 </NavLink>

//                 <NavLink
//                   className={({ isActive }) =>
//                     isActive ? activeLink : inactiveLink
//                   }
//                   to="/features/"
//                   onClick={closeNavbar}
//                   title="Jaimax Features"
//                 >
//                   Features
//                 </NavLink>

//                 <NavLink
//                   className={({ isActive }) =>
//                     isActive ? activeLink : inactiveLink
//                   }
//                   to="/blog/"
//                   onClick={closeNavbar}
//                   title="Jaimax Blog"
//                 >
//                   Blog
//                 </NavLink>

//                 <NavLink
//                   className={({ isActive }) =>
//                     isActive ? activeLink : inactiveLink
//                   }
//                   to="/contact/"
//                   onClick={closeNavbar}
//                   title="Contact Jaimax"
//                 >
//                   Contact
//                 </NavLink>

//                 <NavLink
//                   className={inactiveLink + " whitespace-nowrap"}
//                   to="/jaimax-whitepaper.pdf"
//                   title="Jaimax Whitepaper (PDF)"
//                   target="_blank"
//                   rel="noopener noreferrer"
//                 >
//                   Whitepaper
//                 </NavLink>
//               </nav>

//               {/* Gold hairline divider — clean zone separation */}
//               <div className="mx-4 xl:mx-5 w-[1px] h-[26px] bg-gradient-to-b from-transparent via-[var(--jaimax-primary)] to-transparent" />

//               {/* Auth buttons */}
//               <div className="flex items-center gap-2.5">
//                 <NavLink
//                   to="/login"
//                   onClick={closeNavbar}
//                   title="Login to Jaimax"
//                 >
//                   <button
//                     className="
// text-[11px] font-semibold tracking-[.12em] uppercase
// text-gray-300
// border border-[rgba(72,207,255,.25)]
// px-[16px] py-[7px] rounded
// hover:text-[var(--jaimax-primary)]
// hover:border-[var(--jaimax-primary)]
// hover:bg-[rgba(72,207,255,.06)]
// transition
// "
//                   >
//                     Login
//                   </button>
//                 </NavLink>
//                 <NavLink
//                   to="/register"
//                   onClick={closeNavbar}
//                   title="Register on Jaimax"
//                 >
//                   <button
//                     className="
// text-[11px] font-semibold tracking-[.12em] uppercase
// text-[#071420]
// bg-[var(--jaimax-primary)]
// border border-[var(--jaimax-primary)]
// px-[16px] py-[7px] rounded
// hover:bg-[var(--jaimax-primary-soft)]
// hover:border-[var(--jaimax-primary-soft)]
// transition
// "
//                   >
//                     Register
//                   </button>
//                 </NavLink>
//               </div>
//             </div>

//             {/* ── Mobile hamburger ── */}
//             <button
//   className="
//   lg:hidden px-1.5 rounded-md
//   focus:outline-none transition-all duration-200 z-10
//   bg-[rgba(72,207,255,.08)]
//   border border-[rgba(72,207,255,.25)]
//   hover:bg-[rgba(72,207,255,.15)]
//   "
//   type="button"
//   onClick={toggleNavbar}
//   aria-controls="navbarNav"
//   aria-expanded={isOpen}
//   aria-label="Toggle navigation menu"
//   title="Open navigation menu"
// >
//   <Hamburger
//     toggled={isOpen}
//     toggle={setIsOpen}
//     color="#48CFFF"
//     duration={0.35}
//     size={18}
//     className="border border-red-500"
//   />
// </button>
//           </div>

//           {/* ── Mobile panel ── */}
//           <div
//             className={`lg:hidden transition-all duration-300 ease-in-out overflow-hidden ${
//               isOpen
//                 ? "max-h-[90vh] opacity-100 visible"
//                 : "max-h-0 opacity-0 invisible"
//             }`}
//             id="navbarNav"
//           >
//             <div className="pb-4 pt-2">
//               <div
//                 className="
// mt-1
// bg-[#060c11]
// border border-[rgba(72,207,255,.15)]
// rounded-md
// shadow-[0_20px_60px_rgba(0,0,0,.65)]
// max-h-[80vh] overflow-y-auto
// "
//               >
//                 <div className="px-[18px] pt-[14px] pb-[6px] text-[9px] tracking-[.22em] uppercase text-[rgba(188,222,232,.35)] font-semibold">
// Navigation
// </div>

//                 <ul className="flex flex-col">
//                   <li>
//                     <NavLink
//                       className={({ isActive }) =>
//                         isActive && location.pathname === "/" && !location.hash
//                           ? mobileActive
//                           : mobileInactive
//                       }
//                       aria-current="page"
//                       to="/"
//                       title="Home"
//                       onClick={closeNavbar}
//                     >
//                       Home
//                     </NavLink>
//                   </li>
//                   <li>
//                     <NavLink
//                       className={({ isActive }) =>
//                         isActive ? mobileActive : mobileInactive
//                       }
//                       to="/about/"
//                       title="About"
//                       onClick={closeNavbar}
//                     >
//                       About
//                     </NavLink>
//                   </li>
//                   <li>
//                     <NavLink
//                       className={({ isActive }) =>
//                         isActive ? mobileActive : mobileInactive
//                       }
//                       to="/services/"
//                       title="Services"
//                       onClick={closeNavbar}
//                     >
//                       Services
//                     </NavLink>
//                   </li>
//                   <li>
//                     <NavLink
//                       className={({ isActive }) =>
//                         isActive ? mobileActive : mobileInactive
//                       }
//                       to="/features/"
//                       title="Features"
//                       onClick={closeNavbar}
//                     >
//                       Features
//                     </NavLink>
//                   </li>
//                   <li>
//                     <NavLink
//                       className={({ isActive }) =>
//                         isActive ? mobileActive : mobileInactive
//                       }
//                       to="/blog/"
//                       title="Blog"
//                       onClick={closeNavbar}
//                     >
//                       Blog
//                     </NavLink>
//                   </li>
//                   <li>
//                     <NavLink
//                       className={({ isActive }) =>
//                         isActive ? mobileActive : mobileInactive
//                       }
//                       to="/contact/"
//                       title="Contact"
//                       onClick={closeNavbar}
//                     >
//                       Contact
//                     </NavLink>
//                   </li>
//                   <li>
//                     <NavLink
//                       className={mobileInactive}
//                       to="/jaimax-whitepaper.pdf"
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       title="Whitepaper"
//                       onClick={closeNavbar}
//                     >
//                       Whitepaper
//                     </NavLink>
//                   </li>
//                 </ul>

//                 <div className="jx-mob-section">Account</div>
//                 <div className="px-[18px] py-[14px] border-t border-[rgba(72,207,255,.15)] flex flex-col gap-[10px]">
//                   <NavLink to="/login" onClick={closeNavbar}>
//                     <button
// className="
// w-full text-[11px] font-semibold tracking-[.12em] uppercase
// text-[var(--jaimax-muted)]
// border border-[rgba(72,207,255,.25)]
// py-[11px] rounded
// hover:bg-[rgba(72,207,255,.06)]
// hover:text-[var(--jaimax-text)]
// transition
// "
// >
// Login
// </button>
//                   </NavLink>
//                   <NavLink to="/register" onClick={closeNavbar}>
//                     <button
// className="
// w-full text-[11px] font-semibold tracking-[.12em] uppercase
// text-[#071420]
// bg-[var(--jaimax-primary)]
// border border-[var(--jaimax-primary)]
// py-[11px] rounded
// hover:bg-[var(--jaimax-primary-soft)]
// transition
// "
// >
// Register
// </button>
//                   </NavLink>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </nav>
//     </>
//   );
// };

// export default Navbar;
