import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Logo from "/jaimaxlogo.svg";

const Footer = () => {
  const navigate = useNavigate();
  return (
    <footer
      className="relative backdrop-blur-[16px] border-t border-white/10"
      style={{
        background:
          "linear-gradient(135deg, rgba(8,83,89,0.95) 0%, rgba(8,83,89,0.9) 100%)",
        WebkipFilter: "blur(16px)",
      }}
    >
      {/* Decorative gradient overlay */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background:
            "radial-gradient(ellipse at top, rgba(197,216,46,0.1) 0%, transparent 50%)",
        }}
      />

      <div className="relative z-10">
        {/* Main footer content */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 sm:gap-8 lg:gap-8">
            {/* Company section */}
            <div className="sm:col-span-2 lg:col-span-1 text-start sm:text-left">
              <NavLink
                to="/"
                className="inline-block mb-4 sm:mb-6 transition-transform duration-300 hover:scale-105"
                title="Go to Jaimax Coin Homepage"
                aria-label="Navigate to Jaimax homepage"
              >
                <img
                  src={Logo}
                  className="h-8 sm:h-10 lg:h-12 w-auto filter drop-shadow-lg mx-auto sm:mx-0"
                  alt="Jaimax Logo"
                  title="Jaimax Coin – Best Pre-Sale Crypto token in India | Smart Investments"
                />
              </NavLink>
              <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-3 sm:mb-4">
                Company
              </h3>
              <p className="text-white/80 text-sm leading-relaxed mb-4 sm:mb-6 max-w-xs mx-auto sm:mx-0">
                Join Jaimax Coin today to embark on a secure, user-friendly, and
                comprehensive cryptocurrency investment journey. Experience the
                future of digital asset management with it.
              </p>

              {/* Connect With section */}
              <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-3 sm:mb-4">
                Connect with
              </h4>
              <div className="flex flex-wrap justify-center sm:justify-start gap-2 sm:gap-3 max-w-xs mx-auto sm:mx-0">
                {[
                  {
                    name: "Twitter",
                    url: "https://x.com/jaimax_coin",
                    hoverBg: "hover:bg-black",
                    title: "Follow Jaimax Coin on Twitter/X for latest updates",
                    svg: (
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
                        className="w-4 h-4"
                      >
                        <path d="M18 6 6 18" />
                        <path d="m6 6 12 12" />
                      </svg>
                    ),
                  },
                  {
                    name: "Telegram",
                    url: "https://t.me/Jaimaxcoinn",
                    hoverBg: "hover:bg-[#229ED9]",
                    title: "Join Jaimax Coin community on Telegram",
                    svg: (
                      <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                      </svg>
                    ),
                  },
                  {
                    name: "Pinterest",
                    url: "https://in.pinterest.com/jaimax_coin/",
                    hoverBg: "hover:bg-[#E60023]",
                    title: "Follow Jaimax Coin on Pinterest for crypto insights",
                    svg: (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        className="w-4 h-4"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12.04 2C6.5 2 2 6.05 2 11.27c0 3.68 2.11 6.77 5.48 7.95-.08-.68-.15-1.72.03-2.46.16-.7 1.04-4.45 1.04-4.45s-.27-.54-.27-1.33c0-1.25.73-2.18 1.65-2.18.78 0 1.15.59 1.15 1.3 0 .79-.51 1.97-.78 3.06-.22.92.46 1.66 1.37 1.66 1.65 0 2.91-1.74 2.91-4.26 0-2.23-1.6-3.79-3.89-3.79-2.65 0-4.21 1.99-4.21 4.04 0 .8.31 1.66.7 2.13.08.1.09.19.07.29-.07.31-.24.98-.28 1.12-.05.22-.17.27-.4.17-1.49-.69-2.42-2.83-2.42-4.55 0-3.72 2.7-7.13 7.79-7.13 4.09 0 7.26 2.92 7.26 6.83 0 4.06-2.56 7.34-6.11 7.34-1.19 0-2.31-.62-2.69-1.35l-.73 2.8c-.27 1.03-1 2.33-1.49 3.12 1.12.35 2.3.54 3.53.54 5.54 0 10.04-4.05 10.04-9.27C22 6.05 17.54 2 12.04 2z" />
                      </svg>
                    ),
                  },
                  {
                    name: "Threads",
                    url: "https://www.threads.com/@jaimax_coin",
                    hoverBg: "hover:bg-black",
                    title: "Connect with Jaimax Coin on Threads",
                    svg: (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-4 h-4"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M12 2C6.48 2 2 6.29 2 11.7c0 5.32 4.48 9.6 10 9.6s10-4.28 10-9.6C22 6.29 17.52 2 12 2zm.55 14.2c-.84 0-1.5-.66-1.5-1.5v-1.14c0-.72-.58-1.3-1.3-1.3s-1.3.58-1.3 1.3c0 2.22 1.81 4.03 4.03 4.03 2.07 0 3.75-1.68 3.75-3.75 0-1.41-.58-2.24-1.52-2.8-.47-.29-1.01-.49-1.58-.6V9.2c.42.12.81.31 1.15.56.3.21.72.13.93-.18.21-.3.13-.72-.18-.93-.55-.39-1.17-.66-1.82-.8V7.3c0-.4-.33-.72-.73-.72s-.72.32-.72.72v.74c-1.47.24-2.58 1.52-2.58 3.02 0 .84.66 1.5 1.5 1.5s1.5-.66 1.5-1.5c0-.53.43-.96.96-.96s.96.43.96.96c0 1.11-.9 2.01-2.01 2.01z" />
                      </svg>
                    ),
                  },
                  {
                    name: "Discord",
                    url: "#",
                    hoverBg: "hover:bg-[#5865F2]",
                    title: "Join Jaimax Coin Discord community",
                    svg: (
                      <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419-.0189 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1568 2.4189Z" />
                      </svg>
                    ),
                  },
                  {
                    name: "LinkedIn",
                    url: "https://www.linkedin.com/company/jaimax-software-solutions-private-limited/",
                    hoverBg: "hover:bg-[#0077B5]",
                    title: "Connect with Jaimax on LinkedIn for professional updates",
                    svg: (
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
                        className="w-4 h-4"
                      >
                        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                        <rect width="4" height="12" x="2" y="9" />
                        <circle cx="4" cy="4" r="2" />
                      </svg>
                    ),
                  },
                  {
                    name: "YouTube",
                    url: "https://www.youtube.com/@jaimax_coin",
                    hoverBg: "hover:bg-[#FF0000]",
                    title: "Subscribe to Jaimax Coin YouTube channel",
                    svg: (
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
                        className="w-4 h-4"
                      >
                        <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
                        <path d="m10 15 5-3-5-3z" />
                      </svg>
                    ),
                  },
                  {
                    name: "Instagram",
                    url: "https://www.instagram.com/jaimax_coin/",
                    hoverBg:
                      "hover:bg-gradient-to-r hover:from-[#feda75] hover:via-[#fa7e1e] hover:via-[#d62976] hover:via-[#962fbf] hover:to-[#4f5bd5]",
                    title: "Follow Jaimax Coin on Instagram for daily updates",
                    svg: (
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
                        className="w-4 h-4"
                      >
                        <rect
                          width="20"
                          height="20"
                          x="2"
                          y="2"
                          rx="5"
                          ry="5"
                        />
                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                      </svg>
                    ),
                  },
                  {
                    name: "Facebook",
                    url: "https://www.facebook.com/jaimaxcoin",
                    hoverBg:
                      "hover:bg-gradient-to-r hover:from-[#1877f3] hover:to-[#0052cc]",
                    title: "Like Jaimax Coin on Facebook for latest news",
                    svg: (
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
                        className="w-4 h-4"
                      >
                        <rect
                          width="20"
                          height="20"
                          x="2"
                          y="2"
                          rx="5"
                          ry="5"
                        />
                        <path d="M16 8h-2a2 2 0 0 0-2 2v2h4" />
                        <line x1="12" y1="16" x2="12" y2="12" />
                        <line x1="12" y1="12" x2="14" y2="12" />
                      </svg>
                    ),
                  },
                ].map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/10 backdrop-blur-[4px] border border-white/20 flex items-center justify-center text-white/80 transition-all duration-300 ${social.hoverBg} hover:text-white hover:scale-110 hover:shadow-lg active:scale-95`}
                    style={{ WebkitBackdropFilter: "blur(4px)" }}
                    title={social.title}
                    aria-label={`Follow us on ${social.name}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {social.svg}
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div className="text-start sm:text-left">
              <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4 sm:mb-6">
                Quick Links
              </h3>
              <ul className="space-y-2 sm:space-y-3">
                {[
                  { name: "About", path: "/about/", title: "Learn more about Jaimax Coin and our mission" },
                  { name: "Disclaimer", path: "/disclaimer/", title: "Read our disclaimer and legal notices" },
                  { name: "Features", path: "/features/", title: "Explore Jaimax Coin features and benefits" },
                  { name: "Blogs", path: "/blog/", title: "Read our latest crypto insights and articles" },
                  { name: "Contact", path: "/contact/", title: "Get in touch with Jaimax support team" },
                  {
                    name: "White Paper",
                    path: "/jaimax-whitepaper.pdf",
                    external: true,
                    title: "Download Jaimax Coin whitepaper (PDF)",
                  },
                  {
                    name: "Incorporation Certificate",
                    path: "/IncorporationCertificate.pdf",
                    external: true,
                    title: "View Jaimax company incorporation certificate (PDF)",
                  },
                  {
                    name: "Recognition Certificate",
                    path: "/RecognitionCertificate.pdf",
                    external: true,
                    title: "View Jaimax recognition certificate (PDF)",
                  },
                  {
                    name: "GST Registration Certificate",
                    path: "/GSTRegistrationCertificate.pdf",
                    external: true,
                    title: "View Jaimax GST registration certificate (PDF)",
                  },
                  {
                    name: "ISO certification",
                    path: "/Isocertified.pdf",
                    external: true,
                    title: "View Jaimax ISO certification (PDF)",
                  },
                ].map((link) => (
                  <li key={link.name}>
                    <NavLink
                      to={link.path}
                      target={link.external ? "_blank" : undefined}
                      title={link.title}
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
            <div className="text-start sm:text-left">
              <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4 sm:mb-6">
                Services
              </h3>
              <ul className="space-y-2 sm:space-y-3">
                {[
                  { name: "ICO Timeline", path: "/PreSale/", title: "View Jaimax ICO timeline and pre-sale details" },
                  { name: "Margin Trading", path: "/Margintrading/", title: "Learn about margin trading on Jaimax" },
                  { name: "API Trading", path: "/ApiTrading/", title: "Explore Jaimax API trading solutions" },
                  { name: "Spot Trading", path: "/SpotTrading/", title: "Start spot trading on Jaimax platform" },
                  { name: "Futures Trading", path: "/FuturesTrading/", title: "Discover futures trading opportunities" },
                  { name: "Pre Sale Crypto Coin", path: "/best-presale-crypto-coin-in-india", title: "Discover futures trading opportunities" },
                ].map((link) => (
                  <li key={link.name}>
                    <NavLink
                      to={link.path}
                      title={link.title}
                      className="text-white/70 text-sm transition-all duration-300 hover:text-white hover:translate-x-1 inline-block relative group"
                    >
                      {link.name}
                      <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-gradient-to-r from-[#c5d82e] to-[#b8cc26] transition-all duration-300 group-hover:w-full"></span>
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support */}
            <div className="text-start sm:text-left">
              <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4 sm:mb-6">
                Support
              </h3>
              <ul className="space-y-2 sm:space-y-3">
                {[
                  { name: "24/7 Support", path: "/supportpage/", title: "Get 24/7 customer support and assistance" },
                  { name: "Refund Policy", path: "/refund-policy/", title: "Read our refund and cancellation policy" },
                  {
                    name: "Terms and Conditions",
                    path: "/terms-and-conditions",
                    title: "Read Jaimax terms and conditions",
                  },
                  { name: "Privacy Policy", path: "/privacy-policy/", title: "View our privacy policy and data protection" },
                  { name: "KYC_PMLA", path: "/kyc-pmla/", title: "Learn about KYC and PMLA compliance" },
                  { name: "AML_CTF", path: "/aml-ctf/", title: "View anti-money laundering and counter-terrorism financing policy" },
                ].map((link) => (
                  <li key={link.name}>
                    <NavLink
                      to={link.path}
                      title={link.title}
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
            <div className="text-start sm:text-left">
              <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4 sm:mb-6">
                Stay Updated
              </h3>
              <p className="text-white/70 text-sm mb-4 max-w-xs mx-auto sm:mx-0">
                Get the latest crypto insights and Jaimax updates delivered to
                your inbox.
              </p>

              <form className="space-y-6 max-w-xs mx-auto sm:mx-0">
                <div className="mb-4">
                  <a
                    href="https://t.me/Jaimaxcoinn"
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Join our Telegram community for instant updates and announcements"
                    className="flex items-center justify-center gap-2 w-full py-2.5 px-4 text-dark text-sm font-medium no-underline rounded-lg bg-[#229ED9] hover:bg-[#1a8fc7] transition-colors duration-300 shadow-md hover:shadow-lg"
                  >
                    {/* Telegram Icon */}
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                    </svg>
                    Join in our Telegram
                  </a>
                </div>
                {/* LinkedIn Button */}
                <div className="mb-4">
                  <a
                    href="https://www.linkedin.com/build-relation/newsletter-follow?entityUrn=7355483614760820736"
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Subscribe to Jaimax newsletter on LinkedIn for professional insights"
                    className="flex items-center justify-center gap-2 w-full py-2.5 px-4 text-dark text-sm font-medium no-underline rounded-lg bg-[#bcd028] hover:bg-[#a8bb24] transition-colors duration-300 shadow-md hover:shadow-lg"
                  >
                    {/* LinkedIn Icon */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                      className="flex-shrink-0"
                      aria-hidden="true"
                    >
                      <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z" />
                    </svg>
                    Subscribe on LinkedIn
                  </a>
                </div>

                {/* Trustpilot Section */}

              </form>
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="border-t border-white/10">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
            <div className="flex flex-col lg:flex-row items-center justify-between space-y-4 lg:space-y-0">
              {/* Copyright */}
              <div className="flex items-center justify-center text-white/60 text-sm text-center w-full">
                copyright © 2025 Jaimax Coin. All rights reserved.
              </div>

              {/* Back to top button */}
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                aria-label="Scroll to top"
                title="Back to top - Scroll to the top of the page"
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/10 backdrop-blur-[4px] border border-white/20 flex items-center justify-center text-white/80 transition-all duration-300 hover:bg-gradient-to-r hover:from-[#c5d82e] hover:to-[#b8cc26] hover:text-[#0e0b0b] hover:scale-110 hover:shadow-lg active:scale-95 order-3"
                style={{ WebkitBackdropFilter: "blur(4px)" }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-4 h-4 sm:w-5 sm:h-5"
                  aria-hidden="true"
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
            background:
              "linear-gradient(90deg, transparent 0%, #c5d82e 50%, transparent 100%)",
          }}
        />
      </div>
    </footer>

  );
};

export default Footer;
