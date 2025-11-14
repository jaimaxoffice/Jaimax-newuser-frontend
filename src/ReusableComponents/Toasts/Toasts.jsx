// // import React, { useState, useEffect } from 'react';

// // class ToastManager {
// //   constructor() {
// //     this.listeners = [];
// //     this.toastId = 0;
// //   }

// //   subscribe(listener) {
// //     this.listeners.push(listener);
// //     return () => {
// //       this.listeners = this.listeners.filter((l) => l !== listener);
// //     };
// //   }

// //   notify(options) {
// //     const id = ++this.toastId;
// //     const toast = {
// //       id,
// //       type: options.type || 'info',
// //       title: options.title || null,
// //       message: options.message,
// //       duration: options.duration || 3000,
// //     };

// //     this.listeners.forEach((listener) => listener(toast));
// //     return id;
// //   }

// //   _show(type, titleOrMessage, messageOrOptions) {
// //     let options = { type };

// //     if (typeof messageOrOptions === 'string') {
// //       options.title = titleOrMessage;
// //       options.message = messageOrOptions;
// //     } else if (typeof messageOrOptions === 'object' && messageOrOptions !== null) {
// //       options = { ...options, title: titleOrMessage, ...messageOrOptions };
// //     } else {
// //       options.message = titleOrMessage;
// //     }

// //     return this.notify(options);
// //   }

// //   success(titleOrMessage, messageOrOptions) {
// //     return this._show('success', titleOrMessage, messageOrOptions);
// //   }

// //   error(titleOrMessage, messageOrOptions) {
// //     return this._show('error', titleOrMessage, messageOrOptions);
// //   }

// //   warning(titleOrMessage, messageOrOptions) {
// //     return this._show('warning', titleOrMessage, messageOrOptions);
// //   }

// //   info(titleOrMessage, messageOrOptions) {
// //     return this._show('info', titleOrMessage, messageOrOptions);
// //   }
// // }

// // const toastManager = new ToastManager();

// // export const toast = {
// //   success: (titleOrMessage, messageOrOptions) => 
// //     toastManager.success(titleOrMessage, messageOrOptions),
// //   error: (titleOrMessage, messageOrOptions) => 
// //     toastManager.error(titleOrMessage, messageOrOptions),
// //   warning: (titleOrMessage, messageOrOptions) => 
// //     toastManager.warning(titleOrMessage, messageOrOptions),
// //   info: (titleOrMessage, messageOrOptions) => 
// //     toastManager.info(titleOrMessage, messageOrOptions),
// // };

// // const TOAST_CONFIG = {
// //   info: {
// //     icon: (
// //       <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
// //         <circle cx="12" cy="12" r="10" />
// //         <path d="M12 16v-4" />
// //         <path d="M12 8h.01" />
// //       </svg>
// //     ),
// //     bgColor: 'bg-blue-500',
// //     progressColor: 'bg-blue-500'
// //   },
// //   error: {
// //     icon: (
// //       <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
// //         <circle cx="12" cy="12" r="10" />
// //         <path d="m15 9-6 6" />
// //         <path d="m9 9 6 6" />
// //       </svg>
// //     ),
// //     bgColor: 'bg-red-500',
// //     progressColor: 'bg-red-500'
// //   },
// //   success: {
// //     icon: (
// //       <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
// //         <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
// //         <polyline points="22 4 12 14.01 9 11.01" />
// //       </svg>
// //     ),
// //     bgColor: 'bg-green-500',
// //     progressColor: 'bg-green-500'
// //   },
// //   warning: {
// //     icon: (
// //       <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
// //         <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3" />
// //         <path d="M12 9v4" />
// //         <path d="M12 17h.01" />
// //       </svg>
// //     ),
// //     bgColor: 'bg-orange-500',
// //     progressColor: 'bg-orange-500'
// //   }
// // };

// // const Toast = ({ type = 'info', title, message, duration = 3000, onClose }) => {
// //   const [isRemoving, setIsRemoving] = useState(false);
// //   const config = TOAST_CONFIG[type] || TOAST_CONFIG.info;

// //   useEffect(() => {
// //     const timer = setTimeout(() => {
// //       handleClose();
// //     }, duration);

// //     return () => clearTimeout(timer);
// //   }, [duration]);

// //   const handleClose = () => {
// //     setIsRemoving(true);
// //     setTimeout(() => {
// //       onClose?.();
// //     }, 300);
// //   };

// //   return (
// //     <div
// //       className={`bg-white rounded-lg shadow-lg p-3 sm:p-4 flex items-start gap-3 relative overflow-hidden transition-all duration-300 ${
// //         isRemoving ? 'toast-slide-out' : 'toast-slide-in'
// //       }`}
// //       role="alert"
// //       aria-live="polite"
// //     >
// //       {/* Icon */}
// //       <div className={`${config.bgColor} w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center flex-shrink-0 text-white`}>
// //         {config.icon}
// //       </div>

// //       {/* Content */}
// //       <div className="flex-1 min-w-0 pr-6">
// //         {title && (
// //           <div className="text-sm sm:text-base font-semibold text-gray-800 mb-1">
// //             {title}
// //           </div>
// //         )}
// //         <div className={`text-xs sm:text-sm text-gray-600 leading-relaxed ${!title ? 'font-medium' : ''}`}>
// //           {message}
// //         </div>
// //       </div>

// //       {/* Close Button */}
// //       <button
// //         onClick={handleClose}
// //         className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 transition-colors text-lg leading-none p-1"
// //         aria-label="Close notification"
// //       >
// //         ✕
// //       </button>

// //       {/* Progress Bar */}
// //       <div 
// //         className={`absolute bottom-0 left-0 h-1 w-full ${config.progressColor} origin-left toast-progress`}
// //         style={{ animationDuration: `${duration}ms` }}
// //       />
// //     </div>
// //   );
// // };

// // export const ToastContainer = ({ position = 'top-right', maxToasts = 5 }) => {
// //   const [toasts, setToasts] = useState([]);

// //   useEffect(() => {
// //     const unsubscribe = toastManager.subscribe((toast) => {
// //       setToasts((prev) => {
// //         const newToasts = [...prev, toast];
// //         return newToasts.slice(-maxToasts);
// //       });
// //     });

// //     return () => unsubscribe();
// //   }, [maxToasts]);

// //   const removeToast = (id) => {
// //     setToasts((prev) => prev.filter((toast) => toast.id !== id));
// //   };

// //   const positionClasses = {
// //     'top-right': 'top-3 right-3 sm:top-5 sm:right-5',
// //     'top-left': 'top-3 left-3 sm:top-5 sm:left-5',
// //     'top-center': 'top-3 left-1/2 -translate-x-1/2 sm:top-5',
// //     'bottom-right': 'bottom-3 right-3 sm:bottom-5 sm:right-5',
// //     'bottom-left': 'bottom-3 left-3 sm:bottom-5 sm:left-5',
// //     'bottom-center': 'bottom-3 left-1/2 -translate-x-1/2 sm:bottom-5',
// //   };

// //   return (
// //     <>
// //       {/* Inline Styles */}
// //       <style>
// //         {`
// //           @keyframes toastSlideIn {
// //             from {
// //               transform: translateX(100%);
// //               opacity: 0;
// //             }
// //             to {
// //               transform: translateX(0);
// //               opacity: 1;
// //             }
// //           }

