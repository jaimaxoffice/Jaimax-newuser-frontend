import React, { useContext, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import digiLocker from "../../../../assets/digiLocker.svg";
import editIcon from "../../../../assets/edit.svg";
import showIcon from "../../../../assets/showIcon.svg";
import countryCodes from "../../../../Authentication/countryCodes.json";
import { Camera, Edit, Eye, User, FileText, CreditCard, Upload } from 'lucide-react';
import { useUserDataQuery } from "../../../Dashboard/pages/dashBoard/DashboardApliSlice";
import DigiLockerModal from "./DigiLockerModal";
import {
  useGetKycDataMutation,
  useGetkycDetailsQuery,
  useKycaddMutation,
} from "./kycApiSlice";
// import DashboardLayout from "../Layout/DashboardLayout";
import Loader from "../../../Loader/loader";
import Tesseract from "tesseract.js";
import md5 from "js-md5";


let tesseractWorker = null;
let isInitializing = false;

const createTesseractWorker = async () => {
  // Prevent multiple initialization attempts
  if (isInitializing) {
    // Wait for current initialization to complete
    while (isInitializing) {
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    return tesseractWorker;
  }

  if (!tesseractWorker) {
    try {
      isInitializing = true;
      
      tesseractWorker = await Tesseract.createWorker({
        logger: (m) => {
          if (m.status === "recognizing text") {
            console.log(`OCR Progress: ${Math.round(m.progress * 100)}%`);
          }
          // Log other important statuses
          if (m.status === "loading tesseract core" || 
              m.status === "initializing tesseract" || 
              m.status === "loading language traineddata") {
            console.log(`${m.status}: ${Math.round(m.progress * 100)}%`);
          }
        },
        // Optional: specify core path if needed
        corePath: 'https://unpkg.com/tesseract.js-core@2.2.0/tesseract-core.js',
        workerPath: 'https://unpkg.com/tesseract.js@2.1.5/dist/worker.min.js',
        langPath: 'https://tessdata.projectnaptha.com/4.0.0',
      });

      // Load languages (English + Hindi)
      await tesseractWorker.loadLanguage("eng+hin");
      await tesseractWorker.initialize("eng+hin");
      
      // Set parameters for better OCR performance
      await tesseractWorker.setParameters({
        // Character whitelist - you might want to include more characters for Indian documents
        tessedit_char_whitelist: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789/:., -()[]{}@#$%&*+=<>?!\"'",
        
        // Page segmentation mode - SINGLE_BLOCK might be too restrictive
        tessedit_pageseg_mode: Tesseract.PSM.AUTO, // or PSM.SINGLE_BLOCK if you prefer
        
        // Additional useful parameters
        preserve_interword_spaces: '1',
        tessedit_do_invert: '0',
        
        // For better accuracy with Indian documents
        load_system_dawg: '0',
        load_freq_dawg: '0',
        load_unambig_dawg: '0',
        load_punc_dawg: '0',
        load_number_dawg: '0',
        load_bigram_dawg: '0',
      });

      console.log("Tesseract worker initialized successfully");
      
    } catch (error) {
      console.error("Error creating Tesseract worker:", error);
      tesseractWorker = null;
      throw error;
    } finally {
      isInitializing = false;
    }
  }
  
  return tesseractWorker;
};

const terminateTesseractWorker = async () => {
  if (tesseractWorker) {
    try {
      await tesseractWorker.terminate();
      console.log("Tesseract worker terminated successfully");
    } catch (error) {
      console.error("Error terminating Tesseract worker:", error);
    } finally {
      tesseractWorker = null;
      isInitializing = false;
    }
  }
};

// Usage example with error handling
const performOCR = async (imageData) => {
  try {
    const worker = await createTesseractWorker();
    
    const { data: { text, confidence } } = await worker.recognize(imageData);
    
    console.log(`OCR completed with confidence: ${confidence}%`);
    console.log("Extracted text:", text);
    
    return { text, confidence };
  } catch (error) {
    console.error("OCR failed:", error);
    throw error;
  }
};

// Cleanup function to call when component unmounts or app closes
const cleanup = async () => {
  await terminateTesseractWorker();
};
// const createTesseractWorker = async () => {
//   if (!tesseractWorker) {
//     tesseractWorker = await Tesseract.createWorker({
//       logger: (m) => {
//         if (m.status === "recognizing text") {
//           console.log(`OCR Progress: ${Math.round(m.progress * 100)}%`);
//         }
//       },
//     });
//     await tesseractWorker.loadLanguage("eng+hin");
//     await tesseractWorker.initialize("eng+hin");
//     await tesseractWorker.setParameters({
//       tessedit_char_whitelist:
//         "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789/:., -",
//       tessedit_pageseg_mode: Tesseract.PSM.SINGLE_BLOCK,
//     });
//   }
//   return tesseractWorker;
// };

// const terminateTesseractWorker = async () => {
//   if (tesseractWorker) {
//     await tesseractWorker.terminate();
//     tesseractWorker = null;
//   }
// };

const detectDocumentType = async (base64Image, expectedDocType = null) => {
  try {
    const ocrResult = await performOCRWithTimeout(base64Image);
    if (ocrResult !== null && ocrResult.isValid) {
      if (expectedDocType && ocrResult.docType !== expectedDocType) {
        return {
          isValid: false,
          docType: ocrResult.docType,
          confidence: 0.9,
          errorMessage: `Expected ${expectedDocType.toUpperCase()}, found ${ocrResult.docType.toUpperCase()}`,
        };
      }
      return ocrResult;
    }
    console.log("⏰ OCR failed or timeout, using enhanced validation");
    return await enhancedDocumentValidation(base64Image, expectedDocType);
  } catch (error) {
    console.error("Error in OCR:", error);
    return await enhancedDocumentValidation(base64Image, expectedDocType);
  }
};

const enhancedDocumentValidation = async (
  base64Image,
  expectedDocType = null
) => {
  try {
    const img = new Image();
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    return new Promise((resolve) => {
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);

        const aspectRatio = img.width / img.height;
        const isReasonableSize = img.width > 250 && img.height > 150;
        const isCardLikeRatio = aspectRatio > 1.3 && aspectRatio < 1.9;
        const hasGoodResolution = img.width * img.height > 60000;

        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;

        let skinPixels = 0;
        let totalPixels = data.length / 4;

        for (let i = 0; i < data.length; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];

          if (
            r > 95 &&
            g > 40 &&
            b > 20 &&
            r > g &&
            r > b &&
            Math.abs(r - g) > 15 &&
            r - b > 15
          ) {
            skinPixels++;
          }
        }

        const skinRatio = skinPixels / totalPixels;
        const likelyHuman = skinRatio > 0.4;

        const hasDocumentFeatures = checkDocumentFeatures(
          imageData,
          canvas.width,
          canvas.height
        );

        const colorAnalysis = analyzeImageColors(data);
        const isDocumentLike =
          colorAnalysis.hasWhiteBackground || colorAnalysis.hasTextLikePatterns;

        const isBasicValid =
          isReasonableSize &&
          isCardLikeRatio &&
          hasGoodResolution &&
          (!likelyHuman || (hasDocumentFeatures && isDocumentLike));

        console.log("Enhanced document validation:", {
          dimensions: `${img.width}x${img.height}`,
          aspectRatio: aspectRatio.toFixed(2),
          isReasonableSize,
          isCardLikeRatio,
          hasGoodResolution,
          skinRatio: skinRatio.toFixed(3),
          likelyHuman,
          hasDocumentFeatures,
          isDocumentLike,
          expectedDocType,
          finalResult: isBasicValid,
        });

        if (likelyHuman) {
          resolve({
            isValid: false,
            docType: null,
            isHuman: true,
            confidence: 0.8,
            errorMessage: "Person detected in image",
          });
          return;
        }

        if (!isBasicValid) {
          resolve({
            isValid: false,
            docType: null,
            confidence: 0.3,
            errorMessage: "No valid document detected",
          });
          return;
        }

        if (expectedDocType) {
          resolve({
            isValid: true,
            docType: expectedDocType,
            confidence: 0.4,
            errorMessage: null,
          });
        } else {
          resolve({
            isValid: false,
            docType: null,
            confidence: 0.2,
            errorMessage: "Cannot determine document type without OCR",
          });
        }
      };

      img.onerror = () =>
        resolve({
          isValid: false,
          docType: null,
          confidence: 0,
          errorMessage: "Failed to load image",
        });
      img.src = `data:image/jpeg;base64,${base64Image}`;
    });
  } catch (error) {
    console.error("Error in enhanced validation:", error);
    return {
      isValid: false,
      docType: null,
      confidence: 0,
      errorMessage: "Validation failed",
    };
  }
};

const checkDocumentFeatures = (imageData, width, height) => {
  const data = imageData.data;
  let whitePixels = 0;
  let blackPixels = 0;
  let colorVariations = new Set();

  for (let i = 0; i < data.length; i += 16) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];

    if (r > 200 && g > 200 && b > 200) whitePixels++;
    if (r < 80 && g < 80 && b < 80) blackPixels++;

    const colorKey = `${Math.floor(r / 50)}-${Math.floor(g / 50)}-${Math.floor(
      b / 50
    )}`;
    colorVariations.add(colorKey);
  }

  const totalSamples = data.length / 16;
  const whiteRatio = whitePixels / totalSamples;
  const blackRatio = blackPixels / totalSamples;

  return whiteRatio > 0.3 && blackRatio > 0.05 && colorVariations.size < 15;
};

const analyzeImageColors = (data) => {
  let totalPixels = data.length / 4;
  let whitePixels = 0;
  let darkPixels = 0;
  let edgePixels = 0;

  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];

    if (r > 220 && g > 220 && b > 220) whitePixels++;
    if (r < 100 && g < 100 && b < 100) darkPixels++;

    const brightness = (r + g + b) / 3;
    if (i > 4) {
      const prevBrightness = (data[i - 4] + data[i - 3] + data[i - 2]) / 3;
      if (Math.abs(brightness - prevBrightness) > 50) edgePixels++;
    }
  }

  const whiteRatio = whitePixels / totalPixels;
  const darkRatio = darkPixels / totalPixels;
  const edgeRatio = edgePixels / totalPixels;

  return {
    hasWhiteBackground: whiteRatio > 0.25,
    hasTextLikePatterns: darkRatio > 0.05 && edgeRatio > 0.1,
    whiteRatio,
    darkRatio,
    edgeRatio,
  };
};

const performOCRWithTimeout = async (base64Image) => {
  try {
    const worker = await createTesseractWorker();
    const imageDataUrl = `data:image/jpeg;base64,${base64Image}`;
    const {
      data: { text },
    } = await worker.recognize(imageDataUrl);
    console.log("OCR completed, extracted text:", text.substring(0, 200));
    const result = validateDocumentText(text);
    if (result.isValid) {
      result.confidence = Math.min(0.95, 0.6 + (text.length / 200) * 0.3);
    }
    return result;
  } catch (error) {
    console.error("OCR failed:", error);
    return null;
  }
};

const validateDocumentText = (extractedText) => {
  const text = extractedText.toLowerCase().replace(/[^\w\s]/g, " ");

  const aadhaarKeywords = [
    "aadhaar",
    "aadhar",
    "आधार",
    "uidai",
    "unique identification",
    "government of india",
    "भारत सरकार",
    "uid",
    "unique",
    "identification",
    "authority",
    "india",
    "govt",
    "government",
  ];

  const panKeywords = [
    "income tax",
    "permanent account number",
    "आयकर विभाग",
    "आयकर",
    "pan",
    "account number",
    "signature",
    "fathers name",
    "father",
    "permanent",
    "account",
    "tax",
    "department",
    "govt",
    "government",
    "india",
    "भारत",
    "income",
    "ecpan",
    "पैन",
    "govt of india",
  ];

  const panNumberPattern = /[A-Z]{5}[0-9]{4}[A-Z]{1}/;
  const aadhaarNumberPattern = /\d{4}[\s\-]?\d{4}[\s\-]?\d{4}/;

  const hasAadhaarKeywords = aadhaarKeywords.some((keyword) =>
    text.includes(keyword)
  );
  const hasAadhaarNumber = aadhaarNumberPattern.test(
    extractedText.replace(/\s/g, "")
  );
  const hasPanKeywords = panKeywords.some((keyword) => text.includes(keyword));
  const hasPanNumber = panNumberPattern.test(extractedText.toUpperCase());
  const hasReasonableTextLength = text.length > 20;
  const hasDatePattern = /\d{1,2}[\/\-]\d{1,2}[\/\-]\d{4}/.test(extractedText);

  let docType = null;
  let isValid = false;

  if (hasPanNumber) {
    docType = "pan";
    isValid = true;
  } else if (hasAadhaarNumber) {
    docType = "aadhaar";
    isValid = true;
  } else if (hasPanKeywords && !hasAadhaarKeywords) {
    docType = "pan";
    isValid = true;
  } else if (hasAadhaarKeywords && !hasPanKeywords) {
    docType = "aadhaar";
    isValid = true;
  } else if (hasReasonableTextLength && hasDatePattern) {
    if (
      text.includes("permanent") ||
      text.includes("account") ||
      text.includes("father")
    ) {
      docType = "pan";
      isValid = true;
    } else if (
      text.includes("dob") ||
      text.includes("unique") ||
      text.includes("government")
    ) {
      docType = "aadhaar";
      isValid = true;
    }
  }

  console.log("🔍 Document validation results:", {
    hasAadhaarKeywords,
    hasAadhaarNumber,
    hasPanKeywords,
    hasPanNumber,
    hasReasonableTextLength,
    hasDatePattern,
    docType,
    isValid,
    textLength: text.length,
    sampleText: text.substring(0, 200),
  });

  return { isValid, docType };
};

const extractDOBFromDocument = async (imageBase64, docType) => {
  try {
    const worker = await createTesseractWorker();
    const imageDataUrl = `data:image/jpeg;base64,${imageBase64}`;
    const {
      data: { text },
    } = await worker.recognize(imageDataUrl);
    console.log("Full OCR text for DOB:", text);
    return extractDOBFromText(text, docType);
  } catch (error) {
    console.error("OCR DOB extraction failed:", error);
    return "";
  }
};

