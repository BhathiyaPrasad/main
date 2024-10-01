"use client";
import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { Bar, Doughnut, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
);

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import ChequeDueRem from "../components/Tables/ChequeDueRem";
import OutofStockAlert from "../components/Tables/OutofStockAlert";
import Header from "../components/Header";
import { fetchInvoices } from "@/services/invoiceService";

export default function Dashboard() {

  const [totalInvoices, setTotalInvoices] = useState([])
  const currentstock = {
    labels: ["Available", "Sold"],
    datasets: [
      {
        label: "Current Stock",
        data: [300, 100],
        backgroundColor: ["#006400", "#9ACD32"],
        hoverBackgroundColor: ["#006400", "#9ACD32"],
        borderWidth: 1,
      },
    ],
  };

  const outofstock = {
    labels: ["Available", "Sold"],
    datasets: [
      {
        label: "Out of Stock",
        data: [250, 750],
        backgroundColor: ["#DC2626", "#F87171"],
        hoverBackgroundColor: ["#DC2626", "#F87171"],
        borderWidth: 1,
      },
    ],
  };

  const chartRef = useRef(null);

  const fastitemchart = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "Sales",
        data: [65, 59, 80, 81, 56, 55, 40],
        backgroundColor: "green",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
        borderRadius: 10,
      },
    ],
  };

  const slowitemchart = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "Sales",
        data: [65, 59, 80, 81, 56, 55, 40],
        backgroundColor: "red",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
        borderRadius: 10,
      },
    ],
  };
  useEffect(() => {
    const fetchTotalInvoices = async () => {
      try {
        const { total } = await fetchInvoices();
        setTotalInvoices(total);
      } catch (err) {
        console.log('error fetching total invoices')
      } finally {
        console.log('total invoices retrieved',totalInvoices)
      }
    }
    fetchTotalInvoices();
  }, [])
  return (
    <div className="grid w-full gap-2 p-1 overflow-scroll">
      <Header />
      <div className="flex flex-col justify-between">
        <div className="text-lg font-bold">Dashboard</div>
        <div className="text-lg">Stock Management</div>
      </div>

      <div className="grid grid-cols-2 auto-cols-max gap-4 p-1">
        <Card className="flex-col  row-span-2 w-full h-fit rounded-2xl shadow-lg text-w-3/4 overflow-x-auto">
          <CardContent>
            <div className="flex-col items-center justify-center px-4 py-3">
              <div className="flex flex-row justify-between">
                <div>
                  <div className="text-lg font-bold">Current Stock</div>
                  <div className="text-5xl font-bold">750</div>
                  <div>Of 1,000 Products</div>
                </div>
                <div>
                  <Doughnut className="w-fit" data={currentstock} />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="flex-col  row-span-2 w-full h-fit rounded-2xl shadow-2xl text-w-3/4 overflow-x-auto">
          <CardContent>
            <div className="flex-col items-center justify-center px-4 py-3">
              <div className="flex flex-row justify-between">
                <div>
                  <div className="text-lg font-bold">Out Of Stock</div>
                  <div className="text-5xl font-bold">250</div>
                  <span>Of 1,000 Products</span>
                </div>
                <div>
                  <Doughnut className="w-fit" data={outofstock} />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="flex-col  row-span-2 w-full h-full rounded-2xl shadow-lg text-w-3/4 overflow-x-auto">
          <CardContent>
            <div className="flex-col items-center justify-center px-4 py-3">
              <OutofStockAlert />{" "}
            </div>
          </CardContent>
        </Card>

        <Card className="flex-col  row-span-2 w-full h-full rounded-2xl shadow-lg text-w-3/4 overflow-x-auto bg-[url(/images/Dashcheque.png)] bg-cover bg-center bg-no-repeat">
          <CardContent>
            <ChequeDueRem />
          </CardContent>
        </Card>

        <Card className="flex-col  row-span-2 w-full h-full rounded-2xl shadow-lg text-w-3/4 overflow-x-auto">
          <CardContent>
            <div className="flex-col items-center justify-center px-4 py-3">
              <div className="text-lg font-bold">Invoice</div>
              <div className="justify-end">
                <div>Invoice Number</div>
                <div className="text-5xl font-bold">{totalInvoices}</div>
              </div>
              <div className="py-5">
                <button className="flex items-center px-3 py-5 space-x-3 rounded-md h-10 w-fit bg-blue-500 text-sm text-white shadow-sm hover:bg-blue-600 hover:text-white">
                  Create Invoice
                </button>
              </div>
              <div className="py-5">
                <button className="flex items-center px-3 py-1 space-x-3 rounded-md h-10 w-48  border-2 border-blue-500 bg-white text-sm text-blue-500 shadow-sm hover:bg-gray-100 hover:text-blue-500">
                  Preview Invoice Table
                </button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="flex-col  row-span-2 w-full h-full rounded-2xl shadow-lg text-w-3/4 overflow-x-auto">
          <CardContent>
            <div className="flex-col items-center justify-center px-4 py-3">
              <div className="text-lg font-bold">Attendance Mark</div>
              <div className="justify-end">
                <div>Today attendance of emp</div>
                <div className="flex flex-row">
                  <div className="text-5xl font-bold">5</div>
                  <div className="text-3xl font-bold">out of 8</div>
                </div>
              </div>
              <div className="py-5">
                <button className="flex items-center px-3 py-5 space-x-3 rounded-md h-10 w-fit bg-blue-500 text-sm text-white shadow-sm hover:bg-blue-600 hover:text-white">
                  Attendance Mark
                </button>
              </div>
              <div className="py-5">
                <button className="flex items-center px-3 py-1 space-x-3 rounded-md h-10 w-48  border-2 border-blue-500 bg-white text-sm text-blue-500 shadow-sm hover:bg-gray-100 hover:text-blue-500">
                  Add new employee
                </button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="flex-col  row-span-2 w-full h-fit rounded-2xl shadow-lg text-w-3/4 overflow-x-auto">
          <CardContent>
            <div className="flex-col items-center justify-center px-4 py-3">
              <div className="text-lg font-bold justify-center">
                Fast Moving Items
              </div>
              <Bar data={fastitemchart} />
            </div>
          </CardContent>
        </Card>

        <Card className="flex-col  row-span-2 w-full h-fit rounded-2xl shadow-lg text-w-3/4 overflow-x-auto">
          <CardContent>
            <div className="flex-col items-center justify-center px-4 py-3">
              <div className="text-lg font-bold justify-center">
                Slow Moving Items
              </div>
              <Bar data={slowitemchart} />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
