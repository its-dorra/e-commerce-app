import db from "@/server/db";
import { accountTable, userTable } from "@/server/db/schema/users";
import { eq } from "drizzle-orm";
import { GoogleUser } from "../routers/users";
import { generateIdFromEntropySize, UserId } from "lucia";
import { createProfile, createUser } from "@/server/data-access/users";

export async function getUserByEmail(email: string) {
  const user = await db.query.userTable.findFirst({
    where: eq(userTable.email, email),
  });

  return user;
}

export async function getAccountByGoogleId(googleId: string) {
  return await db.query.accountTable.findFirst({
    where: eq(accountTable.googleId, googleId),
  });
}

export async function createUserViaGoogle(userId: UserId, googleId: string) {
  const id = generateIdFromEntropySize(12);

  await db
    .insert(accountTable)
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
