import {
  integer,
  sqliteTable,
  text,
  uniqueIndex,
} from "drizzle-orm/sqlite-core";
import { userTable } from "./users";
import { relations } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const addressTable = sqliteTable(
  "address",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    userId: text("user_id")
      .notNull()
      .references(() => userTable.id, { onDelete: "cascade" }),
    streetAddress: text("street_address").notNull(),
    city: text("city").notNull(),
    state: text("state").notNull(),
  },
  (table) => ({
    userIdx: uniqueIndex("address_user_idx").on(table.userId),
  }),
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

export const addressRelations = relations(addressTable, ({ one }) => ({
  user: one(userTable, {
    fields: [addressTable.userId],
    references: [userTable.id],
  }),
}));
