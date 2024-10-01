import * as React from "react";
import { Card, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

export default function CreditAmountDetails() {
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
        <CardTitle className="text-xl py-2">Credit Amount Details</CardTitle>
      </CardHeader>
      <Table>
        <TableBody>
          <TableRow className="hover:bg-white">
            <TableCell>
              <Label className="py-2" htmlFor="invoiceno">
                Invoice No
              </Label>
              <Input id="invoiceno" />
            </TableCell>
            <TableCell>
              <Label className="py-2" htmlFor="duedate">
                Due Date
              </Label>
              <Input id="duedate" />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <Table>
        <TableBody>
          <TableRow className="hover:bg-white">
            <TableCell>
              <Label className="py-2" htmlFor="cusname">
                Customer Name
              </Label>
              <Input id="cusname" />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <Table>
        <TableBody>
          <TableRow className="hover:bg-white">
            <TableCell>
              <Label className="py-2" htmlFor="camount">
                Credit Amount
              </Label>
              <Input id="camount" />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <Table>
        <TableBody>
          <TableRow className="hover:bg-white">
            <TableCell>
              <Label className="py-2" htmlFor="pmethod">
                Payment Method
              </Label>
              <Select>
                <SelectTrigger id="pmethod"></SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="cheque">Cheque</SelectItem>
                  <SelectItem value="credit">Credit</SelectItem>
                  <SelectItem value="cash">Cash</SelectItem>
                </SelectContent>
              </Select>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <Table>
        <TableBody>
          <TableRow className="hover:bg-white">
            <TableCell>
              <Label className="py-2" htmlFor="payment">
                Payment
              </Label>
              <Input id="payment" />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <Table>
        <TableBody>
          <TableRow className="hover:bg-white">
            <TableCell>
              <Label className="py-2" htmlFor="balamount">
                Balance Amount
              </Label>
              <Input id="balamount" />
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
