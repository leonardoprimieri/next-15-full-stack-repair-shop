"use client";

import { CheckboxWithLabel } from "@/components/inputs/checkbox-with-label";
import { InputWithLabel } from "@/components/inputs/input-with-label";
import { TextAreaWithLabel } from "@/components/inputs/text-area-with-label";
import { Button } from "@/components/ui/button";
import { selectCustomersSchemaType } from "@/validation/customer-validation-schema";
import {
  insertTicketSchema,
  insertTicketSchemaType,
  selectTicketSchemaType,
} from "@/validation/ticket-validation-schema";
import { zodResolver } from "@hookform/resolvers/zod";
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
    resolver: zodResolver(insertTicketSchema),
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
            className="flex flex-col md:flex-row gap-4 md:gap-8"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <div className="flex flex-col gap-4 w-full max-w-xs">
              <InputWithLabel<insertTicketSchemaType>
                fieldTitle="Title"
                nameInSchema="title"
              />
              <InputWithLabel<insertTicketSchemaType>
                fieldTitle="Tech"
                nameInSchema="tech"
                disabled
              />

              <CheckboxWithLabel<insertTicketSchemaType>
                fieldTitle="Completed"
                nameInSchema="completed"
                message="Yes"
              />

              <div className="mt-4 space-y-2">
                <h3 className="text-lg">Customer Info</h3>
                <hr className="w-4/5" />
                <p>
                  {props.customer?.firstName} {props.customer?.lastName}
                </p>
                <address>{props.customer?.address1}</address>
                {props.customer?.address2 && (
                  <address>{props.customer?.address2}</address>
                )}
                <address>
                  {props.customer?.city}, {props.customer?.state}{" "}
                  {props.customer?.zip}
                </address>
                <hr className="w-4/5" />
                <p>{props.customer?.email}</p>
                <p>Phone: {props.customer?.phone}</p>
              </div>
            </div>

            <div className="flex flex-col gap-4 w-full max-w-xs">
              <TextAreaWithLabel<insertTicketSchemaType>
                fieldTitle="Description"
                nameInSchema="description"
                className="h-96"
              />

              <div className="flex gap-2">
                <Button className="w-3/4" title="Save" type="submit">
                  Save
                </Button>
                <Button
                  title="Reset"
                  onClick={() => form.reset()}
                  type="button"
                  variant="destructive"
                >
                  Reset
                </Button>
              </div>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
}
