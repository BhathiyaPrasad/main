import React from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import Top from "../../components/Top";
import StockTable from "../../components/tables/StockTable";
import ItmTable from "../../components/tables/ItmTable";
import ExpenTable from "../../components/tables/ExpenTable";
import { Card, CardContent } from "@/components/ui/card";
import ChequeDueRem from "../../components/tables/ChequeDueRem";
import CreditTable from "../../components/tables/CreditTable";
import CreditDueRem from "../../components/tables/CreditDueRem";
import ChequeTable from "../../components/tables/ChequeTable";
import RjtChequeTable from "../../components/tables/RjtChequeTable";

export default function CreditCheque() {
  return (
    <div className="w-full h-full overflow-scroll">
      {/* include top header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-lg font-bold px-2">Cheque & Credit Managment</h1>
        </div>
        <div>
          <Top />
        </div>
      </div>
      {/* include button */}
      <div className="px-2 mb-5">
        <h1 className="text-lg font-bold px-2">Credit Managment</h1>
      </div>
      {/* include table */}
      <div className="px-2 py-1">
        <Card className="flex-col  row-span-2 w-fit h-fit text-w-3/4 overflow-x-auto bg-[url(/images/Dashcheque.png)] bg-cover bg-center bg-no-repeat">
          <CardContent>
            <CreditDueRem />
          </CardContent>
        </Card>
      </div>

      <div className="px-2 py-1">
        <CreditTable />
      </div>
      <h1 className="text-lg font-bold px-2 py-5">Cheque Managment</h1>
      <div className="px-2 py-1">
        <Card className="flex-col  row-span-2 w-fit h-fit text-w-3/4 overflow-x-auto bg-[url(/images/Dashcheque.png)] bg-cover bg-center bg-no-repeat">
          <CardContent>
            <ChequeDueRem />
          </CardContent>
        </Card>
      </div>
      <div className="px-2 py-1">
        <ChequeTable />
      </div>
      <div className="px-2 py-1">
        <RjtChequeTable />
      </div>
    </div>
  );
}
