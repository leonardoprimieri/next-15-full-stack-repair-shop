import { Metadata } from "next";
import { TicketsSearch } from "./form/components/tickets-search/tickets-search";
import { getTicketsSearchResult } from "@/lib/queries/get-tickets-search-result";
import { getOpenTickets } from "@/lib/queries/get-open-tickets";

export const metadata: Metadata = {
  title: "Tickets Search",
};

export default async function TicketsPage({
  searchParams,
}: {
  searchParams: Promise<{ searchText: string }>;
}) {
  const { searchText } = await searchParams;

  if (!searchText) {
    const results = await getOpenTickets();
    return (
      <>
        <TicketsSearch />
        {JSON.stringify(results)}
      </>
    );
  }

  const tickets = await getTicketsSearchResult(searchText);

  return (
    <>
      <TicketsSearch />
      {JSON.stringify(tickets, null, 2)}
    </>
  );
}
