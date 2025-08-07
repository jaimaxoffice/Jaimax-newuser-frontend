import React, { useRef, useState } from "react";
import { useVerifyPinMutation ,useModifyPinMutation ,useRequestForgetPinOtpMutation,useForgetPinMutation,useGetSecurityQuestionsQuery} from "./MpipinApiSlice";

export default function PinEntryModal({ onSuccess, onForgotPin, onChangePin }) {
  const [pin, setPin] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const [verifyPin, { isLoading }] = useVerifyPinMutation();
  const inputs = useRef([]);

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
    if (enteredPin.length < 4) {
      setError("PIN must be at least 4 digits.");
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

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 flex flex-col items-center"
      >
        <h2 className="text-xl font-bold mb-4">Enter Wallet PIN</h2>
        <div className="flex gap-2 mb-4">
          {[0, 1, 2, 3, 4, 5].map((idx) => (
            <input
              key={idx}
              ref={(el) => (inputs.current[idx] = el)}
              type="password"
              maxLength={1}
              className="w-10 h-12 text-center text-2xl border-b-2 border-teal-500 focus:outline-none"
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
          className="bg-teal-600 text-white px-6 py-2 rounded hover:bg-teal-700 transition"
          disabled={isLoading}
        >
          {isLoading ? "Verifying..." : "Unlock Wallet"}
        </button>
        <div className="flex justify-between w-full mt-4">
          <button
            type="button"
            className="text-blue-600 hover:underline text-sm"
            onClick={onForgotPin}
          >
            Forgot PIN?
          </button>
          <button
            type="button"
            className="text-teal-600 hover:underline text-sm"
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
  const [answers, setAnswers] = useState(["", ""]);
  const [newPin, setNewPin] = useState("");
  const [confirmNewPin, setConfirmNewPin] = useState("");
  const [error, setError] = useState("");
  const [requestOtp, { isLoading: requestingOtp }] = useRequestForgetPinOtpMutation();
  const [forgetPin, { isLoading: resettingPin }] = useForgetPinMutation();
  const { data: questionsData } = useGetSecurityQuestionsQuery();

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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 flex flex-col items-center">
        <h2 className="text-xl font-bold mb-4">Forgot PIN</h2>
        {step === 1 && (
          <>
            <p className="mb-4 text-gray-700">Click below to request OTP for PIN reset.</p>
            {error && <div className="text-red-600 mb-2">{error}</div>}
            <button
              onClick={handleRequestOtp}
              className="bg-teal-600 text-white px-6 py-2 rounded hover:bg-teal-700 transition"
              disabled={requestingOtp}
            >
              {requestingOtp ? "Requesting OTP..." : "Request OTP"}
            </button>
            <button onClick={onClose} className="mt-4 text-teal-600 underline">Cancel</button>
          </>
        )}
        {step === 2 && (
          <form onSubmit={handleResetPin} className="w-full flex flex-col items-center">
            <div className="mb-2 w-full">
              <label className="block text-sm font-medium mb-1">OTP</label>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                className="w-full border rounded px-3 py-2"
                maxLength={6}
                required
              />
            </div>
            {questionsData?.data?.securityQuestions?.map((q, idx) => (
              <div className="mb-2 w-full" key={idx}>
                <label className="block text-sm font-medium mb-1">{q}</label>
                <input
                  type="text"
                  value={answers[idx]}
                  onChange={(e) => {
                    const arr = [...answers];
                    arr[idx] = e.target.value;
                    setAnswers(arr);
                  }}
                  className="w-full border rounded px-3 py-2"
                  required
                />
              </div>
            ))}
            <div className="mb-2 w-full">
              <label className="block text-sm font-medium mb-1">New PIN</label>
              <input
                type="password"
                value={newPin}
                onChange={(e) => setNewPin(e.target.value.replace(/\D/g, ""))}
                className="w-full border rounded px-3 py-2"
                maxLength={6}
                minLength={4}
                required
              />
            </div>
            <div className="mb-2 w-full">
              <label className="block text-sm font-medium mb-1">Confirm New PIN</label>
              <input
                type="password"
                value={confirmNewPin}
                onChange={(e) => setConfirmNewPin(e.target.value.replace(/\D/g, ""))}
                className="w-full border rounded px-3 py-2"
                maxLength={6}
                minLength={4}
                required
              />
            </div>
            {error && <div className="text-red-600 mb-2">{error}</div>}
            <button
              type="submit"
              className="bg-teal-600 text-white px-6 py-2 rounded hover:bg-teal-700 transition w-full"
              disabled={resettingPin}
            >
              {resettingPin ? "Resetting..." : "Reset PIN"}
            </button>
            <button onClick={onClose} type="button" className="mt-4 text-teal-600 underline">Cancel</button>
          </form>
        )}
        {step === 3 && (
          <div className="text-green-600 text-center">
            <div className="text-3xl mb-2">✔️</div>
            <div>PIN reset successfully!</div>
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
  const [error, setError] = useState("");
  const [modifyPin, { isLoading }] = useModifyPinMutation();

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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 flex flex-col items-center"
      >
        <h2 className="text-xl font-bold mb-4">Change PIN</h2>
        <div className="mb-2 w-full">
          <label className="block text-sm font-medium mb-1">Current PIN</label>
          <input
            type="password"
            value={pin}
            onChange={(e) => setPin(e.target.value.replace(/\D/g, ""))}
            className="w-full border rounded px-3 py-2"
            maxLength={6}
            minLength={4}
            required
          />
        </div>
        <div className="mb-2 w-full">
          <label className="block text-sm font-medium mb-1">New PIN</label>
          <input
            type="password"
            value={newPin}
            onChange={(e) => setNewPin(e.target.value.replace(/\D/g, ""))}
            className="w-full border rounded px-3 py-2"
            maxLength={6}
            minLength={4}
            required
          />
        </div>
        <div className="mb-2 w-full">
          <label className="block text-sm font-medium mb-1">Confirm New PIN</label>
          <input
            type="password"
            value={confirmNewPin}
            onChange={(e) => setConfirmNewPin(e.target.value.replace(/\D/g, ""))}
            className="w-full border rounded px-3 py-2"
            maxLength={6}
            minLength={4}
            required
          />
        </div>
        {error && <div className="text-red-600 mb-2">{error}</div>}
        <button
          type="submit"
          className="bg-teal-600 text-white px-6 py-2 rounded hover:bg-teal-700 transition w-full"
          disabled={isLoading}
        >
          {isLoading ? "Changing..." : "Change PIN"}
        </button>
        <button onClick={onClose} type="button" className="mt-4 text-teal-600 underline">Cancel</button>
      </form>
    </div>
  );
}