// //           @keyframes toastSlideOut {
// //             from {
// //               transform: translateX(0);
// //               opacity: 1;
// //             }
// //             to {
// //               transform: translateX(100%);
// //               opacity: 0;
// //             }
// //           }

// //           @keyframes toastProgress {
// //             from {
// //               transform: scaleX(1);
// //             }
// //             to {
// //               transform: scaleX(0);
// //             }
// //           }

// //           .toast-slide-in {
// //             animation: toastSlideIn 0.3s ease-out;
// //           }

// //           .toast-slide-out {
// //             animation: toastSlideOut 0.3s ease-out forwards;
// //           }

// //           .toast-progress {
// //             animation: toastProgress 3s linear forwards;
// //           }
// //         `}
// //       </style>

// //       {/* Toast Container */}
// //       <div 
// //         className={`fixed ${positionClasses[position]} z-50 flex flex-col gap-2 sm:gap-3 max-w-[calc(100vw-1.5rem)] sm:max-w-md w-full pointer-events-none`}
// //       >
// //         <div className="pointer-events-auto space-y-2">
// //           {toasts.map((toast) => (
// //             <Toast
// //               key={toast.id}
// //               type={toast.type}
// //               title={toast.title}
// //               message={toast.message}
// //               duration={toast.duration}
// //               onClose={() => removeToast(toast.id)}
// //             />
// //           ))}
// //         </div>
// //       </div>
// //     </>
// //   );
// // };


// // import React, { useState, useEffect } from 'react';

// // // Toast Manager Class
// // class ToastManager {
// //   constructor() {
// //     this.listeners = [];
// //     this.toastId = 0;
// //   }

// //   subscribe(listener) {
// //     this.listeners.push(listener);
// //     return () => {
// //       this.listeners = this.listeners.filter((l) => l !== listener);
// //     };
// //   }

// //   notify(options) {
// //     const id = ++this.toastId;
// //     const toast = {
// //       id,
// //       type: options.type || 'info',
// //       title: options.title || null,
// //       message: options.message,
// //       duration: options.duration || 3000,
// //     };

// //     this.listeners.forEach((listener) => listener(toast));
// //     return id;
// //   }

// //   _show(type, titleOrMessage, messageOrOptions) {
// //     let options = { type };

// //     if (typeof messageOrOptions === 'string') {
// //       options.title = titleOrMessage;
// //       options.message = messageOrOptions;
// //     } else if (typeof messageOrOptions === 'object' && messageOrOptions !== null) {
// //       options = { ...options, title: titleOrMessage, ...messageOrOptions };
// //     } else {
// //       options.message = titleOrMessage;
// //     }

// //     return this.notify(options);
// //   }

// //   success(titleOrMessage, messageOrOptions) {
// //     return this._show('success', titleOrMessage, messageOrOptions);
// //   }

// //   error(titleOrMessage, messageOrOptions) {
// //     return this._show('error', titleOrMessage, messageOrOptions);
// //   }

// //   warning(titleOrMessage, messageOrOptions) {
// //     return this._show('warning', titleOrMessage, messageOrOptions);
// //   }

// //   info(titleOrMessage, messageOrOptions) {
// //     return this._show('info', titleOrMessage, messageOrOptions);
// //   }
// // }

// // const toastManager = new ToastManager();

// // export const toast = {
// //   success: (titleOrMessage, messageOrOptions) => 
// //     toastManager.success(titleOrMessage, messageOrOptions),
// //   error: (titleOrMessage, messageOrOptions) => 
// //     toastManager.error(titleOrMessage, messageOrOptions),
// //   warning: (titleOrMessage, messageOrOptions) => 
// //     toastManager.warning(titleOrMessage, messageOrOptions),
// //   info: (titleOrMessage, messageOrOptions) => 
// //     toastManager.info(titleOrMessage, messageOrOptions),
// // };

// // const TOAST_CONFIG = {
// //   success: {
// //     icon: (
// //       <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
// //         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
// //       </svg>
// //     ),
// //     gradient: 'from-green-500 via-emerald-500 to-teal-500',
// //     shadow: 'rgba(16, 185, 129, 0.4)',
// //     ring: 'ring-green-500/20',
// //     iconClass: 'text-green-500',
// //     progressClass: 'bg-gradient-to-r from-green-400 to-emerald-500',
// //   },
// //   error: {
// //     icon: (
// //       <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
// //         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
// //       </svg>
// //     ),
// //     gradient: 'from-red-500 via-rose-500 to-pink-500',
// //     shadow: 'rgba(239, 68, 68, 0.4)',
// //     ring: 'ring-red-500/20',
// //     iconClass: 'text-red-500',
// //     progressClass: 'bg-gradient-to-r from-red-400 to-rose-500',
// //   },
// //   warning: {
// //     icon: (
// //       <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
// //         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
// //       </svg>
// //     ),
// //     gradient: 'from-yellow-500 via-amber-500 to-orange-500',
// //     shadow: 'rgba(245, 158, 11, 0.4)',
// //     ring: 'ring-yellow-500/20',
// //     iconClass: 'text-amber-500',
// //     progressClass: 'bg-gradient-to-r from-yellow-400 to-orange-500',
// //   },
// //   info: {
// //     icon: (
// //       <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
// //         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
// //       </svg>
// //     ),
// //     gradient: 'from-blue-500 via-cyan-500 to-indigo-500',
// //     shadow: 'rgba(59, 130, 246, 0.4)',
// //     ring: 'ring-blue-500/20',
// //     iconClass: 'text-blue-500',
// //     progressClass: 'bg-gradient-to-r from-blue-400 to-cyan-500',
// //   }
// // };

// // const Toast = ({ type = 'info', title, message, duration = 3000, onClose }) => {
// //   const [isRemoving, setIsRemoving] = useState(false);
// //   const [progress, setProgress] = useState(100);
// //   const [isPaused, setIsPaused] = useState(false);
// //   const config = TOAST_CONFIG[type] || TOAST_CONFIG.info;

// //   useEffect(() => {
// //     if (!isPaused) {
// //       const interval = setInterval(() => {
// //         setProgress((prev) => {
// //           if (prev <= 0) {
// //             clearInterval(interval);
// //             handleClose();
// //             return 0;
// //           }
// //           return prev - (100 / (duration / 100));
// //         });
// //       }, 100);

// //       return () => clearInterval(interval);
// //     }
// //   }, [duration, isPaused]);

// //   const handleClose = () => {
// //     setIsRemoving(true);
// //     setTimeout(() => {
// //       onClose?.();
// //     }, 300);
// //   };

// //   return (
// //     <div
// //       className={`
// //         relative overflow-hidden
// //         bg-white dark:bg-gray-800
// //         rounded-2xl
// //         shadow-2xl
// //         ring-1 ${config.ring}
// //         transition-all duration-500 ease-out
// //         ${isRemoving ? 'animate-toast-out' : 'animate-toast-in'}
// //         hover:scale-[1.02] hover:shadow-3xl
// //         max-w-md w-full
// //       `}
// //       style={{
// //         boxShadow: `
// //           0 20px 25px -5px ${config.shadow},
// //           0 10px 10px -5px rgba(0, 0, 0, 0.04),
// //           0 0 0 1px rgba(255, 255, 255, 0.1) inset
// //         `
// //       }}
// //       onMouseEnter={() => setIsPaused(true)}
// //       onMouseLeave={() => setIsPaused(false)}
// //       role="alert"
// //     >
// //       {/* Background Gradient Decoration */}
// //       <div className={`absolute inset-0 bg-gradient-to-r ${config.gradient} opacity-5`} />
      
