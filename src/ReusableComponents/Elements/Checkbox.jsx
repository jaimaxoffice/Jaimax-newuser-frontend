// components/Checkbox.jsx
import React, { forwardRef } from 'react';

const Checkbox = forwardRef(({
  label,
  description,
  checked,
  onChange,
  disabled = false,
  error,
  size = 'medium',
  className = '',
  ...props
}, ref) => {
  const sizes = {
    small: 'w-4 h-4',
    medium: 'w-5 h-5',
    large: 'w-6 h-6',
  };

  return (
    <div className={className}>
      <label className={`flex items-start ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}>
        <input
          ref={ref}
          type="checkbox"
          checked={checked}
          onChange={onChange}
          disabled={disabled}
          className={`
            ${sizes[size]}
            text-teal-600 border-gray-300 rounded
            focus:ring-2 focus:ring-teal-500 focus:ring-offset-2
            transition-all duration-200
            ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}
          `}
          {...props}
        />
        
        {(label || description) && (
          <div className="ml-3">
            {label && (
              <span className="text-sm font-medium text-gray-900">
                {label}
              </span>
            )}
            {description && (
              <p className="text-sm text-gray-500">{description}</p>
            )}
          </div>
        )}
      </label>

      {error && (
        <p className="mt-1 text-sm text-red-500 ml-8">{error}</p>
      )}
    </div>
  );
});

Checkbox.displayName = 'Checkbox';

export default Checkbox;