"use server";

import { db } from "@/db";
import { customers } from "@/db/schema";
import { actionClient } from "@/lib/safe-action";
import { insertCustomerSchema } from "@/validation/customer-validation-schema";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { eq } from "drizzle-orm";
import { flattenValidationErrors } from "next-safe-action";
import { redirect } from "next/navigation";

export const saveCustomerAction = actionClient
  .metadata({ actionName: "saveCustomerAction" })
  .inputSchema(insertCustomerSchema, {
    handleValidationErrorsShape: async (ve) =>
      flattenValidationErrors(ve).fieldErrors,
  })
  .action(async ({ parsedInput: customer }) => {
    const { isAuthenticated } = getKindeServerSession();

    const isAuth = await isAuthenticated();

    if (!isAuth) return redirect("/login");

    if (customer.id === 0) {
      const createdCustomer = await db
        .insert(customers)
        .values({
          firstName: customer.firstName,
          lastName: customer.lastName,
          email: customer.email,
          phone: customer.phone,
          address1: customer.address1,
          ...(customer.address2?.trim() && { address2: customer.address2 }),
          city: customer.city,
          state: customer.state,
          zip: customer.zip,
          ...(customer.notes?.trim() && { notes: customer.notes }),
        })
        .returning({ insertedId: customers.id });

      return {
        message: `Customer ID #${
          createdCustomer.at(0)?.insertedId
        } created successfully.`,
      };
    }

    const updatedCustomer = await db
      .update(customers)
      .set({
        firstName: customer.firstName,
        lastName: customer.lastName,
        email: customer.email,
        phone: customer.phone,
        address1: customer.address1,
        ...(customer.address2?.trim() && { address2: customer.address2 }),
        city: customer.city,
        state: customer.state,
        zip: customer.zip,
        ...(customer.notes?.trim() && { notes: customer.notes }),
        active: customer.active,
      })
      .where(eq(customers.id, customer.id!))
      .returning({ updatedId: customers.id });

    return {
      message: `Customer ID #${
        updatedCustomer.at(0)?.updatedId
      } updated successfully.`,
    };
  });