// //       {/* Main Content */}
// //       <div className="relative flex items-start p-4 gap-3">
// //         {/* Icon Container */}
// //         <div className="relative flex-shrink-0">
// //           <div className={`
// //             w-10 h-10 rounded-xl
// //             bg-gradient-to-br from-white to-gray-50
// //             dark:from-gray-700 dark:to-gray-800
// //             shadow-inner
// //             flex items-center justify-center
// //             ${config.iconClass}
// //             animate-icon-bounce
// //           `}>
// //             {config.icon}
// //           </div>
// //           <div className={`absolute inset-0 rounded-xl bg-gradient-to-r ${config.gradient} opacity-20 blur-xl`} />
// //         </div>

// //         {/* Text Content */}
// //         <div className="flex-1 min-w-0">
// //           {title && (
// //             <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-0.5">
// //               {title}
// //             </h4>
// //           )}
// //           <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
// //             {message}
// //           </p>
// //         </div>

// //         {/* Close Button */}
// //         <button
// //           onClick={handleClose}
// //           className="
// //             flex-shrink-0
// //             w-8 h-8 rounded-lg
// //             bg-gray-100 dark:bg-gray-700
// //             hover:bg-gray-200 dark:hover:bg-gray-600
// //             transition-all duration-200
// //             flex items-center justify-center
// //             group
// //           "
// //         >
// //           <svg className="w-4 h-4 text-gray-500 group-hover:text-gray-700 dark:text-gray-400 dark:group-hover:text-gray-200 transition-transform group-hover:rotate-90" 
// //                fill="none" viewBox="0 0 24 24" stroke="currentColor">
// //             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
// //           </svg>
// //         </button>
// //       </div>

// //       {/* Progress Bar */}
// //       <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200 dark:bg-gray-700">
// //         <div 
// //           className={`h-full ${config.progressClass} transition-all duration-100 ease-linear shadow-sm`}
// //           style={{ width: `${progress}%` }}
// //         />
// //       </div>

// //       {/* Shine Effect */}
// //       <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
// //         <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-10 -skew-x-12 animate-shine" />
// //       </div>
// //     </div>
// //   );
// // };

// // export const ToastContainer = ({ position = 'top-right', maxToasts = 5 }) => {
// //   const [toasts, setToasts] = useState([]);

// //   useEffect(() => {
// //     const unsubscribe = toastManager.subscribe((toast) => {
// //       setToasts((prev) => {
// //         const newToasts = [...prev, toast];
// //         return newToasts.slice(-maxToasts);
// //       });
// //     });

// //     return () => unsubscribe();
// //   }, [maxToasts]);

// //   const removeToast = (id) => {
// //     setToasts((prev) => prev.filter((toast) => toast.id !== id));
// //   };

// //   const positionClasses = {
// //     'top-right': 'top-5 right-5',
// //     'top-left': 'top-5 left-5',
// //     'top-center': 'top-5 left-1/2 -translate-x-1/2',
// //     'bottom-right': 'bottom-5 right-5',
// //     'bottom-left': 'bottom-5 left-5',
// //     'bottom-center': 'bottom-5 left-1/2 -translate-x-1/2',
// //   };

// //   return (
// //     <>
// //       <style jsx global>{`
// //         @keyframes toast-in {
// //           0% {
// //             transform: translateX(100%) scale(0.9);
// //             opacity: 0;
// //           }
// //           100% {
// //             transform: translateX(0) scale(1);
// //             opacity: 1;
// //           }
// //         }

// //         @keyframes toast-out {
// //           0% {
// //             transform: translateX(0) scale(1);
// //             opacity: 1;
// //           }
// //           100% {
// //             transform: translateX(100%) scale(0.9);
// //             opacity: 0;
// //           }
// //         }

// //         @keyframes icon-bounce {
// //           0%, 100% {
// //             transform: translateY(0);
// //           }
// //           50% {
// //             transform: translateY(-2px);
// //           }
// //         }

// //         @keyframes shine {
// //           0% {
// //             transform: translateX(-100%) skewX(-12deg);
// //           }
// //           100% {
// //             transform: translateX(200%) skewX(-12deg);
// //           }
// //         }

// //         .animate-toast-in {
// //           animation: toast-in 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
// //         }

// //         .animate-toast-out {
// //           animation: toast-out 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
// //         }

// //         .animate-icon-bounce {
// //           animation: icon-bounce 2s ease-in-out infinite;
// //         }

// //         .animate-shine {
// //           animation: shine 3s ease-in-out infinite;
// //         }

// //         .shadow-3xl {
// //           box-shadow: 0 35px 60px -15px rgba(0, 0, 0, 0.3);
// //         }
// //       `}</style>

// //       <div className={`fixed ${positionClasses[position]} z-[9999] pointer-events-none`}>
// //         <div className="pointer-events-auto space-y-3">
// //           {toasts.map((toast) => (
// //             <Toast
// //               key={toast.id}
// //               type={toast.type}
// //               title={toast.title}
// //               message={toast.message}
// //               duration={toast.duration}
// //               onClose={() => removeToast(toast.id)}
// //             />
// //           ))}
// //         </div>
// //       </div>
// //     </>
// //   );
// // };






// import React, { useState, useEffect } from 'react';

// // Toast Manager Class
// class ToastManager {
//   constructor() {
//     this.listeners = [];
//     this.toastId = 0;
//   }

//   subscribe(listener) {
//     this.listeners.push(listener);
//     return () => {
//       this.listeners = this.listeners.filter((l) => l !== listener);
//     };
//   }

//   notify(options) {
//     const id = ++this.toastId;
//     const toast = {
//       id,
//       type: options.type || 'info',
//       title: options.title || null,
//       message: options.message,
//       duration: options.duration || 3000,
//     };

//     this.listeners.forEach((listener) => listener(toast));
//     return id;
//   }

//   _show(type, titleOrMessage, messageOrOptions) {
//     let options = { type };

//     if (typeof messageOrOptions === 'string') {
//       options.title = titleOrMessage;
//       options.message = messageOrOptions;
//     } else if (typeof messageOrOptions === 'object' && messageOrOptions !== null) {
//       options = { ...options, title: titleOrMessage, ...messageOrOptions };
//     } else {
//       options.message = titleOrMessage;
//     }

//     return this.notify(options);
//   }

//   success(titleOrMessage, messageOrOptions) {
//     return this._show('success', titleOrMessage, messageOrOptions);
//   }

//   error(titleOrMessage, messageOrOptions) {
//     return this._show('error', titleOrMessage, messageOrOptions);
//   }

//   warning(titleOrMessage, messageOrOptions) {
//     return this._show('warning', titleOrMessage, messageOrOptions);
//   }

//   info(titleOrMessage, messageOrOptions) {
//     return this._show('info', titleOrMessage, messageOrOptions);
//   }
// }

// const toastManager = new ToastManager();

