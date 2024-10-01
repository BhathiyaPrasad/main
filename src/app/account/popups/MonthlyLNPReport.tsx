import * as React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

export default function MonthlyLNPReport() {
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
  return (
    <Card className="w-auto h-fit">
      <Table>
        <TableBody>
          <TableRow className="hover:bg-white">
            <TableCell className="flex justify-start px-5">
              <Button className="px-5 w-20 h-8 mb-3 bg-gray-200 text-xs text-gray-500 shadow-sm hover:bg-gray-400 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
                <FontAwesomeIcon icon={faAngleLeft} className="h-3 w-3 mr-1" />
                <span>Back</span>
              </Button>
            </TableCell>
            <TableCell></TableCell>
            <TableCell className="flex justify-end px-5"></TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <CardHeader className="py-1 whitespace-nowrap text-center text-xs font-medium">
        <CardTitle className="text-xl py-2">
          Monthly Profit & Loss Report
        </CardTitle>
      </CardHeader>
      <CardDescription className="flex justify-center">
        <Card className="flex-col row-span-2 w-5/6 h-fit rounded-2xl text-w-3/4 overflow-x-auto py-5 bg-[url(/images/thismonthlosereporttab.png)] bg-cover bg-center bg-no-repeat text-white">
          <Table>
            <TableBody>
              <TableRow className="hover:bg-transparent border-y-transparent">
                <TableCell>
                  <h1 className="text-red-900">
                    <span className="text-5xl font-bold">{currentMonth} </span>{" "}
                    <span className="text-3xl font-bold">of {currentYear}</span>
                  </h1>
                </TableCell>
              </TableRow>
              <TableRow className="hover:bg-transparent border-y-transparent">
                <TableCell>
                  <h1 className="text-white font-bold text-lg">
                    Total Expenses
                  </h1>
                  <h1 className="text-white font-bold text-3xl">
                    Rs.102,550.00
                  </h1>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Card>
      </CardDescription>
      <div className="flex justify-center items-center py-4">
        <Card className="w-5/6 rounded-none border-transparent">
          <Table className="">
            <TableHeader className="bg-sky-100">
              <TableRow className="py-6 hover:bg-sky-100">
                <TableHead className="text-black">Description</TableHead>
                <TableHead className="text-black">Amount(Rs.)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="border-transparent">
              <TableRow className="y-1 hover:bg-white border-transparent">
                <TableCell>
                  <h1 className="font-bold py-2">Revenue</h1>
                  <h1>Item sales</h1>
                  <h1>Services</h1>
                </TableCell>
                <TableCell>
                  <br />
                  <br />
                  <h1>500,000.00</h1>
                  <h1>900,000.00</h1>
                </TableCell>
              </TableRow>
              <TableRow className="y-1 hover:bg-white border-transparent">
                <TableCell>
                  <h1 className="font-bold py-2">Expenses</h1>
                  <h1>Cost of Goods</h1>
                  <h1>Employee Salary</h1>
                  <h1>Other Expenses</h1>
                </TableCell>
                <TableCell>
                  <br />
                  <br />
                  <h1>500,000.00</h1>
                  <h1>360,000.00</h1>
                  <h1>240,000.00</h1>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Card>
      </div>
      <CardDescription className="flex justify-center">
        <Card className="flex-col row-span-2 w-5/6 h-fit rounded-2xl text-w-3/4 overflow-x-auto py-5 bg-[url(/images/thismonthlosetab.png)] bg-cover bg-center bg-no-repeat text-white">
          <Table>
            <TableBody>
              <TableRow className="hover:bg-transparent border-y-transparent">
                <TableCell>
                  <h1 className="text-white text-lg">Net Income</h1>
                  <h1 className="text-white font-bold text-3xl">
                    Rs.360,000.00
                  </h1>
                  <h1 className="text-white text-lg flex justify-end">
                    Result
                  </h1>
                  <h1 className="text-white font-bold text-5xl flex justify-end">
                    Loss
                  </h1>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Card>
      </CardDescription>
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