const extractDOBFromText = (text, docType) => {
  const cleanedText = text
    .replace(/[^\w\s\/\-\.]/g, "")
    .replace(/\s+/g, " ")
    .toLowerCase()
    .trim();

  let dobPatterns = [
    /dob[\s:]*(\d{1,2}[\/\-]\d{1,2}[\/\-]\d{4})/i,
    /date[\s:]*of[\s:]*birth[\s:]*(\d{1,2}[\/\-]\d{1,2}[\/\-]\d{4})/i,
    /जन्म[\s:]*(\d{1,2}[\/\-]\d{1,2}[\/\-]\d{4})/i,
    /(\d{1,2}[\/\-]\d{1,2}[\/\-]\d{4})/g,
    /(\d{2}\d{2}\d{4})/g,
    /(\d{1,2}\s+\d{1,2}\s+\d{4})/g,
    /(\d{1,2}\s+(?:jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)[a-z]*\s+\d{4})/i,
    /(\d{1,2}\s+(?:जनवरी|फरवरी|मार्च|अप्रैल|मई|जून|जुलाई|अगस्त|सितंबर|अक्टूबर|नवंबर|दिसंबर)\s+\d{4})/i,
  ];

  for (const pattern of dobPatterns) {
    const matches = cleanedText.match(pattern);
    if (matches) {
      const dob = Array.isArray(matches[1]) ? matches[1][0] : matches[0];
      if (dob && isValidDateFormat(dob)) {
        console.log("Matched DOB pattern:", dob);
        return standardizeDOB(dob);
      }
    }
  }

  console.log(
    "No DOB pattern matched in cleaned text:",
    cleanedText.substring(0, 200)
  );
  return "";
};

const extractPANFromDocument = async (imageBase64) => {
  try {
    const worker = await createTesseractWorker();
    const imageDataUrl = `data:image/jpeg;base64,${imageBase64}`;
    const {
      data: { text },
    } = await worker.recognize(imageDataUrl);
    console.log("Full OCR text for PAN:", text);
    return extractPANFromText(text);
  } catch (error) {
    console.error("OCR PAN extraction failed:", error);
    return "";
  }
};

const extractPANFromText = (text) => {
  const cleanedText = text
    .replace(/[^\w\s]/g, "")
    .replace(/\s+/g, " ")
    .toUpperCase()
    .trim();

  const panNumberPattern = /[A-Z]{5}[0-9]{4}[A-Z]{1}/g;
  const matches = cleanedText.match(panNumberPattern);

  if (matches && matches.length > 0) {
    console.log("Extracted PAN number:", matches[0]);
    return matches[0];
  }

  console.log("No PAN number found in text:", cleanedText.substring(0, 200));
  return "";
};

const isValidDateFormat = (dateString) => {
  const dateRegex = /^\d{1,2}[\/\-]\d{1,2}[\/\-]\d{4}$/;
  return dateRegex.test(dateString);
};

const standardizeDOB = (dobString) => {
  try {
    const cleaned = dobString.replace(/[\-\s]/g, "/");
    const parts = cleaned.split("/");

    if (parts.length === 3) {
      const day = parts[0].padStart(2, "0");
      const month = parts[1].padStart(2, "0");
      const year = parts[2];

      const date = new Date(year, month - 1, day);
      if (
        date.getFullYear() === parseInt(year) &&
        date.getMonth() + 1 === parseInt(month) &&
        date.getDate() === parseInt(day)
      ) {
        return `${day}/${month}/${year}`;
      }
    }
  } catch (error) {
    console.error("DOB standardization error:", error);
  }
  return dobString;
};

const compareDOBs = (extractedDOB, digiLockerDOB) => {
  if (!extractedDOB || !digiLockerDOB) return false;
  const dob1 = standardizeDOB(extractedDOB);
  const dob2 = standardizeDOB(digiLockerDOB);
  console.log("Comparing DOBs:", { extracted: dob1, digiLocker: dob2 });
  return dob1 === dob2;
};

const comparePANNumbers = (extractedPAN, digiLockerPAN) => {
  if (!extractedPAN || !digiLockerPAN) return false;
  const pan1 = extractedPAN.toUpperCase().trim();
  const pan2 = digiLockerPAN.toUpperCase().trim();
  console.log("Comparing PAN numbers:", { extracted: pan1, digiLocker: pan2 });
  return pan1 === pan2;
};

// Camera Capture Component - Fixed
const CameraCapture = ({ isOpen, onClose, onCapture, docType, title }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [stream, setStream] = useState(null);
  const [isCapturing, setIsCapturing] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const [validationStatus, setValidationStatus] = useState("");

  useEffect(() => {
    if (isOpen) {
      startCamera();
    } else {
      stopCamera();
    }
    return () => stopCamera();
  }, [isOpen]);

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 1920 },
          height: { ideal: 1080 },
          facingMode: "environment",
        },
        audio: false,
      });

      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (error) {
      console.error("Error accessing camera:", error);
      toast.error("Failed to access camera. Please enable camera permissions.");
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
    setCapturedImage(null);
    setValidationStatus("");
  };

  const captureImage = () => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0);

    const imageDataUrl = canvas.toDataURL("image/jpeg", 0.8);
    validateCapturedDocument(imageDataUrl);
  };

  const validateCapturedDocument = async (imageDataUrl) => {
    setIsCapturing(true);
    setValidationStatus("Validating document...");

    try {
      const base64Data = imageDataUrl.split(",")[1];

      // Skip validation for profile picture
      if (docType === "profile_picture") {
        setValidationStatus("Profile picture captured successfully!");
        setCapturedImage(imageDataUrl);
        toast.success("Profile picture captured successfully!");
        setIsCapturing(false);
        return;
      }

      // Determine expected document type
      const expectedType =
        docType.includes("aadhar") || docType.includes("aadhaar")
          ? "aadhaar"
          : "pan";

      // Call document detection API
      const {
        isValid,
        docType: detectedType,
        confidence,
      } = await detectDocumentType(base64Data);

      // Enhanced validation logic
      if (!isValid) {
        setValidationStatus(
          `Invalid document detected. Please capture a valid ${expectedType.toUpperCase()} card.`
        );
        toast.error(
          `Invalid document. Please capture a valid ${expectedType.toUpperCase()} card.`
        );
        setIsCapturing(false);
        return;
      }

      // Improved type matching with confidence check
      if (detectedType && detectedType !== expectedType) {
        // Check if confidence is low - might be a detection error
        if (confidence && confidence < 0.7) {
          setValidationStatus(
            `Document detection uncertain. Please ensure you're capturing a ${expectedType.toUpperCase()} card and the image is clear.`
          );
          toast.warning(
            `Document detection uncertain. Please ensure you're capturing a ${expectedType.toUpperCase()} card.`
          );
        } else {
          setValidationStatus(
            `Expected ${expectedType.toUpperCase()} but detected invalid document.`
          );
          toast.error(
            `Wrong document type. Please capture a ${expectedType.toUpperCase()} card instead of ${detectedType.toUpperCase()}.`
          );
        }
        setIsCapturing(false);
        return;
      }

      // Success case
      const finalDocType = detectedType || expectedType;
      setValidationStatus(
        `${finalDocType.toUpperCase()} document validated successfully!`
      );
      setCapturedImage(imageDataUrl);
      toast.success(
        `${finalDocType.toUpperCase()} document validated successfully!`
      );
    } catch (error) {
      console.error("Error validating document:", error);

      // Fallback: If API fails, allow manual verification
      setValidationStatus(
        "Unable to validate document automatically. Please verify manually."
      );
      setCapturedImage(imageDataUrl);
      toast.warning(
        "Document validation failed. Please verify the document is correct before proceeding."
      );
    } finally {
      setIsCapturing(false);
    }
  };

  const retakePhoto = () => {
    setCapturedImage(null);
    setValidationStatus("");
    setIsCapturing(false);
    if (!stream || !stream.active) {
      startCamera();
    }
  };

  const confirmCapture = () => {
    if (capturedImage) {
      const base64Data = capturedImage.split(",")[1];
      const expectedType =
        docType.includes("aadhar") || docType.includes("aadhaar")
          ? "aadhaar"
          : "pan";

      onCapture({
        imageBase64: base64Data,
        docType,
        detectedType: expectedType, // Use expected type for consistency
        imageDataUrl: capturedImage,
      });
    }
  };

  // Helper function to get document type display name
  const getDocumentDisplayName = () => {
    if (docType === "profile_picture") return "Profile Picture";
    if (docType.includes("aadhar") || docType.includes("aadhaar"))
      return "Aadhaar Card";
    if (docType.includes("pan")) return "PAN Card";
    return title;
  };

  if (!isOpen) return null;

  return (
    <div
      className="camera-modal-overlay"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0,0,0,0.9)",
        zIndex: 9999,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        className="camera-modal-content"
        style={{
          backgroundColor: "white",
          borderRadius: "10px",
          padding: "20px",
          maxWidth: "90vw",
          maxHeight: "90vh",
          overflow: "auto",
        }}
      >
        <div
          className="camera-header"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          <h4 style={{ margin: 0, color: "#333" }}>
            Capture {getDocumentDisplayName()}
          </h4>
          <button
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              fontSize: "24px",
              cursor: "pointer",
              color: "#666",
            }}
          >
            ×
          </button>
        </div>

        {validationStatus && (
          <div
            className={`alert ${validationStatus.includes("successfully")
                ? "alert-success"
                : validationStatus.includes("Failed") ||
                  validationStatus.includes("Wrong")
                  ? "alert-danger"
                  : validationStatus.includes("uncertain") ||
                    validationStatus.includes("verify manually")
                    ? "alert-warning"
                    : "alert-info"
              }`}
            style={{
              marginBottom: "20px",
              padding: "10px",
              borderRadius: "5px",
              backgroundColor: validationStatus.includes("successfully")
                ? "#d4edda"
                : validationStatus.includes("Failed") ||
                  validationStatus.includes("Wrong")
                  ? "#f8d7da"
                  : validationStatus.includes("uncertain") ||
                    validationStatus.includes("verify manually")
                    ? "#fff3cd"
                    : "#d1ecf1",
              color: validationStatus.includes("successfully")
                ? "#155724"
                : validationStatus.includes("Failed") ||
                  validationStatus.includes("Wrong")
                  ? "#721c24"
                  : validationStatus.includes("uncertain") ||
                    validationStatus.includes("verify manually")
                    ? "#856404"
                    : "#0c5460",
              border: "1px solid",
              borderColor: validationStatus.includes("successfully")
                ? "#c3e6cb"
                : validationStatus.includes("Failed") ||
                  validationStatus.includes("Wrong")
                  ? "#f5c6cb"
                  : validationStatus.includes("uncertain") ||
                    validationStatus.includes("verify manually")
                    ? "#ffeaa7"
                    : "#b8daff",
            }}
          >
            {validationStatus}
          </div>
        )}

        <div
          className="camera-container"
          style={{
            position: "relative",
            marginBottom: "20px",
          }}
        >
          {!capturedImage ? (
            <>
              <video
                ref={videoRef}
                autoPlay
                playsInline
                style={{
                  width: "100%",
                  maxWidth: "500px",
                  height: "auto",
                  borderRadius: "8px",
                }}
              />
              <div
                className="capture-overlay"
                style={{
                  position: "absolute",
                  top: "10%",
                  left: "10%",
                  right: "10%",
                  bottom: "10%",
                  border: "3px solid #28a745",
                  borderRadius: "8px",
                  pointerEvents: "none",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: "-30px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    background: " #28a745",
                    color: "white",
                    padding: "5px 10px",
                    borderRadius: "4px",
                    fontSize: "12px",
                  }}
                >
                  Align {getDocumentDisplayName()} within the frame
                </div>
              </div>
            </>
          ) : (
            <img
              src={capturedImage}
              alt="Captured document"
              style={{
                width: "100%",
                maxWidth: "500px",
                height: "auto",
                borderRadius: "8px",
              }}
            />
          )}
        </div>

        <canvas ref={canvasRef} style={{ display: "none" }} />

        <div
          className="camera-controls"
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "10px",
            flexWrap: "wrap",
          }}
        >
          {!capturedImage ? (
            <button
              onClick={captureImage}
              disabled={!stream || isCapturing}
              style={{
                backgroundColor: " #28a745",
                color: "white",
                border: "none",
                padding: "12px 24px",
                borderRadius: "6px",
                cursor: "pointer",
                fontSize: "16px",
                opacity: !stream || isCapturing ? 0.6 : 1,
              }}
            >
              {isCapturing ? "Validating..." : "Capture"}
            </button>
          ) : (
            <>
              <button
                onClick={retakePhoto}
                style={{
                  backgroundColor: "#6c757d",
                  color: "white",
                  border: "none",
                  padding: "12px 24px",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontSize: "16px",
                }}
              >
                Retake
              </button>
              <button
                onClick={confirmCapture}
                disabled={
                  validationStatus.includes("Wrong") ||
                  validationStatus.includes("Failed")
                }
                style={{
                  backgroundColor:
                    validationStatus.includes("Wrong") ||
                      validationStatus.includes("Failed")
                      ? "#dc3545"
                      : "#28a745",
                  color: "white",
                  border: "none",
                  padding: "12px 24px",
                  borderRadius: "6px",
                  cursor:
                    validationStatus.includes("Wrong") ||
                      validationStatus.includes("Failed")
                      ? "not-allowed"
                      : "pointer",
                  fontSize: "16px",
                  opacity:
                    validationStatus.includes("Wrong") ||
                      validationStatus.includes("Failed")
                      ? 0.6
                      : 1,
                }}
              >
                Confirm
              </button>
            </>
          )}
        </div>

        <div
          style={{
            marginTop: "15px",
            padding: "10px",
            backgroundColor: "#f8f9fa",
            borderRadius: "6px",
            fontSize: "14px",
            color: "#666",
          }}
        >
          <strong>Tips for better capture:</strong>
          <ul style={{ margin: "5px 0", paddingLeft: "20px" }}>
            <li>Ensure good lighting</li>
            <li>Keep the document flat and within the frame</li>
            <li>Avoid shadows and glare</li>
            <li>Make sure all text is clearly visible</li>
            <li>
              Capture the correct document type ({getDocumentDisplayName()})
            </li>
            <li>Hold the camera steady while capturing</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

const generateCodeVerifier = async () => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~";
  const length = Math.floor(Math.random() * (128 - 43 + 1)) + 43;
  let verifier = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    verifier += characters[randomIndex];
  }
  return verifier;
};

const generateCodeChallenge = async (verifier) => {
  try {
    const encoder = new TextEncoder();
    const data = encoder.encode(verifier);
    const digest = await crypto.subtle.digest("SHA-256", data);
    const base64 = btoa(String.fromCharCode(...new Uint8Array(digest)));
    return base64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
  } catch (error) {
    console.error("Error generating code challenge:", error);
    throw error;
  }
};
const getStatusColor = (status) => {
  switch (status) {
    case 'open':
      return 'text-orange-500';
    case 'approve':
      return 'text-green-500';
    case 'inprogress':
      return 'text-blue-500';
    default:
      return 'text-red-500';
  }
};

