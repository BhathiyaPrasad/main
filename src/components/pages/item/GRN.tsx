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
import { fetchSuppliers } from "@/services/supplierService";
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
    sellingPrice: string;
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


const REPRESENTATIVES: Representative[] = [
  {
    id: "698f329b-7555-4c3e-9a7a-b19869a96b86",
    name: "Urvi Konda",
    phone: "+94771234567",
    email: "bijuhanda@yahoo.com",
    description: "Quis odio reiciendis cum.",
    createdAt: "2021-12-14T00:21:06",
    updatedAt: "2024-01-27T15:43:15",
    supplier: {
      name: "Butala, Saxena and Chanda",
      code: "SUP508",
      id: "08e48d08-7f52-44c5-afcd-1525349bc804",
    },
  },
  {
    id: "484071d5-7216-4d85-9419-3227a7d4555c",
    name: "Divyansh Doshi",
    phone: "+94772234567",
    email: "tejaskade@krish-mane.com",
    description: "Fugit culpa eos repudiandae repudiandae veniam.",
    createdAt: "2022-02-11T08:53:52",
    updatedAt: "2024-01-12T02:23:10",
    supplier: {
      name: "Bains LLC",
      code: "SUP593",
      id: "8ac7c107-4a47-4592-bfe8-7e868844e934",
    },
  },
  {
    id: "22a86859-ff29-4b80-8b51-8f30fb355e32",
    name: "Nirvaan Bahl",
    phone: "+94773234567",
    email: "jcontractor@gmail.com",
    description: "Deleniti dolores veniam sint.",
    createdAt: "2021-12-12T13:45:47",
    updatedAt: "2024-01-01T14:01:25",
    supplier: {
      name: "Dass Ltd",
      code: "SUP784",
      id: "8c1d343c-05d7-478d-8b2e-472c099e647a",
    },
  },
  {
    id: "81ab3e89-5834-43d1-b6dd-57bbd48559c2",
    name: "Damini Kota",
    phone: "+94774234567",
    email: "swaminathansaksham@yahoo.com",
    description: "Aperiam necessitatibus veniam eveniet.",
    createdAt: "2022-01-24T22:18:17",
    updatedAt: "2024-08-31T20:13:14",
    supplier: {
      name: "Aurora, Sachdev and Mahal",
      code: "SUP239",
      id: "f8e311b1-21e2-4a35-a02c-7608776c163d",
    },
  },
  {
    id: "1b4dbf07-47c7-4cc7-a6fe-3dee8e88917b",
    name: "Damini Chaudhuri",
    phone: "+94775234567",
    email: "daliajivika@hotmail.com",
    description: "Voluptatum nulla harum ipsam velit error.",
    createdAt: "2022-06-07T04:16:36",
    updatedAt: "2024-06-29T03:53:16",
    supplier: {
      name: "Chahal-Wable",
      code: "SUP853",
      id: "9fae862a-a0f5-4b16-a9a8-443e3546f7df",
    },
  },
];

const INITIAL_GRN_ITEM = {
  categoryId: "banana",
  brandId: "apple",
  variantIds: [""],
  qty: 1,
  sellingPrice: "",
  buyingPrice: "",
  maxDiscount: "0",
};

const INITIAL_SERVICE = {
  name: "",
  serviceCharge: "",
  discount: "0",
};

const CreateInvoice = () => {
  const [searchRepresentative, setSearchRepresentative] = useState("");
  const [activeRepresentative, setActiveRepresentative] = useState< Representative | undefined>(undefined);
  const [supplier, setSupplier] = useState<Supplier[]>([]);
  const router = useRouter();

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
          sellingPrice: "",
          maxDiscount: 0,
        },
      ],
    },
  });

  // Fetch supplier data from the API
  useEffect(() => {
    const fetchSuppliersData = async () => {
      try {
        const suppliersData = await fetchSuppliers(); // Fetch suppliers from the API
        setSupplier(suppliersData);
      } catch (error) {
        console.log("Failed to fetch suppliers.", error);
      }
    };

    fetchSuppliersData();
  }, []);

 
  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
  });

  const onSubmit = (data: FormValues) => {
    console.log(data);
  };

  const form = useForm({
    defaultValues: {
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
                      {supplier.map((rep: any) => (
                        <li key={rep.phone}>
                          <button
                            className="py-1 text-start"
                            onClick={() => setActiveRepresentative(rep)}
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