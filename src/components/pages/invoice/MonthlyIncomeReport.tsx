"use client";

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
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
import { Calendar as CalendarIcon } from "lucide-react";
import * as React from "react";

import { cn } from "@/lib/utils";

export default function MonthlyIncomeReport() {
  const [date, setDate] = React.useState<Date>();

  return (
    <Card className="w-auto h-fit border-0 p-0">
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
        <CardTitle className="text-xl py-2">Monthly Income Report</CardTitle>
      </CardHeader>
      <Table>
        <TableBody>
          <TableRow className="hover:bg-transparent">
            <TableCell>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-[280px] justify-start text-left font-normal",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? (
                      format(date, "MMMM yyyy")
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <div className="flex justify-center items-center py-4">
        <Card className="w-auto rounded-none">
          <Table>
            <TableHeader className="bg-sky-100">
              <TableRow className="py-6 hover:bg-sky-100">
                <TableHead className="text-black">Item Code</TableHead>
                <TableHead className="text-black">Item</TableHead>
                <TableHead className="text-black">Qut.</TableHead>
                <TableHead className="text-black">Rate(Rs.)</TableHead>
                <TableHead className="text-black">Amount(Rs.)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow className="py-6 hover:bg-white">
                <TableCell>0225</TableCell>
                <TableCell>BMW Car Tire</TableCell>
                <TableCell>50</TableCell>
                <TableCell>5,000.00</TableCell>
                <TableCell>250,000.00</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Card>
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
