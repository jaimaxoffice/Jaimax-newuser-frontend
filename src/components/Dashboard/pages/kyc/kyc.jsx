import React, { useRef, useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CryptoJS from 'crypto-js';
import MyContext from '../../../../Authentication/authContext';
import { useKycaddMutation, useGetkycDetailsQuery, useGetKycDataMutation } from './kycApiSlice';
import { useUserDataQuery } from '../../../Dashboard/pages/dashBoard/DashboardApliSlice';
import countryCodes from '../../../../Authentication/countryCodes.json';
import digiLocker from "../../../../assets/digilocker.jpg";
import DigiLockerModal from './DigiLockerModal';

import Loader from '../../../Loader/loader';
const KycInformation = () => {
  const { data } = MyContext(MyContext);
  const { data: userData } = useUserDataQuery();

  const isCountryCodeIndia = userData && userData?.data?.countryCode === 91;

  const [submitKyc] = useKycaddMutation();
  const [getKycData] = useGetKycDataMutation();
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [enableFields, setEnableFields] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [disableFieldsAfterKYC, setDisableFieldsAfterKYC] = useState(false);
  const location = useLocation();

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
    return text.toUpperCase();
  };

  const getCountryName = () => {
    const countryCode = `+${userData?.data?.countryCode}`;
    const countryName = countryCodes.find(
      (country) => country.country_code == countryCode
    );
    return countryName?.country_name || "NA";
  };

  /**
   * This method is used to change the input fields & also check the files format
   * @param {*} e
   */
  const handleChange = (e) => {
    const { name, value, files } = e.target;

    // Validate IFSC Code
    if (name === "ifsc_code" && !/^[a-zA-Z0-9]*$/.test(value)) {
      return;
    }
    if (name === "panNumber" && !/^[a-zA-Z0-9]*$/.test(value)) {
      return;
    }
    if (name === "upi_id" && !/^[0-9]*$/.test(value)) {
      return;
    }

    // Validate Bank Name: Allow only alphabetic characters (a-z, A-Z)
    if (name === "bank_name" && !/^[a-zA-Z\s]*$/.test(value)) {
      return;
    }

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

  /**
   * This method will return the maxlength including country code based on the user's country code
   * @return {*}
   */
  const getMaxLength = () => {
    let maxLength = 0;
    if (isCountryCodeIndia) {
      maxLength = 14;
    } else {
      maxLength = 19;
    }
    return maxLength;
  };

  /**
   * This method is used to check the mobile number after prefix
   * @param {*} input
   */
  const checkTextAfterPrefix = (input) => {
    let splitString = input.split(`+${userData?.data?.countryCode} `);
    return !splitString[1]?.trim().length > 0;
  };

  const handleSubmit = async () => {
    const newErrors = {};
    if (kycdata?.success !== 1) {
      if (isCountryCodeIndia && !formData.aadhar_doc_front)
        newErrors.aadhar_doc_front = "The Aadhar doc front field is mandatory.";
      if (isCountryCodeIndia && !formData.aadhar_doc_back)
        newErrors.aadhar_doc_back = "The Aadhar doc back field is mandatory.";
      if (isCountryCodeIndia && !formData.pan_doc_front)
        newErrors.pan_doc_front = "The Pan doc front field is mandatory.";
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

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    const data = new FormData();
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
    } else {
      if (docFrontRef.current?.value) {
        if (isCountryCodeIndia) {
          data.append("aadhar_doc_front", formData.aadhar_doc_front);
        } else {
          data.append("dl_doc_front", formData.dl_doc_front);
        }
      }
      if (docBackRef.current?.value) {
        if (isCountryCodeIndia) {
          data.append("aadhar_doc_back", formData.aadhar_doc_back);
        } else {
          data.append("dl_doc_back", formData.dl_doc_back);
        }
      }
      if (doc1FrontRef.current?.value) {
        if (isCountryCodeIndia) {
          data.append("pan_doc_front", formData.pan_doc_front);
        } else {
          data.append("passport_doc_front", formData.passport_doc_front);
        }
      }

      if (doc1BackRef?.current?.value) {
        if (!isCountryCodeIndia) {
          data.append("passport_doc_back", formData.passport_doc_back);
        }
      }
      if (isCountryCodeIndia) {
        data.append("upi_id", formData.upi_id);
        data.append("panNumber", formData.panNumber);
        data.append("dob", formData.dob);
      }
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
        toast.success(response?.data.message, {
          position: "top-center",
        });
        refetch();
        setErrors({});
      } else {
        toast?.error(response?.error?.data?.message, {
          position: "top-center",
        });
        setErrors({});
      }
    } catch (error) {
      toast.error(error.message, {
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
      bank_name: "",
      applicantName: userData?.data?.name,
      ifsc_code: "",
      mobile_number: `+${userData?.data?.countryCode} `,
      upi_id: "",
      bank_account: "",
      address: "",
    });
    if (docFrontRef.current) docFrontRef.current.value = null;
    if (doc1FrontRef.current) doc1FrontRef.current.value = null;
    if (docBackRef.current) docBackRef.current.value = null;
    if (!isCountryCodeIndia && doc1BackRef.current) {
      doc1BackRef.current.value = "";
    }
  };

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const extractedCode = queryParams.get("code");
    // Remove all query parameters from the URL
    const newUrl =
      window.location.protocol +
      "//" +
      window.location.host +
      window.location.pathname;
    window.history.replaceState(null, "", newUrl);
    if (extractedCode && !localStorage.getItem("processed")) {
      localStorage.setItem("processed", "true"); // Guard condition

      const payload = {
        code: extractedCode,
        verifier: localStorage.getItem("verifier"),
      };

      localStorage.setItem("code", extractedCode);
      setLoading(true);
      const postTokenRequest = async () => {
        try {
          const response = await getKycData(payload).unwrap();
          console.log(response, "res");
          if (response.data) {
            setFormData((prev) => ({
              ...prev,
              applicantName: response.data.name,
              mobile_number: `+91 ${response.data.mobile}`,
              address: response.data.address,
              dob: response.data.dob,
              panNumber: response.data.panNumber,
            }));
            setEnableFields(true);
            setDisableFieldsAfterKYC(true);
            setIsEditClicked(true);
            setShowModal(false);
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
  }, [getKycData, location.search]);

  useEffect(() => {
    refetch();
  }, [refetch]);

  useEffect(() => {
    if (kycdata?.success == 1) {
      setEnableFields(true);
      setDisableFieldsAfterKYC(true);
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
        mobile_number:
          `${`+${userData?.data?.countryCode} `}${kycdata?.data?.mobile_number
          }` || "",
        upi_id: kycdata?.data?.upi_id || "",
        bank_account: kycdata?.data?.bank_account || "",
        address: kycdata?.data?.address || "",
        dob: kycdata?.data.dob || "",
        panNumber: kycdata?.data.panNumber || "",
      });
      console.log(kycdata?.data?.name, "kycdata");
      if (
        isCountryCodeIndia &&
        kycdata?.data?.status === "reject" &&
        !(isLoading || loading)
      ) {
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
  }, [userData, kycdata, isLoading, loading, isCountryCodeIndia]);

  /**
   * This method is used to show the image
   * @param {*} imageURL
   */
  const onClickImage = (imageURL) => {
    const link = document.createElement("a");
    link.href = imageURL;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.click();
  };

  /**
   * This method is used to update the state to edit the fields when the status is approve
   */
  const onClickEdit = () => {
    setIsEditClicked(true);
  };

  /**
   * Function to generate the code verifier
   * @return {*}
   */
  const generateCodeVerifier = async () => {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~";
    const length = Math.floor(Math.random() * (128 - 43 + 1)) + 43; // Random length between 43 and 128
    let verifier = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      verifier += characters[randomIndex];
    }
    return verifier;
  };

  const generateCodeChallenge = (verifier) => {
    console.log("generateCodeChallenge");

    // Hash the verifier using SHA-256
    const hash = CryptoJS.SHA256(verifier);

    // Convert the hash to Base64 and make it URL-safe
    const base64Url = CryptoJS.enc.Base64.stringify(hash)
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "");

    return base64Url;
  };
  const handleButtonClick = async () => {
    console.log("handleButtonClick");
    setLoading(true);
    setErrors({});

    try {
      // Step 1: Generate code verifier
      const verifier = await generateCodeVerifier();
      localStorage.removeItem("processed");

      // Step 2: Generate code challenge
      const challenge = await generateCodeChallenge(verifier);
      console.log("challenge", challenge);
      console.log("window.location.origin", window.location.origin);

      let origin = window.location.origin;
      let redirectURI;
      let clientId;

      // Fixed environment configuration - replace with your actual values
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

      // Step 3: Construct the URL with query parameters (FIXED)
      const apiUrl = new URL(`https://digilocker.meripehchaan.gov.in/public/oauth2/1/authorize?response_type=code
&client_id=${clientId}&state=oidc_flow&
redirect_uri=${redirectURI}&
code_challenge=${challenge}&
code_challenge_method=S256&dl_flow=signin&acr=pan+aadhaar+mobile 
&amr=pan+all+aadhaar&scope=files.issueddocs+files.uploadeddocs&pla=Y`);

      console.log("Final URL:", apiUrl);

      // Step 4: Open the API URL in the same tab
      window.open(apiUrl, "_self");
    } catch (err) {
      console.error("Error in handleButtonClick:", err);
      setErrors(err.message);
      toast.error(err.message, {
        position: "top-center",
      });
    } finally {
      setLoading(false);
    }
  };


  const isFieldDisabled = () => {
    return (!enableFields && isCountryCodeIndia) ||
      kycdata?.data?.status === "open" ||
      (kycdata?.data?.status === "approve" && !isEditClicked);
  };

  const getKYCStatusDisplay = () => {
    const status = kycdata?.data?.status;
    let statusText = "Pending Verification";
    let statusColor = "orange";

    if (status === "approve") {
      statusText = "Approved";
      statusColor = "green";
    } else if (status === "reject") {
      statusText = "Rejected";
      statusColor = "red";
    } else if (status === "inprogress") {
      statusText = "In Progress";
      statusColor = "blue";
    } else if (status === "open") {
      statusText = "In Open";
      statusColor = "orange";
    }

    return { statusText, statusColor };
  };

  const { statusText, statusColor } = getKYCStatusDisplay();

  // Input Field Component
  const InputField = ({ label, name, value, onChange, onBlur, placeholder, type = 'text', required = false, error, disabled = false, maxLength, onKeyPress, readOnly = false }) => (
    <div className="mb-4 relative">
      <label htmlFor={name} className="block text-gray-700 text-sm font-medium mb-2">
        {label}{required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        onKeyPress={onKeyPress}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        readOnly={readOnly}
        maxLength={maxLength}
        autoComplete="off"
        className={`w-full p-3 text-sm border-2 rounded-lg text-gray-800 placeholder-gray-400
                   shadow-sm transition-all duration-300 ease-in-out
                   ${disabled || readOnly ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'}
                   focus:ring-2 focus:ring-teal-400 focus:border-teal-400 focus:outline-none
                   ${error ? 'border-red-400 focus:ring-red-400 focus:border-red-400' : 'border-gray-200 hover:border-teal-300'}`}
      />
      {error && (
        <p className="mt-1 text-xs text-red-500 font-medium flex items-center">
          <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {error}
        </p>
      )}
    </div>
  );

  // File Input Component
  const FileInput = ({ label, name, onFileChange, required = false, error, disabled = false, showImageButton = false, onShowImage, inputRef, accept = "image/jpeg,image/png,image/jpg" }) => {
    const [fileName, setFileName] = useState('No file chosen');

    const handleButtonClick = () => {
      if (!disabled && inputRef?.current) {
        inputRef.current.click();
      }
    };

    const handleFileSelect = (event) => {
      const file = event.target.files[0];
      if (file) {
        setFileName(file.name);
        onFileChange(event);
      } else {
        setFileName('No file chosen');
      }
    };

    return (
      <div className="mb-4">
        <label htmlFor={name} className="block text-gray-700 text-sm font-medium mb-2">
          {label}{required && <span className="text-red-500 ml-1">*</span>}
          {showImageButton && (
            <button
              type="button"
              className="ml-2 text-teal-600 hover:text-teal-800"
              onClick={onShowImage}
            >
              👁️ View
            </button>
          )}
        </label>
        <div className={`flex flex-col sm:flex-row sm:items-center gap-3 p-3 border-2 rounded-lg border-dashed transition-all duration-300 
                        ${disabled ? 'bg-gray-100 border-gray-200' : 'hover:border-teal-400 hover:bg-teal-50/30'}
                        ${error ? 'border-red-300 bg-red-50/30' : 'border-gray-300 bg-gray-50/30'}`}>
          <button
            type="button"
            onClick={handleButtonClick}
            disabled={disabled}
            className={`px-4 py-2 rounded-lg shadow-sm text-sm font-medium transition-all duration-300 ease-in-out
                       whitespace-nowrap flex-shrink-0 flex items-center gap-2
                       ${disabled
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-gradient-to-r from-teal-500 to-teal-600 text-white hover:from-teal-600 hover:to-teal-700 hover:shadow-md active:shadow-inner active:from-teal-700 active:to-teal-800 transform active:scale-95'
              }
                       ${error && !disabled ? 'from-red-500 to-red-600 hover:from-red-600 hover:to-red-700' : ''}`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            Choose File
          </button>
          <div className="flex-1 min-w-0">
            <span className={`text-sm truncate block ${error ? 'text-red-600' : 'text-gray-600'} 
                             ${fileName !== 'No file chosen' ? 'font-medium' : 'font-normal'}`}>
              {fileName}
            </span>
            <span className="text-xs text-gray-400 mt-1 block">
              Supported: JPG, PNG (Max 5MB)
            </span>
          </div>
          <input
            type="file"
            id={name}
            name={name}
            ref={inputRef}
            onChange={handleFileSelect}
            className="hidden"
            disabled={disabled}
            accept={accept}
          />
        </div>
        {error && (
          <p className="mt-2 text-xs text-red-500 font-medium flex items-center">
            <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {error}
          </p>
        )}
      </div>
    );
  };

  // Section Card Component
  const SectionCard = ({ title, icon, children, className = "" }) => (
    <div className={`bg-white rounded-xl border-2 border-gray-200 shadow-sm hover:shadow-md hover:border-teal-300 transition-all duration-300 ${className}`}>
      <div className="px-6 py-4 border-b border-gray-100 bg-gradient-to-r from-teal-50 to-teal-100">
        <div className="flex items-center gap-3">
          <span className="text-2xl">{icon}</span>
          <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        </div>
      </div>
      <div className="p-6">
        {children}
      </div>
    </div>
  );

  return (


    <div className="min-h-screen bg-[#1d8d84] py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
                KYC Information
              </h1>
              <p className="text-gray-600">
                {kycdata?.data?.status !== "approve" && "Fill up information and verify your KYC."}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="flex items-center text-gray-700 font-medium">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Country: {!userData?.data?.country || userData?.data?.country === "N/A" ? getCountryName() : userData?.data?.country}
              </div>
              {isCountryCodeIndia && ((kycdata?.data?.status !== "open" && kycdata?.data?.status !== "approve") || (kycdata?.data?.status == "approve" && isEditClicked)) && (
                <button
                  type="button"
                  onClick={handleButtonClick}
                  disabled={loading}
                  className="w-16 h-16 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-xs hover:bg-blue-700 transition-colors disabled:opacity-50"
                >
                  <img src={digiLocker} alt="DigiLocker" className="w-8 h-8" />
                </button>
              )}
            </div>
          </div>

          {/* KYC Status */}
          <div className="flex justify-between items-center mt-6">
            <div className="flex items-center gap-4">
              {kycdata?.data?.status === "approve" && (
                <button
                  type="button"
                  onClick={onClickEdit}
                  className="flex items-center gap-2 text-blue-600 hover:text-blue-800"
                >
                  <img src={editIcon} alt="Edit" className="w-4 h-4" />
                  Edit
                </button>
              )}
              <div className="inline-flex items-center px-4 py-2 rounded-full" style={{ backgroundColor: `${statusColor === 'green' ? '#dcfce7' : statusColor === 'red' ? '#fee2e2' : statusColor === 'blue' ? '#dbeafe' : '#fed7aa'}` }}>
                <div className={`w-2 h-2 rounded-full mr-2 ${statusColor === 'green' ? 'bg-green-500' : statusColor === 'red' ? 'bg-red-500' : statusColor === 'blue' ? 'bg-blue-500' : 'bg-orange-500'} ${statusColor === 'orange' ? 'animate-pulse' : ''}`}></div>
                <span className={`font-medium ${statusColor === 'green' ? 'text-green-700' : statusColor === 'red' ? 'text-red-700' : statusColor === 'blue' ? 'text-blue-700' : 'text-orange-700'}`}>
                  KYC Status: {statusText}
                </span>
              </div>
              {kycdata?.data?.status === "reject" && kycdata?.data?.reason && (
                <div className="text-red-600 font-medium">
                  Reason: {kycdata.data.reason}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Section 1: Personal Information */}
            <SectionCard title="Applicant Info" icon="👤">
              <div className="space-y-4">
                <InputField
                  label="Name of the Applicant"
                  name="applicantName"
                  type="text"
                  value={formData.applicantName || ''}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  error={errors.applicantName}
                  disabled={true}
                  readOnly={true}
                  required
                />
                {isCountryCodeIndia && (
                  <InputField
                    label="Date of Birth"
                    name="dob"
                    type="text"
                    value={formData.dob || ''}
                    onChange={handleChange}
                    placeholder="Date of Birth"
                    error={errors.dob}
                    disabled={true}
                    readOnly={true}
                    required
                  />
                )}
                <InputField
                  label="Mobile Number (As per Bank)"
                  name="mobile_number"
                  type="tel"
                  value={formData.mobile_number || ''}
                  onChange={handleChangeMobileNumber}
                  placeholder="Enter mobile number"
                  error={errors.mobile_number}
                  disabled={isFieldDisabled()}
                  maxLength={getMaxLength()}
                  onKeyPress={(event) => {
                    if (!/[0-9]/.test(event.key)) {
                      event.preventDefault();
                    }
                  }}
                  required
                />
                <InputField
                  label="Address"
                  name="address"
                  type="text"
                  value={formData.address || ''}
                  onChange={handleChange}
                  placeholder="Enter your complete address"
                  error={errors.address}
                  disabled={isFieldDisabled()}
                  required
                />
              </div>
            </SectionCard>

            {/* Section 2: Document Upload */}
            <SectionCard title="Applicant Proofs" icon="📄">
              <div className="space-y-4">
                <FileInput
                  label={`${isCountryCodeIndia ? "Aadhar" : "Driving License"} Front`}
                  name={isCountryCodeIndia ? "aadhar_doc_front" : "dl_doc_front"}
                  onFileChange={handleChange}
                  error={isCountryCodeIndia ? errors.aadhar_doc_front : errors.dl_doc_front}
                  disabled={isFieldDisabled()}
                  showImageButton={!!(kycdata?.success && (kycdata?.data?.aadhar_doc_front || kycdata?.data?.dl_doc_front))}
                  onShowImage={() => onClickImage(isCountryCodeIndia ? kycdata?.data?.aadhar_doc_front : kycdata?.data?.dl_doc_front)}
                  inputRef={docFrontRef}
                  accept=".jpg,.jpeg,.png"
                  required
                />
                <FileInput
                  label={`${isCountryCodeIndia ? "Aadhar" : "Driving License"} Back`}
                  name={isCountryCodeIndia ? "aadhar_doc_back" : "dl_doc_back"}
                  onFileChange={handleChange}
                  error={isCountryCodeIndia ? errors.aadhar_doc_back : errors.dl_doc_back}
                  disabled={isFieldDisabled()}
                  showImageButton={!!(kycdata?.success && (kycdata?.data?.aadhar_doc_back || kycdata?.data?.dl_doc_back))}
                  onShowImage={() => onClickImage(isCountryCodeIndia ? kycdata?.data?.aadhar_doc_back : kycdata?.data?.dl_doc_back)}
                  inputRef={docBackRef}
                  accept=".jpg,.jpeg,.png"
                  required
                />
                <FileInput
                  label={isCountryCodeIndia ? "PAN" : "Passport Front"}
                  name={isCountryCodeIndia ? "pan_doc_front" : "passport_doc_front"}
                  onFileChange={handleChange}
                  error={isCountryCodeIndia ? errors.pan_doc_front : errors.passport_doc_front}
                  disabled={isFieldDisabled()}
                  showImageButton={!!(kycdata?.success && (kycdata?.data?.pan_doc_front || kycdata?.data?.passport_doc_front))}
                  onShowImage={() => onClickImage(isCountryCodeIndia ? kycdata?.data?.pan_doc_front : kycdata?.data?.passport_doc_front)}
                  inputRef={doc1FrontRef}
                  accept=".jpg,.jpeg,.png"
                  required
                />
                {!isCountryCodeIndia && (
                  <FileInput
                    label="Passport Back"
                    name="passport_doc_back"
                    onFileChange={handleChange}
                    error={errors.passport_doc_back}
                    disabled={isFieldDisabled()}
                    showImageButton={!!(kycdata?.success && kycdata?.data?.passport_doc_back)}
                    onShowImage={() => onClickImage(kycdata?.data?.passport_doc_back)}
                    inputRef={doc1BackRef}
                    accept=".jpg,.jpeg,.png"
                    required
                  />
                )}
                {isCountryCodeIndia && (
                  <InputField
                    label="PAN Number"
                    name="panNumber"
                    type="text"
                    value={formData.panNumber || ''}
                    onChange={handleChange}
                    placeholder="Enter PAN number"
                    error={errors.panNumber}
                    disabled={isFieldDisabled() || disableFieldsAfterKYC}
                    required
                  />
                )}
              </div>
            </SectionCard>

            {/* Section 3: Banking Details */}
            <SectionCard title="Bank Details" icon="🏦">
              <div className="space-y-4">
                {isCountryCodeIndia && (
                  <InputField
                    label="UPI Number"
                    name="upi_id"
                    type="text"
                    value={formData.upi_id || ''}
                    onChange={handleChange}
                    placeholder="Enter UPI number"
                    error={errors.upi_id}
                    disabled={isFieldDisabled()}
                    onKeyPress={(event) => {
                      if (!/[0-9]/.test(event.key)) {
                        event.preventDefault();
                      }
                    }}
                  />
                )}
                <InputField
                  label="Bank Account Number"
                  name="bank_account"
                  type="text"
                  value={formData.bank_account || ''}
                  onChange={handleChange}
                  placeholder="Enter bank account number"
                  error={errors.bank_account}
                  disabled={isFieldDisabled()}
                  onKeyPress={(event) => {
                    if (!/[0-9]/.test(event.key)) {
                      event.preventDefault();
                    }
                  }}
                  required
                />
                <InputField
                  label="Bank Name"
                  name="bank_name"
                  type="text"
                  value={formData.bank_name || ''}
                  onChange={handleChange}
                  placeholder="Enter bank name"
                  error={errors.bank_name}
                  disabled={isFieldDisabled()}
                  required
                />
                <InputField
                  label={`Bank ${isCountryCodeIndia ? "IFSC" : ""} Code`}
                  name="ifsc_code"
                  type="text"
                  value={toUpperCase(formData.ifsc_code || '')}
                  onChange={handleChange}
                  placeholder="Enter bank code"
                  error={errors.ifsc_code}
                  disabled={isFieldDisabled()}
                  required
                />
              </div>
            </SectionCard>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            {(kycdata?.success !== 1 || kycdata?.data?.status === "reject" || (kycdata?.data?.status === "approve" && isEditClicked)) && (
              <button
                type="submit"
                disabled={loading}
                className="px-12 py-4 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-full font-semibold text-lg
                             shadow-lg hover:from-teal-600 hover:to-teal-700 hover:shadow-xl 
                             transform hover:scale-105 transition-all duration-300 ease-in-out
                             disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none
                             flex items-center gap-3"
              >
                {loading && (
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                )}
                {loading
                  ? 'Processing...'
                  : (kycdata?.success !== 1 ? 'Submit' : 'Update')
                }
                {!loading && (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </button>
            )}
          </div>
        </form>

        {/* DigiLocker Modal */}
        {showModal && (
          <DigiLockerModal
            show={showModal}
            onHide={() => setShowModal(false)}
            onClickDigiLocker={handleButtonClick}
          />
        )}

        {/* Loading Overlay */}
        {(loading || isLoading) && <Loader />}
      </div>
    </div>

  );
};

export default KycInformation;