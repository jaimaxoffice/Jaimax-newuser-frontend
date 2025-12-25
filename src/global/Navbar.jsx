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
              {/* <li>
                <NavLink
                  className={({ isActive }) =>
                    isActive
                      ? "inline-flex items-center text-[#0e0b0b] bg-gradient-to-r from-[#c5d82e] to-[#b8cc26] font-semibold px-3 py-2 xl:px-4 xl:py-1.5 rounded-full mx-0.5 xl:mx-1 transition-all duration-300 ease-in-out text-xs xl:text-sm shadow-lg transform hover:scale-105"
                      : "inline-flex items-center text-white/90 px-3 py-0 xl:px-4 xl:py-1.5 rounded-full  transition-all duration-300 ease-in-out hover:bg-gradient-to-r hover:from-[#c5d82e] hover:to-[#b8cc26] hover:text-[#0e0b0b] hover:shadow-lg hover:scale-105 text-xs xl:text-sm"
                  }
                  to="/landingpage"
                  onClick={closeNavbar}
                  title="About Jaimax - Building the Future of Cryptocurrency in India"
                >
                  Landingpage
                </NavLink>
              </li> */}

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
                to="/login/" 
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
                to="/register/" 
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
                {/* <li>
                  <NavLink
                    className={({ isActive }) =>
                      isActive
                        ? "flex items-center justify-center text-[#0e0b0b] bg-gradient-to-r from-[#c5d82e] to-[#b8cc26] font-semibold px-4 py-3 rounded-xl transition-all duration-300 ease-in-out text-sm shadow-lg"
                        : "flex items-center justify-center text-white/90 px-4 py-3 rounded-xl transition-all duration-300 ease-in-out hover:bg-gradient-to-r hover:from-[#c5d82e] hover:to-[#b8cc26] hover:text-[#0e0b0b] hover:shadow-lg text-sm active:scale-95"
                    }
                    to="/landingpage"
                    title="About Jaimax - Building the Future of Cryptocurrency in India"
                    onClick={closeNavbar}
                  >
                    Landingpage
                  </NavLink>
                </li> */}

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
                      to="/login/" 
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
                      to="/register/" 
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


// import { React, useEffect, useState, useRef } from "react";
// import { NavLink, useLocation } from "react-router-dom";
// import Logo from "../assets/Images/jaimaxlogo1.svg";
// import { Turn as Hamburger } from "hamburger-react";

// const Navbar = () => {
//   const location = useLocation();
//   const [isOpen, setIsOpen] = useState(false);
//   const [show, setShow] = useState(true);
//   const [lastScrollY, setLastScrollY] = useState(0);

//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, [location]);

//   // Control navbar show/hide on scroll
//   useEffect(() => {
//     const controlNavbar = () => {
//       if (typeof window !== 'undefined') {
//         // Current scroll position
//         const currentScrollY = window.scrollY;
        
//         // If scrolling down, hide navbar
//         if (currentScrollY > lastScrollY && currentScrollY > 100) {
//           setShow(false);
//         } 
//         // If scrolling up, show navbar
//         else {
//           setShow(true);
//         }
        
//         // Update last scroll position
//         setLastScrollY(currentScrollY);
//       }
//     };

//     if (typeof window !== 'undefined') {
//       window.addEventListener('scroll', controlNavbar);

//       // Cleanup
//       return () => {
//         window.removeEventListener('scroll', controlNavbar);
//       };
//     }
//   }, [lastScrollY]);

//   // Close mobile menu when clicking outside or on resize
//   useEffect(() => {
//     const handleResize = () => {
//       if (window.innerWidth >= 1024 && isOpen) {
//         setIsOpen(false);
//       }
//     };

//     const handleClickOutside = (event) => {
//       if (isOpen && !event.target.closest("nav")) {
//         setIsOpen(false);
//       }
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
//     const navbarCollapse = document.getElementById("navbarNav");
//     if (navbarCollapse) {
//       navbarCollapse.classList.remove("show");
//     }
//   };

//   const toggleNavbar = () => {
//     setIsOpen(!isOpen);
//     const navbarCollapse = document.getElementById("navbarNav");
//     if (navbarCollapse) {
//       navbarCollapse.classList.toggle("show");
//     }
//   };