// export const toast = {
//   success: (titleOrMessage, messageOrOptions) => 
//     toastManager.success(titleOrMessage, messageOrOptions),
//   error: (titleOrMessage, messageOrOptions) => 
//     toastManager.error(titleOrMessage, messageOrOptions),
//   warning: (titleOrMessage, messageOrOptions) => 
//     toastManager.warning(titleOrMessage, messageOrOptions),
//   info: (titleOrMessage, messageOrOptions) => 
//     toastManager.info(titleOrMessage, messageOrOptions),
// };

// const TOAST_CONFIG = {
//   success: {
//     icon: (
//       <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
//       </svg>
//     ),
//     bgColor: '#10b981',
//     lightBg: '#d1fae5',
//     iconBg: '#ecfdf5',
//     textColor: '#065f46',
//     borderColor: '#86efac',
//   },
//   error: {
//     icon: (
//       <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
//       </svg>
//     ),
//     bgColor: '#ef4444',
//     lightBg: '#fee2e2',
//     iconBg: '#fef2f2',
//     textColor: '#991b1b',
//     borderColor: '#fca5a5',
//   },
//   warning: {
//     icon: (
//       <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
//       </svg>
//     ),
//     bgColor: '#f59e0b',
//     lightBg: '#fef3c7',
//     iconBg: '#fffbeb',
//     textColor: '#92400e',
//     borderColor: '#fcd34d',
//   },
//   info: {
//     icon: (
//       <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//       </svg>
//     ),
//     bgColor: '#3b82f6',
//     lightBg: '#dbeafe',
//     iconBg: '#eff6ff',
//     textColor: '#1e40af',
//     borderColor: '#93c5fd',
//   }
// };

// const Toast = ({ type = 'info', title, message, duration = 3000, onClose }) => {
//   const [isVisible, setIsVisible] = useState(false);
//   const [isRemoving, setIsRemoving] = useState(false);
//   const [progress, setProgress] = useState(100);
//   const config = TOAST_CONFIG[type] || TOAST_CONFIG.info;

//   useEffect(() => {
//     // Trigger enter animation
//     const showTimer = setTimeout(() => setIsVisible(true), 10);
    
//     // Auto close timer
//     const closeTimer = setTimeout(() => {
//       handleClose();
//     }, duration);

//     // Progress animation
//     const interval = setInterval(() => {
//       setProgress((prev) => {
//         const newProgress = prev - (100 / (duration / 100));
//         return newProgress < 0 ? 0 : newProgress;
//       });
//     }, 100);

//     return () => {
//       clearTimeout(showTimer);
//       clearTimeout(closeTimer);
//       clearInterval(interval);
//     };
//   }, [duration]);

//   const handleClose = () => {
//     setIsRemoving(true);
//     setIsVisible(false);
//     setTimeout(() => {
//       onClose?.();
//     }, 300);
//   };

//   return (
//     <div
//       style={{
//         background: 'white',
//         borderRadius: '12px',
//         boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
//         border: `1px solid ${config.borderColor}`,
//         overflow: 'hidden',
//         transform: isVisible && !isRemoving ? 'translateX(0) scale(1)' : 'translateX(100%) scale(0.95)',
//         opacity: isVisible && !isRemoving ? '1' : '0',
//         transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
//         minWidth: '300px',
//         maxWidth: '400px',
//       }}
//       role="alert"
//     >
//       {/* Content */}
//       <div style={{ padding: '12px 16px', display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
//         {/* Icon */}
//         <div 
//           style={{
//             width: '36px',
//             height: '36px',
//             borderRadius: '8px',
//             background: config.iconBg,
//             display: 'flex',
//             alignItems: 'center',
//             justifyContent: 'center',
//             color: config.bgColor,
//             flexShrink: 0,
//           }}
//         >
//           {config.icon}
//         </div>

//         {/* Text */}
//         <div style={{ flex: 1, minWidth: 0 }}>
//           {title && (
//             <div style={{ 
//               fontSize: '14px', 
//               fontWeight: '600', 
//               color: '#111827',
//               marginBottom: '2px' 
//             }}>
//               {title}
//             </div>
//           )}
//           <div style={{ 
//             fontSize: '13px', 
//             color: '#6b7280',
//             lineHeight: '1.5'
//           }}>
//             {message}
//           </div>
//         </div>

//         {/* Close Button */}
//         <button
//           onClick={handleClose}
//           style={{
//             background: 'transparent',
//             border: 'none',
//             cursor: 'pointer',
//             padding: '4px',
//             display: 'flex',
//             alignItems: 'center',
//             justifyContent: 'center',
//             borderRadius: '4px',
//             transition: 'background 0.2s',
//           }}
//           onMouseEnter={(e) => e.currentTarget.style.background = '#f3f4f6'}
//           onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
//         >
//           <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="#6b7280" strokeWidth="2">
//             <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
//           </svg>
//         </button>
//       </div>

//       {/* Progress Bar */}
//       <div style={{ 
//         height: '3px', 
//         background: config.lightBg,
//         position: 'relative',
//         overflow: 'hidden'
//       }}>
//         <div 
//           style={{
//             height: '100%',
//             width: `${progress}%`,
//             background: config.bgColor,
//             transition: 'width 0.1s linear',
//             boxShadow: `0 0 10px ${config.bgColor}40`,
//           }}
//         />
//       </div>
//     </div>
//   );
// };

// export const ToastContainer = ({ position = 'top-right', maxToasts = 5 }) => {
//   const [toasts, setToasts] = useState([]);

//   useEffect(() => {
//     const unsubscribe = toastManager.subscribe((toast) => {
//       setToasts((prev) => {
//         const newToasts = [...prev, toast];
//         return newToasts.slice(-maxToasts);
//       });
//     });

//     return () => unsubscribe();
//   }, [maxToasts]);

//   const removeToast = (id) => {
//     setToasts((prev) => prev.filter((toast) => toast.id !== id));
//   };

//   const positions = {
//     'top-right': { top: '20px', right: '20px' },
//     'top-left': { top: '20px', left: '20px' },
//     'top-center': { top: '20px', left: '50%', transform: 'translateX(-50%)' },
//     'bottom-right': { bottom: '20px', right: '20px' },
//     'bottom-left': { bottom: '20px', left: '20px' },
//     'bottom-center': { bottom: '20px', left: '50%', transform: 'translateX(-50%)' },
//   };

//   return (
//     <div 
//       style={{
//         position: 'fixed',
//         ...positions[position],
//         zIndex: 9999,
//         pointerEvents: 'none',
//       }}
//     >
//       <div style={{ pointerEvents: 'auto', display: 'flex', flexDirection: 'column', gap: '10px' }}>
//         {toasts.map((toast) => (
//           <Toast
//             key={toast.id}
//             type={toast.type}
//             title={toast.title}
//             message={toast.message}
//             duration={toast.duration}
//             onClose={() => removeToast(toast.id)}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// // Demo Component
// export const ToastDemo = () => {
//   return (
//     <div style={{ 
//       minHeight: '100vh', 
//       background: 'linear-gradient(to bottom right, #f9fafb, #f3f4f6)',
//       padding: '40px 20px' 
//     }}>
//       <div style={{ maxWidth: '800px', margin: '0 auto' }}>
//         <h1 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '8px', color: '#111827' }}>
//           Toast Notifications
//         </h1>
//         <p style={{ color: '#6b7280', marginBottom: '32px' }}>
//           Click buttons below to show different toast notifications
//         </p>

