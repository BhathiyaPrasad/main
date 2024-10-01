"use client"; // Use client-side rendering

import { faFilter, faSortAlphaUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect } from "react";
import { fetchGrn } from "@/services/grnService"; // Import the GRN API service

interface Grn {
  id: string;
  supplierName: string;
  grnCode: string;
  date: string;
  note: string;
  grnNo: string;
  rep: {
    supplier: {
      name: string;
    };
  }; // Ensure rep is an object with supplier
  qty: string;
  amount: number;
  createdAt: string;
  stock: Array<{
    id: string;
    discountType: string;
    maxDiscount: string;
    qty: number;
    buyingPrice: string;
    sellingPrice: string;
  }>;
  supplier: { name: string }[];
}

const GrnTable = () => {
  const [data, setData] = useState<Grn[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [sortColumn, setSortColumn] = useState<keyof Grn | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Items per page for pagination

  // Fetch GRN data from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchGrn(); // Fetch GRN data from the API
        setData(response.grnData); // Update state with fetched GRN data
      } catch (error) {
        setError("Failed to fetch GRN data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Sorting function
  const sortData = (column: keyof Grn) => {
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
    currentPage * itemsPerPage
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
              GRN Table
            </td>
            <td className="px-8 py-2 whitespace-nowrap text-sm text-gray-500"></td>
            <td className="px-36 py-2 whitespace-nowrap text-right text-sm font-medium flex items-end space-x-2">
              <button
                onClick={() => sortData("supplierName")}
                className="flex items-center rounded-lg bg-gray-200 px-3 py-1 text-xs text-gray-500 shadow-sm hover:bg-gray-400 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                <FontAwesomeIcon
                  icon={faSortAlphaUp}
                  className="h-3 w-3 mr-1"
                />
                <span>Sort by Supplier</span>
              </button>
              <button
                onClick={() => sortData("grnCode")}
                className="flex items-center rounded-lg bg-gray-200 px-3 py-1 text-xs text-gray-500 shadow-sm hover:bg-gray-400 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                <FontAwesomeIcon icon={faFilter} className="h-3 w-3 mr-1" />
                <span>Sort by GRN Code</span>
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      {/* Data Table */}
      <table className="min-w-fit text-sm">
        <thead className="bg-sky-100">
          <tr>
            <th
              onClick={() => sortData("date")}
              className="px-4 py-2 text-left text-xs font-medium text-gray-950 tracking-wider cursor-pointer"
            >
              Date
            </th>
            <th
              onClick={() => sortData("grnNo")}
              className="px-5 py-2 text-left text-xs font-medium text-gray-950 tracking-wider cursor-pointer"
            >
              GRN No
            </th>
            <th
              onClick={() => sortData("supplier")}
              className="px-5 py-2 text-left text-xs font-medium text-gray-950 tracking-wider cursor-pointer"
            >
              Supplier
            </th>
            <th
              onClick={() => sortData("qty")}
              className="px-10 py-2 text-left text-xs font-medium text-gray-950 tracking-wider cursor-pointer"
            >
              Item Qty.
            </th>
            <th
              onClick={() => sortData("amount")}
              className="px-2 py-2 text-left text-xs font-medium text-gray-950 tracking-wider cursor-pointer"
            >
              Amount (Rs.)
            </th>
          </tr>
        </thead>
        <tbody className="bg-white min-w-fit">
          {paginatedData.map((item, index) => (
            <tr key={index}>
              <td className="px-4 py-1 whitespace-nowrap text-xs text-gray-500">
                {item.createdAt}
              </td>
              <td className="px-5 py-1 whitespace-nowrap text-xs text-blue-400">
                {item.note}
              </td>
              <td className="px-5 py-1 whitespace-nowrap text-xs text-gray-500">
                {item.rep.supplier.name}
              </td>
              <td className="px-10 py-1 whitespace-nowrap text-xs text-gray-500">
                {/* Access first stock item's quantity or sum up quantities */}
                {item.stock.reduce((sum, stockItem) => sum + stockItem.qty, 0)}
              </td>
              <td className="px-2 py-1 whitespace-nowrap text-xs text-gray-500">
              {item.stock.reduce((sum, stockItem) => sum + Number(stockItem.buyingPrice), 0)}

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

export default GrnTable;
