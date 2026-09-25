import { pgTable, text, uniqueIndex, uuid } from "drizzle-orm/pg-core";
import { userTable } from "./users";
import { createInsertSchema } from "drizzle-orm/zod";
import { z } from "zod";

export const addressTable = pgTable(
  "address",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: text("user_id")
      .notNull()
      .references(() => userTable.id, { onDelete: "cascade" }),
    streetAddress: text("street_address").notNull(),
    city: text("city").notNull(),
    state: text("state").notNull(),
  },
  (table) => [uniqueIndex("address_user_idx").on(table.userId)],
);

export const insertAddressSchema = createInsertSchema(addressTable, {
  city: z.string().min(5, "Write a valid city"),
  state: z.string().min(5, "Write a valid state"),
  streetAddress: z.string().min(10, "Write a valid street address"),
}).omit({
  id: true,
  userId: true,
});

export type Address = z.infer<typeof insertAddressSchema>;
