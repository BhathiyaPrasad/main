"use client"; // Use client-side rendering

import { faCalendarCheck, faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { AiFillCheckSquare, AiFillCloseSquare } from "react-icons/ai";

// Mock data for attendance records
const initialAttendanceData = [
  {
    date: "2024-04-02",
    empId: "001",
    name: "Dasun Daluwaththa",
    designation: "Manager",
    present: false,
    absent: true,
    startTime: "-",
    endTime: "-",
  },
  {
    date: "2024-04-02",
    empId: "002",
    name: "Amith Senanayake",
    designation: "Assistant Manager",
    present: true,
    absent: false,
    startTime: "08:00AM",
    endTime: "05:00PM",
  },
  // Add more data as needed
];

const AttendanceTable = () => {
  const [data, setData] = useState(initialAttendanceData);
  const [sortColumn, setSortColumn] = useState<
    keyof (typeof initialAttendanceData)[0] | null
  >(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const sortData = (column: keyof (typeof initialAttendanceData)[0]) => {
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
      <table className="min-w-fit divide-y divide-gray-200 text-sm">
        <tbody className="divide-y divide-gray-200">
          <tr>
            <td className="px-4 py-2 whitespace-nowrap text-sm font-bold text-gray-700 flex space-x-1">
              <FontAwesomeIcon
                icon={faCalendarCheck}
                className="h-4 w-5 mr-1"
              />
              <span>Attendance Mark</span>
            </td>
            <td className="px-36 py-2 whitespace-nowrap text-sm text-gray-500"></td>
            <td className="px-60 py-2 whitespace-nowrap text-right text-sm font-medium flex items-end space-x-3">
              <button className="flex items-center rounded-md bg-blue-500 px-3 py-1 text-xs text-white shadow-sm hover:bg-blue-600 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
                <span className="mr-1">Edit Sheet</span>
                <FontAwesomeIcon icon={faEdit} className="h-3 w-3" />
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
              className="px-4 py-2 text-left text-xs font-medium text-gray-950 tracking-wider cursor-pointer"
              onClick={() => sortData("date")}
            >
              Date
            </th>
            <th
              scope="col"
              className="px-4 py-2 text-left text-xs font-medium text-gray-950 tracking-wider cursor-pointer"
              onClick={() => sortData("empId")}
            >
              Emp. ID
            </th>
            <th
              scope="col"
              className="px-4 py-2 text-left text-xs font-medium text-gray-950 tracking-wider cursor-pointer"
              onClick={() => sortData("name")}
            >
              Name
            </th>
            <th
              scope="col"
              className="px-4 py-2 text-left text-xs font-medium text-gray-950 tracking-wider cursor-pointer"
              onClick={() => sortData("designation")}
            >
              Designation
            </th>
            <th
              scope="col"
              className="px-4 py-2 text-left text-xs font-medium text-gray-950 tracking-wider cursor-pointer"
              onClick={() => sortData("present")}
            >
              Present
            </th>
            <th
              scope="col"
              className="px-4 py-2 text-left text-xs font-medium text-gray-950 tracking-wider cursor-pointer"
              onClick={() => sortData("absent")}
            >
              Absent
            </th>
            <th
              scope="col"
              className="px-4 py-2 text-left text-xs font-medium text-gray-950 tracking-wider"
            >
              Start Time
            </th>
            <th
              scope="col"
              className="px-4 py-2 text-left text-xs font-medium text-gray-950 tracking-wider"
            >
              End Time
            </th>
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
                {item.present ? (
                  <AiFillCheckSquare className="text-green-500 h-7 w-10" />
                ) : (
                  <AiFillCloseSquare className="text-red-500 h-7 w-10" />
                )}
              </td>
              <td className="px-4 py-1 whitespace-nowrap text-xs text-gray-500">
                {item.absent ? (
                  <AiFillCheckSquare className="text-green-500 h-7 w-10" />
                ) : (
                  <AiFillCloseSquare className="text-red-500 h-7 w-10" />
                )}
              </td>
              <td className="px-4 py-1 whitespace-nowrap text-xs text-gray-500">
                {item.startTime}
              </td>
              <td className="px-4 py-1 whitespace-nowrap text-xs text-gray-500">
                {item.endTime}
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

export default AttendanceTable;
