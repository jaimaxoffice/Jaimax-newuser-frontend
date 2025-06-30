// Footer.jsx
import React from "react";
import { NavLink } from "react-router-dom";
import Logo from "../assets/Images/logo.svg";

const Footer = () => {
  return (
    <footer
      className="relative  backdrop-blur-[16px] border-t border-white/10"
      style={{
        background: 'linear-gradient(135deg, rgba(8,83,89,0.95) 0%, rgba(8,83,89,0.9) 100%)',
        WebkitBackdropFilter: 'blur(16px)'
      }}
    >
      {/* Decorative gradient overlay */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background: 'radial-gradient(ellipse at top, rgba(197,216,46,0.1) 0%, transparent 50%)'
        }}
      />

      <div className="relative z-10">
        {/* Main footer content */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-8">

            {/* Company section */}
            <div className="lg:col-span-1">
              <NavLink
                to="/"
                className="inline-block mb-6 transition-transform duration-300 hover:scale-105"
              >
                <img
                  src={Logo}
                  className="h-10 w-auto lg:h-12 filter drop-shadow-lg"
                  alt="Jaimax Logo"
                />
              </NavLink>
              <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
                Company
              </h3>
              <p className="text-white/80 text-sm leading-relaxed mb-6">
                Join Jaimax Coin today to embark on a secure, user-friendly, and comprehensive cryptocurrency investment journey. Experience the future of digital asset management with it.
              </p>

              {/* Connect With section */}
              <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
                Connect with
              </h4>
              <div className="flex space-x-3">
                {[
                  {
                    name: 'Twitter',
                    url: '#',
                    hoverBg: 'hover:bg-black',
                    svg: (
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x-icon lucide-x"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                    )
                  },
                  {
                    name: 'Telegram',
                    url: '#',
                    hoverBg: 'hover:bg-[#229ED9]',
                    svg: (
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                      </svg>
                    )
                  },
                  {
                    name: 'Discord',
                    url: '#',
                    hoverBg: 'hover:bg-[#5865F2]',
                    svg: (
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419-.0189 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1568 2.4189Z" />
                      </svg>
                    )
                  },
                  {
                    name: 'LinkedIn',
                    url: '#',
                    hoverBg: 'hover:bg-[#0077B5]',
                    svg: (
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-linkedin">
                        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                        <rect width="4" height="12" x="2" y="9" />
                        <circle cx="4" cy="4" r="2" />
                      </svg>
                    )
                  },

                  {
                    name: 'YouTube',
                    url: '#',
                    hoverBg: 'hover:bg-[#FF0000]',
                    svg: (
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-youtube-icon lucide-youtube"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" /><path d="m10 15 5-3-5-3z" /></svg>
                    )
                  },
                  {
                    name: 'Instagram',
                    url: '#',
                    hoverBg: 'hover:bg-gradient-to-r hover:from-[#feda75] hover:via-[#fa7e1e] hover:via-[#d62976] hover:via-[#962fbf] hover:to-[#4f5bd5]',
                    svg: (
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-instagram">
                        <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                      </svg>
                    )
                  }
                ].map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    className={`w-14 h-10 rounded-full bg-white/10 backdrop-blur-[4px] border border-white/20 flex items-center justify-center text-white/80 transition-all duration-300 ${social.hoverBg} hover:text-white hover:scale-110 hover:shadow-lg`}
                    style={{ WebkitBackdropFilter: 'blur(4px)' }}
                    title={social.name}
                  >
                    {social.svg}
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-6">
                Quick Links
              </h3>
              <ul className="space-y-3">
                {[
                  { name: 'About', path: '/about' },
                  { name: 'Disclaimer', path: '/disclaimer' },
                  { name: 'Features', path: '/features' },
                  { name: 'Blogs', path: '/blog' },
                  { name: 'Contact', path: '/contact' },
                  { name: 'White Paper', path: '/images/white_paper.pdf', external: true }
                ].map((link) => (
                  <li key={link.name}>
                    <NavLink
                      to={link.path}
                      target={link.external ? "_blank" : undefined}
                      className="text-white/70 text-sm transition-all duration-300 hover:text-white hover:translate-x-1 inline-block relative group"
                    >
                      {link.name}
                      <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-gradient-to-r from-[#c5d82e] to-[#b8cc26] transition-all duration-300 group-hover:w-full"></span>
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-6">
                Services
              </h3>
              <ul className="space-y-3">
                {[
                  { name: 'ICO Timeline', path: '/PreSale' },
                  { name: 'Margin Trading', path: '/Margintrading' },
                  { name: 'API Trading', path: '/ApiTrading' },
                  { name: 'Spot Trading', path: '/SpotTrading' },
                  { name: 'Futures Trading', path: '/FuturesTrading' },
                  { name: 'Refer and Earn', path: '/ReferEarn' },
                  
                ].map((link) => (
                  <li key={link.name}>
                    <NavLink
                      to={link.path}
                      className="text-white/70 text-sm transition-all duration-300 hover:text-white hover:translate-x-1 inline-block relative group"
                    >
                      {link.name}
                      <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-gradient-to-r from-[#c5d82e] to-[#b8cc26] transition-all duration-300 group-hover:w-full"></span>
                    </NavLink>
                  </li>
                ))}
                {/* <li className="pt-2 border-t border-white/10">
                  <div className="text-[#c5d82e] text-sm font-semibold">
                    10% referral income
                  </div>
                </li> */}
              </ul>
            </div>

            {/* Support */}
            <div>
              <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-6">
                Support
              </h3>
              <ul className="space-y-3">
                {[
                  { name: '24/7 Support', path: '/supporthome' },
                  { name: 'Refund Policy', path: '/refund-policy' },
                  { name: 'Terms and Conditions', path: '/terms-and-conditions' },
                  { name: 'Privacy Policy for JAIMAX', path: '/privacy-policy' }
                ].map((link) => (
                  <li key={link.name}>
                    <NavLink
                      to={link.path}
                      className="text-white/70 text-sm transition-all duration-300 hover:text-white hover:translate-x-1 inline-block relative group"
                    >
                      {link.name}
                      <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-gradient-to-r from-[#c5d82e] to-[#b8cc26] transition-all duration-300 group-hover:w-full"></span>
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>

            {/* Newsletter signup */}
            <div>
              <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-6">
                Stay Updated
              </h3>
              <p className="text-white/70 text-sm mb-4">
                Get the latest crypto insights and Jaimax updates delivered to your inbox.
              </p>

              <form className="space-y-3">
                <div className="relative">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 rounded-xl bg-white/10 backdrop-blur-[4px] border border-white/20 text-white placeholder-white/50 text-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#c5d82e]/50 focus:border-[#c5d82e]/50"
                    style={{ WebkitBackdropFilter: 'blur(4px)' }}
                  />
                </div>
                <button
                  type="submit"
                  className="w-full rounded-full bg-gradient-to-r from-[#c5d82e] to-[#b8cc26] text-[#0e0b0b] border border-white/20 rounded-full px-6 py-3 font-semibold transition-all duration-300 ease-in-out backdrop-blur-[4px] hover:shadow-lg hover:scale-105 hover:from-[#b8cc26] hover:to-[#c5d82e] text-sm"
                  style={{ WebkitBackdropFilter: 'blur(4px)' }}
                >
                  Subscribe Now
                </button>
              </form>

              {/* Special highlight box */}
              <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-[#c5d82e]/10 to-[#b8cc26]/10 border border-[#c5d82e]/20 backdrop-blur-[4px]">
                <div className="text-[#c5d82e] text-xs font-semibold uppercase tracking-wider mb-1">
                  Earn More
                </div>
                <div className="text-white text-sm font-medium">
                  Join our referral program and earn 10% commission on every successful referral!
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="border-t border-white/10">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">

              {/* Copyright */}
              <div className="text-white/60 text-sm text-center md:text-left">
                © 2025 Jaimax Coin. All rights reserved.
              </div>

              {/* Legal links */}
              <div className="flex flex-wrap items-center justify-center md:justify-end space-x-4 space-y-2 md:space-y-0">
                {[
                  { name: 'Privacy Policy', path: '/privacy-policy' },
                  { name: 'Terms of Service', path: '/terms-and-conditions' },
                  { name: 'Disclaimer', path: '/disclaimer' }
                ].map((link, index) => (
                  <React.Fragment key={link.name}>
                    <NavLink
                      to={link.path}
                      className="text-white/60 text-sm transition-colors duration-300 hover:text-white/90 relative group"
                    >
                      {link.name}
                      <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-gradient-to-r from-[#c5d82e] to-[#b8cc26] transition-all duration-300 group-hover:w-full"></span>
                    </NavLink>
                    {index < 2 && (
                      <span className="text-white/30 hidden md:inline">•</span>
                    )}
                  </React.Fragment>
                ))}
              </div>

              {/* Back to top button */}
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                aria-label="Scroll to top"
                className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-[4px] border border-white/20 flex items-center justify-center text-white/80 transition-all duration-300 hover:bg-gradient-to-r hover:from-[#c5d82e] hover:to-[#b8cc26] hover:text-[#0e0b0b] hover:scale-110 hover:shadow-lg group"
                style={{ WebkitBackdropFilter: 'blur(4px)' }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-arrow-up-icon lucide-arrow-up"
                >
                  <path d="m5 12 7-7 7 7" />
                  <path d="M12 19V5" />
                </svg>
              </button>

            </div>
          </div>
        </div>

        {/* Decorative bottom glow */}
        <div
          className="absolute bottom-0 left-0 right-0 h-px opacity-50"
          style={{
            background: 'linear-gradient(90deg, transparent 0%, #c5d82e 50%, transparent 100%)'
          }}
        />
      </div>
    </footer>
  );
};

export default Footer;