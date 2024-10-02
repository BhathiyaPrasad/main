"use client"; // Ensure this is a Client Component

import React, { useState } from "react";
import { faMailBulk } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Mock data for salary management
const initialSalaryData = [
  {
    date: "2024-04-02",
    empId: "001",
    name: "Dasun Daluwaththa",
    designation: "Manager",
    salary: "60,000",
  },
  {
    date: "2024-04-03",
    empId: "002",
    name: "Hasith Jayantha",
    designation: "Assistent",
    salary: "40,000",
  },
  // Add more data as needed
];

const SalaryManagTable = () => {
  const [data, setData] = useState(initialSalaryData);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const paginatedData = data.slice(
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
      <div className="px-4 py-3">
        <h1 className="flex space-x-1 text-sm text-gray-700 font-bold">
          <FontAwesomeIcon icon={faMailBulk} className="h-4 w-5 mr-1" />
          <span>Salary Management</span>
        </h1>
      </div>
      {/* DataTable */}
      <table className="min-w-fit text-sm">
        <thead className="bg-sky-100">
          <tr>
            <th
              scope="col"
              className="px-4 py-2 text-left text-xs font-medium text-gray-950 tracking-wider"
            >
              Date
            </th>
            <th
              scope="col"
              className="px-4 py-2 text-left text-xs font-medium text-gray-950 tracking-wider"
            >
              Emp. ID
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
              Designation
            </th>
            <th
              scope="col"
              className="px-4 py-2 text-left text-xs font-medium text-gray-950 tracking-wider"
            >
              Salary(Rs.)
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
                {item.date}
              </td>
              <td className="px-4 py-1 whitespace-nowrap text-xs text-gray-500">
                {item.empId}
              </td>
              <td className="px-4 py-1 whitespace-nowrap text-xs text-gray-500">
                {item.name}
              </td>
              <td className="px-4 py-1 whitespace-nowrap text-xs text-gray-500">
                {item.designation}
              </td>
              <td className="px-4 py-1 whitespace-nowrap text-xs text-gray-500">
                {item.salary}
              </td>
              <td className="px-4 py-1 whitespace-nowrap text-right text-xs font-medium flex space-x-1">
                <button className="rounded-md bg-blue-500 px-3 py-1 text-xs text-white shadow-sm hover:bg-blue-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
                  Get Pay Sheet
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

export default SalaryManagTable;
