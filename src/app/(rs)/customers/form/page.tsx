/* eslint-disable react-hooks/error-boundaries */
import { BackButton } from "@/components/back-button/back-button";
import { getCustomer } from "@/lib/queries/get-customer";
import * as Sentry from "@sentry/nextjs";
import { CustomerForm } from "./components/customer-form/customer-form";

export default async function CustomerFormPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  try {
    const { customerId } = await searchParams;

    if (customerId) {
      const customer = await getCustomer(parseInt(customerId));

      if (!customer) {
        return (
          <>
            <h2 className="text-2xl mb-2">
              Customer ID #{customerId} not found
            </h2>
            <BackButton title="Go Back" variant="default" />
          </>
        );
      }

      return <CustomerForm customer={customer} />;
    }

    return <CustomerForm />;
  } catch (e) {
    if (e instanceof Error) {
      Sentry.captureException(e);
      throw e;
    }
  }
}