//   return (
//     <nav
//       className={`fixed top-0 left-0 right-0 z-[1000] backdrop-blur-[16px] shadow-[0_8px_32px_rgba(0,0,0,0.15)] border-b border-white/10 transition-all duration-300 ease-in-out ${
//         show ? "translate-y-0" : "-translate-y-full"
//       }`}
//       style={{
//         background:
//           "linear-gradient(135deg, rgba(8,83,89,0.95) 0%, rgba(8,83,89,0.9) 100%)",
//         WebkitBackdropFilter: "blur(16px)",
//       }}
//     >
//       <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 xl:px-12">
//         <div className="flex items-center justify-between h-14 sm:h-16 lg:h-15">
//           {/* Rest of your navbar content stays exactly the same */}
//           {/* Logo */}
//           <NavLink
//             className="flex-shrink-0 transition-transform duration-300 hover:scale-105 z-10"
//             to="/"
//             title="Jaimax Coin - Go to Homepage"
//             aria-label="Jaimax Coin Home"
//           >
//             <img
//               src={Logo}
//               className="h-7 w-auto object-contain max-h-12 transform transition-transform duration-300
//              xs:h-8 sm:h-9 md:h-10 lg:h-11 xl:h-12 2xl:h-14
//              hover:scale-105 filter drop-shadow-lg"
//               alt="Jaimax Coin Logo"
//               title="Jaimax Coin – Best Pre-Sale Crypto token in India | Smart Investments"
//             />
//           </NavLink>

//           {/* Desktop navigation */}
//           <div className="hidden lg:flex items-center space-x-1 xl:space-x-2">
//             <ul className="flex items-center space-x-1 xl:space-x-2">
//               <li>
//                 <NavLink
//                   className={({ isActive }) =>
//                     isActive && location.pathname === "/" && !location.hash
//                       ? "inline-flex items-center text-[#0e0b0b] bg-gradient-to-r from-[#c5d82e] to-[#b8cc26] font-semibold px-3 py-2 xl:px-4 xl:py-1.5 rounded-full mx-0.5 xl:mx-1 transition-all duration-300 ease-in-out text-xs xl:text-sm shadow-lg transform hover:scale-105"
//                       : "inline-flex items-center text-white/90 px-3 py-0 xl:px-4 xl:py-1.5 rounded-full  transition-all duration-300 ease-in-out hover:bg-gradient-to-r hover:from-[#c5d82e] hover:to-[#b8cc26] hover:text-[#0e0b0b] hover:shadow-lg hover:scale-105 text-xs xl:text-sm"
//                   }
//                   aria-current="page"
//                   to="/"
//                   title="Jaimax Coin - India's Leading Pre-Sale Cryptocurrency Platform"
//                   onClick={closeNavbar}
//                 >
//                   Home
//                 </NavLink>
//               </li>

//               <li>
//                 <NavLink
//                   className={({ isActive }) =>
//                     isActive
//                       ? "inline-flex items-center text-[#0e0b0b] bg-gradient-to-r from-[#c5d82e] to-[#b8cc26] font-semibold px-3 py-2 xl:px-4 xl:py-1.5 rounded-full mx-0.5 xl:mx-1 transition-all duration-300 ease-in-out text-xs xl:text-sm shadow-lg transform hover:scale-105"
//                       : "inline-flex items-center text-white/90 px-3 py-0 xl:px-4 xl:py-1.5 rounded-full  transition-all duration-300 ease-in-out hover:bg-gradient-to-r hover:from-[#c5d82e] hover:to-[#b8cc26] hover:text-[#0e0b0b] hover:shadow-lg hover:scale-105 text-xs xl:text-sm"
//                   }
//                   to="/about"
//                   onClick={closeNavbar}
//                   title="About Jaimax - Building the Future of Cryptocurrency in India"
//                 >
//                   About
//                 </NavLink>
//               </li>
//               <li>
//                 <NavLink
//                   className={({ isActive }) =>
//                     isActive
//                       ? "inline-flex items-center text-[#0e0b0b] bg-gradient-to-r from-[#c5d82e] to-[#b8cc26] font-semibold px-3 py-2 xl:px-4 xl:py-1.5 rounded-full mx-0.5 xl:mx-1 transition-all duration-300 ease-in-out text-xs xl:text-sm shadow-lg transform hover:scale-105"
//                       : "inline-flex items-center text-white/90 px-3 py-0 xl:px-4 xl:py-1.5 rounded-full  transition-all duration-300 ease-in-out hover:bg-gradient-to-r hover:from-[#c5d82e] hover:to-[#b8cc26] hover:text-[#0e0b0b] hover:shadow-lg hover:scale-105 text-xs xl:text-sm"
//                   }
//                   to="/landingpage"
//                   onClick={closeNavbar}
//                   title="About Jaimax - Building the Future of Cryptocurrency in India"
//                 >
//                   Landingpage
//                 </NavLink>
//               </li>

