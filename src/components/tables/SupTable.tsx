"use client"; // Use client-side rendering

import { faFilter, faSortAlphaUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect } from "react";
import { fetchSuppliers } from "@/services/supplierService"; // Import the supplier API service

interface Supplier {
  name: string;
  code: string;
  id: string;
}

const SupTable = () => {
  const [data, setData] = useState<Supplier[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [sortColumn, setSortColumn] = useState<keyof Supplier | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3; // Items per page for pagination

  // Fetch supplier data from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchSuppliers(); // Fetch suppliers from the API
        setData(response);
      } catch (error) {
        setError("Failed to fetch suppliers.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Sorting function
  const sortData = (column: keyof Supplier) => {
    const direction = sortDirection === "asc" ? "desc" : "asc";
    const sortedData = [...data].sort((a, b) => {
      if (a[column] < b[column]) return direction === "asc" ? -1 : 1;
      if (a[column] > b[column]) return direction === "asc" ? 1 : -1;
      return 0;
    });
    setSortColumn(column);
    setSortDirection(direction);
    setData(sortedData);
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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="overflow-x-auto">
      {/* Add main body (table name and buttons) */}
      <table className="min-w-fit divide-y divide-gray-200 text-sm">
        <tbody className="bg-gray-100 divide-y divide-gray-200">
          <tr>
            <td className="px-2 py-2 whitespace-nowrap text-sm font-bold text-gray-700">
              Supplier Table
            </td>
            <td className="px-8 py-2 whitespace-nowrap text-sm text-gray-500"></td>
            <td className="px-36 py-2 whitespace-nowrap text-right text-sm font-medium flex items-end space-x-2">
              <button
                onClick={() => sortData("name")}
                className="flex items-center rounded-lg bg-gray-200 px-3 py-1 text-xs text-gray-500 shadow-sm hover:bg-gray-400 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                <FontAwesomeIcon
                  icon={faSortAlphaUp}
                  className="h-3 w-3 mr-1"
                />
                <span>Sort by Name</span>
              </button>
              <button
                onClick={() => sortData("code")}
                className="flex items-center rounded-lg bg-gray-200 px-3 py-1 text-xs text-gray-500 shadow-sm hover:bg-gray-400 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                <FontAwesomeIcon icon={faFilter} className="h-3 w-3 mr-1" />
                <span>Sort by Code</span>
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
              onClick={() => sortData("name")}
            >
              Supplier Name
            </th>
            <th
              scope="col"
              className="px-10 py-2 text-left text-xs font-medium text-gray-950 tracking-wider cursor-pointer"
              onClick={() => sortData("code")}
            >
              Code
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
                {item.name}
              </td>
              <td className="px-10 py-1 whitespace-nowrap text-xs text-gray-500">
                {item.id}
              </td>
              <td className="px-4 py-1 whitespace-nowrap text-right text-xs font-medium flex space-x-1">
                <button className="rounded-md bg-blue-500 px-3 py-1 text-xs text-white shadow-sm hover:bg-blue-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
                  See Details
                </button>
                <button className="rounded-md bg-white px-3 py-1 text-xs text-blue-500 border border-blue-500 shadow-sm hover:bg-gray-100 focus:outline-none focus:ring-3 focus:ring-blue-500">
                  Edit Details
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
          className={`px-4 py-2 rounded-lg bg-gray-200 text-xs text-gray-500 shadow-sm hover:bg-gray-400 hover:text-white ${
            currentPage === 1 && "opacity-50 cursor-not-allowed"
          }`}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className="text-xs text-gray-500">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          className={`px-4 py-2 rounded-lg bg-gray-200 text-xs text-gray-500 shadow-sm hover:bg-gray-400 hover:text-white ${
            currentPage === totalPages && "opacity-50 cursor-not-allowed"
          }`}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default SupTable;
