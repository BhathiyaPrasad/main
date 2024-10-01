"use client";
import React, { useState } from "react";

// Mock data for out of stock items
const outOfStockData = [
  { itemCode: "0023", category: "Tire", qty: "25" },
  { itemCode: "0045", category: "Battery", qty: "50" },
  // Add more data as needed
];

const OutofStockAlert: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Adjust as needed

  const totalPages = Math.ceil(outOfStockData.length / itemsPerPage);
  const paginatedData = outOfStockData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  return (
    <div className="overflow-x-auto">
      {/* Add main body (table name and buttons) */}
      <table className="min-w-fit divide-y divide-gray-200 text-sm">
        <tbody className="bg-white divide-y divide-gray-200">
          <tr>
            <td className="px-4 py-2 whitespace-nowrap text-sm font-bold text-gray-700">
              Out of Stock Alert
            </td>
          </tr>
        </tbody>
      </table>

      {/* DataTable */}
      <table className="min-w-fit text-sm mt-4">
        <thead className="bg-white">
          <tr>
            <th
              scope="col"
              className="px-4 py-2 text-left text-xs font-medium text-gray-950 tracking-wider"
            >
              Item Code
            </th>
            <th
              scope="col"
              className="px-5 py-2 text-left text-xs font-medium text-gray-950 tracking-wider"
            >
              Main Category
            </th>
            <th
              scope="col"
              className="px-5 py-2 text-left text-xs font-medium text-gray-950 tracking-wider"
            >
              Qty of Now
            </th>
            <th
              scope="col"
              className="px-1 py-2 text-left text-xs font-medium text-gray-950 tracking-wider"
            ></th>
          </tr>
        </thead>
        <tbody className="bg-white min-w-fit">
          {paginatedData.map((item, index) => (
            <tr key={index}>
              <td className="px-4 py-1 whitespace-nowrap text-xs text-blue-500">
                {item.itemCode}
              </td>
              <td className="px-5 py-1 whitespace-nowrap text-xs text-gray-500">
                {item.category}
              </td>
              <td className="px-5 py-1 whitespace-nowrap text-xs text-gray-500">
                {item.qty}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="w-full flex justify-start items-center mt-4 space-x-4">
        <button
          onClick={handlePreviousPage}
          className={`px-4 py-2 rounded-md bg-gray-200 text-xs text-gray-500 shadow-sm hover:bg-gray-400 hover:text-white ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""}`}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className="text-xs text-gray-500">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          className={`px-4 py-2 rounded-md bg-gray-200 text-xs text-gray-500 shadow-sm hover:bg-gray-400 hover:text-white ${currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""}`}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default OutofStockAlert;
