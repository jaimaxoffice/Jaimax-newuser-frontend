// components/TextArea.jsx
import React, { forwardRef } from 'react';

const TextArea = forwardRef(({
  label,
  error,
  helperText,
  rows = 4,
  maxLength,
  showCount = false,
  resize = true,
  fullWidth = false,
  required = false,
  disabled = false,
  className = '',
  ...props
}, ref) => {
  const [charCount, setCharCount] = React.useState(props.value?.length || 0);

  const handleChange = (e) => {
    setCharCount(e.target.value.length);
    props.onChange && props.onChange(e);
  };

  const baseClasses = 'w-full border rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 px-4 py-2';
  
  const stateClasses = error
    ? 'border-red-500 focus:border-red-500 focus:ring-red-200'
    : 'border-gray-300 focus:border-teal-500 focus:ring-teal-200';

  const resizeClass = resize ? 'resize-y' : 'resize-none';

  return (
    <div className={`${fullWidth ? 'w-full' : ''} ${className}`}>
      {/* Label */}
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      {/* TextArea */}
      <textarea
        ref={ref}
        rows={rows}
        maxLength={maxLength}
        disabled={disabled}
        required={required}
        onChange={handleChange}
        className={`
          ${baseClasses}
          ${stateClasses}
          ${resizeClass}
          ${disabled ? 'bg-gray-100 cursor-not-allowed opacity-60' : 'bg-white'}
        `}
        {...props}
      />

      {/* Footer */}
      <div className="flex justify-between items-center mt-1">
        {/* Helper Text / Error */}
        {(error || helperText) && (
          <p className={`text-sm ${error ? 'text-red-500' : 'text-gray-500'}`}>
            {error || helperText}
          </p>
        )}

        {/* Character Count */}
        {showCount && (
          <p className="text-sm text-gray-500 ml-auto">
            {charCount}{maxLength && `/${maxLength}`}
          </p>
        )}
      </div>
    </div>
  );
});

TextArea.displayName = 'TextArea';

export default TextArea;