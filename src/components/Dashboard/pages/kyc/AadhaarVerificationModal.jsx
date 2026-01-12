import React, { useState, useEffect, useRef } from "react";
import stringSimilarity from "string-similarity";
import { toast } from "../../../../ReusableComponents/Toasts/Toasts";
import {
  useSendAadhaarOtpMutation,
  useVerifyAadhaarOtpMutation,
} from "./kycApiSlice";

const AadhaarVerificationModal = ({
  show,
  onClose,
  digilockerName,
  digilockerDob, // Add this prop to receive DOB from DigiLocker
  onVerificationSuccess,
  onSkip,
}) => {
  // State
  const [step, setStep] = useState("aadhaar");
  const [aadhaarNumber, setAadhaarNumber] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [tempId, setTempId] = useState(null);
  const [countdown, setCountdown] = useState(0);
  const [error, setError] = useState("");
  const [verifiedData, setVerifiedData] = useState(null);
  const [nameMatchStatus, setNameMatchStatus] = useState(null);
  const [dobMatchStatus, setDobMatchStatus] = useState(null);

  const otpRefs = useRef([]);

  const [sendAadhaarOtp, { isLoading: isSendingOtp }] =
    useSendAadhaarOtpMutation();
  const [verifyAadhaarOtp, { isLoading: isVerifyingOtp }] =
    useVerifyAadhaarOtpMutation();

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  useEffect(() => {
    if (show) {
      setStep("aadhaar");
      setAadhaarNumber("");
      setOtp(["", "", "", "", "", ""]);
      setTempId(null);
      setCountdown(0);
      setError("");
      setVerifiedData(null);
      setNameMatchStatus(null);
      setDobMatchStatus(null);
    }
  }, [show]);

  const formatAadhaar = (value) => {
    const cleaned = value.replace(/\D/g, "");
    const limited = cleaned.slice(0, 12);
    return limited.replace(/(\d{4})(?=\d)/g, "$1 ").trim();
  };

  const handleAadhaarChange = (e) => {
    const formatted = formatAadhaar(e.target.value);
    setAadhaarNumber(formatted);
    setError("");
  };

  const validateAadhaar = (aadhaar) => {
    const cleaned = aadhaar.replace(/\s/g, "");
    return /^\d{12}$/.test(cleaned);
  };

  const handleSendOtp = async () => {
    const cleanedAadhaar = aadhaarNumber.replace(/\s/g, "");

    if (!validateAadhaar(cleanedAadhaar)) {
      setError("Please enter a valid 12-digit Aadhaar number");
      return;
    }

    setError("");

    try {
      const result = await sendAadhaarOtp({
        aadhaarNumber: cleanedAadhaar,
      });

      if (result.error) {
        const errorMessage =
          result.error?.data?.message ||
          result.error?.error ||
          "Failed to send OTP";
        setError(errorMessage);
        toast.error(errorMessage, { position: "top-center" });
        return;
      }

      const response = result.data;

      if (response?.success || response?.status_code === 200) {
        const receivedTempId = response?.data?.tempId || response?.tempId;

        setTempId(receivedTempId);
        setStep("otp");
        setCountdown(85);
        toast.success(response?.message || "OTP sent successfully!", {
          position: "top-center",
        });
      } else {
        const msg = response?.message || "Failed to send OTP";
        setError(msg);
        toast.error(msg, { position: "top-center" });
      }
    } catch (err) {
      const errorMessage =
        err?.data?.message || err?.message || "Failed to send OTP";
      setError(errorMessage);
      toast.error(errorMessage, { position: "top-center" });
    }
  };

  const handleOtpChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);
    setError("");

    if (value && index < 5) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  const handleOtpPaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 6);
    const newOtp = [...otp];
    pastedData.split("").forEach((digit, index) => {
      if (index < 6) newOtp[index] = digit;
    });
    setOtp(newOtp);
  };

  const extractAadhaarData = (response) => {
    if (response?.data?.data?.data) {
      return response.data.data.data;
    }
    if (response?.data?.data) {
      return response.data.data;
    }
    if (response?.data) {
      return response.data;
    }
    return response;
  };

  // DOB matching function
