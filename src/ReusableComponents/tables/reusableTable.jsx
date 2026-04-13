import React from "react";
import Loader from "../Loader/loader";

const ReusableTable = ({ columns, data, isLoading }) => {
  if (isLoading)
    return (
      <p className="text-center py-4">
        <Loader />
      </p>
    );

  return (
    <div className="rounded-lg overflow-auto scrollbar-none">
      <table className="w-full border-collapse rounded-lg">
        <thead>
          <tr style={{ backgroundColor: "#13b3a1" }}>
            {columns.map((col, index) => (
              <th
                key={index}
                className="p-3 text-center text-white text-xs font-semibold whitespace-nowrap"
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data?.length > 0 ? (
            data.map((row, rowIndex) => (
              <tr key={rowIndex} className="border-b hover:bg-gray-50">
                {columns.map((col, colIndex) => (
                  <td key={colIndex} className="p-3 text-xs text-black">
                    {col.render ? col.render(row, rowIndex) : row[col.accessor]}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length} className="py-10">
                <div className="flex flex-col items-center justify-center text-center px-4 py-6 bg-gray-50 rounded-lg mx-4 border border-dashed border-gray-200">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-12 w-12 text-gray-300 mb-3"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                    />
                  </svg>
                  <h3 className="text-lg font-medium text-gray-700 mb-1">
                    No data available
                  </h3>
                  <p className="text-sm text-gray-500">
                    Buy  jaimax coins or Change search criteria
                  </p>
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ReusableTable;