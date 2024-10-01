"use client";

import React, { useState, useEffect } from "react";

const ChequeDueRem = () => {
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    const today = new Date();
    const formattedDate = today.toLocaleDateString("en-GB"); // Format as DD/MM/YYYY
    setCurrentDate(formattedDate);
  }, []);

  return (
    <div className="overflow-x-auto">
      <div className="px-4 py-2 text-sm text-black">
        <h1>Cheque Due-Date Reminder</h1>
      </div>
      <div className="px-4 text-lg font-bold text-amber-950">
        <h1>Due Date - {currentDate} (Today)</h1>
      </div>
      {/* DataTable */}
      <table className="min-w-fit text-sm">
        <thead>
          <tr>
            <th
              scope="col"
              className="px-4 py-2 text-left text-xs font-bold text-amber-950 tracking-wider"
            >
              Invoice No
            </th>
            <th
              scope="col"
              className="px-5 py-2 text-left text-xs font-bold text-amber-950 tracking-wider"
            >
              Name
            </th>
            <th
              scope="col"
              className="px-5 py-2 text-left text-xs font-bold text-amber-950 tracking-wider"
            >
              Cheque Amount(Rs.)
            </th>
            <th
              scope="col"
              className="px-5 py-2 text-left text-xs font-bold text-amber-950 tracking-wider"
            ></th>
          </tr>
        </thead>
        <tbody className="min-w-fit">
          <tr>
            <td className="px-4 py-1 whitespace-nowrap text-xs text-amber-950">
              INV 1234
            </td>
            <td className="px-5 py-1 whitespace-nowrap text-xs text-amber-950">
              Isuru
            </td>
            <td className="px-5 py-1 whitespace-nowrap text-xs text-amber-950">
              20,000
            </td>
            <td className="px-5 py-1 whitespace-nowrap text-xs text-amber-950">
              <button className="rounded-md bg-amber-950 px-3 py-1 text-xs text-amber-500 shadow-sm hover:bg-white hover:text-amber-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
                Clear Cheque
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ChequeDueRem;
