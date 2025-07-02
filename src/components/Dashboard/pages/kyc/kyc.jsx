import React, { useRef, useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import digiLocker from "../../../../assets/digilocker.jpg";
import DigiLockerModal from './DigiLockerModal';

const validationSchema = Yup.object({
  applicantName: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Name is required'),
  dateOfBirth: Yup.date()
    .nullable()
    .required('Date of Birth is required')
    .max(new Date(), 'Date of Birth cannot be in the future'),
  mobileNumber: Yup.string()
    .matches(/^\+91[0-9]{10}$/, 'Mobile number must be 10 digits and start with +91')
    .required('Mobile Number is required'),
  address: Yup.string()
    .min(10, 'Address is too short')
    .required('Address is required'),
  panNumber: Yup.string()
    .matches(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, 'Invalid PAN number format (e.g., ABCDE1234F)')
    .required('PAN Number is required'),
  aadharFront: Yup.mixed()
    .required('Aadhar Front is required')
    .test('fileSize', 'File too large (max 5MB)', (value) => value && value.size <= 5 * 1024 * 1024)
    .test('fileType', 'Unsupported file format', (value) => value && ['image/jpeg', 'image/png', 'application/pdf'].includes(value.type)),
  aadharBack: Yup.mixed()
    .required('Aadhar Back is required')
    .test('fileSize', 'File too large (max 5MB)', (value) => value && value.size <= 5 * 1024 * 1024)
    .test('fileType', 'Unsupported file format', (value) => value && ['image/jpeg', 'image/png', 'application/pdf'].includes(value.type)),
  pan: Yup.mixed()
    .required('PAN card image is required')
    .test('fileSize', 'File too large (max 5MB)', (value) => value && value.size <= 5 * 1024 * 1024)
    .test('fileType', 'Unsupported file format', (value) => value && ['image/jpeg', 'image/png', 'application/pdf'].includes(value.type)),

  upiNumber: Yup.string().matches(/^[a-zA-Z0-9.\-_]{2,256}@[a-zA-Z]{2,64}$/, 'Invalid UPI ID format').notRequired(),
  bankAccountNumber: Yup.string().matches(/^[0-9]{9,18}$/, 'Invalid Account Number').notRequired(),
  bankName: Yup.string().min(2, 'Bank name too short').notRequired(),
  bankIfscCode: Yup.string().matches(/^[A-Z]{4}0[A-Z0-9]{6}$/, 'Invalid IFSC Code').notRequired(),
});

function KYCForm() {
  const [showDigiLockerModal, setShowDigiLockerModal] = useState(false);
  const handleShow = () => setShowDigiLockerModal(true);
  const handleHide = () => setShowDigiLockerModal(false);

  // --- Inner Components ---
  const InputField = ({ label, name, value, onChange, onBlur, placeholder, type = 'text', required = false, error }) => (
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
        placeholder={placeholder}
        required={required}
        className={`w-full p-3 text-sm border-2 rounded-lg bg-white text-gray-800 placeholder-gray-400
                   shadow-sm transition-all duration-300 ease-in-out
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

  const FileInput = ({ label, name, onFileChange, required = false, error, formikTouched, formikValue }) => {
    const fileInputRef = useRef(null);
    const [fileName, setFileName] = useState('No file chosen');

    useEffect(() => {
      if (!formikValue && fileName !== 'No file chosen') {
        setFileName('No file chosen');
      }
    }, [formikValue, fileName, name]);

    const handleButtonClick = () => {
      fileInputRef.current.click();
    };

    const handleFileSelect = (event) => {
      const file = event.target.files[0];
      if (file) {
        setFileName(file.name);
        onFileChange(file);
      } else {
        setFileName('No file chosen');
        onFileChange(null);
      }
    };

    return (
      <div className="mb-4">
        <label htmlFor={name} className="block text-gray-700 text-sm font-medium mb-2"> 
          {label}{required && <span className="text-red-500 ml-1">*</span>}
        </label>
        <div className={`flex flex-col sm:flex-row sm:items-center gap-3 p-3 border-2 rounded-lg border-dashed transition-all duration-300 hover:border-teal-400 hover:bg-teal-50/30 
                        ${error ? 'border-red-300 bg-red-50/30' : 'border-gray-300 bg-gray-50/30'}`}>
          <button
            type="button"
            onClick={handleButtonClick}
            className={`px-4 py-2 rounded-lg shadow-sm text-sm font-medium transition-all duration-300 ease-in-out
                       bg-gradient-to-r from-teal-500 to-teal-600 text-white
                       hover:from-teal-600 hover:to-teal-700 hover:shadow-md
                       active:shadow-inner active:from-teal-700 active:to-teal-800 transform active:scale-95
                       ${error ? 'from-red-500 to-red-600 hover:from-red-600 hover:to-red-700' : ''}
                       whitespace-nowrap flex-shrink-0 flex items-center gap-2`}
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
              Supported: JPG, PNG, PDF (Max 5MB)
            </span>
          </div>
          <input
            type="file"
            id={name}
            name={name}
            ref={fileInputRef}
            onChange={handleFileSelect}
            className="hidden"
            required={required}
            accept="image/jpeg,image/png,application/pdf"
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

  // --- End Inner Components ---

  const formik = useFormik({
    initialValues: {
      applicantName: '',
      dateOfBirth: '',
      mobileNumber: '',
      address: '',
      upiNumber: '',
      bankAccountNumber: '',
      bankName: '',
      bankIfscCode: '',
      panNumber: '',
      aadharFront: null,
      aadharBack: null,
      pan: null,
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        console.log('Form Data Submitted:', values);
        await new Promise(resolve => setTimeout(resolve, 1500));
        toast.success('KYC information submitted successfully!', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        resetForm();
      } catch (error) {
        console.error('Submission error:', error);
        toast.error('Failed to submit KYC information. Please try again.', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="min-h-screen bg-[#1d8d84] py-6 px-4 sm:px-6 lg:px-8">
      <ToastContainer />
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
                KYC Verification
              </h1>
              <p className="text-gray-600">
                Complete your Know Your Customer verification process
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="flex items-center text-gray-700 font-medium">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Country: India
              </div>
              <img 
                src={digiLocker} 
                alt="DigiLocker" 
                className="w-16 h-auto cursor-pointer hover:opacity-80 transition-opacity rounded-lg shadow-sm" 
                onClick={handleShow} 
              />
            </div>
          </div>

          {/* KYC Status */}
          <div className="flex justify-center mt-6">
            <div className="inline-flex items-center px-4 py-2 bg-orange-100 rounded-full">
              <div className="w-2 h-2 bg-orange-500 rounded-full mr-2 animate-pulse"></div>
              <span className="text-orange-700 font-medium">KYC Status: Pending Verification</span>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={formik.handleSubmit}>
          {/* Grid Layout for Sections */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Section 1: Personal Information */}
            <SectionCard title="Personal Information" icon="👤">
              <div className="space-y-4">
                <InputField
                  label="Full Name"
                  name="applicantName"
                  type="text"
                  value={formik.values.applicantName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Enter your full name"
                  error={formik.touched.applicantName && formik.errors.applicantName}
                  required
                />
                <InputField
                  label="Date of Birth"
                  name="dateOfBirth"
                  type="date"
                  value={formik.values.dateOfBirth}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.dateOfBirth && formik.errors.dateOfBirth}
                  required
                />
                <InputField
                  label="Mobile Number"
                  name="mobileNumber"
                  type="tel"
                  value={formik.values.mobileNumber}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="+91 XXXXXXXXXX"
                  error={formik.touched.mobileNumber && formik.errors.mobileNumber}
                  required
                />
                <InputField
                  label="Complete Address"
                  name="address"
                  type="text"
                  value={formik.values.address}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Enter your complete address"
                  error={formik.touched.address && formik.errors.address}
                  required
                />
              </div>
            </SectionCard>

            {/* Section 2: Document Upload */}
            <SectionCard title="Document Upload" icon="📄">
              <div className="space-y-4">
                <FileInput
                  label="Aadhar Card (Front)"
                  name="aadharFront"
                  onFileChange={(file) => {
                    formik.setFieldValue('aadharFront', file);
                    formik.setFieldTouched('aadharFront', true, false);
                  }}
                  formikTouched={formik.touched.aadharFront}
                  formikValue={formik.values.aadharFront}
                  error={formik.touched.aadharFront && formik.errors.aadharFront}
                  required
                />
                <FileInput
                  label="Aadhar Card (Back)"
                  name="aadharBack"
                  onFileChange={(file) => {
                    formik.setFieldValue('aadharBack', file);
                    formik.setFieldTouched('aadharBack', true, false);
                  }}
                  formikTouched={formik.touched.aadharBack}
                  formikValue={formik.values.aadharBack}
                  error={formik.touched.aadharBack && formik.errors.aadharBack}
                  required
                />
                <FileInput
                  label="PAN Card"
                  name="pan"
                  onFileChange={(file) => {
                    formik.setFieldValue('pan', file);
                    formik.setFieldTouched('pan', true, false);
                  }}
                  formikTouched={formik.touched.pan}
                  formikValue={formik.values.pan}
                  error={formik.touched.pan && formik.errors.pan}
                  required
                />
                <InputField
                  label="PAN Number"
                  name="panNumber"
                  type="text"
                  value={formik.values.panNumber}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="ABCDE1234F"
                  error={formik.touched.panNumber && formik.errors.panNumber}
                  required
                />
              </div>
            </SectionCard>

            {/* Section 3: Banking Details */}
            <SectionCard title="Banking Details" icon="🏦">
              <div className="mb-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-xs text-blue-700 flex items-center">
                  <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  Optional but recommended
                </p>
              </div>
              <div className="space-y-4">
                <InputField
                  label="UPI ID"
                  name="upiNumber"
                  type="text"
                  value={formik.values.upiNumber}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="yourname@upi"
                  error={formik.touched.upiNumber && formik.errors.upiNumber}
                />
                <InputField
                  label="Bank Account Number"
                  name="bankAccountNumber"
                  type="text"
                  value={formik.values.bankAccountNumber}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Enter account number"
                  error={formik.touched.bankAccountNumber && formik.errors.bankAccountNumber}
                />
                <InputField
                  label="Bank Name"
                  name="bankName"
                  type="text"
                  value={formik.values.bankName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Enter bank name"
                  error={formik.touched.bankName && formik.errors.bankName}
                />
                <InputField
                  label="IFSC Code"
                  name="bankIfscCode"
                  type="text"
                  value={formik.values.bankIfscCode}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="ABCD0123456"
                  error={formik.touched.bankIfscCode && formik.errors.bankIfscCode}
                />
              </div>
            </SectionCard>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={formik.isSubmitting}
              className="px-12 py-4 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-full font-semibold text-lg
                         shadow-lg  disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none
                         flex items-end gap-3"
            >
              {formik.isSubmitting && (
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              )}
              {formik.isSubmitting ? 'Submitting KYC...' : 'Submit KYC Verification'}
              {!formik.isSubmitting && (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              )}
            </button>
          </div>
        </form>

        <DigiLockerModal
          show={showDigiLockerModal}
          onHide={handleHide}
          onClickDigiLocker={handleShow}
        />
      </div>
    </div>
  );
}

export default KYCForm;