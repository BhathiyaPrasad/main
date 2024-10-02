"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter, faSortAlphaUp } from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";

// Mock data for items
const initialItemData = [
  {
    code: "0225",
    category: "Tire",
    subCategory: "Car",
    brand: "BMW",
    size: "15 1/2",
  },
  {
    code: "0227",
    category: "Battery",
    subCategory: "Bus",
    brand: "AMARON",
    size: "45amp",
  },
  // Add more items as needed
];

const ItmTable: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const totalPages = Math.ceil(initialItemData.length / itemsPerPage);
  const paginatedData = initialItemData.slice(
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
      {/* Main body with table name and buttons */}
      <table className="min-w-fit divide-y divide-gray-200 text-sm">
        <tbody className="bg-gray-100 divide-y divide-gray-200">
          <tr>
            <td className="px-2 py-2 whitespace-nowrap text-sm font-bold text-gray-700">
              Items Table
            </td>
            <td className="px-14 py-2 whitespace-nowrap text-sm text-gray-500"></td>
            <td className="px-44 py-2 whitespace-nowrap text-right text-sm font-medium flex items-end space-x-2">
              <button className="flex items-center rounded-lg bg-gray-200 px-3 py-1 text-xs text-gray-500 shadow-sm hover:bg-gray-400 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
                <FontAwesomeIcon
                  icon={faSortAlphaUp}
                  className="h-3 w-3 mr-1"
                />
                <span>Sort</span>
              </button>
              <button className="flex items-center rounded-lg bg-gray-200 px-3 py-1 text-xs text-gray-500 shadow-sm hover:bg-gray-400 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
                <FontAwesomeIcon icon={faFilter} className="h-3 w-3 mr-1" />
                <span>Filter</span>
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      {/* DataTable */}
      <table className="min-w-fit text-sm mt-4">
        <thead className="bg-sky-100">
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
              Sub Category
            </th>
            <th
              scope="col"
              className="px-5 py-2 text-left text-xs font-medium text-gray-950 tracking-wider"
            >
              Brand
            </th>
            <th
              scope="col"
              className="px-5 py-2 text-left text-xs font-medium text-gray-950 tracking-wider"
            >
              Size
            </th>
          </tr>
        </thead>
        <tbody className="bg-white min-w-fit">
          {paginatedData.map((item) => (
            <tr key={item.code}>
              <td className="px-4 py-1 whitespace-nowrap text-xs text-gray-500">
                {item.code}
              </td>
              <td className="px-5 py-1 whitespace-nowrap text-xs text-gray-500">
                {item.category}
              </td>
              <td className="px-5 py-1 whitespace-nowrap text-xs text-gray-500">
                {item.subCategory}
              </td>
              <td className="px-5 py-1 whitespace-nowrap text-xs text-gray-500">
                {item.brand}
              </td>
              <td className="px-5 py-1 whitespace-nowrap text-xs text-gray-500">
                {item.size}
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

export default ItmTable;