// DOB matching function
const matchDob = (aadhaarDob, digilockerDob) => {
  if (!aadhaarDob || !digilockerDob) {
    return { matched: false, reason: "DOB data missing" };
  }

  console.log("[DOB Match] Raw Aadhaar DOB:", aadhaarDob);
  console.log("[DOB Match] Raw DigiLocker DOB:", digilockerDob);
  
  // Parse dates regardless of format
  const parseDob = (dobStr) => {
    dobStr = dobStr.toString().trim();
    
    let day, month, year;
    
    // Try different formats
    
    // DD/MM/YYYY or DD-MM-YYYY format
    if (dobStr.match(/^\d{1,2}[-\.\/]\d{1,2}[-\.\/]\d{4}$/)) {
      const parts = dobStr.split(/[-\.\/]/);
      day = parseInt(parts[0], 10);
      month = parseInt(parts[1], 10);
      year = parseInt(parts[2], 10);
    } 
    // YYYY/MM/DD or YYYY-MM-DD format
    else if (dobStr.match(/^\d{4}[-\.\/]\d{1,2}[-\.\/]\d{1,2}$/)) {
      const parts = dobStr.split(/[-\.\/]/);
      year = parseInt(parts[0], 10);
      month = parseInt(parts[1], 10);
      day = parseInt(parts[2], 10);
    }
    // MM/DD/YYYY format (less common in India but possible)
    else if (dobStr.match(/^\d{1,2}[-\.\/]\d{1,2}[-\.\/]\d{4}$/)) {
      const parts = dobStr.split(/[-\.\/]/);
      // In India, usually first number is day, second is month
      day = parseInt(parts[0], 10);
      month = parseInt(parts[1], 10);
      year = parseInt(parts[2], 10);
    }
    // Plain YYYYMMDD format
    else if (dobStr.match(/^\d{8}$/)) {
      year = parseInt(dobStr.substring(0, 4), 10);
      month = parseInt(dobStr.substring(4, 6), 10);
      day = parseInt(dobStr.substring(6, 8), 10);
    }
    // Year only (some Aadhaar cards only have birth year)
    else if (dobStr.match(/^\d{4}$/)) {
      year = parseInt(dobStr, 10);
      month = 0; // Indicates only year is available
      day = 0;
    }
    // Default case - can't parse
    else {
      return null;
    }
    
    return { day, month, year };
  };
  
  const aadhaarDate = parseDob(aadhaarDob);
  const digilockerDate = parseDob(digilockerDob);
  
  if (!aadhaarDate || !digilockerDate) {
    return { 
      matched: false, 
      aadhaarDob, 
      digilockerDob, 
      reason: "Could not parse one or both dates" 
    };
  }
  
  console.log("[DOB Match] Parsed Aadhaar:", aadhaarDate);
  console.log("[DOB Match] Parsed DigiLocker:", digilockerDate);
  
  // Special case: If only year is available in one, match just the year
  if ((aadhaarDate.month === 0 || digilockerDate.month === 0)) {
    const matched = aadhaarDate.year === digilockerDate.year;
    return {
      matched,
      aadhaarDob, 
      digilockerDob,
      reason: matched ? "Year matched (partial data)" : "Year mismatch"
    };
  }
  
  // Regular full date comparison
  const matched = (
    aadhaarDate.day === digilockerDate.day && 
    aadhaarDate.month === digilockerDate.month && 
    aadhaarDate.year === digilockerDate.year
  );
  
  return {
    matched,
    aadhaarDob, 
    digilockerDob,
    reason: matched ? "DOB matched" : "DOB mismatch"
  };
};

  // Name matching function
  const matchNames = (aadhaarName, digilockerName) => {
    if (!aadhaarName || !digilockerName) return { matched: false, similarity: 0 };
    
    const normalize = (str) => {
      return str
        .toLowerCase()
        .replace(/[^a-z\s]/g, "")
        .replace(/\s+/g, " ")
        .trim();
    };

    const normalizedAadhaar = normalize(aadhaarName);
    const normalizedDigilocker = normalize(digilockerName);

    // Direct match
    if (normalizedAadhaar === normalizedDigilocker) {
      return { matched: true, similarity: 1.0 };
    }

    const similarity = stringSimilarity.compareTwoStrings(
      normalizedAadhaar,
      normalizedDigilocker
    );

    const aadhaarWords = normalizedAadhaar
      .split(" ")
      .filter((w) => w.length > 0);
    const digilockerWords = normalizedDigilocker
      .split(" ")
      .filter((w) => w.length > 0);

    const aadhaarWordsInDigilocker = aadhaarWords.every((word) =>
      digilockerWords.some(
        (dWord) => stringSimilarity.compareTwoStrings(word, dWord) > 0.8
      )
    );

    const digilockerWordsInAadhaar = digilockerWords.every((word) =>
      aadhaarWords.some(
        (aWord) => stringSimilarity.compareTwoStrings(word, aWord) > 0.8
      )
    );
    
    const isMatched =
      similarity >= 0.8 ||
      (aadhaarWordsInDigilocker && digilockerWordsInAadhaar);

    return {
      matched: isMatched,
      similarity: similarity,
      details: {
        aadhaarName: normalizedAadhaar,
        digilockerName: normalizedDigilocker,
        similarityScore: (similarity * 100).toFixed(1) + "%",
      },
    };
  };

  // Verify OTP
