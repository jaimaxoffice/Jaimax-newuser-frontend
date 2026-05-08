import { useState } from "react";

const Logo = () => (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
    <circle cx="14" cy="14" r="10" fill="#f46b1a" />
    <circle cx="26" cy="10" r="5" fill="#f46b1a" opacity="0.7" />
    <circle cx="10" cy="26" r="4" fill="#f46b1a" opacity="0.5" />
  </svg>
);

const links = {
  Stacks: ["Shop", "Connect Wallet", "Accessories"],
  Info: ["Communication", "Support", "Internal", "Video Showcase"],
  Resources: ["Blog", "Customer", "Watch a Demo"],
  Company: ["About Us", "Press", "Terms & Conditions", "Privacy Policy"],
};

export default function Footer() {
  const [cookieAccepted, setCookieAccepted] = useState(false);

  return (
    <footer className="w-full border-t border-[#16213e]/[0.08]">

      {/* Main footer grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 pt-10 sm:pt-12 md:pt-14 pb-8 sm:pb-10">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-x-6 gap-y-10">

          {/* Brand column — full width on smallest, spans 2 on sm */}
          <div className="col-span-2 sm:col-span-3 lg:col-span-1 flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <Logo />
              <span className="text-xl font-bold text-[#16213e]">Jaimax</span>
            </div>
            <p className="text-sm leading-relaxed text-[#16213e]/50 max-w-[280px]">
              Libero tempore cum soluta nobis est eligendi optio cumque nihil
              impedit quo minus id quod maxime.
            </p>
          </div>

          {/* Spacer — only on lg */}
          <div className="hidden lg:block lg:col-span-1" />

          {/* Link columns */}
          {Object.entries(links).map(([heading, items]) => (
            <div key={heading} className="flex flex-col gap-3">
              <h4 className="text-sm font-bold text-[#16213e]">{heading}</h4>
              <ul className="flex flex-col gap-2.5">
                {items.map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-[13px] text-[#16213e]/50 no-underline hover:text-[#16213e] transition-colors duration-150"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-4 sm:py-5 border-t border-[#16213e]/[0.08] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-4">
        <p className="text-[12px] sm:text-sm text-[#16213e]/50">
          © 2026{" "}
          <span className="font-semibold text-[#f46b1a]">Jaimax</span>
          , All Rights Reserved
        </p>

        {!cookieAccepted ? (
          <p className="text-[12px] sm:text-sm text-[#16213e]/50">
            We accept cookies for better services.{" "}
            <button
              onClick={() => setCookieAccepted(true)}
              className="font-semibold text-[#f46b1a] bg-transparent border-0 p-0 cursor-pointer hover:opacity-75 transition-opacity duration-150"
            >
              Accept
            </button>
          </p>
        ) : (
          <p className="text-[12px] sm:text-sm text-[#16213e]/50">
            Cookies accepted. Thank you!
          </p>
        )}
      </div>
    </footer>
  );
}