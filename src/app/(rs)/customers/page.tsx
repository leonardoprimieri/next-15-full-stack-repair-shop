import { Metadata } from "next";
import { CustomerSearch } from "./form/components/customer-search/customer-search";
import { getCustomersSearchResults } from "@/lib/queries/get-customers-search-results";
import * as Sentry from "@sentry/nextjs";
import { CustomersTable } from "./_components/customers-table/customers-table";

export const metadata: Metadata = {
  title: "Customers Search",
};

export default async function CustomersPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const { searchText } = await searchParams;

  if (!searchText) return <CustomerSearch />;

  const span = Sentry.startInactiveSpan({
    name: "getCustomersSearchResults-v2",
  });
  const results = await getCustomersSearchResults(searchText);
  span.end();

  return (
    <>
      <CustomerSearch />
      {results.length ? (
        <CustomersTable data={results} />
      ) : (
        <p className="mt-4">No results found.</p>
      )}
    </>
  );
}
