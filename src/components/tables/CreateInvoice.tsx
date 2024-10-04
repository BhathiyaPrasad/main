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
import { fetchStock } from "@/services/stockService";
import { fetchVariants } from "@/services/variantService";
import { X } from 'lucide-react';
import { useEffect, useState } from 'react';


interface InvoiceItemRowProps {
    row: InvoiceItem;
    i: number;
    updateInvoiceItems: (...args: any[]) => void;
    removeInvoiceItems: (...args: any[]) => void;

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

const InvoiceItemRow: React.FC<InvoiceItemRowProps> = ({
    row,
    i,
    updateInvoiceItems,
    removeInvoiceItems,

}) => {
    const [selectedCategory, setSelectedCategory] = useState(row.categoryId);
    const [selectedBrand, setSelectedBrand] = useState(row.brandId);
    const [selectedVariant, setSelectedVariant] = useState(row.variantId);
    const [selectedVariantSet, setSelectedVariantSet] = useState(row.variantSetsId);
    const [inputQuantity, setInputQuantity] = useState(row.quantity || '');
    const [categories, setCategories] = useState<Category[]>([]);
    const [brands, setBrands] = useState<Brand[]>([]);
    const [variants, setVariants] = useState<Variant[]>([]);
    const [variantSets, setVariantSets] = useState<VariantSets[]>([]);
    const [stockData, setStockData] = useState<Category[]>([]);
    const [discountType, setDiscountType] = useState(row.discountType || 'AMOUNT');
    const [inputDiscount, setInputDiscount] = useState(row.discount || ''); // Initialize with existing discount
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

    // Fetch variants and variant sets based on selected category
    useEffect(() => {
        const fetchVariantData = async () => {
            if (!selectedCategory) return;
            try {
                const { variants, variantsSet } = await fetchVariants(selectedCategory);
                setVariants(variants);
                setVariantSets(variantsSet);
            } catch (err) {
                console.error(err);
            }
        };
        fetchVariantData();
    }, [selectedCategory]);

    // Fetch stock data based on selected category and variant
    useEffect(() => {
        const fetchStockData = async () => {
            if (!selectedCategory || !selectedVariant) return;
            try {
                const { stock } = await fetchStock(selectedCategory, selectedVariant);
                setStockData(stock);
            } catch (err) {
                console.error(err);
            }
        };
        fetchStockData();
    }, [selectedCategory, selectedVariant]);

    // Handlers for each select input
    const handleCategoryChange = (value: string) => {
        setSelectedCategory(value);
        updateInvoiceItems(i, { ...row, categoryId: value });
    };

    const handleBrandChange = (value: string) => {
        setSelectedBrand(value);
        updateInvoiceItems(i, { ...row, brandId: value });
    };

    const handleVariantChange = (value: string) => {
        setSelectedVariant(value);
        updateInvoiceItems(i, { ...row, variantId: value });
    };

    const handleVariantSetChange = (value: string) => {
        setSelectedVariantSet(value);
        updateInvoiceItems(i, { ...row, variantSetsId: value });
    };
    const handleQuantitySetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setInputQuantity(value);

        // Check if the input value exceeds available quantity
        if (Number(value) > (stock ? stock.avbQty : 0)) {
            alert('Input quantity exceeds available quantity');
        } else {
            // Update the invoice items with the new quantity
            updateInvoiceItems(i, { ...row, quantity: value });
        }
    };

    console.log('this is stockData', stockData)

    const stock = stockData.length > 0 ? stockData[0] : null;
    const lineTotal = stock && row.qty ? (Number(row.qty) * Number(stock.sellingPrice)).toFixed(2) : '0.00';
    const calculateDiscountedTotal = () => {
        let discountAmount = 0;
        const sellingPrice = Number(stock.sellingPrice);
        const quantity = Number(row.qty);
        const discountValue = Number(inputDiscount);

        // Apply discount based on discountType
        if (row.discountType === 'AMOUNT') {
            discountAmount = discountValue; // Fixed discount amount
        } else if (row.discountType === 'PERCENTAGE') {
            discountAmount = (discountValue / 100) * (sellingPrice * quantity); // Percentage discount
        }

        // Ensure discount doesn't exceed the original line total
        const totalAfterDiscount = Math.max(sellingPrice * quantity - discountAmount, 0).toFixed(2);

        return totalAfterDiscount;
    };

    const handleDiscountTypeChange = (value: string) => {
        setDiscountType(value);
        updateInvoiceItems(i, { ...row, discountType: value });
    };

    const handleDiscountSetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setInputDiscount(value);

        updateInvoiceItems(i, { ...row, discount: value });
    };
    const lineTotalWithDiscount = stock ? calculateDiscountedTotal() : '0.00';
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
                <Select onValueChange={handleVariantSetChange} value={selectedVariantSet}>
                    <SelectTrigger>
                        <SelectValue placeholder="Select a variant set" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            {variantSets && variantSets[0]?.map((item) => (
                                <SelectItem key={item.id} value={item.id}>
                                    {item.name}
                                </SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </TableCell>

            <TableCell className="py-2">
                <Input
                    onChange={(e) => updateInvoiceItems(i, { ...row, qty: e.target.value })}
                    className="text- py-2"
                    value={row.qty}
                />
            </TableCell>

            <TableCell className="text-right py-2">
                {stock ? stock.sellingPrice : 'N/A'} {/* Available Quantity */}
            </TableCell>



            <TableCell className="py-2">
                {/* Discount Input */}
                <Input
                    type="number"
                    onChange={handleDiscountSetChange}
                    className="text-right"
                    value={inputDiscount}
                    placeholder="Enter Discount"
                />

                {/* Discount Type Select */}
                <Select onValueChange={handleDiscountTypeChange} value={discountType}>
                    <SelectTrigger>
                        <SelectValue placeholder="Discount Type" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectItem value="AMOUNT">Amount</SelectItem>
                            <SelectItem value="PERCENTAGE">Percentage</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </TableCell>
            <TableCell className="text-right py-2">
            {lineTotalWithDiscount}  {/* Line Total: Quantity * Selling Price */}
            </TableCell>

            <TableCell className="py-2">
                <button
                    className="float-right"
                    onClick={() => removeInvoiceItems(i)}
                >
                    <X className="text-destructive w-5 h-5" />
                </button>
            </TableCell>
        </TableRow>
    );
};

export default InvoiceItemRow;
