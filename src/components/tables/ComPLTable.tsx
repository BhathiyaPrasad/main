import React from "react";

const ComPLTable = () => {
  const months = ["Jan", "Feb", "Mar", "Apr"];
  const currentYear = new Date().getFullYear();
  return (
    <div className="overflow-x-auto">
      <table className="min-w-fit text-sm">
        <tbody className="bg-white min-w-fit">
          <tr>
            <td className="px-4 py-1 whitespace-nowrap text-xs text-gray-500">
              2024.April
            </td>
            <td className="px-5 py-1 whitespace-nowrap text-xs font-bold text-center text-gray-500">
              Rs.25,000
            </td>
          </tr>
          <tr>
            <td className="px-4 py-1 whitespace-nowrap text-xs text-gray-500">
              2024.Mar
            </td>
            <td className="px-5 py-1 whitespace-nowrap text-xs font-bold text-center text-gray-500">
              Rs.25,000
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ComPLTable;