//               <li>
//                 <NavLink
//                   className={({ isActive }) =>
//                     isActive
//                       ? "inline-flex items-center text-[#0e0b0b] bg-gradient-to-r from-[#c5d82e] to-[#b8cc26] font-semibold px-3 py-2 xl:px-4 xl:py-1.5 rounded-full mx-0.5 xl:mx-1 transition-all duration-300 ease-in-out text-xs xl:text-sm shadow-lg transform hover:scale-105"
//                       : "inline-flex items-center text-white/90 px-3 py-0 xl:px-4 xl:py-1.5 rounded-full transition-all duration-300 ease-in-out hover:bg-gradient-to-r hover:from-[#c5d82e] hover:to-[#b8cc26] hover:text-[#0e0b0b] hover:shadow-lg hover:scale-105 text-xs xl:text-sm"
//                   }
//                   to="/services"
//                   title="Explore Jaimax Coin Services - Trading, Wallet & Investment Solutions"
//                   onClick={closeNavbar}
//                 >
//                   Services
//                 </NavLink>
//               </li>

//               <li>
//                 <NavLink
//                   className={({ isActive }) =>
//                     isActive
//                       ? "inline-flex items-center text-[#0e0b0b] bg-gradient-to-r from-[#c5d82e] to-[#b8cc26] font-semibold px-3 py-2 xl:px-4 xl:py-1.5 rounded-full mx-0.5 xl:mx-1 transition-all duration-300 ease-in-out text-xs xl:text-sm shadow-lg transform hover:scale-105"
//                       : "inline-flex items-center text-white/90 px-3 py-0 xl:px-4 xl:py-1.5 rounded-full transition-all duration-300 ease-in-out hover:bg-gradient-to-r hover:from-[#c5d82e] hover:to-[#b8cc26] hover:text-[#0e0b0b] hover:shadow-lg hover:scale-105 text-xs xl:text-sm"
//                   }
//                   to="/features"
//                   title="Jaimax Coin Features - Security, Speed & User-Friendly Interface"
//                   onClick={closeNavbar}
//                 >
//                   Features
//                 </NavLink>
//               </li>

//               <li>
//                 <NavLink
//                   className={({ isActive }) =>
//                     isActive
//                       ? "inline-flex items-center text-[#0e0b0b] bg-gradient-to-r from-[#c5d82e] to-[#b8cc26] font-semibold px-3 py-2 xl:px-4 xl:py-2.5 rounded-full mx-0.5 xl:mx-1 transition-all duration-300 ease-in-out text-xs xl:text-sm shadow-lg transform hover:scale-105"
//                       : "inline-flex items-center text-white/90 px-3 py-0 xl:px-4 xl:py-1.5 rounded-full transition-all duration-300 ease-in-out hover:bg-gradient-to-r hover:from-[#c5d82e] hover:to-[#b8cc26] hover:text-[#0e0b0b] hover:shadow-lg hover:scale-105 text-xs xl:text-sm"
//                   }
//                   to="/blog"
//                   title="Jaimax Blog - Latest Crypto News, Insights & Market Analysis"
//                   onClick={closeNavbar}
//                 >
//                   Blog
//                 </NavLink>
//               </li>

//               <li>
//                 <NavLink
//                   className={({ isActive }) =>
//                     isActive
//                       ? "inline-flex items-center text-[#0e0b0b] bg-gradient-to-r from-[#c5d82e] to-[#b8cc26] font-semibold px-3 py-2 xl:px-4 xl:py-2.5 rounded-full mx-0.5 xl:mx-1 transition-all duration-300 ease-in-out text-xs xl:text-sm shadow-lg transform hover:scale-105"
//                       : "inline-flex items-center text-white/90 px-3 py-0 xl:px-4 xl:py-1.5 rounded-full transition-all duration-300 ease-in-out hover:bg-gradient-to-r hover:from-[#c5d82e] hover:to-[#b8cc26] hover:text-[#0e0b0b] hover:shadow-lg hover:scale-105 text-xs xl:text-sm"
//                   }
//                   to="/contact"
//                   title="Contact Jaimax - Get Support & Connect with Our Team"
//                   onClick={closeNavbar}
//                 >
//                   Contact
//                 </NavLink>
//               </li>

