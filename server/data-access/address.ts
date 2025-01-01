import { eq } from "drizzle-orm";
import db from "../db";
import { Address, addressTable } from "../db/schema/address";

export function getUserAddress({ userId }: { userId: string }) {
  return db.query.addressTable.findFirst({
    where: (fields, { eq }) => eq(fields.userId, userId),
  });
}

export function addUserAddress(values: Address & { userId: string }) {
  return db.transaction(async (tx) => {
    const userAddress = await tx.query.addressTable.findFirst({
      where: (fields, { eq }) => eq(fields.userId, values.userId),
    });

    if (userAddress) {
      return tx
        .update(addressTable)
        .set(values)
        .where(eq(addressTable.userId, values.userId))
        .returning()
        .then((res) => res[0]);
    }

    return tx
      .insert(addressTable)
      .values(values)
      .returning()
      .then((res) => res[0]);
  });
}
