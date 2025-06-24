// import React, { useState } from "react";

// export default function HomeContact() {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     message: ''
//   });
//   const [focusedField, setFocusedField] = useState('');

//   const handleInputChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.id]: e.target.value
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log('Form submitted:', formData);
//   };

//   return (
//     <div className="min-h-screen bg-black flex items-center justify-center relative overflow-hidden px-4 py-8">
//       <div className="relative z-10 flex flex-col md:flex-row w-full max-w-9xl h-auto md:h-[90vh] gap-8 md:gap-0">
//         {/* Left Half: Video */}
//         <div className="w-full md:w-1/2 h-64 md:h-full flex items-center justify-center">
//           <div className="relative w-full h-full overflow-hidden shadow-2xl bg-white/10 backdrop-blur-xl rounded-2xl">
//             <video
//               className="w-full h-full object-cover rounded-2xl"
//               autoPlay
//               muted
//               loop
//               playsInline
//             >
//               <source
//                 src="https://cdn.dribbble.com/userupload/4026774/file/original-d7d1fab1bfcb5eb34fd2f82790ac0749.mp4"
//                 type="video/mp4"
//               />
//               Your browser does not support the video tag.
//             </video>
//           </div>
//         </div>

//         {/* Right Half: Black Background with White Glass Form */}
//         <div className="w-full md:w-1/2 flex items-center justify-center bg-black p-6 rounded-2xl">
//           <form
//             onSubmit={handleSubmit}
//             className="w-full max-w-sm bg-white/10 backdrop-blur-xl rounded-2xl p-6 shadow-2xl border border-white/30 text-white"
//           >
//             {/* Title */}
//             <div className="text-center mb-6">
//               <h2 className="text-2xl font-semibold mb-1">Get In Touch</h2>
//               <p className="text-white/70 text-xs">Let’s create something amazing</p>
//             </div>.0


//             {/* Form Fields */}
//             <div className="space-y-4">
//               {['name','phone', 'email', 'message'].map((field) => (
//                 <div className="relative" key={field}>
//                   <label
//                     htmlFor={field}
//                     className={`absolute left-3 transition-all duration-300 pointer-events-none text-sm ${
//                       focusedField === field || formData[field]
//                         ? '-top-2 text-xs text-white'
//                         : 'top-2 text-white/70'
//                     }`}
//                   >
//                     {field.charAt(0).toUpperCase() + field.slice(1)}
//                   </label>
//                   {field !== 'message' ? (
//                     <input
//                       type={field === 'email' ? 'email' : 'text'}
//                       id={field}
//                       value={formData[field]}
//                       onChange={handleInputChange}
//                       onFocus={() => setFocusedField(field)}
//                       onBlur={() => setFocusedField('')}
//                       placeholder={`Your ${field}`}
//                       className="w-full py-2 px-3 text-sm bg-white/10 border border-white/30 rounded-xl text-white placeholder-transparent focus:outline-none focus:border-cyan-400 focus:bg-white/20 transition-all duration-300"
//                     />
//                   ) : (
//                     <textarea
//                       id="message"
//                       value={formData.message}
//                       onChange={handleInputChange}
//                       onFocus={() => setFocusedField('message')}
//                       onBlur={() => setFocusedField('')}
//                       rows="3"
//                       placeholder="Your Message"
//                       className="w-full py-2 px-3 text-sm bg-white/10 border border-white/30 rounded-xl text-white placeholder-transparent focus:outline-none focus:border-cyan-400 focus:bg-white/20 transition-all duration-300 resize-none"
//                     ></textarea>
//                   )}
//                 </div>
//               ))}

//               {/* Submit Button */}
//               <button
//                 type="submit"
//                 className="w-full py-2.5 px-4 text-sm bg-gradient-to-r from-purple-600 to-cyan-600 rounded-xl text-white font-medium transition duration-300 hover:from-purple-700 hover:to-cyan-700 focus:outline-none transform hover:scale-105"
//               >
//                 Send Message
//               </button>
//             </div>

            
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }


// import React, { useState } from "react";
// import Swal from "sweetalert2";
// import { useSubmitEnquiryMutation } from "../home/HomePageApiSlice"; // ✅ adjust this path

// export default function HomeContact() {
//   const [formData, setFormData] = useState({
//     name: '',
//     phone: '',
//     email: '',
//     message: ''
//   });

