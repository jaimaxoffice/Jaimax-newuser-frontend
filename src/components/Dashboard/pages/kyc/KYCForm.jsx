// KycInformation.jsx - Updated with Aadhaar Verification
import React, { useContext, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "../../../../ReusableComponents/Toasts/Toasts";
import digiLocker from "../../../../assets/digiLocker.webp";
import editIcon from "../../../../assets/square-pen.svg";
import showIcon from "../../../../assets/showIcon.svg";
import countryCodes from "../../../../Authentication/countryCodes.json";
import { useUserDataQuery } from "../dashBoard/DashboardApliSlice";
import CryptoJS from "crypto-js";
import DigiLockerModal from "./DigiLockerModal";
import BankDetailsModal from "./BankDetailsModal";
import AadhaarVerificationModal from "./AadhaarVerificationModal";

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
  const [enableFields, setEnableFields] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showBankModal, setShowBankModal] = useState(false);
  const [disableFieldsAfterKYC, setDisableFieldsAfterKYC] = useState(false);
  const location = useLocation();
  const [focusedInput, setFocusedInput] = useState(null);

  // NEW STATE FOR AADHAAR VERIFICATION
  const [showAadhaarModal, setShowAadhaarModal] = useState(false);
  const [aadhaarVerified, setAadhaarVerified] = useState(false);
  const [aadhaarVerificationData, setAadhaarVerificationData] = useState(null);
  const [digilockerName, setDigilockerName] = useState("");
  const [digilockerDob, setDigilockerDob] = useState('');
  const [kycStep, setKycStep] = useState("digilocker"); // digilocker, aadhaar, documents


  const maskData = (
    data = "",
    visibleStart = 2,
    visibleEnd = 2,
    maskChar = "*"
  ) => {
    const dataStr = String(data || "");
    if (!dataStr) return "";
    if (visibleStart === 0 && visibleEnd === 0) {
      return maskChar.repeat(dataStr.length);
    }
    if (dataStr.length <= visibleStart + visibleEnd) {
      return dataStr;
    }
    const maskedSection = maskChar.repeat(
      Math.max(0, dataStr.length - (visibleStart + visibleEnd))
    );
    const endPart = visibleEnd > 0 ? dataStr.slice(-visibleEnd) : "";
    return dataStr.slice(0, visibleStart) + maskedSection + endPart;
  };

  // State for image previews
  const [previewImages, setPreviewImages] = useState({
    doc_front: null,
    doc_back: null,
    doc1_front: null,
    doc1_back: null
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
    applicantName: userData?.data?.name,
    ifsc_code: "",
    mobile_number: `+${userData?.data?.countryCode} `,
    upi_id: "",
    bank_account: "",
    address: "",
    dob: "",
    panNumber: "",
  });

  const [isEditClicked, setIsEditClicked] = useState(false);
  const { data: kycdata, isLoading, refetch } = useGetkycDetailsQuery();

  const docFrontRef = useRef(null);
  const doc1FrontRef = useRef(null);
  const docBackRef = useRef(null);
  const doc1BackRef = useRef(null);


  const toUpperCase = (text) => {
    return text ? text.toUpperCase() : '';
  };

  const getCountryName = () => {
    const countryCode = `+${userData?.data?.countryCode}`;
    const countryName = countryCodes.find(
      (country) => country.country_code == countryCode
    );
    return countryName?.country_name || "NA";
  };

  // NEW: Handle Aadhaar Verification Success
  const handleAadhaarVerificationSuccess = (data) => {
    setAadhaarVerified(true);
    setAadhaarVerificationData(data);
    setShowAadhaarModal(false);
    setKycStep("documents");
    setEnableFields(true);
    
    toast.success("Aadhaar verified! You can now upload documents.", {
      position: "top-center",
    });
  };

  // NEW: Handle Skip Aadhaar Verification
  const handleSkipAadhaarVerification = () => {
    setShowAadhaarModal(false);
    setKycStep("documents");
    setEnableFields(true);
    toast.info("Aadhaar verification skipped. You can proceed with document upload.", {
      position: "top-center",
    });
  };

  // Handle opening the bank details modal
  const handleEditBankDetails = () => {
    setShowBankModal(true);
  };

  // ... (keep your existing handleBankDetailsUpdate function)

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
        toast.success(response.message || "Bank details updated successfully", {
          position: "top-center",
        });
        refetch();
        
        setFormData(prev => ({
          ...prev,
          bank_name: bankData.bank_name,
          ifsc_code: bankData.ifsc_code,
          bank_account: bankData.bank_account,
          upi_id: bankData.upi_id || prev.upi_id
        }));
        
        setShowBankModal(false);
      } else {
        toast.error(response.message || "Failed to update bank details", {
          position: "top-center",
        });
      }
    } catch (error) {
      toast.error(error.message || "An error occurred", {
        position: "top-center",
      });
    } finally {
      setLoading(false);
    }
  };

  // ... (keep your existing handleChange function)

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "ifsc_code" && !/^[a-zA-Z0-9]*$/.test(value)) return;
    if (name === "panNumber" && !/^[a-zA-Z0-9]*$/.test(value)) return;
    if (name === "upi_id" && !/^[a-zA-Z0-9@._-]*$/.test(value)) return;
    if (name === "bank_name" && !/^[a-zA-Z\s]*$/.test(value)) return;

    if (files) {
      const acceptedFormats = ["image/png", "image/jpeg", "image/jpg"];
      const invalidFile = !acceptedFormats.includes(files[0].type);
      const refsMap = {
        aadhar_doc_front: docFrontRef,
        dl_doc_front: docFrontRef,
        aadhar_doc_back: docBackRef,
        dl_doc_back: docBackRef,
        pan_doc_front: doc1FrontRef,
        passport_doc_front: doc1FrontRef,
        passport_doc_back: doc1BackRef,
      };

      if (invalidFile) {
        toast.warning("Only JPG / PNG files are allowed", {
          position: "top-center",
        });
        if (refsMap[name]) {
          refsMap[name].current.value = "";
        }
        return;
      }
    }

    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleChangeMobileNumber = (e) => {
    const { name, value } = e.target;
    if (value.startsWith(`+${userData?.data?.countryCode} `)) {
      setFormData({ ...formData, [name]: value });
    }
  };

  const getMaxLength = () => {
    return isCountryCodeIndia ? 14 : 19;
  };

  const checkTextAfterPrefix = (input) => {
    let splitString = input.split(`+${userData?.data?.countryCode} `);
    return !splitString[1]?.trim().length > 0;
  };

  // ... (keep your existing handleSubmit function but add aadhaar verification data)

  const handleSubmit = async () => {
    const newErrors = {};
    
    // ... (keep your existing validation)
    if (kycdata?.success !== 1) {
      if (isCountryCodeIndia && !formData.aadhar_doc_front)
        newErrors.aadhar_doc_front = "The Aadhar doc front field is mandatory.";
      if (isCountryCodeIndia && !formData.aadhar_doc_back)
        newErrors.aadhar_doc_back = "The Aadhar doc back field is mandatory.";
      if (isCountryCodeIndia && !formData.pan_doc_front)
        newErrors.pan_doc_front = "The Pan doc front field is mandatory.";
      if (isCountryCodeIndia && !formData.panNumber)
        newErrors.panNumber = "The PAN number field is mandatory.";
      if (!isCountryCodeIndia && !formData.dl_doc_front)
        newErrors.dl_doc_front = "The Driving License doc front field is mandatory.";
      if (!isCountryCodeIndia && !formData.dl_doc_back)
        newErrors.dl_doc_back = "The Driving License doc back field is mandatory.";
      if (!isCountryCodeIndia && !formData.passport_doc_front)
        newErrors.passport_doc_front = "The Passport doc front field is mandatory.";
      if (!isCountryCodeIndia && !formData.passport_doc_back)
        newErrors.passport_doc_back = "The Passport doc back field is mandatory.";
    }

    if (!formData.bank_name)
      newErrors.bank_name = "The bank name field is mandatory.";
    if (!formData.ifsc_code)
      newErrors.ifsc_code = `The ${isCountryCodeIndia ? "ifsc" : "bank"} code field is mandatory.`;
    if (checkTextAfterPrefix(formData.mobile_number))
      newErrors.mobile_number = "The mobile number field is mandatory.";
    if (!formData.bank_account)
      newErrors.bank_account = "The bank account field is mandatory.";
    if (!formData.address)
      newErrors.address = "The address field is mandatory.";

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    const data = new FormData();
    
    // ... (keep your existing FormData append logic)
    if (kycdata?.success !== 1) {
      if (isCountryCodeIndia) {
        data.append("aadhar_doc_front", formData.aadhar_doc_front);
        data.append("aadhar_doc_back", formData.aadhar_doc_back);
        data.append("pan_doc_front", formData.pan_doc_front);
        data.append("upi_id", formData.upi_id);
        data.append("panNumber", formData.panNumber);
        data.append("dob", formData.dob);
      } else {
        data.append("dl_doc_front", formData.dl_doc_front);
        data.append("dl_doc_back", formData.dl_doc_back);
        data.append("passport_doc_front", formData.passport_doc_front);
        data.append("passport_doc_back", formData.passport_doc_back);
      }
    }

    // NEW: Add Aadhaar verification data
    if (aadhaarVerificationData) {
      data.append("aadhaarVerified", "true");
      data.append("aadhaarTempId", aadhaarVerificationData.tempId || "");
      data.append("aadhaarNameMatched", aadhaarVerificationData.nameMatched ? "true" : "false");
      data.append("aadharNumber", aadhaarVerificationData.aadhaarNumber || "");
    }
if (!aadhaarVerificationData && aadhaarNumber) {
    data.append("aadharNumber", aadhaarNumber.replace(/\s/g, ""));
  }
    data.append("name", formData.applicantName);
    data.append("bank_name", formData.bank_name);
    data.append("ifsc_code", formData.ifsc_code);
    if (formData.mobile_number.startsWith(`+${userData?.data?.countryCode} `)) {
      data.append(
        "mobile_number",
        formData.mobile_number.replace(`+${userData?.data?.countryCode} `, "")
      );
    }
    data.append("bank_account", formData.bank_account);
    data.append("address", formData.address);

    setLoading(true);
    try {
      const response = await submitKyc(data);

      if (response?.data?.status_code === 200) {
        toast.success(response?.data.message, { position: "top-center" });
        refetch();
        setErrors({});
      } else {
        toast?.error(response?.error?.data?.message, { position: "top-center" });
        setErrors({});
      }
    } catch (error) {
      toast.error(error.message, { position: "top-center" });
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
      bank_name: "",
      applicantName: userData?.data?.name,
      ifsc_code: "",
      mobile_number: `+${userData?.data?.countryCode} `,
      upi_id: "",
      bank_account: "",
      address: "",
      dob: "",
      panNumber: "",
    });
    
    setPreviewImages({
      doc_front: null,
      doc_back: null,
      doc1_front: null,
      doc1_back: null
    });
    
    if (docFrontRef?.current) docFrontRef.current.value = null;
    if (doc1FrontRef?.current) doc1FrontRef.current.value = null;
    if (docBackRef?.current) docBackRef.current.value = null;
    if (!isCountryCodeIndia && doc1BackRef?.current) doc1BackRef.current.value = null;
  };

  // UPDATED: DigiLocker callback handling with Aadhaar verification trigger
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const extractedCode = queryParams.get("code");
    
    const newUrl = window.location.protocol + "//" + window.location.host + window.location.pathname;
    window.history.replaceState(null, "", newUrl);
    
    if (extractedCode && !localStorage.getItem("processed")) {
      localStorage.setItem("processed", "true");

      const payload = {
        code: extractedCode,
        verifier: localStorage.getItem("verifier"),
      };

      localStorage.setItem("code", extractedCode);
      setLoading(true);
      
      const postTokenRequest = async () => {
        try {
          const response = await getKycData(payload).unwrap();
          if (response.data) {
            // Store DigiLocker name for Aadhaar verification
            setDigilockerName(response.data.name);
            setDigilockerDob(response.data.dob)
            
            setFormData((prev) => ({
              ...prev,
              applicantName: response.data.name,
              mobile_number: `+91 ${response.data.mobile}`,
              address: response.data.address,
              dob: response.data.dob,
              panNumber: response.data.panNumber,
            }));
            
            setDisableFieldsAfterKYC(true);
            setIsEditClicked(true);
            setShowModal(false);
            
            // NEW: Trigger Aadhaar verification after DigiLocker
            setKycStep("aadhaar");
            setShowAadhaarModal(true);
          }
        } catch (error) {
          console.log(error);
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
      setEnableFields(true);
      setDisableFieldsAfterKYC(true);
      setKycStep("documents"); // Skip to documents if KYC already exists
      
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
        mobile_number: `${`+${userData?.data?.countryCode} `}${kycdata?.data?.mobile_number}` || "",
        upi_id: kycdata?.data?.upi_id || "",
        bank_account: kycdata?.data?.bank_account || "",
        address: kycdata?.data?.address || "",
        dob: kycdata?.data.dob || "",
        panNumber: kycdata?.data.panNumber || "",
      });
      
      setPreviewImages({
        doc_front: isCountryCodeIndia 
          ? kycdata?.data?.aadhar_doc_front || null
          : kycdata?.data?.dl_doc_front || null,
        doc_back: isCountryCodeIndia
          ? kycdata?.data?.aadhar_doc_back || null
          : kycdata?.data?.dl_doc_back || null,
        doc1_front: isCountryCodeIndia
          ? kycdata?.data?.pan_doc_front || null
          : kycdata?.data?.passport_doc_front || null,
        doc1_back: !isCountryCodeIndia
          ? kycdata?.data?.passport_doc_back || null
          : null
      });

      if (isCountryCodeIndia && kycdata?.data?.status === "reject" && !(isLoading || loading)) {
        setShowModal(true);
      } else {
        setShowModal(false);
      }
    } else {
      if (isCountryCodeIndia && !(isLoading || loading)) {
        setShowModal(true);
      }
      resetForm();
    }
  }, [userData, kycdata]);

  const onClickImage = (imageURL) => {
    const link = document.createElement("a");
    link.href = imageURL;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.click();
  };

  const generateCodeVerifier = async () => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~";
    const length = Math.floor(Math.random() * (128 - 43 + 1)) + 43;
    let verifier = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      verifier += characters[randomIndex];
    }
    return verifier;
  };

  const generateCodeChallenge = (verifier) => {
    const hash = CryptoJS.SHA256(verifier);
    const base64Url = CryptoJS.enc.Base64.stringify(hash)
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "");
    return base64Url;
  };

  const handleButtonClick = async () => {
    setLoading(true);
    setErrors({});

    try {
      const verifier = await generateCodeVerifier();
      localStorage.removeItem("processed");
      const challenge = await generateCodeChallenge(verifier);
      let origin = window.location.origin;
      let redirectURI;
      let clientId;
      
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
      
      const apiUrl = new URL(
        `https://digilocker.meripehchaan.gov.in/public/oauth2/1/authorize?response_type=code&client_id=${clientId}&state=oidc_flow&redirect_uri=${redirectURI}&code_challenge=${challenge}&code_challenge_method=S256&dl_flow=signin&acr=pan+aadhaar+mobile&amr=pan+all+aadhaar&scope=files.issueddocs+files.uploadeddocs&pla=Y`
      );
      
      window.open(apiUrl.toString(), "_self");
    } catch (err) {
      setErrors(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <section className="py-6 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 max-w-screen">
          <div className="w-full">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden border-t-4 border-teal-500">
              <div className="p-5 sm:p-8">
                {/* Header Section */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-5 border-b border-gray-200 mb-6">
                  <div className="flex items-center mb-4 sm:mb-0">
                    <h1 className="text-2xl font-bold text-teal-600 mr-2">KYC Information</h1>
                    <p className="text-sm text-gray-500">
                      {kycdata?.data?.status !== "approve" && "(Fill up information and verify your KYC.)"}
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
                    <h6 className="text-teal-600 text-sm font-medium flex items-center">
                      <span>Country:</span>
                      <span className="ml-2 text-gray-700 font-semibold">
                        {!userData?.data?.country || userData?.data?.country === "N/A"
                          ? getCountryName()
                          : userData?.data?.country}
                      </span>
                    </h6>

                    {isCountryCodeIndia &&
                      ((kycdata?.data?.status !== "open" && kycdata?.data?.status !== "approve")) && (
                        <button
                          type="button"
                          className="inline-flex items-center px-4 py-2 border border-teal-500 text-sm rounded-full text-teal-600 hover:bg-teal-50 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 transition duration-150 ease-in-out"
                          id="renderBtn"
                          onClick={handleButtonClick}
                        >
                          <img src={digiLocker} alt="DigiLocker" className="w-8 h-8 mr-2" />
                          DigiLocker
                        </button>
                      )}
                  </div>
                </div>

                {/* NEW: KYC Steps Progress Indicator */}
                {isCountryCodeIndia && kycdata?.data?.status !== "approve" && (
                  <div className="mb-8">
                    <div className="flex items-center justify-center">
                      {/* Step 1: DigiLocker */}
                      <div className="flex flex-col items-center">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold
                          ${kycStep !== "digilocker" ? "bg-green-500 text-white" : "bg-teal-600 text-white"}`}>
                          {kycStep !== "digilocker" ? "✓" : "1"}
                        </div>
                        <span className={`mt-2 text-xs font-medium
                          ${kycStep !== "digilocker" ? "text-green-600" : "text-teal-600"}`}>
                          DigiLocker
                        </span>
                      </div>

                      <div className={`w-16 h-1 mx-2 rounded
                        ${kycStep === "documents" || aadhaarVerified ? "bg-green-500" : "bg-gray-200"}`} />

                      {/* Step 2: Aadhaar Verification */}
                      <div className="flex flex-col items-center">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold
                          ${aadhaarVerified ? "bg-green-500 text-white" : 
                            kycStep === "aadhaar" ? "bg-teal-600 text-white" : "bg-gray-200 text-gray-500"}`}>
                          {aadhaarVerified ? "✓" : "2"}
                        </div>
                        <span className={`mt-2 text-xs font-medium
                          ${aadhaarVerified ? "text-green-600" : 
                            kycStep === "aadhaar" ? "text-teal-600" : "text-gray-500"}`}>
                          Aadhaar OTP
                        </span>
                      </div>

                      <div className={`w-16 h-1 mx-2 rounded
                        ${kycStep === "documents" ? "bg-teal-600" : "bg-gray-200"}`} />

                      {/* Step 3: Documents */}
                      <div className="flex flex-col items-center">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold
                          ${kycStep === "documents" ? "bg-teal-600 text-white" : "bg-gray-200 text-gray-500"}`}>
                          3
                        </div>
                        <span className={`mt-2 text-xs font-medium
                          ${kycStep === "documents" ? "text-teal-600" : "text-gray-500"}`}>
                          Documents
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {/* NEW: Aadhaar Verification Status Banner */}
                {aadhaarVerified && (
                  <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-center">
                      <span className="text-green-500 text-2xl mr-3">✓</span>
                      <div>
                        <p className="font-medium text-green-800">Aadhaar Verified</p>
                        <p className="text-green-600 text-sm">
                          Name: <strong>{aadhaarVerificationData?.aadhaarName || "N/A"}</strong>
                          {aadhaarVerificationData?.nameMatched && (
                            <span className="ml-2 text-xs bg-green-100 px-2 py-0.5 rounded-full">
                              ✓ Matched with DigiLocker
                            </span>
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Status Bar */}
                <div className="flex items-center mb-8 px-5 py-4 bg-gray-50 rounded-lg shadow-inner">
                  <div className="flex items-center flex-wrap gap-2">
                    {kycdata?.data?.status === "approve" && (
                      <button
                        type="button"
                        className="inline-flex items-center px-4 py-2 bg-teal-600 text-white text-sm rounded-lg shadow-sm hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 transition-colors"
                        onClick={handleEditBankDetails}
                      >
                        <img alt="Edit" src={editIcon} className="w-4 h-4 mr-2 filter brightness-0 invert" />
                        Edit Bank Details
                      </button>
                    )}
                    <p className="text-sm flex items-center flex-wrap gap-1">
                      <span className="font-medium">KYC status:</span>
                      <span
                        className="capitalize font-semibold px-2 py-1 rounded-full text-white text-xs inline-flex items-center"
                        style={{
                          backgroundColor:
                            kycdata?.data?.status === "open"
                              ? "#ff8a00"
                              : kycdata?.data?.status === "approve"
                              ? "#00A693"
                              : kycdata?.data?.status === "inprogress"
                              ? "#0077B6"
                              : "#dc3545"
                        }}
                      >
                        {kycdata?.data?.status === "open"
                          ? "In Open"
                          : kycdata?.data?.status === "approve"
                          ? "Approved"
                          : kycdata?.data?.status === "inprogress"
                          ? "In Progress"
                          : kycdata?.data?.status === "reject"
                          ? "Rejected"
                          : "N/A"}
                      </span>
                    </p>
                    {kycdata && kycdata?.data?.status === "reject" && (
                      <p className="text-sm ml-2 sm:ml-4 flex items-center">
                        <span className="font-medium mr-1">Reason:</span>
                        <span className="text-red-500 font-semibold">{kycdata?.data?.reason}</span>
                      </p>
                    )}
                  </div>
                </div>

                {/* NEW: Manual Aadhaar Verification Button (if needed) */}
                {isCountryCodeIndia && 
                  !aadhaarVerified && 
                  kycStep === "aadhaar" && 
                  digilockerName && (
                  <div className="mb-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex flex-col sm:flex-row items-center justify-between">
                      <div className="mb-3 sm:mb-0">
                        <p className="font-medium text-blue-800">Verify Your Aadhaar</p>
                        <p className="text-blue-600 text-sm">
                          Verify your Aadhaar to match with DigiLocker name: <strong>{digilockerName}</strong>
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setShowAadhaarModal(true)}
                        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        Verify Aadhaar
                      </button>
                    </div>
                  </div>
                )}

                {/* Form Sections - Only show when kycStep is "documents" or not India */}
                {(kycStep === "documents" || !isCountryCodeIndia || kycdata?.data?.status === "approve") && (
                  <form className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* ... Your existing form sections ... */}
                    {/* Applicant Information Section */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-5">
                      <div className="bg-teal-600 text-white px-4 py-2.5 rounded-lg mb-5 -mt-8 shadow-md">
                        <h6 className="text-sm font-bold m-0">Applicant Information</h6>
                      </div>

                      <div className="space-y-5">
                        <div>
                          <label htmlFor="applicantName" className="block text-sm font-medium text-gray-700 mb-1.5">
                            Name of the Applicant <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 bg-gray-100 transition-all duration-200"
                            name="applicantName"
                            value={formData.applicantName}
                            onChange={handleChange}
                            disabled
                            readOnly
                          />
                          {errors.applicantName && (
                            <p className="mt-1.5 text-sm text-red-500">{errors.applicantName}</p>
                          )}
                        </div>

                        {isCountryCodeIndia && (
                          <div>
                            <label htmlFor="dob" className="block text-sm font-medium text-gray-700 mb-1.5">
                              Date of Birth <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="text"
                              className="w-full px-4 py-2.5 bg-gray-100 border border-gray-300 rounded-lg"
                              placeholder="Date of Birth"
                              name="dob"
                              value={maskData(formData.dob, 0, 0, 'X')}
                              disabled
                              readOnly
                            />
                            {errors.dob && <p className="mt-1.5 text-sm text-red-500">{errors.dob}</p>}
                          </div>
                        )}

                        <div>
                          <label htmlFor="mobile_number" className="block text-sm font-medium text-gray-700 mb-1.5">
                            Mobile Number (As per Bank) <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            className="w-full bg-transparent border border-gray-300 rounded-lg px-3 py-2 text-gray-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all duration-200"
                            name="mobile_number"
                            placeholder="Enter mobile number"
                            value={
                              focusedInput === "mobile_number"
                                ? formData.mobile_number
                                : maskData(formData.mobile_number, 5, 2)
                            }
                            maxLength={getMaxLength()}
                            disabled={
                              (!enableFields && isCountryCodeIndia) ||
                              kycdata?.data?.status === "open" ||
                              (kycdata?.data?.status === "approve" && !isEditClicked)
                            }
                            onChange={handleChangeMobileNumber}
                            onFocus={(e) => setFocusedInput(e.target.name)}
                            onBlur={() => setFocusedInput(null)}
                            onKeyPress={(event) => {
                              if (!/[0-9]/.test(event.key)) {
                                event.preventDefault();
                              }
                            }}
                            autoComplete="off"
                          />
                          {errors.mobile_number && (
                            <p className="mt-1.5 text-sm text-red-500">{errors.mobile_number}</p>
                          )}
                        </div>

                        <div>
                          <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1.5">
                            Address <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            autoComplete="off"
                            className="w-full bg-transparent border border-gray-300 rounded-lg px-3 py-2 text-gray-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all duration-200"
                            name="address"
                            placeholder="Enter your address"
                            value={
                              focusedInput === "address"
                                ? formData.address
                                : maskData(formData.address)
                            }
                            onChange={handleChange}
                            onFocus={(e) => setFocusedInput(e.target.name)}
                            onBlur={() => setFocusedInput(null)}
                            disabled={
                              (!enableFields && isCountryCodeIndia) ||
                              kycdata?.data?.status === "open" ||
                              (kycdata?.data?.status === "approve" && !isEditClicked)
                            }
                          />
                          {errors.address && (
                            <p className="mt-1.5 text-sm text-red-500">{errors.address}</p>
                          )}
                        </div>
                      </div>
                    </div>
    {/* Document Proofs Section */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-5">
              <div className="bg-teal-600 text-white px-4 py-2.5 rounded-lg mb-5 -mt-8 shadow-md">
                <h6 className="text-sm font-bold m-0">Document Proofs</h6>
              </div>

              <div className="space-y-5">
                <div>
                  <label
                    htmlFor={isCountryCodeIndia ? "aadhar_doc_front" : "dl_doc_front"}
                    className="block text-sm font-medium text-gray-700 mb-1.5 flex items-center flex-wrap"
                  >
                    <span>{isCountryCodeIndia ? "Aadhar" : "Driving License"} Front</span> <span className="text-red-500 mx-1">*</span>
                    {kycdata?.success && (
                      <button
                        type="button"
                        className="ml-2 inline-flex items-center px-2.5 py-1 text-xs rounded-md border border-teal-500 text-teal-600 hover:bg-teal-50 transition-colors"
                        onClick={() =>
                          onClickImage(
                            isCountryCodeIndia
                              ? kycdata.data?.aadhar_doc_front
                              : kycdata.data?.dl_doc_front
                          )
                        }
                      >
                        <img alt="View" src={showIcon} className="w-3 h-3 mr-1.5" /> View
                      </button>
                    )}
                  </label>
                  
                  {/* Styled upload button and preview */}
                  <div className="mb-2">
                    <label 
                      className={`w-full flex flex-col items-center px-4 py-3 bg-white rounded-lg border-2 border-dashed ${
                        previewImages?.doc_front ? 'border-teal-500' : 'border-gray-300'
                      } cursor-pointer hover:bg-gray-50 transition-all duration-200 ${
                        (!enableFields && isCountryCodeIndia) ||
                        kycdata?.data?.status === "open" ||
                        (kycdata?.data?.status == "approve" && !isEditClicked) ? 'opacity-70 pointer-events-none' : ''
                      }`}
                      htmlFor={isCountryCodeIndia ? "aadhar_doc_front" : "dl_doc_front"}
                    >
                      {!previewImages?.doc_front ? (
                        <>
                          <svg className="w-8 h-8 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                          </svg>
                          <span className="mt-2 text-sm text-gray-600">Click to upload document</span>
                          <span className="text-xs text-gray-500 mt-1">JPG, PNG or JPEG</span>
                        </>
                      ) : (
                        <div className="relative w-full">
                          <img 
                            src={previewImages.doc_front} 
                            alt="Document preview" 
                            className="h-32 mx-auto object-contain rounded"
                          />
                          <span className="block mt-2 text-xs text-center text-teal-600">Document uploaded</span>
                        </div>
                      )}
                    </label>
                    <input
                      type="file"
                      accept=".jpg,.jpeg,.png"
                      className="hidden"
                      id={isCountryCodeIndia ? "aadhar_doc_front" : "dl_doc_front"}
                      name={isCountryCodeIndia ? "aadhar_doc_front" : "dl_doc_front"}
                      ref={docFrontRef}
                      onChange={(e) => {
                        handleChange(e);
                        // Preview image after selection
                        if (e.target.files && e.target.files[0]) {
                          const reader = new FileReader();
                          reader.onload = (event) => {
                            setPreviewImages(prev => ({
                              ...prev,
                              doc_front: event.target.result
                            }));
                          };
                          reader.readAsDataURL(e.target.files[0]);
                        }
                      }}
                      disabled={
                        (!enableFields && isCountryCodeIndia) ||
                        kycdata?.data?.status === "open" ||
                        (kycdata?.data?.status == "approve" && !isEditClicked)
                      }
                    />
                  </div>
                  
                  {isCountryCodeIndia
                    ? errors?.aadhar_doc_front && (
                        <p className="mt-1.5 text-sm text-red-500">{errors.aadhar_doc_front}</p>
                      )
                    : errors?.dl_doc_front && (
                        <p className="mt-1.5 text-sm text-red-500">{errors.dl_doc_front}</p>
                      )}
                </div>

                <div>
                  <label
                    htmlFor={isCountryCodeIndia ? "aadhar_doc_back" : "dl_doc_back"}
                    className="block text-sm font-medium text-gray-700 mb-1.5 flex items-center flex-wrap"
                  >
                    <span>{isCountryCodeIndia ? "Aadhar" : "Driving License"} Back</span> <span className="text-red-500 mx-1">*</span>
                    {kycdata?.success && (
                      <button
                        type="button"
                        className="ml-2 inline-flex items-center px-2.5 py-1 text-xs rounded-md border border-teal-500 text-teal-600 hover:bg-teal-50 transition-colors"
                        onClick={() =>
                          onClickImage(
                            isCountryCodeIndia
                              ? kycdata.data?.aadhar_doc_back
                              : kycdata.data?.dl_doc_back
                          )
                        }
                      >
                        <img alt="View" src={showIcon} className="w-3 h-3 mr-1.5" /> View
                      </button>
                    )}
                  </label>
                  
                  {/* Styled upload button and preview */}
                  <div className="mb-2">
                    <label 
                      className={`w-full flex flex-col items-center px-4 py-3 bg-white rounded-lg border-2 border-dashed ${
                        previewImages?.doc_back ? 'border-teal-500' : 'border-gray-300'
                      } cursor-pointer hover:bg-gray-50 transition-all duration-200 ${
                        (!enableFields && isCountryCodeIndia) ||
                        kycdata?.data?.status === "open" ||
                        (kycdata?.data?.status == "approve" && !isEditClicked) ? 'opacity-70 pointer-events-none' : ''
                      }`}
                      htmlFor={isCountryCodeIndia ? "aadhar_doc_back" : "dl_doc_back"}
                    >
                      {!previewImages?.doc_back ? (
                        <>
                          <svg className="w-8 h-8 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                          </svg>
                          <span className="mt-2 text-sm text-gray-600">Click to upload document</span>
                          <span className="text-xs text-gray-500 mt-1">JPG, PNG or JPEG</span>
                        </>
                      ) : (
                        <div className="relative w-full">
                          <img 
                            src={previewImages.doc_back} 
                            alt="Document preview" 
                            className="h-32 mx-auto object-contain rounded"
                          />
                          <span className="block mt-2 text-xs text-center text-teal-600">Document uploaded</span>
                        </div>
                      )}
                    </label>
                    <input
                      type="file"
                      accept=".jpg,.jpeg,.png"
                      className="hidden"
                      id={isCountryCodeIndia ? "aadhar_doc_back" : "dl_doc_back"}
                      name={isCountryCodeIndia ? "aadhar_doc_back" : "dl_doc_back"}
                      ref={docBackRef}
                      onChange={(e) => {
                        handleChange(e);
                        // Preview image after selection
                        if (e.target.files && e.target.files[0]) {
                          const reader = new FileReader();
                          reader.onload = (event) => {
                            setPreviewImages(prev => ({
                              ...prev,
                              doc_back: event.target.result
                            }));
                          };
                          reader.readAsDataURL(e.target.files[0]);
                        }
                      }}
                      disabled={
                        (!enableFields && isCountryCodeIndia) ||
                        kycdata?.data?.status === "open" ||
                        (kycdata?.data?.status == "approve" && !isEditClicked)
                      }
                    />
                  </div>
                  
                  {isCountryCodeIndia
                    ? errors?.aadhar_doc_back && (
                        <p className="mt-1.5 text-sm text-red-500">{errors.aadhar_doc_back}</p>
                      )
                    : errors?.dl_doc_back && (
                        <p className="mt-1.5 text-sm text-red-500">{errors.dl_doc_back}</p>
                      )}
                </div>

                <div>
                  <label
                    htmlFor={isCountryCodeIndia ? "pan_doc_front" : "passport_doc_front"}
                    className="block text-sm font-medium text-gray-700 mb-1.5 flex items-center flex-wrap"
                  >
                    <span>{isCountryCodeIndia ? "PAN" : "Passport Front"}</span> <span className="text-red-500 mx-1">*</span>
                    {kycdata?.success && (
                      <button
                        type="button"
                        className="ml-2 inline-flex items-center px-2.5 py-1 text-xs rounded-md border border-teal-500 text-teal-600 hover:bg-teal-50 transition-colors"
                        onClick={() =>
                          onClickImage(
                            isCountryCodeIndia
                              ? kycdata.data?.pan_doc_front
                              : kycdata.data?.passport_doc_front
                          )
                        }
                      >
                        <img alt="View" src={showIcon} className="w-3 h-3 mr-1.5" /> View
                      </button>
                    )}
                  </label>
                  
                  {/* Styled upload button and preview */}
                  <div className="mb-2">
                    <label 
                      className={`w-full flex flex-col items-center px-4 py-3 bg-white rounded-lg border-2 border-dashed ${
                        previewImages?.doc1_front ? 'border-teal-500' : 'border-gray-300'
                      } cursor-pointer hover:bg-gray-50 transition-all duration-200 ${
                        (!enableFields && isCountryCodeIndia) ||
                        kycdata?.data?.status === "open" ||
                        (kycdata?.data?.status == "approve" && !isEditClicked) ? 'opacity-70 pointer-events-none' : ''
                      }`}
                      htmlFor={isCountryCodeIndia ? "pan_doc_front" : "passport_doc_front"}
                    >
                      {!previewImages?.doc1_front ? (
                        <>
                          <svg className="w-8 h-8 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                          </svg>
                          <span className="mt-2 text-sm text-gray-600">Click to upload document</span>
                          <span className="text-xs text-gray-500 mt-1">JPG, PNG or JPEG</span>
                        </>
                      ) : (
                        <div className="relative w-full">
                          <img 
                            src={previewImages.doc1_front} 
                            alt="Document preview" 
                            className="h-32 mx-auto object-contain rounded"
                          />
                          <span className="block mt-2 text-xs text-center text-teal-600">Document uploaded</span>
                        </div>
                      )}
                    </label>
                    <input
                      type="file"
                      accept=".jpg,.jpeg,.png"
                      className="hidden"
                      id={isCountryCodeIndia ? "pan_doc_front" : "passport_doc_front"}
                      name={isCountryCodeIndia ? "pan_doc_front" : "passport_doc_front"}
                      ref={doc1FrontRef}
                      onChange={(e) => {
                        handleChange(e);
                        // Preview image after selection
                        if (e.target.files && e.target.files[0]) {
                          const reader = new FileReader();
                          reader.onload = (event) => {
                            setPreviewImages(prev => ({
                              ...prev,
                              doc1_front: event.target.result
                            }));
                          };
                          reader.readAsDataURL(e.target.files[0]);
                        }
                      }}
                      disabled={
                        (!enableFields && isCountryCodeIndia) ||
                        kycdata?.data?.status === "open" ||
                        (kycdata?.data?.status == "approve" && !isEditClicked)
                      }
                    />
                  </div>
                  
                  {isCountryCodeIndia
                    ? errors.pan_doc_front && (
                        <p className="mt-1.5 text-sm text-red-500">{errors.pan_doc_front}</p>
                      )
                    : errors.passport_doc_front && (
                        <p className="mt-1.5 text-sm text-red-500">{errors.passport_doc_front}</p>
                      )}
                </div>

                {!isCountryCodeIndia && (
                  <div>
                    <label htmlFor="passport_doc_back" className="block text-sm font-medium text-gray-700 mb-1.5 flex items-center flex-wrap">
                      <span>Passport Back</span> <span className="text-red-500 mx-1">*</span>
                      {kycdata?.success && (
                        <button
                          type="button"
                          className="ml-2 inline-flex items-center px-2.5 py-1 text-xs rounded-md border border-teal-500 text-teal-600 hover:bg-teal-50 transition-colors"
                          onClick={() =>
                            onClickImage(kycdata.data?.passport_doc_back)
                          }
                        >
                          <img alt="View" src={showIcon} className="w-3 h-3 mr-1.5" /> View
                        </button>
                      )}
                    </label>
                    
                    {/* Styled upload button and preview */}
                    <div className="mb-2">
                      <label 
                        className={`w-full flex flex-col items-center px-4 py-3 bg-white rounded-lg border-2 border-dashed ${
                          previewImages?.doc1_back ? 'border-teal-500' : 'border-gray-300'
                        } cursor-pointer hover:bg-gray-50 transition-all duration-200 ${
                          (!enableFields && isCountryCodeIndia) ||
                          kycdata?.data?.status === "open" ||
                          (kycdata?.data?.status == "approve" && !isEditClicked) ? 'opacity-70 pointer-events-none' : ''
                        }`}
                        htmlFor="passport_doc_back"
                      >
                        {!previewImages?.doc1_back ? (
                          <>
                            <svg className="w-8 h-8 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                            </svg>
                            <span className="mt-2 text-sm text-gray-600">Click to upload document</span>
                            <span className="text-xs text-gray-500 mt-1">JPG, PNG or JPEG</span>
                          </>
                        ) : (
                          <div className="relative w-full">
                            <img 
                              src={previewImages.doc1_back} 
                              alt="Document preview" 
                              className="h-32 mx-auto object-contain rounded"
                            />
                            <span className="block mt-2 text-xs text-center text-teal-600">Document uploaded</span>
                          </div>
                        )}
                      </label>
                      <input
                        type="file"
                        accept=".jpg,.jpeg,.png"
                        className="hidden"
                        id="passport_doc_back"
                        name="passport_doc_back"
                        ref={doc1BackRef}
                        onChange={(e) => {
                          handleChange(e);
                          // Preview image after selection
                          if (e.target.files && e.target.files[0]) {
                            const reader = new FileReader();
                            reader.onload = (event) => {
                              setPreviewImages(prev => ({
                                ...prev,
                                doc1_back: event.target.result
                              }));
                            };
                            reader.readAsDataURL(e.target.files[0]);
                          }
                        }}
                        disabled={
                          (!enableFields && isCountryCodeIndia) ||
                          kycdata?.data?.status === "open" ||
                          (kycdata?.data?.status == "approve" && !isEditClicked)
                        }
                      />
                    </div>
                    
                    {errors.passport_doc_back && (
                      <p className="mt-1.5 text-sm text-red-500">{errors.passport_doc_back}</p>
                    )}
                  </div>
                )}

                {isCountryCodeIndia && (
                  <div>
                    <label htmlFor="panNumber" className="block text-sm font-medium text-gray-700 mb-1.5">
                      PAN Number <span className="text-red-500">*</span>
                    </label>
                    <input
                          type="text"
                          className="form-control shadow-none bg-transparent"
                          name="panNumber"
                          placeholder="Enter PAN number"
                          // ***** CORRECTED: Conditional masking *****
                          value={
                            focusedInput === "panNumber"
                              ? formData.panNumber
                              : maskData(formData.panNumber)
                          }
                          onChange={handleChange}
                          onFocus={(e) => setFocusedInput(e.target.name)}
                          onBlur={() => setFocusedInput(null)}
                          disabled={
                            (!enableFields && isCountryCodeIndia) ||
                            disableFieldsAfterKYC ||
                            kycdata?.data?.status === "open" ||
                            (kycdata?.data?.status === "approve" && !isEditClicked)
                          }
                        />
                    {errors.panNumber && (
                      <p className="mt-1.5 text-sm text-red-500">{errors.panNumber}</p>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Bank Details Section */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-5">
              <div className="bg-teal-600 text-white px-4 py-2.5 rounded-lg mb-5 -mt-8 shadow-md">
                <h6 className="text-sm font-bold m-0">Bank Details</h6>
              </div>

              <div className="space-y-5">
                {isCountryCodeIndia && (
                  <div>
                    <label htmlFor="upi_id" className="block text-sm font-medium text-gray-700 mb-1.5">
                      UPI Number
                    </label>
                    <input
                          type="text"
                          autoComplete="off"
                          className=" w-full
    bg-transparent
    border border-gray-300
    rounded-lg
    px-3 py-2
    text-gray-800
    focus:border-blue-500
    focus:ring-2
    focus:ring-blue-200
    outline-none
    transition-all
    duration-200"
                          name="upi_id"
                          placeholder="Enter UPI ID"
                          // ***** CORRECTED: Conditional masking *****
                          value={
                            focusedInput === "upi_id"
                              ? formData.upi_id
                              : maskData(formData.upi_id, 3, 4)
                          }
                          onChange={handleChange}
                          onFocus={(e) => setFocusedInput(e.target.name)}
                          onBlur={() => setFocusedInput(null)}
                          disabled={
                            (!enableFields && isCountryCodeIndia) ||
                            kycdata?.data?.status === "open" ||
                            (kycdata?.data?.status === "approve" && !isEditClicked)
                          }
                        />
                    {errors.upi_id && (
                      <p className="mt-1.5 text-sm text-red-500">{errors.upi_id}</p>
                    )}
                  </div>
                )}

                <div>
                  <label htmlFor="bank_account" className="block text-sm font-medium text-gray-700 mb-1.5">
                    Bank Account Number <span className="text-red-500">*</span>
                  </label>
                   <input
                        type="text"
                        autoComplete="off"
                        className=" w-full
    bg-transparent
    border border-gray-300
    rounded-lg
    px-3 py-2
    text-gray-800
    focus:border-blue-500
    focus:ring-2
    focus:ring-blue-200
    outline-none
    transition-all
    duration-200"
                        name="bank_account"
                        placeholder="Enter bank account number"
                        // ***** CORRECTED: Conditional masking *****
                        value={
                          focusedInput === "bank_account"
                            ? formData.bank_account
                            : maskData(formData.bank_account)
                        }
                        onChange={handleChange}
                        onFocus={(e) => setFocusedInput(e.target.name)}
                        onBlur={() => setFocusedInput(null)}
                        disabled={
                          (!enableFields && isCountryCodeIndia) ||
                          kycdata?.data?.status === "open" ||
                          (kycdata?.data?.status === "approve" && !isEditClicked)
                        }
                        onKeyPress={(event) => {
                          if (!/[0-9]/.test(event.key)) {
                            event.preventDefault();
                          }
                        }}
                      />
                  {errors.bank_account && (
                    <p className="mt-1.5 text-sm text-red-500">{errors.bank_account}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="bank_name" className="block text-sm font-medium text-gray-700 mb-1.5">
                    Bank Name <span className="text-red-500">*</span>
                  </label>
                   <input
                        type="text"
                        autoComplete="off"
                        className=" w-full
    bg-transparent
    border border-gray-300
    rounded-lg
    px-3 py-2
    text-gray-800
    focus:border-blue-500
    focus:ring-2
    focus:ring-blue-200
    outline-none
    transition-all
    duration-200"
                        name="bank_name"
                        placeholder="Enter bank name"
                        value={formData.bank_name} // No masking for bank name
                        onChange={handleChange}
                        disabled={
                          (!enableFields && isCountryCodeIndia) ||
                          kycdata?.data?.status === "open" ||
                          (kycdata?.data?.status === "approve" && !isEditClicked)
                        }
                      />
                  {errors.bank_name && (
                    <p className="mt-1.5 text-sm text-red-500">{errors.bank_name}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="ifsc_code" className="block text-sm font-medium text-gray-700 mb-1.5">
                    Bank {isCountryCodeIndia && "IFSC"} Code <span className="text-red-500">*</span>
                  </label>
                 <input
                        type="text"
                        autoComplete="off"
                        className=" w-full
    bg-transparent
    border border-gray-300
    rounded-lg
    px-3 py-2
    text-gray-800
    focus:border-blue-500
    focus:ring-2
    focus:ring-blue-200
    outline-none
    transition-all
    duration-200"
                        name="ifsc_code"
                        placeholder="Enter bank code"
                        // ***** CORRECTED: Conditional masking and uppercase *****
                        value={toUpperCase(
                          focusedInput === "ifsc_code"
                            ? formData.ifsc_code
                            : maskData(formData.ifsc_code)
                        )}
                        onChange={handleChange}
                        onFocus={(e) => setFocusedInput(e.target.name)}
                        onBlur={() => setFocusedInput(null)}
                        disabled={
                          (!enableFields && isCountryCodeIndia) ||
                          kycdata?.data?.status === "open" ||
                          (kycdata?.data?.status === "approve" && !isEditClicked)
                        }
                      />
                  {errors.ifsc_code && (
                    <p className="mt-1.5 text-sm text-red-500">{errors.ifsc_code}</p>
                  )}
                </div>
              </div>
            </div>
                    
                  </form>
                )}

                {/* Waiting for Aadhaar Verification Message */}
                {isCountryCodeIndia && 
                  kycStep === "aadhaar" && 
                  !aadhaarVerified && 
                  kycdata?.data?.status !== "approve" && (
                  <div className="text-center py-12 bg-gray-50 rounded-lg">
                    <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-10 h-10 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" 
                        />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                      Aadhaar Verification Required
                    </h3>
                    <p className="text-gray-600 mb-6">
                      Please verify your Aadhaar to proceed with document upload
                    </p>
                    <button
                      type="button"
                      onClick={() => setShowAadhaarModal(true)}
                      className="px-8 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors font-medium"
                    >
                      Verify Aadhaar Now
                    </button>
                    <button
                      type="button"
                      onClick={handleSkipAadhaarVerification}
                      className="block mx-auto mt-4 text-gray-500 hover:text-gray-700 text-sm underline"
                    >
                      Skip for now
                    </button>
                  </div>
                )}

                {/* Buttons Section */}
                {(kycStep === "documents" || !isCountryCodeIndia) && (
                  <div className="flex justify-end mt-8">
                    {kycdata?.success !== 1 && (
                      <button
                        type="button"
                        className="px-8 py-3 bg-teal-600 text-white text-sm font-medium rounded-lg shadow-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 transition-all duration-200 transform hover:-translate-y-0.5"
                        onClick={handleSubmit}
                      >
                        Submit KYC Information
                      </button>
                    )}
                    {(kycdata?.data?.status == "reject" ||
                      (kycdata?.data?.status == "approve" && isEditClicked)) && (
                      <button
                        type="button"
                        className="px-8 py-3 bg-teal-600 text-white text-sm font-medium rounded-lg shadow-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 transition-all duration-200 transform hover:-translate-y-0.5"
                        onClick={handleSubmit}
                      >
                        Update KYC Information
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* DigiLocker Modal */}
        {showModal && (
          <DigiLockerModal
            show={showModal}
            onHide={() => setShowModal(false)}
            onClickDigiLocker={handleButtonClick}
          />
        )}

        {/* Bank Details Modal */}
        <BankDetailsModal
          show={showBankModal}
          onClose={() => setShowBankModal(false)}
          bankDetails={{
            bank_name: formData.bank_name,
            ifsc_code: formData.ifsc_code,
            bank_account: formData.bank_account,
            upi_id: formData.upi_id
          }}
          onSubmit={handleBankDetailsUpdate}
          isCountryCodeIndia={isCountryCodeIndia}
          loading={loading}
        />

        {/* NEW: Aadhaar Verification Modal */}
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
    </div>


  );
};

export default KycInformation;