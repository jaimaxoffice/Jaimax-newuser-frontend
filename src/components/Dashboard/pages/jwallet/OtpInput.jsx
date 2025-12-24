import React, { useRef } from "react";

const OtpInput = ({ length = 6, value, onChange }) => {
    const inputsRef = useRef([]);

    const handleChange = (e, index) => {
        const val = e.target.value.replace(/\D/g, "");
        if (!val) return;

        const otpArr = value.split("");
        otpArr[index] = val[val.length - 1];
        onChange(otpArr.join(""));

        if (index < length - 1) {
            inputsRef.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === "Backspace") {
            const otpArr = value.split("");
            otpArr[index] = "";
            onChange(otpArr.join(""));

            if (index > 0) {
                inputsRef.current[index - 1]?.focus();
            }
        }
    };

    const handlePaste = (e) => {
        e.preventDefault();
        const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, length);
        if (!pasted) return;

        const otpArr = pasted.split("");
        onChange(otpArr.join(""));

        const lastIndex = otpArr.length - 1;
        inputsRef.current[lastIndex]?.focus();
    };

    return (
        <div className="flex justify-center gap-1 sm:gap-2 flex-nowrap ">
            {Array.from({ length }).map((_, i) => (
                <input
                    key={i}
                    ref={(el) => (inputsRef.current[i] = el)}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={value[i] || ""}
                    onChange={(e) => handleChange(e, i)}
                    onKeyDown={(e) => handleKeyDown(e, i)}
                    onPaste={handlePaste}
                    className="
            w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12
            text-center text-xs sm:text-sm md:text-base lg:text-lg
            font-semibold
            border border-gray-300 rounded-md
            focus:outline-none focus:ring-2 focus:ring-teal-500
            transition-all bg-white
          "
                />
            ))}
        </div>
    );
};

export default OtpInput;
