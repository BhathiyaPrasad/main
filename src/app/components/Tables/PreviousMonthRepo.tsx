import React, { useState } from "react";

// Mock data for previous months
const previousMonthData = [
  { date: "2024/Jan", amount: "200,000" },
  { date: "2024/Feb", amount: "300,000" },
  // Add more data as needed
];

const PreviousMonthRepo: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Adjust as needed

  const totalPages = Math.ceil(previousMonthData.length / itemsPerPage);
  const paginatedData = previousMonthData.slice(
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
              className="px-10 py-2 text-left text-xs font-medium text-gray-950 tracking-wider"
            >
              Amount(Rs.)
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
              <td className="px-10 py-1 whitespace-nowrap text-xs text-gray-500">
                {item.amount}
              </td>
              <td className="px-4 py-1 whitespace-nowrap text-right text-xs font-medium flex space-x-1">
                <button className="rounded-md bg-blue-500 px-3 py-1 text-xs text-white shadow-sm hover:bg-blue-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
                  See Report
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

export default PreviousMonthRepo;
