
// import React from "react";

// const ContactSection = () => {
//   return (
//     <section className="bg-[#085056] py-8 sm:py-12 lg:py-16 px-4">
//       {/* Two-column layout, splits at md */}
//       <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
//         {/* ─────────────────── Left column ─────────────────── */}
//        <div className="flex flex-col justify-center px-4 sm:px-8 lg:px-12 pr-20 lg:pr-16">

//           <h2 className="text-white font-extrabold leading-tight text-2xl sm:text-5xl md:text-2xl lg:text-5xl xl:text-7xl">
//             <span className="block">Let's get</span>
//             <span className="block">in touch</span>
//           </h2>

//           <p className="mt-6 sm:mt-8 lg:mt-10 text-lg sm:text-xl lg:text-2xl text-[#c4d72d] font-semibold">
//             We are glad to hear from you!
//           </p>

//           <div className="mt-8 sm:mt-10 lg:mt-12 space-y-5 sm:space-y-6 text-base sm:text-lg lg:text-xl text-white/90">
//             <div>
//               <p className="font-semibold text-white">Phone</p>
//               <p>(+91) 6303008654</p>
//             </div>

//             <div>
//               <p className="font-semibold text-white">Email</p>
//               <p>info@jaimax.com</p>
//             </div>

//             <div>
//               <p className="font-semibold text-white">Office</p>
//               <p>
//                 Hyderabad Gachibowli,
//                 <br className="hidden sm:block" />

//               </p>
//             </div>
//           </div>
//         </div>
//         <div className="flex flex-col justify-center mt-20">
//           <div className="bg-[#06454c] rounded-md px-4 sm:px-6 lg:px-12 xl:px-16 py-6 sm:py-8 lg:py-12">
//             <h3 className="text-[#c4d72d] text-xl sm:text-2xl font-semibold mb-6 sm:mb-8">
//               Contact
//             </h3>

//             <div className="space-y-4 sm:space-y-6">
//               {/* Name + Email */}
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
//                 <input
//                   type="text"
//                   placeholder="Name"
//                   className="w-full bg-transparent border-b border-white/40 py-2 sm:py-3 text-sm sm:text-base text-white placeholder-white/60 focus:outline-none focus:border-[#fff799] transition-colors"
//                 />
//                 <input
//                   type="email"
//                   placeholder="Email"
//                   className="w-full bg-transparent border-b border-white/40 py-2 sm:py-3 text-sm sm:text-base text-white placeholder-white/60 focus:outline-none focus:border-[#fff799] transition-colors"
//                 />
//               </div>

//               {/* Message */}
//               <textarea
//                 rows="2"
//                 placeholder="Tell us about your interest"
//                 className="w-full resize-none bg-transparent border-b border-white/40 py-2 sm:py-3 text-sm sm:text-base text-white placeholder-white/60 focus:outline-none focus:border-[#fff799] transition-colors"
//               />

//               {/* CTA */}
//               <button
//                 type="button"
//                 className="w-full rounded-full sm:w-auto px-6 sm:px-8 lg:px-10 py-2.5 sm:py-3 bg-[#b9cd27] text-[#095259] text-sm sm:text-base font-semibold rounded hover:bg-[#fce66d] transition-colors"
//               >
//                 Send to us
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default ContactSection;




import React from "react";
import { useFormik } from 'formik';
import * as Yup from 'yup';
// Import your RTK Query hook
import { useSubmitEnquiryMutation } from './HomePageApiSlice';

