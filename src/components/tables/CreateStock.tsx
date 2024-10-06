import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { TableCell, TableRow } from '@/components/ui/table';
import { fetchBrands } from "@/services/brandService";
import { fetchCategories } from "@/services/categoryService";
import { fetchVariants } from "@/services/variantService";
import { X } from 'lucide-react';
import { useEffect, useState } from 'react';

interface GRNItemRowProps {
  row: any;
  i: number;
  updateGRNItems: (...args: any[]) => void;
  removeGRNItems: (...args: any[]) => void;
}

interface Brand {
  name: string;
  id: string;
}
interface Category {
  name: string;
  id: string;
}
interface Variant {
  name: string;
  id: string;
}
interface StockData {
  name: string;
  code: string;
  availableQty: number;
  purchasePrice: string;
}

const GRNItemRow: React.FC<GRNItemRowProps> = ({
  row,
  i,
  updateGRNItems,
  removeGRNItems,
}) => {
  const [selectedCategory, setSelectedCategory] = useState(row.categoryId);
  const [selectedBrand, setSelectedBrand] = useState(row.brandId);
  const [selectedVariant, setSelectedVariant] = useState(row.variantId);
  const [inputQuantity, setInputQuantity] = useState(row.quantity || '');
  const [inputCost, setInputCost] = useState(row.costPrice || '');
  const [inputSale , setInputSale] = useState(row.sellingPrice || '');
  const [inputMaxDiscount ,  setInputMaxDiscount] = useState(row.maxDiscount || '');
  const [categories, setCategories] = useState<Category[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [variants, setVariants] = useState<Variant[]>([]);
  

  // Fetch categories
  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        const { categories } = await fetchCategories();
        setCategories(categories);
      } catch (err) {
        console.error(err);
      }
    };
    fetchCategoryData();
  }, []);

  // Fetch brands
  useEffect(() => {
    const fetchBrandData = async () => {
      try {
        const { brands } = await fetchBrands();
        setBrands(brands);
      } catch (err) {
        console.error(err);
      }
    };
    fetchBrandData();
  }, []);

  // Fetch variants based on selected category
  useEffect(() => {
    const fetchVariantData = async () => {
      if (!selectedCategory) return;
      try {
        const { variants } = await fetchVariants(selectedCategory);
        setVariants(variants);
      } catch (err) {
        console.error(err);
      }
    };
    fetchVariantData();
  }, [selectedCategory]);

  // Handlers for each select input
  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
    updateGRNItems(i, { ...row, categoryId: value });
  };

  const handleBrandChange = (value: string) => {
    setSelectedBrand(value);
    updateGRNItems(i, { ...row, brandId: value });
  };

  const handleVariantChange = (value: string) => {
    setSelectedVariant(value);
    updateGRNItems(i, { ...row, variantId: value });
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputQuantity(value);

    updateGRNItems(i, { ...row, quantity: value });
  };
  const handleCostPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputCost(value);

    updateGRNItems(i, { ...row, costPrice: value });
  };
  const handleSellingPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputSale(value);

    updateGRNItems(i, { ...row, sellingPrice: value });
  };
  const handleMaxDiscount = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputMaxDiscount(value);

    updateGRNItems(i, { ...row, maxDiscount: value });
  };

  return (
    <TableRow key={`${row.id}-${i}`} className="border-none">
      <TableCell className="py-2">
        <Select onValueChange={handleCategoryChange} value={selectedCategory}>
          <SelectTrigger>
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {categories.map((item) => (
                <SelectItem key={item.id} value={item.id}>
                  {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </TableCell>

      <TableCell className="py-2">
        <Select onValueChange={handleBrandChange} value={selectedBrand}>
          <SelectTrigger>
            <SelectValue placeholder="Select a brand" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {brands.map((item) => (
                <SelectItem key={item.id} value={item.id}>
                  {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </TableCell>

      <TableCell className="py-2">
        <Select onValueChange={handleVariantChange} value={selectedVariant}>
          <SelectTrigger>
            <SelectValue placeholder="Select a variant" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {variants.map((item) => (
                <SelectItem key={item.id} value={item.id}>
                  {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </TableCell>

      <TableCell className="py-2">
        <Input
          onChange={handleQuantityChange}
          className="text-py-2"
          value={row.quantity}
          placeholder="Enter quantity"
        />
      </TableCell>

      <TableCell className="text-right py-2">
      <Input
          onChange={handleCostPriceChange}
          className="text-py-2"
          value={row.costPrice}
          placeholder="Enter Cost"
        />
      </TableCell>

      <TableCell className="text-right py-2">
      <Input
          onChange={handleSellingPriceChange}
          className="text-py-2"
          value={row.sellingPrice}
          placeholder="Enter Sale"
        />
      </TableCell>  
      <TableCell className="text-center py-2">
      <Input
          onChange={handleMaxDiscount}
          className="text-py-2"
           value={row.maxDiscount}
          placeholder="Enter Dscount"
        />
      </TableCell>

      <TableCell className="py-2">
        <button
          className="float-right"
          onClick={() => removeGRNItems(i)}
        >
          <X className="text-destructive w-5 h-5" />
        </button>
      </TableCell>
    </TableRow>
  );
};

export default GRNItemRow;