//               <li>
//                 <NavLink
//                   className="inline-flex items-center text-white/90 px-3 py-0 xl:px-4 xl:py-1.5 rounded-full transition-all duration-300 ease-in-out hover:bg-gradient-to-r hover:from-[#c5d82e] hover:to-[#b8cc26] hover:text-[#0e0b0b] hover:shadow-lg hover:scale-105 text-xs xl:text-sm whitespace-nowrap"
//                   to="/jaimax-whitepaper.pdf"
//                   title="Jaimax Coin Whitepaper - Technical Documentation & Roadmap (PDF)"
//                   target="_blank"
//                   rel="noopener noreferrer"
//                 >
//                   White Paper
//                 </NavLink>
//               </li>
//             </ul>

//             {/* Action buttons */}
//             <div className="flex items-center space-x-2 xl:space-x-3 ml-4 xl:ml-6">
//               <NavLink 
//                 to="/login" 
//                 onClick={closeNavbar}
//                 title="Login to Jaimax - Access Your Crypto Account Now"
//               >
//                 <button
//                   type="button"
//                   className="bg-gradient-to-r from-[#c5d82e] to-[#b8cc26] text-[#0e0b0b] border border-white/20 rounded-full px-4 py-2 xl:px-6 xl:py-1.5 font-semibold transition-all duration-300 ease-in-out backdrop-blur-[4px] hover:shadow-lg hover:scale-105 hover:from-[#b8cc26] hover:to-[#c5d82e] text-xs xl:text-sm whitespace-nowrap"
//                   style={{
//                     WebkitBackdropFilter: "blur(4px)",
//                   }}
//                 >
//                   Login
//                 </button>
//               </NavLink>

//               <NavLink 
//                 to="/register" 
//                 onClick={closeNavbar}
//                 title="Register on Jaimax - Start Your Crypto Investment Journey Today"
//               >
//                 <button
//                   type="button"
//                   className="bg-gradient-to-r from-[#20934a] to-[#16a34a] text-white border border-white/20 rounded-full px-4 py-2 xl:px-6 xl:py-1.5 font-semibold transition-all duration-300 ease-in-out backdrop-blur-[4px] hover:shadow-lg hover:scale-105 hover:from-[#16a34a] hover:to-[#20934a] text-xs xl:text-sm whitespace-nowrap"
//                   style={{
//                     WebkitBackdropFilter: "blur(4px)",
//                   }}
//                 >
//                   Register
//                 </button>
//               </NavLink>
//             </div>
//           </div>

//           {/* Mobile menu button */}
//           <button
//             className="lg:hidden p-2 rounded-lg hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all duration-200 z-10"
//             type="button"
//             onClick={toggleNavbar}
//             aria-controls="navbarNav"
//             aria-expanded={isOpen}
//             aria-label="Toggle navigation menu"
//             title="Open navigation menu"
//           >
//             <Hamburger
//               toggled={isOpen}
//               toggle={setIsOpen}
//               color="#fff"
//               duration={0.5}
//               size={20}
//             />
//           </button>
//         </div>

