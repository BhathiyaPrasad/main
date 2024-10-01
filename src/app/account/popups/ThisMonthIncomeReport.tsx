import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

const itemData = [
  { code: "0225", item: "BMW Car Tire", quantity: 50, rate: 5000, amount: 250000 },
  { code: "0227", item: "Mercedes Battery", quantity: 30, rate: 4500, amount: 135000 },
  { code: "0230", item: "Toyota Oil Filter", quantity: 100, rate: 1000, amount: 100000 },
  { code: "0235", item: "Honda Air Filter", quantity: 200, rate: 750, amount: 150000 },
  { code: "0240", item: "Ford Brake Pads", quantity: 75, rate: 3200, amount: 240000 },
  // Add more data as necessary
];

export default function ThisMonthIncomeReport() {
  const currentDate = new Date();
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const currentMonth = monthNames[currentDate.getMonth()];
  const currentYear = currentDate.getFullYear();

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  // Calculate total pages
  const totalPages = Math.ceil(itemData.length / itemsPerPage);

  // Paginate the data
  const paginatedData = itemData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
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
    <Card className="w-auto h-fit border-0">
      <CardHeader className="py-1 whitespace-nowrap text-center text-xs font-medium">
        <CardTitle className="text-xl py-2">Monthly Income Report</CardTitle>
      </CardHeader>
      <CardDescription className="flex justify-center">
        <Card className="flex-col row-span-2 w-5/6 h-fit rounded-2xl text-w-3/4 overflow-x-auto py-5 bg-[url(/images/thismonthincomereporttab.png)] bg-cover bg-center bg-no-repeat text-white">
          <Table>
            <TableBody>
              <TableRow className="hover:bg-transparent border-y-transparent">
                <TableCell>
                  <h1 className="text-green-900">
                    <span className="text-5xl font-bold">{currentMonth} </span>{" "}
                    <span className="text-3xl font-bold">of {currentYear}</span>
                  </h1>
                </TableCell>
              </TableRow>
              <TableRow className="hover:bg-transparent border-y-transparent">
                <TableCell>
                  <h1 className="text-white font-bold text-lg">Total Income</h1>
                  <h1 className="text-white font-bold text-3xl">
                    Rs.322,550.00
                  </h1>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Card>
      </CardDescription>
      <div className="flex justify-center items-center py-4">
        <Card className="w-auto rounded-none">
          <Table>
            <TableHeader className="bg-sky-100">
              <TableRow className="py-6 hover:bg-sky-100">
                <TableHead className="text-black">Item Code</TableHead>
                <TableHead className="text-black">Item</TableHead>
                <TableHead className="text-black">Qty</TableHead>
                <TableHead className="text-black">Rate(Rs.)</TableHead>
                <TableHead className="text-black">Amount(Rs.)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedData.map((item, index) => (
                <TableRow key={index} className="py-6 hover:bg-white">
                  <TableCell>{item.code}</TableCell>
                  <TableCell>{item.item}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>{item.rate.toFixed(2)}</TableCell>
                  <TableCell>{item.amount.toFixed(2)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </div>
      {/* Pagination Controls */}
      <div className="flex justify-center items-center space-x-4 py-4">
        <Button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className={`rounded-md w-28 px-3 py-1 text-xs text-white ${
            currentPage === 1 ? "bg-gray-400 cursor-not-allowed" : "bg-gray-200 text-xs text-gray-500 shadow-sm hover:bg-gray-400 hover:text-white"
          }`}
        >
          Previous
        </Button>
        <span className="text-xs text-gray-500">
          Page {currentPage} of {totalPages}
        </span>
        <Button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className={`rounded-md w-28 px-3 py-1 text-xs text-white ${
            currentPage === totalPages ? "bg-gray-400 cursor-not-allowed" : "bg-gray-200 text-xs text-gray-500 shadow-sm hover:bg-gray-400 hover:text-white"
          }`}
        >
          Next
        </Button>
      </div>
      <Table>
        <TableBody>
          <TableRow className="hover:bg-white">
            <TableCell className="w-64"></TableCell>
            <TableCell>
              <Button className="rounded-md w-28 bg-white px-3 py-1 text-xs text-blue-500 border border-blue-500 shadow-sm hover:bg-gray-100 focus:outline-none focus:ring-3 focus:ring-blue-500">
                Download as PDF
              </Button>
            </TableCell>
            <TableCell>
              <Button className="rounded-md w-28 bg-blue-500 px-3 py-1 text-xs text-white shadow-sm hover:bg-blue-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
                Print
              </Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Card>
  );
}
