"use client";
import { Card, CardContent } from "@/components/ui/card";

import CreditnDebitRepo from "../../../../components/tables/CreditnDebitRepo";
import InvoiceTable from "../../../../components/tables/InvoiceTable";
import Top from "../../../../components/Top";

const InvoiceReportsPage = () => {
  return (
    <div className="grid w-full gap-2">
      <div className="flex justify-between p-4 items-center">
        <div className="text-lg font-bold">Invoice Reports</div>
        <div>
          <Top />
        </div>
      </div>

      <div className="grid grid-cols-2 w-fit auto-cols-max gap-4 px-4">
        <Card className="flex-col col-span-2 bg-white  row-span-2 w-fit h-fit text-w-3/4 overflow-x-auto">
          <CardContent>
            <div className="flex-col items-center w-fit justify-center px-4 py-3">
              <InvoiceTable />
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="grid grid-cols-2 auto-cols-max gap-4 p-4">
        <Card className="flex-col bg-white row-span-2 w-full h-fit text-w-3/4 overflow-x-auto">
          <CardContent>
            <div className="flex-col items-center justify-center px-4 py-3">
              <p className="px-4 py-2 whitespace-nowrap text-sm font-bold text-gray-700">
                Creditors Table
              </p>
              <Card className="flex-col  row-span-2 w-full h-fit border-0 rounded-2xl text-w-3/4 overflow-x-auto py-5 bg-[url(/images/creditorstable.png)] bg-cover bg-center bg-no-repeat text-white">
                <div className="flex flex-col items-center justify-center px-4 py-3">
                  <div className="flex-col justify-start w-full">
                    <div>Total Creditors</div>
                    <div className="text-6xl font-bold ml-4">25</div>
                  </div>

                  <div className="flex justify-end w-full mt-4">
                    <div>
                      <div>Total Amount</div>
                      <div className="text-4xl font-bold ml-4">Rs. 100,000</div>
                    </div>
                  </div>
                </div>
              </Card>
              <div className="py-5">
                <CreditnDebitRepo />
              </div>
              <div className="flex flex-row">
                <div className="p-5">
                  <button className="flex items-center px-3 py-1 space-x-3 rounded-md h-10 w-fit  border-2 border-blue-500 bg-white text-sm text-blue-500 shadow-sm hover:bg-gray-100 hover:text-blue-500">
                    <span>Download As PDF</span>
                  </button>
                </div>
                <div className="p-5">
                  <button className="flex items-center px-3 py-1 space-x-3 rounded-md h-10 w-fit bg-blue-500 text-sm text-white shadow-sm hover:bg-blue-600 hover:text-white">
                    <span>Print</span>
                  </button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="flex-col bg-white border-0  row-span-2 w-full h-fit text-w-3/4 overflow-x-auto">
          <CardContent>
            <div className="flex-col items-center justify-center px-4 py-3">
              <p className="px-4 py-2 whitespace-nowrap text-sm font-bold text-gray-700">
                Dabtors Table
              </p>
              <Card className="flex-col  row-span-2 w-full h-fit rounded-2xl text-w-3/4 overflow-x-auto py-5 bg-[url(/images/debatorstable.png)] bg-cover bg-center bg-no-repeat text-gray-700">
                <div className="flex flex-col items-center justify-center px-4 py-3">
                  <div className="flex-col justify-start w-full">
                    <div>Total Dabitors</div>
                    <div className="text-6xl font-bold ml-4">16</div>
                  </div>

                  <div className="flex justify-end w-full mt-4">
                    <div>
                      <div>Total Amount</div>
                      <div className="text-4xl font-bold ml-4">Rs. 70,000</div>
                    </div>
                  </div>
                </div>
              </Card>
              <div className="py-5">
                <CreditnDebitRepo />
              </div>
              <div className="flex flex-row">
                <div className="p-5">
                  <button className="flex items-center px-3 py-1 space-x-3 rounded-md h-10 w-fit  border-2 border-blue-500 bg-white text-sm text-blue-500 shadow-sm hover:bg-gray-100 hover:text-blue-500">
                    <span>Download As PDF</span>
                  </button>
                </div>
                <div className="p-5">
                  <button className="flex items-center px-3 py-1 space-x-3 rounded-md h-10 w-fit bg-blue-500 text-sm text-white shadow-sm hover:bg-blue-600 hover:text-white">
                    <span>Print</span>
                  </button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default InvoiceReportsPage;
