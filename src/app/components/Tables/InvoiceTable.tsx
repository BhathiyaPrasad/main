import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter, faSortAlphaUp } from "@fortawesome/free-solid-svg-icons";
import { fetchInvoices } from '@/services/invoiceService'; // Ensure this function is properly defined and returns a Promise

interface Invoice {
  id: string;
  note: string;
  paymentMethod: string;
  payment: number;
  discountType: string;
  discount: number;
  createdAt: string;
  updatedAt: string;
  userId: string;
  customerId: string;
  customer: Customer;
  invoiceId:string;
}

interface Customer {
  name: string;
}

const InvoiceTable: React.FC = () => {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [sortColumn, setSortColumn] = useState<keyof Invoice | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;
  const [totalInvoices,setTotalInvoices] = useState([])

  const sortData = (column: keyof Invoice) => {
    const direction = sortDirection === "asc" ? "desc" : "asc";
    const sortedData = [...invoices].sort((a, b) => {
      if (a[column] < b[column]) return direction === "asc" ? -1 : 1;
      if (a[column] > b[column]) return direction === "asc" ? 1 : -1;
      return 0;
    });
    setSortColumn(column);
    setSortDirection(direction);
    setInvoices(sortedData);
  };

  const totalPages = Math.ceil(invoices.length / itemsPerPage);
  const paginatedData = invoices.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const handleNextPage = () => {
    setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev));
  };

  const handlePreviousPage = () => {
    setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev));
  };

  useEffect(() => {
    const fetchInvoicesData = async () => {
      setLoading(true); // Set loading to true when starting the fetch
  
      try {
        const { invoices, total } = await fetchInvoices(); // Get both invoices and total
        const sortedInvoices = invoices.sort((a: Invoice, b: Invoice) => a.id.localeCompare(b.id));
        
        setInvoices(sortedInvoices); // Set sorted invoices
        setTotalInvoices(total);     // Set total number of invoices
      } catch (err) {
        setError('Failed to fetch invoices.');
      } finally {
        setLoading(false); // Ensure loading is set to false after fetch completes
      }
    };
  
    fetchInvoicesData();
  }, []); // Empty dependency array means this runs once when the component mounts
  

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="overflow-x-auto">
      {/* Main body with table name and buttons */}
      <table className="min-w-fit divide-y divide-gray-200 text-sm">
        <tbody className="bg-transparent divide-y divide-gray-200">
          <tr>
            <td className="px-4 py-2 whitespace-nowrap text-sm font-bold text-gray-700">
              Invoice Table
            </td>
            <td className="px-5 py-2 whitespace-nowrap text-sm text-gray-500"></td>
            <td className="px-40 py-2 whitespace-nowrap text-right text-sm font-medium flex items-end space-x-2">
              <button
                onClick={() => sortData("id")}
                className="flex items-center rounded-lg bg-gray-200 px-3 py-1 text-xs text-gray-500 shadow-sm hover:bg-gray-400 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                <FontAwesomeIcon icon={faSortAlphaUp} className="h-3 w-3 mr-1" />
                <span>Sort</span>
              </button>
              <button className="flex items-center rounded-lg bg-gray-200 px-3 py-1 text-xs text-gray-500 shadow-sm hover:bg-gray-400 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
                <FontAwesomeIcon icon={faFilter} className="h-3 w-3 mr-1" />
                <span>Filter</span>
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      {/* DataTable */}
      <table className="min-w-fit text-sm">
        <thead className="bg-sky-100">
          <tr>
            <th
              scope="col"
              className="px-4 py-2 text-left text-xs font-medium text-gray-950 tracking-wider cursor-pointer"
              onClick={() => sortData("id")}
            >
              Invoice No
            </th>
            <th
              scope="col"
              className="px-5 py-2 text-left text-xs font-medium text-gray-950 tracking-wider cursor-pointer"
              onClick={() => sortData("customer")}
            >
              Customer
            </th>
            <th className="px-10 py-2 text-left text-xs font-medium text-gray-950 tracking-wider">
              Payment Method
            </th>
            <th
              scope="col"
              className="px-10 py-2 text-left text-xs font-medium text-gray-950 tracking-wider cursor-pointer"
              onClick={() => sortData("payment")}
            >
              Payment(Rs.)
            </th>
            <th className="px-5 py-2 text-left text-xs font-medium text-gray-950 tracking-wider">
              Record
            </th>
          </tr>
        </thead>
        <tbody className="bg-transparent min-w-fit">
          {paginatedData.map((invoice) => (
            <tr key={invoice.id}>
              <td className="px-4 py-1 whitespace-nowrap text-xs text-gray-500">
                {invoice.invoiceId}
              </td>
              <td className="px-5 py-1 whitespace-nowrap text-xs text-gray-500">
                {invoice.customer.name}
              </td>
              <td className="px-10 py-1 whitespace-nowrap text-xs text-gray-500">
                {invoice.paymentMethod}
              </td>
              <td className="px-5 py-1 whitespace-nowrap text-xs text-gray-500">
                {invoice.payment}.00
              </td>
              <td className="px-5 py-1 whitespace-nowrap text-xs text-gray-500">
                {invoice.note}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="flex justify-between mt-4">
        <button
          onClick={handlePreviousPage}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
        >
          Previous
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button
          onClick={handleNextPage}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default InvoiceTable;
