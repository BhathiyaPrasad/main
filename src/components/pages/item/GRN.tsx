"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { fetchReps } from "@/services/repService";
import { addStock } from "@/services/stockService"; // Ensure you import your stock API service
import { Label } from "@radix-ui/react-label";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import GRNItemRow from './../../tables/CreateStock';
interface FormValues {
  supplierName: string;
  grnNo: string;
  orderRecoveredBy: string;
  date: string;
  items: {
    Category: string;
    brand: string;
    variant: string;
    value: string;
    quantity: number;
    grnType: string;
    costPrice: string;
    amount: string;
    sellingPrice: number;
    maxDiscount: number,
  }[];
}

interface Supplier {
  name: string;
  code: string;
  id: string;
}

interface Representative {
  id: string;
  name: string;
  phone: string;
  email: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  supplier: Supplier;
}

const INITIAL_GRN_ITEM = {
  categoryId: "banana",
  brandId: "apple",
  variantIds: [""],
  variantId: [""],
  qty: 1,
  sellingPrice: "",
  buyingPrice: 0,
  maxDiscount: "0",
};

interface Rep {
  id: string;
  name: string;
  phone: string;
  email: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  supplier: Supplier;
}

interface StockItemPayload {
  categoryId: string;
  
  // other fields
}
const CreateInvoice = () => {
  const [searchRepresentative, setSearchRepresentative] = useState("");
  const [activeRepresentative, setActiveRepresentative] = useState<Representative | undefined>(undefined);
  const [rep, setRef] = useState<Supplier[]>([]);
  const [totalPayment, setTotalPayment] = useState(0);
  const [note, setNote] = useState('');
  const router = useRouter();
  const [selectedRep, setSelectedRep] = useState<Rep | undefined>(
    undefined
  );
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<FormValues>({
    defaultValues: {
      items: [
        {
          Category: "",
          brand: "",
          variant: "",
          value: "",
          quantity: 1,
          grnType: "General",
          costPrice: "",
          amount: "",
          sellingPrice: 0,
          maxDiscount: 0,
        },
      ],
    },
  });

  // Fetch supplier data from the API
  useEffect(() => {
    const fetchRepsData = async () => {
      try {
        const fetchData = await fetchReps(); // Fetch suppliers from the API
        setRef(fetchData);
      } catch (error) {
        console.log("Failed to fetch suppliers.", error);
      }
    };

    fetchRepsData();
  }, []);


  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
  });

  // const onSubmit = (data: FormValues) => {
  //   console.log(data);
  // };

  const form = useForm({
    defaultValues: {
      repId: '',
      note: '',
      payment: 0,
      invoiceItems: [INITIAL_GRN_ITEM],
    },
  });

  const {
    fields: invoiceItems,
    append: appendInvoiceItems,
    remove: removeGRNItems,
    update: updateGRNItems,
  } = useFieldArray({
    name: "invoiceItems",
    control: form.control,
  });
  const handleRepSelect = (rep: Rep) => {
    setSelectedRep(rep);
  };

  useEffect(() => {
    if (selectedRep) {
      form.reset({
        repId: selectedRep?.id || '',
       

      });
    }
  }, [selectedRep]);

  console.log({ invoiceItems })

  const onSubmit = async (formData: FormValues) => {
   
    const stockItemsPayloads: StockItemPayload[] = invoiceItems.map(item => ({
      categoryId: item.categoryId,
      variantIds: [item.variantId], // Assuming variantIds is an array with a valid cuid
      discountType: "AMOUNT", // Set this as per your requirement
      maxDiscount: Number(item.maxDiscount) || 0, // Optional
      qty: item.qty,
      buyingPrice: Number(item.buyingPrice), // Convert buyingPrice to a number
      sellingPrice: Number(item.sellingPrice),
      
    }));
  
    // Prepare the stock payload
    const stockPayload = {
      repId: selectedRep?.id || "", // Assuming you have a selectedRep with an id
      note: note || undefined, // Optional note from the state
      items: stockItemsPayloads,
    };
  
    console.log("Payload for Stock:", stockPayload);
  
    // Make API call to post the stock
    try {
      const result = await addStock(stockPayload);
      if (result) {
        console.log("Stock created successfully:", result);
        // Optionally, redirect or show a success message
      } else {
        console.error("Failed to create stock");
      }
    } catch (error) {
      console.error("Error while creating stock:", error);
    }
  };

  return (
    <div className="p-5">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-10">
          <h2 className="text-lg font-bold">Enter New Stock</h2>
          <div className="flex flex-col gap-10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-10">
                <div className="flex flex-col gap-2">
                  <Label>Select Representative</Label>
                  <div className="flex gap-2 relative">
                    <Input
                      onChange={(e) => {
                        setSearchRepresentative(e.target.value);
                        setActiveRepresentative(undefined);
                      }}
                    />
                    <Button
                      size="icon"
                      onClick={() => router.push("/supplier")}
                    >
                      <Plus />
                    </Button>
                    <ul
                      className={cn(
                        "absolute flex flex-col gap-2 bg-background drop-shadow shadow-lg w-full p-4 mt-12 text-sm transition-all duration-200",
                        !activeRepresentative && searchRepresentative.length > 5
                          ? "opacity-100 z-10"
                          : "opacity-0 -z-10"
                      )}
                    >
                      {rep.map((rep: any) => (
                        <li key={rep.phone}>
                          <button
                            className="py-1 text-start"
                            onClick={() => { setActiveRepresentative(rep); handleRepSelect(rep) }}
                          >
                            {rep.name} - {rep.phone}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {activeRepresentative && (
                  <div className="flex flex-col gap-2">
                    <Label>Selected Representative</Label>
                    {activeRepresentative?.name} - {activeRepresentative?.phone}
                  </div>
                )}
              </div>

              <div className="flex flex-col gap-2 text-end">
                <Label className="opacity-90">Balance</Label>
                <p className="text-4xl font-bold">5000.00</p>
              </div>
            </div>
          </div>

          <div className="border rounded">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-48">Brand</TableHead>
                  <TableHead className="w-48">Category</TableHead>
                  <TableHead className="w-48">VariantIds</TableHead>
                  <TableHead className="text-right w-28">Qty</TableHead>
                  <TableHead className="text-right w-36">
                    Cost Price (Rs.)
                  </TableHead>
                  <TableHead className="text-right w-36">
                    Selling Price (Rs.)
                  </TableHead>
                  <TableHead className="text-right w-36">
                    Max Discount
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {invoiceItems.map((row, i) => (
                  <GRNItemRow
                    key={`${row.id}-${i}`}
                    row={row}
                    i={i}
                    updateGRNItems={updateGRNItems}
                    removeGRNItems={removeGRNItems}

                  />
                ))}
                <TableRow className="hover:bg-background">
                  {/* category cell */}
                  <TableCell colSpan={7} className="pt-0">
                    <Button
                      variant="outline"
                      className="w-full uppercase font-bold text-foreground/60 hover:text-foreground/70"
                      onClick={() => appendInvoiceItems(INITIAL_GRN_ITEM)}
                    >
                      Add Item +
                    </Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>

          <div className="flex gap-20">
            <div className="flex w-3/4 flex-col gap-2">
              <Label>Note</Label>
              <Textarea placeholder="Type here..." className="h-full" />
            </div>

            <div className="flex w-1/4 items-end flex-col-reverse flex-col gap-5">
              <Button className="w-20">Save</Button>
              <Button variant="outline" className="w-20">
                Print
              </Button>
              <Button variant="secondary" className="w-20">
                Cancel
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateInvoice;