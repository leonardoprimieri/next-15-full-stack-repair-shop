import { SearchButton } from "@/components/search-button/search-button";
import { Input } from "@/components/ui/input";
import Form from "next/form";

export function TicketsSearch() {
  return (
    <Form action="/tickets" className="flex gap-2 items-center">
      <Input
        name="searchText"
        type="text"
        placeholder="Search Tickets"
        className="w-full"
      />
      <SearchButton />
    </Form>
  );
}
