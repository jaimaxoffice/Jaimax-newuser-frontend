import React, { useState, useEffect, useRef, useContext } from "react";
import {
  LockKeyhole,
  UserRound,
  User,
  Mail,
  Phone,
  Home,
  MapPin,
  Camera,
  X,
  Eye,
  Lock,
} from "lucide-react";
import { toast, ToastContainer } from "../../../../ReusableComponents/Toasts/Toasts";
import {
  useChangePwdMutation,
  useChangePwdReqMutation,
  useVerifyMutation,
} from "../../../../Authentication/authApiSlice";
import { useUserDataQuery } from "../dashBoard/DashboardApliSlice";
import { useUpdateAddressMutation } from "./profileApiSlice";
import countryCodes from "../../../../Authentication/countryCodes.json";
import Cookies from "js-cookie";

export default function Profile3DForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    password: "",
    newPassword: "",
    confirmPwd: "",
    otp: "",
  });

  const [otpSent, setOtpSent] = useState(false);
  const [timer, setTimer] = useState(120);
  const [resendOtp, setResendOtp] = useState(false);
  const [isOtpSending, setIsOtpSending] = useState(false);
  const [errors, setErrors] = useState({});
  const [changePwd, { isLoading }] = useChangePwdMutation();
  const [changePwdReq] = useChangePwdReqMutation();
  const [verify, { isLoading: isVerifying }] = useVerifyMutation();
  const [update, { isLoading: updateLoader }] = useUpdateAddressMutation();
  const [loading, setLoading] = useState(false);
  const [isToastShown, setIsToastShown] = useState(false);
  const [profileImage, setProfileImage] = useState("");
  const [otpVerified, setOtpVerified] = useState(false);
  const [avatarHover, setAvatarHover] = useState(false);
  const [showImagePreview, setShowImagePreview] = useState(false);

  const { data: userData, error } = useUserDataQuery();
  const profileRef = useRef(null);

  const [state, setState] = useState({
    name: userData?.data?.name || "",
    _id: userData?.data?._id || "",
    email: userData?.data?.email || "",
    phone: userData?.data?.phone || "",
    address: userData?.data?.address || "",
    city: userData?.data?.city || "",
    country: userData?.data?.country || "",
    state: userData?.data?.state || "",
    profile: userData?.data?.profile || "",
    gender: userData?.data?.gender || "human",
  });

  useEffect(() => {
    setState({
      name: userData?.data?.name || "",
      _id: userData?.data?._id || "",
      email: userData?.data?.email || "",
      phone: userData?.data?.phone || "",
      address: userData?.data?.address || "",
      city: userData?.data?.city || "",
      country: userData?.data?.country || "",
      state: userData?.data?.state || "",
      profile: userData?.data?.profile || "",
      gender: userData?.data?.gender || "human",
    });
  }, [userData]);

  // Check if profile exists (and no new image is being uploaded)
  const hasExistingProfile = () => {
    return userData?.data?.profile && userData?.data?.profile !== "" && !profileImage;
  };

  // Check if form should be read-only
  const isReadOnly = hasExistingProfile();

  // Timer for resend OTP
  useEffect(() => {
    let countdown;
    if (otpSent && timer > 0) {
      countdown = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (timer === 0) {
      setResendOtp(true);
    }
    return () => clearInterval(countdown);
  }, [otpSent, timer]);

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const validateForm = () => {
    let formErrors = {};
    const phoneRegex = /^\+?[0-9\s\-\(\)]{7,20}$/;
    const nameRegex = /^[a-zA-Z\s'-]+$/;
    const addressRegex = /^(?=.*[a-zA-Z])(?=.*[0-9])?[a-zA-Z0-9\s.,'#-]+$/;

    // --- Name Validation ---
    if (!state.name.trim()) {
      formErrors.name = "Name is required.";
    } else if (state.name.trim().length < 2) {
      formErrors.name = "Name must be at least 2 characters long.";
    } else if (state.name.trim().length > 50) {
      formErrors.name = "Name cannot exceed 50 characters.";
    } else if (!nameRegex.test(state.name.trim())) {
      formErrors.name =
        "Name can only contain letters, spaces, hyphens, and apostrophes.";
    }

    // --- Phone Validation ---
    if (!state.phone) {
      formErrors.phone = "Mobile number is required.";
    } else if (
      typeof state.phone !== "string" &&
      typeof state.phone !== "number"
    ) {
      formErrors.phone = "Invalid mobile number format.";
    } else if (!String(state.phone).trim()) {
      formErrors.phone = "Mobile number is required.";
    } else if (!phoneRegex.test(String(state.phone))) {
      formErrors.phone =
        "Invalid mobile number format. Please enter 7-20 digits, optionally with +, spaces, -, or ().";
    }

    // --- Address Validation ---
    if (!state.address.trim()) {
      formErrors.address = "Address is required.";
    } else if (state.address.trim().length < 5) {
      formErrors.address = "Address must be at least 5 characters long.";
    } else if (state.address.trim().length > 100) {
      formErrors.address = "Address cannot exceed 100 characters.";
    } else if (!addressRegex.test(state.address.trim())) {
      formErrors.address = "Address contains invalid characters.";
    }

    // --- City Validation ---
    if (!state.city.trim()) {
      formErrors.city = "City is required.";
    } else if (state.city.trim().length < 2) {
      formErrors.city = "City must be at least 2 characters long.";
    } else if (state.city.trim().length > 50) {
      formErrors.city = "City cannot exceed 50 characters.";
    } else if (!/^[a-zA-Z\s-]+$/.test(state.city.trim())) {
      formErrors.city = "City can only contain letters, spaces, and hyphens.";
    }

    // --- State Validation ---
    if (!state.state.trim()) {
      formErrors.state = "State is required.";
    } else if (state.state.trim().length < 2) {
      formErrors.state = "State must be at least 2 characters long.";
    } else if (state.state.trim().length > 50) {
      formErrors.state = "State cannot exceed 50 characters.";
    } else if (!/^[a-zA-Z\s-]+$/.test(state.state.trim())) {
      formErrors.state = "State can only contain letters, spaces, and hyphens.";
    }

    // --- Country Validation ---
    if (!state.country.trim()) {
      formErrors.country = "Country is required.";
    }

    return formErrors;
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;
    setLoading(true);

    const acceptedFormats = ["image/png", "image/jpeg", "image/jpg"];
    const invalidFile = !acceptedFormats.includes(file.type);

    if (invalidFile) {
      toast.warning("Only JPG / PNG files are allowed", {
        position: "top-center",
      });
      profileRef.current.value = "";
      setLoading(false);
    } else {
      const imageUrl = URL.createObjectURL(file);
      setState((prevState) => ({
        ...prevState,
        profile: file,
      }));
      setProfileImage(imageUrl);
      setLoading(false);
    }
  };

  const getDefaultAvatar = () => {
    return <User className="text-teal-600 w-14 h-14"/>
  };

  const currentImage = () => {
    if (profileImage) {
      return profileImage;
    } else if (state.profile && typeof state.profile === "string") {
      return state.profile;
    } else {
      return null;
    }
  };

  const handlePreviewClick = () => {
    if (currentImage()) {
      setShowImagePreview(true);
    }
  };

  const handleAddPhotoClick = () => {
    if (!isReadOnly) {
      profileRef.current?.click();
    }
  };

  const handleChange = (e) => {
    if (!isReadOnly) {
      const { name, value } = e.target;
      setState((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    
    // Don't allow submission if profile exists
    if (isReadOnly) {
      toast.warning("Profile is locked. No changes allowed.", {
        position: "top-center",
      });
      return;
    }

    const validationErrors = validateForm();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      const hasChanged =
        state.name !== userData?.data?.name ||
        state.address !== userData?.data?.address ||
        state.city !== userData?.data?.city ||
        state.state !== userData?.data?.state ||
        state.country !== userData?.data?.country ||
        state.gender !== userData?.data?.gender ||
        state.profile instanceof File;

      if (!hasChanged) {
        toast.info("No changes detected to update", {
          position: "top-center",
        });
        return;
      }

      setLoading(true);
      try {
        const formData = new FormData();
        formData.append("name", state.name);
        formData.append("_id", state._id);
        formData.append("address", state.address);
        formData.append("city", state.city);
        formData.append("country", state.country);
        formData.append("state", state.state);
        formData.append("gender", state.gender);

        if (state.profile instanceof File) {
          formData.append("profile", state.profile);
        }

        const res = await update(formData);

        if (res?.data?.status_code == 200) {
          setIsToastShown(true);
          if (!isToastShown) {
            toast.success(res?.data?.message, {
              position: "top-center",
            });
          } else {
          
            toast.success(res?.data?.message, {
              position: "top-center",
            });
          }
          // Reset the temporary profile image after successful update
          setProfileImage("");
        }
      } catch (error) {
        setIsToastShown(true);
        if (!isToastShown) {
          toast.error(error?.message, {
            position: "top-center",
          });
        } else {
        
          toast.error(error?.message, {
            position: "top-center",
          });
        }
      } finally {
        setLoading(false);
      }
    }
  };

  const validateOldPassword = () => {
    let formErrors = {};

    if (!formData.password) {
      formErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      formErrors.password = "Password must be at least 6 characters";
    }

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const validateNewPassword = () => {
    let formErrors = {};

    if (!formData.newPassword) {
      formErrors.newPassword = "New Password is required";
    } else if (formData.newPassword.length < 6) {
      formErrors.newPassword = "Password must be at least 6 characters";
    }

    if (formData.newPassword !== formData.confirmPwd) {
      formErrors.confirmPwd = "Passwords do not match";
    }

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const validateOtp = () => {
    let formErrors = {};
    const numberRegex = /^[0-9]+$/;
    if (!formData.otp) {
      formErrors.otp = "OTP is required";
    } else if (!numberRegex.test(formData.otp)) {
      formErrors.otp = "OTP must be a number";
    } else if (formData.otp.length < 4) {
      formErrors.otp = "OTP must be 4 Numbers";
    }
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleSendOtp = async () => {
    if (validateOldPassword()) {
      try {
        const payload = {
          password: formData.password,
        };
        await changePwdReq(payload).unwrap();
        setIsToastShown(true);
        if (!isToastShown) {
          toast.success(`OTP sent to your email`, {
            position: "top-center",
          });
        } else {
        
          toast.success(`OTP sent to your email`, {
            position: "top-center",
          });
        }

        setOtpSent(true);
        if (resendOtp) {
          setResendOtp(false);
          setTimer(120);
        }
      } catch (error) {
        setIsToastShown(true);
        if (!isToastShown) {
          toast.error(`${error?.data?.message}`, {
            position: "top-center",
          });
        } else {
        
          toast.error(`${error?.data?.message}`, {
            position: "top-center",
          });
        }
      }
    }
  };

  const handleVerifyOtp = async () => {
    if (validateOtp()) {
      try {
        const payload = {
          email: userData?.data?.email,
          otp: Number(formData.otp),
          otpType: "ChangePassword",
        };
        await verify(payload).unwrap();

        setIsToastShown(true);
        if (!isToastShown) {
          toast.success(`OTP verified successfully`, {
            position: "top-center",
          });
        } else {
      
          toast.success(`OTP verified successfully`, {
            position: "top-center",
          });
        }
        setOtpVerified(true);
        setResendOtp(true);
      } catch (error) {
        setIsToastShown(true);
        if (!isToastShown) {
          toast.error(`${error?.data?.message}`, {
            position: "top-center",
          });
        } else {
         
          toast.error(`${error?.data?.message}`, {
            position: "top-center",
          });
        }
      }
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (validateNewPassword()) {
      try {
        const payload = {
          newPassword: formData.newPassword,
          email: userData?.data?.email,
        };
        const res = await changePwd(payload).unwrap();
        toast.success(`${res?.message}`, {
          position: "top-center",
        });

        Cookies.remove("token");
        setFormData({
          password: "",
          newPassword: "",
          confirmPwd: "",
          otp: "",
        });
        setOtpSent(false);
        setOtpVerified(false);
        window.location.href = "/login";
      } catch (error) {
        setIsToastShown(true);
        if (!isToastShown) {
          toast.error(`${error?.data?.message}`, {
            position: "top-center",
          });
        } else {
         
          toast.error(`${error?.data?.message}`, {
            position: "top-center",
          });
        }
      }
    }
  };

  if (userData?.data?.profile) {
    localStorage.setItem("profile", userData?.data?.profile);
  } else {
    localStorage.removeItem("profile");
  }

  const inputClass = (hasError, readOnly = false) =>
    `w-full border focus:border-teal-500 focus:ring-2 focus:ring-teal-400 rounded-xl px-3 py-2.5 text-sm text-gray-800 placeholder-gray-400 transition bg-white bg-opacity-90 shadow-inner backdrop-blur ${
      hasError ? "border-red-500" : "border-gray-300"
    } ${readOnly ? "cursor-not-allowed bg-gray-50" : ""}`;

  // Image Preview Modal
  const ImagePreviewModal = () => {
    if (!showImagePreview) return null;

    return (
      <div 
        className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4"
        onClick={() => setShowImagePreview(false)}
      >
        <div className="relative max-w-4xl max-h-[90vh] w-full h-full flex items-center justify-center">
          <button
            onClick={() => setShowImagePreview(false)}
            className="absolute top-4 right-4 bg-white rounded-full p-2 hover:bg-gray-100 transition-colors z-10 shadow-lg"
          >
            <X className="w-6 h-6 text-gray-700" />
          </button>
          <img
            src={currentImage()}
            alt="Profile Preview"
            className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      </div>
    );
  };

  return (
    <div className="bg-[#1d8e85] flex items-center justify-center p-2 sm:p-4">
      <div className="w-full max-w-screen bg-white bg-opacity-90 backdrop-blur rounded-2xl sm:rounded-3xl shadow-2xl p-4 sm:p-6 lg:p-8">
        <div className="flex flex-col xl:flex-row gap-6 lg:gap-8 xl:gap-10">
          <div className="w-full xl:w-2/3 space-y-4 sm:space-y-6">
            {/* Profile Locked Warning */}
            

            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
              <div className="relative group flex-shrink-0">
                <div
                  className={`w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-teal-600 to-white p-1 transition-all duration-300 ${
                    isReadOnly ? "cursor-pointer hover:scale-105" : "cursor-pointer hover:scale-105 hover:shadow-2xl hover:shadow-teal-600/50"
                  }`}
                  onMouseEnter={() => setAvatarHover(true)}
                  onMouseLeave={() => setAvatarHover(false)}
                >
                  <div className="w-full h-full rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center overflow-hidden relative">
                    {currentImage() ? (
                      <img
                        src={currentImage()}
                        alt="Profile"
                        className="w-full h-full object-cover rounded-full"
                      />
                    ) : (
                      <span className="text-3xl sm:text-4xl">
                        {getDefaultAvatar()}
                      </span>
                    )}

                    {/* Hover Overlay */}
                    <div
                      className={`absolute inset-0 bg-black/50 rounded-full flex items-center justify-center transition-opacity duration-300 ${
                        avatarHover ? "opacity-100" : "opacity-0"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        {isReadOnly ? (
                          // If profile is locked, only show preview
                          <button
                            onClick={handlePreviewClick}
                            className="p-2 bg-white/20 backdrop-blur rounded-full hover:bg-white/30 transition-colors"
                            title="View Image"
                          >
                            <Eye className="w-5 h-5 text-white" />
                          </button>
                        ) : (
                          // If not locked, show add/change options
                          <>
                            <button
                              onClick={handleAddPhotoClick}
                              className="p-2 bg-white/20 backdrop-blur rounded-full hover:bg-white/30 transition-colors"
                              title={profileImage ? "Change Photo" : "Add Photo"}
                            >
                              <Camera className="w-5 h-5 text-white" />
                            </button>
                            {profileImage && (
                              <button
                                onClick={handlePreviewClick}
                                className="p-2 bg-white/20 backdrop-blur rounded-full hover:bg-white/30 transition-colors"
                                title="Preview"
                              >
                                <Eye className="w-5 h-5 text-white" />
                              </button>
                            )}
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Status Badge */}
               

                {profileImage && !isReadOnly && (
                  <div className="absolute -bottom-1 -right-1 bg-green-500 text-white text-xs px-2 py-1 rounded-full shadow-lg">
                    New
                  </div>
                )}

                <input
                  type="file"
                  ref={profileRef}
                  accept=".png,.jpg,.jpeg"
                  onChange={handleImageChange}
                  className="hidden"
                  disabled={isReadOnly}
                />
              </div>

              {/* Header Text */}
              <div className="text-center sm:text-left flex-1">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-800 flex items-center justify-center sm:justify-start gap-2">
                  Profile Information
                  
                </h2>
                <p className="text-xs sm:text-sm text-gray-500 mt-1">
                  {isReadOnly 
                    ? "Your profile is complete " 
                    : profileImage 
                      ? "Review and save your new profile" 
                      : "Complete your profile details"}
                </p>

                <p className="mt-2 text-xs sm:text-sm leading-5 sm:leading-6 text-gray-700">
                  <span className="font-semibold text-[#0d7f79]">
                    {isReadOnly ? "Note:" : "Pro Tip:"}
                  </span>{" "}
                  {isReadOnly 
                    ? "Once a details is set, all profile information becomes read-only for security."
                    : "Add all required information to complete your profile."}
                </p>
              </div>
            </div>

            {/* Profile Form */}
            <form onSubmit={handleProfileSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {/* Full Name */}
                <div className="space-y-1">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Full Name *
                  </label>
                  <input
                    id="name"
                    type="text"
                    name="name"
                    value={state.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    disabled={
                      (userData?.data && Object.keys(userData.data).length > 0) || isReadOnly
                    }
                    className={`${inputClass(errors.name, isReadOnly)} ${
                      (userData?.data && Object.keys(userData.data).length > 0) || isReadOnly
                        ? "opacity-60 cursor-not-allowed"
                        : ""
                    }`}
                  />

                  {errors.name && !isReadOnly && (
                    <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                  )}
                </div>

                {/* Email */}
                <div className="space-y-1">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email Address *
                  </label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    value={state.email}
                    placeholder="Enter your email address"
                    disabled={
                      (userData?.data && Object.keys(userData.data).length > 0) || isReadOnly
                    }
                    className={`${inputClass(errors.email, isReadOnly)} ${
                      (userData?.data && Object.keys(userData.data).length > 0) || isReadOnly
                        ? "opacity-60 cursor-not-allowed"
                        : ""
                    }`}
                  />
                  {errors.email && !isReadOnly && (
                    <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                  )}
                </div>

                {/* Phone */}
                <div className="space-y-1">
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Phone Number *
                  </label>
                  <input
                    id="phone"
                    type="text"
                    name="phone"
                    value={state.phone}
                    placeholder="Enter your phone number"
                    disabled={
                      (userData?.data && Object.keys(userData.data).length > 0) || isReadOnly
                    }
                    className={`${inputClass(errors.phone, isReadOnly)} ${
                      (userData?.data && Object.keys(userData.data).length > 0) || isReadOnly
                        ? "opacity-60 cursor-not-allowed"
                        : ""
                    }`}
                  />
                  {errors.phone && !isReadOnly && (
                    <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
                  )}
                </div>

                {/* Address */}
                <div className="space-y-1">
                  <label
                    htmlFor="address"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Address *
                  </label>
                  <input
                    id="address"
                    type="text"
                    name="address"
                    value={state.address}
                    onChange={handleChange}
                    placeholder="Enter your address"
                    disabled={isReadOnly}
                    className={`${inputClass(errors.address, isReadOnly)} ${
                      isReadOnly ? "opacity-60 cursor-not-allowed" : ""
                    }`}
                  />
                  {errors.address && !isReadOnly && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.address}
                    </p>
                  )}
                </div>

                {/* City */}
                <div className="space-y-1">
                  <label
                    htmlFor="city"
                    className="block text-sm font-medium text-gray-700"
                  >
                    City *
                  </label>
                  <input
                    id="city"
                    type="text"
                    name="city"
                    value={state.city}
                    onChange={handleChange}
                    placeholder="Enter your city"
                    disabled={isReadOnly}
                    className={`${inputClass(errors.city, isReadOnly)} ${
                      isReadOnly ? "opacity-60 cursor-not-allowed" : ""
                    }`}
                  />
                  {errors.city && !isReadOnly && (
                    <p className="text-red-500 text-xs mt-1">{errors.city}</p>
                  )}
                </div>

                {/* State */}
                <div className="space-y-1">
                  <label
                    htmlFor="state"
                    className="block text-sm font-medium text-gray-700"
                  >
                    State *
                  </label>
                  <input
                    id="state"
                    type="text"
                    name="state"
                    value={state.state}
                    onChange={handleChange}
                    placeholder="Enter your state"
                    disabled={isReadOnly}
                    className={`${inputClass(errors.state, isReadOnly)} ${
                      isReadOnly ? "opacity-60 cursor-not-allowed" : ""
                    }`}
                  />
                  {errors.state && !isReadOnly && (
                    <p className="text-red-500 text-xs mt-1">{errors.state}</p>
                  )}
                </div>

                {/* Country */}
                <div className="space-y-1 sm:col-span-1">
                  <label
                    htmlFor="country"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Country *
                  </label>
                  <select
                    id="country"
                    name="country"
                    value={state.country}
                    onChange={handleChange}
                    disabled={
                      (userData?.data && Object.keys(userData.data).length > 0) || isReadOnly
                    }
                    className={`${inputClass(errors.country, isReadOnly)} ${
                      (userData?.data && Object.keys(userData.data).length > 0) || isReadOnly
                        ? "opacity-60 cursor-not-allowed"
                        : ""
                    }`}
                  >
                    <option value="">Select Country</option>
                    {countryCodes?.map(({ country_name }) => (
                      <option key={country_name} value={country_name}>
                        {country_name}
                      </option>
                    ))}
                  </select>
                  {errors.country && !isReadOnly && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.country}
                    </p>
                  )}
                </div>
              </div>

              {/* Submit Button - Only show if profile is not locked */}
              {!isReadOnly && (
                <button
                  type="submit"
                  disabled={loading || updateLoader}
                  className={`w-full mt-4 sm:mt-6 py-2.5 rounded-full font-semibold transition shadow-md text-sm sm:text-base ${
                    loading || updateLoader
                      ? "bg-gray-400 text-gray-600 cursor-not-allowed"
                      : "bg-teal-600 hover:bg-teal-700 text-white"
                  }`}
                >
                  {loading || updateLoader
                    ? "Updating..."
                    : userData?.data && Object.keys(userData.data).length > 0
                    ? "Update Profile"
                    : "Create Profile"}
                </button>
              )}

              {/* Info Message when profile is locked */}
            
            </form>
          </div>

          {/* Password Section */}
          <div className="w-full xl:w-1/3 space-y-4 sm:space-y-6 border-t xl:border-t-0 xl:border-l pt-6 xl:pt-0 xl:pl-6 lg:pl-8">
            {/* Security Notice */}
            <div className="bg-teal-50 border border-teal-200 rounded-lg p-3 sm:p-4 text-sm text-teal-900 shadow-sm">
              <p className="font-semibold mb-1 text-xs sm:text-sm">
                Security Reminder
              </p>
              <p className="leading-relaxed text-xs sm:text-sm">
                <span className="text-teal-700">
                  Enter your current password
                </span>{" "}
                before making any changes to your password. This helps us verify
                that it's really you and keeps your information safe.
              </p>
            </div>

            {/* Password Section Header */}
            <h3 className="text-lg sm:text-xl font-semibold text-gray-800 flex items-center gap-2">
              <LockKeyhole className="text-teal-600 w-5 h-5 sm:w-6 sm:h-6" />
              Change Password
            </h3>

            <div className="flex flex-col gap-3 sm:gap-4">
              {/* Current Password */}
              <div className="space-y-1">
                <label
                  htmlFor="currentPassword"
                  className="block text-sm font-medium text-gray-700"
                >
                  Current Password *
                </label>
                <div className="relative">
                  <input
                    id="currentPassword"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    placeholder="Enter your current password"
                    readOnly={otpVerified}
                    className={`${inputClass(errors.password)} pr-10 ${
                      otpVerified ? "opacity-60" : ""
                    }`}
                  />
                  <button
                    type="button"
                    onClick={togglePassword}
                    disabled={otpVerified}
                    className="absolute right-3 top-2.5 text-gray-600 hover:text-teal-600 disabled:opacity-50"
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? "🙈" : "👁️"}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-500 text-xs mt-1">{errors.password}</p>
                )}
              </div>

              {/* OTP Input */}
              <div className="space-y-1">
                <label
                  htmlFor="otp"
                  className="block text-sm font-medium text-gray-700"
                >
                  OTP *
                </label>
                <div className="flex gap-2 sm:gap-3">
                  <input
                    id="otp"
                    type="text"
                    name="otp"
                    value={formData.otp}
                    onChange={(e) =>
                      setFormData({ ...formData, otp: e.target.value })
                    }
                    placeholder="Enter 4-digit OTP"
                    disabled={!otpSent}
                    className={`${inputClass(errors.otp)} flex-1 ${
                      !otpSent ? "opacity-60 cursor-not-allowed" : ""
                    }`}
                  />
                  <button
                    type="button"
                    onClick={handleSendOtp}
                    disabled={otpSent && !resendOtp}
                    className="px-3 sm:px-4 py-2 bg-[#1d8e85] text-white rounded-full font-medium transition whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed text-xs sm:text-sm flex-shrink-0"
                  >
                    {isOtpSending
                      ? "Sending..."
                      : otpSent && !resendOtp
                      ? `${Math.floor(timer / 60)}:${
                          timer % 60 < 10 ? `0${timer % 60}` : timer % 60
                        }`
                      : otpSent && resendOtp
                      ? "Resend"
                      : "Get OTP"}
                  </button>
                </div>
                {errors.otp && (
                  <p className="text-red-500 text-xs mt-1">{errors.otp}</p>
                )}
              </div>

              {/* Verify OTP Button */}
              {!otpVerified && otpSent && (
                <button
                  type="button"
                  onClick={handleVerifyOtp}
                  disabled={isVerifying}
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-2 sm:py-2.5 rounded-xl font-medium transition shadow disabled:opacity-50 text-sm sm:text-base"
                >
                  {isVerifying ? "Verifying..." : "Verify OTP"}
                </button>
              )}

              {/* Password Change Fields */}
              {otpVerified && (
                <div className="space-y-3 sm:space-y-4">
                  <div className="space-y-1">
                    <label
                      htmlFor="newPassword"
                      className="block text-sm font-medium text-gray-700"
                    >
                      New Password *
                    </label>
                    <input
                      id="newPassword"
                      type="password"
                      name="newPassword"
                      value={formData.newPassword}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          newPassword: e.target.value,
                        })
                      }
                      placeholder="Enter new password (min 6 characters)"
                      className={inputClass(errors.newPassword)}
                    />
                    {errors.newPassword && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.newPassword}
                      </p>
                    )}
                  </div>

                  <div className="space-y-1">
                    <label
                      htmlFor="confirmPassword"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Confirm New Password *
                    </label>
                    <input
                      id="confirmPassword"
                      type="password"
                      name="confirmPwd"
                      value={formData.confirmPwd}
                      onChange={(e) =>
                        setFormData({ ...formData, confirmPwd: e.target.value })
                      }
                      placeholder="Confirm your new password"
                      className={inputClass(errors.confirmPwd)}
                    />
                    {errors.confirmPwd && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.confirmPwd}
                      </p>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={handleChangePassword}
                    disabled={isLoading}
                    className="w-full bg-teal-700 hover:bg-teal-800 text-white py-2 sm:py-2.5 rounded-xl font-semibold transition shadow disabled:opacity-50 text-sm sm:text-base"
                  >
                    {isLoading ? "Changing..." : "Change Password"}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Image Preview Modal */}
      <ImagePreviewModal />
    </div>
  );
}