import React from "react";
import CustTable from "../components/Tables/CustTable";
import { FaArrowRightLong } from "react-icons/fa6";
import Top from "../components/Top";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import AddNewCustomerDetails from "./popups/AddNewCustomerDetails";

export default function customer() {
  return (
    <div className="w-full h-full overflow-scroll">
      {/* include top header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-lg font-bold px-2">Customer Management</h1>
        </div>
        <div>
          <Top />
        </div>
      </div>
      {/* include button */}
      <div className="px-2 mb-5">
        <Dialog>
          <DialogTrigger>
          <div className="flex items-center px-3 py-1 space-x-3 rounded-md h-10 w-40 bg-blue-500 text-sm text-white shadow-sm hover:bg-blue-600 hover:text-white">
          <span>New Customer</span>
          <FaArrowRightLong className="h-10 w-4" />
        </div>
          </DialogTrigger>
          <DialogContent className="w-fit h-auto max-w-3/4 overflow-scroll">
            <AddNewCustomerDetails />
          </DialogContent>
        </Dialog>
      </div>
      {/* include table */}
      <div className="px-2 py-1">
        <CustTable />
      </div>
    </div>
  );
}
