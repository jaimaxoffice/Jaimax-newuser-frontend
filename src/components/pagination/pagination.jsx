import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pages = Array.from({ length: totalPages }, (_, idx) => idx + 1);

  const handleClick = (page) => {
    if (page === currentPage) return;
    onPageChange(page);
  };

  const baseBtn =
    "px-3 py-1.5 rounded border text-sm transition-colors duration-150";
  const activeBtn = "bg-green-600 border-green-600 text-white font-semibold";
  const normalBtn =
    "bg-transparent border-white/30 text-white hover:bg-white/10";
  const disabledBtn = "opacity-50 cursor-not-allowed";

  const renderPageNumbers = () => {
    if (totalPages <= 5) {
      return pages.map((page) => (
        <button
          key={page}
          onClick={() => handleClick(page)}
          className={`${baseBtn} ${
            currentPage === page ? activeBtn : normalBtn
          }`}
        >
          {page}
        </button>
      ));
    }

    const startPage = Math.max(1, currentPage - 2);
    const endPage = Math.min(totalPages, startPage + 4);
    const nums = [];

    if (startPage > 1) {
      nums.push(
        <button
          key={1}
          onClick={() => handleClick(1)}
          className={`${baseBtn} ${normalBtn}`}
        >
          1
        </button>
      );
      if (startPage > 2) {
        nums.push(
          <span key="el-l" className="px-2 text-white select-none">
            ...
          </span>
        );
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      nums.push(
        <button
          key={i}
          onClick={() => handleClick(i)}
          className={`${baseBtn} ${
            currentPage === i ? activeBtn : normalBtn
          }`}
        >
          {i}
        </button>
      );
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        nums.push(
          <span key="el-r" className="px-2 text-white select-none">
            ...
          </span>
        );
      }
      nums.push(
        <button
          key={totalPages}
          onClick={() => handleClick(totalPages)}
          className={`${baseBtn} ${normalBtn}`}
        >
          {totalPages}
        </button>
      );
    }

    return nums;
  };

  return (
    <div className="flex justify-center items-center gap-2 flex-wrap pt-6">
      {/* Prev */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1 || totalPages === 0}
        className={`${baseBtn} ${normalBtn} disabled:${disabledBtn}`}
      >
        Prev
      </button>

      {/* Dynamic Page Numbers */}
      {renderPageNumbers()}

      {/* Next */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages || totalPages === 0}
        className={`${baseBtn} ${normalBtn} disabled:${disabledBtn}`}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
