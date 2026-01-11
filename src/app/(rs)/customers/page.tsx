import { Metadata } from "next";
import { CustomerSearch } from "./form/components/customer-search/customer-search";
import { getCustomersSearchResults } from "@/lib/queries/get-customers-search-results";

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

  const results = await getCustomersSearchResults(searchText);

  return (
    <>
      <CustomerSearch />
      {JSON.stringify(results, null, 2)}
    </>
  );
}