const KycInformation = () => {
  // const { data } = useContext(MyContext);
  const { data: userData } = useUserDataQuery();
  const isCountryCodeIndia = userData?.data?.countryCode === 91;
  const [submitKyc] = useKycaddMutation();
  const [getKycData] = useGetKycDataMutation();
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [enableFields, setEnableFields] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [disableFieldsAfterKYC, setDisableFieldsAfterKYC] = useState(false);
  const location = useLocation();
  const [showCamera, setShowCamera] = useState(false);
  const [currentDocType, setCurrentDocType] = useState("");
  const [capturedDocuments, setCapturedDocuments] = useState({});
  const [capturedProfilePicture, setCapturedProfilePicture] = useState(null);
  const [capturedAadharBinary, setCapturedAadharBinary] = useState(null);
  const [capturedAadharBackBinary, setCapturedAadharBackBinary] =
    useState(null);
  const [capturedPanBinary, setCapturedPanBinary] = useState(null);
  const [dobVerificationResults, setDobVerificationResults] = useState({});
  const [panVerificationResults, setPanVerificationResults] = useState({});
  const [captureLoading, setCaptureLoading] = useState({});
  const [allDocsVerified, setAllDocsVerified] = useState(false);
  const [isEditClicked, setIsEditClicked] = useState(false);
  const { data: kycdata, isLoading, refetch } = useGetkycDetailsQuery();

  const [formData, setFormData] = useState({
    profile_picture: null,
    aadhar_doc_front: null,
    aadhar_doc_back: null,
    pan_doc_front: null,
    dl_doc_front: null,
    dl_doc_back: null,
    passport_doc_front: null,
    passport_doc_back: null,
    bank_name: "",
    applicantName: "",
    ifsc_code: "",
    mobile_number: userData?.data?.countryCode
      ? `+${userData.data.countryCode} `
      : "",
    upi_id: "",
    bank_account: "",
    address: "",
    dob: "",
    panNumber: "",
  });
  const CaptureButton = ({ docType, displayName }) => (
    <div className="flex gap-2 mb-2 items-center">
      <button
        type="button"
        className={`px-3 py-1.5 text-sm font-medium rounded border transition-colors ${captureLoading[docType]
            ? "bg-gray-500 text-white border-gray-500 cursor-not-allowed"
            : "bg-white text-green-600 border-green-600 hover:bg-green-50"
          } ${(isFieldDisabled() || captureLoading[docType]) ? "opacity-50 cursor-not-allowed" : ""}`}
        onClick={() => openCamera(docType)}
        disabled={isFieldDisabled() || captureLoading[docType]}
      >
        {captureLoading[docType] ? (
          <div className="flex items-center">
            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Processing...
          </div>
        ) : (
          `Capture ${displayName}`
        )}
      </button>

      {docType === 'profile_picture' && capturedProfilePicture && !captureLoading[docType] && (
        <span className="text-green-600 text-sm">✓ Profile captured</span>
      )}

      {captureLoading[docType] && (
        <span className="text-blue-600 text-sm">🔄 Processing...</span>
      )}
    </div>
  );
  const isFieldDisabled = () =>
    (!enableFields && isCountryCodeIndia) ||
    kycdata?.data?.status === "open" ||
    (kycdata?.data?.status === "approve" && !isEditClicked);

  const openCamera = (docType) => {
    if (captureLoading[docType]) {
      toast.warning("Please wait, processing previous capture...");
      return;
    }

    if (
      [
        "profile_picture",
        "aadhar_doc_front",
        "aadhar_doc_back",
        "pan_doc_front",
      ].includes(docType)
    ) {
      setCurrentDocType(docType);
      setShowCamera(true);
    } else {
      toast.error(
        "Camera capture is only available for Profile Picture, Aadhaar Front, Aadhaar Back, and PAN Front."
      );
    }
  };

  const extractAndVerifyDocument = async (
    imageBase64,
    detectedType,
    docType
  ) => {
    try {
      if (detectedType === "aadhaar" && docType === "aadhar_doc_front") {
        setDobVerificationResults((prev) => ({
          ...prev,
          [docType]: {
            status: "extracting",
            message: "Extracting date of birth...",
          },
        }));

        const extractedDOB = await extractDOBFromDocument(
          imageBase64,
          detectedType
        );
        const digiLockerDOB = formData.dob || userData?.data?.dob || "";

        console.log(
          `Extracted DOB from ${detectedType}:`,
          extractedDOB,
          "DigiLocker DOB:",
          digiLockerDOB
        );

        if (!extractedDOB) {
          setDobVerificationResults((prev) => ({
            ...prev,
            [docType]: {
              status: "warning",
              message: `Could not extract DOB from ${detectedType.toUpperCase()}`,
              extractedDOB: "",
              digiLockerDOB,
            },
          }));
          toast.warning(
            `Could not extract date of birth from ${detectedType.toUpperCase()}`
          );
          return;
        }

        const dobsMatch = compareDOBs(extractedDOB, digiLockerDOB);

        if (dobsMatch) {
          setDobVerificationResults((prev) => ({
            ...prev,
            [docType]: {
              status: "success",
              message: `DOB verified successfully in ${detectedType.toUpperCase()}!`,
              extractedDOB,
              digiLockerDOB,
            },
          }));
          toast.success(
            `DOB verification successful for ${detectedType.toUpperCase()}!`
          );
        } else {
          setDobVerificationResults((prev) => ({
            ...prev,
            [docType]: {
              status: "error",
              message: `DOB mismatch in ${detectedType.toUpperCase()}! Document: ${extractedDOB}, DigiLocker: ${digiLockerDOB}`,
              extractedDOB,
              digiLockerDOB,
            },
          }));
          toast.error(`DOB mismatch in ${detectedType.toUpperCase()}!`);
        }
      } else if (detectedType === "pan") {
        setPanVerificationResults((prev) => ({
          ...prev,
          [docType]: {
            status: "extracting",
            message: "Extracting PAN number...",
          },
        }));

        const extractedPAN = await extractPANFromDocument(imageBase64);
        const digiLockerPAN = formData.panNumber || "";

        console.log(
          `Extracted PAN from ${detectedType}:`,
          extractedPAN,
          "DigiLocker PAN:",
          digiLockerPAN
        );

        if (!extractedPAN) {
          setPanVerificationResults((prev) => ({
            ...prev,
            [docType]: {
              status: "warning",
              message: `Could not extract PAN number from ${detectedType.toUpperCase()}`,
              extractedPAN: "",
              digiLockerPAN,
            },
          }));
          toast.warning(
            `Could not extract PAN number from ${detectedType.toUpperCase()}`
          );
          return;
        }

        const panMatches = comparePANNumbers(extractedPAN, digiLockerPAN);

        if (panMatches) {
          setPanVerificationResults((prev) => ({
            ...prev,
            [docType]: {
              status: "success",
              message: `PAN number verified successfully in ${detectedType.toUpperCase()}!`,
              extractedPAN,
              digiLockerPAN,
            },
          }));
          toast.success(
            `PAN verification successful for ${detectedType.toUpperCase()}!`
          );
        } else {
          setPanVerificationResults((prev) => ({
            ...prev,
            [docType]: {
              status: "error",
              message: `PAN number mismatch in ${detectedType.toUpperCase()}! Document: ${extractedPAN}, DigiLocker: ${digiLockerPAN}`,
              extractedPAN,
              digiLockerPAN,
            },
          }));
          toast.error(`PAN number mismatch in ${detectedType.toUpperCase()}!`);
        }
      }

      checkAllDocumentsVerified();
    } catch (error) {
      console.error("Document verification error:", error);
      if (detectedType === "aadhaar") {
        setDobVerificationResults((prev) => ({
          ...prev,
          [docType]: {
            status: "error",
            message: `Could not verify DOB from ${detectedType.toUpperCase()}`,
            extractedDOB: "",
            digiLockerDOB: formData.dob || userData?.data?.dob || "",
          },
        }));
      } else if (detectedType === "pan") {
        setPanVerificationResults((prev) => ({
          ...prev,
          [docType]: {
            status: "error",
            message: `Could not verify PAN number from ${detectedType.toUpperCase()}`,
            extractedPAN: "",
            digiLockerPAN: formData.panNumber || "",
          },
        }));
      }
      toast.warning(
        `Could not verify document data from ${detectedType.toUpperCase()}`
      );
    }
  };

  const handleCameraCapture = async (data) => {
    const { imageBase64, docType, detectedType, imageDataUrl } = data;
    setCaptureLoading((prev) => ({ ...prev, [docType]: true }));

    try {
      // Convert base64 to binary (Uint8Array)
      const byteCharacters = atob(imageBase64);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const file = new File([byteArray], `${docType}_captured.jpg`, {
        type: "image/jpeg",
      });

      // Create binary object in the specified format
      const binaryObject = {
        name: `${docType}_captured.jpg`,
        data: byteArray, // Use Uint8Array instead of Buffer
        size: byteArray.length,
        encoding: "7bit",
        tempFilePath: "",
        truncated: false,
        mimetype: "image/jpeg",
        md5: md5(byteArray), // Calculate MD5 hash
      };

      if (docType === "profile_picture") {
        setCapturedProfilePicture({ file, imageBase64 });
        setFormData((prev) => ({
          ...prev,
          profile_picture: binaryObject,
        }));
        setShowCamera(false);
        toast.success("Profile picture captured successfully!");
        return;
      }

      if (docType === "aadhar_doc_front") {
        setCapturedDocuments((prev) => ({
          ...prev,
          [docType]: { type: "capture", file, base64: imageBase64 },
        }));
        setFormData((prev) => ({
          ...prev,
          [docType]: binaryObject,
        }));
        setCapturedAadharBinary(binaryObject);
      } else if (docType === "aadhar_doc_back") {
        setCapturedDocuments((prev) => ({
          ...prev,
          [docType]: { type: "capture", file, base64: imageBase64 },
        }));
        setFormData((prev) => ({
          ...prev,
          [docType]: binaryObject,
        }));
        setCapturedAadharBackBinary(binaryObject);
      } else if (docType === "pan_doc_front") {
        setCapturedDocuments((prev) => ({
          ...prev,
          [docType]: { type: "capture", file, base64: imageBase64 },
        }));
        setFormData((prev) => ({
          ...prev,
          [docType]: binaryObject,
        }));
        setCapturedPanBinary(binaryObject);
      }

      if (detectedType && docType !== "aadhar_doc_back") {
        await extractAndVerifyDocument(imageBase64, detectedType, docType);
      } else if (docType === "aadhar_doc_back") {
        setShowCamera(false);
        toast.success("Aadhaar Back captured successfully!");
      }

      setShowCamera(false);
      if (docType !== "aadhar_doc_back") {
        toast.success(
          `${detectedType ? detectedType.toUpperCase() : "Document"
          } captured successfully!`
        );
      }
    } catch (error) {
      console.error("Error processing captured document:", error);
      toast.error("Failed to process captured document. Please try again.");
    } finally {
      setCaptureLoading((prev) => ({ ...prev, [docType]: false }));
    }
  };

  const checkAllDocumentsVerified = () => {
    if (!isCountryCodeIndia) {
      setAllDocsVerified(true);
      return;
    }

    const aadhaarResult = dobVerificationResults["aadhar_doc_front"];
    const panResult = panVerificationResults["pan_doc_front"];
    const hasAadhaarCaptured = !!capturedDocuments["aadhar_doc_front"];
    const hasAadhaarBackCaptured = !!capturedDocuments["aadhar_doc_back"];
    const hasPanCaptured = !!capturedDocuments["pan_doc_front"];

    const aadhaarVerified = aadhaarResult?.status === "success";
    const panVerified = panResult?.status === "success";

    const atLeastOneVerified =
      (!hasAadhaarCaptured && !hasPanCaptured) || // No documents captured
      (hasAadhaarCaptured && aadhaarVerified) || // Aadhaar verified
      (hasPanCaptured && panVerified); // PAN verified

    setAllDocsVerified(
      atLeastOneVerified &&
      hasAadhaarCaptured &&
      hasAadhaarBackCaptured &&
      hasPanCaptured
    );
  };

  const renderVerificationStatus = () => {
    const hasVerificationResults =
      Object.keys(dobVerificationResults).length > 0 ||
      Object.keys(panVerificationResults).length > 0;

    if (!isCountryCodeIndia || !hasVerificationResults) return null;

    return (
      // <div className="row mb-3">
      //   <div className="col-12">
      //     <div className="card bg-dark border-secondary">
      //       <div className="card-header text-white">
      //         <h6 className="mb-0">Document Verification Status</h6>
      //       </div>
      //       <div className="card-body">
      //         {Object.entries(dobVerificationResults).map(
      //           ([docType, result]) => (
      //             <div key={`dob-${docType}`} className="mb-2">
      //               <div
      //                 className={`alert ${
      //                   result.status === "success"
      //                     ? "alert-success"
      //                     : result.status === "error"
      //                     ? "alert-danger"
      //                     : result.status === "warning"
      //                     ? "alert-warning"
      //                     : "alert-info"
      //                 } p-2 mb-2`}
      //               >
      //                 <strong>Aadhaar DOB Verification:</strong>{" "}
      //                 {result.message || "No verification message available"}
      //                 {result.extractedDOB && result.digiLockerDOB ? (
      //                   <div className="mt-1">
      //                     <small>
      //                       Document DOB:{" "}
      //                       {result.extractedDOB
      //                         ? "*".repeat(result.extractedDOB.length - 2) +
      //                           result.extractedDOB.slice(-2)
      //                         : "N/A"}
      //                     </small>
      //                     <br />
      //                     <small>
      //                        Expected  DOB:{" "}
      //                       {result.digiLockerDOB
      //                         ? "*".repeat(result.digiLockerDOB.length - 2) +
      //                           result.digiLockerDOB.slice(-2)
      //                         : "N/A"}
      //                     </small>
      //                   </div>
      //                 ) : (
      //                   <div className="mt-1">
      //                     <small>No DOB data available</small>
      //                   </div>
      //                 )}
      //               </div>
      //             </div>
      //           )
      //         )}
      //         {Object.entries(panVerificationResults).map(
      //           ([docType, result]) => (
      //             <div key={`pan-${docType}`} className="mb-2">
      //               <div
      //                 className={`alert ${
      //                   result.status === "success"
      //                     ? "alert-success"
      //                     : result.status === "error"
      //                     ? "alert-danger"
      //                     : result.status === "warning"
      //                     ? "alert-warning"
      //                     : "alert-info"
      //                 } p-2 mb-2`}
      //               >
      //                 <strong>PAN Number Verification:</strong>{" "}
      //                 {result.message || "No verification message available"}
      //                 {result.extractedPAN && result.digiLockerPAN ? (
      //                   <div className="mt-1">
      //                     <small>
      //                       Document PAN:{" "}
      //                       {result.extractedPAN
      //                         ? "*".repeat(result.extractedPAN.length - 2) +
      //                           result.extractedPAN.slice(-2)
      //                         : "N/A"}
      //                     </small>
      //                     <br />
      //                     <small>
      //                       Expected PAN:{" "}
      //                       {result.digiLockerPAN
      //                         ? "*".repeat(result.digiLockerPAN.length - 2) +
      //                           result.digiLockerPAN.slice(-2)
      //                         : "N/A"}
      //                     </small>
      //                   </div>
      //                 ) : (
      //                   <div className="mt-1">
      //                     <small>No PAN data available</small>
      //                   </div>
      //                 )}
      //               </div>
      //             </div>
      //           )
      //         )}
      //         {allDocsVerified && (
      //           <div className="alert alert-success p-2 mb-0">
      //             <strong>
      //               Ready to submit! At least one document is verified and all
      //               required documents captured.
      //             </strong>
      //           </div>
      //         )}
      //         {!allDocsVerified &&
      //           Object.keys(capturedDocuments).length > 0 && (
      //             <div className="alert alert-info p-2 mb-0">
      //               <strong>Note:</strong> At least one captured document
      //               (Aadhaar Front or PAN) must have successful verification,
      //               and all required documents (Aadhaar Front, Aadhaar Back,
      //               PAN) must be captured.
      //             </div>
      //           )}
      //       </div>
      //     </div>
      //   </div>
      // </div>
      <div className="mb-6">
        <div className="w-full">
          <div className="bg-gray-900 border border-gray-700 rounded-lg">
            <div className="px-4 py-3 border-b border-gray-700">
              <h6 className="text-white font-medium text-sm mb-0">Document Verification Status</h6>
            </div>
            <div className="p-4">
              {Object.entries(dobVerificationResults).map(([docType, result]) => (
                <div key={`dob-${docType}`} className="mb-3">
                  <div className={`border rounded-lg p-3 mb-3 ${getAlertClasses(result.status)}`}>
                    <div className="font-semibold">
                      Aadhaar DOB Verification:{' '}
                      <span className="font-normal">
                        {result.message || 'No verification message available'}
                      </span>
                    </div>
                    {result.extractedDOB && result.digiLockerDOB ? (
                      <div className="mt-2 text-sm">
                        <div>
                          Document DOB: {maskData(result.extractedDOB)}
                        </div>
                        <div>
                          Expected DOB: {maskData(result.digiLockerDOB)}
                        </div>
                      </div>
                    ) : (
                      <div className="mt-2 text-sm">
                        No DOB data available
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {Object.entries(panVerificationResults).map(([docType, result]) => (
                <div key={`pan-${docType}`} className="mb-3">
                  <div className={`border rounded-lg p-3 mb-3 ${getAlertClasses(result.status)}`}>
                    <div className="font-semibold">
                      PAN Number Verification:{' '}
                      <span className="font-normal">
                        {result.message || 'No verification message available'}
                      </span>
                    </div>
                    {result.extractedPAN && result.digiLockerPAN ? (
                      <div className="mt-2 text-sm">
                        <div>
                          Document PAN: {maskData(result.extractedPAN)}
                        </div>
                        <div>
                          Expected PAN: {maskData(result.digiLockerPAN)}
                        </div>
                      </div>
                    ) : (
                      <div className="mt-2 text-sm">
                        No PAN data available
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {allDocsVerified && (
                <div className="bg-green-50 border border-green-200 text-green-800 rounded-lg p-3 mb-0">
                  <div className="font-semibold">
                    Ready to submit! At least one document is verified and all required documents captured.
                  </div>
                </div>
              )}

              {!allDocsVerified && Object.keys(capturedDocuments).length > 0 && (
                <div className="bg-blue-50 border border-blue-200 text-blue-800 rounded-lg p-3 mb-0">
                  <span className="font-semibold">Note:</span> At least one captured document
                  (Aadhaar Front or PAN) must have successful verification,
                  and all required documents (Aadhaar Front, Aadhaar Back,
                  PAN) must be captured.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

    );
  };

  const renderCaptureButton = (docType, displayName) => {
    const isLoadingCapture = captureLoading[docType];
    const isCaptured = capturedDocuments[docType];

    // return (
    //   <div className="d-flex gap-2 mb-2 align-items-center">
    //     <button
    //       type="button"
    //       className={`btn btn-sm ${
    //         isLoadingCapture ? "btn-secondary" : "btn-outline-primary"
    //       }`}
    //       onClick={() => openCamera(docType)}
    //       disabled={isFieldDisabled() || isLoadingCapture}
    //     >
    //       {isLoadingCapture ? (
    //         <>
    //           <span
    //             className="spinner-border spinner-border-sm me-2"
    //             role="status"
    //             aria-hidden="true"
    //           ></span>
    //           Processing...
    //         </>
    //       ) : (
    //         `Capture ${displayName}`
    //       )}
    //     </button>
    //     {isCaptured && !isLoadingCapture && (
    //       <span className="text-success small">✓ Captured</span>
    //     )}
    //     {isLoadingCapture && (
    //       <span className="text-info small">Processing...</span>
    //     )}
    //   </div>
    // );

    return (
      <div className="flex gap-2 mb-2 items-center">
        <button
          type="button"
          className={`px-3 py-1.5 text-sm font-medium rounded border transition-colors ${isLoadingCapture
              ? "bg-gray-500 text-white border-gray-500 cursor-not-allowed"
              : "bg-white text-blue-600 border-blue-600 hover:bg-blue-50 hover:border-blue-700"
            } ${(isFieldDisabled() || isLoadingCapture) ? "opacity-50 cursor-not-allowed" : ""}`}
          onClick={() => openCamera(docType)}
          disabled={isFieldDisabled() || isLoadingCapture}
        >
          {isLoadingCapture ? (
            <div className="flex items-center">
              <svg
                className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                xmlns="http://www.w3.org/2000/svg"
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
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Processing...
            </div>
          ) : (
            `Capture ${displayName}`
          )}
        </button>

        {isCaptured && !isLoadingCapture && (
          <span className="text-green-600 text-sm">✓ Captured</span>
        )}

        {isLoadingCapture && (
          <span className="text-blue-600 text-sm">Processing...</span>
        )}
      </div>
    );
  };

  // Example usage with sample data
  const App = () => {
    const [loadingStates, setLoadingStates] = React.useState({
      aadhaarFront: false,
      aadhaarBack: false,
      pan: false
    });

    const [capturedStates, setCapturedStates] = React.useState({
      aadhaarFront: true,
      aadhaarBack: false,
      pan: false
    });

    const handleOpenCamera = (docType) => {
      setLoadingStates(prev => ({ ...prev, [docType]: true }));

      // Simulate processing
      setTimeout(() => {
        setLoadingStates(prev => ({ ...prev, [docType]: false }));
        setCapturedStates(prev => ({ ...prev, [docType]: true }));
      }, 2000);
    };

    const isFieldDisabled = () => false;

    return (
      <div className="p-6 bg-gray-100 min-h-screen">
        <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Document Capture</h3>

          <CaptureButton
            docType="aadhaarFront"
            displayName="Aadhaar Front"
            isLoadingCapture={loadingStates.aadhaarFront}
            isCaptured={capturedStates.aadhaarFront}
            isFieldDisabled={isFieldDisabled}
            openCamera={handleOpenCamera}
          />

          <CaptureButton
            docType="aadhaarBack"
            displayName="Aadhaar Back"
            isLoadingCapture={loadingStates.aadhaarBack}
            isCaptured={capturedStates.aadhaarBack}
            isFieldDisabled={isFieldDisabled}
            openCamera={handleOpenCamera}
          />

          <CaptureButton
            docType="pan"
            displayName="PAN Card"
            isLoadingCapture={loadingStates.pan}
            isCaptured={capturedStates.pan}
            isFieldDisabled={isFieldDisabled}
            openCamera={handleOpenCamera}
          />
        </div>
      </div>
    );
  };

  const getDocumentTitle = (docType) => {
    if (docType.includes("aadhar")) return "Aadhaar Document";
    if (docType.includes("pan")) return "PAN Document";
    if (docType.includes("dl")) return "Driving License";
    if (docType.includes("passport")) return "Passport Document";
    if (docType === "profile_picture") return "Profile Picture";
    return "Document";
  };

  const getCountryName = () => {
    const countryCode = `+${userData?.data?.countryCode}`;
    const countryName = countryCodes.find(
      (country) => country.country_code == countryCode
    );
    return countryName?.country_name || "N/A";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "ifsc_code" && !/^[a-zA-Z0-9]*$/.test(value)) return;
    if (name === "panNumber" && !/^[a-zA-Z0-9]*$/.test(value)) return;
    if (name === "upi_id" && !/^[0-9]*$/.test(value)) return;
    if (name === "bank_name" && !/^[a-zA-Z\s]*$/.test(value)) return;

    setFormData((prev) => ({
      ...prev,
      [name]: name === "ifsc_code" ? value.toUpperCase() : value,
    }));
  };

  const handleChangeMobileNumber = (e) => {
    const { name, value } = e.target;
    if (value.startsWith(`+${userData?.data?.countryCode} `)) {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const getMaxLength = () => {
    return isCountryCodeIndia ? 14 : 19;
  };

  const checkTextAfterPrefix = (input) => {
    let splitString = input.split(`+${userData?.data?.countryCode} `);
    return !splitString[1]?.trim().length > 0;
  };

  const handleSubmit = async () => {
    const newErrors = {};

    if (isCountryCodeIndia) {
      const aadhaarResult = dobVerificationResults["aadhar_doc_front"];
      const panResult = panVerificationResults["pan_doc_front"];
      const hasAadhaarCaptured = capturedDocuments["aadhar_doc_front"];
      const hasAadhaarBackCaptured = capturedDocuments["aadhar_doc_back"];
      const hasPanCaptured = capturedDocuments["pan_doc_front"];

      if (
        hasAadhaarCaptured &&
        (!aadhaarResult || aadhaarResult.status === "error")
      ) {
        newErrors.aadhar_doc_front =
          "Aadhaar DOB verification failed. Please recapture.";
      }

      if (hasPanCaptured && (!panResult || panResult.status === "error")) {
        newErrors.pan_doc_front = "PAN verification failed. Please recapture.";
      }

      if (!hasAadhaarCaptured) {
        newErrors.aadhar_doc_front = "Aadhaar Front capture is mandatory.";
      }
      if (!hasAadhaarBackCaptured) {
        newErrors.aadhar_doc_back = "Aadhaar Back capture is mandatory.";
      }
      if (!hasPanCaptured) {
        newErrors.pan_doc_front = "PAN Front capture is mandatory.";
      }

      const atLeastOneVerified =
        (hasAadhaarCaptured && aadhaarResult?.status === "success") ||
        (hasPanCaptured && panResult?.status === "success");

      if ((hasAadhaarCaptured || hasPanCaptured) && !atLeastOneVerified) {
        newErrors.dob_verification =
          "At least one document must have successful verification.";
      }
    } else {
      if (!formData.dl_doc_front)
        newErrors.dl_doc_front =
          "The Driving License doc front field is mandatory.";
      if (!formData.dl_doc_back)
        newErrors.dl_doc_back =
          "The Driving License doc back field is mandatory.";
      if (!formData.passport_doc_front)
        newErrors.passport_doc_front =
          "The Passport doc front field is mandatory.";
      if (!formData.passport_doc_back)
        newErrors.passport_doc_back =
          "The Passport doc back field is mandatory.";
    }

    if (!formData.profile_picture)
      newErrors.profile_picture = "The profile picture is mandatory.";
    if (!formData.bank_name)
      newErrors.bank_name = "The bank name field is mandatory.";
    if (!formData.ifsc_code)
      newErrors.ifsc_code = `The ${isCountryCodeIndia ? "IFSC" : "bank"
        } code field is mandatory.`;
    if (checkTextAfterPrefix(formData.mobile_number))
      newErrors.mobile_number = "The mobile number field is mandatory.";
    if (!formData.bank_account)
      newErrors.bank_account = "The bank account field is mandatory.";
    if (!formData.address)
      newErrors.address = "The address field is mandatory.";
    if (isCountryCodeIndia && !formData.panNumber)
      newErrors.panNumber = "The PAN number field is mandatory.";

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      toast.error("Please fix the validation errors before submitting.");
      setLoading(false);
      return;
    }

    const data = new FormData();

    const appendBinaryFile = (key, binaryObject) => {
      if (binaryObject && binaryObject.data) {
        // Append the binary data as a Blob with the correct filename
        data.append(
          key,
          new Blob([binaryObject.data], { type: binaryObject.mimetype }),
          binaryObject.name
        );
      }
    };

    if (isCountryCodeIndia) {
      appendBinaryFile("aadhar_doc_front", capturedAadharBinary);
      appendBinaryFile("aadhar_doc_back", capturedAadharBackBinary);
      appendBinaryFile("pan_doc_front", capturedPanBinary);
      if (dobVerificationResults["aadhar_doc_front"]?.extractedDOB) {
        data.append(
          "aadhar_dob_extracted",
          dobVerificationResults["aadhar_doc_front"].extractedDOB
        );
      }
      if (panVerificationResults["pan_doc_front"]?.extractedPAN) {
        data.append(
          "pan_number_extracted",
          panVerificationResults["pan_doc_front"].extractedPAN
        );
      }
      if (formData.upi_id) data.append("upi_id", formData.upi_id);
      if (formData.panNumber) data.append("panNumber", formData.panNumber);
      if (formData.dob) data.append("dob", formData.dob);
    } else {
      if (formData.dl_doc_front)
        data.append("dl_doc_front", formData.dl_doc_front.file);
      if (formData.dl_doc_back)
        data.append("dl_doc_back", formData.dl_doc_back.file);
      if (formData.passport_doc_front)
        data.append("passport_doc_front", formData.passport_doc_front.file);
      if (formData.passport_doc_back)
        data.append("passport_doc_back", formData.passport_doc_back.file);
    }

    appendBinaryFile("profile_picture", formData.profile_picture);
    if (formData.profile_picture) data.append("captured_profile", "true");

    if (formData.applicantName) data.append("name", formData.applicantName);
    if (formData.bank_name) data.append("bank_name", formData.bank_name);
    if (formData.ifsc_code) data.append("ifsc_code", formData.ifsc_code);
    if (formData.mobile_number.startsWith(`+${userData?.data?.countryCode} `)) {
      data.append(
        "mobile_number",
        formData.mobile_number.replace(`+${userData?.data?.countryCode} `, "")
      );
    }
    if (formData.bank_account)
      data.append("bank_account", formData.bank_account);
    if (formData.address) data.append("address", formData.address);

    if (isCountryCodeIndia) {
      const verificationStatus = {
        aadhar_verified:
          dobVerificationResults["aadhar_doc_front"]?.status === "success",
        pan_verified:
          panVerificationResults["pan_doc_front"]?.status === "success",
        any_verified:
          dobVerificationResults["aadhar_doc_front"]?.status === "success" ||
          panVerificationResults["pan_doc_front"]?.status === "success",
      };
      data.append("verification_status", JSON.stringify(verificationStatus));
    }

    console.log("KYC Payload Summary:");
    for (let [key, value] of data.entries()) {
      if (value instanceof Blob) {
        console.log(
          `${key}: File - ${value.name || "unnamed"} (${value.size} bytes)`
        );
      } else {
        console.log(
          `${key}: ${typeof value === "string" ? value.substring(0, 50) + "..." : value
          }`
        );
      }
    }

    setLoading(true);
    try {
      const response = await submitKyc(data).unwrap();
      if (response?.status_code === 200) {
        toast.success(response?.message || "KYC submitted successfully!", {
          position: "top-center",
        });
        await refetch();
        setErrors({});
        setDobVerificationResults({});
        setPanVerificationResults({});
        setAllDocsVerified(false);
      } else {
        toast.error(response?.error?.data?.message || "Failed to submit KYC", {
          position: "top-center",
        });
        setErrors({});
      }
    } catch (error) {
      toast.error(error.message || "An error occurred during KYC submission", {
        position: "top-center",
      });
      setErrors({});
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      aadhar_doc_front: null,
      aadhar_doc_back: null,
      pan_doc_front: null,
      dl_doc_front: null,
      dl_doc_back: null,
      passport_doc_front: null,
      passport_doc_back: null,
      profile_picture: null,
      bank_name: "",
      applicantName: "",
      ifsc_code: "",
      mobile_number: userData?.data?.countryCode
        ? `+${userData.data.countryCode} `
        : "",
      upi_id: "",
      bank_account: "",
      address: "",
      dob: "",
      panNumber: "",
    });
    setCapturedDocuments({});
    setCapturedProfilePicture(null);
    setCapturedAadharBinary(null);
    setCapturedAadharBackBinary(null);
    setCapturedPanBinary(null);
    setDobVerificationResults({});
    setPanVerificationResults({});
    setCaptureLoading({});
    setAllDocsVerified(false);
  };

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const extractedCode = queryParams.get("code");
    window.history.replaceState(null, "", window.location.pathname);

    const postTokenRequest = async (payload) => {
      try {
        const response = await getKycData(payload).unwrap();
        if (response.data) {
          setFormData((prev) => ({
            ...prev,
            applicantName: response.data.name || "",
            mobile_number: response.data.mobile
              ? `+91 ${response.data.mobile}`
              : "",
            address: response.data.address || "",
            dob: response.data.dob || "",
            panNumber: response.data.panNumber || "",
          }));
          setEnableFields(true);
          setDisableFieldsAfterKYC(true);
          setIsEditClicked(true);
          setShowModal(false);
        }
      } catch (error) {
        console.error("DigiLocker error:", error);
        toast.error("Failed to fetch DigiLocker data. Please try again.");
      } finally {
        setLoading(false);
        localStorage.removeItem("code");
        localStorage.removeItem("verifier");
        localStorage.removeItem("processed");
      }
    };

    if (extractedCode && !localStorage.getItem("processed")) {
      localStorage.setItem("processed", "true");
      const payload = {
        code: extractedCode,
        verifier: localStorage.getItem("verifier"),
      };
      setLoading(true);
      postTokenRequest(payload);
    } else {
      refetch();
    }

    if (kycdata?.success === 1) {
      setEnableFields(true);
      setDisableFieldsAfterKYC(true);
      setFormData((prev) => ({
        ...prev,
        aadhar_doc_front: null,
        aadhar_doc_back: null,
        pan_doc_front: null,
        dl_doc_front: kycdata?.data?.dl_doc_front || null,
        dl_doc_back: kycdata?.data?.dl_doc_back || null,
        passport_doc_front: kycdata?.data?.passport_doc_front || null,
        passport_doc_back: kycdata?.data?.passport_doc_back || null,
        profile_picture: null,
        bank_name: kycdata?.data?.bank_name || "",
        ifsc_code: kycdata?.data?.ifsc_code || "",
        applicantName: kycdata?.data?.name || userData?.data?.name || "",
        mobile_number: kycdata?.data?.mobile_number
          ? `+${userData?.data?.countryCode} ${kycdata.data.mobile_number}`
          : userData?.data?.countryCode
            ? `+${userData.data.countryCode} `
            : "",
        upi_id: kycdata?.data?.upi_id || "",
        bank_account: kycdata?.data?.bank_account || "",
        address: kycdata?.data?.address || "",
        dob: kycdata?.data?.dob || "",
        panNumber: kycdata?.data?.panNumber || "",
      }));
      setShowModal(
        isCountryCodeIndia &&
        kycdata?.data?.status === "reject" &&
        !(isLoading || loading)
      );
    } else {
      setShowModal(isCountryCodeIndia && !(isLoading || loading));
      resetForm();
    }
  }, [kycdata, location.search, userData]);

  useEffect(() => {
    checkAllDocumentsVerified();
  }, [
    dobVerificationResults,
    panVerificationResults,
    capturedDocuments,
    isCountryCodeIndia,
  ]);

  const onClickImage = (imageURL) => {
    if (imageURL) {
      const link = document.createElement("a");
      link.href = imageURL;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.click();
    }
  };

  const onClickEdit = () => {
    setIsEditClicked(true);
  };

  const DIGILOCKER_CONFIG = {
    BASE_URL:
      "https://digilocker.meripehchaan.gov.in/public/oauth2/1/authorize",
    RESPONSE_TYPE: "code",
    STATE: "oidc_flow",
    DL_FLOW: "signin",
    ACR: "pan+aadhaar+mobile",
    AMR: "pan+all+aadhaar",
    SCOPE: "files.issueddocs+files.uploadeddocs",
    PLA: "Y",
  };

  const handleButtonClick = async () => {
    setLoading(true);
    setErrors({});

    try {
      const verifier = await generateCodeVerifier();
      localStorage.removeItem("processed");
      const challenge = await generateCodeChallenge(verifier);
      let origin = window.location.origin;
      let redirectURI, clientId;
      if (origin.includes("5173") || origin.includes("5174")) {
        redirectURI = import.meta.env.VITE_DL_REDIRECT_URI_DEV;
        clientId = import.meta.env.VITE_DL_CLIENT_ID_DEV;
      } else if (origin === "https://jaimax.com") {
        redirectURI = import.meta.env.VITE_DL_REDIRECT_URI_PROD;
        clientId = import.meta.env.VITE_DL_CLIENT_ID_PROD;
      } else {
        redirectURI = import.meta.env.VITE_DL_REDIRECT_URI_QA;
        clientId = import.meta.env.VITE_DL_CLIENT_ID_QA;
      }


      localStorage.setItem("verifier", verifier);
      const apiUrl = new URL(
        `${DIGILOCKER_CONFIG.BASE_URL}?response_type=${DIGILOCKER_CONFIG.RESPONSE_TYPE}&client_id=${clientId}&state=${DIGILOCKER_CONFIG.STATE}&redirect_uri=${redirectURI}&code_challenge=${challenge}&code_challenge_method=S256&dl_flow=${DIGILOCKER_CONFIG.DL_FLOW}&acr=${DIGILOCKER_CONFIG.ACR}&amr=${DIGILOCKER_CONFIG.AMR}&scope=${DIGILOCKER_CONFIG.SCOPE}&pla=${DIGILOCKER_CONFIG.PLA}`
      );
      window.open(apiUrl.toString(), "_self");
    } catch (err) {
      setErrors({ digiLocker: err.message });
      toast.error("Failed to initiate DigiLocker authentication.");
    } finally {
      setLoading(false);
    }
  };
return(
   <div className="min-h-screen bg-gradient-to-br from-teal-50 to-white">
      <div className="container mx-auto px-4 py-6 sm:py-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            
            {/* Header */}
            <div className="bg-gradient-to-r from-teal-600 to-teal-700 px-4 sm:px-6 py-4 sm:py-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                  <h1 className="text-white text-xl sm:text-2xl font-bold">
                    KYC Information
                  </h1>
                  {kycdata?.data?.status !== "approve" && (
                    <p className="text-teal-100 text-sm">
                      (Fill up information and verify your KYC.)
                    </p>
                  )}
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                  <h6 className="text-teal-100 text-sm">
                    Country: <span className="ml-1 sm:ml-2 font-semibold text-white">{userData?.data?.country || 'India'}</span>
                  </h6>
                  {isCountryCodeIndia && (
                    <button
                      type="button"
                      className="self-start sm:self-auto bg-teal-500 hover:bg-teal-400 p-2 rounded-lg transition-colors duration-200"
                      onClick={() => console.log('DigiLocker clicked')}
                    >
                      {/* <FileText className="w-5 h-5 text-white" /> */}
                      <img src={digiLocker} alt="" onClick={handleButtonClick} />
                    </button>
                  )}
                </div>
              </div>
            </div>

            <div className="p-4 sm:p-6">
              {renderVerificationStatus()}

              {/* Form Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
                
                {/* Applicant Info */}
                <div className="space-y-6">
                  <div className="flex items-center gap-2 pb-3 border-b border-teal-200">
                    <User className="w-5 h-5 text-teal-600" />
                    <h6 className="text-teal-800 text-lg font-semibold">Applicant Info</h6>
                  </div>

                  {/* Status and Edit */}
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 p-3 bg-teal-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      {kycdata?.data?.status === "approve" && (
                        <button
                          type="button"
                          className="bg-teal-600 hover:bg-teal-700 p-1 rounded"
                          onClick={onClickEdit}
                        >
                          <Edit className="w-4 h-4 text-white" />
                        </button>
                      )}
                      <p className="text-teal-700 text-sm">
                        KYC status:{' '}
                        <span className={`capitalize font-bold ${getStatusColor(kycdata?.data?.status)}`}>
                          {kycdata?.data?.status || "N/A"}
                        </span>
                      </p>
                    </div>
                  </div>

                  {/* Profile Picture */}
                  <div className="space-y-3">
                    <label className="block text-teal-800 text-sm font-medium">
                      Profile Picture <span className="text-red-500">*</span>
                    </label>
                    <CaptureButton docType="profile_picture" displayName="Selfie" />
                    {capturedProfilePicture && (
                      <div className="mt-3">
                        <img
                          src={`data:image/jpeg;base64,${capturedProfilePicture.imageBase64}`}
                          alt="Profile"
                          className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-lg border-2 border-teal-500"
                        />
                      </div>
                    )}
                  </div>

                  {/* Name */}
                  <div className="space-y-3">
                    <label htmlFor="applicantName" className="block text-teal-800 text-sm font-medium">
                      Name of the Applicant <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 bg-white border border-teal-300 rounded-lg text-teal-900 placeholder-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      name="applicantName"
                      placeholder="Enter your full name"
                      value={formData.applicantName}
                      onChange={handleChange}
                      disabled={isFieldDisabled()}
                    />
                  </div>

                  {/* Date of Birth - India only */}
                  {isCountryCodeIndia && (
                    <div className="space-y-3">
                      <label htmlFor="dob" className="block text-teal-800 text-sm font-medium">
                        Date of Birth <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="date"
                        className="w-full px-3 py-2 bg-white border border-teal-300 rounded-lg text-teal-900 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        name="dob"
                        value={formData.dob}
                        onChange={handleChange}
                        disabled={isFieldDisabled()}
                      />
                    </div>
                  )}

                  {/* Mobile Number */}
                  <div className="space-y-3">
                    <label htmlFor="mobile_number" className="block text-teal-800 text-sm font-medium">
                      Mobile Number (As per Bank) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      className="w-full px-3 py-2 bg-white border border-teal-300 rounded-lg text-teal-900 placeholder-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      name="mobile_number"
                      placeholder="Enter mobile number"
                      value={formData.mobile_number}
                      onChange={handleChange}
                      disabled={isFieldDisabled()}
                    />
                  </div>

                  {/* Address */}
                  <div className="space-y-3">
                    <label htmlFor="address" className="block text-teal-800 text-sm font-medium">
                      Address <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      className="w-full px-3 py-2 bg-white border border-teal-300 rounded-lg text-teal-900 placeholder-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none"
                      name="address"
                      placeholder="Enter your complete address"
                      value={formData.address}
                      onChange={handleChange}
                      disabled={isFieldDisabled()}
                      rows="3"
                    />
                  </div>
                </div>

                {/* Applicant Proofs */}
                <div className="space-y-6">
                  <div className="flex items-center gap-2 pb-3 border-b border-teal-200">
                    <FileText className="w-5 h-5 text-teal-600" />
                    <h6 className="text-teal-800 text-lg font-semibold">Applicant Proofs</h6>
                  </div>

                  {isCountryCodeIndia ? (
                    <>
                      {/* Aadhaar Front */}
                      <div className="space-y-3">
                        <label className="block text-teal-800 text-sm font-medium">
                          Aadhaar Front <span className="text-red-500">*</span>
                          {kycdata?.success && (
                            <button
                              type="button"
                              className="ml-2 bg-teal-600 hover:bg-teal-700 p-1 rounded"
                              onClick={() => console.log('Show Aadhaar front')}
                            >
                              <Eye className="w-3 h-3 text-white" />
                            </button>
                          )}
                        </label>
                        <CaptureButton docType="aadhar_doc_front" displayName="Aadhaar Front" />
                      </div>

                      {/* Aadhaar Back */}
                      <div className="space-y-3">
                        <label className="block text-teal-800 text-sm font-medium">
                          Aadhaar Back <span className="text-red-500">*</span>
                          {kycdata?.success && (
                            <button
                              type="button"
                              className="ml-2 bg-teal-600 hover:bg-teal-700 p-1 rounded"
                              onClick={() => console.log('Show Aadhaar back')}
                            >
                              <Eye className="w-3 h-3 text-white" />
                            </button>
                          )}
                        </label>
                        <CaptureButton docType="aadhar_doc_back" displayName="Aadhaar Back" />
                      </div>

                      {/* PAN */}
                      <div className="space-y-3">
                        <label className="block text-teal-800 text-sm font-medium">
                          PAN <span className="text-red-500">*</span>
                          {kycdata?.success && (
                            <button
                              type="button"
                              className="ml-2 bg-teal-600 hover:bg-teal-700 p-1 rounded"
                              onClick={() => console.log('Show PAN')}
                            >
                              <Eye className="w-3 h-3 text-white" />
                            </button>
                          )}
                        </label>
                        <CaptureButton docType="pan_doc_front" displayName="PAN" />
                      </div>

                      {/* PAN Number */}
                      <div className="space-y-3">
                        <label htmlFor="panNumber" className="block text-teal-800 text-sm font-medium">
                          PAN Number <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          className="w-full px-3 py-2 bg-white border border-teal-300 rounded-lg text-teal-900 placeholder-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent uppercase"
                          name="panNumber"
                          placeholder="Enter PAN number"
                          value={formData.panNumber}
                          onChange={handleChange}
                          disabled={isFieldDisabled()}
                          maxLength="10"
                        />
                      </div>
                    </>
                  ) : (
                    <>
                      {/* International Documents */}
                      <div className="space-y-6">
                        <div className="space-y-3">
                          <label className="block text-teal-800 text-sm font-medium">
                            Driving License Front <span className="text-red-500">*</span>
                          </label>
                          <div className="flex items-center gap-3">
                            <Upload className="w-5 h-5 text-teal-600" />
                            <input
                              type="file"
                              accept=".jpg,.jpeg,.png,.pdf"
                              className="flex-1 text-sm text-teal-700 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-teal-50 file:text-teal-700 hover:file:bg-teal-100"
                              name="dl_doc_front"
                              onChange={handleChange}
                              disabled={isFieldDisabled()}
                            />
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>

                {/* Bank Details */}
                <div className="space-y-6">
                  <div className="flex items-center gap-2 pb-3 border-b border-teal-200">
                    <CreditCard className="w-5 h-5 text-teal-600" />
                    <h6 className="text-teal-800 text-lg font-semibold">Bank Details</h6>
                  </div>

                  {/* UPI - India only */}
                  {isCountryCodeIndia && (
                    <div className="space-y-3">
                      <label htmlFor="upi_id" className="block text-teal-800 text-sm font-medium">
                        UPI ID
                      </label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 bg-white border border-teal-300 rounded-lg text-teal-900 placeholder-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        name="upi_id"
                        placeholder="Enter UPI ID (e.g., user@upi)"
                        value={formData.upi_id}
                        onChange={handleChange}
                        disabled={isFieldDisabled()}
                      />
                    </div>
                  )}

                  {/* Bank Account Number */}
                  <div className="space-y-3">
                    <label htmlFor="bank_account" className="block text-teal-800 text-sm font-medium">
                      Bank Account Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 bg-white border border-teal-300 rounded-lg text-teal-900 placeholder-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      name="bank_account"
                      placeholder="Enter bank account number"
                      value={formData.bank_account}
                      onChange={handleChange}
                      disabled={isFieldDisabled()}
                    />
                  </div>

                  {/* Bank Name */}
                  <div className="space-y-3">
                    <label htmlFor="bank_name" className="block text-teal-800 text-sm font-medium">
                      Bank Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 bg-white border border-teal-300 rounded-lg text-teal-900 placeholder-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      name="bank_name"
                      placeholder="Enter bank name"
                      value={formData.bank_name}
                      onChange={handleChange}
                      disabled={isFieldDisabled()}
                    />
                  </div>

                  {/* IFSC Code */}
                  <div className="space-y-3">
                    <label htmlFor="ifsc_code" className="block text-teal-800 text-sm font-medium">
                      Bank {isCountryCodeIndia ? "IFSC" : ""} Code <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 bg-white border border-teal-300 rounded-lg text-teal-900 placeholder-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent uppercase"
                      name="ifsc_code"
                      placeholder={isCountryCodeIndia ? "Enter IFSC code" : "Enter bank code"}
                      value={formData.ifsc_code}
                      onChange={handleChange}
                      disabled={isFieldDisabled()}
                    />
                  </div>
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mt-8 pt-6 border-t border-teal-200">
                {kycdata?.success !== 1 && (
                  <button
                    type="button"
                    className="flex-1 sm:flex-none sm:px-8 py-3 bg-gradient-to-r from-teal-600 to-teal-700 text-white font-semibold rounded-lg shadow-lg hover:from-teal-700 hover:to-teal-800 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={handleSubmit}
                    disabled={isCountryCodeIndia && !allDocsVerified}
                  >
                    {isCountryCodeIndia && !allDocsVerified ? "Verify Documents First" : "Submit KYC"}
                  </button>
                )}
                
                {(kycdata?.data?.status === "reject" || (kycdata?.data?.status === "approve" && isEditClicked)) && (
                  <button
                    type="button"
                    className="flex-1 sm:flex-none sm:px-8 py-3 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white font-semibold rounded-lg shadow-lg hover:from-emerald-700 hover:to-emerald-800 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={handleSubmit}
                    disabled={isCountryCodeIndia && !allDocsVerified}
                  >
                    {isCountryCodeIndia && !allDocsVerified ? "Verify Documents First" : "Update KYC"}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Camera Modal Placeholder */}
      {showCamera && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-lg font-semibold text-teal-800 mb-4">Camera Capture</h3>
            <p className="text-teal-600 mb-4">Camera component for {currentDocType}</p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowCamera(false)}
                className="flex-1 px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowCamera(false);
                  console.log('Image captured for:', currentDocType);
                }}
                className="flex-1 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700"
              >
                Capture
              </button>
            </div>
          </div>
        </div>
      )}
      <CameraCapture
        isOpen={showCamera}
        onClose={() => setShowCamera(false)}
        onCapture={handleCameraCapture}
        docType={currentDocType}
        title={getDocumentTitle(currentDocType)}
      />
      {showModal && (
        <DigiLockerModal
          show={showModal}
          onHide={() => setShowModal(false)}
          onClickDigiLocker={handleButtonClick}
        />
      )}
      {(isLoading || loading) && <Loader />}
    </div>
)
  // return (
  //   <>
  //     <section className="profile_section py-4 kycSection">
  //       <div className="container-fluid">
  //         <div className="row">
  //           <div className="col-12">
  //             <div className="my_total_team_data rounded-3 py-4">
  //               <div className="d-flex justify-content-between pb-2">
  //                 <div className="d-flex">
  //                   <h1 className="text-white m-0 my-auto pe-2">
  //                     KYC Information
  //                   </h1>
  //                   <p className="error my-auto text-white pe-1 pe-md-0 pe-lg-0">
  //                     {kycdata?.data?.status !== "approve" &&
  //                       "(Fill up information and verify your KYC.)"}
  //                   </p>
  //                 </div>
  //                 <h6 className="text-white my-auto countryDisplay">
  //                   Country:{" "}
  //                   <span className="ps-2">
  //                     {userData?.data?.country || getCountryName()}
  //                   </span>
  //                 </h6>
  //                 {isCountryCodeIndia &&
  //                   ((kycdata?.data?.status !== "open" &&
  //                     kycdata?.data?.status !== "approve") ||
  //                     (kycdata?.data?.status === "approve" &&
  //                       isEditClicked)) && (
  //                     <div>
  //                       <button
  //                         type="button"
  //                         className="border-0 bg-transparent"
  //                         id="renderBtn"
  //                         onClick={handleButtonClick}
  //                       >
  //                         <img
  //                           src={digiLocker}
  //                           alt="digiLockerIcon"
  //                           className="img-fluid"
  //                         />
  //                       </button>
  //                     </div>
  //                   )}
  //               </div>

  //               {renderVerificationStatus()}

  //               <form className="row justify-content-between">
  //                 <div className="d-flex flex-wrap justify-content-between pb-2">
  //                   <div className="d-flex">
  //                     {kycdata?.data?.status === "approve" && (
  //                       <button
  //                         type="button"
  //                         className="bg-transparent border-0 pe-2 mb-0"
  //                         onClick={onClickEdit}
  //                       >
  //                         <img alt="edit" src={editIcon} />
  //                       </button>
  //                     )}
  //                     <p className="m-0 my-auto">
  //                       KYC status:{" "}
  //                       <span
  //                         className="text-capitalize"
  //                         style={{
  //                           color:
  //                             kycdata?.data?.status === "open"
  //                               ? "#ff8a00"
  //                               : kycdata?.data?.status === "approve"
  //                               ? "green"
  //                               : kycdata?.data?.status === "inprogress"
  //                               ? "blue"
  //                               : "red",
  //                           fontFamily: "MontserratBold",
  //                         }}
  //                       >
  //                         {kycdata?.data?.status || "N/A"}
  //                       </span>
  //                     </p>
  //                     {kycdata?.data?.status === "reject" && (
  //                       <p className="m-0 my-auto ps-3">
  //                         Reason:{" "}
  //                         <span
  //                           style={{
  //                             color: "red",
  //                             fontFamily: "MontserratBold",
  //                           }}
  //                         >
  //                           {kycdata?.data?.reason}
  //                         </span>
  //                       </p>
  //                     )}
  //                   </div>
  //                 </div>

  //                 <div className="col-12 col-md-4">
  //                   <h6 className="m-0 text-white mainTitles pb-2">
  //                     Applicant Info
  //                   </h6>
  //                   <div className="mb-3">
  //                     <label className="form-label">
  //                       Profile Picture <span className="error">*</span>
  //                     </label>
  //                     <div className="d-flex gap-2 mb-2 align-items-center">
  //                       <button
  //                         type="button"
  //                         className={`btn btn-sm ${
  //                           captureLoading["profile_picture"]
  //                             ? "btn-secondary"
  //                             : "btn-outline-success"
  //                         }`}
  //                         onClick={() => openCamera("profile_picture")}
  //                         disabled={
  //                           isFieldDisabled() ||
  //                           captureLoading["profile_picture"]
  //                         }
  //                       >
  //                         {captureLoading["profile_picture"] ? (
  //                           <>
  //                             <span
  //                               className="spinner-border spinner-border-sm me-2"
  //                               role="status"
  //                               aria-hidden="true"
  //                             ></span>
  //                             Processing...
  //                           </>
  //                         ) : (
  //                           "Capture Selfie"
  //                         )}
  //                       </button>
  //                       {capturedProfilePicture &&
  //                         !captureLoading["profile_picture"] && (
  //                           <span className="text-success small">
  //                             ✓ Profile captured
  //                           </span>
  //                         )}
  //                       {captureLoading["profile_picture"] && (
  //                         <span className="text-info small">
  //                           🔄 Processing...
  //                         </span>
  //                       )}
  //                     </div>
  //                     {capturedProfilePicture && (
  //                       <div className="mt-2">
  //                         <img
  //                           src={`data:image/jpeg;base64,${capturedProfilePicture.imageBase64}`}
  //                           alt="Profile"
  //                           style={{
  //                             width: "100px",
  //                             height: "100px",
  //                             objectFit: "cover",
  //                             borderRadius: "8px",
  //                             border: "2px solid #28a745",
  //                           }}
  //                         />
  //                       </div>
  //                     )}
  //                     {errors.profile_picture && (
  //                       <p className="error">{errors.profile_picture}</p>
  //                     )}
  //                   </div>
  //                   <div className="mb-3">
  //                     <label htmlFor="applicantName" className="form-label">
  //                       Name of the Applicant <span className="error">*</span>
  //                     </label>
  //                     <input
  //                       type="text"
  //                       className="form-control shadow-none bg-transparent"
  //                       name="applicantName"
  //                       value={formData.applicantName}
  //                       onChange={handleChange}
  //                       disabled={isFieldDisabled()}
  //                     />
  //                     {errors.applicantName && (
  //                       <p className="error">{errors.applicantName}</p>
  //                     )}
  //                   </div>
  //                   {isCountryCodeIndia && (
  //                     <div className="mb-3">
  //                       <label htmlFor="dob" className="form-label">
  //                         Date of Birth <span className="error">*</span>
  //                       </label>
  //                       <input
  //                         type="text"
  //                         className="form-control shadow-none bg-transparent"
  //                         placeholder="Date of Birth"
  //                         name="dob"
  //                         value={
  //                           formData.dob
  //                             ? "*".repeat(formData.dob.length - 2) +
  //                               formData.dob.slice(-2)
  //                             : ""
  //                         }
  //                         onChange={handleChange}
  //                         disabled
  //                         readOnly
  //                       />
  //                       {errors.dob && <p className="error">{errors.dob}</p>}
  //                     </div>
  //                   )}
  //                   <div className="mb-3">
  //                     <label htmlFor="mobile_number" className="form-label">
  //                       Mobile Number (As per Bank){" "}
  //                       <span className="error">*</span>
  //                     </label>
  //                     <input
  //                       type="text"
  //                       className="form-control shadow-none bg-transparent"
  //                       name="mobile_number"
  //                       placeholder="Enter mobile number"
  //                       // value={formData.mobile_number}
  //                       value={
  //                         formData.mobile_number
  //                           ? "*".repeat(formData.mobile_number.length - 2) +
  //                             formData.mobile_number.slice(-2)
  //                           : ""
  //                       }
  //                       maxLength={getMaxLength()}
  //                       disabled={isFieldDisabled()}
  //                       onChange={handleChangeMobileNumber}
  //                       onKeyPress={(event) => {
  //                         if (!/[0-9]/.test(event.key)) event.preventDefault();
  //                       }}
  //                       autoComplete="off"
  //                     />
  //                     {errors.mobile_number && (
  //                       <p className="error">{errors.mobile_number}</p>
  //                     )}
  //                   </div>
  //                   <div className="mb-3">
  //                     <label htmlFor="address" className="form-label">
  //                       Address <span className="error">*</span>
  //                     </label>
  //                     <input
  //                       type="text"
  //                       autoComplete="off"
  //                       className="form-control shadow-none bg-transparent"
  //                       name="address"
  //                       placeholder="Enter your address"
  //                       value={formData.address}
  //                       onChange={handleChange}
  //                       disabled={isFieldDisabled()}
  //                     />
  //                     {errors.address && (
  //                       <p className="error">{errors.address}</p>
  //                     )}
  //                   </div>
  //                 </div>

  //                 <div className="col-12 col-md-4">
  //                   <h6 className="m-0 text-white mainTitles pb-2">
  //                     Applicant Proofs
  //                   </h6>
  //                   {isCountryCodeIndia && (
  //                     <>
  //                       <div className="mb-3">
  //                         <label className="form-label">
  //                           Aadhaar Front <span className="error">*</span>
  //                           {kycdata?.success && (
  //                             <span className="ps-1">
  //                               <button
  //                                 type="button"
  //                                 className="bg-transparent border-0"
  //                                 onClick={() =>
  //                                   onClickImage(kycdata.data?.aadhar_doc_front)
  //                                 }
  //                               >
  //                                 <img alt="showIcon" src={showIcon} />
  //                               </button>
  //                             </span>
  //                           )}
  //                         </label>
  //                         {renderCaptureButton(
  //                           "aadhar_doc_front",
  //                           "Aadhaar Front"
  //                         )}
  //                         {errors.aadhar_doc_front && (
  //                           <p className="error">{errors.aadhar_doc_front}</p>
  //                         )}
  //                       </div>
  //                       <div className="mb-3">
  //                         <label className="form-label">
  //                           Aadhaar Back <span className="error">*</span>
  //                           {kycdata?.success && (
  //                             <span className="ps-1">
  //                               <button
  //                                 type="button"
  //                                 className="bg-transparent border-0"
  //                                 onClick={() =>
  //                                   onClickImage(kycdata.data?.aadhar_doc_back)
  //                                 }
  //                               >
  //                                 <img alt="showIcon" src={showIcon} />
  //                               </button>
  //                             </span>
  //                           )}
  //                         </label>
  //                         {renderCaptureButton(
  //                           "aadhar_doc_back",
  //                           "Aadhaar Back"
  //                         )}
  //                         {errors.aadhar_doc_back && (
  //                           <p className="error">{errors.aadhar_doc_back}</p>
  //                         )}
  //                       </div>
  //                       <div className="mb-3">
  //                         <label className="form-label">
  //                           PAN <span className="error">*</span>
  //                           {kycdata?.success && (
  //                             <span className="ps-1">
  //                               <button
  //                                 type="button"
  //                                 className="bg-transparent border-0"
  //                                 onClick={() =>
  //                                   onClickImage(kycdata.data?.pan_doc_front)
  //                                 }
  //                               >
  //                                 <img alt="showIcon" src={showIcon} />
  //                               </button>
  //                             </span>
  //                           )}
  //                         </label>
  //                         {renderCaptureButton("pan_doc_front", "PAN")}
  //                         {errors.pan_doc_front && (
  //                           <p className="error">{errors.pan_doc_front}</p>
  //                         )}
  //                       </div>
  //                     </>
  //                   )}
  //                   {!isCountryCodeIndia && (
  //                     <>
  //                       <div className="mb-3">
  //                         <label htmlFor="dl_doc_front" className="form-label">
  //                           Driving License Front{" "}
  //                           <span className="error">*</span>
  //                           {kycdata?.success && (
  //                             <span className="ps-1">
  //                               <button
  //                                 type="button"
  //                                 className="bg-transparent border-0"
  //                                 onClick={() =>
  //                                   onClickImage(kycdata.data?.dl_doc_front)
  //                                 }
  //                               >
  //                                 <img alt="showIcon" src={showIcon} />
  //                               </button>
  //                             </span>
  //                           )}
  //                         </label>
  //                         <input
  //                           type="file"
  //                           accept=".jpg,.jpeg,.png"
  //                           className="form-control shadow-none bg-transparent"
  //                           name="dl_doc_front"
  //                           onChange={handleChange}
  //                           disabled={isFieldDisabled()}
  //                         />
  //                         {errors.dl_doc_front && (
  //                           <p className="error">{errors.dl_doc_front}</p>
  //                         )}
  //                       </div>
  //                       <div className="mb-3">
  //                         <label htmlFor="dl_doc_back" className="form-label">
  //                           Driving License Back{" "}
  //                           <span className="error">*</span>
  //                           {kycdata?.success && (
  //                             <span className="ps-1">
  //                               <button
  //                                 type="button"
  //                                 className="bg-transparent border-0"
  //                                 onClick={() =>
  //                                   onClickImage(kycdata.data?.dl_doc_back)
  //                                 }
  //                               >
  //                                 <img alt="showIcon" src={showIcon} />
  //                               </button>
  //                             </span>
  //                           )}
  //                         </label>
  //                         <input
  //                           type="file"
  //                           accept=".jpg,.jpeg,.png"
  //                           className="form-control shadow-none bg-transparent"
  //                           name="dl_doc_back"
  //                           onChange={handleChange}
  //                           disabled={isFieldDisabled()}
  //                         />
  //                         {errors.dl_doc_back && (
  //                           <p className="error">{errors.dl_doc_back}</p>
  //                         )}
  //                       </div>
  //                       <div className="mb-3">
  //                         <label
  //                           htmlFor="passport_doc_front"
  //                           className="form-label"
  //                         >
  //                           Passport Front <span className="error">*</span>
  //                           {kycdata?.success && (
  //                             <span className="ps-1">
  //                               <button
  //                                 type="button"
  //                                 className="bg-transparent border-0"
  //                                 onClick={() =>
  //                                   onClickImage(
  //                                     kycdata.data?.passport_doc_front
  //                                   )
  //                                 }
  //                               >
  //                                 <img alt="showIcon" src={showIcon} />
  //                               </button>
  //                             </span>
  //                           )}
  //                         </label>
  //                         <input
  //                           type="file"
  //                           accept=".jpg,.jpeg,.png"
  //                           className="form-control shadow-none bg-transparent"
  //                           name="passport_doc_front"
  //                           onChange={handleChange}
  //                           disabled={isFieldDisabled()}
  //                         />
  //                         {errors.passport_doc_front && (
  //                           <p className="error">{errors.passport_doc_front}</p>
  //                         )}
  //                       </div>
  //                       <div className="mb-3">
  //                         <label
  //                           htmlFor="passport_doc_back"
  //                           className="form-label"
  //                         >
  //                           Passport Back <span className="error">*</span>
  //                           {kycdata?.success && (
  //                             <span className="ps-1">
  //                               <button
  //                                 type="button"
  //                                 className="bg-transparent border-0"
  //                                 onClick={() =>
  //                                   onClickImage(
  //                                     kycdata.data?.passport_doc_back
  //                                   )
  //                                 }
  //                               >
  //                                 <img alt="showIcon" src={showIcon} />
  //                               </button>
  //                             </span>
  //                           )}
  //                         </label>
  //                         <input
  //                           type="file"
  //                           accept=".jpg,.jpeg,.png"
  //                           className="form-control shadow-none bg-transparent"
  //                           name="passport_doc_back"
  //                           onChange={handleChange}
  //                           disabled={isFieldDisabled()}
  //                         />
  //                         {errors.passport_doc_back && (
  //                           <p className="error">{errors.passport_doc_back}</p>
  //                         )}
  //                       </div>
  //                     </>
  //                   )}
  //                   {isCountryCodeIndia && (
  //                     <div className="mb-3">
  //                       <label htmlFor="panNumber" className="form-label">
  //                         PAN Number <span className="error">*</span>
  //                       </label>
  //                       <input
  //                         type="text"
  //                         className="form-control shadow-none bg-transparent"
  //                         name="panNumber"
  //                         placeholder="Enter PAN number"
  //                         // value={formData.panNumber}
  //                         value={
  //                           formData.panNumber
  //                             ? "*".repeat(formData.panNumber.length - 2) +
  //                               formData.panNumber.slice(-2)
  //                             : ""
  //                         }
  //                         onChange={handleChange}
  //                         disabled={isFieldDisabled() || disableFieldsAfterKYC}
  //                       />
  //                       {errors.panNumber && (
  //                         <p className="error">{errors.panNumber}</p>
  //                       )}
  //                     </div>
  //                   )}
  //                 </div>

  //                 <div className="col-12 col-md-4">
  //                   <h6 className="m-0 text-white mainTitles pb-2">
  //                     Bank Details
  //                   </h6>
  //                   {isCountryCodeIndia && (
  //                     <div className="mb-3">
  //                       <label htmlFor="upi_id" className="form-label">
  //                         UPI Number
  //                       </label>
  //                       <input
  //                         type="text"
  //                         autoComplete="off"
  //                         className="form-control shadow-none bg-transparent"
  //                         name="upi_id"
  //                         placeholder="Enter UPI number"
  //                         value={formData.upi_id}
  //                         onChange={handleChange}
  //                         disabled={isFieldDisabled()}
  //                       />
  //                       {errors.upi_id && (
  //                         <p className="error">{errors.upi_id}</p>
  //                       )}
  //                     </div>
  //                   )}
  //                   <div className="mb-3">
  //                     <label htmlFor="bank_account" className="form-label">
  //                       Bank Account Number <span className="error">*</span>
  //                     </label>
  //                     <input
  //                       type="text"
  //                       autoComplete="off"
  //                       className="form-control shadow-none bg-transparent"
  //                       name="bank_account"
  //                       placeholder="Enter bank account number"
  //                       value={formData.bank_account}
  //                       onChange={handleChange}
  //                       disabled={isFieldDisabled()}
  //                       onKeyPress={(event) => {
  //                         if (!/[0-9]/.test(event.key)) event.preventDefault();
  //                       }}
  //                     />
  //                     {errors.bank_account && (
  //                       <p className="error">{errors.bank_account}</p>
  //                     )}
  //                   </div>
  //                   <div className="mb-3">
  //                     <label htmlFor="bank_name" className="form-label">
  //                       Bank Name <span className="error">*</span>
  //                     </label>
  //                     <input
  //                       type="text"
  //                       autoComplete="off"
  //                       className="form-control shadow-none bg-transparent"
  //                       name="bank_name"
  //                       placeholder="Enter bank name"
  //                       value={formData.bank_name}
  //                       onChange={handleChange}
  //                       disabled={isFieldDisabled()}
  //                     />
  //                     {errors.bank_name && (
  //                       <p className="error">{errors.bank_name}</p>
  //                     )}
  //                   </div>
  //                   <div className="mb-4">
  //                     <label htmlFor="ifsc_code" className="form-label">
  //                       Bank {isCountryCodeIndia && "IFSC"} Code{" "}
  //                       <span className="error">*</span>
  //                     </label>
  //                     <input
  //                       type="text"
  //                       autoComplete="off"
  //                       className="form-control shadow-none bg-transparent"
  //                       name="ifsc_code"
  //                       placeholder="Enter bank code"
  //                       value={formData.ifsc_code}
  //                       onChange={handleChange}
  //                       disabled={isFieldDisabled()}
  //                     />
  //                     {errors.ifsc_code && (
  //                       <p className="error">{errors.ifsc_code}</p>
  //                     )}
  //                   </div>
  //                 </div>
  //               </form>
  //               <div className="row justify-content-end">
  //                 {kycdata?.success !== 1 && (
  //                   <div className="col-12 col-md-4">
  //                     <div className="submit_btn text-end">
  //                       <button
  //                         type="button"
  //                         className={`border-0 revolutionBtn ${
  //                           isCountryCodeIndia && !allDocsVerified
  //                             ? "opacity-50"
  //                             : ""
  //                         }`}
  //                         onClick={handleSubmit}
  //                         disabled={isCountryCodeIndia && !allDocsVerified}
  //                         title={
  //                           isCountryCodeIndia && !allDocsVerified
  //                             ? "Please ensure all documents are captured and at least one is verified"
  //                             : "Submit KYC"
  //                         }
  //                       >
  //                         {isCountryCodeIndia && !allDocsVerified
  //                           ? "Verify Documents First"
  //                           : "Submit"}
  //                       </button>
  //                     </div>
  //                   </div>
  //                 )}
  //                 {(kycdata?.data?.status === "reject" ||
  //                   (kycdata?.data?.status === "approve" && isEditClicked)) && (
  //                   <div className="col-12 col-md-4">
  //                     <div className="submit_btn text-end">
  //                       <button
  //                         type="button"
  //                         className={`border-0 revolutionBtn w-100 ${
  //                           isCountryCodeIndia && !allDocsVerified
  //                             ? "opacity-50"
  //                             : ""
  //                         }`}
  //                         onClick={handleSubmit}
  //                         disabled={isCountryCodeIndia && !allDocsVerified}
  //                         title={
  //                           isCountryCodeIndia && !allDocsVerified
  //                             ? "Please ensure all documents are captured and at least one is verified"
  //                             : "Update KYC"
  //                         }
  //                       >
  //                         {isCountryCodeIndia && !allDocsVerified
  //                           ? "Verify Documents First"
  //                           : "Update"}
  //                       </button>
  //                     </div>
  //                   </div>
  //                 )}
  //               </div>
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //     </section>
  //     <CameraCapture
  //       isOpen={showCamera}
  //       onClose={() => setShowCamera(false)}
  //       onCapture={handleCameraCapture}
  //       docType={currentDocType}
  //       title={getDocumentTitle(currentDocType)}
  //     />
  //     {showModal && (
  //       <DigiLockerModal
  //         show={showModal}
  //         onHide={() => setShowModal(false)}
  //         onClickDigiLocker={handleButtonClick}
  //       />
  //     )}
  //     {(isLoading || loading) && <Loader />}
  //   </>
  // );


  // return (
  //   <>
  //     <section className="py-8 bg-gradient-to-br from-gray-900 to-gray-800 min-h-screen">
  //       <div className="container mx-auto px-4">
  //         <div className="w-full">
  //           <div className="bg-gray-800 rounded-lg py-8 px-6 shadow-2xl">
  //             <div className="flex justify-between items-center pb-4 border-b border-gray-700 mb-6">
  //               <div className="flex items-center gap-4">
  //                 <h1 className="text-white text-2xl font-bold m-0">
  //                   KYC Information
  //                 </h1>
  //                 {kycdata?.data?.status !== "approve" && (
  //                   <p className="text-white text-sm opacity-80">
  //                     (Fill up information and verify your KYC.)
  //                   </p>
  //                 )}
  //               </div>
  //               <div className="flex items-center gap-4">
  //                 <h6 className="text-white text-sm">
  //                   Country: <span className="ml-2 font-semibold">{userData?.data?.country || getCountryName()}</span>
  //                 </h6>
  //                 {isCountryCodeIndia &&
  //                   ((kycdata?.data?.status !== "open" && kycdata?.data?.status !== "approve") ||
  //                     (kycdata?.data?.status === "approve" && isEditClicked)) && (
  //                     <button
  //                       type="button"
  //                       className="bg-transparent border-0 p-2 hover:bg-gray-700 rounded"
  //                       onClick={handleButtonClick}
  //                     >
  //                       <img src={digiLocker} alt="digiLockerIcon" className="w-8 h-8" />
  //                     </button>
  //                   )}
  //               </div>
  //             </div>

  //             {renderVerificationStatus()}

  //             <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
  //               {/* Applicant Info */}
  //               <div className="space-y-6">
  //                 <h6 className="text-white text-lg font-semibold pb-2 border-b border-gray-600">
  //                   Applicant Info
  //                 </h6>

  //                 {/* Status and Edit */}
  //                 <div className="flex flex-wrap justify-between pb-4">
  //                   <div className="flex items-center gap-4">
  //                     {kycdata?.data?.status === "approve" && (
  //                       <button
  //                         type="button"
  //                         className="bg-transparent border-0 p-1 hover:bg-gray-700 rounded"
  //                         onClick={onClickEdit}
  //                       >
  //                         <img alt="edit" src="/edit-icon.png" className="w-5 h-5" />
  //                       </button>
  //                     )}
  //                     <p className="text-white text-sm">
  //                       KYC status:{' '}
  //                       <span className={`capitalize font-bold ${getStatusColor(kycdata?.data?.status)}`}>
  //                         {kycdata?.data?.status || "N/A"}
  //                       </span>
  //                     </p>
  //                     {kycdata?.data?.status === "reject" && (
  //                       <p className="text-white text-sm">
  //                         Reason:{' '}
  //                         <span className="text-red-500 font-bold">
  //                           {kycdata?.data?.reason}
  //                         </span>
  //                       </p>
  //                     )}
  //                   </div>
  //                 </div>

  //                 {/* Profile Picture */}
  //                 <div className="space-y-3">
  //                   <label className="block text-white text-sm font-medium">
  //                     Profile Picture <span className="text-red-500">*</span>
  //                   </label>
  //                   <CaptureButton docType="profile_picture" displayName="Selfie" />
  //                   {capturedProfilePicture && (
  //                     <div className="mt-3">
  //                       <img
  //                         src={`data:image/jpeg;base64,${capturedProfilePicture.imageBase64}`}
  //                         alt="Profile"
  //                         className="w-24 h-24 object-cover rounded-lg border-2 border-green-500"
  //                       />
  //                     </div>
  //                   )}
  //                   {errors.profile_picture && (
  //                     <p className="text-red-500 text-sm">{errors.profile_picture}</p>
  //                   )}
  //                 </div>

  //                 {/* Name */}
  //                 <div className="space-y-3">
  //                   <label htmlFor="applicantName" className="block text-white text-sm font-medium">
  //                     Name of the Applicant <span className="text-red-500">*</span>
  //                   </label>
  //                   <input
  //                     type="text"
  //                     className="w-full px-3 py-2 bg-transparent border border-gray-600 rounded text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
  //                     name="applicantName"
  //                     value={formData.applicantName || ''}
  //                     onChange={handleChange}
  //                     disabled={isFieldDisabled()}
  //                   />
  //                   {errors.applicantName && (
  //                     <p className="text-red-500 text-sm">{errors.applicantName}</p>
  //                   )}
  //                 </div>

  //                 {/* Date of Birth - India only */}
  //                 {isCountryCodeIndia && (
  //                   <div className="space-y-3">
  //                     <label htmlFor="dob" className="block text-white text-sm font-medium">
  //                       Date of Birth <span className="text-red-500">*</span>
  //                     </label>
  //                     <input
  //                       type="text"
  //                       className="w-full px-3 py-2 bg-transparent border border-gray-600 rounded text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
  //                       placeholder="Date of Birth"
  //                       name="dob"
  //                       value={formData.dob ? "*".repeat(formData.dob.length - 2) + formData.dob.slice(-2) : ""}
  //                       disabled
  //                       readOnly
  //                     />
  //                     {errors.dob && <p className="text-red-500 text-sm">{errors.dob}</p>}
  //                   </div>
  //                 )}

  //                 {/* Mobile Number */}
  //                 <div className="space-y-3">
  //                   <label htmlFor="mobile_number" className="block text-white text-sm font-medium">
  //                     Mobile Number (As per Bank) <span className="text-red-500">*</span>
  //                   </label>
  //                   <input
  //                     type="text"
  //                     className="w-full px-3 py-2 bg-transparent border border-gray-600 rounded text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
  //                     name="mobile_number"
  //                     placeholder="Enter mobile number"
  //                     value={formData.mobile_number ? "*".repeat(formData.mobile_number.length - 2) + formData.mobile_number.slice(-2) : ""}
  //                     maxLength={getMaxLength()}
  //                     disabled={isFieldDisabled()}
  //                     onChange={handleChangeMobileNumber}
  //                     onKeyPress={(event) => {
  //                       if (!/[0-9]/.test(event.key)) event.preventDefault();
  //                     }}
  //                     autoComplete="off"
  //                   />
  //                   {errors.mobile_number && (
  //                     <p className="text-red-500 text-sm">{errors.mobile_number}</p>
  //                   )}
  //                 </div>

  //                 {/* Address */}
  //                 <div className="space-y-3">
  //                   <label htmlFor="address" className="block text-white text-sm font-medium">
  //                     Address <span className="text-red-500">*</span>
  //                   </label>
  //                   <input
  //                     type="text"
  //                     autoComplete="off"
  //                     className="w-full px-3 py-2 bg-transparent border border-gray-600 rounded text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
  //                     name="address"
  //                     placeholder="Enter your address"
  //                     value={formData.address || ''}
  //                     onChange={handleChange}
  //                     disabled={isFieldDisabled()}
  //                   />
  //                   {errors.address && (
  //                     <p className="text-red-500 text-sm">{errors.address}</p>
  //                   )}
  //                 </div>
  //               </div>

  //               {/* Applicant Proofs */}
  //               <div className="space-y-6">
  //                 <h6 className="text-white text-lg font-semibold pb-2 border-b border-gray-600">
  //                   Applicant Proofs
  //                 </h6>

  //                 {isCountryCodeIndia ? (
  //                   <>
  //                     {/* Aadhaar Front */}
  //                     <div className="space-y-3">
  //                       <label className="block text-white text-sm font-medium">
  //                         Aadhaar Front <span className="text-red-500">*</span>
  //                         {kycdata?.success && (
  //                           <button
  //                             type="button"
  //                             className="ml-2 bg-transparent border-0 p-1 hover:bg-gray-700 rounded"
  //                             onClick={() => onClickImage(kycdata.data?.aadhar_doc_front)}
  //                           >
  //                             <img alt="showIcon" src="/show-icon.png" className="w-4 h-4" />
  //                           </button>
  //                         )}
  //                       </label>
  //                       <CaptureButton docType="aadhar_doc_front" displayName="Aadhaar Front" />
  //                       {errors.aadhar_doc_front && (
  //                         <p className="text-red-500 text-sm">{errors.aadhar_doc_front}</p>
  //                       )}
  //                     </div>

  //                     {/* Aadhaar Back */}
  //                     <div className="space-y-3">
  //                       <label className="block text-white text-sm font-medium">
  //                         Aadhaar Back <span className="text-red-500">*</span>
  //                         {kycdata?.success && (
  //                           <button
  //                             type="button"
  //                             className="ml-2 bg-transparent border-0 p-1 hover:bg-gray-700 rounded"
  //                             onClick={() => onClickImage(kycdata.data?.aadhar_doc_back)}
  //                           >
  //                             <img alt="showIcon" src="/show-icon.png" className="w-4 h-4" />
  //                           </button>
  //                         )}
  //                       </label>
  //                       <CaptureButton docType="aadhar_doc_back" displayName="Aadhaar Back" />
  //                       {errors.aadhar_doc_back && (
  //                         <p className="text-red-500 text-sm">{errors.aadhar_doc_back}</p>
  //                       )}
  //                     </div>

  //                     {/* PAN */}
  //                     <div className="space-y-3">
  //                       <label className="block text-white text-sm font-medium">
  //                         PAN <span className="text-red-500">*</span>
  //                         {kycdata?.success && (
  //                           <button
  //                             type="button"
  //                             className="ml-2 bg-transparent border-0 p-1 hover:bg-gray-700 rounded"
  //                             onClick={() => onClickImage(kycdata.data?.pan_doc_front)}
  //                           >
  //                             <img alt="showIcon" src="/show-icon.png" className="w-4 h-4" />
  //                           </button>
  //                         )}
  //                       </label>
  //                       <CaptureButton docType="pan_doc_front" displayName="PAN" />
  //                       {errors.pan_doc_front && (
  //                         <p className="text-red-500 text-sm">{errors.pan_doc_front}</p>
  //                       )}
  //                     </div>

  //                     {/* PAN Number */}
  //                     <div className="space-y-3">
  //                       <label htmlFor="panNumber" className="block text-white text-sm font-medium">
  //                         PAN Number <span className="text-red-500">*</span>
  //                       </label>
  //                       <input
  //                         type="text"
  //                         className="w-full px-3 py-2 bg-transparent border border-gray-600 rounded text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
  //                         name="panNumber"
  //                         placeholder="Enter PAN number"
  //                         value={formData.panNumber ? "*".repeat(formData.panNumber.length - 2) + formData.panNumber.slice(-2) : ""}
  //                         onChange={handleChange}
  //                         disabled={isFieldDisabled() || disableFieldsAfterKYC}
  //                       />
  //                       {errors.panNumber && (
  //                         <p className="text-red-500 text-sm">{errors.panNumber}</p>
  //                       )}
  //                     </div>
  //                   </>
  //                 ) : (
  //                   <>
  //                     {/* International Documents */}
  //                     <div className="space-y-6">
  //                       {/* Driving License Front */}
  //                       <div className="space-y-3">
  //                         <label htmlFor="dl_doc_front" className="block text-white text-sm font-medium">
  //                           Driving License Front <span className="text-red-500">*</span>
  //                           {kycdata?.success && (
  //                             <button
  //                               type="button"
  //                               className="ml-2 bg-transparent border-0 p-1 hover:bg-gray-700 rounded"
  //                               onClick={() => onClickImage(kycdata.data?.dl_doc_front)}
  //                             >
  //                               <img alt="showIcon" src="/show-icon.png" className="w-4 h-4" />
  //                             </button>
  //                           )}
  //                         </label>
  //                         <input
  //                           type="file"
  //                           accept=".jpg,.jpeg,.png"
  //                           className="w-full px-3 py-2 bg-transparent border border-gray-600 rounded text-white file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
  //                           name="dl_doc_front"
  //                           onChange={handleChange}
  //                           disabled={isFieldDisabled()}
  //                         />
  //                         {errors.dl_doc_front && (
  //                           <p className="text-red-500 text-sm">{errors.dl_doc_front}</p>
  //                         )}
  //                       </div>

  //                       {/* Similar structure for other international documents */}
  //                       {/* Driving License Back, Passport Front, Passport Back */}
  //                     </div>
  //                   </>
  //                 )}
  //               </div>

  //               {/* Bank Details */}
  //               <div className="space-y-6">
  //                 <h6 className="text-white text-lg font-semibold pb-2 border-b border-gray-600">
  //                   Bank Details
  //                 </h6>

  //                 {/* UPI - India only */}
  //                 {isCountryCodeIndia && (
  //                   <div className="space-y-3">
  //                     <label htmlFor="upi_id" className="block text-white text-sm font-medium">
  //                       UPI Number
  //                     </label>
  //                     <input
  //                       type="text"
  //                       autoComplete="off"
  //                       className="w-full px-3 py-2 bg-transparent border border-gray-600 rounded text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
  //                       name="upi_id"
  //                       placeholder="Enter UPI number"
  //                       value={formData.upi_id || ''}
  //                       onChange={handleChange}
  //                       disabled={isFieldDisabled()}
  //                     />
  //                     {errors.upi_id && (
  //                       <p className="text-red-500 text-sm">{errors.upi_id}</p>
  //                     )}
  //                   </div>
  //                 )}

  //                 {/* Bank Account Number */}
  //                 <div className="space-y-3">
  //                   <label htmlFor="bank_account" className="block text-white text-sm font-medium">
  //                     Bank Account Number <span className="text-red-500">*</span>
  //                   </label>
  //                   <input
  //                     type="text"
  //                     autoComplete="off"
  //                     className="w-full px-3 py-2 bg-transparent border border-gray-600 rounded text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
  //                     name="bank_account"
  //                     placeholder="Enter bank account number"
  //                     value={formData.bank_account || ''}
  //                     onChange={handleChange}
  //                     disabled={isFieldDisabled()}
  //                     onKeyPress={(event) => {
  //                       if (!/[0-9]/.test(event.key)) event.preventDefault();
  //                     }}
  //                   />
  //                   {errors.bank_account && (
  //                     <p className="text-red-500 text-sm">{errors.bank_account}</p>
  //                   )}
  //                 </div>

  //                 {/* Bank Name */}
  //                 <div className="space-y-3">
  //                   <label htmlFor="bank_name" className="block text-white text-sm font-medium">
  //                     Bank Name <span className="text-red-500">*</span>
  //                   </label>
  //                   <input
  //                     type="text"
  //                     autoComplete="off"
  //                     className="w-full px-3 py-2 bg-transparent border border-gray-600 rounded text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
  //                     name="bank_name"
  //                     placeholder="Enter bank name"
  //                     value={formData.bank_name || ''}
  //                     onChange={handleChange}
  //                     disabled={isFieldDisabled()}
  //                   />
  //                   {errors.bank_name && (
  //                     <p className="text-red-500 text-sm">{errors.bank_name}</p>
  //                   )}
  //                 </div>

  //                 {/* IFSC Code */}
  //                 <div className="space-y-3">
  //                   <label htmlFor="ifsc_code" className="block text-white text-sm font-medium">
  //                     Bank {isCountryCodeIndia && "IFSC"} Code <span className="text-red-500">*</span>
  //                   </label>
  //                   <input
  //                     type="text"
  //                     autoComplete="off"
  //                     className="w-full px-3 py-2 bg-transparent border border-gray-600 rounded text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
  //                     name="ifsc_code"
  //                     placeholder="Enter bank code"
  //                     value={formData.ifsc_code || ''}
  //                     onChange={handleChange}
  //                     disabled={isFieldDisabled()}
  //                   />
  //                   {errors.ifsc_code && (
  //                     <p className="text-red-500 text-sm">{errors.ifsc_code}</p>
  //                   )}
  //                 </div>
  //               </div>
  //             </div>

  //             {/* Submit Buttons */}
  //             <div className="flex justify-end mt-8">
  //               {kycdata?.success !== 1 && (
  //                 <div className="w-full md:w-auto">
  //                   <button
  //                     type="button"
  //                     className={`w-full md:w-auto px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg shadow-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 ${isCountryCodeIndia && !allDocsVerified ? "opacity-50 cursor-not-allowed" : ""
  //                       }`}
  //                     onClick={handleSubmit}
  //                     disabled={isCountryCodeIndia && !allDocsVerified}
  //                     title={
  //                       isCountryCodeIndia && !allDocsVerified
  //                         ? "Please ensure all documents are captured and at least one is verified"
  //                         : "Submit KYC"
  //                     }
  //                   >
  //                     {isCountryCodeIndia && !allDocsVerified ? "Verify Documents First" : "Submit"}
  //                   </button>
  //                 </div>
  //               )}
  //               {(kycdata?.data?.status === "reject" || (kycdata?.data?.status === "approve" && isEditClicked)) && (
  //                 <div className="w-full md:w-auto">
  //                   <button
  //                     type="button"
  //                     className={`w-full px-8 py-3 bg-gradient-to-r from-green-600 to-teal-600 text-white font-semibold rounded-lg shadow-lg hover:from-green-700 hover:to-teal-700 transition-all duration-300 ${isCountryCodeIndia && !allDocsVerified ? "opacity-50 cursor-not-allowed" : ""
  //                       }`}
  //                     onClick={handleSubmit}
  //                     disabled={isCountryCodeIndia && !allDocsVerified}
  //                     title={
  //                       isCountryCodeIndia && !allDocsVerified
  //                         ? "Please ensure all documents are captured and at least one is verified"
  //                         : "Update KYC"
  //                     }
  //                   >
  //                     {isCountryCodeIndia && !allDocsVerified ? "Verify Documents First" : "Update"}
  //                   </button>
  //                 </div>
  //               )}
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //     </section>

  //     {/* Modals and Components */}
  //     {/* Note: These would need to be converted to Tailwind as well */}
  //     {/* CameraCapture Modal */}

  //     <CameraCapture
  //       isOpen={showCamera}
  //       onClose={() => setShowCamera(false)}
  //       onCapture={handleCameraCapture}
  //       docType={currentDocType}
  //       title={getDocumentTitle(currentDocType)}
  //     />
  //     {showModal && (
  //       <DigiLockerModal
  //         show={showModal}
  //         onHide={() => setShowModal(false)}
  //         onClickDigiLocker={handleButtonClick}
  //       />
  //     )}
  //     {(isLoading || loading) && <Loader />}
  //   </>
  // );
};

export default KycInformation;

