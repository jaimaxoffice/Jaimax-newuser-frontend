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
import AadhaarVerification from "./AadhaarVerificationModal";
import {
  useGetKycDataMutation,
  useGetkycDetailsQuery,
  useKycaddMutation,
  useUpdateBankDetailsMutation,
  useSaveKycDraftMutation,
  useGetKycDraftQuery,
  useDeleteKycDraftMutation,
  useExtendKycDraftExpiryMutation,
} from "./kycApiSlice";
import Loader from "../../../../ReusableComponents/Loader/loader";

const StepIndicator = ({ steps, currentStep, completedSteps }) => {
  return (
    <div className="w-full px-4 py-6">
      <div className="flex justify-between items-center relative">
        <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-full h-1 bg-gray-200"></div>
        <div 
          className="absolute left-0 top-1/2 transform -translate-y-1/2 h-1 bg-teal-500 transition-all duration-300"
          style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
        ></div>
        {steps.map((step, index) => {
          const stepNumber = index + 1;
          const isActive = currentStep === stepNumber;
          const isCompleted = completedSteps.includes(stepNumber);
          const isPastStep = currentStep > stepNumber;
          
          return (
            <div key={index} className="relative z-10 flex flex-col items-center">
              <div 
                className={`
                  w-12 h-12 rounded-full flex items-center justify-center font-semibold text-sm
                  transition-all duration-300 
                  ${isActive ? 'bg-teal-600 text-white ring-4 ring-teal-100' : 
                    isCompleted || isPastStep ? 'bg-teal-500 text-white' : 
                    'bg-gray-200 text-gray-600'}
                `}
              >
                {isCompleted || isPastStep ? (
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                ) : (
                  stepNumber
                )}
              </div>
              <span className={`
                mt-2 text-xs font-medium text-center absolute -bottom-6 whitespace-nowrap
                ${isActive ? 'text-teal-600' : 
                  isCompleted || isPastStep ? 'text-teal-500' : 
                  'text-gray-500'}
              `}>
                {step.title}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const KycInformation = () => {
  const { data: userData } = useUserDataQuery();
  const isCountryCodeIndia = userData && userData?.data?.countryCode === 91;
  const [draftLoading, setDraftLoading] = useState(false);
  const [submitKyc] = useKycaddMutation();
  const [getKycData] = useGetKycDataMutation();
  const [updateBankDetails] = useUpdateBankDetailsMutation();
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [enableFields, setEnableFields] = useState(false);
  const [showBankModal, setShowBankModal] = useState(false);
  const [disableFieldsAfterKYC, setDisableFieldsAfterKYC] = useState(false);
  const [focusedInput, setFocusedInput] = useState(null);
  const [showDraftModal, setShowDraftModal] = useState(false);
  const [draftExpiryTime, setDraftExpiryTime] = useState(null);
  const [digiLockerApiData, setDigiLockerApiData] = useState(null);
  const [aadhaarVerificationData, setAadhaarVerificationData] = useState({
    tempId: null,
    isVerified: false,
    aadhaarNumber: null,
  });
  const [saveKycDraft] = useSaveKycDraftMutation();
  const { data: kycDraftData, refetch: refetchDraft } = useGetKycDraftQuery();
  const [deleteKycDraft] = useDeleteKycDraftMutation();
  const [extendKycDraftExpiry] = useExtendKycDraftExpiryMutation();
  
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState([]);
  const [isDraftLoading, setIsDraftLoading] = useState(false);
const [isInitializing, setIsInitializing] = useState(true);


  const [stepData, setStepData] = useState({
    step1: { completed: false, data: {} },
    step2: { completed: false, data: {} },
    step3: { completed: false, data: {} },
    step4: { completed: false, data: {} },
    step5: { completed: false, data: {} }
  });

  const steps = isCountryCodeIndia ? [
    { id: 1, title: "DigiLocker" },
    { id: 2, title: "Aadhaar " },
    { id: 3, title: "Personal Info" },
    { id: 4, title: "Document " },
    { id: 5, title: "Bank Details" }
  ] : [
    { id: 1, title: "Identity Verification" },
    { id: 2, title: "Personal Information" },
    { id: 3, title: "Document Upload" },
    { id: 4, title: "Bank Details" }
  ];

  const location = useLocation();

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

  // Auto-save draft function
  const autoSaveDraft = async () => {
    if (kycdata?.success) return;
    if (currentStep === 1 && !digiLockerApiData && !stepData.step1?.completed) return;

    try {
      const digiLockerDataToSave = digiLockerApiData || stepData.step1?.data || null;
      
      const draftData = {
        currentStep: currentStep,
        completedSteps: completedSteps,
        stepData: stepData,
        digiLockerApiData: digiLockerDataToSave,
        formData: {
          applicantName: formData.applicantName,
          mobile_number: formData.mobile_number?.replace(`+${userData?.data?.countryCode} `, "") || "",
          address: formData.address,
          dob: formData.dob,
          panNumber: formData.panNumber,
          bank_name: formData.bank_name,
          ifsc_code: formData.ifsc_code,
          bank_account: formData.bank_account,
          upi_id: formData.upi_id,
          aadhar_doc_front: !!formData.aadhar_doc_front,
          aadhar_doc_back: !!formData.aadhar_doc_back,
          pan_doc_front: !!formData.pan_doc_front,
          dl_doc_front: !!formData.dl_doc_front,
          dl_doc_back: !!formData.dl_doc_back,
          passport_doc_front: !!formData.passport_doc_front,
          passport_doc_back: !!formData.passport_doc_back,
        },
        aadhaarVerificationData: {
          tempId: aadhaarVerificationData.tempId,
          isVerified: aadhaarVerificationData.isVerified,
          aadhaarNumber: aadhaarVerificationData.aadhaarNumber,
          name: aadhaarVerificationData.name,
          dob: aadhaarVerificationData.dob,
          address: aadhaarVerificationData.address,
          gender: aadhaarVerificationData.gender,
        },
      };

      console.log("Saving draft with digiLockerApiData:", draftData.digiLockerApiData);
      await saveKycDraft(draftData).unwrap();
    } catch (error) {
      console.error("Auto-save draft failed:", error);
    }
  };

  // Sync digiLockerApiData state with stepData.step1.data
  useEffect(() => {
    if (
      (!digiLockerApiData || Object.keys(digiLockerApiData).length === 0) && 
      stepData.step1?.data && 
      Object.keys(stepData.step1.data).length > 0 &&
      stepData.step1.data.name
    ) {
      console.log("Syncing digiLockerApiData from stepData.step1.data:", stepData.step1.data);
      setDigiLockerApiData(stepData.step1.data);
    }
  }, [stepData.step1?.data, digiLockerApiData]);

  // Handle loading draft
const handleLoadDraft = async () => {
  if (kycDraftData?.data) {
    setDraftLoading(true);
    
    try {
      const draft = kycDraftData.data;
      
      console.log("=== Loading Draft ===");
      console.log("Full draft data:", draft);
      console.log("Draft currentStep:", draft.currentStep);
      console.log("Draft completedSteps:", draft.completedSteps);
      
      const digiLockerData = draft.digiLockerApiData || draft.stepData?.step1?.data || null;
      
      // Set ALL state synchronously first
      const newStepData = draft.stepData || stepData;
      const newCompletedSteps = draft.completedSteps || [];
      const targetStep = draft.currentStep || 1;
      
      // IMPORTANT: Set currentStep FIRST before other states
      // This prevents the component from re-rendering with step 1
      
      // Batch all state updates together
      setStepData(newStepData);
      setCompletedSteps(newCompletedSteps);
      
      // Set DigiLocker data if available
      if (digiLockerData && Object.keys(digiLockerData).length > 0) {
        setDigiLockerApiData(digiLockerData);
      }
      
      // Restore form data
      setFormData(prev => ({
        ...prev,
        applicantName: draft.formData?.applicantName || digiLockerData?.name || prev.applicantName,
        mobile_number: draft.formData?.mobile_number 
          ? `+${userData?.data?.countryCode} ${draft.formData.mobile_number}` 
          : (digiLockerData?.mobile ? `+91 ${digiLockerData.mobile}` : prev.mobile_number),
        address: draft.formData?.address || digiLockerData?.address || prev.address,
        dob: draft.formData?.dob || digiLockerData?.dob || prev.dob,
        panNumber: draft.formData?.panNumber || 
                   digiLockerData?.panNumber || 
                   digiLockerData?.pan || 
                   digiLockerData?.panNo ||
                   prev.panNumber,
        bank_name: draft.formData?.bank_name || prev.bank_name,
        ifsc_code: draft.formData?.ifsc_code || prev.ifsc_code,
        bank_account: draft.formData?.bank_account || prev.bank_account,
        upi_id: draft.formData?.upi_id || prev.upi_id,
      }));
      
      // Restore Aadhaar verification data
      if (draft.aadhaarVerificationData) {
        setAadhaarVerificationData({
          tempId: draft.aadhaarVerificationData.tempId || null,
          isVerified: draft.aadhaarVerificationData.isVerified || false,
          aadhaarNumber: draft.aadhaarVerificationData.aadhaarNumber || null,
          name: draft.aadhaarVerificationData.name || null,
          dob: draft.aadhaarVerificationData.dob || null,
          address: draft.aadhaarVerificationData.address || null,
          gender: draft.aadhaarVerificationData.gender || null,
        });
        
        if (draft.aadhaarVerificationData.isVerified) {
          setEnableFields(true);
        }
      }
      
      // If DigiLocker was completed, enable fields
      if (digiLockerData || newStepData?.step1?.completed) {
        setEnableFields(true);
      }
      
      // Set currentStep using flushSync or multiple RAF for reliability
      // Use a small delay to ensure all other state updates are processed
      await new Promise(resolve => setTimeout(resolve, 50));
      
      setCurrentStep(targetStep);
      
      // Close modal after a brief delay
      setTimeout(() => {
        setShowDraftModal(false);
        setDraftLoading(false);
        
        toast.success("Draft loaded successfully", {
          position: "top-center",
        });
      }, 100);
      
    } catch (error) {
      console.error("Error loading draft:", error);
      setDraftLoading(false);
      toast.error("Failed to load draft", {
        position: "top-center",
      });
    }
  }
};

  // Delete draft
  const handleDeleteDraft = async () => {
    try {
      await deleteKycDraft().unwrap();
      toast.success("Draft deleted successfully", {
        position: "top-center",
      });
      refetchDraft();
      setShowDraftModal(false);
    } catch (error) {
      toast.error(error?.data?.message || "Failed to delete draft", {
        position: "top-center",
      });
    }
  };

  // Delete draft after successful KYC submission
  const deleteDraftAfterSubmit = async () => {
    try {
      await deleteKycDraft().unwrap();
      refetchDraft();
    } catch (error) {
      console.error("Failed to delete draft after submit:", error);
    }
  };

  // Check for existing draft on component mount
  useEffect(() => {
    if (kycDraftData?.data && kycDraftData?.success && !kycdata?.success) {
      const hasVerifiedAadhaar = kycDraftData.data?.aadhaarVerificationData?.isVerified;
      setShowDraftModal(true);
      if (kycDraftData?.data?.expiresAt) {
        setDraftExpiryTime(new Date(kycDraftData.data.expiresAt));
      }
      if (hasVerifiedAadhaar) {
        console.log("Draft has verified Aadhaar, will restore verification state");
      }
    }
  }, [kycDraftData, kycdata]);

  // Auto-save draft when form data changes (debounced)
  useEffect(() => {
    if (kycdata?.success || currentStep === 1 || shouldShowCardUI()) return;

    const debounceTimer = setTimeout(() => {
      autoSaveDraft();
    }, 3000);

    return () => clearTimeout(debounceTimer);
  }, [formData, currentStep, completedSteps, stepData, aadhaarVerificationData]);

  // Auto-save draft periodically (every 60 seconds as backup)
  useEffect(() => {
    if (kycdata?.success || currentStep === 1 || shouldShowCardUI()) return;

    const autoSaveInterval = setInterval(() => {
      autoSaveDraft();
    }, 60000);

    return () => clearInterval(autoSaveInterval);
  }, [currentStep, formData, kycdata]);

  // Draft Modal Component
  const DraftModal = () => {
    if (!showDraftModal) return null;

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white rounded-xl shadow-2xl max-w-md w-full mx-4 overflow-hidden">
          <div className="bg-teal-600 px-6 py-4">
            <h3 className="text-lg font-semibold text-white">Resume Your KYC Application</h3>
          </div>
          
          <div className="p-6">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
              </div>
              <div>
                <p className="text-gray-800 font-medium">You have a saved draft</p>
              </div>
            </div>

            <p className="text-gray-600 text-sm mb-6">
              Would you like to continue from where you left off or start fresh?
            </p>

            <div className="space-y-3">
              <button
                onClick={handleLoadDraft}
                disabled={draftLoading}
                className="w-full py-3 px-4 bg-teal-600 text-white font-medium rounded-lg hover:bg-teal-700 transition-colors disabled:opacity-50"
              >
                {draftLoading ? "Loading..." : "Continue with this session"}
              </button>
              
              <button
                onClick={() => setShowDraftModal(false)}
                disabled={draftLoading}
                className="w-full py-3 px-4 bg-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-300 transition-colors disabled:opacity-50"
              >
                Start from beginning
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Trigger draft save when DigiLocker data is available
  useEffect(() => {
    if (digiLockerApiData && currentStep > 1) {
      console.log("DigiLocker data available, triggering draft save");
      autoSaveDraft();
    }
  }, [digiLockerApiData]);

  // Auto-save draft periodically (every 30 seconds) - FIXED: Changed handleSaveDraft to autoSaveDraft
  useEffect(() => {
    let autoSaveInterval;
    
    if (!kycdata?.success && currentStep > 1 && !shouldShowCardUI()) {
      autoSaveInterval = setInterval(() => {
        autoSaveDraft(); // Fixed: was handleSaveDraft
      }, 30000);
    }

    return () => {
      if (autoSaveInterval) {
        clearInterval(autoSaveInterval);
      }
    };
  }, [currentStep, formData, kycdata]);

  // Helper functions
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

const validateStep = (stepNumber) => {
  if (!isCountryCodeIndia) {
    switch(stepNumber) {
      case 1:
        return true;
      case 2:
        return validatePersonalInfo();
      case 3:
        return validateDocuments();
      case 4:
        return validateBankDetails();
      default:
        return false;
    }
  }

  switch(stepNumber) {
    case 1:
      // Step 1 is completed via DigiLocker callback
      return stepData.step1?.completed || !!digiLockerApiData;
    case 2:
      // Step 2 is completed via Aadhaar verification callback
      return stepData.step2?.completed || aadhaarVerificationData.isVerified;
    case 3:
      // Step 3 validates form fields (Personal Info)
      return validatePersonalInfo();
    case 4:
      // Step 4 validates documents
      return validateDocuments();
    case 5:
      // Step 5 validates bank details
      return validateBankDetails();
    default:
      return false;
  }
};

  const validatePersonalInfo = () => {
    const newErrors = {};
    
    if (!formData.applicantName) {
      newErrors.applicantName = "Name is required";
    }
    if (!formData.mobile_number || formData.mobile_number === `+${userData?.data?.countryCode} `) {
      newErrors.mobile_number = "Mobile number is required";
    }
    if (!formData.address) {
      newErrors.address = "Address is required";
    }
    if (isCountryCodeIndia && !formData.dob) {
      newErrors.dob = "Date of birth is required";
    }
    if (isCountryCodeIndia && !formData.panNumber) {
      newErrors.panNumber = "PAN number is required";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateDocuments = () => {
    const newErrors = {};
    
    if (isCountryCodeIndia) {
      if (!formData.aadhar_doc_front) newErrors.aadhar_doc_front = "Aadhar front is required";
      if (!formData.aadhar_doc_back) newErrors.aadhar_doc_back = "Aadhar back is required";
      if (!formData.pan_doc_front) newErrors.pan_doc_front = "PAN document is required";
    } else {
      if (!formData.dl_doc_front) newErrors.dl_doc_front = "Driving license front is required";
      if (!formData.dl_doc_back) newErrors.dl_doc_back = "Driving license back is required";
      if (!formData.passport_doc_front) newErrors.passport_doc_front = "Passport front is required";
      if (!formData.passport_doc_back) newErrors.passport_doc_back = "Passport back is required";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
// Add this useEffect to handle initialization
useEffect(() => {
  const initializeComponent = async () => {
    // Wait for kycDraftData and kycdata to be loaded
    if (kycDraftData !== undefined && kycdata !== undefined) {
      setIsInitializing(false);
    }
  };
  
  initializeComponent();
}, [kycDraftData, kycdata]);

// Modify the draft check useEffect
useEffect(() => {
  if (isInitializing) return; // Don't check for draft while initializing
  
  if (kycDraftData?.data && kycDraftData?.success && !kycdata?.success) {
    const hasVerifiedAadhaar = kycDraftData.data?.aadhaarVerificationData?.isVerified;
    setShowDraftModal(true);
    if (kycDraftData?.data?.expiresAt) {
      setDraftExpiryTime(new Date(kycDraftData.data.expiresAt));
    }
    if (hasVerifiedAadhaar) {
      console.log("Draft has verified Aadhaar, will restore verification state");
    }
  }
}, [kycDraftData, kycdata, isInitializing]);
  const validateBankDetails = () => {
    const newErrors = {};
    
    if (!formData.bank_name) newErrors.bank_name = "Bank name is required";
    if (!formData.ifsc_code) newErrors.ifsc_code = `${isCountryCodeIndia ? 'IFSC' : 'Bank'} code is required`;
    if (!formData.bank_account) newErrors.bank_account = "Bank account number is required";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Navigation functions
const handleNextStep = async () => {
  const isValid = validateStep(currentStep);
  
  if (isValid) {
    // Create new completed steps array
    const newCompletedSteps = [...completedSteps];
    if (!newCompletedSteps.includes(currentStep)) {
      newCompletedSteps.push(currentStep);
    }
    
    // Create new step data with current form data
    const newStepData = {
      ...stepData,
      [`step${currentStep}`]: { 
        completed: true, 
        data: { ...formData } // Make a copy of formData
      }
    };
    
    const nextStep = currentStep + 1;
    
    // Save draft with the new data BEFORE moving to next step
    if (!kycdata?.success) {
      try {
        const draftData = {
          currentStep: nextStep, // Save the NEXT step we're moving to
          completedSteps: newCompletedSteps,
          stepData: newStepData,
          digiLockerApiData: digiLockerApiData || stepData.step1?.data || null,
          formData: {
            applicantName: formData.applicantName,
            mobile_number: formData.mobile_number?.replace(`+${userData?.data?.countryCode} `, "") || "",
            address: formData.address,
            dob: formData.dob,
            panNumber: formData.panNumber,
            bank_name: formData.bank_name,
            ifsc_code: formData.ifsc_code,
            bank_account: formData.bank_account,
            upi_id: formData.upi_id,
            aadhar_doc_front: !!formData.aadhar_doc_front,
            aadhar_doc_back: !!formData.aadhar_doc_back,
            pan_doc_front: !!formData.pan_doc_front,
            dl_doc_front: !!formData.dl_doc_front,
            dl_doc_back: !!formData.dl_doc_back,
            passport_doc_front: !!formData.passport_doc_front,
            passport_doc_back: !!formData.passport_doc_back,
          },
          aadhaarVerificationData: {
            tempId: aadhaarVerificationData.tempId,
            isVerified: aadhaarVerificationData.isVerified,
            aadhaarNumber: aadhaarVerificationData.aadhaarNumber,
            name: aadhaarVerificationData.name,
            dob: aadhaarVerificationData.dob,
            address: aadhaarVerificationData.address,
            gender: aadhaarVerificationData.gender,
          },
        };
        
        console.log("Saving draft before moving to step:", nextStep);
        console.log("Draft data:", draftData);
        
        await saveKycDraft(draftData).unwrap();
        console.log("Draft saved successfully!");
      } catch (error) {
        console.error("Failed to save draft before step change:", error);
        // Don't block navigation even if draft save fails
      }
    }
    
    // Update states AFTER draft is saved
    setCompletedSteps(newCompletedSteps);
    setStepData(newStepData);
    
    // Move to next step
    if (currentStep < steps.length) {
      setCurrentStep(nextStep);
      setErrors({});
    }
  } else {
    toast.error("Please complete all required fields", {
      position: "top-center"
    });
  }
};
// Debug effect to track state changes
useEffect(() => {
  console.log("=== State Update ===", {
    currentStep,
    completedSteps,
    stepDataCompleted: {
      step1: stepData.step1?.completed,
      step2: stepData.step2?.completed,
      step3: stepData.step3?.completed,
      step4: stepData.step4?.completed,
      step5: stepData.step5?.completed,
    },
    hasDigiLockerData: !!digiLockerApiData,
    aadhaarVerified: aadhaarVerificationData.isVerified,
    enableFields,
  });
}, [currentStep, completedSteps, stepData, digiLockerApiData, aadhaarVerificationData, enableFields]);

  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      setErrors({});
    }
  };

  const handleDigiLockerComplete = async (data) => {
    console.log("DigiLocker data received:", data);
    
    if (!data) {
      console.error("No DigiLocker data received!");
      toast.error("Failed to get DigiLocker data. Please try again.", {
        position: "top-center"
      });
      return;
    }
    
    // Set DigiLocker data first
    setDigiLockerApiData(data);
    
    // Update step data
    const newStepData = {
      ...stepData,
      step1: { completed: true, data: data }
    };
    setStepData(newStepData);
    
    // Update form data
    const updatedFormData = {
      ...formData,
      applicantName: data.name || formData.applicantName,
      dob: data.dob || data.dateOfBirth || formData.dob,
      address: data.address || formData.address,
      mobile_number: data.mobile ? `+91 ${data.mobile}` : formData.mobile_number,
      panNumber: data.panNumber || data.pan || data.panNo || data.pan_number || formData.panNumber
    };
    setFormData(updatedFormData);
    
    setEnableFields(true);
    
    // Update completed steps
    const newCompletedSteps = [...completedSteps.filter(s => s !== 1), 1];
    setCompletedSteps(newCompletedSteps);
    
    // Use setTimeout to ensure state updates are processed
    setTimeout(() => {
      setCurrentStep(2);
      setErrors({});
    }, 100);
    
    // Save draft
    try {
      const draftData = {
        currentStep: 2,
        completedSteps: newCompletedSteps,
        stepData: newStepData,
        digiLockerApiData: data,
        formData: {
          applicantName: data.name || formData.applicantName,
          mobile_number: data.mobile || "",
          address: data.address || formData.address,
          dob: data.dob || data.dateOfBirth || formData.dob,
          panNumber: data.panNumber || data.pan || data.panNo || formData.panNumber,
          bank_name: formData.bank_name,
          ifsc_code: formData.ifsc_code,
          bank_account: formData.bank_account,
          upi_id: formData.upi_id,
        },
        aadhaarVerificationData: aadhaarVerificationData,
      };
      
      await saveKycDraft(draftData).unwrap();
      console.log("Draft saved after DigiLocker completion");
    } catch (error) {
      console.error("Failed to save draft after DigiLocker:", error);
    }
  };

  const handleAadhaarVerificationComplete = (data) => {
    console.log("Aadhaar verification complete:", data);
    
    setAadhaarVerificationData({
      tempId: data?.tempId || null,
      isVerified: true,
      aadhaarNumber: data?.aadhaarNumber || null,
      name: data?.name || null,
      dob: data?.dob || data?.dateOfBirth || null,
      address: data?.address || data?.fullAddress || null,
      gender: data?.gender || null,
    });
    
    setStepData({
      ...stepData,
      step2: { completed: true, data: data }
    });
    
    if (data?.name) {
      setFormData(prev => ({
        ...prev,
        applicantName: data.name || prev.applicantName,
        dob: data.dob || data.dateOfBirth || prev.dob,
        address: data.address || data.fullAddress || prev.address,
      }));
    }
    
    setEnableFields(true);
    
    setCompletedSteps(prev => [...prev, currentStep]);
    setCurrentStep(prev => prev + 1);
    setErrors({});
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "ifsc_code" && !/^[a-zA-Z0-9]*$/.test(value)) {
      return;
    }
    if (name === "panNumber" && !/^[a-zA-Z0-9]*$/.test(value)) {
      return;
    }
    if (name === "upi_id" && !/^[a-zA-Z0-9@._-]*$/.test(value)) {
      return;
    }
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

  const getMaxLength = () => {
    return isCountryCodeIndia ? 14 : 19;
  };

  const handleSubmit = async () => {
    const finalStep = isCountryCodeIndia ? 5 : 4;
    if (!validateStep(finalStep)) {
      return;
    }

    const data = new FormData();
    
    if (isCountryCodeIndia && aadhaarVerificationData.isVerified) {
      data.append("aadhaarVerified", "true");
      if (aadhaarVerificationData.tempId) {
        data.append("aadhaarTempId", aadhaarVerificationData.tempId);
      }
      if (aadhaarVerificationData.aadhaarNumber) {
        data.append("aadharNumber", aadhaarVerificationData.aadhaarNumber);
      }
    }
    
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
      if (!isCountryCodeIndia && doc1BackRef?.current?.value) {
        data.append("passport_doc_back", formData.passport_doc_back);
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
        
        await deleteDraftAfterSubmit();
        
        refetch();
        setErrors({});
        setCompletedSteps(isCountryCodeIndia ? [1, 2, 3, 4, 5] : [1, 2, 3, 4]);
        setAadhaarVerificationData({
          tempId: null,
          isVerified: false,
          aadhaarNumber: null,
        });
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

  const handleEditBankDetails = () => {
    setIsEditClicked(true);
    setShowBankModal(true);
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
        setIsEditClicked(false);
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
      const apiUrl = 
        new URL(`https://digilocker.meripehchaan.gov.in/public/oauth2/1/authorize?response_type=code&client_id=${clientId}&state=oidc_flow&redirect_uri=${redirectURI}&code_challenge=${challenge}&code_challenge_method=S256&dl_flow=signin&acr=pan+aadhaar+mobile&amr=pan+all+aadhaar&scope=files.issueddocs+files.uploadeddocs&pla=Y`);
      
      window.open(apiUrl.toString(), "_self");
    } catch (err) {
      setErrors(err.message);
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
    
    if (docFrontRef?.current) {
      docFrontRef.current.value = null;
    }
    if (doc1FrontRef?.current) {
      doc1FrontRef.current.value = null;
    }
    if (docBackRef?.current) {
      docBackRef.current.value = null;
    }
    if (!isCountryCodeIndia && doc1BackRef?.current) {
      doc1BackRef.current.value = null;
    }
  };

  // Effects for DigiLocker callback
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const extractedCode = queryParams.get("code");
    const newUrl =
      window.location.protocol +
      "//" +
      window.location.host +
      window.location.pathname;
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
            setDigiLockerApiData(response.data);
            handleDigiLockerComplete(response.data);
            setFormData(prev => ({
              ...prev,
              applicantName: response.data.name || prev.applicantName,
              dob: response.data.dob || response.data.dateOfBirth || prev.dob,
              address: response.data.address || prev.address,
              mobile_number: response.data.mobile ? `+91 ${response.data.mobile}` : prev.mobile_number,
              panNumber: response.data.panNumber || response.data.pan || response.data.panNo || response.data.pan_number || prev.panNumber
            }));
            console.log(response.data, "hello digi");
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
      
      if (kycdata?.data?.status === "approve") {
        setCompletedSteps(isCountryCodeIndia ? [1, 2, 3, 4, 5] : [1, 2, 3, 4]);
        setCurrentStep(isCountryCodeIndia ? 5 : 4);
      }
      
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
          `${`+${userData?.data?.countryCode} `}${kycdata?.data?.mobile_number}` || "",
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
    } else {
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

  const shouldShowCardUI = () => {
    return kycdata?.success === 1 && (
      kycdata?.data?.status === "open" || 
      kycdata?.data?.status === "approve"
    );
  };

  const renderDocumentUploadCard = ({ id, label, preview, inputRef, error, previewKey, existingUrl }) => (
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
          className={`w-full flex flex-col items-center px-4 py-3 bg-white rounded-lg border-2 border-dashed ${
            preview ? 'border-teal-500' : 'border-gray-300'
          } cursor-pointer hover:bg-gray-50 transition-all duration-200 ${
            kycdata?.data?.status === "open" || 
            (kycdata?.data?.status === "approve" && !isEditClicked) ? 'opacity-70 pointer-events-none' : ''
          }`}
          htmlFor={id}
        >
          {!preview ? (
            <>
              <svg className="w-8 h-8 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
              </svg>
              <span className="mt-2 text-sm text-gray-600">Click to upload document</span>
              <span className="text-xs text-gray-500 mt-1">JPG, PNG or JPEG</span>
            </>
          ) : (
            <div className="relative w-full">
              <img 
                src={preview} 
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
          disabled={
            kycdata?.data?.status === "open" || 
            (kycdata?.data?.status === "approve" && !isEditClicked)
          }
        />
      </div>
      
      {error && <p className="mt-1.5 text-sm text-red-500">{error}</p>}
    </div>
  );

  const renderCardBasedUI = () => (
    <div>
      <section className="py-6 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 max-w-screen">
          <div className="w-full">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden border-t-4 border-teal-500">
              <div className="p-5 sm:p-8">
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
                  </div>
                </div>
                
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

                <form className="grid grid-cols-1 lg:grid-cols-3 gap-8">
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
                          className="w-full px-4 py-2.5 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-200 disabled:bg-gray-100"
                          name="applicantName"
                          value={formData.applicantName}
                          onChange={handleChange}
                          disabled
                          readOnly
                        />
                      </div>

                      {isCountryCodeIndia && (
                        <div>
                          <label htmlFor="dob" className="block text-sm font-medium text-gray-700 mb-1.5">
                            Date of Birth <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            className="w-full px-4 py-2.5 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-200 disabled:bg-gray-100"
                            placeholder="Date of Birth"
                            name="dob"
                            value={maskData(formData.dob, 0, 0, 'X')}
                            disabled
                            readOnly
                          />
                        </div>
                      )}

                      <div>
                        <label htmlFor="mobile_number" className="block text-sm font-medium text-gray-700 mb-1.5">
                          Mobile Number (As per Bank) <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-200 disabled:bg-gray-100"
                          name="mobile_number"
                          placeholder="Enter mobile number"
                          value={
                            focusedInput === "mobile_number"
                              ? formData.mobile_number
                              : maskData(formData.mobile_number, 5, 2)
                          }
                          maxLength={getMaxLength()}
                          disabled={kycdata?.data?.status === "open" || (kycdata?.data?.status === "approve" && !isEditClicked)}
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
                      </div>

                      <div>
                        <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1.5">
                          Address <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          autoComplete="off"
                          className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-200 disabled:bg-gray-100"
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
                          disabled={kycdata?.data?.status === "open" || (kycdata?.data?.status === "approve" && !isEditClicked)}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-5">
                    <div className="bg-teal-600 text-white px-4 py-2.5 rounded-lg mb-5 -mt-8 shadow-md">
                      <h6 className="text-sm font-bold m-0">Document Proofs</h6>
                    </div>

                    <div className="space-y-5">
                      {renderDocumentUploadCard({
                        id: isCountryCodeIndia ? "aadhar_doc_front" : "dl_doc_front",
                        label: `${isCountryCodeIndia ? "Aadhar" : "Driving License"} Front`,
                        preview: previewImages.doc_front,
                        inputRef: docFrontRef,
                        error: isCountryCodeIndia ? errors.aadhar_doc_front : errors.dl_doc_front,
                        previewKey: "doc_front",
                        existingUrl: isCountryCodeIndia ? kycdata?.data?.aadhar_doc_front : kycdata?.data?.dl_doc_front
                      })}

                      {renderDocumentUploadCard({
                        id: isCountryCodeIndia ? "aadhar_doc_back" : "dl_doc_back",
                        label: `${isCountryCodeIndia ? "Aadhar" : "Driving License"} Back`,
                        preview: previewImages.doc_back,
                        inputRef: docBackRef,
                        error: isCountryCodeIndia ? errors.aadhar_doc_back : errors.dl_doc_back,
                        previewKey: "doc_back",
                        existingUrl: isCountryCodeIndia ? kycdata?.data?.aadhar_doc_back : kycdata?.data?.dl_doc_back
                      })}

                      {renderDocumentUploadCard({
                        id: isCountryCodeIndia ? "pan_doc_front" : "passport_doc_front",
                        label: isCountryCodeIndia ? "PAN" : "Passport Front",
                        preview: previewImages.doc1_front,
                        inputRef: doc1FrontRef,
                        error: isCountryCodeIndia ? errors.pan_doc_front : errors.passport_doc_front,
                        previewKey: "doc1_front",
                        existingUrl: isCountryCodeIndia ? kycdata?.data?.pan_doc_front : kycdata?.data?.passport_doc_front
                      })}

                      {!isCountryCodeIndia && renderDocumentUploadCard({
                        id: "passport_doc_back",
                        label: "Passport Back",
                        preview: previewImages.doc1_back,
                        inputRef: doc1BackRef,
                        error: errors.passport_doc_back,
                        previewKey: "doc1_back",
                        existingUrl: kycdata?.data?.passport_doc_back
                      })}

                      {isCountryCodeIndia && (
                        <div>
                          <label htmlFor="panNumber" className="block text-sm font-medium text-gray-700 mb-1.5">
                            PAN Number <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-200 disabled:bg-gray-100"
                            name="panNumber"
                            placeholder="Enter PAN number"
                            value={
                              focusedInput === "panNumber"
                                ? formData.panNumber
                                : maskData(formData.panNumber)
                            }
                            onChange={handleChange}
                            onFocus={(e) => setFocusedInput(e.target.name)}
                            onBlur={() => setFocusedInput(null)}
                            disabled={kycdata?.data?.status === "open" || (kycdata?.data?.status === "approve" && !isEditClicked)}
                          />
                        </div>
                      )}
                    </div>
                  </div>

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
                            className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-200 disabled:bg-gray-100"
                            name="upi_id"
                            placeholder="Enter UPI ID"
                            value={
                              focusedInput === "upi_id"
                                ? formData.upi_id
                                : maskData(formData.upi_id, 3, 4)
                            }
                            onChange={handleChange}
                            onFocus={(e) => setFocusedInput(e.target.name)}
                            onBlur={() => setFocusedInput(null)}
                            disabled={kycdata?.data?.status === "open" || (kycdata?.data?.status === "approve" && !isEditClicked)}
                          />
                        </div>
                      )}

                      <div>
                        <label htmlFor="bank_account" className="block text-sm font-medium text-gray-700 mb-1.5">
                          Bank Account Number <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          autoComplete="off"
                          className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-200 disabled:bg-gray-100"
                          name="bank_account"
                          placeholder="Enter bank account number"
                          value={
                            focusedInput === "bank_account"
                              ? formData.bank_account
                              : maskData(formData.bank_account)
                          }
                          onChange={handleChange}
                          onFocus={(e) => setFocusedInput(e.target.name)}
                          onBlur={() => setFocusedInput(null)}
                          disabled={kycdata?.data?.status === "open" || (kycdata?.data?.status === "approve" && !isEditClicked)}
                          onKeyPress={(event) => {
                            if (!/[0-9]/.test(event.key)) {
                              event.preventDefault();
                            }
                          }}
                        />
                      </div>

                      <div>
                        <label htmlFor="bank_name" className="block text-sm font-medium text-gray-700 mb-1.5">
                          Bank Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          autoComplete="off"
                          className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-200 disabled:bg-gray-100"
                          name="bank_name"
                          placeholder="Enter bank name"
                          value={formData.bank_name}
                          onChange={handleChange}
                          disabled={kycdata?.data?.status === "open" || (kycdata?.data?.status === "approve" && !isEditClicked)}
                        />
                      </div>

                      <div>
                        <label htmlFor="ifsc_code" className="block text-sm font-medium text-gray-700 mb-1.5">
                          Bank {isCountryCodeIndia && "IFSC"} Code <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          autoComplete="off"
                          className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-200 disabled:bg-gray-100"
                          name="ifsc_code"
                          placeholder="Enter bank code"
                          value={toUpperCase(
                            focusedInput === "ifsc_code"
                              ? formData.ifsc_code
                              : maskData(formData.ifsc_code)
                          )}
                          onChange={handleChange}
                          onFocus={(e) => setFocusedInput(e.target.name)}
                          onBlur={() => setFocusedInput(null)}
                          disabled={kycdata?.data?.status === "open" || (kycdata?.data?.status === "approve" && !isEditClicked)}
                        />
                      </div>
                    </div>
                  </div>
                </form>

                <div className="flex justify-end mt-8">
                  {(kycdata?.data?.status === "reject" || (kycdata?.data?.status === "approve" && isEditClicked)) && (
                    <button
                      type="button"
                      className="px-8 py-3 bg-teal-600 text-white text-sm font-medium rounded-lg shadow-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 transition-all duration-200 transform hover:-translate-y-0.5 disabled:opacity-50"
                      onClick={handleSubmit}
                      disabled={loading}
                    >
                      {loading ? "Updating..." : "Update KYC Information"}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <BankDetailsModal
          show={showBankModal}
          onClose={() => {
            setShowBankModal(false);
            setIsEditClicked(false);
          }}
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
        
        {(isLoading || loading) && <Loader />}
      </section>
    </div>
  );

  const renderStepContent = () => {
    if (!isCountryCodeIndia) {
      switch(currentStep) {
        case 1:
          return (
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="text-center py-12">
                <h3 className="text-lg font-medium text-gray-800 mb-4">
                  Identity Verification
                </h3>
                <p className="text-gray-600 mb-6">
                  Please proceed with identity verification for international users.
                </p>
                <button
                  className="px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700"
                  onClick={() => {
                    setStepData({
                      ...stepData,
                      step1: { completed: true, data: {} }
                    });
                    handleNextStep();
                  }}
                >
                  Proceed
                </button>
              </div>
            </div>
          );
        case 2:
          return renderPersonalInformation();
        case 3:
          return renderDocumentUpload();
        case 4:
          return renderBankDetails();
      }
    }

    switch(currentStep) {
      case 1:
        return (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="text-center py-12">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                DigiLocker Authentication
              </h3>
              <p className="text-gray-600 mb-8 max-w-md mx-auto">
                Connect with DigiLocker to securely fetch your documents and complete KYC verification faster
              </p>
              
              <button
                className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-teal-500 to-teal-600 text-white text-lg font-medium rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
                onClick={handleButtonClick}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-5 w-5 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Connecting...
                  </>
                ) : (
                  <>
                    <img src={digiLocker} alt="DigiLocker" className="w-10 h-10 mr-3" />
                    Connect to DigiLocker
                  </>
                )}
              </button>
            </div>
          </div>
        );

      case 2:
        // Check if Aadhaar is already verified
        if (aadhaarVerificationData.isVerified) {
          return (
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="text-center py-12">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                  Aadhaar Verified Successfully
                </h3>
                <p className="text-gray-600 mb-4">
                  Your Aadhaar has been verified. You can proceed to the next step.
                </p>
                                {aadhaarVerificationData.aadhaarNumber && (
                  <p className="text-sm text-gray-500">
                    Aadhaar: XXXX XXXX {aadhaarVerificationData.aadhaarNumber.slice(-4)}
                  </p>
                )}
              </div>
            </div>
          );
        }

        // FIXED: Get DigiLocker data from multiple sources with fallback
        const digiLockerDataForAadhaar = digiLockerApiData || stepData.step1?.data || null;
        
        // Check if we have valid DigiLocker data
        const hasValidDigiLockerData = digiLockerDataForAadhaar && 
          Object.keys(digiLockerDataForAadhaar).length > 0 &&
          (digiLockerDataForAadhaar.name || digiLockerDataForAadhaar.dob);

        console.log("Step 2 Render - digiLockerApiData:", digiLockerApiData);
        console.log("Step 2 Render - stepData.step1?.data:", stepData.step1?.data);
        console.log("Step 2 Render - Using digiLockerDataForAadhaar:", digiLockerDataForAadhaar);
        console.log("Step 2 Render - hasValidDigiLockerData:", hasValidDigiLockerData);

        // If no valid DigiLocker data, show message to go back
        if (!hasValidDigiLockerData) {
          return (
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="text-center py-12">
                <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  DigiLocker Verification Required
                </h3>
                <p className="text-gray-600 mb-6">
                  Please complete DigiLocker verification first to proceed with Aadhaar verification.
                </p>
                <button
                  onClick={() => {
                    setCurrentStep(1);
                    setCompletedSteps(prev => prev.filter(s => s !== 1));
                    setStepData(prev => ({
                      ...prev,
                      step1: { completed: false, data: {} }
                    }));
                  }}
                  className="px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
                >
                  Go to DigiLocker Verification
                </button>
              </div>
            </div>
          );
        }
        
        return (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <AadhaarVerification 
              onVerificationComplete={handleAadhaarVerificationComplete}
              digiLockerData={digiLockerDataForAadhaar}
              isLoading={loading}
            />
          </div>
        );

      case 3:
        return renderPersonalInformation();

      case 4:
        return renderDocumentUpload();

      case 5:
        return renderBankDetails();

      default:
        return null;
    }
  };

  const renderPersonalInformation = () => (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="text-lg font-medium text-gray-800 mb-6">Personal Information</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="applicantName" className="block text-sm font-medium text-gray-700 mb-1.5">
            Name of the Applicant <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            className="w-full px-4 py-2.5 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-200"
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
              className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-200"
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
            className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-200"
            name="mobile_number"
            placeholder="Enter mobile number"
            value={
              focusedInput === "mobile_number"
                ? formData.mobile_number
                : maskData(formData.mobile_number, 5, 2)
            }
            maxLength={getMaxLength()}
            disabled={!enableFields && isCountryCodeIndia}
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

        <div className={isCountryCodeIndia ? "md:col-span-2" : ""}>
          <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1.5">
            Address <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            autoComplete="off"
            className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-200"
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
            disabled={!enableFields && isCountryCodeIndia}
          />
          {errors.address && (
            <p className="mt-1.5 text-sm text-red-500">{errors.address}</p>
          )}
        </div>

        {isCountryCodeIndia && (
          <div>
            <label htmlFor="panNumber" className="block text-sm font-medium text-gray-700 mb-1.5">
              PAN Number <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-200"
              name="panNumber"
              placeholder="Enter PAN number"
              value={
                focusedInput === "panNumber"
                  ? formData.panNumber
                  : maskData(formData.panNumber)
              }
              onChange={handleChange}
              onFocus={(e) => setFocusedInput(e.target.name)}
              onBlur={() => setFocusedInput(null)}
              disabled={!enableFields && isCountryCodeIndia}
            />
            {errors.panNumber && (
              <p className="mt-1.5 text-sm text-red-500">{errors.panNumber}</p>
            )}
          </div>
        )}
      </div>
    </div>
  );

  const renderDocumentUpload = () => (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="text-lg font-medium text-gray-800 mb-6">Document Upload</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Document 1 - Front */}
        <div>
          <label
            htmlFor={isCountryCodeIndia ? "aadhar_doc_front" : "dl_doc_front"}
            className="block text-sm font-medium text-gray-700 mb-1.5 flex items-center flex-wrap"
          >
            <span>{isCountryCodeIndia ? "Aadhar" : "Driving License"} Front</span> 
            <span className="text-red-500 mx-1">*</span>
          </label>
          
          <div className="mb-2">
            <label 
              className={`w-full flex flex-col items-center px-4 py-3 bg-white rounded-lg border-2 border-dashed ${
                previewImages?.doc_front ? 'border-teal-500' : 'border-gray-300'
              } cursor-pointer hover:bg-gray-50 transition-all duration-200`}
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

        {/* Document 1 - Back */}
        <div>
          <label
            htmlFor={isCountryCodeIndia ? "aadhar_doc_back" : "dl_doc_back"}
            className="block text-sm font-medium text-gray-700 mb-1.5 flex items-center flex-wrap"
          >
            <span>{isCountryCodeIndia ? "Aadhar" : "Driving License"} Back</span> 
            <span className="text-red-500 mx-1">*</span>
          </label>
          
          <div className="mb-2">
            <label 
              className={`w-full flex flex-col items-center px-4 py-3 bg-white rounded-lg border-2 border-dashed ${
                previewImages?.doc_back ? 'border-teal-500' : 'border-gray-300'
              } cursor-pointer hover:bg-gray-50 transition-all duration-200`}
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

        {/* Document 2 - Front */}
        <div>
          <label
            htmlFor={isCountryCodeIndia ? "pan_doc_front" : "passport_doc_front"}
            className="block text-sm font-medium text-gray-700 mb-1.5 flex items-center flex-wrap"
          >
            <span>{isCountryCodeIndia ? "PAN" : "Passport Front"}</span> 
            <span className="text-red-500 mx-1">*</span>
          </label>
          
          <div className="mb-2">
            <label 
              className={`w-full flex flex-col items-center px-4 py-3 bg-white rounded-lg border-2 border-dashed ${
                previewImages?.doc1_front ? 'border-teal-500' : 'border-gray-300'
              } cursor-pointer hover:bg-gray-50 transition-all duration-200`}
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

        {/* Document 2 - Back (Passport only) */}
        {!isCountryCodeIndia && (
          <div>
            <label htmlFor="passport_doc_back" className="block text-sm font-medium text-gray-700 mb-1.5 flex items-center flex-wrap">
              <span>Passport Back</span> <span className="text-red-500 mx-1">*</span>
            </label>
            
            <div className="mb-2">
              <label 
                className={`w-full flex flex-col items-center px-4 py-3 bg-white rounded-lg border-2 border-dashed ${
                  previewImages?.doc1_back ? 'border-teal-500' : 'border-gray-300'
                } cursor-pointer hover:bg-gray-50 transition-all duration-200`}
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
              />
            </div>
            
            {errors.passport_doc_back && (
              <p className="mt-1.5 text-sm text-red-500">{errors.passport_doc_back}</p>
            )}
          </div>
        )}
      </div>
    </div>
  );

  const renderBankDetails = () => (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="text-lg font-medium text-gray-800 mb-6">Bank Details</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {isCountryCodeIndia && (
          <div>
            <label htmlFor="upi_id" className="block text-sm font-medium text-gray-700 mb-1.5">
              UPI Number
            </label>
            <input
              type="text"
              autoComplete="off"
              className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-200"
              name="upi_id"
              placeholder="Enter UPI ID"
              value={
                focusedInput === "upi_id"
                  ? formData.upi_id
                  : maskData(formData.upi_id, 3, 4)
              }
              onChange={handleChange}
              onFocus={(e) => setFocusedInput(e.target.name)}
              onBlur={() => setFocusedInput(null)}
              disabled={kycdata?.data?.status === "approve"}
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
            className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-200"
            name="bank_account"
            placeholder="Enter bank account number"
            value={
              focusedInput === "bank_account"
                ? formData.bank_account
                : maskData(formData.bank_account)
            }
            onChange={handleChange}
            onFocus={(e) => setFocusedInput(e.target.name)}
            onBlur={() => setFocusedInput(null)}
            disabled={kycdata?.data?.status === "approve"}
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
            className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-200"
            name="bank_name"
            placeholder="Enter bank name"
            value={formData.bank_name}
            onChange={handleChange}
            disabled={kycdata?.data?.status === "approve"}
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
            className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-200"
            name="ifsc_code"
            placeholder="Enter bank code"
            value={toUpperCase(
              focusedInput === "ifsc_code"
                ? formData.ifsc_code
                : maskData(formData.ifsc_code)
            )}
            onChange={handleChange}
            onFocus={(e) => setFocusedInput(e.target.name)}
            onBlur={() => setFocusedInput(null)}
            disabled={kycdata?.data?.status === "approve"}
          />
          {errors.ifsc_code && (
            <p className="mt-1.5 text-sm text-red-500">{errors.ifsc_code}</p>
          )}
        </div>
      </div>

      {kycdata?.data?.status === "approve" && (
        <div className="mt-6 flex justify-end">
          <button
            type="button"
            className="inline-flex items-center px-4 py-2 bg-teal-600 text-white text-sm rounded-lg shadow-sm hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 transition-colors"
            onClick={handleEditBankDetails}
          >
            <img alt="Edit" src={editIcon} className="w-4 h-4 mr-2 filter brightness-0 invert" />
            Edit Bank Details
          </button>
        </div>
      )}
    </div>
  );

  // MAIN RETURN
  return (
    <div>
      {shouldShowCardUI() ? (
        renderCardBasedUI()
      ) : (
        <section className="py-6 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 max-w-screen">
            <div className="w-full">
              <div className="bg-white rounded-xl shadow-lg overflow-hidden border-t-4 border-teal-500">
                <div className="p-5 sm:p-8">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-5 border-b border-gray-200 mb-6">
                    <div className="flex items-center mb-4 sm:mb-0">
                      <h1 className="text-2xl font-bold text-teal-600 mr-2">KYC Information</h1>
                      <p className="text-sm text-gray-500">
                        {kycdata?.data?.status !== "approve" && "(Complete all steps to verify your KYC)"}
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
                    </div>
                  </div>

                  <div className="flex items-center mb-8 px-5 py-4 bg-gray-50 rounded-lg shadow-inner">
                    <div className="flex items-center flex-wrap gap-2">
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

                  <StepIndicator 
                    steps={steps} 
                    currentStep={currentStep} 
                    completedSteps={completedSteps}
                  />

                  <div className="mt-12">
                    {renderStepContent()}
                  </div>

                  {kycdata?.data?.status !== "approve" && (
                    <div className="flex justify-between mt-8">
                      <button
                        type="button"
                        className={`px-6 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${
                          currentStep === 1 
                            ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                        onClick={handlePreviousStep}
                        disabled={currentStep === 1}
                      >
                        Previous
                      </button>

                      {currentStep === steps.length ? (
                        <button
                          type="button"
                          className="px-8 py-3 bg-teal-600 text-white text-sm font-medium rounded-lg shadow-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 transition-all duration-200 transform hover:-translate-y-0.5"
                          onClick={handleSubmit}
                          disabled={loading}
                        >
                          {loading ? "Submitting..." : "Submit KYC Information"}
                        </button>
                      ) : (
                        <button
                          type="button"
                          className="px-6 py-3 bg-teal-600 text-white text-sm font-medium rounded-lg shadow-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 transition-all duration-200"
                          onClick={handleNextStep}
                        >
                          Next
                        </button>
                      )}
                    </div>
                  )}

                  {(kycdata?.data?.status === "reject" ||
                    (kycdata?.data?.status === "approve" && isEditClicked)) && currentStep === steps.length && (
                    <div className="flex justify-end mt-8">
                      <button
                        type="button"
                        className="px-8 py-3 bg-teal-600 text-white text-sm font-medium rounded-lg shadow-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 transition-all duration-200 transform hover:-translate-y-0.5"
                        onClick={handleSubmit}
                      >
                        Update KYC Information
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <DraftModal />
          <BankDetailsModal
            show={showBankModal}
            onClose={() => {
              setShowBankModal(false);
              setIsEditClicked(false);
            }}
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
          
          {(isLoading || loading) && <Loader />}
        </section>
      )}
    </div>
  );
};

export default KycInformation;