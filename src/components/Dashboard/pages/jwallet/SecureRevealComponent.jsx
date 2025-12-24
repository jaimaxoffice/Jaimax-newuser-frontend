import React, { useState, useEffect } from "react";
import {
  Eye,
  EyeOff,
  Copy,
  Shield,
  Lock,
  AlertTriangle,
  Clock,
  CheckCircle,
} from "lucide-react";
import { encryptPayload, decryptPayload } from "../../../../utils/crypto";
import {
  useCheck2FAStatusQuery,
  useStart2FASetupMutation,
  useVerify2FAMutation,
  useRevealSensitiveDataMutation,
  useDisable2FAMutation,
} from "./secureRevealApiSlice";
import OtpInput from "./OtpInput";

const SecureRevealComponent = () => {
  const [step, setStep] = useState("initial");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [enableOtp, setEnableOtp] = useState("");
  const [disableOtp, setDisableOtp] = useState("");
  const [revealedData, setRevealedData] = useState(null);
  const [revealed, setRevealed] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");
  const [revealType, setRevealType] = useState("seed");
  const [qrCode, setQrCode] = useState("");
  const [passwordRevealed, setPasswordRevealed] = useState(false);

  const is2FAVerified = sessionStorage.getItem("2faVerified") === "true";

  // RTK Query hooks
  const {
    data: statusData,
    isLoading: checking2FA,
    refetch: refetch2FA,
  } = useCheck2FAStatusQuery();
  const [start2FASetup, { isLoading: loadingSetup }] =
    useStart2FASetupMutation();
  const [verify2FA, { isLoading: loadingVerify }] = useVerify2FAMutation();
  const [revealSensitiveData, { isLoading: loadingReveal }] =
    useRevealSensitiveDataMutation();
  const [disable2FA, { isLoading: disabling2FA }] = useDisable2FAMutation();

  const is2FAEnabled = statusData?.data?.twoFactorEnabled || false;

  useEffect(() => {
    refetch2FA();
  }, []);

  const getApiErrorMessage = (err) => {
    if (err?.data) {
      const { message, status_code, data } = err.data;

      if (status_code === 423 && data?.remainingTime) {
        return `${message}. Try again in ${data.remainingTime}.`;
      }

      return message || "Something went wrong";
    }

    return err?.message || "Unexpected error occurred";
  };

  // Start 2FA setup
  const handleStart2FASetup = async () => {
    setError("");
    try {
      const result = await start2FASetup().unwrap();
      if (result.success === 0) throw new Error(result.message);
      setQrCode(result.data.qrCodeUrl);
    } catch (err) {
      // setError(err.message || 'Failed to start 2FA setup');
      setError(getApiErrorMessage(err));
    }
  };

  // Verify 2FA code
  const handleVerify2FA = async () => {
    if (enableOtp.length !== 6) return setError("Enter valid 6-digit code");
    setError("");

    try {
      const result = await verify2FA(enableOtp).unwrap();
      if (result.success === 0) throw new Error(result.message);
      sessionStorage.setItem("2faVerified", "true");
      setQrCode("");
    } catch (err) {
      // setError(err.message || 'Failed to verify 2FA');
      setError(getApiErrorMessage(err));
    }
  };

  // Reveal sensitive data
  const handleReveal = async () => {
    if (!password) return setError("Please enter your password");
    if (is2FAEnabled && otp.length !== 6)
      return setError("Please enter a valid 6-digit 2FA code");

    setError("");
    try {
      const payload = {
        action:
          revealType === "seed" ? "reveal_seed_phrase" : "reveal_private_key",
        otp: otp || null,
        timestamp: Date.now(),
      };

      const { consent, terms } = await encryptPayload(payload, password);

      const revealPayload = { consent, terms, password, otp: otp || null };
      const result = await revealSensitiveData(revealPayload).unwrap();

      if (result.success === 0) throw new Error(result.message);

      const decryptedData = await decryptPayload(
        result.data.consent,
        result.data.terms,
        password
      );

      setRevealedData(decryptedData);
      setStep("display");

      if (is2FAEnabled) {
        sessionStorage.setItem("2faVerified", "true");
        sessionStorage.setItem("2faVerifiedTime", Date.now().toString());
      }

      let counter = 60;
      const timer = setInterval(() => {
        counter--;
        setTimeLeft(counter);
        if (counter === 0) {
          clearInterval(timer);
          handleClose();
        }
      }, 1000);
    } catch (err) {
      // setError(err.message || 'Failed to reveal data');
      setError(getApiErrorMessage(err));
    }
  };

  const handleCopy = () => {
    const textToCopy =
      revealType === "seed"
        ? revealedData?.seedPhrase
        : revealedData?.privateKey;
    if (textToCopy) {
      navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleClose = () => {
    setStep("initial");
    setPassword("");
    setOtp("");
    setRevealedData(null);
    setRevealed(false);
    setTimeLeft(60);
    setError("");
    setQrCode("");
  };

  const handleDisable2FA = async () => {
    if (disableOtp.length !== 6) {
      return setError("Enter valid 6-digit 2FA code to disable");
    }

    setError("");

    try {
      const res = await disable2FA(disableOtp).unwrap();

      if (res.success === 0) throw new Error(res.message);

      sessionStorage.removeItem("2faVerified");
      sessionStorage.removeItem("2faVerifiedTime");

      setDisableOtp("");
      // await refetch2FA();

      alert("2FA disabled successfully");
    } catch (err) {
      // setError(err.message || "Failed to disable 2FA");
      setError(getApiErrorMessage(err));
    }
  };

  useEffect(() => {
    if (qrCode) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [qrCode]);

  if (checking2FA) {
    return (
      <div className="min-h-screen bg-green-50 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="max-w-2xl mx-auto">
        {step === "initial" && (
          <div className="p-4 sm:p-6 md:p-8">
            <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-4">
              {/* <Shield className="text-teal-600 flex-shrink-0" size={24} /> */}
              <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800">
                Access Sensitive Data
              </h1>
            </div>

            <div className="bg-red-50 border border-red-200 rounded-lg p-3 sm:p-4 mb-2 sm:mb-2">
              <div className="flex gap-2 sm:gap-3">
                {/* <AlertTriangle className="text-red-500 flex-shrink-0 mt-0.5" size={20} /> */}
                <div className="text-xs sm:text-sm text-red-800">
                  <p className="font-semibold mb-2">Security Warning</p>
                  <ul className="space-y-1 list-disc list-inside">
                    <li>Never share your seed phrase or private key</li>
                    <li>Ensure you're in a private location</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* 2FA Status */}
            {is2FAEnabled ? (
              <div className="mb-2 sm:mb-6 bg-green-50 border border-green-200 rounded-lg p-3 sm:p-4">
                <div className="flex items-center gap-2 text-green-700">
                  <CheckCircle size={18} className="flex-shrink-0" />
                  <span className="font-semibold text-sm sm:text-base">
                    2FA is enabled for your account
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-gray-700 mt-2">
                  {is2FAVerified
                    ? "✓ You have already verified with 2FA in this session"
                    : "You will be asked for your authenticator code when revealing sensitive data"}
                </p>
              </div>
            ) : (
              <div className="mb-4 sm:mb-6">
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 sm:p-4 mb-3">
                  <p className="text-yellow-800 text-xs sm:text-sm">
                    <strong>Recommended:</strong> Enable 2FA for additional
                    security when accessing sensitive data.
                  </p>
                </div>
                <button
                  onClick={handleStart2FASetup}
                  disabled={loadingSetup}
                  className="w-full bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 disabled:from-gray-400 disabled:to-gray-400 text-white font-semibold py-2.5 sm:py-3 rounded-full transition-all text-sm sm:text-base"
                >
                  {loadingSetup
                    ? "Processing..."
                    : "Enable Google Authenticator"}
                </button>
              </div>
            )}

            {qrCode && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
                <div className="bg-white w-full max-w-sm rounded-2xl p-5 shadow-xl relative">
                  <h2 className="text-lg font-bold text-gray-800 text-center mb-2">
                    Enable Google Authenticator
                  </h2>
                  <p className="text-xs text-gray-600 text-center mb-4">
                    Scan the QR code using Google Authenticator
                  </p>

                  <div className="flex justify-center mb-4">
                    <img
                      src={qrCode}
                      alt="2FA QR Code"
                      className="w-40 h-40 rounded-lg border"
                    />
                  </div>

                  {/* OTP Input */}

                  <OtpInput value={enableOtp} onChange={setEnableOtp} />
                 <p className="text-xs text-teal-400 mb-2 text-center sm:text-left sm:ml-12 p-2">Enter your OTP:</p>
                  {error && (
                    <p className="text-red-600 text-xs text-center mt-2">
                      {error}
                    </p>
                  )}

                  <div className="flex gap-2 mt-4">
                    <button
                      onClick={() => {
                        setQrCode("");
                        setEnableOtp("");
                      }}
                      className="flex-1 bg-teal-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 rounded-lg"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleVerify2FA}
                      disabled={loadingVerify || enableOtp.length !== 6}
                      className="flex-1 bg-teal-500 hover:bg-teal-600 disabled:bg-teal-400 text-white font-semibold py-2 rounded-lg"
                    >
                      {loadingVerify ? "Verifying..." : "Verify"}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Reveal Type */}
            <div className="mb-4 sm:mb-6">
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2 sm:mb-3">
                What do you want to reveal?
              </label>
              <div className="grid grid-cols-2 gap-2 sm:gap-3">
                <button
                  onClick={() => setRevealType("seed")}
                  className={`p-3 sm:p-4 rounded-lg border-2 transition-all ${
                    revealType === "seed"
                      ? "border-teal-500 bg-teal-50"
                      : "border-gray-300 bg-gray-50"
                  }`}
                >
                  <div className="text-gray-800 font-semibold mb-1 text-sm sm:text-base">
                    Seed Phrase
                  </div>
                  <div className="text-xs text-gray-600">
                    12-word recovery phrase
                  </div>
                </button>
                <button
                  onClick={() => setRevealType("private")}
                  className={`p-3 sm:p-4 rounded-lg border-2 transition-all ${
                    revealType === "private"
                      ? "border-teal-500 bg-teal-50"
                      : "border-gray-300 bg-gray-50"
                  }`}
                >
                  <div className="text-gray-800 font-semibold mb-1 text-sm sm:text-base">
                    Private Key
                  </div>
                  <div className="text-xs text-gray-600">Hexadecimal key</div>
                </button>
              </div>
            </div>

            <button
              onClick={() => setStep("verify")}
              className="w-full bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white font-semibold py-2.5 sm:py-3 rounded-full transition-all text-sm sm:text-base"
            >
              I Understand, Continue
            </button>
          </div>
        )}
        {step === "verify" && (
          <div className="p-4 sm:p-6 md:p-8">
            <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
              <Lock className="text-teal-600 flex-shrink-0" size={24} />
              <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800">
                Verify Your Identity
              </h1>
            </div>

            {error &&
              typeof error === "string" &&
              !error.includes("already enabled") && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
                  <p className="text-red-700 text-xs sm:text-sm">{error}</p>
                </div>
              )}

            {is2FAEnabled && (
              <div className="mt-3 bg-red-50 border border-red-200 rounded-lg p-3">
                <p className="text-xs sm:text-sm text-red-700 mb-2">
                  Disable 2FA (requires authenticator code)
                </p>

                <OtpInput value={disableOtp} onChange={setDisableOtp} />

                <button
                  onClick={handleDisable2FA}
                  disabled={disabling2FA || disableOtp.length !== 6}
                  className="mt-3 w-full bg-red-500 hover:bg-red-600 disabled:bg-gray-400 text-white font-semibold py-2 rounded-lg"
                >
                  {disabling2FA ? "Disabling..." : "Disable"}
                </button>
              </div>
            )}

            <div className="space-y-3 sm:space-y-4 mt-4">
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                  Enter Jaimax Password
                </label>
                <div className="relative">
                  <input
                    type={passwordRevealed ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-white border border-gray-300 rounded-lg px-3 sm:px-4 py-2 sm:py-3 text-gray-800 focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-200 text-sm sm:text-base pr-10"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setPasswordRevealed(!revealed)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-teal-600 focus:outline-none transition-colors"
                    aria-label={revealed ? "Hide password" : "Show password"}
                  >
                    {revealed ? (
                      <EyeOff className="w-4 h-4 sm:w-5 sm:h-5" />
                    ) : (
                      <Eye className="w-4 h-4 sm:w-5 sm:h-5" />
                    )}
                  </button>
                </div>
              </div>

              {is2FAEnabled && (
                <div className="mb-4">
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                    2FA Code from Google Authenticator
                  </label>

                  <div className="bg-white border border-gray-300 rounded-lg p-3 sm:p-4">
                    <OtpInput
                      length={6} // 6-digit OTP
                      value={otp} // current OTP state
                      onChange={setOtp} // update OTP state
                    />
                    <p className="text-xs sm:text-sm text-gray-600 mt-2">
                      Enter the 6-digit code from your authenticator app
                    </p>
                  </div>
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-2">
                <button
                  onClick={() => setStep("initial")}
                  className="w-full sm:flex-1 bg-teal-100 hover:bg-gray-300 text-gray-800 font-semibold py-2.5 sm:py-3 rounded-full transition-colors text-sm sm:text-base"
                >
                  Cancel
                </button>
                <button
                  onClick={handleReveal}
                  disabled={
                    loadingReveal ||
                    !password ||
                    (is2FAEnabled && otp.length !== 6)
                  }
                  className="w-full sm:flex-1 bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 disabled:from-teal-400 disabled:to-teal-400 disabled:cursor-not-allowed text-white font-semibold py-2.5 sm:py-3 rounded-full transition-all text-sm sm:text-base"
                >
                  {loadingReveal ? "Verifying..." : "Verify & Decrypt"}
                </button>
              </div>
            </div>
          </div>
        )}

        {step === "display" && revealedData && (
          <div className="p-4 sm:p-6 md:p-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 sm:mb-6 gap-3">
              <div className="flex items-center gap-2 sm:gap-3">
                <Eye className="text-teal-600 flex-shrink-0" size={24} />
                <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800">
                  {revealType === "seed" ? "Seed Phrase" : "Private Key"}
                </h1>
              </div>
              <div className="text-left sm:text-right">
                <div className="text-xs text-gray-600">Auto-hide in</div>
                <div
                  className={`text-xl sm:text-2xl font-bold ${
                    timeLeft <= 10 ? "text-red-500" : "text-teal-600"
                  }`}
                >
                  {timeLeft}s
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 sm:p-6 mb-4 border border-teal-200">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs sm:text-sm font-medium text-gray-700">
                  {revealType === "seed" ? "Seed Phrase" : "Private Key"}
                </span>
                <button
                  onClick={() => setRevealed(!revealed)}
                  className="text-teal-600 hover:text-teal-700 transition-colors"
                >
                  {revealed ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              <div
                className={`font-mono text-sm sm:text-base md:text-lg text-gray-800 leading-relaxed break-all ${
                  !revealed ? "blur-lg select-none" : ""
                }`}
              >
                {revealType === "seed"
                  ? revealedData.seedPhrase
                  : revealedData.privateKey}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6 text-xs sm:text-sm">
              <div className="bg-gray-50 rounded-lg p-3">
                <div className="text-gray-600 mb-1">Public Address</div>
                <div className="text-gray-800 font-mono text-xs break-all">
                  {revealedData.publicAddress}
                </div>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <div className="text-gray-600 mb-1">Retrieved At</div>
                <div className="text-gray-800 font-mono text-xs">
                  {new Date(revealedData.retrievedAt).toLocaleString()}
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
              <button
                onClick={handleCopy}
                disabled={!revealed}
                className="w-full sm:flex-1 bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 disabled:from-teal-400 disabled:to-teal-400 disabled:cursor-not-allowed text-white font-semibold py-2.5 sm:py-3 rounded-full transition-all flex items-center justify-center gap-2 text-sm sm:text-base"
              >
                {copied ? (
                  <>
                    <CheckCircle size={18} />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy size={18} />
                    Copy to Clipboard
                  </>
                )}
              </button>
              <button
                onClick={handleClose}
                className="w-full sm:w-auto px-6 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2.5 sm:py-3 rounded-full transition-colors text-sm sm:text-base"
              >
                Close
              </button>
            </div>

            <div className="mt-4 text-xs text-gray-600 text-center">
              This action has been logged. A notification may be sent to your
              email.
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SecureRevealComponent;
