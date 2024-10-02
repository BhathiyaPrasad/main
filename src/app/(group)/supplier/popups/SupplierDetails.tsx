import * as React from "react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
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

export default function SupplierDetails() {
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
            <TableCell className="flex justify-end px-5">
              <Button className="px-5 w-16 h-8 mb-3  bg-blue-500 text-xs text-white shadow-sm hover:bg-blue-600 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
                <FaRegEdit className="h-5 w-5" />
              </Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <CardHeader className="py-1 whitespace-nowrap text-center text-xs font-medium">
        <CardTitle className="text-xl py-2">Supplier Details</CardTitle>
      </CardHeader>
      <Table>
        <TableBody>
          <TableRow className="hover:bg-white">
            <TableCell>
              <Label className="py-2" htmlFor="supcode">
                Supplier Code
              </Label>
              <Input id="supcode" />
            </TableCell>
            <TableCell>
              <Label className="py-2" htmlFor="date">
                Date
              </Label>
              <Input id="date" />
            </TableCell>
            <TableCell>
              <Label className="py-2" htmlFor="supname">
                Supplier Name
              </Label>
              <Input id="supname" />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <Table>
        <TableBody>
          <TableRow className="hover:bg-white">
            <TableCell>
              <Label className="py-2" htmlFor="supemail">
                Supplier Email
              </Label>
              <Input id="supemail" />
            </TableCell>
            <TableCell className="w-2/6">
              <Label className="py-2" htmlFor="suphonenum">
                Supplier Phone No
              </Label>
              <Input id="suphonenum" type="tel" />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <Table>
        <TableBody>
          <TableRow className="hover:bg-white">
            <TableCell>
              <Label className="py-2" htmlFor="supaddress">
                Supplier Address
              </Label>
              <Input id="supaddress" />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <Table>
        <TableBody>
          <TableRow className="hover:bg-white">
            <TableCell>
              <Label className="py-2" htmlFor="refname">
                Ref. Name
              </Label>
              <Input id="refname" />
            </TableCell>
            <TableCell className="w-2/6">
              <Label className="py-2" htmlFor="rphonenum">
                Ref. Phone No
              </Label>
              <Input id="rphonenum" type="tel" />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <div className="flex justify-center items-center py-4">
        <Card className="w-5/6 rounded-none">
          <Table>
            <TableHeader className="bg-sky-100">
              <TableRow className="py-6 hover:bg-sky-100">
                <TableHead className="text-black">Date</TableHead>
                <TableHead className="text-black">Invoice No.</TableHead>
                <TableHead className="text-black">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow className="py-6 hover:bg-white">
                <TableCell>2024-06-07</TableCell>
                <TableCell>001</TableCell>
                <TableCell>20,000.00</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Card>
      </div>
    </Card>
  );
}
