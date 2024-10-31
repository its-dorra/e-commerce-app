import { DrizzleSQLiteAdapter } from "@lucia-auth/adapter-drizzle";
import { Lucia } from "lucia";
import { Google } from "arctic";
import db from "@/server/db";
import { sessionTable, usersTable } from "@/server/db/schema/users";
import env from "@/server/env";

const adapter = new DrizzleSQLiteAdapter(db, sessionTable, usersTable);

export const lucia = new Lucia(adapter, {
  sessionCookie: {
    expires: false,
    attributes: {
      secure: process.env.NODE_ENV === "production",
    },
  },
  getUserAttributes: (attributes) => {
    return {
      email: attributes.email,
      role: attributes.role,
    };
  },
});

export const googleClient = new Google(
  env.GOOGLE_CLIENT_ID,
  env.GOOGLE_CLIENT_SECRET,
  env.NEXT_PUBLIC_BASE_URL + "api/auth/google/callback",
);

declare module "lucia" {
  interface Register {
    Lucia: typeof lucia;
    DatabaseUserAttributes: DatabaseUserAttributes;
  }
}

interface DatabaseUserAttributes {
  email: string;
  role: "admin" | "user";
}
