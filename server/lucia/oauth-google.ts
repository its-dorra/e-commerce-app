import db from "@/server/db";
import { accountsTable, usersTable } from "@/server/db/schema/users";
import { eq } from "drizzle-orm";
import { GoogleUser } from "../routes/users";
import { generateIdFromEntropySize, UserId } from "lucia";
import { createProfile, createUser } from "@/server/data-access/users";

export async function getUserByEmail(email: string) {
  const user = await db.query.usersTable.findFirst({
    where: eq(usersTable.email, email),
  });

  return user;
}

export async function getAccountByGoogleId(googleId: string) {
  return await db.query.accountsTable.findFirst({
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

  await Promise.all([
    createUserViaGoogle(existingUser.id, googleUser.sub),
    createProfile(existingUser.id, googleUser.name, googleUser.picture),
  ]);

  return existingUser.id;
}
