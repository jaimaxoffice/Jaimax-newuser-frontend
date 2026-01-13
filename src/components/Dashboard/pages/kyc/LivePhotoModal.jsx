import React, { useRef, useState, useEffect, useCallback } from "react";

const LivePhotoModal = ({
  show,
  onClose,
  onPhotoCapture,
  userName = "",
  loading = false,
}) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);

  const [cameraActive, setCameraActive] = useState(false);
  const [capturedPhoto, setCapturedPhoto] = useState(null);
  const [error, setError] = useState(null);
  const [countdown, setCountdown] = useState(null);
  const [instruction, setInstruction] = useState("Position your face in the frame");
  const [facingMode, setFacingMode] = useState("user");
  const [photoBlob, setPhotoBlob] = useState(null);

  const instructions = [
    "Position your face in the frame",
    "Keep your face clearly visible",
    "Ensure good lighting",
    "Remove glasses if possible",
    "Look directly at the camera",
  ];

  const startCamera = useCallback(async () => {
    setError(null);
    setCapturedPhoto(null);
    setPhotoBlob(null);

    try {
      const constraints = {
        video: {
          facingMode: facingMode,
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
        audio: false,
      };

      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
        setCameraActive(true);
      }
    } catch (err) {
      console.error("Camera error:", err);
      if (err.name === "NotAllowedError") {
        setError("Camera access denied. Please allow camera permissions.");
      } else if (err.name === "NotFoundError") {
        setError("No camera found. Please connect a camera.");
      } else {
        setError("Unable to access camera. Please try again.");
      }
    }
  }, [facingMode]);

  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    setCameraActive(false);
  }, []);

  useEffect(() => {
    if (show) {
      startCamera();
    } else {
      stopCamera();
      setCapturedPhoto(null);
      setPhotoBlob(null);
      setError(null);
    }

    return () => {
      stopCamera();
    };
  }, [show, startCamera, stopCamera]);

  useEffect(() => {
    if (cameraActive && !capturedPhoto) {
      let index = 0;
      const interval = setInterval(() => {
        index = (index + 1) % instructions.length;
        setInstruction(instructions[index]);
      }, 3000);

      return () => clearInterval(interval);
    }
  }, [cameraActive, capturedPhoto]);

  const handleCaptureWithCountdown = () => {
    setCountdown(3);
  };

  useEffect(() => {
    if (countdown === null) return;

    if (countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0) {
      capturePhoto();
      setCountdown(null);
    }
  }, [countdown]);

  const capturePhoto = () => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    context.translate(canvas.width, 0);
    context.scale(-1, 1);
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    context.setTransform(1, 0, 0, 1, 0, 0);

    const timestamp = new Date().toLocaleString();
    context.fillStyle = "rgba(255, 255, 255, 0.7)";
    context.font = "14px Arial";
    context.fillText(timestamp, 10, canvas.height - 10);

    const imageDataUrl = canvas.toDataURL("image/jpeg", 0.9);
    setCapturedPhoto(imageDataUrl);

    canvas.toBlob(
      (blob) => {
        setPhotoBlob(blob);
      },
      "image/jpeg",
      0.9
    );

    stopCamera();
  };

  const handleRetake = () => {
    setCapturedPhoto(null);
    setPhotoBlob(null);
    startCamera();
  };

  const handleSwitchCamera = () => {
    stopCamera();
    setFacingMode((prev) => (prev === "user" ? "environment" : "user"));
  };

  const handleSubmit = () => {
    if (capturedPhoto && photoBlob) {
      const file = new File([photoBlob], `live_photo_${Date.now()}.jpg`, {
        type: "image/jpeg",
      });

      onPhotoCapture({
        file: file,
        dataUrl: capturedPhoto,
        timestamp: new Date().toISOString(),
      });
    }
  };

  const handleClose = () => {
    stopCamera();
    onClose();
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md sm:max-w-lg mx-auto overflow-hidden max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-teal-600 to-teal-500 px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-white">Live Photo Capture</h3>
              <p className="text-teal-100 text-xs sm:text-sm mt-1">
                Take a clear photo of your face
              </p>
            </div>
            <button
              onClick={handleClose}
              className="text-white/80 hover:text-white transition-colors p-1"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6">
          {/* User name display */}
          {userName && (
            <div className="mb-4 bg-blue-50 border border-blue-200 rounded-lg p-3 text-center">
              <p className="text-blue-800 text-xs sm:text-sm">
                Capturing photo for: <strong className="break-all">{userName}</strong>
              </p>
            </div>
          )}

          {/* Camera/Photo Container */}
          <div className="relative aspect-[4/3] bg-gray-900 rounded-xl overflow-hidden mb-4">
            {/* Video Preview */}
            {!capturedPhoto && (
              <>
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-full object-cover"
                  style={{ transform: "scaleX(-1)" }}
                />

                {/* Face guide overlay */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-32 sm:w-48 h-40 sm:h-60 border-4 border-white/50 rounded-[50%] relative">
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black/50 px-3 py-1.5 rounded-full">
                      <p className="text-white text-[10px] sm:text-xs whitespace-nowrap">{instruction}</p>
                    </div>
                  </div>
                </div>

                {/* Countdown overlay */}
                {countdown !== null && countdown > 0 && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                    <span className="text-6xl sm:text-8xl font-bold text-white animate-pulse">
                      {countdown}
                    </span>
                  </div>
                )}

                {/* Camera switch button */}
                <button
                  onClick={handleSwitchCamera}
                  className="absolute top-3 right-3 bg-white/20 hover:bg-white/30 p-2 rounded-full transition-colors"
                >
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                </button>
              </>
            )}

            {/* Captured Photo Preview */}
            {capturedPhoto && (
              <img
                src={capturedPhoto}
                alt="Captured"
                className="w-full h-full object-cover"
              />
            )}

            {/* Error Message */}
            {error && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
                <div className="text-center p-4 sm:p-6">
                  <svg className="w-12 h-12 sm:w-16 sm:h-16 text-red-500 mx-auto mb-3 sm:mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <p className="text-white mb-3 sm:mb-4 text-sm sm:text-base">{error}</p>
                  <button
                    onClick={startCamera}
                    className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors text-sm"
                  >
                    Try Again
                  </button>
                </div>
              </div>
            )}

            {/* Loading overlay */}
            {!cameraActive && !error && !capturedPhoto && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
                <div className="text-center">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 border-4 border-teal-500 border-t-transparent rounded-full animate-spin mx-auto mb-3 sm:mb-4"></div>
                  <p className="text-white text-sm sm:text-base">Starting camera...</p>
                </div>
              </div>
            )}
          </div>

          {/* Hidden canvas for photo capture */}
          <canvas ref={canvasRef} className="hidden" />

          {/* Instructions */}
          {!capturedPhoto && cameraActive && (
            <div className="mb-4 bg-gray-50 rounded-lg p-3 sm:p-4">
              <h4 className="font-medium text-gray-800 mb-2 text-xs sm:text-sm">Tips for a good photo:</h4>
              <ul className="text-[10px] sm:text-xs text-gray-600 space-y-1">
                <li className="flex items-center">
                  <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-500 rounded-full mr-2 flex-shrink-0"></span>
                  Ensure good lighting on your face
                </li>
                <li className="flex items-center">
                  <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-500 rounded-full mr-2 flex-shrink-0"></span>
                  Look directly at the camera
                </li>
                <li className="flex items-center">
                  <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-500 rounded-full mr-2 flex-shrink-0"></span>
                  Keep a neutral expression
                </li>
                <li className="flex items-center">
                  <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-500 rounded-full mr-2 flex-shrink-0"></span>
                  Remove sunglasses or hats
                </li>
              </ul>
            </div>
          )}

          {/* Photo captured confirmation */}
          {capturedPhoto && (
            <div className="mb-4 bg-green-50 border border-green-200 rounded-lg p-3 sm:p-4">
              <div className="flex items-center">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-green-800 font-medium text-sm sm:text-base">Photo captured successfully!</p>
              </div>
              <p className="text-green-600 text-xs sm:text-sm mt-1 ml-7 sm:ml-8">
                Review the photo and submit, or retake if needed.
              </p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
            {!capturedPhoto ? (
              <>
                <button
                  onClick={handleClose}
                  className="flex-1 px-4 py-2.5 sm:py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium text-sm sm:text-base order-2 sm:order-1"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCaptureWithCountdown}
                  disabled={!cameraActive || countdown !== null}
                  className="flex-1 px-4 py-2.5 sm:py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center text-sm sm:text-base order-1 sm:order-2"
                >
                  {countdown !== null ? (
                    <span>Capturing...</span>
                  ) : (
                    <>
                      <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      Capture Photo
                    </>
                  )}
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={handleRetake}
                  disabled={loading}
                  className="flex-1 px-4 py-2.5 sm:py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium disabled:opacity-50 text-sm sm:text-base order-2 sm:order-1"
                >
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Retake
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="flex-1 px-4 py-2.5 sm:py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors font-medium disabled:opacity-50 flex items-center justify-center text-sm sm:text-base order-1 sm:order-2"
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Submitting...
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Submit Photo
                    </>
                  )}
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LivePhotoModal;