import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { UserRoundPlus } from "lucide-react";
import { FaArrowRightLong } from "react-icons/fa6";
import Top from "../../../components/Top";
import AttendanceTable from "../../../components/tables/AttendanceTable";
import EmpDetailsTable from "../../../components/tables/EmpDetailsTable";
import SalaryManagTable from "../../../components/tables/SalaryManagTable";
import AddNewEmployeer from "./popups/AddNewEmployeer";
import AttendanceMark from "./popups/AttendanceMark";

export default function Employee() {
  return (
    <div className="w-full h-full overflow-scroll">
      {/* include top header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-lg font-bold px-2">Employee Management</h1>
        </div>
        <div>
          <Top />
        </div>
      </div>
      {/* include button */}
      <div className="px-2 mb-5">
        <Dialog>
          <DialogTrigger>
            <div className="flex items-center px-3 py-1 space-x-3 rounded-md h-10 w-fit bg-blue-500 text-sm text-white shadow-sm hover:bg-blue-600 hover:text-white">
              <span>Attendance Mark</span>
              <FaArrowRightLong className="h-10 w-4" />
            </div>
          </DialogTrigger>
          <DialogContent className="w-fit h-auto max-w-3/4 overflow-scroll">
            <AttendanceMark />
          </DialogContent>
        </Dialog>
      </div>
      {/* include table */}
      <div className="px-2 py-5">
        <AttendanceTable />
      </div>
      <div className="px-2 py-5">
        <SalaryManagTable />
      </div>

      <div className="flex-col items-center justify-center px-10 py-10 w-full bg-[url(/images/NewEmpTumbnail.png)] bg-cover bg-center bg-no-repeat text-black  border-2 rounded-2xl shadow-2xl whitespace-nowrap   p-10 ">
        <div className="text-2xl font-bold">New Employeer</div>
        <div>
          <span className="text-muted-foreground">
            Enter Details of New Employeer{" "}
          </span>
        </div>
        <div className="flex justify-start item-baseline p-5">
          <Dialog>
            <DialogTrigger>
              <div className="flex items-center px-3 py-5 space-x-3 rounded-md h-10 w-fit bg-blue-500 text-sm text-white shadow-sm hover:bg-blue-600 hover:text-white">
                <UserRoundPlus size={30} />
                &nbsp;Add New Employeer
              </div>
            </DialogTrigger>
            <DialogContent className="w-fit h-auto max-w-3/4 overflow-scroll">
              <AddNewEmployeer />
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <div className="px-2 py-5">
        <EmpDetailsTable />
      </div>
    </div>
  );
}
