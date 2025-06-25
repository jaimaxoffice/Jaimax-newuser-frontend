

import React, { useContext, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import CryptoJS from "crypto-js";
import { useUserDataQuery } from '../dashBoard/DashboardApliSlice';
import { useKycaddMutation, useGetkycDetailsQuery, useGetKycDataMutation } from './kycApiSlice';
import { Eye, Edit3, Upload, CheckCircle, XCircle, Clock, AlertCircle } from 'lucide-react';
import countryCodes from "../../../../Authentication/countryCodes.json";

const getValidationSchema = (isCountryCodeIndia, kycSuccess) => {
  return Yup.object().shape({
    applicantName: Yup.string()
      .min(2, 'Name must be at least 2 characters')
      .required('The applicant name field is mandatory.'),
    
    dob: isCountryCodeIndia 
      ? Yup.string().required('Date of birth is required') 
      : Yup.string(),
    
    mobile_number: Yup.string()
      .test('mobile-validation', 'The mobile number field is mandatory.', function(value) {
        if (!value) return false;
        const countryCode = this.parent.countryCode || 91;
        const prefix = `+${countryCode} `;
        return value.replace(prefix, '').trim().length > 0;
      }),
    
    address: Yup.string()
      .min(5, 'Address must be at least 5 characters')
      .required('The address field is mandatory.'),
    
    bank_name: Yup.string()
      .matches(/^[a-zA-Z\s]*$/, 'Bank name should only contain letters')
      .required('The bank name field is mandatory.'),
    
    ifsc_code: Yup.string()
      .matches(/^[a-zA-Z0-9]*$/, 'Invalid IFSC code format')
      .required(`The ${isCountryCodeIndia ? 'ifsc' : 'bank'} code field is mandatory.`),
    
    bank_account: Yup.string()
      .matches(/^\d+$/, 'Account number should only contain numbers')
      .required('The bank account field is mandatory.'),
    
    panNumber: isCountryCodeIndia 
      ? Yup.string()
          .matches(/^[a-zA-Z0-9]*$/, 'Invalid PAN format')
          .length(10, 'PAN must be 10 characters')
          .required('PAN number is required') 
      : Yup.string(),
    
    upi_id: isCountryCodeIndia 
      ? Yup.string().matches(/^[0-9]*$/, 'UPI should only contain numbers') 
      : Yup.string(),
    aadhar_doc_front: (kycSuccess !== 1 && isCountryCodeIndia) 
      ? Yup.mixed().required('The Aadhar doc front field is mandatory.') 
      : Yup.mixed(),
    
    aadhar_doc_back: (kycSuccess !== 1 && isCountryCodeIndia) 
      ? Yup.mixed().required('The Aadhar doc back field is mandatory.') 
      : Yup.mixed(),
    
    pan_doc_front: (kycSuccess !== 1 && isCountryCodeIndia) 
      ? Yup.mixed().required('The Pan doc front field is mandatory.') 
      : Yup.mixed(),
    
    dl_doc_front: (kycSuccess !== 1 && !isCountryCodeIndia) 
      ? Yup.mixed().required('The Driving License doc front field is mandatory.') 
      : Yup.mixed(),
    
    dl_doc_back: (kycSuccess !== 1 && !isCountryCodeIndia) 
      ? Yup.mixed().required('The Driving License doc back field is mandatory.') 
      : Yup.mixed(),
    
    passport_doc_front: (kycSuccess !== 1 && !isCountryCodeIndia) 
      ? Yup.mixed().required('The Passport doc front field is mandatory.') 
      : Yup.mixed(),
    
    passport_doc_back: (kycSuccess !== 1 && !isCountryCodeIndia) 
      ? Yup.mixed().required('The Passport doc back field is mandatory.') 
      : Yup.mixed(),
  });
};

const KycInformation = () => {
  const { data: userData } = useUserDataQuery();
  const location = useLocation();

  const isCountryCodeIndia = userData && userData?.data?.countryCode === 91;

  const [submitKyc] = useKycaddMutation();
  const [getKycData] = useGetKycDataMutation();
  const [loading, setLoading] = useState(false);
  const [enableFields, setEnableFields] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [disableFieldsAfterKYC, setDisableFieldsAfterKYC] = useState(false);
  const [isEditClicked, setIsEditClicked] = useState(false);

  const { data: kycdata, isLoading, refetch } = useGetkycDetailsQuery();

  const docFrontRef = useRef(null);
  const doc1FrontRef = useRef(null);
  const docBackRef = useRef(null);
  const doc1BackRef = useRef(null);

  // Initial form values
  const getInitialValues = () => ({
    aadhar_doc_front: null,
    aadhar_doc_back: null,
    pan_doc_front: null,
    dl_doc_front: null,
    dl_doc_back: null,
    passport_doc_front: null,
    passport_doc_back: null,
    bank_name: kycdata?.data?.bank_name || "",
    applicantName: kycdata?.data?.name || userData?.data?.name || "",
    ifsc_code: kycdata?.data?.ifsc_code || "",
    mobile_number: kycdata?.data?.mobile_number 
      ? `+${userData?.data?.countryCode} ${kycdata?.data?.mobile_number}`
      : `+${userData?.data?.countryCode || 91} `,
    upi_id: kycdata?.data?.upi_id || "",
    bank_account: kycdata?.data?.bank_account || "",
    address: kycdata?.data?.address || "",
    dob: kycdata?.data?.dob || "",
    panNumber: kycdata?.data?.panNumber || "",
    countryCode: userData?.data?.countryCode || 91
  });

  const getCountryName = () => {
    const countryCode = `+${userData?.data?.countryCode}`;
    const countryName = countryCodes.find(
      (country) => country.country_code == countryCode
    );
    return countryName?.country_name || "NA";
  };

  const getMaxLength = () => {
    return isCountryCodeIndia ? 14 : 19;
  };

  const getStatusColor = (status) => {
    const colors = {
      approve: 'text-green-500',
      reject: 'text-red-500',
      open: 'text-orange-500',
      inprogress: 'text-blue-500'
    };
    return colors[status] || 'text-gray-500';
  };

  const getStatusIcon = (status) => {
    const icons = {
      approve: <CheckCircle className="w-4 h-4 text-green-500" />,
      reject: <XCircle className="w-4 h-4 text-red-500" />,
      open: <AlertCircle className="w-4 h-4 text-orange-500" />,
      inprogress: <Clock className="w-4 h-4 text-blue-500" />
    };
    return icons[status] || <Clock className="w-4 h-4 text-gray-500" />;
  };

  const getStatusText = (status) => {
    const texts = {
      approve: 'Approved',
      reject: 'Rejected',
      open: 'In Open',
      inprogress: 'In Progress'
    };
    return texts[status] || 'N/A';
  };

  // Custom file input component
  const CustomFileInput = ({ field, form, label, accept = ".jpg,.jpeg,.png", disabled, showImageUrl, refProp, ...props }) => {
    const handleFileChange = (event) => {
      const file = event.currentTarget.files[0];
      if (file) {
        const acceptedFormats = ["image/png", "image/jpeg", "image/jpg"];
        const invalidFile = !acceptedFormats.includes(file.type);
        
        if (invalidFile) {
          toast.warning("Only JPG / PNG files are allowed", {
            position: "top-center",
          });
          if (refProp?.current) {
            refProp.current.value = "";
          }
          return;
        }
        
        form.setFieldValue(field.name, file);
      }
    };

    return (
      <div className="mb-4">
        <label className="block text-white text-xs font-medium mb-1.5">
          {label} <span className="text-red-400">*</span>
          {showImageUrl && (
            <button
              type="button"
              className="ml-1 inline-flex items-center text-[#1d8e85] hover:text-[#1d8e85]/80 transition-colors"
            >
              {/* <Eye className="w-3 h-3" /> */}
            </button>
          )}
        </label>
        <div className={`relative border border-dashed rounded-md p-1 transition-all duration-200 ${
          disabled 
            ? 'border-gray-600 bg-gray-800 cursor-not-allowed' 
            : 'border-gray-600 hover:border-[#1d8e85] bg-transparent cursor-pointer'
        }`}>

          <input
            type="file"
            accept={accept}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            name={field.name}
            ref={refProp}
            onChange={handleFileChange}
            disabled={disabled}
            {...props}
          />
        </div>
        <ErrorMessage name={field.name} component="p" className="text-red-400 text-xs mt-1" />
      </div>
    );
  };

  // Custom input component
  const CustomInput = ({ field, form, label, disabled, maxLength, onKeyPress, ...props }) => {
    return (
      <div className="mb-4">
        <label className="block text-white text-xs font-medium mb-1.5">
          {label} <span className="text-red-400">*</span>
        </label>
        <input
          {...field}
          {...props}
          className={`w-full px-3 py-2 text-sm rounded-md border transition-all duration-200 ${
            disabled 
              ? 'bg-gray-800 border-gray-600 text-gray-400 cursor-not-allowed' 
              : 'bg-transparent border-gray-600 text-white focus:border-[#1d8e85] focus:ring-1 focus:ring-[#1d8e85]/20'
          } focus:outline-none`}
          disabled={disabled}
          maxLength={maxLength}
          onKeyPress={onKeyPress}
          autoComplete="off"
        />
        <ErrorMessage name={field.name} component="p" className="text-red-400 text-xs mt-1" />
      </div>
    );
  };

  // Handle form submission
  const handleSubmit = async (values, { setSubmitting, setFieldError }) => {
    setLoading(true);
    try {
      const data = new FormData();

      // Handle file uploads based on KYC status and country
      if (kycdata?.success !== 1) {
        if (isCountryCodeIndia) {
          data.append("aadhar_doc_front", values.aadhar_doc_front);
          data.append("aadhar_doc_back", values.aadhar_doc_back);
          data.append("pan_doc_front", values.pan_doc_front);
          data.append("upi_id", values.upi_id);
          data.append("panNumber", values.panNumber);
          data.append("dob", values.dob);
        } else {
          data.append("dl_doc_front", values.dl_doc_front);
          data.append("dl_doc_back", values.dl_doc_back);
          data.append("passport_doc_front", values.passport_doc_front);
          data.append("passport_doc_back", values.passport_doc_back);
        }
      } else {
        // Handle updates for existing KYC
        if (docFrontRef.current?.value) {
          if (isCountryCodeIndia) {
            data.append("aadhar_doc_front", values.aadhar_doc_front);
          } else {
            data.append("dl_doc_front", values.dl_doc_front);
          }
        }
        if (docBackRef.current?.value) {
          if (isCountryCodeIndia) {
            data.append("aadhar_doc_back", values.aadhar_doc_back);
          } else {
            data.append("dl_doc_back", values.dl_doc_back);
          }
        }
        if (doc1FrontRef.current?.value) {
          if (isCountryCodeIndia) {
            data.append("pan_doc_front", values.pan_doc_front);
          } else {
            data.append("passport_doc_front", values.passport_doc_front);
          }
        }
        if (doc1BackRef?.current?.value) {
          if (!isCountryCodeIndia) {
            data.append("passport_doc_back", values.passport_doc_back);
          }
        }
        if (isCountryCodeIndia) {
          data.append("upi_id", values.upi_id);
          data.append("panNumber", values.panNumber);
          data.append("dob", values.dob);
        }
      }

      // Add common fields
      data.append("name", values.applicantName);
      data.append("bank_name", values.bank_name);
      data.append("ifsc_code", values.ifsc_code);
      
      if (values.mobile_number.startsWith(`+${userData?.data?.countryCode} `)) {
        data.append(
          "mobile_number",
          values.mobile_number.replace(`+${userData?.data?.countryCode} `, "")
        );
      }
      
      data.append("bank_account", values.bank_account);
      data.append("address", values.address);

      const response = await submitKyc(data);

      if (response?.data?.status_code === 200) {
        toast.success(response?.data.message, {
          position: "top-center",
        });
        refetch();
      } else {
        toast?.error(response?.error?.data?.message, {
          position: "top-center",
        });
      }
    } catch (error) {
      toast.error(error.message, {
        position: "top-center",
      });
    } finally {
      setLoading(false);
      setSubmitting(false);
    }
  };

  // Generate code verifier and challenge for DigiLocker
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
    try {
      const verifier = await generateCodeVerifier();
      const challenge = await generateCodeChallenge(verifier);
      
      let origin = window.location.origin;
      let redirectURI = "http://localhost:3000/kyc"; // Default for development
      let clientId = "your-client-id"; // Replace with actual client ID
      
      if (origin && (origin.includes("5173") || origin.includes("5174"))) {
        redirectURI = process.env.DL_REDIRECT_URI_DEV;
        clientId = process.env.DL_CLIENT_ID_DEV;
      } else if (window.location.origin === "https://jaimax.com") {
        redirectURI = process.env.DL_REDIRECT_URI_PROD;
        clientId = process.env.DL_CLIENT_ID_PROD;
      } else {
        redirectURI = process.env.DL_REDIRECT_URI_QA;
        clientId = process.env.DL_CLIENT_ID_QA;
      }

      localStorage.setItem("verifier", verifier);
      localStorage.removeItem("processed");
      
      const apiUrl = new URL(`https://digilocker.meripehchaan.gov.in/public/oauth2/1/authorize?response_type=code&client_id=${clientId}&state=oidc_flow&redirect_uri=${redirectURI}&code_challenge=${challenge}&code_challenge_method=S256&dl_flow=signin&acr=pan+aadhaar+mobile&amr=pan+all+aadhaar&scope=files.issueddocs+files.uploadeddocs&pla=Y`);
      
      window.open(apiUrl.toString(), "_self");
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const onClickEdit = () => {
    setIsEditClicked(true);
  };

  // Handle DigiLocker response
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

      setLoading(true);
      const postTokenRequest = async () => {
        try {
          const response = await getKycData(payload).unwrap();
          if (response.data) {
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
  }, [getKycData]);

  useEffect(() => {
    refetch();
  }, [refetch]);

  useEffect(() => {
    if (kycdata?.success == 1) {
      setEnableFields(true);
      setDisableFieldsAfterKYC(true);
      
      if (isCountryCodeIndia && kycdata?.data?.status === "reject" && !(isLoading || loading)) {
        setShowModal(true);
      } else {
        setShowModal(false);
      }
    } else {
      if (isCountryCodeIndia && !(isLoading || loading)) {
        setShowModal(true);
      }
    }
  }, [userData, kycdata, isLoading, loading, isCountryCodeIndia]);

  const isFieldDisabled = (fieldType = 'normal') => {
    const baseDisabled = (!enableFields && isCountryCodeIndia) || 
                        kycdata?.data?.status === "open" || 
                        (kycdata?.data?.status == "approve" && !isEditClicked);
    
    if (fieldType === 'pan') {
      return baseDisabled || disableFieldsAfterKYC;
    }
    
    return baseDisabled;
  };

  if (isLoading || loading) {
    return (
      <div className="min-h-screen bg-[#1d8e85] flex items-center justify-center">
        <div className="bg-gray-800/90 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-gray-700">
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
            <div className="text-center">
              <h3 className="text-white font-semibold mb-1">Loading...</h3>
              <p className="text-gray-300 text-sm">Please wait while we load your KYC information</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#1d8e85] py-6">
      <div className="container mx-auto px-4">
        <div className="bg-gray-800/90 backdrop-blur-sm rounded-2xl shadow-2xl border border-gray-700">
          {/* Header */}
          <div className="p-5 border-b border-gray-700">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <h1 className="text-xl lg:text-2xl font-bold text-white">
                  KYC Information
                </h1>
                {kycdata?.data?.status !== "approve" && (
                  <p className="text-xs text-gray-300 bg-gray-700/50 px-2 py-1 rounded-full">
                    Fill up information and verify your KYC
                  </p>
                )}
              </div>
              
              <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                <div className="bg-white/10 border border-white/20 px-3 py-1.5 rounded-lg">
                  <span className="text-white text-xs font-medium">
                    Country: <span className="text-white font-semibold">
                      {!userData?.data?.country || userData?.data?.country === "N/A"
                        ? getCountryName()
                        : userData?.data?.country}
                    </span>
                  </span>
                </div>
                
                {isCountryCodeIndia &&
                  ((kycdata?.data?.status !== "open" &&
                    kycdata?.data?.status !== "approve") ||
                    (kycdata?.data?.status == "approve" &&
                      isEditClicked)) && (
                  <button
                    onClick={handleButtonClick}
                    className="bg-white hover:bg-white/90 text-[#1d8e85] px-4 py-1.5 rounded-lg font-medium transition-all duration-200 shadow-lg hover:shadow-xl text-sm"
                  >
                    DigiLocker
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Status Section */}
          <div className="p-5 border-b border-gray-700">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center gap-3 flex-wrap">
                {kycdata?.data?.status === "approve" && (
                  <button
                    onClick={onClickEdit}
                    className="flex items-center gap-1.5 text-white hover:text-white/80 transition-colors"
                  >
                    <Edit3 className="w-3 h-3" />
                    <span className="text-xs font-medium">Edit</span>
                  </button>
                )}
                
                <div className="flex items-center gap-2">
                  {getStatusIcon(kycdata?.data?.status)}
                  <span className="text-white font-medium text-sm">KYC Status:</span>
                  <span className={`font-bold text-sm ${getStatusColor(kycdata?.data?.status)}`}>
                    {getStatusText(kycdata?.data?.status)}
                  </span>
                </div>
                
                {kycdata?.data?.status === "reject" && (
                  <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/30 px-2 py-1 rounded-lg">
                    <span className="text-white text-xs">Reason:</span>
                    <span className="text-red-400 font-medium text-xs">{kycdata?.data?.reason}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Form */}
          <Formik
            initialValues={getInitialValues()}
            validationSchema={getValidationSchema(isCountryCodeIndia, kycdata?.success)}
            onSubmit={handleSubmit}
            enableReinitialize={true}
          >
            {({ values, setFieldValue, isSubmitting }) => (
              <Form className="p-5">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  
                  {/* Applicant Info */}
                  <div className="space-y-4">
                    <div className="border-l-3 border-white pl-3">
                      <h2 className="text-lg font-bold text-white mb-4">Applicant Info</h2>
                    </div>
                    
                    <Field
                      name="applicantName"
                      component={CustomInput}
                      label="Name of the Applicant"
                      disabled={true}
                    />
                    
                    {isCountryCodeIndia && (
                      <Field
                        name="dob"
                        component={CustomInput}
                        label="Date of Birth"
                        disabled={true}
                        type="date"
                      />
                    )}
                    
                    <Field name="mobile_number">
                      {({ field, form }) => (
                        <CustomInput
                          field={field}
                          form={form}
                          label="Mobile Number (As per Bank)"
                          placeholder="Enter mobile number"
                          maxLength={getMaxLength()}
                          disabled={isFieldDisabled()}
                          onKeyPress={(event) => {
                            if (!/[0-9]/.test(event.key)) {
                              event.preventDefault();
                            }
                          }}
                          onChange={(e) => {
                            const value = e.target.value;
                            if (value.startsWith(`+${userData?.data?.countryCode} `)) {
                              form.setFieldValue(field.name, value);
                            }
                          }}
                        />
                      )}
                    </Field>
                    
                    <Field
                      name="address"
                      component={CustomInput}
                      label="Address"
                      placeholder="Enter your address"
                      disabled={isFieldDisabled()}
                    />
                  </div>

                  {/* Applicant Proofs */}
                  <div className="space-y-4">
                    <div className="border-l-3 border-white pl-3">
                      <h2 className="text-lg font-bold text-white mb-4">Applicant Proofs</h2>
                    </div>
                    
                    <Field
                      name={isCountryCodeIndia ? "aadhar_doc_front" : "dl_doc_front"}
                      component={CustomFileInput}
                      label={`${isCountryCodeIndia ? "Aadhar" : "Driving License"} Front`}
                      disabled={isFieldDisabled()}
                      showImageUrl={
                        kycdata?.success &&
                        (isCountryCodeIndia
                          ? kycdata.data?.aadhar_doc_front
                          : kycdata.data?.dl_doc_front)
                      }
                      refProp={docFrontRef}
                    />
                    
                    <Field
                      name={isCountryCodeIndia ? "aadhar_doc_back" : "dl_doc_back"}
                      component={CustomFileInput}
                      label={`${isCountryCodeIndia ? "Aadhar" : "Driving License"} Back`}
                      disabled={isFieldDisabled()}
                      showImageUrl={
                        kycdata?.success &&
                        (isCountryCodeIndia
                          ? kycdata.data?.aadhar_doc_back
                          : kycdata.data?.dl_doc_back)
                      }
                      refProp={docBackRef}
                    />
                    
                    <Field
                      name={isCountryCodeIndia ? "pan_doc_front" : "passport_doc_front"}
                      component={CustomFileInput}
                      label={isCountryCodeIndia ? "PAN" : "Passport Front"}
                      disabled={isFieldDisabled()}
                      showImageUrl={
                        kycdata?.success &&
                        (isCountryCodeIndia
                          ? kycdata.data?.pan_doc_front
                          : kycdata.data?.passport_doc_front)
                      }
                      refProp={doc1FrontRef}
                    />
                    
                    {!isCountryCodeIndia && (
                      <Field
                        name="passport_doc_back"
                        component={CustomFileInput}
                        label="Passport Back"
                        disabled={isFieldDisabled()}
                        showImageUrl={kycdata?.success && kycdata.data?.passport_doc_back}
                        refProp={doc1BackRef}
                      />
                    )}
                    
                    {isCountryCodeIndia && (
                      <Field name="panNumber">
                        {({ field, form }) => (
                          <CustomInput
                            field={field}
                            form={form}
                            label="PAN Number"
                            placeholder="Enter PAN number"
                            disabled={isFieldDisabled('pan')}
                            onChange={(e) => {
                              const value = e.target.value.replace(/[^a-zA-Z0-9]/g, '');
                              form.setFieldValue(field.name, value.toUpperCase());
                            }}
                            maxLength="10"
                          />
                        )}
                      </Field>
                    )}
                  </div>

                  {/* Bank Details */}
                  <div className="space-y-4">
                    <div className="border-l-3 border-white pl-3">
                      <h2 className="text-lg font-bold text-white mb-4">Bank Details</h2>
                    </div>
                    
                    {isCountryCodeIndia && (
                      <Field name="upi_id">
                        {({ field, form }) => (
                          <CustomInput
                            field={field}
                            form={form}
                            label="UPI Number"
                            placeholder="Enter UPI number"
                            disabled={isFieldDisabled()}
                            onChange={(e) => {
                              const value = e.target.value.replace(/[^0-9]/g, '');
                              form.setFieldValue(field.name, value);
                            }}
                          />
                        )}
                      </Field>
                    )}
                    
                    <Field name="bank_account">
                      {({ field, form }) => (
                        <CustomInput
                          field={field}
                          form={form}
                          label="Bank Account Number"
                          placeholder="Enter bank account number"
                          disabled={isFieldDisabled()}
                          onKeyPress={(event) => {
                            if (!/[0-9]/.test(event.key)) {
                              event.preventDefault();
                            }
                          }}
                        />
                      )}
                    </Field>
                    
                    <Field name="bank_name">
                      {({ field, form }) => (
                        <CustomInput
                          field={field}
                          form={form}
                          label="Bank Name"
                          placeholder="Enter bank name"
                          disabled={isFieldDisabled()}
                          onChange={(e) => {
                            const value = e.target.value.replace(/[^a-zA-Z\s]/g, '');
                            form.setFieldValue(field.name, value);
                          }}
                        />
                      )}
                    </Field>
                    
                    <Field name="ifsc_code">
                      {({ field, form }) => (
                        <CustomInput
                          field={field}
                          form={form}
                          label={`Bank ${isCountryCodeIndia ? "IFSC" : ""} Code`}
                          placeholder="Enter bank code"
                          disabled={isFieldDisabled()}
                          onChange={(e) => {
                            const value = e.target.value.replace(/[^a-zA-Z0-9]/g, '');
                            form.setFieldValue(field.name, value.toUpperCase());
                          }}
                        />
                      )}
                    </Field>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="mt-6 flex justify-end">
                  {kycdata?.success !== 1 && (
                    <button
                      type="submit"
                      disabled={isSubmitting || loading}
                      className={`px-6 py-2 rounded-lg font-semibold text-sm transition-all duration-200 transform hover:scale-105 ${
                        (isSubmitting || loading)
                          ? 'bg-gray-600 cursor-not-allowed text-gray-300'
                          : 'bg-white hover:bg-white/90 text-[#1d8e85] shadow-lg hover:shadow-xl'
                      }`}
                    >
                      {(isSubmitting || loading) ? (
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 border-2 border-gray-400/30 border-t-gray-400 rounded-full animate-spin"></div>
                          Processing...
                        </div>
                      ) : (
                        'Submit'
                      )}
                    </button>
                  )}
                  {(kycdata?.data?.status == "reject" ||
                    (kycdata?.data?.status == "approve" && isEditClicked)) && (
                    <button
                      type="submit"
                      disabled={isSubmitting || loading}
                      className={`px-6 py-2 rounded-lg font-semibold text-sm transition-all duration-200 transform hover:scale-105 ${
                        (isSubmitting || loading)
                          ? 'bg-gray-600 cursor-not-allowed text-gray-300'
                          : 'bg-white hover:bg-white/90 text-[#1d8e85] shadow-lg hover:shadow-xl'
                      }`}
                    >
                      {(isSubmitting || loading) ? (
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 border-2 border-gray-400/30 border-t-gray-400 rounded-full animate-spin"></div>
                          Processing...
                        </div>
                      ) : (
                        'Update'
                      )}
                    </button>
                  )}
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-gray-800 rounded-2xl shadow-2xl border border-gray-700 max-w-md w-full">
            <div className="p-5 border-b border-gray-700">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-white">DigiLocker Integration</h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <XCircle className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div className="p-5">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-[#1d8e85]/10 rounded-full flex items-center justify-center">
                  <Upload className="w-5 h-5 text-[#1d8e85]" />
                </div>
                <div>
                  <h4 className="text-white font-medium text-sm">Auto-fill KYC Data</h4>
                  <p className="text-gray-400 text-xs">Fetch verified documents from DigiLocker</p>
                </div>
              </div>
              <p className="text-gray-300 mb-5 text-sm">
                Would you like to fetch your KYC data from DigiLocker to auto-fill the form? This will help you complete the process faster with verified documents.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-3 py-2 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors font-medium text-sm"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    setShowModal(false);
                    handleButtonClick();
                  }}
                  className="flex-1 px-3 py-2 bg-[#1d8e85] text-white rounded-lg hover:bg-[#1d8e85]/90 transition-colors font-medium text-sm"
                >
                  Fetch Data
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Loading Overlay */}
      {loading && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-2xl p-8 shadow-2xl border border-gray-700">
            <div className="flex flex-col items-center gap-4">
              <div className="w-12 h-12 border-4 border-[#1d8e85]/30 border-t-[#1d8e85] rounded-full animate-spin"></div>
              <div className="text-center">
                <h3 className="text-white font-semibold mb-1">Processing...</h3>
                <p className="text-gray-400 text-sm">Please wait while we process your request</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default KycInformation;