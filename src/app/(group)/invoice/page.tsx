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
import { addInvoice } from "@/services/invoiceService";
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
  stockId:string;
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
  discountType:"AMOUNT",
  stockId: "",
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
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [paymentMethod, setPaymentMethod] = useState('CASH');
  const [note, setNote] = useState('');
  const [totalPayment, setTotalPayment] = useState(0);
  const [discount, setDiscount] = useState(0);
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
      customerId: '',
      note: note,
      paymentMethod: paymentMethod,
      payment: totalPayment,
      discountType: 'AMOUNT',
      discount: discount,
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
        customerId: selectedCustomer?.id || '',
        invoiceItems: [INITIAL_INVOICE_ITEM],
        services: [INITIAL_SERVICE],
        paymentMethod: paymentMethod,
        note: note,
        payment: totalPayment

      });
    }
  }, [selectedCustomer, form, paymentMethod, totalPayment, note]);

  console.log({ invoiceItems })

  const handleCustomerSelect = (customer:Customer) => {
    setSelectedCustomer(customer);
  };
  const router = useRouter();
  console.log('Customer', activeCustomer);
  console.log('dataset', form.getValues())


  const handlePaymentChange = (value: string) => {
    setPaymentMethod(value);
  };

  const handleNoteChange = (e: any) => setNote(e.target.value);
  const handleTotalPaymentChange = (e: any) => setTotalPayment(e.target.value);
  const handleDiscountChange = (e: any) => setDiscount(e.target.value);
  const handlePaymentMethodChange = (value: string) => {
    setPaymentMethod(value);
    form.setValue("paymentMethod", value); // Update payment method in form
  };


  const handleSubmit = async () => {
    const formData = form.getValues();

    // Structure the invoice items
    const invoiceItemsPayload = formData.invoiceItems.map((item: InvoiceItem) => ({
      categoryId: item.categoryId,
      brandId: item.brandId,
      stockId:item.stockId,
      variantIds: item.variantIds,
      qty: item.qty,
      rate: item.rate,
      amount: item.amount,
      discount: parseFloat(item.discount),
      discountType:"AMOUNT"
    }));

    // Prepare the body for the invoice
    const invoicePayload = {
      customerId: selectedCustomer?.id || "",
      note: formData.note,
      paymentMethod: formData.paymentMethod,
      payment: 0,
      discountType: "AMOUNT",
      discount: 0,
      items: invoiceItemsPayload,
      services: formData.services.map((service) => ({
        name: service.name,
        serviceCharge: service.serviceCharge,
        discount: service.discount,
      })),
    };

    console.log('payload', invoicePayload);

    // Send the payload to the backend
    try {
      const result = await addInvoice(invoicePayload);
      if (result) {
        console.log("Invoice created successfully", result);
      } else {
        console.error("Failed to create invoice");
      }
    } catch (error) {
      console.error("Error while creating invoice:", error);
    }
  };

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
        <div className="flex flex-col">

          <div className="grid grid-cols-2">
            <div className="flex flex-col gap-2">
              <Label>Note</Label>
              <Textarea
                placeholder="Type here..."
                className="h-full"
                {...form.register("note", {
                  value: note,
                  onChange: (e) => setNote(e.target.value)
                })}
              />

            </div>

            <div className="grid grid-cols-2 ms-10 gap-10">
              <div className="flex flex-col gap-5">
                <div className="flex flex-col gap-2">
                  <Label>Total Payment</Label>
                  <Input
                    className="text-end"
                    {...form.register("payment", {
                      value: totalPayment,
                      onChange: (e) => setTotalPayment(e.target.value)
                    })}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label>Discount</Label>
                  <Input
                    className="text-end"
                    {...form.register("discount", {
                      value: discount,
                      onChange: (e) => setDiscount(e.target.value)
                    })}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <Label>Payment Method</Label>
                <Tabs defaultValue={paymentMethod}>
                  <TabsList>
                    <TabsTrigger
                      value="CASH"
                      onClick={() => handlePaymentMethodChange("CASH")}
                    >
                      Cash
                    </TabsTrigger>
                    <TabsTrigger
                      value="CARD"
                      onClick={() => handlePaymentMethodChange("CARD")}
                    >
                      Card
                    </TabsTrigger>
                    <TabsTrigger
                      value="CHEQUE"
                      onClick={() => handlePaymentMethodChange("CHEQUE")}
                    >
                      Cheque
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
              <div className="grid grid-cols-3 gap-3 mt-5">
                <Button variant="secondary">Cancel</Button>
                <Button variant="outline">Print</Button>
                <Button onClick={handleSubmit}>
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