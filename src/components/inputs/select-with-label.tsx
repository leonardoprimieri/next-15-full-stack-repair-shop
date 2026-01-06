import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { cn } from "@/lib/utils";

type DataObj = {
  id: string;
  description: string;
};

type Props<S> = {
  fieldTitle: string;
  nameInSchema: keyof S & string;
  className?: string;
  data: DataObj[];
};

export function SelectWithLabel<S>({
  fieldTitle,
  nameInSchema,
  className,
  data,
}: Props<S>) {
  const form = useFormContext();

  return (
    <FormField
      control={form.control}
      name={nameInSchema}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-base" htmlFor={nameInSchema}>
            {fieldTitle}
          </FormLabel>

          <Select {...field} onValueChange={field.onChange}>
            <FormControl>
              <SelectTrigger
                id={nameInSchema}
                className={cn("w-full max-w-xs", className)}
              >
                <SelectValue placeholder="Select" />
              </SelectTrigger>
            </FormControl>

            <SelectContent>
              {data.map((item) => (
                <SelectItem value={item.id} key={`${nameInSchema}_${item.id}`}>
                  {item.description}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <FormMessage />
        </FormItem>
      )}
    />
  );
}
