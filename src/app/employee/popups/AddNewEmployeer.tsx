import * as React from "react";
import { Card, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import { FaRegEdit } from "react-icons/fa";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function AddNewEmployeer() {
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
            <TableCell></TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <CardHeader className="py-1 whitespace-nowrap text-center text-xs font-medium">
        <CardTitle className="text-xl py-2">Add New Employeer</CardTitle>
      </CardHeader>
      <Table>
        <TableBody>
          <TableRow className="hover:bg-white">
            <TableCell>
              <Label className="py-2" htmlFor="date">
                Date
              </Label>
              <Input id="date" />
            </TableCell>
            <TableCell>
              <Label className="py-2" htmlFor="empid">
                EMP ID
              </Label>
              <Input id="empid" />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <Table>
        <TableBody>
          <TableRow className="hover:bg-white border-y-transparent">
            <TableCell>
              <Label className="py-2" htmlFor="empname">
                Employee Name
              </Label>
              <Input id="empname" />
            </TableCell>
          </TableRow>
          <TableRow className="hover:bg-white border-y-transparent">
            <TableCell>
              <Label className="py-2" htmlFor="pnumber">
                Phone Number
              </Label>
              <Input id="pnumber" />
            </TableCell>
          </TableRow>
          <TableRow className="hover:bg-white border-y-transparent">
            <TableCell>
              <Label className="py-2" htmlFor="desig">
                Designation
              </Label>
              <Select>
                <SelectTrigger id="desig">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="sup">Support Specialist</SelectItem>
                  <SelectItem value="tech">Tech Support Engineer</SelectItem>
                </SelectContent>
              </Select>
            </TableCell>
          </TableRow>

          <TableRow className="hover:bg-white border-y-transparent">
            <TableCell>
              <Label className="py-2" htmlFor="address">
                Salary
              </Label>
              <Input id="address" />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <CardFooter className="flex justify-between">
        <Button className="rounded-md w-28 bg-white px-3 py-1 text-xs text-blue-500 border border-blue-500 shadow-sm hover:bg-gray-100 focus:outline-none focus:ring-3 focus:ring-blue-500">
          Cancel
        </Button>
        <Button className="rounded-md w-28 bg-blue-500 px-3 py-1 text-xs text-white shadow-sm hover:bg-blue-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
          Save
        </Button>
      </CardFooter>
    </Card>
  );
}
