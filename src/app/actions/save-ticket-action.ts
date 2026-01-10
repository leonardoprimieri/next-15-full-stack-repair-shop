"use server";

import { db } from "@/db";
import { tickets } from "@/db/schema";
import { actionClient } from "@/lib/safe-action";
import { insertTicketSchema } from "@/validation/ticket-validation-schema";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { eq } from "drizzle-orm";
import { flattenValidationErrors } from "next-safe-action";
import { redirect } from "next/navigation";

export const saveTicketAction = actionClient
  .metadata({ actionName: "saveTicketAction" })
  .inputSchema(insertTicketSchema, {
    handleValidationErrorsShape: async (ve) =>
      flattenValidationErrors(ve).fieldErrors,
  })
  .action(async ({ parsedInput: ticket }) => {
    const { isAuthenticated } = getKindeServerSession();

    const isAuth = await isAuthenticated();

    if (!isAuth) return redirect("/login");

    if (ticket.id === "(New)") {
      const createdTicket = await db
        .insert(tickets)
        .values({
          customerId: ticket.customerId,
          title: ticket.title,
          description: ticket.description,
          tech: ticket.tech,
        })
        .returning({ insertedId: tickets.id });

      return {
        message: `Ticket ID #${
          createdTicket.at(0)?.insertedId
        } created successfully.`,
      };
    }

    const updatedTicket = await db
      .update(tickets)
      .set({
        completed: ticket.completed,
        description: ticket.description,
        tech: ticket.tech,
        title: ticket.title,
        customerId: ticket.customerId,
      })
      .where(eq(tickets.id, ticket.id!))
      .returning({ updatedId: tickets.id });

    return {
      message: `Ticket ID #${
        updatedTicket.at(0)?.updatedId
      } updated successfully.`,
    };
  });
