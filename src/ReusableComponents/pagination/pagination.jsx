import React, { useState, useEffect } from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  if (totalPages <= 1) return null;

  const handleClick = (page) => {
    if (page === currentPage || page < 1 || page > totalPages) return;
    onPageChange(page);
  };

  const renderPageNumbers = () => {
    const maxVisiblePages = isMobile ? 3 : 5;
    const startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    const nums = [];

    if (startPage > 1) {
      nums.push(
        <button
          key={1}
          onClick={() => handleClick(1)}
          className="w-10 h-10 rounded-full text-sm font-medium text-teal-600 hover:bg-teal-50 transition-all"
        >
          1
        </button>
      );
      if (startPage > 2) {
        nums.push(
          <span key="el" className="text-teal-300 px-1">•••</span>
        );
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      nums.push(
        <button
          key={i}
          onClick={() => handleClick(i)}
          className={`
            w-10 h-10 rounded-full text-sm font-semibold transition-all duration-200
            ${
              currentPage === i
                ? "bg-teal-500 text-white shadow-lg shadow-teal-500/30"
                : "text-teal-600 hover:bg-teal-50"
            }
          `}
        >
          {i}
        </button>
      );
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        nums.push(
          <span key="er" className="text-teal-300 px-1">•••</span>
        );
      }
      nums.push(
        <button
          key={totalPages}
          onClick={() => handleClick(totalPages)}
          className="w-10 h-10 rounded-full text-sm font-medium text-teal-600 hover:bg-teal-50 transition-all"
        >
          {totalPages}
        </button>
      );
    }

    return nums;
  };

  return (
    <nav className="flex justify-center items-center w-full py-6" aria-label="Pagination">
      <div className="flex items-center gap-1 p-2 bg-white rounded-full shadow-lg shadow-teal-100/50 border border-teal-100">
        {/* Previous */}
        <button
          onClick={() => handleClick(currentPage - 1)}
          disabled={currentPage === 1}
          className={`
            flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all
            ${
              currentPage === 1
                ? "text-teal-200 cursor-not-allowed"
                : "text-teal-600 hover:bg-teal-500 hover:text-white"
            }
          `}
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span className="hidden sm:inline">Prev</span>
        </button>

        <div className="flex items-center gap-1">{renderPageNumbers()}</div>

        {/* Next */}
        <button
          onClick={() => handleClick(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`
            flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all
            ${
              currentPage === totalPages
                ? "text-teal-200 cursor-not-allowed"
                : "text-teal-600 hover:bg-teal-500 hover:text-white"
            }
          `}
        >
          <span className="hidden sm:inline">Next</span>
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </nav>
  );
};

export default Pagination;