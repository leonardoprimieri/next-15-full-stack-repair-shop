"use client";

import {
  insertCustomerSchema,
  insertCustomersSchemaType,
  selectCustomersSchemaType,
} from "@/validation/customer-validation-schema";
import { Form, FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

type Props = {
  customer?: selectCustomersSchemaType;
};

export function CustomerForm(props: Props) {
  const form = useForm<insertCustomersSchemaType>({
    mode: "onBlur",
    resolver: zodResolver(insertCustomerSchema),
    defaultValues: {
      id: props.customer?.id ?? 0,
      firstName: props.customer?.firstName ?? "",
      lastName: props.customer?.lastName ?? "",
      email: props.customer?.email ?? "",
      phone: props.customer?.phone ?? "",
      address1: props.customer?.address1 ?? "",
      address2: props.customer?.address2 ?? "",
      city: props.customer?.city ?? "",
      state: props.customer?.state ?? "",
      zip: props.customer?.zip ?? "",
      notes: props.customer?.notes ?? "",
    },
  });

  async function onSubmit(data: insertCustomersSchemaType) {
    console.log(data);
  }

  return (
    <div className="flex flex-col gap-1 sm:px-8">
      <div>
        <h2 className="text-2xl font-bold">
          {props.customer?.id ? "Edit" : "New"}
        </h2>
        <FormProvider {...form}>
          <form
            className="flex flex-col sm:flex-row gap-4 sm:gap-8"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <p>{JSON.stringify(form.getValues())}</p>
          </form>
        </FormProvider>
      </div>
    </div>
  );
}
