import React, { useState } from "react";
import {
  useRequestCreatePinOtpMutation,
  useCreatePinMutation,
} from "./MpipinApiSlice";
const defaultQuestions = [
  "What is your pet's name?",
  "What is your favorite color?",
];

export default function CreateWalletPin() {
  // Step state
  const [step, setStep] = useState(1);

  // Form state
  const [pin, setPin] = useState("");
  
  const [confirmPin, setConfirmPin] = useState("");
  const [questions, setQuestions] = useState([
    { question: defaultQuestions[0], answer: "" },
    { question: defaultQuestions[1], answer: "" },
  ]);
  const [otp, setOtp] = useState("");
  // API hooks
  const [requestOtp, { isLoading: requestingOtp, error: otpError, data: otpData }] =
    useRequestCreatePinOtpMutation();
  const [createPin, { isLoading: creatingPin, error: createPinError, data: createPinData }] =
    useCreatePinMutation();

  // Error state
  const [formError, setFormError] = useState("");

  // Handlers
  const handleRequestOtp = async (e) => {
    e.preventDefault();
    setFormError("");

    // Basic validation
    if (!/^\d{4,6}$/.test(pin)) {
      setFormError("PIN must be 4-6 digits.");
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

  return (
    <div className="max-w-md mx-auto mt-10 bg-white shadow-lg rounded-lg p-8">
      <h2 className="text-2xl font-bold mb-6 text-center">
        {step === 1 && "Create Wallet PIN"}
        {step === 2 && "Verify OTP"}
        {step === 3 && "PIN Created!"}
      </h2>

      {formError && (
        <div className="mb-4 text-red-600 text-sm text-center">{formError}</div>
      )}

      {/* Step 1: Request OTP */}
      {step === 1 && (
        <form onSubmit={handleRequestOtp} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">PIN</label>
            <input
              type="password"
              maxLength={6}
              minLength={4}
              value={pin}
              onChange={(e) => setPin(e.target.value.replace(/\D/g, ""))}
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Confirm PIN</label>
            <input
              type="password"
              maxLength={6}
              minLength={4}
              value={confirmPin}
              onChange={(e) => setConfirmPin(e.target.value.replace(/\D/g, ""))}
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring"
              required
            />
          </div>
          {questions.map((q, idx) => (
            <div key={idx}>
              <label className="block text-sm font-medium mb-1">
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
                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring"
                required
              />
            </div>
          ))}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
            disabled={requestingOtp}
          >
            {requestingOtp ? "Requesting OTP..." : "Request OTP"}
          </button>
        </form>
      )}

      {/* Step 2: Enter OTP */}
      {step === 2 && (
        <form onSubmit={handleCreatePin} className="space-y-4">
          <div className="mb-2 text-center text-green-600">
            {otpData?.data?.email
              ? `OTP sent to your email: ${otpData.data.email}`
              : "OTP sent to your registered email and phone."}
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Enter OTP</label>
            <input
              type="text"
              maxLength={6}
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
            disabled={creatingPin}
          >
            {creatingPin ? "Verifying..." : "Verify & Create PIN"}
          </button>
        </form>
      )}

      {/* Step 3: Success */}
      {step === 3 && (
        <div className="text-center">
          <div className="text-green-600 text-3xl mb-2">✔️</div>
          <div className="text-lg font-semibold mb-4">
            Wallet PIN created successfully!
          </div>
        </div>
      )}
    </div>
  );
}