"use client"; // Use client-side rendering

import React, { useState } from "react";
import { faUserAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Mock data for employee details
const initialEmployeeData = [
  {
    date: "2024-04-02",
    empId: "001",
    name: "Wihaga Senarathna",
    designation: "Manager",
  },
  {
    date: "2024-05-03",
    empId: "002",
    name: "Gyathri Panditharathna",
    designation: "Assistern",
  },
  // Add more data as needed
];

const EmpDetailsTable = () => {
  const [data, setData] = useState(initialEmployeeData);
  const [sortColumn, setSortColumn] = useState<
    keyof (typeof initialEmployeeData)[0] | null
  >(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const sortData = (column: keyof (typeof initialEmployeeData)[0]) => {
    const direction =
      sortColumn === column
        ? sortDirection === "asc"
          ? "desc"
          : "asc"
        : "asc";
    const sortedData = [...data].sort((a, b) => {
      if (a[column] < b[column]) return direction === "asc" ? -1 : 1;
      if (a[column] > b[column]) return direction === "asc" ? 1 : -1;
      return 0;
    });
    setSortColumn(column);
    setSortDirection(direction);
    setData(sortedData);
  };

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
    <div className="overflow-x-auto">
      <div className="px-4 py-3">
        <h1 className="flex space-x-1 text-sm text-gray-700 font-bold">
          <FontAwesomeIcon icon={faUserAlt} className="h-4 w-5 mr-1" />
          <span>Employer Details</span>
        </h1>
      </div>
      {/* DataTable */}
      <table className="min-w-fit text-sm">
        <thead className="bg-sky-100">
          <tr>
            <th
              scope="col"
              className="px-4 py-2 text-left text-xs font-medium text-gray-950 tracking-wider cursor-pointer"
              onClick={() => sortData("date")}
            >
              Date
            </th>
            <th
              scope="col"
              className="px-5 py-2 text-left text-xs font-medium text-gray-950 tracking-wider cursor-pointer"
              onClick={() => sortData("empId")}
            >
              Emp. ID
            </th>
            <th
              scope="col"
              className="px-10 py-2 text-left text-xs font-medium text-gray-950 tracking-wider cursor-pointer"
              onClick={() => sortData("name")}
            >
              Name
            </th>
            <th
              scope="col"
              className="px-5 py-2 text-left text-xs font-medium text-gray-950 tracking-wider cursor-pointer"
              onClick={() => sortData("designation")}
            >
              Designation
            </th>
          </tr>
        </thead>
        <tbody className="bg-white min-w-fit">
          {paginatedData.map((item, index) => (
            <tr key={index}>
              <td className="px-4 py-1 whitespace-nowrap text-xs text-gray-500">
                {item.date}
              </td>
              <td className="px-5 py-1 whitespace-nowrap text-xs text-gray-500">
                {item.empId}
              </td>
              <td className="px-10 py-1 whitespace-nowrap text-xs text-gray-500">
                {item.name}
              </td>
              <td className="px-5 py-1 whitespace-nowrap text-xs text-gray-500">
                {item.designation}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="w-full flex justify-start items-center mt-4 space-x-4">
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

export default EmpDetailsTable;