//         {/* Mobile navigation - stays the same */}
//         <div
//           className={`lg:hidden transition-all duration-300 ease-in-out overflow-hidden ${
//             isOpen
//               ? "max-h-[90vh] opacity-100 visible"
//               : "max-h-0 opacity-0 invisible"
//           }`}
//           id="navbarNav"
//         >
//           <div className="pb-4 pt-2">
//             <div
//               className="backdrop-blur-[16px] border border-white/10 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.2)] overflow-hidden mt-2 max-h-[80vh] overflow-y-auto"
//               style={{
//                 background:
//                   "linear-gradient(135deg, #085359 0%, rgba(8,83,89,0.95) 100%)",
//                 WebkitBackdropFilter: "blur(16px)",
//               }}
//             >
//               <ul className="flex flex-col p-3 sm:p-4 space-y-1">
//                 <li>
//                   <NavLink
//                     className={({ isActive }) =>
//                       isActive && location.pathname === "/" && !location.hash
//                         ? "flex items-center justify-center text-[#0e0b0b] bg-gradient-to-r from-[#c5d82e] to-[#b8cc26] font-semibold px-4 py-3 rounded-xl transition-all duration-300 ease-in-out text-sm shadow-lg"
//                         : "flex items-center justify-center text-white/90 px-4 py-3 rounded-xl transition-all duration-300 ease-in-out hover:bg-gradient-to-r hover:from-[#c5d82e] hover:to-[#b8cc26] hover:text-[#0e0b0b] hover:shadow-lg text-sm active:scale-95"
//                     }
//                     aria-current="page"
//                     to="/"
//                     title="Jaimax Coin - India's Leading Pre-Sale Cryptocurrency Platform"
//                     onClick={closeNavbar}
//                   >
//                     Home
//                   </NavLink>
//                 </li>

//                 <li>
//                   <NavLink
//                     className={({ isActive }) =>
//                       isActive
//                         ? "flex items-center justify-center text-[#0e0b0b] bg-gradient-to-r from-[#c5d82e] to-[#b8cc26] font-semibold px-4 py-3 rounded-xl transition-all duration-300 ease-in-out text-sm shadow-lg"
//                         : "flex items-center justify-center text-white/90 px-4 py-3 rounded-xl transition-all duration-300 ease-in-out hover:bg-gradient-to-r hover:from-[#c5d82e] hover:to-[#b8cc26] hover:text-[#0e0b0b] hover:shadow-lg text-sm active:scale-95"
//                     }
//                     to="/about"
//                     title="About Jaimax - Building the Future of Cryptocurrency in India"
//                     onClick={closeNavbar}
//                   >
//                     About
//                   </NavLink>
//                 </li>
//                 <li>
//                   <NavLink
//                     className={({ isActive }) =>
//                       isActive
//                         ? "flex items-center justify-center text-[#0e0b0b] bg-gradient-to-r from-[#c5d82e] to-[#b8cc26] font-semibold px-4 py-3 rounded-xl transition-all duration-300 ease-in-out text-sm shadow-lg"
//                         : "flex items-center justify-center text-white/90 px-4 py-3 rounded-xl transition-all duration-300 ease-in-out hover:bg-gradient-to-r hover:from-[#c5d82e] hover:to-[#b8cc26] hover:text-[#0e0b0b] hover:shadow-lg text-sm active:scale-95"
//                     }
//                     to="/landingpage"
//                     title="About Jaimax - Building the Future of Cryptocurrency in India"
//                     onClick={closeNavbar}
//                   >
//                     Landingpage
//                   </NavLink>
//                 </li>

//                 <li>
//                   <NavLink
//                     className={({ isActive }) =>
//                       isActive
//                         ? "flex items-center justify-center text-[#0e0b0b] bg-gradient-to-r from-[#c5d82e] to-[#b8cc26] font-semibold px-4 py-3 rounded-xl transition-all duration-300 ease-in-out text-sm shadow-lg"
//                         : "flex items-center justify-center text-white/90 px-4 py-3 rounded-xl transition-all duration-300 ease-in-out hover:bg-gradient-to-r hover:from-[#c5d82e] hover:to-[#b8cc26] hover:text-[#0e0b0b] hover:shadow-lg text-sm active:scale-95"
//                     }
//                     to="/services/"
//                     title="Explore Jaimax Coin Services - Trading, Wallet & Investment Solutions"
//                     onClick={closeNavbar}
//                   >
//                     Services
//                   </NavLink>
//                 </li>

//                 <li>
//                   <NavLink
//                     className={({ isActive }) =>
//                       isActive
//                         ? "flex items-center justify-center text-[#0e0b0b] bg-gradient-to-r from-[#c5d82e] to-[#b8cc26] font-semibold px-4 py-3 rounded-xl transition-all duration-300 ease-in-out text-sm shadow-lg"
//                         : "flex items-center justify-center text-white/90 px-4 py-3 rounded-xl transition-all duration-300 ease-in-out hover:bg-gradient-to-r hover:from-[#c5d82e] hover:to-[#b8cc26] hover:text-[#0e0b0b] hover:shadow-lg text-sm active:scale-95"
//                     }
//                     to="/features"
//                     title="Jaimax Coin Features - Security, Speed & User-Friendly Interface"
//                     onClick={closeNavbar}
//                   >
//                     Features
//                   </NavLink>
//                 </li>

