import { BackButton } from "@/components/back-button/back-button";
import { getCustomer } from "@/lib/queries/get-customer";
import { CustomerForm } from "./components/customer-form/customer-form";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const { customerId } = await searchParams;

  if (!customerId) return { title: "New Customer" };

  return {
    title: `Edit Customer #${customerId}`,
  };
}

export default async function CustomerFormPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const { customerId } = await searchParams;

  if (customerId) {
    const customer = await getCustomer(parseInt(customerId));

    if (!customer) {
      return (
        <>
          <h2 className="text-2xl mb-2">Customer ID #{customerId} not found</h2>
          <BackButton title="Go Back" variant="default" />
        </>
      );
    }

    return <CustomerForm customer={customer} />;
  }

  return <CustomerForm />;
}
