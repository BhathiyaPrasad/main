"use client";

import React, { useState } from "react";

// Mock data for credit management
const initialCreditData = [
  {
    invoiceNo: "IVN 1245",
    name: "Hasith",
    amount: "20,000",
    dueDate: "2024-08-14",
  },
  {
    invoiceNo: "INV 2345",
    name: "Isuru",
    amount: "10,000",
    dueDate: "2024-08-10",
  },
  // Add more data as needed
];

const CreditTable: React.FC = () => {
  const [query, setQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const filteredData = initialCreditData.filter(
    (item) =>
      item.name.toLowerCase().includes(query.toLowerCase()) ||
      item.invoiceNo.toLowerCase().includes(query.toLowerCase()),
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setCurrentPage(1); // Reset to the first page when filtering
  };

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
      <div className="px-4 py-2">
        <h1 className="flex space-x-1 text-sm text-gray-700 font-bold">
          <span>Credit Table</span>
        </h1>
      </div>
      <div className="flex items-start justify-start px-2 py-2">
        <input
          type="text"
          value={query}
          onChange={handleChange}
          placeholder="Search by Name, Invoice No"
          className="w-60 h-8 px-2 py-2 border text-sm text-gray-400 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      {/* DataTable */}
      <table className="min-w-fit text-sm">
        <thead className="bg-sky-100">
          <tr>
            <th
              scope="col"
              className="px-4 py-2 text-left text-xs font-medium text-gray-950 tracking-wider"
            >
              Invoice No
            </th>
            <th
              scope="col"
              className="px-4 py-2 text-left text-xs font-medium text-gray-950 tracking-wider"
            >
              Name
            </th>
            <th
              scope="col"
              className="px-4 py-2 text-left text-xs font-medium text-gray-950 tracking-wider"
            >
              Credit Amount(Rs.)
            </th>
            <th
              scope="col"
              className="px-4 py-2 text-left text-xs font-medium text-gray-950 tracking-wider"
            >
              Due Date
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
              <td className="px-4 py-1 whitespace-nowrap text-xs text-gray-500">
                {item.invoiceNo}
              </td>
              <td className="px-4 py-1 whitespace-nowrap text-xs text-gray-500">
                {item.name}
              </td>
              <td className="px-4 py-1 whitespace-nowrap text-xs text-gray-500">
                {item.amount}
              </td>
              <td className="px-4 py-1 whitespace-nowrap text-xs text-gray-500">
                {item.dueDate}
              </td>
              <td className="px-4 py-1 whitespace-nowrap text-right text-xs font-medium flex space-x-1">
                <button className="rounded-md bg-blue-500 px-3 py-1 text-xs text-white shadow-sm hover:bg-blue-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
                  Clear Credit
                </button>
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

export default CreditTable;
