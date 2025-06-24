// Navbar.jsx
import { React, useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import Logo from "../assets/Images/logo.svg";
import { Turn as Hamburger } from "hamburger-react";

const Navbar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

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
          background: 'linear-gradient(135deg, rgba(8,83,89,0.95) 0%, rgba(8,83,89,0.9) 100%)',
          WebkitBackdropFilter: 'blur(16px)' 
      }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <NavLink 
            className="flex-shrink-0 transition-transform duration-300 hover:scale-105" 
            to="/"
          >
            <img 
              src={Logo} 
              className="h-8 w-auto sm:h-10 lg:h-12 filter drop-shadow-lg" 
              alt="Logo" 
            />
          </NavLink>

          {/* Desktop navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            <ul className="flex items-center space-x-1">
              <li>
                <NavLink
                  className={({ isActive }) =>
                    isActive && location.pathname === "/" && !location.hash
                      ? "inline-flex items-center text-[#0e0b0b] bg-gradient-to-r from-[#c5d82e] to-[#b8cc26] font-semibold px-4 py-2.5 rounded-full mx-1 transition-all duration-300 ease-in-out text-sm shadow-lg transform hover:scale-105"
                      : "inline-flex items-center text-white/90 px-4 py-2.5 rounded-full mx-1 transition-all duration-300 ease-in-out hover:bg-gradient-to-r hover:from-[#c5d82e] hover:to-[#b8cc26] hover:text-[#0e0b0b] hover:shadow-lg hover:scale-105 text-sm"
                  }
                  aria-current="page"
                  to="/"
                  onClick={closeNavbar}
                >
                  Home
                </NavLink>
              </li>

              <li>
                <NavLink
                  className={({ isActive }) =>
                    isActive
                      ? "inline-flex items-center text-[#0e0b0b] bg-gradient-to-r from-[#c5d82e] to-[#b8cc26] font-semibold px-4 py-2.5 rounded-full mx-1 transition-all duration-300 ease-in-out text-sm shadow-lg transform hover:scale-105"
                      : "inline-flex items-center text-white/90 px-4 py-2.5 rounded-full mx-1 transition-all duration-300 ease-in-out hover:bg-gradient-to-r hover:from-[#c5d82e] hover:to-[#b8cc26] hover:text-[#0e0b0b] hover:shadow-lg hover:scale-105 text-sm"
                  }
                  to="/about"
                  onClick={closeNavbar}
                >
                  About
                </NavLink>
              </li>

              <li>
                <NavLink
                  className={({ isActive }) =>
                    isActive 
                      ? "inline-flex items-center text-[#0e0b0b] bg-gradient-to-r from-[#c5d82e] to-[#b8cc26] font-semibold px-4 py-2.5 rounded-full mx-1 transition-all duration-300 ease-in-out text-sm shadow-lg transform hover:scale-105"
                      : "inline-flex items-center text-white/90 px-4 py-2.5 rounded-full mx-1 transition-all duration-300 ease-in-out hover:bg-gradient-to-r hover:from-[#c5d82e] hover:to-[#b8cc26] hover:text-[#0e0b0b] hover:shadow-lg hover:scale-105 text-sm"
                  }
                  to="/services"
                  onClick={closeNavbar}
                >
                  Services
                </NavLink>
              </li>

              <li>
                <NavLink
                  className={({ isActive }) =>
                    isActive
                      ? "inline-flex items-center text-[#0e0b0b] bg-gradient-to-r from-[#c5d82e] to-[#b8cc26] font-semibold px-4 py-2.5 rounded-full mx-1 transition-all duration-300 ease-in-out text-sm shadow-lg transform hover:scale-105"
                      : "inline-flex items-center text-white/90 px-4 py-2.5 rounded-full mx-1 transition-all duration-300 ease-in-out hover:bg-gradient-to-r hover:from-[#c5d82e] hover:to-[#b8cc26] hover:text-[#0e0b0b] hover:shadow-lg hover:scale-105 text-sm"
                  }
                  to="/features"
                  onClick={closeNavbar}
                >
                  Features
                </NavLink>
              </li>

              <li>
                <NavLink
                  className={({ isActive }) =>
                    isActive
                      ? "inline-flex items-center text-[#0e0b0b] bg-gradient-to-r from-[#c5d82e] to-[#b8cc26] font-semibold px-4 py-2.5 rounded-full mx-1 transition-all duration-300 ease-in-out text-sm shadow-lg transform hover:scale-105"
                      : "inline-flex items-center text-white/90 px-4 py-2.5 rounded-full mx-1 transition-all duration-300 ease-in-out hover:bg-gradient-to-r hover:from-[#c5d82e] hover:to-[#b8cc26] hover:text-[#0e0b0b] hover:shadow-lg hover:scale-105 text-sm"
                  }
                  to="/blog"
                  onClick={closeNavbar}
                >
                  Blog
                </NavLink>
              </li>

              <li>
                <NavLink
                  className={({ isActive }) =>
                    isActive
                      ? "inline-flex items-center text-[#0e0b0b] bg-gradient-to-r from-[#c5d82e] to-[#b8cc26] font-semibold px-4 py-2.5 rounded-full mx-1 transition-all duration-300 ease-in-out text-sm shadow-lg transform hover:scale-105"
                      : "inline-flex items-center text-white/90 px-4 py-2.5 rounded-full mx-1 transition-all duration-300 ease-in-out hover:bg-gradient-to-r hover:from-[#c5d82e] hover:to-[#b8cc26] hover:text-[#0e0b0b] hover:shadow-lg hover:scale-105 text-sm"
                  }
                  to="/contact"
                  onClick={closeNavbar}
                >
                  Contact
                </NavLink>
              </li>

              <li>
                <NavLink
                  className="inline-flex items-center text-white/90 px-4 py-2.5 rounded-full mx-1 transition-all duration-300 ease-in-out hover:bg-gradient-to-r hover:from-[#c5d82e] hover:to-[#b8cc26] hover:text-[#0e0b0b] hover:shadow-lg hover:scale-105 text-sm"
                  to="/images/white_paper.pdf"
                  target="_blank"
                >
                  White Paper
                </NavLink>
              </li>
            </ul>

            {/* Action buttons */}
            <div className="flex items-center space-x-3 ml-6">
              <NavLink to="/login" onClick={closeNavbar}>
                <button
                  type="button" 
                  className="bg-gradient-to-r from-[#c5d82e] to-[#b8cc26] text-[#0e0b0b] border border-white/20 rounded-full px-6 py-2.5 font-semibold transition-all duration-300 ease-in-out backdrop-blur-[4px] hover:shadow-lg hover:scale-105 hover:from-[#b8cc26] hover:to-[#c5d82e] text-sm"
                  style={{ 
                    WebkitBackdropFilter: 'blur(4px)' 
                  }}
                >
                  Login
                </button>
              </NavLink>

              <NavLink to="/register" onClick={closeNavbar}>
                <button
                  type="button"
                  className="bg-gradient-to-r from-[#20934a] to-[#16a34a] text-white border border-white/20 rounded-full px-6 py-2.5 font-semibold transition-all duration-300 ease-in-out backdrop-blur-[4px] hover:shadow-lg hover:scale-105 hover:from-[#16a34a] hover:to-[#20934a] text-sm"
                  style={{ 
                    WebkitBackdropFilter: 'blur(4px)' 
                  }}
                >
                  Register
                </button>
              </NavLink>
            </div>
          </div>

          {/* Mobile menu button */}
          <button
            className="lg:hidden p-2 rounded-lg hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all duration-200"
            type="button"
            onClick={toggleNavbar}
            aria-controls="navbarNav"
            aria-expanded={isOpen}
            aria-label="Toggle navigation"
          >
            <Hamburger 
              toggled={isOpen} 
              toggle={setIsOpen} 
              color="#fff" 
              duration={0.5} 
              size={24} 
            />
          </button>
        </div>

        {/* Mobile navigation */}
        <div 
          className={`lg:hidden transition-all duration-300 ease-in-out overflow-hidden ${
            isOpen ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'
          }`}
          id="navbarNav"
        >
          <div className="pb-4 pt-2">
            <div className="backdrop-blur-[16px] border border-white/10 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.2)] overflow-hidden mt-2"
                 style={{ 
                   background: 'linear-gradient(135deg, rgba(8,83,89,0.98) 0%, rgba(8,83,89,0.95) 100%)',
                   WebkitBackdropFilter: 'blur(16px)' 
                 }}>
              <ul className="flex flex-col p-4 space-y-1">
                <li>
                  <NavLink
                    className={({ isActive }) =>
                      isActive && location.pathname === "/" && !location.hash
                        ? "flex items-center justify-center text-[#0e0b0b] bg-gradient-to-r from-[#c5d82e] to-[#b8cc26] font-semibold px-4 py-3 rounded-xl transition-all duration-300 ease-in-out text-sm shadow-lg"
                        : "flex items-center justify-center text-white/90 px-4 py-3 rounded-xl transition-all duration-300 ease-in-out hover:bg-gradient-to-r hover:from-[#c5d82e] hover:to-[#b8cc26] hover:text-[#0e0b0b] hover:shadow-lg text-sm"
                    }
                    aria-current="page"
                    to="/"
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
                        : "flex items-center justify-center text-white/90 px-4 py-3 rounded-xl transition-all duration-300 ease-in-out hover:bg-gradient-to-r hover:from-[#c5d82e] hover:to-[#b8cc26] hover:text-[#0e0b0b] hover:shadow-lg text-sm"
                    }
                    to="/about"
                    onClick={closeNavbar}
                  >
                    About
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    className={({ isActive }) =>
                      isActive && location.hash === "services"
                        ? "flex items-center justify-center text-[#0e0b0b] bg-gradient-to-r from-[#c5d82e] to-[#b8cc26] font-semibold px-4 py-3 rounded-xl transition-all duration-300 ease-in-out text-sm shadow-lg"
                        : "flex items-center justify-center text-white/90 px-4 py-3 rounded-xl transition-all duration-300 ease-in-out hover:bg-gradient-to-r hover:from-[#c5d82e] hover:to-[#b8cc26] hover:text-[#0e0b0b] hover:shadow-lg text-sm"
                    }
                    to="/services"
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
                        : "flex items-center justify-center text-white/90 px-4 py-3 rounded-xl transition-all duration-300 ease-in-out hover:bg-gradient-to-r hover:from-[#c5d82e] hover:to-[#b8cc26] hover:text-[#0e0b0b] hover:shadow-lg text-sm"
                    }
                    to="/features"
                    onClick={closeNavbar}
                  >
                    Features
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    className={({ isActive }) =>
                      isActive && location.hash === "blog"
                        ? "flex items-center justify-center text-[#0e0b0b] bg-gradient-to-r from-[#c5d82e] to-[#b8cc26] font-semibold px-4 py-3 rounded-xl transition-all duration-300 ease-in-out text-sm shadow-lg"
                        : "flex items-center justify-center text-white/90 px-4 py-3 rounded-xl transition-all duration-300 ease-in-out hover:bg-gradient-to-r hover:from-[#c5d82e] hover:to-[#b8cc26] hover:text-[#0e0b0b] hover:shadow-lg text-sm"
                    }
                    to="/blog"
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
                        : "flex items-center justify-center text-white/90 px-4 py-3 rounded-xl transition-all duration-300 ease-in-out hover:bg-gradient-to-r hover:from-[#c5d82e] hover:to-[#b8cc26] hover:text-[#0e0b0b] hover:shadow-lg text-sm"
                    }
                    to="/contact"
                    onClick={closeNavbar}
                  >
                    Contact
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    className="flex items-center justify-center text-white/90 px-4 py-3 rounded-xl transition-all duration-300 ease-in-out hover:bg-gradient-to-r hover:from-[#c5d82e] hover:to-[#b8cc26] hover:text-[#0e0b0b] hover:shadow-lg text-sm"
                    to="/images/white_paper.pdf"
                    target="_blank"
                    onClick={closeNavbar}
                  >
                    White Paper
                  </NavLink>
                </li>

                <li className="pt-4 border-t border-white/10 mt-4">
                  <div className="flex flex-col space-y-3">
                    <NavLink to="/login" onClick={closeNavbar}>
                      <button
                        type="button"
                        className="w-full bg-gradient-to-r from-[#c5d82e] to-[#b8cc26] text-[#0e0b0b] border border-white/20 rounded-xl px-6 py-3 font-semibold transition-all duration-300 ease-in-out backdrop-blur-[4px] hover:shadow-lg hover:from-[#b8cc26] hover:to-[#c5d82e] text-sm"
                        style={{ 
                          WebkitBackdropFilter: 'blur(4px)' 
                        }}
                      >
                        Login
                      </button>
                    </NavLink>

                    <NavLink to="/register" onClick={closeNavbar}>
                      <button
                        type="button"
                        className="w-full bg-gradient-to-r from-[#20934a] to-[#16a34a] text-white border border-white/20 rounded-xl px-6 py-3 font-semibold transition-all duration-300 ease-in-out backdrop-blur-[4px] hover:shadow-lg hover:from-[#16a34a] hover:to-[#20934a] text-sm"
                        style={{ 
                          WebkitBackdropFilter: 'blur(4px)' 
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