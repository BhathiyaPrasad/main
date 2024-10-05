"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { fetchBrands } from "@/services/brandService";
import { fetchCategories } from "@/services/categoryService";
import { fetchVariants } from "@/services/variantService";
import { Label } from "@radix-ui/react-label";
import { Plus, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";

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
  const [activeRepresentative, setActiveRepresentative] = useState<
    Representative | undefined
  >(undefined);

  const [supplier, setSupplier] = useState<Supplier[]>([]);
  const [category, setCategory] = useState<Category[]>([]);
  const [brand, setBrand] = useState<Brand[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [variant, setVariant] = useState<Variant[]>([]);
  const [variantSets, setVariantSet] = useState<VariantSets[]>([]);
  const [selectedVariants, setSelectedVariants] = useState<string[]>([]);
  const [selectedBrand, setSelectedBrand] = useState("");

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
        },
      ],
    },
  });

  // Fetch supplier data from the API
  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const response = await fetchSuppliers(); // Fetch suppliers from the API
        setSupplier(response);
      } catch (error) {
        console.log("Failed to fetch suppliers.", error);
      }
    };

    fetchSuppliers();
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
    remove: removeInvoiceItems,
    update: updateInvoiceItems,
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
                      {REPRESENTATIVES.map((rep: any) => (
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


<!--         {/* Items Table */}
        <table className="w-auto">
          <thead>
            <tr>
              <th className="px-1 py-1 text-left text-xs font-medium text-gray-950 tracking-wider">
                Category
              </th>
              <th className="px-1 py-1 text-left text-xs font-medium text-gray-950 tracking-wider">
                Brand
              </th>
              <th className="px-1 py-1 text-left text-xs font-medium text-gray-950 tracking-wider">
                Variant
              </th>
              <th className="px-1 py-1 text-left text-xs font-medium text-gray-950 tracking-wider">
                Value
              </th>
              <th className="px-1 py-1 text-left text-xs font-medium text-gray-950 tracking-wider">
                Qty
              </th>
              <th className="px-1 py-1 text-left text-xs font-medium text-gray-950 tracking-wider">
                GRN Type
              </th>
              <th className="px-1 py-1 text-left text-xs font-medium text-gray-950 tracking-wider">
                Cost Price (Rs.)
              </th>
              <th className="px-1 py-1 text-left text-xs font-medium text-gray-950 tracking-wider">
                Amount (Rs.)
              </th>
              <th className="px-1 py-1 text-left text-xs font-medium text-gray-950 tracking-wider">
                Selling Price (Rs.)
              </th>
              <th className="px-1 py-1"></th>
            </tr>
          </thead>
          <tbody>
<!--             {fields.map((field, index) => (
              <tr key={field.id}>
                <td className="px-1 py-1 w-auto">
                <select
                className="w-32 px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                {...register(`items.${index}.Category`, {
                  required: "Category is required",
                })}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="">Select Category</option>
                {category.map((item) => (
                  <option key={item.id} value={item.id}>
                   {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
                  </option>
                ))}
              </select> -->
              {/* {errors.items?.[index]?.Category && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.items[index]?.Category?.message}
                </p>
              )} */}
<!--             </td>
            <td className="px-1 py-1 w-auto">
              <select
                className="w-32 px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                {...register(`items.${index}.brand`, {
                  required: "Brand is required",
                })}
                onChange={(e) => setSelectedBrand(e.target.value)}
              >
                <option value="">Select Brand</option>
                {brand.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
                  </option>
                ))}
              </select>
              {errors.items?.[index]?.brand && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.items[index]?.brand?.message}
                </p>
              )}
            </td>
                <td className="px-1 py-1 w-auto">
                  <select
                    className="w-32 px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    {...register(`items.${index}.variant`, {
                      required: "Variant is required",
                    })}
                  >
                    <option value="">Select Variant</option>
                    {/* Add brands here */}
                  </select>
                  {errors.items?.[index]?.variant && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.items[index]?.variant?.message}
                    </p>
                  )}
                </td>
                <td className="px-1 py-1 w-auto">
              <select
                className="w-32 px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                {...register(`items.${index}.variant`, {
                  required: "Variant is required",
                })}
                onChange={(e) => setSelectedVariants(e.target.value)}
              >
                <option value="">Select Variant</option>
                {variantSets.map((item) => (
                  <option key={item.id} value={item.id}>
                 {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
                  </option>
                ))}
              </select>
              {errors.items?.[index]?.variant && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.items[index]?.variant?.message}
                </p>
              )}
            </td>
                <td className="px-1 py-1 w-auto">
                  <input
                    type="number"
                    className="w-12 px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    {...register(`items.${index}.quantity`, {
                      required: "Quantity is required",
                    })}
                  />
                  {errors.items?.[index]?.quantity && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.items[index]?.quantity?.message}
                    </p>
                  )}
                </td>
                <td className="px-1 py-1 w-auto">
                  <select
                    className="w-32 px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    {...register(`items.${index}.grnType`, {
                      required: "GRN Type is required",
                    })}
                  >
                    <option value="General">General</option>
                    <option value="Special">Style</option>
                  </select>
                  {errors.items?.[index]?.grnType && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.items[index]?.grnType?.message}
                    </p>
                  )}
                </td>
                <td className="px-1 py-1 w-auto">
                  <input
                    className="w-32 px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    {...register(`items.${index}.costPrice`, {
                      required: "Cost Price is required",
                    })}
                  />
                  {errors.items?.[index]?.costPrice && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.items[index]?.costPrice?.message}
                    </p>
                  )}
                </td>
                <td className="px-1 py-1 w-auto">
                  <input
                    className="w-32 px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    {...register(`items.${index}.amount`, {
                      required: "Amount is required",
                    })}
                  />
                  {errors.items?.[index]?.amount && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.items[index]?.amount?.message}
                    </p> )}
                  
                </td>
                <td className="px-1 py-1 w-auto">
                  <input
                    className="w-32 px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    {...register(`items.${index}.sellingPrice`, {
                      required: "Selling Price is required",
                    })}
                  />
                  {errors.items?.[index]?.sellingPrice && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.items[index]?.sellingPrice?.message}
                    </p>
                  )}
                </td>
                <td className="px-1 py-1">
                  <button
                    type="button"
                    onClick={() => remove(index)}
                    className="text-red-500"
                  >
                    <AiFillCloseSquare size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table> --> -->

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
                  <TableRow key={`${row.id}-${i}`} className="border-none">
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
                                {item.name.charAt(0).toUpperCase() +
                                  item.name.slice(1)}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </TableCell>
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
                                {item.name.charAt(0).toUpperCase() +
                                  item.name.slice(1)}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </TableCell>
                    {/* variants cell */}
                    <TableCell className="py-2">
                      <Select
                        onValueChange={(value) => {
                          setSelectedVariants(value);
                          updateInvoiceItems(i, {
                            ...row, // Only update the variantId
                            variantId: value,
                          });
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
                                {item.name.charAt(0).toUpperCase() +
                                  item.name.slice(1)}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell className="text-right py-2">
                      <Input className="text-right" />
                    </TableCell>
                    <TableCell className="text-right py-2">
                      <Input className="text-right" />
                    </TableCell>
                    <TableCell className="text-right py-2">
                      <Input className="text-right" />
                    </TableCell>
                    <TableCell className="py-2">
                      <Input
                        onChange={(e) =>
                          updateInvoiceItems(i, {
                            ...row, // Only update the discount field
                            maxDiscount: e.target.value,
                          })
                        }
                        className="text-right"
                        value={row.maxDiscount} // Controlled input
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
