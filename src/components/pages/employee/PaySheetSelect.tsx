"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon, Table } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Card,
  CardContent,
  CardDescription,
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
import { TableBody, TableCell, TableRow } from "@/components/ui/table";

const FormSchema = z.object({
  dob: z.date({
    required_error: "Please Enter Date",
  }),
});

export default function PaySheetSelect() {
  return <DatePickerForm />;
}

function DatePickerForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }
  return (
    <Card className="w-auto h-fit">
      <CardHeader className="flex justify-between items-start">
        <Button className="px-5 w-20 h-8 mb-3 bg-gray-200 text-xs text-gray-500 shadow-sm hover:bg-gray-400 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
          <FontAwesomeIcon icon={faAngleLeft} className="h-3 w-3 mr-1" />
          <span>Back</span>
        </Button>
        <CardTitle className="px-28 text-lg ">Pay Sheet Select</CardTitle>
      </CardHeader>
      <CardContent className="flex justify-center">
        <Button
          className="rounded-md w-80 bg-blue-500 px-3 py-1 text-xs text-white shadow-sm hover:bg-blue-600 
      focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          This Month Pay Sheet
        </Button>
      </CardContent>
      <h1 className="text-sm px-11">Previous Months</h1>
      <div className="flex justify-center">
        <Card className="py-3 px-10 h-fit bg-transparent border-transparent">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="dob"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <div className="flex items-center space-x-4">
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-56 pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground",
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) =>
                              date > new Date() || date < new Date("1900-01-01")
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <Button
                        className="bg-blue-500 hover:bg-blue-600"
                        type="submit"
                      >
                        Submit
                      </Button>
                    </div>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </Card>
      </div>
    </Card>
  );
}
