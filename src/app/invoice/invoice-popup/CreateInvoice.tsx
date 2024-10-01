"use client";
import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { AiFillCloseSquare } from "react-icons/ai";
import { PlusSquare } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { fetchCategories } from "@/services/categoryService";
import { fetchBrands } from "@/services/brandService";
import { fetchVariants } from "@/services/variantService";
import {fetchStock} from "@/services/stockService";

const CreateInvoice = () => {
  const [category, setCategory] = useState([]);
  const [brand, setBrands] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [variant, setVariant] = useState([]);
  const [variantSets, setVariantSet] = useState([]);
  const [selectedVariants ,  setSelectedVariants] = useState([]);
  const [stockData ,  setStockData] = useState([]);
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
        setBrands(brands);
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
        console.log('Error fetching variants:', err);
      }
    };

    fetchVariantData(); // Call the function to fetch data
  }, [selectedCategory]);

  useEffect(() => {
    const fetchStockData = async () => {
      if (!selectedCategory && !selectedVariants) return; // Avoid making the call if no category nor variant is selected
      try {
        const { stock } = await fetchStock(selectedCategory,selectedVariants); // Use selectedCategory & variant directly
        console.log(stock)
        setStockData(stock);
       
      } catch (err) {
        console.log('Error fetching variants:', err);
      }
    };

    fetchStockData(); // Call the function to fetch data
  }, [selectedCategory, selectedVariants]);


  const [rows, setRows] = useState([
    {
      category: "",
      brand: "",
      variant: "",
      type: "",
      quantity: 1,
      rate: "",
      amount: "",
      discount: "",
    },
  ]);

  const [services, setServices] = useState([
    {
      serviceName: "",
      serviceCharge: "",
      discount: "",
    },
  ]);

  // Function to add a new product row
  const addRow = () => {
    setRows([
      ...rows,
      {
        category: "",
        brand: "",
        variant: "",
        type: "",
        quantity: 1,
        rate: "",
        amount: "",
        discount: "",
      },
    ]);
  };

  // Function to add a new service row
  const addServiceRow = () => {
    setServices([
      ...services,
      {
        serviceName: "",
        serviceCharge: "",
        discount: "",
      },
    ]);
  };

  // Function to remove a product row
  const removeRow = (index) => {
    const updatedRows = rows.filter((_, i) => i !== index);
    setRows(updatedRows);
  };

  // Function to remove a service row
  const removeServiceRow = (index) => {
    const updatedServices = services.filter((_, i) => i !== index);
    setServices(updatedServices);
  };

  // Function to handle product input changes
  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    const updatedRows = rows.map((row, i) =>
      i === index ? { ...row, [name]: value } : row
    );
    setRows(updatedRows);
    console.log(name)
    if (name === "category") {
      setSelectedCategory(value);
      // to fetch variants based on the category
    }
    if (name === "type") {
       setSelectedVariants(value);
      // to fetch variants based on the category
    }
  };

  // Function to handle service input changes
  const handleServiceInputChange = (index, event) => {
    const { name, value } = event.target;
    const updatedServices = services.map((service, i) =>
      i === index ? { ...service, [name]: value } : service
    );
    setServices(updatedServices);
  };
  console.log('this is category',selectedCategory)
  console.log(variantSets)
  console.log('selected varitns are',selectedVariants);
  console.log('this is stock',stockData);
  
  return (
    <div>
      {/* Header Table */}
      <table className="w-full divide-y divide-gray-200 text-sm">
        <tbody className="bg-white divide-y divide-gray-200">
          <tr>
            <td className="px-4 py-1 whitespace-nowrap text-lg font-bold text-black">
              Create Invoice
            </td>
          </tr>
        </tbody>
      </table>

      {/* Customer and Invoice Details */}
      <table className="w-full divide-y divide-gray-200">
        <tbody>
          <tr>
            <td className="px-1 py-1">
              <div className="flex items-start mb-4">
                <div className="mr-4">
                  <h1 className="text-sm">Customer Name</h1>
                  <div className="flex flex-row gap-x-2">
                    <input
                      type="text"
                      className="w-64 px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <Link href="/customer">
                      <button className="self-end rounded-md bg-blue-500 px-4 py-2 h-10 text-white shadow-sm hover:bg-blue-600">
                        <FaPlus />
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </td>
            <td className="px-4 py-1">
              <div className="flex items-start mb-4">
                <div className="mr-4">
                  <h1 className="text-sm">Invoice No</h1>
                  <input
                    type="text"
                    className="w-36 px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </td>
            <td className="px-40 py-1 flex justify-end">
              <div className="flex mb-4 w-auto justify-end">
                <div className="mr-4 w-auto">
                  <h1 className="text-sm text-right">Balance</h1>
                  <h2 className="text-4xl font-bold text-black">5000.00</h2>
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <td className="px-1 py-1">
              <div className="flex items-start mb-4">
                <div className="mr-4">
                  <h1 className="text-sm">Customer Phone Number</h1>
                  <input
                    type="tel"
                    className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
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
                    value={new Date().toISOString().substring(0, 10)}
                  />
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      {/* Product Rows */}
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
              Type
            </th>
            <th className="px-1 py-1 text-left text-xs font-medium text-gray-950 tracking-wider">
              Qty
            </th>
            <th className="px-1 py-1 text-left text-xs font-medium text-gray-950 tracking-wider">
              Rate (Rs.)
            </th>
            <th className="px-1 py-1 text-left text-xs font-medium text-gray-950 tracking-wider">
              Amount (Rs.)
            </th>
            <th className="px-1 py-1 text-left text-xs font-medium text-gray-950 tracking-wider">
              Discount
            </th>
            <th className="px-1 py-1 text-left text-xs font-medium text-gray-950 tracking-wider"></th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              <td className="px-1 py-1 w-auto">
                <select
                  name="category"
                  value={row.category}
                  onChange={(e) => handleInputChange(index, e)}
                >
                  <option value="">Select Category</option>
                  {category.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </td>
              <td className="px-1 py-1 w-auto">
                <select
                  name="brand"
                  value={row.brand}
                  onChange={(e) => handleInputChange(index, e)}
                >
                  <option value="">Select Brand</option>
                  {brand.map((brand) => (
                    <option key={brand.id} value={brand.name}>
                      {brand.name}
                    </option>
                  ))}
                </select>
              </td>
              <td className="px-1 py-1 w-auto">
                <select
                  name="variant"
                  value={row.variant}
                  onChange={(e) => handleInputChange(index, e)}
                >
                  <option value="">Select Variant</option>
                  {variant.map((variant) => (
                    <option key={variant.id} value={variant.name}>
                      {variant.name}
                    </option>))}
                </select>
              </td>
              <td className="px-1 py-1 w-auto">
    <select
        name="type"
        value={row.type}  // Ensure row.type is being properly updated
        onChange={(e) => handleInputChange(index, e)}
    >
        <option value="">Select Type</option>
        {variantSets && variantSets[0]?.map((v) => (  // Access the first inner array
            <option key={v.id} value={v.id}>  {/* Use v.id as the key and value */}
                {v.name}  {/* Output the name field from the object */}
            </option>
        ))}
    </select>
</td>

  
  
<td className="px-1 py-1 w-auto">
        <div
            name="stock"
            value={row.quantity}
            onChange={(e) => handleInputChange(index, e)}
          >
            
            {stockData.map((s) => (
               <input
               key={s.id}
               type="number"
               name="quantity"
               className="w-20 px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
               min={1}
              //  value={s.buyingPrice}
               onChange={(e) => handleInputChange(index, e)}
               placeholder={s.buyingPrice}
             />
            ))}
          </div>

</td>
<td className="px-1 py-1 w-auto">
        <div
            name="stock"
            value={row.buyingPrice}
            onChange={(e) => handleInputChange(index, e)}
          >
            
            {stockData.map((s) => (
               <input
               key={s.id}
               type="number"
               name="price"
               className="w-20 px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
               min={1}
              //  value={s.sellingPrice}
               onChange={(e) => handleInputChange(index, e)}
               placeholder={s.buyingPrice}
             />
            ))}
          </div>

</td>
<td className="px-1 py-1 w-auto">
        <div
            name="stock"
            value={row.sellingPrice}
            onChange={(e) => handleInputChange(index, e)}
          >
            
            {stockData.map((s) => (
               <input
               key={s.id}
               type="number"
               name="price"
               className="w-20 px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
               min={1}
              //  value={s.sellingPrice}
               onChange={(e) => handleInputChange(index, e)}
               placeholder={s.sellingPrice}
             />
            ))}
          </div>

</td>
              <td className="px-1 py-1 w-auto">
                <input
                  type="text"
                  name="discount"
                  className="w-32 px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={row.discount}
                  onChange={(e) => handleInputChange(index, e)}
                />
              </td>
              <td className="px-1 py-1 w-auto">
                <button
                  className="text-red-500"
                  onClick={() => removeRow(index)}
                >
                  <AiFillCloseSquare />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Add Product Button */}
      <button
        className="w-auto mt-3 px-4 py-2 h-10 bg-gray-50 text-blue-500 shadow-sm"
        onClick={addRow}
      >
        Add Item
      </button>

      {/* Service Rows */}
      {services.length > 0 && (
        <table className="w-auto mt-5">
          <thead>
            <tr>
              <th className="px-1 py-1 text-left text-xs font-medium text-gray-950 tracking-wider">
                Service Name
              </th>
              <th className="px-1 py-1 text-left text-xs font-medium text-gray-950 tracking-wider">
                Service Charge (Rs.)
              </th>
              <th className="px-1 py-1 text-left text-xs font-medium text-gray-950 tracking-wider">
                Discount
              </th>
              <th className="px-1 py-1 text-left text-xs font-medium text-gray-950 tracking-wider"></th>
            </tr>
          </thead>
          <tbody>
            {services.map((service, index) => (
              <tr key={index}>
                <td className="px-1 py-1 w-auto">
                  <input
                    type="text"
                    name="serviceName"
                    className="w-48 px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={service.serviceName}
                    onChange={(e) => handleServiceInputChange(index, e)}
                  />
                </td>
                <td className="px-1 py-1 w-auto">
                  <input
                    type="text"
                    name="serviceCharge"
                    className="w-32 px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={service.serviceCharge}
                    onChange={(e) => handleServiceInputChange(index, e)}
                  />
                </td>
                <td className="px-1 py-1 w-auto">
                  <input
                    type="text"
                    name="discount"
                    className="w-32 px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={service.discount}
                    onChange={(e) => handleServiceInputChange(index, e)}
                  />
                </td>
                <td className="px-1 py-1 w-auto">
                  <button
                    className="text-red-500"
                    onClick={() => removeServiceRow(index)}
                  >
                    <AiFillCloseSquare />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Add Service Button */}
      <button
        className="w-auto mt-3 px-4 py-2 h-10 bg-gray-50 text-blue-500 shadow-sm"
        onClick={addServiceRow}
      >
        Add Service
      </button>

      <div className="flex flex-row justify-between">
        <div className="flex-col p-5 w-full">
          <label className="block text-gray-700 text-sm mb-2 p-2">Note</label>
          <textarea
            id="textarea"
            name="textarea"
            className="mt-1 block w-full h-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            rows={5}
            placeholder="Type a description..."
          />
        </div>
        <div className="flex-col p-5">
          <div className="flex justify-between p-5">
            <label className="block text-gray-700 text-sm mb-2 p-2">
              Total Payment
            </label>
            <input
              type="text"
              className="w-32 px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex justify-between p-5">
            <label className="block text-gray-700 text-sm mb-2 p-2">
              Discount
            </label>
            <input
              type="text"
              className="w-32 px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <Tabs defaultValue="account" className="w-fit">
            <TabsList>
              <TabsTrigger value="cash">Cash</TabsTrigger>
              <TabsTrigger value="cheque">Cheque</TabsTrigger>
              <TabsTrigger value="credit">Credit</TabsTrigger>
            </TabsList>
            <TabsContent value="cash">
              <div className="mr-4">
                <label className="block text-gray-700 text-sm mb-2">
                  Amount
                </label>
                <input
                  type="text"
                  className="w-32 px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <label className="block text-gray-700 text-sm mb-2">
                  Balance Amount
                </label>
                <input
                  type="text"
                  className="w-32 px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </TabsContent>
            <TabsContent value="cheque">
              <div className="mr-4">
                <label className="block text-gray-700 text-sm mb-2">
                  Cheque Number
                </label>
                <input
                  type="text"
                  className="w-32 px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <label className="block text-gray-700 text-sm mb-2">
                  Bank Details
                </label>
                <input
                  type="text"
                  className="w-32 px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <label className="block text-gray-700 text-sm mb-2">
                  Due Date
                </label>
                <input
                  type="date"
                  className="w-32 px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </TabsContent>
            <TabsContent value="credit">
              <div className="mr-4">
                <label className="block text-gray-700 text-sm mb-2">
                  Advanced Amount
                </label>
                <input
                  type="text"
                  className="w-32 px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <label className="block text-gray-700 text-sm mb-2">
                  Due Date
                </label>
                <input
                  type="date"
                  className="w-32 px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </TabsContent>
          </Tabs>

          <div className="flex flex-row">
            <div className="p-5">
              <button className="flex items-center px-3 py-1 space-x-3 rounded-md h-10 w-fit  bg-white text-sm text-blue-500 shadow-sm hover:bg-gray-100 hover:text-blue-500">
                <span>Cancel</span>
              </button>
            </div>
            <div className="p-5">
              <button className="flex items-center px-3 py-1 space-x-3 rounded-md h-10 w-fit  border-2 border-blue-500 bg-white text-sm text-blue-500 shadow-sm hover:bg-gray-100 hover:text-blue-500">
                <span>Print</span>
              </button>
            </div>
            <div className="p-5">
              <button className="flex items-center px-3 py-3 space-x-3 rounded-md h-10 w-fit bg-blue-500 text-sm text-white shadow-sm hover:bg-blue-600 hover:text-white">
                <span>Save</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateInvoice;
