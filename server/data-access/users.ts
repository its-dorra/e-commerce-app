import { eq } from "drizzle-orm";
import db from "@/server/db";
import {
  accountsTable,
  profilesTable,
  usersTable,
} from "@/server/db/schema/users";
import { generateIdFromEntropySize, UserId } from "lucia";
import bcrypt from "bcrypt";

export async function getUserByEmail(email: string) {
  const user = await db.query.usersTable.findFirst({
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
      userId,
      accountType: "google",
      googleId,
    })
    .onConflictDoNothing()
    .returning();
}

export async function getAccountByUserId(userId: UserId) {
  const account = await db.query.accountsTable.findFirst({
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
    .insert(profilesTable)
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

export const getUserWithFullDetails = (userId: string) => {
  return db.query.usersTable.findFirst({
    where: ({ id }, { eq }) => eq(id, userId),
    with: {
      profile: true,
      account: true,
    },
  });
};

export const updateAccountDetails = async ({
  userId,
  displayName,
  password,
}: {
  userId: string;
  password?: string;
  displayName?: string;
}) => {
  return db.transaction(async (tx) => {
    if (displayName) {
      await tx
        .update(profilesTable)
        .set({ displayName })
        .where(eq(profilesTable.userId, userId));
    }
    if (password) {
      const account = await tx.query.accountsTable.findFirst({
        where: (fields, { eq }) => eq(fields.userId, userId),
      });
      if (account?.accountType !== "email") return true;
      const hash = await bcrypt.hash(password, 12);
      await tx
        .update(accountsTable)
        .set({ password: hash })
        .where(eq(accountsTable.userId, userId));
    }

    return true;
  });
};
