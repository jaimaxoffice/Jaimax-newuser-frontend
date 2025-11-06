// components/Search.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useDebounce } from '../hooks/useDebounce';

const Search = ({
  placeholder = 'Search...',
  onSearch,
  suggestions = [],
  loading = false,
  debounceDelay = 300,
  showSuggestions = true,
  minChars = 2,
  icon = true,
  size = 'medium',
  fullWidth = false,
  onSuggestionClick,
  renderSuggestion,
  className = '',
}) => {
  const [query, setQuery] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef(null);
  const dropdownRef = useRef(null);

  const debouncedQuery = useDebounce(query, debounceDelay);

  // Trigger search when debounced query changes
  useEffect(() => {
    if (debouncedQuery && debouncedQuery.length >= minChars) {
      onSearch && onSearch(debouncedQuery);
    }
  }, [debouncedQuery, minChars, onSearch]);

  // Show suggestions when available
  useEffect(() => {
    if (suggestions.length > 0 && query.length >= minChars && showSuggestions) {
      setShowDropdown(true);
    } else {
      setShowDropdown(false);
    }
  }, [suggestions, query, minChars, showSuggestions]);

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        !inputRef.current.contains(event.target)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Keyboard navigation
  const handleKeyDown = (e) => {
    if (!showDropdown) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev < suggestions.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0) {
          handleSuggestionClick(suggestions[selectedIndex]);
        }
        break;
      case 'Escape':
        setShowDropdown(false);
        setSelectedIndex(-1);
        break;
      default:
        break;
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setQuery(typeof suggestion === 'string' ? suggestion : suggestion.name || '');
    setShowDropdown(false);
    setSelectedIndex(-1);
    onSuggestionClick && onSuggestionClick(suggestion);
  };

  const handleClear = () => {
    setQuery('');
    setShowDropdown(false);
    setSelectedIndex(-1);
    inputRef.current?.focus();
  };

  const sizes = {
    small: 'px-3 py-1.5 text-sm',
    medium: 'px-4 py-2 text-base',
    large: 'px-5 py-3 text-lg',
  };

  return (
    <div className={`relative ${fullWidth ? 'w-full' : ''} ${className}`}>
      {/* Search Input */}
      <div className="relative">
        {/* Search Icon */}
        {icon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        )}

        {/* Input */}
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className={`
            w-full border border-gray-300 rounded-lg
            focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500
            transition-all duration-200
            ${icon ? 'pl-10' : ''}
            ${query || loading ? 'pr-10' : ''}
            ${sizes[size]}
          `}
        />

        {/* Loading Spinner or Clear Button */}
        {loading ? (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <svg className="animate-spin h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
        ) : query ? (
          <button
            onClick={handleClear}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        ) : null}
      </div>

      {/* Suggestions Dropdown */}
      {showDropdown && suggestions.length > 0 && (
        <div
          ref={dropdownRef}
          className="absolute z-50 w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto"
        >
          {suggestions.map((suggestion, index) => (
            <button
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
              className={`
                w-full px-4 py-2 text-left hover:bg-teal-50 transition-colors
                ${index === selectedIndex ? 'bg-teal-50' : ''}
                ${index === 0 ? 'rounded-t-lg' : ''}
                ${index === suggestions.length - 1 ? 'rounded-b-lg' : 'border-b border-gray-100'}
              `}
            >
              {renderSuggestion ? (
                renderSuggestion(suggestion, query)
              ) : (
                <span className="text-gray-800">
                  {typeof suggestion === 'string' ? suggestion : suggestion.name || ''}
                </span>
              )}
            </button>
          ))}
        </div>
      )}

      {/* No Results */}
      {showDropdown && suggestions.length === 0 && query.length >= minChars && !loading && (
        <div className="absolute z-50 w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg p-4 text-center text-gray-500">
          No results found for "{query}"
        </div>
      )}
    </div>
  );
};

export default Search;