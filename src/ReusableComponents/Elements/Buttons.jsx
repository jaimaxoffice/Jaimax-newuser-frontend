// components/Button.jsx
import React from 'react';

const Button = ({
  children,
  variant = 'primary',
  size = 'medium',
  fullWidth = false,
  disabled = false,
  loading = false,
  icon = null,
  iconPosition = 'left',
  onClick,
  type = 'button',
  className = '',
  ...props
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

  const variants = {
    primary: 'bg-teal-600 text-white hover:bg-teal-700 focus:ring-teal-500 active:bg-teal-800',
    secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-400 active:bg-gray-400',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 active:bg-red-800',
    success: 'bg-green-600 text-white hover:bg-green-700 focus:ring-green-500 active:bg-green-800',
    warning: 'bg-yellow-500 text-white hover:bg-yellow-600 focus:ring-yellow-400 active:bg-yellow-700',
    outline: 'border-2 border-teal-600 text-teal-600 hover:bg-teal-50 focus:ring-teal-500 active:bg-teal-100',
    ghost: 'text-teal-600 hover:bg-teal-50 focus:ring-teal-500 active:bg-teal-100',
    link: 'text-teal-600 hover:text-teal-700 underline-offset-4 hover:underline focus:ring-teal-500',
  };

  const sizes = {
    small: 'px-3 py-1.5 text-sm gap-1.5',
    medium: 'px-4 py-2 text-base gap-2',
    large: 'px-6 py-3 text-lg gap-2.5',
    xl: 'px-8 py-4 text-xl gap-3',
  };

  const widthClass = fullWidth ? 'w-full' : '';

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`
        ${baseClasses}
        ${variants[variant]}
        ${sizes[size]}
        ${widthClass}
        ${className}
      `}
      {...props}
    >
      {loading && (
        <svg
          className="animate-spin h-5 w-5"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      )}

      {!loading && icon && iconPosition === 'left' && (
        <span className="flex-shrink-0">{icon}</span>
      )}

      {children}

      {!loading && icon && iconPosition === 'right' && (
        <span className="flex-shrink-0">{icon}</span>
      )}
    </button>
  );
};

export default Button;