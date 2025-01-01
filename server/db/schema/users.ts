import { relations } from "drizzle-orm";
import { sqliteTable, text, integer, index } from "drizzle-orm/sqlite-core";
import { cartsTable } from "./carts";
import { ordersTable } from "./orders";
import { wishListTable } from "./wishlist";
import { addressTable } from "./address";

export const usersTable = sqliteTable(
  "users",
  {
    id: text("id").primaryKey(),
    email: text("email").notNull().unique(),
    role: text("role").$type<"admin" | "user">().default("user"),
    createdAt: integer("created_at", { mode: "timestamp" }).$default(
      () => new Date(),
    ),
  },
  (table) => {
    return { emailIdx: index("email_idx").on(table.email) };
  },
);

export const accountsTable = sqliteTable(
  "accounts",
  {
    id: text("id").primaryKey(),
    userId: text("user_id")
      .notNull()
      .unique()
      .references(() => usersTable.id, { onDelete: "cascade" }),
    password: text("password"),
    googleId: text("google_id").unique(),
    accountType: text("account_type").$type<"email" | "google">(),
    createdAt: integer("created_at", { mode: "timestamp" }).$default(
      () => new Date(),
    ),
  },
  (table) => {
    return {
      userIdIdx: index("user_id_idx").on(table.userId),
      googleIdIdx: index("google_id_idx").on(table.googleId),
    };
  },
);

export const sessionTable = sqliteTable(
  "session",
  {
    id: text("id").primaryKey(),
    userId: text("user_id")
      .notNull()
      .references(() => usersTable.id, { onDelete: "cascade" }),
    expiresAt: integer("expires_at").notNull(),
  },
  (table) => {
    return { userIdIdx: index("sessions_user_id_idx").on(table.userId) };
  },
);

export const profilesTable = sqliteTable("profile", {
  id: text("id").primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => usersTable.id, { onDelete: "cascade" })
    .unique(),
  displayName: text("displayName"),
  imageId: text("imageId"),
  image: text("image"),
  bio: text("bio").notNull().default(""),
  createdAt: integer("created_at", { mode: "timestamp" }).$default(
    () => new Date(),
  ),
  updatedAt: integer("updated_at", { mode: "timestamp" })
    .$default(() => new Date())
    .$onUpdate(() => new Date()),
});

export const userRelations = relations(usersTable, ({ one, many }) => ({
  carts: many(cartsTable),
  orders: many(ordersTable),
  profile: one(profilesTable),
  account: one(accountsTable),
  wishList: many(wishListTable),
  address: one(addressTable),
}));

export const profileRelations = relations(profilesTable, ({ one }) => ({
  user: one(usersTable, {
    fields: [profilesTable.userId],
    references: [usersTable.id],
  }),
}));

export const accountRelations = relations(accountsTable, ({ one }) => ({
  user: one(usersTable, {
    fields: [accountsTable.userId],
    references: [usersTable.id],
  }),
}));
