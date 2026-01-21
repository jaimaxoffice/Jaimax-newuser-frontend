import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "../../../../ReusableComponents/Toasts/Toasts";
import digiLocker from "../../../../assets/digiLocker.webp";
import editIcon from "../../../../assets/square-pen.svg";
import showIcon from "../../../../assets/showIcon.svg";
import countryCodes from "../../../../Authentication/countryCodes.json";
import { useUserDataQuery } from "../dashBoard/DashboardApliSlice";
import CryptoJS from "crypto-js";
import BankDetailsModal from "./BankDetailsModal";
import AadhaarVerificationModal from "./AadhaarVerificationModal";
import LivePhotoModal from "./LivePhotoModal";
import {
  useGetKycDataMutation,
  useGetkycDetailsQuery,
  useKycaddMutation,
  useUpdateBankDetailsMutation,
} from "./kycApiSlice";
import Loader from "../../../../ReusableComponents/Loader/loader";

const KycInformation = () => {
  const { data: userData } = useUserDataQuery();
  const isCountryCodeIndia = userData && userData?.data?.countryCode === 91;
  const [submitKyc] = useKycaddMutation();
  const [getKycData] = useGetKycDataMutation();
  const [updateBankDetails] = useUpdateBankDetailsMutation();
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const [focusedInput, setFocusedInput] = useState(null);

  // Step Management
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState({
    step1: false,
    step2: false,
    step3: false,
    step4: false,
  });

  // DigiLocker States
  const [digilockerData, setDigilockerData] = useState(null);
  const [digilockerName, setDigilockerName] = useState("");
  const [digilockerDob, setDigilockerDob] = useState("");

  // Aadhaar Verification States
  const [showAadhaarModal, setShowAadhaarModal] = useState(false);
  const [aadhaarVerified, setAadhaarVerified] = useState(false);
  const [aadhaarVerificationData, setAadhaarVerificationData] = useState(null);

  // Live Photo States
  const [showLivePhotoModal, setShowLivePhotoModal] = useState(false);
  const [livePhoto, setLivePhoto] = useState(null);
  const [livePhotoPreview, setLivePhotoPreview] = useState(null);

  // Bank Modal
  const [showBankModal, setShowBankModal] = useState(false);

  // Image previews
  const [previewImages, setPreviewImages] = useState({
    doc_front: null,
    doc_back: null,
    doc1_front: null,
    doc1_back: null,
  });

  const [formData, setFormData] = useState({
    aadhar_doc_front: null,
    aadhar_doc_back: null,
    pan_doc_front: null,
    dl_doc_front: null,
    dl_doc_back: null,
    passport_doc_front: null,
    passport_doc_back: null,
    bank_name: "",
    applicantName: userData?.data?.name || "",
    ifsc_code: "",
    mobile_number: `+${userData?.data?.countryCode || "91"} `,
    upi_id: "",
    bank_account: "",
    address: "",
    dob: "",
    panNumber: "",
  });

  const { data: kycdata, isLoading, refetch } = useGetkycDetailsQuery();

  const docFrontRef = useRef(null);
  const doc1FrontRef = useRef(null);
  const docBackRef = useRef(null);
  const doc1BackRef = useRef(null);

  // Step Configuration
  const steps = [
    { id: 1, title: "DigiLocker Verification", shortTitle: "DigiLocker", icon: "lock" },
    { id: 2, title: "Aadhaar Verification", shortTitle: "Aadhaar", icon: "shield" },
    { id: 3, title: "Documents & Profile", shortTitle: "Documents", icon: "document" },
    { id: 4, title: "Bank Details", shortTitle: "Bank", icon: "bank" },
  ];

  // Helper Functions
  const maskData = (data = "", visibleStart = 2, visibleEnd = 2, maskChar = "•") => {
    const dataStr = String(data || "");
    if (!dataStr) return "";
    if (visibleStart === 0 && visibleEnd === 0) return maskChar.repeat(dataStr.length);
    if (dataStr.length <= visibleStart + visibleEnd) return dataStr;
    const maskedSection = maskChar.repeat(Math.max(0, dataStr.length - (visibleStart + visibleEnd)));
    const endPart = visibleEnd > 0 ? dataStr.slice(-visibleEnd) : "";
    return dataStr.slice(0, visibleStart) + maskedSection + endPart;
  };

  const toUpperCase = (text) => (text ? text.toUpperCase() : "");

  const getCountryName = () => {
    const countryCode = `+${userData?.data?.countryCode}`;
    const countryName = countryCodes.find((country) => country.country_code == countryCode);
    return countryName?.country_name || "NA";
  };

  const getMaxLength = () => (isCountryCodeIndia ? 14 : 19);

  const checkTextAfterPrefix = (input) => {
    let splitString = input.split(`+${userData?.data?.countryCode} `);
    return !splitString[1]?.trim().length > 0;
  };

  // Navigation Functions
  const goToStep = (step) => {
    if (step < currentStep || completedSteps[`step${step - 1}`] || step === 1) {
      setCurrentStep(step);
    }
  };

  const goToNextStep = () => {
    if (currentStep < 4) {
      setCompletedSteps((prev) => ({ ...prev, [`step${currentStep}`]: true }));
      setCurrentStep(currentStep + 1);
    }
  };

  const goToPreviousStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  // Step 1: DigiLocker Handler
  const handleDigiLockerClick = async () => {
    setLoading(true);
    setErrors({});

    try {
      const generateCodeVerifier = async () => {
        const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~";
        const length = Math.floor(Math.random() * (128 - 43 + 1)) + 43;
        let verifier = "";
        for (let i = 0; i < length; i++) {
          verifier += characters[Math.floor(Math.random() * characters.length)];
        }
        return verifier;
      };

      const generateCodeChallenge = (verifier) => {
        const hash = CryptoJS.SHA256(verifier);
        return CryptoJS.enc.Base64.stringify(hash).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
      };

      const verifier = await generateCodeVerifier();
      localStorage.removeItem("processed");
      const challenge = await generateCodeChallenge(verifier);
      let origin = window.location.origin;
      let redirectURI, clientId;

      if (origin && (origin.includes("5173") || origin.includes("5174"))) {
        redirectURI = import.meta.env.VITE_DL_REDIRECT_URI_DEV;
        clientId = import.meta.env.VITE_DL_CLIENT_ID_DEV;
      } else if (origin === "https://www.jaimax.com") {
        redirectURI = import.meta.env.VITE_DL_REDIRECT_URI_PROD;
        clientId = import.meta.env.VITE_DL_CLIENT_ID_PROD;
      } else {
        redirectURI = import.meta.env.VITE_DL_REDIRECT_URI_QA;
        clientId = import.meta.env.VITE_DL_CLIENT_ID_QA;
      }

      localStorage.setItem("verifier", verifier);
      const apiUrl = `https://digilocker.meripehchaan.gov.in/public/oauth2/1/authorize?response_type=code&client_id=${clientId}&state=oidc_flow&redirect_uri=${redirectURI}&code_challenge=${challenge}&code_challenge_method=S256&dl_flow=signin&acr=pan+aadhaar+mobile&amr=pan+all+aadhaar&scope=files.issueddocs+files.uploadeddocs&pla=Y`;
      window.open(apiUrl, "_self");
    } catch (err) {
      toast.error("Failed to connect to DigiLocker", { position: "top-center" });
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Aadhaar Handlers
  const handleAadhaarVerificationSuccess = (data) => {
    setAadhaarVerified(true);
    setAadhaarVerificationData(data);
    setShowAadhaarModal(false);
    setCompletedSteps((prev) => ({ ...prev, step2: true }));
    toast.success("Aadhaar verified successfully!", { position: "top-center" });
    setCurrentStep(3);
  };

  const handleSkipAadhaarVerification = () => {
    setShowAadhaarModal(false);
    setCompletedSteps((prev) => ({ ...prev, step2: true }));
    toast.info("Aadhaar verification skipped.", { position: "top-center" });
    setCurrentStep(3);
  };

  // Step 3: Live Photo Handler
  const handleLivePhotoCapture = (photoData) => {
    setLivePhoto(photoData.file);
    setLivePhotoPreview(photoData.dataUrl);
    setShowLivePhotoModal(false);
    toast.success("Photo captured successfully!", { position: "top-center" });
  };

  // Form Handlers
  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "ifsc_code" && !/^[a-zA-Z0-9]*$/.test(value)) return;
    if (name === "panNumber" && !/^[a-zA-Z0-9]*$/.test(value)) return;
    if (name === "upi_id" && !/^[a-zA-Z0-9@._-]*$/.test(value)) return;
    if (name === "bank_name" && !/^[a-zA-Z\s]*$/.test(value)) return;

    if (files) {
      const acceptedFormats = ["image/png", "image/jpeg", "image/jpg"];
      if (!acceptedFormats.includes(files[0].type)) {
        toast.warning("Only JPG / PNG files are allowed", { position: "top-center" });
        return;
      }
    }

    setFormData({ ...formData, [name]: files ? files[0] : value });
  };

  const handleChangeMobileNumber = (e) => {
    const { name, value } = e.target;
    if (value.startsWith(`+${userData?.data?.countryCode} `)) {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Validations
  const validateStep3 = () => {
    const newErrors = {};
    if (isCountryCodeIndia) {
      if (!formData.aadhar_doc_front && !kycdata?.data?.aadhar_doc_front)
        newErrors.aadhar_doc_front = "Aadhaar front is required";
      if (!formData.aadhar_doc_back && !kycdata?.data?.aadhar_doc_back)
        newErrors.aadhar_doc_back = "Aadhaar back is required";
      if (!formData.pan_doc_front && !kycdata?.data?.pan_doc_front)
        newErrors.pan_doc_front = "PAN card is required";
      if (!formData.panNumber && !kycdata?.data?.panNumber)
        newErrors.panNumber = "PAN number is required";
      if (!livePhoto && !kycdata?.data?.livePhoto)
        newErrors.livePhoto = "Live photo is required";
    } else {
      if (!formData.dl_doc_front) newErrors.dl_doc_front = "DL front is required";
      if (!formData.dl_doc_back) newErrors.dl_doc_back = "DL back is required";
      if (!formData.passport_doc_front) newErrors.passport_doc_front = "Passport front is required";
      if (!formData.passport_doc_back) newErrors.passport_doc_back = "Passport back is required";
    }
    if (!formData.address) newErrors.address = "Address is required";
    if (checkTextAfterPrefix(formData.mobile_number)) newErrors.mobile_number = "Mobile number is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep4 = () => {
    const newErrors = {};
    if (!formData.bank_name) newErrors.bank_name = "Bank name is required";
    if (!formData.ifsc_code) newErrors.ifsc_code = "Bank code is required";
    if (!formData.bank_account) newErrors.bank_account = "Account number is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleStep3Continue = () => {
    if (validateStep3()) {
      setCompletedSteps((prev) => ({ ...prev, step3: true }));
      setCurrentStep(4);
    }
  };

  // Submit Handler
  const handleSubmit = async () => {
    if (!validateStep4()) return;

    const data = new FormData();

    if (isCountryCodeIndia) {
      if (formData.aadhar_doc_front) data.append("aadhar_doc_front", formData.aadhar_doc_front);
      if (formData.aadhar_doc_back) data.append("aadhar_doc_back", formData.aadhar_doc_back);
      if (formData.pan_doc_front) data.append("pan_doc_front", formData.pan_doc_front);
      data.append("upi_id", formData.upi_id);
      data.append("panNumber", formData.panNumber);
      data.append("dob", formData.dob);
    } else {
      if (formData.dl_doc_front) data.append("dl_doc_front", formData.dl_doc_front);
      if (formData.dl_doc_back) data.append("dl_doc_back", formData.dl_doc_back);
      if (formData.passport_doc_front) data.append("passport_doc_front", formData.passport_doc_front);
      if (formData.passport_doc_back) data.append("passport_doc_back", formData.passport_doc_back);
    }

    if (livePhoto) data.append("live_photo", livePhoto);

    if (aadhaarVerificationData) {
      data.append("aadhaarVerified", "true");
      data.append("aadhaarTempId", aadhaarVerificationData.tempId || "");
      data.append("aadhaarNameMatched", aadhaarVerificationData.nameMatched ? "true" : "false");
      data.append("aadharNumber", aadhaarVerificationData.aadhaarNumber || "");
    }

    data.append("name", formData.applicantName);
    data.append("bank_name", formData.bank_name);
    data.append("ifsc_code", formData.ifsc_code);
    if (formData.mobile_number.startsWith(`+${userData?.data?.countryCode} `)) {
      data.append("mobile_number", formData.mobile_number.replace(`+${userData?.data?.countryCode} `, ""));
    }
    data.append("bank_account", formData.bank_account);
    data.append("address", formData.address);

    setLoading(true);
    try {
      const response = await submitKyc(data);
      if (response?.data?.status_code === 200) {
        toast.success(response?.data.message, { position: "top-center" });
        setCompletedSteps((prev) => ({ ...prev, step4: true }));
        refetch();
      } else {
        toast.error(response?.error?.data?.message, { position: "top-center" });
      }
    } catch (error) {
      toast.error(error.message, { position: "top-center" });
    } finally {
      setLoading(false);
    }
  };

  const handleBankDetailsUpdate = async (bankData) => {
    const data = new FormData();
    data.append("bank_name", bankData.bank_name);
    data.append("ifsc_code", bankData.ifsc_code);
    data.append("bank_account", bankData.bank_account);
    if (isCountryCodeIndia) {
      data.append("upi_id", bankData.upi_id || "");
    }

    setLoading(true);
    try {
      const response = await updateBankDetails(data).unwrap();
      if (response.status_code === 200) {
        toast.success(response.message || "Bank details updated", { position: "top-center" });
        refetch();
        setShowBankModal(false);
      } else {
        toast.error(response.message || "Failed to update", { position: "top-center" });
      }
    } catch (error) {
      toast.error(error.message || "An error occurred", { position: "top-center" });
    } finally {
      setLoading(false);
    }
  };

  const onClickImage = (imageURL) => {
    const link = document.createElement("a");
    link.href = imageURL;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.click();
  };

  // Effects
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const extractedCode = queryParams.get("code");
    const newUrl = window.location.protocol + "//" + window.location.host + window.location.pathname;
    window.history.replaceState(null, "", newUrl);

    if (extractedCode && !localStorage.getItem("processed")) {
      localStorage.setItem("processed", "true");
      const payload = { code: extractedCode, verifier: localStorage.getItem("verifier") };
      setLoading(true);

      const postTokenRequest = async () => {
        try {
          const response = await getKycData(payload).unwrap();
          if (response.data) {
            setDigilockerData(response.data);
            setDigilockerName(response.data.name);
            setDigilockerDob(response.data.dob);

            setFormData((prev) => ({
              ...prev,
              applicantName: response.data.name,
              mobile_number: `+91 ${response.data.mobile}`,
              address: response.data.address,
              dob: response.data.dob,
              panNumber: response.data.panNumber,
            }));

            setCompletedSteps((prev) => ({ ...prev, step1: true }));
            setCurrentStep(2);
            toast.success("DigiLocker connected successfully!", { position: "top-center" });
          }
        } catch (error) {
          toast.error("DigiLocker verification failed", { position: "top-center" });
        } finally {
          setLoading(false);
          localStorage.removeItem("code");
          localStorage.removeItem("verifier");
        }
      };
      postTokenRequest();
    }
  }, []);

  useEffect(() => {
    refetch();
  }, []);

  useEffect(() => {
    if (kycdata?.success == 1) {
      setCompletedSteps({ step1: true, step2: true, step3: true, step4: true });
      if (kycdata?.data?.livePhoto) setLivePhotoPreview(kycdata.data.livePhoto);

      setFormData({
        aadhar_doc_front: kycdata?.data?.aadhar_doc_front || null,
        aadhar_doc_back: kycdata?.data?.aadhar_doc_back || null,
        pan_doc_front: kycdata?.data?.pan_doc_front || null,
        dl_doc_front: kycdata?.data?.dl_doc_front || null,
        dl_doc_back: kycdata?.data?.dl_doc_back || null,
        passport_doc_front: kycdata?.data?.passport_doc_front || null,
        passport_doc_back: kycdata?.data?.passport_doc_back || null,
        bank_name: kycdata?.data?.bank_name || "",
        ifsc_code: kycdata?.data?.ifsc_code || "",
        applicantName: kycdata?.data.name || userData?.data?.name,
        mobile_number: `+${userData?.data?.countryCode} ${kycdata?.data?.mobile_number}` || "",
        upi_id: kycdata?.data?.upi_id || "",
        bank_account: kycdata?.data?.bank_account || "",
        address: kycdata?.data?.address || "",
        dob: kycdata?.data.dob || "",
        panNumber: kycdata?.data.panNumber || "",
      });

      setPreviewImages({
        doc_front: isCountryCodeIndia ? kycdata?.data?.aadhar_doc_front : kycdata?.data?.dl_doc_front,
        doc_back: isCountryCodeIndia ? kycdata?.data?.aadhar_doc_back : kycdata?.data?.dl_doc_back,
        doc1_front: isCountryCodeIndia ? kycdata?.data?.pan_doc_front : kycdata?.data?.passport_doc_front,
        doc1_back: !isCountryCodeIndia ? kycdata?.data?.passport_doc_back : null,
      });
    }
  }, [userData, kycdata]);

  // Icon Component
  const StepIcon = ({ type, isCompleted, isCurrent }) => {
    const baseClass = "w-5 h-5";
    
    if (isCompleted) {
      return (
        <svg className={baseClass} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      );
    }

    switch (type) {
      case "lock":
        return (
          <svg className={baseClass} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
          </svg>
        );
      case "shield":
        return (
          <svg className={baseClass} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
          </svg>
        );
      case "document":
        return (
          <svg className={baseClass} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
          </svg>
        );
      case "bank":
        return (
          <svg className={baseClass} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />
          </svg>
        );
      default:
        return null;
    }
  };

  // Step Indicator Component
  const StepIndicator = () => (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const isCompleted = completedSteps[`step${step.id}`];
          const isCurrent = currentStep === step.id;
          const isClickable = step.id <= currentStep || completedSteps[`step${step.id - 1}`] || step.id === 1;

          return (
            <React.Fragment key={step.id}>
              {/* Step Circle */}
              <div className="flex flex-col items-center">
                <button
                  onClick={() => isClickable && goToStep(step.id)}
                  disabled={!isClickable}
                  className={`
                    w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-300
                    ${isCompleted 
                      ? "bg-teal-500 border-teal-500 text-white" 
                      : isCurrent 
                        ? "bg-teal-600 border-teal-600 text-white shadow-lg shadow-teal-200" 
                        : "bg-white border-gray-300 text-gray-400"
                    }
                    ${isClickable ? "cursor-pointer hover:scale-105" : "cursor-not-allowed"}
                  `}
                >
                  <StepIcon type={step.icon} isCompleted={isCompleted} isCurrent={isCurrent} />
                </button>
                <div className="mt-2 text-center">
                  <p className={`text-xs font-medium ${
                    isCompleted ? "text-teal-600" : isCurrent ? "text-teal-600" : "text-gray-400"
                  }`}>
                    Step {step.id}
                  </p>
                  <p className={`text-sm font-semibold hidden sm:block ${
                    isCompleted ? "text-teal-700" : isCurrent ? "text-gray-900" : "text-gray-400"
                  }`}>
                    {step.shortTitle}
                  </p>
                </div>
              </div>

              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className={`flex-1 h-1 mx-2 rounded-full transition-all duration-300 ${
                  isCompleted ? "bg-teal-500" : "bg-gray-200"
                }`} />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );

  // Document Upload Component
  const DocumentUpload = ({ id, label, preview, inputRef, error, previewKey, existingUrl }) => (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-medium text-gray-700 mb-1.5 flex items-center flex-wrap"
      >
        <span>{label}</span> <span className="text-red-500 mx-1">*</span>
        {existingUrl && kycdata?.success && (
          <button
            type="button"
            className="ml-2 inline-flex items-center px-2.5 py-1 text-xs rounded-md border border-teal-500 text-teal-600 hover:bg-teal-50 transition-colors"
            onClick={() => onClickImage(existingUrl)}
          >
            <img alt="View" src={showIcon} className="w-3 h-3 mr-1.5" /> View
          </button>
        )}
      </label>
      
      <div className="mb-2">
        <label 
          className={`w-full flex flex-col items-center px-4 py-4 bg-white rounded-lg border-2 border-dashed ${
            preview ? 'border-teal-500 bg-teal-50' : 'border-gray-300'
          } cursor-pointer hover:bg-gray-50 transition-all duration-200`}
          htmlFor={id}
        >
          {!preview ? (
            <>
              <svg className="w-10 h-10 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
              </svg>
              <span className="mt-2 text-sm font-medium text-gray-600">Click to upload document</span>
              <span className="text-xs text-gray-500 mt-1">JPG, PNG or JPEG (Max 5MB)</span>
            </>
          ) : (
            <div className="relative w-full">
              <img 
                src={preview} 
                alt="Document preview" 
                className="h-32 mx-auto object-contain rounded"
              />
              <span className="block mt-2 text-xs text-center text-teal-600 font-medium">
                ✓ Document uploaded - Click to replace
              </span>
            </div>
          )}
        </label>
        <input
          type="file"
          accept=".jpg,.jpeg,.png"
          className="hidden"
          id={id}
          name={id}
          ref={inputRef}
          onChange={(e) => {
            handleChange(e);
            if (e.target.files && e.target.files[0]) {
              const reader = new FileReader();
              reader.onload = (event) => {
                setPreviewImages(prev => ({
                  ...prev,
                  [previewKey]: event.target.result
                }));
              };
              reader.readAsDataURL(e.target.files[0]);
            }
          }}
        />
      </div>
      
      {error && <p className="mt-1.5 text-sm text-red-500">{error}</p>}
    </div>
  );

  // ==================== STEP 1: DIGILOCKER ====================
  const renderStep1 = () => (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden border-t-4 border-teal-500">
      <div className="p-6 sm:p-8">
        <div className="text-center mb-8">
          <div className="w-20 h-20 mx-auto mb-4 bg-teal-50 rounded-full flex items-center justify-center">
            <img src={digiLocker} alt="DigiLocker" className="w-12 h-12" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Connect with DigiLocker</h2>
          <p className="text-gray-500">Securely fetch your documents from DigiLocker to auto-fill your KYC information</p>
        </div>

        {/* Info Box */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <div className="flex gap-3">
            <svg className="w-6 h-6 text-blue-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div className="text-sm text-blue-800">
              <p className="font-semibold mb-1">Before you proceed, ensure you have:</p>
              <ul className="space-y-1 text-blue-700">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                  Access to your Aadhaar-linked mobile number for OTP
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                  Your PAN card details ready
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                  An active DigiLocker account (or create one during the process)
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* DigiLocker Button */}
        <button
          onClick={handleDigiLockerClick}
          disabled={loading}
          className="w-full py-4 bg-teal-600 text-white text-lg font-semibold rounded-lg shadow-lg hover:bg-teal-700 focus:outline-none focus:ring-4 focus:ring-teal-300 transition-all duration-200 flex items-center justify-center gap-3 disabled:opacity-50"
        >
          {loading ? (
            <>
              <svg className="animate-spin h-6 w-6 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Connecting to DigiLocker...
            </>
          ) : (
            <>
              <img src={digiLocker} alt="" className="w-8 h-8" />
              Connect with DigiLocker
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </>
          )}
        </button>

        {/* Success State */}
        {completedSteps.step1 && digilockerData && (
          <div className="mt-6 p-5 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <p className="font-bold text-green-800 text-lg">Successfully Connected!</p>
                <p className="text-green-600 text-sm">Your documents have been fetched from DigiLocker</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 p-4 bg-white rounded-lg border border-green-200">
              <div>
                <p className="text-xs text-gray-500 mb-0.5">Full Name</p>
                <p className="text-sm font-semibold text-gray-900">{digilockerName}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-0.5">Date of Birth</p>
                <p className="text-sm font-semibold text-gray-900">{maskData(digilockerDob, 0, 0, "•")}</p>
              </div>
            </div>

            <button 
              onClick={goToNextStep} 
              className="w-full mt-4 py-3 bg-teal-600 text-white font-semibold rounded-lg hover:bg-teal-700 transition-colors flex items-center justify-center gap-2"
            >
              Continue to Aadhaar Verification
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  );

  // ==================== STEP 2: AADHAAR ====================
  const renderStep2 = () => (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden border-t-4 border-teal-500">
      <div className="p-6 sm:p-8">
        <div className="text-center mb-8">
          <div className="w-20 h-20 mx-auto mb-4 bg-teal-50 rounded-full flex items-center justify-center">
            <svg className="w-10 h-10 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Aadhaar Verification</h2>
          <p className="text-gray-500">Verify your identity using Aadhaar OTP for enhanced security</p>
        </div>

        {!aadhaarVerified ? (
          <>
            {/* Warning Box */}
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
              <div className="flex gap-3">
                <svg className="w-6 h-6 text-amber-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <div className="text-sm text-amber-800">
                  <p className="font-semibold mb-1">Important Information</p>
                  <p className="text-amber-700">
                    You will receive an OTP on your Aadhaar-linked mobile number. Make sure you have access to that number.
                  </p>
                </div>
              </div>
            </div>

            {/* Verify Button */}
            <button 
              onClick={() => setShowAadhaarModal(true)} 
              className="w-full py-4 bg-teal-600 text-white text-lg font-semibold rounded-lg shadow-lg hover:bg-teal-700 transition-all duration-200 flex items-center justify-center gap-3"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
              </svg>
              Verify with Aadhaar OTP
            </button>

            {/* Skip Option */}
            <div className="mt-4 text-center">
              <button
                onClick={handleSkipAadhaarVerification}
                className="text-gray-500 hover:text-gray-700 text-sm underline"
              >
                Skip this step (Not recommended)
              </button>
            </div>

            {/* Navigation */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <button
                onClick={goToPreviousStep}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-800 font-medium"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to DigiLocker
              </button>
            </div>
          </>
        ) : (
          <div className="p-5 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <p className="font-bold text-green-800 text-lg">Aadhaar Verified Successfully!</p>
                <p className="text-green-600 text-sm">{aadhaarVerificationData?.aadhaarName}</p>
              </div>
            </div>

            <button 
              onClick={goToNextStep} 
              className="w-full mt-4 py-3 bg-teal-600 text-white font-semibold rounded-lg hover:bg-teal-700 transition-colors flex items-center justify-center gap-2"
            >
              Continue to Documents
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  );

  // ==================== STEP 3: DOCUMENTS ====================
  const renderStep3 = () => (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden border-t-4 border-teal-500">
      <div className="p-5 sm:p-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-5 border-b border-gray-200 mb-6">
          <div>
            <h2 className="text-2xl font-bold text-teal-600 mb-1">Documents & Profile</h2>
            <p className="text-sm text-gray-500">Upload required documents and verify your information</p>
          </div>
          {aadhaarVerified && (
            <span className="mt-2 sm:mt-0 inline-flex items-center px-3 py-1.5 bg-green-100 text-green-800 text-sm font-medium rounded-full">
              <svg className="w-4 h-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Aadhaar Verified
            </span>
          )}
        </div>

        {/* Form Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Applicant Information Section */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-5">
            <div className="bg-teal-600 text-white px-4 py-2.5 rounded-lg mb-5 -mt-8 shadow-md">
              <h6 className="text-sm font-bold m-0">Applicant Information</h6>
            </div>

            <div className="space-y-5">
              {/* Live Photo Section */}
              {isCountryCodeIndia && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Live Photo <span className="text-red-500">*</span>
                  </label>
                  <div className={`bg-gray-50 rounded-lg p-4 border-2 border-dashed ${livePhotoPreview ? 'border-teal-500 bg-teal-50' : 'border-gray-300'}`}>
                    {!livePhoto && !livePhotoPreview ? (
                      <div className="text-center">
                        <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-gray-100 flex items-center justify-center">
                          <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
                          </svg>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">Take a live photo for verification</p>
                        <button
                          type="button"
                          onClick={() => setShowLivePhotoModal(true)}
                          className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-lg border-2 border-teal-500 text-teal-600 hover:bg-teal-50 transition-colors"
                        >
                          <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          Capture Photo
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-4">
                        <img
                          src={livePhotoPreview}
                          alt="Live Photo"
                          className="w-20 h-20 rounded-full object-cover border-3 border-teal-500"
                        />
                        <div className="flex-1">
                          <p className="text-sm font-semibold text-teal-700">✓ Photo Captured</p>
                          <button
                            type="button"
                            onClick={() => setShowLivePhotoModal(true)}
                            className="text-sm text-teal-600 hover:underline mt-1"
                          >
                            Retake Photo
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                  {errors.livePhoto && <p className="mt-1.5 text-sm text-red-500">{errors.livePhoto}</p>}
                </div>
              )}

              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Name of the Applicant <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2.5 bg-gray-100 border border-gray-300 rounded-lg text-gray-700"
                  value={formData.applicantName}
                  disabled
                  readOnly
                />
              </div>

              {/* DOB */}
              {isCountryCodeIndia && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Date of Birth <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2.5 bg-gray-100 border border-gray-300 rounded-lg text-gray-700"
                    value={maskData(formData.dob, 0, 0, 'X')}
                    disabled
                    readOnly
                  />
                </div>
              )}

              {/* Mobile */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Mobile Number (As per Bank) <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all"
                  name="mobile_number"
                  placeholder="Enter mobile number"
                  value={focusedInput === "mobile_number" ? formData.mobile_number : maskData(formData.mobile_number, 5, 2)}
                  maxLength={getMaxLength()}
                  onChange={handleChangeMobileNumber}
                  onFocus={(e) => setFocusedInput(e.target.name)}
                  onBlur={() => setFocusedInput(null)}
                  onKeyPress={(e) => { if (!/[0-9]/.test(e.key)) e.preventDefault(); }}
                  autoComplete="off"
                />
                {errors.mobile_number && <p className="mt-1.5 text-sm text-red-500">{errors.mobile_number}</p>}
              </div>

              {/* Address */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Address <span className="text-red-500">*</span>
                </label>
                <textarea
                  className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all min-h-[80px]"
                  name="address"
                  placeholder="Enter your address"
                  value={focusedInput === "address" ? formData.address : maskData(formData.address)}
                  onChange={handleChange}
                  onFocus={(e) => setFocusedInput(e.target.name)}
                  onBlur={() => setFocusedInput(null)}
                  autoComplete="off"
                />
                {errors.address && <p className="mt-1.5 text-sm text-red-500">{errors.address}</p>}
              </div>
            </div>
          </div>

          {/* Document Proofs Section */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-5">
            <div className="bg-teal-600 text-white px-4 py-2.5 rounded-lg mb-5 -mt-8 shadow-md">
              <h6 className="text-sm font-bold m-0">Document Proofs</h6>
            </div>

            <div className="space-y-5">
              <DocumentUpload
                id={isCountryCodeIndia ? "aadhar_doc_front" : "dl_doc_front"}
                label={`${isCountryCodeIndia ? "Aadhaar" : "Driving License"} Front`}
                preview={previewImages.doc_front}
                inputRef={docFrontRef}
                error={isCountryCodeIndia ? errors.aadhar_doc_front : errors.dl_doc_front}
                previewKey="doc_front"
                existingUrl={isCountryCodeIndia ? kycdata?.data?.aadhar_doc_front : kycdata?.data?.dl_doc_front}
              />

              <DocumentUpload
                id={isCountryCodeIndia ? "aadhar_doc_back" : "dl_doc_back"}
                label={`${isCountryCodeIndia ? "Aadhaar" : "Driving License"} Back`}
                preview={previewImages.doc_back}
                inputRef={docBackRef}
                error={isCountryCodeIndia ? errors.aadhar_doc_back : errors.dl_doc_back}
                previewKey="doc_back"
                existingUrl={isCountryCodeIndia ? kycdata?.data?.aadhar_doc_back : kycdata?.data?.dl_doc_back}
              />

              <DocumentUpload
                id={isCountryCodeIndia ? "pan_doc_front" : "passport_doc_front"}
                label={isCountryCodeIndia ? "PAN Card" : "Passport Front"}
                preview={previewImages.doc1_front}
                inputRef={doc1FrontRef}
                error={isCountryCodeIndia ? errors.pan_doc_front : errors.passport_doc_front}
                previewKey="doc1_front"
                existingUrl={isCountryCodeIndia ? kycdata?.data?.pan_doc_front : kycdata?.data?.passport_doc_front}
              />

              {!isCountryCodeIndia && (
                <DocumentUpload
                  id="passport_doc_back"
                  label="Passport Back"
                  preview={previewImages.doc1_back}
                  inputRef={doc1BackRef}
                  error={errors.passport_doc_back}
                  previewKey="doc1_back"
                  existingUrl={kycdata?.data?.passport_doc_back}
                />
              )}

              {/* PAN Number */}
              {isCountryCodeIndia && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    PAN Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all uppercase"
                    name="panNumber"
                    placeholder="Enter PAN number"
                    value={focusedInput === "panNumber" ? formData.panNumber : maskData(formData.panNumber)}
                    onChange={handleChange}
                    onFocus={(e) => setFocusedInput(e.target.name)}
                    onBlur={() => setFocusedInput(null)}
                    maxLength={10}
                    autoComplete="off"
                  />
                  {errors.panNumber && <p className="mt-1.5 text-sm text-red-500">{errors.panNumber}</p>}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200">
          <button
            onClick={goToPreviousStep}
            className="flex items-center gap-2 px-6 py-3 text-gray-600 hover:text-gray-800 font-medium border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </button>
          <button
            onClick={handleStep3Continue}
            className="flex items-center gap-2 px-8 py-3 bg-teal-600 text-white font-semibold rounded-lg shadow-md hover:bg-teal-700 transition-all"
          >
            Continue to Bank Details
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );

  // ==================== STEP 4: BANK DETAILS ====================
  const renderStep4 = () => (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden border-t-4 border-teal-500">
      <div className="p-5 sm:p-8">
        {/* Header */}
        <div className="pb-5 border-b border-gray-200 mb-6">
          <h2 className="text-2xl font-bold text-teal-600 mb-1">Bank Details</h2>
          <p className="text-sm text-gray-500">Enter your bank account information for payments</p>
        </div>

        {/* Bank Details Form */}
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
            <div className="bg-teal-600 text-white px-4 py-2.5 rounded-lg mb-6 -mt-9 shadow-md">
              <h6 className="text-sm font-bold m-0 flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />
                </svg>
                Bank Account Information
              </h6>
            </div>

            <div className="space-y-5">
              {/* UPI ID */}
              {isCountryCodeIndia && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    UPI ID <span className="text-gray-400">(Optional)</span>
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all"
                    name="upi_id"
                    placeholder="example@upi"
                    value={focusedInput === "upi_id" ? formData.upi_id : maskData(formData.upi_id, 3, 4)}
                    onChange={handleChange}
                    onFocus={(e) => setFocusedInput(e.target.name)}
                    onBlur={() => setFocusedInput(null)}
                    autoComplete="off"
                  />
                  {errors.upi_id && <p className="mt-1.5 text-sm text-red-500">{errors.upi_id}</p>}
                </div>
              )}

              {/* Bank Account Number */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Bank Account Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all"
                  name="bank_account"
                  placeholder="Enter bank account number"
                  value={focusedInput === "bank_account" ? formData.bank_account : maskData(formData.bank_account)}
                  onChange={handleChange}
                  onFocus={(e) => setFocusedInput(e.target.name)}
                  onBlur={() => setFocusedInput(null)}
                  onKeyPress={(e) => { if (!/[0-9]/.test(e.key)) e.preventDefault(); }}
                  autoComplete="off"
                />
                {errors.bank_account && <p className="mt-1.5 text-sm text-red-500">{errors.bank_account}</p>}
              </div>

              {/* Bank Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Bank Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all"
                  name="bank_name"
                  placeholder="Enter bank name"
                  value={formData.bank_name}
                  onChange={handleChange}
                  autoComplete="off"
                />
                {errors.bank_name && <p className="mt-1.5 text-sm text-red-500">{errors.bank_name}</p>}
              </div>

              {/* IFSC Code */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Bank {isCountryCodeIndia ? "IFSC" : ""} Code <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all uppercase"
                  name="ifsc_code"
                  placeholder={isCountryCodeIndia ? "Enter IFSC code (e.g., SBIN0001234)" : "Enter bank code"}
                  value={toUpperCase(focusedInput === "ifsc_code" ? formData.ifsc_code : maskData(formData.ifsc_code))}
                  onChange={handleChange}
                  onFocus={(e) => setFocusedInput(e.target.name)}
                  onBlur={() => setFocusedInput(null)}
                  maxLength={11}
                  autoComplete="off"
                />
                {errors.ifsc_code && <p className="mt-1.5 text-sm text-red-500">{errors.ifsc_code}</p>}
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200">
          <button
            onClick={goToPreviousStep}
            className="flex items-center gap-2 px-6 py-3 text-gray-600 hover:text-gray-800 font-medium border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="flex items-center gap-2 px-8 py-3 bg-teal-600 text-white font-semibold rounded-lg shadow-md hover:bg-teal-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Submitting...
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Submit KYC
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );

  // ==================== KYC COMPLETED VIEW ====================
  const renderKycCompleted = () => {
    const status = kycdata?.data?.status;
    
    const getStatusConfig = () => {
      switch (status) {
        case "approve":
          return {
            bg: "bg-green-50",
            border: "border-green-500",
            iconBg: "bg-green-500",
            title: "KYC Approved",
            subtitle: "Your identity has been verified successfully",
            textColor: "text-green-800",
          };
        case "reject":
          return {
            bg: "bg-red-50",
            border: "border-red-500",
            iconBg: "bg-red-500",
            title: "KYC Rejected",
            subtitle: kycdata?.data?.reason || "Please review and resubmit your documents",
            textColor: "text-red-800",
          };
        case "open":
          return {
            bg: "bg-orange-50",
            border: "border-orange-500",
            iconBg: "bg-orange-500",
            title: "KYC In Open",
            subtitle: "Your application is awaiting review",
            textColor: "text-orange-800",
          };
        default:
          return {
            bg: "bg-blue-50",
            border: "border-blue-500",
            iconBg: "bg-blue-500",
            title: "Under Review",
            subtitle: "Your KYC application is being processed",
            textColor: "text-blue-800",
          };
      }
    };

    const config = getStatusConfig();

    return (
      <div className="bg-white rounded-xl shadow-lg overflow-hidden border-t-4 border-teal-500">
        <div className="p-5 sm:p-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-5 border-b border-gray-200 mb-6">
            <div className="flex items-center mb-4 sm:mb-0">
              <h1 className="text-2xl font-bold text-teal-600 mr-2">KYC Information</h1>
            </div>
            <h6 className="text-teal-600 text-sm font-medium flex items-center">
              <span>Country:</span> 
              <span className="ml-2 text-gray-700 font-semibold">
                {!userData?.data?.country || userData?.data?.country === "N/A"
                  ? getCountryName()
                  : userData?.data?.country}
              </span>
            </h6>
          </div>

          {/* Status Banner */}
          <div className={`${config.bg} border-l-4 ${config.border} rounded-lg p-5 mb-8`}>
            <div className="flex items-start gap-4">
              <div className={`w-12 h-12 ${config.iconBg} rounded-full flex items-center justify-center flex-shrink-0`}>
                {status === "approve" ? (
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : status === "reject" ? (
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="w-6 h-6 text-white animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                )}
              </div>
              <div className="flex-1">
                <h3 className={`text-lg font-bold ${config.textColor}`}>{config.title}</h3>
                <p className={`text-sm ${config.textColor} opacity-80`}>{config.subtitle}</p>
                {status === "approve" && (
                  <button
                    type="button"
                    className="mt-3 inline-flex items-center px-4 py-2 bg-teal-600 text-white text-sm rounded-lg shadow-sm hover:bg-teal-700 transition-colors"
                    onClick={() => setShowBankModal(true)}
                  >
                    <img alt="Edit" src={editIcon} className="w-4 h-4 mr-2 filter brightness-0 invert" />
                    Edit Bank Details
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Applicant Information */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-5">
              <div className="bg-teal-600 text-white px-4 py-2.5 rounded-lg mb-5 -mt-8 shadow-md">
                <h6 className="text-sm font-bold m-0">Applicant Information</h6>
              </div>
              <div className="space-y-4">
                {livePhotoPreview && (
                  <div className="flex justify-center mb-4">
                    <img
                      src={livePhotoPreview}
                      alt="Photo"
                      className="w-24 h-24 rounded-full object-cover border-4 border-teal-100"
                    />
                  </div>
                )}
                <div>
                  <p className="text-xs text-gray-500">Full Name</p>
                  <p className="text-sm font-semibold text-gray-900">{formData.applicantName}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Mobile Number</p>
                  <p className="text-sm font-semibold text-gray-900">{maskData(formData.mobile_number, 5, 2)}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Address</p>
                  <p className="text-sm font-semibold text-gray-900">{maskData(formData.address)}</p>
                </div>
              </div>
            </div>

            {/* Document Proofs */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-5">
              <div className="bg-teal-600 text-white px-4 py-2.5 rounded-lg mb-5 -mt-8 shadow-md">
                <h6 className="text-sm font-bold m-0">Document Proofs</h6>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { img: previewImages.doc_front, label: isCountryCodeIndia ? "Aadhaar Front" : "DL Front" },
                  { img: previewImages.doc_back, label: isCountryCodeIndia ? "Aadhaar Back" : "DL Back" },
                  { img: previewImages.doc1_front, label: isCountryCodeIndia ? "PAN Card" : "Passport" },
                  ...(!isCountryCodeIndia && previewImages.doc1_back ? [{ img: previewImages.doc1_back, label: "Passport Back" }] : []),
                ]
                  .filter((doc) => doc.img)
                  .map((doc, idx) => (
                    <button
                      key={idx}
                      onClick={() => onClickImage(doc.img)}
                      className="text-center group p-2 rounded-lg border border-gray-200 hover:border-teal-400 transition-colors"
                    >
                      <div className="w-full h-16 rounded overflow-hidden">
                        <img src={doc.img} alt="" className="w-full h-full object-cover" />
                      </div>
                      <p className="text-xs text-gray-500 mt-2 group-hover:text-teal-600">{doc.label}</p>
                    </button>
                  ))}
              </div>
              {isCountryCodeIndia && (
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <p className="text-xs text-gray-500">PAN Number</p>
                  <p className="text-sm font-semibold text-gray-900 font-mono">{maskData(formData.panNumber)}</p>
                </div>
              )}
            </div>

            {/* Bank Details */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-5">
              <div className="bg-teal-600 text-white px-4 py-2.5 rounded-lg mb-5 -mt-8 shadow-md">
                <h6 className="text-sm font-bold m-0">Bank Details</h6>
              </div>
              <div className="space-y-4">
                {isCountryCodeIndia && formData.upi_id && (
                  <div>
                    <p className="text-xs text-gray-500">UPI ID</p>
                    <p className="text-sm font-semibold text-gray-900">{maskData(formData.upi_id, 3, 4)}</p>
                  </div>
                )}
                <div>
                  <p className="text-xs text-gray-500">Account Number</p>
                  <p className="text-sm font-semibold text-gray-900 font-mono">{maskData(formData.bank_account)}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Bank Name</p>
                  <p className="text-sm font-semibold text-gray-900">{formData.bank_name}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">{isCountryCodeIndia ? "IFSC Code" : "Bank Code"}</p>
                  <p className="text-sm font-semibold text-gray-900 font-mono">{maskData(formData.ifsc_code)}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Resubmit Button for Rejected Status */}
          {status === "reject" && (
            <div className="mt-8 flex justify-end">
              <button
                onClick={() => {
                  setCompletedSteps({ step1: true, step2: true, step3: false, step4: false });
                  setCurrentStep(3);
                }}
                className="px-8 py-3 bg-teal-600 text-white font-semibold rounded-lg shadow-md hover:bg-teal-700 transition-all"
              >
                Resubmit KYC Information
              </button>
            </div>
          )}
        </div>
      </div>
    );
  };

  // Main Render
  const renderCurrentStep = () => {
    if (kycdata?.success === 1) return renderKycCompleted();
    
    switch (currentStep) {
      case 1: return renderStep1();
      case 2: return renderStep2();
      case 3: return renderStep3();
      case 4: return renderStep4();
      default: return renderStep1();
    }
  };

  return (
    <section className="py-6 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 max-w-screen-xl">
        {/* Header */}
        <div className="mb-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">KYC Verification</h1>
              <p className="text-sm text-gray-500 mt-1">
                {kycdata?.success === 1
                  ? "Your KYC verification details"
                  : "Complete the verification process to continue"}
              </p>
            </div>
            <div className="mt-2 sm:mt-0 text-right">
              <p className="text-xs text-gray-500">Country</p>
              <p className="text-sm font-semibold text-gray-900">
                {!userData?.data?.country || userData?.data?.country === "N/A"
                  ? getCountryName()
                  : userData?.data?.country}
              </p>
            </div>
          </div>
        </div>

        {/* Step Indicator - Only show if KYC not completed and is India */}
        {kycdata?.success !== 1 && isCountryCodeIndia && <StepIndicator />}

        {/* Main Content */}
        {renderCurrentStep()}
      </div>

      {/* Modals */}
      <LivePhotoModal
        show={showLivePhotoModal}
        onClose={() => setShowLivePhotoModal(false)}
        onPhotoCapture={handleLivePhotoCapture}
        userName={formData.applicantName}
        loading={loading}
      />

      <BankDetailsModal
        show={showBankModal}
        onClose={() => setShowBankModal(false)}
        bankDetails={{
          bank_name: formData.bank_name,
          ifsc_code: formData.ifsc_code,
          bank_account: formData.bank_account,
          upi_id: formData.upi_id,
        }}
        onSubmit={handleBankDetailsUpdate}
        isCountryCodeIndia={isCountryCodeIndia}
        loading={loading}
      />

      <AadhaarVerificationModal
        show={showAadhaarModal}
        onClose={() => setShowAadhaarModal(false)}
        digilockerName={digilockerName}
        digilockerDob={digilockerDob}
        onVerificationSuccess={handleAadhaarVerificationSuccess}
        onSkip={handleSkipAadhaarVerification}
      />

      {(isLoading || loading) && <Loader />}
    </section>
  );
};

export default KycInformation;