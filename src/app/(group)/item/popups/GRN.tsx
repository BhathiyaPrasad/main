"use client";
import React from "react";
import { AiFillCloseSquare } from "react-icons/ai";
import { PlusSquare } from "lucide-react";
import { useForm, useFieldArray } from "react-hook-form";

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

const CreateInvoice = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<FormValues>({
    defaultValues: {
      items: [{ Category: "", brand: "", variant: "", value: "", quantity: 1, grnType: "General", costPrice: "", amount: "", sellingPrice: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
  });

  const onSubmit = (data: FormValues) => {
    console.log(data);
  };

  return (
    <div className="p-5">
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Header Table */}
        <table className="w-full divide-y divide-gray-200 text-sm">
          <tbody className="bg-white divide-y divide-gray-200">
            <tr>
              <td className="px-4 py-1 whitespace-nowrap text-lg font-bold text-black">
                Enter New Stock
              </td>
            </tr>
          </tbody>
        </table>

        {/* Form Table */}
        <table className="w-full divide-y divide-gray-200">
          <tbody>
            <tr>
              <td className="px-1 py-1">
                <div className="flex items-start mb-4">
                  <div className="mr-4">
                    <h1 className="text-sm">Supplier Name</h1>
                    <input
                      type="text"
                      className="w-64 px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      {...register("supplierName", { required: "Supplier Name is required" })}
                    />
                    {errors.supplierName && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.supplierName.message}
                      </p>
                    )}
                  </div>
                </div>
              </td>
              <td className="px-4 py-1">
                <div className="flex items-start mb-4">
                  <div className="mr-4">
                    <h1 className="text-sm">GRN No</h1>
                    <input
                      type="text"
                      className="w-36 px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      {...register("grnNo", { required: "GRN No is required" })}
                    />
                    {errors.grnNo && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.grnNo.message}
                      </p>
                    )}
                  </div>
                </div>
              </td>
              <td className="px-40 py-1 flex justify-end">
                <div className="flex mb-4 w-auto justify-end">
                  <div className="mr-4 w-auto">
                    <h1 className="text-sm text-right">Balance</h1>
                    <h2 className="text-4xl font-bold text-black">10,000.00</h2>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <td className="px-1 py-1">
                <div className="flex items-start mb-4">
                  <div className="mr-4">
                    <h1 className="text-sm">Order Recovered By</h1>
                    <input
                      type="tel"
                      className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      {...register("orderRecoveredBy", { required: "Order Recovered By is required" })}
                    />
                    {errors.orderRecoveredBy && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.orderRecoveredBy.message}
                      </p>
                    )}
                  </div>
                </div>
              </td>
              <td className="px-4 py-1">
                <div className="flex items-start mb-4">
                  <div className="mr-4">
                    <h1 className="text-sm">Date</h1>
                    <input
                      type="date"
                      className="w-36 px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      {...register("date", { required: "Date is required" })}
                    />
                    {errors.date && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.date.message}
                      </p>
                    )}
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>

        {/* Items Table */}
        <table className="w-auto">
          <thead>
            <tr>
              <th className="px-1 py-1 text-left text-xs font-medium text-gray-950 tracking-wider">Category</th>
              <th className="px-1 py-1 text-left text-xs font-medium text-gray-950 tracking-wider">Brand</th>
              <th className="px-1 py-1 text-left text-xs font-medium text-gray-950 tracking-wider">Variant</th>
              <th className="px-1 py-1 text-left text-xs font-medium text-gray-950 tracking-wider">Value</th>
              <th className="px-1 py-1 text-left text-xs font-medium text-gray-950 tracking-wider">Qty</th>
              <th className="px-1 py-1 text-left text-xs font-medium text-gray-950 tracking-wider">GRN Type</th>
              <th className="px-1 py-1 text-left text-xs font-medium text-gray-950 tracking-wider">Cost Price (Rs.)</th>
              <th className="px-1 py-1 text-left text-xs font-medium text-gray-950 tracking-wider">Amount (Rs.)</th>
              <th className="px-1 py-1 text-left text-xs font-medium text-gray-950 tracking-wider">Selling Price (Rs.)</th>
              <th className="px-1 py-1"></th>
            </tr>
          </thead>
          <tbody>
            {fields.map((field, index) => (
              <tr key={field.id}>
                <td className="px-1 py-1 w-auto">
                  <select
                    className="w-32 px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    {...register(`items.${index}.Category`, { required: "Category is required" })}
                  >
                    <option value="">Select Category</option>
                    {/* Add categories here */}
                  </select>
                  {errors.items?.[index]?.Category && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.items[index]?.Category?.message}
                    </p>
                  )}
                </td>
                <td className="px-1 py-1 w-auto">
                  <select
                    className="w-32 px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    {...register(`items.${index}.brand`, { required: "Brand is required" })}
                  >
                    <option value="">Select Brand</option>
                    {/* Add brands here */}
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
                    {...register(`items.${index}.variant`, { required: "Variant is required" })}
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
                    {...register(`items.${index}.value`, { required: "Value is required" })}
                  >
                    <option value="">Select Value</option>
                    {/* Add brands here */}
                  </select>
                  {errors.items?.[index]?.value && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.items[index]?.value?.message}
                    </p>
                  )}
                </td>
                <td className="px-1 py-1 w-auto">
                  <input
                    type="number"
                    className="w-12 px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    {...register(`items.${index}.quantity`, { required: "Quantity is required" })}
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
                    {...register(`items.${index}.grnType`, { required: "GRN Type is required" })}
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
                    {...register(`items.${index}.costPrice`, { required: "Cost Price is required" })}
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
                    {...register(`items.${index}.amount`, { required: "Amount is required" })}
                  />
                  {errors.items?.[index]?.amount && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.items[index]?.amount?.message}
                    </p>
                  )}
                </td>
                <td className="px-1 py-1 w-auto">
                  <input
                    className="w-32 px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    {...register(`items.${index}.sellingPrice`, { required: "Selling Price is required" })}
                  />
                  {errors.items?.[index]?.sellingPrice && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.items[index]?.sellingPrice?.message}
                    </p>
                  )}
                </td>
                <td className="px-1 py-1">
                  <button type="button" onClick={() => remove(index)} className="text-red-500">
                    <AiFillCloseSquare size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <button
          type="button"
          onClick={() => append({ Category: "", brand: "", variant: "", value: "", quantity: 1, grnType: "General", costPrice: "", amount: "", sellingPrice: "" })}
          className="mt-4 flex items-center justify-center text-blue-500"
        >
          <PlusSquare className="mr-2" />
          Add Row
        </button>

        

          {/* Footer Section */}
          <div className="flex flex-row justify-between">
          <div className="flex-col p-5 w-full">
            <label className="block text-gray-700 text-sm mb-2 p-2">Note</label>
            <textarea
              id="textarea"
              name="textarea"
              className="mt-1 block w-full h-fit px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              rows={5}
              placeholder="Type a description..."
              {...register("note")}
            />
          </div>

          <div className="flex-col p-5">
            <div className="flex flex-col">
              <div className="p-5">
                <button
                  type="button"
                  className="flex items-center px-10 py-1 space-x-3 rounded-md h-10 w-fit bg-white text-sm text-blue-500 shadow-sm hover:bg-gray-100 hover:text-blue-500"
                >
                  Cancel
                </button>
              </div>
              <div className="p-5">
                <button
                  type="button"
                  className="flex items-center px-10 py-1 space-x-3 rounded-md h-10 w-fit border-2 border-blue-500 bg-white text-sm text-blue-500 shadow-sm hover:bg-gray-100 hover:text-blue-500"
                >
                  Print
                </button>
              </div>
              <div className="p-5">
                <button
                  type="submit"
                  className="flex items-center px-10 py-3 space-x-3 rounded-md h-10 w-fit bg-blue-500 text-sm text-white shadow-sm hover:bg-blue-600 hover:text-white"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
          </div>
      </form>
    </div>
  );
};

export default CreateInvoice;
