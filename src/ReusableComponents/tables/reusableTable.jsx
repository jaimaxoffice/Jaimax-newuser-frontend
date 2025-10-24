import React from "react";

const ReusableTable = ({ columns, data, isLoading }) => {
  if (isLoading) return <p className="text-center py-4">Loading...</p>;

  return (
    <div className="overflow-x-auto mt-4 rounded-lg">
      <table className="w-full border-collapse rounded-lg">
        <thead>
          <tr style={{ backgroundColor: "#13b3a1" }}>
            {columns.map((col, index) => (
              <th key={index} className="p-3 text-left text-white text-sm font-semibold">
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
                  <td key={colIndex} className="p-3 text-sm text-gray-700">
                    {col.render ? col.render(row, rowIndex) : row[col.accessor]}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length} className="text-center py-4 text-gray-500">
                No data found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ReusableTable;