//                 <li>
//                   <NavLink
//                     className={({ isActive }) =>
//                       isActive
//                         ? "flex items-center justify-center text-[#0e0b0b] bg-gradient-to-r from-[#c5d82e] to-[#b8cc26] font-semibold px-4 py-3 rounded-xl transition-all duration-300 ease-in-out text-sm shadow-lg"
//                         : "flex items-center justify-center text-white/90 px-4 py-3 rounded-xl transition-all duration-300 ease-in-out hover:bg-gradient-to-r hover:from-[#c5d82e] hover:to-[#b8cc26] hover:text-[#0e0b0b] hover:shadow-lg text-sm active:scale-95"
//                     }
//                     to="/blog/"
//                     title="Jaimax Blog - Latest Crypto News, Insights & Market Analysis"
//                     onClick={closeNavbar}
//                   >
//                     Blog
//                   </NavLink>
//                 </li>

//                 <li>
//                   <NavLink
//                     className={({ isActive }) =>
//                       isActive
//                         ? "flex items-center justify-center text-[#0e0b0b] bg-gradient-to-r from-[#c5d82e] to-[#b8cc26] font-semibold px-4 py-3 rounded-xl transition-all duration-300 ease-in-out text-sm shadow-lg"
//                         : "flex items-center justify-center text-white/90 px-4 py-3 rounded-xl transition-all duration-300 ease-in-out hover:bg-gradient-to-r hover:from-[#c5d82e] hover:to-[#b8cc26] hover:text-[#0e0b0b] hover:shadow-lg text-sm active:scale-95"
//                     }
//                     to="/contact"
//                     title="Contact Jaimax - Get Support & Connect with Our Team"
//                     onClick={closeNavbar}
//                   >
//                     Contact
//                   </NavLink>
//                 </li>

//                 <li>
//                   <NavLink
//                     className="flex items-center justify-center text-white/90 px-4 py-3 rounded-xl transition-all duration-300 ease-in-out hover:bg-gradient-to-r hover:from-[#c5d82e] hover:to-[#b8cc26] hover:text-[#0e0b0b] hover:shadow-lg text-sm active:scale-95"
//                     to="/jaimax-whitepaper.pdf"
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     title="Jaimax Coin Whitepaper - Technical Documentation & Roadmap (PDF)"
//                     onClick={closeNavbar}
//                   >
//                     White Paper
//                   </NavLink>
//                 </li>

//                 <li className="pt-4 border-t border-white/10 mt-4">
//                   <div className="flex flex-col space-y-3">
//                     <NavLink 
//                       to="/login" 
//                       onClick={closeNavbar}
//                       title="Login to Jaimax - Access Your Crypto Account Now"
//                     >
//                       <button
//                         type="button"
//                         className="w-full bg-gradient-to-r from-[#c5d82e] to-[#b8cc26] text-[#0e0b0b] border border-white/20 rounded-xl px-6 py-3 font-semibold transition-all duration-300 ease-in-out backdrop-blur-[4px] hover:shadow-lg hover:from-[#b8cc26] hover:to-[#c5d82e] text-sm active:scale-95"
//                         style={{
//                           WebkitBackdropFilter: "blur(4px)",
//                         }}
//                       >
//                         Login
//                       </button>
//                     </NavLink>

//                     <NavLink 
//                       to="/register" 
//                       onClick={closeNavbar}
//                       title="Register on Jaimax - Start Your Crypto Investment Journey Today"
//                     >
//                       <button
//                         type="button"
//                         className="w-full bg-gradient-to-r from-[#20934a] to-[#16a34a] text-white border border-white/20 rounded-xl px-6 py-3 font-semibold transition-all duration-300 ease-in-out backdrop-blur-[4px] hover:shadow-lg hover:from-[#16a34a] hover:to-[#20934a] text-sm active:scale-95"
//                         style={{
//                           WebkitBackdropFilter: "blur(4px)",
//                         }}
//                       >
//                         Register
//                       </button>
//                     </NavLink>
//                   </div>
//                 </li>
//               </ul>
//             </div>
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;