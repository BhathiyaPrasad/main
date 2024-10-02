"use client"; // Use client-side rendering as we will be using useState

import { faFilter, faSortAlphaUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import  {fetchCustomers} from '@/services/customerServices';
import { useEffect } from "react";

interface Customer {
  id:string,
  name:string,
  address:string,
  phone:string,
  email:string,
  description:string,
  createdAt:string,
  updatedAt:string
}


const CustTable: React.FC = () => {
  // State management
  const [customerData, setCustomerData] = useState<Customer[]>([]);
  const [sortColumn, setSortColumn] = useState<keyof  Customer | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3; // Items per page for pagination
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Sorting function
  const sortData = (column: keyof Customer) => {
    const direction = sortDirection === "asc" ? "desc" : "asc";
    const sortedData = [...customerData].sort((a, b) => {
      if (a[column] < b[column]) return direction === "asc" ? -1 : 1;
      if (a[column] > b[column]) return direction === "asc" ? 1 : -1;
      return 0;
    });
    setSortColumn(column);
    setSortDirection(direction);
    setCustomerData(sortedData); // Data remains immutable
  };

  // Pagination logic
  const totalPages = Math.ceil(customerData.length / itemsPerPage);
  const paginatedData = customerData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const handleNextPage = () => {
    setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev));
  };

  const handlePreviousPage = () => {
    setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev));
  };

  useEffect(() => {
    const fetchCustomersData = async () => {
      try {
        const response = await fetchCustomers(); // Correctly invoke the fetchInvoices function
        const sortedInvoices = response.sort((a: Customer, b: Customer) => a.id.localeCompare(b.id));
        setCustomerData(sortedInvoices); // Assuming the API response contains the correct data
      } catch (err) {
        setError('Failed to fetch Customers.');
      } finally {
        setLoading(false);
      }
    };

    fetchCustomersData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="overflow-x-auto">
      {/* Add main body (table name and buttons) */}
      <table className="min-w-fit divide-y divide-gray-400 text-sm">
        <tbody className="bg-gray-100 divide-y divide-gray-200">
          <tr>
            <td className="px-2 py-2 whitespace-nowrap text-sm font-bold text-gray-700">
              Customer Table
            </td>
            <td className="px-12 py-2 whitespace-nowrap text-sm text-gray-500"></td>
            <td className="px-40 py-2 whitespace-nowrap text-right text-sm font-medium flex items-end space-x-2">
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
              className="px-4 py-2 text-left text-xs font-medium text-gray-950 tracking-wider cursor-pointer"
              onClick={() => sortData("name")}
            >
              Cus. Name
            </th>
            <th
              scope="col"
              className="px-4 py-2 text-left text-xs font-medium text-gray-950 tracking-wider cursor-pointer"
              onClick={() => sortData("id")}
            >
              Code
            </th>
            <th
              scope="col"
              className="px-4 py-2 text-left text-xs font-medium text-gray-950 tracking-wider cursor-pointer"
              onClick={() => sortData("phone")}
            >
              Purchases Amount
            </th>
            <th
              scope="col"
              className="px-1 py-2 text-left text-xs font-medium text-gray-950 tracking-wider"
            ></th>
          </tr>
        </thead>
        <tbody className="bg-white min-w-fit">
          {paginatedData.map((customer, index) => (
            <tr key={index}>
              <td className="px-4 py-1 whitespace-nowrap text-xs text-gray-500">
                {customer.name}
              </td>
              <td className="px-4 py-1 whitespace-nowrap text-xs text-gray-500">
                {customer.id}
              </td>
              <td className="px-4 py-1 whitespace-nowrap text-xs text-gray-500">
                0
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

export default CustTable;
