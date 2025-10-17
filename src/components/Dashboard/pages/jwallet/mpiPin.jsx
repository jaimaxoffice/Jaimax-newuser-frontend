import React, { useState, useRef,useEffect  } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";
// import CheckCircleIcon  from "react-lucide";
import {
  useRequestCreatePinOtpMutation,
  useCreatePinMutation,
  useVerifyPinMutation,
  useModifyPinMutation,
  useRequestForgetPinOtpMutation,
  useForgetPinMutation,
  useGetSecurityQuestionsQuery,
} from "./MpipinApiSlice";
const defaultQuestions = [
  "What is your pet's name?",
  "What is your favorite color?",
];


export default function CreateWalletPin({ onClose }) {
  // Step state
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  // Form state
  const [pin, setPin] = useState("");
  
const [showConfirmPin, setShowConfirmPin] = useState(false);
  const [questions, setQuestions] = useState([
    { question: defaultQuestions[0], answer: "" },
    { question: defaultQuestions[1], answer: "" },
  ]);
  const [otp, setOtp] = useState("");
  const [confirmPin, setConfirmPin] = useState("");
  const [showPin, setShowPin] = useState(false);
  // API hooks
  const [
    requestOtp,
    { isLoading: requestingOtp, error: otpError, data: otpData },
  ] = useRequestCreatePinOtpMutation();
  
  const [
    createPin,
    { isLoading: creatingPin, error: createPinError, data: createPinData },
  ] = useCreatePinMutation();

  // Error state
  const [formError, setFormError] = useState("");

  // Auto-close after success
  useEffect(() => {
    if (step === 3) {
      const timer = setTimeout(() => {
        if (onClose) onClose();
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [step, onClose]);

  // Handlers
  const handleRequestOtp = async (e) => {
    e.preventDefault();
    setFormError("");

    // Basic validation
    if (!/^\d{4,6}$/.test(pin)) {
      setFormError("PIN must be 6 digits.");
      return;
    }
    if (pin !== confirmPin) {
      setFormError("PIN and Confirm PIN do not match.");
      return;
    }
    if (questions.some((q) => !q.answer.trim())) {
      setFormError("Please answer both security questions.");
      return;
    }

    try {
      const res = await requestOtp({
        pin,
        confirmPin,
        securityQuestions: questions,
      }).unwrap();
      if (res.success) setStep(2);
    } catch (err) {
      setFormError(err?.data?.message || "Failed to request OTP.");
    }
  };

  const handleCreatePin = async (e) => {
    e.preventDefault();
    setFormError("");
    if (!otp) {
      setFormError("Please enter the OTP.");
      return;
    }
    try {
      const res = await createPin({ otp }).unwrap();
      if (res.success) setStep(3);
    } catch (err) {
      setFormError(err?.data?.message || "Failed to create PIN.");
    }
  };

  const inputClasses = "w-full border border-teal-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 bg-white/70 backdrop-blur-sm transition-all shadow-sm";
  const buttonClasses = "w-full bg-gradient-to-r from-teal-500 to-teal-600 text-white py-2.5 rounded-lg hover:from-teal-600 hover:to-teal-700 transition-all duration-300 shadow-md text-sm font-medium transform hover:translate-y-[-1px] active:translate-y-[1px]";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="max-w-md mx-auto mt-4 sm:mt-8 backdrop-blur-md bg-white/80 shadow-lg rounded-xl p-5 sm:p-7 border border-teal-100/50"
    >
      <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-5 text-center text-teal-700">
        {step === 1 && "Create Wallet PIN"}
        {step === 2 && "Verify OTP"}
        {step === 3 && "PIN Created!"}
      </h2>

      <AnimatePresence mode="wait">
        {formError && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-3 sm:mb-4 px-3 py-2 bg-red-50 border border-red-100 rounded-lg text-red-600 text-xs sm:text-sm text-center"
          >
            {formError}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {/* Step 1: Request OTP */}
        {step === 1 && (
          <motion.form
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={handleRequestOtp}
            className="space-y-3 sm:space-y-4"
          >
            {/* <div>
              <label className="block text-xs sm:text-sm font-medium mb-1.5 text-teal-800">
                PIN
              </label>
              <input
                type="password"
                maxLength={6}
                minLength={4}
                value={pin}
                onChange={(e) => setPin(e.target.value.replace(/\D/g, ""))}
                className={inputClasses}
                placeholder="Enter 4-6 digit PIN"
                required
              />
            </div> */}
            {/* <div>
              <label className="block text-xs sm:text-sm font-medium mb-1.5 text-teal-800">
                Confirm PIN
              </label>
              <input
                type="password"
                maxLength={6}
                minLength={4}
                value={confirmPin}
                onChange={(e) => setConfirmPin(e.target.value.replace(/\D/g, ""))}
                className={inputClasses}
                placeholder="Confirm your PIN"
                required
              />
            </div> */}
            <div>
  <label className="block text-xs sm:text-sm font-medium mb-1.5 text-teal-800">
    PIN
  </label>
  <div className="relative">
    <input
      type={showPin ? "text" : "password"}
      maxLength={6}
      minLength={4}
      value={pin}
      onChange={(e) => setPin(e.target.value.replace(/\D/g, ""))}
      className={`${inputClasses} pr-10`} // Add padding for the icon
      placeholder="Enter 4-6 digit PIN"
      required
    />
    <button
      type="button"
      onClick={() => setShowPin(!showPin)}
      className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500 hover:text-teal-600 transition-colors"
    >
      {showPin ? (
        <EyeOff className="h-4 w-4" />
      ) : (
        <Eye className="h-4 w-4" />
      )}
    </button>
  </div>
</div>
            <div>
  <label className="block text-xs sm:text-sm font-medium mb-1.5 text-teal-800">
    Confirm PIN
  </label>
  <div className="relative">
    <input
      type={showConfirmPin ? "text" : "password"}
      maxLength={6}
      minLength={4}
      value={confirmPin}
      onChange={(e) => setConfirmPin(e.target.value.replace(/\D/g, ""))}
      className={`${inputClasses} pr-10`} // Add padding for the icon
      placeholder="Confirm your PIN"
      required
    />
    <button
      type="button"
      onClick={() => setShowConfirmPin(!showConfirmPin)}
      className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500 hover:text-teal-600 transition-colors"
    >
      {showConfirmPin ? (
        <EyeOff className="h-4 w-4" />
      ) : (
        <Eye className="h-4 w-4" />
      )}
    </button>
  </div>
</div>
            {questions.map((q, idx) => (
              <div key={idx}>
                <label className="block text-xs sm:text-sm font-medium mb-1.5 text-teal-800">
                  {q.question}
                </label>
                <input
                  type="text"
                  value={q.answer}
                  onChange={(e) => {
                    const newQuestions = [...questions];
                    newQuestions[idx].answer = e.target.value;
                    setQuestions(newQuestions);
                  }}
                  className={inputClasses}
                  placeholder="Your answer"
                  required
                />
              </div>
            ))}
            <button
              type="submit"
              className={`${buttonClasses} mt-3`}
              disabled={requestingOtp}
            >
              {requestingOtp ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Requesting...
                </span>
              ) : (
                "Request OTP"
              )}
            </button>
          </motion.form>
        )}

        {/* Step 2: Enter OTP */}
        {step === 2 && (
          <motion.form
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={handleCreatePin}
            className="space-y-3 sm:space-y-4"
          >
            <div className="mb-2 text-center text-teal-600 text-xs sm:text-sm p-3 bg-teal-50/70 rounded-lg border border-teal-100">
              {otpData?.data?.email
                ? `OTP sent to: ${otpData.data.email}`
                : "OTP sent to your registered email"}
            </div>
            <div>
              <label className="block text-xs sm:text-sm font-medium mb-1.5 text-teal-800">
                Enter OTP
              </label>
              <input
                type="text"
                maxLength={6}
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                className={inputClasses}
                placeholder="Enter 6-digit OTP"
                autoFocus
                required
              />
            </div>
            <button
              type="submit"
              className={`${buttonClasses} mt-3`}
              disabled={creatingPin}
            >
              {creatingPin ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Verifying...
                </span>
              ) : (
                "Verify & Create PIN"
              )}
            </button>
            <div className="text-center">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="text-teal-600 text-xs sm:text-sm hover:text-teal-800 transition-colors mt-2"
              >
                Go back
              </button>
            </div>
          </motion.form>
        )}

        {/* Step 3: Success */}
        {step === 3 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="text-center py-4 sm:py-6"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", damping: 8 }}
              className="inline-flex items-center justify-center p-2 rounded-full bg-teal-100 text-teal-600 mb-4"
            >
              {/* <CheckCircleIcon className="h-10 w-10 text-teal-500" /> */}
            </motion.div>
            <h3 className="text-lg sm:text-xl font-medium mb-3 sm:mb-4 text-teal-800">
              Wallet PIN created successfully!
            </h3>
            <div className="p-3 sm:p-4 border border-teal-200 rounded-lg bg-teal-50/70 backdrop-blur-sm text-teal-700 text-sm">
              <p>You can now access your wallet securely</p>
              <p className="text-xs text-teal-500 mt-2">
                This window will close automatically...
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}



export function PinEntryModal({ onSuccess, onForgotPin, onChangePin }) {
  const [pin, setPin] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const [verifyPin, { isLoading }] = useVerifyPinMutation();
  const inputs = useRef([]);
  const navigate = useNavigate();

  const handleChange = (e, idx) => {
    const val = e.target.value.replace(/\D/g, "");
    if (!val) return;
    const newPin = [...pin];
    newPin[idx] = val;
    setPin(newPin);
    if (idx < 5) {
      inputs.current[idx + 1].focus();
    }
  };

  const handleKeyDown = (e, idx) => {
    if (e.key === "Backspace") {
      if (pin[idx]) {
        const newPin = [...pin];
        newPin[idx] = "";
        setPin(newPin);
      } else if (idx > 0) {
        inputs.current[idx - 1].focus();
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const enteredPin = pin.join("");
    if (enteredPin.length < 6) {
      setError("PIN must be 6 digits.");
      return;
    }
    try {
      const res = await verifyPin({ pin: enteredPin }).unwrap();
      if (res.success) {
        onSuccess();
      } else {
        setError(res.message || "Invalid PIN");
        setPin(["", "", "", "", "", ""]);
        inputs.current[0].focus();
      }
    } catch (err) {
      setError(err?.data?.message || "Invalid PIN");
      setPin(["", "", "", "", "", ""]);
      inputs.current[0].focus();
    }
  };

  const handleClose = () => {
    navigate("/dashboard");
  };

  return (
    <div className="fixed inset-0   flex items-center justify-center z-50 mr-2 ">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl shadow-2xl max-w-md w-full p-8 flex flex-col items-center relative"
      >
        <button
          type="button"
          onClick={handleClose}
          className="absolute top-4 right-4 text-teal-700 hover:text-teal-900 transition "
          aria-label="Close"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
        
        <h2 className="text-2xl font-bold mb-4 text-teal-700">
          Enter Wallet PIN
        </h2>
        <div className="flex gap-3 mb-4">
          {[0, 1, 2, 3, 4, 5].map((idx) => (
            <input
              key={idx}
              ref={(el) => (inputs.current[idx] = el)}
              type="password"
              maxLength={1}
              className="w-12 h-14 text-center text-2xl border-2 border-teal-400 rounded-lg bg-teal-50 text-teal-900 focus:border-teal-600 focus:bg-white focus:outline-none transition"
              value={pin[idx]}
              onChange={(e) => handleChange(e, idx)}
              onKeyDown={(e) => handleKeyDown(e, idx)}
              autoFocus={idx === 0}
              inputMode="numeric"
              pattern="[0-9]*"
            />
          ))}
        </div>
        {error && <div className="text-red-600 mb-2">{error}</div>}
        <button
          type="submit"
          className="bg-teal-600 text-white px-8 py-2 rounded-lg font-semibold hover:bg-teal-700 transition"
          disabled={isLoading}
        >
          {isLoading ? "Verifying..." : "Unlock Wallet"}
        </button>
        <div className="flex justify-between w-full mt-4">
          <button
            type="button"
            className="text-teal-600 hover:underline text-sm"
            onClick={onForgotPin}
          >
            Forgot PIN?
          </button>
          <button
            type="button"
            className="text-teal-700 hover:underline text-sm"
            onClick={onChangePin}
          >
            Change PIN
          </button>
        </div>
      </form>
    </div>
  );
}
export function ForgotPinModal({ onClose }) {
  const [step, setStep] = useState(1);
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();
  
  const [answers, setAnswers] = useState(["", ""]);
  const [newPin, setNewPin] = useState("");
  const [confirmNewPin, setConfirmNewPin] = useState("");
  const [error, setError] = useState("");
  const [requestOtp, { isLoading: requestingOtp }] =
    useRequestForgetPinOtpMutation();
  const [forgetPin, { isLoading: resettingPin }] = useForgetPinMutation();
  const { data: questionsData } = useGetSecurityQuestionsQuery();
  const [showNewPin, setShowNewPin] = useState(false);
const [showConfirmNewPin, setShowConfirmNewPin] = useState(false);


  // Step 1: Request OTP
  const handleRequestOtp = async () => {
    setError("");
    try {
      const res = await requestOtp().unwrap();
      if (res.success) setStep(2);
      else setError(res.message || "Failed to send OTP");
    } catch (err) {
      setError(err?.data?.message || "Failed to send OTP");
    }
  };

  // Step 2: Reset PIN
  const handleResetPin = async (e) => {
    e.preventDefault();
    setError("");
    if (!otp || answers.some((a) => !a) || !newPin || !confirmNewPin) {
      setError("All fields are required.");
      return;
    }
    if (newPin !== confirmNewPin) {
      setError("PINs do not match.");
      return;
    }
    try {
      const res = await forgetPin({
        otp,
        answers,
        newPin,
        confirmNewPin,
      }).unwrap();
      if (res.success) {
        setStep(3);
        setTimeout(onClose, 1500);
      } else {
        setError(res.message || "Failed to reset PIN");
      }
    } catch (err) {
      setError(err?.data?.message || "Failed to reset PIN");
    }
  };

  return (
    <div className="fixed inset-0 bg-teal-900 bg-opacity-60 flex items-center justify-center z-50 px-2">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 sm:p-8 flex flex-col items-center">
        <h2 className="text-2xl font-bold mb-4 text-teal-700">Forgot PIN</h2>
        {step === 1 && (
          <>
            <p className="mb-4 text-teal-900">
              Click below to request OTP for PIN reset.
            </p>
            {error && <div className="text-red-600 mb-2">{error}</div>}
            <button
              onClick={handleRequestOtp}
              className="bg-teal-600 text-white px-6 py-2 rounded-lg hover:bg-teal-700 transition w-full font-semibold"
              disabled={requestingOtp}
            >
              {requestingOtp ? "Requesting OTP..." : "Request OTP"}
            </button>
            <button
              onClick={() => navigate("/dashboard")}
              type="button"
              className="mt-4 text-teal-600 underline text-sm font-medium"
            >
              Cancel
            </button>
          </>
        )}
        {step === 2 && (
          <form
            onSubmit={handleResetPin}
            className="w-full flex flex-col items-center"
          >
            <div className="mb-2 w-full">
              <label className="block text-sm font-medium mb-1 text-teal-700">
                OTP
              </label>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                className="w-full border-2 border-teal-200 rounded-lg px-3 py-2 bg-teal-50 focus:border-teal-500 focus:bg-white focus:outline-none transition"
                maxLength={6}
                required
              />
            </div>
            {questionsData?.data?.securityQuestions?.map((q, idx) => (
              <div className="mb-2 w-full" key={idx}>
                <label className="block text-sm font-medium mb-1 text-teal-700">
                  {q}
                </label>
                <input
                  type="text"
                  value={answers[idx]}
                  onChange={(e) => {
                    const arr = [...answers];
                    arr[idx] = e.target.value;
                    setAnswers(arr);
                  }}
                  className="w-full border-2 border-teal-200 rounded-lg px-3 py-2 bg-teal-50 focus:border-teal-500 focus:bg-white focus:outline-none transition"
                  required
                />
              </div>
            ))}
           <div className="mb-2 w-full">
  <label className="block text-sm font-medium mb-1 text-teal-700">
    New PIN
  </label>
  <div className="relative">
    <input
      type={showNewPin ? "text" : "password"}
      value={newPin}
      onChange={(e) => setNewPin(e.target.value.replace(/\D/g, ""))}
      className="w-full border-2 border-teal-200 rounded-lg px-3 py-2 pr-10 bg-teal-50 focus:border-teal-500 focus:bg-white focus:outline-none transition"
      maxLength={6}
      minLength={4}
      required
    />
    <button
      type="button"
      onClick={() => setShowNewPin(!showNewPin)}
      className="absolute inset-y-0 right-0 flex items-center px-3 text-teal-500 hover:text-teal-700 transition-colors"
    >
      {showNewPin ? (
        <EyeOff className="h-4 w-4" />
      ) : (
        <Eye className="h-4 w-4" />
      )}
    </button>
  </div>
</div>
           <div className="mb-2 w-full">
  <label className="block text-sm font-medium mb-1 text-teal-700">
    Confirm New PIN
  </label>
  <div className="relative">
    <input
      type={showConfirmNewPin ? "text" : "password"}
      value={confirmNewPin}
      onChange={(e) => setConfirmNewPin(e.target.value.replace(/\D/g, ""))}
      className="w-full border-2 border-teal-200 rounded-lg px-3 py-2 pr-10 bg-teal-50 focus:border-teal-500 focus:bg-white focus:outline-none transition"
      maxLength={6}
      minLength={4}
      required
    />
    <button
      type="button"
      onClick={() => setShowConfirmNewPin(!showConfirmNewPin)}
      className="absolute inset-y-0 right-0 flex items-center px-3 text-teal-500 hover:text-teal-700 transition-colors"
    >
      {showConfirmNewPin ? (
        <EyeOff className="h-4 w-4" />
      ) : (
        <Eye className="h-4 w-4" />
      )}
    </button>
  </div>
</div>
            {error && <div className="text-red-600 mb-2">{error}</div>}
            <button
              type="submit"
              className="bg-teal-600 text-white px-6 py-2 rounded-lg hover:bg-teal-700 transition w-full font-semibold"
              disabled={resettingPin}
            >
              {resettingPin ? "Resetting..." : "Reset PIN"}
            </button>
            <button
              onClick={() => navigate("/dashboard")}
              type="button"
              className="mt-4 text-teal-600 underline text-sm font-medium"
            >
              Cancel
            </button>
          </form>
        )}
        {step === 3 && (
          <div className="text-green-600 text-center flex flex-col items-center">
            <div className="text-3xl mb-2">✔️</div>
            <div className="font-semibold text-lg">PIN reset successfully!</div>
          </div>
        )}
      </div>
    </div>
  );
}

export function ChangePinModal({ onClose }) {
  const [pin, setPin] = useState("");
  const [newPin, setNewPin] = useState("");
  const [confirmNewPin, setConfirmNewPin] = useState("");
  const [showNewPin, setShowNewPin] = useState(false);
const [showConfirmNewPin, setShowConfirmNewPin] = useState(false);
  const [error, setError] = useState("");
  const [modifyPin, { isLoading }] = useModifyPinMutation();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!pin || !newPin || !confirmNewPin) {
      setError("All fields are required.");
      return;
    }
    if (newPin !== confirmNewPin) {
      setError("New PINs do not match.");
      return;
    }
    try {
      const res = await modifyPin({ pin, newPin, confirmNewPin }).unwrap();
      if (res.success) {
        setError("");
        setTimeout(onClose, 1000);
      } else {
        setError(res.message || "Failed to change PIN");
      }
    } catch (err) {
      setError(err?.data?.message || "Failed to change PIN");
    }
  };

  return (
    <div className="fixed inset-0 bg-teal-900 bg-opacity-60 flex items-center justify-center z-50 px-2">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 sm:p-8 flex flex-col items-center"
      >
        <h2 className="text-2xl font-bold mb-4 text-teal-700">Change PIN</h2>
        <div className="mb-2 w-full">
          <label className="block text-sm font-medium mb-1 text-teal-700">
            Current PIN
          </label>
          <input
            type="password"
            value={pin}
            onChange={(e) => setPin(e.target.value.replace(/\D/g, ""))}
            className="w-full border-2 border-teal-200 rounded-lg px-3 py-2 bg-teal-50 focus:border-teal-500 focus:bg-white focus:outline-none transition"
            maxLength={6}
            minLength={4}
            required
          />
        </div>
        <div className="mb-2 w-full">
  <label className="block text-sm font-medium mb-1 text-teal-700">
    New PIN
  </label>
  <div className="relative">
    <input
      type={showNewPin ? "text" : "password"}
      value={newPin}
      onChange={(e) => setNewPin(e.target.value.replace(/\D/g, ""))}
      className="w-full border-2 border-teal-200 rounded-lg px-3 py-2 pr-10 bg-teal-50 focus:border-teal-500 focus:bg-white focus:outline-none transition"
      maxLength={6}
      minLength={4}
      required
    />
    <button
      type="button"
      onClick={() => setShowNewPin(!showNewPin)}
      className="absolute inset-y-0 right-0 flex items-center px-3 text-teal-500 hover:text-teal-700 transition-colors"
    >
      {showNewPin ? (
        <EyeOff className="h-4 w-4" />
      ) : (
        <Eye className="h-4 w-4" />
      )}
    </button>
  </div>
</div>
      <div className="mb-2 w-full">
  <label className="block text-sm font-medium mb-1 text-teal-700">
    Confirm New PIN
  </label>
  <div className="relative">
    <input
      type={showConfirmNewPin ? "text" : "password"}
      value={confirmNewPin}
      onChange={(e) =>
        setConfirmNewPin(e.target.value.replace(/\D/g, ""))
      }
      className="w-full border-2 border-teal-200 rounded-lg px-3 py-2 pr-10 bg-teal-50 focus:border-teal-500 focus:bg-white focus:outline-none transition"
      maxLength={6}
      minLength={4}
      required
    />
    <button
      type="button"
      onClick={() => setShowConfirmNewPin(!showConfirmNewPin)}
      className="absolute inset-y-0 right-0 flex items-center px-3 text-teal-500 hover:text-teal-700 transition-colors"
    >
      {showConfirmNewPin ? (
        <EyeOff className="h-4 w-4" />
      ) : (
        <Eye className="h-4 w-4" />
      )}
    </button>
  </div>
</div>
        {error && <div className="text-red-600 mb-2">{error}</div>}
        <button
          type="submit"
          className="bg-teal-600 text-white px-6 py-2 rounded-lg hover:bg-teal-700 transition w-full font-semibold"
          disabled={isLoading}
        >
          {isLoading ? "Changing..." : "Change PIN"}
        </button>
        <button
          onClick={() => navigate("/dashboard")}
          type="button"
          className="mt-4 text-teal-600 underline text-sm font-medium"
        >
          Cancel
        </button>
      </form>
    </div>
  );
}
