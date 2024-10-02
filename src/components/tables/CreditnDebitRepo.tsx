import React, { useState } from "react";

// Sample data
const creditDebitData = [
  { customer: "Tathira Wiran", amount: "2,500" },
  { customer: "Abdul Shakoor", amount: "4,000" },
  { customer: "Lahiru Perera", amount: "3,500" },
  { customer: "Nishantha Silva", amount: "7,000" },
  { customer: "Harsha Fernando", amount: "5,500" },
  // Add more data as needed
];

const CreditnDebitRepo: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3; // Adjust the items per page as needed

  const totalPages = Math.ceil(creditDebitData.length / itemsPerPage);
  const paginatedData = creditDebitData.slice(
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
      {/* DataTable */}
      <table className="min-w-fit text-sm">
        <thead className="bg-sky-100">
          <tr>
            <th
              scope="col"
              className="px-4 py-2 text-left text-xs font-medium text-gray-950 tracking-wider"
            >
              Cus. Name
            </th>
            <th
              scope="col"
              className="px-5 py-2 text-left text-xs font-medium text-gray-950 tracking-wider"
            >
              Amount (Rs.)
            </th>
          </tr>
        </thead>
        <tbody className="bg-white min-w-fit">
          {paginatedData.map((entry, index) => (
            <tr key={index}>
              <td className="px-4 py-1 whitespace-nowrap text-xs text-gray-500">
                {entry.customer}
              </td>
              <td className="px-5 py-1 whitespace-nowrap text-xs text-center text-gray-500">
                {entry.amount}
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

export default CreditnDebitRepo;
