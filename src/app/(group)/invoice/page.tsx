"use client";
import Top from "@/components/Top";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { fetchBrands } from "@/services/brandService";
import { fetchCategories } from "@/services/categoryService";
import { fetchCustomers } from "@/services/customerServices";
import { fetchStock } from "@/services/stockService";
import { fetchVariants } from "@/services/variantService";
import { format } from "date-fns";
import { CalendarIcon, Plus, X } from "lucide-react";
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
  id:string,
  name:string,
  address:string,
  phone:string,
  email:string,
  description:string,
  createdAt:string,
  updatedAt:string
}

const INITIAL_INVOICE_ITEM = {
  categoryId: "banana",
  brandId: "apple",
  variantIds: [""],
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

const CUSTOMERS = [
  {
    name: "Nuwan Perera",
    phone: "0711234567",
  },
  {
    name: "Kasun Fernando",
    phone: "0779876543",
  },
  {
    name: "Dinuka Jayasinghe",
    phone: "0702345678",
  },
  {
    name: "Ishara Silva",
    phone: "0728765432",
  },
  {
    name: "Ruwan Wickramasinghe",
    phone: "0753456789",
  },
];

interface Brand {
  name: string;
  code: string;
  id: string;
}
interface Category {
  name: string;
  code: string;
  id: string;
}

interface Variant {
  name: string;
  code: string;
  id: string;
}
interface VariantSets {
  name: string;
  code: string;
  id: string;
}

export default function Invoice() {
  const [isMounted, setIsMounted] = useState(false);
  const [category, setCategory] = useState<Category[]>([]);
  const [brand, setBrand] = useState<Brand[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [variant, setVariant] = useState<Variant[]>([]);
  const [variantSets, setVariantSet] = useState<VariantSets[]>([]);
  const [selectedVariants, setSelectedVariants] = useState([]);
  const [stockData, setStockData] = useState([]);
  const [customer, setCustomer] = useState<Customer[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState<string>("");
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

  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        const { categories } = await fetchCategories();
        setCategory(categories);
      } catch (err) {
        console.log(err);
      }
    };
    fetchCategoryData();
  }, []);

  useEffect(() => {
    const fetchBrandData = async () => {
      try {
        const { brands } = await fetchBrands();
        setBrand(brands);
      } catch (err) {
        console.log(err);
      }
    };
    fetchBrandData();
  }, []);

  useEffect(() => {
    const fetchVariantData = async () => {
      if (!selectedCategory) return; // Avoid making the call if no category is selected
      try {
        const { variants, variantsSet } = await fetchVariants(selectedCategory); // Use selectedCategory directly
        setVariant(variants);
        setVariantSet(variantsSet);
      } catch (err) {
        console.log("Error fetching variants:", err);
      }
    };

    fetchVariantData(); // Call the function to fetch data
  }, [selectedCategory]);

  useEffect(() => {
    const fetchStockData = async () => {
      if (!selectedCategory && !selectedVariants) return; // Avoid making the call if no category nor variant is selected
      try {
        const { stock } = await fetchStock(selectedCategory, selectedVariants); // Use selectedCategory & variant directly
        console.log(stock);
        setStockData(stock);
      } catch (err) {
        console.log("Error fetching variants:", err);
      }
    };

    fetchStockData(); // Call the function to fetch data
  }, [selectedCategory, selectedVariants]);

  const form = useForm({
    defaultValues: {
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
  const [date, setDate] = useState<Date>();

  const router = useRouter();

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
                  {CUSTOMERS.map((customer:any) => (
                    <li key={customer.phone}>
                      <button
                        className="py-1 text-start"
                        onClick={() => setActiveCustomer(customer)}
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
                <TableHead className="text-right">Qty</TableHead>
                <TableHead className="text-right">Rate (Rs.)</TableHead>
                <TableHead className="text-right">Amount (Rs.)</TableHead>
                <TableHead className="text-right w-60">Discount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
  {invoiceItems.map((row, i) => (
    <TableRow key={`${row.id}-${i}`} className="border-none">
      {/* category cell */}
      <TableCell className="py-2">
        <Select
          onValueChange={(value) => {
            setSelectedCategory(value);
            updateInvoiceItems(i, {
              ...row, // Only update the categoryId
              categoryId: value,
            });
          }}
          value={row.categoryId} // Controlled input
        >
          <SelectTrigger>
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {category.map((item) => (
                <SelectItem key={item.id} value={item.id}>
                  {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </TableCell>
      {/* brand cell */}
      <TableCell className="py-2">
        <Select
          onValueChange={(value) =>
            updateInvoiceItems(i, {
              ...row, // Only update the brandId
              brandId: value,
            })
          }
          value={row.brandId} // Controlled input
        >
          <SelectTrigger>
            <SelectValue placeholder="Select a brand" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {brand.map((item) => (
                <SelectItem key={item.id} value={item.id}>
                  {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </TableCell>
      {/* variants cell */}
      <TableCell className="py-2">
        <Select
          onValueChange={(value) =>{
            setSelectedVariants(value)
            updateInvoiceItems(i, {
              ...row, // Only update the variantId
              variantId: value,
            })
          }}
          value={row.variantId} // Controlled input
        >
          <SelectTrigger>
            <SelectValue placeholder="Select a variant" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {variant.map((item) => (
                <SelectItem key={item.id} value={item.id}>
                  {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </TableCell>
      <TableCell className="text-right py-2">0</TableCell>
      <TableCell className="text-right py-2">0</TableCell>
      <TableCell className="text-right py-2">0</TableCell>
      <TableCell className="py-2">
        <Input
          onChange={(e) =>
            updateInvoiceItems(i, {
              ...row, // Only update the discount field
              discount: e.target.value,
            })
          }
          className="text-right"
          value={row.discount} // Controlled input
        />
      </TableCell>
      <TableCell className="py-2">
        <button
          className="float-right"
          onClick={() => {
            if (invoiceItems.length > 1) removeInvoiceItems(i);
          }}
        >
          <X className="text-destructive w-5 h-5" />
        </button>
      </TableCell>
    </TableRow>
  ))}
  <TableRow className="hover:bg-background">
    {/* category cell */}
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

        {isMounted && (
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
        )}

        <div className="grid grid-cols-2">
          <div className="flex flex-col gap-2">
            <Label>Note</Label>
            <Textarea placeholder="Type here..." className="h-full" />
          </div>

          <div className="grid grid-cols-2 ms-10 gap-10">
            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <Label>Total Payment</Label>
                <Input className="text-end" />
              </div>
              <div className="flex flex-col gap-2">
                <Label>Discount</Label>
                <Input className="text-end" />
              </div>
            </div>

            <div className="flex flex-col">
              <Tabs defaultValue="cash">
                <TabsList className="w-full">
                  <TabsTrigger value="cash">Cash</TabsTrigger>
                  <TabsTrigger value="cheque">Cheque</TabsTrigger>
                  <TabsTrigger value="credit">Credit</TabsTrigger>
                </TabsList>
                <TabsContent value="cash" className="px-1 flex flex-col gap-5">
                  <div className="flex flex-col gap-2">
                    <Label>Amount</Label>
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
                    </Popover>
                  </div>
                </TabsContent>
              </Tabs>

              <div className="grid grid-cols-3 gap-3">
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