//         <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
//           <button
//             onClick={() => toast.success('Success!', 'Your data has been saved.')}
//             style={{
//               padding: '12px 24px',
//               background: '#10b981',
//               color: 'white',
//               border: 'none',
//               borderRadius: '8px',
//               cursor: 'pointer',
//               fontWeight: '500',
//               fontSize: '14px',
//               transition: 'transform 0.2s',
//             }}
//             onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
//             onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
//           >
//             Show Success
//           </button>

//           <button
//             onClick={() => toast.error('Error!', 'Something went wrong.')}
//             style={{
//               padding: '12px 24px',
//               background: '#ef4444',
//               color: 'white',
//               border: 'none',
//               borderRadius: '8px',
//               cursor: 'pointer',
//               fontWeight: '500',
//               fontSize: '14px',
//               transition: 'transform 0.2s',
//             }}
//             onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
//             onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
//           >
//             Show Error
//           </button>

//           <button
//             onClick={() => toast.warning('Warning!', 'Please check your input.')}
//             style={{
//               padding: '12px 24px',
//               background: '#f59e0b',
//               color: 'white',
//               border: 'none',
//               borderRadius: '8px',
//               cursor: 'pointer',
//               fontWeight: '500',
//               fontSize: '14px',
//               transition: 'transform 0.2s',
//             }}
//             onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
//             onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
//           >
//             Show Warning
//           </button>

//           <button
//             onClick={() => toast.info('Info', 'New update available.')}
//             style={{
//               padding: '12px 24px',
//               background: '#3b82f6',
//               color: 'white',
//               border: 'none',
//               borderRadius: '8px',
//               cursor: 'pointer',
//               fontWeight: '500',
//               fontSize: '14px',
//               transition: 'transform 0.2s',
//             }}
//             onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
//             onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
//           >
//             Show Info
//           </button>
//         </div>
//       </div>

//       <ToastContainer position="top-right" />
//     </div>
//   );
// };



import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';

// Enhanced Toast Manager Class
class ToastManager {
  constructor() {
    this.listeners = [];
    this.toastId = 0;
    this.toasts = new Map();
    this.queue = [];
    this.isProcessingQueue = false;
    this.history = [];
    this.maxHistory = 50;
    this.soundEnabled = true;
    this.defaultOptions = {
      duration: 3000,
      pauseOnHover: true,
      showCloseButton: true,
      animation: 'slide', // slide, fade, bounce, zoom
      sound: true,
    };
  }

  // Configure default options
  configure(options) {
    this.defaultOptions = { ...this.defaultOptions, ...options };
  }

  // Enable/disable sound
  setSound(enabled) {
    this.soundEnabled = enabled;
  }

  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  notify(options) {
    const id = ++this.toastId;
    const toast = {
      id,
      type: options.type || 'info',
      title: options.title || null,
      message: options.message,
      duration: options.duration ?? this.defaultOptions.duration,
      persistent: options.persistent || false,
      actions: options.actions || [],
      component: options.component || null,
      pauseOnHover: options.pauseOnHover ?? this.defaultOptions.pauseOnHover,
      showCloseButton: options.showCloseButton ?? this.defaultOptions.showCloseButton,
      animation: options.animation || this.defaultOptions.animation,
      position: options.position || null,
      className: options.className || '',
      style: options.style || {},
      icon: options.icon || null,
      progress: options.progress !== undefined ? options.progress : true,
      sound: options.sound ?? this.defaultOptions.sound,
      timestamp: new Date().toISOString(),
      onClose: options.onClose || null,
      onClick: options.onClick || null,
      data: options.data || null,
    };

    this.toasts.set(id, toast);
    this.addToHistory(toast);
    
    if (this.soundEnabled && toast.sound) {
      this.playSound(toast.type);
    }

    this.listeners.forEach((listener) => listener({ type: 'add', toast }));
    return id;
  }

  // Update existing toast
  update(id, updates) {
    const toast = this.toasts.get(id);
    if (toast) {
      const updatedToast = { ...toast, ...updates };
      this.toasts.set(id, updatedToast);
      this.listeners.forEach((listener) => 
        listener({ type: 'update', toast: updatedToast })
      );
    }
  }

  // Remove toast
  remove(id) {
    const toast = this.toasts.get(id);
    if (toast) {
      this.toasts.delete(id);
      if (toast.onClose) toast.onClose();
      this.listeners.forEach((listener) => 
        listener({ type: 'remove', id })
      );
    }
  }

  // Clear all toasts
  clear(type = null) {
    if (type) {
      Array.from(this.toasts.values())
        .filter(toast => toast.type === type)
        .forEach(toast => this.remove(toast.id));
    } else {
      Array.from(this.toasts.keys()).forEach(id => this.remove(id));
    }
  }

  // Promise-based toast
  async promise(promise, options) {
    const id = this.notify({
      ...options.loading,
      type: 'loading',
      persistent: true,
    });

    try {
      const result = await promise;
      this.update(id, {
        ...options.success,
        type: 'success',
        persistent: false,
        duration: options.success?.duration || 3000,
      });
      return result;
    } catch (error) {
      this.update(id, {
        ...options.error,
        type: 'error',
        persistent: false,
        duration: options.error?.duration || 4000,
      });
      throw error;
    }
  }

  // Queue management
  addToQueue(options) {
    this.queue.push(options);
    this.processQueue();
  }

  processQueue() {
    if (this.isProcessingQueue || this.queue.length === 0) return;
    
    this.isProcessingQueue = true;
    const options = this.queue.shift();
    this.notify(options);
    
    setTimeout(() => {
      this.isProcessingQueue = false;
      this.processQueue();
    }, 300);
  }

  // History management
  addToHistory(toast) {
    this.history.unshift(toast);
    if (this.history.length > this.maxHistory) {
      this.history.pop();
    }
  }

  getHistory() {
    return [...this.history];
  }

  clearHistory() {
    this.history = [];
  }

  // Play sound
  playSound(type) {
    const sounds = {
      success: 'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBjGH0fPTgjMGHm7A7+OZURE',
      error: 'data:audio/wav;base64,UklGRqoEAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQQEAADpxcG+8v3++PLuu5J7hJaqx+r39Qg=',
      warning: 'data:audio/wav;base64,UklGRtoEAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQMEAAAjMEYpKjBPT1pbLSAeMVl1gWZLLSIrVH2NcE4xKDZffn15azovLDVHYXF4fHx3cGs=',
      info: 'data:audio/wav;base64,UklGRvQEAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQIEAADDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8M=',
    };

    if (sounds[type]) {
      const audio = new Audio(sounds[type]);
      audio.volume = 0.3;
      audio.play().catch(() => {});
    }
  }

  // Helper methods
  _show(type, titleOrMessage, messageOrOptions) {
    let options = { type };

    if (typeof messageOrOptions === 'string') {
      options.title = titleOrMessage;
      options.message = messageOrOptions;
    } else if (typeof messageOrOptions === 'object' && messageOrOptions !== null) {
      options = { ...options, title: titleOrMessage, ...messageOrOptions };
    } else {
      options.message = titleOrMessage;
    }

    return this.notify(options);
  }

