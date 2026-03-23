const BadgePill = ({
  label = "Unleash Your Creativity",
  icon = "✳",
  bg = "#EEF08A",
  textColor = "#1A1A1A",
  borderColor = "#1A1A1A",
  className = "",
}) => {
  return (
    <span
      className={`inline-flex w-fit items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium ${className}`}
      style={{
        background: bg,
        color: textColor,
        borderColor: borderColor,
        borderWidth: "1.5px",
      }}
    >
      <span className="text-base leading-none">{icon}</span>
      {label}
    </span>
  );
};
 
export default BadgePill;