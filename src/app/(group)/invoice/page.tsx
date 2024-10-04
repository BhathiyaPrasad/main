"use client";
import InvoiceItemRow from "@/components/tables/CreateInvoice";
import Top from "@/components/Top";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { fetchCustomers } from "@/services/customerServices";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";

type InvoiceItem = {
  categoryId: string;
  brandId: string;
  variantIds: string[];
  qty: number;
  rate: string;
  amount: string;
  discount: string;
};

interface Customer {
  id: string,
  name: string,
  address: string,
  phone: string,
  email: string,
  description: string,
  createdAt: string,
  updatedAt: string
}

const INITIAL_INVOICE_ITEM = {
  categoryId: "Select a category",
  brandId: "Select a brand",
  variantIds: [""],
  variantSetsId: "",
  qty: 1,
  rate: "",
  amount: "",
  discount: "0",

};

const INITIAL_SERVICE = {
  name: "",
  serviceCharge: "",
  discount: "0",
};

export default function Invoice() {
  const [isMounted, setIsMounted] = useState(false);
  const [customer, setCustomer] = useState<Customer[]>([]);
  const [date, setDate] = useState<Date | null>(null);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('CASH');
  const [note, setNote] = useState('');
  const [totalPayment, setTotalPayment] = useState('');
  const [discount, setDiscount] = useState('');
  useEffect(() => {
    setIsMounted(true);
  }, []);
  useEffect(() => {
    const fetchCustomerData = async () => {
      try {
        const customers = await fetchCustomers(); // Use selectedCategory directly
        setCustomer(customers);
      } catch (err) {
        console.log("Error fetching customers:", err);
      }
    };

    fetchCustomerData(); // Call the function to fetch data
  }, []);
  const form = useForm({
    defaultValues: {
      userId: '',
      customerId: customer,
      note: '',
      paymentMethod: paymentMethod,
      payment: 0,
      discountType: '',
      discount: 0,
      invoiceItems: [INITIAL_INVOICE_ITEM],
      services: [INITIAL_SERVICE],
    },
  });

  const {
    fields: invoiceItems,
    append: appendInvoiceItems,
    remove: removeInvoiceItems,
    update: updateInvoiceItems,
  } = useFieldArray({
    name: "invoiceItems",
    control: form.control,
  });



  const {
    fields: services,
    append: appendServices,
    remove: removeServices,
    update: updateServices,
  } = useFieldArray({
    name: "services",
    control: form.control,
  });

  const [searchCustomer, setSearchCustomer] = useState<string>("");
  const [activeCustomer, setActiveCustomer] = useState<Customer | undefined>();

  useEffect(() => {
    if (selectedCustomer) {
      form.reset({
        customer: selectedCustomer,
        invoiceItems: [INITIAL_INVOICE_ITEM],
        services: [INITIAL_SERVICE],
        paymentMethod: paymentMethod,
        note:note,
        
      });
    }
  }, [selectedCustomer, form, paymentMethod]);

  console.log({ invoiceItems })

  const handleCustomerSelect = (customer) => {
    setSelectedCustomer(customer);
  };
  const router = useRouter();
  console.log('Customer', activeCustomer);
  console.log('dataset', form.getValues())


  const handlePaymentChange = (value) => {
    setPaymentMethod(value);
  };

  const handleNoteChange = (e) => setNote(e.target.value);
  const handleTotalPaymentChange = (e) => setTotalPayment(e.target.value);
  const handleDiscountChange = (e) => setDiscount(e.target.value);

  return (
    <div className="flex flex-col w-full p-4">
      <div className="flex justify-between items-center">
        <div className="text-lg font-bold">Invoice</div>
        <Top />
      </div>

      <div className="flex bg-background rounded flex-col p-4 gap-10 mt-5 overflow-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-10">
            <div className="flex flex-col gap-2">
              <Label>Customer Name</Label>
              <div className="flex gap-2 relative">
                <Input
                  onChange={(e) => {

                    setSearchCustomer(e.target.value);
                    setActiveCustomer(undefined);
                  }}
                />
                <Button size="icon" onClick={() => router.push("/customer")}>
                  <Plus />
                </Button>
                <ul
                  className={cn(
                    "absolute flex flex-col gap-2 bg-background drop-shadow shadow-lg w-full p-4 mt-12 text-sm transition-all duration-200",
                    !activeCustomer && searchCustomer.length > 5
                      ? "opacity-100 z-10"
                      : "opacity-0 -z-10"
                  )}
                >
                  {customer.map((customer: any) => (
                    <li key={customer.phone}>
                      <button
                        className="py-1 text-start"
                        onClick={() => { setActiveCustomer(customer); handleCustomerSelect(customer) }}
                      >
                        {customer.name} - {customer.phone}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <Label>Selected Customer</Label>
              {activeCustomer?.name} - {activeCustomer?.phone}
            </div>
          </div>

          <div className="flex flex-col gap-2 text-end">
            <Label className="opacity-90">Balance</Label>
            <p className="text-4xl font-bold">5000.00</p>
          </div>
        </div>

        <div className="border rounded">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-60">Category</TableHead>
                <TableHead className="w-60">Brand</TableHead>
                <TableHead className="w-60">VariantIds</TableHead>
                <TableHead className="text-right">Types</TableHead>
                <TableHead className="text-right">Qty</TableHead>
                <TableHead className="text-right">Price (Rs.)</TableHead>
                <TableHead className="text-right w-20">Discount</TableHead>
                <TableHead className="text-right">Line Toatal (Rs.)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoiceItems.map((row, i) => (
                <InvoiceItemRow
                  key={`${row.id}-${i}`}
                  row={row}
                  i={i}
                  updateInvoiceItems={updateInvoiceItems}
                  removeInvoiceItems={removeInvoiceItems}

                />
              ))}
              {/* Add Item Button */}
              <TableRow className="hover:bg-background">
                <TableCell colSpan={7} className="pt-0">
                  <Button
                    variant="outline"
                    className="w-full uppercase font-bold text-foreground/60 hover:text-foreground/70"
                    onClick={() => appendInvoiceItems(INITIAL_INVOICE_ITEM)}
                  >
                    Add Item +
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>

          </Table>
        </div>

        {/* {isMounted && (
          <table className="w-1/2">
            <tr>
              <th className="text-start">
                <Label>Service Name</Label>
              </th>
              <th className="text-start">
                <Label>Service Charge (Rs.)</Label>
              </th>
              <th className="text-start">
                <Label>Discount</Label>
              </th>
            </tr>
            {services.map((row, i) => (
              <tr key={row.id} className="relative">
                <td className="pe-2 py-2">
                  <Input />
                </td>
                <td className="pe-2 py-2">
                  <Input className="text-right" />
                </td>
                <td className="flex items-center py-2">
                  <Input className="text-right" />
                </td>
                <button
                  className="absolute -end-9 top-4"
                  onClick={() => {
                    if (services.length > 1) removeServices(i);
                  }}
                >
                  <X className="text-destructive w-5 h-5" />
                </button>
              </tr>
            ))}
            <tr>
              <td colSpan={3}>
                <Button
                  variant="outline"
                  className="w-full uppercase font-bold text-foreground/60 hover:text-foreground/70"
                  onClick={() => appendServices(INITIAL_SERVICE)}
                >
                  Add Service +
                </Button>
              </td>
            </tr>
          </table>
        )} */}

    

            <div className="flex flex-col">

  <div className="grid grid-cols-2">
        <div className="flex flex-col gap-2">
        <Label>Note</Label>
        <Textarea 
          placeholder="Type here..." 
          className="h-full" 
          value={note} 
          onChange={handleNoteChange} 
        />
      </div>

      <div className="grid grid-cols-2 ms-10 gap-10">
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <Label>Total Payment</Label>
            <Input 
              className="text-end" 
              value={totalPayment} 
              onChange={handleTotalPaymentChange} 
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label>Discount</Label>
            <Input 
              className="text-end" 
              value={discount} 
              onChange={handleDiscountChange} 
            />
          </div>
       </div>


              {/* <Tabs defaultValue="cash">
                <TabsList className="w-full">
                  <TabsTrigger value="cash">Cash</TabsTrigger>
                  <TabsTrigger value="cheque">Cheque</TabsTrigger>
                  <TabsTrigger value="credit">Credit</TabsTrigger>
                </TabsList>
                <TabsContent value="cash" className="px-1 flex flex-col gap-5">
                  <div className="flex flex-col gap-2"> */}
              {/* <Label>Amount</Label>
                    <Input />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label>Balance Amount</Label>
                    <Input />
                  </div>
                </TabsContent>
                <TabsContent
                  value="cheque"
                  className="px-1 gap-5 flex flex-col"
                >
                  <div className="flex flex-col gap-2">
                    <Label>Cheque Number</Label>
                    <Input />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label>Bank Details</Label>
                    <Input />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label>Due Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "justify-start text-left font-normal border border-input",
                            !date && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {date ? (
                            format(date, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={setDate}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </TabsContent>
                <TabsContent
                  value="credit"
                  className="px-1 gap-5 flex flex-col"
                >
                  <div className="flex flex-col gap-2">
                    <Label>Advanced Amount</Label>
                    <Input />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label>Due Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "justify-start text-left font-normal border border-input",
                            !date && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {date ? (
                            format(date, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={setDate}
                        />
                      </PopoverContent>
                    </Popover> */}
              {/* </div>
                </TabsContent>
              </Tabs> */}

              <Tabs defaultValue="CASH" onValueChange={handlePaymentChange}>
                <TabsList className="w-full">
                  <TabsTrigger value="CASH">Cash</TabsTrigger>
                  <TabsTrigger value="CHEQUE">Cheque</TabsTrigger>
                  <TabsTrigger value="CREDIT">Credit</TabsTrigger>
                </TabsList>
              </Tabs>
               <div className="grid grid-cols-3 gap-3 mt-5">
                <Button variant="secondary">Cancel</Button>
                <Button variant="outline">Print</Button>
                <Button onClick={() => console.log(form.getValues())}>
                  Save
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
