import React from "react";
import BadgePill from "./BadgePill";

const SupportedWallets = ({ title = "Supported Wallets", className = "" }) => {
  const WalletIcon = ({ type, size = 26 }) => {
    switch (type) {
      case "metamask":
        return (
          <svg width={size} height={size} viewBox="0 0 507.83 470.86">
            <polygon
              fill="#e2761b"
              points="482.09 0.5 284.32 147.38 320.9 60.72 482.09 0.5"
            />
            <polygon
              fill="#e4761b"
              points="25.54 0.5 221.72 148.77 186.93 60.72 25.54 0.5"
            />
            <polygon
              fill="#e4761b"
              points="410.93 340.97 358.26 421.67 470.96 452.67 503.36 342.76 410.93 340.97"
            />
            <polygon
              fill="#e4761b"
              points="4.67 342.76 36.87 452.67 149.57 421.67 96.9 340.97 4.67 342.76"
            />
            <polygon
              fill="#e4761b"
              points="143.21 204.62 111.8 252.13 223.7 257.1 219.73 136.85 143.21 204.62"
            />
            <polygon
              fill="#e4761b"
              points="364.42 204.62 286.91 135.46 284.32 257.1 396.03 252.13 364.42 204.62"
            />
            <polygon
              fill="#f6851b"
              points="294.66 314.54 281.34 382.31 290.88 388.87 348.92 343.55 350.91 298.04 294.66 314.54"
            />
            <polygon
              fill="#f6851b"
              points="157.12 298.04 158.71 343.55 216.75 388.87 226.29 382.31 213.17 314.54 157.12 298.04"
            />
            <polygon
              fill="#c0ad9e"
              points="295.65 451.28 296.25 432.8 291.28 428.42 216.35 428.42 211.78 432.8 212.18 451.28 149.57 421.67 171.43 439.55 215.75 470.36 291.88 470.36 336.4 439.55 358.26 421.67 295.65 451.28"
            />
            <polygon
              fill="#161616"
              points="290.88 388.87 281.34 382.31 226.29 382.31 216.75 388.87 211.78 432.8 216.35 428.42 291.28 428.42 296.25 432.8 290.88 388.87"
            />
          </svg>
        );

      case "binance":
        return (
          <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="
          #FCD535"
          >
            <path d="M12 0l3 3-3 3-3-3 3-3zm6 6l3 3-3 3-3-3 3-3zM6 6l3 3-3 3-3-3 3-3zm6 6l3 3-3 3-3-3 3-3zm0-6l3 3-3 3-3-3 3-3z" />
          </svg>
        );

      case "trust":
        return (
          <svg width={size} height={size} viewBox="0 0 24 24" fill="#0500FF">
            <path d="M12 0l10 4v6c0 5-3.5 9.7-10 14C5.5 19.7 2 15 2 10V4l10-4z" />
          </svg>
        );

      default:
        return null;
    }
  };

  const wallets = [
    { name: "MetaMask", type: "metamask" },
    { name: "Binance", type: "binance" },
    { name: "Trust Wallet", type: "trust" },
  ];

  return (
    <section className={`w-full px-4 py-8 text-center ${className} bg-[#fff]`}>
      <p className="text-xs uppercase text-[#000] tracking-widest font-semibold mb-5">
        {title}
      </p>

      <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 md:gap-8 opacity-80">
        {wallets.map((wallet, i) => (
          <div
            key={i}
            className="flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-[2px] "
            style={{
              color: "var(--color-brand-primary)",
              fontFamily: "var(--font-display)",
              borderColor: "var(--color-border)",
            }}
          >
            <WalletIcon type={wallet.type} />
            <span>{wallet.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SupportedWallets;