  success(titleOrMessage, messageOrOptions) {
    return this._show('success', titleOrMessage, messageOrOptions);
  }

  error(titleOrMessage, messageOrOptions) {
    return this._show('error', titleOrMessage, messageOrOptions);
  }

  warning(titleOrMessage, messageOrOptions) {
    return this._show('warning', titleOrMessage, messageOrOptions);
  }

  info(titleOrMessage, messageOrOptions) {
    return this._show('info', titleOrMessage, messageOrOptions);
  }

  loading(titleOrMessage, messageOrOptions) {
    return this._show('loading', titleOrMessage, messageOrOptions);
  }

  custom(component, options = {}) {
    return this.notify({ ...options, component, type: 'custom' });
  }
}

const toastManager = new ToastManager();

export const toast = {
  success: (...args) => toastManager.success(...args),
  error: (...args) => toastManager.error(...args),
  warning: (...args) => toastManager.warning(...args),
  info: (...args) => toastManager.info(...args),
  loading: (...args) => toastManager.loading(...args),
  custom: (...args) => toastManager.custom(...args),
  promise: (...args) => toastManager.promise(...args),
  update: (...args) => toastManager.update(...args),
  remove: (...args) => toastManager.remove(...args),
  clear: (...args) => toastManager.clear(...args),
  configure: (...args) => toastManager.configure(...args),
  setSound: (...args) => toastManager.setSound(...args),
  history: () => toastManager.getHistory(),
  clearHistory: () => toastManager.clearHistory(),
};

// Enhanced Toast Configurations
const TOAST_CONFIG = {
  success: {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    bgColor: '#10b981',
    lightBg: '#d1fae5',
    iconBg: '#ecfdf5',
    textColor: '#065f46',
    borderColor: '#86efac',
  },
  error: {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    bgColor: '#ef4444',
    lightBg: '#fee2e2',
    iconBg: '#fef2f2',
    textColor: '#991b1b',
    borderColor: '#fca5a5',
  },
  warning: {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
    ),
    bgColor: '#f59e0b',
    lightBg: '#fef3c7',
    iconBg: '#fffbeb',
    textColor: '#92400e',
    borderColor: '#fcd34d',
  },
  info: {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    bgColor: '#3b82f6',
    lightBg: '#dbeafe',
    iconBg: '#eff6ff',
    textColor: '#1e40af',
    borderColor: '#93c5fd',
  },
  loading: {
    icon: (
      <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
      </svg>
    ),
    bgColor: '#8b5cf6',
    lightBg: '#ede9fe',
    iconBg: '#f3f4f6',
    textColor: '#5b21b6',
    borderColor: '#c4b5fd',
  },
  custom: {
    icon: null,
    bgColor: '#6b7280',
    lightBg: '#f3f4f6',
    iconBg: '#f9fafb',
    textColor: '#374151',
    borderColor: '#d1d5db',
  }
};

