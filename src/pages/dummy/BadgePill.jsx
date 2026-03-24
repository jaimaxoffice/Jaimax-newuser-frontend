// const BadgePill = ({
//   label = "Unleash Your Creativity",
//   icon = "✳",
//   bg = "#EEF08A",
//   textColor = "#1A1A1A",
//   borderColor = "#1A1A1A",
//   className = "",
// }) => {
//   return (
//     <span
//       className={`inline-flex w-fit items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium ${className}`}
//       style={{
//         background: bg,
//         color: textColor,
//         borderColor: borderColor,
//         borderWidth: "1.5px",
//       }}
//     >
//       <span className="text-base leading-none">{icon}</span>
//       {label}
//     </span>
//   );
// };
 
// export default BadgePill;

import { motion } from "framer-motion";

const BadgePill = ({
  label = "Unleash Your Creativity",
  icon = "✳",
  className = "",
}) => {
  return (
    <motion.span
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.04 }}
      transition={{ duration: 0.35 }}
      className={`
        inline-flex items-center gap-2 w-fit
        rounded-full 
        px-4 py-1.5 
        text-sm font-medium
        border border-[rgba(0,0,0,0.08)]
        bg-[#EEF08A]
        text-[rgba(20,20,20,0.9)]
        shadow-[0_2px_10px_rgba(0,0,0,0.05)]
        hover:shadow-[0_6px_18px_rgba(0,0,0,0.12)]
        transition-all duration-300
        ${className}
      `}
    >
      {/* ICON */}
      <motion.span
        animate={{
          rotate: 360,
          scale: [1, 1, 1],
        }}
        transition={{
          rotate: {
            duration: 3,
            repeat: Infinity,
            ease: "linear",
          },
          scale: {
            duration: 1.2,
            repeat: Infinity,
            ease: "easeInOut",
          },
        }}
        className="text-sm"
      >
        {icon}
      </motion.span>

      {/* LABEL */}
      <span className="tracking-[0.3px]">{label}</span>

 
    </motion.span>
  );
};

export default BadgePill;