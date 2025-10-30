import React, { useState, useEffect } from 'react';

class ToastManager {
  constructor() {
    this.listeners = [];
    this.toastId = 0;
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
      duration: options.duration || 3000,
    };

    this.listeners.forEach((listener) => listener(toast));
    return id;
  }

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
}

const toastManager = new ToastManager();

export const toast = {
  success: (titleOrMessage, messageOrOptions) => 
    toastManager.success(titleOrMessage, messageOrOptions),
  error: (titleOrMessage, messageOrOptions) => 
    toastManager.error(titleOrMessage, messageOrOptions),
  warning: (titleOrMessage, messageOrOptions) => 
    toastManager.warning(titleOrMessage, messageOrOptions),
  info: (titleOrMessage, messageOrOptions) => 
    toastManager.info(titleOrMessage, messageOrOptions),
};

const TOAST_CONFIG = {
  info: {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 16v-4" />
        <path d="M12 8h.01" />
      </svg>
    ),
    bgColor: 'bg-blue-500',
    progressColor: 'bg-blue-500'
  },
  error: {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="m15 9-6 6" />
        <path d="m9 9 6 6" />
      </svg>
    ),
    bgColor: 'bg-red-500',
    progressColor: 'bg-red-500'
  },
  success: {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
      </svg>
    ),
    bgColor: 'bg-green-500',
    progressColor: 'bg-green-500'
  },
  warning: {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3" />
        <path d="M12 9v4" />
        <path d="M12 17h.01" />
      </svg>
    ),
    bgColor: 'bg-orange-500',
    progressColor: 'bg-orange-500'
  }
};

const Toast = ({ type = 'info', title, message, duration = 3000, onClose }) => {
  const [isRemoving, setIsRemoving] = useState(false);
  const config = TOAST_CONFIG[type] || TOAST_CONFIG.info;

  useEffect(() => {
    const timer = setTimeout(() => {
      handleClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  const handleClose = () => {
    setIsRemoving(true);
    setTimeout(() => {
      onClose?.();
    }, 300);
  };

  return (
    <div
      className={`bg-white rounded-lg shadow-lg p-3 sm:p-4 flex items-start gap-3 relative overflow-hidden transition-all duration-300 ${
        isRemoving ? 'toast-slide-out' : 'toast-slide-in'
      }`}
      role="alert"
      aria-live="polite"
    >
      {/* Icon */}
      <div className={`${config.bgColor} w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center flex-shrink-0 text-white`}>
        {config.icon}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0 pr-6">
        {title && (
          <div className="text-sm sm:text-base font-semibold text-gray-800 mb-1">
            {title}
          </div>
        )}
        <div className={`text-xs sm:text-sm text-gray-600 leading-relaxed ${!title ? 'font-medium' : ''}`}>
          {message}
        </div>
      </div>

      {/* Close Button */}
      <button
        onClick={handleClose}
        className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 transition-colors text-lg leading-none p-1"
        aria-label="Close notification"
      >
        ✕
      </button>

      {/* Progress Bar */}
      <div 
        className={`absolute bottom-0 left-0 h-1 w-full ${config.progressColor} origin-left toast-progress`}
        style={{ animationDuration: `${duration}ms` }}
      />
    </div>
  );
};

export const ToastContainer = ({ position = 'top-right', maxToasts = 5 }) => {
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    const unsubscribe = toastManager.subscribe((toast) => {
      setToasts((prev) => {
        const newToasts = [...prev, toast];
        return newToasts.slice(-maxToasts);
      });
    });

    return () => unsubscribe();
  }, [maxToasts]);

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  const positionClasses = {
    'top-right': 'top-3 right-3 sm:top-5 sm:right-5',
    'top-left': 'top-3 left-3 sm:top-5 sm:left-5',
    'top-center': 'top-3 left-1/2 -translate-x-1/2 sm:top-5',
    'bottom-right': 'bottom-3 right-3 sm:bottom-5 sm:right-5',
    'bottom-left': 'bottom-3 left-3 sm:bottom-5 sm:left-5',
    'bottom-center': 'bottom-3 left-1/2 -translate-x-1/2 sm:bottom-5',
  };

  return (
    <>
      {/* Inline Styles */}
      <style>
        {`
          @keyframes toastSlideIn {
            from {
              transform: translateX(100%);
              opacity: 0;
            }
            to {
              transform: translateX(0);
              opacity: 1;
            }
          }

          @keyframes toastSlideOut {
            from {
              transform: translateX(0);
              opacity: 1;
            }
            to {
              transform: translateX(100%);
              opacity: 0;
            }
          }

          @keyframes toastProgress {
            from {
              transform: scaleX(1);
            }
            to {
              transform: scaleX(0);
            }
          }

          .toast-slide-in {
            animation: toastSlideIn 0.3s ease-out;
          }

          .toast-slide-out {
            animation: toastSlideOut 0.3s ease-out forwards;
          }

          .toast-progress {
            animation: toastProgress 3s linear forwards;
          }
        `}
      </style>

      {/* Toast Container */}
      <div 
        className={`fixed ${positionClasses[position]} z-50 flex flex-col gap-2 sm:gap-3 max-w-[calc(100vw-1.5rem)] sm:max-w-md w-full pointer-events-none`}
      >
        <div className="pointer-events-auto space-y-2">
          {toasts.map((toast) => (
            <Toast
              key={toast.id}
              type={toast.type}
              title={toast.title}
              message={toast.message}
              duration={toast.duration}
              onClose={() => removeToast(toast.id)}
            />
          ))}
        </div>
      </div>
    </>
  );
};


