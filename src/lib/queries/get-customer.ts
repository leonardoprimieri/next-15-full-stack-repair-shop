import { db } from "@/src/db";
import { customers } from "@/src/db/schema";
import { eq } from "drizzle-orm";

export async function getCustomer(id: number) {
  const customer = await db
    .select()
    .from(customers)
    .where(eq(customers.id, id));

  return customer.at(0);
}
