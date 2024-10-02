import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { FaArrowRightLong } from "react-icons/fa6";
import Top from "../../../components/Top";
import SupTable from "../../../components/tables/SupTable";
import AddNewSupplierDetails from "./popups/AddNewSupplierDetails";

export default function supplier() {
  return (
    <div className="w-full h-full overflow-scroll">
      {/* include top header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-lg font-bold px-2">Supplier Management</h1>
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
              <span>New Supplier</span>
              <FaArrowRightLong className="h-10 w-4" />
            </div>
          </DialogTrigger>
          <DialogContent className="w-fit h-auto max-h-screen max-w-3/4 overflow-scroll">
            <AddNewSupplierDetails />
          </DialogContent>
        </Dialog>
      </div>
      {/* include table */}
      <div className="px-2 py-1">
        <SupTable />
      </div>
    </div>
  );
}
