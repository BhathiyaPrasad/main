"use client"; // Add this at the top

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter, faSortAlphaUp } from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";

// Mock data (kept immutable for functional programming)
const initialExpensesData = [
  { grnNo: "GRN025", supplier: "New Line Supplier", qty: 25, amount: 25000 },
  { grnNo: "GRN026", supplier: "New Line-2 Supplier", qty: 30, amount: 45000 },
  { grnNo: "GRN027", supplier: "Supplier 3", qty: 20, amount: 20000 },
  { grnNo: "GRN028", supplier: "Supplier 4", qty: 10, amount: 10000 },
  // Add more items as needed
];

const ExpenTable = () => {
  // State management
  const [data, setData] = useState(initialExpensesData);
  const [sortColumn, setSortColumn] = useState<
    keyof (typeof initialExpensesData)[0] | null
  >(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  // Function to handle sorting
  const sortData = (column: keyof (typeof initialExpensesData)[0]) => {
    const direction = sortDirection === "asc" ? "desc" : "asc";
    const sortedData = [...data].sort((a, b) => {
      if (a[column] < b[column]) return direction === "asc" ? -1 : 1;
      if (a[column] > b[column]) return direction === "asc" ? 1 : -1;
      return 0;
    });

    setSortColumn(column);
    setSortDirection(direction);
    setData(sortedData); // Data remains immutable, creating a new array
  };

  // Pagination logic
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const paginatedData = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const handleNextPage = () => {
    setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev));
  };

  const handlePreviousPage = () => {
    setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev));
  };

  return (
    <div className="overflow-x-auto w-fit">
      {/* Main body with table name and buttons */}
      <table className="min-w-fit divide-y divide-gray-200 text-sm">
        <tbody className="bg-gray-100 divide-y divide-gray-200">
          <tr>
            <td className="px-2 py-2 whitespace-nowrap text-sm font-bold text-gray-700">
              Expenses Table
            </td>
            <td className="px-7 py-2 whitespace-nowrap text-sm text-gray-500"></td>
            <td className="px-36 py-2 whitespace-nowrap text-right text-sm font-medium flex items-end space-x-2">
              <button
                onClick={() => sortData("grnNo")}
                className="flex items-center rounded-lg bg-gray-200 px-3 py-1 text-xs text-gray-500 shadow-sm hover:bg-gray-400 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                <FontAwesomeIcon
                  icon={faSortAlphaUp}
                  className="h-3 w-3 mr-1"
                />
                <span>Sort by GRN</span>
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
      <table className="min-w-fit text-sm">
        <thead className="bg-sky-100">
          <tr>
            <th
              scope="col"
              onClick={() => sortData("grnNo")}
              className="px-4 py-2 text-left text-xs font-medium text-gray-950 tracking-wider cursor-pointer"
            >
              GRN No
            </th>
            <th
              scope="col"
              onClick={() => sortData("supplier")}
              className="px-5 py-2 text-left text-xs font-medium text-gray-950 tracking-wider cursor-pointer"
            >
              Supplier Name
            </th>
            <th
              scope="col"
              onClick={() => sortData("qty")}
              className="px-10 py-2 text-left text-xs font-medium text-gray-950 tracking-wider cursor-pointer"
            >
              Qty
            </th>
            <th
              scope="col"
              onClick={() => sortData("amount")}
              className="px-5 py-2 text-left text-xs font-medium text-gray-950 tracking-wider cursor-pointer"
            >
              Amount (Rs.)
            </th>
          </tr>
        </thead>
        <tbody className="bg-white min-w-fit">
          {paginatedData.map((item, index) => (
            <tr key={index}>
              <td className="px-4 py-1 whitespace-nowrap text-xs text-blue-400">
                {item.grnNo}
              </td>
              <td className="px-5 py-1 whitespace-nowrap text-xs text-gray-500">
                {item.supplier}
              </td>
              <td className="px-10 py-1 whitespace-nowrap text-xs text-gray-500">
                {item.qty}
              </td>
              <td className="px-5 py-1 whitespace-nowrap text-xs text-gray-500">
                {item.amount}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="w-fit flex justify-start items-center mt-4 space-x-4">
        <button
          onClick={handlePreviousPage}
          className={`px-4 py-2 rounded-lg bg-gray-200 text-xs text-gray-500 shadow-sm hover:bg-gray-400 hover:text-white ${currentPage === 1 && "opacity-50 cursor-not-allowed"}`}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className="text-xs text-gray-500">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          className={`px-4 py-2 rounded-lg bg-gray-200 text-xs text-gray-500 shadow-sm hover:bg-gray-400 hover:text-white ${currentPage === totalPages && "opacity-50 cursor-not-allowed"}`}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ExpenTable;
