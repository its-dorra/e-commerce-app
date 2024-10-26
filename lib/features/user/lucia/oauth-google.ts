import db from "@/lib/db";
import { accountsTable, usersTable } from "@/lib/db/schema/users";
import { eq } from "drizzle-orm";
import { GoogleUser } from "../routes";
import { generateIdFromEntropySize, UserId } from "lucia";
import { createProfile, createUser } from "@/lib/features/user/data-access";

export async function getUserByEmail(email: string) {
  const user = await db.query.users.findFirst({
    where: eq(usersTable.email, email),
  });

  return user;
}

export async function getAccountByGoogleId(googleId: string) {
  return await db.query.accounts.findFirst({
    where: eq(accountsTable.googleId, googleId),
  });
}

export async function createUserViaGoogle(userId: UserId, googleId: string) {
  const id = generateIdFromEntropySize(12);

  await db
    .insert(accountsTable)
    .values({
      id,
      userId,
      accountType: "google",
      googleId,
    })
    .returning();
}

export async function createGoogleUser(googleUser: GoogleUser) {
  let existingUser = await getUserByEmail(googleUser.email);
  if (!existingUser) {
    existingUser = await createUser(googleUser.email);
  }

  await createUserViaGoogle(existingUser.id, googleUser.sub);

  await createProfile(existingUser.id, googleUser.name, googleUser.picture);

  return existingUser.id;
}