// Verify OTP
const handleVerifyOtp = async () => {
  console.log("[AadhaarModal] handleVerifyOtp called");

  const otpString = otp.join("");

  if (otpString.length !== 6) {
    setError("Please enter complete 6-digit OTP");
    return;
  }

  if (!tempId) {
    setError("Session expired. Please request OTP again.");
    setStep("aadhaar");
    return;
  }

  setError("");
  setStep("verifying");

  try {
    const result = await verifyAadhaarOtp({
      tempId,
      otp: otpString,
    });

    if (result.error) {
      const errorMessage =
        result.error?.data?.message || "Verification failed";
      setError(errorMessage);
      setStep("otp");
      toast.error(errorMessage, { position: "top-center" });
      return;
    }

    const response = result.data;

    if (response?.success || response?.status_code === 200) {
      const aadhaarData = extractAadhaarData(response);
      setVerifiedData(aadhaarData);

      const aadhaarName = aadhaarData?.name || "";
      const aadhaarDob = aadhaarData?.date_of_birth || aadhaarData?.year_of_birth || "";

      console.log("[AadhaarModal] Aadhaar Name:", aadhaarName);
      console.log("[AadhaarModal] Aadhaar DOB:", aadhaarDob);
      console.log("[AadhaarModal] DigiLocker Name:", digilockerName);
      console.log("[AadhaarModal] DigiLocker DOB:", digilockerDob);

      let dobMatched = false;
      
      // FIRST: Check DOB match
      if (digilockerDob && aadhaarDob) {
        const dobResult = matchDob(aadhaarDob, digilockerDob);
        setDobMatchStatus(dobResult);
        dobMatched = dobResult.matched;

        // We'll check DOB but not block the flow if it doesn't match
        if (!dobMatched) {
          console.log("[AadhaarModal] DOB mismatch detected but continuing");
          // We'll handle mismatch later but still continue to name check
        }
      }

      // SECOND: Check name match
      if (digilockerName && aadhaarName) {
        const nameResult = matchNames(aadhaarName, digilockerName);
        setNameMatchStatus(nameResult);
        
        const nameMatched = nameResult.matched;

        // Decision tree for verification outcomes
        if (dobMatched && nameMatched) {
          // Both match - full success
          setStep("success");
          toast.success("Aadhaar verified successfully! DOB and name matched.", {
            position: "top-center",
          });
        } else if (dobMatched && !nameMatched) {
          // DOB matches but name doesn't
          setStep("nameMismatch");
          toast.warning(
            `DOB matched but name similarity: ${nameResult.details.similarityScore}`,
            { position: "top-center" }
          );
        } else if (!dobMatched && nameMatched) {
          // Name matches but DOB doesn't
          setStep("dobMismatch");
          toast.warning("Name matched but date of birth differs", {
            position: "top-center",
          });
        } else {
          // Neither matches
          setStep("dobMismatch"); // Start with DOB mismatch as it's more critical
          toast.error("Both name and date of birth have discrepancies", {
            position: "top-center",
          });
        }
      } else {
        // No DigiLocker data to compare or only DOB mismatch
        if (!dobMatched && digilockerDob) {
          setStep("dobMismatch");
          toast.warning("Date of birth mismatch detected", {
            position: "top-center",
          });
        } else {
          // Proceed anyway if we can't compare
          setStep("success");
          toast.success("Aadhaar verified successfully!", {
            position: "top-center",
          });
        }
      }
    } else {
      setError(response?.message || "Verification failed");
      setStep("otp");
      toast.error(response?.message || "Verification failed", {
        position: "top-center",
      });
    }
  } catch (err) {
    console.error("[AadhaarModal] Verify error:", err);
    const errorMessage = err?.message || "Verification failed";
    setError(errorMessage);
    setStep("otp");
    toast.error(errorMessage, { position: "top-center" });
  }
};

  const handleProceed = () => {
    const aadhaarInfo = {
      aadhaarNumber: aadhaarNumber.replace(/\s/g, ""),
      tempId,
      verifiedData,
      dobMatched: dobMatchStatus?.matched || false,
      nameMatched: nameMatchStatus?.matched || false,
      similarityScore: nameMatchStatus?.similarity || 0,
      aadhaarName: verifiedData?.name || "",
      dateOfBirth: verifiedData?.date_of_birth || "",
      gender: verifiedData?.gender || "",
      address: verifiedData?.address || {},
      fullAddress: verifiedData?.full_address || "",
      photo: verifiedData?.photo || "",
      shareCode: verifiedData?.share_code || "",
    };

    console.log("[AadhaarModal] Proceeding with Aadhaar info:", aadhaarInfo);
    onVerificationSuccess(aadhaarInfo);
    onClose();
  };

  // Resend OTP
  const handleResendOtp = async () => {
    if (countdown > 0) return;
    setOtp(["", "", "", "", "", ""]);
    await handleSendOtp();
  };

  // Don't render if not shown
  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative w-full max-w-md transform overflow-hidden rounded-2xl bg-white shadow-xl transition-all">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 z-10"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          <div className="p-6 sm:p-8">
            {/* Aadhaar Input Step */}
            {step === "aadhaar" && (
              <div className="space-y-6">
                <div className="text-center">
                  <div className="w-20 h-20 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg
                      className="w-10 h-10 text-teal-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2"
                      />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">
                    Verify Your Aadhaar
                  </h2>
                  <p className="text-gray-600 text-sm">
                    Enter your 12-digit Aadhaar number
                  </p>
                  {(digilockerName || digilockerDob) && (
                    <div className="mt-3 bg-green-50 border border-green-200 rounded-lg px-3 py-2 space-y-1">
                      {digilockerName && (
                        <p className="text-green-700 text-sm">
                          <span className="font-medium">Name:</span>{" "}
                          {digilockerName}
                        </p>
                      )}
                      {digilockerDob && (
                        <p className="text-green-700 text-sm">
                          <span className="font-medium">DOB:</span>{" "}
                          {digilockerDob}
                        </p>
                      )}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Aadhaar Number
                  </label>
                  <input
                    type="text"
                    value={aadhaarNumber}
                    onChange={handleAadhaarChange}
                    placeholder="XXXX XXXX XXXX"
                    className="w-full px-4 py-3 text-center text-2xl tracking-widest border-2 border-gray-200 
                             rounded-xl focus:border-teal-500 focus:ring-2 focus:ring-teal-200 
                             transition-all duration-200 outline-none bg-white"
                    maxLength={14}
                  />
                  <p className="mt-2 text-xs text-gray-500 text-center">
                     Your Aadhaar is safe and encrypted
                  </p>
                </div>

                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
                    {error}
                  </div>
                )}

                <button
                  onClick={handleSendOtp}
                  disabled={isSendingOtp || !validateAadhaar(aadhaarNumber)}
                  className={`w-full py-4 rounded-xl font-semibold text-white text-lg
                    ${
                      isSendingOtp || !validateAadhaar(aadhaarNumber)
                        ? "bg-gray-300 cursor-not-allowed"
                        : "bg-teal-600 hover:bg-teal-700 active:scale-[0.98]"
                    } transition-all duration-200`}
                >
                  {isSendingOtp ? (
                    <span className="flex items-center justify-center">
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      Sending OTP...
                    </span>
                  ) : (
                    "Send OTP"
                  )}
                </button>

                
              </div>
            )}

            {/* OTP Input Step */}
            {step === "otp" && (
              <div className="space-y-6">
                <div className="text-center">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg
                      className="w-10 h-10 text-green-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">
                    Enter OTP
                  </h2>
                  <p className="text-gray-600 text-sm">
                    OTP sent to your Aadhaar linked mobile
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    Aadhaar: {aadhaarNumber.slice(0, 4)} ****{" "}
                    {aadhaarNumber.slice(-4)}
                  </p>
                </div>

                <div className="flex justify-center gap-2">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      ref={(el) => (otpRefs.current[index] = el)}
                      type="text"
                      inputMode="numeric"
                      value={digit}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      onKeyDown={(e) => handleOtpKeyDown(index, e)}
                      onPaste={handleOtpPaste}
                      className="w-12 h-14 text-center text-2xl font-bold border-2 border-gray-200 
                               rounded-lg focus:border-teal-500 focus:ring-2 focus:ring-teal-200 
                               transition-all duration-200 outline-none bg-white"
                      maxLength={1}
                    />
                  ))}
                </div>

                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm text-center">
                    {error}
                  </div>
                )}

                <button
                  onClick={handleVerifyOtp}
                  disabled={isVerifyingOtp || otp.join("").length !== 6}
                  className={`w-full py-4 rounded-xl font-semibold text-white text-lg
                    ${
                      isVerifyingOtp || otp.join("").length !== 6
                        ? "bg-gray-300 cursor-not-allowed"
                        : "bg-teal-600 hover:bg-teal-700 active:scale-[0.98]"
                    } transition-all duration-200`}
                >
                  {isVerifyingOtp ? (
                    <span className="flex items-center justify-center">
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      Verifying...
                    </span>
                  ) : (
                    "Verify OTP"
                  )}
                </button>

                <div className="text-center">
                  <button
                    onClick={handleResendOtp}
                    disabled={countdown > 0 || isSendingOtp}
                    className={`text-sm ${
                      countdown > 0 || isSendingOtp
                        ? "text-gray-400 cursor-not-allowed"
                        : "text-teal-600 hover:text-teal-800"
                    }`}
                  >
                    {countdown > 0
                      ? `Resend OTP in ${countdown}s`
                      : "Resend OTP"}
                  </button>
                </div>

                <button
                  onClick={() => {
                    setStep("aadhaar");
                    setOtp(["", "", "", "", "", ""]);
                    setError("");
                  }}
                  className="w-full py-3 text-gray-600 hover:text-gray-800 text-sm"
                >
                  ← Change Aadhaar Number
                </button>
              </div>
            )}

            {/* Verifying Step */}
            {step === "verifying" && (
              <div className="text-center py-12">
                <div className="w-24 h-24 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg
                    className="animate-spin h-12 w-12 text-teal-600"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  Verifying Aadhaar
                </h2>
                <p className="text-gray-600">
                  Please wait while we verify your details...
                </p>
              </div>
            )}

            {/* Success Step */}
            {step === "success" && (
              <div className="space-y-6">
                <div className="text-center">
                  <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg
                      className="w-12 h-12 text-green-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">
                    Aadhaar Verified!
                  </h2>
                  <p className="text-gray-600">
                    Your identity has been successfully verified
                  </p>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-xl p-4 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Name</span>
                    <span className="font-semibold text-gray-800">
                      {verifiedData?.name || "Verified"}
                    </span>
                  </div>
                  {verifiedData?.date_of_birth && (
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Date of Birth</span>
                      <span className="font-semibold text-gray-800">
                        {verifiedData.date_of_birth}
                      </span>
                    </div>
                  )}
                  {verifiedData?.gender && (
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Gender</span>
                      <span className="font-semibold text-gray-800">
                        {verifiedData.gender === "M"
                          ? "Male"
                          : verifiedData.gender === "F"
                          ? "Female"
                          : verifiedData.gender}
                      </span>
                    </div>
                  )}
                  {dobMatchStatus?.matched && (
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">DOB Match</span>
                      <span className="flex items-center text-green-600">
                        <svg
                          className="w-5 h-5 mr-1"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                        Verified
                      </span>
                    </div>
                  )}
                  {nameMatchStatus?.matched && (
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Name Match</span>
                      <span className="flex items-center text-green-600">
                        <svg
                          className="w-5 h-5 mr-1"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                        Matched ({nameMatchStatus?.details?.similarityScore})
                      </span>
                    </div>
                  )}
                </div>

                <button
                  onClick={handleProceed}
                  className="w-full py-4 rounded-xl font-semibold text-white text-lg
                           bg-green-600 hover:bg-green-700 active:scale-[0.98] transition-all duration-200"
                >
                  Continue to Document Upload →
                </button>
              </div>
            )}

            {/* DOB Mismatch Step */}
            {step === "dobMismatch" && (
              <div className="space-y-6">
                <div className="text-center">
                  <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg
                      className="w-12 h-12 text-red-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">
                    Date of Birth Mismatch
                  </h2>
                  <p className="text-gray-600">
                    The date of birth doesn't match with your DigiLocker records
                  </p>
                </div>

                <div className="bg-red-50 border border-red-200 rounded-xl p-4 space-y-3">
                  <div>
                    <span className="text-gray-600 text-sm">Aadhaar DOB</span>
                    <p className="font-semibold text-gray-800">
                      {verifiedData?.date_of_birth || "N/A"}
                    </p>
                  </div>
                  <div>
                    <span className="text-gray-600 text-sm">
                      DigiLocker DOB
                    </span>
                    <p className="font-semibold text-gray-800">
                      {digilockerDob || "N/A"}
                    </p>
                  </div>
                </div>

                <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                  <p className="font-semibold text-red-600 mb-2">
                    ⚠️ Important: DOB must match for verification
                  </p>
                  <p>Please ensure you're using the correct Aadhaar number linked to your DigiLocker account.</p>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      setStep("aadhaar");
                      setAadhaarNumber("");
                      setOtp(["", "", "", "", "", ""]);
                      setError("");
                      setVerifiedData(null);
                      setDobMatchStatus(null);
                      setNameMatchStatus(null);
                    }}
                    className="flex-1 py-3 rounded-xl font-semibold border-2 border-gray-300 
                             text-gray-700 hover:bg-gray-50 transition-all duration-200"
                  >
                    Try Different Aadhaar
                  </button>
                  <button
                    onClick={onClose}
                    className="flex-1 py-3 rounded-xl font-semibold text-white
                             bg-gray-600 hover:bg-gray-700 transition-all duration-200"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            {/* Name Mismatch Step (Only shown if DOB matches) */}
            {step === "nameMismatch" && (
              <div className="space-y-6">
                <div className="text-center">
                  <div className="w-24 h-24 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg
                      className="w-12 h-12 text-yellow-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                      />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">
                    Name Variation Detected
                  </h2>
                  <p className="text-gray-600">
                    DOB matches but names have some differences
                  </p>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
                  <div className="flex items-center text-green-700">
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="font-medium">Date of Birth Verified</span>
                  </div>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 space-y-3">
                  <div>
                    <span className="text-gray-600 text-sm">Aadhaar Name</span>
                    <p className="font-semibold text-gray-800">
                      {verifiedData?.name || "N/A"}
                    </p>
                  </div>
                  <div>
                    <span className="text-gray-600 text-sm">
                      DigiLocker Name
                    </span>
                    <p className="font-semibold text-gray-800">
                      {digilockerName || "N/A"}
                    </p>
                  </div>
                  {nameMatchStatus?.details && (
                    <div className="pt-2 border-t border-yellow-200">
                      <span className="text-gray-600 text-sm">
                        Similarity Score
                      </span>
                      <p className="font-semibold text-yellow-700">
                        {nameMatchStatus.details.similarityScore}
                      </p>
                    </div>
                  )}
                </div>

                <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                  <p>Name variations may occur due to:</p>
                  <ul className="list-disc list-inside mt-1 space-y-1">
                    <li>Different name formats</li>
                    <li>Missing middle names or initials</li>
                    <li>Spelling variations</li>
                  </ul>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      setStep("aadhaar");
                      setAadhaarNumber("");
                      setOtp(["", "", "", "", "", ""]);
                      setError("");
                    }}
                    className="flex-1 py-3 rounded-xl font-semibold border-2 border-gray-300 
                             text-gray-700 hover:bg-gray-50 transition-all duration-200"
                  >
                    Try Again
                  </button>
                  <button
                    onClick={handleProceed}
                    className="flex-1 py-3 rounded-xl font-semibold text-white
                             bg-yellow-600 hover:bg-yellow-700 transition-all duration-200"
                  >
                    Proceed with DOB Match
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AadhaarVerificationModal;