"use client";

import { selectCustomersSchemaType } from "@/validation/customer-validation-schema";
import {
  insertTicketSchemaType,
  selectTicketSchemaType,
} from "@/validation/ticket-validation-schema";
import { FormProvider, useForm } from "react-hook-form";

type Props = {
  customer?: selectCustomersSchemaType;
  ticket?: selectTicketSchemaType;
};

export function TicketForm(props: Props) {
  const form = useForm<insertTicketSchemaType>({
    defaultValues: {
      id: props.ticket?.id ?? "(New)",
      customerId: props?.ticket?.customerId ?? props.customer?.id,
      title: props.ticket?.title ?? "",
      description: props.ticket?.description ?? "",
      completed: props.ticket?.completed ?? false,
      tech: props.ticket?.tech ?? "new-ticket@example.com",
    },
    mode: "onBlur",
  });

  async function onSubmit(data: insertTicketSchemaType) {
    console.log(data);
  }

  return (
    <div className="flex flex-col gap-1 sm:px-8">
      <div>
        <h2 className="text-2xl font-bold">
          {props.ticket?.id ? "Edit" : "New"} Ticket{" "}
          {props.ticket?.id ? `# ${props.ticket.id}` : "Form"}
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