//   const [focusedField, setFocusedField] = useState('');
//   const [submitEnquiry, { isLoading }] = useSubmitEnquiryMutation();

//   const handleInputChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.id]: e.target.value
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await submitEnquiry(formData).unwrap();
//       Swal.fire('Success!', 'Your message has been sent.', 'success');
//       setFormData({ name: '', phone: '', email: '', message: '' });
//     } catch (err) {
//       Swal.fire('Error', err?.data?.message || 'Something went wrong!', 'error');
//     }
//   };

//   return (
//     <div className="min-h-screen bg-black flex items-center justify-center relative overflow-hidden px-4 py-8">
//       <div className="relative z-10 flex flex-col md:flex-row w-full max-w-9xl h-auto md:h-[90vh] gap-8 md:gap-0">

//         {/* Left Half: Video */}
//         <div className="w-full md:w-1/2 h-64 md:h-full flex items-center justify-center">
//           <div className="relative w-full h-full overflow-hidden shadow-2xl bg-white/10 backdrop-blur-xl rounded-2xl">
//             <video
//               className="w-full h-full object-cover rounded-2xl"
//               autoPlay
//               muted
//               loop
//               playsInline
//             >
//               <source
//                 src="https://cdn.dribbble.com/userupload/4026774/file/original-d7d1fab1bfcb5eb34fd2f82790ac0749.mp4"
//                 type="video/mp4"
//               />
//               Your browser does not support the video tag.
//             </video>
//           </div>
//         </div>

//         {/* Right Half: Contact Form */}
//         <div className="w-full md:w-1/2 flex items-center justify-center bg-black p-6 rounded-2xl">
//           <form
//             onSubmit={handleSubmit}
//             className="w-full max-w-sm bg-white/10 backdrop-blur-xl rounded-2xl p-6 shadow-2xl border border-white/30 text-white"
//           >
//             {/* Title */}
//             <div className="text-center mb-6">
//               <h2 className="text-2xl font-semibold mb-1">Get In Touch</h2>
//               <p className="text-white/70 text-xs">Let’s create something amazing</p>
//             </div>

//             {/* Form Fields */}
//             <div className="space-y-4">
//               {['name', 'phone', 'email', 'message'].map((field) => (
//                 <div className="relative" key={field}>
//                   <label
//                     htmlFor={field}
//                     className={`absolute left-3 transition-all duration-300 pointer-events-none text-sm ${
//                       focusedField === field || formData[field]
//                         ? '-top-2 text-xs text-white'
//                         : 'top-2 text-white/70'
//                     }`}
//                   >
//                     {field.charAt(0).toUpperCase() + field.slice(1)}
//                   </label>
//                   {field !== 'message' ? (
//                     <input
//                       type={field === 'email' ? 'email' : 'text'}
//                       id={field}
//                       value={formData[field]}
//                       onChange={handleInputChange}
//                       onFocus={() => setFocusedField(field)}
//                       onBlur={() => setFocusedField('')}
//                       placeholder={`Your ${field}`}
//                       className="w-full py-2 px-3 text-sm bg-white/10 border border-white/30 rounded-xl text-white placeholder-transparent focus:outline-none focus:border-cyan-400 focus:bg-white/20 transition-all duration-300"
//                     />
//                   ) : (
//                     <textarea
//                       id="message"
//                       value={formData.message}
//                       onChange={handleInputChange}
//                       onFocus={() => setFocusedField('message')}
//                       onBlur={() => setFocusedField('')}
//                       rows="3"
//                       placeholder="Your Message"
//                       className="w-full py-2 px-3 text-sm bg-white/10 border border-white/30 rounded-xl text-white placeholder-transparent focus:outline-none focus:border-cyan-400 focus:bg-white/20 transition-all duration-300 resize-none"
//                     ></textarea>
//                   )}
//                 </div>
//               ))}

//               {/* Submit Button */}
//               <button
//                 type="submit"
//                 disabled={isLoading}
//                 className="w-full py-2.5 px-4 text-sm bg-gradient-to-r from-purple-600 to-cyan-600 rounded-xl text-white font-medium transition duration-300 hover:from-purple-700 hover:to-cyan-700 focus:outline-none transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
//               >
//                 {isLoading ? 'Sending...' : 'Send Message'}
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }






