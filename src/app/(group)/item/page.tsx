import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { FaArrowRightLong } from "react-icons/fa6";
import Top from "../../../components/Top";
import ExpenTable from "../../../components/tables/ExpenTable";
import ItmTable from "../../../components/tables/ItmTable";
import StockTable from "../../../components/tables/StockTable";
import CreateBrand from "./popups/CreateBrand";
import { CreateCategory } from "./popups/CreateCategory";
import GRN from "./popups/GRN";

export default function item() {
  return (
    <div className="w-full h-full overflow-scroll">
      {/* include top header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-lg font-bold px-2">Enter Item Stock</h1>
        </div>
        <div>
          <Top />
        </div>
      </div>
      {/* include button */}
      <Dialog>
        <DialogTrigger>
          <div className="px-2 mb-5">
            <div className="flex items-center px-3 py-1 space-x-3 rounded-md h-10 w-44 bg-blue-500 text-sm text-white shadow-sm hover:bg-blue-600 hover:text-white">
              <span>Enter New Stock</span>
              <FaArrowRightLong className="h-10 w-4" />
            </div>
          </div>
        </DialogTrigger>
        <DialogContent className="w-fit h-auto max-h-screen max-w-3/4 overflow-scroll">
          <GRN />
        </DialogContent>
      </Dialog>
      {/* include table */}
      <div className="px-2 py-1">
        <StockTable />
      </div>
      <h1 className="text-lg font-bold px-2 py-5">Add New Item</h1>
      <div className="px-2 py-2 whitespace-nowrap text-right text-sm font-medium flex items-end space-x-3 mb-5">
        <Dialog>
          <DialogTrigger>
            <div className="flex items-center px-6 py-1 space-x-3 rounded-md h-10 w-52 bg-blue-500 text-sm text-white shadow-sm hover:bg-blue-600 hover:text-white">
              <span>Create Brand Click Here</span>
            </div>
          </DialogTrigger>
          <DialogContent className="w-fit h-auto max-h-screen max-w-3/4 overflow-scroll">
            <CreateBrand />
          </DialogContent>
        </Dialog>
        <Dialog>
          <DialogTrigger>
            <div className="flex items-center px-7 py-1 space-x-3 rounded-md h-10 w-60 bg-blue-500 text-sm text-white shadow-sm hover:bg-blue-600 hover:text-white">
              <span>Create Category Click Here</span>
              <FaArrowRightLong className="h-10 w-4" />
            </div>
          </DialogTrigger>
          <DialogContent className="w-fit h-auto max-h-screen max-w-3/4 overflow-scroll">
            <CreateCategory />
          </DialogContent>
        </Dialog>
      </div>
      <div className="px-2 py-1">
        <ItmTable />
      </div>
      <h1 className="text-lg font-bold px-2 py-5">Expenses</h1>
      <div className="px-2 py-1">
        <ExpenTable />
      </div>
    </div>
  );
}
