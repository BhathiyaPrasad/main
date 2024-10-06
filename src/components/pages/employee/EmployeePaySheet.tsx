"use client";

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as React from "react";

// import { Calendar } from "@/components/ui/calendar";
import { FaRegEdit } from "react-icons/fa";
export default function MonthlyIncomeReport() {
  const [date, setDate] = React.useState<Date>();

  return (
    <Card className="w-auto h-fit overflow-scroll">
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
            <TableCell className="flex justify-end px-5">
              <Button className="px-5 w-16 h-8 mb-3  bg-blue-500 text-xs text-white shadow-sm hover:bg-blue-600 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
                <FaRegEdit className="h-5 w-5" />
              </Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <CardHeader className="py-1 whitespace-nowrap text-center text-xs font-medium">
        <CardTitle className="text-xl py-2">Employee Pay Sheet</CardTitle>
      </CardHeader>
      <Table>
        <TableBody>
          <TableRow className="hover:bg-white">
            <TableCell>
              <Label className="py-2" htmlFor="empid">
                Employee ID
              </Label>
              <Input id="empid" />
            </TableCell>
            <TableCell>
              <Label className="py-2" htmlFor="date">
                Date
              </Label>
              <Input id="date" />
            </TableCell>
            <TableCell>
              <Label className="py-2" htmlFor="empname">
                Employee Name
              </Label>
              <Input id="empname" />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <Table>
        <TableBody>
          <TableRow className="hover:bg-white">
            <TableCell>
              <Label className="py-2" htmlFor="designation">
                Designation
              </Label>
              <Input id="designation" />
            </TableCell>
            <TableCell>
              <Label className="py-2" htmlFor="tsalary">
                Total Salary
              </Label>
              <Input id="tsalary" />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <div className="flex justify-center items-center py-4">
        <Card className="w-5/6 rounded-none">
          <Table>
            <TableHeader className="bg-sky-100">
              <TableRow className="py-6 hover:bg-sky-100">
                <TableHead className="text-black">Discription</TableHead>
                <TableHead className="text-black">Total Salary</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow className="py-6 hover:bg-white border-y-transparent">
                <TableCell>
                  <h1 className="text-gray-400 text-sm py-1">Earning</h1>
                  <h1 className="text-sm py-0.5">Basic Salary</h1>
                  <h1 className="text-sm py-0.5">Performance</h1>
                  <h1 className="text-black font-bold text-sm py-0.5">
                    Total Earingn
                  </h1>
                </TableCell>
                <TableCell>
                  <br />
                  <h1 className="text-sm py-0.5"></h1>
                  <h1 className="text-sm py-0.5"></h1>
                  <h1 className="text-black font-bold text-sm py-0.5"></h1>
                </TableCell>
              </TableRow>
              <TableRow className="py-6 hover:bg-white border-y-transparent">
                <TableCell>
                  <h1 className="text-gray-400 text-sm py-1">Dedication</h1>
                  <h1 className="text-sm py-0.5">Welfare</h1>
                  <h1 className="text-sm py-0.5">TAX</h1>
                  <h1 className="text-sm py-0.5 font-bold">Total Dedication</h1>
                  <h1 className="text-sm py-2 font-bold">NET Salary</h1>
                </TableCell>
                <TableCell>
                  <br />
                  <h1 className="text-sm py-0.5"></h1>
                  <h1 className="text-sm py-0.5"></h1>
                  <h1 className="text-sm py-0.5"></h1>
                  <h1 className="text-sm py-2 font-bold"></h1>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Card>
      </div>
      <Table>
        <TableBody>
          <TableRow className="hover:bg-white">
            <TableCell className="w-4/6"></TableCell>
            <TableCell className="w-auto flex justify-center">
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
