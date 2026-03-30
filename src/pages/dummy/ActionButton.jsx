import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ActionButton = ({
  text = "Click",
  to = "/",
  variant = "primary", // primary | secondary
  className = "",
}) => {
  const navigate = useNavigate();

  const baseStyles =
    "inline-flex items-center gap-2 px-7 py-3 rounded-full text-sm font-semibold tracking-wide transition-all duration-300";

  const variants = {
    primary: `
      group
      bg-gradient-to-r from-[#0f172a] via-[#1e293b] to-[#020617]
      hover:from-[#1e293b] hover:to-[#020617]
      text-white
      border border-[#2bb7a4]/30
      shadow-[0_0_20px_rgba(43,183,164,0.15)]
      hover:shadow-[0_0_30px_rgba(43,183,164,0.35)]
    `,

    secondary: `
      group
      border border-[#2bb7a4]/40 text-[#2bb7a4]
      hover:bg-[#2bb7a4] hover:text-black
      hover:shadow-[0_0_25px_rgba(43,183,164,0.3)]
    `,
  };

  return (
    <button
      onClick={() => navigate(to)}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {text}

      {variant === "primary" ? (
        <span
          className="
            flex items-center justify-center w-6 h-6 rounded-full
            bg-[#2bb7a4] group-hover:bg-white transition
          "
        >
          <ArrowRight className="w-4 h-4 text-black group-hover:text-[#0f172a]" />
        </span>
      ) : (
        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
      )}
    </button>
  );
};

export default ActionButton;