import React, { useState } from "react";
import Swal from "sweetalert2";
import { useSubmitEnquiryMutation } from "../home/HomePageApiSlice"; // ✅ adjust this path

export default function HomeContact() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: ''
  });

  const [focusedField, setFocusedField] = useState('');
  const [submitEnquiry, { isLoading }] = useSubmitEnquiryMutation();

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await submitEnquiry(formData).unwrap();
      Swal.fire('Success!', 'Your message has been sent.', 'success');
      setFormData({ name: '', phone: '', email: '', message: '' });
    } catch (err) {
      Swal.fire('Error', err?.data?.message || 'Something went wrong!', 'error');
    }
  };

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      <div className="flex flex-col xl:flex-row min-h-screen">

        {/* Left Half: Video */}
        <div className="w-full xl:w-1/2 h-[45vh] sm:h-[50vh] md:h-[55vh] lg:h-[60vh] xl:h-screen flex items-center justify-center p-3 sm:p-4 lg:p-6 xl:p-8">
          <div className="relative w-full h-full overflow-hidden shadow-2xl bg-white/10 backdrop-blur-xl rounded-2xl">
            <video
              className="w-full h-full object-cover rounded-2xl"
              autoPlay
              muted
              loop
              playsInline
            >
              <source
                src="https://cdn.dribbble.com/userupload/4026774/file/original-d7d1fab1bfcb5eb34fd2f82790ac0749.mp4"
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>

        {/* Right Half: Contact Form */}
        <div className="w-full xl:w-1/2 min-h-[55vh] sm:min-h-[50vh] md:min-h-[45vh] lg:min-h-[40vh] xl:min-h-screen flex items-center justify-center bg-black p-4 lg:p-6 xl:p-8">
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-sm sm:max-w-md lg:max-w-lg xl:max-w-md bg-white/10 backdrop-blur-xl rounded-2xl p-4 sm:p-6 lg:p-8 shadow-2xl border border-white/30 text-white"
          >
            {/* Title */}
            <div className="text-center mb-4 sm:mb-6">
              <h2 className="text-xl sm:text-2xl lg:text-3xl xl:text-3xl font-semibold mb-1 sm:mb-2">Get In Touch</h2>
              <p className="text-white/70 text-xs sm:text-sm">Let's create something amazing</p>
            </div>

            {/* Form Fields */}
            <div className="space-y-3 sm:space-y-4 lg:space-y-5">
              {['name', 'phone', 'email', 'message'].map((field) => (
                <div className="relative" key={field}>
                  <label
                    htmlFor={field}
                    className={`absolute left-3 transition-all duration-300 pointer-events-none text-xs sm:text-sm ${
                      focusedField === field || formData[field]
                        ? '-top-2 text-xs text-white bg-black px-1 rounded'
                        : 'top-2.5 sm:top-3 text-white/70'
                    }`}
                  >
                    {field.charAt(0).toUpperCase() + field.slice(1)}
                  </label>
                  {field !== 'message' ? (
                    <input
                      type={field === 'email' ? 'email' : 'text'}
                      id={field}
                      value={formData[field]}
                      onChange={handleInputChange}
                      onFocus={() => setFocusedField(field)}
                      onBlur={() => setFocusedField('')}
                      placeholder={`Your ${field}`}
                      className="w-full py-2.5 sm:py-3 px-3 text-xs sm:text-sm bg-white/10 border border-white/30 rounded-xl text-white placeholder-transparent focus:outline-none focus:border-cyan-400 focus:bg-white/20 transition-all duration-300"
                    />
                  ) : (
                    <textarea
                      id="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      onFocus={() => setFocusedField('message')}
                      onBlur={() => setFocusedField('')}
                      rows="3"
                      placeholder="Your Message"
                      className="w-full py-2.5 sm:py-3 px-3 text-xs sm:text-sm bg-white/10 border border-white/30 rounded-xl text-white placeholder-transparent focus:outline-none focus:border-cyan-400 focus:bg-white/20 transition-all duration-300 resize-none"
                    ></textarea>
                  )}
                </div>
              ))}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-2.5 sm:py-3 px-4 text-xs sm:text-sm bg-gradient-to-r from-purple-600 to-cyan-600 rounded-xl text-white font-medium transition duration-300 hover:from-purple-700 hover:to-cyan-700 focus:outline-none transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isLoading ? 'Sending...' : 'Send Message'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}