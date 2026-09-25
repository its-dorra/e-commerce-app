import { eq } from "drizzle-orm";
import db from "../db";
import { Address, addressTable } from "../db/schema/address";
import { cacheTag } from "next/cache";
import { getAddressUserTag, revalidateAddressCache } from "./address.cache";

export async function getUserAddress({ userId }: { userId: string }) {
  "use cache";
  cacheTag(getAddressUserTag(userId));

  return db.query.addressTable.findFirst({
    where: { userId },
  });
}

export async function addUserAddress(values: Address & { userId: string }) {
  const result = await db.transaction(async (tx) => {
    const userAddress = await tx.query.addressTable.findFirst({
      where: { userId: values.userId },
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

  revalidateAddressCache(values.userId);
  return result;
}
