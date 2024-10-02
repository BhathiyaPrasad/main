"use client";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FaRegPlusSquare, FaWindowClose } from "react-icons/fa";
import { useForm, useFieldArray } from "react-hook-form";
import { addCategory } from "@/services/categoryService";
import { fetchBrands } from "@/services/brandService";

interface Brand {
  id: string;
  name: string;
}

interface FormValues {
  categories: {
    brand: string;
    categoryName: string;
    variants: { variantName: string; types: { typeName: string }[] }[];
  }[];
}

export function CreateCategory() {
  const [brands, setBrands] = React.useState<Brand[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState("");

  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
    reset,
    setValue,
  } = useForm<FormValues>({
    defaultValues: {
      categories: [
        {
          brand: "",
          categoryName: "",
          variants: [],
        },
      ],
    },
  });

  const { fields: categoryFields, append: appendCategory } = useFieldArray({
    control,
    name: "categories",
  });

  const onSubmit = async (data: FormValues) => {
    let hasErrors = false;
  
    // Validate input
    data.categories.forEach((category, index) => {
      if (category.variants.length === 0) {
        alert(`Category ${index + 1} must have at least one variant`);
        hasErrors = true;
      }
      category.variants.forEach((variant, variantIndex) => {
        if (variant.types.length === 0) {
          alert(`Variant ${variantIndex + 1} in category ${index + 1} must have at least one type`);
          hasErrors = true;
        }
      });
    });
  
    if (!hasErrors) {
      try {
        // Prepare variantGroups
        const variantGroups = data.categories[0].variants.map((variant) => ({
          name: variant.variantName,
          description: '', // Add a description if needed
          variants: variant.types.map(type => ({
            name: type.typeName,
            description: '', // Add a description if needed
          })),
        }));
  
        // Log variantGroups for debugging
        console.log("Prepared variantGroups:", variantGroups);
  
        const categoryData = {
          brandId: data.categories[0].brand,
          categoryName: data.categories[0].categoryName,
          variantGroups: variantGroups.length > 0 ? variantGroups : [], // Send empty array if no groups
        };
  
        console.log("Sending categoryData:", categoryData); // For debugging
        await addCategory(categoryData);
        console.log("Category added successfully:", categoryData);
        reset(); // Reset the form after submission
      } catch (error) {
        console.error("Failed to add Category:", error);
        alert("Failed to add category. Please try again."); // User feedback
      }
    }
  };
  
  
  useEffect(() => {
    const fetchBrandsData = async () => {
      setLoading(true);
      try {
        const { brands } = await fetchBrands();
        setBrands(brands);
      } catch (err) {
        setError("Failed to fetch brands.");
      } finally {
        setLoading(false);
      }
    };

    fetchBrandsData();
  }, []);

  return (
    <Card className="w-auto h-fit border-0">
      <CardHeader className="flex justify-between items-start">
        <CardTitle className="text-lg px-16">Create Category</CardTitle>
      </CardHeader>
      <CardContent>
        {error && <p className="text-red-500">{error}</p>}
        <form onSubmit={handleSubmit(onSubmit)}>
          {categoryFields.map((category, categoryIndex) => (
            <div key={category.id} className="grid w-full items-center gap-4 mb-4">
              <div className="flex flex-col space-y-1.5">
                <Label className="py-2" htmlFor={`categories.${categoryIndex}.brand`}>
                  Select Brand
                </Label>
                <Select
                  onValueChange={(value) => setValue(`categories.${categoryIndex}.brand`, value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    {brands.map((brand) => (
                      <SelectItem key={brand.id} value={brand.id}>
                        {brand.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.categories?.[categoryIndex]?.brand && (
                  <p className="text-red-500 text-xs bg-transparent mt-1">
                    {errors.categories[categoryIndex].brand?.message}
                  </p>
                )}

                <Label className="py-2" htmlFor={`categories.${categoryIndex}.categoryName`}>
                  Category Name
                </Label>
                <Input
                  {...register(`categories.${categoryIndex}.categoryName`, {
                    required: "Category Name is required",
                  })}
                  id={`categories.${categoryIndex}.categoryName`}
                />
                {errors.categories?.[categoryIndex]?.categoryName && (
                  <p className="text-red-500 bg-transparent text-xs mt-1">
                    {errors.categories[categoryIndex].categoryName?.message}
                  </p>
                )}

                <VariantsSection
                  categoryIndex={categoryIndex}
                  control={control}
                  register={register}
                  errors={errors}
                />
              </div>
            </div>
          ))}
          <CardFooter className="flex justify-between">
            <Button
              type="submit"
              className="rounded-md w-32 bg-blue-500 px-3 py-1 m-5 text-xs text-white shadow-sm hover:bg-blue-600"
            >
              Save
            </Button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
}

function VariantsSection({ categoryIndex, control, register, errors }: any) {
  const { fields: variantFields, append: appendVariant, remove: removeVariant } = useFieldArray({
    control,
    name: `categories.${categoryIndex}.variants`,
  });

  return (
    <div>
      <Label className="py-2">Variants</Label>
      {variantFields.map((variant, variantIndex) => (
        <div key={variant.id} className="flex flex-col space-y-2 mb-4">
          <Input
            {...register(`categories.${categoryIndex}.variants.${variantIndex}.variantName`, {
              required: "Variant Name is required",
            })}
            placeholder="Variant Name"
            className="w-48 mb-2"
          />
          <Button
            type="button"
            onClick={() => removeVariant(variantIndex)}
            className="text-red-500 bg-transparent"
          >
            <FaWindowClose />
          </Button>
          <TypesSection
            categoryIndex={categoryIndex}
            variantIndex={variantIndex}
            control={control}
            register={register}
            errors={errors}
          />
        </div>
      ))}

      <Button
        type="button"
        onClick={() =>
          appendVariant({
            variantName: "",
            types: [{ typeName: "" }],
          })
        }
        className="flex items-center px-10 py-3 space-x-3 rounded-md h-10 w-fit bg-blue-500 text-sm text-white shadow-sm hover:bg-blue-600 hover:text-white"
      >
        <FaRegPlusSquare />
        <span className="ml-1">Add Variant</span>
      </Button>
    </div>
  );
}

function TypesSection({ categoryIndex, variantIndex, control, register, errors }: any) {
  const { fields: typeFields, append: appendType, remove: removeType } = useFieldArray({
    control,
    name: `categories.${categoryIndex}.variants.${variantIndex}.types`,
  });

  return (
    <div className="mt-2 ml-4">
      <Label className="py-2">Types</Label>
      {typeFields.map((type, typeIndex) => (
        <div key={typeIndex} className="flex items-center space-x-2 mb-2">
          <Input
            {...register(
              `categories.${categoryIndex}.variants.${variantIndex}.types.${typeIndex}.typeName`,
              {
                required: "Type Name is required",
              }
            )}
            placeholder="Type Name"
            className="w-48 mb-2"
          />
          <Button
            type="button"
            onClick={() => removeType(typeIndex)}
            className="text-red-500 bg-transparent mt-1"
          >
            <FaWindowClose />
          </Button>
          {errors.categories?.[categoryIndex]?.variants?.[variantIndex]?.types?.[typeIndex]?.typeName && (
            <p className="text-red-500 text-xs mt-1">
              {errors.categories[categoryIndex].variants[variantIndex].types[typeIndex].typeName?.message}
            </p>
          )}
        </div>
      ))}

      <Button
        type="button"
        onClick={() => appendType({ typeName: "" })}
        className="flex items-center px-5 py-1 rounded-md h-9 w-fit bg-blue-500 text-sm text-white shadow-sm hover:bg-blue-600 hover:text-white"
      >
        Add Type
      </Button>
    </div>
  );
}
