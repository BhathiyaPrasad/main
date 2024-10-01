"use client";
import * as React from "react";
import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
// import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

interface AttendanceState {
  present: boolean;
  absent: boolean;
}

const AttendanceMark: React.FC = () => {
  const [attendance, setAttendance] = useState<AttendanceState>({
    present: false,
    absent: false,
  });
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    // Set the current date in YYYY-MM-DD format
    const today = new Date().toISOString().split("T")[0];
    setCurrentDate(today);
  }, []);

  const handleCheckboxChange = (type: "present" | "absent") => {
    setAttendance((prev) => ({
      present: type === "present" ? !prev.present : false,
      absent: type === "absent" ? !prev.absent : false,
    }));
  };

  return (
    <Card className="w-auto h-fit">
      <CardHeader className="py-1 whitespace-nowrap text-center text-xs font-medium">
        <CardTitle className="text-xl">Attendance Mark</CardTitle>
      </CardHeader>
      <Table>
        <TableHeader>
          <TableRow className="border-y-white hover:bg-transparent">
            <TableCell className="w-40">
              <Label htmlFor="date">Date</Label>
              <Input id="date" value={currentDate} readOnly />
            </TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow className="hover:bg-white border-y-white">
            <TableCell>
              <Label>Emp. ID</Label>
            </TableCell>
            <TableCell>
              <Label>Name</Label>
            </TableCell>
            <TableCell className="w-5">
              <Label>Designation</Label>
            </TableCell>
            <TableCell>
              <Label>Present</Label>
            </TableCell>
            <TableCell>
              <Label>Absent</Label>
            </TableCell>
          </TableRow>
          <TableRow className="hover:bg-white">
            <TableCell>001</TableCell>
            <TableCell>Dasun Daluwaththa</TableCell>
            <TableCell>
              <div className="flex flex-col space-y-1.5">
                <Select>
                  <SelectTrigger id="framework">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    <SelectItem value="manager">Manager</SelectItem>
                    <SelectItem value="accountant">Accountant</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </TableCell>
            <TableCell>
              <div className="px-3 flex items-center">
                {/* <Checkbox
                  className={`h-7 w-7 ${
                    attendance.present
                      ? "bg-green-500 border-green-500 border-4"
                      : ""
                  }`}
                  id="present"
                  checked={attendance.present}
                  onCheckedChange={() => handleCheckboxChange("present")}
                  aria-label="Present"
                /> */}
              </div>
            </TableCell>
            <TableCell>
              <div className="px-3 flex items-center">
                {/* <Checkbox
                  className={`h-7 w-7 ${
                    attendance.absent
                      ? "bg-red-500 border-red-500 border-4"
                      : ""
                  }`}
                  id="absent"
                  checked={attendance.absent}
                  onCheckedChange={() => handleCheckboxChange("absent")}
                  aria-label="Absent"
                /> */}
              </div>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <Table>
        <TableBody>
          <TableRow className="hover:bg-white">
            <TableCell className="w-4/6"></TableCell>
            <TableCell className="w-auto flex justify-center">
              <Button
                className="rounded-md w-28 bg-white px-3 py-1 text-xs text-blue-500 border border-blue-500 shadow-sm hover:bg-gray-100 focus:outline-none focus:ring-3 focus:ring-blue-500"
                aria-label="Cancel"
              >
                Cancel
              </Button>
            </TableCell>
            <TableCell>
              <Button
                className="rounded-md w-28 bg-blue-500 px-3 py-1 text-xs text-white shadow-sm hover:bg-blue-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                aria-label="Submit"
              >
                Submit
              </Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Card>
  );
};

export default AttendanceMark;
