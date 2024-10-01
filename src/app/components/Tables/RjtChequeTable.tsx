"use client";

import React, { useState } from "react";

// Mock data for rejected cheques
const initialChequeData = [
  {
    invoiceNo: "IVN 1245",
    name: "Hasith",
    amount: "20,000",
    rejectedDate: "2024-08-14",
  },
  {
    invoiceNo: "INV 2345",
    name: "Isuru",
    amount: "10,000",
    rejectedDate: "2024-08-10",
  },
  // Add more data as needed
];

const RjtChequeTable: React.FC = () => {
  const [toggleStates, setToggleStates] = useState<boolean[]>(
    Array(initialChequeData.length).fill(false),
  );
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const totalPages = Math.ceil(initialChequeData.length / itemsPerPage);
  const paginatedData = initialChequeData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const handleToggle = (index: number) => {
    setToggleStates((prevStates) =>
      prevStates.map((state, i) => (i === index ? !state : state)),
    );
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
        <h1 className="flex space-x-1 text-sm text-gray-700">
          <span>Rejected Cheques Table</span>
        </h1>
      </div>
      {/* DataTable */}
      <table className="min-w-fit text-sm">
        <thead className="bg-red-200">
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
              Amount(Rs.)
            </th>
            <th
              scope="col"
              className="px-3 py-2 text-left text-xs font-medium text-gray-950 tracking-wider"
            >
              Rejected Date
            </th>
            <th
              scope="col"
              className="px-5 py-2 text-left text-xs font-medium text-gray-950 tracking-wider"
            >
              Clear Cheque
            </th>
          </tr>
        </thead>
        <tbody className="bg-white min-w-fit">
          {paginatedData.map((item, rowIndex) => (
            <tr key={item.invoiceNo}>
              <td className="px-4 py-1 whitespace-nowrap text-xs text-gray-500">
                {item.invoiceNo}
              </td>
              <td className="px-4 py-1 whitespace-nowrap text-xs text-gray-500">
                {item.name}
              </td>
              <td className="px-4 py-1 whitespace-nowrap text-xs text-gray-500">
                {item.amount}
              </td>
              <td className="px-3 py-1 whitespace-nowrap text-xs text-gray-500">
                {item.rejectedDate}
              </td>
              <td className="px-10 py-1 whitespace-nowrap text-center text-xs font-medium flex items-center justify-center">
                <button
                  onClick={() =>
                    handleToggle((currentPage - 1) * itemsPerPage + rowIndex)
                  }
                  className={`relative w-12 h-6 flex rounded-full p-1 transition-colors duration-300
                    ${toggleStates[(currentPage - 1) * itemsPerPage + rowIndex] ? "bg-green-500" : "bg-gray-300"}`}
                >
                  <span
                    className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-300
                      ${toggleStates[(currentPage - 1) * itemsPerPage + rowIndex] ? "translate-x-6" : "translate-x-0"}`}
                  />
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

export default RjtChequeTable;
