import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Phone,
  Users,
  Shield,
  ChevronDown,
  AlertCircle,
  CheckCircle,
  CreditCard ,
  ChevronRight 
} from "lucide-react";
import icon from "../assets/Images/greencoin.webp";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import Cookies from "js-cookie";
import {
  useRegisterMutation,
  useVerifyMutation,
  useLoginMutation,
  useOTPresentMutation,
} from "./authApiSlice";
import Seo from "../SeoContent/Seo";
import countrycodes from "./countryCodes.json";
import TermsConditionsModal from "./TermsAndConditions";
import * as yup from "yup";


const Notification = ({ type, message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const bgColor =
    type === "success"
      ? "bg-green-50 border-green-200"
      : "bg-red-50 border-red-200";
  const textColor = type === "success" ? "text-green-800" : "text-red-800";
  const Icon = type === "success" ? CheckCircle : AlertCircle;

  return (
    <div
      className={`fixed top-4 right-4 z-50 p-4 rounded-lg border ${bgColor} ${textColor} shadow-lg max-w-sm animate-slide-in`}
    >
      <div className="flex items-center gap-3">
        <Icon className="h-5 w-5 flex-shrink-0" />
        <p className="text-sm font-medium">{message}</p>
        <button
          onClick={onClose}
          className="ml-auto text-gray-400 hover:text-gray-600"
        >
          ×
        </button>
      </div>
    </div>
  );
};

const CountryCodeDropdown = ({ value, onChange, className, countryCodes }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Use the prop if provided, otherwise fallback to imported data
  const dataSource = countryCodes || countrycodes;

  const filteredCountries = dataSource.filter(
    (country) =>
      country.country_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      country.country_code.includes(searchTerm) ||
      country.country_code_alpha3
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
  );

  const selectedCountry =
    dataSource.find((c) => c.country_code === value) || dataSource[0];

  // Add click outside handler to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && !event.target.closest(".country-dropdown-container")) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="country-dropdown-container relative">
      <button
        type="button"
        onClick={() => {
          // console.log('Dropdown button clicked, isOpen:', !isOpen);
          setIsOpen(!isOpen);
        }}
        className={`${className} flex items-center justify-between min-w-[120px] hover:bg-teal-50 transition-colors duration-200`}
      >
        <span className="flex items-center gap-2 text-sm">
          <span className="text-lg">{selectedCountry?.flag}</span>
          <span className="font-medium">{selectedCountry?.country_code}</span>
        </span>
        <ChevronDown
          className={`h-4 w-4 text-gray-400 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* IMPORTANT: Added fixed positioning and higher z-index */}
      {isOpen && (
        <div
          className="fixed top-auto left-auto mt-1 w-80 bg-white border border-gray-200 rounded-lg shadow-2xl max-h-64 overflow-hidden"
          style={{
            zIndex: 9999,
            position: "absolute",
            top: "100%",
            left: "0",
            minWidth: "280px",
          }}
        >
          <div className="p-3 border-b border-gray-100 bg-gray-50">
            <input
              type="text"
              placeholder="Search countries..."
              value={searchTerm}
              onChange={(e) => {
                // console.log('Search term:', e.target.value);
                setSearchTerm(e.target.value);
              }}
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none"
              onClick={(e) => e.stopPropagation()}
            />
          </div>

          <div className="max-h-48 overflow-y-auto bg-white">
            {/* {console.log('Rendering countries, count:', filteredCountries.length)} */}
            {filteredCountries.length > 0 ? (
              filteredCountries.map((country, index) => {
                // console.log('Rendering country:', country.country_name);
                return (
                  <button
                    key={`${country.country_code}-${country.country_code_alpha3}-${index}`}
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      // console.log('Selected country:', country);
                      onChange(country.country_code);
                      setIsOpen(false);
                      setSearchTerm("");
                    }}
                    className="w-full px-4 py-3 text-left hover:bg-teal-50 flex items-center gap-3 text-sm transition-colors duration-150 border-b border-gray-50 last:border-b-0"
                  >
                    <span className="text-lg">{country.flag}</span>
                    <span className="font-medium text-gray-900">
                      {country.country_code}
                    </span>
                    <span className="text-gray-600 truncate">
                      {country.country_name}
                    </span>
                  </button>
                );
              })
            ) : (
              <div className="px-4 py-3 text-sm text-gray-500 text-center">
                {dataSource.length === 0
                  ? "No country data loaded"
                  : "No countries found"}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

const LoginComponent = ({ onToggleMode, isVisible }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [notification, setNotification] = useState(null);
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const [login, { isLoading, error: loginError }] = useLoginMutation();

  // Handle login error from RTK Query
  useEffect(() => {
    if (loginError) {
      const message =
        loginError?.data?.message || "Login failed. Please try again.";
      setNotification({ type: "error", message });
    }
  }, [loginError]);

  // Load saved email and remember me status
  useEffect(() => {
    const savedEmail = localStorage.getItem("email");
    const savedRememberMe = localStorage.getItem("rememberMe") === "true";

    if (savedEmail) {
      setFormData((prevValues) => ({ ...prevValues, email: savedEmail }));
    }
    setRememberMe(savedRememberMe);
  }, []);

  const validate = () => {
    const newErrors = {};
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!formData.email?.trim()) {
      newErrors.email = "Email is required";
    } else if (!formData.email.includes("@") || !formData.email.includes(".")) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleRememberMeChange = (e) => {
    setRememberMe(e.target.checked);
  };

  // Enhanced keydown handler for Enter key
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !isLoading) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) {
      setNotification({
        type: "error",
        message: "Please fix the highlighted fields.",
      });
      return;
    }

    if (rememberMe) {
      Cookies.set("email", formData.email?.trim(), { expires: 30 });
      Cookies.set("rememberMe", "true", { expires: 30 });
    } else {
      Cookies.remove("email");
      Cookies.remove("rememberMe");
    }

    try {
      const response = await login({
        email: formData.email?.trim(),
        password: formData.password,
        role: 1,
      }).unwrap();

      if (response?.success) {
        const userData = response?.data;

        // store tokens & user info
        Cookies.set("token", userData?.token, { expires: 7 });
        sessionStorage.setItem("token", userData?.token);
        Cookies.set("userData", JSON.stringify(userData), { expires: 7 });

        setNotification({
          type: "success",
          message: response?.message || "Login successful! Redirecting...",
        });

        // ✅ check KYC status before redirect
        setTimeout(() => {
          if (userData?.kycVerified === "approve") {
            navigate("/dashboard");
            // console.log("Redirecting to Dashboard");
          } else {
            navigate("/kyc-information");
            // console.log("Redirecting to KYC Information");
          }
        }, 1000);
      } else {
        setNotification({
          type: "error",
          message: response?.message || "Login failed.",
        });
      }
    } catch (err) {
      const errorMessage = err?.data?.message || "Login error";
      setNotification({
        type: "error",
        message: errorMessage,
      });
    }
  };

  return (
    <div
      className={`w-full max-w-md transition-all duration-500 transform ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
    >
      <Seo page="login" />

      {notification && (
        <Notification
          type={notification.type}
          message={notification.message}
          onClose={() => setNotification(null)}
        />
      )}

      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2 uppercase">
          Login
        </h1>
        <p className="text-gray-600">
          If you are already a customer, enter your details
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Email Field */}
        <div className="relative mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email <span className="text-red-500 ml-1">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
              <Mail className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              placeholder="Enter your email"
              autoComplete="off"
              className={`w-full pl-10 pr-4 bg-white py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all duration-200 ${
                errors.email ? "border-red-500 bg-red-50" : "border-gray-300"
              }`}
            />
          </div>
          {errors.email && (
            <div className="text-red-500 text-sm mt-1">{errors.email}</div>
          )}
        </div>

        {/* Password Field */}
        <div className="relative mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Password <span className="text-red-500 ml-1">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
              <Lock className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              placeholder="Enter your password"
              autoComplete="off"
              className={`w-full bg-white pl-10 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all duration-200 ${
                errors.password ? "border-red-500 bg-red-50" : "border-gray-300"
              }`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5 text-gray-400" />
              ) : (
                <Eye className="h-5 w-5 text-gray-400" />
              )}
            </button>
          </div>
          {errors.password && (
            <div className="text-red-500 text-sm mt-1">{errors.password}</div>
          )}
        </div>

        {/* Remember Me and Forgot Password */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="rememberMe"
              checked={rememberMe}
              onChange={handleRememberMeChange}
              className="w-4 h-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
            />
            <label
              htmlFor="rememberMe"
              className="ml-2 text-sm text-gray-600 cursor-pointer"
            >
              Remember me
            </label>
          </div>
          <Link
            to="/forgot-password"
            className="text-teal-600 hover:text-teal-700 text-sm font-medium"
          >
            Forgot Password?
          </Link>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-gradient-to-r from-teal-500 to-green-600 text-white py-3 px-4 rounded-full font-semibold hover:from-teal-600 hover:to-green-700 focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 transform hover:scale-[1.02] transition-all duration-200 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed mt-6 uppercase"
        >
          {isLoading ? "Signing In..." : "Login"}
        </button>
      </form>

      {/* Register Link */}
      <div className="mt-8 text-center">
        <p className="text-gray-600 mb-2">Don't have an account?</p>
        <button
          onClick={onToggleMode}
          className="text-teal-600 hover:text-teal-700 font-semibold"
        >
          Register Now
        </button>
      </div>
    </div>
  );
};
const RegisterComponent = ({
  onSubmit,
  onToggleMode,
  isVisible,
  showModal,
  onShowModal,
  onCloseModal,
  onAgreeTerms,
  isConfirmAgree,
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  // const location = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [selectedCode, setSelectedCode] = useState("+91");
  const [notification, setNotification] = useState(null);
  const [isOtpSending, setIsOtpSending] = useState(false);
  const [timer, setTimer] = useState(0);
  const [canResendOtp, setCanResendOtp] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
const [referralApplied, setReferralApplied] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
    referralId: "",
    referralLocked: false,
    otp: "",
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const referralCode = searchParams.get("referralCode");

    if (referralCode) {
      // console.log("Referral code found in URL:", referralCode);

      setFormData((prevData) => ({
        ...prevData,
        referralId: referralCode,
      }));

      setReferralApplied(true);

      // Mark as touched for validation purposes
      setTouched((prev) => ({
        ...prev,
        referralId: true,
      }));

      // Validate referral code
      const fieldError = validateField("referralId", referralCode);
      if (fieldError) {
        // console.log("Referral code validation error:", fieldError);
        setErrors((prev) => ({
          ...prev,
          referralId: fieldError,
        }));
      }
    }
  }, [location.search]);
  const [register, { isLoading: isRegisterLoading, error: registerError }] =
    useRegisterMutation();
  const [verify, { isLoading: isVerifyLoading, error: verifyError }] =
    useVerifyMutation();
  const [OTPresent, { isLoading: isOTPresentLoading, error: OTPresentError }] =
    useOTPresentMutation();

  // when component mounts, check URL for referralCode
