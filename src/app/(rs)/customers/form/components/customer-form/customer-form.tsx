"use client";

import {
  insertCustomerSchema,
  insertCustomersSchemaType,
  selectCustomersSchemaType,
} from "@/validation/customer-validation-schema";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { InputWithLabel } from "@/components/inputs/input-with-label";
import { Button } from "@/components/ui/button";
import { TextAreaWithLabel } from "@/components/inputs/text-area-with-label";
import { SelectWithLabel } from "@/components/inputs/select-with-label";
import { StatesArray } from "@/constants/states-array";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { CheckboxWithLabel } from "@/components/inputs/checkbox-with-label";
import { saveCustomerAction } from "@/app/actions/save-customer-action";
import { useAction } from "next-safe-action/hooks";
import { toast } from "sonner";
import { LoaderCircleIcon } from "lucide-react";
import { DisplayServerActionResponse } from "@/components/display-server-action-response/display-server-action-response";

type Props = {
  customer?: selectCustomersSchemaType;
};

export function CustomerForm(props: Props) {
  const kindeAuth = useKindeBrowserClient();

  const isManager =
    !kindeAuth.isLoading && kindeAuth.getPermission("manager")?.isGranted;

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
      active: props.customer?.active ?? true,
    },
  });

  const saveCustomerFormAction = useAction(saveCustomerAction, {
    onSuccess({ data }) {
      toast.success("Success", {
        description: data.message,
      });
    },
    onError() {
      toast.error("Something went wrong", {
        description: "Save Failed",
      });
    },
  });

  async function onSubmit(data: insertCustomersSchemaType) {
    saveCustomerFormAction.execute(data);
  }

  return (
    <div className="flex flex-col gap-1 sm:px-8">
      <DisplayServerActionResponse result={saveCustomerFormAction.result} />
      <div>
        <h2 className="text-2xl font-bold">
          {props.customer?.id ? "Edit" : "New"} Customer{" "}
          {props.customer?.id ? `#${props.customer?.id}` : "Form"}
        </h2>
        <FormProvider {...form}>
          <form
            className="flex flex-col md:flex-row gap-4 md:gap-8"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <div className="flex flex-col gap-4 w-full max-w-xs">
              <InputWithLabel<insertCustomersSchemaType>
                fieldTitle="First Name"
                nameInSchema="firstName"
              />

              <InputWithLabel<insertCustomersSchemaType>
                fieldTitle="Last Name"
                nameInSchema="lastName"
              />

              <InputWithLabel<insertCustomersSchemaType>
                fieldTitle="Address 1"
                nameInSchema="address1"
              />

              <InputWithLabel<insertCustomersSchemaType>
                fieldTitle="Address 2"
                nameInSchema="address2"
              />

              <InputWithLabel<insertCustomersSchemaType>
                fieldTitle="City"
                nameInSchema="city"
              />

              <SelectWithLabel<insertCustomersSchemaType>
                fieldTitle="State"
                nameInSchema="state"
                data={StatesArray}
              />
            </div>

            <div className="flex flex-col gap-4 w-full max-w-xs">
              <InputWithLabel<insertCustomersSchemaType>
                fieldTitle="Zip Code"
                nameInSchema="zip"
              />

              <InputWithLabel<insertCustomersSchemaType>
                fieldTitle="Email"
                nameInSchema="email"
              />

              <InputWithLabel<insertCustomersSchemaType>
                fieldTitle="Phone"
                nameInSchema="phone"
              />

              <TextAreaWithLabel<insertCustomersSchemaType>
                fieldTitle="Notes"
                nameInSchema="notes"
                className="h-40"
              />

              {isManager && props.customer?.id && (
                <CheckboxWithLabel<insertCustomersSchemaType>
                  fieldTitle="Active"
                  nameInSchema="active"
                  message="Yes"
                />
              )}

              <div className="flex gap-2">
                <Button
                  className="w-3/4"
                  title="Save"
                  type="submit"
                  disabled={saveCustomerFormAction.isExecuting}
                >
                  {saveCustomerFormAction.isExecuting ? (
                    <LoaderCircleIcon className="animate-spin" />
                  ) : (
                    "Save"
                  )}
                </Button>
                <Button
                  title="Reset"
                  onClick={() => {
                    form.reset();
                    saveCustomerFormAction.reset();
                  }}
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
