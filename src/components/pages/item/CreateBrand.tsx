"use client";
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
import { addBrand } from "@/services/brandService";
import { useForm } from "react-hook-form";

interface FormValues {
  brandname: string;
}

export default function CreateBrand() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit = async (data: FormValues) => {
    try {
      const brandData = { name: data.brandname };
      await addBrand(brandData);
      console.log("Brand added successfully:", brandData);
      reset(); // Reset the form after submission
    } catch (error) {
      console.error("Failed to add brand:", error);
    }
  };

  return (
    <Card className="w-auto h-fit">
      <CardHeader className="flex justify-between items-start">
        <CardTitle className="text-lg px-16">Create Brand</CardTitle>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label className="py-1" htmlFor="brandname">
                Brand Name
              </Label>
              <Input
                id="brandname"
                {...register("brandname", {
                  required: "Brand name is required",
                })}
              />
              {errors.brandname && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.brandname?.message}
                </p>
              )}
            </div>
          </div>
          <CardFooter className="flex justify-between mt-4">
            <Button
              type="submit"
              className="rounded-md w-28 bg-blue-500 px-3 text-xs text-white shadow-sm hover:bg-blue-600"
            >
              Save
            </Button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
}