useEffect(() => {
  const params = new URLSearchParams(location.search);
  const referralCode = params.get("referralCode");
  if (referralCode) {
    setFormData((prev) => ({
      ...prev,
      referralId: referralCode,
      referralLocked: true, // ✅ lock only for link-based refs
    }));
  }
}, [location.search]);


  const getCurrentCountry = () => {
    const country = countrycodes.find(
      (item) => item.country_code === selectedCode
    );
    return country;
  };

  // Yup validation schema
  const validationSchema = yup.object({
    name: yup
      .string()
      .required("Name is required")
      .min(2, "Name must be at least 2 characters")
      .matches(/^[a-zA-Z\s]*$/, "Name can only contain letters and spaces"),

    phone: yup
      .string()
      .required("Phone number is required")
      .matches(/^\d+$/, "Phone number can only contain digits")
      .test("phone-length", function (value) {
        const currentCountry = getCurrentCountry();
        const exactPhoneLength = currentCountry
          ? currentCountry.phone_number_length
          : 10;

        if (value && value.length !== exactPhoneLength) {
          return this.createError({
            message: `Phone number must be exactly ${exactPhoneLength} digits for ${
              currentCountry?.country_name || "selected country"
            }`,
          });
        }
        return true;
      }),

    email: yup
      .string()
      .required("Email is required")
      .matches(
        /^(?=[a-z0-9._%+-]*[a-z])[a-z0-9._%+-]+@(?:(?:[a-zA-Z0-9-]+\.)+(?:com|in|org|net|edu|gov|mil|info|co|io|me|biz)|jaimax\.com|test\.com)$/,
        "Invalid email(must contain at least one letter)"
      ),

    password: yup
      .string()
      .required("Password is required")
      .min(6, "Password must be at least 8 characters"),
    // .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    // .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    // .matches(/\d/, 'Password must contain at least one number')
    // .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Password must contain at least one special character'),
    confirmPassword: yup
      .string()
      .required("Please confirm your password")
      .oneOf([yup.ref("password")], "Passwords must match"),

    referralId: yup
      .string()
      .nullable()
      .test(
        "referral-format",
        "Referral ID can only contain letters and numbers length 13",
        function (value) {
          if (!value) return true; // Optional field
          return /^(?=.*[A-Z])(?=.*\d)[A-Z0-9]{13}$/.test(value);
        }
      ),

    otp: yup.string().when("otpSent", {
      is: true,
      then: (schema) =>
        schema
          .required("OTP is required")
          .matches(/^\d{6}$/, "OTP must be 6 digits"),
      otherwise: (schema) => schema.nullable(),
    }),
  });

  const handleKeyDown = (e) => {
    if (
      e.key === "Enter" &&
      !isVerifyLoading &&
      !isRegisterLoading &&
      !isOTPresentLoading
    ) {
      e.preventDefault();

      // If OTP is not sent yet, try to send OTP
      if (!otpSent) {
        const validationErrors = validate();
        const formErrorsExceptOtp =
          Object.keys(validationErrors).filter((key) => key !== "otp").length >
          0;

        if (!formErrorsExceptOtp) {
          handleVerify(e);
        }
      }
      // If OTP is sent and form is complete, submit the form
      else if (otpSent && formData.otp.trim() && isChecked && isConfirmAgree) {
        handleSubmit(e);
      }
    }
  };

  const handleOtpKeyDown = (e) => {
    if (e.key === "Enter" && !isVerifyLoading) {
      e.preventDefault();

      // If form is complete and OTP is entered, submit
      if (otpSent && formData.otp.trim() && isChecked && isConfirmAgree) {
        handleSubmit(e);
      }
      // If OTP field has 4 digits and can resend, allow sending OTP
      else if (!otpSent || (canResendOtp && formData.otp.length === 4)) {
        handleVerify(e);
      }
    }
  };

  const handleCheckboxChange = (e) => {
    const isChecked = e.target.checked;

    if (isChecked) {
      // User wants to check the box - show modal first
      onShowModal();
    } else {
      // User unchecked the box - reset everything
      setIsChecked(false);
    }
  };

  const handleTermsLinkClick = (e) => {
    e.preventDefault();
    onShowModal();
  };

  // Update checkbox state when terms are confirmed
  useEffect(() => {
    if (isConfirmAgree) {
      setIsChecked(true);
    } else {
      setIsChecked(false);
    }
  }, [isConfirmAgree]);

  const getErrorMessage = (error) => {
    if (error) {
      if (error.data && error.data.message) {
        return error.data.message;
      } else if (error.error) {
        return error.error;
      } else if (error.status) {
        if (error.status === 400)
          return `Bad Request: ${
            error.data?.message || "Please check your input."
          }`;
        if (error.status === 401)
          return `Unauthorized: ${
            error.data?.message || "Invalid credentials."
          }`;
        if (error.status === 409)
          return `Conflict: ${
            error.data?.message || "User already exists or other conflict."
          }`;
        if (error.status >= 500)
          return `Server Error: ${
            error.data?.message || "Please try again later."
          }`;
        return `Error ${error.status}: ${
          error.data?.message || "An API error occurred."
        }`;
      }
    }
    return "An unexpected error occurred. Please try again.";
  };

  useEffect(() => {
    if (registerError) {
      setNotification({
        type: "error",
        message: getErrorMessage(registerError),
      });
    }
  }, [registerError]);

  useEffect(() => {
    if (verifyError) {
      setNotification({ type: "error", message: getErrorMessage(verifyError) });
    }
  }, [verifyError]);

  useEffect(() => {
    if (OTPresentError) {
      setNotification({
        type: "error",
        message: getErrorMessage(OTPresentError),
      });
    }
  }, [OTPresentError]);

  useEffect(() => {
    let interval;
    if (otpSent && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      setCanResendOtp(true);
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [otpSent, timer]);

  // Validate single field
  const validateField = (fieldName, value) => {
    try {
      const dataToValidate = { ...formData, [fieldName]: value, otpSent };
      validationSchema.validateSyncAt(fieldName, dataToValidate);
      return null;
    } catch (error) {
      return error.message;
    }
  };

  // Validate all fields
  const validateAll = () => {
    try {
      const dataToValidate = { ...formData, otpSent };
      validationSchema.validateSync(dataToValidate, { abortEarly: false });
      return {};
    } catch (error) {
      const validationErrors = {};
      error.inner.forEach((err) => {
        validationErrors[err.path] = err.message;
      });
      return validationErrors;
    }
  };

  // Legacy validate function for backward compatibility
  const validate = () => {
    return validateAll();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Don't allow changing referral code if it was applied from URL
    if (name === "referralId" && referralApplied) {
      return;
    }

    if (name === "phone" && !/^\d*$/.test(value)) {
      return;
    }
    if (name === "name" && !/^[a-zA-Z\s]*$/.test(value)) {
      return;
    }
    if (name === "referralId" && !/^[A-Za-z0-9]*$/.test(value)) {
      return;
    }
    if (name === "otp" && !/^[0-9]*$/.test(value)) {
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Only validate and show error if field was touched
    if (touched[name]) {
      const fieldError = validateField(name, value);
      setErrors((prev) => ({
        ...prev,
        [name]: fieldError,
      }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;

    // Mark field as touched
    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));

    // Validate only this field on blur
    const fieldError = validateField(name, value);
    setErrors((prev) => ({
      ...prev,
      [name]: fieldError,
    }));
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    setNotification(null);

    const validationErrors = validateAll();
    const formErrorsExceptOtp =
      Object.keys(validationErrors).filter((key) => key !== "otp").length > 0;

    if (formErrorsExceptOtp) {
      // Mark all fields as touched and show all errors
      const touchedFields = {};
      Object.keys(formData).forEach((key) => {
        touchedFields[key] = true;
      });
      setTouched(touchedFields);
      setErrors(validationErrors);

      setNotification({
        type: "error",
        message: "Please fill all required fields correctly.",
      });
      return;
    }

    setIsOtpSending(true);

    try {
      const currentCountry = getCurrentCountry();

      const payload = {
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        password: formData.password,
        confirmPwd: formData.confirmPassword,
        countryCode: currentCountry?.country_code || "+91",
        country: currentCountry?.country_name || "India",
      };

      const result = await register(payload).unwrap();

      // if (result?.data?.username) {
      //   localStorage.setItem("username", result.data.username);
      // }
      if (result?.data?.username) {
        Cookies.set("username", result.data.username, { expires: 7 }); // expires in 7 days
      }
      setOtpSent(true);
      setTimer(120);
      setCanResendOtp(false);
      setNotification({ type: "success", message: "OTP sent to your email!" });
    } catch (err) {
      if (err?.data?.message === "User verification pending") {
        try {
          const otpPayload = {
            email: formData.email,
            otpType: "register",
          };
          const ress = await OTPresent(otpPayload).unwrap();
          setOtpSent(true);
          setTimer(120);
          setCanResendOtp(false);
          setNotification({
            type: "success",
            message: "OTP resent to your email!",
          });
        } catch (otpErr) {
          setNotification({ type: "error", message: getErrorMessage(otpErr) });
        }
      } else {
        setNotification({ type: "error", message: getErrorMessage(err) });
      }
    } finally {
      setIsOtpSending(false);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setNotification(null);

    // Mark all fields as touched for final validation
    const touchedFields = {};
    Object.keys(formData).forEach((key) => {
      touchedFields[key] = true;
    });
    setTouched(touchedFields);

    const validationErrors = validateAll();
    setErrors(validationErrors);

    // Check if terms are accepted
    if (!isChecked || !isConfirmAgree) {
      setNotification({
        type: "error",
        message:
          "Please accept the Terms & Conditions and Privacy Policy to continue.",
      });
      return;
    }

    if (Object.keys(validationErrors).length > 0) {
      setNotification({
        type: "error",
        message: "Please correct the highlighted fields.",
      });
      return;
    }

    if (!otpSent) {
      setNotification({
        type: "error",
        message: "Please send OTP and verify your phone number first.",
      });
      return;
    }

    if (!formData.otp.trim()) {
      setNotification({
        type: "error",
        message: "OTP is required to complete registration.",
      });
      setErrors((prev) => ({ ...prev, otp: "OTP is required" }));
      return;
    }

    try {
      const verifyPayload = {
        email: formData.email,
        otp: Number(formData.otp),
        otpType: "register",
        referenceId: formData.referralId,
      };

      const res = await verify(verifyPayload).unwrap();

      if (!res.success) {
        setNotification({
          type: "error",
          message: res.message || "OTP verification failed. Please try again.",
        });
        return;
      }

      const userRegisterData = {
        ...res,
        email: formData.email,
        name: formData.name,
        username: Cookies.get("username"), // Changed from localStorage
      };

      // Set cookies instead of localStorage
      Cookies.set("token", res?.data?.token, { expires: 7 }); // expires in 7 days
      Cookies.set("userData", JSON.stringify(res?.data), { expires: 7 });
      const userData = JSON.parse(Cookies.get("userData") || "{}");
      // console.log("User Data:", userData);
      Cookies.set("userRegisterData", JSON.stringify(userRegisterData), {
        expires: 7,
      });

      setNotification({
        type: "success",
        message: res?.message || "Registration completed successfully!",
      });

      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);
    } catch (err) {
      setNotification({ type: "error", message: getErrorMessage(err) });
    }
  };
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setNotification(null);

  //   // Mark all fields as touched for final validation
  //   const touchedFields = {};
  //   Object.keys(formData).forEach(key => {
  //     touchedFields[key] = true;
  //   });
  //   setTouched(touchedFields);

  //   const validationErrors = validateAll();
  //   setErrors(validationErrors);

  //   // Check if terms are accepted
  //   if (!isChecked || !isConfirmAgree) {
  //     setNotification({
  //       type: 'error',
  //       message: 'Please accept the Terms & Conditions and Privacy Policy to continue.'
  //     });
  //     return;
  //   }

  //   if (Object.keys(validationErrors).length > 0) {
  //     setNotification({
  //       type: 'error',
  //       message: "Please correct the highlighted fields."
  //     });
  //     return;
  //   }

  //   if (!otpSent) {
  //     setNotification({
  //       type: 'error',
  //       message: 'Please send OTP and verify your phone number first.'
  //     });
  //     return;
  //   }

  //   if (!formData.otp.trim()) {
  //     setNotification({
  //       type: 'error',
  //       message: 'OTP is required to complete registration.'
  //     });
  //     setErrors(prev => ({ ...prev, otp: 'OTP is required' }));
  //     return;
  //   }

  //   try {
  //     const verifyPayload = {
  //       email: formData.email,
  //       otp: Number(formData.otp),
  //       otpType: "register",
  //       referenceId: formData.referralId,
  //     };

  //     const res = await verify(verifyPayload).unwrap();

  //     if (!res.success) {
  //       setNotification({
  //         type: 'error',
  //         message: res.message || 'OTP verification failed. Please try again.'
  //       });
  //       return;
  //     }

  //     const userRegisterData = {
  //       ...res,
  //       email: formData.email,
  //       name: formData.name,
  //       username: localStorage.getItem("username"),
  //     };

  //     localStorage.setItem("token", res?.data?.token);
  //     localStorage.setItem("userData", JSON.stringify(res));

  //     setNotification({
  //       type: 'success',
  //       message: res?.message || 'Registration completed successfully!'
  //     });

  //     localStorage.setItem(
  //       "userRegisterData",
  //       JSON.stringify(userRegisterData)
  //     );

  //     setTimeout(() => {
  //       navigate("/dashboard");
  //     }, 1000);

  //   } catch (err) {
  //     setNotification({ type: 'error', message: getErrorMessage(err) });
  //   }
  // };

  return (
    <div
      className={`w-full max-w-md mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-500 transform ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
    >
      {notification && (
        <Notification
          type={notification.type}
          message={notification.message}
          onClose={() => setNotification(null)}
        />
      )}
      <Seo page="register" />
      <div className="text-center mb-1 sm:mb-6">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-1">
          REGISTER
        </h1>
        <p className="text-sm text-gray-600">
          Create a new account to get started
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name Field */}
        <div className="space-y-1">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
              <User className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              onBlur={handleBlur}
              placeholder="Full Name"
              className={`w-full pl-10 bg-white pr-3 py-2.5 text-sm border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all duration-200 ${
                errors.name && touched.name
                  ? "border-red-500 bg-red-50"
                  : "border-gray-300"
              }`}
            />
          </div>
          {errors.name && touched.name && (
            <p className="text-red-500 text-xs pl-1">{errors.name}</p>
          )}
        </div>

        {/* Phone Field */}
        <div className="space-y-0">
          <div
            className={`flex rounded-lg border transition-all duration-200 ${
              errors.phone && touched.phone
                ? "border-red-500 bg-red-50"
                : "border-gray-300 focus-within:border-teal-500 focus-within:ring-2 focus-within:ring-teal-500"
            }`}
          >
            <div className="flex-shrink-0">
              <CountryCodeDropdown
                value={selectedCode}
                onChange={setSelectedCode}
                className="bg-gray-50 py-2.5 px-2 text-sm border-r border-gray-200 hover:bg-gray-100 min-w-0"
                countryCodes={countrycodes}
              />
            </div>
            <div className="relative flex-1 min-w-0">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                <Phone className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                onBlur={handleBlur}
                placeholder="Phone Number"
                className="w-full pl-10 pr-3 py-2.5 text-sm border-0 bg-transparent outline-none"
              />
            </div>
          </div>
          {errors.phone && touched.phone && (
            <p className="text-red-500 text-xs pl-1">{errors.phone}</p>
          )}
        </div>

        {/* Email Field */}
        <div className="space-y-0">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
              <Mail className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              onBlur={handleBlur}
              placeholder="Email"
              className={`w-full pl-10 pr-3 py-2.5  bg-white text-sm border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all duration-200 ${
                errors.email && touched.email
                  ? "border-red-500 bg-red-50"
                  : "border-gray-300"
              }`}
            />
          </div>
          {errors.email && touched.email && (
            <p className="text-red-500 text-xs pl-1">{errors.email}</p>
          )}
        </div>

        {/* Password Field */}
        <div className="space-y-0">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
              <Lock className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              onBlur={handleBlur}
              placeholder="Password"
              className={`w-full pl-10 pr-10 bg-white py-2.5 text-sm border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all duration-200 ${
                errors.password && touched.password
                  ? "border-red-500 bg-red-50"
                  : "border-gray-300"
              }`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center hover:bg-gray-50 rounded-r-lg transition-colors z-10"
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4 text-gray-400 hover:text-gray-600" />
              ) : (
                <Eye className="h-4 w-4 text-gray-400 hover:text-gray-600" />
              )}
            </button>
          </div>
          {errors.password && touched.password && (
            <p className="text-red-500 text-xs pl-1">{errors.password}</p>
          )}
        </div>

        {/* Confirm Password Field */}
        <div className="space-y-0">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
              <Lock className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={formData.confirmPassword}
              onKeyDown={handleKeyDown}
              onChange={handleInputChange}
              onBlur={handleBlur}
              placeholder="Confirm Password"
              className={`w-full pl-10 pr-10 bg-white py-2.5 text-sm border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all duration-200 ${
                errors.confirmPassword && touched.confirmPassword
                  ? "border-red-500 bg-red-50"
                  : "border-gray-300"
              }`}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center hover:bg-gray-50 rounded-r-lg transition-colors z-10"
            >
              {showConfirmPassword ? (
                <EyeOff className="h-4 w-4 text-gray-400 hover:text-gray-600" />
              ) : (
                <Eye className="h-4 w-4 text-gray-400 hover:text-gray-600" />
              )}
            </button>
          </div>
          {errors.confirmPassword && touched.confirmPassword && (
            <p className="text-red-500 text-xs pl-1">
              {errors.confirmPassword}
            </p>
          )}
        </div>

        {/* Referral ID Field */}
        {/* <div className="space-y-0">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
              <Users className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              name="referralId"
              value={formData.referralId}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              onBlur={handleBlur}
              readOnly={formData.referralLocked} 
              // readOnly={!!formData.referralId}
              placeholder="Referral ID (Optional)"
              className={`w-full pl-10 pr-3 bg-white py-2.5 text-sm border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all duration-200 ${
                errors.referralId && touched.referralId
                  ? "border-red-500 bg-red-50"
                  : "border-gray-300"
              }`}
            />
          </div>
          {errors.referralId && touched.referralId && (
            <p className="text-red-500 text-xs pl-1">{errors.referralId}</p>
          )}
        </div> */}
        <div className="space-y-0">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
              <Users className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              name="referralId"
              value={formData.referralId}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              onBlur={handleBlur}
              readOnly={referralApplied}
              placeholder="Referral ID (Optional)"
              className={`w-full pl-10 pr-3 py-2.5 text-sm bg-white border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all duration-200 ${
                errors.referralId && touched.referralId
                  ? "border-red-500 bg-red-50"
                  : referralApplied && formData.referralId
                  ? "border-green-500 bg-green-50 cursor-not-allowed"
                  : "border-gray-300"
              }`}
            />
            {referralApplied && formData.referralId && !errors.referralId && (
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <span className="text-green-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
              </div>
            )}
          </div>
          {errors.referralId && touched.referralId && (
            <p className="text-red-500 text-xs pl-1">{errors.referralId}</p>
          )}
          {referralApplied && formData.referralId && !errors.referralId && (
            <p className="text-green-600 text-xs pl-1">
              Referral code applied!
            </p>
          )}
        </div>

        {/* OTP Field */}
        <div className="space-y-0">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                <Shield className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                name="otp"
                value={formData.otp}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                onBlur={handleBlur}
                placeholder="Enter 6-digit OTP"
                maxLength="6"
                className={`w-full bg-white pl-10 pr-3 py-2.5 text-sm border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all duration-200 ${
                  errors.otp && touched.otp
                    ? "border-red-500 bg-red-50"
                    : "border-gray-300"
                }`}
              />
            </div>
            <button
              type="button"
              onClick={handleVerify}
              disabled={
                isRegisterLoading ||
                isOTPresentLoading ||
                (otpSent && !canResendOtp) ||
                Object.keys(validate()).filter((key) => !["otp"].includes(key))
                  .length > 0
              }
              className={`px-3 py-2.5 text-sm rounded-lg font-medium whitespace-nowrap transition-all duration-200 flex-shrink-0 ${
                otpSent && !canResendOtp
                  ? "bg-green-100 text-green-700 cursor-default"
                  : isRegisterLoading || isOTPresentLoading
                  ? "bg-gray-100 text-gray-500 cursor-not-allowed"
                  : Object.keys(validate()).filter(
                      (key) => !["otp"].includes(key)
                    ).length > 0
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-teal-500 text-white hover:bg-teal-600 transform hover:scale-105"
              }`}
            >
              {isRegisterLoading || isOTPresentLoading
                ? "Sending..."
                : otpSent && !canResendOtp
                ? `Sent (${timer}s)`
                : canResendOtp
                ? "Send OTP"
                : "Resend"}
            </button>
          </div>
          {errors.otp && touched.otp && (
            <p className="text-red-500 text-xs pl-1">{errors.otp}</p>
          )}
        </div>

        {/* Terms and Conditions */}
        <div className="flex items-start gap-2 pt-2">
          <input
            id="terms_and_conditions"
            type="checkbox"
            checked={isChecked && isConfirmAgree}
            onChange={handleCheckboxChange}
            className="mt-0.5 h-4 w-4 rounded border-gray-300 text-teal-600 focus:ring-teal-500 flex-shrink-0"
          />
          <label
            htmlFor="terms_and_conditions"
            className="text-xs sm:text-sm text-gray-700 leading-relaxed"
          >
            I accept the{" "}
            <button
              type="button"
              onClick={handleTermsLinkClick}
              className="text-teal-600 hover:underline font-medium"
            >
              Terms & Conditions
            </button>{" "}
            and{" "}
            <button
              type="button"
              onClick={handleTermsLinkClick}
              className="text-teal-600 hover:underline font-medium"
            >
              Privacy Policy
            </button>
          </label>
        </div>

        {/* Register Button */}
        <button
          type="submit"
          disabled={
            isVerifyLoading ||
            !otpSent ||
            !formData.otp.trim() ||
            !isChecked ||
            !isConfirmAgree ||
            !formData.name.trim() ||
            !formData.phone.trim() ||
            !formData.email.trim() ||
            !formData.password ||
            !formData.confirmPassword ||
            formData.password !== formData.confirmPassword ||
            (formData.referralId &&
              !/^(?=.*[A-Z])(?=.*\d)[A-Z0-9]{13}$/.test(formData.referralId))
          }
          className="w-full  bg-gradient-to-b from-[#0B736F]  to-[#0B736F] text-white py-2.5 px-4 rounded-full font-medium as focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 transform hover:scale-[1.02] transition-all duration-200 disabled:cursor-not-allowed disabled:transform-none text-sm sm:text-base"
        >
          {isVerifyLoading ? "Verifying OTP..." : "REGISTER"}
        </button>
      </form>

      <div className="mt-4 sm:mt-6 text-center">
        <p className="text-sm text-gray-600">
          Already have an account?{" "}
          <button
            onClick={onToggleMode}
            className="text-teal-600 hover:text-teal-700 font-medium"
          >
            Sign in
          </button>
        </p>
      </div>
    </div>
  );
};

// const STEPS = [
//   { id: 1, title: "Personal Info", icon: User },
//   { id: 2, title: "KYC Verification", icon: CreditCard },
//   { id: 3, title: "Security", icon: Shield },
// ];

// const RegisterComponent = ({
//   onSubmit,
//   onToggleMode,
//   isVisible,
//   showModal,
//   onShowModal,
//   onCloseModal,
//   onAgreeTerms,
//   isConfirmAgree,
// }) => {
//   const location = useLocation();
//   const navigate = useNavigate();

//   // Step management
//   const [currentStep, setCurrentStep] = useState(1);

//   // Password visibility
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);

//   // OTP states
//   const [otpSent, setOtpSent] = useState(false);
//   const [selectedCode, setSelectedCode] = useState("+91");
//   const [notification, setNotification] = useState(null);
//   const [isOtpSending, setIsOtpSending] = useState(false);
//   const [timer, setTimer] = useState(0);
//   const [canResendOtp, setCanResendOtp] = useState(false);
//   const [isChecked, setIsChecked] = useState(false);
//   const [referralApplied, setReferralApplied] = useState(false);

//   // Aadhaar verification states
//   const [aadhaarOtpSent, setAadhaarOtpSent] = useState(false);
//   const [aadhaarVerified, setAadhaarVerified] = useState(false);
//   const [aadhaarTimer, setAadhaarTimer] = useState(0);
//   const [canResendAadhaarOtp, setCanResendAadhaarOtp] = useState(false);
//   const [aadhaarTransactionId, setAadhaarTransactionId] = useState("");

//   // PAN verification states
//   const [panVerified, setPanVerified] = useState(false);
//   const [panVerifying, setPanVerifying] = useState(false);

//   const [formData, setFormData] = useState({
//     // Step 1: Personal Info
//     name: "",
//     phone: "",
//     email: "",
//     referralId: "",
//     referralLocked: false,

//     // Step 2: KYC Verification
//     aadhaarNumber: "",
//     aadhaarOtp: "",
//     panNumber: "",
//     panName: "", // Name as per PAN

//     // Step 3: Security
//     password: "",
//     confirmPassword: "",
//     otp: "",
//   });

//   const [errors, setErrors] = useState({});
//   const [touched, setTouched] = useState({});

//   // API mutations
//   const [register, { isLoading: isRegisterLoading, error: registerError }] =
//     useRegisterMutation();
//   const [verify, { isLoading: isVerifyLoading, error: verifyError }] =
//     useVerifyMutation();
//   const [OTPresent, { isLoading: isOTPresentLoading, error: OTPresentError }] =
//     useOTPresentMutation();

//   // Mock mutations for Aadhaar and PAN - replace with your actual API calls
//   const [verifyAadhaar, { isLoading: isAadhaarLoading }] =
//     useRegisterMutation?.() || [() => Promise.resolve(), { isLoading: false }];
//   const [verifyPan, { isLoading: isPanLoading }] =
//     useVerifyMutation?.() || [() => Promise.resolve(), { isLoading: false }];

//   // Referral code from URL
//   useEffect(() => {
//     const searchParams = new URLSearchParams(location.search);
//     const referralCode = searchParams.get("referralCode");

//     if (referralCode) {
//       setFormData((prevData) => ({
//         ...prevData,
//         referralId: referralCode,
//         referralLocked: true,
//       }));
//       setReferralApplied(true);
//       setTouched((prev) => ({ ...prev, referralId: true }));

//       const fieldError = validateField("referralId", referralCode);
//       if (fieldError) {
//         setErrors((prev) => ({ ...prev, referralId: fieldError }));
//       }
//     }
//   }, [location.search]);

//   const getCurrentCountry = () => {
//     const country = countrycodes.find(
//       (item) => item.country_code === selectedCode
//     );
//     return country;
//   };

//   // Validation schemas for each step
//   const step1Schema = yup.object({
//     name: yup
//       .string()
//       .required("Name is required")
//       .min(2, "Name must be at least 2 characters")
//       .matches(/^[a-zA-Z\s]*$/, "Name can only contain letters and spaces"),

//     phone: yup
//       .string()
//       .required("Phone number is required")
//       .matches(/^\d+$/, "Phone number can only contain digits")
//       .test("phone-length", function (value) {
//         const currentCountry = getCurrentCountry();
//         const exactPhoneLength = currentCountry
//           ? currentCountry.phone_number_length
//           : 10;

//         if (value && value.length !== exactPhoneLength) {
//           return this.createError({
//             message: `Phone number must be exactly ${exactPhoneLength} digits`,
//           });
//         }
//         return true;
//       }),

//     email: yup
//       .string()
//       .required("Email is required")
//       .matches(
//         /^(?=[a-z0-9._%+-]*[a-z])[a-z0-9._%+-]+@(?:(?:[a-zA-Z0-9-]+\.)+(?:com|in|org|net|edu|gov|mil|info|co|io|me|biz)|jaimax\.com|test\.com)$/,
//         "Invalid email format"
//       ),

//     referralId: yup
//       .string()
//       .nullable()
//       .test("referral-format", "Invalid referral ID format", function (value) {
//         if (!value) return true;
//         return /^(?=.*[A-Z])(?=.*\d)[A-Z0-9]{13}$/.test(value);
//       }),
//   });

//   const step2Schema = yup.object({
//     aadhaarNumber: yup
//       .string()
//       .required("Aadhaar number is required")
//       .matches(/^\d{12}$/, "Aadhaar number must be exactly 12 digits"),

//     aadhaarOtp: yup.string().when("aadhaarOtpSent", {
//       is: true,
//       then: (schema) =>
//         schema
//           .required("Aadhaar OTP is required")
//           .matches(/^\d{6}$/, "OTP must be 6 digits"),
//       otherwise: (schema) => schema.nullable(),
//     }),

//     panNumber: yup
//       .string()
//       .required("PAN number is required")
//       .matches(
//         /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/,
//         "Invalid PAN format (e.g., ABCDE1234F)"
//       ),

//     panName: yup
//       .string()
//       .required("Name as per PAN is required")
//       .min(2, "Name must be at least 2 characters"),
//   });

//   const step3Schema = yup.object({
//     password: yup
//       .string()
//       .required("Password is required")
//       .min(6, "Password must be at least 6 characters"),

//     confirmPassword: yup
//       .string()
//       .required("Please confirm your password")
//       .oneOf([yup.ref("password")], "Passwords must match"),

//     otp: yup.string().when("otpSent", {
//       is: true,
//       then: (schema) =>
//         schema
//           .required("OTP is required")
//           .matches(/^\d{6}$/, "OTP must be 6 digits"),
//       otherwise: (schema) => schema.nullable(),
//     }),
//   });

//   // Get current step schema
//   const getCurrentSchema = () => {
//     switch (currentStep) {
//       case 1:
//         return step1Schema;
//       case 2:
//         return step2Schema;
//       case 3:
//         return step3Schema;
//       default:
//         return step1Schema;
//     }
//   };

//   // Validate single field
//   const validateField = (fieldName, value) => {
//     try {
//       const schema = getCurrentSchema();
//       const dataToValidate = {
//         ...formData,
//         [fieldName]: value,
//         otpSent,
//         aadhaarOtpSent,
//       };
//       schema.validateSyncAt(fieldName, dataToValidate);
//       return null;
//     } catch (error) {
//       return error.message;
//     }
//   };

//   // Validate current step
//   const validateCurrentStep = () => {
//     try {
//       const schema = getCurrentSchema();
//       const dataToValidate = { ...formData, otpSent, aadhaarOtpSent };
//       schema.validateSync(dataToValidate, { abortEarly: false });
//       return {};
//     } catch (error) {
//       const validationErrors = {};
//       error.inner?.forEach((err) => {
//         validationErrors[err.path] = err.message;
//       });
//       return validationErrors;
//     }
//   };

//   // Handle input change
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;

//     // Input restrictions
//     if (name === "referralId" && referralApplied) return;
//     if (name === "phone" && !/^\d*$/.test(value)) return;
//     if (name === "name" && !/^[a-zA-Z\s]*$/.test(value)) return;
//     if (name === "panName" && !/^[a-zA-Z\s]*$/.test(value)) return;
//     if (name === "referralId" && !/^[A-Za-z0-9]*$/.test(value)) return;
//     if (name === "otp" && !/^[0-9]*$/.test(value)) return;
//     if (name === "aadhaarNumber" && !/^\d*$/.test(value)) return;
//     if (name === "aadhaarOtp" && !/^\d*$/.test(value)) return;
//     if (name === "panNumber") {
//       const upperValue = value.toUpperCase();
//       if (!/^[A-Z0-9]*$/.test(upperValue)) return;
//       setFormData((prev) => ({ ...prev, [name]: upperValue }));
//       if (touched[name]) {
//         const fieldError = validateField(name, upperValue);
//         setErrors((prev) => ({ ...prev, [name]: fieldError }));
//       }
//       return;
//     }

//     setFormData((prev) => ({ ...prev, [name]: value }));

//     if (touched[name]) {
//       const fieldError = validateField(name, value);
//       setErrors((prev) => ({ ...prev, [name]: fieldError }));
//     }
//   };

//   // Handle blur
//   const handleBlur = (e) => {
//     const { name, value } = e.target;
//     setTouched((prev) => ({ ...prev, [name]: true }));
//     const fieldError = validateField(name, value);
//     setErrors((prev) => ({ ...prev, [name]: fieldError }));
//   };

//   // Aadhaar Timer
//   useEffect(() => {
//     let interval;
//     if (aadhaarOtpSent && aadhaarTimer > 0) {
//       interval = setInterval(() => {
//         setAadhaarTimer((prev) => prev - 1);
//       }, 1000);
//     } else if (aadhaarTimer === 0 && aadhaarOtpSent) {
//       setCanResendAadhaarOtp(true);
//       clearInterval(interval);
//     }
//     return () => clearInterval(interval);
//   }, [aadhaarOtpSent, aadhaarTimer]);

//   // Email OTP Timer
//   useEffect(() => {
//     let interval;
//     if (otpSent && timer > 0) {
//       interval = setInterval(() => {
//         setTimer((prev) => prev - 1);
//       }, 1000);
//     } else if (timer === 0) {
//       setCanResendOtp(true);
//       clearInterval(interval);
//     }
//     return () => clearInterval(interval);
//   }, [otpSent, timer]);

//   // Send Aadhaar OTP
//   const handleSendAadhaarOtp = async () => {
//     setNotification(null);

//     if (!/^\d{12}$/.test(formData.aadhaarNumber)) {
//       setErrors((prev) => ({
//         ...prev,
//         aadhaarNumber: "Please enter a valid 12-digit Aadhaar number",
//       }));
//       return;
//     }

//     try {
//       // Replace with your actual Aadhaar OTP API call
//       const response = await verifyAadhaar({
//         aadhaarNumber: formData.aadhaarNumber,
//         action: "sendOtp",
//       }).unwrap();

//       setAadhaarTransactionId(response?.transactionId || "mock-transaction-id");
//       setAadhaarOtpSent(true);
//       setAadhaarTimer(120);
//       setCanResendAadhaarOtp(false);
//       setNotification({
//         type: "success",
//         message: "OTP sent to your Aadhaar-linked mobile number!",
//       });
//     } catch (err) {
//       // Mock success for development - remove in production
//       setAadhaarOtpSent(true);
//       setAadhaarTimer(120);
//       setCanResendAadhaarOtp(false);
//       setNotification({
//         type: "success",
//         message: "OTP sent to your Aadhaar-linked mobile number!",
//       });
//     }
//   };

//   // Verify Aadhaar OTP
//   const handleVerifyAadhaarOtp = async () => {
//     setNotification(null);

//     if (!/^\d{6}$/.test(formData.aadhaarOtp)) {
//       setErrors((prev) => ({
//         ...prev,
//         aadhaarOtp: "Please enter a valid 6-digit OTP",
//       }));
//       return;
//     }

//     try {
//       // Replace with your actual Aadhaar verification API call
//       const response = await verifyAadhaar({
//         aadhaarNumber: formData.aadhaarNumber,
//         otp: formData.aadhaarOtp,
//         transactionId: aadhaarTransactionId,
//         action: "verifyOtp",
//       }).unwrap();

//       setAadhaarVerified(true);
//       setNotification({
//         type: "success",
//         message: "Aadhaar verified successfully!",
//       });
//     } catch (err) {
//       // Mock success for development - remove in production
//       setAadhaarVerified(true);
//       setNotification({
//         type: "success",
//         message: "Aadhaar verified successfully!",
//       });
//     }
//   };

//   // Verify PAN
//   const handleVerifyPan = async () => {
//     setNotification(null);

//     if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(formData.panNumber)) {
//       setErrors((prev) => ({
//         ...prev,
//         panNumber: "Please enter a valid PAN number",
//       }));
//       return;
//     }

//     if (!formData.panName.trim()) {
//       setErrors((prev) => ({
//         ...prev,
//         panName: "Please enter name as per PAN",
//       }));
//       return;
//     }

//     setPanVerifying(true);

//     try {
//       // Replace with your actual PAN verification API call
//       const response = await verifyPan({
//         panNumber: formData.panNumber,
//         name: formData.panName,
//       }).unwrap();

//       setPanVerified(true);
//       setNotification({
//         type: "success",
//         message: "PAN verified successfully!",
//       });
//     } catch (err) {
//       // Mock success for development - remove in production
//       setPanVerified(true);
//       setNotification({
//         type: "success",
//         message: "PAN verified successfully!",
//       });
//     } finally {
//       setPanVerifying(false);
//     }
//   };

//   // Handle step navigation
//   const handleNextStep = () => {
//     const validationErrors = validateCurrentStep();

//     // Mark all current step fields as touched
//     const currentStepFields = getStepFields(currentStep);
//     const touchedFields = {};
//     currentStepFields.forEach((field) => {
//       touchedFields[field] = true;
//     });
//     setTouched((prev) => ({ ...prev, ...touchedFields }));

//     // Filter errors for current step only
//     const currentStepErrors = {};
//     currentStepFields.forEach((field) => {
//       if (validationErrors[field]) {
//         currentStepErrors[field] = validationErrors[field];
//       }
//     });

//     if (Object.keys(currentStepErrors).length > 0) {
//       setErrors((prev) => ({ ...prev, ...currentStepErrors }));
//       setNotification({
//         type: "error",
//         message: "Please fill all required fields correctly.",
//       });
//       return;
//     }

//     // Additional checks for step 2
//     if (currentStep === 2) {
//       if (!aadhaarVerified) {
//         setNotification({
//           type: "error",
//           message: "Please verify your Aadhaar number first.",
//         });
//         return;
//       }
//       if (!panVerified) {
//         setNotification({
//           type: "error",
//           message: "Please verify your PAN number first.",
//         });
//         return;
//       }
//     }

//     setCurrentStep((prev) => Math.min(prev + 1, 3));
//     setNotification(null);
//   };

//   const handlePrevStep = () => {
//     setCurrentStep((prev) => Math.max(prev - 1, 1));
//     setNotification(null);
//   };

//   const getStepFields = (step) => {
//     switch (step) {
//       case 1:
//         return ["name", "phone", "email", "referralId"];
//       case 2:
//         return ["aadhaarNumber", "aadhaarOtp", "panNumber", "panName"];
//       case 3:
//         return ["password", "confirmPassword", "otp"];
//       default:
//         return [];
//     }
//   };

//   // Handle email OTP
//   const handleVerify = async (e) => {
//     e.preventDefault();
//     setNotification(null);

//     const validationErrors = validateCurrentStep();
//     const formErrorsExceptOtp =
//       Object.keys(validationErrors).filter((key) => key !== "otp").length > 0;

//     if (formErrorsExceptOtp) {
//       const touchedFields = {};
//       Object.keys(formData).forEach((key) => {
//         touchedFields[key] = true;
//       });
//       setTouched(touchedFields);
//       setErrors(validationErrors);
//       setNotification({
//         type: "error",
//         message: "Please fill all required fields correctly.",
//       });
//       return;
//     }

//     setIsOtpSending(true);

//     try {
//       const currentCountry = getCurrentCountry();
//       const payload = {
//         name: formData.name,
//         phone: formData.phone,
//         email: formData.email,
//         password: formData.password,
//         confirmPwd: formData.confirmPassword,
//         countryCode: currentCountry?.country_code || "+91",
//         country: currentCountry?.country_name || "India",
//         aadhaarNumber: formData.aadhaarNumber,
//         panNumber: formData.panNumber,
//       };

//       const result = await register(payload).unwrap();

//       if (result?.data?.username) {
//         Cookies.set("username", result.data.username, { expires: 7 });
//       }
//       setOtpSent(true);
//       setTimer(120);
//       setCanResendOtp(false);
//       setNotification({ type: "success", message: "OTP sent to your email!" });
//     } catch (err) {
//       if (err?.data?.message === "User verification pending") {
//         try {
//           const otpPayload = { email: formData.email, otpType: "register" };
//           await OTPresent(otpPayload).unwrap();
//           setOtpSent(true);
//           setTimer(120);
//           setCanResendOtp(false);
//           setNotification({
//             type: "success",
//             message: "OTP resent to your email!",
//           });
//         } catch (otpErr) {
//           setNotification({ type: "error", message: getErrorMessage(otpErr) });
//         }
//       } else {
//         setNotification({ type: "error", message: getErrorMessage(err) });
//       }
//     } finally {
//       setIsOtpSending(false);
//     }
//   };

//   // Handle final submit
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setNotification(null);

//     // Check terms
//     if (!isChecked || !isConfirmAgree) {
//       setNotification({
//         type: "error",
//         message: "Please accept the Terms & Conditions and Privacy Policy.",
//       });
//       return;
//     }

//     if (!otpSent) {
//       setNotification({
//         type: "error",
//         message: "Please send OTP and verify your email first.",
//       });
//       return;
//     }

//     if (!formData.otp.trim()) {
//       setNotification({
//         type: "error",
//         message: "OTP is required to complete registration.",
//       });
//       setErrors((prev) => ({ ...prev, otp: "OTP is required" }));
//       return;
//     }

//     try {
//       const verifyPayload = {
//         email: formData.email,
//         otp: Number(formData.otp),
//         otpType: "register",
//         referenceId: formData.referralId,
//       };

//       const res = await verify(verifyPayload).unwrap();

//       if (!res.success) {
//         setNotification({
//           type: "error",
//           message: res.message || "OTP verification failed.",
//         });
//         return;
//       }

//       const userRegisterData = {
//         ...res,
//         email: formData.email,
//         name: formData.name,
//         username: Cookies.get("username"),
//       };

//       Cookies.set("token", res?.data?.token, { expires: 7 });
//       Cookies.set("userData", JSON.stringify(res?.data), { expires: 7 });
//       Cookies.set("userRegisterData", JSON.stringify(userRegisterData), {
//         expires: 7,
//       });

//       setNotification({
//         type: "success",
//         message: res?.message || "Registration completed successfully!",
//       });

//       setTimeout(() => {
//         navigate("/dashboard");
//       }, 1000);
//     } catch (err) {
//       setNotification({ type: "error", message: getErrorMessage(err) });
//     }
//   };

//   const getErrorMessage = (error) => {
//     if (error) {
//       if (error.data && error.data.message) return error.data.message;
//       if (error.error) return error.error;
//       if (error.status) {
//         if (error.status === 400)
//           return error.data?.message || "Please check your input.";
//         if (error.status === 401)
//           return error.data?.message || "Invalid credentials.";
//         if (error.status === 409)
//           return error.data?.message || "User already exists.";
//         if (error.status >= 500)
//           return error.data?.message || "Server error. Please try again.";
//         return error.data?.message || "An error occurred.";
//       }
//     }
//     return "An unexpected error occurred.";
//   };

//   const handleCheckboxChange = (e) => {
//     if (e.target.checked) {
//       onShowModal();
//     } else {
//       setIsChecked(false);
//     }
//   };

//   const handleTermsLinkClick = (e) => {
//     e.preventDefault();
//     onShowModal();
//   };

//   useEffect(() => {
//     if (isConfirmAgree) {
//       setIsChecked(true);
//     } else {
//       setIsChecked(false);
//     }
//   }, [isConfirmAgree]);

//   // Error handling for API errors
//   useEffect(() => {
//     if (registerError) {
//       setNotification({ type: "error", message: getErrorMessage(registerError) });
//     }
//   }, [registerError]);

//   useEffect(() => {
//     if (verifyError) {
//       setNotification({ type: "error", message: getErrorMessage(verifyError) });
//     }
//   }, [verifyError]);

//   useEffect(() => {
//     if (OTPresentError) {
//       setNotification({ type: "error", message: getErrorMessage(OTPresentError) });
//     }
//   }, [OTPresentError]);

//   // Step indicator component
//   const StepIndicator = () => (
//     <div className="mb-8">
//       <div className="flex items-center justify-between">
//         {STEPS.map((step, index) => {
//           const StepIcon = step.icon;
//           const isCompleted = currentStep > step.id;
//           const isCurrent = currentStep === step.id;

//           return (
//             <React.Fragment key={step.id}>
//               <div className="flex flex-col items-center">
//                 <div
//                   className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
//                     isCompleted
//                       ? "bg-green-500 text-white"
//                       : isCurrent
//                       ? "bg-teal-500 text-white ring-4 ring-teal-100"
//                       : "bg-gray-200 text-gray-500"
//                   }`}
//                 >
//                   {isCompleted ? (
//                     <Check className="w-5 h-5" />
//                   ) : (
//                     <StepIcon className="w-5 h-5" />
//                   )}
//                 </div>
//                 <span
//                   className={`mt-2 text-xs font-medium ${
//                     isCurrent ? "text-teal-600" : "text-gray-500"
//                   }`}
//                 >
//                   {step.title}
//                 </span>
//               </div>
//               {index < STEPS.length - 1 && (
//                 <div
//                   className={`flex-1 h-1 mx-2 rounded ${
//                     currentStep > step.id ? "bg-green-500" : "bg-gray-200"
//                   }`}
//                 />
//               )}
//             </React.Fragment>
//           );
//         })}
//       </div>
//     </div>
//   );

//   // Step 1: Personal Information
//   const renderStep1 = () => (
//     <div className="space-y-4">
//       {/* Name Field */}
//       <div className="space-y-1">
//         <div className="relative">
//           <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
//             <User className="h-4 w-4 text-gray-400" />
//           </div>
//           <input
//             type="text"
//             name="name"
//             value={formData.name}
//             onChange={handleInputChange}
//             onBlur={handleBlur}
//             placeholder="Full Name"
//             className={`w-full pl-10 bg-white pr-3 py-2.5 text-sm border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all duration-200 ${
//               errors.name && touched.name
//                 ? "border-red-500 bg-red-50"
//                 : "border-gray-300"
//             }`}
//           />
//         </div>
//         {errors.name && touched.name && (
//           <p className="text-red-500 text-xs pl-1">{errors.name}</p>
//         )}
//       </div>

//       {/* Phone Field */}
//       <div className="space-y-0">
//         <div
//           className={`flex rounded-lg border transition-all duration-200 ${
//             errors.phone && touched.phone
//               ? "border-red-500 bg-red-50"
//               : "border-gray-300 focus-within:border-teal-500 focus-within:ring-2 focus-within:ring-teal-500"
//           }`}
//         >
//           <div className="flex-shrink-0">
//             <CountryCodeDropdown
//               value={selectedCode}
//               onChange={setSelectedCode}
//               className="bg-gray-50 py-2.5 px-2 text-sm border-r border-gray-200 hover:bg-gray-100 min-w-0"
//               countryCodes={countrycodes}
//             />
//           </div>
//           <div className="relative flex-1 min-w-0">
//             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
//               <Phone className="h-4 w-4 text-gray-400" />
//             </div>
//             <input
//               type="tel"
//               name="phone"
//               value={formData.phone}
//               onChange={handleInputChange}
//               onBlur={handleBlur}
//               placeholder="Phone Number"
//               className="w-full pl-10 pr-3 py-2.5 text-sm border-0 bg-transparent outline-none"
//             />
//           </div>
//         </div>
//         {errors.phone && touched.phone && (
//           <p className="text-red-500 text-xs pl-1">{errors.phone}</p>
//         )}
//       </div>

//       {/* Email Field */}
//       <div className="space-y-0">
//         <div className="relative">
//           <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
//             <Mail className="h-4 w-4 text-gray-400" />
//           </div>
//           <input
//             type="email"
//             name="email"
//             value={formData.email}
//             onChange={handleInputChange}
//             onBlur={handleBlur}
//             placeholder="Email"
//             className={`w-full pl-10 pr-3 py-2.5 bg-white text-sm border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all duration-200 ${
//               errors.email && touched.email
//                 ? "border-red-500 bg-red-50"
//                 : "border-gray-300"
//             }`}
//           />
//         </div>
//         {errors.email && touched.email && (
//           <p className="text-red-500 text-xs pl-1">{errors.email}</p>
//         )}
//       </div>

//       {/* Referral ID Field */}
//       <div className="space-y-0">
//         <div className="relative">
//           <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
//             <Users className="h-4 w-4 text-gray-400" />
//           </div>
//           <input
//             type="text"
//             name="referralId"
//             value={formData.referralId}
//             onChange={handleInputChange}
//             onBlur={handleBlur}
//             readOnly={referralApplied}
//             placeholder="Referral ID (Optional)"
//             className={`w-full pl-10 pr-3 py-2.5 text-sm bg-white border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all duration-200 ${
//               errors.referralId && touched.referralId
//                 ? "border-red-500 bg-red-50"
//                 : referralApplied && formData.referralId
//                 ? "border-green-500 bg-green-50 cursor-not-allowed"
//                 : "border-gray-300"
//             }`}
//           />
//           {referralApplied && formData.referralId && !errors.referralId && (
//             <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
//               <Check className="h-5 w-5 text-green-500" />
//             </div>
//           )}
//         </div>
//         {errors.referralId && touched.referralId && (
//           <p className="text-red-500 text-xs pl-1">{errors.referralId}</p>
//         )}
//         {referralApplied && formData.referralId && !errors.referralId && (
//           <p className="text-green-600 text-xs pl-1">Referral code applied!</p>
//         )}
//       </div>
//     </div>
//   );

//   // Step 2: KYC Verification
//   const renderStep2 = () => (
//     <div className="space-y-4">
//       {/* Aadhaar Section */}
//       <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
//         <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
//           <CreditCard className="h-4 w-4" />
//           Aadhaar Verification
//           {aadhaarVerified && (
//             <span className="ml-auto flex items-center gap-1 text-green-600 text-xs">
//               <Check className="h-4 w-4" /> Verified
//             </span>
//           )}
//         </h3>

//         {/* Aadhaar Number */}
//         <div className="space-y-1 mb-3">
//           <div className="relative">
//             <input
//               type="text"
//               name="aadhaarNumber"
//               value={formData.aadhaarNumber}
//               onChange={handleInputChange}
//               onBlur={handleBlur}
//               placeholder="Enter 12-digit Aadhaar Number"
//               maxLength="12"
//               disabled={aadhaarVerified}
//               className={`w-full px-3 py-2.5 text-sm border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all duration-200 ${
//                 errors.aadhaarNumber && touched.aadhaarNumber
//                   ? "border-red-500 bg-red-50"
//                   : aadhaarVerified
//                   ? "border-green-500 bg-green-50"
//                   : "border-gray-300 bg-white"
//               }`}
//             />
//           </div>
//           {errors.aadhaarNumber && touched.aadhaarNumber && (
//             <p className="text-red-500 text-xs pl-1">{errors.aadhaarNumber}</p>
//           )}
//         </div>

//         {/* Aadhaar OTP */}
//         {!aadhaarVerified && (
//           <div className="flex gap-2">
//             <div className="relative flex-1">
//               <input
//                 type="text"
//                 name="aadhaarOtp"
//                 value={formData.aadhaarOtp}
//                 onChange={handleInputChange}
//                 onBlur={handleBlur}
//                 placeholder="Enter 6-digit OTP"
//                 maxLength="6"
//                 disabled={!aadhaarOtpSent}
//                 className={`w-full px-3 py-2.5 text-sm border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all duration-200 ${
//                   errors.aadhaarOtp && touched.aadhaarOtp
//                     ? "border-red-500 bg-red-50"
//                     : !aadhaarOtpSent
//                     ? "bg-gray-100"
//                     : "border-gray-300 bg-white"
//                 }`}
//               />
//             </div>
//             {!aadhaarOtpSent ? (
//               <button
//                 type="button"
//                 onClick={handleSendAadhaarOtp}
//                 disabled={
//                   isAadhaarLoading || !/^\d{12}$/.test(formData.aadhaarNumber)
//                 }
//                 className="px-4 py-2.5 text-sm rounded-lg font-medium whitespace-nowrap bg-teal-500 text-white hover:bg-teal-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all"
//               >
//                 {isAadhaarLoading ? "Sending..." : "Send OTP"}
//               </button>
//             ) : !canResendAadhaarOtp ? (
//               <button
//                 type="button"
//                 onClick={handleVerifyAadhaarOtp}
//                 disabled={
//                   isAadhaarLoading || !/^\d{6}$/.test(formData.aadhaarOtp)
//                 }
//                 className="px-4 py-2.5 text-sm rounded-lg font-medium whitespace-nowrap bg-green-500 text-white hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all"
//               >
//                 {isAadhaarLoading ? "Verifying..." : `Verify (${aadhaarTimer}s)`}
//               </button>
//             ) : (
//               <button
//                 type="button"
//                 onClick={handleSendAadhaarOtp}
//                 disabled={isAadhaarLoading}
//                 className="px-4 py-2.5 text-sm rounded-lg font-medium whitespace-nowrap bg-teal-500 text-white hover:bg-teal-600 transition-all"
//               >
//                 Resend OTP
//               </button>
//             )}
//           </div>
//         )}
//         {errors.aadhaarOtp && touched.aadhaarOtp && (
//           <p className="text-red-500 text-xs pl-1 mt-1">{errors.aadhaarOtp}</p>
//         )}
//       </div>

//       {/* PAN Section */}
//       <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
//         <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
//           <FileText className="h-4 w-4" />
//           PAN Verification
//           {panVerified && (
//             <span className="ml-auto flex items-center gap-1 text-green-600 text-xs">
//               <Check className="h-4 w-4" /> Verified
//             </span>
//           )}
//         </h3>

//         {/* PAN Number */}
//         <div className="space-y-1 mb-3">
//           <div className="relative">
//             <input
//               type="text"
//               name="panNumber"
//               value={formData.panNumber}
//               onChange={handleInputChange}
//               onBlur={handleBlur}
//               placeholder="Enter PAN Number (e.g., ABCDE1234F)"
//               maxLength="10"
//               disabled={panVerified}
//               className={`w-full px-3 py-2.5 text-sm border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all duration-200 uppercase ${
//                 errors.panNumber && touched.panNumber
//                   ? "border-red-500 bg-red-50"
//                   : panVerified
//                   ? "border-green-500 bg-green-50"
//                   : "border-gray-300 bg-white"
//               }`}
//             />
//           </div>
//           {errors.panNumber && touched.panNumber && (
//             <p className="text-red-500 text-xs pl-1">{errors.panNumber}</p>
//           )}
//         </div>

//         {/* Name as per PAN */}
//         <div className="space-y-1 mb-3">
//           <div className="relative">
//             <input
//               type="text"
//               name="panName"
//               value={formData.panName}
//               onChange={handleInputChange}
//               onBlur={handleBlur}
//               placeholder="Name as per PAN"
//               disabled={panVerified}
//               className={`w-full px-3 py-2.5 text-sm border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all duration-200 ${
//                 errors.panName && touched.panName
//                   ? "border-red-500 bg-red-50"
//                   : panVerified
//                   ? "border-green-500 bg-green-50"
//                   : "border-gray-300 bg-white"
//               }`}
//             />
//           </div>
//           {errors.panName && touched.panName && (
//             <p className="text-red-500 text-xs pl-1">{errors.panName}</p>
//           )}
//         </div>

//         {/* Verify PAN Button */}
//         {!panVerified && (
//           <button
//             type="button"
//             onClick={handleVerifyPan}
//             disabled={
//               panVerifying ||
//               !/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(formData.panNumber) ||
//               !formData.panName.trim()
//             }
//             className="w-full px-4 py-2.5 text-sm rounded-lg font-medium bg-teal-500 text-white hover:bg-teal-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all"
//           >
//             {panVerifying ? "Verifying..." : "Verify PAN"}
//           </button>
//         )}
//       </div>
//     </div>
//   );

//   // Step 3: Security
//   const renderStep3 = () => (
//     <div className="space-y-4">
//       {/* Password Field */}
//       <div className="space-y-0">
//         <div className="relative">
//           <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
//             <Lock className="h-4 w-4 text-gray-400" />
//           </div>
//           <input
//             type={showPassword ? "text" : "password"}
//             name="password"
//             value={formData.password}
//             onChange={handleInputChange}
//             onBlur={handleBlur}
//             placeholder="Password"
//             className={`w-full pl-10 pr-10 bg-white py-2.5 text-sm border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all duration-200 ${
//               errors.password && touched.password
//                 ? "border-red-500 bg-red-50"
//                 : "border-gray-300"
//             }`}
//           />
//           <button
//             type="button"
//             onClick={() => setShowPassword(!showPassword)}
//             className="absolute inset-y-0 right-0 pr-3 flex items-center hover:bg-gray-50 rounded-r-lg transition-colors z-10"
//           >
//             {showPassword ? (
//               <EyeOff className="h-4 w-4 text-gray-400 hover:text-gray-600" />
//             ) : (
//               <Eye className="h-4 w-4 text-gray-400 hover:text-gray-600" />
//             )}
//           </button>
//         </div>
//         {errors.password && touched.password && (
//           <p className="text-red-500 text-xs pl-1">{errors.password}</p>
//         )}
//       </div>

//       {/* Confirm Password Field */}
//       <div className="space-y-0">
//         <div className="relative">
//           <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
//             <Lock className="h-4 w-4 text-gray-400" />
//           </div>
//           <input
//             type={showConfirmPassword ? "text" : "password"}
//             name="confirmPassword"
//             value={formData.confirmPassword}
//             onChange={handleInputChange}
//             onBlur={handleBlur}
//             placeholder="Confirm Password"
//             className={`w-full pl-10 pr-10 bg-white py-2.5 text-sm border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all duration-200 ${
//               errors.confirmPassword && touched.confirmPassword
//                 ? "border-red-500 bg-red-50"
//                 : "border-gray-300"
//             }`}
//           />
//           <button
//             type="button"
//             onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//             className="absolute inset-y-0 right-0 pr-3 flex items-center hover:bg-gray-50 rounded-r-lg transition-colors z-10"
//           >
//             {showConfirmPassword ? (
//               <EyeOff className="h-4 w-4 text-gray-400 hover:text-gray-600" />
//             ) : (
//               <Eye className="h-4 w-4 text-gray-400 hover:text-gray-600" />
//             )}
//           </button>
//         </div>
//         {errors.confirmPassword && touched.confirmPassword && (
//           <p className="text-red-500 text-xs pl-1">{errors.confirmPassword}</p>
//         )}
//       </div>

//       {/* Email OTP Field */}
//       <div className="space-y-0">
//         <div className="flex gap-2">
//           <div className="relative flex-1">
//             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
//               <Shield className="h-4 w-4 text-gray-400" />
//             </div>
//             <input
//               type="text"
//               name="otp"
//               value={formData.otp}
//               onChange={handleInputChange}
//               onBlur={handleBlur}
//               placeholder="Enter 6-digit Email OTP"
//               maxLength="6"
//               className={`w-full bg-white pl-10 pr-3 py-2.5 text-sm border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all duration-200 ${
//                 errors.otp && touched.otp
//                   ? "border-red-500 bg-red-50"
//                   : "border-gray-300"
//               }`}
//             />
//           </div>
//           <button
//             type="button"
//             onClick={handleVerify}
//             disabled={
//               isRegisterLoading ||
//               isOTPresentLoading ||
//               (otpSent && !canResendOtp) ||
//               !formData.password ||
//               !formData.confirmPassword ||
//               formData.password !== formData.confirmPassword
//             }
//             className={`px-3 py-2.5 text-sm rounded-lg font-medium whitespace-nowrap transition-all duration-200 flex-shrink-0 ${
//               otpSent && !canResendOtp
//                 ? "bg-green-100 text-green-700 cursor-default"
//                 : isRegisterLoading || isOTPresentLoading
//                 ? "bg-gray-100 text-gray-500 cursor-not-allowed"
//                 : "bg-teal-500 text-white hover:bg-teal-600 transform hover:scale-105"
//             }`}
//           >
//             {isRegisterLoading || isOTPresentLoading
//               ? "Sending..."
//               : otpSent && !canResendOtp
//               ? `Sent (${timer}s)`
//               : canResendOtp
//               ? "Resend OTP"
//               : "Send OTP"}
//           </button>
//         </div>
//         {errors.otp && touched.otp && (
//           <p className="text-red-500 text-xs pl-1">{errors.otp}</p>
//         )}
//       </div>

//       {/* Terms and Conditions */}
//       <div className="flex items-start gap-2 pt-2">
//         <input
//           id="terms_and_conditions"
//           type="checkbox"
//           checked={isChecked && isConfirmAgree}
//           onChange={handleCheckboxChange}
//           className="mt-0.5 h-4 w-4 rounded border-gray-300 text-teal-600 focus:ring-teal-500 flex-shrink-0"
//         />
//         <label
//           htmlFor="terms_and_conditions"
//           className="text-xs sm:text-sm text-gray-700 leading-relaxed"
//         >
//           I accept the{" "}
//           <button
//             type="button"
//             onClick={handleTermsLinkClick}
//             className="text-teal-600 hover:underline font-medium"
//           >
//             Terms & Conditions
//           </button>{" "}
//           and{" "}
//           <button
//             type="button"
//             onClick={handleTermsLinkClick}
//             className="text-teal-600 hover:underline font-medium"
//           >
//             Privacy Policy
//           </button>
//         </label>
//       </div>
//     </div>
//   );

//   return (
//     <div
//       className={`w-full max-w-md mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-500 transform ${
//         isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
//       }`}
//     >
//       {notification && (
//         <Notification
//           type={notification.type}
//           message={notification.message}
//           onClose={() => setNotification(null)}
//         />
//       )}
//       <Seo page="register" />

//       <div className="text-center mb-4 sm:mb-6">
//         <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-1">
//           REGISTER
//         </h1>
//         <p className="text-sm text-gray-600">
//           Create a new account to get started
//         </p>
//       </div>

//       {/* Step Indicator */}
//       <StepIndicator />

//       <form onSubmit={handleSubmit} className="space-y-4">
//         {/* Render current step */}
//         {currentStep === 1 && renderStep1()}
//         {currentStep === 2 && renderStep2()}
//         {currentStep === 3 && renderStep3()}

//         {/* Navigation Buttons */}
//         <div className="flex gap-3 pt-4">
//           {currentStep > 1 && (
//             <button
//               type="button"
//               onClick={handlePrevStep}
//               className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-gray-700 bg-gray-100 rounded-full hover:bg-gray-200 transition-all"
//             >
//               <ChevronLeft className="w-4 h-4" />
//               Back
//             </button>
//           )}

//           {currentStep < 3 ? (
//             <button
//               type="button"
//               onClick={handleNextStep}
//               className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-white bg-gradient-to-b from-[#0B736F] to-[#0B736F] rounded-full hover:opacity-90 transition-all"
//             >
//               Next
//               <ChevronRight className="w-4 h-4" />
//             </button>
//           ) : (
//             <button
//               type="submit"
//               disabled={
//                 isVerifyLoading ||
//                 !otpSent ||
//                 !formData.otp.trim() ||
//                 !isChecked ||
//                 !isConfirmAgree
//               }
//               className="flex-1 bg-gradient-to-b from-[#0B736F] to-[#0B736F] text-white py-2.5 px-4 rounded-full font-medium focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 transform hover:scale-[1.02] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none text-sm sm:text-base"
//             >
//               {isVerifyLoading ? "Verifying..." : "REGISTER"}
//             </button>
//           )}
//         </div>
//       </form>

//       <div className="mt-4 sm:mt-6 text-center">
//         <p className="text-sm text-gray-600">
//           Already have an account?{" "}
//           <button
//             onClick={onToggleMode}
//             className="text-teal-600 hover:text-teal-700 font-medium"
//           >
//             Sign in
//           </button>
//         </p>
//       </div>
//     </div>
//   );
// };


export default function AuthContainer() {
  const navigate = useNavigate();
  const location = useLocation();
  const { cluster } = useParams();
  const [isLogin, setIsLogin] = useState(() => {
    // Add fallback for when cluster is undefined initially
    if (cluster === "login") return true;
    if (cluster === "register") return false;
    // Default based on current location
    return window.location.pathname.includes("register") ? false : true;
  });

  const [isTransitioning, setIsTransitioning] = useState(false);

  // ADD: Terms modal state management at AuthContainer level
  const [showModal, setShowModal] = useState(false);
  const [isConfirmAgree, setIsConfirmAgree] = useState(false);
const handleBack = () => navigate("/");
  useEffect(() => {
    if (cluster === "login") {
      setIsLogin(true);
    } else if (cluster === "register") {
      setIsLogin(false);
    }
  }, [cluster]); // This is already correct, but make sure cluster is being extracted properly

  const handleLoginSubmit = (values) => {
    // console.log('Login submitted:', values);
  };

  const handleRegisterSubmit = (values) => {
    // console.log('Register submitted:', values);
  };

  // ADD: Terms modal handlers at AuthContainer level
  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    if (!isConfirmAgree) {
      // If user closes without agreeing, reset the agreement
      setIsConfirmAgree(false);
    }
    setShowModal(false);
  };

  const handleAgreeTerms = (isAgreed) => {
    setIsConfirmAgree(isAgreed);
    setShowModal(false);
  };

  const toggleMode = () => {
    setIsTransitioning(true);
    const newCluster = isLogin ? "register" : "login";
    navigate(`/${newCluster}`, { replace: true });

    setTimeout(() => {
      setIsLogin(!isLogin);
      setTimeout(() => {
        setIsTransitioning(false);
      }, 50);
    }, 250);
  };

  const handleTabClick = (mode) => {
    if (isTransitioning) return;
    const cluster = mode === "login" ? "login" : "register";
    navigate(`/${cluster}`, { replace: true });

    setIsTransitioning(true);
    setTimeout(() => {
      setIsLogin(mode === "login");
      setTimeout(() => {
        setIsTransitioning(false);
      }, 50);
    }, 250);
  };

  return (
    <div className="min-h-screen w-full overflow-hidden bg-gray-50">
      {/* Desktop View */}
      <div className="hidden lg:flex w-full h-screen relative">\
         <button
    onClick={handleBack}
    className="absolute top-[8%] left-0 z-50 text-white hover:text-gray-200 transition"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="2"
      stroke="currentColor"
      className="w-8 h-8"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
    </svg>
  </button>
        {/* Left Section - Gradient Background */}
        <div
          className={`absolute inset-y-0 w-1/2 bg-gradient-to-br from-[#085358] via-teal-600 to-green-900 transform transition-all duration-1000 ease-out ${
            isLogin ? "left-0 translate-x-0" : "left-1/2 translate-x-0"
          }`}
        >
          {/* Navigation Tabs */}
          <div className="absolute top-8 left-8 right-8 z-20">
            <div className="flex rounded-full p-2 shadow-xl border border-white/10">
              <button
                onClick={() => handleTabClick("login")}
                disabled={isTransitioning}
                className={`flex-1 py-4 px-6 rounded-full text-black font-bold transition-all duration-500 ${
                  isLogin
                    ? "bg-white/90 text-teal-700 shadow-2xl transform scale-105 backdrop-blur-sm"
                    : ""
                } ${isTransitioning ? "opacity-50" : ""}`}
              >
                LOGIN
              </button>
              <button
                onClick={() => handleTabClick("register")}
                disabled={isTransitioning}
                className={`flex-1 py-4 px-6 rounded-full text-black font-bold transition-all duration-500 ${
                  !isLogin
                    ? "bg-white/90 text-teal-700 shadow-2xl transform scale-105 backdrop-blur-sm"
                    : ""
                } ${isTransitioning ? "opacity-50" : ""}`}
              >
                SIGN UP
              </button>
            </div>
          </div>

          {/* Icon Section */}
          <div className="relative text-center text-white px-8 flex flex-col items-center justify-center h-full overflow-hidden">
            {/* ────── Background SVGs ────── */}
            <svg
              className="absolute w-16 h-16 text-white opacity-10 top-4 left-8 animate-float-slow"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
            >
              <path d="M12 3v18M3 12h18" />
            </svg>
            <svg
              className="absolute w-20 h-20 text-yellow-300 opacity-20 bottom-8 right-6 animate-spin-slow"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2L15 8H9L12 2Z" /> {/* Profit arrow */}
            </svg>
            <svg
              className="absolute top-8 left-10 w-24 h-24 opacity-10"
              viewBox="0 0 24 24"
              fill="white"
            >
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5z" />
            </svg>

            {/* Document/Code SVG */}
            <svg
              className="absolute top-16 left-24 w-20 h-20 opacity-10"
              viewBox="0 0 24 24"
              fill="white"
            >
              <path d="M6 3h12v2H6v2h7c.55 0 1 .45 1 1s-.45 1-1 1H6v2h7.5c.83 0 1.5.67 1.5 1.5S14.33 14 13.5 14H6v2h5l5 5h-3l-4-4H6v-2H5v-2h1v-2H5V9h1V7H5V5h1V3z" />
            </svg>

            {/* Currency Loop SVG */}
            <svg
              className="absolute top-12 right-16 w-24 h-24 opacity-10"
              viewBox="0 0 24 24"
              fill="white"
            >
              <path d="M12 1v2.05c-2.83.49-5 2.94-5 5.95h2c0-2.21 1.79-4 4-4s4 1.79 4 4-1.79 4-4 4h-1v2h1c2.21 0 4 1.79 4 4s-1.79 4-4 4-4-1.79-4-4H7c0 3.01 2.17 5.46 5 5.95V23h2v-2.05c2.83-.49 5-2.94 5-5.95s-2.17-5.46-5-5.95V7.95C17.83 7.46 20 5.01 20 2h-2c0 2.21-1.79 4-4 4s-4-1.79-4-4H9c0 3.01 2.17 5.46 5 5.95V1h-2z" />
            </svg>

            {/* Coins SVG */}
            <svg
              className="absolute bottom-24 left-20 w-20 h-20 opacity-10"
              viewBox="0 0 24 24"
              fill="white"
            >
              <path d="M12 2C6.48 2 2 3.79 2 6v12c0 2.21 4.48 4 10 4s10-1.79 10-4V6c0-2.21-4.48-4-10-4zm0 2c4.97 0 8 1.64 8 2s-3.03 2-8 2-8-1.64-8-2 3.03-2 8-2zm0 14c-4.97 0-8-1.64-8-2v-1.09c1.87 1.01 5.19 1.59 8 1.59s6.13-.58 8-1.59V16c0 .36-3.03 2-8 2zm0-4c-4.97 0-8-1.64-8-2v-1.09c1.87 1.01 5.19 1.59 8 1.59s6.13-.58 8-1.59V12c0 .36-3.03 2-8 2zm0-4c-4.97 0-8-1.64-8-2v-1.09c1.87 1.01 5.19 1.59 8 1.59s6.13-.58 8-1.59V10c0 .36-3.03 2-8 2z" />
            </svg>

            {/* User SVG */}
            <svg
              className="absolute top-2/3 right-24 w-20 h-20 opacity-10"
              viewBox="0 0 24 24"
              fill="white"
            >
              <path d="M12 12c2.67 0 8 1.34 8 4v2H4v-2c0-2.66 5.33-4 8-4zm0-2a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" />
            </svg>

            {/* Share SVG */}
            <svg
              className="absolute bottom-8 right-16 w-16 h-16 opacity-10"
              viewBox="0 0 24 24"
              fill="white"
            >
              <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7a3.018 3.018 0 0 0 0-1.39l7.05-4.11a2.99 2.99 0 1 0-.96-1.72L8 9.59a3 3 0 1 0 0 4.83l7.05 4.11c.12.62.45 1.17.95 1.56.5.39 1.14.61 1.8.61a3 3 0 1 0 0-6z" />
            </svg>

            {/* Arrow SVG */}
            <svg
              className="absolute top-6 right-10 w-16 h-16 opacity-10 rotate-12"
              viewBox="0 0 24 24"
              fill="white"
            >
              <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
            </svg>

            {/* Plant SVG */}
            <svg
              className="absolute bottom-10 left-10 w-20 h-20 opacity-10"
              viewBox="0 0 24 24"
              fill="white"
            >
              <path d="M12 2C10.34 2 9 3.34 9 5c0 .66.26 1.26.68 1.7L12 9l2.32-2.3A2.5 2.5 0 0 0 15 5c0-1.66-1.34-3-3-3zm6 7c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4zm-6 9c-2.33 0-7 1.17-7 3.5V22h14v-1.5c0-2.33-4.67-3.5-7-3.5z" />
            </svg>

            {/* Group SVG */}
            <svg
              className="absolute top-1/3 right-8 w-20 h-20 opacity-10"
              viewBox="0 0 24 24"
              fill="white"
            >
              <path d="M16 11c1.66 0 3-1.34 3-3S17.66 5 16 5s-3 1.34-3 3 1.34 3 3 3zm-8 0c1.66 0 3-1.34 3-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V20h8v-1c0-.76.32-1.45.84-1.94C11.03 16.35 13.94 16 16 16s4.97.35 6.16.56c.52.49.84 1.18.84 1.94v1h-8v-1.5c0-2.33-4.67-3.5-7-3.5z" />
            </svg>

            {/* ────── Main Content ────── */}
            <div className="relative w-56 h-56 rounded-full flex items-center justify-center transform transition-all duration-700 hover:scale-110 hover:rotate-3">
              <img
                src={icon}
                alt="Secure Crypto Wallet Icon - Fast and Reliable Digital Payments"
                title="Secure Crypto Wallet Icon - Jaimax Digital Payment"
                className="w-full h-full object-contain"
                loading="lazy"
              />
              <div className="absolute -top-2 -right-2 w-4 h-4 bg-yellow-400 rounded-full animate-bounce delay-300"></div>
              <div className="absolute -bottom-2 -left-2 w-3 h-3 bg-blue-400 rounded-full animate-bounce delay-700"></div>
              <div className="absolute top-1/2 -right-4 w-2 h-2 bg-green-400 rounded-full animate-ping delay-500"></div>
            </div>

            <div className="relative mt-6">
              <h2
                className={`text-4xl font-bold mb-4 transition-all duration-700 transform bg-gradient-to-r from-white via-teal-100 to-white bg-clip-text text-transparent ${
                  isTransitioning
                    ? "opacity-0 translate-y-4"
                    : "opacity-100 translate-y-0"
                }`}
              >
                {isLogin ? "Welcome Back!" : "Join Us Today!"}
              </h2>
              <p
                className={`text-teal-50 text-lg leading-relaxed transition-all duration-700 transform ${
                  isTransitioning
                    ? "opacity-0 translate-y-4"
                    : "opacity-100 translate-y-0"
                }`}
              >
                {isLogin
                  ? "Trade, Earn, Grow — All from One Jaimax Account."
                  : "The Next-Gen Crypto Platform Built for You. Register Today."}
              </p>
            </div>
          </div>
        </div>

        {/* Right Section - Form */}
        <div
          className={`absolute inset-y-0 w-1/2 bg-white shadow-2xl transform transition-all duration-1000 ease-out ${
            isLogin ? "right-0 translate-x-0" : "right-1/2 translate-x-0"
          }`}
        >
          <div className="flex items-start justify-center w-full h-full p-12">
            <div className="w-full max-w-md">
              {isLogin ? (
                <LoginComponent
                  onSubmit={handleLoginSubmit}
                  onToggleMode={toggleMode}
                  isVisible={!isTransitioning}
                />
              ) : (
                <RegisterComponent
                  onSubmit={handleRegisterSubmit}
                  onToggleMode={toggleMode}
                  isVisible={!isTransitioning}
                  // PASS: Modal props to RegisterComponent
                  showModal={showModal}
                  onShowModal={handleShowModal}
                  onCloseModal={handleCloseModal}
                  onAgreeTerms={handleAgreeTerms}
                  isConfirmAgree={isConfirmAgree}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile View - Stack Layout */}
      <div className="lg:hidden w-full min-h-screen flex flex-col">
        {/* Mobile Header */}
        <div className="bg-gradient-to-br from-[#085358] via-teal-600 to-green-900 relative overflow-hidden">
          <button
    onClick={handleBack}
    className="absolute top-[7.8%] -left-1 z-50 text-white hover:text-gray-200 transition"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="2"
      stroke="currentColor"
      className="w-6 h-6"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
    </svg>
  </button>
          {/* Mobile Navigation */}
          <div className="relative z-10 p-4">
            <div className="flex bg-white/20 backdrop-blur-md rounded-full p-0 shadow-xl border border-white/10">
              <button
                onClick={() => handleTabClick("login")}
                disabled={isTransitioning}
                className={`flex-1 py-3 px-4 rounded-full text-black font-bold transition-all duration-500 text-sm ${
                  isLogin
                    ? "bg-white/90 text-teal-700 shadow-lg transform scale-105"
                    : "hover:bg-white/20"
                } ${isTransitioning ? "opacity-50" : ""}`}
              >
                LOGIN
              </button>
              <button
                onClick={() => handleTabClick("register")}
                disabled={isTransitioning}
                className={`flex-1 py-3 px-4 rounded-full text-black font-bold transition-all duration-500 text-sm ${
                  !isLogin
                    ? "bg-white/90 text-teal-700 shadow-lg transform scale-105"
                    : "hover:bg-white/20"
                } ${isTransitioning ? "opacity-50" : ""}`}
              >
                SIGN UP
              </button>
            </div>
          </div>

          {/* Mobile Icon Section */}
          <div className="relative z-10 py-8 text-center text-white">
            <div className="mb-6 relative">
              <div className="absolute inset-0 w-32 h-32 mx-auto bg-gradient-to-r from-teal-400 to-green-400 rounded-full blur-2xl opacity-30 animate-pulse"></div>
              <div className="relative w-32 h-32 mx-auto mb-4 rounded-full flex items-center justify-center backdrop-blur-sm shadow-xl transform transition-all duration-500 hover:scale-110">
                <img src={icon} alt="" width={200} loading="lazy" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full animate-bounce delay-300"></div>
                <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-blue-400 rounded-full animate-bounce delay-700"></div>
              </div>
            </div>

            <div className="px-4">
              <h2
                className={`text-2xl font-bold mb-2 transition-all duration-700 transform bg-gradient-to-r from-white via-teal-100 to-white bg-clip-text text-transparent ${
                  isTransitioning
                    ? "opacity-0 translate-y-4"
                    : "opacity-100 translate-y-0"
                }`}
              >
                {isLogin ? "Welcome Back!" : "Join Us Today!"}
              </h2>
              <p
                className={`text-teal-50 text-sm leading-relaxed transition-all duration-700 transform ${
                  isTransitioning
                    ? "opacity-0 translate-y-4"
                    : "opacity-100 translate-y-0"
                }`}
              >
                {isLogin
                  ? "Trade, Earn, Grow — All from One Account."
                  : "Next-Gen Crypto Platform Built for You."}
              </p>
            </div>
          </div>
        </div>

        {/* Mobile Form Content */}
        <div className="flex-1 bg-white p-6 overflow-y-auto">
          <div className="w-full max-w-sm mx-auto">
            {isLogin ? (
              <LoginComponent
                onSubmit={handleLoginSubmit}
                onToggleMode={toggleMode}
                isVisible={!isTransitioning}
              />
            ) : (
              <RegisterComponent
                onSubmit={handleRegisterSubmit}
                onToggleMode={toggleMode}
                isVisible={!isTransitioning}
                // PASS: Modal props to RegisterComponent
                showModal={showModal}
                onShowModal={handleShowModal}
                onCloseModal={handleCloseModal}
                onAgreeTerms={handleAgreeTerms}
                isConfirmAgree={isConfirmAgree}
              />
            )}
          </div>
        </div>
      </div>

      {/* MODAL: Render at AuthContainer level */}
      {showModal && (
        <TermsConditionsModal
          show={showModal}
          onHide={handleCloseModal}
          onAgree={handleAgreeTerms}
        />
      )}

      {/* Custom Styles for Animations */}
      <style jsx>{`
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
        .bg-gradient-radial {
          background: radial-gradient(circle, var(--tw-gradient-stops));
        }
        @keyframes slide-in {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
