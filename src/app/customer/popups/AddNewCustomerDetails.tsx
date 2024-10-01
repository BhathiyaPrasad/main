"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { addCustomer } from "@/services/customerServices";

export default function AddNewCustomerDetails() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset, // Added reset method
  } = useForm();

  const onSubmit = async (data: any) => {
    try {
      const customerData = {
        custcode: data.custcode,
        name: data.name,
        lname: data.lname,
        address: data.address,
        phone: data.phone,
      };
      await addCustomer(customerData);
      console.log("Customer added successfully");
      reset(); // Reset form after successful submission
    } catch (error) {
      console.error("Failed to add customer:", error);
    }
  };

  return (
    <Card className="w-auto h-fit p-0 border-0">
      <CardHeader className="flex justify-between items-start">
        <CardTitle className="text-lg px-16">Add New Customer Details</CardTitle>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid w-full items-center">
            <div className="flex flex-col">
              <Label className="py-2" htmlFor="custcode">
                Customer Code
              </Label>
              <Input
                id="custcode"
                {...register("custcode", {
                  required: "Customer code is required",
                })}
              />
              {errors.custcode?.message && (
                <p className="text-red-500 text-xs">
                  {errors.custcode.message as string}
                </p>
              )}

              <Label className="py-2" htmlFor="fname">
                First Name
              </Label>
              <Input
                id="fname"
                {...register("name", { required: "First name is required" })}
              />
              {errors.name?.message && (
                <p className="text-red-500 text-xs">{errors.name.message as string}</p>
              )}

              <Label className="py-2" htmlFor="lname">
                Last Name
              </Label>
              <Input
                id="lname"
                {...register("lname", { required: "Last name is required" })}
              />
              {errors.lname?.message && (
                <p className="text-red-500 text-xs">{errors.lname.message as string}</p>
              )}

              <Label className="py-2" htmlFor="address">
                Address
              </Label>
              <Input
                id="address"
                {...register("address", { required: "Address is required" })}
              />
              {errors.address?.message && (
                <p className="text-red-500 text-xs">{errors.address.message as string}</p>
              )}

              <Label className="py-2" htmlFor="phonenum">
                Phone Number
              </Label>
              <Input
                id="phonenum"
                type="tel"
                {...register("phone", {
                  required: "Phone number is required",
                  pattern: {
                    value: /^[0-9]{10}$/,
                    message: "Phone number must be 10 digits",
                  },
                })}
              />
              {errors.phone?.message && (
                <p className="text-red-500 text-xs">{errors.phone.message as string}</p>
              )}
            </div>
          </div>

          <CardFooter className="flex justify-between mt-4">
            <Button
              type="button"
              className="rounded-md w-28 bg-white px-3 py-1 text-xs text-blue-500 border border-blue-500 shadow-sm hover:bg-gray-100 focus:outline-none focus:ring-3 focus:ring-blue-500"
              onClick={() => reset()} // Optionally reset the form on Cancel
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="rounded-md w-28 bg-blue-500 px-3 py-1 text-xs text-white shadow-sm hover:bg-blue-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Save
            </Button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
}
