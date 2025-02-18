import db from "@/server/db";
import { cartTable, orderTable } from "@/server/db/schema";
import { eq } from "drizzle-orm";

export const getOrder = ({
  userId,
  orderId,
}: {
  userId: string;
  orderId: number;
}) => {
  return db.query.orderTable.findFirst({
    where: (fields, { eq, and }) =>
      and(eq(fields.id, orderId), eq(fields.userId, userId)),
  });
};

export const createOrder = async ({
  cartId,
  userId,
  totalPrice,
}: {
  cartId: number;
  userId: string;
  totalPrice: number;
}) => {
  const cart = await db.query.cartTable.findFirst({
    where: (fields, { eq }) => eq(fields.id, cartId),
  });

  if (!cart) throw new Error("Cart not found.");

  return db.transaction(async (tx) => {
    try {
      await Promise.all([
        tx.insert(orderTable).values({
          cartId,
          userId,
          totalPrice,
        }),
        tx
          .update(cartTable)
          .set({ isMigratedToCheckout: true })
          .where(eq(cartTable.id, cartId)),
      ]);

      return true;
    } catch (e) {
      throw e;
    }
  });
};

export const acceptOrder = ({
  orderId,
  userId,
}: {
  orderId: number;
  userId: string;
}) => {
  return db.transaction(async (tx) => {
    try {
      const pendingOrder = await getOrder({ orderId, userId });

      if (!pendingOrder) throw new Error("This order doesn't exist ");

      const cart = await Promise.all();
    } catch (e) {
      throw e;
    }
  });
};