// Enhanced Toast Component
const Toast = ({ 
  type = 'info', 
  title, 
  message, 
  duration = 3000, 
  persistent = false,
  actions = [],
  component = null,
  pauseOnHover = true,
  showCloseButton = true,
  animation = 'slide',
  className = '',
  style = {},
  icon: customIcon = null,
  progress: showProgress = true,
  onClick = null,
  onClose,
  data = null,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);
  const [progress, setProgress] = useState(100);
  const [isPaused, setIsPaused] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const intervalRef = useRef(null);
  const config = TOAST_CONFIG[type] || TOAST_CONFIG.info;

  useEffect(() => {
    const showTimer = setTimeout(() => setIsVisible(true), 10);
    
    if (!persistent) {
      const closeTimer = setTimeout(() => {
        if (!isPaused) {
          handleClose();
        }
      }, duration);

      if (showProgress) {
        intervalRef.current = setInterval(() => {
          if (!isPaused) {
            setProgress((prev) => {
              const newProgress = prev - (100 / (duration / 100));
              if (newProgress <= 0) {
                handleClose();
                return 0;
              }
              return newProgress;
            });
          }
        }, 100);
      }

      return () => {
        clearTimeout(showTimer);
        clearTimeout(closeTimer);
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
      };
    } else {
      return () => clearTimeout(showTimer);
    }
  }, [duration, persistent, isPaused, showProgress]);

  const handleClose = () => {
    setIsRemoving(true);
    setIsVisible(false);
    setTimeout(() => {
      onClose?.();
    }, 300);
  };

  const handleMouseEnter = () => {
    if (pauseOnHover && !persistent) {
      setIsPaused(true);
    }
  };

  const handleMouseLeave = () => {
    if (pauseOnHover && !persistent) {
      setIsPaused(false);
    }
  };

  const handleClick = () => {
    if (onClick) {
      onClick(data);
    }
  };

  const getAnimationStyle = () => {
    const animations = {
      slide: {
        transform: isVisible && !isRemoving ? 'translateX(0)' : 'translateX(100%)',
        opacity: isVisible && !isRemoving ? '1' : '0',
      },
      fade: {
        opacity: isVisible && !isRemoving ? '1' : '0',
      },
      bounce: {
        transform: isVisible && !isRemoving ? 'translateY(0) scale(1)' : 'translateY(-20px) scale(0.9)',
        opacity: isVisible && !isRemoving ? '1' : '0',
      },
      zoom: {
        transform: isVisible && !isRemoving ? 'scale(1)' : 'scale(0.8)',
        opacity: isVisible && !isRemoving ? '1' : '0',
      },
    };

    return animations[animation] || animations.slide;
  };

  // Custom component rendering
  if (component) {
    return (
      <div
        style={{
          ...getAnimationStyle(),
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          ...style,
        }}
        className={className}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
      >
        {React.cloneElement(component, { onClose: handleClose, data })}
      </div>
    );
  }

  return (
    <div
      style={{
        background: 'white',
        borderRadius: '12px',
        boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        border: `1px solid ${config.borderColor}`,
        overflow: 'hidden',
        ...getAnimationStyle(),
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        minWidth: '300px',
        maxWidth: '500px',
        cursor: onClick ? 'pointer' : 'default',
        ...style,
      }}
      className={className}
      role="alert"
      aria-live="polite"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      {/* Main Content */}
      <div style={{ padding: '12px 16px', display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
        {/* Icon */}
        {(customIcon || config.icon) && (
          <div 
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '8px',
              background: config.iconBg,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: config.bgColor,
              flexShrink: 0,
            }}
          >
            {customIcon || config.icon}
          </div>
        )}

        {/* Text */}
        <div style={{ flex: 1, minWidth: 0 }}>
          {title && (
            <div style={{ 
              fontSize: '14px', 
              fontWeight: '600', 
              color: '#111827',
              marginBottom: '2px' 
            }}>
              {title}
            </div>
          )}
          <div style={{ 
            fontSize: '13px', 
            color: '#6b7280',
            lineHeight: '1.5',
            maxHeight: isExpanded ? 'none' : '40px',
            overflow: 'hidden',
            transition: 'max-height 0.3s ease',
          }}>
            {message}
          </div>
          
          {/* Show more/less for long messages */}
          {message && message.length > 100 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsExpanded(!isExpanded);
              }}
              style={{
                background: 'none',
                border: 'none',
                color: config.bgColor,
                fontSize: '12px',
                cursor: 'pointer',
                padding: '2px 0',
                marginTop: '4px',
              }}
            >
              {isExpanded ? 'Show less' : 'Show more'}
            </button>
          )}

          {/* Action Buttons */}
          {actions.length > 0 && (
            <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
              {actions.map((action, index) => (
                <button
                  key={index}
                  onClick={(e) => {
                    e.stopPropagation();
                    action.onClick(data);
                    if (action.closeOnClick !== false) {
                      handleClose();
                    }
                  }}
                  style={{
                    padding: '4px 12px',
                    background: action.style?.background || config.bgColor,
                    color: action.style?.color || 'white',
                    border: 'none',
                    borderRadius: '6px',
                    fontSize: '12px',
                    fontWeight: '500',
                    cursor: 'pointer',
                    transition: 'opacity 0.2s',
                    ...action.style,
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.opacity = '0.9'}
                  onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
                >
                  {action.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Close Button */}
        {showCloseButton && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleClose();
            }}
            style={{
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              padding: '4px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '4px',
              transition: 'background 0.2s',
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = '#f3f4f6'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
            aria-label="Close notification"
          >
            <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="#6b7280" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {/* Progress Bar */}
      {showProgress && !persistent && (
        <div style={{ 
          height: '3px', 
          background: config.lightBg,
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div 
            style={{
              height: '100%',
              width: `${progress}%`,
              background: config.bgColor,
              transition: isPaused ? 'none' : 'width 0.1s linear',
              boxShadow: `0 0 10px ${config.bgColor}40`,
            }}
          />
        </div>
      )}
    </div>
  );
};

// Enhanced Toast Container
export const ToastContainer = ({ 
  position = 'top-right', 
  maxToasts = 5,
  gutter = 10,
  offset = 20,
  theme = 'light',
  reverseOrder = false,
}) => {
  const [toasts, setToasts] = useState([]);
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    const unsubscribe = toastManager.subscribe((event) => {
      if (event.type === 'add') {
        setToasts((prev) => {
          const newToasts = [...prev, event.toast];
          if (maxToasts && newToasts.length > maxToasts) {
            return reverseOrder 
              ? newToasts.slice(0, maxToasts) 
              : newToasts.slice(-maxToasts);
          }
          return newToasts;
        });
      } else if (event.type === 'update') {
        setToasts((prev) => 
          prev.map(t => t.id === event.toast.id ? event.toast : t)
        );
      } else if (event.type === 'remove') {
        setToasts((prev) => prev.filter((t) => t.id !== event.id));
      }
    });

    // Keyboard shortcut to clear all toasts (Escape key)
    const handleKeyPress = (e) => {
      if (e.key === 'Escape') {
        toast.clear();
      }
    };

    window.addEventListener('keydown', handleKeyPress);

    return () => {
      unsubscribe();
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [maxToasts, reverseOrder]);

  const removeToast = (id) => {
    toastManager.remove(id);
  };

  const positions = {
    'top-right': { top: `${offset}px`, right: `${offset}px` },
    'top-left': { top: `${offset}px`, left: `${offset}px` },
    'top-center': { top: `${offset}px`, left: '50%', transform: 'translateX(-50%)' },
    'bottom-right': { bottom: `${offset}px`, right: `${offset}px` },
    'bottom-left': { bottom: `${offset}px`, left: `${offset}px` },
    'bottom-center': { bottom: `${offset}px`, left: '50%', transform: 'translateX(-50%)' },
    'center': { top: '50%', left: '50%', transform: 'translate(-50%, -50%)' },
  };

  const orderedToasts = reverseOrder ? [...toasts].reverse() : toasts;

  return (
    <>
      {/* Collapse/Expand Button for multiple toasts */}
      {toasts.length > 3 && (
        <button
          onClick={() => setCollapsed(!collapsed)}
          style={{
            position: 'fixed',
            ...positions[position],
            zIndex: 10000,
            background: '#4b5563',
            color: 'white',
            border: 'none',
            borderRadius: '20px',
            padding: '8px 16px',
            fontSize: '12px',
            fontWeight: '500',
            cursor: 'pointer',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            marginBottom: '10px',
          }}
        >
          {collapsed ? `Show ${toasts.length} notifications` : 'Collapse'}
        </button>
      )}

      <div 
        style={{
          position: 'fixed',
          ...positions[position],
          zIndex: 9999,
          pointerEvents: 'none',
          maxHeight: collapsed ? '60px' : '100vh',
          overflow: 'hidden',
          transition: 'max-height 0.3s ease',
        }}
        className={theme === 'dark' ? 'dark' : ''}
      >
        <div style={{ 
          pointerEvents: 'auto', 
          display: 'flex', 
          flexDirection: 'column', 
          gap: `${gutter}px` 
        }}>
          {orderedToasts.map((toast, index) => {
            const customPosition = toast.position 
              ? positions[toast.position] 
              : null;

            return (
              <div
                key={toast.id}
                style={{
                  ...customPosition,
                  opacity: collapsed && index > 0 ? 0 : 1,
                  transform: collapsed && index > 0 
                    ? 'scale(0.9) translateY(-20px)' 
                    : 'scale(1) translateY(0)',
                  transition: 'all 0.3s ease',
                }}
              >
                <Toast
                  {...toast}
                  onClose={() => removeToast(toast.id)}
                />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

// Toast History Component
export const ToastHistory = () => {
  const [history, setHistory] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const loadHistory = () => {
    setHistory(toast.history());
  };

  return (
    <>
      <button
        onClick={() => {
          setIsOpen(!isOpen);
          if (!isOpen) loadHistory();
        }}
        style={{
          position: 'fixed',
          bottom: '20px',
          left: '20px',
          background: '#1f2937',
          color: 'white',
          border: 'none',
          borderRadius: '50%',
          width: '48px',
          height: '48px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          zIndex: 9998,
        }}
      >
        <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </button>

      {isOpen && (
        <div style={{
          position: 'fixed',
          bottom: '80px',
          left: '20px',
          background: 'white',
          borderRadius: '12px',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
          width: '350px',
          maxHeight: '400px',
          overflow: 'auto',
          zIndex: 9998,
        }}>
          <div style={{
            padding: '16px',
            borderBottom: '1px solid #e5e7eb',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
            <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '600' }}>
              Notification History
            </h3>
            <button
              onClick={() => {
                toast.clearHistory();
                loadHistory();
              }}
              style={{
                background: '#ef4444',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                padding: '4px 8px',
                fontSize: '12px',
                cursor: 'pointer',
              }}
            >
              Clear
            </button>
          </div>
          <div style={{ padding: '8px' }}>
            {history.length === 0 ? (
              <p style={{ 
                textAlign: 'center', 
                color: '#9ca3af', 
                padding: '20px',
                margin: 0,
              }}>
                No notifications yet
              </p>
            ) : (
              history.map((item) => (
                <div
                  key={item.id}
                  style={{
                    padding: '12px',
                    borderRadius: '8px',
                    marginBottom: '8px',
                    background: '#f9fafb',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{
                      display: 'inline-block',
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      background: TOAST_CONFIG[item.type]?.bgColor || '#6b7280',
                    }} />
                    <span style={{ fontSize: '12px', fontWeight: '500', color: '#374151' }}>
                      {item.title || item.type.toUpperCase()}
                    </span>
                    <span style={{ fontSize: '11px', color: '#9ca3af', marginLeft: 'auto' }}>
                      {new Date(item.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                  {item.message && (
                    <p style={{ 
                      fontSize: '12px', 
                      color: '#6b7280', 
                      margin: '4px 0 0 16px',
                      lineHeight: '1.4',
                    }}>
                      {item.message}
                    </p>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </>
  );
};

// Enhanced Demo Component
export const ToastDemo = () => {
  const [soundEnabled, setSoundEnabled] = useState(true);

  const handleAsyncOperation = () => {
    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        if (Math.random() > 0.5) {
          resolve('Data loaded successfully!');
        } else {
          reject(new Error('Failed to load data'));
        }
      }, 2000);
    });

    toast.promise(promise, {
      loading: { message: 'Loading data...' },
      success: { 
        title: 'Success',
        message: 'Data loaded successfully!',
      },
      error: { 
        title: 'Error',
        message: 'Failed to load data',
      },
    });
  };

  const showActionToast = () => {
    const id = toast.success('Message sent', {
      actions: [
        {
          label: 'Undo',
          onClick: () => {
            toast.info('Message restored');
          },
        },
        {
          label: 'View',
          onClick: () => {
            toast.info('Opening message...');
          },
          style: { background: 'transparent', color: '#10b981', border: '1px solid #10b981' }
        }
      ],
    });
  };

  const showCustomToast = () => {
    const CustomComponent = ({ onClose }) => (
      <div style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        padding: '16px',
        borderRadius: '12px',
        boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
      }}>
        <h4 style={{ margin: '0 0 8px 0' }}>🎉 Custom Toast!</h4>
        <p style={{ margin: '0 0 12px 0', opacity: 0.9 }}>
          This is a completely custom toast component
        </p>
        <button
          onClick={onClose}
          style={{
            background: 'white',
            color: '#667eea',
            border: 'none',
            padding: '6px 12px',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: '500',
          }}
        >
          Got it!
        </button>
      </div>
    );

    toast.custom(<CustomComponent />);
  };

  const showUpdateableToast = () => {
    const id = toast.loading('Uploading file...');
    
    setTimeout(() => {
      toast.update(id, {
        type: 'success',
        message: 'File uploaded successfully!',
        duration: 3000,
        persistent: false,
      });
    }, 2000);
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(to bottom right, #f9fafb, #f3f4f6)',
      padding: '40px 20px' 
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '8px', color: '#111827' }}>
          Enhanced Toast Notifications
        </h1>
        <p style={{ color: '#6b7280', marginBottom: '32px' }}>
          Advanced toast notification system with multiple features
        </p>

        {/* Settings */}
        <div style={{ 
          background: 'white', 
          padding: '16px', 
          borderRadius: '12px',
          marginBottom: '24px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        }}>
          <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '12px' }}>Settings</h3>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={soundEnabled}
              onChange={(e) => {
                setSoundEnabled(e.target.checked);
                toast.setSound(e.target.checked);
              }}
            />
            <span style={{ fontSize: '14px' }}>Enable sound notifications</span>
          </label>
        </div>

        {/* Basic Toasts */}
        <div style={{ marginBottom: '32px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px', color: '#374151' }}>
            Basic Toasts
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '12px' }}>
            <button
              onClick={() => toast.success('Success!', 'Operation completed successfully.')}
              style={{
                padding: '12px 24px',
                background: '#10b981',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: '500',
                fontSize: '14px',
                transition: 'transform 0.2s',
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              Success
            </button>

            <button
              onClick={() => toast.error('Error!', 'Something went wrong.')}
              style={{
                padding: '12px 24px',
                background: '#ef4444',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: '500',
                fontSize: '14px',
                transition: 'transform 0.2s',
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              Error
            </button>

            <button
              onClick={() => toast.warning('Warning!', 'Please check your input.')}
              style={{
                padding: '12px 24px',
                background: '#f59e0b',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: '500',
                fontSize: '14px',
                transition: 'transform 0.2s',
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              Warning
            </button>

            <button
              onClick={() => toast.info('Info', 'New update available.')}
              style={{
                padding: '12px 24px',
                background: '#3b82f6',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: '500',
                fontSize: '14px',
                transition: 'transform 0.2s',
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              Info
            </button>

            <button
              onClick={() => toast.loading('Loading...', { persistent: true })}
              style={{
                padding: '12px 24px',
                background: '#8b5cf6',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: '500',
                fontSize: '14px',
                transition: 'transform 0.2s',
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              Loading
            </button>
          </div>
        </div>

        {/* Advanced Features */}
        <div style={{ marginBottom: '32px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px', color: '#374151' }}>
            Advanced Features
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px' }}>
            <button
              onClick={handleAsyncOperation}
              style={{
                padding: '12px 24px',
                background: '#6366f1',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: '500',
                fontSize: '14px',
              }}
            >
              Promise Toast
            </button>

            <button
              onClick={showActionToast}
              style={{
                padding: '12px 24px',
                background: '#14b8a6',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: '500',
                fontSize: '14px',
              }}
            >
              With Actions
            </button>

            <button
              onClick={showCustomToast}
              style={{
                padding: '12px 24px',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: '500',
                fontSize: '14px',
              }}
            >
              Custom Component
            </button>

            <button
              onClick={showUpdateableToast}
              style={{
                padding: '12px 24px',
                background: '#f59e0b',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: '500',
                fontSize: '14px',
              }}
            >
              Updateable Toast
            </button>

            <button
              onClick={() => {
                toast.success('Persistent Toast', {
                  message: 'This toast will not auto-close',
                  persistent: true,
                });
              }}
              style={{
                padding: '12px 24px',
                background: '#ec4899',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: '500',
                fontSize: '14px',
              }}
            >
              Persistent Toast
            </button>

            <button
              onClick={() => toast.clear()}
              style={{
                padding: '12px 24px',
                background: '#6b7280',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: '500',
                fontSize: '14px',
              }}
            >
              Clear All
            </button>
          </div>
        </div>

        {/* Animation Types */}
        <div style={{ marginBottom: '32px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px', color: '#374151' }}>
            Animation Types
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '12px' }}>
            {['slide', 'fade', 'bounce', 'zoom'].map(animation => (
              <button
                key={animation}
                onClick={() => toast.info(`${animation} animation`, { animation })}
                style={{
                  padding: '12px 24px',
                  background: '#4b5563',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: '500',
                  fontSize: '14px',
                  textTransform: 'capitalize',
                }}
              >
                {animation}
              </button>
            ))}
          </div>
        </div>

        {/* Different Positions */}
        <div style={{ marginBottom: '32px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px', color: '#374151' }}>
            Custom Positions
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '12px' }}>
            {['top-left', 'top-center', 'top-right', 'bottom-left', 'bottom-center', 'bottom-right'].map(position => (
              <button
                key={position}
                onClick={() => toast.info(`Position: ${position}`, { position })}
                style={{
                  padding: '12px 24px',
                  background: '#9333ea',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: '500',
                  fontSize: '14px',
                  textTransform: 'capitalize',
                }}
              >
                {position.replace('-', ' ')}
              </button>
            ))}
          </div>
        </div>
      </div>

      <ToastContainer position="top-right" />
      <ToastHistory />
    </div>
  );
};