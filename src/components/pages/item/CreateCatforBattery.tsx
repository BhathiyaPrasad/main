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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FaRegPlusSquare, FaWindowClose } from "react-icons/fa";

export function CreateCatforBattery() {
  return (
    <Card className="w-auto h-fit border-0">
      <CardHeader className="flex justify-between items-start">
        <CardTitle className="text-lg px-16">Create Category</CardTitle>
      </CardHeader>

      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label className="py-2" htmlFor="Category">
                Select Brand
              </Label>
              <Select>
                <SelectTrigger id="Brand">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="energizer">Energizer</SelectItem>
                </SelectContent>
              </Select>

              <Label className="py-2" htmlFor="name">
                Category Name
              </Label>
              <Input value={"Battery"} id="vgroup" />

              <Label className="py-2" htmlFor="vgroup">
                Variant Group
              </Label>
              <Input value={"Ampere"} id="vgroup" />
              <Label className="py-2" htmlFor="vgroup">
                Size Option
              </Label>
              <div>
                <Input className="px-7 mb-1 w-32" value={"20W"} id="vgroup" />
                <Input className="px-7 mb-1 w-32" value={"15W"} id="vgroup" />
              </div>
              <div className="py-1 flew justify-between space-x-1">
                <Button className="mb-1 px-3 w-14 h-8 rounded-md bg-blue-500 text-xs text-white shadow-sm hover:bg-blue-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
                  <FaRegPlusSquare className="flex justify-center h-5 w-4 mr-1" />
                </Button>
                <Button className="mb-1 px-4 w-14 h-8 rounded-md bg-red-500 text-xs text-white shadow-sm hover:bg-red-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
                  <FaWindowClose className="flex justify-center h-5 w-4 mr-1" />
                </Button>
              </div>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button className="rounded-md w-28 bg-blue-500 px-3 py-1 text-xs text-white shadow-sm hover:bg-blue-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
          Save
        </Button>
      </CardFooter>
    </Card>
  );
}
