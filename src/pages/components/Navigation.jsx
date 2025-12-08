// Navigation.js - Updated for section navigation
import React from 'react';

const Navigation = ({ totalSections, activeSection, navigateToSection }) => {
  return (
    <div className="fixed right-8 top-1/2 transform -translate-y-1/2 z-50">
      <div className="flex flex-col items-center space-y-4">
        {Array.from({ length: totalSections }).map((_, index) => (
          <button
            key={index}
            onClick={() => navigateToSection(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              activeSection === index 
                ? 'w-4 h-4 bg-[#b8cc26]' 
                : 'bg-white bg-opacity-60 hover:bg-opacity-100'
            }`}
            aria-label={`Navigate to section ${index + 1}`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default Navigation;