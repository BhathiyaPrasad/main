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
import { addSupplier } from "@/services/supplierService"; // Assuming this service is set up

export default function AddNewSupplierDetails() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data: any) => {
    try {
      const supplierData = {
        name:data.name,
        phone:data.supphonenum,
        email: data.supemail,
        address: data.supaddress,
        // refname: data.refname,
        // rphonenum: data.rphonenum,
      };
      await addSupplier(supplierData); // Save supplier data
      console.log("Supplier added successfully");
      reset(); // Reset form after submission
    } catch (error) {
      console.error("Failed to add supplier:", error);
    }
  };

  return (
    <Card className="w-auto h-fit p-0 border-0">
      <CardHeader className="flex justify-between items-start">
        <CardTitle className="text-lg px-16">Add New Supplier Details</CardTitle>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid w-full items-center">
            <div className="flex flex-col">
            <Label className="py-2" htmlFor="name">
                Supplier Name
              </Label>
              <Input
                id="name"
                {...register("name", { required: "Supplier name is required" })}
              />
              {errors.name?.message && (
                <p className="text-red-500 text-xs">{errors.name.message as string}</p>
              )}
              
              {errors.name?.message && (
                <p className="text-red-500 text-xs">{errors.name.message as string}</p>
              )}
              <Label className="py-2" htmlFor="supphonenum">
                Supplier Phone Number
              </Label>
              <Input
                id="supphonenum"
                type="tel"
                {...register("supphonenum", {
                  required: "Supplier phone number is required",
                  pattern: {
                    value: /^[0-9]{10}$/,
                    message: "Phone number must be 10 digits",
                  },
                })}
              />
              {errors.supphonenum?.message && (
                <p className="text-red-500 text-xs">{errors.supphonenum.message as string}</p>
              )}

              <Label className="py-2" htmlFor="supemail">
                Supplier Email
              </Label>
              <Input
                id="supemail"
                {...register("supemail", { required: "Supplier email is required" })}
              />
              {errors.supemail?.message && (
                <p className="text-red-500 text-xs">{errors.supemail.message as string}</p>
              )}

              <Label className="py-2" htmlFor="supaddress">
                Supplier Address
              </Label>
              <Input
                id="supaddress"
                {...register("supaddress", { required: "Supplier address is required" })}
              />
              {errors.supaddress?.message && (
                <p className="text-red-500 text-xs">{errors.supaddress.message as string}</p>
              )}

              <Label className="py-2" htmlFor="refname">
                Reference Name
              </Label>
              <Input
                id="refname"
                {...register("refname", { required: "Reference name is required" })}
              />
              {errors.refname?.message && (
                <p className="text-red-500 text-xs">{errors.refname.message as string}</p>
              )}

              <Label className="py-2" htmlFor="rphonenum">
                Reference Phone Number
              </Label>
              <Input
                id="rphonenum"
                type="tel"
                {...register("rphonenum", {
                  required: "Reference phone number is required",
                  pattern: {
                    value: /^[0-9]{10}$/,
                    message: "Phone number must be 10 digits",
                  },
                })}
              />
              {errors.rphonenum?.message && (
                <p className="text-red-500 text-xs">{errors.rphonenum.message as string}</p>
              )}
            </div>
          </div>

          <CardFooter className="flex justify-between mt-4">
            <Button
              type="button"
              className="rounded-md w-28 bg-white px-3 py-1 text-xs text-blue-500 border border-blue-500 shadow-sm hover:bg-gray-100 focus:outline-none focus:ring-3 focus:ring-blue-500"
              onClick={() => reset()}
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
