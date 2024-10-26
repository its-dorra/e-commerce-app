import { eq } from "drizzle-orm";
import db from "@/lib/db";
import { accountsTable, profiles, usersTable } from "@/lib/db/schema/users";
import { generateIdFromEntropySize, UserId } from "lucia";
import bcrypt from "bcrypt";

export async function getUserByEmail(email: string) {
  const user = await db.query.users.findFirst({
    where: eq(usersTable.email, email),
  });

  return user;
}

export async function createUser(email: string) {
  const id = generateIdFromEntropySize(12);
  const [user] = await db
    .insert(usersTable)
    .values({
      id,
      email,
    })
    .returning();
  return user;
}

export async function createAccount(userId: UserId, password: string) {
  const id = generateIdFromEntropySize(12);
  const hash = await bcrypt.hash(password, 12);
  const [account] = await db
    .insert(accountsTable)
    .values({
      id,
      userId,
      accountType: "email",
      password: hash,
    })
    .returning();
  return account;
}

export async function createAccountViaGoogle(userId: UserId, googleId: string) {
  const id = generateIdFromEntropySize(12);
  await db
    .insert(accountsTable)
    .values({
      id,
      userId: userId,
      accountType: "google",
      googleId,
    })
    .onConflictDoNothing()
    .returning();
}

export async function getAccountByUserId(userId: UserId) {
  const account = await db.query.accounts.findFirst({
    where: eq(accountsTable.userId, userId),
  });

  return account;
}

export async function createProfile(
  userId: UserId,
  displayName: string,
  image?: string,
) {
  const id = generateIdFromEntropySize(12);
  const [profile] = await db
    .insert(profiles)
    .values({
      id,
      userId,
      image,
      displayName,
    })
    .onConflictDoNothing()
    .returning();
  return profile;
}
