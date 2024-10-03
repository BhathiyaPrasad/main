"use client";
import { Card } from "@/components/ui/card";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { ChevronDown, ChevronUp } from "lucide-react";
import Link from "next/link";
import MonthlyLNPReport from "../../../components/pages/invoice/MonthlyLNPReport";
import ThisMonthExpensesReport from "../../../components/pages/invoice/ThisMonthExpensesReport";
import ThisMonthIncomeReport from "../../../components/pages/invoice/ThisMonthIncomeReport";
import PreviousMonthRepo from "../../../components/tables/PreviousMonthRepo";
import Top from "../../../components/Top";

export default function Account() {
  return (
    <div className="grid w-full h-full gap-2 p-1 overflow-scroll">
      <div className="flex justify-between items-center">
        <div>
          <div className="flex flex-col justify-between">
            <h1 className="text-lg font-bold px-2">Account</h1>
          </div>
        </div>
        <div>
          <Top />
        </div>
      </div>

      <h1 className="text-lg font-bold px-2">Current Month</h1>
      <div className="grid grid-cols-3 auto-cols-max gap-4 p-4">
        <Dialog>
          <DialogTrigger>
            <div className="flex-col items-center justify-center px-4 py-3">
              <Card className="flex-col row-span-2 w-full h-fit rounded-2xl text-w-3/4 overflow-x-auto py-5 bg-[url(/images/monthlyincome.png)] bg-cover bg-center bg-no-repeat text-white">
                <div className="flex flex-col items-center justify-center px-4 py-3 w-full">
                  <div className="flex justify-between w-full row-span-2">
                    <div className="font-bold">Monthly Income</div>
                  </div>

                  <div className="flex justify-end w-full mt-4">
                    <div className="text-4xl font-bold">Rs. 100,000</div>
                  </div>
                </div>
              </Card>
            </div>
          </DialogTrigger>
          <DialogContent className="w-fit h-auto max-h-screen max-w-3/4 overflow-scroll">
            <ThisMonthIncomeReport />
          </DialogContent>
        </Dialog>

        <Dialog>
          <DialogTrigger>
            <div className="flex-col items-center justify-center px-4 py-3">
              <Card className="flex-col row-span-2 w-full h-fit rounded-2xl text-w-3/4 overflow-x-auto py-5 bg-[url(/images/monthlyexprenses.png)] bg-cover bg-center bg-no-repeat text-white">
                <div className="flex flex-col items-center justify-center px-4 py-3 w-full">
                  <div className="flex justify-between w-full">
                    <div className="font-bold">Monthly Expenses</div>
                  </div>

                  <div className="flex justify-end w-full mt-4">
                    <div className="text-4xl font-bold ml-4">Rs. 100,000</div>
                  </div>
                </div>
              </Card>
            </div>
          </DialogTrigger>
          <DialogContent className="w-fit h-auto max-h-screen max-w-3/4 overflow-scroll">
            <ThisMonthExpensesReport />
          </DialogContent>
        </Dialog>

        <Link href="/creditcheque">
          <div className="flex-col items-center justify-center px-4 py-3">
            <Card className="flex-col row-span-2 w-full h-fit rounded-2xl text-w-3/4 overflow-x-auto py-5 bg-[url(/images/pendincomecard.png)] bg-cover bg-center bg-no-repeat text-white">
              <div className="flex flex-col items-center justify-center px-4 py-3 w-full">
                <div className="flex justify-between w-full">
                  <div className="font-bold">Monthly Pending Income</div>
                </div>

                <div className="flex justify-end w-full mt-4">
                  <div className="text-4xl font-bold ml-4">Rs. 100,000</div>
                </div>
              </div>
            </Card>
          </div>
        </Link>
      </div>

      <div className="grid grid-cols-2 auto-cols-max gap-4 p-4">
        <div className="flex-col items-center justify-center px-4 py-3">
          <Card className="flex-col  row-span-2 w-full h-fit rounded-2xl text-w-3/4 overflow-x-auto py-5 bg-[url(/images/companyprofit.png)] bg-cover bg-center bg-no-repeat text-gray-700">
            <div className="flex flex-col items-center justify-center px-4 py-3 font-bold">
              <div className="flex-col justify-start w-full">
                <div>Company Profit</div>
              </div>

              <div className="flex justify-end w-full mt-4">
                <div>
                  <div className="flex flex-row text-6xl font-bold ml-4">
                    <ChevronUp size={70} /> Rs. 100,000
                  </div>
                </div>
              </div>
              <div>This Month</div>
              <table>
                <tbody className="bg-transparent min-w-fit">
                  <tr>
                    <td className="px-4 py-1 whitespace-nowrap text-xs text-gray-500">
                      2024/Jan
                    </td>
                    <td className="px-10 py-1 whitespace-nowrap text-xs text-gray-500">
                      200,000
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-1 whitespace-nowrap text-xs text-gray-500">
                      2024/Feb
                    </td>
                    <td className="px-10 py-1 whitespace-nowrap text-xs text-gray-500">
                      300,000
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Card>
        </div>

        <div className="flex-col items-center justify-center px-4 py-3">
          <Card className="flex-col  row-span-2 w-full h-fit rounded-2xl text-w-3/4 overflow-x-auto py-5 bg-[url(/images/companylose.png)] bg-cover bg-center bg-no-repeat text-gray-700">
            <div className="flex flex-col items-center justify-center px-4 py-3 font-bold">
              <div className="flex-col justify-start w-full">
                <div>Company Loss</div>
              </div>

              <div className="flex justify-end w-full mt-4">
                <div>
                  <div className="flex flex-row text-6xl font-bold ml-4">
                    <ChevronDown size={70} /> Rs. 100,000
                  </div>
                </div>
              </div>
              <div>This Month</div>
              <table>
                <tbody className="bg-transparent min-w-fit">
                  <tr>
                    <td className="px-4 py-1 whitespace-nowrap text-xs text-gray-500">
                      2024/Jan
                    </td>
                    <td className="px-10 py-1 whitespace-nowrap text-xs text-gray-500">
                      200,000
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-1 whitespace-nowrap text-xs text-gray-500">
                      2024/Feb
                    </td>
                    <td className="px-10 py-1 whitespace-nowrap text-xs text-gray-500">
                      300,000
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Card>
        </div>

        <div>
          <Dialog>
            <DialogTrigger>
              <div className="px-4">
                <button className="flex items-center px-3 py-5 space-x-3 rounded-md h-10 w-fit bg-blue-500 text-sm text-white shadow-sm hover:bg-blue-600 hover:text-white">
                  <span>See Profit & Loss Report</span>
                </button>
              </div>
            </DialogTrigger>
            <DialogContent className="w-fit h-auto max-h-screen max-w-3/4 overflow-scroll">
              <MonthlyLNPReport />
            </DialogContent>
          </Dialog>

          <div className="p-5">
            <div className="font-bold">Previous Month</div>
            <PreviousMonthRepo />
          </div>
        </div>
      </div>
    </div>
  );
}
