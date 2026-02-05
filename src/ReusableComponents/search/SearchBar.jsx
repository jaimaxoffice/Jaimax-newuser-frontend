// SearchBar.jsx
import React, { useState, useEffect, useRef } from "react";
import { Search, X, Loader2 } from "lucide-react";

const SearchBar = ({
  placeholder = "Search...",
  value = "",
  onChange,
  onSearch,
  onClear,
  debounceDelay = 300,
  isLoading = false,
  disabled = false,
  autoFocus = false,
  size = "md",
  variant = "default",
  className = "",
  showSearchButton = false,
  searchButtonText = "Search",
}) => {
  const [inputValue, setInputValue] = useState(value);
  const inputRef = useRef(null);
  const debounceRef = useRef(null);

  // Sync with external value
  useEffect(() => {
    setInputValue(value);
  }, [value]);

  // Debounced onChange
  useEffect(() => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      if (onChange && inputValue !== value) {
        onChange(inputValue);
      }
    }, debounceDelay);

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, [inputValue, debounceDelay, onChange, value]);

  // Auto focus
  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleClear = () => {
    setInputValue("");
    if (onChange) onChange("");
    if (onClear) onClear();
    inputRef.current?.focus();
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && onSearch) {
      onSearch(inputValue);
    }
    if (e.key === "Escape") {
      handleClear();
    }
  };

  const handleSearchClick = () => {
    if (onSearch) {
      onSearch(inputValue);
    }
  };

  // Size styles
  const sizeStyles = {
    sm: "py-2 px-3 text-sm",
    md: "py-2.5 px-4 text-base",
    lg: "py-3 px-5 text-lg",
  };

  const iconSizes = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
  };

  // Variant styles
  const variantStyles = {
    default:
      "bg-white border border-gray-300 focus-within:border-teal-500 focus-within:ring-2 focus-within:ring-teal-500/20",
    outlined:
      "bg-transparent border-2 border-gray-300 focus-within:border-teal-500",
    filled:
      "bg-gray-100 border border-transparent focus-within:bg-white focus-within:border-teal-500 focus-within:ring-2 focus-within:ring-teal-500/20",
  };

  return (
    <div className={`w-full ${className}`}>
      <div
        className={`
          relative flex items-center rounded-lg transition-all duration-200
          ${variantStyles[variant]}
          ${disabled ? "opacity-50 cursor-not-allowed" : ""}
        `}
      >
        {/* Search Icon */}
        <div className="absolute left-3 flex items-center pointer-events-none">
          {isLoading ? (
            <Loader2
              className={`${iconSizes[size]} text-gray-400 animate-spin`}
            />
          ) : (
            <Search className={`${iconSizes[size]} text-gray-400`} />
          )}
        </div>

        {/* Input */}
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={disabled}
          className={`
            w-full bg-transparent outline-none
            ${sizeStyles[size]}
            pl-10
            ${inputValue && !showSearchButton ? "pr-10" : "pr-4"}
            ${showSearchButton ? "pr-24" : ""}
            placeholder:text-gray-400
            disabled:cursor-not-allowed
          `}
        />

        {/* Clear Button */}
        {inputValue && !isLoading && (
          <button
            type="button"
            onClick={handleClear}
            disabled={disabled}
            className={`
              absolute flex items-center justify-center
              ${showSearchButton ? "right-20" : "right-3"}
              p-1 rounded-full hover:bg-gray-100 transition-colors
              disabled:cursor-not-allowed
            `}
          >
            <X className={`${iconSizes[size]} text-gray-400 hover:text-gray-600`} />
          </button>
        )}

        {/* Search Button */}
        {showSearchButton && (
          <button
            type="button"
            onClick={handleSearchClick}
            disabled={disabled || isLoading}
            className={`
              absolute right-2 px-4 py-1.5 rounded-md
              bg-teal-500 text-white text-sm font-medium
              hover:bg-teal-600 transition-colors
              disabled:opacity-50 disabled:cursor-not-allowed
            `}
          >
            {searchButtonText}
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchBar;