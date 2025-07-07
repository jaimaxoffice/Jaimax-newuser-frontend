import React, { useState, useEffect } from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const [isMobile, setIsMobile] = useState(false);
  
  // Handle responsive breakpoint
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const pages = Array.from({ length: totalPages }, (_, idx) => idx + 1);

  const handleClick = (page) => {
    if (page === currentPage) return;
    onPageChange(page);
  };

  const baseBtn = `
    px-2 py-1 rounded-lg text-xs font-medium transition-all duration-200 
    hover:scale-105 focus:outline-none shadow-sm
    sm:px-3 sm:py-2 sm:text-sm
  `;
  
  const activeBtn = `
    bg-gradient-to-r from-teal-500 to-teal-600 text-white shadow-md 
    hover:from-teal-600 hover:to-teal-700
  `;
  
  const normalBtn = `
    bg-white text-teal-700 border border-teal-200 
    hover:bg-teal-50 hover:border-teal-300
  `;
  
  const disabledBtn = `
    opacity-40 cursor-not-allowed hover:scale-100 
    bg-gray-100 text-gray-400 border-gray-200
  `;

  const navBtn = `
    ${baseBtn} ${normalBtn} px-2 font-medium text-xs
    sm:px-3 sm:text-sm
  `;

  const renderPageNumbers = () => {
    // Responsive page count
    const maxVisiblePages = isMobile ? 3 : 5;
    
    if (totalPages <= maxVisiblePages) {
      return pages.map((page) => (
        <button
          key={page}
          onClick={() => handleClick(page)}
          className={`${baseBtn} ${
            currentPage === page ? activeBtn : normalBtn
          } min-w-[32px] sm:min-w-[40px]`}
        >
          {page}
        </button>
      ));
    }

    const startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    const nums = [];

    // Always show first page if not in range
    if (startPage > 1) {
      nums.push(
        <button
          key={1}
          onClick={() => handleClick(1)}
          className={`${baseBtn} ${currentPage === 1 ? activeBtn : normalBtn} min-w-[32px] sm:min-w-[40px]`}
        >
          1
        </button>
      );
      if (startPage > 2) {
        nums.push(
          <span 
            key="ellipsis-left" 
            className="px-1 py-2 text-teal-400 select-none font-bold text-sm sm:px-2 sm:text-lg"
          >
            ⋯
          </span>
        );
      }
    }

    // Show page numbers in range
    for (let i = startPage; i <= endPage; i++) {
      nums.push(
        <button
          key={i}
          onClick={() => handleClick(i)}
          className={`${baseBtn} ${
            currentPage === i ? activeBtn : normalBtn
          } min-w-[32px] sm:min-w-[40px]`}
        >
          {i}
        </button>
      );
    }

    // Always show last page if not in range
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        nums.push(
          <span 
            key="ellipsis-right" 
            className="px-1 py-2 text-teal-400 select-none font-bold text-sm sm:px-2 sm:text-lg"
          >
            ⋯
          </span>
        );
      }
      nums.push(
        <button
          key={totalPages}
          onClick={() => handleClick(totalPages)}
          className={`${baseBtn} ${currentPage === totalPages ? activeBtn : normalBtn} min-w-[32px] sm:min-w-[40px]`}
        >
          {totalPages}
        </button>
      );
    }

    return nums;
  };

  return (
    <div className="flex justify-center items-center w-full px-2 py-4">
      <div className="flex items-center gap-1 sm:gap-2 px-2 py-2 sm:px-4 sm:py-3 bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border border-teal-100/50 max-w-full overflow-hidden">
        {/* Previous Button */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1 || totalPages === 0}
          className={`${navBtn} ${
            currentPage === 1 || totalPages === 0 ? disabledBtn : ''
          } flex items-center gap-1 shrink-0`}
        >
          <svg 
            className="w-3 h-3 sm:w-4 sm:h-4" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M15 19l-7-7 7-7" 
            />
          </svg>
          <span className="hidden sm:inline">Prev</span>
        </button>

        {/* Page Numbers Container */}
        <div className="flex items-center gap-1 px-1 overflow-x-auto scrollbar-hide max-w-[200px] sm:max-w-none">
          {renderPageNumbers()}
        </div>

        {/* Next Button */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages || totalPages === 0}
          className={`${navBtn} ${
            currentPage === totalPages || totalPages === 0 ? disabledBtn : ''
          } flex items-center gap-1 shrink-0`}
        >
          <span className="hidden sm:inline">Next</span>
          <svg 
            className="w-3 h-3 sm:w-4 sm:h-4" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M9 5l7 7-7 7" 
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Pagination;