// Validation schema
const validationSchema = Yup.object({
  name: Yup.string()
    .min(2, 'Name must be at least 2 characters')
    .required('Name is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  message: Yup.string()
    .min(10, 'Message must be at least 10 characters')
    .required('Message is required'),
});

const ContactSection = () => {
  // RTK Query mutation hook
  const [submitEnquiry, { isLoading, isSuccess, isError, error }] = useSubmitEnquiryMutation();

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      message: ''
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        // Call the RTK Query mutation
        await submitEnquiry(values).unwrap();
        
        // Reset form on success
        resetForm();
        
        // Optional: Show success message
        // alert('Message sent successfully!');
      } catch (err) {
        // Error handling is done through RTK Query state
        console.error('Failed to submit enquiry:', err);
      }
    }
  });

  return (
    <section className="bg-[#085056] py-8 sm:py-12 lg:py-16 px-4">
      {/* Two-column layout, splits at md */}
      <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {/* ─────────────────── Left column ─────────────────── */}
        <div className="flex flex-col justify-center px-4 sm:px-8 lg:px-12 pr-20 lg:pr-16">
          <h2 className="text-white font-extrabold leading-tight text-2xl sm:text-5xl md:text-2xl lg:text-5xl xl:text-7xl">
            <span className="block">Let's get</span>
            <span className="block">in touch</span>
          </h2>
          
          <p className="mt-6 sm:mt-8 lg:mt-10 text-lg sm:text-xl lg:text-2xl text-[#c4d72d] font-semibold">
            We are glad to hear from you!
          </p>
          
          <div className="mt-8 sm:mt-10 lg:mt-12 space-y-5 sm:space-y-6 text-base sm:text-lg lg:text-xl text-white/90">
            <div>
              <p className="font-semibold text-white">Phone</p>
              <p>(+91) 6303008654</p>
            </div>
            
            <div>
              <p className="font-semibold text-white">Email</p>
              <p>info@jaimax.com</p>
            </div>
            
            <div>
              <p className="font-semibold text-white">Office</p>
              <p>
                Hyderabad Gachibowli,
                <br className="hidden sm:block" />
              </p>
            </div>
          </div>
        </div>

        {/* ─────────────────── Right column - Form ─────────────────── */}
        <div className="flex flex-col justify-center mt-20">
          <div className="bg-[#06454c] rounded-md px-4 sm:px-6 lg:px-12 xl:px-16 py-6 sm:py-8 lg:py-12">
            <h3 className="text-[#c4d72d] text-xl sm:text-2xl font-semibold mb-6 sm:mb-8">
              Contact
            </h3>
            
            <div onSubmit={formik.handleSubmit} className="space-y-4 sm:space-y-6">
              {/* Error Message Display */}
              {isError && (
                <div className="mb-4 p-3 bg-red-500/20 border border-red-400 rounded text-red-400 text-sm">
                  {error?.data?.message || 'Failed to send message. Please try again.'}
                </div>
              )}

              {/* Success Message Display */}
              {isSuccess && (
                <div className="mb-4 p-3 bg-green-500/20 border border-green-400 rounded text-green-400 text-sm">
                  Message sent successfully! We'll get back to you soon.
                </div>
              )}

              {/* Name + Email */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <div className="relative">
                  <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={`w-full bg-transparent border-b py-2 sm:py-3 text-sm sm:text-base text-white placeholder-white/60 focus:outline-none transition-colors ${
                      formik.errors.name && formik.touched.name 
                        ? 'border-red-400 focus:border-red-400' 
                        : 'border-white/40 focus:border-[#fff799]'
                    }`}
                  />
                  {formik.errors.name && formik.touched.name && (
                    <div className="absolute -bottom-5 left-0 text-xs text-red-400">
                      {formik.errors.name}
                    </div>
                  )}
                </div>
                
                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={`w-full bg-transparent border-b py-2 sm:py-3 text-sm sm:text-base text-white placeholder-white/60 focus:outline-none transition-colors ${
                      formik.errors.email && formik.touched.email 
                        ? 'border-red-400 focus:border-red-400' 
                        : 'border-white/40 focus:border-[#fff799]'
                    }`}
                  />
                  {formik.errors.email && formik.touched.email && (
                    <div className="absolute -bottom-5 left-0 text-xs text-red-400">
                      {formik.errors.email}
                    </div>
                  )}
                </div>
              </div>
              
              {/* Message */}
              <div className="relative mt-8">
                <textarea
                  name="message"
                  rows="3"
                  placeholder="Tell us about your interest"
                  value={formik.values.message}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`w-full resize-none bg-transparent border-b py-2 sm:py-3 text-sm sm:text-base text-white placeholder-white/60 focus:outline-none transition-colors ${
                    formik.errors.message && formik.touched.message 
                      ? 'border-red-400 focus:border-red-400' 
                      : 'border-white/40 focus:border-[#fff799]'
                  }`}
                />
                {formik.errors.message && formik.touched.message && (
                  <div className="absolute -bottom-5 left-0 text-xs text-red-400">
                    {formik.errors.message}
                  </div>
                )}
              </div>
              
              {/* CTA */}
              <div className="pt-4">
                <button
                  type="button"
                  onClick={formik.handleSubmit}
                  disabled={isLoading || !formik.isValid}
                  className={`w-full rounded-full sm:w-auto px-6 sm:px-8 lg:px-10 py-2.5 sm:py-3 text-sm sm:text-base font-semibold transition-colors ${
                    isLoading || !formik.isValid
                      ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
                      : 'bg-[#b9cd27] text-[#095259] hover:bg-[#fce66d]'
                  }`}
                >
                  {isLoading ? 'Sending...' : 'Send to us'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;